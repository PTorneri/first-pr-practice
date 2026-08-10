// Compõe o catálogo de vídeo-aulas por frente da trilha de Economia.
//
//   node vestibular-economia/build-video-topics.js              compõe
//   node vestibular-economia/build-video-topics.js --verificar   só checa se está velho
//
// O INVARIANTE QUE ESTE SCRIPT EXISTE PARA SEGURAR
//
// A teoria e o vídeo do dia giram pelo MESMO índice. Em app.js:
//
//   pickLessonVideo:        pool[(visitNumber - 1) % pool.length]
//   renderTheoryBlockHtml:  theory.subtemas[(visitNumber - 1) % subtemas.length]
//
// e o comentário de lá diz por quê: "espelhando o mesmo índice usado por
// pickLessonVideo — assim a teoria do dia sempre bate com o subtema do vídeo
// sugerido". Isso só é verdade enquanto as duas listas tiverem o MESMO tamanho
// e a MESMA ordem. Na trilha de Direito elas têm, nas quinze frentes, com os
// `tema` idênticos string a string — é curadoria, não código: nada no app
// impede o desalinhamento, e desalinhado ninguém percebe. A teoria fala de
// crase enquanto o vídeo sugerido é de pontuação, e não há erro nenhum na tela.
//
// Por isso os `tema` daqui não são digitados: são LIDOS de data/theory.js, e o
// script reprova se sobrar ou faltar um. O que se escreve à mão é só a string
// de busca de cada tema, e ela é procurada pelo tema — renomear um subtema na
// teoria quebra o build em vez de desalinhar em silêncio.
//
// DE ONDE VEM CADA FRENTE
//
//   onze compostas       de vestibular-direito/data/video-topics.js, na mesma
//                        correspondência da teoria; História soma as duas
//                        Histórias de lá, na ordem Brasil → Geral, porque a
//                        teoria daqui soma os subtemas na mesma ordem.
//
//   literatura, biologia de vestibular-medicina/data/video-topics.js: são temas
//   química, física      de CONTEÚDO ("aula heredograma", "aula estequiometria"),
//                        que não mudam com a banca. Duas buscas de lá terminam
//                        em "vestibular medicina" e são normalizadas para
//                        "vestibular" — mandar um candidato de Economia para
//                        uma aula anunciada como de Medicina é ruído, e o
//                        conteúdo é o mesmo. Estas quatro frentes não têm
//                        subtema na teoria, então aqui não há alinhamento a
//                        respeitar: o tamanho do catálogo é livre.
//
//   as cinco de          escritas aqui, porque a teoria delas foi escrita à mão
//   Matemática           (ver build-theory.js) e não há catálogo de onde copiar.
//
// Rode DEPOIS do build-theory.js: este script lê o theory.js já composto.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const vm = require("vm");

const RAIZ = path.join(__dirname, "..");
const FONTES = {
  direito: path.join(RAIZ, "vestibular-direito", "data", "video-topics.js"),
  medicina: path.join(RAIZ, "vestibular-medicina", "data", "video-topics.js"),
};
const TEORIA = path.join(__dirname, "data", "theory.js");
const SAIDA = path.join(__dirname, "data", "video-topics.js");
const MANIFESTO = path.join(__dirname, "data", "origem-dos-videos.json");

