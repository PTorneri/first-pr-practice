// Gera as portas de entrada do site a partir de um único template.
//
// Por que este arquivo existe: até 2026-08 o app tinha UMA porta de entrada,
// /vestibular-direito-v2/, e a trilha era escolhida lá dentro e guardada no
// localStorage. A URL, portanto, nunca dizia qual curso a pessoa estudava —
// quem estava em Medicina lia "vestibular-direito" na barra de endereço, e não
// havia como mandar um link do plano de Economia para alguém.
//
// O GitHub Pages não reescreve URL: o caminho é literalmente a pasta no disco.
// Para que /medicina/ exista, tem que existir uma pasta medicina/ com um
// index.html dentro. Este script produz essas pastas.
//
//   vestibular-direito-v2/template.html   ← a FONTE, o arquivo que se edita
//        │
//        ├─ index.html            (raiz: a landing, ainda sem trilha)
//        ├─ direito/index.html
//        ├─ medicina/index.html
//        ├─ economia/index.html
//        ├─ engenharia/index.html
//        └─ vestibular-direito-v2/index.html   (só redireciona; links antigos)
//
// As páginas são CÓPIAS, e isso é de propósito. A alternativa — uma página
// mínima que buscasse o corpo do app por JavaScript — trocaria uma duplicação
// que o gerador garante idêntica por uma segunda viagem de rede no caminho
// crítico, no aparelho de quem abre o app no 4G. Aqui vale a mesma regra dos
// bundles de questões: o artefato é grande, é gerado, e ninguém o edita à mão.
//
// O app em si (app.js, styles.css, assets/) continua morando em
// vestibular-direito-v2/. O que se multiplicou foi a porta, não a casa.
//
// Uso:
//   node vestibular-direito-v2/build-paginas.js
//   node vestibular-direito-v2/build-paginas.js --verificar   (não escreve; reprova se as páginas estiverem defasadas)

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const APP_DIR = "vestibular-direito-v2";
const RAIZ = path.join(__dirname, "..");
const TEMPLATE = path.join(__dirname, "template.html");

const VERIFICAR = process.argv.includes("--verificar");

// Tudo entra e sai em LF, e a comparação é feita em LF.
//
// Sem isto o --verificar mente: o repositório está em autocrlf, então todo
// checkout reescreve os arquivos em CRLF, e uma comparação byte a byte passaria
// a acusar as seis páginas como defasadas depois de qualquer `git pull` — um
// alarme que toca sempre é um alarme que se aprende a ignorar, e aí ele não
// seria visto no dia em que a defasagem fosse real. É a mesma razão do
// Normalizar() em verificar-publicado.ps1.
function lf(texto) {
  return texto.replace(/\r\n/g, "\n");
}

// ------------------------------------------------------- o registro de trilhas
//
// Lê as trilhas do próprio trilhas.js em vez de repetir a lista aqui. Ele é um
// IIFE de navegador, então roda num contexto com os globais que ele espera —
// mesmo truque de auditar-busca.js. O ganho é não ter duas listas de trilhas
// que possam divergir: acrescentar a quinta trilha em trilhas.js basta.
function lerTrilhas() {
  const guardado = {};
  const ctx = vm.createContext({
    console: console,
    document: { createElement: () => ({}), head: { appendChild: () => {} } },
    localStorage: {
      getItem: (k) => (k in guardado ? guardado[k] : null),
      setItem: (k, v) => { guardado[k] = String(v); },
      removeItem: (k) => { delete guardado[k]; },
    },
    location: { pathname: "/" },
  });
  ctx.window = ctx;
  vm.runInContext(fs.readFileSync(path.join(__dirname, "trilhas.js"), "utf8"), ctx, {
    filename: "trilhas.js",
  });
  if (!ctx.VD_TRILHAS) {
    console.error("trilhas.js não definiu window.VD_TRILHAS.");
    process.exit(1);
  }
  return ctx.VD_TRILHAS;
}

