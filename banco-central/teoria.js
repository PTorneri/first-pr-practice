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
  // Vazio de propósito: engenharia não tem theory.js de origem (trilha nova),
  // toda a teoria dela vem de NOVAS.engenharia abaixo. A chave precisa existir
  // aqui para consolidar() gerar a entrada "engenharia" em teoria.json --
  // sem ela, NOVAS.engenharia nunca seria mesclado em lugar nenhum.
  engenharia: {},
};

// Resumo novo para toda frente que nasceu de uma fusão. Emendar os resumos de
// origem daria um parágrafo que ninguém lê.
const RESUMO_DA_FUSAO = {
  direito: {
    "historia": "Do Brasil colonial à redemocratização e da Idade Moderna à Guerra Fria, no mesmo caderno de Ciências Humanas. A banca cobra processo — causa, ruptura e consequência —, não data isolada.",
    "atualidades": "Política e economia do Brasil, geopolítica, meio ambiente e tecnologia. É a área que envelhece mais rápido do banco: a FGV fecha o caderno com fonte de um a três meses antes da prova, e o que se cobra é leitura recente, não memória.",
  },
  economia: {
    "matematica": "Álgebra, geometria, probabilidade, sequências e estatística. É 40% da nota final nas DUAS escolas — e menos de 20% de acertos em qualquer objetiva elimina, então não existe compensar Matemática com outra prova. Nas duas o item difícil quase sempre é modelagem: traduzir o enunciado em função, taxa ou razão antes de calcular. A grade da FGV pune resposta sem conta: em 2026.1, resposta correta sem cálculo valeu 25%.",
    "atualidades": "Conjuntura brasileira, geopolítica, clima e tecnologia, com peso maior no que toca a economia: indicador, inflação, juros e orçamento aparecem aqui e voltam na modelagem da discursiva de Matemática.",
  },
};

