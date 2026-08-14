// GERADO por banco-central/build-trilhas.js -- nao edite a mao.
// Flashcards de repetição espaçada da trilha de Engenharia, por subtema.
// A fonte e banco-central/data/questions/*.json (as questoes) e
// banco-central/data/subtemas/*.json (o subtema de cada uma).
//
// Corrigiu uma questao? Corrija no banco central e rode o build de novo.
// `--verificar` reprova quando o banco central mudou e este arquivo nao.
// A fonte é banco-central/data/flashcards/*.json (um arquivo por frente).

window.FLASHCARDS = {
 "matematica-geometria": [
  {
   "id": "flash-matematica-geometria-01",
   "frente": "Qual é a soma dos ângulos internos de um triângulo?",
   "verso": "Sempre 180°, independente do tipo de triângulo."
  },
  {
   "id": "flash-matematica-geometria-02",
   "frente": "Qual é a soma dos ângulos internos de um polígono convexo de n lados?",
   "verso": "(n − 2) × 180°."
  },
  {
   "id": "flash-matematica-geometria-03",
   "frente": "O que é o Teorema de Pitágoras, e quando se aplica?",
   "verso": "Num triângulo retângulo, a² = b² + c² (hipotenusa ao quadrado igual à soma dos catetos ao quadrado)."
  },
  {
   "id": "flash-matematica-geometria-04",
   "frente": "Como identificar a hipotenusa de um triângulo retângulo?",
   "verso": "É o lado oposto ao ângulo reto, e é sempre o maior lado."
  },
  {
   "id": "flash-matematica-geometria-05",
   "frente": "O que são triângulos semelhantes?",
   "verso": "Triângulos com os mesmos ângulos e lados proporcionais entre si."
  },
  {
   "id": "flash-matematica-geometria-06",
   "frente": "Se dois triângulos são semelhantes com razão k, qual a razão entre as áreas?",
   "verso": "k² — a área escala com o quadrado da razão linear."
  },
  {
   "id": "flash-matematica-geometria-07",
   "frente": "Se dois sólidos são semelhantes com razão k, qual a razão entre os volumes?",
   "verso": "k³ — o volume escala com o cubo da razão linear."
  },
  {
   "id": "flash-matematica-geometria-08",
   "frente": "Qual é a fórmula da área de um triângulo, dado base e altura?",
   "verso": "A = (base × altura) / 2."
  },
  {
   "id": "flash-matematica-geometria-09",
   "frente": "Como calcular a área de um triângulo dados dois lados e o ângulo entre eles?",
   "verso": "A = (1/2) · a · b · sen(C)."
  },
  {
   "id": "flash-matematica-geometria-10",
   "frente": "Qual é a fórmula da área de um trapézio?",
   "verso": "A = (base maior + base menor) × altura / 2."
  },
  {
   "id": "flash-matematica-geometria-11",
   "frente": "Qual é a fórmula da área de um losango, dadas as diagonais?",
   "verso": "A = (diagonal maior × diagonal menor) / 2."
  },
  {
   "id": "flash-matematica-geometria-12",
   "frente": "Qual é a fórmula da área de um círculo?",
   "verso": "A = π·r²."
  },
  {
   "id": "flash-matematica-geometria-13",
   "frente": "Qual é a fórmula do comprimento de uma circunferência?",
   "verso": "C = 2·π·r."
  },
  {
   "id": "flash-matematica-geometria-14",
   "frente": "O que é um setor circular, e como calcular sua área?",
   "verso": "É a 'fatia de pizza' de um círculo; A = (ângulo/360°) × π·r²."
  },
  {
   "id": "flash-matematica-geometria-15",
   "frente": "O que é um segmento circular, e como calcular sua área?",
   "verso": "A região entre uma corda e o arco; área do setor menos a área do triângulo formado pelos raios e a corda."
  },
  {
   "id": "flash-matematica-geometria-16",
   "frente": "Quando duas figuras são congruentes (não só semelhantes)?",
   "verso": "Quando têm a mesma forma E o mesmo tamanho — razão de semelhança igual a 1."
  },
  {
   "id": "flash-matematica-geometria-17",
   "frente": "O que caracteriza um polígono regular?",
   "verso": "Todos os lados iguais e todos os ângulos internos iguais."
  },
  {
   "id": "flash-matematica-geometria-18",
   "frente": "Como calcular cada ângulo interno de um polígono regular de n lados?",
   "verso": "[(n − 2) × 180°] / n."
  },
  {
   "id": "flash-matematica-geometria-19",
   "frente": "O que é o apótema de um polígono regular?",
   "verso": "A distância do centro até o ponto médio de um lado; usado para calcular a área como soma de triângulos."
  },
  {
   "id": "flash-matematica-geometria-20",
   "frente": "Como calcular a área de um polígono regular usando o apótema?",
   "verso": "A = (perímetro × apótema) / 2."
  },
  {
   "id": "flash-matematica-geometria-21",
   "frente": "O que diz a desigualdade triangular?",
   "verso": "A soma de dois lados quaisquer é sempre maior que o terceiro lado — senão, o triângulo não existe."
  },
  {
   "id": "flash-matematica-geometria-22",
   "frente": "Como decidir se um triângulo é acutângulo, retângulo ou obtusângulo pelos três lados?",
   "verso": "Compare o quadrado do maior lado com a soma dos quadrados dos outros: igual é retângulo, menor é acutângulo, maior é obtusângulo."
  },
  {
   "id": "flash-matematica-geometria-23",
   "frente": "Qual é a fórmula do volume de um cubo de aresta a?",
   "verso": "V = a³."
  },
  {
   "id": "flash-matematica-geometria-24",
   "frente": "Qual é a fórmula do volume de um paralelepípedo?",
   "verso": "V = comprimento × largura × altura."
  },
  {
   "id": "flash-matematica-geometria-25",
   "frente": "Qual é a fórmula do volume de um cilindro?",
   "verso": "V = π·r²·h."
  },
  {
   "id": "flash-matematica-geometria-26",
   "frente": "Qual é a fórmula do volume de um cone?",
   "verso": "V = (1/3)·π·r²·h — um terço do cilindro de mesma base e altura."
  },
  {
   "id": "flash-matematica-geometria-27",
   "frente": "Qual é a fórmula do volume de uma esfera?",
   "verso": "V = (4/3)·π·r³."
  },
  {
   "id": "flash-matematica-geometria-28",
   "frente": "Qual é a fórmula do volume de uma pirâmide?",
   "verso": "V = (1/3) × área da base × altura."
  },
  {
   "id": "flash-matematica-geometria-29",
   "frente": "Qual é a fórmula do volume de um prisma (qualquer base)?",
   "verso": "V = área da base × altura."
  },
  {
   "id": "flash-matematica-geometria-30",
   "frente": "O que é a Relação de Euler para poliedros convexos?",
   "verso": "V − A + F = 2, sendo V vértices, A arestas e F faces."
  },
  {
   "id": "flash-matematica-geometria-31",
   "frente": "Como usar a Relação de Euler para achar o número de faces, dados vértices e arestas?",
   "verso": "Isole F: F = 2 − V + A."
  },
  {
   "id": "flash-matematica-geometria-32",
   "frente": "O que é a área total de um sólido?",
   "verso": "A soma das áreas de todas as faces externas, incluindo bases."
  },
  {
   "id": "flash-matematica-geometria-33",
   "frente": "Como calcular a área total de um cilindro?",
   "verso": "Duas áreas das bases (2·π·r²) mais a área lateral (2·π·r·h)."
  },
  {
   "id": "flash-matematica-geometria-34",
   "frente": "O que é a área lateral de um cone?",
   "verso": "A = π·r·g, sendo g a geratriz (distância do vértice até a borda da base)."
  },
  {
   "id": "flash-matematica-geometria-35",
   "frente": "Como se relacionam raio, altura e geratriz de um cone reto?",
   "verso": "g² = r² + h² — Pitágoras aplicado ao corte do cone."
  },
  {
   "id": "flash-matematica-geometria-36",
   "frente": "O que é uma seção transversal de um sólido?",
   "verso": "É o 'corte' do sólido por um plano; ajuda a visualizar figuras planas escondidas dentro de sólidos."
  },
  {
   "id": "flash-matematica-geometria-37",
   "frente": "O que gera a rotação de um retângulo em torno de um eixo?",
   "verso": "Um cilindro."
  },
  {
   "id": "flash-matematica-geometria-38",
   "frente": "O que gera a rotação de um triângulo retângulo em torno de uma perna?",
   "verso": "Um cone."
  },
  {
   "id": "flash-matematica-geometria-39",
   "frente": "O que acontece com área de superfície e volume quando todas as dimensões dobram?",
   "verso": "A área multiplica por 4 (2²) e o volume por 8 (2³)."
  },
  {
   "id": "flash-matematica-geometria-40",
   "frente": "Como calcular o volume de um sólido vazado (ex.: cilindro com furo cônico)?",
   "verso": "Volume do sólido externo menos o volume da parte removida."
  },
  {
   "id": "flash-matematica-geometria-41",
   "frente": "Como se calcula a diagonal de um paralelepípedo?",
   "verso": "d² = comprimento² + largura² + altura² — Pitágoras em três dimensões."
  },
  {
   "id": "flash-matematica-geometria-42",
   "frente": "Como comparar volumes de prisma, cilindro, cone e pirâmide de mesma base e altura?",
   "verso": "Prisma e cilindro têm o mesmo volume (área da base × altura); cone e pirâmide têm um terço disso."
  },
  {
   "id": "flash-matematica-geometria-43",
   "frente": "Quais são seno, cosseno e tangente de um ângulo agudo num triângulo retângulo?",
   "verso": "Seno = oposto/hipotenusa; cosseno = adjacente/hipotenusa; tangente = oposto/adjacente."
  },
  {
   "id": "flash-matematica-geometria-44",
   "frente": "Qual é a relação fundamental da trigonometria?",
   "verso": "sen²(x) + cos²(x) = 1, para qualquer ângulo x."
  },
  {
   "id": "flash-matematica-geometria-45",
   "frente": "Como a tangente se relaciona com seno e cosseno?",
   "verso": "tan(x) = sen(x) / cos(x)."
  },
  {
   "id": "flash-matematica-geometria-46",
   "frente": "Quais são seno, cosseno e tangente de 30°, 45° e 60°?",
   "verso": "sen: 1/2, √2/2, √3/2. cos: √3/2, √2/2, 1/2. tan: √3/3, 1, √3."
  },
  {
   "id": "flash-matematica-geometria-47",
   "frente": "Quando usar a Lei dos Senos num triângulo qualquer?",
   "verso": "Quando se conhece dois ângulos e um lado, ou dois lados e um ângulo não compreendido entre eles."
  },
  {
   "id": "flash-matematica-geometria-48",
   "frente": "Qual é a fórmula da Lei dos Senos?",
   "verso": "a/sen(A) = b/sen(B) = c/sen(C)."
  },
  {
   "id": "flash-matematica-geometria-49",
   "frente": "Quando usar a Lei dos Cossenos?",
   "verso": "Quando se conhece dois lados e o ângulo entre eles, ou os três lados para achar um ângulo."
  },
  {
   "id": "flash-matematica-geometria-50",
   "frente": "Qual é a fórmula da Lei dos Cossenos?",
   "verso": "a² = b² + c² − 2bc·cos(A)."
  },
  {
   "id": "flash-matematica-geometria-51",
   "frente": "Como a Lei dos Cossenos vira o Teorema de Pitágoras quando o ângulo é 90°?",
   "verso": "cos(90°) = 0, o termo −2bc·cos(A) desaparece, sobrando a² = b² + c²."
  },
  {
   "id": "flash-matematica-geometria-52",
   "frente": "Como decidir entre Lei dos Senos e Lei dos Cossenos?",
   "verso": "Se o ângulo dado está entre os dois lados conhecidos, use Cossenos; senão, use Senos."
  },
  {
   "id": "flash-matematica-geometria-53",
   "frente": "O que é o círculo trigonométrico?",
   "verso": "Um círculo de raio 1 que define seno e cosseno de qualquer ângulo, como coordenadas de um ponto sobre ele."
  },
  {
   "id": "flash-matematica-geometria-54",
   "frente": "Como variam os sinais de seno e cosseno nos quatro quadrantes?",
   "verso": "1º: ambos positivos. 2º: seno +, cosseno −. 3º: ambos negativos. 4º: seno −, cosseno +."
  },
  {
   "id": "flash-matematica-geometria-55",
   "frente": "O que significa sen(180° − x) = sen(x)?",
   "verso": "Ângulos suplementares têm o mesmo seno."
  },
  {
   "id": "flash-matematica-geometria-56",
   "frente": "Como calcular a área de um triângulo sem conhecer a altura, usando trigonometria?",
   "verso": "A = (1/2)·a·b·sen(C), com dois lados e o ângulo entre eles."
  },
  {
   "id": "flash-matematica-geometria-57",
   "frente": "O que é a tangente do ângulo de inclinação de uma reta?",
   "verso": "É igual ao coeficiente angular da reta."
  },
  {
   "id": "flash-matematica-geometria-58",
   "frente": "Qual é o período de seno e cosseno?",
   "verso": "360° (ou 2π radianos) — as funções se repetem a cada volta completa."
  },
  {
   "id": "flash-matematica-geometria-59",
   "frente": "Como converter um ângulo de graus para radianos?",
   "verso": "Multiplique por π/180."
  },
  {
   "id": "flash-matematica-geometria-60",
   "frente": "Qual é a fórmula da distância entre dois pontos no plano cartesiano?",
   "verso": "d = √[(x₂−x₁)² + (y₂−y₁)²]."
  },
  {
   "id": "flash-matematica-geometria-61",
   "frente": "Qual é a fórmula do ponto médio entre dois pontos?",
   "verso": "M = ((x₁+x₂)/2, (y₁+y₂)/2)."
  },
  {
   "id": "flash-matematica-geometria-62",
   "frente": "Como calcular o coeficiente angular de uma reta por dois pontos?",
   "verso": "m = (y₂ − y₁) / (x₂ − x₁)."
  },
  {
   "id": "flash-matematica-geometria-63",
   "frente": "O que o coeficiente angular de uma reta representa?",
   "verso": "A inclinação: quanto y varia para cada unidade que x aumenta."
  },
  {
   "id": "flash-matematica-geometria-64",
   "frente": "Quando duas retas são paralelas, em termos de coeficiente angular?",
   "verso": "Quando têm o mesmo coeficiente angular."
  },
  {
   "id": "flash-matematica-geometria-65",
   "frente": "Quando duas retas são perpendiculares, em termos de coeficiente angular?",
   "verso": "Quando o produto dos dois coeficientes angulares é −1."
  },
  {
   "id": "flash-matematica-geometria-66",
   "frente": "Qual é a equação reduzida de uma reta?",
   "verso": "y = mx + n, sendo m o coeficiente angular e n onde ela corta o eixo y."
  },
  {
   "id": "flash-matematica-geometria-67",
   "frente": "Como escrever a equação de uma reta com um ponto e o coeficiente angular?",
   "verso": "y − y₀ = m(x − x₀)."
  },
  {
   "id": "flash-matematica-geometria-68",
   "frente": "Qual é a equação padrão da circunferência de centro (a,b) e raio r?",
   "verso": "(x − a)² + (y − b)² = r²."
  },
  {
   "id": "flash-matematica-geometria-69",
   "frente": "Como identificar centro e raio de uma circunferência a partir de uma equação expandida?",
   "verso": "Complete os quadrados em x e em y para reduzir à forma padrão."
  },
  {
   "id": "flash-matematica-geometria-70",
   "frente": "Como saber se um ponto está dentro, na borda ou fora de uma circunferência?",
   "verso": "Compare a distância do ponto ao centro com o raio."
  },
  {
   "id": "flash-matematica-geometria-71",
   "frente": "O que é a distância de um ponto a uma reta, e qual sua fórmula?",
   "verso": "d = |ax₀+by₀+c| / √(a²+b²), usando a equação geral da reta."
  },
  {
   "id": "flash-matematica-geometria-72",
   "frente": "Como calcular a área de um triângulo dados três pontos no plano cartesiano?",
   "verso": "Metade do valor absoluto do determinante 3x3 montado com as coordenadas dos pontos."
  },
  {
   "id": "flash-matematica-geometria-73",
   "frente": "O que é o baricentro de um triângulo, e como se calculam suas coordenadas?",
   "verso": "É o ponto de encontro das medianas; suas coordenadas são a média das coordenadas dos três vértices."
  },
  {
   "id": "flash-matematica-geometria-74",
   "frente": "Como verificar se três pontos estão alinhados?",
   "verso": "Compare o coeficiente angular entre o 1º e o 2º com o do 2º e o 3º; se forem iguais, estão alinhados."
  },
  {
   "id": "flash-matematica-geometria-75",
   "frente": "O que representa a equação x² + y² = r² (sem termos lineares)?",
   "verso": "Uma circunferência centrada na origem, com raio r."
  },
  {
   "id": "flash-matematica-geometria-76",
   "frente": "Como reconhecer, numa equação com x² e y², que se trata de circunferência?",
   "verso": "Os coeficientes de x² e y² precisam ser iguais e de mesmo sinal."
  },
  {
   "id": "flash-matematica-geometria-77",
   "frente": "Como calcular a área de um triângulo formado por uma reta e os eixos coordenados?",
   "verso": "Ache onde a reta cruza os dois eixos e calcule a área do triângulo com esses dois pontos e a origem."
  }
 ],
 "matematica-financeira": [
  {
   "id": "flash-matematica-financeira-01",
   "frente": "Como calcular quanto é X% de um valor V?",
   "verso": "Multiplique V por X/100 (ex.: 20% = 0,20)."
  },
  {
   "id": "flash-matematica-financeira-02",
   "frente": "Como aplicar um aumento percentual usando fator multiplicativo?",
   "verso": "Multiplique o valor por (1 + taxa em decimal); um aumento de 15% multiplica por 1,15."
  },
  {
   "id": "flash-matematica-financeira-03",
   "frente": "Como aplicar um desconto percentual usando fator multiplicativo?",
   "verso": "Multiplique o valor por (1 − taxa em decimal); um desconto de 20% multiplica por 0,80."
  },
  {
   "id": "flash-matematica-financeira-04",
   "frente": "Por que dois aumentos sucessivos de 10% não somam 20%?",
   "verso": "Os fatores se multiplicam: 1,10 × 1,10 = 1,21, um aumento total de 21%."
  },
  {
   "id": "flash-matematica-financeira-05",
   "frente": "O que acontece com um valor após aumento de 10% seguido de desconto de 10%?",
   "verso": "Não volta ao original: 1,10 × 0,90 = 0,99, fica 1% menor."
  },
  {
   "id": "flash-matematica-financeira-06",
   "frente": "Como calcular a taxa percentual de variação entre dois valores?",
   "verso": "(valor final − valor inicial) / valor inicial, ×100."
  },
  {
   "id": "flash-matematica-financeira-07",
   "frente": "Qual é a diferença entre 'aumento de 5 pontos percentuais' e 'aumento de 5%' sobre uma taxa?",
   "verso": "Pontos percentuais somam direto (20%→25%); '5%' sobre 20% seria multiplicar por 1,05, chegando a 21%."
  },
  {
   "id": "flash-matematica-financeira-08",
   "frente": "Como calcular o valor original a partir do valor já com desconto aplicado?",
   "verso": "Divida pelo fator de desconto (ex.: divida por 0,80 se houve desconto de 20%)."
  },
  {
   "id": "flash-matematica-financeira-09",
   "frente": "Por que a alíquota da faixa mais alta de um imposto progressivo não incide sobre a renda inteira?",
   "verso": "Incide só sobre o trecho da renda que cai naquela faixa, não sobre o valor todo."
  },
  {
   "id": "flash-matematica-financeira-10",
   "frente": "Como calcular o imposto devido num sistema de faixas progressivas?",
   "verso": "Some, por faixa completa, a alíquota vezes a largura; na última faixa, aplique só sobre o excedente."
  },
  {
   "id": "flash-matematica-financeira-11",
   "frente": "Como calcular 'porcentagem de porcentagem' (ex.: 20% de 30%)?",
   "verso": "Multiplique as taxas: 0,20 × 0,30 = 0,06, ou seja, 6%."
  },
  {
   "id": "flash-matematica-financeira-12",
   "frente": "A base do cálculo percentual de aumento é o valor inicial ou o final?",
   "verso": "Sempre o valor INICIAL."
  },
  {
   "id": "flash-matematica-financeira-13",
   "frente": "Como calcular quantos por cento A representa de B?",
   "verso": "(A / B) × 100."
  },
  {
   "id": "flash-matematica-financeira-14",
   "frente": "O que é reajuste real, comparado ao reajuste nominal?",
   "verso": "O real desconta a inflação: fator real = fator nominal / fator da inflação."
  },
  {
   "id": "flash-matematica-financeira-15",
   "frente": "Como calcular o reajuste real, dados o nominal e a inflação do período?",
   "verso": "Divida os fatores, subtraia 1 e multiplique por 100."
  },
  {
   "id": "flash-matematica-financeira-16",
   "frente": "Por que a mesma variação em reais pode representar percentuais diferentes?",
   "verso": "Porque a fórmula divide pela base — a mesma diferença é fração maior de uma base pequena."
  },
  {
   "id": "flash-matematica-financeira-17",
   "frente": "Qual é a fórmula do montante em juros simples?",
   "verso": "M = C·(1 + i·t), com C capital, i taxa e t tempo na mesma unidade da taxa."
  },
  {
   "id": "flash-matematica-financeira-18",
   "frente": "Qual é a fórmula do montante em juros compostos?",
   "verso": "M = C·(1 + i)ᵗ — o juro de cada período incide sobre o saldo já acrescido."
  },
  {
   "id": "flash-matematica-financeira-19",
   "frente": "Qual é a diferença central entre juros simples e compostos?",
   "verso": "Simples: juro sempre sobre o capital original. Compostos: juro sobre o saldo atualizado (juros sobre juros)."
  },
  {
   "id": "flash-matematica-financeira-20",
   "frente": "Por que juros compostos crescem mais rápido que simples ao longo do tempo?",
   "verso": "A base de cálculo cresce a cada período nos compostos; nos simples fica sempre igual ao capital inicial."
  },
  {
   "id": "flash-matematica-financeira-21",
   "frente": "Como calcular a taxa mensal equivalente a uma taxa anual, em juros compostos?",
   "verso": "i_mensal = (1 + i_anual)^(1/12) − 1."
  },
  {
   "id": "flash-matematica-financeira-22",
   "frente": "Por que não se pode simplesmente dividir a taxa anual por 12?",
   "verso": "Dividir é operação de juros simples; compostos exigem equivalência multiplicativa (raiz)."
  },
  {
   "id": "flash-matematica-financeira-23",
   "frente": "O que é capitalização, em juros compostos?",
   "verso": "O momento em que o juro do período é incorporado ao capital, passando a render juros no período seguinte."
  },
  {
   "id": "flash-matematica-financeira-24",
   "frente": "Como calcular em quanto tempo um capital dobra, a juros compostos?",
   "verso": "Resolva 2 = (1+i)ᵗ com logaritmo: t = log(2)/log(1+i)."
  },
  {
   "id": "flash-matematica-financeira-25",
   "frente": "O que é a Regra dos 70?",
   "verso": "Estimativa rápida: tempo de duplicação ≈ 70 / (taxa percentual)."
  },
  {
   "id": "flash-matematica-financeira-26",
   "frente": "Como calcular o valor presente de um montante futuro?",
   "verso": "VP = M / (1+i)ᵗ — inverso da fórmula do montante."
  },
  {
   "id": "flash-matematica-financeira-27",
   "frente": "Como se relaciona a taxa de juros real com a nominal e a inflação?",
   "verso": "Fator real = fator nominal / fator da inflação — não é subtração simples das taxas."
  },
  {
   "id": "flash-matematica-financeira-28",
   "frente": "O que é uma prestação de financiamento?",
   "verso": "Cada parcela paga parte de juro sobre o saldo devedor e parte de amortização (capital)."
  },
  {
   "id": "flash-matematica-financeira-29",
   "frente": "O que significa 'juro sobre o saldo devedor'?",
   "verso": "O juro de cada período incide sobre o valor que ainda falta pagar, não sobre o total original."
  },
  {
   "id": "flash-matematica-financeira-30",
   "frente": "Como comparar duas ofertas de crédito com taxas e prazos diferentes?",
   "verso": "Calcule o montante final (ou custo total) sob as mesmas condições, para comparar de forma justa."
  },
  {
   "id": "flash-matematica-financeira-31",
   "frente": "O que é Custo Efetivo Total (CET) de um empréstimo?",
   "verso": "Uma taxa que resume todos os custos (juros, taxas, seguros), útil para comparar ofertas."
  },
  {
   "id": "flash-matematica-financeira-32",
   "frente": "Como calcular a inflação acumulada em N períodos, dadas as taxas de cada um?",
   "verso": "Multiplique os fatores (1+i₁)(1+i₂)...(1+iₙ) e subtraia 1 — nunca some as taxas diretamente."
  },
  {
   "id": "flash-matematica-financeira-33",
   "frente": "O que é uma razão entre duas grandezas?",
   "verso": "A divisão entre elas (a/b), expressando quantas vezes uma contém a outra."
  },
  {
   "id": "flash-matematica-financeira-34",
   "frente": "O que é uma proporção?",
   "verso": "Uma igualdade entre duas razões (a/b = c/d)."
  },
  {
   "id": "flash-matematica-financeira-35",
   "frente": "Qual é a propriedade fundamental das proporções?",
   "verso": "O produto dos meios é igual ao produto dos extremos: se a/b=c/d, então a·d = b·c."
  },
  {
   "id": "flash-matematica-financeira-36",
   "frente": "Como resolver uma regra de três simples?",
   "verso": "Monte a proporção entre as grandezas e use a propriedade fundamental (produto dos meios = extremos)."
  },
  {
   "id": "flash-matematica-financeira-37",
   "frente": "Quando duas grandezas são diretamente proporcionais?",
   "verso": "Quando aumentar uma faz a outra aumentar na mesma razão (quociente constante)."
  },
  {
   "id": "flash-matematica-financeira-38",
   "frente": "Quando duas grandezas são inversamente proporcionais?",
   "verso": "Quando aumentar uma faz a outra diminuir na mesma razão (produto constante)."
  },
  {
   "id": "flash-matematica-financeira-39",
   "frente": "Como resolver uma regra de três com grandezas inversamente proporcionais?",
   "verso": "Inverta uma das razões antes de montar a proporção."
  },
  {
   "id": "flash-matematica-financeira-40",
   "frente": "Como resolver uma regra de três composta (mais de duas grandezas)?",
   "verso": "Analise a relação de cada grandeza com a principal (direta ou inversa) e monte a proporção com todas, invertendo as inversas."
  },
  {
   "id": "flash-matematica-financeira-41",
   "frente": "Como dividir um valor em partes proporcionais a uma razão dada (ex.: 100 na razão 2:3)?",
   "verso": "Some a razão (2+3=5), divida o valor pelo total (100/5=20) e multiplique cada parte da razão."
  },
  {
   "id": "flash-matematica-financeira-42",
   "frente": "O que é escala, num mapa ou planta?",
   "verso": "A razão entre uma medida no desenho e a medida real (ex.: 1:100 significa 1 unidade no desenho = 100 reais)."
  },
  {
   "id": "flash-matematica-financeira-43",
   "frente": "Como calcular a distância real a partir de uma medida no mapa e a escala?",
   "verso": "Multiplique a medida no mapa pelo denominador da escala."
  },
  {
   "id": "flash-matematica-financeira-44",
   "frente": "O que é densidade demográfica, e como se calcula?",
   "verso": "Razão entre população e área: densidade = população / área."
  },
  {
   "id": "flash-matematica-financeira-45",
   "frente": "Como calcular velocidade média num trajeto?",
   "verso": "Velocidade média = distância total / tempo total."
  },
  {
   "id": "flash-matematica-financeira-46",
   "frente": "Como calcular a velocidade média de trechos de mesma distância, mas velocidades diferentes?",
   "verso": "Não é a média aritmética simples; é a média harmônica, porque os tempos de cada trecho pesam diferente."
  },
  {
   "id": "flash-matematica-financeira-47",
   "frente": "Como resolver um problema de trabalho conjunto (torneiras enchendo um tanque)?",
   "verso": "Some as taxas de trabalho (fração por unidade de tempo); o inverso da soma das taxas dá o tempo conjunto."
  },
  {
   "id": "flash-matematica-financeira-48",
   "frente": "O que é média aritmética simples?",
   "verso": "A soma de todos os valores dividida pela quantidade de valores."
  },
  {
   "id": "flash-matematica-financeira-49",
   "frente": "O que é média ponderada?",
   "verso": "Uma média em que cada valor tem um peso; soma dos produtos (valor × peso) dividida pela soma dos pesos."
  },
  {
   "id": "flash-matematica-financeira-50",
   "frente": "Como calcular a média de um grupo depois de remover um elemento, sem recalcular tudo?",
   "verso": "Multiplique a média original pela quantidade, subtraia o valor removido, e divida pela nova quantidade."
  },
  {
   "id": "flash-matematica-financeira-51",
   "frente": "Por que a média de duas médias de grupos de tamanhos diferentes não é a média simples das duas?",
   "verso": "Cada grupo contribui proporcionalmente ao tamanho — é preciso média ponderada pelos tamanhos."
  },
  {
   "id": "flash-matematica-financeira-52",
   "frente": "O que é a mediana de um conjunto de dados?",
   "verso": "O valor do meio quando os dados são ordenados (ou a média dos dois centrais, se a quantidade for par)."
  },
  {
   "id": "flash-matematica-financeira-53",
   "frente": "Como a mediana se comporta diante de valores extremos, comparada à média?",
   "verso": "A mediana é pouco afetada; a média pode ser puxada fortemente por eles."
  },
  {
   "id": "flash-matematica-financeira-54",
   "frente": "O que é a moda de um conjunto de dados?",
   "verso": "O valor que aparece com maior frequência."
  },
  {
   "id": "flash-matematica-financeira-55",
   "frente": "Numa distribuição de renda (assimétrica à direita), como se comparam média e mediana?",
   "verso": "A média fica acima da mediana, puxada por poucos valores muito altos."
  },
  {
   "id": "flash-matematica-financeira-56",
   "frente": "O que é o desvio padrão?",
   "verso": "Mede a dispersão dos dados em torno da média — quanto maior, mais espalhados os valores."
  },
  {
   "id": "flash-matematica-financeira-57",
   "frente": "Como se relacionam desvio padrão e variância?",
   "verso": "O desvio padrão é a raiz quadrada da variância."
  },
  {
   "id": "flash-matematica-financeira-58",
   "frente": "Por que a variância usa o quadrado dos desvios?",
   "verso": "Porque a soma dos desvios simples em torno da média é sempre zero; elevar ao quadrado evita esse cancelamento."
  },
  {
   "id": "flash-matematica-financeira-59",
   "frente": "Como interpretar dois conjuntos com a mesma média mas desvios padrão diferentes?",
   "verso": "O de maior desvio padrão tem dados mais dispersos em torno da média."
  },
  {
   "id": "flash-matematica-financeira-60",
   "frente": "O que é uma tabela de frequências, e o que é frequência acumulada?",
   "verso": "Organiza dados em classes; a frequência acumulada soma progressivamente as frequências até aquela classe."
  },
  {
   "id": "flash-matematica-financeira-61",
   "frente": "Como estimar a mediana a partir de uma tabela de frequências acumuladas?",
   "verso": "Encontre a classe em que a frequência acumulada ultrapassa metade do total de dados."
  },
  {
   "id": "flash-matematica-financeira-62",
   "frente": "O que é frequência relativa?",
   "verso": "A frequência de uma classe dividida pelo total de dados, geralmente em percentual."
  },
  {
   "id": "flash-matematica-financeira-63",
   "frente": "Como se calcula uma taxa de crescimento composta anualizada (CAGR)?",
   "verso": "CAGR = (valor final / valor inicial)^(1/nº de anos) − 1."
  },
  {
   "id": "flash-matematica-financeira-64",
   "frente": "O que é elasticidade, em termos de razão entre variações percentuais?",
   "verso": "A razão entre a variação % de uma grandeza e a variação % de outra que a causou."
  },
  {
   "id": "flash-matematica-financeira-65",
   "frente": "Como interpretar 'a demanda é inelástica'?",
   "verso": "A variação % da quantidade é menor, em valor absoluto, que a variação % do preço que a causou."
  },
  {
   "id": "flash-matematica-financeira-66",
   "frente": "O que representa a curva de Lorenz?",
   "verso": "No eixo x, a fração acumulada da população; no eixo y, a fração acumulada da renda que ela detém."
  },
  {
   "id": "flash-matematica-financeira-67",
   "frente": "Como a curva de Lorenz se relaciona com o Índice de Gini?",
   "verso": "O Gini é o dobro da área entre a curva de Lorenz e a diagonal de igualdade perfeita."
  },
  {
   "id": "flash-matematica-financeira-68",
   "frente": "O que significam Gini igual a zero e Gini igual a 1?",
   "verso": "Zero é igualdade perfeita; 1 é desigualdade máxima (uma só pessoa detém toda a renda)."
  },
  {
   "id": "flash-matematica-financeira-69",
   "frente": "O que é o efeito de somar (em vez de multiplicar) taxas de juros de períodos sucessivos?",
   "verso": "Subestima o resultado real, porque ignora o efeito de 'juros sobre juros' acumulado."
  },
  {
   "id": "flash-matematica-financeira-70",
   "frente": "Como decidir se um problema pede regra de três simples ou composta?",
   "verso": "Se há só duas grandezas relacionadas, é simples; três ou mais variando juntas, é composta."
  },
  {
   "id": "flash-matematica-financeira-71",
   "frente": "O que é o coeficiente de variação?",
   "verso": "O desvio padrão dividido pela média; permite comparar dispersão relativa de conjuntos com médias diferentes."
  },
  {
   "id": "flash-matematica-financeira-72",
   "frente": "Qual é a diferença entre 'amostra' e 'população' em estatística?",
   "verso": "População é o conjunto completo a estudar; amostra é um subconjunto usado para estimar características dela."
  },
  {
   "id": "flash-matematica-financeira-73",
   "frente": "Quando um gráfico de setores (pizza) é mais apropriado?",
   "verso": "Para poucas categorias com diferenças claras, mostrando a proporção de cada uma em relação ao total."
  },
  {
   "id": "flash-matematica-financeira-74",
   "frente": "Quando um gráfico de barras é mais apropriado que o de pizza?",
   "verso": "Quando há muitas categorias ou quando a comparação direta de tamanho importa mais que a proporção do total."
  },
  {
   "id": "flash-matematica-financeira-75",
   "frente": "Como calcular o rendimento médio por trabalhador, dado o total distribuído e o número de trabalhadores?",
   "verso": "Divida o valor total pela quantidade de trabalhadores."
  }
 ],
 "matematica-algebra": [
  {
   "id": "flash-matematica-algebra-01",
   "frente": "O que caracteriza uma função afim (do 1º grau)?",
   "verso": "f(x) = ax + b, com gráfico sendo uma reta; a é o coeficiente angular e b onde a reta corta o eixo y."
  },
  {
   "id": "flash-matematica-algebra-02",
   "frente": "Como interpretar o coeficiente angular a de uma função afim?",
   "verso": "É a taxa de variação constante: quanto f(x) muda para cada unidade que x aumenta."
  },
  {
   "id": "flash-matematica-algebra-03",
   "frente": "Quando uma função afim é crescente ou decrescente?",
   "verso": "Crescente se a > 0; decrescente se a < 0."
  },
  {
   "id": "flash-matematica-algebra-04",
   "frente": "O que caracteriza uma função quadrática (do 2º grau)?",
   "verso": "f(x) = ax² + bx + c, com a ≠ 0, e gráfico em forma de parábola."
  },
  {
   "id": "flash-matematica-algebra-05",
   "frente": "Como saber se a parábola de uma quadrática abre para cima ou para baixo?",
   "verso": "Para cima se a > 0 (tem mínimo); para baixo se a < 0 (tem máximo)."
  },
  {
   "id": "flash-matematica-algebra-06",
   "frente": "Qual é a fórmula das coordenadas do vértice de uma parábola?",
   "verso": "xᵥ = −b/2a e yᵥ = −Δ/4a, sendo Δ = b² − 4ac."
  },
  {
   "id": "flash-matematica-algebra-07",
   "frente": "O que o discriminante (Δ) de uma equação do 2º grau revela sobre as raízes?",
   "verso": "Δ > 0: duas raízes reais distintas; Δ = 0: uma raiz dupla; Δ < 0: nenhuma raiz real."
  },
  {
   "id": "flash-matematica-algebra-08",
   "frente": "Como encontrar as raízes de uma quadrática pela fórmula de Bhaskara?",
   "verso": "x = (−b ± √Δ) / 2a."
  },
  {
   "id": "flash-matematica-algebra-09",
   "frente": "O que significa f(0) numa função afim ou quadrática?",
   "verso": "É o coeficiente independente (b ou c) — onde o gráfico cruza o eixo y."
  },
  {
   "id": "flash-matematica-algebra-10",
   "frente": "Como reconhecer uma função afim disfarçada num problema (custo fixo + custo por unidade)?",
   "verso": "Se cada unidade a mais soma um valor FIXO à outra grandeza, é afim."
  },
  {
   "id": "flash-matematica-algebra-11",
   "frente": "Como reconhecer uma função quadrática disfarçada num problema?",
   "verso": "Quando a grandeza envolve um produto de duas quantidades que variam juntas (ex.: receita = preço × quantidade)."
  },
  {
   "id": "flash-matematica-algebra-12",
   "frente": "Por que o máximo de receita costuma cair no vértice da parábola?",
   "verso": "Receita = preço × quantidade; se o preço cai linearmente com a quantidade, a receita é quadrática, e seu máximo é o vértice."
  },
  {
   "id": "flash-matematica-algebra-13",
   "frente": "O que caracteriza uma função exponencial?",
   "verso": "f(x) = a·bˣ, com b > 0 e b ≠ 1; a variável está no expoente."
  },
  {
   "id": "flash-matematica-algebra-14",
   "frente": "Qual é a diferença entre crescimento exponencial e linear ao longo do tempo?",
   "verso": "No linear, a grandeza cresce a mesma QUANTIDADE a cada intervalo; no exponencial, cresce o mesmo FATOR."
  },
  {
   "id": "flash-matematica-algebra-15",
   "frente": "O que é meia-vida, em termos de função exponencial?",
   "verso": "O intervalo em que a quantidade cai pela metade; a cada meia-vida, multiplica-se por 1/2."
  },
  {
   "id": "flash-matematica-algebra-16",
   "frente": "Como modelar 'a quantidade dobra a cada X anos'?",
   "verso": "Q(t) = Q₀ · 2^(t/X)."
  },
  {
   "id": "flash-matematica-algebra-17",
   "frente": "O que é logaritmo, em termos simples?",
   "verso": "A operação inversa da exponenciação: logₐ(x) = y significa aʸ = x."
  },
  {
   "id": "flash-matematica-algebra-18",
   "frente": "Como usar logaritmo para resolver 2ˣ = 50?",
   "verso": "Aplique log dos dois lados: x = log(50)/log(2)."
  },
  {
   "id": "flash-matematica-algebra-19",
   "frente": "Qual é a propriedade do log de um produto?",
   "verso": "log(a·b) = log(a) + log(b) — o log transforma multiplicação em soma."
  },
  {
   "id": "flash-matematica-algebra-20",
   "frente": "Qual é a propriedade do log de uma potência?",
   "verso": "log(aⁿ) = n·log(a) — o expoente desce como fator multiplicativo."
  },
  {
   "id": "flash-matematica-algebra-21",
   "frente": "Por que um gráfico em escala log-log que vira reta indica lei de potência (y = a·xᵇ)?",
   "verso": "log(y) = log(a) + b·log(x) — reta em log(x) e log(y), com coeficiente angular igual ao expoente b."
  },
  {
   "id": "flash-matematica-algebra-22",
   "frente": "Por que um gráfico em escala mono-log que vira reta indica exponencial?",
   "verso": "log(y) = log(a) + x·log(b) — reta em x e log(y), coeficiente angular igual a log(b)."
  },
  {
   "id": "flash-matematica-algebra-23",
   "frente": "Como calcular a taxa mensal equivalente a uma taxa anual conhecida?",
   "verso": "Fator mensal = (fator anual)^(1/12)."
  },
  {
   "id": "flash-matematica-algebra-24",
   "frente": "Como resolver uma equação do 2º grau incompleta sem termo em x (ax² + c = 0)?",
   "verso": "Isole x²: x² = −c/a, depois tire a raiz quadrada (com ±)."
  },
  {
   "id": "flash-matematica-algebra-25",
   "frente": "Como resolver uma equação do 2º grau incompleta sem termo independente (ax² + bx = 0)?",
   "verso": "Fatore x em evidência: x(ax+b) = 0; as raízes são x = 0 e x = −b/a."
  },
  {
   "id": "flash-matematica-algebra-26",
   "frente": "Como se resolve uma inequação do 2º grau?",
   "verso": "Encontre as raízes e analise o sinal da parábola entre e fora delas, conforme ela abre para cima ou para baixo."
  },
  {
   "id": "flash-matematica-algebra-27",
   "frente": "Como resolver um sistema de duas equações lineares por substituição?",
   "verso": "Isole uma variável numa equação e substitua na outra."
  },
  {
   "id": "flash-matematica-algebra-28",
   "frente": "Como resolver um sistema de duas equações lineares por eliminação?",
   "verso": "Multiplique uma ou as duas equações até os coeficientes de uma variável ficarem opostos, e some."
  },
  {
   "id": "flash-matematica-algebra-29",
   "frente": "O que significa um sistema linear ser possível e determinado?",
   "verso": "Tem exatamente uma solução — as retas se cruzam num único ponto."
  },
  {
   "id": "flash-matematica-algebra-30",
   "frente": "O que significa um sistema linear ser possível e indeterminado?",
   "verso": "Tem infinitas soluções — as duas equações descrevem a mesma reta."
  },
  {
   "id": "flash-matematica-algebra-31",
   "frente": "O que significa um sistema linear ser impossível?",
   "verso": "Não tem solução — as retas são paralelas e distintas."
  },
  {
   "id": "flash-matematica-algebra-32",
   "frente": "Como usar o determinante para classificar um sistema 2x2 sem resolvê-lo por completo?",
   "verso": "Se o determinante da matriz dos coeficientes é diferente de zero, é possível e determinado."
  },
  {
   "id": "flash-matematica-algebra-33",
   "frente": "O que é a Regra de Cramer?",
   "verso": "Resolve sistemas lineares usando razões de determinantes: cada variável é um determinante dividido pelo determinante da matriz de coeficientes."
  },
  {
   "id": "flash-matematica-algebra-34",
   "frente": "Como resolver um sistema linear com um parâmetro k para achar quando é indeterminado?",
   "verso": "Iguale o determinante da matriz dos coeficientes a zero e resolva para k."
  },
  {
   "id": "flash-matematica-algebra-35",
   "frente": "O que é uma inequação-produto (ex.: (x−2)(x+3) > 0)?",
   "verso": "Estuda-se o sinal de cada fator separadamente e combina-se por intervalo."
  },
  {
   "id": "flash-matematica-algebra-36",
   "frente": "Como resolver uma inequação-quociente (fração com x no denominador)?",
   "verso": "Igual à inequação-produto, mas excluindo os valores que zeram o denominador."
  },
  {
   "id": "flash-matematica-algebra-37",
   "frente": "O que acontece ao multiplicar os dois lados de uma inequação por um número negativo?",
   "verso": "Inverte-se o sentido da desigualdade."
  },
  {
   "id": "flash-matematica-algebra-38",
   "frente": "Como resolver uma equação com raiz quadrada de uma expressão?",
   "verso": "Isole a raiz, eleve os dois lados ao quadrado, resolva, e confira as soluções na equação original."
  },
  {
   "id": "flash-matematica-algebra-39",
   "frente": "Por que é preciso conferir as soluções após elevar uma equação ao quadrado?",
   "verso": "Pode introduzir soluções que não satisfazem a equação original (raízes estranhas)."
  },
  {
   "id": "flash-matematica-algebra-40",
   "frente": "O que é uma matriz?",
   "verso": "Uma tabela retangular de números organizados em linhas e colunas."
  },
  {
   "id": "flash-matematica-algebra-41",
   "frente": "Como somar duas matrizes de mesma dimensão?",
   "verso": "Some elemento a elemento, na mesma posição (linha, coluna)."
  },
  {
   "id": "flash-matematica-algebra-42",
   "frente": "Como multiplicar uma matriz por um escalar?",
   "verso": "Multiplique cada elemento da matriz por esse número."
  },
  {
   "id": "flash-matematica-algebra-43",
   "frente": "Quais são as condições para multiplicar duas matrizes A e B?",
   "verso": "O número de colunas de A precisa ser igual ao número de linhas de B."
  },
  {
   "id": "flash-matematica-algebra-44",
   "frente": "Como se calcula um elemento do produto de duas matrizes?",
   "verso": "É a soma dos produtos da linha correspondente de A pela coluna correspondente de B."
  },
  {
   "id": "flash-matematica-algebra-45",
   "frente": "A multiplicação de matrizes é comutativa (A·B = B·A)?",
   "verso": "Em geral, não — a ordem importa."
  },
  {
   "id": "flash-matematica-algebra-46",
   "frente": "O que é a matriz identidade?",
   "verso": "Tem 1 na diagonal principal e 0 nas demais posições; multiplicar por ela não altera a outra matriz."
  },
  {
   "id": "flash-matematica-algebra-47",
   "frente": "O que é a matriz transposta de A?",
   "verso": "A matriz obtida trocando linhas por colunas."
  },
  {
   "id": "flash-matematica-algebra-48",
   "frente": "Como calcular o determinante de uma matriz 2x2 [[a,b],[c,d]]?",
   "verso": "ad − bc: produto da diagonal principal menos o da diagonal secundária."
  },
  {
   "id": "flash-matematica-algebra-49",
   "frente": "Como calcular o determinante de uma 3x3 pela Regra de Sarrus?",
   "verso": "Repita as duas primeiras colunas ao lado; some os produtos das diagonais descendo e subtraia os das diagonais subindo."
  },
  {
   "id": "flash-matematica-algebra-50",
   "frente": "O que significa um determinante ser igual a zero?",
   "verso": "A matriz é singular — não tem inversa, e o sistema associado não é possível e determinado."
  },
  {
   "id": "flash-matematica-algebra-51",
   "frente": "O que é a matriz inversa de A, e quando existe?",
   "verso": "É A⁻¹ tal que A · A⁻¹ = identidade; só existe se o determinante de A for diferente de zero."
  },
  {
   "id": "flash-matematica-algebra-52",
   "frente": "Como o determinante de uma matriz 2x2 se relaciona com área?",
   "verso": "O valor absoluto do determinante formado por dois vetores é a área do paralelogramo que eles formam."
  },
  {
   "id": "flash-matematica-algebra-53",
   "frente": "Por que 'matriz singular' é um alerta em sistema linear com parâmetro?",
   "verso": "Quando o determinante se anula, o sistema muda de comportamento nesse valor — de determinado para indeterminado ou impossível."
  },
  {
   "id": "flash-matematica-algebra-54",
   "frente": "O que é interpolação polinomial?",
   "verso": "Encontrar o polinômio de menor grau que passa exatamente por um conjunto de pontos dados."
  },
  {
   "id": "flash-matematica-algebra-55",
   "frente": "Quantos pontos determinam um polinômio de grau n de forma única?",
   "verso": "n + 1 pontos — cada ponto gera uma equação para as n+1 incógnitas (os coeficientes)."
  },
  {
   "id": "flash-matematica-algebra-56",
   "frente": "Como montar o sistema para achar um polinômio de 2º grau que passa por três pontos?",
   "verso": "Substitua cada ponto na forma ax²+bx+c = y, gerando três equações lineares."
  },
  {
   "id": "flash-matematica-algebra-57",
   "frente": "O que é uma função definida por partes (por trechos)?",
   "verso": "Uma função com expressões diferentes para intervalos diferentes do domínio."
  },
  {
   "id": "flash-matematica-algebra-58",
   "frente": "Como encontrar o ponto de encontro entre duas funções que formam um 'mínimo' por partes?",
   "verso": "Iguale as duas expressões e resolva — é o ponto onde a função troca de qual expressão usar."
  },
  {
   "id": "flash-matematica-algebra-59",
   "frente": "Por que é preciso declarar o domínio de cada trecho numa função por partes?",
   "verso": "Sem o domínio, não se sabe ONDE cada expressão vale — duas podem coincidir num ponto e divergir fora dele."
  },
  {
   "id": "flash-matematica-algebra-60",
   "frente": "Como verificar se uma função por partes é contínua no ponto de junção?",
   "verso": "Calcule o valor de cada trecho no ponto; se coincidem, é contínua; se não, há um salto."
  },
  {
   "id": "flash-matematica-algebra-61",
   "frente": "O que é uma função de faixas (como imposto progressivo)?",
   "verso": "Cada faixa de valor tem uma taxa aplicada só sobre o EXCEDENTE daquela faixa, não sobre o valor total."
  },
  {
   "id": "flash-matematica-algebra-62",
   "frente": "Como escrever a função de um imposto progressivo de três faixas?",
   "verso": "Some, por faixa completa, a alíquota vezes a largura da faixa; na faixa em que o valor cai, aplique só sobre o excedente."
  },
  {
   "id": "flash-matematica-algebra-63",
   "frente": "O que é a diferença finita de uma função (Δf(n) = f(n+1) − f(n))?",
   "verso": "A diferença entre valores consecutivos; é o análogo discreto da taxa de variação."
  },
  {
   "id": "flash-matematica-algebra-64",
   "frente": "Como a diferença finita se comporta ao ser aplicada a um polinômio?",
   "verso": "Reduz o grau em 1 a cada aplicação; k aplicações a um polinômio de grau k dão uma constante."
  },
  {
   "id": "flash-matematica-algebra-65",
   "frente": "Como se relacionam os conjuntos naturais, inteiros, racionais, irracionais e reais?",
   "verso": "Naturais ⊂ Inteiros ⊂ Racionais ⊂ Reais; Irracionais são os reais que não são racionais."
  },
  {
   "id": "flash-matematica-algebra-66",
   "frente": "O que caracteriza um número racional?",
   "verso": "Pode ser escrito como fração de dois inteiros; toda dízima periódica é racional."
  },
  {
   "id": "flash-matematica-algebra-67",
   "frente": "Como transformar uma dízima periódica em fração?",
   "verso": "Escreva-a como soma de uma PG infinita de razão 1/10^(período) e use a fórmula da soma da PG infinita."
  },
  {
   "id": "flash-matematica-algebra-68",
   "frente": "O que caracteriza um número irracional?",
   "verso": "Não pode ser escrito como fração exata; sua representação decimal não é finita nem periódica."
  },
  {
   "id": "flash-matematica-algebra-69",
   "frente": "Como simplificar uma expressão com radicais (ex.: √50)?",
   "verso": "Fatore o radicando isolando o maior quadrado perfeito: √50 = √(25·2) = 5√2."
  },
  {
   "id": "flash-matematica-algebra-70",
   "frente": "Como racionalizar o denominador de 1/√2?",
   "verso": "Multiplique numerador e denominador por √2: 1/√2 = √2/2."
  },
  {
   "id": "flash-matematica-algebra-71",
   "frente": "O que significa 'isolar a incógnita' numa equação?",
   "verso": "Reorganizar a equação, aplicando a mesma operação nos dois lados, até a variável ficar sozinha de um lado."
  },
  {
   "id": "flash-matematica-algebra-72",
   "frente": "Como decidir a ordem de operações ao isolar uma incógnita?",
   "verso": "Desfaça as operações na ordem inversa de como foram aplicadas na expressão."
  },
  {
   "id": "flash-matematica-algebra-73",
   "frente": "O que é substituição de variável para simplificar uma equação?",
   "verso": "Trocar uma expressão repetida por uma nova letra, transformando a equação numa forma mais simples e conhecida."
  },
  {
   "id": "flash-matematica-algebra-74",
   "frente": "Como uma equação biquadrada (com x⁴ e x²) vira uma do 2º grau?",
   "verso": "Substitua y = x²; resolva em y, depois volte para x tirando a raiz quadrada de cada solução."
  },
  {
   "id": "flash-matematica-algebra-75",
   "frente": "Como resolver uma equação exponencial com bases diferentes que podem virar iguais?",
   "verso": "Reescreva as potências com a mesma base (ex.: 4 = 2²) para igualar diretamente os expoentes."
  },
  {
   "id": "flash-matematica-algebra-76",
   "frente": "Como resolver uma equação exponencial quando as bases não podem ser igualadas?",
   "verso": "Aplique logaritmo dos dois lados e isole a incógnita."
  },
  {
   "id": "flash-matematica-algebra-77",
   "frente": "Qual é a razão entre o coeficiente angular de uma reta e a tangente do ângulo que ela forma com o eixo x?",
   "verso": "São a mesma coisa: o coeficiente angular É a tangente desse ângulo."
  },
  {
   "id": "flash-matematica-algebra-78",
   "frente": "O que caracteriza uma função par e uma função ímpar?",
   "verso": "Par: f(−x) = f(x), gráfico simétrico ao eixo y. Ímpar: f(−x) = −f(x), gráfico simétrico à origem."
  },
  {
   "id": "flash-matematica-algebra-79",
   "frente": "Como identificar o domínio de uma função com denominador?",
   "verso": "Exclua os valores de x que anulam o denominador."
  }
 ],
 "matematica-probabilidade": [
  {
   "id": "flash-matematica-probabilidade-01",
   "frente": "Como se calcula a probabilidade de um evento em um espaço equiprovável?",
   "verso": "P(evento) = casos favoráveis / casos possíveis (o total do espaço amostral)."
  },
  {
   "id": "flash-matematica-probabilidade-02",
   "frente": "O que é o evento complementar de A, e como se relaciona com P(A)?",
   "verso": "É 'não A'; P(complementar) = 1 − P(A). Útil quando 'não acontecer' é mais fácil de calcular."
  },
  {
   "id": "flash-matematica-probabilidade-03",
   "frente": "Como calcular a probabilidade da união de dois eventos A e B?",
   "verso": "P(A ou B) = P(A) + P(B) − P(A e B) — subtrai-se a interseção para não contar duas vezes."
  },
  {
   "id": "flash-matematica-probabilidade-04",
   "frente": "Quando P(A e B) = P(A) · P(B)?",
   "verso": "Quando A e B são independentes — a ocorrência de um não afeta a probabilidade do outro."
  },
  {
   "id": "flash-matematica-probabilidade-05",
   "frente": "O que é probabilidade condicional P(A|B)?",
   "verso": "A probabilidade de A ocorrer DADO que B já ocorreu; P(A|B) = P(A e B) / P(B)."
  },
  {
   "id": "flash-matematica-probabilidade-06",
   "frente": "Qual é o erro mais comum ao somar probabilidades de dois eventos?",
   "verso": "Somar P(A) + P(B) sem subtrair a interseção, quando os eventos podem ocorrer juntos."
  },
  {
   "id": "flash-matematica-probabilidade-07",
   "frente": "O que é o espaço amostral de um experimento aleatório?",
   "verso": "O conjunto de todos os resultados possíveis desse experimento."
  },
  {
   "id": "flash-matematica-probabilidade-08",
   "frente": "Como a probabilidade de um evento se relaciona com 'nenhum de uma lista de eventos ocorrer'?",
   "verso": "P(nenhum) = 1 − P(pelo menos um) — o complementar de 'pelo menos um' é 'nenhum'."
  },
  {
   "id": "flash-matematica-probabilidade-09",
   "frente": "Se dois eventos são mutuamente exclusivos, quanto vale P(A e B)?",
   "verso": "Zero — os dois não podem ocorrer ao mesmo tempo (ex.: tirar par E ímpar num único dado)."
  },
  {
   "id": "flash-matematica-probabilidade-10",
   "frente": "Como interpretar 'probabilidade de pelo menos um sucesso em n tentativas independentes'?",
   "verso": "Pelo complementar: 1 − P(nenhum sucesso) = 1 − (probabilidade de falha)ⁿ."
  },
  {
   "id": "flash-matematica-probabilidade-11",
   "frente": "O que muda entre sorteio com reposição e sem reposição?",
   "verso": "Com reposição, a probabilidade de cada sorteio é sempre igual (independentes); sem reposição, o espaço diminui a cada sorteio (dependentes)."
  },
  {
   "id": "flash-matematica-probabilidade-12",
   "frente": "Como calcular a probabilidade de dois eventos em sequência, sem reposição?",
   "verso": "Multiplique a probabilidade do primeiro pela probabilidade do segundo, já considerando que o espaço mudou."
  },
  {
   "id": "flash-matematica-probabilidade-13",
   "frente": "O que a Regra da Multiplicação diz sobre eventos dependentes em sequência?",
   "verso": "P(A e B) = P(A) · P(B|A) — a probabilidade do segundo é condicionada ao que já aconteceu no primeiro."
  },
  {
   "id": "flash-matematica-probabilidade-14",
   "frente": "Como um diagrama de árvore ajuda em probabilidade sequencial?",
   "verso": "Cada ramo representa uma escolha com sua probabilidade; multiplica-se ao longo do caminho, soma-se entre caminhos distintos."
  },
  {
   "id": "flash-matematica-probabilidade-15",
   "frente": "Para que serve o Diagrama de Venn em probabilidade com conjuntos?",
   "verso": "Visualizar a interseção entre eventos, evitando contar duas vezes quem está em mais de um grupo."
  },
  {
   "id": "flash-matematica-probabilidade-16",
   "frente": "Como o princípio de inclusão-exclusão se generaliza para três eventos?",
   "verso": "P(A∪B∪C) = P(A)+P(B)+P(C) − P(A∩B) − P(A∩C) − P(B∩C) + P(A∩B∩C)."
  },
  {
   "id": "flash-matematica-probabilidade-17",
   "frente": "O que é fatorial de um número n (n!)?",
   "verso": "O produto de todos os inteiros positivos de 1 até n; por definição, 0! = 1."
  },
  {
   "id": "flash-matematica-probabilidade-18",
   "frente": "Qual é a diferença entre arranjo e combinação?",
   "verso": "No arranjo a ORDEM importa (AB ≠ BA); na combinação, não (AB e BA contam como o mesmo grupo)."
  },
  {
   "id": "flash-matematica-probabilidade-19",
   "frente": "Qual é a fórmula da combinação de n elementos tomados p a p?",
   "verso": "C(n,p) = n! / [p!·(n−p)!]."
  },
  {
   "id": "flash-matematica-probabilidade-20",
   "frente": "Qual é a fórmula do arranjo de n elementos tomados p a p?",
   "verso": "A(n,p) = n! / (n−p)!."
  },
  {
   "id": "flash-matematica-probabilidade-21",
   "frente": "Quando usar permutação simples em vez de arranjo?",
   "verso": "Quando TODOS os n elementos são organizados (p = n) — é o caso especial do arranjo."
  },
  {
   "id": "flash-matematica-probabilidade-22",
   "frente": "O que é permutação com elementos repetidos?",
   "verso": "Divide-se o total de permutações pelo produto dos fatoriais das quantidades repetidas."
  },
  {
   "id": "flash-matematica-probabilidade-23",
   "frente": "Como decidir, num problema, entre arranjo ou combinação?",
   "verso": "Pergunte: trocar a ordem dos elementos escolhidos gera um resultado diferente? Se sim, arranjo; se não, combinação."
  },
  {
   "id": "flash-matematica-probabilidade-24",
   "frente": "O que é o Princípio Fundamental da Contagem?",
   "verso": "Se uma escolha tem m possibilidades e outra, independente, tem n possibilidades, o total é m · n."
  },
  {
   "id": "flash-matematica-probabilidade-25",
   "frente": "Como aplicar o princípio multiplicativo para contar placas ou senhas?",
   "verso": "Multiplique o número de opções de cada posição, considerando se há repetição permitida em cada uma."
  },
  {
   "id": "flash-matematica-probabilidade-26",
   "frente": "O que é o Princípio Aditivo de contagem?",
   "verso": "Se duas situações são mutuamente exclusivas, o total de possibilidades é a SOMA das possibilidades de cada uma."
  },
  {
   "id": "flash-matematica-probabilidade-27",
   "frente": "Como contar o número de subconjuntos de um conjunto com n elementos?",
   "verso": "2ⁿ, incluindo o vazio e o conjunto todo — cada elemento tem duas opções (entra ou não)."
  },
  {
   "id": "flash-matematica-probabilidade-28",
   "frente": "O que é um anagrama, e como contar quantos existem de uma palavra?",
   "verso": "É qualquer reorganização das letras; conta-se por permutação, dividindo por fatoriais de letras repetidas."
  },
  {
   "id": "flash-matematica-probabilidade-29",
   "frente": "Como contar arranjos com a restrição 'dois elementos sempre juntos'?",
   "verso": "Trate o par como um bloco único, permute os blocos, e multiplique pelas permutações internas do bloco."
  },
  {
   "id": "flash-matematica-probabilidade-30",
   "frente": "Como contar arranjos com a restrição 'dois elementos nunca juntos'?",
   "verso": "Conte o total sem restrição e subtraia os casos em que eles estão juntos (tratados como bloco)."
  },
  {
   "id": "flash-matematica-probabilidade-31",
   "frente": "O que é combinação complementar (C(n,p) = C(n,n−p))?",
   "verso": "Escolher p elementos é o mesmo que deixar de fora n−p elementos — as duas contagens dão o mesmo resultado."
  },
  {
   "id": "flash-matematica-probabilidade-32",
   "frente": "Como contar de quantas formas dividir um grupo em subgrupos de tamanhos diferentes?",
   "verso": "Multiplique as combinações sucessivas: escolha o primeiro subgrupo do total, o segundo do que sobrou, e assim por diante."
  },
  {
   "id": "flash-matematica-probabilidade-33",
   "frente": "O que caracteriza um problema de posições igualmente espaçadas?",
   "verso": "O número de arranjos possíveis depende dos DIVISORES da quantidade total de posições."
  },
  {
   "id": "flash-matematica-probabilidade-34",
   "frente": "Como calcular combinações quando a escolha e a organização importam em etapas diferentes?",
   "verso": "Escolha o grupo por combinação primeiro, depois organize-o internamente por permutação — duas etapas multiplicadas."
  },
  {
   "id": "flash-matematica-probabilidade-35",
   "frente": "Como contar arranjos em círculo (permutação circular)?",
   "verso": "(n−1)! em vez de n! — fixa-se um elemento como referência, porque girar todos não gera arranjo novo."
  },
  {
   "id": "flash-matematica-probabilidade-36",
   "frente": "Qual é o cuidado ao contar posições circulares com reflexão (ex.: pulseira que pode virar)?",
   "verso": "Se virar não gera arranjo novo, divide-se ainda por 2, além do (n−1)!."
  },
  {
   "id": "flash-matematica-probabilidade-37",
   "frente": "Como contar filas com dois grupos distintos alternados?",
   "verso": "Fixe a alternância (ex.: grupo A nas posições ímpares), depois permute cada grupo internamente."
  },
  {
   "id": "flash-matematica-probabilidade-38",
   "frente": "O que é contagem 'por complementar' numa restrição do tipo 'pelo menos um'?",
   "verso": "Calcule o total sem restrição e subtraia os casos em que a condição NÃO ocorre."
  },
  {
   "id": "flash-matematica-probabilidade-39",
   "frente": "Como contar comissões com pelo menos um homem, dados grupos de homens e mulheres?",
   "verso": "Total de comissões possíveis menos as comissões formadas só por mulheres."
  },
  {
   "id": "flash-matematica-probabilidade-40",
   "frente": "O que fazer quando duas restrições se sobrepõem numa contagem?",
   "verso": "Use inclusão-exclusão: some as contagens de cada restrição e subtraia a interseção."
  },
  {
   "id": "flash-matematica-probabilidade-41",
   "frente": "Como contar arranjos de objetos idênticos em posições distintas?",
   "verso": "Combinação, não arranjo — escolha as posições que recebem cada tipo, sem se importar com a 'identidade' de objetos iguais."
  },
  {
   "id": "flash-matematica-probabilidade-42",
   "frente": "O que é o problema clássico de 'objetos idênticos em caixas' (distribuição)?",
   "verso": "Contar de quantas formas n objetos idênticos se distribuem em k caixas — combinação com repetição, C(n+k−1, k−1)."
  },
  {
   "id": "flash-matematica-probabilidade-43",
   "frente": "Como contar caminhos numa malha, andando só para a direita e para cima?",
   "verso": "É permutação com repetição dos movimentos; equivalente a escolher, entre todos os passos, quais são 'para cima'."
  },
  {
   "id": "flash-matematica-probabilidade-44",
   "frente": "O que caracteriza o problema de 'pelo menos dois iguais' (tipo aniversário)?",
   "verso": "Calcula-se pelo complementar: 1 menos a probabilidade de todos serem diferentes."
  },
  {
   "id": "flash-matematica-probabilidade-45",
   "frente": "Como contar senhas com letras e números, sem repetição?",
   "verso": "Multiplique separadamente as opções de letras (arranjo) e de números (arranjo), pelo princípio multiplicativo."
  },
  {
   "id": "flash-matematica-probabilidade-46",
   "frente": "O que é a 'regra do vizinho' em contagem com restrição de proximidade?",
   "verso": "Trate elementos que devem ficar juntos como um bloco, resolva com o bloco, depois multiplique pelas permutações internas."
  },
  {
   "id": "flash-matematica-probabilidade-47",
   "frente": "Como contar arranjos em que uma pessoa nunca fica na primeira posição?",
   "verso": "Total de arranjos menos os arranjos com essa pessoa fixada na primeira posição."
  },
  {
   "id": "flash-matematica-probabilidade-48",
   "frente": "Como testar se dois eventos são independentes usando probabilidade condicional?",
   "verso": "Se P(A|B) = P(A), são independentes — saber que B ocorreu não muda a chance de A."
  },
  {
   "id": "flash-matematica-probabilidade-49",
   "frente": "Para que serve o Teorema de Bayes?",
   "verso": "Inverter uma probabilidade condicional: calcular P(B|A) a partir de P(A|B)."
  },
  {
   "id": "flash-matematica-probabilidade-50",
   "frente": "Como interpretar probabilidade condicionada a uma informação parcial (ex.: sabendo que o resultado é par)?",
   "verso": "Restrinja o espaço amostral aos casos compatíveis com a informação, e calcule dentro desse espaço reduzido."
  },
  {
   "id": "flash-matematica-probabilidade-51",
   "frente": "O que é uma árvore de probabilidade condicional em múltiplas etapas?",
   "verso": "Cada ramo a partir da segunda etapa tem probabilidade condicionada ao ramo escolhido na etapa anterior."
  },
  {
   "id": "flash-matematica-probabilidade-52",
   "frente": "Como calcular a probabilidade total de um evento com vários caminhos possíveis?",
   "verso": "Some a probabilidade de cada caminho (multiplicando as condicionais ao longo dele) — Teorema da Probabilidade Total."
  },
  {
   "id": "flash-matematica-probabilidade-53",
   "frente": "O que significa 'a probabilidade da rodada seguinte depende do resultado da anterior'?",
   "verso": "É uma recorrência probabilística: p(n+1) é função de p(n), e se resolve como se resolve uma sequência."
  },
  {
   "id": "flash-matematica-probabilidade-54",
   "frente": "Como achar o comportamento de longo prazo de uma probabilidade recorrente?",
   "verso": "Iguale p(n+1) a p(n) na relação e resolva para p — é o valor para o qual a probabilidade se estabiliza."
  },
  {
   "id": "flash-matematica-probabilidade-55",
   "frente": "O que é uma cadeia de dois estados com probabilidades de transição?",
   "verso": "Um sistema que alterna entre dois estados; a soma das probabilidades de permanecer e de mudar é sempre 1."
  },
  {
   "id": "flash-matematica-probabilidade-56",
   "frente": "Como confirmar que uma árvore de probabilidade foi montada corretamente?",
   "verso": "A soma das probabilidades de todos os ramos que saem de um mesmo nó deve ser exatamente 1."
  },
  {
   "id": "flash-matematica-probabilidade-57",
   "frente": "Por que independência não pode ser assumida, só verificada?",
   "verso": "Dois eventos podem parecer não relacionados e ainda ser dependentes, ou vice-versa — só o cálculo confirma."
  },
  {
   "id": "flash-matematica-probabilidade-58",
   "frente": "O que fazer quando um problema envolve eventos sem reposição em sequência?",
   "verso": "Trate como dependentes: a probabilidade de cada evento seguinte muda porque o espaço amostral diminuiu."
  },
  {
   "id": "flash-matematica-probabilidade-59",
   "frente": "Qual é a diferença entre 'probabilidade de A e B' e 'probabilidade de A dado B'?",
   "verso": "A primeira é sobre o espaço amostral inteiro; a segunda é sobre o espaço restrito aos casos em que B já ocorreu."
  },
  {
   "id": "flash-matematica-probabilidade-60",
   "frente": "Por que P(A|B) geralmente é diferente de P(B|A)?",
   "verso": "São perguntas diferentes: uma pergunta a chance de A no mundo onde B é verdade, e a outra o inverso."
  },
  {
   "id": "flash-matematica-probabilidade-61",
   "frente": "Quando usar a distribuição binomial?",
   "verso": "Quando há n repetições independentes de um experimento com só dois resultados e probabilidade de sucesso fixa."
  },
  {
   "id": "flash-matematica-probabilidade-62",
   "frente": "Qual é a fórmula da probabilidade binomial de exatamente k sucessos em n tentativas?",
   "verso": "P(k) = C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ, sendo p a probabilidade de sucesso em cada tentativa."
  },
  {
   "id": "flash-matematica-probabilidade-63",
   "frente": "Por que o coeficiente binomial C(n,k) aparece na fórmula?",
   "verso": "Conta de quantas ORDENS diferentes os k sucessos podem se distribuir entre as n tentativas."
  },
  {
   "id": "flash-matematica-probabilidade-64",
   "frente": "O que é um passeio aleatório de saldo (sobe ou desce a cada rodada)?",
   "verso": "Um processo em que uma grandeza aumenta ou diminui a cada etapa, com probabilidade fixa para cada direção; modela-se por binomial."
  },
  {
   "id": "flash-matematica-probabilidade-65",
   "frente": "Como traduzir 'terminar com saldo +2 após 6 rodadas' em número de sucessos?",
   "verso": "Se g é o número de vitórias, o saldo final é 2g − n; resolva para g e use na binomial."
  },
  {
   "id": "flash-matematica-probabilidade-66",
   "frente": "O que fazer quando a pergunta é sobre 'pelo menos k sucessos' numa binomial?",
   "verso": "Some as probabilidades de k, k+1, ..., n sucessos, ou use o complementar, o que for mais rápido."
  },
  {
   "id": "flash-matematica-probabilidade-67",
   "frente": "Como a probabilidade binomial se relaciona com o binômio de Newton?",
   "verso": "Os termos da expansão de (p+q)ⁿ correspondem às probabilidades de cada número de sucessos, somando 1."
  },
  {
   "id": "flash-matematica-probabilidade-68",
   "frente": "Por que a distribuição binomial é simétrica quando p = 0,5?",
   "verso": "Trocar 'sucesso' por 'fracasso' não muda a estrutura do problema — k sucessos é tão provável quanto n−k."
  },
  {
   "id": "flash-matematica-probabilidade-69",
   "frente": "Qual é a probabilidade de tirar um número específico num dado de 6 faces?",
   "verso": "1/6, assumindo dado honesto."
  },
  {
   "id": "flash-matematica-probabilidade-70",
   "frente": "Qual é a probabilidade de a soma de dois dados ser 7?",
   "verso": "6/36 = 1/6 — a soma mais provável, com o maior número de combinações."
  },
  {
   "id": "flash-matematica-probabilidade-71",
   "frente": "Qual é a probabilidade de tirar cara em duas moedas seguidas?",
   "verso": "1/4 — cada moeda tem 1/2, e são eventos independentes (multiplica-se)."
  },
  {
   "id": "flash-matematica-probabilidade-72",
   "frente": "O que muda ao calcular probabilidade de bolas de cores diferentes numa urna, com ou sem reposição?",
   "verso": "Com reposição, a proporção de cada cor se mantém a cada sorteio; sem reposição, a proporção muda a cada retirada."
  },
  {
   "id": "flash-matematica-probabilidade-73",
   "frente": "Como um diagrama de Venn resolve 'quantos leram só o livro A, só o B, ou os dois'?",
   "verso": "As áreas do diagrama representam cada grupo separadamente; o total de A é (só A) + (A e B)."
  },
  {
   "id": "flash-matematica-probabilidade-74",
   "frente": "Se todos os competidores de um torneio têm a mesma chance, qual a probabilidade de um vencer?",
   "verso": "1 dividido pelo número total de competidores, por simetria."
  },
  {
   "id": "flash-matematica-probabilidade-75",
   "frente": "Como calcular a chance de dois competidores específicos se enfrentarem num chaveamento?",
   "verso": "Depende da rodada em que o encontro é possível — eles precisam sobreviver até lá E cair do mesmo lado da chave."
  },
  {
   "id": "flash-matematica-probabilidade-76",
   "frente": "Quantas partidas tem um chaveamento eliminatório de 2ⁿ competidores?",
   "verso": "2ⁿ − 1: cada partida elimina exatamente um competidor, e só um sobra no fim."
  }
 ],
 "matematica-sequencias": [
  {
   "id": "flash-matematica-sequencias-01",
   "frente": "O que caracteriza uma progressão aritmética (PA)?",
   "verso": "Cada termo, a partir do segundo, é igual ao anterior somado a uma constante chamada razão (r). Ex.: 2, 5, 8, 11 tem r = 3."
  },
  {
   "id": "flash-matematica-sequencias-02",
   "frente": "Qual é a fórmula do termo geral de uma PA?",
   "verso": "aₙ = a₁ + (n − 1)·r, sendo a₁ o primeiro termo e r a razão."
  },
  {
   "id": "flash-matematica-sequencias-03",
   "frente": "Como saber se uma sequência é uma PA a partir de três termos dados?",
   "verso": "Se o termo do meio é a média aritmética dos vizinhos (a₂ = (a₁+a₃)/2), os três estão em PA."
  },
  {
   "id": "flash-matematica-sequencias-04",
   "frente": "Qual é a fórmula da soma dos n primeiros termos de uma PA?",
   "verso": "Sₙ = (a₁ + aₙ)·n / 2 — a média entre o primeiro e o último termo, multiplicada pela quantidade de termos."
  },
  {
   "id": "flash-matematica-sequencias-05",
   "frente": "Numa PA decrescente, o que se pode dizer da razão?",
   "verso": "A razão é negativa (r < 0); cada termo é menor que o anterior."
  },
  {
   "id": "flash-matematica-sequencias-06",
   "frente": "Como interpolar k meios aritméticos entre dois números a e b?",
   "verso": "Monte a PA de (k+2) termos com extremos a e b: a razão é r = (b − a)/(k + 1)."
  },
  {
   "id": "flash-matematica-sequencias-07",
   "frente": "Três números estão em PA e somam 30. Como escrevê-los sem usar a razão?",
   "verso": "Como (x − r), x, (x + r): a soma dá 3x = 30, então x = 10 — o termo do meio sai direto."
  },
  {
   "id": "flash-matematica-sequencias-08",
   "frente": "Se uma PA tem razão zero, o que ela é?",
   "verso": "Uma sequência constante — todos os termos são iguais."
  },
  {
   "id": "flash-matematica-sequencias-09",
   "frente": "Como calcular quantos termos há entre dois valores dados numa PA?",
   "verso": "Isole n na fórmula do termo geral: n = (aₙ − a₁)/r + 1."
  },
  {
   "id": "flash-matematica-sequencias-10",
   "frente": "Qual é o termo geral da PA dos números pares positivos (2, 4, 6, 8, ...)?",
   "verso": "aₙ = 2n — primeiro termo 2, razão 2."
  },
  {
   "id": "flash-matematica-sequencias-11",
   "frente": "Por que a fórmula da soma de uma PA lembra a área de um trapézio?",
   "verso": "Sₙ = (a₁+aₙ)·n/2 tem a mesma estrutura de (base maior + base menor)·altura/2 — é a mesma ideia geométrica."
  },
  {
   "id": "flash-matematica-sequencias-12",
   "frente": "O que significa dizer que a razão de uma PA é a inclinação da sequência?",
   "verso": "Os pontos (n, aₙ) de uma PA estão alinhados numa reta, e a razão r é o coeficiente angular dessa reta."
  },
  {
   "id": "flash-matematica-sequencias-13",
   "frente": "Como verificar rapidamente se uma tabela ano a ano é uma PA?",
   "verso": "Calcule as diferenças entre valores consecutivos; se todas forem iguais, é PA, e a diferença é a razão."
  },
  {
   "id": "flash-matematica-sequencias-14",
   "frente": "Numa PA de n termos, quanto vale a₁ + aₙ comparado a a₂ + aₙ₋₁?",
   "verso": "São iguais — termos equidistantes dos extremos sempre somam o mesmo valor."
  },
  {
   "id": "flash-matematica-sequencias-15",
   "frente": "Qual é o erro mais comum ao contar quantos termos uma PA tem entre dois valores?",
   "verso": "Esquecer de somar 1 no final — contar só a diferença de índices sem incluir o próprio primeiro termo."
  },
  {
   "id": "flash-matematica-sequencias-16",
   "frente": "Como reconhecer uma PA disfarçada num problema de aumento fixo (ex.: salário que sobe R$ 50 por mês)?",
   "verso": "O valor mensal forma uma PA de razão 50; o total em N meses é a soma dessa PA."
  },
  {
   "id": "flash-matematica-sequencias-17",
   "frente": "Se dobrarmos todos os termos de uma PA, o que acontece com a razão?",
   "verso": "A razão também dobra — multiplicar a PA por k multiplica a razão por k."
  },
  {
   "id": "flash-matematica-sequencias-18",
   "frente": "Como reconhecer que uma sequência de dados NÃO é uma PA?",
   "verso": "As diferenças entre termos consecutivos não são constantes — pelo menos uma delas destoa das outras."
  },
  {
   "id": "flash-matematica-sequencias-19",
   "frente": "O que caracteriza uma progressão geométrica (PG)?",
   "verso": "Cada termo, a partir do segundo, é igual ao anterior multiplicado por uma constante chamada razão (q). Ex.: 3, 6, 12, 24 tem q = 2."
  },
  {
   "id": "flash-matematica-sequencias-20",
   "frente": "Qual é a fórmula do termo geral de uma PG?",
   "verso": "aₙ = a₁ · qⁿ⁻¹."
  },
  {
   "id": "flash-matematica-sequencias-21",
   "frente": "Como saber se três termos estão em PG?",
   "verso": "Se o termo do meio ao quadrado é igual ao produto dos vizinhos (a₂² = a₁·a₃), os três estão em PG."
  },
  {
   "id": "flash-matematica-sequencias-22",
   "frente": "Qual é a fórmula da soma dos n primeiros termos de uma PG finita (q ≠ 1)?",
   "verso": "Sₙ = a₁·(qⁿ − 1)/(q − 1)."
  },
  {
   "id": "flash-matematica-sequencias-23",
   "frente": "O que acontece com a soma de uma PG infinita quando |q| < 1?",
   "verso": "Ela converge para um valor finito: S∞ = a₁/(1 − q)."
  },
  {
   "id": "flash-matematica-sequencias-24",
   "frente": "Por que uma PG infinita com q ≥ 1 não tem soma finita?",
   "verso": "Os termos não diminuem, então a soma cresce sem limite — diverge."
  },
  {
   "id": "flash-matematica-sequencias-25",
   "frente": "Como reconhecer PG num crescimento percentual constante (ex.: população que cresce 5% ao ano)?",
   "verso": "Cada termo é o anterior vezes (1 + taxa); é PG de razão q = 1 + taxa."
  },
  {
   "id": "flash-matematica-sequencias-26",
   "frente": "Se q é negativo, o que acontece com os sinais dos termos da PG?",
   "verso": "Os sinais alternam: positivo, negativo, positivo, negativo..."
  },
  {
   "id": "flash-matematica-sequencias-27",
   "frente": "Qual é a razão de uma PG cujo termo geral é aₙ = 5 · 3ⁿ?",
   "verso": "q = 3 — a base da potência."
  },
  {
   "id": "flash-matematica-sequencias-28",
   "frente": "O que diferencia uma PA de uma PG numa tabela de valores?",
   "verso": "Na PA a DIFERENÇA entre termos consecutivos é constante; na PG, a RAZÃO (divisão) entre eles é constante."
  },
  {
   "id": "flash-matematica-sequencias-29",
   "frente": "Como uma dízima periódica pode ser vista como soma de PG infinita?",
   "verso": "0,333... = 3/10 + 3/100 + 3/1000 + ... é uma PG de razão 1/10, cuja soma dá 1/3."
  },
  {
   "id": "flash-matematica-sequencias-30",
   "frente": "Numa PG de termos positivos, o que se pode dizer sobre termos equidistantes dos extremos?",
   "verso": "O produto de dois termos equidistantes dos extremos é sempre igual ao produto a₁·aₙ."
  },
  {
   "id": "flash-matematica-sequencias-31",
   "frente": "O que é meia-vida, em termos de PG?",
   "verso": "É o tempo para a quantidade cair pela metade; a quantidade ao longo do tempo forma uma PG de razão 1/2."
  },
  {
   "id": "flash-matematica-sequencias-32",
   "frente": "Qual é o erro clássico ao calcular a soma de uma PG?",
   "verso": "Trocar o sinal no denominador — usar (1 − q) quando deveria ser (q − 1), ou vice-versa."
  },
  {
   "id": "flash-matematica-sequencias-33",
   "frente": "Se todos os termos de uma PG forem multiplicados por uma constante k, o que acontece com a razão?",
   "verso": "A razão NÃO muda — q é uma razão entre termos, e o k se cancela."
  },
  {
   "id": "flash-matematica-sequencias-34",
   "frente": "O que é uma sequência definida por recorrência?",
   "verso": "Cada termo é calculado a partir do(s) termo(s) anterior(es) por uma regra, em vez de uma fórmula direta em n."
  },
  {
   "id": "flash-matematica-sequencias-35",
   "frente": "Como resolver, na prática, uma recorrência sem fórmula fechada óbvia?",
   "verso": "Calcule os primeiros 5-6 termos à mão e procure um padrão — periodicidade, paridade ou relação simples com n."
  },
  {
   "id": "flash-matematica-sequencias-36",
   "frente": "O que é uma recorrência linear de primeira ordem?",
   "verso": "aₙ₊₁ = aₙ + f(n) — cada termo depende só do termo imediatamente anterior."
  },
  {
   "id": "flash-matematica-sequencias-37",
   "frente": "Como a sequência de Fibonacci é definida por recorrência?",
   "verso": "aₙ = aₙ₋₁ + aₙ₋₂, com a₁ = a₂ = 1 — cada termo é a soma dos dois anteriores."
  },
  {
   "id": "flash-matematica-sequencias-38",
   "frente": "O que é um invariante numa recorrência?",
   "verso": "Uma quantidade (soma, paridade, resto) que NÃO muda a cada aplicação da regra, mesmo que os valores mudem."
  },
  {
   "id": "flash-matematica-sequencias-39",
   "frente": "Como usar um invariante para provar que um valor final é impossível?",
   "verso": "Mostre que o invariante do estado inicial difere do que o valor final exigiria — se não bate, é inatingível."
  },
  {
   "id": "flash-matematica-sequencias-40",
   "frente": "O que significa recorrência de segunda ordem?",
   "verso": "Cada termo depende dos DOIS termos anteriores (como Fibonacci), não só do último."
  },
  {
   "id": "flash-matematica-sequencias-41",
   "frente": "Como testar se uma sequência recursiva é periódica?",
   "verso": "Calcule termos até algum valor (ou par de valores) se repetir — a partir daí, o padrão se repete com esse período."
  },
  {
   "id": "flash-matematica-sequencias-42",
   "frente": "Se uma recorrência tem período 4, como achar o termo de ordem 97?",
   "verso": "Calcule 97 mod 4 (ajustando o índice inicial); o termo 97 é igual ao termo de mesmo resto no ciclo."
  },
  {
   "id": "flash-matematica-sequencias-43",
   "frente": "O que é a diferença finita de uma sequência aₙ?",
   "verso": "Δaₙ = aₙ₊₁ − aₙ — a sequência das diferenças entre termos consecutivos."
  },
  {
   "id": "flash-matematica-sequencias-44",
   "frente": "Se a sequência original é um polinômio de grau k em n, que grau tem a diferença finita?",
   "verso": "Grau k − 1: cada diferença finita abaixa o grau em um."
  },
  {
   "id": "flash-matematica-sequencias-45",
   "frente": "O que acontece ao aplicar a diferença finita duas vezes a um polinômio de grau 2?",
   "verso": "A sequência vira constante — igual a duas vezes o coeficiente líder do polinômio original."
  },
  {
   "id": "flash-matematica-sequencias-46",
   "frente": "Como reconhecer numa tabela que os dados vêm de uma função quadrática, só pelas diferenças?",
   "verso": "Se a primeira diferença não é constante, mas a SEGUNDA é, a função original é quadrática."
  },
  {
   "id": "flash-matematica-sequencias-47",
   "frente": "Como abordar 'prove que a soma X se conserva' numa recorrência?",
   "verso": "Calcule como a soma muda a cada passo; se a variação é sempre zero (ou par), a soma é invariante."
  },
  {
   "id": "flash-matematica-sequencias-48",
   "frente": "O que é uma recorrência de saldo (ganha ou perde uma unidade a cada passo)?",
   "verso": "O saldo após n passos depende só de quantos foram 'ganhos' contra 'perdidos', não da ordem em que aconteceram."
  },
  {
   "id": "flash-matematica-sequencias-49",
   "frente": "Como transformar 'quantas vitórias em N rodadas dão saldo S' numa equação?",
   "verso": "Se g é o número de vitórias, saldo = g − (N − g) = 2g − N; isole g."
  },
  {
   "id": "flash-matematica-sequencias-50",
   "frente": "Como decidir, numa prova, se vale procurar fórmula fechada ou calcular termo a termo?",
   "verso": "Se o índice pedido é pequeno (até uns 10-15), calcule direto; se é muito grande, procure período ou fórmula."
  },
  {
   "id": "flash-matematica-sequencias-51",
   "frente": "O que é o 'ponto fixo' de uma recorrência do tipo aₙ₊₁ = f(aₙ)?",
   "verso": "O valor L tal que f(L) = L; se a sequência converge, converge para esse ponto."
  },
  {
   "id": "flash-matematica-sequencias-52",
   "frente": "Qual é a soma dos n primeiros números ímpares (1+3+5+...)?",
   "verso": "n² — identidade clássica que costuma ser um atalho premiado."
  },
  {
   "id": "flash-matematica-sequencias-53",
   "frente": "Qual é a soma dos n primeiros números naturais (1+2+...+n)?",
   "verso": "n(n+1)/2 — é a soma de uma PA de razão 1."
  },
  {
   "id": "flash-matematica-sequencias-54",
   "frente": "O que é uma soma telescópica?",
   "verso": "Uma soma em que termos consecutivos se cancelam parcialmente, sobrando só o primeiro e o último termo auxiliar."
  },
  {
   "id": "flash-matematica-sequencias-55",
   "frente": "Como reconhecer que uma soma é telescópica?",
   "verso": "Cada termo pode ser escrito como uma diferença f(k) − f(k+1); ao somar, os termos do meio se cancelam."
  },
  {
   "id": "flash-matematica-sequencias-56",
   "frente": "Qual é a soma dos n primeiros quadrados perfeitos (1²+2²+...+n²)?",
   "verso": "n(n+1)(2n+1)/6."
  },
  {
   "id": "flash-matematica-sequencias-57",
   "frente": "Como confirmar a soma de uma PA 'de trás para frente'?",
   "verso": "Some o primeiro com o último, o segundo com o penúltimo, etc — cada par dá o mesmo total."
  },
  {
   "id": "flash-matematica-sequencias-58",
   "frente": "O que a identidade 1³+2³+...+n³ = [n(n+1)/2]² revela?",
   "verso": "A soma dos cubos é o QUADRADO da soma dos naturais — uma relação entre as duas somas."
  },
  {
   "id": "flash-matematica-sequencias-59",
   "frente": "Qual é o cuidado ao somar uma PA que não começa em 1 (ex.: soma de 10 a 50)?",
   "verso": "Calcule a soma de 1 a 50 e subtraia a soma de 1 a 9 — nunca aplique a fórmula direto nos limites."
  },
  {
   "id": "flash-matematica-sequencias-60",
   "frente": "Como usar a soma dos ímpares para simplificar um problema de contagem disfarçado?",
   "verso": "Se pede a soma de ímpares consecutivos a partir de 1, o resultado já é um quadrado perfeito automaticamente."
  },
  {
   "id": "flash-matematica-sequencias-61",
   "frente": "Como achar o algarismo das unidades de uma potência grande (ex.: 7^100)?",
   "verso": "Os algarismos das unidades de potências de 7 se repetem em ciclo de período 4 (7,9,3,1); calcule o resto de 100 por 4."
  },
  {
   "id": "flash-matematica-sequencias-62",
   "frente": "O que fazer quando o enunciado pede o termo de ordem 2026 de uma sequência periódica de período p?",
   "verso": "Calcule 2026 mod p (ajustando o índice inicial); o termo pedido é o de mesmo resto no ciclo."
  },
  {
   "id": "flash-matematica-sequencias-63",
   "frente": "Como confirmar que uma sequência é realmente periódica, e não só parece nos primeiros termos?",
   "verso": "Mostre que o termo (ou par de termos) que define a recorrência se repete — daí em diante, tudo se repete."
  },
  {
   "id": "flash-matematica-sequencias-64",
   "frente": "O que é 'pré-período' numa sequência?",
   "verso": "Um trecho inicial que não se repete, antes do padrão periódico começar — o resto só vale a partir do fim dele."
  },
  {
   "id": "flash-matematica-sequencias-65",
   "frente": "Como decidir a paridade do termo de ordem N numa sequência que alterna sinal?",
   "verso": "Depende de como a sequência começa: N par tem o sinal do segundo termo, N ímpar tem o do primeiro."
  },
  {
   "id": "flash-matematica-sequencias-66",
   "frente": "Qual é o erro mais comum ao usar resto da divisão para achar posição num ciclo?",
   "verso": "Esquecer de ajustar o índice quando a numeração começa em 1 (não em 0), senão o termo cai na posição vizinha."
  },
  {
   "id": "flash-matematica-sequencias-67",
   "frente": "Como o conceito de período ajuda em 'em que dia da semana cai o dia 1000 a partir de hoje'?",
   "verso": "Os dias da semana formam ciclo de período 7; o resto de 1000 por 7 dá quantos dias depois do ciclo cair o dia 1000."
  },
  {
   "id": "flash-matematica-sequencias-68",
   "frente": "O que fazer quando uma recorrência de segunda ordem não parece ter padrão periódico simples?",
   "verso": "Calcule o resto de cada termo por um número pequeno (2, 3, 5); os RESTOS quase sempre são periódicos mesmo quando a sequência inteira não é."
  },
  {
   "id": "flash-matematica-sequencias-69",
   "frente": "Como limitar 'calcule termos e procure o padrão' a um tempo razoável de prova?",
   "verso": "Calcule no máximo uns 8 a 10 termos; se nenhum padrão aparecer até lá, reconsidere a estratégia."
  },
  {
   "id": "flash-matematica-sequencias-70",
   "frente": "O que é uma sequência quase periódica (PA somada a um termo que oscila)?",
   "verso": "Um termo que cresce de forma regular somado a um termo que oscila em ciclo — o comportamento de longo prazo segue a parte que cresce."
  },
  {
   "id": "flash-matematica-sequencias-71",
   "frente": "Como confirmar, sem calcular todos os termos, que um valor nunca aparece numa sequência?",
   "verso": "Verifique se o valor é compatível com o invariante da sequência; se não for, é impossível ele aparecer."
  },
  {
   "id": "flash-matematica-sequencias-72",
   "frente": "Por que 'calcular casos pequenos' é uma estratégia geral em recorrência?",
   "verso": "Termos pequenos revelam o padrão sem exigir o cálculo do termo grande pedido — troca força bruta por reconhecimento de estrutura."
  },
  {
   "id": "flash-matematica-sequencias-73",
   "frente": "O que é a razão de uma PA cujo termo geral é aₙ = 3n + 2?",
   "verso": "r = 3 — o coeficiente que multiplica n no termo geral."
  },
  {
   "id": "flash-matematica-sequencias-74",
   "frente": "Como transformar 'cada figura tem 4 quadradinhos a mais que a anterior' numa PA?",
   "verso": "Reconheça: a quantidade de quadradinhos forma PA de razão 4; use o termo geral para achar a figura de ordem n."
  },
  {
   "id": "flash-matematica-sequencias-75",
   "frente": "Numa PG, o que muda se a razão for exatamente 1?",
   "verso": "A PG vira uma sequência constante — não há crescimento nem decrescimento entre os termos."
  },
  {
   "id": "flash-matematica-sequencias-76",
   "frente": "Como calcular o produto dos n primeiros termos de uma PG?",
   "verso": "Pₙ = (a₁ · aₙ)^(n/2) — a raiz quadrada de (a₁·aₙ) elevado a n, usando a igualdade de produtos equidistantes."
  },
  {
   "id": "flash-matematica-sequencias-77",
   "frente": "Qual é a diferença entre 'termo geral' e 'soma dos termos' numa sequência?",
   "verso": "O termo geral dá o VALOR de uma posição específica; a soma dá o TOTAL acumulado até uma posição."
  },
  {
   "id": "flash-matematica-sequencias-78",
   "frente": "Como decidir se um problema de sequência pede o termo geral ou a soma?",
   "verso": "Pergunte: quer o valor de UMA posição específica (termo geral) ou o TOTAL acumulado até ali (soma)?"
  }
 ],
 "matematica-logica-conjuntos": [
  {
   "id": "flash-matematica-logica-conjuntos-01",
   "frente": "O que é um conjunto, em termos matemáticos?",
   "verso": "Uma coleção bem definida de elementos, sem repetição e sem ordem importante entre eles."
  },
  {
   "id": "flash-matematica-logica-conjuntos-02",
   "frente": "O que significa A ⊂ B (A está contido em B)?",
   "verso": "Todo elemento de A também é elemento de B."
  },
  {
   "id": "flash-matematica-logica-conjuntos-03",
   "frente": "O que é a união de dois conjuntos, A ∪ B?",
   "verso": "O conjunto de todos os elementos que pertencem a A OU a B (ou a ambos)."
  },
  {
   "id": "flash-matematica-logica-conjuntos-04",
   "frente": "O que é a interseção de dois conjuntos, A ∩ B?",
   "verso": "O conjunto dos elementos que pertencem a A E a B ao mesmo tempo."
  },
  {
   "id": "flash-matematica-logica-conjuntos-05",
   "frente": "O que é a diferença entre conjuntos, A − B?",
   "verso": "Os elementos que pertencem a A mas não pertencem a B."
  },
  {
   "id": "flash-matematica-logica-conjuntos-06",
   "frente": "O que é o conjunto complementar de A, dentro de um universo U?",
   "verso": "Os elementos do universo que não pertencem a A; Aᶜ = U − A."
  },
  {
   "id": "flash-matematica-logica-conjuntos-07",
   "frente": "O que é a diferença simétrica entre A e B (A △ B)?",
   "verso": "Os elementos que pertencem a exatamente um dos dois conjuntos, mas não a ambos."
  },
  {
   "id": "flash-matematica-logica-conjuntos-08",
   "frente": "Qual é a fórmula do número de elementos da união de dois conjuntos?",
   "verso": "n(A∪B) = n(A) + n(B) − n(A∩B)."
  },
  {
   "id": "flash-matematica-logica-conjuntos-09",
   "frente": "Por que se subtrai n(A∩B) na fórmula da união?",
   "verso": "Porque os elementos da interseção foram contados duas vezes, uma em n(A) e outra em n(B)."
  },
  {
   "id": "flash-matematica-logica-conjuntos-10",
   "frente": "Qual é a fórmula do número de elementos da união de três conjuntos?",
   "verso": "n(A∪B∪C) = n(A)+n(B)+n(C) − n(A∩B) − n(A∩C) − n(B∩C) + n(A∩B∩C)."
  },
  {
   "id": "flash-matematica-logica-conjuntos-11",
   "frente": "Como interpretar um diagrama de Venn com três círculos sobrepostos?",
   "verso": "Cada região representa uma combinação diferente de pertencer ou não a cada conjunto; a região central é a interseção dos três."
  },
  {
   "id": "flash-matematica-logica-conjuntos-12",
   "frente": "Como resolver 'quantos elementos pertencem a exatamente um dos dois conjuntos'?",
   "verso": "n(A) + n(B) − 2·n(A∩B), que é o mesmo que n(A△B)."
  },
  {
   "id": "flash-matematica-logica-conjuntos-13",
   "frente": "Como resolver 'quantos elementos não pertencem a nenhum dos dois conjuntos', dado o total do universo?",
   "verso": "Total do universo menos n(A∪B)."
  },
  {
   "id": "flash-matematica-logica-conjuntos-14",
   "frente": "Num problema com 'assistem a ambos os programas', que região do diagrama de Venn isso indica?",
   "verso": "A região de interseção entre os dois conjuntos."
  },
  {
   "id": "flash-matematica-logica-conjuntos-15",
   "frente": "Num problema com 'não assistem a nenhum', que região do diagrama isso representa?",
   "verso": "A área fora dos dois círculos, dentro do universo total."
  },
  {
   "id": "flash-matematica-logica-conjuntos-16",
   "frente": "Como montar um diagrama de Venn de dois conjuntos a partir de dados de pesquisa?",
   "verso": "Preencha primeiro a interseção (quem tem as duas características), depois complete cada círculo subtraindo essa interseção do total de cada grupo."
  },
  {
   "id": "flash-matematica-logica-conjuntos-17",
   "frente": "O que é o conjunto das partes de um conjunto A?",
   "verso": "O conjunto de todos os subconjuntos possíveis de A, incluindo o vazio e o próprio A."
  },
  {
   "id": "flash-matematica-logica-conjuntos-18",
   "frente": "Quantos subconjuntos tem um conjunto com n elementos?",
   "verso": "2ⁿ."
  },
  {
   "id": "flash-matematica-logica-conjuntos-19",
   "frente": "O que é uma proposição, em lógica?",
   "verso": "Uma sentença declarativa que pode ser classificada como verdadeira ou falsa, mas não as duas ao mesmo tempo."
  },
  {
   "id": "flash-matematica-logica-conjuntos-20",
   "frente": "O que é o valor lógico de uma proposição?",
   "verso": "Verdadeiro (V) ou Falso (F) — nunca os dois, nunca nenhum."
  },
  {
   "id": "flash-matematica-logica-conjuntos-21",
   "frente": "O que é uma proposição composta?",
   "verso": "Uma proposição formada pela combinação de duas ou mais proposições simples, ligadas por conectivos."
  },
  {
   "id": "flash-matematica-logica-conjuntos-22",
   "frente": "O que é o conectivo de conjunção (E, ∧)?",
   "verso": "p∧q é verdadeira somente quando p E q são ambas verdadeiras."
  },
  {
   "id": "flash-matematica-logica-conjuntos-23",
   "frente": "O que é o conectivo de disjunção (OU, ∨)?",
   "verso": "p∨q é verdadeira quando pelo menos uma das duas, p OU q, é verdadeira."
  },
  {
   "id": "flash-matematica-logica-conjuntos-24",
   "frente": "O que é a disjunção exclusiva (OU exclusivo)?",
   "verso": "É verdadeira quando exatamente uma das duas proposições é verdadeira, mas não as duas."
  },
  {
   "id": "flash-matematica-logica-conjuntos-25",
   "frente": "O que é a negação de uma proposição (¬p)?",
   "verso": "Inverte o valor lógico: se p é verdadeira, ¬p é falsa, e vice-versa."
  },
  {
   "id": "flash-matematica-logica-conjuntos-26",
   "frente": "O que é o condicional 'se p, então q' (p → q)?",
   "verso": "É falso somente quando p é verdadeira e q é falsa; em todos os outros casos, é verdadeiro."
  },
  {
   "id": "flash-matematica-logica-conjuntos-27",
   "frente": "Por que 'se p, então q' é verdadeiro quando p é falsa, independente de q?",
   "verso": "Por convenção lógica: uma condição nunca testada não pode ser contradita, então o condicional 'passa' como verdadeiro."
  },
  {
   "id": "flash-matematica-logica-conjuntos-28",
   "frente": "O que é o bicondicional 'p se, e somente se, q' (p ↔ q)?",
   "verso": "É verdadeiro quando p e q têm o mesmo valor lógico — ambas verdadeiras ou ambas falsas."
  },
  {
   "id": "flash-matematica-logica-conjuntos-29",
   "frente": "O que é uma tabela-verdade?",
   "verso": "Uma tabela que lista todos os valores lógicos possíveis das proposições simples e o valor resultante da proposição composta."
  },
  {
   "id": "flash-matematica-logica-conjuntos-30",
   "frente": "Quantas linhas tem a tabela-verdade de uma proposição composta com n proposições simples?",
   "verso": "2ⁿ linhas."
  },
  {
   "id": "flash-matematica-logica-conjuntos-31",
   "frente": "O que é uma tautologia?",
   "verso": "Uma proposição composta que é sempre verdadeira, para qualquer valor lógico das proposições simples."
  },
  {
   "id": "flash-matematica-logica-conjuntos-32",
   "frente": "O que é uma contradição, em lógica?",
   "verso": "Uma proposição composta que é sempre falsa, para qualquer valor lógico das proposições simples."
  },
  {
   "id": "flash-matematica-logica-conjuntos-33",
   "frente": "Como negar a proposição 'p e q' (¬(p∧q))?",
   "verso": "¬p ou ¬q — nega-se cada uma e troca-se 'e' por 'ou' (Lei de De Morgan)."
  },
  {
   "id": "flash-matematica-logica-conjuntos-34",
   "frente": "Como negar a proposição 'p ou q' (¬(p∨q))?",
   "verso": "¬p e ¬q — nega-se cada uma e troca-se 'ou' por 'e' (Lei de De Morgan)."
  },
  {
   "id": "flash-matematica-logica-conjuntos-35",
   "frente": "Como negar o condicional 'se p, então q'?",
   "verso": "'p e não q' — a condição continua verdadeira, mas a consequência falha."
  },
  {
   "id": "flash-matematica-logica-conjuntos-36",
   "frente": "O que é a recíproca de 'se p, então q'?",
   "verso": "'Se q, então p' — inverte a ordem das proposições."
  },
  {
   "id": "flash-matematica-logica-conjuntos-37",
   "frente": "O que é a contrapositiva de 'se p, então q'?",
   "verso": "'Se não q, então não p' — nega e inverte; é logicamente equivalente ao condicional original."
  },
  {
   "id": "flash-matematica-logica-conjuntos-38",
   "frente": "Por que a contrapositiva tem o mesmo valor lógico que o condicional original, mas a recíproca não?",
   "verso": "A contrapositiva é uma reformulação logicamente equivalente; a recíproca é uma afirmação diferente, que pode ter valor lógico distinto."
  },
  {
   "id": "flash-matematica-logica-conjuntos-39",
   "frente": "O que significa p ser condição suficiente para q?",
   "verso": "Se p ocorre, garante-se que q ocorre — equivale a p → q."
  },
  {
   "id": "flash-matematica-logica-conjuntos-40",
   "frente": "O que significa p ser condição necessária para q?",
   "verso": "q só pode ocorrer se p também ocorrer — equivale a q → p."
  },
  {
   "id": "flash-matematica-logica-conjuntos-41",
   "frente": "Quando p é condição necessária e suficiente para q?",
   "verso": "Quando p ↔ q — as duas se implicam mutuamente."
  },
  {
   "id": "flash-matematica-logica-conjuntos-42",
   "frente": "O que é um quantificador universal (∀)?",
   "verso": "Indica 'para todo' ou 'qualquer que seja' — a afirmação vale para todos os elementos do conjunto considerado."
  },
  {
   "id": "flash-matematica-logica-conjuntos-43",
   "frente": "O que é um quantificador existencial (∃)?",
   "verso": "Indica 'existe pelo menos um' — a afirmação vale para ao menos um elemento do conjunto."
  },
  {
   "id": "flash-matematica-logica-conjuntos-44",
   "frente": "Como negar 'para todo x, P(x)'?",
   "verso": "'Existe pelo menos um x tal que não P(x)' — troca-se ∀ por ∃ e nega-se a propriedade."
  },
  {
   "id": "flash-matematica-logica-conjuntos-45",
   "frente": "Como negar 'existe x tal que P(x)'?",
   "verso": "'Para todo x, não P(x)' — troca-se ∃ por ∀ e nega-se a propriedade."
  },
  {
   "id": "flash-matematica-logica-conjuntos-46",
   "frente": "Por que basta um contraexemplo para provar falsa uma afirmação com 'para todo'?",
   "verso": "Porque 'para todo' exige validade em todos os casos; um único caso que falha já invalida a afirmação inteira."
  },
  {
   "id": "flash-matematica-logica-conjuntos-47",
   "frente": "O que é um argumento, em lógica?",
   "verso": "Um conjunto de proposições (premissas) das quais se pretende derivar uma conclusão."
  },
  {
   "id": "flash-matematica-logica-conjuntos-48",
   "frente": "Quando um argumento é considerado válido?",
   "verso": "Quando a conclusão é necessariamente verdadeira sempre que todas as premissas são verdadeiras."
  },
  {
   "id": "flash-matematica-logica-conjuntos-49",
   "frente": "O que é um silogismo?",
   "verso": "Um argumento lógico com duas premissas e uma conclusão, estruturado de forma que a conclusão decorre logicamente delas."
  },
  {
   "id": "flash-matematica-logica-conjuntos-50",
   "frente": "Um argumento pode ter premissas falsas e ainda ser válido?",
   "verso": "Sim — validade é sobre a estrutura lógica, não sobre a veracidade real das premissas."
  },
  {
   "id": "flash-matematica-logica-conjuntos-51",
   "frente": "Como testar a validade de um argumento usando tabela-verdade?",
   "verso": "Verifique se em toda linha em que todas as premissas são verdadeiras, a conclusão também é verdadeira."
  },
  {
   "id": "flash-matematica-logica-conjuntos-52",
   "frente": "O que é uma falácia lógica?",
   "verso": "Um argumento que parece válido mas na verdade não é — a conclusão não decorre necessariamente das premissas."
  },
  {
   "id": "flash-matematica-logica-conjuntos-53",
   "frente": "Como usar a contrapositiva para resolver um problema de lógica?",
   "verso": "Reescreva a condicional na forma contrapositiva quando ela for mais fácil de verificar ou negar diretamente."
  },
  {
   "id": "flash-matematica-logica-conjuntos-54",
   "frente": "Como resolver um problema de 'quem fala a verdade e quem mente' usando lógica proposicional?",
   "verso": "Traduza cada afirmação em uma proposição condicional ou bicondicional, e teste as combinações de V/F que não geram contradição."
  },
  {
   "id": "flash-matematica-logica-conjuntos-55",
   "frente": "Como interpretar 'nenhum A é B' em termos de conjuntos?",
   "verso": "A ∩ B = ∅ — os dois conjuntos não têm elementos em comum."
  },
  {
   "id": "flash-matematica-logica-conjuntos-56",
   "frente": "Como interpretar 'todo A é B' em termos de conjuntos?",
   "verso": "A ⊂ B — o conjunto A está contido no conjunto B."
  },
  {
   "id": "flash-matematica-logica-conjuntos-57",
   "frente": "Como interpretar 'algum A é B' em termos de conjuntos?",
   "verso": "A ∩ B ≠ ∅ — existe pelo menos um elemento comum aos dois conjuntos."
  },
  {
   "id": "flash-matematica-logica-conjuntos-58",
   "frente": "O que representa o conjunto vazio (∅)?",
   "verso": "O conjunto que não possui nenhum elemento; está contido em qualquer conjunto."
  },
  {
   "id": "flash-matematica-logica-conjuntos-59",
   "frente": "Como calcular n(A) sabendo n(A∪B), n(B) e n(A∩B)?",
   "verso": "n(A) = n(A∪B) − n(B) + n(A∩B)."
  },
  {
   "id": "flash-matematica-logica-conjuntos-60",
   "frente": "Como resolver 'apenas um dos dois cursos, não ambos' num problema de conjuntos?",
   "verso": "Calcule n(A)+n(B)−2·n(A∩B), somando quem está só em A e só em B."
  },
  {
   "id": "flash-matematica-logica-conjuntos-61",
   "frente": "Como um problema de 'clientes que compram apenas X, apenas Y, ou nenhum' se resolve com Venn de dois círculos?",
   "verso": "Preencha a interseção primeiro, depois 'só X' e 'só Y' subtraindo a interseção, e o restante do universo é 'nenhum'."
  },
  {
   "id": "flash-matematica-logica-conjuntos-62",
   "frente": "Qual é a diferença entre 'e' (∧) e 'ou' inclusivo (∨) na lógica formal?",
   "verso": "'E' exige que as duas condições sejam verdadeiras juntas; 'ou' inclusivo aceita uma, a outra, ou as duas."
  },
  {
   "id": "flash-matematica-logica-conjuntos-63",
   "frente": "Por que 'se chove, a rua molha; a rua está molhada; logo, choveu' não é um argumento válido?",
   "verso": "É a falácia de afirmar o consequente — a rua pode estar molhada por outro motivo, além da chuva."
  },
  {
   "id": "flash-matematica-logica-conjuntos-64",
   "frente": "Qual é a forma válida de argumento conhecida como Modus Ponens?",
   "verso": "De 'se p, então q' e 'p é verdadeira', conclui-se que 'q é verdadeira'."
  },
  {
   "id": "flash-matematica-logica-conjuntos-65",
   "frente": "Como decidir se uma proposição é simples ou composta?",
   "verso": "É composta se contiver conectivos (e, ou, se-então, se e somente se) ligando outras proposições; senão, é simples."
  },
  {
   "id": "flash-matematica-logica-conjuntos-66",
   "frente": "Por que 'diagrama de Venn' e 'inclusão-exclusão' resolvem o mesmo tipo de problema?",
   "verso": "O diagrama é a representação visual; a fórmula de inclusão-exclusão é o cálculo algébrico do que o diagrama mostra."
  }
 ],
 "matematica-complexos": [
  {
   "id": "flash-matematica-complexos-01",
   "frente": "O que é um número complexo, na forma algébrica?",
   "verso": "z = a + bi, com a e b reais; a é a parte real e b a parte imaginária."
  },
  {
   "id": "flash-matematica-complexos-02",
   "frente": "O que é a unidade imaginária i?",
   "verso": "É definida por i² = −1 (ou i = √−1)."
  },
  {
   "id": "flash-matematica-complexos-03",
   "frente": "Como calcular i², i³ e i⁴?",
   "verso": "i² = −1, i³ = −i, i⁴ = 1 — as potências de i se repetem em ciclo de período 4."
  },
  {
   "id": "flash-matematica-complexos-04",
   "frente": "Como calcular iⁿ para n grande?",
   "verso": "Calcule o resto de n por 4 e use esse resto no ciclo i⁰=1, i¹=i, i²=−1, i³=−i."
  },
  {
   "id": "flash-matematica-complexos-05",
   "frente": "O que é a parte real de z = a + bi?",
   "verso": "Re(z) = a — o número que não multiplica i."
  },
  {
   "id": "flash-matematica-complexos-06",
   "frente": "O que é a parte imaginária de z = a + bi?",
   "verso": "Im(z) = b — o coeficiente que multiplica i (não o termo bi inteiro)."
  },
  {
   "id": "flash-matematica-complexos-07",
   "frente": "Quando dois números complexos são iguais?",
   "verso": "Quando têm a mesma parte real e a mesma parte imaginária."
  },
  {
   "id": "flash-matematica-complexos-08",
   "frente": "Como se somam dois números complexos?",
   "verso": "Somam-se as partes reais entre si e as partes imaginárias entre si: (a+bi)+(c+di) = (a+c)+(b+d)i."
  },
  {
   "id": "flash-matematica-complexos-09",
   "frente": "Como se multiplicam dois números complexos?",
   "verso": "Distribui-se como binômios, usando i²=−1 para simplificar: (a+bi)(c+di) = (ac−bd)+(ad+bc)i."
  },
  {
   "id": "flash-matematica-complexos-10",
   "frente": "O que é o conjugado de z = a + bi?",
   "verso": "z̄ = a − bi — mesma parte real, parte imaginária com sinal trocado."
  },
  {
   "id": "flash-matematica-complexos-11",
   "frente": "Por que o produto de z pelo seu conjugado é sempre real?",
   "verso": "z·z̄ = a² + b² — os termos com i se cancelam na distributiva."
  },
  {
   "id": "flash-matematica-complexos-12",
   "frente": "Como dividir dois números complexos?",
   "verso": "Multiplique numerador e denominador pelo conjugado do denominador, transformando-o num número real."
  },
  {
   "id": "flash-matematica-complexos-13",
   "frente": "O que é o módulo de um número complexo z = a + bi?",
   "verso": "|z| = √(a²+b²) — a distância de z até a origem no plano de Argand-Gauss."
  },
  {
   "id": "flash-matematica-complexos-14",
   "frente": "O que é o plano de Argand-Gauss?",
   "verso": "Um plano cartesiano em que o eixo horizontal é a parte real e o vertical é a parte imaginária."
  },
  {
   "id": "flash-matematica-complexos-15",
   "frente": "Como se representa graficamente z = a + bi no plano de Argand-Gauss?",
   "verso": "Como o ponto (a,b), ou o vetor da origem até esse ponto."
  },
  {
   "id": "flash-matematica-complexos-16",
   "frente": "O que é o argumento de um número complexo?",
   "verso": "O ângulo θ que o vetor de z forma com o eixo real positivo."
  },
  {
   "id": "flash-matematica-complexos-17",
   "frente": "Como calcular o argumento de z = a + bi?",
   "verso": "tan θ = b/a, ajustando o quadrante pelos sinais de a e b."
  },
  {
   "id": "flash-matematica-complexos-18",
   "frente": "Qual é a forma trigonométrica (polar) de um número complexo?",
   "verso": "z = |z|·(cos θ + i·sen θ)."
  },
  {
   "id": "flash-matematica-complexos-19",
   "frente": "Como converter da forma algébrica para a trigonométrica?",
   "verso": "Calcule o módulo |z| e o argumento θ, e escreva z = |z|(cos θ + i sen θ)."
  },
  {
   "id": "flash-matematica-complexos-20",
   "frente": "Como converter da forma trigonométrica para a algébrica?",
   "verso": "a = |z|cos θ e b = |z|sen θ."
  },
  {
   "id": "flash-matematica-complexos-21",
   "frente": "Qual é a vantagem da forma trigonométrica para multiplicar complexos?",
   "verso": "Os módulos se multiplicam e os argumentos se somam — mais simples que distribuir na forma algébrica."
  },
  {
   "id": "flash-matematica-complexos-22",
   "frente": "Como multiplicar dois complexos na forma trigonométrica?",
   "verso": "|z1|·|z2| · [cos(θ1+θ2) + i·sen(θ1+θ2)]."
  },
  {
   "id": "flash-matematica-complexos-23",
   "frente": "Como dividir dois complexos na forma trigonométrica?",
   "verso": "|z1|/|z2| · [cos(θ1−θ2) + i·sen(θ1−θ2)]."
  },
  {
   "id": "flash-matematica-complexos-24",
   "frente": "O que diz a Primeira Fórmula de De Moivre (potenciação)?",
   "verso": "zⁿ = |z|ⁿ·[cos(nθ) + i·sen(nθ)]."
  },
  {
   "id": "flash-matematica-complexos-25",
   "frente": "Como usar De Moivre para calcular z¹⁰ rapidamente?",
   "verso": "Eleve o módulo à décima potência e multiplique o argumento por 10, sem expandir o binômio dez vezes."
  },
  {
   "id": "flash-matematica-complexos-26",
   "frente": "O que diz a Segunda Fórmula de De Moivre (radiciação)?",
   "verso": "As n raízes n-ésimas de z têm módulo |z|^(1/n) e argumentos (θ+2kπ)/n, para k=0,1,...,n−1."
  },
  {
   "id": "flash-matematica-complexos-27",
   "frente": "Quantas raízes n-ésimas um número complexo não nulo possui?",
   "verso": "Exatamente n raízes distintas."
  },
  {
   "id": "flash-matematica-complexos-28",
   "frente": "Como as raízes n-ésimas de um número complexo se distribuem no plano de Argand-Gauss?",
   "verso": "Formam os vértices de um polígono regular de n lados, inscrito numa circunferência de raio |z|^(1/n)."
  },
  {
   "id": "flash-matematica-complexos-29",
   "frente": "O que multiplicar um número complexo por i faz geometricamente?",
   "verso": "Rotaciona o vetor 90° no sentido anti-horário, sem mudar o módulo."
  },
  {
   "id": "flash-matematica-complexos-30",
   "frente": "O que multiplicar um número complexo por −1 faz geometricamente?",
   "verso": "Rotaciona o vetor 180° (reflexão pela origem)."
  },
  {
   "id": "flash-matematica-complexos-31",
   "frente": "Como interpretar |z1 − z2| geometricamente?",
   "verso": "É a distância entre os pontos que representam z1 e z2 no plano de Argand-Gauss."
  },
  {
   "id": "flash-matematica-complexos-32",
   "frente": "O que representa a equação |z| = r no plano de Argand-Gauss?",
   "verso": "Uma circunferência de raio r centrada na origem."
  },
  {
   "id": "flash-matematica-complexos-33",
   "frente": "Por que uma equação do 2º grau com Δ<0 tem raízes complexas?",
   "verso": "A fórmula de Bhaskara exige √Δ; com Δ negativo, essa raiz vira um múltiplo de i."
  },
  {
   "id": "flash-matematica-complexos-34",
   "frente": "Como escrever as raízes de uma equação do 2º grau com Δ<0?",
   "verso": "x = (−b ± i√|Δ|) / 2a."
  },
  {
   "id": "flash-matematica-complexos-35",
   "frente": "Se um polinômio de coeficientes reais tem raiz complexa a+bi, que outra raiz ele necessariamente tem?",
   "verso": "O conjugado a−bi — raízes complexas de polinômios reais vêm sempre em pares conjugados."
  },
  {
   "id": "flash-matematica-complexos-36",
   "frente": "Qual é o módulo de i?",
   "verso": "|i| = 1 — i está sobre a circunferência de raio 1."
  },
  {
   "id": "flash-matematica-complexos-37",
   "frente": "Qual é o argumento de i?",
   "verso": "90° (ou π/2 radianos)."
  },
  {
   "id": "flash-matematica-complexos-38",
   "frente": "Qual é a forma trigonométrica de i?",
   "verso": "cos 90° + i·sen 90°."
  },
  {
   "id": "flash-matematica-complexos-39",
   "frente": "Qual é o módulo de um número real puro, como z=5?",
   "verso": "|z| = 5 — coincide com o valor absoluto usual."
  },
  {
   "id": "flash-matematica-complexos-40",
   "frente": "O que caracteriza um número imaginário puro?",
   "verso": "Tem parte real nula (a=0); é da forma bi."
  },
  {
   "id": "flash-matematica-complexos-41",
   "frente": "Qual é o argumento de um número real negativo, como z=−3?",
   "verso": "180°."
  },
  {
   "id": "flash-matematica-complexos-42",
   "frente": "Como simplificar 1/i?",
   "verso": "Multiplique numerador e denominador por i: 1/i = i/i² = i/(−1) = −i."
  },
  {
   "id": "flash-matematica-complexos-43",
   "frente": "Qual é o inverso multiplicativo de z = a + bi?",
   "verso": "z⁻¹ = z̄/|z|² = (a−bi)/(a²+b²)."
  },
  {
   "id": "flash-matematica-complexos-44",
   "frente": "Como reconhecer geometricamente que dois complexos são conjugados?",
   "verso": "São simétricos em relação ao eixo real (mesma parte real, partes imaginárias opostas)."
  },
  {
   "id": "flash-matematica-complexos-45",
   "frente": "Como calcular |z1 · z2| a partir de |z1| e |z2|?",
   "verso": "|z1·z2| = |z1|·|z2| — o módulo do produto é o produto dos módulos."
  },
  {
   "id": "flash-matematica-complexos-46",
   "frente": "Como calcular o argumento de z1·z2 a partir dos argumentos de z1 e z2?",
   "verso": "arg(z1·z2) = arg(z1) + arg(z2)."
  },
  {
   "id": "flash-matematica-complexos-47",
   "frente": "O que acontece com o argumento de z ao calcular seu conjugado?",
   "verso": "O argumento muda de sinal: arg(z̄) = −arg(z)."
  },
  {
   "id": "flash-matematica-complexos-48",
   "frente": "Como fatorar a soma de dois quadrados, a² + b², usando complexos?",
   "verso": "a² + b² = (a+bi)(a−bi)."
  },
  {
   "id": "flash-matematica-complexos-49",
   "frente": "Como resolver uma equação do tipo z² = número negativo?",
   "verso": "Isole z e tire a raiz quadrada usando i: se z² = −k, então z = ±i√k."
  },
  {
   "id": "flash-matematica-complexos-50",
   "frente": "O que significa 'raiz quadrada de −1' em termos de i?",
   "verso": "É exatamente a definição de i: i = √−1."
  },
  {
   "id": "flash-matematica-complexos-51",
   "frente": "Como simplificar potências negativas de i, como i⁻¹?",
   "verso": "i⁻¹ = 1/i = −i, pelo mesmo processo de racionalizar por i."
  },
  {
   "id": "flash-matematica-complexos-52",
   "frente": "Qual é o módulo do produto i·(a+bi)?",
   "verso": "O mesmo módulo de a+bi, pois multiplicar por i (módulo 1) só rotaciona, não altera o tamanho."
  },
  {
   "id": "flash-matematica-complexos-53",
   "frente": "Como De Moivre garante que (cos θ + i sen θ)ⁿ = cos(nθ) + i sen(nθ)?",
   "verso": "É a própria fórmula, aplicada a um número complexo de módulo 1 (sobre a circunferência unitária)."
  },
  {
   "id": "flash-matematica-complexos-54",
   "frente": "O que caracteriza as duas raízes quadradas de um número complexo z, geometricamente?",
   "verso": "São dois pontos diametralmente opostos numa circunferência de raio √|z|, com argumentos que diferem 180°."
  },
  {
   "id": "flash-matematica-complexos-55",
   "frente": "Como calcular as duas raízes quadradas de z a partir da forma trigonométrica?",
   "verso": "√|z|·[cos(θ/2)+i sen(θ/2)] e √|z|·[cos(θ/2+180°)+i sen(θ/2+180°)]."
  },
  {
   "id": "flash-matematica-complexos-56",
   "frente": "Por que a soma das n raízes n-ésimas de um número complexo (n≥2) é sempre zero?",
   "verso": "Elas formam um polígono regular centrado na origem, e a soma vetorial de vértices igualmente espaçados se anula."
  },
  {
   "id": "flash-matematica-complexos-57",
   "frente": "Como interpretar geometricamente a adição de dois números complexos?",
   "verso": "Como a soma vetorial (regra do paralelogramo) dos pontos que os representam."
  },
  {
   "id": "flash-matematica-complexos-58",
   "frente": "Como interpretar geometricamente a subtração z1 − z2?",
   "verso": "Como o vetor que vai do ponto z2 até o ponto z1."
  },
  {
   "id": "flash-matematica-complexos-59",
   "frente": "O que é o argumento principal de um número complexo?",
   "verso": "O argumento escolhido dentro de um intervalo de uma volta, como [0°,360°) — qualquer outro argumento equivalente difere por múltiplos de 360°."
  },
  {
   "id": "flash-matematica-complexos-60",
   "frente": "Como reconhecer numa questão que ela pede número complexo, mesmo sem citar a palavra?",
   "verso": "Presença de i em operações de soma/produto, notação z = a + bi, ou variáveis como z₁, z₂."
  },
  {
   "id": "flash-matematica-complexos-61",
   "frente": "Qual é o módulo de z = 3 + 4i?",
   "verso": "|z| = √(3²+4²) = √25 = 5."
  },
  {
   "id": "flash-matematica-complexos-62",
   "frente": "Como calcular z² diretamente na forma algébrica, sem passar pela trigonométrica?",
   "verso": "Expanda (a+bi)² = a² − b² + 2abi, usando i²=−1."
  },
  {
   "id": "flash-matematica-complexos-63",
   "frente": "Por que multiplicar dois números complexos não é uma operação componente a componente, como a soma?",
   "verso": "Porque a multiplicação envolve termos cruzados (distributiva completa entre as duas partes), diferente da soma, que é direta."
  },
  {
   "id": "flash-matematica-complexos-64",
   "frente": "Como usar a forma trigonométrica para resolver zⁿ = w (equação binomial)?",
   "verso": "Escreva w na forma trigonométrica e aplique a Segunda Fórmula de De Moivre para achar as n raízes."
  },
  {
   "id": "flash-matematica-complexos-65",
   "frente": "Como o módulo de z se relaciona com z·z̄?",
   "verso": "z·z̄ = |z|² — multiplicar pelo conjugado sempre dá o quadrado do módulo, um número real."
  }
 ],
 "matematica-polinomios": [
  {
   "id": "flash-matematica-polinomios-01",
   "frente": "O que é um polinômio?",
   "verso": "Uma expressão da forma aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀, com coeficientes aᵢ e expoentes inteiros não negativos."
  },
  {
   "id": "flash-matematica-polinomios-02",
   "frente": "O que é o grau de um polinômio?",
   "verso": "O maior expoente de x com coeficiente não nulo."
  },
  {
   "id": "flash-matematica-polinomios-03",
   "frente": "O que é o coeficiente líder de um polinômio?",
   "verso": "O coeficiente do termo de maior grau."
  },
  {
   "id": "flash-matematica-polinomios-04",
   "frente": "O que é um polinômio mônico?",
   "verso": "Aquele cujo coeficiente líder é igual a 1."
  },
  {
   "id": "flash-matematica-polinomios-05",
   "frente": "O que significa um polinômio ser identicamente nulo?",
   "verso": "Todos os seus coeficientes são zero — P(x)=0 para todo x."
  },
  {
   "id": "flash-matematica-polinomios-06",
   "frente": "Quando dois polinômios são idênticos?",
   "verso": "Quando têm o mesmo grau e coeficientes correspondentes iguais, termo a termo."
  },
  {
   "id": "flash-matematica-polinomios-07",
   "frente": "O que é o valor numérico de um polinômio P(x) em x=a?",
   "verso": "P(a) — o resultado de substituir x por a na expressão."
  },
  {
   "id": "flash-matematica-polinomios-08",
   "frente": "O que diz o Teorema do Resto?",
   "verso": "O resto da divisão de P(x) por (x−a) é igual a P(a)."
  },
  {
   "id": "flash-matematica-polinomios-09",
   "frente": "Como usar o Teorema do Resto sem fazer a divisão completa?",
   "verso": "Calcule P(a) diretamente — esse valor já é o resto."
  },
  {
   "id": "flash-matematica-polinomios-10",
   "frente": "O que diz o Teorema de D'Alembert?",
   "verso": "P(x) é divisível por (x−a) se, e somente se, P(a) = 0."
  },
  {
   "id": "flash-matematica-polinomios-11",
   "frente": "O que significa 'a é raiz de P(x)'?",
   "verso": "P(a) = 0 — substituir a na expressão anula o polinômio."
  },
  {
   "id": "flash-matematica-polinomios-12",
   "frente": "Como o Teorema de D'Alembert relaciona raízes e fatores de um polinômio?",
   "verso": "Toda raiz a de P(x) corresponde a um fator (x−a) na fatoração de P(x)."
  },
  {
   "id": "flash-matematica-polinomios-13",
   "frente": "Quantas raízes (contando multiplicidade) tem um polinômio de grau n, pelo Teorema Fundamental da Álgebra?",
   "verso": "Exatamente n raízes complexas."
  },
  {
   "id": "flash-matematica-polinomios-14",
   "frente": "O que é a multiplicidade de uma raiz?",
   "verso": "O número de vezes que o fator (x−a) aparece na fatoração de P(x)."
  },
  {
   "id": "flash-matematica-polinomios-15",
   "frente": "Como o gráfico de P(x) se comporta numa raiz simples (multiplicidade 1)?",
   "verso": "A curva cruza o eixo x, mudando de sinal."
  },
  {
   "id": "flash-matematica-polinomios-16",
   "frente": "Como o gráfico de P(x) se comporta numa raiz de multiplicidade par?",
   "verso": "A curva toca o eixo x e volta, sem mudar de sinal."
  },
  {
   "id": "flash-matematica-polinomios-17",
   "frente": "Como o gráfico de P(x) se comporta numa raiz de multiplicidade ímpar maior que 1 (ex.: 3)?",
   "verso": "A curva cruza o eixo x, mas com um achatamento (inflexão) perto da raiz."
  },
  {
   "id": "flash-matematica-polinomios-18",
   "frente": "Como dividir um polinômio por outro usando o método da chave (divisão longa)?",
   "verso": "Divida os termos de maior grau, multiplique e subtraia, repetindo até o resto ter grau menor que o divisor."
  },
  {
   "id": "flash-matematica-polinomios-19",
   "frente": "O que é o dispositivo de Briot-Ruffini, e quando se aplica?",
   "verso": "Um método simplificado para dividir P(x) por (x−a); só serve para divisor do 1º grau da forma (x−a)."
  },
  {
   "id": "flash-matematica-polinomios-20",
   "frente": "Como funciona o dispositivo de Briot-Ruffini, passo a passo?",
   "verso": "Repita o primeiro coeficiente, multiplique cada resultado por a e some ao próximo coeficiente; o último valor é o resto."
  },
  {
   "id": "flash-matematica-polinomios-21",
   "frente": "Na divisão de polinômios, como se relacionam dividendo, divisor, quociente e resto?",
   "verso": "Dividendo = divisor × quociente + resto, com grau do resto menor que o grau do divisor."
  },
  {
   "id": "flash-matematica-polinomios-22",
   "frente": "Qual é o grau do quociente de uma divisão de polinômios?",
   "verso": "Grau do dividendo menos grau do divisor."
  },
  {
   "id": "flash-matematica-polinomios-23",
   "frente": "O que são as Relações de Girard?",
   "verso": "Fórmulas que relacionam a soma e o produto das raízes de um polinômio aos seus coeficientes, sem precisar calcular as raízes."
  },
  {
   "id": "flash-matematica-polinomios-24",
   "frente": "Qual é a soma das raízes de um polinômio de 2º grau ax²+bx+c?",
   "verso": "−b/a."
  },
  {
   "id": "flash-matematica-polinomios-25",
   "frente": "Qual é o produto das raízes de um polinômio de 2º grau ax²+bx+c?",
   "verso": "c/a."
  },
  {
   "id": "flash-matematica-polinomios-26",
   "frente": "Qual é a soma das raízes de um polinômio de grau n, aₙxⁿ+...+a₀?",
   "verso": "−aₙ₋₁/aₙ."
  },
  {
   "id": "flash-matematica-polinomios-27",
   "frente": "Qual é o produto das raízes de um polinômio de grau n?",
   "verso": "(−1)ⁿ · a₀/aₙ."
  },
  {
   "id": "flash-matematica-polinomios-28",
   "frente": "Como as Relações de Girard ajudam a achar uma raiz que falta, conhecendo as outras?",
   "verso": "Use a soma ou o produto total dado pela relação e subtraia (ou divida) as raízes já conhecidas."
  },
  {
   "id": "flash-matematica-polinomios-29",
   "frente": "O que é o Teste das Raízes Racionais?",
   "verso": "Se um polinômio de coeficientes inteiros tem raiz racional p/q (fração irredutível), p divide o termo independente e q divide o coeficiente líder."
  },
  {
   "id": "flash-matematica-polinomios-30",
   "frente": "Como usar o Teste das Raízes Racionais na prática?",
   "verso": "Liste os divisores do termo independente e do coeficiente líder, forme as frações possíveis p/q, e teste-as em P(x)."
  },
  {
   "id": "flash-matematica-polinomios-31",
   "frente": "Se todas as raízes racionais candidatas falham no teste, o que isso indica?",
   "verso": "O polinômio não tem raízes racionais — as raízes reais (se houver) são irracionais, ou só há raízes complexas não reais."
  },
  {
   "id": "flash-matematica-polinomios-32",
   "frente": "Se um polinômio de coeficientes reais tem grau ímpar, o que se pode garantir sobre suas raízes?",
   "verso": "Tem pelo menos uma raiz real, pois raízes complexas vêm em pares e o grau ímpar deixa uma 'sobrando'."
  },
  {
   "id": "flash-matematica-polinomios-33",
   "frente": "Se P(x) tem coeficientes reais e a+bi é raiz (b≠0), que outra raiz é garantida?",
   "verso": "O conjugado a−bi."
  },
  {
   "id": "flash-matematica-polinomios-34",
   "frente": "Como fatorar um polinômio completamente, conhecendo todas as suas raízes?",
   "verso": "P(x) = aₙ(x−r₁)(x−r₂)...(x−rₙ), sendo aₙ o coeficiente líder e rᵢ as raízes."
  },
  {
   "id": "flash-matematica-polinomios-35",
   "frente": "Como verificar se x=2 é raiz de P(x) sem fazer divisão?",
   "verso": "Calcule P(2); se der zero, é raiz."
  },
  {
   "id": "flash-matematica-polinomios-36",
   "frente": "O que fazer depois de encontrar uma raiz de um polinômio de grau alto?",
   "verso": "Divida o polinômio por (x−raiz), reduzindo o grau, e continue buscando raízes no quociente."
  },
  {
   "id": "flash-matematica-polinomios-37",
   "frente": "Como resolver uma equação polinomial de grau 3 conhecendo uma raiz inteira?",
   "verso": "Divida o polinômio pela raiz encontrada (via Briot-Ruffini) e resolva a equação de 2º grau resultante."
  },
  {
   "id": "flash-matematica-polinomios-38",
   "frente": "O que é uma equação biquadrada, e como reduzi-la a uma do 2º grau?",
   "verso": "Uma equação com só termos de grau 4, 2 e constante; a substituição y=x² transforma-a numa equação do 2º grau em y."
  },
  {
   "id": "flash-matematica-polinomios-39",
   "frente": "Como somar dois polinômios?",
   "verso": "Some os coeficientes dos termos de mesmo grau."
  },
  {
   "id": "flash-matematica-polinomios-40",
   "frente": "Como multiplicar dois polinômios?",
   "verso": "Aplique a distributiva entre todos os termos de um e do outro, somando os expoentes de x em cada produto."
  },
  {
   "id": "flash-matematica-polinomios-41",
   "frente": "Qual é o grau do produto de dois polinômios?",
   "verso": "A soma dos graus dos dois polinômios."
  },
  {
   "id": "flash-matematica-polinomios-42",
   "frente": "Qual é o grau da soma de dois polinômios de graus diferentes?",
   "verso": "O maior dos dois graus, desde que os coeficientes líderes não se cancelem."
  },
  {
   "id": "flash-matematica-polinomios-43",
   "frente": "Como identificar o grau de um polinômio dado por um produto de fatores, sem expandir?",
   "verso": "Some os graus de cada fator."
  },
  {
   "id": "flash-matematica-polinomios-44",
   "frente": "Se P(x) tem grau 3 e Q(x) tem grau 2, qual o grau do quociente e do resto de P(x)÷Q(x)?",
   "verso": "Quociente de grau 1; resto de grau no máximo 1 (menor que o grau do divisor)."
  },
  {
   "id": "flash-matematica-polinomios-45",
   "frente": "O que caracteriza uma raiz dupla de um polinômio, em termos de fatoração?",
   "verso": "O fator (x−a) aparece elevado ao quadrado na fatoração de P(x)."
  },
  {
   "id": "flash-matematica-polinomios-46",
   "frente": "Qual é a relação entre o número de raízes reais de um polinômio e seu grau?",
   "verso": "O número de raízes reais é no máximo igual ao grau — as demais, se houver, são complexas não reais."
  },
  {
   "id": "flash-matematica-polinomios-47",
   "frente": "Como usar Girard para montar um polinômio de 2º grau a partir da soma e do produto das raízes?",
   "verso": "x² − (soma)x + (produto) = 0."
  },
  {
   "id": "flash-matematica-polinomios-48",
   "frente": "Se as raízes de um polinômio de 3º grau são r1, r2, r3, o que a soma dois a dois representa em Girard?",
   "verso": "É igual a aₙ₋₂/aₙ — o coeficiente do termo de grau n−2 dividido pelo coeficiente líder."
  },
  {
   "id": "flash-matematica-polinomios-49",
   "frente": "Como o Teorema do Resto ajuda a calcular P(a) sem substituir numa expressão complicada?",
   "verso": "Fazendo a divisão (ou Briot-Ruffini) por (x−a): o resto já é o valor de P(a)."
  },
  {
   "id": "flash-matematica-polinomios-50",
   "frente": "O que fazer se o Teste das Raízes Racionais não encontra raiz inteira, mas o enunciado garante raiz racional?",
   "verso": "Teste também as frações não inteiras p/q formadas pelos divisores do termo independente e do coeficiente líder."
  },
  {
   "id": "flash-matematica-polinomios-51",
   "frente": "Como confirmar que um valor é raiz de multiplicidade pelo menos 2, sem usar derivadas?",
   "verso": "O quociente da primeira divisão por (x−a) ainda tem a como raiz."
  },
  {
   "id": "flash-matematica-polinomios-52",
   "frente": "Como interpretar 'P(x) deixa resto r ao ser dividido por (x−a)' em termos de P(a)?",
   "verso": "Significa que P(a) = r."
  },
  {
   "id": "flash-matematica-polinomios-53",
   "frente": "O que é um polinômio irredutível?",
   "verso": "Aquele que não pode ser fatorado em polinômios de grau menor com coeficientes no mesmo conjunto numérico considerado."
  },
  {
   "id": "flash-matematica-polinomios-54",
   "frente": "Como calcular a soma dos coeficientes de um polinômio P(x)?",
   "verso": "Calcule P(1) — substituir x por 1 soma todos os coeficientes."
  },
  {
   "id": "flash-matematica-polinomios-55",
   "frente": "Como calcular o termo independente de um polinômio a partir de P(0)?",
   "verso": "P(0) é exatamente o termo independente."
  },
  {
   "id": "flash-matematica-polinomios-56",
   "frente": "Se P(x) = (x−2)(x+3)(x−5), quais são suas raízes?",
   "verso": "2, −3 e 5."
  },
  {
   "id": "flash-matematica-polinomios-57",
   "frente": "Como escrever um polinômio de grau 3 sabendo que 1, 2 e −1 são raízes e o coeficiente líder é 1?",
   "verso": "P(x) = (x−1)(x−2)(x+1)."
  },
  {
   "id": "flash-matematica-polinomios-58",
   "frente": "O que fazer quando duas raízes de um polinômio são simétricas (opostas)?",
   "verso": "O produto delas é o negativo do quadrado, e a soma é zero — use isso para simplificar as Relações de Girard."
  },
  {
   "id": "flash-matematica-polinomios-59",
   "frente": "Como decidir entre Briot-Ruffini e a divisão pela chave?",
   "verso": "Briot-Ruffini só funciona para divisor do tipo (x−a); para divisores de grau maior, use a divisão pela chave."
  },
  {
   "id": "flash-matematica-polinomios-60",
   "frente": "O que fazer quando um polinômio de grau 4 não tem raiz racional evidente, mas é biquadrado?",
   "verso": "Trate como equação em x² e resolva por Bhaskara, depois extraia as raízes de x."
  },
  {
   "id": "flash-matematica-polinomios-61",
   "frente": "Por que verificar P(a)=0 é mais rápido que fatorar diretamente um polinômio de grau alto?",
   "verso": "Encontrar UMA raiz por tentativa já permite reduzir o grau via divisão, simplificando o resto do problema."
  },
  {
   "id": "flash-matematica-polinomios-62",
   "frente": "Como o Teorema Fundamental da Álgebra garante que todo polinômio de grau ≥1 tem raiz complexa?",
   "verso": "Ele afirma que o corpo dos complexos é algebricamente fechado — nenhuma equação polinomial fica sem solução nesse conjunto."
  },
  {
   "id": "flash-matematica-polinomios-63",
   "frente": "Como calcular o valor de P(x) num ponto usando os coeficientes de Briot-Ruffini?",
   "verso": "O último número gerado no dispositivo, ao dividir por (x−a), é exatamente P(a)."
  }
 ],
 "fisica-termologia": [
  {
   "id": "flash-fisica-termologia-01",
   "frente": "Qual é a diferença entre calor e temperatura?",
   "verso": "Temperatura mede o grau de agitação das partículas; calor é a energia térmica em TRÂNSITO entre corpos de temperaturas diferentes."
  },
  {
   "id": "flash-fisica-termologia-02",
   "frente": "Um corpo pode 'ter' calor?",
   "verso": "Não. Calor só existe em trânsito; o corpo tem energia interna, e o calor é a transferência dessa energia."
  },
  {
   "id": "flash-fisica-termologia-03",
   "frente": "Como converter Celsius em Kelvin?",
   "verso": "K = °C + 273."
  },
  {
   "id": "flash-fisica-termologia-04",
   "frente": "Qual é a relação entre as escalas Celsius e Fahrenheit?",
   "verso": "°C/5 = (°F − 32)/9."
  },
  {
   "id": "flash-fisica-termologia-05",
   "frente": "O que é o zero absoluto?",
   "verso": "0 K (−273 °C), a menor temperatura teoricamente possível, com agitação mínima das partículas."
  },
  {
   "id": "flash-fisica-termologia-06",
   "frente": "O que é equilíbrio térmico?",
   "verso": "A situação em que dois corpos em contato atingem a mesma temperatura e cessa a troca líquida de calor."
  },
  {
   "id": "flash-fisica-termologia-07",
   "frente": "O que é calor sensível?",
   "verso": "O calor que provoca variação de TEMPERATURA, sem mudança de estado físico."
  },
  {
   "id": "flash-fisica-termologia-08",
   "frente": "Qual é a fórmula do calor sensível?",
   "verso": "Q = m · c · ΔT."
  },
  {
   "id": "flash-fisica-termologia-09",
   "frente": "O que é calor específico?",
   "verso": "A quantidade de calor necessária para elevar em 1 °C a temperatura de 1 g (ou 1 kg) de uma substância."
  },
  {
   "id": "flash-fisica-termologia-10",
   "frente": "Por que a água demora a esquentar e a esfriar?",
   "verso": "Porque tem calor específico alto (1 cal/g·°C), exigindo muita energia para variar sua temperatura."
  },
  {
   "id": "flash-fisica-termologia-11",
   "frente": "O que é calor latente?",
   "verso": "O calor que provoca MUDANÇA DE ESTADO, sem variação de temperatura."
  },
  {
   "id": "flash-fisica-termologia-12",
   "frente": "Qual é a fórmula do calor latente?",
   "verso": "Q = m · L."
  },
  {
   "id": "flash-fisica-termologia-13",
   "frente": "Por que a temperatura não sobe enquanto o gelo derrete?",
   "verso": "Porque toda a energia recebida é usada para romper as ligações entre as moléculas, não para aumentar a agitação térmica."
  },
  {
   "id": "flash-fisica-termologia-14",
   "frente": "Quais são as mudanças de estado que ABSORVEM calor?",
   "verso": "Fusão, vaporização e sublimação."
  },
  {
   "id": "flash-fisica-termologia-15",
   "frente": "Quais são as mudanças de estado que LIBERAM calor?",
   "verso": "Solidificação, condensação e ressublimação."
  },
  {
   "id": "flash-fisica-termologia-16",
   "frente": "Por que o suor refresca o corpo?",
   "verso": "Porque sua evaporação absorve calor latente da pele, retirando energia do corpo."
  },
  {
   "id": "flash-fisica-termologia-17",
   "frente": "O que é dilatação térmica?",
   "verso": "O aumento das dimensões de um corpo pelo aumento da temperatura, causado pela maior agitação e afastamento das partículas."
  },
  {
   "id": "flash-fisica-termologia-18",
   "frente": "Qual é a fórmula da dilatação linear?",
   "verso": "ΔL = L₀ · α · ΔT."
  },
  {
   "id": "flash-fisica-termologia-19",
   "frente": "Como se relacionam os coeficientes de dilatação linear, superficial e volumétrica?",
   "verso": "β = 2α e γ = 3α."
  },
  {
   "id": "flash-fisica-termologia-20",
   "frente": "Por que se deixam juntas de dilatação entre trilhos e lajes?",
   "verso": "Para acomodar a expansão do material com o aumento da temperatura sem gerar tensões que o deformem ou rompam."
  },
  {
   "id": "flash-fisica-termologia-21",
   "frente": "O que é a dilatação anômala da água?",
   "verso": "Entre 0 °C e 4 °C a água CONTRAI ao ser aquecida; por isso o gelo flutua e os lagos congelam de cima para baixo."
  },
  {
   "id": "flash-fisica-termologia-22",
   "frente": "Como o calor se propaga por condução?",
   "verso": "De partícula a partícula, sem transporte de matéria; é o mecanismo típico dos sólidos, sobretudo dos metais."
  },
  {
   "id": "flash-fisica-termologia-23",
   "frente": "Como o calor se propaga por convecção?",
   "verso": "Pelo deslocamento de massas do próprio fluido, com o material quente subindo e o frio descendo; só ocorre em fluidos."
  },
  {
   "id": "flash-fisica-termologia-24",
   "frente": "Como o calor se propaga por irradiação?",
   "verso": "Por ondas eletromagnéticas, sem necessidade de meio material — é assim que o calor do Sol chega à Terra."
  },
  {
   "id": "flash-fisica-termologia-25",
   "frente": "Por que garrafas térmicas têm parede dupla espelhada e vácuo entre elas?",
   "verso": "O vácuo bloqueia condução e convecção, e o espelhamento reflete a irradiação."
  },
  {
   "id": "flash-fisica-termologia-26",
   "frente": "O que estabelece a Lei Geral dos Gases?",
   "verso": "P·V/T é constante para uma dada massa de gás ideal, permitindo relacionar dois estados: P₁V₁/T₁ = P₂V₂/T₂."
  },
  {
   "id": "flash-fisica-termologia-27",
   "frente": "O que é uma transformação isotérmica?",
   "verso": "Aquela em que a temperatura permanece constante, com pressão e volume inversamente proporcionais (Lei de Boyle)."
  },
  {
   "id": "flash-fisica-termologia-28",
   "frente": "O que é uma transformação isobárica?",
   "verso": "Aquela em que a pressão permanece constante, com volume diretamente proporcional à temperatura absoluta."
  },
  {
   "id": "flash-fisica-termologia-29",
   "frente": "O que é uma transformação isovolumétrica (isocórica)?",
   "verso": "Aquela em que o volume permanece constante, com pressão diretamente proporcional à temperatura absoluta."
  },
  {
   "id": "flash-fisica-termologia-30",
   "frente": "O que é uma transformação adiabática?",
   "verso": "Aquela em que não há troca de calor com o meio (Q = 0); toda variação de energia interna vem do trabalho."
  },
  {
   "id": "flash-fisica-termologia-31",
   "frente": "O que diz a Primeira Lei da Termodinâmica?",
   "verso": "ΔU = Q − τ: a variação da energia interna é o calor recebido menos o trabalho realizado pelo gás."
  },
  {
   "id": "flash-fisica-termologia-32",
   "frente": "Numa transformação isotérmica, quanto vale a variação da energia interna?",
   "verso": "Zero — a energia interna de um gás ideal depende só da temperatura, que não muda."
  },
  {
   "id": "flash-fisica-termologia-33",
   "frente": "O que diz a Segunda Lei da Termodinâmica?",
   "verso": "O calor flui espontaneamente do corpo mais quente para o mais frio, e nenhuma máquina térmica converte integralmente calor em trabalho."
  },
  {
   "id": "flash-fisica-termologia-34",
   "frente": "O que é uma máquina térmica?",
   "verso": "Um dispositivo que retira calor de uma fonte quente, converte parte em trabalho e rejeita o restante numa fonte fria."
  },
  {
   "id": "flash-fisica-termologia-35",
   "frente": "Como se calcula o rendimento máximo de uma máquina de Carnot?",
   "verso": "η = 1 − (T_fria / T_quente), com as temperaturas em Kelvin."
  },
  {
   "id": "flash-fisica-termologia-36",
   "frente": "Por que uma geladeira não esfria a cozinha se ficar aberta?",
   "verso": "Porque ela transfere calor de dentro para fora e ainda dissipa o calor do trabalho do motor — o saldo líquido AQUECE o ambiente."
  }
 ],
 "fisica-mecanica": [
  {
   "id": "flash-fisica-mecanica-01",
   "frente": "O que é um referencial, e por que ele importa?",
   "verso": "O corpo em relação ao qual se descreve o movimento; repouso e movimento são conceitos relativos ao referencial adotado."
  },
  {
   "id": "flash-fisica-mecanica-02",
   "frente": "Qual é a diferença entre distância percorrida e deslocamento?",
   "verso": "A distância é o comprimento total do caminho; o deslocamento é o vetor entre posição inicial e final, e pode ser zero num percurso fechado."
  },
  {
   "id": "flash-fisica-mecanica-03",
   "frente": "Como se calcula a velocidade escalar média?",
   "verso": "v = variação de espaço ÷ variação de tempo (Δs/Δt)."
  },
  {
   "id": "flash-fisica-mecanica-04",
   "frente": "Quanto vale 36 km/h em m/s?",
   "verso": "10 m/s — para converter de km/h para m/s, divide-se por 3,6."
  },
  {
   "id": "flash-fisica-mecanica-05",
   "frente": "O que caracteriza o Movimento Retilíneo Uniforme (MRU)?",
   "verso": "Velocidade constante e aceleração nula; a função horária é s = s₀ + v·t."
  },
  {
   "id": "flash-fisica-mecanica-06",
   "frente": "O que caracteriza o Movimento Retilíneo Uniformemente Variado (MRUV)?",
   "verso": "Aceleração constante e não nula; a velocidade varia linearmente com o tempo."
  },
  {
   "id": "flash-fisica-mecanica-07",
   "frente": "Qual é a função horária da velocidade no MRUV?",
   "verso": "v = v₀ + a·t."
  },
  {
   "id": "flash-fisica-mecanica-08",
   "frente": "Qual é a função horária da posição no MRUV?",
   "verso": "s = s₀ + v₀·t + (a·t²)/2."
  },
  {
   "id": "flash-fisica-mecanica-09",
   "frente": "O que diz a Equação de Torricelli, e quando ela é útil?",
   "verso": "v² = v₀² + 2·a·Δs; é útil quando o tempo não é dado nem pedido."
  },
  {
   "id": "flash-fisica-mecanica-10",
   "frente": "O que representa a área sob o gráfico velocidade × tempo?",
   "verso": "O deslocamento do móvel no intervalo considerado."
  },
  {
   "id": "flash-fisica-mecanica-11",
   "frente": "O que representa a inclinação do gráfico velocidade × tempo?",
   "verso": "A aceleração."
  },
  {
   "id": "flash-fisica-mecanica-12",
   "frente": "O que representa a inclinação do gráfico posição × tempo?",
   "verso": "A velocidade instantânea naquele ponto."
  },
  {
   "id": "flash-fisica-mecanica-13",
   "frente": "Quando um movimento é acelerado e quando é retardado?",
   "verso": "Acelerado quando velocidade e aceleração têm o MESMO sinal; retardado quando têm sinais opostos."
  },
  {
   "id": "flash-fisica-mecanica-14",
   "frente": "O que caracteriza a queda livre?",
   "verso": "Movimento sob ação exclusiva da gravidade, com aceleração g constante e independente da massa do corpo."
  },
  {
   "id": "flash-fisica-mecanica-15",
   "frente": "Por que, no vácuo, uma pena e um martelo caem juntos?",
   "verso": "Porque a aceleração da gravidade não depende da massa, e sem ar não há resistência para diferenciá-los."
  },
  {
   "id": "flash-fisica-mecanica-16",
   "frente": "No lançamento vertical para cima, quanto vale a velocidade no ponto mais alto?",
   "verso": "Zero — mas a aceleração continua sendo g, apontando para baixo."
  },
  {
   "id": "flash-fisica-mecanica-17",
   "frente": "O que caracteriza o lançamento horizontal?",
   "verso": "A composição de um MRU na horizontal com uma queda livre na vertical, independentes entre si."
  },
  {
   "id": "flash-fisica-mecanica-18",
   "frente": "Por que o tempo de queda no lançamento horizontal não depende da velocidade inicial?",
   "verso": "Porque o movimento vertical é independente do horizontal e depende apenas da altura e de g."
  },
  {
   "id": "flash-fisica-mecanica-19",
   "frente": "Qual é o ângulo de alcance máximo num lançamento oblíquo, desprezando o ar?",
   "verso": "45°."
  },
  {
   "id": "flash-fisica-mecanica-20",
   "frente": "O que diz a Primeira Lei de Newton (Inércia)?",
   "verso": "Um corpo mantém seu estado de repouso ou de movimento retilíneo uniforme, a menos que uma força resultante atue sobre ele."
  },
  {
   "id": "flash-fisica-mecanica-21",
   "frente": "O que diz a Segunda Lei de Newton?",
   "verso": "A força resultante é igual ao produto da massa pela aceleração: F = m·a."
  },
  {
   "id": "flash-fisica-mecanica-22",
   "frente": "O que diz a Terceira Lei de Newton (Ação e Reação)?",
   "verso": "A toda ação corresponde uma reação de mesma intensidade, mesma direção e sentido oposto, aplicadas em CORPOS DIFERENTES."
  },
  {
   "id": "flash-fisica-mecanica-23",
   "frente": "Por que forças de ação e reação nunca se anulam?",
   "verso": "Porque atuam em corpos diferentes; só se anulam forças aplicadas ao mesmo corpo."
  },
  {
   "id": "flash-fisica-mecanica-24",
   "frente": "Qual é a diferença entre massa e peso?",
   "verso": "Massa é a quantidade de matéria, escalar e invariável; peso é a força gravitacional sobre o corpo, vetorial e dependente de g."
  },
  {
   "id": "flash-fisica-mecanica-25",
   "frente": "O que é a força normal?",
   "verso": "A força de contato perpendicular à superfície de apoio; nem sempre é igual ao peso, como num plano inclinado ou num elevador acelerado."
  },
  {
   "id": "flash-fisica-mecanica-26",
   "frente": "Qual é a diferença entre atrito estático e cinético?",
   "verso": "O estático age enquanto o corpo não se move e é variável até um máximo; o cinético age durante o deslizamento e é aproximadamente constante."
  },
  {
   "id": "flash-fisica-mecanica-27",
   "frente": "Como se calcula a força de atrito?",
   "verso": "Fat = µ · N, o produto do coeficiente de atrito pela força normal."
  },
  {
   "id": "flash-fisica-mecanica-28",
   "frente": "A força de atrito depende da área de contato?",
   "verso": "No modelo do ensino médio, não — depende apenas do coeficiente de atrito e da força normal."
  },
  {
   "id": "flash-fisica-mecanica-29",
   "frente": "Num plano inclinado sem atrito, quais são as componentes do peso?",
   "verso": "P·sen θ na direção do movimento (que acelera o corpo) e P·cos θ perpendicular ao plano (equilibrada pela normal)."
  },
  {
   "id": "flash-fisica-mecanica-30",
   "frente": "Por que a aceleração num plano inclinado sem atrito não depende da massa?",
   "verso": "Porque a = g·sen θ — a massa se cancela entre a força resultante e a inércia."
  },
  {
   "id": "flash-fisica-mecanica-31",
   "frente": "O que caracteriza o Movimento Circular Uniforme?",
   "verso": "Módulo da velocidade constante, mas direção variando, o que exige aceleração centrípeta permanente."
  },
  {
   "id": "flash-fisica-mecanica-32",
   "frente": "Para onde aponta a aceleração centrípeta?",
   "verso": "Sempre para o centro da trajetória circular."
  },
  {
   "id": "flash-fisica-mecanica-33",
   "frente": "Existe força centrífuga, do ponto de vista de um referencial inercial?",
   "verso": "Não — é uma força fictícia, sensação decorrente da inércia num referencial girante."
  },
  {
   "id": "flash-fisica-mecanica-34",
   "frente": "Qual é a relação entre período e frequência?",
   "verso": "São inversos: T = 1/f."
  },
  {
   "id": "flash-fisica-mecanica-35",
   "frente": "O que diz a Lei da Gravitação Universal?",
   "verso": "Dois corpos se atraem com força proporcional ao produto de suas massas e inversamente proporcional ao quadrado da distância entre eles."
  },
  {
   "id": "flash-fisica-mecanica-36",
   "frente": "Por que um astronauta flutua na Estação Espacial, se a gravidade lá ainda é forte?",
   "verso": "Porque está em queda livre permanente junto com a estação — é ausência de peso aparente, não ausência de gravidade."
  },
  {
   "id": "flash-fisica-mecanica-37",
   "frente": "O que diz a Terceira Lei de Kepler?",
   "verso": "O quadrado do período orbital é proporcional ao cubo do raio médio da órbita."
  },
  {
   "id": "flash-fisica-mecanica-38",
   "frente": "O que diz a Segunda Lei de Kepler (Lei das Áreas)?",
   "verso": "O raio que liga o planeta ao Sol varre áreas iguais em tempos iguais, o que faz o planeta acelerar no periélio."
  }
 ],
 "fisica-ondas-optica": [
  {
   "id": "flash-fisica-ondas-optica-01",
   "frente": "O que é uma onda?",
   "verso": "Uma perturbação que se propaga transportando ENERGIA, sem transporte de matéria."
  },
  {
   "id": "flash-fisica-ondas-optica-02",
   "frente": "Qual é a diferença entre onda mecânica e eletromagnética?",
   "verso": "A mecânica precisa de meio material para se propagar (som); a eletromagnética se propaga também no vácuo (luz)."
  },
  {
   "id": "flash-fisica-ondas-optica-03",
   "frente": "Qual é a diferença entre onda transversal e longitudinal?",
   "verso": "Na transversal a vibração é perpendicular à propagação; na longitudinal é paralela, como no som."
  },
  {
   "id": "flash-fisica-ondas-optica-04",
   "frente": "O que é comprimento de onda?",
   "verso": "A distância entre dois pontos consecutivos em mesma fase, como de crista a crista."
  },
  {
   "id": "flash-fisica-ondas-optica-05",
   "frente": "O que é frequência de uma onda, e qual sua unidade?",
   "verso": "O número de oscilações por segundo, medida em hertz (Hz)."
  },
  {
   "id": "flash-fisica-ondas-optica-06",
   "frente": "Qual é a equação fundamental da ondulatória?",
   "verso": "v = λ · f — velocidade igual a comprimento de onda vezes frequência."
  },
  {
   "id": "flash-fisica-ondas-optica-07",
   "frente": "O que acontece com a frequência de uma onda ao mudar de meio?",
   "verso": "Ela NÃO muda; alteram-se a velocidade e o comprimento de onda."
  },
  {
   "id": "flash-fisica-ondas-optica-08",
   "frente": "O que é amplitude de uma onda, e a que ela se relaciona?",
   "verso": "A altura máxima da oscilação; relaciona-se à energia transportada — no som, à intensidade (volume)."
  },
  {
   "id": "flash-fisica-ondas-optica-09",
   "frente": "O que é refração de uma onda?",
   "verso": "A mudança de velocidade e de direção ao passar de um meio para outro."
  },
  {
   "id": "flash-fisica-ondas-optica-10",
   "frente": "O que é difração?",
   "verso": "A capacidade da onda de contornar obstáculos e se espalhar ao passar por aberturas de dimensão comparável ao seu comprimento de onda."
  },
  {
   "id": "flash-fisica-ondas-optica-11",
   "frente": "Por que se ouve um som atrás de um muro sem ver a fonte?",
   "verso": "Porque o comprimento de onda do som é grande o bastante para contorná-lo por difração, o que a luz não consegue."
  },
  {
   "id": "flash-fisica-ondas-optica-12",
   "frente": "O que é interferência de ondas?",
   "verso": "A superposição de duas ondas, que se somam (construtiva) ou se cancelam parcialmente (destrutiva)."
  },
  {
   "id": "flash-fisica-ondas-optica-13",
   "frente": "O que é ressonância?",
   "verso": "A transferência máxima de energia que ocorre quando a frequência da excitação coincide com a frequência natural do sistema."
  },
  {
   "id": "flash-fisica-ondas-optica-14",
   "frente": "O que determina a altura de um som (grave ou agudo)?",
   "verso": "A frequência: sons graves têm baixa frequência, agudos têm alta frequência."
  },
  {
   "id": "flash-fisica-ondas-optica-15",
   "frente": "O que determina a intensidade (volume) de um som?",
   "verso": "A amplitude da onda sonora."
  },
  {
   "id": "flash-fisica-ondas-optica-16",
   "frente": "O que é o timbre de um som?",
   "verso": "A qualidade que permite distinguir a mesma nota tocada por instrumentos diferentes; decorre dos harmônicos que acompanham a frequência fundamental."
  },
  {
   "id": "flash-fisica-ondas-optica-17",
   "frente": "Qual é a faixa audível pelo ouvido humano?",
   "verso": "Aproximadamente de 20 Hz a 20.000 Hz."
  },
  {
   "id": "flash-fisica-ondas-optica-18",
   "frente": "Por que o som não se propaga no vácuo?",
   "verso": "Porque é uma onda mecânica e depende de um meio material para transmitir a perturbação."
  },
  {
   "id": "flash-fisica-ondas-optica-19",
   "frente": "Em que meio o som se propaga mais rápido: sólido, líquido ou gás?",
   "verso": "No sólido, onde as partículas estão mais próximas e transmitem a perturbação mais rapidamente."
  },
  {
   "id": "flash-fisica-ondas-optica-20",
   "frente": "O que é o efeito Doppler?",
   "verso": "A alteração da frequência percebida quando há movimento relativo entre fonte e observador — a sirene fica mais aguda ao se aproximar."
  },
  {
   "id": "flash-fisica-ondas-optica-21",
   "frente": "O que diz a Lei da Reflexão?",
   "verso": "O ângulo de incidência é igual ao ângulo de reflexão, medidos em relação à normal."
  },
  {
   "id": "flash-fisica-ondas-optica-22",
   "frente": "Que características tem a imagem formada por um espelho plano?",
   "verso": "Virtual, direita, do mesmo tamanho do objeto e simétrica em relação ao espelho."
  },
  {
   "id": "flash-fisica-ondas-optica-23",
   "frente": "Que tipo de imagem um espelho côncavo forma com o objeto além do centro de curvatura?",
   "verso": "Real, invertida e menor que o objeto."
  },
  {
   "id": "flash-fisica-ondas-optica-24",
   "frente": "Que tipo de imagem um espelho convexo sempre forma?",
   "verso": "Virtual, direita e menor — por isso é usado em retrovisores e em corredores, por ampliar o campo visual."
  },
  {
   "id": "flash-fisica-ondas-optica-25",
   "frente": "O que é o índice de refração de um meio?",
   "verso": "A razão entre a velocidade da luz no vácuo e nesse meio: n = c/v; é sempre maior ou igual a 1."
  },
  {
   "id": "flash-fisica-ondas-optica-26",
   "frente": "O que diz a Lei de Snell-Descartes?",
   "verso": "n₁ · sen θ₁ = n₂ · sen θ₂, relacionando os ângulos e os índices de refração dos dois meios."
  },
  {
   "id": "flash-fisica-ondas-optica-27",
   "frente": "Para onde a luz se desvia ao passar de um meio menos refringente para um mais refringente?",
   "verso": "Aproxima-se da normal, e sua velocidade diminui."
  },
  {
   "id": "flash-fisica-ondas-optica-28",
   "frente": "O que é reflexão total, e quando ocorre?",
   "verso": "A luz é inteiramente refletida ao tentar passar de um meio mais refringente para um menos refringente acima do ângulo limite."
  },
  {
   "id": "flash-fisica-ondas-optica-29",
   "frente": "Qual tecnologia se baseia na reflexão total?",
   "verso": "A fibra óptica, em que a luz percorre longas distâncias confinada no núcleo por sucessivas reflexões totais."
  },
  {
   "id": "flash-fisica-ondas-optica-30",
   "frente": "Que tipo de lente é convergente, e o que ela faz com os raios paralelos?",
   "verso": "A de bordas finas; concentra os raios paralelos num foco real."
  },
  {
   "id": "flash-fisica-ondas-optica-31",
   "frente": "Que tipo de lente é divergente, e que imagem ela forma?",
   "verso": "A de bordas grossas; espalha os raios e forma sempre imagem virtual, direita e menor."
  },
  {
   "id": "flash-fisica-ondas-optica-32",
   "frente": "O que é dioptria (o 'grau' de um óculos)?",
   "verso": "O inverso da distância focal em metros: D = 1/f."
  },
  {
   "id": "flash-fisica-ondas-optica-33",
   "frente": "O que é miopia, e que lente a corrige?",
   "verso": "A imagem se forma antes da retina, dificultando a visão de longe; corrige-se com lente divergente (grau negativo)."
  },
  {
   "id": "flash-fisica-ondas-optica-34",
   "frente": "O que é hipermetropia, e que lente a corrige?",
   "verso": "A imagem se formaria depois da retina, dificultando a visão de perto; corrige-se com lente convergente (grau positivo)."
  },
  {
   "id": "flash-fisica-ondas-optica-35",
   "frente": "Por que o céu é azul?",
   "verso": "Porque a atmosfera espalha mais intensamente as menores comprimentos de onda da luz visível, na faixa do azul."
  },
  {
   "id": "flash-fisica-ondas-optica-36",
   "frente": "O que é dispersão da luz, e onde ela aparece na natureza?",
   "verso": "A separação da luz branca em suas cores por índices de refração diferentes para cada comprimento de onda; produz o arco-íris."
  },
  {
   "id": "flash-fisica-ondas-optica-37",
   "frente": "Como se ordena o espectro eletromagnético em frequência crescente?",
   "verso": "Ondas de rádio, micro-ondas, infravermelho, luz visível, ultravioleta, raios X e raios gama."
  },
  {
   "id": "flash-fisica-ondas-optica-38",
   "frente": "Por que raios X e gama são ionizantes e as ondas de rádio não?",
   "verso": "Porque sua altíssima frequência lhes dá energia suficiente para arrancar elétrons dos átomos."
  }
 ],
 "fisica-eletromagnetismo": [
  {
   "id": "flash-fisica-eletromagnetismo-01",
   "frente": "O que diz o princípio da atração e repulsão entre cargas?",
   "verso": "Cargas de sinais opostos se atraem e cargas de mesmo sinal se repelem."
  },
  {
   "id": "flash-fisica-eletromagnetismo-02",
   "frente": "O que diz a Lei de Coulomb?",
   "verso": "A força entre duas cargas é proporcional ao produto delas e inversamente proporcional ao quadrado da distância."
  },
  {
   "id": "flash-fisica-eletromagnetismo-03",
   "frente": "O que acontece com a força elétrica se a distância entre as cargas dobra?",
   "verso": "Cai para um quarto, pois depende do inverso do quadrado da distância."
  },
  {
   "id": "flash-fisica-eletromagnetismo-04",
   "frente": "O que é eletrização por atrito?",
   "verso": "A transferência de elétrons entre dois corpos atritados, que ficam com cargas de sinais opostos e mesmo módulo."
  },
  {
   "id": "flash-fisica-eletromagnetismo-05",
   "frente": "O que é eletrização por indução?",
   "verso": "A separação de cargas num condutor causada pela aproximação de um corpo carregado, sem contato direto."
  },
  {
   "id": "flash-fisica-eletromagnetismo-06",
   "frente": "O que é uma gaiola de Faraday?",
   "verso": "Um condutor que blinda seu interior de campos elétricos externos, pois as cargas se redistribuem na superfície — é por isso que o carro protege em tempestades."
  },
  {
   "id": "flash-fisica-eletromagnetismo-07",
   "frente": "O que é campo elétrico?",
   "verso": "A região do espaço em que uma carga elétrica sofre a ação de força elétrica: E = F/q."
  },
  {
   "id": "flash-fisica-eletromagnetismo-08",
   "frente": "Como se orientam as linhas de campo elétrico?",
   "verso": "Saem das cargas positivas e chegam às negativas; nunca se cruzam."
  },
  {
   "id": "flash-fisica-eletromagnetismo-09",
   "frente": "O que é corrente elétrica?",
   "verso": "O movimento ordenado de portadores de carga, medido pela carga que atravessa uma secção por unidade de tempo: i = Q/Δt."
  },
  {
   "id": "flash-fisica-eletromagnetismo-10",
   "frente": "Qual é a unidade de corrente elétrica no SI?",
   "verso": "O ampère (A), equivalente a 1 coulomb por segundo."
  },
  {
   "id": "flash-fisica-eletromagnetismo-11",
   "frente": "O que é diferença de potencial (ddp ou tensão)?",
   "verso": "O trabalho por unidade de carga para deslocar cargas entre dois pontos; é medida em volts."
  },
  {
   "id": "flash-fisica-eletromagnetismo-12",
   "frente": "O que diz a Primeira Lei de Ohm?",
   "verso": "U = R · i — a tensão é igual ao produto da resistência pela corrente, em condutores ôhmicos."
  },
  {
   "id": "flash-fisica-eletromagnetismo-13",
   "frente": "O que caracteriza um condutor ôhmico?",
   "verso": "Sua resistência é constante, e o gráfico U × i é uma reta que passa pela origem."
  },
  {
   "id": "flash-fisica-eletromagnetismo-14",
   "frente": "O que diz a Segunda Lei de Ohm?",
   "verso": "R = ρ·L/A — a resistência cresce com o comprimento do fio e diminui com a área da secção transversal."
  },
  {
   "id": "flash-fisica-eletromagnetismo-15",
   "frente": "O que acontece com a corrente num circuito em série?",
   "verso": "É a MESMA em todos os componentes; o que se divide é a tensão."
  },
  {
   "id": "flash-fisica-eletromagnetismo-16",
   "frente": "Como se calcula a resistência equivalente em série?",
   "verso": "Somando as resistências: Req = R₁ + R₂ + ..."
  },
  {
   "id": "flash-fisica-eletromagnetismo-17",
   "frente": "O que acontece com a tensão num circuito em paralelo?",
   "verso": "É a MESMA em todos os ramos; o que se divide é a corrente."
  },
  {
   "id": "flash-fisica-eletromagnetismo-18",
   "frente": "Como se calcula a resistência equivalente em paralelo?",
   "verso": "Pelo inverso da soma dos inversos: 1/Req = 1/R₁ + 1/R₂ + ..."
  },
  {
   "id": "flash-fisica-eletromagnetismo-19",
   "frente": "Por que as tomadas de uma casa são ligadas em paralelo?",
   "verso": "Para que todas recebam a mesma tensão e o desligamento de um aparelho não interrompa os demais."
  },
  {
   "id": "flash-fisica-eletromagnetismo-20",
   "frente": "O que é o efeito Joule?",
   "verso": "A dissipação de energia elétrica como calor na passagem da corrente por um resistor."
  },
  {
   "id": "flash-fisica-eletromagnetismo-21",
   "frente": "Quais são as fórmulas da potência elétrica dissipada?",
   "verso": "P = U·i = R·i² = U²/R."
  },
  {
   "id": "flash-fisica-eletromagnetismo-22",
   "frente": "Como se calcula o consumo de energia elétrica em kWh?",
   "verso": "Multiplicando a potência em kW pelo tempo de uso em horas."
  },
  {
   "id": "flash-fisica-eletromagnetismo-23",
   "frente": "Por que o chuveiro é o maior vilão da conta de luz?",
   "verso": "Porque tem potência muito alta (milhares de watts), e o consumo é o produto da potência pelo tempo de uso."
  },
  {
   "id": "flash-fisica-eletromagnetismo-24",
   "frente": "Por que a posição 'inverno' do chuveiro aquece mais?",
   "verso": "Porque reduz a resistência do circuito, o que aumenta a corrente e, com ela, a potência dissipada."
  },
  {
   "id": "flash-fisica-eletromagnetismo-25",
   "frente": "Como se liga um amperímetro num circuito?",
   "verso": "Em SÉRIE com o componente cuja corrente se quer medir; idealmente tem resistência nula."
  },
  {
   "id": "flash-fisica-eletromagnetismo-26",
   "frente": "Como se liga um voltímetro num circuito?",
   "verso": "Em PARALELO com o componente cuja tensão se quer medir; idealmente tem resistência infinita."
  },
  {
   "id": "flash-fisica-eletromagnetismo-27",
   "frente": "O que é a força eletromotriz de um gerador?",
   "verso": "A tensão que ele forneceria sem perdas internas; a tensão útil é a fem menos a queda na resistência interna."
  },
  {
   "id": "flash-fisica-eletromagnetismo-28",
   "frente": "O que é um capacitor?",
   "verso": "Um dispositivo que armazena carga e energia num campo elétrico entre duas placas condutoras separadas por um isolante."
  },
  {
   "id": "flash-fisica-eletromagnetismo-29",
   "frente": "Como se orientam as linhas de campo magnético de um ímã?",
   "verso": "Saem do polo norte e entram no polo sul, formando linhas fechadas que continuam dentro do ímã."
  },
  {
   "id": "flash-fisica-eletromagnetismo-30",
   "frente": "É possível isolar um polo magnético?",
   "verso": "Não. Ao partir um ímã, cada pedaço volta a ter os dois polos — não existem monopolos magnéticos."
  },
  {
   "id": "flash-fisica-eletromagnetismo-31",
   "frente": "O que a experiência de Oersted demonstrou?",
   "verso": "Que uma corrente elétrica gera campo magnético ao seu redor, unificando eletricidade e magnetismo."
  },
  {
   "id": "flash-fisica-eletromagnetismo-32",
   "frente": "O que é um eletroímã?",
   "verso": "Um solenoide que gera campo magnético apenas quando percorrido por corrente, com intensidade controlável."
  },
  {
   "id": "flash-fisica-eletromagnetismo-33",
   "frente": "O que diz a Lei de Faraday da indução?",
   "verso": "A variação do fluxo magnético através de uma espira induz nela uma força eletromotriz."
  },
  {
   "id": "flash-fisica-eletromagnetismo-34",
   "frente": "O que diz a Lei de Lenz?",
   "verso": "A corrente induzida tem sentido tal que se opõe à variação de fluxo que a gerou — é uma consequência da conservação da energia."
  },
  {
   "id": "flash-fisica-eletromagnetismo-35",
   "frente": "Como funciona um gerador de energia elétrica?",
   "verso": "Convertendo energia mecânica em elétrica: uma bobina gira num campo magnético, e a variação de fluxo induz corrente."
  },
  {
   "id": "flash-fisica-eletromagnetismo-36",
   "frente": "Como funciona um transformador, e por que só serve para corrente alternada?",
   "verso": "Duas bobinas acopladas alteram a tensão pela razão entre suas espiras; exige fluxo VARIÁVEL, o que a corrente contínua não fornece."
  },
  {
   "id": "flash-fisica-eletromagnetismo-37",
   "frente": "Por que a energia é transmitida em alta tensão nas linhas de transmissão?",
   "verso": "Porque, para a mesma potência, alta tensão significa baixa corrente, e as perdas por efeito Joule dependem do quadrado da corrente."
  }
 ],
 "fisica-hidrostatica": [
  {
   "id": "flash-fisica-hidrostatica-01",
   "frente": "Como se define pressão?",
   "verso": "A razão entre a força perpendicular aplicada e a área sobre a qual ela se distribui: p = F/A."
  },
  {
   "id": "flash-fisica-hidrostatica-02",
   "frente": "Qual é a unidade de pressão no SI?",
   "verso": "O pascal (Pa), equivalente a 1 newton por metro quadrado."
  },
  {
   "id": "flash-fisica-hidrostatica-03",
   "frente": "Por que uma faca amolada corta melhor que uma cega?",
   "verso": "Porque a área de contato é menor, o que aumenta a pressão exercida pela mesma força."
  },
  {
   "id": "flash-fisica-hidrostatica-04",
   "frente": "Por que esquis impedem que a pessoa afunde na neve?",
   "verso": "Porque distribuem o peso por uma área grande, reduzindo a pressão sobre a neve."
  },
  {
   "id": "flash-fisica-hidrostatica-05",
   "frente": "O que é densidade (massa específica)?",
   "verso": "A razão entre massa e volume: d = m/V."
  },
  {
   "id": "flash-fisica-hidrostatica-06",
   "frente": "Qual é a densidade da água, em unidades usuais?",
   "verso": "1 g/cm³, equivalente a 1000 kg/m³."
  },
  {
   "id": "flash-fisica-hidrostatica-07",
   "frente": "Qual é a fórmula da pressão hidrostática?",
   "verso": "p = d · g · h, sendo h a profundidade abaixo da superfície livre."
  },
  {
   "id": "flash-fisica-hidrostatica-08",
   "frente": "A pressão hidrostática depende do formato ou do volume do recipiente?",
   "verso": "Não — depende apenas da densidade do líquido, da gravidade e da PROFUNDIDADE."
  },
  {
   "id": "flash-fisica-hidrostatica-09",
   "frente": "Por que a barragem de uma represa é mais larga na base?",
   "verso": "Porque a pressão hidrostática aumenta com a profundidade, exigindo mais resistência embaixo."
  },
  {
   "id": "flash-fisica-hidrostatica-10",
   "frente": "O que é pressão absoluta no fundo de um recipiente aberto?",
   "verso": "A soma da pressão atmosférica com a pressão hidrostática da coluna de líquido: p = p_atm + d·g·h."
  },
  {
   "id": "flash-fisica-hidrostatica-11",
   "frente": "Quanto vale aproximadamente a pressão atmosférica ao nível do mar?",
   "verso": "1 atm, cerca de 10⁵ Pa ou 760 mmHg."
  },
  {
   "id": "flash-fisica-hidrostatica-12",
   "frente": "Como a pressão atmosférica varia com a altitude?",
   "verso": "Diminui com a altitude, pois há menos ar acima do ponto considerado."
  },
  {
   "id": "flash-fisica-hidrostatica-13",
   "frente": "Por que a água ferve a temperatura menor em grandes altitudes?",
   "verso": "Porque a pressão atmosférica é menor, e o líquido ferve quando sua pressão de vapor iguala a pressão externa."
  },
  {
   "id": "flash-fisica-hidrostatica-14",
   "frente": "O que foi a experiência de Torricelli?",
   "verso": "A medida da pressão atmosférica por uma coluna de mercúrio de 76 cm num tubo invertido — origem da unidade mmHg."
  },
  {
   "id": "flash-fisica-hidrostatica-15",
   "frente": "O que diz o Princípio de Stevin?",
   "verso": "A diferença de pressão entre dois pontos de um líquido em equilíbrio depende apenas do desnível entre eles: Δp = d·g·Δh."
  },
  {
   "id": "flash-fisica-hidrostatica-16",
   "frente": "O que é o princípio dos vasos comunicantes?",
   "verso": "Um líquido homogêneo em recipientes interligados atinge o mesmo nível em todos eles, independentemente da forma."
  },
  {
   "id": "flash-fisica-hidrostatica-17",
   "frente": "Em vasos comunicantes com dois líquidos imiscíveis, o que se iguala?",
   "verso": "As pressões no nível da interface — as alturas ficam inversamente proporcionais às densidades."
  },
  {
   "id": "flash-fisica-hidrostatica-18",
   "frente": "O que diz o Princípio de Pascal?",
   "verso": "Um acréscimo de pressão num ponto de um líquido em equilíbrio transmite-se integralmente a todos os pontos dele."
  },
  {
   "id": "flash-fisica-hidrostatica-19",
   "frente": "Como funciona uma prensa hidráulica?",
   "verso": "Pelo Princípio de Pascal: a mesma pressão atua nos dois êmbolos, então F₁/A₁ = F₂/A₂, e a área maior multiplica a força."
  },
  {
   "id": "flash-fisica-hidrostatica-20",
   "frente": "Numa prensa hidráulica, o que se ganha em força se perde em quê?",
   "verso": "Em deslocamento — o êmbolo maior se move menos, conservando o trabalho realizado."
  },
  {
   "id": "flash-fisica-hidrostatica-21",
   "frente": "O que diz o Princípio de Arquimedes?",
   "verso": "Todo corpo imerso recebe um empuxo vertical para cima igual ao PESO do fluido deslocado."
  },
  {
   "id": "flash-fisica-hidrostatica-22",
   "frente": "Qual é a fórmula do empuxo?",
   "verso": "E = d_fluido · g · V_deslocado."
  },
  {
   "id": "flash-fisica-hidrostatica-23",
   "frente": "De que o empuxo depende, e de que NÃO depende?",
   "verso": "Depende da densidade do fluido e do volume submerso; NÃO depende da densidade nem do peso do corpo."
  },
  {
   "id": "flash-fisica-hidrostatica-24",
   "frente": "Quando um corpo flutua em equilíbrio?",
   "verso": "Quando o empuxo iguala o peso, o que acontece se a densidade média do corpo for menor que a do fluido."
  },
  {
   "id": "flash-fisica-hidrostatica-25",
   "frente": "Por que um navio de aço flutua?",
   "verso": "Porque seu casco oco faz a densidade MÉDIA do conjunto ser menor que a da água, deslocando volume suficiente para o empuxo igualar o peso."
  },
  {
   "id": "flash-fisica-hidrostatica-26",
   "frente": "Por que se boia melhor em água salgada?",
   "verso": "Porque a maior densidade da água salgada gera mais empuxo para o mesmo volume submerso."
  },
  {
   "id": "flash-fisica-hidrostatica-27",
   "frente": "O que é o peso aparente de um corpo submerso?",
   "verso": "O peso real menos o empuxo — é por isso que objetos parecem mais leves dentro d'água."
  },
  {
   "id": "flash-fisica-hidrostatica-28",
   "frente": "Que fração de um iceberg fica submersa, e por quê?",
   "verso": "Cerca de 90%, pois a razão entre a densidade do gelo e a da água do mar determina o volume submerso necessário."
  },
  {
   "id": "flash-fisica-hidrostatica-29",
   "frente": "O que é vazão, e como se calcula?",
   "verso": "O volume de fluido que atravessa uma secção por unidade de tempo: Z = V/Δt = A·v."
  },
  {
   "id": "flash-fisica-hidrostatica-30",
   "frente": "O que diz a equação da continuidade?",
   "verso": "Para fluido incompressível, A₁·v₁ = A₂·v₂ — a vazão se conserva ao longo do escoamento."
  },
  {
   "id": "flash-fisica-hidrostatica-31",
   "frente": "Por que a água sai mais rápido ao se apertar a ponta da mangueira?",
   "verso": "Pela equação da continuidade: reduzir a área de saída aumenta proporcionalmente a velocidade."
  },
  {
   "id": "flash-fisica-hidrostatica-32",
   "frente": "O que diz o Princípio de Bernoulli?",
   "verso": "Num fluido em escoamento, onde a velocidade é maior, a pressão é menor."
  },
  {
   "id": "flash-fisica-hidrostatica-33",
   "frente": "Como o Princípio de Bernoulli explica a sustentação da asa de um avião?",
   "verso": "O ar passa mais rápido sobre a face superior, gerando pressão menor ali e uma força resultante para cima."
  }
 ],
 "fisica-energia-trabalho": [
  {
   "id": "flash-fisica-energia-trabalho-01",
   "frente": "Como se calcula o trabalho de uma força constante?",
   "verso": "τ = F · d · cos θ, sendo θ o ângulo entre a força e o deslocamento."
  },
  {
   "id": "flash-fisica-energia-trabalho-02",
   "frente": "Quando o trabalho de uma força é nulo?",
   "verso": "Quando não há deslocamento, ou quando a força é perpendicular ao deslocamento (cos 90° = 0)."
  },
  {
   "id": "flash-fisica-energia-trabalho-03",
   "frente": "Qual é a unidade de trabalho e de energia no SI?",
   "verso": "O joule (J)."
  },
  {
   "id": "flash-fisica-energia-trabalho-04",
   "frente": "O trabalho da força peso depende da trajetória?",
   "verso": "Não — depende apenas do desnível vertical; o peso é uma força conservativa."
  },
  {
   "id": "flash-fisica-energia-trabalho-05",
   "frente": "O trabalho da força de atrito depende da trajetória?",
   "verso": "Sim — quanto maior o caminho percorrido, maior a energia dissipada; o atrito é uma força dissipativa."
  },
  {
   "id": "flash-fisica-energia-trabalho-06",
   "frente": "Qual é a fórmula da energia cinética?",
   "verso": "Ec = m·v²/2."
  },
  {
   "id": "flash-fisica-energia-trabalho-07",
   "frente": "Se a velocidade de um corpo dobra, o que acontece com sua energia cinética?",
   "verso": "Quadruplica, pois depende do quadrado da velocidade."
  },
  {
   "id": "flash-fisica-energia-trabalho-08",
   "frente": "Qual é a fórmula da energia potencial gravitacional?",
   "verso": "Ep = m·g·h, com h medido a partir de um nível de referência escolhido."
  },
  {
   "id": "flash-fisica-energia-trabalho-09",
   "frente": "Qual é a fórmula da energia potencial elástica?",
   "verso": "Epe = k·x²/2, com k a constante elástica e x a deformação."
  },
  {
   "id": "flash-fisica-energia-trabalho-10",
   "frente": "O que é energia mecânica?",
   "verso": "A soma da energia cinética com as energias potenciais do sistema."
  },
  {
   "id": "flash-fisica-energia-trabalho-11",
   "frente": "Quando a energia mecânica se conserva?",
   "verso": "Quando atuam apenas forças conservativas, ou seja, na ausência de atrito e resistência do ar."
  },
  {
   "id": "flash-fisica-energia-trabalho-12",
   "frente": "O que diz o Teorema da Energia Cinética?",
   "verso": "O trabalho da força resultante é igual à variação da energia cinética do corpo."
  },
  {
   "id": "flash-fisica-energia-trabalho-13",
   "frente": "Num pêndulo ideal, onde a energia cinética é máxima?",
   "verso": "No ponto mais baixo da trajetória, onde a energia potencial é mínima."
  },
  {
   "id": "flash-fisica-energia-trabalho-14",
   "frente": "Num pêndulo ideal, onde a energia potencial é máxima?",
   "verso": "Nos pontos extremos, onde a velocidade — e portanto a energia cinética — é zero."
  },
  {
   "id": "flash-fisica-energia-trabalho-15",
   "frente": "Como se calcula a velocidade de um corpo que cai de uma altura h, sem atrito?",
   "verso": "Igualando m·g·h a m·v²/2, chega-se a v = √(2gh) — independente da massa."
  },
  {
   "id": "flash-fisica-energia-trabalho-16",
   "frente": "O que acontece com a energia mecânica quando há atrito?",
   "verso": "Ela diminui: parte é dissipada como calor, mas a energia TOTAL continua conservada."
  },
  {
   "id": "flash-fisica-energia-trabalho-17",
   "frente": "Qual é a fórmula da potência média?",
   "verso": "P = trabalho ÷ tempo (τ/Δt)."
  },
  {
   "id": "flash-fisica-energia-trabalho-18",
   "frente": "Qual é a relação entre potência, força e velocidade?",
   "verso": "P = F · v, para força na direção do movimento."
  },
  {
   "id": "flash-fisica-energia-trabalho-19",
   "frente": "Qual é a unidade de potência no SI?",
   "verso": "O watt (W), equivalente a 1 joule por segundo."
  },
  {
   "id": "flash-fisica-energia-trabalho-20",
   "frente": "O que significa dizer que uma máquina tem rendimento de 60%?",
   "verso": "Que 60% da energia fornecida é convertida em trabalho útil, e 40% se perde, geralmente como calor."
  },
  {
   "id": "flash-fisica-energia-trabalho-21",
   "frente": "Como se calcula o rendimento de uma máquina?",
   "verso": "Rendimento = potência útil ÷ potência total, geralmente em porcentagem."
  },
  {
   "id": "flash-fisica-energia-trabalho-22",
   "frente": "Por que nenhuma máquina térmica real atinge 100% de rendimento?",
   "verso": "Porque parte da energia é necessariamente dissipada como calor, por imposição da Segunda Lei da Termodinâmica."
  },
  {
   "id": "flash-fisica-energia-trabalho-23",
   "frente": "O que é quantidade de movimento (momento linear)?",
   "verso": "O produto da massa pela velocidade: Q = m·v; é uma grandeza vetorial."
  },
  {
   "id": "flash-fisica-energia-trabalho-24",
   "frente": "O que é impulso de uma força?",
   "verso": "I = F · Δt; é o que produz a variação da quantidade de movimento."
  },
  {
   "id": "flash-fisica-energia-trabalho-25",
   "frente": "O que diz o Teorema do Impulso?",
   "verso": "O impulso da força resultante é igual à variação da quantidade de movimento do corpo."
  },
  {
   "id": "flash-fisica-energia-trabalho-26",
   "frente": "Quando a quantidade de movimento de um sistema se conserva?",
   "verso": "Quando não há forças externas resultantes — vale em qualquer colisão ou explosão, mesmo com atrito interno."
  },
  {
   "id": "flash-fisica-energia-trabalho-27",
   "frente": "O que caracteriza uma colisão perfeitamente elástica?",
   "verso": "Conservam-se tanto a quantidade de movimento quanto a energia cinética."
  },
  {
   "id": "flash-fisica-energia-trabalho-28",
   "frente": "O que caracteriza uma colisão perfeitamente inelástica?",
   "verso": "Os corpos seguem juntos após o choque; conserva-se a quantidade de movimento, mas parte da energia cinética se perde."
  },
  {
   "id": "flash-fisica-energia-trabalho-29",
   "frente": "Numa colisão, o que sempre se conserva, elástica ou não?",
   "verso": "A quantidade de movimento total do sistema."
  },
  {
   "id": "flash-fisica-energia-trabalho-30",
   "frente": "Por que um airbag reduz os danos numa colisão?",
   "verso": "Aumenta o tempo de contato, o que reduz a força necessária para produzir a mesma variação de quantidade de movimento."
  },
  {
   "id": "flash-fisica-energia-trabalho-31",
   "frente": "O que diz a Lei de Hooke?",
   "verso": "A força elástica é proporcional à deformação: F = k · x, dentro do regime elástico do material."
  },
  {
   "id": "flash-fisica-energia-trabalho-32",
   "frente": "O que a constante elástica k representa?",
   "verso": "A rigidez da mola: quanto maior o k, mais força é preciso para produzir a mesma deformação."
  },
  {
   "id": "flash-fisica-energia-trabalho-33",
   "frente": "O que representa a área sob o gráfico força × deformação de uma mola?",
   "verso": "O trabalho realizado sobre a mola, ou seja, a energia potencial elástica armazenada."
  },
  {
   "id": "flash-fisica-energia-trabalho-34",
   "frente": "De onde vem a energia num sistema massa-mola oscilante, sem atrito?",
   "verso": "Alterna-se entre energia potencial elástica (na deformação máxima) e cinética (na posição de equilíbrio), com soma constante."
  }
 ],
 "fisica-moderna": [
  {
   "id": "flash-fisica-moderna-01",
   "frente": "O que é um referencial inercial?",
   "verso": "Aquele em que vale a Lei da Inércia — está em repouso ou em movimento retilíneo uniforme, sem aceleração."
  },
  {
   "id": "flash-fisica-moderna-02",
   "frente": "Quais são os dois postulados da Relatividade Restrita?",
   "verso": "As leis da física são as mesmas em todos os referenciais inerciais, e a velocidade da luz no vácuo é a mesma para todos os observadores."
  },
  {
   "id": "flash-fisica-moderna-03",
   "frente": "Por que o segundo postulado de Einstein é contraintuitivo?",
   "verso": "Porque a velocidade da luz não se soma à do observador — medir c dá o mesmo valor esteja ele parado ou correndo em direção à fonte."
  },
  {
   "id": "flash-fisica-moderna-04",
   "frente": "Quanto vale a velocidade da luz no vácuo?",
   "verso": "Aproximadamente 3,0 × 10⁸ m/s."
  },
  {
   "id": "flash-fisica-moderna-05",
   "frente": "O que é dilatação do tempo?",
   "verso": "O intervalo de tempo medido por um observador em movimento relativo é MAIOR que o medido no referencial próprio do evento."
  },
  {
   "id": "flash-fisica-moderna-06",
   "frente": "O que é o tempo próprio?",
   "verso": "O intervalo medido no referencial em que os dois eventos ocorrem no mesmo lugar; é sempre o menor intervalo possível."
  },
  {
   "id": "flash-fisica-moderna-07",
   "frente": "O que é o fator de Lorentz?",
   "verso": "γ = 1/√(1 − v²/c²); mede o quanto os efeitos relativísticos se afastam da física clássica."
  },
  {
   "id": "flash-fisica-moderna-08",
   "frente": "Quanto vale γ para velocidades pequenas comparadas a c?",
   "verso": "Praticamente 1 — é por isso que os efeitos relativísticos não aparecem no cotidiano."
  },
  {
   "id": "flash-fisica-moderna-09",
   "frente": "O que é contração do comprimento?",
   "verso": "Um objeto em movimento tem comprimento MENOR na direção do deslocamento, medido pelo observador em repouso."
  },
  {
   "id": "flash-fisica-moderna-10",
   "frente": "Em que direção ocorre a contração do comprimento?",
   "verso": "Apenas na direção do movimento; as dimensões perpendiculares não se alteram."
  },
  {
   "id": "flash-fisica-moderna-11",
   "frente": "O que a relatividade diz sobre a simultaneidade?",
   "verso": "Ela é relativa: dois eventos simultâneos num referencial podem não ser simultâneos em outro em movimento."
  },
  {
   "id": "flash-fisica-moderna-12",
   "frente": "Como o paradoxo dos gêmeos é resolvido?",
   "verso": "O gêmeo que viaja não permanece num referencial inercial — ele acelera para retornar, e por isso envelhece menos."
  },
  {
   "id": "flash-fisica-moderna-13",
   "frente": "Por que múons criados na alta atmosfera chegam ao solo?",
   "verso": "Pela dilatação do tempo (no nosso referencial) ou pela contração do comprimento (no deles) — sem relatividade, decairiam antes."
  },
  {
   "id": "flash-fisica-moderna-14",
   "frente": "O que expressa a equação E = mc²?",
   "verso": "A equivalência entre massa e energia: massa é uma forma concentrada de energia."
  },
  {
   "id": "flash-fisica-moderna-15",
   "frente": "O que é energia de repouso?",
   "verso": "A energia E₀ = m₀c² que um corpo possui apenas por ter massa, mesmo parado."
  },
  {
   "id": "flash-fisica-moderna-16",
   "frente": "Por que nenhum corpo com massa atinge a velocidade da luz?",
   "verso": "Porque sua energia (e inércia) tenderia ao infinito ao se aproximar de c, exigindo energia infinita."
  },
  {
   "id": "flash-fisica-moderna-17",
   "frente": "Onde a conversão de massa em energia aparece na prática?",
   "verso": "Na fissão e na fusão nuclear: a diferença de massa entre reagentes e produtos é liberada como energia."
  },
  {
   "id": "flash-fisica-moderna-18",
   "frente": "O que é a catástrofe do ultravioleta?",
   "verso": "A previsão clássica, contradita pelos dados, de que um corpo negro emitiria energia infinita em altas frequências."
  },
  {
   "id": "flash-fisica-moderna-19",
   "frente": "Qual foi a hipótese de Planck que iniciou a física quântica?",
   "verso": "A energia é trocada em pacotes discretos (quanta), não continuamente: E = h·f."
  },
  {
   "id": "flash-fisica-moderna-20",
   "frente": "O que é a constante de Planck?",
   "verso": "A constante h ≈ 6,63 × 10⁻³⁴ J·s, que relaciona a energia de um quantum à sua frequência."
  },
  {
   "id": "flash-fisica-moderna-21",
   "frente": "O que é um fóton?",
   "verso": "O quantum de luz — um pacote de energia eletromagnética, sem massa de repouso, com E = h·f."
  },
  {
   "id": "flash-fisica-moderna-22",
   "frente": "O que é o efeito fotoelétrico?",
   "verso": "A emissão de elétrons por um metal ao ser iluminado por radiação de frequência suficientemente alta."
  },
  {
   "id": "flash-fisica-moderna-23",
   "frente": "Por que o efeito fotoelétrico não pode ser explicado pelo modelo ondulatório da luz?",
   "verso": "Porque depende da FREQUÊNCIA, não da intensidade: luz vermelha intensa não arranca elétrons que luz violeta fraca arranca."
  },
  {
   "id": "flash-fisica-moderna-24",
   "frente": "O que é a frequência de corte no efeito fotoelétrico?",
   "verso": "A frequência mínima abaixo da qual nenhum elétron é ejetado, por menor que seja a intensidade da luz."
  },
  {
   "id": "flash-fisica-moderna-25",
   "frente": "O que é a função trabalho de um metal?",
   "verso": "A energia mínima necessária para arrancar um elétron de sua superfície."
  },
  {
   "id": "flash-fisica-moderna-26",
   "frente": "Qual é a equação do efeito fotoelétrico?",
   "verso": "Ec(máxima) = h·f − função trabalho."
  },
  {
   "id": "flash-fisica-moderna-27",
   "frente": "O que acontece com a energia cinética dos elétrons ao se aumentar a INTENSIDADE da luz?",
   "verso": "Nada — aumenta apenas a QUANTIDADE de elétrons ejetados, não a energia de cada um."
  },
  {
   "id": "flash-fisica-moderna-28",
   "frente": "Quem explicou o efeito fotoelétrico, e com que ideia?",
   "verso": "Einstein, em 1905, propondo que a luz é composta de fótons de energia h·f; foi por isso que recebeu o Nobel."
  },
  {
   "id": "flash-fisica-moderna-29",
   "frente": "O que é a dualidade onda-partícula?",
   "verso": "A luz e a matéria comportam-se ora como onda, ora como partícula, conforme o experimento realizado."
  },
  {
   "id": "flash-fisica-moderna-30",
   "frente": "O que propõe a hipótese de De Broglie?",
   "verso": "Toda partícula tem um comprimento de onda associado: λ = h/(m·v)."
  },
  {
   "id": "flash-fisica-moderna-31",
   "frente": "Por que não observamos o comportamento ondulatório de uma bola de futebol?",
   "verso": "Porque sua massa é enorme comparada a h, tornando o comprimento de onda de De Broglie desprezível."
  },
  {
   "id": "flash-fisica-moderna-32",
   "frente": "Que experimento evidencia o caráter ondulatório dos elétrons?",
   "verso": "A difração de elétrons por cristais, que produz padrões de interferência típicos de ondas."
  },
  {
   "id": "flash-fisica-moderna-33",
   "frente": "O que diz o Princípio da Incerteza de Heisenberg?",
   "verso": "Não é possível determinar simultaneamente, com precisão arbitrária, a posição e a quantidade de movimento de uma partícula."
  },
  {
   "id": "flash-fisica-moderna-34",
   "frente": "Como o modelo de Bohr usa a quantização para explicar os espectros?",
   "verso": "Os elétrons só ocupam órbitas de energia definida, e cada salto emite ou absorve um fóton de energia exatamente igual à diferença entre os níveis."
  }
 ],
 "quimica-eletroquimica": [
  {
   "id": "flash-quimica-eletroquimica-01",
   "frente": "O que é oxidação?",
   "verso": "A perda de elétrons por uma espécie química, com aumento do seu número de oxidação."
  },
  {
   "id": "flash-quimica-eletroquimica-02",
   "frente": "O que é redução?",
   "verso": "O ganho de elétrons por uma espécie química, com diminuição do seu número de oxidação."
  },
  {
   "id": "flash-quimica-eletroquimica-03",
   "frente": "O que é o agente oxidante?",
   "verso": "A espécie que provoca a oxidação de outra, sofrendo ela própria redução (ganha elétrons)."
  },
  {
   "id": "flash-quimica-eletroquimica-04",
   "frente": "O que é o agente redutor?",
   "verso": "A espécie que provoca a redução de outra, sofrendo ela própria oxidação (perde elétrons)."
  },
  {
   "id": "flash-quimica-eletroquimica-05",
   "frente": "Qual é o nox de um elemento em sua forma simples, como O₂ ou Fe?",
   "verso": "Zero."
  },
  {
   "id": "flash-quimica-eletroquimica-06",
   "frente": "Qual é o nox usual do oxigênio nos compostos?",
   "verso": "−2, exceto em peróxidos (−1), superóxidos e nos fluoretos de oxigênio."
  },
  {
   "id": "flash-quimica-eletroquimica-07",
   "frente": "Qual é o nox usual do hidrogênio nos compostos?",
   "verso": "+1, exceto nos hidretos metálicos, em que é −1."
  },
  {
   "id": "flash-quimica-eletroquimica-08",
   "frente": "Qual é a soma dos nox numa molécula neutra?",
   "verso": "Zero."
  },
  {
   "id": "flash-quimica-eletroquimica-09",
   "frente": "Qual é a soma dos nox num íon composto?",
   "verso": "A própria carga do íon."
  },
  {
   "id": "flash-quimica-eletroquimica-10",
   "frente": "Como calcular o nox do enxofre em H₂SO₄?",
   "verso": "2(+1) + x + 4(−2) = 0, portanto x = +6."
  },
  {
   "id": "flash-quimica-eletroquimica-11",
   "frente": "O que é uma pilha (célula galvânica)?",
   "verso": "Um dispositivo que converte energia química em elétrica a partir de uma reação de oxirredução espontânea."
  },
  {
   "id": "flash-quimica-eletroquimica-12",
   "frente": "Em qual eletrodo ocorre a oxidação?",
   "verso": "No ânodo — mnemônico: ânodo/oxidação, ambos com vogal inicial."
  },
  {
   "id": "flash-quimica-eletroquimica-13",
   "frente": "Em qual eletrodo ocorre a redução?",
   "verso": "No cátodo — mnemônico: cátodo/redução, ambos com consoante inicial."
  },
  {
   "id": "flash-quimica-eletroquimica-14",
   "frente": "Qual é o sinal do ânodo numa pilha?",
   "verso": "Negativo — é de onde os elétrons partem para o circuito externo."
  },
  {
   "id": "flash-quimica-eletroquimica-15",
   "frente": "Em que sentido fluem os elétrons no circuito externo de uma pilha?",
   "verso": "Do ânodo para o cátodo, sempre."
  },
  {
   "id": "flash-quimica-eletroquimica-16",
   "frente": "Para que serve a ponte salina numa pilha?",
   "verso": "Para manter a neutralidade elétrica das soluções, permitindo a migração de íons entre as semicelas e fechando o circuito."
  },
  {
   "id": "flash-quimica-eletroquimica-17",
   "frente": "Como se calcula a ddp padrão de uma pilha?",
   "verso": "ΔE° = E°(cátodo) − E°(ânodo), usando os potenciais de redução."
  },
  {
   "id": "flash-quimica-eletroquimica-18",
   "frente": "O que indica um ΔE° positivo?",
   "verso": "Que a reação é espontânea — a pilha funciona no sentido escrito."
  },
  {
   "id": "flash-quimica-eletroquimica-19",
   "frente": "Qual espécie funciona como cátodo, entre duas de potenciais conhecidos?",
   "verso": "A de MAIOR potencial de redução — ela é a que efetivamente se reduz."
  },
  {
   "id": "flash-quimica-eletroquimica-20",
   "frente": "Como se lê a notação Zn | Zn²⁺ || Cu²⁺ | Cu?",
   "verso": "O ânodo fica à esquerda e o cátodo à direita; a barra dupla representa a ponte salina."
  },
  {
   "id": "flash-quimica-eletroquimica-21",
   "frente": "O que acontece com a massa do eletrodo do ânodo ao longo do funcionamento?",
   "verso": "Diminui, pois o metal se oxida e passa à solução como íon."
  },
  {
   "id": "flash-quimica-eletroquimica-22",
   "frente": "O que é eletrólise?",
   "verso": "Um processo NÃO espontâneo em que a corrente elétrica força uma reação de oxirredução."
  },
  {
   "id": "flash-quimica-eletroquimica-23",
   "frente": "Qual é a diferença essencial entre pilha e eletrólise?",
   "verso": "A pilha gera corrente a partir de reação espontânea; a eletrólise consome corrente para forçar reação não espontânea."
  },
  {
   "id": "flash-quimica-eletroquimica-24",
   "frente": "Qual é o sinal do ânodo na eletrólise?",
   "verso": "Positivo — o inverso da pilha, porque agora é a fonte externa que impõe a polaridade."
  },
  {
   "id": "flash-quimica-eletroquimica-25",
   "frente": "O que é eletrólise ígnea?",
   "verso": "A realizada com a substância pura fundida, sem água — é como se obtém alumínio e sódio metálicos."
  },
  {
   "id": "flash-quimica-eletroquimica-26",
   "frente": "Na eletrólise aquosa, o que compete com os íons do soluto?",
   "verso": "A própria água, que pode se oxidar ou reduzir preferencialmente conforme os potenciais envolvidos."
  },
  {
   "id": "flash-quimica-eletroquimica-27",
   "frente": "O que é a galvanoplastia?",
   "verso": "O recobrimento eletrolítico de uma peça com uma camada fina de metal, como na cromação e na niquelação."
  },
  {
   "id": "flash-quimica-eletroquimica-28",
   "frente": "O que é a corrosão do ferro, quimicamente?",
   "verso": "A oxidação espontânea do ferro na presença de oxigênio e água, formando óxido de ferro hidratado — a ferrugem."
  },
  {
   "id": "flash-quimica-eletroquimica-29",
   "frente": "O que é um metal de sacrifício?",
   "verso": "Um metal mais facilmente oxidável (como o zinco) ligado à peça a proteger, oxidando-se no lugar dela."
  },
  {
   "id": "flash-quimica-eletroquimica-30",
   "frente": "Por que o zinco protege o ferro na galvanização?",
   "verso": "Porque tem menor potencial de redução: oxida-se preferencialmente, funcionando como ânodo de sacrifício."
  },
  {
   "id": "flash-quimica-eletroquimica-31",
   "frente": "Por que a corrosão é mais rápida em ambiente marinho?",
   "verso": "Porque os sais dissolvidos aumentam a condutividade do meio, acelerando a transferência de elétrons."
  },
  {
   "id": "flash-quimica-eletroquimica-32",
   "frente": "O que diferencia uma pilha comum de uma bateria recarregável?",
   "verso": "A recarregável tem reação de oxirredução reversível, podendo ser revertida pela aplicação de corrente externa."
  },
  {
   "id": "flash-quimica-eletroquimica-33",
   "frente": "Por que pilhas e baterias não devem ir ao lixo comum?",
   "verso": "Contêm metais pesados (mercúrio, cádmio, chumbo) que contaminam solo e água e bioacumulam na cadeia alimentar."
  }
 ],
 "quimica-atomistica-ligacoes": [
  {
   "id": "flash-quimica-atomistica-ligacoes-01",
   "frente": "Qual foi a contribuição do modelo atômico de Rutherford?",
   "verso": "Mostrou que o átomo é praticamente vazio, com um núcleo pequeno, denso e positivo, e elétrons ao redor."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-02",
   "frente": "Qual foi a novidade do modelo de Bohr?",
   "verso": "Os elétrons ocupam órbitas de energia definida (níveis), emitindo ou absorvendo energia apenas ao saltar entre elas."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-03",
   "frente": "O que define o número atômico (Z) de um elemento?",
   "verso": "O número de prótons no núcleo — é ele que identifica o elemento."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-04",
   "frente": "O que é o número de massa (A)?",
   "verso": "A soma de prótons e nêutrons do núcleo."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-05",
   "frente": "O que são isótopos?",
   "verso": "Átomos do mesmo elemento (mesmo Z) com números de nêutrons diferentes, logo massas diferentes."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-06",
   "frente": "O que são isóbaros?",
   "verso": "Átomos de elementos diferentes (Z diferente) com o mesmo número de massa."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-07",
   "frente": "O que são isótonos?",
   "verso": "Átomos de elementos diferentes com o mesmo número de nêutrons."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-08",
   "frente": "Quantos elétrons um átomo neutro possui?",
   "verso": "O mesmo número de prótons, ou seja, igual ao número atômico."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-09",
   "frente": "O que é um cátion e como ele se forma?",
   "verso": "Um íon positivo, formado quando o átomo PERDE elétrons."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-10",
   "frente": "O que é um ânion e como ele se forma?",
   "verso": "Um íon negativo, formado quando o átomo GANHA elétrons."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-11",
   "frente": "Como os elementos estão organizados na tabela periódica?",
   "verso": "Em ordem crescente de número atômico, com períodos (linhas) e famílias/grupos (colunas)."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-12",
   "frente": "O que os elementos de uma mesma família têm em comum?",
   "verso": "O mesmo número de elétrons na camada de valência, o que lhes dá propriedades químicas semelhantes."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-13",
   "frente": "O que o número do período indica?",
   "verso": "A quantidade de camadas eletrônicas ocupadas pelos átomos daquele elemento."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-14",
   "frente": "Que características têm os metais alcalinos (família 1A)?",
   "verso": "Um elétron de valência, altíssima reatividade e forte tendência a formar cátions +1."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-15",
   "frente": "Que características têm os halogênios (família 7A)?",
   "verso": "Sete elétrons de valência e forte tendência a ganhar um elétron, formando ânions −1."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-16",
   "frente": "Por que os gases nobres são pouco reativos?",
   "verso": "Porque já têm a camada de valência completa (oito elétrons, ou dois no hélio), sem tendência a ganhar ou perder elétrons."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-17",
   "frente": "Como o raio atômico varia num período?",
   "verso": "Diminui da esquerda para a direita, pois a carga nuclear cresce e atrai mais fortemente a mesma camada."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-18",
   "frente": "Como o raio atômico varia numa família?",
   "verso": "Aumenta de cima para baixo, pois novas camadas eletrônicas são acrescentadas."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-19",
   "frente": "O que é eletronegatividade?",
   "verso": "A tendência de um átomo em atrair para si o par de elétrons de uma ligação química."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-20",
   "frente": "Qual é o elemento mais eletronegativo da tabela?",
   "verso": "O flúor."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-21",
   "frente": "O que é energia de ionização?",
   "verso": "A energia necessária para retirar um elétron de um átomo no estado gasoso."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-22",
   "frente": "O que diz a regra do octeto?",
   "verso": "Os átomos tendem a adquirir oito elétrons na camada de valência, atingindo a configuração estável de gás nobre."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-23",
   "frente": "O que caracteriza a ligação iônica?",
   "verso": "A TRANSFERÊNCIA de elétrons entre um metal e um ametal, gerando íons que se atraem eletrostaticamente."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-24",
   "frente": "O que caracteriza a ligação covalente?",
   "verso": "O COMPARTILHAMENTO de pares de elétrons entre átomos, tipicamente entre ametais."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-25",
   "frente": "O que caracteriza a ligação metálica?",
   "verso": "Cátions metálicos imersos num 'mar' de elétrons livres, o que explica a condutividade e a maleabilidade dos metais."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-26",
   "frente": "Por que compostos iônicos conduzem corrente quando fundidos ou dissolvidos, mas não sólidos?",
   "verso": "Porque só nessas condições os íons ficam livres para se movimentar e transportar carga."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-27",
   "frente": "Que propriedades típicas têm os compostos iônicos?",
   "verso": "Sólidos à temperatura ambiente, altos pontos de fusão e ebulição, duros e quebradiços."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-28",
   "frente": "O que determina a geometria de uma molécula, pela teoria VSEPR?",
   "verso": "A repulsão entre os pares de elétrons ao redor do átomo central, incluindo os pares não ligantes."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-29",
   "frente": "Qual é a geometria da molécula de água, e por quê?",
   "verso": "Angular — o oxigênio tem dois pares não ligantes que repelem os hidrogênios, fechando o ângulo."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-30",
   "frente": "Qual é a geometria do CO₂?",
   "verso": "Linear, pois o carbono central não tem pares de elétrons não ligantes."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-31",
   "frente": "Quando uma molécula é polar?",
   "verso": "Quando há diferença de eletronegatividade entre os átomos E a geometria não cancela os vetores de polaridade."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-32",
   "frente": "Por que o CO₂ é apolar mesmo tendo ligações polares?",
   "verso": "Porque sua geometria linear e simétrica faz os dois vetores de polaridade se cancelarem."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-33",
   "frente": "O que é a ligação de hidrogênio?",
   "verso": "A força intermolecular mais intensa, entre hidrogênio ligado a F, O ou N e um par de elétrons de outra molécula."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-34",
   "frente": "Por que a água tem ponto de ebulição tão alto para sua massa molar?",
   "verso": "Por causa das ligações de hidrogênio entre suas moléculas, que exigem muita energia para serem rompidas."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-35",
   "frente": "O que são forças de dipolo induzido (van der Waals/London)?",
   "verso": "As forças intermoleculares mais fracas, presentes em todas as moléculas, únicas nas apolares."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-36",
   "frente": "Como as forças intermoleculares afetam o ponto de ebulição?",
   "verso": "Quanto mais intensas, maior o ponto de ebulição, pois é preciso mais energia para separar as moléculas."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-37",
   "frente": "Por que 'semelhante dissolve semelhante'?",
   "verso": "Porque solvente e soluto de mesma polaridade estabelecem entre si interações comparáveis às que já mantinham."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-38",
   "frente": "O que é radioatividade?",
   "verso": "A emissão espontânea de partículas ou radiação por núcleos instáveis, que se transformam em outros núcleos."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-39",
   "frente": "O que é uma partícula alfa, e o que ela faz com o núcleo?",
   "verso": "Um núcleo de hélio (2 prótons e 2 nêutrons); sua emissão reduz Z em 2 e A em 4."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-40",
   "frente": "O que é uma partícula beta, e qual seu efeito no núcleo?",
   "verso": "Um elétron emitido pela conversão de um nêutron em próton; aumenta Z em 1 e mantém A."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-41",
   "frente": "O que é meia-vida de um isótopo radioativo?",
   "verso": "O tempo necessário para que metade dos núcleos de uma amostra se desintegre."
  },
  {
   "id": "flash-quimica-atomistica-ligacoes-42",
   "frente": "Qual é a diferença entre fissão e fusão nuclear?",
   "verso": "A fissão quebra um núcleo pesado em núcleos menores; a fusão une núcleos leves em um mais pesado, como ocorre no Sol."
  }
 ],
 "quimica-equilibrio-acido-base": [
  {
   "id": "flash-quimica-equilibrio-acido-base-01",
   "frente": "O que caracteriza um equilíbrio químico?",
   "verso": "As velocidades das reações direta e inversa se igualam, e as concentrações de reagentes e produtos ficam constantes — é dinâmico, não estático."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-02",
   "frente": "Como se escreve a constante de equilíbrio Kc?",
   "verso": "Produto das concentrações dos produtos sobre o das concentrações dos reagentes, cada uma elevada ao seu coeficiente estequiométrico."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-03",
   "frente": "O que um valor de Kc muito maior que 1 indica?",
   "verso": "O equilíbrio está deslocado para a direita — predominam os produtos."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-04",
   "frente": "O que um valor de Kc muito menor que 1 indica?",
   "verso": "O equilíbrio está deslocado para a esquerda — predominam os reagentes."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-05",
   "frente": "Sólidos e líquidos puros entram na expressão de Kc?",
   "verso": "Não — suas concentrações são constantes e já estão embutidas no valor da constante."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-06",
   "frente": "O que é Kp?",
   "verso": "A constante de equilíbrio expressa em pressões parciais dos gases participantes, em vez de concentrações."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-07",
   "frente": "O que diz o Princípio de Le Chatelier?",
   "verso": "Perturbado um equilíbrio, o sistema se desloca no sentido que minimiza a perturbação."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-08",
   "frente": "O que acontece ao aumentar a concentração de um reagente?",
   "verso": "O equilíbrio se desloca para a direita, consumindo o excesso e formando mais produto."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-09",
   "frente": "O que acontece ao remover um produto do sistema em equilíbrio?",
   "verso": "O equilíbrio se desloca para a direita, repondo o produto retirado."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-10",
   "frente": "Como o aumento da pressão desloca um equilíbrio gasoso?",
   "verso": "Para o lado com MENOR número de mols de gás, reduzindo o volume ocupado."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-11",
   "frente": "Como o aumento da temperatura desloca um equilíbrio?",
   "verso": "No sentido ENDOTÉRMICO, que absorve o calor adicionado."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-12",
   "frente": "Qual é o único fator que altera o VALOR da constante de equilíbrio?",
   "verso": "A temperatura. Concentração e pressão deslocam o equilíbrio, mas não mudam Kc."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-13",
   "frente": "Um catalisador desloca o equilíbrio?",
   "verso": "Não. Ele acelera igualmente as reações direta e inversa, apenas fazendo o equilíbrio ser atingido mais rápido."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-14",
   "frente": "O que é um ácido, segundo Arrhenius?",
   "verso": "Toda substância que, em água, libera H⁺ como único cátion."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-15",
   "frente": "O que é uma base, segundo Arrhenius?",
   "verso": "Toda substância que, em água, libera OH⁻ como único ânion."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-16",
   "frente": "O que é um ácido, segundo Brønsted-Lowry?",
   "verso": "Uma espécie doadora de próton (H⁺); a base é a receptora."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-17",
   "frente": "O que é um par ácido-base conjugado?",
   "verso": "Duas espécies que diferem por um único H⁺, como HCl e Cl⁻, ou NH₃ e NH₄⁺."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-18",
   "frente": "O que caracteriza um ácido forte?",
   "verso": "Ioniza-se praticamente por completo em água, com alto grau de ionização — como HCl, HBr, HI, H₂SO₄ e HNO₃."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-19",
   "frente": "O que caracteriza um ácido fraco?",
   "verso": "Ioniza-se apenas parcialmente, estabelecendo um equilíbrio entre a forma molecular e os íons — como o ácido acético."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-20",
   "frente": "O que é o grau de ionização (α)?",
   "verso": "A fração das moléculas dissolvidas que efetivamente se ionizam, geralmente expressa em porcentagem."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-21",
   "frente": "O que representa Ka?",
   "verso": "A constante de ionização de um ácido; quanto maior o Ka, mais forte o ácido."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-22",
   "frente": "Quanto vale Kw a 25 °C, e o que ele representa?",
   "verso": "1,0 × 10⁻¹⁴ — o produto iônico da água, [H⁺] × [OH⁻]."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-23",
   "frente": "Como se calcula o pH?",
   "verso": "pH = −log[H⁺]."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-24",
   "frente": "Qual é a relação entre pH e pOH a 25 °C?",
   "verso": "pH + pOH = 14."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-25",
   "frente": "Qual é o pH de uma solução neutra a 25 °C?",
   "verso": "7, com [H⁺] = [OH⁻] = 10⁻⁷ mol/L."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-26",
   "frente": "Uma solução com pH 3 é quantas vezes mais ácida que uma com pH 5?",
   "verso": "100 vezes — a escala é logarítmica, e cada unidade equivale a um fator de 10."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-27",
   "frente": "O que é uma reação de neutralização?",
   "verso": "A reação entre um ácido e uma base, formando sal e água."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-28",
   "frente": "Por que a solução de um sal como NaCl tem pH neutro?",
   "verso": "Porque vem de ácido forte e base forte: nenhum dos íons sofre hidrólise significativa."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-29",
   "frente": "Que pH tem a solução de um sal de ácido fraco com base forte, como o acetato de sódio?",
   "verso": "Básico — o ânion do ácido fraco hidrolisa a água, liberando OH⁻."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-30",
   "frente": "O que é uma solução-tampão?",
   "verso": "Uma mistura de ácido fraco com seu sal (ou base fraca com seu sal) que resiste a variações de pH ao receber ácido ou base."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-31",
   "frente": "Como o tampão mantém o pH quase constante?",
   "verso": "Suas espécies conjugadas consomem tanto o H⁺ quanto o OH⁻ adicionados, convertendo-os na forma conjugada correspondente."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-32",
   "frente": "Qual é o principal tampão do sangue humano?",
   "verso": "O sistema bicarbonato/ácido carbônico (HCO₃⁻/H₂CO₃), que mantém o pH sanguíneo em torno de 7,4."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-33",
   "frente": "Para que serve a fenolftaleína como indicador?",
   "verso": "Fica incolor em meio ácido e rosa em meio básico, marcando a viragem em torno de pH 8-10."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-34",
   "frente": "O que é Kps (produto de solubilidade)?",
   "verso": "A constante de equilíbrio da dissolução de um sal pouco solúvel, igual ao produto das concentrações dos íons elevadas aos coeficientes."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-35",
   "frente": "Quando ocorre precipitação, em termos de Kps?",
   "verso": "Quando o produto das concentrações iônicas ultrapassa o valor de Kps, o excesso precipita."
  },
  {
   "id": "flash-quimica-equilibrio-acido-base-36",
   "frente": "O que é o efeito do íon comum?",
   "verso": "A diminuição da ionização (ou da solubilidade) causada pela adição de um íon já presente no equilíbrio, deslocando-o no sentido inverso."
  }
 ],
 "quimica-estequiometria": [
  {
   "id": "flash-quimica-estequiometria-01",
   "frente": "O que é 1 mol de uma substância?",
   "verso": "A quantidade que contém 6,02 × 10²³ entidades (átomos, moléculas, íons) — o número de Avogadro."
  },
  {
   "id": "flash-quimica-estequiometria-02",
   "frente": "O que é a massa molar de uma substância?",
   "verso": "A massa de 1 mol dela, em g/mol; numericamente igual à massa molecular em unidades de massa atômica."
  },
  {
   "id": "flash-quimica-estequiometria-03",
   "frente": "Como se calcula o número de mols a partir da massa?",
   "verso": "n = massa (g) ÷ massa molar (g/mol)."
  },
  {
   "id": "flash-quimica-estequiometria-04",
   "frente": "Qual é o volume molar de um gás nas CNTP?",
   "verso": "22,4 L/mol, a 0 °C e 1 atm."
  },
  {
   "id": "flash-quimica-estequiometria-05",
   "frente": "Como calcular a massa molar da água (H₂O)?",
   "verso": "2 × 1 + 16 = 18 g/mol."
  },
  {
   "id": "flash-quimica-estequiometria-06",
   "frente": "O que significa balancear uma equação química?",
   "verso": "Igualar o número de átomos de cada elemento nos dois lados, respeitando a Lei da Conservação das Massas."
  },
  {
   "id": "flash-quimica-estequiometria-07",
   "frente": "O que diz a Lei de Lavoisier?",
   "verso": "Numa reação química, a massa total dos reagentes é igual à massa total dos produtos — nada se perde, nada se cria."
  },
  {
   "id": "flash-quimica-estequiometria-08",
   "frente": "O que diz a Lei de Proust (proporções definidas)?",
   "verso": "Uma substância pura sempre apresenta a mesma proporção em massa entre seus elementos, qualquer que seja sua origem."
  },
  {
   "id": "flash-quimica-estequiometria-09",
   "frente": "O que os coeficientes de uma equação balanceada representam?",
   "verso": "A proporção em MOLS (e, para gases nas mesmas condições, em volume) entre reagentes e produtos — não em massa."
  },
  {
   "id": "flash-quimica-estequiometria-10",
   "frente": "Como montar uma regra de três estequiométrica?",
   "verso": "Escreva a proporção em mols da equação balanceada, converta para a grandeza pedida (massa, volume, moléculas) e monte a proporção."
  },
  {
   "id": "flash-quimica-estequiometria-11",
   "frente": "O que é o reagente limitante?",
   "verso": "Aquele que se esgota primeiro e, por isso, determina a quantidade máxima de produto formada."
  },
  {
   "id": "flash-quimica-estequiometria-12",
   "frente": "Como identificar o reagente limitante num problema?",
   "verso": "Calcule quantos mols de produto cada reagente geraria sozinho; o que gerar MENOS produto é o limitante."
  },
  {
   "id": "flash-quimica-estequiometria-13",
   "frente": "O que é o reagente em excesso?",
   "verso": "Aquele que sobra depois que o limitante se esgota; a quantidade que sobra pode ser calculada por diferença."
  },
  {
   "id": "flash-quimica-estequiometria-14",
   "frente": "O que é rendimento de uma reação?",
   "verso": "A razão entre a massa realmente obtida e a massa teoricamente prevista, em porcentagem."
  },
  {
   "id": "flash-quimica-estequiometria-15",
   "frente": "Como calcular a massa real obtida a partir do rendimento?",
   "verso": "Massa real = massa teórica × (rendimento ÷ 100)."
  },
  {
   "id": "flash-quimica-estequiometria-16",
   "frente": "O que significa dizer que uma amostra tem 80% de pureza?",
   "verso": "Só 80% da massa da amostra é a substância que reage; os 20% restantes são inertes e devem ser descontados antes do cálculo."
  },
  {
   "id": "flash-quimica-estequiometria-17",
   "frente": "Em que ordem se aplicam pureza e rendimento num cálculo estequiométrico?",
   "verso": "Primeiro desconte a pureza (entra menos reagente), faça a estequiometria, e só então aplique o rendimento ao produto."
  },
  {
   "id": "flash-quimica-estequiometria-18",
   "frente": "Quantas moléculas há em 1 mol de qualquer substância molecular?",
   "verso": "6,02 × 10²³ moléculas."
  },
  {
   "id": "flash-quimica-estequiometria-19",
   "frente": "Como converter mols em número de partículas?",
   "verso": "Multiplique o número de mols pelo número de Avogadro (6,02 × 10²³)."
  },
  {
   "id": "flash-quimica-estequiometria-20",
   "frente": "Como converter volume de gás nas CNTP em mols?",
   "verso": "Divida o volume em litros por 22,4 L/mol."
  },
  {
   "id": "flash-quimica-estequiometria-21",
   "frente": "Como se calcula a massa molecular do CO₂?",
   "verso": "12 + 2 × 16 = 44 u, portanto massa molar de 44 g/mol."
  },
  {
   "id": "flash-quimica-estequiometria-22",
   "frente": "O que diz a Lei de Gay-Lussac para volumes gasosos?",
   "verso": "Nas mesmas condições de pressão e temperatura, os volumes dos gases participantes guardam entre si uma proporção de números inteiros e pequenos."
  },
  {
   "id": "flash-quimica-estequiometria-23",
   "frente": "Numa reação, se dobro a massa do reagente limitante, o que acontece com o produto?",
   "verso": "A massa de produto também dobra — a relação estequiométrica é proporcional."
  },
  {
   "id": "flash-quimica-estequiometria-24",
   "frente": "O que é uma fórmula mínima (empírica)?",
   "verso": "A que exprime a MENOR proporção de números inteiros entre os átomos dos elementos de um composto."
  },
  {
   "id": "flash-quimica-estequiometria-25",
   "frente": "Qual é a diferença entre fórmula mínima e molecular?",
   "verso": "A molecular indica o número real de átomos por molécula; a mínima, apenas a proporção. A molecular é sempre um múltiplo inteiro da mínima."
  },
  {
   "id": "flash-quimica-estequiometria-26",
   "frente": "Como se determina a fórmula mínima a partir das porcentagens em massa?",
   "verso": "Divida cada porcentagem pela massa atômica do elemento e, em seguida, todos os resultados pelo menor deles."
  },
  {
   "id": "flash-quimica-estequiometria-27",
   "frente": "Por que não se pode somar massas diretamente na proporção de uma equação?",
   "verso": "Porque os coeficientes valem para mols, e mols diferentes têm massas diferentes — é preciso converter antes."
  },
  {
   "id": "flash-quimica-estequiometria-28",
   "frente": "Como calcular a massa de produto a partir de um volume de solução com concentração conhecida?",
   "verso": "Multiplique volume por concentração para obter mols, aplique a proporção estequiométrica e converta o resultado em massa."
  },
  {
   "id": "flash-quimica-estequiometria-29",
   "frente": "O que é a equação geral dos gases ideais?",
   "verso": "PV = nRT, com n em mols e R a constante universal dos gases."
  },
  {
   "id": "flash-quimica-estequiometria-30",
   "frente": "Como usar PV = nRT num cálculo estequiométrico fora das CNTP?",
   "verso": "Isole n = PV/RT para achar os mols do gás e siga com a proporção da equação balanceada."
  },
  {
   "id": "flash-quimica-estequiometria-31",
   "frente": "Numa combustão completa de hidrocarboneto, quais são os produtos?",
   "verso": "Gás carbônico (CO₂) e água (H₂O)."
  },
  {
   "id": "flash-quimica-estequiometria-32",
   "frente": "Por que o balanceamento de uma combustão costuma começar por carbono e hidrogênio?",
   "verso": "Porque eles aparecem em um único produto cada; o oxigênio, presente em ambos, é balanceado por último."
  },
  {
   "id": "flash-quimica-estequiometria-33",
   "frente": "O que é o excesso de reagente em termos práticos de laboratório?",
   "verso": "Usar mais de um reagente (geralmente o mais barato) para garantir o consumo total do outro, mais caro ou limitante."
  }
 ],
 "quimica-organica": [
  {
   "id": "flash-quimica-organica-01",
   "frente": "O que caracteriza um composto orgânico?",
   "verso": "Ter o carbono como elemento central, formando cadeias, geralmente ligado a hidrogênio, oxigênio, nitrogênio ou halogênios."
  },
  {
   "id": "flash-quimica-organica-02",
   "frente": "Quantas ligações o carbono faz, e por quê?",
   "verso": "Quatro, por ter quatro elétrons na camada de valência — é tetravalente."
  },
  {
   "id": "flash-quimica-organica-03",
   "frente": "O que é um carbono primário?",
   "verso": "Aquele ligado a apenas um outro átomo de carbono."
  },
  {
   "id": "flash-quimica-organica-04",
   "frente": "O que é um carbono quaternário?",
   "verso": "Aquele ligado a quatro outros átomos de carbono."
  },
  {
   "id": "flash-quimica-organica-05",
   "frente": "O que é um carbono quiral (assimétrico)?",
   "verso": "Aquele ligado a quatro grupos diferentes entre si — é o que gera isomeria óptica."
  },
  {
   "id": "flash-quimica-organica-06",
   "frente": "Qual é a diferença entre cadeia aberta e fechada?",
   "verso": "A aberta (acíclica) tem extremidades livres; a fechada (cíclica) forma um anel."
  },
  {
   "id": "flash-quimica-organica-07",
   "frente": "O que é uma cadeia homogênea?",
   "verso": "Aquela que só tem carbonos na cadeia principal, sem heteroátomo entre eles."
  },
  {
   "id": "flash-quimica-organica-08",
   "frente": "O que é um heteroátomo?",
   "verso": "Um átomo diferente de carbono situado ENTRE carbonos na cadeia, como o oxigênio de um éter."
  },
  {
   "id": "flash-quimica-organica-09",
   "frente": "O que caracteriza um alcano?",
   "verso": "Hidrocarboneto de cadeia aberta com apenas ligações simples; sufixo -ano."
  },
  {
   "id": "flash-quimica-organica-10",
   "frente": "O que caracteriza um alceno?",
   "verso": "Hidrocarboneto de cadeia aberta com uma dupla ligação entre carbonos; sufixo -eno."
  },
  {
   "id": "flash-quimica-organica-11",
   "frente": "O que caracteriza um alcino?",
   "verso": "Hidrocarboneto de cadeia aberta com uma tripla ligação entre carbonos; sufixo -ino."
  },
  {
   "id": "flash-quimica-organica-12",
   "frente": "O que caracteriza um composto aromático?",
   "verso": "Ter anel benzênico, com elétrons deslocalizados que lhe dão estabilidade especial."
  },
  {
   "id": "flash-quimica-organica-13",
   "frente": "Qual é o grupo funcional do álcool?",
   "verso": "A hidroxila (−OH) ligada a carbono saturado; sufixo -ol."
  },
  {
   "id": "flash-quimica-organica-14",
   "frente": "Qual é o grupo funcional do ácido carboxílico?",
   "verso": "A carboxila (−COOH); sufixo -oico."
  },
  {
   "id": "flash-quimica-organica-15",
   "frente": "Qual é o grupo funcional do aldeído?",
   "verso": "A carbonila na EXTREMIDADE da cadeia (−CHO); sufixo -al."
  },
  {
   "id": "flash-quimica-organica-16",
   "frente": "Qual é o grupo funcional da cetona?",
   "verso": "A carbonila entre dois carbonos, no MEIO da cadeia; sufixo -ona."
  },
  {
   "id": "flash-quimica-organica-17",
   "frente": "Qual é a diferença estrutural entre aldeído e cetona?",
   "verso": "A posição da carbonila: na ponta da cadeia é aldeído, no meio é cetona."
  },
  {
   "id": "flash-quimica-organica-18",
   "frente": "O que caracteriza um éster?",
   "verso": "O grupo −COO− entre cadeias carbônicas; responde pelos aromas de frutas e forma os óleos e gorduras."
  },
  {
   "id": "flash-quimica-organica-19",
   "frente": "O que caracteriza um éter?",
   "verso": "Um oxigênio ligado entre dois carbonos (R−O−R)."
  },
  {
   "id": "flash-quimica-organica-20",
   "frente": "O que caracteriza uma amina?",
   "verso": "Deriva da amônia pela substituição de um ou mais hidrogênios por radicais orgânicos; tem caráter básico."
  },
  {
   "id": "flash-quimica-organica-21",
   "frente": "O que caracteriza uma amida?",
   "verso": "Tem o grupo −CONH₂, resultante da união de carboxila com nitrogênio; a ligação peptídica das proteínas é uma amida."
  },
  {
   "id": "flash-quimica-organica-22",
   "frente": "Como se monta o nome de um composto orgânico?",
   "verso": "Prefixo (número de carbonos) + infixo (tipo de ligação) + sufixo (função), com ramificações numeradas."
  },
  {
   "id": "flash-quimica-organica-23",
   "frente": "Que prefixos correspondem a 1, 2, 3 e 4 carbonos?",
   "verso": "met-, et-, prop- e but-."
  },
  {
   "id": "flash-quimica-organica-24",
   "frente": "Como se numera a cadeia principal na nomenclatura IUPAC?",
   "verso": "Pela extremidade que atribui os MENORES números ao grupo funcional, às insaturações e às ramificações."
  },
  {
   "id": "flash-quimica-organica-25",
   "frente": "O que é isomeria?",
   "verso": "O fenômeno em que compostos diferentes compartilham a mesma fórmula molecular, diferindo na estrutura ou no arranjo espacial."
  },
  {
   "id": "flash-quimica-organica-26",
   "frente": "O que é isomeria de cadeia?",
   "verso": "Isômeros com a mesma função, diferindo no tipo de cadeia — por exemplo, normal contra ramificada."
  },
  {
   "id": "flash-quimica-organica-27",
   "frente": "O que é isomeria de função?",
   "verso": "Isômeros de mesma fórmula molecular pertencentes a funções orgânicas diferentes, como um álcool e um éter."
  },
  {
   "id": "flash-quimica-organica-28",
   "frente": "O que é isomeria geométrica (cis-trans)?",
   "verso": "Ocorre em duplas ligações ou ciclos: cis tem os grupos iguais do mesmo lado, trans em lados opostos."
  },
  {
   "id": "flash-quimica-organica-29",
   "frente": "Que condição é necessária para haver isomeria geométrica numa dupla ligação?",
   "verso": "Cada carbono da dupla precisa ter dois ligantes DIFERENTES entre si."
  },
  {
   "id": "flash-quimica-organica-30",
   "frente": "O que é isomeria óptica?",
   "verso": "A que ocorre em moléculas com carbono quiral, gerando isômeros que são imagens especulares não sobreponíveis (enantiômeros)."
  },
  {
   "id": "flash-quimica-organica-31",
   "frente": "O que é uma reação de adição, típica de alcenos?",
   "verso": "A quebra da ligação dupla, com entrada de dois novos grupos nos carbonos que a formavam."
  },
  {
   "id": "flash-quimica-organica-32",
   "frente": "O que é uma reação de substituição, típica de alcanos e aromáticos?",
   "verso": "A troca de um hidrogênio por outro átomo ou grupo, mantendo a estrutura da cadeia."
  },
  {
   "id": "flash-quimica-organica-33",
   "frente": "O que é uma reação de esterificação?",
   "verso": "A reação entre ácido carboxílico e álcool, produzindo éster e água."
  },
  {
   "id": "flash-quimica-organica-34",
   "frente": "O que é saponificação?",
   "verso": "A hidrólise básica de um éster de ácido graxo (gordura), produzindo sabão e glicerol."
  },
  {
   "id": "flash-quimica-organica-35",
   "frente": "O que é um polímero?",
   "verso": "Uma macromolécula formada pela repetição de unidades menores, os monômeros."
  },
  {
   "id": "flash-quimica-organica-36",
   "frente": "Qual é a diferença entre polimerização por adição e por condensação?",
   "verso": "Na adição, os monômeros insaturados se unem sem perda de átomos; na condensação, cada ligação libera uma molécula pequena, como água."
  },
  {
   "id": "flash-quimica-organica-37",
   "frente": "De que monômero deriva o PET, e onde ele é usado?",
   "verso": "De ácido tereftálico com etilenoglicol, por condensação; é usado em garrafas e fibras têxteis, e é amplamente reciclável."
  },
  {
   "id": "flash-quimica-organica-38",
   "frente": "O que é um polímero biodegradável?",
   "verso": "Aquele que pode ser decomposto por microrganismos em prazo curto, ao contrário dos plásticos convencionais, que persistem por séculos."
  }
 ],
 "quimica-solucoes": [
  {
   "id": "flash-quimica-solucoes-01",
   "frente": "O que é um soluto e o que é um solvente?",
   "verso": "Soluto é a substância dissolvida (em menor quantidade); solvente é o meio que dissolve (em maior quantidade)."
  },
  {
   "id": "flash-quimica-solucoes-02",
   "frente": "O que é uma solução?",
   "verso": "Uma mistura HOMOGÊNEA de duas ou mais substâncias, com partículas dispersas em nível molecular ou iônico."
  },
  {
   "id": "flash-quimica-solucoes-03",
   "frente": "O que é concentração comum (C), e qual sua unidade?",
   "verso": "A massa de soluto por volume de solução: C = m/V, em g/L."
  },
  {
   "id": "flash-quimica-solucoes-04",
   "frente": "O que é concentração em quantidade de matéria (molaridade)?",
   "verso": "O número de mols de soluto por litro de solução: M = n/V, em mol/L."
  },
  {
   "id": "flash-quimica-solucoes-05",
   "frente": "Como converter concentração comum em molaridade?",
   "verso": "M = C ÷ massa molar do soluto."
  },
  {
   "id": "flash-quimica-solucoes-06",
   "frente": "O que é título em massa, e como se relaciona com a porcentagem?",
   "verso": "É a razão entre a massa do soluto e a massa da solução; multiplicado por 100, dá a porcentagem em massa."
  },
  {
   "id": "flash-quimica-solucoes-07",
   "frente": "O que significa uma solução de 5 ppm?",
   "verso": "5 partes de soluto por milhão de partes de solução — equivale a 5 mg de soluto por litro em soluções aquosas diluídas."
  },
  {
   "id": "flash-quimica-solucoes-08",
   "frente": "O que acontece com a quantidade de soluto numa diluição?",
   "verso": "Ela NÃO muda — só o volume de solvente aumenta, por isso a concentração cai."
  },
  {
   "id": "flash-quimica-solucoes-09",
   "frente": "Qual é a fórmula da diluição?",
   "verso": "C₁V₁ = C₂V₂ (ou M₁V₁ = M₂V₂), porque a quantidade de soluto se conserva."
  },
  {
   "id": "flash-quimica-solucoes-10",
   "frente": "Como calcular a concentração ao misturar duas soluções do MESMO soluto?",
   "verso": "Some as quantidades de soluto (C₁V₁ + C₂V₂) e divida pela soma dos volumes."
  },
  {
   "id": "flash-quimica-solucoes-11",
   "frente": "O que é uma solução saturada?",
   "verso": "Aquela que contém a quantidade máxima de soluto dissolvida naquela temperatura — está no limite do coeficiente de solubilidade."
  },
  {
   "id": "flash-quimica-solucoes-12",
   "frente": "O que é o coeficiente de solubilidade?",
   "verso": "A quantidade máxima de soluto que se dissolve numa quantidade padrão de solvente, a uma dada temperatura."
  },
  {
   "id": "flash-quimica-solucoes-13",
   "frente": "O que é uma solução supersaturada?",
   "verso": "Aquela que contém MAIS soluto dissolvido do que o coeficiente de solubilidade permite; é instável e precipita ao menor distúrbio."
  },
  {
   "id": "flash-quimica-solucoes-14",
   "frente": "O que é o corpo de fundo de uma solução?",
   "verso": "O soluto não dissolvido que se deposita quando se ultrapassa o limite de saturação."
  },
  {
   "id": "flash-quimica-solucoes-15",
   "frente": "Como a temperatura afeta a solubilidade da maioria dos sais sólidos?",
   "verso": "Aumenta — a dissolução da maioria dos sólidos é endotérmica, e o aquecimento favorece o processo."
  },
  {
   "id": "flash-quimica-solucoes-16",
   "frente": "Como a temperatura afeta a solubilidade dos gases em água?",
   "verso": "Diminui — por isso a água quente perde gás dissolvido, e a poluição térmica reduz o oxigênio disponível aos peixes."
  },
  {
   "id": "flash-quimica-solucoes-17",
   "frente": "Como a pressão afeta a solubilidade de um gás?",
   "verso": "É diretamente proporcional (Lei de Henry) — por isso um refrigerante libera gás quando a garrafa é aberta e a pressão cai."
  },
  {
   "id": "flash-quimica-solucoes-18",
   "frente": "O que é uma titulação?",
   "verso": "Uma técnica para determinar a concentração desconhecida de uma solução, reagindo-a com outra de concentração conhecida até o ponto de equivalência."
  },
  {
   "id": "flash-quimica-solucoes-19",
   "frente": "O que é o ponto de viragem numa titulação?",
   "verso": "O momento em que o indicador muda de cor, sinalizando visualmente que o ponto de equivalência foi atingido."
  },
  {
   "id": "flash-quimica-solucoes-20",
   "frente": "Qual é a relação usada no cálculo de uma titulação ácido-base simples?",
   "verso": "No ponto de equivalência, os mols de H⁺ igualam os de OH⁻: M₁V₁ × (nº de H) = M₂V₂ × (nº de OH)."
  },
  {
   "id": "flash-quimica-solucoes-21",
   "frente": "O que são propriedades coligativas?",
   "verso": "As que dependem apenas do NÚMERO de partículas dissolvidas, e não da natureza química do soluto."
  },
  {
   "id": "flash-quimica-solucoes-22",
   "frente": "O que é tonoscopia?",
   "verso": "A diminuição da pressão máxima de vapor do solvente causada pela adição de um soluto não volátil."
  },
  {
   "id": "flash-quimica-solucoes-23",
   "frente": "O que é ebulioscopia?",
   "verso": "O aumento da temperatura de ebulição do solvente provocado pela adição de um soluto não volátil."
  },
  {
   "id": "flash-quimica-solucoes-24",
   "frente": "O que é crioscopia?",
   "verso": "A diminuição da temperatura de congelamento do solvente provocada pela adição de um soluto."
  },
  {
   "id": "flash-quimica-solucoes-25",
   "frente": "Por que se joga sal na neve das estradas em países frios?",
   "verso": "Por crioscopia: o sal abaixa o ponto de congelamento da água, derretendo o gelo a temperaturas abaixo de 0 °C."
  },
  {
   "id": "flash-quimica-solucoes-26",
   "frente": "Por que a água com sal demora mais para ferver?",
   "verso": "Por ebulioscopia: o soluto eleva a temperatura de ebulição, exigindo mais calor para o líquido ferver."
  },
  {
   "id": "flash-quimica-solucoes-27",
   "frente": "O que é osmose, em termos de solução?",
   "verso": "A passagem do solvente através de uma membrana semipermeável, do meio menos concentrado para o mais concentrado."
  },
  {
   "id": "flash-quimica-solucoes-28",
   "frente": "O que é pressão osmótica?",
   "verso": "A pressão que precisa ser aplicada à solução mais concentrada para impedir a entrada de solvente por osmose."
  },
  {
   "id": "flash-quimica-solucoes-29",
   "frente": "O que é a osmose reversa, e para que serve?",
   "verso": "Aplicar pressão maior que a osmótica para forçar o solvente no sentido inverso; é usada na dessalinização da água do mar."
  },
  {
   "id": "flash-quimica-solucoes-30",
   "frente": "Por que soluções iônicas afetam mais as propriedades coligativas que as moleculares de mesma concentração?",
   "verso": "Porque se dissociam em vários íons, produzindo mais partículas dissolvidas — é o efeito do fator de van't Hoff."
  },
  {
   "id": "flash-quimica-solucoes-31",
   "frente": "Por que o soro fisiológico precisa ser isotônico em relação ao sangue?",
   "verso": "Para não causar entrada ou saída de água das hemácias por osmose, o que as romperia ou as murcharia."
  },
  {
   "id": "flash-quimica-solucoes-32",
   "frente": "Como se prepara uma solução a partir de um soluto sólido, em laboratório?",
   "verso": "Pesa-se a massa calculada, dissolve-se em pouco solvente e completa-se o volume no balão volumétrico até o menisco."
  },
  {
   "id": "flash-quimica-solucoes-33",
   "frente": "Por que a concentração se refere ao volume da SOLUÇÃO e não do solvente?",
   "verso": "Porque o soluto ocupa volume ao se dissolver — o volume final da solução não é a soma dos volumes iniciais."
  }
 ],
 "quimica-termoquimica-cinetica": [
  {
   "id": "flash-quimica-termoquimica-cinetica-01",
   "frente": "O que é entalpia (H)?",
   "verso": "O conteúdo de energia térmica de um sistema à pressão constante; só se mede sua variação, ΔH."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-02",
   "frente": "Como se calcula a variação de entalpia de uma reação?",
   "verso": "ΔH = H(produtos) − H(reagentes)."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-03",
   "frente": "O que caracteriza uma reação exotérmica?",
   "verso": "Libera calor para o ambiente, e o ΔH é NEGATIVO — os produtos têm menos energia que os reagentes."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-04",
   "frente": "O que caracteriza uma reação endotérmica?",
   "verso": "Absorve calor do ambiente, e o ΔH é POSITIVO — os produtos têm mais energia que os reagentes."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-05",
   "frente": "Como identificar num gráfico de energia se a reação é exotérmica?",
   "verso": "A linha dos produtos aparece ABAIXO da linha dos reagentes."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-06",
   "frente": "A combustão é exotérmica ou endotérmica?",
   "verso": "Sempre exotérmica — libera calor, com ΔH negativo."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-07",
   "frente": "A fotossíntese é exotérmica ou endotérmica?",
   "verso": "Endotérmica: absorve energia luminosa para converter reagentes de baixa energia em glicose."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-08",
   "frente": "O que é entalpia padrão de formação?",
   "verso": "A variação de entalpia na formação de 1 mol de uma substância a partir de seus elementos em estado padrão."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-09",
   "frente": "Qual é a entalpia de formação de uma substância simples no estado padrão?",
   "verso": "Zero, por convenção — como O₂ gasoso ou grafite."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-10",
   "frente": "O que diz a Lei de Hess?",
   "verso": "A variação de entalpia de uma reação depende apenas dos estados inicial e final, não do caminho percorrido."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-11",
   "frente": "Como se aplica a Lei de Hess na prática?",
   "verso": "Somando equações intermediárias (invertendo ou multiplicando quando preciso) até obter a reação desejada, e somando os ΔH correspondentes."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-12",
   "frente": "O que acontece com o ΔH ao inverter uma equação química?",
   "verso": "Ele troca de sinal."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-13",
   "frente": "O que acontece com o ΔH ao multiplicar uma equação por um fator?",
   "verso": "Ele é multiplicado pelo mesmo fator."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-14",
   "frente": "O que é entalpia de ligação?",
   "verso": "A energia necessária para romper 1 mol de determinada ligação no estado gasoso; romper ligação sempre absorve energia."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-15",
   "frente": "Como calcular o ΔH usando energias de ligação?",
   "verso": "ΔH = energia gasta para romper as ligações dos reagentes − energia liberada na formação das ligações dos produtos."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-16",
   "frente": "O que é entropia (S)?",
   "verso": "A medida do grau de desordem ou de dispersão de energia de um sistema."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-17",
   "frente": "Como a entropia varia na passagem de sólido para gás?",
   "verso": "Aumenta — o gás é o estado mais desordenado."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-18",
   "frente": "O que é a energia livre de Gibbs?",
   "verso": "ΔG = ΔH − TΔS; é o critério que determina se um processo é espontâneo."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-19",
   "frente": "Que valor de ΔG indica um processo espontâneo?",
   "verso": "ΔG negativo."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-20",
   "frente": "Quando uma reação endotérmica pode ser espontânea?",
   "verso": "Quando o aumento de entropia é grande e a temperatura é alta o bastante para que TΔS supere ΔH."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-21",
   "frente": "O que é o poder calorífico de um combustível?",
   "verso": "A quantidade de calor liberada na combustão completa de uma unidade de massa ou volume dele."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-22",
   "frente": "O que estuda a cinética química?",
   "verso": "A VELOCIDADE das reações e os fatores que a alteram."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-23",
   "frente": "Como se define a velocidade de uma reação?",
   "verso": "Pela variação da quantidade de reagente consumido ou de produto formado por unidade de tempo."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-24",
   "frente": "O que é energia de ativação?",
   "verso": "A energia mínima que os reagentes precisam ter para que a colisão seja efetiva e a reação ocorra."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-25",
   "frente": "O que é o complexo ativado?",
   "verso": "O estado intermediário e instável no topo da barreira energética, entre reagentes e produtos."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-26",
   "frente": "O que diz a teoria das colisões?",
   "verso": "Para reagir, as partículas precisam colidir com energia suficiente E com orientação adequada."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-27",
   "frente": "Como o aumento da temperatura afeta a velocidade da reação?",
   "verso": "Aumenta — mais partículas atingem a energia de ativação e as colisões ficam mais frequentes e energéticas."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-28",
   "frente": "Como a concentração dos reagentes afeta a velocidade?",
   "verso": "Quanto maior a concentração, maior a frequência de colisões e, portanto, maior a velocidade."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-29",
   "frente": "Como a superfície de contato afeta a velocidade de uma reação?",
   "verso": "Quanto mais fragmentado o sólido, maior a área exposta e mais rápida a reação — pó reage mais rápido que bloco."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-30",
   "frente": "O que é um catalisador?",
   "verso": "Uma substância que acelera a reação criando um caminho de MENOR energia de ativação, sem ser consumida."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-31",
   "frente": "O catalisador altera o ΔH da reação?",
   "verso": "Não. Ele só reduz a energia de ativação; a diferença de energia entre reagentes e produtos permanece a mesma."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-32",
   "frente": "O que é uma enzima, do ponto de vista da cinética?",
   "verso": "Um catalisador biológico, altamente específico e sensível a temperatura e pH."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-33",
   "frente": "O que é um inibidor (catalisador negativo)?",
   "verso": "Uma substância que diminui a velocidade da reação, como os conservantes que retardam a deterioração de alimentos."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-34",
   "frente": "Numa reação em várias etapas, o que determina a velocidade global?",
   "verso": "A etapa mais LENTA, chamada etapa determinante."
  },
  {
   "id": "flash-quimica-termoquimica-cinetica-35",
   "frente": "Como o gráfico de energia mostra o efeito de um catalisador?",
   "verso": "A curva catalisada tem um pico mais baixo, mas parte e chega aos mesmos níveis de reagentes e produtos."
  }
 ],
 "gramatica-coesao-semantica": [
  {
   "id": "flash-gramatica-coesao-semantica-01",
   "frente": "O que é coesão textual?",
   "verso": "A articulação entre as partes do texto por meio de elementos linguísticos que criam ligação entre frases e parágrafos."
  },
  {
   "id": "flash-gramatica-coesao-semantica-02",
   "frente": "O que é coerência textual?",
   "verso": "A relação lógica de sentido que torna o texto compreensível como um todo, sem contradições nem rupturas de raciocínio."
  },
  {
   "id": "flash-gramatica-coesao-semantica-03",
   "frente": "Um texto pode ser coeso e incoerente?",
   "verso": "Sim — pode ter conectivos bem empregados e ainda assim apresentar ideias contraditórias ou sem lógica."
  },
  {
   "id": "flash-gramatica-coesao-semantica-04",
   "frente": "O que é coesão referencial?",
   "verso": "A retomada de um termo já mencionado por pronomes, advérbios ou sinônimos, evitando repetições."
  },
  {
   "id": "flash-gramatica-coesao-semantica-05",
   "frente": "O que é anáfora, em coesão?",
   "verso": "A retomada de um termo já citado: 'Comprei um livro. ELE é ótimo.'"
  },
  {
   "id": "flash-gramatica-coesao-semantica-06",
   "frente": "O que é catáfora?",
   "verso": "A antecipação de um termo que ainda será dito: 'Direi apenas ISTO: não concordo.'"
  },
  {
   "id": "flash-gramatica-coesao-semantica-07",
   "frente": "O que é elipse como recurso de coesão?",
   "verso": "A omissão de um termo recuperável pelo contexto, evitando repetição: 'João estuda; Maria, também.'"
  },
  {
   "id": "flash-gramatica-coesao-semantica-08",
   "frente": "O que é substituição lexical?",
   "verso": "A retomada de um termo por sinônimo ou expressão equivalente: 'Machado de Assis... O AUTOR CARIOCA...'"
  },
  {
   "id": "flash-gramatica-coesao-semantica-09",
   "frente": "O que é coesão sequencial?",
   "verso": "A articulação entre as partes do texto por conectivos que marcam a progressão das ideias."
  },
  {
   "id": "flash-gramatica-coesao-semantica-10",
   "frente": "Que conectivos expressam relação de oposição?",
   "verso": "Mas, porém, contudo, todavia, entretanto, no entanto, embora, apesar de."
  },
  {
   "id": "flash-gramatica-coesao-semantica-11",
   "frente": "Que conectivos expressam relação de causa?",
   "verso": "Porque, pois, já que, uma vez que, visto que, como (no início da frase)."
  },
  {
   "id": "flash-gramatica-coesao-semantica-12",
   "frente": "Que conectivos expressam relação de conclusão?",
   "verso": "Portanto, logo, assim, por isso, dessa forma, consequentemente."
  },
  {
   "id": "flash-gramatica-coesao-semantica-13",
   "frente": "Que conectivos expressam relação de finalidade?",
   "verso": "Para que, a fim de que, com o objetivo de, com o intuito de."
  },
  {
   "id": "flash-gramatica-coesao-semantica-14",
   "frente": "Que conectivos expressam relação de condição?",
   "verso": "Se, caso, desde que, contanto que, salvo se."
  },
  {
   "id": "flash-gramatica-coesao-semantica-15",
   "frente": "Qual é a diferença de sentido entre 'porque' e 'portanto' numa frase?",
   "verso": "'Porque' introduz a causa; 'portanto' introduz a consequência — trocá-los inverte a relação lógica."
  },
  {
   "id": "flash-gramatica-coesao-semantica-16",
   "frente": "Qual é a diferença entre 'mas' e 'e' na articulação de ideias?",
   "verso": "'E' soma ideias na mesma direção; 'mas' introduz quebra de expectativa ou contraste."
  },
  {
   "id": "flash-gramatica-coesao-semantica-17",
   "frente": "O que é progressão temática?",
   "verso": "O avanço da informação ao longo do texto, em que cada parte acrescenta algo novo sem perder o fio do tema."
  },
  {
   "id": "flash-gramatica-coesao-semantica-18",
   "frente": "O que são sinônimos, e existe sinonímia perfeita?",
   "verso": "Palavras de sentido próximo; a sinonímia perfeita é rara, pois quase sempre há diferença de registro, intensidade ou contexto."
  },
  {
   "id": "flash-gramatica-coesao-semantica-19",
   "frente": "O que são antônimos?",
   "verso": "Palavras de sentidos opostos, como 'claro' e 'escuro'."
  },
  {
   "id": "flash-gramatica-coesao-semantica-20",
   "frente": "O que são homônimos?",
   "verso": "Palavras de mesma grafia ou pronúncia e sentidos diferentes, como 'manga' (fruta) e 'manga' (da camisa)."
  },
  {
   "id": "flash-gramatica-coesao-semantica-21",
   "frente": "O que são parônimos?",
   "verso": "Palavras parecidas na grafia e na pronúncia, mas de sentidos distintos, como 'eminente' e 'iminente'."
  },
  {
   "id": "flash-gramatica-coesao-semantica-22",
   "frente": "Qual é a diferença entre 'ratificar' e 'retificar'?",
   "verso": "'Ratificar' é confirmar; 'retificar' é corrigir."
  },
  {
   "id": "flash-gramatica-coesao-semantica-23",
   "frente": "Qual é a diferença entre 'tráfego' e 'tráfico'?",
   "verso": "'Tráfego' é o movimento de veículos; 'tráfico' é o comércio ilícito."
  },
  {
   "id": "flash-gramatica-coesao-semantica-24",
   "frente": "O que é polissemia?",
   "verso": "A propriedade de uma mesma palavra ter vários sentidos relacionados, definidos pelo contexto."
  },
  {
   "id": "flash-gramatica-coesao-semantica-25",
   "frente": "Qual é a diferença entre polissemia e homonímia?",
   "verso": "Na polissemia, os sentidos derivam de uma origem comum; na homonímia, são palavras distintas que coincidem na forma."
  },
  {
   "id": "flash-gramatica-coesao-semantica-26",
   "frente": "Qual é a diferença entre denotação e conotação?",
   "verso": "A denotação é o sentido literal e objetivo; a conotação é o sentido figurado, afetivo ou simbólico."
  },
  {
   "id": "flash-gramatica-coesao-semantica-27",
   "frente": "O que é ambiguidade, e por que costuma ser um defeito?",
   "verso": "A possibilidade de mais de uma leitura; é defeito quando não é intencional, pois compromete a clareza."
  },
  {
   "id": "flash-gramatica-coesao-semantica-28",
   "frente": "Quais são as causas mais comuns de ambiguidade?",
   "verso": "Uso impreciso de pronomes possessivos e relativos, ordem inadequada dos termos e pontuação insuficiente."
  },
  {
   "id": "flash-gramatica-coesao-semantica-29",
   "frente": "Como se corrige a ambiguidade de 'João disse a Pedro que seu carro havia sido roubado'?",
   "verso": "Explicitando o possuidor: 'João disse a Pedro que o carro dele, João, havia sido roubado.'"
  },
  {
   "id": "flash-gramatica-coesao-semantica-30",
   "frente": "O que é redundância (pleonasmo vicioso)?",
   "verso": "A repetição desnecessária de uma ideia já contida no termo, como 'subir para cima' ou 'elo de ligação'."
  },
  {
   "id": "flash-gramatica-coesao-semantica-31",
   "frente": "O que é variação linguística?",
   "verso": "As diferenças naturais no uso da língua conforme região, grupo social, situação e época."
  },
  {
   "id": "flash-gramatica-coesao-semantica-32",
   "frente": "Quais são os principais tipos de variação linguística?",
   "verso": "Diatópica (regional), diastrática (social), diafásica (situacional) e diacrônica (histórica)."
  },
  {
   "id": "flash-gramatica-coesao-semantica-33",
   "frente": "O que é preconceito linguístico?",
   "verso": "A desvalorização de variedades da língua distintas da norma de prestígio, tratando diferença como erro."
  },
  {
   "id": "flash-gramatica-coesao-semantica-34",
   "frente": "Existe variedade linguística errada, do ponto de vista científico?",
   "verso": "Não — toda variedade tem regras próprias e é adequada ao seu contexto; o que existe é adequação ou inadequação à situação."
  },
  {
   "id": "flash-gramatica-coesao-semantica-35",
   "frente": "O que é norma-padrão, e como difere da norma culta?",
   "verso": "A norma-padrão é o modelo idealizado das gramáticas normativas; a norma culta é o uso real dos falantes escolarizados."
  },
  {
   "id": "flash-gramatica-coesao-semantica-36",
   "frente": "O que se deve preservar ao reescrever uma frase numa questão de vestibular?",
   "verso": "O sentido original e a correção gramatical — a reescrita não pode alterar o conteúdo nem criar ambiguidade."
  }
 ],
 "gramatica-regencia-crase": [
  {
   "id": "flash-gramatica-regencia-crase-01",
   "frente": "O que é regência verbal?",
   "verso": "A relação entre o verbo e seus complementos, incluindo a preposição que ele exige."
  },
  {
   "id": "flash-gramatica-regencia-crase-02",
   "frente": "O que é regência nominal?",
   "verso": "A relação entre um nome (substantivo, adjetivo ou advérbio) e o complemento que ele exige, com a preposição adequada."
  },
  {
   "id": "flash-gramatica-regencia-crase-03",
   "frente": "O que é um verbo transitivo direto?",
   "verso": "Aquele cujo complemento vem SEM preposição — é o objeto direto: 'Comprei o livro.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-04",
   "frente": "O que é um verbo transitivo indireto?",
   "verso": "Aquele cujo complemento vem COM preposição obrigatória — é o objeto indireto: 'Gosto de música.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-05",
   "frente": "O que é um verbo intransitivo?",
   "verso": "Aquele que não exige complemento, tendo sentido completo em si: 'Ele chegou.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-06",
   "frente": "Qual é a regência de 'assistir' no sentido de ver?",
   "verso": "Transitivo indireto, com a preposição 'a': 'Assisti ao filme.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-07",
   "frente": "Qual é a regência de 'assistir' no sentido de prestar socorro?",
   "verso": "Transitivo direto: 'O médico assistiu o paciente.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-08",
   "frente": "Qual é a regência de 'visar' no sentido de ter como objetivo?",
   "verso": "Transitivo indireto, com 'a': 'A medida visa a reduzir a desigualdade.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-09",
   "frente": "Qual é a regência de 'visar' no sentido de mirar ou dar visto?",
   "verso": "Transitivo direto: 'O atirador visou o alvo', 'O gerente visou o cheque.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-10",
   "frente": "Qual é a regência de 'aspirar' no sentido de almejar?",
   "verso": "Transitivo indireto, com 'a': 'Aspiro ao cargo.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-11",
   "frente": "Qual é a regência de 'aspirar' no sentido de sorver?",
   "verso": "Transitivo direto: 'Aspirou o perfume das flores.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-12",
   "frente": "Qual é a regência de 'obedecer' e 'desobedecer'?",
   "verso": "Ambos são transitivos indiretos, com 'a': 'Obedeça às regras.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-13",
   "frente": "Qual é a regência de 'preferir'?",
   "verso": "Transitivo direto e indireto, com 'a': 'Prefiro cinema a teatro' — sem 'do que' nem 'mais'."
  },
  {
   "id": "flash-gramatica-regencia-crase-14",
   "frente": "Qual é o erro em 'Prefiro mais estudar do que trabalhar'?",
   "verso": "'Preferir' já contém a ideia de preferência: o correto é 'Prefiro estudar a trabalhar.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-15",
   "frente": "Qual é a regência de 'implicar' no sentido de acarretar?",
   "verso": "Transitivo direto, SEM preposição: 'O atraso implicou prejuízos.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-16",
   "frente": "Qual é a regência de 'namorar'?",
   "verso": "Transitivo direto, sem preposição: 'Ele namora Maria' — não 'namora com Maria'."
  },
  {
   "id": "flash-gramatica-regencia-crase-17",
   "frente": "Qual é a regência de 'chegar' e 'ir' quanto a lugar?",
   "verso": "Exigem a preposição 'a', não 'em': 'Cheguei a São Paulo', 'Fui ao cinema.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-18",
   "frente": "Qual é a diferença entre 'lembrar algo' e 'lembrar-se de algo'?",
   "verso": "Sem pronome, é transitivo direto ('Lembrei o compromisso'); com pronome, exige 'de' ('Lembrei-me do compromisso')."
  },
  {
   "id": "flash-gramatica-regencia-crase-19",
   "frente": "Qual é a regência de 'informar'?",
   "verso": "Admite as duas ordens: 'Informei o fato ao diretor' ou 'Informei o diretor do fato.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-20",
   "frente": "Qual é a regência de 'simpatizar'?",
   "verso": "Transitivo indireto, com 'com', e sem pronome: 'Simpatizo com ele' — nunca 'simpatizo-me'."
  },
  {
   "id": "flash-gramatica-regencia-crase-21",
   "frente": "O que é a crase?",
   "verso": "A fusão da preposição 'a' com o artigo definido feminino 'a(s)', ou com o 'a' de pronomes demonstrativos, marcada pelo acento grave."
  },
  {
   "id": "flash-gramatica-regencia-crase-22",
   "frente": "Quais são as duas condições para haver crase?",
   "verso": "Um termo que EXIJA a preposição 'a' e um termo feminino que ACEITE o artigo 'a'."
  },
  {
   "id": "flash-gramatica-regencia-crase-23",
   "frente": "Qual é o teste prático mais usado para identificar a crase?",
   "verso": "Trocar a palavra feminina por uma masculina: se aparecer 'ao', há crase."
  },
  {
   "id": "flash-gramatica-regencia-crase-24",
   "frente": "Por que não há crase antes de palavra masculina?",
   "verso": "Porque não existe o artigo feminino 'a' para fundir-se à preposição — a exceção é a expressão 'à moda de' subentendida."
  },
  {
   "id": "flash-gramatica-regencia-crase-25",
   "frente": "Por que não há crase antes de verbo?",
   "verso": "Porque verbo não admite artigo: 'Começou a chover.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-26",
   "frente": "Há crase antes de pronomes pessoais?",
   "verso": "Não, pois não admitem artigo: 'Entreguei a ela o documento.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-27",
   "frente": "Há crase na expressão 'a partir de'?",
   "verso": "Não — é uma locução fixa que nunca recebe acento grave."
  },
  {
   "id": "flash-gramatica-regencia-crase-28",
   "frente": "Há crase antes de palavras repetidas, como 'cara a cara'?",
   "verso": "Não: em expressões do tipo 'dia a dia', 'frente a frente', 'gota a gota', não há crase."
  },
  {
   "id": "flash-gramatica-regencia-crase-29",
   "frente": "Quando ocorre crase antes de nomes próprios femininos de pessoa?",
   "verso": "Quando o nome admite artigo: 'Referi-me à Maria' se dizemos 'a Maria'; sem artigo, não há crase."
  },
  {
   "id": "flash-gramatica-regencia-crase-30",
   "frente": "Quando há crase antes de nomes de lugar?",
   "verso": "Quando o lugar admite artigo. Teste: se dizemos 'Venho DA', há crase ('Vou à Bahia'); se dizemos 'Venho DE', não há ('Vou a Brasília')."
  },
  {
   "id": "flash-gramatica-regencia-crase-31",
   "frente": "Há crase em 'à distância'?",
   "verso": "Só quando a distância é determinada ('a 100 metros de distância' não tem crase; 'reconheceu-o à distância' tem, no uso consagrado)."
  },
  {
   "id": "flash-gramatica-regencia-crase-32",
   "frente": "Quando ocorre crase antes de 'aquele', 'aquela' e 'aquilo'?",
   "verso": "Quando o termo anterior exige a preposição 'a': 'Refiro-me àquele caso.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-33",
   "frente": "Quando se usa 'à qual' e 'às quais'?",
   "verso": "Quando o verbo ou nome exige a preposição 'a' e o antecedente é feminino: 'A obra à qual me refiro.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-34",
   "frente": "Quando se usa 'a que', 'de que', 'em que'?",
   "verso": "A preposição é definida pela regência do verbo da oração adjetiva: 'O filme A QUE assisti' (assistir exige 'a')."
  },
  {
   "id": "flash-gramatica-regencia-crase-35",
   "frente": "Como se usa o pronome relativo 'cujo'?",
   "verso": "Indica posse, concorda com o termo POSTERIOR e nunca vem seguido de artigo: 'O autor cuja obra li.'"
  },
  {
   "id": "flash-gramatica-regencia-crase-36",
   "frente": "Há crase antes das horas?",
   "verso": "Sim, quando determinadas: 'Chegou às 14h' — teste com 'ao meio-dia'."
  },
  {
   "id": "flash-gramatica-regencia-crase-37",
   "frente": "Há crase em 'à vista', 'às pressas', 'à noite'?",
   "verso": "Sim: locuções adverbiais femininas recebem acento grave por clareza, mesmo quando o 'a' pareceria só preposição."
  }
 ],
 "gramatica-concordancia": [
  {
   "id": "flash-gramatica-concordancia-01",
   "frente": "O que é concordância verbal?",
   "verso": "A adaptação do verbo em número e pessoa ao seu sujeito."
  },
  {
   "id": "flash-gramatica-concordancia-02",
   "frente": "O que é concordância nominal?",
   "verso": "A adaptação de artigos, adjetivos, pronomes e numerais em gênero e número ao substantivo a que se referem."
  },
  {
   "id": "flash-gramatica-concordancia-03",
   "frente": "Como fica o verbo com sujeito composto ANTES dele?",
   "verso": "Obrigatoriamente no plural: 'O professor e o aluno chegaram cedo.'"
  },
  {
   "id": "flash-gramatica-concordancia-04",
   "frente": "Como fica o verbo com sujeito composto DEPOIS dele (posposto)?",
   "verso": "Pode ir ao plural ou concordar com o núcleo mais próximo: 'Chegaram o professor e o aluno' ou 'Chegou o professor e o aluno'."
  },
  {
   "id": "flash-gramatica-concordancia-05",
   "frente": "Como fica o verbo com sujeito composto de pessoas gramaticais diferentes?",
   "verso": "Vai ao plural na pessoa que tiver precedência: 1ª sobre 2ª e 3ª. 'Eu e ele saímos.'"
  },
  {
   "id": "flash-gramatica-concordancia-06",
   "frente": "Como concorda o verbo com sujeito ligado por 'ou'?",
   "verso": "Se o 'ou' indicar exclusão, o verbo fica no singular; se indicar adição, vai ao plural."
  },
  {
   "id": "flash-gramatica-concordancia-07",
   "frente": "Como concorda o verbo com 'um dos que'?",
   "verso": "Preferencialmente no plural: 'Ele é um dos que mais estudam.'"
  },
  {
   "id": "flash-gramatica-concordancia-08",
   "frente": "Como fica o verbo quando o sujeito é uma expressão partitiva como 'a maioria dos alunos'?",
   "verso": "Pode concordar com o núcleo ('a maioria chegou') ou com o especificador ('a maioria dos alunos chegaram') — ambas são aceitas."
  },
  {
   "id": "flash-gramatica-concordancia-09",
   "frente": "Como fica o verbo com sujeito 'mais de um'?",
   "verso": "No singular: 'Mais de um candidato faltou.'"
  },
  {
   "id": "flash-gramatica-concordancia-10",
   "frente": "Por que o verbo 'haver' no sentido de existir é impessoal?",
   "verso": "Porque não tem sujeito; fica sempre na 3ª pessoa do singular: 'Havia muitos alunos na sala.'"
  },
  {
   "id": "flash-gramatica-concordancia-11",
   "frente": "Qual é o erro em 'Haviam muitas pessoas na festa'?",
   "verso": "'Haver' com sentido de existir é impessoal — o correto é 'Havia muitas pessoas'."
  },
  {
   "id": "flash-gramatica-concordancia-12",
   "frente": "O que acontece quando 'haver' impessoal vem com verbo auxiliar?",
   "verso": "O auxiliar também fica no singular: 'Deve haver muitos problemas' (nunca 'devem haver')."
  },
  {
   "id": "flash-gramatica-concordancia-13",
   "frente": "Como se comporta o verbo 'existir' em relação a 'haver'?",
   "verso": "'Existir' TEM sujeito e concorda normalmente: 'Existiam muitos alunos' — diferente de 'Havia muitos alunos'."
  },
  {
   "id": "flash-gramatica-concordancia-14",
   "frente": "Quando o verbo 'fazer' é impessoal?",
   "verso": "Ao indicar tempo decorrido ou fenômeno da natureza: 'Faz cinco anos que não o vejo' (nunca 'Fazem cinco anos')."
  },
  {
   "id": "flash-gramatica-concordancia-15",
   "frente": "Como concorda o verbo com a partícula apassivadora 'se'?",
   "verso": "Concorda com o sujeito paciente: 'Vendem-se casas' (plural), 'Vende-se uma casa' (singular)."
  },
  {
   "id": "flash-gramatica-concordancia-16",
   "frente": "Como fica o verbo com o índice de indeterminação do sujeito 'se'?",
   "verso": "Sempre na 3ª pessoa do singular: 'Precisa-se de funcionários' — o verbo é transitivo indireto."
  },
  {
   "id": "flash-gramatica-concordancia-17",
   "frente": "Como distinguir 'Vendem-se casas' de 'Precisa-se de funcionários'?",
   "verso": "Se o verbo é transitivo direto, o 'se' é apassivador e há concordância; se é transitivo indireto, o 'se' indetermina o sujeito e o verbo fica no singular."
  },
  {
   "id": "flash-gramatica-concordancia-18",
   "frente": "Como concorda o verbo 'ser' quando indica tempo, data ou distância?",
   "verso": "Com o predicativo: 'São três horas', 'Hoje são 15 de maio', 'Daqui até lá são dez quilômetros'."
  },
  {
   "id": "flash-gramatica-concordancia-19",
   "frente": "Como concorda o adjetivo que vem ANTES de dois ou mais substantivos?",
   "verso": "Geralmente com o mais próximo: 'Comprei velhos livros e revistas.'"
  },
  {
   "id": "flash-gramatica-concordancia-20",
   "frente": "Como concorda o adjetivo que vem DEPOIS de dois ou mais substantivos?",
   "verso": "Vai ao plural, ou concorda com o mais próximo: 'livro e revista antigos' ou 'livro e revista antiga'."
  },
  {
   "id": "flash-gramatica-concordancia-21",
   "frente": "Como se comporta a palavra 'anexo' na concordância?",
   "verso": "É adjetivo e concorda com o substantivo: 'Seguem anexas as fotos', 'Segue anexo o documento'."
  },
  {
   "id": "flash-gramatica-concordancia-22",
   "frente": "Qual é a forma correta: 'em anexo' ou 'anexo'?",
   "verso": "'Anexo' varia como adjetivo; 'em anexo' é locução invariável, aceita na linguagem corrente mas evitada na norma culta rigorosa."
  },
  {
   "id": "flash-gramatica-concordancia-23",
   "frente": "Como se comporta 'obrigado' na concordância?",
   "verso": "Concorda com quem fala: um homem diz 'obrigado', uma mulher diz 'obrigada'."
  },
  {
   "id": "flash-gramatica-concordancia-24",
   "frente": "Quando 'bastante' varia e quando não varia?",
   "verso": "Varia como adjetivo, equivalendo a 'muitos' ('bastantes livros'); não varia como advérbio, equivalendo a 'muito' ('estudou bastante')."
  },
  {
   "id": "flash-gramatica-concordancia-25",
   "frente": "Quando 'meio' varia e quando não varia?",
   "verso": "Varia como numeral ('meia dúzia'); não varia como advérbio, equivalendo a 'um pouco' ('ela está meio cansada')."
  },
  {
   "id": "flash-gramatica-concordancia-26",
   "frente": "Como se comporta 'menos' na concordância?",
   "verso": "É SEMPRE invariável: 'menos pessoas', 'menos oportunidades' — 'menas' não existe."
  },
  {
   "id": "flash-gramatica-concordancia-27",
   "frente": "Como se comporta a palavra 'mesmo' na concordância?",
   "verso": "Varia quando reforça o substantivo ('elas mesmas resolveram'); é invariável quando equivale a 'realmente' ('mesmo assim, foi')."
  },
  {
   "id": "flash-gramatica-concordancia-28",
   "frente": "Como concorda 'é proibido' / 'é necessário' com o sujeito?",
   "verso": "Fica invariável se o sujeito não tem determinante ('É proibido entrada'); concorda se tem ('É proibida a entrada')."
  },
  {
   "id": "flash-gramatica-concordancia-29",
   "frente": "Como concordam os numerais em expressões como 'as duas primeiras páginas'?",
   "verso": "Numeral e adjetivo concordam com o substantivo em gênero e número."
  },
  {
   "id": "flash-gramatica-concordancia-30",
   "frente": "Como concorda o pronome de tratamento com o verbo e com os adjetivos?",
   "verso": "O verbo vai à 3ª pessoa ('Vossa Excelência deve'), mas o adjetivo concorda com o sexo da pessoa ('Vossa Excelência está preocupado')."
  },
  {
   "id": "flash-gramatica-concordancia-31",
   "frente": "Como concorda o verbo quando o sujeito é 'quem'?",
   "verso": "Preferencialmente na 3ª pessoa do singular: 'Fui eu quem fez o trabalho' — embora a concordância com o antecedente também seja aceita."
  },
  {
   "id": "flash-gramatica-concordancia-32",
   "frente": "Como concorda o verbo quando o sujeito é o pronome relativo 'que'?",
   "verso": "Com o antecedente do 'que': 'Fui eu que fiz o trabalho.'"
  },
  {
   "id": "flash-gramatica-concordancia-33",
   "frente": "Como fica a concordância em 'um e outro'?",
   "verso": "O substantivo fica no singular e o adjetivo no plural: 'um e outro caso interessantes'."
  },
  {
   "id": "flash-gramatica-concordancia-34",
   "frente": "Por que a voz passiva analítica exige atenção à concordância?",
   "verso": "Porque o particípio concorda com o sujeito paciente: 'A casa foi vendida', 'As casas foram vendidas'."
  }
 ],
 "gramatica-morfologia": [
  {
   "id": "flash-gramatica-morfologia-01",
   "frente": "Quais são as dez classes de palavras do português?",
   "verso": "Substantivo, artigo, adjetivo, numeral, pronome, verbo, advérbio, preposição, conjunção e interjeição."
  },
  {
   "id": "flash-gramatica-morfologia-02",
   "frente": "O que caracteriza o substantivo?",
   "verso": "Nomeia seres, objetos, lugares, sentimentos e ideias; é a classe que os determinantes acompanham."
  },
  {
   "id": "flash-gramatica-morfologia-03",
   "frente": "O que caracteriza o adjetivo?",
   "verso": "Atribui qualidade, estado ou característica ao substantivo, com ele concordando em gênero e número."
  },
  {
   "id": "flash-gramatica-morfologia-04",
   "frente": "Como distinguir advérbio de adjetivo numa frase?",
   "verso": "O adjetivo modifica substantivo e varia; o advérbio modifica verbo, adjetivo ou outro advérbio e é invariável."
  },
  {
   "id": "flash-gramatica-morfologia-05",
   "frente": "Qual é a diferença entre artigo definido e indefinido?",
   "verso": "O definido ('o', 'a') indica ser já conhecido ou determinado; o indefinido ('um', 'uma') apresenta ser não especificado."
  },
  {
   "id": "flash-gramatica-morfologia-06",
   "frente": "Que efeito de sentido a troca de artigo definido por indefinido produz?",
   "verso": "Muda o grau de determinação: 'o problema' pressupõe conhecimento partilhado; 'um problema' introduz informação nova."
  },
  {
   "id": "flash-gramatica-morfologia-07",
   "frente": "Quais são os pronomes pessoais do caso reto e do caso oblíquo?",
   "verso": "Retos exercem função de sujeito (eu, tu, ele...); oblíquos, de complemento (me, te, o, lhe, nos...)."
  },
  {
   "id": "flash-gramatica-morfologia-08",
   "frente": "Quando se usa 'o/a' e quando se usa 'lhe' como pronome oblíquo?",
   "verso": "'O/a' substitui objeto direto ('Eu o vi'); 'lhe' substitui objeto indireto ('Eu lhe disse')."
  },
  {
   "id": "flash-gramatica-morfologia-09",
   "frente": "Como se usam os pronomes demonstrativos 'este', 'esse' e 'aquele' no espaço?",
   "verso": "'Este' é próximo de quem fala, 'esse' de quem ouve e 'aquele' está distante de ambos."
  },
  {
   "id": "flash-gramatica-morfologia-10",
   "frente": "Como se usam 'este' e 'esse' na referência textual?",
   "verso": "'Este' anuncia o que ainda será dito (catáfora); 'esse' retoma o que já foi dito (anáfora)."
  },
  {
   "id": "flash-gramatica-morfologia-11",
   "frente": "O que é próclise, e quando ocorre?",
   "verso": "O pronome antes do verbo; é exigido por palavras atrativas como negações, advérbios, pronomes relativos e conjunções subordinativas."
  },
  {
   "id": "flash-gramatica-morfologia-12",
   "frente": "Quais palavras atraem o pronome para antes do verbo?",
   "verso": "Negações ('não me diga'), advérbios ('aqui se trabalha'), pronomes relativos e indefinidos, e conjunções subordinativas."
  },
  {
   "id": "flash-gramatica-morfologia-13",
   "frente": "O que é ênclise, e quando é obrigatória?",
   "verso": "O pronome depois do verbo; é obrigatória no início de período e com o verbo no imperativo afirmativo."
  },
  {
   "id": "flash-gramatica-morfologia-14",
   "frente": "O que é mesóclise, e quando ocorre?",
   "verso": "O pronome no meio do verbo; ocorre com futuro do presente e futuro do pretérito sem palavra atrativa: 'Far-lhe-ei justiça.'"
  },
  {
   "id": "flash-gramatica-morfologia-15",
   "frente": "Pode-se iniciar uma frase com pronome oblíquo átono na norma culta?",
   "verso": "Não — exige-se ênclise: 'Diga-me' e não 'Me diga', embora a próclise inicial seja comum na fala."
  },
  {
   "id": "flash-gramatica-morfologia-16",
   "frente": "Que valor tem o presente do indicativo além do momento atual?",
   "verso": "Pode indicar fato habitual, verdade permanente e, no presente histórico, ação passada narrada com vivacidade."
  },
  {
   "id": "flash-gramatica-morfologia-17",
   "frente": "Qual é a diferença entre pretérito perfeito e imperfeito?",
   "verso": "O perfeito indica ação concluída; o imperfeito, ação habitual ou em curso no passado."
  },
  {
   "id": "flash-gramatica-morfologia-18",
   "frente": "Que valor tem o pretérito mais-que-perfeito?",
   "verso": "Indica ação anterior a outra já passada: 'Quando cheguei, ele já saíra.'"
  },
  {
   "id": "flash-gramatica-morfologia-19",
   "frente": "Qual é a diferença de sentido entre futuro do presente e futuro do pretérito?",
   "verso": "O do presente indica fato posterior tido como certo; o do pretérito, hipótese, condição ou polidez."
  },
  {
   "id": "flash-gramatica-morfologia-20",
   "frente": "Que sentido o modo subjuntivo expressa?",
   "verso": "Hipótese, dúvida, desejo ou possibilidade, em oposição à certeza do indicativo."
  },
  {
   "id": "flash-gramatica-morfologia-21",
   "frente": "Como se forma o imperativo negativo?",
   "verso": "A partir do presente do subjuntivo: 'não fales', 'não faça'."
  },
  {
   "id": "flash-gramatica-morfologia-22",
   "frente": "Quais são as formas nominais do verbo?",
   "verso": "Infinitivo, gerúndio e particípio."
  },
  {
   "id": "flash-gramatica-morfologia-23",
   "frente": "O que é voz passiva sintética?",
   "verso": "A formada com o verbo na 3ª pessoa mais a partícula 'se': 'Alugam-se casas.'"
  },
  {
   "id": "flash-gramatica-morfologia-24",
   "frente": "O que é um verbo defectivo?",
   "verso": "Aquele que não se conjuga em todas as pessoas ou tempos, como 'falir' e 'reaver'."
  },
  {
   "id": "flash-gramatica-morfologia-25",
   "frente": "Qual é a diferença entre derivação e composição?",
   "verso": "A derivação forma palavras a partir de um radical com afixos; a composição une dois ou mais radicais."
  },
  {
   "id": "flash-gramatica-morfologia-26",
   "frente": "O que é derivação prefixal e sufixal?",
   "verso": "Prefixal acrescenta afixo antes do radical ('infeliz'); sufixal, depois ('felizmente')."
  },
  {
   "id": "flash-gramatica-morfologia-27",
   "frente": "O que é derivação parassintética?",
   "verso": "O acréscimo simultâneo de prefixo e sufixo, sem os quais a palavra não existe: 'entardecer', 'esclarecer'."
  },
  {
   "id": "flash-gramatica-morfologia-28",
   "frente": "O que é derivação regressiva?",
   "verso": "A formação por redução da palavra primitiva, geralmente criando substantivos a partir de verbos: 'combater' → 'combate'."
  },
  {
   "id": "flash-gramatica-morfologia-29",
   "frente": "O que é derivação imprópria?",
   "verso": "A mudança de classe gramatical sem alteração de forma: 'o jantar', 'o porquê'."
  },
  {
   "id": "flash-gramatica-morfologia-30",
   "frente": "O que é um neologismo?",
   "verso": "Uma palavra ou acepção nova criada na língua, por derivação, composição ou empréstimo."
  },
  {
   "id": "flash-gramatica-morfologia-31",
   "frente": "Como se acentuam as palavras oxítonas?",
   "verso": "Quando terminadas em a(s), e(s), o(s), em, ens: 'sofá', 'café', 'também'."
  },
  {
   "id": "flash-gramatica-morfologia-32",
   "frente": "Como se acentuam as paroxítonas?",
   "verso": "Quando NÃO terminadas em a(s), e(s), o(s), em, ens — ou seja, as terminações menos comuns: 'táxi', 'fácil', 'órgão'."
  },
  {
   "id": "flash-gramatica-morfologia-33",
   "frente": "Como se acentuam as proparoxítonas?",
   "verso": "TODAS são acentuadas, sem exceção: 'médico', 'lâmpada', 'ônibus'."
  },
  {
   "id": "flash-gramatica-morfologia-34",
   "frente": "O que mudou no acento dos ditongos abertos com o Acordo Ortográfico?",
   "verso": "'Éi' e 'ói' perderam o acento nas paroxítonas ('ideia', 'heroico'), mas o mantêm nas oxítonas ('herói', 'papéis')."
  },
  {
   "id": "flash-gramatica-morfologia-35",
   "frente": "Quando se usa o hífen com prefixos, após o Acordo Ortográfico?",
   "verso": "Quando o prefixo termina com a mesma letra que inicia a palavra seguinte ('micro-ondas') ou antes de 'h' ('super-homem')."
  }
 ],
 "gramatica-pontuacao": [
  {
   "id": "flash-gramatica-pontuacao-01",
   "frente": "Qual é a regra fundamental que a vírgula NÃO pode violar?",
   "verso": "Não se separa o sujeito do predicado, nem o verbo de seus complementos, por uma única vírgula."
  },
  {
   "id": "flash-gramatica-pontuacao-02",
   "frente": "Por que 'Os alunos da escola, receberam o prêmio' está errado?",
   "verso": "Porque a vírgula separa indevidamente o sujeito do predicado."
  },
  {
   "id": "flash-gramatica-pontuacao-03",
   "frente": "Quando a vírgula é usada em enumerações?",
   "verso": "Para separar elementos de mesma função sintática: 'Comprei pão, leite, ovos e café.'"
  },
  {
   "id": "flash-gramatica-pontuacao-04",
   "frente": "Como se pontua um aposto explicativo?",
   "verso": "Entre vírgulas: 'Machado de Assis, autor de Dom Casmurro, morreu em 1908.'"
  },
  {
   "id": "flash-gramatica-pontuacao-05",
   "frente": "Como se pontua o vocativo?",
   "verso": "Isolado por vírgula: 'Maria, venha aqui.'"
  },
  {
   "id": "flash-gramatica-pontuacao-06",
   "frente": "Qual é a diferença sintática entre aposto e vocativo?",
   "verso": "O aposto explica ou especifica um termo anterior; o vocativo chama ou interpela o interlocutor, sem função sintática na oração."
  },
  {
   "id": "flash-gramatica-pontuacao-07",
   "frente": "Como se pontua um adjunto adverbial deslocado para o início da frase?",
   "verso": "Com vírgula, sobretudo se for longo: 'Naquela manhã de inverno, saímos cedo.'"
  },
  {
   "id": "flash-gramatica-pontuacao-08",
   "frente": "Usa-se vírgula antes de adjunto adverbial curto no início?",
   "verso": "É facultativa: 'Ontem viajei' ou 'Ontem, viajei' — ambas corretas."
  },
  {
   "id": "flash-gramatica-pontuacao-09",
   "frente": "Como se pontua uma oração intercalada?",
   "verso": "Entre vírgulas: 'O resultado, segundo os pesquisadores, foi surpreendente.'"
  },
  {
   "id": "flash-gramatica-pontuacao-10",
   "frente": "Qual é a diferença entre oração adjetiva explicativa e restritiva?",
   "verso": "A explicativa acrescenta informação acessória e vem entre vírgulas; a restritiva delimita o antecedente e NÃO leva vírgula."
  },
  {
   "id": "flash-gramatica-pontuacao-11",
   "frente": "O que muda de sentido entre 'Os alunos, que estudaram, passaram' e 'Os alunos que estudaram passaram'?",
   "verso": "Na primeira, TODOS estudaram e passaram; na segunda, apenas o subgrupo que estudou passou."
  },
  {
   "id": "flash-gramatica-pontuacao-12",
   "frente": "Por que a vírgula na oração adjetiva é considerada 'a vírgula que muda o sentido'?",
   "verso": "Porque ela é o único sinal que distingue explicativa de restritiva, alterando quem exatamente o enunciado abrange."
  },
  {
   "id": "flash-gramatica-pontuacao-13",
   "frente": "Usa-se vírgula antes de 'e'?",
   "verso": "Em regra não, mas sim quando os sujeitos são diferentes, quando há enumeração de orações ou quando 'e' tem valor adversativo."
  },
  {
   "id": "flash-gramatica-pontuacao-14",
   "frente": "Quando se usa vírgula antes de conjunções adversativas como 'mas' e 'porém'?",
   "verso": "Sempre: 'Estudou muito, mas não passou.'"
  },
  {
   "id": "flash-gramatica-pontuacao-15",
   "frente": "Como se pontua a conjunção 'porém' quando deslocada para o meio da oração?",
   "verso": "Entre vírgulas: 'Estudou muito; não passou, porém, no exame.'"
  },
  {
   "id": "flash-gramatica-pontuacao-16",
   "frente": "Como se pontua uma oração subordinada adverbial que vem ANTES da principal?",
   "verso": "Com vírgula: 'Quando chegou, todos aplaudiram.'"
  },
  {
   "id": "flash-gramatica-pontuacao-17",
   "frente": "A vírgula é obrigatória quando a oração adverbial vem DEPOIS da principal?",
   "verso": "Não — em geral é dispensável: 'Todos aplaudiram quando ele chegou.'"
  },
  {
   "id": "flash-gramatica-pontuacao-18",
   "frente": "Para que serve o ponto e vírgula?",
   "verso": "Para separar orações longas já pontuadas por vírgulas e para itens de enumeração em textos legais e listas."
  },
  {
   "id": "flash-gramatica-pontuacao-19",
   "frente": "Quais são os usos principais dos dois-pontos?",
   "verso": "Introduzir citação, enumeração, explicação ou esclarecimento do que foi anunciado."
  },
  {
   "id": "flash-gramatica-pontuacao-20",
   "frente": "Quais são os usos do travessão?",
   "verso": "Marcar a fala em diálogos e isolar termos ou comentários, funcionando como alternativa enfática à vírgula ou aos parênteses."
  },
  {
   "id": "flash-gramatica-pontuacao-21",
   "frente": "Qual é a diferença de efeito entre parênteses, travessão e vírgula ao isolar um comentário?",
   "verso": "A vírgula integra mais ao período, o travessão dá destaque e os parênteses reduzem a informação a um aparte discreto."
  },
  {
   "id": "flash-gramatica-pontuacao-22",
   "frente": "O que as reticências indicam?",
   "verso": "Interrupção, suspensão do pensamento, hesitação ou a sugestão de que algo ficou implícito."
  },
  {
   "id": "flash-gramatica-pontuacao-23",
   "frente": "Como se pontua o discurso direto?",
   "verso": "Com dois-pontos e travessão, ou com aspas: 'Ele disse: — Vou embora.'"
  },
  {
   "id": "flash-gramatica-pontuacao-24",
   "frente": "Como se pontuam as orações coordenadas assindéticas?",
   "verso": "Separadas por vírgula, já que não há conjunção: 'Cheguei, vi, venci.'"
  },
  {
   "id": "flash-gramatica-pontuacao-25",
   "frente": "Como se pontua a elipse do verbo?",
   "verso": "Com vírgula no lugar do verbo omitido: 'Alguns preferem o mar; outros, a montanha.'"
  },
  {
   "id": "flash-gramatica-pontuacao-26",
   "frente": "Como se pontuam as expressões explicativas como 'isto é', 'ou seja', 'por exemplo'?",
   "verso": "Entre vírgulas: 'Ele é poliglota, ou seja, fala vários idiomas.'"
  },
  {
   "id": "flash-gramatica-pontuacao-27",
   "frente": "Como se pontuam os conectivos conclusivos 'portanto', 'logo', 'assim'?",
   "verso": "Entre vírgulas quando intercalados: 'O prazo acabou; devemos, portanto, entregar hoje.'"
  },
  {
   "id": "flash-gramatica-pontuacao-28",
   "frente": "Qual é o efeito de deslocar o predicativo para o início da frase?",
   "verso": "Ele passa a ser isolado por vírgula e ganha ênfase: 'Cansados, os atletas deixaram o campo.'"
  },
  {
   "id": "flash-gramatica-pontuacao-29",
   "frente": "Como se pontua a data no cabeçalho de um documento?",
   "verso": "Vírgula entre o local e a data: 'São Paulo, 14 de agosto de 2026.'"
  },
  {
   "id": "flash-gramatica-pontuacao-30",
   "frente": "Usa-se vírgula antes de oração subordinada substantiva?",
   "verso": "Não — ela funciona como termo essencial ou integrante da oração principal e não deve ser separada dela."
  },
  {
   "id": "flash-gramatica-pontuacao-31",
   "frente": "Por que 'Não, espere' e 'Não espere' têm sentidos opostos?",
   "verso": "Porque a vírgula transforma 'não' em resposta isolada; sem ela, 'não' nega o verbo."
  },
  {
   "id": "flash-gramatica-pontuacao-32",
   "frente": "Como a pontuação pode desfazer uma ambiguidade?",
   "verso": "Isolando o termo que se quer vincular a um antecedente específico, deixando explícito o escopo de cada informação."
  },
  {
   "id": "flash-gramatica-pontuacao-33",
   "frente": "Como se pontua uma citação longa introduzida por verbo dicendi?",
   "verso": "Com dois-pontos após o verbo e aspas envolvendo a fala transcrita."
  }
 ],
 "gramatica-sintaxe-periodo": [
  {
   "id": "flash-gramatica-sintaxe-periodo-01",
   "frente": "Quais são os termos essenciais da oração?",
   "verso": "Sujeito e predicado."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-02",
   "frente": "O que é sujeito simples e sujeito composto?",
   "verso": "O simples tem um só núcleo; o composto tem dois ou mais núcleos."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-03",
   "frente": "O que é sujeito oculto (elíptico)?",
   "verso": "Aquele não expresso, identificável pela desinência verbal: 'Chegamos cedo' (nós)."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-04",
   "frente": "O que é sujeito indeterminado?",
   "verso": "Aquele que não se pode ou não se quer identificar; marca-se pela 3ª pessoa do plural sem referente ou pelo 'se' com verbo transitivo indireto."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-05",
   "frente": "O que é oração sem sujeito?",
   "verso": "Aquela cujo verbo é impessoal, como 'haver' no sentido de existir e verbos que indicam fenômeno natural."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-06",
   "frente": "O que é predicado verbal?",
   "verso": "Aquele cujo núcleo é um verbo significativo, que indica ação: 'O aluno estudou.'"
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-07",
   "frente": "O que é predicado nominal?",
   "verso": "Aquele cujo núcleo é um predicativo do sujeito, ligado por verbo de ligação: 'O aluno está cansado.'"
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-08",
   "frente": "O que é predicado verbo-nominal?",
   "verso": "Aquele com dois núcleos, um verbo significativo e um predicativo: 'Os alunos chegaram cansados.'"
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-09",
   "frente": "O que é um verbo de ligação?",
   "verso": "Aquele que não indica ação, apenas liga o sujeito ao predicativo: ser, estar, parecer, permanecer, continuar, ficar, tornar-se."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-10",
   "frente": "Qual é a diferença entre predicativo do sujeito e predicativo do objeto?",
   "verso": "O do sujeito atribui característica ao sujeito; o do objeto, ao objeto: 'Considero o filme excelente.'"
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-11",
   "frente": "Quais são os termos integrantes da oração?",
   "verso": "Objeto direto, objeto indireto, complemento nominal e agente da passiva."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-12",
   "frente": "Qual é a diferença entre complemento nominal e adjunto adnominal?",
   "verso": "O complemento nominal completa o sentido de um nome e tem valor passivo; o adjunto adnominal restringe o substantivo e tem valor ativo ou de posse."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-13",
   "frente": "Como distinguir complemento nominal de adjunto adnominal em 'o amor de mãe'?",
   "verso": "É adjunto adnominal, pois a mãe é quem ama (valor ativo); em 'o amor à pátria', é complemento nominal, pois a pátria é amada."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-14",
   "frente": "O que é o agente da passiva?",
   "verso": "O termo que pratica a ação numa oração passiva, geralmente introduzido por 'por' ou 'de': 'O livro foi lido pelo aluno.'"
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-15",
   "frente": "Quais são os termos acessórios da oração?",
   "verso": "Adjunto adnominal, adjunto adverbial e aposto."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-16",
   "frente": "O que é adjunto adverbial?",
   "verso": "O termo que indica circunstância — tempo, lugar, modo, causa, intensidade — modificando o verbo, o adjetivo ou o advérbio."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-17",
   "frente": "Quais são os tipos de aposto?",
   "verso": "Explicativo, enumerativo, especificativo, resumidor e distributivo."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-18",
   "frente": "Qual é a diferença entre período simples e composto?",
   "verso": "O simples tem uma só oração; o composto tem duas ou mais."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-19",
   "frente": "Qual é a diferença entre coordenação e subordinação?",
   "verso": "Na coordenação, as orações são sintaticamente independentes; na subordinação, uma exerce função sintática dentro da outra."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-20",
   "frente": "Quais são os tipos de orações coordenadas sindéticas?",
   "verso": "Aditiva, adversativa, alternativa, conclusiva e explicativa."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-21",
   "frente": "Que conjunções introduzem orações coordenadas adversativas?",
   "verso": "Mas, porém, contudo, todavia, entretanto, no entanto."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-22",
   "frente": "Que conjunções introduzem orações coordenadas conclusivas?",
   "verso": "Logo, portanto, pois (posposto ao verbo), por isso, assim."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-23",
   "frente": "Quais são os três tipos de orações subordinadas?",
   "verso": "Substantivas, adjetivas e adverbiais."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-24",
   "frente": "Que função exercem as orações subordinadas substantivas?",
   "verso": "As de substantivo: sujeito, objeto direto, objeto indireto, complemento nominal, predicativo e aposto."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-25",
   "frente": "Como se identifica uma oração subordinada substantiva?",
   "verso": "Pode ser substituída por 'isso': 'Espero QUE VOCÊ VENHA' → 'Espero isso.'"
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-26",
   "frente": "Que conjunção introduz as orações subordinadas substantivas?",
   "verso": "A conjunção integrante 'que' ou 'se'."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-27",
   "frente": "Como se identifica uma oração subordinada adjetiva?",
   "verso": "Vem introduzida por pronome relativo e equivale a um adjetivo, referindo-se a um antecedente."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-28",
   "frente": "Quais são os pronomes relativos mais comuns?",
   "verso": "Que, quem, onde, cujo, o qual e suas flexões, quanto."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-29",
   "frente": "Que circunstâncias as orações subordinadas adverbiais podem exprimir?",
   "verso": "Causa, consequência, condição, concessão, comparação, conformidade, finalidade, proporção e tempo."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-30",
   "frente": "Que conjunções introduzem orações adverbiais concessivas?",
   "verso": "Embora, ainda que, mesmo que, conquanto, apesar de que."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-31",
   "frente": "Qual é a diferença entre oração adverbial causal e consecutiva?",
   "verso": "A causal exprime o motivo ('Não saiu porque chovia'); a consecutiva, o resultado ('Chovia tanto que não saiu')."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-32",
   "frente": "O que é uma oração reduzida?",
   "verso": "Aquela cujo verbo está numa forma nominal — infinitivo, gerúndio ou particípio — e que dispensa conjunção."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-33",
   "frente": "Como se transforma uma oração desenvolvida em reduzida?",
   "verso": "Substituindo o verbo conjugado por forma nominal e eliminando a conjunção: 'Quando cheguei' → 'Ao chegar'."
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-34",
   "frente": "O que é a voz reflexiva?",
   "verso": "Aquela em que o sujeito pratica e recebe a ação: 'Ela se feriu.'"
  },
  {
   "id": "flash-gramatica-sintaxe-periodo-35",
   "frente": "Como se converte a voz ativa em passiva analítica?",
   "verso": "O objeto direto vira sujeito, o verbo passa a 'ser' + particípio e o sujeito antigo vira agente da passiva."
  }
 ],
 "interpretacao-argumentacao": [
  {
   "id": "flash-interpretacao-argumentacao-01",
   "frente": "O que é um argumento?",
   "verso": "A razão apresentada para sustentar uma tese e levar o interlocutor a aceitá-la."
  },
  {
   "id": "flash-interpretacao-argumentacao-02",
   "frente": "Qual é a diferença entre fato e opinião?",
   "verso": "O fato é verificável e independe de julgamento; a opinião expressa avaliação pessoal e é passível de discordância."
  },
  {
   "id": "flash-interpretacao-argumentacao-03",
   "frente": "Como se reconhece uma opinião num texto?",
   "verso": "Por adjetivos avaliativos, advérbios de julgamento, verbos de opinião e modalizadores."
  },
  {
   "id": "flash-interpretacao-argumentacao-04",
   "frente": "O que é um argumento de autoridade?",
   "verso": "Aquele que se apoia na citação de especialista, instituição ou obra reconhecida no campo."
  },
  {
   "id": "flash-interpretacao-argumentacao-05",
   "frente": "Quando o argumento de autoridade se torna falacioso?",
   "verso": "Quando a autoridade invocada não tem competência naquele campo, ou quando substitui a demonstração em vez de complementá-la."
  },
  {
   "id": "flash-interpretacao-argumentacao-06",
   "frente": "O que é argumento por exemplificação?",
   "verso": "Aquele que sustenta a tese apresentando casos concretos que a ilustram."
  },
  {
   "id": "flash-interpretacao-argumentacao-07",
   "frente": "Qual é a fragilidade do argumento por exemplificação?",
   "verso": "Um exemplo isolado não comprova regra geral; pode ser exceção apresentada como padrão."
  },
  {
   "id": "flash-interpretacao-argumentacao-08",
   "frente": "O que é argumento de comparação (analogia)?",
   "verso": "Aquele que aproxima duas situações para transferir a conclusão de uma para a outra."
  },
  {
   "id": "flash-interpretacao-argumentacao-09",
   "frente": "Quando uma analogia se torna falaciosa?",
   "verso": "Quando as situações comparadas diferem justamente no aspecto decisivo para a conclusão."
  },
  {
   "id": "flash-interpretacao-argumentacao-10",
   "frente": "O que é argumento por evidências (dados)?",
   "verso": "Aquele que se apoia em estatísticas, pesquisas e resultados verificáveis."
  },
  {
   "id": "flash-interpretacao-argumentacao-11",
   "frente": "Como um dado estatístico pode ser usado de forma enganosa?",
   "verso": "Por recorte de período conveniente, ausência de base de comparação, confusão entre correlação e causa, ou omissão do universo pesquisado."
  },
  {
   "id": "flash-interpretacao-argumentacao-12",
   "frente": "O que é argumento de causa e consequência?",
   "verso": "Aquele que sustenta a tese demonstrando o encadeamento entre um fato e seus efeitos."
  },
  {
   "id": "flash-interpretacao-argumentacao-13",
   "frente": "O que é argumento por princípio?",
   "verso": "Aquele que se apoia em valores e princípios aceitos socialmente, como a dignidade humana ou a justiça."
  },
  {
   "id": "flash-interpretacao-argumentacao-14",
   "frente": "O que é um contra-argumento?",
   "verso": "A razão apresentada para refutar a tese ou os argumentos do oponente."
  },
  {
   "id": "flash-interpretacao-argumentacao-15",
   "frente": "O que é a concessão, como estratégia argumentativa?",
   "verso": "Admitir parcialmente um ponto do adversário antes de refutá-lo, o que fortalece a credibilidade de quem argumenta."
  },
  {
   "id": "flash-interpretacao-argumentacao-16",
   "frente": "Que conectivos marcam a concessão?",
   "verso": "Embora, ainda que, apesar de, conquanto, mesmo que, é verdade que... mas."
  },
  {
   "id": "flash-interpretacao-argumentacao-17",
   "frente": "O que é refutação?",
   "verso": "A demonstração de que o argumento contrário é falso, insuficiente ou irrelevante."
  },
  {
   "id": "flash-interpretacao-argumentacao-18",
   "frente": "O que é uma falácia?",
   "verso": "Um raciocínio que parece válido mas não sustenta a conclusão, por erro de lógica ou por manipulação."
  },
  {
   "id": "flash-interpretacao-argumentacao-19",
   "frente": "O que é a falácia do espantalho?",
   "verso": "Distorcer ou simplificar a posição do adversário para refutar uma versão enfraquecida dela, e não a original."
  },
  {
   "id": "flash-interpretacao-argumentacao-20",
   "frente": "O que é a falácia ad hominem?",
   "verso": "Atacar a pessoa que sustenta o argumento, em vez do argumento em si."
  },
  {
   "id": "flash-interpretacao-argumentacao-21",
   "frente": "O que é a falácia da generalização indevida?",
   "verso": "Concluir uma regra geral a partir de poucos casos ou de uma amostra não representativa."
  },
  {
   "id": "flash-interpretacao-argumentacao-22",
   "frente": "O que é a falácia do apelo emocional?",
   "verso": "Substituir a razão pela mobilização do medo, da pena ou da indignação para obter adesão."
  },
  {
   "id": "flash-interpretacao-argumentacao-23",
   "frente": "O que é a falácia do falso dilema?",
   "verso": "Apresentar apenas duas alternativas como se não houvesse outras possibilidades."
  },
  {
   "id": "flash-interpretacao-argumentacao-24",
   "frente": "O que é a falácia do apelo à tradição?",
   "verso": "Sustentar que algo é correto apenas por ser antigo ou por 'sempre ter sido assim'."
  },
  {
   "id": "flash-interpretacao-argumentacao-25",
   "frente": "O que é a falácia da petição de princípio?",
   "verso": "Usar como premissa aquilo que se pretende provar, girando em círculo."
  },
  {
   "id": "flash-interpretacao-argumentacao-26",
   "frente": "O que é a falácia post hoc?",
   "verso": "Concluir que um fato causou outro apenas porque veio antes dele."
  },
  {
   "id": "flash-interpretacao-argumentacao-27",
   "frente": "Como se identifica o ponto de vista do autor num texto argumentativo?",
   "verso": "Pela tese defendida, pelos argumentos escolhidos e pelo tratamento dado às posições contrárias."
  },
  {
   "id": "flash-interpretacao-argumentacao-28",
   "frente": "Qual é a diferença entre o ponto de vista do autor e o de uma voz citada?",
   "verso": "A voz citada pode ser trazida para ser refutada; só o exame do comentário do autor revela sua adesão ou recusa."
  },
  {
   "id": "flash-interpretacao-argumentacao-29",
   "frente": "O que é a estratégia de antecipação de objeções?",
   "verso": "Levantar a crítica provável antes que o leitor a formule, para respondê-la e desarmá-la."
  },
  {
   "id": "flash-interpretacao-argumentacao-30",
   "frente": "Que efeito a pergunta retórica produz na argumentação?",
   "verso": "Conduz o leitor à conclusão desejada sem afirmá-la diretamente, criando adesão por cumplicidade."
  },
  {
   "id": "flash-interpretacao-argumentacao-31",
   "frente": "Que efeito o uso da primeira pessoa do plural ('nós') produz num texto argumentativo?",
   "verso": "Cria identificação e inclui o leitor na perspectiva defendida, reduzindo a distância entre autor e público."
  },
  {
   "id": "flash-interpretacao-argumentacao-32",
   "frente": "Como a escolha lexical revela posicionamento?",
   "verso": "Designar o mesmo fato como 'invasão' ou 'ocupação', 'protesto' ou 'baderna', já embute avaliação."
  },
  {
   "id": "flash-interpretacao-argumentacao-33",
   "frente": "O que é a progressão argumentativa?",
   "verso": "O encadeamento em que cada argumento prepara o seguinte, conduzindo à conclusão de forma cumulativa."
  },
  {
   "id": "flash-interpretacao-argumentacao-34",
   "frente": "Qual é a função da conclusão num texto argumentativo?",
   "verso": "Retomar a tese à luz do que foi demonstrado, sem introduzir argumento novo."
  },
  {
   "id": "flash-interpretacao-argumentacao-35",
   "frente": "Qual é o critério para avaliar a força de um argumento?",
   "verso": "Sua pertinência ao ponto em discussão, sua suficiência para sustentar a conclusão e a aceitabilidade de suas premissas."
  }
 ],
 "interpretacao-inferencia": [
  {
   "id": "flash-interpretacao-inferencia-01",
   "frente": "O que é inferência?",
   "verso": "A conclusão que se extrai do texto sem que ela esteja dita com todas as letras, mas que ele autoriza."
  },
  {
   "id": "flash-interpretacao-inferencia-02",
   "frente": "Qual é a diferença entre informação explícita e implícita?",
   "verso": "A explícita está escrita literalmente; a implícita é deduzida a partir do que foi dito e do contexto."
  },
  {
   "id": "flash-interpretacao-inferencia-03",
   "frente": "Qual é o limite de uma inferência válida?",
   "verso": "Ela precisa ser sustentada pelo texto; o que depende só de conhecimento externo ou de suposição não é inferência válida."
  },
  {
   "id": "flash-interpretacao-inferencia-04",
   "frente": "O que é um pressuposto?",
   "verso": "A informação que o enunciado dá como já verdadeira, marcada pela própria estrutura da frase."
  },
  {
   "id": "flash-interpretacao-inferencia-05",
   "frente": "Como se identifica um pressuposto?",
   "verso": "Ele permanece verdadeiro mesmo se a frase for negada: 'Ele parou de fumar' e 'Ele não parou de fumar' pressupõem que ele fumava."
  },
  {
   "id": "flash-interpretacao-inferencia-06",
   "frente": "O que é um subentendido?",
   "verso": "A insinuação que depende do contexto e da intenção, e da qual o falante pode se esquivar."
  },
  {
   "id": "flash-interpretacao-inferencia-07",
   "frente": "Qual é a diferença prática entre pressuposto e subentendido?",
   "verso": "O pressuposto está inscrito na linguagem e não pode ser negado; o subentendido depende da situação e pode ser desmentido pelo falante."
  },
  {
   "id": "flash-interpretacao-inferencia-08",
   "frente": "Que palavras costumam marcar pressupostos?",
   "verso": "Verbos como 'parar', 'continuar', 'voltar', 'deixar de', e advérbios como 'ainda', 'já', 'também'."
  },
  {
   "id": "flash-interpretacao-inferencia-09",
   "frente": "O que a frase 'Ele continua honesto' pressupõe?",
   "verso": "Que ele já era honesto antes."
  },
  {
   "id": "flash-interpretacao-inferencia-10",
   "frente": "O que a frase 'Até o diretor aprovou' pressupõe?",
   "verso": "Que o diretor era o menos provável de aprovar, e que outros já aprovaram."
  },
  {
   "id": "flash-interpretacao-inferencia-11",
   "frente": "O que a frase 'Maria também foi aprovada' pressupõe?",
   "verso": "Que outra pessoa, além de Maria, foi aprovada."
  },
  {
   "id": "flash-interpretacao-inferencia-12",
   "frente": "Como uma questão de inferência se anuncia num enunciado?",
   "verso": "Por expressões como 'depreende-se', 'infere-se', 'conclui-se', 'o texto permite afirmar' ou 'nas entrelinhas'."
  },
  {
   "id": "flash-interpretacao-inferencia-13",
   "frente": "Por que a alternativa que apenas repete o texto costuma estar errada numa questão de inferência?",
   "verso": "Porque a questão pede o que se DEDUZ, não o que está dito — a paráfrase literal não é inferência."
  },
  {
   "id": "flash-interpretacao-inferencia-14",
   "frente": "Qual é o erro mais comum ao inferir num texto de prova?",
   "verso": "Extrapolar: concluir mais do que o texto sustenta, apoiando-se no que se sabe do mundo."
  },
  {
   "id": "flash-interpretacao-inferencia-15",
   "frente": "Como testar se uma inferência é válida?",
   "verso": "Perguntar: 'que trecho do texto sustenta isso?' Se nenhum sustentar, a inferência é extrapolação."
  },
  {
   "id": "flash-interpretacao-inferencia-16",
   "frente": "Por que alternativas com 'sempre', 'nunca' e 'todos' costumam falhar em inferência?",
   "verso": "Porque textos raramente autorizam generalizações absolutas; basta um contraexemplo no texto para invalidá-las."
  },
  {
   "id": "flash-interpretacao-inferencia-17",
   "frente": "O que é ironia, do ponto de vista da inferência?",
   "verso": "Um caso de sentido implícito em que o enunciado significa o oposto do que declara literalmente."
  },
  {
   "id": "flash-interpretacao-inferencia-18",
   "frente": "Como o contexto ajuda a distinguir ironia de afirmação literal?",
   "verso": "Pelo descompasso entre o que se diz e a situação descrita, além de marcas de exagero, aspas e tom avaliativo."
  },
  {
   "id": "flash-interpretacao-inferencia-19",
   "frente": "Como se infere a atitude ou o posicionamento do autor?",
   "verso": "Pelos adjetivos avaliativos, pelos verbos escolhidos, pelos advérbios modalizadores e pelo que ele decide destacar ou omitir."
  },
  {
   "id": "flash-interpretacao-inferencia-20",
   "frente": "O que são modalizadores, e o que revelam?",
   "verso": "Palavras que marcam o grau de adesão do autor ao que diz — 'certamente', 'talvez', 'supostamente' — revelando certeza ou reserva."
  },
  {
   "id": "flash-interpretacao-inferencia-21",
   "frente": "Que diferença de posicionamento há entre 'o governo alega' e 'o governo demonstra'?",
   "verso": "'Alegar' sinaliza reserva do autor quanto à veracidade; 'demonstrar' sinaliza adesão."
  },
  {
   "id": "flash-interpretacao-inferencia-22",
   "frente": "Como as aspas podem sinalizar um sentido implícito?",
   "verso": "Podem marcar distanciamento crítico do autor em relação ao termo, indicando que ele não assume aquela designação."
  },
  {
   "id": "flash-interpretacao-inferencia-23",
   "frente": "O que se pode inferir do uso de diminutivos num texto?",
   "verso": "Podem indicar afeto, mas também depreciação ou ironia, conforme o contexto."
  },
  {
   "id": "flash-interpretacao-inferencia-24",
   "frente": "Como se infere a intenção de um texto publicitário?",
   "verso": "Pelo apelo ao desejo do público-alvo e pela associação do produto a valores positivos, ainda que não afirmados diretamente."
  },
  {
   "id": "flash-interpretacao-inferencia-25",
   "frente": "Por que a resposta correta numa questão de inferência costuma parecer 'óbvia demais'?",
   "verso": "Porque a inferência válida é sempre modesta: ela dá apenas um passo além do texto, não vários."
  },
  {
   "id": "flash-interpretacao-inferencia-26",
   "frente": "Qual é a diferença entre inferir e opinar?",
   "verso": "Inferir é reconstruir o que o texto autoriza; opinar é acrescentar a própria posição, o que a questão não pede."
  },
  {
   "id": "flash-interpretacao-inferencia-27",
   "frente": "O que fazer quando duas alternativas são inferências plausíveis?",
   "verso": "Escolher a mais diretamente ancorada no texto; a outra provavelmente depende de premissa externa."
  },
  {
   "id": "flash-interpretacao-inferencia-28",
   "frente": "Como o título de um texto pode gerar inferências?",
   "verso": "Pode antecipar o posicionamento do autor ou criar expectativa que o texto confirma ou frustra deliberadamente."
  },
  {
   "id": "flash-interpretacao-inferencia-29",
   "frente": "O que se pode inferir de uma informação deliberadamente omitida?",
   "verso": "Que a omissão pode ser estratégica — sinal de recorte intencional ou de posição do autor sobre o que merece destaque."
  },
  {
   "id": "flash-interpretacao-inferencia-30",
   "frente": "Como se infere sentido a partir de um dado estatístico citado?",
   "verso": "Observando para que fim o autor o mobiliza: o mesmo número pode sustentar leituras opostas conforme a comparação escolhida."
  },
  {
   "id": "flash-interpretacao-inferencia-31",
   "frente": "Por que a comparação entre duas vozes citadas gera inferência?",
   "verso": "Porque a ordem, o espaço e o comentário dado a cada uma revelam qual delas o texto privilegia."
  },
  {
   "id": "flash-interpretacao-inferencia-32",
   "frente": "O que é uma inferência causal?",
   "verso": "A conclusão de que um fato decorre de outro, ainda que o texto não use conectivo explícito de causa."
  },
  {
   "id": "flash-interpretacao-inferencia-33",
   "frente": "Qual é o cuidado ao inferir relação de causa entre dois fatos apresentados juntos?",
   "verso": "Proximidade ou sequência não implica causalidade — o texto precisa autorizar o vínculo."
  }
 ],
 "interpretacao-genero-discurso": [
  {
   "id": "flash-interpretacao-genero-discurso-01",
   "frente": "O que é um gênero textual?",
   "verso": "Uma forma relativamente estável de texto, definida pela função social, pela estrutura e pelo suporte em que circula."
  },
  {
   "id": "flash-interpretacao-genero-discurso-02",
   "frente": "Qual é a diferença entre gênero e tipo textual?",
   "verso": "O tipo é a sequência linguística (narração, descrição, dissertação, exposição, injunção); o gênero é o texto concreto que circula socialmente."
  },
  {
   "id": "flash-interpretacao-genero-discurso-03",
   "frente": "Quais são os cinco tipos textuais?",
   "verso": "Narração, descrição, dissertação-argumentativa, exposição e injunção."
  },
  {
   "id": "flash-interpretacao-genero-discurso-04",
   "frente": "O que caracteriza uma notícia?",
   "verso": "O relato objetivo de fato recente, com lide respondendo o quê, quem, quando, onde, como e por quê."
  },
  {
   "id": "flash-interpretacao-genero-discurso-05",
   "frente": "O que é o lide (lead) de uma notícia?",
   "verso": "O primeiro parágrafo, que concentra as informações essenciais do fato relatado."
  },
  {
   "id": "flash-interpretacao-genero-discurso-06",
   "frente": "O que é a pirâmide invertida no jornalismo?",
   "verso": "A organização que apresenta primeiro o mais importante e depois os detalhes, permitindo corte pelo fim sem perda essencial."
  },
  {
   "id": "flash-interpretacao-genero-discurso-07",
   "frente": "Qual é a diferença entre notícia e reportagem?",
   "verso": "A notícia relata o fato; a reportagem aprofunda, contextualiza, ouve fontes e investiga."
  },
  {
   "id": "flash-interpretacao-genero-discurso-08",
   "frente": "O que caracteriza um editorial?",
   "verso": "Expressa a posição institucional do veículo, sem assinatura individual."
  },
  {
   "id": "flash-interpretacao-genero-discurso-09",
   "frente": "Qual é a diferença entre editorial e artigo de opinião?",
   "verso": "O editorial é a voz da empresa jornalística; o artigo de opinião é assinado e expressa a posição de seu autor."
  },
  {
   "id": "flash-interpretacao-genero-discurso-10",
   "frente": "O que caracteriza a crônica?",
   "verso": "Texto curto que parte de um fato cotidiano para uma reflexão subjetiva, com linguagem leve e tom pessoal."
  },
  {
   "id": "flash-interpretacao-genero-discurso-11",
   "frente": "O que caracteriza a charge?",
   "verso": "O desenho de humor com crítica a fato ou personagem da atualidade, com forte dependência do contexto."
  },
  {
   "id": "flash-interpretacao-genero-discurso-12",
   "frente": "Qual é a diferença entre charge, cartum e tirinha?",
   "verso": "A charge trata de fato datado e específico; o cartum aborda situação universal; a tirinha é narrativa sequencial em poucos quadros."
  },
  {
   "id": "flash-interpretacao-genero-discurso-13",
   "frente": "O que caracteriza uma resenha?",
   "verso": "Apresenta e avalia criticamente uma obra, combinando descrição do conteúdo com julgamento fundamentado."
  },
  {
   "id": "flash-interpretacao-genero-discurso-14",
   "frente": "O que caracteriza um verbete?",
   "verso": "A definição objetiva e concisa de um termo, organizada alfabeticamente em dicionários e enciclopédias."
  },
  {
   "id": "flash-interpretacao-genero-discurso-15",
   "frente": "O que caracteriza uma carta argumentativa?",
   "verso": "Dirige-se a interlocutor determinado, com estrutura de vocativo, corpo argumentativo e despedida, para defender um ponto de vista."
  },
  {
   "id": "flash-interpretacao-genero-discurso-16",
   "frente": "O que é o suporte de um texto?",
   "verso": "O meio material ou virtual em que ele circula — jornal, revista, rede social, outdoor — que condiciona linguagem e extensão."
  },
  {
   "id": "flash-interpretacao-genero-discurso-17",
   "frente": "Como o suporte influencia a linguagem de um texto?",
   "verso": "Determina extensão, grau de formalidade e recursos disponíveis: um post e um artigo acadêmico tratam o mesmo tema de modos distintos."
  },
  {
   "id": "flash-interpretacao-genero-discurso-18",
   "frente": "O que é a esfera de circulação de um texto?",
   "verso": "O domínio social em que ele opera — jornalístico, acadêmico, jurídico, publicitário, literário —, que define suas convenções."
  },
  {
   "id": "flash-interpretacao-genero-discurso-19",
   "frente": "O que é o interlocutor (público-alvo) de um texto?",
   "verso": "A quem o texto se dirige; sua identificação explica escolhas de vocabulário, exemplos e grau de formalidade."
  },
  {
   "id": "flash-interpretacao-genero-discurso-20",
   "frente": "Como se identifica o público-alvo de um texto?",
   "verso": "Pelo vocabulário empregado, pelos pressupostos de conhecimento assumidos e pelo suporte em que circula."
  },
  {
   "id": "flash-interpretacao-genero-discurso-21",
   "frente": "O que é o narrador de um texto?",
   "verso": "A voz que conta a história, distinta do autor real, que é a pessoa que escreveu."
  },
  {
   "id": "flash-interpretacao-genero-discurso-22",
   "frente": "O que caracteriza o narrador em primeira pessoa?",
   "verso": "Participa da história como personagem, oferecendo visão parcial e subjetiva dos fatos."
  },
  {
   "id": "flash-interpretacao-genero-discurso-23",
   "frente": "O que caracteriza o narrador observador?",
   "verso": "Narra em terceira pessoa relatando apenas o que é externamente perceptível, sem acesso à interioridade das personagens."
  },
  {
   "id": "flash-interpretacao-genero-discurso-24",
   "frente": "O que caracteriza o narrador onisciente?",
   "verso": "Narra em terceira pessoa conhecendo pensamentos, sentimentos e o passado de todas as personagens."
  },
  {
   "id": "flash-interpretacao-genero-discurso-25",
   "frente": "O que é foco narrativo?",
   "verso": "A perspectiva a partir da qual a história é contada, definida pela posição e pelo alcance do narrador."
  },
  {
   "id": "flash-interpretacao-genero-discurso-26",
   "frente": "Por que o narrador em primeira pessoa pode ser não confiável?",
   "verso": "Porque sua visão é limitada e interessada, e ele pode distorcer os fatos deliberadamente ou por autoengano."
  },
  {
   "id": "flash-interpretacao-genero-discurso-27",
   "frente": "O que é discurso direto?",
   "verso": "A reprodução literal da fala da personagem, marcada por travessão ou aspas e verbo dicendi."
  },
  {
   "id": "flash-interpretacao-genero-discurso-28",
   "frente": "O que é discurso indireto?",
   "verso": "A fala da personagem incorporada à do narrador, subordinada por conjunção e com ajuste de tempos e pronomes."
  },
  {
   "id": "flash-interpretacao-genero-discurso-29",
   "frente": "O que é discurso indireto livre?",
   "verso": "A fusão entre a voz do narrador e a da personagem, sem marcas gráficas nem verbo introdutório."
  },
  {
   "id": "flash-interpretacao-genero-discurso-30",
   "frente": "Qual é o efeito do discurso indireto livre?",
   "verso": "Aproxima o leitor da consciência da personagem, apagando a fronteira entre quem narra e quem pensa."
  },
  {
   "id": "flash-interpretacao-genero-discurso-31",
   "frente": "O que são verbos dicendi, e o que revelam?",
   "verso": "Verbos que introduzem falas ('disse', 'gritou', 'murmurou', 'alegou'); a escolha revela a avaliação do narrador sobre o que é dito."
  },
  {
   "id": "flash-interpretacao-genero-discurso-32",
   "frente": "O que é o eu lírico?",
   "verso": "A voz que se expressa num poema, distinta do poeta real que o escreveu."
  },
  {
   "id": "flash-interpretacao-genero-discurso-33",
   "frente": "Por que não se deve confundir eu lírico com o autor?",
   "verso": "Porque o eu lírico é uma construção do texto; atribuir ao autor as emoções expressas é leitura biográfica indevida."
  },
  {
   "id": "flash-interpretacao-genero-discurso-34",
   "frente": "Como o gênero condiciona a interpretação de um texto?",
   "verso": "Cada gênero cria expectativas próprias de leitura: o que é exagero legítimo na publicidade seria imprecisão numa notícia."
  }
 ],
 "interpretacao-recursos-linguagem": [
  {
   "id": "flash-interpretacao-recursos-linguagem-01",
   "frente": "O que é uma figura de linguagem?",
   "verso": "Um recurso expressivo que desloca o uso comum da língua para produzir efeito de sentido, ênfase ou beleza."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-02",
   "frente": "O que é metáfora?",
   "verso": "A comparação implícita entre dois elementos por uma semelhança, sem conectivo comparativo: 'Ele é uma fera.'"
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-03",
   "frente": "Qual é a diferença entre metáfora e comparação (símile)?",
   "verso": "A comparação traz conectivo explícito ('como', 'tal qual'); a metáfora funde os termos sem ele."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-04",
   "frente": "O que é metonímia?",
   "verso": "A substituição de um termo por outro com que mantém relação de contiguidade: 'Li Machado de Assis' (a obra pelo autor)."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-05",
   "frente": "Quais são as relações típicas da metonímia?",
   "verso": "Autor pela obra, parte pelo todo, continente pelo conteúdo, marca pelo produto, causa pelo efeito."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-06",
   "frente": "O que é catacrese?",
   "verso": "A metáfora já cristalizada no uso, que nomeia algo sem termo próprio: 'braço da cadeira', 'pé da mesa'."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-07",
   "frente": "O que é hipérbole?",
   "verso": "O exagero intencional para intensificar a expressão: 'Chorei rios de lágrimas.'"
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-08",
   "frente": "O que é eufemismo?",
   "verso": "A substituição de uma expressão dura por outra mais suave: 'partiu desta para melhor'."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-09",
   "frente": "O que é a antítese?",
   "verso": "A aproximação de termos de sentidos opostos: 'Era o melhor dos tempos, era o pior dos tempos.'"
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-10",
   "frente": "O que é paradoxo (oxímoro)?",
   "verso": "A união de ideias contraditórias numa mesma expressão, criando tensão lógica: 'silêncio ensurdecedor'."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-11",
   "frente": "Qual é a diferença entre antítese e paradoxo?",
   "verso": "A antítese opõe termos que coexistem; o paradoxo funde termos logicamente incompatíveis num só conceito."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-12",
   "frente": "O que é personificação (prosopopeia)?",
   "verso": "A atribuição de características humanas a seres inanimados, animais ou abstrações: 'O vento sussurrava.'"
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-13",
   "frente": "O que é ironia?",
   "verso": "O uso de um enunciado cujo sentido pretendido é oposto ao literal, geralmente com intenção crítica ou humorística."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-14",
   "frente": "Qual é a diferença entre ironia e sarcasmo?",
   "verso": "O sarcasmo é uma ironia mais agressiva, com intenção explícita de ferir ou ridicularizar."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-15",
   "frente": "O que é a sinestesia?",
   "verso": "O cruzamento de sensações de sentidos diferentes: 'voz doce', 'cor quente'."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-16",
   "frente": "O que é pleonasmo como recurso expressivo?",
   "verso": "A redundância intencional para reforçar a ideia: 'Vi com meus próprios olhos.'"
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-17",
   "frente": "O que é a gradação?",
   "verso": "A disposição de ideias em intensidade crescente ou decrescente: 'Chegou, olhou, hesitou, fugiu.'"
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-18",
   "frente": "O que é anáfora, como figura de linguagem?",
   "verso": "A repetição de uma palavra ou expressão no início de versos ou frases sucessivas, criando ritmo e ênfase."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-19",
   "frente": "O que é o paralelismo?",
   "verso": "A repetição de uma mesma estrutura sintática, que cria simetria e reforça a articulação das ideias."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-20",
   "frente": "O que é aliteração?",
   "verso": "A repetição de sons consonantais próximos, produzindo efeito sonoro: 'O rato roeu a roupa.'"
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-21",
   "frente": "O que é assonância?",
   "verso": "A repetição de sons vocálicos próximos, criando musicalidade no enunciado."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-22",
   "frente": "O que é onomatopeia?",
   "verso": "A palavra que imita um som natural: 'tique-taque', 'zunido', 'miau'."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-23",
   "frente": "O que é elipse, como recurso de estilo?",
   "verso": "A omissão de um termo facilmente recuperável, que dá concisão e agilidade ao texto."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-24",
   "frente": "O que é hipérbato (inversão)?",
   "verso": "A alteração da ordem natural dos termos da oração, com efeito de ênfase ou de solenidade."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-25",
   "frente": "O que é a apóstrofe?",
   "verso": "A interpelação enfática de um interlocutor real ou imaginário: 'Ó tempo, para!'"
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-26",
   "frente": "Qual é a diferença entre denotação e conotação num texto?",
   "verso": "A denotação é o sentido literal e dicionarizado; a conotação é o sentido figurado, construído pelo contexto."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-27",
   "frente": "Em que tipos de texto a linguagem denotativa predomina?",
   "verso": "Nos textos científicos, jornalísticos informativos, jurídicos e instrucionais, que buscam precisão."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-28",
   "frente": "O que é registro formal e informal?",
   "verso": "O grau de monitoramento da linguagem conforme a situação: o formal segue a norma-padrão; o informal admite coloquialismos."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-29",
   "frente": "Como se identifica o tom de um texto?",
   "verso": "Pela escolha lexical, pela pontuação, pelo ritmo e pelas figuras empregadas — tom irônico, solene, indignado, nostálgico."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-30",
   "frente": "Que efeito o uso de linguagem coloquial produz num texto literário?",
   "verso": "Aproxima o leitor, caracteriza personagens socialmente e confere verossimilhança à fala representada."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-31",
   "frente": "Que efeito o uso de jargão técnico produz?",
   "verso": "Confere autoridade e precisão, mas pode excluir o leitor não especializado."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-32",
   "frente": "Qual é a função do humor num texto crítico?",
   "verso": "Tornar a crítica mais palatável e ampliar sua circulação, sem abrir mão da denúncia."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-33",
   "frente": "O que é a sátira?",
   "verso": "O gênero ou recurso que ridiculariza vícios e comportamentos sociais com intenção crítica e corretiva."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-34",
   "frente": "O que é intertextualidade explícita e implícita?",
   "verso": "A explícita cita ou nomeia a fonte; a implícita alude a ela sem identificá-la, exigindo repertório do leitor."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-35",
   "frente": "O que é a paródia?",
   "verso": "A retomada de um texto conhecido com inversão de sentido, geralmente com efeito crítico ou cômico."
  },
  {
   "id": "flash-interpretacao-recursos-linguagem-36",
   "frente": "Qual é a diferença entre paródia e paráfrase?",
   "verso": "A paráfrase reformula preservando o sentido original; a paródia reformula subvertendo-o."
  }
 ],
 "interpretacao-estrutura-coesao": [
  {
   "id": "flash-interpretacao-estrutura-coesao-01",
   "frente": "Qual é a estrutura básica de um texto dissertativo?",
   "verso": "Introdução, desenvolvimento e conclusão."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-02",
   "frente": "Qual é a função da introdução num texto dissertativo?",
   "verso": "Contextualizar o tema e apresentar a tese ou o problema que será desenvolvido."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-03",
   "frente": "Qual é a função do desenvolvimento?",
   "verso": "Sustentar a tese com argumentos, dados e exemplos, um aspecto por parágrafo."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-04",
   "frente": "Qual é a função da conclusão?",
   "verso": "Retomar a tese à luz do que foi demonstrado, fechando o raciocínio sem introduzir argumento novo."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-05",
   "frente": "O que é um parágrafo, do ponto de vista da estrutura textual?",
   "verso": "A unidade que desenvolve uma ideia-núcleo, com tópico frasal, desenvolvimento e, por vezes, fechamento."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-06",
   "frente": "O que é o tópico frasal?",
   "verso": "A frase que enuncia a ideia central do parágrafo, geralmente na abertura."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-07",
   "frente": "O que é progressão textual?",
   "verso": "O avanço da informação ao longo do texto, com cada parte acrescentando algo novo sem perder o fio temático."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-08",
   "frente": "O que acontece quando falha a progressão textual?",
   "verso": "O texto fica circular — repete a mesma ideia com outras palavras sem avançar no raciocínio."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-09",
   "frente": "O que são elementos coesivos?",
   "verso": "As palavras e expressões que ligam partes do texto: conectivos, pronomes, advérbios e sinônimos."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-10",
   "frente": "Como um pronome funciona como elemento de coesão?",
   "verso": "Retomando um termo já mencionado, evitando repetição e mantendo a referência: 'Comprei o livro. ELE é ótimo.'"
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-11",
   "frente": "O que é referência anafórica?",
   "verso": "A retomada de um termo mencionado ANTES no texto."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-12",
   "frente": "O que é referência catafórica?",
   "verso": "A antecipação de um termo que só será mencionado DEPOIS: 'Só peço isto: silêncio.'"
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-13",
   "frente": "Como se identifica o referente de um pronome numa questão?",
   "verso": "Buscando o termo anterior com que ele concorda em gênero e número e que faz sentido na substituição."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-14",
   "frente": "Qual é o teste prático para confirmar o referente de um pronome?",
   "verso": "Substituir o pronome pelo candidato a referente e verificar se a frase mantém sentido e concordância."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-15",
   "frente": "Que problema surge quando um pronome tem dois referentes possíveis?",
   "verso": "Ambiguidade — o leitor não sabe a qual termo ele remete, e o sentido fica indeterminado."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-16",
   "frente": "Que conectivo marca relação de adição?",
   "verso": "E, além disso, ademais, também, não só... mas também."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-17",
   "frente": "Que conectivo marca relação de oposição?",
   "verso": "Mas, porém, contudo, todavia, entretanto, no entanto, em contrapartida."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-18",
   "frente": "Que conectivo marca relação de causa?",
   "verso": "Porque, pois, já que, uma vez que, visto que, dado que."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-19",
   "frente": "Que conectivo marca relação de consequência?",
   "verso": "De modo que, de sorte que, tanto que, tal que, a ponto de."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-20",
   "frente": "Que conectivo marca relação de conclusão?",
   "verso": "Portanto, logo, assim, por isso, dessa forma, em suma."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-21",
   "frente": "Que conectivo marca relação de finalidade?",
   "verso": "Para que, a fim de que, com o propósito de, com o intuito de."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-22",
   "frente": "Que conectivo marca relação de condição?",
   "verso": "Se, caso, desde que, contanto que, a menos que, salvo se."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-23",
   "frente": "Que conectivo marca relação de concessão?",
   "verso": "Embora, ainda que, apesar de, mesmo que, conquanto, se bem que."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-24",
   "frente": "Qual é a diferença entre relação de oposição e de concessão?",
   "verso": "A oposição contrapõe duas ideias no mesmo nível; a concessão admite uma ideia que, contra a expectativa, não impede a outra."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-25",
   "frente": "O que muda ao substituir 'porque' por 'embora' numa frase?",
   "verso": "Inverte-se a relação lógica: de causa passa a concessão, e o sentido do período se altera por completo."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-26",
   "frente": "Como se identifica a relação lógica entre dois parágrafos sem conectivo explícito?",
   "verso": "Pelo conteúdo: verifica-se se o segundo acrescenta, contrapõe, exemplifica, explica ou conclui em relação ao primeiro."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-27",
   "frente": "Qual é a função de um parágrafo de transição?",
   "verso": "Articular dois blocos temáticos, encerrando um aspecto e anunciando o próximo."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-28",
   "frente": "O que é a repetição como recurso de coesão, e quando ela é defeito?",
   "verso": "É recurso quando reforça deliberadamente uma ideia-chave; é defeito quando revela pobreza vocabular e trava a progressão."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-29",
   "frente": "Como a substituição lexical contribui para a coesão?",
   "verso": "Retoma um termo por sinônimo ou expressão equivalente, evitando repetição e acrescentando informação: 'Machado de Assis... o autor carioca...'"
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-30",
   "frente": "O que é coesão por hiperônimo?",
   "verso": "A retomada de um termo específico por outro mais geral: 'o cão... o animal...'"
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-31",
   "frente": "Como os marcadores de ordenação organizam o texto?",
   "verso": "Sinalizam a sequência dos argumentos — 'em primeiro lugar', 'em seguida', 'por fim' — orientando o leitor pela estrutura."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-32",
   "frente": "O que é a articulação entre tese e argumentos?",
   "verso": "A relação em que cada argumento é apresentado explicitamente como sustentação da tese anunciada."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-33",
   "frente": "Por que a ordem dos parágrafos importa na argumentação?",
   "verso": "Porque a progressão cumulativa constrói a conclusão; trocar a ordem pode quebrar o encadeamento lógico."
  },
  {
   "id": "flash-interpretacao-estrutura-coesao-34",
   "frente": "Como se verifica se um conectivo foi empregado adequadamente?",
   "verso": "Testando se a relação lógica que ele expressa corresponde à relação real entre as ideias que liga."
  }
 ],
 "interpretacao-ideia-central": [
  {
   "id": "flash-interpretacao-ideia-central-01",
   "frente": "O que é a ideia central de um texto?",
   "verso": "O eixo temático que sustenta o conjunto: aquilo sem o qual o texto perde a razão de existir."
  },
  {
   "id": "flash-interpretacao-ideia-central-02",
   "frente": "Qual é a diferença entre tema e tese?",
   "verso": "O tema é o assunto tratado; a tese é a posição que o autor defende sobre esse assunto."
  },
  {
   "id": "flash-interpretacao-ideia-central-03",
   "frente": "Como o tema costuma ser formulado, em contraste com a tese?",
   "verso": "O tema é um substantivo ou sintagma ('a desigualdade urbana'); a tese é uma afirmação completa, com verbo, que pode ser aceita ou recusada."
  },
  {
   "id": "flash-interpretacao-ideia-central-04",
   "frente": "Onde a tese costuma aparecer num artigo de opinião?",
   "verso": "No primeiro ou no último parágrafo — na introdução, como anúncio, ou na conclusão, como fechamento."
  },
  {
   "id": "flash-interpretacao-ideia-central-05",
   "frente": "Qual é a técnica mais confiável para localizar a ideia central?",
   "verso": "Identificar a ideia que se repete, reformulada, ao longo de vários parágrafos — a recorrência é o melhor indício."
  },
  {
   "id": "flash-interpretacao-ideia-central-06",
   "frente": "Por que a ideia central raramente está numa única frase isolada?",
   "verso": "Porque costuma ser construída ao longo do texto; uma frase isolada pode ser exemplo ou concessão, não o eixo."
  },
  {
   "id": "flash-interpretacao-ideia-central-07",
   "frente": "O que caracteriza um bom título para um texto?",
   "verso": "Ele abrange o texto INTEIRO, não apenas um trecho, e não acrescenta informação que o texto não traz."
  },
  {
   "id": "flash-interpretacao-ideia-central-08",
   "frente": "Qual é o erro mais comum ao escolher o melhor título numa questão?",
   "verso": "Escolher a alternativa que reproduz um detalhe marcante ou um exemplo, em vez do eixo do texto."
  },
  {
   "id": "flash-interpretacao-ideia-central-09",
   "frente": "O que é uma síntese adequada de um texto?",
   "verso": "A reformulação que preserva a hierarquia das ideias, mantendo o essencial e descartando o acessório."
  },
  {
   "id": "flash-interpretacao-ideia-central-10",
   "frente": "Por que uma síntese não pode ser uma colagem de trechos?",
   "verso": "Porque a síntese exige reorganizar as ideias segundo sua importância, e não apenas reproduzir frases na ordem original."
  },
  {
   "id": "flash-interpretacao-ideia-central-11",
   "frente": "Que erro invalida uma alternativa de síntese, mesmo sendo verdadeira?",
   "verso": "Ser verdadeira mas parcial — cobrir só uma parte do texto, deixando de fora o eixo argumentativo."
  },
  {
   "id": "flash-interpretacao-ideia-central-12",
   "frente": "O que é a finalidade (propósito comunicativo) de um texto?",
   "verso": "O efeito que o autor pretende produzir: informar, convencer, comover, instruir, entreter ou denunciar."
  },
  {
   "id": "flash-interpretacao-ideia-central-13",
   "frente": "Como se identifica o propósito predominante de um texto?",
   "verso": "Pelo gênero, pelo suporte em que circula e pelas marcas linguísticas — verbos no imperativo, adjetivos avaliativos, dados objetivos."
  },
  {
   "id": "flash-interpretacao-ideia-central-14",
   "frente": "Qual é o propósito predominante de um editorial?",
   "verso": "Convencer o leitor da posição institucional do veículo sobre um tema em pauta."
  },
  {
   "id": "flash-interpretacao-ideia-central-15",
   "frente": "Qual é o propósito predominante de uma notícia?",
   "verso": "Informar sobre um fato recente, com prioridade para o relato objetivo dos acontecimentos."
  },
  {
   "id": "flash-interpretacao-ideia-central-16",
   "frente": "Qual é o propósito predominante de um texto instrucional, como um manual?",
   "verso": "Orientar a execução de uma tarefa, o que se reflete no uso de verbos no imperativo e na sequência numerada."
  },
  {
   "id": "flash-interpretacao-ideia-central-17",
   "frente": "Qual é a diferença entre assunto e abordagem?",
   "verso": "O assunto é sobre o que se fala; a abordagem é o recorte e a perspectiva adotados para tratá-lo."
  },
  {
   "id": "flash-interpretacao-ideia-central-18",
   "frente": "Como o parágrafo de abertura ajuda a antecipar a ideia central?",
   "verso": "Costuma trazer a contextualização e o anúncio do problema que o texto vai desenvolver."
  },
  {
   "id": "flash-interpretacao-ideia-central-19",
   "frente": "Qual é a função do tópico frasal num parágrafo?",
   "verso": "Enunciar a ideia-núcleo que o restante do parágrafo desenvolve, exemplifica ou comprova."
  },
  {
   "id": "flash-interpretacao-ideia-central-20",
   "frente": "Como identificar a ideia central de um texto literário, que não tem tese explícita?",
   "verso": "Pelo conflito ou tensão dominante e pelo efeito de sentido construído, não por uma afirmação a ser localizada."
  },
  {
   "id": "flash-interpretacao-ideia-central-21",
   "frente": "Por que a ideia central de um poema não é seu 'resumo'?",
   "verso": "Porque o poema constrói sentido também pela forma, pelas imagens e pelo ritmo, que não sobrevivem à paráfrase."
  },
  {
   "id": "flash-interpretacao-ideia-central-22",
   "frente": "Como um gráfico ou uma imagem se relaciona com a ideia central de um texto?",
   "verso": "Costuma reforçá-la ou ilustrá-la; interpretá-lo isoladamente, sem o texto, produz leitura incompleta."
  },
  {
   "id": "flash-interpretacao-ideia-central-23",
   "frente": "O que fazer quando duas alternativas parecem sintetizar o texto?",
   "verso": "Verificar qual delas cobre todo o texto: a outra provavelmente é verdadeira apenas para uma parte."
  },
  {
   "id": "flash-interpretacao-ideia-central-24",
   "frente": "Por que uma alternativa 'exagerada' costuma estar errada, mesmo parecendo correta?",
   "verso": "Porque generaliza além do que o texto autoriza — palavras como 'sempre', 'nunca' e 'todos' extrapolam o alcance da tese."
  },
  {
   "id": "flash-interpretacao-ideia-central-25",
   "frente": "Qual é a diferença entre a ideia central e um argumento de apoio?",
   "verso": "A ideia central é o que se defende; o argumento de apoio é o que sustenta essa defesa."
  },
  {
   "id": "flash-interpretacao-ideia-central-26",
   "frente": "Como se percebe que um trecho é exemplo, e não a ideia central?",
   "verso": "Ele particulariza um caso concreto e costuma vir introduzido por marcadores como 'por exemplo', 'é o caso de', 'basta lembrar'."
  },
  {
   "id": "flash-interpretacao-ideia-central-27",
   "frente": "Como a leitura do primeiro e do último parágrafo ajuda numa prova?",
   "verso": "Costumam concentrar apresentação e fechamento da tese, dando o eixo antes da leitura integral detalhada."
  },
  {
   "id": "flash-interpretacao-ideia-central-28",
   "frente": "O que significa dizer que um texto é predominantemente expositivo?",
   "verso": "Que ele apresenta e explica um assunto sem defender abertamente uma posição sobre ele."
  },
  {
   "id": "flash-interpretacao-ideia-central-29",
   "frente": "Qual é a diferença entre texto expositivo e argumentativo?",
   "verso": "O expositivo informa e explica; o argumentativo defende um ponto de vista e busca convencer."
  },
  {
   "id": "flash-interpretacao-ideia-central-30",
   "frente": "Como se reconhece a progressão de uma ideia central ao longo dos parágrafos?",
   "verso": "Cada parágrafo acrescenta um aspecto novo do mesmo tema, sem repetir o anterior nem mudar de assunto."
  },
  {
   "id": "flash-interpretacao-ideia-central-31",
   "frente": "Por que reler o enunciado da questão antes de escolher a alternativa é decisivo?",
   "verso": "Porque o comando define o que se pede — tese, tema, título ou finalidade — e cada um exige uma resposta diferente."
  },
  {
   "id": "flash-interpretacao-ideia-central-32",
   "frente": "O que fazer quando o texto reúne vozes divergentes sobre o assunto?",
   "verso": "Identificar qual delas o autor endossa; a ideia central é a posição do texto, não a de todas as vozes citadas."
  },
  {
   "id": "flash-interpretacao-ideia-central-33",
   "frente": "Qual é o risco de responder a uma questão de ideia central com base no conhecimento prévio?",
   "verso": "Escolher a alternativa mais plausível no mundo, e não a efetivamente defendida naquele texto."
  }
 ]
};
