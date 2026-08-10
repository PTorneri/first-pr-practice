// Compõe o banco objetivo da trilha de Economia a partir das outras duas.
//
//   node vestibular-economia/build-bundle.js              compõe
//   node vestibular-economia/build-bundle.js --verificar  só checa se está velho
//
// POR QUE ESTE BANCO É COMPOSTO E NÃO ESCRITO
//
// O estudo dos seis cadernos da FGV EESP achou o seguinte: a prova objetiva do
// dia 1 é o MESMO caderno da FGV Direito SP. Mesmo cabeçalho ("VESTIBULAR
// UNIFICADO FGV"), mesma redação, mesmas 8 discursivas de Língua Portuguesa —
// conferidas questão a questão contra o estudo de Direito. O que a EESP tem de
// próprio no objetivo são as 45 questões de Biologia, Física e Química do dia 2.
//
// Ou seja: escrever um banco de Economia do zero seria reescrever, pior, um
// banco que já existe. As 2.249 questões de Direito valem para a 1ª fase inteira
// e as 650 de Natureza de Medicina cobrem o dia 2.
//
// A CONTRAPARTIDA, QUE É REAL
//
// O bundle daqui é ARTEFATO, não fonte: corrigir uma questão continua sendo
// mexer no `data/questions/*.json` da trilha de origem, e depois rodar isto de
// novo. Se alguém corrigir em Direito e esquecer, a correção não chega em
// Economia — e é justamente por isso que existe o `--verificar`, que compara o
// hash de cada arquivo de origem com o que foi usado na última composição e
// reprova quando algum mudou.
//
// DUAS ARMADILHAS QUE ESTE SCRIPT TRAVA
//
// 1. ID REPETIDO. "interpretacao-texto-01" existe nos DOIS bancos, assim como
//    geografia-01, gramatica-01, ingles-01, literatura-01. O app indexa
//    resposta, acerto e caderno de erros por id — dois iguais no mesmo bundle
//    fariam uma questão herdar o histórico da outra. Por isso nenhuma frente
//    daqui mistura fontes com o mesmo prefixo de id, e o script confere.
//
// 2. TEXTO DE APOIO ÓRFÃO. Parte das questões referencia um texto compartilhado
//    por `textoId` (um romance sustenta 6 questões, um artigo sustenta 5). Se a
//    frente vier sem os textos dela, essas questões entram no banco sem o texto
//    e viram enunciado solto — foi esse o defeito que o auditor da busca achou
//    em 2026-08. O script leva os textos junto e recusa referência sem destino.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const RAIZ = path.join(__dirname, "..");
const FONTES = {
  direito: path.join(RAIZ, "vestibular-direito", "data", "questions"),
  medicina: path.join(RAIZ, "vestibular-medicina", "data", "questions"),
};
const SAIDA_BUNDLE = path.join(__dirname, "data", "bundle.js");
const SAIDA_SUBTOPICS = path.join(__dirname, "data", "subtopics.js");
const MANIFESTO = path.join(__dirname, "data", "origem-do-bundle.json");

// ---------------------------------------------------------------- o mapeamento
//
// `de` é a lista de arquivos de origem, na ordem em que entram. A ordem importa
// duas vezes: ela preserva a contiguidade dos clusters (questões que dividem um
// texto de apoio precisam ficar vizinhas, ver build-bundle.ps1 de Direito) e
// define qual banco abre a frente.
//
// As descrições são NOVAS, não copiadas: as de Medicina falam de Santa Casa e
// Einstein, e as de Direito falam de uma prova em que Matemática vale 10%. Aqui
// cada frente é descrita pelo que ela vale nesta prova.

