# Rubrica de redação com nota — plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A correção de redação por IA passa a devolver, além do checklist de conteúdo que já existe, uma rubrica de quatro eixos com nota de 0 a 10 — em que o modelo escolhe a banda e o código faz a conta.

**Architecture:** Um arquivo novo sem dependência nenhuma (`rubrica.js`, script clássico em `window.VD_RUBRICA`) concentra a tabela de bandas, os descritores, as travas, os descontos e o bloco de prompt. `ia.js` monta o schema a partir dele — de modo que a lista de bandas não pode divergir entre a conta e o prompt — e `app.js` desenha. A nota nunca vem do modelo: ele só escolhe banda e cita o trecho.

**Tech Stack:** JavaScript de navegador sem framework, sem build. Firebase AI Logic (`gemini-3.6-flash`) com `responseSchema`. Verificação por script `node` avulso usando `vm`, o mesmo caminho de `auditar-busca.js`.

**Spec:** [docs/superpowers/specs/2026-08-21-rubrica-redacao-design.md](../specs/2026-08-21-rubrica-redacao-design.md)

## Global Constraints

- **Português do Brasil** em tudo: código, comentários, commits, nomes de arquivo, texto de tela.
- **Commits vão direto na `main`.** Não há fluxo de branch + merge neste repositório.
- **`app.js` NÃO é módulo.** É carregado como `<script src="app.js?v=N">`. Não pode usar `import`. `rubrica.js` tem que ser script clássico que atribui a `window.VD_RUBRICA`.
- **`ia.js` É módulo**, importado por `auth.js`. Lê `window.VD_RUBRICA` (disponível, porque scripts clássicos executam antes de módulos).
- **Não editar nenhum `index.html`.** Os seis são gerados por `build-paginas.js` a partir de `template.html`.
- **`?v=` sobe em todos os lugares de uma vez.** Hoje é `59` em `template.html`, `admin.html`, `build-paginas.js:175` e nos `import` de `admin.js`, `assinatura.js`, `auth.js` (4 linhas), `feedback.js`, `ia.js`, `sync.js`. Dois `?v=` diferentes para `firebase-init.js` inicializam o Firebase duas vezes e quebram o app.
- **`DATA_VERSION` (`?d=`) NÃO muda** — não há alteração em `banco-central/`.
- **Nada de dependência nova.** Não há `package.json` no repositório e não se cria um.
- **Escala de pontos:** todos os valores são múltiplos de 0,5. Arredondar somas com `Math.round(n * 10) / 10` para não expor `2.9999999999999996`.
- **Modelo nunca emite número.** Só banda. Qualquer código que aceite um número vindo do modelo é erro de implementação.

---

### Task 1: `rubrica.js` — a tabela, as travas e a conta

O coração do trabalho e a única parte verificável sem gastar token. Sai inteira antes de qualquer outra coisa, com o verificador escrito primeiro.

**Files:**
- Create: `vestibular-direito-v2/rubrica.js`
- Create: `vestibular-direito-v2/verificar-rubrica.js`

**Interfaces:**
- Consumes: nada. O arquivo não importa, não lê DOM e não lê `localStorage`.
- Produces: `window.VD_RUBRICA` com
  - `EIXOS: Array<{ chave, rotulo, maximo, bandas: Array<{ chave, rotulo, pontos, descritor, marcadores: Array<{ chave, texto }> }> }>` — na ordem `adequacao`, `argumentacao`, `estrutura`, `linguagem`; as bandas de cada eixo em ordem crescente de pontos.
  - `DESCONTOS: { PALAVRAS_MIN: 160, PALAVRAS_MAX: 290, VALOR: 0.5 }`
  - `eixo(chave) -> objeto do eixo | null`
  - `banda(eixoChave, bandaChave) -> objeto da banda | null`
  - `calcular({ rubrica, palavras, temTitulo }) -> Resultado` (formato abaixo, na Step 1)
  - `blocoDoPrompt() -> string` — o texto que `ia.js` interpola na instrução do sistema.

- [ ] **Step 1: Escrever o verificador que falha**

Criar `vestibular-direito-v2/verificar-rubrica.js`:

