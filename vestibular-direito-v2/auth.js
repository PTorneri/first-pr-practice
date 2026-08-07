// Login com Google (Firebase Auth) — v2.
//
// Este arquivo é a porta de entrada do app: enquanto não houver um usuário
// logado, só a tela de login aparece. Quando o Firebase confirma o usuário,
// chamamos window.VD_BOOT() (definido em app.js) pra subir o plano de estudos.
//
// A configuração do Firebase fica em firebase-init.js, compartilhada com o
// sync.js (o mesmo app Firebase serve o login e o progresso na nuvem).
//
// Antes de funcionar, o provedor Google precisa estar ligado no console:
//   Firebase Console > Authentication > Sign-in method > Google > Ativar
//   Firebase Console > Authentication > Settings > Authorized domains
//     -> incluir "ptorneri.github.io" (e "localhost" pra testar na sua máquina)

import { auth } from "./firebase-init.js?v=14";
import "./sync.js?v=14"; // define window.VD_SYNC
import "./feedback.js?v=14"; // define window.VD_FEEDBACK
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

const viewLogin = document.getElementById("view-login");
const viewOnboarding = document.getElementById("view-onboarding");
const viewMain = document.getElementById("view-main");
const viewSyncError = document.getElementById("view-sync-error");
const viewEscolhaTrilha = document.getElementById("view-escolha-trilha");
const btnLogin = document.getElementById("btn-login-google");
const btnLogout = document.getElementById("btn-logout");
const errorBox = document.getElementById("login-error");
const userChip = document.getElementById("user-chip");
const userAvatar = document.getElementById("user-avatar");
const userName = document.getElementById("user-name");

// Guarda quem está logado pra que o resto do app (sync, correção por IA,
// ofensiva) possa perguntar sem precisar reimportar o Firebase.
window.VD_AUTH = { user: null, auth: auth };

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.hidden = false;
}

function clearError() {
  errorBox.hidden = true;
  errorBox.textContent = "";
}

function setLoading(isLoading) {
  btnLogin.disabled = isLoading;
  btnLogin.classList.toggle("is-loading", isLoading);
}

// Mensagens em português para os erros que o usuário pode realmente encontrar.
function friendlyError(err) {
  const code = err && err.code ? err.code : "";
  switch (code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Login cancelado. Clique em “Entrar com Google” pra tentar de novo.";
    case "auth/popup-blocked":
      return "Seu navegador bloqueou a janela de login. Vamos tentar de outro jeito…";
    case "auth/network-request-failed":
      return "Sem conexão com a internet. Verifique sua rede e tente de novo.";
    case "auth/unauthorized-domain":
      return "Este endereço ainda não está liberado no Firebase (Authentication > Settings > Authorized domains).";
    case "auth/operation-not-allowed":
      return "O login com Google ainda não foi ativado no Firebase (Authentication > Sign-in method).";
    default:
      return "Não consegui entrar agora" + (code ? " (" + code + ")" : "") + ". Tente novamente em instantes.";
  }
}

async function login() {
  clearError();
  setLoading(true);
  try {
    await signInWithPopup(auth, provider);
    // onAuthStateChanged assume daqui: é ele quem troca de tela.
  } catch (err) {
    if (err && err.code === "auth/popup-blocked") {
      // Popup bloqueado (comum em celular): cai pro fluxo de redirecionamento.
      showError(friendlyError(err));
      try {
        await signInWithRedirect(auth, provider);
        return;
      } catch (redirectErr) {
        showError(friendlyError(redirectErr));
      }
    } else {
      showError(friendlyError(err));
    }
    setLoading(false);
  }
}

async function logout() {
  try {
    // Sobe o que estiver pendente antes de encerrar a sessão, pra não perder
    // os últimos minutos de estudo.
    if (window.VD_SYNC) {
      await window.VD_SYNC.pushNow();
      window.VD_SYNC.stop();
    }
    await signOut(auth);
    // Recarrega pra limpar o estado do plano na memória e voltar ao login
    // sem sobras da sessão anterior.
    location.reload();
  } catch (err) {
    alert("Não consegui sair agora. Tente novamente.");
  }
}

async function showLoggedIn(user) {
  window.VD_AUTH.user = user;

  userName.textContent = user.displayName || user.email || "Minha conta";
  if (user.photoURL) {
    userAvatar.src = user.photoURL;
    userAvatar.hidden = false;
  } else {
    userAvatar.hidden = true;
  }
  userChip.hidden = false;

  // Baixa e mescla o progresso da conta ANTES de montar o plano — é isso que
  // faz "retomar de onde parou" valer em qualquer aparelho.
  //
  // Se a leitura falhar, o app NÃO pode subir. Antes ele subia assim mesmo, e
  // num aparelho novo isso mostrava a tela de "Começar meu plano hoje": a
  // pessoa criava uma data de início nova, que virava "Dia 1" e depois
  // sobrescrevia na nuvem o plano real. Melhor não abrir do que abrir mentindo.
  let resultado = { ok: false };
  try {
    resultado = await window.VD_SYNC.start(user);
  } catch (err) {
    console.warn("[auth] sync não pôde iniciar:", err);
  }

  if (!resultado.ok) {
    mostrarFalhaDeSync();
    return;
  }

  // A trilha só pode ser lida DEPOIS do sync. Quem já escolheu Medicina no
  // celular tem essa escolha guardada na conta, não neste aparelho — perguntar
  // antes de baixar faria a pessoa escolher de novo, e escolher diferente
  // abriria um plano vazio por cima de um plano que existe.
  const trilha = window.VD_TRILHA.atual();

  if (!trilha) {
    mostrarEscolhaDeTrilha();
    return;
  }

  await abrirTrilha(trilha);
}

