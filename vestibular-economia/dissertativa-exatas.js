// Tela da dissertativa de exatas — escrever primeiro, gabarito depois.
//
// O QUE ESTA TELA FAZ DE DIFERENTE DA DISSERTATIVA QUE JÁ EXISTE
//
// Na dissertativa de Humanas e LP, o gabarito é uma lista de tópicos e o aluno
// marca o que cobriu. Aqui não dá: a prova de Matemática da FGV EESP é
// corrigida por FAIXA (0/25/50/75/100), e a faixa depende de ter mostrado o
// caminho. A grade da banca é explícita — resposta certa sem conta vale 25% na
// questão 1 de 2026.1 e 0% na 2b. Ver o cabeçalho de data/dissertativas-matematica.js.
//
// Daí as quatro regras que este arquivo implementa:
//
//   1. DOIS CAMPOS. A resolução é o campo grande, porque é onde mora a nota. A
//      resposta final é um campo curto, porque é a única parte que a máquina
//      pode conferir honestamente.
//
//   2. TRAVA NA REVELAÇÃO. O botão de conferir só acende com a resolução
//      escrita. Sem isso a tela vira leitura de solução, que é o modo mais
//      confortável e mais inútil de estudar. Quem não souber resolver tem uma
//      saída explícita ao lado — que registra 0%, como a grade registraria.
//
//   3. TETO PELA RESPOSTA. Se a resposta final não bate, a faixa MÁXIMA do
//      item fica trancada — só ela. É a âncora objetiva que segura a
//      autoavaliação otimista, que é o ponto fraco de qualquer autocorreção.
//
//      Trancar só o topo, e não "tudo acima de 50%", é o que a grade manda.
//      A faixa máxima é a única que exige o número certo ("...e deu a resposta
//      correta: 407"). Já a de 75% da questão 1 de 2026.1 descreve exatamente
//      quem raciocinou certo e errou a conta — é ONDE quem errou o número deve
//      cair, e trancá-la puniria a mesma pessoa duas vezes.
//
//      O destravamento manual existe porque "não reconheci" não é o mesmo que
//      "está errado": o aluno pode ter escrito a resposta certa numa forma que
//      não prevemos.
//
//   4. NOTA NA ESCALA DA BANCA. A questão vale 0 a 10, ponderando os subitens
//      pelos pontos que a prova atribui a cada um. "Você tiraria 6,5" diz mais
//      do que "acertou 2 de 3".
//
// A tela não corrige nada sozinha e não finge que corrige. Ela mostra a
// resolução oficial e as palavras da grade, e o aluno se posiciona nelas.
//
// Este arquivo é autossuficiente de propósito: não depende de app.js. Quando a
// trilha de Economia entrar, o gancho é uma linha em renderDissertQuestion —
// se a questão tiver `faixas`, chamar VD_EXATAS.render em vez do renderizador
// de checklist. app.js está com trabalho de outra sessão em cima; por isso a
// tela nasce aqui e é plugada depois.

