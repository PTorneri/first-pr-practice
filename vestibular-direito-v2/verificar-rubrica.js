#!/usr/bin/env node
//
// Verificador da rubrica de redação.
//
// A conta da nota é a única parte da correção por IA que dá pra verificar sem
// gastar token, e é justamente a que não pode errar: nota que oscila entre
// execuções ensina o aluno a pedir correção de novo até gostar do número.
//
// Carrega rubrica.js num contexto `vm` com um `window` falso — o mesmo caminho
// que auditar-busca.js usa para auditar o motor de busca publicado. O que se
// verifica aqui é literalmente o arquivo que o navegador carrega, e não uma
// cópia que um dia diverge.
//
// Uso: node vestibular-direito-v2/verificar-rubrica.js
// Sai com código 1 na primeira falha acumulada.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const contexto = { window: {} };
vm.createContext(contexto);
vm.runInContext(
  fs.readFileSync(path.join(__dirname, "rubrica.js"), "utf8"),
  contexto,
  { filename: "rubrica.js" }
);
const R = contexto.window.VD_RUBRICA;

let falhas = 0;
let total = 0;

function conferir(nome, real, esperado) {
  total++;
  const a = JSON.stringify(real);
  const b = JSON.stringify(esperado);
  if (a === b) return;
  falhas++;
  console.error("FALHOU  " + nome + "\n  esperado: " + b + "\n  veio:     " + a);
}

// Atalho: uma rubrica completa, com as bandas dadas.
function r(adequacao, argumentacao, estrutura, linguagem) {
  return {
    adequacao: { banda: adequacao },
    argumentacao: { banda: argumentacao },
    estrutura: { banda: estrutura },
    linguagem: { banda: linguagem },
  };
}

const CHEIA = { rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true };

// Atalho para os testes de desconto: rubrica cheia, e só o que interessa varia.
function comMedidas(medidas) {
  return Object.assign(
    { rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true },
    medidas
  );
}

// ---------- A tabela ----------

conferir(
  "os quatro eixos, nesta ordem",
  R.EIXOS.map((e) => e.chave),
  ["adequacao", "argumentacao", "estrutura", "linguagem"]
);
conferir("os máximos somam 10", R.EIXOS.reduce((s, e) => s + e.maximo, 0), 10);
conferir(
  "cada eixo tem uma banda que vale o próprio máximo",
  R.EIXOS.every((e) => e.bandas.some((b) => b.pontos === e.maximo)),
  true
);
conferir(
  "as bandas de cada eixo sobem em pontos",
  R.EIXOS.every((e) => e.bandas.every((b, i) => i === 0 || b.pontos >= e.bandas[i - 1].pontos)),
  true
);
conferir("argumentação não tem banda abaixo de 1,0", R.EIXOS[1].bandas[0].pontos, 1);
conferir("a banda mais alta de cada eixo não tem marcador",
  R.EIXOS.every((e) => e.bandas[e.bandas.length - 1].marcadores.length === 0), true);
conferir("toda banda tem descritor", R.EIXOS.every((e) => e.bandas.every((b) => b.descritor.length > 20)), true);
conferir(
  "não há chave de marcador repetida dentro do mesmo eixo",
  R.EIXOS.every((e) => {
    const todas = e.bandas.reduce((acc, b) => acc.concat(b.marcadores.map((m) => m.chave)), []);
    return new Set(todas).size === todas.length;
  }),
  true
);

// ---------- A conta ----------

conferir("nota cheia", R.calcular(CHEIA).nota, 10);
conferir("nota cheia é competitiva", R.calcular(CHEIA).faixa, "competitiva");
conferir("nota cheia não tem eixo mais caro", R.calcular(CHEIA).eixoMaisCaro, null);

conferir(
  "soma simples: 1,0 + 2,5 + 2,0 + 2,0",
  R.calcular({ rubrica: r("adequado", "bem_encaminhado", "bem_encaminhada", "bem_encaminhada"), palavras: 220, temTitulo: true }).nota,
  7.5
);