// Carrega os dados da trilha e sobe o app.
async function abrirTrilha(trilha) {
  try {
    await window.VD_TRILHA.carregar(trilha);
  } catch (err) {
    // Sem os dados não há plano. Falhar aqui é melhor do que abrir um app com
    // dias vazios, que pareceria progresso perdido.
    console.warn("[auth] falha ao carregar a trilha:", err);
    mostrarFalhaDeSync();
    return;
  }

  viewLogin.hidden = true;
  viewSyncError.hidden = true;
  viewEscolhaTrilha.hidden = true;
  viewOnboarding.hidden = false;

  window.VD_BOOT();
}

// Tela de escolha do curso — só para quem ainda não tem trilha na conta.
function mostrarEscolhaDeTrilha() {
  viewLogin.hidden = true;
  viewSyncError.hidden = true;
  viewOnboarding.hidden = true;
  viewMain.hidden = true;
  viewEscolhaTrilha.hidden = false;

  const container = document.getElementById("trilha-cards");
  container.innerHTML = "";

  window.VD_TRILHA.lista().forEach((cfg) => {
    const card = document.createElement("button");
    card.className = "trilha-card";
    card.type = "button";
    card.innerHTML =
      '<span class="trilha-card-nome">' + cfg.nome + "</span>" +
      '<span class="trilha-card-bancas">' + cfg.subtitulo + "</span>" +
      '<span class="trilha-card-resumo">' + cfg.resumo + "</span>";
    card.addEventListener("click", () => escolherTrilha(cfg.id, container));
    container.appendChild(card);
  });
}

async function escolherTrilha(id, container) {
  const erro = document.getElementById("trilha-erro");
  erro.hidden = true;
  container.querySelectorAll(".trilha-card").forEach((b) => (b.disabled = true));

  if (!window.VD_TRILHA.definir(id)) {
    erro.textContent = "Não reconheci essa trilha. Recarregue a página e tente de novo.";
    erro.hidden = false;
    container.querySelectorAll(".trilha-card").forEach((b) => (b.disabled = false));
    return;
  }

  // Sobe a escolha antes de recarregar. Se a pessoa fechar o app agora, a
  // trilha já está na conta e ela não será perguntada de novo.
  try {
    await window.VD_SYNC.pushNow();
  } catch (e) {
    /* o reload abaixo tenta de novo pelo caminho normal */
  }

  // Recarrega em vez de seguir na mesma página: o app.js já calculou o prefixo
  // do localStorage quando carregou, com o padrão "dir_". Continuar daqui
  // gravaria o progresso de Medicina dentro do espaço de Direito. O reload é a
  // forma barata e segura de refazer esse cálculo — e é o mesmo caminho usado
  // na troca de trilha.
  location.reload();
}

// Tela de bloqueio: não conseguimos ler o progresso da conta. Só oferece tentar
// de novo ou sair — nada que crie estado novo por cima do que está na nuvem.
function mostrarFalhaDeSync() {
  viewLogin.hidden = true;
  viewOnboarding.hidden = true;
  viewMain.hidden = true;
  viewEscolhaTrilha.hidden = true;
  viewSyncError.hidden = false;
  userChip.hidden = true;
}

function showLoggedOut() {
  window.VD_AUTH.user = null;
  viewLogin.hidden = false;
  viewOnboarding.hidden = true;
  viewMain.hidden = true;
  viewSyncError.hidden = true;
  viewEscolhaTrilha.hidden = true;
  userChip.hidden = true;
  setLoading(false);
}

btnLogin.addEventListener("click", login);
btnLogout.addEventListener("click", logout);
document.getElementById("btn-tentar-sync").addEventListener("click", () => location.reload());
document.getElementById("btn-sair-sync").addEventListener("click", logout);

// Mantém a sessão entre visitas: quem já entrou uma vez não precisa
// logar de novo a cada vez que abre o app.
setPersistence(auth, browserLocalPersistence).catch(() => {
  /* se o navegador bloquear, o Firebase cai pro padrão de sessão */
});

// Colhe o resultado do fluxo de redirecionamento (celular / popup bloqueado).
getRedirectResult(auth).catch((err) => {
  if (err && err.code) showError(friendlyError(err));
});

// Fonte única da verdade sobre "tem alguém logado?". Roda no carregamento
// da página e sempre que o login/logout acontece.
onAuthStateChanged(auth, (user) => {
  if (user) showLoggedIn(user);
  else showLoggedOut();
});
