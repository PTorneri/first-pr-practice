// Compõe os flashcards de repetição espaçada da trilha de Economia.
//
//   node vestibular-economia/build-flashcards.js              compõe
//   node vestibular-economia/build-flashcards.js --verificar   só checa se está velho
//
// POR QUE ISTO COMPÕE MAIS DO QUE A TEORIA COMPÔS
//
// build-theory.js recusou herdar Matemática, Natureza e Literatura de Direito
// e Medicina porque teoria ali é "gatilhos e pegadinhas" — conhecimento AMARRADO
// ao formato de prova de uma banca específica (quantas discursivas, que peso,
// que tipo de distrator). Um flashcard não é isso: é um par pergunta/resposta
// sobre um FATO ("como fica a concordância verbal quando o sujeito composto vem
// antes do verbo?"), e fato não muda com o edital. A prova disso está no
// próprio conteúdo — os flashcards de Biologia de Medicina falam de organela,
// heredograma e fisiologia, não de Santa Casa nem de Unifesp; os de Literatura
// de Direito falam de Barroco e Realismo, não da lista de leitura da FGV.
//
// Por isso, aqui, QUINZE das vinte frentes são compostas — quatorze 1:1 de
// Direito ou Medicina, mais História, que soma historia-brasil e
// historia-geral de Direito na única frente de História que Economia tem.
//
// AS CINCO QUE NÃO TINHAM DE ONDE COPIAR
//
// Matemática. Direito tem UM arquivo (matematica-rlm.json, 80 cards) cobrindo
// a matéria inteira; Economia parte a mesma Matemática em cinco frentes (ver
// classificar-matematica.js), e um card sobre juros compostos não pertence
// à mesma frente que um card sobre geometria analítica. Redistribuir os 80
// cards existentes entre cinco frentes daria uns 16 por frente — long e do
// piso de ~80 que as outras dezenove frentes têm. Por isso as cinco são
// escritas aqui, 80 cada, seguindo o mesmo mapa de tópicos que
// classificar-matematica.js usa para classificar as QUESTÕES do banco, para
// que o flashcard de uma frente fale do mesmo assunto que as questões dela.
//
// Rode DEPOIS de qualquer edição nos flashcards de Direito ou Medicina.
// `--verificar` compara o hash de cada fonte com o que foi usado na última
// composição.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const RAIZ = path.join(__dirname, "..");
const DIR = path.join(RAIZ, "vestibular-direito", "data", "flashcards");
const MED = path.join(RAIZ, "vestibular-medicina", "data", "flashcards");
const SAIDA = path.join(__dirname, "data", "flashcards.js");
const MANIFESTO = path.join(__dirname, "data", "origem-dos-flashcards.json");

// ---------------------------------------------------------- a correspondência
//
// `de` é uma lista de [pasta, arquivo] — mais de um item soma os cards dos
// dois arquivos (só acontece em história). `de: []` significa autoral, servido
// por MATEMATICA_CARDS mais abaixo.

const COMPOSICAO = [
  { id: "interpretacao-texto", de: [[DIR, "interpretacao-texto"]] },
  { id: "literatura", de: [[DIR, "literatura"]] },
  { id: "gramatica", de: [[DIR, "gramatica"]] },
  { id: "ingles", de: [[DIR, "ingles"]] },
  { id: "matematica-sequencias", de: [] },
  { id: "matematica-probabilidade", de: [] },
  { id: "matematica-algebra", de: [] },
  { id: "matematica-geometria", de: [] },
  { id: "matematica-financeira", de: [] },
  { id: "historia", de: [[DIR, "historia-brasil"], [DIR, "historia-geral"]] },
  { id: "geografia", de: [[DIR, "geografia"]] },
  { id: "filosofia-sociologia", de: [[DIR, "filosofia-sociologia"]] },
  { id: "direitos-humanos", de: [[DIR, "direitos-humanos"]] },
  { id: "atualidades-politica", de: [[DIR, "atualidades-politica"]] },
  { id: "atualidades-geopolitica", de: [[DIR, "atualidades-geopolitica"]] },
  { id: "atualidades-meioambiente", de: [[DIR, "atualidades-meioambiente"]] },
  { id: "atualidades-tecnologia", de: [[DIR, "atualidades-tecnologia"]] },
  { id: "biologia", de: [[MED, "biologia"]] },
  { id: "quimica", de: [[MED, "quimica"]] },
  { id: "fisica", de: [[MED, "fisica"]] },
];

// -------------------------------------------------- as cinco de Matemática
//
// Pares [frente, verso], na ordem em que aparecem no card. O mapa de tópicos
// de cada frente é o de classificar-matematica.js (comentado ao lado de cada
// bloco), para que o card fale do mesmo assunto que as questões da frente.

