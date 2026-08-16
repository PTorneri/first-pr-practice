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
//     -> incluir "sagaxedu.com.br" e "www.sagaxedu.com.br", que é onde o app
//        mora; mais "ptorneri.github.io" (endereço antigo, ainda no ar) e
//        "localhost" pra testar na sua máquina. Essa lista é sobre a origem de
//        ONDE o login parte — sem o domínio nela, dá auth/unauthorized-domain.
//   Google Cloud Console > APIs e serviços > Credenciais > cliente OAuth Web
//     -> incluir "https://conta.sagaxedu.com.br/__/auth/handler" nos redirect
//        URIs. Esse é sobre PARA ONDE o Google devolve, e é o authDomain de
//        firebase-init.js. Sem ele, o Google recusa com redirect_uri_mismatch.

import { auth } from "./firebase-init.js?v=55";
import "./sync.js?v=55"; // define window.VD_SYNC
import "./feedback.js?v=55"; // define window.VD_FEEDBACK
import "./ia.js?v=55"; // define window.VD_IA (correção das dissertativas e redações)
import "./assinatura.js?v=55"; // define window.VD_ASSINATURA (o portão)
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

const viewLanding = document.getElementById("view-landing");
const viewLogin = document.getElementById("view-login");
const viewOnboarding = document.getElementById("view-onboarding");
const viewMain = document.getElementById("view-main");
const viewSyncError = document.getElementById("view-sync-error");
const viewAssinatura = document.getElementById("view-assinatura");
const viewEscolhaTrilha = document.getElementById("view-escolha-trilha");
const btnLogin = document.getElementById("btn-login-google");
const btnLogout = document.getElementById("btn-logout");
const errorBox = document.getElementById("login-error");
const userChip = document.getElementById("user-chip");
const userAvatar = document.getElementById("user-avatar");
const userAvatarFallback = document.getElementById("user-avatar-fallback");
const userName = document.getElementById("user-name");
const userTrilha = document.getElementById("user-trilha");
const btnVoltarLanding = document.getElementById("btn-voltar-landing");

// Guarda quem está logado pra que o resto do app (sync, correção por IA,
// ofensiva) possa perguntar sem precisar reimportar o Firebase.
// _textoDaFaixa vai junto para verificação: é a função que decide o que a
// pessoa lê sobre o próprio acesso, e ela tem casos de véspera que só se
// conferem chamando (mesma ideia dos _ de admin.js).
window.VD_AUTH = { user: null, auth: auth, _textoDaFaixa: textoDaFaixa };

