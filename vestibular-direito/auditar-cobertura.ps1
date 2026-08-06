# Audita a cobertura do banco contra o conteúdo programático da FGV.
#
# Uso:
#   .\auditar-cobertura.ps1
#   .\auditar-cobertura.ps1 -Prova Matematica
#
# --- o que este script é e o que ele NÃO é ------------------------------
#
# É um detector de LACUNA, não um medidor de qualidade. Ele conta em quantas
# questões cada item do programa oficial aparece, procurando os termos que
# aquele item obrigatoriamente usaria. Zero acerto é evidência forte de que o
# assunto não está no banco. Muitos acertos NÃO provam que o assunto está bem
# coberto -- provam que a palavra aparece.
#
# Por isso a saída separa três faixas: AUSENTE (0), FRÁGIL (1 a 4) e presente
# (5+). As duas primeiras merecem leitura manual; a terceira serve para não
# gastar leitura onde não há problema.
#
# O programa transcrito abaixo é o do CONTEUDO_01_2027.pdf, ciclo 1º/2027.
# Reconferir quando sair o edital seguinte.

param(
  [string]$Prova = "",
  # A explicação fica FORA do corpus por padrão, e isso importa mais do que
  # parece. Com ela dentro, "Recursos de estilo" marcava 15 questões em Língua
  # Portuguesa; sem ela, marca 2. A diferença são treze questões de outros
  # assuntos cujo comentário menciona uma metáfora de passagem -- o aluno lê a
  # palavra, mas nunca é testado no conteúdo. Medir o que a questão COBRA
  # significa olhar enunciado, apoio e alternativas.
  [switch]$ComExplicacao
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

# item = @{ nome; termos = @(...) }  -- basta UM termo bater para contar a questão
$programa = [ordered]@{
  "Matematica" = @{
    frentes = @("matematica-rlm")
    itens = @(
      # Singular junto com plural. Um enunciado real escreve "todo número inteiro
      # é racional", não "números inteiros" -- e a versão só no plural marcava
      # zero onde havia cinco questões.
      @{ n = "1.1 Conjuntos numéricos, operações";              t = @("conjunto numérico","número inteiro","número racional","número real","número natural","número irracional","irracional","dízima","conjunto dos números","racional quando") }
      @{ n = "1.2 Equações e inequações";                       t = @("equação","inequação","equacion") }
      @{ n = "1.3 Fatoração, divisibilidade, razões, proporções"; t = @("fatoraç","divisível","divisor","múltiplo","razão entre","proporcional","proporção","mmc","mdc") }
      @{ n = "1.4 Porcentagem, juros, matemática financeira";   t = @("porcentagem","por cento","%","juros","desconto","montante","capital") }
      @{ n = "1.5 Sequências e progressões";                    t = @("progressão","sequência","termo dessa","razão q","primeiro termo") }
      @{ n = "1.6 Contagem, permutações, combinações";          t = @("quantas formas","quantas maneiras","anagrama","permut","combinaç","de quantos modos","arranjo") }
      @{ n = "2.1 Polígonos";                                   t = @("polígono","quadrilátero","hexágono","pentágono","losango","trapézio","paralelogramo","retangular","quadrado de lado") }
      @{ n = "2.2 Circunferência";                              t = @("circunferência","circular","raio de","diâmetro") }
      @{ n = "2.3 Semelhança";                                  t = @("semelhan","proporcional aos lados","triângulos semelhantes","sombra") }
      # As abreviaturas entram junto com os nomes por extenso. Sem "sen ", "cos "
      # e "tg ", o script contava 2 questões de trigonometria onde havia 8: o
      # enunciado real escreve "sen 30°", não "seno de 30 graus".
      @{ n = "2.4 Triângulo retângulo e trigonometria";         t = @("triângulo retângulo","hipotenusa","cateto","pitágoras","seno","cosseno","tangente","sen ","cos ","tg ","sen²","cos²") }
      @{ n = "2.5 Áreas de figuras planas";                     t = @("área do","área desse","área dessa","área da","m²","cm²","metros quadrados") }
      @{ n = "2.6 Geometria espacial de posição, distâncias";    t = @("revers","plano perpendicular","posição relativa","retas do espaço","projeção ortogonal","distância de um ponto a um plano","diagonal do cubo","concorrentes quando") }
      @{ n = "2.7 Poliedros, prisma, pirâmide";                 t = @("poliedro","prisma","pirâmide","paralelepípedo","cubo","aresta","euler") }
      @{ n = "2.8 Cilindro, cone, esfera";                      t = @("cilind","cone","esfera","esférico") }
      @{ n = "2.9 Áreas e volumes";                             t = @("volume","litros","m³","capacidade de") }
      @{ n = "3.1 Representação e análise de dados";            t = @("tabela","gráfico","dados da","dados apresentados") }
      @{ n = "3.2 Média, moda e mediana";                       t = @("média aritmética","média ponderada","moda","mediana","média das") }
      @{ n = "3.3 Desvios e variância";                         t = @("desvio padrão","desvio-padrão","variância","dispersão","amplitude dos dados") }
      @{ n = "3.4 Probabilidade";                               t = @("probabilidade","ao acaso","chance de","aleatoriamente") }
      @{ n = "4.1 Funções e gráficos";                          t = @("função","f(x)","gráfico da função","domínio","imagem da função") }
      @{ n = "4.2 Função afim";                                 t = @("função afim","função do 1º grau","função do primeiro grau","y = mx","coeficiente angular","linearmente") }
      @{ n = "4.3 Função quadrática";                           t = @("função quadrática","segundo grau","2º grau","parábola","vértice da","x²") }
      @{ n = "4.4 Função exponencial";                          t = @("exponencial","dobra a cada","cresce a cada","juros compostos") }
      @{ n = "4.5 Função logarítmica";                          t = @("logaritmo","logarítmica","log ") }
      @{ n = "4.6 e 4.7 Relações e funções trigonométricas";    t = @("radiano","seno de","função seno","cosseno de","período da função","ciclo trigonométrico","sen²x","cos²x","relação fundamental","sen(","período","amplitude") }
      # Este item do programa é sobre MODELAR e resolver, e raramente a palavra
      # "grau" aparece no enunciado: o texto diz "perímetro de 34 m e área de 60
      # m², quais as dimensões". Os termos cobrem as duas formas.
      @{ n = "4.8 Problemas do 1º e 2º graus";                  t = @("primeiro grau","segundo grau","raízes","discriminante","delta","incógnita","quais são as suas dimensões","quais são as dimensões","o triplo do número","x² −","x² +") }
      @{ n = "5.1 Coordenadas e distância entre pontos";        t = @("plano cartesiano","coordenadas","ponto A(","ponto médio","distância entre os pontos") }
      @{ n = "5.2 Equação da reta";                             t = @("equação da reta","equação dessa reta","y = mx + b","reta que passa") }
      @{ n = "5.3 Retas paralelas e perpendiculares";           t = @("paralela a r","perpendicular","retas paralelas") }
      @{ n = "5.4 Circunferência e cônicas";                    t = @("equação da circunferência","elipse","hipérbole","parábola de equação","centro no ponto") }
      @{ n = "5.5 Interseções";                                 t = @("interseç","intercepta","ponto de encontro das retas","se cruzam") }
      @{ n = "5.6 Sistemas lineares";                           t = @("sistema de equações","sistema linear","matriz dos coeficientes","cramer","escalonamento") }
    )
  }
  "LinguaPortuguesa" = @{
    frentes = @("gramatica","interpretacao-texto")
    itens = @(
      @{ n = "1 Fonética e fonologia";                          t = @("fonema","sílaba","dígrafo","encontro consonantal","encontro vocálico","hiato","tônica") }
      @{ n = "2 Ortografia e acentuação";                       t = @("acentuaç","acento","ortografi","grafia correta","hífen","crase") }
      @{ n = "3 Estrutura e formação das palavras";             t = @("radical","prefixo","sufixo","derivaç","composiç","formação da palavra","neologismo") }
      @{ n = "3b Flexão nominal e verbal";                      t = @("flexão","plural de","tempo verbal","modo verbal","conjugaç","particípio","gerúndio") }
      @{ n = "4 Morfossintaxe: classes de palavras";            t = @("substantivo","adjetivo","advérbio","pronome","conjunção","preposição","numeral","interjeição") }
      @{ n = "5 Função sintática dos termos";                   t = @("sujeito","predicado","objeto direto","objeto indireto","adjunto","aposto","vocativo","complemento nominal","agente da passiva") }
      @{ n = "6 Processos sintáticos do período";               t = @("oração subordinada","oração coordenada","período composto","subordinada adverbial","subordinada substantiva","oração relativa") }
      @{ n = "7 Regência nominal e verbal";                     t = @("regência","reger","transitivo","preposição exigida") }
      @{ n = "8 Concordância nominal e verbal";                 t = @("concordância","concorda com","concordar") }
      @{ n = "9 Colocação pronominal";                          t = @("colocação pronominal","próclise","mesóclise","ênclise","pronome oblíquo") }
      @{ n = "10 Pontuação";                                    t = @("pontuaç","vírgula","ponto e vírgula","dois-pontos","travessão") }
      @{ n = "11 Recursos de estilo";                           t = @("metáfora","metonímia","ironia","hipérbole","antítese","eufemismo","personificaç","aliteraç","figura de linguagem","paradoxo") }
      @{ n = "12 Discurso direto, indireto e indireto livre";   t = @("discurso direto","discurso indireto","indireto livre") }
      @{ n = "13 Modos de organização textual";                 t = @("dissertaç","narraç","descriç","tipo textual","gênero textual") }
      @{ n = "14 Significação: denotação, conotação, polissemia"; t = @("denotaç","conotaç","polissem","sentido figurado","sentido literal","ambiguidade") }
      @{ n = "15 Variação linguística";                         t = @("variação linguística","norma culta","registro informal","regionalismo","gíria","variedade") }
      # Singular ao lado do plural, e os nomes das funções soltos. O enunciado
      # real pergunta "a função da linguagem predominante" e a alternativa
      # responde só "referencial" ou "fática" -- a versão que exigia "função
      # referencial" colado marcava zero onde havia seis questões.
      @{ n = "16 Funções da linguagem";                         t = @("função da linguagem","funções da linguagem","função referencial","função apelativa","função emotiva","função metalinguística","função poética","função fática","metalinguística","fática","conativa") }
    )
  }
  "Literatura" = @{
    frentes = @("literatura")
    itens = @(
      @{ n = "Barroco: Gregório de Matos, Antônio Vieira";      t = @("barroco","gregório de matos","vieira","cultismo","conceptismo") }
      @{ n = "Arcadismo: Cláudio Manuel, Tomás A. Gonzaga";     t = @("arcadismo","árcade","cláudio manuel","gonzaga","marília de dirceu","bucólic") }
      @{ n = "Romantismo: Gonçalves Dias, Álvares de Azevedo";  t = @("romantismo","gonçalves dias","álvares de azevedo","ultrarromânt","indianismo") }
      @{ n = "Romantismo: Castro Alves";                        t = @("castro alves","condoreir","navio negreiro") }
      @{ n = "Romantismo: Manuel A. de Almeida";                t = @("manuel antônio de almeida","sargento de milícias","malandr") }
      @{ n = "Romantismo: José de Alencar, Taunay";             t = @("alencar","iracema","senhora","guarani","taunay","inocência") }
      @{ n = "Realismo-Naturalismo: Machado de Assis";          t = @("machado de assis","brás cubas","dom casmurro","capitu","bentinho","quincas borba") }
      @{ n = "Realismo-Naturalismo: Aluísio Azevedo";           t = @("aluísio azevedo","cortiço","naturalis") }
      @{ n = "Realismo-Naturalismo: Raul Pompeia";              t = @("pompeia","ateneu") }
      @{ n = "Parnasianismo: Alberto de Oliveira, R. Correia, Bilac"; t = @("parnasian","olavo bilac","alberto de oliveira","raimundo correia","soneto") }
      @{ n = "Simbolismo: Cruz e Sousa, Alphonsus, A. dos Anjos"; t = @("simbolis","cruz e sousa","alphonsus","augusto dos anjos","sinestesia") }
      @{ n = "Pré-Modernismo: Lima Barreto, Euclides, Lobato";  t = @("pré-modernis","lima barreto","policarpo","euclides da cunha","sertões","monteiro lobato","jeca") }
      @{ n = "Modernismo 1a fase: Mário e Oswald de Andrade";   t = @("mário de andrade","oswald de andrade","macunaíma","antropófag","semana de 22","semana de arte moderna","pauliceia") }
      @{ n = "Modernismo: Manuel Bandeira";                     t = @("bandeira") }
      @{ n = "Modernismo: Alcântara Machado";                   t = @("alcântara machado","brás, bexiga") }
      @{ n = "Modernismo 2a fase: José Lins do Rego";           t = @("lins do rego","menino de engenho","fogo morto") }
      @{ n = "Modernismo 2a fase: Graciliano Ramos";            t = @("graciliano","vidas secas","são bernardo","memórias do cárcere") }
      @{ n = "Modernismo 2a fase: Jorge Amado";                 t = @("jorge amado","capitães da areia","gabriela") }
      @{ n = "Modernismo: Carlos Drummond de Andrade";          t = @("drummond","no meio do caminho") }
      @{ n = "Modernismo: Vinícius de Moraes";                  t = @("vinícius de moraes","soneto de fidelidade") }
      @{ n = "Modernismo: João Cabral de Melo Neto";            t = @("joão cabral","morte e vida severina","severino") }
      @{ n = "Modernismo 3a fase: Clarice Lispector";           t = @("clarice","hora da estrela","macabéa","epifania") }
      @{ n = "Modernismo 3a fase: Guimarães Rosa";             t = @("guimarães rosa","sertão: veredas","grande sertão","riobaldo","diadorim") }
      @{ n = "Modernismo: Nelson Rodrigues";                    t = @("nelson rodrigues","vestido de noiva") }
      @{ n = "Contemporâneos: João Ubaldo Ribeiro";             t = @("joão ubaldo","viva o povo brasileiro") }
      @{ n = "Contemporâneos: Rubem Fonseca";                   t = @("rubem fonseca","feliz ano novo") }
      @{ n = "Contemporâneos: Raduan Nassar";                   t = @("raduan","lavoura arcaica") }
      @{ n = "Contemporâneos: Chico Buarque";                   t = @("chico buarque","budapeste","leite derramado") }
      @{ n = "Noções gerais: gêneros literários";               t = @("gênero lírico","gênero épico","gênero dramático","subgênero") }
      @{ n = "Noções gerais: intertextualidade";                t = @("intertextual","paródia","paráfrase","citaç") }
      @{ n = "Noções gerais: literatura e contexto histórico";  t = @("contexto histórico","formação da literatura","antonio candido","estilo de época") }
      @{ n = "Noções gerais: literatura e as outras artes";     t = @("outras artes","pintura","música","cinema","artes visuais") }
      # ATENÇÃO: este item NÃO está no programa da FGV, que lista apenas
      # "II - Literatura Brasileira", por período e autor. Fica medido porque o
      # bloco de Linguagens da Insper se chama "Português e LiteraturaS", no
      # plural, e pode alcançar as literaturas de língua portuguesa. Serve de
      # inventário, não de meta.
      #
      # O termo "pessoa" foi retirado: casava com o substantivo comum e
      # produzia 29 falsos positivos, inflando este item de 7 para 35 e me
      # levando a tratar como redundância um conjunto que não existia.
      @{ n = "(fora do programa FGV) Literaturas africanas e portuguesa"; t = @("literatura portuguesa","angolan","moçambican","agualusa","mia couto","camões","saramago","fernando pessoa","eça de queir","pepetela") }
    )
  }
  "Historia" = @{
    frentes = @("historia-brasil","historia-geral")
    itens = @(
      @{ n = "1.1-1.2 Pré-História e Antiguidade Oriental";     t = @("pré-história","mesopotâmia","fenício","hebreu","egito","antiguidade oriental") }
      @{ n = "1.3 Grécia Antiga";                               t = @("grécia","grego","atenas","esparta","pólis","helenis") }
      @{ n = "1.4-1.5 Roma e reinos germânicos";                t = @("roma","romano","império romano","germânic","bárbar") }
      @{ n = "1.6-1.7 Bizâncio e expansão islâmica";            t = @("bizant","bizânc","islâmic","islã","muçulman","califado") }
      @{ n = "1.8-1.11 Feudalismo, cidades medievais";          t = @("feudal","feudo","servo","suserano","vassalo","idade média","cidade medieval","burgo") }
      @{ n = "1.9 África medieval e rotas mercantis";           t = @("mali","songai","gana","suaíli","áfrica medieval","transaarian") }
      @{ n = "1.12-1.16 Cruzadas, crise do século XIV, Reconquista"; t = @("cruzada","peste negra","crise do século xiv","reconquista","papado") }
      @{ n = "2.1-2.4 Monarquias nacionais, Absolutismo, Antigo Regime"; t = @("absolutis","monarquia nacional","antigo regime","luís xiv","estado moderno") }
      @{ n = "2.2 Expansão marítima";                           t = @("expansão marítima","navegaç","grandes navegações","caravela","tordesilhas") }
      @{ n = "2.3 Reformas religiosas e Inquisição";            t = @("reforma protestante","lutero","calvin","contrarreforma","inquisiç","concílio de trento") }
      @{ n = "2.5-2.6 Povos originários e conquista";           t = @("astec","mexica","maia","inca","povos originários","conquista espanhola","indígen") }
      @{ n = "2.7 Mercantilismo, sistema colonial, plantation"; t = @("mercantilis","pacto colonial","plantation","engenho","sistema colonial","monocultura") }
      @{ n = "2.8-2.9 Países Baixos, guerras e revoluções séc. XVI-XVII"; t = @("países baixos","holand","revolução inglesa","cromwell","guerra dos trinta anos") }
      @{ n = "2.11 Tráfico negreiro e sociedades africanas";    t = @("tráfico negreiro","tráfico atlântico","escraviza","quilombo","palmares") }
      @{ n = "2.12-2.15 Bandeirantes, jesuítas, mineração, revoltas coloniais"; t = @("bandeirante","jesuít","missões","mineraç","minas gerais","derrama","revolta colonial") }
      @{ n = "3.1-3.2 Iluminismo e Revolução Industrial";       t = @("iluminis","século das luzes","despotismo esclarecido","revolução industrial","liberalismo econômico") }
      @{ n = "3.3 Independência dos EUA";                       t = @("independência dos estados unidos","treze colônias","13 colônias","constituição norte-americana") }
      @{ n = "3.4 Revolução Francesa e Napoleão";               t = @("revolução francesa","napole","jacobin","terror","bastilha") }
      @{ n = "3.5-3.7 Inconfidência, crise colonial, independências hispano-americanas"; t = @("inconfidência","alfaiates","tiradentes","bolívar","san martín","independência da américa espanhola") }
      @{ n = "3.8-3.12 Corte no Brasil, emancipação, Estado brasileiro"; t = @("abertura dos portos","vinda da corte","d. joão","independência do brasil","primeiro reinado","d. pedro i","regência") }
      @{ n = "3.13-3.16 Segundo Reinado, café, escravidão";     t = @("segundo reinado","d. pedro ii","cafeicultura","café","lei do ventre livre","lei áurea","abolição") }
      @{ n = "3.17-3.18 Imperialismo e partilha da África";     t = @("imperialis","neocolonialis","partilha da áfrica","conferência de berlim") }
      @{ n = "3.19 Anarquismo, socialismo, classe operária";    t = @("anarquis","socialis","marx","classe operária","sindicat","comuna de paris") }
      @{ n = "3.21 Unificações da Itália e Alemanha";           t = @("unificação da itália","unificação da alemanha","bismarck","garibaldi") }
      @{ n = "3.24-3.25 EUA: Oeste e Guerra de Secessão";       t = @("guerra de secessão","conquista do oeste","destino manifesto","expansionismo norte-americano") }
      @{ n = "3.26 Prata e Guerra do Paraguai";                 t = @("guerra do paraguai","prata","solano lópez","tríplice aliança") }
      @{ n = "3.29 Crise do Império e República";               t = @("proclamação da república","crise do império","questão militar","questão religiosa") }
      @{ n = "4.1-4.4 2a Revolução Industrial, Belle Époque, movimento operário"; t = @("segunda revolução industrial","belle époque","taylor","ford","movimento operário") }
      @{ n = "4.7 Primeira Guerra Mundial";                     t = @("primeira guerra","grande guerra","versalhes","trincheira") }
      @{ n = "4.8 Revolução Russa";                             t = @("revolução russa","bolchev","lenin","stalin","soviét") }
      @{ n = "4.9 Revolução Mexicana";                          t = @("revolução mexicana","zapata","pancho villa") }
      @{ n = "4.10-4.14 Primeira República, coronelismo, tenentismo, modernismo"; t = @("primeira república","república velha","coronelis","café com leite","tenentis","política dos governadores","canudos","contestado") }
      @{ n = "4.15-4.18 Crise de 1929, fascismos, nazismo, New Deal"; t = @("crise de 1929","quebra da bolsa","fascis","mussolini","nazis","hitler","new deal") }
      @{ n = "4.19-4.20 Revolução de 30, Estado Novo, trabalhismo"; t = @("revolução de 30","estado novo","vargas","clt","legislação trabalhista","trabalhis") }
      @{ n = "4.21 Segunda Guerra e Holocausto";                t = @("segunda guerra","holocausto","auschwitz","pearl harbor","hiroshima") }
      @{ n = "4.22-4.23 Diplomacia pós-guerra e Guerra Fria";   t = @("guerra fria","cortina de ferro","otan","plano marshall","muro de berlim","bipolar") }
      @{ n = "4.24-4.25 Populismo e democracia populista";      t = @("populis","juscelino","plano de metas","jango","goulart") }
      @{ n = "4.26 Descolonização e libertação nacional";       t = @("descoloniz","libertação nacional","bandung","não alinhad","argélia","gandhi") }
      @{ n = "4.27-4.32 Ditaduras na América Latina e no Brasil"; t = @("ditadura militar","ditadura civil-militar","ato institucional","ai-5","milagre econômico","milagre brasileiro","abertura política","anistia","diretas já","pinochet","operação condor") }
      @{ n = "5.1-5.4 Fim do comunismo, redemocratização, economia pós-ditadura"; t = @("queda do muro","colapso do comunismo","redemocratiz","constituição de 1988","plano real","hiperinflação") }
      @{ n = "5.5-5.7 Neoliberalismo, blocos, BRICS, multipolaridade"; t = @("neoliberal","bloco econômico","mercosul","união europeia","brics","multipolar") }
      @{ n = "5.8 Redes sociais, luta política, fake news";     t = @("fake news","desinformaç","redes sociais","polarizaç") }
      @{ n = "5.10 Movimentos identitários e direitos civis";   t = @("direitos civis","movimento negro","feminis","lgbt","identitári","luther king") }
    )
  }
  "Geografia" = @{
    frentes = @("geografia","atualidades-meioambiente","atualidades-geopolitica")
    itens = @(
      @{ n = "1.1 Do fordismo à economia flexível";             t = @("fordis","acumulação flexível","toyotis","just in time","reestruturação produtiva") }
      @{ n = "1.2 Multinacionalização e globalização";          t = @("globaliz","multinacional","transnacional","cadeia global") }
      @{ n = "1.3 Organismos internacionais";                   t = @("fmi","banco mundial","omc","onu","organismo internacional","multilateral") }
      @{ n = "2.1 Redes materiais e imateriais";                t = @("rede de transporte","fluxo de informaç","telecomunicaç","cabo submarino","logístic") }
      @{ n = "2.2 Mundo multipolar e novos polos";              t = @("multipolar","unipolar","potência regional","china","união europeia","hegemon") }
      @{ n = "2.3 Conflitos étnico-religiosos";                 t = @("étnico-religios","fundamentalis","conflito étnico","separatis","curdo","oriente médio") }
      @{ n = "2.4 Questão ambiental e tratados internacionais"; t = @("acordo de paris","protocolo de quioto","cop","tratado ambiental","convenção do clima") }
      @{ n = "3.1 Migrações internacionais";                    t = @("migraç","refugiad","imigra","emigra","xenofob") }
      @{ n = "3.2 Turismo";                                     t = @("turis") }
      @{ n = "3.3 Indústria cultural";                          t = @("indústria cultural","streaming","cultura de massa") }
      @{ n = "3.4 Financeirização";                             t = @("financeiriz","capital especulativo","paraíso fiscal","mercado financeiro") }
      @{ n = "3.5 ONGs e movimentos sociais";                   t = @("organização não governamental","não-governamental","ong","movimento social") }
      @{ n = "4.1-4.2 Brasil na divisão internacional do trabalho"; t = @("divisão internacional do trabalho","commodit","pauta de exportaç","desindustrializ") }
      @{ n = "4.3 População brasileira: estrutura e dinâmica";  t = @("transição demográfica","pirâmide etária","taxa de fecundidade","envelhecimento da populaç","censo","expectativa de vida") }
      @{ n = "4.3b Migrações internas e indicadores sociais";   t = @("êxodo rural","migração interna","idh","gini","distribuição de renda","indicador de qualidade de vida") }
      @{ n = "4.3c Questão indígena e sequelas da escravidão";  t = @("terra indígena","demarcaç","povos indígenas","desigualdade racial","racismo estrutural") }
      @{ n = "4.4 Agricultura, pecuária, complexos agroindustriais"; t = @("agronegócio","agroindustri","pecuária","fronteira agrícola","agricultura familiar","reforma agrária","propriedade da terra","conflito no campo") }
      @{ n = "4.5 Industrialização brasileira e energia";       t = @("industrializ","polo industrial","matriz energética","hidrelétric","pré-sal","substituição de importaç") }
      @{ n = "4.6 Urbanização e rede urbana";                   t = @("urbanizaç","metropoliz","região metropolitana","cidade média","rede urbana","mobilidade urbana","segregação socioespacial","favela","conurbaç") }
      @{ n = "5.1-5.3 Regionalização: Centro-Sul, Nordeste, Amazônia"; t = @("centro-sul","nordeste","amazôn","concentração econômica","disparidade regional","sudene") }
      @{ n = "6.1 Geologia, geomorfologia, pedologia";          t = @("geomorfolog","relevo","planalto","depressão","escudo cristalino","solo","pedolog","latossolo","erosão") }
      @{ n = "6.2 Clima e bacias hidrográficas";                t = @("clima","climátic","massa de ar","bacia hidrográfica","aquífero","recursos hídricos") }
      @{ n = "6.3 Biogeografia e ambientes tropicais";          t = @("bioma","cerrado","caatinga","mata atlântica","pampa","pantanal","vegetaç") }
      @{ n = "6.4-6.5 Recursos naturais e problemas ambientais"; t = @("desmatamento","recurso natural","problema ambiental","poluiç","saneamento","mudança climática") }
    )
  }
}

# ------------------------------------------------------------------ execução

$bancoDir = Join-Path $root "data\questions"
$textoDe = @{}
foreach ($arq in Get-ChildItem $bancoDir -Filter *.json) {
  $j = Get-Content -Raw -Encoding UTF8 $arq.FullName | ConvertFrom-Json
  $textos = @{}
  if ($j.PSObject.Properties.Name -contains "textos" -and $j.textos) {
    foreach ($tx in @($j.textos)) { $textos[$tx.id] = $tx.conteudo }
  }
  $lista = New-Object System.Collections.Generic.List[string]
  foreach ($q in @($j.questoes)) {
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.Append($q.enunciado)
    if ($q.PSObject.Properties.Name -contains "texto_apoio") { [void]$sb.Append(" " + $q.texto_apoio) }
    if ($q.PSObject.Properties.Name -contains "textoId" -and $q.textoId -and $textos.ContainsKey($q.textoId)) { [void]$sb.Append(" " + $textos[$q.textoId]) }
    foreach ($p in @($q.alternativas.PSObject.Properties)) { [void]$sb.Append(" " + $p.Value) }
    if ($ComExplicacao -and $q.PSObject.Properties.Name -contains "explicacao") { [void]$sb.Append(" " + $q.explicacao) }
    $lista.Add($sb.ToString().ToLowerInvariant())
  }
  $textoDe[$j.subtopic] = $lista
}

$resumo = @()
foreach ($nomeProva in $programa.Keys) {
  if ($Prova -and $nomeProva -ne $Prova) { continue }
  $cfg = $programa[$nomeProva]
  $corpus = New-Object System.Collections.Generic.List[string]
  foreach ($f in $cfg.frentes) { if ($textoDe.ContainsKey($f)) { $textoDe[$f] | ForEach-Object { $corpus.Add($_) } } }

  Write-Output ""
  Write-Output ("=" * 78)
  Write-Output ("$nomeProva  --  frentes: $($cfg.frentes -join ', ')  --  $($corpus.Count) questoes")
  Write-Output ("=" * 78)

  $ausentes = @(); $frageis = @()
  foreach ($item in $cfg.itens) {
    $n = 0
    foreach ($q in $corpus) {
      $bateu = $false
      foreach ($termo in $item.t) { if ($q.Contains($termo.ToLowerInvariant())) { $bateu = $true; break } }
      if ($bateu) { $n++ }
    }
    $faixa = if ($n -eq 0) { "AUSENTE" } elseif ($n -le 4) { "fragil " } else { "ok     " }
    if ($n -eq 0) { $ausentes += $item.n }
    elseif ($n -le 4) { $frageis += "$($item.n) ($n)" }
    Write-Output ("  {0}  {1,4}  {2}" -f $faixa, $n, $item.n)
  }
  $resumo += [pscustomobject]@{ Prova = $nomeProva; Itens = $cfg.itens.Count; Ausentes = $ausentes.Count; Frageis = $frageis.Count }
}

Write-Output ""
Write-Output ("=" * 78)
Write-Output "RESUMO"
Write-Output ("=" * 78)
$resumo | ForEach-Object { Write-Output ("  {0,-18} {1,3} itens do programa | {2,2} ausentes | {3,2} frageis (1 a 4 questoes)" -f $_.Prova, $_.Itens, $_.Ausentes, $_.Frageis) }
