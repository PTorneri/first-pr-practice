// Converte um rascunho de flashcards em data/flashcards/<frente>.json.
//
//   node banco-central/compor-flashcards.js <frente> <rascunho.js>
//   node banco-central/compor-flashcards.js --conferir     mede o que já existe
//
// POR QUE UM CONVERSOR, E NÃO EDITAR O JSON DIRETO
//
// O JSON é a FONTE (é ele que está versionado e é ele que build-trilhas.js lê).
// Mas escrevê-lo à mão é caro e frágil: cada card carrega um `id` mecânico
// (`flash-<subtema>-07`) que ninguém deveria digitar, e um id repetido não dá
// erro em lugar nenhum -- ele CORROMPE a repetição espaçada de quem estuda,
// porque `buildFlashcardPool` (app.js) indexa o estado por `c.id` num espaço
// global, não por subtema. Dois cards com o mesmo id viram um card só, e
// acertar um marca o outro como revisado sem ter sido visto.
//
// Então o rascunho tem só o conteúdo -- pares [frente, verso] por subtema --
// e este script gera os ids, valida e grava. O rascunho é descartável (mora
// no scratchpad, fora do repo); o JSON gerado é o que fica.
//
// O QUE ELE REPROVA
//
//   - subtema que não existe na frente informada (erro de digitação no id)
//   - subtema da frente que ficou de fora do rascunho
//   - frente ou verso vazio
//   - pergunta repetida dentro do mesmo subtema (card duplicado)
//   - menos de PISO cards num subtema
//
// Reprovar aqui é barato; reprovar depois de gravado é uma correção que já
// passou pelo build e pelo commit.

const fs = require("fs");
const path = require("path");

const SAIDA = path.join(__dirname, "data", "flashcards");
const { SUBTEMAS } = require("./classificar-subtemas.js");

// Piso combinado por subtema. Matemática, a primeira frente migrada, tem
// 63-79 por subtema porque cinco dos seus oito decks já existiam prontos em
// vestibular-economia e só foram transportados. As frentes seguintes são
// escritas do zero e miram este piso -- ficarem menores que Matemática é
// esperado, não defeito.
const PISO = 30;

function idsDaFrente(frente) {
  if (!SUBTEMAS[frente]) {
    console.error("frente desconhecida: " + frente);
    console.error("use uma de: " + Object.keys(SUBTEMAS).join(", "));
    process.exit(1);
  }
  return SUBTEMAS[frente].map((s) => s.id);
}

function compor(frente, rascunho) {
  const esperados = idsDaFrente(frente);
  const problemas = [];
  const porSubtema = {};

  Object.keys(rascunho).forEach((subtema) => {
    if (esperados.indexOf(subtema) === -1) {
      problemas.push("subtema não pertence à frente " + frente + ": " + subtema);
    }
  });
  esperados.forEach((subtema) => {
    if (!rascunho[subtema]) problemas.push("subtema ausente do rascunho: " + subtema);
  });

  esperados.forEach((subtema) => {
    const pares = rascunho[subtema];
    if (!pares || !pares.length) return;

    const perguntasVistas = new Set();
    porSubtema[subtema] = pares.map((par, i) => {
      const [frenteCard, verso] = par;
      const onde = subtema + "[" + (i + 1) + "]";
      if (!frenteCard || !String(frenteCard).trim()) problemas.push(onde + ": pergunta vazia");
      if (!verso || !String(verso).trim()) problemas.push(onde + ": resposta vazia");

      const chave = String(frenteCard).trim().toLowerCase();
      if (perguntasVistas.has(chave)) problemas.push(onde + ": pergunta repetida — " + frenteCard);
      perguntasVistas.add(chave);

      return {
        id: "flash-" + subtema + "-" + String(i + 1).padStart(2, "0"),
        frente: frenteCard,
        verso: verso,
      };
    });

    if (pares.length < PISO) {
      problemas.push(subtema + ": só " + pares.length + " cards, abaixo do piso de " + PISO);
    }
  });

  return { porSubtema, problemas };
}

function conferir() {
  const linhas = [];
  let totalSub = 0;
  let totalFeito = 0;
  let totalCards = 0;

  Object.keys(SUBTEMAS).forEach((frente) => {
    const ids = SUBTEMAS[frente].map((s) => s.id);
    const arq = path.join(SAIDA, frente + ".json");
    const mapa = fs.existsSync(arq) ? JSON.parse(fs.readFileSync(arq, "utf8")).porSubtema || {} : {};
    const feitos = ids.filter((id) => mapa[id] && mapa[id].length);
    const cards = feitos.reduce((s, id) => s + mapa[id].length, 0);
    totalSub += ids.length;
    totalFeito += feitos.length;
    totalCards += cards;
    linhas.push({ frente, total: ids.length, feitos: feitos.length, cards });
  });

  linhas.sort((a, b) => (a.total - a.feitos) - (b.total - b.feitos));
  console.log("frente".padEnd(22) + "feitos/total".padEnd(15) + "faltam".padEnd(9) + "cards");
  linhas.forEach((l) => console.log(
    l.frente.padEnd(22) + (l.feitos + "/" + l.total).padEnd(15) +
    String(l.total - l.feitos).padEnd(9) + l.cards));
  console.log("");
  console.log("TOTAL: " + totalFeito + "/" + totalSub + " subtemas, " + totalCards + " cards. " +
    "Faltam " + (totalSub - totalFeito) + ".");
}

function main() {
  if (process.argv.includes("--conferir")) return conferir();

  const frente = process.argv[2];
  const rascunhoPath = process.argv[3];
  if (!frente || !rascunhoPath) {
    console.error("uso: node banco-central/compor-flashcards.js <frente> <rascunho.js>");
    console.error("     node banco-central/compor-flashcards.js --conferir");
    process.exit(1);
  }

  const rascunho = require(path.resolve(rascunhoPath));
  const { porSubtema, problemas } = compor(frente, rascunho);

  if (problemas.length) {
    console.error("flashcards de " + frente + " NÃO gravados (" + problemas.length + "):");
    problemas.forEach((p) => console.error("  x " + p));
    process.exit(1);
  }

  fs.mkdirSync(SAIDA, { recursive: true });
  fs.writeFileSync(path.join(SAIDA, frente + ".json"), JSON.stringify({
    frente: frente,
    gerado: new Date().toISOString().slice(0, 10),
    porSubtema: porSubtema,
  }, null, 2) + "\n", "utf8");

  const total = Object.values(porSubtema).reduce((s, a) => s + a.length, 0);
  console.log("flashcards de " + frente + ": " + total + " cards em " +
    Object.keys(porSubtema).length + " subtemas.");
  Object.keys(porSubtema).forEach((s) => console.log("  " + s.padEnd(34) + porSubtema[s].length));
  console.log("\nAgora rode: node banco-central/build-trilhas.js");
}

module.exports = { PISO };
if (require.main === module) main();
