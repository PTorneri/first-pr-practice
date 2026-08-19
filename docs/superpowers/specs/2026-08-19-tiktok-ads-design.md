# Rastreamento de anúncios do TikTok — desenho

Data: 2026-08-19
Estado: aprovado, aguardando plano de implementação

## Objetivo

Rodar anúncios da sagax no TikTok Ads e entregar ao algoritmo do TikTok o sinal
de que ele precisa para otimizar a entrega: **a compra**, não o clique.

O pixel é `DA2VL8JC77U74CG8DEO0`. O token da Events API já está no Secret Manager
do projeto `app-fgv-insper`, sob o nome `TIKTOK_TOKEN`, e nunca aparece no
código nem no repositório — o mesmo caminho que o `CAKTO_SEGREDO` já percorre.

## O terreno, como ele está hoje

Três fatos apurados no repositório antes de desenhar, porque cada um deles
derrubou uma versão anterior deste desenho:

1. **Não existe rastreamento nenhum.** Uma varredura por `gtag|ttq|fbq|utm_` em
   todo o app não devolveu nada. Partimos do zero, o que é uma sorte: dá para
   fazer certo de primeira em vez de conviver com o que já estivesse instalado.

2. **O checkout é de outro domínio.** `assinatura.js` manda para
   `pay.cakto.com.br`. Um pixel no nosso site vê a visita e vê o clique, mas
   **nunca vê a compra** — ela acontece num domínio que não é nosso. É essa a
   razão de a Events API server-side não ser um refinamento opcional aqui: sem
   ela não há evento de conversão, ponto.

3. **A landing da raiz já separa o tráfego frio.** O `DESVIO_DA_RAIZ` em
   `build-paginas.js` faz `location.replace(salva + "/")` para quem tem trilha
   no `localStorage`. Quem chega em `/` e permanece é, por construção, gente
   que nunca usou o app. A landing já é a página de tráfego frio, sem que
   ninguém a tenha projetado para isso.

E um quarto, que decide a arquitetura do servidor:

4. **O webhook já grava um documento que serve de gatilho perfeito.** Dentro da
   transação, `functions/index.js` escreve
   `webhooksProcessados/{transacao}:{evento}` — um documento criado **uma única
   vez por evento**, atomicamente junto com a mudança da assinatura. Ele traz
   `evento`, `email`, `transacao` e `em`.

## Decisões

### 1. O pixel vive só na landing da raiz

Módulo novo `vestibular-direito-v2/marketing.js`, injetado apenas em
`index.html` da raiz, pelo mesmo mecanismo condicional que hoje serve o
`DESVIO_DA_RAIZ` (`pagina.trilha ? "" : ...` em `build-paginas.js`). As quatro
páginas de trilha não recebem pixel nenhum.

Por quê:

- O desvio já expulsa da raiz quem é aluno, então rastrear ali é rastrear
  exatamente o público do anúncio. Pôr o pixel nas trilhas contaria como visita
  gente que já paga.
- O produto pago fica sem rastreador, o que deixa a política de privacidade
  curta e verdadeira: *o app não te rastreia; a porta de entrada, com seu
  aceite, sim*.
- Consentimento passa a ser um problema de uma página só, não de cinco.

**A ordem importa:** o pixel entra **depois** do `DESVIO_DA_RAIZ` no bloco
injetado. Antes dele, o `ttq.page()` dispararia para quem só passou de raspão a
caminho da própria trilha, sujando a métrica com aluno velho.

O snippet oficial do TikTok chama `ttq.page()` imediatamente. Ele **não** será
usado como veio: o `page()` sai dessa posição e passa a ser chamado pelo
`marketing.js`, depois do aceite.

### 2. Nada carrega antes do consentimento

Banner na landing. O `marketing.js` não busca `analytics.tiktok.com` até o
clique em *Aceitar*. Recusa não carrega nada e não pergunta de novo.

A decisão fica em `localStorage` como `v2_consent_ads`, **fora** do prefixo de
trilha (`dir_`, `med_`…), ao lado do `v2_trilha`: é uma decisão da pessoa, não
do curso, e teria que valer igual nas quatro trilhas se um dia o pixel saísse
da landing.

O snippet do TikTok expõe `holdConsent`, `grantConsent` e `revokeConsent`. Não
os usamos para o carregamento inicial — não baixar o script é mais honesto e
mais barato do que baixá-lo e pedir que ele se contenha —, mas `revokeConsent()`
é o caminho de **revogação** para quem aceitar e mudar de ideia depois.

**Automatic Advanced Matching fica desligado** no painel do TikTok. Ele varre
formulários da página atrás de e-mail e telefone por conta própria, o que
atropela o banner e contradiz a política. O casamento por e-mail acontece no
servidor, na hora da compra, que é onde há base para ele.

