// Compõe as propostas de redação da trilha de Economia.
//
//   node vestibular-economia/build-redacoes.js              compõe
//   node vestibular-economia/build-redacoes.js --verificar   só checa se está velho
//
// A MESMA REGRA DO BANCO E DA TEORIA, MAS SEM CONVERSÃO
//
// vestibular-direito/data/redacoes.js documenta, no próprio cabeçalho, que
// "assunto de redação não tem curso" — a Unesp cobrou solidão, a FGV cobrou
// liberdade de expressão, o Einstein cobrou quem paga pela Amazônia, e nenhum
// desses temas pertence a uma faculdade específica. É por isso que
// vestibular-medicina/gerar-redacoes.js reaproveita as MESMAS 60 propostas.
//
// Aqui a herança é mais direta ainda que a de Medicina. Medicina troca o
// `comando` inteiro, porque a VUNESP e a Unifesp usam uma fórmula própria
// ("escreva um texto dissertativo-argumentativo..."). Economia NÃO precisa
// disso: o `redacaoUI` da trilha (trilhas.js) já registra que "a proposta da
// FGV é a mesma da trilha de Direito — mesmo caderno, mesmo dia" e que o
// Insper "pede 10 a 30 linhas, apresenta dois temas para escolher um e exige
// que a questão-tema seja copiada como título" — exatamente o desenho que
// `comando` e `comandoInsper` de Direito já descrevem. As 60 propostas
// entram AS-IS, comando e comandoInsper originais, sem tradução nenhuma.
//
// O QUE ESTE SCRIPT ACRESCENTA: 20 PROPOSTAS NOVAS, ANCORADAS NA ECONOMIA
//
// Dez do modelo "entre X e Y" e dez de "tema abstrato" — os dois modelos que,
// no repertório de Direito, não levam `comandoInsper` (ele só existe onde o
// tema é pergunta dicotômica; nenhum dos dois é). Isso não é lacuna: é o
// mesmo padrão que as 9 + 6 propostas desses modelos já seguem lá.
//
// Por que ESSES dois modelos e não os outros seis: são os que menos exigem que
// o texto tome partido numa dicotomia de valor e mais pedem que o candidato
// ARBITRE entre dois princípios econômicos em tensão real — controlar preço
// contra sustentar emprego, arrecadar contra crescer, formalizar contra não
// sufocar. É o gênero de tensão que a política econômica produz o tempo todo,
// e que "pergunta binária" (que pede posição, não arbitragem) não captura tão
// bem.
//
// Os vinte temas evitam repetir o que Direito já cobre (redação não tem
// curso, mas duplicar tema dentro do MESMO banco desperdiça treino): imposto
// sobre grandes fortunas, trabalhador de aplicativo, renda básica, mineração
// para a transição energética e quem paga pela floresta em pé já estão lá, e
// nenhum dos vinte novos os repete. Âncoras usadas: EC 132/2023 (reforma
// tributária), a fiscalização de movimentações via Pix pela Receita a partir
// de 2025, a leva de fraudes em consignado do INSS de 2024, a guerra fiscal do
// ICMS, a meta de resultado primário da LRF, e o histórico de sucessivas
// reduções da Selic e da meta de inflação do Banco Central. Nenhum enunciado,
// alternativa ou texto de apoio real é transcrito — os quatro textos de cada
// proposta são originais, na forma do gênero que a FGV usa (evidência,
// réplica, tréplica, complicação), como já é a convenção deste projeto.
//
// Rode DEPOIS de qualquer edição em vestibular-direito/data/redacoes.js.
// `--verificar` compara o hash da fonte com o que foi usado na última
// composição.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const vm = require("vm");

const RAIZ = path.join(__dirname, "..");
const FONTE = path.join(RAIZ, "vestibular-direito", "data", "redacoes.js");
const SAIDA = path.join(__dirname, "data", "redacoes.js");
const MANIFESTO = path.join(__dirname, "data", "origem-das-redacoes.json");

// ------------------------------------------------------------- as autorais
//
// IDs continuam a numeração de Direito (redacao-61 em diante) pela mesma razão
// que Medicina reaproveita os IDs de 01 a 60: o progresso do localStorage é
// namespaced por trilha, então não há colisão, e um ID isolado da trilha
// tornaria mais fácil perder de vista que o repertório é o mesmo objeto.

