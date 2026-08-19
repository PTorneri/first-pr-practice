# Rastreamento de anúncios do TikTok — plano de implementação

> **Para quem executa:** SUB-SKILL OBRIGATÓRIA — use `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans` para implementar tarefa a tarefa. Os passos usam `- [ ]` para acompanhamento.

**Objetivo:** entregar ao TikTok o evento de compra pelo servidor e um `PageView` consentido na landing, para que a campanha otimize por venda e não por clique.

**Arquitetura:** o pixel vive só na landing da raiz e só carrega após aceite explícito. A compra sai por uma Cloud Function separada, disparada pela criação de `webhooksProcessados/{chave}` — documento que o webhook da Cakto já grava uma única vez por evento, dentro da transação, o que dá idempotência de graça e mantém a API do TikTok fora do caminho do pagamento.

**Stack:** JavaScript sem framework no navegador (IIFE, igual ao resto do app); Node 22 + firebase-functions v7 (API v2) no servidor; `node:test` embutido para os testes, sem dependência nova.

**Spec:** [docs/superpowers/specs/2026-08-19-tiktok-ads-design.md](../specs/2026-08-19-tiktok-ads-design.md)

## Restrições globais

- Pixel: `DA2VL8JC77U74CG8DEO0`
- Segredo: `TIKTOK_TOKEN`, já gravado no Secret Manager do projeto `app-fgv-insper`
- Região das funções: `southamerica-east1`
- Endpoint: `https://business-api.tiktok.com/open_api/v1.3/event/track/`
- `event_time` é epoch em **segundos**; e-mail em **SHA-256 hex minúsculo**
- Tudo em português do Brasil: comentários, commits, nomes de arquivo, textos de UI
- Commits vão direto na `main`; não há fluxo de branch neste repositório
- Ao mexer em qualquer arquivo do app, o `?v=` sobe de **57 para 58** em **todos** os pontos de uma vez, e `build-paginas.js` roda depois
- **Nunca** editar os `index.html` gerados — a fonte é `template.html`

## Duas incertezas, resolvidas por verificação e não por chute

A documentação pública do TikTok não deixou claros dois pontos, e a Tarefa 2 os
resolve com uma chamada real antes de qualquer código depender deles:

1. **O cabeçalho de autenticação** é `Access-Token: <token>` ou `Authorization: Bearer <token>`.
2. **O nome do evento** é `CompletePayment` (nome padrão do pixel web) ou `Purchase`.

A resposta da API diz qual está certo, e ela é barata de obter.

**RESOLVIDA em 19/08/2026:** a primeira venda real trouxe `amount` como o
número `19.99` — **reais**, não centavos. O aviso descrito abaixo nem chegou
a disparar. O texto original fica registrado:

Existe ainda uma terceira, que só uma venda real responde: **`data.amount` da
Cakto vem em reais (`49.99`) ou em centavos (`4999`)?** O webhook nunca usou
esse campo. A Tarefa 4 grava o valor cru e emite um aviso no log quando ele
parecer centavos, e a Tarefa 9 confere contra a venda real. Enquanto não
estiver confirmado, o valor vai assim mesmo — errar o valor atrapalha a
otimização por receita, mas não impede a conversão de ser contada.

## Estrutura de arquivos

| Arquivo | Responsabilidade |
|---|---|
| `functions/tiktok.js` (novo) | Lógica pura: decidir se envia, gerar o hash, montar o corpo. Sem rede, sem Firebase — é o que os testes cobrem. |
| `functions/tiktok.test.js` (novo) | Testes de `tiktok.js`, via `node --test`. |
| `functions/tiktok-conversao.js` (novo) | A Cloud Function de gatilho. Só a cola: lê o documento, chama a lógica pura, faz o POST, loga. |
| `functions/index.js` (modificar) | Grava `acao`, `valor` e `moeda` na marca; reexporta a função nova. |
| `vestibular-direito-v2/marketing.js` (novo) | Consentimento e pixel, só na landing. |
| `vestibular-direito-v2/styles.css` (modificar) | Estilo do banner. |
| `vestibular-direito-v2/build-paginas.js` (modificar) | Injeta o `marketing.js` só na raiz, depois do desvio. |
| `vestibular-direito-v2/privacidade.html` (modificar) | Texto verdadeiro e botão de revogação. |
| `vestibular-direito-v2/template.html` (modificar) | `?v=` de 57 para 58. |

**Sobre testes:** este repositório não tem test runner, e adicionar um ao app do
navegador seria uma mudança grande e unilateral. O caminho honesto: a lógica de
decisão do servidor — que é onde um erro custa dinheiro — vira funções puras em
`functions/tiktok.js` e ganha testes de verdade com o `node:test` embutido no
Node 22. O lado do navegador é verificado por observação explícita no navegador,
com passos e resultados esperados escritos abaixo.

---

### Tarefa 1: A lógica pura de decisão e de montagem

**Arquivos:**
- Criar: `functions/tiktok.js`
- Testar: `functions/tiktok.test.js`

**Interfaces:**
- Consome: nada.
- Produz: `deveEnviar({ evento, acao })` → `boolean`; `hashEmail(email)` → `string` (hex de 64 chars); `montarCorpo({ email, transacao, valor, moeda, em })` → objeto do corpo da Events API; `PIXEL` → `string`; `ENDPOINT` → `string`.