const MATEMATICA_CARDS = {

  // ---------------------------------------------------------------------
  // SEQUÊNCIAS E RECORRÊNCIAS — PA, PG, recorrência, somas, periodicidade
  // ---------------------------------------------------------------------
  "matematica-sequencias": [
    ["O que caracteriza uma progressão aritmética (PA)?", "Cada termo, a partir do segundo, é igual ao anterior somado a uma constante chamada razão (r). Ex.: 2, 5, 8, 11 tem r = 3."],
    ["Qual é a fórmula do termo geral de uma PA?", "aₙ = a₁ + (n − 1)·r, sendo a₁ o primeiro termo e r a razão."],
    ["Como saber se uma sequência é uma PA a partir de três termos dados?", "Se o termo do meio é a média aritmética dos vizinhos (a₂ = (a₁+a₃)/2), os três estão em PA."],
    ["Qual é a fórmula da soma dos n primeiros termos de uma PA?", "Sₙ = (a₁ + aₙ)·n / 2 — a média entre o primeiro e o último termo, multiplicada pela quantidade de termos."],
    ["Numa PA decrescente, o que se pode dizer da razão?", "A razão é negativa (r < 0); cada termo é menor que o anterior."],
    ["Como interpolar k meios aritméticos entre dois números a e b?", "Monte a PA de (k+2) termos com extremos a e b: a razão é r = (b − a)/(k + 1)."],
    ["Três números estão em PA e somam 30. Como escrevê-los sem usar a razão?", "Como (x − r), x, (x + r): a soma dá 3x = 30, então x = 10 — o termo do meio sai direto."],
    ["Se uma PA tem razão zero, o que ela é?", "Uma sequência constante — todos os termos são iguais."],
    ["Como calcular quantos termos há entre dois valores dados numa PA?", "Isole n na fórmula do termo geral: n = (aₙ − a₁)/r + 1."],
    ["Qual é o termo geral da PA dos números pares positivos (2, 4, 6, 8, ...)?", "aₙ = 2n — primeiro termo 2, razão 2."],
    ["Por que a fórmula da soma de uma PA lembra a área de um trapézio?", "Sₙ = (a₁+aₙ)·n/2 tem a mesma estrutura de (base maior + base menor)·altura/2 — é a mesma ideia geométrica."],
    ["O que significa dizer que a razão de uma PA é a inclinação da sequência?", "Os pontos (n, aₙ) de uma PA estão alinhados numa reta, e a razão r é o coeficiente angular dessa reta."],
    ["Como verificar rapidamente se uma tabela ano a ano é uma PA?", "Calcule as diferenças entre valores consecutivos; se todas forem iguais, é PA, e a diferença é a razão."],
    ["Numa PA de n termos, quanto vale a₁ + aₙ comparado a a₂ + aₙ₋₁?", "São iguais — termos equidistantes dos extremos sempre somam o mesmo valor."],
    ["Qual é o erro mais comum ao contar quantos termos uma PA tem entre dois valores?", "Esquecer de somar 1 no final — contar só a diferença de índices sem incluir o próprio primeiro termo."],
    ["Como reconhecer uma PA disfarçada num problema de aumento fixo (ex.: salário que sobe R$ 50 por mês)?", "O valor mensal forma uma PA de razão 50; o total em N meses é a soma dessa PA."],
    ["Se dobrarmos todos os termos de uma PA, o que acontece com a razão?", "A razão também dobra — multiplicar a PA por k multiplica a razão por k."],
    ["Como reconhecer que uma sequência de dados NÃO é uma PA?", "As diferenças entre termos consecutivos não são constantes — pelo menos uma delas destoa das outras."],
    ["O que caracteriza uma progressão geométrica (PG)?", "Cada termo, a partir do segundo, é igual ao anterior multiplicado por uma constante chamada razão (q). Ex.: 3, 6, 12, 24 tem q = 2."],
    ["Qual é a fórmula do termo geral de uma PG?", "aₙ = a₁ · qⁿ⁻¹."],
    ["Como saber se três termos estão em PG?", "Se o termo do meio ao quadrado é igual ao produto dos vizinhos (a₂² = a₁·a₃), os três estão em PG."],
    ["Qual é a fórmula da soma dos n primeiros termos de uma PG finita (q ≠ 1)?", "Sₙ = a₁·(qⁿ − 1)/(q − 1)."],
    ["O que acontece com a soma de uma PG infinita quando |q| < 1?", "Ela converge para um valor finito: S∞ = a₁/(1 − q)."],
    ["Por que uma PG infinita com q ≥ 1 não tem soma finita?", "Os termos não diminuem, então a soma cresce sem limite — diverge."],
    ["Como reconhecer PG num crescimento percentual constante (ex.: população que cresce 5% ao ano)?", "Cada termo é o anterior vezes (1 + taxa); é PG de razão q = 1 + taxa."],
    ["Se q é negativo, o que acontece com os sinais dos termos da PG?", "Os sinais alternam: positivo, negativo, positivo, negativo..."],
    ["Qual é a razão de uma PG cujo termo geral é aₙ = 5 · 3ⁿ?", "q = 3 — a base da potência."],
    ["O que diferencia uma PA de uma PG numa tabela de valores?", "Na PA a DIFERENÇA entre termos consecutivos é constante; na PG, a RAZÃO (divisão) entre eles é constante."],
    ["Como uma dízima periódica pode ser vista como soma de PG infinita?", "0,333... = 3/10 + 3/100 + 3/1000 + ... é uma PG de razão 1/10, cuja soma dá 1/3."],
    ["Numa PG de termos positivos, o que se pode dizer sobre termos equidistantes dos extremos?", "O produto de dois termos equidistantes dos extremos é sempre igual ao produto a₁·aₙ."],
    ["O que é meia-vida, em termos de PG?", "É o tempo para a quantidade cair pela metade; a quantidade ao longo do tempo forma uma PG de razão 1/2."],
    ["Qual é o erro clássico ao calcular a soma de uma PG?", "Trocar o sinal no denominador — usar (1 − q) quando deveria ser (q − 1), ou vice-versa."],
    ["Se todos os termos de uma PG forem multiplicados por uma constante k, o que acontece com a razão?", "A razão NÃO muda — q é uma razão entre termos, e o k se cancela."],
    ["O que é uma sequência definida por recorrência?", "Cada termo é calculado a partir do(s) termo(s) anterior(es) por uma regra, em vez de uma fórmula direta em n."],
    ["Como resolver, na prática, uma recorrência sem fórmula fechada óbvia?", "Calcule os primeiros 5-6 termos à mão e procure um padrão — periodicidade, paridade ou relação simples com n."],
    ["O que é uma recorrência linear de primeira ordem?", "aₙ₊₁ = aₙ + f(n) — cada termo depende só do termo imediatamente anterior."],
    ["Como a sequência de Fibonacci é definida por recorrência?", "aₙ = aₙ₋₁ + aₙ₋₂, com a₁ = a₂ = 1 — cada termo é a soma dos dois anteriores."],
    ["O que é um invariante numa recorrência?", "Uma quantidade (soma, paridade, resto) que NÃO muda a cada aplicação da regra, mesmo que os valores mudem."],
    ["Como usar um invariante para provar que um valor final é impossível?", "Mostre que o invariante do estado inicial difere do que o valor final exigiria — se não bate, é inatingível."],
    ["O que significa recorrência de segunda ordem?", "Cada termo depende dos DOIS termos anteriores (como Fibonacci), não só do último."],
    ["Como testar se uma sequência recursiva é periódica?", "Calcule termos até algum valor (ou par de valores) se repetir — a partir daí, o padrão se repete com esse período."],
    ["Se uma recorrência tem período 4, como achar o termo de ordem 97?", "Calcule 97 mod 4 (ajustando o índice inicial); o termo 97 é igual ao termo de mesmo resto no ciclo."],
    ["O que é a diferença finita de uma sequência aₙ?", "Δaₙ = aₙ₊₁ − aₙ — a sequência das diferenças entre termos consecutivos."],
    ["Se a sequência original é um polinômio de grau k em n, que grau tem a diferença finita?", "Grau k − 1: cada diferença finita abaixa o grau em um."],
    ["O que acontece ao aplicar a diferença finita duas vezes a um polinômio de grau 2?", "A sequência vira constante — igual a duas vezes o coeficiente líder do polinômio original."],
    ["Como reconhecer numa tabela que os dados vêm de uma função quadrática, só pelas diferenças?", "Se a primeira diferença não é constante, mas a SEGUNDA é, a função original é quadrática."],
    ["Como abordar 'prove que a soma X se conserva' numa recorrência?", "Calcule como a soma muda a cada passo; se a variação é sempre zero (ou par), a soma é invariante."],
    ["O que é uma recorrência de saldo (ganha ou perde uma unidade a cada passo)?", "O saldo após n passos depende só de quantos foram 'ganhos' contra 'perdidos', não da ordem em que aconteceram."],
    ["Como transformar 'quantas vitórias em N rodadas dão saldo S' numa equação?", "Se g é o número de vitórias, saldo = g − (N − g) = 2g − N; isole g."],
    ["Como decidir, numa prova, se vale procurar fórmula fechada ou calcular termo a termo?", "Se o índice pedido é pequeno (até uns 10-15), calcule direto; se é muito grande, procure período ou fórmula."],
    ["O que é o 'ponto fixo' de uma recorrência do tipo aₙ₊₁ = f(aₙ)?", "O valor L tal que f(L) = L; se a sequência converge, converge para esse ponto."],
    ["Qual é a soma dos n primeiros números ímpares (1+3+5+...)?", "n² — identidade clássica que costuma ser um atalho premiado."],
    ["Qual é a soma dos n primeiros números naturais (1+2+...+n)?", "n(n+1)/2 — é a soma de uma PA de razão 1."],
    ["O que é uma soma telescópica?", "Uma soma em que termos consecutivos se cancelam parcialmente, sobrando só o primeiro e o último termo auxiliar."],
    ["Como reconhecer que uma soma é telescópica?", "Cada termo pode ser escrito como uma diferença f(k) − f(k+1); ao somar, os termos do meio se cancelam."],
    ["Qual é a soma dos n primeiros quadrados perfeitos (1²+2²+...+n²)?", "n(n+1)(2n+1)/6."],
    ["Como confirmar a soma de uma PA 'de trás para frente'?", "Some o primeiro com o último, o segundo com o penúltimo, etc — cada par dá o mesmo total."],
    ["O que a identidade 1³+2³+...+n³ = [n(n+1)/2]² revela?", "A soma dos cubos é o QUADRADO da soma dos naturais — uma relação entre as duas somas."],
    ["Qual é o cuidado ao somar uma PA que não começa em 1 (ex.: soma de 10 a 50)?", "Calcule a soma de 1 a 50 e subtraia a soma de 1 a 9 — nunca aplique a fórmula direto nos limites."],
    ["Como usar a soma dos ímpares para simplificar um problema de contagem disfarçado?", "Se pede a soma de ímpares consecutivos a partir de 1, o resultado já é um quadrado perfeito automaticamente."],
    ["Como achar o algarismo das unidades de uma potência grande (ex.: 7^100)?", "Os algarismos das unidades de potências de 7 se repetem em ciclo de período 4 (7,9,3,1); calcule o resto de 100 por 4."],
    ["O que fazer quando o enunciado pede o termo de ordem 2026 de uma sequência periódica de período p?", "Calcule 2026 mod p (ajustando o índice inicial); o termo pedido é o de mesmo resto no ciclo."],
    ["Como confirmar que uma sequência é realmente periódica, e não só parece nos primeiros termos?", "Mostre que o termo (ou par de termos) que define a recorrência se repete — daí em diante, tudo se repete."],
    ["O que é 'pré-período' numa sequência?", "Um trecho inicial que não se repete, antes do padrão periódico começar — o resto só vale a partir do fim dele."],
    ["Como decidir a paridade do termo de ordem N numa sequência que alterna sinal?", "Depende de como a sequência começa: N par tem o sinal do segundo termo, N ímpar tem o do primeiro."],
    ["Qual é o erro mais comum ao usar resto da divisão para achar posição num ciclo?", "Esquecer de ajustar o índice quando a numeração começa em 1 (não em 0), senão o termo cai na posição vizinha."],
    ["Como o conceito de período ajuda em 'em que dia da semana cai o dia 1000 a partir de hoje'?", "Os dias da semana formam ciclo de período 7; o resto de 1000 por 7 dá quantos dias depois do ciclo cair o dia 1000."],
    ["O que fazer quando uma recorrência de segunda ordem não parece ter padrão periódico simples?", "Calcule o resto de cada termo por um número pequeno (2, 3, 5); os RESTOS quase sempre são periódicos mesmo quando a sequência inteira não é."],
    ["Como limitar 'calcule termos e procure o padrão' a um tempo razoável de prova?", "Calcule no máximo uns 8 a 10 termos; se nenhum padrão aparecer até lá, reconsidere a estratégia."],
    ["O que é uma sequência quase periódica (PA somada a um termo que oscila)?", "Um termo que cresce de forma regular somado a um termo que oscila em ciclo — o comportamento de longo prazo segue a parte que cresce."],
    ["Como confirmar, sem calcular todos os termos, que um valor nunca aparece numa sequência?", "Verifique se o valor é compatível com o invariante da sequência; se não for, é impossível ele aparecer."],
    ["Por que 'calcular casos pequenos' é uma estratégia geral em recorrência?", "Termos pequenos revelam o padrão sem exigir o cálculo do termo grande pedido — troca força bruta por reconhecimento de estrutura."],
    ["O que é a razão de uma PA cujo termo geral é aₙ = 3n + 2?", "r = 3 — o coeficiente que multiplica n no termo geral."],
    ["Como transformar 'cada figura tem 4 quadradinhos a mais que a anterior' numa PA?", "Reconheça: a quantidade de quadradinhos forma PA de razão 4; use o termo geral para achar a figura de ordem n."],
    ["Numa PG, o que muda se a razão for exatamente 1?", "A PG vira uma sequência constante — não há crescimento nem decrescimento entre os termos."],
    ["Como calcular o produto dos n primeiros termos de uma PG?", "Pₙ = (a₁ · aₙ)^(n/2) — a raiz quadrada de (a₁·aₙ) elevado a n, usando a igualdade de produtos equidistantes."],
    ["Qual é a diferença entre 'termo geral' e 'soma dos termos' numa sequência?", "O termo geral dá o VALOR de uma posição específica; a soma dá o TOTAL acumulado até uma posição."],
    ["Como decidir se um problema de sequência pede o termo geral ou a soma?", "Pergunte: quer o valor de UMA posição específica (termo geral) ou o TOTAL acumulado até ali (soma)?"],
  ],

  // ---------------------------------------------------------------------
  // PROBABILIDADE E CONTAGEM — probabilidade, combinatória, condicional, binomial
  // ---------------------------------------------------------------------
  "matematica-probabilidade": [
    ["Como se calcula a probabilidade de um evento em um espaço equiprovável?", "P(evento) = casos favoráveis / casos possíveis (o total do espaço amostral)."],
    ["O que é o evento complementar de A, e como se relaciona com P(A)?", "É 'não A'; P(complementar) = 1 − P(A). Útil quando 'não acontecer' é mais fácil de calcular."],
    ["Como calcular a probabilidade da união de dois eventos A e B?", "P(A ou B) = P(A) + P(B) − P(A e B) — subtrai-se a interseção para não contar duas vezes."],
    ["Quando P(A e B) = P(A) · P(B)?", "Quando A e B são independentes — a ocorrência de um não afeta a probabilidade do outro."],
    ["O que é probabilidade condicional P(A|B)?", "A probabilidade de A ocorrer DADO que B já ocorreu; P(A|B) = P(A e B) / P(B)."],
    ["Qual é o erro mais comum ao somar probabilidades de dois eventos?", "Somar P(A) + P(B) sem subtrair a interseção, quando os eventos podem ocorrer juntos."],
    ["O que é o espaço amostral de um experimento aleatório?", "O conjunto de todos os resultados possíveis desse experimento."],
    ["Como a probabilidade de um evento se relaciona com 'nenhum de uma lista de eventos ocorrer'?", "P(nenhum) = 1 − P(pelo menos um) — o complementar de 'pelo menos um' é 'nenhum'."],
    ["Se dois eventos são mutuamente exclusivos, quanto vale P(A e B)?", "Zero — os dois não podem ocorrer ao mesmo tempo (ex.: tirar par E ímpar num único dado)."],
    ["Como interpretar 'probabilidade de pelo menos um sucesso em n tentativas independentes'?", "Pelo complementar: 1 − P(nenhum sucesso) = 1 − (probabilidade de falha)ⁿ."],
    ["O que muda entre sorteio com reposição e sem reposição?", "Com reposição, a probabilidade de cada sorteio é sempre igual (independentes); sem reposição, o espaço diminui a cada sorteio (dependentes)."],
    ["Como calcular a probabilidade de dois eventos em sequência, sem reposição?", "Multiplique a probabilidade do primeiro pela probabilidade do segundo, já considerando que o espaço mudou."],
    ["O que a Regra da Multiplicação diz sobre eventos dependentes em sequência?", "P(A e B) = P(A) · P(B|A) — a probabilidade do segundo é condicionada ao que já aconteceu no primeiro."],
    ["Como um diagrama de árvore ajuda em probabilidade sequencial?", "Cada ramo representa uma escolha com sua probabilidade; multiplica-se ao longo do caminho, soma-se entre caminhos distintos."],
    ["Para que serve o Diagrama de Venn em probabilidade com conjuntos?", "Visualizar a interseção entre eventos, evitando contar duas vezes quem está em mais de um grupo."],
    ["Como o princípio de inclusão-exclusão se generaliza para três eventos?", "P(A∪B∪C) = P(A)+P(B)+P(C) − P(A∩B) − P(A∩C) − P(B∩C) + P(A∩B∩C)."],
    ["O que é fatorial de um número n (n!)?", "O produto de todos os inteiros positivos de 1 até n; por definição, 0! = 1."],
    ["Qual é a diferença entre arranjo e combinação?", "No arranjo a ORDEM importa (AB ≠ BA); na combinação, não (AB e BA contam como o mesmo grupo)."],
    ["Qual é a fórmula da combinação de n elementos tomados p a p?", "C(n,p) = n! / [p!·(n−p)!]."],
    ["Qual é a fórmula do arranjo de n elementos tomados p a p?", "A(n,p) = n! / (n−p)!."],
    ["Quando usar permutação simples em vez de arranjo?", "Quando TODOS os n elementos são organizados (p = n) — é o caso especial do arranjo."],
    ["O que é permutação com elementos repetidos?", "Divide-se o total de permutações pelo produto dos fatoriais das quantidades repetidas."],
    ["Como decidir, num problema, entre arranjo ou combinação?", "Pergunte: trocar a ordem dos elementos escolhidos gera um resultado diferente? Se sim, arranjo; se não, combinação."],
    ["O que é o Princípio Fundamental da Contagem?", "Se uma escolha tem m possibilidades e outra, independente, tem n possibilidades, o total é m · n."],
    ["Como aplicar o princípio multiplicativo para contar placas ou senhas?", "Multiplique o número de opções de cada posição, considerando se há repetição permitida em cada uma."],
    ["O que é o Princípio Aditivo de contagem?", "Se duas situações são mutuamente exclusivas, o total de possibilidades é a SOMA das possibilidades de cada uma."],
    ["Como contar o número de subconjuntos de um conjunto com n elementos?", "2ⁿ, incluindo o vazio e o conjunto todo — cada elemento tem duas opções (entra ou não)."],
    ["O que é um anagrama, e como contar quantos existem de uma palavra?", "É qualquer reorganização das letras; conta-se por permutação, dividindo por fatoriais de letras repetidas."],
    ["Como contar arranjos com a restrição 'dois elementos sempre juntos'?", "Trate o par como um bloco único, permute os blocos, e multiplique pelas permutações internas do bloco."],
    ["Como contar arranjos com a restrição 'dois elementos nunca juntos'?", "Conte o total sem restrição e subtraia os casos em que eles estão juntos (tratados como bloco)."],
    ["O que é combinação complementar (C(n,p) = C(n,n−p))?", "Escolher p elementos é o mesmo que deixar de fora n−p elementos — as duas contagens dão o mesmo resultado."],
    ["Como contar de quantas formas dividir um grupo em subgrupos de tamanhos diferentes?", "Multiplique as combinações sucessivas: escolha o primeiro subgrupo do total, o segundo do que sobrou, e assim por diante."],
    ["O que caracteriza um problema de posições igualmente espaçadas?", "O número de arranjos possíveis depende dos DIVISORES da quantidade total de posições."],
    ["Como calcular combinações quando a escolha e a organização importam em etapas diferentes?", "Escolha o grupo por combinação primeiro, depois organize-o internamente por permutação — duas etapas multiplicadas."],
    ["Como contar arranjos em círculo (permutação circular)?", "(n−1)! em vez de n! — fixa-se um elemento como referência, porque girar todos não gera arranjo novo."],
    ["Qual é o cuidado ao contar posições circulares com reflexão (ex.: pulseira que pode virar)?", "Se virar não gera arranjo novo, divide-se ainda por 2, além do (n−1)!."],
    ["Como contar filas com dois grupos distintos alternados?", "Fixe a alternância (ex.: grupo A nas posições ímpares), depois permute cada grupo internamente."],
    ["O que é contagem 'por complementar' numa restrição do tipo 'pelo menos um'?", "Calcule o total sem restrição e subtraia os casos em que a condição NÃO ocorre."],
    ["Como contar comissões com pelo menos um homem, dados grupos de homens e mulheres?", "Total de comissões possíveis menos as comissões formadas só por mulheres."],
    ["O que fazer quando duas restrições se sobrepõem numa contagem?", "Use inclusão-exclusão: some as contagens de cada restrição e subtraia a interseção."],
    ["Como contar arranjos de objetos idênticos em posições distintas?", "Combinação, não arranjo — escolha as posições que recebem cada tipo, sem se importar com a 'identidade' de objetos iguais."],
    ["O que é o problema clássico de 'objetos idênticos em caixas' (distribuição)?", "Contar de quantas formas n objetos idênticos se distribuem em k caixas — combinação com repetição, C(n+k−1, k−1)."],
    ["Como contar caminhos numa malha, andando só para a direita e para cima?", "É permutação com repetição dos movimentos; equivalente a escolher, entre todos os passos, quais são 'para cima'."],
    ["O que caracteriza o problema de 'pelo menos dois iguais' (tipo aniversário)?", "Calcula-se pelo complementar: 1 menos a probabilidade de todos serem diferentes."],
    ["Como contar senhas com letras e números, sem repetição?", "Multiplique separadamente as opções de letras (arranjo) e de números (arranjo), pelo princípio multiplicativo."],
    ["O que é a 'regra do vizinho' em contagem com restrição de proximidade?", "Trate elementos que devem ficar juntos como um bloco, resolva com o bloco, depois multiplique pelas permutações internas."],
    ["Como contar arranjos em que uma pessoa nunca fica na primeira posição?", "Total de arranjos menos os arranjos com essa pessoa fixada na primeira posição."],
    ["Como testar se dois eventos são independentes usando probabilidade condicional?", "Se P(A|B) = P(A), são independentes — saber que B ocorreu não muda a chance de A."],
    ["Para que serve o Teorema de Bayes?", "Inverter uma probabilidade condicional: calcular P(B|A) a partir de P(A|B)."],
    ["Como interpretar probabilidade condicionada a uma informação parcial (ex.: sabendo que o resultado é par)?", "Restrinja o espaço amostral aos casos compatíveis com a informação, e calcule dentro desse espaço reduzido."],
    ["O que é uma árvore de probabilidade condicional em múltiplas etapas?", "Cada ramo a partir da segunda etapa tem probabilidade condicionada ao ramo escolhido na etapa anterior."],
    ["Como calcular a probabilidade total de um evento com vários caminhos possíveis?", "Some a probabilidade de cada caminho (multiplicando as condicionais ao longo dele) — Teorema da Probabilidade Total."],
    ["O que significa 'a probabilidade da rodada seguinte depende do resultado da anterior'?", "É uma recorrência probabilística: p(n+1) é função de p(n), e se resolve como se resolve uma sequência."],
    ["Como achar o comportamento de longo prazo de uma probabilidade recorrente?", "Iguale p(n+1) a p(n) na relação e resolva para p — é o valor para o qual a probabilidade se estabiliza."],
    ["O que é uma cadeia de dois estados com probabilidades de transição?", "Um sistema que alterna entre dois estados; a soma das probabilidades de permanecer e de mudar é sempre 1."],
    ["Como confirmar que uma árvore de probabilidade foi montada corretamente?", "A soma das probabilidades de todos os ramos que saem de um mesmo nó deve ser exatamente 1."],
    ["Por que independência não pode ser assumida, só verificada?", "Dois eventos podem parecer não relacionados e ainda ser dependentes, ou vice-versa — só o cálculo confirma."],
    ["O que fazer quando um problema envolve eventos sem reposição em sequência?", "Trate como dependentes: a probabilidade de cada evento seguinte muda porque o espaço amostral diminuiu."],
    ["Qual é a diferença entre 'probabilidade de A e B' e 'probabilidade de A dado B'?", "A primeira é sobre o espaço amostral inteiro; a segunda é sobre o espaço restrito aos casos em que B já ocorreu."],
    ["Por que P(A|B) geralmente é diferente de P(B|A)?", "São perguntas diferentes: uma pergunta a chance de A no mundo onde B é verdade, e a outra o inverso."],
    ["Quando usar a distribuição binomial?", "Quando há n repetições independentes de um experimento com só dois resultados e probabilidade de sucesso fixa."],
    ["Qual é a fórmula da probabilidade binomial de exatamente k sucessos em n tentativas?", "P(k) = C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ, sendo p a probabilidade de sucesso em cada tentativa."],
    ["Por que o coeficiente binomial C(n,k) aparece na fórmula?", "Conta de quantas ORDENS diferentes os k sucessos podem se distribuir entre as n tentativas."],
    ["O que é um passeio aleatório de saldo (sobe ou desce a cada rodada)?", "Um processo em que uma grandeza aumenta ou diminui a cada etapa, com probabilidade fixa para cada direção; modela-se por binomial."],
    ["Como traduzir 'terminar com saldo +2 após 6 rodadas' em número de sucessos?", "Se g é o número de vitórias, o saldo final é 2g − n; resolva para g e use na binomial."],
    ["O que fazer quando a pergunta é sobre 'pelo menos k sucessos' numa binomial?", "Some as probabilidades de k, k+1, ..., n sucessos, ou use o complementar, o que for mais rápido."],
    ["Como a probabilidade binomial se relaciona com o binômio de Newton?", "Os termos da expansão de (p+q)ⁿ correspondem às probabilidades de cada número de sucessos, somando 1."],
    ["Por que a distribuição binomial é simétrica quando p = 0,5?", "Trocar 'sucesso' por 'fracasso' não muda a estrutura do problema — k sucessos é tão provável quanto n−k."],
    ["Qual é a probabilidade de tirar um número específico num dado de 6 faces?", "1/6, assumindo dado honesto."],
    ["Qual é a probabilidade de a soma de dois dados ser 7?", "6/36 = 1/6 — a soma mais provável, com o maior número de combinações."],
    ["Qual é a probabilidade de tirar cara em duas moedas seguidas?", "1/4 — cada moeda tem 1/2, e são eventos independentes (multiplica-se)."],
    ["O que muda ao calcular probabilidade de bolas de cores diferentes numa urna, com ou sem reposição?", "Com reposição, a proporção de cada cor se mantém a cada sorteio; sem reposição, a proporção muda a cada retirada."],
    ["Como um diagrama de Venn resolve 'quantos leram só o livro A, só o B, ou os dois'?", "As áreas do diagrama representam cada grupo separadamente; o total de A é (só A) + (A e B)."],
    ["Se todos os competidores de um torneio têm a mesma chance, qual a probabilidade de um vencer?", "1 dividido pelo número total de competidores, por simetria."],
    ["Como calcular a chance de dois competidores específicos se enfrentarem num chaveamento?", "Depende da rodada em que o encontro é possível — eles precisam sobreviver até lá E cair do mesmo lado da chave."],
    ["Quantas partidas tem um chaveamento eliminatório de 2ⁿ competidores?", "2ⁿ − 1: cada partida elimina exatamente um competidor, e só um sobra no fim."],
  ],

  // ---------------------------------------------------------------------
  // ÁLGEBRA, FUNÇÕES E MATRIZES — funções, equações/sistemas, matrizes, interpolação
  // ---------------------------------------------------------------------
  "matematica-algebra": [
    ["O que caracteriza uma função afim (do 1º grau)?", "f(x) = ax + b, com gráfico sendo uma reta; a é o coeficiente angular e b onde a reta corta o eixo y."],
    ["Como interpretar o coeficiente angular a de uma função afim?", "É a taxa de variação constante: quanto f(x) muda para cada unidade que x aumenta."],
    ["Quando uma função afim é crescente ou decrescente?", "Crescente se a > 0; decrescente se a < 0."],
    ["O que caracteriza uma função quadrática (do 2º grau)?", "f(x) = ax² + bx + c, com a ≠ 0, e gráfico em forma de parábola."],
    ["Como saber se a parábola de uma quadrática abre para cima ou para baixo?", "Para cima se a > 0 (tem mínimo); para baixo se a < 0 (tem máximo)."],
    ["Qual é a fórmula das coordenadas do vértice de uma parábola?", "xᵥ = −b/2a e yᵥ = −Δ/4a, sendo Δ = b² − 4ac."],
    ["O que o discriminante (Δ) de uma equação do 2º grau revela sobre as raízes?", "Δ > 0: duas raízes reais distintas; Δ = 0: uma raiz dupla; Δ < 0: nenhuma raiz real."],
    ["Como encontrar as raízes de uma quadrática pela fórmula de Bhaskara?", "x = (−b ± √Δ) / 2a."],
    ["O que significa f(0) numa função afim ou quadrática?", "É o coeficiente independente (b ou c) — onde o gráfico cruza o eixo y."],
    ["Como reconhecer uma função afim disfarçada num problema (custo fixo + custo por unidade)?", "Se cada unidade a mais soma um valor FIXO à outra grandeza, é afim."],
    ["Como reconhecer uma função quadrática disfarçada num problema?", "Quando a grandeza envolve um produto de duas quantidades que variam juntas (ex.: receita = preço × quantidade)."],
    ["Por que o máximo de receita costuma cair no vértice da parábola?", "Receita = preço × quantidade; se o preço cai linearmente com a quantidade, a receita é quadrática, e seu máximo é o vértice."],
    ["O que caracteriza uma função exponencial?", "f(x) = a·bˣ, com b > 0 e b ≠ 1; a variável está no expoente."],
    ["Qual é a diferença entre crescimento exponencial e linear ao longo do tempo?", "No linear, a grandeza cresce a mesma QUANTIDADE a cada intervalo; no exponencial, cresce o mesmo FATOR."],
    ["O que é meia-vida, em termos de função exponencial?", "O intervalo em que a quantidade cai pela metade; a cada meia-vida, multiplica-se por 1/2."],
    ["Como modelar 'a quantidade dobra a cada X anos'?", "Q(t) = Q₀ · 2^(t/X)."],
    ["O que é logaritmo, em termos simples?", "A operação inversa da exponenciação: logₐ(x) = y significa aʸ = x."],
    ["Como usar logaritmo para resolver 2ˣ = 50?", "Aplique log dos dois lados: x = log(50)/log(2)."],
    ["Qual é a propriedade do log de um produto?", "log(a·b) = log(a) + log(b) — o log transforma multiplicação em soma."],
    ["Qual é a propriedade do log de uma potência?", "log(aⁿ) = n·log(a) — o expoente desce como fator multiplicativo."],
    ["Por que um gráfico em escala log-log que vira reta indica lei de potência (y = a·xᵇ)?", "log(y) = log(a) + b·log(x) — reta em log(x) e log(y), com coeficiente angular igual ao expoente b."],
    ["Por que um gráfico em escala mono-log que vira reta indica exponencial?", "log(y) = log(a) + x·log(b) — reta em x e log(y), coeficiente angular igual a log(b)."],
    ["Como calcular a taxa mensal equivalente a uma taxa anual conhecida?", "Fator mensal = (fator anual)^(1/12)."],
    ["Como resolver uma equação do 2º grau incompleta sem termo em x (ax² + c = 0)?", "Isole x²: x² = −c/a, depois tire a raiz quadrada (com ±)."],
    ["Como resolver uma equação do 2º grau incompleta sem termo independente (ax² + bx = 0)?", "Fatore x em evidência: x(ax+b) = 0; as raízes são x = 0 e x = −b/a."],
    ["Como se resolve uma inequação do 2º grau?", "Encontre as raízes e analise o sinal da parábola entre e fora delas, conforme ela abre para cima ou para baixo."],
    ["Como resolver um sistema de duas equações lineares por substituição?", "Isole uma variável numa equação e substitua na outra."],
    ["Como resolver um sistema de duas equações lineares por eliminação?", "Multiplique uma ou as duas equações até os coeficientes de uma variável ficarem opostos, e some."],
    ["O que significa um sistema linear ser possível e determinado?", "Tem exatamente uma solução — as retas se cruzam num único ponto."],
    ["O que significa um sistema linear ser possível e indeterminado?", "Tem infinitas soluções — as duas equações descrevem a mesma reta."],
    ["O que significa um sistema linear ser impossível?", "Não tem solução — as retas são paralelas e distintas."],
    ["Como usar o determinante para classificar um sistema 2x2 sem resolvê-lo por completo?", "Se o determinante da matriz dos coeficientes é diferente de zero, é possível e determinado."],
    ["O que é a Regra de Cramer?", "Resolve sistemas lineares usando razões de determinantes: cada variável é um determinante dividido pelo determinante da matriz de coeficientes."],
    ["Como resolver um sistema linear com um parâmetro k para achar quando é indeterminado?", "Iguale o determinante da matriz dos coeficientes a zero e resolva para k."],
    ["O que é uma inequação-produto (ex.: (x−2)(x+3) > 0)?", "Estuda-se o sinal de cada fator separadamente e combina-se por intervalo."],
    ["Como resolver uma inequação-quociente (fração com x no denominador)?", "Igual à inequação-produto, mas excluindo os valores que zeram o denominador."],
    ["O que acontece ao multiplicar os dois lados de uma inequação por um número negativo?", "Inverte-se o sentido da desigualdade."],
    ["Como resolver uma equação com raiz quadrada de uma expressão?", "Isole a raiz, eleve os dois lados ao quadrado, resolva, e confira as soluções na equação original."],
    ["Por que é preciso conferir as soluções após elevar uma equação ao quadrado?", "Pode introduzir soluções que não satisfazem a equação original (raízes estranhas)."],
    ["O que é uma matriz?", "Uma tabela retangular de números organizados em linhas e colunas."],
    ["Como somar duas matrizes de mesma dimensão?", "Some elemento a elemento, na mesma posição (linha, coluna)."],
    ["Como multiplicar uma matriz por um escalar?", "Multiplique cada elemento da matriz por esse número."],
    ["Quais são as condições para multiplicar duas matrizes A e B?", "O número de colunas de A precisa ser igual ao número de linhas de B."],
    ["Como se calcula um elemento do produto de duas matrizes?", "É a soma dos produtos da linha correspondente de A pela coluna correspondente de B."],
    ["A multiplicação de matrizes é comutativa (A·B = B·A)?", "Em geral, não — a ordem importa."],
    ["O que é a matriz identidade?", "Tem 1 na diagonal principal e 0 nas demais posições; multiplicar por ela não altera a outra matriz."],
    ["O que é a matriz transposta de A?", "A matriz obtida trocando linhas por colunas."],
    ["Como calcular o determinante de uma matriz 2x2 [[a,b],[c,d]]?", "ad − bc: produto da diagonal principal menos o da diagonal secundária."],
    ["Como calcular o determinante de uma 3x3 pela Regra de Sarrus?", "Repita as duas primeiras colunas ao lado; some os produtos das diagonais descendo e subtraia os das diagonais subindo."],
    ["O que significa um determinante ser igual a zero?", "A matriz é singular — não tem inversa, e o sistema associado não é possível e determinado."],
    ["O que é a matriz inversa de A, e quando existe?", "É A⁻¹ tal que A · A⁻¹ = identidade; só existe se o determinante de A for diferente de zero."],
    ["Como o determinante de uma matriz 2x2 se relaciona com área?", "O valor absoluto do determinante formado por dois vetores é a área do paralelogramo que eles formam."],
    ["Por que 'matriz singular' é um alerta em sistema linear com parâmetro?", "Quando o determinante se anula, o sistema muda de comportamento nesse valor — de determinado para indeterminado ou impossível."],
    ["O que é interpolação polinomial?", "Encontrar o polinômio de menor grau que passa exatamente por um conjunto de pontos dados."],
    ["Quantos pontos determinam um polinômio de grau n de forma única?", "n + 1 pontos — cada ponto gera uma equação para as n+1 incógnitas (os coeficientes)."],
    ["Como montar o sistema para achar um polinômio de 2º grau que passa por três pontos?", "Substitua cada ponto na forma ax²+bx+c = y, gerando três equações lineares."],
    ["O que é uma função definida por partes (por trechos)?", "Uma função com expressões diferentes para intervalos diferentes do domínio."],
    ["Como encontrar o ponto de encontro entre duas funções que formam um 'mínimo' por partes?", "Iguale as duas expressões e resolva — é o ponto onde a função troca de qual expressão usar."],
    ["Por que é preciso declarar o domínio de cada trecho numa função por partes?", "Sem o domínio, não se sabe ONDE cada expressão vale — duas podem coincidir num ponto e divergir fora dele."],
    ["Como verificar se uma função por partes é contínua no ponto de junção?", "Calcule o valor de cada trecho no ponto; se coincidem, é contínua; se não, há um salto."],
    ["O que é uma função de faixas (como imposto progressivo)?", "Cada faixa de valor tem uma taxa aplicada só sobre o EXCEDENTE daquela faixa, não sobre o valor total."],
    ["Como escrever a função de um imposto progressivo de três faixas?", "Some, por faixa completa, a alíquota vezes a largura da faixa; na faixa em que o valor cai, aplique só sobre o excedente."],
    ["O que é a diferença finita de uma função (Δf(n) = f(n+1) − f(n))?", "A diferença entre valores consecutivos; é o análogo discreto da taxa de variação."],
    ["Como a diferença finita se comporta ao ser aplicada a um polinômio?", "Reduz o grau em 1 a cada aplicação; k aplicações a um polinômio de grau k dão uma constante."],
    ["Como se relacionam os conjuntos naturais, inteiros, racionais, irracionais e reais?", "Naturais ⊂ Inteiros ⊂ Racionais ⊂ Reais; Irracionais são os reais que não são racionais."],
    ["O que caracteriza um número racional?", "Pode ser escrito como fração de dois inteiros; toda dízima periódica é racional."],
    ["Como transformar uma dízima periódica em fração?", "Escreva-a como soma de uma PG infinita de razão 1/10^(período) e use a fórmula da soma da PG infinita."],
    ["O que caracteriza um número irracional?", "Não pode ser escrito como fração exata; sua representação decimal não é finita nem periódica."],
    ["Como simplificar uma expressão com radicais (ex.: √50)?", "Fatore o radicando isolando o maior quadrado perfeito: √50 = √(25·2) = 5√2."],
    ["Como racionalizar o denominador de 1/√2?", "Multiplique numerador e denominador por √2: 1/√2 = √2/2."],
    ["O que significa 'isolar a incógnita' numa equação?", "Reorganizar a equação, aplicando a mesma operação nos dois lados, até a variável ficar sozinha de um lado."],
    ["Como decidir a ordem de operações ao isolar uma incógnita?", "Desfaça as operações na ordem inversa de como foram aplicadas na expressão."],
    ["O que é substituição de variável para simplificar uma equação?", "Trocar uma expressão repetida por uma nova letra, transformando a equação numa forma mais simples e conhecida."],
    ["Como uma equação biquadrada (com x⁴ e x²) vira uma do 2º grau?", "Substitua y = x²; resolva em y, depois volte para x tirando a raiz quadrada de cada solução."],
    ["Como resolver uma equação exponencial com bases diferentes que podem virar iguais?", "Reescreva as potências com a mesma base (ex.: 4 = 2²) para igualar diretamente os expoentes."],
    ["Como resolver uma equação exponencial quando as bases não podem ser igualadas?", "Aplique logaritmo dos dois lados e isole a incógnita."],
    ["Qual é a razão entre o coeficiente angular de uma reta e a tangente do ângulo que ela forma com o eixo x?", "São a mesma coisa: o coeficiente angular É a tangente desse ângulo."],
    ["O que caracteriza uma função par e uma função ímpar?", "Par: f(−x) = f(x), gráfico simétrico ao eixo y. Ímpar: f(−x) = −f(x), gráfico simétrico à origem."],
    ["Como identificar o domínio de uma função com denominador?", "Exclua os valores de x que anulam o denominador."],
  ],

  // ---------------------------------------------------------------------
  // GEOMETRIA E TRIGONOMETRIA — plana, espacial, trigonometria, analítica
  // ---------------------------------------------------------------------
  "matematica-geometria": [
    ["Qual é a soma dos ângulos internos de um triângulo?", "Sempre 180°, independente do tipo de triângulo."],
    ["Qual é a soma dos ângulos internos de um polígono convexo de n lados?", "(n − 2) × 180°."],
    ["O que é o Teorema de Pitágoras, e quando se aplica?", "Num triângulo retângulo, a² = b² + c² (hipotenusa ao quadrado igual à soma dos catetos ao quadrado)."],
    ["Como identificar a hipotenusa de um triângulo retângulo?", "É o lado oposto ao ângulo reto, e é sempre o maior lado."],
    ["O que são triângulos semelhantes?", "Triângulos com os mesmos ângulos e lados proporcionais entre si."],
    ["Se dois triângulos são semelhantes com razão k, qual a razão entre as áreas?", "k² — a área escala com o quadrado da razão linear."],
    ["Se dois sólidos são semelhantes com razão k, qual a razão entre os volumes?", "k³ — o volume escala com o cubo da razão linear."],
    ["Qual é a fórmula da área de um triângulo, dado base e altura?", "A = (base × altura) / 2."],
    ["Como calcular a área de um triângulo dados dois lados e o ângulo entre eles?", "A = (1/2) · a · b · sen(C)."],
    ["Qual é a fórmula da área de um trapézio?", "A = (base maior + base menor) × altura / 2."],
    ["Qual é a fórmula da área de um losango, dadas as diagonais?", "A = (diagonal maior × diagonal menor) / 2."],
    ["Qual é a fórmula da área de um círculo?", "A = π·r²."],
    ["Qual é a fórmula do comprimento de uma circunferência?", "C = 2·π·r."],
    ["O que é um setor circular, e como calcular sua área?", "É a 'fatia de pizza' de um círculo; A = (ângulo/360°) × π·r²."],
    ["O que é um segmento circular, e como calcular sua área?", "A região entre uma corda e o arco; área do setor menos a área do triângulo formado pelos raios e a corda."],
    ["Quando duas figuras são congruentes (não só semelhantes)?", "Quando têm a mesma forma E o mesmo tamanho — razão de semelhança igual a 1."],
    ["O que caracteriza um polígono regular?", "Todos os lados iguais e todos os ângulos internos iguais."],
    ["Como calcular cada ângulo interno de um polígono regular de n lados?", "[(n − 2) × 180°] / n."],
    ["O que é o apótema de um polígono regular?", "A distância do centro até o ponto médio de um lado; usado para calcular a área como soma de triângulos."],
    ["Como calcular a área de um polígono regular usando o apótema?", "A = (perímetro × apótema) / 2."],
    ["O que diz a desigualdade triangular?", "A soma de dois lados quaisquer é sempre maior que o terceiro lado — senão, o triângulo não existe."],
    ["Como decidir se um triângulo é acutângulo, retângulo ou obtusângulo pelos três lados?", "Compare o quadrado do maior lado com a soma dos quadrados dos outros: igual é retângulo, menor é acutângulo, maior é obtusângulo."],
    ["Qual é a fórmula do volume de um cubo de aresta a?", "V = a³."],
    ["Qual é a fórmula do volume de um paralelepípedo?", "V = comprimento × largura × altura."],
    ["Qual é a fórmula do volume de um cilindro?", "V = π·r²·h."],
    ["Qual é a fórmula do volume de um cone?", "V = (1/3)·π·r²·h — um terço do cilindro de mesma base e altura."],
    ["Qual é a fórmula do volume de uma esfera?", "V = (4/3)·π·r³."],
    ["Qual é a fórmula do volume de uma pirâmide?", "V = (1/3) × área da base × altura."],
    ["Qual é a fórmula do volume de um prisma (qualquer base)?", "V = área da base × altura."],
    ["O que é a Relação de Euler para poliedros convexos?", "V − A + F = 2, sendo V vértices, A arestas e F faces."],
    ["Como usar a Relação de Euler para achar o número de faces, dados vértices e arestas?", "Isole F: F = 2 − V + A."],
    ["O que é a área total de um sólido?", "A soma das áreas de todas as faces externas, incluindo bases."],
    ["Como calcular a área total de um cilindro?", "Duas áreas das bases (2·π·r²) mais a área lateral (2·π·r·h)."],
    ["O que é a área lateral de um cone?", "A = π·r·g, sendo g a geratriz (distância do vértice até a borda da base)."],
    ["Como se relacionam raio, altura e geratriz de um cone reto?", "g² = r² + h² — Pitágoras aplicado ao corte do cone."],
    ["O que é uma seção transversal de um sólido?", "É o 'corte' do sólido por um plano; ajuda a visualizar figuras planas escondidas dentro de sólidos."],
    ["O que gera a rotação de um retângulo em torno de um eixo?", "Um cilindro."],
    ["O que gera a rotação de um triângulo retângulo em torno de uma perna?", "Um cone."],
    ["O que acontece com área de superfície e volume quando todas as dimensões dobram?", "A área multiplica por 4 (2²) e o volume por 8 (2³)."],
    ["Como calcular o volume de um sólido vazado (ex.: cilindro com furo cônico)?", "Volume do sólido externo menos o volume da parte removida."],
    ["Como se calcula a diagonal de um paralelepípedo?", "d² = comprimento² + largura² + altura² — Pitágoras em três dimensões."],
    ["Como comparar volumes de prisma, cilindro, cone e pirâmide de mesma base e altura?", "Prisma e cilindro têm o mesmo volume (área da base × altura); cone e pirâmide têm um terço disso."],
    ["Quais são seno, cosseno e tangente de um ângulo agudo num triângulo retângulo?", "Seno = oposto/hipotenusa; cosseno = adjacente/hipotenusa; tangente = oposto/adjacente."],
    ["Qual é a relação fundamental da trigonometria?", "sen²(x) + cos²(x) = 1, para qualquer ângulo x."],
    ["Como a tangente se relaciona com seno e cosseno?", "tan(x) = sen(x) / cos(x)."],
    ["Quais são seno, cosseno e tangente de 30°, 45° e 60°?", "sen: 1/2, √2/2, √3/2. cos: √3/2, √2/2, 1/2. tan: √3/3, 1, √3."],
    ["Quando usar a Lei dos Senos num triângulo qualquer?", "Quando se conhece dois ângulos e um lado, ou dois lados e um ângulo não compreendido entre eles."],
    ["Qual é a fórmula da Lei dos Senos?", "a/sen(A) = b/sen(B) = c/sen(C)."],
    ["Quando usar a Lei dos Cossenos?", "Quando se conhece dois lados e o ângulo entre eles, ou os três lados para achar um ângulo."],
    ["Qual é a fórmula da Lei dos Cossenos?", "a² = b² + c² − 2bc·cos(A)."],
    ["Como a Lei dos Cossenos vira o Teorema de Pitágoras quando o ângulo é 90°?", "cos(90°) = 0, o termo −2bc·cos(A) desaparece, sobrando a² = b² + c²."],
    ["Como decidir entre Lei dos Senos e Lei dos Cossenos?", "Se o ângulo dado está entre os dois lados conhecidos, use Cossenos; senão, use Senos."],
    ["O que é o círculo trigonométrico?", "Um círculo de raio 1 que define seno e cosseno de qualquer ângulo, como coordenadas de um ponto sobre ele."],
    ["Como variam os sinais de seno e cosseno nos quatro quadrantes?", "1º: ambos positivos. 2º: seno +, cosseno −. 3º: ambos negativos. 4º: seno −, cosseno +."],
    ["O que significa sen(180° − x) = sen(x)?", "Ângulos suplementares têm o mesmo seno."],
    ["Como calcular a área de um triângulo sem conhecer a altura, usando trigonometria?", "A = (1/2)·a·b·sen(C), com dois lados e o ângulo entre eles."],
    ["O que é a tangente do ângulo de inclinação de uma reta?", "É igual ao coeficiente angular da reta."],
    ["Qual é o período de seno e cosseno?", "360° (ou 2π radianos) — as funções se repetem a cada volta completa."],
    ["Como converter um ângulo de graus para radianos?", "Multiplique por π/180."],
    ["Qual é a fórmula da distância entre dois pontos no plano cartesiano?", "d = √[(x₂−x₁)² + (y₂−y₁)²]."],
    ["Qual é a fórmula do ponto médio entre dois pontos?", "M = ((x₁+x₂)/2, (y₁+y₂)/2)."],
    ["Como calcular o coeficiente angular de uma reta por dois pontos?", "m = (y₂ − y₁) / (x₂ − x₁)."],
    ["O que o coeficiente angular de uma reta representa?", "A inclinação: quanto y varia para cada unidade que x aumenta."],
    ["Quando duas retas são paralelas, em termos de coeficiente angular?", "Quando têm o mesmo coeficiente angular."],
    ["Quando duas retas são perpendiculares, em termos de coeficiente angular?", "Quando o produto dos dois coeficientes angulares é −1."],
    ["Qual é a equação reduzida de uma reta?", "y = mx + n, sendo m o coeficiente angular e n onde ela corta o eixo y."],
    ["Como escrever a equação de uma reta com um ponto e o coeficiente angular?", "y − y₀ = m(x − x₀)."],
    ["Qual é a equação padrão da circunferência de centro (a,b) e raio r?", "(x − a)² + (y − b)² = r²."],
    ["Como identificar centro e raio de uma circunferência a partir de uma equação expandida?", "Complete os quadrados em x e em y para reduzir à forma padrão."],
    ["Como saber se um ponto está dentro, na borda ou fora de uma circunferência?", "Compare a distância do ponto ao centro com o raio."],
    ["O que é a distância de um ponto a uma reta, e qual sua fórmula?", "d = |ax₀+by₀+c| / √(a²+b²), usando a equação geral da reta."],
    ["Como calcular a área de um triângulo dados três pontos no plano cartesiano?", "Metade do valor absoluto do determinante 3x3 montado com as coordenadas dos pontos."],
    ["O que é o baricentro de um triângulo, e como se calculam suas coordenadas?", "É o ponto de encontro das medianas; suas coordenadas são a média das coordenadas dos três vértices."],
    ["Como verificar se três pontos estão alinhados?", "Compare o coeficiente angular entre o 1º e o 2º com o do 2º e o 3º; se forem iguais, estão alinhados."],
    ["O que representa a equação x² + y² = r² (sem termos lineares)?", "Uma circunferência centrada na origem, com raio r."],
    ["Como reconhecer, numa equação com x² e y², que se trata de circunferência?", "Os coeficientes de x² e y² precisam ser iguais e de mesmo sinal."],
    ["Como calcular a área de um triângulo formado por uma reta e os eixos coordenados?", "Ache onde a reta cruza os dois eixos e calcule a área do triângulo com esses dois pontos e a origem."],
  ],

  // ---------------------------------------------------------------------
  // ESTATÍSTICA, PORCENTAGEM E PROPORÇÃO — % , juros, razão, estatística
  // ---------------------------------------------------------------------
  "matematica-financeira": [
    ["Como calcular quanto é X% de um valor V?", "Multiplique V por X/100 (ex.: 20% = 0,20)."],
    ["Como aplicar um aumento percentual usando fator multiplicativo?", "Multiplique o valor por (1 + taxa em decimal); um aumento de 15% multiplica por 1,15."],
    ["Como aplicar um desconto percentual usando fator multiplicativo?", "Multiplique o valor por (1 − taxa em decimal); um desconto de 20% multiplica por 0,80."],
    ["Por que dois aumentos sucessivos de 10% não somam 20%?", "Os fatores se multiplicam: 1,10 × 1,10 = 1,21, um aumento total de 21%."],
    ["O que acontece com um valor após aumento de 10% seguido de desconto de 10%?", "Não volta ao original: 1,10 × 0,90 = 0,99, fica 1% menor."],
    ["Como calcular a taxa percentual de variação entre dois valores?", "(valor final − valor inicial) / valor inicial, ×100."],
    ["Qual é a diferença entre 'aumento de 5 pontos percentuais' e 'aumento de 5%' sobre uma taxa?", "Pontos percentuais somam direto (20%→25%); '5%' sobre 20% seria multiplicar por 1,05, chegando a 21%."],
    ["Como calcular o valor original a partir do valor já com desconto aplicado?", "Divida pelo fator de desconto (ex.: divida por 0,80 se houve desconto de 20%)."],
    ["Por que a alíquota da faixa mais alta de um imposto progressivo não incide sobre a renda inteira?", "Incide só sobre o trecho da renda que cai naquela faixa, não sobre o valor todo."],
    ["Como calcular o imposto devido num sistema de faixas progressivas?", "Some, por faixa completa, a alíquota vezes a largura; na última faixa, aplique só sobre o excedente."],
    ["Como calcular 'porcentagem de porcentagem' (ex.: 20% de 30%)?", "Multiplique as taxas: 0,20 × 0,30 = 0,06, ou seja, 6%."],
    ["A base do cálculo percentual de aumento é o valor inicial ou o final?", "Sempre o valor INICIAL."],
    ["Como calcular quantos por cento A representa de B?", "(A / B) × 100."],
    ["O que é reajuste real, comparado ao reajuste nominal?", "O real desconta a inflação: fator real = fator nominal / fator da inflação."],
    ["Como calcular o reajuste real, dados o nominal e a inflação do período?", "Divida os fatores, subtraia 1 e multiplique por 100."],
    ["Por que a mesma variação em reais pode representar percentuais diferentes?", "Porque a fórmula divide pela base — a mesma diferença é fração maior de uma base pequena."],
    ["Qual é a fórmula do montante em juros simples?", "M = C·(1 + i·t), com C capital, i taxa e t tempo na mesma unidade da taxa."],
    ["Qual é a fórmula do montante em juros compostos?", "M = C·(1 + i)ᵗ — o juro de cada período incide sobre o saldo já acrescido."],
    ["Qual é a diferença central entre juros simples e compostos?", "Simples: juro sempre sobre o capital original. Compostos: juro sobre o saldo atualizado (juros sobre juros)."],
    ["Por que juros compostos crescem mais rápido que simples ao longo do tempo?", "A base de cálculo cresce a cada período nos compostos; nos simples fica sempre igual ao capital inicial."],
    ["Como calcular a taxa mensal equivalente a uma taxa anual, em juros compostos?", "i_mensal = (1 + i_anual)^(1/12) − 1."],
    ["Por que não se pode simplesmente dividir a taxa anual por 12?", "Dividir é operação de juros simples; compostos exigem equivalência multiplicativa (raiz)."],
    ["O que é capitalização, em juros compostos?", "O momento em que o juro do período é incorporado ao capital, passando a render juros no período seguinte."],
    ["Como calcular em quanto tempo um capital dobra, a juros compostos?", "Resolva 2 = (1+i)ᵗ com logaritmo: t = log(2)/log(1+i)."],
    ["O que é a Regra dos 70?", "Estimativa rápida: tempo de duplicação ≈ 70 / (taxa percentual)."],
    ["Como calcular o valor presente de um montante futuro?", "VP = M / (1+i)ᵗ — inverso da fórmula do montante."],
    ["Como se relaciona a taxa de juros real com a nominal e a inflação?", "Fator real = fator nominal / fator da inflação — não é subtração simples das taxas."],
    ["O que é uma prestação de financiamento?", "Cada parcela paga parte de juro sobre o saldo devedor e parte de amortização (capital)."],
    ["O que significa 'juro sobre o saldo devedor'?", "O juro de cada período incide sobre o valor que ainda falta pagar, não sobre o total original."],
    ["Como comparar duas ofertas de crédito com taxas e prazos diferentes?", "Calcule o montante final (ou custo total) sob as mesmas condições, para comparar de forma justa."],
    ["O que é Custo Efetivo Total (CET) de um empréstimo?", "Uma taxa que resume todos os custos (juros, taxas, seguros), útil para comparar ofertas."],
    ["Como calcular a inflação acumulada em N períodos, dadas as taxas de cada um?", "Multiplique os fatores (1+i₁)(1+i₂)...(1+iₙ) e subtraia 1 — nunca some as taxas diretamente."],
    ["O que é uma razão entre duas grandezas?", "A divisão entre elas (a/b), expressando quantas vezes uma contém a outra."],
    ["O que é uma proporção?", "Uma igualdade entre duas razões (a/b = c/d)."],
    ["Qual é a propriedade fundamental das proporções?", "O produto dos meios é igual ao produto dos extremos: se a/b=c/d, então a·d = b·c."],
    ["Como resolver uma regra de três simples?", "Monte a proporção entre as grandezas e use a propriedade fundamental (produto dos meios = extremos)."],
    ["Quando duas grandezas são diretamente proporcionais?", "Quando aumentar uma faz a outra aumentar na mesma razão (quociente constante)."],
    ["Quando duas grandezas são inversamente proporcionais?", "Quando aumentar uma faz a outra diminuir na mesma razão (produto constante)."],
    ["Como resolver uma regra de três com grandezas inversamente proporcionais?", "Inverta uma das razões antes de montar a proporção."],
    ["Como resolver uma regra de três composta (mais de duas grandezas)?", "Analise a relação de cada grandeza com a principal (direta ou inversa) e monte a proporção com todas, invertendo as inversas."],
    ["Como dividir um valor em partes proporcionais a uma razão dada (ex.: 100 na razão 2:3)?", "Some a razão (2+3=5), divida o valor pelo total (100/5=20) e multiplique cada parte da razão."],
    ["O que é escala, num mapa ou planta?", "A razão entre uma medida no desenho e a medida real (ex.: 1:100 significa 1 unidade no desenho = 100 reais)."],
    ["Como calcular a distância real a partir de uma medida no mapa e a escala?", "Multiplique a medida no mapa pelo denominador da escala."],
    ["O que é densidade demográfica, e como se calcula?", "Razão entre população e área: densidade = população / área."],
    ["Como calcular velocidade média num trajeto?", "Velocidade média = distância total / tempo total."],
    ["Como calcular a velocidade média de trechos de mesma distância, mas velocidades diferentes?", "Não é a média aritmética simples; é a média harmônica, porque os tempos de cada trecho pesam diferente."],
    ["Como resolver um problema de trabalho conjunto (torneiras enchendo um tanque)?", "Some as taxas de trabalho (fração por unidade de tempo); o inverso da soma das taxas dá o tempo conjunto."],
    ["O que é média aritmética simples?", "A soma de todos os valores dividida pela quantidade de valores."],
    ["O que é média ponderada?", "Uma média em que cada valor tem um peso; soma dos produtos (valor × peso) dividida pela soma dos pesos."],
    ["Como calcular a média de um grupo depois de remover um elemento, sem recalcular tudo?", "Multiplique a média original pela quantidade, subtraia o valor removido, e divida pela nova quantidade."],
    ["Por que a média de duas médias de grupos de tamanhos diferentes não é a média simples das duas?", "Cada grupo contribui proporcionalmente ao tamanho — é preciso média ponderada pelos tamanhos."],
    ["O que é a mediana de um conjunto de dados?", "O valor do meio quando os dados são ordenados (ou a média dos dois centrais, se a quantidade for par)."],
    ["Como a mediana se comporta diante de valores extremos, comparada à média?", "A mediana é pouco afetada; a média pode ser puxada fortemente por eles."],
    ["O que é a moda de um conjunto de dados?", "O valor que aparece com maior frequência."],
    ["Numa distribuição de renda (assimétrica à direita), como se comparam média e mediana?", "A média fica acima da mediana, puxada por poucos valores muito altos."],
    ["O que é o desvio padrão?", "Mede a dispersão dos dados em torno da média — quanto maior, mais espalhados os valores."],
    ["Como se relacionam desvio padrão e variância?", "O desvio padrão é a raiz quadrada da variância."],
    ["Por que a variância usa o quadrado dos desvios?", "Porque a soma dos desvios simples em torno da média é sempre zero; elevar ao quadrado evita esse cancelamento."],
    ["Como interpretar dois conjuntos com a mesma média mas desvios padrão diferentes?", "O de maior desvio padrão tem dados mais dispersos em torno da média."],
    ["O que é uma tabela de frequências, e o que é frequência acumulada?", "Organiza dados em classes; a frequência acumulada soma progressivamente as frequências até aquela classe."],
    ["Como estimar a mediana a partir de uma tabela de frequências acumuladas?", "Encontre a classe em que a frequência acumulada ultrapassa metade do total de dados."],
    ["O que é frequência relativa?", "A frequência de uma classe dividida pelo total de dados, geralmente em percentual."],
    ["Como se calcula uma taxa de crescimento composta anualizada (CAGR)?", "CAGR = (valor final / valor inicial)^(1/nº de anos) − 1."],
    ["O que é elasticidade, em termos de razão entre variações percentuais?", "A razão entre a variação % de uma grandeza e a variação % de outra que a causou."],
    ["Como interpretar 'a demanda é inelástica'?", "A variação % da quantidade é menor, em valor absoluto, que a variação % do preço que a causou."],
    ["O que representa a curva de Lorenz?", "No eixo x, a fração acumulada da população; no eixo y, a fração acumulada da renda que ela detém."],
    ["Como a curva de Lorenz se relaciona com o Índice de Gini?", "O Gini é o dobro da área entre a curva de Lorenz e a diagonal de igualdade perfeita."],
    ["O que significam Gini igual a zero e Gini igual a 1?", "Zero é igualdade perfeita; 1 é desigualdade máxima (uma só pessoa detém toda a renda)."],
    ["O que é o efeito de somar (em vez de multiplicar) taxas de juros de períodos sucessivos?", "Subestima o resultado real, porque ignora o efeito de 'juros sobre juros' acumulado."],
    ["Como decidir se um problema pede regra de três simples ou composta?", "Se há só duas grandezas relacionadas, é simples; três ou mais variando juntas, é composta."],
    ["O que é o coeficiente de variação?", "O desvio padrão dividido pela média; permite comparar dispersão relativa de conjuntos com médias diferentes."],
    ["Qual é a diferença entre 'amostra' e 'população' em estatística?", "População é o conjunto completo a estudar; amostra é um subconjunto usado para estimar características dela."],
    ["Quando um gráfico de setores (pizza) é mais apropriado?", "Para poucas categorias com diferenças claras, mostrando a proporção de cada uma em relação ao total."],
    ["Quando um gráfico de barras é mais apropriado que o de pizza?", "Quando há muitas categorias ou quando a comparação direta de tamanho importa mais que a proporção do total."],
    ["Como calcular o rendimento médio por trabalhador, dado o total distribuído e o número de trabalhadores?", "Divida o valor total pela quantidade de trabalhadores."],
  ],
};