const NOVAS = [
  // ============================================================ ENTRE X E Y
  {
    "id": "redacao-61",
    "tema": "Política monetária: entre conter a inflação e sustentar o emprego",
    "modelo": "entre X e Y",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nO regime de metas de inflação, adotado pelo Brasil desde 1999, atribui ao Banco Central a tarefa de manter a inflação dentro de um intervalo definido pelo Conselho Monetário Nacional. O instrumento principal é a taxa básica de juros: subir a Selic encarece o crédito, esfria o consumo e tende a reduzir a inflação.\n\nTEXTO II\nJuro alto não distingue a causa da inflação. Quando o preço sobe por um choque de oferta — uma quebra de safra, um aumento do petróleo —, encarecer o crédito não produz mais alimento nem mais petróleo; produz menos empresa contratando e menos família comprando casa.\n\nTEXTO III\nA autonomia do Banco Central, formalizada em lei em 2021, existe para que a taxa de juros não seja fixada em função do calendário eleitoral. Inflação alta e persistente corrói primeiro a renda de quem não tem como se proteger dela — quem não tem aplicação financeira indexada, nem contrato que reajuste automaticamente.\n\nTEXTO IV\nA taxa de juros de um único país tenta resolver dois problemas com um instrumento só: preço e emprego. Perseguir a meta de inflação com rigidez, quando o desemprego já está alto, transfere o custo do ajuste para quem primeiro perde o emprego e só depois, talvez, se beneficia da inflação mais baixa.",
    "comando": "A partir da leitura dos textos e de seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: \"Política monetária: entre conter a inflação e sustentar o emprego\". Dê um título ao seu texto.",
    "pontosEsperados": [
      "Apresenta tese própria sobre como arbitrar entre os dois objetivos, em vez de apenas descrever o que é meta de inflação",
      "Reconhece o fundamento de cada polo — a proteção de quem não tem como se defender da inflação (Texto III) e o custo do desemprego no ajuste (Texto IV)",
      "Distingue inflação de demanda de inflação de choque de oferta, retomando a objeção do Texto II a um remédio único",
      "Propõe um critério de arbitragem, ainda que discutível, em vez de concluir apenas que \"é preciso equilíbrio\"",
      "Dá título ao texto, mantém a norma-padrão e a coesão entre os parágrafos"
    ]
  },
  {
    "id": "redacao-62",
    "tema": "Livre-comércio: entre o ganho de eficiência e a proteção do emprego industrial",
    "modelo": "entre X e Y",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nA teoria das vantagens comparativas sustenta que dois países ganham ao trocar entre si mesmo quando um deles é mais eficiente em tudo: cada um se especializa no que produz relativamente melhor, e o comércio expande o total disponível para os dois.\n\nTEXTO II\nO ganho agregado não se distribui igual. Quando a abertura comercial expõe um setor à concorrência externa, quem perde o emprego ali raramente é a mesma pessoa que ganha com o produto importado mais barato — e a recolocação leva anos, quando acontece.\n\nTEXTO III\nProteger um setor por tarifa também tem preço: encarece o insumo para as indústrias que dele dependem, reduz a pressão por produtividade e, historicamente, tende a se perpetuar — a proteção \"temporária\" raramente tem prazo de fato.\n\nTEXTO IV\nPaíses hoje desenvolvidos protegeram suas indústrias nascentes antes de abri-las à concorrência internacional. Abrir cedo demais uma indústria que ainda não amadureceu pode significar nunca ter uma indústria própria — só consumidores de produto importado.",
    "comando": "Com base nos textos e em seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: \"Livre-comércio: entre o ganho de eficiência e a proteção do emprego industrial\". Dê um título ao seu texto.",
    "pontosEsperados": [
      "Constrói uma tese sobre em que condições um dos dois deve prevalecer, sem apenas listar prós e contras da abertura comercial",
      "Distingue o ganho agregado (Texto I) da distribuição desigual desse ganho (Texto II), e não os trata como o mesmo argumento",
      "Enfrenta a objeção ao lado escolhido — quem defende abertura responde ao custo da recolocação; quem defende proteção responde ao risco da perpetuação",
      "Usa o argumento da indústria nascente (Texto IV) como argumento, não como citação solta",
      "Constrói introdução, desenvolvimento e conclusão articulados, com título e norma-padrão"
    ]
  },
  {
    "id": "redacao-63",
    "tema": "Dívida pública: entre investir no presente e comprometer as próximas gerações",
    "modelo": "entre X e Y",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nGovernos se endividam para financiar despesas que a arrecadação corrente não cobre — de obra de infraestrutura a resposta emergencial a uma crise. A dívida pública brasileira, majoritariamente em reais e com credores majoritariamente domésticos, tem perfil diferente do de países que se endividam em moeda estrangeira.\n\nTEXTO II\nDívida de hoje é imposto de amanhã: o serviço da dívida — os juros pagos a quem a financia — compete no orçamento com saúde, educação e investimento novo, e essa disputa se agrava a cada ano em que a dívida cresce mais rápido que a economia.\n\nTEXTO III\nNem todo endividamento é igual. Financiar uma ponte que reduz o custo de transporte por décadas não é da mesma natureza que financiar despesa corrente que se esgota no ano em que é gasta — mas a estatística de dívida bruta não distingue as duas coisas.\n\nTEXTO IV\nGeração nenhuma decide sozinha o tamanho da dívida que herda. Quem vota hoje pelo ajuste fiscal mais duro também não escolheu a dívida acumulada por decisões de décadas atrás — e cobrar de uma geração inteira o rigor que a política de outra época não teve tem um problema de justiça próprio.",
    "comando": "A partir dos textos e de seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: \"Dívida pública: entre investir no presente e comprometer as próximas gerações\". Dê um título ao seu texto.",
    "pontosEsperados": [
      "Toma posição sobre quando o endividamento se justifica, em vez de descrever genericamente o que é dívida pública",
      "Distingue dívida que financia investimento de dívida que financia despesa corrente, retomando a diferença do Texto III",
      "Reconhece o custo de oportunidade do serviço da dívida (Texto II) sem ignorá-lo em favor de uma defesa acrítica do endividamento",
      "Incorpora a dimensão intergeracional do Texto IV como argumento, não como ornamento",
      "Apresenta título, mantém a progressão temática entre os parágrafos e a norma-padrão"
    ]
  },
  {
    "id": "redacao-64",
    "tema": "Concentração bancária: entre a solidez do sistema financeiro e a concorrência entre bancos",
    "modelo": "entre X e Y",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nO sistema bancário brasileiro é um dos mais concentrados entre economias grandes: poucos conglomerados respondem pela maior parte do crédito e dos depósitos do país. Reguladores argumentam que bancos grandes e bem capitalizados resistem melhor a choques do que um sistema pulverizado de instituições pequenas.\n\nTEXTO II\nMenos concorrência tende a significar spread bancário mais alto — a diferença entre o que o banco paga para captar e o que cobra para emprestar —, e o Brasil tem um dos spreads mais altos do mundo. Quem paga a conta é o tomador de crédito, pessoa física ou empresa.\n\nTEXTO III\nA entrada de fintechs e bancos digitais na última década reduziu tarifas e ampliou o acesso a serviços bancários para quem antes ficava fora do sistema — evidência de que abrir espaço para novos entrantes disciplina o mercado sem exigir que o regulador fixe preço.\n\nTEXTO IV\nBanco não é empresa qualquer: a quebra de um banco grande pode arrastar outros, numa cadeia que a teoria econômica chama de risco sistêmico. É esse risco, e não falta de concorrência, que justifica exigir mais capital e mais regulação exatamente dos maiores.",
    "comando": "Com base nos textos e em seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: \"Concentração bancária: entre a solidez do sistema financeiro e a concorrência entre bancos\". Dê um título ao seu texto.",
    "pontosEsperados": [
      "Sustenta uma tese sobre como equilibrar os dois objetivos regulatórios, sem tratá-los como mutuamente excludentes por definição",
      "Relaciona a concentração ao spread bancário (Texto II) como consequência concreta, não apenas como estatística isolada",
      "Usa a entrada de fintechs (Texto III) como evidência de que concorrência e estabilidade podem crescer juntas, ou refuta esse ponto com argumento equivalente",
      "Reconhece o argumento do risco sistêmico (Texto IV) como justificativa distinta de mera defesa dos incumbentes",
      "Constrói texto com título, coesão referencial entre parágrafos e norma-padrão"
    ]
  },
  {
    "id": "redacao-65",
    "tema": "Fiscalização via Pix: entre o combate à sonegação e a privacidade financeira do cidadão",
    "modelo": "entre X e Y",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nDesde 2025, instituições financeiras informam à Receita Federal o total mensal movimentado por CPF e CNPJ em transações via Pix acima de determinado valor, dado usado para cruzar com a renda declarada e identificar sonegação.\n\nTEXTO II\nO anúncio da medida, em janeiro de 2025, gerou reação imediata nas redes e recuo do governo em poucos dias — sinal de que boa parte da população interpretou a norma como monitoramento de transação individual, não como agregado mensal para fins de cruzamento fiscal.\n\nTEXTO III\nSonegação fiscal reduz a arrecadação que financia serviço público, e quem sonega desloca a carga tributária para quem não consegue esconder renda — o trabalhador assalariado, com imposto retido na fonte antes mesmo de receber o salário.\n\nTEXTO IV\nA distância entre \"a Receita recebe o total movimentado\" e \"a Receita vê cada Pix individual\" é técnica, mas o efeito sobre a confiança não é: um sistema de pagamento pensado para ser rápido e sem atrito passa a ser associado, na cabeça de quem usa, a vigilância — e essa percepção muda comportamento independente do que a lei de fato autoriza.",
    "comando": "A partir da leitura dos textos e de seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: \"Fiscalização via Pix: entre o combate à sonegação e a privacidade financeira do cidadão\". Dê um título ao seu texto.",
    "pontosEsperados": [
      "Toma posição sobre o desenho correto da fiscalização, e não apenas relata a polêmica de 2025",
      "Distingue movimentação agregada de transação individual (Texto IV), evitando o erro de tratar as duas como equivalentes",
      "Relaciona sonegação e distribuição da carga tributária (Texto III) como argumento concreto a favor da fiscalização",
      "Incorpora a dimensão da confiança e da percepção pública (Texto IV) como problema real, não como mero mal-entendido a corrigir",
      "Dá título ao texto e mantém a norma-padrão ao longo da argumentação"
    ]
  },
  {
    "id": "redacao-66",
    "tema": "Guerra fiscal entre estados: entre atrair investimento e esvaziar a arrecadação",
    "modelo": "entre X e Y",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nEstados brasileiros historicamente concederam benefícios de ICMS para atrair fábricas e centros de distribuição para seu território, disputando entre si investimentos que, de outro modo, poderiam se instalar em qualquer lugar do país.\n\nTEXTO II\nDo ponto de vista de um estado isolado, o benefício pode compensar: mais emprego e mais atividade econômica local, mesmo com imposto menor por unidade. Do ponto de vista do país, o resultado agregado é ambíguo — a fábrica se instala em algum estado de qualquer forma, e o que a guerra fiscal decide é apenas onde, ao custo da arrecadação de todos.\n\nTEXTO III\nA reforma tributária aprovada em 2023 substitui o ICMS estadual por um imposto de competência compartilhada, com o objetivo declarado de acabar com a disputa por benefício fiscal entre estados — um reconhecimento de que o modelo anterior era, para o país, um jogo de soma próxima de zero.\n\nTEXTO IV\nEstados com menor PIB per capita usaram o benefício fiscal como uma das poucas ferramentas de política industrial disponíveis a eles, num país em que a maior parte da indústria já nasceu concentrada no Sudeste. Uniformizar a regra sem outro instrumento de desenvolvimento regional pode consolidar a desigualdade que a guerra fiscal, imperfeitamente, tentava corrigir.",
    "comando": "Com base nos textos e em seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: \"Guerra fiscal entre estados: entre atrair investimento e esvaziar a arrecadação\". Dê um título ao seu texto.",
    "pontosEsperados": [
      "Constrói tese sobre o efeito líquido da guerra fiscal, articulando a perspectiva do estado isolado e a do país como um todo",
      "Diferencia o ganho local (Texto II, primeira metade) do resultado agregado ambíguo (Texto II, segunda metade), sem confundir as duas escalas de análise",
      "Relaciona a reforma tributária de 2023 (Texto III) ao diagnóstico de jogo de soma próxima de zero, tratando-a como consequência lógica e não como dado solto",
      "Enfrenta a objeção regional do Texto IV — o risco de a uniformização aprofundar desigualdade entre estados",
      "Mantém título, coesão entre parágrafos e norma-padrão ao longo do texto"
    ]
  },
  {
    "id": "redacao-67",
    "tema": "Criptomoedas: entre a inclusão financeira e o risco para quem não entende o produto",
    "modelo": "entre X e Y",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nCriptoativos permitem transferência de valor sem depender de conta em banco tradicional, o que defensores apontam como caminho de inclusão financeira em regiões com pouco acesso bancário e como proteção contra a desvalorização de moedas locais em países de inflação crônica.\n\nTEXTO II\nA mesma característica que dispensa o banco também dispensa boa parte da proteção que a regulação bancária tradicional oferece: sem depósito garantido, sem central de risco, sem grande parte dos mecanismos que existem porque a história já mostrou o que acontece na ausência deles.\n\nTEXTO III\nA volatilidade de preço de grande parte dos criptoativos é ordens de grandeza maior que a de qualquer moeda com curso legal em economia estável. Quem entra tarde num ciclo de alta, atraído pela promessa de valorização, tende a ser quem menos tem capacidade de absorver a perda quando o ciclo se inverte.\n\nTEXTO IV\nÓrgãos reguladores em diversos países têm optado por não proibir, mas por exigir que corretoras de criptoativos se registrem e prestem informação — a aposta de que a resposta correta não é escolher entre liberar tudo e proibir tudo, mas trazer o mercado para dentro de alguma supervisão.",
    "comando": "A partir dos textos e de seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: \"Criptomoedas: entre a inclusão financeira e o risco para quem não entende o produto\". Dê um título ao seu texto.",
    "pontosEsperados": [
      "Apresenta tese própria sobre o papel das criptomoedas, evitando o extremo de tratá-las só como inovação ou só como risco",
      "Relaciona a ausência de proteção regulatória tradicional (Texto II) à volatilidade (Texto III) como argumentos que se reforçam, não como pontos isolados",
      "Reconhece o argumento de inclusão financeira (Texto I) com critério, sem tratá-lo como automaticamente decisivo",
      "Discute a saída regulatória intermediária do Texto IV como possível arbitragem entre os dois polos do tema",
      "Dá título ao texto, mantém a norma-padrão e a articulação lógica entre os parágrafos"
    ]
  },
  {
    "id": "redacao-68",
    "tema": "Meta de superávit primário: entre o ajuste das contas públicas e o investimento em infraestrutura",
    "modelo": "entre X e Y",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nO resultado primário mede a diferença entre receita e despesa do governo, sem contar os juros da dívida. Perseguir superávit primário significa gastar menos do que se arrecada nessa conta, para estabilizar ou reduzir a dívida pública como proporção da economia.\n\nTEXTO II\nInvestimento público — estrada, saneamento, rede elétrica — entra na conta como despesa no ano em que é feito, ainda que gere retorno econômico por décadas. Uma meta fiscal rígida tende a cortar primeiro o investimento, porque ele é mais fácil de adiar do que salário de servidor ou benefício previdenciário já concedido.\n\nTEXTO III\nO histórico brasileiro de sucessivos déficits primários coincide com períodos de deterioração da percepção de risco do país, refletida em juros mais altos cobrados do próprio governo para se financiar — o que, por sua vez, reduz o espaço para qualquer gasto, inclusive investimento.\n\nTEXTO IV\nHá instrumentos desenhados para separar as duas coisas — regras fiscais que tratam investimento de forma diferente da despesa corrente, com o argumento de que gasto que se paga sozinho no longo prazo não deveria competir, ano a ano, com despesa que não gera retorno futuro algum.",
    "comando": "Com base nos textos e em seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: \"Meta de superávit primário: entre o ajuste das contas públicas e o investimento em infraestrutura\". Dê um título ao seu texto.",
    "pontosEsperados": [
      "Constrói tese sobre como equilibrar disciplina fiscal e investimento, sem tratar as duas como necessariamente incompatíveis",
      "Explica por que investimento é o alvo mais fácil de corte numa meta rígida (Texto II), como argumento e não como afirmação solta",
      "Relaciona a credibilidade fiscal ao custo de financiamento do próprio governo (Texto III), fechando a lógica entre ajuste e juro",
      "Avalia a proposta de tratamento diferenciado do investimento (Texto IV) como possível arbitragem, com argumento a favor ou contra",
      "Apresenta título, mantém coesão entre parágrafos e norma-padrão"
    ]
  },
  {
    "id": "redacao-69",
    "tema": "Herança: entre o direito de transmitir patrimônio e a igualdade de oportunidades entre gerações",
    "modelo": "entre X e Y",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nO imposto sobre herança no Brasil (ITCMD) é estadual, com alíquota máxima definida pelo Senado, e está entre os mais baixos comparado a países com tributação semelhante sobre renda e patrimônio — vários dos quais cobram alíquotas bem mais altas sobre grandes heranças.\n\nTEXTO II\nO patrimônio deixado por alguém já foi, em geral, tributado quando formado — imposto de renda sobre o salário, imposto sobre lucro da empresa. Tributar de novo na transmissão pode ser lido como cobrar duas vezes pela mesma riqueza.\n\nTEXTO III\nA origem da riqueza de quem herda não é mérito de quem herda: nasceu de decisão e trabalho de outra pessoa. Quanto maior o peso da herança na composição do patrimônio de um país, menor a relação entre o esforço de cada geração e o ponto de partida que ela recebe.\n\nTEXTO IV\nHerança não é só dinheiro em conta: inclui empresa familiar, imóvel único da família, patrimônio produtivo do qual dependem empregos. Uma alíquota alta pode forçar a venda apressada desse patrimônio só para pagar o imposto, destruindo o que a tributação pretendia apenas redistribuir.",
    "comando": "A partir da leitura dos textos e de seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: \"Herança: entre o direito de transmitir patrimônio e a igualdade de oportunidades entre gerações\". Dê um título ao seu texto.",
    "pontosEsperados": [
      "Sustenta uma tese sobre até que ponto o direito de transmitir patrimônio deve ceder à igualdade de oportunidades, sem apenas narrar o debate",
      "Enfrenta o argumento da bitributação (Texto II) com um contra-argumento consistente, e não o ignora",
      "Usa a distinção entre patrimônio financeiro e patrimônio produtivo (Texto IV) para qualificar a posição defendida, evitando uma tese genérica demais",
      "Relaciona herança e mobilidade entre gerações (Texto III) como argumento central, não periférico",
      "Dá título ao texto, mantém a norma-padrão e a progressão argumentativa"
    ]
  },
  {
    "id": "redacao-70",
    "tema": "Crédito consignado: entre o acesso ao crédito mais barato e o superendividamento de quem já é vulnerável",
    "modelo": "entre X e Y",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nO crédito consignado, com parcela descontada diretamente do salário ou do benefício previdenciário, tem taxa de juros bem menor que a de outras modalidades porque o risco de calote para o banco é menor — a garantia de pagamento é praticamente automática.\n\nTEXTO II\nA mesma característica que reduz o risco do banco reduz também a margem de manobra do tomador: o desconto automático não deixa espaço para priorizar outra despesa urgente no mês, o que pode empurrar quem já tem pouca reserva para outras dívidas mais caras.\n\nTEXTO III\nEm 2024, uma onda de descontos não autorizados em benefícios do INSS levou à devolução de valores a milhões de aposentados e pensionistas — evidência de que a facilidade de contratação, associada a informação assimétrica sobre quem está do outro lado da oferta, cria espaço para fraude contra justamente a população mais dependente do próprio benefício.\n\nTEXTO IV\nAposentados e pensionistas de baixa renda muitas vezes não têm acesso a outra linha de crédito com juro comparável. Restringir o consignado sem outra alternativa de crédito barato não elimina a necessidade de crédito — só empurra quem precisa para modalidades mais caras e menos reguladas.",
    "comando": "Com base nos textos e em seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: \"Crédito consignado: entre o acesso ao crédito mais barato e o superendividamento de quem já é vulnerável\". Dê um título ao seu texto.",
    "pontosEsperados": [
      "Constrói tese sobre como conciliar os dois lados do tema, sem descrever apenas o funcionamento do consignado",
      "Relaciona o menor juro (Texto I) ao menor risco do credor, e não a uma suposta boa vontade do sistema financeiro",
      "Usa o episódio de 2024 (Texto III) como evidência concreta de falha regulatória, e não como fato genérico",
      "Enfrenta a objeção de que restringir o crédito sem alternativa (Texto IV) pode piorar a situação de quem mais precisa de proteção",
      "Apresenta título, mantém coesão referencial entre os parágrafos e a norma-padrão"
    ]
  },

  // ============================================================ TEMA ABSTRATO
  {
    "id": "redacao-71",
    "tema": "Desafios para reduzir a informalidade no mercado de trabalho brasileiro",
    "modelo": "tema abstrato",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nCerca de dois em cada cinco trabalhadores ocupados no Brasil estão em alguma forma de informalidade — sem carteira assinada, sem contribuição previdenciária regular, sem as proteções associadas ao vínculo formal.\n\nTEXTO II\nUma leitura recorrente atribui a informalidade ao custo de contratar formalmente: encargos trabalhistas e previdenciários elevam o custo do trabalhador registrado a ponto de tornar a informalidade racional tanto para quem contrata quanto para quem é contratado.\n\nTEXTO III\nA informalidade também nasce da natureza de certas atividades — trabalho por conta própria, pequeno comércio, prestação eventual de serviço — que nunca se encaixaram bem no modelo de emprego assalariado contínuo, mesmo em países com carga tributária sobre o trabalho muito mais baixa que a brasileira.\n\nTEXTO IV\nQuem está na informalidade não acumula tempo de contribuição para aposentadoria, não tem acesso a seguro-desemprego e, em geral, recebe menos que um trabalhador formal equivalente. O custo da informalidade não aparece na folha de pagamento de ninguém: aparece décadas depois, na aposentadoria que não veio.",
    "comando": "A partir dos textos e de seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: desafios para reduzir a informalidade no mercado de trabalho brasileiro. Dê um título ao seu texto.",
    "pontosEsperados": [
      "Delimita o tema e sustenta uma tese sobre qual é o obstáculo decisivo, em vez de listar causas soltas da informalidade",
      "Distingue informalidade por custo de contratação (Texto II) de informalidade por natureza da atividade (Texto III), sem tratar as duas como o mesmo problema",
      "Usa o custo previdenciário de longo prazo (Texto IV) como argumento sobre por que o tema importa além do curto prazo",
      "Evita a armadilha de reduzir a informalidade a uma escolha individual, articulando-a a incentivos estruturais",
      "Constrói introdução, desenvolvimento e conclusão articulados, com título e norma-padrão"
    ]
  },
  {
    "id": "redacao-72",
    "tema": "Caminhos para ampliar a inclusão financeira da população de baixa renda",
    "modelo": "tema abstrato",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nA proporção de adultos brasileiros com algum tipo de conta bancária cresceu de forma acentuada na última década, impulsionada por programas de transferência de renda que exigem conta para o depósito do benefício e pela abertura de contas digitais gratuitas.\n\nTEXTO II\nTer conta não é o mesmo que ter acesso a crédito em condição razoável. Boa parte de quem abriu conta nos últimos anos usa o serviço para receber e sacar, sem acesso a crédito com juro comparável ao que um cliente com histórico bancário mais longo consegue.\n\nTEXTO III\nO Pix reduziu a zero o custo de transferência entre pessoas físicas e ampliou a aceitação de pagamento digital até no pequeno comércio de bairro, criando um histórico de transação que, em tese, poderia servir de base para avaliação de crédito de quem nunca teve conta antes.\n\nTEXTO IV\nInclusão financeira sem educação financeira tem risco próprio: acesso fácil a crédito, sem histórico de uso responsável, pode levar ao endividamento em vez de à mobilidade econômica que a inclusão promete.",
    "comando": "Com base nos textos e em seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: caminhos para ampliar a inclusão financeira da população de baixa renda. Dê um título ao seu texto.",
    "pontosEsperados": [
      "Delimita o tema e sustenta uma tese sobre qual caminho é mais eficaz, evitando apenas descrever o avanço recente da inclusão financeira",
      "Distingue posse de conta de acesso a crédito em condição justa (Texto II), oposição central para não tratar o tema como já resolvido",
      "Usa o histórico transacional criado pelo Pix (Texto III) como possível instrumento concreto, e não apenas como fato à parte",
      "Incorpora o risco do endividamento sem educação financeira (Texto IV) como ressalva ao caminho proposto",
      "Apresenta título, mantém norma-padrão e progressão temática entre os parágrafos"
    ]
  },
  {
    "id": "redacao-73",
    "tema": "Desafios para simplificar o sistema tributário brasileiro",
    "modelo": "tema abstrato",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nO Brasil chegava a ter, antes da reforma aprovada em 2023, cinco tributos diferentes incidindo sobre bens e serviços, com regras próprias em cada um dos mais de cinco mil municípios para o imposto sobre serviços — um dos sistemas mais complexos do mundo, segundo levantamentos internacionais de tempo gasto por empresas com obrigação tributária.\n\nTEXTO II\nA complexidade não é acidente: cada exceção, cada alíquota diferenciada e cada regime especial nasceu de uma negociação política em defesa de um setor específico. Simplificar significa, para cada regra removida, contrariar quem se beneficiava dela.\n\nTEXTO III\nA reforma de 2023 substitui os múltiplos tributos por um imposto de valor agregado, modelo usado pela maior parte dos países desenvolvidos, com o argumento de que um imposto mais simples reduz custo de conformidade e distorção na alocação de investimento entre setores.\n\nTEXTO IV\nSistema simples não é sinônimo de sistema justo. Um imposto de valor agregado uniforme tende a pesar proporcionalmente mais sobre quem gasta toda a renda em consumo — geralmente a população de renda mais baixa — se não vier acompanhado de mecanismo específico de devolução para essa parcela.",
    "comando": "A partir da leitura dos textos e de seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: desafios para simplificar o sistema tributário brasileiro. Dê um título ao seu texto.",
    "pontosEsperados": [
      "Delimita o tema e sustenta uma tese sobre o principal obstáculo à simplificação, sem apenas descrever a complexidade do sistema anterior",
      "Reconhece que a complexidade nasce de disputa política concreta (Texto II), e não trata simplificação como problema puramente técnico",
      "Relaciona a reforma de 2023 (Texto III) ao diagnóstico de excesso de tributos, tratando-a como resposta e não como fato isolado",
      "Enfrenta a objeção distributiva do Texto IV — simplicidade sem justiça na distribuição da carga",
      "Constrói texto com título, coesão entre parágrafos e norma-padrão"
    ]
  },
  {
    "id": "redacao-74",
    "tema": "Caminhos para atrair investimento produtivo de longo prazo para o Brasil",
    "modelo": "tema abstrato",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nInvestimento produtivo — fábrica, infraestrutura, tecnologia — difere de investimento financeiro de curto prazo por seu horizonte: o retorno vem em anos, não em meses, e por isso é mais sensível à previsibilidade de regras do que à taxa de juro do momento.\n\nTEXTO II\nJuro real historicamente alto no Brasil compete diretamente com o investimento produtivo: por que assumir o risco de construir uma fábrica se um título público, sem risco de execução, já paga retorno elevado?\n\nTEXTO III\nEmpresas internacionais frequentemente citam insegurança jurídica e mudança frequente de regra tributária, e não apenas o custo do capital, como razão para hesitar em investimento de longo prazo no país — o risco de a regra do jogo mudar depois que o capital já está comprometido.\n\nTEXTO IV\nInvestimento produtivo de longo prazo também depende de mão de obra qualificada e de infraestrutura logística disponível — dimensões que nenhuma taxa de juro baixa ou estabilidade jurídica, sozinhas, resolvem no curto prazo.",
    "comando": "Com base nos textos e em seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: caminhos para atrair investimento produtivo de longo prazo para o Brasil. Dê um título ao seu texto.",
    "pontosEsperados": [
      "Delimita o tema e sustenta uma tese sobre qual é o fator mais decisivo, evitando apenas enumerar entraves ao investimento",
      "Distingue o efeito da taxa de juro (Texto II) do efeito da insegurança jurídica (Texto III), tratando-os como fatores distintos e não intercambiáveis",
      "Usa a dimensão da qualificação da mão de obra e da infraestrutura (Texto IV) para qualificar a proposta, evitando reduzir o tema a política monetária",
      "Articula causa e consequência entre os fatores apresentados, e não apenas os enumera",
      "Apresenta título, mantém a norma-padrão e a coesão entre os parágrafos"
    ]
  },
  {
    "id": "redacao-75",
    "tema": "Desafios para reduzir a desigualdade de renda entre as regiões do país",
    "modelo": "tema abstrato",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nO PIB per capita das regiões brasileiras varia por um fator de mais de três entre as mais ricas e as mais pobres, uma diferença que persiste apesar de décadas de política de desenvolvimento regional e de transferência fiscal entre estados.\n\nTEXTO II\nParte da literatura econômica atribui a persistência da desigualdade regional a efeitos de aglomeração: empresa se instala onde já há outra empresa, trabalhador qualificado, fornecedor e infraestrutura — um ciclo que se reforça sozinho e que política pública tem dificuldade de romper de fora.\n\nTEXTO III\nProgramas de transferência de renda direta a famílias tiveram efeito mensurável e relativamente rápido sobre a redução da pobreza nas regiões mais pobres, ainda que sem alterar, no mesmo ritmo, a estrutura produtiva local.\n\nTEXTO IV\nReduzir a pobreza de uma região não é o mesmo que reduzir a desigualdade entre ela e as demais: se a renda cresce em todo o país, a distância relativa pode continuar a mesma mesmo com menos gente pobre em termos absolutos.",
    "comando": "A partir dos textos e de seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: desafios para reduzir a desigualdade de renda entre as regiões do país. Dê um título ao seu texto.",
    "pontosEsperados": [
      "Delimita o tema e sustenta uma tese sobre o principal desafio, sem apenas descrever a disparidade regional com dados soltos",
      "Explica o efeito de aglomeração (Texto II) como mecanismo que perpetua a desigualdade, e não apenas o menciona",
      "Distingue redução da pobreza absoluta de redução da desigualdade relativa (Texto IV), diferença central para não confundir os dois objetivos",
      "Avalia a transferência de renda (Texto III) por seu alcance e seu limite, evitando tratá-la como solução completa ou inútil",
      "Constrói introdução, desenvolvimento e conclusão articulados, com título e norma-padrão"
    ]
  },
  {
    "id": "redacao-76",
    "tema": "Caminhos para fortalecer a poupança previdenciária dos brasileiros",
    "modelo": "tema abstrato",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nO sistema previdenciário público brasileiro funciona majoritariamente por repartição: quem trabalha hoje financia, com sua contribuição, quem já está aposentado — não existe, para a maior parte dos segurados, uma conta individual que acumula o próprio dinheiro.\n\nTEXTO II\nO envelhecimento da população reduz a razão entre contribuintes ativos e aposentados, pressionando o modelo de repartição a exigir contribuição maior, tempo de contribuição maior ou benefício menor — as três alavancas de qualquer reforma da previdência.\n\nTEXTO III\nPrevidência privada complementar, por acumulação individual, cresceu como opção adicional, mas seu alcance é desigual: concentra-se em quem já tem renda para poupar além do necessário para o consumo corrente, deixando de fora justamente quem mais dependeria de uma aposentadoria maior no futuro.\n\nTEXTO IV\nEducação financeira e previdenciária começa cedo em poucos países de forma sistemática, e o Brasil não é um deles: grande parte dos trabalhadores só considera a própria aposentadoria quando ela já está próxima, momento em que a margem para acumular poupança adicional é pequena.",
    "comando": "Com base nos textos e em seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: caminhos para fortalecer a poupança previdenciária dos brasileiros. Dê um título ao seu texto.",
    "pontosEsperados": [
      "Delimita o tema e sustenta uma tese sobre qual caminho é mais eficaz, sem apenas descrever o funcionamento do sistema de repartição",
      "Relaciona o envelhecimento populacional (Texto II) à pressão sobre o modelo de repartição como causa e efeito, não como fatos desconectados",
      "Reconhece o alcance desigual da previdência privada (Texto III) como limite real de qualquer solução baseada só nela",
      "Usa a ausência de educação previdenciária (Texto IV) como parte do diagnóstico, não como observação periférica",
      "Apresenta título, mantém coesão referencial entre parágrafos e norma-padrão"
    ]
  },
  {
    "id": "redacao-77",
    "tema": "Desafios para formalizar e proteger o trabalho em plataformas digitais",
    "modelo": "tema abstrato",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nMilhões de trabalhadores brasileiros prestam serviço por meio de plataformas digitais de transporte, entrega e outros serviços sob demanda, num vínculo que a legislação trabalhista tradicional não foi desenhada para classificar com clareza.\n\nTEXTO II\nParte desses trabalhadores valoriza justamente a ausência de vínculo formal — a flexibilidade de escolher quando e quanto trabalhar, sem jornada fixa nem subordinação direta a um superior.\n\nTEXTO III\nFlexibilidade e proteção não são, na prática observada, escolhas neutras: sem contribuição previdenciária regular, sem seguro contra acidente de trabalho e sem piso de remuneração, quem depende dessa renda como principal fonte de sustento assume um risco que o trabalho formal historicamente distribuía de outra forma.\n\nTEXTO IV\nModelos regulatórios testados em diferentes países vão da manutenção da autonomia plena, passando por categorias intermediárias com proteção parcial, até a equiparação ao vínculo empregatício tradicional — nenhum deles resolveu, até agora, o equilíbrio entre preservar a flexibilidade valorizada pelo Texto II e reduzir o risco descrito pelo Texto III.",
    "comando": "A partir dos textos e de seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: desafios para formalizar e proteger o trabalho em plataformas digitais. Dê um título ao seu texto.",
    "pontosEsperados": [
      "Delimita o tema e sustenta uma tese sobre qual modelo de proteção é mais adequado, evitando apenas descrever o funcionamento das plataformas",
      "Reconhece o valor real da flexibilidade (Texto II) sem transformar esse reconhecimento em recusa de qualquer proteção",
      "Articula o risco assumido pelo trabalhador (Texto III) como consequência concreta da ausência de vínculo, e não apenas como afirmação genérica",
      "Avalia ao menos um modelo regulatório intermediário (Texto IV) com argumento próprio a favor ou contra",
      "Constrói texto com título, norma-padrão e progressão argumentativa clara"
    ]
  },
  {
    "id": "redacao-78",
    "tema": "Caminhos para reduzir a evasão fiscal no Brasil",
    "modelo": "tema abstrato",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nEvasão fiscal — deixar de pagar tributo devido, por omissão ou fraude — é distinta de elisão fiscal, o planejamento tributário lícito que reduz imposto dentro da lei. A linha entre as duas nem sempre é nítida na prática, e parte do litígio tributário brasileiro decorre exatamente dessa fronteira.\n\nTEXTO II\nEstimativas do custo da evasão para a arrecadação brasileira somam valores da ordem de centenas de bilhões de reais por ano — recurso que, se arrecadado, poderia financiar despesa pública sem elevar a carga tributária de quem já paga em dia.\n\nTEXTO III\nCruzamento de dados eletrônicos — nota fiscal digital, Pix, informações bancárias — ampliou a capacidade da fiscalização de identificar divergência entre renda declarada e movimentação financeira, reduzindo o espaço para omissão simples.\n\nTEXTO IV\nGrande parte da evasão de maior valor não ocorre por omissão simples, mas por estrutura societária complexa e operação internacional desenhada para deslocar lucro para jurisdição de tributação mais baixa — problema que cruzamento de dados domésticos não resolve sozinho.",
    "comando": "Com base nos textos e em seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: caminhos para reduzir a evasão fiscal no Brasil. Dê um título ao seu texto.",
    "pontosEsperados": [
      "Delimita o tema e sustenta uma tese sobre qual caminho é mais eficaz, distinguindo claramente evasão de elisão fiscal (Texto I)",
      "Relaciona o custo da evasão (Texto II) ao argumento de que combatê-la é alternativa a elevar a carga tributária de quem já paga",
      "Reconhece o avanço do cruzamento de dados (Texto III) sem tratá-lo como suficiente diante da evasão internacional (Texto IV)",
      "Distingue evasão de pequeno porte de evasão estruturada internacionalmente, propondo abordagem que não trate as duas como o mesmo problema",
      "Apresenta título, mantém a norma-padrão e a coesão entre os parágrafos"
    ]
  },
  {
    "id": "redacao-79",
    "tema": "Desafios para tornar as micro e pequenas empresas mais competitivas",
    "modelo": "tema abstrato",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nMicro e pequenas empresas respondem pela maior parte dos estabelecimentos formais no Brasil e por parcela relevante do emprego privado, mas por fração bem menor da produtividade agregada da economia — indicador de que a maioria delas opera com margem estreita.\n\nTEXTO II\nO regime tributário simplificado (Simples Nacional), criado para reduzir o custo de conformidade fiscal desse grupo, é apontado por parte dos economistas como fonte de um efeito colateral: empresas evitam crescer além do teto de faturamento do regime para não perder o benefício, um incentivo a permanecer pequena.\n\nTEXTO III\nAcesso a crédito é historicamente mais caro e mais escasso para pequena empresa do que para grande, por ter menos garantia a oferecer e histórico mais curto — o que limita investimento em equipamento, tecnologia e capacitação que aumentariam a produtividade.\n\nTEXTO IV\nParte da baixa produtividade agregada do grupo reflete também a alta taxa de mortalidade dessas empresas nos primeiros anos: negócio que fecha cedo nunca chega a acumular a experiência que aumentaria sua eficiência.",
    "comando": "A partir da leitura dos textos e de seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: desafios para tornar as micro e pequenas empresas mais competitivas. Dê um título ao seu texto.",
    "pontosEsperados": [
      "Delimita o tema e sustenta uma tese sobre o principal obstáculo à produtividade desse grupo, sem apenas descrever sua importância para o emprego",
      "Discute o efeito colateral do regime simplificado (Texto II) como tensão entre dois objetivos de política pública, e não como falha simples",
      "Relaciona a dificuldade de acesso a crédito (Texto III) ao investimento em produtividade como cadeia causal explícita",
      "Incorpora a alta mortalidade dessas empresas (Texto IV) como parte do diagnóstico, não como dado periférico",
      "Constrói introdução, desenvolvimento e conclusão articulados, com título e norma-padrão"
    ]
  },
  {
    "id": "redacao-80",
    "tema": "Caminhos para integrar o Brasil às cadeias globais de valor da indústria",
    "modelo": "tema abstrato",
    "tempoSugerido": 60,
    "texto_apoio": "TEXTO I\nCadeias globais de valor fragmentam a produção de um bem entre vários países, cada um responsável por uma etapa — do componente à montagem final —, de forma que o produto acabado carrega insumo de dezenas de origens diferentes antes de chegar ao consumidor.\n\nTEXTO II\nA participação brasileira nessas cadeias concentra-se, em grande parte, na exportação de matéria-prima e produto agrícola pouco processado — etapas de menor valor agregado por unidade, comparadas à etapa de manufatura avançada ou de desenvolvimento tecnológico.\n\nTEXTO III\nParticipar de uma etapa de cadeia global exige previsibilidade logística e regulatória compatível com fornecedores de outros países que competem pela mesma posição — prazo de entrega, custo portuário e estabilidade cambial pesam tanto quanto o preço do insumo em si.\n\nTEXTO IV\nAlguns países asiáticos usaram a entrada como fornecedor de etapa simples de uma cadeia global como porta de entrada para, ao longo de décadas, escalar para etapas de maior valor agregado — evidência de que a posição inicial na cadeia não precisa ser permanente.",
    "comando": "Com base nos textos e em seus conhecimentos, redija uma dissertação em prosa, de 20 a 30 linhas, sobre o tema: caminhos para integrar o Brasil às cadeias globais de valor da indústria. Dê um título ao seu texto.",
    "pontosEsperados": [
      "Delimita o tema e sustenta uma tese sobre qual caminho é mais promissor, sem apenas descrever o que são cadeias globais de valor",
      "Reconhece a concentração brasileira em etapas de baixo valor agregado (Texto II) como ponto de partida do problema, e não como conclusão",
      "Relaciona previsibilidade logística e regulatória (Texto III) à capacidade de competir por uma posição na cadeia, como argumento concreto",
      "Usa a trajetória de escalada de outros países (Texto IV) como possibilidade argumentável, sem tratá-la como garantia automática",
      "Apresenta título, mantém a norma-padrão e a progressão argumentativa entre os parágrafos"
    ]
  },
];