const MAPA = [
  // ---------- Linguagens ----------
  {
    id: "interpretacao-texto", nome: "Interpretação de Texto", area: "Linguagens",
    descricao: "Leitura crítica, inferência e argumentação. A FGV pendura até 6 questões num mesmo texto longo; o Insper pulveriza em quatro textos curtos de gêneros contrastantes.",
    buscaVideo: ["aula interpretação de texto vestibular", "interpretação de texto FGV Insper"],
    de: [["direito", "interpretacao-texto"]],
  },
  {
    id: "literatura", nome: "Literatura Brasileira", area: "Linguagens",
    descricao: "Romance do século XIX, Modernismo e reconhecimento de escola pelo traço. Na FGV 2026.1, nove das quinze objetivas de Português saíram de dois romances.",
    buscaVideo: ["aula literatura brasileira vestibular", "realismo naturalismo modernismo resumo vestibular"],
    de: [["direito", "literatura"]],
  },
  {
    id: "gramatica", nome: "Gramática e Norma Culta", area: "Linguagens",
    descricao: "Concordância, regência, crase, pontuação e coesão. Vale duas vezes: na objetiva e dentro da discursiva de Português, onde erro de norma derruba a faixa mesmo com o conteúdo certo.",
    buscaVideo: ["aula gramática norma culta vestibular", "concordância regência crase vestibular"],
    de: [["direito", "gramatica"]],
  },
  {
    id: "ingles", nome: "Inglês: Reading Comprehension", area: "Linguagens",
    descricao: "Compreensão pura, com o vocabulário difícil entregue pela banca. Vale 5% da nota na FGV EESP e não existe no Insper — é a frente de menor retorno por hora desta trilha.",
    buscaVideo: ["aula inglês interpretação de texto vestibular", "reading comprehension vestibular"],
    de: [["direito", "ingles"]],
  },

  // ---------- Matemática, em cinco frentes ----------
  //
  // As únicas frentes que juntam os dois bancos, e as que mais precisam disso:
  // são 40% da nota nas duas escolas. Os ids não colidem porque os prefixos são
  // diferentes ("matematica-rlm-01" e "matematica-01"), e é por isso que esta
  // junção é possível e as outras não seriam.
  //
  // POR QUE CINCO E NÃO UMA
  //
  // A alocação do simulado é proporcional POR FRENTE. Com Matemática numa
  // frente só, disputando com 8 frentes de Humanas e Atualidades, o simulado de
  // 60 questões dava 5 para Matemática -- 8%, contra os 25% do caderno real do
  // Insper. Medido com o proportionalAllocate do schedule.js. Dividida em cinco,
  // o mesmo alocador entrega 17 de 60. Não era peso baixo: era assento único.
  //
  // `filtro` diz de qual frente de matemática a questão é, consultando o mapa
  // de data/matematica-frentes.json (gerado por classificar-matematica.js).
  {
    id: "matematica-sequencias", nome: "Matemática: Sequências e Recorrências", area: "Matemática",
    descricao: "Progressões, termo geral, somas e recorrências. É o miolo da discursiva da FGV EESP — e a frente com o banco objetivo mais curto, porque nenhum dos bancos de origem foi escrito para uma prova em que sequência decide.",
    buscaVideo: ["aula progressão aritmética geométrica vestibular", "sequências e recorrências vestibular"],
    de: [["direito", "matematica-rlm"], ["medicina", "matematica"]], filtro: "matematica-sequencias",
  },
  {
    id: "matematica-probabilidade", nome: "Matemática: Probabilidade e Contagem", area: "Matemática",
    descricao: "Contagem, combinatória e probabilidade, incluindo a condicional. Aparece em toda prova discursiva da EESP lida, quase sempre no item mais difícil.",
    buscaVideo: ["aula probabilidade vestibular", "análise combinatória vestibular"],
    de: [["direito", "matematica-rlm"], ["medicina", "matematica"]], filtro: "matematica-probabilidade",
  },
  {
    id: "matematica-algebra", nome: "Matemática: Álgebra, Funções e Matrizes", area: "Matemática",
    descricao: "Equações, sistemas, funções, logaritmo, exponencial e matrizes. A maior das cinco, e a que sustenta a modelagem econômica que a banca cobra.",
    buscaVideo: ["aula função afim quadrática vestibular", "logaritmo exponencial matrizes vestibular"],
    de: [["direito", "matematica-rlm"], ["medicina", "matematica"]], filtro: "matematica-algebra",
  },
  {
    id: "matematica-geometria", nome: "Matemática: Geometria e Trigonometria", area: "Matemática",
    descricao: "Plana, espacial, analítica e trigonometria. Na discursiva costuma vir disfarçada: reconhecer que a curva dada é um arco de circunferência é metade da questão.",
    buscaVideo: ["aula geometria plana espacial vestibular", "geometria analítica trigonometria vestibular"],
    de: [["direito", "matematica-rlm"], ["medicina", "matematica"]], filtro: "matematica-geometria",
  },
  {
    id: "matematica-financeira", nome: "Matemática: Estatística, Porcentagem e Proporção", area: "Matemática",
    descricao: "Média, mediana, dispersão, porcentagem, juros, razão e proporção. É a frente mais próxima do curso: taxa, índice e correção aparecem aqui e de novo em Atualidades.",
    buscaVideo: ["aula porcentagem juros compostos vestibular", "média mediana desvio padrão vestibular"],
    de: [["direito", "matematica-rlm"], ["medicina", "matematica"]], filtro: "matematica-financeira",
  },

  // ---------- Ciências Humanas ----------
  //
  // História entra pelas duas metades de Direito (Brasil e Geral), que na FGV
  // caem numa prova só de Ciências Humanas. Os prefixos de id são distintos.
  {
    id: "historia", nome: "História", area: "Ciências Humanas",
    descricao: "Do Brasil colonial à redemocratização e da Idade Moderna à Guerra Fria. Na prova, História e Geografia dividem o mesmo caderno de Ciências Humanas com Atualidades.",
    buscaVideo: ["aula história do brasil vestibular", "aula história geral vestibular"],
    de: [["direito", "historia-brasil"], ["direito", "historia-geral"]],
  },
  {
    id: "geografia", nome: "Geografia Humana e Física", area: "Ciências Humanas",
    descricao: "Urbanização, população, clima, recursos e geopolítica dos territórios. A banca cobra leitura de mapa, gráfico e tabela mais do que memória de dado.",
    buscaVideo: ["aula geografia vestibular", "geografia humana e física resumo vestibular"],
    de: [["direito", "geografia"]],
  },
  {
    id: "filosofia-sociologia", nome: "Filosofia e Sociologia", area: "Ciências Humanas",
    descricao: "Contratualismo, teoria do Estado, trabalho e desigualdade. No Insper as duas ocupam sempre as quatro últimas questões do bloco de Humanas.",
    buscaVideo: ["aula filosofia vestibular", "aula sociologia vestibular"],
    de: [["direito", "filosofia-sociologia"]],
  },
  {
    id: "direitos-humanos", nome: "Direitos Humanos e Cidadania", area: "Ciências Humanas",
    descricao: "Cidadania, desigualdade e políticas públicas. A frente não vem da identidade do curso: vem do caderno de Ciências Humanas, que é o mesmo da prova de Direito e cobra esses temas.",
    buscaVideo: ["aula direitos humanos vestibular", "cidadania e políticas públicas vestibular"],
    de: [["direito", "direitos-humanos"]],
  },

  // ---------- Atualidades ----------
  //
  // Quatro frentes separadas, como em Direito. A banca fecha o caderno com
  // fonte de um a três meses antes da prova, então esta área envelhece mais
  // rápido que qualquer outra do banco.
  {
    id: "atualidades-politica", nome: "Atualidades: Política e Economia do Brasil", area: "Atualidades",
    descricao: "Conjuntura, reformas, instituições e política econômica. É a frente mais próxima do curso: indicador, inflação, juros e orçamento aparecem tanto aqui quanto na modelagem da discursiva de Matemática.",
    buscaVideo: ["aula atualidades política economia brasil vestibular", "conjuntura econômica brasileira resumo"],
    de: [["direito", "atualidades-politica"]],
  },
  {
    id: "atualidades-geopolitica", nome: "Atualidades: Geopolítica e Relações Internacionais", area: "Atualidades",
    descricao: "Conflitos, blocos econômicos, comércio internacional e organismos multilaterais.",
    buscaVideo: ["aula geopolítica atualidades vestibular", "relações internacionais resumo vestibular"],
    de: [["direito", "atualidades-geopolitica"]],
  },
  {
    id: "atualidades-meioambiente", nome: "Atualidades: Meio Ambiente e Sustentabilidade", area: "Atualidades",
    descricao: "Mudança climática, acordos, transição energética e o custo econômico de cada um.",
    buscaVideo: ["aula meio ambiente sustentabilidade vestibular", "mudanças climáticas resumo atualidades"],
    de: [["direito", "atualidades-meioambiente"]],
  },
  {
    id: "atualidades-tecnologia", nome: "Atualidades: Tecnologia e Sociedade", area: "Atualidades",
    descricao: "Inteligência artificial, plataformas, dados e trabalho. Tema recorrente nas duas bancas e na redação.",
    buscaVideo: ["aula tecnologia e sociedade atualidades vestibular", "inteligência artificial sociedade resumo"],
    de: [["direito", "atualidades-tecnologia"]],
  },

  // ---------- Ciências da Natureza ----------
  //
  // São 45 questões no dia 2 da FGV EESP (15 de cada) e 15 no Insper. Valem 15%
  // da nota — mas o corte é por prova: menos de 20% de acertos em Física
  // elimina, do mesmo jeito que em Matemática. Não existe "ignorar Natureza"
  // nesta trilha, e é por isso que as três frentes vêm do banco de Medicina,
  // que é fundo, e não das 132 "noções gerais" de Direito, escritas para os 10%
  // do Insper.
  //
  // A DÍVIDA, declarada: estas 650 questões estão calibradas em VUNESP e FUVEST.
  // A Química da FGV é a mais jornalística das três — oito das quinze de 2026.1
  // abrem com manchete, quatro com fonte datada de até três meses antes da prova.
  // Recalibrar isso é trabalho à parte, e não invalida usar o banco enquanto ele
  // não acontece: o conteúdo é o mesmo programa de ensino médio.
  {
    id: "biologia", nome: "Biologia", area: "Ciências da Natureza",
    descricao: "Citologia, genética, fisiologia, ecologia e evolução. São 15 questões no dia 2 da FGV, com corte de 20% de acertos — reprovar aqui elimina do mesmo jeito que reprovar em Matemática.",
    buscaVideo: ["aula biologia vestibular", "genética ecologia fisiologia resumo vestibular"],
    de: [["medicina", "biologia"]],
  },
  {
    id: "quimica", nome: "Química", area: "Ciências da Natureza",
    descricao: "Estequiometria, orgânica, equilíbrio e eletroquímica. Na FGV quase toda questão parte de uma notícia recente — ler o contexto antes da fórmula é parte da técnica.",
    buscaVideo: ["aula química vestibular", "estequiometria equilíbrio orgânica resumo vestibular"],
    de: [["medicina", "quimica"]],
  },
  {
    id: "fisica", nome: "Física", area: "Ciências da Natureza",
    descricao: "Mecânica, termologia, ondas, óptica e eletricidade. Bloco mais convencional das duas provas: enunciado técnico, gráfico ou tabela, um item por grande tópico.",
    buscaVideo: ["aula física vestibular", "mecânica eletricidade ondas resumo vestibular"],
    de: [["medicina", "fisica"]],
  },
];

