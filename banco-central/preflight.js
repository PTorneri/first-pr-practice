#!/usr/bin/env node
// Pré-voo de um lote de questões novas, antes de encostar no arquivo-fonte.
//
// Roda os três testes que sempre reprovaram meus lotes, de uma vez só, e --
// o ponto principal -- diz QUAL regex rival disparou em QUAL alternativa, com
// o trecho exato que casou. Sem isso o conserto é adivinhação: eu reescrevia a
// alternativa inteira sem saber que o culpado era "atriz" dentro de "matriz".
//
//   node preflight.js <lote.json> <frente> <subtema-alvo>
//
// A tabela de regras vem do próprio classificar-subtemas.js. Nada é copiado à
// mão -- era daí que vinha o pior modo de falha: eu validava contra uma cópia
// da tabela que já tinha divergido da real, o lote passava aqui e caía lá.

const fs = require("fs");
const path = require("path");

const RAIZ = __dirname;
const mod = require(path.join(RAIZ, "classificar-subtemas.js"));
const { SUBTEMAS, TABELA_DA_FRENTE, REDIRECIONA } = mod;

// ---------------------------------------------------------------- classificação
// Réplica fiel de textoDe/candidatos/classificar. São 20 linhas; o que não pode
// divergir é a TABELA, e essa vem importada.

function textoDe(q) {
  return [q.enunciado, q.explicacao, Object.values(q.alternativas || {}).join(" "), q.texto_apoio || ""].join(" ");
}

function tabelaDe(frente) {
  return SUBTEMAS[TABELA_DA_FRENTE[frente] || frente];
}

function candidatos(frente) {
  const destinos = REDIRECIONA[frente] || [frente];
  let lista = [];
  destinos.forEach((d) => {
    const t = tabelaDe(d);
    if (!t) throw new Error("frente sem tabela: " + d);
    lista = lista.concat(t.map((s) => Object.assign({ frente: d }, s)));
  });
  return lista;
}

function placarDe(frente, q) {
  const lista = candidatos(frente);
  const txt = textoDe(q);
  const placar = lista.map((s, i) => ({
    id: s.id, ordem: i, regras: s.regras,
    pontos: s.regras.reduce((soma, [rx, peso]) => soma + (rx.test(txt) ? peso : 0), 0),
  }));
  placar.sort((a, b) => b.pontos - a.pontos || a.ordem - b.ordem);
  return placar;
}

// Onde exatamente a regra casou. Testa campo a campo em vez do texto concatenado,
// para poder dizer "alternativa c" em vez de "em algum lugar da questão".
function ondeCasou(q, rx) {
  const campos = [["enunciado", q.enunciado], ["explicacao", q.explicacao]];
  for (const l of Object.keys(q.alternativas || {})) campos.push(["alt " + l, q.alternativas[l]]);
  if (q.texto_apoio) campos.push(["apoio", q.texto_apoio]);
  // Mostrar só o trecho casado não basta: "pena" pode ser a palavra ou o miolo
  // de "apenas", e são consertos opostos -- um é legítimo, o outro é vazamento.
  // Por isso o match sai com ~14 caracteres de cada lado, e entre [colchetes].
  const achados = [];
  for (const [nome, valor] of campos) {
    if (!valor) continue;
    const s = String(valor);
    const m = s.match(rx);
    if (!m) continue;
    const i = m.index;
    const ini = Math.max(0, i - 14);
    const fim = Math.min(s.length, i + m[0].length + 14);
    const ctx = (ini > 0 ? "…" : "") + s.slice(ini, i) + "[" + m[0] + "]" +
      s.slice(i + m[0].length, fim) + (fim < s.length ? "…" : "");
    achados.push(nome + ': ' + ctx.replace(/\s+/g, " "));
  }
  return achados;
}

// ---------------------------------------------------------------- chutabilidade
const ABSOLUTO_RX = /\b(sempre|nunca|jamais|todo|todos|toda|todas|qualquer|exclusivamente|unicamente|impossível|garante|em nenhum)\b/i;
const AUTORREF_RX = /(,\s*(ignorando|quando|posição|tese|ideia|generalização|equiparação|hipótese|proposta|indiferença|deslocamento|traço|equívoco|confusão|leitura|inversão|atribuição)\b)|diametralmente opost|contradição direta|\bque \w+ (rejeita|recusa|atribui|nega|contraria)\b|\bo que contraria\b/i;

