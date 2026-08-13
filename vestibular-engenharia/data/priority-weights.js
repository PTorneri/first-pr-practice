// GERADO por banco-central/build-trilhas.js -- nao edite a mao.
// Pesos de prioridade da trilha de Engenharia.
// A fonte e banco-central/data/questions/*.json (as questoes) e
// banco-central/data/subtemas/*.json (o subtema de cada uma).
//
// Corrigiu uma questao? Corrija no banco central e rode o build de novo.
// `--verificar` reprova quando o banco central mudou e este arquivo nao.
// A fonte editorial destes números é banco-central/pesos.js.
// Cada tabela traz FRENTE e SUBTEMA: o plano diário indexa por subtema,
// os simulados por frente.

window.PRIORITY_WEIGHTS_POR_BANCA = {
 "ita": {
  "matematica": 3,
  "fisica": 3,
  "quimica": 3,
  "ingles": 3,
  "gramatica": 2,
  "interpretacao-texto": 2,
  "literatura": 2,
  "matematica-geometria": 3,
  "matematica-financeira": 3,
  "matematica-algebra": 3,
  "matematica-probabilidade": 3,
  "matematica-sequencias": 3,
  "matematica-logica-conjuntos": 3,
  "matematica-complexos": 3,
  "matematica-polinomios": 3,
  "fisica-termologia": 3,
  "fisica-mecanica": 3,
  "fisica-ondas-optica": 3,
  "fisica-eletromagnetismo": 3,
  "fisica-hidrostatica": 3,
  "fisica-energia-trabalho": 3,
  "fisica-moderna": 3,
  "quimica-eletroquimica": 3,
  "quimica-atomistica-ligacoes": 3,
  "quimica-equilibrio-acido-base": 3,
  "quimica-estequiometria": 3,
  "quimica-organica": 3,
  "quimica-solucoes": 3,
  "quimica-termoquimica-cinetica": 3,
  "gramatica-coesao-semantica": 2,
  "gramatica-regencia-crase": 2,
  "gramatica-concordancia": 2,
  "gramatica-morfologia": 2,
  "gramatica-pontuacao": 2,
  "gramatica-sintaxe-periodo": 2,
  "interpretacao-argumentacao": 2,
  "interpretacao-inferencia": 2,
  "interpretacao-genero-discurso": 2,
  "interpretacao-recursos-linguagem": 2,
  "interpretacao-estrutura-coesao": 2,
  "interpretacao-ideia-central": 2,
  "literatura-realismo-naturalismo": 2,
  "literatura-colonial-romantismo": 2,
  "literatura-modernismo": 2,
  "literatura-teoria-analise": 2,
  "literatura-contemporanea": 2,
  "ingles-inference": 3,
  "ingles-grammar-structure": 3,
  "ingles-main-idea": 3,
  "ingles-detail": 3,
  "ingles-vocabulary": 3
 }
};

window.BANCA_ALVO = window.BANCA_ALVO || ["ita"];

window.PRIORITY_WEIGHTS = (function () {
  var porBanca = window.PRIORITY_WEIGHTS_POR_BANCA;
  var alvo = window.BANCA_ALVO;

  // Uma banca só: usa a tabela dela, sem combinar.
  if (typeof alvo === "string" && porBanca[alvo]) return porBanca[alvo];

  var ids = Array.isArray(alvo)
    ? alvo.filter(function (b) { return porBanca[b]; })
    : Object.keys(porBanca);
  var selecionadas = ids.length ? ids : Object.keys(porBanca);

  // MAIOR peso entre as bancas alvo, nunca a média: a média zeraria pela
  // metade justamente as frentes assimétricas, que são as que não se pode
  // descobrir na prova que ficaram de fora.
  var combinado = {};
  var primeira = porBanca[selecionadas[0]];
  Object.keys(primeira).forEach(function (id) {
    combinado[id] = selecionadas.reduce(function (maior, banca) {
      return Math.max(maior, porBanca[banca][id] || 0);
    }, 0);
  });
  return combinado;
})();