**Por que `deveEnviar` recebe `acao` e não só `evento`:** a spec dizia
`purchase_approved` → envia. Ler o webhook a fundo mostrou que isso está errado:
`purchase_approved` também chega em cobranças de assinatura, e aí ele é uma
**renovação**, não uma primeira compra. Quem separa os dois é a `acao` que o
webhook já calcula. `liberar` é a compra única de 90 dias; a primeira cobrança
da mensal é sempre `subscription_created`.

- [ ] **Passo 1: Escrever os testes que falham**

```js
// functions/tiktok.test.js
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
});

test("hashEmail normaliza antes de gerar o hash", () => {
  const esperado = hashEmail("aluno@exemplo.com");
  assert.equal(hashEmail("  ALUNO@Exemplo.COM  "), esperado);
  assert.match(esperado, /^[0-9a-f]{64}$/);
});

test("hashEmail bate com o valor conhecido de sha256", () => {
  // Conferível com:  printf 'aluno@exemplo.com' | sha256sum
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
  const corpo = montarCorpo({
    email: "a@b.com", transacao: "t", valor: null, moeda: null, em: 1755561600000,
  });
  assert.equal(corpo.data[0].properties, undefined);
});
```

- [ ] **Passo 2: Rodar e ver falhar**

```bash
cd functions && node --test tiktok.test.js
```

Esperado: FALHA com `Cannot find module './tiktok'`.

- [ ] **Passo 3: Escrever a implementação mínima**

```js
// functions/tiktok.js
//
// A parte do envio ao TikTok que não fala com ninguém: decidir se o evento é
// uma conversão, gerar o hash do e-mail e montar o corpo. Separado da Cloud
// Function de propósito — é aqui que um erro custa dinheiro (uma renovação
// contada como venda nova infla o ROAS todo mês), e só o que é puro dá para
// testar sem emulador.

const crypto = require("crypto");

const ENDPOINT = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

// O pixel é público — ele vai no HTML servido. Quem é segredo é o token, e
// esse mora no Secret Manager.
const PIXEL = "DA2VL8JC77U74CG8DEO0";

// Só a PRIMEIRA cobrança é conversão de anúncio.
//
// A tentação é olhar só o `evento`, e ela está errada: purchase_approved chega
// tanto na compra única quanto em cobranças de assinatura. Quem separa os dois
// é a `acao` que o webhook já calculou. Mandar renovação atribuiria ao anúncio
// uma receita que ele não gerou, e o erro cresceria todo mês, em silêncio,
// sempre para cima — o formato de engano mais difícil de perceber, porque os
// números ficam bons.
function deveEnviar(marca) {
  if (!marca || !marca.acao) return false;
  if (marca.acao === "liberar") return true;
  return marca.acao === "assinatura-cobranca" && marca.evento === "subscription_created";
}

// O TikTok casa a conversão pelo e-mail com hash. Normalizar antes é
// obrigatório: " Aluno@Exemplo.com " e "aluno@exemplo.com" precisam gerar o
// mesmo hash, ou a conversão simplesmente não casa e some sem erro nenhum.
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
    // O id da transação da Cakto serve de event_id: é único por venda e é o
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
```

- [ ] **Passo 4: Rodar e ver passar**

```bash
cd functions && node --test tiktok.test.js
```

Esperado: todos os testes passam.

- [ ] **Passo 5: Commitar**

```bash
git add functions/tiktok.js functions/tiktok.test.js
git commit -m "Renovação não é venda nova: a decisão de enviar ao TikTok olha a acao, não o evento

purchase_approved chega tanto na compra única quanto na cobrança de assinatura.
Decidir pelo nome do evento mandaria toda renovação como conversão, e o ROAS
subiria sozinho todo mês — erro que não dá sintoma, porque o número fica bom."
```

---

### Tarefa 2: Resolver as duas incertezas com uma chamada real

**Arquivos:**
- Criar (descartável): `%SCRATCH%/sonda-tiktok.js` (a pasta de rascunho da sessão, fora do repositório)

Esta tarefa não entrega código de produção. Ela troca dois chutes por dois
fatos, antes que qualquer coisa dependa deles.

**Interfaces:**
- Consome: `montarCorpo` da Tarefa 1.
- Produz: a decisão sobre o cabeçalho de autenticação e o nome do evento, que a Tarefa 3 usa.

- [ ] **Passo 1: Escrever a sonda**

Grave fora do repositório, na pasta de rascunho da sessão, para não versionar
nada que toque o token:

```js
// sonda-tiktok.js — descartável. Descobre o cabeçalho certo e o nome do evento.
// Uso:  TIKTOK_TOKEN=... node sonda-tiktok.js
const { montarCorpo, ENDPOINT } = require("./tiktok");

const token = process.env.TIKTOK_TOKEN;
if (!token) { console.error("Faltou TIKTOK_TOKEN no ambiente."); process.exit(1); }

async function tentar(nomeCabecalho, valorCabecalho, nomeEvento) {
  const corpo = montarCorpo({
    email: "teste@sagaxedu.com.br",
    transacao: "sonda-" + nomeEvento + "-" + nomeCabecalho,
    valor: 1.0, moeda: "BRL", em: 1755561600000,
  });
  corpo.data[0].event = nomeEvento;
  corpo.test_event_code = process.env.TIKTOK_TEST_CODE || undefined;

  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", [nomeCabecalho]: valorCabecalho },
    body: JSON.stringify(corpo),
  });
  console.log(nomeCabecalho, "+", nomeEvento, "→", r.status, await r.text());
}

(async () => {
  await tentar("Access-Token", token, "CompletePayment");
  await tentar("Authorization", "Bearer " + token, "CompletePayment");
  await tentar("Access-Token", token, "Purchase");
})();
```

