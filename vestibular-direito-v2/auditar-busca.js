#!/usr/bin/env node
//
// Auditor da aba Buscar: mede quantas questões cada assunto do dicionário
// alcança, nas duas trilhas, e reprova se algum ficar abaixo do piso.
//
// Uso:
//   node auditar-busca.js                    # audita os 163 assuntos, piso 25
//   node auditar-busca.js --piso 20          # outro piso
//   node auditar-busca.js --fixture          # só os termos de currículo
//   node auditar-busca.js --termo "crase"    # o que a busca devolve para um termo
//   node auditar-busca.js --legado           # ver "O TEXTO DE APOIO DA OUTRA TRILHA"
//   node auditar-busca.js --json             # saída para outro script consumir
//
// Sai com código 1 se qualquer assunto ficar abaixo do piso, para encadear com
// build-bundle.ps1 e verify-banco.ps1.
//
// POR QUE ESTE ARQUIVO NÃO TEM UMA CÓPIA DO MOTOR DE BUSCA
//
// A rota óbvia seria copiar buscaCandidatos, buscaSugerirAssuntos e companhia
// de app.js para cá. Copiar é o que garante que um dia as duas versões
// divergem — e uma auditoria que mede um motor diferente do que roda no
// navegador é pior do que auditoria nenhuma, porque dá segurança falsa.
//
// Então este script LÊ app.js e extrai as funções pelo nome, contando chaves,
// e as executa dentro de um contexto `vm` com os poucos globais de que elas
// precisam. O motor auditado é, literalmente, o motor publicado. Se alguém
// renomear uma função, a extração falha alto — com código 1 e o nome — em vez de
// medir a coisa errada em silêncio.
//
// O TEXTO DE APOIO DA OUTRA TRILHA
//
// Foi este auditor que achou o defeito descrito em `buscaTextoApoio` (app.js):
// a busca indexava as questões da trilha secundária sem o texto compartilhado,
// porque `resolveSupportText` lê um global que carregarSecundaria já devolveu
// à trilha ativa. Eram 255 questões em Medicina e 180 em Direito, ~10% de cada
// banco, concentradas em Inglês.
//
// `--legado` reproduz o comportamento anterior — um mapa de textos só, o da
// trilha ativa, para as duas. Serve para medir de novo o tamanho do buraco se
// alguém desfizer a correção sem querer.

"use strict";

const fs = require("fs");
const vm = require("vm");
const path = require("path");

const AQUI = __dirname;
const RAIZ = path.resolve(AQUI, "..");

// ---------------------------------------------------------------- argumentos

const argv = process.argv.slice(2);
const temFlag = (f) => argv.includes(f);
const valorDe = (f, padrao) => {
  const i = argv.indexOf(f);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : padrao;
};

const PISO = parseInt(valorDe("--piso", "25"), 10);
const SO_FIXTURE = temFlag("--fixture");
const LEGADO = temFlag("--legado");
const SAIDA_JSON = temFlag("--json");
// Mede como era antes do banco complementar. Serve para responder "quanto deste
// alcance veio dele?", que é a pergunta que o PLANO-BANCO-PISO-25 faz.
const SEM_EXTRA = temFlag("--sem-extra");
const TERMO_AVULSO = argv.includes("--termo") ? valorDe("--termo", "") : null;
const TRILHA_ATIVA = valorDe("--trilha", "medicina");

// ------------------------------------------------------------- carga de dados

function contextoLimpo() {
  const sandbox = { console };
  sandbox.window = sandbox;
  return vm.createContext(sandbox);
}

function rodarArquivo(ctx, relativo) {
  const abs = path.join(RAIZ, relativo);
  if (!fs.existsSync(abs)) {
    console.error("não encontrei " + relativo + " (rodando a partir de " + RAIZ + ")");
    process.exit(1);
  }
  vm.runInContext(fs.readFileSync(abs, "utf8"), ctx, { filename: abs });
}

