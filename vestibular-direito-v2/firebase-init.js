// Inicialização do Firebase, num lugar só.
//
// auth.js (login) e sync.js (progresso na nuvem) precisam do MESMO app
// Firebase — inicializar duas vezes daria erro. Os dois importam daqui.
//
// Estas chaves são públicas por design do Firebase: elas apenas identificam
// o projeto. Quem protege os dados são as regras do Firestore (cada usuário
// só enxerga o próprio documento) e o Auth — não o segredo da chave.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDR63dF7wg4GuLzdy8CGSrsQ4iqP746sWU",

  // Domínio próprio, e NÃO o app-fgv-insper.firebaseapp.com que o console
  // entrega. É este valor que o popup do Google mostra para quem entra ("para
  // continuar em ..."), e ele era o último lugar onde as bancas apareciam com
  // nome, depois de a marca virar sagax.
  //
  // O ID de projeto do Firebase é imutável, então renomear o projeto não era
  // opção; um projeto novo exigiria exportar e importar os usuários para
  // preservar UID (UID é por projeto) e deixaria todo users/{uid} órfão se
  // falhasse. Trocar o authDomain não migra dado nenhum.
  //
  // conta.sagaxedu.com.br é um site do Firebase Hosting que existe só para
  // servir /__/auth/handler — o app mora no GitHub Pages, em sagaxedu.com.br
  // (ver o firebase.json na raiz do repo).
  //
  // Efeito colateral bom: navegador particiona armazenamento de terceiros por
  // SITE (eTLD+1), não por origem. Como o app e o handler são subdomínios do
  // mesmo sagaxedu.com.br, o signInWithRedirect — o fallback de auth.js para
  // popup bloqueado, comum no celular — deixa de ser caso de terceiros.
  //
  // Ao mexer aqui: o subdomínio precisa estar nos Authorized domains do Auth e
  // o /__/auth/handler dele precisa estar nos redirect URIs do cliente OAuth,
  // no Google Cloud. Sem o segundo, o Google recusa com redirect_uri_mismatch.
  authDomain: "conta.sagaxedu.com.br",

  projectId: "app-fgv-insper",
  storageBucket: "app-fgv-insper.firebasestorage.app",
  messagingSenderId: "839136778312",
  appId: "1:839136778312:web:51410c2af78abefa7de07d",
  measurementId: "G-TND3FJDK2F",
};

export const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const db = getFirestore(app);
