// Quanto cada frente vale na prova de cada banca, para as três trilhas.
//
// Consolida os três data/priority-weights.js que existiam por trilha. Eles
// precisavam ser reescritos de qualquer modo: quatro frentes de Direito
// (matematica-rlm, historia-brasil, historia-geral, ciencias-natureza) e cinco
// de Economia (as matemáticas) deixaram de existir com a fusão do banco central.
//
// A ESCALA é a mesma de sempre: 3 = decide a nota, 0 = não cai nesta prova.
// Os números vieram do estudo dos cadernos oficiais e não foram recalculados
// aqui — o que mudou foi só a chave em que cada um está guardado.
//
// COMO A FUSÃO DE FRENTES FOI RESOLVIDA
//
// Quando duas frentes viraram uma, o peso da frente nova é o MAIOR das antigas,
// pela mesma razão que "ambas as bancas" toma o maior e não a média: a média
// zera pela metade justamente a frente assimétrica, que é a que não se pode
// descobrir na prova que ficou de fora.
//
// Mas o detalhe não se perde: as quatro Atualidades de Direito valiam 3, 2, 2 e
// 2, e viraram quatro SUBTEMAS com exatamente esses pesos, sob uma frente que
// vale 3. A granularidade que a fusão tirou da frente, o subtema devolve — e é
// o subtema que o plano diário sorteia.

// Peso por FRENTE. Todo subtema herda o peso da sua frente, salvo override.
const POR_BANCA = {
  direito: {
    fgv: {
      "interpretacao-texto": 3, "gramatica": 3, "literatura": 3, "ingles": 3,
      "geografia": 3, "atualidades": 3, "artes-cultura": 2.5, "historia": 2,
      "matematica": 1.5, "direitos-humanos": 1.5, "filosofia-sociologia": 0.5,
      // A FGV Direito não cobra Ciências da Natureza. Peso 0 mantém as três
      // frentes disponíveis na busca e no caderno de erros sem gastar dia de
      // estudo com elas.
      "biologia": 0, "quimica": 0, "fisica": 0,
    },
    insper: {
      "interpretacao-texto": 3, "gramatica": 3, "literatura": 3, "matematica": 3,
      "geografia": 3, "historia": 2.5, "filosofia-sociologia": 2.5, "atualidades": 2,
      "direitos-humanos": 1.5, "artes-cultura": 0.5, "ingles": 0,
      // O Insper cobra ~10% de Natureza. Antes isso era uma frente só, de
      // "noções gerais"; agora são as três, com o banco fundo de Medicina.
      "biologia": 1.5, "quimica": 1.5, "fisica": 1.5,
    },
  },

  medicina: {
    fuvest: { "biologia": 3, "quimica": 3, "fisica": 3, "geografia": 3, "interpretacao-texto": 3,
      "literatura": 3, "gramatica": 2.5, "historia": 2, "artes-cultura": 2, "atualidades": 2,
      "filosofia-sociologia": 1.5, "ingles": 1.5, "matematica": 1 },
    unicamp: { "biologia": 3, "quimica": 3, "matematica": 3, "interpretacao-texto": 3,
      "literatura": 3, "gramatica": 2.5, "atualidades": 2.5, "geografia": 2, "historia": 2,
      "filosofia-sociologia": 2, "ingles": 2, "artes-cultura": 1.5, "fisica": 1.5 },
    unesp: { "interpretacao-texto": 3, "literatura": 3, "historia": 3, "geografia": 3,
      "filosofia-sociologia": 3, "gramatica": 2.5, "ingles": 2.5, "artes-cultura": 2,
      "atualidades": 2, "biologia": 2, "quimica": 2, "fisica": 2, "matematica": 1.5 },
    unifesp: { "interpretacao-texto": 3, "gramatica": 3, "ingles": 3, "biologia": 3,
      "quimica": 2.5, "fisica": 2.5, "literatura": 2, "matematica": 2, "historia": 2,
      "geografia": 2, "atualidades": 1.5, "filosofia-sociologia": 1.5, "artes-cultura": 1 },
    einstein: { "matematica": 3, "interpretacao-texto": 3, "ingles": 3, "biologia": 2.5,
      "quimica": 2.5, "fisica": 2.5, "gramatica": 2, "historia": 2, "geografia": 2,
      "literatura": 2, "atualidades": 2, "filosofia-sociologia": 0.5, "artes-cultura": 0.5 },
    santacasa: { "biologia": 3, "quimica": 2.5, "fisica": 2.5, "interpretacao-texto": 2.5,
      "literatura": 2.5, "gramatica": 2, "matematica": 2, "ingles": 2, "historia": 2,
      "geografia": 2, "atualidades": 1.5, "filosofia-sociologia": 0.5, "artes-cultura": 0.5 },
    pucsp: { "interpretacao-texto": 3, "literatura": 3, "gramatica": 2.5, "ingles": 2.5,
      "biologia": 2.5, "quimica": 2.5, "fisica": 2.5, "atualidades": 2, "historia": 1.5,
      "geografia": 1.5, "filosofia-sociologia": 1.5, "artes-cultura": 1, "matematica": 0.5 },
  },

  economia: {
    fgv: {
      "matematica": 3, "interpretacao-texto": 2.5, "gramatica": 2.5, "literatura": 2.5,
      "biologia": 2, "quimica": 2, "fisica": 2, "ingles": 1.5, "historia": 1, "geografia": 1,
      "atualidades": 1, "filosofia-sociologia": 0.5, "direitos-humanos": 0.5, "artes-cultura": 0.5,
    },
    insper: {
      "matematica": 3, "interpretacao-texto": 2.5, "gramatica": 2.5, "literatura": 2.5,
      "geografia": 2.5, "historia": 2.5, "filosofia-sociologia": 2.5, "atualidades": 2,
      "biologia": 1.5, "quimica": 1.5, "fisica": 1.5, "direitos-humanos": 1.5,
      "artes-cultura": 0.5, "ingles": 0,
    },
  },

  // Peso vem direto do resumo oficial do ITA 2024: Física, Matemática, Química,
  // Português e Inglês saem 12 de 60 cada, 20% exatos, sem matéria dominante.
  // O português do ITA vem repartido em três frentes no banco central
  // (gramática, interpretação, literatura); cada uma pesa menos que um quinto
  // sozinha, por isso 2 em vez do 3 das frentes inteiras.
  engenharia: {
    ita: {
      matematica: 3, fisica: 3, quimica: 3, ingles: 3,
      gramatica: 2, "interpretacao-texto": 2, literatura: 2,
    },
  },
};