// -------------------------------------------------------------------- carga

function lerFonte() {
  const sandbox = { console };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(FONTE, "utf8"), sandbox, { filename: FONTE });
  if (!Array.isArray(sandbox.REDACOES)) throw new Error("sem window.REDACOES em " + FONTE);
  return sandbox.REDACOES;
}

function hash(arquivo) {
  return crypto.createHash("sha256").update(fs.readFileSync(arquivo)).digest("hex").slice(0, 12);
}

// -------------------------------------------------------------------- compor

const CAMPOS_OBRIGATORIOS = ["id", "tema", "modelo", "tempoSugerido", "texto_apoio", "comando", "pontosEsperados"];

function validar(p, origem) {
  const problemas = [];
  CAMPOS_OBRIGATORIOS.forEach((campo) => {
    const v = p[campo];
    const vazio = v === undefined || v === null || v === "" ||
                  (Array.isArray(v) && v.length === 0);
    if (vazio) problemas.push(origem + " (" + p.id + "): sem " + campo);
  });
  if (Array.isArray(p.pontosEsperados) && p.pontosEsperados.length < 3) {
    problemas.push(origem + " (" + p.id + "): menos de 3 pontosEsperados");
  }
  // As duas TEXTO I..IV que a convenção do projeto usa — conferido pela
  // contagem de marcadores "TEXTO ", não pela leitura de conteúdo.
  const marcadores = (p.texto_apoio && p.texto_apoio.match(/TEXTO [IVX]+/g)) || [];
  if (marcadores.length < 3) problemas.push(origem + " (" + p.id + "): texto_apoio com menos de 3 textos");
  return problemas;
}

