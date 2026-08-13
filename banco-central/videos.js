// Catálogo de vídeo-aulas, por SUBTEMA.
//
// Antes da migração o catálogo era por frente: `VIDEO_TOPICS["biologia"]` tinha
// sete recortes e `pickLessonVideo` girava entre eles conforme o número da
// visita, torcendo para o aluno cair no recorte certo. Isso deixou de ser um
// sorteio: o dia agora É um subtema, então o vídeo do dia é o vídeo daquele
// assunto.
//
// Os recortes são os mesmos de antes — 157 temas curados nas três trilhas,
// reaproveitados aqui e apenas reagrupados sob o subtema a que sempre
// pertenceram ("Genética mendeliana e heredogramas" estava em Biologia e é de
// biologia-genetica). Os que só existiam numa trilha passam a valer para as
// três: o conteúdo é o mesmo ensino médio, e era só o arquivo que os separava.
//
// Subtema sem nenhum recorte herda as duas buscas de subtemas-meta.js, que
// cobrem o assunto inteiro. O build reclama se algum subtema ficar sem nada.

// Recorte de vídeo -> subtema. A chave é o texto EXATO do tema no catálogo
// antigo, porque é assim que o gerador o encontra nos três arquivos de origem.
const TEMA_PARA_SUBTEMA = {
  // ---------------------------------------------------------------- Matemática
  "Funções: afim, quadrática e exponencial": "matematica-algebra",
  "Lógica proposicional e tabela-verdade": "matematica-algebra",
  "Raciocínio abstrato: o item que não é conteúdo aplicado": "matematica-algebra",
  "Interpolação: a função que passa pelos pontos": "matematica-algebra",
  "Funções definidas por partes": "matematica-algebra",
  "Lei de potência e leitura em escala logarítmica": "matematica-algebra",

  "Geometria plana: áreas e semelhança": "matematica-geometria",
  "Geometria espacial: prismas, cilindros e esferas": "matematica-geometria",
  "Trigonometria no triângulo e no ciclo": "matematica-geometria",
  "Geometria básica: área e perímetro": "matematica-geometria",
  "Figura escondida numa equação": "matematica-geometria",
  "Semelhança e razão entre áreas": "matematica-geometria",
  "Áreas por decomposição": "matematica-geometria",
  "Trigonometria em triângulos quaisquer": "matematica-geometria",

  "Probabilidade e análise combinatória": "matematica-probabilidade",
  "Probabilidade e análise combinatória básica": "matematica-probabilidade",
  "Passeio aleatório e saldo": "matematica-probabilidade",
  "Contagem com restrição de posição": "matematica-probabilidade",
  "Probabilidade em torneios e chaveamentos": "matematica-probabilidade",
  "Probabilidade que depende da etapa anterior": "matematica-probabilidade",

  "Progressões aritméticas e geométricas": "matematica-sequencias",
  "Recorrência com invariante": "matematica-sequencias",
  "Progressões em séries de dados reais": "matematica-sequencias",
  "Somas e identidades de contagem": "matematica-sequencias",
  "Termos distantes: periodicidade e resto": "matematica-sequencias",

  "Estatística: média, mediana e gráficos": "matematica-financeira",
  "Porcentagem, juros e proporção": "matematica-financeira",
  "Porcentagem, juros simples e compostos": "matematica-financeira",
  "Traduzir economia em modelo": "matematica-financeira",
  "Reajustes sucessivos e taxas equivalentes": "matematica-financeira",
  "Médias que mudam quando o conjunto muda": "matematica-financeira",
  "Estatística descritiva e distribuição assimétrica": "matematica-financeira",

  // ------------------------------------------------------------------ Biologia
  "Citologia: organelas e membrana plasmática": "biologia-citologia",
  "Genética mendeliana e heredogramas": "biologia-genetica",
  "Fisiologia humana: circulação e respiração": "biologia-fisiologia",
  "Imunologia e vacinas": "biologia-fisiologia",
  "Saúde pública: vacinas e resistência bacteriana": "biologia-fisiologia",
  "Ecologia: ciclos, teias e sucessão": "biologia-ecologia",
  "Ecologia: cadeias alimentares e biodiversidade": "biologia-ecologia",
  "Evolução e filogenia": "biologia-evolucao",
  "Fisiologia vegetal: hormônios e transpiração": "biologia-diversidade",

  // ------------------------------------------------------------------- Química
  "Estequiometria e cálculos com mol": "quimica-estequiometria",
  "Química orgânica: funções e isomeria": "quimica-organica",
  "Soluções e concentração": "quimica-solucoes",
  "Equilíbrio químico e pH": "quimica-equilibrio-acido-base",
  "Eletroquímica: pilhas e eletrólise": "quimica-eletroquimica",
  "Termoquímica e entalpia": "quimica-termoquimica-cinetica",
  "Química ambiental: poluição e reciclagem": "quimica-atomistica-ligacoes",

  // -------------------------------------------------------------------- Física
  "Cinemática e leis de Newton": "fisica-mecanica",
  "Energia, trabalho e quantidade de movimento": "fisica-energia-trabalho",
  "Termologia e gases ideais": "fisica-termologia",
  "Óptica geométrica: espelhos e lentes": "fisica-ondas-optica",
  "Ondas e acústica": "fisica-ondas-optica",
  "Eletrodinâmica: circuitos e resistores": "fisica-eletromagnetismo",
  "Física básica: energia, eletricidade e ondas": "fisica-eletromagnetismo",

  // ------------------------------------------------------------------ História
  "Brasil Colônia: economia açucareira e mineração": "historia-brasil-colonia-imperio",
  "Brasil Colônia: escravidão e economia": "historia-brasil-colonia-imperio",
  "Independência e Império do Brasil": "historia-brasil-colonia-imperio",
  "Era Vargas e Estado Novo": "historia-brasil-republica",
  "Ditadura militar e redemocratização": "historia-brasil-republica",
  "Império e Primeira República": "historia-brasil-republica",
  "Era Vargas e ditadura militar": "historia-brasil-republica",
  "Revolução Francesa e Iluminismo": "historia-geral-moderna",
  "Idade Moderna: mercantilismo e revoluções": "historia-geral-moderna",
  "Revolução Industrial": "historia-geral-contemporanea",
  "Primeira e Segunda Guerras Mundiais": "historia-geral-contemporanea",
  "Guerra Fria e descolonização afro-asiática": "historia-geral-contemporanea",
  "Século XX: guerras mundiais e Guerra Fria": "historia-geral-contemporanea",

  // ----------------------------------------------------------------- Geografia
  "Geomorfologia, solos e relevo": "geografia-fisica-clima",
  "Climatologia e fenômenos El Niño/La Niña": "geografia-fisica-clima",
  "Urbanização e migrações no Brasil": "geografia-populacao-urbana",
  "Urbanização e rede urbana brasileira": "geografia-populacao-urbana",
  "Agricultura e questão agrária": "geografia-agraria-economica",
  "Geopolítica e recursos energéticos": "geografia-agraria-economica",
  "Geopolítica dos recursos naturais": "geografia-geopolitica",
  "Biomas brasileiros e desmatamento": "geografia-ambiente-sustentabilidade",
  "Cartografia: fusos horários e escalas": "geografia-cartografia",
  "Cartografia e leitura de mapas": "geografia-cartografia",

  // ----------------------------------------------------------------- Gramática
  "Concordância verbal e nominal": "gramatica-concordancia",
  "Regência verbal e nominal": "gramatica-regencia-crase",
  "Uso da crase": "gramatica-regencia-crase",
  "Regência e crase": "gramatica-regencia-crase",
  "Pontuação e período composto": "gramatica-pontuacao",
  "Colocação pronominal e paralelismo sintático": "gramatica-morfologia",
  "Colocação e emprego de pronomes": "gramatica-morfologia",
  "Processos de formação de palavras": "gramatica-morfologia",
  "Coesão textual e conectivos": "gramatica-coesao-semantica",

  // -------------------------------------------------------- Interpretação de Texto
  "Interpretação de notícias e artigos de opinião": "interpretacao-ideia-central",
  "Tese, argumento e inferência": "interpretacao-inferencia",
  "Argumentação e tipos de argumento em textos": "interpretacao-argumentacao",
  "Interpretação de textos publicitários e persuasivos": "interpretacao-argumentacao",
  "Coesão: referentes e conectivos": "interpretacao-estrutura-coesao",
  "Charge, tirinha e infográfico": "interpretacao-genero-discurso",
  "Leitura de textos científicos de divulgação": "interpretacao-genero-discurso",
  "Textos de divulgação científica": "interpretacao-genero-discurso",

  // ---------------------------------------------------------------- Literatura
  "Romantismo: prosa e poesia": "literatura-colonial-romantismo",
  "Realismo e Naturalismo: Machado e Aluísio": "literatura-realismo-naturalismo",
  "Modernismo: as três fases": "literatura-modernismo",
  "Literatura contemporânea e indígena": "literatura-contemporanea",
  "Análise de poema: eu lírico e figuras": "literatura-teoria-analise",

  // -------------------------------------------------------------------- Inglês
  "Main idea e purpose do texto": "ingles-main-idea",
  "Inferência e detalhe específico": "ingles-inference",
  "Reading comprehension: textos sobre tecnologia e sociedade": "ingles-detail",
  "Gráficos, infográficos e tirinhas em inglês": "ingles-detail",
  "Vocabulário em contexto e referência": "ingles-vocabulary",
  "Falsos cognatos (false friends) em inglês": "ingles-vocabulary",
  "Vocabulário e interpretação de textos em inglês": "ingles-vocabulary",

  // ------------------------------------------------------ Filosofia e Sociologia
  "Ética kantiana e utilitarismo": "filosofia-etica-moral",
  "Ética e filosofia moral: Kant e utilitarismo": "filosofia-etica-moral",
  "Contratualismo: Hobbes, Locke e Rousseau": "filosofia-politica",
  "Foucault, biopolítica e pensamento contemporâneo": "filosofia-politica",
  "Sócrates, Platão e Aristóteles": "filosofia-conhecimento-logica",
  "Teoria do conhecimento: racionalismo e empirismo": "filosofia-conhecimento-logica",
  "Correntes sociológicas: Durkheim, Weber e Marx": "sociologia-trabalho-classes",
  "Clássicos da sociologia: Marx, Durkheim e Weber": "sociologia-trabalho-classes",
  "Poder, trabalho e sociedade contemporânea": "sociologia-trabalho-classes",
  "Indústria cultural e cultura de massa": "sociologia-cultura-identidade",

  // --------------------------------------------------------------------- Artes
  "Renascimento e Barroco": "artes-classica-moderna",
  "Semana de Arte Moderna de 1922": "artes-classica-moderna",
  "Vanguardas europeias e Modernismo brasileiro": "artes-classica-moderna",
  "Leitura de obra: composição e ponto de vista": "artes-classica-moderna",
  "Arte contemporânea e curadoria": "artes-contemporanea",
  "Arte urbana e arte digital": "artes-contemporanea",

  // ---------------------------------------------------------------- Atualidades
  "Presidencialismo de coalizão e sistema político brasileiro": "atualidades-politica-economia",
  "Reforma tributária brasileira": "atualidades-politica-economia",
  "Reforma da previdência e transição demográfica": "atualidades-politica-economia",
  "Federalismo fiscal e financiamento de campanhas": "atualidades-politica-economia",
  "Mercosul e União Europeia: blocos econômicos": "atualidades-geopolitica",
  "ONU, OMC e FMI: organismos multilaterais": "atualidades-geopolitica",
  "Multipolaridade e guerras por procuração": "atualidades-geopolitica",
  "Cadeias globais de valor e geopolítica dos semicondutores": "atualidades-geopolitica",
  "Refugiados e direito internacional humanitário": "atualidades-geopolitica",
  "Conflitos e geopolítica recente": "atualidades-geopolitica",
  "Efeito estufa e acordos climáticos internacionais": "atualidades-meioambiente",
  "Transição energética e energias renováveis": "atualidades-meioambiente",
  "Economia circular e critérios ESG": "atualidades-meioambiente",
  "Perda de biodiversidade e escassez hídrica": "atualidades-meioambiente",
  "Crise climática, COP e transição energética": "atualidades-meioambiente",
  "Machine learning e inteligência artificial generativa": "atualidades-tecnologia",
  "LGPD e proteção de dados pessoais": "atualidades-tecnologia",
  "Bolhas de filtro e desinformação nas redes sociais": "atualidades-tecnologia",
  "Blockchain e criptomoedas": "atualidades-tecnologia",
  "Inteligência artificial: usos e efeitos sociais": "atualidades-tecnologia",
  "Saúde pública: SUS, vacinas e epidemias": "atualidades-saude",
  "Trabalho por plataforma e pejotização": "atualidades-sociedade-educacao",

  // ----------------------------------------------------------- Direitos Humanos
  "Gerações de direitos humanos e a DUDH": "dh-fundamentos",
  "Ações afirmativas e cotas raciais no Brasil": "dh-igualdade-discriminacao",
  "Direitos da criança, do adolescente e das pessoas com deficiência": "dh-direitos-sociais",
  "Direito à moradia e refugiados": "dh-direitos-sociais",
};

