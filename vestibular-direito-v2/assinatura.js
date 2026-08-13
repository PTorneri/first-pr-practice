// O portão: quem pode abrir o app (v2).
//
// Este arquivo responde uma pergunta só — "esta pessoa entra?" — e não sabe
// nada sobre pagamento. Quem cobra é a plataforma de checkout; quem registra
// que o pagamento existiu é o webhook (ou você, pelo painel). Aqui só se lê o
// veredito. Essa separação é de propósito: trocar de Cakto para Asaas, ou
// liberar alguém na mão, não deve tocar em uma linha de app.
//
// Entra quem tem assinatura ativa OU quem ainda está nos 7 dias de teste — o
// teste está mais abaixo e não custa nem leitura nem escrita.
//
// ---------- Onde mora a verdade ----------
//
// Em /assinaturas/{email}, no Firestore, com as regras de firestore.rules:
// a pessoa LÊ o próprio documento e não escreve nenhum. É o único ponto deste
// app com trava de verdade, porque é o único que roda no servidor do Google e
// não no navegador de quem está sendo barrado.
//
// A chave é o e-mail em minúsculas, e não o uid, porque o checkout sabe o
// e-mail e não sabe o uid — o uid só nasce no primeiro login. O porquê completo
// está no comentário da regra.
//
// ---------- O que este portão NÃO faz ----------
//
// Ele não esconde o conteúdo. Não tem como: o app é estático no GitHub Pages,
// o repositório é público, e as 5.755 questões estão em data/bundle.js, que
// qualquer um baixa sem login. Quem quiser o JSON pega o JSON.
//
// O que se vende aqui é a CONTA — o cronograma montado, o progresso na nuvem
// em qualquer aparelho, a ofensiva, a correção por IA. Isso não dá pra copiar
// junto com o arquivo, e é onde o portão morde de verdade.
//
// ---------- A chave de liga/desliga ----------
//
// LIGADO desde 09/08/2026. Nasceu em false e ficou assim de propósito: todo
// push na main vai ao ar sozinho (GitHub Pages), e subir isto ligado antes de
// existir um documento de assinatura para cada pessoa que já usava o app
// trancaria todo mundo do lado de fora no mesmo minuto — inclusive o dono.
//
// As três condições que precisavam valer antes, e valiam:
//   1. Regras do firestore.rules publicadas — hoje por `firebase deploy
//      --only firestore:rules`; ver o comentário do firebase.json sobre o
//      arquivo .local e por que o UID não entra no repositório.
//   2. /assinaturas/{email} criado para as 8 contas que já usavam o app.
//      Quatro delas já tinham o teste vencido e teriam batido no muro.
//   3. Checkout no ar, com a URL em PLANO_NOVENTA.checkoutUrl.
//
// PARA DESLIGAR: troque para false, commit, push. Conte uns 15 minutos até
// chegar em todo mundo — o GitHub Pages publicar mais o cache de 10 minutos do
// navegador.
//
// Para inspecionar o veredito sem depender de alguém relatar:
//
//     await VD_ASSINATURA.diagnostico()
//
// CUIDADO ao ler isso com a conta do dono: a regra de /assinaturas tem duas
// cláusulas que se somam — a do dono do e-mail e a do admin — e, para o dono, a
// leitura passa pela segunda mesmo que a primeira esteja quebrada. O
// diagnóstico rodado por você NÃO prova que o caminho do aluno funciona. Quem
// cobre esse caso é o ramo de permission-denied em verificar(), mais abaixo.

import { db } from "./firebase-init.js?v=45";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const PORTAO_ATIVO = true;

