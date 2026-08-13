// Gera o bundle e a lista de subtemas de cada trilha a partir do banco central.
//
//   node banco-central/build-trilhas.js              gera as três trilhas
//   node banco-central/build-trilhas.js medicina     só uma
//   node banco-central/build-trilhas.js --verificar  só checa se está velho
//
// SUBSTITUI três scripts que faziam a mesma coisa de jeitos diferentes:
// vestibular-direito/build-bundle.ps1, vestibular-medicina/build-bundle.ps1 (que
// eram idênticos) e vestibular-economia/build-bundle.js. O de Economia era o
// único com trava de hash, checagem de id duplicado e de textoId órfão -- é o
// padrão dele que sobrevive aqui, agora valendo para as três.
//
// DOIS BANCOS, E O MOTIVO
//
//   window.QUESTION_BANKS        indexado por SUBTEMA -- o estudo diário
//   window.QUESTION_BANKS_FRENTE indexado por FRENTE  -- os simulados
//
// O estudo diário passa a girar por subtema, que é o ponto de toda a mudança:
// "Biologia apareceu no calendário" nunca garantiu que genética foi estudada.
// Mas o simulado precisa continuar por frente. Ele reproduz um caderno real, e
// um caderno real tem 15 questões de Biologia, não 3 de genética + 2 de
// citologia. Além disso `simuladoMinPorFrente: 1` aplicado a 79 subtemas em vez
// de 14 frentes pediria 79 questões num simulado de 45.
//
// QUEM VÊ O QUÊ
//
// Cada trilha lista as frentes que estuda, e leva TODAS as questões daquela
// frente -- não só as que a sua própria trilha escreveu. É o ponto do banco
// central: o programa do ensino médio é o mesmo, e uma questão de parábola não
// deixa de servir ao aluno de Medicina por ter sido escrita para Direito.
// Matemática sai de 317 (Direito) e 359 (Medicina) isoladas para 676 nas duas.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const RAIZ = path.join(__dirname, "..");
const QUESTOES = path.join(__dirname, "data", "questions");
const SUBTEMAS_DIR = path.join(__dirname, "data", "subtemas");
const MANIFESTO = path.join(__dirname, "data", "origem-dos-bundles.json");

const { META } = require("./subtemas-meta.js");
const { SUBTEMAS } = require("./classificar-subtemas.js");
const { POR_BANCA, PESO_DE_FRENTE, OVERRIDES, BANCA_ALVO } = require("./pesos.js");
const VIDEOS = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "videos.json"), "utf8")).porSubtema;
const TEORIA = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "teoria.json"), "utf8")).porTrilha;
const { RESUMO_DA_FUSAO, NOVAS: NOVAS_TEORIA } = require("./teoria.js");

// ------------------------------------------------------------------ as trilhas
//
// `frentes` está na ordem em que o aluno as vê na tela de progresso.
//
// Ciências da Natureza aparece nas três. Em Direito e Economia isso é ganho
// direto do banco central: as duas tinham só as 132 questões de "noções gerais"
// que Direito escreveu para os 10% do Insper, e passam a ter as 1.120 de
// Medicina -- que é o mesmo conteúdo, escrito mais fundo. As 132 continuam no
// banco, dissolvidas nas três frentes pela classificação.
const TRILHAS = {
  direito: {
    dataDir: path.join(RAIZ, "vestibular-direito", "data"),
    nome: "Direito",
    frentes: ["interpretacao-texto", "gramatica", "literatura", "ingles", "matematica",
      "historia", "geografia", "filosofia-sociologia", "artes-cultura", "direitos-humanos",
      "atualidades", "biologia", "quimica", "fisica"],
  },
  medicina: {
    dataDir: path.join(RAIZ, "vestibular-medicina", "data"),
    nome: "Medicina",
    // Sem direitos-humanos: é frente de vestibular de Direito, e nenhuma das
    // sete bancas de Medicina a cobra como bloco. O conteúdo que interessa
    // aparece em filosofia-sociologia e atualidades.
    frentes: ["biologia", "quimica", "fisica", "matematica", "interpretacao-texto",
      "gramatica", "literatura", "ingles", "historia", "geografia",
      "filosofia-sociologia", "artes-cultura", "atualidades"],
  },
  economia: {
    dataDir: path.join(RAIZ, "vestibular-economia", "data"),
    nome: "Economia",
    frentes: ["matematica", "interpretacao-texto", "gramatica", "literatura", "ingles",
      "historia", "geografia", "filosofia-sociologia", "direitos-humanos", "artes-cultura",
      "atualidades", "biologia", "quimica", "fisica"],
  },
};

