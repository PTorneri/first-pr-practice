// Motor de sincronização do progresso (v2).
//
// Como funciona, em uma frase: o localStorage continua sendo a fonte que o
// app lê e escreve o tempo todo (então tudo funciona offline, como sempre
// funcionou), e este arquivo espelha esse estado no Firestore, na conta do
// usuário, pra que ele reapareça em qualquer aparelho.
//
// O problema difícil aqui não é subir/baixar — é MESCLAR. Se a pessoa
// estuda no computador e depois no celular, os dois lados têm versões
// diferentes do progresso. Pegar "o mais recente" e jogar fora o outro
// perderia respostas de verdade. Por isso a mesclagem é feita entrada por
// entrada (questão por questão, dia por dia), com uma regra por tipo de
// dado — descritas em MERGE_STRATEGY logo abaixo.

import { doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { db } from "./firebase-init.js?v=28";

const META_KEY = "v2_syncMeta"; // { "<chave>": <ms da última escrita local> } — não sobe pra nuvem
const PUSH_DEBOUNCE_MS = 2500;

// Estratégia de mesclagem por chave. O sufixo é o nome sem o prefixo "v2_".
//
//  "ou"        -> flags que só ligam (teoria vista, obra estudada): uma vez
//                 true, sempre true. União simples.
//  "maisRecente" -> datas ISO: vence a mais recente (ex.: última vez que a
//                 frente foi praticada).
//  "maisProgresso" -> contadores derivados (respondidas/acertos): vence a
//                 entrada com mais respostas, que é a que viu mais história.
//  "entrada"   -> padrão: união entrada a entrada; quando os DOIS lados têm
//                 a mesma entrada com valores diferentes, vence o lado que
//                 escreveu por último.
const MERGE_STRATEGY = {
  // vd_startDate NÃO está aqui: usa o padrão "entrada" (vence quem escreveu por
  // último). Antes valia "a mais antiga vence", como rede de proteção contra um
  // aparelho novo criar um "hoje" e deslocar o plano inteiro. Essa proteção
  // agora é feita direito — o app não sobe sem ler a nuvem, e não escreve sem
  // ter lido — e a regra da mais antiga tinha um efeito perverso: uma data
  // errada e antiga virava PERMANENTE, porque nenhuma correção conseguia
  // vencê-la. Corrigir a data precisa ser possível.
  vd_theorySeen: "ou",
  vd_obrasStudied: "ou",
  // Ofensiva: união dos dias estudados. Estudou no celular na terça e no PC
  // na quarta? Os dois dias contam. A sequência é recalculada dessa união,
  // então ela nunca fica presa num número errado vindo de um aparelho.
  vd_studyDays: "ou",
  vd_topicLastAnswered: "maisRecente",
  vd_dayState: "maisProgresso",
  vd_topicState: "maisProgresso",
};

// Tira o prefixo completo ("v2_dir_", "v2_med_" ou só "v2_") para achar a
// estratégia de mesclagem em MERGE_STRATEGY, que é indexada pelo nome puro.
// Sem tratar o prefixo de trilha aqui, TODAS as chaves cairiam na estratégia
// padrão e a ofensiva voltaria a se perder entre aparelhos.
function baseName(key) {
  return key.replace(/^v2_(dir_|med_)?/, "");
}

function loadMeta() {
  try {
    return JSON.parse(localStorage.getItem(META_KEY) || "{}");
  } catch (e) {
    return {};
  }
}

function saveMeta(meta) {
  localStorage.setItem(META_KEY, JSON.stringify(meta));
}

function readLocal(key) {
  const raw = localStorage.getItem(key);
  if (raw == null) return undefined;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return raw; // vd_startDate é uma string crua, não JSON
  }
}

function writeLocal(key, value) {
  if (value === undefined || value === null) return;
  if (typeof value === "string") localStorage.setItem(key, value);
  else localStorage.setItem(key, JSON.stringify(value));
}

function isObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

// ---------- A mesclagem propriamente dita ----------

