// Gera o plano de 90 dias e seleciona os exercícios de cada dia.
// Estratégia: "shuffle-bag" — a cada volta completa, embaralhamos as frentes
// e as distribuímos 2 por dia (nos dias normais). Isso garante que toda
// frente apareça várias vezes ao longo dos 90 dias, sempre em ordem variada,
// e nunca duas vezes seguidas no mesmo dia.
//
// Todo domingo do calendário real (a partir da data de início escolhida pelo
// usuário) vira um dia de SIMULADO: em vez de 2 frentes, o dia mistura 3
// questões de cada uma das 15 frentes (~45 questões, "temas diversos"),
// puxadas dos mesmos bancos com uma rotação própria (menos repetição entre
// simulados, já que cada banco foi ampliado especificamente para isso).
//
// Agendamento ADAPTATIVO: os dias normais entre um domingo e o próximo formam
// um "ciclo". A partir do 2º ciclo, o sorteio de temas passa a ser PONDERADO
// pelos erros do simulado anterior — quem errou mais numa frente tem mais
// chance de revisá-la naquela semana —, mas toda frente sempre tem peso
// mínimo 1, então nenhuma frente é excluída, só fica mais ou menos frequente.
// Os pesos por ciclo são calculados e travados em app.js (dependem das
// respostas do usuário, que moram no localStorage); schedule.js só sabe
// consumir um "cycleWeightsOverride" já pronto.

const TOTAL_DAYS = 90;
const TOPICS_PER_DAY = 2;
const MIN_EXERCISES_PER_TOPIC = 12;
const MAX_EXERCISES_PER_TOPIC = 15;
const SIMULADO_QUESTIONS_PER_TOPIC = 3;
const SCHEDULE_SEED = 20260101;

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(array, rng) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

// Dia N do plano -> objeto Date real, a partir da data de início (YYYY-MM-DD).
function scheduleDateForDay(startISO, day) {
  const d = new Date(startISO + "T00:00:00");
  d.setDate(d.getDate() + (day - 1));
  return d;
}

function isSimuladoDay(startISO, day) {
  return scheduleDateForDay(startISO, day).getDay() === 0; // 0 = domingo
}

// Lista os números dos dias (1-90) que caem num domingo real, dada a data de
// início. Usado por app.js para saber, sem montar o plano inteiro, quantos
// simulados existem e em quais dias, a fim de calcular pesos por ciclo.
function listSimuladoDays(startISO) {
  const days = [];
  for (let day = 1; day <= TOTAL_DAYS; day++) {
    if (isSimuladoDay(startISO, day)) days.push(day);
  }
  return days;
}

// Constrói a fila de temas de UM ciclo (bloco de dias entre dois simulados),
// com exatamente totalSlots posições, distribuindo as vagas entre os temas
// de forma PROPORCIONAL aos pesos (método dos maiores restos — o mesmo tipo
// de regra usada para converter votos em cadeiras, garantindo que a soma
// bata exatamente com totalSlots mesmo com arredondamento).
//
// Um "bag" simples (repetir cada tema conforme o peso e embaralhar) não
// funciona bem aqui: como um ciclo tem só ~12-14 vagas para 15 temas, a
// maior parte das rodadas do bag fica cortada pela metade, e o reforço de um
// tema com peso alto vira loteria em vez de garantia. A alocação
// proporcional decide os contadores primeiro (determinístico) e só usa
// aleatoriedade para decidir a ORDEM em que aparecem nos dias.
function buildCycleQueue(subtopicIds, weights, totalSlots, seed) {
  const rng = mulberry32(seed);
  const w = subtopicIds.map((id) => (weights ? Math.max(1, weights[id] || 1) : 1));
  const sumW = w.reduce((a, b) => a + b, 0);

  const raw = w.map((x) => (x / sumW) * totalSlots);
  const counts = raw.map(Math.floor);
  let remaining = totalSlots - counts.reduce((a, b) => a + b, 0);

  // Distribui as vagas restantes (arredondamento) pelos maiores restos;
  // um leve jitter determinístico (mas variável por ciclo) desempata temas
  // com o mesmo resto, para que não sejam sempre os mesmos a ficar de fora.
  const remainders = raw.map((r, i) => ({ i, frac: r - counts[i] + rng() * 1e-6 }));
  remainders.sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < remaining; k++) counts[remainders[k].i]++;

  const items = [];
  subtopicIds.forEach((id, i) => {
    for (let n = 0; n < counts[i]; n++) items.push(id);
  });

  let queue = seededShuffle(items, rng);
  // Reduz repetições do mesmo tema em posições adjacentes, quando possível.
  for (let i = 1; i < queue.length; i++) {
    if (queue[i] === queue[i - 1]) {
      for (let j = i + 1; j < queue.length; j++) {
        if (queue[j] !== queue[i - 1]) {
          [queue[i], queue[j]] = [queue[j], queue[i]];
          break;
        }
      }
    }
  }
  return queue;
}

