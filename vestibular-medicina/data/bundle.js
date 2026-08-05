// Banco de questões da trilha de Medicina.
//
// ESTADO: semente inicial. O alvo é ~1.900 questões (mesma ordem de grandeza da
// trilha de Direito, que tem 1.992). O que está aqui estabelece o padrão de
// construção para o restante — ver PLANO-MULTITRILHA.md §5.4 para a ordem de
// preenchimento por retorno decrescente.
//
// Critérios aplicados desde a primeira questão, herdados de
// PLANO-ALINHAMENTO-BANCO.md para não repetir os vícios que a trilha de Direito
// levou meses para corrigir:
//
//   - CINCO alternativas sempre (a Unicamp usa quatro; suas questões levam
//     "banca": "unicamp" e são tratadas na renderização).
//   - Gabarito distribuído, não concentrado em "b"/"c".
//   - Texto de apoio longo e, quando possível, COMPARTILHADO por 2+ questões
//     via `textoId` — é assim que FUVEST, Unesp e Santa Casa montam os blocos.
//   - Matemática e Química sempre com contexto concreto, nunca cálculo seco.
//   - Formato `lacunas` presente: é a assinatura da VUNESP (Unesp, Santa Casa,
//     Einstein) e não aparece em FUVEST, Unicamp nem PUC-SP.
//
// Campos: id, enunciado, alternativas{a..e}, resposta, explicacao, formato,
// e um entre texto_apoio (texto próprio) ou textoId (texto compartilhado).

window.QUESTION_TEXTS = {
  "med-bio-t1": {
    "id": "med-bio-t1",
    "fonte": "Texto original em gênero de divulgação científica, no registro usado pelas bancas de Medicina",
    "conteudo": "Toda célula precisa manter o volume dentro de uma faixa estreita. Em água doce, um protozoário como o paramécio vive permanentemente em meio hipotônico: a concentração de solutos dentro dele é maior que a de fora, e a água entra por osmose sem parar. Se nada acontecesse, a célula incharia até romper.\n\nA solução evolutiva é um vacúolo contrátil, uma estrutura que recolhe o excesso de água e o expulsa por um poro na membrana. O processo consome ATP: bombear água contra o fluxo osmótico não é espontâneo. Quando um inibidor metabólico interrompe o funcionamento desse vacúolo, o resultado é previsível em duas frentes ao mesmo tempo — o volume celular sobe, porque a água continua entrando e deixa de sair, e a concentração do citoplasma cai, porque a mesma quantidade de soluto passa a ocupar um volume maior.\n\nO detalhe que costuma escapar é que as duas curvas não são independentes: elas são duas leituras do mesmo evento. Confundi-las, ou imaginar que a concentração sobe junto com o volume, é o erro mais comum quando a questão apresenta os dois gráficos lado a lado."
  },
  "med-ing-t1": {
    "id": "med-ing-t1",
    "fonte": "Texto original em gênero de reportagem de saúde de veículo internacional",
    "conteudo": "For most of the twentieth century, medical training treated the interview as a formality [formalidade]. Students learned anatomy, pharmacology and surgery; the conversation with the patient was something they were expected to pick up [absorver] by watching. Selection into medical school followed the same logic. Candidates were ranked [classificados] almost entirely by written examinations, on the assumption that a mind capable of mastering biochemistry could be trusted to handle a frightened person as well.\n\nThat assumption has not survived contact with the evidence. Studies of malpractice [erro médico] claims consistently find that patients who sue [processam] are rarely those who received the worst clinical care. They are those who felt dismissed [ignorados] — who could not get a straight answer, or who sensed that nobody was listening. Communication failure, not technical failure, is the better predictor.\n\nSchools in Canada responded in the early 2000s with a format now used in more than thirty countries: a circuit of short, timed stations, each presenting a scenario [cenário] and an evaluator. A candidate might be asked to explain a difficult decision, to disagree with a colleague, or simply to sit with someone receiving bad news. There is no correct answer to memorise. What is measured is how the candidate reasons aloud [em voz alta] under mild pressure.\n\nCritics point out that the format rewards [recompensa] fluency, and that fluency is unevenly distributed [distribuída] by class and schooling. Defenders reply that the written examination rewards it too — only invisibly, and without ever admitting that this is what it is doing."
  }
};