// --------------------------------------------------------------- as páginas
//
// `subir` é a distância da página até a raiz do site, e é ela que decide como
// os caminhos são reescritos. A landing fica NA raiz (0) e as trilhas ficam uma
// pasta abaixo (1) — a mesma profundidade de vestibular-direito-v2/, o que é a
// razão de `dataDir: "../vestibular-medicina/data/"` continuar valendo em
// trilhas.js sem uma linha de mudança.
function paginas(trilhas) {
  const lista = [{
    destino: "index.html",
    trilha: null,
    subir: 0,
    titulo: "sagax — Plano de 90 dias para o vestibular",
    canonica: "https://sagaxedu.com.br/",
  }];

  // TODAS as trilhas, inclusive as em construção. A pasta de uma trilha que
  // ainda não abriu não faz mal — ela cai na mesma tela de "em breve" que o
  // app já mostra — e não existir seria pior: o link divulgado antes da
  // abertura devolveria 404 do GitHub Pages, que é uma página que não é nossa.
  Object.keys(trilhas).forEach((id) => {
    const cfg = trilhas[id];
    lista.push({
      destino: path.join(id, "index.html"),
      trilha: id,
      subir: 1,
      titulo: "sagax — " + cfg.nome,
      canonica: "https://sagaxedu.com.br/" + id + "/",
    });
  });

  return lista;
}

// ------------------------------------------------------ reescrita de caminhos
//
// Um caminho no template é relativo à pasta do app. Visto de outra pasta, ele
// precisa apontar de volta para lá. Duas famílias, e as duas importam:
//
//   "assets/logo.png"                  → arquivo DO app        → ganha o caminho até vestibular-direito-v2/
//   "../vestibular-economia/x.css"     → arquivo VIZINHO ao app → só precisa de ajuste quando a página muda de profundidade
//
// Ficam intocados: âncoras (#planos, #i-cards), URLs absolutas e data:. O
// <base> resolveria tudo isso numa linha e foi rejeitado justamente por causa
// das âncoras — com ele, href="#planos" viraria um link para outra página.
function reescrever(html, subir) {
  const ateRaiz = subir === 0 ? "" : "../".repeat(subir);
  const ateApp = ateRaiz + APP_DIR + "/";

  return html.replace(/\b(src|href)="([^"]*)"/g, (inteiro, attr, alvo) => {
    if (/^(#|[a-z][a-z0-9+.-]*:|\/\/|\/)/i.test(alvo)) return inteiro;
    if (alvo.startsWith("../")) return attr + '="' + ateRaiz + alvo.slice(3) + '"';
    return attr + '="' + ateApp + alvo + '"';
  });
}

// ------------------------------------------------------------------- geração

function gerar(template, pagina) {
  let html = reescrever(template, pagina.subir);

  const ateRaiz = pagina.subir === 0 ? "" : "../".repeat(pagina.subir);
  const ateApp = ateRaiz + APP_DIR + "/";

  html = html.replace(/<title>[^<]*<\/title>/, "<title>" + pagina.titulo + "</title>");

  // Duas coisas que o app precisa saber antes da primeira linha de trilhas.js:
  // qual trilha esta URL representa, e onde estão os arquivos do app para o
  // código que monta caminho em tempo de execução (as capas das obras).
  const anuncio =
    "\n<!-- Injetado por build-paginas.js. VD_TRILHA_URL é a trilha desta URL:\n" +
    "     é ela que manda, acima do localStorage, porque abrir um link é uma\n" +
    "     escolha tão explícita quanto clicar no cartão do curso. -->\n" +
    '<link rel="canonical" href="' + pagina.canonica + '">\n' +
    "<script>\n" +
    "window.VD_APP_BASE = " + JSON.stringify(ateApp) + ";\n" +
    "window.VD_TRILHA_URL = " + JSON.stringify(pagina.trilha) + ";\n" +
    (pagina.trilha ? "" : DESVIO_DA_RAIZ) +
    "</script>\n";

  html = html.replace("</head>", anuncio + "</head>");

  return CABECALHO_GERADO + html;
}

