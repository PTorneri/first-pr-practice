// Achado 1 (conteúdo teórico por frente): resumo curto + "gatilhos" (padrão
// do enunciado → método de resolução) + "pegadinhas" (armadilhas recorrentes)
// por frente. Conteúdo original, escrito com base no formato conhecido das
// provas objetivas da FGV Direito SP e do Insper (base original:
// estudo-provas-fgv-insper.pdf) — não é cópia de nenhuma prova real nem do
// site concorrente analisado em analise-app-concorrente.pdf.
//
// Revisão 2026-07: gatilhos/pegadinhas refinados com base em
// estudo-formulacao-provas-objetivas-fgv-vunesp-enem-fuvest-2016-2025.pdf,
// um estudo mais rigoroso (60 células matéria×banca) que aprofunda método de
// formulação, lógica de distratores e frequência de temas para FGV Direito,
// Vunesp, ENEM e Fuvest. Priorizamos sempre a célula FGV Direito (o que este
// app realmente treina); onde a evidência pública da FGV é fraca ou ausente
// (muitas células marcam isso explicitamente), usamos Vunesp/ENEM/Fuvest como
// inferência por analogia de estilo — nunca como dado direto da FGV — e
// sinalizamos isso no comentário de cada frente afetada.
window.THEORY = {
  "interpretacao-texto": {
    resumo: "A banca cobra leitura crítica, não decoreba: ideia central, relação entre parágrafos, função de conectivos e a diferença entre \"o que o texto diz\" e \"o que se pode inferir dele\".",
    gatilhos: [
      "\"Qual a ideia central/tese do texto?\" → releia o último parágrafo antes de decidir; ele costuma retomar/resumir a tese.",
      "\"De acordo com o texto...\" → a resposta precisa ter base literal no texto; elimine alternativas plausíveis mas não sustentadas por ele.",
      "Pergunta sobre a função de um conectivo (mas, portanto, embora, contudo) → identifique a relação lógica (oposição, conclusão, concessão) antes de olhar as alternativas.",
      "\"Sentido conotativo/figurado de uma palavra no texto\" → substitua mentalmente a palavra pelo sentido literal e veja se o parágrafo ainda faz sentido; se sim, é conotativo.",
      "Pergunta sobre o público-alvo ou veículo de publicação do texto → observe o registro de linguagem (formal/informal) e referências temporais/culturais.",
      "Texto-base muito curto (1 parágrafo ou até uma frase só) → não espere confirmação redundante; a banca testa se você capta a relação lógica implícita num espaço mínimo de texto.",
      "Pedido de reescrita/equivalência semântica (\"pode ser reescrito, sem alteração de sentido, por\") → cuidado com reformulações que trocam uma relação de concessão por uma de causa — é o erro mais citado nesse formato.",
    ],
    pegadinhas: [
      "Alternativa que repete palavras do texto mas inverte a relação de causa e efeito.",
      "Alternativa \"quase certa\" que generaliza demais algo que o texto disse com ressalvas.",
      "Confundir a opinião do autor com a opinião de uma voz citada dentro do texto (discurso indireto ou citação).",
      "Escolher a alternativa mais \"bem escrita\" em vez da mais fiel ao texto — a banca testa fidelidade, não estilo.",
      "Quando o texto de apoio é curto e denso, a banca não dá \"sobra\" de informação — cada frase carrega peso; não descarte um detalhe por parecer secundário.",
    ],
    subtemas: [
      {
        tema: "Interpretação de notícias e artigos de opinião",
        resumo: "Notícias relatam fatos com atribuição de fonte, buscando (idealmente) minimizar a intenção autoral aparente; artigos de opinião/editoriais defendem uma tese explícita, misturando fato verificável com juízo de valor. A habilidade central é identificar em que ponto exato um texto deixa de relatar e passa a argumentar.",
        gatilhos: [
          "Texto é uma notícia (não opinião) → busque o \"lide\" (quem, o quê, quando, onde, por quê) nos primeiros parágrafos; a tese, se houver, é do fato relatado, não do jornalista.",
          "Texto é artigo de opinião/editorial → identifique a tese defendida logo no início ou fim, e separe fato (dado verificável) de opinião (juízo de valor) linha a linha.",
          "Pergunta sobre \"intenção\" do autor de uma notícia → cuidado: notícia bem escrita minimiza intenção autoral aparente; se o enunciado sugere forte intenção, provavelmente é texto de opinião disfarçado de notícia.",
        ],
        pegadinhas: [
          "Tratar toda afirmação dentro de uma notícia como opinião do jornalista — pode ser fala atribuída a uma fonte citada, não posição do veículo.",
          "Confundir manchete (resumo/chamariz) com a tese completa do texto — a manchete simplifica, às vezes de forma enganosa.",
        ],
        exemplo: {
          enunciado: "Uma reportagem descreve, com dados de uma pesquisa oficial, o aumento do desemprego em determinado setor, sem emitir juízo de valor sobre as causas. Um artigo de opinião publicado no dia seguinte, no mesmo veículo, defende que esse aumento é consequência direta de uma política econômica específica. A diferença central entre os dois textos está em:",
          resolucao: "A reportagem se limita a relatar um dado verificável (aumento do desemprego) sem julgar suas causas — função informativa. O artigo de opinião vai além: atribui uma causa específica e defende essa interpretação — função argumentativa. A resposta correta identifica essa diferença de função textual (informar vs. argumentar); a pegadinha comum é achar que o texto de opinião é menos confiável só por ser opinativo — não é isso que a banca testa aqui.",
        },
      },
      {
        tema: "Argumentação e tipos de argumento em textos",
        resumo: "Tipos de argumento recorrentes: de autoridade (citar especialista/dado), por exemplo/ilustração (usar um caso pra sustentar afirmação geral) e por analogia (comparar duas situações). Reconhecer o TIPO de argumento usado ajuda a identificar sua força ou fragilidade, algo frequentemente cobrado.",
        gatilhos: [
          "Texto cita um especialista ou instituição pra sustentar um ponto → é argumento de autoridade; questione se a autoridade citada é pertinente ao tema, não só \"famosa\".",
          "Texto usa um caso específico pra sustentar uma afirmação geral → é argumento por exemplo/ilustração; verifique se o caso é realmente representativo ou é exceção isolada.",
          "Texto compara duas situações pra defender um ponto → é argumento por analogia; a força do argumento depende de quão semelhantes as duas situações realmente são.",
        ],
        pegadinhas: [
          "Aceitar automaticamente um argumento de autoridade sem verificar se a autoridade citada tem relação com o tema específico do texto.",
          "Confundir argumento por exemplo (um caso ilustrando uma tese já colocada) com generalização apressada (tirar uma regra geral de um único caso, sem essa tese prévia).",
        ],
        exemplo: {
          enunciado: "Um texto defende que um determinado modelo de gestão pública é eficiente citando o caso de uma única cidade que o adotou com sucesso, sem mencionar outros exemplos ou dados mais amplos. Essa estratégia argumentativa é mais bem descrita como:",
          resolucao: "O texto sustenta uma afirmação de alcance geral (o modelo é eficiente) usando apenas um caso particular como evidência — argumento por exemplo/ilustração usado de forma frágil: um único caso não comprova eficácia geral, é apenas um indício. A resposta correta reconhece o tipo de argumento e sua fragilidade lógica; a pegadinha é tratar o argumento como \"comprovação\" só porque há um caso real citado.",
        },
      },
      {
        tema: "Interpretação de textos publicitários e persuasivos",
        resumo: "Textos publicitários usam técnicas específicas: apelo emocional, informação incompleta destacando só benefícios, linguagem figurada (hipérbole, duplo sentido). A habilidade central é separar a técnica persuasiva da afirmação factual por trás dela.",
        gatilhos: [
          "Texto publicitário com apelo emocional explícito (medo, desejo, pertencimento) → identifique a emoção-alvo e o que ela tenta fazer você aceitar sem checar dados.",
          "Slogan com duplo sentido ou trocadilho → não pare no sentido literal; a eficácia está na ambiguidade proposital entre dois significados.",
          "Texto que promove um produto/ideia listando só vantagens → desconfie de omissão seletiva; pergunte o que NÃO está sendo dito.",
        ],
        pegadinhas: [
          "Tratar linguagem publicitária figurada (hipérbole, metáfora) como afirmação literal a ser julgada como verdadeira ou falsa.",
          "Ignorar o público-alvo implícito de uma peça publicitária — o mesmo produto é vendido com argumentos diferentes pra públicos diferentes.",
        ],
        exemplo: {
          enunciado: "Uma peça publicitária de um banco apresenta a frase \"Sua liberdade financeira começa aqui\", associada a imagens de uma pessoa viajando sozinha. O texto não menciona taxas, juros ou condições do produto anunciado. Essa construção ilustra, principalmente:",
          resolucao: "O anúncio usa apelo emocional (liberdade, autonomia) associado a uma imagem aspiracional, sem fornecer informação factual sobre o produto — a técnica clássica de vender uma sensação, não especificações técnicas. A resposta correta identifica o apelo emocional combinado à omissão seletiva de informação; a pegadinha é tratar a frase como uma promessa literal e objetiva a ser avaliada por sua veracidade financeira.",
        },
      },
      {
        tema: "Leitura de textos científicos de divulgação",
        resumo: "Textos de divulgação científica simplificam achados de pesquisa para um público geral, às vezes exagerando ou distorcendo nuances do estudo original. A habilidade central é distinguir o que a pesquisa de fato encontrou (frequentemente correlação) do que a versão popularizada afirma (às vezes causalidade indevida).",
        gatilhos: [
          "Texto de divulgação científica cita \"um estudo mostrou que...\" → preste atenção à diferença entre correlação (dois fatores aparecem juntos) e causalidade (um causa o outro) — é a pegadinha mais comum nesse gênero.",
          "Texto usa dado numérico de uma pesquisa → confira se o texto está generalizando um resultado específico (uma amostra, um contexto) pra uma conclusão ampla demais.",
          "Comparação entre \"o que a pesquisa disse\" e \"o que a manchete/resumo popular disse\" → é comum a versão popularizada simplificar ou distorcer uma nuance do estudo original.",
        ],
        pegadinhas: [
          "Tratar toda afirmação de um texto de divulgação científica como cientificamente comprovada sem checar se o texto está de fato citando causalidade ou só correlação.",
          "Assumir que um resultado obtido numa amostra pequena/específica se aplica automaticamente à população em geral.",
        ],
        exemplo: {
          enunciado: "Uma reportagem de divulgação científica afirma: \"pesquisa relaciona consumo de determinado alimento a menor incidência de uma doença\" e conclui, no título, que \"comer esse alimento previne a doença\". O texto da pesquisa original, porém, menciona apenas uma associação estatística observada, sem mecanismo causal comprovado. Essa diferença entre título e pesquisa ilustra:",
          resolucao: "O título transforma uma correlação estatística em uma afirmação causal (\"previne\"), o que a pesquisa original não afirma. A resposta correta reconhece esse salto indevido de correlação para causalidade, comum em textos de divulgação científica que simplificam pra ganhar apelo de manchete; a pegadinha é aceitar a conclusão do título como cientificamente estabelecida só porque cita \"uma pesquisa\" como fonte.",
        },
      },
    ],
  },
  "gramatica": {
    resumo: "Concordância verbal/nominal, regência, crase, pontuação e coesão textual — sempre aplicados a frases de contexto real, não frases soltas de decoreba.",
    gatilhos: [
      "Sujeito composto antes do verbo → concorda no plural; se resumido por \"tudo/nada/ninguém\", o verbo vai para o singular.",
      "\"a\"/\"à\" antes de palavra feminina → confira a regência do verbo (ele exige \"a\"?) e se há artigo antes do substantivo.",
      "Vírgula antes de \"que\" → confira se a oração é explicativa (usa vírgula) ou restritiva (sem vírgula) — muda o sentido da frase.",
      "\"Reescreva mantendo o sentido\" → cuidado com mudança de regência ao trocar o verbo (ex.: \"assistir o filme\" informal vs. \"assistir ao filme\" norma culta).",
      "Frase com gerúndio expressando algo que ainda vai acontecer (\"vou estar analisando\", \"estarei enviando\") → é gerundismo, considerado incorreto; só é aceito o gerúndio de ação concomitante/simultânea.",
      "Frase reescrita com \"é que\" no meio (partícula expletiva) → confira se ela desloca indevidamente o foco/ênfase da oração original; a banca testa reconhecer esse deslocamento como estilístico, não como erro automático.",
    ],
    pegadinhas: [
      "Concordância com \"a maioria dos/a maior parte de\" — pode concordar no singular (com o núcleo) ou no plural (com o termo posposto); a banca cobra reconhecer que ambas existem, não decorar uma única regra.",
      "Crase antes de palavra masculina — nunca ocorre; é a pegadinha mais repetida em provas objetivas.",
      "Regência distinta entre verbos como \"perceber\" (transitivo direto) e \"aspirar a\" (transitivo indireto), confundida pelo uso oral comum.",
      "Pontuação de aposto e vocativo — esquecer a vírgula de fechamento quando o aposto está no meio da frase.",
      "A questão de gramática quase sempre reaproveita o texto-base da questão de interpretação anterior — não trate como tópico isolado; procure o trecho sublinhado ou reescrito dentro do mesmo texto.",
    ],
    subtemas: [
      {
        tema: "Concordância verbal e nominal",
        resumo: "Concordância verbal (verbo concorda com o sujeito) e nominal (adjetivo/artigo concorda com o substantivo) parecem simples isoladamente, mas são cobradas por meio de estruturas de sujeito mais elaboradas: sujeito composto posposto, substantivo coletivo, expressões partitivas como \"a maioria de\".",
        gatilhos: [
          "Sujeito composto posposto ao verbo (o verbo vem antes) → pode concordar no plural (com todo o sujeito) ou no singular (com o núcleo mais próximo) — ambas as formas existem na norma culta.",
          "Substantivo coletivo no singular como sujeito (\"a equipe\", \"o grupo\") → o verbo concorda no singular com o coletivo, mesmo se o sentido for de várias pessoas.",
          "Expressão partitiva (\"a maioria de\", \"grande parte de\") seguida de substantivo plural → o verbo pode concordar tanto com a expressão (singular) quanto com o substantivo plural — a banca testa reconhecer as duas possibilidades.",
        ],
        pegadinhas: [
          "Achar que existe só UMA forma correta de concordância com sujeito composto posposto ou expressão partitiva — a norma culta aceita mais de uma.",
          "Aplicar a mesma regra de concordância verbal (com o núcleo) à concordância nominal (adjetivo com múltiplos substantivos), que segue lógica própria de gênero/proximidade.",
        ],
        exemplo: {
          enunciado: "Na frase \"Chegaram ao evento o diretor e sua equipe\", a concordância verbal está correta porque:",
          resolucao: "O sujeito composto (\"o diretor e sua equipe\") vem depois do verbo — nessa posição, a norma culta aceita a concordância no plural com o sujeito composto inteiro, reconhecendo os dois elementos coordenados como núcleo somado. A resposta correta identifica que essa é uma das formas aceitas justamente pela posposição do sujeito; a pegadinha seria achar que o verbo deveria concordar obrigatoriamente só com o elemento mais próximo (\"equipe\", singular) — não é obrigatória, é uma alternativa válida também.",
        },
      },
      {
        tema: "Regência verbal e nominal",
        resumo: "Regência define qual preposição (se alguma) liga um verbo ou nome ao seu complemento. Pares clássicos contrastam uso formal e coloquial (\"assistir a\" vs. o coloquial sem preposição), e a regência muda conforme o sentido do verbo (\"aspirar\" desejar × inalar).",
        gatilhos: [
          "Verbo \"assistir\" no sentido de \"ver\" → exige a preposição \"a\" na norma culta (\"assistir ao filme\"), mesmo sendo comum na fala cotidiana omitir a preposição.",
          "Verbo \"aspirar\" no sentido de \"desejar\" → é transitivo indireto, exige \"a\" (\"aspirar a um cargo\"); no sentido de \"inalar\", é transitivo direto, sem preposição.",
          "Adjetivo seguido de complemento (\"favorável a\", \"apto para\") → cada adjetivo tem regência própria; não generalize a preposição de um adjetivo pra outro parecido.",
        ],
        pegadinhas: [
          "Aplicar a regência do uso oral/informal (sem preposição) em contexto que exige norma culta — a prova sempre testa o padrão formal.",
          "Confundir dois sentidos do mesmo verbo que mudam a regência (\"assistir\" ver × ajudar; \"aspirar\" desejar × inalar) e aplicar a regência errada pro sentido do enunciado.",
        ],
        exemplo: {
          enunciado: "Na frase \"O médico aspira uma vaga na diretoria do hospital\", há um desvio de regência verbal porque, na norma culta, o verbo \"aspirar\" no sentido de \"desejar\" deveria ser seguido de:",
          resolucao: "No sentido de \"desejar/almejar\", o verbo \"aspirar\" é transitivo indireto e exige a preposição \"a\" (\"aspira a uma vaga\"), diferente do sentido de \"inalar\", transitivo direto. A frase do enunciado usa o verbo sem a preposição no sentido de desejo, o que é desvio da norma culta. A resposta correta identifica a ausência da preposição \"a\"; a pegadinha é confundir os dois sentidos do verbo e não perceber qual dos dois está sendo usado.",
        },
      },
      {
        tema: "Uso da crase",
        resumo: "Crase é a fusão da preposição \"a\" com o artigo feminino \"a\"/\"as\", marcada pelo acento (à/às); ocorre quando um verbo/expressão exige a preposição \"a\" E a palavra seguinte admite o artigo feminino. Gatilhos comuns: locuções adverbiais femininas, horas, verbos que regem \"a\".",
        gatilhos: [
          "Locução adverbial feminina de tempo/modo (\"à noite\", \"às pressas\", \"à vontade\") → geralmente leva crase, mesmo sem artigo explícito visível — são expressões cristalizadas.",
          "Antes de palavra masculina → NUNCA há crase; é o teste mais rápido pra descartar a hipótese.",
          "Antes de verbo no infinitivo → NUNCA há crase (o \"a\" antes de verbo é preposição pura, sem artigo possível).",
        ],
        pegadinhas: [
          "Colocar crase por \"força do hábito\" antes de qualquer palavra feminina, sem checar se o verbo/expressão realmente exige a preposição \"a\".",
          "Esquecer que \"à distância\" e horas específicas (\"às 14h\") seguem a mesma lógica de locução feminina, mesmo não parecendo um \"lugar\" clássico com artigo.",
        ],
        exemplo: {
          enunciado: "Na frase \"Ele se referiu a situação de forma cuidadosa\", falta a crase porque:",
          resolucao: "O verbo \"referir-se\" exige a preposição \"a\", e \"situação\" é palavra feminina que admite artigo definido — a fusão da preposição exigida pelo verbo com o artigo feminino produz a crase: \"referiu-se à situação\". A resposta correta identifica os dois requisitos simultâneos (preposição exigida pelo regente + artigo feminino possível no regido); a pegadinha é achar que basta a palavra ser feminina para haver crase, sem checar se o verbo de fato exige a preposição \"a\".",
        },
      },
      {
        tema: "Coesão textual e conectivos",
        resumo: "Coesão são os elos gramaticais/lexicais que amarram o texto entre frases e parágrafos (pronomes retomando algo, sinônimos evitando repetição, conectivos sinalizando relações lógicas de oposição/causa/adição). É cobrada perguntando a função de um conectivo ou pronome específicos.",
        gatilhos: [
          "Pronome (\"ele\", \"isso\", \"tal fato\") no meio/fim de um parágrafo → identifique exatamente a QUE elemento anterior do texto ele se refere, não assuma pelo contexto geral.",
          "Conectivo de oposição (\"mas\", \"porém\", \"contudo\", \"no entanto\") → confirme que a segunda oração de fato contraria/restringe a primeira, não apenas acrescenta informação.",
          "Conectivo de causa/consequência (\"portanto\", \"logo\", \"por isso\") → verifique que a relação lógica é mesmo causal, não apenas uma sequência temporal de fatos.",
        ],
        pegadinhas: [
          "Assumir que um pronome retoma sempre o substantivo mais próximo no texto — às vezes retoma um elemento mais distante, ou a ideia de uma oração inteira.",
          "Trocar mentalmente um conectivo por outro de sentido parecido sem checar se a relação lógica muda (ex.: trocar \"embora\" (concessão) por \"porque\" (causa) altera completamente o sentido).",
        ],
        exemplo: {
          enunciado: "No trecho \"A cidade cresceu rapidamente nas últimas décadas; isso trouxe tanto oportunidades quanto desafios de infraestrutura\", o termo \"isso\" retoma:",
          resolucao: "O pronome \"isso\" não se refere a uma palavra isolada da frase anterior, mas à ideia completa expressa por ela — o crescimento rápido da cidade. A resposta correta reconhece que pronomes desse tipo frequentemente retomam uma oração ou fato inteiro, não um substantivo específico; a pegadinha é tentar encaixar \"isso\" numa única palavra do texto, perdendo a retomada da ideia como um todo.",
        },
      },
      {
        tema: "Colocação pronominal e paralelismo sintático",
        resumo: "Colocação pronominal (próclise/ênclise/mesóclise) depende do que precede o verbo (palavras negativas e certas conjunções atraem próclise); paralelismo sintático exige que elementos coordenados em uma lista mantenham a mesma estrutura gramatical (ex.: não misturar infinitivos com substantivos numa mesma enumeração).",
        gatilhos: [
          "Frase iniciada por palavra negativa, pronome relativo ou certas conjunções (\"não\", \"que\", \"quando\") → atrai o pronome pra antes do verbo (próclise), mesmo em início de oração.",
          "Enunciado pedindo pra identificar erro de paralelismo → localize uma lista/enumeração e confira se todos os itens seguem a MESMA estrutura gramatical (todos substantivos, todos infinitivos, etc.).",
          "Início absoluto de frase com pronome oblíquo átono → na norma culta escrita formal, evite começar frase com pronome átono; espere a banca testar isso como erro a corrigir.",
        ],
        pegadinhas: [
          "Aplicar próclise ou ênclise \"de ouvido\", sem checar se há palavra atrativa (negação, conjunção subordinativa, pronome relativo) antes do verbo.",
          "Não perceber quebra de paralelismo quando os itens de uma lista são gramaticalmente parecidos mas não idênticos.",
        ],
        exemplo: {
          enunciado: "Na frase \"O projeto busca incentivar a leitura, promover debates e a escrita criativa\", há uma quebra de paralelismo porque:",
          resolucao: "A enumeração começa com dois verbos no infinitivo (\"incentivar\", \"promover\") mas o terceiro item muda pra um substantivo (\"a escrita criativa\") em vez de manter a estrutura verbal. A resposta correta identifica a mudança de categoria gramatical no meio da lista como quebra de paralelismo; a pegadinha é não perceber a inconsistência porque as três ideias fazem sentido juntas — paralelismo é sobre estrutura gramatical, não sobre coerência de conteúdo.",
        },
      },
    ],
  },
  "matematica-rlm": {
    resumo: "Porcentagem, proporção, progressões, probabilidade e lógica proposicional aplicadas a situações do cotidiano (finanças, esportes, sorteios) — o desafio raramente é a fórmula, é modelar o enunciado corretamente.",
    gatilhos: [
      "\"Aumentou X% e depois diminuiu X%\" (ou o inverso) → nunca volta ao valor original; o fator composto é 1 − (X/100)².",
      "\"Imposto/acréscimo sobre o valor final\" → a base do cálculo não é o valor original; resolva de trás para frente a partir do valor final.",
      "\"Dividir uma conta/corrida/tarefa proporcionalmente ao que cada um gastaria/faria\" → regra de três ou divisão proporcional, nunca divisão igual.",
      "\"Cresce/decresce a uma taxa fixa por período\", sem mais qualificação → assuma juros compostos (crescimento exponencial), salvo indicação explícita de \"juros simples\".",
      "Dois aumentos (ou descontos) sucessivos e diferentes → multiplique os fatores (1+i₁)(1+i₂); nunca some os percentuais diretamente.",
      "\"Todo mês/dia/segundo, dois eventos periódicos coincidem de novo\" → calcule o MMC dos períodos, mas confira se o problema pede o ciclo inteiro ou só um subintervalo dele.",
      "Questão sem gráfico/imagem, só texto e números → é o padrão desta banca; não espere apoio visual como em ENEM/Fuvest — o enunciado sozinho deve conter todos os dados.",
      "Cálculo de combinatória/probabilidade com mais de uma etapa → pare e confira se você considerou TODAS as combinações possíveis antes de aplicar a fórmula final; o erro mais citado é parar a contagem no penúltimo passo.",
      "Equação de reta a partir de dois pontos → confira o sinal do coeficiente angular e a ordem dos pontos usada no cálculo — é o erro de execução mais citado em geometria analítica desta banca.",
    ],
    pegadinhas: [
      "Somar percentuais em vez de multiplicar fatores em aumentos/descontos sucessivos (\"20% + 20% = 40%\" está errado).",
      "Confundir \"percentual sobre o valor final\" com \"percentual sobre o valor original\".",
      "Dividir uma conta ou corrida igualmente quando o enunciado pede divisão proporcional ao esforço/participação de cada um.",
      "Em problemas de MMC com ciclos assimétricos, assumir que o ciclo inteiro fica no estado \"coincidente\" — na prática, só a interseção real dos subintervalos conta.",
      "Trocar a ordem de eventos dependentes em probabilidade (calcular como se fossem independentes quando não são).",
      "Subestimar matrizes e determinantes — é um tema com peso relativo MAIOR nesta banca do que em outras provas de vestibular geral.",
    ],
    subtemas: [
      {
        tema: "Porcentagem, juros simples e compostos",
        resumo: "Juros simples incidem sempre sobre o capital ORIGINAL a cada período; juros compostos incidem sobre o saldo já acumulado (juro sobre juro). A diferença entre os dois regimes aparece já a partir do segundo período e cresce com o tempo — reconhecer qual regime o enunciado pede é mais importante do que decorar a fórmula.",
        gatilhos: [
          "Enunciado diz \"juros simples\" explicitamente → o juro de cada período é sempre calculado sobre o valor ORIGINAL (capital inicial), nunca sobre o saldo acumulado.",
          "Enunciado diz \"juros compostos\" ou não especifica (padrão default é composto) → o juro de cada período incide sobre o saldo já acumulado.",
          "Pergunta pede pra comparar o montante final de juros simples vs. compostos no mesmo prazo → compostos superam simples a partir do segundo período (no primeiro período são iguais).",
        ],
        pegadinhas: [
          "Calcular juros compostos como se fossem simples (multiplicar taxa × períodos direto sobre o capital original) — erro clássico de quem não lê com atenção qual regime o enunciado pede.",
          "Achar que juros simples e compostos dão o mesmo resultado em qualquer prazo curto — já no segundo período a diferença aparece.",
        ],
        exemplo: {
          enunciado: "Um capital de R$ 1.000 é aplicado por 2 anos a uma taxa de 10% ao ano. Comparando o montante final sob juros simples e sob juros compostos, é correto afirmar que:",
          resolucao: "Em juros simples, o montante é 1000 + 1000×0,10×2 = 1200. Em juros compostos, o montante é 1000×(1,10)² = 1210. A resposta correta reconhece que o montante composto (1210) é maior que o simples (1200), porque no segundo ano o juro composto incide sobre o saldo já acrescido de juro do primeiro ano. A pegadinha é achar que os dois regimes dão resultados iguais no curto prazo — a diferença já aparece a partir do segundo período.",
        },
      },
      {
        tema: "Progressões aritméticas e geométricas",
        resumo: "Progressão aritmética cresce SOMANDO a mesma quantidade fixa a cada passo (razão = diferença); progressão geométrica cresce MULTIPLICANDO pelo mesmo fator a cada passo (razão = divisão entre termos). Reconhecer se um crescimento real é aditivo ou multiplicativo é o núcleo do tema, mais do que aplicar fórmulas.",
        gatilhos: [
          "Sequência de valores que cresce SOMANDO a mesma quantidade fixa a cada passo → é progressão aritmética; a razão é uma diferença entre termos consecutivos.",
          "Sequência que cresce MULTIPLICANDO pelo mesmo fator a cada passo (ex.: dobra, triplica) → é progressão geométrica; a razão é uma divisão entre termos consecutivos.",
          "Enunciado descreve crescimento \"a uma taxa fixa por período\" em valor absoluto (reais, unidades) → é PA; se for taxa percentual constante → é PG — não confunda os dois tipos de \"taxa fixa\".",
        ],
        pegadinhas: [
          "Tratar qualquer sequência crescente como progressão aritmética por padrão, sem checar se o crescimento é por soma constante ou por fator constante.",
          "Calcular a razão de uma PG como se fosse PA (subtraindo termos em vez de dividir) quando os valores crescem por multiplicação.",
        ],
        exemplo: {
          enunciado: "Uma empresa registra vendas mensais que seguem a sequência 100, 150, 225, 337,5, ... unidades. Essa sequência é melhor descrita como uma progressão:",
          resolucao: "Dividindo cada termo pelo anterior: 150/100 = 1,5; 225/150 = 1,5; 337,5/225 = 1,5 — a razão entre termos consecutivos é constante e multiplicativa, caracterizando uma progressão geométrica de razão 1,5, não aritmética (a diferença entre termos não é constante: 50, depois 75). A pegadinha é olhar só pra diferença entre os dois primeiros termos e concluir precipitadamente que é PA, sem checar se essa diferença se mantém constante ao longo de toda a sequência.",
        },
      },
      {
        tema: "Probabilidade e análise combinatória básica",
        resumo: "Probabilidade básica é favoráveis/total, mas a dificuldade real está em contar corretamente com combinatória — decidir se a ORDEM dos elementos importa (arranjo/permutação) ou não (combinação) — e em reconhecer eventos dependentes vs. independentes em sequências de sorteios.",
        gatilhos: [
          "Problema de contagem onde a ORDEM dos elementos escolhidos importa (ex.: pódio, senha) → é arranjo/permutação; se a ordem NÃO importa (ex.: escolher um grupo, uma comissão) → é combinação.",
          "Dois eventos sucessivos onde o resultado do primeiro afeta as opções do segundo (ex.: tirar uma carta sem repor) → são dependentes; multiplique probabilidades ajustando o total a cada etapa.",
          "Pergunta pede probabilidade de \"pelo menos um\" evento ocorrer → geralmente é mais rápido calcular a probabilidade do complementar (\"nenhum ocorrer\") e subtrair de 1.",
        ],
        pegadinhas: [
          "Aplicar fórmula de combinação quando o problema pede arranjo (ou vice-versa) por não checar se a ordem dos elementos importa no contexto descrito.",
          "Tratar eventos sucessivos como independentes quando o enunciado descreve uma situação SEM reposição.",
        ],
        exemplo: {
          enunciado: "De um grupo de 8 pessoas, deseja-se formar uma comissão de 3 integrantes, sem distinção de função entre eles. De quantas formas essa comissão pode ser formada?",
          resolucao: "Como a comissão não distingue função entre os 3 integrantes, a ORDEM de escolha não importa — é um problema de combinação: C(8,3) = 8!/(3!×5!) = 56. A pegadinha mais comum é usar arranjo (8×7×6 = 336) por esquecer de dividir pelas permutações internas dos 3 escolhidos, que não devem ser contadas como comissões diferentes já que não há distinção de função.",
        },
      },
      {
        tema: "Lógica proposicional e tabela-verdade",
        resumo: "O ponto mais cobrado e mais contraintuitivo é a condicional (\"se P, então Q\"): ela é falsa SOMENTE quando P é verdadeira e Q é falsa — em todos os outros casos, incluindo quando P é falsa, a condicional é verdadeira. Negação de proposições compostas segue as leis de De Morgan, e negação de quantificadores (\"todo\"/\"algum\") tem regra própria.",
        gatilhos: [
          "Proposição condicional (\"se P, então Q\") → é falsa SOMENTE quando P é verdadeira e Q é falsa; nos outros três casos (incluindo P falsa) a condicional é verdadeira.",
          "Pergunta pede a NEGAÇÃO de uma proposição composta → aplique as leis de De Morgan: negar \"P e Q\" vira \"não P ou não Q\"; negar \"P ou Q\" vira \"não P e não Q\".",
          "Proposição do tipo \"todo/nenhum/algum\" (quantificadores) → a negação de \"todo X é Y\" é \"existe pelo menos um X que não é Y\", não \"nenhum X é Y\".",
        ],
        pegadinhas: [
          "Achar que uma condicional com antecedente falso é automaticamente falsa — pelo contrário, ela é verdadeira nesse caso, por definição lógica.",
          "Negar \"todo\" como \"nenhum\" em vez de \"existe algum que não\" — é o erro de quantificador mais citado nesse tema.",
        ],
        exemplo: {
          enunciado: "Considere a proposição \"Se chove, então a rua fica molhada\". Sabendo que hoje NÃO choveu, o que se pode concluir sobre o valor lógico dessa proposição condicional?",
          resolucao: "Uma condicional só é falsa quando o antecedente é verdadeiro e o consequente é falso; quando o antecedente (\"chove\") é falso, a condicional inteira é considerada verdadeira, independentemente do consequente. A resposta correta reconhece que a proposição permanece verdadeira; a pegadinha é achar que, sem chuva, a condicional \"quebra\" ou fica indefinida — na lógica formal ela é verdadeira por vacuidade do antecedente.",
        },
      },
      {
        tema: "Geometria básica: área e perímetro",
        resumo: "O desafio raramente é a fórmula em si, mas identificar corretamente qual conceito o enunciado pede (área = superfície/cobertura; perímetro = contorno/cercamento) e, em figuras compostas, decompor em formas simples somando ou subtraindo áreas.",
        gatilhos: [
          "Figura composta (retângulo + triângulo, ou forma com um pedaço \"recortado\") → divida em formas simples conhecidas e some (ou subtraia) as áreas separadamente.",
          "Problema menciona \"cercar\" ou \"murar\" um terreno → é perímetro (medida linear), não área.",
          "Problema menciona \"cobrir\", \"pintar\" ou \"pavimentar\" uma superfície → é área, não perímetro.",
        ],
        pegadinhas: [
          "Confundir área com perímetro pela palavra-chave do enunciado, lendo rápido demais e aplicando a fórmula errada.",
          "Em figuras compostas, esquecer de SUBTRAIR uma área \"vazada\" (buraco, recorte) em vez de somar todas as partes visíveis.",
        ],
        exemplo: {
          enunciado: "Um terreno retangular de 20m por 15m tem, no seu interior, uma piscina circular de raio 3m. Deseja-se plantar grama em toda a área do terreno, exceto onde está a piscina. Qual operação determina a área a ser gramada?",
          resolucao: "\"Plantar grama\" é um problema de área, não de perímetro. A área total do terreno é 20×15 = 300 m². A área da piscina (círculo) é π×3² ≈ 28,3 m², que deve ser SUBTRAÍDA da área total. A resposta correta calcula 300 − π×3²; a pegadinha é esquecer de subtrair a área da piscina e usar apenas a área total do terreno.",
        },
      },
    ],
  },
  "ingles": {
    resumo: "100% reading comprehension — não há gramática isolada. O desafio é vocabulário em contexto, inferência e identificar a ideia central de um texto jornalístico ou de opinião. Prova própria e obrigatória para todo candidato nesta banca — sem opção de Espanhol como em outros vestibulares.",
    gatilhos: [
      "Palavra desconhecida no meio do texto → não pare; o contexto ao redor (frase anterior e seguinte) quase sempre entrega o sentido aproximado.",
      "\"What is the main idea of the passage?\" → confira o título e a primeira/última frase do parágrafo-chave antes de decidir.",
      "\"According to the author...\" → a resposta precisa ter base literal no texto, não no que você acha que é verdade sobre o tema.",
      "Falsos cognatos (\"actually\", \"pretend\", \"parents\", \"push\") → desconfie sempre que a tradução literal para o português soar estranha na frase.",
      "Texto em inglês tratando de tema institucional/de direitos humanos ou debate público → é o padrão mais provável de texto-base nesta banca; não espere texto puramente literário ou de entretenimento.",
    ],
    pegadinhas: [
      "Escolher a alternativa que é verdadeira no mundo real mas não é o que o texto especificamente afirma.",
      "Traduzir um falso cognato pelo sentido em português (\"actually\" = \"na verdade\", não \"atualmente\").",
      "Confundir o tom do autor (crítico, irônico, neutro) com o tom de uma citação dentro do texto.",
    ],
    subtemas: [
      {
        tema: "Reading comprehension: textos sobre tecnologia e sociedade",
        resumo: "Como a prova é 100% reading comprehension, textos sobre tecnologia e sociedade recorrem com frequência. A habilidade cobrada é a mesma de interpretação de texto em português (ideia central, posição do autor, inferência) aplicada em inglês — o vocabulário técnico tende a ser mais cognato do que parece à primeira vista.",
        gatilhos: [
          "Texto em inglês sobre tecnologia (IA, redes sociais, privacidade) → aplique a mesma estratégia de interpretação de português: ideia central primeiro, detalhes depois.",
          "Palavra técnica em inglês que você não reconhece (ex.: \"algorithm\", \"surveillance\") → normalmente são cognatos parecidos com o português (\"algoritmo\", \"vigilância\") — teste a semelhança antes de assumir que não sabe a palavra.",
          "Pergunta sobre a posição do autor em relação à tecnologia discutida → releia o parágrafo final; textos de opinião em inglês, como em português, costumam fechar retomando a tese.",
        ],
        pegadinhas: [
          "Tentar traduzir o texto palavra por palavra em vez de buscar a ideia geral do parágrafo — trava a leitura e consome tempo desnecessário na prova.",
          "Assumir que um texto sobre tecnologia em inglês será mais técnico/difícil do que realmente é — a banca usa vocabulário de divulgação geral, não jargão especializado.",
        ],
        exemplo: {
          enunciado: "A text in English discusses how social media platforms use algorithms to keep users engaged for longer periods. The author states: \"This is not accidental — it is the business model.\" What is the author's main point?",
          resolucao: "A frase \"it is the business model\" indica que o autor afirma que a retenção de atenção do usuário é uma escolha deliberada e estrutural das plataformas, não um efeito colateral não intencional. A resposta correta capta essa ideia central; a pegadinha é escolher uma alternativa que trate o fenômeno como acidental ou puramente técnico, ignorando a palavra-chave \"business model\", que aponta pra intencionalidade econômica.",
        },
      },
      {
        tema: "Falsos cognatos (false friends) em inglês",
        resumo: "Falsos cognatos são palavras parecidas com o português mas com sentido diferente. Além dos exemplos já cobertos no bloco geral (actually, pretend, parents, push), o padrão de reconhecimento é sempre o mesmo: se a tradução literal soa estranha na frase, desconfie.",
        gatilhos: [
          "Palavra em inglês parecida com uma em português, mas o sentido da frase fica estranho se traduzida literalmente → é sinal de falso cognato; procure o sentido real pelo contexto.",
          "\"Actually\" no meio de uma frase → significa \"na verdade\", não \"atualmente\" (que seria \"currently\" ou \"nowadays\").",
          "\"Pretend\" → significa \"fingir\", não \"pretender\" (que seria \"intend\" ou \"plan to\").",
        ],
        pegadinhas: [
          "Traduzir \"parents\" como \"parentes\" — na verdade significa especificamente \"pais\"; \"parentes\" em geral seria \"relatives\".",
          "Traduzir \"push\" como algo relacionado a \"puxar\" — na verdade significa \"empurrar\"; \"puxar\" é \"pull\".",
        ],
        exemplo: {
          enunciado: "In the sentence \"She was pretending to be interested in the meeting\", the word \"pretending\" means, in Portuguese:",
          resolucao: "\"Pretend\" é falso cognato de \"pretender\" — na verdade significa \"fingir\". A frase diz que ela estava FINGINDO estar interessada na reunião, não que ela \"pretendia\" estar interessada — isso mudaria completamente o sentido. A pegadinha é traduzir pelo som parecido com \"pretendendo\", produzindo um sentido que faz sentido gramatical mas está semanticamente errado.",
        },
      },
      {
        tema: "Vocabulário e interpretação de textos em inglês",
        resumo: "Além dos falsos cognatos, a habilidade geral de vocabulário em contexto é inferir o sentido de palavras desconhecidas pela frase anterior/seguinte, sem precisar traduzir cada palavra — muitas perguntas podem ser respondidas sem conhecer 100% do vocabulário do texto.",
        gatilhos: [
          "Palavra desconhecida cujo sentido não é óbvio nem por semelhança com o português → olhe a frase anterior e a seguinte; o contexto normalmente entrega uma pista suficiente, mesmo sem tradução exata.",
          "Palavra desconhecida aparece só UMA vez e a pergunta não depende diretamente dela → não perca tempo tentando traduzi-la; foque no que a pergunta realmente exige saber.",
          "Pergunta de vocabulário pede o sinônimo mais próximo de uma palavra sublinhada → releia a frase substituindo mentalmente cada opção e veja qual mantém o sentido original.",
        ],
        pegadinhas: [
          "Parar a leitura inteira por causa de uma única palavra desconhecida, perdendo tempo de prova.",
          "Escolher o sinônimo \"mais parecido na forma\" com a palavra original em vez do que realmente mantém o SENTIDO da frase.",
        ],
        exemplo: {
          enunciado: "In the sentence \"The company's revenue plummeted after the scandal\", the word \"plummeted\" most likely means:",
          resolucao: "Mesmo sem conhecer a palavra \"plummeted\", o contexto (receita da empresa após um escândalo) sugere fortemente uma queda acentuada. A resposta correta aponta pra \"caiu bruscamente\"; a pegadinha é escolher uma opção que soe parecida com alguma palavra conhecida em português em vez de usar o contexto da frase pra inferir o sentido.",
        },
      },
    ],
  },
  "historia-brasil": {
    resumo: "Do período colonial à redemocratização, com ênfase recorrente em república, cidadania, movimentos sociais e a relação entre economia e política em cada período. Formato dominante nesta banca: afirmativas numeradas (I, II, III...) julgadas por corretude, não pergunta única direta.",
    gatilhos: [
      "Pergunta sobre \"causas\" de um evento → pense em pelo menos 2 fatores (econômico + político/social), a banca raramente aceita causa única.",
      "Comparação entre dois períodos (ex.: Primeira República × Era Vargas) → organize por eixo (economia, política, sociedade) antes de comparar.",
      "Trecho de fonte primária (discurso, carta, manifesto) → identifique quem fala, pra quem, e com que intenção, antes de ligar ao contexto histórico.",
      "Enunciado com afirmativas numeradas I, II, III (, IV) sobre um processo histórico → julgue cada uma isoladamente antes de olhar as combinações de resposta; é o formato mais comum desta banca em História, não pergunta única direta.",
      "Trecho de manifesto/carta/decreto histórico ligado a um movimento de direitos civis → espere uma afirmativa que generalize indevidamente o alcance do documento histórico para um debate político atual — é o distrator mais citado quando a banca cruza História com Direitos Humanos.",
    ],
    pegadinhas: [
      "Datar eventos por \"década aproximada\" quando a prova pede o marco exato (ex.: confundir Proclamação da República com Constituição de 1891).",
      "Atribuir uma mudança social só à vontade de um governante, ignorando pressão de movimentos sociais/econômicos que a antecederam.",
      "Confundir nomes de instituições/siglas semelhantes de períodos diferentes.",
      "Uma das afirmativas do bloco costuma ser \"quase certa\" por trocar a causa real de um evento por outra plausível do mesmo período — não decida pela plausibilidade isolada, decida pela precisão da relação causal.",
    ],
    subtemas: [
      {
        tema: "Brasil Colônia: economia açucareira e mineração",
        resumo: "A economia colonial se organizou em ciclos de exportação ligados à demanda europeia: açúcar (século XVII, Nordeste, mão de obra escravizada em plantation) e depois ouro/mineração (século XVIII, Minas Gerais, deslocando o eixo demográfico e político pra região Centro-Sul). Ambos os ciclos se estruturaram sob o pacto colonial (comércio exclusivo com Portugal) e dependeram fortemente de trabalho escravizado.",
        gatilhos: [
          "Texto sobre ciclo econômico colonial (açúcar ou mineração) → identifique sempre três elementos: região concentrada, tipo de mão de obra predominante (majoritariamente escravizada), e a relação com o pacto colonial.",
          "Mudança do eixo econômico da colônia (Nordeste açucareiro → Minas Gerais mineradora) → ligue à mudança de eixo demográfico e político da colônia.",
          "Pergunta sobre \"decadência\" de um ciclo econômico → pense em concorrência externa (para o açúcar, produção antilhana) e esgotamento de reservas (para o ouro), não um fator único isolado.",
        ],
        pegadinhas: [
          "Tratar os ciclos econômicos coloniais como fases estanques e totalmente separadas — havia sobreposição temporal e regional entre atividades econômicas diferentes.",
          "Reduzir a mineração em Minas Gerais só ao ouro, esquecendo a importância também dos diamantes e da estrutura fiscal específica criada pela Coroa (como a derrama).",
        ],
        exemplo: {
          enunciado: "Um texto descreve a transição do eixo econômico da colônia portuguesa na América, do litoral nordestino açucareiro para a região das Minas Gerais no século XVIII, acompanhada de intensa fiscalização da Coroa sobre a extração de metais preciosos. Essa transição é mais bem explicada por:",
          resolucao: "A descoberta de ouro em Minas Gerais deslocou o centro econômico e demográfico da colônia para o interior, exigindo da Coroa um aparato fiscal mais rígido (como o quinto e a derrama) pra garantir sua parte da riqueza extraída, dentro da lógica do pacto colonial. A resposta correta liga a mudança de eixo econômico à descoberta do ouro e à resposta fiscal da metrópole; a pegadinha é tratar a mineração como continuação direta do modelo açucareiro, ignorando as diferenças entre os dois ciclos.",
        },
      },
      {
        tema: "Independência e Império do Brasil",
        resumo: "A independência (1822) foi uma ruptura negociada e relativamente conservadora — manteve a monarquia, a escravidão e boa parte da elite colonial no poder, diferente de rupturas populares mais radicais. O Império (1822-1889) se divide em Primeiro Reinado, período Regencial e Segundo Reinado, cada um com tensões políticas próprias entre centralização e autonomia provincial.",
        gatilhos: [
          "Pergunta sobre \"o que mudou e o que continuou\" na independência → pense no que permaneceu (monarquia, escravidão, elite agrária no poder) tanto quanto no que mudou (ruptura formal com Portugal).",
          "Trecho sobre revoltas regionais durante o período Regencial (Cabanagem, Farroupilha, Sabinada) → ligue a tensões entre centralização do poder imperial e autonomia das províncias.",
          "Pergunta sobre abolição gradual da escravidão no Império (Lei do Ventre Livre, Lei dos Sexagenários, Lei Áurea) → organize cronologicamente e associe cada lei ao grupo social que ela afetava.",
        ],
        pegadinhas: [
          "Tratar a independência do Brasil como uma ruptura total e revolucionária, no estilo das independências hispano-americanas — o processo brasileiro manteve monarquia e boa parte da estrutura social colonial.",
          "Confundir Primeiro Reinado, período Regencial e Segundo Reinado como uma fase única e homogênea do Império.",
        ],
        exemplo: {
          enunciado: "Um texto aponta que, diferentemente da maior parte das independências na América espanhola, a independência do Brasil manteve a forma de governo monárquica e preservou a instituição da escravidão por décadas. Essa característica é mais bem interpretada como evidência de que a independência brasileira foi, sobretudo, um processo de:",
          resolucao: "A manutenção da monarquia e da escravidão logo após a independência mostra que a ruptura política com Portugal não implicou uma transformação radical da estrutura social e econômica da antiga colônia. A resposta correta identifica isso como continuidade estrutural combinada a ruptura política formal; a pegadinha é tratar a independência brasileira como equivalente, em profundidade de ruptura social, às independências republicanas da América espanhola.",
        },
      },
      {
        tema: "Era Vargas e Estado Novo",
        resumo: "O período Vargas (1930-1945) se divide em uma fase inicial mais pluralista (1930-37) e o Estado Novo (1937-45), ditadura com censura, partidos banidos e poder concentrado no Executivo. O tema central é a tensão entre as reformas trabalhistas de Vargas (CLT, direitos trabalhistas via sindicalismo corporativista controlado pelo Estado) e a repressão política simultânea.",
        gatilhos: [
          "Texto sobre legislação trabalhista da Era Vargas (CLT, salário mínimo, carteira de trabalho) → ligue ao projeto corporativista do Estado Novo de controlar sindicatos via Estado, não só \"dar direitos\".",
          "Pergunta sobre o Estado Novo (1937-1945) → identifique elementos de regime autoritário (censura, partidos políticos banidos, poder concentrado no Executivo) — diferente do período anterior de Vargas, mais pluralista.",
          "Comparação entre Vargas \"pai dos pobres\" e Vargas \"ditador\" → a banca testa se você reconhece as duas facetas simultâneas.",
        ],
        pegadinhas: [
          "Tratar toda a Era Vargas (1930-1945) como um único bloco autoritário — o Estado Novo é uma fase específica e mais repressiva dentro do período.",
          "Descrever os direitos trabalhistas da CLT como conquista puramente popular, sem mencionar o controle estatal sobre os sindicatos que acompanhava essas leis.",
        ],
        exemplo: {
          enunciado: "Um texto descreve que, durante o Estado Novo, o governo simultaneamente ampliou direitos trabalhistas por meio de legislação específica e reprimiu duramente a oposição política, banindo partidos e censurando a imprensa. Essa combinação de medidas é característica de um projeto político:",
          resolucao: "A combinação de concessões sociais com repressão política e controle centralizado do Estado é típica de regimes autoritários de base populista/corporativista, que buscam legitimidade popular por meio de benefícios concretos enquanto eliminam a competição política organizada. A pegadinha é escolher uma alternativa que descreva o período como puramente repressivo ou puramente progressista, ignorando uma das duas faces.",
        },
      },
      {
        tema: "Ditadura militar e redemocratização",
        resumo: "A ditadura militar (1964-1985) teve intensidade repressiva variável, com o AI-5 (1968) marcando o agravamento máximo (censura ampla, fechamento do Congresso, cassação de direitos políticos). A redemocratização foi um processo gradual conduzido em boa parte pelos próprios militares (\"abertura lenta, gradual e segura\"), culminando na Constituição de 1988; eleições diretas para presidente só retornaram em 1989.",
        gatilhos: [
          "Pergunta sobre o AI-5 (1968) → é o marco do recrudescimento da repressão — não confunda com o golpe de 1964 em si, que é anterior e menos repressivo em comparação.",
          "Texto sobre \"abertura\" política nos anos 1970-80 → identifique que foi um processo gradual e controlado pelo próprio regime militar, não uma ruptura súbita.",
          "Pergunta sobre a Constituição de 1988 → ligue ao processo de redemocratização e à ampliação de direitos sociais/civis em reação ao período autoritário anterior.",
        ],
        pegadinhas: [
          "Tratar a ditadura militar como um bloco homogêneo de repressão constante — houve variação de intensidade, com o AI-5 marcando um agravamento específico.",
          "Confundir a primeira eleição direta pós-ditadura (1989) com o fim formal do regime militar (1985, eleição indireta de Tancredo Neves) — são marcos distintos.",
        ],
        exemplo: {
          enunciado: "Um texto afirma que a transição do regime militar brasileiro para a democracia foi conduzida, em boa parte, pelos próprios líderes militares, por meio de um processo definido oficialmente como gradual, ao longo da década de 1970 e início dos anos 1980. Essa característica da redemocratização brasileira é conhecida como:",
          resolucao: "O processo de abertura política controlada pelo próprio regime militar é conhecido pela expressão oficial da época: abertura \"lenta, gradual e segura\". A pegadinha é confundir isso com uma ruptura popular repentina, quando o texto descreve exatamente o oposto: uma transição negociada e administrada pelos próprios militares.",
        },
      },
    ],
  },
  "historia-geral": {
    resumo: "Revoluções, guerras mundiais, Guerra Fria e globalização — com foco em processos de longa duração e nas conexões entre eventos, não datas isoladas. Mesmo formato dominante de História do Brasil nesta banca: afirmativas numeradas (I, II, III...) julgadas por corretude.",
    gatilhos: [
      "Pergunta sobre \"consequências\" de um evento → pense em curto E longo prazo; a banca gosta de testar efeitos que só apareceram décadas depois.",
      "Comparação entre dois blocos/ideologias (capitalismo × socialismo, por exemplo) → organize por critério (economia, poder político, direitos individuais) antes de escrever.",
      "Mapa ou linha do tempo no enunciado → localize primeiro o período/região exatos antes de aplicar conhecimento geral do tema.",
      "Enunciado com afirmativas numeradas I, II, III (, IV) sobre um processo histórico mundial → julgue cada afirmativa isoladamente antes de olhar as combinações — é o formato mais comum desta banca.",
      "Regime autoritário do século XX (nazismo, fascismo, ditaduras latino-americanas) → cruze sempre com um debate atual de democracia/direitos humanos — a banca tende a ligar os dois.",
    ],
    pegadinhas: [
      "Tratar processos históricos como binários (\"só causa X\" ou \"só causa Y\") quando o gabarito espera reconhecer multicausalidade.",
      "Confundir a cronologia de eventos próximos (ex.: ordem entre tratados/conferências de um mesmo período).",
      "Aplicar um conceito europeu (ex.: \"revolução industrial\") de forma genérica demais a um contexto fora da Europa sem as devidas ressalvas.",
      "Cuidado com afirmativa que estica um processo histórico (ex.: \"Era das Revoluções\") para além do período em que de fato ocorreu — é o tipo de erro de generalização temporal mais citado neste cluster.",
    ],
    subtemas: [
      {
        tema: "Revolução Francesa e Iluminismo",
        resumo: "O Iluminismo forneceu a base intelectual (razão, direitos naturais, soberania popular, separação de poderes) que alimentou a Revolução Francesa (1789). A Revolução em si passou por fases distintas — moderada inicial, radicalização do Terror, e ascensão napoleônica — cada uma com atores e lógicas diferentes; tratá-la como evento único é o erro mais comum.",
        gatilhos: [
          "Texto cita valores como razão, direitos naturais, soberania popular ou separação de poderes → ligue ao Iluminismo como base intelectual, mesmo sem citar nome de filósofo.",
          "Pergunta sobre uma fase específica da Revolução Francesa → identifique se é a fase moderada inicial, o Terror (radicalização jacobina) ou o período napoleônico posterior — são fases bem diferentes.",
          "Comparação entre a Revolução Francesa e outro processo revolucionário → organize por critério (quem liderou, que classe se beneficiou, o que mudou na estrutura de poder) antes de comparar.",
        ],
        pegadinhas: [
          "Tratar a Revolução Francesa como um evento único e homogêneo — teve fases com objetivos e violência política muito diferentes entre si.",
          "Atribuir a Revolução Francesa exclusivamente às ideias iluministas, ignorando fatores econômicos e sociais concretos (crise fiscal, desigualdade entre os \"estados\" sociais).",
        ],
        exemplo: {
          enunciado: "Um texto descreve que, entre 1789 e 1799, a Revolução Francesa passou por momentos de reforma moderada, depois por intensa violência política contra opositores internos, e terminou com a ascensão de um líder militar ao poder centralizado. Essa descrição evidencia, principalmente, que a Revolução Francesa foi:",
          resolucao: "A descrição de fases distintas evidencia que a Revolução Francesa não foi um evento uniforme, mas um processo com múltiplas fases e rupturas internas ao longo de uma década. A pegadinha é escolher uma alternativa que descreva a Revolução como um movimento único e coerente do início ao fim.",
        },
      },
      {
        tema: "Revolução Industrial",
        resumo: "A industrialização (Inglaterra, final do século XVIII) transformou a produção de artesanal para mecanizada/fabril, causando urbanização acelerada e novas classes sociais (burguesia industrial, proletariado urbano); ocorreu em ondas sucessivas (não um evento pontual), cada uma associada a tecnologias diferentes (vapor, depois eletricidade/petróleo).",
        gatilhos: [
          "Pergunta sobre \"causas\" da Revolução Industrial começar na Inglaterra → pense em múltiplos fatores combinados (capital do comércio colonial, carvão disponível, mão de obra disponível, estabilidade política) — não aceite causa única.",
          "Texto sobre condições de trabalho no início da industrialização → ligue à formação da classe operária urbana e ao surgimento posterior de movimentos sociais/sindicais.",
          "Menção a \"primeira\", \"segunda\" revolução industrial → identifique a tecnologia-chave de cada fase (vapor/carvão na primeira; eletricidade e petróleo na segunda).",
        ],
        pegadinhas: [
          "Tratar a Revolução Industrial como um evento pontual e instantâneo, quando foi um processo de décadas com fases tecnológicas distintas.",
          "Reduzir os impactos da industrialização só ao avanço tecnológico, sem considerar as mudanças sociais profundas (urbanização, novas classes sociais).",
        ],
        exemplo: {
          enunciado: "Um texto descreve que a industrialização inglesa do século XVIII combinou capital acumulado do comércio internacional, reservas abundantes de carvão, disponibilidade de mão de obra migrante do campo e um ambiente político relativamente estável. A partir desse texto, é correto afirmar que a Revolução Industrial inglesa é mais bem explicada por:",
          resolucao: "O texto lista explicitamente múltiplos fatores combinados como condições conjuntas, não um fator isolado. A pegadinha é escolher uma alternativa que aponte um único fator (só o carvão, ou só o capital comercial) como \"a\" causa, quando o próprio texto já apresenta multicausalidade.",
        },
      },
      {
        tema: "Primeira e Segunda Guerras Mundiais",
        resumo: "A Primeira Guerra (1914-18) teve um estopim (assassinato em Sarajevo) distinto de suas causas estruturais (sistema de alianças, corrida armamentista, imperialismo, nacionalismo). A Segunda Guerra (1939-45) tem raízes parcialmente nas tensões não resolvidas da Primeira (Tratado de Versalhes) somadas à ascensão de regimes totalitários. Separar \"estopim\" de \"causa estrutural\" é a habilidade central testada.",
        gatilhos: [
          "Pergunta sobre a \"causa\" da Primeira Guerra Mundial → separe o estopim (assassinato do arquiduque Francisco Ferdinando) das causas estruturais (alianças, corrida armamentista, imperialismo, nacionalismo).",
          "Texto liga o Tratado de Versalhes ao surgimento do nazismo → é conexão causal real e frequentemente cobrada: as duras condições impostas à Alemanha alimentaram ressentimento nacionalista explorado depois pelo nazismo.",
          "Comparação entre as duas guerras mundiais → organize por escala e por resultado geopolítico (reconfiguração de fronteiras e blocos de poder).",
        ],
        pegadinhas: [
          "Tratar o assassinato em Sarajevo como \"a causa\" da Primeira Guerra, em vez de reconhecê-lo como o estopim de tensões estruturais já existentes.",
          "Isolar o nazismo como fenômeno puramente alemão/individual, sem conectar às condições criadas pelo Tratado de Versalhes.",
        ],
        exemplo: {
          enunciado: "Um texto afirma que o assassinato do arquiduque Francisco Ferdinando, em 1914, é frequentemente citado como o evento que iniciou a Primeira Guerra Mundial, mas argumenta que esse evento, isoladamente, não explica por que o conflito se espalhou rapidamente por praticamente toda a Europa. O texto está destacando a diferença entre:",
          resolucao: "O texto distingue o evento desencadeador imediato (o estopim) das condições estruturais pré-existentes que transformaram um conflito bilateral potencial numa guerra continental. A pegadinha é tratar o assassinato como suficiente, sozinho, para explicar a escala do conflito.",
        },
      },
      {
        tema: "Guerra Fria e descolonização afro-asiática",
        resumo: "A Guerra Fria (1947-1991) foi disputa ideológica/geopolítica bipolar sem confronto militar direto entre as superpotências, mas com conflitos por procuração. A descolonização da África e Ásia ocorreu majoritariamente NESSE contexto, com nações recém-independentes frequentemente cortejadas ou pressionadas pelos dois blocos — o Movimento dos Países Não Alinhados foi a tentativa de uma terceira via.",
        gatilhos: [
          "Texto sobre conflito regional durante a Guerra Fria (Coreia, Vietnã) → identifique que raramente foi conflito bilateral isolado; costuma ser confronto por procuração entre as duas superpotências.",
          "Processo de independência de um país africano ou asiático no século XX → ligue ao contexto simultâneo da Guerra Fria: potências recém-independentes eram cortejadas ou pressionadas pelos dois blocos.",
          "Menção a \"Movimento dos Países Não Alinhados\" → é a tentativa de países recém-independentes de não se filiarem formalmente a nenhum dos dois blocos.",
        ],
        pegadinhas: [
          "Tratar processos de descolonização como desconectados da disputa Guerra Fria — na prática os dois processos se sobrepõem e se influenciam mutuamente.",
          "Achar que a Guerra Fria envolveu confronto militar direto entre EUA e URSS — o confronto direto nunca ocorreu; os conflitos armados foram sempre por procuração.",
        ],
        exemplo: {
          enunciado: "Um texto descreve que, ao conquistar sua independência na década de 1960, um país africano recebeu simultaneamente ofertas de apoio econômico e militar de potências alinhadas a dois blocos ideológicos rivais, o que gerou pressão interna para que o novo governo escolhesse um lado. Esse cenário ilustra a relação entre:",
          resolucao: "O texto descreve um país recém-independente sendo disputado por duas potências rivais — ilustra como a descolonização afro-asiática ocorreu sob influência da disputa bipolar da Guerra Fria. A pegadinha é tratar a independência como processo puramente interno, desconectado da geopolítica global da época.",
        },
      },
    ],
  },
  "geografia": {
    resumo: "Urbanização, migrações, geopolítica de recursos e questão ambiental — o subtema mais estável entre as provas: quase sempre aparece ligado a um dado ou mapa concreto, não teoria pura. Geopolítica internacional é \"o foco\" declarado oficialmente desta banca em Geografia — mais forte que os demais subtemas.",
    gatilhos: [
      "Gráfico ou tabela com dados de população/produção → leia o eixo e a unidade antes de qualquer alternativa; erros de leitura de escala são o erro nº 1 aqui.",
      "\"Consequência da urbanização acelerada\" → pense em pelo menos: infraestrutura, moradia irregular, mobilidade — não pare na primeira ideia.",
      "Questão sobre matriz energética → separe fontes renováveis de não-renováveis antes de avaliar vantagens/desvantagens.",
      "Mapa de fluxo migratório → identifique origem, destino e o motivo (econômico, ambiental, conflito) antes de aplicar teoria.",
      "Enunciado com afirmativas numeradas I, II, III sobre tema geopolítico ou econômico → julgue cada afirmativa isoladamente antes de olhar as combinações de resposta; é o formato dominante desta banca em Geografia.",
      "Charge política representando muro/fronteira fechada → não assuma o caso real específico; identifique a causa geopolítica mais plausível (conflito territorial, crise econômica, disputa por recursos) sem forçar um país/conflito não indicado.",
    ],
    pegadinhas: [
      "Confundir êxodo rural (do campo para a cidade) com fluxos migratórios internacionais no mesmo enunciado.",
      "Aplicar um dado desatualizado de memória (ex.: ranking de maiores economias) quando a prova fornece um gráfico com dado atual diferente — sempre priorize o dado do enunciado.",
      "Tratar \"país desenvolvido\" e \"baixa taxa de natalidade\" como sinônimos sem checar exceções apontadas no próprio texto/gráfico.",
      "Extrapolar uma tendência observada em UM país/bloco para o mundo todo (ou o inverso) — sempre confira a abrangência exata do dado/gráfico antes de generalizar.",
    ],
    subtemas: [
      {
        tema: "Urbanização e migrações no Brasil",
        resumo: "A urbanização brasileira foi rápida e concentrada num período curto (a partir de meados do século XX), impulsionada pelo êxodo rural — mecanização do campo expulsando mão de obra combinada à industrialização atraindo pra cidade. Isso gerou crescimento urbano mais rápido do que a infraestrutura conseguiu acompanhar. É diferente de padrões mais recentes de migração interna (entre estados/regiões), que têm outros motivadores.",
        gatilhos: [
          "Texto sobre crescimento acelerado de cidades brasileiras no século XX → ligue ao êxodo rural (mecanização do campo + industrialização urbana), não a um fator único.",
          "Pergunta sobre \"consequência da urbanização acelerada\" → pense em pelo menos: infraestrutura insuficiente, moradia irregular (favelas), mobilidade urbana precária.",
          "Dado sobre migração interna recente (entre estados/regiões) → verifique se o motivo apontado é econômico — os fluxos migratórios internos do Brasil mudaram bastante de direção nas últimas décadas.",
        ],
        pegadinhas: [
          "Confundir êxodo rural (do campo pra cidade, histórico) com fluxos migratórios internos mais recentes entre regiões urbanas, que têm outras causas.",
          "Tratar a urbanização brasileira como processo gradual e planejado — foi historicamente rápida e desigual.",
        ],
        exemplo: {
          enunciado: "Um gráfico mostra que a população urbana brasileira passou de menos de 40% do total, em 1950, para mais de 80% nas décadas seguintes, num intervalo de tempo relativamente curto para os padrões internacionais. Esse ritmo acelerado de urbanização é mais diretamente associado a:",
          resolucao: "A urbanização ocorreu num intervalo comprimido, associada à mecanização do campo (liberando mão de obra) e à industrialização urbana (atraindo essa mão de obra) — o êxodo rural. A pegadinha é atribuir o crescimento urbano só ao crescimento populacional natural das cidades, ignorando o papel central da migração campo-cidade.",
        },
      },
      {
        tema: "Geopolítica dos recursos naturais",
        resumo: "O controle/acesso a recursos naturais (água, fontes de energia, minerais, terra agricultável) gera influência e conflito geopolítico. Recursos concentrados em poucos países geram dependência estratégica para os demais; a capacidade de transformar e controlar toda a cadeia de valor do recurso importa tanto quanto tê-lo.",
        gatilhos: [
          "Texto sobre um recurso natural concentrado geograficamente em poucos países → pense no poder de barganha geopolítica que essa concentração gera pros países produtores.",
          "Pergunta sobre disputa por recurso hídrico compartilhado entre países → identifique os interesses de cada país envolvido antes de julgar qualquer solução proposta.",
          "Menção a \"dependência energética\" de um país → separe se é dependência de importação ou de um tipo específico de fonte, já que os riscos geopolíticos de cada tipo são diferentes.",
        ],
        pegadinhas: [
          "Tratar todo recurso natural como igualmente estratégico — o peso geopolítico depende de quão concentrada é sua produção mundial.",
          "Assumir que um país rico em recursos naturais é automaticamente forte geopoliticamente — controlar a cadeia de valor importa tanto quanto ter o recurso.",
        ],
        exemplo: {
          enunciado: "Um texto explica que um pequeno número de países concentra a maior parte da produção mundial de um determinado mineral essencial para a fabricação de baterias, o que gera preocupação em países que dependem totalmente da importação desse insumo. Essa situação ilustra, principalmente:",
          resolucao: "A concentração da produção de um recurso estratégico em poucos países gera dependência e vulnerabilidade geopolítica para os importadores. A pegadinha é tratar a situação apenas como questão de mercado/preço, sem reconhecer a dimensão de vulnerabilidade estratégica nacional.",
        },
      },
      {
        tema: "Biomas brasileiros e desmatamento",
        resumo: "O Brasil tem múltiplos biomas distintos (Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal, Pampa), cada um com pressões de desmatamento diferentes (Amazônia: pecuária/mineração; Cerrado: expansão agrícola de grãos; Mata Atlântica: já historicamente a mais devastada). Tratar \"desmatamento no Brasil\" como sinônimo só de Amazônia ignora essa diversidade.",
        gatilhos: [
          "Pergunta sobre desmatamento no Brasil → identifique QUAL bioma está sendo discutido antes de generalizar causas.",
          "Dado sobre bioma com baixo percentual de vegetação nativa remanescente → não assuma que é sempre a Amazônia; a Mata Atlântica já perdeu historicamente proporção muito maior de sua cobertura original.",
          "Texto sobre expansão agrícola associada a desmatamento → verifique se é pecuária extensiva, monocultura de grãos, ou outro uso — cada bioma tende a ter um vetor econômico predominante diferente.",
        ],
        pegadinhas: [
          "Tratar \"desmatamento no Brasil\" como sinônimo automático de \"desmatamento na Amazônia\" — outros biomas também enfrentam desmatamento significativo.",
          "Achar que todos os biomas brasileiros têm o mesmo nível de proteção legal ou de cobertura vegetal remanescente.",
        ],
        exemplo: {
          enunciado: "Um relatório aponta que, embora a Amazônia concentre grande atenção internacional sobre desmatamento, o Cerrado brasileiro vem perdendo vegetação nativa numa taxa proporcionalmente comparável, impulsionada principalmente pela expansão da agricultura de grãos. Esse dado evidencia, principalmente, que:",
          resolucao: "O texto contrasta a atenção concentrada na Amazônia com pressão comparável em outro bioma, por vetor econômico diferente. A pegadinha é tratar a questão ambiental brasileira como sinônimo exclusivo da Amazônia, ignorando a pressão sobre outros biomas.",
        },
      },
      {
        tema: "Cartografia: fusos horários e escalas",
        resumo: "Fusos horários: cada fuso equivale a 15° de longitude e 1 hora; deslocar-se pra LESTE avança o horário, pra OESTE atrasa. Escala de mapa: quanto MAIOR o denominador (ex.: 1:1.000.000), MENOR o detalhe (escala \"pequena\", cobrindo grande área) — nomenclatura contraintuitiva que costuma ser testada diretamente.",
        gatilhos: [
          "Problema de fuso horário → cada fuso equivale a 15° de longitude e 1 hora; ao se mover pra LESTE, a hora AVANÇA; ao se mover pra OESTE, a hora ATRASA.",
          "Pergunta sobre escala de mapa (ex.: 1:100.000) → quanto MAIOR o denominador, MENOR o nível de detalhe (escala \"pequena\") — é contraintuitivo.",
          "Cálculo de distância real a partir de um mapa → meça a distância no mapa e multiplique pelo denominador da escala, conferindo a unidade de medida.",
        ],
        pegadinhas: [
          "Inverter o sentido do avanço/atraso de horário ao cruzar fusos.",
          "Confundir \"escala grande\" com \"mapa que cobre grande área\" — é o oposto: escala grande representa área pequena com muito detalhe.",
        ],
        exemplo: {
          enunciado: "Um viajante parte de uma cidade situada num fuso horário e voa em direção a outra cidade situada três fusos horários a leste. Ao pousar, ele deve ajustar seu relógio de que forma, e por quantas horas?",
          resolucao: "Deslocamentos para LESTE avançam o horário local; cruzando três fusos para leste, o viajante deve ADIANTAR o relógio em 3 horas. A pegadinha mais comum é inverter a direção (atrasar em vez de adiantar) ao mover-se para leste.",
        },
      },
    ],
  },
  "atualidades-politica": {
    resumo: "Conjuntura política e econômica brasileira: reformas, instituições, relação entre poderes — sempre ancorada em fatos recentes, não opinião pessoal.",
    gatilhos: [
      "Pergunta sobre uma reforma (tributária, administrativa, etc.) → identifique o problema que ela tenta resolver antes de avaliar prós/contras.",
      "Texto de opinião/editorial no enunciado → separe o fato relatado da opinião do autor antes de responder.",
      "Pergunta sobre relação entre poderes (Executivo/Legislativo/Judiciário) → pense em freios e contrapesos, não em qual poder \"manda mais\".",
      "Texto sobre evento político recente (eleição, crise institucional) → a FGV trata isso dentro do bloco nomeado \"Ciências Humanas\"/Atualidades, sempre com texto de apoio jornalístico ou de opinião — nunca pergunta \"solta\" sem esse ancoradouro.",
    ],
    pegadinhas: [
      "Confundir a posição do autor de um texto de opinião com a posição \"correta\" do gabarito — a banca testa compreensão do argumento, não concordância com ele.",
      "Generalizar uma medida pontual como se fosse uma mudança estrutural permanente.",
      "Misturar conjuntura (fato recente) com estrutura (regra permanente da Constituição) como se fossem a mesma coisa.",
    ],
    subtemas: [
      {
        tema: "Presidencialismo de coalizão e sistema político brasileiro",
        resumo: "É o arranjo em que um presidente eleito por voto direto, mas sem maioria própria num Congresso fragmentado entre muitos partidos, precisa negociar apoio legislativo distribuindo ministérios, cargos e recursos orçamentários entre partidos aliados. É diferente do parlamentarismo, onde o chefe de governo já nasce de uma maioria formada dentro do próprio Legislativo. O arranjo é estrutural no Brasil desde a redemocratização — não é sinal de crise pontual, embora tenha custos (instabilidade, fisiologismo) amplamente debatidos.",
        gatilhos: [
          "Texto menciona presidente que \"negocia\" com o Congresso pra aprovar uma pauta → é presidencialismo de coalizão em ação; não confunda com parlamentarismo, onde o chefe de governo já nasce da maioria.",
          "Pergunta sobre fragmentação partidária (muitos partidos pequenos) → ligue à necessidade de coalizões amplas — quanto mais fragmentado o Congresso, mais custosa a governabilidade.",
          "Menção a \"emendas parlamentares\" ou \"ministérios distribuídos entre partidos\" → é a moeda de troca típica da coalizão, não corrupção por definição — a banca testa se você distingue prática institucional legal de desvio.",
        ],
        pegadinhas: [
          "Tratar \"presidencialismo de coalizão\" como sinônimo de crise institucional — é um arranjo estrutural do sistema brasileiro desde a redemocratização, não um sintoma passageiro.",
          "Confundir coalizão de governo (base parlamentar) com coligação eleitoral (aliança pra eleição) — são conceitos distintos, mesmo que relacionados.",
        ],
        exemplo: {
          enunciado: "Um texto jornalístico afirma que o governo federal, mesmo tendo vencido a eleição presidencial, precisou nomear ministros de partidos que não participaram de sua campanha para conseguir aprovar seu orçamento no Congresso. Essa situação exemplifica:",
          resolucao: "O enunciado descreve um presidente eleito que negocia cargos com partidos fora de sua base original de campanha para garantir apoio legislativo — isso é a definição operacional de presidencialismo de coalizão: o Executivo, mesmo legitimado pelo voto direto, depende de uma maioria construída no Congresso (fragmentado entre muitos partidos) para governar. A resposta correta identificaria isso como o funcionamento normal do sistema político brasileiro, não como uma anomalia ou crise — esse é o ponto que costuma diferenciar a alternativa certa das erradas, que tendem a superdimensionar o episódio como sinal de ruptura institucional.",
        },
      },
      {
        tema: "Reforma tributária brasileira",
        resumo: "O sistema tributário brasileiro sobre consumo historicamente reuniu vários tributos distintos (ICMS estadual, ISS municipal, PIS/Cofins federais, entre outros), cada um com regras próprias, gerando complexidade, efeitos cumulativos e disputa entre estados por empresas (a chamada \"guerra fiscal\"). O núcleo de propostas de reforma tributária é simplificar e unificar esses tributos num modelo mais próximo de um imposto sobre valor agregado, com período de transição plurianual — mudança estrutural, não apenas ajuste de alíquota.",
        gatilhos: [
          "Texto menciona \"simplificação tributária\" ou \"unificação de impostos\" → pense no problema que a reforma resolve: múltiplos tributos sobre consumo, cada um com regra própria, gerando cumulatividade e guerra fiscal entre estados.",
          "Pergunta sobre \"guerra fiscal entre estados\" → é a prática de estados reduzirem ICMS pra atrair empresas; a reforma tributária mira reduzir esse incentivo, não eliminá-lo por decreto único.",
          "Menção a período de transição de vários anos → reformas tributárias amplas raramente são imediatas; a banca gosta de testar se você sabe que mudança estrutural desse tipo é gradual.",
        ],
        pegadinhas: [
          "Tratar a reforma tributária como mudança só na alíquota (quanto se paga) — o núcleo do debate é a estrutura (quantos tributos, sobre o quê, cobrados por quem), não apenas o valor cobrado.",
          "Assumir que \"simplificação\" significa automaticamente \"redução de carga tributária total\" — são objetivos diferentes; simplificar a estrutura não implica necessariamente pagar menos no total.",
        ],
        exemplo: {
          enunciado: "Um texto explica que, antes de uma reforma tributária, uma mesma cadeia produtiva podia ser tributada por impostos estaduais, municipais e federais distintos, cada um com regras próprias, tornando o sistema mais complexo do que em países que adotam um único imposto sobre valor agregado. O objetivo central da reforma discutida no texto é:",
          resolucao: "O texto descreve fragmentação de tributos sobre consumo entre os três níveis de governo, cada um com regras próprias — esse é exatamente o problema que motiva propostas de unificação em um modelo de IVA (imposto sobre valor agregado). A resposta correta aponta para simplificação/unificação da estrutura tributária sobre consumo, não para redução de arrecadação nem para centralização política — a banca costuma oferecer alternativas que confundem \"simplificar a estrutura\" com \"baixar impostos\" ou com \"tirar autonomia dos estados\", que são efeitos colaterais possíveis, não o objetivo central declarado.",
        },
      },
      {
        tema: "Reforma da previdência e transição demográfica",
        resumo: "Reformas previdenciárias costumam ser motivadas por transição demográfica: expectativa de vida crescente e natalidade em queda alteram a proporção entre trabalhadores contribuintes e aposentados num sistema de repartição (onde quem trabalha hoje financia quem se aposenta hoje). Os mecanismos mais discutidos são idade mínima e tempo de contribuição, geralmente acompanhados de regras de transição pra quem já estava próximo de se aposentar pela regra anterior.",
        gatilhos: [
          "Texto menciona \"aumento da expectativa de vida\" ou \"envelhecimento da população\" → ligue direto à sustentabilidade do sistema de repartição: menos trabalhadores jovens sustentando mais aposentados por mais tempo.",
          "Pergunta sobre \"regra de transição\" → identifique que ela existe pra não aplicar a regra nova de uma vez a quem já estava perto de se aposentar pela regra antiga.",
          "Comparação entre sistema de \"repartição\" e \"capitalização\" → repartição é solidariedade entre gerações (quem trabalha hoje paga quem se aposenta hoje); capitalização é poupança individual — não são a mesma lógica.",
        ],
        pegadinhas: [
          "Tratar reforma da previdência como medida isolada de \"corte de direitos\" sem mencionar o fator demográfico que a motiva — a banca cobra entendimento da causa estrutural, não só do efeito político.",
          "Confundir idade mínima com tempo de contribuição — são dois requisitos distintos que costumam aparecer juntos nas regras, não intercambiáveis.",
        ],
        exemplo: {
          enunciado: "Um gráfico mostra que, em 1980, havia cerca de sete trabalhadores em idade ativa para cada pessoa com 65 anos ou mais no Brasil, e que essa proporção vem caindo continuamente. Esse dado é citado por especialistas como argumento central para justificar:",
          resolucao: "A razão entre trabalhadores ativos e pessoas idosas caindo ao longo do tempo é a definição de transição demográfica aplicada à previdência: um sistema de repartição depende de uma proporção favorável entre quem contribui e quem recebe benefício; quando essa proporção cai, o sistema fica sob pressão financeira crescente. A resposta correta liga o dado demográfico à necessidade de ajustar regras (idade, tempo de contribuição) para manter o sistema sustentável — alternativas erradas tendem a tratar o dado como argumento puramente político ou ideológico, ignorando o mecanismo atuarial que o texto está de fato descrevendo.",
        },
      },
      {
        tema: "Federalismo fiscal e financiamento de campanhas",
        resumo: "São dois temas relacionados por envolverem dinheiro público, mas conceitualmente distintos. Federalismo fiscal trata de como a arrecadação e as responsabilidades de gasto são divididas entre União, estados e municípios, incluindo transferências (como fundos de participação) que compensam entes com arrecadação própria insuficiente. Financiamento de campanhas trata das regras sobre como candidatos e partidos custeiam eleições — no Brasil, hoje majoritariamente por fundo público (Fundo Eleitoral) e doações de pessoas físicas, após a proibição de doações de empresas.",
        gatilhos: [
          "Texto sobre \"repasses da União pra estados e municípios\" → é federalismo fiscal: entes menores dependem de transferências porque não arrecadam o suficiente sozinhos pras suas responsabilidades.",
          "Menção a \"Fundo Eleitoral\" ou \"financiamento público de campanha\" → lembre que o Brasil proibiu doação de empresas a campanhas; hoje o financiamento é majoritariamente público (fundo) e por pessoas físicas.",
          "Pergunta que mistura os dois temas (dinheiro público indo pra campanhas E pra estados) → separe: um é sobre organização territorial do Estado, o outro é sobre regras eleitorais — não trate como a mesma discussão só porque envolve \"dinheiro público\".",
        ],
        pegadinhas: [
          "Assumir que municípios pobres recebem menos transferência por serem menos importantes — na prática, fundos como o FPM existem justamente pra compensar desigualdade de arrecadação própria.",
          "Confundir \"financiamento público de campanha\" com \"gasto público em geral\" — o Fundo Eleitoral é uma rubrica orçamentária específica, debatida à parte do orçamento geral.",
        ],
        exemplo: {
          enunciado: "Um município pequeno, com pouca atividade econômica e arrecadação própria baixa, consegue manter serviços básicos de saúde e educação principalmente graças a repasses vindos da União e do estado. Esse mecanismo é um exemplo de:",
          resolucao: "O texto descreve um ente federativo (município) que depende de recursos vindos de outro nível de governo pra cumprir suas competências — isso é federalismo fiscal na prática: a Constituição divide competências e arrecadação de forma desigual entre União, estados e municípios, e usa transferências (como fundos de participação) pra equilibrar a capacidade de cada ente prestar serviços. A resposta certa aponta pro mecanismo de transferências intergovernamentais; um erro comum é confundir isso com financiamento de campanha eleitoral só porque ambos envolvem \"repasse de dinheiro público\" — são mecanismos institucionais diferentes.",
        },
      },
    ],
  },
  "atualidades-geopolitica": {
    resumo: "Conflitos internacionais, blocos econômicos e organismos multilaterais — cobrada quase sempre com um argumento a favor e um desafio real da instituição/processo em questão.",
    gatilhos: [
      "Pergunta sobre um organismo multilateral (ONU, OMC, etc.) → explique a função central dele (cooperação, regulação, segurança) antes de julgar sua eficácia.",
      "Conflito internacional no enunciado → identifique os atores, o interesse de cada um e o contexto histórico antes de avaliar soluções.",
      "\"Discuta um benefício e um desafio de X\" → estruture a resposta nesses dois blocos separados, não misture.",
      "Questão sobre bloco econômico ou conflito internacional pode vir em formato de afirmativas numeradas (I, II, III) para julgar — não assuma pergunta única; leia cada afirmativa isoladamente antes de combinar.",
      "Tema de totalitarismo/autoritarismo cruzado com organismo internacional → pense em Hannah Arendt (repertório oficial confirmado desta banca) como referência conceitual de fundo, mesmo que o nome não apareça no enunciado.",
    ],
    pegadinhas: [
      "Reduzir um conflito complexo a uma única causa (só econômica, ou só religiosa, ou só territorial).",
      "Usar generalizações vagas (\"a ONU é importante\") sem justificar com um mecanismo concreto.",
      "Confundir bloco econômico (união aduaneira, mercado comum) com aliança política/militar.",
    ],
    subtemas: [
      {
        tema: "Mercosul e União Europeia: blocos econômicos",
        resumo: "Blocos econômicos variam por grau de integração: o Mercosul é primariamente uma união aduaneira (tarifa externa comum entre membros, barreiras internas reduzidas), com integração institucional/política mais limitada; a União Europeia representa um modelo de integração muito mais profundo (mercado comum, instituições supranacionais robustas, e moeda comum pra maioria dos membros). Comparar os dois testa reconhecer GRAUS de integração, não tratá-los como equivalentes.",
        gatilhos: [
          "Texto compara Mercosul e União Europeia → não trate como blocos equivalentes; a UE tem integração institucional muito mais profunda que o Mercosul.",
          "Pergunta sobre \"tipo\" de bloco econômico → identifique o grau: zona de livre comércio < união aduaneira (caso do Mercosul) < mercado comum < união econômica/monetária (caso avançado da UE).",
          "Texto sobre dificuldade de avançar a integração do Mercosul → pense em assimetrias econômicas entre os países-membros e resistência política a ceder soberania.",
        ],
        pegadinhas: [
          "Tratar Mercosul e UE como blocos de mesmo nível de integração só porque ambos são \"blocos econômicos regionais\".",
          "Achar que todo bloco econômico regional necessariamente evolui pra ter moeda única, como a UE — é trajetória específica europeia, não regra geral.",
        ],
        exemplo: {
          enunciado: "Um texto compara dois blocos econômicos regionais, observando que um deles adota uma moeda comum entre a maioria dos seus membros e possui instituições com poder de decisão supranacional, enquanto o outro mantém tarifa externa comum, mas preserva moedas e boa parte da soberania decisória de cada país-membro. Esses dois blocos são, respectivamente:",
          resolucao: "O bloco com moeda comum e instituições supranacionais é a União Europeia; o bloco com tarifa externa comum mas soberania preservada é o Mercosul. A pegadinha é inverter os dois ou tratá-los como equivalentes só por serem ambos \"blocos econômicos regionais\".",
        },
      },
      {
        tema: "ONU, OMC e FMI: organismos multilaterais",
        resumo: "Cada organismo multilateral tem função central distinta, frequentemente confundida: ONU (política/segurança internacional, direitos humanos, mediação de conflitos), OMC (regras de comércio internacional, resolução de disputas comerciais), FMI (estabilidade financeira internacional, empréstimos a países em crise, geralmente com condicionalidades). Reconhecer QUAL organização trata de QUAL tipo de questão é a habilidade central testada.",
        gatilhos: [
          "Texto sobre mediação de conflito internacional, direitos humanos ou segurança global → é competência típica da ONU.",
          "Texto sobre disputa comercial entre países, tarifas, regras de comércio internacional → é competência típica da OMC.",
          "Texto sobre empréstimo a país em crise financeira/cambial, com condições de ajuste fiscal exigidas → é competência típica do FMI.",
        ],
        pegadinhas: [
          "Confundir as três organizações por serem todas \"multilaterais\" — cada uma tem escopo bem definido e distinto.",
          "Achar que FMI e Banco Mundial são a mesma instituição — têm funções distintas (estabilidade financeira de curto prazo × financiamento de desenvolvimento de longo prazo).",
        ],
        exemplo: {
          enunciado: "Um país enfrentando grave crise cambial busca um empréstimo internacional condicionado à adoção de reformas fiscais específicas, enquanto simultaneamente disputa, em outro fórum internacional, a legalidade de tarifas impostas por um parceiro comercial. Esses dois processos envolvem, respectivamente:",
          resolucao: "O empréstimo condicionado é operação típica do FMI; a disputa sobre tarifas é competência da OMC. A pegadinha é confundir as duas instituições ou incluir a ONU, que não tem competência central sobre finanças ou tarifas comerciais.",
        },
      },
      {
        tema: "Multipolaridade e guerras por procuração",
        resumo: "\"Multipolaridade\" descreve uma estrutura de poder global com vários centros relevantes (em contraste com a bipolaridade da Guerra Fria ou a unipolaridade dos EUA pós-Guerra Fria). \"Guerra por procuração\" (proxy war) é o conflito em que potências apoiam lados opostos num terceiro país sem confronto direto entre si — padrão recorrente tanto na Guerra Fria quanto em tensões multipolares recentes.",
        gatilhos: [
          "Texto descreve múltiplos centros de poder relevantes simultaneamente → é multipolaridade; contraste com bipolaridade (Guerra Fria) e unipolaridade (EUA pós-Guerra Fria).",
          "Conflito armado num país onde potências externas apoiam lados opostos sem confronto direto entre si → é guerra por procuração; identifique quem apoia cada lado e o interesse estratégico.",
          "Pergunta pede pra comparar a ordem internacional atual com a da Guerra Fria → não assuma que hoje ainda é bipolar; a análise contemporânea tende a descrever multipolaridade.",
        ],
        pegadinhas: [
          "Tratar qualquer conflito envolvendo mais de um país como automaticamente \"guerra por procuração\" — o termo requer apoio de potências a lados opostos SEM confronto direto entre elas.",
          "Confundir multipolaridade com ausência de hierarquia de poder — multipolaridade significa vários centros relevantes, não ausência de hierarquia.",
        ],
        exemplo: {
          enunciado: "Um conflito armado interno em um país é descrito como recebendo apoio militar e financeiro de duas potências externas rivais, cada uma apoiando um lado oposto do conflito, sem que essas duas potências entrem em confronto militar direto entre si. Esse padrão de envolvimento internacional é conhecido como:",
          resolucao: "O padrão descrito é a definição clássica de guerra por procuração. A pegadinha é tratar isso apenas como \"guerra civil com ajuda externa\" genérica, sem reconhecer o conceito específico de confronto indireto entre potências rivais.",
        },
      },
      {
        tema: "Cadeias globais de valor e geopolítica dos semicondutores",
        resumo: "A manufatura moderna é fragmentada entre países (cadeia global de valor: design num país, componentes de vários outros, montagem em outro ainda), tornando cadeias de suprimento interdependentes e vulneráveis a interrupções. Semicondutores (chips) são o caso paradigmático — produção concentrada em pouquíssimos países/empresas, criando dependência estratégica.",
        gatilhos: [
          "Texto descreve um produto cujas etapas de produção acontecem em vários países diferentes → é cadeia global de valor; pense na interdependência e na vulnerabilidade a interrupções em qualquer elo.",
          "Menção a semicondutores/chips concentrados na produção de poucos países/empresas → ligue à vulnerabilidade estratégica de países que dependem dessa importação.",
          "Pergunta sobre restrição de exportação de tecnologia entre potências → no caso de semicondutores, essas restrições têm peso geopolítico desproporcional por sua concentração produtiva.",
        ],
        pegadinhas: [
          "Tratar cadeias globais de valor como fenômeno neutro e puramente econômico — também criam vulnerabilidades exploradas geopoliticamente.",
          "Achar que qualquer país com fábricas de eletrônicos domina a produção de semicondutores — a etapa mais avançada (chips de ponta) está concentrada num número muito pequeno de empresas/países.",
        ],
        exemplo: {
          enunciado: "Um texto descreve que a produção de um componente eletrônico essencial está concentrada em poucas fábricas ao redor do mundo, de modo que uma interrupção nessa produção afeta simultaneamente a fabricação de automóveis, celulares e equipamentos militares em dezenas de países. Essa situação ilustra, principalmente:",
          resolucao: "A concentração da produção de um componente essencial afetando múltiplos setores globalmente ilustra tanto cadeia global de valor quanto a vulnerabilidade estratégica associada à geopolítica dos semicondutores. A pegadinha é tratar a situação como problema puramente logístico, sem reconhecer a dimensão de poder e dependência estratégica.",
        },
      },
      {
        tema: "Refugiados e direito internacional humanitário",
        resumo: "\"Refugiado\" tem definição jurídica específica (pessoa que foge de perseguição por motivos de raça, religião, nacionalidade, opinião política ou grupo social), distinta de \"migrante econômico\" (deslocamento primariamente por oportunidade econômica, sem perseguição). A distinção importa juridicamente — as proteções internacionais diferem — mesmo que a mídia trate os dois como sinônimos de \"crise migratória\".",
        gatilhos: [
          "Texto descreve pessoa fugindo de perseguição (política, religiosa, étnica) → é refugiado, no sentido jurídico específico, com proteções internacionais associadas.",
          "Texto descreve pessoa se deslocando primariamente por oportunidades econômicas, sem relato de perseguição → é migrante econômico, categoria juridicamente distinta.",
          "Pergunta sobre obrigação de um país receptor em relação a refugiados → pense no princípio de non-refoulement (não devolver a pessoa a um país onde sofreria perseguição).",
        ],
        pegadinhas: [
          "Tratar \"refugiado\" e \"migrante econômico\" como sinônimos — juridicamente são categorias distintas.",
          "Achar que qualquer pessoa fugindo de uma situação difícil se qualifica automaticamente como refugiado — a definição exige fundado temor de perseguição por motivos específicos.",
        ],
        exemplo: {
          enunciado: "Um texto descreve dois grupos de pessoas cruzando a mesma fronteira: um grupo foge de perseguição política em seu país de origem, e o outro se desloca buscando melhores oportunidades de emprego, sem relatar perseguição. Do ponto de vista do direito internacional, esses dois grupos:",
          resolucao: "Apesar de cruzarem a mesma fronteira, os dois grupos se enquadram em categorias jurídicas distintas: refugiado (com proteções específicas) e migrante econômico (sem essas mesmas proteções). A pegadinha é tratar os dois grupos como juridicamente equivalentes só por compartilharem a rota migratória.",
        },
      },
    ],
  },
  "atualidades-meioambiente": {
    resumo: "Mudanças climáticas, acordos internacionais e transição energética — com foco no princípio de \"responsabilidades comuns, porém diferenciadas\" entre países desenvolvidos e em desenvolvimento. Nota: entre as 4 frentes de Atualidades, esta é a que tem menos confirmação direta como repertório oficial da FGV — trate como preparo geral robusto (forte em outras bancas de vestibular), não como aposta garantida desta banca especificamente.",
    gatilhos: [
      "Pergunta sobre acordo climático (Paris, COP) → identifique se é sobre meta, financiamento ou mecanismo de cumprimento antes de julgar.",
      "\"Desafio da transição energética\" → pense em pelo menos dois ângulos: técnico/econômico E social (empregos, desigualdade regional).",
      "Dado de emissões per capita vs. emissões totais de um país → confira qual das duas métricas o enunciado está usando antes de comparar países.",
    ],
    pegadinhas: [
      "Tratar \"país que mais emite em termos absolutos\" e \"país que mais emite per capita\" como a mesma coisa.",
      "Ignorar o histórico de industrialização ao avaliar responsabilidade climática (o argumento central do princípio \"comum, porém diferenciada\").",
      "Assumir que toda fonte renovável é automaticamente livre de impacto ambiental (ex.: hidrelétricas e alagamento de áreas).",
    ],
    subtemas: [
      {
        tema: "Efeito estufa e acordos climáticos internacionais",
        resumo: "O efeito estufa é um fenômeno natural e necessário: sem ele, a Terra seria fria demais pra vida como a conhecemos. O problema ambiental não é sua existência, mas a intensificação causada pelo excesso de emissões humanas de gases como CO2 e metano, que retêm mais calor do que o equilíbrio natural. Acordos internacionais (como Paris) estabelecem metas e mecanismos de redução e financiamento, muitas vezes organizados pelo princípio de \"responsabilidades comuns, porém diferenciadas\" — países que historicamente mais emitiram têm responsabilidade maior, mesmo que hoje outro país emita mais em termos absolutos.",
        gatilhos: [
          "Texto trata efeito estufa como se fosse, em si, o problema → cuidado: o efeito estufa é natural e necessário pra vida na Terra; o problema é a intensificação por excesso de emissões humanas.",
          "Menção a \"meta de redução de emissões\" num acordo internacional → identifique se é meta obrigatória (com sanção) ou voluntária (compromisso sem punição formal) — muda a força do instrumento.",
          "Comparação entre países desenvolvidos e em desenvolvimento num acordo climático → lembre do princípio de \"responsabilidades comuns, porém diferenciadas\": quem historicamente mais emitiu tem responsabilidade maior, mesmo que hoje outro país emita mais em termos absolutos.",
        ],
        pegadinhas: [
          "Tratar \"efeito estufa\" e \"aquecimento global\" como sinônimos exatos — efeito estufa é o mecanismo físico; aquecimento global é a consequência observada do mecanismo intensificado.",
          "Achar que todo acordo climático internacional tem força de lei com punição garantida — muitos mecanismos dependem de compromisso voluntário e pressão diplomática, não sanção automática.",
        ],
        exemplo: {
          enunciado: "Um texto afirma que, sem o efeito estufa, a temperatura média da Terra seria muito mais baixa e incompatível com a vida como a conhecemos, mas que o aumento acelerado das emissões de gases de efeito estufa nas últimas décadas vem intensificando esse fenômeno além do equilíbrio natural. A partir desse texto, é correto afirmar que:",
          resolucao: "O texto distingue claramente o efeito estufa como fenômeno natural necessário (sem ele a Terra seria mais fria) da intensificação artificial causada por emissões humanas — a resposta correta reconhece essa distinção: o problema ambiental não é a existência do efeito estufa, mas seu reforço além do patamar natural por ação humana. A pegadinha mais comum aqui é escolher uma alternativa que trate o efeito estufa em si como algo a ser eliminado, quando na verdade ele é a base da habitabilidade do planeta — o alvo do debate é a intensidade excessiva, não o fenômeno.",
        },
      },
      {
        tema: "Transição energética e energias renováveis",
        resumo: "Transição energética é a mudança de uma matriz dominada por combustíveis fósseis para fontes renováveis (solar, eólica, hídrica, biomassa), motivada por metas climáticas — mas não é só uma troca técnica. Envolve tradeoffs reais: fontes como solar e eólica são intermitentes (não geram o tempo todo, exigindo armazenamento ou backup), a mudança de infraestrutura tem custo alto, e regiões dependentes economicamente de combustíveis fósseis enfrentam impacto real sobre emprego e renda durante a transição.",
        gatilhos: [
          "Texto trata transição energética como decisão puramente técnica → lembre de incluir também o ângulo social: empregos em setores fósseis, custo de infraestrutura, desigualdade regional na adoção.",
          "Menção a \"fonte intermitente\" (solar, eólica) → ligue ao desafio de armazenamento/backup — a fonte não gera energia o tempo todo, então a rede precisa de solução complementar.",
          "Comparação da matriz energética brasileira com a de outros países → o Brasil já tem matriz elétrica majoritariamente renovável (hidrelétrica historicamente), diferente de países com matriz majoritariamente fóssil — não generalize o debate global pro caso brasileiro sem checar essa diferença de ponto de partida.",
        ],
        pegadinhas: [
          "Tratar toda fonte renovável como automaticamente livre de impacto ambiental — hidrelétricas alagam áreas e deslocam populações, por exemplo; \"renovável\" não é sinônimo de \"sem impacto\".",
          "Ignorar o custo social da transição (empregos em regiões dependentes de combustíveis fósseis) como se fosse só uma questão de trocar uma fonte por outra sem custo de adaptação.",
        ],
        exemplo: {
          enunciado: "Uma região historicamente dependente da extração de carvão enfrenta resistência de trabalhadores locais a um plano nacional de fechamento acelerado de usinas térmicas a carvão, mesmo que o plano inclua metas ambientais amplamente aceitas. Esse conflito ilustra principalmente:",
          resolucao: "O enunciado mostra uma meta ambiental (fechar usinas a carvão) gerando resistência não por discordância do objetivo climático em si, mas pelo impacto econômico e social concreto sobre uma região que depende daquele setor pra emprego — isso ilustra que a transição energética tem uma dimensão social/econômica que vai além do argumento técnico-ambiental. A resposta correta reconhece esse conflito distributivo (quem arca com o custo da transição); um erro comum é reduzir o caso a \"resistência à mudança\" ou \"negacionismo climático\", ignorando que a resistência descrita é sobre emprego e renda, não sobre a ciência do clima.",
        },
      },
      {
        tema: "Economia circular e critérios ESG",
        resumo: "Economia circular é um modelo de produção que busca minimizar descarte reaproveitando materiais dentro do próprio ciclo produtivo (produzir-usar-reciclar-reintroduzir), em contraste com o modelo linear tradicional (extrair-produzir-descartar). ESG (Ambiental, Social, Governança) é um conjunto de critérios cada vez mais usado por investidores e empresas pra avaliar riscos e impactos além do lucro puro — são conceitos relacionados, mas distintos: economia circular é sobre como se produz, ESG é sobre como se avalia uma empresa (e práticas circulares podem ser um dos critérios avaliados).",
        gatilhos: [
          "Texto menciona \"reaproveitar materiais em vez de descartar\" → é economia circular: o objetivo é fechar o ciclo (produzir-usar-reciclar-reintroduzir), não só \"reciclar mais\".",
          "Menção a empresa avaliada por critérios além do lucro (impacto ambiental, tratamento de funcionários, transparência de gestão) → são os três pilares de ESG (Ambiental, Social, Governança) — não confunda com uma certificação única e obrigatória.",
          "Pergunta que junta economia circular e ESG no mesmo enunciado → trate como conceitos relacionados mas distintos: economia circular é sobre COMO se produz; ESG é sobre COMO se avalia uma empresa.",
        ],
        pegadinhas: [
          "Tratar \"economia circular\" como sinônimo simples de \"reciclagem\" — reciclagem é uma ferramenta dentro do conceito mais amplo, que também inclui reduzir uso de matéria-prima virgem e prolongar vida útil de produtos.",
          "Achar que ESG é uma lei ou certificação obrigatória única — na prática é um conjunto de critérios usado de forma variada por investidores e empresas, sem um padrão único e universal.",
        ],
        exemplo: {
          enunciado: "Uma fabricante de eletrônicos passou a projetar seus produtos para que peças possam ser desmontadas e reaproveitadas em novos aparelhos ao final da vida útil, reduzindo a extração de matéria-prima nova. Ao mesmo tempo, investidores começaram a avaliar essa empresa não só pelo lucro, mas também por seu impacto ambiental e pela transparência de sua gestão. O texto descreve, respectivamente:",
          resolucao: "A primeira parte do texto — projetar produtos pra desmontar e reaproveitar peças, reduzindo extração de matéria-prima nova — descreve economia circular: um modelo de produção que fecha o ciclo em vez de seguir a lógica linear de extrair-produzir-descartar. A segunda parte — investidores avaliando a empresa por impacto ambiental e transparência de gestão, além do lucro — descreve critérios ESG (Ambiental, Social, Governança) sendo aplicados. A resposta correta identifica os dois conceitos na ordem certa; a pegadinha é inverter os dois ou tratá-los como a mesma coisa, quando um é sobre o modelo de produção e o outro é sobre o critério de avaliação do investidor.",
        },
      },
      {
        tema: "Perda de biodiversidade e escassez hídrica",
        resumo: "Perda de biodiversidade é a redução na variedade de espécies e ecossistemas, causada por destruição de habitat, mudança climática, poluição e espécies invasoras — sua consequência mais cobrada não é a extinção da espécie em si, mas a perda de serviços ecossistêmicos (polinização, purificação de água, regulação climática). Escassez hídrica pode ser física (não há água suficiente disponível na região) ou de gestão/infraestrutura (a água existe, mas falta captação, tratamento ou distribuição adequados) — os dois temas se conectam porque degradação ambiental (como desmatamento) altera o próprio ciclo hídrico local.",
        gatilhos: [
          "Texto sobre perda de espécies → não pare na espécie em si; pense no serviço ecossistêmico perdido junto (polinização, purificação de água, regulação climática) — é isso que a banca costuma cobrar como consequência.",
          "Pergunta sobre escassez hídrica → identifique se é escassez física (não tem água suficiente na região) ou escassez de gestão/infraestrutura (tem água, mas falta captação/distribuição adequada) — são causas e soluções diferentes.",
          "Texto ligando desmatamento a mudança no regime de chuvas → é a conexão entre perda de vegetação e ciclo hídrico (ex.: função de \"bombeamento\" de umidade de florestas como a Amazônia) — não trate os dois temas como desconectados.",
        ],
        pegadinhas: [
          "Tratar escassez hídrica só como problema de regiões áridas — cidades grandes com infraestrutura de saneamento precária também enfrentam escassez, mesmo com chuva regular na região.",
          "Reduzir perda de biodiversidade a \"extinção de animais fofos/carismáticos\" — o impacto mais cobrado em prova costuma ser o funcional (perda de serviço ecossistêmico), não o apelo estético da espécie.",
        ],
        exemplo: {
          enunciado: "Uma cidade grande enfrenta racionamento de água mesmo estando localizada em uma região de índices pluviométricos regulares, devido à perda de mata ciliar ao redor dos mananciais e à infraestrutura de captação insuficiente para a população atual. Esse caso ilustra que a escassez hídrica descrita é, principalmente, do tipo:",
          resolucao: "O enunciado deixa explícito que a região tem chuva regular — ou seja, água não falta fisicamente em termos de precipitação —, mas o problema está na degradação ambiental dos mananciais (perda de mata ciliar) e na infraestrutura insuficiente pra captar e distribuir a água disponível. Isso caracteriza escassez hídrica de natureza econômica/de gestão, não escassez física — a diferença central que a banca costuma cobrar nesse tema. A pegadinha mais comum seria associar automaticamente \"racionamento de água\" a \"seca\" ou \"pouca chuva\", ignorando que o próprio texto descreve um regime pluviométrico regular como causa já descartada pelo enunciado.",
        },
      },
    ],
  },
  "atualidades-tecnologia": {
    resumo: "Inteligência artificial, redes sociais e privacidade de dados — cobrada quase sempre ligando a tecnologia a um impacto social ou econômico concreto, não a aspectos técnicos. Nota: nesta banca, o repertório oficial confirmado é mais voltado a cultura de massa/mídia (cinema, TV, música) do que a tecnologia digital propriamente dita — vale filtrar o tema por esse ângulo.",
    gatilhos: [
      "Pergunta sobre IA/algoritmos → pense no impacto sobre trabalho, desinformação ou privacidade, os três eixos mais cobrados.",
      "Texto sobre redes sociais → identifique se o argumento é sobre modelo de negócio (atenção/publicidade) ou sobre efeito social (polarização, saúde mental).",
      "\"Discuta um benefício e um risco de X tecnologia\" → estruture a resposta nesses dois blocos, com exemplo concreto em cada um.",
      "Questão sobre tecnologia/redes sociais nesta banca tende a vir filtrada pela lente de \"cultura de massa e mídia\" (mass-media, cinema, TV) — que É repertório oficial confirmado da FGV — mais do que por um ângulo técnico puro de inteligência artificial.",
    ],
    pegadinhas: [
      "Tratar toda tecnologia nova como puramente positiva ou puramente negativa — a banca valoriza nuance.",
      "Confundir automação (substituição de tarefas) com desemprego estrutural garantido — o efeito real é debatido, não um fato consensual.",
      "Usar jargão técnico sem explicar o conceito (ex.: citar \"algoritmo\" sem dizer o que ele otimiza).",
    ],
    subtemas: [
      {
        tema: "Machine learning e inteligência artificial generativa",
        resumo: "Sistemas de machine learning são treinados em grandes volumes de dados pra reconhecer padrões e gerar respostas estatisticamente prováveis dado o que foi pedido — não \"entendem\" o conteúdo como um humano entende. Dois pontos são os mais cobrados: (1) viés algorítmico — se os dados de treino carregam padrões discriminatórios, o modelo tende a reproduzi-los; (2) \"alucinação\" — o sistema pode gerar respostas erradas com aparência de confiança, porque está otimizando plausibilidade estatística, não verdade factual.",
        gatilhos: [
          "Texto menciona \"a IA aprende com dados\" → ligue ao problema de viés: se os dados de treino têm padrões discriminatórios, a IA tende a reproduzi-los, não corrigi-los sozinha.",
          "Menção a resposta de IA \"convincente mas errada\" → é o fenômeno de \"alucinação\" (a ferramenta gera texto plausível estatisticamente, não necessariamente verdadeiro).",
          "Pergunta sobre \"substituição de empregos por IA\" → pense em automação de tarefas específicas (não profissões inteiras de uma vez) e no debate sobre requalificação da força de trabalho.",
        ],
        pegadinhas: [
          "Tratar inteligência artificial generativa como algo que \"pensa\" ou \"entende\" como um humano — o texto costuma testar se você reconhece que é reconhecimento estatístico de padrão, não cognição.",
          "Assumir que IA é neutra por ser \"só matemática\" — ignora que ela herda vieses dos dados usados pra treiná-la, que são produzidos por pessoas.",
        ],
        exemplo: {
          enunciado: "Uma reportagem relata que um sistema de inteligência artificial usado para triagem de currículos favorecia candidatos de um determinado perfil demográfico, mesmo sem essa informação estar explícita nos dados de entrada. Esse caso ilustra principalmente:",
          resolucao: "O sistema reproduziu um padrão discriminatório sem que ninguém tenha programado essa regra explicitamente — isso acontece porque modelos de IA aprendem estatisticamente com dados históricos, e se esses dados refletem desigualdades passadas (por exemplo, quem foi contratado no passado), o modelo tende a repetir esse padrão. A resposta correta aponta pro viés algorítmico herdado dos dados de treinamento; a pegadinha mais comum é escolher uma alternativa que trate isso como \"falha técnica pontual\" ou \"erro de programação\", quando na verdade é uma consequência estrutural de como esses sistemas aprendem.",
        },
      },
      {
        tema: "LGPD e proteção de dados pessoais",
        resumo: "A LGPD (Lei Geral de Proteção de Dados) regula como dados pessoais podem ser coletados, tratados e armazenados no Brasil, exigindo uma base legal (como consentimento) pra qualquer tratamento e garantindo direitos ao titular dos dados — acessar, corrigir, excluir e saber pra que seus dados estão sendo usados. Ela é frequentemente comparada ao GDPR europeu, que a inspirou, mas são leis de jurisdições diferentes. A lei também distingue dado pessoal comum de dado sensível (saúde, origem racial, orientação sexual etc.), que recebe proteção reforçada.",
        gatilhos: [
          "Texto menciona empresa coletando dados \"sem consentimento claro\" → é violação do princípio de finalidade/consentimento da LGPD, que exige base legal explícita pra tratamento de dado pessoal.",
          "Pergunta sobre \"direito do titular dos dados\" → pense nos direitos garantidos pela lei: acessar, corrigir, excluir e saber pra que seus dados estão sendo usados.",
          "Comparação com legislação europeia → a LGPD é frequentemente descrita como inspirada no GDPR (regulamento europeu), mas são leis de jurisdições diferentes — não trate como idênticas.",
        ],
        pegadinhas: [
          "Achar que a LGPD proíbe qualquer coleta de dado pessoal — ela regula como e sob que condições o dado pode ser coletado/usado, não proíbe a coleta em si.",
          "Confundir \"dado pessoal\" com \"dado sensível\" — a lei trata dados sensíveis (saúde, origem racial, orientação sexual etc.) com regras mais rígidas do que dados pessoais em geral.",
        ],
        exemplo: {
          enunciado: "Um aplicativo de saúde coletou informações sobre condições médicas dos usuários e as compartilhou com anunciantes sem informar essa finalidade no momento do cadastro. Do ponto de vista da LGPD, essa prática é problemática principalmente porque:",
          resolucao: "O caso envolve dado de saúde (categoria de dado sensível, com proteção reforçada pela LGPD) sendo usado para uma finalidade (publicidade) diferente da que foi informada ao usuário no momento da coleta — isso viola o princípio de finalidade e transparência, que exige que o titular saiba, desde o início, para que seus dados serão usados. A resposta certa aponta pro desvio de finalidade sem consentimento adequado para dado sensível; um erro comum é responder genericamente \"porque a empresa coletou dados pessoais\", ignorando que a coleta em si não é proibida — o problema é a falta de transparência e a natureza sensível do dado.",
        },
      },
      {
        tema: "Bolhas de filtro e desinformação nas redes sociais",
        resumo: "\"Bolha de filtro\" descreve o efeito de algoritmos de recomendação que, aprendendo com o engajamento passado do usuário, passam a mostrar cada vez mais conteúdo parecido com o que ele já consome — reduzindo, sem ação deliberada do usuário, a diversidade de pontos de vista apresentados. É diferente de \"câmara de eco\", que descreve o usuário escolhendo ativamente se cercar de quem pensa igual. O modelo de negócio das redes (receita por atenção/engajamento) favorece conteúdo emocional e polarizador, o que ajuda a explicar a velocidade de espalhamento de desinformação.",
        gatilhos: [
          "Texto menciona algoritmo que \"mostra mais do que você já curte\" → é bolha de filtro: curadoria automática reduz diversidade de conteúdo, não é decisão consciente do usuário de se isolar.",
          "Pergunta sobre por que desinformação se espalha rápido → ligue ao modelo de negócio das redes: engajamento (cliques, tempo de tela) é o que gera receita publicitária, e conteúdo emocional/polarizador tende a engajar mais.",
          "Distinção entre \"bolha de filtro\" e \"câmara de eco\" → bolha é efeito do algoritmo (técnico); câmara de eco é efeito social (pessoas se cercando de quem pensa igual) — a banca pode cobrar a diferença.",
        ],
        pegadinhas: [
          "Tratar desinformação como problema só de \"pessoas mal-intencionadas espalhando notícia falsa\" — ignora o papel estrutural do algoritmo e do modelo de negócio de atenção na amplificação desse conteúdo.",
          "Assumir que bolha de filtro é escolha deliberada do usuário — na maior parte dos casos é resultado de curadoria automática que o usuário nem percebe.",
        ],
        exemplo: {
          enunciado: "Um estudo constatou que usuários de uma rede social passaram a ver, ao longo do tempo, um conteúdo cada vez mais homogêneo e alinhado às suas opiniões prévias, mesmo sem terem alterado ativamente suas configurações de busca. Esse fenômeno é conhecido como:",
          resolucao: "A mudança gradual e não intencional no tipo de conteúdo exibido — sem ação deliberada do usuário — é a marca registrada da bolha de filtro: o algoritmo de recomendação aprende com o engajamento passado (curtidas, tempo de visualização) e passa a priorizar conteúdo semelhante, estreitando o leque de visões apresentadas. A resposta correta é \"bolha de filtro\"; a pegadinha é confundir com \"câmara de eco\", que descreveria o usuário buscando ativamente grupos/pessoas que pensam como ele — o enunciado deixa claro que a mudança foi automática, não uma escolha ativa.",
        },
      },
      {
        tema: "Blockchain e criptomoedas",
        resumo: "Blockchain é uma tecnologia de registro distribuído entre vários participantes de uma rede, sem depender de uma autoridade central única, onde cada novo bloco referencia criptograficamente o anterior — o que torna alterar um registro já confirmado extremamente difícil sem que as demais partes percebam. Criptomoeda é apenas UMA aplicação dessa tecnologia (a mais conhecida); blockchain também é usada em rastreamento de cadeia produtiva, contratos e outros registros que se beneficiam de auditabilidade e resistência a fraude retroativa.",
        gatilhos: [
          "Texto menciona \"registro distribuído\" ou \"sem intermediário/banco central\" → é blockchain: o controle não fica numa única entidade, mas replicado entre vários participantes da rede.",
          "Pergunta separando \"blockchain\" de \"criptomoeda\" → criptomoeda é UMA aplicação da tecnologia blockchain (a mais conhecida), não sinônimo dela — blockchain também é usada em rastreamento de cadeia produtiva, contratos, etc.",
          "Menção a \"dificuldade de alterar um registro já feito\" → é a característica de imutabilidade: cada bloco novo referencia criptograficamente o anterior, tornando fraude retroativa difícil de passar despercebida.",
        ],
        pegadinhas: [
          "Tratar blockchain e criptomoeda como sinônimos — é o erro mais comum nesse tema; blockchain é a tecnologia de base, criptomoeda é uma aplicação específica dela.",
          "Assumir que \"descentralizado\" significa \"sem nenhuma regra ou controle\" — a rede ainda opera sob regras de consenso definidas no protocolo, só não depende de uma autoridade central única.",
        ],
        exemplo: {
          enunciado: "Uma empresa de logística passou a registrar cada etapa do transporte de seus produtos em um sistema onde nenhuma parte envolvida consegue alterar sozinha um registro já confirmado pelas demais, aumentando a rastreabilidade da cadeia produtiva. Essa aplicação é um exemplo do uso de:",
          resolucao: "O texto descreve um registro distribuído entre várias partes, onde a alteração unilateral de um dado já confirmado não é possível — essa é a característica central de blockchain (registro descentralizado e resistente a alteração retroativa), aplicada aqui a rastreamento logístico, não a uma moeda. A resposta correta é \"blockchain\"; a pegadinha típica é marcar \"criptomoeda\", que seria válida se o texto estivesse falando de uma moeda digital especificamente — o enunciado deixa claro que a aplicação é rastreamento de produtos, um uso da tecnologia que não envolve dinheiro.",
        },
      },
    ],
  },
  "direitos-humanos": {
    resumo: "Direitos fundamentais, movimentos sociais e igualdade — sempre ligados a um caso ou dado concreto de desigualdade, não a definições abstratas isoladas.",
    gatilhos: [
      "Pergunta sobre um direito fundamental → identifique se é um direito civil, político ou social antes de aplicar ao caso do enunciado.",
      "Texto sobre um movimento social → identifique a demanda central e o obstáculo que ele enfrenta antes de avaliar estratégias.",
      "\"Direito a ter direitos\" (Arendt) → lembre que a autora fala de apátridas/refugiados perderem a condição de sujeitos de direito por não pertencerem a nenhuma comunidade política.",
      "Caso de desigualdade que toca mais de um eixo (raça + gênero + classe) → pense em Sueli Carneiro (interseccionalidade) — não aceite resposta que isole só um dos eixos.",
      "Trecho de manifesto/carta histórica sobre direitos civis, seguido de referência a um debate atual → desconfie de alternativa que generaliza demais o alcance do documento histórico original para o contexto de hoje.",
    ],
    pegadinhas: [
      "Tratar igualdade formal (perante a lei) e igualdade material (de condições reais) como sinônimos.",
      "Reduzir uma pauta de direitos humanos a uma questão só jurídica, ignorando a dimensão social/econômica.",
      "Confundir direitos humanos (universais) com direitos constitucionais de um país específico.",
    ],
    subtemas: [
      {
        tema: "Gerações de direitos humanos e a DUDH",
        resumo: "Direitos humanos costumam ser organizados em gerações: primeira (liberdades civis/políticas — expressão, voto, devido processo), segunda (direitos sociais/econômicos/culturais — educação, saúde, trabalho), terceira (direitos coletivos/difusos — meio ambiente, autodeterminação dos povos). A Declaração Universal dos Direitos Humanos de 1948 (DUDH) é o marco fundador pós-guerra, mas é um documento declaratório — sua efetivação depende de outros instrumentos jurídicos.",
        gatilhos: [
          "Texto sobre liberdade de expressão, voto, devido processo legal → é direito de primeira geração (civil e político).",
          "Texto sobre educação, saúde, trabalho, previdência → é direito de segunda geração (social, econômico e cultural).",
          "Texto sobre meio ambiente saudável, autodeterminação dos povos, direitos que pertencem a coletividades → é direito de terceira geração.",
        ],
        pegadinhas: [
          "Tratar a DUDH (1948) como um tratado com força jurídica de execução direta e automática — é um marco declaratório fundamental, mas sua efetivação depende de outros instrumentos.",
          "Achar que a ordem das \"gerações\" significa que uma substitui a anterior — elas se acumulam.",
        ],
        exemplo: {
          enunciado: "Um texto discute o direito de um povo indígena a um meio ambiente preservado e à autodeterminação sobre o uso de suas terras tradicionais, tratando isso como um direito que pertence à coletividade, não apenas a indivíduos isolados. Esse tipo de direito é classificado como:",
          resolucao: "Direitos que pertencem a coletividades inteiras são classificados como direitos de terceira geração — direitos difusos/coletivos. A pegadinha é confundir com direitos de segunda geração só por envolver prestação positiva do Estado, sem reconhecer o caráter especificamente coletivo/difuso.",
        },
      },
      {
        tema: "Direitos da criança, do adolescente e das pessoas com deficiência",
        resumo: "O ECA (Estatuto da Criança e do Adolescente) estabelece proteção integral e prioridade absoluta, tratando crianças e adolescentes com regime jurídico próprio, não como \"adultos em miniatura\". Direitos das pessoas com deficiência hoje seguem o modelo social (as barreiras do ambiente são o problema a corrigir), substituindo o antigo modelo médico (a deficiência como problema individual a \"consertar\").",
        gatilhos: [
          "Texto sobre criança/adolescente em situação de vulnerabilidade → pense no princípio da proteção integral e prioridade absoluta do ECA.",
          "Texto sobre pessoa com deficiência enfrentando barreira de acesso → ligue à acessibilidade como obrigação ativa da sociedade/Estado de adaptar ambientes, não um favor.",
          "Comparação entre modelo \"médico\" e modelo \"social\" de deficiência → modelo médico trata a deficiência como problema individual; modelo social trata as barreiras do ambiente como o problema — a legislação atual adota o modelo social.",
        ],
        pegadinhas: [
          "Tratar direitos da criança e do adolescente como versão \"reduzida\" dos direitos de um adulto — o ECA estabelece regime jurídico próprio de proteção integral.",
          "Reduzir inclusão de pessoas com deficiência a adaptações físicas — acessibilidade abrange também barreiras comunicacionais e atitudinais.",
        ],
        exemplo: {
          enunciado: "Um texto descreve que uma escola, ao receber um aluno com deficiência visual, não se limita a adaptar o espaço físico, mas também revisa seu material didático para formatos acessíveis e capacita professores para lidar com preconceitos e barreiras atitudinais entre os colegas. Essa abordagem exemplifica principalmente:",
          resolucao: "A escola trata a inclusão como responsabilidade ativa de adaptar múltiplas dimensões — a lógica do modelo social de deficiência. A pegadinha é reduzir a resposta apenas à adaptação física, ignorando as dimensões comunicacional e atitudinal também descritas.",
        },
      },
      {
        tema: "Ações afirmativas e cotas raciais no Brasil",
        resumo: "Ações afirmativas (como cotas raciais em universidades) buscam corrigir desigualdade estrutural de ponto de partida — ligadas ao conceito de igualdade MATERIAL, não igualdade formal (mesma regra pra todos, independente do histórico). A justificativa histórica no Brasil se conecta à desigualdade estrutural herdada do período escravista.",
        gatilhos: [
          "Texto sobre política de cotas raciais em universidades/concursos públicos → ligue ao conceito de igualdade material, não igualdade formal.",
          "Argumento contrário a cotas baseado em \"mérito individual\" → identifique que o debate central não é sobre mérito em si, mas sobre se as condições de partida são equivalentes entre os grupos comparados.",
          "Pergunta sobre justificativa histórica das cotas raciais no Brasil → ligue à desigualdade estrutural resultante do período escravista sem políticas de reparação equivalentes depois.",
        ],
        pegadinhas: [
          "Tratar ações afirmativas como \"privilégio\" desconectado de justificativa histórica de desigualdade estrutural.",
          "Confundir igualdade formal com igualdade material ao avaliar um argumento sobre ações afirmativas.",
        ],
        exemplo: {
          enunciado: "Um texto argumenta que aplicar exatamente os mesmos critérios de seleção a candidatos que tiveram acesso muito desigual a recursos educacionais ao longo da vida não garante, na prática, igualdade de oportunidade real entre eles. Esse argumento é usado com mais frequência para justificar:",
          resolucao: "O argumento de que tratar todos com as mesmas regras não corrige desigualdades reais de ponto de partida é a justificativa central das ações afirmativas: buscar igualdade material, não apenas formal. A pegadinha é tratar isso como argumento contra meritocracia em geral, quando é um argumento sobre condições desiguais para desenvolver esse mérito.",
        },
      },
      {
        tema: "Direito à moradia e refugiados",
        resumo: "Direito à moradia (direito social) vai além de \"ter um teto\" — inclui segurança de posse, habitabilidade e acesso a serviços. Conecta-se a deslocamento forçado (refugiados, deslocados internos) quando o deslocamento retira das pessoas segurança habitacional, sobrepondo vulnerabilidades. Refugiados cruzam fronteira internacional; deslocados internos permanecem no próprio país — proteções legais diferem.",
        gatilhos: [
          "Texto sobre pessoa/família sem moradia adequada, mesmo com algum abrigo → verifique se falta segurança de posse, acesso a serviços ou habitabilidade, não só \"ter um teto\".",
          "Texto sobre despejo/remoção forçada de comunidade → ligue ao direito à moradia como incluindo proteção contra remoção arbitrária.",
          "Texto cruzando deslocamento forçado com precariedade habitacional → reconheça a sobreposição de vulnerabilidades.",
        ],
        pegadinhas: [
          "Tratar direito à moradia como sinônimo simples de \"ter uma casa\" — o conceito é mais amplo.",
          "Tratar refugiados e deslocados internos como a mesma categoria jurídica — deslocados internos não cruzam fronteira.",
        ],
        exemplo: {
          enunciado: "Um texto descreve famílias que, após um conflito armado interno, permaneceram dentro do próprio território nacional, mas perderam suas casas e vivem em assentamentos temporários sem segurança sobre a permanência no local. Essas famílias são classificadas juridicamente como:",
          resolucao: "Como permaneceram dentro do próprio país, sem cruzar fronteira internacional, são deslocados internos, não refugiados. A pegadinha é classificá-las como \"refugiados\" só por terem perdido moradia por conflito, sem observar que a definição de refugiado exige deslocamento internacional.",
        },
      },
    ],
  },
  "filosofia-sociologia": {
    resumo: "Ética, pensamento crítico e teorias sociológicas clássicas — decore a definição precisa de cada conceito, não só o nome do pensador associado a ele.",
    gatilhos: [
      "Personagem/situação submissa, incapaz de romper com autoridade externa → pense em Kant: menoridade (incapacidade de usar o próprio entendimento sem tutela) → maioridade (uso autônomo e corajoso da razão).",
      "Situação envolvendo mercantilização de algo (arte, dado pessoal, trabalho) → pense em Marx: mercadoria e fetichismo da mercadoria (o valor de troca ganha vida própria e esconde a relação de trabalho por trás do objeto).",
      "Regime que anula a individualidade das pessoas → pense em Arendt: totalitarismo (forma de poder que torna indivíduos supérfluos e intercambiáveis).",
      "Burocrata \"comum\" cometendo uma atrocidade → pense em Arendt: banalidade do mal (conceito diferente de totalitarismo — o mal cometido por quem renuncia a pensar/julgar por conta própria).",
      "Conceito filosófico/sociológico citado (mesmo sem nome do pensador) cruzado com uma obra de arte, música ou filme → é o padrão mais característico desta banca: nunca pergunta \"sobre\" o pensador isolado, sempre pede a articulação entre conceito e manifestação cultural.",
      "Argumento sobre desigualdade que toca mais de um eixo (raça, gênero, classe) → pense em Sueli Carneiro (interseccionalidade) — não aceite uma alternativa que isole só um dos eixos como resposta suficiente.",
      "Diagnóstico sobre aceleração/fluidez das relações sociais na modernidade → pense em Anthony Giddens (\"Mundo em Descontrole\") — nome confirmado no repertório oficial de Sociologia desta banca.",
    ],
    pegadinhas: [
      "Citar o nome de um pensador sem explicar o conceito com precisão — bancas de discursiva costumam exigir \"precisão conceitual\", não só repertório decorativo.",
      "Confundir conceitos de obras diferentes do mesmo autor (ex.: totalitarismo × banalidade do mal, em Arendt, vêm de livros diferentes).",
      "Tratar contrato social como uma teoria única — Hobbes, Locke e Rousseau partem de premissas bem diferentes sobre o estado de natureza.",
    ],
    subtemas: [
      {
        tema: "Contratualismo: Hobbes, Locke e Rousseau",
        resumo: "Os três contratualistas concordam que a sociedade/poder político surge de um pacto, mas discordam sobre o estado de natureza que motiva esse pacto: Hobbes o vê como violento (\"guerra de todos contra todos\"), justificando um soberano absoluto; Locke o vê como relativamente pacífico mas inseguro quanto à propriedade, justificando um governo limitado que protege direitos naturais; Rousseau vê o homem como originalmente livre e bom, corrompido pela propriedade privada, justificando a soberania popular pela vontade geral.",
        gatilhos: [
          "Texto descreve estado de natureza como violento, \"guerra de todos contra todos\" → é Hobbes; a saída é um soberano absoluto.",
          "Texto descreve estado de natureza como relativamente pacífico mas inseguro quanto à propriedade → é Locke; a saída é um governo limitado que protege direitos naturais já existentes.",
          "Texto descreve o homem como originalmente bom/livre, corrompido pela sociedade e pela propriedade privada → é Rousseau; a saída é a soberania popular pela \"vontade geral\".",
        ],
        pegadinhas: [
          "Tratar \"contrato social\" como teoria única — os três partem de premissas radicalmente diferentes e chegam a conclusões políticas distintas.",
          "Confundir Locke com Rousseau por ambos criticarem poder absoluto — Locke defende propriedade privada como direito a proteger; Rousseau a vê como origem da desigualdade.",
        ],
        exemplo: {
          enunciado: "Um filósofo argumenta que, antes da formação da sociedade, os seres humanos viviam livres e relativamente iguais, mas que o surgimento da propriedade privada gerou desigualdade e conflito, tornando necessário um pacto baseado na vontade coletiva para restaurar a liberdade em novas bases. Esse argumento é característico do pensamento de:",
          resolucao: "A ideia de estado de natureza originalmente livre, corrompido pela propriedade privada, e solução pela vontade coletiva é marca de Rousseau, diferente de Hobbes (estado violento, soberano absoluto) e Locke (propriedade como direito a proteger). A pegadinha é confundir com Locke só por ambos tratarem de propriedade.",
        },
      },
      {
        tema: "Correntes sociológicas: Durkheim, Weber e Marx",
        resumo: "Três abordagens fundadoras com métodos distintos: Durkheim estuda \"fatos sociais\" externos e coercitivos ao indivíduo, focado em coesão/solidariedade social; Weber foca no sentido SUBJETIVO que o indivíduo dá à própria ação (\"ação social\") e em processos como racionalização/burocratização; Marx explica fenômenos sociais a partir do conflito de classe ligado ao modo de produção econômico (materialismo histórico).",
        gatilhos: [
          "Texto trata a sociedade como algo externo ao indivíduo, que o coage (normas, leis, moral coletiva) → é Durkheim; pense em \"fato social\" e solidariedade mecânica/orgânica.",
          "Texto foca no SENTIDO SUBJETIVO que o indivíduo dá à própria ação → é Weber; pense em \"ação social\" e racionalização/burocratização.",
          "Texto explica um fenômeno a partir de interesses de classe ligados ao modo de produção econômico → é Marx; a estrutura econômica molda ideias e instituições, não o contrário.",
        ],
        pegadinhas: [
          "Tratar \"sociologia clássica\" como escola única — os três partem de métodos e unidades de análise bem diferentes.",
          "Aplicar \"fato social\" de Durkheim a um argumento que na verdade é sobre sentido subjetivo (que seria Weber).",
        ],
        exemplo: {
          enunciado: "Um sociólogo argumenta que, para compreender por que um funcionário segue rigorosamente um procedimento burocrático mesmo sem supervisão direta, é preciso entender o significado que essa pessoa atribui subjetivamente ao cumprimento da regra, e não apenas constatar a existência da norma. Essa abordagem é característica do método de:",
          resolucao: "O foco no significado subjetivo é a marca do método weberiano de \"ação social\". A pegadinha é confundir com Durkheim, que trataria a norma apenas como fato social coercitivo externo, sem se preocupar com o sentido subjetivo.",
        },
      },
      {
        tema: "Ética kantiana e utilitarismo",
        resumo: "Ética kantiana (deontológica) julga uma ação pelo PRINCÍPIO/DEVER por trás dela (imperativo categórico: aja só segundo máxima universalizável), independente das consequências. Utilitarismo (consequencialista) julga uma ação pelo RESULTADO, buscando maximizar o bem-estar agregado do maior número — a mesma ação pode ser julgada diferente por cada critério.",
        gatilhos: [
          "Texto julga uma ação pelo PRINCÍPIO/DEVER, independente do resultado → é ética kantiana; pense no imperativo categórico.",
          "Texto julga uma ação pelo RESULTADO/CONSEQUÊNCIA, buscando o maior bem-estar pro maior número → é utilitarismo.",
          "Dilema ético clássico → aplique os dois critérios separadamente: pelo dever (Kant) e pela consequência (utilitarismo) — a banca pode pedir as duas respostas separadas pro mesmo caso.",
        ],
        pegadinhas: [
          "Achar que ética kantiana e utilitarismo sempre chegam à mesma conclusão prática — frequentemente divergem por avaliarem critérios diferentes.",
          "Tratar utilitarismo como \"fazer o que dá mais prazer pra mim\" — o critério é o bem-estar AGREGADO do maior número, não satisfação individual isolada.",
        ],
        exemplo: {
          enunciado: "Diante do dilema de mentir para proteger um amigo de uma situação constrangedora, um filósofo argumenta que a mentira é moralmente errada independentemente de suas boas intenções ou de seu resultado, pois a mentira, se universalizada como regra para todos, tornaria a própria confiança social impossível. Esse argumento é característico de qual corrente ética?",
          resolucao: "O argumento avalia a ação pelo princípio universalizável, não pelo resultado favorável — é a lógica do imperativo categórico kantiano. A pegadinha é confundir com utilitarismo, que avaliaria a mesma mentira pelo resultado (proteger o amigo) e poderia chegar a uma conclusão oposta.",
        },
      },
      {
        tema: "Foucault, biopolítica e pensamento contemporâneo",
        resumo: "Foucault estuda como o PODER opera não só por repressão visível, mas por mecanismos difusos e normalizadores presentes em instituições (prisões, escolas, hospitais) que disciplinam corpos e comportamentos. \"Biopolítica\" refere-se especificamente ao poder exercido sobre a vida biológica de populações (saúde, natalidade) como objeto de gestão do Estado, distinto do poder soberano tradicional (direito de matar/punir).",
        gatilhos: [
          "Texto descreve poder exercido através de vigilância constante, normas institucionais e disciplina de corpos (escola, prisão, hospital) → pense em Foucault: poder disciplinar, difuso, presente em instituições cotidianas.",
          "Texto sobre políticas de saúde pública, controle de natalidade, gestão de populações inteiras → é biopolítica: o Estado administrando a vida biológica da população.",
          "Comparação entre poder \"antigo\" (soberano, direito de punir) e poder \"moderno\" (gestão da vida) → a mudança de eixo é o ponto central.",
        ],
        pegadinhas: [
          "Tratar \"poder\" em Foucault como sinônimo de \"repressão do Estado\" — o conceito é mais amplo e difuso, presente em relações cotidianas.",
          "Confundir biopolítica com política de saúde pública genérica — biopolítica é sobre a vida biológica da POPULAÇÃO como objeto de gestão.",
        ],
        exemplo: {
          enunciado: "Um texto argumenta que, a partir de certo momento histórico, o poder estatal deixou de se concentrar apenas no direito de punir ou executar indivíduos e passou a se ocupar cada vez mais da gestão da saúde, natalidade e expectativa de vida da população como um todo, por meio de políticas públicas. Esse deslocamento é analisado teoricamente pelo conceito de:",
          resolucao: "A mudança do poder centrado em punir corpos para o poder centrado em administrar a vida biológica populacional é exatamente a biopolítica de Foucault. A pegadinha é confundir isso com descrição genérica de \"política de saúde\", sem reconhecer o conceito analítico específico.",
        },
      },
    ],
  },
  "artes-cultura": {
    resumo: "Movimentos artísticos e indústria cultural — a banca gosta de ligar uma obra a um conceito teórico e depois pedir pra aplicar isso a uma questão contemporânea.",
    gatilhos: [
      "Obra que mistura culturas/vanguardas sem hierarquia de \"puro x impuro\" → pense em antropofagia/modernismo brasileiro — tema quase garantido em alguma forma.",
      "Produto de cultura de massa padronizado (cinema comercial, hit pop, série de streaming) → pense em indústria cultural (Adorno/Horkheimer): padronização, pseudo-individualização, entretenimento que neutraliza a crítica.",
      "\"Isso ainda vale hoje?\" ao final de uma questão sobre uma obra antiga → é convite pra você relacionar o conceito histórico a uma questão contemporânea concreta.",
      "Menção a música popular brasileira ou internacional (MPB, rock) como texto-base → pense primeiro na crítica social embutida na letra, não na biografia do artista — o repertório oficial da banca é musical, não só de artes visuais.",
      "Obra ou texto ligado a desigualdade racial/de gênero ou totalitarismo → pense em Sueli Carneiro (interseccionalidade) e Hannah Arendt (totalitarismo) — os dois nomes de repertório mais confirmados desta banca neste eixo.",
    ],
    pegadinhas: [
      "Tratar antropofagia como \"orgulho nacional\" simples — o conceito de Oswald de Andrade é sobre devoração crítica e seletiva da cultura estrangeira, não rejeição nem aceitação passiva.",
      "Descrever a obra sem nenhum detalhe concreto (nome de personagem, verso, cena, técnica) — respostas vagas perdem nota mesmo com repertório teórico correto.",
      "Confundir movimento artístico com período histórico (nem toda obra \"moderna\" no sentido cronológico é \"modernista\" no sentido do movimento).",
      "Uma alternativa \"correta pela metade\" que liga a obra ao tema só pelo assunto genérico (ex.: \"fala sobre a cidade\") sem captar a crítica social específica do artista — é o distrator mais citado deste bloco.",
    ],
    subtemas: [
      {
        tema: "Renascimento e Barroco",
        resumo: "O Renascimento (séculos XIV-XVI, começando na Itália) retomou ideais estéticos clássicos greco-romanos — proporção, simetria, humanismo (o homem como centro/medida) — em contraste com a arte medieval centrada no religioso. O Barroco (século XVII) que o sucedeu reagiu com movimento dramático, forte contraste de luz e sombra (claro-escuro) e intensidade emocional, frequentemente a serviço da Contrarreforma religiosa.",
        gatilhos: [
          "Obra com proporção equilibrada, simetria, temas humanistas → pense em Renascimento; ligue à retomada de ideais clássicos greco-romanos e ao humanismo.",
          "Obra com movimento dramático, forte contraste de luz e sombra (claro-escuro), emoção intensa → pense em Barroco; ligue frequentemente ao contexto da Contrarreforma.",
          "Pergunta pedindo pra diferenciar Renascimento de Barroco → compare pelas características formais (equilíbrio/simetria vs. movimento/contraste), não só por nomes de artistas.",
        ],
        pegadinhas: [
          "Tratar Renascimento e Barroco como sinônimos de \"arte antiga europeia\" genérica — são períodos com estéticas e propósitos distintos.",
          "Reduzir a diferença entre os dois períodos só ao tema religioso — a diferença central está na forma (equilíbrio vs. drama).",
        ],
        exemplo: {
          enunciado: "Uma obra de pintura descrita num texto apresenta forte contraste entre áreas muito iluminadas e áreas em sombra profunda, figuras em posições dramáticas e em movimento intenso, associada a um contexto de reafirmação religiosa católica. Essa descrição é mais coerente com o estilo:",
          resolucao: "O contraste acentuado de luz e sombra, o movimento dramático e a associação com a Contrarreforma são características centrais do Barroco. A pegadinha é confundir com Renascimento, caracterizado por equilíbrio, simetria e serenidade formal — o oposto do descrito.",
        },
      },
      {
        tema: "Semana de Arte Moderna de 1922",
        resumo: "Evento em São Paulo que lançou o modernismo brasileiro — ruptura com a tradição artística acadêmica/parnasiana e busca por uma linguagem artística genuinamente brasileira, cristalizada depois no conceito de antropofagia (manifesto de Oswald de Andrade, 1928): devorar/absorver criticamente influências estrangeiras, sem copiá-las passivamente nem rejeitá-las por completo.",
        gatilhos: [
          "Texto sobre ruptura com tradição artística acadêmica/europeia no Brasil início do século XX → é a Semana de Arte Moderna de 1922; ligue à busca por linguagem artística brasileira própria.",
          "Menção a obra que mistura referências estrangeiras e nacionais sem hierarquia de \"puro x impuro\" → pense em antropofagia; é devorar criticamente a influência estrangeira, não rejeitar nem copiar passivamente.",
          "Pergunta pede \"o que a Semana de 22 rompeu\" → identifique especificamente o parnasianismo/academicismo como modelo estético anterior contestado.",
        ],
        pegadinhas: [
          "Tratar antropofagia como \"orgulho nacional\" simples — o conceito é sobre devoração crítica e seletiva, não nacionalismo isolacionista.",
          "Achar que a Semana de 1922 foi bem recebida no momento — gerou forte resistência do público e crítica tradicional na época.",
        ],
        exemplo: {
          enunciado: "Um manifesto artístico brasileiro do início do século XX defende que a cultura nacional deveria absorver criticamente influências estrangeiras, \"devorando-as\" e transformando-as em algo genuinamente brasileiro, em vez de simplesmente copiá-las ou rejeitá-las por completo. Esse manifesto expressa o conceito de:",
          resolucao: "Absorver criticamente e transformar influências estrangeiras é a definição central de antropofagia, de Oswald de Andrade. A pegadinha é interpretar o conceito como nacionalismo defensivo (rejeitar o estrangeiro), quando propõe justamente o oposto: absorção crítica e criativa.",
        },
      },
      {
        tema: "Indústria cultural e cultura de massa",
        resumo: "\"Indústria cultural\" (Adorno/Horkheimer, Escola de Frankfurt) critica como produtos culturais em massa (filme, música, TV) são padronizados como mercadoria industrial, oferecendo ilusão de escolha individual (\"pseudo-individualização\") enquanto pacificam o pensamento crítico através de puro entretenimento/distração.",
        gatilhos: [
          "Produto cultural produzido em série, seguindo fórmulas repetitivas de sucesso → pense em indústria cultural: padronização do produto cultural como mercadoria industrial.",
          "Produto que oferece pequenas variações superficiais dentro de uma fórmula repetida → é \"pseudo-individualização\", a ilusão de escolha/diferença dentro da padronização.",
          "Texto associa consumo de entretenimento de massa a distração/neutralização da crítica social → é a crítica central da indústria cultural.",
        ],
        pegadinhas: [
          "Tratar \"indústria cultural\" apenas como \"produção em grande escala de cultura\" sem a dimensão crítica do conceito.",
          "Confundir pseudo-individualização (variação superficial dentro de fórmula) com diversidade cultural real — são conceitos opostos.",
        ],
        exemplo: {
          enunciado: "Um texto observa que grande parte dos filmes de grande sucesso comercial de um determinado gênero seguem uma estrutura narrativa quase idêntica, variando apenas elementos superficiais como cenário ou elenco, e argumenta que essa fórmula é repetida porque garante previsibilidade de consumo e lucro. Essa análise é característica do conceito de:",
          resolucao: "A repetição de fórmula padronizada com variações superficiais criando aparência de novidade é a crítica de Adorno e Horkheimer à indústria cultural. A pegadinha é tratar isso apenas como \"estratégia de mercado eficiente\", sem reconhecer a crítica teórica mais ampla.",
        },
      },
      {
        tema: "Arte urbana e arte digital",
        resumo: "Arte urbana (grafite, arte de rua) ocupa espaço público frequentemente fora dos circuitos institucionais (museus/galerias), com o LOCAL da obra costumando ser parte do significado. Arte digital usa mídias tecnológicas novas (software, internet, imagens geradas por IA), levantando questões sobre autoria e o que significa \"original\" quando a obra é infinitamente reproduzível.",
        gatilhos: [
          "Texto sobre intervenção artística em espaço público, fora de museus/galerias → pense em arte urbana; considere que o LOCAL da obra costuma ser parte do significado.",
          "Obra de arte urbana associada a crítica social/política específica de um contexto local → não trate como \"vandalismo\"; boa parte da arte urbana contemporânea tem reconhecimento institucional.",
          "Texto sobre arte produzida com ferramentas digitais/algorítmicas → pense nas questões de autoria e do que significa \"original\" quando a obra é infinitamente reproduzível.",
        ],
        pegadinhas: [
          "Tratar toda arte urbana como sinônimo de vandalismo sem intenção artística.",
          "Assumir que arte digital é \"menos arte\" por não ter suporte físico único.",
        ],
        exemplo: {
          enunciado: "Um artista pinta um mural numa comunidade específica, retratando uma figura histórica local associada a uma luta social do bairro, escolhendo deliberadamente aquele muro e não outro suporte disponível. Essa escolha do local é mais bem interpretada como:",
          resolucao: "Na arte urbana, o local específico costuma ser parte constitutiva do significado da obra, criando diálogo direto com o contexto social/histórico do espaço. A pegadinha é tratar a escolha do muro como mera questão prática, ignorando a intenção de diálogo com o contexto local.",
        },
      },
    ],
  },
  "ciencias-natureza": {
    resumo: "Ausente do vestibular objetivo da FGV Direito (confirmado: SP e RJ não testam Física, Química nem Biologia em nenhuma fase); mantida aqui como reforço de cultura geral aplicada a temas contemporâneos (saúde pública, energia, meio ambiente), no estilo mais próximo do ENEM — a banca mais parecida com o perfil \"noções gerais\" que esta frente busca.",
    gatilhos: [
      "Pergunta sobre um fenômeno ligado a saúde pública (vacina, epidemia) → pense em conceitos básicos de biologia (imunidade, transmissão) aplicados ao caso concreto do enunciado.",
      "Pergunta sobre fonte de energia → separe renovável de não-renovável e pense no princípio físico/químico por trás (combustão, fissão, radiação solar).",
      "Dado numérico de concentração/proporção em um contexto ambiental (CO₂, poluentes) → trate como um problema de proporção antes de aplicar conceito de ciências.",
      "Situação descrita envolvendo duas espécies/organismos interagindo (ex.: ave que se alimenta de parasitas de um mamífero) → identifique o tipo de relação ecológica (mutualismo, comensalismo, parasitismo, predatismo, competição) pelo padrão de benefício/prejuízo de cada lado — Ecologia é o tema mais cobrado no estilo ENEM que inspira esta frente.",
      "Processo com liberação ou absorção de energia (combustão, bolsa térmica) → identifique primeiro se é exotérmico ou endotérmico antes de qualquer outro raciocínio.",
    ],
    pegadinhas: [
      "Tentar aplicar conhecimento técnico aprofundado quando a prova pede só noção geral aplicada a um contexto — não é prova de biologia/química/física pura.",
      "Confundir unidades de medida (ex.: potência × energia) em questões que combinam ciências com matemática básica.",
      "Confundir processo biológico/físico/químico \"vizinho\" mas incorreto (respiração celular × fotossíntese; refração × reflexão; exotérmico × endotérmico) — é o padrão de erro mais citado nas 3 ciências no estilo ENEM.",
    ],
    subtemas: [
      {
        tema: "Ecologia: cadeias alimentares e biodiversidade",
        resumo: "Cadeias alimentares descrevem o fluxo de energia entre níveis tróficos (produtores → consumidores primários → secundários → decompositores); cada transferência perde a maior parte da energia como calor (só cerca de 10% passa pro próximo nível), o que explica por que cadeias raramente passam de 4-5 níveis e por que predadores de topo são naturalmente raros. Perda de biodiversidade em qualquer nível pode gerar efeito cascata por toda a teia alimentar.",
        gatilhos: [
          "Pergunta sobre nível trófico → identifique a posição pela fonte de energia (fotossíntese, comer planta, comer outro animal, decompor matéria orgânica).",
          "Dado sobre energia diminuindo a cada nível da cadeia → só cerca de 10% da energia passa de um nível pro próximo — é por isso que predadores de topo são naturalmente raros.",
          "Texto sobre extinção/redução de uma espécie específica → pense no efeito cascata sobre outras espécies da cadeia/teia, não só no impacto isolado.",
        ],
        pegadinhas: [
          "Achar que toda a energia de um nível trófico passa integralmente pro próximo — a maior parte se perde como calor.",
          "Tratar cadeia alimentar como sequência linear isolada — na natureza a maioria das espécies participa de teias interligadas.",
        ],
        exemplo: {
          enunciado: "Um ecossistema perde, devido a uma doença, grande parte de sua população de um predador de topo. Alguns anos depois, observa-se um crescimento descontrolado da população de uma espécie herbívora que antes era controlada por esse predador, seguido de degradação da vegetação da região. Esse encadeamento de eventos ilustra principalmente:",
          resolucao: "A remoção de um predador de topo desencadeou um efeito cascata: sem controle predatório, a população herbívora cresceu descontroladamente, degradando a vegetação. A pegadinha é tratar a perda do predador como evento isolado, sem conectar às consequências indiretas sobre outros níveis da cadeia.",
        },
      },
      {
        tema: "Saúde pública: vacinas e resistência bacteriana",
        resumo: "Vacinas treinam o sistema imunológico a reconhecer um agente (de forma enfraquecida/inativada ou por fragmentos) sem causar a doença completa, criando memória imunológica. Resistência bacteriana surge por seleção natural: bactérias com mutação que resiste a um antibiótico sobrevivem e se reproduzem mais, tornando a resistência mais comum na população com o tempo — uso inadequado de antibióticos acelera essa pressão seletiva.",
        gatilhos: [
          "Texto sobre como uma vacina funciona → pense em \"treinar\" o sistema imunológico a reconhecer um agente sem causar a doença completa — a proteção vem da memória imunológica.",
          "Texto sobre bactérias sobrevivendo a um antibiótico ao longo do tempo → é resistência bacteriana por seleção natural, não uma resposta adaptativa intencional da bactéria.",
          "Pergunta sobre uso inadequado de antibióticos → ligue ao aumento da pressão seletiva que acelera o surgimento de resistência.",
        ],
        pegadinhas: [
          "Confundir o mecanismo de vacinas (prevenção, treino do sistema imune) com o de antibióticos (tratamento direto de infecção já instalada).",
          "Tratar resistência bacteriana como algo que a bactéria \"decide\" desenvolver — é seleção natural sobre variação genética já existente, não resposta intencional.",
        ],
        exemplo: {
          enunciado: "Um texto explica que, ao longo de repetidos tratamentos com um mesmo antibiótico numa população, uma pequena fração de bactérias que já possuía, por acaso, uma característica genética de resistência sobreviveu e se reproduziu mais que as demais, tornando essa resistência cada vez mais comum na população bacteriana. Esse processo é mais bem descrito como um exemplo de:",
          resolucao: "O texto descreve seleção natural: variação genética pré-existente confere vantagem de sobrevivência sob pressão do antibiótico. A pegadinha é descrever isso como as bactérias \"desenvolvendo\" resistência ativamente, quando a variação já existia antes da exposição ao antibiótico.",
        },
      },
      {
        tema: "Física básica: energia, eletricidade e ondas",
        resumo: "Energia se transforma entre formas (cinética, potencial, térmica) mas o total se conserva, nunca é criada/destruída. Circuitos simples relacionam tensão, corrente e resistência. Ondas se dividem em mecânicas (precisam de meio material, como o som) e eletromagnéticas (se propagam até no vácuo, como a luz) — essa distinção resolve boa parte das questões do tema.",
        gatilhos: [
          "Situação envolvendo transformação de energia → identifique as formas envolvidas e lembre que a energia total se conserva, apenas muda de forma.",
          "Problema envolvendo circuito elétrico simples → aumentar a resistência, mantendo a tensão constante, reduz a corrente (não aumenta).",
          "Pergunta sobre ondas (som, luz, rádio) → identifique se é onda mecânica (precisa de meio material) ou eletromagnética (se propaga até no vácuo).",
        ],
        pegadinhas: [
          "Achar que energia pode ser \"criada\" ou \"perdida\" totalmente — ela se transforma, mas o total se conserva.",
          "Tratar todas as ondas como se precisassem de meio material — vale pra ondas mecânicas, não pras eletromagnéticas.",
        ],
        exemplo: {
          enunciado: "Um som produzido na Terra não consegue ser ouvido no vácuo do espaço, enquanto a luz de uma estrela distante consegue atravessar o vácuo espacial e chegar até nós. Essa diferença de comportamento entre som e luz se explica porque:",
          resolucao: "O som é onda mecânica, que depende de meio material pra se propagar (vibração de partículas); a luz é onda eletromagnética, que não depende de meio material. A pegadinha é tratar som e luz como fenômenos da mesma natureza física só por ambos serem \"ondas\".",
        },
      },
      {
        tema: "Química ambiental: poluição e reciclagem",
        resumo: "Poluentes diferentes têm mecanismos distintos: gases de efeito estufa retêm calor, óxidos de enxofre/nitrogênio causam chuva ácida, metais pesados/poluentes persistentes se bioacumulam ao longo da cadeia alimentar. \"Reciclável\" tecnicamente não garante reciclagem viável na prática — contaminação e mistura de materiais são barreiras reais.",
        gatilhos: [
          "Poluente associado a chuva ácida (óxidos de enxofre/nitrogênio) → é mecanismo químico diferente do efeito estufa; não trate todo \"poluente do ar\" como o mesmo tipo de problema.",
          "Texto sobre metal pesado ou poluente persistente contaminando um ecossistema → pense em bioacumulação: a substância se concentra progressivamente ao longo da cadeia alimentar.",
          "Texto sobre material \"reciclável\" que não é efetivamente reciclado na prática → pense em contaminação/mistura de materiais como barreira real.",
        ],
        pegadinhas: [
          "Tratar todo poluente atmosférico como equivalente e com o mesmo mecanismo de dano.",
          "Achar que qualquer material reciclável é automaticamente reciclado na prática.",
        ],
        exemplo: {
          enunciado: "Um peixe predador de topo numa cadeia alimentar aquática apresenta concentração de um poluente metálico muito superior à concentração desse mesmo poluente na água ou nos organismos da base da cadeia alimentar. Esse fenômeno é explicado por:",
          resolucao: "É bioacumulação/biomagnificação: substâncias persistentes se concentram progressivamente à medida que sobem na cadeia alimentar, já que cada predador acumula o poluente de todas as presas consumidas. A pegadinha é achar que a concentração alta no predador indica contaminação direta da água naquele ponto, sem considerar o acúmulo progressivo.",
        },
      },
    ],
  },
};