// -------------------------------------------------------------------- carga

function carregarFonte(pasta, arquivo) {
  const caminho = path.join(pasta, arquivo + ".json");
  const j = JSON.parse(fs.readFileSync(caminho, "utf8"));
  if (!Array.isArray(j.flashcards) || !j.flashcards.length) {
    throw new Error("sem flashcards em " + caminho);
  }
  return j.flashcards;
}

function hash(pasta, arquivo) {
  const caminho = path.join(pasta, arquivo + ".json");
  return crypto.createHash("sha256").update(fs.readFileSync(caminho)).digest("hex").slice(0, 12);
}

const SIGLA = {
  "matematica-sequencias": "seq",
  "matematica-probabilidade": "prob",
  "matematica-algebra": "alg",
  "matematica-geometria": "geo",
  "matematica-financeira": "fin",
};

// -------------------------------------------------------------------- compor

function compor() {
  const saida = {};
  const problemas = [];

  for (const item of COMPOSICAO) {
    if (!item.de.length) {
      const pares = MATEMATICA_CARDS[item.id];
      if (!pares || !pares.length) { problemas.push(item.id + ": sem MATEMATICA_CARDS"); continue; }
      const sigla = SIGLA[item.id];
      saida[item.id] = pares.map((par, i) => {
        const [frente, verso] = par;
        if (!frente || !verso) problemas.push(item.id + "[" + i + "]: frente ou verso vazio");
        return { id: "flash-eco-" + sigla + "-" + String(i + 1).padStart(2, "0"), frente, verso };
      });
      continue;
    }

    const cards = [];
    for (const [pasta, arquivo] of item.de) {
      try {
        cards.push(...carregarFonte(pasta, arquivo));
      } catch (e) {
        problemas.push(item.id + ": " + e.message);
      }
    }
    if (cards.length) saida[item.id] = cards;
  }

  // Toda frente do subtopics precisa de cards: sem isso, a aba Flashcards
  // abre um pool menor sem ninguém saber que uma frente ficou de fora.
  for (const item of COMPOSICAO) {
    if (!saida[item.id]) problemas.push("frente sem flashcards: " + item.id);
  }

  // Piso aproximado de ~80 por frente. Não é rígido nas compostas — Direito e
  // Medicina têm cards entre 77 e 85 conforme a última edição de cada uma, e
  // história soma duas frentes (~164) — mas serve de alarme se algo ficar
  // muito abaixo, sinal de fonte incompleta.
  for (const id of Object.keys(saida)) {
    const n = saida[id].length;
    if (n < 60) problemas.push(id + ": só " + n + " flashcards, abaixo do piso esperado (~80)");
  }

  // `key: c.id` em buildFlashcardPool (app.js) NÃO é namespaced por frente —
  // é global ao objeto FLASHCARDS inteiro. Dois cards com o mesmo id em
  // frentes diferentes colidiriam no estado de repetição espaçada de quem
  // estuda: acertar um marcaria o outro como revisado sem ter sido.
  const idsVistos = new Map();
  for (const id of Object.keys(saida)) {
    saida[id].forEach((c) => {
      if (idsVistos.has(c.id)) {
        problemas.push("id de flashcard repetido: " + c.id + " (" + idsVistos.get(c.id) + " e " + id + ")");
      }
      idsVistos.set(c.id, id);
    });
  }

  if (problemas.length) {
    console.error("flashcards de Economia NÃO compostos:");
    problemas.forEach((p) => console.error("  - " + p));
    process.exit(1);
  }

  return saida;
}

