// Inicialização do Firebase, num lugar só.
//
// auth.js (login) e sync.js (progresso na nuvem) precisam do MESMO app
// Firebase — inicializar duas vezes daria erro. Os dois importam daqui.
//
// Estas chaves são públicas por design do Firebase: elas apenas identificam
// o projeto. Quem protege os dados são as regras do Firestore (cada usuário
// só enxerga o próprio documento) e o Auth — não o segredo da chave.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app-check.js";

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

// ---------- App Check ----------
//
// O App Check prova que quem está chamando é o NOSSO app, e não um script
// qualquer com a config copiada da página. Isso não importava enquanto o
// Firebase só guardava progresso (as regras do Firestore já barram quem tenta
// ler o documento alheio), mas a correção por IA é diferente: ela gasta cota
// de um recurso pago-por-uso, e cota é do projeto inteiro — quem abusar tira
// de todo mundo ao mesmo tempo. Por isso o Google torna o App Check
// OBRIGATÓRIO para o AI Logic a partir de 02/11/2026.
//
// A chave abaixo é do reCAPTCHA v3 (não o Enterprise): é o provedor que não
// exige faturamento, na mesma linha da decisão de usar o Gemini pelo plano
// gratuito. Ela é pública por design, como a apiKey acima — o segredo do
// reCAPTCHA fica no console do Firebase, nunca aqui.
//
// COMO PREENCHER:
//   1. google.com/recaptcha/admin > criar chave v3, com os domínios
//      sagaxedu.com.br, www.sagaxedu.com.br, ptorneri.github.io e localhost.
//   2. Firebase Console > App Check > registrar o app web com a chave secreta.
//   3. Colar a SITE KEY aqui embaixo.
//
// IMPOSIÇÃO: ligue apenas no AI Logic. Impor no Firestore derrubaria o sync de
// quem ainda estiver com a versão antiga do app em cache — o navegador guarda
// os arquivos por até 10 minutos, e nesse intervalo as duas versões convivem.
const RECAPTCHA_SITE_KEY = "6Lcws30tAAAAAGuZtuBYNT4NCuhNEVQeYqcJ5muM";

// Enquanto a chave não existe, o app inteiro continua funcionando: login, sync
// e relato de questão nunca dependeram do App Check. Só a correção por IA fica
// de fora, e ia.js sabe dizer isso em português em vez de deixar o Google
// responder com um 403 cru.
export const appCheckPronto = Boolean(RECAPTCHA_SITE_KEY);

if (appCheckPronto) {
  // Em localhost não há como o reCAPTCHA atestar nada, então o SDK imprime um
  // token de depuração no console; registre-o em App Check > Gerenciar tokens
  // de depuração e a máquina passa a ser aceita. O token vale só para este
  // navegador — não é segredo compartilhado, e não vai para produção porque
  // esta linha só roda em localhost.
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}