// ------------------------------------------------------------------ utilidades

function hash(txt) {
  return crypto.createHash("sha1").update(txt).digest("hex").slice(0, 12);
}

function nomeDoSubtema(id) {
  let achado = null;
  Object.values(SUBTEMAS).forEach((lista) => {
    const s = lista.find((x) => x.id === id);
    if (s) achado = s.nome;
  });
  return achado;
}

function carregarBancoCentral() {
  const frentes = {};
  const origem = {};

  fs.readdirSync(QUESTOES).filter((f) => f.endsWith(".json")).forEach((arq) => {
    const bruto = fs.readFileSync(path.join(QUESTOES, arq), "utf8");
    const json = JSON.parse(bruto);
    origem["questions/" + arq] = hash(bruto);
    frentes[json.frente] = { meta: json, questoes: json.questoes || [], textos: json.textos || [] };
  });

  const classificacao = {};
  fs.readdirSync(SUBTEMAS_DIR).filter((f) => f.endsWith(".json")).forEach((arq) => {
    const bruto = fs.readFileSync(path.join(SUBTEMAS_DIR, arq), "utf8");
    origem["subtemas/" + arq] = hash(bruto);
    Object.entries(JSON.parse(bruto).mapa || {}).forEach(([id, v]) => { classificacao[id] = v; });
  });

  return { frentes, classificacao, origem };
}

// ------------------------------------------------------------------ composição

