(function () {
  const LS_START = "vd_startDate";
  const LS_ANSWERS = "vd_answers"; // { "<subtopicId>::<questionId>": "a" } — última resposta, GLOBAL (usada pra stats de frente/Caderno de Erros, "vale a mais recente")
  const LS_DAY_ANSWERS = "vd_dayAnswers"; // { "<day>::<subtopicId>::<questionId>": "a" } — resposta ESPECÍFICA daquela ocorrência do dia, corrige bug de bancos maiores fazendo a mesma questão reaparecer em dias diferentes
  const LS_DAY_STATE = "vd_dayState"; // { "<day>": { answered: n, correct: n, total: n } }
  const LS_TOPIC_STATE = "vd_topicState"; // { "<subtopicId>": { answered: n, correct: n } }
  const LS_DISSERT_STATUS = "vd_dissertStatus"; // { "<day>": "done" | "skipped" }
  const LS_DISSERT_ANSWERS = "vd_dissertAnswers"; // { "<day>::<questionId>": "texto do usuário" }
  const LS_DISSERT_CHECKLIST = "vd_dissertChecklist"; // { "<day>::<questionId>::<pointIndex>": true }, autoavaliação dos pontos esperados
  const LS_REDACAO_ANSWERS = "vd_redacaoAnswers"; // { "<redacaoId>": "texto do usuário" }, aba Redação (prova à parte, não é dissertativa)
  const LS_REDACAO_CHECKLIST = "vd_redacaoChecklist"; // { "<redacaoId>::<pointIndex>": true }, autoavaliação pela grade oficial
  const LS_REDACAO_DONE = "vd_redacaoDone"; // { "<redacaoId>": true }, propostas já treinadas
  const LS_CYCLE_WEIGHTS = "vd_cycleWeights"; // { "<cycleIndex>": { "<subtopicId>": peso } }, travado após cada simulado
  const LS_SIMULADO_MODO = "vd_simuladoModo"; // { "<dia>": "adaptativo" | "fgv" | "insper" }, modo do simulado daquele domingo
  const LS_SCORE_HISTORY = "vd_scoreHistory"; // { "<isoDate>": score 0..1 }, achado 5 (score projetado)
  const LS_TOPIC_LAST_ANSWERED = "vd_topicLastAnswered"; // { "<subtopicId>": isoDate }, achado 6 (índice de prontidão)
  const LS_THEORY_SEEN = "vd_theorySeen"; // { "<subtopicId>": true }, achado 1 (teoria por frente)
  const LS_FLASHCARD_STATE = "vd_flashcardState"; // { "<subtopicId>::<questionId>": { interval, reps, dueDate } }, achado 2
  const LS_OBRAS_STUDIED = "vd_obrasStudied"; // { "<obraId>": true }, achado 13 (obras obrigatórias)
  const LS_SYNC_CODE = "vd_syncCode"; // último código de sincronização usado neste aparelho, achado 10

  const SYNCABLE_KEYS = [
    LS_START, LS_ANSWERS, LS_DAY_ANSWERS, LS_DAY_STATE, LS_TOPIC_STATE, LS_DISSERT_STATUS, LS_DISSERT_ANSWERS,
    LS_DISSERT_CHECKLIST, LS_CYCLE_WEIGHTS, LS_SCORE_HISTORY, LS_TOPIC_LAST_ANSWERED, LS_THEORY_SEEN,
    LS_FLASHCARD_STATE, LS_OBRAS_STUDIED,
  ];

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
    const fullPool = window.DISSERTATIVAS || [];
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
  }

  // ---------- Tabs ----------
  function initTabs() {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
        if (btn.dataset.tab === "calendario") renderCalendar();
        if (btn.dataset.tab === "progresso") renderProgress();
        if (btn.dataset.tab === "simulados") renderSimuladosTab();
        if (btn.dataset.tab === "cards") renderCardsTab();
        if (btn.dataset.tab === "redacao") renderRedacaoTab();
        if (btn.dataset.tab === "obras") renderObrasTab();
        if (btn.dataset.tab === "erros") renderErrosTab();
      });
    });
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
      const theoryDone = content.lessons.every((l) => !window.THEORY || !window.THEORY[l.subtopicId] || seenTheory[l.subtopicId]);
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
      .map((t) => `<li class="${t.done ? "task-done" : ""}">${t.done ? "✓" : "○"} ${escapeHtml(t.label)}</li>`)
      .join("");
    return `<div class="day-checklist" id="day-checklist">
      <div class="day-checklist-header">${doneCount}/${tasks.length} tarefas de hoje</div>
      <ul class="day-checklist-list">${itemsHtml}</ul>
    </div>`;
  }

  function updateDayChecklist(day) {
    const el = document.getElementById("day-checklist");
    if (!el || !plan) return;
    const content = getDayContent(plan, day);
    const wrap = document.createElement("div");
    wrap.innerHTML = renderDayChecklist(day, content);
    el.replaceWith(wrap.firstElementChild);
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

    const checklistWrap = document.createElement("div");
    checklistWrap.innerHTML = renderDayChecklist(day, content);
    container.appendChild(checklistWrap.firstElementChild);

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
      content.lessons.forEach((lesson) => {
        container.appendChild(renderLessonCard(day, lesson));
      });
    }

    const dissertContainer = document.createElement("div");
    dissertContainer.id = "dissert-section";
    container.appendChild(dissertContainer);

    updateDayStateFromDom(day);
    renderDissertSection(day);
  }

  // Modo do simulado do domingo, por dia. O adaptativo de 45 é o padrão porque
  // é ele que alimenta os pesos do ciclo seguinte; os oficiais de 60 são
  // ensaio de prova e não realimentam nada.
  function getSimuladoModo(day) { return loadJSON(LS_SIMULADO_MODO, {})[day] || "adaptativo"; }
  function setSimuladoModo(day, modo) {
    const s = loadJSON(LS_SIMULADO_MODO, {});
    s[day] = modo;
    saveJSON(LS_SIMULADO_MODO, s);
  }

  function renderSimuladoCard(day, content) {
    const card = document.createElement("div");
    card.className = "lesson-card simulado-card";
    const modo = getSimuladoModo(day);
    const oficial = modo === "fgv" || modo === "insper";
    const modelo = oficial ? SIMULADO_OFICIAL[modo] : null;
    const items = oficial
      ? pickSimuladoOficial(modo, content.simuladoNumber - 1)
      : content.items;

    const abas = [
      ["adaptativo", "Adaptativo · 45"],
      ["fgv", "Oficial FGV · 60"],
      ["insper", "Oficial Insper · 60"]
    ].map(([id, rotulo]) =>
      `<button type="button" class="simulado-modo-btn${modo === id ? " ativo" : ""}" data-modo="${id}">${rotulo}</button>`
    ).join("");

    const descricao = oficial
      ? `Ensaio da prova real: ${items.length} questões em quatro blocos de 15, na ordem exata do caderno da
         ${escapeHtml(modelo.nome)}, com ${modelo.duracaoMin} minutos de duração. Fazer nessa ordem treina o que o
         simulado adaptativo não alcança — o ritmo, a decisão de abandonar uma questão e o cansaço do quarto bloco,
         que é onde a nota costuma cair. Este modo não altera a programação da próxima semana.`
      : `Hoje não tem vídeo-aula: são ${items.length} questões, distribuídas entre as 16 frentes por prioridade
         (pelo menos uma de cada), para revisar tudo o que você já estudou. Os erros daqui pesam mais forte na
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

    const questionsContainer = card.querySelector(".questions");
    let blocoAtual = null;
    items.forEach((item, idx) => {
      // Cabeçalho de bloco: sem ele, 60 questões em sequência não ensaiam nada
      // além de resistência. É a fronteira do bloco que o candidato precisa
      // sentir, porque é onde ele decide se vai voltar às que pulou.
      if (oficial && item.bloco !== blocoAtual) {
        blocoAtual = item.bloco;
        const cab = document.createElement("div");
        cab.className = "simulado-bloco";
        const faixa = item.blocoIndex * 15 + 1;
        cab.textContent = `Bloco ${item.blocoIndex + 1} · ${item.bloco} · questões ${faixa} a ${faixa + 14}`;
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

    const header = document.createElement("div");
    header.innerHTML = `
      <h2>Todos os simulados</h2>
      <p class="hint">Todo domingo do seu plano vira um simulado. No modo padrão são ~45 questões misturadas entre as
      16 frentes por prioridade, e os erros pesam na programação da semana seguinte; no card do dia você pode trocar
      para o caderno oficial de 60 questões da FGV ou da Insper, em quatro blocos de 15, na ordem da prova. Clique em
      um simulado para ver o resultado detalhado, frente por frente.</p>
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
        if (!seenState[subtopicId]) {
          seenState[subtopicId] = true;
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
      <h2>Flashcards</h2>
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
    window.SUBTOPICS.forEach((s) => {
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

  // ---------- Aba Redação ----------
  // A Redação é prova separada nas duas bancas: na FGV ela é uma das provas
  // discursivas do 1º dia (20 a 30 linhas, dissertativo-argumentativo em prosa)
  // e no Insper é o único componente discursivo. Por isso fica fora do sorteio
  // diário das dissertativas, em aba própria, e o usuário escolhe a proposta.
  let redacaoAbertaId = null;

  function getRedacaoAnswers() { return loadJSON(LS_REDACAO_ANSWERS, {}); }
  function getRedacaoChecklist() { return loadJSON(LS_REDACAO_CHECKLIST, {}); }
  function getRedacaoDone() { return loadJSON(LS_REDACAO_DONE, {}); }

  function renderRedacaoTab() {
    const container = document.getElementById("redacao-content");
    container.innerHTML = "";
    const propostas = window.REDACOES || [];
    const done = getRedacaoDone();
    const feitas = propostas.filter((p) => done[p.id]).length;

    const intro = document.createElement("div");
    // "card" traz só fundo e borda; o padding e o espaçamento entre cards vêm
    // de "lesson-card", que é o que as outras abas usam.
    intro.className = "lesson-card";
    intro.innerHTML = `
      <div class="lesson-eyebrow">Prova de Redação</div>
      <h2 style="margin-top:4px;">Redação em Língua Portuguesa</h2>
      <p class="lesson-desc">Texto <strong>dissertativo-argumentativo, em prosa, de 20 a 30 linhas</strong>, como
      pedem os editais da FGV e do Insper. A correção considera três quesitos: <strong>tema e estrutura</strong>,
      <strong>articulação e argumentação</strong> e <strong>correção gramatical e adequação vocabular</strong>.</p>
      <p class="hint">Nenhuma das duas bancas exige proposta de intervenção — isso é regra do ENEM. Aqui o que
      conta é defender uma tese com clareza e sustentá-la até o fim.</p>
      <div class="dissert-counter"><strong>Propostas já treinadas:</strong> ${feitas}/${propostas.length}</div>
    `;
    container.appendChild(intro);

    propostas.forEach((p) => {
      const card = document.createElement("div");
      card.className = "lesson-card";
      const aberta = redacaoAbertaId === p.id;
      const badge = done[p.id] ? ` <span class="visit-badge">✓ treinada</span>` : "";

      if (!aberta) {
        card.innerHTML = `
          <div class="lesson-eyebrow">Proposta · ~${p.tempoSugerido} min</div>
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
      const pontosHtml = p.pontosEsperados.map((pt, i) => `
        <li>
          <label>
            <input type="checkbox" data-point="${i}" ${checklist[keyFor(i)] ? "checked" : ""}>
            <span>${escapeHtml(pt)}</span>
          </label>
        </li>
      `).join("");

      card.innerHTML = `
        <div class="lesson-eyebrow">Proposta · ~${p.tempoSugerido} min</div>
        <h3 style="margin:4px 0 10px;">${escapeHtml(p.tema)}${badge}</h3>
        <div class="q-support">${escapeHtml(p.texto_apoio)}</div>
        <div class="q-enunciado">${escapeHtml(p.comando)}</div>
        <textarea class="dissert-textarea" rows="18" placeholder="Escreva sua redação aqui (20 a 30 linhas)...">${escapeHtml(answers[p.id] || "")}</textarea>
        <div class="hint redacao-contador"></div>
        <button class="btn-link redacao-toggle-grade" type="button">Ver grade de correção</button>
        <div class="redacao-grade-wrap" hidden>
          <div class="dissert-gabarito-counter">${marcados}/${p.pontosEsperados.length} critérios marcados</div>
          <p class="hint" style="margin:0 0 8px;">Releia o que você escreveu e marque os critérios que realmente
          cumpriu — é autoavaliação, não há correção automática.</p>
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
          counterEl.textContent = `${n}/${p.pontosEsperados.length} critérios marcados`;
        });
      });

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

    // Duas listas: o que consta da lista oficial do edital 2027.1 e o que sobrou
    // de ciclos anteriores. Manter tudo junto sob o rótulo "obrigatórias" daria
    // ao candidato a impressão de que precisa estudar obras que não vão cair.
    const obrigatorias = obras.filter((o) => !o.foraDoEdital2027);
    const complementares = obras.filter((o) => o.foraDoEdital2027);
    const studiedObrig = obrigatorias.filter((o) => studied[o.id]).length;

    const header = document.createElement("div");
    header.innerHTML = `
      <h2>Obras obrigatórias (FGV)</h2>
      <p class="hint">A prova de Artes e Questões Contemporâneas da FGV cobra leitura crítica de uma lista fechada de
      obras, ligadas aos dois eixos da banca (globalização / modernidade → pós-modernidade) — não é decoreba de
      enredo. Sem equivalente na prova do Insper.</p>
      <div class="dissert-counter"><strong>${studiedObrig}/${obrigatorias.length}</strong> estudadas
      &nbsp;·&nbsp; lista do edital 2027.1</div>
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
      subHeader.style.marginTop = "32px";
      subHeader.innerHTML = `
        <h2>Leituras complementares</h2>
        <p class="hint">Estas obras <strong>não constam da lista oficial do edital 2027.1</strong> — vieram de
        ciclos anteriores do vestibular. Não são cobradas, mas continuam úteis como repertório para a redação e
        para as questões discursivas. Priorize a lista de cima.</p>
      `;
      container.appendChild(subHeader);

      const gridExtras = document.createElement("div");
      gridExtras.className = "obras-grid";
      extras.forEach((o) => gridExtras.appendChild(renderObraCard(o, studied)));
      container.appendChild(gridExtras);
    }
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
    // O rótulo sai do banco em vez de ser fixo: quando faltavam as questões das
    // obras do edital 2027.1, o botão prometia cinco e abria uma div vazia.
    const bank = (window.OBRAS_QUESTOES && window.OBRAS_QUESTOES[o.id]) || [];
    const quizHtml = bank.length
      ? `<button type="button" class="btn-link obra-quiz-toggle">Praticar (${bank.length} ${bank.length === 1 ? "questão" : "questões"})</button>
      <div class="obra-questoes" hidden></div>`
      : "";
    const catMeta = OBRA_CATEGORIA_META[o.categoria] || { cls: "cat-default", icon: "" };
    const coverHtml = `
      <div class="obra-cover ${catMeta.cls}">
        <div class="obra-cover-icon">${catMeta.icon}</div>
        <div class="obra-cover-title">${escapeHtml(o.titulo)}</div>
        <div class="obra-cover-autor">${escapeHtml(o.autor)}</div>
      </div>
    `;
    card.innerHTML = `
      ${coverHtml}
      <div class="lesson-eyebrow">${escapeHtml(o.categoria)} · ${escapeHtml(o.origem)}</div>
      <h3>${escapeHtml(o.titulo)}</h3>
      <p class="lesson-desc" style="margin-bottom:8px;">${escapeHtml(o.autor)}</p>
      <button type="button" class="btn-link obra-toggle">Ver resumo e análise</button>
      <div class="obra-detail" hidden>
        <p>${escapeHtml(o.resumo)}</p>
        ${contextoHtml}
        ${pontosChaveHtml}
        ${cenaHtml}
        <p class="theory-resumo" style="margin-top:8px;"><strong>Eixo da banca:</strong> ${escapeHtml(o.analiseEixos)}</p>
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
      <h2>Caderno de Erros</h2>
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

  // Achado 1 (teoria por frente): bloco colapsável com resumo + gatilhos
  // (padrão do enunciado → método de resolução) + pegadinhas comuns,
  // vindos de window.THEORY (data/theory.js). Marcar como "visto" é
  // persistido por frente (não por dia), e conta pro checklist do dia.
  //
  // Frentes com window.THEORY[id].subtemas (hoje: as 3 de Atualidades no
  // piloto) ganham uma camada extra específica de subtema, espelhando o
  // mesmo índice usado por pickLessonVideo — assim a teoria do dia sempre
  // bate com o subtema do vídeo sugerido. Quando visitNumber não é passado
  // (sessão SOS), mostra TODOS os subtemas, não só o do dia.
  function renderTheoryBlockHtml(subtopicId, visitNumber) {
    const theory = window.THEORY && window.THEORY[subtopicId];
    if (!theory) return "";
    const seen = loadJSON(LS_THEORY_SEEN, {})[subtopicId];
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
        <button type="button" class="theory-toggle btn-link">${seen ? "✓ " : ""}Teoria: gatilhos e pegadinhas deste tema</button>
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

    const visitLabel = lesson.visitNumber === 1
      ? "1ª vez estudando este tema"
      : lesson.visitNumber + "ª revisão deste tema";

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
    const minutesEstimate = Math.round(essentialCount * MINUTES_PER_QUESTION_ESTIMATE);
    const extrasKey = day + "::" + lesson.subtopicId;
    const theoryHtml = renderTheoryBlockHtml(lesson.subtopicId, lesson.visitNumber);

    card.innerHTML = `
      <div class="lesson-eyebrow">${escapeHtml(lesson.area)}</div>
      <h3>${escapeHtml(lesson.nome)} <span class="visit-badge">${escapeHtml(visitLabel)}</span></h3>
      <p class="lesson-desc">${escapeHtml(lesson.descricao)}</p>
      ${theoryHtml}
      ${videoHtml}
      <div class="exercise-block">
        <div class="exercise-summary">
          <span>${essentialCount} essenciais${extras.length ? ` · ${extras.length} extras` : ""} · ~${minutesEstimate} min no ritmo da prova</span>
          <span class="score-label" data-score-for="${lesson.subtopicId}"></span>
        </div>
        <div class="questions essentials-questions"></div>
        <div class="extras-block" hidden>
          <div class="extras-label">Extras — pra quem quer ir além, sem culpa se não fizer</div>
          <div class="questions extras-questions"></div>
        </div>
        <div class="extras-actions"></div>
      </div>
    `;

    const theoryToggle = card.querySelector(".theory-toggle");
    if (theoryToggle) {
      theoryToggle.addEventListener("click", () => {
        const theoryContent = card.querySelector(".theory-content");
        theoryContent.hidden = !theoryContent.hidden;
        if (!theoryContent.hidden) {
          const seenState = loadJSON(LS_THEORY_SEEN, {});
          if (!seenState[lesson.subtopicId]) {
            seenState[lesson.subtopicId] = true;
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
        const more = pickMoreQuestions(lesson.subtopicId, lesson.visitNumber - 1, day, alreadyShown, 10);
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
      <div class="q-feedback" hidden></div>
    `;

    if (saved) applyFeedback(wrap, q, saved);

    // Listen on the radio inputs' "change" event (fires exactly once per
    // selection) rather than "click" on the wrapping <label> — clicking a
    // <label> associated with an <input> dispatches a click on the label
    // AND a synthetic click on the input that bubbles back through it,
    // which double-fires a click listener attached to the label.
    wrap.querySelectorAll(".q-alt input").forEach((input) => {
      input.addEventListener("change", () => {
        const letter = input.value;
        const current = getAnswers();
        const alreadyAnsweredGlobally = !!current[key];
        current[key] = letter;
        saveJSON(LS_ANSWERS, current);
        touchTopicLastAnswered(subtopicId);
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
    fb.textContent = (isCorrect ? "Certo! " : "Não foi dessa vez. ") + q.explicacao;
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
    label.textContent = answered > 0 ? `${correct}/${answered} certas` : "";
  }

  // ---------- Dissertativas: renderização ----------
  function renderDissertSection(day) {
    updateDayChecklist(day); // mantém o checklist "X/Y do dia" (achado 14) sempre em dia
    const container = document.getElementById("dissert-section");
    if (!container) return;
    container.innerHTML = "";

    if (!isDayExerciseComplete(day)) return; // só aparece depois que os exercícios do dia acabam

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
        <p class="lesson-desc">Você concluiu os exercícios objetivos de hoje. A FGV também cobra questões
        discursivas de Humanas, Linguagens e Arte. Praticar em pelo menos 4 dias por semana (você escolhe quais)
        ajuda a manter esse treino em dia.</p>
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
      // As três provas discursivas por disciplina da FGV Direito SP (edital 2027):
      // Ciências Humanas (História e Geografia), Língua Portuguesa e Artes e
      // Questões Contemporâneas. A Redação é prova à parte, na aba própria.
      const areas = ["Humanas", "Linguagens", "Artes"];
      const filterPillsHtml = areas.map((a) => `
        <button type="button" class="area-pill${areaFilter === a ? " active" : ""}" data-area="${a}">${a}</button>
      `).join("") + `<button type="button" class="area-pill${!areaFilter ? " active" : ""}" data-area="">Sorteio normal</button>`;
      card.innerHTML = `
        <div class="lesson-eyebrow">Prova discursiva FGV</div>
        <h3>Questões dissertativas ${doneBadge}</h3>
        <p class="lesson-desc">Escreva sua resposta livremente e depois confira os pontos que a correção
        discursiva da FGV normalmente espera. Não existe uma única resposta "certa" — o objetivo é treinar
        argumentação estruturada.</p>
        ${counterHtml}
        <div class="area-filter"><span class="area-filter-label">Praticar uma matéria específica:</span>${filterPillsHtml}</div>
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
          renderDissertSection(day);
        });
        card.appendChild(finishWrap);
      }
    }

    container.appendChild(card);
  }

  function renderDissertQuestion(day, q, idx) {
    const wrap = document.createElement("div");
    wrap.className = "question dissert-question";
    const savedAnswers = getDissertAnswers();
    const checklist = getDissertChecklist();
    const itens = dissertItens(q);

    const itensHtml = itens.map((item, itemIdx) => {
      const answerKey = dissertItemKey(day, q.id, item.id);
      const checklistKeyFor = (pointIdx) => answerKey + "::" + pointIdx;
      const pontosHtml = item.pontosEsperados.map((p, i) => `
        <li>
          <label>
            <input type="checkbox" data-point="${i}" ${checklist[checklistKeyFor(i)] ? "checked" : ""}>
            <span>${escapeHtml(p)}</span>
          </label>
        </li>
      `).join("");
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
          <button class="btn-link dissert-toggle-gabarito" type="button">Ver pontos esperados na correção</button>
          <div class="dissert-gabarito-wrap" hidden>
            <div class="dissert-gabarito-counter">${marcados}/${item.pontosEsperados.length} pontos marcados</div>
            <p class="hint" style="margin:0 0 8px;">Depois de escrever, releia sua resposta e marque os pontos que você
            realmente cobriu — é uma autoavaliação, não existe correção automática.</p>
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
          counterEl.textContent = `${n}/${item.pontosEsperados.length} pontos marcados`;
        });
      });
    });

    return wrap;
  }

  // ---------- Achado 5 (score projetado) + achado 6 (índice de prontidão) ----------

  function touchTopicLastAnswered(subtopicId) {
    const data = loadJSON(LS_TOPIC_LAST_ANSWERED, {});
    data[subtopicId] = todayISO();
    saveJSON(LS_TOPIC_LAST_ANSWERED, data);
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

    const wrap = document.createElement("div");
    wrap.className = "card projected-score-card";
    wrap.innerHTML = `
      <h3>Score projetado</h3>
      <p class="hint">Sua nota estimada se a prova fosse hoje, ponderada pelo peso real de cada frente.
      Frentes ainda não praticadas contam contra a nota — proposital, pra não mascarar o que falta.</p>
      <div class="projected-score-value">${pct}%</div>
      ${entries.length > 1
        ? `<div class="score-sparkline">${sparkHtml}</div><p class="hint" style="margin-top:6px;font-size:0.78rem;">últimos ${entries.length} dias com registro</p>`
        : ""}
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
  function renderCalendar() {
    rebuildPlan();
    const grid = document.getElementById("calendar-grid");
    grid.innerHTML = "";
    const dayState = getDayState();
    const today = currentDayFromStart();

    for (let day = 1; day <= 90; day++) {
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
      grid.appendChild(cell);
    }
  }

  // ---------- Progress tab ----------
  function renderProgress() {
    rebuildPlan();

    const list = document.getElementById("progress-list");
    const scoreContainer = document.getElementById("projected-score-container");

    if (progressoSosId) {
      if (scoreContainer) scoreContainer.innerHTML = "";
      list.innerHTML = "";
      list.appendChild(renderSosView(progressoSosId));
      return;
    }

    if (scoreContainer) {
      scoreContainer.innerHTML = "";
      scoreContainer.appendChild(renderProjectedScoreCard());
      scoreContainer.appendChild(renderErrorDiagnosticsCard());
    }

    const syncContainer = document.getElementById("sync-container");
    if (syncContainer) {
      syncContainer.innerHTML = "";
      syncContainer.appendChild(renderSyncCard());
    }

    list.innerHTML = "";
    const topicState = getTopicState();
    const occurrences = countTopicOccurrences(plan);

    window.SUBTOPICS.forEach((s) => {
      const st = topicState[s.id] || { answered: 0, correct: 0 };
      const bankSize = (window.QUESTION_BANKS && window.QUESTION_BANKS[s.id] || []).length;
      const pct = st.answered > 0 ? Math.round((st.correct / st.answered) * 100) : 0;
      const readiness = computeReadinessIndex(s.id);
      const readinessPct = Math.round(readiness.index * 100);

      const row = document.createElement("div");
      row.className = "progress-row";
      row.innerHTML = `
        <div class="progress-row-top">
          <span class="name">${escapeHtml(s.nome)}</span>
          <span class="stat">${st.correct}/${st.answered} certas · aparece ${occurrences[s.id]}x no plano · ${bankSize} questões no banco</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        <div class="readiness-row" title="Combina acerto + recência + volume de prática">
          <span class="readiness-label">Prontidão</span>
          <div class="bar-track readiness-track"><div class="bar-fill readiness-fill" style="width:${readinessPct}%"></div></div>
          <span class="readiness-pct">${readinessPct}%</span>
        </div>
        <button type="button" class="btn-link sos-btn" style="margin-top:8px;">🆘 SOS deste tema</button>
      `;
      row.querySelector(".sos-btn").addEventListener("click", () => {
        progressoSosId = s.id;
        renderProgress();
      });
      list.appendChild(row);
    });
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
        import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"),
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
      a.download = "rumo-fgv-insper-progresso.json";
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
    document.getElementById("btn-reset").addEventListener("click", () => {
      if (confirm("Isso vai apagar todo o seu progresso salvo neste navegador. Continuar?")) {
        SYNCABLE_KEYS.concat([LS_SYNC_CODE]).forEach((k) => localStorage.removeItem(k));
        location.reload();
      }
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
  document.addEventListener("DOMContentLoaded", () => {
    initOnboarding();
    initTabs();
    initDayNav();
    initReset();
  });
})();