// O veredito do portão de quem entrou. É dele que a faixa de acesso tira o
// que dizer: quantos dias faltam de teste, ou quando a assinatura vence.
let acessoAtual = null;

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
  // O círculo cinza do desenho é o que aparece quando não há foto — não um
  // vazio. Os dois nós existem sempre; só um fica visível.
  if (user.photoURL) {
    userAvatar.src = user.photoURL;
    userAvatar.hidden = false;
    userAvatarFallback.hidden = true;
  } else {
    userAvatar.hidden = true;
    userAvatarFallback.hidden = false;
  }
  userChip.hidden = false;

  // ---------- O portão ----------
  //
  // Antes do sync de propósito, por duas razões. A barata: não faz sentido
  // baixar o progresso de quem não vai abrir o app. A que importa: o sync tem
  // um modo de falha próprio (a tela "não consegui carregar seu progresso"), e
  // empilhar os dois faria alguém sem assinatura ver uma mensagem sobre
  // conexão. Cada bloqueio tem que dizer o seu próprio motivo.
  //
  // Enquanto PORTAO_ATIVO for false em assinatura.js, isto devolve "entra" na
  // hora e sem ir à rede — o caminho existe inteiro, mas não barra ninguém.
  const acesso = await window.VD_ASSINATURA.verificar(user);
  if (!acesso.entra) {
    mostrarPortao(acesso);
    return;
  }
  // Guardado para depois do boot: a faixa de acesso só pode ser montada quando
  // a tela do plano existir, e isso é lá embaixo, no fim de abrirTrilha().
  acessoAtual = acesso;
  // Exposto para o app.js montar a caixa "Minha assinatura" na aba de
  // Perfil, sem precisar reimportar assinatura.js pra isso.
  window.VD_AUTH.acesso = acesso;

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
  // A trilha da URL é REAFIRMADA aqui, e isso não é redundância com o
  // trilhas.js. Lá a gravação acontece antes de o VD_SYNC existir, então ela
  // entra no localStorage sem carimbo de horário — e na mesclagem, onde "vence
  // o mais recente", um carimbo vazio perde para a trilha guardada na conta.
  // Sem esta linha, abrir /economia/ num login que estudava Direito voltaria
  // para Direito assim que o sync terminasse.
  const daUrl = window.VD_TRILHA.daUrl();
  if (daUrl) window.VD_TRILHA.definir(daUrl);

  const trilha = window.VD_TRILHA.atual();

  if (!trilha) {
    mostrarEscolhaDeTrilha();
    return;
  }

  // Entrou por um endereço sem trilha (a landing da raiz) e já tem curso na
  // conta: vai para a pasta dele. Não é só cosmética de URL — o app.js calcula
  // o prefixo do localStorage no carregamento da página, e num aparelho novo,
  // em que a trilha só apareceu agora com o sync, esse cálculo foi feito com o
  // padrão "dir_". Carregar a página do endereço certo é o que alinha os dois.
  //
  // replace() e não assign(): a landing não deve virar uma parada no botão
  // Voltar de quem já tem plano.
  if (trilha !== daUrl) {
    location.replace(window.VD_TRILHA.urlDa(trilha));
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

  if (viewLanding) viewLanding.hidden = true;
  viewLogin.hidden = true;
  viewSyncError.hidden = true;
  viewAssinatura.hidden = true;
  viewEscolhaTrilha.hidden = true;
  viewOnboarding.hidden = false;

  // O pé da barra lateral diz "Marina Alves / Trilha Direito": o CURSO, não a
  // banca. Antes mostrava cfg.subtitulo, que é a lista de bancas — e aí a
  // trilha de Engenharia aparecia no app inteiro como "ITA", que é o nome do
  // vestibular e não o do curso. A lista de bancas continua onde ela informa
  // de fato: no cartão de escolha de trilha e no texto do onboarding.
  const cfg = window.VD_TRILHA.config();
  if (userTrilha && cfg) userTrilha.textContent = cfg.nome ? "Trilha " + cfg.nome : "";

  window.VD_BOOT();
  mostrarFaixaDeAcesso();
}

// ---------- A faixa de acesso, dentro do app ----------
//
// Ela serve a duas conversas, e as duas existem pelo mesmo motivo: ninguém
// pode perder o app de surpresa.
//
//   No teste  — sem a faixa o teste é invisível. A pessoa usaria sete dias
//               achando que o app é assim, e no oitavo bateria num muro que
//               nunca foi anunciado, que é a pior forma possível de pedir
//               dinheiro.
//   Vencendo  — antes disto o aviso não existia de lado nenhum. O painel
//               mostrava a VOCÊ quem ia vencer; a pessoa descobria no muro, no
//               meio de um plano de 90 dias e possivelmente na véspera da
//               prova.
//
// Nos dois casos ela fala do que falta, nunca do que passou.
//
// Fica fora do app.js de propósito. Quem sabe do portão é este arquivo; o
// app.js monta o plano e não precisa aprender sobre assinatura para isso.
function mostrarFaixaDeAcesso() {
  const faixa = document.getElementById("faixa-acesso");
  if (!faixa || !acessoAtual) return;

  const texto = textoDaFaixa(acessoAtual);
  if (!texto) return; // nada a dizer hoje: a faixa nem aparece

  document.getElementById("faixa-acesso-texto").textContent = texto;

  // Quem já é assinante RENOVA; quem está no teste ASSINA. O verbo errado
  // aqui faz o assinante achar que vai pagar duas vezes.
  montarCtasDePlano(
    document.getElementById("faixa-acesso-ctas"),
    acessoAtual.estado === "ativa" ? "Renovar" : "Assinar",
    // faixa-acesso-cta dá o tamanho compacto de faixa; ouro puxa o olho no
    // plano de 90 dias, sobre-navy é o segundo nível numa faixa escura.
    ["btn-ouro faixa-acesso-cta", "btn-sobre-navy faixa-acesso-cta"]
  );

  faixa.hidden = false;
}

