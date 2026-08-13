// Como cada subtema se apresenta ao aluno: descrição da tela do dia e os dois
// termos de busca do botão de vídeo.
//
// Separado de classificar-subtemas.js de propósito: lá ficam as REGRAS (o que
// decide o subtema de uma questão), aqui fica a VITRINE (o que o aluno lê). São
// arquivos com ritmos de mudança diferentes -- a regra muda quando a
// classificação erra, o texto muda quando a descrição envelhece.
//
// A `area` exibida ao lado do nome não está aqui: ela é o nome da frente-pai, e
// o build a preenche sozinho. Na tela o aluno lê "Biologia · Genética e
// Hereditariedade", que é a hierarquia nova aparecendo sem ninguém a digitar.

const META = {
  // ------------------------------------------------------------- Matemática
  "matematica-sequencias": {
    descricao: "Progressões aritmética e geométrica, termo geral, somas e padrões que se repetem. Reconhecer a lei de formação costuma ser metade da questão.",
    buscaVideo: ["aula progressão aritmética geométrica vestibular", "sequências e recorrências vestibular"],
  },
  "matematica-probabilidade": {
    descricao: "Contagem, combinatória e probabilidade, incluindo a condicional. Em Medicina aparece disfarçada de prevalência, sensibilidade e falso positivo.",
    buscaVideo: ["aula probabilidade vestibular", "análise combinatória vestibular"],
  },
  "matematica-algebra": {
    descricao: "Equações, sistemas, funções, logaritmo, exponencial e matrizes. É a maior das cinco e a que sustenta toda modelagem cobrada.",
    buscaVideo: ["aula função afim quadrática vestibular", "logaritmo exponencial matrizes vestibular"],
  },
  "matematica-geometria": {
    descricao: "Plana, espacial, analítica e trigonometria. Costuma vir disfarçada: perceber que a curva dada é um arco de circunferência já resolve boa parte.",
    buscaVideo: ["aula geometria plana espacial vestibular", "geometria analítica trigonometria vestibular"],
  },
  "matematica-financeira": {
    descricao: "Média, mediana, dispersão, porcentagem, juros, razão e proporção. Razão é o termo mais frequente do banco inteiro de Matemática.",
    buscaVideo: ["aula porcentagem juros compostos vestibular", "média mediana desvio padrão vestibular"],
  },
  "matematica-complexos": {
    descricao: "Forma algébrica e trigonométrica, módulo, conjugado, potenciação e radiciação (De Moivre), lugar geométrico no plano de Argand-Gauss. Quase ausente do ENEM e das provas de Medicina/Direito, mas cobrado à parte em ITA e IME.",
    buscaVideo: ["aula números complexos forma trigonométrica vestibular", "De Moivre potenciação radiciação vestibular"],
  },
  "matematica-polinomios": {
    descricao: "Divisão, teorema do resto, relações de Girard entre coeficientes e raízes, multiplicidade e raízes racionais. O elo entre álgebra e números complexos que os vestibulares mais técnicos exploram.",
    buscaVideo: ["aula relações de Girard polinômios vestibular", "teorema do resto raízes racionais vestibular"],
  },
  "matematica-logica-conjuntos": {
    descricao: "Operações entre conjuntos, diagramas com inclusão-exclusão, proposições, tabela-verdade, negação de condicionais e quantificadores. Testa se o raciocínio é válido, não se a conta fecha.",
    buscaVideo: ["aula lógica proposicional tabela-verdade vestibular", "operações com conjuntos diagrama de Venn vestibular"],
  },

  // --------------------------------------------------------------- Biologia
  "biologia-genetica": {
    descricao: "Herança mendeliana, heredograma, alelos, cromossomos e biotecnologia. Cai com conta de probabilidade junto quase sempre.",
    buscaVideo: ["aula genética vestibular", "heredograma herança ligada ao sexo vestibular"],
  },
  "biologia-citologia": {
    descricao: "Célula, organelas, transporte pela membrana, mitose e meiose, e o metabolismo energético: fotossíntese, respiração e fermentação.",
    buscaVideo: ["aula citologia organelas vestibular", "fotossíntese respiração celular vestibular"],
  },
  "biologia-fisiologia": {
    descricao: "Os sistemas do corpo humano, hormônios, imunidade e as doenças que a banca usa como contexto. É o maior bloco de Biologia nas provas de Medicina.",
    buscaVideo: ["aula fisiologia humana vestibular", "sistema circulatório endócrino imunológico vestibular"],
  },
  "biologia-ecologia": {
    descricao: "Ecossistemas, cadeias alimentares, ciclos biogeoquímicos, biomas e impacto ambiental. Faz fronteira direta com Geografia e Atualidades.",
    buscaVideo: ["aula ecologia vestibular", "ciclos biogeoquímicos cadeia alimentar vestibular"],
  },
  "biologia-evolucao": {
    descricao: "Seleção natural, especiação, evidências da evolução e origem da vida. Banco curto: dá para varrer o subtema inteiro em poucas sessões.",
    buscaVideo: ["aula evolução seleção natural vestibular", "evidências da evolução origem da vida vestibular"],
  },
  "biologia-diversidade": {
    descricao: "Reinos, classificação, botânica e zoologia. Mais memória que raciocínio, e por isso o subtema que mais rende revisão espaçada.",
    buscaVideo: ["aula reinos classificação seres vivos vestibular", "botânica zoologia vestibular"],
  },

  // ---------------------------------------------------------------- Química
  "quimica-estequiometria": {
    descricao: "Mol, massa molar, balanceamento, reagente limitante e rendimento. A conta que aparece dentro de metade das outras questões de Química.",
    buscaVideo: ["aula estequiometria vestibular", "mol massa molar cálculo estequiométrico vestibular"],
  },
  "quimica-solucoes": {
    descricao: "Concentração, diluição, titulação, solubilidade e propriedades coligativas. Quase sempre com um rótulo ou um soro como contexto.",
    buscaVideo: ["aula soluções concentração molaridade vestibular", "propriedades coligativas vestibular"],
  },
  "quimica-equilibrio-acido-base": {
    descricao: "Equilíbrio químico, Le Chatelier, pH, ácidos, bases, hidrólise e tampão. O subtema com mais pegadinha de deslocamento do banco.",
    buscaVideo: ["aula equilíbrio químico Le Chatelier vestibular", "pH ácido base hidrólise vestibular"],
  },
  "quimica-eletroquimica": {
    descricao: "Pilhas, eletrólise, oxirredução, nox e corrosão. Reconhecer quem oxida e quem reduz resolve a maioria das questões.",
    buscaVideo: ["aula eletroquímica pilhas eletrólise vestibular", "oxirredução nox vestibular"],
  },
  "quimica-organica": {
    descricao: "Cadeias carbônicas, funções orgânicas, isomeria, polímeros e bioquímica. Nas bancas mais jornalísticas vem a partir de um fármaco ou de um plástico.",
    buscaVideo: ["aula química orgânica funções vestibular", "isomeria polímeros vestibular"],
  },
  "quimica-atomistica-ligacoes": {
    descricao: "Átomo, tabela periódica, ligações, geometria molecular, polaridade e radioatividade. É a base que explica quase todo o resto da matéria.",
    buscaVideo: ["aula tabela periódica ligações químicas vestibular", "geometria molecular polaridade vestibular"],
  },
  "quimica-termoquimica-cinetica": {
    descricao: "Entalpia, exo e endotérmica, lei de Hess, velocidade de reação e catalisador. Muito gráfico de energia para ler.",
    buscaVideo: ["aula termoquímica entalpia lei de Hess vestibular", "cinética química velocidade de reação vestibular"],
  },

  // ----------------------------------------------------------------- Física
  "fisica-mecanica": {
    descricao: "Cinemática, leis de Newton, atrito, plano inclinado e gravitação. O maior subtema de Física e a porta de entrada dos outros.",
    buscaVideo: ["aula cinemática leis de Newton vestibular", "atrito plano inclinado gravitação vestibular"],
  },
  "fisica-energia-trabalho": {
    descricao: "Trabalho, energia cinética e potencial, potência, conservação, colisões e molas. Banco curto para um assunto que cai muito.",
    buscaVideo: ["aula trabalho e energia vestibular", "quantidade de movimento colisões vestibular"],
  },
  "fisica-termologia": {
    descricao: "Temperatura, calor específico e latente, dilatação, gases e termodinâmica. Distinguir calor de temperatura já elimina metade dos distratores.",
    buscaVideo: ["aula calorimetria dilatação térmica vestibular", "termodinâmica gases vestibular"],
  },
  "fisica-ondas-optica": {
    descricao: "Ondas, som, luz, espelhos, lentes, refração e o espectro eletromagnético. Óptica da visão é contexto recorrente em Medicina.",
    buscaVideo: ["aula ondulatória som vestibular", "óptica espelhos lentes refração vestibular"],
  },
  "fisica-eletromagnetismo": {
    descricao: "Corrente, resistência, circuitos, campo elétrico e magnético, indução e consumo em kWh. A conta da conta de luz é clássica.",
    buscaVideo: ["aula eletrodinâmica circuitos vestibular", "eletrostática campo magnético indução vestibular"],
  },
  "fisica-hidrostatica": {
    descricao: "Pressão, densidade, empuxo e fluidos em movimento. Banco pequeno, mas é assunto que a banca gosta de cruzar com fisiologia.",
    buscaVideo: ["aula hidrostática pressão empuxo vestibular", "princípio de Arquimedes Pascal vestibular"],
  },
  "fisica-moderna": {
    descricao: "Relatividade restrita (dilatação do tempo, contração do comprimento, simultaneidade), efeito fotoelétrico e dualidade onda-partícula. Praticamente ausente das provas de Medicina e Direito, mas presente todo ano no ITA.",
    buscaVideo: ["aula relatividade restrita dilatação do tempo vestibular", "efeito fotoelétrico dualidade onda-partícula vestibular"],
  },

  // --------------------------------------------------------------- História
  "historia-brasil-colonia-imperio": {
    descricao: "Da colonização à queda do Império: capitanias, escravidão, mineração, independência, Primeiro e Segundo Reinado e abolição.",
    buscaVideo: ["aula brasil colônia vestibular", "primeiro segundo reinado abolição vestibular"],
  },
  "historia-brasil-republica": {
    descricao: "Da Proclamação ao Brasil de hoje: República Velha, Vargas, ditadura militar, redemocratização e a agenda recente.",
    buscaVideo: ["aula república velha era vargas vestibular", "ditadura militar redemocratização vestibular"],
  },
  "historia-geral-antiga-medieval": {
    descricao: "Mesopotâmia, Egito, Grécia, Roma, feudalismo, Igreja medieval e mundo islâmico. Base para entender o que a Idade Moderna rompe.",
    buscaVideo: ["aula grécia roma antiga vestibular", "feudalismo idade média vestibular"],
  },
  "historia-geral-moderna": {
    descricao: "Absolutismo, mercantilismo, Renascimento, Reforma, navegações, Iluminismo e as revoluções inglesa, americana e francesa.",
    buscaVideo: ["aula absolutismo mercantilismo vestibular", "revolução francesa iluminismo vestibular"],
  },
  "historia-geral-contemporanea": {
    descricao: "Revolução Industrial, imperialismo, guerras mundiais, Revolução Russa, Guerra Fria, descolonização e o mundo pós-1991.",
    buscaVideo: ["aula guerras mundiais vestibular", "guerra fria descolonização vestibular"],
  },

  // -------------------------------------------------------------- Geografia
  "geografia-fisica-clima": {
    descricao: "Clima, relevo, solos, vegetação, hidrografia e dinâmica interna da Terra. O maior subtema de Geografia no banco.",
    buscaVideo: ["aula climatologia relevo vestibular", "biomas hidrografia do brasil vestibular"],
  },
  "geografia-populacao-urbana": {
    descricao: "Demografia, transição demográfica, migrações, urbanização, metrópoles e desigualdade no espaço da cidade.",
    buscaVideo: ["aula demografia transição demográfica vestibular", "urbanização metrópoles vestibular"],
  },
  "geografia-agraria-economica": {
    descricao: "Estrutura fundiária, agronegócio, agricultura familiar, indústria, mineração e matriz energética.",
    buscaVideo: ["aula geografia agrária estrutura fundiária vestibular", "industrialização matriz energética brasil vestibular"],
  },
  "geografia-geopolitica": {
    descricao: "Ordem mundial, blocos econômicos, organismos multilaterais e divisão internacional do trabalho. Banco curto — vale complementar com Atualidades.",
    buscaVideo: ["aula geopolítica ordem mundial vestibular", "blocos econômicos globalização vestibular"],
  },
  "geografia-ambiente-sustentabilidade": {
    descricao: "Desmatamento, mudança climática, transição energética, resíduos e saneamento. Banco curto e com forte sobreposição com Atualidades.",
    buscaVideo: ["aula questão ambiental vestibular", "mudanças climáticas sustentabilidade vestibular"],
  },
  "geografia-cartografia": {
    descricao: "Mapas, escalas, projeções, coordenadas, fusos e sensoriamento remoto. Questão de leitura, não de memória.",
    buscaVideo: ["aula cartografia escalas projeções vestibular", "coordenadas geográficas fusos horários vestibular"],
  },

  // -------------------------------------------------------------- Gramática
  "gramatica-concordancia": {
    descricao: "Concordância verbal e nominal, sujeito composto e posposto, verbos impessoais e voz passiva.",
    buscaVideo: ["aula concordância verbal nominal vestibular", "sujeito composto verbo impessoal vestibular"],
  },
  "gramatica-regencia-crase": {
    descricao: "Regência verbal e nominal, preposição exigida e crase. O maior subtema de Gramática e o que mais separa nota.",
    buscaVideo: ["aula regência verbal nominal vestibular", "crase regra prática vestibular"],
  },
  "gramatica-pontuacao": {
    descricao: "Vírgula, ponto e vírgula, dois-pontos, aposto, vocativo e oração adjetiva explicativa contra restritiva.",
    buscaVideo: ["aula pontuação vírgula vestibular", "oração adjetiva explicativa restritiva vestibular"],
  },
  "gramatica-morfologia": {
    descricao: "Classes de palavras, pronomes e colocação pronominal, tempos e modos verbais, formação de palavras e acentuação.",
    buscaVideo: ["aula classes de palavras morfologia vestibular", "colocação pronominal acentuação vestibular"],
  },
  "gramatica-sintaxe-periodo": {
    descricao: "Análise sintática, período composto, orações subordinadas e coordenadas, funções sintáticas e vozes verbais.",
    buscaVideo: ["aula análise sintática período composto vestibular", "orações subordinadas coordenadas vestibular"],
  },
  "gramatica-coesao-semantica": {
    descricao: "Coesão, conectivos, retomada, sinonímia, ambiguidade, variação linguística e reescrita sem mudar o sentido.",
    buscaVideo: ["aula coesão coerência conectivos vestibular", "reescrita de frases variação linguística vestibular"],
  },

  // ---------------------------------------------------- Interpretação de Texto
  "interpretacao-ideia-central": {
    descricao: "Tese, tema, síntese e melhor título. A pergunta mais frequente de toda prova de Linguagens.",
    buscaVideo: ["aula ideia central do texto vestibular", "como identificar a tese do texto vestibular"],
  },
  "interpretacao-inferencia": {
    descricao: "O que o texto autoriza concluir sem dizer com todas as letras: pressuposto, subentendido e inferência.",
    buscaVideo: ["aula inferência pressuposto subentendido vestibular", "interpretação implícito vestibular"],
  },
  "interpretacao-argumentacao": {
    descricao: "Argumento, contra-argumento, estratégia argumentativa, falácia e a distinção entre fato e opinião.",
    buscaVideo: ["aula estrutura argumentativa vestibular", "fato e opinião falácias vestibular"],
  },
  "interpretacao-recursos-linguagem": {
    descricao: "Figuras de linguagem, ironia, conotação, tom e registro. É onde a leitura literal erra a questão.",
    buscaVideo: ["aula figuras de linguagem vestibular", "ironia conotação registro linguístico vestibular"],
  },
  "interpretacao-estrutura-coesao": {
    descricao: "Progressão entre parágrafos, conectivos, retomada e relações de causa, oposição e conclusão.",
    buscaVideo: ["aula coesão textual conectivos vestibular", "progressão temática estrutura do texto vestibular"],
  },
  "interpretacao-genero-discurso": {
    descricao: "Gênero textual, suporte, interlocutor, narrador, discurso direto e indireto e intertextualidade.",
    buscaVideo: ["aula gêneros textuais vestibular", "discurso direto indireto narrador vestibular"],
  },

  // ------------------------------------------------------------- Literatura
  "literatura-colonial-romantismo": {
    descricao: "Quinhentismo, Barroco, Arcadismo e Romantismo: de Gregório de Matos a Alencar, Gonçalves Dias e Castro Alves.",
    buscaVideo: ["aula barroco arcadismo vestibular", "romantismo brasileiro alencar vestibular"],
  },
  "literatura-realismo-naturalismo": {
    descricao: "Realismo, Naturalismo, Parnasianismo, Simbolismo e Pré-Modernismo. Machado e Aluísio dominam o subtema.",
    buscaVideo: ["aula realismo naturalismo machado de assis vestibular", "pré-modernismo os sertões vestibular"],
  },
  "literatura-modernismo": {
    descricao: "Da Semana de 22 à Geração de 45: Mário, Oswald, Graciliano, Drummond, Bandeira e João Cabral.",
    buscaVideo: ["aula modernismo semana de 22 vestibular", "geração de 30 graciliano drummond vestibular"],
  },
  "literatura-contemporanea": {
    descricao: "Clarice, Guimarães Rosa, literatura marginal e periférica, e a produção recente. Banco curto e em crescimento.",
    buscaVideo: ["aula clarice lispector guimarães rosa vestibular", "literatura contemporânea brasileira vestibular"],
  },
  "literatura-teoria-analise": {
    descricao: "Verso, estrofe, rima, métrica, eu lírico, narrador, foco narrativo e gêneros literários. A ferramenta para ler qualquer obra.",
    buscaVideo: ["aula análise de poema métrica rima vestibular", "foco narrativo tipos de narrador vestibular"],
  },

  // ----------------------------------------------------------------- Inglês
  "ingles-main-idea": {
    descricao: "Main idea, purpose and best title. Treina a leitura de cima para baixo, sem traduzir palavra por palavra.",
    buscaVideo: ["reading comprehension main idea vestibular", "como achar a ideia central texto em inglês"],
  },
  "ingles-inference": {
    descricao: "Inference: o que o texto implica sem afirmar, e a atitude do autor diante do que relata.",
    buscaVideo: ["reading comprehension inference vestibular", "inferência em texto de inglês vestibular"],
  },
  "ingles-detail": {
    descricao: "Detalhe específico, incluindo as questões com EXCEPT e NOT — as que mais custam ponto por leitura apressada.",
    buscaVideo: ["reading comprehension detail questions vestibular", "questões except not inglês vestibular"],
  },
  "ingles-vocabulary": {
    descricao: "Vocabulário em contexto, sinônimos e a que palavra o pronome se refere. Dá para acertar sem conhecer o termo.",
    buscaVideo: ["vocabulary in context vestibular", "referência pronominal texto em inglês vestibular"],
  },
  "ingles-grammar-structure": {
    descricao: "Tempos verbais, conectivos, voz passiva e como o texto se organiza de um parágrafo ao seguinte.",
    buscaVideo: ["aula tempos verbais inglês vestibular", "linking words connectors inglês vestibular"],
  },

  // --------------------------------------------------- Filosofia e Sociologia
  "filosofia-etica-moral": {
    descricao: "Ética, virtude, dever, utilitarismo e justiça. Kant e Aristóteles são os nomes que mais voltam.",
    buscaVideo: ["aula ética filosofia vestibular", "kant utilitarismo justiça vestibular"],
  },
  "filosofia-politica": {
    descricao: "Contratualismo, Estado, democracia, liberdade e poder. De Hobbes e Rousseau a Arendt e Foucault.",
    buscaVideo: ["aula contratualismo hobbes locke rousseau vestibular", "filosofia política democracia poder vestibular"],
  },
  "filosofia-conhecimento-logica": {
    descricao: "Teoria do conhecimento, racionalismo e empirismo, lógica e argumentação, e filosofia da ciência.",
    buscaVideo: ["aula teoria do conhecimento vestibular", "lógica argumentação falácias vestibular"],
  },
  "sociologia-trabalho-classes": {
    descricao: "Marx, Durkheim e Weber, capitalismo, divisão do trabalho, desigualdade e as formas recentes de precarização.",
    buscaVideo: ["aula marx durkheim weber vestibular", "trabalho e desigualdade sociologia vestibular"],
  },
  "sociologia-cultura-identidade": {
    descricao: "Cultura, etnocentrismo, identidade, indústria cultural, mídia e redes. Onde a prova encontra o presente.",
    buscaVideo: ["aula cultura identidade sociologia vestibular", "indústria cultural redes sociais vestibular"],
  },
  "sociologia-instituicoes-movimentos": {
    descricao: "Instituições, cidadania, movimentos sociais, políticas públicas e ação coletiva. Banco curto.",
    buscaVideo: ["aula movimentos sociais cidadania vestibular", "instituições sociais políticas públicas vestibular"],
  },

  // ----------------------------------------------------------------- Artes
  "artes-classica-moderna": {
    descricao: "Do Renascimento às vanguardas e ao modernismo brasileiro, incluindo arquitetura — das ordens gregas a Niemeyer.",
    buscaVideo: ["aula história da arte renascimento vanguardas vestibular", "modernismo brasileiro tarsila portinari vestibular"],
  },
  "artes-contemporanea": {
    descricao: "Instalação, performance, arte conceitual, neoconcretismo e o circuito que legitima a obra hoje.",
    buscaVideo: ["aula arte contemporânea vestibular", "lygia clark hélio oiticica neoconcretismo vestibular"],
  },
  "artes-musica-cena": {
    descricao: "Música erudita e popular brasileira, teatro, dança e as artes do palco.",
    buscaVideo: ["aula história da música brasileira vestibular", "teatro e dança história da arte vestibular"],
  },
  "artes-audiovisual-midia": {
    descricao: "Cinema, fotografia, videoarte e a reprodutibilidade técnica da imagem. Cinema Novo é presença constante.",
    buscaVideo: ["aula história do cinema brasileiro vestibular", "fotografia reprodutibilidade técnica benjamin vestibular"],
  },
  "artes-patrimonio-cultura-popular": {
    descricao: "Patrimônio material e imaterial, cultura popular, arte indígena e afro-brasileira. Banco curto.",
    buscaVideo: ["aula patrimônio cultural imaterial vestibular", "arte indígena afro-brasileira vestibular"],
  },

  // ------------------------------------------------------------ Atualidades
  "atualidades-politica-economia": {
    descricao: "Conjuntura brasileira: instituições, reformas, inflação, juros e orçamento público.",
    buscaVideo: ["atualidades política economia brasil resumo", "conjuntura econômica brasileira atualidades vestibular"],
  },
  "atualidades-geopolitica": {
    descricao: "Conflitos, blocos, organismos multilaterais e disputa entre potências. O maior subtema de Atualidades.",
    buscaVideo: ["atualidades geopolítica conflitos resumo", "relações internacionais atualidades vestibular"],
  },
  "atualidades-meioambiente": {
    descricao: "Clima, COPs, transição energética, desmatamento e eventos extremos. Envelhece rápido: prefira fonte recente.",
    buscaVideo: ["atualidades meio ambiente clima resumo", "COP transição energética atualidades vestibular"],
  },
  "atualidades-tecnologia": {
    descricao: "Inteligência artificial, plataformas, dados, desinformação e trabalho por aplicativo.",
    buscaVideo: ["atualidades inteligência artificial sociedade resumo", "regulação das plataformas dados atualidades vestibular"],
  },
  "atualidades-saude": {
    descricao: "SUS, vacinação, epidemias, saúde mental e alimentação. Contexto favorito das bancas de Medicina.",
    buscaVideo: ["atualidades saúde pública SUS resumo", "saúde mental epidemias atualidades vestibular"],
  },
  "atualidades-sociedade-educacao": {
    descricao: "Educação, desigualdade, mercado de trabalho, moradia e segurança pública. Repertório direto para a redação.",
    buscaVideo: ["atualidades educação desigualdade resumo", "temas sociais para redação atualidades vestibular"],
  },

  // -------------------------------------------------------- Direitos Humanos
  "dh-fundamentos": {
    descricao: "Dignidade da pessoa humana, Declaração Universal, gerações de direitos e o sistema interamericano.",
    buscaVideo: ["aula direitos humanos fundamentos vestibular", "declaração universal gerações de direitos vestibular"],
  },
  "dh-constitucional": {
    descricao: "Constituição de 1988, direitos fundamentais, separação dos poderes e remédios constitucionais.",
    buscaVideo: ["aula constituição de 1988 direitos fundamentais vestibular", "remédios constitucionais habeas corpus vestibular"],
  },
  "dh-igualdade-discriminacao": {
    descricao: "Discriminação, racismo, gênero, ações afirmativas e proteção de grupos vulneráveis.",
    buscaVideo: ["aula igualdade e discriminação direitos humanos vestibular", "ações afirmativas cotas vestibular"],
  },
  "dh-direitos-sociais": {
    descricao: "Saúde, educação, moradia, trabalho digno e as políticas públicas que os concretizam.",
    buscaVideo: ["aula direitos sociais políticas públicas vestibular", "mínimo existencial reserva do possível vestibular"],
  },
  "dh-justica-seguranca": {
    descricao: "Sistema penal, encarceramento, violência institucional, acesso à justiça e liberdade de expressão.",
    buscaVideo: ["aula sistema penal encarceramento direitos humanos vestibular", "acesso à justiça liberdade de expressão vestibular"],
  },
};

module.exports = { META };
