// Teoria por frente da trilha de Medicina: resumo curto + "gatilhos" (padrão do
// enunciado → método) + "pegadinhas" (armadilhas recorrentes).
//
// Conteúdo original, escrito a partir de estudo-anatomia-provas-medicina-sp-2025-2026.md
// (25 cadernos oficiais lidos na íntegra). Não é cópia de nenhuma prova real.
//
// O que diferencia estes gatilhos dos da trilha de Direito: aqui eles carregam
// a assimetria entre bancas descoberta no estudo. Um gatilho que só vale para a
// VUNESP diz isso explicitamente, porque um candidato que presta FUVEST e
// Einstein precisa saber que está treinando coisas diferentes.
window.THEORY = {
  "biologia": {
    resumo: "É a frente mais desigual do conjunto: 8 das 20 discursivas na Santa Casa e apenas 2 ou 3 das 36 na Unesp. Os enunciados quase sempre partem de figura, esquema, gráfico ou micrografia — raramente de texto puro.",
    gatilhos: [
      "Figura de célula, organela ou membrana → identifique primeiro a ESTRUTURA e só depois a função; a alternativa errada costuma trocar as duas.",
      "Heredograma → marque os afetados, teste dominante-recessivo pelo primeiro casal que gera filho diferente dos pais, e só então olhe as alternativas.",
      "Gráfico com duas curvas ao longo do tempo (volume × concentração, população × recurso) → descreva em voz alta o que acontece em cada trecho antes de ler os itens.",
      "Enunciado que cita uma doença ou exame real (teste do pezinho, eritroblastose, PRA) → a pergunta é de mecanismo, não de clínica; volte ao conceito básico.",
      "Discursiva com subitens a) e b) → conte quantas respostas cada subitem pede. 'Cite e explique' são DUAS entregas.",
    ],
    pegadinhas: [
      "Responder o que a figura mostra em vez do que o comando pergunta.",
      "Em questão de genética, esquecer que o enunciado pode pedir a PROBABILIDADE e não o genótipo.",
      "Na Santa Casa e na Unifesp, acrescentar informação certa mas não pedida: informação errada anexada à resposta correta faz PERDER o ponto.",
      "Confundir potencial biótico com resistência ambiental — os dois aparecem no mesmo enunciado justamente para separar quem sabe.",
    ],
    subtemas: [],
  },

  "quimica": {
    resumo: "Cai em todas as sete bancas, quase sempre ancorada num contexto concreto: um rótulo de bebida, um fármaco, um minério, um gás vulcânico. Cálculo sem contexto é raro.",
    gatilhos: [
      "Fórmula estrutural na figura → identifique a função orgânica ANTES de ler o comando; metade das questões começa por aí.",
      "'Calcule a concentração / o volume necessário' → escreva a equação balanceada primeiro, mesmo que o enunciado já a dê.",
      "Tabela de temperaturas de fusão e ebulição → a pergunta é sobre estado físico numa temperatura dada, ou sobre tipo de ligação. Decida qual antes de calcular.",
      "Enunciado com duas ou três lacunas para preencher 'respectivamente' → é formato da VUNESP (Unesp, Santa Casa, Einstein). Resolva cada lacuna isolada e só depois procure a combinação.",
    ],
    pegadinhas: [
      "Errar a unidade pedida (g/L quando o dado veio em mg/100 mL) — na Unifesp isso zera a questão mesmo com o raciocínio certo.",
      "Apresentar só o resultado: as bancas de Medicina exigem a resolução; resposta sem cálculo não é considerada.",
      "Em lacunas, acertar duas e errar uma — a questão é toda ou nada.",
    ],
    subtemas: [],
  },

  "fisica": {
    resumo: "Presente em seis das sete bancas — e ausente na 2ª fase da Unicamp, que é a assimetria mais cara desta frente. Enunciados curtos, com figura, e número limpo.",
    gatilhos: [
      "Figura com bloco, fio ou mola → desenhe as forças antes de qualquer conta.",
      "Diagrama pressão × volume → identifique o tipo de transformação em cada trecho (isotérmica, isobárica, isovolumétrica) antes de calcular trabalho.",
      "Espelho, lente ou raio refratado → marque o sentido do raio e o meio de cada lado; a maioria dos erros é de sinal, não de fórmula.",
      "Circuito com resistores → reduza a associação a um resistor equivalente antes de olhar as alternativas.",
    ],
    pegadinhas: [
      "Usar g = 10 quando o enunciado deu 9,8, ou o contrário — o enunciado sempre diz.",
      "Confundir velocidade escalar com velocidade angular em movimento circular.",
      "Se o alvo é só a Unicamp, gastar tempo de 2ª fase aqui: Física não cai lá nessa etapa.",
    ],
    subtemas: [],
  },

  "matematica": {
    resumo: "A frente de maior variação entre bancas: 10 questões no Einstein e 12 na Unicamp, contra 8 de 90 na 1ª fase da Unesp e 5 com peso 0,5 na PUC-SP. Na 2ª fase da USP, não cai.",
    gatilhos: [
      "Enunciado com contexto longo (uma franquia de jogos, um pneu, uma tarifa) → extraia os números para o lado antes de decidir o conteúdo.",
      "'De quantas maneiras' → combinatória: decida primeiro se a ordem importa.",
      "Figura geométrica com ponto médio ou diagonal marcada → procure semelhança de triângulos antes de tentar coordenadas.",
      "Gráfico de duas funções no mesmo plano → os pontos de interseção quase sempre são o que a questão quer.",
    ],
    pegadinhas: [
      "Responder a pergunta intermediária em vez da final (achar x quando pediram a área).",
      "Em probabilidade, somar quando o correto é multiplicar eventos independentes.",
      "Na PUC-SP, gastar tempo demais aqui: são 5 questões com peso 0,5, ou 5% da nota final.",
    ],
    subtemas: [],
  },

  "interpretacao-texto": {
    resumo: "A frente de maior retorno médio do conjunto. Sustenta 20 das 30 questões de Linguagens da Unesp, a Prova I inteira da Unifesp e 15 das 50 da PUC-SP com peso máximo.",
    gatilhos: [
      "'De acordo com o texto' → a resposta tem base literal; elimine o que é plausível mas não está escrito.",
      "'Depreende-se' / 'sugere' → é inferência: a resposta NÃO está literal, mas tem que ser sustentada por uma passagem específica.",
      "Pergunta sobre função de conectivo → nomeie a relação lógica (oposição, concessão, conclusão) antes de olhar as alternativas.",
      "Charge, tirinha ou meme → o humor ou a crítica quase sempre está na quebra entre o que a imagem mostra e o que o texto diz.",
      "Dois textos apresentados como 'Texto 1' e 'Texto 2' → a pergunta é de confronto; localize onde eles discordam.",
    ],
    pegadinhas: [
      "Confundir a opinião do autor com a de uma voz citada dentro do texto.",
      "Escolher a alternativa mais bem escrita em vez da mais fiel.",
      "Generalizar o que o texto disse com ressalva.",
    ],
    subtemas: [],
  },

  "gramatica": {
    resumo: "O recorte varia muito: a Unifesp cobra o mais técnico do conjunto (anacoluto, expletivas, derivação imprópria, pronomes oblíquos combinados), enquanto a Santa Casa trata gramática dentro da análise literária.",
    gatilhos: [
      "'Pode ser reescrito sem alteração de sentido' → verifique se a reescrita trocou a relação lógica (concessão virando causa é o erro mais comum).",
      "Termo sublinhado com pedido de classificação → teste a substituição por um sinônimo da classe proposta.",
      "Pergunta sobre 'valor de posse' ou referente de pronome → volte ao substantivo mais próximo que concorda em gênero e número.",
      "'Está empregado como pronome apassivador' → troque a oração para a voz passiva analítica e veja se o sentido se mantém.",
    ],
    pegadinhas: [
      "Aplicar regra de concordância sem verificar se o sujeito é composto ou posposto.",
      "Marcar crase antes de palavra masculina sem perceber que há elipse ('à moda de').",
    ],
    subtemas: [],
  },

  "literatura": {
    resumo: "Um único texto costuma sustentar um bloco inteiro — dez questões de Machado abriram a Santa Casa 2026. A cobrança é de reconhecimento de traço e análise, não de ficha técnica.",
    gatilhos: [
      "Trecho de prosa do século XIX → procure o narrador: onisciente e irônico aponta Machado; descritivo e determinista aponta Naturalismo.",
      "Poema com pergunta sobre 'eu lírico' → identifique a quem ele se dirige antes de classificar a escola.",
      "'Filiar à estética romântica' → procure natureza como espelho do sentimento, idealização e primeira pessoa.",
      "Pergunta metalinguística → o texto está falando do próprio ato de escrever ou de ler.",
    ],
    pegadinhas: [
      "Confundir autor com narrador.",
      "Datar a escola pelo ano da publicação em vez do traço do texto.",
    ],
    subtemas: [],
  },

  "ingles": {
    resumo: "São 10 questões na Santa Casa e na Unifesp, 5 no Einstein — que ainda tem uma questão DISCURSIVA de inglês, única no conjunto. Na Unesp e na Unifesp, parte dos comandos vem em português sobre texto em inglês.",
    gatilhos: [
      "'The main purpose of the text is to' → responda pelo texto inteiro, não pelo primeiro parágrafo.",
      "'In the excerpt ... the underlined word refers to' → volte duas ou três linhas; o referente quase nunca está na mesma frase.",
      "'According to the Nth paragraph' → a resposta está SÓ naquele parágrafo; ignore o resto.",
      "Comando em português sobre texto em inglês → é pedido de paráfrase; responda em português, com precisão de sentido.",
    ],
    pegadinhas: [
      "Escolher a alternativa que repete palavras do texto sem checar se a relação é a mesma.",
      "Traduzir ao pé da letra uma expressão idiomática.",
      "No Einstein, tratar a discursiva de inglês como leitura: ela pede produção escrita.",
    ],
    subtemas: [],
  },

  "historia": {
    resumo: "10 questões na Santa Casa e parte das 12 discursivas de Humanas da Unesp. Quase sempre parte de documento, imagem, charge ou excerto historiográfico — não de pergunta seca sobre data.",
    gatilhos: [
      "Excerto de historiador (Hobsbawm, por exemplo) → a pergunta costuma ser sobre a INTERPRETAÇÃO dele, não sobre o fato.",
      "Charge datada → localize o ano no rodapé antes de tudo; o alvo da crítica depende dele.",
      "Documento de época (constituição, carta, lei) → procure quem ficou de fora do direito que o texto concede.",
      "Imagem de pintura histórica → pergunte-se quem encomendou e o que a composição legitima.",
    ],
    pegadinhas: [
      "Julgar o documento pelos valores de hoje quando a pergunta é sobre a lógica da época.",
      "Confundir causa com consequência em processos longos.",
    ],
    subtemas: [],
  },

  "geografia": {
    resumo: "Atenção: está na 2ª fase da USP para Medicina (B-F-G-Q), valendo o mesmo que Biologia. É a frente mais subestimada por quem prepara medicina.",
    gatilhos: [
      "Mapa com destaque em uma região → leia a legenda e a escala antes do enunciado.",
      "Climograma → compare o regime de chuva com o ciclo produtivo mencionado no texto.",
      "Tabela ou gráfico de população → identifique se o dado é absoluto ou relativo; a conclusão muda.",
      "Enunciado sobre matriz energética ou COP → a pergunta costuma ser sobre trade-off, não sobre definição.",
    ],
    pegadinhas: [
      "Trocar placas tectônicas por intemperismo como causa de relevo — as duas aparecem juntas de propósito.",
      "Descrever o mapa em vez de responder ao comando.",
      "Se o alvo é a USP, tratar Geografia como matéria de 1ª fase: ela vale 3 das 12 questões do 2º dia.",
    ],
    subtemas: [],
  },

  "filosofia-sociologia": {
    resumo: "Frente de peso muito desigual: rendeu 4 discursivas na 2ª fase da Unesp 2026.1 — o dobro de Biologia naquele caderno — e praticamente não cai isolada no Einstein e na Santa Casa.",
    gatilhos: [
      "Par 'Texto 1 / Texto 2' de fontes filosóficas → a pergunta é de confronto entre as duas posições.",
      "Excerto sobre dever e moralidade → é Kant; procure a diferença entre agir conforme o dever e agir por dever.",
      "'A mente é um papel em branco' → empirismo (Locke); o contraste esperado é com o racionalismo.",
      "Enunciado sobre trabalho, poder ou desigualdade → identifique de qual clássico é o vocabulário antes de responder.",
    ],
    pegadinhas: [
      "Responder com opinião própria quando o comando pede a posição do autor.",
      "Confundir Sócrates com Platão no intelectualismo moral.",
    ],
    subtemas: [],
  },

  "artes-cultura": {
    resumo: "Cerca de 7 questões na 1ª fase da FUVEST, e leitura de obra aparece dentro de blocos de Humanas nas demais. Quase sempre com a imagem na página.",
    gatilhos: [
      "Obra reproduzida → descreva composição, luz e ponto de vista antes de tentar nomear o movimento.",
      "Duas obras lado a lado → a pergunta é de comparação; ache o que muda entre elas.",
      "Texto teórico + obra → a obra é o caso e o texto é a lente; aplique um ao outro.",
    ],
    pegadinhas: [
      "Nomear o movimento pela data e não pelo traço.",
      "Ignorar a legenda: título, ano e técnica costumam conter a chave.",
    ],
    subtemas: [],
  },

  "atualidades": {
    resumo: "A Unicamp usou fonte com 17 dias de idade na prova de 2026 — a janela mais curta do conjunto. As três provas da VUNESP convergem em três a quatro meses; a FUVEST é a mais conservadora, com cerca de seis.",
    gatilhos: [
      "Notícia recente como texto de apoio → a pergunta é quase sempre sobre o MECANISMO por trás do fato, não sobre o fato.",
      "Tema climático → prepare-se para trade-off entre transição energética e custo social.",
      "IA como tema → as bancas cobram efeito social e trabalho, não tecnologia.",
      "Trabalho por plataforma → domine os termos uberização e pejotização; os dois apareceram em bancas diferentes no mesmo ciclo.",
    ],
    pegadinhas: [
      "Estudar só o fato e não a discussão em torno dele.",
      "Parar de ler notícia no mês da prova — na Unicamp, outubro é material de prova de outubro.",
    ],
    subtemas: [],
  },
};