// Cria um <a class="btn"> por plano dentro do container, na ordem de
// window.VD_ASSINATURA.planos (90 dias primeiro, mensal depois — a mesma
// ordem em que o preço é anunciado em toda parte). Reaproveitado pela faixa
// e pelo muro porque as duas telas fazem exatamente a mesma pergunta
// ("qual plano?"), só que com botões de cor diferente. Sem URL de checkout
// nenhum plano aparece: um botão que não leva a lugar nenhum é pior que
// botão nenhum, justamente na tela onde a pessoa está tentando pagar.
function montarCtasDePlano(container, verbo, classesPorOrdem) {
  if (!container) return;
  container.innerHTML = "";
  const planos = (window.VD_ASSINATURA && window.VD_ASSINATURA.planos) || [];

  planos.forEach((plano, i) => {
    if (!plano.checkoutUrl) return;
    const a = document.createElement("a");
    a.className = "btn " + (classesPorOrdem[i] || classesPorOrdem[classesPorOrdem.length - 1]);
    a.href = plano.checkoutUrl;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = plano.id === "mensal"
      ? verbo + " — " + plano.valor + "/mês"
      : verbo + " — " + plano.periodo + " por " + plano.valor;
    container.appendChild(a);
  });
}

// Devolve o que a faixa diz hoje, ou "" para não aparecer.
function textoDaFaixa(acesso) {
  if (acesso.estado === "teste") {
    const dias = (acesso.teste && acesso.teste.diasRestantes) || 0;
    // "Último dia" em vez de "falta 1 dia": é a véspera, e nomear a véspera
    // pesa mais do que um número que se lê de passagem.
    return dias <= 1
      ? "Último dia do seu teste grátis."
      : "Teste grátis — faltam " + dias + " dias.";
  }

  if (acesso.estado === "ativa") {
    // Sem prazo (vitalício, cortesia) nunca vence: diasAte devolve Infinity e
    // a comparação abaixo já resolve, sem caso especial.
    const dias = window.VD_ASSINATURA.diasAte(acesso.expiraEm);

    // Longe do fim, a faixa NÃO aparece. Uma tarja permanente dizendo "está
    // tudo certo" vira ruído que se aprende a ignorar — e aí ela não seria
    // vista justamente no dia em que tivesse algo a dizer.
    if (dias > window.VD_ASSINATURA.avisoDias) return "";

    if (dias <= 0) return "Sua assinatura vence hoje.";
    if (dias === 1) return "Sua assinatura vence amanhã.";
    return "Sua assinatura vence em " + dias + " dias.";
  }

  // "graca" cai aqui e fica em silêncio de propósito: é o estado de quem está
  // sem rede, com um veredito guardado. Cobrar renovação de quem talvez só
  // esteja no metrô, a partir de um dado que não pudemos confirmar, seria
  // errado nas duas pontas.
  return "";
}

// Tela de escolha do curso — só para quem ainda não tem trilha na conta.
function mostrarEscolhaDeTrilha() {
  viewLogin.hidden = true;
  viewSyncError.hidden = true;
  viewAssinatura.hidden = true;
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

  // Sobe a escolha antes de sair da página. Se a pessoa fechar o app agora, a
  // trilha já está na conta e ela não será perguntada de novo.
  try {
    await window.VD_SYNC.pushNow();
  } catch (e) {
    /* o boot em /<trilha>/ tenta de novo pelo caminho normal */
  }

  // Vai para /medicina/ em vez de seguir na mesma página: o app.js já calculou
  // o prefixo do localStorage quando carregou, com o padrão "dir_". Continuar
  // daqui gravaria o progresso de Medicina dentro do espaço de Direito.
  // Carregar outra página refaz esse cálculo, e de quebra põe o curso na barra
  // de endereço — é o mesmo caminho usado na troca de trilha.
  window.VD_TRILHA.ir(id);
}