function compor() {
  const originais = lerFonte();
  const problemas = [];

  originais.forEach((p) => problemas.push(...validar(p, "herdada")));
  NOVAS.forEach((p) => problemas.push(...validar(p, "nova")));

  // IDs únicos no conjunto final — herdada + nova não pode colidir, e as
  // próprias novas não podem colidir entre si.
  const vistos = new Map();
  originais.concat(NOVAS).forEach((p) => {
    if (vistos.has(p.id)) problemas.push("id repetido: " + p.id + " (" + vistos.get(p.id) + " e outra ocorrência)");
    vistos.set(p.id, p.modelo);
  });

  // As novas não podem repetir modelo diferente do prometido: 10 "entre X e
  // Y" seguidas de 10 "tema abstrato", nessa ordem, porque é assim que o
  // cabeçalho e o commit descrevem o lote.
  const primeiraDez = NOVAS.slice(0, 10);
  const segundaDez = NOVAS.slice(10, 20);
  if (NOVAS.length !== 20) problemas.push("esperava exatamente 20 propostas novas, achei " + NOVAS.length);
  primeiraDez.forEach((p) => { if (p.modelo !== "entre X e Y") problemas.push(p.id + ": esperava modelo \"entre X e Y\", achei \"" + p.modelo + "\""); });
  segundaDez.forEach((p) => { if (p.modelo !== "tema abstrato") problemas.push(p.id + ": esperava modelo \"tema abstrato\", achei \"" + p.modelo + "\""); });

  // Nenhuma das duas não deve carregar comandoInsper: é a mesma regra das
  // propostas herdadas desses dois modelos (nenhum tema em pergunta
  // dicotômica), e destoar aqui seria inventar formato que a banca não usa.
  NOVAS.forEach((p) => { if (p.comandoInsper) problemas.push(p.id + ": não deveria ter comandoInsper (modelo " + p.modelo + ")"); });

  // Nenhum tema repetido, herdada contra herdada nem herdada contra nova —
  // redação não tem curso, mas o MESMO tema duas vezes no mesmo banco
  // desperdiça treino.
  const temas = new Map();
  originais.concat(NOVAS).forEach((p) => {
    const chave = p.tema.trim().toLowerCase();
    if (temas.has(chave)) problemas.push("tema repetido entre " + temas.get(chave) + " e " + p.id);
    temas.set(chave, p.id);
  });

  if (problemas.length) {
    console.error("propostas de Economia NÃO compostas:");
    problemas.forEach((p) => console.error("  - " + p));
    process.exit(1);
  }

  return originais.concat(NOVAS);
}

