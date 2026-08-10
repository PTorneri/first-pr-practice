// Pesos-base por frente da trilha de Economia, separados por banca.
//
// DE ONDE SAEM OS NÚMEROS
//
// Do edital, não de intuição. Desdobrando os pesos da FGV EESP até a nota
// final (1ª fase pesa 4, 2ª fase pesa 6):
//
//   Matemática ............ 40%   (10% objetiva + 30% discursiva)
//   Redação ............... 20%   -- não é frente: mora na aba Redação
//   Português ............. 15%   (5% objetiva + 10% discursiva)
//   Ciências da Natureza .. 15%   (Biologia, Química e Física, 5% cada)
//   Ciências Humanas ....... 5%
//   Inglês ................. 5%
//
// E no Insper, para o grupo 1 (Administração e Ciências Econômicas):
//
//   MPME = 0,25·Linguagens + 0,40·Matemática + 0,25·Humanas + 0,10·Natureza
//   MF   = 0,75·MPME + 0,25·Redação
//
// As duas bancas concordam em Matemática -- 40% nas duas --, o que é raro e
// simplifica o plano: não há conflito de prioridade entre as escolas.
//
// A ESCALA NÃO É A FATIA DA NOTA
//
// 3 = máxima, 2.5 = alta, 2 = média, 1.5 = baixa mas eliminatória, 0.5 = marginal,
// 0 = não cai naquela banca. É uma régua de PRIORIDADE de estudo, com teto, e
// não a porcentagem da nota: Humanas vale 5% na FGV e mesmo assim não pode ir a
// zero, porque o corte de 20% de acertos vale para cada uma das sete provas
// objetivas -- reprovar em Humanas elimina exatamente como reprovar em
// Matemática. Frente que pode eliminar não desce de 1.5, por menor que seja o
// peso dela na média.
//
// Usados como peso inicial do agendamento (ciclo 0, antes de qualquer simulado)
// e combinados multiplicativamente com o peso adaptativo por erro a partir do
// 1º simulado (ver app.js, computeCycleWeightsFromSimulado). Também distribuem
// proporcionalmente as questões do simulado de domingo.

// POR QUE MATEMÁTICA APARECE CINCO VEZES
//
// A alocação do simulado é proporcional POR FRENTE, e com Matemática numa
// frente só disputando com 8 frentes de Humanas e Atualidades, o simulado de 60
// dava 5 questões de Matemática -- 8%, contra 25% do caderno real. Peso não
// resolvia: com peso 6, quebrando a escala, ia só a 8 de 60. O que resolve é
// dividir a frente, e é o que o bundle faz.
//
// As cinco entram com o mesmo peso de propósito. A objetiva e a discursiva
// cobram ênfases diferentes -- na objetiva de 2026.1 geometria foi o maior
// bloco, e na discursiva o miolo são sequências e recorrências --, então
// privilegiar uma delas seria escolher uma das duas provas para ir bem.

window.PRIORITY_WEIGHTS_POR_BANCA = {
  fgv: {
    "matematica-sequencias": 3,       // 40% da nota final, e a discursiva pesa 3x a objetiva
    "matematica-probabilidade": 3,
    "matematica-algebra": 3,
    "matematica-geometria": 3,        // maior bloco da objetiva de 2026.1
    "matematica-financeira": 3,
    "interpretacao-texto": 2.5,       // Português = 15%, e 10 deles são a discursiva
    "gramatica": 2.5,                 // vale duas vezes: na objetiva e como quesito DENTRO da discursiva
    "literatura": 2.5,                // 9 das 15 objetivas de Português de 2026.1 saíram de dois romances
    "biologia": 2,                    // 15 questões no dia 2, 5% da nota, corte de 20% de acertos
    "quimica": 2,                     // idem -- e é a mais jornalística das três
    "fisica": 2,                      // idem
    "ingles": 1.5,                    // 5% e o último dos doze critérios de desempate, mas o corte de 20% também vale aqui
    "historia": 1,                    // Humanas inteira vale 5% na EESP
    "geografia": 1,
    "atualidades-politica": 1,        // dentro de Humanas, a mais próxima do curso
    "atualidades-geopolitica": 1,
    "atualidades-meioambiente": 0.5,
    "atualidades-tecnologia": 0.5,
    "filosofia-sociologia": 0.5,      // não cai isolada na FGV
    "direitos-humanos": 0.5
  },
  insper: {
    "matematica-sequencias": 3,       // 40% do peso objetivo
    "matematica-probabilidade": 3,
    "matematica-algebra": 3,
    "matematica-geometria": 3,
    "matematica-financeira": 3,
    "interpretacao-texto": 2.5,       // Linguagens = 25%, 15 questões
    "gramatica": 2.5,
    "literatura": 2.5,                // soneto, conto e escola pelo traço em todo caderno
    "geografia": 2.5,                 // 6 das 15 de Humanas nos dois cadernos lidos
    "historia": 2.5,                  // 5 das 15
    "filosofia-sociologia": 2.5,      // 4 das 15, sempre as últimas do bloco
    "atualidades-politica": 2,        // Humanas = 25%, e a banca fecha o caderno com fonte de até um mês antes
    "atualidades-geopolitica": 2,
    "atualidades-meioambiente": 2,
    "atualidades-tecnologia": 2,
    "biologia": 1.5,                  // Natureza = 10%, 5 questões de cada; corte de 20 pontos, o mais baixo da tabela
    "quimica": 1.5,
    "fisica": 1.5,
    "direitos-humanos": 1.5,
    "ingles": 0                       // não existe na prova
  }
};

// Banca-alvo: "fgv", "insper" ou "ambas".
//
// "ambas" toma o MAIOR peso entre as duas listas, e não a média, pela mesma
// razão da trilha de Direito: a média zeraria pela metade justamente as frentes
// assimétricas -- aqui, Inglês, que são 15 questões na FGV e não existe no
// Insper. Quem presta as duas estuda o máximo comum.
//
// O efeito colateral que vale conhecer: Humanas sobe de 1 (FGV) para 2.5, porque
// no Insper ela vale 25% da nota objetiva contra 5% na EESP. Não é erro da
// regra -- é o preço honesto de preparar as duas provas com um plano só.
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
