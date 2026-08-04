// Gera o plano de 90 dias e seleciona os exercícios de cada dia.
// Estratégia: alocação proporcional por peso — a cada ciclo, distribuímos as
// frentes entre os dias de acordo com window.PRIORITY_WEIGHTS (ver
// data/priority-weights.js, baseado no estudo estudo-provas-fgv-insper.pdf),
// não uniformemente. Frentes de prioridade máxima aparecem bem mais que
// frentes de prioridade baixa, mas nenhuma frente é excluída.
//
// Todo domingo do calendário real (a partir da data de início escolhida pelo
// usuário) vira um dia de SIMULADO: em vez de 2 frentes, o dia mistura ~45
// questões de todas as 15 frentes, também distribuídas proporcionalmente a
// PRIORITY_WEIGHTS (mínimo garantido de 1 questão por frente), puxadas dos
// mesmos bancos com uma rotação própria (menos repetição entre simulados).
//
// Agendamento ADAPTATIVO: os dias normais entre um domingo e o próximo formam
// um "ciclo". A partir do 2º ciclo, o peso de cada frente passa a ser
// PRIORITY_WEIGHTS[frente] multiplicado por um fator de erro (1 a 4) baseado
// na taxa de erro daquela frente no simulado anterior — quem errou mais
// numa frente de já-alta prioridade revisa ainda mais aquela frente na
// semana seguinte. Os pesos por ciclo são calculados e travados em app.js
// (dependem das respostas do usuário, que moram no localStorage);
// schedule.js só sabe consumir um "cycleWeightsOverride" já pronto.

const TOTAL_DAYS = 90;
const TOPICS_PER_DAY = 2;
const MIN_EXERCISES_PER_TOPIC = 12;
const MAX_EXERCISES_PER_TOPIC = 15;
const SIMULADO_TOTAL_QUESTIONS = 45;
const SIMULADO_MIN_PER_TOPIC = 1;
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

// ---------- Clusters de texto ----------
//
// A prova real agrupa questões em torno de poucos textos longos: na FGV
// 2026.1 um romance sustentou 6 questões e um artigo de opinião sustentou 5.
// Isso não é detalhe de apresentação — é o que cria o risco concentrado que o
// candidato precisa treinar: ler mal um texto custa seis questões de uma vez.
//
// Questões de um mesmo cluster apontam para o mesmo `textoId` e são
// CONTÍGUAS no arquivo de origem (o build-bundle.ps1 recusa o arquivo se não
// forem). É essa contiguidade que permite tratar cluster como "corrida" de
// elementos vizinhos, em vez de varrer o banco atrás dos irmãos de cada
// questão.
//
// Com zero clusters nos dados — a situação atual — cada questão vira um grupo
// de um só elemento, e as três funções abaixo devolvem exatamente o que a
// versão anterior devolvia, consumindo o mesmo número de sorteios do RNG. Isso
// é proposital: a mecânica entra antes do conteúdo para que "quebrei a
// seleção?" possa ser respondido separadamente de "o cluster está bem escrito?".

function clusterKey(q, prefixo) {
  if (!q || !q.textoId) return null;
  return prefixo ? prefixo + "::" + q.textoId : q.textoId;
}

// Agrupa elementos vizinhos que compartilham a mesma chave de cluster.
// Elementos sem chave viram grupos unitários.
function groupRuns(list, keyFn) {
  const grupos = [];
  let atual = null;
  let chaveAtual = null;
  list.forEach((item) => {
    const k = keyFn(item);
    if (k !== null && k === chaveAtual) {
      atual.push(item);
      return;
    }
    atual = [item];
    chaveAtual = k;
    grupos.push(atual);
  });
  return grupos;
}

// Embaralha os GRUPOS, preservando a ordem interna de cada um — as questões de
// um cluster continuam juntas e na sequência em que foram escritas.
function shuffleGroups(list, rng, keyFn) {
  const grupos = groupRuns(list, keyFn);
  const embaralhados = seededShuffle(grupos, rng);
  const saida = [];
  embaralhados.forEach((g) => g.forEach((item) => saida.push(item)));
  return saida;
}

