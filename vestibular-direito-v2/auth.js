// Login com Google (Firebase Auth) — v2.
//
// Este arquivo é a porta de entrada do app: enquanto não houver um usuário
// logado, só a tela de login aparece. Quando o Firebase confirma o usuário,
// chamamos window.VD_BOOT() (definido em app.js) pra subir o plano de estudos.
//
// A configuração abaixo é a MESMA do projeto Firebase já usado pelo v1
// (app-fgv-insper). Essas chaves são públicas por design do Firebase — quem
// protege os dados são as regras do Firestore e o Auth, não o segredo da chave.
//
// Antes de funcionar, o provedor Google precisa estar ligado no console:
//   Firebase Console > Authentication > Sign-in method > Google > Ativar
//   Firebase Console > Authentication > Settings > Authorized domains
//     -> incluir "ptorneri.github.io" (e "localhost" pra testar na sua máquina)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDR63dF7wg4GuLzdy8CGSrsQ4iqP746sWU",
  authDomain: "app-fgv-insper.firebaseapp.com",
  projectId: "app-fgv-insper",
  storageBucket: "app-fgv-insper.firebasestorage.app",
  messagingSenderId: "839136778312",
  appId: "1:839136778312:web:51410c2af78abefa7de07d",
  measurementId: "G-TND3FJDK2F",
};

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const viewLogin = document.getElementById("view-login");
const viewOnboarding = document.getElementById("view-onboarding");
const viewMain = document.getElementById("view-main");
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
    await signOut(auth);
    // Recarrega pra limpar o estado do plano na memória e voltar ao login
    // sem sobras da sessão anterior.
    location.reload();
  } catch (err) {
    alert("Não consegui sair agora. Tente novamente.");
  }
}

function showLoggedIn(user) {
  window.VD_AUTH.user = user;

  userName.textContent = user.displayName || user.email || "Minha conta";
  if (user.photoURL) {
    userAvatar.src = user.photoURL;
    userAvatar.hidden = false;
  } else {
    userAvatar.hidden = true;
  }
  userChip.hidden = false;

  viewLogin.hidden = true;
  viewOnboarding.hidden = false;

  window.VD_BOOT();
}

function showLoggedOut() {
  window.VD_AUTH.user = null;
  viewLogin.hidden = false;
  viewOnboarding.hidden = true;
  viewMain.hidden = true;
  userChip.hidden = true;
  setLoading(false);
}

btnLogin.addEventListener("click", login);
btnLogout.addEventListener("click", logout);

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