// ---------- A tela do portão ----------
//
// Quatro motivos diferentes trazem alguém até aqui, e eles pedem quatro
// conversas diferentes. Quem nunca assinou precisa saber o que está comprando;
// quem venceu precisa ouvir, antes de qualquer outra coisa, que o progresso não
// foi apagado — é o medo real de quem perdeu acesso a um plano de 90 dias no
// meio. Um texto genérico serviria mal aos dois.
const TEXTOS_PORTAO = {
  // O caso mais comum de todos, e por isso o primeiro: acabaram os 7 dias.
  // A pessoa NÃO é tratada como quem nunca teve nada — ela usou o app, tem
  // progresso guardado, e é disso que a tela fala.
  "teste-acabou": {
    eyebrow: "Teste encerrado",
    titulo: "Seus 7 dias de teste acabaram",
    texto: "Nada foi apagado: as questões que você respondeu, suas redações e o dia em que " +
      "você está no plano continuam guardados na sua conta, e voltam de onde pararam assim " +
      "que você assinar.",
    recheck: "Já paguei — verificar de novo",
    mostrarCta: true,
  },
  ausente: {
    eyebrow: "Acesso",
    titulo: "Falta liberar seu acesso",
    texto: "Sua conta está criada, mas ainda não há uma assinatura ligada a este e-mail. " +
      "Com a assinatura você abre o plano de 90 dias completo, com o progresso salvo na sua " +
      "conta e a correção por IA das dissertativas e redações.",
    recheck: "Já paguei — verificar de novo",
    mostrarCta: true,
  },
  expirada: {
    eyebrow: "Assinatura vencida",
    titulo: "Seu acesso venceu",
    texto: "Nada foi apagado: seu progresso, suas questões resolvidas e suas redações continuam " +
      "guardados na sua conta, e voltam exatamente de onde pararam quando você renovar.",
    recheck: "Já renovei — verificar de novo",
    mostrarCta: true,
  },
  cancelada: {
    eyebrow: "Assinatura cancelada",
    titulo: "Este acesso está cancelado",
    texto: "Seu progresso segue guardado e intacto. Se isto foi engano, use o botão abaixo para " +
      "verificar de novo — e, se continuar assim, responda o e-mail da sua compra que a gente resolve.",
    recheck: "Verificar de novo",
    mostrarCta: true,
  },
  // Sem rede e sem veredito recente em cache. Aqui NÃO se oferece assinatura:
  // a pessoa pode muito bem já ter pago, e mandar pagar de novo quem só está
  // sem sinal seria o pior erro possível desta tela.
  offline: {
    eyebrow: "Sem conexão",
    titulo: "Não consegui confirmar seu acesso",
    texto: "Você entrou na conta, mas não deu pra checar sua assinatura — normalmente é a conexão. " +
      "Se você já assinou, é só tentar de novo com a internet de volta.",
    recheck: "Tentar de novo",
    mostrarCta: false,
  },
  "sem-email": {
    eyebrow: "Acesso",
    titulo: "Esta conta não tem e-mail",
    texto: "O acesso é ligado ao e-mail usado no pagamento, e esta conta Google não expôs um. " +
      "Entre com uma conta Google que tenha e-mail.",
    recheck: "Verificar de novo",
    mostrarCta: false,
  },
};

function mostrarPortao(acesso) {
  const t = TEXTOS_PORTAO[acesso.estado] || TEXTOS_PORTAO.ausente;

  document.getElementById("portao-eyebrow").textContent = t.eyebrow;
  document.getElementById("portao-titulo").textContent = t.titulo;

  // A data de vencimento entra no texto só quando existe e já passou. "Venceu
  // em 12/03/2026" responde sozinha a pergunta que vem depois do susto.
  let texto = t.texto;
  if (acesso.expiraEm && acesso.estado === "expirada") {
    const d = new Date(acesso.expiraEm).toLocaleDateString("pt-BR");
    texto = "Sua assinatura terminou em " + d + ". " + texto;
  }
  document.getElementById("portao-texto").textContent = texto;
  document.getElementById("portao-email").textContent = acesso.email || "—";

  // Os botões de assinar só aparecem quando há para onde mandar. Sem URL de
  // checkout, um botão "Assinar" que não leva a nada é pior do que a ausência
  // dele — esta é justamente a tela onde a pessoa está tentando te pagar.
  const ctas = document.getElementById("portao-ctas");
  const planosComCheckout = ((window.VD_ASSINATURA && window.VD_ASSINATURA.planos) || [])
    .filter((p) => p.checkoutUrl);
  const temCta = Boolean(t.mostrarCta) && planosComCheckout.length > 0;
  if (temCta) {
    montarCtasDePlano(ctas, "Assinar", ["btn-primary", "btn-secondary"]);
  } else if (ctas) {
    ctas.innerHTML = "";
  }
  ctas.hidden = !temCta;

  // Sem os botões de assinar, "verificar de novo" vira a ação principal da
  // tela e recebe o peso visual que estava no outro.
  const btnRecheck = document.getElementById("btn-portao-recheck");
  btnRecheck.textContent = t.recheck;
  btnRecheck.classList.toggle("btn-primary", !temCta);
  btnRecheck.classList.toggle("btn-secondary", temCta);

  if (viewLanding) viewLanding.hidden = true;
  viewLogin.hidden = true;
  viewOnboarding.hidden = true;
  viewMain.hidden = true;
  viewEscolhaTrilha.hidden = true;
  viewSyncError.hidden = true;
  viewAssinatura.hidden = false;
  userChip.hidden = true;
  window.scrollTo(0, 0);
}