// Substitui `list.slice(start, start + count)` sem nunca cortar um cluster ao
// meio: acumula grupos inteiros até atingir a contagem, aceitando ultrapassá-la.
// Entregar 4 de um cluster de 6 seria pior do que entregar 6 — o candidato leria
// o texto inteiro e responderia dois terços dele.
function takeWholeGroups(list, start, count, keyFn) {
  if (count <= 0) return [];
  const grupos = groupRuns(list, keyFn);
  const saida = [];
  let pos = 0;
  grupos.forEach((g) => {
    const fim = pos + g.length;
    // `start` pode cair no meio de um grupo quando a chamada anterior já
    // entregou parte dele; nesse caso o grupo inteiro já foi mostrado e é
    // simplesmente pulado.
    if (fim <= start) { pos = fim; return; }
    if (saida.length >= count) { pos = fim; return; }
    if (pos < start) { pos = fim; return; }
    g.forEach((item) => saida.push(item));
    pos = fim;
  });
  return saida;
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

// Achado 4 (cronograma com fases nomeadas): rótulo visível da fase do plano
// em que um dia cai — primeiras 2 semanas viram "Arranque" (ambientação),
// últimos 10 dias viram "Reta final" (foco só em alta frequência + baixo
// desempenho, já é o que o agendamento adaptativo tende a fazer sozinho —
// aqui só tornamos isso visível), e o meio é rotulado por semana do plano.
function phaseLabelForDay(day) {
  if (day <= 14) return "Arranque";
  if (day > TOTAL_DAYS - 10) return "Reta final";
  return "Semana " + Math.ceil(day / 7);
}

// Aloca `total` vagas entre `ids` de forma PROPORCIONAL a `weights` (método
// dos maiores restos — o mesmo tipo de regra usada para converter votos em
// cadeiras, garantindo que a soma bata exatamente com `total` mesmo com
// arredondamento). `minPerItem` reserva um piso fixo por item antes de
// distribuir o restante proporcionalmente (usado pelo simulado, para
// garantir pelo menos 1 questão de cada frente mesmo com pesos bem
// diferentes entre si). Reaproveita o MESMO `rng` do chamador (consumido
// sequencialmente: primeiro o jitter de desempate, depois — no chamador —
// o embaralhamento da ordem), para manter tudo determinístico por seed.
//
// Pesos abaixo de 1 (ex.: 0.5 de prioridade baixa) precisam continuar
// possíveis: o piso de segurança é ínfimo (0.0001), só para evitar peso
// zero/negativo — nunca promove um peso baixo a "1 unidade", senão a
// priorização por peso perderia efeito.
function proportionalAllocate(ids, weights, total, rng, minPerItem) {
  minPerItem = minPerItem || 0;
  const w = ids.map((id) => Math.max(0.0001, (weights && weights[id]) || 1));
  const sumW = w.reduce((a, b) => a + b, 0);
  const distributable = Math.max(0, total - minPerItem * ids.length);

  const raw = w.map((x) => (x / sumW) * distributable);
  const counts = raw.map((x) => minPerItem + Math.floor(x));
  let remaining = total - counts.reduce((a, b) => a + b, 0);

  // Distribui as vagas restantes (arredondamento) pelos maiores restos; um
  // leve jitter determinístico (mas variável por ciclo/simulado) desempata
  // temas com o mesmo resto, para que não sejam sempre os mesmos a sobrar.
  const remainders = raw.map((r, i) => ({ i, frac: (r - Math.floor(r)) + rng() * 1e-6 }));
  remainders.sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < remaining && k < remainders.length; k++) counts[remainders[k].i]++;

  return counts; // paralelo a `ids`
}

