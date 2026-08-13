// Dicionário de assuntos da busca — as três trilhas.
//
// POR QUE ISTO EXISTE
//
// Busca por texto puro no banco funciona quando o nome do assunto É o termo
// técnico escrito na questão, e falha completamente quando não é. Medido no
// banco real, antes deste arquivo existir:
//
//   "crase"                 33 questões   (o nome é o termo -> funciona)
//   "segunda guerra"        23 questões
//   "estequiometria"         5 questões
//   "figuras de linguagem"   1 questão    (o nome é uma CATEGORIA)
//   "função quadrática"      0 questões   (idem — as 11 falam em parábola)
//
// Um aluno que digita "função quadrática" e recebe zero conclui que o banco não
// tem o assunto, e não volta a usar a busca. Com os sinônimos abaixo, os mesmos
// termos devolvem 11 e 77.
//
// COMO É USADO (app.js, buscarQuestoes)
//
//   1. Autocomplete: o `nome` é o que aparece na sugestão enquanto se digita —
//      é assim que o aluno para de adivinhar qual palavra o banco usa.
//   2. Expansão: escolhido um assunto, a busca procura por TODOS os `termos`.
//
// O CAMPO `frentes` NÃO É DECORAÇÃO
//
// Ele restringe onde os termos valem, e é o que segura o falso positivo. "Mol"
// só conta em Química; "raiz" só em Matemática (senão pega raiz de planta em
// Biologia e raiz de palavra em Gramática); "corrente" só em Física.
//
// Aceita id de frente das TRÊS trilhas de propósito — "matematica-rlm"
// (Direito) e "matematica" (Medicina) são a mesma coisa para quem estuda, e um
// registro só evita manter duas listas que iam divergir com o tempo. Economia
// parte a Matemática em cinco frentes, e as entradas daqui não as repetem uma a
// uma: quem cuida disso é o bloco no fim do arquivo.
//
// COMO ESCREVER UM TERMO
//
// A busca casa por palavra inteira, nunca por pedaço. Isso é deliberado: "mol"
// como pedaço casa 176 questões, das quais 146 são "molécula" e "molar". Então
// não adianta escrever raízes truncadas ("estequiom") esperando que peguem as
// variações — escreva a palavra como ela aparece, e as variações que importam.
//
// Plural é resolvido pelo motor (sufixos -s/-es/-is), não precisa listar.
//
// COBERTURA
//
// Parcial de propósito, e sem problema: a busca por texto livre funciona com o
// dicionário vazio. Cada assunto acrescentado melhora o recall daquele tema, e
// nada quebra enquanto uma frente não tem nenhum. Frente sem assunto aqui
// continua respondendo por texto livre.