// Tela de bloqueio: não conseguimos ler o progresso da conta. Só oferece tentar
// de novo ou sair — nada que crie estado novo por cima do que está na nuvem.
function mostrarFalhaDeSync() {
  if (viewLanding) viewLanding.hidden = true;
  viewLogin.hidden = true;
  viewOnboarding.hidden = true;
  viewMain.hidden = true;
  viewEscolhaTrilha.hidden = true;
  viewAssinatura.hidden = true;
  viewSyncError.hidden = false;
  userChip.hidden = true;
}

// Deslogado agora cai na landing, não no cartão de login. O login continua
// existindo como tela própria — só deixou de ser a porta de entrada de quem
// nunca ouviu falar do app.
function showLoggedOut() {
  window.VD_AUTH.user = null;
  if (viewLanding) viewLanding.hidden = false;
  viewLogin.hidden = true;
  viewOnboarding.hidden = true;
  viewMain.hidden = true;
  viewSyncError.hidden = true;
  viewAssinatura.hidden = true;
  viewEscolhaTrilha.hidden = true;
  userChip.hidden = true;
  setLoading(false);
  animarMaquete();
}

// Landing → login. O "voltar" só existe neste caminho: quem já estava no login
// (por ter recarregado a página no meio do fluxo) não tem para onde voltar.
function mostrarLogin() {
  if (viewLanding) viewLanding.hidden = true;
  viewLogin.hidden = false;
  if (btnVoltarLanding) btnVoltarLanding.hidden = false;
  clearError();
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-ir-para-login]").forEach((el) => {
  el.addEventListener("click", mostrarLogin);
});

// O preço na landing, escrito a partir das constantes de assinatura.js — as
// mesmas que rotulam o botão de assinar no muro e na faixa do teste. O HTML já
// traz a frase para o número não piscar vazio; aqui ela é reescrita, e é esta
// que vale. Sem isto, mudar o preço exigiria lembrar de três arquivos.
if (window.VD_ASSINATURA && window.VD_ASSINATURA.chamada) {
  const frase = window.VD_ASSINATURA.chamada();
  document.querySelectorAll("[data-preco]").forEach((el) => {
    el.textContent = frase;
  });
}

// ───────────────────────────────────────────────────────────────────────────
// A LANDING MONTADA A PARTIR DO QUE O APP JÁ SABE
//
// Três listas da landing envelheciam sozinhas quando ficavam escritas no HTML:
// as trilhas, os preços e o valor por dia. A landing antiga dizia "Direito e
// Medicina" muito depois de existirem quatro trilhas, e "5.755 questões" muito
// depois do banco passar de 5.800 — o texto não erra sozinho, ele só não é
// avisado. As três agora saem do registro de trilhas e das constantes de
// assinatura, que são as mesmas fontes que o app inteiro consulta.
// ───────────────────────────────────────────────────────────────────────────

// A estrela do selo "A primeira trilha". Desenhada aqui porque só a landing usa
// — o sprite do <head> serve a barra inferior e a tela "Mais".
const ESTRELA =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
  'stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9 6.7 19.7l1.1-5.9L3.5 9.7l5.9-.8z"/></svg>';