// Recortes escritos agora, para os subtemas que o catálogo antigo não cobria
// porque não existiam como unidade de estudo — nenhuma trilha tinha uma aula de
// "hidrostática" quando Física era uma frente só.
const NOVOS = {
  "biologia-diversidade": [
    { tema: "Reinos e classificação dos seres vivos", busca: "aula reinos classificação dos seres vivos vestibular" },
  ],
  "quimica-atomistica-ligacoes": [
    { tema: "Tabela periódica e propriedades", busca: "aula tabela periódica propriedades periódicas vestibular" },
    { tema: "Ligações químicas e geometria molecular", busca: "aula ligações químicas geometria molecular polaridade vestibular" },
  ],
  "fisica-hidrostatica": [
    { tema: "Pressão, densidade e empuxo", busca: "aula hidrostática pressão empuxo arquimedes vestibular" },
  ],
  "historia-geral-antiga-medieval": [
    { tema: "Grécia e Roma antigas", busca: "aula grécia roma antiga vestibular" },
    { tema: "Feudalismo e Idade Média", busca: "aula feudalismo idade média vestibular" },
  ],
  "gramatica-sintaxe-periodo": [
    { tema: "Análise sintática: termos da oração", busca: "aula análise sintática termos da oração vestibular" },
    { tema: "Período composto: subordinação e coordenação", busca: "aula período composto orações subordinadas vestibular" },
  ],
  "interpretacao-recursos-linguagem": [
    { tema: "Figuras de linguagem e ironia", busca: "aula figuras de linguagem ironia vestibular" },
  ],
  "ingles-grammar-structure": [
    { tema: "Tempos verbais e voz passiva", busca: "aula tempos verbais voz passiva inglês vestibular" },
    { tema: "Linking words e estrutura do texto", busca: "linking words connectors inglês vestibular" },
  ],
  "literatura-colonial-romantismo": [
    { tema: "Barroco e Arcadismo", busca: "aula barroco arcadismo vestibular" },
  ],
  "sociologia-instituicoes-movimentos": [
    { tema: "Movimentos sociais e cidadania", busca: "aula movimentos sociais cidadania sociologia vestibular" },
  ],
  "sociologia-cultura-identidade": [
    { tema: "Cultura, identidade e etnocentrismo", busca: "aula cultura identidade etnocentrismo sociologia vestibular" },
  ],
  "artes-musica-cena": [
    { tema: "Música popular brasileira", busca: "aula história da música popular brasileira vestibular" },
    { tema: "Teatro e dança", busca: "aula história do teatro e da dança vestibular" },
  ],
  "artes-audiovisual-midia": [
    { tema: "Cinema Novo e cinema brasileiro", busca: "aula cinema novo cinema brasileiro vestibular" },
    { tema: "Fotografia e reprodutibilidade da imagem", busca: "aula fotografia reprodutibilidade técnica benjamin vestibular" },
  ],
  "artes-patrimonio-cultura-popular": [
    { tema: "Patrimônio cultural material e imaterial", busca: "aula patrimônio cultural imaterial iphan vestibular" },
    { tema: "Arte indígena e afro-brasileira", busca: "aula arte indígena afro-brasileira vestibular" },
  ],
  "atualidades-saude": [
    { tema: "Saúde mental e alimentação", busca: "atualidades saúde mental ultraprocessados resumo" },
  ],
  "atualidades-sociedade-educacao": [
    { tema: "Educação e desigualdade no Brasil", busca: "atualidades educação desigualdade brasil resumo" },
    { tema: "Segurança pública e sistema prisional", busca: "atualidades segurança pública encarceramento resumo" },
  ],
  "dh-constitucional": [
    { tema: "Constituição de 1988 e direitos fundamentais", busca: "aula constituição 1988 direitos fundamentais vestibular" },
  ],
  "dh-justica-seguranca": [
    { tema: "Sistema penal e acesso à justiça", busca: "aula sistema penal encarceramento direitos humanos vestibular" },
  ],
  "dh-fundamentos": [
    { tema: "Sistema interamericano de direitos humanos", busca: "aula sistema interamericano corte direitos humanos vestibular" },
  ],
  "biologia-evolucao": [
    { tema: "Origem da vida e seleção natural", busca: "aula origem da vida seleção natural vestibular" },
  ],
  "geografia-geopolitica": [
    { tema: "Blocos econômicos e globalização", busca: "aula blocos econômicos globalização vestibular" },
  ],
  "geografia-ambiente-sustentabilidade": [
    { tema: "Resíduos, saneamento e crise hídrica", busca: "aula saneamento resíduos crise hídrica vestibular" },
  ],
  "interpretacao-ideia-central": [
    { tema: "Como achar a tese e o título do texto", busca: "aula ideia central tese do texto vestibular" },
  ],
  "matematica-algebra": [
    { tema: "Matrizes e sistemas lineares", busca: "aula matrizes determinantes sistemas lineares vestibular" },
  ],
};

