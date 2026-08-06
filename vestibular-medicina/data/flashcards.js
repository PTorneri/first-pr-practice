// Flashcards da trilha de Medicina, consumidos pela aba Cards com repetição
// espaçada (o algoritmo vive em app.js e é o mesmo das duas trilhas).
//
// ESTADO: semente inicial. O critério de seleção é o que o estudo mostrou que
// as bancas realmente cobram de memória — não a definição de dicionário, mas o
// par "gatilho → conceito" que decide uma questão.
window.FLASHCARDS = {
  "biologia": [
    { "id": "flash-med-bio-01", "frente": "Por que a concentração do citoplasma CAI quando um paramécio incha em meio hipotônico?", "verso": "Porque a quantidade de soluto não muda, mas passa a ocupar um volume maior. Volume e concentração são duas leituras do mesmo evento — imaginar que sobem juntos é o erro mais comum quando os dois gráficos aparecem lado a lado." },
    { "id": "flash-med-bio-02", "frente": "Quais evidências sustentam a hipótese endossimbiótica?", "verso": "DNA circular próprio, ribossomos semelhantes aos bacterianos e dupla membrana com composições distintas — a interna vinda da bactéria, a externa do vacúolo do hospedeiro." },
    { "id": "flash-med-bio-03", "frente": "O que é epistasia e como ela muda o cálculo de proporções?", "verso": "É quando um gene mascara a expressão de outro. Obriga a checar primeiro o gene epistático: só na sua ausência o segundo gene se manifesta. Esquecer isso é o erro clássico em cruzamentos de pelagem." },
    { "id": "flash-med-bio-04", "frente": "Potencial biótico × resistência ambiental", "verso": "Potencial biótico é a capacidade máxima de reprodução da espécie em condições ideais; resistência ambiental é o conjunto de fatores que a limita. Uma população explode quando o primeiro é alto E a segunda é baixa — os dois aparecem juntos de propósito nos enunciados." },
  ],
  "quimica": [
    { "id": "flash-med-qui-01", "frente": "Como distinguir fenol de álcool numa fórmula estrutural?", "verso": "Fenol tem a hidroxila ligada DIRETAMENTE ao anel aromático. Se houver ao menos um carbono entre o anel e o –OH, é álcool. É a troca mais explorada nas questões de lacunas da VUNESP." },
    { "id": "flash-med-qui-02", "frente": "Roteiro para converter mg/100 mL em g/L", "verso": "Multiplique por 10 para chegar a mg/L e divida por 1.000 para chegar a g/L — ou seja, divida o valor original por 100. Converter só a massa (ou só o volume) produz erro de uma ou duas ordens de grandeza." },
    { "id": "flash-med-qui-03", "frente": "O que exige uma questão de titulação?", "verso": "Equação balanceada primeiro, mesmo que o enunciado já a forneça; depois mol do analito; depois a proporção estequiométrica com o titulante. Resultado sem a resolução não é aceito nas bancas de Medicina." },
  ],
  "fisica": [
    { "id": "flash-med-fis-01", "frente": "Espelho plano: onde fica a imagem de um objeto atrás do observador?", "verso": "À mesma distância do espelho que o objeto, mas do outro lado. A distância observador–imagem é a SOMA das duas distâncias ao espelho, não a diferença." },
    { "id": "flash-med-fis-02", "frente": "Diferença de 20 dB corresponde a que razão de intensidade?", "verso": "10². A escala é logarítmica: β = 10·log(I/I₀), então cada 10 dB multiplica a intensidade por 10. Tomar a diferença em dB como razão direta é o erro que a questão testa." },
    { "id": "flash-med-fis-03", "frente": "Como reconhecer dado irrelevante num enunciado de cinemática?", "verso": "Massa em queda livre sem resistência do ar não entra em nenhuma equação de posição ou velocidade. As bancas incluem dados desnecessários de propósito para testar se o candidato monta o modelo antes de calcular." },
  ],
  "matematica": [
    { "id": "flash-med-mat-01", "frente": "Média, mediana e moda: qual muda mais com um valor extremo?", "verso": "A média. Mediana e moda são resistentes a outliers. Quando a questão dá uma série com um valor muito acima dos outros, é isso que ela está testando." },
    { "id": "flash-med-mat-02", "frente": "Cilindro inscrito num cubo de aresta a: qual o raio da base?", "verso": "a/2, não a. O círculo é inscrito na face quadrada, então o diâmetro é que vale a aresta. Usar r = a produz volume quatro vezes maior." },
  ],
  "interpretacao-texto": [
    { "id": "flash-med-int-01", "frente": "'De acordo com o texto' × 'depreende-se do texto'", "verso": "O primeiro pede base LITERAL: a resposta está escrita. O segundo pede inferência: não está escrita, mas tem que ser sustentada por uma passagem específica. Trocar um pelo outro é o erro que mais custa pontos." },
    { "id": "flash-med-int-02", "frente": "Como identificar movimento de concessão num argumento?", "verso": "O autor aceita o ponto do adversário e em seguida mostra que ele não sustenta a conclusão contrária. Marcadores: 'é verdade que… mas', 'ainda que', 'críticos apontam… defensores respondem'." },
  ],
  "gramatica": [
    { "id": "flash-med-gra-01", "frente": "O que é 'lhas' e de onde vem?", "verso": "Combinação do oblíquo átono indireto 'lhe(s)' com o direto 'as'. Forma hoje rara, cobrada justamente por isso — a Unifesp dedicou uma questão inteira a ela." },
    { "id": "flash-med-gra-02", "frente": "Como testar se um termo é pronome apassivador?", "verso": "Reescreva a oração na voz passiva analítica ('vendem-se casas' → 'casas são vendidas'). Se o sentido se mantém e o verbo concorda com o sujeito paciente, é apassivador; se não, é índice de indeterminação." },
  ],
  "literatura": [
    { "id": "flash-med-lit-01", "frente": "Como reconhecer a ironia machadiana?", "verso": "O narrador se absolve enquanto parece refletir: transfere a culpa para a vítima ou para o acaso e apresenta isso como sabedoria. A forma é filosófica; a função é autoabsolvição." },
    { "id": "flash-med-lit-02", "frente": "Traços que filiam um poema ao Romantismo", "verso": "Natureza como espelho do sentimento, idealização do objeto amado ou da pátria, primeira pessoa expansiva e vocabulário de excesso. Datar pela publicação em vez do traço é o erro clássico." },
  ],
  "ingles": [
    { "id": "flash-med-ing-01", "frente": "'The main purpose of the text is to' — como responder", "verso": "Pelo texto INTEIRO, não pelo primeiro parágrafo. A introdução costuma apresentar a posição que o texto vai contestar." },
    { "id": "flash-med-ing-02", "frente": "Onde procurar o referente de um termo sublinhado?", "verso": "Duas ou três linhas antes — quase nunca na mesma frase. Se o termo é 'this' ou 'that', o referente costuma ser a ideia da oração anterior inteira, não um substantivo isolado." },
  ],
  "historia": [
    { "id": "flash-med-his-01", "frente": "Como ler uma série numérica de registro oficial de época", "verso": "Pergunte para que servia o registro. Alfândega registra para tributar, então subnotificação é o esperado. O documento não é neutro: sua função explica seu viés." },
  ],
  "geografia": [
    { "id": "flash-med-geo-01", "frente": "O que move as placas tectônicas?", "verso": "Correntes de convecção no manto: material aquecido sobe, resfria e desce, arrastando a litosfera. Intemperismo é processo exógeno e não move placas — é a distratora mais escolhida." },
    { "id": "flash-med-geo-02", "frente": "Por que Geografia importa para Medicina na USP?", "verso": "Porque a 2ª fase de Medicina é B-F-G-Q: Biologia, Física, Geografia e Química, com 3 questões de cada. Geografia vale o mesmo que Biologia, e Matemática não cai." },
  ],
  "filosofia-sociologia": [
    { "id": "flash-med-fil-01", "frente": "Empirismo × racionalismo: qual é a pergunta em disputa?", "verso": "A ORIGEM do conhecimento. Empirismo (Locke): a mente é tábula rasa, tudo vem da experiência. Racionalismo: há princípios que a razão reconhece sem verificação sensível. Não é sobre a possibilidade do conhecimento — isso é ceticismo × dogmatismo." },
  ],
  "artes-cultura": [
    { "id": "flash-med-art-01", "frente": "Traços do Pós-Impressionismo numa tela", "verso": "Volume construído por planos de cor justapostos em vez de contorno, perspectiva deliberadamente deformada e repetição do mesmo motivo em várias telas. Cézanne é o caso exemplar." },
  ],
  "atualidades": [
    { "id": "flash-med-atu-01", "frente": "O que define juridicamente a pejotização?", "verso": "A primazia da realidade: se há subordinação, pessoalidade e habitualidade, o contrato como pessoa jurídica não desfaz o vínculo. A forma contratual não altera os elementos de fato." },
    { "id": "flash-med-atu-02", "frente": "Qual banca de Medicina usa as fontes mais recentes?", "verso": "A Unicamp — uma fonte da 1ª fase de 2026 tem acesso registrado 17 dias antes da prova. As três provas da VUNESP ficam em três a quatro meses; a FUVEST, em cerca de seis." },
  ],
};