const BANCOS = {
  medicina: "vestibular-medicina/data/",
  direito: "vestibular-direito/data/",
  // Economia entra aqui assim que tem subtopics.js e bundle.js, mesmo com a
  // trilha ainda desligada em trilhas.js: a busca cruza bancos, não trilhas
  // oferecidas, e é com três bancos que este auditor passa a cobrir o caminho
  // de DUAS trilhas secundárias -- o que o conserto do outras[0] habilitou e
  // que não tinha como ser exercitado enquanto só existiam dois bancos.
  economia: "vestibular-economia/data/",
};

function carregarBanco(trilha) {
  const ctx = contextoLimpo();
  rodarArquivo(ctx, BANCOS[trilha] + "subtopics.js");
  rodarArquivo(ctx, BANCOS[trilha] + "bundle.js");
  return {
    trilha,
    SUBTOPICS: ctx.window.SUBTOPICS || [],
    QUESTION_BANKS: ctx.window.QUESTION_BANKS || {},
    QUESTION_TEXTS: ctx.window.QUESTION_TEXTS || {},
  };
}

// O banco complementar é a terceira fonte da aba Buscar (ver buscaMontarDocs em
// app.js). Ele entra aqui porque este auditor mede o alcance de cada assunto na
// BUSCA, e a busca o inclui — medir sem ele passaria a reportar um alcance
// menor do que o aluno vê na tela.
function carregarExtra() {
  const ctx = contextoLimpo();
  rodarArquivo(ctx, "vestibular-direito/data/banco-extra.js");
  return {
    SUBTOPICS: ctx.window.SUBTOPICS_EXTRA || [],
    QUESTION_BANKS: ctx.window.QUESTION_BANKS_EXTRA || {},
  };
}

// --------------------------------------------- extração das funções de app.js

const FUNCOES = [
  "resolveSupportText",
  "buscaNormalizar",
  "buscaTokens",
  "buscaRadical",
  "buscaRadicalFrase",
  "buscaTextoApoio",
  "buscaMontarDocs",
  "buscaSubtopicId",
  "buscaConstruirIndice",
  "buscaCandidatos",
  "buscaPontuar",
  "buscaSugerirAssuntos",
  "buscarQuestoes",
];

// Recorta `function nome(...) { ... }` contando chaves. As onze funções alvo
// não têm template literal nem chave desbalanceada dentro de string ou regex —
// e se um dia tiverem, o vm.runInContext lá embaixo levanta SyntaxError, que é
// exatamente o comportamento desejado.
function recortarFuncao(fonte, nome) {
  const inicio = fonte.indexOf("function " + nome + "(");
  if (inicio === -1) return null;
  let profundidade = 0;
  let i = fonte.indexOf("{", inicio);
  if (i === -1) return null;
  for (; i < fonte.length; i++) {
    if (fonte[i] === "{") profundidade++;
    else if (fonte[i] === "}") {
      profundidade--;
      if (profundidade === 0) return fonte.slice(inicio, i + 1);
    }
  }
  return null;
}

function montarMotor() {
  const fonteApp = fs.readFileSync(path.join(AQUI, "app.js"), "utf8");

  const recortes = FUNCOES.map((nome) => {
    const corpo = recortarFuncao(fonteApp, nome);
    if (!corpo) {
      console.error("não achei a função " + nome + " em app.js.");
      console.error("Se ela foi renomeada, atualize a lista FUNCOES deste script —");
      console.error("medir um motor que não é o publicado seria pior do que não medir.");
      process.exit(1);
    }
    return corpo;
  });

  const ctx = contextoLimpo();
  ctx.console = { info: () => {}, warn: () => {}, log: () => {} };
  ctx.performance = { now: () => Date.now() };

  // Os globais que as funções extraídas leem no app real.
  const preludio = `
    var TRILHA = ${JSON.stringify(TRILHA_ATIVA)};
    // Mesmo valor de app.js. É um const de módulo lá, então não vem no recorte
    // das funções — e buscaMontarDocs o lê ao absorver o banco complementar.
    var BUSCA_TRILHA_EXTRA = "extra";
    var buscaDocs = null, buscaIndice = null;
    var buscaConsulta = "", buscaAssuntoId = null;
    var buscaFiltroFrente = null, buscaFiltroFormato = null, buscaFiltroStatus = null;
    // Sem progresso salvo: o auditor mede o banco, não a sessão de ninguém.
    function getAnswers() { return {}; }
    function answerKey(subtopicId, questionId) { return subtopicId + "::" + questionId; }
  `;

  vm.runInContext(preludio + "\n" + recortes.join("\n\n"), ctx, { filename: "app.js (extraído)" });

  FUNCOES.forEach((nome) => {
    if (typeof ctx[nome] !== "function") {
      console.error("a extração de " + nome + " não produziu uma função.");
      process.exit(1);
    }
  });

  return ctx;
}

