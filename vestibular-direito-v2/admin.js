// Painel de administração (v2).
//
// Lê as duas coleções do Firestore — "feedback" (relatos) e "users" (progresso
// de cada conta) — e transforma isso em quatro visões: relatos, uso, desempenho
// por frente e questões mais erradas.
//
// Quem autoriza é a REGRA do Firestore, não este arquivo: aqui não há lista de
// UIDs nem verificação de "é admin?". A página simplesmente tenta ler; se o
// Firestore recusar, ela mostra o seu UID e a regra pronta pra colar. Assim
// existe uma fonte da verdade só, e ninguém ganha acesso editando o JavaScript.

import { auth, db } from "./firebase-init.js?v=26";
import {
  GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  collection, getDocs, query, orderBy, limit, doc, updateDoc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const provider = new GoogleAuthProvider();
const $ = (id) => document.getElementById(id);

const NS = "v2_";
const MAX_RELATOS = 300;

let dados = null; // { relatos: [], usuarios: [] }

// ---------- Utilidades ----------

function esc(str) {
  if (str == null) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function hojeISO() {
  return new Date().toISOString().slice(0, 10);
}

function deslocaISO(iso, dias) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}

function dataHora(ms) {
  if (!ms) return "—";
  return new Date(ms).toLocaleString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

// O documento do usuário guarda { data: { "<chave>": { value, ts } } }.
function valorDe(userDoc, chaveSemPrefixo) {
  const entrada = (userDoc.data || {})[NS + chaveSemPrefixo];
  return entrada ? entrada.value : undefined;
}

function nomeDaFrente(id) {
  const s = (window.SUBTOPICS || []).find((x) => x.id === id);
  return s ? s.nome : id;
}

function areaDaFrente(id) {
  const s = (window.SUBTOPICS || []).find((x) => x.id === id);
  return s ? s.area : "—";
}

// Mesma regra do app: conta pra trás a partir de hoje; se ainda não estudou
// hoje, a sequência de ontem continua valendo.
function sequenciaDe(diasEstudados) {
  if (!diasEstudados) return 0;
  const hoje = hojeISO();
  let cursor = diasEstudados[hoje] ? hoje : deslocaISO(hoje, -1);
  let n = 0;
  while (diasEstudados[cursor]) {
    n++;
    cursor = deslocaISO(cursor, -1);
  }
  return n;
}

// Índice questionId -> gabarito, pra saber o que foi errado.
let indiceGabarito = null;
function gabaritoDe(subtopicId, questionId) {
  if (!indiceGabarito) {
    indiceGabarito = {};
    const bancos = window.QUESTION_BANKS || {};
    Object.keys(bancos).forEach((sub) => {
      bancos[sub].forEach((q) => {
        indiceGabarito[sub + "::" + q.id] = q;
      });
    });
  }
  return indiceGabarito[subtopicId + "::" + questionId] || null;
}

// ---------- Carregamento ----------

async function carregar() {
  const [snapUsuarios, snapRelatos] = await Promise.all([
    getDocs(collection(db, "users")),
    getDocs(query(collection(db, "feedback"), orderBy("createdAt", "desc"), limit(MAX_RELATOS))),
  ]);

  const usuarios = [];
  snapUsuarios.forEach((d) => usuarios.push(Object.assign({ uid: d.id }, d.data())));

  const relatos = [];
  snapRelatos.forEach((d) => relatos.push(Object.assign({ id: d.id }, d.data())));

  return { usuarios, relatos };
}

// ---------- Aba: relatos ----------

const ROTULO_TIPO = {
  gabarito: "Gabarito errado",
  enunciado: "Enunciado confuso",
  alternativas: "Problema nas alternativas",
  escrita: "Erro de escrita",
  outro: "Outro",
};

function renderRelatos() {
  const alvo = $("tab-relatos");
  const lista = dados.relatos;

  if (!lista.length) {
    alvo.innerHTML = `<div class="card admin-vazio">
      <h3>Nenhum relato ainda</h3>
      <p class="lesson-desc">Quando alguém reportar um problema numa questão, ele aparece aqui —
      com o enunciado, o gabarito do app e a resposta da pessoa, pra você julgar sem abrir o app.</p>
    </div>`;
    return;
  }

  const pendentes = lista.filter((r) => !r.resolvido).length;
  const cards = lista.map((r) => {
    const g = gabaritoDe(r.subtopicId, r.questionId);
    const gabarito = (r.gabaritoDoApp || (g && g.resposta) || "?").toUpperCase();
    const resposta = r.respostaDaPessoa ? r.respostaDaPessoa.toUpperCase() : "não respondeu";
    const discordou = r.respostaDaPessoa && r.respostaDaPessoa !== (r.gabaritoDoApp || "");

    return `
      <div class="card admin-relato ${r.resolvido ? "resolvido" : ""}" data-id="${esc(r.id)}">
        <div class="admin-relato-topo">
          <span class="admin-tag admin-tag-${esc(r.tipo)}">${esc(ROTULO_TIPO[r.tipo] || r.tipo)}</span>
          <span class="admin-meta">${esc(nomeDaFrente(r.subtopicId))} · ${esc(r.questionId || "?")}
            ${r.dia != null ? " · dia " + esc(r.dia) : ""}</span>
          <span class="admin-data">${esc(dataHora(r.createdAt))}</span>
        </div>
        ${r.comentario ? `<p class="admin-comentario">“${esc(r.comentario)}”</p>` : ""}
        <p class="admin-enunciado">${esc(r.enunciado || "(enunciado não registrado)")}</p>
        <div class="admin-respostas">
          <span class="admin-pill">Gabarito do app: <strong>${esc(gabarito)}</strong></span>
          <span class="admin-pill ${discordou ? "divergente" : ""}">Respondeu: <strong>${esc(resposta)}</strong></span>
        </div>
        <div class="admin-relato-acoes">
          <button class="btn btn-ghost admin-btn-resolver">
            ${r.resolvido ? "Reabrir" : "Marcar como resolvido"}
          </button>
        </div>
      </div>`;
  }).join("");

  alvo.innerHTML = `
    <h2>Relatos de problema</h2>
    <p class="hint">${lista.length} no total · <strong>${pendentes}</strong> em aberto.
    Mostrando os ${MAX_RELATOS} mais recentes.</p>
    ${cards}`;

  alvo.querySelectorAll(".admin-relato").forEach((el) => {
    el.querySelector(".admin-btn-resolver").addEventListener("click", () => alternarResolvido(el));
  });
}

async function alternarResolvido(el) {
  const id = el.dataset.id;
  const relato = dados.relatos.find((r) => r.id === id);
  const btn = el.querySelector(".admin-btn-resolver");
  const novo = !relato.resolvido;

  btn.disabled = true;
  try {
    await updateDoc(doc(db, "feedback", id), { resolvido: novo });
    relato.resolvido = novo;
    renderRelatos();
  } catch (err) {
    btn.disabled = false;
    btn.textContent = "Não consegui salvar";
    console.warn("[admin] falha ao marcar resolvido:", err.code || err.message);
  }
}

// ---------- Aba: uso ----------

function renderUso() {
  const usuarios = dados.usuarios;
  const hoje = hojeISO();
  const limite7 = deslocaISO(hoje, -6);

  let ativos7 = 0;
  let ativosHoje = 0;
  let somaSequencia = 0;
  const linhas = [];

  usuarios.forEach((u) => {
    const dias = valorDe(u, "vd_studyDays") || {};
    const dts = Object.keys(dias).filter((d) => dias[d]).sort();
    const ultimo = dts[dts.length - 1] || null;
    const seq = sequenciaDe(dias);
    somaSequencia += seq;
    if (ultimo && ultimo >= limite7) ativos7++;
    if (ultimo === hoje) ativosHoje++;

    const inicio = valorDe(u, "vd_startDate");
    let diaDoPlano = "—";
    if (inicio) {
      const n = Math.floor((new Date(hoje + "T00:00:00") - new Date(inicio + "T00:00:00")) / 86400000) + 1;
      diaDoPlano = Math.min(Math.max(n, 1), 90);
    }

    const topic = valorDe(u, "vd_topicState") || {};
    let resp = 0, cert = 0;
    Object.values(topic).forEach((t) => { resp += t.answered || 0; cert += t.correct || 0; });

    linhas.push({
      uid: u.uid, diaDoPlano, seq, ultimo, diasEstudados: dts.length,
      respondidas: resp, acerto: resp ? Math.round((cert / resp) * 100) : null,
    });
  });

  linhas.sort((a, b) => (b.ultimo || "").localeCompare(a.ultimo || ""));

  const cartao = (rotulo, valor, nota) => `
    <div class="card admin-num">
      <div class="admin-num-valor">${valor}</div>
      <div class="admin-num-rotulo">${rotulo}</div>
      ${nota ? `<div class="admin-num-nota">${nota}</div>` : ""}
    </div>`;

  const mediaSeq = usuarios.length ? (somaSequencia / usuarios.length).toFixed(1) : "0";

  $("tab-uso").innerHTML = `
    <h2>Uso</h2>
    <div class="admin-nums">
      ${cartao("Contas criadas", usuarios.length)}
      ${cartao("Estudaram hoje", ativosHoje)}
      ${cartao("Ativos em 7 dias", ativos7, usuarios.length ? Math.round((ativos7 / usuarios.length) * 100) + "% do total" : "")}
      ${cartao("Ofensiva média", mediaSeq, "dias seguidos")}
    </div>

    <h3>Por conta</h3>
    <p class="hint">Ordenado pelo estudo mais recente. O UID é o identificador da conta no Firebase.</p>
    <div class="admin-tabela-wrap">
      <table class="admin-tabela">
        <thead><tr>
          <th>Conta</th><th>Dia do plano</th><th>Ofensiva</th><th>Dias estudados</th>
          <th>Respondidas</th><th>Acerto</th><th>Último estudo</th>
        </tr></thead>
        <tbody>
          ${linhas.map((l) => `<tr>
            <td><code class="admin-uid-curto">${esc(l.uid.slice(0, 8))}…</code></td>
            <td>${esc(l.diaDoPlano)}</td>
            <td>${l.seq > 0 ? "🔥 " + l.seq : "—"}</td>
            <td>${l.diasEstudados}</td>
            <td>${l.respondidas}</td>
            <td>${l.acerto == null ? "—" : l.acerto + "%"}</td>
            <td>${esc(l.ultimo || "nunca")}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`;
}

// ---------- Aba: frentes ----------

function renderFrentes() {
  const agregado = {};
  dados.usuarios.forEach((u) => {
    const topic = valorDe(u, "vd_topicState") || {};
    Object.keys(topic).forEach((sub) => {
      if (!agregado[sub]) agregado[sub] = { answered: 0, correct: 0, contas: 0 };
      agregado[sub].answered += topic[sub].answered || 0;
      agregado[sub].correct += topic[sub].correct || 0;
      if ((topic[sub].answered || 0) > 0) agregado[sub].contas++;
    });
  });

  const linhas = Object.keys(agregado).map((sub) => {
    const a = agregado[sub];
    return {
      sub, nome: nomeDaFrente(sub), area: areaDaFrente(sub),
      answered: a.answered, contas: a.contas,
      acerto: a.answered ? (a.correct / a.answered) * 100 : null,
    };
  }).filter((l) => l.answered > 0).sort((a, b) => a.acerto - b.acerto);

  if (!linhas.length) {
    $("tab-frentes").innerHTML = `<div class="card admin-vazio"><h3>Sem dados ainda</h3>
      <p class="lesson-desc">Assim que houver questões respondidas, o acerto médio de cada
      frente aparece aqui — da mais difícil para a mais fácil.</p></div>`;
    return;
  }

  $("tab-frentes").innerHTML = `
    <h2>Desempenho por frente</h2>
    <p class="hint">Somando todas as contas, da frente com menor acerto para a maior.
    Acerto baixo demais pode ser conteúdo difícil — ou questão com problema.</p>
    ${linhas.map((l) => `
      <div class="card admin-frente">
        <div class="admin-frente-topo">
          <div>
            <strong>${esc(l.nome)}</strong>
            <span class="admin-meta">${esc(l.area)} · ${l.answered} respostas · ${l.contas} conta(s)</span>
          </div>
          <span class="admin-frente-pct ${l.acerto < 50 ? "ruim" : l.acerto < 70 ? "medio" : "bom"}">
            ${Math.round(l.acerto)}%
          </span>
        </div>
        <div class="admin-barra"><div class="admin-barra-fill ${l.acerto < 50 ? "ruim" : l.acerto < 70 ? "medio" : "bom"}"
          style="width:${Math.round(l.acerto)}%"></div></div>
      </div>`).join("")}`;
}

// ---------- Aba: questões mais erradas ----------

function renderQuestoes() {
  // Cruza a resposta de cada conta com o gabarito do banco.
  const porQuestao = {};
  dados.usuarios.forEach((u) => {
    const respostas = valorDe(u, "vd_answers") || {};
    Object.keys(respostas).forEach((chave) => {
      const sep = chave.indexOf("::");
      if (sep < 0) return;
      const sub = chave.slice(0, sep);
      const qid = chave.slice(sep + 2);
      const q = gabaritoDe(sub, qid);
      if (!q) return; // questões de obras vivem em outro banco; ficam de fora
      if (!porQuestao[chave]) porQuestao[chave] = { sub, qid, q, total: 0, erros: 0, escolhas: {} };
      const reg = porQuestao[chave];
      reg.total++;
      const letra = respostas[chave];
      reg.escolhas[letra] = (reg.escolhas[letra] || 0) + 1;
      if (letra !== q.resposta) reg.erros++;
    });
  });

  const relatadas = new Set(dados.relatos.map((r) => r.subtopicId + "::" + r.questionId));

  const linhas = Object.keys(porQuestao)
    .map((k) => {
      const r = porQuestao[k];
      return Object.assign({ chave: k, taxaErro: (r.erros / r.total) * 100, relatada: relatadas.has(k) }, r);
    })
    .filter((l) => l.total >= 1 && l.erros > 0)
    .sort((a, b) => b.taxaErro - a.taxaErro || b.total - a.total)
    .slice(0, 50);

  if (!linhas.length) {
    $("tab-questoes").innerHTML = `<div class="card admin-vazio"><h3>Sem erros registrados</h3>
      <p class="lesson-desc">Quando houver respostas erradas, as questões com maior taxa de erro
      aparecem aqui. Cruzadas com os relatos, apontam candidatas a gabarito errado.</p></div>`;
    return;
  }

  $("tab-questoes").innerHTML = `
    <h2>Questões mais erradas</h2>
    <p class="hint">Top ${linhas.length}, por taxa de erro. A marca <span class="admin-flag">relatada</span>
    indica que alguém também reportou problema nela — é o sinal mais forte de gabarito errado.</p>
    ${linhas.map((l) => {
      const escolhas = Object.keys(l.escolhas).sort()
        .map((letra) => `<span class="admin-pill ${letra === l.q.resposta ? "certa" : ""}">${esc(letra.toUpperCase())}: ${l.escolhas[letra]}</span>`)
        .join("");
      return `
        <div class="card admin-questao">
          <div class="admin-relato-topo">
            <span class="admin-taxa">${Math.round(l.taxaErro)}% de erro</span>
            <span class="admin-meta">${esc(nomeDaFrente(l.sub))} · ${esc(l.qid)} · ${l.total} resposta(s)</span>
            ${l.relatada ? `<span class="admin-flag">relatada</span>` : ""}
          </div>
          <p class="admin-enunciado">${esc(l.q.enunciado)}</p>
          <div class="admin-respostas">
            <span class="admin-pill">Gabarito: <strong>${esc((l.q.resposta || "").toUpperCase())}</strong></span>
            ${escolhas}
          </div>
        </div>`;
    }).join("")}`;
}

// ---------- Abas ----------

function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      $("tab-" + btn.dataset.tab).classList.add("active");
    });
  });
}

// ---------- Tela de liberação (quando o Firestore recusa) ----------

const REGRAS = (uid) => `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null && request.auth.uid == '${uid}';
    }

    match /syncCodes/{code} {
      allow read, write: if code.size() >= 8;
    }

    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
      allow read: if isAdmin();
    }

    match /feedback/{docId} {
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      allow read, update: if isAdmin();
      allow delete: if false;
    }
  }
}`;

function mostrarBootstrap(user) {
  $("view-login").hidden = true;
  $("view-panel").hidden = true;
  $("view-bootstrap").hidden = false;
  $("meu-uid").textContent = user.uid;
  $("regras-prontas").textContent = REGRAS(user.uid);

  const copiar = async (texto, btn, rotulo) => {
    try {
      await navigator.clipboard.writeText(texto);
      btn.textContent = "Copiado!";
      setTimeout(() => { btn.textContent = rotulo; }, 1800);
    } catch (e) {
      btn.textContent = "Copie manualmente";
    }
  };
  $("btn-copiar-uid").onclick = (e) => copiar(user.uid, e.target, "Copiar");
  $("btn-copiar-regras").onclick = (e) => copiar(REGRAS(user.uid), e.target, "Copiar regras");
}

// ---------- Entrada ----------

async function entrarNoPainel(user) {
  $("view-login").hidden = true;
  $("view-bootstrap").hidden = true;
  $("view-panel").hidden = false;

  try {
    dados = await carregar();
  } catch (err) {
    if (err && (err.code === "permission-denied" || err.code === "missing-or-insufficient-permissions")) {
      mostrarBootstrap(user);
      return;
    }
    $("admin-carregando").textContent = "Não consegui carregar os dados: " + (err.code || err.message);
    return;
  }

  $("admin-carregando").hidden = true;
  renderRelatos();
  renderUso();
  renderFrentes();
  renderQuestoes();
}

// Exposto pra verificação: injeta dados e renderiza as quatro abas sem tocar
// na rede, permitindo conferir os cálculos com casos conhecidos.
window.VD_ADMIN = {
  _renderComDados(d) {
    dados = d;
    $("view-login").hidden = true;
    $("view-bootstrap").hidden = true;
    $("view-panel").hidden = false;
    $("admin-carregando").hidden = true;
    renderRelatos();
    renderUso();
    renderFrentes();
    renderQuestoes();
  },
  _sequenciaDe: sequenciaDe,
  _bootstrap: mostrarBootstrap,
};

$("btn-login-google").addEventListener("click", async () => {
  $("login-error").hidden = true;
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    $("login-error").hidden = false;
    $("login-error").textContent = "Não consegui entrar: " + (err.code || err.message);
  }
});

$("btn-logout").addEventListener("click", async () => {
  await signOut(auth);
  location.reload();
});

initTabs();

onAuthStateChanged(auth, (user) => {
  if (user) entrarNoPainel(user);
  else {
    $("view-login").hidden = false;
    $("view-panel").hidden = true;
    $("view-bootstrap").hidden = true;
  }
});
