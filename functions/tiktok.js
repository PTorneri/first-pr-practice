// A parte do envio ao TikTok que não fala com ninguém: decidir se o evento é
// uma conversão, gerar o hash do e-mail e montar o corpo.
//
// Separado da Cloud Function de propósito. É aqui que um erro custa dinheiro —
// uma renovação contada como venda nova infla o ROAS todo mês —, e só o que é
// puro dá para testar sem emulador. Ver tiktok.test.js.

const crypto = require("crypto");

const ENDPOINT = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

// O pixel é público: ele vai no HTML servido. Quem é segredo é o token de
// acesso, e esse mora no Secret Manager (TIKTOK_TOKEN).
const PIXEL = "DA2VL8JC77U74CG8DEO0";

// Só a PRIMEIRA cobrança é conversão de anúncio.
//
// A tentação é olhar só o `evento`, e ela está errada: purchase_approved chega
// tanto na compra única quanto em cobranças de assinatura. Quem separa os dois
// é a `acao` que o webhook já calculou (ver index.js).
//
// Mandar renovação atribuiria ao anúncio uma receita que ele não gerou, e o
// erro cresceria todo mês, em silêncio, sempre para cima — o formato de engano
// mais difícil de perceber, porque os números ficam bons.
function deveEnviar(marca) {
  if (!marca || !marca.acao) return false;
  if (marca.acao === "liberar") return true;
  return marca.acao === "assinatura-cobranca" && marca.evento === "subscription_created";
}

// O TikTok casa a conversão pelo e-mail com hash. Normalizar antes é
// obrigatório: " Aluno@Exemplo.com " e "aluno@exemplo.com" precisam gerar o
// mesmo hash, ou a conversão simplesmente não casa — e não casar não dá erro
// nenhum, a venda só não aparece.
function hashEmail(email) {
  return crypto
    .createHash("sha256")
    .update(String(email).trim().toLowerCase(), "utf8")
    .digest("hex");
}

function montarCorpo({ email, transacao, valor, moeda, em }) {
  const evento = {
    event: "CompletePayment",
    // Epoch em SEGUNDOS. O Firestore e o resto deste projeto trabalham em
    // milissegundos, então esta divisão é exatamente o tipo de detalhe que
    // passa despercebido e joga todo evento para 1970.
    event_time: Math.floor(em / 1000),
    // O id da transação da Cakto serve de event_id: é único por venda, e é o
    // que permitiria deduplicar se um dia houvesse uma segunda fonte.
    event_id: String(transacao),
    user: { email: hashEmail(email) },
  };

  // Sem valor o evento ainda vale como conversão; só não dá para otimizar por
  // receita. Mandar `value: null` seria pior que omitir.
  if (valor !== null && valor !== undefined && !Number.isNaN(Number(valor))) {
    evento.properties = { value: Number(valor), currency: moeda || "BRL" };
  }

  return { event_source: "web", event_source_id: PIXEL, data: [evento] };
}

module.exports = { ENDPOINT, PIXEL, deveEnviar, hashEmail, montarCorpo };
