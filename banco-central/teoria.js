// Como cada trilha remapeia a sua teoria para as 14 frentes do banco central.
//
// A teoria NÃO é unificada, e essa é a diferença dela para as questões e para as
// vídeo-aulas. Uma questão de parábola serve às três trilhas e uma aula de
// citologia também, mas a teoria fala da BANCA: a de Biologia em Medicina cita
// as 8 discursivas da Santa Casa, a de Matemática em Direito diz que ela vale
// 10% da prova. Fundir os textos apagaria justamente o que os torna úteis.
//
// O que muda aqui é só a CHAVE. Quatro frentes de Direito e cinco de Economia
// deixaram de existir com a fusão do banco, e a teoria delas precisa aterrissar
// nas frentes novas.
//
// Três operações:
//
//   1 -> 1   renomear. "matematica-rlm" vira "matematica".
//   N -> 1   fundir. As quatro Atualidades de Direito viram uma; os gatilhos e
//            as pegadinhas se somam (são específicos e continuam válidos) e o
//            resumo é reescrito, porque quatro resumos emendados não são um
//            resumo.
//   1 -> N   replicar. A frente única de "noções gerais" de Natureza em Direito
//            vira a teoria das três, até alguém escrever uma por matéria.

// De onde vem a teoria de cada frente nova, por trilha.
const ORIGEM = {
  direito: {
    "interpretacao-texto": ["interpretacao-texto"],
    "gramatica": ["gramatica"],
    "ingles": ["ingles"],
    "matematica": ["matematica-rlm"],
    "historia": ["historia-brasil", "historia-geral"],
    "geografia": ["geografia"],
    "filosofia-sociologia": ["filosofia-sociologia"],
    "artes-cultura": ["artes-cultura"],
    "direitos-humanos": ["direitos-humanos"],
    "atualidades": ["atualidades-politica", "atualidades-geopolitica",
      "atualidades-meioambiente", "atualidades-tecnologia"],
    "biologia": ["ciencias-natureza"],
    "quimica": ["ciencias-natureza"],
    "fisica": ["ciencias-natureza"],
  },
  medicina: {
    // Medicina já nomeava as frentes como o banco central as nomeia.
    "biologia": ["biologia"], "quimica": ["quimica"], "fisica": ["fisica"],
    "matematica": ["matematica"], "interpretacao-texto": ["interpretacao-texto"],
    "gramatica": ["gramatica"], "literatura": ["literatura"], "ingles": ["ingles"],
    "historia": ["historia"], "geografia": ["geografia"],
    "filosofia-sociologia": ["filosofia-sociologia"], "artes-cultura": ["artes-cultura"],
    "atualidades": ["atualidades"],
  },
  economia: {
    "interpretacao-texto": ["interpretacao-texto"],
    "literatura": ["literatura"],
    "gramatica": ["gramatica"],
    "ingles": ["ingles"],
    "matematica": ["matematica-algebra", "matematica-geometria", "matematica-probabilidade",
      "matematica-sequencias", "matematica-financeira"],
    "historia": ["historia"],
    "geografia": ["geografia"],
    "filosofia-sociologia": ["filosofia-sociologia"],
    "direitos-humanos": ["direitos-humanos"],
    "atualidades": ["atualidades-politica", "atualidades-geopolitica",
      "atualidades-meioambiente", "atualidades-tecnologia"],
    "biologia": ["biologia"], "quimica": ["quimica"], "fisica": ["fisica"],
  },
};

// Resumo novo para toda frente que nasceu de uma fusão. Emendar os resumos de
// origem daria um parágrafo que ninguém lê.
const RESUMO_DA_FUSAO = {
  direito: {
    "historia": "Do Brasil colonial à redemocratização e da Idade Moderna à Guerra Fria, no mesmo caderno de Ciências Humanas. A banca cobra processo — causa, ruptura e consequência —, não data isolada.",
    "atualidades": "Política e economia do Brasil, geopolítica, meio ambiente e tecnologia. É a área que envelhece mais rápido do banco: a FGV fecha o caderno com fonte de um a três meses antes da prova, e o que se cobra é leitura recente, não memória.",
  },
  economia: {
    "matematica": "Álgebra, geometria, probabilidade, sequências e estatística — 40% da nota na FGV EESP e 25% do caderno do Insper. Nas duas provas o item difícil quase sempre é modelagem: traduzir o enunciado em função, taxa ou razão antes de calcular.",
    "atualidades": "Conjuntura brasileira, geopolítica, clima e tecnologia, com peso maior no que toca a economia: indicador, inflação, juros e orçamento aparecem aqui e voltam na modelagem da discursiva de Matemática.",
  },
};