### 3. Dois eventos, e só dois

| Evento | Onde dispara | Quando |
|---|---|---|
| `PageView` | navegador, só na landing | após o aceite no banner |
| `CompletePayment` | servidor, Events API | na primeira cobrança |

Fica **de fora** um evento de "clicou em assinar": ele mora dentro do app,
obrigaria pixel e banner nas quatro trilhas, e não é o sinal que otimiza a
campanha. A compra é.

Fica de fora também a **renovação mensal**: mandá-la atribuiria ao anúncio uma
receita que ele não gerou, e o erro cresceria todo mês, sempre para cima. Como
a primeira cobrança é separada da renovação está logo abaixo — e é o ponto onde
esta spec errou.

**CORRIGIDO EM 19/08/2026, DEPOIS DA PRIMEIRA VENDA REAL.** A versão original
desta seção dizia: `purchase_approved` sem assinatura → envia;
`subscription_created` → envia; `subscription_renewed` → não envia.

Estava errada, e a primeira venda real caiu no buraco: chegou como
`purchase_approved` + `acao "assinatura-cobranca"` e foi descartada em silêncio.
O teste de 11/08 tinha mostrado `subscription_created`, e eu tomei aquilo como
regra.

O defeito não foi o palpite — foi onde ele se apoiou. O topo do `index.js`
avisa, duas vezes, que a taxonomia de eventos da Cakto é mal documentada e já
mentiu antes. Amarrar a conversão a esses nomes era construir sobre a única
parte do sistema declaradamente instável.

**A regra agora pergunta ao nosso banco, não à Cakto:**

- `primeiraCompra !== true` → **não envia** (renovação, recompra, ou marca antiga)
- `primeiraCompra === true` e `acao` é `liberar` ou `assinatura-cobranca` → **envia**
- qualquer `acao` de cancelamento, reembolso ou chargeback → **não envia**

`primeiraCompra` é gravado pelo webhook como `!dados.liberadoEm`, onde `dados` é
o estado do documento da assinatura ANTES da transação — informação que ele já
lia para calcular o prazo. Renovação tem `liberadoEm`; primeira compra não tem.
Nenhum nome de evento participa da decisão, e há teste com um nome inventado
para garantir que continue assim.

### 3b. Fase intermediária: o pixel da Cakto, e a troca obrigatória

A Cakto aceita um pixel de conversão por produto (*Produtos → produto →
Configurações → Pixels de conversão → TikTok*). Ele é ligado **antes** desta
implementação, nos dois produtos (90 dias e mensal), para que a campanha possa
rodar sem esperar engenharia.

**Ou a Cakto manda `CompletePayment`, ou a Events API manda. Nunca as duas.**
O TikTok só funde eventos duplicados quando ambos carregam o mesmo `event_id`,
e a Cakto não expõe esse campo. Os dois ligados contariam cada venda duas vezes
— ROAS dobrado no painel e o algoritmo otimizando contra um número inventado.
Não dá sintoma: os números apenas ficam bons demais.

Portanto, **desligar o pixel da Cakto faz parte do deploy desta função**, no
mesmo movimento. Não é uma limpeza para depois; é um passo do plano, e o plano
de implementação deve tratá-lo como tal.

A porcentagem de PIX/boleto gerado que a Cakto oferece mandar como conversão
estimada fica **desligada**: ela reporta venda que ainda não aconteceu, e a um
preço de R$ 19,99 a distância entre gerar o PIX e pagá-lo é exatamente onde a
campanha se decide.

### 4. A compra sai por uma função separada

Função nova, disparada por `onDocumentCreated("webhooksProcessados/{chave}")`.
Ela lê o documento, decide pelo campo `evento` se aquilo é uma primeira compra
e, se for, chama a Events API do TikTok com o e-mail em SHA-256.

Por que separada do `caktoWebhook`, e não uma chamada a mais dentro dele:

- **O caminho do pagamento não pode depender da API do TikTok.** Chamar o
  TikTok dentro do `onRequest` atrasaria a resposta à Cakto, e a Cakto reenvia
  quando não recebe 200 — reenvio é exatamente o modo de falha que a
  idempotência por `chaveEvento` existe para conter. Um TikTok lento viraria
  cobrança duplicada.
- **A idempotência vem de graça.** `webhooksProcessados/{chave}` é criado uma
  única vez, dentro da transação, e nunca reescrito. `onDocumentCreated`
  dispara uma vez. Não é preciso marcar `ttEnviadoEm` no documento nem
  proteger o gatilho contra a própria escrita — o problema de realimentação
  que um gatilho em `assinaturas/{email}` teria simplesmente não existe aqui.
