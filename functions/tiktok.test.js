// Testes da lógica pura do envio ao TikTok.
//
// Rodar:  cd functions && node --test tiktok.test.js
//
// Usam o node:test embutido no Node 22 — sem dependência nova, porque este
// repositório não tem test runner e não é este trabalho que vai introduzir um.

const test = require("node:test");
const assert = require("node:assert");
const { deveEnviar, hashEmail, montarCorpo } = require("./tiktok");

test("compra única de 90 dias é conversão", () => {
  assert.equal(deveEnviar({ evento: "purchase_approved", acao: "liberar" }), true);
});

test("primeira cobrança da assinatura é conversão", () => {
  assert.equal(
    deveEnviar({ evento: "subscription_created", acao: "assinatura-cobranca" }),
    true
  );
});

test("renovação NÃO é conversão", () => {
  assert.equal(
    deveEnviar({ evento: "subscription_renewed", acao: "assinatura-cobranca" }),
    false
  );
});

test("purchase_approved de assinatura NÃO é conversão", () => {
  // O mesmo evento chega nos dois casos; só a acao distingue.
  assert.equal(
    deveEnviar({ evento: "purchase_approved", acao: "assinatura-cobranca" }),
    false
  );
});

test("cancelamento, reembolso e chargeback não enviam nada", () => {
  assert.equal(deveEnviar({ evento: "refund", acao: "revogar" }), false);
  assert.equal(deveEnviar({ evento: "chargeback", acao: "revogar" }), false);
  assert.equal(
    deveEnviar({ evento: "subscription_canceled", acao: "assinatura-cancelada" }),
    false
  );
});

test("documento sem acao não envia", () => {
  assert.equal(deveEnviar({ evento: "purchase_approved" }), false);
  assert.equal(deveEnviar({}), false);
  assert.equal(deveEnviar(null), false);
});

test("hashEmail normaliza antes de gerar o hash", () => {
  const esperado = hashEmail("aluno@exemplo.com");
  assert.equal(hashEmail("  ALUNO@Exemplo.COM  "), esperado);
  assert.match(esperado, /^[0-9a-f]{64}$/);
});

test("hashEmail distingue e-mails diferentes", () => {
  assert.equal(hashEmail("aluno@exemplo.com").length, 64);
  assert.notEqual(hashEmail("a@b.com"), hashEmail("c@d.com"));
});

test("montarCorpo produz o formato da Events API", () => {
  const corpo = montarCorpo({
    email: "aluno@exemplo.com",
    transacao: "tx-123",
    valor: 49.99,
    moeda: "BRL",
    em: 1755561600000,
  });

  assert.equal(corpo.event_source, "web");
  assert.equal(corpo.event_source_id, "DA2VL8JC77U74CG8DEO0");
  assert.equal(corpo.data.length, 1);

  const ev = corpo.data[0];
  assert.equal(ev.event, "CompletePayment");
  assert.equal(ev.event_time, 1755561600); // segundos, não milissegundos
  assert.equal(ev.event_id, "tx-123");
  assert.equal(ev.user.email, hashEmail("aluno@exemplo.com"));
  assert.equal(ev.properties.value, 49.99);
  assert.equal(ev.properties.currency, "BRL");
});

test("montarCorpo assume BRL quando a moeda não vem", () => {
  const corpo = montarCorpo({
    email: "a@b.com", transacao: "t", valor: 19.99, moeda: null, em: 1755561600000,
  });
  assert.equal(corpo.data[0].properties.currency, "BRL");
});

test("montarCorpo omite properties quando não há valor", () => {
  // Sem valor o evento ainda conta como conversão; só não otimiza por receita.
  // Mandar value:null seria pior que omitir.
  const corpo = montarCorpo({
    email: "a@b.com", transacao: "t", valor: null, moeda: null, em: 1755561600000,
  });
  assert.equal(corpo.data[0].properties, undefined);
});

// ---------------------------------------------------------------- o envio
//
// O fetch entra por parâmetro só para estes testes não tocarem a rede. A
// sonda descartável da Tarefa 2 provou contra a API real que o cabeçalho é
// "Access-Token" (o Authorization: Bearer devolveu 40104, access_token vazio).

const { enviar, ENDPOINT } = require("./tiktok");

test("enviar faz POST no endpoint com o cabeçalho Access-Token", async () => {
  let recebido = null;
  const falso = async (url, opcoes) => {
    recebido = { url, opcoes };
    return { ok: true, status: 200, text: async () => '{"code":0,"message":"OK"}' };
  };

  const corpo = montarCorpo({
    email: "a@b.com", transacao: "t1", valor: 49.99, moeda: "BRL", em: 1755561600000,
  });
  const r = await enviar(corpo, "token-secreto", falso);

  assert.equal(recebido.url, ENDPOINT);
  assert.equal(recebido.opcoes.method, "POST");
  assert.equal(recebido.opcoes.headers["Access-Token"], "token-secreto");
  assert.equal(recebido.opcoes.headers["Content-Type"], "application/json");
  assert.deepEqual(JSON.parse(recebido.opcoes.body), corpo);
  assert.equal(r.ok, true);
  assert.equal(r.status, 200);
});

test("enviar devolve ok:false quando a API recusa, sem lançar", async () => {
  const falso = async () => ({
    ok: false, status: 401, text: async () => '{"code":40104,"message":"access_token is empty"}',
  });
  const r = await enviar({ data: [] }, "errado", falso);
  assert.equal(r.ok, false);
  assert.equal(r.status, 401);
  assert.match(r.corpo, /access_token is empty/);
});

test("enviar devolve ok:false quando a rede cai, sem lançar", async () => {
  const falso = async () => { throw new Error("ECONNRESET"); };
  const r = await enviar({ data: [] }, "t", falso);
  assert.equal(r.ok, false);
  assert.equal(r.status, 0);
  assert.match(r.corpo, /ECONNRESET/);
});

test("enviar nunca deixa o token vazar no retorno", async () => {
  const falso = async () => ({ ok: true, status: 200, text: async () => "{}" });
  const r = await enviar({ data: [] }, "token-secreto", falso);
  assert.equal(JSON.stringify(r).includes("token-secreto"), false);
});