// Teoria escrita agora, para frente que a trilha não cobria. Direito nunca teve
// teoria de Literatura e Economia nunca teve de Artes, embora as duas cobrem as
// duas matérias na prova.
const NOVAS = {
  direito: {
    "literatura": {
      resumo: "Romance do século XIX e Modernismo, quase sempre a partir das obras da lista da FGV. Na prova de 2026.1, nove das quinze objetivas de Português saíram de dois romances — ler a obra rende mais que decorar escola literária.",
      gatilhos: [
        "Trecho de romance no enunciado → identifique primeiro o NARRADOR (quem fala, e se é confiável); metade das alternativas erradas atribui ao autor o que é do narrador.",
        "Pergunta sobre escola literária → procure o traço formal no próprio trecho (ironia e digressão em Machado, determinismo e zoomorfização em Aluísio), não a data de publicação.",
        "Poema curto integral → conte a métrica e olhe a rima antes de interpretar; a questão de forma costuma ser mais rápida que a de sentido.",
      ],
      pegadinhas: [
        "Confundir a opinião do personagem com a tese do autor — a banca testa leitura, não concordância.",
        "Assumir que 'linguagem simples' é sinal de Modernismo: o Realismo também a usa, e o que separa os dois é o projeto, não o vocabulário.",
        "Datar a obra pela escola em vez de pelo traço: há Romantismo publicado depois do primeiro romance realista.",
      ],
      subtemas: [],
    },
  },
  economia: {
    "artes-cultura": {
      resumo: "Leitura de obra, movimentos e o diálogo entre imagem e texto. Vale pouco no caderno das duas bancas, mas é repertório direto para a redação — que na EESP vale 20% da nota final.",
      gatilhos: [
        "Imagem no enunciado → descreva o que se vê (composição, cor, ponto de vista) antes de nomear o movimento; a alternativa errada costuma nomear certo e descrever errado.",
        "Obra + texto no mesmo enunciado → a pergunta é quase sempre pela RELAÇÃO entre os dois, não pelo conteúdo de cada um.",
        "Menção a indústria cultural ou arte de massa → o eixo é sociológico (Frankfurt, mercantilização), e a resposta está mais perto de Sociologia que de História da Arte.",
      ],
      pegadinhas: [
        "Tratar 'arte moderna' e 'arte contemporânea' como sinônimos: a primeira é a das vanguardas do início do século XX, a segunda começa no pós-guerra e muda o que conta como obra.",
        "Ler a obra pelo rótulo do movimento em vez de pelo que está na imagem.",
      ],
      subtemas: [],
    },
  },
};

// ---------------------------------------------------------------- consolidação
//
//   node banco-central/teoria.js --consolidar
//
// Lê os `data/theory.js` das três trilhas, aplica o mapa e grava
// `data/teoria.json`. Roda UMA vez, na migração: depois dela o theory.js de cada
// trilha é artefato do build.

const fs = require("fs");
const path = require("path");

function lerTeoria(trilha) {
  const arq = path.join(__dirname, "..", "vestibular-" + trilha, "data", "theory.js");
  const sandbox = { window: {} };
  // eslint-disable-next-line no-new-func
  new Function("window", fs.readFileSync(arq, "utf8")).call(sandbox, sandbox.window);
  return sandbox.window.THEORY || {};
}

function consolidar() {
  const saida = {};
  const problemas = [];

  Object.entries(ORIGEM).forEach(([trilha, mapa]) => {
    const antiga = lerTeoria(trilha);
    const nova = {};

    Object.entries(mapa).forEach(([frenteNova, origens]) => {
      const partes = origens.map((id) => antiga[id]).filter(Boolean);
      if (partes.length !== origens.length) {
        problemas.push(trilha + "/" + frenteNova + ": origem faltando (" +
          origens.filter((id) => !antiga[id]).join(", ") + ")");
        return;
      }

      if (partes.length === 1) {
        nova[frenteNova] = partes[0];
        return;
      }

      // Fusão: gatilhos e pegadinhas se somam porque são específicos e
      // continuam valendo; o resumo tem de ser escrito.
      const resumo = (RESUMO_DA_FUSAO[trilha] || {})[frenteNova];
      if (!resumo) {
        problemas.push(trilha + "/" + frenteNova + ": fusão de " + partes.length +
          " sem resumo novo em RESUMO_DA_FUSAO");
        return;
      }
      const juntar = (campo) => {
        const vistos = new Set();
        const fora = [];
        partes.forEach((p) => (p[campo] || []).forEach((x) => {
          if (vistos.has(x)) return;
          vistos.add(x);
          fora.push(x);
        }));
        return fora;
      };
      nova[frenteNova] = {
        resumo: resumo,
        gatilhos: juntar("gatilhos"),
        pegadinhas: juntar("pegadinhas"),
        subtemas: juntar("subtemas"),
      };
    });

    Object.entries(NOVAS[trilha] || {}).forEach(([frente, teoria]) => {
      nova[frente] = teoria;
    });

    saida[trilha] = nova;
  });

  if (problemas.length) {
    console.error("PROBLEMAS (" + problemas.length + "):");
    problemas.forEach((p) => console.error("  x " + p));
    process.exit(1);
  }

  fs.writeFileSync(path.join(__dirname, "data", "teoria.json"),
    JSON.stringify({ gerado: new Date().toISOString().slice(0, 10), porTrilha: saida }, null, 1) + "\n", "utf8");

  Object.entries(saida).forEach(([t, m]) => {
    console.log(t + ": " + Object.keys(m).length + " frentes com teoria");
  });
}

module.exports = { ORIGEM, RESUMO_DA_FUSAO, NOVAS };
if (require.main === module && process.argv.includes("--consolidar")) consolidar();