- **Falha do TikTok não é falha do pagamento.** A função pode errar, tentar de
  novo e ser corrigida sem que ninguém deixe de receber acesso pelo que pagou.

**Uma mudança pequena no `caktoWebhook`:** o documento de marca passa a gravar
também `valor` (de `d.amount`) e `moeda`. Sem o valor não há otimização por
receita, e derivar o preço do campo `plano` seria adivinhar. A mudança é uma
linha dentro do `tx.set(marcaRef, ...)` que já existe.

## O que fica de fora, e por quê

- **`ttclid`.** Carregar o identificador de clique do TikTok da landing até a
  compra melhoraria a qualidade do casamento (EMQ). Exigiria persistir o
  `ttclid` no `localStorage`, atravessar a escolha de trilha, sobreviver ao
  login e chegar ao documento de assinatura pelo `auth.js` — acoplamento real
  em três arquivos, por um ganho de margem. O e-mail com hash já casa a compra.
  Fica registrado como o próximo passo se a qualidade do casamento decepcionar.
- **Público de retargeting a partir do app.** Consequência aceita da decisão 1.
- **Landing dedicada ao anúncio.** Escopo maior, decidido contra: o anúncio
  aponta para `/`.
- **Evento sem `data.id`.** Quando a Cakto manda um evento sem id, o webhook
  processa mas **não grava a marca** (o comentário no arquivo explica por quê:
  a alternativa envenenava a deduplicação para sempre). Nesse caso não há
  gatilho e a conversão não chega ao TikTok. É raro, já está logado como aviso,
  e a escolha de não consertar aqui é deliberada — mexer na deduplicação do
  pagamento para melhorar uma métrica de anúncio é trocar risco caro por ganho
  barato.

## Privacidade

`privacidade.html` afirma hoje, na linha 70, que *"não usamos ferramentas de
análise de audiência nem de publicidade"*, e repete na seção 11 quanto a
cookies. Instalar o pixel torna as duas afirmações falsas.

As duas passagens são reescritas para delimitar o que passou a ser verdade:

- o pixel existe **só na página de entrada**, e o app não tem rastreador;
- ele **só carrega com aceite explícito**;
- o que vai para o TikTok: a visita à landing e, na compra, o **e-mail com hash
  SHA-256** — nunca o e-mail em texto;
- como revogar.

## Publicação

Dois alvos que não sobem juntos, como sempre neste repositório:

| o que mudou | como publica |
|---|---|
| `marketing.js`, `template.html` | `?v=` incrementado em **todos** os pontos de uma vez, `node vestibular-direito-v2/build-paginas.js`, `git push` na `main` |
| `privacidade.html` | edição direta e `git push` — ela **não** sai do `build-paginas.js`, que só gera os `index.html` |
| a função nova e o `functions/index.js` | `firebase deploy --only functions` |

O `?v=` é o modo de falha documentado no CLAUDE.md: dois valores diferentes para
`firebase-init.js` inicializam o Firebase duas vezes e quebram o app. Incrementa
tudo junto, roda o gerador, e só então publica — quem serve o `?v=` novo são as
páginas geradas, não o template.

## Verificação

Não há test runner neste repositório. A verificação é:

1. `node vestibular-direito-v2/build-paginas.js --verificar` — reprova se as
   páginas estiverem defasadas do template.
2. `powershell -ExecutionPolicy Bypass -File serve-root.ps1` e abrir
   `http://localhost:8844/` — conferir na aba de rede que **nada** de
   `analytics.tiktok.com` é buscado antes do clique em *Aceitar*, e que é
   buscado depois.
3. Conferir que `http://localhost:8844/medicina/` não pede nada do TikTok.
4. Conferir que quem já tem trilha salva é desviado **sem** disparar `PageView`.
5. TikTok Pixel Helper e a aba *Test Events* do Events Manager, para ver o
   `PageView` chegando de verdade.
6. `CompletePayment`: o Events Manager mostra o evento server-side. Um teste
   real de ponta a ponta depende de uma compra real — o precedente do
   `subscription_created`, que a documentação da Cakto errou e só um teste real
   revelou, recomenda não confiar no que está escrito.

## Riscos

- **A Events API do TikTok muda de contrato.** É integração com terceiro; a
  função deve falhar em silêncio e logar, nunca derrubar nada.
- **O evento de compra pode não casar.** Se o e-mail do checkout diferir do da
  conta TikTok da pessoa, a conversão não é atribuída. É o limite conhecido de
  casar só por e-mail, e o `ttclid` é a resposta se isso doer.
- **Bloqueadores de anúncio** derrubam o `PageView`, nunca o
  `CompletePayment` — que é justamente o que otimiza. É uma vantagem do desenho
  server-side, não um risco.
