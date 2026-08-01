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

import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { db } from "./firebase-init.js";

const META_KEY = "v2_syncMeta"; // { "<chave>": <ms da última escrita local> } — não sobe pra nuvem
const PUSH_DEBOUNCE_MS = 2500;

// Estratégia de mesclagem por chave. O sufixo é o nome sem o prefixo "v2_".
//
//  "primeira"  -> data de início do plano: vence a MAIS ANTIGA. Se o celular
//                 criasse um "hoje" novo, o plano de 90 dias inteiro se
//                 deslocaria e a pessoa perderia a contagem real.
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
  vd_startDate: "primeira",
  vd_theorySeen: "ou",
  vd_obrasStudied: "ou",
  vd_topicLastAnswered: "maisRecente",
  vd_dayState: "maisProgresso",
  vd_topicState: "maisProgresso",
};

function baseName(key) {
  return key.replace(/^v2_/, "");
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

  if (strategy === "primeira") {
    if (!local) return remote;
    if (!remote) return local;
    return String(local) < String(remote) ? local : remote;
  }

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
function migrateFromV1() {
  const keys = window.VD_KEYS.SYNCABLE;
  const jaTemV2 = keys.some((k) => localStorage.getItem(k) !== null);
  if (jaTemV2) return false;

  const now = Date.now();
  const meta = loadMeta();
  let copiou = 0;
  keys.forEach((k) => {
    const v1Raw = localStorage.getItem(baseName(k));
    if (v1Raw !== null) {
      localStorage.setItem(k, v1Raw);
      meta[k] = now;
      copiou++;
    }
  });
  if (copiou) saveMeta(meta);
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
  if (!currentUid) return;
  clearTimeout(pushTimer);
  pushTimer = null;
  dirtyKeys.clear();
  setStatus("saving", "Salvando…");
  try {
    await setDoc(doc(db, "users", currentUid), {
      data: collectLocal(),
      updatedAt: Date.now(),
      app: "v2",
    });
    lastError = null;
    setStatus("ok", "Salvo na sua conta");
  } catch (err) {
    lastError = err;
    setStatus("error", "Só neste aparelho");
    console.warn("[sync] falha ao subir:", err.code || err.message, "—", friendlySyncError(err));
  }
}

function schedulePush() {
  if (!currentUid) return;
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
  setStatus("saving", "Sincronizando…");

  const migrou = migrateFromV1();
  const resultado = await pullAndMerge();

  // Sobe se: é a primeira vez desta conta (nuvem vazia), se trouxemos dados
  // do v1, ou se a mesclagem mudou algo — nesse caso a nuvem está defasada.
  if (resultado.ok && (resultado.primeiraVez || migrou || resultado.mudou)) {
    await pushNow();
  } else if (resultado.ok) {
    setStatus("ok", "Salvo na sua conta");
  }

  return { migrou: migrou, ok: resultado.ok };
}

function markDirty(key) {
  if (!key || key.indexOf(window.VD_KEYS.NS) !== 0) return;
  const meta = loadMeta();
  meta[key] = Date.now();
  saveMeta(meta);
  dirtyKeys.add(key);
  schedulePush();
}

function stop() {
  clearTimeout(pushTimer);
  pushTimer = null;
  currentUid = null;
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
  get erro() {
    return lastError;
  },
  // exposto pra teste: permite verificar a mesclagem sem tocar na rede
  _merge: mergeValue,
};