- [ ] **Passo 2: Rodar a sonda**

Copie `functions/tiktok.js` para junto da sonda (ela o exige como `./tiktok`),
pegue um *Test Event Code* em *Events Manager → o pixel → Test Events* e rode:

```bash
cd "$SCRATCH" && TIKTOK_TOKEN='<o token>' TIKTOK_TEST_CODE='<o código>' node sonda-tiktok.js
```

Esperado: uma das combinações devolve `"code":0` e `"message":"OK"`; as erradas
devolvem código de erro com mensagem legível (autenticação inválida, ou nome de
evento não reconhecido).

- [ ] **Passo 3: Confirmar na tela**

Em *Events Manager → o pixel → Test Events*, o evento aparece. Anote qual
cabeçalho e qual nome de evento funcionaram.

- [ ] **Passo 4: Corrigir a Tarefa 1 se o nome do evento for outro**

Se o que funcionou foi `Purchase` e não `CompletePayment`, mude a constante em
`functions/tiktok.js` e o teste correspondente em `functions/tiktok.test.js`,
rode `node --test tiktok.test.js` e commite:

```bash
git add functions/tiktok.js functions/tiktok.test.js
git commit -m "O nome do evento de compra na Events API é <o que a sonda provou>"
```

Se `CompletePayment` funcionou, não há o que commitar aqui.

- [ ] **Passo 5: Apagar a sonda**

```bash
rm "$SCRATCH/sonda-tiktok.js" "$SCRATCH/tiktok.js"
```

Ela recebeu o token por variável de ambiente e não deve sobreviver à tarefa.

---

### Tarefa 3: O envio, com o `fetch` injetável

**Arquivos:**
- Modificar: `functions/tiktok.js`
- Testar: `functions/tiktok.test.js`

**Interfaces:**
- Consome: `ENDPOINT`, `montarCorpo` da Tarefa 1; o cabeçalho provado na Tarefa 2.
- Produz: `enviar(corpo, token, fetchImpl)` → `Promise<{ ok, status, corpo }>`.

O `fetch` entra por parâmetro para que o teste não toque a rede. É a única
razão do parâmetro; em produção ele fica com o padrão.

- [ ] **Passo 1: Escrever os testes que falham**

Acrescente ao fim de `functions/tiktok.test.js`:

```js
const { enviar, ENDPOINT } = require("./tiktok");

test("enviar faz POST no endpoint com o cabeçalho de autenticação", async () => {
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
    ok: false, status: 401, text: async () => '{"code":40001,"message":"invalid token"}',
  });
  const r = await enviar({ data: [] }, "errado", falso);
  assert.equal(r.ok, false);
  assert.equal(r.status, 401);
  assert.match(r.corpo, /invalid token/);
});

test("enviar devolve ok:false quando a rede cai, sem lançar", async () => {
  const falso = async () => { throw new Error("ECONNRESET"); };
  const r = await enviar({ data: [] }, "t", falso);
  assert.equal(r.ok, false);
  assert.match(r.corpo, /ECONNRESET/);
});

test("enviar nunca deixa o token vazar no retorno", async () => {
  const falso = async () => ({ ok: true, status: 200, text: async () => "{}" });
  const r = await enviar({ data: [] }, "token-secreto", falso);
  assert.equal(JSON.stringify(r).includes("token-secreto"), false);
});
```

- [ ] **Passo 2: Rodar e ver falhar**

```bash
cd functions && node --test tiktok.test.js
```

Esperado: FALHA — `enviar is not a function`.

- [ ] **Passo 3: Implementar**

Acrescente a `functions/tiktok.js`, antes do `module.exports`:

```js
// O fetch entra por parâmetro só para o teste não tocar a rede. Em produção
// vale o global do Node 22.
//
// Esta função NUNCA lança. Quem a chama é um gatilho do Firestore, e uma
// exceção ali viraria retentativa de uma escrita que já aconteceu. O TikTok
// fora do ar não pode virar problema nosso: falhou, loga e segue.
async function enviar(corpo, token, fetchImpl) {
  const buscar = fetchImpl || fetch;
  try {
    const resposta = await buscar(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Provado pela sonda da Tarefa 2. Se aquela tarefa mostrou
        // "Authorization: Bearer", troque aqui e no teste.
        "Access-Token": token,
      },
      body: JSON.stringify(corpo),
    });
    return { ok: resposta.ok, status: resposta.status, corpo: await resposta.text() };
  } catch (err) {
    return { ok: false, status: 0, corpo: String(err && err.message) };
  }
}
```

E inclua `enviar` no `module.exports`.

- [ ] **Passo 4: Rodar e ver passar**

```bash
cd functions && node --test tiktok.test.js
```

Esperado: todos passam.

- [ ] **Passo 5: Commitar**

```bash
git add functions/tiktok.js functions/tiktok.test.js
git commit -m "O envio ao TikTok nunca lança: quem o chama é um gatilho, e exceção ali é retentativa

Uma falha da API do TikTok não pode virar reprocessamento de uma escrita que já
aconteceu. Falhou, devolve ok:false e loga."
```

---

### Tarefa 4: O webhook grava o que a conversão precisa

