// Funde os bancos de Direito e Medicina num banco central único.
//
//   node banco-central/migrar.js            funde e grava data/questions/*.json
//   node banco-central/migrar.js --conferir só checa, não grava
//
// POR QUE UM BANCO CENTRAL
//
// As três trilhas preparam para vestibulares diferentes, mas o conteúdo cobrado
// é o mesmo ensino médio. Hoje uma questão de parábola escrita para Direito é
// invisível para o aluno de Medicina só porque mora noutra pasta -- e a trilha
// de Economia já existe como prova disso: ela não tem banco próprio, é composta
// copiando arquivo-fonte das outras duas (vestibular-economia/build-bundle.js).
// Este script transforma essa cópia ad hoc em fonte única.
//
// O QUE ESTE SCRIPT DECIDE, E O QUE ELE NÃO DECIDE
//
// Ele decide só a ESTRUTURA: quais frentes existem no centro e de quais arquivos
// cada uma vem. Não decide subtema (é a etapa seguinte, classificar-subtemas.js)
// nem quem vê o quê (é o build por trilha, que lê este banco e filtra).
//
// AS DUAS ARMADILHAS
//
// 1. ID REPETIDO. São 1034: "geografia-01" existe nos dois bancos, e o app
//    indexa resposta e caderno de erros por id -- dois iguais fariam uma questão
//    herdar o histórico da outra. Todo id ganha prefixo de origem ("dir-", "med-").
//    A regra vale para TODAS as questões, não só as que colidem hoje: prefixo
//    condicional viraria armadilha na próxima questão adicionada.
//
// 2. TEXTO DE APOIO ÓRFÃO. Questões que dividem um texto longo referenciam-no
//    por `textoId` e precisam ficar CONTÍGUAS no arquivo (o build exige cluster
//    contíguo). Por isso a fusão concatena arquivo inteiro por arquivo inteiro,
//    nunca intercala. Os 142 textoIds não colidem entre as trilhas -- conferido.

const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const FONTES = {
  direito: path.join(RAIZ, "vestibular-direito", "data", "questions"),
  medicina: path.join(RAIZ, "vestibular-medicina", "data", "questions"),
};
const SAIDA = path.join(__dirname, "data", "questions");
const MANIFESTO = path.join(__dirname, "data", "origem-do-banco.json");

const PREFIXO = { direito: "dir", medicina: "med" };

