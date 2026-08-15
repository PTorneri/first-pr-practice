// Feedback direto: "achei um problema nesta questão" (v2).
//
// Por que isso existe: o banco tem 1800 questões originais. Erros de gabarito,
// enunciado ambíguo ou digitação são inevitáveis nesse volume, e hoje não há
// como quem estuda avisar — o erro simplesmente fica lá, ensinando errado.
//
// Cada relato vai pro Firestore com o contexto que torna o conserto possível
// sem precisar perguntar nada de volta: qual questão, de qual frente, o que o
// app considera correto e o que a pessoa respondeu.
//
// Onde ler os relatos: Firebase Console > Firestore Database > coleção
// "feedback", mais recentes primeiro (campo createdAt).

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
import { db } from "./firebase-init.js?v=51";

// Guarda o que já foi enviado nesta sessão pra evitar relato duplicado por
// clique repetido. Não persiste: relatar de novo amanhã é legítimo.
const enviados = new Set();

async function report(payload) {
  const user = window.VD_AUTH && window.VD_AUTH.user;
  if (!user) throw new Error("sem-usuario");

  const chave = payload.subtopicId + "::" + payload.questionId + "::" + payload.tipo;
  if (enviados.has(chave)) return { jaEnviado: true };

  await addDoc(collection(db, "feedback"), {
    uid: user.uid,
    questionId: payload.questionId || null,
    subtopicId: payload.subtopicId || null,
    dia: payload.dia == null ? null : payload.dia,
    tipo: payload.tipo,
    comentario: (payload.comentario || "").slice(0, 1000),
    // Contexto pra você conseguir julgar o relato sem abrir o app:
    enunciado: (payload.enunciado || "").slice(0, 300),
    gabaritoDoApp: payload.gabaritoDoApp || null,
    respostaDaPessoa: payload.respostaDaPessoa || null,
    createdAt: Date.now(),
    app: "v2",
  });

  enviados.add(chave);
  return { jaEnviado: false };
}

window.VD_FEEDBACK = { report: report };