// ------------------------------------------------- as buscas de Matemática
//
// Chave = o `tema` do subtema em data/theory.js. Não é repetição do tema: é a
// amarra que faz o build cair se a teoria for renomeada sem passar por aqui.
//
// As strings seguem o padrão das outras trilhas — "aula <assunto> vestibular" —
// com uma exceção deliberada: os dois itens de raciocínio abstrato (invariante e
// diferenças finitas) NÃO levam "vestibular", porque esse conteúdo praticamente
// não existe em canal de cursinho. Ele mora em material de olimpíada, e é de lá
// que a aula útil vai vir. O estudo avisa que esse é justamente o item mais
// difícil da prova e o que um treino só de situação-problema não cobre.
const BUSCAS_MATEMATICA = {
  // Sequências e recorrências
  "Recorrência com invariante": "aula recorrência invariante problemas olimpíada de matemática",
  "Progressões em séries de dados reais": "aula progressão aritmética e geométrica problemas vestibular",
  "Somas e identidades de contagem": "aula soma de progressão aritmética soma telescópica vestibular",
  "Termos distantes: periodicidade e resto": "aula periodicidade e resto da divisão em sequências vestibular",

  // Probabilidade e contagem
  "Passeio aleatório e saldo": "aula distribuição binomial probabilidade vestibular",
  "Contagem com restrição de posição": "aula análise combinatória permutação com restrição vestibular",
  "Probabilidade em torneios e chaveamentos": "aula probabilidade em torneio e chaveamento vestibular",
  "Probabilidade que depende da etapa anterior": "aula probabilidade condicional e recorrência vestibular",

  // Álgebra e funções
  "Raciocínio abstrato: o item que não é conteúdo aplicado": "aula diferenças finitas de polinômios raciocínio matemático",
  "Interpolação: a função que passa pelos pontos": "aula interpolação polinomial sistema linear",
  "Funções definidas por partes": "aula função definida por partes vestibular",
  "Lei de potência e leitura em escala logarítmica": "aula gráfico em escala logarítmica log-log lei de potência",

  // Geometria
  "Figura escondida numa equação": "aula equação da circunferência completar quadrados geometria analítica",
  "Semelhança e razão entre áreas": "aula semelhança de triângulos razão entre áreas vestibular",
  "Áreas por decomposição": "aula área do setor circular e do segmento circular vestibular",
  "Trigonometria em triângulos quaisquer": "aula lei dos senos e lei dos cossenos vestibular",

  // Estatística, porcentagem e proporção
  "Traduzir economia em modelo": "aula índice de Gini curva de Lorenz explicado",
  "Reajustes sucessivos e taxas equivalentes": "aula juros compostos taxa equivalente aumentos sucessivos vestibular",
  "Médias que mudam quando o conjunto muda": "aula média aritmética e ponderada problemas vestibular",
  "Estatística descritiva e distribuição assimétrica": "aula média mediana e moda distribuição assimétrica vestibular",
};

// ---------------------------------------------------------- a correspondência
//
// Mesma ordem de data/subtopics.js. `de` vazio = escrito aqui (as cinco de
// Matemática, que saem de BUSCAS_MATEMATICA pelos temas da teoria).

const COMPOSICAO = [
  { id: "interpretacao-texto", de: [["direito", "interpretacao-texto"]] },
  { id: "literatura", de: [["medicina", "literatura"]] },
  { id: "gramatica", de: [["direito", "gramatica"]] },
  { id: "ingles", de: [["direito", "ingles"]] },
  { id: "matematica-sequencias", de: [] },
  { id: "matematica-probabilidade", de: [] },
  { id: "matematica-algebra", de: [] },
  { id: "matematica-geometria", de: [] },
  { id: "matematica-financeira", de: [] },
  { id: "historia", de: [["direito", "historia-brasil"], ["direito", "historia-geral"]] },
  { id: "geografia", de: [["direito", "geografia"]] },
  { id: "filosofia-sociologia", de: [["direito", "filosofia-sociologia"]] },
  { id: "direitos-humanos", de: [["direito", "direitos-humanos"]] },
  { id: "atualidades-politica", de: [["direito", "atualidades-politica"]] },
  { id: "atualidades-geopolitica", de: [["direito", "atualidades-geopolitica"]] },
  { id: "atualidades-meioambiente", de: [["direito", "atualidades-meioambiente"]] },
  { id: "atualidades-tecnologia", de: [["direito", "atualidades-tecnologia"]] },
  { id: "biologia", de: [["medicina", "biologia"]] },
  { id: "quimica", de: [["medicina", "quimica"]] },
  { id: "fisica", de: [["medicina", "fisica"]] },
];