function comporTrilha(trilhaId, central) {
  const cfg = TRILHAS[trilhaId];
  const { frentes, classificacao } = central;
  const problemas = [];

  const banks = {};        // por subtema
  const banksFrente = {};  // por frente
  const textos = {};
  const subtopics = [];
  const idsVistos = new Set();

  cfg.frentes.forEach((frenteId) => {
    const frente = frentes[frenteId];
    if (!frente) { problemas.push(trilhaId + ": frente inexistente no banco central: " + frenteId); return; }

    // A frente de destino da questão pode não ser a do arquivo em que ela mora:
    // as de `ciencias-natureza` foram dissolvidas em Biologia, Química e Física.
    // Por isso a varredura é do banco inteiro, filtrando por `frenteDestino`.
    const daFrente = [];
    Object.values(frentes).forEach((f) => {
      f.questoes.forEach((q) => {
        const c = classificacao[q.id];
        if (!c) { problemas.push("sem classificação: " + q.id); return; }
        if (c.frenteDestino === frenteId) daFrente.push({ q: q, subtema: c.subtema, de: f });
      });
    });

    if (!daFrente.length) { problemas.push(trilhaId + "/" + frenteId + ": nenhuma questão"); return; }
    if (!TEORIA[trilhaId] || !TEORIA[trilhaId][frenteId]) {
      problemas.push(trilhaId + "/" + frenteId + ": sem teoria (ver banco-central/teoria.js)");
    }

    banksFrente[frenteId] = [];

    // Agrupa por subtema preservando a ordem do banco central, que é a ordem em
    // que os clusters de texto de apoio ficam contíguos.
    const porSubtema = {};
    daFrente.forEach(({ q, subtema, de }) => {
      if (idsVistos.has(q.id)) { problemas.push("id repetido em " + trilhaId + ": " + q.id); return; }
      idsVistos.add(q.id);
      // `subtema` viaja DENTRO da questão porque o simulado a escolhe pelo
      // banco da FRENTE e mesmo assim precisa registrar a resposta na chave do
      // SUBTEMA. As respostas são indexadas por "subtopicId::questionId": se o
      // simulado gravasse pela frente e o estudo diário pelo subtema, a mesma
      // questão teria dois históricos e o caderno de erros a contaria duas vezes.
      const comSubtema = Object.assign({ subtema: subtema }, q);
      (porSubtema[subtema] = porSubtema[subtema] || []).push(comSubtema);
      banksFrente[frenteId].push(comSubtema);
      de.textos.forEach((t) => { textos[t.id] = t; });
    });

    Object.keys(porSubtema).forEach((subtemaId) => {
      banks[subtemaId] = porSubtema[subtemaId];
      const meta = META[subtemaId];
      if (!meta) { problemas.push("sem metadados de exibição: " + subtemaId); return; }
      if (!VIDEOS[subtemaId] || !VIDEOS[subtemaId].length) {
        problemas.push("sem vídeo-aula: " + subtemaId + " (ver banco-central/videos.js)");
      }
      subtopics.push({
        id: subtemaId,
        frenteId: frenteId,
        // `area` é o que a tela mostra ao lado do nome. Passa a ser a frente-pai
        // ("Biologia · Genética e Hereditariedade"), de modo que a hierarquia
        // nova aparece na UI sem nenhuma mudança em app.js.
        area: frente.meta.nome,
        areaGrande: frente.meta.area,
        nome: nomeDoSubtema(subtemaId),
        descricao: meta.descricao,
        buscaVideo: meta.buscaVideo,
      });
    });
  });

  // Todo textoId referenciado precisa existir, senão a questão vira enunciado
  // solto -- foi o defeito que o auditor da busca achou em 2026-08.
  Object.entries(banks).forEach(([subtema, qs]) => {
    qs.forEach((q) => {
      if (q.textoId && !textos[q.textoId]) {
        problemas.push(subtema + "/" + q.id + ': textoId "' + q.textoId + '" sem texto');
      }
    });
  });

  return { banks, banksFrente, textos, subtopics, problemas };
}

// ------------------------------------------------------------------- verificação

function verificar(central) {
  if (!fs.existsSync(MANIFESTO)) {
    console.error("sem manifesto: os bundles nunca foram gerados. Rode sem --verificar.");
    process.exit(1);
  }
  const anterior = JSON.parse(fs.readFileSync(MANIFESTO, "utf8"));
  const mudaram = Object.keys(anterior.origem).filter((k) => central.origem[k] !== anterior.origem[k]);
  const novos = Object.keys(central.origem).filter((k) => !(k in anterior.origem));

  if (!mudaram.length && !novos.length) {
    console.log("bundles em dia com as " + Object.keys(central.origem).length + " fontes do banco central.");
    return;
  }
  console.error("BUNDLES DESATUALIZADOS:");
  mudaram.forEach((m) => console.error("  mudou: " + m));
  novos.forEach((n) => console.error("  novo:  " + n));
  console.error("\nRode: node banco-central/build-trilhas.js");
  process.exit(1);
}

// ------------------------------------------------------------------------ saída

const cabecalho = (o) => [
  "// GERADO por banco-central/build-trilhas.js -- nao edite a mao.",
  "// " + o,
  "// A fonte e banco-central/data/questions/*.json (as questoes) e",
  "// banco-central/data/subtemas/*.json (o subtema de cada uma).",
  "//",
  "// Corrigiu uma questao? Corrija no banco central e rode o build de novo.",
  "// `--verificar` reprova quando o banco central mudou e este arquivo nao.",
  "",
].join("\n");