function mergeValue(key, local, remote, localTs, remoteTs) {
  if (local === undefined) return remote;
  if (remote === undefined) return local;

  const strategy = MERGE_STRATEGY[baseName(key)] || "entrada";

  if (!isObject(local) || !isObject(remote)) {
    // Valores simples que não caem nas regras acima: o mais recente vence.
    return remoteTs > localTs ? remote : local;
  }

  const out = Object.assign({}, local);
  Object.keys(remote).forEach((entry) => {
    const r = remote[entry];
    const l = local[entry];

    if (!(entry in local)) {
      out[entry] = r; // só existe de um lado: entra sem conflito
      return;
    }
    if (JSON.stringify(l) === JSON.stringify(r)) return; // iguais, nada a decidir

    if (strategy === "ou") {
      out[entry] = l || r;
    } else if (strategy === "maisRecente") {
      out[entry] = String(r) > String(l) ? r : l;
    } else if (strategy === "maisProgresso") {
      const lAns = isObject(l) ? l.answered || 0 : 0;
      const rAns = isObject(r) ? r.answered || 0 : 0;
      if (rAns > lAns) out[entry] = r;
      else if (rAns === lAns && isObject(r) && isObject(l) && (r.correct || 0) > (l.correct || 0)) out[entry] = r;
      else out[entry] = l;
    } else {
      out[entry] = remoteTs > localTs ? r : l;
    }
  });
  return out;
}

// ---------- Estado do módulo ----------

let currentUid = null;
let dirtyKeys = new Set();
let pushTimer = null;
let statusEl = null;
let lastError = null;

// Trava de segurança: só é permitido ESCREVER na nuvem depois de ter LIDO dela
// com sucesso. Sem isso, um aparelho cujo download falhou sobe o próprio estado
// (vazio ou desatualizado) como se fosse a verdade e apaga o progresso real —
// foi exatamente o que aconteceu no bug do primeiro login pelo celular.
let podeEscrever = false;

function setStatus(state, text) {
  if (!statusEl) statusEl = document.getElementById("sync-status");
  if (!statusEl) return;
  statusEl.dataset.state = state;
  statusEl.textContent = text;
  statusEl.hidden = false;
}

function friendlySyncError(err) {
  const code = err && err.code ? err.code : "";
  if (code === "permission-denied") {
    return "As regras do Firestore ainda não liberam o documento do usuário " +
      "(Firestore > Regras). Seu progresso segue salvo neste aparelho.";
  }
  if (code === "unavailable" || code === "failed-precondition") {
    return "Sem conexão com a nuvem agora. Seu progresso segue salvo neste aparelho.";
  }
  return "Não consegui sincronizar agora. Seu progresso segue salvo neste aparelho.";
}

// ---------- Migração única do v1 ----------

// O v1 e o v2 dividem o mesmo localStorage (mesmo domínio), mas o v2 usa o
// prefixo "v2_" pra não mexer nos dados do v1. Na primeira entrada, copiamos
// o progresso do v1 pro espaço do v2 — assim ninguém recomeça do zero — e o
// v1 continua exatamente como estava, servindo de cópia de segurança.
// ---------- Migração única para o namespace de trilha (2026-08) ----------