```js
#!/usr/bin/env node
//
// Verificador da rubrica de redação.
//
// A conta da nota é a única parte da correção por IA que dá pra verificar sem
// gastar token, e é justamente a que não pode errar: nota que oscila entre
// execuções ensina o aluno a pedir correção de novo até gostar do número.
//
// Carrega rubrica.js num contexto `vm` com um `window` falso — o mesmo caminho
// que auditar-busca.js usa para auditar o motor de busca publicado. O que se
// verifica aqui é literalmente o arquivo que o navegador carrega, e não uma
// cópia que um dia diverge.
//
// Uso: node vestibular-direito-v2/verificar-rubrica.js
// Sai com código 1 na primeira falha acumulada.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const contexto = { window: {} };
vm.createContext(contexto);
vm.runInContext(
  fs.readFileSync(path.join(__dirname, "rubrica.js"), "utf8"),
  contexto,
  { filename: "rubrica.js" }
);
const R = contexto.window.VD_RUBRICA;

let falhas = 0;
let total = 0;

function conferir(nome, real, esperado) {
  total++;
  const a = JSON.stringify(real);
  const b = JSON.stringify(esperado);
  if (a === b) return;
  falhas++;
  console.error("FALHOU  " + nome + "\n  esperado: " + b + "\n  veio:     " + a);
}

// Atalho: uma rubrica completa, com as bandas dadas.
function r(adequacao, argumentacao, estrutura, linguagem) {
  return {
    adequacao: { banda: adequacao },
    argumentacao: { banda: argumentacao },
    estrutura: { banda: estrutura },
    linguagem: { banda: linguagem },
  };
}

const CHEIA = { rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true };

// ---------- A tabela ----------

conferir(
  "os quatro eixos, nesta ordem",
  R.EIXOS.map((e) => e.chave),
  ["adequacao", "argumentacao", "estrutura", "linguagem"]
);
conferir("os máximos somam 10", R.EIXOS.reduce((s, e) => s + e.maximo, 0), 10);
conferir(
  "cada eixo tem uma banda que vale o próprio máximo",
  R.EIXOS.every((e) => e.bandas.some((b) => b.pontos === e.maximo)),
  true
);
conferir(
  "as bandas de cada eixo sobem em pontos",
  R.EIXOS.every((e) => e.bandas.every((b, i) => i === 0 || b.pontos >= e.bandas[i - 1].pontos)),
  true
);
conferir("argumentação não tem banda abaixo de 1,0", R.EIXOS[1].bandas[0].pontos, 1);
conferir("a banda mais alta de cada eixo não tem marcador",
  R.EIXOS.every((e) => e.bandas[e.bandas.length - 1].marcadores.length === 0), true);
conferir("toda banda tem descritor", R.EIXOS.every((e) => e.bandas.every((b) => b.descritor.length > 20)), true);
conferir(
  "não há chave de marcador repetida dentro do mesmo eixo",
  R.EIXOS.every((e) => {
    const todas = e.bandas.reduce((acc, b) => acc.concat(b.marcadores.map((m) => m.chave)), []);
    return new Set(todas).size === todas.length;
  }),
  true
);

// ---------- A conta ----------

conferir("nota cheia", R.calcular(CHEIA).nota, 10);
conferir("nota cheia é competitiva", R.calcular(CHEIA).faixa, "competitiva");
conferir("nota cheia não tem eixo mais caro", R.calcular(CHEIA).eixoMaisCaro, null);

conferir(
  "soma simples: 1,0 + 2,5 + 2,0 + 2,0",
  R.calcular({ rubrica: r("adequado", "bem_encaminhado", "bem_encaminhada", "bem_encaminhada"), palavras: 220, temTitulo: true }).nota,
  7.5
);

// Trava 1: adequação parcial limita argumentação a 1,5.
conferir(
  "adequação 0,5 limita argumentação a 1,5",
  R.calcular({ rubrica: r("parcial", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true }).nota,
  0.5 + 1.5 + 2.5 + 2.5
);
conferir(
  "a limitação aparece marcada no eixo",
  R.calcular({ rubrica: r("parcial", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true })
    .porEixo.find((e) => e.chave === "argumentacao").limitado,
  true
);
conferir(
  "argumentação já abaixo de 1,5 não sobe por causa da trava",
  R.calcular({ rubrica: r("parcial", "insatisfatorio", "excelente", "excelente"), palavras: 220, temTitulo: true }).nota,
  0.5 + 1.0 + 2.5 + 2.5
);

// Trava 2: adequação zero zera a argumentação, mas não os outros dois.
conferir(
  "fuga ao tema zera argumentação e mantém estrutura e linguagem",
  R.calcular({ rubrica: r("inadequado", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true }).nota,
  5
);
conferir(
  "fuga ao tema é refazer, mesmo com 5,0",
  R.calcular({ rubrica: r("inadequado", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true }).faixa,
  "refazer"
);

// Trava 3: anulado zera tudo.
const anulada = R.calcular({ rubrica: r("anulado", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true });
conferir("anulado zera a nota", anulada.nota, 0);
conferir("anulado marca anulada", anulada.anulada, true);
conferir("anulado é refazer", anulada.faixa, "refazer");
conferir("anulado não avalia os demais eixos", anulada.porEixo.length, 1);

// ---------- Descontos ----------

conferir(
  "texto curto perde 0,5",
  R.calcular({ rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 159, temTitulo: true }).nota,
  9.5
);
conferir(
  "texto longo perde 0,5",
  R.calcular({ rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 291, temTitulo: true }).nota,
  9.5
);
conferir(
  "os limites da faixa não descontam",
  [
    R.calcular({ rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 160, temTitulo: true }).nota,
    R.calcular({ rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 290, temTitulo: true }).nota,
  ],
  [10, 10]
);
conferir(
  "sem título perde 0,5",
  R.calcular({ rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: false }).nota,
  9.5
);
conferir(
  "os dois descontos somam",
  R.calcular({ rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 100, temTitulo: false }).nota,
  9
);
conferir(
  "os descontos aplicados vêm nomeados",
  R.calcular({ rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 100, temTitulo: false })
    .descontos.map((d) => d.chave),
  ["extensao", "titulo"]
);
conferir(
  "descontos não levam a nota abaixo de zero",
  R.calcular({ rubrica: r("inadequado", "insatisfatorio", "inadequada", "inadequada"), palavras: 100, temTitulo: false }).nota,
  0
);

// ---------- Faixa ----------

conferir(
  "7,0 é competitiva",
  R.calcular({ rubrica: r("adequado", "consistente", "bem_encaminhada", "bem_encaminhada"), palavras: 220, temTitulo: true }).faixa,
  "competitiva"
);
conferir(
  "4,0 é precisa_ajuste",
  R.calcular({ rubrica: r("adequado", "insatisfatorio", "fragil", "fragil"), palavras: 220, temTitulo: true }).faixa,
  "precisa_ajuste"
);
conferir(
  "3,5 é refazer",
  R.calcular({ rubrica: r("adequado", "insatisfatorio", "inadequada", "fragil"), palavras: 220, temTitulo: true }).faixa,
  "refazer"
);

// ---------- Eixo mais caro ----------

conferir(
  "o eixo mais caro é o de maior perda absoluta",
  R.calcular({ rubrica: r("adequado", "pouco_convincente", "bem_encaminhada", "excelente"), palavras: 220, temTitulo: true }).eixoMaisCaro,
  "argumentacao"
);
conferir(
  "perda igual desempata pelo eixo de maior peso",
  R.calcular({ rubrica: r("parcial", "excelente", "bem_encaminhada", "excelente"), palavras: 220, temTitulo: true }).eixoMaisCaro,
  "argumentacao"
);

// ---------- Entrada inválida ----------

const semEixo = R.calcular({ rubrica: { adequacao: { banda: "adequado" } }, palavras: 220, temTitulo: true });
conferir("eixo ausente não produz nota", semEixo.ok, false);
conferir("eixo ausente devolve nota nula", semEixo.nota, null);
conferir("eixo ausente diz qual faltou", semEixo.motivo.indexOf("argumentacao") >= 0, true);

const bandaInvalida = R.calcular({ rubrica: r("adequado", "otimo", "excelente", "excelente"), palavras: 220, temTitulo: true });
conferir("banda fora do enum não produz nota", bandaInvalida.ok, false);
conferir("banda fora do enum devolve nota nula", bandaInvalida.nota, null);

// ---------- Bloco do prompt ----------

const bloco = R.blocoDoPrompt();
conferir(
  "o bloco do prompt cita todas as bandas",
  R.EIXOS.every((e) => e.bandas.every((b) => bloco.indexOf(b.chave) >= 0)),
  true
);
conferir(
  "o bloco do prompt cita todos os marcadores",
  R.EIXOS.every((e) => e.bandas.every((b) => b.marcadores.every((m) => bloco.indexOf(m.chave) >= 0))),
  true
);
conferir("o bloco do prompt não contém número de pontos", /\d,\d/.test(bloco), false);

// ---------- Fim ----------

if (falhas) {
  console.error("\nREPROVADO — " + falhas + " de " + total + " conferências falharam.");
  process.exit(1);
}
console.log("APROVADO — " + total + " conferências.");
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `node vestibular-direito-v2/verificar-rubrica.js`
Expected: FAIL — `ENOENT: no such file or directory, open '...rubrica.js'`

- [ ] **Step 3: Escrever `rubrica.js`**

Criar `vestibular-direito-v2/rubrica.js`:

```js
// A rubrica de redação: bandas, descritores, travas, descontos e a conta.
//
// A CHAVE DESTE ARQUIVO, EM UMA LINHA: banda é julgamento, nota é conta.
//
// O modelo escolhe a banda de cada eixo e cita o trecho que a sustenta. Ele
// nunca emite um número. A tabela banda->ponto, as travas de dependência e os
// descontos vivem aqui, em JavaScript puro, porque escala de seis bandas em
// modelo de linguagem oscila entre execuções — e nota que oscila ensina o aluno
// a pedir correção de novo até gostar do número. Aí a ferramenta virou
// caça-níquel, não corretor.
//
// Sem import, sem DOM, sem localStorage: é o que permite `verificar-rubrica.js`
// carregar este arquivo num contexto `vm` e conferir a aritmética inteira sem
// abrir navegador nem gastar token.
//
// Script CLÁSSICO, e não módulo, porque app.js é carregado como script comum e
// não pode importar. ia.js, que é módulo, lê o mesmo global — e monta os enums
// do schema a partir dele, de modo que a lista de bandas não pode divergir
// entre a conta e o prompt.
//
// A rubrica é adaptada de uma grade de redação escolar. Duas caixas do papel
// ficaram de fora de propósito: "plágio" (não verificável sem corpus) e "uso de
// inteligência artificial" (detector de IA é chute, e um falso positivo zeraria
// a redação de quem escreveu de verdade).
(function () {
  "use strict";

  function m(chave, texto) {
    return { chave: chave, texto: texto };
  }

  var EIXOS = [
    {
      chave: "adequacao",
      rotulo: "Adequação à proposta",
      maximo: 1,
      bandas: [
        {
          chave: "anulado",
          rotulo: "Anulado",
          pontos: 0,
          descritor:
            "o texto não é uma tentativa honesta de responder à proposta: foi montado " +
            "com modelo pronto de internet, ou trata a atividade com displicência deliberada. " +
            "Escolher esta banda ZERA a redação inteira, então ela exige evidência forte.",
          marcadores: [
            m("modelo_pronto", "texto montado com modelo pronto de internet"),
            m("displicencia_deliberada", "displicência deliberada em relação à proposta"),
          ],
        },
        {
          chave: "inadequado",
          rotulo: "Inadequado",
          pontos: 0,
          descritor:
            "fuga total ao tema, ou fuga ao tipo de texto dissertativo-argumentativo.",
          marcadores: [
            m("fuga_ao_tema", "fuga total ao tema"),
            m("fuga_ao_tipo_textual", "fuga ao tipo dissertativo-argumentativo"),
          ],
        },
        {
          chave: "parcial",
          rotulo: "Parcialmente adequado",
          pontos: 0.5,
          descritor:
            "o texto é do tipo pedido e fala do tema, mas a abordagem é restrita ou " +
            "abrangente demais, ou um comando específico da proposta ficou sem cumprir.",
          marcadores: [
            m("abordagem_restrita", "abordagem muito restrita do tema"),
            m("abordagem_abrangente", "abordagem muito abrangente do tema"),
            m("comando_nao_cumprido", "descumpriu um comando específico da proposta"),
          ],
        },
        {
          chave: "adequado",
          rotulo: "Adequado",
          pontos: 1,
          descritor:
            "cumpre os comandos específicos e consiste numa dissertação argumentativa em " +
            "que se apresenta posicionamento sobre o tema, defendido por meio de argumentos.",
          marcadores: [],
        },
      ],
    },
    {
      chave: "argumentacao",
      rotulo: "Argumentação",
      maximo: 4,
      bandas: [
        {
          chave: "insatisfatorio",
          rotulo: "Insatisfatório",
          pontos: 1,
          descritor:
            "informação que nunca virou argumento, incoerência que compromete o texto " +
            "inteiro, ou argumentos completamente impertinentes ao tema.",
          marcadores: [
            m("informacao_nao_virou_argumento", "informação que não foi transformada em argumento"),
            m("incoerencia_global", "incoerência que compromete o texto inteiro"),
            m("argumentos_impertinentes", "argumentos completamente impertinentes ao tema"),
          ],
        },
        {
          chave: "fragil",
          rotulo: "Frágil",
          pontos: 1.5,
          descritor:
            "argumentos pouco claros ou pouco pertinentes, argumentação limitada a copiar " +
            "ou parafrasear a coletânea, incoerência que compromete uma parte do texto, " +
            "argumentos soltos em relação à tese, ou texto majoritariamente informativo.",
          marcadores: [
            m("argumentos_pouco_claros", "argumentos pouco claros ou pouco pertinentes"),
            m("parafrase_da_coletanea", "argumentação limitada à cópia ou paráfrase da coletânea"),
            m("incoerencia_parcial", "incoerência que compromete uma parte do texto"),
            m("argumentos_desconectados_da_tese", "argumentos pouco relacionados entre si e à tese"),
            m("texto_informativo", "texto majoritariamente informativo"),
          ],
        },
        {
          chave: "pouco_convincente",
          rotulo: "Pouco convincente",
          pontos: 2,
          descritor:
            "existe projeto de texto, mas os argumentos são rasos, imprecisos, " +
            "generalizantes, presos ao senso comum, ou desenvolvidos de forma pouco " +
            "produtiva à tese defendida.",
          marcadores: [
            m("pouco_aprofundado", "argumentos pertinentes, mas pouco aprofundados"),
            m("incoerencia_pontual", "incoerência pontual"),
            m("argumentos_generalizantes", "argumentos imprecisos ou generalizantes"),
            m("senso_comum", "argumentos embasados apenas em senso comum"),
            m("argumento_improdutivo", "argumento desenvolvido de forma pouco produtiva à tese"),
          ],
        },
        {
          chave: "bem_encaminhado",
          rotulo: "Bem encaminhado",
          pontos: 2.5,
          descritor:
            "a dissertação se sustenta e há ao menos um argumento bem desenvolvido, mas " +
            "a coletânea rende pouco ou o repertório não está articulado ao argumento.",
          marcadores: [
            m("selecao_pouco_pertinente", "seleção pouco pertinente de argumento"),
            m("uso_pouco_proveitoso_da_coletanea", "uso pouco proveitoso da coletânea"),
            m("repertorio_nao_articulado", "repertório não articulado ao argumento"),
          ],
        },
        {
          chave: "consistente",
          rotulo: "Consistente",
          pontos: 3,
          descritor:
            "argumentação consistente, com projeto de texto e uso proveitoso da coletânea; " +
            "o que falta é profundidade em algum ponto ou mais criticidade na análise.",
          marcadores: [
            m("lacuna_na_analise", "lacuna na análise de pelo menos um argumento"),
            m("repertorio_subaproveitado", "repertório pertinente, mas pouco aproveitado"),
            m("pouca_criticidade", "pouca criticidade nas análises"),
          ],
        },
        {
          chave: "excelente",
          rotulo: "Excelente",
          pontos: 4,
          descritor:
            "projeto de texto estratégico, análise profunda, crítica e reflexiva, com uso " +
            "proveitoso tanto da coletânea quanto do repertório do próprio candidato.",
          marcadores: [],
        },
      ],
    },
    {
      chave: "estrutura",
      rotulo: "Estrutura e coesão",
      maximo: 2.5,
      bandas: [
        {
          chave: "inadequada",
          rotulo: "Inadequada",
          pontos: 0.5,
          descritor:
            "ausência constante de coesão, recursos coesivos constantemente mal empregados, " +
            "ideias desorganizadas a ponto de comprometer o sentido, ou falta de uma parte " +
            "constitutiva do texto.",
          marcadores: [
            m("ausencia_constante_de_coesao", "ausência constante de coesão entre períodos e parágrafos"),
            m("recursos_coesivos_inadequados", "emprego constantemente inadequado de recursos coesivos"),
            m("ideias_desorganizadas", "ideias mal organizadas, comprometendo o sentido"),
            m("falta_parte_constitutiva", "falta uma parte constitutiva do texto (a conclusão, por exemplo)"),
          ],
        },
        {
          chave: "fragil",
          rotulo: "Frágil",
          pontos: 1,
          descritor:
            "falhas graves de coesão entre as partes, ideias mal organizadas em parte do " +
            "texto, paragrafação com quebras indevidas, ou argumento apresentado onde não " +
            "deveria (introdução, conclusão).",
          marcadores: [
            m("falhas_graves_de_coesao", "falhas graves de coesão entre as partes do texto"),
            m("ideias_mal_organizadas", "ideias mal organizadas em parte do texto"),
            m("quebras_indevidas_de_paragrafo", "quebras indevidas de parágrafo"),
            m("argumento_na_introducao_ou_conclusao", "argumento apresentado na introdução ou na conclusão"),
            m("excesso_de_repeticoes", "excesso de repetições desnecessárias"),
          ],
        },
        {
          chave: "em_desenvolvimento",
          rotulo: "Em desenvolvimento",
          pontos: 1.5,
          descritor:
            "as partes estão organizadas, mas o uso de alguns recursos coesivos compromete " +
            "o sentido de pontos específicos, há ausência frequente de coesão entre períodos, " +
            "ou parágrafo sem unidade interna.",
          marcadores: [
            m("coesivo_compromete_sentido_pontual", "recurso coesivo que compromete o sentido de um ponto específico"),
            m("ausencia_frequente_entre_periodos", "ausência frequente de coesão entre períodos"),
            m("ausencia_entre_paragrafos", "alguma ausência de coesão entre parágrafos"),
            m("paragrafo_sem_unidade_interna", "parágrafo sem unidade interna"),
            m("repeticoes_constantes", "repetições desnecessárias constantes"),
          ],
        },
        {
          chave: "bem_encaminhada",
          rotulo: "Bem encaminhada",
          pontos: 2,
          descritor:
            "estrutura organizada e articulada; o que resta são falhas que não comprometem " +
            "o sentido — coesivo repetitivo ou impreciso, repetição pontual, alguma quebra " +
            "de unidade por planejamento.",
          marcadores: [
            m("ausencia_eventual_entre_periodos", "ausência eventual de coesão entre períodos"),
            m("coesivos_repetitivos", "uso repetitivo de recursos coesivos"),
            m("coesivos_imprecisos", "uso impreciso de recursos coesivos"),
            m("repeticoes_pontuais", "repetições pontuais desnecessárias"),
            m("falha_de_unidade_por_planejamento", "falha de unidade interna, por planejamento"),
          ],
        },
        {
          chave: "excelente",
          rotulo: "Excelente",
          pontos: 2.5,
          descritor:
            "partes bem organizadas e articuladas, progressão textual produtiva e unidade " +
            "clara — resultado de planejamento prévio.",
          marcadores: [],
        },
      ],
    },
    {
      chave: "linguagem",
      rotulo: "Linguagem",
      maximo: 2.5,
      bandas: [
        {
          chave: "inadequada",
          rotulo: "Inadequada",
          pontos: 0.5,
          descritor:
            "desvios sintáticos graves e constantes, períodos muito longos ou mal divididos, " +
            "termos constantemente inadequados, 1ª pessoa do singular ou referência direta ao " +
            "leitor, ou cópia constante da coletânea sem técnica de citação.",
          marcadores: [
            m("desvios_sintaticos_graves", "desvios graves e constantes na construção sintática"),
            m("periodos_muito_longos", "períodos muito longos ou mal divididos"),
            m("termos_inadequados_constantes", "emprego constante de termos inadequados, imprecisos ou coloquiais"),
            m("primeira_pessoa_singular_ou_leitor", "1ª pessoa do singular ou referência direta ao leitor"),
            m("copia_da_coletanea_sem_citacao", "cópia constante da coletânea, sem técnica de citação"),
          ],
        },
        {
          chave: "fragil",
          rotulo: "Frágil",
          pontos: 1,
          descritor:
            "desvios sintáticos frequentes, quebras inadequadas de período, termos " +
            "inadequados com frequência, ou alguma cópia da coletânea sem citação.",
          marcadores: [
            m("desvios_sintaticos_frequentes", "desvios frequentes na construção sintática"),
            m("quebras_de_periodo_inadequadas", "quebras inadequadas de período"),
            m("periodos_longos", "períodos longos com frequência"),
            m("termos_inadequados_frequentes", "termos inadequados, imprecisos ou coloquiais com frequência"),
            m("alguma_copia_sem_citacao", "alguma cópia da coletânea sem técnica de citação"),
            m("texto_curto_demais_para_analise", "texto curto demais para análise da linguagem"),
          ],
        },
        {
          chave: "em_desenvolvimento",
          rotulo: "Em desenvolvimento",
          pontos: 1.5,
          descritor:
            "a clareza está comprometida em parte do texto: alguns desvios sintáticos, " +
            "quebra pontual de período, períodos longos e confusos, marcas de oralidade.",
          marcadores: [
            m("alguns_desvios_sintaticos", "alguns desvios na construção sintática"),
            m("quebra_pontual_de_periodo", "quebra indevida pontual de período"),
            m("periodos_longos_e_confusos", "alguns períodos longos e confusos"),
            m("marcas_de_oralidade", "termos coloquiais ou marcas de oralidade"),
          ],
        },
        {
          chave: "bem_encaminhada",
          rotulo: "Bem encaminhada",
          pontos: 2,
          descritor:
            "construções sintáticas elaboradas e vocabulário criterioso, com resíduos: termo " +
            "impreciso pontual, período longo que carece de clareza, excesso de 1ª pessoa do " +
            "plural.",
          marcadores: [
            m("termos_imprecisos_pontuais", "termos inadequados ou imprecisos pontuais"),
            m("organizacao_sintatica_eventual", "problema eventual de organização dos elementos sintáticos"),
            m("periodos_longos_pouco_claros", "períodos longos que carecem de clareza"),
            m("excesso_de_primeira_pessoa_plural", "uso excessivo da 1ª pessoa do plural"),
          ],
        },
        {
          chave: "excelente",
          rotulo: "Excelente",
          pontos: 2.5,
          descritor:
            "seleção vocabular precisa e construções sintáticas claras e bem elaboradas, " +
            "capazes de garantir eloquência ao texto.",
          marcadores: [],
        },
      ],
    },
  ];

  // A faixa pedida (20 a 30 linhas manuscritas) equivale a mais ou menos 180 a
  // 270 palavras, e é isso que o contador da tela mostra. A folga de ~10% aqui
  // existe porque a conversão palavra->linha é aproximada: descontar de quem
  // escreveu 179 seria punir o erro de conversão, não o do aluno.
  var DESCONTOS = { PALAVRAS_MIN: 160, PALAVRAS_MAX: 290, VALOR: 0.5 };

  // Gramática NÃO entra aqui. Ela é o eixo Linguagem, e descontar de novo
  // puniria duas vezes — a rubrica de papel duplica porque a correção é manual,
  // e ali não há eixo que se aplique sozinho.

  function eixo(chave) {
    for (var i = 0; i < EIXOS.length; i++) if (EIXOS[i].chave === chave) return EIXOS[i];
    return null;
  }

  function banda(eixoChave, bandaChave) {
    var e = eixo(eixoChave);
    if (!e) return null;
    for (var i = 0; i < e.bandas.length; i++) if (e.bandas[i].chave === bandaChave) return e.bandas[i];
    return null;
  }

  function arredondar(n) {
    return Math.round(n * 10) / 10;
  }

  // Recusar é melhor do que inventar: um eixo que veio faltando ou com banda
  // fora do enum NÃO vira banda baixa. A correção sai sem nota, mostra os
  // comentários que vieram e pede pra tentar de novo. Fabricar uma banda baixa
  // pra fechar a conta seria exatamente a nota inventada que este arquivo
  // existe pra impedir — e contaminaria o "anterior", fazendo o delta da
  // próxima tentativa mentir.
  function recusar(motivo) {
    return {
      ok: false,
      motivo: motivo,
      nota: null,
      anulada: false,
      porEixo: [],
      descontos: [],
      faixa: null,
      eixoMaisCaro: null,
    };
  }

  function calcular(entrada) {
    var dados = (entrada && entrada.rubrica) || {};
    var escolhidas = [];

    for (var i = 0; i < EIXOS.length; i++) {
      var e = EIXOS[i];
      var recebido = dados[e.chave];
      var chaveBanda = recebido && recebido.banda;
      if (!chaveBanda) return recusar("o corretor não avaliou o eixo " + e.chave);
      var b = banda(e.chave, chaveBanda);
      if (!b) return recusar("banda desconhecida em " + e.chave + ": " + chaveBanda);
      escolhidas.push({ eixo: e, banda: b });
    }

    var adequacao = escolhidas[0];

    // Anulação: os demais eixos não são avaliados, e a nota é zero. É a única
    // banda com esse poder, e por isso o descritor dela pede evidência forte.
    if (adequacao.banda.chave === "anulado") {
      return {
        ok: true,
        motivo: "",
        nota: 0,
        anulada: true,
        porEixo: [
          {
            chave: adequacao.eixo.chave,
            rotulo: adequacao.eixo.rotulo,
            maximo: adequacao.eixo.maximo,
            banda: adequacao.banda.chave,
            rotuloBanda: adequacao.banda.rotulo,
            pontos: 0,
            limitado: false,
          },
        ],
        descontos: [],
        faixa: "refazer",
        eixoMaisCaro: null,
      };
    }

    var porEixo = escolhidas.map(function (x) {
      return {
        chave: x.eixo.chave,
        rotulo: x.eixo.rotulo,
        maximo: x.eixo.maximo,
        banda: x.banda.chave,
        rotuloBanda: x.banda.rotulo,
        pontos: x.banda.pontos,
        limitado: false,
      };
    });

    // As travas de dependência. São elas que fazem "adequação à proposta" valer
    // muito mais do que o 1,0 que a tabela mostra: errar o comando custa até
    // 3,5, porque leva a argumentação junto.
    var pAdequacao = porEixo[0].pontos;
    if (pAdequacao === 0) {
      if (porEixo[1].pontos > 0) porEixo[1].limitado = true;
      porEixo[1].pontos = 0;
    } else if (pAdequacao === 0.5 && porEixo[1].pontos > 1.5) {
      porEixo[1].pontos = 1.5;
      porEixo[1].limitado = true;
    }

    var descontos = [];
    var palavras = Number(entrada && entrada.palavras) || 0;
    if (palavras < DESCONTOS.PALAVRAS_MIN || palavras > DESCONTOS.PALAVRAS_MAX) {
      descontos.push({
        chave: "extensao",
        rotulo:
          palavras < DESCONTOS.PALAVRAS_MIN
            ? "abaixo do mínimo de linhas"
            : "acima do máximo de linhas",
        valor: DESCONTOS.VALOR,
      });
    }
    if (!(entrada && entrada.temTitulo)) {
      descontos.push({ chave: "titulo", rotulo: "sem título", valor: DESCONTOS.VALOR });
    }

    var bruta = porEixo.reduce(function (s, x) {
      return s + x.pontos;
    }, 0);
    var abatido = descontos.reduce(function (s, d) {
      return s + d.valor;
    }, 0);
    var nota = arredondar(Math.max(0, bruta - abatido));

    // Fuga ao tema é refazer, não ajustar — mesmo quando estrutura e linguagem
    // seguram a soma em 5,0. Sem esta linha o rótulo contradiria a regra que a
    // instrução do corretor já enuncia.
    var faixa;
    if (pAdequacao === 0) faixa = "refazer";
    else if (nota >= 7) faixa = "competitiva";
    else if (nota >= 4) faixa = "precisa_ajuste";
    else faixa = "refazer";

    // Onde mais ponto foi perdido, em pontos absolutos — não em impressão.
    // Perder 1,5 em argumentação e 0,5 em linguagem manda estudar argumentação,
    // mesmo que a linguagem pareça pior de ler. Empate vai para o eixo de maior
    // peso, que é onde a próxima tentativa rende mais.
    var maisCaro = null;
    porEixo.forEach(function (x) {
      var perda = arredondar(x.maximo - x.pontos);
      if (perda <= 0) return;
      if (
        !maisCaro ||
        perda > maisCaro.perda ||
        (perda === maisCaro.perda && x.maximo > maisCaro.maximo)
      ) {
        maisCaro = { chave: x.chave, perda: perda, maximo: x.maximo };
      }
    });

    return {
      ok: true,
      motivo: "",
      nota: nota,
      anulada: false,
      porEixo: porEixo,
      descontos: descontos,
      faixa: faixa,
      eixoMaisCaro: maisCaro ? maisCaro.chave : null,
    };
  }

  // O bloco que ia.js interpola na instrução do sistema. Sai daqui, e não de uma
  // string escrita à mão lá, para que a lista de bandas do prompt seja
  // literalmente a mesma que a conta usa. Sem números de propósito: o modelo não
  // pode saber quanto cada banda vale, ou passa a escolher pela nota que quer
  // dar em vez de pelo texto que leu.
  function blocoDoPrompt() {
    var linhas = [];
    EIXOS.forEach(function (e) {
      linhas.push("EIXO " + e.chave + " — " + e.rotulo);
      e.bandas.forEach(function (b) {
        linhas.push('  banda "' + b.chave + '" (' + b.rotulo + "): " + b.descritor);
        if (b.marcadores.length) {
          linhas.push(
            "    marcadores possíveis: " +
              b.marcadores
                .map(function (mk) {
                  return mk.chave + " (" + mk.texto + ")";
                })
                .join("; ")
          );
        }
      });
      linhas.push("");
    });
    return linhas.join("\n").trim();
  }

  window.VD_RUBRICA = {
    EIXOS: EIXOS,
    DESCONTOS: DESCONTOS,
    eixo: eixo,
    banda: banda,
    calcular: calcular,
    blocoDoPrompt: blocoDoPrompt,
  };
})();
```

- [ ] **Step 4: Rodar o verificador até passar**

Run: `node vestibular-direito-v2/verificar-rubrica.js`
Expected: uma linha `APROVADO — N conferências.` O que importa é a ausência de qualquer `FALHOU` e de `REPROVADO`; o total varia conforme o verificador cresce.

- [ ] **Step 5: Commit**

```bash
git add vestibular-direito-v2/rubrica.js vestibular-direito-v2/verificar-rubrica.js
git commit -m "A rubrica vira tabela e conta, verificáveis sem gastar token"
```

---

### Task 2: `ia.js` — schema, prompt e a nota já calculada

**Files:**
- Modify: `vestibular-direito-v2/ia.js` — schema novo, bloco de prompt, normalização, e `corrigirRedacao` passando a receber `titulo`

**Interfaces:**
- Consumes: `window.VD_RUBRICA` da Task 1 (`EIXOS`, `banda()`, `calcular()`, `blocoDoPrompt()`).
- Produces: `window.VD_IA.corrigirRedacao({ proposta, texto, titulo })` devolve, no sucesso, `{ ok: true, correcao }` onde `correcao` ganha os campos:
  - `rubrica: { adequacao: {banda, rotuloBanda, marcadores: [{chave, texto}], evidencia, comentario}, argumentacao: {...}, estrutura: {...}, linguagem: {...} }`
  - `nota: number | null`
  - `notaDetalhe: Resultado de VD_RUBRICA.calcular` (com `porEixo`, `descontos`, `anulada`, `eixoMaisCaro`, `motivo`)
  - `faixa` continua existindo, agora calculada — nunca vinda do modelo.

- [ ] **Step 1: Acrescentar a conferência de acoplamento ao verificador**

A garantia de que o prompt e a conta não divergem é estrutural — `ia.js` monta os enums a partir de `VD_RUBRICA`. O verificador confere que ninguém desfez isso escrevendo a lista à mão.

Acrescentar ao fim de `vestibular-direito-v2/verificar-rubrica.js`, **antes** do bloco `// ---------- Fim ----------`:

```js
// ---------- Acoplamento com ia.js ----------
//
// O schema e o prompt têm que sair de VD_RUBRICA, não de uma cópia escrita à
// mão. Uma cópia é o que garante que um dia as duas listas divergem — e o
// modelo passaria a escolher bandas que a conta não conhece, derrubando a nota
// inteira em silêncio.

const fonteIA = fs.readFileSync(path.join(__dirname, "ia.js"), "utf8");

conferir("ia.js lê a rubrica do global", fonteIA.indexOf("window.VD_RUBRICA") >= 0, true);
conferir("ia.js interpola o bloco de prompt", fonteIA.indexOf("blocoDoPrompt()") >= 0, true);
conferir("ia.js calcula a nota pela rubrica", fonteIA.indexOf(".calcular(") >= 0, true);

const slugsSoltos = [];
R.EIXOS.forEach((e) => {
  e.bandas.forEach((b) => {
    b.marcadores.forEach((mk) => {
      if (fonteIA.indexOf('"' + mk.chave + '"') >= 0) slugsSoltos.push(mk.chave);
    });
  });
});
conferir("ia.js não repete marcador à mão", slugsSoltos, []);
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `node vestibular-direito-v2/verificar-rubrica.js`
Expected: FAIL com três linhas `FALHOU  ia.js lê a rubrica do global`, `... interpola o bloco de prompt`, `... calcula a nota pela rubrica`, e `REPROVADO`.

- [ ] **Step 3: Trocar o schema de redação em `ia.js`**

Logo abaixo de `const SCHEMA_CORRECAO = Schema.object({...});` (ia.js:86-117), acrescentar:

Primeiro, extrair a definição dos critérios para uma constante própria, de modo
que os dois schemas usem a MESMA. **Substituir** o corpo de `SCHEMA_CORRECAO`
(ia.js:86-117) por:

```js
// A grade de conteúdo é idêntica nos dois corretores, então ela mora numa
// constante só. Duas cópias é o que garante que um dia elas divergem.
const SCHEMA_CRITERIOS = Schema.array({
  items: Schema.object({
    properties: {
      indice: Schema.integer({
        description: "Posição do critério na lista recebida, começando em 0.",
      }),
      veredito: Schema.enumString({ enum: ["cumprido", "parcial", "nao_cumprido"] }),
      evidencia: Schema.string({
        description:
          "Trecho LITERAL do texto do aluno que sustenta o veredito, com no máximo 200 caracteres. " +
          "Vazio quando o veredito for nao_cumprido.",
      }),
      comentario: Schema.string({
        description: "Uma ou duas frases dizendo o que faltou ou o que segurou o ponto.",
      }),
    },
  }),
});