// Monta o plano de 90 dias já sabendo quais caem num domingo real (a partir
// da data de início escolhida pelo usuário). Os dias normais são agrupados
// em "ciclos" (o bloco de dias entre um simulado e o próximo); cada ciclo
// pode receber pesos próprios via cycleWeightsOverride[cycleIndex] = { id:
// peso }, calculados em app.js a partir dos erros do simulado anterior.
// cycleWeightsOverride[0] não é usado (o primeiro ciclo, antes de qualquer
// simulado, é sempre uniforme). Retorna:
//   [{ day, type: 'normal', topics: [{id, visitIndex}, ...] }, ...]
//   [{ day, type: 'simulado', simuladoVisitIndex }, ...]
function buildSchedule(startISO, cycleWeightsOverride) {
  const subtopicIds = window.SUBTOPICS.map((s) => s.id);

  const normalDays = [];
  const simuladoDays = [];
  for (let day = 1; day <= TOTAL_DAYS; day++) {
    (isSimuladoDay(startISO, day) ? simuladoDays : normalDays).push(day);
  }

  // Agrupa os dias normais em ciclos: ciclo 0 = dias antes do 1º simulado;
  // ciclo i (i>=1) = dias entre o i-ésimo e o (i+1)-ésimo simulado.
  const cycles = [];
  let cycleIndex = 0;
  let currentCycleDays = [];
  normalDays.forEach((day) => {
    while (cycleIndex < simuladoDays.length && day > simuladoDays[cycleIndex]) {
      cycles.push(currentCycleDays);
      currentCycleDays = [];
      cycleIndex++;
    }
    currentCycleDays.push(day);
  });
  cycles.push(currentCycleDays);

  const visitCounter = {};
  subtopicIds.forEach((id) => (visitCounter[id] = 0));

  const plan = [];
  cycles.forEach((daysInCycle, idx) => {
    if (daysInCycle.length === 0) return;
    const weights = cycleWeightsOverride && cycleWeightsOverride[idx];
    const totalSlots = daysInCycle.length * TOPICS_PER_DAY;
    const queue = buildCycleQueue(subtopicIds, weights, totalSlots, SCHEDULE_SEED + idx);

    daysInCycle.forEach((day, dayIdx) => {
      const slice = queue.slice(dayIdx * TOPICS_PER_DAY, (dayIdx + 1) * TOPICS_PER_DAY);
      const topics = slice.map((id) => {
        const visitIndex = visitCounter[id];
        visitCounter[id]++;
        return { id, visitIndex };
      });
      plan.push({ day, type: "normal", topics });
    });
  });

  simuladoDays.forEach((day, simuladoVisitIndex) => {
    plan.push({ day, type: "simulado", simuladoVisitIndex });
  });

  plan.sort((a, b) => a.day - b.day);
  return plan;
}