// ---------- Os planos, num lugar só ----------
//
// Dois planos coexistem de propósito: quem quer o desconto de comprometer 90
// dias de uma vez, e quem prefere pagar mês a mês sem travar nada. Cada um
// aparece em dois lugares — a faixa de acesso dentro do app e o muro — e é
// exatamente o tipo de coisa que se muda em dois lugares e se esquece no
// terceiro. Aqui é o único lugar onde os números são escritos; todo o resto
// compõe a partir daqui.
//
// A landing traz a frase escrita no HTML também, mas só como o que aparece
// antes deste módulo carregar: o auth.js sobrescreve com o que está aqui. Se
// as duas divergirem, quem ganha é esta constante — e o HTML é o que o leitor
// vê por alguns milissegundos, não o que fica.
//
// O plano de 90 dias é PAGAMENTO ÚNICO, e o "à vista" no valor não é enfeite:
// o checkout cobra diferente conforme a forma de pagamento — R$ 49,99 no Pix
// (os R$ 49 do produto mais R$ 0,99 de taxa de serviço da Cakto, repassada ao
// comprador) e R$ 61,80 no cartão em 12x, com os juros da plataforma —
// checkout conferido em 12/08/2026. Anunciar um número seco daria a entender
// que ele é o total em qualquer caminho — e preço anunciado obriga. "à vista"
// é a formulação padrão do comércio brasileiro exatamente para isto: diz o
// piso e avisa que parcelar custa mais, sem precisar listar tabela. Se um dia
// a taxa passar a ser absorvida na configuração da oferta, o Pix fecha em
// R$ 49,00 redondo e só este valor muda.
//
// O plano mensal é ASSINATURA RECORRENTE (Pix Automático ou cartão, cobrados
// pela Cakto a cada 30 dias) e, ao contrário do de 90 dias, cobra o MESMO
// valor pelos dois meios — checkout conferido em 12/08/2026: R$ 19,99 no Pix
// Automático e 1x de R$ 19,99 no cartão. Sem tabela de parcelamento, então sem
// "à vista" para qualificar: não existe um caminho mais caro para avisar.
const PLANO_NOVENTA = {
  id: "noventa",
  periodo: "90 dias",
  valor: "R$ 49,99",
  // Vazio? A tela do portão mostra o recado de que a assinatura ainda não
  // abriu, em vez de um botão que não leva a lugar nenhum — um link quebrado
  // nesta tela é pior que botão nenhum, porque é aqui que a pessoa está
  // tentando te pagar.
  checkoutUrl: "https://pay.cakto.com.br/gmrnc42_1031217",
};

const PLANO_MENSAL = {
  id: "mensal",
  periodo: "mês",
  valor: "R$ 19,99",
  checkoutUrl: "https://pay.cakto.com.br/rddoaeh_1035086",
};

const PLANOS = [PLANO_NOVENTA, PLANO_MENSAL];

// ---------- O teste de 7 dias ----------
//
// Todo mundo entra com o app inteiro por 7 dias, contados do nascimento da
// conta. Inteiro mesmo, inclusive a correção por IA — é ela que vende, e um
// teste que esconde justamente a parte boa não prova nada.
//
// A data de início NÃO é guardada em lugar nenhum nosso, e é isso que a torna
// difícil de burlar: ela é o creationTime que o próprio Firebase Auth carimba
// quando a conta nasce. Limpar o navegador não zera o teste — entrar de novo
// com a mesma conta Google devolve o mesmo carimbo. Ganhar mais 7 dias exige
// criar outra conta Google, e isso é barreira suficiente para o tamanho do
// problema. Guardar no localStorage seria um botão de "recomeçar o teste"; no
// documento do usuário, o próprio dono pode escrever (é a regra do users/{uid});
// no /assinaturas, ninguém do app escreve, então não havia onde criar.
//
// De quebra não custa leitura nem escrita, e funciona sem rede: o carimbo já
// veio dentro do objeto do usuário que o Auth entregou.
//
// ATENÇÃO ao ligar o portão: quem já tem conta há mais de 7 dias está com o
// teste vencido no mesmo instante. É exatamente por isso que o passo de
// cadastrar todo mundo que já usa o app vem ANTES de virar a chave.
const TESTE_DIAS = 7;

function estadoDoTeste(user) {
  const carimbo = user && user.metadata ? user.metadata.creationTime : null;
  const nasceu = carimbo ? Date.parse(carimbo) : NaN;

  // Sem carimbo não dá pra afirmar que o teste está valendo, e na dúvida ele
  // não vale: o teste é um presente, não um direito a se presumir.
  if (isNaN(nasceu)) return { dentro: false, terminaEm: 0, diasRestantes: 0 };

  const terminaEm = nasceu + TESTE_DIAS * 86400000;
  return {
    dentro: Date.now() < terminaEm,
    terminaEm: terminaEm,
    // Arredonda pra cima: faltando 6h ainda se diz "1 dia", e não "0 dias",
    // que leria como acabado enquanto a pessoa ainda está estudando.
    diasRestantes: Math.max(0, Math.ceil((terminaEm - Date.now()) / 86400000)),
  };
}

