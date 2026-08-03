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
  {
    "id": "dissert-humanas-09",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "A Declaração dos Direitos do Homem e do Cidadão, de 1789, proclamou a liberdade e a igualdade como direitos naturais e imprescritíveis. Poucos anos depois, a Constituição francesa de 1791 dividiu os cidadãos entre \"ativos\" e \"passivos\", reservando o direito de voto aos homens que pagassem certo valor em impostos.",
    "comando": "Explique a contradição entre o universalismo proclamado pelas revoluções liberais do fim do século XVIII e os limites concretos de cidadania que elas estabeleceram, e discuta como esse descompasso foi contestado ao longo do século XIX.",
    "pontosEsperados": [
      "Explica o princípio universalista da Declaração: direitos apresentados como naturais e válidos para todos",
      "Identifica limites concretos (voto censitário, exclusão das mulheres, manutenção da escravidão nas colônias)",
      "Aponta ao menos um movimento posterior de contestação (abolicionismo, sufragismo, movimento operário)",
      "Trata a contradição como problema histórico a ser explicado, e não como simples hipocrisia dos revolucionários"
    ]
  },
  {
    "id": "dissert-humanas-10",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "Entre 1945 e 1975, dezenas de colônias na África e na Ásia tornaram-se Estados independentes. Boa parte delas conquistou a independência no auge da disputa entre Estados Unidos e União Soviética, e várias se tornaram palco de conflitos armados apoiados por uma das duas potências.",
    "comando": "Explique de que forma a Guerra Fria influenciou os processos de descolonização afro-asiática e discuta, com um exemplo, por que a independência formal nem sempre significou autonomia política e econômica real.",
    "pontosEsperados": [
      "Relaciona a descolonização ao enfraquecimento das metrópoles europeias após a Segunda Guerra",
      "Explica como a disputa bipolar converteu países recém-independentes em área de disputa por influência",
      "Apresenta um exemplo concreto de autonomia limitada (dependência econômica, guerra por procuração, elites ligadas à antiga metrópole)",
      "Menciona uma alternativa buscada pelos próprios países, como a Conferência de Bandung ou o Movimento dos Não Alinhados"
    ]
  },
  {
    "id": "dissert-humanas-11",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "Na Primeira República (1889-1930), o voto era aberto e não havia Justiça Eleitoral independente: comissões do próprio Congresso decidiam quais eleitos tomariam posse, prática que ficou conhecida como \"degola\".",
    "comando": "Explique como o coronelismo e as regras eleitorais da Primeira República se sustentavam mutuamente e discuta uma mudança institucional posterior que buscou romper esse arranjo.",
    "pontosEsperados": [
      "Explica o coronelismo como troca de favores e proteção por apoio eleitoral, articulando poder local, estadual e federal",
      "Relaciona o voto aberto e a verificação de poderes pelo próprio Congresso à perpetuação das oligarquias",
      "Cita uma mudança institucional posterior (voto secreto, Justiça Eleitoral e voto feminino, no Código Eleitoral de 1932 e na Constituição de 1934)",
      "Explica por que essa mudança atingia o mecanismo descrito, em vez de apenas mencioná-la"
    ]
  },
  {
    "id": "dissert-humanas-12",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "A Lei de Anistia de 1979 permitiu o retorno de exilados políticos, mas passou a ser interpretada também como impedimento à responsabilização de agentes do Estado por tortura e desaparecimentos. Em 2010, o Supremo Tribunal Federal manteve essa interpretação; no mesmo ano, a Corte Interamericana de Direitos Humanos condenou o Brasil no caso Gomes Lund, sobre a Guerrilha do Araguaia.",
    "comando": "Explique o que se entende por justiça de transição e discuta a tensão entre a interpretação dada à Lei de Anistia no Brasil e os compromissos internacionais assumidos pelo país em matéria de direitos humanos.",
    "pontosEsperados": [
      "Explica justiça de transição como o conjunto de medidas adotadas por um país que sai de um regime autoritário (verdade, memória, reparação, responsabilização, reformas institucionais)",
      "Descreve corretamente a controvérsia sobre o alcance da Lei de Anistia de 1979",
      "Relaciona a questão a um compromisso internacional do Brasil, como a jurisdição da Corte Interamericana",
      "Reconhece a existência de argumentos consistentes dos dois lados, em vez de tratar a resposta como evidente"
    ]
  },
  {
    "id": "dissert-humanas-13",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "A partir dos anos 1970, o Cerrado passou a ser incorporado à produção de grãos em larga escala, com correção da acidez do solo e cultivares adaptadas. Mais recentemente, a expansão se deslocou para a região conhecida como MATOPIBA, que reúne áreas do Maranhão, Tocantins, Piauí e Bahia.",
    "comando": "Explique os fatores técnicos e econômicos que viabilizaram a incorporação do Cerrado como fronteira agrícola e discuta uma tensão socioambiental associada a esse processo.",
    "pontosEsperados": [
      "Aponta fatores técnicos concretos (correção e adubação do solo, melhoramento genético, mecanização)",
      "Relaciona a expansão a fatores econômicos (demanda internacional por grãos, preço da terra, logística de escoamento)",
      "Discute uma tensão socioambiental concreta (supressão de vegetação nativa, disputas fundiárias, impacto sobre recursos hídricos, concentração de terra)",
      "Evita tratar o tema apenas como sucesso produtivo ou apenas como devastação, reconhecendo o conflito entre os dois lados"
    ]
  },
  {
    "id": "dissert-humanas-14",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "A matriz elétrica brasileira é uma das mais limpas do mundo, com forte predomínio da geração hidrelétrica. Ainda assim, o país enfrenta acionamento de termelétricas em períodos de estiagem prolongada e discute a ampliação de fontes eólica e solar.",
    "comando": "Explique a diferença entre matriz elétrica e matriz energética e discuta por que uma matriz elétrica limpa não elimina, por si só, o desafio da transição energética brasileira.",
    "pontosEsperados": [
      "Distingue corretamente matriz elétrica (fontes de geração de eletricidade) de matriz energética (todo o consumo de energia, incluindo transportes e indústria)",
      "Explica a vulnerabilidade hídrica e o acionamento de termelétricas em períodos de estiagem",
      "Argumenta que o peso dos combustíveis fósseis no transporte e na indústria mantém o desafio da transição",
      "Usa os conceitos com precisão, sem tratar \"limpa\" e \"renovável\" como sinônimos"
    ]
  },
  {
    "id": "dissert-humanas-15",
    "area": "Humanas",
    "tempoSugerido": 25,
    "texto_apoio": "A Lei de Migração brasileira, de 2017, substituiu o antigo Estatuto do Estrangeiro, que tratava o tema sob a ótica da segurança nacional, por uma abordagem centrada nos direitos do migrante. Nos anos seguintes, o país recebeu fluxos expressivos vindos de países vizinhos e do Caribe.",
    "comando": "Explique a diferença entre refugiado e migrante econômico e discuta por que essa distinção jurídica, embora necessária, é insuficiente para dar conta de parte dos deslocamentos contemporâneos.",
    "pontosEsperados": [
      "Define refugiado a partir do fundado temor de perseguição ou de grave violação de direitos humanos, com proteção internacional específica",
      "Define migrante econômico como quem se desloca em busca de melhores condições de vida, sem essa proteção",
      "Aponta situações que tensionam a fronteira entre as categorias (colapso econômico, desastres ambientais, violência generalizada)",
      "Relaciona a discussão à mudança de paradigma trazida pela Lei de Migração de 2017"
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
  {
    "id": "dissert-linguagens-09",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "Dois textos publicados no mesmo jornal defendem posições sobre um projeto de lei. O primeiro não é assinado e ocupa a seção institucional do veículo. O segundo traz o nome e a qualificação profissional de quem escreve.",
    "comando": "Explique a diferença entre os gêneros editorial e artigo de opinião e discuta como o leitor deve considerar essa diferença ao avaliar a autoridade e os interesses por trás de cada texto.",
    "pontosEsperados": [
      "Identifica o editorial como posição institucional do veículo, sem assinatura individual",
      "Identifica o artigo de opinião como texto assinado, que responsabiliza um autor determinado",
      "Relaciona a diferença de autoria a uma consequência prática de leitura crítica (interesses do veículo x autoridade do especialista)",
      "Não confunde os dois com notícia ou reportagem, gêneros cujo compromisso é o relato dos fatos"
    ]
  },
  {
    "id": "dissert-linguagens-10",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "\"A empresa anunciou a demissão de 300 funcionários. Isso gerou reação imediata do sindicato. Ele convocou assembleia para a semana seguinte. A medida, porém, ainda não foi revertida.\"",
    "comando": "Identifique os mecanismos de coesão referencial usados no trecho, indicando a que cada elemento se refere, e explique como esses mecanismos garantem a progressão do texto sem repetição desnecessária.",
    "pontosEsperados": [
      "Identifica os referentes: \"isso\" retoma o anúncio das demissões, \"ele\" retoma o sindicato e \"a medida\" retoma a demissão",
      "Nomeia o mecanismo como coesão referencial, por retomada anafórica",
      "Explica a função de evitar repetição e encadear as informações já apresentadas",
      "Observa o valor adversativo de \"porém\" e, como ganho adicional, nota que \"a medida\" poderia gerar ambiguidade com a assembleia"
    ]
  },
  {
    "id": "dissert-linguagens-11",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "I. Campanha de trânsito: \"Se beber, não dirija.\"\nII. Verbete de dicionário: \"Dirigir. Verbo transitivo. Conduzir veículo.\"\nIII. Locutor ao microfone: \"Alô, alô, está me ouvindo?\"",
    "comando": "Identifique a função da linguagem predominante em cada um dos três enunciados e explique que marca concreta da construção de cada um permite reconhecê-la.",
    "pontosEsperados": [
      "Identifica a função conativa (apelativa) em I, centrada no receptor, com verbo no imperativo",
      "Identifica a função metalinguística em II, em que a linguagem explica a própria linguagem",
      "Identifica a função fática em III, voltada a testar ou manter o canal de contato",
      "Justifica cada identificação por uma marca do enunciado, em vez de apenas nomear a função"
    ]
  },
  {
    "id": "dissert-linguagens-12",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "I. \"O vento sussurrava segredos entre as folhas.\"\nII. \"Era um silêncio ensurdecedor.\"\nIII. \"Li Machado de Assis inteiro nas férias.\"",
    "comando": "Nomeie a figura de linguagem predominante em cada enunciado, classifique-a quanto ao tipo (figura de palavra, de pensamento ou de sintaxe) e explique o efeito de sentido que cada uma produz.",
    "pontosEsperados": [
      "Identifica a prosopopeia (personificação) em I e a reconhece como figura de pensamento",
      "Identifica o paradoxo (ou oximoro) em II, reconhecendo a união de termos contraditórios",
      "Identifica a metonímia em III, explicando a relação de contiguidade entre autor e obra",
      "Explica o efeito de sentido de cada figura, e não apenas a nomeia"
    ]
  },
  {
    "id": "dissert-linguagens-13",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "\"Fazem cinco anos que a lei foi aprovada, mas a maioria dos municípios ainda não se adequou à ela, o que tem gerado insegurança jurídica.\"",
    "comando": "Reescreva o período corrigindo os desvios em relação à norma culta e explique, para cada correção, qual regra a justifica.",
    "pontosEsperados": [
      "Corrige \"Fazem\" para \"Faz\", reconhecendo que o verbo fazer indicando tempo decorrido é impessoal e fica na terceira pessoa do singular",
      "Corrige \"à ela\" para \"a ela\", explicando que não há crase antes de pronome pessoal, que não admite artigo",
      "Preserva o sentido original do período na reescrita",
      "Justifica cada correção pela regra, em vez de apenas apresentar a versão corrigida"
    ]
  },
  {
    "id": "dissert-linguagens-14",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "\"Ela olhou o relógio na parede da sala. Não podia mais adiar aquilo. Por que sempre lhe faltava coragem na hora exata? Levantou-se e foi até a porta.\"",
    "comando": "Identifique o tipo de discurso empregado no trecho destacado pela pergunta e explique como o discurso indireto livre se distingue do discurso direto e do indireto, indicando o efeito que produz na narrativa.",
    "pontosEsperados": [
      "Reconhece o discurso indireto livre na pergunta, sem verbo de elocução nem marca gráfica",
      "Distingue do discurso direto (fala reproduzida literalmente, com travessão ou aspas) e do indireto (fala recontada pelo narrador, com verbo introdutor)",
      "Explica o efeito de fusão entre a voz do narrador e a consciência da personagem",
      "Relaciona o recurso ao acesso à subjetividade da personagem sem mediação explícita"
    ]
  },
  {
    "id": "dissert-linguagens-15",
    "area": "Linguagens",
    "tempoSugerido": 20,
    "texto_apoio": "I. Campanha publicitária de banco: \"Ser ou ter, eis a questão.\"\nII. Cartaz em protesto estudantil: \"No meio do caminho tinha uma taxa.\"",
    "comando": "Explique o recurso de intertextualidade presente em cada enunciado e discuta o efeito de sentido produzido pela retomada do texto de origem em cada caso.",
    "pontosEsperados": [
      "Reconhece a retomada de Shakespeare em I e de Carlos Drummond de Andrade em II",
      "Nomeia o recurso como intertextualidade e identifica a paródia, que retoma o texto de origem para desviá-lo",
      "Explica que o efeito depende de o leitor reconhecer o texto retomado, o que torna o repertório parte do argumento",
      "Discute a diferença de propósito entre a apropriação publicitária e a apropriação de protesto"
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
  },
  {
    "id": "dissert-artes-09",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "Eduardo Coutinho começou a filmar, em 1964, a história de um líder camponês assassinado na Paraíba. O golpe militar interrompeu as filmagens. Dezessete anos depois, o diretor retomou o projeto, reencontrou os antigos participantes e incorporou ao filme a própria história de sua interrupção.",
    "comando": "Explique como a estrutura de \"Cabra marcado para morrer\" transforma a interrupção do projeto em matéria do próprio filme e discuta o que essa escolha revela sobre a relação entre documentário, memória e história política.",
    "pontosEsperados": [
      "Descreve a estrutura em duas camadas temporais: o filme interrompido em 1964 e o reencontro nos anos 1980",
      "Explica que o documentário assume a própria interrupção como tema, em vez de escondê-la",
      "Relaciona a obra à ditadura militar e ao trabalho de memória sobre esse período",
      "Discute o documentário como construção de um ponto de vista, e não como registro neutro do real"
    ]
  },
  {
    "id": "dissert-artes-10",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "\"Cidade de Deus\" (2002), de Fernando Meirelles e Kátia Lund, retrata a formação do crime organizado em um conjunto habitacional do Rio de Janeiro usando montagem acelerada, câmera nervosa e cores saturadas. O filme foi elogiado pela potência estética e criticado por, segundo alguns analistas, tornar a violência atraente ao espectador.",
    "comando": "Discuta a tensão entre denúncia social e espetacularização da violência no cinema, posicionando-se sobre em que condições a elaboração estética da violência fortalece ou enfraquece a crítica social pretendida.",
    "pontosEsperados": [
      "Relaciona escolhas concretas de linguagem (montagem, câmera, cor, trilha) ao efeito produzido no espectador",
      "Apresenta o argumento da denúncia: dar visibilidade a uma realidade social sistematicamente ignorada",
      "Apresenta o argumento crítico: o tratamento estético pode converter sofrimento em produto de consumo",
      "Assume posição própria e a sustenta, em vez de apenas expor os dois lados"
    ]
  },
  {
    "id": "dissert-artes-11",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "Em \"Dom Casmurro\", de Machado de Assis, toda a história do suposto adultério de Capitu chega ao leitor pela voz de Bentinho, que narra décadas depois, já convencido da traição, e é ao mesmo tempo parte interessada no julgamento que apresenta.",
    "comando": "Explique o que é um narrador não confiável e discuta como essa construção narrativa transforma a leitura da obra e a posição atribuída ao leitor.",
    "pontosEsperados": [
      "Define narrador não confiável como aquele cuja versão o próprio texto dá motivos para questionar",
      "Identifica os elementos que tornam Bentinho suspeito: narração em primeira pessoa, parte interessada, distância temporal, ausência de contraprova",
      "Explica o deslocamento do leitor, convertido em juiz da narrativa",
      "Evita reduzir a obra à pergunta \"Capitu traiu ou não\", reconhecendo que a construção da narração é o próprio tema"
    ]
  },
  {
    "id": "dissert-artes-12",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "\"Vidas secas\" (1938), de Graciliano Ramos, acompanha uma família de retirantes cuja linguagem é reduzida ao mínimo, quase animal. \"Torto Arado\" (2019), de Itamar Vieira Junior, narra a vida de trabalhadoras de uma comunidade rural na Chapada Diamantina, presas a uma relação de trabalho que se perpetua muito depois da abolição.",
    "comando": "Compare as duas obras quanto ao modo como articulam trabalho, terra e desigualdade, e discuta o que a distância de oitenta anos entre elas revela sobre a permanência do tema na literatura brasileira.",
    "pontosEsperados": [
      "Caracteriza corretamente cada obra quanto a ambientação, personagens e conflito central",
      "Identifica um procedimento estético distinto em cada uma (a linguagem seca e o foco narrativo em Graciliano; a narração em vozes femininas e o registro da oralidade em Itamar Vieira Junior)",
      "Estabelece comparação explícita, e não duas descrições paralelas",
      "Discute a permanência da questão agrária e do trabalho precário como tema da literatura brasileira, sem tratar as obras como equivalentes"
    ]
  },
  {
    "id": "dissert-artes-13",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "Em \"As Origens do Totalitarismo\" (1951), Hannah Arendt sustenta que o totalitarismo não é apenas uma tirania mais violenta, mas uma forma inédita de dominação, que combina ideologia total e terror para tornar os seres humanos supérfluos e destruir a espontaneidade e a pluralidade.",
    "comando": "Explique por que Arendt considera o totalitarismo uma forma de dominação inédita e discuta a pertinência de usar esse conceito para analisar regimes autoritários contemporâneos.",
    "pontosEsperados": [
      "Explica com precisão o que distingue o totalitarismo de uma ditadura convencional: ideologia total, terror e a supressão da pluralidade",
      "Explica o sentido de tornar os seres humanos \"supérfluos\", ligado à destruição da capacidade de agir e de iniciar algo novo",
      "Discute com cuidado a aplicação do conceito ao presente, reconhecendo o risco de esvaziá-lo pelo uso genérico",
      "Trabalha o conceito com precisão, em vez de usar \"totalitarismo\" como sinônimo de autoritarismo"
    ]
  },
  {
    "id": "dissert-artes-14",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "Em \"Racismo, sexismo e desigualdade no Brasil\", Sueli Carneiro argumenta que raça e gênero não podem ser tratados como eixos separados de desigualdade no país, e critica tanto um feminismo que ignora a experiência das mulheres negras quanto um antirracismo que ignora a desigualdade de gênero.",
    "comando": "Explique por que, segundo essa perspectiva, tratar raça e gênero separadamente produz uma análise insuficiente da desigualdade brasileira, e discuta uma consequência prática dessa articulação para a formulação de políticas públicas.",
    "pontosEsperados": [
      "Explica que raça e gênero se combinam e produzem uma posição social específica, não sendo desvantagens meramente somadas",
      "Relaciona o argumento ao mito da democracia racial e à crítica de que ele mascara desigualdades reais",
      "Aponta uma consequência prática concreta para políticas públicas (desenho de dados desagregados, critérios de ações afirmativas, políticas de saúde ou de trabalho)",
      "Atribui corretamente as ideias: Sueli Carneiro é a principal referência brasileira dessa articulação, enquanto o termo interseccionalidade foi cunhado por Kimberlé Crenshaw em 1989"
    ]
  },
  {
    "id": "dissert-artes-15",
    "area": "Artes",
    "tempoSugerido": 25,
    "texto_apoio": "\"Guernica\" (1937), de Pablo Picasso, responde ao bombardeio de uma cidade basca durante a Guerra Civil Espanhola com figuras fragmentadas, em preto, branco e cinza, sem qualquer referência realista ao episódio. \"Abaporu\" (1928), de Tarsila do Amaral, apresenta uma figura de proporções desconformes em uma paisagem de cores planas e saturadas.",
    "comando": "Explique como cada obra constrói sentido por meio da deformação da figura humana e discuta de que modo cada uma se vincula ao contexto histórico e cultural em que foi produzida.",
    "pontosEsperados": [
      "Analisa procedimentos plásticos concretos (fragmentação e ausência de cor em Picasso; desproporção e cor saturada em Tarsila)",
      "Relaciona \"Guernica\" ao bombardeio de 1937 e à denúncia da violência da guerra",
      "Relaciona \"Abaporu\" ao modernismo brasileiro e ao projeto antropofágico de deglutir influências estrangeiras",
      "Argumenta que a deformação é escolha expressiva deliberada, e não falha de representação"
    ]
  }
];