const SCHEMA_CORRECAO = Schema.object({
  properties: {
    criterios: SCHEMA_CRITERIOS,
    faixa: Schema.enumString({ enum: ["competitiva", "precisa_ajuste", "refazer"] }),
    erroMaisCaro: Schema.string({
      description: "O único problema que mais custa nota neste texto. Uma frase.",
    }),
    oQueFazer: Schema.string({
      description:
        "O que fazer diferente na próxima tentativa, em duas ou três frases. " +
        "Instrução de rota, nunca o texto pronto.",
    }),
  },
});
```

Depois, acrescentar logo abaixo:

```js
// ---------- O contrato de saída da redação ----------
//
// O da redação é diferente do da dissertativa por um motivo só: aqui há nota, e
// nota exige um segundo eixo. Os `criterios` continuam sendo os pontosEsperados
// da proposta — conteúdo, específicos do tema. A `rubrica` é forma, genérica, e
// é dela que sai o número.
//
// Os enums saem de window.VD_RUBRICA, e não de uma lista escrita aqui. Uma lista
// escrita aqui é o que garante que um dia ela diverge da tabela que faz a conta.
//
// Não há campo de nota nem de faixa: o modelo escolhe banda, o código soma.
const RUBRICA = window.VD_RUBRICA;

function schemaDoEixo(eixo) {
  const bandas = eixo.bandas.map((b) => b.chave);
  const marcadores = eixo.bandas.reduce((acc, b) => acc.concat(b.marcadores.map((m) => m.chave)), []);
  return Schema.object({
    properties: {
      banda: Schema.enumString({ enum: bandas }),
      marcadores: Schema.array({
        items: Schema.enumString({ enum: marcadores.length ? marcadores : ["nenhum"] }),
        description:
          "No máximo 3, e SOMENTE os que pertencem à banda escolhida. Vazio quando não houver defeito a apontar.",
      }),
      evidencia: Schema.string({
        description:
          "Trecho LITERAL do texto do aluno que sustenta esta banda, com no máximo 200 caracteres.",
      }),
      comentario: Schema.string({
        description: "Uma ou duas frases dizendo por que a banda é esta, e não a de cima.",
      }),
    },
  });
}

