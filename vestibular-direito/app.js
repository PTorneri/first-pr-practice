(function () {
  const LS_START = "vd_startDate";
  const LS_ANSWERS = "vd_answers"; // { "<subtopicId>::<questionId>": "a" }
  const LS_DAY_STATE = "vd_dayState"; // { "<day>": { answered: n, correct: n, total: n } }
  const LS_TOPIC_STATE = "vd_topicState"; // { "<subtopicId>": { answered: n, correct: n } }
  const LS_DISSERT_STATUS = "vd_dissertStatus"; // { "<day>": "done" | "skipped" }
  const LS_DISSERT_ANSWERS = "vd_dissertAnswers"; // { "<day>::<questionId>": "texto do usuário" }
  const LS_CYCLE_WEIGHTS = "vd_cycleWeights"; // { "<cycleIndex>": { "<subtopicId>": peso } }, travado após cada simulado

  const DISSERT_WEEK_TARGET = 4;
  const DISSERT_WEEK_SIZE = 7;

  let plan = null;
  let currentDay = 1;
  const expandedDissertDays = new Set(); // dias com o painel de dissertativas aberto nesta sessão
  let simuladosDetailIndex = null; // null = mostra a lista de simulados; N = mostra o detalhe do simulado N

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
  function getDayState() { return loadJSON(LS_DAY_STATE, {}); }
  function getTopicState() { return loadJSON(LS_TOPIC_STATE, {}); }
  function getDissertStatus() { return loadJSON(LS_DISSERT_STATUS, {}); }
  function getDissertAnswers() { return loadJSON(LS_DISSERT_ANSWERS, {}); }

  function answerKey(subtopicId, questionId) { return subtopicId + "::" + questionId; }
  function dissertKey(day, questionId) { return day + "::" + questionId; }

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
  // mulberry32/seededShuffle definidos em schedule.js).
  function pickDissertQuestions(day) {
    const pool = window.DISSERTATIVAS || [];
    if (pool.length === 0) return [];
    const rng = mulberry32(day * 733 + 17);
    const count = rng() < 0.5 ? 1 : 2;
    const offset = ((day - 1) * count) % pool.length;
    const circular = [];
    for (let i = 0; i < pool.length; i++) circular.push(pool[(offset + i) % pool.length]);
    return circular.slice(0, count);
  }

  function isDayExerciseComplete(day) {
    const state = getDayState()[day];
    return !!state && state.total > 0 && state.answered >= state.total;
  }

  // ---------- Agendamento adaptativo (pesos por ciclo a partir dos simulados) ----------

  // Erros (0-3) por tema no simulado indicado -> peso 1-4 para o ciclo seguinte
  // (quem errou mais numa frente recebe mais slots naquele ciclo; quem acertou
  // tudo fica no peso mínimo 1, sem nunca ser excluído).
  function computeCycleWeightsFromSimulado(simuladoVisitIndex) {
    const items = pickSimuladoQuestions(simuladoVisitIndex);
    const answers = getAnswers();
    const errors = {};
    window.SUBTOPICS.forEach((s) => (errors[s.id] = 0));
    items.forEach((item) => {
      const key = answerKey(item.subtopicId, item.question.id);
      const chosen = answers[key];
      if (chosen && chosen !== item.question.resposta) errors[item.subtopicId]++;
    });
    const weights = {};
    window.SUBTOPICS.forEach((s) => (weights[s.id] = 1 + errors[s.id]));
    return weights;
  }

  // Pesos de um ciclo só são calculados — e então travados para sempre — na
  // primeira vez em que o simulado correspondente estiver 100% respondido.
  // Antes disso (ou se o ciclo for o 1º, antes de qualquer simulado), usa
  // peso uniforme. Travar evita que editar respostas de um simulado antigo
  // reembaralhe uma semana que o usuário já começou a estudar.
  function getCycleWeights(cycleIndex, simuladoDay) {
    if (cycleIndex <= 0) return null;
    const cache = loadJSON(LS_CYCLE_WEIGHTS, {});
    if (cache[cycleIndex]) return cache[cycleIndex];
    if (simuladoDay && isDayExerciseComplete(simuladoDay)) {
      const weights = computeCycleWeightsFromSimulado(cycleIndex - 1);
      cache[cycleIndex] = weights;
      saveJSON(LS_CYCLE_WEIGHTS, cache);
      return weights;
    }
    return null;
  }

  function buildCycleWeightsOverride(startISO) {
    const simuladoDays = listSimuladoDays(startISO);
    const override = {};
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

  function renderDay(day) {
    rebuildPlan();
    currentDay = day;
    document.getElementById("day-number").textContent = "Dia " + day;
    const start = localStorage.getItem(LS_START) || todayISO();
    document.getElementById("day-date").textContent = formatDate(addDays(start, day - 1));
    document.getElementById("btn-prev-day").disabled = day <= 1;
    document.getElementById("btn-next-day").disabled = day >= 90;

    const content = getDayContent(plan, day);
    const container = document.getElementById("day-content");
    container.innerHTML = "";

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

  function renderSimuladoCard(day, content) {
    const card = document.createElement("div");
    card.className = "lesson-card simulado-card";

    card.innerHTML = `
      <div class="lesson-eyebrow">Domingo · Simulado ${content.simuladoNumber}</div>
      <h3>Simulado misto — todas as frentes</h3>
      <p class="lesson-desc">Hoje não tem vídeo-aula: são ${content.items.length} questões (3 de cada uma das 15
      frentes) para simular a mistura de assuntos de uma prova real e revisar tudo o que você já estudou. Os erros
      daqui pesam mais forte na programação da próxima semana — sem sumir os outros temas.</p>
      <div class="exercise-block">
        <div class="exercise-summary">
          <span>${content.items.length} questões</span>
          <span class="score-label"></span>
        </div>
        <div class="questions"></div>
      </div>
      <div class="simulado-focus"></div>
    `;

    const questionsContainer = card.querySelector(".questions");
    content.items.forEach((item, idx) => {
      questionsContainer.appendChild(
        renderQuestion(day, item.subtopicId, item.question, idx, item.area + " · " + item.subtopicNome)
      );
    });

    updateScoreLabel(card);
    renderSimuladoFocus(card.querySelector(".simulado-focus"), day, content);
    return card;
  }

  // Depois que o simulado é 100% respondido, mostra quais frentes tiveram
  // mais erros e por isso vão ganhar mais espaço na semana seguinte.
  function renderSimuladoFocus(container, day, content) {
    if (!container || !isDayExerciseComplete(day)) return;

    const simuladoVisitIndex = content.simuladoNumber - 1;
    const weights = computeCycleWeightsFromSimulado(simuladoVisitIndex);
    const byId = {};
    window.SUBTOPICS.forEach((s) => (byId[s.id] = s));

    const focused = Object.entries(weights)
      .filter(([, w]) => w > 1)
      .sort((a, b) => b[1] - a[1])
      .map(([id, w]) => `${escapeHtml(byId[id].nome)} (${w - 1}/3 erradas)`);

    container.innerHTML = focused.length > 0
      ? `<div class="dissert-counter"><strong>Com base nos seus erros, a semana que vem foca mais em:</strong><br>${focused.join(", ")}</div>`
      : `<div class="dissert-counter"><strong>Mandou bem!</strong> Sem erros neste simulado, a semana que vem segue com a distribuição normal entre as frentes.</div>`;
  }

  // ---------- Aba Simulados (lista + resultado detalhado por tema) ----------

  function computeSimuladoResult(simuladoIndex, day) {
    const items = pickSimuladoQuestions(simuladoIndex);
    const answers = getAnswers();

    const perTopic = {};
    window.SUBTOPICS.forEach((s) => {
      perTopic[s.id] = { subtopicId: s.id, nome: s.nome, area: s.area, correct: 0, answered: 0, total: 0 };
    });

    let totalCorrect = 0;
    let totalAnswered = 0;
    items.forEach((item) => {
      const t = perTopic[item.subtopicId];
      t.total++;
      const key = answerKey(item.subtopicId, item.question.id);
      const chosen = answers[key];
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
      <p class="hint">Todo domingo do seu plano vira um simulado misto de ~45 questões. Clique em um deles para
      ver o resultado detalhado, com os acertos em cada uma das 15 frentes.</p>
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

    const goBtn = document.createElement("button");
    goBtn.type = "button";
    goBtn.className = "btn btn-secondary";
    goBtn.style.margin = "14px 0";
    goBtn.textContent = "Abrir esse dia em \"Hoje\"";
    goBtn.addEventListener("click", () => {
      document.querySelector('.tab-btn[data-tab="hoje"]').click();
      renderDay(day);
    });
    wrap.appendChild(goBtn);

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

  function renderLessonCard(day, lesson) {
    const card = document.createElement("div");
    card.className = "lesson-card";

    const visitLabel = lesson.visitNumber === 1
      ? "1ª vez estudando este tema"
      : lesson.visitNumber + "ª revisão deste tema";

    const videoBtns = lesson.buscaVideo.map((q) =>
      `<a class="btn-link" target="_blank" rel="noopener" href="${youtubeSearchUrl(q)}">▶ Buscar vídeo-aula: "${escapeHtml(q)}"</a>`
    ).join("");

    card.innerHTML = `
      <div class="lesson-eyebrow">${escapeHtml(lesson.area)}</div>
      <h3>${escapeHtml(lesson.nome)} <span class="visit-badge">${escapeHtml(visitLabel)}</span></h3>
      <p class="lesson-desc">${escapeHtml(lesson.descricao)}</p>
      <div class="video-links">${videoBtns}</div>
      <div class="exercise-block">
        <div class="exercise-summary">
          <span>${lesson.questions.length} exercícios</span>
          <span class="score-label" data-score-for="${lesson.subtopicId}"></span>
        </div>
        <div class="questions"></div>
      </div>
    `;

    const questionsContainer = card.querySelector(".questions");
    lesson.questions.forEach((q, idx) => {
      questionsContainer.appendChild(renderQuestion(day, lesson.subtopicId, q, idx));
    });

    updateScoreLabel(card);
    return card;
  }

  function renderQuestion(day, subtopicId, q, idx, tagLabel) {
    const wrap = document.createElement("div");
    wrap.className = "question";
    const answers = getAnswers();
    const key = answerKey(subtopicId, q.id);
    const saved = answers[key];

    const supportHtml = q.texto_apoio
      ? `<div class="q-support">${escapeHtml(q.texto_apoio)}</div>`
      : "";
    const tagHtml = tagLabel ? `<div class="q-tag">${escapeHtml(tagLabel)}</div>` : "";

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
      <div class="q-enunciado">${idx + 1}. ${escapeHtml(q.enunciado)}</div>
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
        const alreadyAnswered = !!current[key];
        current[key] = letter;
        saveJSON(LS_ANSWERS, current);
        applyFeedback(wrap, q, letter);
        if (!alreadyAnswered) {
          bumpTopicState(subtopicId, letter === q.resposta);
          bumpDayState(day, letter === q.resposta);
        } else {
          recomputeAll();
        }
        const card = wrap.closest(".lesson-card");
        updateScoreLabel(card);
        updateDayStateFromDom(day);
        const focusEl = card.querySelector(".simulado-focus");
        if (focusEl) renderSimuladoFocus(focusEl, day, getDayContent(plan, day));
        renderProgress();
        renderCalendar();
        renderDissertSection(day);
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
      const questions = pickDissertQuestions(day);
      const doneBadge = status === "done"
        ? `<span class="visit-badge">✓ concluído hoje</span>`
        : "";
      card.innerHTML = `
        <div class="lesson-eyebrow">Prova discursiva FGV</div>
        <h3>Questões dissertativas ${doneBadge}</h3>
        <p class="lesson-desc">Escreva sua resposta livremente e depois confira os pontos que a correção
        discursiva da FGV normalmente espera. Não existe uma única resposta "certa" — o objetivo é treinar
        argumentação estruturada.</p>
        ${counterHtml}
        <div class="dissert-questions"></div>
      `;
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
    const key = dissertKey(day, q.id);
    const savedText = savedAnswers[key] || "";

    const pontosHtml = q.pontosEsperados.map((p) => `<li>${escapeHtml(p)}</li>`).join("");

    wrap.innerHTML = `
      <div class="lesson-eyebrow">${escapeHtml(q.area)}</div>
      <div class="q-support">${escapeHtml(q.texto_apoio)}</div>
      <div class="q-enunciado">${idx + 1}. ${escapeHtml(q.comando)}</div>
      <textarea class="dissert-textarea" rows="6" placeholder="Escreva sua resposta aqui...">${escapeHtml(savedText)}</textarea>
      <button class="btn-link dissert-toggle-gabarito" type="button">Ver pontos esperados na correção</button>
      <ul class="dissert-gabarito" hidden>${pontosHtml}</ul>
    `;

    const textarea = wrap.querySelector(".dissert-textarea");
    textarea.addEventListener("input", () => {
      const current = getDissertAnswers();
      current[key] = textarea.value;
      saveJSON(LS_DISSERT_ANSWERS, current);
    });

    const toggleBtn = wrap.querySelector(".dissert-toggle-gabarito");
    const gabarito = wrap.querySelector(".dissert-gabarito");
    toggleBtn.addEventListener("click", () => {
      gabarito.hidden = !gabarito.hidden;
      toggleBtn.textContent = gabarito.hidden ? "Ver pontos esperados na correção" : "Ocultar pontos esperados";
    });

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

  // recompute topic/day aggregates by rescanning stored answers against the plan
  // (used when an already-answered question is clicked again with a different option)
  //
  // Note: the same question can legitimately appear in several different days'
  // exercise sets (small question banks are intentionally reused for spaced
  // repetition). dayState must therefore count per day-occurrence — but
  // topicState must count each *unique* question once, otherwise a single
  // answered question would be counted once per day it happens to appear in.
  function recomputeAll() {
    const answers = getAnswers();
    const dayState = {};

    plan.forEach((entry) => {
      const content = getDayContent(plan, entry.day);
      let dAnswered = 0, dCorrect = 0, dTotal = 0;
      const perQuestion = content.type === "simulado"
        ? content.items.map((item) => ({ subtopicId: item.subtopicId, q: item.question }))
        : content.lessons.flatMap((lesson) => lesson.questions.map((q) => ({ subtopicId: lesson.subtopicId, q })));
      perQuestion.forEach(({ subtopicId, q }) => {
        dTotal++;
        const key = answerKey(subtopicId, q.id);
        const chosen = answers[key];
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
      cell.title = "Dia " + day + (isSimulado ? " — Simulado" : "") + (st ? ` — ${st.answered}/${st.total || "?"} exercícios` : "");
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
    list.innerHTML = "";
    const topicState = getTopicState();
    const occurrences = countTopicOccurrences(plan);

    window.SUBTOPICS.forEach((s) => {
      const st = topicState[s.id] || { answered: 0, correct: 0 };
      const bankSize = (window.QUESTION_BANKS && window.QUESTION_BANKS[s.id] || []).length;
      const pct = st.answered > 0 ? Math.round((st.correct / st.answered) * 100) : 0;

      const row = document.createElement("div");
      row.className = "progress-row";
      row.innerHTML = `
        <div class="progress-row-top">
          <span class="name">${escapeHtml(s.nome)}</span>
          <span class="stat">${st.correct}/${st.answered} certas · aparece ${occurrences[s.id]}x no plano · ${bankSize} questões no banco</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
      `;
      list.appendChild(row);
    });
  }

  function initReset() {
    document.getElementById("btn-reset").addEventListener("click", () => {
      if (confirm("Isso vai apagar todo o seu progresso salvo neste navegador. Continuar?")) {
        [LS_START, LS_ANSWERS, LS_DAY_STATE, LS_TOPIC_STATE, LS_DISSERT_STATUS, LS_DISSERT_ANSWERS, LS_CYCLE_WEIGHTS]
          .forEach((k) => localStorage.removeItem(k));
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

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", () => {
    initOnboarding();
    initTabs();
    initDayNav();
    initReset();
  });
})();
