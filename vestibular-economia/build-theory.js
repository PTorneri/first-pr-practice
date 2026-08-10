// Compõe a teoria por frente da trilha de Economia.
//
//   node vestibular-economia/build-theory.js              compõe
//   node vestibular-economia/build-theory.js --verificar   só checa se está velha
//
// A MESMA REGRA DO BANCO, PELO MESMO MOTIVO
//
// O estudo dos seis cadernos da FGV EESP achou que a prova objetiva do dia 1 é
// o MESMO caderno da FGV Direito SP, e conclui que "tudo o que os estudos
// anteriores dizem sobre os formatos de item da FGV — a escada de asserções, o
// 'most likely' do Inglês, os textos longos com 5 e 6 questões penduradas —
// continua valendo palavra por palavra". Teoria de formato de item é teoria da
// BANCA, não do curso: reescrevê-la aqui seria reescrever pior o que já existe,
// e as duas cópias divergiriam na primeira correção.
//
// Então onze das vinte frentes são COMPOSTAS de vestibular-direito/data/
// theory.js, exatamente como o bundle. `--verificar` compara o hash das fontes
// com o que foi usado na última composição e reprova quando alguma mudou.
//
// AS NOVE QUE SÃO ESCRITAS AQUI, E POR QUE NENHUMA PODIA SER COPIADA
//
//   as cinco de Matemática  Não existe fonte para copiar: Direito tem UM bloco
//                           de matematica-rlm, escrito para uma prova em que
//                           Matemática vale 10% da nota e não tem discursiva.
//                           Aqui ela vale 40%, três quartos disso numa prova
//                           discursiva corrigida por faixa. É outra matéria do
//                           ponto de vista de quem estuda.
//
//   biologia, química,      Medicina tem os três, e eles estão calibrados em
//   física                  VUNESP e FUVEST: falam de discursiva da Santa Casa
//                           e da Unifesp, que aqui não existem — a Natureza da
//                           EESP é objetiva pura, 45 questões em três blocos de
//                           15. Copiar seria ensinar a prova errada. O estudo
//                           chama esse trabalho pelo nome: "não é escrever do
//                           zero, é recalibrar".
//
//   literatura              Direito não tem bloco de teoria de literatura (o
//                           theory.js de lá tem 15 frentes para 16 do
//                           subtopics), e o de Medicina é escrito em cima da
//                           lista de leitura obrigatória da FUVEST — e o edital
//                           da EESP não traz lista nenhuma.
//
// Tudo o que está escrito à mão abaixo sai de
// estudo-anatomia-provas-economia-fgv-insper-2021-2026.md, e os números têm
// origem: pesos e cortes do edital 1º/2027, formato e conteúdo dos cadernos de
// 2021.1 a 2026.1, faixas da grade de correção publicada pela banca. Nenhum
// enunciado real é transcrito — os exemplos são originais, na forma dos itens
// descritos pelo estudo, seguindo a mesma convenção dos estudos anteriores.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const vm = require("vm");

const RAIZ = path.join(__dirname, "..");
const FONTES = {
  direito: path.join(RAIZ, "vestibular-direito", "data", "theory.js"),
  medicina: path.join(RAIZ, "vestibular-medicina", "data", "theory.js"),
};
const SAIDA = path.join(__dirname, "data", "theory.js");
const MANIFESTO = path.join(__dirname, "data", "origem-da-teoria.json");

// ---------------------------------------------------------------- a grade
//
// As cinco frentes de Matemática dividem três pegadinhas, e elas se repetem de
// propósito: o painel de teoria é POR FRENTE, então quem estuda só Geometria
// nunca leria um aviso escrito uma vez em Sequências. Repetido aqui, num lugar
// só, é repetição que não diverge.
//
// A primeira é a mais cara da trilha inteira. A grade de 2026.1 dá 25% a quem
// entregou "somente a resposta correta, sem cálculo algum ou indicação de
// raciocínio" na questão 1, e 0% pela mesma coisa na parte B da questão 2.
const PEGADINHAS_DA_GRADE = [
  "Entregar o número certo sem a conta. É o erro mais caro desta prova: a grade da FGV dá 25% — e, em alguns itens, 0% — para a resposta correta \"sem cálculo algum ou indicação de raciocínio\". Quem treina chutar e conferir treina exatamente o que a banca zera.",
  "Abandonar a questão por não chegar ao número. A grade recompensa, em ordem: equacionar certo mesmo sem terminar, terminar com erro de conta, chegar ao número. Um erro de aritmética depois de um raciocínio correto custa UM degrau (75% em vez de 100%); folha em branco custa tudo.",
  "Responder um subitem e achar que respondeu a questão. Seis das oito discursivas de 2026.1 têm partes (a)/(b), com pontuação própria por parte — cada uma é corrigida sozinha, na escala 0/25/50.",
];

// Gatilho comum pela mesma razão: vale nas cinco e some se ficar em uma só.
const GATILHO_SUBITENS =
  "Questão discursiva com itens (a) e (b) → resolva na ordem e escreva a resposta de cada parte explicitamente, mesmo que a segunda dependa da primeira; as partes são pontuadas em separado, e a (b) certa a partir de uma (a) errada ainda pontua.";

// ------------------------------------------------------------- as autorais