window.QUESTION_BANKS = {
  // ---------------- CIÊNCIAS DA NATUREZA ----------------
  "biologia": [
    {
      "id": "med-biologia-01",
      "textoId": "med-bio-t1",
      "enunciado": "Um paramécio é mantido em solução hipotônica e recebe um inibidor que interrompe o funcionamento dos vacúolos contráteis. Sobre o volume celular e a concentração do citoplasma ao longo do tempo, é correto afirmar que:",
      "alternativas": {
        "a": "ambos aumentam, porque a entrada de água concentra os solutos já presentes no citoplasma",
        "b": "ambos diminuem, porque a célula passa a perder água para o meio hipotônico",
        "c": "o volume aumenta e a concentração diminui, porque a água continua entrando por osmose e a mesma quantidade de soluto passa a ocupar um volume maior",
        "d": "o volume aumenta e a concentração permanece constante, já que a membrana regula a passagem de solutos independentemente da água",
        "e": "o volume permanece constante e a concentração diminui, porque a parede celular impede a expansão do paramécio"
      },
      "resposta": "c",
      "explicacao": "Em meio hipotônico a água entra continuamente por osmose. Bloqueado o vacúolo contrátil, ela deixa de ser expulsa: o volume sobe. Como a quantidade de soluto não muda e o volume cresce, a concentração cai. As duas curvas são leituras do mesmo evento, e não fenômenos independentes — daí o erro de (a). Em (e), o paramécio é um protozoário e não possui parede celular.",
      "formato": "direta"
    },
    {
      "id": "med-biologia-02",
      "texto_apoio": "Em 1967, a bióloga Lynn Margulis propôs que mitocôndrias e cloroplastos teriam se originado de bactérias de vida livre incorporadas por células ancestrais. A hipótese foi rejeitada por mais de uma década antes de se tornar consenso. Entre as evidências reunidas desde então estão a presença de DNA circular próprio nessas organelas, ribossomos semelhantes aos bacterianos e uma dupla membrana cuja camada interna tem composição distinta da externa.",
      "enunciado": "A dupla membrana das mitocôndrias, com composição diferente entre as camadas, sustenta a hipótese endossimbiótica porque:",
      "alternativas": {
        "a": "indica que a organela foi produzida pelo complexo golgiense em duas etapas sucessivas",
        "b": "a camada interna corresponderia à membrana da bactéria ancestral e a externa, à membrana do vacúolo formado pela célula hospedeira ao englobá-la",
        "c": "demonstra que a mitocôndria é capaz de se dividir de forma independente do núcleo celular",
        "d": "as duas camadas apresentam a mesma origem evolutiva, o que explicaria a semelhança entre elas",
        "e": "a dupla membrana é exclusiva das organelas que realizam fosforilação oxidativa"
      },
      "resposta": "b",
      "explicacao": "A endocitose de uma bactéria produz uma estrutura com duas membranas de origens diferentes: a da própria bactéria, que vira a interna, e a do vacúolo endocítico do hospedeiro, que vira a externa. É justamente por terem origens distintas que as composições diferem — o que (d) inverte. O DNA circular e os ribossomos bacterianos são evidências independentes, não o que a questão pede.",
      "formato": "direta"
    },
    {
      "id": "med-biologia-03",
      "texto_apoio": "Em cavalos, a cor da pelagem depende de dois genes não ligados. O alelo W é epistático e dominante sobre w: quando presente, o animal é branco, independentemente do outro gene. Na ausência de W, o gene B se manifesta — B determina pelos pretos e b, pelos marrons, com B dominante sobre b.",
      "enunciado": "Do cruzamento entre uma égua branca duplamente heterozigota (WwBb) e um garanhão marrom (wwbb), a proporção esperada de descendentes marrons é de:",
      "alternativas": {
        "a": "1/8",
        "b": "1/4",
        "c": "3/8",
        "d": "1/2",
        "e": "3/4"
      },
      "resposta": "b",
      "explicacao": "Para ser marrom o descendente precisa ser ww (não branco) e bb (não preto). Do cruzamento Ww × ww, metade é ww. Do cruzamento Bb × bb, metade é bb. Como os genes são não ligados, multiplicam-se: 1/2 × 1/2 = 1/4. O erro frequente é esquecer a epistasia e calcular só o gene B.",
      "formato": "direta"
    }
  ],

  "quimica": [
    {
      "id": "med-quimica-01",
      "texto_apoio": "O rótulo de uma bebida gaseificada informa que cada 100 mL contêm 13 mg de sódio. A tabela nutricional também declara a presença de dois compostos responsáveis pelo sabor artificial de limão.",
      "enunciado": "A concentração de sódio dessa bebida, expressa em g/L, é de:",
      "alternativas": {
        "a": "0,013 g/L",
        "b": "0,13 g/L",
        "c": "1,3 g/L",
        "d": "13 g/L",
        "e": "130 g/L"
      },
      "resposta": "b",
      "explicacao": "13 mg em 100 mL equivalem a 130 mg em 1.000 mL, ou seja, 130 mg/L. Convertendo para gramas: 0,13 g/L. O erro mais comum é converter a massa e esquecer o volume (ou o contrário), o que produz (a) ou (c). Em provas como a da Unifesp, resultado com unidade errada não é aceito mesmo com o raciocínio correto.",
      "formato": "direta"
    },
    {
      "id": "med-quimica-02",
      "texto_apoio": "O ibuprofeno (massa molar 206 g/mol) é um anti-inflamatório cuja estrutura apresenta um anel aromático ligado a uma cadeia carbônica terminada por um grupo –COOH. A dosagem de um comprimido pode ser verificada por titulação com solução aquosa de NaOH.",
      "enunciado": "A função orgânica presente no grupo destacado e a quantidade de matéria de ibuprofeno em um comprimido de 600 mg são, respectivamente:",
      "alternativas": {
        "a": "éster e aproximadamente 2,9 mol",
        "b": "ácido carboxílico e aproximadamente 2,9 mol",
        "c": "ácido carboxílico e aproximadamente 2,9 × 10⁻³ mol",
        "d": "aldeído e aproximadamente 2,9 × 10⁻³ mol",
        "e": "cetona e aproximadamente 0,29 mol"
      },
      "resposta": "c",
      "explicacao": "O grupo –COOH caracteriza ácido carboxílico, o que já elimina (a), (d) e (e). A quantidade de matéria é 0,600 g ÷ 206 g/mol ≈ 2,9 × 10⁻³ mol. A alternativa (b) traz a função certa com a ordem de grandeza errada — é a distratora que pune quem não converte mg para g.",
      "formato": "direta"
    },
    {
      "id": "med-quimica-03",
      "texto_apoio": "Um corante vermelho amplamente usado em alimentos e cosméticos é extraído da cochonilha, um inseto. Sua molécula apresenta anéis aromáticos com grupos –OH ligados diretamente a eles e um grupo –COOH na extremidade da cadeia.",
      "enunciado": "O corante é obtido a partir de um animal que possui ______, e sua molécula apresenta as funções orgânicas ______ e ______. As lacunas são preenchidas, respectivamente, por:",
      "alternativas": {
        "a": "circulação aberta – fenol – ácido carboxílico",
        "b": "circulação fechada – éter – amida",
        "c": "circulação aberta – álcool – éster",
        "d": "circulação fechada – fenol – ácido carboxílico",
        "e": "circulação aberta – enol – cetona"
      },
      "resposta": "a",
      "explicacao": "A cochonilha é um inseto, e insetos têm circulação aberta — o que elimina (b) e (d). Hidroxila ligada diretamente a anel aromático é fenol (não álcool, o que elimina (c)), e o grupo –COOH é ácido carboxílico. Este é o formato de LACUNAS, assinatura da VUNESP: acertar duas das três não pontua, a questão é toda ou nada.",
      "formato": "lacunas",
      "banca": "unesp"
    }
  ],

  "fisica": [
    {
      "id": "med-fisica-01",
      "texto_apoio": "Um vaso de 0,4 kg cai da sacada de um edifício. Durante a queda, ele passa pelo campo de visão de dois moradores em andares diferentes, com um intervalo de tempo de 0,5 s entre as duas passagens. Despreze a resistência do ar e adote g = 10 m/s².",
      "enunciado": "Se a velocidade do vaso ao passar pelo primeiro morador é de 6 m/s, a distância percorrida entre as duas passagens é de:",
      "alternativas": {
        "a": "1,25 m",
        "b": "3,00 m",
        "c": "4,25 m",
        "d": "5,00 m",
        "e": "6,25 m"
      },
      "resposta": "c",
      "explicacao": "Movimento uniformemente acelerado: Δs = v₀t + at²/2 = 6(0,5) + 10(0,5)²/2 = 3,0 + 1,25 = 4,25 m. A alternativa (b) é o resultado de quem esquece o termo da aceleração, e (a), o de quem usa só ele. A massa do vaso é informação irrelevante — as bancas incluem dados desnecessários de propósito.",
      "formato": "direta"
    },
    {
      "id": "med-fisica-02",
      "texto_apoio": "Uma pessoa posiciona-se em pé diante de um espelho plano vertical, a 1,2 m dele. Atrás dela, a 2,0 m do espelho, há um relógio de parede.",
      "enunciado": "A distância entre a pessoa e a imagem do relógio formada pelo espelho é de:",
      "alternativas": {
        "a": "0,8 m",
        "b": "1,2 m",
        "c": "2,0 m",
        "d": "3,2 m",
        "e": "6,4 m"
      },
      "resposta": "d",
      "explicacao": "O espelho plano forma imagem virtual simétrica: o relógio está a 2,0 m na frente do espelho, logo sua imagem está a 2,0 m atrás dele. A pessoa está a 1,2 m do espelho. A distância pessoa–imagem é 1,2 + 2,0 = 3,2 m. O erro típico é subtrair as distâncias, gerando (a).",
      "formato": "direta"
    },
    {
      "id": "med-fisica-03",
      "texto_apoio": "Em um exame de audiometria, mede-se o nível mínimo de intensidade sonora que um paciente consegue perceber em diferentes frequências. Para esse paciente, o limiar em 500 Hz foi de 20 dB e, em 8.000 Hz, de 60 dB.",
      "enunciado": "A razão entre a intensidade da onda sonora emitida em 8.000 Hz e a emitida em 500 Hz, nesses limiares, é de:",
      "alternativas": {
        "a": "3",
        "b": "40",
        "c": "10²",
        "d": "10⁴",
        "e": "10⁶"
      },
      "resposta": "d",
      "explicacao": "O nível sonoro em decibéis é β = 10·log(I/I₀). A diferença de 40 dB corresponde a log(I₂/I₁) = 4, logo I₂/I₁ = 10⁴. A alternativa (b) é a diferença em dB tomada como se fosse a razão — confusão entre escala logarítmica e linear, que é exatamente o que a questão testa.",
      "formato": "direta"
    }
  ],

  // ---------------- MATEMÁTICA ----------------
  "matematica": [
    {
      "id": "med-matematica-01",
      "texto_apoio": "Uma unidade de pronto atendimento registrou, ao longo de uma semana, o número de pacientes atendidos por dia: 42, 51, 38, 47, 51, 60 e 45.",
      "enunciado": "Sobre média, mediana e moda dessa série, é correto afirmar que:",
      "alternativas": {
        "a": "a média é maior que a mediana, e a moda é 51",
        "b": "a média é menor que a mediana, e a moda é 47",
        "c": "média, mediana e moda coincidem em 47",
        "d": "a média é igual à mediana, e a moda é 51",
        "e": "a mediana é 51 e a moda não existe"
      },
      "resposta": "a",
      "explicacao": "Soma = 334; média = 334/7 ≈ 47,7. Ordenando: 38, 42, 45, 47, 51, 51, 60 — a mediana é o quarto valor, 47. A moda é 51, único valor repetido. Logo a média (47,7) é maior que a mediana (47) e a moda é 51. A alternativa (d) pune quem calcula a média de cabeça e a arredonda para 47.",
      "formato": "direta"
    },
    {
      "id": "med-matematica-02",
      "texto_apoio": "Um cilindro reto é colocado dentro de um cubo de aresta 4 cm, de modo que cada base do cilindro tangencia quatro faces do cubo e as duas bases encostam nas faces opostas restantes.",
      "enunciado": "O volume do cilindro, em cm³, é igual a:",
      "alternativas": {
        "a": "4π",
        "b": "8π",
        "c": "16π",
        "d": "32π",
        "e": "64π"
      },
      "resposta": "c",
      "explicacao": "A base do cilindro é o círculo inscrito na face do cubo: raio 2 cm. A altura é a aresta, 4 cm. V = πr²h = π(4)(4) = 16π cm³. O erro mais comum é usar o raio igual à aresta (4 cm), o que produz (e).",
      "formato": "direta"
    }
  ],

  // ---------------- LINGUAGENS ----------------
  "interpretacao-texto": [
    {
      "id": "med-interpretacao-texto-01",
      "textoId": "med-ing-t1",
      "enunciado": "De acordo com o texto, a principal justificativa apresentada para a adoção do formato de estações curtas na seleção de estudantes de medicina é que:",
      "alternativas": {
        "a": "o exame escrito passou a apresentar índices crescentes de fraude nas últimas décadas",
        "b": "processos por erro médico costumam partir de pacientes que se sentiram ignorados, e não daqueles que receberam o pior atendimento clínico",
        "c": "o número de candidatos cresceu a ponto de inviabilizar a correção de provas escritas longas",
        "d": "as escolas canadenses buscavam reduzir o custo do processo seletivo",
        "e": "a formação em bioquímica deixou de ser considerada relevante para a prática médica"
      },
      "resposta": "b",
      "explicacao": "O segundo parágrafo é explícito: quem processa raramente recebeu o pior cuidado clínico; são os que se sentiram ignorados, e a falha de comunicação prevê melhor o litígio. As demais alternativas trazem justificativas plausíveis mas ausentes do texto — o distrator clássico de questão de compreensão.",
      "formato": "direta"
    },
    {
      "id": "med-interpretacao-texto-02",
      "textoId": "med-ing-t1",
      "enunciado": "No último parágrafo, ao afirmar que o exame escrito também recompensa a fluência, “só que invisivelmente”, os defensores do novo formato pretendem:",
      "alternativas": {
        "a": "reconhecer a crítica e desqualificá-la, mostrando que o problema apontado não é exclusivo do formato criticado",
        "b": "admitir que o novo formato é mais injusto que o anterior, mas defendê-lo por ser mais barato",
        "c": "demonstrar que a fluência não influencia o desempenho em provas escritas",
        "d": "propor a eliminação de qualquer forma de avaliação de candidatos a medicina",
        "e": "sustentar que a origem social dos candidatos é irrelevante para o resultado das seleções"
      },
      "resposta": "a",
      "explicacao": "O movimento argumentativo é de concessão seguida de contra-ataque: aceita-se que o formato premia fluência, mas mostra-se que o exame escrito faz o mesmo sem admitir. Não há negação de que a fluência conte (o que elimina (c)) nem afirmação de que a origem social seja irrelevante (o que elimina (e)).",
      "formato": "direta"
    }
  ],

  "gramatica": [
    {
      "id": "med-gramatica-01",
      "texto_apoio": "“Não lhas dou porque já não lhas tenho, e mesmo que ainda lhas tivesse, não lhas daria!”",
      "enunciado": "A forma “lhas”, repetida no trecho, resulta da combinação de:",
      "alternativas": {
        "a": "um pronome oblíquo indireto com um artigo definido feminino plural",
        "b": "dois pronomes oblíquos átonos, um indireto e um direto, ambos no plural",
        "c": "um pronome possessivo com um pronome demonstrativo",
        "d": "um pronome oblíquo tônico com uma preposição contraída",
        "e": "um pronome de tratamento com um artigo definido"
      },
      "resposta": "b",
      "explicacao": "“Lhas” é a combinação do oblíquo átono indireto “lhe(s)” com o direto “as” — construção hoje rara, mas cobrada justamente por isso. Não há artigo (o que elimina (a) e (e)), nem possessivo, nem forma tônica.",
      "formato": "direta"
    }
  ],

  "literatura": [
    {
      "id": "med-literatura-01",
      "texto_apoio": "Um narrador em primeira pessoa relata ter matado uma borboleta que entrou em seu quarto e, em seguida, reflete: por que diabo não era ela azul? A reflexão, diz ele, o consolou do malefício e o reconciliou consigo mesmo.",
      "enunciado": "Tal reflexão aponta para:",
      "alternativas": {
        "a": "a ingenuidade do narrador, que acredita poder se reconciliar com a vítima",
        "b": "o pessimismo do narrador, que insiste em encarar negativamente um evento edificante",
        "c": "a humildade do narrador, que busca encobrir a perversidade do ato praticado",
        "d": "a prepotência do narrador, que busca responsabilizar a vítima pelo mal sofrido",
        "e": "a compaixão do narrador, que lamenta sinceramente o destino do animal"
      },
      "resposta": "d",
      "explicacao": "Ao transferir para a borboleta a culpa por não ter a cor que a teria salvado, o narrador se absolve. É o mecanismo de ironia machadiana: a autoabsolvição travestida de reflexão filosófica. As alternativas (a) e (c) atribuem virtudes que o texto justamente desmonta.",
      "formato": "direta"
    }
  ],

  "ingles": [
    {
      "id": "med-ingles-01",
      "textoId": "med-ing-t1",
      "enunciado": "According to the second paragraph, studies of malpractice claims indicate that patients who sue are usually those who:",
      "alternativas": {
        "a": "received the poorest clinical treatment available at the hospital",
        "b": "had previously been involved in other legal disputes",
        "c": "felt that their concerns were disregarded and that nobody was listening",
        "d": "were treated by doctors with the least technical training",
        "e": "had no access to a second medical opinion"
      },
      "resposta": "c",
      "explicacao": "O texto afirma que quem processa raramente recebeu o pior cuidado clínico — são os que se sentiram “dismissed”, ignorados. A alternativa (a) inverte exatamente o que o parágrafo diz, e é o distrator principal.",
      "formato": "direta"
    },
    {
      "id": "med-ingles-02",
      "textoId": "med-ing-t1",
      "enunciado": "In the excerpt from the third paragraph “What is measured is how the candidate reasons aloud under mild pressure”, the underlined expression refers to:",
      "alternativas": {
        "a": "the amount of clinical knowledge the candidate has memorised",
        "b": "the way the candidate verbalises the reasoning while facing the scenario",
        "c": "the speed at which the candidate moves between stations",
        "d": "the number of correct answers the candidate provides",
        "e": "the candidate's previous experience in hospital settings"
      },
      "resposta": "b",
      "explicacao": "“Reasons aloud” é raciocinar em voz alta — o texto diz explicitamente que não há resposta certa a memorizar, o que elimina (a) e (d). O foco é o processo verbalizado, não o resultado.",
      "formato": "direta"
    }
  ],

  // ---------------- CIÊNCIAS HUMANAS ----------------
  "historia": [
    {
      "id": "med-historia-01",
      "texto_apoio": "Os dados da alfândega de Buenos Aires registram cerca de 18.100 africanos oficialmente importados pelo porto entre 1740 e 1810. Historiadores estimam, porém, que o número real de desembarcados no período seja consideravelmente maior, e apontam o contrabando como principal explicação para a diferença.",
      "enunciado": "A discrepância entre o registro oficial e a estimativa dos historiadores é mais bem explicada pelo fato de que:",
      "alternativas": {
        "a": "os registros alfandegários contabilizavam apenas os africanos que sobreviviam à travessia",
        "b": "o tráfico gerava tributos, o que criava incentivo direto para subnotificar desembarques e evitar o pagamento",
        "c": "a Coroa espanhola proibira integralmente o tráfico no período, tornando todo registro clandestino",
        "d": "as autoridades locais superestimavam os números para justificar a ampliação do porto",
        "e": "a maior parte dos africanos desembarcava em portos brasileiros e era registrada apenas na origem"
      },
      "resposta": "b",
      "explicacao": "O registro alfandegário existia para cobrar imposto; declarar menos era economizar. É a explicação que conecta o documento à sua função fiscal — o método que as bancas cobram ao apresentar séries numéricas de época. A alternativa (c) é falsa para o período indicado.",
      "formato": "direta"
    }
  ],

  "geografia": [
    {
      "id": "med-geografia-01",
      "texto_apoio": "Uma charge ironiza a instabilidade das placas tectônicas com um trocadilho: “Nunca confie em placas tectônicas — elas são muito instáveis”.",
      "enunciado": "A movimentação das placas tectônicas, ironizada na imagem, é explicada:",
      "alternativas": {
        "a": "pelas barreiras orográficas, que interferem na circulação do manto",
        "b": "pelo movimento de rotação da Terra, que desvia os corpos e potencializa o tectonismo",
        "c": "pela ação do intemperismo, que transforma a crosta ao longo do tempo geológico",
        "d": "pelas correntes de convecção, que movimentam o manto e, com ele, as placas",
        "e": "pela interferência antrópica, que descaracteriza a superfície terrestre"
      },
      "resposta": "d",
      "explicacao": "O motor da tectônica de placas é a convecção no manto: material aquecido sobe, resfria e desce, arrastando a litosfera. Intemperismo (c) atua na superfície e não move placas — é a distratora mais escolhida por confundir processo exógeno com endógeno.",
      "formato": "direta"
    }
  ],

  "filosofia-sociologia": [
    {
      "id": "med-filosofia-sociologia-01",
      "texto_apoio": "TEXTO 1 — “Suponhamos, pois, que a mente seja, como dissemos, um papel em branco, desprovida de todos os caracteres, sem quaisquer ideias. Como será ela suprida? De onde lhe provém esse vasto estoque? A isso respondo numa palavra: da experiência.”\n\nTEXTO 2 — Há princípios que a razão reconhece como verdadeiros independentemente de qualquer verificação sensível, e é neles que se apoia a certeza do conhecimento.",
      "enunciado": "A oposição entre os dois textos corresponde ao debate entre:",
      "alternativas": {
        "a": "ceticismo e dogmatismo, quanto à possibilidade de haver qualquer conhecimento",
        "b": "empirismo e racionalismo, quanto à origem do conhecimento",
        "c": "idealismo e materialismo, quanto à natureza última da realidade",
        "d": "determinismo e livre-arbítrio, quanto à liberdade da ação humana",
        "e": "utilitarismo e deontologia, quanto ao critério de julgamento moral"
      },
      "resposta": "b",
      "explicacao": "O Texto 1 é a formulação empirista clássica (a mente como tábula rasa, tudo vindo da experiência); o Texto 2 sustenta princípios independentes da experiência sensível, posição racionalista. A pergunta é sobre a ORIGEM do conhecimento, não sobre sua possibilidade (a) nem sobre a natureza do real (c).",
      "formato": "direta"
    }
  ],

  "artes": [
    {
      "id": "med-artes-01",
      "texto_apoio": "Uma tela do início do século XX representa uma montanha vista repetidas vezes pelo mesmo pintor, com pinceladas curtas e planos que se sobrepõem sem contorno definido. As formas se constroem por manchas de cor justapostas, e a perspectiva tradicional aparece deliberadamente deformada.",
      "enunciado": "A descrição corresponde a um procedimento característico:",
      "alternativas": {
        "a": "do Realismo, pela fidelidade documental ao motivo observado",
        "b": "do Pós-Impressionismo, pela construção do volume por planos de cor em vez do contorno e da perspectiva clássica",
        "c": "do Barroco, pelo contraste dramático entre luz e sombra",
        "d": "do Neoclassicismo, pelo rigor do desenho e pela clareza da composição",
        "e": "do Surrealismo, pela justaposição de elementos oníricos sem relação lógica"
      },
      "resposta": "b",
      "explicacao": "Repetição do mesmo motivo, planos de cor sobrepostos e deformação deliberada da perspectiva são procedimentos pós-impressionistas — Cézanne é o caso exemplar. As demais alternativas nomeiam movimentos cujo traço descrito não corresponde ao da tela.",
      "formato": "direta"
    }
  ],

  "atualidades": [
    {
      "id": "med-atualidades-01",
      "texto_apoio": "A pejotização ocorre quando uma empresa contrata como pessoa jurídica um trabalhador que, na prática, cumpre horário, recebe ordens e é pessoalmente insubstituível — os três elementos que a legislação trabalhista usa para caracterizar o vínculo de emprego.",
      "enunciado": "O ponto central da controvérsia jurídica sobre a pejotização é que:",
      "alternativas": {
        "a": "a forma contratual adotada não altera os elementos de fato da relação, e é sobre esses elementos que a lei define a existência de vínculo",
        "b": "trabalhadores contratados como pessoa jurídica recebem, em média, remuneração inferior à dos empregados registrados",
        "c": "o modelo é vedado de forma absoluta em qualquer setor da economia",
        "d": "as plataformas digitais foram as únicas responsáveis por difundir esse tipo de contratação",
        "e": "a discussão se restringe ao setor público, onde a contratação direta é obrigatória"
      },
      "resposta": "a",
      "explicacao": "O núcleo do debate é a primazia da realidade: se subordinação, pessoalidade e habitualidade estão presentes, o contrato de prestação de serviços não descaracteriza o vínculo. As demais são afirmações laterais ou factualmente falsas.",
      "formato": "direta"
    }
  ]
};