function cabecalho(total) {
  return [
    "// GERADO por vestibular-economia/build-redacoes.js -- nao edite a mao.",
    "// Propostas de redacao da trilha de Economia. Sao " + total + ":",
    "//",
    "//   60 SAO AS MESMAS da trilha de Direito, comando e comandoInsper originais,",
    "//   sem traducao -- redacao nao tem curso, e o formato de prova (FGV e Insper)",
    "//   e o mesmo nas duas trilhas (ver redacaoUI em trilhas.js). Fonte:",
    "//   vestibular-direito/data/redacoes.js, onde estao documentados os oito",
    "//   modelos de formulacao de tema.",
    "//",
    "//   20 SAO NOVAS (redacao-61 a redacao-80), dez do modelo \"entre X e Y\" e dez",
    "//   de \"tema abstrato\" -- os dois modelos que, no repertorio herdado, pedem",
    "//   arbitragem entre principios em tensao em vez de posicao numa dicotomia de",
    "//   valor, o que combina com o tipo de escolha que a politica economica cobra",
    "//   o tempo todo. Nao levam comandoInsper, pela mesma regra dos modelos",
    "//   herdados desse tipo: o Insper so pede tema em pergunta dicotomica.",
    "//",
    "// Corrigiu uma proposta herdada? Edite em vestibular-direito/data/redacoes.js",
    "// e rode este build de novo. Corrigiu uma das 20 novas? Edite dentro do",
    "// proprio build-redacoes.js -- e a fonte delas.",
    "// `--verificar` reprova quando a fonte de Direito mudou e este arquivo nao.",
  ].join("\n");
}