// ---------------------------------------------------------------- consolidação
//
//   node banco-central/videos.js --consolidar
//
// Lê os `data/video-topics.js` das três trilhas, aplica o mapa acima e grava
// `data/videos.json`, que passa a ser a fonte. Roda UMA vez, na migração: depois
// dela os video-topics.js de cada trilha viram artefato do build e os originais
// só existem no histórico do git.

const fs = require("fs");
const path = require("path");

function consolidar() {
  const RAIZ = path.join(__dirname, "..");
  const porSubtema = {};
  const buscaDoTema = new Map();
  const semMapa = new Set();

  ["direito", "medicina", "economia"].forEach((trilha) => {
    const arq = path.join(RAIZ, "vestibular-" + trilha, "data", "video-topics.js");
    if (!fs.existsSync(arq)) return;
    const sandbox = { window: {} };
    // eslint-disable-next-line no-new-func
    new Function("window", fs.readFileSync(arq, "utf8")).call(sandbox, sandbox.window);
    Object.values(sandbox.window.VIDEO_TOPICS || {}).forEach((lista) => {
      (lista || []).forEach((v) => {
        if (!buscaDoTema.has(v.tema)) buscaDoTema.set(v.tema, v.busca);
        const subtema = TEMA_PARA_SUBTEMA[v.tema];
        if (!subtema) { semMapa.add(v.tema); return; }
        porSubtema[subtema] = porSubtema[subtema] || [];
        if (!porSubtema[subtema].some((x) => x.tema === v.tema)) {
          porSubtema[subtema].push({ tema: v.tema, busca: v.busca });
        }
      });
    });
  });

  Object.entries(NOVOS).forEach(([subtema, lista]) => {
    porSubtema[subtema] = porSubtema[subtema] || [];
    lista.forEach((v) => {
      if (!porSubtema[subtema].some((x) => x.tema === v.tema)) porSubtema[subtema].push(v);
    });
  });

  if (semMapa.size) {
    console.error("TEMAS SEM SUBTEMA (" + semMapa.size + ") — acrescente a TEMA_PARA_SUBTEMA:");
    [...semMapa].forEach((t) => console.error("  \"" + t + "\": \"\","));
    process.exit(1);
  }

  const destino = path.join(__dirname, "data", "videos.json");
  fs.writeFileSync(destino, JSON.stringify({
    gerado: new Date().toISOString().slice(0, 10),
    subtemas: Object.keys(porSubtema).length,
    total: Object.values(porSubtema).reduce((s, l) => s + l.length, 0),
    porSubtema: porSubtema,
  }, null, 1) + "\n", "utf8");

  console.log("videos.json: " + Object.keys(porSubtema).length + " subtemas, " +
    Object.values(porSubtema).reduce((s, l) => s + l.length, 0) + " aulas");
  Object.entries(porSubtema).sort((a, b) => a[1].length - b[1].length).slice(0, 6)
    .forEach(([s, l]) => console.log("  menor: " + s + " (" + l.length + ")"));
}

module.exports = { TEMA_PARA_SUBTEMA, NOVOS };
if (require.main === module && process.argv.includes("--consolidar")) consolidar();