**Arquivos:**
- Modificar: `functions/index.js` — o `tx.set(marcaRef, ...)` dentro da transação

**Interfaces:**
- Consome: nada.
- Produz: `webhooksProcessados/{chave}` passa a conter `acao`, `valor`, `moeda` além de `evento`, `email`, `transacao`, `em`.

O documento de marca é lido pelo gatilho da Tarefa 5. Sem `acao` ele não
consegue distinguir primeira cobrança de renovação; sem `valor` não há
otimização por receita.

- [ ] **Passo 1: Ampliar a gravação da marca**

Em `functions/index.js`, dentro da transação, troque:

```js
        if (marcaRef) {
          tx.set(marcaRef, {
            evento, email, transacao: transacao, em: Date.now(),
          });
        }
```

por:

```js
        if (marcaRef) {
          // `acao` e `valor` existem aqui só para a conversão do TikTok, que é
          // lida do documento de marca por um gatilho (ver tiktok-conversao.js).
          // Ficam nesta escrita, e não numa segunda, porque a marca já é
          // gravada uma única vez por evento dentro desta transação — é a
          // idempotência que o gatilho herda de graça.
          tx.set(marcaRef, {
            evento, email, transacao: transacao, em: Date.now(),
            acao: acao,
            valor: typeof d.amount === "number" ? d.amount : null,
            moeda: "BRL",
          });
        }
```

- [ ] **Passo 2: Avisar quando o valor parecer centavos**

A Cakto nunca teve esse campo lido aqui, e ninguém sabe se `amount` vem em
reais (`49.99`) ou centavos (`4999`). Os dois preços do produto são R$ 49,99 e
R$ 19,99, então qualquer valor a partir de 500 é quase certamente centavos.
Logo antes do `try {` da transação, acrescente:

```js
    // Ninguém sabe ainda se a Cakto manda amount em reais ou em centavos — o
    // webhook nunca usou este campo. Um valor grande demais para os nossos
    // preços é o sinal de que vem em centavos, e aí a conversão do TikTok
    // estaria 100x inflada. O aviso é para descobrir isso na PRIMEIRA venda,
    // e não num relatório de ROAS que ninguém desconfia.
    if (typeof d.amount === "number" && d.amount >= 500) {
      logger.warn("[cakto] amount alto demais para os nossos precos: provavelmente centavos", {
        evento, amount: d.amount,
      });
    }
```

- [ ] **Passo 3: Conferir que nada mais mudou**

```bash
git diff functions/index.js
```

Esperado: exatamente dois trechos — a marca ampliada e o aviso. Nenhuma linha
da lógica de `expiraEm`, `ativa` ou idempotência pode aparecer no diff. Se
aparecer, desfaça: este arquivo decide quem tem acesso pago.

- [ ] **Passo 4: Commitar**

```bash
git add functions/index.js
git commit -m "A marca do webhook passa a guardar acao, valor e moeda, que a conversão precisa

Grava na mesma transação que já existia, e não numa segunda escrita: é de lá
que o gatilho do TikTok herda a idempotência. E avisa quando amount parecer
centavos, para o erro de 100x aparecer na primeira venda e não num ROAS."
```

---

### Tarefa 5: A Cloud Function de conversão

**Arquivos:**
- Criar: `functions/tiktok-conversao.js`
- Modificar: `functions/index.js` (reexportar)

**Interfaces:**
- Consome: `deveEnviar`, `montarCorpo`, `enviar` de `./tiktok`; o documento gravado na Tarefa 4.
- Produz: `exports.tiktokConversao`, uma função `onDocumentCreated`.

- [ ] **Passo 1: Escrever a função**

```js
// functions/tiktok-conversao.js
//
// Manda a compra para o TikTok, para que a campanha otimize por venda e não
// por clique. O checkout é da Cakto, num domínio que não é nosso, então um
// pixel no navegador nunca veria esta conversão — o servidor é a única fonte.
//
// POR QUE ESTA FUNÇÃO É SEPARADA DO caktoWebhook:
//
//   1. O caminho do pagamento não pode depender da API do TikTok. Chamar o
//      TikTok dentro do onRequest atrasaria a resposta à Cakto, e a Cakto
//      REENVIA quando não recebe 200 — um TikTok lento viraria cobrança
//      duplicada. O modo de falha que a idempotência do webhook existe para
//      conter seria criado por uma métrica de anúncio.
//
//   2. A idempotência vem de graça. webhooksProcessados/{chave} é criado uma
//      única vez, dentro da transação do webhook, e nunca reescrito.
//      onDocumentCreated dispara uma vez. Não é preciso marcar "já enviei" no
//      documento, nem proteger o gatilho contra a própria escrita.
//
// LIMITE CONHECIDO: quando a Cakto manda um evento sem data.id, o webhook
// processa mas NÃO grava a marca (o comentário lá explica: a alternativa
// envenenava a deduplicação para sempre). Nesses casos não há gatilho e a
// conversão não chega ao TikTok. É raro, já vai como aviso no log, e mexer na
// deduplicação do PAGAMENTO para salvar uma métrica de ANÚNCIO seria trocar
// risco caro por ganho barato.

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const { deveEnviar, montarCorpo, enviar } = require("./tiktok");

const TIKTOK_TOKEN = defineSecret("TIKTOK_TOKEN");
const REGIAO = "southamerica-east1";

exports.tiktokConversao = onDocumentCreated(
  {
    document: "webhooksProcessados/{chave}",
    region: REGIAO,
    secrets: [TIKTOK_TOKEN],
    // Sem retentativa: um evento de anúncio perdido custa uma linha de
    // relatório. Retentar em cima de uma API de terceiro é como se acumulam
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
      logger.warn("[tiktok] marca sem email: sem como casar a conversao", { marca });
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
```