// Escolhe uma quantidade de exercícios (12-15) de forma pseudo-aleatória
// mas determinística, a partir do dia e do subtema.
function pickExerciseCount(day, subtopicId) {
  const rng = mulberry32(day * 977 + hashString(subtopicId));
  const span = MAX_EXERCISES_PER_TOPIC - MIN_EXERCISES_PER_TOPIC + 1;
  return MIN_EXERCISES_PER_TOPIC + Math.floor(rng() * span);
}

// Seleciona um subconjunto circular do banco de questões, começando num
// offset que avança a cada nova visita ao tema, e embaralha a ordem interna
// (determinístico por dia+tema) para não repetir sempre a mesma sequência.
function pickQuestions(subtopicId, visitIndex, day) {
  const bank = (window.QUESTION_BANKS && window.QUESTION_BANKS[subtopicId]) || [];
  if (bank.length === 0) return [];

  const count = Math.min(pickExerciseCount(day, subtopicId), bank.length);
  const offset = (visitIndex * count) % bank.length;

  const circular = [];
  for (let i = 0; i < bank.length; i++) {
    circular.push(bank[(offset + i) % bank.length]);
  }
  const chosen = circular.slice(0, count);

  const rng = mulberry32(day * 131 + hashString(subtopicId) + visitIndex);
  return seededShuffle(chosen, rng);
}

// Monta as ~45 questões do simulado de domingo: SIMULADO_QUESTIONS_PER_TOPIC
// de cada uma das 15 frentes, com rotação própria (independente da rotação
// diária) para minimizar repetição entre um domingo e outro.
function pickSimuladoQuestions(simuladoVisitIndex) {
  const items = [];
  window.SUBTOPICS.forEach((s) => {
    const bank = (window.QUESTION_BANKS && window.QUESTION_BANKS[s.id]) || [];
    if (bank.length === 0) return;
    const count = Math.min(SIMULADO_QUESTIONS_PER_TOPIC, bank.length);
    const offset = (simuladoVisitIndex * count) % bank.length;
    const circular = [];
    for (let i = 0; i < bank.length; i++) circular.push(bank[(offset + i) % bank.length]);
    circular.slice(0, count).forEach((q) => {
      items.push({ question: q, subtopicId: s.id, subtopicNome: s.nome, area: s.area });
    });
  });
  const rng = mulberry32(simuladoVisitIndex * 991 + 3);
  return seededShuffle(items, rng);
}

// Monta o conteúdo completo de um dia: lições (vídeos) + exercícios, ou,
// se for domingo, o simulado misto.
function getDayContent(plan, day) {
  const entry = plan.find((d) => d.day === day);
  if (!entry) return null;

  if (entry.type === "simulado") {
    const items = pickSimuladoQuestions(entry.simuladoVisitIndex);
    return {
      day,
      type: "simulado",
      simuladoNumber: entry.simuladoVisitIndex + 1,
      items,
      totalExercises: items.length,
    };
  }

  const subtopicsById = {};
  window.SUBTOPICS.forEach((s) => (subtopicsById[s.id] = s));

  const lessons = entry.topics.map(({ id, visitIndex }) => {
    const meta = subtopicsById[id];
    const questions = pickQuestions(id, visitIndex, day);
    return {
      subtopicId: id,
      nome: meta.nome,
      area: meta.area,
      descricao: meta.descricao,
      buscaVideo: meta.buscaVideo,
      visitNumber: visitIndex + 1,
      questions,
    };
  });

  const totalExercises = lessons.reduce((sum, l) => sum + l.questions.length, 0);
  return { day, type: "normal", lessons, totalExercises };
}

// Conta quantas vezes cada subtema aparece no plano (dias normais) — para a
// tela de progresso.
function countTopicOccurrences(plan) {
  const counts = {};
  window.SUBTOPICS.forEach((s) => (counts[s.id] = 0));
  plan.forEach((entry) => {
    if (entry.type === "normal") entry.topics.forEach(({ id }) => counts[id]++);
  });
  return counts;
}

// Quantos domingos (simulados) existem no plano de 90 dias, dada a data de início.
function countSimuladoDays(plan) {
  return plan.filter((e) => e.type === "simulado").length;
}