const SCHEMA_CORRECAO_REDACAO = Schema.object({
  properties: {
    criterios: SCHEMA_CRITERIOS,
    rubrica: Schema.object({
      properties: RUBRICA.EIXOS.reduce((acc, e) => {
        acc[e.chave] = schemaDoEixo(e);
        return acc;
      }, {}),
    }),
    erroMaisCaro: Schema.string({
      description: "O único problema que mais custa nota neste texto. Uma frase.",
    }),
    oQueFazer: Schema.string({
      description:
        "O que fazer diferente na próxima tentativa, em duas ou três frases. " +
        "Instrução de rota, nunca o texto pronto.",
    }),
  },
});
```

- [ ] **Step 4: Acrescentar o bloco da rubrica à instrução da redação**

Em `INSTRUCAO_REDACAO` (ia.js:180-200), **substituir** a linha final `${REGRAS_FAIXA}` por:

```js
Além da grade de conteúdo, você preenche uma RUBRICA de quatro eixos. Nela:

- Você NUNCA escreve número. Você só escolhe a banda. Quem soma é o programa.
- Escolha a banda cujo descritor descreve este texto. Na dúvida entre duas,
  escolha a de baixo: um ponto dado de graça hoje é uma nota perdida na prova.
- Os "marcadores" são uma lista FECHADA. Marque no máximo 3, e apenas os que
  pertencem à banda que você escolheu. Se nenhum se aplica, deixe vazio.
- Toda banda precisa de uma "evidencia": um trecho LITERAL do texto do aluno.
  Banda sem citação é opinião, e o programa a rebaixa.
- A banda mais baixa de argumentacao é "insatisfatorio". Não existe nada abaixo
  dela — quando o texto foge ao tema, quem zera a argumentação é o programa, pelo
  eixo adequacao. Não tente zerar você.
- NÃO julgue extensão nem título. O programa já mediu os dois e já descontou.
- A banda de argumentacao tem que conversar com o que você julgou na grade de
  conteúdo. Se metade dos pontos esperados ficou em "nao_cumprido", a
  argumentação não é "consistente".

${RUBRICA.blocoDoPrompt()}
```

E **remover** de `INSTRUCAO_REDACAO` a menção a `faixa`, já que ela deixa de vir do modelo. `REGRAS_FAIXA` continua existindo e sendo usada só por `INSTRUCAO_DISSERTATIVA`.

- [ ] **Step 5: Normalizar a rubrica e calcular a nota**

Acrescentar, logo acima de `async function executar(...)` (ia.js:386):

```js
// Normaliza um eixo da rubrica. Mesma disciplina que `executar` já aplica aos
// critérios: o schema garante o FORMATO, não a sanidade.
function normalizarEixo(eixo, recebido) {
  const bruto = recebido || {};
  let b = RUBRICA.banda(eixo.chave, bruto.banda);
  if (!b) return null; // eixo inválido derruba a NOTA, não a correção inteira

  const evidencia = String(bruto.evidencia || "").slice(0, 200).trim();

  // Banda sem citação é opinião, então ela cai um degrau. Quem já está no
  // degrau mais baixo fica onde está — não há para onde cair.
  if (!evidencia) {
    const i = eixo.bandas.indexOf(b);
    if (i > 0) b = eixo.bandas[i - 1];
  }

  // Marcador que não pertence à banda escolhida é descartado, sem derrubar o
  // eixo: o defeito pode ser real e a banda também.
  const validos = b.marcadores.map((m) => m.chave);
  const marcadores = (Array.isArray(bruto.marcadores) ? bruto.marcadores : [])
    .filter((chave, i, arr) => validos.indexOf(chave) >= 0 && arr.indexOf(chave) === i)
    .slice(0, 3)
    .map((chave) => b.marcadores.find((m) => m.chave === chave));

  return {
    banda: b.chave,
    rotuloBanda: b.rotulo,
    marcadores: marcadores,
    evidencia: evidencia,
    comentario: String(bruto.comentario || "").slice(0, 400),
  };
}

function normalizarRubrica(bruta) {
  const dados = bruta || {};
  const saida = {};
  for (const eixo of RUBRICA.EIXOS) {
    const normalizado = normalizarEixo(eixo, dados[eixo.chave]);
    if (!normalizado) return null;
    saida[eixo.chave] = normalizado;
  }
  return saida;
}
```

- [ ] **Step 6: Fazer `executar` aceitar o caminho da redação**

Trocar a assinatura `async function executar(modelo, prompt, totalCriterios)` por `async function executar(modelo, prompt, totalCriterios, medidas)`, e **substituir** o `return` final por:

```js
  // Sem `medidas` é dissertativa: nada muda, a faixa continua vindo do modelo.
  if (!medidas) {
    return {
      criterios: criterios,
      faixa: ["competitiva", "precisa_ajuste", "refazer"].includes(dados.faixa)
        ? dados.faixa
        : "precisa_ajuste",
      erroMaisCaro: String(dados.erroMaisCaro || "").slice(0, 400),
      oQueFazer: String(dados.oQueFazer || "").slice(0, 600),
      quando: Date.now(),
      modelo: MODELO,
    };
  }

  // Redação: a nota sai da conta, e a faixa sai da nota. Nenhuma das duas passa
  // pelo modelo.
  const rubrica = normalizarRubrica(dados.rubrica);
  const detalhe = rubrica
    ? RUBRICA.calcular({
        rubrica: rubrica,
        palavras: medidas.palavras,
        temTitulo: medidas.temTitulo,
      })
    : { ok: false, motivo: "o corretor não preencheu a rubrica", nota: null, anulada: false,
        porEixo: [], descontos: [], faixa: null, eixoMaisCaro: null };

  return {
    criterios: criterios,
    rubrica: rubrica,
    nota: detalhe.ok ? detalhe.nota : null,
    notaDetalhe: detalhe,
    faixa: detalhe.faixa || "precisa_ajuste",
    erroMaisCaro: String(dados.erroMaisCaro || "").slice(0, 400),
    oQueFazer: String(dados.oQueFazer || "").slice(0, 600),
    quando: Date.now(),
    modelo: MODELO,
  };
