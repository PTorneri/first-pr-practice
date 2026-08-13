(function () {
  // O v1 e o v2 moram no MESMO domínio (ptorneri.github.io), e o localStorage
  // é compartilhado por domínio — não por pasta. Sem um prefixo próprio, o v2
  // escreveria por cima do progresso que o v1 mostra, e o v1 deixaria de ser
  // uma cópia estável pra voltar. Por isso toda chave do v2 vive em "v2_".
  // A primeira entrada copia o progresso do v1 uma única vez (ver sync.js),
  // então ninguém começa do zero — mas a partir daí os dois são independentes.
  //
  // Desde 2026-08 o prefixo tem uma SEGUNDA parte: a trilha. Direito grava em
  // "v2_dir_" e Medicina em "v2_med_". Sem isso, quem estudasse os dois cursos
  // teria um sobrescrevendo o progresso do outro — a mesma classe de problema
  // que o "v2_" resolveu entre as versões, um nível abaixo.
  //
  // Consequência prática: NENHUMA outra linha deste arquivo precisou mudar,
  // porque todas as chaves já derivavam de NS.
  const TRILHA = (window.VD_TRILHA && window.VD_TRILHA.atual()) || "direito";
  const TRILHA_CFG = (window.VD_TRILHAS && window.VD_TRILHAS[TRILHA]) || null;
  const NS = "v2_" + (TRILHA_CFG ? TRILHA_CFG.prefixo : "dir_");
  const LS_START = NS + "vd_startDate";
  const LS_ANSWERS = NS + "vd_answers"; // { "<subtopicId>::<questionId>": "a" } — última resposta, GLOBAL (usada pra stats de frente/Caderno de Erros, "vale a mais recente")
  const LS_DAY_ANSWERS = NS + "vd_dayAnswers"; // { "<day>::<subtopicId>::<questionId>": "a" } — resposta ESPECÍFICA daquela ocorrência do dia, corrige bug de bancos maiores fazendo a mesma questão reaparecer em dias diferentes
  const LS_DAY_STATE = NS + "vd_dayState"; // { "<day>": { answered: n, correct: n, total: n } }
  const LS_TOPIC_STATE = NS + "vd_topicState"; // { "<subtopicId>": { answered: n, correct: n } }
  const LS_DISSERT_STATUS = NS + "vd_dissertStatus"; // { "<day>": "done" | "skipped" }
  const LS_DISSERT_ANSWERS = NS + "vd_dissertAnswers"; // { "<day>::<questionId>": "texto do usuário" }
  const LS_DISSERT_CHECKLIST = NS + "vd_dissertChecklist"; // { "<day>::<questionId>::<pointIndex>": true }, autoavaliação dos pontos esperados
  const LS_REDACAO_ANSWERS = NS + "vd_redacaoAnswers"; // { "<redacaoId>": "texto do usuário" }, aba Redação (prova à parte, não é dissertativa)
  const LS_REDACAO_CHECKLIST = NS + "vd_redacaoChecklist"; // { "<redacaoId>::<pointIndex>": true }, autoavaliação pela grade oficial
  const LS_REDACAO_DONE = NS + "vd_redacaoDone"; // { "<redacaoId>": true }, propostas já treinadas
  const LS_DISSERT_IA = NS + "vd_dissertIA"; // { "<day>::<questionId>::<itemId>": {criterios,faixa,...} }, correção por IA
  const LS_REDACAO_IA = NS + "vd_redacaoIA"; // { "<redacaoId>": {criterios,faixa,...} }, correção por IA
  // Fora do namespace da trilha, ao lado de v2_trilha: a cota de correções é do
  // bolso, não do curso. Namespaceada, quem estuda Direito e Medicina no mesmo
  // login teria vinte por dia em vez de dez.
  const LS_IA_USAGE = "v2_vd_iaUsage"; // { "<isoDate>": n }, quantas correções por IA hoje
  const LS_CYCLE_WEIGHTS = NS + "vd_cycleWeights"; // { "<cycleIndex>": { "<subtopicId>": peso } }, travado após cada simulado
  const LS_SIMULADO_MODO = NS + "vd_simuladoModo"; // { "<dia>": "adaptativo" | "<id-da-banca>" }, modo do simulado daquele domingo — os ids de banca vêm de simuladoOficial na trilha ativa (ver trilhas.js)
  const LS_SCORE_HISTORY = NS + "vd_scoreHistory"; // { "<isoDate>": score 0..1 }, achado 5 (score projetado)
  const LS_TOPIC_LAST_ANSWERED = NS + "vd_topicLastAnswered"; // { "<subtopicId>": isoDate }, achado 6 (índice de prontidão)
  const LS_THEORY_SEEN = NS + "vd_theorySeen"; // { "<subtopicId>": true }, achado 1 (teoria por frente)
  const LS_FLASHCARD_STATE = NS + "vd_flashcardState"; // { "<subtopicId>::<questionId>": { interval, reps, dueDate } }, achado 2
  const LS_OBRAS_STUDIED = NS + "vd_obrasStudied"; // { "<obraId>": true }, achado 13 (obras obrigatórias)
  const LS_SYNC_CODE = NS + "vd_syncCode"; // resquício do sync por código do v1; no v2 quem sincroniza é a conta
  const LS_STUDY_DAYS = NS + "vd_studyDays"; // { "<isoDate>": true } — dias em que houve estudo; a ofensiva é derivada daqui (v2)

  const SYNCABLE_KEYS = [
    LS_START, LS_ANSWERS, LS_DAY_ANSWERS, LS_DAY_STATE, LS_TOPIC_STATE, LS_DISSERT_STATUS, LS_DISSERT_ANSWERS,
    LS_DISSERT_CHECKLIST, LS_CYCLE_WEIGHTS, LS_SCORE_HISTORY, LS_TOPIC_LAST_ANSWERED, LS_THEORY_SEEN,
    LS_FLASHCARD_STATE, LS_OBRAS_STUDIED, LS_STUDY_DAYS,
    // O modo do simulado precisa subir junto com as respostas. As respostas do
    // dia já sincronizam; se o modo não sincronizasse, escolher o caderno
    // oficial de 60 no celular e abrir o mesmo domingo no computador mostraria
    // o adaptativo de 45 — com as respostas das 60 já gravadas naquele dia. A
    // estratégia padrão ("entrada") serve: por dia, vence a escolha mais
    // recente, que é a que o usuário acabou de fazer.
    LS_SIMULADO_MODO,
    // A aba Redação ficou de fora do sync desde que ela existe, e isso não
    // aparecia porque nada mais dependia dela. Com a correção por IA aparece:
    // o parecer subiria pra nuvem e o texto corrigido não, então abrir no
    // celular mostraria uma correção detalhada de uma redação em branco.
    LS_REDACAO_ANSWERS, LS_REDACAO_CHECKLIST, LS_REDACAO_DONE,
    LS_DISSERT_IA, LS_REDACAO_IA,
  ];

  // Lista de sufixos (chave sem o prefixo de trilha). É o que a migração de
  // 2026-08 usa para renomear "v2_vd_answers" -> "v2_dir_vd_answers" sem ter
  // que repetir os nomes num segundo lugar e deixá-los saírem de sincronia.
  const BASE_KEYS = SYNCABLE_KEYS.map((k) => k.slice(NS.length));

  // sync.js precisa saber exatamente quais chaves sobem pra nuvem, e a
  // estratégia de mesclagem de cada uma quando dois aparelhos divergem.
  //
  // TRILHA entra em SYNCABLE porque a escolha do curso precisa viajar entre
  // aparelhos: quem escolheu Medicina no celular não pode ser perguntado de
  // novo ao abrir no computador. Ela é a única chave fora do namespace.
  // As chaves que valem para a CONTA inteira, e não para um curso: a trilha
  // escolhida e a cota diária de correções por IA. sync.js precisa da lista
  // porque ele descarta, por segurança, tudo que não pertença ao namespace
  // ativo — sem estar aqui, a chave seria escrita no aparelho e nunca subiria.
  const CHAVES_GLOBAIS = [
    window.VD_TRILHA ? window.VD_TRILHA.CHAVE : "v2_trilha",
    LS_IA_USAGE,
  ];

  window.VD_KEYS = {
    NS: NS,
    SYNCABLE: SYNCABLE_KEYS.concat(CHAVES_GLOBAIS),
    START: LS_START,
    TRILHA: window.VD_TRILHA ? window.VD_TRILHA.CHAVE : "v2_trilha",
    IA_USAGE: LS_IA_USAGE,
    GLOBAIS: CHAVES_GLOBAIS,
    BASES: BASE_KEYS,
  };

  const DISSERT_WEEK_TARGET = 4;
  const DISSERT_WEEK_SIZE = 7;

  let plan = null;
  let currentDay = 1;
  const expandedDissertDays = new Set(); // dias com o painel de dissertativas aberto nesta sessão
  const dissertAreaFilter = {}; // "<day>" -> "Humanas"|"Linguagens"|"Artes"|undefined (todas)
  let simuladosDetailIndex = null; // null = mostra a lista de simulados; N = mostra o detalhe do simulado N
  let progressoSosId = null; // null = mostra a lista normal de progresso; subtopicId = mostra a sessão SOS (achado 3)
  let flashcardSession = null; // { queue, index, flipped } ou null = tela inicial da aba Cards (achado 2)
  let obrasFilterCategoria = null; // null = todas; ou "Literatura"/"Artes visuais"/"Cinema"/"Música"/"Ensaio" (achado 13)
  const expandedExtras = new Set(); // "<day>::<subtopicId>" com os extras já revelados nesta sessão
  const extraPullCounts = {}; // "<day>::<subtopicId>" -> quantas questões extras já foram puxadas além do plano
  const ESSENTIAL_QUESTIONS_PER_LESSON = 12;
  const MINUTES_PER_QUESTION_ESTIMATE = 1.8;

  // ---------- Persistence helpers ----------
  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    // Avisa o motor de sync que essa chave mudou. Ele agrupa as mudanças e
    // sobe pra nuvem alguns segundos depois, em vez de a cada clique.
    if (window.VD_SYNC) window.VD_SYNC.markDirty(key);
  }

  function getAnswers() { return loadJSON(LS_ANSWERS, {}); }
  function getDayAnswers() { return loadJSON(LS_DAY_ANSWERS, {}); }
  function getDayState() { return loadJSON(LS_DAY_STATE, {}); }
  function getTopicState() { return loadJSON(LS_TOPIC_STATE, {}); }
  function getDissertStatus() { return loadJSON(LS_DISSERT_STATUS, {}); }
  function getDissertAnswers() { return loadJSON(LS_DISSERT_ANSWERS, {}); }
  function getDissertChecklist() { return loadJSON(LS_DISSERT_CHECKLIST, {}); }

  function answerKey(subtopicId, questionId) { return subtopicId + "::" + questionId; }
  // Chave da resposta ESPECÍFICA daquela ocorrência do dia — corrige o bug de
  // uma mesma questão (banco maior, reaparece em dias diferentes) aparecer
  // pré-respondida em todo dia em que cai, mesmo tendo sido respondida só
  // uma vez. `vd_answers` (answerKey) continua guardando a última resposta
  // GLOBAL, usada pra stats de frente/Caderno de Erros; `vd_dayAnswers`
  // (dayAnswerKey) guarda por ocorrência, usada pro que aparece marcado na
  // tela e pro contador de exercícios daquele dia específico.
  function dayAnswerKey(day, subtopicId, questionId) { return day + "::" + subtopicId + "::" + questionId; }
  function dissertKey(day, questionId) { return day + "::" + questionId; }

  // Toda discursiva de Humanas da FGV vem em dois comandos: um enumerativo, quase
  // sempre com número explícito ("dois episódios", "duas razões", "duas técnicas"),
  // e um explicativo. Isso é uma rubrica exposta -- a resposta é pontuada por itens
  // contáveis, e escrever bem sem entregar o número pedido perde ponto.
  //
  // O banco nasceu com um comando só por questão. Este normalizador aceita as duas
  // formas ao mesmo tempo, para que dissertativas.js migre questão a questão em vez
  // de tudo de uma vez.
  function dissertItens(q) {
    if (q.itens && q.itens.length) return q.itens;
    return [{ id: "a", comando: q.comando, pontosEsperados: q.pontosEsperados }];
  }

  // A dissertativa "de exatas" (vestibular-economia/dissertativa-exatas.js,
  // hoje só a Matemática de Economia) não é um comando/checklist — é
  // resolução + resposta final + faixa de acerto, porque a grade da FGV EESP
  // pontua por 0/25/50/75/100 e resposta sem conta vale pouco. As duas
  // famílias de questão coexistem no MESMO pool (dissertPool, abaixo); o que
  // as distingue é o formato do item: `pontosEsperados` (checklist) contra
  // `faixas` (exatas). Checar pelo primeiro item basta — uma questão não
  // mistura os dois formatos entre seus próprios itens.
  function dissertEhExatas(q) {
    const itens = q.itens;
    return !!(itens && itens.length && itens[0].faixas);
  }

  // O pool inteiro de dissertativas desta trilha, dos dois formatos juntos.
  // window.DISSERTATIVAS (checklist, Humanas/Linguagens/Artes/Natureza) só
  // existe em Direito e Medicina; window.DISSERTATIVAS_EXATAS (resolução por
  // faixa) só existe em Economia — nenhuma trilha define as duas hoje, mas a
  // concatenação não presume isso, e continua certa no dia em que definirem.
  function dissertPool() {
    return (window.DISSERTATIVAS || []).concat(window.DISSERTATIVAS_EXATAS || []);
  }

  // O item 'a' fica com a chave LEGADA, sem sufixo: quem já respondeu uma questão
  // antes da migração continua vendo sua resposta depois dela. Só os itens 'b' em
  // diante ganham sufixo. Como o sufixo do checklist é numérico ("::0", "::1") e o
  // do item é uma letra, as duas famílias de chave nunca colidem.
  function dissertItemKey(day, questionId, itemId) {
    const base = dissertKey(day, questionId);
    return itemId === "a" ? base : base + "::" + itemId;
  }

  // ---------- Dissertativas (Humanas/Linguagens/Artes, estilo discursiva FGV) ----------
  function weekNumberForDay(day) { return Math.ceil(day / DISSERT_WEEK_SIZE); }

  function daysInWeek(week) {
    const start = (week - 1) * DISSERT_WEEK_SIZE + 1;
    const end = Math.min(week * DISSERT_WEEK_SIZE, 90);
    const days = [];
    for (let d = start; d <= end; d++) days.push(d);
    return days;
  }

  function countDoneInWeek(week) {
    const status = getDissertStatus();
    return daysInWeek(week).filter((d) => status[d] === "done").length;
  }

  // Escolhe 1 ou 2 questões dissertativas para o dia, de forma determinística
  // (mesma lógica de janela circular usada nas objetivas, reaproveitando o
  // mulberry32/seededShuffle definidos em schedule.js). `areaFilter`
  // (achado 12) restringe o sorteio a uma matéria específica, quando o
  // usuário escolhe "trocar matéria" no card do dia.
  function pickDissertQuestions(day, areaFilter) {
    const fullPool = dissertPool();
    const pool = areaFilter ? fullPool.filter((q) => q.area === areaFilter) : fullPool;
    if (pool.length === 0) return [];
    const rng = mulberry32(day * 733 + 17);
    const count = Math.min(pool.length, rng() < 0.5 ? 1 : 2);
    const offset = ((day - 1) * count) % pool.length;
    const circular = [];
    for (let i = 0; i < pool.length; i++) circular.push(pool[(offset + i) % pool.length]);
    return circular.slice(0, count);
  }

  function isDayExerciseComplete(day) {
    const state = getDayState()[day];
    return !!state && state.total > 0 && state.answered >= state.total;
  }

  // ---------- Agendamento adaptativo (pesos por ciclo a partir do estudo + simulados) ----------

  // Erros e total de questões por frente no simulado indicado (dados crus,
  // reaproveitados tanto pelo cálculo de peso do próximo ciclo quanto pelo
  // resumo "com base nos seus erros..." mostrado no próprio simulado).
  // Usa a resposta ESPECÍFICA daquele dia de simulado (vd_dayAnswers), não a
  // global — senão a mesma questão reaparecendo em outro simulado/dia (bancos
  // maiores) contaminaria o resultado deste simulado com uma resposta dada
  // em outra ocasião (mesmo bug relatado pelo usuário, só que na aba
  // Simulados em vez da aba Hoje).
  function computeSimuladoErrorStats(simuladoVisitIndex, day) {
    const items = pickSimuladoQuestions(simuladoVisitIndex);
    const dayAnswers = getDayAnswers();
    const errors = {}, totals = {};
    window.SUBTOPICS.forEach((s) => { errors[s.id] = 0; totals[s.id] = 0; });
    items.forEach((item) => {
      totals[item.subtopicId]++;
      const dKey = dayAnswerKey(day, item.subtopicId, item.question.id);
      const chosen = dayAnswers[dKey];
      if (chosen && chosen !== item.question.resposta) errors[item.subtopicId]++;
    });
    return { errors, totals };
  }

  // Peso do ciclo seguinte a um simulado: peso-base do estudo
  // (window.PRIORITY_WEIGHTS) multiplicado por um fator de erro (1 a 4)
  // baseado na TAXA de erro daquela frente no simulado (erros ÷ total da
  // frente naquele simulado, não o número bruto) — como o simulado agora
  // distribui questões por peso (não mais fixo em 3 por frente), usar a taxa
  // em vez do valor bruto evita que uma frente de prioridade máxima (que
  // ganha mais questões, logo mais chance de erros em número absoluto)
  // domine o ciclo seguinte de forma desproporcional.
  function computeCycleWeightsFromSimulado(simuladoVisitIndex, day) {
    const { errors, totals } = computeSimuladoErrorStats(simuladoVisitIndex, day);
    const base = window.PRIORITY_WEIGHTS || {};
    const weights = {};
    window.SUBTOPICS.forEach((s) => {
      const baseWeight = base[s.id] || 1;
      const errorRate = totals[s.id] > 0 ? errors[s.id] / totals[s.id] : 0; // 0..1
      const errorMultiplier = 1 + errorRate * 3; // 1..4
      weights[s.id] = baseWeight * errorMultiplier;
    });
    return weights;
  }

  // Pesos de um ciclo (a partir do erro do simulado anterior) só são
  // calculados — e então travados para sempre — na primeira vez em que o
  // simulado correspondente estiver 100% respondido. Antes disso, e sempre
  // no ciclo 0 (antes de qualquer simulado), usa window.PRIORITY_WEIGHTS
  // puro — a priorização do estudo vale desde o primeiro dia, não só depois
  // do primeiro simulado. Travar evita que editar respostas de um simulado
  // antigo reembaralhe uma semana que o usuário já começou a estudar.
  function getCycleWeights(cycleIndex, simuladoDay) {
    if (cycleIndex <= 0) return window.PRIORITY_WEIGHTS || null;
    const cache = loadJSON(LS_CYCLE_WEIGHTS, {});
    if (cache[cycleIndex]) return cache[cycleIndex];
    if (simuladoDay && isDayExerciseComplete(simuladoDay)) {
      const weights = computeCycleWeightsFromSimulado(cycleIndex - 1, simuladoDay);
      cache[cycleIndex] = weights;
      saveJSON(LS_CYCLE_WEIGHTS, cache);
      return weights;
    }
    return window.PRIORITY_WEIGHTS || null;
  }

  function buildCycleWeightsOverride(startISO) {
    const simuladoDays = listSimuladoDays(startISO);
    const override = { 0: window.PRIORITY_WEIGHTS || null };
    simuladoDays.forEach((simDay, idx) => {
      const cycleIndex = idx + 1;
      override[cycleIndex] = getCycleWeights(cycleIndex, simDay);
    });
    return override;
  }

  // Recalcula o plano com os pesos mais atuais. Barato (90 dias, 15 temas) e
  // idempotente — seguro de chamar sempre que a tela for (re)desenhada.
  function rebuildPlan() {
    const start = localStorage.getItem(LS_START) || todayISO();
    const override = buildCycleWeightsOverride(start);
    plan = buildSchedule(start, override);
  }

  // ---------- Date helpers ----------
  function todayISO() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }
  function addDays(iso, n) {
    const d = new Date(iso + "T00:00:00");
    d.setDate(d.getDate() + n);
    return d;
  }
  function formatDate(d) {
    return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
  }

  function currentDayFromStart() {
    const start = localStorage.getItem(LS_START);
    if (!start) return 1;
    const diffMs = new Date(todayISO() + "T00:00:00") - new Date(start + "T00:00:00");
    const diffDays = Math.floor(diffMs / 86400000) + 1;
    return Math.min(Math.max(diffDays, 1), 90);
  }

  // ---------- Onboarding ----------
  function initOnboarding() {
    const start = localStorage.getItem(LS_START);
    if (start) {
      document.getElementById("btn-resume").hidden = false;
    }
    document.getElementById("btn-start").addEventListener("click", () => {
      if (!localStorage.getItem(LS_START)) {
        localStorage.setItem(LS_START, todayISO());
        if (window.VD_SYNC) window.VD_SYNC.markDirty(LS_START);
      }
      enterApp();
    });
    document.getElementById("btn-resume").addEventListener("click", enterApp);
  }

  function enterApp() {
    document.getElementById("view-onboarding").hidden = true;
    document.getElementById("view-main").hidden = false;
    rebuildPlan();
    currentDay = currentDayFromStart();
    renderDay(currentDay);
    renderCalendar();
    renderProgress();
    renderStreak();
    // O cabeçalho e os contadores da lateral só existem depois que o app
    // abre: é aqui que eles ganham o primeiro valor.
    atualizarCabecalho("hoje");
    atualizarBadges();
  }

  // ---------- Trilha na interface ----------

  // Tudo o que era texto de Direito cravado no HTML passa por aqui. É chamado
  // uma vez, no boot, antes de qualquer render — se rodasse depois, a pessoa
  // veria "— Direito" piscar numa trilha de Medicina.
  function aplicarTrilhaNaUI() {
    const cfg = TRILHA_CFG;
    if (!cfg) return;

    // document.title não aceita markup: aqui vai a forma de texto da marca.
    document.title = window.VD_MARCA.texto + " — " + cfg.nome + " · Plano de 90 dias";

    // A marca deixou de existir como TEXTO na interface do app: no redesenho
    // ela é o logotipo no topo da barra lateral (símbolo + wordmark em PNG).
    // O cfg.marca segue valendo no título da janela, logo acima.

    // Só o onboarding leva o título da trilha ("sagax — Direito"). O login
    // agora é um painel dividido cujo h1 é o verbo da tela ("Entrar"), e a
    // marca aparece nele como logotipo, não como texto.
    document.querySelectorAll("#view-onboarding h1").forEach((h) => {
      h.innerHTML = cfg.titulo;
    });
    document.querySelectorAll(".onboarding-logo").forEach((img) => {
      if (img.alt) img.alt = cfg.logoAlt;
    });

    const subOnb = document.querySelector("#view-onboarding .subtitle");
    if (subOnb) {
      subOnb.innerHTML = "Plano de estudos de " + cfg.plano.totalDias +
        " dias baseado no formato real das provas de <strong>" + cfg.subtitulo + "</strong>. " +
        cfg.resumo;
    }

    // Abas que não existem nesta trilha somem — botão e painel. Em Medicina é o
    // caso de "Obras": obras obrigatórias são um instrumento da FGV.
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      const usa = cfg.abas.indexOf(btn.dataset.tab) !== -1;
      btn.hidden = !usa;
      const painel = document.getElementById("tab-" + btn.dataset.tab);
      if (painel && !usa) painel.classList.remove("active");
    });

    const hint = document.getElementById("progresso-hint");
    if (hint) {
      const materias = new Set((window.SUBTOPICS || []).map((s) => s.frenteId)).size;
      hint.textContent = "Acompanhe seu desempenho nos " + (window.SUBTOPICS || []).length +
        " temas das " + materias + " matérias cobradas pelas provas.";
    }

    const links = document.getElementById("provas-oficiais-links");
    if (links) {
      links.innerHTML = "";
      (cfg.provasOficiais || []).forEach((p) => {
        const a = document.createElement("a");
        a.className = "btn-link";
        a.target = "_blank";
        a.rel = "noopener";
        a.href = p.url;
        a.textContent = "▶ Provas e gabaritos oficiais — " + p.nome;
        links.appendChild(a);
      });
    }
  }

  // ---------- Troca de trilha ----------

  function initTrocarTrilha() {
    const container = document.getElementById("trocar-trilha-container");
    if (!container || !window.VD_TRILHA) return;

    const outras = window.VD_TRILHA.lista().filter((t) => t.id !== TRILHA);
    if (outras.length === 0) return;

    // "Trilha ativa" na coluna de apoio do perfil: primeiro o que está valendo
    // agora, depois a saída. Não é destrutivo, então não usa o vermelho.
    const card = document.createElement("div");
    card.className = "perfil-box";
    card.innerHTML =
      '<div class="perfil-box-titulo">Trilha ativa</div>' +
      '<div class="perfil-box-valor">' + escapeHtml(TRILHA_CFG.nome) + "</div>" +
      '<div class="perfil-box-nota">Seu progresso em cada trilha fica guardado em separado — trocar ' +
      "não apaga nada, e voltar devolve o plano no dia em que você parou.</div>";

    outras.forEach((t) => {
      const btn = document.createElement("button");
      btn.className = "btn btn-secondary";
      btn.textContent = "Ir para " + t.nome;
      btn.addEventListener("click", async () => {
        const ok = confirm(
          "Você vai para o plano de " + t.nome + ".\n\n" +
          "Seu progresso em " + TRILHA_CFG.nome + " fica guardado — é só voltar " +
          "para encontrá-lo no mesmo dia em que parou."
        );
        if (!ok) return;

        btn.disabled = true;
        btn.textContent = "Trocando…";
        window.VD_TRILHA.definir(t.id);
        // Sobe antes de recarregar: se a pessoa fechar o app agora, a escolha
        // já está na conta.
        try {
          if (window.VD_SYNC) await window.VD_SYNC.pushNow();
        } catch (e) {
          /* o boot seguinte tenta de novo pelo caminho normal */
        }
        // O reload é obrigatório, não cosmético: o prefixo do localStorage e os
        // dados da trilha são resolvidos no carregamento da página. Seguir sem
        // recarregar gravaria o progresso da trilha nova no espaço da antiga.
        location.reload();
      });
      card.appendChild(btn);
    });

    container.appendChild(card);
  }

  // ---------- Tabs ----------

  // Cada aba diz, no cabeçalho da página, de que assunto ela é. O subtítulo
  // não é decoração: é o número que dá escala ao que está embaixo (quantos
  // cards venceram, quantas questões esperam revisão, em que dia do plano
  // você está). Antes essa informação estava espalhada dentro de cada painel,
  // em formatos diferentes.
  const TITULOS_ABA = {
    hoje: () => ({ titulo: "Hoje", subtitulo: subtituloDoDia() }),
    calendario: () => ({
      titulo: "Calendário",
      // addDays devolve um Date (não uma string ISO), que é o que formatDate
      // espera — daí o addDays(start, 0) em vez de passar a string direto.
      subtitulo: "90 dias · começou em " + formatDate(addDays(localStorage.getItem(LS_START) || todayISO(), 0)),
    }),
    simulados: () => ({ titulo: "Simulados", subtitulo: "Todo domingo · simulado nos dias 7, 14, 21…" }),
    buscar: () => ({ titulo: "Buscar questões", subtitulo: subtituloBusca() }),
    cards: () => {
      const n = contarCardsVencidos();
      return {
        titulo: "Flashcards",
        subtitulo: (n === 1 ? "1 card vencido hoje" : n + " cards vencidos hoje") + " · repetição espaçada",
      };
    },
    redacao: () => ({ titulo: "Redação", subtitulo: subtituloRedacao() }),
    obras: () => ({ titulo: "Obras obrigatórias", subtitulo: subtituloObras() }),
    erros: () => {
      const n = contarErrosPendentes();
      return {
        titulo: "Caderno de Erros",
        subtitulo: n === 1 ? "1 questão esperando revisão" : n + " questões esperando revisão",
      };
    },
    // Lê a config VIVA, e não o TRILHA_CFG capturado no carregamento do
    // módulo: quem troca de trilha passa por um reload, mas depender disso
    // faria o subtítulo mentir em qualquer caminho que não recarregue.
    progresso: () => ({
      titulo: "Meu progresso",
      subtitulo: "Dia " + currentDayFromStart() + " de 90 · trilha " +
        ((window.VD_TRILHA && window.VD_TRILHA.config() || TRILHA_CFG).nome),
    }),
    perfil: () => ({ titulo: "Perfil e conta", subtitulo: "Conta Google · sincronizado" }),
    mais: () => ({ titulo: "Mais", subtitulo: "" }),
  };

  // ---------- Celular: quais telas são "empurradas" ----------
  //
  // A barra inferior alcança cinco destinos. As outras cinco abas são abertas de
  // dentro de "Mais" e, no celular, comportam-se como tela empurrada: a barra
  // sai da frente e o cabeçalho ganha a seta de voltar. Esta lista é a única
  // fonte dessa distinção — o CSS a recebe pela classe .is-empurrada em
  // #view-main, em vez de repetir os nomes das abas em seletor.
  const ABAS_EMPURRADAS = ["buscar", "redacao", "obras", "erros", "progresso", "perfil"];

  function subtituloDoDia() {
    const start = localStorage.getItem(LS_START) || todayISO();
    return "Dia " + currentDay + " de 90 · " + formatDate(addDays(start, currentDay - 1));
  }

  function subtituloBusca() {
    let total = 0;
    Object.keys(window.QUESTION_BANKS || {}).forEach((k) => {
      total += (window.QUESTION_BANKS[k] || []).length;
    });
    return total > 0 ? total.toLocaleString("pt-BR") + " questões nesta trilha" : "";
  }

  function subtituloRedacao() {
    const n = (window.REDACOES || []).length;
    return n ? n + " propostas · grade oficial das bancas" : "Grade oficial das bancas";
  }

  function subtituloObras() {
    const n = (window.OBRAS || []).length;
    return n ? n + " obras do edital" : "Lista do edital";
  }

  function contarCardsVencidos() {
    try {
      const st = getFlashcardState();
      return buildFlashcardPool().filter((c) => flashcardStatusFor(c.key, st) === "vencido").length;
    } catch (e) { return 0; }
  }

  function contarErrosPendentes() {
    try {
      return computeWrongQuestions().reduce((soma, g) => soma + g.questions.length, 0);
    } catch (e) { return 0; }
  }

  function atualizarCabecalho(tab) {
    const fn = TITULOS_ABA[tab];
    if (!fn) return;
    let dados;
    // Um subtítulo é sempre derivado do estado (contagens, datas). Se algum
    // deles falhar, a aba ainda tem que abrir — o título sozinho basta.
    try { dados = fn(); } catch (e) { dados = { titulo: tab, subtitulo: "" }; }
    const t = document.getElementById("page-title");
    const s = document.getElementById("page-subtitle");
    if (t) t.textContent = dados.titulo;
    if (s) s.textContent = dados.subtitulo || "";
    // A navegação de dia e o selo de fase só fazem sentido na aba Hoje.
    const nav = document.getElementById("day-nav");
    if (nav) nav.hidden = tab !== "hoje";
    const fase = document.getElementById("phase-label");
    if (fase) fase.textContent = tab === "hoje" ? phaseLabelForDay(currentDay) : "";
    // A seta de voltar existe só nas telas que a barra inferior não alcança. No
    // desktop ela é escondida pelo CSS de qualquer jeito — o hidden aqui é para
    // que ela não fique no caminho do foco por teclado nas outras abas.
    const voltar = document.getElementById("btn-voltar-mobile");
    if (voltar) voltar.hidden = ABAS_EMPURRADAS.indexOf(tab) === -1;
  }

  // Contadores da barra lateral. São o que substitui o "tudo com o mesmo peso"
  // da fila de abas antiga: sem abrir nada, dá pra ver que 18 cards venceram e
  // que 23 questões esperam revisão.
  function atualizarBadges() {
    const badges = {
      hoje: () => {
        if (!plan) return "";
        const tarefas = computeDayTasks(currentDay, getDayContent(plan, currentDay));
        const faltam = tarefas.filter((t) => !t.done).length;
        return faltam > 0 ? String(faltam) : "";
      },
      simulados: () => "dom",
      cards: () => { const n = contarCardsVencidos(); return n > 0 ? String(n) : ""; },
      erros: () => { const n = contarErrosPendentes(); return n > 0 ? String(n) : ""; },
    };
    document.querySelectorAll(".nav-badge").forEach((el) => {
      const fn = badges[el.dataset.badge];
      let valor = "";
      try { valor = fn ? fn() : ""; } catch (e) { valor = ""; }
      el.textContent = valor;
    });
  }
  // O app.js é um IIFE; o auth.js e o sync.js precisam poder pedir uma
  // atualização dos contadores depois de mexer no progresso.
  window.VD_REFRESH_BADGES = atualizarBadges;

  function initTabs() {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        // Cada aba existe duas vezes como botão (barra lateral e barra inferior).
        // O ".active" é aplicado ao par inteiro, por data-tab, e não só ao botão
        // clicado — senão a barra inferior ficaria marcando a aba anterior quando
        // a troca partisse de um atalho da lateral, ou de um .click() do código.
        document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
        document.querySelectorAll('.tab-btn[data-tab="' + btn.dataset.tab + '"]')
          .forEach((b) => b.classList.add("active"));
        document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
        // A marca que o CSS do celular lê para tirar a barra inferior da frente
        // nas telas empurradas. A lista mora só aqui, em ABAS_EMPURRADAS — o CSS
        // não repete os nomes das abas.
        const main = document.getElementById("view-main");
        if (main) {
          main.classList.toggle("is-empurrada", ABAS_EMPURRADAS.indexOf(btn.dataset.tab) !== -1);
        }
        if (btn.dataset.tab === "mais") renderMaisTab();
        if (btn.dataset.tab === "calendario") renderCalendar();
        if (btn.dataset.tab === "progresso") renderProgress();
        if (btn.dataset.tab === "simulados") renderSimuladosTab();
        if (btn.dataset.tab === "cards") renderCardsTab();
        if (btn.dataset.tab === "redacao") renderRedacaoTab();
        if (btn.dataset.tab === "obras") renderObrasTab();
        if (btn.dataset.tab === "erros") renderErrosTab();
        if (btn.dataset.tab === "buscar") renderBuscarTab();
        if (btn.dataset.tab === "perfil") renderPerfilTab();
        // Voltar para Hoje: as questões continuam como estavam, mas o painel
        // curto do topo precisa refletir o que mudou nas outras abas.
        if (btn.dataset.tab === "hoje") { atualizarMetricas(); updateDayChecklist(currentDay); }
        atualizarCabecalho(btn.dataset.tab);
        atualizarBadges();
        // Trocar de aba com a página rolada deixaria a nova aba começando no
        // meio. O cabeçalho é sticky, então o topo é sempre o título certo.
        window.scrollTo(0, 0);
      });
    });

    // A seta do cabeçalho volta sempre para "Mais": é de lá que estas telas são
    // abertas no celular, e é o único destino que não depende de lembrar por
    // onde a pessoa entrou.
    const voltar = document.getElementById("btn-voltar-mobile");
    if (voltar) {
      voltar.addEventListener("click", () => {
        irParaAba("mais");
      });
    }
  }

  // Trocar de aba de dentro do código. O clique é no botão da barra lateral
  // (querySelector devolve o primeiro do par), e não uma reimplementação da
  // troca: assim renderização, cabeçalho, contadores e rolagem passam pelo mesmo
  // caminho de sempre.
  function irParaAba(tab) {
    const btn = document.querySelector('.tab-btn[data-tab="' + tab + '"]');
    if (btn) btn.click();
  }

  // ---------- Tela "Mais" (celular) ----------
  //
  // Duas listas e a identidade em cima. Nada aqui reimplementa uma função: as
  // linhas de "Estudo" abrem a aba correspondente, e as de "Conta" levam à aba
  // Perfil, onde os controles de verdade vivem (trocar de trilha tem confirmação,
  // a data de início tem seletor). "Sair da conta" é a exceção: aciona o botão
  // que já existe lá, porque é ação de um toque e não tem o que ajustar.
  function renderMaisTab() {
    const container = document.getElementById("mais-content");
    if (!container) return;
    container.innerHTML = "";

    const cfg = (window.VD_TRILHA && window.VD_TRILHA.config()) || TRILHA_CFG;
    const abasDaTrilha = cfg.abas || [];
    const user = (window.VD_AUTH && window.VD_AUTH.user) || null;

    // ── Identidade ──
    const nome = user && user.displayName ? user.displayName : "Minha conta";
    // Sem sessão o progresso existe só no localStorage deste navegador, e a linha
    // não pode prometer nuvem — é a diferença que a tela de login vende.
    const sincronia = user ? "salvo na nuvem" : "salvo neste aparelho";
    const bancas = cfg.bancas || [];
    const quaisBancas = bancas.length === 1
      ? bancas[0].toUpperCase()
      : (bancas.length > 1 ? bancas.length + " bancas" : "plano de 90 dias");
    const identidade = document.createElement("button");
    identidade.type = "button";
    identidade.className = "mais-identidade";
    identidade.innerHTML =
      (user && user.photoURL
        ? '<img class="mais-avatar" src="' + escapeHtml(user.photoURL) + '" alt="" referrerpolicy="no-referrer">'
        : '<span class="mais-avatar mais-avatar-inicial">' + escapeHtml(nome.trim().charAt(0).toUpperCase() || "?") + "</span>") +
      '<span class="mais-identidade-textos">' +
        '<span class="mais-identidade-nome">' + escapeHtml(nome) + "</span>" +
        '<span class="mais-identidade-meta">' + escapeHtml(cfg.nome) + " · " +
          escapeHtml(quaisBancas) + " · " + sincronia + "</span>" +
      "</span>" +
      '<svg class="ico mais-caret" aria-hidden="true"><use href="#i-caret-right"></use></svg>';
    identidade.addEventListener("click", () => irParaAba("perfil"));
    container.appendChild(identidade);

    // ── Estudo: as cinco abas que saíram da barra inferior ──
    const estudo = [
      { tab: "buscar", rotulo: "Buscar", icone: "i-search" },
      { tab: "redacao", rotulo: "Redação", icone: "i-pen" },
      { tab: "obras", rotulo: "Obras", icone: "i-books" },
      { tab: "erros", rotulo: "Caderno de Erros", icone: "i-notebook", contagem: contarErrosPendentes },
      { tab: "progresso", rotulo: "Meu progresso", icone: "i-chart" },
    ].filter((item) => abasDaTrilha.indexOf(item.tab) !== -1);

    container.appendChild(grupoMais("Estudo", estudo.map((item) => {
      let contagem = 0;
      try { contagem = item.contagem ? item.contagem() : 0; } catch (e) { contagem = 0; }
      return {
        rotulo: item.rotulo,
        icone: item.icone,
        selo: contagem > 0 ? String(contagem) : "",
        aoClicar: () => irParaAba(item.tab),
      };
    })));

    // ── Conta ──
    const outrasTrilhas = window.VD_TRILHA
      ? window.VD_TRILHA.lista().filter((t) => t.id !== TRILHA)
      : [];
    const linhasConta = [];
    if (outrasTrilhas.length > 0) {
      linhasConta.push({
        rotulo: "Trocar de trilha",
        icone: "i-swap",
        valor: cfg.nome,
        neutro: true,
        aoClicar: () => irParaAba("perfil"),
      });
    }
    linhasConta.push({
      rotulo: "Corrigir a data de início",
      icone: "i-calendar-check",
      neutro: true,
      aoClicar: () => irParaAba("perfil"),
    });
    linhasConta.push({
      rotulo: "Sair da conta",
      icone: "i-signout",
      neutro: true,
      semCaret: true,
      aoClicar: () => {
        const btn = document.getElementById("btn-logout");
        if (btn) btn.click();
        else irParaAba("perfil");
      },
    });
    container.appendChild(grupoMais("Conta", linhasConta));
  }

  function grupoMais(titulo, linhas) {
    const bloco = document.createElement("div");
    bloco.className = "mais-grupo";
    const rotulo = document.createElement("div");
    rotulo.className = "mais-grupo-titulo";
    rotulo.textContent = titulo;
    bloco.appendChild(rotulo);

    const lista = document.createElement("div");
    lista.className = "mais-lista";
    linhas.forEach((linha) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "mais-row";
      row.innerHTML =
        '<svg class="ico mais-row-ico' + (linha.neutro ? " mais-row-ico-neutro" : "") + '" aria-hidden="true">' +
          '<use href="#' + linha.icone + '"></use></svg>' +
        '<span class="mais-row-rotulo">' + escapeHtml(linha.rotulo) + "</span>" +
        (linha.selo ? '<span class="mais-row-selo">' + escapeHtml(linha.selo) + "</span>" : "") +
        (linha.valor ? '<span class="mais-row-valor">' + escapeHtml(linha.valor) + "</span>" : "") +
        (linha.semCaret ? "" : '<svg class="ico mais-caret" aria-hidden="true"><use href="#i-caret-right"></use></svg>');
      row.addEventListener("click", linha.aoClicar);
      lista.appendChild(row);
    });
    bloco.appendChild(lista);
    return bloco;
  }

  // ---------- Day view ----------
  function initDayNav() {
    document.getElementById("btn-prev-day").addEventListener("click", () => {
      if (currentDay > 1) { currentDay--; renderDay(currentDay); }
    });
    document.getElementById("btn-next-day").addEventListener("click", () => {
      if (currentDay < 90) { currentDay++; renderDay(currentDay); }
    });
  }

  function youtubeSearchUrl(query) {
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(query);
  }

  // ---------- Vídeo-aula específica de cada frente do dia ----------

  // Escolhe, para a frente estudada nessa lição, um subtema ESPECÍFICO do
  // catálogo VIDEO_TOPICS (não a matéria inteira) — por exemplo "porcentagem
  // e juros compostos" em vez de "matemática". O índice gira com o número da
  // visita (1ª vez, 2ª revisão, ...), então cada vez que a frente volta, a
  // aula sugerida é sobre um subtema diferente, cobrindo mais terreno ao
  // longo dos 90 dias.
  function pickLessonVideo(subtopicId, visitNumber) {
    const pool = (window.VIDEO_TOPICS && window.VIDEO_TOPICS[subtopicId]) || [];
    if (pool.length === 0) return null;
    return pool[(visitNumber - 1) % pool.length];
  }

  // Achado 14 (checklist "X/Y do dia"): lista curta de tarefas do dia,
  // atualizada sempre que algo relevante muda (resposta, dissertativa).
  // Cresce nas fases seguintes (teoria, flashcards) — por enquanto cobre só
  // o que já existe: exercícios essenciais e a dissertativa opcional.
  function computeDayTasks(day, content) {
    const tasks = [];
    if (content.type === "simulado") {
      tasks.push({ label: "Simulado misto", done: isDayExerciseComplete(day) });
    } else {
      const seenTheory = loadJSON(LS_THEORY_SEEN, {});
      const theoryDone = content.lessons.every((l) => !temTeoria(l.subtopicId) || seenTheory[theoryKey(l.subtopicId)]);
      tasks.push({ label: "Teoria (gatilhos, pegadinhas e exemplos)", done: theoryDone });
      tasks.push({ label: "Questões essenciais", done: isDayExerciseComplete(day) });
      const dstatus = getDissertStatus()[day];
      tasks.push({ label: "Dissertativa (opcional, meta de 4x/semana)", done: dstatus === "done" || dstatus === "skipped" });
      const flashcardState = getFlashcardState();
      const dueToday = buildFlashcardPool().some((c) => flashcardStatusFor(c.key, flashcardState) === "vencido");
      tasks.push({ label: "Flashcards do dia", done: !dueToday });
    }
    return tasks;
  }

  function renderDayChecklist(day, content) {
    const tasks = computeDayTasks(day, content);
    const doneCount = tasks.filter((t) => t.done).length;
    const itemsHtml = tasks
      .map((t) => `<li class="${t.done ? "task-done" : ""}">
          <span class="tarefa-marca">${t.done ? "✓" : ""}</span>
          <span>${escapeHtml(t.label)}</span>
        </li>`)
      .join("");
    return `<div class="tarefas-card" id="day-checklist">
      <div class="tarefas-head">
        <span class="tarefas-titulo">Tarefas de hoje</span>
        <span class="tarefas-contador">${doneCount}/${tasks.length}</span>
      </div>
      <ul class="tarefas-lista">${itemsHtml}</ul>
    </div>`;
  }

  // Atualiza o painel curto do topo de Hoje. É chamada depois de cada resposta
  // (ver renderQuestion) e ao voltar para a aba.
  //
  // O cartão de foco entra aqui junto com as tarefas porque os dois leem a
  // MESMA coisa — quantas questões essenciais ainda faltam. Deixar só o
  // checklist se atualizando fazia o botão dourado continuar dizendo
  // "questão 2 de 12" depois da sétima resposta.
  function updateDayChecklist(day) {
    const el = document.getElementById("day-checklist");
    if (!el || !plan) return;
    const content = getDayContent(plan, day);

    const wrap = document.createElement("div");
    wrap.innerHTML = renderDayChecklist(day, content);
    el.replaceWith(wrap.firstElementChild);

    const foco = document.querySelector("#day-content .foco-card");
    if (foco) foco.replaceWith(renderFocoCard(day, content));
    sincronizarFrenteEmFoco(day, content);

    const resumo = document.getElementById("resumo-dia");
    if (resumo) resumo.replaceWith(renderResumoDia(day, content));

    // A faixa de métricas também sai do lugar a cada resposta: "acerto na
    // semana" e "frente mais fraca" mudam com o que acabou de ser respondido.
    // Sem isto, elas só se corrigiam ao trocar de aba e voltar — e a frente
    // mais fraca ficava em "—" com doze respostas já gravadas.
    // Vem depois do updateDayStateFromDom (ver renderQuestion), que é quem
    // grava o vd_dayState de onde o acerto da semana é somado.
    atualizarMetricas();

    // O contador da lateral conta a mesma coisa que este cartão: se um mudou,
    // o outro mudou junto.
    atualizarBadges();
  }

  // ---------- Resumo do dia: as duas matérias, num só olhar ----------
  //
  // O cartão de foco só promove UMA frente, e a segunda ficava depois das
  // tarefas e das métricas — quem queria ver as duas matérias do dia de cara
  // tinha que rolar a tela. Este é um atalho: duas chips lado a lado, e cada
  // uma rola até o card da frente correspondente, sem trocar de aba.
  function renderResumoDia(day, content) {
    const wrap = document.createElement("div");
    wrap.className = "resumo-dia";
    wrap.id = "resumo-dia";
    if (content.type === "simulado") {
      wrap.hidden = true;
      return wrap;
    }

    const dayAnswers = getDayAnswers();
    const chipsHtml = content.lessons.map((lesson) => {
      const essentialCount = snapToGroupBoundary(
        lesson.questions,
        Math.min(ESSENTIAL_QUESTIONS_PER_LESSON, lesson.questions.length)
      );
      const essentials = lesson.questions.slice(0, essentialCount);
      const respondidas = essentials.filter(
        (q) => dayAnswers[dayAnswerKey(day, lesson.subtopicId, q.id)] !== undefined
      ).length;
      const feita = essentials.length > 0 && respondidas >= essentials.length;
      return `
        <button type="button" class="resumo-chip${feita ? " resumo-chip-feita" : ""}"
                data-resumo-chip="${escapeHtml(lesson.subtopicId)}">
          <span class="resumo-chip-marca">${feita ? "✓" : ""}</span>
          <span class="resumo-chip-texto">
            <span class="resumo-chip-area">${escapeHtml(lesson.area)}</span>
            <span class="resumo-chip-nome">${escapeHtml(lesson.nome)}</span>
          </span>
        </button>`;
    }).join("");

    wrap.innerHTML = `
      <span class="resumo-dia-titulo">Questões do dia</span>
      <div class="resumo-dia-chips">${chipsHtml}</div>`;

    wrap.querySelectorAll("[data-resumo-chip]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const el = document.querySelector('[data-lesson-id="' + cssEscape(btn.dataset.resumoChip) + '"]');
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    return wrap;
  }

  // ---------- Cartão de foco: "comece por aqui" ----------
  //
  // A aba Hoje abria numa lista de aulas em que a primeira coisa da tela tinha
  // o mesmo peso da última. Este cartão responde, sozinho, a pergunta que a
  // pessoa traz ao abrir o app: o que eu faço AGORA. É o único bloco navy da
  // tela e leva o único botão de ouro — quando ele acaba, o dia acabou.
  //
  // A frente escolhida é a primeira do dia que ainda tem questão essencial em
  // aberto; se todas estiverem completas, o cartão passa a confirmar que o dia
  // fechou, em vez de mandar continuar algo que não existe.
  function pickFocoLesson(day, content) {
    if (content.type === "simulado") return null;
    const dayAnswers = getDayAnswers();
    for (const lesson of content.lessons) {
      const essentialCount = snapToGroupBoundary(
        lesson.questions,
        Math.min(ESSENTIAL_QUESTIONS_PER_LESSON, lesson.questions.length)
      );
      const essentials = lesson.questions.slice(0, essentialCount);
      const respondidas = essentials.filter(
        (q) => dayAnswers[dayAnswerKey(day, lesson.subtopicId, q.id)] !== undefined
      ).length;
      if (respondidas < essentials.length) {
        return { lesson, respondidas, total: essentials.length };
      }
    }
    return null;
  }

  function renderFocoCard(day, content) {
    const card = document.createElement("div");
    card.className = "card-navy foco-card";

    if (content.type === "simulado") {
      card.innerHTML = `
        <div class="eyebrow eyebrow-sobre-navy">Domingo · simulado</div>
        <div class="foco-card-titulo">
          <h3>Simulado misto</h3>
          <div class="texto-apoio">Questões distribuídas entre todas as frentes. Os erros daqui
          pesam mais forte na programação da próxima semana.</div>
        </div>
        <div class="foco-acoes">
          <button class="btn btn-ouro" data-foco-rolar>Ir para o simulado</button>
        </div>`;
      ligarFocoRolar(card);
      return card;
    }

    const foco = pickFocoLesson(day, content);

    if (!foco) {
      // Dia fechado. Sem botão de ouro: não há próxima ação a destacar.
      card.innerHTML = `
        <div class="eyebrow eyebrow-sobre-navy">Dia concluído</div>
        <div class="foco-card-titulo">
          <h3>Você fechou as questões de hoje</h3>
          <div class="texto-apoio">Os extras continuam abaixo, e os flashcards do dia entram
          quando vencerem. Amanhã o plano segue sozinho.</div>
        </div>`;
      return card;
    }

    card.appendChild(renderFrenteNavy(day, foco, true));
    ligarFocoRolar(card, foco.lesson.subtopicId);
    return card;
  }

  // Cabeçalho navy de UMA frente do dia. É o mesmo bloco nos dois usos, e é de
  // propósito: cada matéria do dia abre do mesmo jeito, com o mesmo desenho.
  //
  // `promovida` distingue a frente que o painel do topo está destacando (a
  // primeira com questão em aberto) das demais, que ganham o mesmo quadrado
  // logo acima do seu bloco de questões. Muda o rótulo e o peso do botão —
  // ouro só na promovida, porque é uma ação em destaque por tela.
  function renderFrenteNavy(day, foco, promovida) {
    const { lesson, respondidas, total } = foco;
    const frag = document.createDocumentFragment();

    const visitLabel = lesson.visitNumber === 1
      ? "1ª vez estudando este tema"
      : lesson.visitNumber + "ª revisão deste tema";
    const minutos = Math.round(total * MINUTES_PER_QUESTION_ESTIMATE);

    let rotuloBotao;
    if (respondidas >= total) rotuloBotao = "Rever as questões";
    else if (respondidas === 0) rotuloBotao = "Começar — " + total + " questões";
    else rotuloBotao = "Continuar — questão " + (respondidas + 1) + " de " + total;

    const video = pickLessonVideo(lesson.subtopicId, lesson.visitNumber);
    const aulaHtml = video
      ? `<div class="foco-aula">
          <div class="foco-aula-tema">
            <div class="eyebrow" style="color:#8FA0B5">Aula de hoje</div>
            <div class="foco-aula-nome">${escapeHtml(video.tema)}</div>
          </div>
          <a class="foco-aula-link" target="_blank" rel="noopener" href="${youtubeSearchUrl(video.busca)}">
            <span class="foco-play">▶</span> Assistir a vídeo-aula
          </a>
        </div>`
      : "";

    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="eyebrow eyebrow-sobre-navy">${promovida ? "Comece por aqui" : escapeHtml(lesson.area || "Depois desta")}</div>
      <div class="foco-card-titulo">
        <h3>${escapeHtml(lesson.nome)}</h3>
        <div class="texto-apoio">${total} questões essenciais · ~${minutos} min no ritmo da prova · ${escapeHtml(visitLabel)}</div>
      </div>
      <div class="foco-acoes">
        <button class="btn ${promovida ? "btn-ouro" : "btn-sobre-navy"}" data-foco-rolar>${escapeHtml(rotuloBotao)}</button>
        ${temTeoria(lesson.subtopicId)
          ? '<button class="btn btn-sobre-navy" data-foco-teoria>Ver teoria antes</button>' : ""}
      </div>
      ${aulaHtml}`;

    while (wrap.firstChild) frag.appendChild(wrap.firstChild);
    return frag;
  }

  // O quadrado de uma frente NÃO promovida, que abre o bloco dela mais abaixo.
  function renderFrenteHeader(day, lesson) {
    const dayAnswers = getDayAnswers();
    const essentialCount = snapToGroupBoundary(
      lesson.questions,
      Math.min(ESSENTIAL_QUESTIONS_PER_LESSON, lesson.questions.length)
    );
    const essentials = lesson.questions.slice(0, essentialCount);
    const respondidas = essentials.filter(
      (q) => dayAnswers[dayAnswerKey(day, lesson.subtopicId, q.id)] !== undefined
    ).length;

    const card = document.createElement("div");
    card.className = "card-navy foco-card frente-header";
    card.dataset.frenteHeader = lesson.subtopicId;
    card.appendChild(renderFrenteNavy(day, { lesson, respondidas, total: essentials.length }, false));
    ligarFocoRolar(card, lesson.subtopicId);
    return card;
  }

  // Os dois botões do cartão de foco não navegam: levam a pessoa ao ponto da
  // MESMA tela onde a coisa acontece. É o que mantém a promessa de "o painel
  // curto não tirou nada de lugar".
  function ligarFocoRolar(card, subtopicId) {
    const alvo = () => {
      if (subtopicId) {
        const el = document.querySelector('[data-lesson-id="' + cssEscape(subtopicId) + '"]');
        if (el) return el;
      }
      return document.querySelector("#day-content .lesson-card, #day-content .simulado-card");
    };

    const rolar = card.querySelector("[data-foco-rolar]");
    if (rolar) {
      rolar.addEventListener("click", () => {
        const el = alvo();
        if (!el) return;
        const q = el.querySelector(".question:not(.is-answered)") || el;
        q.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    const teoria = card.querySelector("[data-foco-teoria]");
    if (teoria) {
      teoria.addEventListener("click", () => {
        const el = alvo();
        if (!el) return;
        const toggle = el.querySelector(".theory-toggle");
        const conteudo = el.querySelector(".theory-content");
        if (toggle && conteudo && conteudo.hidden) toggle.click();
        (conteudo || el).scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }

  // CSS.escape não existe no Safari antigo, e os ids de frente são gerados
  // pelo banco — não vale confiar que sejam sempre seletores válidos.
  function cssEscape(s) {
    return window.CSS && CSS.escape ? CSS.escape(s) : String(s).replace(/["\\]/g, "\\$&");
  }

  // O cartão de foco é uma promoção de UMA frente do dia: ele já mostra a aula
  // daquela frente e já oferece a teoria dela. Sem isto, a frente promovida
  // aparecia duas vezes na mesma tela — "Aula de hoje: Concordância verbal e
  // nominal" no topo e de novo no cartão dela logo abaixo, com o mesmo tema e
  // o mesmo link do YouTube.
  //
  // Marcar em vez de não renderizar: as outras frentes do dia continuam com a
  // aula e a teoria delas, porque nada acima está mostrando as suas. E como a
  // frente promovida muda quando a anterior termina, a marca é recalculada a
  // cada resposta (updateDayChecklist) — quando o dia fecha, não há frente
  // promovida e todas voltam a exibir as suas.
  function sincronizarFrenteEmFoco(day, content) {
    if (!content || content.type === "simulado") return;
    const foco = pickFocoLesson(day, content);
    const idPromovida = foco ? foco.lesson.subtopicId : null;

    content.lessons.forEach((lesson) => {
      const sel = '[data-lesson-id="' + cssEscape(lesson.subtopicId) + '"]';
      const bloco = document.querySelector("#day-content .lesson-card" + sel);
      if (!bloco) return;
      const header = document.querySelector(
        '#day-content [data-frente-header="' + cssEscape(lesson.subtopicId) + '"]'
      );
      const precisaDeHeader = lesson.subtopicId !== idPromovida;

      if (precisaDeHeader && !header) {
        // A frente deixou de ser a promovida (a anterior terminou): ela perde
        // o lugar no topo e ganha o quadrado dela aqui embaixo.
        bloco.parentNode.insertBefore(renderFrenteHeader(day, lesson), bloco);
      } else if (!precisaDeHeader && header) {
        // Virou a promovida: sai daqui pra não aparecer duas vezes.
        header.remove();
      } else if (header) {
        // Continua igual, mas o "questão N de M" dela envelheceu.
        header.replaceWith(renderFrenteHeader(day, lesson));
      }
    });
  }

  // ---------- Faixa de métricas do topo ----------
  //
  // Quatro números que respondem "como estou indo" sem abrir a aba Progresso.
  // Todos saem do estado real do app: nenhum é estimativa de fora.
  // ---------- O pulso do plano ----------
  //
  // Isto era uma fileira de QUATRO células iguais: "Fim do plano · 78 dias",
  // "Acerto na semana · 74%", "Plano concluído · 9/90" e "Frente mais fraca".
  // Duas objeções mataram esse desenho.
  //
  // A primeira é de conteúdo: "plano concluído 9/90" e "fim do plano 78 dias"
  // são O MESMO FATO dito duas vezes — 9 feitos de 90 É 81 restantes. Não era
  // hierarquia fraca, era redundância ocupando metade da faixa.
  //
  // A segunda é de forma: quatro caixas do mesmo tamanho dizem que as quatro
  // coisas pesam igual, e não pesam. Uma é progresso, outra é desempenho e a
  // terceira é uma AÇÃO — "sua frente mais fraca é X" só serve para alguma
  // coisa se levar a algum lugar.
  //
  // Então viraram três objetos de formas diferentes, num cartão só:
  //   1. a fita dos 90 dias, que absorve os dois números de progresso e ainda
  //      mostra o formato do plano (onde caem os simulados, o que já passou);
  //   2. o acerto da semana como o único número grande;
  //   3. a frente mais fraca como LINHA CLICÁVEL que abre a sessão SOS dela.
  //
  // O nome da classe .metricas ficou: é por ela que atualizarMetricas() acha o
  // bloco para trocar depois de cada resposta.
  function renderMetricas() {
    const wrap = document.createElement("div");
    wrap.className = "metricas pulso";

    const hoje = currentDayFromStart();
    const faltam = Math.max(0, 90 - hoje);

    // Acerto dos últimos sete DIAS DE PLANO. Tinha que ser assim: o
    // vd_answers guarda só a letra escolhida, sem data, então não existe
    // janela de calendário para consultar. O vd_dayState, esse sim, guarda
    // acertos e respostas por dia do plano — é a única fonte com recorte
    // temporal, e é dela que sai a comparação com a semana anterior.
    const semana = acertoEntreDias(hoje - 6, hoje);
    const semanaAnterior = acertoEntreDias(hoje - 13, hoje - 7);
    let notaSemana = "sem respostas nos últimos 7 dias", classeSemana = "";
    if (semana.total > 0) {
      if (semanaAnterior.total > 0) {
        const delta = Math.round(semana.pct - semanaAnterior.pct);
        notaSemana = (delta >= 0 ? "+" : "") + delta + " pts vs. semana passada";
        classeSemana = delta >= 0 ? "pulso-nota-boa" : "pulso-nota-alerta";
      } else {
        notaSemana = semana.total + " questões respondidas";
      }
    }

    const dayState = getDayState();
    let diasFeitos = 0;
    for (let d = 1; d <= 90; d++) {
      const st = dayState[d];
      if (st && st.total > 0 && st.answered >= st.total) diasFeitos++;
    }

    const fraca = frenteMaisFraca();

    // A fita: um segmento por dia do plano. O estado de cada um sai das mesmas
    // fontes que o Calendário usa, para os dois nunca discordarem.
    const start = localStorage.getItem(LS_START) || todayISO();
    const segmentos = [];
    for (let d = 1; d <= 90; d++) {
      const st = dayState[d];
      const domingo = scheduleDateForDay(start, d).getDay() === 0;
      let estado;
      if (d === hoje) estado = "hoje";
      else if (st && st.total > 0 && st.answered >= st.total) estado = "feito";
      else if (st && st.answered > 0) estado = "parcial";
      else if (domingo) estado = "simulado";
      else estado = "aberto";
      segmentos.push('<i class="fita-dia fita-' + estado + '"></i>');
    }

    const pctPlano = Math.round((diasFeitos / 90) * 100);
    const acerto = semana.total > 0 ? Math.round(semana.pct) + "%" : "—";

    wrap.innerHTML = `
      <div class="pulso-plano">
        <div class="pulso-linha">
          <span class="pulso-rotulo">Os 90 dias</span>
          <span class="pulso-plano-num">
            <strong>Dia ${hoje}</strong> de 90 · ${diasFeitos} concluído${diasFeitos === 1 ? "" : "s"}
            · faltam ${faltam} dia${faltam === 1 ? "" : "s"}
          </span>
        </div>
        <div class="fita-90" role="img"
             aria-label="Dia ${hoje} de 90. ${diasFeitos} dias concluídos, ${pctPlano} por cento do plano.">
          ${segmentos.join("")}
        </div>
      </div>

      <div class="pulso-rodape">
        <div class="pulso-acerto">
          <span class="pulso-rotulo">Acerto na semana</span>
          <span class="pulso-valor">${escapeHtml(acerto)}</span>
          <span class="pulso-nota ${classeSemana}">${escapeHtml(notaSemana)}</span>
        </div>
        ${fraca
          ? `<button type="button" class="pulso-fraca" data-sos="${escapeHtml(fraca.id)}">
               <span class="pulso-rotulo">Onde você mais perde ponto</span>
               <span class="pulso-fraca-nome">${escapeHtml(fraca.nome)}</span>
               <span class="pulso-fraca-cta">${Math.round(fraca.pct)}% de acerto · abrir o SOS deste tema →</span>
             </button>`
          : `<div class="pulso-fraca pulso-fraca-vazia">
               <span class="pulso-rotulo">Onde você mais perde ponto</span>
               <span class="pulso-fraca-nome">Ainda não dá pra dizer</span>
               <span class="pulso-fraca-cta">responda pelo menos 5 questões de uma frente</span>
             </div>`}
      </div>`;

    // A frente mais fraca é a única parte do painel que É uma ação: leva para a
    // sessão de resgate daquele tema, com a teoria aberta e os erros juntos.
    const sos = wrap.querySelector("[data-sos]");
    if (sos) {
      sos.addEventListener("click", () => {
        progressoSosId = sos.dataset.sos;
        irParaAba("progresso");
        renderProgress();
      });
    }

    return wrap;
  }

  // As métricas são um retrato do estado, e o estado muda enquanto a pessoa
  // responde — inclusive em OUTRAS abas (um simulado, o caderno de erros).
  // Voltar para Hoje precisa mostrar o número de agora, não o do boot.
  //
  // Troca só a faixa, em vez de chamar renderDay: reconstruir o dia inteiro
  // jogaria a pessoa de volta ao topo da tela e recarregaria todas as
  // questões só para atualizar quatro números.
  function atualizarMetricas() {
    const antiga = document.querySelector("#day-content .metricas");
    if (!antiga) return;
    antiga.replaceWith(renderMetricas());
  }

  // Acerto somado dos dias de plano no intervalo [inicio, fim], inclusive.
  function acertoEntreDias(inicio, fim) {
    const dayState = getDayState();
    let total = 0, certas = 0;
    for (let d = Math.max(1, inicio); d <= fim; d++) {
      const st = dayState[d];
      if (!st || !st.answered) continue;
      total += st.answered;
      certas += st.correct || 0;
    }
    return { total, pct: total > 0 ? (certas / total) * 100 : 0 };
  }

  function frenteMaisFraca() {
    const estado = computeTopicStateFromAnswers();
    let pior = null;
    (window.SUBTOPICS || []).forEach((s) => {
      const st = estado[s.id];
      if (!st || st.answered < 5) return; // amostra pequena demais pra acusar
      const pct = (st.correct / st.answered) * 100;
      // O `id` entrou junto com o painel de pulso da aba Hoje: lá a frente mais
      // fraca deixou de ser um número e virou o atalho que abre o SOS dela, e
      // para isso é preciso saber QUAL subtema é, não só o nome dele.
      if (!pior || pct < pior.pct) pior = { id: s.id, nome: s.nome, pct };
    });
    return pior;
  }

  function renderDay(day) {
    rebuildPlan();
    currentDay = day;
    document.getElementById("day-number").textContent = "Dia " + day;
    const start = localStorage.getItem(LS_START) || todayISO();
    document.getElementById("day-date").textContent = formatDate(addDays(start, day - 1));
    document.getElementById("phase-label").textContent = phaseLabelForDay(day);
    document.getElementById("btn-prev-day").disabled = day <= 1;
    document.getElementById("btn-next-day").disabled = day >= 90;

    const content = getDayContent(plan, day);
    const container = document.getElementById("day-content");
    container.innerHTML = "";

    container.appendChild(renderResumoDia(day, content));

    // O painel curto do topo: o que fazer agora (navy), o que falta hoje
    // (tarefas) e como estou indo (métricas). Nada saiu da tela — as questões
    // continuam logo abaixo, no mesmo lugar de sempre.
    const topo = document.createElement("div");
    topo.className = "hoje-topo";
    topo.appendChild(renderFocoCard(day, content));
    const checklistWrap = document.createElement("div");
    checklistWrap.innerHTML = renderDayChecklist(day, content);
    topo.appendChild(checklistWrap.firstElementChild);
    container.appendChild(topo);

    container.appendChild(renderMetricas());

    // Achado 4 (interleaving): sextas-feiras que já incluem uma revisão
    // (visitNumber > 1, não a 1ª vez no tema) ganham um aviso explicando o
    // porquê — mistura o assunto novo com algo que você já viu antes, em vez
    // de dias inteiros de um assunto só.
    const isFriday = scheduleDateForDay(start, day).getDay() === 5;
    if (isFriday && content.type === "normal" && content.lessons.some((l) => l.visitNumber > 1)) {
      const note = document.createElement("div");
      note.className = "friday-note";
      note.textContent = "Sexta de revisão intercalada: hoje mistura um tema novo com outro que você já estudou antes — misturar em vez de blocos maciços de um assunto só ajuda a fixar melhor.";
      container.appendChild(note);
    }

    if (content.type === "simulado") {
      container.appendChild(renderSimuladoCard(day, content));
    } else {
      // Cada matéria do dia abre com o mesmo quadrado navy: nome da frente,
      // quanto ela pesa em questões e minutos, a aula dela e o botão que leva
      // às questões. A primeira já vem promovida no painel do topo, então só
      // as seguintes precisam do quadrado aqui — sem isso a frente promovida
      // apareceria duas vezes na mesma tela.
      const foco = pickFocoLesson(day, content);
      const idPromovida = foco ? foco.lesson.subtopicId : null;
      content.lessons.forEach((lesson) => {
        if (lesson.subtopicId !== idPromovida) {
          container.appendChild(renderFrenteHeader(day, lesson));
        }
        container.appendChild(renderLessonCard(day, lesson));
      });
    }

    const dissertContainer = document.createElement("div");
    dissertContainer.id = "dissert-section";
    container.appendChild(dissertContainer);

    updateDayStateFromDom(day);
    renderDissertSection(day);
    // Só agora os cartões das frentes existem no DOM: é aqui que dá pra dizer
    // qual delas o cartão de foco está promovendo.
    sincronizarFrenteEmFoco(day, content);
    // O cabeçalho mostra "Dia 12 de 90 · sexta, 20 de março": navegar entre
    // dias tem que reescrevê-lo, e os contadores da lateral junto.
    atualizarCabecalho("hoje");
    atualizarBadges();
  }

  // Modo do simulado do domingo, por dia. O adaptativo é o padrão porque é ele
  // que alimenta os pesos do ciclo seguinte; os cadernos oficiais são ensaio
  // de prova e não realimentam nada.
  function getSimuladoModo(day) { return loadJSON(LS_SIMULADO_MODO, {})[day] || "adaptativo"; }
  function setSimuladoModo(day, modo) {
    const s = loadJSON(LS_SIMULADO_MODO, {});
    s[day] = modo;
    saveJSON(LS_SIMULADO_MODO, s);
  }

  // Total de questões de um caderno oficial, somando todos os blocos — usado
  // no rótulo do botão antes de o candidato escolher o modo (pickSimuladoOficial
  // só monta os itens depois do clique).
  function totalSimuladoOficial(modelo) {
    return modelo.blocos.reduce((soma, b) => soma + Object.values(b.frentes).reduce((s, n) => s + n, 0), 0);
  }

  function renderSimuladoCard(day, content) {
    const card = document.createElement("div");
    card.className = "lesson-card simulado-card";
    // A lista de bancas vem da trilha ativa (1 a 7, ver simuladoOficial em
    // trilhas.js) — se o modo salvo apontar para uma banca que não existe mais
    // aqui (troca de trilha, ou o dia foi respondido antes de a banca entrar
    // no catálogo), cai para o adaptativo em vez de travar em modelo.nome de
    // undefined.
    let modo = getSimuladoModo(day);
    if (modo !== "adaptativo" && !SIMULADO_OFICIAL[modo]) modo = "adaptativo";
    const oficial = modo !== "adaptativo";
    const modelo = oficial ? SIMULADO_OFICIAL[modo] : null;
    const items = oficial
      ? pickSimuladoOficial(modo, content.simuladoNumber - 1)
      : content.items;

    const opcoes = [["adaptativo", `Adaptativo · ${SIMULADO_TOTAL_QUESTIONS}`]];
    Object.keys(SIMULADO_OFICIAL).forEach((id) => {
      opcoes.push([id, `Oficial ${SIMULADO_OFICIAL[id].nome} · ${totalSimuladoOficial(SIMULADO_OFICIAL[id])}`]);
    });
    const abas = opcoes.map(([id, rotulo]) =>
      `<button type="button" class="simulado-modo-btn${modo === id ? " ativo" : ""}" data-modo="${id}">${rotulo}</button>`
    ).join("");

    const descricao = oficial
      ? `Ensaio da prova real: ${items.length} questões em ${modelo.blocos.length} ${modelo.blocos.length === 1 ? "bloco" : "blocos"},
         na ordem exata do caderno da ${escapeHtml(modelo.nome)}, com ${modelo.duracaoMin} minutos de duração. Fazer
         nessa ordem treina o que o simulado adaptativo não alcança — o ritmo, a decisão de abandonar uma questão e
         o cansaço do fim da prova, que é onde a nota costuma cair. Este modo não altera a programação da próxima
         semana.`
      : `Hoje não tem vídeo-aula: são ${items.length} questões, distribuídas entre as frentes por prioridade (pelo
         menos uma de cada), para revisar tudo o que você já estudou. Os erros daqui pesam mais forte na
         programação da próxima semana — sem sumir os outros temas.`;

    card.innerHTML = `
      <div class="lesson-eyebrow">Domingo · Simulado ${content.simuladoNumber}</div>
      <h3>${oficial ? "Simulado oficial — " + escapeHtml(modelo.nome) : "Simulado misto — todas as frentes"}</h3>
      <div class="simulado-modos">${abas}</div>
      <p class="lesson-desc">${descricao}</p>
      <div class="exercise-block">
        <div class="exercise-summary">
          <span>${items.length} questões</span>
          <span class="score-label"></span>
        </div>
        <div class="questions"></div>
      </div>
      <div class="simulado-focus"></div>
    `;

    card.querySelectorAll(".simulado-modo-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setSimuladoModo(day, btn.dataset.modo);
        renderDay(day);
      });
    });

    // Início (1-based) de cada bloco, pelo TAMANHO real dele — não dá pra supor
    // 15 por bloco como quando só existiam os cadernos de 60 da FGV e do
    // Insper: os de Medicina vão de blocos de 5 (Matemática da PUC-SP) a um
    // único bloco de 89 (a FUVEST, que não separa por disciplina).
    const blocoInicios = [];
    if (oficial) {
      let acc = 1;
      modelo.blocos.forEach((b) => {
        blocoInicios.push(acc);
        acc += Object.values(b.frentes).reduce((s, n) => s + n, 0);
      });
    }

    const questionsContainer = card.querySelector(".questions");
    let blocoAtual = null;
    items.forEach((item, idx) => {
      // Cabeçalho de bloco: sem ele, um caderno inteiro em sequência não
      // ensaia nada além de resistência. É a fronteira do bloco que o
      // candidato precisa sentir, porque é onde ele decide se vai voltar às
      // que pulou. Com um único bloco (a FUVEST, organizada por tema) não há
      // fronteira para marcar.
      if (oficial && modelo.blocos.length > 1 && item.bloco !== blocoAtual) {
        blocoAtual = item.bloco;
        const tamanho = Object.values(modelo.blocos[item.blocoIndex].frentes).reduce((s, n) => s + n, 0);
        const faixa = blocoInicios[item.blocoIndex];
        const cab = document.createElement("div");
        cab.className = "simulado-bloco";
        cab.textContent = `Bloco ${item.blocoIndex + 1} · ${item.bloco} · questões ${faixa} a ${faixa + tamanho - 1}`;
        questionsContainer.appendChild(cab);
      }
      appendGrouped(
        questionsContainer,
        item.question,
        renderQuestion(day, item.subtopicId, item.question, idx, item.area + " · " + item.subtopicNome)
      );
    });

    updateScoreLabel(card);
    // O foco adaptativo lê os erros do simulado de 45 para montar o ciclo
    // seguinte. Nos modos oficiais ele não aparece, porque a composição é fixa
    // pela banca e não teria o que realimentar.
    if (!oficial) renderSimuladoFocus(card.querySelector(".simulado-focus"), day, content);
    return card;
  }

  // Rótulo curto do peso-base de uma frente (window.PRIORITY_WEIGHTS), usado
  // pra explicar o "porquê" das recomendações (achado 8: transparência
  // linha a linha no motor adaptativo).
  function priorityLabel(weight) {
    if (weight >= 3) return "prioridade máxima na prova";
    if (weight >= 2) return "prioridade média na prova";
    if (weight >= 1.5) return "prioridade estrutural (decisiva numa banca, secundária na outra)";
    return "prioridade baixa na prova";
  }

  // Depois que o simulado é 100% respondido, mostra quais frentes tiveram
  // mais erros e por isso vão ganhar mais espaço na semana seguinte — cada
  // linha explica o porquê (peso da frente + taxa de erro), não só "errou X".
  function renderSimuladoFocus(container, day, content) {
    if (!container || !isDayExerciseComplete(day)) return;

    const simuladoVisitIndex = content.simuladoNumber - 1;
    const { errors, totals } = computeSimuladoErrorStats(simuladoVisitIndex, day);
    const weights = window.PRIORITY_WEIGHTS || {};

    const focusedSubtopics = window.SUBTOPICS
      .filter((s) => errors[s.id] > 0)
      .sort((a, b) => (errors[b.id] / totals[b.id]) - (errors[a.id] / totals[a.id]));

    const focused = focusedSubtopics.map((s) => {
      const rate = Math.round((errors[s.id] / totals[s.id]) * 100);
      const label = priorityLabel(weights[s.id] || 1);
      return `<li><strong>${escapeHtml(s.nome)}</strong> — ${label} e você errou ${errors[s.id]}/${totals[s.id]} (${rate}%) neste simulado
        <button type="button" class="btn-link sos-inline-btn" data-subtopic="${s.id}">🆘 SOS</button></li>`;
    });

    container.innerHTML = focused.length > 0
      ? `<div class="dissert-counter"><strong>Com base nos seus erros, a semana que vem foca mais em:</strong></div><ul class="focus-list">${focused.join("")}</ul>`
      : `<div class="dissert-counter"><strong>Mandou bem!</strong> Sem erros neste simulado, a semana que vem segue com a distribuição normal entre as frentes.</div>`;

    container.querySelectorAll(".sos-inline-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        progressoSosId = btn.dataset.subtopic;
        document.querySelector('.tab-btn[data-tab="progresso"]').click();
      });
    });
  }

  // ---------- Aba Simulados (lista + resultado detalhado por tema) ----------

  // Usa a resposta ESPECÍFICA deste dia de simulado (vd_dayAnswers), não a
  // global — senão uma questão que se repete em outro simulado/dia (bancos
  // maiores tornam isso comum) contaminaria o resultado deste simulado com
  // uma resposta dada em outra ocasião.
  function computeSimuladoResult(simuladoIndex, day) {
    const items = pickSimuladoQuestions(simuladoIndex);
    const dayAnswers = getDayAnswers();

    const perTopic = {};
    window.SUBTOPICS.forEach((s) => {
      perTopic[s.id] = { subtopicId: s.id, nome: s.nome, area: s.area, correct: 0, answered: 0, total: 0 };
    });

    let totalCorrect = 0;
    let totalAnswered = 0;
    items.forEach((item) => {
      const t = perTopic[item.subtopicId];
      t.total++;
      const dKey = dayAnswerKey(day, item.subtopicId, item.question.id);
      const chosen = dayAnswers[dKey];
      if (chosen) {
        t.answered++;
        totalAnswered++;
        if (chosen === item.question.resposta) {
          t.correct++;
          totalCorrect++;
        }
      }
    });

    return {
      day,
      simuladoIndex,
      totalQuestions: items.length,
      totalAnswered,
      totalCorrect,
      perTopic: Object.values(perTopic),
    };
  }

  // Achado 11 (simulados avulsos + re-simulado): itens desse simulado
  // específico cuja resposta NAQUELE DIA está errada — usado por "Refazer
  // só as erradas" pra limpar só essas chaves de vd_dayAnswers (day-scoped,
  // não a global — ver nota em computeSimuladoResult).
  function computeSimuladoWrongItems(simuladoIndex, day) {
    const items = pickSimuladoQuestions(simuladoIndex);
    const dayAnswers = getDayAnswers();
    return items.filter((item) => {
      const chosen = dayAnswers[dayAnswerKey(day, item.subtopicId, item.question.id)];
      return chosen && chosen !== item.question.resposta;
    });
  }

  // Limpa a resposta POR OCORRÊNCIA (vd_dayAnswers) daquele simulado
  // específico — não mexe em vd_answers (histórico global de stats/Caderno
  // de Erros), pra não afetar outras vezes em que a mesma questão apareceu
  // em outro dia/simulado.
  function retrySimulado(simuladoIndex, day, onlyWrong) {
    const items = onlyWrong ? computeSimuladoWrongItems(simuladoIndex, day) : pickSimuladoQuestions(simuladoIndex);
    if (items.length === 0) return;
    const msg = onlyWrong
      ? `Isso vai limpar sua resposta nas ${items.length} questões que você errou nesse simulado, pra você refazer só elas. Continuar?`
      : "Isso vai limpar todas as suas respostas nesse simulado, pra você refazer do zero. Continuar?";
    if (!confirm(msg)) return;
    const dayAnswers = getDayAnswers();
    items.forEach((item) => { delete dayAnswers[dayAnswerKey(day, item.subtopicId, item.question.id)]; });
    saveJSON(LS_DAY_ANSWERS, dayAnswers);
    recomputeAll();
  }

  function simuladoStatusLabel(result) {
    if (result.totalAnswered === 0) return { text: "Não realizado", cls: "pending" };
    if (result.totalAnswered < result.totalQuestions) return { text: `Em andamento — ${result.totalAnswered}/${result.totalQuestions}`, cls: "partial" };
    const pct = Math.round((result.totalCorrect / result.totalQuestions) * 100);
    return { text: `Concluído — ${result.totalCorrect}/${result.totalQuestions} certas (${pct}%)`, cls: "done" };
  }

  function renderSimuladosTab() {
    rebuildPlan();
    const container = document.getElementById("simulados-content");
    container.innerHTML = "";
    if (simuladosDetailIndex === null) {
      container.appendChild(renderSimuladosList());
    } else {
      container.appendChild(renderSimuladoDetailView(simuladosDetailIndex));
    }
  }

  function renderSimuladosList() {
    const wrap = document.createElement("div");
    const start = localStorage.getItem(LS_START) || todayISO();
    const simuladoDays = listSimuladoDays(start);

    // Nomes das bancas oficiais da trilha ativa, pra não deixar "FGV ou Insper"
    // hardcoded onde Medicina tem sete (ver simuladoOficial em trilhas.js).
    const bancasNomes = Object.values(SIMULADO_OFICIAL).map((m) => m.nome);
    const bancasTexto = bancasNomes.length <= 1
      ? (bancasNomes[0] || "")
      : bancasNomes.slice(0, -1).join(", ") + " ou " + bancasNomes[bancasNomes.length - 1];
    const totalFrentes = new Set((window.SUBTOPICS || []).map((s) => s.frenteId)).size;

    const header = document.createElement("div");
    header.innerHTML = `
      <h2>Todos os simulados</h2>
      <p class="hint">Todo domingo do seu plano vira um simulado. No modo padrão são ~${SIMULADO_TOTAL_QUESTIONS} questões
      misturadas entre as ${totalFrentes} frentes por prioridade, e os erros pesam na programação da semana seguinte; no
      card do dia você pode trocar para o caderno oficial de uma das bancas (${escapeHtml(bancasTexto)}), na ordem exata
      da prova real. Clique em um simulado para ver o resultado detalhado, frente por frente.</p>
    `;
    wrap.appendChild(header);

    if (simuladoDays.length === 0) {
      const empty = document.createElement("p");
      empty.className = "hint";
      empty.textContent = "Nenhum simulado no período do seu plano.";
      wrap.appendChild(empty);
      return wrap;
    }

    const list = document.createElement("div");
    list.className = "progress-list";

    simuladoDays.forEach((day, simuladoIndex) => {
      const result = computeSimuladoResult(simuladoIndex, day);
      const status = simuladoStatusLabel(result);
      const dateLabel = formatDate(addDays(start, day - 1));

      const row = document.createElement("button");
      row.type = "button";
      row.className = "progress-row simulado-list-row";
      row.innerHTML = `
        <div class="progress-row-top">
          <span class="name">Simulado ${simuladoIndex + 1} — Dia ${day}</span>
          <span class="stat">${escapeHtml(dateLabel)}</span>
        </div>
        <div class="simulado-status simulado-status-${status.cls}">${escapeHtml(status.text)}</div>
      `;
      row.addEventListener("click", () => {
        simuladosDetailIndex = simuladoIndex;
        renderSimuladosTab();
      });
      list.appendChild(row);
    });

    wrap.appendChild(list);
    return wrap;
  }

  function renderSimuladoDetailView(simuladoIndex) {
    const wrap = document.createElement("div");
    const start = localStorage.getItem(LS_START) || todayISO();
    const simuladoDays = listSimuladoDays(start);
    const day = simuladoDays[simuladoIndex];

    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.className = "btn btn-ghost";
    backBtn.style.marginBottom = "8px";
    backBtn.textContent = "← Voltar para todos os simulados";
    backBtn.addEventListener("click", () => {
      simuladosDetailIndex = null;
      renderSimuladosTab();
    });
    wrap.appendChild(backBtn);

    if (day === undefined) {
      const empty = document.createElement("p");
      empty.className = "hint";
      empty.textContent = "Esse simulado não existe no seu plano.";
      wrap.appendChild(empty);
      return wrap;
    }

    const result = computeSimuladoResult(simuladoIndex, day);
    const status = simuladoStatusLabel(result);
    const dateLabel = formatDate(addDays(start, day - 1));

    const header = document.createElement("div");
    header.className = "card official-exams-card";
    header.innerHTML = `
      <h2>Simulado ${simuladoIndex + 1} — Dia ${day}</h2>
      <p class="hint" style="margin-top:-4px">${escapeHtml(dateLabel)}</p>
      <p class="simulado-status simulado-status-${status.cls}" style="font-size:1.1rem; margin:8px 0 0;">
        ${escapeHtml(status.text)}
      </p>
    `;
    wrap.appendChild(header);

    const actionsWrap = document.createElement("div");
    actionsWrap.className = "dissert-actions";
    actionsWrap.style.margin = "14px 0";

    const goBtn = document.createElement("button");
    goBtn.type = "button";
    goBtn.className = "btn btn-secondary";
    goBtn.style.width = "auto";
    goBtn.textContent = "Abrir esse dia em \"Hoje\"";
    goBtn.addEventListener("click", () => {
      document.querySelector('.tab-btn[data-tab="hoje"]').click();
      renderDay(day);
    });
    actionsWrap.appendChild(goBtn);

    // Achado 11: simulados avulsos, refazíveis a qualquer momento.
    if (result.totalAnswered > 0) {
      const wrongCount = computeSimuladoWrongItems(simuladoIndex, day).length;
      if (wrongCount > 0) {
        const retryWrongBtn = document.createElement("button");
        retryWrongBtn.type = "button";
        retryWrongBtn.className = "btn btn-secondary";
        retryWrongBtn.style.width = "auto";
        retryWrongBtn.textContent = `Refazer só as ${wrongCount} erradas`;
        retryWrongBtn.addEventListener("click", () => {
          retrySimulado(simuladoIndex, day, true);
          document.querySelector('.tab-btn[data-tab="hoje"]').click();
          renderDay(day);
        });
        actionsWrap.appendChild(retryWrongBtn);
      }
      const retryAllBtn = document.createElement("button");
      retryAllBtn.type = "button";
      retryAllBtn.className = "btn btn-secondary";
      retryAllBtn.style.width = "auto";
      retryAllBtn.textContent = "Refazer o simulado inteiro";
      retryAllBtn.addEventListener("click", () => {
        retrySimulado(simuladoIndex, day, false);
        document.querySelector('.tab-btn[data-tab="hoje"]').click();
        renderDay(day);
      });
      actionsWrap.appendChild(retryAllBtn);
    }

    wrap.appendChild(actionsWrap);

    const subtitle = document.createElement("h3");
    subtitle.textContent = "Acertos por frente";
    wrap.appendChild(subtitle);

    const list = document.createElement("div");
    list.className = "progress-list";
    result.perTopic.forEach((t) => {
      const pct = t.answered > 0 ? Math.round((t.correct / t.answered) * 100) : 0;
      const row = document.createElement("div");
      row.className = "progress-row";
      row.innerHTML = `
        <div class="progress-row-top">
          <span class="name">${escapeHtml(t.nome)}</span>
          <span class="stat">${t.correct}/${t.answered || t.total} certas</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
      `;
      list.appendChild(row);
    });
    wrap.appendChild(list);

    return wrap;
  }

  // ---------- Achado 7: diagnóstico qualitativo de erro ----------
  //
  // Em vez de marcar manualmente ~540 questões com um "tipo de erro" fixo
  // (tarefa de curadoria que cresceria a cada questão nova adicionada e não
  // escalaria), classificamos por PADRÃO DE TEXTO no momento da análise —
  // mesma ideia do concorrente ("confusões recorrentes", "armadilha de
  // linguagem absoluta", "estilo de questão"), só que calculada
  // automaticamente a partir do enunciado/alternativas, e por isso já vale
  // pra qualquer questão nova do banco sem manutenção extra. É uma
  // estimativa heurística, não uma curadoria manual — o texto na UI deixa
  // isso explícito.
  function classifyErrorType(q) {
    const text = (q.enunciado + " " + Object.values(q.alternativas).join(" ")).toLowerCase();
    if (/\bsempre\b|\bnunca\b|\bsomente\b|\bapenas\b|\btodos\b|\btoda\b|\bnenhum\b|\bnenhuma\b/.test(text)) {
      return "linguagem-absoluta";
    }
    if (/%|porcentagem|proporç|razão|taxa|média|gráfico|tabela|calcul/.test(text)) {
      return "calculo-leitura-dado";
    }
    if (/em geral|de modo geral|na maioria dos casos|regra geral/.test(text)) {
      return "generalizacao-indevida";
    }
    return "conceitual";
  }
  const ERROR_TYPE_LABELS = {
    "linguagem-absoluta": "Armadilha de linguagem absoluta (\"sempre/nunca/só\")",
    "calculo-leitura-dado": "Cálculo ou leitura de dado (número, %, gráfico)",
    "generalizacao-indevida": "Generalização indevida",
    "conceitual": "Confusão conceitual",
  };

  function classifyQuestionStyle(q) {
    const text = q.enunciado.toLowerCase();
    if (/de acordo com o texto|segundo o texto|com base no texto|infere-se|pode-se inferir|o autor/.test(text)) {
      return "interpretacao";
    }
    if (/calcule|determine|qual (o|a) valor|resolva|quantos|quanto/.test(text)) {
      return "aplicacao";
    }
    return "conceito";
  }
  const STYLE_LABELS = { interpretacao: "Interpretação", aplicacao: "Aplicação/cálculo", conceito: "Conceito" };

  // Agrega, sobre TODAS as respostas erradas salvas (qualquer dia/simulado),
  // quantos erros caem em cada tipo de armadilha e em cada estilo de questão.
  function computeErrorDiagnostics() {
    const answers = getAnswers();
    const byErrorType = {}, byStyle = {};
    let total = 0;
    window.SUBTOPICS.forEach((s) => {
      const bank = (window.QUESTION_BANKS && window.QUESTION_BANKS[s.id]) || [];
      bank.forEach((q) => {
        const chosen = answers[answerKey(s.id, q.id)];
        if (chosen && chosen !== q.resposta) {
          total++;
          const et = classifyErrorType(q);
          const st = classifyQuestionStyle(q);
          byErrorType[et] = (byErrorType[et] || 0) + 1;
          byStyle[st] = (byStyle[st] || 0) + 1;
        }
      });
    });
    return { total, byErrorType, byStyle };
  }

  function renderErrorDiagnosticsCard() {
    const { total, byErrorType, byStyle } = computeErrorDiagnostics();
    const wrap = document.createElement("div");
    wrap.className = "card error-diagnostics-card";
    if (total === 0) {
      wrap.innerHTML = `
        <h3>Como você erra</h3>
        <p class="hint">Ainda sem erros suficientes pra identificar um padrão. Assim que você errar algumas
        questões, esse card mostra em que tipo de armadilha e em que estilo de questão você mais tropeça.</p>
      `;
      return wrap;
    }
    const rowsHtml = (obj, labels) => Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => {
        const pct = Math.round((count / total) * 100);
        return `
          <div class="diag-row">
            <div class="diag-row-top"><span>${escapeHtml(labels[key] || key)}</span><span>${count}/${total} (${pct}%)</span></div>
            <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
          </div>`;
      }).join("");

    wrap.innerHTML = `
      <h3>Como você erra</h3>
      <p class="hint">Estimativa automática (baseada no padrão do enunciado, não curadoria manual) de em que tipo de
      armadilha e em que estilo de questão os seus ${total} erro${total === 1 ? "" : "s"} salvos mais se concentram.</p>
      <div class="diag-col-label">Tipo de armadilha</div>
      ${rowsHtml(byErrorType, ERROR_TYPE_LABELS)}
      <div class="diag-col-label" style="margin-top:14px;">Estilo de questão</div>
      ${rowsHtml(byStyle, STYLE_LABELS)}
    `;
    return wrap;
  }

  // ---------- Achado 3: sessão "SOS" por tema ----------
  // Junta numa tela só: teoria (gatilhos/pegadinhas, achado 1) + as questões
  // erradas do usuário nesse tema (reaproveita computeWrongQuestions) —
  // acionável a qualquer momento a partir da aba Progresso ou do resumo
  // pós-simulado.
  function renderSosView(subtopicId) {
    const s = window.SUBTOPICS.find((x) => x.id === subtopicId);
    const wrap = document.createElement("div");
    if (!s) return wrap;

    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.className = "btn btn-ghost";
    backBtn.style.marginBottom = "8px";
    backBtn.textContent = "← Voltar pro progresso";
    backBtn.addEventListener("click", () => { progressoSosId = null; renderProgress(); });
    wrap.appendChild(backBtn);

    const header = document.createElement("div");
    header.className = "card official-exams-card";
    header.innerHTML = `<h2>SOS — ${escapeHtml(s.nome)}</h2>
      <p class="hint" style="margin-top:-4px;">Sessão de resgate: teoria e suas questões erradas nesse tema, tudo junto.</p>`;
    wrap.appendChild(header);

    const theoryHtml = renderTheoryBlockHtml(subtopicId);
    if (theoryHtml) {
      const theoryCard = document.createElement("div");
      theoryCard.className = "lesson-card";
      theoryCard.innerHTML = theoryHtml;
      wrap.appendChild(theoryCard);
      const content = theoryCard.querySelector(".theory-content");
      if (content) {
        content.hidden = false; // já abre expandido, é o ponto do SOS
        const seenState = loadJSON(LS_THEORY_SEEN, {});
        const chaveTeoria = theoryKey(subtopicId);
        if (!seenState[chaveTeoria]) {
          seenState[chaveTeoria] = true;
          saveJSON(LS_THEORY_SEEN, seenState);
        }
      }
    }

    const wrongGroup = computeWrongQuestions().find((g) => g.subtopicId === subtopicId);
    const errorsCard = document.createElement("div");
    errorsCard.className = "lesson-card";
    if (wrongGroup && wrongGroup.questions.length > 0) {
      errorsCard.innerHTML = `<h3>Suas questões erradas nesse tema <span class="visit-badge">${wrongGroup.questions.length} pra revisar</span></h3><div class="questions"></div>`;
      const qContainer = errorsCard.querySelector(".questions");
      wrongGroup.questions.forEach((q, idx) => {
        qContainer.appendChild(renderQuestion(null, subtopicId, q, idx, undefined, undefined, true));
      });
    } else {
      errorsCard.innerHTML = `<h3>Suas questões erradas nesse tema</h3><p class="hint">Nenhum erro pendente nesse tema agora — mandou bem!</p>`;
    }
    wrap.appendChild(errorsCard);

    return wrap;
  }

  // ---------- Achado 2: Flashcards com repetição espaçada ----------
  // Gerados a partir do banco de questões já existente (não precisa de
  // conteúdo novo: frente do card = enunciado, verso = resposta certa +
  // explicação já escrita). Algoritmo SM-2 simplificado: "Não sei" zera o
  // intervalo (reaparece amanhã, e também mais cedo NESTA sessão); "Sei"
  // avança o intervalo numa progressão fixa (1 → 3 → 7 → 15 → 30 dias).
  const FLASHCARD_NEW_PER_DAY = 20;
  const FLASHCARD_INTERVALS = [1, 3, 7, 15, 30]; // dias

  function getFlashcardState() { return loadJSON(LS_FLASHCARD_STATE, {}); }

  function addDaysISO(iso, n) {
    const d = new Date(iso + "T00:00:00");
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }

  // Cards DEDICADOS (data/flashcards.js) — frente/verso escritos especificamente
  // pra repetição espaçada (informação mínima, recall ativo), não derivados do
  // banco de questões de múltipla escolha (essa era a reclamação original: os
  // flashcards eram só repetição das questões). Cada obra obrigatória também
  // vira um card (frente = título/autor, verso = resumo + análise pelos eixos).
  function buildFlashcardPool() {
    const pool = [];
    window.SUBTOPICS.forEach((s) => {
      const cards = (window.FLASHCARDS && window.FLASHCARDS[s.id]) || [];
      cards.forEach((c) => {
        pool.push({ subtopicId: s.id, subtopicNome: s.nome, area: s.area, key: c.id, frente: c.frente, verso: c.verso });
      });
    });
    (window.OBRAS || []).forEach((o) => {
      pool.push({
        subtopicId: "obra::" + o.id,
        subtopicNome: o.titulo,
        area: "Obra — " + o.categoria,
        key: "obra::" + o.id,
        frente: `${o.titulo} — ${o.autor}`,
        verso: `${o.resumo} ${o.analiseEixos}`,
      });
    });
    return pool;
  }

  function flashcardStatusFor(key, state) {
    const st = state[key];
    if (!st) return "novo";
    return st.dueDate <= todayISO() ? "vencido" : "futuro";
  }

  function gradeFlashcard(key, knewIt) {
    const state = getFlashcardState();
    const st = state[key] || { interval: 0, reps: 0 };
    if (knewIt) {
      const idx = Math.min(st.reps, FLASHCARD_INTERVALS.length - 1);
      const interval = FLASHCARD_INTERVALS[idx];
      state[key] = { interval, reps: st.reps + 1, dueDate: addDaysISO(todayISO(), interval) };
    } else {
      state[key] = { interval: 1, reps: 0, dueDate: addDaysISO(todayISO(), 1) };
    }
    saveJSON(LS_FLASHCARD_STATE, state);
    registerStudyToday(); // revisar cards também é estudar
  }

  function renderCardsTab() {
    const container = document.getElementById("cards-content");
    container.innerHTML = "";
    container.appendChild(flashcardSession ? renderFlashcardSessionView() : renderFlashcardHome());
  }

  function renderFlashcardHome() {
    const state = getFlashcardState();
    const pool = buildFlashcardPool();
    const dueCards = pool.filter((c) => flashcardStatusFor(c.key, state) === "vencido");
    const newCards = pool.filter((c) => flashcardStatusFor(c.key, state) === "novo");
    const futureCount = pool.length - dueCards.length - newCards.length;
    const todayNewCount = Math.min(newCards.length, FLASHCARD_NEW_PER_DAY);

    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <p class="hint">Repetição espaçada: o que você erra volta antes; o que acerta vai espaçando.</p>
      <div class="card flashcard-summary-card">
        <h3>Revisão do dia</h3>
        <p class="hint" style="margin-top:-4px">${dueCards.length} pra revisar · ${todayNewCount} novos</p>
        <button type="button" class="btn btn-primary flashcard-start-btn" style="width:auto;">Estudar agora</button>
      </div>
      <h3 style="margin-top:24px;">Estudar por frente</h3>
      <div class="progress-list" id="flashcard-area-list"></div>
      <p class="hint" style="margin-top:14px;">${futureCount} em dia · ${newCards.length} novos · ${pool.length} total</p>
    `;

    wrap.querySelector(".flashcard-start-btn").addEventListener("click", () => {
      // Embaralha antes de cortar os "novos" do dia — sem isso, os cards de
      // obras (adicionados ao final de buildFlashcardPool) nunca apareceriam
      // na revisão diária até esgotar ~540 questões primeiro.
      const shuffledNew = seededShuffle(newCards, mulberry32(Date.now() % 100000));
      const queue = dueCards.concat(shuffledNew.slice(0, FLASHCARD_NEW_PER_DAY));
      if (queue.length === 0) {
        alert("Nenhum card pra revisar agora. Volte amanhã ou estude por frente específica.");
        return;
      }
      startFlashcardSession(seededShuffle(queue, mulberry32(Date.now() % 100000)));
    });

    const areaList = wrap.querySelector("#flashcard-area-list");
    // Frente sem card fica de fora. A migração dos flashcards para o banco
    // central é por frente e ainda está em curso — em Engenharia, 36 das 44
    // frentes não têm card nenhum. Listadas com "0 cards", elas viravam 36
    // linhas mortas e clicáveis que abriam sessão vazia, e a tela passava a
    // impressão de aba quebrada em vez de aba em construção.
    const comCards = window.SUBTOPICS.filter((s) => pool.some((c) => c.subtopicId === s.id));
    comCards.forEach((s) => {
      const cards = pool.filter((c) => c.subtopicId === s.id);
      const row = document.createElement("button");
      row.type = "button";
      row.className = "progress-row simulado-list-row";
      row.innerHTML = `<div class="progress-row-top"><span class="name">${escapeHtml(s.nome)}</span><span class="stat">${cards.length} cards</span></div>`;
      row.addEventListener("click", () => {
        startFlashcardSession(seededShuffle(cards, mulberry32(Date.now() % 100000)));
      });
      areaList.appendChild(row);
    });

    return wrap;
  }

  function startFlashcardSession(queue) {
    flashcardSession = { queue, index: 0, flipped: false };
    renderCardsTab();
  }

  function renderFlashcardSessionView() {
    const { queue, index, flipped } = flashcardSession;
    const wrap = document.createElement("div");

    if (index >= queue.length) {
      const doneCard = document.createElement("div");
      doneCard.className = "card";
      doneCard.style.padding = "20px";
      doneCard.innerHTML = `<h3>Sessão concluída 🎉</h3><p class="hint">Você revisou ${queue.length} card${queue.length === 1 ? "" : "s"} agora.</p>`;
      const backBtn = document.createElement("button");
      backBtn.type = "button";
      backBtn.className = "btn btn-secondary";
      backBtn.style.width = "auto";
      backBtn.style.marginTop = "12px";
      backBtn.textContent = "Voltar";
      backBtn.addEventListener("click", () => { flashcardSession = null; renderCardsTab(); });
      doneCard.appendChild(backBtn);
      wrap.appendChild(doneCard);
      return wrap;
    }

    const cardData = queue[index];

    const exitBtn = document.createElement("button");
    exitBtn.type = "button";
    exitBtn.className = "btn btn-ghost";
    exitBtn.textContent = "← Sair da sessão";
    exitBtn.addEventListener("click", () => { flashcardSession = null; renderCardsTab(); });
    wrap.appendChild(exitBtn);

    const progress = document.createElement("p");
    progress.className = "hint";
    progress.textContent = `Card ${index + 1} de ${queue.length} · ${cardData.area} · ${cardData.subtopicNome}`;
    wrap.appendChild(progress);

    const cardEl = document.createElement("div");
    cardEl.className = "flashcard";
    cardEl.innerHTML = `
      <div class="flashcard-front">${escapeHtml(cardData.frente)}</div>
      ${flipped ? `
        <div class="flashcard-back">
          <div class="flashcard-explicacao">${escapeHtml(cardData.verso)}</div>
        </div>` : ""}
    `;
    wrap.appendChild(cardEl);

    const actions = document.createElement("div");
    actions.className = "dissert-actions";
    if (!flipped) {
      const flipBtn = document.createElement("button");
      flipBtn.type = "button";
      flipBtn.className = "btn btn-primary";
      flipBtn.style.width = "auto";
      flipBtn.textContent = "Virar card";
      flipBtn.addEventListener("click", () => { flashcardSession.flipped = true; renderCardsTab(); });
      actions.appendChild(flipBtn);
    } else {
      const noBtn = document.createElement("button");
      noBtn.type = "button";
      noBtn.className = "btn btn-secondary";
      noBtn.style.width = "auto";
      noBtn.textContent = "Não sei";
      noBtn.addEventListener("click", () => gradeAndAdvanceFlashcard(cardData, false));
      actions.appendChild(noBtn);

      const yesBtn = document.createElement("button");
      yesBtn.type = "button";
      yesBtn.className = "btn btn-primary";
      yesBtn.style.width = "auto";
      yesBtn.textContent = "Sei";
      yesBtn.addEventListener("click", () => gradeAndAdvanceFlashcard(cardData, true));
      actions.appendChild(yesBtn);
    }
    wrap.appendChild(actions);

    return wrap;
  }

  function gradeAndAdvanceFlashcard(cardData, knewIt) {
    gradeFlashcard(cardData.key, knewIt);
    if (!knewIt) {
      // "Não sei" volta ainda nesta sessão (não só amanhã) — reinsere um
      // pouco à frente na fila em vez de logo em seguida.
      const reinsertAt = Math.min(flashcardSession.queue.length, flashcardSession.index + 4);
      flashcardSession.queue.splice(reinsertAt, 0, cardData);
    }
    flashcardSession.index++;
    flashcardSession.flipped = false;
    renderCardsTab();
  }

  // ---------- Achado 13: Obras obrigatórias (só FGV) ----------
  // "Capas" ilustrativas 100% originais (ícone + tipografia), sem usar
  // nenhuma imagem de capa/pintura/álbum real de terceiros — a lista de
  // obras cobre autores majoritariamente ainda protegidos por direitos
  // autorais (vida do autor + 70 anos no Brasil), então reproduzir a arte
  // real de cada uma aqui não é viável.
  // ---------- A capa tipográfica ----------
  //
  // Quarenta e duas das setenta e duas obras não têm imagem — cinema inteiro,
  // e todas as protegidas que catálogo livre não hospeda. Elas não podem
  // parecer buraco, e por isso a capa gerada precisa ser BOA, não um espaço
  // reservado com ícone no meio.
  //
  // O caminho é tipográfico, e é o que o design system permite: fundo é cor
  // chapada, nunca imagem, e o sistema não tem textura nem padrão. Então a
  // capa é cor cheia da categoria e o título grande — a gramática de
  // Fitzcarraldo e da Penguin, onde a capa é a palavra.
  //
  // A variação vem de duas coisas determinísticas, nunca de sorteio: o título
  // decide o corpo da letra (título curto ganha 30px, longo cai a 17px, e o
  // bloco nunca estoura a capa) e um hash do id decide onde o texto se apoia.
  // Determinístico importa: a mesma obra tem que ter sempre a mesma capa, ou
  // a pessoa deixa de reconhecê-la na grade.
  function capaHash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }
  function capaVariante(o) {
    return ["capa-alta", "capa-baixa", "capa-centro"][capaHash(o.id) % 3];
  }
  function capaCorpo(titulo) {
    const n = titulo.length;
    if (n <= 14) return "capa-xg";
    if (n <= 28) return "capa-g";
    if (n <= 46) return "capa-m";
    return "capa-p";
  }

  const OBRA_CATEGORIA_META = {
    "Ensaio": {
      cls: "cat-ensaio",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v3h3"/><path d="M9 9h3M9 12h6M9 15h6"/></svg>',
    },
    "Literatura": {
      cls: "cat-literatura",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5c2-1 5-1 8 1v13c-3-2-6-2-8-1z"/><path d="M20 5c-2-1-5-1-8 1v13c3-2 6-2 8-1z"/></svg>',
    },
    "Artes visuais": {
      cls: "cat-artes",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="1"/><circle cx="8.5" cy="9" r="1.5"/><path d="M3 16l5-5 4 4 3-3 6 6"/></svg>',
    },
    "Cinema": {
      cls: "cat-cinema",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l1.5-4h15L21 9"/><rect x="3" y="9" width="18" height="11" rx="1"/><path d="M3 9l3-4M9 9l3-4M15 9l3-4"/></svg>',
    },
    "Música": {
      cls: "cat-musica",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="17" r="2.5"/><circle cx="16" cy="15" r="2.5"/><path d="M9.5 17V5.5L18.5 4v11"/></svg>',
    },
  };

  // ---------- Correção por IA ----------
  //
  // A dissertativa e a redação são corrigidas pelo mesmo desenho, e por isso
  // dividem estas funções. O ponto do desenho: a IA NÃO ganha um parecer
  // separado ao lado da autoavaliação — ela preenche a MESMA grade, critério a
  // critério, e o veredito dela aparece embaixo da caixa que a pessoa marcou.
  //
  // É a divergência que ensina. Marcar "cumpri os cinco" e ver o corretor
  // reconhecer dois, com a citação do que de fato está no texto, é a correção
  // que a autoavaliação sozinha nunca dá — quem não percebe que errou é
  // justamente quem marca o critério como cumprido.
  //
  // Quem fala com o Gemini é o ia.js (módulo ES); daqui só se chama.

  function getDissertIA() { return loadJSON(LS_DISSERT_IA, {}); }
  function getRedacaoIA() { return loadJSON(LS_REDACAO_IA, {}); }

  // Quantas correções cada chave guarda. Elas moram no documento do usuário no
  // Firestore, que é cortado em 1 MiB — e ao contrário do resto do progresso
  // (uma letra por questão), cada correção tem alguns quilobytes de texto. Sem
  // teto, 60 redações mais 90 itens de dissertativa chegariam perto do limite e
  // derrubariam o sync do progresso INTEIRO, não só o da correção.
  //
  // Poda pela data: some a mais antiga. Com dez correções por dia, quarenta são
  // várias semanas de histórico, e a correção que interessa reler é sempre a
  // recente — a antiga é de um texto que já foi reescrito.
  const MAX_CORRECOES_GUARDADAS = 40;

  function salvarCorrecaoIA(chave, getter, id, correcao) {
    const estado = getter();
    estado[id] = correcao;
    const ids = Object.keys(estado);
    if (ids.length > MAX_CORRECOES_GUARDADAS) {
      ids
        .sort((a, b) => (estado[a].quando || 0) - (estado[b].quando || 0))
        .slice(0, ids.length - MAX_CORRECOES_GUARDADAS)
        .forEach((velho) => delete estado[velho]);
    }
    saveJSON(chave, estado);
  }

  // A grade guardada tem que ter o mesmo tamanho da grade atual. Quando uma
  // questão é corrigida no banco e ganha ou perde um ponto esperado, a correção
  // antiga passa a apontar para o critério errado — e um veredito preciso sobre
  // o critério errado é pior do que nenhum, porque parece confiável.
  function correcaoIAValida(correcao, pontos) {
    return Boolean(
      correcao && correcao.criterios && correcao.criterios.length === pontos.length
    );
  }

  const FAIXA_ROTULO = {
    competitiva: "Competitiva",
    precisa_ajuste: "Precisa de ajuste",
    refazer: "Vale refazer",
  };
  const VEREDITO_ROTULO = {
    cumprido: "cumpriu",
    parcial: "parcial",
    nao_cumprido: "não cumpriu",
  };

  // Quantos critérios o corretor reconheceu de fato — o número que fica ao lado
  // do que a pessoa marcou sozinha.
  function iaCumpridos(correcao) {
    if (!correcao || !correcao.criterios) return null;
    return correcao.criterios.filter((c) => c.veredito === "cumprido").length;
  }

  // O veredito de UM critério, embutido no <li> da grade.
  function vereditoIAHtml(v) {
    if (!v) return "";
    return `
      <div class="ia-veredito" data-veredito="${v.veredito}">
        <span class="ia-selo">${VEREDITO_ROTULO[v.veredito] || v.veredito}</span>
        ${v.comentario ? `<span class="ia-comentario">${escapeHtml(v.comentario)}</span>` : ""}
        ${v.evidencia ? `<blockquote class="ia-evidencia">${escapeHtml(v.evidencia)}</blockquote>` : ""}
      </div>
    `;
  }

  // Uma linha da grade: a caixa da autoavaliação e, quando existe, o veredito
  // do corretor logo abaixo. Serve às duas telas.
  function pontoGradeHtml(texto, indice, marcado, vIA) {
    return `
      <li${vIA ? ' class="com-ia"' : ""}>
        <label>
          <input type="checkbox" data-point="${indice}" ${marcado ? "checked" : ""}>
          <span>${escapeHtml(texto)}</span>
        </label>
        ${vereditoIAHtml(vIA)}
      </li>
    `;
  }

  // O cabeçalho da correção: a faixa, o erro mais caro e o que fazer depois.
  function correcaoIAResumoHtml(correcao) {
    if (!correcao) return "";
    return `
      <div class="ia-resumo" data-faixa="${correcao.faixa}">
        <div class="ia-faixa">${FAIXA_ROTULO[correcao.faixa] || correcao.faixa}</div>
        ${correcao.erroMaisCaro ? `<p class="ia-erro"><strong>O que mais custa nota:</strong> ${escapeHtml(correcao.erroMaisCaro)}</p>` : ""}
        ${correcao.oQueFazer ? `<p class="ia-fazer"><strong>Na próxima:</strong> ${escapeHtml(correcao.oQueFazer)}</p>` : ""}
        <p class="hint ia-aviso">Correção automática. Ela erra — quando discordar de um
        veredito, a grade oficial e o seu julgamento valem mais do que ela.</p>
      </div>
    `;
  }

  // O botão e a linha de recado. Fica desabilitado quando a cota do dia acabou,
  // dizendo isso — um botão que só falha ao ser clicado é pior do que um botão
  // que já avisa.
  function botaoIAHtml(temCorrecao) {
    // Três estados, e cada um diz a verdade sobre por que o botão está como
    // está. O silencioso seria pior: um botão apagado sem explicação parece
    // defeito do app, e um que só falha depois do clique gasta a paciência de
    // quem já escreveu o texto.
    if (!window.VD_IA || !window.VD_IA.pronto) {
      return `
        <div class="ia-acoes">
          <button class="btn btn-secondary ia-btn" type="button" style="width:auto" disabled>Corrigir com IA</button>
          <span class="hint ia-cota">A correção por IA ainda não foi ligada neste app.</span>
        </div>
        <p class="ia-erro-msg" hidden></p>
      `;
    }
    const restantes = window.VD_IA.restantesHoje();
    const semCota = restantes <= 0;
    return `
      <div class="ia-acoes">
        <button class="btn btn-secondary ia-btn" type="button" style="width:auto"${semCota ? " disabled" : ""}>${
          temCorrecao ? "Corrigir de novo" : "Corrigir com IA"
        }</button>
        <span class="hint ia-cota">${semCota
          ? "Você já usou as " + window.VD_IA.LIMITE_DIARIO + " correções de hoje — elas voltam amanhã."
          : restantes + " de " + window.VD_IA.LIMITE_DIARIO + " correções restantes hoje"}</span>
      </div>
      <p class="ia-erro-msg" hidden></p>
    `;
  }

  // Liga o botão. `pedir` chama o VD_IA, `guardar` grava onde for (dissertativa
  // ou redação) e `redesenhar` remonta a tela com a correção no lugar.
  function ligarBotaoIA(escopo, pedir, guardar, redesenhar) {
    const botao = escopo.querySelector(".ia-btn");
    const recado = escopo.querySelector(".ia-erro-msg");
    if (!botao) return;
    botao.addEventListener("click", async () => {
      const rotulo = botao.textContent;
      botao.disabled = true;
      botao.textContent = "Corrigindo…";
      recado.hidden = true;
      const resultado = await pedir();
      if (!resultado.ok) {
        recado.textContent = resultado.mensagem;
        recado.hidden = false;
        botao.disabled = false;
        botao.textContent = rotulo;
        return;
      }
      guardar(resultado.correcao);
      redesenhar();
    });
  }

  // ---------- Aba Redação ----------
  // A Redação é prova separada nas duas bancas: na FGV ela é uma das provas
  // discursivas do 1º dia (20 a 30 linhas, dissertativo-argumentativo em prosa)
  // e no Insper é o único componente discursivo. Por isso fica fora do sorteio
  // diário das dissertativas, em aba própria, e o usuário escolhe a proposta.
  let redacaoAbertaId = null;

  // Com 55 propostas a aba virou rolagem longa, e o filtro é por MODELO de tema
  // (pergunta binária, entre X e Y, tema abstrato...), não por assunto. O modelo
  // é o que decide como o texto abre: a pergunta pede tese na primeira linha, o
  // "entre X e Y" pede arbitragem entre dois polos legítimos, o tema nominal
  // pede recorte antes de tudo. Treinar um modelo de cada vez é o uso natural
  // disso, e é o que uma lista corrida não permite.
  let redacaoFiltroModelo = null;

  // Do mais frequente nas provas ao mais raro — a mesma ordem do cabeçalho de
  // data/redacoes.js, onde cada modelo está documentado com o enunciado real
  // que o originou.
  const REDACAO_MODELOS = [
    "pergunta binária", "pergunta disjuntiva", "entre X e Y", "tema abstrato",
    "tema-afirmação", "caso concreto", "a quem cabe", "frase-provocação",
  ];

  function getRedacaoAnswers() { return loadJSON(LS_REDACAO_ANSWERS, {}); }
  function getRedacaoChecklist() { return loadJSON(LS_REDACAO_CHECKLIST, {}); }
  function getRedacaoDone() { return loadJSON(LS_REDACAO_DONE, {}); }

  function renderRedacaoTab() {
    const container = document.getElementById("redacao-content");
    if (!container) return;
    container.innerHTML = "";
    const propostas = window.REDACOES || [];
    const done = getRedacaoDone();
    const feitas = propostas.filter((p) => done[p.id]).length;

    const cfgTrilha = (window.VD_TRILHA && window.VD_TRILHA.config()) || null;
    const redacaoUI = (cfgTrilha && cfgTrilha.redacaoUI) || {};

    const intro = document.createElement("div");
    // "card" traz só fundo e borda; o padding e o espaçamento entre cards vêm
    // de "lesson-card", que é o que as outras abas usam.
    intro.className = "lesson-card";
    intro.innerHTML = `
      <div class="lesson-eyebrow">Prova de Redação</div>
      <h2 style="margin-top:4px;">Redação em Língua Portuguesa</h2>
      <p class="lesson-desc">${redacaoUI.desc || "Texto <strong>dissertativo-argumentativo, em prosa</strong>, com coletânea de textos de apoio."}</p>
      <p class="hint">${redacaoUI.hint || ""}</p>
      <div class="dissert-counter"><strong>Propostas já treinadas:</strong> ${feitas}/${propostas.length}</div>
    `;
    container.appendChild(intro);

    // Filtro por modelo de tema. Os rótulos vêm do campo `modelo` das próprias
    // propostas, e a ordem de REDACAO_MODELOS é a das provas, não a de aparição.
    const modelos = REDACAO_MODELOS.filter((m) => propostas.some((p) => p.modelo === m));
    if (modelos.length > 1) {
      const filtro = document.createElement("div");
      filtro.className = "area-filter";
      const pill = (rotulo, valor, quantas) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "area-pill" + (redacaoFiltroModelo === valor ? " active" : "");
        b.textContent = `${rotulo} (${quantas})`;
        b.addEventListener("click", () => {
          redacaoFiltroModelo = valor;
          renderRedacaoTab();
        });
        return b;
      };
      filtro.appendChild(pill("Todos os modelos", null, propostas.length));
      modelos.forEach((m) => filtro.appendChild(pill(m, m, propostas.filter((p) => p.modelo === m).length)));
      container.appendChild(filtro);
    }

    const visiveis = redacaoFiltroModelo
      ? propostas.filter((p) => p.modelo === redacaoFiltroModelo)
      : propostas;

    visiveis.forEach((p) => {
      const card = document.createElement("div");
      card.className = "lesson-card";
      const aberta = redacaoAbertaId === p.id;
      const badge = done[p.id] ? ` <span class="visit-badge">✓ treinada</span>` : "";

      if (!aberta) {
        card.innerHTML = `
          <div class="lesson-eyebrow">Proposta${p.modelo ? " · " + escapeHtml(p.modelo) : ""} · ~${p.tempoSugerido} min</div>
          <h3 style="margin:4px 0 10px;">${escapeHtml(p.tema)}${badge}</h3>
          <button class="btn btn-secondary redacao-abrir" style="width:auto">Abrir proposta</button>
        `;
        card.querySelector(".redacao-abrir").addEventListener("click", () => {
          redacaoAbertaId = p.id;
          renderRedacaoTab();
        });
        container.appendChild(card);
        return;
      }

      const answers = getRedacaoAnswers();
      const checklist = getRedacaoChecklist();
      const keyFor = (i) => p.id + "::" + i;
      const marcados = p.pontosEsperados.filter((_, i) => checklist[keyFor(i)]).length;
      const guardada = getRedacaoIA()[p.id];
      const correcaoIA = correcaoIAValida(guardada, p.pontosEsperados) ? guardada : null;
      const vistosIA = iaCumpridos(correcaoIA);
      const pontosHtml = p.pontosEsperados.map((pt, i) =>
        pontoGradeHtml(pt, i, checklist[keyFor(i)], correcaoIA && correcaoIA.criterios[i])
      ).join("");

      card.innerHTML = `
        <div class="lesson-eyebrow">Proposta${p.modelo ? " · " + escapeHtml(p.modelo) : ""} · ~${p.tempoSugerido} min</div>
        <h3 style="margin:4px 0 10px;">${escapeHtml(p.tema)}${badge}</h3>
        <div class="q-support">${escapeHtml(p.texto_apoio)}</div>
        <div class="q-enunciado">${escapeHtml(p.comando)}</div>
        ${p.comandoInsper ? `
        <button class="btn-link redacao-toggle-insper" type="button">Ver o mesmo tema no formato do Insper</button>
        <div class="redacao-insper-wrap" hidden>
          <div class="q-enunciado">${escapeHtml(p.comandoInsper)}</div>
          <p class="hint" style="margin:0 0 8px;">A prova do Insper traz dois temas e você escolhe um. A
          questão-tema tem de ser copiada como título, o texto vai de 10 a 30 linhas (e não 20 a 30) e o
          apoio é um contexto de dois parágrafos, não uma coletânea. Redação montada com modelo pronto de
          internet é anulada pelo edital.</p>
        </div>` : ""}
        <textarea class="dissert-textarea" rows="18" placeholder="Escreva sua redação aqui (20 a 30 linhas)...">${escapeHtml(answers[p.id] || "")}</textarea>
        <div class="hint redacao-contador"></div>
        ${botaoIAHtml(Boolean(correcaoIA))}
        <button class="btn-link redacao-toggle-grade" type="button">${correcaoIA ? "Ocultar grade de correção" : "Ver grade de correção"}</button>
        <div class="redacao-grade-wrap"${correcaoIA ? "" : " hidden"}>
          <div class="dissert-gabarito-counter">${marcados}/${p.pontosEsperados.length} critérios marcados${
            vistosIA === null ? "" : ` · <span class="ia-contraste">o corretor reconheceu ${vistosIA}</span>`
          }</div>
          <p class="hint" style="margin:0 0 8px;">Releia o que você escreveu e marque os critérios que realmente
          cumpriu. Vale marcar antes de pedir a correção — a diferença entre as duas leituras é o que ensina.</p>
          ${correcaoIAResumoHtml(correcaoIA)}
          <ul class="dissert-gabarito">${pontosHtml}</ul>
        </div>
        <div class="dissert-actions">
          <button class="btn btn-primary redacao-concluir" style="width:auto">${done[p.id] ? "Marcar como não treinada" : "Marcar como treinada"}</button>
          <button class="btn btn-secondary redacao-fechar" style="width:auto">Fechar</button>
        </div>
      `;

      const textarea = card.querySelector(".dissert-textarea");
      const contador = card.querySelector(".redacao-contador");
      // Palavras, não linhas: o limite do edital é em linhas manuscritas, que
      // não têm equivalente exato aqui. ~9 palavras por linha é a referência
      // usual, então 20-30 linhas ficam por volta de 180 a 270 palavras.
      const atualizaContador = () => {
        const palavras = textarea.value.trim() ? textarea.value.trim().split(/\s+/).length : 0;
        let situacao = "";
        if (palavras > 0 && palavras < 180) situacao = " — ainda abaixo das 20 linhas";
        else if (palavras > 270) situacao = " — provavelmente acima das 30 linhas";
        else if (palavras >= 180) situacao = " — dentro da faixa esperada";
        contador.textContent = `${palavras} palavras${situacao}`;
      };
      atualizaContador();
      textarea.addEventListener("input", () => {
        const atuais = getRedacaoAnswers();
        atuais[p.id] = textarea.value;
        saveJSON(LS_REDACAO_ANSWERS, atuais);
        atualizaContador();
      });

      // Só existe nas propostas cujo tema é pergunta: as vinte questões-tema
      // publicadas pelo Insper são todas perguntas, nenhuma nominal.
      const toggleInsper = card.querySelector(".redacao-toggle-insper");
      if (toggleInsper) {
        const insperWrap = card.querySelector(".redacao-insper-wrap");
        toggleInsper.addEventListener("click", () => {
          insperWrap.hidden = !insperWrap.hidden;
          toggleInsper.textContent = insperWrap.hidden
            ? "Ver o mesmo tema no formato do Insper"
            : "Ocultar o formato do Insper";
        });
      }

      const toggle = card.querySelector(".redacao-toggle-grade");
      const gradeWrap = card.querySelector(".redacao-grade-wrap");
      toggle.addEventListener("click", () => {
        gradeWrap.hidden = !gradeWrap.hidden;
        toggle.textContent = gradeWrap.hidden ? "Ver grade de correção" : "Ocultar grade de correção";
      });

      const counterEl = card.querySelector(".dissert-gabarito-counter");
      card.querySelectorAll(".dissert-gabarito input[type=checkbox]").forEach((cb) => {
        cb.addEventListener("change", () => {
          const estado = getRedacaoChecklist();
          const k = keyFor(cb.dataset.point);
          if (cb.checked) estado[k] = true; else delete estado[k];
          saveJSON(LS_REDACAO_CHECKLIST, estado);
          const n = p.pontosEsperados.filter((_, i) => estado[keyFor(i)]).length;
          // innerHTML, e não textContent: o contador carrega junto o que o
          // corretor reconheceu, e reescrever só o número apagaria a metade que
          // dá sentido à comparação.
          counterEl.innerHTML = `${n}/${p.pontosEsperados.length} critérios marcados${
            vistosIA === null ? "" : ` · <span class="ia-contraste">o corretor reconheceu ${vistosIA}</span>`
          }`;
        });
      });

      ligarBotaoIA(
        card,
        () => window.VD_IA.corrigirRedacao({ proposta: p, texto: textarea.value }),
        (correcao) => salvarCorrecaoIA(LS_REDACAO_IA, getRedacaoIA, p.id, correcao),
        renderRedacaoTab
      );

      card.querySelector(".redacao-concluir").addEventListener("click", () => {
        const estado = getRedacaoDone();
        if (estado[p.id]) delete estado[p.id]; else estado[p.id] = true;
        saveJSON(LS_REDACAO_DONE, estado);
        renderRedacaoTab();
      });
      card.querySelector(".redacao-fechar").addEventListener("click", () => {
        redacaoAbertaId = null;
        renderRedacaoTab();
      });

      container.appendChild(card);
    });
  }

  function renderObrasTab() {
    const container = document.getElementById("obras-content");
    container.innerHTML = "";
    const obras = window.OBRAS || [];
    const studied = loadJSON(LS_OBRAS_STUDIED, {});
    const studiedCount = obras.filter((o) => studied[o.id]).length;

    // Duas listas: o que a banca da trilha cobra de fato e o que é repertório.
    // Manter tudo junto sob o rótulo "obrigatórias" daria ao candidato a
    // impressão de que precisa estudar obras que não vão cair.
    //
    // Dois campos marcam a mesma coisa por razões históricas. `complementar` é
    // o neutro e vale nas duas trilhas; `foraDoEdital2027` é o original, escrito
    // quando só existia Direito, e quer dizer "caiu de um ciclo anterior do
    // edital da FGV". Ele continua sendo lido para não obrigar a reescrever o
    // banco de Direito, onde o nome ainda é exato.
    const ehComplementar = (o) => o.complementar === true || o.foraDoEdital2027 === true;
    const obrigatorias = obras.filter((o) => !ehComplementar(o));
    const complementares = obras.filter(ehComplementar);
    const studiedObrig = obrigatorias.filter((o) => studied[o.id]).length;

    // Os rótulos vêm da trilha: a lista de Direito é a da prova de Artes da
    // FGV e a de Medicina é a leitura obrigatória da FUVEST, com justificativa
    // e nome de fonte diferentes. Estavam fixos aqui, escritos para a FGV.
    // config() devolve null enquanto a pessoa não escolheu trilha, então o
    // acesso precisa ser encadeado com cuidado — sem isto, abrir a aba antes
    // da escolha derrubaria o render inteiro.
    const cfgTrilha = (window.VD_TRILHA && window.VD_TRILHA.config()) || null;
    const obrasUI = (cfgTrilha && cfgTrilha.obrasUI) || {};
    const uiTitulo = obrasUI.titulo || "Obras obrigatórias";
    const uiHint = obrasUI.hint || "";
    const uiRodape = obrasUI.rodape || "";

    const header = document.createElement("div");
    header.innerHTML = `
      <h2>${escapeHtml(uiTitulo)}</h2>
      <p class="hint">${escapeHtml(uiHint)}</p>
      <div class="dissert-counter"><strong>${studiedObrig}/${obrigatorias.length}</strong> estudadas
      &nbsp;·&nbsp; ${escapeHtml(uiRodape)}</div>
      <div class="area-filter" id="obras-filter"></div>
    `;
    container.appendChild(header);

    const categorias = Array.from(new Set(obras.map((o) => o.categoria)));
    const filterEl = header.querySelector("#obras-filter");
    const allPill = document.createElement("button");
    allPill.type = "button";
    allPill.className = "area-pill" + (obrasFilterCategoria ? "" : " active");
    allPill.textContent = "Todas";
    allPill.addEventListener("click", () => { obrasFilterCategoria = null; renderObrasTab(); });
    filterEl.appendChild(allPill);
    categorias.forEach((cat) => {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "area-pill" + (obrasFilterCategoria === cat ? " active" : "");
      pill.textContent = cat;
      pill.addEventListener("click", () => { obrasFilterCategoria = cat; renderObrasTab(); });
      filterEl.appendChild(pill);
    });

    const aplicaFiltro = (lista) => obrasFilterCategoria
      ? lista.filter((o) => o.categoria === obrasFilterCategoria)
      : lista;

    const grid = document.createElement("div");
    grid.className = "obras-grid";
    aplicaFiltro(obrigatorias).forEach((o) => grid.appendChild(renderObraCard(o, studied)));
    container.appendChild(grid);

    const extras = aplicaFiltro(complementares);
    if (extras.length) {
      const subHeader = document.createElement("div");
      // O afastamento extra desta segunda seção mora no CSS (.obras-secao). Era
      // um style inline de 32px, e inline vence por especificidade a regra que
      // zera a margem dos filhos do wrapper — passaria por cima do contrato de
      // espaçamento da tela sem aparecer em lugar nenhum da folha de estilo.
      subHeader.className = "obras-secao";
      subHeader.innerHTML = `
        <h2>${escapeHtml(obrasUI.complementaresTitulo || "Leituras complementares")}</h2>
        <p class="hint">${escapeHtml(obrasUI.complementaresHint ||
          "Estas obras não são cobradas pela banca desta trilha, mas continuam úteis como repertório para a redação e para as questões discursivas. Priorize a lista de cima.")}</p>
      `;
      container.appendChild(subHeader);

      const gridExtras = document.createElement("div");
      gridExtras.className = "obras-grid";
      extras.forEach((o) => gridExtras.appendChild(renderObraCard(o, studied)));
      container.appendChild(gridExtras);
    }

    renderCreditosObras(container);
  }

  // ---------- Créditos das imagens das obras ----------
  //
  // Parte das capas vem do Wikimedia Commons sob CC BY ou CC BY-SA, e as duas
  // EXIGEM atribuição — não é cortesia, é condição da licença. Crédito repetido
  // em 72 cartões viraria ruído, então vai um bloco só no fim da aba, que é
  // como catálogo de museu e livro didático fazem.
  //
  // A procedência é lida do PROCEDENCIA.json que o baixar-capas.js escreve, e
  // só quando a aba abre: são poucos KB, e quem nunca entra em Obras não paga
  // por eles. Falhar em ler não pode derrubar a aba — sem o arquivo, o bloco
  // simplesmente não aparece.
  function renderCreditosObras(container) {
    fetch("assets/obras/PROCEDENCIA.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((manifesto) => {
        const itens = manifesto && manifesto.itens ? Object.values(manifesto.itens) : [];
        if (!itens.length) return;

        const bloco = document.createElement("div");
        bloco.className = "obras-creditos";
        const linhas = itens
          .slice()
          .sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"))
          .map((i) => {
            const partes = [escapeHtml(i.titulo)];
            if (i.autoria) partes.push("imagem de " + escapeHtml(i.autoria));
            partes.push(escapeHtml(i.fonte));
            if (i.licenca) partes.push(escapeHtml(i.licenca));
            return "<li>" + partes.join(" · ") + "</li>";
          })
          .join("");
        bloco.innerHTML = `
          <div class="lesson-eyebrow">Créditos das imagens</div>
          <p class="hint">As capas e reproduções vêm de catálogos públicos. Onde a licença
          exige atribuição, ela está abaixo. As licenças do Commons se referem à
          <strong>reprodução fotográfica</strong>, não à obra retratada.</p>
          <ul class="obras-creditos-lista">${linhas}</ul>`;
        container.appendChild(bloco);
      })
      .catch(() => { /* sem manifesto, sem bloco */ });
  }

  function renderObraCard(o, studied) {
    const card = document.createElement("div");
    card.className = "lesson-card obra-card" + (studied[o.id] ? " obra-studied" : "");
    const pontosChaveHtml = Array.isArray(o.pontosChave) && o.pontosChave.length
      ? `<ul class="obra-pontos-chave">${o.pontosChave.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>`
      : "";
    const contextoHtml = o.contextoHistorico
      ? `<p class="theory-resumo" style="margin-top:8px;"><strong>Contexto:</strong> ${escapeHtml(o.contextoHistorico)}</p>`
      : "";
    const cenaHtml = o.cenaOuTrechoChave
      ? `<p class="theory-resumo" style="margin-top:8px;"><strong>Cena/trecho-chave:</strong> ${escapeHtml(o.cenaOuTrechoChave)}</p>`
      : "";
    // "Eixo da banca" só faz sentido em Direito, onde a FGV organiza a lista
    // pelos seus dois eixos. Em Medicina a mesma análise vale como leitura
    // crítica, mas não corresponde a eixo declarado por banca nenhuma.
    const cfgObra = (window.VD_TRILHA && window.VD_TRILHA.config()) || null;
    const uiObra = (cfgObra && cfgObra.obrasUI) || {};
    const rotuloAnalise = uiObra.rotuloAnalise || "Análise crítica";
    // Em Medicina há DUAS listas obrigatórias, e sem marcar de qual banca é
    // cada obra o candidato que presta só uma delas leria dezoito livros
    // achando que todos caem na sua prova. Em Direito a lista é uma só e o
    // campo não existe, então nada é acrescentado.
    const nomeBanca = (uiObra.bancasNome || {})[o.banca];
    const bancaSufixo = nomeBanca ? " · " + escapeHtml(nomeBanca) : "";
    // O rótulo sai do banco em vez de ser fixo: quando faltavam as questões das
    // obras do edital 2027.1, o botão prometia cinco e abria uma div vazia.
    const bank = (window.OBRAS_QUESTOES && window.OBRAS_QUESTOES[o.id]) || [];
    const quizHtml = bank.length
      ? `<button type="button" class="btn-link obra-quiz-toggle">Praticar (${bank.length} ${bank.length === 1 ? "questão" : "questões"})</button>
      <div class="obra-questoes" hidden></div>`
      : "";
    const catMeta = OBRA_CATEGORIA_META[o.categoria] || { cls: "cat-default", icon: "" };
    // A capa gerada continua sendo o piso: ela é desenhada SEMPRE, e a imagem
    // real (quando existe em assets/obras/) entra por cima dela. Assim, obra
    // sem arquivo baixado — as de cinema, e qualquer uma que a busca não tenha
    // resolvido — não abre buraco na grade, e um arquivo corrompido ou removido
    // degrada para o desenho em vez de para o ícone de imagem quebrada. O
    // onerror some com o <img>, revelando o que está atrás.
    //
    // O caminho não leva a trilha: a imagem é indexada pelo id da OBRA, que é o
    // mesmo em Direito e em Medicina (as duas listas são idênticas). Antes eram
    // duas pastas, e a mesma obra chegou a ter capa diferente em cada trilha.
    const coverHtml = `
      <div class="obra-cover ${catMeta.cls} ${capaVariante(o)} ${capaCorpo(o.titulo)}">
        <span class="obra-capa-cat">${escapeHtml(o.categoria)}</span>
        <span class="obra-capa-titulo">${escapeHtml(o.titulo)}</span>
        <span class="obra-capa-autor">${escapeHtml(o.autor)}</span>
        <img class="obra-cover-img" alt="" loading="lazy" decoding="async"
             src="assets/obras/${encodeURIComponent(o.id)}.jpg"
             onerror="this.remove()">
      </div>
    `;
    card.innerHTML = `
      ${coverHtml}
      <div class="lesson-eyebrow">${escapeHtml(o.categoria)} · ${escapeHtml(o.origem)}${bancaSufixo}</div>
      <h3>${escapeHtml(o.titulo)}</h3>
      <p class="lesson-desc" style="margin-bottom:8px;">${escapeHtml(o.autor)}</p>
      <button type="button" class="btn-link obra-toggle">Ver resumo e análise</button>
      <div class="obra-detail" hidden>
        <p>${escapeHtml(o.resumo)}</p>
        ${contextoHtml}
        ${pontosChaveHtml}
        ${cenaHtml}
        <p class="theory-resumo" style="margin-top:8px;"><strong>${escapeHtml(rotuloAnalise)}:</strong> ${escapeHtml(o.analiseEixos)}</p>
      </div>
      ${quizHtml}
      <label class="obra-studied-check">
        <input type="checkbox" ${studied[o.id] ? "checked" : ""}> Já estudei essa obra
      </label>
    `;
    card.querySelector(".obra-toggle").addEventListener("click", () => {
      card.querySelector(".obra-detail").hidden = !card.querySelector(".obra-detail").hidden;
    });
    const quizBtn = card.querySelector(".obra-quiz-toggle");
    const quizContainer = card.querySelector(".obra-questoes");
    if (quizBtn) quizBtn.addEventListener("click", () => {
      if (!quizContainer.hidden) {
        quizContainer.hidden = true;
        return;
      }
      if (!quizContainer.dataset.built) {
        bank.forEach((q, idx) => {
          quizContainer.appendChild(renderQuestion(null, "obra::" + o.id, q, idx, undefined, undefined, true));
        });
        quizContainer.dataset.built = "1";
      }
      quizContainer.hidden = false;
    });
    card.querySelector(".obra-studied-check input").addEventListener("change", (e) => {
      const state = loadJSON(LS_OBRAS_STUDIED, {});
      if (e.target.checked) state[o.id] = true; else delete state[o.id];
      saveJSON(LS_OBRAS_STUDIED, state);
      renderObrasTab();
    });
    return card;
  }

  // ---------- Aba Caderno de Erros ----------

  // Para cada frente, filtra as questões do banco cuja última resposta
  // salva existe e é diferente do gabarito — cobre erros de dias normais E
  // de simulados (mesma chave subtopicId::questionId em ambos os casos).
  function computeWrongQuestions() {
    const answers = getAnswers();
    const groups = [];
    window.SUBTOPICS.forEach((s) => {
      const bank = (window.QUESTION_BANKS && window.QUESTION_BANKS[s.id]) || [];
      const wrong = bank.filter((q) => {
        const chosen = answers[answerKey(s.id, q.id)];
        return chosen && chosen !== q.resposta;
      });
      if (wrong.length > 0) {
        groups.push({ subtopicId: s.id, nome: s.nome, area: s.area, questions: wrong });
      }
    });
    return groups;
  }

  function renderErrosTab() {
    const container = document.getElementById("erros-content");
    container.innerHTML = "";
    const groups = computeWrongQuestions();
    const total = groups.reduce((sum, g) => sum + g.questions.length, 0);

    const header = document.createElement("div");
    header.innerHTML = `
      <p class="hint">Toda questão que você já respondeu errado — em qualquer dia normal ou
      simulado — aparece aqui pra você treinar de novo. Responder certo não some a questão na
      hora: ela continua na tela com a explicação, e só deixa de aparecer da próxima vez que você
      abrir esta aba.</p>
      <div class="dissert-counter" id="erros-counter"><strong>${total}</strong> questõe${total === 1 ? "" : "s"} pra revisar</div>
    `;
    container.appendChild(header);

    if (total === 0) {
      const empty = document.createElement("p");
      empty.className = "hint";
      empty.textContent = "Nenhum erro pendente agora. Continue estudando!";
      container.appendChild(empty);
      return;
    }

    groups.forEach((g) => {
      const card = document.createElement("div");
      card.className = "lesson-card";
      card.innerHTML = `
        <div class="lesson-eyebrow">${escapeHtml(g.area)}</div>
        <h3>${escapeHtml(g.nome)} <span class="visit-badge">${g.questions.length} pra revisar</span></h3>
        <div class="questions"></div>
      `;
      const qContainer = card.querySelector(".questions");
      g.questions.forEach((q, idx) => {
        qContainer.appendChild(
          renderQuestion(null, g.subtopicId, q, idx, undefined, updateErrosCounter, true)
        );
      });
      container.appendChild(card);
    });
  }

  // Só atualiza o contador do topo — a lista em si não é reconstruída ao
  // responder (decisão de UX: a questão continua visível com o feedback até
  // a aba ser reaberta), então o contador conta de novo a partir do estado
  // atual sem remover nenhum cartão da tela.
  function updateErrosCounter() {
    const counter = document.getElementById("erros-counter");
    if (!counter) return;
    const total = computeWrongQuestions().reduce((sum, g) => sum + g.questions.length, 0);
    counter.innerHTML = `<strong>${total}</strong> questõe${total === 1 ? "" : "s"} pra revisar`;
  }

  // ==================== BUSCA DE QUESTÕES ====================
  //
  // O problema que isto resolve: até aqui, toda questão chegava ao aluno pelo
  // caminho que o app escolhia — o dia do cronograma, o simulado, o caderno de
  // erros. Não havia como dizer "quero treinar crase agora", e com 3.102
  // questões nas duas trilhas isso deixava a maior parte do acervo fora de
  // alcance sob demanda.
  //
  // POR QUE O ÍNDICE É CONSTRUÍDO EM RUNTIME, E NÃO GRAVADO NAS QUESTÕES
  //
  // A rota convencional (a do Qconcursos) é gravar as tags de assunto em cada
  // questão por um script offline. Medido aqui: montar o índice invertido
  // inteiro custa ~250 ms para 430 mil tokens, uma vez, e só quando a aba abre.
  // O Qconcursos precisa de tags persistidas porque tem 2,8 milhões de questões
  // e um servidor; a 3.102 questões no navegador, indexar em runtime é
  // estritamente melhor — dispensa migrar 3.102 arquivos, dispensa rebuild do
  // bundle, e faz de assuntos.js a única fonte de verdade (corrigir um sinônimo
  // tem efeito na hora, sem regerar nada).

  let buscaIndice = null;      // { termo -> Set<docId> }
  let buscaDocs = null;        // [{ trilha, frente, frenteNome, area, q, enunciado }]
  let buscaSecundariaEstado = "nao-iniciada"; // nao-iniciada | carregando | pronta | falhou
  let buscaExtraEstado = "nao-iniciada";      // idem, para o banco complementar
  // Um ARRAY, e não um objeto: são todas as outras trilhas, não "a outra". Com
  // duas trilhas no ar isso dava na mesma; com a terceira (Economia) a versão
  // antiga indexava a primeira de VD_TRILHAS.outras() e descartava o resto em
  // silêncio — sem erro, sem aviso, só resultados que não apareciam.
  let buscaSecundariaDados = null;            // [{ trilha, SUBTOPICS, QUESTION_BANKS, QUESTION_TEXTS }]
  let buscaSecundariaFalhas = [];             // ids das trilhas que não carregaram
  let buscaExtraDados = null;

  // O identificador de "trilha" do banco complementar. NÃO é uma trilha de
  // VD_TRILHAS de propósito: é justamente por não estar lá que ele fica fora do
  // progresso e do caderno de erros (ver buscaMontarDocs e buscaSubtopicId).
  const BUSCA_TRILHA_EXTRA = "extra";
  let buscaConsulta = "";
  let buscaAssuntoId = null;   // assunto escolhido na sugestão (null = texto livre)
  let buscaFiltroFrente = null;
  let buscaFiltroFormato = null; // null | "direta" | "escada" | "lacunas" | "vf" | "excecao"
  let buscaFiltroStatus = null;  // null | "nova" | "errei" | "acertei"

  // Rótulos do campo `formato`, preenchido em todas as questões por
  // tag-formato.ps1 mas até aqui sem nenhum consumidor no app. O próprio script
  // diz para que ele existe: é o filtro para treinar um formato específico, que
  // é o que separa as duas bancas — a FGV usa escada em um terço do bloco de
  // Humanas e a Insper não usou nenhuma nos 120 itens lidos, preferindo o item
  // de duas lacunas. Quem treina para uma das duas quer poder isolar isso.
  const BUSCA_FORMATO_LABELS = {
    direta: "Pergunta direta",
    escada: "Asserções I/II/III",
    lacunas: "Duas lacunas",
    vf: "Verdadeiro/falso",
    excecao: "Assinale a incorreta",
  };

  // Sem acento e em minúscula. Não é refinamento: o aluno digita "funcao
  // quadratica" no celular, e sem isto a busca devolveria zero.
  function buscaNormalizar(s) {
    return (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  // Tokeniza por palavra inteira. Descartar tokens de 1-2 caracteres corta o
  // grosso do ruído ("de", "a", "os") sem lista de stopwords.
  function buscaTokens(texto) {
    return buscaNormalizar(texto).match(/[a-z0-9]+/g) || [];
  }

  // Plural simples do português. O dicionário escreve "figura de linguagem" e
  // a questão diz "figuras" — resolver isso aqui evita ter que listar as duas
  // formas em cada um dos ~1.000 termos de assuntos.js.
  function buscaRadical(t) {
    if (t.length > 4 && t.endsWith("es")) return t.slice(0, -2);
    if (t.length > 3 && t.endsWith("s")) return t.slice(0, -1);
    return t;
  }

  // Junta o banco da trilha ativa com o da secundária (quando já carregado) num
  // vetor único de documentos. `subtopicId` das questões da outra trilha ganha
  // prefixo — ver o comentário em buscaSubtopicId.
  function buscaMontarDocs(secundarias, extra) {
    const docs = [];
    // A MESMA questão não pode entrar duas vezes no índice.
    //
    // Os quatro bancos SE SOBREPÕEM por construção. Todos são gerados do banco
    // central (banco-central/build-trilhas.js), que tem 5.332 questões, e cada
    // trilha leva o recorte que serve ao seu vestibular: Direito e Economia
    // levam as 5.332, Medicina 5.232, Engenharia 2.894. Uma questão de
    // interpretação de texto serve aos quatro cursos e está nos quatro
    // arquivos -- é a mesma questão, não quatro. Sem esta trava a busca
    // devolveria cada uma até quatro vezes, com quatro rótulos de trilha.
    //
    // A chave é ORIGEM + id, e não o id sozinho: antes dos ids prefixados,
    // "interpretacao-texto-01" existia em Direito E em Medicina sendo duas
    // questões DIFERENTES, e o mesmo valia para geografia-01, gramatica-01,
    // ingles-01 e literatura-01. Deduplicar só por id apagaria 1.022 questões
    // legítimas -- medido, não suposto.
    //
    // `origem` é gravado em cada questão pelo banco central e diz para qual
    // curso ela foi escrita. É ele que faz a cópia apontar para a questão
    // original em vez de para o arquivo em que ela foi lida: a cópia que
    // Economia carrega da questão de Direito colide com a de Direito, como
    // deve, e não com a de Medicina que por acaso tenha o mesmo id.
    //
    // ATENÇÃO ao renomear este campo. Ele se chamava `origemTrilha` quando o
    // bundle de Economia era composto por vestibular-economia/build-bundle.js;
    // a migração para o banco central rebatizou-o de `origem` e esta chave
    // continuou lendo o nome antigo. Como `q.origemTrilha` era undefined em
    // 100% das questões, a chave caía sempre no `trilhaId` e nenhuma cópia era
    // reconhecida: o índice inchou de 6.466 documentos para 19.924, cada
    // resultado da busca aparecia repetido até três vezes e o auditor de piso
    // media alcance triplicado.
    //
    // Quem absorve primeiro vence, e quem absorve primeiro é a trilha ativa --
    // a atribuição certa: a questão pertence ao curso de quem está buscando.
    const vistos = new Set();
    function absorver(trilhaId, subtopics, banks, textos) {
      (subtopics || []).forEach((s) => {
        const bank = (banks && banks[s.id]) || [];
        bank.forEach((q) => {
          const chave = (q.origem || trilhaId) + "::" + q.id;
          if (vistos.has(chave)) return;
          vistos.add(chave);
          docs.push({
            trilha: trilhaId,
            // `frente` é a matéria-pai e `subtema` é a unidade de estudo. Os
            // dois níveis são precisos aqui: as facetas e o dicionário de
            // assuntos raciocinam por matéria (14 botões, não 79), enquanto a
            // resposta é gravada na chave do subtema, que é a mesma que o
            // estudo diário usa — sem isso a questão teria dois históricos.
            frente: s.frenteId,
            frenteNome: s.area,
            subtema: s.id,
            subtemaNome: s.nome,
            area: s.areaGrande || s.area,
            q: q,
            // O mapa de textos compartilhados vem junto com o banco — ver
            // buscaTextoApoio para o porquê de não bastar o global.
            textos: textos || {},
          });
        });
      });
    }
    absorver(TRILHA, window.SUBTOPICS, window.QUESTION_BANKS, window.QUESTION_TEXTS);
    // `secundarias` chega como lista porque podem ser várias — e vazia ou nula
    // quando nenhuma carregou ainda, que é o caso da primeira indexação.
    (secundarias || []).forEach((s) => {
      absorver(s.trilha, s.SUBTOPICS, s.QUESTION_BANKS, s.QUESTION_TEXTS);
    });
    // O banco complementar entra como uma "trilha" que não existe em
    // VD_TRILHAS, e é isso que o mantém só aqui: buscaSubtopicId devolve
    // "xt::extra::<frente>" para ele, um id que não está em window.SUBTOPICS e
    // portanto é invisível para computeWrongQuestions() e renderProgress(). A
    // questão continua respondível com feedback normal na busca, sem contaminar
    // o Caderno de Erros nem o progresso — mesmo desenho já usado para a trilha
    // secundária. As questões dele não usam textoId (o texto de apoio vem
    // embutido em cada uma), então o mapa de textos vai vazio de propósito.
    if (extra) absorver(BUSCA_TRILHA_EXTRA, extra.SUBTOPICS, extra.QUESTION_BANKS, null);
    return docs;
  }

  // O texto de apoio de um documento da busca.
  //
  // Por que não dá para usar resolveSupportText aqui: ele lê o global
  // window.QUESTION_TEXTS, que é SEMPRE o da trilha ativa. carregarSecundaria
  // (trilhas.js) devolve os globais ao estado original depois de colher o banco
  // da outra trilha — é o que mantém "uma trilha por sessão" válido para o
  // resto do app. Só que a busca é justamente o lugar que mistura as duas, e o
  // resultado era que toda questão da trilha secundária com `textoId` entrava
  // no índice sem o texto compartilhado.
  //
  // Medido antes desta correção: 255 questões em Medicina e 180 em Direito,
  // ~10% de cada banco, e o efeito se concentrava em Inglês, onde o texto de
  // apoio É a questão — "Vocabulário em contexto" caía de 79 para 38 alcances,
  // e três assuntos ficavam abaixo do piso de 25 só por isso.
  //
  // Não havia troca de texto, só ausência: os ids das duas trilhas não colidem
  // (med-bio-t1 contra ing-c01-t1), então o `[textoId]` dava undefined.
  function buscaTextoApoio(doc) {
    const q = doc && doc.q;
    if (!q) return "";
    if (q.texto_apoio) return q.texto_apoio;
    if (!q.textoId) return "";
    const t = doc.textos[q.textoId];
    return (t && t.conteudo) || "";
  }

  // Questões da outra trilha respondem por um subtopicId prefixado.
  //
  // Isso não é cosmético: computeWrongQuestions() e renderProgress() iteram
  // window.SUBTOPICS e indexam window.QUESTION_BANKS[s.id]. Um id que não está
  // em SUBTOPICS é, por construção, invisível para as estatísticas — a questão
  // continua respondível e com feedback normal, mas não entra no Caderno de
  // Erros nem no progresso por frente da trilha que o aluno estuda. Sem isso,
  // uma questão de Biologia contaminaria as estatísticas de quem faz Direito.
  function buscaSubtopicId(doc) {
    return doc.trilha === TRILHA ? doc.subtema : "xt::" + doc.trilha + "::" + doc.subtema;
  }

  // Constrói o índice invertido. Roda uma vez por estado do banco: se a trilha
  // secundária chegar depois, é chamada de novo com o conjunto completo.
  function buscaConstruirIndice(secundarias, extra) {
    const t0 = performance.now();
    buscaDocs = buscaMontarDocs(secundarias, extra);
    buscaIndice = new Map();

    buscaDocs.forEach((doc, id) => {
      const q = doc.q;
      // O enunciado fica guardado à parte porque o ranking pesa acerto no
      // enunciado acima de acerto na explicação — ver buscaPontuar.
      doc.enunciado = buscaNormalizar(q.enunciado || "");
      const texto = [
        q.enunciado,
        buscaTextoApoio(doc),
        Object.values(q.alternativas || {}).join(" "),
        q.explicacao,
      ].join(" ");

      const vistos = new Set();
      buscaTokens(texto).forEach((tok) => {
        if (tok.length < 3) return;
        const r = buscaRadical(tok);
        if (vistos.has(r)) return;
        vistos.add(r);
        let posting = buscaIndice.get(r);
        if (!posting) { posting = new Set(); buscaIndice.set(r, posting); }
        posting.add(id);
      });
    });

    console.info(
      "[busca] índice: " + buscaDocs.length + " questões, " +
      buscaIndice.size + " termos, " + Math.round(performance.now() - t0) + " ms"
    );
  }

  // Candidatos para um termo do dicionário ou da consulta.
  //
  // Termo de uma palavra: é só a posting list. Termo de várias: intersecta as
  // posting lists e depois CONFIRMA a frase nos poucos candidatos que sobraram,
  // com fronteira de palavra. Sem essa confirmação, "função quadrática" casaria
  // qualquer questão que mencionasse "função" e "quadrática" em frases
  // distintas.
  function buscaCandidatos(termo) {
    const toks = buscaTokens(termo).filter((t) => t.length >= 3).map(buscaRadical);
    if (toks.length === 0) return null;

    let acc = null;
    for (const t of toks) {
      const posting = buscaIndice.get(t);
      if (!posting) return new Set();
      acc = acc === null ? new Set(posting) : new Set([...acc].filter((id) => posting.has(id)));
      if (acc.size === 0) return acc;
    }
    if (toks.length === 1) return acc;

    // Confirmação da frase. Substring seria mais simples e é justamente o erro:
    // medido no banco, "mol" como pedaço casa 176 questões, das quais 146 são
    // "molécula" e "molar".
    const alvo = buscaNormalizar(termo).trim();
    const rx = new RegExp("\\b" + alvo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), "i");
    return new Set([...acc].filter((id) => {
      const doc = buscaDocs[id];
      const q = doc.q;
      const full = buscaNormalizar([
        q.enunciado, buscaTextoApoio(doc),
        Object.values(q.alternativas || {}).join(" "), q.explicacao,
      ].join(" "));
      return rx.test(full);
    }));
  }

  // Peso de um resultado. Acerto no enunciado vale mais do que acerto na
  // explicação: uma questão QUE É sobre crase diz "crase" no enunciado; uma que
  // só menciona crase de passagem na explicação é resultado fraco. Sem isto, os
  // assuntos de termos genéricos (as classes de palavras aparecem na explicação
  // de quase toda questão de gramática) afogariam os bons resultados.
  function buscaPontuar(doc, termos, ehDaTrilhaAtiva) {
    let peso = ehDaTrilhaAtiva ? 10 : 0; // a trilha do aluno vem primeiro
    termos.forEach((termo) => {
      const alvo = buscaNormalizar(termo).trim();
      const rx = new RegExp("\\b" + alvo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), "i");
      if (rx.test(doc.enunciado)) peso += 8;
    });
    if (doc.q.dificuldade === "dificil") peso += 1;
    return peso;
  }

  // Aplica buscaRadical palavra por palavra, para comparar frases pelo radical.
  //
  // É o que faz "transgênicos" encontrar o termo "transgenico". O MOTOR de
  // busca resolve plural desde sempre; só o autocomplete comparava as strings
  // cruas — duas regras diferentes para a mesma palavra, na mesma tela, e a
  // diferença aparecia como "esse assunto não existe".
  function buscaRadicalFrase(s) {
    return buscaNormalizar(s).replace(/[a-z0-9]+/g, (t) => buscaRadical(t));
  }

  // Sugestões de assunto para o que está sendo digitado. É esta lista que
  // responde ao pedido original ("o assunto exato que quero estudar"): o aluno
  // deixa de ter que adivinhar qual palavra o banco usa.
  function buscaSugerirAssuntos(consulta, limite) {
    const n = buscaNormalizar(consulta).trim();
    if (n.length < 2) return [];
    const nr = buscaRadicalFrase(consulta).trim();
    const frentesVivas = new Set((buscaDocs || []).map((d) => d.frente));
    // Fronteira nos DOIS lados. Só no início não basta: "\barte" casa o começo
    // de "arterial", que foi exatamente como "Fisiologia humana" apareceu ao se
    // digitar "arte". Digitação parcial não perde nada com isso — quem escreve
    // "quadrat" ou "estequi" é atendido pelos degraus de cima, que comparam
    // contra o NOME do assunto; este degrau existe para a palavra inteira que
    // aparece no meio de um termo ("vértice" dentro de Função quadrática).
    const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
    const rxPalavra = new RegExp("\\b" + escapar(n) + "\\b");
    const rxPalavraRad = new RegExp("\\b" + escapar(nr) + "\\b");
    const pontuados = [];
    (window.ASSUNTOS || []).forEach((a) => {
      if (!a.frentes.some((f) => frentesVivas.has(f))) return;
      const nome = buscaNormalizar(a.nome);
      const nomeRad = buscaRadicalFrase(a.nome);
      let p = 0;
      if (nome.startsWith(n) || nomeRad.startsWith(nr)) p = 100;
      else if (nome.indexOf(n) !== -1 || nomeRad.indexOf(nr) !== -1) p = 60;
      else if (a.termos.some((t) => buscaNormalizar(t).startsWith(n) ||
                                    buscaRadicalFrase(t).startsWith(nr))) p = 40;
      // O `id` não é sinônimo escrito à mão — é o nome interno do registro. Mas
      // foi escolhido por quem sabia do que o assunto trata, e às vezes é
      // exatamente a palavra que o aluno digita: "climatologia" é o id de
      // "Clima e domínios naturais", e antes disto digitar a palavra inteira,
      // certa, e igual ao id não sugeria nada.
      else if (rxPalavraRad.test(buscaRadicalFrase(a.id.replace(/-/g, " ")))) p = 30;
      // Fronteira de palavra, e não `indexOf`, no degrau mais baixo. Com
      // substring, digitar "arte" sugeria "Fisiologia humana" — o pedaço está
      // dentro de "pressão ARTErial". A sugestão errada é pior que sugestão
      // nenhuma: ela ocupa a vaga de uma certa e manda o aluno para a frente
      // errada. O motor de busca já casa por palavra inteira; aqui era o único
      // ponto que ainda não casava.
      else if (a.termos.some((t) => rxPalavra.test(buscaNormalizar(t)) ||
                                    rxPalavraRad.test(buscaRadicalFrase(t)))) p = 20;
      if (p > 0) pontuados.push({ assunto: a, peso: p });
    });
    pontuados.sort((x, y) => y.peso - x.peso || x.assunto.nome.localeCompare(y.assunto.nome));
    return pontuados.slice(0, limite || 6).map((x) => x.assunto);
  }

  // A busca em si.
  //
  // Dois modos. Com assunto escolhido, procura por TODOS os sinônimos dele,
  // restritos às frentes daquele assunto — é o escopo por frente que impede
  // "mol" de Química casar com questões de Biologia, e é o que faz "função
  // quadrática" sair de zero para as questões que só falam em parábola e
  // vértice. Sem assunto, procura o texto digitado, em todas as frentes.
  function buscarQuestoes() {
    if (!buscaIndice) return { resultados: [], assunto: null };

    const assunto = buscaAssuntoId
      ? (window.ASSUNTOS || []).find((a) => a.id === buscaAssuntoId)
      : null;
    const termos = assunto ? assunto.termos : [buscaConsulta];
    const escopo = assunto ? new Set(assunto.frentes) : null;

    const ids = new Set();
    termos.forEach((termo) => {
      const c = buscaCandidatos(termo);
      if (c) c.forEach((id) => ids.add(id));
    });

    // Duas passadas, e a ordem importa.
    //
    // Primeiro o conjunto BASE: tudo que casa a consulta e passa pelo filtro de
    // status. É dele que saem as facetas — os botões de frente e de formato só
    // oferecem o que existe ali. Um filtro que devolve zero é pior do que um
    // filtro ausente: o aluno clica, some tudo, e não sabe se errou a busca ou
    // se o banco não tem. Oferecendo só o alcançável, isso não acontece.
    //
    // Depois os filtros de faceta, que produzem o resultado exibido.
    const answers = getAnswers();
    const base = [];
    ids.forEach((id) => {
      const doc = buscaDocs[id];
      // O escopo do assunto casa por matéria OU por tema. Aceitar os dois
      // níveis deixa o dicionário ser tão específico quanto o assunto merece:
      // "função quadrática" pertence a matematica-algebra, não a Matemática
      // inteira, e restringir ao tema certo tira do resultado as questões de
      // geometria que só mencionam a palavra "função".
      if (escopo && !escopo.has(doc.frente) && !escopo.has(doc.subtema)) return;

      if (buscaFiltroStatus) {
        const escolhida = answers[answerKey(buscaSubtopicId(doc), doc.q.id)];
        if (buscaFiltroStatus === "nova" && escolhida) return;
        if (buscaFiltroStatus === "errei" && (!escolhida || escolhida === doc.q.resposta)) return;
        if (buscaFiltroStatus === "acertei" && escolhida !== doc.q.resposta) return;
      }
      base.push(doc);
    });

    // Filtro órfão: trocar a consulta pode deixar um filtro apontando para algo
    // que sumiu — buscar "crase" com a frente "Biologia" ainda ligada não
    // devolveria nada, e o botão que explicaria isso nem estaria na tela. A
    // checagem vem ANTES das facetas e do filtro: feita depois, a tela ainda
    // erraria por um render, mostrando o zero antes de se corrigir.
    if (buscaFiltroFrente && !base.some((d) => d.frente === buscaFiltroFrente)) {
      buscaFiltroFrente = null;
    }
    if (buscaFiltroFormato && !base.some((d) => (d.q.formato || "direta") === buscaFiltroFormato)) {
      buscaFiltroFormato = null;
    }

    // Cada faceta conta com os OUTROS filtros já aplicados, nunca com o seu
    // próprio. Contar as duas sobre o mesmo conjunto cru produz um botão que
    // mente: com "Gramática" ligado, o formato "Duas lacunas" anunciava 7
    // resultados — as 7 do banco inteiro — e entregava zero, porque Gramática
    // não tem nenhuma. O botão prometia e não cumpria.
    const facetaFrentes = new Map();  // frente  -> { id, nome, total } | conta com o formato aplicado
    const facetaFormatos = new Map(); // formato -> total               | conta com a frente aplicada
    base.forEach((doc) => {
      const fmt = doc.q.formato || "direta";
      if (!buscaFiltroFormato || fmt === buscaFiltroFormato) {
        const f = facetaFrentes.get(doc.frente) || { id: doc.frente, nome: doc.frenteNome, total: 0 };
        f.total += 1;
        facetaFrentes.set(doc.frente, f);
      }
      if (!buscaFiltroFrente || doc.frente === buscaFiltroFrente) {
        facetaFormatos.set(fmt, (facetaFormatos.get(fmt) || 0) + 1);
      }
    });

    const resultados = base
      .filter((doc) => {
        if (buscaFiltroFrente && doc.frente !== buscaFiltroFrente) return false;
        if (buscaFiltroFormato && (doc.q.formato || "direta") !== buscaFiltroFormato) return false;
        return true;
      })
      .map((doc) => ({ doc: doc, peso: buscaPontuar(doc, termos, doc.trilha === TRILHA) }));

    resultados.sort((a, b) => b.peso - a.peso);
    return {
      resultados: resultados,
      assunto: assunto,
      frentes: Array.from(facetaFrentes.values()).sort((a, b) => b.total - a.total),
      formatos: facetaFormatos,
    };
  }

  // ---------- Aba Buscar (UI) ----------

  const BUSCA_PAGINA = 20; // resultados por lote
  let buscaVisiveis = BUSCA_PAGINA;

  // O corpo da aba é montado UMA vez. Redesenhar tudo a cada tecla tiraria o
  // foco do campo no meio da digitação — só a área de resultados é reconstruída.
  function renderBuscarTab() {
    const container = document.getElementById("buscar-content");
    if (container.dataset.montado === "1") {
      renderBuscaResultados();
      return;
    }
    container.dataset.montado = "1";
    container.innerHTML = `
      <p class="hint">Procure pelo assunto que você quer treinar agora — "crase", "função quadrática",
      "genética". A busca cobre as duas trilhas: as frentes de Linguagens, Matemática e Humanas se
      repetem entre Direito e Medicina, e uma questão de crase é a mesma questão de crase nos dois
      cursos.</p>
      <input id="busca-input" class="busca-input" type="search" autocomplete="off"
             placeholder="Digite um assunto ou uma palavra do enunciado">
      <div id="busca-sugestoes" class="busca-sugestoes"></div>
      <div id="busca-filtros"></div>
      <div id="busca-status" class="hint busca-status"></div>
      <div id="busca-resultados"></div>
    `;

    const input = container.querySelector("#busca-input");
    input.value = buscaConsulta;

    // Debounce: sem ele, cada tecla dispara uma varredura completa do índice.
    let timer = null;
    input.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        buscaConsulta = input.value.trim();
        buscaAssuntoId = null; // digitar de novo abandona o assunto escolhido
        buscaVisiveis = BUSCA_PAGINA;
        renderBuscaSugestoes();
        renderBuscaResultados();
      }, 150);
    });

    buscaGarantirIndice();
  }

  // Constrói o índice na primeira abertura e dispara o carregamento da outra
  // trilha. As duas coisas são preguiçosas de propósito: quem nunca abre a aba
  // não paga nem os ~250 ms de indexação nem os 390 KB do outro banco.
  function buscaGarantirIndice() {
    if (!buscaIndice) buscaConstruirIndice(null, null);
    renderBuscaResultados(); // renderiza também os filtros, com as facetas do resultado

    // As duas fontes extras chegam por rede e em qualquer ordem, então cada
    // chegada reindexa com TUDO o que já chegou — reindexar só com a própria
    // apagaria a outra do índice.
    function reindexar() {
      buscaConstruirIndice(buscaSecundariaDados, buscaExtraDados);
      atualizarBuscaStatus();
      renderBuscaResultados();
    }

    if (buscaExtraEstado === "nao-iniciada") {
      if (window.VD_TRILHA && window.VD_TRILHA.carregarExtra) {
        buscaExtraEstado = "carregando";
        window.VD_TRILHA.carregarExtra().then((colhido) => {
          buscaExtraEstado = "pronta";
          buscaExtraDados = colhido;
          reindexar();
        }).catch((err) => {
          console.warn("[busca] banco complementar indisponível:", err);
          buscaExtraEstado = "falhou";
          atualizarBuscaStatus();
        });
      } else {
        buscaExtraEstado = "pronta";
      }
    }

    if (buscaSecundariaEstado !== "nao-iniciada") return;
    const outras = (window.VD_TRILHA && window.VD_TRILHA.outras()) || [];
    if (outras.length === 0 || !window.VD_TRILHA.carregarSecundaria) {
      buscaSecundariaEstado = "pronta";
      return;
    }
    buscaSecundariaEstado = "carregando";
    atualizarBuscaStatus();

    // UMA DE CADA VEZ, e não Promise.all. carregarSecundaria (trilhas.js)
    // guarda os globais de dados, deixa o script da outra trilha sobrescrevê-los,
    // colhe o que ele escreveu e devolve os originais. Duas dessas em paralelo
    // se atropelam: a segunda guardaria como "original" o banco que a primeira
    // acabou de escrever, e a sessão terminaria com o banco de outra trilha no
    // lugar do da pessoa — em toda a aba Hoje, não só na busca.
    const colhidos = [];
    buscaSecundariaFalhas = [];

    outras.reduce((fila, id) => fila.then(() => (
      window.VD_TRILHA.carregarSecundaria(id).then((colhido) => {
        colhidos.push({
          trilha: id,
          SUBTOPICS: colhido.SUBTOPICS,
          QUESTION_BANKS: colhido.QUESTION_BANKS,
          // carregarSecundaria já colhe QUESTION_TEXTS (é um dos três
          // GLOBAIS_DE_DADOS de trilhas.js) — só não estava sendo repassado, e
          // era esse o buraco que buscaTextoApoio descreve.
          QUESTION_TEXTS: colhido.QUESTION_TEXTS,
        });
        // Reindexa a cada chegada: com três trilhas a espera vira soma, e não
        // faz sentido segurar os resultados da segunda até a terceira responder.
        buscaSecundariaDados = colhidos;
        reindexar();
      }).catch((err) => {
        // Uma trilha que falha não leva as outras junto.
        console.warn("[busca] trilha secundária indisponível (" + id + "):", err);
        buscaSecundariaFalhas.push(id);
      })
    )), Promise.resolve()).then(() => {
      // Degradar, não quebrar: se ao menos uma entrou, a busca está pronta e o
      // status conta o que ficou de fora. Só é "falhou" quando nenhuma entrou.
      buscaSecundariaEstado = colhidos.length > 0 ? "pronta" : "falhou";
      buscaSecundariaDados = colhidos;
      atualizarBuscaStatus();
    });
  }

  function atualizarBuscaStatus() {
    const el = document.getElementById("busca-status");
    if (!el) return;
    // O texto conta quantas trilhas são de verdade: com três no ar, "a outra
    // trilha" no singular seria mentira, e "buscando só na sua" também, quando
    // uma das duas entrou e a outra não.
    const nomeDe = (id) => (window.VD_TRILHAS && window.VD_TRILHAS[id] ? window.VD_TRILHAS[id].nome : id);
    const restantes = (window.VD_TRILHA && window.VD_TRILHA.outras()) || [];

    if (buscaSecundariaEstado === "carregando") {
      el.textContent = restantes.length > 1
        ? "Carregando também os bancos das outras trilhas…"
        : "Carregando também o banco da outra trilha…";
    } else if (buscaSecundariaEstado === "falhou") {
      el.textContent = (restantes.length > 1
        ? "Não deu pra carregar os bancos das outras trilhas — buscando só em "
        : "Não deu pra carregar o banco da outra trilha — buscando só em ") +
        (TRILHA_CFG ? TRILHA_CFG.nome : "sua trilha") + ".";
    } else if (buscaSecundariaEstado === "pronta" && buscaSecundariaFalhas.length > 0) {
      el.textContent = "Não deu pra carregar o banco de " +
        buscaSecundariaFalhas.map(nomeDe).join(" e ") + " — buscando nas demais.";
    } else {
      el.textContent = "";
    }
  }

  function renderBuscaSugestoes() {
    const el = document.getElementById("busca-sugestoes");
    if (!el) return;
    el.innerHTML = "";
    if (buscaAssuntoId) {
      const a = (window.ASSUNTOS || []).find((x) => x.id === buscaAssuntoId);
      if (a) {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "busca-assunto-ativo";
        chip.innerHTML = `${escapeHtml(a.nome)} <span aria-hidden="true">×</span>`;
        chip.title = "Voltar para a busca por texto";
        chip.addEventListener("click", () => {
          buscaAssuntoId = null;
          buscaVisiveis = BUSCA_PAGINA;
          renderBuscaSugestoes();
          renderBuscaResultados();
        });
        el.appendChild(chip);
      }
      return;
    }

    const sugestoes = buscaSugerirAssuntos(buscaConsulta, 6);
    if (sugestoes.length === 0) return;
    const rotulo = document.createElement("span");
    rotulo.className = "area-filter-label";
    rotulo.textContent = "Assuntos:";
    el.appendChild(rotulo);
    sugestoes.forEach((a) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "area-pill";
      chip.textContent = a.nome;
      chip.addEventListener("click", () => {
        buscaAssuntoId = a.id;
        buscaVisiveis = BUSCA_PAGINA;
        renderBuscaSugestoes();
        renderBuscaResultados();
      });
      el.appendChild(chip);
    });
  }

  // Monta uma fileira de botões de filtro no padrão .area-filter/.area-pill,
  // o mesmo do filtro de categoria da aba Obras.
  function renderBuscaLinhaFiltro(container, rotulo, opcoes, valorAtual, aoEscolher) {
    const linha = document.createElement("div");
    linha.className = "area-filter";
    const label = document.createElement("span");
    label.className = "area-filter-label";
    label.textContent = rotulo;
    linha.appendChild(label);
    opcoes.forEach((op) => {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "area-pill" + (valorAtual === op.id ? " active" : "");
      pill.textContent = op.nome + (op.total != null ? ` (${op.total})` : "");
      pill.addEventListener("click", () => {
        aoEscolher(op.id);
        buscaVisiveis = BUSCA_PAGINA;
        renderBuscaResultados();
      });
      linha.appendChild(pill);
    });
    container.appendChild(linha);
  }

  // As fileiras de frente e de formato são derivadas do resultado da busca, e
  // não fixas: só aparecem as opções que têm questão agora. Sem consulta ativa,
  // só o filtro de status faz sentido — os outros dois não teriam de onde tirar
  // as opções.
  function renderBuscaFiltros(facetas) {
    const el = document.getElementById("busca-filtros");
    if (!el) return;
    el.innerHTML = "";

    renderBuscaLinhaFiltro(el, "Mostrar:", [
      { id: null, nome: "Todas" },
      { id: "nova", nome: "Não respondidas" },
      { id: "errei", nome: "Que eu errei" },
      { id: "acertei", nome: "Que eu acertei" },
    ], buscaFiltroStatus, (id) => { buscaFiltroStatus = id; });

    if (!facetas) return;

    // Uma opção só não é escolha nenhuma — a fileira seria "Todas" mais um
    // botão que não muda nada.
    if (facetas.frentes.length > 1) {
      renderBuscaLinhaFiltro(el, "Frente:",
        [{ id: null, nome: "Todas" }].concat(
          facetas.frentes.map((f) => ({ id: f.id, nome: f.nome, total: f.total }))
        ),
        buscaFiltroFrente, (id) => { buscaFiltroFrente = id; });
    }

    if (facetas.formatos.size > 1) {
      const ordem = ["direta", "escada", "lacunas", "vf", "excecao"];
      renderBuscaLinhaFiltro(el, "Formato:",
        [{ id: null, nome: "Todos" }].concat(
          ordem.filter((f) => facetas.formatos.has(f)).map((f) => ({
            id: f, nome: BUSCA_FORMATO_LABELS[f] || f, total: facetas.formatos.get(f),
          }))
        ),
        buscaFiltroFormato, (id) => { buscaFiltroFormato = id; });
    }
  }

  function renderBuscaResultados() {
    const el = document.getElementById("busca-resultados");
    if (!el) return;
    el.innerHTML = "";

    if (!buscaConsulta && !buscaAssuntoId) {
      renderBuscaFiltros(null);
      // "nas duas trilhas" era um número escrito à mão. Agora sai da contagem
      // real: a trilha ativa mais as que entraram no índice.
      //
      // O banco complementar entra na conta porque entra na busca, mas é
      // nomeado à parte -- somá-lo calado a "nas 4 trilhas" atribuiria às
      // trilhas 1.134 questões que não são delas. Ele só é citado quando de
      // fato chegou: a carga é assíncrona e pode falhar.
      const trilhasIndexadas = 1 + ((buscaSecundariaDados || []).length);
      const fontes = [trilhasIndexadas > 1 ? `nas ${trilhasIndexadas} trilhas` : "na sua trilha"];
      if (buscaExtraDados) fontes.push("no banco complementar");
      el.innerHTML = `<p class="hint">Comece digitando acima. São
        ${(buscaDocs || []).length.toLocaleString("pt-BR")} questões indexadas
        ${fontes.join(" e ")}.</p>`;
      return;
    }

    const { resultados, assunto, frentes, formatos } = buscarQuestoes();
    renderBuscaFiltros({ frentes: frentes, formatos: formatos });
    const total = resultados.length;

    const contador = document.createElement("div");
    contador.className = "dissert-counter";
    contador.innerHTML = total === 0
      ? `Nenhuma questão encontrada`
      : `<strong>${total}</strong> quest${total === 1 ? "ão" : "ões"} encontrada${total === 1 ? "" : "s"}` +
        (assunto ? ` para <strong>${escapeHtml(assunto.nome)}</strong>` : "");
    el.appendChild(contador);

    if (total === 0) {
      const vazio = document.createElement("p");
      vazio.className = "hint";
      vazio.textContent = assunto
        ? "Esse assunto ainda não tem questão no banco."
        : "Tente uma palavra mais curta, ou escolha um dos assuntos sugeridos acima — eles procuram " +
          "também pelos sinônimos, e é assim que \"função quadrática\" encontra as questões que só " +
          "falam em parábola e vértice.";
      el.appendChild(vazio);
      return;
    }

    // Trilha ativa primeiro, a outra num bloco separado e rotulado — mesmo
    // padrão do "Repertório complementar" da aba Obras.
    //
    // São TRÊS grupos e não dois: antes, "tudo que não é a trilha ativa" caía
    // num bloco só, e o rótulo saía de VD_TRILHAS[primeiro resultado] — com o
    // banco complementar junto, metade do bloco apareceria sob o nome da outra
    // trilha, que é falso.
    const daTrilha = resultados.filter((r) => r.doc.trilha === TRILHA);
    const doExtra = resultados.filter((r) => r.doc.trilha === BUSCA_TRILHA_EXTRA);
    const daOutra = resultados.filter(
      (r) => r.doc.trilha !== TRILHA && r.doc.trilha !== BUSCA_TRILHA_EXTRA);

    // Os dois grupos têm ORÇAMENTOS SEPARADOS, e não um só dividido por ordem.
    //
    // Com um orçamento único a outra trilha nunca aparecia: buscando "figuras
    // de linguagem", só Direito tem mais de 40 resultados, então as 20 vagas da
    // primeira página — e as 40 da segunda — se esgotavam antes de chegar nela.
    // Medido no navegador antes desta separação: zero questões de Medicina na
    // tela, mesmo com o bloco existindo no código.
    //
    // A reserva é uma fração da página, e não metade: quem estuda Direito quer
    // as questões de Direito primeiro. Mas "primeiro" não pode virar "só".
    const cotaOutra = Math.max(4, Math.round(buscaVisiveis / 4));
    renderBuscaGrupo(el, daTrilha, buscaVisiveis, null);
    if (daOutra.length > 0) {
      const cfgOutra = window.VD_TRILHAS[daOutra[0].doc.trilha];
      renderBuscaGrupo(el, daOutra, cotaOutra, cfgOutra ? cfgOutra.nome : daOutra[0].doc.trilha,
                       "outra-trilha");
    }
    // O banco complementar vem por último e com a mesma cota da outra trilha:
    // é material de treino por assunto, e quem procura crase quer primeiro a
    // questão do banco principal, que é a que foi montada no formato da prova.
    if (doExtra.length > 0) renderBuscaGrupo(el, doExtra, cotaOutra, null, "extra");

    const mostrados = Math.min(daTrilha.length, buscaVisiveis) +
                      Math.min(daOutra.length, cotaOutra) +
                      Math.min(doExtra.length, cotaOutra);
    if (mostrados < total) {
      const mais = document.createElement("button");
      mais.type = "button";
      mais.className = "btn btn-secondary";
      mais.textContent = `Mostrar mais (${total - mostrados} restante${total - mostrados === 1 ? "" : "s"})`;
      mais.addEventListener("click", () => {
        buscaVisiveis += BUSCA_PAGINA;
        renderBuscaResultados();
      });
      el.appendChild(mais);
    }
  }

  // Renderiza um grupo de resultados até o limite de itens visíveis do grupo.
  //
  // `tipo` diz qual cabeçalho vai em cima: nenhum (trilha ativa),
  // "outra-trilha" (usa nomeTrilhaOutra) ou "extra" (banco complementar).
  function renderBuscaGrupo(container, itens, orcamento, nomeTrilhaOutra, tipo) {
    if (itens.length === 0 || orcamento <= 0) return;
    const mostrar = itens.slice(0, orcamento);

    if (tipo === "outra-trilha" && nomeTrilhaOutra) {
      const aviso = document.createElement("p");
      aviso.className = "hint busca-outra-trilha";
      aviso.innerHTML = `<strong>Também em ${escapeHtml(nomeTrilhaOutra)}</strong> —
        ${itens.length} quest${itens.length === 1 ? "ão" : "ões"} do mesmo assunto na outra trilha.
        Valem como treino, mas não entram no seu Caderno de Erros nem no seu progresso por frente.`;
      container.appendChild(aviso);
    } else if (tipo === "extra") {
      const aviso = document.createElement("p");
      aviso.className = "hint busca-outra-trilha";
      aviso.innerHTML = `<strong>Banco complementar</strong> —
        ${itens.length} quest${itens.length === 1 ? "ão" : "ões"} de treino por assunto.
        São questões curtas, sem texto longo nem asserções I/II/III, feitas para repetição:
        servem para fixar conteúdo, não para simular a prova. Só aparecem aqui, e não entram
        no seu Caderno de Erros nem no seu progresso por frente.`;
      container.appendChild(aviso);
    }

    // Agrupa por frente, no cartão que as outras abas já usam.
    const porFrente = new Map();
    mostrar.forEach((r) => {
      const chave = r.doc.trilha + "::" + r.doc.frente;
      if (!porFrente.has(chave)) porFrente.set(chave, { doc: r.doc, itens: [] });
      porFrente.get(chave).itens.push(r);
    });

    porFrente.forEach((grupo) => {
      const card = document.createElement("div");
      card.className = "lesson-card";
      card.innerHTML = `
        <div class="lesson-eyebrow">${escapeHtml(grupo.doc.area || "")}</div>
        <h3>${escapeHtml(grupo.doc.frenteNome || grupo.doc.frente)}
          <span class="visit-badge">${grupo.itens.length}</span></h3>
        <div class="questions"></div>
      `;
      const qc = card.querySelector(".questions");
      grupo.itens.forEach((r, idx) => {
        qc.appendChild(
          renderQuestion(null, buscaSubtopicId(r.doc), r.doc.q, idx, undefined, undefined, true)
        );
      });
      container.appendChild(card);
    });
  }

  // Renderiza um bloco de subtema (gatilhos/pegadinhas/exemplo específicos de
  // um subtema dentro da frente, ex.: "Reforma tributária brasileira" dentro
  // de atualidades-politica), usado por renderTheoryBlockHtml abaixo.
  function renderTheorySubtemaHtml(subtema) {
    const gatilhosHtml = subtema.gatilhos.map((g) => `<li>${escapeHtml(g)}</li>`).join("");
    const pegadinhasHtml = subtema.pegadinhas.map((p) => `<li>${escapeHtml(p)}</li>`).join("");
    const exemploHtml = subtema.exemplo
      ? `<div class="theory-exemplo">
          <div class="theory-col-label">Exemplo resolvido</div>
          <p class="theory-exemplo-enunciado">${escapeHtml(subtema.exemplo.enunciado)}</p>
          <p class="theory-exemplo-resolucao">${escapeHtml(subtema.exemplo.resolucao)}</p>
        </div>`
      : "";
    return `
      <div class="theory-subtema">
        <div class="theory-subtema-header">Subtema: ${escapeHtml(subtema.tema)}</div>
        <p class="theory-resumo">${escapeHtml(subtema.resumo)}</p>
        <div class="theory-col">
          <div class="theory-col-label">Gatilhos (padrão do enunciado → método)</div>
          <ul>${gatilhosHtml}</ul>
        </div>
        <div class="theory-col">
          <div class="theory-col-label">Pegadinhas comuns</div>
          <ul>${pegadinhasHtml}</ul>
        </div>
        ${exemploHtml}
      </div>
    `;
  }

  // A teoria é da MATÉRIA, não do subtema, e por isso é resolvida pela
  // frente-pai. O que window.THEORY guarda é como a banca cobra Biologia
  // inteira — o resumo, os gatilhos de enunciado, as pegadinhas —, e isso não se
  // fatia em genética e citologia. Só o exercício e a vídeo-aula ficaram por
  // subtema.
  //
  // A chave também é a da matéria porque é ela que marca "já vi": indexada por
  // subtema, o aluno reveria a mesma teoria como nova a cada assunto novo de
  // Biologia, três vezes por matéria ao longo do plano.
  function theoryKey(subtopicId) {
    const s = (window.SUBTOPICS || []).find((x) => x.id === subtopicId);
    return (s && s.frenteId) || subtopicId;
  }

  function temTeoria(subtopicId) {
    return !!(window.THEORY && window.THEORY[theoryKey(subtopicId)]);
  }

  // O nome da matéria mora em `area` do subtema (ver build-trilhas.js): na tela
  // o aluno lê "Biologia · Genética e Hereditariedade".
  function nomeDaMateria(subtopicId) {
    const s = (window.SUBTOPICS || []).find((x) => x.id === subtopicId);
    return (s && s.area) || "";
  }

  // Achado 1 (teoria por frente): bloco colapsável com resumo + gatilhos
  // (padrão do enunciado → método de resolução) + pegadinhas comuns,
  // vindos de window.THEORY (data/theory.js). Marcar como "visto" é
  // persistido por frente (não por dia), e conta pro checklist do dia.
  //
  // Matérias com window.THEORY[id].subtemas ganham uma camada extra, girada
  // pelo número da visita. O campo existe em todas as trilhas e está vazio em
  // todas: era o embrião de uma teoria mais fina, que o subtema de verdade
  // tornou desnecessária para o recorte e continua útil para o aprofundamento.
  // Quando visitNumber não é passado (sessão SOS), mostra TODOS, não só o do dia.
  function renderTheoryBlockHtml(subtopicId, visitNumber) {
    const chave = theoryKey(subtopicId);
    const theory = window.THEORY && window.THEORY[chave];
    if (!theory) return "";
    const seen = loadJSON(LS_THEORY_SEEN, {})[chave];
    const gatilhosHtml = theory.gatilhos.map((g) => `<li>${escapeHtml(g)}</li>`).join("");
    const pegadinhasHtml = theory.pegadinhas.map((p) => `<li>${escapeHtml(p)}</li>`).join("");

    let subtemasHtml = "";
    if (theory.subtemas && theory.subtemas.length > 0) {
      const subtemasToShow = visitNumber != null
        ? [theory.subtemas[(visitNumber - 1) % theory.subtemas.length]]
        : theory.subtemas;
      subtemasHtml = subtemasToShow.map(renderTheorySubtemaHtml).join("");
    }

    return `
      <div class="theory-block">
        <button type="button" class="theory-toggle btn-link">${seen ? "✓ " : ""}Teoria: gatilhos e pegadinhas de ${escapeHtml(nomeDaMateria(subtopicId))}</button>
        <div class="theory-content" hidden>
          <p class="theory-resumo">${escapeHtml(theory.resumo)}</p>
          <div class="theory-col">
            <div class="theory-col-label">Gatilhos (padrão do enunciado → método)</div>
            <ul>${gatilhosHtml}</ul>
          </div>
          <div class="theory-col">
            <div class="theory-col-label">Pegadinhas comuns</div>
            <ul>${pegadinhasHtml}</ul>
          </div>
          ${subtemasHtml}
        </div>
      </div>
    `;
  }

  // Avança um índice de corte até o fim do cluster em que ele caiu, para que
  // questões que compartilham o mesmo texto não sejam separadas. Sem clusters
  // nos dados, devolve o índice recebido sem alteração.
  function snapToGroupBoundary(questions, idx) {
    if (idx <= 0 || idx >= questions.length) return idx;
    const chave = (q) => (q && q.textoId) || null;
    const anterior = chave(questions[idx - 1]);
    if (anterior === null) return idx;
    let i = idx;
    while (i < questions.length && chave(questions[i]) === anterior) i++;
    return i;
  }

  // Achado 9 (essenciais vs. extras): divide as questões da lição num bloco
  // "essencial" (meta realista do dia, ~12) e um bloco "extras" (o resto,
  // opcional, sem culpa se não fizer) — mais um botão "quero mais" que puxa
  // questões novas do banco além do que o plano já selecionou.
  function renderLessonCard(day, lesson) {
    const card = document.createElement("div");
    card.className = "lesson-card";
    // O cartão de foco no topo da tela rola até a frente certa por este id.
    card.dataset.lessonId = lesson.subtopicId;

    // "1ª vez / 2ª revisão deste tema" e o tempo estimado saíram daqui: quem
    // os diz agora é o quadrado navy da frente, logo acima deste cartão.
    const video = pickLessonVideo(lesson.subtopicId, lesson.visitNumber);
    const videoHtml = video
      ? `<div class="weekly-video-item">
          <div class="weekly-video-tema">▶ Aula de hoje: ${escapeHtml(video.tema)}</div>
          <a class="btn-link" target="_blank" rel="noopener" href="${youtubeSearchUrl(video.busca)}">Buscar essa aula no YouTube</a>
        </div>`
      : "";

    // O corte entre essenciais e extras não pode cair no meio de um cluster:
    // as questões de um mesmo texto ficariam em blocos diferentes da tela, e o
    // usuário leria o texto duas vezes ou responderia metade dele sem contexto.
    // O ajuste é sempre PARA A FRENTE — o bloco essencial cresce até fechar o
    // cluster, em vez de encolher e deixar questões órfãs nos extras.
    const essentialCount = snapToGroupBoundary(
      lesson.questions,
      Math.min(ESSENTIAL_QUESTIONS_PER_LESSON, lesson.questions.length)
    );
    const essentials = lesson.questions.slice(0, essentialCount);
    const extras = lesson.questions.slice(essentialCount);
    const extrasKey = day + "::" + lesson.subtopicId;
    const theoryHtml = renderTheoryBlockHtml(lesson.subtopicId, lesson.visitNumber);

    // Cabeçalho enxuto: quem já disse o nome da frente, quantas questões ela
    // tem, quantos minutos leva e que revisão é esta foi o quadrado navy logo
    // acima. Repetir tudo aqui, em título grande e com o mesmo selo, era a
    // mesma duplicação da aula — só que em texto.
    //
    // Sobra o que este cartão de fato é: as questões do dia daquela frente, e
    // o quanto delas já foi. A frente continua nomeada, em letra pequena, para
    // quem chega rolando de baixo e não vê o quadrado.
    card.innerHTML = `
      <div class="questoes-head">
        <div class="questoes-head-titulo">
          <h3>Questões do dia</h3>
          <span class="questoes-frente">${escapeHtml(lesson.area)} · ${escapeHtml(lesson.nome)}</span>
        </div>
        <div class="questoes-head-progresso">
          <span class="score-label" data-score-for="${escapeHtml(lesson.subtopicId)}"></span>
          <div class="medidor"><i style="width:0%"></i></div>
        </div>
      </div>
      <div class="questoes-corpo">
        <p class="lesson-desc">${escapeHtml(lesson.descricao)}</p>
        ${theoryHtml}
        ${videoHtml}
        <div class="exercise-block">
          ${extras.length ? `<div class="exercise-summary"><span>${extras.length} extras disponíveis além das ${essentialCount} essenciais</span></div>` : ""}
          <div class="questions essentials-questions"></div>
          <div class="extras-block" hidden>
            <div class="extras-label">Extras — pra quem quer ir além, sem culpa se não fizer</div>
            <div class="questions extras-questions"></div>
          </div>
          <div class="extras-actions"></div>
        </div>
      </div>
    `;

    const theoryToggle = card.querySelector(".theory-toggle");
    if (theoryToggle) {
      theoryToggle.addEventListener("click", () => {
        const theoryContent = card.querySelector(".theory-content");
        theoryContent.hidden = !theoryContent.hidden;
        if (!theoryContent.hidden) {
          const seenState = loadJSON(LS_THEORY_SEEN, {});
          const chaveTeoria = theoryKey(lesson.subtopicId);
          if (!seenState[chaveTeoria]) {
            seenState[chaveTeoria] = true;
            saveJSON(LS_THEORY_SEEN, seenState);
            theoryToggle.textContent = "✓ " + theoryToggle.textContent.replace(/^✓ /, "");
            updateDayChecklist(day);
          }
        }
      });
    }

    const essentialsContainer = card.querySelector(".essentials-questions");
    essentials.forEach((q, idx) => {
      appendGrouped(essentialsContainer, q, renderQuestion(day, lesson.subtopicId, q, idx));
    });

    const extrasBlock = card.querySelector(".extras-block");
    const extrasContainer = card.querySelector(".extras-questions");
    extras.forEach((q, idx) => {
      appendGrouped(extrasContainer, q, renderQuestion(day, lesson.subtopicId, q, essentialCount + idx));
    });

    const actions = card.querySelector(".extras-actions");
    function renderExtrasActions() {
      actions.innerHTML = "";
      if (extras.length > 0 && !expandedExtras.has(extrasKey)) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-secondary";
        btn.style.width = "auto";
        btn.textContent = `Ver mais ${extras.length} questões extras`;
        btn.addEventListener("click", () => {
          expandedExtras.add(extrasKey);
          extrasBlock.hidden = false;
          renderExtrasActions();
        });
        actions.appendChild(btn);
        return;
      }
      if (extras.length > 0) extrasBlock.hidden = false;
      const pulled = extraPullCounts[extrasKey] || 0;
      const alreadyShown = lesson.questions.length + pulled;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-ghost";
      btn.textContent = "Terminei — puxar mais 10";
      btn.addEventListener("click", () => {
        const more = pickMoreQuestions(lesson.subtopicId, lesson.visitNumber - 1, day, alreadyShown, 10, lesson.qOffset);
        if (more.length === 0) {
          btn.textContent = "Sem mais questões novas neste banco por enquanto";
          btn.disabled = true;
          return;
        }
        extrasBlock.hidden = false;
        more.forEach((q, i) => {
          // day=null: questões extras puxadas por baixa demanda não entram na
          // contagem fixa do dia (bumpDayState), só no progresso da frente.
          // hideSavedAnswer=true: sem "dia" pra rastrear por ocorrência, tratamos
          // como prática avulsa — sempre nasce zerada, mesmo critério do
          // Caderno de Erros.
          appendGrouped(extrasContainer, q, renderQuestion(null, lesson.subtopicId, q, alreadyShown + i, undefined, () => { updateScoreLabel(card); }, true));
        });
        extraPullCounts[extrasKey] = pulled + more.length;
        renderExtrasActions();
      });
      actions.appendChild(btn);
    }
    renderExtrasActions();

    updateScoreLabel(card);
    return card;
  }

  // `day` pode ser `null` quando a questão é renderizada fora do contexto de
  // um dia específico do plano (ex.: Caderno de Erros) — nesse caso, tudo
  // que depende de "dia" (progresso diário, foco do simulado, dissertativas)
  // é pulado. `onAnswered(isCorrect)` é um callback opcional chamado depois
  // de cada resposta, além dos efeitos colaterais padrão. `hideSavedAnswer`
  // faz a questão nascer "zerada" (sem alternativa marcada, sem gabarito
  // revelado) mesmo que já exista uma resposta salva — usado no Caderno de
  // Erros pra a questão aparecer do mesmo jeito que aparece num dia normal
  // ainda não respondido, em vez de já mostrar a resposta errada anterior.
  function renderQuestion(day, subtopicId, q, idx, tagLabel, onAnswered, hideSavedAnswer) {
    const wrap = document.createElement("div");
    wrap.className = "question";
    const key = answerKey(subtopicId, q.id);
    // Pré-preenchimento é sempre por OCORRÊNCIA (dia específico), não global —
    // uma questão que já apareceu (e foi respondida) num dia anterior deve
    // nascer zerada quando reaparecer num dia novo, mesmo que o registro
    // global (vd_answers, usado só pras stats de frente) já tenha resposta.
    const saved = (hideSavedAnswer || day == null) ? null : getDayAnswers()[dayAnswerKey(day, subtopicId, q.id)];

    // Texto de apoio: inline na própria questão, ou compartilhado por um
    // cluster e resolvido por textoId. A ordem importa — `texto_apoio` vence,
    // para que as questões antigas continuem funcionando sem alteração.
    const support = resolveSupportText(q);
    const supportHtml = support
      ? `<div class="q-support">${escapeHtml(support)}</div>`
      : "";
    const tagHtml = tagLabel ? `<div class="q-tag">${escapeHtml(tagLabel)}</div>` : "";
    const visualHtml = renderVisual(q.visual);
    // Selo de dificuldade: só questões novas (banco ampliado) têm o campo
    // `dificuldade` ("media"/"dificil") — questões antigas seguem sem selo.
    const difficultyHtml = q.dificuldade
      ? `<span class="q-difficulty q-difficulty-${q.dificuldade}">${q.dificuldade === "dificil" ? "Difícil" : "Média"}</span>`
      : "";

    const altsHtml = Object.entries(q.alternativas).map(([letter, text]) => {
      return `
        <label class="q-alt" data-letter="${letter}">
          <input type="radio" name="${subtopicId}-${q.id}" value="${letter}" ${saved === letter ? "checked" : ""}>
          <span><strong>${letter.toUpperCase()})</strong> ${escapeHtml(text)}</span>
        </label>`;
    }).join("");

    wrap.innerHTML = `
      ${tagHtml}
      ${supportHtml}
      ${visualHtml}
      <div class="q-enunciado">${idx + 1}. ${escapeHtml(q.enunciado)} ${difficultyHtml}</div>
      <div class="q-alts">${altsHtml}</div>
      <div class="q-confirm">
        <button type="button" class="btn q-verify" disabled>Verificar resposta</button>
        <span class="q-verify-hint">Escolha uma alternativa</span>
      </div>
      <div class="q-feedback" hidden></div>
      <div class="q-report"></div>
    `;

    initQuestionReport(wrap, day, subtopicId, q);

    const inputs = Array.from(wrap.querySelectorAll(".q-alt input"));
    const confirmRow = wrap.querySelector(".q-confirm");
    const verifyBtn = wrap.querySelector(".q-verify");
    const verifyHint = wrap.querySelector(".q-verify-hint");

    // Uma questão verificada fica travada: com o gabarito na tela, trocar de
    // alternativa não ensina nada e só corrompe as estatísticas. Era esse o
    // clique acidental que estragava a resolução — antes, qualquer toque numa
    // alternativa já gravava (e um segundo toque regravava por cima).
    function lockQuestion() {
      wrap.classList.add("is-answered");
      inputs.forEach((input) => { input.disabled = true; });
      confirmRow.hidden = true;
    }

    if (saved) {
      applyFeedback(wrap, q, saved);
      lockQuestion();
    }

    // Listen on the radio inputs' "change" event (fires exactly once per
    // selection) rather than "click" on the wrapping <label> — clicking a
    // <label> associated with an <input> dispatches a click on the label
    // AND a synthetic click on the input that bubbles back through it,
    // which double-fires a click listener attached to the label.
    //
    // Marcar só arma o botão: nada é gravado até o "Verificar resposta",
    // então dá pra trocar de ideia (ou desfazer um toque errado) à vontade.
    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        if (wrap.classList.contains("is-answered")) return;
        verifyBtn.disabled = false;
        verifyHint.textContent = `Marcada: ${input.value.toUpperCase()}. Dá pra trocar até verificar.`;
      });
    });

    verifyBtn.addEventListener("click", () => {
      if (wrap.classList.contains("is-answered")) return;
      const chosen = inputs.find((input) => input.checked);
      if (!chosen) return;
      const letter = chosen.value;
      lockQuestion();
      const current = getAnswers();
      const alreadyAnsweredGlobally = !!current[key];
      current[key] = letter;
      saveJSON(LS_ANSWERS, current);
      touchTopicLastAnswered(subtopicId);
      registerStudyToday();
      applyFeedback(wrap, q, letter);
      if (!alreadyAnsweredGlobally) {
        bumpTopicState(subtopicId, letter === q.resposta);
      } else {
        recomputeAll(); // recalcula stats de frente do zero (resposta global mudou)
      }
      if (day != null) {
        // Grava por OCORRÊNCIA (dia específico) — não confundir com
        // alreadyAnsweredGlobally acima, que é sobre a frente como um
        // todo. bumpDayState só soma ao contador do dia na primeira vez
        // que ESSE dia específico responde essa questão.
        const dayAnswers = getDayAnswers();
        const dKey = dayAnswerKey(day, subtopicId, q.id);
        const alreadyAnsweredThisDay = !!dayAnswers[dKey];
        dayAnswers[dKey] = letter;
        saveJSON(LS_DAY_ANSWERS, dayAnswers);
        if (!alreadyAnsweredThisDay) {
          bumpDayState(day, letter === q.resposta);
        } else {
          recomputeAll();
        }
      }
      const card = wrap.closest(".lesson-card");
      if (card) updateScoreLabel(card);
      if (day != null) {
        updateDayStateFromDom(day);
        const focusEl = card && card.querySelector(".simulado-focus");
        if (focusEl) renderSimuladoFocus(focusEl, day, getDayContent(plan, day));
        renderDissertSection(day);
        updateDayChecklist(day);
      }
      renderProgress();
      renderCalendar();
      if (onAnswered) onAnswered(letter === q.resposta);
    });

    return wrap;
  }

  function applyFeedback(wrap, q, chosenLetter) {
    wrap.querySelectorAll(".q-alt").forEach((label) => {
      label.classList.remove("correct", "incorrect");
      const letter = label.dataset.letter;
      if (letter === q.resposta) label.classList.add("correct");
      else if (letter === chosenLetter) label.classList.add("incorrect");
    });
    const fb = wrap.querySelector(".q-feedback");
    fb.hidden = false;
    const isCorrect = chosenLetter === q.resposta;
    fb.className = "q-feedback " + (isCorrect ? "correct" : "incorrect");

    // O veredito virou um rótulo à parte, em vez de duas palavras coladas no
    // começo da explicação. São duas leituras diferentes: "acertei?" se
    // responde de relance, pela cor e pelo rótulo; "por quê?" é parágrafo, e
    // parágrafo colorido de quatro linhas cansa. Montado por nós (e não por
    // innerHTML) porque q.explicacao é conteúdo do banco e continua entrando
    // como texto, nunca como marcação.
    fb.textContent = "";
    const rotulo = document.createElement("span");
    rotulo.className = "q-feedback-rotulo";
    rotulo.textContent = isCorrect ? "Certo" : "Não foi dessa vez";
    const texto = document.createElement("p");
    texto.className = "q-feedback-texto";
    texto.textContent = q.explicacao;
    fb.append(rotulo, texto);
  }

  // ---------- Reportar problema numa questão (v2) ----------
  //
  // O banco tem 1800 questões originais: erro de gabarito ou enunciado dúbio
  // é questão de tempo, e sem um canal a pessoa só engole o erro. O botão
  // fica discreto (o objetivo é estudar, não caçar erro) e o formulário só
  // aparece quando clicado.
  const REPORT_TIPOS = [
    ["gabarito", "O gabarito parece errado"],
    ["enunciado", "Enunciado confuso ou ambíguo"],
    ["alternativas", "Problema nas alternativas"],
    ["escrita", "Erro de português ou digitação"],
    ["outro", "Outro problema"],
  ];

  function initQuestionReport(wrap, day, subtopicId, q) {
    const slot = wrap.querySelector(".q-report");
    if (!slot) return;

    function mostrarBotao() {
      slot.innerHTML = `<button type="button" class="q-report-btn">Reportar problema nesta questão</button>`;
      slot.querySelector(".q-report-btn").addEventListener("click", mostrarFormulario);
    }

    function mostrarFormulario() {
      const opcoes = REPORT_TIPOS.map(
        ([valor, rotulo]) => `<option value="${valor}">${escapeHtml(rotulo)}</option>`
      ).join("");
      slot.innerHTML = `
        <div class="q-report-form">
          <label class="q-report-label">Qual é o problema?</label>
          <select class="q-report-tipo">${opcoes}</select>
          <textarea class="q-report-comentario" rows="2"
            placeholder="Se quiser, explique em uma linha (opcional)"></textarea>
          <div class="q-report-actions">
            <button type="button" class="btn btn-primary q-report-enviar">Enviar</button>
            <button type="button" class="btn btn-ghost q-report-cancelar">Cancelar</button>
          </div>
          <p class="q-report-status" hidden></p>
        </div>
      `;
      slot.querySelector(".q-report-cancelar").addEventListener("click", mostrarBotao);
      slot.querySelector(".q-report-enviar").addEventListener("click", enviar);
    }

    async function enviar() {
      const btn = slot.querySelector(".q-report-enviar");
      const status = slot.querySelector(".q-report-status");
      const tipo = slot.querySelector(".q-report-tipo").value;
      const comentario = slot.querySelector(".q-report-comentario").value.trim();

      btn.disabled = true;
      btn.textContent = "Enviando…";
      status.hidden = true;

      try {
        const answers = getAnswers();
        const resultado = await window.VD_FEEDBACK.report({
          questionId: q.id,
          subtopicId: subtopicId,
          dia: day,
          tipo: tipo,
          comentario: comentario,
          enunciado: q.enunciado,
          gabaritoDoApp: q.resposta,
          respostaDaPessoa: answers[answerKey(subtopicId, q.id)] || null,
        });
        slot.innerHTML = `<p class="q-report-obrigado">${
          resultado.jaEnviado
            ? "Você já reportou isso — obrigado!"
            : "Obrigado! Vou revisar essa questão."
        }</p>`;
      } catch (err) {
        btn.disabled = false;
        btn.textContent = "Enviar";
        status.hidden = false;
        status.textContent =
          err && err.message === "sem-usuario"
            ? "Entre na sua conta pra reportar."
            : "Não consegui enviar agora. Verifique sua conexão e tente de novo.";
      }
    }

    mostrarBotao();
  }

  function updateScoreLabel(card) {
    const label = card.querySelector(".score-label");
    if (!label) return;
    // recompute directly from DOM to keep it simple & correct
    const questionEls = card.querySelectorAll(".question");
    let answered = 0, correct = 0;
    questionEls.forEach((qEl) => {
      const fb = qEl.querySelector(".q-feedback");
      if (fb && !fb.hidden) {
        answered++;
        if (fb.classList.contains("correct")) correct++;
      }
    });

    // "3 de 12 respondidas · 67% de acerto" em vez de "2/3 certas": o
    // denominador que interessa no cabeçalho é quanto FALTA do bloco, não
    // quantas das já respondidas foram certas. O acerto entra depois, e só
    // quando existe.
    const total = questionEls.length;
    const medidor = card.querySelector(".questoes-head-progresso .medidor > i");
    if (medidor) medidor.style.width = (total > 0 ? (answered / total) * 100 : 0) + "%";
    if (answered === 0) {
      label.textContent = total > 0 ? `${total} questões` : "";
    } else {
      label.textContent = `${answered} de ${total} respondidas · ${Math.round((correct / answered) * 100)}% de acerto`;
    }
  }

  // ---------- Dissertativas: renderização ----------
  function renderDissertSection(day) {
    updateDayChecklist(day); // mantém o checklist "X/Y do dia" (achado 14) sempre em dia
    const container = document.getElementById("dissert-section");
    if (!container) return;
    container.innerHTML = "";

    if (!isDayExerciseComplete(day)) return; // só aparece depois que os exercícios do dia acabam

    // O pool desta trilha decide DUAS coisas antes de qualquer questão ser
    // sorteada: quais matérias aparecem no filtro "praticar uma matéria
    // específica" e qual texto de introdução descrever a prova.
    //
    // `areas` era uma lista fixa ["Humanas", "Linguagens", "Artes"] — certa
    // para Direito, mas Medicina usa "Ciências da Natureza" e "Ciências
    // Humanas" (não "Humanas" nem "Artes"), então dois dos três pills nunca
    // batiam com nenhuma questão e a terceira matéria não tinha pill nenhum.
    // Derivar de dissertPool() pela ordem real de aparição corrige os dois
    // lados do mesmo problema, e é o que faz a Matemática de Economia
    // aparecer sem precisar ensinar esta função a conhecer trilhas.
    const poolCompleto = dissertPool();
    const areas = [];
    poolCompleto.forEach((q) => { if (areas.indexOf(q.area) === -1) areas.push(q.area); });

    // `poolExatas`: true quando TODA a prova discursiva desta trilha é do
    // formato de resolução por faixa (hoje, só Economia — Matemática pura).
    // O eyebrow "Prova discursiva FGV" continua certo nos dois formatos: as
    // discursivas de Matemática da EESP também são da FGV. O que muda é a
    // descrição, que cita Humanas/Linguagens/Arte — errado para uma prova que
    // é 100% Matemática — e o que a pessoa deve fazer antes de conferir.
    const poolExatas = poolCompleto.length > 0 && poolCompleto.every(dissertEhExatas);
    const introDesc = poolExatas
      ? `Você concluiu os exercícios objetivos de hoje. A FGV também cobra questões discursivas de
        Matemática, corrigidas por faixa de acerto (0/25/50/75/100) — resposta certa sem mostrar a conta
        vale pouco. Praticar em pelo menos 4 dias por semana (você escolhe quais) ajuda a manter esse
        treino em dia.`
      : `Você concluiu os exercícios objetivos de hoje. A FGV também cobra questões
        discursivas de Humanas, Linguagens e Arte. Praticar em pelo menos 4 dias por semana (você escolhe quais)
        ajuda a manter esse treino em dia.`;
    const questoesDesc = poolExatas
      ? `Escreva a resolução completa antes de conferir a resposta final — é a resolução que a grade da FGV
        pontua, não só o número certo. Depois de conferir, marque a faixa de acerto que sua resposta
        alcançaria.`
      : `Escreva sua resposta livremente e depois confira os pontos que a correção
        discursiva da FGV normalmente espera. Não existe uma única resposta "certa" — o objetivo é treinar
        argumentação estruturada.`;

    const status = getDissertStatus()[day];
    const isExpanded = status === "done" || expandedDissertDays.has(day);
    const week = weekNumberForDay(day);
    const doneCount = countDoneInWeek(week);
    const remaining = Math.max(0, DISSERT_WEEK_TARGET - doneCount);
    const weekRange = daysInWeek(week);
    const weekLabel = weekRange.length > 1
      ? `dias ${weekRange[0]}–${weekRange[weekRange.length - 1]}`
      : `dia ${weekRange[0]}`;

    const card = document.createElement("div");
    card.className = "lesson-card dissert-card";

    const counterHtml = `
      <div class="dissert-counter">
        <strong>Meta semanal de dissertativas (${escapeHtml(weekLabel)}):</strong>
        ${doneCount}/${DISSERT_WEEK_TARGET}
        ${remaining > 0
          ? ` — faltam <strong>${remaining}</strong> ${remaining === 1 ? "vez" : "vezes"} para bater a meta`
          : " — meta da semana concluída! 🎉"}
      </div>`;

    if (!isExpanded && status !== "skipped") {
      card.innerHTML = `
        <div class="lesson-eyebrow">Prova discursiva FGV</div>
        <h3>Quer treinar dissertativas hoje?</h3>
        <p class="lesson-desc">${introDesc}</p>
        ${counterHtml}
        <div class="dissert-actions">
          <button class="btn btn-primary dissert-btn-yes" style="width:auto">Sim, praticar hoje</button>
          <button class="btn btn-secondary dissert-btn-no" style="width:auto">Não, pular hoje</button>
        </div>
      `;
      card.querySelector(".dissert-btn-yes").addEventListener("click", () => {
        expandedDissertDays.add(day);
        renderDissertSection(day);
      });
      card.querySelector(".dissert-btn-no").addEventListener("click", () => {
        const status2 = getDissertStatus();
        status2[day] = "skipped";
        saveJSON(LS_DISSERT_STATUS, status2);
        renderDissertSection(day);
      });
    } else if (status === "skipped" && !isExpanded) {
      card.innerHTML = `
        <div class="lesson-eyebrow">Prova discursiva FGV</div>
        <h3>Dissertativas puladas hoje</h3>
        ${counterHtml}
        <div class="dissert-actions">
          <button class="btn btn-secondary dissert-btn-rethink" style="width:auto">Mudar de ideia</button>
        </div>
      `;
      card.querySelector(".dissert-btn-rethink").addEventListener("click", () => {
        const status2 = getDissertStatus();
        delete status2[day];
        saveJSON(LS_DISSERT_STATUS, status2);
        expandedDissertDays.add(day);
        renderDissertSection(day);
      });
    } else {
      const areaFilter = dissertAreaFilter[day];
      const questions = pickDissertQuestions(day, areaFilter);
      const doneBadge = status === "done"
        ? `<span class="visit-badge">✓ concluído hoje</span>`
        : "";
      // Filtro de matéria só faz sentido com mais de uma opção — com uma só
      // (o caso de hoje em Economia, onde o pool inteiro é Matemática), o
      // pill sozinho e o "Sorteio normal" ao lado seriam a mesma coisa duas
      // vezes.
      const filterHtml = areas.length > 1
        ? `<div class="area-filter"><span class="area-filter-label">Praticar uma matéria específica:</span>${
            areas.map((a) => `
              <button type="button" class="area-pill${areaFilter === a ? " active" : ""}" data-area="${a}">${a}</button>
            `).join("") + `<button type="button" class="area-pill${!areaFilter ? " active" : ""}" data-area="">Sorteio normal</button>`
          }</div>`
        : "";
      card.innerHTML = `
        <div class="lesson-eyebrow">Prova discursiva FGV</div>
        <h3>Questões dissertativas ${doneBadge}</h3>
        <p class="lesson-desc">${questoesDesc}</p>
        ${counterHtml}
        ${filterHtml}
        <div class="dissert-questions"></div>
      `;
      card.querySelectorAll(".area-pill").forEach((pill) => {
        pill.addEventListener("click", () => {
          const area = pill.dataset.area;
          if (area) dissertAreaFilter[day] = area;
          else delete dissertAreaFilter[day];
          renderDissertSection(day);
        });
      });
      const qContainer = card.querySelector(".dissert-questions");
      questions.forEach((q, idx) => qContainer.appendChild(renderDissertQuestion(day, q, idx)));

      if (status !== "done") {
        const finishWrap = document.createElement("div");
        finishWrap.className = "dissert-actions";
        finishWrap.innerHTML = `<button class="btn btn-primary dissert-btn-finish" style="width:auto">Marcar como concluído hoje</button>`;
        finishWrap.querySelector(".dissert-btn-finish").addEventListener("click", () => {
          const status2 = getDissertStatus();
          status2[day] = "done";
          saveJSON(LS_DISSERT_STATUS, status2);
          registerStudyToday();
          renderDissertSection(day);
        });
        card.appendChild(finishWrap);
      }
    }

    container.appendChild(card);
  }

  function renderDissertQuestion(day, q, idx) {
    // A dissertativa de exatas não usa checklist — usa VD_EXATAS.render, a
    // tela própria de resolução + resposta final + faixa (ver o cabeçalho de
    // vestibular-economia/dissertativa-exatas.js). O `ns` é o mesmo NS desta
    // trilha ("v2_eco_"), então o progresso entra no namespace certo e some
    // junto se um dia o usuário trocar de trilha — igual a tudo o mais aqui.
    //
    // Sem `day` na chave de persistência: diferente das dissertativas de
    // checklist (dissertItemKey inclui o dia), aqui a chave é só
    // questão+item — decisão de dissertativa-exatas.js, não deste gancho. Se
    // a mesma questão de exatas voltar a ser sorteada num dia futuro, a
    // resposta anterior persiste em vez de resetar; é intencional, porque a
    // exatas guarda também a faixa marcada, e perder isso ao repetir a
    // questão apagaria uma nota já dada.
    if (dissertEhExatas(q)) {
      const wrap = document.createElement("div");
      wrap.className = "question dissert-question";
      window.VD_EXATAS.render(wrap, q, { ns: NS });
      return wrap;
    }

    const wrap = document.createElement("div");
    wrap.className = "question dissert-question";
    const savedAnswers = getDissertAnswers();
    const checklist = getDissertChecklist();
    const correcoesIA = getDissertIA();
    const itens = dissertItens(q);

    const itensHtml = itens.map((item, itemIdx) => {
      const answerKey = dissertItemKey(day, q.id, item.id);
      const checklistKeyFor = (pointIdx) => answerKey + "::" + pointIdx;
      const guardada = correcoesIA[answerKey];
      const correcaoIA = correcaoIAValida(guardada, item.pontosEsperados) ? guardada : null;
      const vistosIA = iaCumpridos(correcaoIA);
      const pontosHtml = item.pontosEsperados.map((p, i) =>
        pontoGradeHtml(p, i, checklist[checklistKeyFor(i)], correcaoIA && correcaoIA.criterios[i])
      ).join("");
      const marcados = item.pontosEsperados.filter((_, i) => checklist[checklistKeyFor(i)]).length;
      // Um comando que pede "duas razões" é pontuado contando: o selo existe para
      // que o candidato veja o número antes de escrever, e não depois de perder
      // metade do ponto por ter entregado uma só.
      const selo = item.quantidadeExigida
        ? `<span class="dissert-quantidade">responder ${item.quantidadeExigida}</span>`
        : "";
      // Só numera os itens quando existe mais de um: numa questão de comando único
      // um "a)" solitário sugeriria um "b)" que não vem.
      const rotulo = itens.length > 1 ? `<strong>${item.id})</strong> ` : `${itemIdx + idx + 1}. `;
      return `
        <div class="dissert-item" data-item="${item.id}">
          <div class="q-enunciado">${rotulo}${escapeHtml(item.comando)} ${selo}</div>
          <textarea class="dissert-textarea" rows="6" placeholder="Escreva sua resposta aqui...">${escapeHtml(savedAnswers[answerKey] || "")}</textarea>
          ${botaoIAHtml(Boolean(correcaoIA))}
          <button class="btn-link dissert-toggle-gabarito" type="button">${correcaoIA ? "Ocultar pontos esperados" : "Ver pontos esperados na correção"}</button>
          <div class="dissert-gabarito-wrap"${correcaoIA ? "" : " hidden"}>
            <div class="dissert-gabarito-counter">${marcados}/${item.pontosEsperados.length} pontos marcados${
              vistosIA === null ? "" : ` · <span class="ia-contraste">o corretor reconheceu ${vistosIA}</span>`
            }</div>
            <p class="hint" style="margin:0 0 8px;">Depois de escrever, releia sua resposta e marque os pontos que você
            realmente cobriu. Vale marcar antes de pedir a correção — a diferença entre as duas leituras é o que ensina.</p>
            ${correcaoIAResumoHtml(correcaoIA)}
            <ul class="dissert-gabarito">${pontosHtml}</ul>
          </div>
        </div>
      `;
    }).join("");

    wrap.innerHTML = `
      <div class="lesson-eyebrow">${escapeHtml(q.area)}${q.tempoSugerido ? ` · ~${q.tempoSugerido} min sugeridos` : ""}</div>
      <div class="q-support">${escapeHtml(q.texto_apoio)}</div>
      ${itens.length > 1 ? `<div class="q-enunciado dissert-numero">${idx + 1}.</div>` : ""}
      ${itensHtml}
    `;

    wrap.querySelectorAll(".dissert-item").forEach((bloco) => {
      const item = itens.find((it) => it.id === bloco.dataset.item);
      const answerKey = dissertItemKey(day, q.id, item.id);
      const checklistKeyFor = (pointIdx) => answerKey + "::" + pointIdx;

      const textarea = bloco.querySelector(".dissert-textarea");
      textarea.addEventListener("input", () => {
        const current = getDissertAnswers();
        current[answerKey] = textarea.value;
        saveJSON(LS_DISSERT_ANSWERS, current);
      });

      const toggleBtn = bloco.querySelector(".dissert-toggle-gabarito");
      const gabaritoWrap = bloco.querySelector(".dissert-gabarito-wrap");
      toggleBtn.addEventListener("click", () => {
        gabaritoWrap.hidden = !gabaritoWrap.hidden;
        toggleBtn.textContent = gabaritoWrap.hidden ? "Ver pontos esperados na correção" : "Ocultar pontos esperados";
      });

      // Recalculado aqui porque a montagem do HTML acontece em outro escopo:
      // o mesmo veredito que foi desenhado na grade, e passando pelo mesmo
      // correcaoIAValida(), pra que o contador nunca anuncie um número que a
      // grade não está mostrando.
      const vistosIA = (() => {
        const guardada = getDissertIA()[answerKey];
        return correcaoIAValida(guardada, item.pontosEsperados) ? iaCumpridos(guardada) : null;
      })();

      // Conta a partir da leitura mais recente do localStorage, e não de um
      // snapshot fechado por closure — do contrário, marcar um ponto no item (b)
      // apagaria o que já estava marcado no item (a) do mesmo dia.
      const counterEl = bloco.querySelector(".dissert-gabarito-counter");
      bloco.querySelectorAll(".dissert-gabarito input[type=checkbox]").forEach((cb) => {
        cb.addEventListener("change", () => {
          const state = getDissertChecklist();
          const k = checklistKeyFor(cb.dataset.point);
          if (cb.checked) state[k] = true; else delete state[k];
          saveJSON(LS_DISSERT_CHECKLIST, state);
          const n = item.pontosEsperados.filter((_, i) => state[checklistKeyFor(i)]).length;
          // innerHTML pelo mesmo motivo da aba Redação: o contador carrega o
          // que o corretor reconheceu, e textContent apagaria a comparação.
          //
          // Usa o vistosIA do render, e não uma releitura do localStorage: a
          // correção não muda enquanto se marca caixa, e reler aqui passaria por
          // fora do correcaoIAValida() — o contador anunciaria um veredito que a
          // grade, desatualizada, não está mostrando.
          counterEl.innerHTML = `${n}/${item.pontosEsperados.length} pontos marcados${
            vistosIA === null ? "" : ` · <span class="ia-contraste">o corretor reconheceu ${vistosIA}</span>`
          }`;
        });
      });

      ligarBotaoIA(
        bloco,
        () => window.VD_IA.corrigirDissertativa({ questao: q, item: item, resposta: textarea.value }),
        (correcao) => salvarCorrecaoIA(LS_DISSERT_IA, getDissertIA, answerKey, correcao),
        () => renderDissertSection(day)
      );
    });

    return wrap;
  }

  // ---------- Achado 5 (score projetado) + achado 6 (índice de prontidão) ----------

  function touchTopicLastAnswered(subtopicId) {
    const data = loadJSON(LS_TOPIC_LAST_ANSWERED, {});
    data[subtopicId] = todayISO();
    saveJSON(LS_TOPIC_LAST_ANSWERED, data);
  }

  // ---------- Ofensiva (v2) ----------
  //
  // Guardamos apenas o CONJUNTO de dias em que houve estudo; a sequência é
  // sempre recalculada a partir dele. Isso importa por dois motivos: a
  // sequência nunca fica "presa" num número errado, e a mesclagem entre
  // aparelhos vira uma união de dias — se você estudou no celular na terça e
  // no PC na quarta, os dois dias contam, sem os aparelhos brigarem por um
  // contador. A contagem usa o relógio do próprio aparelho, o que é
  // adequado aqui: o app é pessoal e não há nada a ganhar se enganando.

  // Marca hoje como dia estudado. Chamado quando há estudo de verdade —
  // responder questão, revisar flashcard ou concluir uma dissertativa.
  function registerStudyToday() {
    const days = loadJSON(LS_STUDY_DAYS, {});
    const today = todayISO();
    if (days[today]) return false; // já contado hoje, nada muda
    days[today] = true;
    saveJSON(LS_STUDY_DAYS, days);
    renderStreak();
    return true;
  }

  function shiftISO(iso, deltaDays) {
    const d = new Date(iso + "T00:00:00");
    d.setDate(d.getDate() + deltaDays);
    return d.toISOString().slice(0, 10);
  }

  // Sequência ATUAL: conta pra trás a partir de hoje. Se ainda não estudou
  // hoje, a sequência de ontem continua valendo — o dia ainda não acabou, e
  // zerar antes da meia-noite puniria quem estuda à noite.
  function computeStreak() {
    const days = loadJSON(LS_STUDY_DAYS, {});
    const today = todayISO();
    const studiedToday = !!days[today];

    let cursor = studiedToday ? today : shiftISO(today, -1);
    let current = 0;
    while (days[cursor]) {
      current++;
      cursor = shiftISO(cursor, -1);
    }

    // Recorde: maior sequência de dias consecutivos em todo o histórico.
    const all = Object.keys(days).filter((d) => days[d]).sort();
    let longest = 0;
    let run = 0;
    let prev = null;
    all.forEach((d) => {
      run = prev && shiftISO(prev, 1) === d ? run + 1 : 1;
      if (run > longest) longest = run;
      prev = d;
    });

    return { current: current, longest: longest, studiedToday: studiedToday, total: all.length };
  }

  function renderStreak() {
    const el = document.getElementById("streak-chip");
    if (!el) return;
    const s = computeStreak();

    if (s.current === 0) {
      el.hidden = false;
      el.dataset.state = "off";
      el.title = "Estude hoje pra começar sua ofensiva";
      el.innerHTML = `<span class="streak-flame">🔥</span><span class="streak-count">0</span>`;
      return;
    }

    const dias = s.current === 1 ? "1 dia seguido" : `${s.current} dias seguidos`;
    el.hidden = false;
    el.dataset.state = s.studiedToday ? "on" : "risco";
    el.title = s.studiedToday
      ? `Ofensiva de ${dias}. Recorde: ${s.longest}.`
      : `Ofensiva de ${dias}, mas você ainda não estudou hoje — não perca!`;
    el.innerHTML = `<span class="streak-flame">🔥</span><span class="streak-count">${s.current}</span>`;
  }

  // Nota estimada "se a prova fosse hoje": média do acerto por frente,
  // ponderada pelo peso real da frente na prova (window.PRIORITY_WEIGHTS).
  // Frentes nunca praticadas entram com acerto 0 — de propósito, pra não
  // mascarar o que ainda falta estudar (mesmo critério do concorrente).
  function computeProjectedScore() {
    const weights = window.PRIORITY_WEIGHTS || {};
    const topicState = computeTopicStateFromAnswers();
    let sumWeight = 0, sumWeightedScore = 0;
    window.SUBTOPICS.forEach((s) => {
      const w = weights[s.id] || 1;
      const st = topicState[s.id] || { answered: 0, correct: 0 };
      const rate = st.answered > 0 ? st.correct / st.answered : 0;
      sumWeight += w;
      sumWeightedScore += w * rate;
    });
    return sumWeight > 0 ? sumWeightedScore / sumWeight : 0;
  }

  // Grava (no máximo 1x por dia real) um snapshot do score projetado, pra
  // formar a mini linha do tempo mostrada na aba Progresso.
  function recordScoreSnapshot() {
    const history = loadJSON(LS_SCORE_HISTORY, {});
    history[todayISO()] = computeProjectedScore();
    saveJSON(LS_SCORE_HISTORY, history);
    return history;
  }

  // Índice de prontidão por frente: combina acerto (peso 0.5), recência do
  // último contato com a frente (peso 0.25, decai linear até 30 dias sem
  // praticar) e volume de prática (peso 0.25, "coberto" ao responder ~metade
  // do banco daquela frente) — não só a % de acerto crua.
  function computeReadinessIndex(subtopicId) {
    const topicState = computeTopicStateFromAnswers()[subtopicId] || { answered: 0, correct: 0 };
    const lastAnswered = loadJSON(LS_TOPIC_LAST_ANSWERED, {})[subtopicId];
    const accuracy = topicState.answered > 0 ? topicState.correct / topicState.answered : 0;
    const bankSize = ((window.QUESTION_BANKS && window.QUESTION_BANKS[subtopicId]) || []).length;
    const volumeScore = bankSize > 0 ? Math.min(1, topicState.answered / (bankSize * 0.5)) : 0;
    let recencyScore = 0;
    if (lastAnswered) {
      const daysAgo = Math.floor((new Date(todayISO()) - new Date(lastAnswered)) / 86400000);
      recencyScore = Math.max(0, 1 - daysAgo / 30);
    }
    const index = accuracy * 0.5 + recencyScore * 0.25 + volumeScore * 0.25;
    return { index, accuracy, answered: topicState.answered, lastAnswered };
  }

  function renderProjectedScoreCard() {
    const history = recordScoreSnapshot();
    const pct = Math.round(computeProjectedScore() * 100);
    const entries = Object.entries(history).sort((a, b) => a[0].localeCompare(b[0])).slice(-14);
    const sparkHtml = entries
      .map(([date, s]) => `<div class="spark-bar" style="height:${Math.max(4, Math.round(s * 100))}%" title="${date}: ${Math.round(s * 100)}%"></div>`)
      .join("");

    // Quanto o score andou desde o registro mais antigo da janela. É o número
    // que dá sentido ao número grande: 64% sozinho não diz se está indo bem.
    let delta = "";
    if (entries.length > 1) {
      const primeiro = Math.round(entries[0][1] * 100);
      const d = pct - primeiro;
      delta = " " + (d >= 0 ? "Subiu " + d : "Caiu " + Math.abs(d)) +
        " ponto" + (Math.abs(d) === 1 ? "" : "s") + " nos últimos " + entries.length + " dias com registro.";
    }

    const wrap = document.createElement("div");
    wrap.className = "card-navy score-card";
    wrap.innerHTML = `
      <div class="eyebrow eyebrow-sobre-navy">Score projetado na prova</div>
      <div class="projected-score-value">${pct}%</div>
      <div class="texto-apoio">Acerto ponderado pelo peso de cada frente na banca. Frentes ainda não
      praticadas contam contra a nota — proposital, pra não mascarar o que falta.${escapeHtml(delta)}</div>
      ${entries.length > 1 ? `<div class="score-sparkline">${sparkHtml}</div>` : ""}
    `;
    return wrap;
  }

  // ---------- Aggregate state (topic + day) ----------
  function bumpTopicState(subtopicId, isCorrect) {
    const state = getTopicState();
    if (!state[subtopicId]) state[subtopicId] = { answered: 0, correct: 0 };
    state[subtopicId].answered++;
    if (isCorrect) state[subtopicId].correct++;
    saveJSON(LS_TOPIC_STATE, state);
  }

  function bumpDayState(day, isCorrect) {
    const state = getDayState();
    if (!state[day]) state[day] = { answered: 0, correct: 0, total: 0 };
    state[day].answered++;
    if (isCorrect) state[day].correct++;
    saveJSON(LS_DAY_STATE, state);
  }

  // recompute topic/day aggregates from scratch (used when an already-answered
  // question is clicked again with a different option)
  //
  // Note: the same question can legitimately appear in several different days'
  // exercise sets (banks are reused for spaced repetition across the 90 dias).
  // dayState must count per day-OCCURRENCE (vd_dayAnswers) — using the global
  // vd_answers here would make a question answered on day 5 show as already
  // answered on every other day it happens to reappear in (real bug reported
  // by the user). topicState still counts each *unique* question once,
  // globally, via computeTopicStateFromAnswers.
  function recomputeAll() {
    const dayAnswers = getDayAnswers();
    const dayState = {};

    plan.forEach((entry) => {
      const content = getDayContent(plan, entry.day);
      let dAnswered = 0, dCorrect = 0, dTotal = 0;
      const perQuestion = content.type === "simulado"
        ? content.items.map((item) => ({ subtopicId: item.subtopicId, q: item.question }))
        : content.lessons.flatMap((lesson) => lesson.questions.map((q) => ({ subtopicId: lesson.subtopicId, q })));
      perQuestion.forEach(({ subtopicId, q }) => {
        dTotal++;
        const dKey = dayAnswerKey(entry.day, subtopicId, q.id);
        const chosen = dayAnswers[dKey];
        if (chosen) {
          dAnswered++;
          if (chosen === q.resposta) dCorrect++;
        }
      });
      dayState[entry.day] = { answered: dAnswered, correct: dCorrect, total: dTotal };
    });

    saveJSON(LS_TOPIC_STATE, computeTopicStateFromAnswers());
    saveJSON(LS_DAY_STATE, dayState);
  }

  // Counts each answered question exactly once per subtopic, regardless of
  // how many days in the plan happen to include it.
  function computeTopicStateFromAnswers() {
    const answers = getAnswers();
    const topicState = {};
    window.SUBTOPICS.forEach((s) => (topicState[s.id] = { answered: 0, correct: 0 }));

    Object.entries(answers).forEach(([key, chosen]) => {
      const sep = key.indexOf("::");
      const subtopicId = key.slice(0, sep);
      const questionId = key.slice(sep + 2);
      if (!topicState[subtopicId]) return;
      const bank = (window.QUESTION_BANKS && window.QUESTION_BANKS[subtopicId]) || [];
      const q = bank.find((qq) => qq.id === questionId);
      if (!q) return;
      topicState[subtopicId].answered++;
      if (chosen === q.resposta) topicState[subtopicId].correct++;
    });

    return topicState;
  }

  function updateDayStateFromDom(day) {
    // Ensure day total is set correctly even before any answer on this visit
    const content = getDayContent(plan, day);
    const state = getDayState();
    const total = content.totalExercises;
    if (!state[day]) {
      state[day] = { answered: 0, correct: 0, total };
      saveJSON(LS_DAY_STATE, state);
    } else if (state[day].total !== total) {
      state[day].total = total;
      saveJSON(LS_DAY_STATE, state);
    }
  }

  // ---------- Calendar ----------
  // O mapa dos 90 dias passou de uma grade de dez colunas para treze linhas de
  // sete. A razão é que a SEMANA é a unidade real do plano — o domingo é
  // sempre simulado — e numa grade de dez o domingo caía numa coluna diferente
  // a cada linha, o que escondia justamente o ritmo que o plano tem.
  function renderCalendar() {
    rebuildPlan();
    const grid = document.getElementById("calendar-grid");
    grid.innerHTML = "";
    const dayState = getDayState();
    const today = currentDayFromStart();

    let semana = null;
    for (let day = 1; day <= 90; day++) {
      if ((day - 1) % 7 === 0) {
        semana = document.createElement("div");
        semana.className = "cal-semana";
        const rotulo = document.createElement("span");
        rotulo.className = "cal-semana-rotulo";
        rotulo.textContent = "Sem " + Math.ceil(day / 7);
        semana.appendChild(rotulo);
        const dias = document.createElement("div");
        dias.className = "cal-semana-dias";
        semana.appendChild(dias);
        grid.appendChild(semana);
      }

      const cell = document.createElement("div");
      const st = dayState[day];
      let status = "pending";
      if (st && st.total > 0) {
        if (st.answered >= st.total) status = "done";
        else if (st.answered > 0) status = "partial";
      }
      const entry = plan.find((e) => e.day === day);
      const isSimulado = entry && entry.type === "simulado";
      cell.className = "cal-day status-" + status + (day === today ? " is-today" : "") + (isSimulado ? " cal-day--simulado" : "");
      cell.textContent = day;
      cell.title = "Dia " + day + " — " + phaseLabelForDay(day) + (isSimulado ? " — Simulado" : "") + (st ? ` — ${st.answered}/${st.total || "?"} exercícios` : "");
      cell.addEventListener("click", () => {
        document.querySelector('.tab-btn[data-tab="hoje"]').click();
        renderDay(day);
      });
      semana.lastElementChild.appendChild(cell);
    }

    renderCalendarioApoio();
  }

  // Coluna de apoio do calendário: o próximo simulado e em que fase o plano
  // está. As duas coisas respondem "quanto falta" em escalas diferentes —
  // a da semana e a dos 90 dias.
  function renderCalendarioApoio() {
    const apoio = document.getElementById("calendario-apoio");
    if (!apoio) return;
    apoio.innerHTML = "";

    const hoje = currentDayFromStart();
    const start = localStorage.getItem(LS_START) || todayISO();
    const proximo = plan.find((e) => e.type === "simulado" && e.day >= hoje);

    if (proximo) {
      const card = document.createElement("div");
      card.className = "card-navy";
      // O índice da "visita" do simulado sai do conteúdo do dia, não do dia:
      // é a contagem de simulados até aqui (simuladoNumber), base 0.
      const conteudo = getDayContent(plan, proximo.day);
      const quantas = (pickSimuladoQuestions((conteudo.simuladoNumber || 1) - 1) || []).length;
      card.innerHTML = `
        <div class="eyebrow eyebrow-sobre-navy">Próximo simulado</div>
        <div class="num" style="font-size:1.25rem">${escapeHtml(formatDate(addDays(start, proximo.day - 1)))} · dia ${proximo.day}</div>
        <div class="texto-apoio">${quantas ? quantas + " questões distribuídas entre as frentes. " : ""}Os erros reprogramam a semana seguinte.</div>`;
      apoio.appendChild(card);
    }

    const fases = document.createElement("div");
    fases.className = "fases-card";
    fases.innerHTML = '<div class="fases-card-titulo">Fases do plano</div>';
    [
      { nome: "Fase 1 · Base", de: 1, ate: 30 },
      { nome: "Fase 2 · Aprofundamento", de: 31, ate: 65 },
      { nome: "Fase 3 · Reta final", de: 66, ate: 90 },
    ].forEach((f) => {
      const atual = hoje >= f.de && hoje <= f.ate;
      const row = document.createElement("div");
      row.className = "fase-row" + (atual ? " fase-atual" : "");
      row.innerHTML = `
        <span class="fase-barra"></span>
        <div style="display:flex;flex-direction:column;gap:2px">
          <span class="fase-nome">${escapeHtml(f.nome)}</span>
          <span class="fase-intervalo">Dias ${f.de}–${f.ate}${atual ? " · em curso" : ""}</span>
        </div>`;
      fases.appendChild(row);
    });
    apoio.appendChild(fases);
  }

  // ---------- Progress tab ----------
  function renderProgress() {
    rebuildPlan();

    const list = document.getElementById("progress-list");
    const scoreContainer = document.getElementById("projected-score-container");
    const diagContainer = document.getElementById("diagnostico-container");

    if (progressoSosId) {
      if (scoreContainer) scoreContainer.innerHTML = "";
      if (diagContainer) diagContainer.innerHTML = "";
      list.innerHTML = "";
      list.appendChild(renderSosView(progressoSosId));
      return;
    }

    if (scoreContainer) {
      scoreContainer.innerHTML = "";
      scoreContainer.appendChild(renderProjectedScoreCard());
    }
    // O diagnóstico qualitativo saiu de dentro do bloco do score: ele é uma
    // leitura à parte, e empilhado lá dentro espremia os dois.
    if (diagContainer) {
      diagContainer.innerHTML = "";
      diagContainer.appendChild(renderErrorDiagnosticsCard());
    }

    list.innerHTML = "";
    const topicState = getTopicState();
    const occurrences = countTopicOccurrences(plan);

    // "Ordenado pela frente mais fraca" — é a promessa que o cabeçalho do
    // cartão faz, e é o que transforma uma lista de dezesseis barras numa
    // instrução: comece de cima. Frentes sem resposta ficam por último, não
    // em primeiro com 0% — nunca praticadas não é o mesmo que mal praticadas.
    const frentes = window.SUBTOPICS.map((s) => {
      const st = topicState[s.id] || { answered: 0, correct: 0 };
      const pct = st.answered > 0 ? Math.round((st.correct / st.answered) * 100) : 0;
      return { s, st, pct, virgem: st.answered === 0 };
    }).sort((a, b) => {
      if (a.virgem !== b.virgem) return a.virgem ? 1 : -1;
      return a.pct - b.pct;
    }).map((item, indice) => Object.assign(item, { indice }));

    // Agrupa por matéria. A lista já vem ordenada da mais fraca para a mais
    // forte, e o agrupamento preserva isso duas vezes: a matéria aparece na
    // posição do seu pior subtema, e dentro dela os subtemas seguem a mesma
    // ordem. Uma lista plana de 79 linhas diria a mesma coisa e não seria lida.
    const porFrente = new Map();
    frentes.forEach((item) => {
      const chave = item.s.frenteId;
      if (!porFrente.has(chave)) porFrente.set(chave, { nome: item.s.area, itens: [] });
      porFrente.get(chave).itens.push(item);
    });

    porFrente.forEach((grupo) => {
      const respondidas = grupo.itens.reduce((soma, i) => soma + i.st.answered, 0);
      const certas = grupo.itens.reduce((soma, i) => soma + i.st.correct, 0);
      const pctFrente = respondidas > 0 ? Math.round((certas / respondidas) * 100) : 0;

      const cabecalho = document.createElement("div");
      cabecalho.className = "progress-frente";
      cabecalho.innerHTML = `
        <span class="progress-frente-nome">${escapeHtml(grupo.nome)}</span>
        <span class="progress-frente-stat">${respondidas > 0 ? certas + " de " + respondidas + " · " + pctFrente + "%" : "ainda sem respostas"} · ${grupo.itens.length} temas</span>
      `;
      list.appendChild(cabecalho);

      grupo.itens.forEach(({ s, st, pct, virgem, indice }) => {
      const bankSize = (window.QUESTION_BANKS && window.QUESTION_BANKS[s.id] || []).length;
      const readiness = computeReadinessIndex(s.id);
      const readinessPct = Math.round(readiness.index * 100);

      const row = document.createElement("div");
      // As três frentes mais fracas levam a barra em ouro escuro: é onde a
      // pessoa perde ponto, e é isso que a tela promete mostrar.
      row.className = "progress-row" + (!virgem && indice < 3 ? " is-fraca" : "");
      row.innerHTML = `
        <div class="progress-row-top">
          <span class="name">${escapeHtml(s.nome)}</span>
          <span class="stat">${virgem ? "ainda sem respostas" : st.correct + " de " + st.answered + " · " + pct + "%"} · ${occurrences[s.id]}x no plano · ${bankSize} no banco</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        <div class="readiness-row" title="Combina acerto + recência + volume de prática">
          <span class="readiness-label">Prontidão</span>
          <div class="bar-track readiness-track"><div class="bar-fill readiness-fill" style="width:${readinessPct}%"></div></div>
          <span class="readiness-pct">${readinessPct}%</span>
        </div>
        <button type="button" class="btn-link sos-btn" style="margin-top:8px;">SOS deste tema</button>
      `;
      row.querySelector(".sos-btn").addEventListener("click", () => {
        progressoSosId = s.id;
        renderProgress();
      });
      list.appendChild(row);
      });
    });
  }

  // ---------- Aba Perfil e conta ----------
  //
  // Tudo que é sobre a CONTA — quem sou, desde quando, qual trilha, e o botão
  // que apaga tudo — saiu da aba de progresso e veio pra cá. A zona de perigo
  // em especial estava no fim da tela que a pessoa mais abre pra se animar com
  // o próprio avanço, que é o pior lugar possível pro botão de reiniciar.
  function renderPerfilTab() {
    const user = (window.VD_AUTH && window.VD_AUTH.user) || null;

    const nome = document.getElementById("perfil-nome");
    const email = document.getElementById("perfil-email");
    const avatar = document.getElementById("perfil-avatar");
    const fallback = document.getElementById("perfil-avatar-fallback");

    if (nome) nome.textContent = user ? (user.displayName || "Minha conta") : "Minha conta";
    if (email) {
      const start = localStorage.getItem(LS_START);
      const desde = start ? " · entrou em " + formatDate(addDays(start, 0)) : "";
      email.textContent = (user && user.email ? user.email : "") + desde;
    }
    if (avatar && fallback) {
      if (user && user.photoURL) {
        avatar.src = user.photoURL;
        avatar.hidden = false;
        fallback.hidden = true;
      } else {
        avatar.hidden = true;
        fallback.hidden = false;
      }
    }

    renderCorrigirInicio();
    renderAssinaturaPerfil();

    const syncContainer = document.getElementById("sync-container");
    if (syncContainer) {
      syncContainer.innerHTML = "";
      syncContainer.appendChild(renderSyncCard());
    }
  }

  // ---------- A caixa "Minha assinatura", na aba de Perfil ----------
  //
  // Não existe API confirmada da Cakto para cancelar uma assinatura por trás
  // do nosso servidor — o spec público deles (mintlify) é um exemplo de
  // template, nunca preenchido com a API real. Quem cancela de verdade é o
  // PRÓPRIO comprador, dentro da conta dele na Cakto, em "Minhas Assinaturas".
  // Este botão não pula essa etapa: ele leva até lá e explica o caminho, em
  // vez de fingir que o clique aqui já cancelou algo.
  const CAKTO_LOGIN_URL = "https://app.cakto.com.br/auth/login";

  function renderAssinaturaPerfil() {
    const container = document.getElementById("assinatura-perfil-container");
    if (!container) return;

    const acesso = (window.VD_AUTH && window.VD_AUTH.acesso) || null;
    container.innerHTML = "";
    // Sem veredito (ex: portão desligado) não há o que mostrar — a caixa
    // some em vez de exibir um estado inventado.
    if (!acesso) return;

    const box = document.createElement("div");
    box.className = "perfil-box";

    const titulo = document.createElement("div");
    titulo.className = "perfil-box-titulo";
    titulo.textContent = "Minha assinatura";
    box.appendChild(titulo);

    const nota = document.createElement("div");
    nota.className = "perfil-box-nota";

    if (acesso.estado === "teste") {
      nota.textContent = "Você está no teste grátis — ainda não tem assinatura paga.";
      box.appendChild(nota);
      container.appendChild(box);
      return;
    }

    const dataExpira = acesso.expiraEm ? new Date(acesso.expiraEm).toLocaleDateString("pt-BR") : "";

    if (acesso.plano === "mensal") {
      nota.textContent = acesso.renovacaoAtiva
        ? "Plano mensal — R$ 19,99/mês. Renova em " + dataExpira + "."
        : "Plano mensal cancelado — seu acesso segue até " + dataExpira + ", sem nova cobrança.";
    } else {
      nota.textContent = "Plano de " + (acesso.plano || "90 dias") + " — vence em " + dataExpira +
        ". Pagamento único, sem renovação automática.";
    }
    box.appendChild(nota);

    // Só existe o que cancelar quando há uma renovação futura de verdade —
    // plano de 90 dias e assinatura já cancelada não mostram o botão.
    if (acesso.plano === "mensal" && acesso.renovacaoAtiva) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-secondary";
      btn.textContent = "Cancelar assinatura";

      const instrucoes = document.createElement("div");
      instrucoes.className = "perfil-box-nota assinatura-cancelar-passos";
      instrucoes.hidden = true;
      instrucoes.innerHTML =
        "Quem cobra é a Cakto, e é lá que se cancela — não tem como fazer isso por aqui. " +
        "Entre com o e-mail ou telefone que você usou na hora de assinar, abra " +
        "<strong>Minhas Assinaturas</strong>, toque nos três pontinhos ao lado da sua " +
        "assinatura do sagax e escolha <strong>Cancelar</strong>. Isso não corta seu acesso " +
        "agora: você continua estudando normalmente até " + dataExpira + ".";

      const link = document.createElement("a");
      link.className = "btn btn-primary";
      link.href = CAKTO_LOGIN_URL;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Abrir a Cakto";
      // display inline-block explícito: fora de #view-assinatura não existe
      // regra que tire a âncora do display:inline padrão, e um botão inline
      // não centra o padding/borda direito (mesmo motivo do .btn-link).
      link.style.display = "inline-block";
      link.style.marginTop = "8px";

      btn.addEventListener("click", () => {
        instrucoes.hidden = !instrucoes.hidden;
      });

      box.appendChild(btn);
      box.appendChild(instrucoes);
      instrucoes.appendChild(document.createElement("br"));
      instrucoes.appendChild(link);
    }

    container.appendChild(box);
  }

  // ---------- Achado 10: sincronização entre aparelhos (Firebase, opcional) ----------
  // Enquanto window.FIREBASE_CONFIG (data/sync-config.js) for null, essas
  // funções nunca são chamadas de verdade — o app segue 100% local. Import
  // dinâmico do SDK via CDN só acontece na primeira ação de sync, pra não
  // pagar custo de rede em quem nunca configurou.
  let firebaseDb = null;
  let firebaseFns = null;

  async function ensureFirebase() {
    if (!window.FIREBASE_CONFIG) return false;
    if (firebaseDb) return true;
    try {
      const [{ initializeApp }, firestoreMod] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js"),
      ]);
      const app = initializeApp(window.FIREBASE_CONFIG);
      firebaseDb = firestoreMod.getFirestore(app);
      firebaseFns = firestoreMod;
      return true;
    } catch (e) {
      console.error("Falha ao carregar Firebase:", e);
      return false;
    }
  }

  function collectSyncableState() {
    const data = {};
    SYNCABLE_KEYS.forEach((k) => {
      const v = localStorage.getItem(k);
      if (v != null) data[k] = v;
    });
    return data;
  }

  function applySyncedState(data) {
    Object.entries(data).forEach(([k, v]) => {
      if (SYNCABLE_KEYS.includes(k)) localStorage.setItem(k, v);
    });
  }

  function generateSyncCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sem 0/O/1/I, pra evitar confusão ao digitar
    let code = "";
    for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  async function pushSyncState(code) {
    const ok = await ensureFirebase();
    if (!ok) return { ok: false, error: "Firebase não configurado (veja data/sync-config.js)" };
    try {
      const { doc, setDoc } = firebaseFns;
      await setDoc(doc(firebaseDb, "syncCodes", code), { data: collectSyncableState(), updatedAt: Date.now() });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: String(e && e.message ? e.message : e) };
    }
  }

  async function pullSyncState(code) {
    const ok = await ensureFirebase();
    if (!ok) return { ok: false, error: "Firebase não configurado (veja data/sync-config.js)" };
    try {
      const { doc, getDoc } = firebaseFns;
      const snap = await getDoc(doc(firebaseDb, "syncCodes", code));
      if (!snap.exists()) return { ok: false, error: "Código não encontrado" };
      applySyncedState(snap.data().data || {});
      return { ok: true };
    } catch (e) {
      return { ok: false, error: String(e && e.message ? e.message : e) };
    }
  }

  function renderSyncCard() {
    const wrap = document.createElement("div");
    wrap.className = "card official-exams-card";
    const savedCode = localStorage.getItem(LS_SYNC_CODE) || "";
    const configured = !!window.FIREBASE_CONFIG;

    wrap.innerHTML = `
      <h3>Sincronização entre aparelhos</h3>
      <p class="lesson-desc">${configured
        ? "Gere um código e use o mesmo código no outro aparelho pra levar seu progresso junto. Sem código, tudo segue funcionando só neste aparelho."
        : "Sincronização em tempo real ainda não configurada neste app (veja as instruções em data/sync-config.js). Enquanto isso, use exportar/importar como backup manual."}</p>
      ${configured ? `
        <input type="text" class="sync-code-input" placeholder="Código de sincronização" value="${escapeHtml(savedCode)}" maxlength="8" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:8px; font:inherit; margin-bottom:10px; text-transform:uppercase; background:var(--surface); color:var(--ink);">
        <div class="dissert-actions">
          <button type="button" class="btn btn-secondary sync-generate-btn" style="width:auto;">Gerar código novo</button>
          <button type="button" class="btn btn-secondary sync-push-btn" style="width:auto;">Enviar meu progresso</button>
          <button type="button" class="btn btn-secondary sync-pull-btn" style="width:auto;">Puxar progresso do código</button>
        </div>
        <p class="hint sync-status" style="margin-top:8px;"></p>
      ` : ""}
      <div class="dissert-actions" style="margin-top:${configured ? "16px" : "10px"};">
        <button type="button" class="btn btn-secondary sync-export-btn" style="width:auto;">Exportar progresso (.json)</button>
        <label class="btn btn-secondary" style="width:auto; cursor:pointer; display:inline-flex; align-items:center;">
          Importar progresso
          <input type="file" accept=".json" class="sync-import-input" hidden>
        </label>
      </div>
    `;

    if (configured) {
      const input = wrap.querySelector(".sync-code-input");
      const status = wrap.querySelector(".sync-status");
      wrap.querySelector(".sync-generate-btn").addEventListener("click", () => {
        const code = generateSyncCode();
        input.value = code;
        localStorage.setItem(LS_SYNC_CODE, code);
        status.textContent = "Código gerado. Clique em \"Enviar meu progresso\" pra publicar, ou digite esse código no outro aparelho e clique em \"Puxar\" lá.";
      });
      wrap.querySelector(".sync-push-btn").addEventListener("click", async () => {
        const code = input.value.trim().toUpperCase();
        if (!code) { status.textContent = "Gere ou digite um código primeiro."; return; }
        localStorage.setItem(LS_SYNC_CODE, code);
        status.textContent = "Enviando...";
        const res = await pushSyncState(code);
        status.textContent = res.ok ? "Progresso enviado com sucesso." : "Erro ao enviar: " + res.error;
      });
      wrap.querySelector(".sync-pull-btn").addEventListener("click", async () => {
        const code = input.value.trim().toUpperCase();
        if (!code) { status.textContent = "Digite o código do outro aparelho primeiro."; return; }
        if (!confirm("Isso vai substituir o progresso deste aparelho pelo progresso salvo nesse código. Continuar?")) return;
        status.textContent = "Puxando...";
        const res = await pullSyncState(code);
        if (res.ok) {
          status.textContent = "Progresso atualizado! Recarregando...";
          localStorage.setItem(LS_SYNC_CODE, code);
          setTimeout(() => location.reload(), 800);
        } else {
          status.textContent = "Erro: " + res.error;
        }
      });
    }

    wrap.querySelector(".sync-export-btn").addEventListener("click", () => {
      const data = collectSyncableState();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sagax-" + TRILHA_CFG.id + "-progresso.json";
      a.click();
      URL.revokeObjectURL(url);
    });
    wrap.querySelector(".sync-import-input").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!confirm("Isso vai substituir o progresso deste aparelho pelo arquivo importado. Continuar?")) {
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          applySyncedState(data);
          alert("Progresso importado! A página vai recarregar.");
          location.reload();
        } catch (err) {
          alert("Arquivo inválido — precisa ser um .json exportado por este app.");
        }
      };
      reader.readAsText(file);
    });

    return wrap;
  }

  function initReset() {
    const btn = document.getElementById("btn-reset");
    btn.addEventListener("click", async () => {
      // No v2 o progresso mora na CONTA, não no navegador. Apagar só o
      // localStorage não reinicia nada: no login seguinte o sync baixa tudo de
      // volta e parece que o botão não funcionou. Por isso apagamos a nuvem
      // primeiro, e só limpamos este aparelho se aquilo der certo.
      if (!confirm(
        "Isso vai apagar todo o seu progresso da SUA CONTA — em todos os aparelhos, " +
        "não só neste. Não dá pra desfazer. Continuar?"
      )) return;

      btn.disabled = true;
      const textoOriginal = btn.textContent;
      btn.textContent = "Apagando…";

      const r = await window.VD_SYNC.apagarTudoNaNuvem();
      if (!r.ok) {
        btn.disabled = false;
        btn.textContent = textoOriginal;
        alert(
          "Não consegui apagar o progresso da sua conta (" + r.motivo + ").\n\n" +
          "Nada foi alterado. Verifique sua conexão e tente de novo — se eu limpasse " +
          "só este aparelho, seu progresso voltaria no próximo login."
        );
        return;
      }

      SYNCABLE_KEYS.concat([LS_SYNC_CODE, LS_STUDY_DAYS]).forEach((k) => localStorage.removeItem(k));
      localStorage.removeItem("v2_syncMeta");
      location.reload();
    });
  }

  // ---------- Corrigir a data de início (v2) ----------
  //
  // O dia do plano e as matérias de cada dia saem todos da data de início. Se
  // ela ficar errada — por um aparelho que começou um plano novo, por exemplo —
  // o app inteiro passa a mostrar o dia errado, e não havia como consertar.
  function renderCorrigirInicio() {
    const container = document.getElementById("corrigir-inicio-container");
    if (!container) return;
    const atual = localStorage.getItem(LS_START) || todayISO();
    const dia = currentDayFromStart();

    container.innerHTML = `
      <div class="card corrigir-inicio-card">
        <h3>Data de início do plano</h3>
        <p class="lesson-desc">Seu plano começou em <strong>${escapeHtml(atual)}</strong>,
        o que coloca você no <strong>dia ${dia}</strong> de 90. Se essa data estiver errada,
        corrija aqui — é ela que define o dia atual e quais matérias caem em cada dia.</p>
        <div class="dissert-actions" style="align-items:center; gap:8px;">
          <input type="date" id="input-inicio" class="corrigir-inicio-input" value="${escapeHtml(atual)}" max="${todayISO()}">
          <button id="btn-corrigir-inicio" class="btn btn-secondary" style="width:auto;">Salvar data</button>
        </div>
        <p id="corrigir-inicio-status" class="hint" style="margin-top:8px;" hidden></p>
      </div>
    `;

    const status = document.getElementById("corrigir-inicio-status");
    document.getElementById("btn-corrigir-inicio").addEventListener("click", async () => {
      const nova = document.getElementById("input-inicio").value;
      if (!nova) return;
      status.hidden = false;
      status.textContent = "Salvando…";
      const r = await window.VD_SYNC.definirDataDeInicio(nova);
      if (!r.ok) {
        status.textContent = "Não consegui salvar (" + r.motivo + ").";
        return;
      }
      status.textContent = "Data salva. Recarregando…";
      setTimeout(() => location.reload(), 600);
    });
  }

  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Fontes visuais das questões: charge, tirinha, mapa, gráfico, obra de arte,
  // esquema. As duas bancas usam muito — só na FGV 2026.1 há tirinha, gravura,
  // charge, desenho de relatório do IHGB e gráfico do IBGE.
  //
  // `descricao` é obrigatória e não é legenda decorativa: é o que faz a questão
  // continuar respondível enquanto o arquivo de imagem não existe, e é o texto
  // alternativo quando ele existe. Por isso ela é renderizada mesmo com imagem.
  //
  // O caminho passa por uma whitelist estrita em vez de ir direto pro src. Todo
  // o resto do app escapa os campos de dados (escapeHtml), então este é o único
  // ponto em que conteúdo de arquivo de dados vira markup — e um caminho que
  // aceitasse "javascript:" ou um host externo seria um furo aberto pelo
  // próprio banco de questões.
  // Resolve o texto de apoio de uma questão. Questões avulsas trazem o texto
  // inline; questões de cluster apontam para uma entrada de window.QUESTION_TEXTS
  // por textoId. Passa pelo mesmo escapeHtml do resto, sem caminho novo.
  function resolveSupportText(q) {
    if (!q) return "";
    if (q.texto_apoio) return q.texto_apoio;
    if (!q.textoId) return "";
    const t = (window.QUESTION_TEXTS || {})[q.textoId];
    return (t && t.conteudo) || "";
  }

  // Anexa uma questão a um container colapsando o texto repetido do cluster.
  //
  // Um artigo de 1.900 caracteres impresso de novo em cada uma das quatro
  // questões que o compartilham não é só feio: empurra as alternativas para
  // fora da tela e desfaz justamente o que o agrupamento treina, que é
  // sustentar uma leitura ao longo de várias perguntas.
  //
  // O "anterior" sai do DOM, e não de uma variável de closure, porque as
  // questões extras puxadas pelo botão "puxar mais 10" são acrescentadas ao
  // mesmo container muito depois, de outra chamada — ler o último filho é o
  // único jeito de o colapso continuar valendo entre as duas levas.
  //
  // Quem anexa sem passar por aqui segue mostrando o texto em cada questão, e
  // isso está certo: no Caderno de Erros a questão aparece sozinha, sem a
  // anterior por perto para servir de referência.
  function appendGrouped(container, q, node) {
    const tid = (q && q.textoId) || "";
    node.dataset.textoId = tid;
    const anterior = container.lastElementChild;
    if (tid && anterior && anterior.dataset && anterior.dataset.textoId === tid) {
      const dup = node.querySelector(".q-support");
      if (dup) {
        dup.className = "q-support-ref";
        dup.textContent = "Mesmo texto da questão anterior.";
      }
    }
    container.appendChild(node);
  }

  const VISUAL_PATH_OK = /^assets\/[A-Za-z0-9._/-]+\.(svg|png|jpg|jpeg|webp)$/;

  function renderVisual(visual) {
    if (!visual || !visual.descricao) return "";
    const arquivoOk = visual.arquivo && VISUAL_PATH_OK.test(visual.arquivo) && !visual.arquivo.includes("..");
    const imgHtml = arquivoOk
      ? `<img src="${escapeHtml(visual.arquivo)}" alt="${escapeHtml(visual.descricao)}" loading="lazy">`
      : "";
    const tipoHtml = visual.tipo ? `<span class="q-visual-tipo">${escapeHtml(visual.tipo)}</span>` : "";
    return `
      <figure class="q-visual${arquivoOk ? "" : " q-visual-sem-imagem"}">
        ${imgHtml}
        <figcaption>${tipoHtml}${escapeHtml(visual.descricao)}</figcaption>
      </figure>`;
  }

  // ---------- Init ----------
  // No v2 o app não sobe sozinho: quem manda subir é o auth.js, depois de
  // confirmar que existe um usuário logado. Assim nenhuma tela do plano
  // aparece antes do login.
  let booted = false;
  window.VD_BOOT = function bootApp() {
    if (booted) return;
    booted = true;
    aplicarTrilhaNaUI(); // antes de qualquer render: troca textos e some com abas
    initOnboarding();
    initTabs();
    initDayNav();
    initReset();
    initTrocarTrilha();
  };
})();