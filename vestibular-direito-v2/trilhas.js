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
  const DATA_VERSION = 28;

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
      abas: ["hoje", "calendario", "simulados", "buscar", "cards", "redacao", "obras", "erros", "progresso"],
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
      abas: ["hoje", "calendario", "simulados", "buscar", "cards", "redacao", "obras", "erros", "progresso"],
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

    // A outra trilha — hoje sempre uma só, mas escrito para não quebrar se
    // aparecer uma terceira.
    outras: function () {
      const atual = this.atual();
      return Object.keys(window.VD_TRILHAS).filter(function (k) { return k !== atual; });
    },

    lista: function () {
      return Object.keys(window.VD_TRILHAS).map(function (k) { return window.VD_TRILHAS[k]; });
    },
  };
})();