// ------------------------------------------------------------------- montagem

const ativa = carregarBanco(TRILHA_ATIVA);
// TODAS as outras, não a primeira: buscaMontarDocs passou a receber uma lista
// quando a terceira trilha entrou no registro. Auditar só a primeira mediria um
// índice menor do que o que roda no navegador — exatamente o tipo de segurança
// falsa que o cabeçalho deste arquivo diz que não queremos.
const outrasIds = Object.keys(BANCOS).filter((k) => k !== TRILHA_ATIVA);
const secundarias = outrasIds.map(carregarBanco);

const motor = montarMotor();

const ctxAssuntos = contextoLimpo();
rodarArquivo(ctxAssuntos, "vestibular-direito-v2/assuntos.js");
motor.window.ASSUNTOS = ctxAssuntos.window.ASSUNTOS || [];

motor.window.SUBTOPICS = ativa.SUBTOPICS;
motor.window.QUESTION_BANKS = ativa.QUESTION_BANKS;
motor.window.QUESTION_TEXTS = ativa.QUESTION_TEXTS;
motor.buscaConstruirIndice(secundarias.map((s) => ({
  trilha: s.trilha,
  SUBTOPICS: s.SUBTOPICS,
  QUESTION_BANKS: s.QUESTION_BANKS,
  // No modo --legado a trilha secundária recebe o mapa da ATIVA, que é o que a
  // produção fazia antes da correção — ver o cabeçalho.
  QUESTION_TEXTS: LEGADO ? ativa.QUESTION_TEXTS : s.QUESTION_TEXTS,
})), SEM_EXTRA ? null : carregarExtra());

const ASSUNTOS = motor.window.ASSUNTOS;
const TOTAL_DOCS = motor.buscaDocs.length;

// Roda a busca real. `assuntoId` nulo = texto livre, como quem só digitou.
function buscar(consulta, assuntoId) {
  motor.buscaConsulta = consulta || "";
  motor.buscaAssuntoId = assuntoId || null;
  motor.buscaFiltroFrente = null;
  motor.buscaFiltroFormato = null;
  motor.buscaFiltroStatus = null;
  return motor.buscarQuestoes().resultados;
}

function sugerir(consulta, limite) {
  return motor.buscaSugerirAssuntos(consulta, limite || 6);
}

function contarPorTrilha(resultados) {
  const c = {};
  resultados.forEach((r) => { c[r.doc.trilha] = (c[r.doc.trilha] || 0) + 1; });
  return c;
}

// ------------------------------------------------------------------ relatório

const pad = (s, n) => String(s).padEnd(n);
const padl = (s, n) => String(s).padStart(n);

function auditarAssuntos() {
  return ASSUNTOS.map((a) => {
    const r = buscar("", a.id);
    const porTrilha = contarPorTrilha(r);
    return {
      id: a.id,
      nome: a.nome,
      area: a.area || "",
      frentes: a.frentes,
      total: r.length,
      porTrilha,
      deficit: Math.max(0, PISO - r.length),
    };
  }).sort((x, y) => x.total - y.total);
}

