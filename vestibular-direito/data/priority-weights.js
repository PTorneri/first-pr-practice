// Pesos-base por frente, derivados originalmente de estudo-provas-fgv-insper.pdf (v2 — análise
// de matérias específicas), seção 9 "Prioridades combinadas". Revisados em 2026-07 à luz de
// estudo-formulacao-provas-objetivas-fgv-vunesp-enem-fuvest-2016-2025.pdf (60 células
// matéria×banca, método de formulação + frequência de temas para FGV Direito, Vunesp, ENEM e
// Fuvest) — o novo estudo CONFIRMA de forma independente a estrutura de pesos já adotada (nenhuma
// evidência concreta encontrada para mudar um valor numérico), mas afina o racional de cada peso
// (ver comentários por frente abaixo) e reforça com mais precisão o caso de Ciências da Natureza
// (ausência confirmada por edital, não apenas "baixa frequência"). Usados como peso inicial do
// agendamento (ciclo 0, antes de qualquer simulado) e combinados multiplicativamente com o peso
// adaptativo por erro a partir do 1º simulado (ver app.js, computeCycleWeightsFromSimulado).
// Também usados para distribuir proporcionalmente as ~45 questões de cada simulado de domingo.
//
// 3   = prioridade máxima (subtemas presentes em praticamente todo ano objetivo analisado da FGV)
// 2   = prioridade média (presentes, mas com menos peso/frequência que os de prioridade máxima)
// 1.5 = prioridade estrutural assimétrica (decisiva numa banca, ausente ou secundária na outra)
// 0.5 = prioridade baixa (Ciências da Natureza: confirmado ausente do vestibular objetivo da FGV
//       Direito SP/RJ em nenhuma fase; ~10% do peso objetivo na Insper)
window.PRIORITY_WEIGHTS = {
  "interpretacao-texto": 3,     // Português: interpretação/sintaxe — máxima
  "gramatica": 3,                // Português: sintaxe/morfossintaxe — máxima
  "matematica-rlm": 3,           // geometria, porcentagem, progressões, probabilidade — máxima
  "geografia": 3,                // geopolítica internacional é "o foco" declarado oficialmente da banca em Geografia
  "ingles": 3,                   // 100% reading comprehension, maioria das questões é inferência
  "atualidades-geopolitica": 3,  // geopolítica/relações internacionais — máxima em Humanas
  "historia-brasil": 2,          // presente, mas com menos peso que geografia/geopolítica
  "historia-geral": 2,
  "atualidades-politica": 2,
  "atualidades-meioambiente": 2, // meio ambiente — prioridade média mantida por cautela; o novo estudo NÃO confirma repertório oficial de meio ambiente especificamente na FGV (é a mais fraca das 4 frentes de atualidades em evidência direta)
  "atualidades-tecnologia": 2,
  "direitos-humanos": 1.5,
  "filosofia-sociologia": 1.5,   // ausente na FGV; ~27% do bloco de Humanas da Insper
  "artes-cultura": 1.5,          // discursiva fixa todo ano na FGV; sem equivalente na Insper
  "ciencias-natureza": 0.5       // nunca cai na FGV; só 10% do peso objetivo na Insper
};
