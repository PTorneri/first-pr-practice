// Divide as 525 questões objetivas de Matemática em cinco frentes.
//
//   node vestibular-economia/classificar-matematica.js            classifica e grava
//   node vestibular-economia/classificar-matematica.js --amostra geometria
//   node vestibular-economia/classificar-matematica.js --residuo  o que não pontuou
//
// POR QUE DIVIDIR
//
// A alocação do simulado é proporcional POR FRENTE. Com Humanas e Atualidades
// em 8 frentes e Matemática em 1, o simulado de 60 questões dava 5 para
// Matemática -- 8%, numa trilha em que ela é 40% da nota e 25% do caderno real
// do Insper. Não era peso baixo: era assento único numa mesa de dezesseis.
// Medido com o proportionalAllocate real do schedule.js; com cinco frentes o
// mesmo alocador entrega 17 de 60 (28%).
//
// POR QUE O RESULTADO É GRAVADO EM DISCO
//
// A classificação é heurística, e heurística erra. Gravando o mapa em
// data/matematica-frentes.json, uma correção à mão SOBREVIVE ao próximo build --
// se a classificação fosse recalculada dentro do build-bundle, toda correção
// seria apagada na próxima execução. O campo `revisado` marca as que foram
// conferidas por gente.
//
// O CUSTO DO ERRO AQUI É BAIXO, E ISSO MUDA O PROJETO DA REGRA
//
// Uma questão de probabilidade que caia na rotação de geometria continua sendo
// uma questão boa, respondida no dia errado. Não é gabarito trocado. Por isso a
// regra é generosa: pontua por evidência acumulada e só manda para o resíduo
// quem não pontuou em nada -- é melhor um palpite fundamentado do que uma
// frente "diversos" que ninguém estuda.

const fs = require("fs");
const path = require("path");

const FONTES = [
  ["direito", path.join(__dirname, "..", "vestibular-direito", "data", "questions", "matematica-rlm.json")],
  ["medicina", path.join(__dirname, "..", "vestibular-medicina", "data", "questions", "matematica.json")],
];
const SAIDA = path.join(__dirname, "data", "matematica-frentes.json");