```

- [ ] **Step 7: Ligar `corrigirRedacao`**

Em `corrigirRedacao` (ia.js:503):

1. Ler o título da entrada, logo após `const texto = entrada.texto || "";`:

```js
  const titulo = String(entrada.titulo || "").trim();
```

2. Trocar o modelo usado na criação: `const modeloRedacao = criarModelo(INSTRUCAO_REDACAO);` passa a precisar do schema novo. Ajustar `criarModelo` para receber o schema:

```js
function criarModelo(systemInstruction, schema) {
  return getGenerativeModel(ai, {
    model: MODELO,
    systemInstruction: systemInstruction,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema || SCHEMA_CORRECAO,
      temperature: 0.2,
      // Folgado de propósito, e mais folgado ainda desde a rubrica: são quatro
      // eixos a mais para preencher, cada um com citação. Apertar aqui trunca o
      // JSON no meio e derruba a correção inteira por falta de uma chave de
      // fechamento.
      maxOutputTokens: 6144,
    },
  });
}

const modeloDissertativa = criarModelo(INSTRUCAO_DISSERTATIVA);
const modeloRedacao = criarModelo(INSTRUCAO_REDACAO, SCHEMA_CORRECAO_REDACAO);
```

3. Acrescentar o título ao prompt, logo depois da linha `"TEMA: " + (proposta.tema || ""),`:

```js
    "TÍTULO DADO PELO CANDIDATO: " + (titulo || "(nenhum)"),
```

4. Trocar a chamada final:

```js
    const correcao = await executar(modeloRedacao, prompt, pontos.length, {
      palavras: palavras,
      temTitulo: Boolean(titulo),
    });
```

- [ ] **Step 8: Rodar o verificador**

Run: `node vestibular-direito-v2/verificar-rubrica.js`
Expected: `APROVADO` — as quatro conferências de acoplamento passam.

- [ ] **Step 9: Commit**

```bash
git add vestibular-direito-v2/ia.js vestibular-direito-v2/verificar-rubrica.js
git commit -m "O corretor escolhe a banda; a nota sai da conta, não do modelo"
```

---

### Task 3: O título vira dado

Sem campo de título não há como medir a exigência que a banca cobra — e adivinhar a primeira linha do texto seria chute. Sai antes da tela da rubrica porque a correção já depende dele.

**Files:**
- Modify: `vestibular-direito-v2/app.js` — helpers de leitura, campo no formulário, gravação, chamada do corretor

**Interfaces:**
- Consumes: nada de novo.
- Produces: `lerRedacao(answers, id) -> { titulo: string, texto: string }`, usado pela Task 4.
- `vd_redacaoAnswers[id]` passa de `string` para `{ titulo, texto }`. A leitura aceita os dois formatos para sempre: um aparelho com o app antigo em cache ainda pode escrever a string, e a estratégia de mesclagem de `sync.js` para esta chave é a padrão ("entrada": vence quem escreveu por último), o que significa que a string pode voltar da nuvem a qualquer momento.

- [ ] **Step 1: Acrescentar o leitor tolerante**

Logo abaixo de `function getRedacaoAnswers() { ... }` (app.js:2655):

```js
  // A resposta de redação era só o texto. Com a rubrica ela passou a guardar o
  // título junto, porque "ausência de título" desconta e adivinhar a primeira
  // linha seria chute.
  //
  // A leitura aceita os dois formatos PARA SEMPRE, e não só durante uma
  // migração: a estratégia de mesclagem desta chave em sync.js é a padrão
  // ("entrada" — vence quem escreveu por último), então um aparelho com o app
  // antigo em cache pode devolver a string à nuvem depois da migração.
  function lerRedacao(answers, id) {
    const v = answers[id];
    if (typeof v === "string") return { titulo: "", texto: v };
    return { titulo: (v && v.titulo) || "", texto: (v && v.texto) || "" };
  }
```

- [ ] **Step 2: Trocar a leitura no render**

Em `renderRedacaoTab`, **substituir** a linha `const answers = getRedacaoAnswers();` (app.js:2729) por:

```js
      const answers = getRedacaoAnswers();
      const resposta = lerRedacao(answers, p.id);
```

- [ ] **Step 3: Pôr o campo no formulário**

**Substituir** a linha do `<textarea>` (app.js:2755) por:

```js
        <input class="redacao-titulo" type="text" maxlength="120"
          placeholder="Título da redação" value="${escapeHtml(resposta.titulo)}">
        <p class="hint" style="margin:2px 0 8px;">A banca cobra título, e a falta dele desconta 0,5 na correção.</p>
        <textarea class="dissert-textarea" rows="18" placeholder="Escreva sua redação aqui (20 a 30 linhas)...">${escapeHtml(resposta.texto)}</textarea>
```

- [ ] **Step 4: Gravar o título e o texto juntos**

**Substituir** o listener do `textarea` (app.js:2786-2791) por:

```js
      const campoTitulo = card.querySelector(".redacao-titulo");
      const gravarResposta = () => {
        const atuais = getRedacaoAnswers();
        atuais[p.id] = { titulo: campoTitulo.value.trim(), texto: textarea.value };
        saveJSON(LS_REDACAO_ANSWERS, atuais);
      };
      campoTitulo.addEventListener("input", gravarResposta);
      textarea.addEventListener("input", () => {
        gravarResposta();
        atualizaContador();
      });
```

- [ ] **Step 5: Mandar o título para o corretor**

**Substituir** a chamada em `ligarBotaoIA` (app.js:2833):

```js
        () => window.VD_IA.corrigirRedacao({ proposta: p, texto: textarea.value, titulo: campoTitulo.value }),
```

- [ ] **Step 6: Um pouco de CSS para o campo**

Acrescentar ao fim de `vestibular-direito-v2/styles.css`:

```css
/* Título da redação: mesma família visual do textarea logo abaixo. */
.redacao-titulo {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  font: inherit;
  font-weight: 600;
}
```

- [ ] **Step 7: Verificar na tela**

Run: `powershell -ExecutionPolicy Bypass -File serve-root.ps1`, abrir `http://localhost:8844/direito/`, aba Redação, abrir uma proposta.
Expected:
- há um campo de título acima da caixa de texto;
- escrever no título, fechar a proposta e reabrir → o título continua lá;
- no console, `JSON.parse(localStorage.getItem("v2_dir_vd_redacaoAnswers"))` mostra `{ "redacao-01": { "titulo": "...", "texto": "..." } }`;
- forçar o formato antigo com `localStorage.setItem("v2_dir_vd_redacaoAnswers", JSON.stringify({"redacao-01":"texto velho"}))` e recarregar → a caixa mostra `texto velho` e o título vem vazio, sem erro no console.

- [ ] **Step 8: Commit**

```bash
git add vestibular-direito-v2/app.js vestibular-direito-v2/styles.css
git commit -m "O título da redação vira campo, porque a falta dele custa nota"
```

---

### Task 4: A tela da rubrica — banda primeiro, nota a um clique, delta contra a tentativa anterior

**Files:**
- Modify: `vestibular-direito-v2/app.js` — validação, composição do `anterior`, HTML da rubrica e da nota, listener do botão
- Modify: `vestibular-direito-v2/styles.css` — o bloco visual

**Interfaces:**
- Consumes: `correcao.rubrica`, `correcao.nota`, `correcao.notaDetalhe` da Task 2; `window.VD_RUBRICA.EIXOS` da Task 1; `lerRedacao` da Task 3.
- Produces: nada consumido por tarefas posteriores.

- [ ] **Step 1: Validar a correção de redação e compor o `anterior`**

Logo abaixo de `function correcaoIAValida(correcao, pontos) { ... }` (app.js:2516):

```js
  // A correção de redação tem uma exigência a mais: a rubrica. As correções
  // salvas antes dela não têm, e cair fora é o comportamento certo — meia
  // correção na tela é pior do que nenhuma.
  function correcaoRedacaoValida(correcao, pontos) {
    return correcaoIAValida(correcao, pontos) && Boolean(correcao.rubrica);
  }

  // Guarda UM nível de tentativa anterior, e só quando a nova tem nota. Um
  // nível, e não histórico, porque o teto de 40 correções já existe e o delta
  // que ensina é o da última tentativa.
  //
  // Correção que saiu sem nota (eixo que o corretor não preencheu) não vira
  // referência: ela substitui a corrente para o aluno ler os comentários, mas
  // preserva o `anterior` que já estava lá. Sem isso, um tropeço do corretor
  // apagaria o ponto de comparação da próxima tentativa.
  function comAnterior(guardada, nova) {
    const temNota = typeof nova.nota === "number";
    if (!temNota) {
      return guardada && guardada.anterior
        ? Object.assign({}, nova, { anterior: guardada.anterior })
        : nova;
    }
    if (!guardada || !guardada.rubrica || typeof guardada.nota !== "number") return nova;
    return Object.assign({}, nova, {
      anterior: { rubrica: guardada.rubrica, nota: guardada.nota, quando: guardada.quando },
    });
  }
```