window.ASSUNTOS = [

  // ---------------------------------------------------------------------
  // GRAMÁTICA E NORMA CULTA
  //
  // A frente onde o texto puro mais funciona: o enunciado costuma nomear o
  // fenômeno ("assinale a alternativa em que a crase..."). Os sinônimos aqui
  // servem menos ao recall e mais ao autocomplete — o aluno que não lembra se
  // o nome é "regência" ou "concordância" acha os dois digitando "verbo".
  // ---------------------------------------------------------------------
  { id: "crase", frentes: ["gramatica"], nome: "Crase", area: "Linguagens",
    termos: ["crase", "acento grave", "craseado", "a craseado"] },

  { id: "concordancia-verbal", frentes: ["gramatica"], nome: "Concordância verbal", area: "Linguagens",
    termos: ["concordancia verbal", "concordancia", "sujeito composto", "verbo concorda",
             "partícula se", "voz passiva sintética", "verbo haver", "verbo impessoal"] },

  { id: "concordancia-nominal", frentes: ["gramatica"], nome: "Concordância nominal", area: "Linguagens",
    termos: ["concordancia nominal", "anexo", "obrigado", "meio", "bastante", "menos",
             "é proibido", "é necessário"] },

  { id: "regencia", frentes: ["gramatica"], nome: "Regência verbal e nominal", area: "Linguagens",
    termos: ["regencia", "regencia verbal", "regencia nominal", "transitivo direto",
             "transitivo indireto", "objeto direto", "objeto indireto", "complemento verbal",
             "preposicao exigida", "verbo assistir", "verbo visar", "verbo implicar"] },

  { id: "colocacao-pronominal", frentes: ["gramatica"], nome: "Colocação pronominal", area: "Linguagens",
    termos: ["colocacao pronominal", "proclise", "enclise", "mesoclise", "pronome oblíquo",
             "fator de atração"] },

  { id: "pontuacao", frentes: ["gramatica"], nome: "Pontuação", area: "Linguagens",
    termos: ["pontuacao", "virgula", "ponto e virgula", "dois pontos", "aposto",
             "vocativo", "oracao intercalada", "travessao"] },

  { id: "oracoes-subordinadas", frentes: ["gramatica"], nome: "Orações subordinadas", area: "Linguagens",
    termos: ["oracao subordinada", "subordinada", "substantiva", "adjetiva", "adverbial",
             "oracao principal", "conjuncao subordinativa", "restritiva", "explicativa",
             "período composto", "subordinacao"] },

  { id: "oracoes-coordenadas", frentes: ["gramatica"], nome: "Orações coordenadas", area: "Linguagens",
    termos: ["oracao coordenada", "coordenada", "coordenacao", "conjuncao coordenativa",
             "aditiva", "adversativa", "conclusiva", "alternativa", "explicativa"] },

  { id: "coesao", frentes: ["gramatica", "interpretacao-texto"], nome: "Coesão e coerência", area: "Linguagens",
    termos: ["coesao", "coerencia", "elemento coesivo", "referente", "anafora", "catafora",
             "conector", "retomada", "progressao textual", "elipse"] },

  // NÃO EXISTE MAIS um assunto "Classes de palavras", e a ausência é deliberada.
  //
  // Ele existia e casava 171 das 300 questões de gramática — 57%. Medindo termo
  // a termo, o motivo apareceu: "preposição" casava 81 questões e aparecia no
  // enunciado de UMA; "substantivo", 67 questões e NENHUMA. Das 171, só 7 traziam
  // o termo no enunciado. As palavras estavam nas explicações, não nas perguntas
  // — explicar crase custa falar de preposição, e explicar concordância custa
  // falar de substantivo e adjetivo.
  //
  // Ou seja: o banco não cobra identificação de classe gramatical. "Classe de
  // palavra" e "morfologia" não aparecem uma única vez nas 300 questões.
  //
  // Não havia poda que resolvesse: mantendo só os termos com algum sinal no
  // enunciado ainda sobravam 139 questões (46%), e as mesmas 7 boas; reduzindo
  // aos marcadores metalinguísticos sobravam 6 questões. Um assunto que promete
  // 171 e entrega 7 é pior do que assunto nenhum, porque o número mente.
  //
  // Quem digitar "substantivo" continua achando as 67 questões pela busca por
  // texto livre, ordenadas por acerto no enunciado — que é o comportamento certo
  // e não finge que existe um tema curado ali.

  { id: "verbos", frentes: ["gramatica"], nome: "Verbos: tempo, modo e vozes", area: "Linguagens",
    termos: ["tempo verbal", "modo verbal", "subjuntivo", "indicativo", "imperativo",
             "voz passiva", "voz ativa", "voz reflexiva", "gerundio", "particípio",
             "infinitivo", "locucao verbal", "flexao verbal"] },

  { id: "pronomes", frentes: ["gramatica"], nome: "Pronomes", area: "Linguagens",
    termos: ["pronome", "pronome relativo", "pronome demonstrativo", "pronome possessivo",
             "pronome pessoal", "cujo", "onde", "o qual"] },

  { id: "acentuacao-ortografia", frentes: ["gramatica"], nome: "Acentuação e ortografia", area: "Linguagens",
    termos: ["acentuacao", "ortografia", "acento", "proparoxitona", "paroxitona",
             "oxitona", "hifen", "grafia"] },

  { id: "variacao-linguistica", frentes: ["gramatica", "interpretacao-texto"], nome: "Variação linguística e registro", area: "Linguagens",
    termos: ["variacao linguistica", "norma culta", "norma padrao", "registro formal",
             "registro informal", "coloquial", "gíria", "regionalismo", "preconceito linguístico"] },

  // ---------------------------------------------------------------------
  // INTERPRETAÇÃO DE TEXTO
  // ---------------------------------------------------------------------
  { id: "figuras-de-linguagem", frentes: ["interpretacao-texto", "literatura", "gramatica"], nome: "Figuras de linguagem", area: "Linguagens",
    termos: ["figura de linguagem", "metafora", "metonimia", "hiperbole", "ironia",
             "antitese", "eufemismo", "personificacao", "prosopopeia", "sinestesia",
             "pleonasmo", "paradoxo", "aliteracao", "assonancia", "catacrese",
             "gradacao", "anafora", "elipse", "perifrase"] },

  { id: "tese-argumento", frentes: ["interpretacao-texto"], nome: "Tese e argumentação", area: "Linguagens",
    termos: ["tese", "argumento", "argumentacao", "ponto de vista", "contra-argumento",
             "premissa", "conclusao", "falacia", "refutacao", "ideia central", "ideia principal"] },

  { id: "generos-textuais", frentes: ["interpretacao-texto"], nome: "Gêneros textuais", area: "Linguagens",
    termos: ["genero textual", "editorial", "cronica", "reportagem", "artigo de opiniao",
             "carta", "charge", "tirinha", "resenha", "manifesto", "verbete", "anuncio"] },

  { id: "funcoes-da-linguagem", frentes: ["interpretacao-texto", "literatura"], nome: "Funções da linguagem", area: "Linguagens",
    termos: ["funcao da linguagem", "funcao referencial", "funcao emotiva", "funcao conativa",
             "funcao apelativa", "funcao fatica", "funcao metalinguistica", "funcao poetica",
             "metalinguagem", "intertextualidade"] },

  { id: "inferencia", frentes: ["interpretacao-texto"], nome: "Inferência e implícito", area: "Linguagens",
    termos: ["inferencia", "implicito", "pressuposto", "subentendido", "depreende-se",
             "conclui-se", "ambiguidade"] },

  // ---------------------------------------------------------------------
  // LITERATURA
  //
  // Frente com um problema próprio: o enunciado quase nunca nomeia a escola
  // ("o texto acima pertence a um autor que..."). O aluno busca pelo nome da
  // escola, e o que está escrito é o nome do autor ou o traço de estilo.
  // ---------------------------------------------------------------------
  { id: "romantismo", frentes: ["literatura"], nome: "Romantismo", area: "Linguagens",
    termos: ["romantismo", "romantico", "indianismo", "ultrarromantismo", "mal do século",
             "condoreiro", "José de Alencar", "Gonçalves Dias", "Castro Alves", "Álvares de Azevedo",
             "Iracema", "Senhora", "O Guarani"] },

  { id: "realismo-naturalismo", frentes: ["literatura"], nome: "Realismo e Naturalismo", area: "Linguagens",
    termos: ["realismo", "naturalismo", "determinismo", "cientificismo", "objetividade",
             "Machado de Assis", "Aluísio Azevedo", "Eça de Queirós", "Raul Pompeia",
             "Dom Casmurro", "Memórias Póstumas", "O Cortiço", "Brás Cubas", "O Ateneu"] },

  { id: "parnasianismo-simbolismo", frentes: ["literatura"], nome: "Parnasianismo e Simbolismo", area: "Linguagens",
    termos: ["parnasianismo", "parnasiano", "simbolismo", "simbolista", "arte pela arte",
             "culto à forma", "sinestesia", "musicalidade", "Olavo Bilac", "Cruz e Sousa",
             "Alphonsus de Guimaraens", "soneto parnasiano"] },

  { id: "modernismo-1a-fase", frentes: ["literatura"], nome: "Modernismo: 1ª fase", area: "Linguagens",
    termos: ["semana de arte moderna", "1922", "primeira fase modernista", "antropofagia",
             "pau-brasil", "verso livre", "Oswald de Andrade", "Mário de Andrade",
             "Macunaíma", "Manuel Bandeira", "Paulicéia Desvairada", "manifesto"] },

  { id: "modernismo-2a-fase", frentes: ["literatura"], nome: "Modernismo: 2ª fase e romance de 30", area: "Linguagens",
    termos: ["romance de 30", "segunda fase modernista", "regionalismo", "romance nordestino",
             "Graciliano Ramos", "Vidas Secas", "Jorge Amado", "Rachel de Queiroz",
             "José Lins do Rego", "Drummond", "Carlos Drummond", "Cecília Meireles", "Vinicius de Moraes"] },

  { id: "modernismo-3a-fase", frentes: ["literatura"], nome: "Modernismo: 3ª fase (Geração de 45)", area: "Linguagens",
    termos: ["geracao de 45", "terceira fase modernista", "João Cabral", "Clarice Lispector",
             "Guimarães Rosa", "Grande Sertão", "epifania", "fluxo de consciência",
             "Morte e Vida Severina", "concretismo"] },

  { id: "analise-do-poema", frentes: ["literatura"], nome: "Análise do poema", area: "Linguagens",
    termos: ["eu lirico", "eu-lirico", "soneto", "estrofe", "verso", "rima", "metrica",
             "decassilabo", "redondilha", "quarteto", "terceto", "poema", "lírico"] },

  { id: "quinhentismo-barroco-arcadismo", frentes: ["literatura"], nome: "Quinhentismo, Barroco e Arcadismo", area: "Linguagens",
    termos: ["quinhentismo", "barroco", "arcadismo", "literatura de informacao",
             "cultismo", "conceptismo", "carpe diem", "locus amoenus", "pastor",
             "Gregório de Matos", "Padre Vieira", "Tomás Antônio Gonzaga", "Claudio Manuel"] },

  // Chamava-se "Teoria literária e narrativa" e casava 144 das 300 questões de
  // literatura (48%). O excesso vinha dos termos largos: "narrativa" casava 69
  // questões com 3 acertos no enunciado, "personagem" 48 com 3, "enredo" 32 com
  // 1 — palavras que toda análise de texto literário usa de passagem, sem que a
  // questão seja sobre construção narrativa.
  //
  // Podado ao FOCO NARRATIVO, que é o que a frente realmente cobra: 87 questões
  // (29%), das quais 14 trazem o termo no enunciado. "Narrador" ficou porque é
  // o único termo largo que se sustenta — sozinho responde por 13 dos 14 acertos
  // de enunciado, ou seja, quando aparece costuma ser o assunto.
  //
  // Saíram também "clímax" (zero ocorrências no banco) e "novela" (uma).
  //
  // O nome mudou junto: prometer "teoria literária" e entregar foco narrativo
  // seria o mesmo defeito, do lado do rótulo.
  { id: "foco-narrativo", frentes: ["literatura"], nome: "Narrador e foco narrativo", area: "Linguagens",
    termos: ["narrador", "foco narrativo", "narrador onisciente", "narrador-personagem",
             "primeira pessoa", "terceira pessoa", "discurso indireto livre",
             "tempo psicológico", "onisciencia"] },

  // ---------------------------------------------------------------------
  // MATEMÁTICA
  //
  // O caso extremo oposto ao da Gramática: o nome escolar do assunto quase
  // nunca aparece no enunciado. "Função quadrática" dava ZERO — o enunciado
  // diz parábola, vértice, delta.
  // ---------------------------------------------------------------------
  { id: "funcao-quadratica", frentes: ["matematica"], nome: "Função quadrática", area: "Matemática",
    termos: ["funcao quadratica", "funcao do segundo grau", "segundo grau", "parabola",
             "vertice", "bhaskara", "discriminante", "concavidade", "raizes da funcao"] },

  { id: "funcao-afim", frentes: ["matematica"], nome: "Função afim", area: "Matemática",
    termos: ["funcao afim", "funcao do primeiro grau", "primeiro grau", "coeficiente angular",
             "coeficiente linear", "reta", "taxa de variacao", "funcao linear"] },

  { id: "funcao-exponencial-logaritmo", frentes: ["matematica"], nome: "Exponencial e logaritmo", area: "Matemática",
    termos: ["logaritmo", "exponencial", "funcao exponencial", "crescimento exponencial",
             "decaimento", "meia-vida", "base do logaritmo", "log"] },

  { id: "progressoes", frentes: ["matematica"], nome: "Progressões (PA e PG)", area: "Matemática",
    termos: ["progressao aritmetica", "progressao geometrica", "razao da progressao",
             "termo geral", "soma dos termos", "sequencia numerica"] },

  { id: "porcentagem-juros", frentes: ["matematica"], nome: "Porcentagem e juros", area: "Matemática",
    termos: ["porcentagem", "percentual", "juros", "juros simples", "juros compostos",
             "desconto", "acrescimo", "taxa de juros", "montante", "capital", "inflacao"] },

  { id: "probabilidade", frentes: ["matematica"], nome: "Probabilidade", area: "Matemática",
    termos: ["probabilidade", "espaco amostral", "evento", "chance", "probabilidade condicional",
             "independentes", "mutuamente exclusivos"] },

  { id: "analise-combinatoria", frentes: ["matematica"], nome: "Análise combinatória", area: "Matemática",
    termos: ["analise combinatoria", "combinacao", "arranjo", "permutacao", "fatorial",
             "principio multiplicativo", "quantas maneiras", "anagrama"] },

  { id: "estatistica", frentes: ["matematica"], nome: "Estatística", area: "Matemática",
    termos: ["media aritmetica", "mediana", "moda", "desvio padrao", "variancia",
             "media ponderada", "amostra", "frequencia relativa", "histograma", "quartil"] },

  { id: "geometria-plana", frentes: ["matematica"], nome: "Geometria plana", area: "Matemática",
    termos: ["geometria plana", "area do triangulo", "perimetro", "circunferencia",
             "poligono", "trapezio", "losango", "teorema de pitagoras", "semelhanca de triangulos",
             "apotema", "setor circular"] },

  { id: "geometria-espacial", frentes: ["matematica"], nome: "Geometria espacial", area: "Matemática",
    termos: ["geometria espacial", "volume", "prisma", "cilindro", "cone", "esfera",
             "piramide", "area total", "area lateral", "poliedro", "tronco"] },

  { id: "trigonometria", frentes: ["matematica"], nome: "Trigonometria", area: "Matemática",
    termos: ["trigonometria", "seno", "cosseno", "tangente", "lei dos senos", "lei dos cossenos",
             "radiano", "circulo trigonometrico", "arco"] },

  { id: "razao-proporcao", frentes: ["matematica"], nome: "Razão, proporção e regra de três", area: "Matemática",
    termos: ["razao", "proporcao", "regra de tres", "grandezas proporcionais",
             "diretamente proporcional", "inversamente proporcional", "escala"] },

  { id: "sistemas-equacoes", frentes: ["matematica"], nome: "Equações e sistemas", area: "Matemática",
    termos: ["sistema de equacoes", "equacao", "incognita", "inequacao", "matriz",
             "determinante", "substituicao"] },

  { id: "leitura-de-graficos", frentes: ["matematica"], nome: "Leitura de gráficos e tabelas", area: "Matemática",
    termos: ["grafico", "tabela", "eixo", "curva", "grafico de barras", "grafico de setores",
             "interpretacao grafica", "dispersao"] },

  { id: "raciocinio-logico", frentes: ["matematica"], nome: "Raciocínio lógico", area: "Matemática",
    termos: ["raciocinio logico", "proposicao", "negacao", "conectivo", "tabela verdade",
             "silogismo", "implicacao", "condicional", "quantificador", "argumento valido"] },

  // ---------------------------------------------------------------------
  // BIOLOGIA
  // ---------------------------------------------------------------------
  { id: "citologia", frentes: ["biologia"], nome: "Citologia", area: "Ciências da Natureza",
    termos: ["celula", "membrana plasmatica", "citoplasma", "nucleo", "organela",
             "mitocondria", "ribossomo", "lisossomo", "complexo golgiense", "reticulo endoplasmatico",
             "osmose", "difusao", "transporte ativo", "cloroplasto"] },

  // Genética foi partida em três. Era um assunto só, e a lista de conteúdo que
  // as bancas publicam separa justamente estes: leis de Mendel, heredograma e
  // genética molecular. Quem digita "heredograma" quer as questões de
  // genealogia, não as 33 de genética em geral.
  { id: "leis-de-mendel", frentes: ["biologia"], nome: "Leis de Mendel", area: "Ciências da Natureza",
    termos: ["mendel", "primeira lei", "segunda lei", "segregacao", "monohibridismo",
             "di-hibridismo", "proporcao fenotipica", "proporcao genotipica",
             "quadro de punnett", "retrocruzamento", "cruzamento-teste", "epistasia",
             "homozigoto", "heterozigoto"] },

  { id: "heredograma", frentes: ["biologia"], nome: "Heredograma", area: "Ciências da Natureza",
    termos: ["heredograma", "genealogia", "arvore genealogica", "probando",
             "geracao i", "geracao ii", "afetado", "portador", "consanguineo"] },

  { id: "genetica", frentes: ["biologia"], nome: "Genética: herança e alelos", area: "Ciências da Natureza",
    termos: ["genetica", "alelo", "genotipo", "fenotipo", "dominante", "recessivo",
             "codominancia", "dominancia incompleta", "alelos multiplos",
             "grupo sanguineo", "sistema abo", "fator rh", "daltonismo", "hemofilia",
             "ligada ao sexo", "linkage", "permutacao genica"] },

  { id: "dna-sintese-proteica", frentes: ["biologia"], nome: "DNA e síntese proteica", area: "Ciências da Natureza",
    termos: ["dna", "rna", "acido nucleico", "transcricao", "traducao", "codon",
             "replicacao", "gene", "cromossomo", "mutacao", "nucleotideo", "sintese proteica"] },

  { id: "ecologia", frentes: ["biologia"], nome: "Ecologia", area: "Ciências da Natureza",
    termos: ["ecologia", "ecossistema", "cadeia alimentar", "teia alimentar", "nivel trofico",
             "produtor", "consumidor", "decompositor", "biomassa", "sucessao ecologica",
             "populacao", "comunidade", "bioma", "ciclo do carbono", "ciclo do nitrogenio",
             "eutrofizacao", "predatismo", "competicao", "simbiose"] },

  // Fisiologia humana foi partida em seis, um assunto por sistema. Era um
  // assunto só com treze termos, e o aluno que digitava "sistema nervoso"
  // recebia junto as questões de rim, de insulina e de hemoglobina — a lista
  // de conteúdo de qualquer banca separa os sistemas, e o caderno da escola
  // também. Quem quer revisar excretor não quer as 36 de fisiologia inteira.
  //
  // "fisiologia humana" e "fisiologia" ficam como termo nos SEIS: é o que faz o
  // autocomplete devolver os seis chips para quem digita o nome guarda-chuva,
  // que é a porta de entrada do currículo. Nenhuma questão do banco contém a
  // palavra "fisiologia", então o termo não altera o alcance de nenhum deles —
  // ele existe para a sugestão, e é o mesmo recurso da F1 do plano de busca.
  //
  // Gênero NÃO é resolvido pelo motor: buscaRadical corta -s/-es e nada mais,
  // então "respiratorio" e "respiratoria" são tokens diferentes e as duas
  // formas precisam estar listadas. Só o plural pode ser omitido.
  { id: "sistema-digestorio", frentes: ["biologia"], nome: "Sistema digestório", area: "Ciências da Natureza",
    termos: ["fisiologia humana", "fisiologia", "sistema digestorio", "digestorio", "digestoria",
             "digestao", "aparelho digestivo", "digestivo", "digestiva", "tubo digestivo",
             "estomago", "gastrico", "gastrica", "suco gastrico", "acido cloridrico",
             "intestino", "intestino delgado", "intestino grosso", "intestinal",
             "duodeno", "jejuno", "ileo", "colon", "esofago", "peristaltismo", "peristaltica",
             // "quilo" sozinho fica de fora: em `ciencias-natureza` ele casa o
             // quilograma, e o conceito já entra por "quilomicron".
             "bolo alimentar", "quimo", "figado", "hepatico", "hepatica",
             "bile", "biliar", "vesicula biliar", "sal biliar", "pancreas", "suco pancreatico",
             "enzima digestiva", "amilase", "ptialina", "pepsina", "pepsinogenio", "tripsina",
             "lipase", "sacarase", "lactase", "vilosidade", "microvilosidade",
             "absorcao intestinal", "microbiota", "microbiota intestinal", "saliva", "salivar",
             "esfincter", "quilomicron"] },

  { id: "sistema-respiratorio", frentes: ["biologia"], nome: "Sistema respiratório", area: "Ciências da Natureza",
    termos: ["fisiologia humana", "fisiologia", "sistema respiratorio", "respiratorio", "respiratoria",
             "aparelho respiratorio", "via aerea", "pulmao", "pulmonar", "alveolo", "alveolar",
             "bronquio", "bronquiolo", "traqueia", "laringe", "faringe", "epiglote",
             "diafragma", "musculo intercostal", "caixa toracica", "pleura",
             "hematose", "trocas gasosas", "troca gasosa", "ventilacao pulmonar",
             "inspiracao", "expiracao", "ar inspirado", "ar expirado", "volume corrente",
             "capacidade pulmonar", "espirometria", "surfactante", "centro respiratorio",
             "pressao parcial", "saturacao de oxigenio", "quimiorreceptor",
             "asma", "enfisema", "pneumonia", "tabagismo", "hipoxia"] },

  { id: "sistema-circulatorio", frentes: ["biologia"], nome: "Sistema circulatório", area: "Ciências da Natureza",
    termos: ["fisiologia humana", "fisiologia", "sistema circulatorio", "circulatorio", "circulatoria",
             "sistema cardiovascular", "cardiovascular", "coracao", "cardiaco", "cardiaca",
             "arteria", "arterial", "veia", "venoso", "venosa", "capilar", "vaso sanguineo",
             "atrio", "ventriculo", "valva", "valvula cardiaca", "sistole", "diastole",
             "sistolica", "diastolica", "no sinoatrial", "eletrocardiograma", "debito cardiaco",
             "pressao arterial", "hipertensao", "aterosclerose", "infarto", "trombose",
             "circulacao pulmonar", "circulacao sistemica", "pequena circulacao", "grande circulacao",
             "sangue", "sanguineo", "sanguinea", "hemacia", "eritrocito", "leucocito", "plaqueta",
             "plasma sanguineo", "hemoglobina", "hematocrito", "coagulacao", "fibrina",
             "anemia", "linfa", "linfatico", "vaso linfatico", "batimento"] },

  { id: "sistema-excretor", frentes: ["biologia"], nome: "Sistema excretor", area: "Ciências da Natureza",
    termos: ["fisiologia humana", "fisiologia", "sistema excretor", "excretor", "excretora",
             "sistema urinario", "urinario", "urinaria", "excrecao", "rim", "renal",
             "nefron", "glomerulo", "glomerular", "capsula de bowman", "filtracao glomerular",
             "tubulo", "tubulo contorcido", "alca de henle", "tubulo coletor", "ducto coletor",
             // "reabsorcao" e "amonia" ficaram de fora, medidos: o primeiro casa a
             // reabsorção de matriz óssea, o segundo o ciclo do nitrogênio. As
             // formas específicas abaixo pegam o mesmo conteúdo renal sem o ruído.
             "reabsorcao tubular", "reabsorcao renal", "secrecao tubular",
             "amoniotelico", "ureotelico", "uricotelico",
             "urina", "ureter", "bexiga", "uretra",
             "ureia", "acido urico", "creatinina", "clearance",
             "osmorregulacao", "balanco hidrico", "equilibrio hidrico",
             "hormonio antidiuretico", "vasopressina", "aldosterona", "sistema renina",
             "renina", "dialise", "hemodialise", "calculo renal", "insuficiencia renal",
             "diurese", "diuretico", "homeostase"] },

  { id: "sistema-nervoso", frentes: ["biologia"], nome: "Sistema nervoso", area: "Ciências da Natureza",
    termos: ["fisiologia humana", "fisiologia", "sistema nervoso", "nervoso", "nervosa",
             "neuronio", "neuronal", "axonio", "dendrito", "corpo celular", "sinapse", "sinaptica",
             "fenda sinaptica", "neurotransmissor", "acetilcolina", "dopamina", "serotonina",
             "gaba", "noradrenalina", "impulso nervoso", "potencial de acao", "potencial de repouso",
             "despolarizacao", "repolarizacao", "bomba de sodio", "bainha de mielina", "mielina",
             "celula de schwann", "nodo de ranvier", "conducao saltatoria",
             "nervo", "ganglio", "medula espinhal", "encefalo", "cerebro", "cerebral",
             "cerebelo", "bulbo", "hipotalamo", "tronco encefalico", "cortex cerebral",
             "materia cinzenta", "materia branca", "meninge",
             "ato reflexo", "arco reflexo", "reflexo medular",
             "sistema nervoso central", "sistema nervoso periferico", "sistema nervoso autonomo",
             "simpatico", "parassimpatico", "receptor sensorial", "orgao dos sentidos",
             "retina", "coclea", "sinaptico", "psicoativo", "anestesico"] },

  { id: "sistema-endocrino", frentes: ["biologia"], nome: "Sistema endócrino", area: "Ciências da Natureza",
    termos: ["fisiologia humana", "fisiologia", "sistema endocrino", "endocrino", "endocrina",
             "hormonio", "hormonal", "glandula", "glandula endocrina", "hipofise", "hipofisario",
             "hipotalamo", "tireoide", "paratireoide", "adrenal", "suprarrenal", "pineal",
             "ilhotas de langerhans", "pancreas endocrino",
             "insulina", "glucagon", "adrenalina", "noradrenalina", "cortisol", "tiroxina",
             "calcitonina", "paratormonio", "somatotrofina", "hormonio do crescimento",
             "melatonina", "prolactina", "ocitocina", "testosterona", "estrogeno", "progesterona",
             "fsh", "lh", "tsh", "acth",
             "feedback negativo", "retroalimentacao negativa", "retroalimentacao",
             "glicemia", "glicemico", "hiperglicemia", "hipoglicemia", "diabetes",
             "hipertireoidismo", "hipotireoidismo", "bocio", "homeostase",
             "receptor hormonal", "orgao alvo", "celula alvo"] },

  { id: "evolucao", frentes: ["biologia"], nome: "Evolução", area: "Ciências da Natureza",
    termos: ["evolucao", "selecao natural", "darwin", "lamarck", "especiacao",
             "deriva genetica", "adaptacao", "ancestral comum", "fossil", "convergencia adaptativa"] },

  { id: "fotossintese-respiracao", frentes: ["biologia"], nome: "Fotossíntese e respiração celular", area: "Ciências da Natureza",
    termos: ["fotossintese", "respiracao celular", "clorofila", "atp", "glicolise",
             "ciclo de krebs", "cadeia respiratoria", "fermentacao", "gas carbonico"] },

  { id: "microbiologia-imunologia", frentes: ["biologia"], nome: "Microbiologia e imunologia", area: "Ciências da Natureza",
    termos: ["virus", "bacteria", "fungo", "protozoario", "vacina", "anticorpo", "antigeno",
             "imunidade", "antibiotico", "epidemia", "parasita", "verminose", "soro"] },

  // ---------------------------------------------------------------------
  // QUÍMICA
  // ---------------------------------------------------------------------
  { id: "estequiometria", frentes: ["quimica"], nome: "Estequiometria", area: "Ciências da Natureza",
    termos: ["estequiometria", "mol", "massa molar", "reagente limitante", "balanceamento",
             "rendimento", "numero de avogadro", "proporcao estequiometrica"] },

  { id: "tabela-periodica", frentes: ["quimica"], nome: "Tabela periódica", area: "Ciências da Natureza",
    termos: ["tabela periodica", "periodicidade", "eletronegatividade", "raio atomico",
             "energia de ionizacao", "metal alcalino", "halogenio", "gas nobre",
             "familia", "periodo", "numero atomico"] },

  { id: "ligacoes-quimicas", frentes: ["quimica"], nome: "Ligações químicas", area: "Ciências da Natureza",
    termos: ["ligacao ionica", "ligacao covalente", "ligacao metalica", "ligacao quimica",
             "polaridade", "geometria molecular", "ponte de hidrogenio", "forca intermolecular",
             "dipolo"] },

  { id: "solucoes", frentes: ["quimica"], nome: "Soluções e concentração", area: "Ciências da Natureza",
    termos: ["solucao", "concentracao", "molaridade", "soluto", "solvente", "diluicao",
             "solubilidade", "titulacao", "ppm"] },

  { id: "acidos-bases-ph", frentes: ["quimica"], nome: "Ácidos, bases e pH", area: "Ciências da Natureza",
    termos: ["acido", "base", "ph", "poh", "neutralizacao", "indicador", "tampao",
             "hidrolise", "sal", "arrhenius", "bronsted"] },

  { id: "termoquimica", frentes: ["quimica"], nome: "Termoquímica", area: "Ciências da Natureza",
    termos: ["termoquimica", "entalpia", "exotermica", "endotermica", "calor de reacao",
             "lei de hess", "energia de ligacao", "combustao"] },

  // Cinética e equilíbrio eram um assunto só. Foram separados porque são dois
  // capítulos distintos no cronograma de qualquer aluno — e porque a busca
  // precisa responder a "equilíbrio químico" sem trazer catalisador junto.
  { id: "equilibrio-quimico", frentes: ["quimica"], nome: "Equilíbrio químico", area: "Ciências da Natureza",
    termos: ["equilibrio quimico", "le chatelier", "constante de equilibrio",
             "deslocamento do equilibrio", "kc", "kp", "grau de equilibrio",
             "equilibrio dinamico", "quociente de reacao"] },

  { id: "cinetica-quimica", frentes: ["quimica"], nome: "Cinética química", area: "Ciências da Natureza",
    termos: ["cinetica", "velocidade da reacao", "catalisador", "energia de ativacao",
             "ordem de reacao", "complexo ativado", "colisao efetiva"] },

  { id: "quimica-organica", frentes: ["quimica"], nome: "Química orgânica", area: "Ciências da Natureza",
    termos: ["quimica organica", "hidrocarboneto", "alcano", "alceno", "alcool", "aldeido",
             "cetona", "acido carboxilico", "ester", "amina", "funcao organica", "isomeria",
             "cadeia carbonica", "polimero", "nomenclatura"] },

  // Oxirredução saiu de dentro de Eletroquímica e virou assunto próprio: ela é
  // pré-requisito da pilha, mas também é cobrada sozinha (balancear por nox,
  // identificar agente oxidante) em questão que não fala de eletroquímica.
  { id: "oxirreducao", frentes: ["quimica"], nome: "Oxirredução", area: "Ciências da Natureza",
    termos: ["oxirreducao", "oxidacao", "reducao", "nox", "numero de oxidacao",
             "agente oxidante", "agente redutor", "balanceamento por oxirreducao",
             "semirreacao"] },

  { id: "eletroquimica", frentes: ["quimica"], nome: "Eletroquímica", area: "Ciências da Natureza",
    termos: ["eletroquimica", "pilha", "eletrolise", "anodo", "catodo",
             "potencial padrao", "ddp", "corrosao", "galvanica", "faraday",
             "eletrodo", "ponte salina"] },

  // ---------------------------------------------------------------------
  // FÍSICA
  // ---------------------------------------------------------------------
  { id: "cinematica", frentes: ["fisica"], nome: "Cinemática", area: "Ciências da Natureza",
    termos: ["cinematica", "velocidade media", "aceleracao", "movimento uniforme",
             "movimento uniformemente variado", "lancamento", "queda livre", "deslocamento",
             "trajetoria", "grafico de velocidade"] },

  { id: "leis-de-newton", frentes: ["fisica"], nome: "Leis de Newton e dinâmica", area: "Ciências da Natureza",
    termos: ["leis de newton", "forca resultante", "inercia", "acao e reacao", "atrito",
             "normal", "tracao", "plano inclinado", "dinamica", "peso"] },

  { id: "energia-trabalho", frentes: ["fisica"], nome: "Trabalho, energia e potência", area: "Ciências da Natureza",
    termos: ["trabalho", "energia cinetica", "energia potencial", "conservacao de energia",
             "potencia", "rendimento", "energia mecanica", "joule"] },

  { id: "eletricidade", frentes: ["fisica"], nome: "Eletricidade e circuitos", area: "Ciências da Natureza",
    termos: ["corrente eletrica", "tensao", "resistencia", "lei de ohm", "circuito",
             "resistor", "potencia eletrica", "capacitor", "curto-circuito", "serie e paralelo",
             "campo eletrico", "carga eletrica"] },

  { id: "termologia", frentes: ["fisica"], nome: "Termologia e termodinâmica", area: "Ciências da Natureza",
    termos: ["termologia", "termodinamica", "calor especifico", "calor latente",
             "dilatacao", "mudanca de estado", "temperatura", "maquina termica",
             "gas ideal", "entropia", "conducao", "conveccao", "irradiacao"] },

  { id: "ondas-som", frentes: ["fisica"], nome: "Ondas e som", area: "Ciências da Natureza",
    termos: ["onda", "frequencia", "comprimento de onda", "amplitude", "som",
             "efeito doppler", "ressonancia", "interferencia", "difracao", "periodo",
             "ondulatoria", "eco"] },

  { id: "optica", frentes: ["fisica"], nome: "Óptica", area: "Ciências da Natureza",
    termos: ["optica", "refracao", "reflexao", "lente", "espelho", "indice de refracao",
             "imagem virtual", "imagem real", "miopia", "hipermetropia", "prisma",
             "angulo de incidencia"] },

  { id: "eletromagnetismo", frentes: ["fisica"], nome: "Eletromagnetismo", area: "Ciências da Natureza",
    termos: ["campo magnetico", "eletromagnetismo", "ima", "inducao", "faraday", "lenz",
             "forca magnetica", "transformador", "fluxo magnetico"] },

  // ---------------------------------------------------------------------
  // HISTÓRIA
  // ---------------------------------------------------------------------
  { id: "brasil-colonia", frentes: ["historia"], nome: "Brasil Colônia", area: "Humanas",
    termos: ["brasil colonia", "colonial", "capitania hereditaria", "engenho", "escravidao",
             "bandeirante", "quilombo", "palmares", "pacto colonial", "mineracao",
             "inconfidencia", "jesuita"] },

  { id: "brasil-imperio", frentes: ["historia"], nome: "Brasil Império", area: "Humanas",
    termos: ["independencia", "primeiro reinado", "segundo reinado", "regencia",
             "dom pedro", "lei aurea", "abolicao", "guerra do paraguai", "cafe",
             "constituicao de 1824", "proclamacao da republica"] },

  { id: "republica-velha-vargas", frentes: ["historia"], nome: "República Velha e Era Vargas", area: "Humanas",
    termos: ["republica velha", "coronelismo", "cafe com leite", "tenentismo",
             "revolucao de 1930", "getulio vargas", "estado novo", "clt", "populismo",
             "canudos", "contestado"] },

  { id: "ditadura-redemocratizacao", frentes: ["historia"], nome: "Ditadura militar e redemocratização", area: "Humanas",
    termos: ["ditadura militar", "golpe de 1964", "ai-5", "milagre economico",
             "anistia", "diretas ja", "redemocratizacao", "constituicao de 1988",
             "abertura politica", "censura"] },

  { id: "revolucoes-burguesas", frentes: ["historia"], nome: "Revoluções burguesas e Iluminismo", area: "Humanas",
    termos: ["revolucao francesa", "iluminismo", "revolucao industrial", "revolucao inglesa",
             "independencia dos estados unidos", "liberalismo", "burguesia", "antigo regime",
             "absolutismo", "declaracao dos direitos"] },

  { id: "guerras-mundiais", frentes: ["historia"], nome: "Guerras Mundiais", area: "Humanas",
    termos: ["primeira guerra", "segunda guerra", "nazismo", "fascismo", "holocausto",
             "hitler", "tratado de versalhes", "totalitarismo", "pearl harbor",
             "bomba atomica", "revolucao russa", "crise de 1929"] },

  { id: "guerra-fria", frentes: ["historia"], nome: "Guerra Fria e descolonização", area: "Humanas",
    termos: ["guerra fria", "otan", "pacto de varsovia", "muro de berlim", "corrida armamentista",
             "descolonizacao", "socialismo", "capitalismo", "queda da uniao sovietica",
             "revolucao cubana", "apartheid"] },

  { id: "idade-media-antiguidade", frentes: ["historia"], nome: "Antiguidade e Idade Média", area: "Humanas",
    termos: ["idade media", "feudalismo", "imperio romano", "grecia antiga", "cruzadas",
             "igreja medieval", "renascimento", "reforma protestante", "mercantilismo",
             "grandes navegacoes", "democracia ateniense"] },

  // ---------------------------------------------------------------------
  // GEOGRAFIA
  // ---------------------------------------------------------------------
  { id: "urbanizacao", frentes: ["geografia"], nome: "Urbanização", area: "Humanas",
    termos: ["urbanizacao", "metropole", "periferia", "favela", "conurbacao",
             "regiao metropolitana", "segregacao urbana", "gentrificacao", "mobilidade urbana",
             "cidade", "êxodo rural"] },

  { id: "demografia", frentes: ["geografia"], nome: "Demografia", area: "Humanas",
    termos: ["demografia", "piramide etaria", "taxa de natalidade", "taxa de mortalidade",
             "envelhecimento populacional", "migracao", "densidade demografica",
             "transicao demografica", "bonus demografico", "expectativa de vida"] },

  { id: "climatologia", frentes: ["geografia"], nome: "Clima e domínios naturais", area: "Humanas",
    termos: ["clima", "massa de ar", "frente fria", "el nino", "zona de convergencia",
             "bioma", "cerrado", "caatinga", "amazonia", "mata atlantica", "pampa",
             "relevo", "bacia hidrografica", "solo"] },

  { id: "globalizacao", frentes: ["geografia", "atualidades"], nome: "Globalização e blocos econômicos", area: "Humanas",
    termos: ["globalizacao", "bloco economico", "mercosul", "uniao europeia", "brics",
             "omc", "fmi", "multinacional", "divisao internacional do trabalho",
             "cadeia produtiva global", "neoliberalismo"] },

  { id: "agropecuaria", frentes: ["geografia"], nome: "Agropecuária e agronegócio", area: "Humanas",
    termos: ["agronegocio", "agropecuaria", "agricultura familiar", "reforma agraria",
             "monocultura", "commodities", "fronteira agricola", "revolucao verde",
             "estrutura fundiaria", "latifundio"] },

  { id: "energia-recursos", frentes: ["geografia", "atualidades"], nome: "Energia e recursos naturais", area: "Humanas",
    termos: ["matriz energetica", "energia renovavel", "hidreletrica", "petroleo",
             "pre-sal", "energia eolica", "energia solar", "biocombustivel",
             "transicao energetica", "mineracao"] },

  // ---------------------------------------------------------------------
  // FILOSOFIA E SOCIOLOGIA
  // ---------------------------------------------------------------------
  { id: "filosofia-antiga", frentes: ["filosofia-sociologia"], nome: "Filosofia antiga", area: "Humanas",
    termos: ["socrates", "platao", "aristoteles", "mito da caverna", "maieutica",
             "filosofia antiga", "sofista", "etica aristotelica", "virtude", "epicurismo",
             "estoicismo"] },

  { id: "contratualismo", frentes: ["filosofia-sociologia", "direitos-humanos"], nome: "Contratualismo e Estado", area: "Humanas",
    termos: ["contrato social", "hobbes", "locke", "rousseau", "estado de natureza",
             "leviata", "soberania", "montesquieu", "separacao dos poderes", "vontade geral"] },

  { id: "sociologia-classica", frentes: ["filosofia-sociologia"], nome: "Sociologia clássica", area: "Humanas",
    termos: ["durkheim", "weber", "marx", "fato social", "anomia", "acao social",
             "tipo ideal", "mais-valia", "luta de classes", "alienacao", "ideologia",
             "burocracia", "solidariedade organica"] },

  { id: "etica-moral", frentes: ["filosofia-sociologia"], nome: "Ética e moral", area: "Humanas",
    termos: ["etica", "moral", "kant", "imperativo categorico", "utilitarismo",
             "deontologia", "bioetica", "dilema etico", "autonomia", "liberdade"] },

  { id: "cultura-identidade", frentes: ["filosofia-sociologia", "artes-cultura", "artes"], nome: "Cultura e identidade", area: "Humanas",
    termos: ["cultura", "etnocentrismo", "relativismo cultural", "identidade",
             "industria cultural", "escola de frankfurt", "adorno", "cultura de massa",
             "diversidade cultural", "multiculturalismo"] },

  // ---------------------------------------------------------------------
  // DIREITOS HUMANOS E ATUALIDADES
  // ---------------------------------------------------------------------
  { id: "direitos-fundamentais", frentes: ["direitos-humanos"], nome: "Direitos fundamentais", area: "Humanas",
    termos: ["direitos humanos", "direitos fundamentais", "declaracao universal",
             "dignidade da pessoa humana", "constituicao federal", "clausula petrea",
             "igualdade", "liberdade de expressao", "devido processo legal"] },

  { id: "desigualdade-minorias", frentes: ["direitos-humanos", "filosofia-sociologia"], nome: "Desigualdade e minorias", area: "Humanas",
    termos: ["desigualdade", "racismo", "acao afirmativa", "cota", "genero",
             "feminismo", "lgbt", "povos indigenas", "quilombola", "pessoa com deficiencia",
             "inclusao", "vulnerabilidade"] },

  { id: "meio-ambiente-clima", frentes: ["atualidades", "geografia"], nome: "Mudanças climáticas", area: "Atualidades",
    termos: ["mudanca climatica", "aquecimento global", "efeito estufa", "acordo de paris",
             "cop", "desmatamento", "sustentabilidade", "carbono", "credito de carbono",
             "biodiversidade", "agenda 2030", "ods"] },

  { id: "tecnologia-sociedade", frentes: ["atualidades"], nome: "Tecnologia e sociedade", area: "Atualidades",
    termos: ["inteligencia artificial", "algoritmo", "rede social", "privacidade",
             "dados pessoais", "lgpd", "desinformacao", "fake news", "bolha informacional",
             "automacao", "big data", "plataforma digital"] },

  { id: "geopolitica-conflitos", frentes: ["atualidades"], nome: "Conflitos e geopolítica", area: "Atualidades",
    termos: ["geopolitica", "conflito", "guerra", "onu", "conselho de seguranca",
             "refugiado", "sancao", "oriente medio", "ucrania", "china", "multipolaridade",
             "soberania", "diplomacia"] },

  { id: "politica-economia-brasil", frentes: ["atualidades"], nome: "Política e economia do Brasil", area: "Atualidades",
    termos: ["reforma tributaria", "politica fiscal", "inflacao", "taxa selic",
             "banco central", "pib", "desemprego", "congresso nacional", "stf",
             "sistema eleitoral", "federalismo", "orcamento"] },

  // ---------------------------------------------------------------------
  // ARTES
  // ---------------------------------------------------------------------
  { id: "artes-visuais", frentes: ["artes-cultura", "artes"], nome: "Artes visuais", area: "Artes",
    termos: ["pintura", "escultura", "renascimento", "impressionismo", "cubismo",
             "surrealismo", "modernismo", "arte contemporanea", "instalacao", "performance",
             "fotografia", "perspectiva", "bienal", "masp"] },

  { id: "cinema-musica", frentes: ["artes-cultura", "artes"], nome: "Cinema e música", area: "Artes",
    termos: ["cinema", "filme", "cinema novo", "documentario", "trilha sonora",
             "musica popular brasileira", "mpb", "tropicalia", "samba", "bossa nova",
             "funk", "rap", "montagem"] },

  // ---------------------------------------------------------------------
  // INGLÊS
  //
  // Os TERMOS AQUI SÃO EM INGLÊS, e não é detalhe: a questão inteira está em
  // inglês, então sinônimo em português não casa com nada. Medido antes desta
  // seção ser reescrita, a frente de inglês de Medicina alcançava 20% do banco
  // — o pior número do dicionário, com folga — porque os três assuntos que
  // existiam misturavam rótulo em português com termo solto em inglês.
  //
  // A divisão é por HABILIDADE COBRADA, que é como a banca monta o item, mais
  // um punhado de assuntos por tema do texto. O aluno que busca "inferência"
  // acha pelo nome em português; o motor procura pelo comando em inglês.
  // ---------------------------------------------------------------------
  { id: "ingles-ideia-central", frentes: ["ingles"], nome: "Ideia central (inglês)", area: "Linguagens",
    termos: ["main idea", "best title", "main point", "central idea", "mainly about",
             "primarily", "overall", "summarizes", "the passage as a whole"] },

  { id: "ingles-inferencia", frentes: ["ingles"], nome: "Inferência (inglês)", area: "Linguagens",
    termos: ["infer", "inferred", "imply", "implies", "suggests", "most likely",
             "supports", "can be concluded", "it follows that"] },

  { id: "ingles-detalhe", frentes: ["ingles"], nome: "Detalhe explícito (inglês)", area: "Linguagens",
    termos: ["according to", "states that", "mentions", "the text says", "the author says",
             "as described", "is true about"] },

  { id: "ingles-referencia", frentes: ["ingles"], nome: "Referência e coesão (inglês)", area: "Linguagens",
    termos: ["refers to", "refer to", "the word", "the pronoun", "antecedent",
             "in line", "underlined", "the expression"] },

  { id: "ingles-vocabulario", frentes: ["ingles"], nome: "Vocabulário em contexto (inglês)", area: "Linguagens",
    termos: ["synonym", "antonym", "means", "closest in meaning", "in context",
             "phrasal verb", "false cognate", "best replaces", "opposite of"] },

  // Os conectivos comuns ("however", "although", "despite", "therefore") FORAM
  // TIRADOS daqui de propósito, mesmo sendo o assunto. Medido: com eles, este
  // registro casava 186 das 300 questões de inglês — 62% —, porque quase todo
  // texto argumentativo usa um "however" em algum lugar. Aparecer no texto não
  // faz a questão ser SOBRE conectivo, e um filtro que devolve dois terços da
  // frente não filtra nada. Ficaram os marcadores metalinguísticos (o comando
  // que pergunta pelo conector) e os conectivos raros o bastante para que a
  // presença deles já indique foco.
  { id: "ingles-conectivos", frentes: ["ingles"], nome: "Conectivos e relação lógica (inglês)", area: "Linguagens",
    termos: ["connector", "linking word", "linking words", "conjunction",
             "transition word", "cohesive device", "logical relation",
             "nevertheless", "whereas", "in spite of", "furthermore", "hence",
             "nonetheless", "conversely",
             "conectivo", "relacao que a lacuna estabelece", "relacao logica",
             "conector", "oposicao entre", "concessao", "contraste entre"] },

  { id: "ingles-proposito-tom", frentes: ["ingles"], nome: "Propósito e tom (inglês)", area: "Linguagens",
    termos: ["purpose", "tone", "attitude", "point of view", "criticizes", "praises",
             "ironic", "skeptical", "the author intends", "in order to"] },

  // OS TERMOS AQUI SÃO BILÍNGUES, e isso não é redundância.
  //
  // A seção de inglês foi escrita supondo que a questão inteira estivesse em
  // inglês. Metade estava: o TEXTO DE APOIO é em inglês, mas o ENUNCIADO é em
  // português — as bancas cobram inglês "respondido em português" (FUVEST dia
  // 1, Unesp caderno 003, Unifesp). Quando o lote novo entrou seguindo essa
  // convenção, os enunciados passaram a dizer "o pronome relativo", "a
  // preposição exigida", "o discurso indireto" — e os termos em inglês deste
  // dicionário deixaram de casar com eles. A frente tinha 60 questões novas de
  // gramática e a busca achava UMA.
  //
  // Os termos em inglês continuam porque o texto de apoio e as alternativas
  // (que são as próprias formas testadas) seguem em inglês.
  { id: "ingles-gramatica", frentes: ["ingles"], nome: "Gramática (inglês)", area: "Linguagens",
    termos: ["verb tense", "present perfect", "past simple", "conditional", "modal",
             "passive voice", "relative pronoun", "preposition", "reported speech",
             "comparative", "superlative", "gerund", "used to", "would have",
             "pronome relativo", "preposicao exigida", "discurso indireto",
             "voz passiva", "tempo verbal", "question tag", "gerundio",
             "infinitivo", "comparativo", "superlativo", "condicional",
             "verbo modal", "artigo definido", "artigo indefinido"] },

  { id: "ingles-tema-saude", frentes: ["ingles"], nome: "Textos sobre saúde (inglês)", area: "Linguagens",
    termos: ["patients", "patient", "health", "disease", "doctors", "hospital",
             "treatment", "vaccine", "medical", "symptoms", "sleep", "diet"] },

  { id: "ingles-tema-tecnologia", frentes: ["ingles"], nome: "Textos sobre tecnologia (inglês)", area: "Linguagens",
    termos: ["technology", "artificial intelligence", "algorithm", "online", "social media",
             "smartphone", "internet", "digital", "users", "screen", "data"] },

  { id: "ingles-tema-ambiente", frentes: ["ingles"], nome: "Textos sobre meio ambiente (inglês)", area: "Linguagens",
    termos: ["climate", "climate change", "environment", "carbon", "emissions",
             "species", "pollution", "warming", "renewable", "waste"] },

  { id: "ingles-tema-sociedade", frentes: ["ingles"], nome: "Textos sobre trabalho e sociedade (inglês)", area: "Linguagens",
    termos: ["workers", "employment", "inequality", "poverty", "wages", "income",
             "education", "students", "cities", "housing", "migration", "money"] },

  // =====================================================================
  // SEGUNDA LEVA — as frentes que a primeira versão deixou rasas
  //
  // A primeira versão deste arquivo cobria as 23 frentes, mas de forma muito
  // desigual: gramática alcançava 95% do banco e inglês de Medicina, 20%.
  // Média geral, 69%.
  //
  // O que vem abaixo foi escrito a partir de MEDIÇÃO, não de intuição: para
  // cada frente fraca, extraí os termos mais frequentes das questões que o
  // dicionário NÃO alcançava, e montei os assuntos em cima do que estava
  // realmente escrito nelas.
  //
  // Dois tipos de termo frequente foram descartados de propósito:
  //
  //   ruído de FORMATO — "lacunas", "preenchidas", "afirmativas", "correto".
  //   Descrevem como o item é montado, não sobre o que ele é. Quem quer
  //   filtrar por isso já tem o filtro de formato, que é campo próprio.
  //
  //   ruído de EXPLICAÇÃO — "anacrônica", "genérica", "superficial", "confusão".
  //   São o vocabulário com que as explicações descrevem o erro do distrator.
  //   Apareciam no topo da lista de Artes e Cultura e não dizem nada sobre o
  //   assunto da questão.
  // =====================================================================

  // ---------------------------------------------------------------------
  // ATUALIDADES — POLÍTICA E ECONOMIA
  // ---------------------------------------------------------------------
  { id: "administracao-publica", frentes: ["atualidades", "direitos-humanos"], nome: "Administração pública e controle", area: "Atualidades",
    termos: ["administracao publica", "servidor publico", "licitacao", "transparencia",
             "tribunal de contas", "controle externo", "improbidade", "concurso publico",
             "gasto publico", "recursos publicos", "prestacao de contas"] },

  { id: "tres-poderes", frentes: ["atualidades"], nome: "Três poderes e instituições", area: "Atualidades",
    termos: ["poder judiciario", "poder legislativo", "poder executivo", "supremo tribunal",
             "congresso nacional", "senado", "camara dos deputados", "medida provisoria",
             "veto", "checks and balances", "freios e contrapesos"] },

  { id: "federalismo", frentes: ["atualidades", "geografia"], nome: "Federalismo e municípios", area: "Atualidades",
    termos: ["federalismo", "municipios", "estados e municipios", "uniao", "repasse",
             "pacto federativo", "autonomia municipal", "competencia concorrente"] },

  { id: "politicas-sociais", frentes: ["atualidades", "direitos-humanos", "filosofia-sociologia"], nome: "Políticas sociais e renda", area: "Atualidades",
    termos: ["transferencia de renda", "bolsa familia", "programa social", "salario minimo",
             "seguridade social", "previdencia", "assistencia social", "renda basica",
             "distribuicao de renda", "pobreza"] },

  // ---------------------------------------------------------------------
  // ATUALIDADES — TECNOLOGIA
  // ---------------------------------------------------------------------
  { id: "plataformas-digitais", frentes: ["atualidades", "filosofia-sociologia"], nome: "Plataformas digitais e trabalho", area: "Atualidades",
    termos: ["plataforma digital", "aplicativo", "uberizacao", "trabalho por aplicativo",
             "entregador", "motorista de aplicativo", "economia de plataforma",
             "streaming", "assinatura", "marketplace"] },

  { id: "regulacao-digital", frentes: ["atualidades"], nome: "Regulação e moderação de conteúdo", area: "Atualidades",
    termos: ["moderacao de conteudo", "regulacao das plataformas", "marco civil",
             "remocao de conteudo", "liberdade de expressao online", "responsabilidade das plataformas",
             "monopolio", "concorrencia digital"] },

  { id: "inclusao-digital", frentes: ["atualidades", "geografia"], nome: "Inclusão e exclusão digital", area: "Atualidades",
    termos: ["inclusao digital", "exclusao digital", "acesso a internet", "letramento digital",
             "conectividade", "banda larga", "apagao digital"] },

  // ---------------------------------------------------------------------
  // ATUALIDADES — GEOPOLÍTICA E MEIO AMBIENTE
  // ---------------------------------------------------------------------
  { id: "comercio-internacional", frentes: ["atualidades", "geografia"], nome: "Comércio internacional", area: "Atualidades",
    termos: ["comercio internacional", "acordo comercial", "tarifa", "exportacao",
             "importacao", "balanca comercial", "protecionismo", "cadeia global de valor",
             "cadeia produtiva", "guerra comercial", "sancao economica"] },

  { id: "organismos-internacionais", frentes: ["atualidades"], nome: "Organismos internacionais", area: "Atualidades",
    termos: ["organizacao das nacoes unidas", "conselho de seguranca", "fundo monetario",
             "banco mundial", "organizacao mundial do comercio", "unesco",
             "tratado internacional", "diplomacia", "direito internacional"] },

  { id: "migracoes-refugio", frentes: ["atualidades", "direitos-humanos", "geografia"], nome: "Migrações e refúgio", area: "Atualidades",
    termos: ["refugiado", "migracao internacional", "imigrante", "asilo", "xenofobia",
             "fronteira", "deslocamento forcado", "apatrida"] },

  { id: "residuos-poluicao", frentes: ["atualidades", "geografia"], nome: "Resíduos e poluição", area: "Atualidades",
    termos: ["residuo solido", "lixo", "reciclagem", "poluicao", "saneamento basico",
             "esgoto", "aterro sanitario", "economia circular", "plastico",
             "contaminacao", "qualidade do ar"] },

  { id: "conservacao", frentes: ["atualidades", "geografia", "biologia"], nome: "Conservação e áreas protegidas", area: "Atualidades",
    termos: ["unidade de conservacao", "area protegida", "reserva", "parque nacional",
             "terra indigena", "extincao", "especie ameacada", "restauracao ecologica",
             "servico ecossistemico"] },

  // ---------------------------------------------------------------------
  // HISTÓRIA — o que a primeira leva não cobria
  // ---------------------------------------------------------------------
  { id: "imperialismo", frentes: ["historia"], nome: "Imperialismo e partilha", area: "Humanas",
    termos: ["imperialismo", "neocolonialismo", "partilha da africa", "colonizacao da asia",
             "conferencia de berlim", "darwinismo social", "missao civilizadora",
             "resistencia colonial"] },

  { id: "america-latina", frentes: ["historia"], nome: "América Latina", area: "Humanas",
    termos: ["america latina", "independencia da america", "caudilhismo",
             "ditadura militar no chile", "revolucao mexicana", "peronismo",
             "operacao condor", "bolivar", "populismo latino-americano"] },

  { id: "mundo-contemporaneo", frentes: ["historia", "atualidades"], nome: "Mundo pós-1991", area: "Humanas",
    termos: ["fim da guerra fria", "nova ordem mundial", "terrorismo", "onze de setembro",
             "primavera arabe", "uniao europeia", "globalizacao economica",
             "ascensao da china", "multipolar"] },

  { id: "movimentos-sociais-sec-xx", frentes: ["historia", "filosofia-sociologia"], nome: "Movimentos sociais do século XX", area: "Humanas",
    termos: ["direitos civis", "movimento negro", "sufragio feminino", "maio de 68",
             "sindicalismo", "greve", "contracultura", "movimento estudantil",
             "luta pela terra"] },

  { id: "historia-da-saude", frentes: ["historia", "biologia", "atualidades"], nome: "História da saúde e da medicina", area: "Humanas",
    termos: ["revolta da vacina", "saude publica", "sanitarismo", "saneamento",
             "epidemia", "peste", "gripe espanhola", "oswaldo cruz", "sus",
             "reforma sanitaria", "vigilancia sanitaria"] },

  // ---------------------------------------------------------------------
  // GEOGRAFIA — o que faltava
  // ---------------------------------------------------------------------
  { id: "industria-servicos", frentes: ["geografia"], nome: "Indústria e serviços", area: "Humanas",
    termos: ["industrializacao", "industria", "setor de servicos", "desindustrializacao",
             "polo industrial", "zona franca", "emprego formal", "informalidade",
             "infraestrutura", "logistica", "transporte"] },

  { id: "regioes-do-brasil", frentes: ["geografia"], nome: "Regiões do Brasil", area: "Humanas",
    termos: ["regiao norte", "regiao nordeste", "regiao sudeste", "regiao sul",
             "centro-oeste", "sertao", "semiarido", "desigualdade regional",
             "ibge", "regionalizacao"] },

  { id: "cartografia", frentes: ["geografia"], nome: "Cartografia", area: "Humanas",
    termos: ["cartografia", "escala cartografica", "projecao cartografica", "curva de nivel",
             "coordenada geografica", "latitude", "longitude", "fuso horario",
             "sensoriamento remoto", "mapa tematico"] },

  { id: "geografia-da-saude", frentes: ["geografia", "atualidades", "biologia"], nome: "Geografia da saúde", area: "Humanas",
    termos: ["acesso a saude", "cobertura vacinal", "endemia", "arbovirose",
             "dengue", "leishmaniose", "determinante social da saude",
             "mortalidade infantil", "expectativa de vida"] },

  // ---------------------------------------------------------------------
  // FILOSOFIA E SOCIOLOGIA — o que faltava
  // ---------------------------------------------------------------------
  { id: "teoria-do-conhecimento", frentes: ["filosofia-sociologia"], nome: "Teoria do conhecimento", area: "Humanas",
    termos: ["epistemologia", "teoria do conhecimento", "empirismo", "racionalismo",
             "ceticismo", "metodo cientifico", "verdade", "descartes", "hume",
             "popper", "kuhn", "paradigma"] },

  { id: "filosofia-politica-contemporanea", frentes: ["filosofia-sociologia", "direitos-humanos"], nome: "Filosofia política contemporânea", area: "Humanas",
    termos: ["justica social", "rawls", "foucault", "biopoder", "hannah arendt",
             "totalitarismo", "banalidade do mal", "esfera publica", "habermas",
             "democracia deliberativa", "cidadania"] },

  { id: "sociologia-do-trabalho", frentes: ["filosofia-sociologia", "atualidades"], nome: "Sociologia do trabalho", area: "Humanas",
    termos: ["divisao do trabalho", "taylorismo", "fordismo", "toyotismo",
             "precarizacao", "terceirizacao", "desemprego estrutural",
             "reestruturacao produtiva", "mais-valia"] },

  { id: "sociologia-urbana", frentes: ["filosofia-sociologia", "geografia"], nome: "Sociologia urbana e violência", area: "Humanas",
    termos: ["violencia urbana", "seguranca publica", "encarceramento", "sistema prisional",
             "segregacao socioespacial", "periferia", "policia", "criminalidade"] },

  { id: "sociologia-da-saude", frentes: ["filosofia-sociologia", "atualidades", "biologia"], nome: "Saúde, sociedade e bioética", area: "Humanas",
    termos: ["bioetica", "consentimento informado", "autonomia do paciente",
             "medicalizacao", "saude mental", "cuidado paliativo", "eutanasia",
             "acesso a medicamento", "equidade em saude", "relacao medico-paciente"] },

  // ---------------------------------------------------------------------
  // ARTES E CULTURA — o que faltava
  // ---------------------------------------------------------------------
  { id: "leitura-de-imagem", frentes: ["artes-cultura", "artes"], nome: "Leitura de imagem", area: "Artes",
    termos: ["composicao", "enquadramento", "plano de fundo", "ponto de fuga",
             "luz e sombra", "claro-escuro", "paleta", "cor complementar",
             "simetria", "regra dos tercos", "primeiro plano", "profundidade"] },

  { id: "arte-e-espaco", frentes: ["artes-cultura", "artes"], nome: "Museu, curadoria e público", area: "Artes",
    termos: ["museu", "galeria", "curadoria", "exposicao", "acervo", "bienal",
             "espaco expositivo", "instalacao", "site-specific", "patrimonio"] },

  { id: "corpo-e-performance", frentes: ["artes-cultura", "artes"], nome: "Corpo, gesto e performance", area: "Artes",
    termos: ["performance", "corpo", "gesto", "danca", "teatro", "happening",
             "arte de acao", "presenca", "publico participante"] },

  { id: "arquitetura", frentes: ["artes-cultura", "artes", "geografia"], nome: "Arquitetura e cidade", area: "Artes",
    termos: ["arquitetura", "modernismo arquitetonico", "niemeyer", "brasilia",
             "arco", "ogiva", "gotico", "barroco mineiro", "urbanismo",
             "tombamento", "patrimonio historico"] },

  { id: "arte-e-sociedade", frentes: ["artes-cultura", "artes", "filosofia-sociologia"], nome: "Arte, autoria e mercado", area: "Artes",
    termos: ["autoria", "originalidade", "reproducao", "apropriacao", "mercado de arte",
             "arte contemporanea", "arte engajada", "censura", "politica cultural",
             "lei de incentivo"] },

  // ---------------------------------------------------------------------
  // INTERPRETAÇÃO DE TEXTO — o que faltava
  // ---------------------------------------------------------------------
  { id: "causa-consequencia", frentes: ["interpretacao-texto"], nome: "Causa e consequência", area: "Linguagens",
    termos: ["causa", "consequencia", "efeito", "por causa de", "resulta em",
             "provoca", "decorre", "razao pela qual", "relacao causal"] },

  { id: "narrativa-e-cena", frentes: ["interpretacao-texto"], nome: "Texto narrativo e construção de cena", area: "Linguagens",
    termos: ["narrador", "personagem", "cena", "dialogo", "memoria",
             "flashback", "conflito", "desfecho", "ambiente", "atmosfera"] },

  { id: "dados-no-texto", frentes: ["interpretacao-texto", "geografia"], nome: "Dados e gráficos no texto", area: "Linguagens",
    termos: ["grafico", "tabela", "percentual", "pesquisa mostra", "levantamento",
             "estatistica", "amostra", "indice", "taxa", "crescimento de"] },

  { id: "vozes-no-texto", frentes: ["interpretacao-texto"], nome: "Vozes e citação no texto", area: "Linguagens",
    termos: ["discurso direto", "discurso indireto", "citacao", "aspas",
             "fonte", "especialista", "declaracao", "entrevistado", "porta-voz"] },

  // ---------------------------------------------------------------------
  // MATEMÁTICA — os problemas que não nomeiam o conteúdo
  // ---------------------------------------------------------------------
  { id: "aritmetica-problemas", frentes: ["matematica"], nome: "Aritmética e problemas", area: "Matemática",
    termos: ["quantos", "quantas", "quanto custa", "valor total", "quantia",
             "sobra", "resto", "divisao", "multiplicacao", "soma", "subtracao",
             "unidades", "reais", "troco"] },

  { id: "medidas-unidades", frentes: ["matematica", "fisica"], nome: "Medidas e conversão de unidades", area: "Matemática",
    termos: ["conversao de unidade", "metro", "quilometro", "centimetro", "litro",
             "quilograma", "grama", "hora", "minuto", "velocidade media",
             "densidade", "vazao"] },

  { id: "matematica-financeira", frentes: ["matematica"], nome: "Matemática financeira aplicada", area: "Matemática",
    termos: ["parcela", "prestacao", "financiamento", "emprestimo", "mensal",
             "tarifa", "plano de assinatura", "custo fixo", "custo variavel",
             "lucro", "prejuizo", "margem"] },

  // =====================================================================
  // TERCEIRA LEVA — os temas do currículo que não tinham assunto nenhum
  //
  // As duas primeiras levas foram escritas a partir do que ESTAVA no banco:
  // eu media o que as questões diziam e criava o assunto em cima. Isso tem um
  // ponto cego — um tema que o banco não cobre não aparece na medição, e por
  // isso nunca ganha assunto. Botânica, zoologia, gravitação, hidrostática,
  // determinantes e sistemas lineares caíram exatamente nesse buraco.
  //
  // Estes vêm do caminho inverso: da LISTA DE CONTEÚDO do vestibular, não do
  // banco. Vários nascem com pouca questão, e é de propósito — eles são o
  // alvo do lote de questões novas que entra junto. Um assunto declarado é o
  // que torna a lacuna visível; sem ele, "não tem questão de determinante"
  // é invisível tanto para o aluno quanto para quem mantém o banco.
  // =====================================================================

  // ---------- Biologia ----------
  { id: "botanica", frentes: ["biologia"], nome: "Botânica", area: "Ciências da Natureza",
    termos: ["botanica", "xilema", "floema", "estomato", "angiosperma", "gimnosperma",
             "briofita", "pteridofita", "polinizacao", "germinacao", "auxina",
             "fitormonio", "tropismo", "transpiracao vegetal", "seiva"] },

  { id: "zoologia", frentes: ["biologia"], nome: "Zoologia", area: "Ciências da Natureza",
    termos: ["zoologia", "artropode", "molusco", "anelideo", "cordado", "vertebrado",
             "invertebrado", "anfibio", "reptil", "cnidario", "platelminto",
             "nematoda", "equinodermo", "metamorfose", "exoesqueleto"] },

  { id: "biotecnologia", frentes: ["biologia"], nome: "Biotecnologia", area: "Ciências da Natureza",
    termos: ["biotecnologia", "transgenico", "dna recombinante", "clonagem", "crispr",
             "engenharia genetica", "organismo geneticamente modificado", "pcr",
             "plasmideo", "enzima de restricao", "terapia genica", "celula-tronco",
             "sequenciamento"] },

  { id: "bioquimica", frentes: ["biologia", "quimica"], nome: "Bioquímica", area: "Ciências da Natureza",
    termos: ["bioquimica", "proteina", "aminoacido", "enzima", "substrato",
             "desnaturacao", "sitio ativo", "lipidio", "carboidrato", "glicose",
             "peptidica", "metabolismo", "vitamina"] },

  // ---------- Química ----------
  { id: "funcoes-inorganicas", frentes: ["quimica"], nome: "Funções inorgânicas", area: "Ciências da Natureza",
    termos: ["funcao inorganica", "oxido", "hidreto", "hidroxido", "nomenclatura inorganica",
             "sal inorganico", "anidrido", "peroxido", "acido oxigenado"] },

  // ---------- Física ----------
  { id: "gravitacao", frentes: ["fisica"], nome: "Gravitação", area: "Ciências da Natureza",
    termos: ["gravitacao", "lei da gravitacao", "kepler", "orbita", "satelite",
             "campo gravitacional", "velocidade orbital", "periodo orbital",
             "afelio", "perielio", "constante gravitacional"] },

  { id: "hidrostatica", frentes: ["fisica"], nome: "Hidrostática", area: "Ciências da Natureza",
    termos: ["hidrostatica", "empuxo", "arquimedes", "pressao hidrostatica",
             "principio de pascal", "vasos comunicantes", "prensa hidraulica",
             "flutuacao", "pressao atmosferica", "densidade do fluido"] },

  { id: "gases", frentes: ["fisica", "quimica"], nome: "Estudo dos gases", area: "Ciências da Natureza",
    termos: ["gas ideal", "gas perfeito", "clapeyron", "isotermica", "isobarica",
             "isovolumetrica", "isocorica", "transformacao gasosa", "lei geral dos gases",
             "boyle", "charles", "teoria cinetica dos gases", "volume molar"] },

  { id: "eletrostatica", frentes: ["fisica"], nome: "Eletrostática", area: "Ciências da Natureza",
    termos: ["eletrostatica", "carga eletrica", "lei de coulomb", "campo eletrico",
             "potencial eletrico", "eletrizacao", "atrito", "inducao eletrostatica",
             "linhas de campo", "blindagem", "capacitor", "diferenca de potencial"] },

  // ---------- Matemática ----------
  { id: "matrizes", frentes: ["matematica"], nome: "Matrizes", area: "Matemática",
    termos: ["matriz", "matriz identidade", "matriz transposta", "matriz inversa",
             "produto de matrizes", "ordem da matriz", "lei de formacao",
             "matriz quadrada", "matriz nula", "elemento aij"] },

  { id: "determinantes", frentes: ["matematica"], nome: "Determinantes", area: "Matemática",
    termos: ["determinante", "regra de sarrus", "laplace", "cofator",
             "menor complementar", "propriedades do determinante", "matriz singular"] },

  { id: "sistemas-lineares", frentes: ["matematica"], nome: "Sistemas lineares", area: "Matemática",
    termos: ["sistema linear", "escalonamento", "sistema possivel", "sistema impossivel",
             "determinado", "indeterminado", "regra de cramer", "matriz dos coeficientes",
             "discussao do sistema"] },

  { id: "geometria-analitica", frentes: ["matematica"], nome: "Geometria analítica", area: "Matemática",
    termos: ["geometria analitica", "plano cartesiano", "distancia entre pontos",
             "ponto medio", "equacao da reta", "coeficiente angular", "retas paralelas",
             "retas perpendiculares", "equacao da circunferencia", "baricentro",
             "alinhamento de pontos", "distancia de ponto a reta"] },

  // ---------- Português ----------
  { id: "sintaxe", frentes: ["gramatica"], nome: "Sintaxe do período", area: "Linguagens",
    termos: ["sintaxe", "sujeito", "predicado", "predicativo", "adjunto adnominal",
             "adjunto adverbial", "complemento nominal", "agente da passiva",
             "termo essencial", "analise sintatica", "periodo simples", "periodo composto"] },

  { id: "semantica", frentes: ["gramatica", "interpretacao-texto"], nome: "Semântica", area: "Linguagens",
    termos: ["semantica", "sinonimo", "antonimo", "polissemia", "ambiguidade",
             "conotacao", "denotacao", "sentido figurado", "sentido literal",
             "homonimo", "paronimo", "campo semantico"] },
];