// Teoria escrita agora, para frente que a trilha não cobria. Direito nunca teve
// teoria de Literatura e Economia nunca teve de Artes, embora as duas cobrem as
// duas matérias na prova.
const NOVAS = {
  // Engenharia não tem theory.js próprio (trilha nova, sem histórico de
  // provas catalogado como Direito/Medicina têm) -- por isso ORIGEM.engenharia
  // é vazio e toda a teoria dela nasce direto aqui. Escrita só para as 7
  // frentes com dado real por trás (o resumo de ITA 2024 já extraído em
  // vestibular-engenharia/data/questoes-reais-ita-STAGING.md); Humanas e
  // Biologia da trilha ficaram de fora desta rodada -- têm questão no banco
  // de Mauá, mas não o detalhe por matéria que sustentaria gatilho/pegadinha
  // sem inventar.
  engenharia: {
    matematica: {
      resumo: "20% da prova do ITA (12 das 60 questões), e cobre o programa todo do ensino médio até o extra que outras bancas não pedem: números complexos, polinômios, teoria dos conjuntos/lógica. No ITA 2024, das 12 questões, 2 usaram raízes de polinômio, 1 potência de complexo por De Moivre, 1 poliedro (relação de Euler) e 1 teoria dos conjuntos com afirmações I/II/III — nenhuma banca de Medicina ou Direito testa esse bloco no mesmo nível.",
      gatilhos: [
        "Afirmações I, II, III (às vezes IV) pra julgar V/F → é o formato mais comum do ITA; vale eliminar pelo item mais fácil de refutar antes de checar os outros.",
        "Enunciado cita ℕ, ℝ, ℂ, M_n(ℝ) ou notação de conjuntos formal → é convenção do cabeçalho oficial da prova, não enfeite; a resposta depende de saber a notação, não só a conta.",
        "Número complexo escrito como z = a+bi ou em forma polar → primeiro decida se o caminho mais curto é módulo/argumento (produto, potência, raiz) ou forma algébrica (soma, produto direto) — trocar o caminho custa tempo, não errar a questão.",
      ],
      pegadinhas: [
        "Tratar números complexos e polinômios como assunto raro e deixar pra depois: no ITA são 20 a 25% das questões de Matemática, praticamente garantidos todo ano.",
        "Nas relações de Girard, trocar o sinal da soma das raízes (−b/a) com o da soma dos produtos dois a dois (c/a, sem troca de sinal) — são fórmulas com regras de sinal diferentes.",
        "Na radiciação de complexos, esquecer que zⁿ=w tem exatamente n raízes distintas, não uma só — o universo é o dos complexos, não o dos reais.",
      ],
      subtemas: [],
    },
    fisica: {
      resumo: "20% da prova do ITA (12 das 60), com um traço que diferencia da Física de Medicina: usa as constantes do cabeçalho oficial (g, c, G, massa e raio da Terra) com liberdade, e cobra física moderna — no ITA 2024, uma questão inteira foi sobre dilatação temporal relativística num foguete, medindo intervalo entre sinais de rádio nos dois extremos.",
      gatilhos: [
        "Enunciado dá aproximações do cabeçalho ((1+x)ⁿ≈1+nx, √60≈7,7 etc.) → é sinal de que a conta final exige aproximar, não resolver exato; usar a aproximação errada ou não usar nenhuma são os dois erros mais comuns.",
        "Velocidade próxima de c ou menção a 'referencial'/'simultaneidade' → é física moderna, não mecânica clássica; fórmulas de Newton não se aplicam.",
        "Duas grandezas dadas em unidades muito diferentes de ordem de grandeza → checar conversão de unidade antes de plugar na fórmula é o passo que mais gente pula.",
      ],
      pegadinhas: [
        "Aplicar mecânica newtoniana (velocidades se somam direto) num problema que já sinalizou velocidade relativística — a composição de velocidades muda perto de c.",
        "Esquecer que a contração de Lorentz só afeta a dimensão PARALELA ao movimento, não todas as dimensões do objeto.",
        "Em efeito fotoelétrico, achar que aumentar a intensidade da luz resolve quando a frequência está abaixo do corte — é a frequência, não a intensidade, que decide se o elétron sai.",
      ],
      subtemas: [],
    },
    quimica: {
      resumo: "20% da prova do ITA (12 das 60), com questões quase sempre em formato de afirmações I a V pra julgar — no ITA 2024, técnicas de separação de misturas, comparação de pKa entre ácidos orgânicos, modelos atômicos históricos (Bohr, Dalton, Rutherford, Thomson) aplicados a equações específicas, e potenciais de eletrodo apareceram todos nesse formato.",
      gatilhos: [
        "Pergunta relaciona um MODELO atômico histórico (Dalton, Thomson, Rutherford, Bohr) a um tipo de equação química → o que se testa é qual modelo tem o 'arcabouço mínimo' pra explicar aquele fenômeno, não decorar datas.",
        "Comparação de pKa/força ácida entre compostos orgânicos parecidos → o efeito indutivo de grupos vizinhos (halogênio perto ou longe da carboxila) decide, mais do que a fórmula geral da função.",
        "Afirmação sobre célula eletroquímica citando potencial padrão → cuidado com a diferença entre potencial ABSOLUTO de semicélula (não existe, só se mede diferença) e potencial relativo a um eletrodo de referência.",
      ],
      pegadinhas: [
        "Achar que aumentar a temperatura sempre desloca equilíbrio pra produtos — depende de a reação direta ser endo ou exotérmica.",
        "Confundir separação de misturas azeotrópicas (não se separam por destilação simples) com misturas comuns.",
      ],
      subtemas: [],
    },
    gramatica: {
      resumo: "O bloco de Português do ITA tem 20% da prova (12 questões), mas é construído quase inteiramente sobre trechos de romances e peças contemporâneos protegidos por direito autoral — na edição 2024, nenhuma das 12 questões pôde ser reaproveitada por esse motivo, o que já diz algo sobre o formato: gramática raramente aparece solta, quase sempre ancorada num trecho literário longo.",
      gatilhos: [
        "Questão de concordância/regência dentro de um trecho literário longo → a regra testada costuma estar amarrada à interpretação do trecho, não isolada.",
      ],
      pegadinhas: [
        "Estudar gramática do ITA como lista de regras soltas — o formato da banca privilegia a regra aplicada dentro de um texto real, não a pergunta puramente metalinguística.",
      ],
      subtemas: [],
    },
    "interpretacao-texto": {
      resumo: "Parte do mesmo bloco de Português (20% da prova), quase sempre a partir de romance ou peça contemporâneos — a mesma razão que impediu o reaproveitamento das questões de 2024 (textos ainda protegidos) é a evidência de que o ITA prioriza ficção recente sobre textos de domínio público.",
      gatilhos: [
        "Trecho de romance/peça contemporânea longo → a pergunta tende a testar leitura de subtexto (o que a cena revela sobre a personagem) mais do que localização direta de informação.",
      ],
      pegadinhas: [
        "Preparar-se só com textos de domínio público (autores clássicos) quando o padrão observado é ficção contemporânea sob direitos autorais.",
      ],
      subtemas: [],
    },
    literatura: {
      resumo: "Segue o mesmo padrão do bloco de Português do ITA: apoiado em obras contemporâneas específicas, não num painel de escolas literárias como em Medicina/Direito. É prova que recompensa quem leu os livros do ano, não quem decorou características de movimento.",
      gatilhos: [
        "Pergunta cita autor e obra específicos e recentes → tratar como prova de leitura da obra, não de história literária.",
      ],
      pegadinhas: [
        "Estudar só características de escola literária (Romantismo, Realismo etc.) sem ler os livros do ano — o ITA parece pedir a obra específica, ao contrário de bancas mais generalistas.",
      ],
      subtemas: [],
    },
    ingles: {
      resumo: "20% da prova do ITA (12 questões), toda baseada em reportagens integrais de veículos como The New York Times e The Economist — nenhuma das 12 de 2024 pôde ser reaproveitada por reproduzir o texto quase por completo. É prova de compreensão de texto jornalístico longo em inglês, não de gramática isolada.",
      gatilhos: [
        "Texto-base longo de jornal/revista em inglês → o vocabulário costuma ser de nível avançado (jornalismo internacional, não didático), e vale ler o parágrafo inteiro antes de responder, não só a frase citada.",
      ],
      pegadinhas: [
        "Treinar só com textos didáticos simplificados quando o padrão real é reportagem autêntica e longa, no nível de leitura de um adulto nativo.",
      ],
      subtemas: [],
    },
  },
  direito: {
    "literatura": {
      resumo: "Nas duas bancas a literatura decide o bloco de Português, mas de formas opostas. Na FGV 2026.1, nove das quinze objetivas saíram de DOIS romances do século XIX (Memórias de um sargento de milícias, 6; O Cortiço, 3): ler mal um deles custa até 9 questões, o maior ponto único de falha da prova. No Insper não há lista — o item pede reconhecer a escola pelo TRAÇO, a partir de textos avulsos (um conto de Drummond, um poema de Bandeira, uma tirinha do Laerte).",
      gatilhos: [
        "Trecho de romance da lista no enunciado → identifique primeiro o NARRADOR (quem fala, e se é confiável); parte das alternativas erradas atribui ao autor o que é do narrador.",
        "Pergunta sobre escola literária no Insper → procure o traço no próprio texto (o Realismo aparece por uma descrição de visão de mundo; a crítica de Bandeira ao Parnasianismo, pelos adjetivos do poema), nunca pela data de publicação.",
        "Item de gramática dentro do bloco de Português → ele vem ancorado no trecho literário, nunca solto, e a FGV chega a fornecer a definição teórica antes de pedir a aplicação. Leia o trecho como texto antes de olhar a regra.",
        "Poema curto integral → conte a métrica e olhe a rima antes de interpretar; a questão de forma costuma ser mais rápida que a de sentido.",
      ],
      pegadinhas: [
        "Estudar os romances da FGV só como enredo. Três questões de 2026.1 eram, na prática, de História e de crítica literária: o grupo social das personagens numa sociedade escravista, a leitura do meio como trânsito entre ordem e desordem (a tese de Antonio Candido), e determinismo geográfico.",
        "Confundir a opinião do personagem com a tese do autor — a banca testa leitura, não concordância.",
        "Assumir que 'linguagem simples' é sinal de Modernismo: o Realismo também a usa, e o que separa os dois é o projeto, não o vocabulário.",
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
// `data/teoria.json`. JÁ RODOU, e não roda de novo: os theory.js de origem foram
// reescritos pelo build e as chaves antigas não existem mais. Fica aqui como
// registro de como o conteúdo herdado foi obtido.
//
// PARA MEXER NA TEORIA hoje, edite `RESUMO_DA_FUSAO` ou `NOVAS` aqui e rode o
// build: ele aplica os dois por cima do que veio de `teoria.json`. Editar o
// JSON gerado é perder a correção no próximo build.

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