- [ ] **Step 2: Desenhar a rubrica**

Logo abaixo de `function correcaoIAResumoHtml(correcao) { ... }` (app.js:2575):

```js
  const NOTA_FMT = (n) => n.toFixed(1).replace(".", ",");

  // Um eixo da rubrica: a banda, o que a segurou, e a citação que a sustenta.
  // Sem número — o número mora atrás do botão, e o motivo está no comentário de
  // `rubricaHtml`.
  function eixoRubricaHtml(eixo, atual, anterior) {
    if (!atual) return "";
    const antes = anterior && anterior[eixo.chave];
    const moveu = antes && antes.banda !== atual.banda;
    const marcas = (atual.marcadores || [])
      .map((m) => `<li>${escapeHtml(m.texto)}</li>`)
      .join("");
    return `
      <div class="rubrica-eixo">
        <div class="rubrica-eixo-topo">
          <span class="rubrica-eixo-nome">${escapeHtml(eixo.rotulo)}</span>
          <span class="rubrica-banda">${
            moveu ? `<span class="rubrica-antes">${escapeHtml(antes.rotuloBanda)}</span> → ` : ""
          }${escapeHtml(atual.rotuloBanda)}</span>
        </div>
        ${atual.comentario ? `<p class="rubrica-comentario">${escapeHtml(atual.comentario)}</p>` : ""}
        ${marcas ? `<ul class="rubrica-marcadores">${marcas}</ul>` : ""}
        ${atual.evidencia ? `<blockquote class="ia-evidencia">${escapeHtml(atual.evidencia)}</blockquote>` : ""}
      </div>
    `;
  }

  // O bloco da nota, escondido atrás de um clique DE PROPÓSITO.
  //
  // Existe um achado clássico sobre retorno de trabalho escrito (Butler, 1988):
  // aluno que recebe nota junto com comentário lê a nota e não lê o comentário,
  // e o desempenho seguinte fica igual ao de quem só recebeu nota. Só o
  // comentário melhora. Mas nota nenhuma também não serve — o candidato precisa
  // saber se está competitivo. Banda primeiro, número a um clique.
  function rubricaNotaHtml(correcao) {
    const d = correcao.notaDetalhe;
    if (!d || !d.ok) {
      return `<p class="hint">O corretor não preencheu a rubrica inteira, então não há nota
      desta vez. Os comentários acima valem; peça a correção de novo para ter o número.</p>`;
    }
    if (d.anulada) {
      return `<p class="rubrica-anulada"><strong>Redação anulada — 0,0.</strong>
      Os demais critérios não são avaliados quando a proposta é anulada.</p>`;
    }
    const linhas = d.porEixo
      .map(
        (e) => `
        <li>
          <span>${escapeHtml(e.rotulo)}</span>
          <strong>${NOTA_FMT(e.pontos)} de ${NOTA_FMT(e.maximo)}</strong>
          ${e.limitado ? `<em class="rubrica-trava">limitado pela adequação à proposta</em>` : ""}
        </li>`
      )
      .join("");
    const descontos = d.descontos
      .map((x) => `<li><span>${escapeHtml(x.rotulo)}</span><strong>−${NOTA_FMT(x.valor)}</strong></li>`)
      .join("");
    const anterior =
      correcao.anterior && typeof correcao.anterior.nota === "number"
        ? `<p class="rubrica-delta">Na tentativa anterior: <strong>${NOTA_FMT(correcao.anterior.nota)}</strong></p>`
        : "";
    return `
      <ul class="rubrica-nota-linhas">${linhas}${descontos}</ul>
      <p class="rubrica-total">Nota: <strong>${NOTA_FMT(d.nota)}</strong> de 10,0</p>
      ${anterior}
      <p class="hint">Esta rubrica é adaptada de uma grade de redação escolar, e a banca da sua
      trilha pontua diferente. Um 7,0 aqui não é um 7,0 na prova — o que vale é a direção, não o número.</p>
    `;
  }

  function rubricaHtml(correcao) {
    if (!correcao || !correcao.rubrica) return "";
    const eixos = (window.VD_RUBRICA && window.VD_RUBRICA.EIXOS) || [];
    const anterior = correcao.anterior && correcao.anterior.rubrica;
    const corpo = eixos
      .map((e) => eixoRubricaHtml(e, correcao.rubrica[e.chave], anterior))
      .join("");
    const d = correcao.notaDetalhe;
    // Fuga ao tema fecha em 5,0 nesta rubrica porque estrutura e linguagem ainda
    // pontuam. A frase abaixo é o que falta no papel: na banca, isso zera.
    const alerta =
      d && d.ok && !d.anulada && correcao.rubrica.adequacao &&
      (correcao.rubrica.adequacao.banda === "inadequado")
        ? `<p class="rubrica-alerta">Fuga ao tema ou ao tipo de texto. Nesta rubrica isso custa
           metade da nota; na sua banca, zera a prova inteira.</p>`
        : "";
    return `
      <div class="rubrica">
        ${alerta}
        ${corpo}
        <button class="btn-link rubrica-ver-nota" type="button">Ver a nota</button>
        <div class="rubrica-nota" hidden>${rubricaNotaHtml(correcao)}</div>
      </div>
    `;
  }
```

- [ ] **Step 3: Fazer o "Na próxima" apontar o eixo mais caro**

Em `correcaoIAResumoHtml` (app.js:2563), **substituir** a linha do `oQueFazer` por:

```js
        ${correcao.oQueFazer ? `<p class="ia-fazer"><strong>Na próxima:</strong>${
          eixoMaisCaroRotulo(correcao)
        } ${escapeHtml(correcao.oQueFazer)}</p>` : ""}
```

e acrescentar, logo acima de `correcaoIAResumoHtml`:

```js
  // Onde mais ponto absoluto foi perdido. Perder 1,5 em argumentação e 0,5 em
  // linguagem manda estudar argumentação, mesmo que a linguagem pareça pior de
  // ler — e essa triagem o aluno sozinho não faz.
  function eixoMaisCaroRotulo(correcao) {
    const chave = correcao.notaDetalhe && correcao.notaDetalhe.eixoMaisCaro;
    if (!chave || !window.VD_RUBRICA) return "";
    const eixo = window.VD_RUBRICA.eixo(chave);
    return eixo ? ` <span class="ia-alvo">${escapeHtml(eixo.rotulo)} é onde mais ponto foi embora.</span>` : "";
  }
```

- [ ] **Step 4: Encaixar na aba Redação**

Em `renderRedacaoTab`:

1. **Substituir** a linha da validação (app.js:2733):

```js
      const correcaoIA = correcaoRedacaoValida(guardada, p.pontosEsperados) ? guardada : null;
```

2. **Substituir** a linha `${correcaoIAResumoHtml(correcaoIA)}` (app.js:2769) por:

```js
          ${correcaoIAResumoHtml(correcaoIA)}
          ${rubricaHtml(correcaoIA)}
```

3. **Substituir** o `guardar` de `ligarBotaoIA` (app.js:2834):

```js
        (correcao) =>
          salvarCorrecaoIA(LS_REDACAO_IA, getRedacaoIA, p.id, comAnterior(getRedacaoIA()[p.id], correcao)),
```

4. Acrescentar o listener do botão, logo depois do bloco `const toggle = card.querySelector(".redacao-toggle-grade");` e seu `addEventListener` (app.js:2807-2812):

```js
      const verNota = card.querySelector(".rubrica-ver-nota");
      if (verNota) {
        const notaWrap = card.querySelector(".rubrica-nota");
        verNota.addEventListener("click", () => {
          notaWrap.hidden = !notaWrap.hidden;
          verNota.textContent = notaWrap.hidden ? "Ver a nota" : "Ocultar a nota";
        });
      }
```

- [ ] **Step 5: O CSS**

Acrescentar ao fim de `vestibular-direito-v2/styles.css`:

```css
/* ---------- Rubrica de redação ---------- */
/* Banda e citação primeiro; o número fica atrás do botão .rubrica-ver-nota. */
.rubrica { margin: 10px 0 4px; }
.rubrica-eixo {
  border-left: 3px solid var(--line);
  padding: 6px 0 6px 10px;
  margin: 0 0 10px;
}
.rubrica-eixo-topo {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: baseline;
  flex-wrap: wrap;
}
.rubrica-eixo-nome { font-weight: 700; }
.rubrica-banda { font-weight: 600; color: var(--ink-soft); }
.rubrica-antes { text-decoration: line-through; opacity: 0.65; }
.rubrica-comentario { margin: 4px 0 0; }
.rubrica-marcadores { margin: 6px 0 0; padding-left: 18px; color: var(--ink-soft); }
.rubrica-marcadores li { margin: 2px 0; }
.rubrica-alerta {
  border-left: 3px solid var(--bad);
  padding-left: 10px;
  margin: 0 0 10px;
  font-weight: 600;
}
.rubrica-nota { margin-top: 8px; }
.rubrica-nota-linhas { list-style: none; margin: 0; padding: 0; }
.rubrica-nota-linhas li {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  padding: 3px 0;
  border-bottom: 1px solid var(--line);
}
.rubrica-trava { color: var(--warn); font-style: normal; font-size: 0.9em; width: 100%; }
.rubrica-total { margin: 8px 0 0; font-size: 1.15em; }
.rubrica-delta { margin: 2px 0 0; color: var(--ink-soft); }
.rubrica-anulada { border-left: 3px solid var(--bad); padding-left: 10px; }
.ia-alvo { font-weight: 600; }
```