// Réplica da cascata de Measure-Chutabilidade: o aluno que não lê o enunciado.
// Devolve a letra que ele marcaria, ou null se as pistas não bastarem.
function chuteDe(q) {
  const alts = q.alternativas || {};
  const letras = Object.keys(alts);
  if (letras.length < 2) return { letra: null, tell: null };

  // tell 1 -- a certa é a única mais comprida?
  const comp = letras.map((l) => ({ l, n: String(alts[l]).length }));
  const maxLen = Math.max(...comp.map((c) => c.n));
  const maisLongas = comp.filter((c) => c.n === maxLen);
  if (maisLongas.length === 1) return { letra: maisLongas[0].l, tell: "1-mais-longa" };

  // tell 2 -- descarta as que se autorrefutam
  let vivas = letras.filter((l) => !AUTORREF_RX.test(String(alts[l])));
  if (vivas.length === 0) vivas = letras.slice();

  // tell 3 -- descarta as categóricas, pega a mais comprida que sobrou
  let sobrou = vivas.filter((l) => !ABSOLUTO_RX.test(String(alts[l])));
  if (sobrou.length === 0) sobrou = vivas;
  const c2 = sobrou.map((l) => ({ l, n: String(alts[l]).length }));
  const max2 = Math.max(...c2.map((c) => c.n));
  const top2 = c2.filter((c) => c.n === max2);
  if (top2.length === 1) return { letra: top2[0].l, tell: "3-sobrou-uma" };
  return { letra: null, tell: null };
}

// ---------------------------------------------------------------- relatório
const [, , arquivo, frente, alvo] = process.argv;
if (!arquivo || !frente || !alvo) {
  console.error("uso: node preflight.js <lote.json> <frente> <subtema-alvo>");
  process.exit(2);
}

const lote = JSON.parse(fs.readFileSync(arquivo, "utf8"));
const questoes = Array.isArray(lote) ? lote : lote.questoes;

let falhasClass = 0, acertosChute = 0, comChute = 0;
const histo = {};
const apertadas = [];

console.log("== CLASSIFICAÇÃO ==  alvo: " + alvo + "  (frente " + frente + ")\n");

for (const q of questoes) {
  const placar = placarDe(frente, q);
  const venc = placar[0];
  const seg = placar[1] || { pontos: 0 };
  const margem = venc.pontos - seg.pontos;
  const ok = venc.id === alvo;

  if (!ok) {
    falhasClass++;
    console.log("FALHA  " + q.id + "  -> caiu em " + venc.id + " (" + venc.pontos + " pts), alvo ficou com " +
      (placar.find((p) => p.id === alvo) || { pontos: 0 }).pontos + " pts");
    // por que o rival ganhou -- o dado que economiza a iteração
    for (const [rx, peso] of venc.regras) {
      const onde = ondeCasou(q, rx);
      if (onde.length) console.log("         +" + peso + "  " + onde.join(" | "));
    }
    console.log("");
  } else if (margem <= 2) {
    apertadas.push(q.id + " (margem " + margem + " sobre " + seg.id + ")");
  }
}

if (falhasClass === 0) console.log("todas as " + questoes.length + " caem em " + alvo + "\n");
if (apertadas.length) {
  console.log("margem apertada -- viram falha ao menor reparo de texto:");
  apertadas.forEach((a) => console.log("   " + a));
  console.log("");
}

// O campo da resposta certa é `resposta`, não `gabarito`. Um lote inteiro passou
// como APROVADO com 0% de chutabilidade porque o nome errado devolvia "" para
// todas -- nenhum chute batia com "" e o teste nunca reprovava. Daí a checagem
// abaixo: sem resposta legível, é erro de ferramenta, não lote limpo.
console.log("== CHUTABILIDADE ==\n");
const semResposta = questoes.filter((q) => !/^[a-e]$/i.test(String(q.resposta || "").trim()));
if (semResposta.length) {
  console.error("ABORTADO: " + semResposta.length + " questões sem campo `resposta` a-e (ex.: " + semResposta[0].id + ")");
  process.exit(2);
}
for (const q of questoes) {
  const g = String(q.resposta).trim().toLowerCase();
  histo[g] = (histo[g] || 0) + 1;
  const { letra, tell } = chuteDe(q);
  if (letra) {
    comChute++;
    if (letra === g) {
      acertosChute++;
      console.log("  CHUTÁVEL  " + q.id + "  gabarito " + g + " via " + tell);
    }
  }
}
const pct = questoes.length ? Math.round((acertosChute / questoes.length) * 1000) / 10 : 0;
console.log("\n  " + acertosChute + "/" + questoes.length + " chutáveis = " + pct + "%   (alvo <= 25%, acaso = 20%)");

const letras = ["a", "b", "c", "d", "e"];
console.log("\n== GABARITOS ==");
console.log("  " + letras.map((l) => l + ":" + (histo[l] || 0)).join("  "));
const maxG = Math.max(...letras.map((l) => histo[l] || 0));
if (maxG > Math.ceil(questoes.length / 5) + 2) console.log("  >> desbalanceado, redistribua");

console.log("");
const problema = falhasClass > 0 || pct > 25 || maxG > Math.ceil(questoes.length / 5) + 2;
console.log(problema ? "REPROVADO -- corrija e rode de novo" : "APROVADO -- pode inserir na fonte");
process.exit(problema ? 1 : 0);
