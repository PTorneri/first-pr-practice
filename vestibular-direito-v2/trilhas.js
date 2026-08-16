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
  const DATA_VERSION = 106;

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
      // A conta mudou quando a rotação passou de frente para subtema.
      //
      // São 77 dias normais nos 90 (os outros 13 são domingos de simulado). Com
      // 2 slots por dia eram 154 visitas para 79 subtemas: 1,9 por subtema em
      // três meses, perto de nunca rever. Com 3 slots são 231 visitas, 2,9 por
      // subtema, e o espaçamento entre duas passadas pelo mesmo assunto cabe
      // dentro do plano.
      //
      // A carga diária não subiu: 3 × 8-10 dá as mesmas 24-30 questões que
      // 2 × 12-15 dava. O que mudou é que o dia cobre três assuntos em vez de
      // duas matérias inteiras — e 8 a 10 questões é o tamanho de uma sessão
      // sobre UM assunto, que era grande demais para uma matéria inteira.
      plano: {
        totalDias: 90,
        subtemasPorDia: 3,
        exerciciosMin: 8,
        exerciciosMax: 10,
        simuladoQtd: 45,
        simuladoMinPorFrente: 1,
        seed: 20260101,
      },
      // Caderno oficial do modo "ensaio de prova" da aba Simulados (ver
      // pickSimuladoOficial em schedule.js). Morava fixo em schedule.js até
      // 2026-08, quando a trilha de Medicina precisou do mesmo recurso com
      // sete bancas em vez de duas — schedule.js virou genérico e cada trilha
      // passou a trazer o próprio caderno aqui, do lado do resto da sua UI
      // (redacaoUI, obrasUI, provasOficiais).
      //
      // As duas bancas usam o mesmo formato geral -- 60 objetivas em quatro
      // blocos de 15, em ordem fixa -- e composições diferentes dentro dele.
      // Fazer 60 na ordem certa treina três coisas que o adaptativo não
      // alcança: o ritmo (a FGV dá ~3,5 min por questão), a decisão de quando
      // abandonar uma questão, e o cansaço do quarto bloco, que é onde a nota
      // costuma cair.
      //
      // As composições abaixo saíram da contagem dos cadernos, e não do
      // edital. Onde os dois divergem, vale o caderno: em Humanas da Insper o
      // edital prevê Filosofia 2 e Sociologia 2, e os dois cadernos de 2026
      // trouxeram Filosofia 1 e Sociologia 3, sempre nas quatro últimas
      // questões do bloco.
      simuladoOficial: {
        fgv: {
          nome: "FGV Direito SP",
          duracaoMin: 210,
          blocos: [
            { nome: "Matemática", frentes: { "matematica": 15 } },
            // Na FGV 2026.1, 9 das 15 questões de Português saíram de dois
            // romances da lista. É a razão de literatura pesar mais que
            // gramática aqui.
            { nome: "Língua Portuguesa", frentes: { "literatura": 9, "interpretacao-texto": 3, "gramatica": 3 } },
            { nome: "Inglês", frentes: { "ingles": 15 } },
            // Composição questão a questão do caderno de 2026.1, do estudo de
            // anatomia (seção 3.4): q46-47 desdolarização e China, q48 Maxwell
            // Alexandre, q49 colonização da América, q50 e q52 Brasil colonial
            // e imperial, q51 Revolução Francesa, q53 charge do Médici, q54
            // Guerra Fria, q55 e q58 geografia urbana, q56 meio ambiente, q57 e
            // q59 agrária e logística, q60 geomorfologia.
            //
            // Antes da migração isto era "historia: 6" e "geografia: 5", porque
            // o banco não sabia dizer mais do que a matéria. Agora cada questão
            // sai do assunto certo — é a fidelidade que o subtema comprou.
            {
              nome: "Ciências Humanas",
              frentes: {
                "atualidades-geopolitica": 2,
                "artes-contemporanea": 1,
                "historia-geral-moderna": 2,
                "historia-geral-contemporanea": 1,
                "historia-brasil-colonia-imperio": 2,
                "historia-brasil-republica": 1,
                "geografia-populacao-urbana": 2,
                "geografia-agraria-economica": 2,
                "geografia-fisica-clima": 1,
                "atualidades-meioambiente": 1,
              },
            }
          ]
        },
        insper: {
          nome: "Insper",
          duracaoMin: 300,
          blocos: [
            { nome: "Linguagens e Códigos", frentes: { "literatura": 8, "interpretacao-texto": 4, "gramatica": 3 } },
            { nome: "Matemática", frentes: { "matematica": 15 } },
            { nome: "Ciências Humanas", frentes: { "geografia": 6, "historia": 5, "filosofia-sociologia": 4 } },
            // 5 de Biologia, 5 de Química e 5 de Física, nessa ordem, nos dois
            // cadernos de 2026 — e o estudo de anatomia (seção 4.4) vai além da
            // contagem: diz QUAIS assuntos, um item de cada, repetidos nos dois
            // anos. Biologia cobre ecologia, genética, fisiologia, citologia e
            // evolução; Química, separação de misturas, interações
            // intermoleculares, equilíbrio/ácido-base, concentração e orgânica;
            // Física, cinemática, óptica/energia, termologia, ondas e
            // eletromagnetismo.
            //
            // Até 2026-08 o bloco inteiro saía de uma frente única de "noções
            // gerais" de Natureza. Agora sai assunto por assunto.
            {
              nome: "Ciências da Natureza",
              frentes: {
                "biologia-ecologia": 1, "biologia-genetica": 1, "biologia-fisiologia": 1,
                "biologia-citologia": 1, "biologia-evolucao": 1,
                "quimica-solucoes": 2, "quimica-atomistica-ligacoes": 1,
                "quimica-equilibrio-acido-base": 1, "quimica-organica": 1,
                "fisica-mecanica": 1, "fisica-ondas-optica": 2,
                "fisica-termologia": 1, "fisica-eletromagnetismo": 1,
              },
            }
          ]
        }
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
      // Ver a conta dos 3 slots no plano de Direito. Medicina tem 74 subtemas
      // (não tem direitos-humanos), então são 3,1 visitas por subtema.
      plano: {
        totalDias: 90,
        subtemasPorDia: 3,
        exerciciosMin: 8,
        exerciciosMax: 10,
        // 50 e não 45: o menor caderno objetivo entre as sete bancas é o do
        // Einstein e o da PUC-SP, com 50 questões.
        simuladoQtd: 50,
        simuladoMinPorFrente: 1,
        // Semente diferente da de Direito de propósito: com a mesma, as duas
        // trilhas produziriam a mesma ordem de frentes ao longo dos 90 dias.
        seed: 20260202,
      },
      // Caderno oficial do modo "ensaio de prova" da aba Simulados — sete
      // bancas em vez das duas de Direito, uma para cada uma que a trilha
      // cobre. Tudo abaixo sai de
      // estudo-anatomia-provas-medicina-sp-2025-2026.md (seções 2 e 3, leitura
      // integral de 25 cadernos), não de suposição — MAS a granularidade
      // varia: quando o caderno separa a prova em blocos por disciplina
      // (Santa Casa, Einstein), a contagem por frente é exata; quando o bloco
      // do caderno junta mais de uma frente (ex. "Língua Portuguesa e
      // Literaturas", "Ciências Humanas"), a divisão interna entre
      // interpretacao-texto/gramatica/literatura ou historia/geografia/
      // filosofia-sociologia é uma ESTIMATIVA, marcada como tal no comentário
      // do bloco — a banca não publica esse nível de detalhe, e nenhum dos 25
      // cadernos lidos contava questão a questão dentro de um bloco misto.
      //
      // O TOTAL de cada bloco, esse sim, é sempre o número verificado no
      // caderno (ou no edital, quando citado) — só a partição interna é
      // aproximada.
      simuladoOficial: {
        // Única banca das sete cuja prova NÃO tem blocos fixos por disciplina
        // — o próprio estudo (seção 3.1) classifica a FUVEST como organizada
        // por TEMA, com a mesma questão mudando de posição entre as quatro
        // versões do caderno. Um único bloco reproduz isso melhor que blocos
        // inventados: nenhuma ordem fixa é mais fiel ao caderno real do que
        // outra. A contagem por disciplina é a da própria seção 3.1
        // ("classificação minha, não oficial" — a FUVEST não rotula as
        // questões), com Português+Literatura (~12) dividido ao meio entre
        // interpretacao-texto e literatura e Sociologia+Filosofia (5+1) somadas
        // em filosofia-sociologia, a única frente que cobre as duas.
        fuvest: {
          nome: "FUVEST",
          duracaoMin: 300,
          blocos: [
            {
              nome: "Prova completa (organizada por tema, não por disciplina)",
              frentes: {
                "biologia": 15, "historia": 10, "geografia": 10, "quimica": 9, "fisica": 8,
                "matematica": 8, "artes-cultura": 7, "filosofia-sociologia": 6,
                "interpretacao-texto": 6, "literatura": 6, "ingles": 4,
              },
            },
          ],
        },
        // Blocos rígidos, na ordem exata do caderno Q/X 2026 (seção 3.2). Só o
        // bloco "Língua Portuguesa e Literaturas" (12) e o de abertura
        // "Linguagens, Inglês e Artes" (7) não vêm com sub-contagem oficial —
        // divididos por peso relativo (window.PRIORITY_WEIGHTS_POR_BANCA.unicamp:
        // gramática pesa menos que interpretação e literatura nesta banca).
        unicamp: {
          nome: "Unicamp",
          duracaoMin: 300,
          blocos: [
            { nome: "Linguagens, Inglês e Artes", frentes: { "ingles": 3, "interpretacao-texto": 2, "artes-cultura": 2 } },
            { nome: "Física", frentes: { "fisica": 7 } },
            { nome: "Geografia", frentes: { "geografia": 7 } },
            { nome: "Filosofia e Sociologia", frentes: { "filosofia-sociologia": 6 } },
            { nome: "História", frentes: { "historia": 7 } },
            { nome: "Biologia", frentes: { "biologia": 7 } },
            { nome: "Matemática", frentes: { "matematica": 12 } },
            { nome: "Língua Portuguesa e Literaturas", frentes: { "literatura": 5, "interpretacao-texto": 5, "gramatica": 2 } },
            { nome: "Química", frentes: { "quimica": 7 } },
          ],
        },
        // As seis faixas verificadas na tabela da seção 2.3 (idêntica nos três
        // cadernos lidos: 2025.2, 2026.1, 2026.2), viradas em blocos. Só
        // "Português, Literatura e Arte" (20) e "Ciências Humanas" (30) não têm
        // sub-contagem publicada — divididos por peso relativo
        // (PRIORITY_WEIGHTS_POR_BANCA.unesp trata historia/geografia/
        // filosofia-sociologia como iguais, por isso saem 10/10/10).
        unesp: {
          nome: "Unesp",
          duracaoMin: 300,
          blocos: [
            { nome: "Português, Literatura e Arte", frentes: { "interpretacao-texto": 8, "literatura": 6, "gramatica": 3, "artes-cultura": 3 } },
            { nome: "Língua Inglesa", frentes: { "ingles": 10 } },
            { nome: "Ciências Humanas", frentes: { "historia": 10, "geografia": 10, "filosofia-sociologia": 10 } },
            { nome: "Biologia e Química", frentes: { "biologia": 7, "quimica": 7 } },
            { nome: "Física", frentes: { "fisica": 7 } },
            { nome: "Matemática", frentes: { "matematica": 8 } },
          ],
        },
        // A única banca sem Ciências (seção 3.4): 15 de Português, 10 de
        // Inglês, nada mais. O bloco de Português não separa
        // gramática/interpretação/literatura na leitura, mas o estudo o
        // descreve como "o mais gramatical do conjunto" — dá o peso maior à
        // gramática, o oposto do que as outras bancas sugerem.
        //
        // duracaoMin é a Prova I inteira (4h), que também inclui a Redação —
        // a banca não isola quanto tempo é só das 25 objetivas.
        unifesp: {
          nome: "Unifesp",
          duracaoMin: 240,
          blocos: [
            { nome: "Língua Portuguesa", frentes: { "interpretacao-texto": 7, "gramatica": 6, "literatura": 2 } },
            { nome: "Língua Inglesa", frentes: { "ingles": 10 } },
          ],
        },
        // Blocos fixos e batendo com o edital nos dois anos lidos (seção 3.3).
        // Só o bloco de Português (10) não tem sub-contagem oficial.
        //
        // duracaoMin é uma ESTIMATIVA: o edital só dá "5 horas, saída após 3h"
        // para o dia inteiro (Prova I de 50 objetivas + Prova II de 5
        // discursivas + Redação), sem isolar a Prova I.
        einstein: {
          nome: "Einstein",
          duracaoMin: 150,
          blocos: [
            { nome: "Língua Portuguesa", frentes: { "interpretacao-texto": 5, "gramatica": 3, "literatura": 2 } },
            { nome: "Língua Inglesa", frentes: { "ingles": 5 } },
            { nome: "História", frentes: { "historia": 5 } },
            { nome: "Geografia", frentes: { "geografia": 5 } },
            { nome: "Biologia", frentes: { "biologia": 5 } },
            { nome: "Química", frentes: { "quimica": 5 } },
            { nome: "Física", frentes: { "fisica": 5 } },
            { nome: "Matemática", frentes: { "matematica": 10 } },
          ],
        },
        // Dez de cada disciplina, sem exceção, verificado questão a questão no
        // caderno de 2026 (seção 2.6/3.6) — a estrutura mais limpa do
        // conjunto. Só o bloco de Português (10) não separa
        // gramática/interpretação/literatura. duracaoMin é o valor exato da
        // prova de Conhecimentos Gerais (4h) — aqui não há Redação misturada.
        santacasa: {
          nome: "Santa Casa",
          duracaoMin: 240,
          blocos: [
            { nome: "Língua Portuguesa e Literatura", frentes: { "interpretacao-texto": 4, "literatura": 4, "gramatica": 2 } },
            { nome: "Língua Inglesa", frentes: { "ingles": 10 } },
            { nome: "História", frentes: { "historia": 10 } },
            { nome: "Geografia", frentes: { "geografia": 10 } },
            { nome: "Biologia", frentes: { "biologia": 10 } },
            { nome: "Química", frentes: { "quimica": 10 } },
            { nome: "Física", frentes: { "fisica": 10 } },
            { nome: "Matemática", frentes: { "matematica": 10 } },
          ],
        },
        // Matriz ENEM por área (seção 2.7/3.7): os quatro totais por bloco são
        // do edital, a ordem do caderno também. Nenhum dos quatro blocos tem
        // sub-contagem oficial por frente — divididos por peso relativo
        // (Natureza sai igual entre bio/quím/fís; Humanas dá menos a
        // artes-cultura, que pesa 1 contra 1,5 das outras três).
        //
        // duracaoMin é a prova única inteira (4h), que também inclui a
        // Redação.
        pucsp: {
          nome: "PUC-SP",
          duracaoMin: 240,
          blocos: [
            { nome: "Matemática", frentes: { "matematica": 5 } },
            { nome: "Ciências da Natureza", frentes: { "biologia": 5, "quimica": 5, "fisica": 5 } },
            { nome: "Ciências Humanas", frentes: { "historia": 4, "geografia": 4, "filosofia-sociologia": 4, "artes-cultura": 3 } },
            { nome: "Linguagens", frentes: { "interpretacao-texto": 4, "literatura": 4, "gramatica": 3, "ingles": 4 } },
          ],
        },
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
        // Emprestadas de Direito, e a lista é a mesma. Ver o rótulo em
        // obrasUI: aqui elas NÃO são leitura obrigatória.
        { nome: "obras", dir: "../vestibular-direito/data/" },
        { nome: "obras-questoes", dir: "../vestibular-direito/data/" },
      ],
      // A aba existe, mas com outro nome e outra promessa. A prova de Artes e a
      // lista de leitura obrigatória são exclusivas da FGV Direito SP — o
      // edital não traz lista para a EESP, e o conteúdo programático dela troca
      // Artes por Ciências da Natureza (ver o estudo de anatomia da prova).
      //
      // Chamar isto de "obras obrigatórias" aqui seria mentira. Chamar de
      // repertório não é: são as mesmas obras que alimentam argumento de
      // redação e leitura crítica em qualquer prova, e a de Economia tem
      // discursiva. O aluno decide quanto tempo dar; o que ele não pode é
      // achar que a banca vai cobrar enredo.
      abas: ["hoje", "calendario", "simulados", "buscar", "cards", "redacao", "obras", "erros", "progresso", "perfil", "mais"],
      rotulosAbas: { obras: "Repertório cultural" },
      obrasUI: {
        titulo: "Repertório cultural",
        hint: "A FGV EESP não cobra lista de leitura: a prova de Artes e Questões Contemporâneas " +
              "é exclusiva do Direito, e o conteúdo programático da Economia troca Artes por " +
              "Ciências da Natureza. NADA aqui é obrigatório. É repertório — livro, filme, disco " +
              "e obra visual que rendem argumento na discursiva e reconhecimento na interpretação " +
              "de texto. Leia o que te interessar, na ordem que quiser.",
        subtitulo: "obras de repertório · nenhuma cobrada pelo edital",
        rodape: "nenhuma destas obras é cobrada pelo edital da EESP",
        rotuloAnalise: "Leitura crítica",
        complementaresTitulo: "Também no acervo",
        complementaresHint: "Mesma condição das de cima: repertório, não exigência.",
      },
      redacaoUI: {
        desc: "Texto <strong>dissertativo-argumentativo, em prosa</strong>. A proposta da <strong>FGV</strong> " +
              "é a mesma da trilha de Direito — mesmo caderno, mesmo dia —, com 20 a 30 linhas e título livre. " +
              "O <strong>Insper</strong> pede 10 a 30 linhas, apresenta dois temas para escolher um e exige que " +
              "a questão-tema seja copiada como título.",
        hint: "Aqui a redação pesa mais do que em qualquer outra trilha: <strong>20% da nota final</strong> na FGV " +
              "EESP (o dobro do que vale em Direito) e <strong>25% da média final</strong> no Insper, com corte " +
              "eliminatório nas duas. Nenhuma das duas exige proposta de intervenção — isso é regra do ENEM.",
      },
      // Ver a conta dos 3 slots no plano de Direito; Economia tem os mesmos 79
      // subtemas.
      //
      // Some daqui a divisão de Matemática em cinco frentes que esta trilha
      // fazia à mão. Ela existia porque o alocador era proporcional POR FRENTE:
      // com Matemática numa frente só, disputando com oito de Humanas, o
      // simulado de 60 dava 5 questões a uma matéria que vale 40% da nota. Agora
      // o alocador é por subtema, e os cinco assuntos de Matemática disputam
      // como cinco em qualquer trilha — sem precisar fingir que são frentes.
      plano: {
        totalDias: 90,
        subtemasPorDia: 3,
        exerciciosMin: 8,
        exerciciosMax: 10,
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

    // ---------- Engenharia ----------
    //
    // NO AR desde 2026-08-13. Testada headless (build-trilhas.js) e depois
    // com servidor local sem login: os 5 arquivos de dados carregam sem
    // erro, SUBTOPICS/QUESTION_BANKS batem com o build (44 subtemas) e
    // pickQuestions() devolve questão de verdade para os 4 subtemas novos.
    // NÃO passou pelo teste de clique real, logado, que achou o defeito de
    // Economia (comentário acima) — ninguém abriu esta trilha autenticado
    // ainda. Tirada de emConstrucao por pedido direto do dono do projeto,
    // não por eu ter validado esse último passo.
    //
    // SÓ 7 DAS 14 FRENTES do banco central: Matemática, Física, Química,
    // Gramática, Interpretação de Texto, Literatura e Inglês — o que cobre a
    // prova do ITA inteira (Física, Matemática, Química, Português e Inglês
    // valem 20% cada, sem matéria dominante). Humanas e Biologia ficaram de
    // fora: aparecem no banco da Mauá, mas sem o detalhe por matéria que
    // sustentaria teoria (gatilhos/pegadinhas) sem inventar — ver
    // banco-central/teoria.js, NOVAS.engenharia.
    //
    // SEM obras/redação/flashcards: esta trilha não tem esse conteúdo
    // escrito ainda, por isso essas abas nem entram em `abas` e os arquivos
    // correspondentes nem em `arquivos` — abrir uma aba sem dado por trás
    // seria pior que não ter a aba.
    //
    // SEM provasOficiais: eu não tinha uma URL verificada da página de
    // provas e gabaritos do ITA para colocar aqui, e chutar link errado é
    // pior que não ter o card. Fica para quem tiver a URL confirmada.
    engenharia: {
      id: "engenharia",
      nome: "Engenharia",
      prefixo: "eng_",
      subtitulo: "ITA",
      resumo: "Cinco provas de peso igual — Física, Matemática, Química, Português e Inglês " +
              "somam 20% cada — e a única trilha do banco que cobra números complexos, " +
              "polinômios e física moderna direto, no nível que o ITA pede todo ano.",
      logoAlt: MARCA_TXT,
      titulo: MARCA_HTML + " — Engenharia",
      marca: MARCA_HTML,
      bancas: ["ita"],
      dataDir: "../vestibular-engenharia/data/",
      // Flashcards entram: o vestibular-engenharia/data/flashcards.js já existe
      // e traz 579 cards, mas nem o arquivo era carregado nem a aba aparecia —
      // conteúdo pronto e inalcançável. A cobertura é parcial (só as 8 frentes
      // de Matemática, das 44 da trilha; Física, Química, Português e Inglês
      // ainda não migraram para o banco central), e é por isso que a lista
      // "Estudar por frente" passou a esconder frente sem card: 36 linhas
      // dizendo "0 cards" ensinariam que a aba está quebrada.
      arquivos: [
        "subtopics", "theory", "flashcards", "priority-weights", "video-topics", "bundle",
        // Mesma coisa que em Economia: emprestadas, e como REPERTÓRIO.
        { nome: "obras", dir: "../vestibular-direito/data/" },
        { nome: "obras-questoes", dir: "../vestibular-direito/data/" },
      ],
      // Redação segue de fora, e isso NÃO é esquecimento: não existe
      // redacoes.js para Engenharia, e aba sem dado promete e devolve tela
      // vazia. Obras entra, mas como repertório — o ITA não publica lista de
      // leitura fechada, e a trilha tem frente de literatura, que é história
      // literária e interpretação, coisa diferente de "a banca cobra estas 46".
      abas: ["hoje", "calendario", "simulados", "buscar", "cards", "obras", "erros", "progresso", "perfil", "mais"],
      rotulosAbas: { obras: "Repertório cultural" },
      obrasUI: {
        titulo: "Repertório cultural",
        hint: "O ITA não publica lista de leitura obrigatória. NADA aqui é cobrado pela banca. " +
              "É repertório — a prova de Português tem literatura e interpretação, e conhecer " +
              "estas obras ajuda a reconhecer referência, estilo e período. Leia o que te " +
              "interessar, sem meta.",
        subtitulo: "obras de repertório · nenhuma cobrada pelo edital",
        rodape: "nenhuma destas obras é cobrada pelo edital do ITA",
        rotuloAnalise: "Leitura crítica",
        complementaresTitulo: "Também no acervo",
        complementaresHint: "Mesma condição das de cima: repertório, não exigência.",
      },
      plano: {
        totalDias: 90,
        subtemasPorDia: 3,
        exerciciosMin: 8,
        exerciciosMax: 10,
        simuladoQtd: 45,
        simuladoMinPorFrente: 1,
        // Quarta semente distinta das outras três trilhas, mesmo motivo.
        seed: 20260404,
      },
      // Só 3 dos 5 blocos do caderno real (Física, Matemática, Química —
      // 12 questões cada no ITA 2024, extraídas em
      // vestibular-engenharia/data/questoes-reais-ita-STAGING.md). Português
      // e Inglês ficaram fora do "ensaio de prova" porque as 24 questões
      // reais desses blocos foram TODAS excluídas do banco por direito
      // autoral (baseadas em romance/peça e reportagem protegidos) — um
      // simulado "fiel ao ITA" com questões genéricas no lugar delas seria
      // menos honesto que um simulado menor mas real. duracaoMin é uma
      // ESTIMATIVA proporcional (36 de 60 questões reais, sobre um total de
      // prova de ~5h) — não é o tempo oficial dessas 36 isoladas, que a
      // banca não publica.
      simuladoOficial: {
        ita: {
          nome: "ITA",
          duracaoMin: 180,
          blocos: [
            { nome: "Física", frentes: { "fisica": 12 } },
            { nome: "Matemática", frentes: { "matematica": 12 } },
            { nome: "Química", frentes: { "quimica": 12 } },
          ],
        },
      },
    },
  };

  function ehValida(id) {
    return !!(id && Object.prototype.hasOwnProperty.call(window.VD_TRILHAS, id));
  }

  // ---------- A trilha que a URL diz ----------
  //
  // Desde 2026-08 cada trilha tem endereço próprio: /medicina/, /economia/…
  // Quem escreve window.VD_TRILHA_URL é a própria página, gerada por
  // build-paginas.js a partir de template.html — o app não adivinha a trilha
  // lendo location.pathname, porque aí passaria a depender de onde o site está
  // montado (raiz do domínio, servidor local, um eventual subcaminho).
  //
  // A landing da raiz não tem trilha: lá isto é null e vale o localStorage,
  // exatamente como antes de as pastas existirem.
  function daUrl() {
    return ehValida(window.VD_TRILHA_URL) ? window.VD_TRILHA_URL : null;
  }

  // A URL manda, e a gravação acontece AQUI, no carregamento — não dentro de
  // atual().
  //
  // O motivo é o app.js: ele calcula o prefixo do localStorage ("v2_med_") na
  // linha 16, quando é lido, e nunca mais. Se a URL só fosse consultada depois,
  // abrir /medicina/ num aparelho que estudava Direito montaria o app inteiro
  // sobre o espaço de Direito, e o progresso de uma trilha cairia dentro da
  // outra — a mesma classe de erro que o reload na troca de trilha evita.
  //
  // Isto NÃO carimba o horário no sync: VD_SYNC ainda não existe neste ponto do
  // carregamento. Quem reafirma a escolha depois do sync, para que ela vença a
  // mesclagem com a nuvem, é o auth.js.
  (function () {
    const id = daUrl();
    if (id && localStorage.getItem(LS_TRILHA) !== id) localStorage.setItem(LS_TRILHA, id);
  })();

  // O endereço de uma trilha, derivado de onde ESTA página está — e não fixo em
  // "/" + id. O app roda em mais de uma raiz (o domínio próprio e o servidor
  // local do serve-root.ps1), e um caminho absoluto acertaria só a primeira.
  function urlDa(id) {
    const pasta = location.pathname.replace(/[^/]*$/, "");   // .../medicina/ ou .../
    const atual = daUrl();
    const raiz = atual ? pasta.replace(new RegExp(atual + "/$"), "") : pasta;
    return raiz + id + "/";
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
    // Um item de `arquivos` é o NOME do arquivo, e ele é buscado no dataDir da
    // própria trilha. Mas pode ser também { nome, dir }, e aí a trilha toma o
    // arquivo emprestado de outra pasta — é o que Economia e Engenharia fazem
    // com obras.js: a lista de repertório é a mesma de Direito, e copiá-la
    // seria 871 KB duplicados duas vezes, que sairiam de sincronia na primeira
    // correção feita num dos lados.
    const nomeDe = function (item) { return typeof item === "string" ? item : item.nome; };
    const lista = apenas
      ? cfg.arquivos.filter(function (i) { return apenas.indexOf(nomeDe(i)) !== -1; })
      : cfg.arquivos;

    return new Promise(function (resolve, reject) {
      let restantes = lista.length;
      if (restantes === 0) return resolve(cfg);

      lista.forEach(function (item) {
        const nome = nomeDe(item);
        const dir = (typeof item === "object" && item.dir) || cfg.dataDir;
        const el = document.createElement("script");
        el.src = dir + nome + ".js?d=" + DATA_VERSION;
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

    // A trilha desta URL (null na landing da raiz) e o endereço de uma trilha.
    daUrl: daUrl,
    urlDa: urlDa,

    // Trocar de trilha é NAVEGAR, não recarregar.
    //
    // Até as pastas existirem isto era location.reload(), e o reload nunca foi
    // cosmético: o prefixo do localStorage e os dados da trilha são resolvidos
    // no carregamento da página, então seguir sem recarregar gravaria o
    // progresso da trilha nova no espaço da antiga. Ir para outro endereço
    // carrega a página do mesmo jeito e ainda deixa a URL certa na barra.
    ir: function (id) {
      if (!ehValida(id)) return false;
      location.assign(urlDa(id));
      return true;
    },

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