- [ ] **Step 6: Verificar na tela**

Run: `powershell -ExecutionPolicy Bypass -File serve-root.ps1`, abrir `http://localhost:8844/direito/`, aba Redação.

Sem gastar cota, injetar uma correção falsa pelo console para conferir o desenho:

```js
const NS = "v2_dir_";
const R = window.VD_RUBRICA;
const rub = {
  adequacao: { banda: "adequado", rotuloBanda: "Adequado", marcadores: [], evidencia: "trecho", comentario: "tese explícita" },
  argumentacao: { banda: "pouco_convincente", rotuloBanda: "Pouco convincente", marcadores: [{ chave: "senso_comum", texto: "argumentos embasados apenas em senso comum" }], evidencia: "trecho", comentario: "faltou aprofundar" },
  estrutura: { banda: "bem_encaminhada", rotuloBanda: "Bem encaminhada", marcadores: [], evidencia: "trecho", comentario: "ok" },
  linguagem: { banda: "excelente", rotuloBanda: "Excelente", marcadores: [], evidencia: "trecho", comentario: "ok" },
};
const detalhe = R.calcular({ rubrica: rub, palavras: 220, temTitulo: true });
const c = { criterios: [0,1,2,3,4].map(i => ({ indice: i, veredito: "parcial", evidencia: "x", comentario: "y" })),
  rubrica: rub, nota: detalhe.nota, notaDetalhe: detalhe, faixa: detalhe.faixa,
  erroMaisCaro: "argumento raso", oQueFazer: "aprofunde o segundo argumento.", quando: Date.now(), modelo: "teste" };
localStorage.setItem(NS + "vd_redacaoIA", JSON.stringify({ "redacao-01": c }));
location.reload();
```

Expected, ao abrir `redacao-01`:
- os quatro eixos aparecem com banda e comentário, **sem número à vista**;
- o marcador "argumentos embasados apenas em senso comum" aparece sob Argumentação;
- o botão diz "Ver a nota"; ao clicar, abre `1,0 de 1,0`, `2,0 de 4,0`, `2,0 de 2,5`, `2,5 de 2,5` e **Nota: 7,5 de 10,0**, sem linha de desconto (220 palavras e com título);
- a faixa no topo, com 7,5, é **Competitiva**;
- o "Na próxima" nomeia **Argumentação**;
- rodar de novo o mesmo script com `argumentacao: "consistente"` e recarregar → o eixo mostra `Pouco convincente → Consistente` e o bloco da nota mostra "Na tentativa anterior".

Para o alerta de fuga: trocar `adequacao.banda` para `"inadequado"` e recarregar. Deve aparecer a frase sobre zerar na banca, e a faixa no topo deve ser **Vale refazer**.

- [ ] **Step 7: Commit**

```bash
git add vestibular-direito-v2/app.js vestibular-direito-v2/styles.css
git commit -m "A rubrica na tela: banda primeiro, nota a um clique, delta contra a tentativa anterior"
```

---

### Task 5: Carregar `rubrica.js`, furar o cache e gerar as páginas

**Files:**
- Modify: `vestibular-direito-v2/template.html` — `<script>` novo e `?v=`
- Modify: `vestibular-direito-v2/admin.html`, `admin.js`, `assinatura.js`, `auth.js`, `feedback.js`, `ia.js`, `sync.js`, `build-paginas.js` — `?v=`
- Modify: os seis `index.html` — **gerados**, nunca editados à mão

**Interfaces:**
- Consumes: tudo das tarefas anteriores.
- Produces: o app publicável.

- [ ] **Step 1: Carregar `rubrica.js` antes de `app.js`**

Em `vestibular-direito-v2/template.html`, logo **acima** da linha `<script src="app.js?v=59"></script>` (linha 1091):

```html
<script src="rubrica.js?v=60"></script>
```

A ordem importa: `rubrica.js` é script clássico e precisa ter executado antes de `app.js`; `ia.js` é módulo e roda depois dos dois, então enxerga o global de qualquer forma.

- [ ] **Step 2: Subir o `?v=` em todos os lugares de uma vez**

Run:

```bash
cd "c:/Users/pietr/claude app/vestibular-direito-v2" && sed -i 's/?v=59/?v=60/g' template.html admin.html admin.js assinatura.js auth.js feedback.js ia.js sync.js build-paginas.js
```

- [ ] **Step 3: Conferir que não sobrou nenhum 59**

Run: `cd "c:/Users/pietr/claude app" && grep -rn "v=59" vestibular-direito-v2/ | grep -v index.html`
Expected: nenhuma linha.

Run: `cd "c:/Users/pietr/claude app" && grep -rn "firebase-init.js?v=" vestibular-direito-v2/*.js`
Expected: seis linhas, **todas** com `?v=60`. Dois valores diferentes aqui inicializam o Firebase duas vezes e quebram o app.

- [ ] **Step 4: Gerar as páginas**

Run: `node vestibular-direito-v2/build-paginas.js`
Expected: a saída lista os seis arquivos gerados.

Run: `node vestibular-direito-v2/build-paginas.js --verificar`
Expected: aprovado, sem defasagem.

- [ ] **Step 5: Conferir que a página gerada carrega o arquivo novo**

Run: `cd "c:/Users/pietr/claude app" && grep -n "rubrica.js" medicina/index.html`
Expected: uma linha, com o caminho reescrito para a pasta (`../vestibular-direito-v2/rubrica.js?v=60`).

- [ ] **Step 6: A prova real — uma correção de verdade**

Run: `powershell -ExecutionPolicy Bypass -File serve-root.ps1`

1. Abrir `http://localhost:8844/medicina/`, entrar na conta, aba Redação.
2. Limpar a correção de teste: `localStorage.removeItem("v2_med_vd_redacaoIA")`.
3. Escrever título e uma redação de verdade (ou colar uma de ~200 palavras), pedir **Corrigir com IA**.

Expected:
- a correção volta sem erro no console;
- os quatro eixos vêm preenchidos, cada um com citação **literal** do texto escrito (conferir: o trecho tem que existir no texto);
- nenhum eixo traz marcador que não pertença à banda escolhida;
- "Ver a nota" abre e a soma bate com `window.VD_RUBRICA.calcular` rodado à mão sobre as mesmas bandas;
- pedir "Corrigir de novo" e conferir que aparece "Na tentativa anterior".

- [ ] **Step 7: Verificação final e commit**

Run: `node vestibular-direito-v2/verificar-rubrica.js`
Expected: `APROVADO`.

Run: `node vestibular-direito-v2/build-paginas.js --verificar`
Expected: aprovado.

```bash
git add -A vestibular-direito-v2 index.html direito medicina economia engenharia
git commit -m "A rubrica entra no ar: script carregado, cache furado, páginas geradas"
```

- [ ] **Step 8: Conferir contra a prova real**

Antes de publicar, corrigir duas ou três redações escritas de propósito para testar os extremos e comparar o veredito com o que os estudos de anatomia dizem que a banca cobra:

- [vestibular-direito/estudo-anatomia-provas-fgv-insper-2025-2026.md](../../../vestibular-direito/estudo-anatomia-provas-fgv-insper-2025-2026.md)
- [vestibular-medicina/estudo-anatomia-provas-medicina-sp-2025-2026.md](../../../vestibular-medicina/estudo-anatomia-provas-medicina-sp-2025-2026.md)

Os casos que valem o teste, porque são onde a calibragem erra:

1. **Texto bem escrito que não toma partido** numa proposta de pergunta binária. Adequação tem que cair para `parcial` ou `inadequado`, e a trava tem que puxar a argumentação junto. Se sair 7,0, a rubrica está premiando escrita e ignorando comando — que é exatamente o defeito que ela existe para não ter.
2. **Texto com repertório decorado encaixado sem função.** Argumentação não pode passar de `bem_encaminhado`, e o marcador `repertorio_nao_articulado` deveria aparecer.
3. **Texto que propõe intervenção ao estilo ENEM.** Não pode ganhar ponto por isso, e não pode perder ponto por nada relacionado — nenhuma destas bancas pede proposta de intervenção.

Este passo não tem verificador e não tem como ter. É a única parte que só se confere com olho, e é a que decide se a nota ensina ou engana.

---

## Notas de execução

**O que não muda:** a correção de dissertativa, `banco-central/`, `DATA_VERSION`, `firestore.rules`, `functions/`. Nada aqui exige `firebase deploy`.

**`sync.js` não precisa de mudança.** `vd_redacaoAnswers` e `vd_redacaoIA` já estão em `SYNCABLE_KEYS` (app.js:62-80) e usam a estratégia padrão "entrada", que troca o valor de cada entrada por inteiro. Mudar o formato do valor é transparente para ela — e é por isso que a leitura tolerante da Task 3 precisa ser permanente, não temporária.

**A ordem das tarefas é a ordem das dependências.** A Task 2 chama `VD_RUBRICA.calcular`, a Task 3 dá o título que a conta precisa, a Task 4 desenha o que a Task 2 produz, e a Task 5 é o que faz qualquer coisa disso chegar ao navegador. Não adianta testar a Task 2 na tela antes da Task 5 — sem o `<script>` novo, `window.VD_RUBRICA` é `undefined` e `ia.js` quebra ao carregar.
