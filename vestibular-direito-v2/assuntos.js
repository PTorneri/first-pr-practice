// Dicionário de assuntos da busca — as duas trilhas.
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
// Aceita id de frente das DUAS trilhas de propósito — "matematica-rlm" (Direito)
// e "matematica" (Medicina) são a mesma coisa para quem estuda, e um registro só
// evita manter duas listas que iam divergir com o tempo.
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

  { id: "classes-de-palavras", frentes: ["gramatica"], nome: "Classes de palavras", area: "Linguagens",
    termos: ["classe de palavra", "substantivo", "adjetivo", "adverbio", "preposicao",
             "conjuncao", "interjeicao", "numeral", "artigo", "morfologia"] },

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

  { id: "teoria-literaria", frentes: ["literatura"], nome: "Teoria literária e narrativa", area: "Linguagens",
    termos: ["narrador", "foco narrativo", "narrador onisciente", "primeira pessoa",
             "terceira pessoa", "personagem", "enredo", "clímax", "desfecho", "narrativa",
             "discurso indireto livre", "tempo psicológico", "conto", "novela"] },

  // ---------------------------------------------------------------------
  // MATEMÁTICA
  //
  // O caso extremo oposto ao da Gramática: o nome escolar do assunto quase
  // nunca aparece no enunciado. "Função quadrática" dava ZERO — o enunciado
  // diz parábola, vértice, delta.
  // ---------------------------------------------------------------------
  { id: "funcao-quadratica", frentes: ["matematica-rlm", "matematica"], nome: "Função quadrática", area: "Matemática",
    termos: ["funcao quadratica", "funcao do segundo grau", "segundo grau", "parabola",
             "vertice", "bhaskara", "discriminante", "concavidade", "raizes da funcao"] },

  { id: "funcao-afim", frentes: ["matematica-rlm", "matematica"], nome: "Função afim", area: "Matemática",
    termos: ["funcao afim", "funcao do primeiro grau", "primeiro grau", "coeficiente angular",
             "coeficiente linear", "reta", "taxa de variacao", "funcao linear"] },

  { id: "funcao-exponencial-logaritmo", frentes: ["matematica-rlm", "matematica"], nome: "Exponencial e logaritmo", area: "Matemática",
    termos: ["logaritmo", "exponencial", "funcao exponencial", "crescimento exponencial",
             "decaimento", "meia-vida", "base do logaritmo", "log"] },

  { id: "progressoes", frentes: ["matematica-rlm", "matematica"], nome: "Progressões (PA e PG)", area: "Matemática",
    termos: ["progressao aritmetica", "progressao geometrica", "razao da progressao",
             "termo geral", "soma dos termos", "sequencia numerica"] },

  { id: "porcentagem-juros", frentes: ["matematica-rlm", "matematica"], nome: "Porcentagem e juros", area: "Matemática",
    termos: ["porcentagem", "percentual", "juros", "juros simples", "juros compostos",
             "desconto", "acrescimo", "taxa de juros", "montante", "capital", "inflacao"] },

  { id: "probabilidade", frentes: ["matematica-rlm", "matematica"], nome: "Probabilidade", area: "Matemática",
    termos: ["probabilidade", "espaco amostral", "evento", "chance", "probabilidade condicional",
             "independentes", "mutuamente exclusivos"] },

  { id: "analise-combinatoria", frentes: ["matematica-rlm", "matematica"], nome: "Análise combinatória", area: "Matemática",
    termos: ["analise combinatoria", "combinacao", "arranjo", "permutacao", "fatorial",
             "principio multiplicativo", "quantas maneiras", "anagrama"] },

  { id: "estatistica", frentes: ["matematica-rlm", "matematica"], nome: "Estatística", area: "Matemática",
    termos: ["media aritmetica", "mediana", "moda", "desvio padrao", "variancia",
             "media ponderada", "amostra", "frequencia relativa", "histograma", "quartil"] },

  { id: "geometria-plana", frentes: ["matematica-rlm", "matematica"], nome: "Geometria plana", area: "Matemática",
    termos: ["geometria plana", "area do triangulo", "perimetro", "circunferencia",
             "poligono", "trapezio", "losango", "teorema de pitagoras", "semelhanca de triangulos",
             "apotema", "setor circular"] },

  { id: "geometria-espacial", frentes: ["matematica-rlm", "matematica"], nome: "Geometria espacial", area: "Matemática",
    termos: ["geometria espacial", "volume", "prisma", "cilindro", "cone", "esfera",
             "piramide", "area total", "area lateral", "poliedro", "tronco"] },

  { id: "trigonometria", frentes: ["matematica-rlm", "matematica"], nome: "Trigonometria", area: "Matemática",
    termos: ["trigonometria", "seno", "cosseno", "tangente", "lei dos senos", "lei dos cossenos",
             "radiano", "circulo trigonometrico", "arco"] },

  { id: "razao-proporcao", frentes: ["matematica-rlm", "matematica"], nome: "Razão, proporção e regra de três", area: "Matemática",
    termos: ["razao", "proporcao", "regra de tres", "grandezas proporcionais",
             "diretamente proporcional", "inversamente proporcional", "escala"] },

  { id: "sistemas-equacoes", frentes: ["matematica-rlm", "matematica"], nome: "Equações e sistemas", area: "Matemática",
    termos: ["sistema de equacoes", "equacao", "incognita", "inequacao", "matriz",
             "determinante", "substituicao"] },

  { id: "leitura-de-graficos", frentes: ["matematica-rlm", "matematica"], nome: "Leitura de gráficos e tabelas", area: "Matemática",
    termos: ["grafico", "tabela", "eixo", "curva", "grafico de barras", "grafico de setores",
             "interpretacao grafica", "dispersao"] },

  { id: "raciocinio-logico", frentes: ["matematica-rlm"], nome: "Raciocínio lógico", area: "Matemática",
    termos: ["raciocinio logico", "proposicao", "negacao", "conectivo", "tabela verdade",
             "silogismo", "implicacao", "condicional", "quantificador", "argumento valido"] },

  // ---------------------------------------------------------------------
  // BIOLOGIA
  // ---------------------------------------------------------------------
  { id: "citologia", frentes: ["biologia", "ciencias-natureza"], nome: "Citologia", area: "Ciências da Natureza",
    termos: ["celula", "membrana plasmatica", "citoplasma", "nucleo", "organela",
             "mitocondria", "ribossomo", "lisossomo", "complexo golgiense", "reticulo endoplasmatico",
             "osmose", "difusao", "transporte ativo", "cloroplasto"] },

  { id: "genetica", frentes: ["biologia", "ciencias-natureza"], nome: "Genética", area: "Ciências da Natureza",
    termos: ["genetica", "heredograma", "alelo", "genotipo", "fenotipo", "dominante",
             "recessivo", "mendel", "cruzamento", "heterozigoto", "homozigoto",
             "linkage", "codominancia", "grupo sanguineo", "daltonismo", "hemofilia"] },

  { id: "dna-sintese-proteica", frentes: ["biologia", "ciencias-natureza"], nome: "DNA e síntese proteica", area: "Ciências da Natureza",
    termos: ["dna", "rna", "acido nucleico", "transcricao", "traducao", "codon",
             "replicacao", "gene", "cromossomo", "mutacao", "nucleotideo", "sintese proteica"] },

  { id: "ecologia", frentes: ["biologia", "ciencias-natureza"], nome: "Ecologia", area: "Ciências da Natureza",
    termos: ["ecologia", "ecossistema", "cadeia alimentar", "teia alimentar", "nivel trofico",
             "produtor", "consumidor", "decompositor", "biomassa", "sucessao ecologica",
             "populacao", "comunidade", "bioma", "ciclo do carbono", "ciclo do nitrogenio",
             "eutrofizacao", "predatismo", "competicao", "simbiose"] },

  { id: "fisiologia-humana", frentes: ["biologia", "ciencias-natureza"], nome: "Fisiologia humana", area: "Ciências da Natureza",
    termos: ["sistema digestorio", "sistema circulatorio", "sistema respiratorio",
             "sistema nervoso", "sistema excretor", "hormonio", "insulina", "neuronio",
             "hemoglobina", "rim", "nefron", "homeostase", "pressao arterial"] },

  { id: "evolucao", frentes: ["biologia", "ciencias-natureza"], nome: "Evolução", area: "Ciências da Natureza",
    termos: ["evolucao", "selecao natural", "darwin", "lamarck", "especiacao",
             "deriva genetica", "adaptacao", "ancestral comum", "fossil", "convergencia adaptativa"] },

  { id: "fotossintese-respiracao", frentes: ["biologia", "ciencias-natureza"], nome: "Fotossíntese e respiração celular", area: "Ciências da Natureza",
    termos: ["fotossintese", "respiracao celular", "clorofila", "atp", "glicolise",
             "ciclo de krebs", "cadeia respiratoria", "fermentacao", "gas carbonico"] },

  { id: "microbiologia-imunologia", frentes: ["biologia", "ciencias-natureza"], nome: "Microbiologia e imunologia", area: "Ciências da Natureza",
    termos: ["virus", "bacteria", "fungo", "protozoario", "vacina", "anticorpo", "antigeno",
             "imunidade", "antibiotico", "epidemia", "parasita", "verminose", "soro"] },

  // ---------------------------------------------------------------------
  // QUÍMICA
  // ---------------------------------------------------------------------
  { id: "estequiometria", frentes: ["quimica", "ciencias-natureza"], nome: "Estequiometria", area: "Ciências da Natureza",
    termos: ["estequiometria", "mol", "massa molar", "reagente limitante", "balanceamento",
             "rendimento", "numero de avogadro", "proporcao estequiometrica"] },

  { id: "tabela-periodica", frentes: ["quimica", "ciencias-natureza"], nome: "Tabela periódica", area: "Ciências da Natureza",
    termos: ["tabela periodica", "periodicidade", "eletronegatividade", "raio atomico",
             "energia de ionizacao", "metal alcalino", "halogenio", "gas nobre",
             "familia", "periodo", "numero atomico"] },

  { id: "ligacoes-quimicas", frentes: ["quimica", "ciencias-natureza"], nome: "Ligações químicas", area: "Ciências da Natureza",
    termos: ["ligacao ionica", "ligacao covalente", "ligacao metalica", "ligacao quimica",
             "polaridade", "geometria molecular", "ponte de hidrogenio", "forca intermolecular",
             "dipolo"] },

  { id: "solucoes", frentes: ["quimica", "ciencias-natureza"], nome: "Soluções e concentração", area: "Ciências da Natureza",
    termos: ["solucao", "concentracao", "molaridade", "soluto", "solvente", "diluicao",
             "solubilidade", "titulacao", "ppm"] },

  { id: "acidos-bases-ph", frentes: ["quimica", "ciencias-natureza"], nome: "Ácidos, bases e pH", area: "Ciências da Natureza",
    termos: ["acido", "base", "ph", "poh", "neutralizacao", "indicador", "tampao",
             "hidrolise", "sal", "arrhenius", "bronsted"] },

  { id: "termoquimica", frentes: ["quimica", "ciencias-natureza"], nome: "Termoquímica", area: "Ciências da Natureza",
    termos: ["termoquimica", "entalpia", "exotermica", "endotermica", "calor de reacao",
             "lei de hess", "energia de ligacao", "combustao"] },

  { id: "cinetica-equilibrio", frentes: ["quimica", "ciencias-natureza"], nome: "Cinética e equilíbrio químico", area: "Ciências da Natureza",
    termos: ["cinetica", "velocidade da reacao", "catalisador", "energia de ativacao",
             "equilibrio quimico", "le chatelier", "constante de equilibrio", "deslocamento do equilibrio"] },

  { id: "quimica-organica", frentes: ["quimica", "ciencias-natureza"], nome: "Química orgânica", area: "Ciências da Natureza",
    termos: ["quimica organica", "hidrocarboneto", "alcano", "alceno", "alcool", "aldeido",
             "cetona", "acido carboxilico", "ester", "amina", "funcao organica", "isomeria",
             "cadeia carbonica", "polimero", "nomenclatura"] },

  { id: "eletroquimica", frentes: ["quimica", "ciencias-natureza"], nome: "Eletroquímica", area: "Ciências da Natureza",
    termos: ["eletroquimica", "pilha", "eletrolise", "oxidacao", "reducao", "oxirreducao",
             "anodo", "catodo", "potencial padrao", "corrosao", "nox"] },

  // ---------------------------------------------------------------------
  // FÍSICA
  // ---------------------------------------------------------------------
  { id: "cinematica", frentes: ["fisica", "ciencias-natureza"], nome: "Cinemática", area: "Ciências da Natureza",
    termos: ["cinematica", "velocidade media", "aceleracao", "movimento uniforme",
             "movimento uniformemente variado", "lancamento", "queda livre", "deslocamento",
             "trajetoria", "grafico de velocidade"] },

  { id: "leis-de-newton", frentes: ["fisica", "ciencias-natureza"], nome: "Leis de Newton e dinâmica", area: "Ciências da Natureza",
    termos: ["leis de newton", "forca resultante", "inercia", "acao e reacao", "atrito",
             "normal", "tracao", "plano inclinado", "dinamica", "peso"] },

  { id: "energia-trabalho", frentes: ["fisica", "ciencias-natureza"], nome: "Trabalho, energia e potência", area: "Ciências da Natureza",
    termos: ["trabalho", "energia cinetica", "energia potencial", "conservacao de energia",
             "potencia", "rendimento", "energia mecanica", "joule"] },

  { id: "eletricidade", frentes: ["fisica", "ciencias-natureza"], nome: "Eletricidade e circuitos", area: "Ciências da Natureza",
    termos: ["corrente eletrica", "tensao", "resistencia", "lei de ohm", "circuito",
             "resistor", "potencia eletrica", "capacitor", "curto-circuito", "serie e paralelo",
             "campo eletrico", "carga eletrica"] },

  { id: "termologia", frentes: ["fisica", "ciencias-natureza"], nome: "Termologia e termodinâmica", area: "Ciências da Natureza",
    termos: ["termologia", "termodinamica", "calor especifico", "calor latente",
             "dilatacao", "mudanca de estado", "temperatura", "maquina termica",
             "gas ideal", "entropia", "conducao", "conveccao", "irradiacao"] },

  { id: "ondas-som", frentes: ["fisica", "ciencias-natureza"], nome: "Ondas e som", area: "Ciências da Natureza",
    termos: ["onda", "frequencia", "comprimento de onda", "amplitude", "som",
             "efeito doppler", "ressonancia", "interferencia", "difracao", "periodo",
             "ondulatoria", "eco"] },

  { id: "optica", frentes: ["fisica", "ciencias-natureza"], nome: "Óptica", area: "Ciências da Natureza",
    termos: ["optica", "refracao", "reflexao", "lente", "espelho", "indice de refracao",
             "imagem virtual", "imagem real", "miopia", "hipermetropia", "prisma",
             "angulo de incidencia"] },

  { id: "eletromagnetismo", frentes: ["fisica", "ciencias-natureza"], nome: "Eletromagnetismo", area: "Ciências da Natureza",
    termos: ["campo magnetico", "eletromagnetismo", "ima", "inducao", "faraday", "lenz",
             "forca magnetica", "transformador", "fluxo magnetico"] },

  // ---------------------------------------------------------------------
  // HISTÓRIA
  // ---------------------------------------------------------------------
  { id: "brasil-colonia", frentes: ["historia-brasil", "historia"], nome: "Brasil Colônia", area: "Humanas",
    termos: ["brasil colonia", "colonial", "capitania hereditaria", "engenho", "escravidao",
             "bandeirante", "quilombo", "palmares", "pacto colonial", "mineracao",
             "inconfidencia", "jesuita"] },

  { id: "brasil-imperio", frentes: ["historia-brasil", "historia"], nome: "Brasil Império", area: "Humanas",
    termos: ["independencia", "primeiro reinado", "segundo reinado", "regencia",
             "dom pedro", "lei aurea", "abolicao", "guerra do paraguai", "cafe",
             "constituicao de 1824", "proclamacao da republica"] },

  { id: "republica-velha-vargas", frentes: ["historia-brasil", "historia"], nome: "República Velha e Era Vargas", area: "Humanas",
    termos: ["republica velha", "coronelismo", "cafe com leite", "tenentismo",
             "revolucao de 1930", "getulio vargas", "estado novo", "clt", "populismo",
             "canudos", "contestado"] },

  { id: "ditadura-redemocratizacao", frentes: ["historia-brasil", "historia"], nome: "Ditadura militar e redemocratização", area: "Humanas",
    termos: ["ditadura militar", "golpe de 1964", "ai-5", "milagre economico",
             "anistia", "diretas ja", "redemocratizacao", "constituicao de 1988",
             "abertura politica", "censura"] },

  { id: "revolucoes-burguesas", frentes: ["historia-geral", "historia"], nome: "Revoluções burguesas e Iluminismo", area: "Humanas",
    termos: ["revolucao francesa", "iluminismo", "revolucao industrial", "revolucao inglesa",
             "independencia dos estados unidos", "liberalismo", "burguesia", "antigo regime",
             "absolutismo", "declaracao dos direitos"] },

  { id: "guerras-mundiais", frentes: ["historia-geral", "historia"], nome: "Guerras Mundiais", area: "Humanas",
    termos: ["primeira guerra", "segunda guerra", "nazismo", "fascismo", "holocausto",
             "hitler", "tratado de versalhes", "totalitarismo", "pearl harbor",
             "bomba atomica", "revolucao russa", "crise de 1929"] },

  { id: "guerra-fria", frentes: ["historia-geral", "historia"], nome: "Guerra Fria e descolonização", area: "Humanas",
    termos: ["guerra fria", "otan", "pacto de varsovia", "muro de berlim", "corrida armamentista",
             "descolonizacao", "socialismo", "capitalismo", "queda da uniao sovietica",
             "revolucao cubana", "apartheid"] },

  { id: "idade-media-antiguidade", frentes: ["historia-geral", "historia"], nome: "Antiguidade e Idade Média", area: "Humanas",
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

  { id: "globalizacao", frentes: ["geografia", "atualidades-geopolitica"], nome: "Globalização e blocos econômicos", area: "Humanas",
    termos: ["globalizacao", "bloco economico", "mercosul", "uniao europeia", "brics",
             "omc", "fmi", "multinacional", "divisao internacional do trabalho",
             "cadeia produtiva global", "neoliberalismo"] },

  { id: "agropecuaria", frentes: ["geografia"], nome: "Agropecuária e agronegócio", area: "Humanas",
    termos: ["agronegocio", "agropecuaria", "agricultura familiar", "reforma agraria",
             "monocultura", "commodities", "fronteira agricola", "revolucao verde",
             "estrutura fundiaria", "latifundio"] },

  { id: "energia-recursos", frentes: ["geografia", "atualidades-meioambiente"], nome: "Energia e recursos naturais", area: "Humanas",
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

  { id: "meio-ambiente-clima", frentes: ["atualidades-meioambiente", "atualidades", "geografia"], nome: "Mudanças climáticas", area: "Atualidades",
    termos: ["mudanca climatica", "aquecimento global", "efeito estufa", "acordo de paris",
             "cop", "desmatamento", "sustentabilidade", "carbono", "credito de carbono",
             "biodiversidade", "agenda 2030", "ods"] },

  { id: "tecnologia-sociedade", frentes: ["atualidades-tecnologia", "atualidades"], nome: "Tecnologia e sociedade", area: "Atualidades",
    termos: ["inteligencia artificial", "algoritmo", "rede social", "privacidade",
             "dados pessoais", "lgpd", "desinformacao", "fake news", "bolha informacional",
             "automacao", "big data", "plataforma digital"] },

  { id: "geopolitica-conflitos", frentes: ["atualidades-geopolitica", "atualidades"], nome: "Conflitos e geopolítica", area: "Atualidades",
    termos: ["geopolitica", "conflito", "guerra", "onu", "conselho de seguranca",
             "refugiado", "sancao", "oriente medio", "ucrania", "china", "multipolaridade",
             "soberania", "diplomacia"] },

  { id: "politica-economia-brasil", frentes: ["atualidades-politica", "atualidades"], nome: "Política e economia do Brasil", area: "Atualidades",
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
  // ---------------------------------------------------------------------
  { id: "ingles-compreensao", frentes: ["ingles"], nome: "Compreensão de texto (inglês)", area: "Linguagens",
    termos: ["main idea", "according to the text", "the author", "infer", "purpose",
             "best title", "passage", "paragraph"] },

  { id: "ingles-vocabulario", frentes: ["ingles"], nome: "Vocabulário e sinônimos (inglês)", area: "Linguagens",
    termos: ["synonym", "antonym", "means", "closest in meaning", "refers to",
             "word", "expression", "phrasal verb", "false cognate"] },

  { id: "ingles-gramatica", frentes: ["ingles"], nome: "Gramática (inglês)", area: "Linguagens",
    termos: ["verb tense", "present perfect", "past simple", "conditional", "modal",
             "passive voice", "relative pronoun", "preposition", "reported speech",
             "comparative", "superlative"] },
];