// Gera o priority-weights.js de uma trilha, com peso para FRENTE e para
// SUBTEMA na mesma tabela. As chaves não colidem ("biologia" contra
// "biologia-genetica"), e cada consumidor busca a granularidade que usa: o
// plano diário indexa por subtema, os dois simulados por frente.
function comporPesos(trilhaId, subtopics) {
  const bancas = POR_BANCA[trilhaId];
  const overrides = OVERRIDES[trilhaId] || {};
  const problemas = [];
  const porBanca = {};

  const deFrente = PESO_DE_FRENTE[trilhaId] || {};

  Object.entries(bancas).forEach(([banca, pesoDaFrente]) => {
    const tabela = {};
    Object.entries(pesoDaFrente).forEach(([frenteId, peso]) => {
      const sobrescrito = deFrente[banca] && deFrente[banca][frenteId];
      tabela[frenteId] = sobrescrito === undefined ? peso : sobrescrito;
    });

    subtopics.forEach((s) => {
      if (!(s.frenteId in pesoDaFrente)) {
        problemas.push(trilhaId + "/" + banca + ": frente sem peso: " + s.frenteId);
        return;
      }
      const over = overrides[banca] && overrides[banca][s.id];
      tabela[s.id] = over === undefined ? pesoDaFrente[s.frenteId] : over;
    });
    porBanca[banca] = tabela;
  });

  // Um override para um subtema que não existe é erro de digitação silencioso:
  // some no build e some do plano.
  const idsValidos = new Set(subtopics.map((s) => s.id));
  Object.entries(overrides).forEach(([banca, tabela]) => {
    Object.keys(tabela).forEach((id) => {
      if (!idsValidos.has(id)) problemas.push(trilhaId + "/" + banca + ": override de subtema inexistente: " + id);
    });
  });

  return { porBanca, problemas };
}

const CORPO_PESOS = [
  "window.PRIORITY_WEIGHTS = (function () {",
  "  var porBanca = window.PRIORITY_WEIGHTS_POR_BANCA;",
  "  var alvo = window.BANCA_ALVO;",
  "",
  "  // Uma banca só: usa a tabela dela, sem combinar.",
  "  if (typeof alvo === \"string\" && porBanca[alvo]) return porBanca[alvo];",
  "",
  "  var ids = Array.isArray(alvo)",
  "    ? alvo.filter(function (b) { return porBanca[b]; })",
  "    : Object.keys(porBanca);",
  "  var selecionadas = ids.length ? ids : Object.keys(porBanca);",
  "",
  "  // MAIOR peso entre as bancas alvo, nunca a média: a média zeraria pela",
  "  // metade justamente as frentes assimétricas, que são as que não se pode",
  "  // descobrir na prova que ficaram de fora.",
  "  var combinado = {};",
  "  var primeira = porBanca[selecionadas[0]];",
  "  Object.keys(primeira).forEach(function (id) {",
  "    combinado[id] = selecionadas.reduce(function (maior, banca) {",
  "      return Math.max(maior, porBanca[banca][id] || 0);",
  "    }, 0);",
  "  });",
  "  return combinado;",
  "})();",
].join("\n");