const AUTORAIS = {
  // ---------------------------------------------------------------------
  // LITERATURA
  //
  // Sem lista de leitura obrigatória: o edital da EESP não traz nenhuma, e a
  // prova de Artes é exclusiva do Direito. O que sobra é reconhecimento de
  // escola pelo traço do texto, dentro das 15 objetivas de Língua Portuguesa.
  // ---------------------------------------------------------------------
  "literatura": {
    resumo: "Não há lista de leitura obrigatória nesta trilha — o edital da EESP não traz nenhuma. A literatura cai dentro das 15 objetivas de Língua Portuguesa, e o que se cobra é reconhecer a escola pelo traço do texto, não ter lido o livro: em 2026.1, nove das quinze objetivas de Português saíram de dois romances, com o trecho inteiro impresso na prova.",
    gatilhos: [
      "Trecho longo de romance do século XIX com descrição minuciosa de ambiente e de temperamento → Realismo/Naturalismo; procure o narrador que analisa a personagem em vez de acompanhá-la.",
      "Narrador que conversa com o leitor, interrompe a própria história ou ironiza o que acabou de contar → Machado; o traço é a quebra da ilusão narrativa, não o tema.",
      "Texto com sintaxe quebrada, coloquialismo deliberado ou humor com a língua → Modernismo de 22; a marca é a ruptura formal, e ela aparece antes de qualquer tema nacional.",
      "Pergunta que pede a \"escola literária\" a partir de um trecho → decida pelo COMO (foco narrativo, sintaxe, adjetivação) e não pelo assunto; miséria urbana aparece em Naturalismo e em 30, e é o tratamento que separa os dois.",
      "Duas ou três questões seguidas penduradas no mesmo trecho → leia o trecho uma vez com atenção antes de olhar qualquer alternativa; a banca cobra releitura, e o tempo economizado aqui é o que sobra para a Matemática.",
    ],
    pegadinhas: [
      "Responder pelo que se lembra do livro em vez do que está no trecho impresso — a banca imprime justamente para cobrar leitura, e a alternativa \"certa pelo enredo\" costuma ser a errada pelo texto.",
      "Confundir o narrador com o autor: a opinião dentro do trecho pode ser de uma personagem ou de um narrador não confiável.",
      "Tratar \"escola literária\" como caixa estanque — obras de transição existem, e a banca escolhe trechos que exibem o traço dominante, não o rótulo puro.",
      "Gastar tempo de Literatura como se ela valesse o que vale na trilha de Direito. Português inteiro é 15% da nota final da FGV EESP, somando objetiva e discursiva, contra os 40% de Matemática.",
    ],
  },

  // ---------------------------------------------------------------------
  // MATEMÁTICA — as cinco frentes
  //
  // A divisão em cinco é da trilha (ver classificar-matematica.js). O que muda
  // de uma para outra aqui não é só o conteúdo: é onde ela costuma aparecer na
  // discursiva, que é onde estão 30 dos 40 pontos percentuais da matéria.
  // ---------------------------------------------------------------------
  "matematica-sequencias": {
    resumo: "É o miolo da discursiva desta banca: sequências, recorrências e contagem aparecem em todos os ciclos lidos (2021 a 2026) e quase sempre como o item mais difícil da prova. Em 2026.1 foram três das oito questões — progressão aritmética em série temporal, sequência dos ímpares com soma N² e recorrência com invariante.",
    gatilhos: [
      "Série de valores medidos ano a ano (emissão, população, preço) com crescimento constante → é progressão aritmética disfarçada de dado real; escreva o termo geral antes de tentar qualquer conta.",
      "Sequência definida pelo termo anterior (\"cada termo é obtido a partir do anterior por...\") → é recorrência; calcule os quatro ou cinco primeiros termos à mão antes de procurar padrão, e escreva esses termos na folha — eles são o \"raciocínio indicado\" que a grade exige.",
      "Pergunta sobre um termo MUITO distante (o 2026º, o milésimo) → não é para calcular; procure periodicidade, paridade ou uma quantidade que não muda de etapa para etapa (invariante).",
      "\"Mostre que o valor não depende de...\" ou \"prove que a soma é sempre\" → a resposta é uma combinação que se conserva; exiba a conta que mostra a conservação, porque aqui o número final é quase irrelevante para a grade.",
      "Soma dos n primeiros termos de algo regular → verifique se é a soma dos ímpares (dá N²) antes de somar termo a termo; a banca usa essa identidade como atalho premiado.",
      "Operador que subtrai termos consecutivos, aplicado duas ou três vezes → é a diferença finita de 2025.1; cada aplicação abaixa em um o grau do polinômio, e é isso que a questão está testando.",
      GATILHO_SUBITENS,
    ],
    pegadinhas: PEGADINHAS_DA_GRADE.concat([
      "Confundir a razão com o primeiro termo ao montar o termo geral — o erro clássico, e ele derruba os dois subitens de uma vez.",
      "Tratar como PA uma série que cresce por percentual fixo (é PG) só porque os dados vieram numa tabela de anos.",
    ]),
    subtemas: [
      {
        tema: "Recorrência com invariante",
        resumo: "A família mais difícil da prova, e a mais previsível: um processo muda de estado por uma regra, e existe uma quantidade que a regra não altera. Achada a quantidade, a questão vira uma linha.",
        gatilhos: [
          "Processo que repete uma operação sobre um conjunto de números → teste soma, soma dos quadrados, paridade da soma e diferença entre dois grupos; uma delas costuma se conservar.",
          "Pergunta na forma \"é possível chegar a...\" → quase sempre a resposta é não, e a prova é exibir o invariante que separa o estado inicial do estado pedido.",
        ],
        pegadinhas: [
          "Testar casos pequenos, ver o padrão e parar aí: mostrar cinco casos não é demonstrar, e a faixa de 100% costuma exigir o argumento geral.",
        ],
        exemplo: {
          enunciado: "Numa lousa estão escritos os números de 1 a 10. A cada passo, apagam-se dois números quaisquer e escreve-se, no lugar deles, a diferença positiva entre os dois. O processo continua até sobrar um único número na lousa. (a) Após o primeiro passo, o que acontece com a paridade da soma de todos os números escritos? (b) É possível que o último número seja 2?",
          resolucao: "(a) Apagar a e b e escrever |a−b| troca a soma S por S − a − b + |a−b|. Como a + b e |a−b| têm sempre a mesma paridade, a soma muda por um número par: a PARIDADE da soma se conserva a cada passo. (b) A soma inicial é 1+2+…+10 = 55, ímpar. Como a paridade não muda, o número final é ímpar — logo não pode ser 2. O que a grade premia aqui é a frase \"a paridade da soma se conserva\" com a conta que a sustenta; responder só \"não é possível\" cai na faixa mais baixa mesmo estando certo.",
        },
      },
    ],
  },

  "matematica-probabilidade": {
    resumo: "Probabilidade e contagem dividem com sequências o posto de miolo da discursiva — a distribuição sugerida para o banco reserva 30 das 150 questões para elas, o mesmo tanto. O formato favorito da banca é o processo que se repete: passeio aleatório de saldo em 2026.1, recorrência de probabilidade em 2025.1, chaveamento de torneio em 2023.1.",
    gatilhos: [
      "Experimento repetido n vezes com dois resultados possíveis e probabilidade fixa → binomial; escreva o coeficiente, a potência do sucesso e a do fracasso separados antes de multiplicar.",
      "Saldo, posição ou pontuação que sobe ou desce a cada rodada → passeio aleatório; conte de quantos jeitos se chega ao valor pedido, não some probabilidades caso a caso.",
      "Torneio, chaveamento ou eliminatória → desenhe a árvore dos confrontos possíveis; a pergunta quase sempre é \"qual a chance de dois deles se encontrarem\", e depende da rodada.",
      "Contagem com restrição de posição (\"igualmente espaçados\", \"nenhum vizinho\", \"em ordem\") → traduza a restrição em divisores ou em espaços entre objetos antes de contar.",
      "\"De quantas maneiras\" com repetição permitida → decida primeiro se a ordem importa e se há reposição; escrever essas duas respostas na folha já é parte do raciocínio que a grade lê.",
      "Probabilidade que se define em função da anterior (\"se ganhou na rodada k, então...\") → é recorrência probabilística; monte a relação e resolva como sequência.",
      GATILHO_SUBITENS,
    ],
    pegadinhas: PEGADINHAS_DA_GRADE.concat([
      "Somar probabilidades de eventos que podem acontecer juntos, sem descontar a interseção.",
      "Contar arranjos onde o problema pede combinações — a pergunta \"a ordem muda o resultado?\" resolve, e vale escrevê-la na folha.",
      "Esquecer o coeficiente binomial e entregar só a potência: a chance de uma sequência específica não é a chance de qualquer sequência com aquele número de sucessos.",
    ]),
    subtemas: [
      {
        tema: "Passeio aleatório e saldo",
        resumo: "Um valor que anda para cima ou para baixo a cada etapa, com probabilidade fixa. É o vestido preferido da probabilidade nesta prova porque junta contagem e binomial num enunciado de duas linhas.",
        gatilhos: [
          "Pergunta pelo saldo APÓS n etapas → o saldo só depende de quantas subidas houve; converta o valor pedido em número de subidas antes de qualquer conta.",
          "Pergunta se o saldo PASSOU por um valor em algum momento → é outro problema, bem mais difícil que o anterior; não confunda \"terminar em\" com \"tocar em\".",
        ],
        pegadinhas: [
          "Tratar como equiprovável cada valor final de saldo — os do meio têm muito mais caminhos que os das pontas.",
        ],
        exemplo: {
          enunciado: "Um jogador começa com saldo zero. A cada rodada ele ganha 1 real com probabilidade 1/2 ou perde 1 real com probabilidade 1/2, e são jogadas 6 rodadas. (a) Quantas rodadas ele precisa ganhar para terminar com saldo +2? (b) Qual a probabilidade de terminar com saldo +2?",
          resolucao: "(a) Se ganha g rodadas, perde 6 − g, e o saldo é g − (6 − g) = 2g − 6. Saldo +2 exige 2g − 6 = 2, ou seja g = 4. (b) Terminar com 4 vitórias em 6 rodadas é binomial: C(6,4) · (1/2)⁴ · (1/2)² = 15/64. O ponto que a grade cobra é a tradução do saldo em número de vitórias, feita no item (a) — quem pula direto para 15/64 sem essa passagem entrega o número sem o raciocínio.",
        },
      },
    ],
  },

  "matematica-algebra": {
    resumo: "Funções e álgebra são a espinha da parte média da prova — 25 das 150 questões sugeridas para o banco. Aqui aparece a matemática que NÃO está no programa da FGV Direito: a interpolação polinomial de 2026.1 e o operador diferença de 2025.1 são itens de raciocínio abstrato, não de conteúdo de ensino médio aplicado. Não há cálculo diferencial, mas há a ideia de aproximação e de taxa de variação discreta.",
    gatilhos: [
      "\"Encontre o polinômio de grau 2 que coincide com f em três pontos\" → é interpolação; monte o sistema com os três valores e resolva — não tente adivinhar a forma da função original.",
      "Função definida como o MENOR (ou o maior) entre duas funções → desenhe as duas e marque onde se cruzam; a resposta é sempre por trechos, e o ponto de cruzamento é a fronteira.",
      "Relação entre duas grandezas que vira reta quando se aplica logaritmo nos dois eixos → é lei de potência (alometria); o coeficiente angular do gráfico log-log é o expoente.",
      "Enunciado que descreve regra de reajuste, alíquota ou desconto e pergunta o resultado final → escreva a função explicitamente antes de substituir número; é a tradução que a grade lê como \"equacionou o problema\".",
      "Sistema com parâmetro (\"para quais valores de k o sistema tem solução única\") → discuta pelo determinante e diga o que acontece nos casos de fronteira, que é onde estão os pontos.",
      "Matriz apresentada como tabela de dados reais → a operação pedida costuma ter significado no enunciado (total por linha, variação por coluna); dizer qual é esse significado costuma valer um degrau.",
      GATILHO_SUBITENS,
    ],
    pegadinhas: PEGADINHAS_DA_GRADE.concat([
      "Confundir o expoente com o coeficiente angular ao ler um gráfico em escala log — em log-log o coeficiente é o expoente, em mono-log é a taxa.",
      "Resolver a inequação e esquecer de checar o domínio (denominador, raiz par, logaritmando).",
      "Aplicar a fórmula de Bhaskara em algo que não é equação do segundo grau porque \"tem x²\" — em interpolação e em sistemas, o x² é dado, não incógnita.",
    ]),
    subtemas: [
      {
        tema: "Raciocínio abstrato: o item que não é conteúdo aplicado",
        resumo: "Todo ano a prova traz um item que não sai do programa de ensino médio aplicado — o operador diferença de 2025.1, a interpolação polinomial de 2026.1. Não há cálculo diferencial, mas há a ideia de aproximação e de taxa de variação discreta. Um treino só de situação-problema deixa o aluno sem defesa justamente na questão mais difícil.",
        gatilhos: [
          "Enunciado que DEFINE uma operação nova e pede propriedades dela → não procure fórmula conhecida; aplique a definição a casos pequenos e observe o que acontece com o grau, com a paridade ou com o sinal.",
          "\"Aplique a operação três vezes\" → faça as três, uma por linha; cada aplicação de diferença finita abaixa em um o grau do polinômio, e é essa regularidade que a questão quer ver enunciada.",
          "Pedido de aproximar uma função por outra em alguns pontos → é sistema linear nos coeficientes; escreva uma equação por ponto dado.",
        ],
        pegadinhas: [
          "Tentar reconhecer a função original a partir da aproximação — a questão não pede isso, e o tempo gasto aí é o que falta no fim da prova.",
          "Parar na observação (\"o grau cai\") sem escrever por quê: a faixa alta pede o argumento, não o padrão notado.",
        ],
        exemplo: {
          enunciado: "Para uma função f definida nos inteiros, define-se Δf(n) = f(n+1) − f(n). Seja f(n) = n² + 3n. (a) Calcule Δf(n) em função de n. (b) Calcule Δ(Δf)(n) e diga o que aconteceu com o grau a cada aplicação.",
          resolucao: "(a) Δf(n) = [(n+1)² + 3(n+1)] − [n² + 3n] = (n² + 2n + 1 + 3n + 3) − (n² + 3n) = 2n + 4. (b) Aplicando de novo: Δ(Δf)(n) = [2(n+1) + 4] − [2n + 4] = 2, constante. O grau caiu de 2 para 1 e de 1 para 0 — cada diferença abaixa o grau em um, e a segunda diferença de um polinômio do 2º grau é constante (igual a duas vezes o coeficiente líder). O item (b) só fecha com essa frase escrita; a conta sozinha mostra o 2 mas não mostra que o aluno entendeu o mecanismo.",
        },
      },
    ],
  },

  "matematica-geometria": {
    resumo: "Geometria plana e analítica valem 25 das 150 questões sugeridas, e nesta banca elas raramente vêm sozinhas: a questão de geometria de 2026.1 é a do Índice de Gini, em que a parte difícil é RECONHECER um arco de circunferência dentro de uma equação antes de calcular área de setor. Semelhança com razão de áreas (2025.1) e razão entre áreas de segmentos de parábola (2023.1) seguem a mesma receita — a figura está escondida numa expressão.",
    gatilhos: [
      "Equação com x² e y² e coeficientes iguais → complete os quadrados e leia centro e raio; é circunferência, mesmo que o enunciado esteja falando de economia.",
      "Pergunta por ÁREA entre duas curvas ou dentro de um setor → identifique a figura elementar (setor, triângulo, segmento) e escreva a área como soma ou diferença dessas figuras.",
      "Duas figuras semelhantes com razão de semelhança k → a razão entre áreas é k² e entre volumes é k³; escrever essa linha antes de contar já vale como raciocínio indicado.",
      "Triângulo com dois lados e o ângulo entre eles → lei dos cossenos; com dois ângulos e um lado → lei dos senos. Decidir qual das duas usar é o passo pontuado.",
      "Coordenadas dadas com letra em vez de número → é geometria analítica com parâmetro; siga com as letras até o fim e só depois substitua, senão a conta explode.",
      "Enunciado que descreve um gráfico acumulado (renda, população, custo) e pergunta uma área → a área tem significado no enunciado; diga qual é, porque a interpretação costuma ser um item inteiro.",
      GATILHO_SUBITENS,
    ],
    pegadinhas: PEGADINHAS_DA_GRADE.concat([
      "Elevar a razão de semelhança ao quadrado quando a pergunta é de perímetro (aí ela é linear) ou esquecer de elevá-la quando é de área.",
      "Assumir que a figura está desenhada em escala — quando há figura, ela é esquema; quando não há, desenhar a sua é parte do trabalho.",
      "Calcular a área do setor com o ângulo em graus dentro de uma fórmula escrita para radianos.",
    ]),
    subtemas: [
      {
        tema: "Figura escondida numa equação",
        resumo: "A assinatura geométrica desta banca: o enunciado dá uma relação algébrica com significado econômico e a questão só anda depois que se reconhece a curva. É por isso que a geometria daqui não se treina só com figura pronta.",
        gatilhos: [
          "Relação entre duas variáveis normalizadas (as duas entre 0 e 1) → desconfie de arco de circunferência, parábola ou reta; teste os pontos (0,0) e (1,1), que costumam pertencer à curva.",
          "\"Qual a área entre a curva e a diagonal\" → é a estrutura do Gini; a diagonal é a referência de igualdade e a área mede o afastamento dela.",
        ],
        pegadinhas: [
          "Calcular a área sob a curva quando o enunciado pede a área ENTRE a curva e a diagonal — são coisas diferentes, e a segunda é a que tem significado.",
        ],
        exemplo: {
          enunciado: "Numa população, a fração acumulada da renda y recebida pela fração acumulada mais pobre x da população satisfaz x² + (y − 1)² = 1, com 0 ≤ x ≤ 1 e 0 ≤ y ≤ 1. (a) Que curva a relação descreve, e qual é o seu centro? (b) Calcule a área da região entre a diagonal y = x e essa curva.",
          resolucao: "(a) É um arco de circunferência de centro (0, 1) e raio 1 — o trecho no primeiro quadrante, que sai de (0, 0) e chega a (1, 1). (b) A área sob o arco, entre x = 0 e x = 1, é a área do quadrado de lado 1 menos a do quarto de círculo de raio 1: 1 − π/4. A área sob a diagonal é 1/2. A região entre as duas é 1/2 − (1 − π/4) = π/4 − 1/2 ≈ 0,285. O item (a) é o que trava a questão inteira: sem reconhecer a circunferência não há como montar a área, e é por isso que ele vale ponto sozinho.",
        },
      },
    ],
  },

  "matematica-financeira": {
    resumo: "Estatística, porcentagem e proporção somam 30 das 150 questões sugeridas — 15 de financeira e porcentagem, 15 de estatística e médias — e são a porta da questão-assinatura da escola. A banca ancora UMA questão por ano na identidade dela: Gini em 2026.1, alíquota de imposto em 2023.1, juros compostos em 2022.1. Não é decoração: é a questão que exige traduzir economia em modelo, e ela cai todo ano.",
    gatilhos: [
      "Enunciado com faixas de tributação, desconto progressivo ou tarifa por escalão → é função definida por partes; escreva os intervalos antes de escolher em qual deles a resposta cai.",
      "Reajuste sobre reajuste (aumento seguido de desconto, inflação em dois períodos) → multiplique os fatores, nunca some os percentuais; escrever o produto dos fatores é o passo pontuado.",
      "Média de um conjunto do qual se REMOVE ou ao qual se ACRESCENTA um subconjunto → volte para a soma total; média não se combina por média, e foi exatamente essa a questão 2 de 2026.1.",
      "\"Qual a taxa equivalente\" entre períodos diferentes → é potência, não regra de três; a taxa mensal equivalente à anual sai da raiz de ordem 12 do fator.",
      "Tabela de distribuição (renda, notas, salários) com pergunta sobre mediana ou moda → ordene ou acumule antes; em distribuição assimétrica a média e a mediana respondem coisas diferentes, e a banca cobra saber qual delas o enunciado pediu.",
      "Grandezas que variam proporcionalmente com restrição de números inteiros (\"quantos, no mínimo\") → é porcentagem com divisibilidade, o formato de 2023.1; a resposta é o menor total que torna a conta exata.",
      GATILHO_SUBITENS,
    ],
    pegadinhas: PEGADINHAS_DA_GRADE.concat([
      "Somar percentuais de bases diferentes: 10% de aumento seguido de 10% de desconto não volta ao valor original.",
      "Aplicar a alíquota da faixa mais alta sobre a renda inteira, quando o sistema é progressivo e ela incide só sobre o excedente da faixa.",
      "Tomar a média das médias de grupos de tamanhos diferentes — só vale se os grupos tiverem o mesmo tamanho, e a banca escolhe tamanhos diferentes de propósito.",
    ]),
    subtemas: [
      {
        tema: "Traduzir economia em modelo",
        resumo: "A questão-assinatura da escola. O conteúdo matemático é sempre acessível — porcentagem, área, progressão —, e a dificuldade está em transformar a descrição econômica numa expressão. É o item que separa esta prova da de qualquer outra banca.",
        gatilhos: [
          "Termo econômico no enunciado (alíquota, elasticidade, índice de concentração, juro real) → o enunciado SEMPRE define o termo; leia a definição dada e ignore o que você acha que a palavra significa.",
          "Pergunta em duas partes, a primeira \"escreva a expressão que representa\" → a expressão é a resposta pontuada; o número da segunda parte vale menos que ela.",
        ],
        pegadinhas: [
          "Usar a definição de mercado de um conceito no lugar da definição dada pelo enunciado — a banca costuma simplificar o conceito de propósito, e a conta só fecha com a versão dela.",
        ],
        exemplo: {
          enunciado: "Um imposto é cobrado assim: nada sobre os primeiros R$ 2.000 de renda mensal, 10% sobre a parte que excede R$ 2.000 até R$ 5.000, e 20% sobre o que excede R$ 5.000. (a) Escreva o imposto devido como função da renda r, para r > 5.000. (b) Uma pessoa pagou R$ 900 de imposto. Qual é a sua renda?",
          resolucao: "(a) Para r > 5.000, a segunda faixa está cheia e contribui 10% de 3.000 = 300; a terceira contribui 0,20·(r − 5.000). Logo I(r) = 300 + 0,20·(r − 5.000), ou I(r) = 0,20r − 700. (b) Como 900 > 300, a renda está na terceira faixa: 0,20r − 700 = 900, r = 8.000. Note que a resposta \"R$ 4.500\", de quem aplica 20% sobre a renda inteira, é a distratora prevista — e, na discursiva, a função escrita em (a) é o que garante os pontos mesmo que a conta de (b) escorregue.",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------
  // CIÊNCIAS DA NATUREZA — as 45 questões que a trilha de Direito não tem
  //
  // Três provas de 15 questões, peso 1 cada, somando 15% da nota final. O
  // corte de 20% de acertos vale para cada uma separadamente: não existe
  // "ignorar Física" nesta trilha. No Insper, Natureza é 10% e o corte é 20,
  // o mais baixo da tabela — mas existe.
  // ---------------------------------------------------------------------
  "biologia": {
    resumo: "15 questões objetivas no dia 2, peso 1, dentro dos 15% da Natureza — e com corte próprio: menos de 20% de acertos aqui elimina, do mesmo jeito que em Matemática. O enunciado é técnico e convencional, sem âncora de notícia, com uma exceção temática: saúde pública e saneamento entram como recorte de atualidade. Em 2026.1 a prova varreu quase todo o programa — ecologia, fisiologia (digestiva, vegetal, reprodutiva, do sangue), microbiologia, genética em duas questões, especiação, parasitologia, metabolismo, origem da vida e evolução.",
    gatilhos: [
      "Questão que abre com experimento descrito (grupos, controle, medida) → a pergunta é sobre o que o experimento MOSTRA, não sobre o conteúdo em volta; identifique a variável controlada antes de olhar as alternativas.",
      "Heredograma ou cruzamento → marque os afetados, teste dominante contra recessivo no primeiro casal que gera filho diferente dos pais, e só então leia os itens.",
      "Gráfico com duas curvas ao longo do tempo (população × recurso, concentração × volume) → descreva cada trecho antes de decidir; a alternativa errada costuma inverter causa e efeito entre as curvas.",
      "Tema de saneamento, verminose ou vacinação → é o recorte de saúde pública da banca; a resposta liga o mecanismo biológico à medida coletiva, e não a uma conduta individual.",
      "Enunciado que cita um processo com nome próprio (especiação, hibridação, quimiossíntese) → volte ao mecanismo básico; a questão testa o conceito, não o vocabulário.",
      "Alternativa que compara duas estruturas de espécies diferentes → separe homologia de analogia antes de julgar; é o par que a banca usa para separar quem sabe evolução de quem decorou exemplos.",
    ],
    pegadinhas: [
      "Responder o que a figura mostra em vez do que o comando pergunta.",
      "Tratar as 15 questões como fáceis por serem \"só objetivas\": o corte de 20% incide sobre esta prova sozinha, e três acertos não bastam.",
      "Estudar Biologia no volume de quem presta Medicina. Aqui são 15 questões dentro de 15% da nota, contra os 40% de Matemática — a frente é obrigatória, não prioritária.",
      "Confundir potencial biótico com resistência ambiental; os dois aparecem no mesmo enunciado justamente para separar quem sabe.",
      "Em genética, entregar o genótipo quando o enunciado pediu a probabilidade.",
    ],
  },

  "quimica": {
    resumo: "A mais jornalística das três Naturezas, e é isso que a separa de qualquer banco calibrado em VUNESP ou FUVEST: oito das quinze questões de 2026.1 abrem com uma frase de manchete, e quatro trazem fonte datada — três delas de julho de 2025, a três meses da aplicação. É a mesma janela de recência que a FGV usa em Humanas e Linguagens. Duas questões partiram de um livro de divulgação em quadrinhos; só as cinco restantes têm enunciado técnico convencional.",
    gatilhos: [
      "Enunciado que abre com manchete (odor corporal, energia limpa, terras raras, adoçante, produto de limpeza) → a notícia é embalagem; localize a substância ou a reação citada e responda pelo conteúdo, não pela matéria.",
      "Menção a mistura de produtos de limpeza ou a gás liberado numa situação doméstica → é reação com produto tóxico; identifique os reagentes reais por trás dos nomes comerciais.",
      "Tema de energia, bateria ou corrosão → eletroquímica; escreva as semirreações e decida quem oxida antes de olhar as alternativas.",
      "Estrutura orgânica exibida com nome de produto (adoçante, cosmético, polímero) → a pergunta é sobre o grupo funcional ou a interação intermolecular; nomeie os grupos na própria figura.",
      "Questão sobre propriedade de material (dureza, ponto de fusão, solubilidade) → decida primeiro o tipo de ligação e de interação; a propriedade decorre daí.",
      "Fonte datada dos últimos doze meses no rodapé → o tema é o da notícia, mas a química cobrada é de programa; não deixe o assunto novo sugerir conteúdo fora do ensino médio.",
    ],
    pegadinhas: [
      "Estudar Química só pelo conteúdo e ignorar a atualidade: metade das questões nasce de notícia recente, e é a leitura de jornal que faz reconhecer o contexto rápido.",
      "Deixar a manchete decidir a resposta — a notícia costuma trazer um juízo (\"faz mal\", \"é sustentável\") que a alternativa correta não repete.",
      "Confundir o nome comercial com a substância: o enunciado dá o nome de mercado e cobra a fórmula.",
      "Balancear a equação e esquecer que a pergunta era sobre a quantidade de um só reagente — o limitante.",
      "Achar que o corte de 20% se compensa entre as três Naturezas: cada uma é uma prova, e cada uma elimina sozinha.",
    ],
  },

  "fisica": {
    resumo: "15 questões objetivas de enunciado técnico convencional — sem âncora jornalística, ao contrário da Química — e com a maior dispersão de temas das três: em 2026.1 caíram cinemática circular, eletromagnetismo, eletrostática, ondulatória, óptica em três questões, hidrostática, dinâmica com atrito, estática, quantidade de movimento, física moderna, termodinâmica, física nuclear e calorimetria. É o oitavo dos doze critérios de desempate, à frente de Química, Biologia, Humanas e Inglês — mas o corte de 20% vale aqui igual ao de Matemática.",
    gatilhos: [
      "Enunciado com corpo em trajetória circular → separe o que é velocidade angular do que é linear antes de qualquer conta; a alternativa errada troca as duas.",
      "Situação com plano inclinado e atrito → decomponha o peso nos eixos do plano ANTES de escrever a segunda lei; a decomposição é metade da questão.",
      "Duas superfícies, raios ou lentes → é óptica geométrica; desenhe o raio antes de aplicar fórmula, porque a convenção de sinal é onde a questão pega.",
      "Corpo que ejeta massa (foguete, jato d'água) ou colisão → é conservação da quantidade de movimento; escreva o antes e o depois em duas linhas separadas.",
      "Gráfico de processo termodinâmico → identifique o tipo de transformação por qual grandeza fica constante, e lembre que a área sob a curva P×V é trabalho.",
      "Enunciado que cita decaimento, meia-vida ou energia de ligação → física nuclear; a conta é de proporção, e o erro típico é contar meias-vidas a mais.",
    ],
    pegadinhas: [
      "Misturar unidades (cm com m, g com kg) — em prova objetiva de 15 questões, é o erro que mais custa acerto barato.",
      "Aplicar fórmula de movimento uniforme em trecho acelerado do gráfico.",
      "Esquecer que o corte de 20% desta prova é independente: é a frente que mais aparece como \"deixo para o fim\" e a que mais elimina por isso.",
      "Tratar a força de atrito como sempre igual a μN — isso vale no escorregamento, não no repouso iminente.",
      "Confundir calor com temperatura em questão de calorimetria, especialmente quando há mudança de fase no meio.",
    ],
  },
};

// ---------------------------------------------------------- a composição
//
// A ordem é a de data/subtopics.js, que é a ordem em que as frentes aparecem no
// app. `de` vazio significa autoral; com mais de uma origem, os blocos são
// concatenados (só acontece em História, que aqui é uma frente e em Direito são
// duas).

const COMPOSICAO = [
  { id: "interpretacao-texto", de: [["direito", "interpretacao-texto"]] },
  { id: "literatura", de: [] },
  { id: "gramatica", de: [["direito", "gramatica"]] },
  { id: "ingles", de: [["direito", "ingles"]] },
  { id: "matematica-sequencias", de: [] },
  { id: "matematica-probabilidade", de: [] },
  { id: "matematica-algebra", de: [] },
  { id: "matematica-geometria", de: [] },
  { id: "matematica-financeira", de: [] },
  // Economia funde as duas Histórias de Direito numa frente só, como o bundle
  // faz com as questões. O resumo é escrito aqui porque dois resumos
  // concatenados não viram um resumo; gatilhos, pegadinhas e subtemas são
  // somados na ordem Brasil → Geral.
  {
    id: "historia",
    de: [["direito", "historia-brasil"], ["direito", "historia-geral"]],
    resumo: "História do Brasil e Geral numa frente só, dentro das 15 objetivas de Ciências Humanas — 5% da nota final da FGV EESP, a menor fatia depois de Inglês, mas com o mesmo corte de 20% de acertos das outras seis provas objetivas. No Insper, Humanas vale 25% para Economia, quase o mesmo peso de Linguagens: é lá que esta frente decide nota.",
  },
  { id: "geografia", de: [["direito", "geografia"]] },
  { id: "filosofia-sociologia", de: [["direito", "filosofia-sociologia"]] },
  { id: "direitos-humanos", de: [["direito", "direitos-humanos"]] },
  { id: "atualidades-politica", de: [["direito", "atualidades-politica"]] },
  { id: "atualidades-geopolitica", de: [["direito", "atualidades-geopolitica"]] },
  { id: "atualidades-meioambiente", de: [["direito", "atualidades-meioambiente"]] },
  { id: "atualidades-tecnologia", de: [["direito", "atualidades-tecnologia"]] },
  { id: "biologia", de: [] },
  { id: "quimica", de: [] },
  { id: "fisica", de: [] },
];

// -------------------------------------------------------------------- carga

function lerFonte(arquivo) {
  const codigo = fs.readFileSync(arquivo, "utf8");
  const sandbox = { console };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(codigo, sandbox, { filename: arquivo });
  if (!sandbox.THEORY) throw new Error("sem window.THEORY em " + arquivo);
  return sandbox.THEORY;
}

function hash(arquivo) {
  return crypto.createHash("sha256").update(fs.readFileSync(arquivo)).digest("hex").slice(0, 12);
}

// -------------------------------------------------------------------- compor

function compor() {
  const fontes = {};
  for (const trilha of Object.keys(FONTES)) fontes[trilha] = lerFonte(FONTES[trilha]);

  const saida = {};
  const problemas = [];

  for (const item of COMPOSICAO) {
    if (!item.de.length) {
      const bloco = AUTORAIS[item.id];
      if (!bloco) { problemas.push("frente autoral sem bloco escrito: " + item.id); continue; }
      saida[item.id] = bloco;
      continue;
    }

    const partes = [];
    for (const [trilha, frente] of item.de) {
      const bloco = fontes[trilha] && fontes[trilha][frente];
      if (!bloco) { problemas.push("origem inexistente: " + trilha + "/" + frente + " (para " + item.id + ")"); continue; }
      partes.push(bloco);
    }
    if (!partes.length) continue;

    if (partes.length === 1 && !item.resumo) {
      saida[item.id] = partes[0];
      continue;
    }

    saida[item.id] = {
      resumo: item.resumo || partes[0].resumo,
      gatilhos: [].concat(...partes.map((p) => p.gatilhos || [])),
      pegadinhas: [].concat(...partes.map((p) => p.pegadinhas || [])),
      subtemas: [].concat(...partes.map((p) => p.subtemas || [])),
    };
  }

  // Toda frente do subtopics precisa de teoria: uma frente sem bloco é um dia
  // de estudo que abre sem a parte de cima, e o app não avisa — ele só não
  // mostra nada. Por isso a checagem é aqui, e reprova.
  const esperadas = COMPOSICAO.map((c) => c.id);
  for (const id of esperadas) if (!saida[id]) problemas.push("frente sem teoria no fim: " + id);

  // Um bloco sem gatilho ou sem pegadinha passaria batido e chegaria vazio na
  // tela, que é pior que erro.
  for (const id of Object.keys(saida)) {
    const b = saida[id];
    if (!b.resumo) problemas.push(id + ": sem resumo");
    if (!(b.gatilhos || []).length) problemas.push(id + ": sem gatilhos");
    if (!(b.pegadinhas || []).length) problemas.push(id + ": sem pegadinhas");

    // O renderizador não se defende: renderTheorySubtemaHtml (app.js) faz
    // `subtema.gatilhos.map(...)` direto. Subtema sem gatilhos ou sem
    // pegadinhas não deixa um bloco feio na tela — derruba a renderização do
    // dia inteiro com TypeError. A checagem é aqui porque aqui ainda é barato.
    (b.subtemas || []).forEach((s, i) => {
      const onde = id + ".subtemas[" + i + "]";
      if (!s.tema) problemas.push(onde + ": sem tema");
      if (!s.resumo) problemas.push(onde + ": sem resumo");
      if (!Array.isArray(s.gatilhos) || !s.gatilhos.length) problemas.push(onde + ": sem gatilhos");
      if (!Array.isArray(s.pegadinhas) || !s.pegadinhas.length) problemas.push(onde + ": sem pegadinhas");
      if (s.exemplo && (!s.exemplo.enunciado || !s.exemplo.resolucao)) {
        problemas.push(onde + ": exemplo sem enunciado ou sem resolução");
      }
    });
  }

  if (problemas.length) {
    console.error("teoria de Economia NÃO composta:");
    problemas.forEach((p) => console.error("  - " + p));
    process.exit(1);
  }

  return saida;
}

function conferirContraSubtopics(saida) {
  const arq = path.join(__dirname, "data", "subtopics.js");
  if (!fs.existsSync(arq)) return;
  const sandbox = { console }; sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(arq, "utf8"), sandbox, { filename: arq });
  const ids = (sandbox.SUBTOPICS || []).map((s) => s.id);
  const faltando = ids.filter((id) => !saida[id]);
  const sobrando = Object.keys(saida).filter((id) => ids.indexOf(id) === -1);
  if (faltando.length || sobrando.length) {
    console.error("teoria fora de sincronia com subtopics.js:");
    faltando.forEach((id) => console.error("  - frente sem teoria: " + id));
    sobrando.forEach((id) => console.error("  - teoria sem frente: " + id));
    process.exit(1);
  }
}

function cabecalho() {
  return [
    "// GERADO por vestibular-economia/build-theory.js -- nao edite a mao.",
    "// Teoria por frente da trilha de Economia.",
    "//",
    "// Onze frentes sao COMPOSTAS de vestibular-direito/data/theory.js: a prova",
    "// objetiva do dia 1 da FGV EESP e o mesmo caderno da FGV Direito SP, entao a",
    "// teoria de formato de item da banca vale palavra por palavra nas duas trilhas.",
    "// Historia soma as duas Historias de la, que aqui sao uma frente so.",
    "//",
    "// Nove sao escritas a mao dentro do build (as cinco de Matematica, as tres de",
    "// Ciencias da Natureza e Literatura), porque nao havia o que copiar: Matematica",
    "// vale 40% aqui e 10% em Direito, a Natureza da EESP e objetiva pura enquanto a",
    "// de Medicina e calibrada em discursiva de VUNESP e FUVEST, e nenhuma das duas",
    "// trilhas tem teoria de literatura sem lista de leitura obrigatoria.",
    "//",
    "// Corrigiu a teoria da trilha de origem? Rode o build de novo.",
    "// `--verificar` reprova quando alguma fonte mudou e este arquivo nao.",
  ].join("\n");
}

function gravar(saida) {
  const corpo = "window.THEORY = " + JSON.stringify(saida, null, 2) + ";\n";
  fs.writeFileSync(SAIDA, cabecalho() + "\n" + corpo, "utf8");

  const origem = {};
  for (const trilha of Object.keys(FONTES)) origem[trilha + "/theory"] = hash(FONTES[trilha]);
  fs.writeFileSync(MANIFESTO, JSON.stringify({
    composto: new Date().toISOString().slice(0, 10),
    frentes: Object.keys(saida).length,
    compostas: COMPOSICAO.filter((c) => c.de.length).length,
    autorais: COMPOSICAO.filter((c) => !c.de.length).map((c) => c.id),
    origem: origem,
  }, null, 2) + "\n", "utf8");
}

function verificar() {
  if (!fs.existsSync(SAIDA) || !fs.existsSync(MANIFESTO)) {
    console.error("teoria de Economia ainda nao foi composta.");
    process.exit(1);
  }
  const manifesto = JSON.parse(fs.readFileSync(MANIFESTO, "utf8"));
  const mudou = [];
  for (const trilha of Object.keys(FONTES)) {
    const chave = trilha + "/theory";
    if (manifesto.origem[chave] !== hash(FONTES[trilha])) mudou.push(chave);
  }
  if (mudou.length) {
    console.error("teoria de Economia VELHA -- mudaram: " + mudou.join(", "));
    console.error("rode: node vestibular-economia/build-theory.js");
    process.exit(1);
  }
  console.log("teoria de Economia em dia com as " + Object.keys(FONTES).length + " fontes.");
}

// ---------------------------------------------------------------------- main

if (process.argv.includes("--verificar")) {
  verificar();
} else {
  const saida = compor();
  conferirContraSubtopics(saida);
  gravar(saida);
  const compostas = COMPOSICAO.filter((c) => c.de.length).length;
  console.log("teoria de Economia composta: " + Object.keys(saida).length + " frentes (" +
              compostas + " compostas, " + (COMPOSICAO.length - compostas) + " autorais).");
}
