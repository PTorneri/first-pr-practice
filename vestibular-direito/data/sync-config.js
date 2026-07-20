// Achado 10 (sincronização entre aparelhos), via Firebase Firestore — só
// pelo lado do cliente, sem servidor/Node/build necessário. Enquanto
// FIREBASE_CONFIG for null, o app funciona 100% offline/local como sempre
// funcionou (nada quebra); a sincronização entre aparelhos só liga quando
// esse objeto é preenchido.
//
// Como ativar (leva ~5 minutos, é grátis):
// 1. Crie um projeto em https://console.firebase.google.com (só o dono do
//    app consegue criar essa conta — não é algo que outra pessoa faça por
//    você).
// 2. No menu lateral, ative "Firestore Database" > "Criar banco de dados"
//    (modo produção).
// 3. Em Firestore > Regras, cole:
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /syncCodes/{code} {
//          allow read, write: if code.size() >= 8;
//        }
//      }
//    }
//
//    (o "código" de 8 caracteres funciona como senha — só quem tem o código
//    exato consegue ler/escrever aquele documento específico; não existe
//    login de usuário nesse modelo, o mesmo esquema usado pelo concorrente
//    analisado em analise-app-concorrente.pdf.)
// 4. Em "Configurações do projeto" (ícone de engrenagem) > "Seus apps" >
//    ícone "</>" (Web) > registre um app > copie o objeto `firebaseConfig`
//    mostrado na tela.
// 5. Cole esse objeto no lugar do `null` abaixo (as chaves aqui são
//    públicas por design do Firebase — não são segredo, tudo bem deixá-las
//    neste arquivo).
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDR63dF7wg4GuLzdy8CGSrsQ4iqP746sWU",
  authDomain: "app-fgv-insper.firebaseapp.com",
  projectId: "app-fgv-insper",
  storageBucket: "app-fgv-insper.firebasestorage.app",
  messagingSenderId: "839136778312",
  appId: "1:839136778312:web:51410c2af78abefa7de07d",
  measurementId: "G-TND3FJDK2F"
};

// Exemplo do formato esperado (não funcional, só ilustrativo):
// window.FIREBASE_CONFIG = {
//   apiKey: "AIzaSy...",
//   authDomain: "seu-projeto.firebaseapp.com",
//   projectId: "seu-projeto",
//   storageBucket: "seu-projeto.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "1:123456789:web:abcdef123456"
// };
