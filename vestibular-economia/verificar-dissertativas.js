// Validador do banco de dissertativas de Matemática.
//
//   node vestibular-economia/verificar-dissertativas.js
//
// POR QUE ESTE ARQUIVO EXISTE
//
// O banco de objetivas tem verify-banco.ps1 porque distrator ruim é invisível a
// olho nu. Aqui o risco é outro e é pior: uma RESOLUÇÃO ERRADA. O aluno confia
// na resolução oficial mais do que em qualquer outra coisa da tela — é o único
// lugar do app onde ele vai contra o próprio raciocínio e aceita que errou. Uma
// conta furada aqui não confunde: ensina errado.
//
// Por isso toda questão cuja resposta seja um número carrega `conferencia`, uma
// expressão aritmética que o validador AVALIA e compara com a resposta
// declarada. É a única checagem deste projeto que verifica conteúdo, e não
// forma — e ela pegou erro meu enquanto eu escrevia o banco.
//
// As demais regras protegem invariantes de que a TELA depende:
//
//   • faixas em ordem crescente, começando em 0 — a tela desenha na ordem dada
//   • a faixa máxima precisa citar a resposta certa, porque é ela que a tela
//     tranca quando o aluno erra o número. Se a faixa do topo não exigir o
//     número certo, a trava vira punição arbitrária
//   • figura só como <svg> autoral, sem script e sem cor cravada (a cor vem de
//     currentColor, senão o desenho some no modo escuro)

const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "data", "dissertativas");
const META = 3; // quantas questões de referência (FGV real) o banco tem

const erros = [];
const avisos = [];
let totalQuestoes = 0;
let totalItens = 0;
const porTema = {};
const idsVistos = new Map();
const enunciadosVistos = new Map();

function erro(ctx, msg) { erros.push(ctx + ": " + msg); }
function aviso(ctx, msg) { avisos.push(ctx + ": " + msg); }

// ---------- conferência aritmética ----------
//
// A expressão vem de arquivo versionado nosso, mas mesmo assim só passa se for
// feita de número, operador, parênteses e Math.*: um typo que vire chamada de
// função estranha falha aqui em vez de rodar.
const EXPR_OK = /^[0-9+\-*/%.,()\s]*(Math\.[a-zA-Z0-9]+\([^)]*\)|[0-9+\-*/%.,()\s])*$/;

function avaliar(expr) {
  if (!EXPR_OK.test(expr.replace(/Math\.[a-zA-Z0-9]+/g, "Math.f"))) {
    return { erro: "expressão com caracteres não permitidos" };
  }
  try {
    const v = new Function("Math", '"use strict"; return (' + expr + ");")(Math);
    if (typeof v !== "number" || !isFinite(v)) return { erro: "não resultou em número finito" };
    return { valor: v };
  } catch (e) {
    return { erro: "não avaliou (" + e.message + ")" };
  }
}

function comoNumero(txt) {
  const limpo = String(txt).toLowerCase().replace(/\s/g, "").replace(/r\$/g, "").replace(/,/g, ".");
  // Fração antes de número solto: "50/51" precisa virar 0,98 e não 50, senão a
  // conferência de toda resposta em fração reprovaria sozinha.
  const fracao = limpo.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (fracao) return parseFloat(fracao[1]) / parseFloat(fracao[2]);
  const m = limpo.match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
}

// Todo número citado num texto em português, já convertido: "2.730" -> 2730,
// "0,625" -> 0.625, "50/51" -> 0.98…
function numerosDoTexto(txt) {
  const achados = [];
  // O sinal aceita hífen ASCII e o menos tipográfico U+2212: o banco inteiro é
  // escrito com "−" (que não é "-"), e sem isto toda resposta negativa
  // apareceria como positiva na conferência.
  const re = /[-−]?\d{1,3}(?:\.\d{3})+(?:,\d+)?|[-−]?\d+(?:,\d+)?(?:\/\d+)?/g;
  let m;
  while ((m = re.exec(String(txt))) !== null) {
    const bruto = m[0].replace(/−/g, "-");
    const semMilhar = /\.\d{3}/.test(bruto) ? bruto.replace(/\./g, "") : bruto;
    const n = comoNumero(semMilhar);
    if (n !== null) achados.push(n);
  }
  return achados;
}

// ---------- leitura ----------

if (!fs.existsSync(DIR)) {
  console.error("Pasta não encontrada: " + DIR);
  process.exit(1);
}

