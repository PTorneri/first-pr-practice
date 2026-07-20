// Combina data/questions/*.json em data/bundle.js (window.QUESTION_BANKS)
// para o app funcionar sem servidor (evita fetch/CORS com file://).
const fs = require("fs");
const path = require("path");

const questionsDir = path.join(__dirname, "data", "questions");
const outFile = path.join(__dirname, "data", "bundle.js");

const banks = {};
const files = fs.readdirSync(questionsDir).filter((f) => f.endsWith(".json"));

let totalQuestions = 0;
files.forEach((file) => {
  const raw = fs.readFileSync(path.join(questionsDir, file), "utf8");
  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    console.error(`Erro ao ler JSON de ${file}:`, e.message);
    process.exit(1);
  }
  const subtopic = json.subtopic;
  const questoes = json.questoes || [];
  banks[subtopic] = questoes;
  totalQuestions += questoes.length;
  console.log(`${file}: ${questoes.length} questões (subtopic="${subtopic}")`);
});

const out = `// Gerado automaticamente por build-bundle.js a partir de data/questions/*.json\nwindow.QUESTION_BANKS = ${JSON.stringify(banks, null, 2)};\n`;
fs.writeFileSync(outFile, out, "utf8");
console.log(`\nOK: ${files.length} arquivos, ${totalQuestions} questões no total -> ${outFile}`);