function gravar(saida) {
  fs.writeFileSync(SAIDA, cabecalho(saida.length) + "\nwindow.REDACOES = " + JSON.stringify(saida, null, 2) + ";\n", "utf8");

  const porModelo = {};
  saida.forEach((p) => { porModelo[p.modelo] = (porModelo[p.modelo] || 0) + 1; });

  fs.writeFileSync(MANIFESTO, JSON.stringify({
    composto: new Date().toISOString().slice(0, 10),
    total: saida.length,
    herdadas: saida.length - NOVAS.length,
    novas: NOVAS.length,
    porModelo: porModelo,
    origem: { "direito/redacoes": hash(FONTE) },
  }, null, 2) + "\n", "utf8");
}

function verificar() {
  if (!fs.existsSync(SAIDA) || !fs.existsSync(MANIFESTO)) {
    console.error("propostas de Economia ainda não foram compostas.");
    process.exit(1);
  }
  const manifesto = JSON.parse(fs.readFileSync(MANIFESTO, "utf8"));
  if (manifesto.origem["direito/redacoes"] !== hash(FONTE)) {
    console.error("propostas de Economia VELHAS -- vestibular-direito/data/redacoes.js mudou.");
    console.error("rode: node vestibular-economia/build-redacoes.js");
    process.exit(1);
  }
  console.log("propostas de Economia em dia com a fonte de Direito.");
}

// ---------------------------------------------------------------------- main

if (process.argv.includes("--verificar")) {
  verificar();
} else {
  const saida = compor();
  gravar(saida);
  const porModelo = {};
  saida.forEach((p) => { porModelo[p.modelo] = (porModelo[p.modelo] || 0) + 1; });
  console.log("propostas de Economia compostas: " + saida.length + " (" + (saida.length - NOVAS.length) + " herdadas + " + NOVAS.length + " novas)");
  Object.keys(porModelo).sort().forEach((m) => console.log("  " + m.padEnd(20) + porModelo[m]));
}