const arquivos = fs.readdirSync(DIR).filter((f) => f.endsWith(".json")).sort();
if (arquivos.length === 0) {
  console.error("Nenhum .json em " + DIR);
  process.exit(1);
}

arquivos.forEach((arquivo) => {
  let dados;
  try {
    dados = JSON.parse(fs.readFileSync(path.join(DIR, arquivo), "utf8"));
  } catch (e) {
    erro(arquivo, "JSON inválido — " + e.message);
    return;
  }
  const questoes = dados.questoes || [];
  porTema[dados.tema || arquivo] = questoes.length;
  questoes.forEach((q) => verificarQuestao(q, arquivo));
});

function verificarQuestao(q, arquivo) {
  totalQuestoes += 1;
  const ctx = arquivo + " » " + (q.id || "(sem id)");

  ["id", "area", "frente", "tema", "enunciado"].forEach((campo) => {
    if (!q[campo] || !String(q[campo]).trim()) erro(ctx, "campo obrigatório vazio: " + campo);
  });

  if (idsVistos.has(q.id)) erro(ctx, "id repetido (já em " + idsVistos.get(q.id) + ")");
  else idsVistos.set(q.id, arquivo);

  const chaveEnunciado = String(q.enunciado || "").slice(0, 90).toLowerCase();
  if (enunciadosVistos.has(chaveEnunciado)) {
    erro(ctx, "enunciado começa igual ao de " + enunciadosVistos.get(chaveEnunciado));
  } else enunciadosVistos.set(chaveEnunciado, q.id);

  if (q.figura) verificarFigura(q, ctx);

  if (!Array.isArray(q.itens) || q.itens.length === 0) {
    erro(ctx, "sem itens");
    return;
  }
  if (q.itens.length > 1) {
    const ids = q.itens.map((i) => i.id);
    if (new Set(ids).size !== ids.length) erro(ctx, "ids de subitem repetidos");
  }
  q.itens.forEach((item) => verificarItem(q, item, ctx));
}

function verificarFigura(q, ctx) {
  const svg = String(q.figura).trim();
  if (!svg.startsWith("<svg")) erro(ctx, "figura não começa com <svg");
  if (/<script|\son[a-z]+\s*=/i.test(svg)) erro(ctx, "figura contém script ou handler inline");
  if (!/viewBox=/.test(svg)) aviso(ctx, "figura sem viewBox — não escala no celular");
  if (!/currentColor/.test(svg)) aviso(ctx, "figura sem currentColor — some no modo escuro");
  if (!q.figuraAlt) aviso(ctx, "figura sem figuraAlt (leitor de tela)");
}