// A landing só é a página certa para quem ainda não tem curso. Quem já estuda
// tem a trilha no localStorage deste aparelho, e para essa pessoa a raiz é uma
// parada inútil entre o ícone na tela de início e o plano do dia — daí o
// replace() em vez de href, que também mantém o botão Voltar limpo.
//
// Quem entra num aparelho novo não cai aqui: o localStorage está vazio, a
// trilha só chega com o sync, e quem desvia depois do sync é o auth.js.
const DESVIO_DA_RAIZ = `
try {
  var salva = localStorage.getItem("v2_trilha");
  if (salva && /^[a-z]+$/.test(salva)) location.replace(salva + "/");
} catch (e) { /* localStorage bloqueado: segue para a landing, que é o certo */ }
`;

const CABECALHO_GERADO =
  "<!-- ARQUIVO GERADO — não edite.\n" +
  "     Fonte:   vestibular-direito-v2/template.html\n" +
  "     Gerador: node vestibular-direito-v2/build-paginas.js\n" +
  "     Editar aqui funciona até a próxima geração, e some sem aviso. -->\n";

// ---------------------------------------------------------------------- main

const template = lf(fs.readFileSync(TEMPLATE, "utf8"));
const trilhas = lerTrilhas();
const lista = paginas(trilhas);

let defasadas = 0;

lista.forEach((pagina) => {
  const html = gerar(template, pagina);
  const destino = path.join(RAIZ, pagina.destino);

  if (VERIFICAR) {
    const atual = fs.existsSync(destino) ? lf(fs.readFileSync(destino, "utf8")) : null;
    if (atual !== html) {
      console.error("DEFASADA: " + pagina.destino + (atual === null ? " (não existe)" : ""));
      defasadas++;
    }
    return;
  }

  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, html);
  console.log("gerou " + pagina.destino.replace(/\\/g, "/"));
});

// O redirecionador do endereço antigo. Não sai do template: ele não é o app,
// é uma placa. Existe porque /vestibular-direito-v2/ está no histórico e na
// tela de início de quem já usa o app — deixar de responder ali seria estragar
// o atalho de quem mais usa o produto para arrumar a URL de quem vai chegar.
const REDIRECIONADOR = CABECALHO_GERADO + `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>sagax</title>
<link rel="icon" type="image/png" href="assets/favicon.png">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=../">
<link rel="canonical" href="https://sagaxedu.com.br/">
<style>
  body {
    margin: 0; min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0A2540; color: #fff;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    text-align: center; padding: 24px;
  }
  .marca { font-size: 2rem; font-weight: 600; letter-spacing: -0.01em; margin: 0 0 4px; }
  .marca span { color: #F4C142; }
  p { color: #9fb2c9; font-size: 0.95rem; margin: 0 0 20px; }
  a { color: #7AA0F5; font-weight: 600; }
</style>
</head>
<body>
  <div>
    <p class="marca">saga<span>x</span></p>
    <p>O plano mudou de endereço&hellip;</p>
    <p><a href="../">Ir para o app</a></p>
  </div>
  <script>
  // Leva direto para a pasta da trilha de quem já estuda; sem trilha guardada,
  // a raiz decide. O <meta refresh> acima cobre o caso sem JavaScript.
  try {
    var salva = localStorage.getItem("v2_trilha");
    location.replace(salva && /^[a-z]+$/.test(salva) ? "../" + salva + "/" : "../");
  } catch (e) {
    location.replace("../");
  }
  </script>
</body>
</html>
`;

const destinoRedir = path.join(__dirname, "index.html");
if (VERIFICAR) {
  const atual = fs.existsSync(destinoRedir) ? lf(fs.readFileSync(destinoRedir, "utf8")) : null;
  if (atual !== REDIRECIONADOR) {
    console.error("DEFASADA: " + APP_DIR + "/index.html" + (atual === null ? " (não existe)" : ""));
    defasadas++;
  }
} else {
  fs.writeFileSync(destinoRedir, REDIRECIONADOR);
  console.log("gerou " + APP_DIR + "/index.html (redirecionador)");
}

if (VERIFICAR) {
  if (defasadas) {
    console.error("\n" + defasadas + " página(s) fora de dia com o template. Rode: node " + APP_DIR + "/build-paginas.js");
    process.exit(1);
  }
  console.log("as páginas estão em dia com o template.");
}
