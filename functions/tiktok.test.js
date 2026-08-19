// Testes da lógica pura do envio ao TikTok.
//
// Rodar:  cd functions && node --test tiktok.test.js
//
// Usam o node:test embutido no Node 22 — sem dependência nova, porque este
// repositório não tem test runner e não é este trabalho que vai introduzir um.

const test = require("node:test");
const assert = require("node:assert");
const { deveEnviar, hashEmail, montarCorpo } = require("./tiktok");

test("compra única de 90 dias, de quem nunca pagou, é conversão", () => {
  assert.equal(
    deveEnviar({ evento: "purchase_approved", acao: "liberar", primeiraCompra: true }),
    true
  );
});

test("primeira cobrança da assinatura é conversão, venha com o nome de evento que vier", () => {
  // O ponto desta correção: em 11/08/2026 a Cakto mandou subscription_created;
  // na primeira venda real, em 19/08/2026, mandou purchase_approved. Os dois
  // são a mesma coisa, e a decisão não pode depender de qual nome veio.
  assert.equal(
    deveEnviar({ evento: "subscription_created", acao: "assinatura-cobranca", primeiraCompra: true }),
    true
  );
  assert.equal(
    deveEnviar({ evento: "purchase_approved", acao: "assinatura-cobranca", primeiraCompra: true }),
    true
  );
  assert.equal(
    deveEnviar({ evento: "um_evento_que_a_cakto_ainda_nao_inventou", acao: "assinatura-cobranca", primeiraCompra: true }),
    true
  );
});

test("renovação NÃO é conversão", () => {
  // Quem já pagou antes tem liberadoEm no documento, e o webhook grava
  // primeiraCompra: false.
  assert.equal(
    deveEnviar({ evento: "subscription_renewed", acao: "assinatura-cobranca", primeiraCompra: false }),
    false
  );
  assert.equal(
    deveEnviar({ evento: "purchase_approved", acao: "assinatura-cobranca", primeiraCompra: false }),
    false
  );
});

test("recompra de quem já foi cliente NÃO é conversão nova", () => {
  assert.equal(
    deveEnviar({ evento: "purchase_approved", acao: "liberar", primeiraCompra: false }),
    false
  );
});

test("cancelamento, reembolso e chargeback não enviam nada, nem na primeira vez", () => {
  assert.equal(deveEnviar({ evento: "refund", acao: "revogar", primeiraCompra: true }), false);
  assert.equal(deveEnviar({ evento: "chargeback", acao: "revogar", primeiraCompra: true }), false);
  assert.equal(
    deveEnviar({ evento: "subscription_canceled", acao: "assinatura-cancelada", primeiraCompra: true }),
    false
  );
});

test("marca sem primeiraCompra não envia", () => {
  // Marcas gravadas antes desta correção caem aqui. Melhor não mandar do que
  // mandar uma renovação achando que é venda nova.
  assert.equal(deveEnviar({ evento: "purchase_approved", acao: "liberar" }), false);
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

test("montarCorpo só inclui test_event_code quando pedido", () => {
  const normal = montarCorpo({
    email: "a@b.com", transacao: "t", valor: 19.99, moeda: "BRL", em: 1755561600000,
  });
  assert.equal(normal.test_event_code, undefined,
    "venda real NUNCA pode ir para a caixa de testes");

  const teste = montarCorpo({
    email: "a@b.com", transacao: "t", valor: 19.99, moeda: "BRL", em: 1755561600000,
    codigoDeTeste: "TEST05257",
  });
  assert.equal(teste.test_event_code, "TEST05257");
  // O resto do corpo tem que ser idêntico, senão o teste não prova nada sobre
  // o caminho real.
  const { test_event_code, ...semCodigo } = teste;
  assert.deepEqual(semCodigo, normal);
});