// ---------- O aviso de vencimento ----------
//
// A partir de quantos dias do fim o app avisa quem já assinou. Sete, o mesmo
// número do cartão "vencem em 7 dias" do painel — o que você vê e o que a
// pessoa vê têm que ser a mesma régua, senão você cobra alguém que ainda não
// foi avisado.
//
// Antes disto o aviso não existia de nenhum lado: o painel te mostrava quem ia
// vencer, e a PESSOA descobria batendo no muro, no meio de um plano de 90
// dias. Quem está estudando para uma prova não pode perder o app sem aviso.
const AVISO_VENCIMENTO_DIAS = 7;

// Diferença em dias de CALENDÁRIO, não em blocos de 24 horas. É o que permite
// dizer "vence hoje" e "vence amanhã" sem mentir: uma assinatura que termina
// hoje às 23h está a 0 dias daqui, e não a 1 — que é o que a divisão simples
// por 86400000 responderia às 8h da manhã.
//
// O Math.round existe pelo horário de verão: zerando as horas dos dois lados,
// um dia de 23 ou 25 horas sairia como 0,96 ou 1,04 e o truncamento erraria a
// véspera. O Brasil não tem horário de verão hoje, mas já teve e o app não
// depende disso para estar certo.
function diasAte(ms) {
  if (!ms) return Infinity;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const alvo = new Date(ms);
  alvo.setHours(0, 0, 0, 0);
  return Math.round((alvo - hoje) / 86400000);
}

// A frase que a landing mostra embaixo dos dois botões de começar. Vive aqui,
// e não no HTML, porque junta o número do teste com o do preço — as duas
// constantes deste arquivo. Escrita na página, sairia errada na primeira vez
// que um dos dois mudasse.
//
// Ordem proposital: o grátis primeiro. Quem chega precisa saber que pode
// entrar hoje sem pagar, e só depois quanto custa continuar.
function chamada() {
  // Ordem invertida em relação ao óbvio ("R$ 49,99 por 90 dias") para o "à
  // vista" cair colado no valor, que é onde ele qualifica. Solto no fim da
  // frase, ele pareceria qualificar o prazo. O mensal entra depois, sem "à
  // vista" — não existe caminho mais caro pra avisar nesse plano (ver o
  // comentário de PLANO_MENSAL).
  return TESTE_DIAS + " dias grátis. Depois, " + PLANO_NOVENTA.periodo + " por " +
    PLANO_NOVENTA.valor + " à vista — ou " + PLANO_MENSAL.valor + "/mês.";
}

// ---------- A graça do offline ----------
//
// O app é feito para funcionar sem rede: o localStorage é a fonte que ele lê e
// escreve, e a nuvem é espelho. Um portão que exige rede a cada abertura quebra
// essa propriedade — quem assinou perderia o app no metrô, no ônibus, na casa
// com wi-fi ruim, exatamente nos lugares onde se estuda no celular.
//
// Então o veredito bem-sucedido fica guardado aqui, e vale por alguns dias
// quando a leitura falha. Note a assimetria, que é o ponto: só veredito
// POSITIVO é honrado offline. Quem nunca teve acesso não tem cache dizendo que
// tem, e cair a rede não vira porta dos fundos.
//
// Sete dias é o limite de quanto tempo alguém que cancelou continua entrando
// com a rede desligada. Menos que isso e uma viagem de uma semana já barra
// quem pagou.
const GRACA_OFFLINE_DIAS = 7;
const CHAVE_CACHE = "v2_assinatura_veredito";

function lerCache(email) {
  try {
    const bruto = localStorage.getItem(CHAVE_CACHE);
    if (!bruto) return null;
    const c = JSON.parse(bruto);
    // O e-mail entra na comparação porque um navegador é compartilhado: sem
    // isso, o veredito da conta do irmão liberaria a sua.
    if (!c || c.email !== email) return null;
    return c;
  } catch (e) {
    return null;
  }
}