// Antes das trilhas, todo o progresso do v2 vivia em "v2_vd_*" e era sempre de
// Direito. Esta função renomeia essas chaves para "v2_dir_vd_*" e marca a
// trilha como "direito", pra que quem já usava o app nem veja a tela de
// escolha e continue exatamente no dia em que parou.
//
// DIFERENÇA CRÍTICA em relação a migrateFromV1(): lá o carimbo vira 1 de
// propósito, porque o dado do v1 é velho. Aqui é o MESMO dado, com a MESMA
// idade — o carimbo original tem que ser preservado. Carimbar com 1 faria o
// progresso real perder para qualquer aparelho desatualizado; carimbar com
// Date.now() faria o contrário. Os dois erros são silenciosos e destroem
// progresso de verdade.
//
// As chaves "v2_vd_*" ficam onde estão, como cópia de segurança — mesma
// decisão que foi tomada com as do v1.
function migrarParaTrilha() {
  const chaveTrilha = window.VD_KEYS.TRILHA;
  if (localStorage.getItem(chaveTrilha) !== null) return false; // já migrou

  const meta = loadMeta();
  let copiou = 0;
  window.VD_KEYS.BASES.forEach((base) => {
    const antiga = "v2_" + base;      // v2_vd_answers
    const nova = window.VD_KEYS.NS + base; // v2_dir_vd_answers
    const valor = localStorage.getItem(antiga);
    if (valor !== null && localStorage.getItem(nova) === null) {
      localStorage.setItem(nova, valor);
      meta[nova] = meta[antiga] || 1; // preserva a idade original
      copiou++;
    }
  });

  // Grava a trilha mesmo que não haja nada a copiar: uma conta nova precisa
  // passar pela tela de escolha, e é a AUSÊNCIA desta chave que a dispara.
  // Só marcamos "direito" automaticamente quando havia progresso antigo.
  if (copiou > 0) {
    localStorage.setItem(chaveTrilha, "direito");
    meta[chaveTrilha] = Date.now();
    saveMeta(meta);
  }
  return copiou > 0;
}

function migrateFromV1() {
  const chaveTrilha = window.VD_KEYS.TRILHA;

  // TRAVA DE TRILHA. O v1 só existiu para Direito, então este resgate só faz
  // sentido no espaço de Direito.
  //
  // Sem esta linha havia um bug destrutivo e nada óbvio: ao trocar para
  // Medicina, o espaço "v2_med_" estaria legitimamente vazio, a checagem
  // `jaTemV2` daria falso, e o progresso de DIREITO guardado no v1 seria
  // copiado para dentro da trilha de Medicina — inventando um plano de
  // Medicina já pela metade, feito de respostas de outro curso. O mesmo
  // aconteceria com quem criasse a conta e escolhesse Medicina de cara.
  const trilhaAtiva = (window.VD_TRILHA && window.VD_TRILHA.atual()) || "direito";
  if (trilhaAtiva !== "direito") return false;

  // Só as chaves de progresso. A chave da trilha entra em SYNCABLE mas NÃO
  // participa desta cópia: ela não existe no v1, e baseName() a reduziria a
  // "trilha", um nome que não é de ninguém.
  const keys = window.VD_KEYS.SYNCABLE.filter((k) => k !== chaveTrilha);
  const jaTemV2 = keys.some((k) => localStorage.getItem(k) !== null);
  if (jaTemV2) return false;

  // ts = 1 (o mais antigo possível), NÃO Date.now(). O que vem do v1 deste
  // aparelho é dado ANTIGO, mesmo tendo sido copiado agora: carimbá-lo com a
  // hora atual faria ele vencer, por "ser mais recente", o progresso real que
  // está na nuvem — e um celular com um v1 esquecido sobrescreveria o plano
  // inteiro do computador.
  const meta = loadMeta();
  let copiou = 0;
  keys.forEach((k) => {
    const v1Raw = localStorage.getItem(baseName(k));
    if (v1Raw !== null) {
      localStorage.setItem(k, v1Raw);
      meta[k] = 1;
      copiou++;
    }
  });
  if (copiou) {
    // Quem vem do v1 estudava Direito — o v1 nunca teve outra trilha. Sem
    // isto, essa pessoa cairia na tela de escolha com o plano já montado
    // atrás, o que sugeriria que ela pode escolher Medicina e manter o
    // progresso. Não pode: são espaços diferentes.
    if (localStorage.getItem(chaveTrilha) === null) {
      localStorage.setItem(chaveTrilha, "direito");
      meta[chaveTrilha] = Date.now();
    }
    saveMeta(meta);
  }
  return copiou > 0;
}

// ---------- Subir / baixar ----------