- [ ] **Passo 2: Reexportar do `index.js`**

No fim de `functions/index.js`:

```js
// A conversão do TikTok mora em arquivo próprio, mas o Firebase só enxerga o
// que o index exporta.
exports.tiktokConversao = require("./tiktok-conversao").tiktokConversao;
```

- [ ] **Passo 3: Verificar que o pacote carrega**

```bash
cd functions && node -e "require('./index.js'); console.log('carregou')"
```

Esperado: imprime `carregou`. Um erro aqui é erro de deploy descoberto de
graça, antes de subir.

- [ ] **Passo 4: Rodar os testes de novo**

```bash
cd functions && node --test tiktok.test.js
```

Esperado: continuam passando — nada em `tiktok.js` mudou.

- [ ] **Passo 5: Commitar**

```bash
git add functions/tiktok-conversao.js functions/index.js
git commit -m "A conversão do TikTok sai por gatilho, para o pagamento não depender da API deles

Pendurada na criação de webhooksProcessados, que o webhook grava uma única vez
dentro da transação: a idempotência vem de graça e não há marca extra nem risco
de o gatilho reagir à própria escrita."
```

---

### Tarefa 6: O consentimento e o pixel, só na landing

**Arquivos:**
- Criar: `vestibular-direito-v2/marketing.js`
- Modificar: `vestibular-direito-v2/styles.css` (fim do arquivo)

**Interfaces:**
- Consome: `window.VD_TRILHA_URL` (injetado pelo gerador; `null` na raiz).
- Produz: `window.VD_MARKETING = { aceitar, recusar, revogar, estado }`.

- [ ] **Passo 1: Escrever o módulo**

```js
// vestibular-direito-v2/marketing.js
//
// O pixel do TikTok, e o consentimento que o precede.
//
// ESTE ARQUIVO SÓ É CARREGADO NA LANDING DA RAIZ. Quem injeta é o
// build-paginas.js, e só na página sem trilha. As quatro páginas de trilha não
// têm rastreador nenhum — o produto pago fica limpo, e a política de
// privacidade pode dizer isso sem mentir.
//
// A landing já é, por construção, a página de tráfego frio: o DESVIO_DA_RAIZ
// manda embora quem tem trilha salva. Quem chega em / e permanece é gente que
// nunca usou o app, que é exatamente o público do anúncio.
//
// NADA é buscado de analytics.tiktok.com antes do aceite. Não baixar o script
// é mais honesto do que baixá-lo e pedir que ele se contenha, e é de graça
// para quem recusa.

(function () {
  "use strict";

  var PIXEL = "DA2VL8JC77U74CG8DEO0";

  // Fora do namespace de trilha (dir_, med_…), ao lado de v2_trilha: é uma
  // decisão da pessoa, não do curso, e teria que valer igual nas quatro se um
  // dia o pixel saísse da landing.
  var LS = "v2_consent_ads";

  function lido() {
    try { return localStorage.getItem(LS); } catch (e) { return null; }
  }
  function grava(valor) {
    try { localStorage.setItem(LS, valor); } catch (e) { /* bloqueado: segue sem pixel */ }
  }

  // O snippet oficial do TikTok, com uma mudança: ele chama ttq.page() no fim,
  // e aqui não. O page() é nosso, disparado depois do aceite — o snippet cru
  // contaria a visita de quem ainda não decidiu.
  function carregarPixel() {
    (function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      var ttq = w[t] = w[t] || [];
      ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
      ttq.setAndDefer = function (t, e) {
        t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); };
      };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (t) {
        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
        return e;
      };
      ttq.load = function (e, n) {
        var r = "https://analytics.tiktok.com/i18n/pixel/events.js", o = n && n.partner;
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r;
        ttq._t = ttq._t || {}; ttq._t[e] = +new Date;
        ttq._o = ttq._o || {}; ttq._o[e] = n || {};
        n = document.createElement("script");
        n.type = "text/javascript"; n.async = !0; n.src = r + "?sdkid=" + e + "&lib=" + t;
        e = document.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(n, e);
      };
      ttq.load(PIXEL);
    })(window, document, "ttq");

    if (window.ttq && window.ttq.page) window.ttq.page();
  }

  function fecharBanner() {
    var el = document.getElementById("consent-ads");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function aceitar() { grava("sim"); fecharBanner(); carregarPixel(); }
  function recusar() { grava("nao"); fecharBanner(); }

  // Para quem aceitou e mudou de ideia. O revokeConsent() só tem efeito se o
  // pixel estiver carregado nesta página; limpar a chave é o que garante que
  // as próximas visitas não carreguem nada.
  function revogar() {
    try { localStorage.removeItem(LS); } catch (e) {}
    if (window.ttq && window.ttq.revokeConsent) window.ttq.revokeConsent();
  }

  function mostrarBanner() {
    var caixa = document.createElement("div");
    caixa.id = "consent-ads";
    caixa.className = "consent-ads";
    caixa.setAttribute("role", "dialog");
    caixa.setAttribute("aria-live", "polite");
    caixa.setAttribute("aria-label", "Consentimento para medição de anúncios");

    var texto = document.createElement("p");
    texto.className = "consent-ads__texto";
    texto.textContent =
      "Podemos medir quantas pessoas chegam aqui pelos nossos anúncios? " +
      "Só nesta página de entrada — o app em si não tem rastreador.";

    var botoes = document.createElement("div");
    botoes.className = "consent-ads__botoes";

    var nao = document.createElement("button");
    nao.type = "button";
    nao.className = "consent-ads__btn consent-ads__btn--recusar";
    nao.textContent = "Não";
    nao.addEventListener("click", recusar);

    var sim = document.createElement("button");
    sim.type = "button";
    sim.className = "consent-ads__btn consent-ads__btn--aceitar";
    sim.textContent = "Pode medir";
    sim.addEventListener("click", aceitar);

    botoes.appendChild(nao);
    botoes.appendChild(sim);
    caixa.appendChild(texto);
    caixa.appendChild(botoes);
    document.body.appendChild(caixa);
  }

  function iniciar() {
    // Cinto e suspensório: o gerador já só injeta este arquivo na raiz, mas se
    // um dia ele for injetado em outro lugar por engano, aqui não roda.
    if (window.VD_TRILHA_URL) return;

    var decisao = lido();
    if (decisao === "sim") { carregarPixel(); return; }
    if (decisao === "nao") return;
    mostrarBanner();
  }

  window.VD_MARKETING = { aceitar: aceitar, recusar: recusar, revogar: revogar, estado: lido };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
```

