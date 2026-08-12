// Registro das trilhas de estudo (Direito e Medicina) — v2.
//
// Este arquivo é o PRIMEIRO a carregar e não depende de nada. Ele responde a
// duas perguntas que todo o resto do app precisa saber antes de existir:
//
//   1. Qual curso esta pessoa está estudando?  -> VD_TRILHA.atual()
//   2. Onde estão os dados desse curso?        -> VD_TRILHA.carregar()
//
// Por que isto existe: até 2026-08 o index.html carregava os dez arquivos de
// dados de Direito por <script> fixo, e o progresso vivia todo no prefixo
// "v2_". Com duas trilhas, as duas coisas quebram — o conteúdo de Medicina não
// tem onde entrar e o progresso de um curso sobrescreveria o do outro.
//
// A escolha de desenho é "uma trilha por sessão": só os dados da trilha ativa
// são carregados, e trocar de trilha recarrega a página. Isso mantém os nomes
// globais (window.SUBTOPICS, window.QUESTION_BANKS...) exatamente como sempre
// foram, então app.js e schedule.js não precisam saber que trilhas existem.
// O custo é um reload numa ação rara; o ganho é não reescrever os dois maiores
// arquivos do projeto.

(function () {
  // Contador de cache do CONTEÚDO, separado do ?v= do código (ver o comentário
  // longo no topo do index.html). Corrigiu uma questão? Incremente aqui.
  const DATA_VERSION = 40;

  // A chave da trilha ativa é a única que vive FORA do namespace de trilha —
  // é ela que diz qual namespace usar. Sobe pra nuvem junto com o resto.
  const LS_TRILHA = "v2_trilha";

  // ---------- A marca ----------
  //
  // Uma marca só, para todas as trilhas: o app é o sagax, e o curso é o que vem
  // depois do travessão. Antes cada trilha carregava a sua ("Rumo à FGV &
  // Insper", "Rumo à Medicina"), o que amarrava o nome do produto às bancas
  // que ele treina — trocar de banca obrigaria a trocar de nome.
  //
  // Tudo minúsculo, como no logotipo — inclusive o x do fim. Ele parece maior na
  // arte por ser um glifo largo e dourado, mas medido no pixel tem a mesma
  // altura do "a" e do "s" (topo 432 contra 429). Um X maiúsculo subiria 36% na
  // Montserrat e sairia diferente da imagem.
  //
  // Vem em duas formas porque tem dois destinos: `html` para o cabeçalho e os
  // títulos, onde o x é dourado como no logotipo, e `texto` para onde markup
  // não entra (document.title, atributo alt, nome de arquivo exportado).
  const MARCA_TXT = "sagax";
  const MARCA_HTML = 'saga<span class="brand-x">x</span>';

  window.VD_MARCA = { texto: MARCA_TXT, html: MARCA_HTML };

  window.VD_TRILHAS = {
    direito: {
      id: "direito",
      nome: "Direito",
      prefixo: "dir_",
      subtitulo: "FGV Direito SP e Insper",
      // Uma frase honesta sobre o que a prova mede, tirada do estudo dos
      // cadernos. É o que aparece no cartão de escolha.
      resumo: "Uma prova de língua com filtro de matemática: somando os pesos do edital, " +
              "metade da nota é Redação, Português e Inglês.",
      logoAlt: MARCA_TXT,
      titulo: MARCA_HTML + " — Direito",
      marca: MARCA_HTML,
      bancas: ["fgv", "insper"],
      dataDir: "../vestibular-direito/data/",
      arquivos: [
        "subtopics", "theory", "obras", "obras-questoes", "flashcards",
        "priority-weights", "video-topics", "bundle", "dissertativas", "redacoes",
      ],
      // "mais" é a tela de menu do celular, não um assunto de estudo: ela existe
      // nas duas trilhas e some no desktop pelo CSS, não por aqui. Está na lista
      // porque o aplicarTrilha() esconde todo .tab-btn que não esteja nela — sem
      // a entrada, a quinta aba da barra inferior nasceria oculta.
      abas: ["hoje", "calendario", "simulados", "buscar", "cards", "redacao", "obras", "erros", "progresso", "perfil", "mais"],
      // Rótulos da aba Redação. Ficavam fixos em app.js, escritos para a FGV —
      // e a trilha de Medicina exibia "como pedem os editais da FGV e do
      // Insper" sobre um caderno que é da VUNESP e da Unifesp. As propostas em
      // si são as mesmas nas duas trilhas; o que muda é o comando e a grade.
      //
      // O texto dizia também "20 a 30 linhas, como pedem os editais da FGV e do
      // Insper". A segunda metade era falsa: o documento oficial do Insper dá
      // 10 a 30 linhas e obriga a copiar a questão-tema como título.
      redacaoUI: {
        desc: "Texto <strong>dissertativo-argumentativo, em prosa</strong> — e as duas bancas contam de um jeito " +
              "diferente. A <strong>FGV</strong> pede 20 a 30 linhas, com título livre e recomendável. O " +
              "<strong>Insper</strong> pede 10 a 30, apresenta dois temas para escolher um e exige que a " +
              "questão-tema seja copiada como título.",
        hint: "Nenhuma das duas exige proposta de intervenção — isso é regra do ENEM. A FGV corrige por três " +
              "quesitos (tema e estrutura; articulação e argumentação; correção gramatical); o Insper, por cinco, " +
              "e o edital dele anula quem monta o texto com modelo pronto de internet. Nas propostas cujo tema é " +
              "pergunta há um botão com o comando do Insper para o mesmo assunto.",
      },
      obrasUI: {
        titulo: "Obras obrigatórias (FGV)",
        hint: "A prova de Artes e Questões Contemporâneas da FGV cobra leitura crítica de uma lista fechada de " +
              "obras, ligadas aos dois eixos da banca (globalização / modernidade → pós-modernidade) — não é decoreba de " +
              "enredo. Sem equivalente na prova do Insper.",
        rodape: "lista do edital 2027.1",
        rotuloAnalise: "Eixo da banca",
        complementaresTitulo: "Leituras complementares",
        complementaresHint: "Estas obras não constam da lista oficial do edital 2027.1: dez caíram de ciclos anteriores da FGV e " +
                            "dezesseis são as listas de leitura obrigatória da FUVEST e da Unicamp, que não valem para esta prova. " +
                            "Nenhuma é cobrada, mas continuam úteis como repertório para a redação e para as discursivas. " +
                            "Priorize a lista de cima.",
      },
      // Rótulos da lista de venda do onboarding (view-onboarding, .pitch-list em
      // index.html). Ficavam fixos em app.js/index.html, escritos para a FGV e
      // o Insper — e a trilha de Medicina exibia "16 frentes", um simulado de
      // "~45 questões" e a promessa de um caderno oficial de 60 em blocos de 15
      // que ela não tem (SIMULADO_OFICIAL, em schedule.js, só cobre fgv/insper).
      // Cada trilha escreve o que de fato oferece; nada aqui é reaproveitado
      // por outra.
      onboardingUI: {
        frentesResumo: "16 frentes de estudo, cada uma revisada <strong>mais de uma vez</strong> ao longo dos 90 " +
                       "dias — com mais frequência para as frentes que mais caem nas provas reais, segundo um " +
                       "estudo de 6 anos de exames",
        dissertativas: "Ao terminar os exercícios do dia, você escolhe se quer treinar <strong>questões " +
                       "dissertativas</strong> (Humanas, Linguagens e Arte, no estilo da prova discursiva da FGV) " +
                       "— meta de <strong>4x por semana</strong>, nos dias que você quiser",
        redacaoTeaser: "Aba <strong>Redação</strong> à parte, com 60 propostas dissertativo-argumentativas de 20 " +
                       "a 30 linhas e a grade de correção oficial da FGV e do Insper",
        simuladoMisto: "Todo <strong>domingo</strong> vira um <strong>simulado misto</strong> de ~45 questões, " +
                       "distribuídas entre as 16 frentes por prioridade — e a semana seguinte passa a focar mais " +
                       "nos temas em que você mais errou. No mesmo card você pode trocar pelo <strong>caderno " +
                       "oficial de 60 questões</strong> da FGV ou da Insper, em quatro blocos de 15 na ordem " +
                       "exata da prova",
        obrasTeaser: "Obras obrigatórias da FGV (Artes e Questões Contemporâneas) numa aba própria, com resumo e " +
                     "análise pelos eixos da banca",
      },
      plano: {
        totalDias: 90,
        frentesPorDia: 2,
        exerciciosMin: 12,
        exerciciosMax: 15,
        simuladoQtd: 45,
        simuladoMinPorFrente: 1,
        seed: 20260101,
      },
      provasOficiais: [
        { nome: "FGV", url: "https://vestibular.fgv.br/provas-gabaritos" },
        { nome: "Insper", url: "https://www.insper.edu.br/content/insper-portal/pt/cursos/vestibular/provas-e-gabaritos.html" },
      ],
    },

    medicina: {
      id: "medicina",
      nome: "Medicina",
      prefixo: "med_",
      subtitulo: "FUVEST, Unicamp, Unesp, Unifesp, Einstein, Santa Casa e PUC-SP",
      resumo: "Sete bancas que medem coisas diferentes: a USP cobra Geografia na 2ª fase e não " +
              "cobra Matemática; a Unicamp não cobra Física.",
      logoAlt: MARCA_TXT,
      titulo: MARCA_HTML + " — Medicina",
      marca: MARCA_HTML,
      bancas: ["fuvest", "unicamp", "unesp", "unifesp", "einstein", "santacasa", "pucsp"],
      dataDir: "../vestibular-medicina/data/",
      // "obras" e "obras-questoes" estavam fora daqui, com a justificativa de
      // que lista de obras obrigatórias seria instrumento exclusivo da FGV.
      // Era falso: a FUVEST publica uma lista de nove obras no anexo "LEITURAS
      // OBRIGATÓRIAS" de sua resolução, e cobra dela nas duas fases — oito
      // aparecem na 1ª fase de 2026 e cinco nas dez discursivas de Português
      // do dia 1, que vale um terço da nota, desempata em primeiro lugar e
      // elimina quem zera. É peso igual ou maior que o da lista da FGV.
      arquivos: [
        "subtopics", "theory", "obras", "obras-questoes", "flashcards",
        "priority-weights", "video-topics", "bundle", "dissertativas", "redacoes",
      ],
      abas: ["hoje", "calendario", "simulados", "buscar", "cards", "redacao", "obras", "erros", "progresso", "perfil", "mais"],
      redacaoUI: {
        desc: "Texto <strong>dissertativo-argumentativo em norma-padrão, com coletânea</strong>. O comando abaixo " +
              "é o dos cadernos, palavra por palavra: Unesp, Unifesp, Einstein e Santa Casa usam a mesma frase, e " +
              "a folha de resposta tem <strong>33 linhas</strong> numeradas (32 na PUC-SP).",
        hint: "As propostas são as mesmas da trilha de Direito — assunto de redação não tem curso —, e só o comando " +
              "muda. Título é exigido pela PUC-SP e pela FUVEST, e opcional nas outras cinco. A grade mais fechada é " +
              "a da Unifesp: zera com 7 linhas ou menos e com menos de 8 linhas AUTORAIS contínuas — trecho copiado " +
              "da coletânea não conta. Na FUVEST são duas propostas sobre a mesma coletânea, e a segunda é de outro " +
              "gênero (em 2026, uma carta).",
      },
      // Rótulos da aba Obras. Ficavam fixos em app.js, escritos para a FGV —
      // a trilha de Medicina exibia "Obras obrigatórias (FGV)" e "lista do
      // edital 2027.1" se a aba fosse ligada sem isto.
      obrasUI: {
        titulo: "Obras obrigatórias (FUVEST e Unicamp)",
        hint: "Duas das sete bancas publicam lista fechada de leitura obrigatória, com nove obras cada e nenhum título em " +
              "comum. Confira no cartão de que banca é cada uma: quem presta só uma das provas tem nove livros a ler, não " +
              "dezoito. A FUVEST cobra a lista nas duas fases, e o dia das discursivas de Português vale um terço da nota " +
              "final e desempata em primeiro lugar. As outras cinco bancas não publicam lista.",
        rodape: "resolução FUVEST 2026 e lista Comvest 2026",
        rotuloAnalise: "Análise crítica",
        // O nome que aparece no cartão, por banca. Só existe em Medicina: em
        // Direito a lista é uma só e o cartão não precisa dizer de quem é.
        bancasNome: { fuvest: "FUVEST", unicamp: "Unicamp" },
        complementaresTitulo: "Repertório complementar",
        complementaresHint: "Estas 54 obras não estão em nenhuma das duas listas e nenhuma banca de Medicina as cobra: vêm do repertório " +
                            "da trilha de Direito, montado sobre o edital de Artes da FGV. Estão aqui porque as bancas de Medicina " +
                            "usam arte, cinema e música como fonte de questão mesmo sem publicar lista — a FUVEST 2026 abre um bloco " +
                            "com Cézanne e obras de acervo do MASP, a Unesp parte de um ensaio sobre Courbet e de capa de álbum, e a " +
                            "Unicamp usa cinema brasileiro. Como repertório de redação e de leitura de imagem, servem. Priorize a " +
                            "lista de cima.",
      },
      // Ver o comentário sobre onboardingUI na trilha de Direito, acima: cada
      // trilha escreve a própria lista de venda do onboarding. Duas diferenças
      // importam aqui: a dissertativa não tem meta semanal de frequência (o
      // banco ainda é semente inicial — 6 questões, ver
      // vestibular-medicina/data/dissertativas.js), e não existe promessa de
      // "caderno oficial" no simulado — o app só sabe montar os cadernos da
      // FGV e do Insper (SIMULADO_OFICIAL em schedule.js), nenhum das sete
      // bancas de Medicina.
      onboardingUI: {
        frentesResumo: "13 frentes de estudo, cada uma revisada <strong>mais de uma vez</strong> ao longo dos 90 " +
                       "dias — com mais frequência para as frentes que mais caem nas provas reais, segundo um " +
                       "estudo que leu 25 cadernos oficiais das sete bancas",
        dissertativas: "Ao terminar os exercícios do dia, você pode treinar <strong>questões dissertativas</strong> " +
                       "— corrigidas por checklist, no formato de subitens a) e b) com figura ou excerto de apoio, " +
                       "comum às sete bancas desta trilha",
        redacaoTeaser: "Aba <strong>Redação</strong> à parte, com 60 propostas dissertativo-argumentativas e a " +
                       "grade de correção oficial das sete bancas desta trilha",
        simuladoMisto: "Todo <strong>domingo</strong> vira um <strong>simulado misto</strong> de ~50 questões, " +
                       "distribuídas entre as 13 frentes por prioridade — e a semana seguinte passa a focar mais " +
                       "nos temas em que você mais errou",
        obrasTeaser: "Obras obrigatórias da FUVEST e da Unicamp numa aba própria, com resumo e análise crítica",
      },
      plano: {
        totalDias: 90,
        frentesPorDia: 2,
        exerciciosMin: 12,
        exerciciosMax: 15,
        // 50 e não 45: o menor caderno objetivo entre as sete bancas é o do
        // Einstein e o da PUC-SP, com 50 questões.
        simuladoQtd: 50,
        simuladoMinPorFrente: 1,
        // Semente diferente da de Direito de propósito: com a mesma, as duas
        // trilhas produziriam a mesma ordem de frentes ao longo dos 90 dias.
        seed: 20260202,
      },
      provasOficiais: [
        { nome: "FUVEST", url: "https://www.fuvest.br/acervo-vestibular-2026/" },
        { nome: "Unicamp", url: "https://www.comvest.unicamp.br/ingresso-2026/vestibular-2026/provas-e-gabaritos-vestibular-2026/" },
        { nome: "Unesp", url: "https://vestibular.unesp.br/" },
        { nome: "Unifesp", url: "https://ingresso.unifesp.br/vestibulares-anteriores.html" },
      ],
    },

    // ---------- Economia ----------
    //
    // NO AR desde 2026-08-10. Registrada e desligada até aqui; a chave virou
    // depois de um clique real, logado — a primeira vez que alguém abriu a
    // trilha de verdade, e não uma simulação headless. Esse teste ao vivo é o
    // que achou o único defeito que as simulações não pegavam: ver o comentário
    // sobre dissertativas-matematica.js logo abaixo.
    //
    // OS OITO ARQUIVOS de `arquivos` são a lista completa do que existe em
    // vestibular-economia/data/*.js. subtopics.js e priority-weights.js foram
    // escritos direto; bundle.js, theory.js, video-topics.js, redacoes.js e
    // flashcards.js são COMPOSTOS do que já existe em Direito e Medicina, pelos
    // scripts vestibular-economia/build-*.js — mesma lógica em todos: onde o
    // conteúdo não depende do curso (banco de questões, fato de teoria,
    // vídeo-aula, flashcard, tema de redação), reaproveita-se; onde depende (as
    // cinco frentes de Matemática, que aqui valem 40% da nota contra 10% em
    // Direito, e Natureza e Literatura na teoria, que Direito e Medicina
    // calibram para provas que esta trilha não presta), escreve-se à mão
    // dentro do próprio build. Cada build tem `--verificar`, que reprova se a
    // fonte mudou e o composto não foi refeito.
    //
    // dissertativas-matematica.js (150 questões autorais mais 3 reais da FGV
    // EESP 2026.1) foi o último a entrar em `arquivos`, e o porquê vale
    // lembrar: o renderizador (VD_EXATAS.render, plugado em app.js via
    // renderDissertQuestion) já funcionava, testado contra a bancada isolada
    // vestibular-economia/demo-dissertativa.html, que carrega o arquivo por
    // conta própria. O que faltava era `carregar("economia")` pedir esse
    // arquivo — e nenhuma simulação headless passa por `carregar()`, só um
    // clique real pega isso. Foi o que aconteceu: a seção de dissertativas
    // abriu vazia no primeiro teste ao vivo, o arquivo entrou em `arquivos`,
    // e o segundo teste confirmou as questões aparecendo. Fica registrado
    // como lição: testar o motor headless e testar `carregar()` são coisas
    // diferentes, e passar num não garante passar no outro.
    //
    // O RENDERIZADOR: index.html carrega vestibular-economia/dissertativa-exatas.js/.css
    // incondicionalmente (como schedule.js e assuntos.js: código, não dado,
    // inerte sem o global), e renderDissertQuestion (app.js) despacha para
    // VD_EXATAS.render sempre que `q.itens[0].faixas` existir — dissertPool()
    // concatena window.DISSERTATIVAS (Direito/Medicina, checklist) com
    // window.DISSERTATIVAS_EXATAS (Economia, resolução por faixa), e nenhuma
    // trilha hoje define as duas. De brinde, a lista de matérias do filtro
    // "praticar uma matéria específica" passou a vir do pool de verdade em vez
    // de fixa em código — a fixa estava ERRADA para Medicina havia tempo (dizia
    // "Humanas/Linguagens/Artes", mas as áreas de lá são "Ciências da
    // Natureza"/"Ciências Humanas"/"Linguagens"; dois pills nunca casavam com
    // questão nenhuma).
    //
    // AS REDAÇÕES são as únicas das composições em que a herança entra sem
    // tradução: a FGV e o Insper cobram desta trilha exatamente o formato que
    // `comando` e `comandoInsper` de Direito já descrevem (ver redacaoUI
    // abaixo). As 60 propostas entram intactas; 20 novas (redacao-61 a
    // redacao-80, dez "entre X e Y" e dez "tema abstrato") ancoram a trilha em
    // tensão econômica real — política monetária, guerra fiscal, crédito
    // consignado, informalidade.
    //
    // OS FLASHCARDS são a composição mais ampla: quinze das vinte frentes vêm
    // prontas de Direito ou Medicina, porque um flashcard é um FATO ("como fica
    // a concordância quando o sujeito composto vem antes do verbo") e fato não
    // muda com o edital — diferente da teoria, que é "gatilhos e pegadinhas"
    // amarrados ao formato de uma banca. Só as cinco de Matemática são
    // autorais, ~80 cada, seguindo o mesmo mapa de tópicos de
    // classificar-matematica.js. Total: 1.674 cards, com história em 164
    // (soma historia-brasil + historia-geral de Direito) e as demais entre 75
    // e 85.
    //
    // A teoria e o vídeo do dia GIRAM PELO MESMO ÍNDICE (pickLessonVideo e
    // renderTheoryBlockHtml usam os dois (visitNumber - 1) % tamanho), e é isso
    // que faz a aula sugerida falar do assunto que a teoria abriu. Aqui isso não
    // depende de ninguém lembrar: build-video-topics.js LÊ os temas do
    // theory.js já composto e reprova se sobrar, faltar ou divergir um. Nas
    // outras duas trilhas o alinhamento é curadoria, e desalinhado não aparece
    // erro nenhum na tela.
    //
    // A BUSCA JÁ ESTÁ PRONTA para esta trilha, e não estava: as CINCO frentes de
    // Matemática daqui não existiam no dicionário de assuntos.js, que aponta para
    // `matematica-rlm` e `matematica` — os ids de Direito e de Medicina. Como a
    // trilha ativa absorve as questões primeiro, com economia ativa elas entravam
    // no índice sob os ids daqui e 17 assuntos de Matemática caíam de 26–244
    // questões para 0–20, nove a zero. Resolvido no bloco no fim do assuntos.js;
    // `node auditar-busca.js --trilha economia` agora acusa os mesmos 23 assuntos
    // abaixo do piso que as outras duas trilhas, e não 40.
    //
    // Quem for ligar não precisa mexer nisso — mas precisa saber que Economia
    // funde `historia-brasil` e `historia-geral` numa `historia` só, e que isso
    // ALARGA o alcance de nove assuntos de História (Brasil Colônia vai de 103
    // para 121, por exemplo). Nenhum deles cai abaixo do piso, então não é
    // defeito hoje; é o preço de um escopo de frente mais grosso que o de
    // Direito, e está medido no mesmo comando.
    //
    // Tudo abaixo sai de estudo-anatomia-provas-economia-fgv-insper-2021-2026.md,
    // não de suposição.
    economia: {
      id: "economia",
      nome: "Economia",
      prefixo: "eco_",
      subtitulo: "FGV EESP e Insper",
      // A frase do cartão é o que separa esta trilha da de Direito, onde
      // Matemática vale 10% da nota e só o zero elimina. Aqui ela vale 40% nas
      // duas escolas — e as duas bancas concordarem nesse peso é raro.
      resumo: "Matemática vale 40% da nota nas duas escolas — e três quartos desse peso " +
              "está numa prova discursiva, corrigida por faixa de 0 a 100%.",
      logoAlt: MARCA_TXT,
      titulo: MARCA_HTML + " — Economia",
      marca: MARCA_HTML,
      bancas: ["fgv", "insper"],
      dataDir: "../vestibular-economia/data/",
      arquivos: [
        "subtopics", "theory", "flashcards", "priority-weights",
        "video-topics", "bundle", "redacoes", "dissertativas-matematica",
      ],
      // Sem "obras": a prova de Artes e a lista de leitura obrigatória são
      // exclusivas da FGV Direito SP. O edital unificado não traz lista para a
      // EESP, e o conteúdo programático dela troca Artes por Ciências da
      // Natureza. Aba de obras aqui seria uma aba mentindo.
      abas: ["hoje", "calendario", "simulados", "buscar", "cards", "redacao", "erros", "progresso", "perfil", "mais"],
      redacaoUI: {
        desc: "Texto <strong>dissertativo-argumentativo, em prosa</strong>. A proposta da <strong>FGV</strong> " +
              "é a mesma da trilha de Direito — mesmo caderno, mesmo dia —, com 20 a 30 linhas e título livre. " +
              "O <strong>Insper</strong> pede 10 a 30 linhas, apresenta dois temas para escolher um e exige que " +
              "a questão-tema seja copiada como título.",
        hint: "Aqui a redação pesa mais do que em qualquer outra trilha: <strong>20% da nota final</strong> na FGV " +
              "EESP (o dobro do que vale em Direito) e <strong>25% da média final</strong> no Insper, com corte " +
              "eliminatório nas duas. Nenhuma das duas exige proposta de intervenção — isso é regra do ENEM.",
      },
      // Ver o comentário sobre onboardingUI na trilha de Direito, acima. Mesma
      // banca (FGV e Insper), mas dois pontos não se herdam: a dissertativa
      // aqui é só de Matemática, corrigida por faixa de 0 a 100% (não por
      // checklist), e o simulado misto não oferece caderno oficial — os blocos
      // de SIMULADO_OFICIAL (schedule.js) indexam frentes como "matematica-rlm"
      // e "ciencias-natureza", que não existem no banco desta trilha (aqui
      // Matemática é cinco frentes separadas), então o caderno sairia incompleto.
      onboardingUI: {
        frentesResumo: "20 frentes de estudo, cada uma revisada <strong>mais de uma vez</strong> ao longo dos 90 " +
                       "dias — com mais frequência para as frentes que mais caem nas provas reais, segundo um " +
                       "estudo de 6 anos de provas da FGV e do Insper",
        dissertativas: "Ao terminar os exercícios do dia, você escolhe se quer treinar <strong>questões " +
                       "dissertativas de Matemática</strong>, no estilo das discursivas da FGV EESP e do Insper " +
                       "— corrigidas por faixa de 0 a 100%, não por certo ou errado",
        redacaoTeaser: "Aba <strong>Redação</strong> à parte, com 80 propostas dissertativo-argumentativas de 20 " +
                       "a 30 linhas e a grade de correção oficial da FGV e do Insper",
        simuladoMisto: "Todo <strong>domingo</strong> vira um <strong>simulado misto</strong> de ~60 questões, " +
                       "distribuídas entre as 20 frentes por prioridade — e a semana seguinte passa a focar mais " +
                       "nos temas em que você mais errou",
        // Sem obrasTeaser: esta trilha não tem aba de obras (ver o comentário
        // acima de "abas", nesta mesma trilha).
      },
      plano: {
        totalDias: 90,
        frentesPorDia: 2,
        exerciciosMin: 12,
        exerciciosMax: 15,
        // 60 e não 45: pela mesma régua das outras trilhas — o menor caderno
        // objetivo entre as bancas da trilha. Aqui é o do Insper, com 60. A 1ª
        // fase da FGV EESP tem 105 objetivas somando os dois dias (60 no dia 1
        // e 45 de Natureza no dia 2).
        simuladoQtd: 60,
        simuladoMinPorFrente: 1,
        // Terceira semente distinta: com a mesma de Direito ou de Medicina, as
        // trilhas produziriam a mesma ordem de frentes ao longo dos 90 dias.
        seed: 20260303,
      },
      provasOficiais: [
        { nome: "FGV", url: "https://vestibular.fgv.br/provas-gabaritos" },
        { nome: "Insper", url: "https://www.insper.edu.br/content/insper-portal/pt/cursos/vestibular/provas-e-gabaritos.html" },
      ],
    },
  };

  function ehValida(id) {
    return !!(id && Object.prototype.hasOwnProperty.call(window.VD_TRILHAS, id));
  }

  // Carrega os <script> de dados da trilha.
  //
  // Detalhe que importa: script criado por JS é "async" por padrão, e async
  // NÃO garante ordem de execução. priority-weights.js precisa rodar depois de
  // subtopics.js, e bundle.js é o maior arquivo do projeto — deixar a ordem ao
  // acaso produziria um app que sobe com metade dos dados, de forma
  // intermitente e difícil de reproduzir. `script.async = false` restaura a
  // ordem de inserção mantendo o download em paralelo.
  //
  // `apenas` (opcional) restringe a um subconjunto de `cfg.arquivos`, na ordem
  // declarada lá. Serve à busca entre trilhas, que precisa do banco de questões
  // da outra trilha mas não da teoria, dos flashcards nem das redações dela.
  function carregar(id, apenas) {
    if (!ehValida(id)) return Promise.reject(new Error("trilha desconhecida: " + id));
    const cfg = window.VD_TRILHAS[id];
    const lista = apenas
      ? cfg.arquivos.filter(function (n) { return apenas.indexOf(n) !== -1; })
      : cfg.arquivos;

    return new Promise(function (resolve, reject) {
      let restantes = lista.length;
      if (restantes === 0) return resolve(cfg);

      lista.forEach(function (nome) {
        const el = document.createElement("script");
        el.src = cfg.dataDir + nome + ".js?d=" + DATA_VERSION;
        el.async = false; // preserva a ordem declarada em `arquivos`
        el.onload = function () {
          restantes -= 1;
          if (restantes === 0) resolve(cfg);
        };
        el.onerror = function () {
          // Falhar alto e cedo: um app que sobe sem o banco de questões parece
          // funcionar e depois mostra dias vazios, o que é pior do que um erro.
          reject(new Error("não consegui carregar " + nome + ".js da trilha " + id));
        };
        document.head.appendChild(el);
      });
    });
  }

  // Os globais que um arquivo de dados sobrescreve por nome fixo. É esta lista
  // que `carregarSecundaria` precisa guardar e devolver.
  const GLOBAIS_DE_DADOS = ["QUESTION_BANKS", "QUESTION_TEXTS", "SUBTOPICS"];

  // Carrega o banco de questões da OUTRA trilha, sem desmontar a ativa.
  //
  // A aba Buscar procura nas duas trilhas: as frentes de Linguagens, Matemática
  // e Humanas se sobrepõem, e uma questão de crase é a mesma questão de crase
  // independente do curso. Só que "uma trilha por sessão" (ver o topo deste
  // arquivo) é justamente o que faz app.js e schedule.js não precisarem saber
  // que trilhas existem — e não vale desmontar isso por causa da busca.
  //
  // O conflito é concreto: bundle.js faz `window.QUESTION_BANKS = {...}`, por
  // nome fixo. Carregar a segunda trilha por cima trocaria o banco embaixo do
  // app inteiro. Então guardamos os globais antes, deixamos o script escrever,
  // colhemos o que ele escreveu e devolvemos os originais no lugar.
  //
  // Isto é seguro porque `script.async = false` mantém a ordem e a colheita
  // acontece no onload do último arquivo — JS é single-threaded, e nada do app
  // lê esses globais entre a escrita e a restauração (todo acesso é lazy,
  // dentro de função, disparado por clique ou por render).
  //
  // Custo: 390 KB comprimidos (banco de Medicina) ou 780 KB (o de Direito),
  // uma vez por sessão, e só para quem abre a busca.
  function carregarSecundaria(id) {
    const guardados = {};
    GLOBAIS_DE_DADOS.forEach(function (k) { guardados[k] = window[k]; });

    function devolver() {
      const colhido = {};
      GLOBAIS_DE_DADOS.forEach(function (k) {
        colhido[k] = window[k];
        window[k] = guardados[k];
      });
      return colhido;
    }

    return carregar(id, ["subtopics", "bundle"]).then(devolver, function (err) {
      // Mesmo no erro os globais voltam: um arquivo pode ter entrado antes de
      // outro falhar, e sair daqui com o banco da outra trilha no lugar do
      // ativo seria pior do que não ter busca.
      devolver();
      throw err;
    });
  }

  // Carrega o BANCO COMPLEMENTAR — só a aba Buscar o usa.
  //
  // São 1.134 questões adaptadas do PDF autoral de 1.500 (ver o cabeçalho de
  // data/banco-extra.js). Elas não entram no cronograma, no simulado, no
  // caderno de erros nem no progresso, e a garantia disso é estrutural: o
  // arquivo escreve window.QUESTION_BANKS_EXTRA, um global que schedule.js não
  // conhece. Quem monta o dia é pickQuestions/pickSimulado, e os dois indexam
  // window.QUESTION_BANKS — só ele. Não há filtro para alguém esquecer de
  // aplicar: a questão não está no lugar de onde o dia é montado.
  //
  // Caminho fixo, e não cfg.dataDir: o banco é um só e serve às duas trilhas,
  // pela mesma razão que a busca já cruza trilhas — uma questão de crase é a
  // mesma questão de crase independente do curso, e as 340 de Ciências da
  // Natureza interessam mais a Medicina do que a Direito.
  const EXTRA_URL = "../vestibular-direito/data/banco-extra.js";

  function carregarExtra() {
    if (window.QUESTION_BANKS_EXTRA) {
      return Promise.resolve({
        SUBTOPICS: window.SUBTOPICS_EXTRA, QUESTION_BANKS: window.QUESTION_BANKS_EXTRA,
      });
    }
    return new Promise(function (resolve, reject) {
      const el = document.createElement("script");
      el.src = EXTRA_URL + "?d=" + DATA_VERSION;
      el.async = false;
      el.onload = function () {
        if (!window.QUESTION_BANKS_EXTRA) return reject(new Error("banco-extra.js sem dados"));
        resolve({
          SUBTOPICS: window.SUBTOPICS_EXTRA, QUESTION_BANKS: window.QUESTION_BANKS_EXTRA,
        });
      };
      el.onerror = function () { reject(new Error("não consegui carregar banco-extra.js")); };
      document.head.appendChild(el);
    });
  }

  window.VD_TRILHA = {
    CHAVE: LS_TRILHA,

    // null = pessoa ainda não escolheu. Quem responde isso é o localStorage,
    // que só é confiável DEPOIS do sync (ver auth.js).
    atual: function () {
      const v = localStorage.getItem(LS_TRILHA);
      return ehValida(v) ? v : null;
    },

    definir: function (id) {
      if (!ehValida(id)) return false;
      localStorage.setItem(LS_TRILHA, id);
      if (window.VD_SYNC) window.VD_SYNC.markDirty(LS_TRILHA);
      return true;
    },

    config: function () {
      const id = this.atual();
      return id ? window.VD_TRILHAS[id] : null;
    },

    ehValida: ehValida,
    carregar: carregar,
    carregarSecundaria: carregarSecundaria,
    carregarExtra: carregarExtra,

    // As outras trilhas, para a busca cruzada. Trilha em construção fica fora:
    // carregar o banco dela terminaria em rejeição, porque os arquivos ainda
    // não existem.
    outras: function () {
      const atual = this.atual();
      return Object.keys(window.VD_TRILHAS).filter(function (k) {
        return k !== atual && !window.VD_TRILHAS[k].emConstrucao;
      });
    },

    // As trilhas OFERECÍVEIS. É desta lista que saem o cartão do onboarding e
    // as duas saídas de "trocar de trilha" no perfil — ou seja, é o único
    // lugar em que alguém escolhe um curso. Filtrar aqui é o que impede que
    // uma trilha sem banco chegue à tela; ehValida() continua aceitando o id,
    // para dar pra testar forçando a chave no localStorage.
    lista: function () {
      return Object.keys(window.VD_TRILHAS)
        .filter(function (k) { return !window.VD_TRILHAS[k].emConstrucao; })
        .map(function (k) { return window.VD_TRILHAS[k]; });
    },

    // Todas, inclusive as em construção. Existe para quem precisa do registro
    // e não da oferta — o painel admin e os scripts de auditoria.
    listaTodas: function () {
      return Object.keys(window.VD_TRILHAS).map(function (k) { return window.VD_TRILHAS[k]; });
    },
  };
})();
