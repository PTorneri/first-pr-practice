// Pesos-base por frente, derivados de estudo-provas-fgv-insper.pdf (v2 — análise de matérias
// específicas), seção 9 "Prioridades combinadas". Usados como peso inicial do agendamento
// (ciclo 0, antes de qualquer simulado) e combinados multiplicativamente com o peso adaptativo
// por erro a partir do 1º simulado (ver app.js, computeCycleWeightsFromSimulado). Também usados
// para distribuir proporcionalmente as ~45 questões de cada simulado de domingo.
//
// 3   = prioridade máxima (subtemas presentes em praticamente todo ano objetivo analisado da FGV)
// 2   = prioridade média (presentes, mas com menos peso/frequência que os de prioridade máxima)
// 1.5 = prioridade estrutural assimétrica (decisiva numa banca, ausente ou secundária na outra)
// 0.5 = prioridade baixa (Ciências da Natureza: nunca cai na FGV; 10% do peso objetivo na Insper)
window.PRIORITY_WEIGHTS = {
  "interpretacao-texto": 3,     // Português: interpretação/sintaxe — máxima
  "gramatica": 3,                // Português: sintaxe/morfossintaxe — máxima
  "matematica-rlm": 3,           // geometria, porcentagem, progressões, probabilidade — máxima
  "geografia": 3,                // geografia econômica/urbana — o subtema mais estável de Humanas
  "ingles": 3,                   // 100% reading comprehension, maioria das questões é inferência
  "atualidades-geopolitica": 3,  // geopolítica/relações internacionais — máxima em Humanas
  "historia-brasil": 2,          // presente, mas com menos peso que geografia/geopolítica
  "historia-geral": 2,
  "atualidades-politica": 2,
  "atualidades-meioambiente": 2, // meio ambiente — prioridade média confirmada no estudo
  "atualidades-tecnologia": 2,
  "direitos-humanos": 1.5,
  "filosofia-sociologia": 1.5,   // ausente na FGV; ~27% do bloco de Humanas da Insper
  "artes-cultura": 1.5,          // discursiva fixa todo ano na FGV; sem equivalente na Insper
  "ciencias-natureza": 0.5       // nunca cai na FGV; só 10% do peso objetivo na Insper
};