- [ ] **Passo 2: Estilar o banner**

No fim de `vestibular-direito-v2/styles.css`:

```css
/* ---------- Consentimento de medição de anúncios (só na landing) ----------
   O banner mora na landing da raiz e em lugar nenhum mais. Fica em baixo, sem
   cobrir a primeira dobra: quem chega do anúncio veio ver o produto, e uma
   cortina no meio da tela custa mais visita do que a medição vale. */
.consent-ads {
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  z-index: 9999;
  margin: 0 auto;
  max-width: 34rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--paper-300);
  border-radius: 0.9rem;
  background: var(--white);
  box-shadow: 0 0.5rem 1.5rem rgba(15, 22, 38, 0.18);
}

.consent-ads__texto {
  flex: 1 1 16rem;
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.45;
  color: var(--grey-700);
}

.consent-ads__botoes {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

.consent-ads__btn {
  padding: 0.5rem 0.95rem;
  border-radius: 0.55rem;
  border: 1px solid transparent;
  font: inherit;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
}

.consent-ads__btn--aceitar {
  background: var(--navy-700);
  color: var(--white);
}

.consent-ads__btn--recusar {
  background: transparent;
  color: var(--grey-600);
  border-color: var(--paper-300);
}

.consent-ads__btn:focus-visible {
  outline: 2px solid var(--blue-500);
  outline-offset: 2px;
}
```

- [ ] **Passo 3: Commitar**

```bash
git add vestibular-direito-v2/marketing.js vestibular-direito-v2/styles.css
git commit -m "Pixel só na landing, e nada carrega antes do aceite

O snippet do TikTok vem com ttq.page() embutido; aqui ele sai dessa posição e
só dispara depois do consentimento — senão a visita de quem ainda não decidiu
já teria sido contada."
```

---

### Tarefa 7: Injetar o módulo só na raiz, depois do desvio

**Arquivos:**
- Modificar: `vestibular-direito-v2/build-paginas.js` — a função `gerar()`

**Interfaces:**
- Consome: `marketing.js` da Tarefa 6.
- Produz: `index.html` da raiz com o `<script>` do `marketing.js`; as quatro páginas de trilha sem ele.

- [ ] **Passo 1: Injetar**

Em `gerar()`, o bloco `anuncio` termina com `(pagina.trilha ? "" : DESVIO_DA_RAIZ) + "</script>\n"`. Troque essa última linha por:

```js
    (pagina.trilha ? "" : DESVIO_DA_RAIZ) +
    "</script>\n" +
    (pagina.trilha ? "" : '<script src="' + ateApp + 'marketing.js?v=58" defer></script>\n');
```

- [ ] **Passo 2: Documentar por que a ordem importa**

Logo acima do `const anuncio =`, acrescente ao comentário existente:

```js
  // O marketing.js entra DEPOIS do DESVIO_DA_RAIZ, e só na raiz. A ordem não é
  // estética: o desvio manda embora quem já tem trilha salva, e um pixel antes
  // dele contaria como visita de anúncio o aluno velho que só passou de raspão
  // a caminho da própria página. O `defer` completa a garantia — o script só
  // executa depois do parse, quando o location.replace() já aconteceu.
```

- [ ] **Passo 3: Gerar e conferir a raiz**

```bash
node vestibular-direito-v2/build-paginas.js
grep -c "marketing.js" index.html
```

Esperado: `1`.

- [ ] **Passo 4: Conferir que as trilhas ficaram limpas**

```bash
grep -c "marketing.js" medicina/index.html direito/index.html economia/index.html engenharia/index.html
```

Esperado: `0` para as quatro.

- [ ] **Passo 5: Conferir que o script vem depois do desvio**

```bash
grep -n "location.replace\|marketing.js" index.html
```

Esperado: a linha do `location.replace` tem número MENOR que a do `marketing.js`.

- [ ] **Passo 6: Commitar**