function carregarFixture() {
  const p = path.join(AQUI, "fixtures", "termos-curriculo.json");
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

// Um termo de currículo passa se o aluno chega a `PISO` questões por algum
// caminho que a tela oferece: o texto livre que já aparece, ou o primeiro chip
// de assunto sugerido. Nenhum dos dois exige adivinhação — os dois estão na
// tela no momento em que ele para de digitar.
function auditarFixture(fx) {
  return fx.termos.map((t) => {
    const livre = buscar(t.termo, null).length;
    const sugestoes = sugerir(t.termo, 6);
    const primeira = sugestoes[0] || null;
    const viaAssunto = primeira ? buscar(t.termo, primeira.id).length : 0;
    const melhor = Math.max(livre, viaAssunto);
    return {
      materia: t.materia,
      termo: t.termo,
      livre,
      sugestao: primeira ? primeira.nome : null,
      sugestoes: sugestoes.map((s) => s.nome),
      viaAssunto,
      melhor,
      ok: melhor >= PISO,
    };
  });
}

function main() {
  if (TERMO_AVULSO) {
    const livre = buscar(TERMO_AVULSO, null);
    const sug = sugerir(TERMO_AVULSO, 6);
    console.log(`termo: "${TERMO_AVULSO}"`);
    console.log(`  texto livre: ${livre.length} questões ` + JSON.stringify(contarPorTrilha(livre)));
    if (sug.length === 0) {
      console.log("  sugestões: (nenhuma)");
    } else {
      console.log("  sugestões:");
      sug.forEach((a) => {
        const r = buscar(TERMO_AVULSO, a.id);
        console.log(`    ${pad(a.nome, 40)} ${padl(r.length, 5)} questões  [${a.area}]`);
      });
    }
    return 0;
  }

  const fx = carregarFixture();
  const assuntos = SO_FIXTURE ? [] : auditarAssuntos();
  const fixture = fx ? auditarFixture(fx) : null;

  if (SAIDA_JSON) {
    console.log(JSON.stringify({
      piso: PISO, trilhaAtiva: TRILHA_ATIVA, legado: LEGADO,
      totalDocs: TOTAL_DOCS, assuntos, fixture,
    }, null, 2));
  } else {
    console.log(`banco: ${TOTAL_DOCS} questões indexadas ` +
      `(${TRILHA_ATIVA} ativa + ${outrasIds.join(" + ")})` + (LEGADO ? "  [--legado]" : ""));
    console.log(`piso: ${PISO} questões por assunto\n`);

    if (!SO_FIXTURE) {
      const abaixo = assuntos.filter((a) => a.deficit > 0);
      console.log(`=== ASSUNTOS: ${abaixo.length} de ${assuntos.length} abaixo do piso ===`);
      if (abaixo.length > 0) {
        console.log(pad("ASSUNTO", 40) + pad("ÁREA", 22) + padl("HOJE", 5) + padl("FALTA", 7));
        console.log("-".repeat(76));
        abaixo.forEach((a) => {
          console.log(pad(a.nome.slice(0, 39), 40) + pad(a.area.slice(0, 21), 22) +
            padl(a.total, 5) + padl(a.deficit, 7));
        });
        console.log(`\ndéficit somado: ${abaixo.reduce((s, a) => s + a.deficit, 0)} questões`);
      }
    }

    if (fixture) {
      const ruins = fixture.filter((t) => !t.ok);
      console.log(`\n=== TERMOS DE CURRÍCULO: ${ruins.length} de ${fixture.length} abaixo do piso ===`);
      ruins.forEach((t) => {
        console.log(`  ${pad(t.materia, 12)} "${t.termo}"`);
        console.log(`  ${" ".repeat(12)} livre=${t.livre} via-assunto=${t.viaAssunto}` +
          `  sugestões: ${t.sugestoes.join(" | ") || "(nenhuma)"}`);
      });
      if (ruins.length === 0) console.log("  nenhum");
    } else {
      console.log("\n(fixtures/termos-curriculo.json não existe — pulei a checagem de currículo)");
    }
  }

  const falhouAssunto = !SO_FIXTURE && assuntos.some((a) => a.deficit > 0);
  const falhouFixture = fixture ? fixture.some((t) => !t.ok) : false;
  return falhouAssunto || falhouFixture ? 1 : 0;
}

process.exit(main());
