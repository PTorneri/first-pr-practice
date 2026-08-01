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
  authDomain: "app-fgv-insper.firebaseapp.com",
  projectId: "app-fgv-insper",
  storageBucket: "app-fgv-insper.firebasestorage.app",
  messagingSenderId: "839136778312",
  appId: "1:839136778312:web:51410c2af78abefa7de07d",
  measurementId: "G-TND3FJDK2F",
};

export const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const db = getFirestore(app);
