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

// Empurra o ponto de rotação da janela circular para a frente até ele cair
// numa fronteira de grupo.
//
// Sem isto, `bank[(offset + i) % bank.length]` corta o cluster em dois quando o
// ponto de rotação cai no meio dele: a cauda vai parar no início da lista
// girada e a cabeça no fim, e `groupRuns` — que só enxerga corridas contíguas —
// passa a ver dois grupos legítimos em vez de um partido. O sintoma é discreto
// e foi assim que apareceu: no dia 17 do plano, uma única questão de um texto
// de três questões, sozinha, sem o texto irmão por perto. `takeWholeGroups`
// estava correto; ele apenas recebia uma lista já mutilada.
function snapOffsetToGroup(bank, offset, keyFn) {
  const n = bank.length;
  if (n === 0) return 0;
  let i = offset % n;
  const chaveAnterior = keyFn(bank[(i - 1 + n) % n]);
  if (chaveAnterior === null || chaveAnterior === undefined) return i;
  // O limite de n passos protege o caso degenerado de um banco inteiro sob um
  // único textoId, em que não existe fronteira nenhuma para encontrar.
  for (let passos = 0; passos < n; passos++) {
    if (keyFn(bank[i]) !== chaveAnterior) return i;
    i = (i + 1) % n;
  }
  return offset % n;
}