function gravarCache(email, veredito) {
  try {
    localStorage.setItem(CHAVE_CACHE, JSON.stringify({
      email: email,
      entra: veredito.entra,
      expiraEm: veredito.expiraEm || 0,
      plano: veredito.plano || "",
      lidoEm: Date.now(),
    }));
  } catch (e) {
    /* navegador sem localStorage: o portão só perde o modo offline */
  }
}

// ---------- Leitura do documento ----------

// expiraEm pode chegar de três formas, porque três coisas diferentes escrevem
// esse campo: o webhook (número em milissegundos), o console do Firebase
// (Timestamp nativo, se você escolher o tipo na mãozinha) e um script seu
// qualquer (texto ISO). Aceitar as três aqui custa seis linhas e evita a classe
// de bug em que o acesso é negado porque o campo virou string.
function paraMillis(v) {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v.toMillis === "function") return v.toMillis();
  if (typeof v === "string") {
    const t = Date.parse(v);
    return isNaN(t) ? 0 : t;
  }
  return 0;
}

// Traduz o documento em veredito. `ativa` é exigido explicitamente, e não
// deduzido da existência do documento: assim dá pra revogar um acesso sem
// apagar o histórico, e um documento criado por engano não libera ninguém.
function julgar(dados) {
  if (!dados) return { entra: false, estado: "ausente" };

  const expiraEm = paraMillis(dados.expiraEm);
  const plano = dados.plano || "";
  // Só o webhook da assinatura recorrente escreve este campo (ver
  // functions/index.js) — no plano de 90 dias ele nunca existe. É o que
  // diferencia "tem uma renovação futura pra cancelar" de "não tem nada a
  // cancelar", sem depender do texto solto de `plano`.
  const renovacaoAtiva = dados.renovacaoAtiva === true;

  if (dados.ativa !== true) {
    return { entra: false, estado: "cancelada", expiraEm: expiraEm, plano: plano, renovacaoAtiva: renovacaoAtiva };
  }
  if (expiraEm && expiraEm <= Date.now()) {
    return { entra: false, estado: "expirada", expiraEm: expiraEm, plano: plano, renovacaoAtiva: renovacaoAtiva };
  }
  return { entra: true, estado: "ativa", expiraEm: expiraEm, plano: plano, renovacaoAtiva: renovacaoAtiva };
}

async function consultar(email) {
  const snap = await getDoc(doc(db, "assinaturas", email));
  return julgar(snap.exists() ? snap.data() : null);
}

// ---------- A pergunta que o auth.js faz ----------

