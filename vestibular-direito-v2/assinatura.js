// O portão: quem pode abrir o app (v2).
//
// Este arquivo responde uma pergunta só — "esta pessoa entra?" — e não sabe
// nada sobre pagamento. Quem cobra é a plataforma de checkout; quem registra
// que o pagamento existiu é o webhook (ou você, pelo painel). Aqui só se lê o
// veredito. Essa separação é de propósito: trocar de Cakto para Asaas, ou
// liberar alguém na mão, não deve tocar em uma linha de app.
//
// ---------- Onde mora a verdade ----------
//
// Em /assinaturas/{email}, no Firestore, com as regras de firestore.rules:
// a pessoa LÊ o próprio documento e não escreve nenhum. É o único ponto deste
// app com trava de verdade, porque é o único que roda no servidor do Google e
// não no navegador de quem está sendo barrado.
//
// A chave é o e-mail em minúsculas, e não o uid, porque o checkout sabe o
// e-mail e não sabe o uid — o uid só nasce no primeiro login. O porquê completo
// está no comentário da regra.
//
// ---------- O que este portão NÃO faz ----------
//
// Ele não esconde o conteúdo. Não tem como: o app é estático no GitHub Pages,
// o repositório é público, e as 1.800 questões estão em data/bundle.js, que
// qualquer um baixa sem login. Quem quiser o JSON pega o JSON.
//
// O que se vende aqui é a CONTA — o cronograma montado, o progresso na nuvem
// em qualquer aparelho, a ofensiva, a correção por IA. Isso não dá pra copiar
// junto com o arquivo, e é onde o portão morde de verdade.
//
// ---------- A chave de liga/desliga ----------
//
// PORTAO_ATIVO começa em false, e tem que começar. Todo push na main vai ao ar
// sozinho (GitHub Pages): subir isto ligado, antes de existir um documento de
// assinatura para cada pessoa que já usa o app, tranca todo mundo do lado de
// fora no mesmo minuto — inclusive você.
//
// Para conferir o que o portão DECIDIRIA sem bloquear ninguém, entre no app
// normalmente e rode no console:
//
//     await VD_ASSINATURA.diagnostico()
//
// Ele faz a leitura de verdade, com a sua conta, contra as regras publicadas, e
// devolve o veredito. É o ensaio antes de virar a chave.
//
// ANTES DE LIGAR:
//   1. Publicar as regras do firestore.rules no console (o arquivo é só a
//      referência; quem vale é o que está publicado).
//   2. Criar /assinaturas/{email} para todo mundo que já usa o app hoje — a
//      lista de e-mails está em Authentication > Users. Sem isso, quem estuda
//      há semanas perde o acesso sem ter feito nada.
//   3. Ter o checkout no ar e a URL preenchida em CHECKOUT, aqui embaixo.

import { db } from "./firebase-init.js?v=35";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const PORTAO_ATIVO = false;

// Para onde vai o botão "Assinar". Enquanto estiver vazio, a tela do portão
// mostra o recado de que a assinatura ainda não abriu, em vez de um botão que
// não leva a lugar nenhum — um link quebrado nesta tela é pior que botão
// nenhum, porque é aqui que a pessoa está tentando te pagar.
const CHECKOUT = {
  url: "",
  rotulo: "Assinar — R$ 97 por 90 dias",
};

// ---------- A graça do offline ----------
//
// O app é feito para funcionar sem rede: o localStorage é a fonte que ele lê e
// escreve, e a nuvem é espelho. Um portão que exige rede a cada abertura quebra
// essa propriedade — quem assinou perderia o app no metrô, no ônibus, na casa
// com wi-fi ruim, exatamente nos lugares onde se estuda no celular.
//
// Então o veredito bem-sucedido fica guardado aqui, e vale por alguns dias
// quando a leitura falha. Note a assimetria, que é o ponto: só veredito
// POSITIVO é honrado offline. Quem nunca teve acesso não tem cache dizendo que
// tem, e cair a rede não vira porta dos fundos.
//
// Sete dias é o limite de quanto tempo alguém que cancelou continua entrando
// com a rede desligada. Menos que isso e uma viagem de uma semana já barra
// quem pagou.
const GRACA_OFFLINE_DIAS = 7;
const CHAVE_CACHE = "v2_assinatura_veredito";