// As regras. `peso` alto = termo que sozinho decide; peso 1 = indício.
// A ordem da lista desempata quando dois temas empatam em pontos.
const TEMAS = [
  {
    id: "matematica-sequencias",
    nome: "Matemática: Sequências e Recorrências",
    regras: [
      [/progress[ãa]o (aritm[ée]tica|geom[ée]trica)|\bP\.?A\.?\b|\bP\.?G\.?\b/i, 5],
      [/termo geral|en[ée]simo termo|termo de ordem|raz[ãa]o da (progress|sequ)/i, 4],
      // "primeiro termo" vale pouco sozinho: uma família inteira de questões de
      // PROPORÇÃO diz "o projeto associado ao primeiro termo da razão 5:3", e
      // com peso 4 elas vinham parar aqui. Foi a amostragem que pegou.
      [/primeiro termo/i, 1],
      [/sequ[êe]ncia|recorr[êe]ncia|recursiv/i, 3],
      [/soma dos (\d+ )?primeiros termos|termos consecutivos/i, 3],
      [/padr[ãa]o|figura seguinte|pr[óo]xima figura|etapa seguinte/i, 1],
    ],
  },
  {
    id: "matematica-probabilidade",
    nome: "Matemática: Probabilidade e Contagem",
    regras: [
      [/probabilidade|chance de/i, 5],
      [/combina[çc][ãa]o|arranjo|permuta[çc][ãa]o|anagrama|fatorial/i, 4],
      [/de quantas (maneiras|formas)|de quantos modos|quantos (an|c[óo]digos|n[úu]meros distintos)/i, 4],
      [/sorte(io|ada|ado)|ao acaso|aleat[óo]ri/i, 3],
      [/dado|moeda|baralho|urna|bolas?\b|fichas?\b/i, 2],
      [/casos favor[áa]veis|espa[çc]o amostral|independentes/i, 3],
      // Achados no resíduo da primeira rodada:
      [/senha|placa|c[óo]digo de acesso|formad[oa]s? por \d+ (letras|algarismos)/i, 4],
      [/preval[êe]ncia|sensibilidade|especificidade|valor preditivo|falso positivo/i, 5],
      [/conjunto[s]? .*(ambos|nenhum|apenas)|diagrama de venn|inclus[ãa]o e exclus[ãa]o|assistem a ambos|leram (o|os) livro/i, 3],
    ],
  },
  {
    id: "matematica-algebra",
    nome: "Matemática: Álgebra, Funções e Matrizes",
    regras: [
      [/matriz|determinante|\bdet\b/i, 5],
      [/fun[çc][ãa]o (afim|quadr[áa]tica|exponencial|logar[íi]tmica|do (primeiro|segundo) grau)|f\(x\)|gr[áa]fico da fun[çc][ãa]o/i, 5],
      [/logaritmo|\blog\b|exponencial/i, 4],
      [/equa[çc][ãa]o|inequa[çc][ãa]o|sistema (linear|de equa)|polin[ôo]mio|ra[íi]zes da/i, 3],
      [/inc[óo]gnita|vari[áa]vel|isolar|substitui[çc][ãa]o/i, 2],
      [/fun[çc][ãa]o/i, 2],
      // Achados no resíduo: crescimento e decaimento exponencial escritos sem a
      // palavra "função", e álgebra de números que não é conta de porcentagem.
      [/meia-vida|decaimento|dobra a cada|P\(t\)|\d,\d+ᵗ|\bcresce \d+% (ao|por)/i, 4],
      [/d[íi]zima peri[óo]dica|conjuntos num[ée]ricos|n[úu]meros (racionais|irracionais|inteiros)|radical|√/i, 3],
      [/concentra[çc][ãa]o de|mistur(a|ar) .*solu[çc][ãa]o|arrecadando R\$/i, 2],
    ],
  },
  {
    id: "matematica-geometria",
    nome: "Matemática: Geometria e Trigonometria",
    regras: [
      [/tri[âa]ngulo|circunfer[êe]ncia|c[íi]rculo|quadril[áa]tero|trap[ée]zio|losango|hex[áa]gono|pol[íi]gono/i, 5],
      [/cubo|cilindro|cone|esfera|prisma|pir[âa]mide|paralelep[íi]pedo/i, 5],
      [/seno|cosseno|tangente|trigonom|pit[áa]goras|semelhan[çc]a de tri/i, 5],
      [/[áa]rea|per[íi]metro|volume|diagonal|apo?[ée]tema|hipotenusa|cateto/i, 3],
      [/[âa]ngulo|grau[s]? de inclina|reta|plano cartesiano|coordenada|dist[âa]ncia entre/i, 3],
      [/raio|di[âa]metro|altura|base do|lado do/i, 2],
      // Achado no resíduo: relação de Euler e sólidos descritos por V, A e F.
      [/poliedro|rela[çc][ãa]o de euler|v[ée]rtices|arestas|faces do/i, 4],
    ],
  },
  {
    // Renomeada depois da primeira rodada. "Estatística e Financeira" não
    // cobria o que o corpus tem de mais frequente: razão, proporção, regra de
    // três, velocidade média, trabalho conjunto. São 138 ocorrências de "razão"
    // nas 525 -- o termo mais comum do banco inteiro. Deixar isso fora do nome
    // da frente seria descrever mal o que o aluno vai estudar.
    id: "matematica-financeira",
    nome: "Matemática: Estatística, Porcentagem e Proporção",
    regras: [
      [/juros?( simples| compostos)?|montante|capital|aplica[çc][ãa]o financeira|financiamento|presta[çc][ãa]o/i, 5],
      [/m[ée]dia (aritm[ée]tica|ponderada|simples)|mediana|moda\b|desvio padr[ãa]o|vari[âa]ncia/i, 5],
      [/porcentagem|por cento|\d\s?%|desconto|acr[ée]scimo|aumento de \d|reajuste|infla[çc][ãa]o|lucro|preju[íi]zo/i, 4],
      [/gr[áa]fico de (setores|barras|colunas)|tabela de frequ[êe]ncia|frequ[êe]ncia relativa|amostra/i, 4],
      [/regra de tr[êe]s|proporcion|propor[çc][ãa]o|raz[ãa]o|escala|densidade demogr/i, 3],
      [/dividid[oa]s? .*(na|em) raz[ãa]o|na raz[ãa]o \d+\s*:\s*\d+|divis[ãa]o proporcional/i, 5],
      [/velocidade m[ée]dia|consumo m[ée]dio|vaz[ãa]o|rendimento .*por|trabalhando (sozinh|junt)/i, 4],
      [/m[ée]dia\b/i, 2],
      [/pre[çc]o|custo|receita|sal[áa]rio|or[çc]amento/i, 2],
    ],
  },
];