// Peso da FRENTE quando ele deve diferir do peso usado no estudo diário.
//
// A tabela final guarda frente e subtema como chaves separadas, e cada uma
// responde a uma pergunta diferente: o peso do SUBTEMA ordena o que estudar no
// dia; o peso da FRENTE diz que fatia do caderno aquela matéria ocupa no
// simulado. Normalmente os dois coincidem e nada precisa ser dito aqui.
//
// Economia é a exceção, e é uma exceção herdada. Matemática vale 40% da nota na
// FGV EESP e 25% do caderno do Insper. Até 2026-08 a trilha obtinha isso
// fingindo que Matemática eram CINCO frentes, o que dava a ela cinco assentos
// na alocação proporcional do simulado (17 de 60 questões). Com o banco central
// a farsa não é mais necessária nem possível — Matemática é uma frente com
// cinco subtemas —, mas o peso que ela produzia era real e precisa continuar
// existindo, agora dito em voz alta.
const PESO_DE_FRENTE = {
  economia: { fgv: { "matematica": 10 }, insper: { "matematica": 10 } },
};

// Peso por SUBTEMA, só onde ele difere do peso da frente.
//
// É a única novidade editorial desta migração, e existe porque a granularidade
// nova permite dizer o que a frente inteira não dizia.
const OVERRIDES = {
  direito: {
    // As quatro frentes de Atualidades de Direito, com os pesos que tinham
    // antes de virarem subtemas de uma frente só.
    fgv: {
      "atualidades-geopolitica": 3, "atualidades-politica-economia": 2,
      "atualidades-meioambiente": 2, "atualidades-tecnologia": 2,
      // Não existiam em Direito; entram no meio da faixa das outras quatro.
      "atualidades-saude": 1, "atualidades-sociedade-educacao": 2,
    },
    insper: {
      "atualidades-saude": 1, "atualidades-sociedade-educacao": 2,
    },
  },
  medicina: {
    // Saúde é o contexto favorito das sete bancas — a Unicamp abriu a prova de
    // 2026 com uma fonte de 17 dias antes sobre sistema de saúde.
    fuvest: { "atualidades-saude": 3 },
    unicamp: { "atualidades-saude": 3 },
    unesp: { "atualidades-saude": 3 },
    unifesp: { "atualidades-saude": 2.5 },
    einstein: { "atualidades-saude": 3 },
    santacasa: { "atualidades-saude": 2.5 },
    pucsp: { "atualidades-saude": 3 },
  },
  economia: {
    fgv: {
      // Estatística, porcentagem e proporção é a frente mais próxima do curso:
      // taxa, índice e correção aparecem aqui e de novo em Atualidades.
      "matematica-financeira": 3, "matematica-algebra": 3,
      "atualidades-politica-economia": 2, "atualidades-geopolitica": 1,
      "atualidades-meioambiente": 0.5, "atualidades-tecnologia": 0.5,
      "atualidades-saude": 0.5, "atualidades-sociedade-educacao": 1,
    },
    insper: {
      "atualidades-politica-economia": 2.5,
    },
  },
};

// Quais bancas o plano assume quando o aluno não escolhe. Combinar TODAS não é
// alvo real (ninguém presta as sete de Medicina) e achata a ponderação.
const BANCA_ALVO = {
  direito: ["fgv", "insper"],
  medicina: ["fuvest", "unicamp"],
  economia: ["fgv", "insper"],
  engenharia: ["ita"],
};

module.exports = { POR_BANCA, PESO_DE_FRENTE, OVERRIDES, BANCA_ALVO };