// Constrói a fila de temas de UM ciclo (bloco de dias entre dois simulados),
// com exatamente totalSlots posições, distribuindo as vagas entre os temas
// de forma proporcional aos pesos via proportionalAllocate (sem piso por
// tema — como um ciclo normalmente tem só ~12-14 vagas para 15 temas, nem
// toda frente precisa aparecer toda semana, isso já é intencional).
function buildCycleQueue(subtopicIds, weights, totalSlots, seed) {
  const rng = mulberry32(seed);
  const counts = proportionalAllocate(subtopicIds, weights, totalSlots, rng, 0);

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
// recebe pesos via cycleWeightsOverride[cycleIndex] = { id: peso },
// calculados em app.js — o ciclo 0 (antes do 1º simulado) usa
// PRIORITY_WEIGHTS puro; os demais combinam PRIORITY_WEIGHTS com os erros
// do simulado anterior. Retorna:
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
  const chosen = takeWholeGroups(circular, 0, count, (q) => clusterKey(q));

  const rng = mulberry32(day * 131 + hashString(subtopicId) + visitIndex);
  return shuffleGroups(chosen, rng, (q) => clusterKey(q));
}

// Continua a mesma janela circular que pickQuestions já usou para essa
// frente/visita (a partir de onde ela parou), para puxar mais `extraCount`
// questões sem repetir as já mostradas — usado pelo botão "quero mais" do
// achado 9 (essenciais vs. extras). `alreadyShown` é o total de questões já
// exibidas nessa lição (essenciais + extras do plano + pulls anteriores).
function pickMoreQuestions(subtopicId, visitIndex, day, alreadyShown, extraCount) {
  const bank = (window.QUESTION_BANKS && window.QUESTION_BANKS[subtopicId]) || [];
  if (bank.length === 0) return [];

  const baseCount = Math.min(pickExerciseCount(day, subtopicId), bank.length);
  const offset = (visitIndex * baseCount) % bank.length;
  const circular = [];
  for (let i = 0; i < bank.length; i++) circular.push(bank[(offset + i) % bank.length]);

  const start = alreadyShown;
  const count = Math.min(extraCount, Math.max(0, bank.length - start));
  if (count <= 0) return [];

  const chosen = takeWholeGroups(circular, start, count, (q) => clusterKey(q));
  const rng = mulberry32(day * 149 + hashString(subtopicId) + visitIndex + alreadyShown);
  return shuffleGroups(chosen, rng, (q) => clusterKey(q));
}

// Monta as ~45 questões do simulado de domingo, distribuídas PROPORCIONALMENTE
// a window.PRIORITY_WEIGHTS (frentes de prioridade máxima ganham mais
// questões, ~4; de prioridade baixa ficam no mínimo garantido, 1), com
// rotação própria por frente (independente da rotação diária) para
// minimizar repetição entre um domingo e outro.
//
// Importante: usa SEMPRE window.PRIORITY_WEIGHTS (peso estático do estudo),
// nunca os pesos adaptativos por erro do ciclo seguinte — do contrário a
// composição do próprio simulado N dependeria de erros medidos por ele
// mesmo, criando uma dependência circular.
function pickSimuladoQuestions(simuladoVisitIndex) {
  const subtopicIds = window.SUBTOPICS.map((s) => s.id);
  const rng = mulberry32(simuladoVisitIndex * 991 + 3);
  const counts = proportionalAllocate(
    subtopicIds, window.PRIORITY_WEIGHTS, SIMULADO_TOTAL_QUESTIONS, rng, SIMULADO_MIN_PER_TOPIC
  );

  const items = [];
  window.SUBTOPICS.forEach((s, i) => {
    const bank = (window.QUESTION_BANKS && window.QUESTION_BANKS[s.id]) || [];
    if (bank.length === 0) return;
    const count = Math.min(counts[i], bank.length);
    const offset = (simuladoVisitIndex * count) % bank.length;
    const circular = [];
    for (let j = 0; j < bank.length; j++) circular.push(bank[(offset + j) % bank.length]);
    takeWholeGroups(circular, 0, count, (q) => clusterKey(q)).forEach((q) => {
      items.push({ question: q, subtopicId: s.id, subtopicNome: s.nome, area: s.area });
    });
  });
  // No simulado a chave precisa do prefixo da frente: o array é multifrente e
  // dois bancos distintos poderiam, por acidente, usar o mesmo textoId.
  return shuffleGroups(items, rng, (it) => clusterKey(it.question, it.subtopicId));
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