function verificarItem(q, item, ctxQ) {
  totalItens += 1;
  const ctx = ctxQ + " [" + (item.id || "?") + "]";

  if (!item.comando || !item.comando.trim()) erro(ctx, "comando vazio");
  if (!item.resolucao || item.resolucao.trim().length < 20) {
    erro(ctx, "resolução ausente ou curta demais para mostrar um caminho");
  }
  if (item.pontos !== undefined && (typeof item.pontos !== "number" || item.pontos <= 0)) {
    erro(ctx, "pontos inválido");
  }

  // --- faixas ---
  if (!Array.isArray(item.faixas) || item.faixas.length < 2) {
    erro(ctx, "precisa de pelo menos duas faixas");
    return;
  }
  let anterior = -1;
  item.faixas.forEach((f) => {
    if (typeof f.pct !== "number" || f.pct < 0 || f.pct > 100) erro(ctx, "faixa com pct inválido");
    if (f.pct <= anterior) erro(ctx, "faixas fora de ordem crescente (" + f.pct + " depois de " + anterior + ")");
    anterior = f.pct;
    if (!f.desc || f.desc.trim().length < 10) erro(ctx, "faixa " + f.pct + "% sem descrição útil");
  });
  if (item.faixas[0].pct !== 0) erro(ctx, "a primeira faixa precisa ser 0%");
  const topo = item.faixas[item.faixas.length - 1];
  if (topo.pct !== 100 && topo.pct !== 50) {
    aviso(ctx, "faixa máxima em " + topo.pct + "% — o padrão da banca é 100 (item inteiro) ou 50 (subitem)");
  }
  const descricoes = item.faixas.map((f) => f.desc.trim().toLowerCase());
  if (new Set(descricoes).size !== descricoes.length) erro(ctx, "duas faixas com a mesma descrição");

  // --- resposta final e conferência ---
  if (!item.respostaFinal) {
    if (item.conferencia) erro(ctx, "tem conferencia mas não tem respostaFinal");
    // Além de explicação, comando que pede EXPRESSÃO simbólica ("em função de
    // N") ou lista de termos também não tem número para conferir — e é formato
    // que a prova usa (2026.1, questão 3a).
    if (!/explique|justifique|demonstre|mostre|prove|interprete|verifique|escreva|liste|descreva|expressão|em função de/i.test(item.comando)) {
      aviso(ctx, "sem respostaFinal e o comando não pede explicação nem expressão — a resposta não seria conferível");
    }
    return;
  }

  const rf = item.respostaFinal;
  if (!rf.rotulo) erro(ctx, "respostaFinal sem rotulo");
  const temAceitas = Array.isArray(rf.aceitas) && rf.aceitas.length > 0;
  if (!temAceitas && !rf.intervalo) erro(ctx, "respostaFinal sem aceitas nem intervalo");
  if (rf.intervalo && (!Array.isArray(rf.intervalo) || rf.intervalo.length !== 2 || rf.intervalo[0] >= rf.intervalo[1])) {
    erro(ctx, "intervalo inválido");
  }

  // A tela tranca a faixa máxima quando a resposta não bate. Isso só é justo se
  // a faixa máxima for MESMO a que exige a resposta certa.
  if (temAceitas) {
    const principal = String(rf.aceitas[0]).trim();
    const numero = comoNumero(principal);
    // Comparar TEXTO aqui daria falso positivo em série: a descrição escreve
    // "2.730" com ponto de milhar e o campo de resposta guarda "2730". Então a
    // checagem é numérica — colhe todo número da descrição, no formato pt-BR, e
    // vê se algum deles é a resposta.
    const citada = numero !== null
      ? numerosDoTexto(topo.desc).some((n) => Math.abs(n - numero) < 1e-9)
      : topo.desc.toLowerCase().indexOf(principal.toLowerCase()) !== -1;
    if (!citada) aviso(ctx, 'faixa máxima não cita a resposta "' + principal + '" — a trava por resposta errada fica arbitrária');
  }

  if (item.conferencia) {
    const r = avaliar(item.conferencia);
    if (r.erro) {
      erro(ctx, "conferencia " + r.erro + ": " + item.conferencia);
      return;
    }
    if (rf.intervalo) {
      if (r.valor < rf.intervalo[0] || r.valor > rf.intervalo[1]) {
        erro(ctx, "conferencia deu " + r.valor + ", fora do intervalo declarado [" + rf.intervalo + "]");
      }
      return;
    }
    const esperado = comoNumero(rf.aceitas[0]);
    if (esperado === null) {
      aviso(ctx, "conferencia existe mas a resposta declarada não é numérica");
      return;
    }
    // tolerância relativa: 1e-9 para inteiros, e meia casa além da precisão
    // declarada para decimais arredondados na mão
    const casas = (String(rf.aceitas[0]).split(/[.,]/)[1] || "").length;
    const tol = casas > 0 ? Math.pow(10, -casas) / 2 + 1e-9 : 1e-9;
    if (Math.abs(r.valor - esperado) > tol) {
      erro(ctx, "CONTA NÃO FECHA — conferencia dá " + r.valor + " e a resposta declarada é " + esperado +
        " (" + item.conferencia + ")");
    }
  } else if (comoNumero(rf.aceitas && rf.aceitas[0]) !== null && !q.origem) {
    aviso(ctx, "resposta numérica sem `conferencia` — a aritmética não foi verificada por máquina");
  }
}

// ---------- relatório ----------

console.log("Banco de dissertativas de Matemática");
console.log("────────────────────────────────────");
Object.keys(porTema).sort().forEach((t) => console.log("  " + String(porTema[t]).padStart(3) + "  " + t));
console.log("  ───");
console.log("  " + String(totalQuestoes).padStart(3) + "  questões (" + totalItens + " subitens)");
const autorais = totalQuestoes - META;
console.log("       " + autorais + " autorais + " + META + " de referência (FGV real)");
console.log("");

if (avisos.length) {
  console.log("AVISOS (" + avisos.length + ")");
  avisos.forEach((a) => console.log("  ~ " + a));
  console.log("");
}
if (erros.length) {
  console.log("ERROS (" + erros.length + ")");
  erros.forEach((e) => console.log("  ✗ " + e));
  console.log("");
  console.log("REPROVADO");
  process.exit(1);
}
console.log("OK — nenhum erro.");
