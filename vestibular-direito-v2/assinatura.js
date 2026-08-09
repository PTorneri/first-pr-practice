// O portão: quem pode abrir o app (v2).
//
// Este arquivo responde uma pergunta só — "esta pessoa entra?" — e não sabe
// nada sobre pagamento. Quem cobra é a plataforma de checkout; quem registra
// que o pagamento existiu é o webhook (ou você, pelo painel). Aqui só se lê o
// veredito. Essa separação é de propósito: trocar de Cakto para Asaas, ou
// liberar alguém na mão, não deve tocar em uma linha de app.
//
// Entra quem tem assinatura ativa OU quem ainda está nos 7 dias de teste — o
// teste está mais abaixo e não custa nem leitura nem escrita.
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

// ---------- O preço, num lugar só ----------
//
// Ele aparece em três telas — a landing (duas vezes), a faixa do teste e o
// muro — e é exatamente o tipo de coisa que se muda em dois lugares e se
// esquece no terceiro. Aqui é o único lugar onde os números são escritos;
// todo o resto compõe a partir daqui.
//
// A landing traz a frase escrita no HTML também, mas só como o que aparece
// antes deste módulo carregar: o auth.js sobrescreve com o que está aqui. Se
// as duas divergirem, quem ganha é esta constante — e o HTML é o que o leitor
// vê por alguns milissegundos, não o que fica.
const PRECO = {
  valor: "R$ 97",
  periodo: "90 dias",
};

// Para onde vai o botão "Assinar". Enquanto a url estiver vazia, a tela do
// portão mostra o recado de que a assinatura ainda não abriu, em vez de um
// botão que não leva a lugar nenhum — um link quebrado nesta tela é pior que
// botão nenhum, porque é aqui que a pessoa está tentando te pagar.
const CHECKOUT = {
  url: "",
  rotulo: "Assinar — " + PRECO.valor + " por " + PRECO.periodo,
};

// ---------- O teste de 7 dias ----------
//
// Todo mundo entra com o app inteiro por 7 dias, contados do nascimento da
// conta. Inteiro mesmo, inclusive a correção por IA — é ela que vende, e um
// teste que esconde justamente a parte boa não prova nada.
//
// A data de início NÃO é guardada em lugar nenhum nosso, e é isso que a torna
// difícil de burlar: ela é o creationTime que o próprio Firebase Auth carimba
// quando a conta nasce. Limpar o navegador não zera o teste — entrar de novo
// com a mesma conta Google devolve o mesmo carimbo. Ganhar mais 7 dias exige
// criar outra conta Google, e isso é barreira suficiente para o tamanho do
// problema. Guardar no localStorage seria um botão de "recomeçar o teste"; no
// documento do usuário, o próprio dono pode escrever (é a regra do users/{uid});
// no /assinaturas, ninguém do app escreve, então não havia onde criar.
//
// De quebra não custa leitura nem escrita, e funciona sem rede: o carimbo já
// veio dentro do objeto do usuário que o Auth entregou.
//
// ATENÇÃO ao ligar o portão: quem já tem conta há mais de 7 dias está com o
// teste vencido no mesmo instante. É exatamente por isso que o passo de
// cadastrar todo mundo que já usa o app vem ANTES de virar a chave.
const TESTE_DIAS = 7;

function estadoDoTeste(user) {
  const carimbo = user && user.metadata ? user.metadata.creationTime : null;
  const nasceu = carimbo ? Date.parse(carimbo) : NaN;

  // Sem carimbo não dá pra afirmar que o teste está valendo, e na dúvida ele
  // não vale: o teste é um presente, não um direito a se presumir.
  if (isNaN(nasceu)) return { dentro: false, terminaEm: 0, diasRestantes: 0 };

  const terminaEm = nasceu + TESTE_DIAS * 86400000;
  return {
    dentro: Date.now() < terminaEm,
    terminaEm: terminaEm,
    // Arredonda pra cima: faltando 6h ainda se diz "1 dia", e não "0 dias",
    // que leria como acabado enquanto a pessoa ainda está estudando.
    diasRestantes: Math.max(0, Math.ceil((terminaEm - Date.now()) / 86400000)),
  };
}

// ---------- O aviso de vencimento ----------
//
// A partir de quantos dias do fim o app avisa quem já assinou. Sete, o mesmo
// número do cartão "vencem em 7 dias" do painel — o que você vê e o que a
// pessoa vê têm que ser a mesma régua, senão você cobra alguém que ainda não
// foi avisado.
//
// Antes disto o aviso não existia de nenhum lado: o painel te mostrava quem ia
// vencer, e a PESSOA descobria batendo no muro, no meio de um plano de 90
// dias. Quem está estudando para uma prova não pode perder o app sem aviso.
const AVISO_VENCIMENTO_DIAS = 7;

