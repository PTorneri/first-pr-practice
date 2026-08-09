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

import { auth, db } from "./firebase-init.js?v=35";
import {
  GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import {
  collection, getDocs, query, orderBy, limit, doc, updateDoc, setDoc, writeBatch,
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const provider = new GoogleAuthProvider();
const $ = (id) => document.getElementById(id);

const NS = "v2_";
const MAX_RELATOS = 300;

// O Firestore corta um lote em 500 operações. 400 deixa margem e não muda nada
// na prática: liberar 400 e-mails de uma vez já é um caso que não vai existir.
const TAM_LOTE = 400;

let dados = null; // { relatos: [], usuarios: [], assinaturas: [] }
let usuarioAtual = null; // quem está com o painel aberto — vai no registro de quem liberou

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

  // A leitura das assinaturas fica FORA do Promise.all e com try/catch próprio.
  // Não é zelo decorativo: enquanto a regra de /assinaturas não estiver
  // publicada, o Firestore recusa esta coleção — e junto com as outras duas o
  // erro subiria como permission-denied, jogando o painel inteiro na tela de
  // bootstrap. Relatos, uso e frentes parariam de aparecer por causa de uma aba
  // nova, e a mensagem falaria de UID não autorizado, que não é o problema.
  let assinaturas = [];
  let assinaturasErro = null;
  try {
    const snap = await getDocs(collection(db, "assinaturas"));
    snap.forEach((d) => assinaturas.push(Object.assign({ email: d.id }, d.data())));
  } catch (err) {
    assinaturasErro = err.code || err.message;
  }

  return { usuarios, relatos, assinaturas, assinaturasErro };
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

// ---------- Aba: assinaturas ----------
//
// É por aqui que se vende enquanto não existe webhook: a pessoa paga no
// checkout, você cola o e-mail dela aqui e o acesso abre. Um documento em
// /assinaturas/{email} é a única coisa que o portão do app olha.
//
// O e-mail é a CHAVE do documento, então normalizar não é capricho: o portão
// compara com request.auth.token.email.lower() na regra do Firestore, e
// "Fulano@Gmail.com" cadastrado assim nunca casaria com o login. Minúsculas e
// sem espaço, sempre.

function normalizarEmail(bruto) {
  const e = String(bruto || "").trim().toLowerCase();
  if (!e) return null;
  // Deliberadamente simples: isto não valida e-mail, só rejeita o que quebraria
  // o documento ou a regra — barra e espaço não podem entrar num ID de
  // documento. Se o e-mail existe mesmo, quem prova é o login do Google.
  if (!/^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(e)) return null;
  return e;
}

// Renovar cedo SOMA ao que ainda resta, em vez de truncar: quem paga com 20
// dias de sobra não pode perder esses 20 dias por ter pago adiantado.
//
// Já uma assinatura CANCELADA recomeça de hoje — o tempo que sobrava nela foi
// abandonado, e ressuscitá-lo daria acesso que ninguém pagou. Por isso quem
// chama passa 0 quando a atual não está ativa.
function novaValidade(dias, expiraAtual) {
  const base = Math.max(Date.now(), expiraAtual || 0);
  return base + dias * 86400000;
}

// Espelho de julgar(), em assinatura.js. As duas TÊM que concordar: se uma
// disser "ativa" e a outra "vencida", o painel mente sobre quem entra no app.
// Mexeu numa, mexa na outra.
function estadoDaAssinatura(a) {
  const exp = a.expiraEm || 0;
  if (a.ativa !== true) return "cancelada";
  if (exp && exp <= Date.now()) return "vencida";
  return "ativa";
}

function diasRestantes(a) {
  if (!a.expiraEm) return null;
  return Math.ceil((a.expiraEm - Date.now()) / 86400000);
}

const ROTULO_ESTADO = { ativa: "Ativa", vencida: "Vencida", cancelada: "Cancelada" };

function renderAssinaturas() {
  const alvo = $("tab-assinaturas");
  const lista = (dados.assinaturas || []).slice();

  // Sem a regra publicada não há o que listar nem como escrever. Falar disso
  // primeiro, com o caminho exato, evita a leitura de que "o painel quebrou".
  if (dados.assinaturasErro) {
    alvo.innerHTML = `
      <h2>Assinaturas</h2>
      <div class="card admin-vazio">
        <h3>A regra de <code>/assinaturas</code> ainda não está publicada</h3>
        <p class="lesson-desc">O Firestore recusou a leitura com
        <code>${esc(dados.assinaturasErro)}</code>. Abra o Console do Firebase &gt; Firestore
        &gt; Regras, cole o conteúdo de <code>firestore.rules</code> e publique. Depois
        recarregue esta página.</p>
        <p class="lesson-desc">Enquanto isso o resto do painel funciona normalmente — só esta
        aba depende da coleção nova.</p>
      </div>`;
    return;
  }

  const agora = Date.now();
  let ativas = 0, vencendo = 0, vencidas = 0, canceladas = 0;
  lista.forEach((a) => {
    const e = estadoDaAssinatura(a);
    if (e === "ativa") {
      ativas++;
      if (a.expiraEm && a.expiraEm - agora < 7 * 86400000) vencendo++;
    } else if (e === "vencida") vencidas++;
    else canceladas++;
  });

  // Ativas primeiro, e dentro delas quem vence antes — a ordem em que você
  // precisa agir. Vencidas e canceladas afundam.
  const peso = { ativa: 0, vencida: 1, cancelada: 2 };
  // Sem prazo é o que NUNCA vence, então vai para o fim da fila de urgência e
  // não para o começo. Lido como 0, o vitalício aparecia acima de quem vence
  // amanhã — o oposto do que esta ordem existe para mostrar.
  const vencimento = (a) => a.expiraEm || Infinity;
  lista.sort((a, b) => {
    const d = peso[estadoDaAssinatura(a)] - peso[estadoDaAssinatura(b)];
    if (d !== 0) return d;
    return vencimento(a) - vencimento(b);
  });

  const cartao = (rotulo, valor, nota) => `
    <div class="card admin-num">
      <div class="admin-num-valor">${valor}</div>
      <div class="admin-num-rotulo">${rotulo}</div>
      ${nota ? `<div class="admin-num-nota">${nota}</div>` : ""}
    </div>`;

  const linhas = lista.map((a) => {
    const est = estadoDaAssinatura(a);
    const dias = diasRestantes(a);
    return `<tr data-email="${esc(a.email)}">
      <td class="admin-email">${esc(a.email)}</td>
      <td><span class="admin-status ${est}">${ROTULO_ESTADO[est]}</span></td>
      <td>${esc(a.plano || "—")}</td>
      <td>${a.expiraEm ? esc(new Date(a.expiraEm).toLocaleDateString("pt-BR")) : "sem prazo"}</td>
      <td>${est === "ativa" && dias != null ? dias + " dia(s)" : "—"}</td>
      <td class="admin-acoes-cel">
        <button class="btn btn-ghost admin-btn-mini" data-acao="renovar">+90 dias</button>
        <button class="btn btn-ghost admin-btn-mini" data-acao="alternar">${est === "cancelada" ? "Reativar" : "Cancelar"}</button>
      </td>
    </tr>`;
  }).join("");

  const contas = dados.usuarios.length;

  alvo.innerHTML = `
    <h2>Assinaturas</h2>
    <p class="hint">Quem tem documento aqui entra no app; quem não tem, vê a tela de assinatura.
    Enquanto o portão estiver desligado (<code>PORTAO_ATIVO = false</code> em
    <code>assinatura.js</code>), isto não bloqueia ninguém — dá pra cadastrar tudo com calma
    antes de virar a chave.</p>

    <div class="admin-nums">
      ${cartao("Ativas", ativas)}
      ${cartao("Vencem em 7 dias", vencendo)}
      ${cartao("Vencidas", vencidas)}
      ${cartao("Canceladas", canceladas)}
    </div>

    <div class="card admin-liberar">
      <h3>Liberar acesso</h3>
      <p class="lesson-desc">Um e-mail por linha (também aceita vírgula ou ponto-e-vírgula).
      Tem que ser o e-mail da <strong>conta Google</strong> com que a pessoa entra — se ela pagou
      com outro, é o do login que vale. Cadastrar de novo alguém que já tem acesso
      <strong>soma</strong> o prazo ao que ainda resta.</p>
      <textarea id="lib-emails" class="admin-textarea" rows="5"
        placeholder="marina@gmail.com&#10;joao.silva@hotmail.com"></textarea>
      <div class="admin-liberar-linha">
        <select id="lib-duracao" class="admin-select">
          <option value="90">90 dias (o ciclo do plano)</option>
          <option value="30">30 dias</option>
          <option value="180">180 dias</option>
          <option value="365">1 ano</option>
          <option value="3650">Vitalício (10 anos)</option>
        </select>
        <button id="btn-liberar" class="btn btn-primary admin-btn-inline">Liberar</button>
      </div>
      <p id="lib-resultado" class="admin-resultado" hidden></p>
      <p class="login-note">Os e-mails de quem já usa o app estão no Console do Firebase &gt;
      Authentication &gt; Users. O painel não consegue listá-los daqui: o SDK do navegador não
      enumera contas do Auth, só o Admin SDK — por isso o passo é copiar de lá e colar aqui.
      Hoje há <strong>${contas}</strong> conta(s) no app e <strong>${lista.length}</strong>
      assinatura(s) cadastrada(s).</p>
    </div>

    ${lista.length ? `
    <h3>Cadastradas</h3>
    <div class="admin-tabela-wrap">
      <table class="admin-tabela">
        <thead><tr>
          <th>E-mail</th><th>Status</th><th>Plano</th><th>Expira</th><th>Restam</th><th></th>
        </tr></thead>
        <tbody>${linhas}</tbody>
      </table>
    </div>` : `
    <div class="card admin-vazio">
      <h3>Nenhuma assinatura ainda</h3>
      <p class="lesson-desc">Cadastre o primeiro e-mail acima e ele aparece aqui.</p>
    </div>`}`;

  $("btn-liberar").addEventListener("click", liberar);
  alvo.querySelectorAll("tbody tr").forEach((tr) => {
    tr.querySelectorAll("[data-acao]").forEach((btn) => {
      btn.addEventListener("click", () => acaoNaLinha(tr.dataset.email, btn.dataset.acao, btn));
    });
  });
}

function avisoLiberacao(texto, tipo) {
  const p = $("lib-resultado");
  p.textContent = texto;
  p.className = "admin-resultado " + (tipo || "");
  p.hidden = false;
}

async function liberar() {
  const btn = $("btn-liberar");
  const dias = Number($("lib-duracao").value);

  const vistos = new Set();
  const validos = [];
  const invalidos = [];
  $("lib-emails").value.split(/[\n,;]+/).forEach((bruto) => {
    if (!bruto.trim()) return;
    const e = normalizarEmail(bruto);
    if (!e) { invalidos.push(bruto.trim()); return; }
    if (vistos.has(e)) return; // repetido na mesma colagem
    vistos.add(e);
    validos.push(e);
  });

  if (!validos.length) {
    avisoLiberacao(invalidos.length
      ? "Nenhum e-mail válido. Não reconheci: " + invalidos.join(", ")
      : "Cole pelo menos um e-mail.", "erro");
    return;
  }

  const atuais = new Map((dados.assinaturas || []).map((a) => [a.email, a]));
  btn.disabled = true;
  avisoLiberacao("Liberando " + validos.length + "…");

  try {
    for (let i = 0; i < validos.length; i += TAM_LOTE) {
      const lote = writeBatch(db);
      validos.slice(i, i + TAM_LOTE).forEach((email) => {
        const atual = atuais.get(email);
        const restante = atual && estadoDaAssinatura(atual) === "ativa" ? atual.expiraEm : 0;
        lote.set(doc(db, "assinaturas", email), {
          ativa: true,
          plano: dias + " dias",
          expiraEm: novaValidade(dias, restante),
          liberadoEm: Date.now(),
          liberadoPor: (usuarioAtual && usuarioAtual.email) || "painel",
        }, { merge: true });
      });
      await lote.commit();
    }
  } catch (err) {
    btn.disabled = false;
    avisoLiberacao("Não consegui gravar: " + (err.code || err.message), "erro");
    return;
  }

  $("lib-emails").value = "";
  const extra = invalidos.length ? " Ignorei (não parecem e-mail): " + invalidos.join(", ") : "";
  await recarregarAssinaturas();
  avisoLiberacao(validos.length + " liberado(s) por " + dias + " dias." + extra, "ok");
  btn.disabled = false;
}

async function acaoNaLinha(email, acao, btn) {
  const atual = (dados.assinaturas || []).find((a) => a.email === email);
  if (!atual) return;

  btn.disabled = true;
  const rotulo = btn.textContent;
  btn.textContent = "…";

  try {
    if (acao === "renovar") {
      const restante = estadoDaAssinatura(atual) === "ativa" ? atual.expiraEm : 0;
      await setDoc(doc(db, "assinaturas", email), {
        ativa: true,
        expiraEm: novaValidade(90, restante),
        plano: "90 dias",
        liberadoEm: Date.now(),
        liberadoPor: (usuarioAtual && usuarioAtual.email) || "painel",
      }, { merge: true });
    } else {
      // Cancelar não apaga o documento: o histórico de quem já foi assinante
      // vale mais que a linha a menos na tabela, e reativar é um clique.
      const ligando = atual.ativa !== true;
      await setDoc(doc(db, "assinaturas", email), {
        ativa: ligando,
        canceladoEm: ligando ? null : Date.now(),
        liberadoPor: (usuarioAtual && usuarioAtual.email) || "painel",
      }, { merge: true });
    }
    await recarregarAssinaturas();
  } catch (err) {
    btn.disabled = false;
    btn.textContent = rotulo;
    console.warn("[admin] falha ao alterar assinatura:", err.code || err.message);
    avisoLiberacao("Não consegui alterar " + email + ": " + (err.code || err.message), "erro");
  }
}

// Relê só a coleção que mudou e redesenha a aba. Recarregar tudo puxaria de
// novo os relatos e o progresso de todas as contas — muito tráfego para
// atualizar uma linha de tabela.
async function recarregarAssinaturas() {
  try {
    const snap = await getDocs(collection(db, "assinaturas"));
    const novas = [];
    snap.forEach((d) => novas.push(Object.assign({ email: d.id }, d.data())));
    dados.assinaturas = novas;
    dados.assinaturasErro = null;
  } catch (err) {
    dados.assinaturasErro = err.code || err.message;
  }
  renderAssinaturas();
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

    match /assinaturas/{email} {
      allow read: if request.auth != null
                  && request.auth.token.email != null
                  && request.auth.token.email_verified == true
                  && request.auth.token.email.lower() == email;
      allow read, write: if isAdmin();
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
  usuarioAtual = user;
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
  renderAssinaturas();
  renderRelatos();
  renderUso();
  renderFrentes();
  renderQuestoes();
}

// Exposto pra verificação: injeta dados e renderiza as cinco abas sem tocar
// na rede, permitindo conferir os cálculos com casos conhecidos.
window.VD_ADMIN = {
  _renderComDados(d) {
    dados = Object.assign({ assinaturas: [], assinaturasErro: null }, d);
    $("view-login").hidden = true;
    $("view-bootstrap").hidden = true;
    $("view-panel").hidden = false;
    $("admin-carregando").hidden = true;
    renderAssinaturas();
    renderRelatos();
    renderUso();
    renderFrentes();
    renderQuestoes();
  },
  _sequenciaDe: sequenciaDe,
  _estadoDaAssinatura: estadoDaAssinatura,
  _novaValidade: novaValidade,
  _normalizarEmail: normalizarEmail,
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