// ---------------------------------------------------------------------------
// AS CINCO FRENTES DE MATEMÁTICA DA TRILHA DE ECONOMIA
//
// Toda entrada de Matemática acima aponta para "matematica-rlm" (Direito) e
// "matematica" (Medicina). Economia parte a MESMA Matemática em cinco frentes,
// porque o alocador do simulado é proporcional por frente e uma frente só dava 5
// questões de 60 a uma matéria que vale 40% da nota nas duas bancas (o porquê
// completo está em vestibular-economia/classificar-matematica.js).
//
// Sem o que vem abaixo, os assuntos de Matemática ficam sem lastro justamente
// quando Economia é a trilha ativa: ela absorve as questões primeiro na busca,
// então elas entram no índice sob os ids daqui, e o `escopo` do dicionário não
// casa com nenhum. Medido com `node auditar-busca.js --trilha economia` antes
// desta linha existir: os 17 assuntos de Matemática caíam de 26–244 questões
// para 0–20, nove deles a zero.
//
// POR QUE CADA ASSUNTO GANHA AS CINCO, E NÃO A FRENTE CORRESPONDENTE
//
// "Geometria plana" recebe as cinco, não só matematica-geometria. Duas razões, e
// a segunda é a que decide:
//
//   1. É o que já acontece nas outras duas trilhas, onde as questões de
//      Matemática moram numa frente única — o escopo por frente nunca separou
//      geometria de probabilidade, e este arquivo não passa a prometer que sim.
//   2. A divisão em cinco é HEURÍSTICA, por pontuação de termos, e o cabeçalho
//      do classificador diz que ela erra. Amarrar "Geometria plana" a
//      matematica-geometria faria a busca ESCONDER a questão de geometria que a
//      heurística mandou para álgebra. Filtro estreito apoiado em classificação
//      incerta perde questão boa; largo, no máximo devolve uma vizinha — e o
//      filtro de `termos`, que é o que segura o falso positivo, continua valendo
//      inteiro.
//
// Feito aqui e não escrito nas entradas uma a uma para não manter duas listas:
// assunto novo de Matemática, escrito com os dois ids de sempre, já nasce
// cobrindo Economia. É a mesma razão pela qual um registro só serve às três
// trilhas (ver o cabeçalho).
(function () {
  const MATEMATICA_ECONOMIA = [
    "matematica-sequencias", "matematica-probabilidade", "matematica-algebra",
    "matematica-geometria", "matematica-financeira",
  ];

  window.ASSUNTOS.forEach(function (a) {
    const eMatematica = a.frentes.indexOf("matematica-rlm") !== -1 ||
                        a.frentes.indexOf("matematica") !== -1;
    if (!eMatematica) return;
    a.frentes = a.frentes.concat(
      MATEMATICA_ECONOMIA.filter(function (f) { return a.frentes.indexOf(f) === -1; })
    );
  });
})();