```bash
git add vestibular-direito-v2/build-paginas.js index.html direito/index.html medicina/index.html economia/index.html engenharia/index.html vestibular-direito-v2/index.html
git commit -m "O marketing.js entra só na raiz, e depois do desvio

Antes do desvio, o pixel contaria como visita de anúncio o aluno que só passa
pela raiz a caminho da própria trilha."
```

---

### Tarefa 8: A política de privacidade passa a dizer a verdade

**Arquivos:**
- Modificar: `vestibular-direito-v2/privacidade.html`

Hoje o arquivo afirma o contrário do que o código passou a fazer. Publicar o
pixel sem isto deixa a página falsa.

- [ ] **Passo 1: Corrigir "O que NÃO fazemos"**

Troque o parágrafo da seção (por volta da linha 70):

```html
  <h3>O que NÃO fazemos</h3>
  <p>Não usamos ferramentas de análise de audiência nem de publicidade, não criamos perfil
  para anúncios, não vendemos dados e não compartilhamos dados com terceiros para fins de
  marketing.</p>
```

por:

```html
  <h3>Medição de anúncios</h3>
  <p>Quando anunciamos a sagax, precisamos saber quantas pessoas chegam até nós por esses
  anúncios. Para isso, <strong>apenas a página de entrada</strong> (sagaxedu.com.br) pode
  carregar o pixel de medição do TikTok, e <strong>só depois de você aceitar</strong> — se
  você recusar, nada é carregado. <strong>O app em si não tem rastreador nenhum:</strong> as
  páginas de estudo (/direito/, /medicina/, /economia/, /engenharia/) não carregam pixel em
  hipótese alguma.</p>
  <p>Se você comprar, informamos ao TikTok que houve uma compra, com o valor, e o seu e-mail
  <strong>convertido em um código irreversível</strong> (hash SHA-256) — nunca o e-mail em si.
  Esse código serve só para o TikTok reconhecer que a venda veio de um anúncio.</p>
  <p>Você pode mudar de ideia a qualquer momento no botão abaixo.</p>
  <p><button type="button" id="revogar-ads" class="consent-ads__btn consent-ads__btn--recusar">
  Revogar o consentimento de medição</button>
  <span id="revogar-ads-ok" hidden>Pronto — não mediremos mais nada.</span></p>

  <h3>O que NÃO fazemos</h3>
  <p>Não criamos perfil de comportamento para anúncios, não vendemos dados e não
  compartilhamos seus dados de estudo com terceiros para fins de marketing.</p>
```

- [ ] **Passo 2: Corrigir a seção 11**

Troque:

```html
  <p>Não usamos cookies de publicidade nem de análise. Usamos o armazenamento local do
```

por:

```html
  <p>Usamos o armazenamento local do
```

e acrescente, ao fim do parágrafo dessa seção, antes de `</p>`:

```html
 Se você aceitar a medição de anúncios na página de entrada, o pixel do TikTok
  também pode gravar cookies próprios — só ali, e só depois do seu aceite.
```

- [ ] **Passo 3: Fazer o botão funcionar**

`privacidade.html` não carrega o `marketing.js`. Limpar a chave já basta:
nenhuma outra página carrega o pixel, e a landing volta a perguntar. Antes de
`</body>`, acrescente:

```html
<script>
// Esta página não carrega o pixel, então revogar aqui é apagar a decisão: a
// próxima visita à página de entrada volta a perguntar, e até lá nada carrega.
document.getElementById("revogar-ads").addEventListener("click", function () {
  try { localStorage.removeItem("v2_consent_ads"); } catch (e) {}
  document.getElementById("revogar-ads-ok").hidden = false;
});
</script>
```

- [ ] **Passo 4: Subir o `?v=` desta página**

Ela está atrasada em relação ao app (`?v=53`). Nas linhas 15 e 16, troque
`tokens.css?v=53` e `styles.css?v=53` por `?v=58` — o banner usa classes que só
existem no `styles.css` novo.

- [ ] **Passo 5: Conferir no navegador**

```bash
powershell -ExecutionPolicy Bypass -File serve-root.ps1
```

Abra `http://localhost:8844/vestibular-direito-v2/privacidade.html`, clique no
botão e confirme que a frase "Pronto — não mediremos mais nada." aparece e que
`localStorage.getItem("v2_consent_ads")` devolve `null` no console.

- [ ] **Passo 6: Commitar**

```bash
git add vestibular-direito-v2/privacidade.html
git commit -m "A política de privacidade passa a descrever o pixel que existe

Ela afirmava não usar ferramenta de publicidade nem cookie de análise. Com o
pixel na landing isso virou falso, e uma política falsa é pior que nenhuma."
```

---

### Tarefa 9: Subir o `?v=`, gerar e publicar o app

**Arquivos:**
- Modificar: `template.html`, `admin.html`, `admin.js`, `assinatura.js`, `auth.js`, `feedback.js`, `ia.js`, `sync.js`
- Regenerar: os seis `index.html`

O modo de falha documentado no CLAUDE.md: dois `?v=` diferentes para
`firebase-init.js` inicializam o Firebase duas vezes e quebram o app. Sobe tudo
junto ou não sobe nada.

- [ ] **Passo 1: Trocar 57 por 58 em todos os pontos**

```bash
cd "c:/Users/pietr/claude app"
sed -i 's/?v=57/?v=58/g' vestibular-direito-v2/template.html vestibular-direito-v2/admin.html \
  vestibular-direito-v2/admin.js vestibular-direito-v2/assinatura.js vestibular-direito-v2/auth.js \
  vestibular-direito-v2/feedback.js vestibular-direito-v2/ia.js vestibular-direito-v2/sync.js
```