// ------------------------------------------------------------------- o mapeamento
//
// Cada frente central lista os arquivos de origem na ordem em que entram.
//
// As fusões e o motivo de cada uma:
//
//   matematica     <- "matematica-rlm" (Direito) + "matematica" (Medicina).
//                     Nenhuma banca de Medicina cobra raciocínio lógico como
//                     bloco próprio, mas RLM é conteúdo de matemática básica que
//                     serve a qualquer prova. Vira subtema, não frente à parte.
//   historia       <- "historia-brasil" + "historia-geral" (Direito) + "historia"
//                     (Medicina). Nenhuma das bancas separa os dois no caderno;
//                     Brasil e Geral viram subtema.
//   atualidades    <- as quatro frentes de Atualidades de Direito + a única de
//                     Medicina. A divisão temática de Direito (política,
//                     geopolítica, meio ambiente, tecnologia) é boa demais para
//                     jogar fora: ela vira o conjunto inicial de subtemas.
//
// `ciencias-natureza` (132 questões de "noções gerais" de Direito) fica como
// frente própria AQUI de propósito. Dividi-la em Biologia/Química/Física é
// classificação temática, e classificação é a etapa seguinte -- fazer isso agora
// misturaria uma decisão heurística numa migração que precisa ser puramente
// estrutural e conferível por contagem.
const MAPA = [
  { id: "interpretacao-texto", area: "Linguagens", nome: "Interpretação de Texto",
    de: [["direito", "interpretacao-texto"], ["medicina", "interpretacao-texto"]] },
  { id: "gramatica", area: "Linguagens", nome: "Gramática e Norma Culta",
    de: [["direito", "gramatica"], ["medicina", "gramatica"]] },
  { id: "literatura", area: "Linguagens", nome: "Literatura Brasileira",
    de: [["direito", "literatura"], ["medicina", "literatura"]] },
  { id: "ingles", area: "Linguagens", nome: "Língua Inglesa",
    de: [["direito", "ingles"], ["medicina", "ingles"]] },

  { id: "matematica", area: "Matemática", nome: "Matemática",
    de: [["direito", "matematica-rlm"], ["medicina", "matematica"]] },

  { id: "biologia", area: "Ciências da Natureza", nome: "Biologia",
    de: [["medicina", "biologia"]] },
  { id: "quimica", area: "Ciências da Natureza", nome: "Química",
    de: [["medicina", "quimica"]] },
  { id: "fisica", area: "Ciências da Natureza", nome: "Física",
    de: [["medicina", "fisica"]] },
  { id: "ciencias-natureza", area: "Ciências da Natureza", nome: "Ciências da Natureza (noções gerais)",
    de: [["direito", "ciencias-natureza"]] },

  { id: "historia", area: "Ciências Humanas", nome: "História",
    de: [["direito", "historia-brasil"], ["direito", "historia-geral"], ["medicina", "historia"]] },
  { id: "geografia", area: "Ciências Humanas", nome: "Geografia",
    de: [["direito", "geografia"], ["medicina", "geografia"]] },
  { id: "filosofia-sociologia", area: "Ciências Humanas", nome: "Filosofia e Sociologia",
    de: [["direito", "filosofia-sociologia"], ["medicina", "filosofia-sociologia"]] },
  { id: "artes-cultura", area: "Ciências Humanas", nome: "Artes e Cultura",
    de: [["direito", "artes-cultura"], ["medicina", "artes-cultura"]] },
  { id: "direitos-humanos", area: "Ciências Humanas", nome: "Direitos Humanos e Cidadania",
    de: [["direito", "direitos-humanos"]] },

  { id: "atualidades", area: "Atualidades", nome: "Atualidades",
    de: [["direito", "atualidades-politica"], ["direito", "atualidades-geopolitica"],
         ["direito", "atualidades-meioambiente"], ["direito", "atualidades-tecnologia"],
         ["medicina", "atualidades"]] },
];

// ---------------------------------------------------------------------- utilidades

function lerFonte(trilha, arquivo) {
  const caminho = path.join(FONTES[trilha], arquivo + ".json");
  if (!fs.existsSync(caminho)) throw new Error("fonte não encontrada: " + path.relative(RAIZ, caminho));
  return JSON.parse(fs.readFileSync(caminho, "utf8"));
}

function novoId(trilha, id) {
  return PREFIXO[trilha] + "-" + id;
}

// --------------------------------------------------------------------------- fusão