// ------------------------------------------------------------------ utilidades

function lerFonte(trilha, arquivo) {
  const caminho = path.join(FONTES[trilha], arquivo + ".json");
  if (!fs.existsSync(caminho)) {
    throw new Error("fonte não encontrada: " + path.relative(RAIZ, caminho));
  }
  const bruto = fs.readFileSync(caminho, "utf8");
  return { caminho, bruto, json: JSON.parse(bruto) };
}

function hash(txt) {
  return crypto.createHash("sha1").update(txt).digest("hex").slice(0, 12);
}

function prefixoDoId(id) {
  // "interpretacao-texto-01" -> "interpretacao-texto". É o prefixo que colide
  // entre bancos, não o id inteiro.
  return String(id).replace(/-\d+[a-z]?$/i, "");
}

// --------------------------------------------------------------------- composição

function compor() {
  const banks = {};
  const textos = {};
  const subtopics = [];
  const origem = {};
  const idsVistos = new Map();
  const problemas = [];
  let total = 0;

  // O mapa das cinco frentes de Matemática. Vem de disco e não é recalculado
  // aqui de propósito: ele carrega 25 decisões tomadas à mão, e recalcular
  // apagaria a revisão humana a cada build.
  const MAPA_MAT = path.join(__dirname, "data", "matematica-frentes.json");
  if (!fs.existsSync(MAPA_MAT)) {
    throw new Error("falta data/matematica-frentes.json — rode classificar-matematica.js antes.");
  }
  const classificacao = JSON.parse(fs.readFileSync(MAPA_MAT, "utf8")).mapa || {};

  MAPA.forEach((frente) => {
    const questoes = [];
    const prefixos = new Set();

    frente.de.forEach(([trilha, arquivo]) => {
      const { caminho, bruto, json } = lerFonte(trilha, arquivo);
      origem[trilha + "/" + arquivo] = hash(bruto);

      (json.questoes || []).forEach((q) => {
        // Frente com `filtro` só leva as questões que a classificação mandou
        // para ela. As demais frentes levam o arquivo inteiro.
        if (frente.filtro) {
          const c = classificacao[q.id];
          if (!c || c.frente !== frente.filtro) return;
        }
        prefixos.add(prefixoDoId(q.id));
        const dono = idsVistos.get(q.id);
        if (dono) {
          problemas.push("id repetido \"" + q.id + "\": " + dono + " e " + trilha + "/" + arquivo);
          return;
        }
        idsVistos.set(q.id, trilha + "/" + arquivo);
        // `origemTrilha` fica na questão para o app poder dizer de onde ela veio
        // sem consultar um mapa à parte — e para o dia em que Economia tiver
        // questões próprias, que nascerão sem esse campo.
        questoes.push(Object.assign({ origemTrilha: trilha }, q));
      });

      (json.textos || []).forEach((t) => {
        if (textos[t.id] && textos[t.id].__de !== trilha + "/" + arquivo) {
          problemas.push("textoId repetido entre fontes: \"" + t.id + "\"");
          return;
        }
        textos[t.id] = Object.assign({ __de: trilha + "/" + arquivo }, t);
      });
    });

    // Duas fontes com o MESMO prefixo de id na mesma frente é o cenário do
    // achado 1 do cabeçalho. Aqui não acontece por construção do MAPA, mas a
    // trava fica: o mapa é editado à mão.
    //
    // Frente com `filtro` fica de fora: é normal que a classificação mande
    // nenhuma questão de uma das duas fontes para uma frente específica, e aí
    // a contagem de prefixos ficaria menor que a de fontes sem que houvesse
    // colisão nenhuma.
    if (!frente.filtro && frente.de.length > 1 && prefixos.size < frente.de.length) {
      problemas.push(frente.id + ": fontes com o mesmo prefixo de id (" + [...prefixos].join(", ") + ")");
    }

    banks[frente.id] = questoes;
    total += questoes.length;
    subtopics.push({
      id: frente.id, area: frente.area, nome: frente.nome,
      descricao: frente.descricao, buscaVideo: frente.buscaVideo,
    });
  });

  // Todo textoId referenciado precisa existir. Sem isso a questão entra no banco
  // sem o texto e vira enunciado solto.
  Object.entries(banks).forEach(([frente, qs]) => {
    qs.forEach((q) => {
      if (q.textoId && !textos[q.textoId]) {
        problemas.push(frente + "/" + q.id + ": textoId \"" + q.textoId + "\" sem texto correspondente");
      }
    });
  });

  Object.values(textos).forEach((t) => { delete t.__de; });
  return { banks, textos, subtopics, origem, total, problemas };
}