function main() {
  const central = carregarBancoCentral();
  if (process.argv.includes("--verificar")) return verificar(central);

  const alvo = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : null;
  if (alvo && !TRILHAS[alvo]) {
    console.error("trilha desconhecida: " + alvo + " (use " + Object.keys(TRILHAS).join(", ") + ")");
    process.exit(1);
  }
  const alvos = alvo ? [alvo] : Object.keys(TRILHAS);

  const resultados = [];
  const problemas = [];
  alvos.forEach((t) => {
    const r = comporTrilha(t, central);
    const p = comporPesos(t, r.subtopics);
    problemas.push.apply(problemas, r.problemas);
    problemas.push.apply(problemas, p.problemas);
    resultados.push({ trilha: t, ...r, pesos: p.porBanca });
  });

  if (problemas.length) {
    console.error("PROBLEMAS (" + problemas.length + "):");
    [...new Set(problemas)].slice(0, 40).forEach((p) => console.error("  x " + p));
    process.exit(1);
  }

  resultados.forEach(({ trilha, banks, banksFrente, textos, subtopics, pesos }) => {
    const dir = TRILHAS[trilha].dataDir;
    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, "priority-weights.js"),
      cabecalho("Pesos de prioridade da trilha de " + TRILHAS[trilha].nome + ".") +
      "// A fonte editorial destes números é banco-central/pesos.js.\n" +
      "// Cada tabela traz FRENTE e SUBTEMA: o plano diário indexa por subtema,\n" +
      "// os simulados por frente.\n\n" +
      "window.PRIORITY_WEIGHTS_POR_BANCA = " + JSON.stringify(pesos, null, 1) + ";\n\n" +
      "window.BANCA_ALVO = window.BANCA_ALVO || " + JSON.stringify(BANCA_ALVO[trilha]) + ";\n\n" +
      CORPO_PESOS + "\n", "utf8");

    // O banco por frente é MONTADO aqui, não serializado: gravar as duas
    // visões punha cada questão duas vezes no arquivo e levou o bundle de
    // 4,7 MB para 14,2 MB. Montado em runtime, o array por frente guarda
    // referências para os mesmos objetos do banco por subtema -- custo zero de
    // memória e de download.
    //
    // A ordem sai certa de graça: como todo cluster de texto de apoio cabe
    // inteiro dentro de um subtema (ver coesão de cluster em
    // classificar-subtemas.js), concatenar subtema a subtema nunca parte um.
    const subtemasPorFrente = {};
    Object.keys(banksFrente).forEach((f) => {
      subtemasPorFrente[f] = subtopics.filter((s) => s.frenteId === f).map((s) => s.id);
    });

    fs.writeFileSync(path.join(dir, "bundle.js"),
      cabecalho("Banco objetivo da trilha de " + TRILHAS[trilha].nome + ".") +
      "window.QUESTION_BANKS = " + JSON.stringify(banks, null, 1) + ";\n\n" +
      "window.SUBTEMAS_POR_FRENTE = " + JSON.stringify(subtemasPorFrente, null, 1) + ";\n\n" +
      // INTERCALA os subtemas, não concatena. Os simulados puxam uma janela
      // CONTÍGUA deste array, e concatenar fazia o bloco de 15 questões de
      // Matemática da FGV sair com 15 de geometria e o de Inglês com 15 de
      // inferência — a janela caía inteira dentro do primeiro subtema. A prova
      // real varia dentro do bloco, e antes da migração isso vinha de graça,
      // porque o banco da frente estava na ordem em que foi escrito.
      //
      // A intercalação é por GRUPO, não por questão: questões que dividem um
      // texto de apoio andam juntas, senão o cluster se parte aqui.
      "window.QUESTION_BANKS_FRENTE = (function () {\n" +
      "  function emGrupos(qs) {\n" +
      "    var grupos = [], atual = null, chave;\n" +
      "    qs.forEach(function (q) {\n" +
      "      var k = q.textoId || null;\n" +
      "      if (atual && k !== null && k === chave) { atual.push(q); return; }\n" +
      "      atual = [q]; chave = k; grupos.push(atual);\n" +
      "    });\n" +
      "    return grupos;\n" +
      "  }\n" +
      "  var porFrente = {};\n" +
      "  Object.keys(window.SUBTEMAS_POR_FRENTE).forEach(function (frente) {\n" +
      "    var filas = window.SUBTEMAS_POR_FRENTE[frente].map(function (subtema) {\n" +
      "      return emGrupos(window.QUESTION_BANKS[subtema] || []);\n" +
      "    });\n" +
      "    var todas = [], i = 0, restam = true;\n" +
      "    while (restam) {\n" +
      "      restam = false;\n" +
      "      for (var f = 0; f < filas.length; f++) {\n" +
      "        if (i >= filas[f].length) continue;\n" +
      "        restam = true;\n" +
      "        filas[f][i].forEach(function (q) { todas.push(q); });\n" +
      "      }\n" +
      "      i++;\n" +
      "    }\n" +
      "    porFrente[frente] = todas;\n" +
      "  });\n" +
      "  return porFrente;\n" +
      "})();\n\n" +
      "window.QUESTION_TEXTS = " + JSON.stringify(textos, null, 1) + ";\n", "utf8");

    fs.writeFileSync(path.join(dir, "subtopics.js"),
      cabecalho("Subtemas da trilha de " + TRILHAS[trilha].nome + ".") +
      "window.SUBTOPICS = " + JSON.stringify(subtopics, null, 2) + ";\n", "utf8");

    // As vídeo-aulas passam a ser indexadas por SUBTEMA. Antes eram por frente e
    // `pickLessonVideo` girava entre os recortes conforme o número da visita,
    // torcendo para o aluno cair no recorte do dia; agora o dia É um subtema e o
    // vídeo é o daquele assunto. A rotação por visita continua existindo, mas
    // agora escolhe entre aulas do MESMO assunto.
    const videos = {};
    subtopics.forEach((s) => { videos[s.id] = VIDEOS[s.id] || []; });
    fs.writeFileSync(path.join(dir, "video-topics.js"),
      cabecalho("Vídeo-aulas da trilha de " + TRILHAS[trilha].nome + ", por subtema.") +
      "// A fonte é banco-central/data/videos.json (mapa em banco-central/videos.js).\n\n" +
      "window.VIDEO_TOPICS = " + JSON.stringify(videos, null, 1) + ";\n", "utf8");

    // A teoria continua por FRENTE e por TRILHA: ela fala da banca, e o texto de
    // Biologia em Medicina cita as discursivas da Santa Casa. Só as chaves
    // mudaram, para acompanhar a fusão das frentes.
    // `teoria.json` guarda o que foi HERDADO das trilhas na consolidação, que
    // rodou uma vez e não roda de novo (os theory.js de origem já foram
    // reescritos por este build). As edições posteriores vivem em teoria.js e
    // são aplicadas por cima AQUI, a cada build — sem isso, corrigir uma teoria
    // exigiria editar um arquivo gerado, que é onde a correção se perde.
    const teoria = {};
    Object.keys(banksFrente).forEach((f) => {
      const herdada = TEORIA[trilha] && TEORIA[trilha][f];
      const nova = (NOVAS_TEORIA[trilha] || {})[f];
      if (nova) { teoria[f] = nova; return; }
      if (!herdada) return;
      const resumo = (RESUMO_DA_FUSAO[trilha] || {})[f];
      teoria[f] = resumo ? Object.assign({}, herdada, { resumo: resumo }) : herdada;
    });
    fs.writeFileSync(path.join(dir, "theory.js"),
      cabecalho("Teoria da trilha de " + TRILHAS[trilha].nome + ", por frente.") +
      "// A fonte é banco-central/data/teoria.json (mapa em banco-central/teoria.js).\n\n" +
      "window.THEORY = " + JSON.stringify(teoria, null, 1) + ";\n", "utf8");
  });

  if (!alvo) {
    fs.writeFileSync(MANIFESTO, JSON.stringify({
      gerado: new Date().toISOString().slice(0, 10),
      origem: central.origem,
    }, null, 2) + "\n", "utf8");
  }

  console.log("Bundles por trilha");
  console.log("══════════════════");
  resultados.forEach(({ trilha, banks, banksFrente, subtopics, textos }) => {
    const total = Object.values(banksFrente).reduce((s, a) => s + a.length, 0);
    console.log("\n" + TRILHAS[trilha].nome + ": " + total + " questões, " +
      Object.keys(banksFrente).length + " frentes, " + subtopics.length + " subtemas, " +
      Object.keys(textos).length + " textos");
    const menores = Object.entries(banks).filter(([, q]) => q.length < 25)
      .sort((a, b) => a[1].length - b[1].length);
    if (menores.length) {
      console.log("  subtemas com menos de 25 questões: " +
        menores.map(([s, q]) => s + " (" + q.length + ")").join(", "));
    }
  });
}

module.exports = { TRILHAS };
if (require.main === module) main();