// Diferença em dias de CALENDÁRIO, não em blocos de 24 horas. É o que permite
// dizer "vence hoje" e "vence amanhã" sem mentir: uma assinatura que termina
// hoje às 23h está a 0 dias daqui, e não a 1 — que é o que a divisão simples
// por 86400000 responderia às 8h da manhã.
//
// O Math.round existe pelo horário de verão: zerando as horas dos dois lados,
// um dia de 23 ou 25 horas sairia como 0,96 ou 1,04 e o truncamento erraria a
// véspera. O Brasil não tem horário de verão hoje, mas já teve e o app não
// depende disso para estar certo.
function diasAte(ms) {
  if (!ms) return Infinity;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const alvo = new Date(ms);
  alvo.setHours(0, 0, 0, 0);
  return Math.round((alvo - hoje) / 86400000);
}

// A frase que a landing mostra embaixo dos dois botões de começar. Vive aqui,
// e não no HTML, porque junta o número do teste com o do preço — as duas
// constantes deste arquivo. Escrita na página, sairia errada na primeira vez
// que um dos dois mudasse.
//
// Ordem proposital: o grátis primeiro. Quem chega precisa saber que pode
// entrar hoje sem pagar, e só depois quanto custa continuar.
function chamada() {
  return TESTE_DIAS + " dias grátis. Depois, " + PRECO.valor + " por " + PRECO.periodo + ".";
}

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

  const teste = estadoDoTeste(user);

  // A assinatura é consultada MESMO com o teste valendo. Parece leitura
  // desperdiçada — quem está no teste entra de qualquer jeito — mas é esta
  // passagem que grava o cache: sem ela, quem assina no primeiro dia chegaria
  // ao dia 8 sem veredito guardado e seria barrado no primeiro acesso sem rede.
  let v = null;
  let falhou = false;
  try {
    v = await consultar(email);
    gravarCache(email, v);
  } catch (err) {
    falhou = true;
    console.warn("[assinatura] não consegui ler o acesso:", err.code || err.message);
  }

  if (v && v.entra) return Object.assign({ email: email, teste: teste }, v);

  // Sem assinatura válida, o teste ainda abre a porta — e ele não depende da
  // rede, então vale inclusive quando a leitura acima falhou.
  if (teste.dentro) return { entra: true, estado: "teste", email: email, teste: teste };

  if (falhou) {
    const c = lerCache(email);
    const dentroDaGraca = c &&
      c.entra &&
      Date.now() - c.lidoEm < GRACA_OFFLINE_DIAS * 86400000 &&
      (!c.expiraEm || c.expiraEm > Date.now());

    if (dentroDaGraca) {
      return { entra: true, estado: "graca", email: email, expiraEm: c.expiraEm, plano: c.plano, teste: teste };
    }
    return { entra: false, estado: "offline", email: email, teste: teste };
  }

  // Leitura boa, sem assinatura e com o teste vencido. Quem nunca teve
  // documento é justamente quem acabou de sair do teste, e a mensagem tem que
  // ser essa — "sua assinatura venceu" soaria como cobrança de algo que a
  // pessoa nunca teve.
  return {
    entra: false,
    estado: v.estado === "ausente" ? "teste-acabou" : v.estado,
    email: email,
    expiraEm: v.expiraEm,
    plano: v.plano,
    teste: teste,
  };
}

// O ensaio: mesma leitura, mesmas regras, sem bloquear nada. Serve para virar a
// chave sabendo o que vai acontecer, e para responder "por que fulano não
// entra?" sem abrir o console do Firebase.
async function diagnostico() {
  const user = window.VD_AUTH && window.VD_AUTH.user;
  if (!user) return { erro: "ninguém logado" };

  const email = (user.email || "").toLowerCase().trim();
  const teste = estadoDoTeste(user);
  const saida = {
    email: email,
    portaoAtivo: PORTAO_ATIVO,
    contaCriadaEm: (user.metadata && user.metadata.creationTime) || "?",
    testeAtivo: teste.dentro,
    testeTerminaEm: teste.terminaEm ? new Date(teste.terminaEm).toLocaleString("pt-BR") : "?",
    testeDiasRestantes: teste.diasRestantes,
  };

  try {
    const v = await consultar(email);
    saida.assinatura = v.estado;
    // O que vale é o OU: assinatura ativa ou teste correndo. Mostrar só a
    // assinatura aqui faria parecer que quem está no teste seria barrado.
    saida.entraria = v.entra || teste.dentro;
  } catch (err) {
    saida.erro = err.code || err.message;
    saida.entraria = teste.dentro;
  }

  console.table(saida);
  return saida;
}

window.VD_ASSINATURA = {
  verificar: verificar,
  diagnostico: diagnostico,
  checkout: CHECKOUT,
  ativo: PORTAO_ATIVO,
  preco: PRECO,
  chamada: chamada,
  testeDias: TESTE_DIAS,
  avisoDias: AVISO_VENCIMENTO_DIAS,
  diasAte: diasAte,
  _estadoDoTeste: estadoDoTeste, // exposto para verificação
};