// As que a regra não alcança, roteadas à mão.
//
// São 25 de 525 (5%). Ficam AQUI, e não editadas direto no JSON, para a decisão
// ser versionada junto com as regras e sobreviver a qualquer rebuild. Todas
// foram lidas uma a uma; o motivo está no comentário de cada grupo.
const REVISADAS = {
  // Contagem sem nenhuma das palavras-chave: princípio multiplicativo,
  // comissões, caminhos numa malha, permutação com restrição.
  "matematica-76": "matematica-probabilidade",
  "matematica-111": "matematica-probabilidade",
  "matematica-147": "matematica-probabilidade",
  "matematica-207": "matematica-probabilidade",
  "matematica-208": "matematica-probabilidade",
  "matematica-210": "matematica-probabilidade",
  "matematica-212": "matematica-probabilidade",
  "matematica-214": "matematica-probabilidade",

  // Sistemas lineares escritos como narrativa (dois tipos de comprimido, dois
  // alimentos, pontuação de campeonato), mais aritmética de potências, MMC,
  // divisão euclidiana e produto de matrizes.
  "matematica-rlm-55": "matematica-algebra",
  "matematica-rlm-56": "matematica-algebra",
  "matematica-86": "matematica-algebra",
  "matematica-89": "matematica-algebra",
  "matematica-113": "matematica-algebra",
  "matematica-114": "matematica-algebra",
  "matematica-176": "matematica-algebra",
  "matematica-181": "matematica-algebra",
  "matematica-185": "matematica-algebra",
  "matematica-196": "matematica-algebra",

  // Média sem a palavra "média" no enunciado (a lista de valores é que pede a
  // conta), trabalho conjunto de duas bombas, dose por quilo e conversão de
  // unidade de volume.
  "matematica-rlm-52": "matematica-financeira",
  "matematica-rlm-77": "matematica-financeira",
  "matematica-rlm-115": "matematica-financeira",
  "matematica-59": "matematica-financeira",
  "matematica-140": "matematica-financeira",

  // PA sem dizer o nome: "guarda R$ 50 e aumenta a cada mês", e a soma dos
  // múltiplos de 6 entre 50 e 200.
  "matematica-rlm-103": "matematica-sequencias",
  "matematica-241": "matematica-sequencias",
};

function textoDe(q) {
  return [q.enunciado, q.explicacao, Object.values(q.alternativas || {}).join(" ")].join(" ");
}

function classificar(q) {
  const txt = textoDe(q);
  const placar = TEMAS.map((t) => ({
    id: t.id,
    pontos: t.regras.reduce((s, [rx, peso]) => s + (rx.test(txt) ? peso : 0), 0),
  }));
  placar.sort((a, b) => b.pontos - a.pontos || TEMAS.findIndex((t) => t.id === a.id) - TEMAS.findIndex((t) => t.id === b.id));
  const melhor = placar[0];
  const segundo = placar[1];
  return {
    frente: melhor.pontos > 0 ? melhor.id : null,
    pontos: melhor.pontos,
    // Margem baixa = decisão apertada entre dois temas. Serve para escolher o
    // que revisar à mão primeiro.
    margem: melhor.pontos - segundo.pontos,
  };
}