// Sempre devolve um veredito — nunca lança. Um erro não tratado aqui deixaria
// o app pendurado na tela em branco depois do login, que é o pior desfecho
// possível: nem entra, nem explica.
async function verificar(user) {
  if (!PORTAO_ATIVO) return { entra: true, estado: "portao-desligado" };

  const email = (user && user.email ? user.email : "").toLowerCase().trim();

  // Sem e-mail não há como cruzar com o pagamento. Não acontece com o Google
  // (ele sempre entrega), mas o veredito precisa existir para todo caminho.
  if (!email) return { entra: false, estado: "sem-email", email: "" };

  const teste = estadoDoTeste(user);

  // A assinatura é consultada MESMO com o teste valendo. Parece leitura
  // desperdiçada — quem está no teste entra de qualquer jeito — mas é esta
  // passagem que grava o cache: sem ela, quem assina no primeiro dia chegaria
  // ao dia 8 sem veredito guardado e seria barrado no primeiro acesso sem rede.
  let v = null;
  let falhou = false;
  let codigoFalha = "";
  try {
    v = await consultar(email);
    gravarCache(email, v);
  } catch (err) {
    falhou = true;
    codigoFalha = (err && err.code) || "";
    console.warn("[assinatura] não consegui ler o acesso:", codigoFalha || err.message);
  }

  if (v && v.entra) return Object.assign({ email: email, teste: teste }, v);

  // Sem assinatura válida, o teste ainda abre a porta — e ele não depende da
  // rede, então vale inclusive quando a leitura acima falhou.
  if (teste.dentro) return { entra: true, estado: "teste", email: email, teste: teste };

  if (falhou) {
    // ---------- Quando o erro é NOSSO ----------
    //
    // permission-denied aqui não é falta de rede. A pessoa está autenticada e
    // pediu o PRÓPRIO documento; a regra de /assinaturas só recusa isso se a
    // regra publicada estiver errada. Documento inexistente não dá este erro —
    // dá leitura bem-sucedida com exists() falso, que vira "ausente".
    //
    // Então este ramo significa: eu errei a regra. Barrar quem pagou por causa
    // disso é o pior desfecho possível — pior, inclusive, do que deixar entrar
    // quem não pagou até o conserto sair. Entra, e o console diz o porquê.
    //
    // Isto não abre porta nova: quem edita o cliente para forçar o erro já
    // podia pular o portão inteiro, que é client-side por natureza. O que
    // segura o acesso de verdade nunca foi este arquivo (ver o cabeçalho).
    if (codigoFalha === "permission-denied") {
      console.error(
        "[assinatura] A REGRA DE /assinaturas RECUSOU A LEITURA DO PRÓPRIO DOCUMENTO. " +
        "Isso é erro de regra, não de rede. Liberando o acesso até o conserto. " +
        "Confira o bloco match /assinaturas/{email} no firestore.rules publicado."
      );
      return { entra: true, estado: "regra-falhou", email: email, teste: teste };
    }

    const c = lerCache(email);
    const dentroDaGraca = c &&
      c.entra &&
      Date.now() - c.lidoEm < GRACA_OFFLINE_DIAS * 86400000 &&
      (!c.expiraEm || c.expiraEm > Date.now());

    if (dentroDaGraca) {
      return { entra: true, estado: "graca", email: email, expiraEm: c.expiraEm, plano: c.plano, teste: teste };
    }
    return { entra: false, estado: "offline", email: email, teste: teste };
  }

  // Leitura boa, sem assinatura e com o teste vencido. Quem nunca teve
  // documento é justamente quem acabou de sair do teste, e a mensagem tem que
  // ser essa — "sua assinatura venceu" soaria como cobrança de algo que a
  // pessoa nunca teve.
  return {
    entra: false,
    estado: v.estado === "ausente" ? "teste-acabou" : v.estado,
    email: email,
    expiraEm: v.expiraEm,
    plano: v.plano,
    teste: teste,
  };
}

// O ensaio: mesma leitura, mesmas regras, sem bloquear nada. Serve para virar a
// chave sabendo o que vai acontecer, e para responder "por que fulano não
// entra?" sem abrir o console do Firebase.
async function diagnostico() {
  const user = window.VD_AUTH && window.VD_AUTH.user;
  if (!user) return { erro: "ninguém logado" };

  const email = (user.email || "").toLowerCase().trim();
  const teste = estadoDoTeste(user);
  const saida = {
    email: email,
    portaoAtivo: PORTAO_ATIVO,
    contaCriadaEm: (user.metadata && user.metadata.creationTime) || "?",
    testeAtivo: teste.dentro,
    testeTerminaEm: teste.terminaEm ? new Date(teste.terminaEm).toLocaleString("pt-BR") : "?",
    testeDiasRestantes: teste.diasRestantes,
  };

  try {
    const v = await consultar(email);
    saida.assinatura = v.estado;
    // O que vale é o OU: assinatura ativa ou teste correndo. Mostrar só a
    // assinatura aqui faria parecer que quem está no teste seria barrado.
    saida.entraria = v.entra || teste.dentro;
  } catch (err) {
    saida.erro = err.code || err.message;
    saida.entraria = teste.dentro;
  }

  console.table(saida);
  return saida;
}

window.VD_ASSINATURA = {
  verificar: verificar,
  diagnostico: diagnostico,
  planos: PLANOS,
  ativo: PORTAO_ATIVO,
  chamada: chamada,
  testeDias: TESTE_DIAS,
  avisoDias: AVISO_VENCIMENTO_DIAS,
  diasAte: diasAte,
  _estadoDoTeste: estadoDoTeste, // exposto para verificação
};
