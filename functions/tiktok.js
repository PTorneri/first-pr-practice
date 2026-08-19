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

// Só a PRIMEIRA compra de cada pessoa é conversão de anúncio.
//
// ---------- A versão anterior desta função estava errada ----------
//
// Ela decidia pelo NOME DO EVENTO da Cakto: mandava quando o evento fosse
// subscription_created, porque um teste de 11/08/2026 mostrou a assinatura
// nascendo com esse nome. A primeira venda real, em 19/08/2026, chegou como
// purchase_approved + acao "assinatura-cobranca" e foi descartada em silêncio.
//
// O erro não foi o palpite; foi onde ele se apoiou. O comentário do topo do
// index.js avisa, duas vezes, que a taxonomia de eventos da Cakto é mal
// documentada e já mentiu antes. Amarrar a conversão a esses nomes era
// construir sobre a única parte do sistema declaradamente instável.
//
// Agora a pergunta é feita ao NOSSO banco, não à Cakto: esta pessoa já pagou
// alguma vez? O webhook já lê o documento da assinatura dentro da transação
// para decidir o prazo, então ele sabe disso de graça, e grava a resposta em
// `primeiraCompra`. Renovação tem liberadoEm anterior; primeira compra não tem.
//
// Mandar renovação atribuiria ao anúncio uma receita que ele não gerou, e o
// erro cresceria todo mês, em silêncio, sempre para cima — o formato de engano
// mais difícil de perceber, porque os números ficam bons.
function deveEnviar(marca) {
  if (!marca) return false;
  // Ausente (marcas gravadas antes desta correção) conta como false: melhor
  // não mandar do que mandar uma renovação achando que é venda nova.
  if (marca.primeiraCompra !== true) return false;
  return marca.acao === "liberar" || marca.acao === "assinatura-cobranca";
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

// O fetch entra por parâmetro só para o teste não tocar a rede. Em produção
// vale o global do Node 22.
//
// O cabeçalho é "Access-Token", e isso foi PROVADO contra a API real por uma
// sonda descartável antes de qualquer código depender disso: a variante
// "Authorization: Bearer" devolveu 40104 — "The access_token is empty". A
// documentação pública não fechava esse ponto.
//
// Esta função NUNCA lança. Quem a chama é um gatilho do Firestore, e uma
// exceção ali viraria retentativa de uma escrita que já aconteceu. O TikTok
// fora do ar não pode virar problema nosso: falhou, devolve ok:false e loga.
async function enviar(corpo, token, fetchImpl) {
  const buscar = fetchImpl || fetch;
  try {
    const resposta = await buscar(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": token,
      },
      body: JSON.stringify(corpo),
    });
    return { ok: resposta.ok, status: resposta.status, corpo: await resposta.text() };
  } catch (err) {
    return { ok: false, status: 0, corpo: String(err && err.message) };
  }
}

module.exports = { ENDPOINT, PIXEL, deveEnviar, hashEmail, montarCorpo, enviar };
