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
// A Cakto não documenta o payload publicamente; ele veio do campo "Modelo" do
// próprio painel, ao escolher o tipo de disparo. O que importa:
//
//   { secret, event, data: { id, customer: { email }, product: { short_id },
//                            status, amount, ... } }
//
// O SEGREDO VEM NO CORPO, não em cabeçalho. Isso tem duas consequências: a
// comparação é sobre req.body.secret, e o corpo NÃO pode mais ser registrado
// inteiro — o log guardaria a credencial para sempre. Ver `semSegredo()`.

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();
const db = admin.firestore();

// Guardado no Secret Manager, nunca no repositório (que é público) e nunca no
// código. Definir com:  firebase functions:secrets:set CAKTO_SEGREDO
const CAKTO_SEGREDO = defineSecret("CAKTO_SEGREDO");

const REGIAO = "southamerica-east1";
const DIAS_POR_COMPRA = 90;

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
    let acao = null;
    if (evento === "purchase_approved" && d.status === "paid") acao = "liberar";
    else if (evento === "refund" || evento === "chargeback") acao = "revogar";

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
    const chaveEvento = String(transacao || "sem-id") + ":" + evento;

    try {
      const resultado = await db.runTransaction(async (tx) => {
        const marcaRef = db.collection("webhooksProcessados").doc(chaveEvento);
        const assinaturaRef = db.collection("assinaturas").doc(email);

        // Toda leitura antes de qualquer escrita — exigência do Firestore.
        const marca = await tx.get(marcaRef);
        if (marca.exists) return "repetido";
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
        } else {
          // Não apaga o documento: o histórico de quem já foi assinante vale
          // mais que a linha a menos, e o painel reativa num clique.
          tx.set(assinaturaRef, {
            ativa: false,
            canceladoEm: Date.now(),
            canceladoPor: "webhook:cakto:" + evento,
          }, { merge: true });
        }

        tx.set(marcaRef, {
          evento, email, transacao: transacao || null, em: Date.now(),
        });
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
