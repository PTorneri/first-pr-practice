// GERADO por build-dissertativas.js — não edite à mão.
// A fonte é data/dissertativas/*.json; o formato está documentado em
// data/dissertativas/README.md.
window.DISSERTATIVAS_EXATAS = [
 {
  "grupo": "Referência — FGV EESP 2026.1 (questões reais)",
  "id": "mat-disc-fgv-2026-01",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Progressão aritmética em série temporal",
  "origem": "FGV EESP 2026.1 · Matemática Discursiva, questão 1",
  "tempoSugerido": 8,
  "enunciado": "Em janeiro de 1984, um observatório registrou níveis de dióxido de carbono (CO₂) de 344 ppm (partes por milhão). A partir daí, a leitura média de CO₂ aumentou cerca de 1,5 ppm a cada ano.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é o nível esperado de CO₂, em ppm, para janeiro de 2026?",
    "respostaFinal": {
     "rotulo": "nível de CO₂, em ppm",
     "aceitas": [
      "407",
      "407 ppm",
      "407ppm"
     ]
    },
    "conferencia": "344 + 42*1.5",
    "resolucao": "De janeiro de 1984 a janeiro de 2026 temos 42 anos.\nAssim, nesse período, o aumento foi de 42 × 1,5 = 63 ppm.\nLogo, em janeiro de 2026 o nível esperado de CO₂ é de 344 + 63 = 407 ppm.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Fez alguns cálculos coerentes, sem continuidade (por exemplo, 344×43 ou 2025×15), ou errou grosseiramente o número de anos entre 1984 e 2026, ou calculou 1,5×42 e apresentou 63 como resposta, ou apresentou somente a resposta correta, sem cálculo algum ou indicação de raciocínio."
     },
     {
      "pct": 50,
      "desc": "Raciocinou corretamente, porém errou o cálculo do número de anos entre 1984 e 2026, com boa aproximação (41 ou 43), ou acertou a resposta pelo método de tentativa e erro."
     },
     {
      "pct": 75,
      "desc": "Raciocinou corretamente, acertou o número de anos, adicionou ao valor inicial (344), porém cometeu erro de conta (42×1,5 = 630, por exemplo)."
     },
     {
      "pct": 100,
      "desc": "Raciocinou corretamente, acertou o número de anos, adicionou ao valor inicial 344 e deu a resposta correta: 407."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Referência — FGV EESP 2026.1 (questões reais)",
  "id": "mat-disc-fgv-2026-02",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Média aritmética com remoção de subconjunto",
  "origem": "FGV EESP 2026.1 · Matemática Discursiva, questão 2",
  "tempoSugerido": 12,
  "enunciado": "Em um conjunto de 30 números, alguns são iguais a 13. A média aritmética desses 30 números é igual a 25.\nRetiram-se desse conjunto todos os números iguais a 13 e a média aritmética dos números restantes passa a ser 33.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine a soma dos 30 números originais.",
    "respostaFinal": {
     "rotulo": "soma",
     "aceitas": [
      "750"
     ]
    },
    "conferencia": "30*25",
    "resolucao": "Como são 30 números e a média deles é 25, então a soma desses números é 30 × 25 = 750.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Deu a resposta correta sem demonstrar os cálculos ou indicar o raciocínio, ou apresentou algum raciocínio coerente porém sem continuidade, ou raciocinou corretamente e errou a conta (30×25)."
     },
     {
      "pct": 50,
      "desc": "Raciocinou corretamente, acertou os cálculos e deu a resposta correta: 750."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Determine quantos números iguais a 13 havia no conjunto original.",
    "respostaFinal": {
     "rotulo": "quantidade",
     "aceitas": [
      "12",
      "12 números",
      "n = 12"
     ]
    },
    "conferencia": "(990 - 750) / (33 - 13)",
    "resolucao": "Seja N a quantidade de números iguais a 13.\nAssim, tem-se que: (750 − 13N) / (30 − N) = 33.\nDaí: 750 − 13N = 990 − 33N → 20N = 240 → N = 12.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apresentou apenas a resposta, sem fazer cálculos, tampouco indicar o raciocínio utilizado."
     },
     {
      "pct": 25,
      "desc": "Equacionou o problema porém sem continuidade, ou equacionou corretamente e deu continuidade mas errou em conta, ou resolveu pelo método de tentativa e erro, com a resposta correta."
     },
     {
      "pct": 50,
      "desc": "Equacionou corretamente o problema, deu continuidade aos cálculos e apresentou a resposta correta: 12."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Referência — FGV EESP 2026.1 (questões reais)",
  "id": "mat-disc-fgv-2026-05",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Curva de Lorenz e Índice de Gini",
  "origem": "FGV EESP 2026.1 · Matemática Discursiva, questão 5",
  "tempoSugerido": 25,
  "enunciado": "A curva de Lorenz relaciona a porcentagem acumulada da população, ordenada por renda (eixo horizontal), com a porcentagem acumulada da renda que essa parcela possui (eixo vertical). A reta y = x representa a perfeita igualdade.\n\nO Índice de Gini é a razão entre a área compreendida entre a linha de igualdade e a curva de Lorenz e a área entre a linha de igualdade e o eixo horizontal; ele varia de 0 (perfeita igualdade) a 1 (perfeita desigualdade).\n\nSuponha que a curva de Lorenz de certo país seja dada por y = 1 − √(1 − x²), com x ∈ [0, 1].",
  "itens": [
   {
    "id": "a",
    "pontos": 1,
    "comando": "Determine qual fração da riqueza deste país está concentrada nos 20% mais ricos.",
    "respostaFinal": {
     "rotulo": "fração da riqueza",
     "aceitas": [
      "0,6",
      "0.6",
      "60%",
      "3/5",
      "60"
     ]
    },
    "conferencia": "1 - (1 - Math.sqrt(1 - 0.8*0.8))",
    "resolucao": "Os 20% mais ricos detêm a renda acumulada entre x = 0,8 e x = 1, isto é, y(1) − y(0,8).\ny(1) = 1 − √(1 − 1) = 1 e y(0,8) = 1 − √(1 − 0,64) = 1 − 0,6 = 0,4.\nLogo, 1 − 0,4 = 0,6 — ou 60%, por leitura direta do gráfico.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou incorreta."
     },
     {
      "pct": 100,
      "desc": "Chegou a 0,6 (60%), por cálculo ou por leitura direta do gráfico."
     }
    ]
   },
   {
    "id": "b",
    "pontos": 1,
    "comando": "Explique por que o gráfico dessa curva é um arco de circunferência. Determine o centro e o raio dessa circunferência.",
    "resolucao": "De y = 1 − √(1 − x²) vem y − 1 = −√(1 − x²).\nElevando ao quadrado: (y − 1)² = 1 − x², ou seja, x² + (y − 1)² = 1.\nÉ a equação de uma circunferência de centro (0, 1) e raio 1 — o trecho com x ∈ [0, 1] e y ≤ 1 é o arco do quarto inferior direito.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou incorreta."
     },
     {
      "pct": 50,
      "desc": "Manipulou a equação até uma forma reconhecível de circunferência, mas não identificou centro e raio, ou identificou um dos dois."
     },
     {
      "pct": 100,
      "desc": "Chegou a x² + (y − 1)² = 1, com centro (0, 1) e raio 1, justificando a passagem."
     }
    ]
   },
   {
    "id": "c",
    "pontos": 2,
    "comando": "Determine o Índice de Gini desse país com duas casas decimais (considere π = 3,14).",
    "respostaFinal": {
     "rotulo": "Índice de Gini",
     "aceitas": [
      "0,57",
      "0.57"
     ],
     "intervalo": [
      0.54,
      0.6
     ]
    },
    "conferencia": "(0.5 - (1 - 3.14/4)) / 0.5",
    "resolucao": "Área entre a reta de igualdade e a curva = área do triângulo (0,5) menos a área sob a curva.\nA área sob a curva é a do quadrado menos a do quarto de círculo: 1 − (1/4)·π·1² ≅ 1 − 0,785 = 0,215.\nLogo a área entre as duas curvas é 0,5 − 0,215 = 0,285, e o Gini é 0,285 / 0,5 ≅ 0,57.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou incorreta."
     },
     {
      "pct": 50,
      "desc": "Calculou a área do setor circular (≅ 0,285) ou a área do triângulo (0,5), mas não chegou ao índice."
     },
     {
      "pct": 100,
      "desc": "Chegou ao Índice de Gini ≅ 0,57 (a banca aceita de 0,54 a 0,60)."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-01",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Progressão aritmética",
  "tempoSugerido": 10,
  "enunciado": "Uma plataforma de streaming fechou janeiro com 1.200 assinantes e, desde então, tem ganhado exatamente 85 novos assinantes por mês, sem cancelamentos.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantos assinantes a plataforma terá 18 meses depois de janeiro?",
    "respostaFinal": {
     "rotulo": "assinantes",
     "aceitas": [
      "2730"
     ]
    },
    "conferencia": "1200 + 18*85",
    "resolucao": "É uma PA de primeiro termo 1.200 e razão 85, contada a partir de janeiro.\nEm 18 meses o ganho é 18 × 85 = 1.530.\nLogo, o total é 1.200 + 1.530 = 2.730 assinantes.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apresentou apenas o número, sem cálculo nem indicação de raciocínio."
     },
     {
      "pct": 25,
      "desc": "Reconheceu a progressão aritmética mas não somou ao valor inicial, ou usou 17 ou 19 meses, ou multiplicou 1.200 por 85."
     },
     {
      "pct": 50,
      "desc": "Montou 1.200 + 18 × 85 e chegou à resposta correta: 2.730."
     }
    ]
   },
   {
    "id": "b",
    "comando": "A partir de quantos meses depois de janeiro a plataforma passa de 5.000 assinantes?",
    "respostaFinal": {
     "rotulo": "meses",
     "aceitas": [
      "45",
      "45 meses"
     ]
    },
    "conferencia": "Math.ceil((5000 - 1200) / 85)",
    "resolucao": "Queremos o menor n com 1.200 + 85n > 5.000.\nDaí 85n > 3.800, ou seja, n > 44,7.\nComo n é inteiro, n = 45. Conferindo: 1.200 + 45 × 85 = 5.025, e com 44 meses seriam 4.940.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apresentou apenas o número, sem indicar o raciocínio."
     },
     {
      "pct": 25,
      "desc": "Montou a inequação corretamente mas parou em 44,7 sem arredondar, ou arredondou para baixo (44), ou trocou o sinal e resolveu para 5.000 − 1.200 = 3.800 assinantes finais."
     },
     {
      "pct": 50,
      "desc": "Resolveu a inequação e concluiu corretamente que são 45 meses."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-02",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Soma de progressão aritmética",
  "tempoSugerido": 10,
  "enunciado": "Em um teatro, a primeira fila tem 18 poltronas e cada fila seguinte tem 3 poltronas a mais que a anterior. A plateia tem 22 filas.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantas poltronas tem a última fila?",
    "respostaFinal": {
     "rotulo": "poltronas",
     "aceitas": [
      "81"
     ]
    },
    "conferencia": "18 + 21*3",
    "resolucao": "O termo geral é a_n = 18 + (n − 1)·3.\nPara n = 22: a_22 = 18 + 21 × 3 = 18 + 63 = 81 poltronas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou 22 em vez de 21 no número de saltos (chegando a 84), ou apresentou apenas o resultado sem indicar o termo geral."
     },
     {
      "pct": 50,
      "desc": "Aplicou o termo geral com 21 saltos e chegou a 81."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a capacidade total da plateia?",
    "respostaFinal": {
     "rotulo": "poltronas no total",
     "aceitas": [
      "1089"
     ]
    },
    "conferencia": "(18 + 81) * 22 / 2",
    "resolucao": "A soma dos termos de uma PA é S = (a_1 + a_n)·n/2.\nS = (18 + 81) × 22 / 2 = 99 × 11 = 1.089 poltronas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Escreveu a fórmula da soma mas usou o termo errado (por exemplo, a última fila com 84), ou multiplicou a média das filas por 21."
     },
     {
      "pct": 50,
      "desc": "Somou a PA corretamente e chegou a 1.089."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-03",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Progressão geométrica e depreciação",
  "tempoSugerido": 12,
  "enunciado": "Uma transportadora comprou um caminhão por R$ 80.000,00. O valor de revenda do veículo cai 15% a cada ano em relação ao valor do ano anterior.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual será o valor de revenda do caminhão depois de 3 anos?",
    "respostaFinal": {
     "rotulo": "valor em reais",
     "aceitas": [
      "49130",
      "R$ 49.130,00",
      "49.130"
     ]
    },
    "conferencia": "80000 * Math.pow(0.85, 3)",
    "resolucao": "Perder 15% por ano é multiplicar por 0,85 a cada ano — uma PG de razão 0,85.\nDepois de 3 anos: 80.000 × 0,85³ = 80.000 × 0,614125.\nLogo, o valor é R$ 49.130,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apenas o número sem indicar o raciocínio."
     },
     {
      "pct": 25,
      "desc": "Descontou 15% de forma linear (80.000 − 3 × 12.000 = 44.000), tratando a queda como PA em vez de PG."
     },
     {
      "pct": 50,
      "desc": "Reconheceu a razão 0,85 mas elevou ao expoente errado (0,85² ou 0,85⁴), ou apresentou 0,85³ sem concluir o valor."
     },
     {
      "pct": 75,
      "desc": "Montou 80.000 × 0,85³ corretamente e errou apenas a conta final."
     },
     {
      "pct": 100,
      "desc": "Chegou ao valor correto de R$ 49.130,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-04",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Recorrência linear",
  "tempoSugerido": 15,
  "enunciado": "Uma sequência é definida por a₁ = 2 e, para todo n ≥ 1, a_{n+1} = 2·a_n − 1.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine a₅.",
    "respostaFinal": {
     "rotulo": "valor de a₅",
     "aceitas": [
      "17"
     ]
    },
    "conferencia": "Math.pow(2,4) + 1",
    "resolucao": "Aplicando a regra: a₂ = 3, a₃ = 5, a₄ = 9, a₅ = 17.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Aplicou a recorrência mas perdeu um passo (parou em a₄ = 9 ou avançou até a₆ = 33), ou subtraiu 1 antes de dobrar."
     },
     {
      "pct": 50,
      "desc": "Iterou corretamente até a₅ = 17."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Mostre que a_n = 2^(n−1) + 1 para todo n ≥ 1 e use essa fórmula para calcular a₁₀.",
    "respostaFinal": {
     "rotulo": "valor de a₁₀",
     "aceitas": [
      "513"
     ]
    },
    "conferencia": "Math.pow(2,9) + 1",
    "resolucao": "Escrevendo b_n = a_n − 1, a recorrência vira b_{n+1} = 2·b_n, com b₁ = 1.\nLogo b_n = 2^(n−1) e a_n = 2^(n−1) + 1.\nPara n = 10: a₁₀ = 2⁹ + 1 = 512 + 1 = 513.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apenas o valor de a₁₀ sem qualquer justificativa da fórmula."
     },
     {
      "pct": 25,
      "desc": "Verificou a fórmula em alguns termos sem justificar o caso geral, ou usou 2¹⁰ + 1 = 1.025 por errar o expoente."
     },
     {
      "pct": 50,
      "desc": "Justificou a fórmula (por substituição b_n = a_n − 1 ou por indução) e chegou a a₁₀ = 513."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-05",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Soma de PA com termo geral",
  "tempoSugerido": 15,
  "enunciado": "Uma cooperativa distribui cestas em etapas. Na etapa 1 são entregues 1 cesta; na etapa 2, 4 cestas; na etapa 3, 7 cestas; e assim por diante, sempre 3 cestas a mais que na etapa anterior.",
  "itens": [
   {
    "id": "a",
    "comando": "Escreva, em função de N, quantas cestas são entregues na etapa N e quantas foram entregues no total até o fim da etapa N.",
    "resolucao": "As quantidades formam uma PA de primeiro termo 1 e razão 3, então na etapa N são entregues 1 + (N − 1)·3 = 3N − 2 cestas.\nO total é a soma da PA: S_N = [1 + (3N − 2)]·N/2 = (3N − 1)·N/2, ou seja, (3N² − N)/2.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Acertou o termo geral 3N − 2 mas não chegou à soma, ou somou como se a razão fosse 2."
     },
     {
      "pct": 50,
      "desc": "Apresentou 3N − 2 para a etapa e (3N² − N)/2 para o total, com a passagem indicada."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Quantas cestas terão sido entregues ao fim da etapa 20?",
    "respostaFinal": {
     "rotulo": "cestas",
     "aceitas": [
      "590"
     ]
    },
    "conferencia": "(3*20*20 - 20)/2",
    "resolucao": "Usando S_N = (3N² − N)/2 com N = 20: (3 × 400 − 20)/2 = (1.200 − 20)/2 = 590 cestas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Substituiu na fórmula mas errou a conta, ou respondeu 58 (a quantidade entregue apenas na etapa 20)."
     },
     {
      "pct": 50,
      "desc": "Chegou a 590 cestas."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-06",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Progressão geométrica e soma",
  "tempoSugerido": 12,
  "enunciado": "Uma campanha de doações começou com 3 doadores no primeiro dia e, a cada dia, o número de novos doadores foi o dobro do dia anterior.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantos novos doadores a campanha recebeu no décimo dia?",
    "respostaFinal": {
     "rotulo": "doadores no 10º dia",
     "aceitas": [
      "1536"
     ]
    },
    "conferencia": "3 * Math.pow(2,9)",
    "resolucao": "É uma PG de primeiro termo 3 e razão 2: a_n = 3·2^(n−1).\nNo décimo dia: 3 × 2⁹ = 3 × 512 = 1.536 doadores.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou expoente 10 em vez de 9 (chegando a 3.072), ou somou 2 a cada dia em vez de dobrar."
     },
     {
      "pct": 50,
      "desc": "Aplicou o termo geral da PG e chegou a 1.536."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Quantos doadores a campanha acumulou nos dez primeiros dias?",
    "respostaFinal": {
     "rotulo": "doadores acumulados",
     "aceitas": [
      "3069"
     ]
    },
    "conferencia": "3 * (Math.pow(2,10) - 1)",
    "resolucao": "A soma de uma PG é S = a₁·(qⁿ − 1)/(q − 1).\nS = 3 × (2¹⁰ − 1)/(2 − 1) = 3 × 1.023 = 3.069 doadores.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Escreveu a fórmula da soma mas usou 2⁹ ou esqueceu de subtrair 1, ou apenas dobrou o termo do décimo dia."
     },
     {
      "pct": 50,
      "desc": "Somou a PG corretamente e chegou a 3.069."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-07",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Soma telescópica",
  "tempoSugerido": 15,
  "enunciado": "Considere a soma S = 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(50·51).",
  "itens": [
   {
    "id": "a",
    "comando": "Mostre que 1/(n(n+1)) = 1/n − 1/(n+1) e explique por que essa igualdade simplifica o cálculo de S.",
    "resolucao": "Somando as frações do lado direito: 1/n − 1/(n+1) = [(n+1) − n]/[n(n+1)] = 1/[n(n+1)].\nAo escrever cada parcela nessa forma, o termo −1/(n+1) de uma parcela cancela o +1/(n+1) da parcela seguinte: a soma é telescópica e sobram apenas o primeiro e o último termos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Verificou a igualdade em um caso numérico sem fazer a conta geral, ou provou a igualdade sem explicar o cancelamento."
     },
     {
      "pct": 50,
      "desc": "Provou a igualdade somando as frações e explicou o cancelamento entre parcelas consecutivas."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Determine o valor exato de S.",
    "respostaFinal": {
     "rotulo": "valor de S",
     "aceitas": [
      "50/51"
     ]
    },
    "conferencia": "1 - 1/51",
    "resolucao": "Pelo cancelamento, S = 1/1 − 1/51.\nLogo S = 50/51.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Chegou à forma 1 − 1/51 mas não concluiu a fração, ou terminou em 1/1 − 1/50 por errar o último termo."
     },
     {
      "pct": 50,
      "desc": "Concluiu que S = 50/51."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-08",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "PA aplicada a parcelamento",
  "tempoSugerido": 15,
  "enunciado": "Uma dívida de R$ 9.750,00 será quitada em parcelas mensais crescentes: a primeira é de R$ 300,00 e cada parcela seguinte é R$ 50,00 maior que a anterior. O total pago corresponde exatamente à dívida.",
  "itens": [
   {
    "id": "a",
    "comando": "Em quantas parcelas a dívida será quitada?",
    "respostaFinal": {
     "rotulo": "parcelas",
     "aceitas": [
      "15",
      "15 parcelas"
     ]
    },
    "conferencia": "(-275 + Math.sqrt(275*275 + 4*25*9750)) / (2*25)",
    "resolucao": "A soma das n parcelas é S = n·[2·300 + (n − 1)·50]/2 = 25n² + 275n.\nIgualando a 9.750: 25n² + 275n − 9.750 = 0, ou n² + 11n − 390 = 0.\nAs raízes são n = 15 e n = −26; como n é positivo, são 15 parcelas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apenas o número, sem equacionar."
     },
     {
      "pct": 25,
      "desc": "Montou a soma da PA mas errou ao isolar (esqueceu o fator n/2, por exemplo), ou dividiu 9.750 pela primeira parcela."
     },
     {
      "pct": 50,
      "desc": "Montou a equação do segundo grau, resolveu e concluiu que são 15 parcelas."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o valor da última parcela?",
    "respostaFinal": {
     "rotulo": "valor em reais",
     "aceitas": [
      "1000",
      "R$ 1.000,00",
      "1.000"
     ]
    },
    "conferencia": "300 + 14*50",
    "resolucao": "A última parcela é a_15 = 300 + (15 − 1)·50 = 300 + 700 = R$ 1.000,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou 15 saltos em vez de 14 (chegando a 1.050), ou dividiu o total pelo número de parcelas."
     },
     {
      "pct": 50,
      "desc": "Aplicou o termo geral e chegou a R$ 1.000,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-09",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Recorrência com estoque",
  "tempoSugerido": 12,
  "enunciado": "Um depósito começa a semana com 480 caixas. Toda semana saem 60% das caixas presentes no início da semana e, ao fim dela, chegam 100 caixas novas.",
  "itens": [
   {
    "id": "a",
    "comando": "Escreva a recorrência que dá o estoque E_{n+1} do início da semana seguinte em função do estoque E_n e calcule o estoque no início da terceira semana.",
    "respostaFinal": {
     "rotulo": "caixas no início da 3ª semana",
     "aceitas": [
      "216,8",
      "216.8"
     ]
    },
    "conferencia": "0.4*(0.4*480 + 100) + 100",
    "resolucao": "Se saem 60%, restam 40%: E_{n+1} = 0,4·E_n + 100.\nSemana 2: E₂ = 0,4 × 480 + 100 = 192 + 100 = 292.\nSemana 3: E₃ = 0,4 × 292 + 100 = 116,8 + 100 = 216,8 caixas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Escreveu a recorrência com 0,6 em vez de 0,4, ou aplicou apenas um passo e parou em 292."
     },
     {
      "pct": 50,
      "desc": "Montou E_{n+1} = 0,4·E_n + 100 e chegou a 216,8 caixas."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Se o processo se repetir indefinidamente, de que valor o estoque se aproxima? Justifique.",
    "respostaFinal": {
     "rotulo": "estoque de equilíbrio",
     "aceitas": [
      "166,67",
      "166.67",
      "500/3"
     ],
     "intervalo": [
      166,
      167
     ]
    },
    "conferencia": "100 / (1 - 0.4)",
    "resolucao": "No equilíbrio o estoque para de mudar: E = 0,4·E + 100.\nDaí 0,6·E = 100 e E = 100/0,6 ≈ 166,67 caixas.\nComo o fator 0,4 é menor que 1, a diferença para esse valor é multiplicada por 0,4 a cada semana e tende a zero — o estoque converge para ele.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou alguns termos e observou a estabilização sem equacionar o ponto fixo, ou resolveu E = 0,6E + 100 e chegou a 250."
     },
     {
      "pct": 50,
      "desc": "Equacionou o ponto fixo, chegou a ≈ 166,67 e justificou a convergência pelo fator menor que 1."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-10",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Divisibilidade em sequência",
  "tempoSugerido": 12,
  "enunciado": "Os números naturais são distribuídos, em ordem crescente e um a um, em cinco colunas numeradas de 1 a 5, sempre da coluna 1 para a coluna 5 e recomeçando na coluna 1.",
  "itens": [
   {
    "id": "a",
    "comando": "Em qual coluna cai o número 2.026?",
    "respostaFinal": {
     "rotulo": "coluna",
     "aceitas": [
      "1",
      "coluna 1"
     ]
    },
    "conferencia": "2026 - 5*Math.floor(2025/5)",
    "resolucao": "A coluna depende do resto da divisão por 5: resto 1 vai para a coluna 1, resto 2 para a coluna 2, e assim por diante, com resto 0 na coluna 5.\nComo 2.026 = 5 × 405 + 1, o resto é 1.\nLogo, o número 2.026 cai na coluna 1.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu por 5 mas associou o resto à coluna errada (por exemplo, resto 1 na coluna 2), ou usou o quociente no lugar do resto."
     },
     {
      "pct": 50,
      "desc": "Usou o resto da divisão por 5 e concluiu corretamente que é a coluna 1."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o menor número maior que 2.026 que cai na mesma coluna que 1.999? Justifique.",
    "respostaFinal": {
     "rotulo": "número",
     "aceitas": [
      "2029"
     ]
    },
    "conferencia": "2029",
    "resolucao": "1.999 = 5 × 399 + 4, então 1.999 está na coluna 4.\nOs números da coluna 4 são os que deixam resto 4 na divisão por 5.\nDepois de 2.026, os candidatos são 2.027 (resto 2), 2.028 (resto 3) e 2.029 = 5 × 405 + 4, que tem resto 4.\nLogo, o número procurado é 2.029.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Identificou a coluna de 1.999 mas não achou o próximo número, ou apresentou 2.024 (anterior a 2.026)."
     },
     {
      "pct": 50,
      "desc": "Identificou a coluna 4 pelo resto e concluiu que o número é 2.029."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-11",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Números figurados",
  "tempoSugerido": 12,
  "enunciado": "Um mosaico é montado em etapas com ladrilhos quadrados. A etapa 1 usa 1 ladrilho; a etapa 2 forma um quadrado 2×2; a etapa 3, um quadrado 3×3; e assim por diante. Em cada etapa, o quadrado anterior é refeito por inteiro.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantos ladrilhos são acrescentados da etapa N − 1 para a etapa N? Justifique.",
    "resolucao": "A etapa N usa N² ladrilhos e a etapa anterior usa (N − 1)².\nA diferença é N² − (N − 1)² = N² − (N² − 2N + 1) = 2N − 1 ladrilhos.\nSão exatamente os ímpares: 3, 5, 7, …",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Percebeu que os acréscimos são ímpares por observação dos casos, sem chegar à expressão 2N − 1."
     },
     {
      "pct": 50,
      "desc": "Calculou N² − (N − 1)² e concluiu que são 2N − 1 ladrilhos."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Somando todas as etapas de 1 a 12, quantos ladrilhos foram usados no total?",
    "respostaFinal": {
     "rotulo": "ladrilhos",
     "aceitas": [
      "650"
     ]
    },
    "conferencia": "12*13*25/6",
    "resolucao": "O total é 1² + 2² + … + 12², que vale N(N + 1)(2N + 1)/6.\nCom N = 12: 12 × 13 × 25/6 = 3.900/6 = 650 ladrilhos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou apenas os ladrilhos da última etapa (144), ou somou 1 + 2 + … + 12 = 78 em vez dos quadrados."
     },
     {
      "pct": 50,
      "desc": "Somou os quadrados e chegou a 650 ladrilhos."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-12",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "PA e PA de segunda ordem",
  "tempoSugerido": 15,
  "enunciado": "Uma fábrica registrou a produção diária de uma nova linha: 12 unidades no primeiro dia, 17 no segundo, 24 no terceiro, 33 no quarto e 44 no quinto.",
  "itens": [
   {
    "id": "a",
    "comando": "Mostre que as diferenças entre dias consecutivos formam uma progressão aritmética e determine a produção do oitavo dia.",
    "respostaFinal": {
     "rotulo": "unidades no 8º dia",
     "aceitas": [
      "89"
     ]
    },
    "conferencia": "44 + 13 + 15 + 17",
    "resolucao": "As diferenças são 5, 7, 9 e 11 — uma PA de razão 2.\nAs próximas diferenças são 13, 15 e 17.\n6º dia = 44 + 13 = 57; 7º dia = 57 + 15 = 72; 8º dia = 72 + 17 = 89 unidades.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Identificou as diferenças 5, 7, 9, 11 mas errou ao continuar a sequência, ou tratou a produção em si como PA de razão constante."
     },
     {
      "pct": 50,
      "desc": "Reconheceu a PA das diferenças e chegou a 89 unidades no oitavo dia."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual foi a produção acumulada nos cinco primeiros dias?",
    "respostaFinal": {
     "rotulo": "unidades acumuladas",
     "aceitas": [
      "130"
     ]
    },
    "conferencia": "12+17+24+33+44",
    "resolucao": "Basta somar os cinco valores dados: 12 + 17 + 24 + 33 + 44 = 130 unidades.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Errou a soma, ou aplicou a fórmula da soma de PA, que não vale aqui porque a sequência não é uma PA."
     },
     {
      "pct": 50,
      "desc": "Somou corretamente e chegou a 130 unidades."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-13",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "PG infinita",
  "tempoSugerido": 12,
  "enunciado": "Uma bola é solta de uma altura de 2,4 m. A cada choque com o chão, ela sobe até 3/4 da altura anterior.",
  "itens": [
   {
    "id": "a",
    "comando": "Que altura a bola atinge após o terceiro choque?",
    "respostaFinal": {
     "rotulo": "altura em metros",
     "aceitas": [
      "1,0125",
      "1.0125"
     ]
    },
    "conferencia": "2.4 * Math.pow(0.75, 3)",
    "resolucao": "É uma PG de razão 3/4 começando em 2,4.\nApós o terceiro choque: 2,4 × (3/4)³ = 2,4 × 27/64.\nLogo, a altura é 1,0125 m.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou expoente 2 ou 4, ou subtraiu 3/4 da altura em vez de multiplicar."
     },
     {
      "pct": 50,
      "desc": "Aplicou a PG e chegou a 1,0125 m."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Somando a descida inicial e todas as subidas e descidas seguintes, qual é a distância total percorrida pela bola até parar?",
    "respostaFinal": {
     "rotulo": "distância em metros",
     "aceitas": [
      "16,8",
      "16.8"
     ]
    },
    "conferencia": "2.4 + 2 * (2.4*0.75) / (1 - 0.75)",
    "resolucao": "A descida inicial vale 2,4 m.\nDepois disso, cada subida é acompanhada de uma descida igual, então a distância restante é 2 vezes a soma das subidas.\nAs subidas formam a PG 1,8; 1,35; … de razão 3/4, cuja soma é 1,8/(1 − 3/4) = 7,2.\nTotal: 2,4 + 2 × 7,2 = 16,8 m.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou a PG infinita mas esqueceu de dobrar as subidas, ou esqueceu de somar a descida inicial."
     },
     {
      "pct": 50,
      "desc": "Somou corretamente a PG infinita, dobrou as subidas e chegou a 16,8 m."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-14",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Recorrência com invariante",
  "tempoSugerido": 18,
  "enunciado": "Uma urna contém 5 fichas azuis e 8 fichas verdes. Em cada rodada, retira-se uma ficha ao acaso, ela é devolvida à urna e acrescentam-se 2 fichas azuis e 2 verdes, independentemente da cor sorteada.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine a quantidade de fichas verdes menos a quantidade de azuis após 30 rodadas.",
    "respostaFinal": {
     "rotulo": "diferença",
     "aceitas": [
      "3"
     ]
    },
    "conferencia": "8 - 5",
    "resolucao": "A cada rodada as duas cores recebem a mesma quantidade de fichas, então a diferença entre elas não muda: é um invariante.\nNo início a diferença é 8 − 5 = 3.\nDepois de 30 rodadas — ou de quantas forem — a diferença continua sendo 3.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou as duas quantidades finais separadamente e errou a subtração, ou somou 2 apenas a uma das cores por rodada."
     },
     {
      "pct": 50,
      "desc": "Percebeu que a diferença é invariante e concluiu que ela vale 3."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Após quantas rodadas a urna terá 133 fichas no total?",
    "respostaFinal": {
     "rotulo": "rodadas",
     "aceitas": [
      "30",
      "30 rodadas"
     ]
    },
    "conferencia": "(133 - 13) / 4",
    "resolucao": "A urna começa com 13 fichas e ganha 4 por rodada.\nApós n rodadas há 13 + 4n fichas.\nDe 13 + 4n = 133 vem 4n = 120 e n = 30 rodadas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Montou a PA mas esqueceu o total inicial, ou usou 2 fichas por rodada em vez de 4."
     },
     {
      "pct": 50,
      "desc": "Montou 13 + 4n = 133 e concluiu que são 30 rodadas."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-15",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "PA com termos em progressão",
  "tempoSugerido": 12,
  "enunciado": "Três números formam uma progressão aritmética crescente. Sua soma é 42 e o produto dos extremos é 180.",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine os três números.",
    "respostaFinal": {
     "rotulo": "o menor dos três",
     "aceitas": [
      "10"
     ]
    },
    "conferencia": "14 - 4",
    "resolucao": "Chamando os termos de (x − r), x e (x + r), a soma é 3x = 42, logo x = 14.\nO produto dos extremos é (14 − r)(14 + r) = 196 − r² = 180, então r² = 16 e r = 4.\nOs três números são 10, 14 e 18 — e, de fato, 10 + 14 + 18 = 42 e 10 × 18 = 180.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Chamou os termos de x, x + r e x + 2r sem simetrizar e travou no sistema, ou achou x = 14 e parou."
     },
     {
      "pct": 50,
      "desc": "Usou a forma simétrica e chegou a r² = 16 sem concluir os três números."
     },
     {
      "pct": 75,
      "desc": "Montou tudo corretamente e errou apenas ao listar os termos."
     },
     {
      "pct": 100,
      "desc": "Concluiu que os números são 10, 14 e 18, sendo 10 o menor."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-16",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Recorrência de duas etapas",
  "tempoSugerido": 15,
  "enunciado": "Uma sequência é definida por b₁ = 1, b₂ = 3 e b_{n+2} = b_{n+1} + 2·b_n para n ≥ 1.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule b₆.",
    "respostaFinal": {
     "rotulo": "valor de b₆",
     "aceitas": [
      "43"
     ]
    },
    "conferencia": "21 + 2*11",
    "resolucao": "b₃ = 3 + 2 × 1 = 5.\nb₄ = 5 + 2 × 3 = 11.\nb₅ = 11 + 2 × 5 = 21.\nb₆ = 21 + 2 × 11 = 43.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Trocou a ordem dos termos na recorrência (usou 2·b_{n+1} + b_n), ou parou em b₅."
     },
     {
      "pct": 50,
      "desc": "Iterou corretamente e chegou a b₆ = 43."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Verifique que todos os termos dessa sequência são ímpares e explique por quê.",
    "resolucao": "Os dois primeiros termos, 1 e 3, são ímpares.\nSe b_n e b_{n+1} são ímpares, então 2·b_n é par e b_{n+2} = b_{n+1} + 2·b_n é ímpar + par = ímpar.\nComo a propriedade vale para os dois primeiros e se propaga, todos os termos são ímpares.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Verificou a paridade nos primeiros termos calculados, sem argumento que valha para todos."
     },
     {
      "pct": 50,
      "desc": "Argumentou que 2·b_n é sempre par e que a soma com um ímpar mantém a paridade, cobrindo o caso geral."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-17",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Interpolação em PA",
  "tempoSugerido": 10,
  "enunciado": "Entre os números 7 e 63 devem ser inseridos alguns números de modo que a sequência inteira seja uma progressão aritmética de razão 4.",
  "itens": [
   {
    "id": "unico",
    "comando": "Quantos números devem ser inseridos entre 7 e 63?",
    "respostaFinal": {
     "rotulo": "quantidade inserida",
     "aceitas": [
      "13"
     ]
    },
    "conferencia": "(63 - 7)/4 - 1",
    "resolucao": "De 7 a 63 há uma diferença de 56.\nCom razão 4, são 56/4 = 14 saltos, o que corresponde a 15 termos no total.\nComo 7 e 63 já existem, devem ser inseridos 15 − 2 = 13 números.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apenas o número sem indicar o raciocínio."
     },
     {
      "pct": 25,
      "desc": "Calculou 56/4 = 14 e parou aí, sem descontar os extremos, ou dividiu 63 por 4."
     },
     {
      "pct": 50,
      "desc": "Contou os saltos e os termos, mas errou apenas ao descontar os extremos."
     },
     {
      "pct": 75,
      "desc": "Chegou a 15 termos totais e concluiu 14 inseridos, descontando só um extremo."
     },
     {
      "pct": 100,
      "desc": "Concluiu que devem ser inseridos 13 números."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-18",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "PG e crescimento populacional",
  "tempoSugerido": 15,
  "enunciado": "Uma colônia de bactérias dobra de tamanho a cada 20 minutos. Às 8h da manhã havia 500 bactérias.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantas bactérias haverá às 11h da manhã?",
    "respostaFinal": {
     "rotulo": "bactérias",
     "aceitas": [
      "256000"
     ]
    },
    "conferencia": "500 * Math.pow(2, 9)",
    "resolucao": "De 8h a 11h são 3 horas, ou seja, 180 minutos.\nEm intervalos de 20 minutos, isso dá 180/20 = 9 duplicações.\nLogo: 500 × 2⁹ = 500 × 512 = 256.000 bactérias.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Contou 3 duplicações (uma por hora), ou multiplicou 500 por 9."
     },
     {
      "pct": 50,
      "desc": "Contou 9 duplicações mas errou a potência ou a conta final."
     },
     {
      "pct": 75,
      "desc": "Montou 500 × 2⁹ corretamente e errou apenas o produto."
     },
     {
      "pct": 100,
      "desc": "Chegou a 256.000 bactérias."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Quantos minutos depois das 8h a colônia terá passado de 1 milhão de bactérias? Indique também o horário.",
    "respostaFinal": {
     "rotulo": "minutos após as 8h",
     "aceitas": [
      "220"
     ]
    },
    "conferencia": "11 * 20",
    "resolucao": "Precisamos de 500 × 2ⁿ > 1.000.000, ou seja, 2ⁿ > 2.000.\nComo 2¹⁰ = 1.024 e 2¹¹ = 2.048, o menor n é 11.\nSão 11 × 20 = 220 minutos após as 8h, isto é, 3h40 — às 11h40.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Montou a desigualdade 2ⁿ > 2.000 mas parou em n = 10 sem verificar que 1.024 não basta, ou não converteu as duplicações em minutos."
     },
     {
      "pct": 50,
      "desc": "Encontrou n = 11 e errou apenas a conversão para minutos."
     },
     {
      "pct": 75,
      "desc": "Chegou a 220 minutos e errou a conversão para o horário."
     },
     {
      "pct": 100,
      "desc": "Concluiu que são 220 minutos, ou seja, 11h40."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-19",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Somatório com termo geral",
  "tempoSugerido": 12,
  "enunciado": "Um edifício em construção tem, no primeiro andar, 3 apartamentos; no segundo, 6; no terceiro, 9; e assim por diante, sempre 3 a mais que o andar anterior.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantos apartamentos há no décimo andar?",
    "respostaFinal": {
     "rotulo": "apartamentos",
     "aceitas": [
      "30"
     ]
    },
    "conferencia": "3*10",
    "resolucao": "O andar n tem 3n apartamentos.\nPara n = 10: 3 × 10 = 30 apartamentos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou os andares em vez de identificar o termo do décimo andar, ou usou 3 + 10."
     },
     {
      "pct": 50,
      "desc": "Identificou o termo geral 3n e chegou a 30 apartamentos."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Quantos apartamentos tem o edifício inteiro, se ele tem 10 andares?",
    "respostaFinal": {
     "rotulo": "apartamentos no total",
     "aceitas": [
      "165"
     ]
    },
    "conferencia": "3 * 10 * 11 / 2",
    "resolucao": "O total é 3 × (1 + 2 + … + 10) = 3 × 55.\nLogo, o edifício tem 165 apartamentos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Multiplicou 30 por 10, tratando todos os andares como iguais ao último."
     },
     {
      "pct": 50,
      "desc": "Somou a PA e chegou a 165 apartamentos."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-20",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Recorrência com desconto",
  "tempoSugerido": 15,
  "enunciado": "Um fundo começa com R$ 50.000,00. Todo mês ele rende 1% sobre o saldo do início do mês e, logo depois, o titular retira R$ 800,00.",
  "itens": [
   {
    "id": "a",
    "comando": "Escreva a recorrência do saldo e calcule o saldo após dois meses.",
    "respostaFinal": {
     "rotulo": "saldo em reais",
     "aceitas": [
      "49397",
      "R$ 49.397,00"
     ]
    },
    "conferencia": "(50000*1.01 - 800)*1.01 - 800",
    "resolucao": "A recorrência é S_{n+1} = 1,01·S_n − 800.\nMês 1: 50.000 × 1,01 − 800 = 50.500 − 800 = 49.700.\nMês 2: 49.700 × 1,01 − 800 = 50.197 − 800 = R$ 49.397,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Descontou os 800 antes de aplicar o rendimento, ou aplicou o rendimento sobre o valor inicial nos dois meses."
     },
     {
      "pct": 50,
      "desc": "Aplicou a recorrência na ordem certa nos dois meses e chegou a R$ 49.397,00."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual saldo inicial faria o fundo se manter constante para sempre? Justifique.",
    "respostaFinal": {
     "rotulo": "saldo em reais",
     "aceitas": [
      "80000",
      "R$ 80.000,00"
     ]
    },
    "conferencia": "800 / 0.01",
    "resolucao": "Para o saldo não mudar é preciso que S = 1,01·S − 800.\nDaí 0,01·S = 800 e S = R$ 80.000,00.\nNesse valor o rendimento mensal é exatamente 800, que é o que se retira.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Testou valores sem equacionar o ponto fixo, ou dividiu 800 por 1,01."
     },
     {
      "pct": 50,
      "desc": "Equacionou S = 1,01·S − 800 e concluiu que o saldo é R$ 80.000,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-21",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Termos negativos em PA",
  "tempoSugerido": 10,
  "enunciado": "Uma progressão aritmética tem primeiro termo 94 e razão −7.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é o primeiro termo negativo dessa progressão e qual a sua posição?",
    "respostaFinal": {
     "rotulo": "posição do primeiro termo negativo",
     "aceitas": [
      "15",
      "n = 15"
     ]
    },
    "conferencia": "Math.floor(94/7) + 2",
    "resolucao": "O termo geral é a_n = 94 − 7(n − 1) = 101 − 7n.\nQueremos 101 − 7n < 0, ou seja, n > 101/7 ≈ 14,4.\nO menor inteiro é n = 15, e a_15 = 101 − 105 = −4.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apenas a resposta sem indicar o raciocínio."
     },
     {
      "pct": 25,
      "desc": "Montou o termo geral mas errou a distribuição do sinal, ou resolveu a desigualdade e arredondou para 14."
     },
     {
      "pct": 50,
      "desc": "Resolveu a desigualdade e chegou a n ≈ 14,4 sem concluir a posição inteira."
     },
     {
      "pct": 75,
      "desc": "Chegou a n = 15 mas errou o valor do termo."
     },
     {
      "pct": 100,
      "desc": "Concluiu que a posição é 15 e o termo vale −4."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-22",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "PG com meia-vida",
  "tempoSugerido": 12,
  "enunciado": "Um medicamento tem meia-vida de 6 horas no organismo: a cada 6 horas, a quantidade presente cai pela metade. Um paciente recebe 640 mg.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantos miligramas restam depois de 30 horas?",
    "respostaFinal": {
     "rotulo": "miligramas",
     "aceitas": [
      "20",
      "20 mg"
     ]
    },
    "conferencia": "640 / Math.pow(2, 5)",
    "resolucao": "Em 30 horas cabem 30/6 = 5 meias-vidas.\nEntão restam 640/2⁵ = 640/32 = 20 mg.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Contou 30 meias-vidas, ou dividiu 640 por 5, ou usou 6 divisões."
     },
     {
      "pct": 50,
      "desc": "Contou 5 meias-vidas e chegou a 20 mg."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Depois de quantas horas restará menos de 1 mg? Justifique.",
    "respostaFinal": {
     "rotulo": "horas",
     "aceitas": [
      "60",
      "60 horas"
     ]
    },
    "conferencia": "6 * 10",
    "resolucao": "Queremos 640/2ⁿ < 1, ou seja, 2ⁿ > 640.\nComo 2⁹ = 512 e 2¹⁰ = 1.024, o menor n é 10.\nConferindo: em 10 meias-vidas restam 640/1.024 = 0,625 mg, já abaixo de 1 mg.\nSão 10 × 6 = 60 horas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Montou a desigualdade 2ⁿ > 640 mas não converteu para horas, ou parou em n = 9."
     },
     {
      "pct": 50,
      "desc": "Concluiu que bastam 10 meias-vidas, isto é, 60 horas, verificando que restam 0,625 mg."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-23",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Sequência definida por partes",
  "tempoSugerido": 15,
  "enunciado": "Uma sequência começa em c₁ = 26 e segue esta regra: se o termo é par, o próximo é a sua metade; se é ímpar, o próximo é o triplo dele somado a 1.",
  "itens": [
   {
    "id": "a",
    "comando": "Escreva os oito primeiros termos da sequência.",
    "resolucao": "26 é par → 13. 13 é ímpar → 40. 40 é par → 20. 20 → 10. 10 → 5. 5 é ímpar → 16. 16 → 8.\nOs oito primeiros termos são: 26, 13, 40, 20, 10, 5, 16, 8.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Aplicou as duas regras trocadas em algum passo, ou parou antes do oitavo termo."
     },
     {
      "pct": 50,
      "desc": "Listou corretamente 26, 13, 40, 20, 10, 5, 16, 8."
     }
    ]
   },
   {
    "id": "b",
    "comando": "A partir de que termo a sequência entra no ciclo 4, 2, 1? Justifique.",
    "respostaFinal": {
     "rotulo": "posição do termo 4",
     "aceitas": [
      "9"
     ]
    },
    "conferencia": "9",
    "resolucao": "Continuando: o oitavo termo é 8, o nono é 4, o décimo é 2 e o décimo primeiro é 1.\nDe 1, a regra do ímpar leva a 4 outra vez, fechando o ciclo 4, 2, 1.\nLogo, a sequência entra no ciclo no nono termo.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Chegou ao ciclo mas contou a posição errada, ou parou em 8 sem prosseguir."
     },
     {
      "pct": 50,
      "desc": "Mostrou a continuação até 4, 2, 1 e concluiu que o ciclo começa no 9º termo."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-24",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "PA de duas variáveis",
  "tempoSugerido": 15,
  "enunciado": "Dois planos de celular começam com preços diferentes e sofrem reajustes anuais fixos. O plano A custa hoje R$ 60,00 e sobe R$ 8,00 por ano; o plano B custa hoje R$ 96,00 e sobe R$ 3,00 por ano.",
  "itens": [
   {
    "id": "a",
    "comando": "Daqui a quantos anos os dois planos custarão o mesmo?",
    "respostaFinal": {
     "rotulo": "anos",
     "aceitas": [
      "7,2",
      "7.2"
     ]
    },
    "conferencia": "(96 - 60) / (8 - 3)",
    "resolucao": "Igualando os preços: 60 + 8t = 96 + 3t.\nDaí 5t = 36 e t = 7,2 anos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Montou a equação com os reajustes trocados, ou subtraiu os preços sem dividir pela diferença de reajustes."
     },
     {
      "pct": 50,
      "desc": "Igualou as duas expressões e chegou a t = 7,2 anos."
     }
    ]
   },
   {
    "id": "b",
    "comando": "A partir de quantos anos completos o plano A passa a ser o mais caro?",
    "respostaFinal": {
     "rotulo": "anos completos",
     "aceitas": [
      "8",
      "8 anos"
     ]
    },
    "conferencia": "Math.floor((96-60)/(8-3)) + 1",
    "resolucao": "O plano A ultrapassa B quando t > 7,2.\nComo a pergunta é por anos completos, o primeiro é t = 8.\nConferindo: em 8 anos, A custa 60 + 64 = 124 e B custa 96 + 24 = 120.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Arredondou 7,2 para baixo (7), ou repetiu o valor 7,2 sem tratar o pedido de anos completos."
     },
     {
      "pct": 50,
      "desc": "Concluiu que a partir de 8 anos o plano A é mais caro, conferindo os valores."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-25",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Soma dos ímpares",
  "tempoSugerido": 12,
  "enunciado": "Considere a soma dos números ímpares consecutivos: 1 + 3 + 5 + … + (2N − 1).",
  "itens": [
   {
    "id": "a",
    "comando": "Mostre que essa soma vale N² e verifique o resultado para N = 6.",
    "respostaFinal": {
     "rotulo": "soma para N = 6",
     "aceitas": [
      "36"
     ]
    },
    "conferencia": "6*6",
    "resolucao": "São N termos em PA, de primeiro termo 1 e último 2N − 1.\nA soma é [1 + (2N − 1)]·N/2 = 2N·N/2 = N².\nPara N = 6: 1 + 3 + 5 + 7 + 9 + 11 = 36 = 6².",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Verificou apenas o caso N = 6 sem demonstrar o caso geral, ou errou a contagem dos termos."
     },
     {
      "pct": 50,
      "desc": "Demonstrou pela soma da PA que o resultado é N² e conferiu que dá 36 para N = 6."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a soma dos ímpares de 21 até 99, inclusive?",
    "respostaFinal": {
     "rotulo": "soma",
     "aceitas": [
      "2400"
     ]
    },
    "conferencia": "50*50 - 10*10",
    "resolucao": "A soma dos ímpares de 1 a 99 é 50² = 2.500, porque 99 = 2 × 50 − 1.\nA soma dos ímpares de 1 a 19 é 10² = 100, porque 19 = 2 × 10 − 1.\nLogo, a soma pedida é 2.500 − 100 = 2.400.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Subtraiu a soma até 21 em vez de até 19, descartando o próprio 21, ou errou o número de termos."
     },
     {
      "pct": 50,
      "desc": "Usou a diferença entre as duas somas de quadrados e chegou a 2.400."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-26",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "PG com razão fracionária",
  "tempoSugerido": 12,
  "enunciado": "O primeiro termo de uma progressão geométrica é 972 e o quarto termo é 36.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine a razão da progressão.",
    "respostaFinal": {
     "rotulo": "razão",
     "aceitas": [
      "1/3",
      "0,333",
      "0.333"
     ],
     "intervalo": [
      0.33,
      0.34
     ]
    },
    "conferencia": "Math.pow(36/972, 1/3)",
    "resolucao": "Da PG, a₄ = a₁·q³, logo 36 = 972·q³.\nEntão q³ = 36/972 = 1/27 e q = 1/3.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou expoente 4 em vez de 3, ou dividiu 972 por 36 e apresentou 27 como razão."
     },
     {
      "pct": 50,
      "desc": "Montou 972·q³ = 36 e concluiu que a razão é 1/3."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a soma dos infinitos termos dessa progressão?",
    "respostaFinal": {
     "rotulo": "soma",
     "aceitas": [
      "1458"
     ]
    },
    "conferencia": "972 / (1 - 1/3)",
    "resolucao": "Como |q| < 1, a soma infinita é S = a₁/(1 − q).\nS = 972/(1 − 1/3) = 972/(2/3) = 1.458.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou a fórmula da soma finita, ou dividiu por (1 + q) em vez de (1 − q)."
     },
     {
      "pct": 50,
      "desc": "Aplicou a soma da PG infinita e chegou a 1.458."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-27",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Sequência e contagem de dígitos",
  "tempoSugerido": 15,
  "enunciado": "Os números naturais são escritos em sequência, sem espaços: 123456789101112131415…",
  "itens": [
   {
    "id": "a",
    "comando": "Quantos algarismos são usados para escrever todos os números de 1 a 99?",
    "respostaFinal": {
     "rotulo": "algarismos",
     "aceitas": [
      "189"
     ]
    },
    "conferencia": "9*1 + 90*2",
    "resolucao": "De 1 a 9 há 9 números de 1 algarismo: 9 algarismos.\nDe 10 a 99 há 90 números de 2 algarismos: 180 algarismos.\nTotal: 9 + 180 = 189 algarismos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Contou 99 números de dois algarismos, ou esqueceu o bloco de 1 a 9."
     },
     {
      "pct": 50,
      "desc": "Separou por faixas de algarismos e chegou a 189."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o 200º algarismo dessa sequência? Justifique.",
    "respostaFinal": {
     "rotulo": "algarismo",
     "aceitas": [
      "0"
     ]
    },
    "conferencia": "0",
    "resolucao": "Até o 99 são 189 algarismos.\nDe 100 a 102 são mais 3 × 3 = 9 algarismos, chegando a 198.\nO 199º algarismo é o \"1\" do número 103 e o 200º é o \"0\" do mesmo número.\nLogo, o 200º algarismo é 0.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Descontou os 189 algarismos mas errou a divisão por 3, ou contou os números de três algarismos a partir do 99."
     },
     {
      "pct": 50,
      "desc": "Contou até 198 algarismos no número 102 e concluiu que o 200º algarismo é o 0 do número 103."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-28",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "PA e média aritmética",
  "tempoSugerido": 12,
  "enunciado": "Em uma progressão aritmética de 40 termos, o primeiro termo é 12 e o último é 168.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine a razão da progressão.",
    "respostaFinal": {
     "rotulo": "razão",
     "aceitas": [
      "4"
     ]
    },
    "conferencia": "(168 - 12) / 39",
    "resolucao": "De a₄₀ = a₁ + 39r vem 168 = 12 + 39r.\nEntão 39r = 156 e r = 4.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu por 40 em vez de 39, ou dividiu 168 por 12."
     },
     {
      "pct": 50,
      "desc": "Usou 39 saltos e chegou à razão 4."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a média aritmética dos 40 termos?",
    "respostaFinal": {
     "rotulo": "média",
     "aceitas": [
      "90"
     ]
    },
    "conferencia": "(12 + 168) / 2",
    "resolucao": "Em uma PA, a média de todos os termos é a média entre o primeiro e o último.\nLogo, (12 + 168)/2 = 90.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou toda a PA e errou a divisão por 40, ou tomou a média entre a razão e o primeiro termo."
     },
     {
      "pct": 50,
      "desc": "Usou a simetria da PA e chegou à média 90."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-29",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Recorrência com duas populações",
  "tempoSugerido": 18,
  "enunciado": "Duas cidades vizinhas trocam moradores todo ano. A cidade X começa com 90 mil habitantes e a cidade Y com 60 mil. A cada ano, 10% dos moradores de X mudam para Y e 20% dos moradores de Y mudam para X. Não há nascimentos, mortes nem outras migrações.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine a população de cada cidade depois de um ano.",
    "respostaFinal": {
     "rotulo": "população de X, em milhares",
     "aceitas": [
      "93"
     ]
    },
    "conferencia": "0.9*90 + 0.2*60",
    "resolucao": "X fica com 90% dos seus e recebe 20% de Y: 0,9 × 90 + 0,2 × 60 = 81 + 12 = 93 mil.\nY fica com 80% dos seus e recebe 10% de X: 0,8 × 60 + 0,1 × 90 = 48 + 9 = 57 mil.\nO total continua sendo 150 mil, como esperado.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou só as saídas sem somar as entradas, ou trocou os percentuais entre as cidades."
     },
     {
      "pct": 50,
      "desc": "Chegou a 93 mil em X e 57 mil em Y, com o total preservado."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual distribuição entre as duas cidades permaneceria estável ano após ano? Justifique.",
    "respostaFinal": {
     "rotulo": "população de X, em milhares",
     "aceitas": [
      "100"
     ]
    },
    "conferencia": "150 * 2 / 3",
    "resolucao": "No equilíbrio, o número de pessoas que saem de X é igual ao número que entra: 0,1·X = 0,2·Y.\nLogo X = 2Y, e como X + Y = 150 mil, temos 3Y = 150 mil.\nEntão Y = 50 mil e X = 100 mil.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Iterou vários anos e observou a tendência sem equacionar o equilíbrio, ou escreveu 0,2·X = 0,1·Y."
     },
     {
      "pct": 50,
      "desc": "Equacionou a igualdade dos fluxos com o total constante e chegou a 100 mil em X e 50 mil em Y."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Sequências e recorrências",
  "id": "seq-30",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Sequência e paridade",
  "tempoSugerido": 15,
  "enunciado": "Uma sequência é definida por d₁ = 4, d₂ = 7 e d_{n+2} = d_{n+1} + d_n.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule d₈.",
    "respostaFinal": {
     "rotulo": "valor de d₈",
     "aceitas": [
      "123"
     ]
    },
    "conferencia": "76 + 47",
    "resolucao": "d₃ = 11, d₄ = 18, d₅ = 29, d₆ = 47, d₇ = 76.\nEntão d₈ = d₇ + d₆ = 76 + 47 = 123.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Perdeu um passo da iteração, ou somou os termos alternados."
     },
     {
      "pct": 50,
      "desc": "Iterou corretamente e chegou a d₈ = 123."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Determine a paridade de d₂₀₂₆ sem calcular o termo. Justifique.",
    "respostaFinal": {
     "rotulo": "paridade",
     "aceitas": [
      "par"
     ]
    },
    "resolucao": "As paridades dos termos são: par, ímpar, ímpar, par, ímpar, ímpar, …\nElas se repetem num ciclo de comprimento 3, e os termos pares são os de posição 1, 4, 7, … — isto é, posição ≡ 1 (mod 3).\nComo 2.026 = 3 × 675 + 1, o termo d₂₀₂₆ ocupa no ciclo a mesma posição de d₁.\nLogo, d₂₀₂₆ é par.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Listou as paridades iniciais sem identificar o ciclo, ou identificou o ciclo mas errou o resto da divisão."
     },
     {
      "pct": 50,
      "desc": "Identificou o ciclo de paridade de comprimento 3, usou o resto de 2.026 por 3 e concluiu que d₂₀₂₆ é par."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-01",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Contagem com restrição",
  "tempoSugerido": 12,
  "enunciado": "Um banco exige senhas de 4 dígitos, escolhidos entre 0 e 9, com uma única restrição: não pode haver dois dígitos iguais em posições consecutivas.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantas senhas diferentes atendem à exigência do banco?",
    "respostaFinal": {
     "rotulo": "senhas",
     "aceitas": [
      "7290"
     ]
    },
    "conferencia": "10*9*9*9",
    "resolucao": "O primeiro dígito é livre: 10 opções.\nCada um dos três seguintes só não pode repetir o dígito imediatamente anterior: 9 opções cada.\nTotal: 10 × 9 × 9 × 9 = 7.290 senhas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apenas o número, sem indicar o raciocínio."
     },
     {
      "pct": 25,
      "desc": "Usou 9 opções também para o primeiro dígito, ou tratou a restrição como \"todos distintos\" e calculou 10 × 9 × 8 × 7."
     },
     {
      "pct": 50,
      "desc": "Montou 10 × 9 × 9 × 9 e chegou a 7.290 senhas."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Quantas senhas de 4 dígitos têm todos os dígitos distintos?",
    "respostaFinal": {
     "rotulo": "senhas",
     "aceitas": [
      "5040"
     ]
    },
    "conferencia": "10*9*8*7",
    "resolucao": "Agora cada dígito exclui todos os anteriores: 10 × 9 × 8 × 7 = 5.040 senhas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou combinação em vez de arranjo, esquecendo que a ordem dos dígitos importa."
     },
     {
      "pct": 50,
      "desc": "Montou o arranjo 10 × 9 × 8 × 7 e chegou a 5.040 senhas."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-02",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Combinação e complementar",
  "tempoSugerido": 12,
  "enunciado": "Um conselho tem 6 homens e 5 mulheres. Será formada uma comissão de 4 pessoas.",
  "itens": [
   {
    "id": "a",
    "comando": "De quantas maneiras a comissão pode ser formada?",
    "respostaFinal": {
     "rotulo": "comissões",
     "aceitas": [
      "330"
     ]
    },
    "conferencia": "11*10*9*8/(4*3*2*1)",
    "resolucao": "A ordem de escolha não importa, então é uma combinação de 11 pessoas tomadas 4 a 4.\nC(11,4) = (11 × 10 × 9 × 8)/(4 × 3 × 2 × 1) = 7.920/24 = 330 comissões.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou arranjo em vez de combinação (7.920), ou somou as escolhas em vez de multiplicar."
     },
     {
      "pct": 50,
      "desc": "Calculou C(11,4) e chegou a 330 comissões."
     }
    ]
   },
   {
    "id": "b",
    "comando": "De quantas maneiras a comissão pode ser formada com pelo menos uma mulher?",
    "respostaFinal": {
     "rotulo": "comissões",
     "aceitas": [
      "315"
     ]
    },
    "conferencia": "330 - 6*5*4*3/(4*3*2*1)",
    "resolucao": "É mais curto contar pelo complementar: total menos as comissões só de homens.\nSó de homens: C(6,4) = 15.\nLogo, 330 − 15 = 315 comissões com pelo menos uma mulher.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Tentou somar os casos de 1, 2, 3 e 4 mulheres e errou algum deles, ou contou C(5,1)×C(10,3), que conta a mesma comissão várias vezes."
     },
     {
      "pct": 50,
      "desc": "Usou o complementar (330 − 15) e chegou a 315 comissões."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-03",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Permutação com repetição",
  "tempoSugerido": 10,
  "enunciado": "Considere os anagramas — todas as trocas de ordem das letras — das palavras ARARA e BANANA.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantos anagramas tem a palavra ARARA?",
    "respostaFinal": {
     "rotulo": "anagramas",
     "aceitas": [
      "10"
     ]
    },
    "conferencia": "(5*4*3*2*1)/((3*2*1)*(2*1))",
    "resolucao": "São 5 letras com A repetido 3 vezes e R repetido 2 vezes.\nO total é 5!/(3!·2!) = 120/12 = 10 anagramas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou 5! = 120 sem dividir pelas repetições, ou dividiu por apenas uma delas."
     },
     {
      "pct": 50,
      "desc": "Dividiu pelos fatoriais das repetições e chegou a 10 anagramas."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Quantos anagramas tem a palavra BANANA?",
    "respostaFinal": {
     "rotulo": "anagramas",
     "aceitas": [
      "60"
     ]
    },
    "conferencia": "(6*5*4*3*2*1)/((3*2*1)*(2*1))",
    "resolucao": "São 6 letras: A aparece 3 vezes, N aparece 2 vezes e B, 1 vez.\nTotal: 6!/(3!·2!) = 720/12 = 60 anagramas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Contou as repetições erradas (por exemplo, A duas vezes), ou não dividiu pelo fatorial do N."
     },
     {
      "pct": 50,
      "desc": "Aplicou a permutação com repetição e chegou a 60 anagramas."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-04",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Probabilidade em torneio",
  "tempoSugerido": 15,
  "enunciado": "Quatro times disputam um torneio eliminatório: dois jogos de semifinal e uma final. O time A vence qualquer adversário com probabilidade 0,6, em qualquer jogo, e não há empates.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a probabilidade de o time A ser campeão?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "0,36",
      "0.36",
      "36%"
     ]
    },
    "conferencia": "0.6 * 0.6",
    "resolucao": "Para ser campeão, A precisa vencer a semifinal e a final.\nComo os jogos são independentes: 0,6 × 0,6 = 0,36.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou as probabilidades (1,2) ou considerou apenas um jogo (0,6)."
     },
     {
      "pct": 50,
      "desc": "Multiplicou as duas vitórias e chegou a 0,36."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a probabilidade de o time A chegar à final e perdê-la?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "0,24",
      "0.24",
      "24%"
     ]
    },
    "conferencia": "0.6 * 0.4",
    "resolucao": "A precisa vencer a semifinal (0,6) e perder a final (1 − 0,6 = 0,4).\nLogo: 0,6 × 0,4 = 0,24.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou 0,4 nos dois jogos, ou calculou 1 − 0,36 = 0,64, que inclui também perder a semifinal."
     },
     {
      "pct": 50,
      "desc": "Montou 0,6 × 0,4 e chegou a 0,24."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-05",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Probabilidade com dois dados",
  "tempoSugerido": 12,
  "enunciado": "Dois dados honestos de seis faces são lançados simultaneamente.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a probabilidade de a soma dos resultados ser 8?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "5/36"
     ]
    },
    "conferencia": "5/36",
    "resolucao": "São 36 resultados possíveis.\nA soma 8 acontece em (2,6), (3,5), (4,4), (5,3) e (6,2): 5 casos.\nLogo, a probabilidade é 5/36.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Contou (4,4) duas vezes ou esqueceu de contar os pares em ordem invertida, ou usou 12 resultados possíveis."
     },
     {
      "pct": 50,
      "desc": "Listou os 5 casos favoráveis entre 36 e chegou a 5/36."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a probabilidade de a soma ser maior que 9?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "1/6"
     ]
    },
    "conferencia": "6/36",
    "resolucao": "Soma 10: 3 casos; soma 11: 2 casos; soma 12: 1 caso.\nSão 6 casos favoráveis em 36, ou seja, 6/36 = 1/6.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Incluiu a soma 9, ou contou apenas a soma 10."
     },
     {
      "pct": 50,
      "desc": "Somou os casos de 10, 11 e 12 e chegou a 1/6."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-06",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Probabilidade sem reposição",
  "tempoSugerido": 12,
  "enunciado": "De um baralho comum de 52 cartas, com 13 cartas de cada um dos quatro naipes, retiram-se duas cartas ao acaso, sem reposição.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a probabilidade de as duas cartas serem do mesmo naipe?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "4/17"
     ]
    },
    "conferencia": "12/51",
    "resolucao": "A primeira carta pode ser qualquer uma.\nDepois dela, restam 51 cartas, das quais 12 são do mesmo naipe.\nLogo, a probabilidade é 12/51 = 4/17.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apenas o valor, sem indicar o raciocínio."
     },
     {
      "pct": 25,
      "desc": "Usou 13/52 × 13/52, tratando as retiradas como se houvesse reposição, ou não descontou a carta já retirada do próprio naipe."
     },
     {
      "pct": 50,
      "desc": "Percebeu que a primeira carta é livre mas errou o denominador da segunda."
     },
     {
      "pct": 75,
      "desc": "Montou 12/51 e errou apenas a simplificação."
     },
     {
      "pct": 100,
      "desc": "Chegou a 12/51, ou seja, 4/17."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-07",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Urna sem reposição",
  "tempoSugerido": 12,
  "enunciado": "Uma urna contém 5 fichas azuis e 3 vermelhas. Duas fichas são retiradas ao acaso, sem reposição.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a probabilidade de as duas serem azuis?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "5/14"
     ]
    },
    "conferencia": "(5*4)/(8*7)",
    "resolucao": "A probabilidade de a primeira ser azul é 5/8; da segunda, 4/7.\nMultiplicando: 20/56 = 5/14.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou 5/8 nas duas retiradas, ignorando a ausência de reposição."
     },
     {
      "pct": 50,
      "desc": "Multiplicou 5/8 por 4/7 e chegou a 5/14."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a probabilidade de sair uma ficha de cada cor?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "15/28"
     ]
    },
    "conferencia": "2*(5*3)/(8*7)",
    "resolucao": "Azul depois vermelha: (5/8)(3/7) = 15/56.\nVermelha depois azul: (3/8)(5/7) = 15/56.\nSomando as duas ordens: 30/56 = 15/28.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Considerou apenas uma das ordens (15/56), ou somou as probabilidades de cada cor isoladamente."
     },
     {
      "pct": 50,
      "desc": "Somou as duas ordens e chegou a 15/28."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-08",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Probabilidade condicional",
  "tempoSugerido": 20,
  "enunciado": "Uma doença atinge 2% de certa população. Um exame acusa corretamente 95% das pessoas doentes, mas também acusa 10% das pessoas saudáveis (falso positivo). Uma pessoa é sorteada e o exame dá positivo.",
  "itens": [
   {
    "id": "a",
    "comando": "Que porcentagem da população recebe resultado positivo no exame?",
    "respostaFinal": {
     "rotulo": "porcentagem",
     "aceitas": [
      "11,7%",
      "11,7",
      "11.7"
     ]
    },
    "conferencia": "0.02*95 + 0.98*10",
    "resolucao": "Positivos verdadeiros: 2% × 95% = 1,9% da população.\nFalsos positivos: 98% × 10% = 9,8% da população.\nTotal de positivos: 1,9% + 9,8% = 11,7%.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Considerou apenas os positivos verdadeiros (1,9%), ou somou 95% e 10% diretamente."
     },
     {
      "pct": 50,
      "desc": "Somou os dois caminhos que levam ao positivo e chegou a 11,7%."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a probabilidade de a pessoa estar realmente doente, dado que o exame deu positivo?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "16,2%",
      "0,162",
      "0.162"
     ],
     "intervalo": [
      0.16,
      0.165
     ]
    },
    "conferencia": "(0.02*0.95) / (0.02*0.95 + 0.98*0.10)",
    "resolucao": "Entre os 11,7% de positivos, apenas 1,9% são doentes de verdade.\nEntão a probabilidade é 1,9/11,7 ≈ 0,162, ou cerca de 16,2%.\nMesmo com um exame que acerta 95% dos doentes, a maioria dos positivos é falsa — porque a doença é rara.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Respondeu 95%, confundindo a probabilidade de o exame acusar um doente com a de um positivo ser doente."
     },
     {
      "pct": 50,
      "desc": "Montou a razão entre os positivos verdadeiros e o total de positivos e chegou a aproximadamente 16,2%."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-09",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Contagem de caminhos",
  "tempoSugerido": 15,
  "enunciado": "Em um bairro de ruas perpendiculares, um entregador sai do ponto A e precisa chegar ao ponto B, que fica 4 quarteirões a leste e 3 quarteirões ao norte. Ele só anda para leste ou para o norte, um quarteirão por vez.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantos caminhos diferentes o entregador pode fazer?",
    "respostaFinal": {
     "rotulo": "caminhos",
     "aceitas": [
      "35"
     ]
    },
    "conferencia": "(7*6*5)/(3*2*1)",
    "resolucao": "Todo caminho tem 7 movimentos: 4 para leste e 3 para o norte.\nBasta escolher quais 3 dos 7 movimentos serão para o norte: C(7,3) = 35 caminhos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Multiplicou 4 por 3, ou calculou 7! sem dividir pelas repetições de cada direção."
     },
     {
      "pct": 50,
      "desc": "Reconheceu a escolha de 3 movimentos entre 7 e chegou a 35 caminhos."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Se houver um ponto de recarga obrigatório C, situado 2 quarteirões a leste e 1 ao norte de A, quantos caminhos passam por ele?",
    "respostaFinal": {
     "rotulo": "caminhos",
     "aceitas": [
      "18"
     ]
    },
    "conferencia": "((3*2)/(2*1)) * ((4*3*2)/(2*1)/(2*1))",
    "resolucao": "De A até C: 3 movimentos, 1 deles ao norte — C(3,1) = 3 caminhos.\nDe C até B faltam 2 a leste e 2 ao norte: C(4,2) = 6 caminhos.\nPelo princípio multiplicativo: 3 × 6 = 18 caminhos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou os dois trechos em vez de multiplicar, ou errou as coordenadas do trecho de C até B."
     },
     {
      "pct": 50,
      "desc": "Multiplicou os caminhos dos dois trechos e chegou a 18."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-10",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Distribuição de objetos idênticos",
  "tempoSugerido": 15,
  "enunciado": "Dez bolsas de estudo idênticas serão distribuídas entre 4 escolas, e cada escola deve receber pelo menos uma bolsa.",
  "itens": [
   {
    "id": "unico",
    "comando": "De quantas maneiras a distribuição pode ser feita?",
    "respostaFinal": {
     "rotulo": "maneiras",
     "aceitas": [
      "84"
     ]
    },
    "conferencia": "(9*8*7)/(3*2*1)",
    "resolucao": "Dando uma bolsa a cada escola de saída, sobram 6 bolsas para distribuir livremente entre as 4 escolas.\nEquivalentemente, alinhamos as 10 bolsas e escolhemos 3 dos 9 espaços entre elas para separar as escolas.\nC(9,3) = 84 maneiras.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apenas o número, sem indicar o raciocínio."
     },
     {
      "pct": 25,
      "desc": "Tratou as bolsas como distintas e calculou 4¹⁰, ou ignorou a exigência de pelo menos uma por escola."
     },
     {
      "pct": 50,
      "desc": "Montou o modelo de separadores mas errou quantos espaços ou quantas barras existem."
     },
     {
      "pct": 75,
      "desc": "Chegou a C(9,3) e errou apenas a conta."
     },
     {
      "pct": 100,
      "desc": "Concluiu que são 84 maneiras."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-11",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Princípio da casa dos pombos",
  "tempoSugerido": 12,
  "enunciado": "Uma sala tem 40 pessoas.",
  "itens": [
   {
    "id": "a",
    "comando": "Mostre que pelo menos 4 delas fazem aniversário no mesmo mês.",
    "resolucao": "São 12 meses possíveis.\nSe cada mês tivesse no máximo 3 aniversariantes, caberiam no máximo 12 × 3 = 36 pessoas.\nComo há 40 pessoas, algum mês precisa ter pelo menos 4 aniversariantes.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu 40 por 12 e apresentou o resultado sem o argumento por absurdo que fecha a demonstração."
     },
     {
      "pct": 50,
      "desc": "Mostrou que 12 × 3 = 36 < 40 e concluiu que algum mês tem ao menos 4 aniversariantes."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o menor número de pessoas que garante que pelo menos 5 façam aniversário no mesmo mês?",
    "respostaFinal": {
     "rotulo": "pessoas",
     "aceitas": [
      "49"
     ]
    },
    "conferencia": "12*4 + 1",
    "resolucao": "Com 48 pessoas é possível ter exatamente 4 por mês, sem nenhum mês com 5.\nCom 49, o princípio da casa dos pombos garante que algum mês tenha 5.\nLogo, o menor número é 49.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Respondeu 48, sem somar a pessoa que força o quinto aniversariante, ou multiplicou 12 por 5."
     },
     {
      "pct": 50,
      "desc": "Concluiu que são 49 pessoas, exibindo a distribuição de 48 que ainda não garante."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-12",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Permutação circular",
  "tempoSugerido": 12,
  "enunciado": "Oito pessoas vão se sentar ao redor de uma mesa redonda. Duas disposições são consideradas iguais quando uma pode ser obtida da outra por rotação da mesa.",
  "itens": [
   {
    "id": "a",
    "comando": "De quantas maneiras elas podem se sentar?",
    "respostaFinal": {
     "rotulo": "maneiras",
     "aceitas": [
      "5040"
     ]
    },
    "conferencia": "7*6*5*4*3*2*1",
    "resolucao": "Fixando uma pessoa para eliminar as rotações equivalentes, restam 7 lugares a permutar.\nLogo, são 7! = 5.040 maneiras.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou 8! = 40.320, sem descontar as rotações equivalentes."
     },
     {
      "pct": 50,
      "desc": "Fixou uma pessoa e chegou a 7! = 5.040 maneiras."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Em quantas dessas disposições duas pessoas determinadas ficam lado a lado?",
    "respostaFinal": {
     "rotulo": "maneiras",
     "aceitas": [
      "1440"
     ]
    },
    "conferencia": "2*(6*5*4*3*2*1)",
    "resolucao": "Tratando as duas pessoas como um bloco único, sobram 7 elementos numa mesa redonda: 6! = 720 disposições.\nDentro do bloco, as duas podem trocar de lugar: × 2.\nTotal: 2 × 720 = 1.440 disposições.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Esqueceu de multiplicar por 2 a troca dentro do bloco, ou usou 7! para o bloco."
     },
     {
      "pct": 50,
      "desc": "Aplicou a técnica do bloco na mesa redonda e chegou a 1.440 disposições."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-13",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Princípio multiplicativo",
  "tempoSugerido": 10,
  "enunciado": "Um sistema de identificação usa códigos formados por 3 letras (de um alfabeto de 26) seguidas de 4 algarismos, podendo haver repetição em ambos os blocos.",
  "itens": [
   {
    "id": "unico",
    "comando": "Quantos códigos diferentes o sistema pode gerar?",
    "respostaFinal": {
     "rotulo": "códigos",
     "aceitas": [
      "175760000"
     ]
    },
    "conferencia": "Math.pow(26,3) * Math.pow(10,4)",
    "resolucao": "Cada uma das 3 letras tem 26 opções: 26³ = 17.576.\nCada um dos 4 algarismos tem 10 opções: 10⁴ = 10.000.\nTotal: 17.576 × 10.000 = 175.760.000 códigos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou os dois blocos em vez de multiplicar, ou usou arranjo sem repetição em algum deles."
     },
     {
      "pct": 50,
      "desc": "Calculou 26³ e 10⁴ corretamente mas não multiplicou os dois blocos."
     },
     {
      "pct": 75,
      "desc": "Montou 26³ × 10⁴ e errou apenas a conta final."
     },
     {
      "pct": 100,
      "desc": "Chegou a 175.760.000 códigos."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-14",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Contagem por complementar",
  "tempoSugerido": 12,
  "enunciado": "Sete pessoas serão organizadas em fila. Duas delas se desentenderam e não podem ficar em posições vizinhas.",
  "itens": [
   {
    "id": "unico",
    "comando": "De quantas maneiras a fila pode ser formada?",
    "respostaFinal": {
     "rotulo": "filas",
     "aceitas": [
      "3600"
     ]
    },
    "conferencia": "5040 - 2*720",
    "resolucao": "Sem restrição são 7! = 5.040 filas.\nAs filas em que as duas ficam juntas: trate-as como bloco (6! = 720) e permute-as dentro do bloco (× 2), dando 1.440.\nLogo: 5.040 − 1.440 = 3.600 filas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Contou apenas as filas com as duas juntas, ou esqueceu de multiplicar o bloco por 2."
     },
     {
      "pct": 50,
      "desc": "Montou a subtração mas errou o número de filas com o bloco."
     },
     {
      "pct": 75,
      "desc": "Montou 5.040 − 1.440 e errou apenas a subtração."
     },
     {
      "pct": 100,
      "desc": "Chegou a 3.600 filas."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-15",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Distribuição binomial",
  "tempoSugerido": 12,
  "enunciado": "Uma moeda honesta é lançada 5 vezes.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a probabilidade de sair exatamente 3 caras?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "5/16"
     ]
    },
    "conferencia": "((5*4*3)/(3*2*1)) / 32",
    "resolucao": "São 2⁵ = 32 sequências igualmente prováveis.\nAs que têm exatamente 3 caras são C(5,3) = 10.\nLogo, a probabilidade é 10/32 = 5/16.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou 3/5, ou contou as sequências sem o coeficiente binomial."
     },
     {
      "pct": 50,
      "desc": "Contou 10 casos em 32 e chegou a 5/16."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a probabilidade de sair pelo menos uma cara?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "31/32"
     ]
    },
    "conferencia": "1 - 1/32",
    "resolucao": "O complementar de \"pelo menos uma cara\" é \"nenhuma cara\", que tem probabilidade 1/32.\nLogo: 1 − 1/32 = 31/32.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou as probabilidades de 1, 2, 3, 4 e 5 caras e errou alguma, ou respondeu 1/2."
     },
     {
      "pct": 50,
      "desc": "Usou o complementar e chegou a 31/32."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-16",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Probabilidade geométrica",
  "tempoSugerido": 15,
  "enunciado": "Um ponto é sorteado ao acaso, com igual chance em qualquer posição, dentro de um quadrado de lado 2 m. Considere π = 3,14.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a probabilidade de o ponto estar a menos de 1 m do centro do quadrado?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "0,785",
      "0.785",
      "78,5%"
     ],
     "intervalo": [
      0.78,
      0.79
     ]
    },
    "conferencia": "(3.14 * 1 * 1) / (2*2)",
    "resolucao": "Os pontos a menos de 1 m do centro formam um círculo de raio 1, de área π × 1² = 3,14 m².\nO quadrado tem área 2 × 2 = 4 m².\nA probabilidade é a razão entre as áreas: 3,14/4 = 0,785.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou razão entre comprimentos em vez de áreas, ou tomou o círculo com raio 2."
     },
     {
      "pct": 50,
      "desc": "Calculou as duas áreas mas não fez a razão."
     },
     {
      "pct": 75,
      "desc": "Montou 3,14/4 e errou apenas a divisão."
     },
     {
      "pct": 100,
      "desc": "Chegou à probabilidade 0,785."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-17",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Sorteio com reposição",
  "tempoSugerido": 12,
  "enunciado": "Uma caixa tem 10 fichas numeradas de 1 a 10. Três fichas são sorteadas, uma de cada vez, com a ficha sendo devolvida à caixa após cada sorteio.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a probabilidade de a ficha 7 nunca ser sorteada?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "0,729",
      "0.729",
      "729/1000"
     ]
    },
    "conferencia": "Math.pow(0.9, 3)",
    "resolucao": "Em cada sorteio, a probabilidade de não sair a ficha 7 é 9/10.\nComo há reposição, os sorteios são independentes: (9/10)³ = 0,729.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Multiplicou 9/10 × 8/9 × 7/8, tratando o sorteio como se fosse sem reposição."
     },
     {
      "pct": 50,
      "desc": "Elevou 9/10 ao cubo e chegou a 0,729."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a probabilidade de a ficha 7 sair pelo menos uma vez?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "0,271",
      "0.271"
     ]
    },
    "conferencia": "1 - Math.pow(0.9, 3)",
    "resolucao": "É o complementar do item anterior: 1 − 0,729 = 0,271.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou 1/10 três vezes, chegando a 0,3, o que conta em duplicidade os casos com repetição."
     },
     {
      "pct": 50,
      "desc": "Usou o complementar e chegou a 0,271."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-18",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Combinação com grupos",
  "tempoSugerido": 12,
  "enunciado": "Uma banca de avaliação será formada por 5 professores de exatas, escolhidos entre 8, e 3 professores de humanas, escolhidos entre 6.",
  "itens": [
   {
    "id": "unico",
    "comando": "De quantas maneiras a banca pode ser formada?",
    "respostaFinal": {
     "rotulo": "bancas",
     "aceitas": [
      "1120"
     ]
    },
    "conferencia": "((8*7*6*5*4)/(5*4*3*2*1)) * ((6*5*4)/(3*2*1))",
    "resolucao": "Exatas: C(8,5) = 56.\nHumanas: C(6,3) = 20.\nAs escolhas são independentes, então multiplicam-se: 56 × 20 = 1.120 bancas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou as duas combinações (76), ou calculou C(14,8) misturando os dois grupos."
     },
     {
      "pct": 50,
      "desc": "Calculou uma das combinações corretamente e errou a outra."
     },
     {
      "pct": 75,
      "desc": "Chegou a 56 e 20 e errou apenas o produto."
     },
     {
      "pct": 100,
      "desc": "Multiplicou as duas combinações e chegou a 1.120 bancas."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-19",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Contagem de números",
  "tempoSugerido": 15,
  "enunciado": "Considere os números naturais de quatro algarismos distintos entre si.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantos são esses números?",
    "respostaFinal": {
     "rotulo": "números",
     "aceitas": [
      "4536"
     ]
    },
    "conferencia": "9*9*8*7",
    "resolucao": "O primeiro algarismo não pode ser 0: 9 opções.\nO segundo pode ser 0, mas não o já usado: 9 opções. Depois, 8 e 7.\nTotal: 9 × 9 × 8 × 7 = 4.536 números.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou 10 opções no primeiro algarismo, incluindo números que começam com zero."
     },
     {
      "pct": 50,
      "desc": "Tratou a restrição do zero corretamente e chegou a 4.536 números."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Quantos deles começam com algarismo par?",
    "respostaFinal": {
     "rotulo": "números",
     "aceitas": [
      "2016"
     ]
    },
    "conferencia": "4*9*8*7",
    "resolucao": "O primeiro algarismo deve ser par e diferente de zero: 2, 4, 6 ou 8 — 4 opções.\nOs outros três são escolhidos entre os 9 algarismos restantes: 9 × 8 × 7 = 504.\nTotal: 4 × 504 = 2.016 números.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Incluiu o zero entre os pares possíveis para a primeira posição (5 opções), ou dividiu o total do item (a) por 2."
     },
     {
      "pct": 50,
      "desc": "Excluiu o zero da primeira posição e chegou a 2.016 números."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-20",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Probabilidade de pelo menos um",
  "tempoSugerido": 12,
  "enunciado": "Um equipamento tem 4 componentes que funcionam de forma independente. Cada componente falha, em um ano, com probabilidade 0,1.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a probabilidade de nenhum componente falhar no ano?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "0,6561",
      "0.6561"
     ]
    },
    "conferencia": "Math.pow(0.9, 4)",
    "resolucao": "Cada componente não falha com probabilidade 0,9.\nComo são independentes: 0,9⁴ = 0,6561.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou as probabilidades, ou usou expoente 3."
     },
     {
      "pct": 50,
      "desc": "Elevou 0,9 à quarta e chegou a 0,6561."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a probabilidade de pelo menos um componente falhar?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "0,3439",
      "0.3439"
     ]
    },
    "conferencia": "1 - Math.pow(0.9, 4)",
    "resolucao": "É o complementar: 1 − 0,6561 = 0,3439.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou 0,1 quatro vezes, chegando a 0,4, o que conta em duplicidade os casos de falha múltipla."
     },
     {
      "pct": 50,
      "desc": "Usou o complementar e chegou a 0,3439."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-21",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Passeio aleatório",
  "tempoSugerido": 15,
  "enunciado": "Um jogador começa com saldo zero. Em cada uma de 4 rodadas independentes, ele ganha 1 ponto ou perde 1 ponto, cada resultado com probabilidade 1/2.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a probabilidade de o saldo voltar a zero ao fim das 4 rodadas?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "3/8"
     ]
    },
    "conferencia": "((4*3)/(2*1)) / 16",
    "resolucao": "Voltar a zero exige 2 vitórias e 2 derrotas.\nHá C(4,2) = 6 sequências assim, entre 2⁴ = 16 possíveis.\nLogo: 6/16 = 3/8.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Contou apenas uma sequência favorável, ou usou 1/2 como resposta por simetria."
     },
     {
      "pct": 50,
      "desc": "Contou 6 sequências em 16 e chegou a 3/8."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a probabilidade de o saldo final ser positivo?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "5/16"
     ]
    },
    "conferencia": "(4 + 1)/16",
    "resolucao": "O saldo é positivo com 3 vitórias (C(4,3) = 4 casos) ou 4 vitórias (1 caso).\nSão 5 casos em 16, ou seja, 5/16.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Respondeu 1/2, esquecendo que o saldo zero também é possível e não é positivo."
     },
     {
      "pct": 50,
      "desc": "Somou os casos de 3 e 4 vitórias e chegou a 5/16."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-22",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Arranjo",
  "tempoSugerido": 10,
  "enunciado": "Três prêmios diferentes — primeiro, segundo e terceiro lugares — serão distribuídos entre 6 finalistas, e ninguém pode receber mais de um prêmio.",
  "itens": [
   {
    "id": "unico",
    "comando": "De quantas maneiras a premiação pode ser feita?",
    "respostaFinal": {
     "rotulo": "maneiras",
     "aceitas": [
      "120"
     ]
    },
    "conferencia": "6*5*4",
    "resolucao": "Como os prêmios são diferentes, a ordem importa: é um arranjo.\n6 opções para o primeiro lugar, 5 para o segundo e 4 para o terceiro.\nTotal: 6 × 5 × 4 = 120 maneiras.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou combinação (20), tratando os prêmios como iguais."
     },
     {
      "pct": 50,
      "desc": "Reconheceu que a ordem importa mas errou a conta."
     },
     {
      "pct": 75,
      "desc": "Montou 6 × 5 × 4 e errou apenas o produto."
     },
     {
      "pct": 100,
      "desc": "Chegou a 120 maneiras."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-23",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Sequências binárias",
  "tempoSugerido": 12,
  "enunciado": "Um sensor registra, a cada minuto, 0 (parado) ou 1 (em movimento), formando sequências de 8 registros.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantas sequências diferentes o sensor pode registrar em 8 minutos?",
    "respostaFinal": {
     "rotulo": "sequências",
     "aceitas": [
      "256"
     ]
    },
    "conferencia": "Math.pow(2, 8)",
    "resolucao": "Cada minuto tem 2 possibilidades, e são 8 minutos independentes.\nTotal: 2⁸ = 256 sequências.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Multiplicou 8 por 2, ou usou 8²."
     },
     {
      "pct": 50,
      "desc": "Aplicou o princípio multiplicativo e chegou a 256 sequências."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Em quantas dessas sequências aparecem exatamente três registros iguais a 1?",
    "respostaFinal": {
     "rotulo": "sequências",
     "aceitas": [
      "56"
     ]
    },
    "conferencia": "(8*7*6)/(3*2*1)",
    "resolucao": "Basta escolher quais 3 dos 8 minutos terão o registro 1.\nC(8,3) = 56 sequências.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou arranjo (336), tratando as posições como ordenadas entre si."
     },
     {
      "pct": 50,
      "desc": "Calculou C(8,3) e chegou a 56 sequências."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-24",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Amostragem e controle de qualidade",
  "tempoSugerido": 15,
  "enunciado": "Um lote tem 20 peças, das quais 3 são defeituosas. O controle de qualidade retira 4 peças ao acaso, sem reposição, e aprova o lote se nenhuma delas for defeituosa.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a probabilidade de o lote ser aprovado?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "0,491",
      "0.491"
     ],
     "intervalo": [
      0.488,
      0.494
     ]
    },
    "conferencia": "(17*16*15*14) / (20*19*18*17)",
    "resolucao": "As 4 peças precisam sair entre as 17 boas.\nP = (17/20)(16/19)(15/18)(14/17) = 57.120/116.280.\nLogo, a probabilidade é aproximadamente 0,491.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou (17/20)⁴, tratando a retirada como se houvesse reposição, ou calculou 17/20 e parou."
     },
     {
      "pct": 50,
      "desc": "Montou a razão entre as combinações mas errou algum dos fatores."
     },
     {
      "pct": 75,
      "desc": "Montou a expressão correta e errou apenas a conta final."
     },
     {
      "pct": 100,
      "desc": "Chegou a aproximadamente 0,491."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-25",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Combinação em loteria",
  "tempoSugerido": 12,
  "enunciado": "Em uma loteria, o apostador escolhe 6 números distintos entre 30 disponíveis, sem que a ordem importe.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantas apostas diferentes existem?",
    "respostaFinal": {
     "rotulo": "apostas",
     "aceitas": [
      "593775"
     ]
    },
    "conferencia": "(30*29*28*27*26*25)/(6*5*4*3*2*1)",
    "resolucao": "C(30,6) = (30 × 29 × 28 × 27 × 26 × 25)/(6 × 5 × 4 × 3 × 2 × 1).\nO numerador é 427.518.000 e o denominador é 720.\nLogo, são 593.775 apostas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou arranjo, sem dividir por 6!, ou usou 30⁶."
     },
     {
      "pct": 50,
      "desc": "Montou a combinação mas errou a conta."
     },
     {
      "pct": 75,
      "desc": "Montou C(30,6) corretamente e errou apenas a divisão final."
     },
     {
      "pct": 100,
      "desc": "Chegou a 593.775 apostas."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Um apostador faz 15 apostas diferentes. Qual é a probabilidade de ele acertar a aposta premiada?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "15/593775",
      "1/39585"
     ]
    },
    "conferencia": "15/593775",
    "resolucao": "Cada aposta tem probabilidade 1/593.775 de ser a premiada, e as 15 são distintas.\nLogo, a probabilidade é 15/593.775 = 1/39.585.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Multiplicou as probabilidades em vez de somá-las, ou apresentou 15 × 593.775."
     },
     {
      "pct": 50,
      "desc": "Somou as 15 chances distintas e chegou a 15/593775, isto é, 1 em 39.585."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-26",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Complementar com repetição",
  "tempoSugerido": 15,
  "enunciado": "Cinco pessoas são escolhidas ao acaso. Suponha que cada uma tenha a mesma chance de fazer aniversário em qualquer um dos 12 meses, de forma independente.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a probabilidade de todas fazerem aniversário em meses diferentes?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "0,382",
      "0.382"
     ],
     "intervalo": [
      0.379,
      0.385
     ]
    },
    "conferencia": "(12*11*10*9*8)/Math.pow(12,5)",
    "resolucao": "Total de configurações: 12⁵ = 248.832.\nCom meses distintos: 12 × 11 × 10 × 9 × 8 = 95.040.\nProbabilidade: 95.040/248.832 ≈ 0,382.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou combinação em vez de arranjo no numerador, ou usou 12! no denominador."
     },
     {
      "pct": 50,
      "desc": "Montou a razão corretamente e chegou a aproximadamente 0,382."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a probabilidade de pelo menos duas delas fazerem aniversário no mesmo mês?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "0,618",
      "0.618"
     ],
     "intervalo": [
      0.615,
      0.621
     ]
    },
    "conferencia": "1 - (12*11*10*9*8)/Math.pow(12,5)",
    "resolucao": "É o complementar do item anterior: 1 − 0,382 ≈ 0,618.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Tentou somar os casos de coincidência dupla, tripla etc. e errou a contagem."
     },
     {
      "pct": 50,
      "desc": "Usou o complementar e chegou a aproximadamente 0,618."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-27",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Probabilidade total",
  "tempoSugerido": 15,
  "enunciado": "Duas urnas têm bolas coloridas. A urna I tem 4 bolas brancas e 6 pretas; a urna II tem 7 brancas e 3 pretas. Sorteia-se uma urna com igual chance e, dela, retira-se uma bola.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a probabilidade de a bola retirada ser branca?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "0,55",
      "0.55",
      "11/20"
     ]
    },
    "conferencia": "0.5*0.4 + 0.5*0.7",
    "resolucao": "Pela urna I: (1/2)(4/10) = 0,2.\nPela urna II: (1/2)(7/10) = 0,35.\nSomando os dois caminhos: 0,55.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Juntou as bolas das duas urnas num único conjunto de 20, ignorando o sorteio da urna."
     },
     {
      "pct": 50,
      "desc": "Somou os dois caminhos ponderados e chegou a 0,55."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Sabendo que a bola retirada é branca, qual a probabilidade de ela ter vindo da urna II?",
    "respostaFinal": {
     "rotulo": "probabilidade",
     "aceitas": [
      "7/11",
      "0,636",
      "0.636"
     ],
     "intervalo": [
      0.63,
      0.64
     ]
    },
    "conferencia": "(0.5*0.7) / (0.5*0.4 + 0.5*0.7)",
    "resolucao": "Entre os 0,55 de chance de sair branca, 0,35 vieram da urna II.\nLogo: 0,35/0,55 = 7/11 ≈ 0,636.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Respondeu 0,7, confundindo a probabilidade de sair branca na urna II com a probabilidade de a urna ser a II."
     },
     {
      "pct": 50,
      "desc": "Montou a razão entre o caminho da urna II e o total de brancas e chegou a 7/11."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-28",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Princípio da inclusão-exclusão",
  "tempoSugerido": 12,
  "enunciado": "Considere os números inteiros de 1 a 1.000.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantos deles são divisíveis por 3 ou por 5?",
    "respostaFinal": {
     "rotulo": "números",
     "aceitas": [
      "467"
     ]
    },
    "conferencia": "333 + 200 - 66",
    "resolucao": "Divisíveis por 3: 333. Por 5: 200. Por 15 (contados duas vezes): 66.\nPela inclusão-exclusão: 333 + 200 − 66 = 467 números.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou 333 e 200 sem descontar os múltiplos de 15, chegando a 533."
     },
     {
      "pct": 50,
      "desc": "Aplicou a inclusão-exclusão e chegou a 467 números."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Quantos não são divisíveis nem por 3 nem por 5?",
    "respostaFinal": {
     "rotulo": "números",
     "aceitas": [
      "533"
     ]
    },
    "conferencia": "1000 - 467",
    "resolucao": "É o complementar: 1.000 − 467 = 533 números.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Subtraiu apenas os múltiplos de 3 ou apenas os de 5."
     },
     {
      "pct": 50,
      "desc": "Usou o complementar e chegou a 533 números."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-29",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Contagem com ordem parcial",
  "tempoSugerido": 12,
  "enunciado": "Cinco pessoas, entre elas Ana e Bruno, vão formar uma fila.",
  "itens": [
   {
    "id": "unico",
    "comando": "Em quantas filas Ana aparece antes de Bruno, não necessariamente ao lado dele?",
    "respostaFinal": {
     "rotulo": "filas",
     "aceitas": [
      "60"
     ]
    },
    "conferencia": "(5*4*3*2*1)/2",
    "resolucao": "São 5! = 120 filas no total.\nEm metade delas Ana vem antes de Bruno e na outra metade, depois — as duas situações são simétricas.\nLogo: 120/2 = 60 filas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Contou apenas as filas em que Ana está imediatamente antes de Bruno (48), ou apresentou 120."
     },
     {
      "pct": 50,
      "desc": "Reconheceu a simetria mas errou o total de filas."
     },
     {
      "pct": 75,
      "desc": "Montou 120/2 e errou apenas a divisão."
     },
     {
      "pct": 100,
      "desc": "Concluiu que são 60 filas."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Probabilidade e contagem",
  "id": "prob-30",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Valor esperado",
  "tempoSugerido": 15,
  "enunciado": "Um investidor avalia uma operação que, em um mês, rende R$ 50,00 com probabilidade 0,3 e perde R$ 20,00 com probabilidade 0,7.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o resultado esperado da operação em um mês?",
    "respostaFinal": {
     "rotulo": "valor em reais",
     "aceitas": [
      "1",
      "R$ 1,00"
     ]
    },
    "conferencia": "0.3*50 - 0.7*20",
    "resolucao": "O valor esperado é a média dos resultados ponderada pelas probabilidades.\nE = 0,3 × 50 + 0,7 × (−20) = 15 − 14 = R$ 1,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou 50 e −20 sem ponderar pelas probabilidades, ou usou a perda com sinal positivo."
     },
     {
      "pct": 50,
      "desc": "Ponderou os dois resultados e chegou a R$ 1,00."
     }
    ]
   },
   {
    "id": "b",
    "comando": "A partir de qual probabilidade de ganho a operação deixaria de ser vantajosa? Justifique.",
    "respostaFinal": {
     "rotulo": "probabilidade de ganho",
     "aceitas": [
      "2/7",
      "0,286",
      "0.286"
     ],
     "intervalo": [
      0.28,
      0.29
     ]
    },
    "conferencia": "20 / (50 + 20)",
    "resolucao": "Chamando de p a probabilidade de ganho, o valor esperado é 50p − 20(1 − p) = 70p − 20.\nA operação deixa de ser vantajosa quando 70p − 20 ≤ 0, ou seja, p ≤ 20/70 = 2/7 ≈ 0,286.\nAbaixo de aproximadamente 28,6% de chance de ganho, o resultado esperado passa a ser negativo.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Montou a expressão do valor esperado mas não isolou p, ou usou 20/50 em vez de 20/70."
     },
     {
      "pct": 50,
      "desc": "Isolou p corretamente e concluiu que o limite é 2/7, cerca de 0,286."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-01",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Função quadrática e receita",
  "tempoSugerido": 15,
  "enunciado": "Uma loja observou que, ao cobrar p reais por um produto, vende q = 120 − 2p unidades por dia. A receita diária é o produto do preço pela quantidade vendida.",
  "itens": [
   {
    "id": "a",
    "comando": "Escreva a receita diária em função do preço p e determine o preço que maximiza a receita.",
    "respostaFinal": {
     "rotulo": "preço em reais",
     "aceitas": [
      "30",
      "R$ 30,00"
     ]
    },
    "conferencia": "120 / (2*2)",
    "resolucao": "A receita é R(p) = p·(120 − 2p) = 120p − 2p².\nÉ uma parábola com concavidade para baixo, cujo máximo está no vértice: p = −b/(2a) = −120/(2 × (−2)) = 30.\nLogo, o preço que maximiza a receita é R$ 30,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Escreveu a receita corretamente mas procurou a raiz da parábola em vez do vértice, ou usou p = 120/2 = 60, que zera a quantidade vendida."
     },
     {
      "pct": 50,
      "desc": "Montou R(p) = 120p − 2p² e chegou ao preço de R$ 30,00 pelo vértice."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a receita diária máxima?",
    "respostaFinal": {
     "rotulo": "receita em reais",
     "aceitas": [
      "1800",
      "R$ 1.800,00"
     ]
    },
    "conferencia": "30 * (120 - 2*30)",
    "resolucao": "Com p = 30, a quantidade vendida é 120 − 60 = 60 unidades.\nA receita é 30 × 60 = R$ 1.800,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Substituiu o preço na expressão errada, ou usou a quantidade 120 sem descontar 2p."
     },
     {
      "pct": 50,
      "desc": "Substituiu p = 30 e chegou a R$ 1.800,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-02",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Sistema linear e mistura",
  "tempoSugerido": 15,
  "enunciado": "Um laboratório tem 40 litros de uma solução com 30% de álcool e quer obter uma solução com 45% de álcool, acrescentando uma segunda solução que tem 60% de álcool.",
  "itens": [
   {
    "id": "unico",
    "comando": "Quantos litros da solução de 60% devem ser acrescentados?",
    "respostaFinal": {
     "rotulo": "litros",
     "aceitas": [
      "40",
      "40 L"
     ]
    },
    "conferencia": "(0.45*40 - 0.3*40) / (0.6 - 0.45)",
    "resolucao": "Chamando de x os litros acrescentados, a quantidade de álcool é 0,3 × 40 + 0,6x e o volume final é 40 + x.\nA condição é (12 + 0,6x)/(40 + x) = 0,45.\nDaí 12 + 0,6x = 18 + 0,45x, ou 0,15x = 6, logo x = 40 litros.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apenas o número, sem indicar o raciocínio."
     },
     {
      "pct": 25,
      "desc": "Somou as concentrações diretamente (30% + 60% = 90%), ou esqueceu de somar x ao volume final do denominador."
     },
     {
      "pct": 50,
      "desc": "Montou a equação de balanço mas errou ao isolar x."
     },
     {
      "pct": 75,
      "desc": "Equacionou e resolveu corretamente, errando apenas a conta final."
     },
     {
      "pct": 100,
      "desc": "Concluiu que devem ser acrescentados 40 litros."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-03",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Função exponencial",
  "tempoSugerido": 15,
  "enunciado": "O número de máquinas antigas em operação numa fábrica cai 20% a cada ano. Hoje são 200 máquinas.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantas máquinas estarão em operação daqui a 3 anos?",
    "respostaFinal": {
     "rotulo": "máquinas",
     "aceitas": [
      "102,4",
      "102.4"
     ]
    },
    "conferencia": "200 * Math.pow(0.8, 3)",
    "resolucao": "Cair 20% ao ano é multiplicar por 0,8: N(t) = 200 × 0,8ᵗ.\nPara t = 3: 200 × 0,512 = 102,4 máquinas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Subtraiu 20% de 200 três vezes de forma linear (200 − 120 = 80), tratando a queda como constante."
     },
     {
      "pct": 50,
      "desc": "Montou 200 × 0,8³ e chegou a 102,4 máquinas."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Depois de quantos anos completos restarão menos de 50 máquinas?",
    "respostaFinal": {
     "rotulo": "anos",
     "aceitas": [
      "7",
      "7 anos"
     ]
    },
    "conferencia": "Math.ceil(Math.log(50/200) / Math.log(0.8))",
    "resolucao": "Queremos 200 × 0,8ᵗ < 50, ou seja, 0,8ᵗ < 0,25.\nTestando: 0,8⁶ = 0,262 (ainda acima) e 0,8⁷ = 0,210 (abaixo).\nLogo, são necessários 7 anos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Montou a inequação mas parou em 6 anos sem verificar que 0,8⁶ ainda deixa mais de 50 máquinas."
     },
     {
      "pct": 50,
      "desc": "Resolveu a inequação exponencial e concluiu que são 7 anos."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-04",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Logaritmo e tempo de dobra",
  "tempoSugerido": 15,
  "enunciado": "Um capital é aplicado a juros compostos de 6% ao ano. Use log 2 = 0,301 e log 1,06 = 0,0253.",
  "itens": [
   {
    "id": "unico",
    "comando": "Em quantos anos, aproximadamente, o capital dobra?",
    "respostaFinal": {
     "rotulo": "anos",
     "aceitas": [
      "11,9",
      "11.9",
      "12"
     ],
     "intervalo": [
      11.5,
      12.2
     ]
    },
    "conferencia": "0.301 / 0.0253",
    "resolucao": "Queremos 1,06ᵗ = 2.\nAplicando logaritmo: t · log 1,06 = log 2, ou seja, t = 0,301/0,0253.\nLogo t ≈ 11,9 anos — na prática, 12 anos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu 100 por 6, ou multiplicou os logaritmos em vez de dividir."
     },
     {
      "pct": 50,
      "desc": "Montou a equação exponencial mas não aplicou o logaritmo corretamente."
     },
     {
      "pct": 75,
      "desc": "Montou t = log 2 / log 1,06 e errou apenas a divisão."
     },
     {
      "pct": 100,
      "desc": "Chegou a aproximadamente 11,9 anos."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-05",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Ponto de equilíbrio",
  "tempoSugerido": 15,
  "enunciado": "Uma pequena fábrica tem custo fixo mensal de R$ 5.000,00 e custo variável de R$ 12,00 por unidade produzida. Cada unidade é vendida por R$ 20,00.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantas unidades a fábrica precisa vender por mês para não ter prejuízo?",
    "respostaFinal": {
     "rotulo": "unidades",
     "aceitas": [
      "625"
     ]
    },
    "conferencia": "5000 / (20 - 12)",
    "resolucao": "Custo: C(q) = 5.000 + 12q. Receita: R(q) = 20q.\nNo ponto de equilíbrio, 20q = 5.000 + 12q, ou seja, 8q = 5.000.\nLogo q = 625 unidades.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu 5.000 por 20 ou por 12, sem usar a margem por unidade."
     },
     {
      "pct": 50,
      "desc": "Igualou custo e receita e chegou a 625 unidades."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o lucro mensal se forem vendidas 900 unidades?",
    "respostaFinal": {
     "rotulo": "lucro em reais",
     "aceitas": [
      "2200",
      "R$ 2.200,00"
     ]
    },
    "conferencia": "20*900 - (5000 + 12*900)",
    "resolucao": "Receita: 20 × 900 = 18.000.\nCusto: 5.000 + 12 × 900 = 5.000 + 10.800 = 15.800.\nLucro: 18.000 − 15.800 = R$ 2.200,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Esqueceu o custo fixo, chegando a 7.200, ou calculou apenas a receita."
     },
     {
      "pct": 50,
      "desc": "Subtraiu o custo total da receita e chegou a R$ 2.200,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-06",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Inequação do segundo grau",
  "tempoSugerido": 12,
  "enunciado": "Considere a inequação x² − 7x + 10 < 0.",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine o conjunto solução da inequação.",
    "respostaFinal": {
     "rotulo": "menor valor do intervalo",
     "aceitas": [
      "2"
     ]
    },
    "conferencia": "(7 - Math.sqrt(49 - 40)) / 2",
    "resolucao": "As raízes de x² − 7x + 10 são x = 2 e x = 5.\nComo o coeficiente de x² é positivo, a parábola tem concavidade para cima e fica abaixo do eixo entre as raízes.\nLogo, a solução é 2 < x < 5.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Achou as raízes mas apontou o intervalo de fora (x < 2 ou x > 5), invertendo o sinal."
     },
     {
      "pct": 50,
      "desc": "Achou as raízes mas não analisou o sinal da parábola."
     },
     {
      "pct": 75,
      "desc": "Analisou o sinal corretamente e errou apenas ao escrever o intervalo."
     },
     {
      "pct": 100,
      "desc": "Concluiu que a solução é 2 < x < 5."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-07",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Função definida por partes",
  "tempoSugerido": 15,
  "enunciado": "A conta de água de uma cidade é calculada assim: até 10 m³ de consumo, paga-se uma taxa fixa de R$ 25,00; acima disso, paga-se a taxa fixa mais R$ 4,00 por metro cúbico excedente.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o valor da conta de quem consome 18 m³?",
    "respostaFinal": {
     "rotulo": "valor em reais",
     "aceitas": [
      "57",
      "R$ 57,00"
     ]
    },
    "conferencia": "25 + 4*(18 - 10)",
    "resolucao": "O excedente é 18 − 10 = 8 m³.\nConta: 25 + 4 × 8 = 25 + 32 = R$ 57,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Cobrou os R$ 4,00 sobre todo o consumo (25 + 72 = 97), sem descontar os 10 m³ da taxa fixa."
     },
     {
      "pct": 50,
      "desc": "Aplicou a tarifa apenas sobre o excedente e chegou a R$ 57,00."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual foi o consumo de quem recebeu uma conta de R$ 89,00?",
    "respostaFinal": {
     "rotulo": "consumo em m³",
     "aceitas": [
      "26",
      "26 m³"
     ]
    },
    "conferencia": "10 + (89 - 25)/4",
    "resolucao": "Da conta, 25 são fixos, então 89 − 25 = 64 correspondem ao excedente.\nComo cada metro cúbico excedente custa 4, o excedente é 64/4 = 16 m³.\nO consumo total é 10 + 16 = 26 m³.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu 89 por 4 sem descontar a taxa fixa, ou esqueceu de somar os 10 m³ ao final."
     },
     {
      "pct": 50,
      "desc": "Descontou a taxa fixa, converteu o excedente e chegou a 26 m³."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-08",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Composição de funções",
  "tempoSugerido": 12,
  "enunciado": "Sejam f(x) = 2x − 3 e g(x) = x² + 1, funções reais.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule f(g(2)).",
    "respostaFinal": {
     "rotulo": "valor",
     "aceitas": [
      "7"
     ]
    },
    "conferencia": "2*(2*2 + 1) - 3",
    "resolucao": "g(2) = 2² + 1 = 5.\nf(5) = 2 × 5 − 3 = 7.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Inverteu a ordem da composição e calculou g(f(2)) = 2."
     },
     {
      "pct": 50,
      "desc": "Aplicou g primeiro, depois f, e chegou a 7."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Determine a expressão de g(f(x)).",
    "resolucao": "g(f(x)) = (2x − 3)² + 1.\nExpandindo: 4x² − 12x + 9 + 1 = 4x² − 12x + 10.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Substituiu na ordem errada, ou errou o quadrado do binômio (esquecendo o termo do meio)."
     },
     {
      "pct": 50,
      "desc": "Chegou a g(f(x)) = 4x² − 12x + 10, com a expansão indicada."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-09",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Função inversa",
  "tempoSugerido": 12,
  "enunciado": "Considere a função real f(x) = (3x − 1)/2.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine a expressão da função inversa de f.",
    "resolucao": "Escrevendo y = (3x − 1)/2 e trocando os papéis: x = (3y − 1)/2.\nDaí 2x = 3y − 1, ou seja, y = (2x + 1)/3.\nLogo, f⁻¹(x) = (2x + 1)/3.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Trocou x por y mas não isolou corretamente, ou apresentou 1/f(x) como inversa."
     },
     {
      "pct": 50,
      "desc": "Chegou a f⁻¹(x) = (2x + 1)/3."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Calcule f⁻¹(4).",
    "respostaFinal": {
     "rotulo": "valor",
     "aceitas": [
      "3"
     ]
    },
    "conferencia": "(2*4 + 1)/3",
    "resolucao": "f⁻¹(4) = (2 × 4 + 1)/3 = 9/3 = 3.\nConferindo: f(3) = (9 − 1)/2 = 4.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou f(4) em vez de f⁻¹(4), chegando a 5,5."
     },
     {
      "pct": 50,
      "desc": "Substituiu na inversa e chegou a 3."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-10",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Equação modular",
  "tempoSugerido": 12,
  "enunciado": "Considere a equação |2x − 6| = 10.",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine as soluções da equação e a soma delas.",
    "respostaFinal": {
     "rotulo": "soma das soluções",
     "aceitas": [
      "6"
     ]
    },
    "conferencia": "8 + (-2)",
    "resolucao": "O módulo abre em dois casos: 2x − 6 = 10 e 2x − 6 = −10.\nNo primeiro, 2x = 16 e x = 8; no segundo, 2x = −4 e x = −2.\nA soma das soluções é 8 + (−2) = 6.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Considerou apenas o caso positivo e apresentou só x = 8."
     },
     {
      "pct": 50,
      "desc": "Abriu os dois casos mas errou uma das soluções."
     },
     {
      "pct": 75,
      "desc": "Achou as duas soluções e errou apenas a soma."
     },
     {
      "pct": 100,
      "desc": "Encontrou x = 8 e x = −2, cuja soma é 6."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-11",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Relações entre raízes",
  "tempoSugerido": 12,
  "enunciado": "A equação x² − 9x + 20 = 0 tem duas raízes reais.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine a soma dos inversos das raízes, sem calcular as raízes.",
    "respostaFinal": {
     "rotulo": "soma dos inversos",
     "aceitas": [
      "9/20",
      "0,45",
      "0.45"
     ]
    },
    "conferencia": "9/20",
    "resolucao": "Pelas relações de Girard, a soma das raízes é 9 e o produto é 20.\nA soma dos inversos é 1/x₁ + 1/x₂ = (x₁ + x₂)/(x₁·x₂) = 9/20.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Inverteu a razão e apresentou 20/9, ou calculou as raízes ignorando o comando de não calculá-las."
     },
     {
      "pct": 50,
      "desc": "Usou as relações de Girard e chegou a 9/20."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Determine a soma dos quadrados das raízes.",
    "respostaFinal": {
     "rotulo": "soma dos quadrados",
     "aceitas": [
      "41"
     ]
    },
    "conferencia": "9*9 - 2*20",
    "resolucao": "Vale a identidade x₁² + x₂² = (x₁ + x₂)² − 2·x₁·x₂.\nSubstituindo: 9² − 2 × 20 = 81 − 40 = 41.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Elevou a soma ao quadrado sem subtrair o dobro do produto, chegando a 81."
     },
     {
      "pct": 50,
      "desc": "Usou a identidade e chegou a 41."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-12",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Sistema não linear",
  "tempoSugerido": 12,
  "enunciado": "Dois números reais têm soma 10 e produto 21.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine os dois números.",
    "respostaFinal": {
     "rotulo": "o menor deles",
     "aceitas": [
      "3"
     ]
    },
    "conferencia": "(10 - Math.sqrt(100 - 84))/2",
    "resolucao": "Os números são as raízes de t² − 10t + 21 = 0.\nO discriminante é 100 − 84 = 16, então t = (10 ± 4)/2.\nAs raízes são 3 e 7.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Montou o sistema mas travou na substituição, ou testou valores sem chegar ao par correto."
     },
     {
      "pct": 50,
      "desc": "Usou a equação do segundo grau associada e encontrou 3 e 7."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Determine a soma dos quadrados desses dois números.",
    "respostaFinal": {
     "rotulo": "soma dos quadrados",
     "aceitas": [
      "58"
     ]
    },
    "conferencia": "100 - 2*21",
    "resolucao": "Pela identidade: x² + y² = (x + y)² − 2xy = 100 − 42 = 58.\nConferindo com os números encontrados: 9 + 49 = 58.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou os números e elevou ao quadrado, chegando a 100."
     },
     {
      "pct": 50,
      "desc": "Usou a identidade ou os valores encontrados e chegou a 58."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-13",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Custo médio",
  "tempoSugerido": 15,
  "enunciado": "O custo total de produção de q unidades de um produto é C(q) = 2.000 + 15q reais. O custo médio é o custo total dividido pela quantidade produzida.",
  "itens": [
   {
    "id": "a",
    "comando": "Escreva o custo médio em função de q e explique o que acontece com ele quando q cresce muito.",
    "resolucao": "O custo médio é CM(q) = (2.000 + 15q)/q = 2.000/q + 15.\nQuando q cresce, a parcela 2.000/q diminui e se aproxima de zero.\nEntão o custo médio se aproxima de 15 por unidade, mas nunca chega a esse valor: o custo fixo é diluído, não eliminado.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Escreveu a expressão sem interpretar o comportamento, ou afirmou que o custo médio tende a zero."
     },
     {
      "pct": 50,
      "desc": "Escreveu CM = 2.000/q + 15 e explicou que ele tende a 15 pela diluição do custo fixo."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual quantidade produzida faz o custo médio ser igual a R$ 25,00 por unidade?",
    "respostaFinal": {
     "rotulo": "unidades",
     "aceitas": [
      "200"
     ]
    },
    "conferencia": "2000 / (25 - 15)",
    "resolucao": "De 2.000/q + 15 = 25 vem 2.000/q = 10.\nLogo q = 200 unidades.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu 2.000 por 25, esquecendo de descontar o custo variável unitário."
     },
     {
      "pct": 50,
      "desc": "Isolou q corretamente e chegou a 200 unidades."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-14",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Otimização com restrição",
  "tempoSugerido": 15,
  "enunciado": "Um terreno retangular será cercado com 40 metros de tela, aproveitando todo o material disponível.",
  "itens": [
   {
    "id": "unico",
    "comando": "Quais devem ser as dimensões do terreno para que a área cercada seja a maior possível? Qual é essa área?",
    "respostaFinal": {
     "rotulo": "área máxima em m²",
     "aceitas": [
      "100",
      "100 m²"
     ]
    },
    "conferencia": "10 * 10",
    "resolucao": "Se um lado mede x, o outro mede 20 − x, porque o perímetro é 40.\nA área é A(x) = x(20 − x) = 20x − x², uma parábola de concavidade para baixo.\nO máximo está no vértice: x = 10, e o outro lado também mede 10.\nA área máxima é 10 × 10 = 100 m² — o retângulo de área máxima com perímetro dado é o quadrado.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou 40 − x para o outro lado, esquecendo que o perímetro tem dois pares de lados."
     },
     {
      "pct": 50,
      "desc": "Montou a área como função de um lado mas não localizou o máximo."
     },
     {
      "pct": 75,
      "desc": "Chegou às dimensões 10 × 10 e errou apenas o cálculo da área."
     },
     {
      "pct": 100,
      "desc": "Concluiu que o terreno é um quadrado de 10 m de lado, com área máxima de 100 m²."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-15",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Equação exponencial",
  "tempoSugerido": 10,
  "enunciado": "Considere as equações exponenciais 2^(x+1) = 32 e 3^(2y) = 81.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine x.",
    "respostaFinal": {
     "rotulo": "valor de x",
     "aceitas": [
      "4"
     ]
    },
    "conferencia": "5 - 1",
    "resolucao": "Como 32 = 2⁵, temos 2^(x+1) = 2⁵.\nIgualando os expoentes: x + 1 = 5, logo x = 4.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Igualou x a 5, esquecendo de descontar o 1 do expoente."
     },
     {
      "pct": 50,
      "desc": "Reduziu à mesma base e chegou a x = 4."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Determine y.",
    "respostaFinal": {
     "rotulo": "valor de y",
     "aceitas": [
      "2"
     ]
    },
    "conferencia": "4/2",
    "resolucao": "Como 81 = 3⁴, temos 3^(2y) = 3⁴.\nIgualando os expoentes: 2y = 4, logo y = 2.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Igualou 2y a 81, ou apresentou y = 4 sem dividir por 2."
     },
     {
      "pct": 50,
      "desc": "Reduziu à mesma base e chegou a y = 2."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-16",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Escala logarítmica",
  "tempoSugerido": 15,
  "enunciado": "O nível sonoro, em decibéis, é dado por N = 10·log(I/I₀), em que I é a intensidade do som e I₀ é uma intensidade de referência fixa.",
  "itens": [
   {
    "id": "a",
    "comando": "Se a intensidade de um som for multiplicada por 100, de quanto aumenta o nível sonoro em decibéis?",
    "respostaFinal": {
     "rotulo": "aumento em dB",
     "aceitas": [
      "20",
      "20 dB"
     ]
    },
    "conferencia": "10 * 2",
    "resolucao": "O novo nível é 10·log(100·I/I₀) = 10·[log 100 + log(I/I₀)] = 10·log 100 + N.\nComo log 100 = 2, o aumento é 10 × 2 = 20 decibéis.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Respondeu que o nível é multiplicado por 100, confundindo escala logarítmica com escala linear."
     },
     {
      "pct": 50,
      "desc": "Usou a propriedade do logaritmo do produto e chegou a um aumento de 20 dB."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Um som de 80 dB tem intensidade quantas vezes maior que a de um som de 50 dB?",
    "respostaFinal": {
     "rotulo": "razão entre as intensidades",
     "aceitas": [
      "1000"
     ]
    },
    "conferencia": "Math.pow(10, (80-50)/10)",
    "resolucao": "A diferença de níveis é 80 − 50 = 30 dB.\nComo 30 = 10·log(razão), temos log(razão) = 3 e a razão é 10³ = 1.000.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu 80 por 50, ou apresentou 30 como resposta, confundindo a diferença de níveis com a razão de intensidades."
     },
     {
      "pct": 50,
      "desc": "Converteu a diferença de decibéis em potência de 10 e chegou a 1.000 vezes."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-17",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Função quadrática e trajetória",
  "tempoSugerido": 15,
  "enunciado": "Um objeto é lançado verticalmente e sua altura, em metros, é dada por h(t) = −5t² + 20t, com t em segundos.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a altura máxima atingida e em que instante isso ocorre?",
    "respostaFinal": {
     "rotulo": "altura máxima em metros",
     "aceitas": [
      "20",
      "20 m"
     ]
    },
    "conferencia": "-5*2*2 + 20*2",
    "resolucao": "O instante do máximo é t = −b/(2a) = −20/(2 × (−5)) = 2 s.\nA altura é h(2) = −5 × 4 + 40 = 20 m.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Achou o instante do vértice mas não substituiu na função, ou usou a raiz da parábola como instante de altura máxima."
     },
     {
      "pct": 50,
      "desc": "Encontrou t = 2 s e altura máxima de 20 m."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Em que instante o objeto volta ao solo?",
    "respostaFinal": {
     "rotulo": "instante em segundos",
     "aceitas": [
      "4",
      "4 s"
     ]
    },
    "conferencia": "20/5",
    "resolucao": "Fazendo h(t) = 0: −5t² + 20t = 0, ou t(−5t + 20) = 0.\nAs raízes são t = 0 (lançamento) e t = 4 s (volta ao solo).",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Apresentou t = 0 como resposta, ou dobrou a altura máxima em vez do instante do vértice."
     },
     {
      "pct": 50,
      "desc": "Resolveu h(t) = 0 e chegou a t = 4 s."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-18",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Sistema linear 3×3",
  "tempoSugerido": 15,
  "enunciado": "Uma cesta tem 32 frutas entre maçãs, peras e laranjas. Há 4 maçãs a mais que peras, e o número de laranjas é o dobro do de peras.",
  "itens": [
   {
    "id": "unico",
    "comando": "Quantas frutas de cada tipo há na cesta?",
    "respostaFinal": {
     "rotulo": "número de peras",
     "aceitas": [
      "7"
     ]
    },
    "conferencia": "(32 - 4)/4",
    "resolucao": "Chamando de p o número de peras: maçãs = p + 4 e laranjas = 2p.\nEntão (p + 4) + p + 2p = 32, ou 4p = 28, logo p = 7.\nSão 7 peras, 11 maçãs e 14 laranjas — que somam 32.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Montou o sistema com alguma relação invertida (peras = maçãs + 4, por exemplo), ou dividiu 32 por 3."
     },
     {
      "pct": 50,
      "desc": "Montou o sistema corretamente mas errou ao isolar a variável."
     },
     {
      "pct": 75,
      "desc": "Chegou a 4p = 28 e errou apenas a divisão ou a conta dos demais tipos."
     },
     {
      "pct": 100,
      "desc": "Concluiu que são 7 peras, 11 maçãs e 14 laranjas, conferindo a soma 32."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-19",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Inequação com fração",
  "tempoSugerido": 15,
  "enunciado": "Considere a inequação (x − 2)/(x + 3) ≥ 0.",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine o conjunto solução, indicando as restrições de domínio.",
    "respostaFinal": {
     "rotulo": "menor valor de x da parte à direita",
     "aceitas": [
      "2"
     ]
    },
    "conferencia": "2",
    "resolucao": "O denominador não pode ser zero, então x ≠ −3.\nA fração é positiva quando numerador e denominador têm o mesmo sinal: x < −3 (ambos negativos) ou x ≥ 2 (ambos positivos ou numerador nulo).\nEntre −3 e 2 os sinais se opõem e a fração é negativa.\nLogo, a solução é x < −3 ou x ≥ 2.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Multiplicou os dois lados por (x + 3) sem analisar o sinal do denominador, chegando apenas a x ≥ 2."
     },
     {
      "pct": 50,
      "desc": "Fez o estudo de sinais mas incluiu x = −3 na solução."
     },
     {
      "pct": 75,
      "desc": "Acertou os intervalos e trocou um sinal de inclusão (≥ por > em x = 2, por exemplo)."
     },
     {
      "pct": 100,
      "desc": "Concluiu que a solução é x < −3 ou x ≥ 2, com a restrição x ≠ −3."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-20",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Função por partes e imposto progressivo",
  "tempoSugerido": 18,
  "enunciado": "Um imposto sobre a renda mensal funciona por faixas: até R$ 2.000,00 há isenção; sobre a parte da renda entre R$ 2.000,00 e R$ 5.000,00 incide 10%; sobre a parte que exceder R$ 5.000,00 incide 20%.",
  "itens": [
   {
    "id": "a",
    "comando": "Quanto de imposto paga quem recebe R$ 4.200,00 por mês?",
    "respostaFinal": {
     "rotulo": "imposto em reais",
     "aceitas": [
      "220",
      "R$ 220,00"
     ]
    },
    "conferencia": "0.10 * (4200 - 2000)",
    "resolucao": "A renda cai na segunda faixa: só a parte acima de 2.000 é tributada.\nParte tributável: 4.200 − 2.000 = 2.200.\nImposto: 10% de 2.200 = R$ 220,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Aplicou 10% sobre os R$ 4.200,00 inteiros, chegando a 420, sem respeitar a faixa isenta."
     },
     {
      "pct": 50,
      "desc": "Tributou apenas o excedente da faixa isenta e chegou a R$ 220,00."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a renda de quem paga R$ 700,00 de imposto?",
    "respostaFinal": {
     "rotulo": "renda em reais",
     "aceitas": [
      "7000",
      "R$ 7.000,00"
     ]
    },
    "conferencia": "5000 + (700 - 300)/0.20",
    "resolucao": "Quem recebe exatamente 5.000 paga 10% de 3.000 = 300, que é o imposto acumulado até o fim da segunda faixa.\nComo 700 > 300, a renda está na terceira faixa.\nSobram 700 − 300 = 400 de imposto a 20%, o que corresponde a 400/0,2 = 2.000 de renda acima de 5.000.\nLogo, a renda é 5.000 + 2.000 = R$ 7.000,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu 700 por 0,2 e somou 5.000, sem descontar os 300 já pagos nas faixas anteriores, ou aplicou 20% sobre a renda inteira."
     },
     {
      "pct": 50,
      "desc": "Identificou a faixa correta e chegou a R$ 7.000,00, descontando o imposto acumulado."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-21",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Interpolação linear",
  "tempoSugerido": 12,
  "enunciado": "Uma tabela relaciona duas grandezas que variam de forma linear: quando x = 2, y = 50; quando x = 6, y = 90.",
  "itens": [
   {
    "id": "a",
    "comando": "Escreva y em função de x.",
    "resolucao": "A taxa de variação é (90 − 50)/(6 − 2) = 40/4 = 10.\nEntão y = 50 + 10(x − 2), ou seja, y = 10x + 30.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou a taxa mas não montou a expressão, ou usou o ponto errado como referência."
     },
     {
      "pct": 50,
      "desc": "Chegou a y = 10x + 30, indicando o cálculo da taxa."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o valor de y quando x = 5?",
    "respostaFinal": {
     "rotulo": "valor de y",
     "aceitas": [
      "80"
     ]
    },
    "conferencia": "10*5 + 30",
    "resolucao": "Substituindo: y = 10 × 5 + 30 = 80.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Tomou a média entre 50 e 90, chegando a 70, sem considerar que x = 5 não é o ponto médio entre 2 e 6."
     },
     {
      "pct": 50,
      "desc": "Substituiu na função e chegou a 80."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-22",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Equação biquadrada",
  "tempoSugerido": 12,
  "enunciado": "Considere a equação x⁴ − 13x² + 36 = 0.",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine todas as raízes reais e a soma das raízes positivas.",
    "respostaFinal": {
     "rotulo": "soma das raízes positivas",
     "aceitas": [
      "5"
     ]
    },
    "conferencia": "2 + 3",
    "resolucao": "Fazendo u = x², a equação vira u² − 13u + 36 = 0, cujas raízes são u = 4 e u = 9.\nDe x² = 4 vem x = ±2; de x² = 9 vem x = ±3.\nAs raízes positivas são 2 e 3, cuja soma é 5.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Resolveu em u e parou em 4 e 9, sem voltar para x."
     },
     {
      "pct": 50,
      "desc": "Voltou para x mas esqueceu as raízes negativas ou uma das positivas."
     },
     {
      "pct": 75,
      "desc": "Listou as quatro raízes e errou apenas a soma pedida."
     },
     {
      "pct": 100,
      "desc": "Encontrou ±2 e ±3, com soma das positivas igual a 5."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-23",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Translação de gráfico",
  "tempoSugerido": 12,
  "enunciado": "A partir da parábola f(x) = x², define-se g(x) = (x − 3)² + 2.",
  "itens": [
   {
    "id": "a",
    "comando": "Descreva a transformação que leva o gráfico de f ao de g e indique o vértice de g.",
    "resolucao": "Trocar x por (x − 3) desloca o gráfico 3 unidades para a direita; somar 2 desloca 2 unidades para cima.\nComo o vértice de f é (0, 0), o vértice de g é (3, 2).",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Inverteu o sentido do deslocamento horizontal (3 para a esquerda), erro típico do sinal dentro do parêntese."
     },
     {
      "pct": 50,
      "desc": "Descreveu as duas translações e indicou o vértice (3, 2)."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Determine o valor mínimo de g e o valor de g(5).",
    "respostaFinal": {
     "rotulo": "valor de g(5)",
     "aceitas": [
      "6"
     ]
    },
    "conferencia": "(5-3)*(5-3) + 2",
    "resolucao": "O valor mínimo é a ordenada do vértice: 2.\ng(5) = (5 − 3)² + 2 = 4 + 2 = 6.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou 5² + 2 = 27, esquecendo a translação, ou apontou 0 como valor mínimo."
     },
     {
      "pct": 50,
      "desc": "Indicou mínimo 2 e g(5) = 6."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-24",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Taxa de variação média",
  "tempoSugerido": 12,
  "enunciado": "Considere a função f(x) = x² + 2x.",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine a taxa de variação média de f no intervalo de x = 1 a x = 4.",
    "respostaFinal": {
     "rotulo": "taxa de variação média",
     "aceitas": [
      "7"
     ]
    },
    "conferencia": "((4*4 + 2*4) - (1 + 2)) / (4 - 1)",
    "resolucao": "f(1) = 1 + 2 = 3 e f(4) = 16 + 8 = 24.\nA taxa média é [f(4) − f(1)]/(4 − 1) = 21/3 = 7.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou apenas a diferença f(4) − f(1) = 21, sem dividir pela variação de x."
     },
     {
      "pct": 50,
      "desc": "Calculou os dois valores da função mas errou a divisão."
     },
     {
      "pct": 75,
      "desc": "Montou a razão corretamente e errou apenas a conta."
     },
     {
      "pct": 100,
      "desc": "Chegou à taxa de variação média igual a 7."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Funções e álgebra",
  "id": "fun-25",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Sistema com duas incógnitas",
  "tempoSugerido": 12,
  "enunciado": "Em uma bilheteria foram vendidos 180 ingressos, entre inteiras a R$ 40,00 e meias a R$ 20,00, arrecadando R$ 5.600,00.",
  "itens": [
   {
    "id": "unico",
    "comando": "Quantos ingressos de cada tipo foram vendidos?",
    "respostaFinal": {
     "rotulo": "ingressos inteiros",
     "aceitas": [
      "100"
     ]
    },
    "conferencia": "(5600 - 20*180) / (40 - 20)",
    "resolucao": "Sejam i as inteiras e m as meias: i + m = 180 e 40i + 20m = 5.600.\nDa primeira, m = 180 − i. Substituindo: 40i + 20(180 − i) = 5.600.\nEntão 20i + 3.600 = 5.600, ou seja, 20i = 2.000 e i = 100.\nForam 100 inteiras e 80 meias.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Montou apenas uma das equações, ou dividiu 5.600 por 180 e trabalhou com o preço médio."
     },
     {
      "pct": 50,
      "desc": "Montou o sistema corretamente mas errou a substituição."
     },
     {
      "pct": 75,
      "desc": "Chegou a 20i = 2.000 e errou apenas a divisão ou o segundo tipo de ingresso."
     },
     {
      "pct": 100,
      "desc": "Concluiu que foram 100 inteiras e 80 meias, conferindo a arrecadação."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-01",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Trigonometria no triângulo retângulo",
  "tempoSugerido": 12,
  "enunciado": "Uma rampa de acessibilidade tem 12 metros de comprimento e forma um ângulo de 30° com o piso horizontal. Use sen 30° = 0,5 e cos 30° = 0,866.",
  "figura": "<svg viewBox=\"0 0 320 130\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M30 100 L280 100\"/><path d=\"M30 100 L280 30\" /><path d=\"M280 30 L280 100\"/><path d=\"M60 100 A30 30 0 0 0 60 92\" stroke-width=\"1.5\"/><text x=\"66\" y=\"96\" font-size=\"11\" fill=\"currentColor\" stroke=\"none\">30°</text><text x=\"140\" y=\"55\" font-size=\"11\" fill=\"currentColor\" stroke=\"none\">12 m</text><text x=\"288\" y=\"70\" font-size=\"11\" fill=\"currentColor\" stroke=\"none\">h</text></svg>",
  "figuraAlt": "Triângulo retângulo com a hipotenusa de 12 metros formando 30 graus com a base horizontal e o cateto vertical marcado como h.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o desnível vencido pela rampa, ou seja, a altura entre suas extremidades?",
    "respostaFinal": {
     "rotulo": "altura em metros",
     "aceitas": [
      "6",
      "6 m"
     ]
    },
    "conferencia": "12 * 0.5",
    "resolucao": "A altura é o cateto oposto ao ângulo de 30°, e a rampa é a hipotenusa.\nAltura = 12 × sen 30° = 12 × 0,5 = 6 metros.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou o cosseno em vez do seno, obtendo a projeção horizontal, ou dividiu 12 por 30."
     },
     {
      "pct": 50,
      "desc": "Identificou o cateto oposto e chegou a 6 metros."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a distância horizontal coberta pela rampa?",
    "respostaFinal": {
     "rotulo": "distância em metros",
     "aceitas": [
      "10,39",
      "10.39",
      "10,392"
     ],
     "intervalo": [
      10.3,
      10.5
     ]
    },
    "conferencia": "12 * 0.866",
    "resolucao": "A distância horizontal é o cateto adjacente: 12 × cos 30° = 12 × 0,866 ≈ 10,39 metros.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou o seno, repetindo o resultado do item anterior, ou subtraiu 6 de 12."
     },
     {
      "pct": 50,
      "desc": "Usou o cosseno e chegou a aproximadamente 10,39 metros."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-02",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Semelhança de triângulos",
  "tempoSugerido": 12,
  "enunciado": "No mesmo instante do dia, um poste projeta uma sombra de 8 metros e uma vara vertical de 1,5 metro projeta uma sombra de 2 metros.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a altura do poste?",
    "respostaFinal": {
     "rotulo": "altura em metros",
     "aceitas": [
      "6",
      "6 m"
     ]
    },
    "conferencia": "1.5 * 8 / 2",
    "resolucao": "Os raios solares chegam com a mesma inclinação, então os triângulos são semelhantes.\nA proporção é h/8 = 1,5/2.\nLogo h = 1,5 × 8/2 = 6 metros.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apenas o número, sem indicar o raciocínio."
     },
     {
      "pct": 25,
      "desc": "Montou a proporção invertida (h/1,5 = 2/8), chegando a 0,375, ou somou as medidas."
     },
     {
      "pct": 50,
      "desc": "Reconheceu a semelhança mas errou ao isolar a altura."
     },
     {
      "pct": 75,
      "desc": "Montou a proporção correta e errou apenas a conta."
     },
     {
      "pct": 100,
      "desc": "Concluiu que o poste tem 6 metros."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-03",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Setor circular",
  "tempoSugerido": 12,
  "enunciado": "Um setor circular tem raio 6 cm e ângulo central de 60°. Use π = 3,14.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a área do setor?",
    "respostaFinal": {
     "rotulo": "área em cm²",
     "aceitas": [
      "18,84",
      "18.84"
     ]
    },
    "conferencia": "(60/360) * 3.14 * 6 * 6",
    "resolucao": "A área do círculo inteiro é π·6² = 113,04 cm².\nO setor de 60° corresponde a 60/360 = 1/6 do círculo.\nÁrea: 113,04/6 = 18,84 cm².",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou a fração 60/180, ou calculou a área do círculo inteiro sem aplicar a fração."
     },
     {
      "pct": 50,
      "desc": "Aplicou a fração 1/6 à área do círculo e chegou a 18,84 cm²."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o comprimento do arco desse setor?",
    "respostaFinal": {
     "rotulo": "comprimento em cm",
     "aceitas": [
      "6,28",
      "6.28"
     ]
    },
    "conferencia": "(60/360) * 2 * 3.14 * 6",
    "resolucao": "O comprimento da circunferência é 2π·6 = 37,68 cm.\nO arco de 60° é 1/6 disso: 6,28 cm.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou a fórmula da área em vez do comprimento, ou esqueceu o fator 2 na circunferência."
     },
     {
      "pct": 50,
      "desc": "Aplicou a fração ao perímetro e chegou a 6,28 cm."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-04",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Volume de cilindro",
  "tempoSugerido": 12,
  "enunciado": "Um reservatório cilíndrico tem raio da base de 5 metros e altura de 12 metros. Use π = 3,14.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o volume do reservatório, em metros cúbicos?",
    "respostaFinal": {
     "rotulo": "volume em m³",
     "aceitas": [
      "942"
     ]
    },
    "conferencia": "3.14 * 5 * 5 * 12",
    "resolucao": "O volume do cilindro é área da base vezes altura: π·r²·h.\nV = 3,14 × 25 × 12 = 942 m³.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou o diâmetro no lugar do raio, ou aplicou a fórmula do cone (dividindo por 3)."
     },
     {
      "pct": 50,
      "desc": "Aplicou π·r²·h e chegou a 942 m³."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Se o reservatório estiver com 3/4 da capacidade, quantos litros de água ele contém? (1 m³ = 1.000 litros)",
    "respostaFinal": {
     "rotulo": "litros",
     "aceitas": [
      "706500"
     ]
    },
    "conferencia": "942 * 0.75 * 1000",
    "resolucao": "Volume ocupado: 942 × 3/4 = 706,5 m³.\nEm litros: 706,5 × 1.000 = 706.500 litros.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou a fração corretamente mas não converteu para litros, ou multiplicou por 100."
     },
     {
      "pct": 50,
      "desc": "Aplicou a fração e a conversão e chegou a 706.500 litros."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-05",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Volume de cone",
  "tempoSugerido": 12,
  "enunciado": "Um cone circular reto tem raio da base 3 cm e altura 4 cm. Use π = 3,14.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule o volume do cone.",
    "respostaFinal": {
     "rotulo": "volume em cm³",
     "aceitas": [
      "37,68",
      "37.68"
     ]
    },
    "conferencia": "(1/3) * 3.14 * 9 * 4",
    "resolucao": "O volume do cone é um terço do cilindro de mesma base e altura: V = (1/3)·π·r²·h.\nV = (1/3) × 3,14 × 9 × 4 = 37,68 cm³.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Esqueceu o fator 1/3 e apresentou 113,04, ou usou a geratriz no lugar da altura."
     },
     {
      "pct": 50,
      "desc": "Aplicou a fórmula do cone e chegou a 37,68 cm³."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a medida da geratriz desse cone?",
    "respostaFinal": {
     "rotulo": "geratriz em cm",
     "aceitas": [
      "5",
      "5 cm"
     ]
    },
    "conferencia": "Math.sqrt(9 + 16)",
    "resolucao": "A geratriz é a hipotenusa do triângulo formado pelo raio e pela altura.\ng = √(3² + 4²) = √25 = 5 cm.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou raio e altura, chegando a 7, ou subtraiu os quadrados."
     },
     {
      "pct": 50,
      "desc": "Aplicou Pitágoras e chegou a 5 cm."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-06",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Área de trapézio",
  "tempoSugerido": 10,
  "enunciado": "Um terreno tem a forma de um trapézio com bases de 10 m e 6 m e altura de 5 m.",
  "figura": "<svg viewBox=\"0 0 300 140\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M40 110 L260 110 L210 40 L90 40 Z\"/><path d=\"M90 110 L90 40\" stroke-dasharray=\"4 4\" stroke-width=\"1.5\"/><text x=\"140\" y=\"126\" font-size=\"11\" fill=\"currentColor\" stroke=\"none\">10 m</text><text x=\"142\" y=\"33\" font-size=\"11\" fill=\"currentColor\" stroke=\"none\">6 m</text><text x=\"96\" y=\"80\" font-size=\"11\" fill=\"currentColor\" stroke=\"none\">5 m</text></svg>",
  "figuraAlt": "Trapézio com base maior de 10 metros, base menor de 6 metros e altura tracejada de 5 metros.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a área do terreno?",
    "respostaFinal": {
     "rotulo": "área em m²",
     "aceitas": [
      "40",
      "40 m²"
     ]
    },
    "conferencia": "(10 + 6) * 5 / 2",
    "resolucao": "A área do trapézio é a média das bases vezes a altura: A = (B + b)·h/2.\nA = (10 + 6) × 5/2 = 80/2 = 40 m².",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Multiplicou as duas bases pela altura sem dividir por 2, chegando a 80, ou usou só a base maior."
     },
     {
      "pct": 50,
      "desc": "Aplicou a fórmula do trapézio mas errou a conta."
     },
     {
      "pct": 75,
      "desc": "Montou (10 + 6) × 5/2 e errou apenas a divisão."
     },
     {
      "pct": 100,
      "desc": "Chegou à área de 40 m²."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-07",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Distância entre pontos",
  "tempoSugerido": 10,
  "enunciado": "No plano cartesiano, considere os pontos A(1, 2) e B(7, 10).",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule a distância entre A e B.",
    "respostaFinal": {
     "rotulo": "distância",
     "aceitas": [
      "10"
     ]
    },
    "conferencia": "Math.sqrt(36 + 64)",
    "resolucao": "d = √[(7 − 1)² + (10 − 2)²] = √(36 + 64) = √100 = 10.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou as diferenças sem elevar ao quadrado (6 + 8 = 14), ou esqueceu a raiz."
     },
     {
      "pct": 50,
      "desc": "Aplicou a fórmula da distância e chegou a 10."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Determine as coordenadas do ponto médio de AB.",
    "respostaFinal": {
     "rotulo": "abscissa do ponto médio",
     "aceitas": [
      "4"
     ]
    },
    "conferencia": "(1 + 7)/2",
    "resolucao": "O ponto médio tem coordenadas [(1 + 7)/2, (2 + 10)/2] = (4, 6).",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Subtraiu as coordenadas em vez de fazer a média, ou trocou as coordenadas de lugar."
     },
     {
      "pct": 50,
      "desc": "Calculou a média das coordenadas e chegou a (4, 6)."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-08",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Equação da reta",
  "tempoSugerido": 12,
  "enunciado": "Uma reta passa pelos pontos A(1, 2) e B(7, 10).",
  "itens": [
   {
    "id": "a",
    "comando": "Determine o coeficiente angular da reta.",
    "respostaFinal": {
     "rotulo": "coeficiente angular",
     "aceitas": [
      "4/3",
      "1,333",
      "1.333"
     ],
     "intervalo": [
      1.33,
      1.34
     ]
    },
    "conferencia": "(10 - 2)/(7 - 1)",
    "resolucao": "O coeficiente angular é a razão entre as variações: m = (10 − 2)/(7 − 1) = 8/6 = 4/3.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Inverteu a razão, chegando a 3/4, ou somou as coordenadas."
     },
     {
      "pct": 50,
      "desc": "Calculou a razão das variações e chegou a 4/3."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Escreva a equação da reta na forma y = mx + n.",
    "resolucao": "Com m = 4/3 e passando por (1, 2): 2 = (4/3)(1) + n, logo n = 2 − 4/3 = 2/3.\nA equação é y = (4/3)x + 2/3.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou o coeficiente angular correto mas errou ao encontrar n, ou substituiu o ponto errado."
     },
     {
      "pct": 50,
      "desc": "Chegou a y = (4/3)x + 2/3, indicando a substituição do ponto."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-09",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Equação da circunferência",
  "tempoSugerido": 12,
  "enunciado": "Considere a circunferência de centro C(3, −2) e raio 5.",
  "itens": [
   {
    "id": "a",
    "comando": "Escreva a equação dessa circunferência.",
    "resolucao": "A equação reduzida é (x − x_C)² + (y − y_C)² = r².\nCom C(3, −2) e r = 5: (x − 3)² + (y + 2)² = 25.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Errou o sinal da ordenada do centro, escrevendo (y − 2)², ou não elevou o raio ao quadrado."
     },
     {
      "pct": 50,
      "desc": "Chegou a (x − 3)² + (y + 2)² = 25."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Verifique se o ponto P(0, 2) pertence à circunferência.",
    "respostaFinal": {
     "rotulo": "distância de P ao centro",
     "aceitas": [
      "5",
      "5 unidades"
     ]
    },
    "conferencia": "Math.sqrt(9 + 16)",
    "resolucao": "Distância de P ao centro: √[(0 − 3)² + (2 + 2)²] = √(9 + 16) = √25 = 5.\nComo a distância é igual ao raio, o ponto P pertence à circunferência.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Substituiu na equação mas errou o sinal em (2 + 2), ou concluiu sem comparar com o raio."
     },
     {
      "pct": 50,
      "desc": "Calculou a distância igual a 5 e concluiu que P pertence à circunferência."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-10",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Interseção de reta e circunferência",
  "tempoSugerido": 15,
  "enunciado": "Considere a reta y = x e a circunferência x² + y² = 18.",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine os pontos de interseção entre a reta e a circunferência.",
    "respostaFinal": {
     "rotulo": "abscissa positiva",
     "aceitas": [
      "3"
     ]
    },
    "conferencia": "Math.sqrt(18/2)",
    "resolucao": "Substituindo y = x na equação da circunferência: x² + x² = 18, ou seja, 2x² = 18.\nEntão x² = 9 e x = ±3.\nOs pontos de interseção são (3, 3) e (−3, −3).",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Substituiu corretamente mas esqueceu a raiz negativa, ou dividiu 18 por 2 sem extrair a raiz."
     },
     {
      "pct": 50,
      "desc": "Chegou a x² = 9 sem escrever os pontos."
     },
     {
      "pct": 75,
      "desc": "Encontrou os dois valores de x e errou ao montar os pares ordenados."
     },
     {
      "pct": 100,
      "desc": "Concluiu que os pontos são (3, 3) e (−3, −3)."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-11",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Área por coordenadas",
  "tempoSugerido": 12,
  "enunciado": "Um triângulo tem vértices A(0, 0), B(6, 0) e C(2, 5).",
  "itens": [
   {
    "id": "unico",
    "comando": "Calcule a área do triângulo.",
    "respostaFinal": {
     "rotulo": "área",
     "aceitas": [
      "15"
     ]
    },
    "conferencia": "6 * 5 / 2",
    "resolucao": "O lado AB está sobre o eixo x e mede 6 — é a base.\nA altura relativa a essa base é a ordenada de C, ou seja, 5.\nÁrea = 6 × 5/2 = 15.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou a abscissa de C como altura, ou multiplicou base por altura sem dividir por 2."
     },
     {
      "pct": 50,
      "desc": "Identificou base e altura mas errou a conta."
     },
     {
      "pct": 75,
      "desc": "Montou 6 × 5/2 e errou apenas a divisão."
     },
     {
      "pct": 100,
      "desc": "Chegou à área igual a 15."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-12",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Baricentro",
  "tempoSugerido": 10,
  "enunciado": "Um triângulo tem vértices A(1, 2), B(5, 4) e C(3, 9).",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine as coordenadas do baricentro do triângulo.",
    "respostaFinal": {
     "rotulo": "ordenada do baricentro",
     "aceitas": [
      "5"
     ]
    },
    "conferencia": "(2 + 4 + 9)/3",
    "resolucao": "O baricentro é a média aritmética das coordenadas dos vértices.\nx = (1 + 5 + 3)/3 = 3 e y = (2 + 4 + 9)/3 = 5.\nO baricentro é (3, 5).",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou as coordenadas sem dividir por 3, ou calculou o ponto médio de apenas um lado."
     },
     {
      "pct": 50,
      "desc": "Calculou uma das coordenadas corretamente e errou a outra."
     },
     {
      "pct": 75,
      "desc": "Montou as duas médias e errou apenas uma conta."
     },
     {
      "pct": 100,
      "desc": "Concluiu que o baricentro é (3, 5)."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-13",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Retas perpendiculares",
  "tempoSugerido": 12,
  "enunciado": "Considere a reta r de equação y = 2x + 1.",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine a equação da reta perpendicular a r que passa pelo ponto P(4, 3).",
    "respostaFinal": {
     "rotulo": "coeficiente linear da nova reta",
     "aceitas": [
      "5"
     ]
    },
    "conferencia": "3 + 4/2",
    "resolucao": "Duas retas perpendiculares têm coeficientes angulares cujo produto é −1.\nComo m_r = 2, a perpendicular tem m = −1/2.\nPassando por (4, 3): 3 = −1/2 × 4 + n, ou seja, 3 = −2 + n e n = 5.\nA equação é y = −x/2 + 5.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou o mesmo coeficiente angular (reta paralela), ou trocou o sinal sem inverter o valor."
     },
     {
      "pct": 50,
      "desc": "Achou m = −1/2 mas não determinou o coeficiente linear."
     },
     {
      "pct": 75,
      "desc": "Montou a substituição do ponto e errou apenas a conta."
     },
     {
      "pct": 100,
      "desc": "Concluiu que a equação é y = −x/2 + 5, com coeficiente linear 5."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-14",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Lei dos cossenos",
  "tempoSugerido": 12,
  "enunciado": "Em um triângulo, dois lados medem 5 cm e 8 cm e formam entre si um ângulo de 60°. Use cos 60° = 0,5.",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine a medida do terceiro lado.",
    "respostaFinal": {
     "rotulo": "lado em cm",
     "aceitas": [
      "7",
      "7 cm"
     ]
    },
    "conferencia": "Math.sqrt(25 + 64 - 2*5*8*0.5)",
    "resolucao": "Pela lei dos cossenos: a² = 5² + 8² − 2 × 5 × 8 × cos 60°.\na² = 25 + 64 − 40 = 49.\nLogo a = 7 cm.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Aplicou Pitágoras, ignorando que o ângulo não é reto, chegando a √89."
     },
     {
      "pct": 50,
      "desc": "Montou a lei dos cossenos mas errou o sinal do último termo."
     },
     {
      "pct": 75,
      "desc": "Chegou a a² = 49 e errou apenas a raiz."
     },
     {
      "pct": 100,
      "desc": "Concluiu que o terceiro lado mede 7 cm."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-15",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Lei dos senos",
  "tempoSugerido": 12,
  "enunciado": "Em um triângulo ABC, o lado a mede 10 cm e o ângulo A é de 30°. O ângulo B mede 45°. Use sen 30° = 0,5 e sen 45° = 0,707.",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine a medida do lado b.",
    "respostaFinal": {
     "rotulo": "lado b em cm",
     "aceitas": [
      "14,14",
      "14.14"
     ],
     "intervalo": [
      14,
      14.2
     ]
    },
    "conferencia": "10 * 0.707 / 0.5",
    "resolucao": "Pela lei dos senos: a/sen A = b/sen B.\nEntão b = a · sen B/sen A = 10 × 0,707/0,5.\nLogo b ≈ 14,14 cm.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Inverteu a razão, chegando a cerca de 7,07, ou usou a lei dos cossenos sem ter o ângulo entre os lados."
     },
     {
      "pct": 50,
      "desc": "Montou a lei dos senos e chegou a aproximadamente 14,14 cm."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-16",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Altura inacessível",
  "tempoSugerido": 12,
  "enunciado": "De um ponto no chão, a 40 metros da base de um prédio, o ângulo de elevação até o topo é de 30°. Use tg 30° = 0,577.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a altura do prédio?",
    "respostaFinal": {
     "rotulo": "altura em metros",
     "aceitas": [
      "23,08",
      "23.08",
      "23,1"
     ],
     "intervalo": [
      23,
      23.2
     ]
    },
    "conferencia": "40 * 0.577",
    "resolucao": "A tangente relaciona o cateto oposto (altura) com o adjacente (distância): tg 30° = h/40.\nEntão h = 40 × 0,577 ≈ 23,08 metros.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou o seno ou o cosseno em vez da tangente, ou dividiu 40 pela tangente."
     },
     {
      "pct": 50,
      "desc": "Usou a tangente e chegou a aproximadamente 23,08 metros."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-17",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Círculo inscrito",
  "tempoSugerido": 12,
  "enunciado": "Um círculo está inscrito em um quadrado de lado 10 cm, tangenciando os quatro lados. Use π = 3,14.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a área do círculo?",
    "respostaFinal": {
     "rotulo": "área em cm²",
     "aceitas": [
      "78,5",
      "78.5"
     ]
    },
    "conferencia": "3.14 * 5 * 5",
    "resolucao": "O diâmetro do círculo é igual ao lado do quadrado, então o raio é 5 cm.\nÁrea = π × 25 = 78,5 cm².",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou 10 como raio, chegando a 314, confundindo raio com diâmetro."
     },
     {
      "pct": 50,
      "desc": "Identificou o raio 5 e chegou a 78,5 cm²."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a área da região do quadrado que fica fora do círculo?",
    "respostaFinal": {
     "rotulo": "área em cm²",
     "aceitas": [
      "21,5",
      "21.5"
     ]
    },
    "conferencia": "100 - 3.14*25",
    "resolucao": "Área do quadrado: 10 × 10 = 100 cm².\nSubtraindo o círculo: 100 − 78,5 = 21,5 cm².",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Subtraiu na ordem inversa, ou dividiu a área do quadrado pela do círculo."
     },
     {
      "pct": 50,
      "desc": "Fez a diferença entre as áreas e chegou a 21,5 cm²."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-18",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Prisma",
  "tempoSugerido": 15,
  "enunciado": "Um prisma reto tem por base um triângulo equilátero de lado 6 cm e altura 10 cm. Use √3 = 1,73.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule a área da base do prisma.",
    "respostaFinal": {
     "rotulo": "área em cm²",
     "aceitas": [
      "15,57",
      "15.57"
     ],
     "intervalo": [
      15.5,
      15.6
     ]
    },
    "conferencia": "1.73 * 36 / 4",
    "resolucao": "A área do triângulo equilátero de lado L é L²√3/4.\nA = 36 × 1,73/4 = 62,28/4 = 15,57 cm².",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou a fórmula do triângulo qualquer com altura 6, ou esqueceu de dividir por 4."
     },
     {
      "pct": 50,
      "desc": "Aplicou a fórmula do triângulo equilátero e chegou a 15,57 cm²."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Calcule o volume do prisma.",
    "respostaFinal": {
     "rotulo": "volume em cm³",
     "aceitas": [
      "155,7",
      "155.7"
     ],
     "intervalo": [
      155,
      156
     ]
    },
    "conferencia": "(1.73*36/4) * 10",
    "resolucao": "O volume do prisma é a área da base vezes a altura.\nV = 15,57 × 10 = 155,7 cm³.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Multiplicou o perímetro da base pela altura, calculando a área lateral em vez do volume."
     },
     {
      "pct": 50,
      "desc": "Multiplicou a área da base pela altura e chegou a 155,7 cm³."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-19",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Razão entre áreas",
  "tempoSugerido": 12,
  "enunciado": "Dois triângulos são semelhantes e a razão entre seus lados correspondentes é 3 para 5. O menor tem área de 27 cm².",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a área do triângulo maior?",
    "respostaFinal": {
     "rotulo": "área em cm²",
     "aceitas": [
      "75",
      "75 cm²"
     ]
    },
    "conferencia": "27 * 25 / 9",
    "resolucao": "Em figuras semelhantes, a razão entre as áreas é o quadrado da razão entre os lados.\nRazão das áreas: (3/5)² = 9/25.\nEntão 27/A = 9/25, logo A = 27 × 25/9 = 75 cm².",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou a razão 3/5 diretamente nas áreas, chegando a 45, sem elevar ao quadrado."
     },
     {
      "pct": 50,
      "desc": "Reconheceu a razão quadrática mas montou a proporção invertida."
     },
     {
      "pct": 75,
      "desc": "Montou 27 × 25/9 e errou apenas a conta."
     },
     {
      "pct": 100,
      "desc": "Concluiu que a área do maior é 75 cm²."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-20",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Comprimento de arco",
  "tempoSugerido": 10,
  "enunciado": "Um pêndulo de 9 dm de comprimento descreve um arco de 120°. Use π = 3,14.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é o comprimento do arco descrito pela ponta do pêndulo?",
    "respostaFinal": {
     "rotulo": "comprimento em dm",
     "aceitas": [
      "18,84",
      "18.84"
     ]
    },
    "conferencia": "(120/360) * 2 * 3.14 * 9",
    "resolucao": "A circunferência completa mede 2π × 9 = 56,52 dm.\nO arco de 120° é 120/360 = 1/3 dela.\nComprimento: 56,52/3 = 18,84 dm.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou a área do setor em vez do arco, ou usou a fração 120/180."
     },
     {
      "pct": 50,
      "desc": "Aplicou a fração 1/3 ao perímetro e chegou a 18,84 dm."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-21",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Hexágono regular",
  "tempoSugerido": 12,
  "enunciado": "Um mosaico é formado por hexágonos regulares de 4 cm de lado. Use √3 = 1,73.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a área de cada hexágono?",
    "respostaFinal": {
     "rotulo": "área em cm²",
     "aceitas": [
      "41,52",
      "41.52"
     ],
     "intervalo": [
      41.4,
      41.6
     ]
    },
    "conferencia": "6 * 1.73 * 16 / 4",
    "resolucao": "O hexágono regular se decompõe em 6 triângulos equiláteros de lado 4.\nCada triângulo tem área 16 × 1,73/4 = 6,92 cm².\nTotal: 6 × 6,92 = 41,52 cm².",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou 4 triângulos em vez de 6, ou tratou o hexágono como um quadrado de lado 4."
     },
     {
      "pct": 50,
      "desc": "Decompôs em triângulos equiláteros mas errou a área de cada um."
     },
     {
      "pct": 75,
      "desc": "Montou 6 × 6,92 e errou apenas a conta."
     },
     {
      "pct": 100,
      "desc": "Chegou à área de 41,52 cm²."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-22",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Diagonal do cubo",
  "tempoSugerido": 12,
  "enunciado": "Uma caixa em forma de cubo tem 5 cm de aresta. Use √3 = 1,73 e √2 = 1,41.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a medida da diagonal de uma face do cubo?",
    "respostaFinal": {
     "rotulo": "diagonal da face em cm",
     "aceitas": [
      "7,05",
      "7.05"
     ],
     "intervalo": [
      7,
      7.1
     ]
    },
    "conferencia": "5 * 1.41",
    "resolucao": "A diagonal de um quadrado de lado L é L√2.\nAqui: 5 × 1,41 = 7,05 cm.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou √3 em vez de √2, confundindo com a diagonal do cubo."
     },
     {
      "pct": 50,
      "desc": "Aplicou L√2 e chegou a 7,05 cm."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a medida da diagonal do cubo?",
    "respostaFinal": {
     "rotulo": "diagonal do cubo em cm",
     "aceitas": [
      "8,65",
      "8.65"
     ],
     "intervalo": [
      8.6,
      8.7
     ]
    },
    "conferencia": "5 * 1.73",
    "resolucao": "A diagonal do cubo de aresta L é L√3.\nAqui: 5 × 1,73 = 8,65 cm.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Repetiu a diagonal da face, ou somou aresta e diagonal da face."
     },
     {
      "pct": 50,
      "desc": "Aplicou L√3 e chegou a 8,65 cm."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-23",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Pirâmide",
  "tempoSugerido": 12,
  "enunciado": "Uma pirâmide reta tem base quadrada de lado 6 cm e altura 4 cm.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule o volume da pirâmide.",
    "respostaFinal": {
     "rotulo": "volume em cm³",
     "aceitas": [
      "48"
     ]
    },
    "conferencia": "(1/3) * 36 * 4",
    "resolucao": "O volume da pirâmide é (1/3) × área da base × altura.\nV = (1/3) × 36 × 4 = 48 cm³.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Esqueceu o fator 1/3 e apresentou 144, ou usou o lado da base como área."
     },
     {
      "pct": 50,
      "desc": "Aplicou a fórmula e chegou a 48 cm³."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Calcule o apótema da pirâmide, isto é, a altura de uma face lateral.",
    "respostaFinal": {
     "rotulo": "apótema em cm",
     "aceitas": [
      "5",
      "5 cm"
     ]
    },
    "conferencia": "Math.sqrt(16 + 9)",
    "resolucao": "O apótema é a hipotenusa do triângulo formado pela altura da pirâmide (4) e pelo apótema da base (metade do lado, 3).\nApótema = √(4² + 3²) = √25 = 5 cm.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Usou o lado inteiro (6) em vez da metade, ou somou 4 e 3."
     },
     {
      "pct": 50,
      "desc": "Aplicou Pitágoras com a metade do lado e chegou a 5 cm."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-24",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Corda e distância ao centro",
  "tempoSugerido": 12,
  "enunciado": "Em uma circunferência de raio 13 cm, uma corda está a 5 cm do centro.",
  "figura": "<svg viewBox=\"0 0 260 200\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"130\" cy=\"100\" r=\"78\"/><path d=\"M52 140 L208 140\"/><path d=\"M130 100 L130 140\" stroke-dasharray=\"4 4\" stroke-width=\"1.5\"/><path d=\"M130 100 L208 140\" stroke-width=\"1.5\"/><circle cx=\"130\" cy=\"100\" r=\"2.5\" fill=\"currentColor\"/><text x=\"136\" y=\"126\" font-size=\"11\" fill=\"currentColor\" stroke=\"none\">5</text><text x=\"176\" y=\"112\" font-size=\"11\" fill=\"currentColor\" stroke=\"none\">13</text></svg>",
  "figuraAlt": "Circunferência com uma corda horizontal, o segmento de 5 unidades do centro até a corda e o raio de 13 unidades até a extremidade da corda.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é o comprimento dessa corda?",
    "respostaFinal": {
     "rotulo": "comprimento em cm",
     "aceitas": [
      "24",
      "24 cm"
     ]
    },
    "conferencia": "2 * Math.sqrt(169 - 25)",
    "resolucao": "O segmento que vai do centro à corda é perpendicular a ela e a divide ao meio.\nForma-se um triângulo retângulo com hipotenusa 13 (raio) e um cateto 5.\nA metade da corda é √(169 − 25) = √144 = 12.\nLogo, a corda mede 2 × 12 = 24 cm.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Achou a metade da corda e apresentou 12 como resposta, sem dobrar."
     },
     {
      "pct": 50,
      "desc": "Montou o triângulo retângulo mas errou o cateto."
     },
     {
      "pct": 75,
      "desc": "Chegou a 12 e errou apenas ao dobrar."
     },
     {
      "pct": 100,
      "desc": "Concluiu que a corda mede 24 cm."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Geometria plana e analítica",
  "id": "geo-25",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Distância mínima",
  "tempoSugerido": 15,
  "enunciado": "Considere a reta y = x e o ponto P(4, 0) no plano cartesiano.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine o ponto da reta mais próximo de P.",
    "respostaFinal": {
     "rotulo": "abscissa do ponto",
     "aceitas": [
      "2"
     ]
    },
    "conferencia": "8 / (2*2)",
    "resolucao": "Um ponto da reta tem coordenadas (x, x).\nO quadrado da distância até P é d² = (x − 4)² + x² = 2x² − 8x + 16.\nÉ uma parábola de concavidade para cima, com mínimo em x = 8/4 = 2.\nO ponto mais próximo é (2, 2).",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Escreveu a expressão da distância mas não localizou o mínimo, ou tomou o pé da perpendicular por inspeção sem justificar."
     },
     {
      "pct": 50,
      "desc": "Minimizou a expressão e concluiu que o ponto é (2, 2)."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é essa distância mínima?",
    "respostaFinal": {
     "rotulo": "distância",
     "aceitas": [
      "2,83",
      "2.83",
      "2√2"
     ],
     "intervalo": [
      2.8,
      2.85
     ]
    },
    "conferencia": "Math.sqrt(2*4 - 8*2 + 16)",
    "resolucao": "Substituindo x = 2: d² = 2 × 4 − 16 + 16 = 8.\nLogo d = √8 = 2√2 ≈ 2,83.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Apresentou 8 como distância, esquecendo de extrair a raiz."
     },
     {
      "pct": 50,
      "desc": "Substituiu e chegou a 2√2, aproximadamente 2,83."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-01",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Média, mediana e moda",
  "tempoSugerido": 12,
  "enunciado": "Os valores registrados em uma pesquisa foram: 4, 7, 7, 9 e 13.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule a média aritmética dos valores.",
    "respostaFinal": {
     "rotulo": "média",
     "aceitas": [
      "8"
     ]
    },
    "conferencia": "(4+7+7+9+13)/5",
    "resolucao": "A soma é 4 + 7 + 7 + 9 + 13 = 40.\nDividindo pelos 5 valores: média = 8.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu por 4, ignorando o valor repetido, ou errou a soma."
     },
     {
      "pct": 50,
      "desc": "Somou os cinco valores e chegou à média 8."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Determine a mediana e a moda, e explique por que elas diferem da média neste conjunto.",
    "respostaFinal": {
     "rotulo": "mediana",
     "aceitas": [
      "7"
     ]
    },
    "conferencia": "7",
    "resolucao": "Com os valores em ordem, a mediana é o valor central: 7.\nA moda é o valor mais frequente: 7, que aparece duas vezes.\nA média (8) é maior porque o valor 13 puxa a soma para cima; mediana e moda não se deixam afetar por um valor extremo isolado.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Acertou mediana e moda mas não explicou a diferença, ou tomou a mediana como a média dos extremos."
     },
     {
      "pct": 50,
      "desc": "Indicou mediana e moda iguais a 7 e explicou o efeito do valor extremo sobre a média."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-02",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Média ponderada",
  "tempoSugerido": 12,
  "enunciado": "Em uma disciplina, a nota final é a média ponderada de três avaliações: a primeira tem peso 2, a segunda peso 3 e a terceira peso 5. Um aluno tirou 6,0 na primeira, 8,0 na segunda e 7,0 na terceira.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a nota final do aluno?",
    "respostaFinal": {
     "rotulo": "nota final",
     "aceitas": [
      "7,1",
      "7.1"
     ]
    },
    "conferencia": "(6*2 + 8*3 + 7*5)/10",
    "resolucao": "Soma ponderada: 6 × 2 + 8 × 3 + 7 × 5 = 12 + 24 + 35 = 71.\nSoma dos pesos: 2 + 3 + 5 = 10.\nNota final: 71/10 = 7,1.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou a média simples das três notas (7,0), ignorando os pesos."
     },
     {
      "pct": 50,
      "desc": "Multiplicou pelos pesos mas dividiu por 3 em vez de pela soma dos pesos."
     },
     {
      "pct": 75,
      "desc": "Montou a média ponderada e errou apenas a conta."
     },
     {
      "pct": 100,
      "desc": "Chegou à nota final 7,1."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-03",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Média com inclusão de valor",
  "tempoSugerido": 12,
  "enunciado": "A média de 9 valores é 15. Um décimo valor é acrescentado ao conjunto e a média passa a ser 16.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é o décimo valor?",
    "respostaFinal": {
     "rotulo": "valor",
     "aceitas": [
      "25"
     ]
    },
    "conferencia": "10*16 - 9*15",
    "resolucao": "A soma dos 9 primeiros é 9 × 15 = 135.\nA soma dos 10 valores é 10 × 16 = 160.\nO valor acrescentado é 160 − 135 = 25.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta, ou apenas o número, sem indicar o raciocínio."
     },
     {
      "pct": 25,
      "desc": "Somou a diferença das médias (16 − 15 = 1) ao total, ou dividiu 160 por 9."
     },
     {
      "pct": 50,
      "desc": "Calculou uma das somas corretamente e errou a outra."
     },
     {
      "pct": 75,
      "desc": "Montou 160 − 135 e errou apenas a subtração."
     },
     {
      "pct": 100,
      "desc": "Concluiu que o décimo valor é 25."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-04",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Mediana em conjunto par",
  "tempoSugerido": 10,
  "enunciado": "Foram registrados os seguintes tempos, em minutos: 3, 5, 8, 10, 12 e 15.",
  "itens": [
   {
    "id": "unico",
    "comando": "Determine a mediana dos tempos.",
    "respostaFinal": {
     "rotulo": "mediana",
     "aceitas": [
      "9"
     ]
    },
    "conferencia": "(8 + 10)/2",
    "resolucao": "Os valores já estão em ordem crescente e são 6 — número par.\nA mediana é a média dos dois centrais, que são 8 e 10.\nMediana: (8 + 10)/2 = 9.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Apontou 8 ou 10 como mediana, sem fazer a média dos dois centrais."
     },
     {
      "pct": 50,
      "desc": "Calculou a média dos dois valores centrais e chegou a 9."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-05",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Amplitude e dispersão",
  "tempoSugerido": 10,
  "enunciado": "Dois conjuntos têm a mesma média 20. O conjunto A é formado por 18, 20 e 22; o conjunto B, por 5, 20 e 35.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule a amplitude de cada conjunto.",
    "respostaFinal": {
     "rotulo": "amplitude do conjunto B",
     "aceitas": [
      "30"
     ]
    },
    "conferencia": "35 - 5",
    "resolucao": "Amplitude é a diferença entre o maior e o menor valor.\nConjunto A: 22 − 18 = 4.\nConjunto B: 35 − 5 = 30.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou a média em vez da amplitude, ou somou os extremos."
     },
     {
      "pct": 50,
      "desc": "Calculou as duas amplitudes: 4 e 30."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Explique por que a média sozinha não distingue os dois conjuntos.",
    "resolucao": "A média informa o centro dos dados, mas não diz quão espalhados eles estão em torno dele.\nOs dois conjuntos têm o mesmo centro (20) e comportamentos muito diferentes: em A os valores ficam colados na média, em B eles se afastam bastante.\nPor isso é preciso uma medida de dispersão — amplitude, variância ou desvio padrão — ao lado da média.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Afirmou que os conjuntos são diferentes sem explicar o que a média deixa de capturar."
     },
     {
      "pct": 50,
      "desc": "Explicou que a média mede posição e não dispersão, citando uma medida de dispersão adequada."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-06",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Média de grupos combinados",
  "tempoSugerido": 12,
  "enunciado": "Uma turma de 20 alunos teve média 6,0 em uma prova. Outra turma, de 30 alunos, teve média 8,0 na mesma prova.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a média das duas turmas juntas?",
    "respostaFinal": {
     "rotulo": "média",
     "aceitas": [
      "7,2",
      "7.2"
     ]
    },
    "conferencia": "(20*6 + 30*8)/50",
    "resolucao": "Soma da primeira turma: 20 × 6 = 120.\nSoma da segunda: 30 × 8 = 240.\nMédia geral: (120 + 240)/50 = 360/50 = 7,2.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou a média das médias (7,0), ignorando que as turmas têm tamanhos diferentes."
     },
     {
      "pct": 50,
      "desc": "Ponderou pelos tamanhos das turmas e chegou a 7,2."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-07",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Quartis",
  "tempoSugerido": 15,
  "enunciado": "Os valores a seguir estão em ordem crescente: 2, 4, 5, 7, 8, 10, 12, 14, 15, 18 e 20.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine a mediana e os quartis inferior e superior.",
    "respostaFinal": {
     "rotulo": "mediana",
     "aceitas": [
      "10"
     ]
    },
    "conferencia": "10",
    "resolucao": "São 11 valores, então a mediana é o sexto: 10.\nO quartil inferior é a mediana dos cinco primeiros (2, 4, 5, 7, 8): 5.\nO quartil superior é a mediana dos cinco últimos (12, 14, 15, 18, 20): 15.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Acertou a mediana mas incluiu-a nas duas metades ao calcular os quartis, ou tomou a média dos extremos."
     },
     {
      "pct": 50,
      "desc": "Indicou mediana 10, quartil inferior 5 e quartil superior 15."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Calcule a amplitude interquartil e explique o que ela mede.",
    "respostaFinal": {
     "rotulo": "amplitude interquartil",
     "aceitas": [
      "10"
     ]
    },
    "conferencia": "15 - 5",
    "resolucao": "A amplitude interquartil é a diferença entre os quartis: 15 − 5 = 10.\nEla mede a dispersão da metade central dos dados e, por isso, não é afetada por valores extremos nas pontas.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou a diferença mas não explicou o que ela mede, ou usou a amplitude total (18)."
     },
     {
      "pct": 50,
      "desc": "Chegou a 10 e explicou que a medida descreve a dispersão da metade central."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-08",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Frequência relativa",
  "tempoSugerido": 10,
  "enunciado": "Em uma pesquisa com 200 pessoas, 60 escolheram a opção A, 90 escolheram B e as demais escolheram C.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a frequência relativa da opção A, em porcentagem?",
    "respostaFinal": {
     "rotulo": "porcentagem",
     "aceitas": [
      "30%",
      "30",
      "0,3",
      "0.3"
     ]
    },
    "conferencia": "100 * 60 / 200",
    "resolucao": "Frequência relativa = 60/200 = 0,30, ou seja, 30%.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu pelo número de opções em vez do total de pessoas, ou apresentou 60 como porcentagem."
     },
     {
      "pct": 50,
      "desc": "Dividiu pelo total e chegou a 30%."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Em um gráfico de setores, qual seria o ângulo central do setor correspondente à opção C?",
    "respostaFinal": {
     "rotulo": "ângulo em graus",
     "aceitas": [
      "90",
      "90°"
     ]
    },
    "conferencia": "360 * 50 / 200",
    "resolucao": "A opção C teve 200 − 60 − 90 = 50 respostas, ou seja, 25% do total.\nO ângulo é 25% de 360°: 0,25 × 360 = 90°.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Errou a contagem de C, ou usou 180° como total do círculo."
     },
     {
      "pct": 50,
      "desc": "Calculou a fração de C e chegou a 90°."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-09",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Média móvel",
  "tempoSugerido": 12,
  "enunciado": "As vendas mensais de uma loja, em milhares de reais, foram: 12, 18, 24 e 30.",
  "itens": [
   {
    "id": "unico",
    "comando": "Calcule as médias móveis de três meses possíveis nessa série.",
    "respostaFinal": {
     "rotulo": "segunda média móvel",
     "aceitas": [
      "24"
     ]
    },
    "conferencia": "(18+24+30)/3",
    "resolucao": "A primeira média móvel usa os meses 1 a 3: (12 + 18 + 24)/3 = 18.\nA segunda usa os meses 2 a 4: (18 + 24 + 30)/3 = 24.\nSó é possível calcular duas médias móveis de três meses numa série de quatro pontos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou a média dos quatro meses, ou apresentou apenas uma das duas médias móveis."
     },
     {
      "pct": 50,
      "desc": "Calculou as duas médias móveis, 18 e 24, indicando quais meses entram em cada uma."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-10",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Efeito de valor discrepante",
  "tempoSugerido": 12,
  "enunciado": "Os salários mensais, em milhares de reais, de cinco funcionários de uma pequena empresa são: 10, 11, 12, 13 e 94.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule a média e a mediana dos salários.",
    "respostaFinal": {
     "rotulo": "média em milhares",
     "aceitas": [
      "28"
     ]
    },
    "conferencia": "(10+11+12+13+94)/5",
    "resolucao": "Soma: 10 + 11 + 12 + 13 + 94 = 140. Média: 140/5 = 28.\nCom os valores em ordem, a mediana é o terceiro: 12.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Errou a soma, ou apontou como mediana a média entre os extremos."
     },
     {
      "pct": 50,
      "desc": "Chegou a média 28 e mediana 12."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual das duas medidas descreve melhor o salário típico desta empresa? Justifique.",
    "resolucao": "A mediana descreve melhor: 12 mil está próximo do que quatro dos cinco funcionários recebem.\nA média de 28 mil é maior do que o salário de 80% das pessoas da empresa, porque um único valor muito alto puxa a soma para cima.\nMédia é sensível a valores extremos; mediana, não.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Escolheu a mediana sem justificar, ou defendeu a média por ela usar todos os dados, sem tratar do efeito do valor extremo."
     },
     {
      "pct": 50,
      "desc": "Escolheu a mediana e justificou pelo efeito do valor discrepante sobre a média."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-11",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Variância e desvio padrão",
  "tempoSugerido": 15,
  "enunciado": "Considere o conjunto de valores: 2, 4, 4, 4, 5, 5, 7 e 9.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule a média do conjunto.",
    "respostaFinal": {
     "rotulo": "média",
     "aceitas": [
      "5"
     ]
    },
    "conferencia": "(2+4+4+4+5+5+7+9)/8",
    "resolucao": "Soma: 2 + 4 + 4 + 4 + 5 + 5 + 7 + 9 = 40.\nMédia: 40/8 = 5.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Contou os valores repetidos uma só vez, dividindo por 5."
     },
     {
      "pct": 50,
      "desc": "Somou os oito valores e chegou à média 5."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Calcule a variância e o desvio padrão do conjunto.",
    "respostaFinal": {
     "rotulo": "desvio padrão",
     "aceitas": [
      "2"
     ]
    },
    "conferencia": "Math.sqrt(32/8)",
    "resolucao": "Desvios em relação à média 5: −3, −1, −1, −1, 0, 0, 2, 4.\nQuadrados: 9, 1, 1, 1, 0, 0, 4, 16, que somam 32.\nVariância: 32/8 = 4. Desvio padrão: √4 = 2.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou os desvios sem elevar ao quadrado (o que dá zero), ou não extraiu a raiz ao final."
     },
     {
      "pct": 50,
      "desc": "Calculou variância 4 e desvio padrão 2."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-12",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Mediana em tabela de frequências",
  "tempoSugerido": 15,
  "enunciado": "Uma pesquisa registrou o número de filhos por família em 40 domicílios: 8 famílias sem filhos, 12 com 1 filho, 14 com 2 filhos e 6 com 3 filhos.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine a mediana do número de filhos.",
    "respostaFinal": {
     "rotulo": "mediana",
     "aceitas": [
      "1,5",
      "1.5"
     ]
    },
    "conferencia": "(1 + 2)/2",
    "resolucao": "São 40 dados, então a mediana é a média entre o 20º e o 21º valores em ordem.\nAcumulando: até 0 filho são 8 famílias; até 1 filho são 20; até 2 filhos são 34.\nEntão o 20º valor é 1 e o 21º é 2, e a mediana é (1 + 2)/2 = 1,5.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Tomou a categoria de maior frequência (2 filhos) como mediana, confundindo com a moda."
     },
     {
      "pct": 50,
      "desc": "Montou a frequência acumulada mas identificou a posição errada."
     },
     {
      "pct": 75,
      "desc": "Localizou o 20º e o 21º valores e errou apenas a média entre eles."
     },
     {
      "pct": 100,
      "desc": "Concluiu que a mediana é 1,5."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Calcule a média do número de filhos por família.",
    "respostaFinal": {
     "rotulo": "média",
     "aceitas": [
      "1,45",
      "1.45"
     ]
    },
    "conferencia": "(8*0 + 12*1 + 14*2 + 6*3)/40",
    "resolucao": "Soma total de filhos: 8 × 0 + 12 × 1 + 14 × 2 + 6 × 3 = 0 + 12 + 28 + 18 = 58.\nMédia: 58/40 = 1,45 filhos por família.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou a média das categorias (0, 1, 2, 3), ignorando as frequências, ou dividiu por 4."
     },
     {
      "pct": 50,
      "desc": "Ponderou pelas frequências e chegou a 1,45."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-13",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Nota necessária para atingir média",
  "tempoSugerido": 12,
  "enunciado": "Um estudante precisa de média 6,5 em três provas de mesmo peso para ser aprovado. Ele tirou 5,5 na primeira e 7,0 na segunda.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a nota mínima que ele precisa na terceira prova?",
    "respostaFinal": {
     "rotulo": "nota",
     "aceitas": [
      "7",
      "7,0",
      "7.0"
     ]
    },
    "conferencia": "3*6.5 - 5.5 - 7",
    "resolucao": "A soma das três notas precisa ser 3 × 6,5 = 19,5.\nEle já tem 5,5 + 7,0 = 12,5.\nFalta 19,5 − 12,5 = 7,0.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Fez a média das duas primeiras notas e comparou com 6,5, sem projetar a soma das três."
     },
     {
      "pct": 50,
      "desc": "Calculou a soma necessária mas errou a subtração."
     },
     {
      "pct": 75,
      "desc": "Montou 19,5 − 12,5 e errou apenas a conta."
     },
     {
      "pct": 100,
      "desc": "Concluiu que a nota mínima é 7,0."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-14",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Média geométrica",
  "tempoSugerido": 15,
  "enunciado": "As vendas de uma empresa cresceram 21% no primeiro ano e 44% no segundo ano.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual foi a taxa média anual de crescimento no período? Justifique por que não é a média aritmética entre 21% e 44%.",
    "respostaFinal": {
     "rotulo": "taxa média anual",
     "aceitas": [
      "32%",
      "32",
      "0,32",
      "0.32"
     ]
    },
    "conferencia": "100 * (Math.sqrt(1.21 * 1.44) - 1)",
    "resolucao": "O crescimento acumulado é 1,21 × 1,44 = 1,7424.\nA taxa média anual t satisfaz (1 + t)² = 1,7424, então 1 + t = √1,7424 = 1,32 e t = 32%.\nNão é a média aritmética (32,5%) porque taxas se compõem por multiplicação, não por soma: o segundo ano incide sobre um valor já aumentado.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Apresentou a média aritmética 32,5% sem justificar, ou somou as taxas chegando a 65%."
     },
     {
      "pct": 50,
      "desc": "Multiplicou os fatores mas não extraiu a raiz."
     },
     {
      "pct": 75,
      "desc": "Chegou a √1,7424 e errou apenas a conversão para porcentagem."
     },
     {
      "pct": 100,
      "desc": "Chegou à taxa média de 32% ao ano e explicou por que as taxas se compõem multiplicativamente."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Estatística e médias",
  "id": "est-15",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Leitura de gráfico e proporção",
  "tempoSugerido": 12,
  "enunciado": "Um relatório mostra a distribuição de 1.200 atendimentos por canal: 45% por aplicativo, 30% por telefone e o restante presencialmente.",
  "itens": [
   {
    "id": "a",
    "comando": "Quantos atendimentos foram presenciais?",
    "respostaFinal": {
     "rotulo": "atendimentos",
     "aceitas": [
      "300"
     ]
    },
    "conferencia": "1200 * 0.25",
    "resolucao": "O percentual presencial é 100% − 45% − 30% = 25%.\nAtendimentos: 0,25 × 1.200 = 300.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou 45% e 30% e aplicou o resultado ao total, ou esqueceu de converter a porcentagem."
     },
     {
      "pct": 50,
      "desc": "Calculou os 25% restantes e chegou a 300 atendimentos."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Se os atendimentos por aplicativo crescerem 20% e os demais permanecerem iguais, qual passará a ser a participação do aplicativo no total?",
    "respostaFinal": {
     "rotulo": "participação em porcentagem",
     "aceitas": [
      "50%",
      "50"
     ],
     "intervalo": [
      49.5,
      50.5
     ]
    },
    "conferencia": "100 * (540*1.2) / (1200 + 540*0.2)",
    "resolucao": "Hoje o aplicativo tem 0,45 × 1.200 = 540 atendimentos; com 20% a mais, 648.\nO total passa a ser 1.200 + 108 = 1.308.\nParticipação: 648/1.308 ≈ 0,495, ou seja, cerca de 50%.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou 20 pontos percentuais aos 45%, chegando a 65%, sem recalcular o total."
     },
     {
      "pct": 50,
      "desc": "Atualizou numerador e denominador e chegou a cerca de 50%."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-01",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Juros simples",
  "tempoSugerido": 12,
  "enunciado": "Um capital de R$ 2.000,00 é aplicado a juros simples de 5% ao mês durante 8 meses.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o valor dos juros no período?",
    "respostaFinal": {
     "rotulo": "juros em reais",
     "aceitas": [
      "800",
      "R$ 800,00"
     ]
    },
    "conferencia": "2000 * 0.05 * 8",
    "resolucao": "Nos juros simples, J = C · i · t.\nJ = 2.000 × 0,05 × 8 = R$ 800,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Aplicou a fórmula dos juros compostos, ou esqueceu de multiplicar pelo número de meses."
     },
     {
      "pct": 50,
      "desc": "Aplicou J = C·i·t e chegou a R$ 800,00."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o montante ao fim dos 8 meses?",
    "respostaFinal": {
     "rotulo": "montante em reais",
     "aceitas": [
      "2800",
      "R$ 2.800,00"
     ]
    },
    "conferencia": "2000 + 2000*0.05*8",
    "resolucao": "O montante é capital mais juros: 2.000 + 800 = R$ 2.800,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Apresentou apenas os juros, sem somar o capital."
     },
     {
      "pct": 50,
      "desc": "Somou capital e juros e chegou a R$ 2.800,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-02",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Juros compostos",
  "tempoSugerido": 12,
  "enunciado": "Um capital de R$ 2.000,00 é aplicado a juros compostos de 10% ao ano por 3 anos.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o montante ao fim dos 3 anos?",
    "respostaFinal": {
     "rotulo": "montante em reais",
     "aceitas": [
      "2662",
      "R$ 2.662,00"
     ]
    },
    "conferencia": "2000 * Math.pow(1.1, 3)",
    "resolucao": "Nos juros compostos, M = C(1 + i)ᵗ.\nM = 2.000 × 1,1³ = 2.000 × 1,331 = R$ 2.662,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou por juros simples (2.600), ou usou expoente 2."
     },
     {
      "pct": 50,
      "desc": "Aplicou M = C(1 + i)ᵗ e chegou a R$ 2.662,00."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Quanto o regime composto rendeu a mais que o regime simples, no mesmo prazo e à mesma taxa?",
    "respostaFinal": {
     "rotulo": "diferença em reais",
     "aceitas": [
      "62",
      "R$ 62,00"
     ]
    },
    "conferencia": "2000*Math.pow(1.1,3) - (2000 + 2000*0.1*3)",
    "resolucao": "No regime simples, o montante seria 2.000 + 2.000 × 0,1 × 3 = 2.600.\nA diferença é 2.662 − 2.600 = R$ 62,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Comparou apenas as taxas, ou calculou o montante simples errado."
     },
     {
      "pct": 50,
      "desc": "Comparou os dois montantes e chegou a R$ 62,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-03",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Descontos sucessivos",
  "tempoSugerido": 12,
  "enunciado": "Uma loja anuncia um desconto de 20% e, sobre o valor já reduzido, concede mais 10% de desconto no pagamento à vista.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é o desconto total, em porcentagem, sobre o preço original?",
    "respostaFinal": {
     "rotulo": "desconto total em porcentagem",
     "aceitas": [
      "28%",
      "28"
     ]
    },
    "conferencia": "100 * (1 - 0.8*0.9)",
    "resolucao": "Aplicar 20% de desconto é multiplicar por 0,8; aplicar 10%, por 0,9.\nO fator acumulado é 0,8 × 0,9 = 0,72, ou seja, paga-se 72% do preço.\nO desconto total é 100% − 72% = 28%.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou os descontos, chegando a 30%, erro clássico de tratar percentuais sucessivos como aditivos."
     },
     {
      "pct": 50,
      "desc": "Multiplicou os fatores mas não converteu de volta em desconto."
     },
     {
      "pct": 75,
      "desc": "Chegou ao fator 0,72 e errou apenas a conversão final."
     },
     {
      "pct": 100,
      "desc": "Concluiu que o desconto total é de 28%."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-04",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Aumentos sucessivos",
  "tempoSugerido": 12,
  "enunciado": "Um produto sofreu dois reajustes seguidos: 10% e depois 20%.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual foi o aumento acumulado, em porcentagem?",
    "respostaFinal": {
     "rotulo": "aumento acumulado em porcentagem",
     "aceitas": [
      "32%",
      "32"
     ]
    },
    "conferencia": "100 * (1.1*1.2 - 1)",
    "resolucao": "O fator acumulado é 1,10 × 1,20 = 1,32.\nLogo, o aumento é de 32%.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou os aumentos, chegando a 30%, sem considerar que o segundo incide sobre o valor já reajustado."
     },
     {
      "pct": 50,
      "desc": "Multiplicou os fatores mas não converteu para porcentagem de aumento."
     },
     {
      "pct": 75,
      "desc": "Chegou ao fator 1,32 e errou apenas a conversão."
     },
     {
      "pct": 100,
      "desc": "Concluiu que o aumento acumulado é de 32%."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-05",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Aumento seguido de desconto",
  "tempoSugerido": 12,
  "enunciado": "O preço de um produto sofreu um aumento de 25% e, depois, um desconto de 20% sobre o novo preço.",
  "itens": [
   {
    "id": "unico",
    "comando": "O preço final é maior, menor ou igual ao preço original? Justifique com o cálculo.",
    "respostaFinal": {
     "rotulo": "fator acumulado",
     "aceitas": [
      "1",
      "1,0",
      "1.0"
     ]
    },
    "conferencia": "1.25 * 0.8",
    "resolucao": "O fator acumulado é 1,25 × 0,80 = 1,00.\nO preço final é exatamente igual ao original.\nIsso acontece porque o desconto de 20% incide sobre um valor maior: 20% de 1,25 é exatamente os 0,25 que haviam sido acrescentados.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Afirmou que o preço aumenta 5% por subtrair os percentuais, sem multiplicar os fatores."
     },
     {
      "pct": 50,
      "desc": "Multiplicou os fatores mas não interpretou o resultado."
     },
     {
      "pct": 75,
      "desc": "Chegou ao fator 1,00 e não explicou por que a compensação é exata."
     },
     {
      "pct": 100,
      "desc": "Mostrou que o fator acumulado é 1,00 e concluiu que o preço final é igual ao original, com a justificativa."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-06",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Taxas equivalentes",
  "tempoSugerido": 15,
  "enunciado": "Uma aplicação rende 1% ao mês em regime de juros compostos.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é a taxa anual equivalente? Use 1,01¹² = 1,1268.",
    "respostaFinal": {
     "rotulo": "taxa anual em porcentagem",
     "aceitas": [
      "12,68%",
      "12,68",
      "12.68"
     ]
    },
    "conferencia": "100 * (1.1268 - 1)",
    "resolucao": "A taxa equivalente vem da composição dos 12 meses: (1 + i_a) = 1,01¹² = 1,1268.\nLogo i_a = 0,1268, ou seja, 12,68% ao ano.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Multiplicou 1% por 12, chegando a 12%, que é a taxa proporcional e não a equivalente."
     },
     {
      "pct": 50,
      "desc": "Usou a potência mas não converteu o fator em taxa."
     },
     {
      "pct": 75,
      "desc": "Chegou a 1,1268 e errou apenas a conversão em porcentagem."
     },
     {
      "pct": 100,
      "desc": "Concluiu que a taxa anual equivalente é 12,68%."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-07",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "À vista ou parcelado",
  "tempoSugerido": 15,
  "enunciado": "Um aparelho custa R$ 900,00 à vista ou pode ser pago em 3 parcelas mensais iguais de R$ 340,00.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o acréscimo total, em reais e em porcentagem, na compra parcelada?",
    "respostaFinal": {
     "rotulo": "acréscimo em porcentagem",
     "aceitas": [
      "13,33%",
      "13,33",
      "13.33"
     ],
     "intervalo": [
      13.2,
      13.4
     ]
    },
    "conferencia": "100 * (3*340 - 900) / 900",
    "resolucao": "Total parcelado: 3 × 340 = 1.020.\nAcréscimo: 1.020 − 900 = R$ 120,00.\nEm porcentagem: 120/900 ≈ 0,1333, ou seja, 13,33%.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou o acréscimo em reais mas dividiu pelo total parcelado em vez do preço à vista."
     },
     {
      "pct": 50,
      "desc": "Chegou a R$ 120,00 de acréscimo e 13,33% sobre o preço à vista."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Se o comprador tem os R$ 900,00 e consegue uma aplicação que rende 2% ao mês, vale a pena parcelar? Justifique com números.",
    "resolucao": "Parcelando, ele aplica os 900 e retira 340 por mês.\nApós o primeiro mês: 900 × 1,02 = 918; pagando 340, sobram 578.\nApós o segundo: 578 × 1,02 = 589,56; pagando 340, sobram 249,56.\nApós o terceiro: 249,56 × 1,02 = 254,55; pagando 340, faltam 85,45.\nComo ele fica devendo, o rendimento de 2% ao mês não cobre o acréscimo de 13,33%: não vale a pena parcelar.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Comparou 2% ao mês com 13,33% no total sem colocar as duas grandezas no mesmo prazo, ou apenas afirmou a conclusão sem contas."
     },
     {
      "pct": 50,
      "desc": "Simulou a aplicação com as retiradas mensais e concluiu, com números, que não compensa parcelar."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-08",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Inflação e poder de compra",
  "tempoSugerido": 15,
  "enunciado": "Em um ano, a inflação foi de 8% e o salário de um trabalhador foi reajustado em 5%.",
  "itens": [
   {
    "id": "unico",
    "comando": "O poder de compra do salário aumentou ou diminuiu? De quantos por cento foi essa perda ou ganho?",
    "respostaFinal": {
     "rotulo": "perda de poder de compra, em porcentagem",
     "aceitas": [
      "2,78%",
      "2,78",
      "2.78"
     ],
     "intervalo": [
      2.7,
      2.9
     ]
    },
    "conferencia": "100 * (1 - 1.05/1.08)",
    "resolucao": "O poder de compra varia pela razão entre o fator do salário e o fator dos preços: 1,05/1,08 ≈ 0,9722.\nIsso significa uma perda de aproximadamente 2,78%.\nNão são simplesmente os 3 pontos percentuais de diferença: a comparação é uma razão, não uma subtração.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Subtraiu as taxas e respondeu perda de 3%, tratando a comparação como diferença em vez de razão."
     },
     {
      "pct": 50,
      "desc": "Montou a razão entre os fatores mas não converteu em variação percentual."
     },
     {
      "pct": 75,
      "desc": "Chegou a 0,9722 e errou apenas a conversão."
     },
     {
      "pct": 100,
      "desc": "Concluiu que houve perda de aproximadamente 2,78% no poder de compra."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-09",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Margem sobre custo e sobre venda",
  "tempoSugerido": 15,
  "enunciado": "Um comerciante compra um produto por R$ 80,00 e o revende por R$ 100,00.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o lucro percentual calculado sobre o custo?",
    "respostaFinal": {
     "rotulo": "porcentagem",
     "aceitas": [
      "25%",
      "25"
     ]
    },
    "conferencia": "100 * (100 - 80) / 80",
    "resolucao": "Lucro: 100 − 80 = 20.\nSobre o custo: 20/80 = 0,25, ou seja, 25%.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu o lucro pelo preço de venda, respondendo 20%."
     },
     {
      "pct": 50,
      "desc": "Dividiu o lucro pelo custo e chegou a 25%."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a margem percentual calculada sobre o preço de venda? Explique por que os dois números diferem.",
    "respostaFinal": {
     "rotulo": "porcentagem",
     "aceitas": [
      "20%",
      "20"
     ]
    },
    "conferencia": "100 * (100 - 80) / 100",
    "resolucao": "Sobre a venda: 20/100 = 0,20, ou seja, 20%.\nOs números diferem porque a base de comparação muda: o mesmo lucro de R$ 20,00 representa uma fração maior de 80 do que de 100.\nPor isso é sempre necessário dizer sobre qual valor o percentual foi calculado.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Repetiu os 25% do item anterior, ou apresentou 20% sem explicar a diferença de base."
     },
     {
      "pct": 50,
      "desc": "Chegou a 20% e explicou que a diferença vem da base de cálculo."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-10",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Juro real",
  "tempoSugerido": 15,
  "enunciado": "Uma aplicação rendeu 12% em um ano, período em que a inflação foi de 6%.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual foi o rendimento real da aplicação?",
    "respostaFinal": {
     "rotulo": "rendimento real em porcentagem",
     "aceitas": [
      "5,66%",
      "5,66",
      "5.66"
     ],
     "intervalo": [
      5.6,
      5.7
     ]
    },
    "conferencia": "100 * (1.12/1.06 - 1)",
    "resolucao": "O ganho real é a razão entre os fatores: 1,12/1,06 ≈ 1,0566.\nLogo, o rendimento real foi de aproximadamente 5,66% — e não os 6 pontos percentuais da subtração direta.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Subtraiu as taxas e respondeu 6%, ignorando que a correção é multiplicativa."
     },
     {
      "pct": 50,
      "desc": "Montou a razão entre os fatores sem converter em porcentagem."
     },
     {
      "pct": 75,
      "desc": "Chegou a 1,0566 e errou apenas a conversão."
     },
     {
      "pct": 100,
      "desc": "Concluiu que o rendimento real foi de aproximadamente 5,66%."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-11",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Porcentagem de porcentagem",
  "tempoSugerido": 10,
  "enunciado": "Em uma empresa com 500 funcionários, 40% trabalham na área comercial e, destes, 30% atuam em vendas externas.",
  "itens": [
   {
    "id": "unico",
    "comando": "Quantos funcionários atuam em vendas externas?",
    "respostaFinal": {
     "rotulo": "funcionários",
     "aceitas": [
      "60"
     ]
    },
    "conferencia": "500 * 0.4 * 0.3",
    "resolucao": "Na área comercial: 0,40 × 500 = 200 funcionários.\nEm vendas externas: 0,30 × 200 = 60 funcionários.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou os percentuais (70%) e aplicou ao total, ou aplicou 30% diretamente sobre os 500."
     },
     {
      "pct": 50,
      "desc": "Aplicou os percentuais em cadeia mas errou uma das contas."
     },
     {
      "pct": 75,
      "desc": "Montou 0,4 × 0,3 × 500 e errou apenas o produto."
     },
     {
      "pct": 100,
      "desc": "Concluiu que são 60 funcionários."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-12",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Variação percentual",
  "tempoSugerido": 12,
  "enunciado": "A receita de um município passou de R$ 250 milhões em 2024 para R$ 288 milhões em 2026.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual foi a variação percentual da receita no período?",
    "respostaFinal": {
     "rotulo": "variação em porcentagem",
     "aceitas": [
      "15,2%",
      "15,2",
      "15.2"
     ]
    },
    "conferencia": "100 * (288 - 250)/250",
    "resolucao": "Variação: (288 − 250)/250 = 38/250 = 0,152.\nOu seja, um aumento de 15,2%.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu pela receita final (288) em vez da inicial, ou apresentou a diferença absoluta como percentual."
     },
     {
      "pct": 50,
      "desc": "Dividiu pela receita inicial e chegou a 15,2%."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual seria a receita de 2028 se a mesma variação percentual se repetisse no biênio seguinte?",
    "respostaFinal": {
     "rotulo": "receita em milhões",
     "aceitas": [
      "331,78",
      "331.78",
      "331,8"
     ],
     "intervalo": [
      331.5,
      332.1
     ]
    },
    "conferencia": "288 * 1.152",
    "resolucao": "Aplicando o mesmo fator: 288 × 1,152 = 331,776.\nA receita seria de aproximadamente R$ 331,78 milhões.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou novamente os 38 milhões, tratando o crescimento como constante em valor absoluto."
     },
     {
      "pct": 50,
      "desc": "Aplicou o fator sobre a receita de 2026 e chegou a aproximadamente 331,78 milhões."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-13",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Divisão proporcional",
  "tempoSugerido": 12,
  "enunciado": "Um lucro de R$ 4.500,00 será dividido entre três sócios na proporção 2 : 3 : 4, conforme o capital que cada um investiu.",
  "itens": [
   {
    "id": "unico",
    "comando": "Quanto recebe cada sócio?",
    "respostaFinal": {
     "rotulo": "valor do maior quinhão em reais",
     "aceitas": [
      "2000",
      "R$ 2.000,00"
     ]
    },
    "conferencia": "4500 * 4 / 9",
    "resolucao": "A soma das partes é 2 + 3 + 4 = 9.\nCada parte vale 4.500/9 = 500.\nOs sócios recebem 2 × 500 = 1.000, 3 × 500 = 1.500 e 4 × 500 = R$ 2.000,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Dividiu o total por 3, ignorando a proporção, ou dividiu por 4."
     },
     {
      "pct": 50,
      "desc": "Somou as partes mas errou o valor de cada uma."
     },
     {
      "pct": 75,
      "desc": "Achou o valor da parte e errou apenas a distribuição final."
     },
     {
      "pct": 100,
      "desc": "Concluiu que os sócios recebem R$ 1.000,00, R$ 1.500,00 e R$ 2.000,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-14",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Desconto comercial simples",
  "tempoSugerido": 12,
  "enunciado": "Um título de valor nominal R$ 5.000,00 é descontado 3 meses antes do vencimento, a uma taxa de desconto comercial simples de 2% ao mês.",
  "itens": [
   {
    "id": "unico",
    "comando": "Qual é o valor recebido no ato do desconto?",
    "respostaFinal": {
     "rotulo": "valor em reais",
     "aceitas": [
      "4700",
      "R$ 4.700,00"
     ]
    },
    "conferencia": "5000 - 5000*0.02*3",
    "resolucao": "No desconto comercial simples, o desconto incide sobre o valor nominal: D = N · i · t.\nD = 5.000 × 0,02 × 3 = R$ 300,00.\nValor recebido: 5.000 − 300 = R$ 4.700,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Aplicou o desconto sobre o valor já descontado, ou esqueceu de multiplicar pelos 3 meses."
     },
     {
      "pct": 50,
      "desc": "Calculou o desconto de R$ 300,00 mas não subtraiu do nominal."
     },
     {
      "pct": 75,
      "desc": "Montou a subtração e errou apenas a conta."
     },
     {
      "pct": 100,
      "desc": "Concluiu que o valor recebido é R$ 4.700,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Matemática financeira e porcentagem",
  "id": "fin-15",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Amortização constante",
  "tempoSugerido": 15,
  "enunciado": "Uma dívida de R$ 12.000,00 será paga em 24 prestações mensais, com amortização constante do principal e juros de 1% ao mês sobre o saldo devedor do início de cada mês.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o valor da primeira prestação?",
    "respostaFinal": {
     "rotulo": "valor em reais",
     "aceitas": [
      "620",
      "R$ 620,00"
     ]
    },
    "conferencia": "12000/24 + 12000*0.01",
    "resolucao": "A amortização mensal é 12.000/24 = R$ 500,00.\nOs juros do primeiro mês incidem sobre o saldo total: 1% de 12.000 = R$ 120,00.\nPrimeira prestação: 500 + 120 = R$ 620,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Apresentou apenas a amortização (500), sem somar os juros, ou aplicou os juros sobre a amortização."
     },
     {
      "pct": 50,
      "desc": "Somou amortização e juros do primeiro mês e chegou a R$ 620,00."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o valor da segunda prestação?",
    "respostaFinal": {
     "rotulo": "valor em reais",
     "aceitas": [
      "615",
      "R$ 615,00"
     ]
    },
    "conferencia": "12000/24 + (12000 - 500)*0.01",
    "resolucao": "Após a primeira prestação, o saldo devedor cai para 12.000 − 500 = 11.500.\nJuros do segundo mês: 1% de 11.500 = R$ 115,00.\nSegunda prestação: 500 + 115 = R$ 615,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Repetiu o valor da primeira prestação, sem atualizar o saldo devedor."
     },
     {
      "pct": 50,
      "desc": "Atualizou o saldo e chegou a R$ 615,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Modelagem econômica",
  "id": "eco-01",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Elasticidade-preço da demanda",
  "tempoSugerido": 15,
  "enunciado": "A elasticidade-preço da demanda é a razão entre a variação percentual da quantidade demandada e a variação percentual do preço. Quando um supermercado aumentou em 10% o preço de um produto, as vendas caíram 15%.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule a elasticidade-preço da demanda desse produto.",
    "respostaFinal": {
     "rotulo": "elasticidade",
     "aceitas": [
      "-1,5",
      "-1.5",
      "1,5",
      "1.5"
     ]
    },
    "conferencia": "-15/10",
    "resolucao": "Elasticidade = variação percentual da quantidade / variação percentual do preço.\nE = (−15%)/(+10%) = −1,5.\nO sinal negativo apenas expressa que quantidade e preço se movem em sentidos opostos.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Inverteu a razão, chegando a −0,67, ou subtraiu as variações."
     },
     {
      "pct": 50,
      "desc": "Montou a razão corretamente e chegou a −1,5."
     }
    ]
   },
   {
    "id": "b",
    "comando": "A receita do supermercado com esse produto aumentou ou diminuiu com o reajuste? Justifique.",
    "resolucao": "A receita é preço × quantidade, então o fator acumulado é 1,10 × 0,85 = 0,935.\nA receita caiu cerca de 6,5%.\nÉ o que se espera de uma demanda elástica (|E| > 1): a queda proporcional na quantidade supera o aumento proporcional no preço, e subir o preço reduz a receita.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Afirmou que a receita cai por causa da queda nas vendas, sem calcular o efeito combinado dos dois movimentos."
     },
     {
      "pct": 50,
      "desc": "Multiplicou os fatores, concluiu que a receita cai cerca de 6,5% e relacionou o resultado com a demanda elástica."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Modelagem econômica",
  "id": "eco-02",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Equilíbrio de mercado",
  "tempoSugerido": 15,
  "enunciado": "Em certo mercado, a quantidade ofertada é dada por Qo = 2p − 20 e a quantidade demandada por Qd = 100 − 3p, com p em reais.",
  "itens": [
   {
    "id": "a",
    "comando": "Determine o preço de equilíbrio do mercado.",
    "respostaFinal": {
     "rotulo": "preço em reais",
     "aceitas": [
      "24",
      "R$ 24,00"
     ]
    },
    "conferencia": "120/5",
    "resolucao": "No equilíbrio, oferta e demanda se igualam: 2p − 20 = 100 − 3p.\nDaí 5p = 120 e p = R$ 24,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou as duas funções em vez de igualá-las, ou trocou os sinais ao passar os termos."
     },
     {
      "pct": 50,
      "desc": "Igualou as duas quantidades e chegou a R$ 24,00."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é a quantidade negociada no equilíbrio?",
    "respostaFinal": {
     "rotulo": "quantidade",
     "aceitas": [
      "28"
     ]
    },
    "conferencia": "2*24 - 20",
    "resolucao": "Substituindo p = 24 em qualquer das duas funções: Qo = 2 × 24 − 20 = 28.\nConferindo pela demanda: Qd = 100 − 72 = 28. As duas coincidem, como esperado no equilíbrio.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou as quantidades das duas curvas, ou substituiu o preço na expressão errada e não conferiu na outra."
     },
     {
      "pct": 50,
      "desc": "Substituiu o preço de equilíbrio e chegou a 28 unidades, conferindo nas duas funções."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Modelagem econômica",
  "id": "eco-03",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Índice de Gini com curva poligonal",
  "tempoSugerido": 20,
  "enunciado": "Em um país, a metade mais pobre da população detém 20% da renda total. Suponha que a curva de Lorenz desse país seja formada por dois segmentos de reta: um ligando (0; 0) a (0,5; 0,2) e outro ligando (0,5; 0,2) a (1; 1).",
  "figura": "<svg viewBox=\"0 0 220 220\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M30 190 L200 190 M30 190 L30 20\" stroke-width=\"1.5\"/><path d=\"M30 190 L200 20\" stroke-dasharray=\"5 4\" stroke-width=\"1.5\"/><path d=\"M30 190 L115 156 L200 20\"/><text x=\"104\" y=\"208\" font-size=\"10\" fill=\"currentColor\" stroke=\"none\">população</text><text x=\"120\" y=\"96\" font-size=\"10\" fill=\"currentColor\" stroke=\"none\">igualdade</text></svg>",
  "figuraAlt": "Curva de Lorenz formada por dois segmentos, abaixo da diagonal tracejada de perfeita igualdade.",
  "itens": [
   {
    "id": "a",
    "comando": "Calcule a área sob a curva de Lorenz.",
    "respostaFinal": {
     "rotulo": "área",
     "aceitas": [
      "0,35",
      "0.35"
     ]
    },
    "conferencia": "(0 + 0.2)/2*0.5 + (0.2 + 1)/2*0.5",
    "resolucao": "A região sob a curva se decompõe em dois trapézios de base horizontal 0,5.\nPrimeiro: (0 + 0,2)/2 × 0,5 = 0,05.\nSegundo: (0,2 + 1)/2 × 0,5 = 0,30.\nÁrea total: 0,35.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou apenas um dos trapézios, ou usou a fórmula do triângulo para a região inteira."
     },
     {
      "pct": 50,
      "desc": "Somou os dois trapézios e chegou a 0,35."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Determine o Índice de Gini desse país.",
    "respostaFinal": {
     "rotulo": "Índice de Gini",
     "aceitas": [
      "0,3",
      "0.3"
     ]
    },
    "conferencia": "(0.5 - 0.35)/0.5",
    "resolucao": "A área entre a reta de igualdade e a curva é 0,5 − 0,35 = 0,15.\nO Gini é a razão entre essa área e a área total sob a reta de igualdade (0,5).\nG = 0,15/0,5 = 0,30.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Apresentou 0,15 como índice, esquecendo de dividir pela área de referência 0,5."
     },
     {
      "pct": 50,
      "desc": "Dividiu a área entre as curvas por 0,5 e chegou ao Gini 0,30."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Modelagem econômica",
  "id": "eco-04",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Custo marginal",
  "tempoSugerido": 15,
  "enunciado": "O custo total de produção de uma fábrica, em reais, para q unidades, é C(q) = q² + 25q + 300.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o custo de produzir a 11ª unidade, isto é, o acréscimo de custo ao passar de 10 para 11 unidades?",
    "respostaFinal": {
     "rotulo": "custo em reais",
     "aceitas": [
      "46",
      "R$ 46,00"
     ]
    },
    "conferencia": "(121 + 275 + 300) - (100 + 250 + 300)",
    "resolucao": "C(10) = 100 + 250 + 300 = 650.\nC(11) = 121 + 275 + 300 = 696.\nO acréscimo é 696 − 650 = R$ 46,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou o custo médio em vez do acréscimo, ou substituiu apenas q = 11."
     },
     {
      "pct": 50,
      "desc": "Calculou os dois custos e chegou ao acréscimo de R$ 46,00."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o custo médio por unidade quando são produzidas 10 unidades?",
    "respostaFinal": {
     "rotulo": "custo médio em reais",
     "aceitas": [
      "65",
      "R$ 65,00"
     ]
    },
    "conferencia": "(100 + 250 + 300)/10",
    "resolucao": "O custo médio é o custo total dividido pela quantidade: 650/10 = R$ 65,00.\nNote que ele é maior que o custo da unidade seguinte (R$ 46,00) — é a diluição do custo fixo de 300.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Confundiu custo médio com o acréscimo do item anterior, ou esqueceu o custo fixo."
     },
     {
      "pct": 50,
      "desc": "Dividiu o custo total pela quantidade e chegou a R$ 65,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Modelagem econômica",
  "id": "eco-05",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Excedente do consumidor",
  "tempoSugerido": 18,
  "enunciado": "Em um mercado, a curva de demanda é dada por p = 100 − 2q, em que p é o preço em reais e q a quantidade. O preço praticado no mercado é R$ 40,00. O excedente do consumidor é a área entre a curva de demanda e a reta horizontal do preço, até a quantidade negociada.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é a quantidade negociada ao preço de R$ 40,00?",
    "respostaFinal": {
     "rotulo": "quantidade",
     "aceitas": [
      "30"
     ]
    },
    "conferencia": "(100 - 40)/2",
    "resolucao": "De 40 = 100 − 2q vem 2q = 60, logo q = 30 unidades.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Substituiu q = 40 na expressão, confundindo preço com quantidade."
     },
     {
      "pct": 50,
      "desc": "Isolou q corretamente e chegou a 30 unidades."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Calcule o excedente do consumidor.",
    "respostaFinal": {
     "rotulo": "excedente em reais",
     "aceitas": [
      "900",
      "R$ 900,00"
     ]
    },
    "conferencia": "(100 - 40) * 30 / 2",
    "resolucao": "A curva de demanda encontra o eixo dos preços em p = 100, e o preço de mercado é 40.\nA região é um triângulo de altura 100 − 40 = 60 e base 30.\nExcedente: 60 × 30/2 = R$ 900,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Calculou a área do retângulo (1.800), sem dividir por 2, ou usou 100 como altura do triângulo."
     },
     {
      "pct": 50,
      "desc": "Identificou o triângulo mas errou uma das medidas."
     },
     {
      "pct": 75,
      "desc": "Montou 60 × 30/2 e errou apenas a conta."
     },
     {
      "pct": 100,
      "desc": "Chegou ao excedente de R$ 900,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Modelagem econômica",
  "id": "eco-06",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Índice de preços",
  "tempoSugerido": 15,
  "enunciado": "Uma cesta de produtos custava R$ 250,00 em 2020 e passou a custar R$ 320,00 em 2026. Adota-se 2020 como ano-base, com índice 100.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o índice de preços de 2026 nessa base?",
    "respostaFinal": {
     "rotulo": "índice",
     "aceitas": [
      "128"
     ]
    },
    "conferencia": "100 * 320/250",
    "resolucao": "O índice é a razão entre os custos, multiplicada por 100: (320/250) × 100 = 128.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Inverteu a razão, chegando a cerca de 78, ou apresentou a diferença 70 como índice."
     },
     {
      "pct": 50,
      "desc": "Montou a razão na base 100 e chegou ao índice 128."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Quanto uma renda de R$ 3.000,00 em 2020 precisaria valer em 2026 para manter o mesmo poder de compra?",
    "respostaFinal": {
     "rotulo": "renda em reais",
     "aceitas": [
      "3840",
      "R$ 3.840,00"
     ]
    },
    "conferencia": "3000 * 1.28",
    "resolucao": "Manter o poder de compra significa corrigir a renda pelo mesmo fator dos preços: 1,28.\nRenda corrigida: 3.000 × 1,28 = R$ 3.840,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou os 70 reais de diferença da cesta à renda, ou aplicou o índice 128 como porcentagem de acréscimo."
     },
     {
      "pct": 50,
      "desc": "Aplicou o fator 1,28 e chegou a R$ 3.840,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Modelagem econômica",
  "id": "eco-07",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Câmbio e tributos",
  "tempoSugerido": 15,
  "enunciado": "Um produto importado custa US$ 40,00 no exterior. A cotação do dólar é R$ 5,20 e, sobre o valor convertido, incidem tributos de 60%.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o custo final do produto em reais?",
    "respostaFinal": {
     "rotulo": "valor em reais",
     "aceitas": [
      "332,8",
      "332.8",
      "R$ 332,80"
     ]
    },
    "conferencia": "40 * 5.20 * 1.6",
    "resolucao": "Valor convertido: 40 × 5,20 = R$ 208,00.\nCom tributos de 60%: 208 × 1,60 = R$ 332,80.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Aplicou os tributos sobre o valor em dólar antes da conversão sem converter depois, ou somou 60 reais."
     },
     {
      "pct": 50,
      "desc": "Converteu e aplicou o fator dos tributos, chegando a R$ 332,80."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Se o dólar subir para R$ 5,72, qual será a variação percentual do custo final?",
    "respostaFinal": {
     "rotulo": "variação em porcentagem",
     "aceitas": [
      "10%",
      "10"
     ]
    },
    "conferencia": "100 * (5.72/5.20 - 1)",
    "resolucao": "O custo final é proporcional à cotação, porque a conversão e o fator de tributos são multiplicações.\nA variação da cotação é 5,72/5,20 = 1,10, ou seja, 10%.\nLogo, o custo final também sobe 10%.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Recalculou o custo final mas errou a comparação, ou somou os 0,52 de diferença como porcentagem."
     },
     {
      "pct": 50,
      "desc": "Percebeu a proporcionalidade e chegou a 10% de aumento."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Modelagem econômica",
  "id": "eco-08",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Custo médio mínimo",
  "tempoSugerido": 18,
  "enunciado": "O custo médio de produção, em reais por unidade, de certa fábrica é dado por CM(q) = q + 400/q, com q em centenas de unidades.",
  "itens": [
   {
    "id": "a",
    "comando": "Mostre que o custo médio mínimo ocorre em q = 20.",
    "resolucao": "Para q > 0, vale a desigualdade entre as médias aritmética e geométrica: q + 400/q ≥ 2·√(q × 400/q) = 2 × 20 = 40.\nA igualdade só acontece quando as duas parcelas são iguais, isto é, q = 400/q, ou q² = 400, logo q = 20.\nPortanto o custo médio é sempre pelo menos 40 e atinge esse valor exatamente em q = 20.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Testou alguns valores e observou que 20 dá o menor resultado, sem argumento que valha para todo q."
     },
     {
      "pct": 50,
      "desc": "Igualou as duas parcelas ou usou a desigualdade das médias, concluindo que o mínimo é em q = 20."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o custo médio mínimo?",
    "respostaFinal": {
     "rotulo": "custo médio em reais",
     "aceitas": [
      "40",
      "R$ 40,00"
     ]
    },
    "conferencia": "20 + 400/20",
    "resolucao": "Substituindo q = 20: CM = 20 + 400/20 = 20 + 20 = R$ 40,00 por unidade.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Substituiu na expressão errada, ou apresentou 20 como custo mínimo."
     },
     {
      "pct": 50,
      "desc": "Substituiu q = 20 e chegou a R$ 40,00."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Modelagem econômica",
  "id": "eco-09",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Efeito multiplicador",
  "tempoSugerido": 18,
  "enunciado": "Suponha que, a cada real recebido, as famílias de uma economia gastem 80% e poupem o restante. O governo injeta R$ 10 bilhões nessa economia. Esse valor é gasto, vira renda de outras pessoas, que gastam 80% dele, e assim por diante.",
  "itens": [
   {
    "id": "a",
    "comando": "Escreva a soma que representa o aumento total de renda gerado e explique por que ela é uma progressão geométrica.",
    "resolucao": "O aumento total é 10 + 10 × 0,8 + 10 × 0,8² + 10 × 0,8³ + …\nCada rodada de gasto gera uma renda que é 80% da anterior, então a razão entre termos consecutivos é constante e igual a 0,8 — que é a definição de progressão geométrica.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Escreveu alguns termos sem identificar a razão constante, ou tratou a soma como progressão aritmética."
     },
     {
      "pct": 50,
      "desc": "Escreveu a soma infinita com razão 0,8 e justificou por que é geométrica."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual é o aumento total de renda gerado pela injeção?",
    "respostaFinal": {
     "rotulo": "aumento em bilhões de reais",
     "aceitas": [
      "50"
     ]
    },
    "conferencia": "10 / (1 - 0.8)",
    "resolucao": "Como a razão 0,8 está entre 0 e 1, a soma infinita é S = a₁/(1 − q).\nS = 10/(1 − 0,8) = 10/0,2 = R$ 50 bilhões.\nO fator 1/(1 − 0,8) = 5 é o que os economistas chamam de multiplicador.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Somou apenas as primeiras rodadas, ou dividiu por 0,8 em vez de 0,2."
     },
     {
      "pct": 50,
      "desc": "Aplicou a soma da PG infinita e chegou a R$ 50 bilhões."
     }
    ]
   }
  ]
 },
 {
  "grupo": "Modelagem econômica",
  "id": "eco-10",
  "area": "Matemática",
  "frente": "matematica",
  "tema": "Salário real",
  "tempoSugerido": 15,
  "enunciado": "Um trabalhador ganhava R$ 3.000,00 no início do ano. Ao longo do ano, a inflação acumulada foi de 12% e ele recebeu um reajuste salarial de 8%.",
  "itens": [
   {
    "id": "a",
    "comando": "Qual é o salário nominal do trabalhador depois do reajuste?",
    "respostaFinal": {
     "rotulo": "salário em reais",
     "aceitas": [
      "3240",
      "R$ 3.240,00"
     ]
    },
    "conferencia": "3000 * 1.08",
    "resolucao": "Salário nominal: 3.000 × 1,08 = R$ 3.240,00.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Aplicou a inflação em vez do reajuste, ou somou 8 reais."
     },
     {
      "pct": 50,
      "desc": "Aplicou o reajuste e chegou a R$ 3.240,00."
     }
    ]
   },
   {
    "id": "b",
    "comando": "Qual seria o salário equivalente, em poder de compra do início do ano? O trabalhador ganhou ou perdeu?",
    "respostaFinal": {
     "rotulo": "salário real em reais",
     "aceitas": [
      "2892,86",
      "2892.86",
      "2892,9"
     ],
     "intervalo": [
      2892,
      2894
     ]
    },
    "conferencia": "3000 * 1.08 / 1.12",
    "resolucao": "Para comparar com o início do ano, divide-se o salário nominal pelo fator da inflação: 3.240/1,12 ≈ 2.892,86.\nComo esse valor é menor que os R$ 3.000,00 originais, o trabalhador perdeu poder de compra — cerca de 3,6%.",
    "faixas": [
     {
      "pct": 0,
      "desc": "Em branco ou totalmente incorreta."
     },
     {
      "pct": 25,
      "desc": "Subtraiu as taxas e concluiu perda de 4% sem calcular o salário equivalente, ou multiplicou pela inflação em vez de dividir."
     },
     {
      "pct": 50,
      "desc": "Deflacionou o salário nominal e chegou a aproximadamente R$ 2.892,86, concluindo que houve perda."
     }
    ]
   }
  ]
 }
];
