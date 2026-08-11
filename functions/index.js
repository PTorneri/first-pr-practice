// Webhook de pagamento — o único servidor deste projeto.
//
// Até aqui o sagax não tinha servidor nenhum: app estático no GitHub Pages,
// Firestore com regras, e "publicar" era o commit na main. Esta pasta quebra
// essa invariante de propósito, e o motivo não é a comodidade de não cadastrar
// à mão — é o REEMBOLSO.
//
// Com liberação manual, quem pede reembolso continua entrando até alguém
// lembrar de cancelar no painel. Chargeback idem. Nenhum humano lembra disso
// toda vez. Um webhook lembra sempre.
//
// A partir daqui há DOIS alvos de deploy:
//   app     git push (GitHub Pages)
//   função  firebase deploy --only functions
//
// ---------- O formato ----------
//
// O formato da compra única (purchase_approved) veio do campo "Modelo" do
// próprio painel, ao escolher o tipo de disparo — a Cakto não documentava
// isso publicamente na época. O que importa:
//
//   { secret, event, data: { id, customer: { email }, product: { short_id },
//                            status, amount, ... } }
//
// Os três eventos de assinatura recorrente (purchase_approved-com-assinatura,
// subscription_renewed, subscription_canceled), por outro lado, ESTÃO
// documentados: cakto-dece4a15.mintlify.app/webhooks/eventos e as páginas
// vizinhas (pagamento-recorrente, renovacao, cancelamento). Os exemplos de
// payload de lá são a base do bloco "O que este evento faz", mais abaixo —
// nenhum evento real de assinatura passou por aqui ainda. Se o primeiro
// disparo real vier com um formato diferente do documentado, é a documentação
// que perde: teste real já provou uma vez, no purchase_approved, que o campo
// que "sempre vem" às vezes não vem (ver o comentário da idempotência).
//
// O SEGREDO VEM NO CORPO, não em cabeçalho. Isso tem duas consequências: a
// comparação é sobre req.body.secret, e o corpo NÃO pode mais ser registrado
// inteiro — o log guardaria a credencial para sempre. Ver `semSegredo()`.

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
// API modular, e não `require("firebase-admin").firestore()`: no
// firebase-admin 14 o namespace antigo deixou de existir, e a forma legada
// falha com "admin.firestore is not a function" — no ANALISE do deploy, antes
// de subir nada, que é o melhor lugar para falhar.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const crypto = require("crypto");

initializeApp();
const db = getFirestore();

// Guardado no Secret Manager, nunca no repositório (que é público) e nunca no
// código. Definir com:  firebase functions:secrets:set CAKTO_SEGREDO
const CAKTO_SEGREDO = defineSecret("CAKTO_SEGREDO");

const REGIAO = "southamerica-east1";
const DIAS_POR_COMPRA = 90;

// Assinatura recorrente não soma dias: cada cobrança aprovada (primeira ou
// renovação) diz exatamente quando a PRÓXIMA vai acontecer
// (data.subscription.next_payment_date), e é isso que vira expiraEm — não um
// cálculo nosso de "+30 dias". Duas vantagens: sobrevive a um mês de 28, 30 ou
// 31 dias sem cair a régua, e é IDEMPOTENTE por construção — se o mesmo ciclo
// de cobrança chegar duas vezes (a documentação da Cakto não deixa claro se
// purchase_approved e subscription_renewed disparam os dois para a mesma
// renovação), gravar o mesmo expiraEm duas vezes dá o mesmo resultado. A
// idempotência por chaveEvento, mais abaixo, segue existindo, mas aqui é
// cinto e suspensório — lá embaixo, no "liberar" de compra única, ela é a
// única coisa que impede dobrar o prazo.
const GRACA_RENOVACAO_MS = 2 * 86400000;

// Se o payload de uma cobrança de assinatura chegar sem next_payment_date
// utilizável (documentação incompleta, campo renomeado, o que já aconteceu
// uma vez com outro campo neste mesmo webhook), o padrão é conceder acesso
// por este tanto, não zerar o prazo. Mesma régua do resto deste arquivo:
// barrar quem pagou por um payload estranho é pior que o contrário, e o log
// de aviso fica para alguém investigar sem que ninguém tenha ficado de fora
// enquanto isso.
const DIAS_ASSINATURA_FALLBACK = 30;