function lerCache(email) {
  try {
    const bruto = localStorage.getItem(CHAVE_CACHE);
    if (!bruto) return null;
    const c = JSON.parse(bruto);
    // O e-mail entra na comparação porque um navegador é compartilhado: sem
    // isso, o veredito da conta do irmão liberaria a sua.
    if (!c || c.email !== email) return null;
    return c;
  } catch (e) {
    return null;
  }
}

function gravarCache(email, veredito) {
  try {
    localStorage.setItem(CHAVE_CACHE, JSON.stringify({
      email: email,
      entra: veredito.entra,
      expiraEm: veredito.expiraEm || 0,
      plano: veredito.plano || "",
      lidoEm: Date.now(),
    }));
  } catch (e) {
    /* navegador sem localStorage: o portão só perde o modo offline */
  }
}

// ---------- Leitura do documento ----------

// expiraEm pode chegar de três formas, porque três coisas diferentes escrevem
// esse campo: o webhook (número em milissegundos), o console do Firebase
// (Timestamp nativo, se você escolher o tipo na mãozinha) e um script seu
// qualquer (texto ISO). Aceitar as três aqui custa seis linhas e evita a classe
// de bug em que o acesso é negado porque o campo virou string.
function paraMillis(v) {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v.toMillis === "function") return v.toMillis();
  if (typeof v === "string") {
    const t = Date.parse(v);
    return isNaN(t) ? 0 : t;
  }
  return 0;
}

// Traduz o documento em veredito. `ativa` é exigido explicitamente, e não
// deduzido da existência do documento: assim dá pra revogar um acesso sem
// apagar o histórico, e um documento criado por engano não libera ninguém.
function julgar(dados) {
  if (!dados) return { entra: false, estado: "ausente" };

  const expiraEm = paraMillis(dados.expiraEm);
  const plano = dados.plano || "";

  if (dados.ativa !== true) {
    return { entra: false, estado: "cancelada", expiraEm: expiraEm, plano: plano };
  }
  if (expiraEm && expiraEm <= Date.now()) {
    return { entra: false, estado: "expirada", expiraEm: expiraEm, plano: plano };
  }
  return { entra: true, estado: "ativa", expiraEm: expiraEm, plano: plano };
}

async function consultar(email) {
  const snap = await getDoc(doc(db, "assinaturas", email));
  return julgar(snap.exists() ? snap.data() : null);
}

// ---------- A pergunta que o auth.js faz ----------

// Sempre devolve um veredito — nunca lança. Um erro não tratado aqui deixaria
// o app pendurado na tela em branco depois do login, que é o pior desfecho
// possível: nem entra, nem explica.
async function verificar(user) {
  if (!PORTAO_ATIVO) return { entra: true, estado: "portao-desligado" };

  const email = (user && user.email ? user.email : "").toLowerCase().trim();

  // Sem e-mail não há como cruzar com o pagamento. Não acontece com o Google
  // (ele sempre entrega), mas o veredito precisa existir para todo caminho.
  if (!email) return { entra: false, estado: "sem-email", email: "" };

  try {
    const v = await consultar(email);
    gravarCache(email, v);
    return Object.assign({ email: email }, v);
  } catch (err) {
    console.warn("[assinatura] não consegui ler o acesso:", err.code || err.message);

    const c = lerCache(email);
    const dentroDaGraca = c &&
      c.entra &&
      Date.now() - c.lidoEm < GRACA_OFFLINE_DIAS * 86400000 &&
      (!c.expiraEm || c.expiraEm > Date.now());

    if (dentroDaGraca) {
      return { entra: true, estado: "graca", email: email, expiraEm: c.expiraEm, plano: c.plano };
    }
    return { entra: false, estado: "offline", email: email };
  }
}

// O ensaio: mesma leitura, mesmas regras, sem bloquear nada. Serve para virar a
// chave sabendo o que vai acontecer, e para responder "por que fulano não
// entra?" sem abrir o console do Firebase.
async function diagnostico() {
  const user = window.VD_AUTH && window.VD_AUTH.user;
  if (!user) return { erro: "ninguém logado" };

  const email = (user.email || "").toLowerCase().trim();
  const saida = { email: email, portaoAtivo: PORTAO_ATIVO };

  try {
    const v = await consultar(email);
    saida.veredito = v;
    saida.entraria = v.entra;
  } catch (err) {
    saida.erro = err.code || err.message;
    saida.entraria = false;
  }

  console.table(saida);
  return saida;
}

window.VD_ASSINATURA = {
  verificar: verificar,
  diagnostico: diagnostico,
  checkout: CHECKOUT,
  ativo: PORTAO_ATIVO,
};