// Trava 1: adequação parcial limita argumentação a 1,5.
conferir(
  "adequação 0,5 limita argumentação a 1,5",
  R.calcular({ rubrica: r("parcial", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true }).nota,
  0.5 + 1.5 + 2.5 + 2.5
);
conferir(
  "a limitação aparece marcada no eixo",
  R.calcular({ rubrica: r("parcial", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true })
    .porEixo.find((e) => e.chave === "argumentacao").limitado,
  true
);
conferir(
  "argumentação já abaixo de 1,5 não sobe por causa da trava",
  R.calcular({ rubrica: r("parcial", "insatisfatorio", "excelente", "excelente"), palavras: 220, temTitulo: true }).nota,
  0.5 + 1.0 + 2.5 + 2.5
);

// Trava 2: adequação zero zera a argumentação, mas não os outros dois.
conferir(
  "fuga ao tema zera argumentação e mantém estrutura e linguagem",
  R.calcular({ rubrica: r("inadequado", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true }).nota,
  5
);
conferir(
  "fuga ao tema é refazer, mesmo com 5,0",
  R.calcular({ rubrica: r("inadequado", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true }).faixa,
  "refazer"
);

// Trava 3: anulado zera tudo.
const anulada = R.calcular({ rubrica: r("anulado", "excelente", "excelente", "excelente"), palavras: 220, temTitulo: true });
conferir("anulado zera a nota", anulada.nota, 0);
conferir("anulado marca anulada", anulada.anulada, true);
conferir("anulado é refazer", anulada.faixa, "refazer");
conferir("anulado não avalia os demais eixos", anulada.porEixo.length, 1);

// ---------- Descontos ----------

conferir(
  "texto curto perde 0,5",
  R.calcular({ rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 159, temTitulo: true }).nota,
  9.5
);
conferir(
  "texto longo perde 0,5",
  R.calcular({ rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 291, temTitulo: true }).nota,
  9.5
);
conferir(
  "os limites da faixa não descontam",
  [
    R.calcular({ rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 160, temTitulo: true }).nota,
    R.calcular({ rubrica: r("adequado", "excelente", "excelente", "excelente"), palavras: 290, temTitulo: true }).nota,
  ],
  [10, 10]
);
// ---------- Título: só desconta onde o edital exige ----------
//
// A regra anterior descontava 0,5 de TODA redação sem título, e a tela afirmava
// que "a banca cobra título". É falso na maioria das bancas destas trilhas: os
// estudos de anatomia deste repositório registram título como RECOMENDÁVEL na
// FGV, e "o comando não pede título" em Unesp, Unifesp, Einstein e Santa Casa.
// Obrigatório mesmo só no formato Insper, onde a questão-tema é copiada como
// título. Estas conferências existem para que ninguém restaure o desconto
// universal sem ver um teste vermelho.

conferir(
  "sem título NÃO desconta no formato padrão (FGV)",
  R.calcular(comMedidas({ temTitulo: false })).nota,
  10
);
conferir(
  "sem título não desconta quando o formato vem explícito como fgv",
  R.calcular(comMedidas({ temTitulo: false, formato: "fgv" })).nota,
  10
);
conferir(
  "formato desconhecido cai no da FGV, e também não desconta título",
  R.calcular(comMedidas({ temTitulo: false, formato: "enem" })).nota,
  10
);
conferir(
  "sem título perde 0,5 no formato Insper",
  R.calcular(comMedidas({ temTitulo: false, formato: "insper" })).nota,
  9.5
);
conferir(
  "com título, o formato Insper não desconta nada",
  R.calcular(comMedidas({ temTitulo: true, formato: "insper" })).nota,
  10
);
conferir(
  "no formato FGV nenhum desconto de título aparece nomeado",
  R.calcular(comMedidas({ temTitulo: false })).descontos.map((d) => d.chave),
  []
);
conferir(
  "os dois descontos somam, e só no formato que exige título",
  R.calcular(comMedidas({ palavras: 40, temTitulo: false, formato: "insper" })).nota,
  9
);
conferir(
  "os descontos aplicados vêm nomeados",
  R.calcular(comMedidas({ palavras: 40, temTitulo: false, formato: "insper" }))
    .descontos.map((d) => d.chave),
  ["extensao", "titulo"]
);
conferir(
  "o desconto de título diz em qual formato ele é obrigatório",
  R.calcular(comMedidas({ temTitulo: false, formato: "insper" }))
    .descontos.find((d) => d.chave === "titulo")
    .rotulo.indexOf("Insper") >= 0,
  true
);

// ---------- Extensão: a faixa acompanha o formato ----------
//
// A FGV pede 20 a 30 linhas; o Insper, 10 a 30. Uma redação Insper de 13 linhas
// (~117 palavras) é perfeitamente legal, e a faixa fixa da FGV lhe tirava 0,5.

conferir(
  "a tabela conhece os dois formatos",
  Object.keys(R.FORMATOS).sort(),
  ["fgv", "insper"]
);
conferir("o formato padrão é o da FGV", R.formato(undefined).chave, "fgv");
conferir("formato desconhecido cai no da FGV", R.formato("puc").chave, "fgv");
conferir(
  "só o Insper exige título",
  [R.FORMATOS.fgv.tituloObrigatorio, R.FORMATOS.insper.tituloObrigatorio],
  [false, true]
);
conferir(
  "a faixa do Insper começa mais baixa que a da FGV",
  R.FORMATOS.insper.palavrasMin < R.FORMATOS.fgv.palavrasMin,
  true
);
conferir(
  "o teto é o mesmo nos dois formatos (30 linhas)",
  [R.FORMATOS.fgv.linhasMax, R.FORMATOS.insper.linhasMax, R.FORMATOS.fgv.palavrasMax === R.FORMATOS.insper.palavrasMax],
  [30, 30, true]
);
conferir(
  "13 linhas (117 palavras) descontam na FGV",
  R.calcular(comMedidas({ palavras: 117 })).nota,
  9.5
);
conferir(
  "as mesmas 13 linhas NÃO descontam no formato Insper",
  R.calcular(comMedidas({ palavras: 117, formato: "insper" })).nota,
  10
);
conferir(
  "os limites da faixa do Insper não descontam",
  [
    R.calcular(comMedidas({ palavras: 80, formato: "insper" })).nota,
    R.calcular(comMedidas({ palavras: 290, formato: "insper" })).nota,
  ],
  [10, 10]
);
conferir(
  "uma palavra abaixo do mínimo do Insper já desconta",
  R.calcular(comMedidas({ palavras: 79, formato: "insper" })).nota,
  9.5
);
conferir(
  "acima do teto desconta nos dois formatos",
  [
    R.calcular(comMedidas({ palavras: 291 })).nota,
    R.calcular(comMedidas({ palavras: 291, formato: "insper" })).nota,
  ],
  [9.5, 9.5]
);
conferir(
  "o desconto de extensão nomeia o formato que o mediu",
  [
    R.calcular(comMedidas({ palavras: 40 })).descontos[0].rotulo.indexOf("FGV") >= 0,
    R.calcular(comMedidas({ palavras: 40, formato: "insper" })).descontos[0].rotulo.indexOf("Insper") >= 0,
  ],
  [true, true]
);

// A conferência anterior a esta ("descontos não levam a nota abaixo de zero"
// contra uma única combinação) era tautológica: com a tabela atual, a menor
// soma bruta possível entre eixos não anulados é 1,0 (adequação "inadequado",
// que já zera a argumentação pela trava) e o desconto máximo possível é 1,0 —
// a subtração nunca fica negativa, então o teste passaria igual com ou sem o
// `Math.max(0, ...)` em rubrica.js. A guarda fica no código; o que muda aqui é
// a conferência, que varre toda combinação de bandas e afirma a invariante de
// verdade: a soma bruta menos os descontos nunca é negativa, e o pior caso
// pousa exatamente em zero.
//
// O piso em zero é guarda, não caminho: com a tabela de hoje nenhuma
// combinação chega perto de negativo. Esta conferência afirma exatamente
// isso — a invariante que torna a guarda inalcançável. Quem um dia
// acrescentar um desconto maior (a gramática, por exemplo, que ficou de
// fora de propósito) vê esta linha falhar e sabe por quê, em vez de
// descobrir por uma nota negativa na tela.
let menorSobra = Infinity;
R.EIXOS[0].bandas.forEach((a) =>
  R.EIXOS[1].bandas.forEach((b) =>
    R.EIXOS[2].bandas.forEach((c) =>
      R.EIXOS[3].bandas.forEach((d) => {
        // O pior caso de desconto só existe no formato Insper, que é o único
        // que cobra título: 0,5 de extensão mais 0,5 de título. Na FGV o
        // abatimento máximo é 0,5, e a invariante ficaria frouxa.
        const r0 = R.calcular({
          rubrica: r(a.chave, b.chave, c.chave, d.chave),
          palavras: 40,
          temTitulo: false,
          formato: "insper",
        });
        if (!r0.ok || r0.anulada) return;
        const bruta = r0.porEixo.reduce((s, x) => s + x.pontos, 0);
        const abatido = r0.descontos.reduce((s, x) => s + x.valor, 0);
        menorSobra = Math.min(menorSobra, Math.round((bruta - abatido) * 10) / 10);
      })
    )
  )
);
conferir("nenhuma combinação de bandas chega a nota negativa", menorSobra >= 0, true);
conferir("a combinação mais baixa possível pousa em zero", menorSobra, 0);

// ---------- Faixa ----------

conferir(
  "7,0 é competitiva",
  R.calcular({ rubrica: r("adequado", "pouco_convincente", "bem_encaminhada", "bem_encaminhada"), palavras: 220, temTitulo: true }).faixa,
  "competitiva"
);
conferir(
  "4,0 é precisa_ajuste",
  R.calcular({ rubrica: r("adequado", "insatisfatorio", "fragil", "fragil"), palavras: 220, temTitulo: true }).faixa,
  "precisa_ajuste"
);
conferir(
  "3,5 é refazer",
  R.calcular({ rubrica: r("adequado", "insatisfatorio", "inadequada", "fragil"), palavras: 220, temTitulo: true }).faixa,
  "refazer"
);

// ---------- Eixo mais caro ----------

conferir(
  "o eixo mais caro é o de maior perda absoluta",
  R.calcular({ rubrica: r("adequado", "pouco_convincente", "bem_encaminhada", "excelente"), palavras: 220, temTitulo: true }).eixoMaisCaro,
  "argumentacao"
);
// Correção ao brief: o exemplo original (adequação "parcial") não monta um
// empate de verdade — argumentação perde 2,5 contra 0,5 dos outros dois eixos.
// Este exemplo empata estrutura e linguagem, cada uma perdendo 2,0 do próprio
// máximo de 2,5, e confere que o desempate cai para a ordem de EIXOS (estrutura
// vem antes de linguagem).
conferir(
  "perda igual desempata pela ordem dos eixos",
  R.calcular({ rubrica: r("adequado", "excelente", "inadequada", "inadequada"), palavras: 220, temTitulo: true }).eixoMaisCaro,
  "estrutura"
);

// O ramo `x.maximo > maisCaro.maximo` (desempate por peso) existe em
// rubrica.js para o caso em que um eixo de peso maior aparece DEPOIS, na
// ordem de EIXOS, de um eixo de peso menor com a mesma perda — aí o de maior
// peso venceria mesmo sem ser o primeiro encontrado. Uma varredura exaustiva
// de todas as 4×6×5×5 combinações de banda (feita para o Achado 1, acima)
// não encontrou nenhuma em que isso aconteça: sempre que argumentação (o
// único eixo de peso diferente dos outros três, e o único que vem antes de
// dois eixos de peso igual ao dele) empata em perda com estrutura ou
// linguagem, argumentação já é a de maior peso E já é a primeira na ordem —
// os dois critérios sempre concordam com a tabela atual. E quando adequação
// (peso 1, o único mais leve que os demais) perde pontos, a trava de
// dependência infla a perda de argumentação por um valor maior que a própria
// perda de adequação, então elas nunca empatam. Não há, portanto, combinação
// que force o desempate por peso a *mudar* o resultado que a ordem já daria —
// e por isso este arquivo não afirma esse ramo com uma conferência própria.
// Ele continua coberto pela execução (a comparação roda a cada empate), só
// não há hoje um cenário em que reverter a lógica do `>` faria um teste
// falhar. Quem adicionar uma quinta banda de peso diferente entre
// argumentação e estrutura/linguagem deve reavaliar esta nota.

// ---------- Entrada inválida ----------

const semEixo = R.calcular({ rubrica: { adequacao: { banda: "adequado" } }, palavras: 220, temTitulo: true });
conferir("eixo ausente não produz nota", semEixo.ok, false);
conferir("eixo ausente devolve nota nula", semEixo.nota, null);
conferir("eixo ausente diz qual faltou", semEixo.motivo.indexOf("argumentacao") >= 0, true);

const bandaInvalida = R.calcular({ rubrica: r("adequado", "otimo", "excelente", "excelente"), palavras: 220, temTitulo: true });
conferir("banda fora do enum não produz nota", bandaInvalida.ok, false);
conferir("banda fora do enum devolve nota nula", bandaInvalida.nota, null);

// Rubrica PARCIAL: ia.js deixou de devolver `rubrica: null` quando um eixo não
// valida, e passou a devolver o objeto com `null` naquele eixo. O motivo está
// lá; o que interessa aqui é que a conta continua RECUSANDO — nota parcial
// seria nota inventada — e é essa recusa que faz o recado "o corretor não
// preencheu a rubrica inteira" aparecer na tela em vez de a correção sumir.
const eixoNulo = R.calcular({
  rubrica: {
    adequacao: { banda: "adequado" },
    argumentacao: null,
    estrutura: { banda: "excelente" },
    linguagem: { banda: "excelente" },
  },
  palavras: 220,
  temTitulo: true,
});
conferir("eixo nulo não produz nota", eixoNulo.ok, false);
conferir("eixo nulo devolve nota nula", eixoNulo.nota, null);
conferir("eixo nulo diz qual eixo falhou", eixoNulo.motivo.indexOf("argumentacao") >= 0, true);

// ---------- A trava que impede o rebaixamento de anular ----------
//
// ia.js rebaixa um eixo uma banda quando o corretor não cita trecho nenhum.
// Isso foi desenhado para a escala de seis bandas da argumentação; em adequacao
// o degrau de baixo é "anulado", que ZERA a redação inteira e acusa o candidato
// de usar modelo pronto. A guarda em normalizarEixo depende destes dois fatos
// da tabela — se alguém reordenar as bandas, é aqui que se descobre.
conferir("'anulado' é a banda mais baixa de adequacao", R.EIXOS[0].bandas[0].chave, "anulado");
conferir(
  "logo acima de 'anulado' vem 'inadequado' — o degrau que o rebaixamento não pode descer",
  R.EIXOS[0].bandas[1].chave,
  "inadequado"
);
conferir(
  "nenhum outro eixo tem banda 'anulado'",
  R.EIXOS.slice(1).every((e) => e.bandas.every((b) => b.chave !== "anulado")),
  true
);
conferir(
  "o descritor de 'anulado' avisa que ela exige evidência forte",
  R.EIXOS[0].bandas[0].descritor.indexOf("evidência forte") >= 0,
  true
);

// ---------- Bloco do prompt ----------

const bloco = R.blocoDoPrompt();
conferir(
  "o bloco do prompt cita todas as bandas",
  R.EIXOS.every((e) => e.bandas.every((b) => bloco.indexOf(b.chave) >= 0)),
  true
);
conferir(
  "o bloco do prompt cita todos os marcadores",
  R.EIXOS.every((e) => e.bandas.every((b) => b.marcadores.every((m) => bloco.indexOf(m.chave) >= 0))),
  true
);
conferir("o bloco do prompt não contém número de pontos", /\d,\d/.test(bloco), false);

// ---------- Acoplamento com ia.js ----------
//
// O schema e o prompt têm que sair de VD_RUBRICA, não de uma cópia escrita à
// mão. Uma cópia é o que garante que um dia as duas listas divergem — e o
// modelo passaria a escolher bandas que a conta não conhece, derrubando a nota
// inteira em silêncio.

const fonteIA = fs.readFileSync(path.join(__dirname, "ia.js"), "utf8");

conferir("ia.js lê a rubrica do global", fonteIA.indexOf("window.VD_RUBRICA") >= 0, true);
conferir("ia.js interpola o bloco de prompt", fonteIA.indexOf("blocoDoPrompt()") >= 0, true);
conferir("ia.js calcula a nota pela rubrica", fonteIA.indexOf(".calcular(") >= 0, true);

const slugsSoltos = [];
R.EIXOS.forEach((e) => {
  e.bandas.forEach((b) => {
    b.marcadores.forEach((mk) => {
      if (fonteIA.indexOf('"' + mk.chave + '"') >= 0) slugsSoltos.push(mk.chave);
    });
  });
});
conferir("ia.js não repete marcador à mão", slugsSoltos, []);

// O corretor e o aluno têm que receber o MESMO fato sobre fuga ao tema. A tela
// (app.js) diz "na sua banca, zera a prova inteira"; a instrução do corretor
// chegou a dizer só "compromete a prova inteira", que lê como "prejudica".
conferir("ia.js diz ao corretor que fuga ao tema ZERA a prova", /ZERA a prova/.test(fonteIA), true);
conferir(
  "ia.js não voltou a amenizar a fuga ao tema",
  fonteIA.indexOf("compromete a prova inteira") >= 0,
  false
);

// ia.js é importado ESTATICAMENTE por auth.js: um erro na avaliação do topo
// deste módulo derruba login, sync, feedback e portão de assinatura junto. Ler
// a rubrica com `|| null` é o que mantém tudo isso em pé se rubrica.js faltar.
conferir("ia.js tolera rubrica.js ausente", fonteIA.indexOf("window.VD_RUBRICA || null") >= 0, true);
conferir(
  "ia.js recusa a correção de redação sem rubrica, com motivo próprio",
  fonteIA.indexOf('"sem-rubrica"') >= 0,
  true
);

// ---------- Acoplamento com app.js ----------
//
// O título da redação NÃO pode voltar para dentro de vd_redacaoAnswers. O app
// publicado faz escapeHtml(answers[id] || "") sobre esse valor: um objeto ali
// vira "[object Object]" na caixa de redação, o aluno digita uma letra por cima
// e o sync sobe isso como a versão mais recente — a redação some nos dois
// aparelhos, em silêncio. Por isso o valor é string pura e o título mora em
// vd_redacaoTitulos.

const fonteApp = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");

conferir("app.js guarda o título em chave própria", fonteApp.indexOf("vd_redacaoTitulos") >= 0, true);
conferir(
  "app.js grava o texto da redação como string pura",
  fonteApp.indexOf("atuais[p.id] = textarea.value;") >= 0,
  true
);
conferir(
  "app.js não voltou a gravar o objeto {titulo, texto} em vd_redacaoAnswers",
  /atuais\[p\.id\]\s*=\s*\{/.test(fonteApp),
  false
);
conferir(
  "o título sobe pra nuvem junto com o texto",
  fonteApp.indexOf("LS_REDACAO_TITULOS,") >= 0,
  true
);

// ---------- Fim ----------

if (falhas) {
  console.error("\nREPROVADO — " + falhas + " de " + total + " conferências falharam.");
  process.exit(1);
}
console.log("APROVADO — " + total + " conferências.");
