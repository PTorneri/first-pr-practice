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

  function fecharBanner() {
    var el = document.getElementById("consent-ads");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function aceitar() { grava("sim"); fecharBanner(); carregarPixel(); }

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
    if (decisao === "sim") { carregarPixel(); return; }
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