function conferirContraSubtopics(saida) {
  const arq = path.join(__dirname, "data", "subtopics.js");
  if (!fs.existsSync(arq)) return;
  const conteudo = fs.readFileSync(arq, "utf8");
  const sandbox = {};
  // eslint-disable-next-line no-new-func
  new Function("window", conteudo)(sandbox);
  const ids = (sandbox.SUBTOPICS || []).map((s) => s.id);
  const faltando = ids.filter((id) => !saida[id]);
  const sobrando = Object.keys(saida).filter((id) => ids.indexOf(id) === -1);
  if (faltando.length || sobrando.length) {
    console.error("flashcards fora de sincronia com subtopics.js:");
    faltando.forEach((id) => console.error("  - frente sem flashcards: " + id));
    sobrando.forEach((id) => console.error("  - flashcards sem frente: " + id));
    process.exit(1);
  }
}

function cabecalho(total, frentes) {
  return [
    "// GERADO por vestibular-economia/build-flashcards.js -- nao edite a mao.",
    "// Flashcards de repeticao espacada por frente da trilha de Economia.",
    "//",
    "// Quinze frentes sao COMPOSTAS de vestibular-direito e vestibular-medicina --",
    "// um flashcard e um fato atomico (\"como fica a concordancia quando o sujeito",
    "// composto vem antes do verbo\"), nao esta amarrado ao formato de uma banca",
    "// como a teoria esta. Historia soma historia-brasil e historia-geral de",
    "// Direito, que aqui sao uma frente so.",
    "//",
    "// As cinco de Matematica sao autorais (build-flashcards.js), " + Object.keys(SIGLA).length + " frentes, " +
      "porque Direito tem",
    "// um arquivo so cobrindo a materia inteira e Economia parte a mesma",
    "// Matematica em cinco -- ver classificar-matematica.js.",
    "//",
    "// Corrigiu um flashcard herdado? Edite na trilha de origem e rode este build",
    "// de novo. Corrigiu um dos autorais de Matematica? Edite MATEMATICA_CARDS",
    "// aqui mesmo. `--verificar` reprova quando alguma fonte mudou e este",
    "// arquivo nao.",
    "//",
    "// Total: " + total + " flashcards em " + frentes + " frentes.",
  ].join("\n");
}