function carregar() {
  const todas = [];
  FONTES.forEach(([trilha, caminho]) => {
    const j = JSON.parse(fs.readFileSync(caminho, "utf8"));
    (j.questoes || []).forEach((q) => todas.push({ trilha, q }));
  });
  return todas;
}

function main() {
  const todas = carregar();
  const anterior = fs.existsSync(SAIDA) ? JSON.parse(fs.readFileSync(SAIDA, "utf8")) : { mapa: {} };
  const arg = process.argv[2];

  const resultado = {};
  const porFrente = {};
  const residuo = [];
  const apertadas = [];

  todas.forEach(({ trilha, q }) => {
    // Classificação revisada à mão manda, sempre.
    const antes = anterior.mapa && anterior.mapa[q.id];
    if (antes && antes.revisado) {
      resultado[q.id] = antes;
      porFrente[antes.frente] = (porFrente[antes.frente] || 0) + 1;
      return;
    }
    if (REVISADAS[q.id]) {
      resultado[q.id] = { frente: REVISADAS[q.id], revisado: true, trilha };
      porFrente[REVISADAS[q.id]] = (porFrente[REVISADAS[q.id]] || 0) + 1;
      return;
    }
    const c = classificar(q);
    if (!c.frente) {
      residuo.push({ id: q.id, trilha, enunciado: (q.enunciado || "").slice(0, 110) });
      return;
    }
    if (c.margem <= 1) apertadas.push({ id: q.id, frente: c.frente, pontos: c.pontos });
    resultado[q.id] = { frente: c.frente, pontos: c.pontos, margem: c.margem, trilha };
    porFrente[c.frente] = (porFrente[c.frente] || 0) + 1;
  });

  if (arg === "--residuo") {
    console.log("SEM PONTUAÇÃO (" + residuo.length + "):");
    residuo.forEach((r) => console.log("  " + r.id.padEnd(22) + r.enunciado));
    return;
  }
  if (arg === "--amostra") {
    const alvo = process.argv[3];
    const ids = Object.keys(resultado).filter((id) => resultado[id].frente.indexOf(alvo) !== -1);
    console.log(alvo + ": " + ids.length + " questões. Amostra de 12:");
    const mapaQ = Object.fromEntries(todas.map(({ q }) => [q.id, q]));
    ids.filter((_, i) => i % Math.max(1, Math.floor(ids.length / 12)) === 0).slice(0, 12)
      .forEach((id) => console.log("  [" + String(resultado[id].pontos).padStart(2) + "] " +
        (mapaQ[id].enunciado || "").slice(0, 120)));
    return;
  }

  fs.writeFileSync(SAIDA, JSON.stringify({
    gerado: new Date().toISOString().slice(0, 10),
    total: Object.keys(resultado).length,
    residuo: residuo.map((r) => r.id),
    mapa: resultado,
  }, null, 1) + "\n", "utf8");

  console.log("Classificação das objetivas de Matemática");
  console.log("─────────────────────────────────────────");
  TEMAS.forEach((t) => console.log("  " + String(porFrente[t.id] || 0).padStart(4) + "  " + t.nome));
  console.log("  ────");
  console.log("  " + String(Object.keys(resultado).length).padStart(4) + "  classificadas de " + todas.length);
  console.log("  " + String(residuo.length).padStart(4) + "  sem pontuação  (--residuo para ver)");
  console.log("  " + String(apertadas.length).padStart(4) + "  decisão apertada, margem <= 1");
  console.log("\n  mapa -> " + path.relative(process.cwd(), SAIDA));
}

module.exports = { TEMAS };
if (require.main === module) main();