function montarTrilhasLanding() {
  const alvo = document.getElementById("lp-trilhas");
  if (!alvo || !window.VD_TRILHAS) return;

  // A mesma regra de VD_TRILHA.outras(): trilha em construção não se anuncia.
  const ids = Object.keys(window.VD_TRILHAS).filter(function (k) {
    return !window.VD_TRILHAS[k].emConstrucao;
  });

  ids.forEach(function (id, i) {
    const t = window.VD_TRILHAS[id];
    const cartao = document.createElement("div");
    // Direito em destaque por ser a primeira trilha do app — fato verificável.
    // O desenho importado marcava "Mais escolhida", e não existe medição de
    // escolha em lugar nenhum para sustentar essa frase.
    cartao.className = "lp-trilha" + (id === "direito" ? " lp-trilha-destaque" : "");

    const selo = document.createElement("span");
    selo.className = "lp-trilha-selo";
    if (id === "direito") {
      selo.innerHTML = ESTRELA;
      selo.appendChild(document.createTextNode("A primeira trilha"));
    } else {
      // As bancas da trilha, que é o que separa uma da outra na hora de
      // escolher. textContent e não innerHTML: subtitulo vem do registro, mas
      // o hábito de não injetar HTML de dado é o que mantém isso seguro quando
      // o registro mudar de dono.
      selo.textContent = t.subtitulo || "Trilha";
    }
    cartao.appendChild(selo);

    const nome = document.createElement("span");
    nome.className = "lp-trilha-nome";
    nome.textContent = t.nome;
    cartao.appendChild(nome);

    const resumo = document.createElement("span");
    resumo.className = "lp-trilha-resumo";
    // No cartão de destaque o subtítulo não coube no selo, então entra aqui,
    // colado no resumo — a informação não pode sumir por causa do enfeite.
    resumo.textContent = (id === "direito" && t.subtitulo ? t.subtitulo + " · " : "") + (t.resumo || "");
    cartao.appendChild(resumo);

    alvo.appendChild(cartao);
  });
}

function montarPlanosLanding() {
  const alvo = document.getElementById("lp-precos");
  if (!alvo || !window.VD_ASSINATURA || !window.VD_ASSINATURA.planos) return;
  const planos = window.VD_ASSINATURA.planos;

  planos.forEach(function (p) {
    const cartao = document.createElement("div");
    // O de 90 dias em ouro: é pagamento único e sai mais barato por dia, e é
    // o que o portão de assinatura também oferece primeiro.
    cartao.className = "lp-preco-cartao" + (p.id === "noventa" ? " lp-preco-cartao-destaque" : "");

    const rotulo = document.createElement("span");
    rotulo.className = "lp-preco-rotulo";
    rotulo.textContent = p.id === "noventa" ? "Plano de 90 dias" : "Mensal";
    cartao.appendChild(rotulo);

    const valor = document.createElement("span");
    valor.className = "lp-preco-valor";
    valor.textContent = p.valor;
    cartao.appendChild(valor);

    const nota = document.createElement("span");
    nota.className = "lp-preco-nota";
    // "à vista" só no de 90 dias, e por um motivo que não é estilo: naquele
    // plano o cartão em 12x custa mais caro que o Pix, e é essa palavra que
    // avisa. No mensal os dois meios cobram igual (ver PLANO_MENSAL).
    nota.textContent = p.id === "noventa" ? "pagamento único, à vista" : "por mês, cancele quando quiser";
    cartao.appendChild(nota);

    alvo.appendChild(cartao);
  });

  // O "por dia" é conta, não texto: o menor valor diário entre os planos
  // oferecidos. Escrito à mão, seria o primeiro número a mentir quando um
  // preço mudasse — o desenho importado trazia "R$ 0,67 por dia" fixo.
  const pilula = document.getElementById("lp-por-dia");
  if (pilula) {
    const dias = { noventa: 90, mensal: 30 };
    let melhor = null;
    planos.forEach(function (p) {
      const n = parseFloat(String(p.valor).replace(/[^\d,]/g, "").replace(",", "."));
      const d = dias[p.id];
      if (!isFinite(n) || !d) return;
      const porDia = n / d;
      if (melhor === null || porDia < melhor) melhor = porDia;
    });
    if (melhor !== null) {
      pilula.hidden = false;
      const ponto = document.createElement("span");
      ponto.className = "lp-ponto";
      ponto.setAttribute("aria-hidden", "true");
      pilula.appendChild(ponto);
      pilula.appendChild(document.createTextNode(
        "Sai por R$ " + melhor.toFixed(2).replace(".", ",") + " por dia"
      ));
    }
  }
}