function fundir() {
  const frentes = [];
  const problemas = [];
  const idsVistos = new Map();
  const textoIdsVistos = new Map();

  MAPA.forEach((frente) => {
    const questoes = [];
    const textos = [];

    frente.de.forEach(([trilha, arquivo]) => {
      const json = lerFonte(trilha, arquivo);

      if (json.subtopic !== arquivo) {
        problemas.push(trilha + "/" + arquivo + ': campo subtopic é "' + json.subtopic + '"');
      }

      (json.textos || []).forEach((t) => {
        const id = novoId(trilha, t.id);
        if (textoIdsVistos.has(id)) {
          problemas.push("textoId repetido \"" + id + "\": " + textoIdsVistos.get(id) + " e " + trilha + "/" + arquivo);
          return;
        }
        textoIdsVistos.set(id, trilha + "/" + arquivo);
        textos.push(Object.assign({}, t, { id: id }));
      });

      (json.questoes || []).forEach((q) => {
        const id = novoId(trilha, q.id);
        if (idsVistos.has(id)) {
          problemas.push("id repetido \"" + id + "\": " + idsVistos.get(id) + " e " + trilha + "/" + arquivo);
          return;
        }
        idsVistos.set(id, trilha + "/" + arquivo);

        // `origem` guarda o FATO (de onde a questão veio), não uma decisão sobre
        // quem pode usá-la. Quem vê o quê é decidido pelo build de cada trilha.
        // `frenteOrigem` só é gravado quando a frente foi fundida, para não
        // perder a distinção que a trilha de origem fazia (Brasil x Geral,
        // as quatro Atualidades) -- é o palpite inicial de subtema da etapa 2.
        const migrada = Object.assign({}, q, { id: id, origem: trilha });
        if (arquivo !== frente.id) migrada.frenteOrigem = arquivo;
        if (q.textoId) migrada.textoId = novoId(trilha, q.textoId);
        questoes.push(migrada);
      });
    });

    // Todo textoId referenciado precisa existir dentro da própria frente.
    const idsDeTexto = new Set(textos.map((t) => t.id));
    questoes.forEach((q) => {
      if (q.textoId && !idsDeTexto.has(q.textoId)) {
        problemas.push(frente.id + "/" + q.id + ': textoId "' + q.textoId + '" sem texto correspondente');
      }
    });

    // Cluster de textoId precisa ser contíguo: o build empacota questões que
    // dividem um texto e quebra silenciosamente se elas estiverem espalhadas.
    const visto = new Set();
    let anterior = null;
    questoes.forEach((q) => {
      if (q.textoId !== anterior) {
        if (q.textoId && visto.has(q.textoId)) {
          problemas.push(frente.id + ': cluster de texto não contíguo em "' + q.textoId + '"');
        }
        if (q.textoId) visto.add(q.textoId);
        anterior = q.textoId;
      }
    });

    frentes.push({ frente: frente, questoes: questoes, textos: textos });
  });

  return { frentes: frentes, problemas: problemas };
}

// --------------------------------------------------------------------------- saída

function main() {
  const soConferir = process.argv.includes("--conferir");
  const { frentes, problemas } = fundir();

  if (problemas.length) {
    console.error("PROBLEMAS (" + problemas.length + "):");
    problemas.forEach((p) => console.error("  x " + p));
    process.exit(1);
  }

  const totalQuestoes = frentes.reduce((s, f) => s + f.questoes.length, 0);
  const totalTextos = frentes.reduce((s, f) => s + f.textos.length, 0);

  if (!soConferir) {
    fs.mkdirSync(SAIDA, { recursive: true });
    frentes.forEach(({ frente, questoes, textos }) => {
      const corpo = { frente: frente.id, area: frente.area, nome: frente.nome, questoes: questoes };
      if (textos.length) corpo.textos = textos;
      fs.writeFileSync(path.join(SAIDA, frente.id + ".json"), JSON.stringify(corpo, null, 1) + "\n", "utf8");
    });

    const origem = {};
    MAPA.forEach((f) => f.de.forEach(([trilha, arquivo]) => { origem[trilha + "/" + arquivo] = f.id; }));
    fs.writeFileSync(MANIFESTO, JSON.stringify({
      migrado: new Date().toISOString().slice(0, 10),
      totalQuestoes: totalQuestoes,
      totalTextos: totalTextos,
      origem: origem,
    }, null, 2) + "\n", "utf8");
  }

  console.log("Banco central" + (soConferir ? " (conferência, nada gravado)" : ""));
  console.log("─────────────");
  const porArea = {};
  frentes.forEach(({ frente, questoes }) => {
    porArea[frente.area] = (porArea[frente.area] || 0) + questoes.length;
    const fontes = frente.de.map((d) => d[0] + "/" + d[1]).join(" + ");
    console.log("  " + String(questoes.length).padStart(4) + "  " + frente.id.padEnd(22) + fontes);
  });
  console.log("  ────");
  Object.keys(porArea).sort().forEach((a) => console.log("  " + String(porArea[a]).padStart(4) + "  " + a));
  console.log("\n  " + totalQuestoes + " questões, " + totalTextos + " textos, " + frentes.length + " frentes");
}

module.exports = { MAPA };
if (require.main === module) main();