// -------------------------------------------------------------------- carga

function rodar(arquivo, global) {
  const sandbox = { console };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(arquivo, "utf8"), sandbox, { filename: arquivo });
  if (!sandbox[global]) throw new Error("sem window." + global + " em " + arquivo);
  return sandbox[global];
}

function hash(arquivo) {
  return crypto.createHash("sha256").update(fs.readFileSync(arquivo)).digest("hex").slice(0, 12);
}

// "aula X vestibular medicina" -> "aula X vestibular". Só no fim da string: um
// tema que fale de medicina no meio (história da medicina) continua intacto.
function semRotuloDeMedicina(busca) {
  return busca.replace(/\s+vestibular\s+medicina\s*$/i, " vestibular");
}

// ------------------------------------------------------------------- compor

function compor() {
  if (!fs.existsSync(TEORIA)) {
    console.error("data/theory.js ainda não existe — rode build-theory.js antes.");
    process.exit(1);
  }
  const teoria = rodar(TEORIA, "THEORY");
  const fontes = {};
  for (const trilha of Object.keys(FONTES)) fontes[trilha] = rodar(FONTES[trilha], "VIDEO_TOPICS");

  const saida = {};
  const problemas = [];

  for (const item of COMPOSICAO) {
    if (!item.de.length) {
      const subtemas = (teoria[item.id] && teoria[item.id].subtemas) || [];
      if (!subtemas.length) { problemas.push(item.id + ": sem subtemas na teoria para derivar os vídeos"); continue; }
      saida[item.id] = subtemas.map((s) => {
        const busca = BUSCAS_MATEMATICA[s.tema];
        if (!busca) problemas.push(item.id + ": sem busca escrita para o subtema \"" + s.tema + "\"");
        return { tema: s.tema, busca: busca || "" };
      });
      continue;
    }

    const lista = [];
    for (const [trilha, frente] of item.de) {
      const pool = fontes[trilha] && fontes[trilha][frente];
      if (!pool) { problemas.push("origem inexistente: " + trilha + "/" + frente + " (para " + item.id + ")"); continue; }
      pool.forEach((v) => lista.push({ tema: v.tema, busca: semRotuloDeMedicina(v.busca) }));
    }
    if (lista.length) saida[item.id] = lista;
  }

  // Uma busca escrita e não usada é sinal de tema renomeado na teoria: o build
  // já teria reprovado do outro lado, mas dizer os dois lados encurta o
  // conserto.
  const usados = new Set();
  for (const id of Object.keys(saida)) saida[id].forEach((v) => usados.add(v.tema));
  for (const tema of Object.keys(BUSCAS_MATEMATICA)) {
    if (!usados.has(tema)) problemas.push("busca escrita para tema que não existe na teoria: \"" + tema + "\"");
  }

  // ---- O invariante ----
  //
  // Onde a teoria tem subtemas, as duas listas giram juntas pelo visitNumber.
  // Tamanho diferente ou ordem diferente = teoria de um assunto ao lado do
  // vídeo de outro, sem erro visível na tela.
  for (const id of Object.keys(saida)) {
    const subtemas = (teoria[id] && teoria[id].subtemas) || [];
    if (!subtemas.length) continue;
    const videos = saida[id];
    if (subtemas.length !== videos.length) {
      problemas.push(id + ": " + subtemas.length + " subtemas na teoria contra " + videos.length + " vídeos");
      continue;
    }
    subtemas.forEach((s, i) => {
      if (s.tema !== videos[i].tema) {
        problemas.push(id + "[" + i + "]: teoria diz \"" + s.tema + "\" e o vídeo diz \"" + videos[i].tema + "\"");
      }
    });
  }

  for (const item of COMPOSICAO) {
    if (!saida[item.id] || !saida[item.id].length) problemas.push("frente sem vídeo nenhum: " + item.id);
  }
  for (const id of Object.keys(saida)) {
    saida[id].forEach((v, i) => {
      if (!v.tema || !v.busca) problemas.push(id + "[" + i + "]: tema ou busca vazio");
    });
  }

  if (problemas.length) {
    console.error("vídeo-aulas de Economia NÃO compostas:");
    problemas.forEach((p) => console.error("  - " + p));
    process.exit(1);
  }

  return saida;
}

