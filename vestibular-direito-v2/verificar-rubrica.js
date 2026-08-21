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
// Correção ao brief: o exemplo original (adequação "parcial") não monta um
// empate de verdade — argumentação perde 2,5 contra 0,5 dos outros dois eixos.
// Este exemplo empata estrutura e linguagem, cada uma perdendo 2,0 do próprio
// máximo de 2,5, e confere que o desempate cai para a ordem de EIXOS (estrutura
// vem antes de linguagem).
conferir(
  "perda igual desempata pela ordem dos eixos",
  R.calcular({ rubrica: r("adequado", "excelente", "inadequada", "inadequada"), palavras: 220, temTitulo: true }).eixoMaisCaro,
  "estrutura"
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
