// Combina data/dissertativas/*.json em data/dissertativas-matematica.js
// (window.DISSERTATIVAS_EXATAS), no mesmo arranjo que vestibular-direito usa
// para o banco de objetivas: fonte em JSON por tema, saída em um .js só, para o
// app funcionar sem servidor (file:// não faz fetch).
//
//   node vestibular-economia/build-dissertativas.js
//
// Rode verificar-dissertativas.js ANTES: este script não valida nada, só junta.

const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "data", "dissertativas");
const saida = path.join(__dirname, "data", "dissertativas-matematica.js");

const arquivos = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
const todas = [];

arquivos.forEach((arquivo) => {
  const dados = JSON.parse(fs.readFileSync(path.join(dir, arquivo), "utf8"));
  const questoes = dados.questoes || [];
  // `tema` da questão é o assunto dela ("Progressão aritmética"); `grupo` é o
  // bloco a que ela pertence ("Sequências e recorrências"). São coisas
  // diferentes e o app precisa das duas: o assunto rotula a questão na tela, o
  // grupo é o que a distribuição do banco conta e o que o filtro agrupa.
  questoes.forEach((q) => todas.push(Object.assign({ grupo: dados.tema }, q)));
  console.log(String(questoes.length).padStart(3) + "  " + arquivo + "  (" + (dados.tema || "?") + ")");
});

const cabecalho = [
  "// GERADO por build-dissertativas.js — não edite à mão.",
  "// A fonte é data/dissertativas/*.json; o formato está documentado em",
  "// data/dissertativas/README.md.",
  "",
].join("\n");

fs.writeFileSync(saida, cabecalho + "window.DISSERTATIVAS_EXATAS = " + JSON.stringify(todas, null, 1) + ";\n", "utf8");
console.log("───");
console.log(todas.length + " questões -> " + path.relative(process.cwd(), saida));
