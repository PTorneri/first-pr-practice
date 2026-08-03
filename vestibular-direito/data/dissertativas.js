// Banco de questões dissertativas no estilo da prova discursiva da FGV
// (Ciências Humanas, Língua Portuguesa/Linguagens e Arte e Questões Contemporâneas).
// Diferente das objetivas: aqui não há alternativa certa/errada — o usuário escreve
// uma resposta em texto livre e depois confere os "pontos esperados" (um espelho de
// correção simplificado), no mesmo espírito da correção discursiva real.
window.DISSERTATIVAS = [
  // ---------- HUMANAS ----------
  {
    "id": "dissert-humanas-01",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "Estudos sobre mobilidade social no Brasil apontam que o nível educacional e a renda dos pais continuam sendo fortes previsores da renda futura dos filhos, mesmo décadas depois da expansão do acesso à educação básica.",
    "comando": "Com base no texto e em seus conhecimentos sobre desigualdade social no Brasil, disserte sobre os principais fatores que dificultam a mobilidade social intergeracional no país e proponha uma medida de política pública capaz de atenuar esse problema.",
    "pontosEsperados": [
      "Identifica pelo menos dois fatores estruturais (ex.: qualidade da educação básica, acesso desigual ao mercado de trabalho, desigualdade regional, herança de capital financeiro/social)",
      "Relaciona os fatores entre si, e não apenas os lista isoladamente",
      "Propõe uma medida de política pública plausível e justifica por que ela atacaria a causa discutida",
      "Texto organizado em parágrafos, com introdução, desenvolvimento e conclusão"
    ]
  },
  {
    "id": "dissert-humanas-02",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "Grandes cidades brasileiras concentram extensas áreas de ocupação irregular, muitas vezes em regiões de risco ambiental (encostas, margens de rios), enquanto bairros centrais concentram infraestrutura e serviços.",
    "comando": "Explique, com base em processos históricos e geográficos de urbanização no Brasil, por que esse padrão de ocupação irregular se formou, e discuta pelo menos uma consequência social ou ambiental desse fenômeno.",
    "pontosEsperados": [
      "Relaciona o fenômeno ao êxodo rural e à industrialização acelerada sem planejamento urbano correspondente",
      "Menciona a especulação imobiliária e o preço da terra como fator de exclusão dos bairros centrais",
      "Aponta uma consequência concreta (risco de desastres, ausência de saneamento, segregação socioespacial, etc.)",
      "Argumenta de forma encadeada, não apenas descritiva"
    ]
  },
  {
    "id": "dissert-humanas-03",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "Organismos multilaterais como a ONU e a OMC foram criados no pós-guerra para promover cooperação entre Estados, mas enfrentam crescente questionamento em um cenário de nacionalismo e disputas geopolíticas.",
    "comando": "Discuta o papel dos organismos multilaterais na regulação das relações internacionais contemporâneas, apresentando um argumento a favor de sua relevância e um desafio real que eles enfrentam hoje.",
    "pontosEsperados": [
      "Explica corretamente a função de cooperação/regulação de um organismo multilateral (ex.: resolução de disputas, normas comerciais, segurança coletiva)",
      "Apresenta um argumento consistente sobre por que essas instituições ainda são relevantes",
      "Identifica um desafio real (poder de veto, assimetria entre países, falta de mecanismos de coerção)",
      "Evita generalizações vagas do tipo \"a ONU é importante\" sem justificar"
    ]
  },
  {
    "id": "dissert-humanas-04",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "A reforma tributária aprovada no Brasil busca simplificar um sistema historicamente considerado complexo, substituindo cinco tributos sobre o consumo por um IVA dual: a CBS, federal, e o IBS, de estados e municípios.",
    "comando": "Explique por que o sistema tributário sobre o consumo era considerado complexo antes da reforma e discuta um possível benefício e um possível desafio de se concentrar a tributação do consumo em um imposto sobre valor agregado.",
    "pontosEsperados": [
      "Menciona a multiplicidade de tributos e legislações (federal, estadual, municipal) como fonte de complexidade",
      "Aponta um benefício plausível (redução de litígios, maior transparência, menor custo de conformidade)",
      "Aponta um desafio plausível (transição entre sistemas, redistribuição de arrecadação entre entes federativos)",
      "Demonstra compreensão do conceito de tributação sobre consumo (não confunde com tributação sobre renda)"
    ]
  },
  {
    "id": "dissert-humanas-05",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "Acordos internacionais sobre mudança climática costumam adotar o princípio de \"responsabilidades comuns, porém diferenciadas\", reconhecendo que países se industrializaram em momentos e ritmos distintos.",
    "comando": "Explique o que esse princípio significa e discuta, com um exemplo, por que ele costuma gerar tensão nas negociações climáticas entre países desenvolvidos e países em desenvolvimento.",
    "pontosEsperados": [
      "Explica corretamente o princípio: todos têm responsabilidade, mas em grau diferente conforme histórico de emissões e capacidade econômica",
      "Relaciona o princípio ao histórico de industrialização desigual entre países",
      "Apresenta um exemplo concreto de tensão (financiamento climático, metas de redução diferentes, transferência de tecnologia)",
      "Não trata o tema de forma unilateral, reconhecendo os dois lados do debate"
    ]
  },
  {
    "id": "dissert-humanas-06",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "A Constituição de 1988, apelidada de \"Constituição Cidadã\", marcou a redemocratização brasileira após o regime militar.",
    "comando": "Discuta dois avanços que a Constituição de 1988 trouxe em relação ao período anterior, explicando por que eles são considerados relevantes para a consolidação democrática do Brasil.",
    "pontosEsperados": [
      "Cita ao menos dois avanços concretos (ex.: ampliação de direitos sociais, eleições diretas, liberdade de imprensa, controle de constitucionalidade, direitos das minorias)",
      "Explica, e não apenas menciona, por que cada avanço é relevante para a democracia",
      "Contextualiza corretamente o período anterior (regime militar, restrição de direitos)",
      "Mantém coerência argumentativa ao longo do texto"
    ]
  },
  {
    "id": "dissert-humanas-07",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "O avanço da inteligência artificial tem reacendido debates éticos sobre automação do trabalho, viés algorítmico e responsabilidade por decisões tomadas por sistemas automatizados.",
    "comando": "Escolha um desses três dilemas (automação do trabalho, viés algorítmico ou responsabilidade por decisões automatizadas) e discuta por que ele representa um desafio ético relevante para a sociedade contemporânea.",
    "pontosEsperados": [
      "Escolhe um único dilema e o desenvolve em profundidade, em vez de tratar superficialmente os três",
      "Explica corretamente o mecanismo do problema escolhido (ex.: como surge o viés algorítmico)",
      "Relaciona o dilema a um impacto social concreto",
      "Evita respostas puramente técnicas sem discutir a dimensão ética"
    ]
  },
  {
    "id": "dissert-humanas-08",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "O conceito de cidadania é frequentemente descrito como um processo histórico de conquista sucessiva de direitos civis, políticos e sociais.",
    "comando": "Explique a diferença entre direitos civis, políticos e sociais, e discuta, com um exemplo brasileiro, por que a existência formal de um direito nem sempre garante seu exercício efetivo.",
    "pontosEsperados": [
      "Diferencia corretamente as três categorias de direitos (ex.: civis = liberdade individual; políticos = participação no poder; sociais = condições mínimas de vida)",
      "Traz um exemplo brasileiro concreto e pertinente",
      "Argumenta sobre a diferença entre direito formal (na lei) e direito material (na prática)",
      "Conclui retomando a tese apresentada"
    ]
  },

  // ---------- LINGUAGENS ----------
  {
    "id": "dissert-linguagens-01",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "\"As redes sociais não inventaram a fofoca, a opinião apressada ou o exagero retórico. Elas apenas deram a esses velhos hábitos humanos um alcance e uma velocidade que a espécie nunca havia experimentado antes.\"",
    "comando": "A partir do texto, explique qual é a tese defendida pelo autor e discuta, com seus próprios argumentos, se você concorda ou discorda dela, justificando sua posição.",
    "pontosEsperados": [
      "Identifica corretamente a tese: as redes sociais amplificam comportamentos humanos preexistentes, não os criam",
      "Posiciona-se claramente a favor ou contra a tese (não fica em cima do muro)",
      "Sustenta a posição com pelo menos um argumento próprio, não apenas repetindo o texto",
      "Mantém coesão entre os parágrafos (uso de conectivos adequados)"
    ]
  },
  {
    "id": "dissert-linguagens-02",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "Um anúncio publicitário afirma: \"Nove em cada dez especialistas recomendam. Você vai continuar sendo a exceção?\"",
    "comando": "Analise as estratégias linguísticas e argumentativas usadas nesse anúncio para persuadir o leitor, identificando pelo menos dois recursos (por exemplo, apelo à maioria, pergunta retórica, dado estatístico) e explicando o efeito de sentido que cada um produz.",
    "pontosEsperados": [
      "Identifica corretamente pelo menos dois recursos argumentativos presentes no texto",
      "Explica o efeito pretendido de cada recurso (não apenas o nomeia)",
      "Demonstra compreensão de que \"nove em cada dez\" é um apelo à maioria, não uma prova lógica",
      "Usa vocabulário técnico adequado (argumento de autoridade, pergunta retórica etc.), quando pertinente"
    ]
  },
  {
    "id": "dissert-linguagens-03",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "Em uma mensagem de texto entre amigos: \"vc vai hj? pq axo q vai chover mto\". Em um e-mail profissional: \"Prezado(a), gostaria de confirmar sua presença na reunião de amanhã.\"",
    "comando": "Compare os dois exemplos de linguagem apresentados, explicando por que a adequação da linguagem ao contexto (registro formal x informal) é um critério relevante de avaliação em provas de redação e em situações reais de comunicação.",
    "pontosEsperados": [
      "Identifica corretamente as marcas de informalidade (abreviações, ausência de acentuação) e de formalidade (vocativo, estrutura completa)",
      "Explica o conceito de adequação ao contexto comunicativo (registro/variação linguística)",
      "Relaciona o conceito a uma consequência prática (ex.: uso de linguagem informal pode prejudicar a avaliação de um texto formal)",
      "Não trata a informalidade como \"erro\", mas como uma variedade adequada a outro contexto"
    ]
  },
  {
    "id": "dissert-linguagens-04",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "A comunicação digital consolidou expressões como \"kkkk\", emojis e abreviações que, para alguns, empobrecem a língua portuguesa, e para outros, apenas expandem seus recursos expressivos.",
    "comando": "Discuta essa polêmica apresentando um argumento que sustente a visão de que a linguagem digital é um empobrecimento da língua e um argumento que sustente a visão de que é uma expansão de seus recursos, concluindo com sua própria posição.",
    "pontosEsperados": [
      "Apresenta um argumento coerente para cada um dos dois lados (não apenas afirma sem justificar)",
      "Demonstra noção de que língua é um sistema vivo e que varia conforme contexto e suporte de comunicação",
      "Conclui com posicionamento próprio claro, e não apenas resume os dois lados",
      "Evita julgamento de valor sem fundamentação linguística"
    ]
  },
  {
    "id": "dissert-linguagens-05",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "\"No meio do caminho tinha uma pedra / tinha uma pedra no meio do caminho\" (Carlos Drummond de Andrade, versos iniciais)",
    "comando": "Explique o efeito de sentido produzido pela repetição no trecho apresentado e discuta como esse recurso pode contribuir para a construção de significado em um texto poético.",
    "pontosEsperados": [
      "Identifica a repetição com inversão da ordem dos termos como recurso estilístico (quiasmo), e não como anáfora, que exigiria a repetição no início de versos sucessivos",
      "Explica um efeito plausível (ênfase no obstáculo, ritmo, permanência da imagem na memória do leitor)",
      "Relaciona o recurso à construção de sentido do poema, não apenas o descreve tecnicamente",
      "Usa vocabulário adequado de análise literária"
    ]
  },
  {
    "id": "dissert-linguagens-06",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "Movimentos literários brasileiros, como o Modernismo, frequentemente utilizaram a literatura como instrumento de crítica social e de construção de identidade nacional.",
    "comando": "Escolha um movimento ou autor da literatura brasileira que você conheça e explique, com um exemplo, de que forma a obra escolhida funciona como crítica social ou reflexão sobre a identidade nacional.",
    "pontosEsperados": [
      "Identifica corretamente o movimento/autor e um traço característico de sua obra",
      "Relaciona a obra a uma crítica social ou a uma discussão de identidade nacional específica",
      "Evita generalidades (\"a literatura é importante\") em favor de um exemplo concreto",
      "Demonstra domínio básico de contexto histórico-literário"
    ]
  },
  {
    "id": "dissert-linguagens-07",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "\"Compre já! Estoque limitado! Não perca essa chance única!\" — trecho de um texto publicitário.",
    "comando": "Identifique a estratégia argumentativa central desse texto publicitário (por exemplo, apelo à urgência ou à escassez) e explique por que esse tipo de estratégia costuma ser eficaz para influenciar o comportamento do leitor.",
    "pontosEsperados": [
      "Identifica corretamente o apelo à urgência/escassez como estratégia central",
      "Explica o mecanismo psicológico/argumentativo por trás da estratégia (medo de perder uma oportunidade)",
      "Relaciona a estratégia ao objetivo comunicativo do texto (persuadir à compra imediata)",
      "Usa terminologia adequada de análise argumentativa"
    ]
  },
  {
    "id": "dissert-linguagens-08",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "A circulação de notícias falsas (fake news) tem sido associada à dificuldade de parte do público em avaliar criticamente as fontes de informação que consome.",
    "comando": "Discuta duas estratégias de leitura crítica que um leitor pode usar para avaliar a confiabilidade de uma notícia antes de compartilhá-la, explicando por que cada uma é útil.",
    "pontosEsperados": [
      "Apresenta pelo menos duas estratégias plausíveis (checar a fonte, buscar outras fontes que confirmem, verificar a data, observar linguagem sensacionalista, checar autoria)",
      "Explica por que cada estratégia ajuda a identificar informação não confiável",
      "Demonstra compreensão do conceito de letramento midiático/leitura crítica",
      "Texto organizado e objetivo"
    ]
  },

  // ---------- ARTES ----------
  {
    "id": "dissert-artes-01",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "O Barroco valorizava o movimento, o contraste de luz e sombra e a dramaticidade religiosa; já o Modernismo brasileiro, inaugurado pela Semana de Arte Moderna de 1922, buscava romper com o academicismo e construir uma identidade artística nacional.",
    "comando": "Compare esses dois movimentos artísticos quanto a seus objetivos e ao contexto histórico em que surgiram, explicando por que cada um refletia as preocupações de sua época.",
    "pontosEsperados": [
      "Descreve corretamente ao menos um traço estético de cada movimento",
      "Relaciona cada movimento ao seu contexto histórico (colonização/catolicismo para o Barroco; busca por identidade nacional pós-Primeira Guerra para o Modernismo)",
      "Estabelece uma comparação explícita, não apenas duas descrições paralelas",
      "Conclui retomando a relação entre arte e contexto histórico"
    ]
  },
  {
    "id": "dissert-artes-02",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "A arte urbana (grafite, murais, intervenções em espaços públicos) tem ganhado reconhecimento como forma legítima de expressão artística e crítica social, embora ainda enfrente debates sobre sua legalidade.",
    "comando": "Discuta a arte urbana como forma de crítica social, apresentando um argumento a favor de sua legitimidade artística e um argumento que explique por que ela ainda gera controvérsia.",
    "pontosEsperados": [
      "Apresenta um argumento consistente sobre o valor artístico/crítico da arte urbana",
      "Explica um motivo real de controvérsia (associação a pichação, questões de propriedade, autorização do espaço público)",
      "Evita tratar o tema de forma unilateral",
      "Demonstra noção de que arte urbana pode ter função social/política"
    ]
  },
  {
    "id": "dissert-artes-03",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "O conceito de \"indústria cultural\", cunhado por Theodor Adorno e Max Horkheimer, critica a padronização da produção cultural voltada para o consumo em massa.",
    "comando": "Explique o conceito de indústria cultural e discuta se ele pode ser aplicado às plataformas de streaming de música e vídeo atuais, apresentando pelo menos um argumento que sustente sua posição.",
    "pontosEsperados": [
      "Explica corretamente o conceito (padronização, produção em massa, lógica de mercado aplicada à cultura)",
      "Relaciona o conceito, de forma justificada, às plataformas de streaming atuais (algoritmos de recomendação, hits padronizados)",
      "Posiciona-se claramente (concorda, discorda ou concorda parcialmente) com argumentação",
      "Evita repetir o conceito sem de fato aplicá-lo ao caso atual"
    ]
  },
  {
    "id": "dissert-artes-04",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "A Semana de Arte Moderna de 1922, realizada em São Paulo, é considerada um marco na construção de uma identidade cultural brasileira que incorporava vanguardas europeias sem abrir mão de temas nacionais.",
    "comando": "Explique de que forma a Semana de Arte Moderna de 1922 contribuiu para a construção de uma identidade cultural brasileira, citando pelo menos um artista ou obra associada ao movimento.",
    "pontosEsperados": [
      "Explica corretamente o objetivo do movimento (romper com o academicismo, valorizar temas e linguagem brasileiros)",
      "Cita corretamente pelo menos um artista/obra do modernismo (ex.: Anita Malfatti, Oswald de Andrade, Mário de Andrade, Di Cavalcanti, Villa-Lobos; Tarsila do Amaral vale como referência do movimento, ainda que não tenha participado da Semana, pois estava em Paris)",
      "Relaciona o exemplo citado à construção de identidade nacional",
      "Demonstra domínio do contexto histórico do movimento"
    ]
  },
  {
    "id": "dissert-artes-05",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "O debate sobre apropriação cultural questiona os limites entre inspiração legítima e uso indevido de elementos culturais de grupos historicamente marginalizados por artistas de fora desses grupos.",
    "comando": "Discuta a diferença entre inspiração artística legítima e apropriação cultural problemática, apresentando um critério que ajude a distinguir os dois casos.",
    "pontosEsperados": [
      "Demonstra compreensão do conceito de apropriação cultural (uso de elementos de uma cultura marginalizada sem reconhecimento, contexto ou benefício para o grupo de origem)",
      "Propõe um critério plausível de distinção (ex.: reconhecimento da origem, diálogo com a comunidade, quem se beneficia economicamente)",
      "Evita simplificar o debate como \"proibido\" ou \"tudo permitido\"",
      "Argumenta de forma equilibrada, reconhecendo a complexidade do tema"
    ]
  },
  {
    "id": "dissert-artes-06",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "Movimentos musicais brasileiros, como a Tropicália nos anos 1960, uniram experimentação estética e crítica ao contexto político e social da época.",
    "comando": "Escolha um movimento ou gênero musical brasileiro que você conheça e explique de que forma ele funcionou (ou funciona) como forma de protesto ou crítica social, citando um exemplo concreto.",
    "pontosEsperados": [
      "Identifica corretamente um movimento/gênero e uma característica de sua proposta estética",
      "Relaciona o movimento a um contexto de crítica social ou política específico",
      "Cita um exemplo concreto (artista, canção ou obra)",
      "Evita generalidades vagas sobre \"música e sociedade\""
    ]
  },
  {
    "id": "dissert-artes-07",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "Ferramentas de inteligência artificial capazes de gerar imagens e textos a partir de descrições têm levantado debates sobre autoria, originalidade e direitos autorais na produção artística.",
    "comando": "Discuta se uma obra gerada por inteligência artificial, a partir de um comando de um usuário humano, pode ser considerada uma criação artística legítima, apresentando argumentos para sustentar sua posição.",
    "pontosEsperados": [
      "Apresenta uma posição clara sobre a questão (sim, não, ou parcialmente)",
      "Sustenta a posição com pelo menos um argumento consistente (papel da intenção humana, papel da técnica, originalidade do resultado)",
      "Demonstra noção do debate sobre autoria e direitos autorais envolvendo IA",
      "Evita resposta simplista sem desenvolvimento"
    ]
  },
  {
    "id": "dissert-artes-08",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "Centros históricos de diversas cidades brasileiras concentram edificações de valor patrimonial que, por vezes, entram em conflito com projetos de expansão imobiliária e infraestrutura urbana.",
    "comando": "Discuta o conflito entre preservação do patrimônio histórico-cultural e desenvolvimento urbano, apresentando um argumento a favor da preservação e um argumento a favor do desenvolvimento, e conclua com sua posição.",
    "pontosEsperados": [
      "Apresenta um argumento consistente a favor da preservação (identidade cultural, memória coletiva, turismo)",
      "Apresenta um argumento consistente a favor do desenvolvimento (moradia, mobilidade, crescimento econômico)",
      "Não trata o tema de forma unilateral",
      "Conclui com posição própria fundamentada, eventualmente propondo conciliação entre os dois lados"
    ]
  }
];
