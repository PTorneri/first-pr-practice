// Achado 1 (conteúdo teórico por frente): resumo curto + "gatilhos" (padrão
// do enunciado → método de resolução) + "pegadinhas" (armadilhas recorrentes)
// por frente. Conteúdo original, escrito com base no formato conhecido das
// provas objetivas da FGV Direito SP e do Insper (mesma base de
// estudo-provas-fgv-insper.pdf) — não é cópia de nenhuma prova real nem do
// site concorrente analisado em analise-app-concorrente.pdf.
window.THEORY = {
  "interpretacao-texto": {
    resumo: "A banca cobra leitura crítica, não decoreba: ideia central, relação entre parágrafos, função de conectivos e a diferença entre \"o que o texto diz\" e \"o que se pode inferir dele\".",
    gatilhos: [
      "\"Qual a ideia central/tese do texto?\" → releia o último parágrafo antes de decidir; ele costuma retomar/resumir a tese.",
      "\"De acordo com o texto...\" → a resposta precisa ter base literal no texto; elimine alternativas plausíveis mas não sustentadas por ele.",
      "Pergunta sobre a função de um conectivo (mas, portanto, embora, contudo) → identifique a relação lógica (oposição, conclusão, concessão) antes de olhar as alternativas.",
      "\"Sentido conotativo/figurado de uma palavra no texto\" → substitua mentalmente a palavra pelo sentido literal e veja se o parágrafo ainda faz sentido; se sim, é conotativo.",
      "Pergunta sobre o público-alvo ou veículo de publicação do texto → observe o registro de linguagem (formal/informal) e referências temporais/culturais.",
    ],
    pegadinhas: [
      "Alternativa que repete palavras do texto mas inverte a relação de causa e efeito.",
      "Alternativa \"quase certa\" que generaliza demais algo que o texto disse com ressalvas.",
      "Confundir a opinião do autor com a opinião de uma voz citada dentro do texto (discurso indireto ou citação).",
      "Escolher a alternativa mais \"bem escrita\" em vez da mais fiel ao texto — a banca testa fidelidade, não estilo.",
    ],
  },
  "gramatica": {
    resumo: "Concordância verbal/nominal, regência, crase, pontuação e coesão textual — sempre aplicados a frases de contexto real, não frases soltas de decoreba.",
    gatilhos: [
      "Sujeito composto antes do verbo → concorda no plural; se resumido por \"tudo/nada/ninguém\", o verbo vai para o singular.",
      "\"a\"/\"à\" antes de palavra feminina → confira a regência do verbo (ele exige \"a\"?) e se há artigo antes do substantivo.",
      "Vírgula antes de \"que\" → confira se a oração é explicativa (usa vírgula) ou restritiva (sem vírgula) — muda o sentido da frase.",
      "\"Reescreva mantendo o sentido\" → cuidado com mudança de regência ao trocar o verbo (ex.: \"assistir o filme\" informal vs. \"assistir ao filme\" norma culta).",
    ],
    pegadinhas: [
      "Concordância com \"a maioria dos/a maior parte de\" — pode concordar no singular (com o núcleo) ou no plural (com o termo posposto); a banca cobra reconhecer que ambas existem, não decorar uma única regra.",
      "Crase antes de palavra masculina — nunca ocorre; é a pegadinha mais repetida em provas objetivas.",
      "Regência distinta entre verbos como \"perceber\" (transitivo direto) e \"aspirar a\" (transitivo indireto), confundida pelo uso oral comum.",
      "Pontuação de aposto e vocativo — esquecer a vírgula de fechamento quando o aposto está no meio da frase.",
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
    ],
    pegadinhas: [
      "Somar percentuais em vez de multiplicar fatores em aumentos/descontos sucessivos (\"20% + 20% = 40%\" está errado).",
      "Confundir \"percentual sobre o valor final\" com \"percentual sobre o valor original\".",
      "Dividir uma conta ou corrida igualmente quando o enunciado pede divisão proporcional ao esforço/participação de cada um.",
      "Em problemas de MMC com ciclos assimétricos, assumir que o ciclo inteiro fica no estado \"coincidente\" — na prática, só a interseção real dos subintervalos conta.",
      "Trocar a ordem de eventos dependentes em probabilidade (calcular como se fossem independentes quando não são).",
    ],
  },
  "ingles": {
    resumo: "100% reading comprehension — não há gramática isolada. O desafio é vocabulário em contexto, inferência e identificar a ideia central de um texto jornalístico ou de opinião.",
    gatilhos: [
      "Palavra desconhecida no meio do texto → não pare; o contexto ao redor (frase anterior e seguinte) quase sempre entrega o sentido aproximado.",
      "\"What is the main idea of the passage?\" → confira o título e a primeira/última frase do parágrafo-chave antes de decidir.",
      "\"According to the author...\" → a resposta precisa ter base literal no texto, não no que você acha que é verdade sobre o tema.",
      "Falsos cognatos (\"actually\", \"pretend\", \"parents\", \"push\") → desconfie sempre que a tradução literal para o português soar estranha na frase.",
    ],
    pegadinhas: [
      "Escolher a alternativa que é verdadeira no mundo real mas não é o que o texto especificamente afirma.",
      "Traduzir um falso cognato pelo sentido em português (\"actually\" = \"na verdade\", não \"atualmente\").",
      "Confundir o tom do autor (crítico, irônico, neutro) com o tom de uma citação dentro do texto.",
    ],
  },
  "historia-brasil": {
    resumo: "Do período colonial à redemocratização, com ênfase recorrente em república, cidadania, movimentos sociais e a relação entre economia e política em cada período.",
    gatilhos: [
      "Pergunta sobre \"causas\" de um evento → pense em pelo menos 2 fatores (econômico + político/social), a banca raramente aceita causa única.",
      "Comparação entre dois períodos (ex.: Primeira República × Era Vargas) → organize por eixo (economia, política, sociedade) antes de comparar.",
      "Trecho de fonte primária (discurso, carta, manifesto) → identifique quem fala, pra quem, e com que intenção, antes de ligar ao contexto histórico.",
    ],
    pegadinhas: [
      "Datar eventos por \"década aproximada\" quando a prova pede o marco exato (ex.: confundir Proclamação da República com Constituição de 1891).",
      "Atribuir uma mudança social só à vontade de um governante, ignorando pressão de movimentos sociais/econômicos que a antecederam.",
      "Confundir nomes de instituições/siglas semelhantes de períodos diferentes.",
    ],
  },
  "historia-geral": {
    resumo: "Revoluções, guerras mundiais, Guerra Fria e globalização — com foco em processos de longa duração e nas conexões entre eventos, não datas isoladas.",
    gatilhos: [
      "Pergunta sobre \"consequências\" de um evento → pense em curto E longo prazo; a banca gosta de testar efeitos que só apareceram décadas depois.",
      "Comparação entre dois blocos/ideologias (capitalismo × socialismo, por exemplo) → organize por critério (economia, poder político, direitos individuais) antes de escrever.",
      "Mapa ou linha do tempo no enunciado → localize primeiro o período/região exatos antes de aplicar conhecimento geral do tema.",
    ],
    pegadinhas: [
      "Tratar processos históricos como binários (\"só causa X\" ou \"só causa Y\") quando o gabarito espera reconhecer multicausalidade.",
      "Confundir a cronologia de eventos próximos (ex.: ordem entre tratados/conferências de um mesmo período).",
      "Aplicar um conceito europeu (ex.: \"revolução industrial\") de forma genérica demais a um contexto fora da Europa sem as devidas ressalvas.",
    ],
  },
  "geografia": {
    resumo: "Urbanização, migrações, geopolítica de recursos e questão ambiental — o subtema mais estável entre as provas: quase sempre aparece ligado a um dado ou mapa concreto, não teoria pura.",
    gatilhos: [
      "Gráfico ou tabela com dados de população/produção → leia o eixo e a unidade antes de qualquer alternativa; erros de leitura de escala são o erro nº 1 aqui.",
      "\"Consequência da urbanização acelerada\" → pense em pelo menos: infraestrutura, moradia irregular, mobilidade — não pare na primeira ideia.",
      "Questão sobre matriz energética → separe fontes renováveis de não-renováveis antes de avaliar vantagens/desvantagens.",
      "Mapa de fluxo migratório → identifique origem, destino e o motivo (econômico, ambiental, conflito) antes de aplicar teoria.",
    ],
    pegadinhas: [
      "Confundir êxodo rural (do campo para a cidade) com fluxos migratórios internacionais no mesmo enunciado.",
      "Aplicar um dado desatualizado de memória (ex.: ranking de maiores economias) quando a prova fornece um gráfico com dado atual diferente — sempre priorize o dado do enunciado.",
      "Tratar \"país desenvolvido\" e \"baixa taxa de natalidade\" como sinônimos sem checar exceções apontadas no próprio texto/gráfico.",
    ],
  },
  "atualidades-politica": {
    resumo: "Conjuntura política e econômica brasileira: reformas, instituições, relação entre poderes — sempre ancorada em fatos recentes, não opinião pessoal.",
    gatilhos: [
      "Pergunta sobre uma reforma (tributária, administrativa, etc.) → identifique o problema que ela tenta resolver antes de avaliar prós/contras.",
      "Texto de opinião/editorial no enunciado → separe o fato relatado da opinião do autor antes de responder.",
      "Pergunta sobre relação entre poderes (Executivo/Legislativo/Judiciário) → pense em freios e contrapesos, não em qual poder \"manda mais\".",
    ],
    pegadinhas: [
      "Confundir a posição do autor de um texto de opinião com a posição \"correta\" do gabarito — a banca testa compreensão do argumento, não concordância com ele.",
      "Generalizar uma medida pontual como se fosse uma mudança estrutural permanente.",
      "Misturar conjuntura (fato recente) com estrutura (regra permanente da Constituição) como se fossem a mesma coisa.",
    ],
  },
  "atualidades-geopolitica": {
    resumo: "Conflitos internacionais, blocos econômicos e organismos multilaterais — cobrada quase sempre com um argumento a favor e um desafio real da instituição/processo em questão.",
    gatilhos: [
      "Pergunta sobre um organismo multilateral (ONU, OMC, etc.) → explique a função central dele (cooperação, regulação, segurança) antes de julgar sua eficácia.",
      "Conflito internacional no enunciado → identifique os atores, o interesse de cada um e o contexto histórico antes de avaliar soluções.",
      "\"Discuta um benefício e um desafio de X\" → estruture a resposta nesses dois blocos separados, não misture.",
    ],
    pegadinhas: [
      "Reduzir um conflito complexo a uma única causa (só econômica, ou só religiosa, ou só territorial).",
      "Usar generalizações vagas (\"a ONU é importante\") sem justificar com um mecanismo concreto.",
      "Confundir bloco econômico (união aduaneira, mercado comum) com aliança política/militar.",
    ],
  },
  "atualidades-meioambiente": {
    resumo: "Mudanças climáticas, acordos internacionais e transição energética — com foco no princípio de \"responsabilidades comuns, porém diferenciadas\" entre países desenvolvidos e em desenvolvimento.",
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
  },
  "atualidades-tecnologia": {
    resumo: "Inteligência artificial, redes sociais e privacidade de dados — cobrada quase sempre ligando a tecnologia a um impacto social ou econômico concreto, não a aspectos técnicos.",
    gatilhos: [
      "Pergunta sobre IA/algoritmos → pense no impacto sobre trabalho, desinformação ou privacidade, os três eixos mais cobrados.",
      "Texto sobre redes sociais → identifique se o argumento é sobre modelo de negócio (atenção/publicidade) ou sobre efeito social (polarização, saúde mental).",
      "\"Discuta um benefício e um risco de X tecnologia\" → estruture a resposta nesses dois blocos, com exemplo concreto em cada um.",
    ],
    pegadinhas: [
      "Tratar toda tecnologia nova como puramente positiva ou puramente negativa — a banca valoriza nuance.",
      "Confundir automação (substituição de tarefas) com desemprego estrutural garantido — o efeito real é debatido, não um fato consensual.",
      "Usar jargão técnico sem explicar o conceito (ex.: citar \"algoritmo\" sem dizer o que ele otimiza).",
    ],
  },
  "direitos-humanos": {
    resumo: "Direitos fundamentais, movimentos sociais e igualdade — sempre ligados a um caso ou dado concreto de desigualdade, não a definições abstratas isoladas.",
    gatilhos: [
      "Pergunta sobre um direito fundamental → identifique se é um direito civil, político ou social antes de aplicar ao caso do enunciado.",
      "Texto sobre um movimento social → identifique a demanda central e o obstáculo que ele enfrenta antes de avaliar estratégias.",
      "\"Direito a ter direitos\" (Arendt) → lembre que a autora fala de apátridas/refugiados perderem a condição de sujeitos de direito por não pertencerem a nenhuma comunidade política.",
    ],
    pegadinhas: [
      "Tratar igualdade formal (perante a lei) e igualdade material (de condições reais) como sinônimos.",
      "Reduzir uma pauta de direitos humanos a uma questão só jurídica, ignorando a dimensão social/econômica.",
      "Confundir direitos humanos (universais) com direitos constitucionais de um país específico.",
    ],
  },
  "filosofia-sociologia": {
    resumo: "Ética, pensamento crítico e teorias sociológicas clássicas — decore a definição precisa de cada conceito, não só o nome do pensador associado a ele.",
    gatilhos: [
      "Personagem/situação submissa, incapaz de romper com autoridade externa → pense em Kant: menoridade (incapacidade de usar o próprio entendimento sem tutela) → maioridade (uso autônomo e corajoso da razão).",
      "Situação envolvendo mercantilização de algo (arte, dado pessoal, trabalho) → pense em Marx: mercadoria e fetichismo da mercadoria (o valor de troca ganha vida própria e esconde a relação de trabalho por trás do objeto).",
      "Regime que anula a individualidade das pessoas → pense em Arendt: totalitarismo (forma de poder que torna indivíduos supérfluos e intercambiáveis).",
      "Burocrata \"comum\" cometendo uma atrocidade → pense em Arendt: banalidade do mal (conceito diferente de totalitarismo — o mal cometido por quem renuncia a pensar/julgar por conta própria).",
    ],
    pegadinhas: [
      "Citar o nome de um pensador sem explicar o conceito com precisão — bancas de discursiva costumam exigir \"precisão conceitual\", não só repertório decorativo.",
      "Confundir conceitos de obras diferentes do mesmo autor (ex.: totalitarismo × banalidade do mal, em Arendt, vêm de livros diferentes).",
      "Tratar contrato social como uma teoria única — Hobbes, Locke e Rousseau partem de premissas bem diferentes sobre o estado de natureza.",
    ],
  },
  "artes-cultura": {
    resumo: "Movimentos artísticos e indústria cultural — a banca gosta de ligar uma obra a um conceito teórico e depois pedir pra aplicar isso a uma questão contemporânea.",
    gatilhos: [
      "Obra que mistura culturas/vanguardas sem hierarquia de \"puro x impuro\" → pense em antropofagia/modernismo brasileiro — tema quase garantido em alguma forma.",
      "Produto de cultura de massa padronizado (cinema comercial, hit pop, série de streaming) → pense em indústria cultural (Adorno/Horkheimer): padronização, pseudo-individualização, entretenimento que neutraliza a crítica.",
      "\"Isso ainda vale hoje?\" ao final de uma questão sobre uma obra antiga → é convite pra você relacionar o conceito histórico a uma questão contemporânea concreta.",
    ],
    pegadinhas: [
      "Tratar antropofagia como \"orgulho nacional\" simples — o conceito de Oswald de Andrade é sobre devoração crítica e seletiva da cultura estrangeira, não rejeição nem aceitação passiva.",
      "Descrever a obra sem nenhum detalhe concreto (nome de personagem, verso, cena, técnica) — respostas vagas perdem nota mesmo com repertório teórico correto.",
      "Confundir movimento artístico com período histórico (nem toda obra \"moderna\" no sentido cronológico é \"modernista\" no sentido do movimento).",
    ],
  },
  "ciencias-natureza": {
    resumo: "Noções gerais de biologia, química e física aplicadas a temas contemporâneos (saúde pública, energia, meio ambiente) — prioridade baixa nas duas provas, mas ainda aparece ligada a atualidades.",
    gatilhos: [
      "Pergunta sobre um fenômeno ligado a saúde pública (vacina, epidemia) → pense em conceitos básicos de biologia (imunidade, transmissão) aplicados ao caso concreto do enunciado.",
      "Pergunta sobre fonte de energia → separe renovável de não-renovável e pense no princípio físico/químico por trás (combustão, fissão, radiação solar).",
      "Dado numérico de concentração/proporção em um contexto ambiental (CO₂, poluentes) → trate como um problema de proporção antes de aplicar conceito de ciências.",
    ],
    pegadinhas: [
      "Tentar aplicar conhecimento técnico aprofundado quando a prova pede só noção geral aplicada a um contexto — não é prova de biologia/química/física pura.",
      "Confundir unidades de medida (ex.: potência × energia) em questões que combinam ciências com matemática básica.",
    ],
  },
};