function cabecalho() {
  return [
    "// GERADO por vestibular-economia/build-video-topics.js -- nao edite a mao.",
    "// Subtemas de video-aula por frente da trilha de Economia.",
    "//",
    "// Onde a frente tem subtema na teoria, esta lista tem o MESMO tamanho e a",
    "// MESMA ordem: app.js gira as duas pelo mesmo (visitNumber - 1) % tamanho, e",
    "// e isso que faz a aula sugerida falar do assunto que a teoria do dia abriu.",
    "// O build reprova se desalinhar -- desalinhado nao aparece erro na tela.",
    "//",
    "// Onze frentes vem do catalogo de Direito, quatro do de Medicina (temas de",
    "// conteudo, que nao mudam com a banca) e as cinco de Matematica sao escritas",
    "// no proprio build, porque a teoria delas tambem foi.",
  ].join("\n");
}

function gravar(saida) {
  fs.writeFileSync(SAIDA, cabecalho() + "\nwindow.VIDEO_TOPICS = " + JSON.stringify(saida, null, 2) + ";\n", "utf8");

  const origem = {};
  for (const trilha of Object.keys(FONTES)) origem[trilha + "/video-topics"] = hash(FONTES[trilha]);
  origem["economia/theory"] = hash(TEORIA);

  let itens = 0;
  for (const id of Object.keys(saida)) itens += saida[id].length;

  fs.writeFileSync(MANIFESTO, JSON.stringify({
    composto: new Date().toISOString().slice(0, 10),
    frentes: Object.keys(saida).length,
    itens: itens,
    autorais: COMPOSICAO.filter((c) => !c.de.length).map((c) => c.id),
    origem: origem,
  }, null, 2) + "\n", "utf8");
}

function verificar() {
  if (!fs.existsSync(SAIDA) || !fs.existsSync(MANIFESTO)) {
    console.error("vídeo-aulas de Economia ainda não foram compostas.");
    process.exit(1);
  }
  const manifesto = JSON.parse(fs.readFileSync(MANIFESTO, "utf8"));
  const mudou = [];
  for (const trilha of Object.keys(FONTES)) {
    const chave = trilha + "/video-topics";
    if (manifesto.origem[chave] !== hash(FONTES[trilha])) mudou.push(chave);
  }
  // A teoria é fonte tanto quanto os catálogos: é dela que saem os temas das
  // cinco frentes de Matemática.
  if (manifesto.origem["economia/theory"] !== hash(TEORIA)) mudou.push("economia/theory");

  if (mudou.length) {
    console.error("vídeo-aulas de Economia VELHAS -- mudaram: " + mudou.join(", "));
    console.error("rode: node vestibular-economia/build-video-topics.js");
    process.exit(1);
  }
  console.log("vídeo-aulas de Economia em dia com as " + (Object.keys(FONTES).length + 1) + " fontes.");
}

// ---------------------------------------------------------------------- main

if (process.argv.includes("--verificar")) {
  verificar();
} else {
  const saida = compor();
  gravar(saida);
  let itens = 0;
  for (const id of Object.keys(saida)) itens += saida[id].length;
  const autorais = COMPOSICAO.filter((c) => !c.de.length).length;
  console.log("vídeo-aulas de Economia compostas: " + Object.keys(saida).length + " frentes, " +
              itens + " subtemas (" + (COMPOSICAO.length - autorais) + " frentes compostas, " + autorais + " autorais).");
}
