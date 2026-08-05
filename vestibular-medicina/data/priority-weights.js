// Pesos-base por frente, separados pelas SETE bancas de Medicina em São Paulo.
//
// Derivados de estudo-anatomia-provas-medicina-sp-2025-2026.md, que leu 25
// cadernos oficiais e os cruzou com editais, resoluções e manuais do candidato.
// Cada número tem uma justificativa no comentário ao lado — se um deles mudar,
// o motivo tem que mudar junto.
//
// Escala idêntica à da trilha de Direito: 3 = máxima, 2.5 = alta, 2 = média,
// 1.5 = estrutural assimétrica, 0.5 = baixa, 0 = não cai naquela banca.
//
// Os cinco fatos que mais deslocam peso, e que contrariam a intuição de quem
// prepara medicina:
//
//   1. A 2ª fase da USP para Medicina é B-F-G-Q (Anexo III da Resolução CoG
//      8832): Biologia, Física, GEOGRAFIA e Química, 3 questões de cada.
//      Matemática NÃO cai. Geografia vale o mesmo que Biologia.
//   2. A 2ª fase da Unicamp para Medicina não tem Física: são Humanas 2,
//      Matemática 4, Biologia 7 e Química 5.
//   3. Na Unesp, Biologia rende 2 ou 3 questões nas 36 discursivas, enquanto
//      Filosofia sozinha rendeu 4 em 2026.1. Na 1ª fase, Matemática é 8 de 90.
//   4. No Einstein, Matemática (10) empata com Português como maior bloco
//      objetivo, e existe uma discursiva de Inglês.
//   5. Na PUC-SP, a Redação vale 20% da nota final do Grupo 3 e Matemática
//      vale 5%.
window.PRIORITY_WEIGHTS_POR_BANCA = {
  fuvest: {
    "biologia": 3,               // ~15 das 90 objetivas + 3 na 2ª fase
    "quimica": 3,                // 3 na 2ª fase (B-F-G-Q)
    "fisica": 3,                 // 3 na 2ª fase (B-F-G-Q)
    "geografia": 3,              // 3 na 2ª fase — vale o mesmo que Biologia
    "interpretacao-texto": 3,    // o dia 1 da 2ª fase é 1/3 da nota final
    "literatura": 3,             // 10 discursivas sobre a lista obrigatória
    "gramatica": 2.5,
    "historia": 2,               // ~10 objetivas, fora da 2ª fase de Medicina
    "artes": 2,                  // ~7 objetivas
    "atualidades": 2,            // fontes de até 6 meses antes da prova
    "filosofia-sociologia": 1.5,
    "ingles": 1.5,               // ~4 objetivas, ausente na 2ª fase
    "matematica": 1              // ~8 objetivas e NÃO cai na 2ª fase
  },

  unicamp: {
    "biologia": 3,               // 7 das 18 da 2ª fase de Biológicas/Saúde
    "quimica": 3,                // 5 das 18 da 2ª fase
    "matematica": 3,             // 12 das 72 na 1ª fase + 4 na 2ª
    "interpretacao-texto": 3,    // 12 das 72 + 6 discursivas no dia 1
    "literatura": 3,
    "gramatica": 2.5,
    "atualidades": 2.5,          // janela de 17 dias entre fonte e prova
    "geografia": 2,              // 7 das 72
    "historia": 2,               // 7 das 72
    "filosofia-sociologia": 2,   // 6 das 72
    "ingles": 2,                 // interdisciplinar na 2ª fase, respondido em português
    "artes": 1.5,
    "fisica": 1.5                // 7 na 1ª fase e ZERO na 2ª fase de Medicina
  },

  unesp: {
    "interpretacao-texto": 3,    // 20 das 30 de Linguagens + 8 discursivas
    "literatura": 3,
    "historia": 3,               // parte das 12 discursivas de Humanas
    "geografia": 3,
    "filosofia-sociologia": 3,   // 4 discursivas em 2026.1 — o dobro de Biologia
    "gramatica": 2.5,
    "ingles": 2.5,               // 10 na 1ª fase + 4 discursivas
    "artes": 2,
    "atualidades": 2,
    "biologia": 2,               // 2 ou 3 das 36 discursivas
    "quimica": 2,
    "fisica": 2,
    "matematica": 1.5            // 8 de 90 na 1ª fase, 3 de 36 na 2ª
  },

  unifesp: {
    "interpretacao-texto": 3,    // a Prova I é Português, Inglês e Redação
    "gramatica": 3,              // o recorte gramatical mais técnico do conjunto
    "ingles": 3,                 // 10 das 25 objetivas
    "biologia": 3,               // núcleo da Prova II discursiva
    "quimica": 2.5,
    "fisica": 2.5,
    "literatura": 2,
    "matematica": 2,             // entra pelo ENEM, não pela prova própria
    "historia": 2,               // idem
    "geografia": 2,              // idem
    "atualidades": 1.5,
    "filosofia-sociologia": 1.5,
    "artes": 1
  },

  einstein: {
    "matematica": 3,             // 10 objetivas + 1 discursiva
    "interpretacao-texto": 3,    // 10 objetivas
    "ingles": 3,                 // 5 objetivas + 1 DISCURSIVA
    "biologia": 2.5,             // 5 objetivas + 1 discursiva
    "quimica": 2.5,
    "fisica": 2.5,
    "gramatica": 2,
    "historia": 2,               // 5 objetivas
    "geografia": 2,              // 5 objetivas
    "literatura": 2,
    "atualidades": 2,
    "filosofia-sociologia": 0.5, // não cai isolada
    "artes": 0.5
  },

  santacasa: {
    "biologia": 3,               // 10 objetivas + 8 discursivas + 1º desempate
    "quimica": 2.5,              // 10 objetivas + 4 discursivas
    "fisica": 2.5,               // 10 objetivas + 4 discursivas
    "interpretacao-texto": 2.5,  // 10 objetivas + 4 discursivas
    "literatura": 2.5,
    "gramatica": 2,
    "matematica": 2,             // 10 objetivas, sem discursiva
    "ingles": 2,                 // 10 objetivas
    "historia": 2,
    "geografia": 2,
    "atualidades": 1.5,
    "filosofia-sociologia": 0.5, // não cai isolada
    "artes": 0.5
  },

  pucsp: {
    "interpretacao-texto": 3,    // Linguagens é peso 1 e 15 questões
    "literatura": 3,
    "gramatica": 2.5,
    "ingles": 2.5,               // língua estrangeira entra em Linguagens
    "biologia": 2.5,             // Natureza é peso 1 e 15 questões
    "quimica": 2.5,
    "fisica": 2.5,
    "atualidades": 2,            // matriz ENEM, tema de atualidade na redação
    "historia": 1.5,             // Humanas é peso 0,5
    "geografia": 1.5,
    "filosofia-sociologia": 1.5,
    "artes": 1,
    "matematica": 0.5            // 5 questões com peso 0,5 = 5% da nota final
  }
};