function collectLocal() {
  const meta = loadMeta();
  const data = {};
  window.VD_KEYS.SYNCABLE.forEach((k) => {
    const v = readLocal(k);
    if (v !== undefined) data[k] = { value: v, ts: meta[k] || 0 };
  });
  return data;
}

async function pushNow() {
  if (!currentUid || !podeEscrever) return;
  clearTimeout(pushTimer);
  pushTimer = null;
  dirtyKeys.clear();
  setStatus("saving", "Salvando…");
  try {
    // merge:true é essencial: sem ele o setDoc SUBSTITUI o documento inteiro, e
    // qualquer chave que este aparelho não tenha localmente some da nuvem. Com
    // merge, cada chave é escrita por cima da sua correspondente e o resto fica.
    await setDoc(doc(db, "users", currentUid), {
      data: collectLocal(),
      updatedAt: Date.now(),
      app: "v2",
    }, { merge: true });
    lastError = null;
    setStatus("ok", "Salvo na sua conta");
  } catch (err) {
    lastError = err;
    setStatus("error", "Só neste aparelho");
    console.warn("[sync] falha ao subir:", err.code || err.message, "—", friendlySyncError(err));
  }
}

function schedulePush() {
  if (!currentUid || !podeEscrever) return;
  setStatus("saving", "Salvando…");
  clearTimeout(pushTimer);
  pushTimer = setTimeout(pushNow, PUSH_DEBOUNCE_MS);
}

// Baixa o que está na nuvem e mescla com o que está neste aparelho.
async function pullAndMerge() {
  const meta = loadMeta();
  let snap;
  try {
    snap = await getDoc(doc(db, "users", currentUid));
  } catch (err) {
    lastError = err;
    setStatus("error", "Só neste aparelho");
    console.warn("[sync] falha ao baixar:", err.code || err.message, "—", friendlySyncError(err));
    return { ok: false, mudou: false };
  }

  if (!snap.exists()) return { ok: true, mudou: false, primeiraVez: true };

  const remoto = (snap.data() || {}).data || {};
  let mudou = false;

  window.VD_KEYS.SYNCABLE.forEach((k) => {
    const entradaRemota = remoto[k];
    if (!entradaRemota) return;
    const local = readLocal(k);
    const localTs = meta[k] || 0;
    const remoteTs = entradaRemota.ts || 0;

    const merged = mergeValue(k, local, entradaRemota.value, localTs, remoteTs);
    if (JSON.stringify(merged) !== JSON.stringify(local)) {
      writeLocal(k, merged);
      meta[k] = Math.max(localTs, remoteTs);
      mudou = true;
    }
  });

  if (mudou) saveMeta(meta);
  return { ok: true, mudou: mudou };
}

// ---------- API pública ----------

// Chamado por auth.js assim que há usuário logado, ANTES de o app subir:
// é isso que faz "retomar de onde parou" funcionar em qualquer aparelho.
async function start(user) {
  currentUid = user.uid;
  podeEscrever = false; // só libera depois de ler a nuvem com sucesso
  setStatus("saving", "Sincronizando…");

  // ORDEM OBRIGATÓRIA: as duas migrações são locais e têm que acontecer ANTES
  // de ler a nuvem, para que a mesclagem já veja as chaves com o nome novo.
  // Rodar qualquer uma delas depois do pull faria o dado migrado nascer sem
  // par do outro lado e sobrescrever o que veio da conta.
  //
  // migrarParaTrilha() primeiro: ela renomeia v2_vd_* -> v2_dir_vd_*. Se
  // migrateFromV1() rodasse antes, veria o espaço da trilha vazio e copiaria o
  // v1 por cima de um progresso do v2 que só ainda não tinha sido renomeado.
  const migrouTrilha = migrarParaTrilha();
  const migrouV1 = migrateFromV1();
  const migrou = migrouTrilha || migrouV1;
  const resultado = await pullAndMerge();

  if (!resultado.ok) {
    // Não conseguimos ler a nuvem. A escrita continua travada e quem chamou
    // (auth.js) deve impedir o app de subir: deixar a pessoa "começar um plano
    // novo" aqui seria criar um estado falso que depois sobrescreve o real.
    return { migrou: migrou, ok: false };
  }

  podeEscrever = true;

  // Sobe se: é a primeira vez desta conta (nuvem vazia), se trouxemos dados
  // do v1, ou se a mesclagem mudou algo — nesse caso a nuvem está defasada.
  if (resultado.primeiraVez || migrou || resultado.mudou) {
    await pushNow();
  } else {
    setStatus("ok", "Salvo na sua conta");
  }

  return { migrou: migrou, ok: true };
}

