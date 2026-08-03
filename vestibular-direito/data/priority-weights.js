// Pesos-base por frente, agora SEPARADOS POR BANCA.
//
// Até 2026-07 havia um conjunto único de pesos, derivado de
// estudo-provas-fgv-insper.pdf e confirmado por
// estudo-formulacao-provas-objetivas-*.pdf. A separação veio da leitura direta
// dos cadernos (estudo-anatomia-provas-fgv-insper-2025-2026.md) cruzada com o
// Edital Unificado FGV 1º/2027, que tornaram insustentável um número só para
// duas provas que medem coisas diferentes:
//
//   - Inglês são 15 questões objetivas na FGV e NÃO EXISTE na Insper.
//   - Ciências da Natureza são 15 questões na Insper (Bio 5 + Quím 5 + Fís 5,
//     exatos nos dois cadernos lidos) e não caem em nenhuma fase da FGV.
//   - Matemática vale peso 1 no edital da FGV e é a única prova, junto com
//     Artes, em que apenas nota ZERO elimina — nas outras seis, nota bruta
//     abaixo de 3,0 elimina. Na Insper vale 20% da nota objetiva. Manter 3
//     para as duas era o pior dos dois mundos.
//   - Filosofia e Sociologia ocupam as quatro últimas questões do bloco de
//     Humanas da Insper nos dois cadernos, e não caem isoladas na FGV.
//   - Artes e Questões Contemporâneas é discursiva fixa todo ano na FGV e não
//     tem equivalente na Insper.
//
// Escala: 3 = máxima, 2.5 = alta, 2 = média, 1.5 = estrutural assimétrica,
// 0.5 = baixa, 0 = não cai naquela banca.
//
// Usados como peso inicial do agendamento (ciclo 0, antes de qualquer
// simulado) e combinados multiplicativamente com o peso adaptativo por erro a
// partir do 1º simulado (ver app.js, computeCycleWeightsFromSimulado).
// Também distribuem proporcionalmente as questões do simulado de domingo.
window.PRIORITY_WEIGHTS_POR_BANCA = {
  fgv: {
    "interpretacao-texto": 3,
    "gramatica": 3,
    "literatura": 3,              // 9 das 15 objetivas de Português em 2026.1
    "ingles": 3,                  // 15 questões, corte eliminatório em 3,0
    "geografia": 3,
    "atualidades-geopolitica": 3,
    "artes-cultura": 2.5,         // discursiva fixa; virou teoria política aplicada a obras
    "historia-brasil": 2,
    "historia-geral": 2,
    "atualidades-politica": 2,
    "atualidades-meioambiente": 2,
    "atualidades-tecnologia": 2,
    "matematica-rlm": 1.5,        // peso 1 no edital e só zero elimina
    "direitos-humanos": 1.5,
    "filosofia-sociologia": 0.5,  // não cai isolada
    "ciencias-natureza": 0        // não cai em nenhuma fase
  },
  insper: {
    "interpretacao-texto": 3,
    "gramatica": 3,
    "literatura": 3,              // soneto, conto e escola pelo traço em todo caderno
    "matematica-rlm": 3,          // 20% da nota objetiva
    "geografia": 3,               // 6 das 15 de Humanas
    "historia-brasil": 2.5,       // 5 das 15 de Humanas
    "historia-geral": 2.5,
    "filosofia-sociologia": 2.5,  // 4 das 15, sempre as últimas do bloco
    "atualidades-geopolitica": 2,
    "atualidades-politica": 2,
    "atualidades-meioambiente": 2,
    "atualidades-tecnologia": 2,
    "ciencias-natureza": 1.5,     // 15 questões, 10% do peso objetivo
    "direitos-humanos": 1.5,
    "artes-cultura": 0.5,         // sem equivalente
    "ingles": 0                   // não existe na prova
  }
};

// Banca-alvo: "fgv", "insper" ou "ambas".
//
// "ambas" toma o MAIOR peso entre as duas listas, e não a média, de propósito:
// a média zeraria pela metade justamente as frentes assimétricas — Inglês e
// Ciências da Natureza —, que são exatamente as que não se pode descobrir na
// prova que ficaram de fora. Quem presta as duas estuda o máximo comum.
window.BANCA_ALVO = window.BANCA_ALVO || "ambas";

window.PRIORITY_WEIGHTS = (function () {
  const porBanca = window.PRIORITY_WEIGHTS_POR_BANCA;
  if (window.BANCA_ALVO === "fgv" || window.BANCA_ALVO === "insper") {
    return porBanca[window.BANCA_ALVO];
  }
  const combinado = {};
  Object.keys(porBanca.fgv).forEach(function (id) {
    combinado[id] = Math.max(porBanca.fgv[id], porBanca.insper[id]);
  });
  return combinado;
})();