function gravar(saida) {
  const total = Object.values(saida).reduce((s, arr) => s + arr.length, 0);
  fs.writeFileSync(SAIDA, cabecalho(total, Object.keys(saida).length) + "\nwindow.FLASHCARDS = " +
    JSON.stringify(saida, null, 2) + ";\n", "utf8");

  const origem = {};
  for (const item of COMPOSICAO) {
    for (const [pasta, arquivo] of item.de) {
      const chave = (pasta === DIR ? "direito/" : "medicina/") + arquivo;
      origem[chave] = hash(pasta, arquivo);
    }
  }

  const porFrente = {};
  for (const id of Object.keys(saida)) porFrente[id] = saida[id].length;

  fs.writeFileSync(MANIFESTO, JSON.stringify({
    composto: new Date().toISOString().slice(0, 10),
    total,
    frentes: Object.keys(saida).length,
    autorais: Object.keys(SIGLA),
    porFrente,
    origem,
  }, null, 2) + "\n", "utf8");
}

function verificar() {
  if (!fs.existsSync(SAIDA) || !fs.existsSync(MANIFESTO)) {
    console.error("flashcards de Economia ainda não foram compostos.");
    process.exit(1);
  }
  const manifesto = JSON.parse(fs.readFileSync(MANIFESTO, "utf8"));
  const mudou = [];
  for (const chave of Object.keys(manifesto.origem)) {
    const [trilha, arquivo] = chave.split("/");
    const pasta = trilha === "direito" ? DIR : MED;
    if (manifesto.origem[chave] !== hash(pasta, arquivo)) mudou.push(chave);
  }
  if (mudou.length) {
    console.error("flashcards de Economia VELHOS -- mudaram: " + mudou.join(", "));
    console.error("rode: node vestibular-economia/build-flashcards.js");
    process.exit(1);
  }
  console.log("flashcards de Economia em dia com as " + Object.keys(manifesto.origem).length + " fontes.");
}

// ---------------------------------------------------------------------- main

if (process.argv.includes("--verificar")) {
  verificar();
} else {
  const saida = compor();
  conferirContraSubtopics(saida);
  gravar(saida);
  const total = Object.values(saida).reduce((s, arr) => s + arr.length, 0);
  console.log("flashcards de Economia compostos: " + total + " cards em " + Object.keys(saida).length + " frentes.");
  Object.keys(saida).sort().forEach((id) => console.log("  " + id.padEnd(28) + saida[id].length));
}