// short_id do produto na Cakto. Enquanto estiver vazio, qualquer produto é
// aceito e a função registra um aviso.
//
// Contra quem sabe o segredo isto não protege nada — quem forja o corpo forja
// o produto junto. Serve contra ENGANO: no dia em que existir um segundo
// produto (um order bump, um plano diferente), sem esta trava o comprador do
// item de R$60 receberia os mesmos 90 dias do plano cheio.
const PRODUTO_ESPERADO = "";

// ---------- Utilidades ----------

// Comparação em tempo constante. Com == , o tempo de resposta vaza quantos
// caracteres iniciais estavam certos, e um atacante descobre o segredo byte a
// byte. O custo de fazer certo são estas seis linhas.
function segredoConfere(recebido, esperado) {
  if (typeof recebido !== "string" || typeof esperado !== "string") return false;
  // Segredo vazio nunca autentica. Sem esta linha, dois vazios se comparam
  // iguais e um pedido com `secret: ""` entraria caso a configuração falhasse.
  // O defineSecret já impede a função de subir sem o valor, mas "a outra
  // camada garante" é como buracos assim chegam à produção.
  if (!recebido || !esperado) return false;
  const a = Buffer.from(recebido);
  const b = Buffer.from(esperado);
  // timingSafeEqual exige o mesmo tamanho, e o próprio tamanho já é um vazamento
  // pequeno — comparar comprimentos antes é o padrão aceito aqui.
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// O corpo sem a credencial, para poder registrar o que aconteceu sem gravar o
// segredo no log. Tudo o que sai daqui é seguro de guardar.
function semSegredo(body) {
  if (!body || typeof body !== "object") return {};
  const { secret, ...resto } = body;
  return resto;
}

function normalizarEmail(bruto) {
  const e = String(bruto || "").trim().toLowerCase();
  if (!e) return null;
  // Mesma regra do painel (admin.js) e da regra do Firestore: o e-mail é o NOME
  // do documento, e a regra compara com request.auth.token.email.lower(). Sem
  // minúsculas, o documento existe e mesmo assim ninguém entra.
  if (!/^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(e)) return null;
  return e;
}

// Renovar cedo SOMA ao que resta — quem compra de novo com 20 dias de sobra não
// pode perder esses 20 dias. Cancelada recomeça de hoje: o tempo abandonado não
// ressuscita. É a mesma semântica do botão do painel, de propósito: duas contas
// diferentes para a mesma coisa acabariam divergindo.
function novaValidade(dias, expiraAtual) {
  return Math.max(Date.now(), expiraAtual || 0) + dias * 86400000;
}

// Só existe para o next_payment_date da assinatura, que a Cakto entrega como
// texto ISO 8601. Sem isto cada chamador reimplementaria o mesmo Date.parse.
function paraMillisISO(v) {
  if (!v) return 0;
  const t = Date.parse(v);
  return isNaN(t) ? 0 : t;
}

// O único jeito documentado de separar uma cobrança de assinatura de uma
// compra única: purchase_approved serve os dois, e só o product.type diz
// qual é qual.
function ehAssinatura(d) {
  return !!(d.product && d.product.type === "subscription");
}

// ---------- A função ----------

exports.caktoWebhook = onRequest(
  {
    region: REGIAO,
    secrets: [CAKTO_SEGREDO],
    // A Cakto reenvia quando não recebe 200. Um pico de reenvio não pode virar
    // enxame de instâncias, e este trabalho é curto o bastante para caber em
    // poucas.
    maxInstances: 3,
    invoker: "public",
  },
  async (req, res) => {
    if (req.method !== "POST") {
      // GET costuma ser o painel conferindo se a URL responde.
      res.status(200).send("ok");
      return;
    }

    const body = req.body || {};

    if (!segredoConfere(body.secret, CAKTO_SEGREDO.value())) {
      logger.warn("[cakto] segredo invalido — pedido recusado", {
        evento: body.event || null,
        origem: req.headers["x-forwarded-for"] || null,
      });
      res.status(401).send("segredo invalido");
      return;
    }

    const evento = body.event;
    const d = body.data || {};
    const email = normalizarEmail(d.customer && d.customer.email);
    const transacao = d.id;

    // Sem e-mail não há o que liberar, e reenviar não vai fazer aparecer. 200
    // para a Cakto parar de tentar; o log fica para alguém olhar.
    if (!email) {
      logger.error("[cakto] evento sem e-mail utilizavel", { evento, corpo: semSegredo(body) });
      res.status(200).send("sem email");
      return;
    }

    if (PRODUTO_ESPERADO && d.product && d.product.short_id !== PRODUTO_ESPERADO) {
      logger.warn("[cakto] produto diferente do esperado — ignorado", {
        evento, recebido: d.product.short_id, esperado: PRODUTO_ESPERADO,
      });
      res.status(200).send("outro produto");
      return;
    }
    if (!PRODUTO_ESPERADO) {
      logger.warn("[cakto] PRODUTO_ESPERADO vazio: aceitando qualquer produto", {
        produto: d.product && d.product.short_id, oferta: d.offer && d.offer.id,
      });
    }

    // ---------- O que este evento faz ----------
    //
    // purchase_approved serve TANTO a compra única de 90 dias quanto a
    // primeira cobrança (e, ao que a documentação sugere, as renovações) de
    // uma assinatura — só d.product.type diferencia. subscription_renewed
    // dispara numa renovação bem-sucedida; subscription_canceled quando a
    // pessoa cancela a renovação FUTURA, não o acesso já pago (por isso ele
    // não entra na mesma ação de "revogar" do refund/chargeback — ver o
    // comentário dentro da transação, mais abaixo).
    const assinatura = ehAssinatura(d);
    const proximaCobranca = paraMillisISO(d.subscription && d.subscription.next_payment_date);

    let acao = null;
    if (evento === "purchase_approved" && d.status === "paid") {
      acao = assinatura ? "assinatura-cobranca" : "liberar";
    } else if (evento === "subscription_renewed" && d.status === "paid") {
      acao = "assinatura-cobranca";
    } else if (evento === "subscription_canceled") {
      acao = "assinatura-cancelada";
    } else if (evento === "refund" || evento === "chargeback") {
      acao = "revogar";
    }

    if (acao === "assinatura-cobranca" && !proximaCobranca) {
      logger.warn("[cakto] assinatura sem next_payment_date utilizavel — usando prazo padrao", {
        evento, email, subscription: d.subscription || null,
      });
    }

    if (!acao) {
      // Evento que não nos interessa (pix gerado, checkout abandonado...) ou
      // compra aprovada com status inesperado. 200 e segue a vida.
      logger.info("[cakto] evento ignorado", { evento, status: d.status, email });
      res.status(200).send("ignorado");
      return;
    }

    // ---------- Idempotência ----------
    //
    // A Cakto REENVIA o evento enquanto não recebe 200. Como liberar SOMA ao
    // prazo restante, um reenvio entregaria 180 dias por uma compra de 90 — e
    // isso aconteceria justamente nos dias em que algo estivesse instável.
    //
    // A chave junta transação E evento porque o reembolso de um pedido carrega
    // o MESMO data.id da compra: só o id marcaria o reembolso como já
    // processado e o acesso nunca seria revogado.
    //
    // A marca e a assinatura são gravadas na mesma transação: ou as duas, ou
    // nenhuma. Gravar a marca antes deixaria um evento contado sem ter sido
    // aplicado, que é a falha silenciosa pior de todas aqui.
    // SEM id, não há deduplicação — e isso é melhor do que fingir que há.
    //
    // A primeira versão usava "sem-id" como chave quando data.id faltava, e um
    // teste real mostrou por que isso é uma bomba: os eventos de teste da Cakto
    // vieram um COM id e outro SEM. O segundo gravou a marca "sem-id:...", e a
    // partir dali qualquer evento futuro sem id seria descartado como repetido
    // — em silêncio, para sempre. Uma compra paga sumiria sem deixar rastro
    // além de um "repetido" no log.
    //
    // Entre arriscar conceder duas vezes e arriscar engolir uma compra paga, a
    // escolha é a mesma que o resto deste sistema faz: o prejuízo de quem pagou
    // vem primeiro. Sem id, processa e avisa.
    const chaveEvento = transacao ? String(transacao) + ":" + evento : null;
    if (!chaveEvento) {
      logger.warn("[cakto] evento sem data.id: processando SEM deduplicacao", { evento, email });
    }

    try {
      const resultado = await db.runTransaction(async (tx) => {
        const marcaRef = chaveEvento
          ? db.collection("webhooksProcessados").doc(chaveEvento)
          : null;
        const assinaturaRef = db.collection("assinaturas").doc(email);

        // Toda leitura antes de qualquer escrita — exigência do Firestore.
        if (marcaRef) {
          const marca = await tx.get(marcaRef);
          if (marca.exists) return "repetido";
        }
        const atual = await tx.get(assinaturaRef);
        const dados = atual.exists ? atual.data() : {};

        if (acao === "liberar") {
          // Só soma o que resta se a assinatura estiver de pé. Cancelada ou
          // vencida recomeça de hoje.
          const viva = dados.ativa === true && (!dados.expiraEm || dados.expiraEm > Date.now());
          tx.set(assinaturaRef, {
            ativa: true,
            plano: DIAS_POR_COMPRA + " dias",
            expiraEm: novaValidade(DIAS_POR_COMPRA, viva ? dados.expiraEm : 0),
            liberadoEm: Date.now(),
            liberadoPor: "webhook:cakto",
            ultimaTransacao: transacao || null,
          }, { merge: true });
        } else if (acao === "assinatura-cobranca") {
          // Nunca soma: expiraEm vira exatamente o próximo vencimento que a
          // própria Cakto informou (mais a graça, ver GRACA_RENOVACAO_MS), ou
          // o padrão de segurança se o campo não veio. Ver o comentário da
          // constante para o porquê de não replicar a lógica de "somar dias"
          // do plano de 90 dias aqui.
          const expiraEm = (proximaCobranca || Date.now() + DIAS_ASSINATURA_FALLBACK * 86400000) +
            GRACA_RENOVACAO_MS;
          tx.set(assinaturaRef, {
            ativa: true,
            plano: "mensal",
            expiraEm: expiraEm,
            renovacaoAtiva: true,
            assinaturaId: (d.subscription && d.subscription.id) || null,
            liberadoEm: Date.now(),
            liberadoPor: "webhook:cakto:" + evento,
            ultimaTransacao: transacao || null,
          }, { merge: true });
        } else if (acao === "assinatura-cancelada") {
          // A pessoa cancelou a RENOVAÇÃO, não pediu reembolso do que já
          // pagou — a própria Cakto trata isso como "última cobrança
          // programada antes de finalizar o cancelamento", não como
          // estorno. Por isso este ramo NÃO toca em ativa nem em expiraEm:
          // quem cancela continua dentro até o prazo que já pagou vencer
          // sozinho, e é o mesmo julgar() de sempre (em assinatura.js) que
          // vai barrar quando chegar a hora. Tratar isto como "revogar"
          // cortaria um acesso que a pessoa pagou por engano.
          tx.set(assinaturaRef, {
            renovacaoAtiva: false,
            canceladoEm: Date.now(),
            canceladoPor: "webhook:cakto:subscription_canceled",
          }, { merge: true });
        } else {
          // revogar: refund ou chargeback, de compra única ou de assinatura.
          // Aqui sim é dinheiro voltando, então o acesso cai na hora — não
          // apaga o documento: o histórico de quem já foi assinante vale
          // mais que a linha a menos, e o painel reativa num clique.
          tx.set(assinaturaRef, {
            ativa: false,
            canceladoEm: Date.now(),
            canceladoPor: "webhook:cakto:" + evento,
          }, { merge: true });
        }

        // Só marca o que dá para reconhecer depois. Gravar marca sem id seria
        // criar a armadilha descrita acima.
        if (marcaRef) {
          tx.set(marcaRef, {
            evento, email, transacao: transacao, em: Date.now(),
          });
        }
        return "aplicado";
      });

      logger.info("[cakto] " + acao + " " + resultado, { evento, email, transacao });
      res.status(200).send(resultado);
    } catch (err) {
      // 500 de propósito: falha de escrita costuma ser transitória, e aqui o
      // reenvio da Cakto é aliado — a idempotência acima garante que a segunda
      // tentativa não cobre dobrado.
      logger.error("[cakto] falha ao gravar", { evento, email, erro: err.message });
      res.status(500).send("erro ao gravar");
    }
  }
);