// Toma EXATAMENTE `count` questões, sem nunca partir um cluster e sem nunca
// ultrapassar a conta.
//
// É o oposto da política de takeWholeGroups, e de propósito. Na lição do dia,
// entregar 4 questões de um cluster de 6 é pior do que entregar 6, porque o
// candidato leria o texto inteiro e responderia dois terços dele — ali vale
// ultrapassar. No simulado oficial o invariante é outro: o bloco tem 15
// questões porque a prova tem 15, e um bloco de 16 deixa de ensaiar a prova.
// Aqui, então, o cluster que não couber é PULADO inteiro, e a busca segue no
// grupo seguinte.
function takeExactly(list, count, keyFn) {
  if (count <= 0) return [];
  const grupos = groupRuns(list, keyFn);
  const saida = [];
  for (let i = 0; i < grupos.length && saida.length < count; i++) {
    const g = grupos[i];
    if (saida.length + g.length > count) continue; // não cabe: pula o grupo inteiro
    g.forEach((item) => saida.push(item));
  }
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
  const offsetCounter = {};
  subtopicIds.forEach((id) => (offsetCounter[id] = 0));

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
        // Deslocamento acumulado dentro do banco da frente.
        //
        // Antes, pickQuestions calculava o offset como visitIndex * count,
        // usando o count DA VISITA ATUAL. Como o count varia de 12 a 15 por
        // dia, esse cálculo supõe que todas as visitas anteriores usaram o
        // mesmo tamanho — e elas não usaram. O resultado eram janelas que se
        // sobrepunham uma às outras e, ao mesmo tempo, deixavam trechos do
        // banco nunca alcançados: geografia entregava 101 questões distintas
        // onde caberiam ~135.
        //
        // Aqui somamos os tamanhos REAIS das visitas anteriores, então cada
        // janela começa exatamente onde a anterior terminou. Sem sobreposição
        // e sem buraco, o aluno vê tantas questões distintas quantas o plano
        // comporta, sem nenhuma mudança no volume diário.
        const qOffset = offsetCounter[id];
        offsetCounter[id] += pickExerciseCount(day, id);
        return { id, visitIndex, qOffset };
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
function pickQuestions(subtopicId, visitIndex, day, qOffset) {
  const bank = (window.QUESTION_BANKS && window.QUESTION_BANKS[subtopicId]) || [];
  if (bank.length === 0) return [];

  const count = Math.min(pickExerciseCount(day, subtopicId), bank.length);
  // qOffset vem do plano e acumula os tamanhos reais das visitas anteriores.
  // O cálculo antigo (visitIndex * count) fica como reserva para quando o
  // plano não trouxer o campo — por exemplo, um progresso salvo antes desta
  // mudança, cujo plano em memória ainda não tem qOffset.
  const base = typeof qOffset === "number" ? qOffset : visitIndex * count;
  const bruto = ((base % bank.length) + bank.length) % bank.length;
  // O snap entra DEPOIS da normalização, e não no lugar dela: o qOffset é que
  // garante a cobertura de 95% do banco, e o snap só empurra o ponto de
  // rotação até a fronteira de grupo mais próxima para não partir um cluster.
  // Trocar um pelo outro perderia uma das duas propriedades.
  const offset = snapOffsetToGroup(bank, bruto, (q) => clusterKey(q));

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
function pickMoreQuestions(subtopicId, visitIndex, day, alreadyShown, extraCount, qOffset) {
  const bank = (window.QUESTION_BANKS && window.QUESTION_BANKS[subtopicId]) || [];
  if (bank.length === 0) return [];

  // Precisa começar na MESMA janela que pickQuestions usou, senão o botão
  // "quero mais" repetiria questões já mostradas no dia.
  const baseCount = Math.min(pickExerciseCount(day, subtopicId), bank.length);
  // Tem de ser exatamente o mesmo offset de pickQuestions, qOffset e snap
  // incluídos: é o que faz esta chamada continuar a MESMA janela de onde a
  // outra parou. Qualquer divergência aqui repete no botão "quero mais" as
  // questões que o dia já mostrou.
  const base = typeof qOffset === "number" ? qOffset : visitIndex * baseCount;
  const bruto = ((base % bank.length) + bank.length) % bank.length;
  const offset = snapOffsetToGroup(bank, bruto, (q) => clusterKey(q));
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
    const offset = snapOffsetToGroup(bank, simuladoVisitIndex * count, (q) => clusterKey(q));
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

// ---------------------------------------------------------------- simulado oficial
//
// O simulado adaptativo de 45 questões acima serve ao TREINO: ele segue os
// pesos do estudo e reage ao erro. O que ele não faz é ensaiar a prova.
//
// As duas bancas usam o mesmo formato geral -- 60 objetivas em quatro blocos
// de 15, em ordem fixa -- e composições diferentes dentro dele. Fazer 60 na
// ordem certa treina três coisas que o adaptativo não alcança: o ritmo (a FGV
// dá ~3,5 min por questão), a decisão de quando abandonar uma questão, e o
// cansaço do quarto bloco, que é onde a nota costuma cair.
//
// As composições abaixo saíram da contagem dos cadernos, e não do edital. Onde
// os dois divergem, vale o caderno: em Humanas da Insper o edital prevê
// Filosofia 2 e Sociologia 2, e os dois cadernos de 2026 trouxeram Filosofia 1
// e Sociologia 3, sempre nas quatro últimas questões do bloco.
const SIMULADO_OFICIAL = {
  fgv: {
    nome: "FGV Direito SP",
    duracaoMin: 210,
    blocos: [
      { nome: "Matemática", frentes: { "matematica-rlm": 15 } },
      // Na FGV 2026.1, 9 das 15 questões de Português saíram de dois romances
      // da lista. É a razão de literatura pesar mais que gramática aqui.
      { nome: "Língua Portuguesa", frentes: { "literatura": 9, "interpretacao-texto": 3, "gramatica": 3 } },
      { nome: "Inglês", frentes: { "ingles": 15 } },
      { nome: "Ciências Humanas", frentes: { "geografia": 5, "historia-brasil": 3, "historia-geral": 3, "atualidades-geopolitica": 2, "atualidades-meioambiente": 1, "artes-cultura": 1 } }
    ]
  },
  insper: {
    nome: "Insper",
    duracaoMin: 300,
    blocos: [
      { nome: "Linguagens e Códigos", frentes: { "literatura": 8, "interpretacao-texto": 4, "gramatica": 3 } },
      { nome: "Matemática", frentes: { "matematica-rlm": 15 } },
      { nome: "Ciências Humanas", frentes: { "geografia": 6, "historia-brasil": 3, "historia-geral": 2, "filosofia-sociologia": 4 } },
      // 5 de Biologia, 5 de Química e 5 de Física, nessa ordem, nos dois
      // cadernos de 2026. Não é aproximação, é gabarito de montagem -- mas o
      // banco tem uma frente única de Natureza, então o bloco sai inteiro dela.
      { nome: "Ciências da Natureza", frentes: { "ciencias-natureza": 15 } }
    ]
  }
};

// Monta as 60 questões do simulado oficial de uma banca, na ORDEM dos blocos.
//
// Diferente do adaptativo, aqui não se embaralha o conjunto: a ordem é parte
// do que se está treinando. Dentro de cada bloco os grupos são embaralhados,
// para o cluster não cair sempre na mesma posição, mas o bloco nunca invade o
// seguinte.
function pickSimuladoOficial(banca, visitIndex) {
  const modelo = SIMULADO_OFICIAL[banca];
  if (!modelo) return [];
  const nomePorId = {};
  const areaPorId = {};
  (window.SUBTOPICS || []).forEach((s) => { nomePorId[s.id] = s.nome; areaPorId[s.id] = s.area; });

  const itens = [];
  modelo.blocos.forEach((bloco, bIdx) => {
    const doBloco = [];
    Object.keys(bloco.frentes).forEach((id) => {
      const bank = (window.QUESTION_BANKS && window.QUESTION_BANKS[id]) || [];
      if (bank.length === 0) return;
      const count = Math.min(bloco.frentes[id], bank.length);
      // Rotação própria por banca e por bloco: sem o deslocamento, o simulado
      // oficial e o adaptativo comeriam a mesma janela de cada banco e o
      // candidato veria as mesmas questões nos dois.
      const semente = visitIndex * count + (bIdx + 1) * 7 + (banca === "insper" ? 3 : 0);
      const offset = snapOffsetToGroup(bank, semente, (q) => clusterKey(q));
      const circular = [];
      for (let j = 0; j < bank.length; j++) circular.push(bank[(offset + j) % bank.length]);
      takeExactly(circular, count, (q) => clusterKey(q)).forEach((q) => {
        doBloco.push({ question: q, subtopicId: id, subtopicNome: nomePorId[id] || id, area: areaPorId[id] || "", bloco: bloco.nome, blocoIndex: bIdx });
      });
    });
    const rng = mulberry32(visitIndex * 613 + bIdx * 29 + (banca === "insper" ? 101 : 0));
    shuffleGroups(doBloco, rng, (it) => clusterKey(it.question, it.subtopicId)).forEach((it) => itens.push(it));
  });
  return itens;
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

  const lessons = entry.topics.map(({ id, visitIndex, qOffset }) => {
    const meta = subtopicsById[id];
    const questions = pickQuestions(id, visitIndex, day, qOffset);
    return {
      subtopicId: id,
      nome: meta.nome,
      area: meta.area,
      descricao: meta.descricao,
      buscaVideo: meta.buscaVideo,
      visitNumber: visitIndex + 1,
      qOffset: qOffset,
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