// A maquete da aba Hoje que anima no herói. O revezamento dos dois cartões é
// CSS (ver @keyframes lp-foco-a/-b em styles.css); o que precisa de JavaScript
// é só o número subindo, porque conteúdo de texto não se anima em CSS.
//
// O ciclo é o mesmo de 10 s do CSS, contado do mesmo relógio: se os dois
// divergirem, o número sobe fora do momento em que o cartão de progresso está
// em destaque, e a maquete passa a parecer quebrada em vez de viva.
//
// A trava existe porque quem chama isto é showLoggedOut() e o botão de voltar
// do login — os dois caminhos que mostram a landing. Sem ela, ir ao login e
// voltar três vezes deixaria três laços rodando sobre os mesmos elementos.
let maqueteLigada = false;
function animarMaquete() {
  if (maqueteLigada) return;
  const feitasEl = document.querySelector('[data-maquete="feitas"]');
  const pctEl = document.querySelector('[data-maquete="pct"]');
  const barraEl = document.querySelector('[data-maquete="barra"]');
  const restanteEl = document.querySelector('[data-maquete="restante"]');
  if (!feitasEl || !pctEl || !barraEl || !restanteEl) return;

  const META = 12;
  const pintar = function (p) {
    const feitas = Math.round(p * META);
    feitasEl.textContent = feitas;
    pctEl.textContent = Math.round(p * 100);
    barraEl.style.width = (p * 100).toFixed(1) + "%";
    restanteEl.textContent = feitas >= META
      ? "Meta do dia batida"
      : (META - feitas) + (META - feitas === 1 ? " questão para bater a meta do dia" : " questões para bater a meta do dia");
  };

  // Quem pediu menos movimento ao sistema recebe a maquete parada no estado
  // FINAL, não no inicial: parada em 33% ela contaria do produto uma história
  // pior que a verdade. É a mesma escolha do bloco prefers-reduced-motion no
  // styles.css, que congela os cartões em vez de escondê-los.
  const parado = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (parado) { maqueteLigada = true; pintar(0.8); return; }

  maqueteLigada = true;
  const t0 = performance.now();
  const CICLO = 10000;
  const entre = function (a, b, t) { return a + (b - a) * Math.min(1, Math.max(0, t)); };
  const suave = function (t) { return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3); };
  let ultimo = -1;

  const passo = function (agora) {
    // O laço morre junto com a landing. Sem esta linha ele continuaria rodando
    // atrás do app inteiro depois do login, repintando três elementos escondidos
    // sessenta vezes por segundo pelo resto da sessão.
    if (!viewLanding || viewLanding.hidden) { maqueteLigada = false; return; }
    requestAnimationFrame(passo);

    const t = ((agora - t0) % CICLO) / 1000;
    let p;
    if (t < 4.0) p = 0.3;                                   // o cartão de cima está em foco
    else if (t < 5.7) p = entre(0.3, 0.8, suave((t - 4.0) / 1.7));  // o número sobe
    else if (t < 8.8) p = 0.8;                              // e fica legível por 3 s
    else if (t < 9.7) p = entre(0.8, 0.3, suave((t - 8.8) / 0.9));  // volta para recomeçar
    else p = 0.3;

    // Repinta só quando o valor mudou de verdade: sem isto são três escritas no
    // DOM por quadro, e nenhuma delas muda um pixel na maior parte do ciclo.
    const arredondado = Math.round(p * 1000);
    if (arredondado === ultimo) return;
    ultimo = arredondado;
    pintar(p);
  };
  requestAnimationFrame(passo);
}

// As duas listas são montadas uma vez, agora: são conteúdo estático da página,
// e esperar a landing aparecer só adiantaria o momento em que ela pisca vazia.
// A maquete é o contrário — ela é ligada por quem MOSTRA a landing
// (showLoggedOut e o botão de voltar do login), porque um requestAnimationFrame
// disparado enquanto a seção está hidden morre no primeiro quadro.
montarTrilhasLanding();
montarPlanosLanding();

if (btnVoltarLanding) {
  btnVoltarLanding.addEventListener("click", () => {
    viewLogin.hidden = true;
    if (viewLanding) viewLanding.hidden = false;
    btnVoltarLanding.hidden = true;
    window.scrollTo(0, 0);
    animarMaquete();
  });
}

btnLogin.addEventListener("click", login);
btnLogout.addEventListener("click", logout);
document.getElementById("btn-tentar-sync").addEventListener("click", () => location.reload());
document.getElementById("btn-sair-sync").addEventListener("click", logout);

// "Já paguei / tentar de novo" recarrega em vez de só reconsultar o documento.
// Um veredito positivo muda tudo o que vem depois — sync, trilha, boot do plano
// — e refazer essa sequência aqui seria manter uma segunda versão do fluxo de
// entrada em pé, para divergir da primeira no primeiro descuido. O reload é a
// forma barata e sempre correta, o mesmo raciocínio da troca de trilha.
document.getElementById("btn-portao-recheck").addEventListener("click", () => location.reload());
document.getElementById("btn-portao-sair").addEventListener("click", logout);

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