(function () {
  "use strict";

  // ---------- Persistência ----------
  //
  // O prefixo vem de fora (`opts.ns`) porque no app o progresso é separado por
  // trilha — v2 guarda tudo sob "dir_", "med_"... Fora do app, sem prefixo.

  const CHAVES = {
    resolucao: "vd_exatasResolucao", // { "<qid>::<item>": "texto" }
    resposta: "vd_exatasResposta",  // { "<qid>::<item>": "texto" }
    faixa: "vd_exatasFaixa",        // { "<qid>::<item>": 0..100 }
    estado: "vd_exatasEstado",      // { "<qid>::<item>": "conferido" | "desistiu" }
    destrava: "vd_exatasDestrava",  // { "<qid>::<item>": true } — "minha resposta equivale"
  };

  function ler(ns, nome) {
    try {
      return JSON.parse(localStorage.getItem((ns || "") + CHAVES[nome]) || "{}");
    } catch (e) {
      return {};
    }
  }

  function gravar(ns, nome, obj) {
    try {
      localStorage.setItem((ns || "") + CHAVES[nome], JSON.stringify(obj));
    } catch (e) {
      /* cota estourada: a tela continua funcionando na sessão */
    }
  }

  function guardar(ns, nome, chave, valor) {
    const atual = ler(ns, nome);
    if (valor === null || valor === undefined) delete atual[chave];
    else atual[chave] = valor;
    gravar(ns, nome, atual);
  }

  function chaveDe(questao, item) {
    return questao.id + "::" + item.id;
  }

  // ---------- Conferência da resposta final ----------
  //
  // Normalizar de menos deixa passar falso negativo ("R$ 150,00" contra "150"),
  // e falso negativo aqui é caro: tranca as faixas altas de quem acertou. Então
  // a régua é generosa no que não muda o valor — caixa, espaço, moeda, vírgula
  // decimal — e não tenta ser esperta com equivalência algébrica. Para o resto,
  // existe a lista `aceitas`, que é como a própria FGV publicava o gabarito das
  // discursivas curtas em 2022.

  function normalizar(txt) {
    return String(txt == null ? "" : txt)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "")
      .replace(/r\$/g, "")
      .replace(/,/g, ".")
      .replace(/\.$/, "");
  }

  function comoNumero(txt) {
    const achado = normalizar(txt).match(/-?\d+(\.\d+)?/);
    return achado ? parseFloat(achado[0]) : null;
  }

  // "confere" | "nao-reconheci" | "vazio" | "sem-gabarito"
  function conferir(item, valor) {
    if (!item.respostaFinal) return "sem-gabarito";
    if (!String(valor || "").trim()) return "vazio";

    const alvo = normalizar(valor);
    const aceitas = item.respostaFinal.aceitas || [];
    for (let i = 0; i < aceitas.length; i++) {
      if (normalizar(aceitas[i]) === alvo) return "confere";
    }

    const faixa = item.respostaFinal.intervalo;
    if (faixa) {
      const n = comoNumero(valor);
      if (n !== null && n >= faixa[0] && n <= faixa[1]) return "confere";
    }
    return "nao-reconheci";
  }

  // ---------- Nota ----------
  //
  // Escala 0–10, ponderada pelos pontos que a prova dá a cada subitem (a questão
  // do Gini vale 1, 1 e 2 — o item (c) sozinho é metade da questão). Subitem
  // ainda não avaliado fica de fora do cálculo, e o contador diz quantos faltam:
  // uma nota parcial apresentada como final mentiria para baixo.

  function nota(questao, ns) {
    const faixas = ler(ns, "faixa");
    let somaPesos = 0;
    let somaObtida = 0;
    let avaliados = 0;

    questao.itens.forEach(function (item) {
      const peso = item.pontos || 1;
      const pct = faixas[chaveDe(questao, item)];
      if (pct === undefined) return;
      avaliados += 1;
      somaPesos += peso;
      somaObtida += peso * (pct / 100);
    });

    return {
      avaliados: avaliados,
      total: questao.itens.length,
      valor: somaPesos > 0 ? (somaObtida / somaPesos) * 10 : null,
    };
  }

  // ---------- Desenho ----------

  function escapar(txt) {
    return String(txt == null ? "" : txt)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatarNota(v) {
    return v.toFixed(1).replace(".", ",");
  }

  function render(container, questao, opts) {
    const cfg = opts || {};
    const ns = cfg.ns || "";

    const wrap = document.createElement("div");
    wrap.className = "exatas-questao";

    const selo = questao.origem
      ? '<span class="exatas-origem">' + escapar(questao.origem) + "</span>"
      : "";
    const tempo = questao.tempoSugerido ? " · ~" + questao.tempoSugerido + " min sugeridos" : "";

    // A figura entra como SVG em linha, sem escapar — e isso só é seguro porque
    // ela é AUTORADA por nós, num arquivo de dados versionado, nunca digitada
    // por usuário. verificar-dissertativas.js recusa qualquer figura que não
    // comece em <svg ou que contenha <script/on…=, para que essa premissa não
    // dependa de disciplina de quem escreve a questão.
    const figura = questao.figura
      ? '<div class="exatas-figura" role="img" aria-label="' +
        escapar(questao.figuraAlt || "figura da questão") + '">' + questao.figura + "</div>"
      : "";

    wrap.innerHTML =
      '<div class="lesson-eyebrow">' + escapar(questao.tema || questao.area) + escapar(tempo) + "</div>" +
      selo +
      '<div class="q-support">' + escapar(questao.enunciado) + "</div>" +
      figura +
      '<div class="exatas-itens"></div>' +
      '<div class="exatas-nota" hidden></div>';

    const caixaItens = wrap.querySelector(".exatas-itens");
    questao.itens.forEach(function (item) {
      caixaItens.appendChild(desenharItem(questao, item, ns, atualizarNota));
    });

    const caixaNota = wrap.querySelector(".exatas-nota");

    function atualizarNota() {
      const n = nota(questao, ns);
      if (n.avaliados === 0) {
        caixaNota.hidden = true;
        return;
      }
      caixaNota.hidden = false;
      const parcial = n.avaliados < n.total;
      caixaNota.innerHTML =
        '<strong>Nota nesta questão: ' + formatarNota(n.valor) + "</strong>" +
        (parcial
          ? '<span class="exatas-nota-parcial"> — parcial, ' +
            n.avaliados + " de " + n.total + " subitens avaliados</span>"
          : "");
      if (typeof cfg.onNota === "function") cfg.onNota(questao, n);
    }

    atualizarNota();
    container.appendChild(wrap);
    return wrap;
  }

  function desenharItem(questao, item, ns, aoMudarNota) {
    const chave = chaveDe(questao, item);
    const bloco = document.createElement("div");
    bloco.className = "exatas-item";

    const temMuitos = questao.itens.length > 1;
    const rotulo = temMuitos ? "<strong>" + escapar(item.id) + ")</strong> " : "";
    const pontos = item.pontos
      ? '<span class="dissert-quantidade">' + item.pontos + (item.pontos === 1 ? " ponto" : " pontos") + "</span>"
      : "";

    const campoResposta = item.respostaFinal
      ? '<label class="exatas-campo-resposta">' +
        '<span class="exatas-rotulo">Resposta final <em>(' + escapar(item.respostaFinal.rotulo) + ")</em></span>" +
        '<input type="text" class="exatas-resposta" inputmode="text" autocomplete="off" ' +
        'placeholder="ex.: 3/4, 0,6, raiz(2), x^2">' +
        "</label>"
      : '<p class="hint exatas-sem-gabarito">Este item pede explicação, não número — não há resposta para conferir. ' +
        "A avaliação é sua, contra a resolução oficial.</p>";

    bloco.innerHTML =
      '<div class="q-enunciado">' + rotulo + escapar(item.comando) + pontos + "</div>" +
      campoResposta +
      '<label class="exatas-campo-resolucao">' +
      '<span class="exatas-rotulo">Sua resolução <em>(é ela que vale a nota)</em></span>' +
      '<textarea class="dissert-textarea exatas-resolucao" rows="7" ' +
      'placeholder="Escreva o caminho: o que você chamou de quê, a equação que montou, as contas. ' +
      'Pode escrever em texto simples — 3/4, raiz(2), x^2."></textarea>' +
      "</label>" +
      '<div class="exatas-acoes">' +
      '<button type="button" class="btn btn-primary exatas-btn-conferir" disabled>Conferir</button>' +
      '<button type="button" class="btn-link exatas-btn-desistir">Não sei resolver — ver a resolução</button>' +
      "</div>" +
      '<div class="exatas-gabarito" hidden></div>';

    const campoResol = bloco.querySelector(".exatas-resolucao");
    const campoResp = bloco.querySelector(".exatas-resposta");
    const btnConferir = bloco.querySelector(".exatas-btn-conferir");
    const btnDesistir = bloco.querySelector(".exatas-btn-desistir");
    const gabarito = bloco.querySelector(".exatas-gabarito");

    // Restaura o que já estava escrito
    campoResol.value = ler(ns, "resolucao")[chave] || "";
    if (campoResp) campoResp.value = ler(ns, "resposta")[chave] || "";

    function temResolucao() {
      return campoResol.value.trim().length > 0;
    }

    function sincronizarBotao() {
      btnConferir.disabled = !temResolucao();
      btnConferir.title = btnConferir.disabled
        ? "Escreva sua resolução antes de ver o gabarito"
        : "";
    }

    campoResol.addEventListener("input", function () {
      guardar(ns, "resolucao", chave, campoResol.value);
      sincronizarBotao();
    });

    if (campoResp) {
      campoResp.addEventListener("input", function () {
        guardar(ns, "resposta", chave, campoResp.value);
      });
    }

    btnConferir.addEventListener("click", function () {
      if (!temResolucao()) return;
      guardar(ns, "estado", chave, "conferido");
      abrirGabarito();
    });

    btnDesistir.addEventListener("click", function () {
      guardar(ns, "estado", chave, "desistiu");
      // Desistir é uma resposta em branco, e em branco é 0% na grade da FGV.
      // Registrar isso é o que impede que a tela vire leitura de solução com
      // nota bonita no fim.
      guardar(ns, "faixa", chave, 0);
      abrirGabarito();
      aoMudarNota();
    });

    function abrirGabarito() {
      const estado = ler(ns, "estado")[chave];
      const desistiu = estado === "desistiu";
      const veredito = conferir(item, campoResp ? campoResp.value : "");
      const destravado = !!ler(ns, "destrava")[chave];
      const trancarTopo = !desistiu && item.respostaFinal && veredito !== "confere" && !destravado;

      gabarito.hidden = false;
      bloco.querySelector(".exatas-acoes").hidden = true;

      gabarito.innerHTML =
        blocoVeredito(item, veredito, desistiu, trancarTopo) +
        '<div class="exatas-oficial">' +
        '<h4>Resolução oficial</h4>' +
        "<pre>" + escapar(item.resolucao) + "</pre>" +
        "</div>" +
        blocoFaixas(item, chave, ns, desistiu, trancarTopo) +
        '<div class="exatas-acoes-fim">' +
        '<button type="button" class="btn-link exatas-btn-refazer">Refazer esta questão do zero</button>' +
        "</div>";

      const linkDestravar = gabarito.querySelector(".exatas-destravar");
      if (linkDestravar) {
        linkDestravar.addEventListener("click", function () {
          guardar(ns, "destrava", chave, true);
          abrirGabarito();
        });
      }

      gabarito.querySelectorAll(".exatas-faixa input").forEach(function (radio) {
        radio.addEventListener("change", function () {
          guardar(ns, "faixa", chave, parseInt(radio.value, 10));
          aoMudarNota();
        });
      });

      gabarito.querySelector(".exatas-btn-refazer").addEventListener("click", function () {
        ["resolucao", "resposta", "faixa", "estado", "destrava"].forEach(function (nome) {
          guardar(ns, nome, chave, null);
        });
        campoResol.value = "";
        if (campoResp) campoResp.value = "";
        gabarito.hidden = true;
        gabarito.innerHTML = "";
        bloco.querySelector(".exatas-acoes").hidden = false;
        sincronizarBotao();
        aoMudarNota();
      });
    }

    function faixaMaxima(item) {
      return item.faixas.reduce(function (maior, f) { return f.pct > maior ? f.pct : maior; }, 0);
    }

    function blocoVeredito(item, veredito, desistiu, trancarTopo) {
      if (desistiu) {
        return '<div class="exatas-veredito exatas-veredito-zero">Você abriu a resolução sem tentar. ' +
          "Na grade da FGV isso é resposta em branco: <strong>0%</strong>. Leia e refaça — o botão está no fim.</div>";
      }
      if (veredito === "sem-gabarito") {
        return '<div class="exatas-veredito exatas-veredito-neutro">Item sem resposta conferível: ' +
          "compare sua explicação com a resolução abaixo.</div>";
      }
      if (veredito === "confere") {
        return '<div class="exatas-veredito exatas-veredito-ok">Sua resposta final confere. ' +
          "Agora o que decide a nota é o caminho — compare com a resolução.</div>";
      }
      const abre = '<div class="exatas-veredito exatas-veredito-alerta">';
      const corpo = veredito === "vazio"
        ? "Você não preencheu a resposta final."
        : "Sua resposta final não bateu com nenhuma forma esperada.";
      const trava = trancarTopo
        ? " Por isso a faixa de " + faixaMaxima(item) + "% está trancada — é a única que exige o número " +
          "certo. As de baixo continuam abertas, inclusive a de quem raciocinou bem e errou a conta. " +
          '<button type="button" class="btn-link exatas-destravar">Minha resposta equivale — destravar</button>'
        : "";
      return abre + corpo + trava + "</div>";
    }

    function blocoFaixas(item, chave, ns, desistiu, trancarTopo) {
      const escolhida = ler(ns, "faixa")[chave];
      const topo = faixaMaxima(item);
      const linhas = item.faixas.map(function (faixa) {
        const trancada = trancarTopo && faixa.pct === topo;
        const marcada = escolhida === faixa.pct ? " checked" : "";
        const idRadio = "faixa-" + chave.replace(/[^a-z0-9]/gi, "-") + "-" + faixa.pct;
        return (
          '<label class="exatas-faixa' + (trancada ? " exatas-faixa-trancada" : "") + '" for="' + idRadio + '">' +
          '<input type="radio" id="' + idRadio + '" name="faixa-' + escapar(chave) + '" value="' + faixa.pct + '"' +
          marcada + (trancada || desistiu ? " disabled" : "") + ">" +
          '<span class="exatas-faixa-pct">' + faixa.pct + "%</span>" +
          '<span class="exatas-faixa-desc">' + escapar(faixa.desc) + "</span>" +
          "</label>"
        );
      }).join("");

      return (
        '<div class="exatas-autoavaliacao">' +
        "<h4>Em qual faixa a sua resolução cai?</h4>" +
        '<p class="hint">As descrições abaixo são as da grade de correção da banca, não nossas. ' +
        "Seja o corretor, não o autor: o que está escrito no seu papel é o que conta.</p>" +
        linhas +
        "</div>"
      );
    }

    sincronizarBotao();
    // Item já conferido numa sessão anterior reabre no estado em que ficou.
    if (ler(ns, "estado")[chave]) abrirGabarito();

    return bloco;
  }

  window.VD_EXATAS = {
    render: render,
    nota: nota,
    conferir: conferir,
    normalizar: normalizar,
  };
})();