// ------------------------------------------------------------------- verificação

function verificar() {
  if (!fs.existsSync(MANIFESTO)) {
    console.error("sem manifesto: o bundle nunca foi composto. Rode sem --verificar.");
    process.exit(1);
  }
  const anterior = JSON.parse(fs.readFileSync(MANIFESTO, "utf8"));
  const mudaram = [];
  Object.keys(anterior.origem).forEach((chave) => {
    const [trilha, arquivo] = chave.split("/");
    let atual;
    try {
      atual = hash(lerFonte(trilha, arquivo).bruto);
    } catch (e) {
      mudaram.push(chave + " (sumiu)");
      return;
    }
    if (atual !== anterior.origem[chave]) mudaram.push(chave);
  });

  if (mudaram.length === 0) {
    console.log("bundle de Economia em dia com as " + Object.keys(anterior.origem).length + " fontes.");
    return;
  }
  console.error("BUNDLE DESATUALIZADO — mudaram desde a última composição:");
  mudaram.forEach((m) => console.error("  " + m));
  console.error("\nRode: node vestibular-economia/build-bundle.js");
  process.exit(1);
}

// ------------------------------------------------------------------------ saída

function main() {
  if (process.argv.includes("--verificar")) return verificar();

  const { banks, textos, subtopics, origem, total, problemas } = compor();

  if (problemas.length) {
    console.error("PROBLEMAS (" + problemas.length + "):");
    problemas.forEach((p) => console.error("  x " + p));
    process.exit(1);
  }

  const cabecalho = (o) => [
    "// GERADO por vestibular-economia/build-bundle.js -- nao edite a mao.",
    "// " + o,
    "// A fonte sao os data/questions/*.json de vestibular-direito e",
    "// vestibular-medicina; o mapeamento esta no MAPA do script.",
    "//",
    "// Corrigiu uma questao na trilha de origem? Rode o build de novo.",
    "// `--verificar` reprova quando alguma fonte mudou e este arquivo nao.",
    "",
  ].join("\n");

  fs.writeFileSync(SAIDA_BUNDLE,
    cabecalho("Banco objetivo da trilha de Economia.") +
    "window.QUESTION_BANKS = " + JSON.stringify(banks, null, 1) + ";\n\n" +
    "window.QUESTION_TEXTS = " + JSON.stringify(textos, null, 1) + ";\n", "utf8");

  fs.writeFileSync(SAIDA_SUBTOPICS,
    cabecalho("Frentes da trilha de Economia.") +
    "window.SUBTOPICS = " + JSON.stringify(subtopics, null, 2) + ";\n", "utf8");

  fs.writeFileSync(MANIFESTO,
    JSON.stringify({ composto: new Date().toISOString().slice(0, 10), total, origem }, null, 2) + "\n", "utf8");

  const porArea = {};
  MAPA.forEach((f) => { porArea[f.area] = (porArea[f.area] || 0) + banks[f.id].length; });

  console.log("Banco objetivo da trilha de Economia");
  console.log("────────────────────────────────────");
  MAPA.forEach((f) => {
    console.log("  " + String(banks[f.id].length).padStart(4) + "  " + f.id.padEnd(26) +
      f.de.map((d) => d[0]).join("+"));
  });
  console.log("  ────");
  Object.keys(porArea).sort().forEach((a) => {
    console.log("  " + String(porArea[a]).padStart(4) + "  " + a);
  });
  console.log("\n  " + total + " questões, " + Object.keys(textos).length + " textos compartilhados");
  console.log("  " + MAPA.length + " frentes, " + Object.keys(origem).length + " arquivos de origem");
}

main();