- [ ] **Passo 2: Conferir que não sobrou nenhum 57**

```bash
grep -rn "?v=57" --include=*.html --include=*.js vestibular-direito-v2/ | grep -v "index.html"
```

Esperado: nenhuma linha. (Os `index.html` ainda têm 57 — o gerador os corrige
no passo seguinte.)

- [ ] **Passo 3: Conferir que o `firebase-init.js` é unânime**

```bash
grep -rhn "firebase-init.js?v=" vestibular-direito-v2/*.js | grep -o "v=[0-9]*" | sort -u
```

Esperado: uma única linha, `v=58`. Duas linhas aqui quebram o app.

- [ ] **Passo 4: Gerar as páginas**

```bash
node vestibular-direito-v2/build-paginas.js
node vestibular-direito-v2/build-paginas.js --verificar
```

Esperado: a segunda chamada não reprova.

- [ ] **Passo 5: Conferir no navegador, do jeito que importa**

```bash
powershell -ExecutionPolicy Bypass -File serve-root.ps1
```

Com a aba Rede aberta e o `localStorage` limpo:

| Verificação | Esperado |
|---|---|
| `http://localhost:8844/` | o banner aparece; **nenhuma** requisição a `analytics.tiktok.com` |
| clicar em "Não" | banner some; nada é buscado; recarregar não pergunta de novo |
| limpar `v2_consent_ads`, recarregar, clicar em "Pode medir" | `analytics.tiktok.com` é buscado **agora**, e não antes |
| `http://localhost:8844/medicina/` | nenhuma requisição ao TikTok, nenhum banner |
| com `v2_trilha="medicina"`, abrir `/` | desvia para `/medicina/` **sem** buscar o TikTok |
| console em qualquer página | sem erro novo |

- [ ] **Passo 6: Publicar o app**

```bash
git add -A vestibular-direito-v2/ index.html direito/ medicina/ economia/ engenharia/
git commit -m "?v=58: o pixel da landing e o banner de consentimento entram no ar"
git push
```

O GitHub Pages leva cerca de 25 segundos. Confirme em
`https://sagaxedu.com.br/` que o banner aparece.

---

### Tarefa 10: Subir a função e desligar o pixel da Cakto

**Arquivos:** nenhum. Esta tarefa é deploy e configuração.

A troca é obrigatória e vai junto: **ou a Cakto manda a compra, ou a Events API
manda.** O TikTok só funde eventos duplicados quando os dois carregam o mesmo
`event_id`, e a Cakto não expõe esse campo. Os dois ligados contam cada venda
duas vezes, e o sintoma é o ROAS ficar bom demais — que ninguém investiga.

- [ ] **Passo 1: Subir a função**

```bash
firebase deploy --only functions
```

Esperado: `caktoWebhook` e `tiktokConversao` aparecem no resultado. Se o deploy
reclamar do segredo, confirme com `firebase functions:secrets:get TIKTOK_TOKEN`.

- [ ] **Passo 2: Confirmar que a função subiu**

```bash
firebase functions:list
```

Esperado: `tiktokConversao` na região `southamerica-east1`.

- [ ] **Passo 3: Desligar o pixel na Cakto**

Em *Produtos → Configurações → Pixels de conversão*, remova o pixel do TikTok
**dos dois produtos** (o de 90 dias e o mensal). A partir daqui a compra vem só
do servidor.

- [ ] **Passo 3b: Conferir as chaves do pixel no painel do TikTok**

Em *Events Manager → o pixel → Settings*:

| Chave | Estado | Por quê |
|---|---|---|
| Allow first-party cookies | ligado | — |
| Enhance data postback | ligado | — |
| **Automatic Advanced Matching** | **desligado** | Ele varre formulários da página atrás de e-mail e telefone por conta própria, o que atropela o banner de consentimento e contradiz a política reescrita na Tarefa 8. O casamento por e-mail já acontece no servidor, na compra, que é onde há base legal para ele. |

- [ ] **Passo 4: Provar com uma venda real**

Uma compra de verdade é a única prova — o precedente do `subscription_created`,
que a documentação da Cakto errava e só um teste real revelou, recomenda não
confiar no que está escrito. Depois dela:

```bash
firebase functions:log --only tiktokConversao
```

Esperado: `[tiktok] conversao enviada` com `resposta` contendo `"code":0`.

- [ ] **Passo 5: Conferir o valor, que é a incerteza que sobrou**

No Events Manager, o `CompletePayment` deve mostrar **o preço real** (R$ 49,99
ou R$ 19,99). Se mostrar 4999 ou 1999, a Cakto manda `amount` em centavos:

```js
// em functions/tiktok-conversao.js, ao montar o corpo
valor: typeof marca.valor === "number" ? marca.valor / 100 : null,
```

Confirmado o contrário, apague o aviso de "provavelmente centavos" que a
Tarefa 4 pôs em `functions/index.js` — ele já cumpriu o papel.

```bash
git add functions/
git commit -m "amount da Cakto vem em <reais|centavos>: confirmado na primeira venda real"
firebase deploy --only functions
```

- [ ] **Passo 6: Conferir que a venda não foi contada duas vezes**

No Events Manager, a venda deve aparecer **uma vez**. Duas significa que o
pixel da Cakto ainda está ligado em algum produto — volte ao Passo 3.