function markDirty(key) {
  // Aceita as chaves da trilha ativa (v2_dir_* / v2_med_*) e também a chave da
  // trilha em si, que vive fora do namespace justamente por ser quem decide
  // qual namespace usar.
  if (!key) return;
  const daTrilhaAtiva = key.indexOf(window.VD_KEYS.NS) === 0;
  const ehChaveDeTrilha = key === window.VD_KEYS.TRILHA;
  if (!daTrilhaAtiva && !ehChaveDeTrilha) return;
  const meta = loadMeta();
  meta[key] = Date.now();
  saveMeta(meta);
  dirtyKeys.add(key);
  schedulePush();
}

// Reiniciar de verdade: apaga TAMBÉM o documento da nuvem.
//
// Sem isto, "Reiniciar todo o progresso" era uma promessa falsa: limpava só o
// aparelho e, no login seguinte, o sync baixava tudo de volta da conta — dava a
// impressão de que o botão não funcionava.
async function apagarTudoNaNuvem() {
  if (!currentUid) return { ok: false, motivo: "sem-usuario" };
  try {
    await deleteDoc(doc(db, "users", currentUid));
    podeEscrever = false; // nada a escrever até ler de novo
    return { ok: true };
  } catch (err) {
    console.warn("[sync] falha ao apagar na nuvem:", err.code || err.message);
    return { ok: false, motivo: err.code || err.message };
  }
}

// Correção explícita da data de início, feita pela pessoa.
//
// Escreve local e sobe na hora, com carimbo de agora — por isso vence a versão
// que estiver na nuvem ou em outro aparelho. É a única forma de consertar um
// plano que começou na data errada.
async function definirDataDeInicio(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return { ok: false, motivo: "data-invalida" };
  const chave = window.VD_KEYS.START;
  localStorage.setItem(chave, iso);
  const meta = loadMeta();
  meta[chave] = Date.now();
  saveMeta(meta);
  if (podeEscrever) await pushNow();
  return { ok: true };
}

function stop() {
  clearTimeout(pushTimer);
  pushTimer = null;
  currentUid = null;
  podeEscrever = false;
  dirtyKeys.clear();
}

// Se a pessoa fechar a aba com algo pendente, tenta subir antes de sair.
window.addEventListener("pagehide", () => {
  if (pushTimer && currentUid) pushNow();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden" && pushTimer && currentUid) pushNow();
});

window.VD_SYNC = {
  start: start,
  stop: stop,
  markDirty: markDirty,
  pushNow: pushNow,
  apagarTudoNaNuvem: apagarTudoNaNuvem,
  definirDataDeInicio: definirDataDeInicio,
  get erro() {
    return lastError;
  },
  // exposto pra teste: permite verificar a mesclagem sem tocar na rede
  _merge: mergeValue,
  // exposto pra teste: a migração para o namespace de trilha é a operação de
  // maior risco do app (renomeia todas as chaves de progresso de quem já
  // usava). Poder rodá-la isolada, sem login e sem rede, é o que torna
  // possível verificar que ela preserva o carimbo original em vez de
  // envelhecer ou rejuvenescer o progresso.
  _migrarParaTrilha: migrarParaTrilha,
  // exposto pra teste: verifica a trava que impede o progresso de Direito
  // guardado no v1 de ser copiado para dentro da trilha de Medicina.
  _migrarDoV1: migrateFromV1,
};