// Banca-alvo: um id acima, um ARRAY de ids, ou "todas".
//
// A regra de combinação é o MAIOR peso entre as bancas escolhidas, nunca a
// média — e o motivo é o mesmo da trilha de Direito. Quem presta FUVEST e
// Unicamp precisa de Física em 3 (a 2ª fase da FUVEST cobra) E de Matemática
// em 3 (a 2ª fase da Unicamp cobra), embora cada banca despreze uma das duas.
// A média entregaria 2.25 nas duas e o candidato chegaria mal preparado em
// ambas, sem nunca descobrir por quê.
//
// MAS: com as SETE bancas selecionadas, o máximo satura. Onze das treze
// frentes chegam a 3 e o plano de 90 dias fica praticamente uniforme — a
// ponderação deixa de ponderar. Isso não é defeito da regra: é sinal de que
// "todas" não é um alvo real. Ninguém presta as sete.
//
// Por isso o padrão são duas bancas, não sete. FUVEST e Unicamp são as de
// maior demanda, são gratuitas e são as mais assimétricas entre si — cobrir as
// duas já obriga o plano a manter as seis disciplinas de pé.
window.BANCA_ALVO = window.BANCA_ALVO || ["fuvest", "unicamp"];

window.PRIORITY_WEIGHTS = (function () {
  const porBanca = window.PRIORITY_WEIGHTS_POR_BANCA;
  const alvo = window.BANCA_ALVO;

  // Uma banca só: usa a tabela dela, sem combinar.
  if (typeof alvo === "string" && porBanca[alvo]) return porBanca[alvo];

  const ids = Array.isArray(alvo)
    ? alvo.filter(function (b) { return porBanca[b]; })
    : Object.keys(porBanca); // "todas" ou valor irreconhecível

  const selecionadas = ids.length ? ids : Object.keys(porBanca);

  const combinado = {};
  Object.keys(porBanca.fuvest).forEach(function (frente) {
    combinado[frente] = selecionadas.reduce(function (maior, banca) {
      return Math.max(maior, porBanca[banca][frente] || 0);
    }, 0);
  });
  return combinado;
})();
