// Manda a compra para o TikTok, para que a campanha otimize por venda e não
// por clique.
//
// O checkout é da Cakto, num domínio que não é nosso, então um pixel no
// navegador nunca veria esta conversão — o servidor é a única fonte possível.
//
// ---------- POR QUE ESTA FUNÇÃO É SEPARADA DO caktoWebhook ----------
//
//   1. O caminho do pagamento não pode depender da API do TikTok. Chamar o
//      TikTok dentro do onRequest atrasaria a resposta à Cakto, e a Cakto
//      REENVIA quando não recebe 200 — um TikTok lento viraria cobrança
//      duplicada. Seria criar, por causa de uma métrica de anúncio, exatamente
//      o modo de falha que a idempotência do webhook existe para conter.
//
//   2. A idempotência vem de graça. webhooksProcessados/{chave} é criado uma
//      única vez, dentro da transação do webhook, e nunca reescrito.
//      onDocumentCreated dispara uma vez. Não é preciso marcar "já enviei" no
//      documento, nem proteger o gatilho contra a própria escrita — que é o
//      problema que um gatilho em assinaturas/{email} teria.
//
//   3. Falha do TikTok não é falha do pagamento. Esta função pode errar e ser
//      corrigida sem que ninguém deixe de receber o acesso que pagou.
//
// ---------- LIMITE CONHECIDO ----------
//
// Quando a Cakto manda um evento sem data.id, o webhook processa mas NÃO grava
// a marca (o comentário lá explica: a alternativa envenenava a deduplicação
// para sempre). Nesses casos não há gatilho e a conversão não chega ao TikTok.
// É raro, já vai como aviso no log, e mexer na deduplicação do PAGAMENTO para
// salvar uma métrica de ANÚNCIO seria trocar risco caro por ganho barato.

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const { deveEnviar, montarCorpo, enviar } = require("./tiktok");

// Guardado no Secret Manager, nunca no repositório (que é público). Definir
// com:  firebase functions:secrets:set TIKTOK_TOKEN
const TIKTOK_TOKEN = defineSecret("TIKTOK_TOKEN");

const REGIAO = "southamerica-east1";

exports.tiktokConversao = onDocumentCreated(
  {
    document: "webhooksProcessados/{chave}",
    region: REGIAO,
    secrets: [TIKTOK_TOKEN],
    // Sem retentativa: um evento de anúncio perdido custa uma linha de
    // relatório. Retentar em cima da API de um terceiro é como se acumulam
    // execuções presas.
    retry: false,
  },
  async (evento) => {
    const marca = evento.data && evento.data.data();
    if (!marca) return;

    if (!deveEnviar(marca)) {
      logger.info("[tiktok] evento nao e conversao, ignorado", {
        evento: marca.evento, acao: marca.acao,
      });
      return;
    }

    if (!marca.email) {
      logger.warn("[tiktok] marca sem email: sem como casar a conversao", {
        evento: marca.evento, transacao: marca.transacao,
      });
      return;
    }

    const corpo = montarCorpo({
      email: marca.email,
      transacao: marca.transacao || evento.params.chave,
      valor: marca.valor,
      moeda: marca.moeda,
      em: marca.em || Date.now(),
    });

    const r = await enviar(corpo, TIKTOK_TOKEN.value());

    // O e-mail NUNCA entra no log em texto: este log é lido por quem abre o
    // console do Firebase, e a transacao já identifica a venda.
    if (r.ok) {
      logger.info("[tiktok] conversao enviada", {
        transacao: marca.transacao, valor: marca.valor, resposta: r.corpo,
      });
    } else {
      logger.error("[tiktok] conversao recusada", {
        transacao: marca.transacao, status: r.status, resposta: r.corpo,
      });
    }
  }
);
