// Webhook de pagamento — o único servidor deste projeto.
//
// Até aqui o sagax não tinha servidor nenhum: app estático no GitHub Pages,
// Firestore com regras, e "publicar" era o commit na main. Esta pasta quebra
// essa invariante de propósito, e o motivo não é a comodidade de não cadastrar
// à mão — é o REEMBOLSO.
//
// Com liberação manual, quem pede reembolso continua entrando até alguém
// lembrar de cancelar no painel. Chargeback idem. Nenhum humano lembra disso
// toda vez. Um webhook lembra sempre, e é por isso que ele existe.
//
// A partir de agora há DOIS alvos de deploy:
//   app     git push (GitHub Pages)
//   função  firebase deploy --only functions
//
// ---------- ESTADO ATUAL: DESCOBERTA ----------
//
// A Cakto documenta como CRIAR webhooks, mas não o que ela ENVIA — o payload
// não está na documentação pública nem no índice llms.txt. Escrever o
// tratamento em cima de nomes de campo adivinhados é como isto dá errado, e o
// erro só apareceria na primeira venda de verdade.
//
// Então esta primeira versão não trata nada: ela registra o que chegou e
// devolve 200. Com o log na mão, o tratamento é escrito contra o que existe.
//
// Ela também NÃO ESCREVE NO FIRESTORE, e isso é deliberado. O endereço é
// público e ainda não há segredo configurado; um endpoint que concedesse
// acesso neste estado seria exatamente o buraco que o webhook deveria fechar.
// Escrita só entra junto com a validação, no passo seguinte.

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// São Paulo. A Cakto é brasileira e o Firestore deste projeto também responde
// daqui; atravessar o hemisfério para gravar um documento seria latência de
// graça.
const REGIAO = "southamerica-east1";

exports.caktoWebhook = onRequest(
  {
    region: REGIAO,
    // A Cakto reenvia o evento quando não recebe 200. Um pico de reenvio não
    // pode virar um enxame de instâncias — e este trabalho é curto o bastante
    // para caber em poucas.
    maxInstances: 3,
    // Sem verificação de App Check nem de autenticação: quem chama é um
    // servidor da Cakto, não um usuário. O que vai proteger a escrita é o
    // segredo compartilhado, no passo seguinte.
    invoker: "public",
  },
  (req, res) => {
    // Responder rápido é parte do contrato de webhook: enquanto a Cakto não
    // recebe 200, ela reenvia. Por isso o log vem antes e nada mais acontece.
    logger.info("[cakto] evento recebido", {
      metodo: req.method,
      // Os cabeçalhos entram porque é aqui que se descobre COMO o segredo
      // chega — se é header próprio, Authorization, ou se vem dentro do corpo.
      // Assim que soubermos, este registro sai: cabeçalho de webhook carrega
      // credencial, e credencial não tem por que morar no log para sempre.
      headers: req.headers,
      query: req.query,
      body: req.body,
      // req.body já vem interpretado pelo runtime (JSON ou formulário). O cru
      // fica junto para o caso de a interpretação surpreender — content-type
      // errado, corpo vazio, charset estranho.
      cru: req.rawBody ? String(req.rawBody).slice(0, 4000) : null,
    });

    res.status(200).send("ok");
  }
);
