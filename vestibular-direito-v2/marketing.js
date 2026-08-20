// O pixel do TikTok, e o consentimento que o precede.
//
// ESTE ARQUIVO SÓ É CARREGADO NA LANDING DA RAIZ. Quem injeta é o
// build-paginas.js, e só na página sem trilha. As quatro páginas de trilha não
// têm rastreador nenhum — o produto pago fica limpo, e a política de
// privacidade pode dizer isso sem mentir.
//
// A landing já é, por construção, a página de tráfego frio: o DESVIO_DA_RAIZ
// manda embora quem tem trilha salva. Quem chega em / e permanece é gente que
// nunca usou o app, que é exatamente o público do anúncio. Um pixel injetado
// antes daquele desvio contaria como visita de anúncio o aluno velho que só
// passou de raspão a caminho da própria página — por isso a ordem da injeção
// no gerador não é estética.
//
// NADA é buscado de analytics.tiktok.com antes do aceite. Não baixar o script
// é mais honesto do que baixá-lo e pedir que ele se contenha (o ttq tem
// holdConsent para isso), e é de graça para quem recusa.

(function () {
  "use strict";

  var PIXEL = "DA2VL8JC77U74CG8DEO0";

  // Fora do namespace de trilha (dir_, med_…), ao lado de v2_trilha: é uma
  // decisão da pessoa, não do curso, e teria que valer igual nas quatro se um
  // dia o pixel saísse da landing.
  var LS = "v2_consent_ads";

  function lido() {
    try { return localStorage.getItem(LS); } catch (e) { return null; }
  }

  function grava(valor) {
    try { localStorage.setItem(LS, valor); } catch (e) { /* bloqueado: segue sem pixel */ }
  }

  // O snippet oficial do TikTok, com uma mudança: ele chama ttq.page() no fim,
  // e aqui não. O page() é nosso, disparado logo abaixo — o snippet cru
  // contaria a visita de quem ainda não decidiu.
  function carregarPixel() {
    (function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      var ttq = w[t] = w[t] || [];
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once",
        "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent",
        "revokeConsent", "grantConsent"];
      ttq.setAndDefer = function (t, e) {
        t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); };
      };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (t) {
        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) {
          ttq.setAndDefer(e, ttq.methods[n]);
        }
        return e;
      };
      ttq.load = function (e, n) {
        var r = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r;
        ttq._t = ttq._t || {}; ttq._t[e] = +new Date();
        ttq._o = ttq._o || {}; ttq._o[e] = n || {};
        n = document.createElement("script");
        n.type = "text/javascript"; n.async = true; n.src = r + "?sdkid=" + e + "&lib=" + t;
        e = document.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(n, e);
      };
      ttq.load(PIXEL);
    })(window, document, "ttq");

    if (window.ttq && window.ttq.page) window.ttq.page();
  }

  // ---------- Os eventos de funil ----------
  //
  // O TikTok exige ver "eventos obrigatórios do funil" na configuração do pixel
  // e recusava liberar a campanha sem eles ("Status: Não está pronto para
  // campanha"). Ele quer quatro: ver conteúdo, carrinho, início de checkout e
  // compra.
  //
  // DUAS DESSAS QUATRO SÃO ANALOGIAS, e vale dizer isso em voz alta: a sagax
  // não tem carrinho nem checkout próprio — o pagamento acontece na Cakto, em
  // outro domínio. O que existe aqui é um clique em "Começar meu plano". Mapear
  // isso em AddToCart e InitiateCheckout é prática comum e o TikTok trata esses
  // eventos como sinal de otimização, não como contabilidade — mas não é
  // literal, e quem ler este arquivo daqui a um ano merece saber.
  //
  // O que NÃO fizemos: colocar pixel nas páginas de trilha para marcar o clique
  // real em "assinar". Os dois CTAs estão na própria landing, então o funil
  // inteiro cabe aqui, e o produto pago continua sem rastreador.
  //
  // A compra (CompletePayment) não sai daqui: vem do servidor, pela Events API,
  // porque o checkout é de outro domínio e o navegador nunca a veria.

  // Um id só para o navegador: nesta altura a pessoa ainda não escolheu plano —
  // os dois aparecem lado a lado na mesma seção. Quem distingue 90 dias de
  // mensal é a conversão do servidor, que sabe qual oferta foi paga.
  var CONTENT_ID = "sagax-assinatura";

  var jaDisparado = {};

  function rastrear(nome) {
    if (jaDisparado[nome]) return;
    // Sem consentimento o ttq nem existe, então isto é silencioso por
    // construção — não há caminho em que um evento escape do aceite.
    if (!window.ttq || !window.ttq.track) return;
    jaDisparado[nome] = true;
    window.ttq.track(nome, { content_type: "product", content_id: CONTENT_ID });
  }

  // Ver a seção de planos é a única das quatro que é literal: a pessoa está
  // olhando o produto e o preço.
  function observarPlanos() {
    var alvo = document.getElementById("planos");
    if (!alvo || !window.IntersectionObserver) return;
    var obs = new IntersectionObserver(function (entradas) {
      for (var i = 0; i < entradas.length; i++) {
        if (entradas[i].isIntersecting) {
          rastrear("ViewContent");
          obs.disconnect();
          return;
        }
      }
      // 0.2, e não algo como 0.4: a seção tem ~960px de altura e o tráfego do
      // TikTok é quase todo de celular. Numa tela de 400px, 40% da seção nunca
      // cabe na janela e o evento jamais dispararia — justamente para o público
      // que importa. 20% cabe em qualquer aparelho.
    }, { threshold: 0.2 });
    obs.observe(alvo);
  }

  // `data-cta-comecar`, e NÃO `data-ir-para-login`: os dois botões "Entrar"
  // também levam o segundo atributo, e quem faz login não está começando compra
  // nenhuma — é quase sempre aluno que já paga. Marcar isso como "iniciou
  // checkout" ensinaria o TikTok a perseguir gente que já é cliente.
  //
  // O clique é, ao mesmo tempo, "escolhi o produto" e "comecei o processo": não
  // há passo entre um e outro no nosso funil, então os dois eventos saem
  // juntos. Inventar uma separação artificial só para parecer um e-commerce
  // seria pior que assumir que o passo não existe.
  function observarCtas() {
    document.addEventListener("click", function (e) {
      var alvo = e.target && e.target.closest && e.target.closest("[data-cta-comecar]");
      if (!alvo) return;
      rastrear("AddToCart");
      rastrear("InitiateCheckout");
    }, true);
  }

  function ligarFunil() {
    observarPlanos();
    observarCtas();
  }

  function fecharBanner() {
    var el = document.getElementById("consent-ads");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function aceitar() { grava("sim"); fecharBanner(); carregarPixel(); ligarFunil(); }

  function recusar() { grava("nao"); fecharBanner(); }

  // Para quem aceitou e mudou de ideia. O revokeConsent() só tem efeito se o
  // pixel estiver carregado NESTA página; apagar a chave é o que garante que as
  // próximas visitas não carreguem nada. Chamado pelo botão em privacidade.html
  // (que não carrega este arquivo — lá basta apagar a chave).
  function revogar() {
    try { localStorage.removeItem(LS); } catch (e) {}
    if (window.ttq && window.ttq.revokeConsent) window.ttq.revokeConsent();
  }

  function mostrarBanner() {
    var caixa = document.createElement("div");
    caixa.id = "consent-ads";
    caixa.className = "consent-ads";
    caixa.setAttribute("role", "dialog");
    caixa.setAttribute("aria-live", "polite");
    caixa.setAttribute("aria-label", "Consentimento para medição de anúncios");

    var texto = document.createElement("p");
    texto.className = "consent-ads__texto";
    texto.textContent =
      "Podemos medir quantas pessoas chegam aqui pelos nossos anúncios? " +
      "Só nesta página de entrada — o app em si não tem rastreador.";

    var botoes = document.createElement("div");
    botoes.className = "consent-ads__botoes";

    var nao = document.createElement("button");
    nao.type = "button";
    nao.className = "consent-ads__btn consent-ads__btn--recusar";
    nao.textContent = "Não";
    nao.addEventListener("click", recusar);

    var sim = document.createElement("button");
    sim.type = "button";
    sim.className = "consent-ads__btn consent-ads__btn--aceitar";
    sim.textContent = "Pode medir";
    sim.addEventListener("click", aceitar);

    botoes.appendChild(nao);
    botoes.appendChild(sim);
    caixa.appendChild(texto);
    caixa.appendChild(botoes);
    document.body.appendChild(caixa);
  }

  function iniciar() {
    // Cinto e suspensório: o gerador já só injeta este arquivo na raiz, mas se
    // um dia ele for injetado em outro lugar por engano, aqui não roda.
    if (window.VD_TRILHA_URL) return;

    var decisao = lido();
    if (decisao === "sim") { carregarPixel(); ligarFunil(); return; }
    if (decisao === "nao") return;
    mostrarBanner();
  }

  window.VD_MARKETING = {
    aceitar: aceitar,
    recusar: recusar,
    revogar: revogar,
    estado: lido,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
