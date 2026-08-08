// Banco complementar — 1.500 questões autorais adaptadas do PDF
// "banco-1500-questoes-fgv-insper" (edição de 08/08/2026), gerado por
// adaptar-banco-extra.py.
//
// POR QUE ELE NÃO ESTÁ EM data/questions/ COMO OS OUTROS: este banco só pode
// aparecer na aba Buscar. Ele não passou pelo mesmo crivo do banco principal —
// é material de treino por assunto, sem texto-base longo, sem escada de
// asserções e sem atualidades datadas, então não serve de simulado nem de dia
// de estudo. Ficar fora de window.QUESTION_BANKS é o que garante isso: o
// schedule.js lê aquele global e só aquele, e assim nenhuma questão daqui pode
// vazar para o cronograma, para o simulado, para o caderno de erros ou para o
// progresso por frente, sem depender de ninguém lembrar de filtrar.
//
// O que foi adaptado em relação ao PDF (auditoria completa no relatório):
//   - 148 itens "assinale a associação correta" traziam a resposta escrita no
//     próprio enunciado; viraram "qual definição corresponde a X".
//   - 150 itens de compreensão tinham os quatro distratores falando de OUTRA
//     passagem; ganharam distratores escritos para a própria passagem.
//   - as 470 questões numéricas foram resolvidas uma a uma e só entraram as
//     que batem com o gabarito do PDF; a explicação é a conta.
//   - o PDF não traz explicação nenhuma, e o app exige o campo.

window.SUBTOPICS_EXTRA = [
  {
    "id": "interpretacao-texto",
    "area": "Linguagens",
    "nome": "Interpretação de Texto"
  },
  {
    "id": "literatura",
    "area": "Linguagens",
    "nome": "Literatura Brasileira"
  },
  {
    "id": "gramatica",
    "area": "Linguagens",
    "nome": "Gramática e Norma Culta"
  },
  {
    "id": "ingles",
    "area": "Linguagens",
    "nome": "Inglês: Reading Comprehension"
  },
  {
    "id": "matematica-rlm",
    "area": "Exatas",
    "nome": "Matemática Básica e Raciocínio Lógico"
  },
  {
    "id": "ciencias-natureza",
    "area": "Exatas",
    "nome": "Ciências da Natureza (Noções Gerais)"
  },
  {
    "id": "historia-geral",
    "area": "Ciências Humanas",
    "nome": "História Geral"
  },
  {
    "id": "historia-brasil",
    "area": "Ciências Humanas",
    "nome": "História do Brasil"
  },
  {
    "id": "geografia",
    "area": "Ciências Humanas",
    "nome": "Geografia Humana e Física"
  },
  {
    "id": "filosofia-sociologia",
    "area": "Ciências Humanas",
    "nome": "Filosofia e Sociologia"
  },
  {
    "id": "artes-cultura",
    "area": "Ciências Humanas",
    "nome": "Artes e Cultura Contemporânea"
  },
  {
    "id": "direitos-humanos",
    "area": "Ciências Humanas",
    "nome": "Direitos Humanos e Cidadania"
  },
  {
    "id": "atualidades-geopolitica",
    "area": "Atualidades",
    "nome": "Atualidades: Geopolítica e Relações Internacionais"
  },
  {
    "id": "atualidades-meioambiente",
    "area": "Atualidades",
    "nome": "Atualidades: Meio Ambiente e Sustentabilidade"
  },
  {
    "id": "atualidades-politica",
    "area": "Atualidades",
    "nome": "Atualidades: Política e Economia do Brasil"
  }
];

window.QUESTION_BANKS_EXTRA = {
  "interpretacao-texto": [
    {
      "id": "xtr-port-0106",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Marina comprou o livro e o leu no ônibus.",
        "b": "A escola reformou a quadra; aquele sem referente ampliou as atividades.",
        "c": "Marina comprou o livro e ela leu ele sem necessidade.",
        "d": "O relatório apresentou duas hipóteses. O primeiro foi descartado.",
        "e": "Os pesquisadores publicaram os dados porque elas já haviam sido revisadas."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é coesão referencial. A única construção que o respeita é «Marina comprou o livro e o leu no ônibus.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0107",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Os pesquisadores publicaram os dados porque elas já haviam sido revisadas.",
        "b": "A escola reformou a quadra; essa melhoria ampliou as atividades.",
        "c": "A escola reformou a quadra; aquele sem referente ampliou as atividades.",
        "d": "Visitamos a biblioteca, quando encontramos o manuscrito espacial.",
        "e": "O relatório apresentou duas hipóteses. O primeiro foi descartado."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é coesão referencial. A única construção que o respeita é «A escola reformou a quadra; essa melhoria ampliou as atividades.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0108",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "O relatório apresentou duas hipóteses. O primeiro foi descartado.",
        "b": "Os pesquisadores publicaram os dados porque elas já haviam sido revisadas.",
        "c": "Os pesquisadores publicaram os dados porque eles já haviam sido revisados.",
        "d": "Visitamos a biblioteca, quando encontramos o manuscrito espacial.",
        "e": "Marina comprou o livro e ela leu ele sem necessidade."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é coesão referencial. A única construção que o respeita é «Os pesquisadores publicaram os dados porque eles já haviam sido revisados.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0109",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Visitamos a biblioteca, quando encontramos o manuscrito espacial.",
        "b": "O relatório apresentou duas hipóteses. O primeiro foi descartado.",
        "c": "A escola reformou a quadra; aquele sem referente ampliou as atividades.",
        "d": "O relatório apresentou duas hipóteses. A primeira foi descartada.",
        "e": "Marina comprou o livro e ela leu ele sem necessidade."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é coesão referencial. A única construção que o respeita é «O relatório apresentou duas hipóteses. A primeira foi descartada.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0110",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Os pesquisadores publicaram os dados porque elas já haviam sido revisadas.",
        "b": "Marina comprou o livro e ela leu ele sem necessidade.",
        "c": "Visitamos a biblioteca, quando encontramos o manuscrito espacial.",
        "d": "A escola reformou a quadra; aquele sem referente ampliou as atividades.",
        "e": "Visitamos a biblioteca, onde encontramos o manuscrito."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é coesão referencial. A única construção que o respeita é «Visitamos a biblioteca, onde encontramos o manuscrito.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0121",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: uso de palavra em sentido literal e relativamente estável?",
      "alternativas": {
        "a": "Denotação",
        "b": "Metonímia",
        "c": "Conotação",
        "d": "Ironia",
        "e": "Metáfora"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Denotação: uso de palavra em sentido literal e relativamente estável. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0122",
      "enunciado": "Qual condição ajuda a caracterizar Denotação?",
      "alternativas": {
        "a": "uma característica é transferida de um domínio para outro",
        "b": "relação direta entre expressão e referente reduz ambiguidades",
        "c": "marcas contextuais levam o leitor a rejeitar a leitura literal",
        "d": "contexto ativa valores que ultrapassam o significado literal",
        "e": "autor pela obra, parte pelo todo ou recipiente pelo conteúdo são relações frequentes"
      },
      "resposta": "b",
      "explicacao": "Denotação: relação direta entre expressão e referente reduz ambiguidades. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0123",
      "enunciado": "Qual consequência ou função se associa corretamente a Denotação?",
      "alternativas": {
        "a": "condensa referências sem depender de semelhança metafórica",
        "b": "permite crítica indireta e exige atenção ao ponto de vista",
        "c": "favorece comunicação objetiva sem impedir escolhas de estilo",
        "d": "amplia possibilidades expressivas e interpretativas",
        "e": "produz síntese expressiva e novas formas de perceber um tema"
      },
      "resposta": "c",
      "explicacao": "Denotação: favorece comunicação objetiva sem impedir escolhas de estilo. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0124",
      "enunciado": "Qual definição corresponde corretamente a Denotação?",
      "alternativas": {
        "a": "aproximação implícita entre campos de sentido sem conectivo comparativo",
        "b": "substituição de um termo por outro com relação de proximidade",
        "c": "uso de palavra com sentidos figurados, afetivos ou associados",
        "d": "uso de palavra em sentido literal e relativamente estável",
        "e": "produção de sentido pela tensão entre o que se diz e o que o contexto permite entender"
      },
      "resposta": "d",
      "explicacao": "Denotação é uso de palavra em sentido literal e relativamente estável. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0125",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: uso de palavra com sentidos figurados, afetivos ou associados?",
      "alternativas": {
        "a": "Ironia",
        "b": "Metonímia",
        "c": "Antítese",
        "d": "Metáfora",
        "e": "Conotação"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Conotação: uso de palavra com sentidos figurados, afetivos ou associados. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0126",
      "enunciado": "Qual condição ajuda a caracterizar Conotação?",
      "alternativas": {
        "a": "contexto ativa valores que ultrapassam o significado literal",
        "b": "oposição semântica organiza a estrutura do enunciado",
        "c": "autor pela obra, parte pelo todo ou recipiente pelo conteúdo são relações frequentes",
        "d": "marcas contextuais levam o leitor a rejeitar a leitura literal",
        "e": "uma característica é transferida de um domínio para outro"
      },
      "resposta": "a",
      "explicacao": "Conotação: contexto ativa valores que ultrapassam o significado literal. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0127",
      "enunciado": "Qual consequência ou função se associa corretamente a Conotação?",
      "alternativas": {
        "a": "produz síntese expressiva e novas formas de perceber um tema",
        "b": "amplia possibilidades expressivas e interpretativas",
        "c": "destaca conflitos, diferenças e mudanças",
        "d": "condensa referências sem depender de semelhança metafórica",
        "e": "permite crítica indireta e exige atenção ao ponto de vista"
      },
      "resposta": "b",
      "explicacao": "Conotação: amplia possibilidades expressivas e interpretativas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0128",
      "enunciado": "Qual definição corresponde corretamente a Conotação?",
      "alternativas": {
        "a": "aproximação implícita entre campos de sentido sem conectivo comparativo",
        "b": "produção de sentido pela tensão entre o que se diz e o que o contexto permite entender",
        "c": "uso de palavra com sentidos figurados, afetivos ou associados",
        "d": "aproximação de ideias ou palavras de sentidos opostos",
        "e": "substituição de um termo por outro com relação de proximidade"
      },
      "resposta": "c",
      "explicacao": "Conotação é uso de palavra com sentidos figurados, afetivos ou associados. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0129",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: aproximação implícita entre campos de sentido sem conectivo comparativo?",
      "alternativas": {
        "a": "Antítese",
        "b": "Metonímia",
        "c": "Personificação",
        "d": "Metáfora",
        "e": "Ironia"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Metáfora: aproximação implícita entre campos de sentido sem conectivo comparativo. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0130",
      "enunciado": "Qual condição ajuda a caracterizar Metáfora?",
      "alternativas": {
        "a": "a linguagem projeta comportamento humano sobre objetos ou fenômenos",
        "b": "autor pela obra, parte pelo todo ou recipiente pelo conteúdo são relações frequentes",
        "c": "marcas contextuais levam o leitor a rejeitar a leitura literal",
        "d": "oposição semântica organiza a estrutura do enunciado",
        "e": "uma característica é transferida de um domínio para outro"
      },
      "resposta": "e",
      "explicacao": "Metáfora: uma característica é transferida de um domínio para outro. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0131",
      "enunciado": "Qual consequência ou função se associa corretamente a Metáfora?",
      "alternativas": {
        "a": "produz síntese expressiva e novas formas de perceber um tema",
        "b": "destaca conflitos, diferenças e mudanças",
        "c": "condensa referências sem depender de semelhança metafórica",
        "d": "permite crítica indireta e exige atenção ao ponto de vista",
        "e": "cria imagens e aproxima elementos abstratos do leitor"
      },
      "resposta": "a",
      "explicacao": "Metáfora: produz síntese expressiva e novas formas de perceber um tema. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0132",
      "enunciado": "Qual definição corresponde corretamente a Metáfora?",
      "alternativas": {
        "a": "produção de sentido pela tensão entre o que se diz e o que o contexto permite entender",
        "b": "aproximação implícita entre campos de sentido sem conectivo comparativo",
        "c": "substituição de um termo por outro com relação de proximidade",
        "d": "aproximação de ideias ou palavras de sentidos opostos",
        "e": "atribuição de ações ou características humanas a seres não humanos"
      },
      "resposta": "b",
      "explicacao": "Metáfora é aproximação implícita entre campos de sentido sem conectivo comparativo. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0133",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: substituição de um termo por outro com relação de proximidade?",
      "alternativas": {
        "a": "Antítese",
        "b": "Personificação",
        "c": "Metonímia",
        "d": "Ambiguidade",
        "e": "Ironia"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Metonímia: substituição de um termo por outro com relação de proximidade. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0134",
      "enunciado": "Qual condição ajuda a caracterizar Metonímia?",
      "alternativas": {
        "a": "a linguagem projeta comportamento humano sobre objetos ou fenômenos",
        "b": "oposição semântica organiza a estrutura do enunciado",
        "c": "marcas contextuais levam o leitor a rejeitar a leitura literal",
        "d": "autor pela obra, parte pelo todo ou recipiente pelo conteúdo são relações frequentes",
        "e": "referências ou estruturas podem permitir leituras concorrentes"
      },
      "resposta": "d",
      "explicacao": "Metonímia: autor pela obra, parte pelo todo ou recipiente pelo conteúdo são relações frequentes. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0135",
      "enunciado": "Qual consequência ou função se associa corretamente a Metonímia?",
      "alternativas": {
        "a": "cria imagens e aproxima elementos abstratos do leitor",
        "b": "destaca conflitos, diferenças e mudanças",
        "c": "permite crítica indireta e exige atenção ao ponto de vista",
        "d": "pode ser recurso expressivo ou problema de clareza",
        "e": "condensa referências sem depender de semelhança metafórica"
      },
      "resposta": "e",
      "explicacao": "Metonímia: condensa referências sem depender de semelhança metafórica. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0136",
      "enunciado": "Qual definição corresponde corretamente a Metonímia?",
      "alternativas": {
        "a": "substituição de um termo por outro com relação de proximidade",
        "b": "produção de sentido pela tensão entre o que se diz e o que o contexto permite entender",
        "c": "aproximação de ideias ou palavras de sentidos opostos",
        "d": "possibilidade de mais de uma interpretação para a mesma construção",
        "e": "atribuição de ações ou características humanas a seres não humanos"
      },
      "resposta": "a",
      "explicacao": "Metonímia é substituição de um termo por outro com relação de proximidade. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0137",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: produção de sentido pela tensão entre o que se diz e o que o contexto permite entender?",
      "alternativas": {
        "a": "Personificação",
        "b": "Ironia",
        "c": "Polissemia",
        "d": "Ambiguidade",
        "e": "Antítese"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Ironia: produção de sentido pela tensão entre o que se diz e o que o contexto permite entender. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0138",
      "enunciado": "Qual condição ajuda a caracterizar Ironia?",
      "alternativas": {
        "a": "uso histórico e contextual amplia significados sem criar necessariamente palavras distintas",
        "b": "a linguagem projeta comportamento humano sobre objetos ou fenômenos",
        "c": "marcas contextuais levam o leitor a rejeitar a leitura literal",
        "d": "referências ou estruturas podem permitir leituras concorrentes",
        "e": "oposição semântica organiza a estrutura do enunciado"
      },
      "resposta": "c",
      "explicacao": "Ironia: marcas contextuais levam o leitor a rejeitar a leitura literal. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0139",
      "enunciado": "Qual consequência ou função se associa corretamente a Ironia?",
      "alternativas": {
        "a": "cria imagens e aproxima elementos abstratos do leitor",
        "b": "pode ser recurso expressivo ou problema de clareza",
        "c": "exige seleção do sentido adequado ao contexto",
        "d": "permite crítica indireta e exige atenção ao ponto de vista",
        "e": "destaca conflitos, diferenças e mudanças"
      },
      "resposta": "d",
      "explicacao": "Ironia: permite crítica indireta e exige atenção ao ponto de vista. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0140",
      "enunciado": "Qual definição corresponde corretamente a Ironia?",
      "alternativas": {
        "a": "possibilidade de mais de uma interpretação para a mesma construção",
        "b": "atribuição de ações ou características humanas a seres não humanos",
        "c": "existência de sentidos relacionados para uma mesma palavra",
        "d": "aproximação de ideias ou palavras de sentidos opostos",
        "e": "produção de sentido pela tensão entre o que se diz e o que o contexto permite entender"
      },
      "resposta": "e",
      "explicacao": "Ironia é produção de sentido pela tensão entre o que se diz e o que o contexto permite entender. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0141",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: aproximação de ideias ou palavras de sentidos opostos?",
      "alternativas": {
        "a": "Antítese",
        "b": "Polissemia",
        "c": "Coesão referencial",
        "d": "Personificação",
        "e": "Ambiguidade"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Antítese: aproximação de ideias ou palavras de sentidos opostos. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0142",
      "enunciado": "Qual condição ajuda a caracterizar Antítese?",
      "alternativas": {
        "a": "referências ou estruturas podem permitir leituras concorrentes",
        "b": "oposição semântica organiza a estrutura do enunciado",
        "c": "referentes são conectados ao longo das frases",
        "d": "a linguagem projeta comportamento humano sobre objetos ou fenômenos",
        "e": "uso histórico e contextual amplia significados sem criar necessariamente palavras distintas"
      },
      "resposta": "b",
      "explicacao": "Antítese: oposição semântica organiza a estrutura do enunciado. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0143",
      "enunciado": "Qual consequência ou função se associa corretamente a Antítese?",
      "alternativas": {
        "a": "exige seleção do sentido adequado ao contexto",
        "b": "pode ser recurso expressivo ou problema de clareza",
        "c": "destaca conflitos, diferenças e mudanças",
        "d": "evita repetição excessiva e mantém continuidade temática",
        "e": "cria imagens e aproxima elementos abstratos do leitor"
      },
      "resposta": "c",
      "explicacao": "Antítese: destaca conflitos, diferenças e mudanças. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0144",
      "enunciado": "Qual definição corresponde corretamente a Antítese?",
      "alternativas": {
        "a": "atribuição de ações ou características humanas a seres não humanos",
        "b": "possibilidade de mais de uma interpretação para a mesma construção",
        "c": "retomada ou antecipação de elementos por pronomes, expressões e elipses",
        "d": "aproximação de ideias ou palavras de sentidos opostos",
        "e": "existência de sentidos relacionados para uma mesma palavra"
      },
      "resposta": "d",
      "explicacao": "Antítese é aproximação de ideias ou palavras de sentidos opostos. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0145",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: atribuição de ações ou características humanas a seres não humanos?",
      "alternativas": {
        "a": "Ambiguidade",
        "b": "Coesão referencial",
        "c": "Polissemia",
        "d": "Discurso indireto livre",
        "e": "Personificação"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Personificação: atribuição de ações ou características humanas a seres não humanos. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0146",
      "enunciado": "Qual condição ajuda a caracterizar Personificação?",
      "alternativas": {
        "a": "a linguagem projeta comportamento humano sobre objetos ou fenômenos",
        "b": "referentes são conectados ao longo das frases",
        "c": "referências ou estruturas podem permitir leituras concorrentes",
        "d": "uso histórico e contextual amplia significados sem criar necessariamente palavras distintas",
        "e": "mudança de perspectiva ocorre sem verbo de elocução obrigatório"
      },
      "resposta": "a",
      "explicacao": "Personificação: a linguagem projeta comportamento humano sobre objetos ou fenômenos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0147",
      "enunciado": "Qual consequência ou função se associa corretamente a Personificação?",
      "alternativas": {
        "a": "evita repetição excessiva e mantém continuidade temática",
        "b": "cria imagens e aproxima elementos abstratos do leitor",
        "c": "exige seleção do sentido adequado ao contexto",
        "d": "aproxima leitor da consciência da personagem e cria ambiguidade de vozes",
        "e": "pode ser recurso expressivo ou problema de clareza"
      },
      "resposta": "b",
      "explicacao": "Personificação: cria imagens e aproxima elementos abstratos do leitor. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0148",
      "enunciado": "Qual definição corresponde corretamente a Personificação?",
      "alternativas": {
        "a": "mistura da voz do narrador com pensamentos ou linguagem da personagem sem marcas explícitas",
        "b": "possibilidade de mais de uma interpretação para a mesma construção",
        "c": "atribuição de ações ou características humanas a seres não humanos",
        "d": "existência de sentidos relacionados para uma mesma palavra",
        "e": "retomada ou antecipação de elementos por pronomes, expressões e elipses"
      },
      "resposta": "c",
      "explicacao": "Personificação é atribuição de ações ou características humanas a seres não humanos. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0149",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: possibilidade de mais de uma interpretação para a mesma construção?",
      "alternativas": {
        "a": "Coesão referencial",
        "b": "Discurso indireto livre",
        "c": "Polissemia",
        "d": "Ambiguidade",
        "e": "Variação linguística"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Ambiguidade: possibilidade de mais de uma interpretação para a mesma construção. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0150",
      "enunciado": "Qual condição ajuda a caracterizar Ambiguidade?",
      "alternativas": {
        "a": "referentes são conectados ao longo das frases",
        "b": "mudança de perspectiva ocorre sem verbo de elocução obrigatório",
        "c": "uso histórico e contextual amplia significados sem criar necessariamente palavras distintas",
        "d": "línguas mudam e usuários adequam registros a contextos",
        "e": "referências ou estruturas podem permitir leituras concorrentes"
      },
      "resposta": "e",
      "explicacao": "Ambiguidade: referências ou estruturas podem permitir leituras concorrentes. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0151",
      "enunciado": "Qual consequência ou função se associa corretamente a Ambiguidade?",
      "alternativas": {
        "a": "pode ser recurso expressivo ou problema de clareza",
        "b": "permite distinguir adequação comunicativa de preconceito linguístico",
        "c": "exige seleção do sentido adequado ao contexto",
        "d": "aproxima leitor da consciência da personagem e cria ambiguidade de vozes",
        "e": "evita repetição excessiva e mantém continuidade temática"
      },
      "resposta": "a",
      "explicacao": "Ambiguidade: pode ser recurso expressivo ou problema de clareza. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0152",
      "enunciado": "Qual definição corresponde corretamente a Ambiguidade?",
      "alternativas": {
        "a": "mistura da voz do narrador com pensamentos ou linguagem da personagem sem marcas explícitas",
        "b": "possibilidade de mais de uma interpretação para a mesma construção",
        "c": "existência de sentidos relacionados para uma mesma palavra",
        "d": "diversidade de usos conforme região, grupo, situação e tempo",
        "e": "retomada ou antecipação de elementos por pronomes, expressões e elipses"
      },
      "resposta": "b",
      "explicacao": "Ambiguidade é possibilidade de mais de uma interpretação para a mesma construção. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0153",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: existência de sentidos relacionados para uma mesma palavra?",
      "alternativas": {
        "a": "Coesão referencial",
        "b": "Variação linguística",
        "c": "Polissemia",
        "d": "Discurso indireto livre",
        "e": "Denotação"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Polissemia: existência de sentidos relacionados para uma mesma palavra. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0154",
      "enunciado": "Qual condição ajuda a caracterizar Polissemia?",
      "alternativas": {
        "a": "mudança de perspectiva ocorre sem verbo de elocução obrigatório",
        "b": "relação direta entre expressão e referente reduz ambiguidades",
        "c": "referentes são conectados ao longo das frases",
        "d": "uso histórico e contextual amplia significados sem criar necessariamente palavras distintas",
        "e": "línguas mudam e usuários adequam registros a contextos"
      },
      "resposta": "d",
      "explicacao": "Polissemia: uso histórico e contextual amplia significados sem criar necessariamente palavras distintas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0155",
      "enunciado": "Qual consequência ou função se associa corretamente a Polissemia?",
      "alternativas": {
        "a": "permite distinguir adequação comunicativa de preconceito linguístico",
        "b": "favorece comunicação objetiva sem impedir escolhas de estilo",
        "c": "aproxima leitor da consciência da personagem e cria ambiguidade de vozes",
        "d": "evita repetição excessiva e mantém continuidade temática",
        "e": "exige seleção do sentido adequado ao contexto"
      },
      "resposta": "e",
      "explicacao": "Polissemia: exige seleção do sentido adequado ao contexto. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0156",
      "enunciado": "Qual definição corresponde corretamente a Polissemia?",
      "alternativas": {
        "a": "existência de sentidos relacionados para uma mesma palavra",
        "b": "uso de palavra em sentido literal e relativamente estável",
        "c": "diversidade de usos conforme região, grupo, situação e tempo",
        "d": "retomada ou antecipação de elementos por pronomes, expressões e elipses",
        "e": "mistura da voz do narrador com pensamentos ou linguagem da personagem sem marcas explícitas"
      },
      "resposta": "a",
      "explicacao": "Polissemia é existência de sentidos relacionados para uma mesma palavra. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0157",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: retomada ou antecipação de elementos por pronomes, expressões e elipses?",
      "alternativas": {
        "a": "Conotação",
        "b": "Coesão referencial",
        "c": "Discurso indireto livre",
        "d": "Variação linguística",
        "e": "Denotação"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Coesão referencial: retomada ou antecipação de elementos por pronomes, expressões e elipses. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0158",
      "enunciado": "Qual condição ajuda a caracterizar Coesão referencial?",
      "alternativas": {
        "a": "relação direta entre expressão e referente reduz ambiguidades",
        "b": "línguas mudam e usuários adequam registros a contextos",
        "c": "referentes são conectados ao longo das frases",
        "d": "contexto ativa valores que ultrapassam o significado literal",
        "e": "mudança de perspectiva ocorre sem verbo de elocução obrigatório"
      },
      "resposta": "c",
      "explicacao": "Coesão referencial: referentes são conectados ao longo das frases. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0159",
      "enunciado": "Qual consequência ou função se associa corretamente a Coesão referencial?",
      "alternativas": {
        "a": "favorece comunicação objetiva sem impedir escolhas de estilo",
        "b": "aproxima leitor da consciência da personagem e cria ambiguidade de vozes",
        "c": "permite distinguir adequação comunicativa de preconceito linguístico",
        "d": "evita repetição excessiva e mantém continuidade temática",
        "e": "amplia possibilidades expressivas e interpretativas"
      },
      "resposta": "d",
      "explicacao": "Coesão referencial: evita repetição excessiva e mantém continuidade temática. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0160",
      "enunciado": "Qual definição corresponde corretamente a Coesão referencial?",
      "alternativas": {
        "a": "uso de palavra com sentidos figurados, afetivos ou associados",
        "b": "uso de palavra em sentido literal e relativamente estável",
        "c": "diversidade de usos conforme região, grupo, situação e tempo",
        "d": "mistura da voz do narrador com pensamentos ou linguagem da personagem sem marcas explícitas",
        "e": "retomada ou antecipação de elementos por pronomes, expressões e elipses"
      },
      "resposta": "e",
      "explicacao": "Coesão referencial é retomada ou antecipação de elementos por pronomes, expressões e elipses. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0161",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: mistura da voz do narrador com pensamentos ou linguagem da personagem sem marcas explícitas?",
      "alternativas": {
        "a": "Discurso indireto livre",
        "b": "Metáfora",
        "c": "Conotação",
        "d": "Denotação",
        "e": "Variação linguística"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Discurso indireto livre: mistura da voz do narrador com pensamentos ou linguagem da personagem sem marcas explícitas. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0162",
      "enunciado": "Qual condição ajuda a caracterizar Discurso indireto livre?",
      "alternativas": {
        "a": "línguas mudam e usuários adequam registros a contextos",
        "b": "mudança de perspectiva ocorre sem verbo de elocução obrigatório",
        "c": "contexto ativa valores que ultrapassam o significado literal",
        "d": "relação direta entre expressão e referente reduz ambiguidades",
        "e": "uma característica é transferida de um domínio para outro"
      },
      "resposta": "b",
      "explicacao": "Discurso indireto livre: mudança de perspectiva ocorre sem verbo de elocução obrigatório. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0163",
      "enunciado": "Qual consequência ou função se associa corretamente a Discurso indireto livre?",
      "alternativas": {
        "a": "favorece comunicação objetiva sem impedir escolhas de estilo",
        "b": "permite distinguir adequação comunicativa de preconceito linguístico",
        "c": "aproxima leitor da consciência da personagem e cria ambiguidade de vozes",
        "d": "produz síntese expressiva e novas formas de perceber um tema",
        "e": "amplia possibilidades expressivas e interpretativas"
      },
      "resposta": "c",
      "explicacao": "Discurso indireto livre: aproxima leitor da consciência da personagem e cria ambiguidade de vozes. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0164",
      "enunciado": "Qual definição corresponde corretamente a Discurso indireto livre?",
      "alternativas": {
        "a": "diversidade de usos conforme região, grupo, situação e tempo",
        "b": "uso de palavra com sentidos figurados, afetivos ou associados",
        "c": "aproximação implícita entre campos de sentido sem conectivo comparativo",
        "d": "mistura da voz do narrador com pensamentos ou linguagem da personagem sem marcas explícitas",
        "e": "uso de palavra em sentido literal e relativamente estável"
      },
      "resposta": "d",
      "explicacao": "Discurso indireto livre é mistura da voz do narrador com pensamentos ou linguagem da personagem sem marcas explícitas. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "literatura": [
    {
      "id": "xtr-port-0169",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: estética de contrastes, jogos de linguagem e tensão entre valores terrenos e religiosos?",
      "alternativas": {
        "a": "Barroco",
        "b": "Realismo",
        "c": "Naturalismo",
        "d": "Arcadismo",
        "e": "Romantismo"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Barroco: estética de contrastes, jogos de linguagem e tensão entre valores terrenos e religiosos. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0170",
      "enunciado": "Em que contexto histórico deve ser situado o tema Barroco?",
      "alternativas": {
        "a": "final do século XIX",
        "b": "séculos XVII e início do XVIII no mundo luso-brasileiro",
        "c": "segunda metade do século XIX",
        "d": "século XVIII",
        "e": "século XIX"
      },
      "resposta": "b",
      "explicacao": "Barroco se situa em: séculos XVII e início do XVIII no mundo luso-brasileiro. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0171",
      "enunciado": "Qual condição ajuda a caracterizar Barroco?",
      "alternativas": {
        "a": "influência do cientificismo e do evolucionismo social",
        "b": "reação a idealizações românticas e transformação da sociedade urbana",
        "c": "Contrarreforma e conflitos entre fé, razão e experiência colonial",
        "d": "Iluminismo e reação aos excessos barrocos",
        "e": "revoluções burguesas e construção de identidades nacionais"
      },
      "resposta": "c",
      "explicacao": "Barroco: Contrarreforma e conflitos entre fé, razão e experiência colonial. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0172",
      "enunciado": "Qual consequência ou função se associa corretamente a Barroco?",
      "alternativas": {
        "a": "no Brasil, inclui indianismo, poesia ultrarromântica e crítica social",
        "b": "Machado de Assis é referência central no Brasil",
        "c": "no Brasil, relaciona-se a Cláudio Manuel da Costa e Tomás Antônio Gonzaga",
        "d": "destacam-se Gregório de Matos e Antônio Vieira",
        "e": "Aluísio Azevedo é associado ao Naturalismo brasileiro"
      },
      "resposta": "d",
      "explicacao": "Barroco: destacam-se Gregório de Matos e Antônio Vieira. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0173",
      "enunciado": "Qual definição corresponde corretamente a Barroco?",
      "alternativas": {
        "a": "poesia de equilíbrio formal, referências clássicas e idealização da vida simples",
        "b": "prosa de observação crítica, análise psicológica e questionamento das aparências sociais",
        "c": "movimento que valoriza subjetividade, imaginação, nacionalidade e liberdade formal",
        "d": "vertente narrativa que enfatiza ambiente, hereditariedade e determinismos sobre personagens",
        "e": "estética de contrastes, jogos de linguagem e tensão entre valores terrenos e religiosos"
      },
      "resposta": "e",
      "explicacao": "Barroco é estética de contrastes, jogos de linguagem e tensão entre valores terrenos e religiosos. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0174",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: poesia de equilíbrio formal, referências clássicas e idealização da vida simples?",
      "alternativas": {
        "a": "Arcadismo",
        "b": "Naturalismo",
        "c": "Realismo",
        "d": "Romantismo",
        "e": "Parnasianismo"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Arcadismo: poesia de equilíbrio formal, referências clássicas e idealização da vida simples. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0175",
      "enunciado": "Em que contexto histórico deve ser situado o tema Arcadismo?",
      "alternativas": {
        "a": "final do século XIX",
        "b": "século XVIII",
        "c": "século XIX",
        "d": "final do século XIX e início do XX",
        "e": "segunda metade do século XIX"
      },
      "resposta": "b",
      "explicacao": "Arcadismo se situa em: século XVIII. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0176",
      "enunciado": "Qual condição ajuda a caracterizar Arcadismo?",
      "alternativas": {
        "a": "revoluções burguesas e construção de identidades nacionais",
        "b": "reação à emotividade romântica e busca de objetividade estética",
        "c": "Iluminismo e reação aos excessos barrocos",
        "d": "reação a idealizações românticas e transformação da sociedade urbana",
        "e": "influência do cientificismo e do evolucionismo social"
      },
      "resposta": "c",
      "explicacao": "Arcadismo: Iluminismo e reação aos excessos barrocos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0177",
      "enunciado": "Qual consequência ou função se associa corretamente a Arcadismo?",
      "alternativas": {
        "a": "Machado de Assis é referência central no Brasil",
        "b": "Olavo Bilac, Raimundo Correia e Alberto de Oliveira são referências",
        "c": "Aluísio Azevedo é associado ao Naturalismo brasileiro",
        "d": "no Brasil, relaciona-se a Cláudio Manuel da Costa e Tomás Antônio Gonzaga",
        "e": "no Brasil, inclui indianismo, poesia ultrarromântica e crítica social"
      },
      "resposta": "d",
      "explicacao": "Arcadismo: no Brasil, relaciona-se a Cláudio Manuel da Costa e Tomás Antônio Gonzaga. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0178",
      "enunciado": "Qual definição corresponde corretamente a Arcadismo?",
      "alternativas": {
        "a": "poesia de rigor formal, descrição e valorização do trabalho artesanal com a linguagem",
        "b": "vertente narrativa que enfatiza ambiente, hereditariedade e determinismos sobre personagens",
        "c": "prosa de observação crítica, análise psicológica e questionamento das aparências sociais",
        "d": "movimento que valoriza subjetividade, imaginação, nacionalidade e liberdade formal",
        "e": "poesia de equilíbrio formal, referências clássicas e idealização da vida simples"
      },
      "resposta": "e",
      "explicacao": "Arcadismo é poesia de equilíbrio formal, referências clássicas e idealização da vida simples. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0179",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: movimento que valoriza subjetividade, imaginação, nacionalidade e liberdade formal?",
      "alternativas": {
        "a": "Romantismo",
        "b": "Realismo",
        "c": "Simbolismo",
        "d": "Naturalismo",
        "e": "Parnasianismo"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Romantismo: movimento que valoriza subjetividade, imaginação, nacionalidade e liberdade formal. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0180",
      "enunciado": "Em que contexto histórico deve ser situado o tema Romantismo?",
      "alternativas": {
        "a": "final do século XIX",
        "b": "século XIX",
        "c": "fim do século XIX",
        "d": "segunda metade do século XIX",
        "e": "final do século XIX e início do XX"
      },
      "resposta": "b",
      "explicacao": "Romantismo se situa em: século XIX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0181",
      "enunciado": "Qual condição ajuda a caracterizar Romantismo?",
      "alternativas": {
        "a": "reação ao materialismo e à objetividade realista-naturalista",
        "b": "reação a idealizações românticas e transformação da sociedade urbana",
        "c": "revoluções burguesas e construção de identidades nacionais",
        "d": "reação à emotividade romântica e busca de objetividade estética",
        "e": "influência do cientificismo e do evolucionismo social"
      },
      "resposta": "c",
      "explicacao": "Romantismo: revoluções burguesas e construção de identidades nacionais. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0182",
      "enunciado": "Qual consequência ou função se associa corretamente a Romantismo?",
      "alternativas": {
        "a": "Cruz e Sousa e Alphonsus de Guimaraens destacam-se no Brasil",
        "b": "Olavo Bilac, Raimundo Correia e Alberto de Oliveira são referências",
        "c": "Machado de Assis é referência central no Brasil",
        "d": "no Brasil, inclui indianismo, poesia ultrarromântica e crítica social",
        "e": "Aluísio Azevedo é associado ao Naturalismo brasileiro"
      },
      "resposta": "d",
      "explicacao": "Romantismo: no Brasil, inclui indianismo, poesia ultrarromântica e crítica social. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0183",
      "enunciado": "Qual definição corresponde corretamente a Romantismo?",
      "alternativas": {
        "a": "poesia de sugestão, musicalidade, espiritualidade e imagens sensoriais",
        "b": "poesia de rigor formal, descrição e valorização do trabalho artesanal com a linguagem",
        "c": "vertente narrativa que enfatiza ambiente, hereditariedade e determinismos sobre personagens",
        "d": "prosa de observação crítica, análise psicológica e questionamento das aparências sociais",
        "e": "movimento que valoriza subjetividade, imaginação, nacionalidade e liberdade formal"
      },
      "resposta": "e",
      "explicacao": "Romantismo é movimento que valoriza subjetividade, imaginação, nacionalidade e liberdade formal. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0184",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: prosa de observação crítica, análise psicológica e questionamento das aparências sociais?",
      "alternativas": {
        "a": "Realismo",
        "b": "Naturalismo",
        "c": "Parnasianismo",
        "d": "Simbolismo",
        "e": "Pré-Modernismo"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Realismo: prosa de observação crítica, análise psicológica e questionamento das aparências sociais. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0185",
      "enunciado": "Em que contexto histórico deve ser situado o tema Realismo?",
      "alternativas": {
        "a": "final do século XIX",
        "b": "segunda metade do século XIX",
        "c": "final do século XIX e início do XX",
        "d": "Brasil nas primeiras décadas do século XX",
        "e": "fim do século XIX"
      },
      "resposta": "b",
      "explicacao": "Realismo se situa em: segunda metade do século XIX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0186",
      "enunciado": "Qual condição ajuda a caracterizar Realismo?",
      "alternativas": {
        "a": "modernização desigual, conflitos rurais e crise da República oligárquica",
        "b": "influência do cientificismo e do evolucionismo social",
        "c": "reação a idealizações românticas e transformação da sociedade urbana",
        "d": "reação à emotividade romântica e busca de objetividade estética",
        "e": "reação ao materialismo e à objetividade realista-naturalista"
      },
      "resposta": "c",
      "explicacao": "Realismo: reação a idealizações românticas e transformação da sociedade urbana. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0187",
      "enunciado": "Qual consequência ou função se associa corretamente a Realismo?",
      "alternativas": {
        "a": "Olavo Bilac, Raimundo Correia e Alberto de Oliveira são referências",
        "b": "Cruz e Sousa e Alphonsus de Guimaraens destacam-se no Brasil",
        "c": "Aluísio Azevedo é associado ao Naturalismo brasileiro",
        "d": "Machado de Assis é referência central no Brasil",
        "e": "inclui Euclides da Cunha, Lima Barreto e Monteiro Lobato"
      },
      "resposta": "d",
      "explicacao": "Realismo: Machado de Assis é referência central no Brasil. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0188",
      "enunciado": "Qual definição corresponde corretamente a Realismo?",
      "alternativas": {
        "a": "período de obras que expõem conflitos sociais e regiões pouco idealizadas sem unidade estética",
        "b": "poesia de sugestão, musicalidade, espiritualidade e imagens sensoriais",
        "c": "vertente narrativa que enfatiza ambiente, hereditariedade e determinismos sobre personagens",
        "d": "poesia de rigor formal, descrição e valorização do trabalho artesanal com a linguagem",
        "e": "prosa de observação crítica, análise psicológica e questionamento das aparências sociais"
      },
      "resposta": "e",
      "explicacao": "Realismo é prosa de observação crítica, análise psicológica e questionamento das aparências sociais. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0189",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: vertente narrativa que enfatiza ambiente, hereditariedade e determinismos sobre personagens?",
      "alternativas": {
        "a": "Naturalismo",
        "b": "Modernismo de 1922",
        "c": "Pré-Modernismo",
        "d": "Simbolismo",
        "e": "Parnasianismo"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Naturalismo: vertente narrativa que enfatiza ambiente, hereditariedade e determinismos sobre personagens. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0190",
      "enunciado": "Em que contexto histórico deve ser situado o tema Naturalismo?",
      "alternativas": {
        "a": "Brasil a partir da Semana de Arte Moderna",
        "b": "final do século XIX",
        "c": "final do século XIX e início do XX",
        "d": "Brasil nas primeiras décadas do século XX",
        "e": "fim do século XIX"
      },
      "resposta": "b",
      "explicacao": "Naturalismo se situa em: final do século XIX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0191",
      "enunciado": "Qual condição ajuda a caracterizar Naturalismo?",
      "alternativas": {
        "a": "reação à emotividade romântica e busca de objetividade estética",
        "b": "reação ao materialismo e à objetividade realista-naturalista",
        "c": "influência do cientificismo e do evolucionismo social",
        "d": "modernização desigual, conflitos rurais e crise da República oligárquica",
        "e": "urbanização, vanguardas europeias e crítica ao academicismo"
      },
      "resposta": "c",
      "explicacao": "Naturalismo: influência do cientificismo e do evolucionismo social. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0192",
      "enunciado": "Qual consequência ou função se associa corretamente a Naturalismo?",
      "alternativas": {
        "a": "Olavo Bilac, Raimundo Correia e Alberto de Oliveira são referências",
        "b": "Mário de Andrade e Oswald de Andrade são autores fundamentais",
        "c": "Cruz e Sousa e Alphonsus de Guimaraens destacam-se no Brasil",
        "d": "Aluísio Azevedo é associado ao Naturalismo brasileiro",
        "e": "inclui Euclides da Cunha, Lima Barreto e Monteiro Lobato"
      },
      "resposta": "d",
      "explicacao": "Naturalismo: Aluísio Azevedo é associado ao Naturalismo brasileiro. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0193",
      "enunciado": "Qual definição corresponde corretamente a Naturalismo?",
      "alternativas": {
        "a": "poesia de sugestão, musicalidade, espiritualidade e imagens sensoriais",
        "b": "ruptura estética, experimentação linguística e revisão crítica da identidade nacional",
        "c": "período de obras que expõem conflitos sociais e regiões pouco idealizadas sem unidade estética",
        "d": "poesia de rigor formal, descrição e valorização do trabalho artesanal com a linguagem",
        "e": "vertente narrativa que enfatiza ambiente, hereditariedade e determinismos sobre personagens"
      },
      "resposta": "e",
      "explicacao": "Naturalismo é vertente narrativa que enfatiza ambiente, hereditariedade e determinismos sobre personagens. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0194",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: poesia de rigor formal, descrição e valorização do trabalho artesanal com a linguagem?",
      "alternativas": {
        "a": "Parnasianismo",
        "b": "Romance de 1930",
        "c": "Simbolismo",
        "d": "Pré-Modernismo",
        "e": "Modernismo de 1922"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Parnasianismo: poesia de rigor formal, descrição e valorização do trabalho artesanal com a linguagem. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0195",
      "enunciado": "Em que contexto histórico deve ser situado o tema Parnasianismo?",
      "alternativas": {
        "a": "Brasil a partir da Semana de Arte Moderna",
        "b": "final do século XIX e início do XX",
        "c": "fim do século XIX",
        "d": "Brasil nas primeiras décadas do século XX",
        "e": "segunda fase do Modernismo brasileiro"
      },
      "resposta": "b",
      "explicacao": "Parnasianismo se situa em: final do século XIX e início do XX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0196",
      "enunciado": "Qual condição ajuda a caracterizar Parnasianismo?",
      "alternativas": {
        "a": "urbanização, vanguardas europeias e crítica ao academicismo",
        "b": "modernização desigual, conflitos rurais e crise da República oligárquica",
        "c": "reação à emotividade romântica e busca de objetividade estética",
        "d": "reação ao materialismo e à objetividade realista-naturalista",
        "e": "crise econômica, transformação política e atenção às desigualdades"
      },
      "resposta": "c",
      "explicacao": "Parnasianismo: reação à emotividade romântica e busca de objetividade estética. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0197",
      "enunciado": "Qual consequência ou função se associa corretamente a Parnasianismo?",
      "alternativas": {
        "a": "Cruz e Sousa e Alphonsus de Guimaraens destacam-se no Brasil",
        "b": "Mário de Andrade e Oswald de Andrade são autores fundamentais",
        "c": "inclui Euclides da Cunha, Lima Barreto e Monteiro Lobato",
        "d": "Olavo Bilac, Raimundo Correia e Alberto de Oliveira são referências",
        "e": "Graciliano Ramos, Rachel de Queiroz e Jorge Amado são referências"
      },
      "resposta": "d",
      "explicacao": "Parnasianismo: Olavo Bilac, Raimundo Correia e Alberto de Oliveira são referências. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0198",
      "enunciado": "Qual definição corresponde corretamente a Parnasianismo?",
      "alternativas": {
        "a": "poesia de sugestão, musicalidade, espiritualidade e imagens sensoriais",
        "b": "prosa voltada a conflitos sociais, regionais e psicológicos do país",
        "c": "período de obras que expõem conflitos sociais e regiões pouco idealizadas sem unidade estética",
        "d": "ruptura estética, experimentação linguística e revisão crítica da identidade nacional",
        "e": "poesia de rigor formal, descrição e valorização do trabalho artesanal com a linguagem"
      },
      "resposta": "e",
      "explicacao": "Parnasianismo é poesia de rigor formal, descrição e valorização do trabalho artesanal com a linguagem. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0199",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: poesia de sugestão, musicalidade, espiritualidade e imagens sensoriais?",
      "alternativas": {
        "a": "Simbolismo",
        "b": "Modernismo de 1922",
        "c": "Romance de 1930",
        "d": "Pré-Modernismo",
        "e": "Prosa de Clarice Lispector"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Simbolismo: poesia de sugestão, musicalidade, espiritualidade e imagens sensoriais. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0200",
      "enunciado": "Em que contexto histórico deve ser situado o tema Simbolismo?",
      "alternativas": {
        "a": "segunda fase do Modernismo brasileiro",
        "b": "fim do século XIX",
        "c": "Brasil nas primeiras décadas do século XX",
        "d": "Brasil a partir da Semana de Arte Moderna",
        "e": "literatura brasileira do século XX"
      },
      "resposta": "b",
      "explicacao": "Simbolismo se situa em: fim do século XIX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0201",
      "enunciado": "Qual condição ajuda a caracterizar Simbolismo?",
      "alternativas": {
        "a": "deslocamento do foco de grandes eventos para experiências interiores",
        "b": "crise econômica, transformação política e atenção às desigualdades",
        "c": "reação ao materialismo e à objetividade realista-naturalista",
        "d": "urbanização, vanguardas europeias e crítica ao academicismo",
        "e": "modernização desigual, conflitos rurais e crise da República oligárquica"
      },
      "resposta": "c",
      "explicacao": "Simbolismo: reação ao materialismo e à objetividade realista-naturalista. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0202",
      "enunciado": "Qual consequência ou função se associa corretamente a Simbolismo?",
      "alternativas": {
        "a": "inclui Euclides da Cunha, Lima Barreto e Monteiro Lobato",
        "b": "Mário de Andrade e Oswald de Andrade são autores fundamentais",
        "c": "questiona identidades e limites da representação",
        "d": "Cruz e Sousa e Alphonsus de Guimaraens destacam-se no Brasil",
        "e": "Graciliano Ramos, Rachel de Queiroz e Jorge Amado são referências"
      },
      "resposta": "d",
      "explicacao": "Simbolismo: Cruz e Sousa e Alphonsus de Guimaraens destacam-se no Brasil. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0203",
      "enunciado": "Qual definição corresponde corretamente a Simbolismo?",
      "alternativas": {
        "a": "prosa voltada a conflitos sociais, regionais e psicológicos do país",
        "b": "narrativa de introspecção, epifania e investigação da linguagem e da consciência",
        "c": "período de obras que expõem conflitos sociais e regiões pouco idealizadas sem unidade estética",
        "d": "ruptura estética, experimentação linguística e revisão crítica da identidade nacional",
        "e": "poesia de sugestão, musicalidade, espiritualidade e imagens sensoriais"
      },
      "resposta": "e",
      "explicacao": "Simbolismo é poesia de sugestão, musicalidade, espiritualidade e imagens sensoriais. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0204",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: período de obras que expõem conflitos sociais e regiões pouco idealizadas sem unidade estética?",
      "alternativas": {
        "a": "Pré-Modernismo",
        "b": "Modernismo de 1922",
        "c": "Prosa de Clarice Lispector",
        "d": "Romance de 1930",
        "e": "Prosa de Guimarães Rosa"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Pré-Modernismo: período de obras que expõem conflitos sociais e regiões pouco idealizadas sem unidade estética. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0205",
      "enunciado": "Em que contexto histórico deve ser situado o tema Pré-Modernismo?",
      "alternativas": {
        "a": "séculos XVII e início do XVIII no mundo luso-brasileiro",
        "b": "Brasil nas primeiras décadas do século XX",
        "c": "segunda fase do Modernismo brasileiro",
        "d": "Brasil a partir da Semana de Arte Moderna",
        "e": "literatura brasileira do século XX"
      },
      "resposta": "b",
      "explicacao": "Pré-Modernismo se situa em: Brasil nas primeiras décadas do século XX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0206",
      "enunciado": "Qual condição ajuda a caracterizar Pré-Modernismo?",
      "alternativas": {
        "a": "deslocamento do foco de grandes eventos para experiências interiores",
        "b": "combinação de oralidade, neologismo e tradição narrativa",
        "c": "modernização desigual, conflitos rurais e crise da República oligárquica",
        "d": "crise econômica, transformação política e atenção às desigualdades",
        "e": "urbanização, vanguardas europeias e crítica ao academicismo"
      },
      "resposta": "c",
      "explicacao": "Pré-Modernismo: modernização desigual, conflitos rurais e crise da República oligárquica. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0207",
      "enunciado": "Qual consequência ou função se associa corretamente a Pré-Modernismo?",
      "alternativas": {
        "a": "transforma espaço regional em reflexão sobre existência, ética e linguagem",
        "b": "questiona identidades e limites da representação",
        "c": "Mário de Andrade e Oswald de Andrade são autores fundamentais",
        "d": "inclui Euclides da Cunha, Lima Barreto e Monteiro Lobato",
        "e": "Graciliano Ramos, Rachel de Queiroz e Jorge Amado são referências"
      },
      "resposta": "d",
      "explicacao": "Pré-Modernismo: inclui Euclides da Cunha, Lima Barreto e Monteiro Lobato. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0208",
      "enunciado": "Qual definição corresponde corretamente a Pré-Modernismo?",
      "alternativas": {
        "a": "reinvenção linguística associada ao sertão e a problemas universais",
        "b": "ruptura estética, experimentação linguística e revisão crítica da identidade nacional",
        "c": "prosa voltada a conflitos sociais, regionais e psicológicos do país",
        "d": "narrativa de introspecção, epifania e investigação da linguagem e da consciência",
        "e": "período de obras que expõem conflitos sociais e regiões pouco idealizadas sem unidade estética"
      },
      "resposta": "e",
      "explicacao": "Pré-Modernismo é período de obras que expõem conflitos sociais e regiões pouco idealizadas sem unidade estética. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0209",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: ruptura estética, experimentação linguística e revisão crítica da identidade nacional?",
      "alternativas": {
        "a": "Modernismo de 1922",
        "b": "Barroco",
        "c": "Prosa de Guimarães Rosa",
        "d": "Romance de 1930",
        "e": "Prosa de Clarice Lispector"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Modernismo de 1922: ruptura estética, experimentação linguística e revisão crítica da identidade nacional. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0210",
      "enunciado": "Em que contexto histórico deve ser situado o tema Modernismo de 1922?",
      "alternativas": {
        "a": "literatura brasileira do século XX",
        "b": "Brasil a partir da Semana de Arte Moderna",
        "c": "séculos XVII e início do XVIII no mundo luso-brasileiro",
        "d": "segunda fase do Modernismo brasileiro",
        "e": "século XVIII"
      },
      "resposta": "b",
      "explicacao": "Modernismo de 1922 se situa em: Brasil a partir da Semana de Arte Moderna. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0211",
      "enunciado": "Qual condição ajuda a caracterizar Modernismo de 1922?",
      "alternativas": {
        "a": "deslocamento do foco de grandes eventos para experiências interiores",
        "b": "combinação de oralidade, neologismo e tradição narrativa",
        "c": "urbanização, vanguardas europeias e crítica ao academicismo",
        "d": "Contrarreforma e conflitos entre fé, razão e experiência colonial",
        "e": "crise econômica, transformação política e atenção às desigualdades"
      },
      "resposta": "c",
      "explicacao": "Modernismo de 1922: urbanização, vanguardas europeias e crítica ao academicismo. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0212",
      "enunciado": "Qual consequência ou função se associa corretamente a Modernismo de 1922?",
      "alternativas": {
        "a": "questiona identidades e limites da representação",
        "b": "destacam-se Gregório de Matos e Antônio Vieira",
        "c": "transforma espaço regional em reflexão sobre existência, ética e linguagem",
        "d": "Mário de Andrade e Oswald de Andrade são autores fundamentais",
        "e": "Graciliano Ramos, Rachel de Queiroz e Jorge Amado são referências"
      },
      "resposta": "d",
      "explicacao": "Modernismo de 1922: Mário de Andrade e Oswald de Andrade são autores fundamentais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0213",
      "enunciado": "Qual definição corresponde corretamente a Modernismo de 1922?",
      "alternativas": {
        "a": "narrativa de introspecção, epifania e investigação da linguagem e da consciência",
        "b": "prosa voltada a conflitos sociais, regionais e psicológicos do país",
        "c": "estética de contrastes, jogos de linguagem e tensão entre valores terrenos e religiosos",
        "d": "reinvenção linguística associada ao sertão e a problemas universais",
        "e": "ruptura estética, experimentação linguística e revisão crítica da identidade nacional"
      },
      "resposta": "e",
      "explicacao": "Modernismo de 1922 é ruptura estética, experimentação linguística e revisão crítica da identidade nacional. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0214",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: prosa voltada a conflitos sociais, regionais e psicológicos do país?",
      "alternativas": {
        "a": "Romance de 1930",
        "b": "Barroco",
        "c": "Prosa de Guimarães Rosa",
        "d": "Arcadismo",
        "e": "Prosa de Clarice Lispector"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Romance de 1930: prosa voltada a conflitos sociais, regionais e psicológicos do país. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0215",
      "enunciado": "Qual condição ajuda a caracterizar Romance de 1930?",
      "alternativas": {
        "a": "deslocamento do foco de grandes eventos para experiências interiores",
        "b": "crise econômica, transformação política e atenção às desigualdades",
        "c": "Iluminismo e reação aos excessos barrocos",
        "d": "combinação de oralidade, neologismo e tradição narrativa",
        "e": "Contrarreforma e conflitos entre fé, razão e experiência colonial"
      },
      "resposta": "b",
      "explicacao": "Romance de 1930: crise econômica, transformação política e atenção às desigualdades. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0216",
      "enunciado": "Qual consequência ou função se associa corretamente a Romance de 1930?",
      "alternativas": {
        "a": "no Brasil, relaciona-se a Cláudio Manuel da Costa e Tomás Antônio Gonzaga",
        "b": "transforma espaço regional em reflexão sobre existência, ética e linguagem",
        "c": "Graciliano Ramos, Rachel de Queiroz e Jorge Amado são referências",
        "d": "destacam-se Gregório de Matos e Antônio Vieira",
        "e": "questiona identidades e limites da representação"
      },
      "resposta": "c",
      "explicacao": "Romance de 1930: Graciliano Ramos, Rachel de Queiroz e Jorge Amado são referências. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0217",
      "enunciado": "Qual definição corresponde corretamente a Romance de 1930?",
      "alternativas": {
        "a": "estética de contrastes, jogos de linguagem e tensão entre valores terrenos e religiosos",
        "b": "reinvenção linguística associada ao sertão e a problemas universais",
        "c": "poesia de equilíbrio formal, referências clássicas e idealização da vida simples",
        "d": "prosa voltada a conflitos sociais, regionais e psicológicos do país",
        "e": "narrativa de introspecção, epifania e investigação da linguagem e da consciência"
      },
      "resposta": "d",
      "explicacao": "Romance de 1930 é prosa voltada a conflitos sociais, regionais e psicológicos do país. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0218",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: narrativa de introspecção, epifania e investigação da linguagem e da consciência?",
      "alternativas": {
        "a": "Barroco",
        "b": "Arcadismo",
        "c": "Prosa de Guimarães Rosa",
        "d": "Romantismo",
        "e": "Prosa de Clarice Lispector"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Prosa de Clarice Lispector: narrativa de introspecção, epifania e investigação da linguagem e da consciência. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0219",
      "enunciado": "Em que contexto histórico deve ser situado o tema Prosa de Clarice Lispector?",
      "alternativas": {
        "a": "literatura brasileira do século XX",
        "b": "séculos XVII e início do XVIII no mundo luso-brasileiro",
        "c": "segunda metade do século XIX",
        "d": "século XVIII",
        "e": "século XIX"
      },
      "resposta": "a",
      "explicacao": "Prosa de Clarice Lispector se situa em: literatura brasileira do século XX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0220",
      "enunciado": "Qual condição ajuda a caracterizar Prosa de Clarice Lispector?",
      "alternativas": {
        "a": "Contrarreforma e conflitos entre fé, razão e experiência colonial",
        "b": "deslocamento do foco de grandes eventos para experiências interiores",
        "c": "combinação de oralidade, neologismo e tradição narrativa",
        "d": "revoluções burguesas e construção de identidades nacionais",
        "e": "Iluminismo e reação aos excessos barrocos"
      },
      "resposta": "b",
      "explicacao": "Prosa de Clarice Lispector: deslocamento do foco de grandes eventos para experiências interiores. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0221",
      "enunciado": "Qual consequência ou função se associa corretamente a Prosa de Clarice Lispector?",
      "alternativas": {
        "a": "no Brasil, relaciona-se a Cláudio Manuel da Costa e Tomás Antônio Gonzaga",
        "b": "transforma espaço regional em reflexão sobre existência, ética e linguagem",
        "c": "questiona identidades e limites da representação",
        "d": "no Brasil, inclui indianismo, poesia ultrarromântica e crítica social",
        "e": "destacam-se Gregório de Matos e Antônio Vieira"
      },
      "resposta": "c",
      "explicacao": "Prosa de Clarice Lispector: questiona identidades e limites da representação. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0222",
      "enunciado": "Qual definição corresponde corretamente a Prosa de Clarice Lispector?",
      "alternativas": {
        "a": "reinvenção linguística associada ao sertão e a problemas universais",
        "b": "estética de contrastes, jogos de linguagem e tensão entre valores terrenos e religiosos",
        "c": "poesia de equilíbrio formal, referências clássicas e idealização da vida simples",
        "d": "narrativa de introspecção, epifania e investigação da linguagem e da consciência",
        "e": "movimento que valoriza subjetividade, imaginação, nacionalidade e liberdade formal"
      },
      "resposta": "d",
      "explicacao": "Prosa de Clarice Lispector é narrativa de introspecção, epifania e investigação da linguagem e da consciência. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0223",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: reinvenção linguística associada ao sertão e a problemas universais?",
      "alternativas": {
        "a": "Arcadismo",
        "b": "Romantismo",
        "c": "Realismo",
        "d": "Barroco",
        "e": "Prosa de Guimarães Rosa"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Prosa de Guimarães Rosa: reinvenção linguística associada ao sertão e a problemas universais. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0224",
      "enunciado": "Em que contexto histórico deve ser situado o tema Prosa de Guimarães Rosa?",
      "alternativas": {
        "a": "literatura brasileira do século XX",
        "b": "séculos XVII e início do XVIII no mundo luso-brasileiro",
        "c": "segunda metade do século XIX",
        "d": "século XIX",
        "e": "século XVIII"
      },
      "resposta": "a",
      "explicacao": "Prosa de Guimarães Rosa se situa em: literatura brasileira do século XX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0225",
      "enunciado": "Qual condição ajuda a caracterizar Prosa de Guimarães Rosa?",
      "alternativas": {
        "a": "Iluminismo e reação aos excessos barrocos",
        "b": "combinação de oralidade, neologismo e tradição narrativa",
        "c": "revoluções burguesas e construção de identidades nacionais",
        "d": "Contrarreforma e conflitos entre fé, razão e experiência colonial",
        "e": "reação a idealizações românticas e transformação da sociedade urbana"
      },
      "resposta": "b",
      "explicacao": "Prosa de Guimarães Rosa: combinação de oralidade, neologismo e tradição narrativa. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0226",
      "enunciado": "Qual consequência ou função se associa corretamente a Prosa de Guimarães Rosa?",
      "alternativas": {
        "a": "Machado de Assis é referência central no Brasil",
        "b": "destacam-se Gregório de Matos e Antônio Vieira",
        "c": "transforma espaço regional em reflexão sobre existência, ética e linguagem",
        "d": "no Brasil, relaciona-se a Cláudio Manuel da Costa e Tomás Antônio Gonzaga",
        "e": "no Brasil, inclui indianismo, poesia ultrarromântica e crítica social"
      },
      "resposta": "c",
      "explicacao": "Prosa de Guimarães Rosa: transforma espaço regional em reflexão sobre existência, ética e linguagem. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0227",
      "enunciado": "Qual definição corresponde corretamente a Prosa de Guimarães Rosa?",
      "alternativas": {
        "a": "poesia de equilíbrio formal, referências clássicas e idealização da vida simples",
        "b": "movimento que valoriza subjetividade, imaginação, nacionalidade e liberdade formal",
        "c": "prosa de observação crítica, análise psicológica e questionamento das aparências sociais",
        "d": "reinvenção linguística associada ao sertão e a problemas universais",
        "e": "estética de contrastes, jogos de linguagem e tensão entre valores terrenos e religiosos"
      },
      "resposta": "d",
      "explicacao": "Prosa de Guimarães Rosa é reinvenção linguística associada ao sertão e a problemas universais. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "gramatica": [
    {
      "id": "xtr-port-0061",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Faltam duas páginas no relatório.",
        "b": "Chegou cedo os convidados.",
        "c": "Existe boas razões para a mudança.",
        "d": "Mais de um aluno apresentaram a solução.",
        "e": "Falta duas páginas no relatório."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é concordância verbal. A única construção que o respeita é «Faltam duas páginas no relatório.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0062",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Mais de um aluno apresentaram a solução.",
        "b": "Chegaram cedo os convidados.",
        "c": "Existe boas razões para a mudança.",
        "d": "Chegou cedo os convidados.",
        "e": "A maioria concordaram com a proposta."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é concordância verbal. A única construção que o respeita é «Chegaram cedo os convidados.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0063",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Falta duas páginas no relatório.",
        "b": "A maioria concordaram com a proposta.",
        "c": "Existem boas razões para a mudança.",
        "d": "Mais de um aluno apresentaram a solução.",
        "e": "Existe boas razões para a mudança."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é concordância verbal. A única construção que o respeita é «Existem boas razões para a mudança.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0064",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "A maioria concordaram com a proposta.",
        "b": "Chegou cedo os convidados.",
        "c": "Mais de um aluno apresentaram a solução.",
        "d": "Mais de um aluno apresentou a solução.",
        "e": "Falta duas páginas no relatório."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é concordância verbal. A única construção que o respeita é «Mais de um aluno apresentou a solução.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0065",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Existe boas razões para a mudança.",
        "b": "A maioria concordaram com a proposta.",
        "c": "Chegou cedo os convidados.",
        "d": "Falta duas páginas no relatório.",
        "e": "A maioria dos participantes concordou com a proposta."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é concordância verbal. A única construção que o respeita é «A maioria dos participantes concordou com a proposta.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0066",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "As decisões foram bastante claras.",
        "b": "Ela mesmo revisou as tabelas.",
        "c": "Havia menas pessoas na sala.",
        "d": "Segue anexo as fotografias.",
        "e": "As decisões foram bastantes claras."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é concordância nominal. A única construção que o respeita é «As decisões foram bastante claras.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0067",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Segue anexo as fotografias.",
        "b": "Seguem anexas as fotografias.",
        "c": "Os documentos estavam meios amassados.",
        "d": "Ela mesmo revisou as tabelas.",
        "e": "Havia menas pessoas na sala."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é concordância nominal. A única construção que o respeita é «Seguem anexas as fotografias.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0068",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "As decisões foram bastantes claras.",
        "b": "Os documentos estavam meios amassados.",
        "c": "Ela mesma revisou as tabelas.",
        "d": "Havia menas pessoas na sala.",
        "e": "Ela mesmo revisou as tabelas."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é concordância nominal. A única construção que o respeita é «Ela mesma revisou as tabelas.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0069",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Segue anexo as fotografias.",
        "b": "Havia menas pessoas na sala.",
        "c": "As decisões foram bastantes claras.",
        "d": "Havia menos pessoas na sala.",
        "e": "Os documentos estavam meios amassados."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é concordância nominal. A única construção que o respeita é «Havia menos pessoas na sala.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0070",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Segue anexo as fotografias.",
        "b": "As decisões foram bastantes claras.",
        "c": "Ela mesmo revisou as tabelas.",
        "d": "Os documentos estavam meios amassados.",
        "e": "Os documentos estavam meio amassados."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é concordância nominal. A única construção que o respeita é «Os documentos estavam meio amassados.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0071",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Assistimos ao documentário ontem.",
        "b": "Todos aspiravam uma vaga.",
        "c": "Assistimos o documentário ontem.",
        "d": "Ela prefere mais leitura do que televisão.",
        "e": "O pesquisador obedeceu as normas sem preposição."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é regência verbal. A única construção que o respeita é «Assistimos ao documentário ontem.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0072",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Todos aspiravam uma vaga.",
        "b": "O pesquisador obedeceu às normas.",
        "c": "O diretor informou aos funcionários da mudança.",
        "d": "Ela prefere mais leitura do que televisão.",
        "e": "O pesquisador obedeceu as normas sem preposição."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é regência verbal. A única construção que o respeita é «O pesquisador obedeceu às normas.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0073",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Assistimos o documentário ontem.",
        "b": "O diretor informou aos funcionários da mudança.",
        "c": "Ela prefere leitura a televisão.",
        "d": "Todos aspiravam uma vaga.",
        "e": "Ela prefere mais leitura do que televisão."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é regência verbal. A única construção que o respeita é «Ela prefere leitura a televisão.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0074",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Assistimos o documentário ontem.",
        "b": "O diretor informou aos funcionários da mudança.",
        "c": "Todos aspiravam uma vaga.",
        "d": "Todos aspiravam a uma vaga.",
        "e": "O pesquisador obedeceu as normas sem preposição."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é regência verbal. A única construção que o respeita é «Todos aspiravam a uma vaga.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0075",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Assistimos o documentário ontem.",
        "b": "Ela prefere mais leitura do que televisão.",
        "c": "O diretor informou aos funcionários da mudança.",
        "d": "O pesquisador obedeceu as normas sem preposição.",
        "e": "O diretor informou a mudança aos funcionários."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é regência verbal. A única construção que o respeita é «O diretor informou a mudança aos funcionários.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0076",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "A reunião começará às nove horas.",
        "b": "Voltamos a cidade onde nascemos.",
        "c": "Entreguei o relatório a coordenadora.",
        "d": "A pesquisa se refere aquela hipótese.",
        "e": "A reunião começará as nove horas."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é uso da crase. A única construção que o respeita é «A reunião começará às nove horas.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0077",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Voltamos a cidade onde nascemos.",
        "b": "Entreguei o relatório à coordenadora.",
        "c": "Os alunos ficaram frente à frente.",
        "d": "Entreguei o relatório a coordenadora.",
        "e": "A pesquisa se refere aquela hipótese."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é uso da crase. A única construção que o respeita é «Entreguei o relatório à coordenadora.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0078",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Voltamos a cidade onde nascemos.",
        "b": "Os alunos ficaram frente à frente.",
        "c": "Voltamos à cidade onde nascemos.",
        "d": "A reunião começará as nove horas.",
        "e": "A pesquisa se refere aquela hipótese."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é uso da crase. A única construção que o respeita é «Voltamos à cidade onde nascemos.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0079",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "A reunião começará as nove horas.",
        "b": "A pesquisa se refere aquela hipótese.",
        "c": "Os alunos ficaram frente à frente.",
        "d": "A pesquisa se refere àquela hipótese.",
        "e": "Entreguei o relatório a coordenadora."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é uso da crase. A única construção que o respeita é «A pesquisa se refere àquela hipótese.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0080",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "A reunião começará as nove horas.",
        "b": "Entreguei o relatório a coordenadora.",
        "c": "Voltamos a cidade onde nascemos.",
        "d": "Os alunos ficaram frente à frente.",
        "e": "Os alunos ficaram frente a frente."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é uso da crase. A única construção que o respeita é «Os alunos ficaram frente a frente.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0081",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Não me disseram o resultado.",
        "b": "Jamais tratariam-no dessa maneira.",
        "c": "Quando encerrou-se a reunião, todos saíram.",
        "d": "Não disseram-me o resultado.",
        "e": "O livro que emprestaram-me era raro."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é colocação pronominal. A única construção que o respeita é «Não me disseram o resultado.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0082",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Jamais tratariam-no dessa maneira.",
        "b": "Quando se encerrou a reunião, todos saíram.",
        "c": "Quando encerrou-se a reunião, todos saíram.",
        "d": "Talvez entreguem-lhe o documento amanhã.",
        "e": "O livro que emprestaram-me era raro."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é colocação pronominal. A única construção que o respeita é «Quando se encerrou a reunião, todos saíram.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0083",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Não disseram-me o resultado.",
        "b": "Talvez entreguem-lhe o documento amanhã.",
        "c": "Jamais o tratariam dessa maneira.",
        "d": "O livro que emprestaram-me era raro.",
        "e": "Jamais tratariam-no dessa maneira."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é colocação pronominal. A única construção que o respeita é «Jamais o tratariam dessa maneira.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0084",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "O livro que emprestaram-me era raro.",
        "b": "Não disseram-me o resultado.",
        "c": "Talvez entreguem-lhe o documento amanhã.",
        "d": "O livro que me emprestaram era raro.",
        "e": "Quando encerrou-se a reunião, todos saíram."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é colocação pronominal. A única construção que o respeita é «O livro que me emprestaram era raro.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0085",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Jamais tratariam-no dessa maneira.",
        "b": "Talvez entreguem-lhe o documento amanhã.",
        "c": "Não disseram-me o resultado.",
        "d": "Quando encerrou-se a reunião, todos saíram.",
        "e": "Talvez lhe entreguem o documento amanhã."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é colocação pronominal. A única construção que o respeita é «Talvez lhe entreguem o documento amanhã.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0086",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Depois da aula, os estudantes foram à biblioteca.",
        "b": "Depois da aula os estudantes, foram à biblioteca.",
        "c": "O projeto tinha um objetivo reduzir: o desperdício.",
        "d": "A diretora que chegou cedo abriu, o auditório.",
        "e": "Se houver tempo revisaremos, o último capítulo."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é pontuação. A única construção que o respeita é «Depois da aula, os estudantes foram à biblioteca.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0087",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Pedro trouxe, cadernos Ana mapas.",
        "b": "A diretora, que chegou cedo, abriu o auditório.",
        "c": "O projeto tinha um objetivo reduzir: o desperdício.",
        "d": "Se houver tempo revisaremos, o último capítulo.",
        "e": "A diretora que chegou cedo abriu, o auditório."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é pontuação. A única construção que o respeita é «A diretora, que chegou cedo, abriu o auditório.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0088",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Se houver tempo revisaremos, o último capítulo.",
        "b": "Depois da aula os estudantes, foram à biblioteca.",
        "c": "O projeto tinha um objetivo: reduzir o desperdício.",
        "d": "Pedro trouxe, cadernos Ana mapas.",
        "e": "O projeto tinha um objetivo reduzir: o desperdício."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é pontuação. A única construção que o respeita é «O projeto tinha um objetivo: reduzir o desperdício.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0089",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Pedro trouxe, cadernos Ana mapas.",
        "b": "Se houver tempo revisaremos, o último capítulo.",
        "c": "Depois da aula os estudantes, foram à biblioteca.",
        "d": "Se houver tempo, revisaremos o último capítulo.",
        "e": "A diretora que chegou cedo abriu, o auditório."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é pontuação. A única construção que o respeita é «Se houver tempo, revisaremos o último capítulo.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0090",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Depois da aula os estudantes, foram à biblioteca.",
        "b": "O projeto tinha um objetivo reduzir: o desperdício.",
        "c": "A diretora que chegou cedo abriu, o auditório.",
        "d": "Pedro trouxe, cadernos Ana mapas.",
        "e": "Pedro trouxe cadernos; Ana, mapas."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é pontuação. A única construção que o respeita é «Pedro trouxe cadernos; Ana, mapas.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0091",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Embora estivesse cansada, ela concluiu o trabalho.",
        "b": "Quando a chuva parou, mas a equipe retomou a atividade.",
        "c": "Ele estudou, embora resolveu o problema.",
        "d": "Embora estava cansada, por isso ela concluiu o trabalho.",
        "e": "O livro onde comprei está esgotado."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é coordenação e subordinação. A única construção que o respeita é «Embora estivesse cansada, ela concluiu o trabalho.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0092",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "O livro onde comprei está esgotado.",
        "b": "Ele estudou, portanto resolveu o problema.",
        "c": "Quando a chuva parou, mas a equipe retomou a atividade.",
        "d": "Ele estudou, embora resolveu o problema.",
        "e": "Se você revisará o texto, encontraria o erro."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é coordenação e subordinação. A única construção que o respeita é «Ele estudou, portanto resolveu o problema.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0093",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Se você revisará o texto, encontraria o erro.",
        "b": "Quando a chuva parou, mas a equipe retomou a atividade.",
        "c": "Quando a chuva parou, a equipe retomou a atividade.",
        "d": "O livro onde comprei está esgotado.",
        "e": "Embora estava cansada, por isso ela concluiu o trabalho."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é coordenação e subordinação. A única construção que o respeita é «Quando a chuva parou, a equipe retomou a atividade.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0094",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Se você revisará o texto, encontraria o erro.",
        "b": "Embora estava cansada, por isso ela concluiu o trabalho.",
        "c": "Ele estudou, embora resolveu o problema.",
        "d": "O livro que comprei está esgotado.",
        "e": "O livro onde comprei está esgotado."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é coordenação e subordinação. A única construção que o respeita é «O livro que comprei está esgotado.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0095",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Embora estava cansada, por isso ela concluiu o trabalho.",
        "b": "Quando a chuva parou, mas a equipe retomou a atividade.",
        "c": "Se você revisará o texto, encontraria o erro.",
        "d": "Ele estudou, embora resolveu o problema.",
        "e": "Se você revisar o texto, encontrará o erro."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é coordenação e subordinação. A única construção que o respeita é «Se você revisar o texto, encontrará o erro.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0096",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Na frase 'Ela chegou cedo', cedo funciona como advérbio.",
        "b": "Em 'caminhou lentamente', lentamente é artigo.",
        "c": "Em 'Aquela casa', aquela é verbo.",
        "d": "Na frase 'Ela chegou cedo', cedo é substantivo.",
        "e": "Em 'livro interessante', interessante é preposição."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é classes de palavras. A única construção que o respeita é «Na frase 'Ela chegou cedo', cedo funciona como advérbio.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0097",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Em 'livro interessante', interessante é preposição.",
        "b": "Em 'Aquela casa', aquela é pronome demonstrativo.",
        "c": "Em 'mas continuou', mas é numeral.",
        "d": "Em 'caminhou lentamente', lentamente é artigo.",
        "e": "Em 'Aquela casa', aquela é verbo."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é classes de palavras. A única construção que o respeita é «Em 'Aquela casa', aquela é pronome demonstrativo.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0098",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Em 'livro interessante', interessante é preposição.",
        "b": "Em 'caminhou lentamente', lentamente é artigo.",
        "c": "Em 'livro interessante', interessante é adjetivo.",
        "d": "Na frase 'Ela chegou cedo', cedo é substantivo.",
        "e": "Em 'mas continuou', mas é numeral."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é classes de palavras. A única construção que o respeita é «Em 'livro interessante', interessante é adjetivo.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0099",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Na frase 'Ela chegou cedo', cedo é substantivo.",
        "b": "Em 'Aquela casa', aquela é verbo.",
        "c": "Em 'caminhou lentamente', lentamente é artigo.",
        "d": "Em 'caminhou lentamente', lentamente modifica o verbo.",
        "e": "Em 'mas continuou', mas é numeral."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é classes de palavras. A única construção que o respeita é «Em 'caminhou lentamente', lentamente modifica o verbo.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0100",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Em 'mas continuou', mas é numeral.",
        "b": "Em 'Aquela casa', aquela é verbo.",
        "c": "Na frase 'Ela chegou cedo', cedo é substantivo.",
        "d": "Em 'livro interessante', interessante é preposição.",
        "e": "Em 'mas continuou', mas é conjunção adversativa."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é classes de palavras. A única construção que o respeita é «Em 'mas continuou', mas é conjunção adversativa.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0101",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Infeliz resulta de derivação prefixal.",
        "b": "Infeliz resulta de composição por justaposição.",
        "c": "Anoitecer resulta apenas de flexão nominal.",
        "d": "Felizmente não apresenta afixo.",
        "e": "Passatempo é palavra primitiva."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é formação de palavras. A única construção que o respeita é «Infeliz resulta de derivação prefixal.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0102",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Girassol é formado apenas por sufixação.",
        "b": "Felizmente apresenta derivação sufixal.",
        "c": "Anoitecer resulta apenas de flexão nominal.",
        "d": "Passatempo é palavra primitiva.",
        "e": "Felizmente não apresenta afixo."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é formação de palavras. A única construção que o respeita é «Felizmente apresenta derivação sufixal.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0103",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Girassol é formado apenas por sufixação.",
        "b": "Passatempo é palavra primitiva.",
        "c": "Passatempo é formado por composição.",
        "d": "Infeliz resulta de composição por justaposição.",
        "e": "Anoitecer resulta apenas de flexão nominal."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é formação de palavras. A única construção que o respeita é «Passatempo é formado por composição.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0104",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Infeliz resulta de composição por justaposição.",
        "b": "Felizmente não apresenta afixo.",
        "c": "Girassol é formado apenas por sufixação.",
        "d": "Anoitecer exemplifica derivação parassintética.",
        "e": "Anoitecer resulta apenas de flexão nominal."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é formação de palavras. A única construção que o respeita é «Anoitecer exemplifica derivação parassintética.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0105",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Girassol é formado apenas por sufixação.",
        "b": "Infeliz resulta de composição por justaposição.",
        "c": "Felizmente não apresenta afixo.",
        "d": "Passatempo é palavra primitiva.",
        "e": "Girassol é uma palavra composta."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é formação de palavras. A única construção que o respeita é «Girassol é uma palavra composta.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0111",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Se eu soubesse, teria avisado.",
        "b": "Caso choverá, o evento será transferido.",
        "c": "Se eu saberia, teria avisado.",
        "d": "Quando ele chegará, iniciaremos a reunião.",
        "e": "Ela esperava que todos participam."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é correlação verbal. A única construção que o respeita é «Se eu soubesse, teria avisado.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0112",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Quando ele chegará, iniciaremos a reunião.",
        "b": "Quando ele chegar, iniciaremos a reunião.",
        "c": "Se o relatório estaria pronto, nós o enviaríamos.",
        "d": "Ela esperava que todos participam.",
        "e": "Caso choverá, o evento será transferido."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é correlação verbal. A única construção que o respeita é «Quando ele chegar, iniciaremos a reunião.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0113",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Caso choverá, o evento será transferido.",
        "b": "Se o relatório estaria pronto, nós o enviaríamos.",
        "c": "Caso chova, o evento será transferido.",
        "d": "Se eu saberia, teria avisado.",
        "e": "Ela esperava que todos participam."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é correlação verbal. A única construção que o respeita é «Caso chova, o evento será transferido.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0114",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Se eu saberia, teria avisado.",
        "b": "Se o relatório estaria pronto, nós o enviaríamos.",
        "c": "Ela esperava que todos participam.",
        "d": "Ela esperava que todos participassem.",
        "e": "Quando ele chegará, iniciaremos a reunião."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é correlação verbal. A única construção que o respeita é «Ela esperava que todos participassem.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0115",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "Se o relatório estaria pronto, nós o enviaríamos.",
        "b": "Quando ele chegará, iniciaremos a reunião.",
        "c": "Se eu saberia, teria avisado.",
        "d": "Caso choverá, o evento será transferido.",
        "e": "Se o relatório estivesse pronto, nós o enviaríamos."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é correlação verbal. A única construção que o respeita é «Se o relatório estivesse pronto, nós o enviaríamos.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0116",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "A pesquisa analisou possíveis consequências.",
        "b": "A idéia foi incluída no relatório.",
        "c": "A pesquisa analisou possiveis consequencias.",
        "d": "O público pode entrar ontem.",
        "e": "Eles tem razões para discordar."
      },
      "resposta": "a",
      "explicacao": "O fenômeno em jogo é ortografia e acentuação. A única construção que o respeita é «A pesquisa analisou possíveis consequências.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0117",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "O juíz interviu durante a audiência.",
        "b": "O público pôde entrar ontem.",
        "c": "O público pode entrar ontem.",
        "d": "Eles tem razões para discordar.",
        "e": "A idéia foi incluída no relatório."
      },
      "resposta": "b",
      "explicacao": "O fenômeno em jogo é ortografia e acentuação. A única construção que o respeita é «O público pôde entrar ontem.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0118",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "A pesquisa analisou possiveis consequencias.",
        "b": "O juíz interviu durante a audiência.",
        "c": "Eles têm razões para discordar.",
        "d": "A idéia foi incluída no relatório.",
        "e": "Eles tem razões para discordar."
      },
      "resposta": "c",
      "explicacao": "O fenômeno em jogo é ortografia e acentuação. A única construção que o respeita é «Eles têm razões para discordar.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0119",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "O juíz interviu durante a audiência.",
        "b": "A pesquisa analisou possiveis consequencias.",
        "c": "A idéia foi incluída no relatório.",
        "d": "A ideia foi incluída no relatório.",
        "e": "O público pode entrar ontem."
      },
      "resposta": "d",
      "explicacao": "O fenômeno em jogo é ortografia e acentuação. A única construção que o respeita é «A ideia foi incluída no relatório.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0120",
      "enunciado": "Assinale a alternativa em que a norma-padrão foi respeitada.",
      "alternativas": {
        "a": "O público pode entrar ontem.",
        "b": "A pesquisa analisou possiveis consequencias.",
        "c": "O juíz interviu durante a audiência.",
        "d": "Eles tem razões para discordar.",
        "e": "O juiz interveio durante a audiência."
      },
      "resposta": "e",
      "explicacao": "O fenômeno em jogo é ortografia e acentuação. A única construção que o respeita é «O juiz interveio durante a audiência.»; as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com a correta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0165",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: diversidade de usos conforme região, grupo, situação e tempo?",
      "alternativas": {
        "a": "Variação linguística",
        "b": "Metonímia",
        "c": "Metáfora",
        "d": "Conotação",
        "e": "Denotação"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Variação linguística: diversidade de usos conforme região, grupo, situação e tempo. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-port-0166",
      "enunciado": "Qual condição ajuda a caracterizar Variação linguística?",
      "alternativas": {
        "a": "autor pela obra, parte pelo todo ou recipiente pelo conteúdo são relações frequentes",
        "b": "línguas mudam e usuários adequam registros a contextos",
        "c": "contexto ativa valores que ultrapassam o significado literal",
        "d": "uma característica é transferida de um domínio para outro",
        "e": "relação direta entre expressão e referente reduz ambiguidades"
      },
      "resposta": "b",
      "explicacao": "Variação linguística: línguas mudam e usuários adequam registros a contextos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0167",
      "enunciado": "Qual consequência ou função se associa corretamente a Variação linguística?",
      "alternativas": {
        "a": "amplia possibilidades expressivas e interpretativas",
        "b": "condensa referências sem depender de semelhança metafórica",
        "c": "permite distinguir adequação comunicativa de preconceito linguístico",
        "d": "produz síntese expressiva e novas formas de perceber um tema",
        "e": "favorece comunicação objetiva sem impedir escolhas de estilo"
      },
      "resposta": "c",
      "explicacao": "Variação linguística: permite distinguir adequação comunicativa de preconceito linguístico. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-port-0168",
      "enunciado": "Qual definição corresponde corretamente a Variação linguística?",
      "alternativas": {
        "a": "uso de palavra com sentidos figurados, afetivos ou associados",
        "b": "substituição de um termo por outro com relação de proximidade",
        "c": "uso de palavra em sentido literal e relativamente estável",
        "d": "diversidade de usos conforme região, grupo, situação e tempo",
        "e": "aproximação implícita entre campos de sentido sem conectivo comparativo"
      },
      "resposta": "d",
      "explicacao": "Variação linguística é diversidade de usos conforme região, grupo, situação e tempo. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "ingles": [
    {
      "id": "xtr-ing-0003",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Surveys showed that drivers unanimously opposed the lanes",
        "b": "The dedicated lanes were removed after drivers complained",
        "c": "Average bus travel time fell by twelve minutes",
        "d": "The reduction in travel time followed a restriction on the number of buses using the corridor",
        "e": "Average travel time increased once private cars lost road space"
      },
      "resposta": "c",
      "explicacao": "The passage supports: Average bus travel time fell by twelve minutes. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "After the city introduced dedicated bus lanes, average travel time fell by twelve minutes. The lanes were initially controversial because they reduced space for private cars, yet surveys later showed that even some drivers valued the more predictable traffic flow."
    },
    {
      "id": "xtr-ing-0004",
      "enunciado": "In the passage, the word “predictable” is closest in meaning to:",
      "alternativas": {
        "a": "the act of making information known",
        "b": "by a large and sudden amount",
        "c": "preventing someone from taking part",
        "d": "likely to happen in an expected way",
        "e": "in a regular and repeated manner"
      },
      "resposta": "d",
      "explicacao": "In this passage, “predictable” means “likely to happen in an expected way”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "After the city introduced dedicated bus lanes, average travel time fell by twelve minutes. The lanes were initially controversial because they reduced space for private cars, yet surveys later showed that even some drivers valued the more predictable traffic flow."
    },
    {
      "id": "xtr-ing-0007",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The researchers concluded that a uniform planting programme would produce the same cooling everywhere",
        "b": "Tree-covered blocks were generally cooler",
        "c": "The cooling effect was identical in every part of the city",
        "d": "The measurements showed that shade from buildings was more effective than shade from mature trees",
        "e": "Blocks with mature trees recorded the highest temperatures"
      },
      "resposta": "b",
      "explicacao": "The passage supports: Tree-covered blocks were generally cooler. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Researchers mapped street temperatures and found that blocks with mature trees were consistently cooler. The effect was strongest in areas with little shade from buildings, suggesting that planting strategies should reflect local urban form rather than follow a single citywide formula."
    },
    {
      "id": "xtr-ing-0008",
      "enunciado": "In the passage, the word “consistently” is closest in meaning to:",
      "alternativas": {
        "a": "restricted in amount or availability",
        "b": "the ability to recover from or withstand difficulty",
        "c": "in a regular and repeated manner",
        "d": "studied or inspected carefully",
        "e": "limited rather than large"
      },
      "resposta": "c",
      "explicacao": "In this passage, “consistently” means “in a regular and repeated manner”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Researchers mapped street temperatures and found that blocks with mature trees were consistently cooler. The effect was strongest in areas with little shade from buildings, suggesting that planting strategies should reflect local urban form rather than follow a single citywide formula."
    },
    {
      "id": "xtr-ing-0011",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The agency later adopted common standards",
        "b": "The agency withdrew the datasets once it recognised that varied file formats could not be standardised",
        "c": "Publishing files in any format is enough to ensure scrutiny",
        "d": "The explanatory notes replaced the datasets themselves",
        "e": "Access to the portal was restricted to a small group of researchers"
      },
      "resposta": "a",
      "explicacao": "The passage supports: The agency later adopted common standards. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A government portal released thousands of public datasets, but journalists struggled to use them because file formats varied widely. The agency then published common standards and explanatory notes, turning formal access into information that could actually be examined."
    },
    {
      "id": "xtr-ing-0012",
      "enunciado": "In the passage, the word “examined” is closest in meaning to:",
      "alternativas": {
        "a": "became older",
        "b": "studied or inspected carefully",
        "c": "punishments or charges for breaking a rule",
        "d": "easily damaged or broken",
        "e": "not currently occupied or filled"
      },
      "resposta": "b",
      "explicacao": "In this passage, “examined” means “studied or inspected carefully”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A government portal released thousands of public datasets, but journalists struggled to use them because file formats varied widely. The agency then published common standards and explanatory notes, turning formal access into information that could actually be examined."
    },
    {
      "id": "xtr-ing-0015",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Applications for vacant positions declined after the policy",
        "b": "Productivity fell sharply once employees worked from home",
        "c": "The company required every employee to return to the office full time",
        "d": "Managers cancelled all meetings in order to protect flexibility",
        "e": "Job applications increased after the policy"
      },
      "resposta": "e",
      "explicacao": "The passage supports: Job applications increased after the policy. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A company allowed employees to work remotely three days a week. Productivity remained stable, while applications for vacant positions increased. Managers concluded that flexibility was valuable, but they also scheduled regular meetings to prevent newer workers from becoming isolated."
    },
    {
      "id": "xtr-ing-0016",
      "enunciado": "In the passage, the word “vacant” is closest in meaning to:",
      "alternativas": {
        "a": "not currently occupied or filled",
        "b": "was determined or influenced by something else",
        "c": "confirmed as accurate or genuine",
        "d": "different from what is common or expected",
        "e": "experiencing harm or difficulty"
      },
      "resposta": "a",
      "explicacao": "In this passage, “vacant” means “not currently occupied or filled”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A company allowed employees to work remotely three days a week. Productivity remained stable, while applications for vacant positions increased. Managers concluded that flexibility was valuable, but they also scheduled regular meetings to prevent newer workers from becoming isolated."
    },
    {
      "id": "xtr-ing-0019",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Doctors accepted the system's output as a final diagnosis",
        "b": "A system trained in two hospitals was expected to perform identically in any other setting",
        "c": "The doctors relied on the alerts as final diagnoses because the training data covered every hospital",
        "d": "Doctors did not let the system make the final diagnosis",
        "e": "The system was trained on data from every hospital in the country"
      },
      "resposta": "d",
      "explicacao": "The passage supports: Doctors did not let the system make the final diagnosis. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "An artificial intelligence system identified unusual patterns in medical images. Doctors used the alerts as a second opinion rather than a final diagnosis, because the system had been trained on data from only two hospitals and might not perform equally well elsewhere."
    },
    {
      "id": "xtr-ing-0020",
      "enunciado": "In the passage, the word “unusual” is closest in meaning to:",
      "alternativas": {
        "a": "small pieces broken or separated from something larger",
        "b": "separated from regular contact with others",
        "c": "making something reach farther or last longer",
        "d": "by a large and sudden amount",
        "e": "different from what is common or expected"
      },
      "resposta": "e",
      "explicacao": "In this passage, “unusual” means “different from what is common or expected”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "An artificial intelligence system identified unusual patterns in medical images. Doctors used the alerts as a second opinion rather than a final diagnosis, because the system had been trained on data from only two hospitals and might not perform equally well elsewhere."
    },
    {
      "id": "xtr-ing-0023",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The donation of surplus food was the reason staff had to inspect products and update prices",
        "b": "Prices were updated automatically, without any inspection",
        "c": "Remaining food was donated",
        "d": "Donations were suspended because of inspection costs",
        "e": "The reduction in waste was achieved without any change to how staff inspected and priced products"
      },
      "resposta": "c",
      "explicacao": "The passage supports: Remaining food was donated. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A supermarket discounted food approaching its sell-by date and donated what remained. Waste decreased sharply, although staff needed new routines to inspect products and update prices. The results show that a simple idea may still depend on careful daily operations."
    },
    {
      "id": "xtr-ing-0024",
      "enunciado": "In the passage, the word “sharply” is closest in meaning to:",
      "alternativas": {
        "a": "an amount permitted or provided",
        "b": "provided what was needed",
        "c": "the ability to recover from or withstand difficulty",
        "d": "by a large and sudden amount",
        "e": "not previously known or recognized"
      },
      "resposta": "d",
      "explicacao": "In this passage, “sharply” means “by a large and sudden amount”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A supermarket discounted food approaching its sell-by date and donated what remained. Waste decreased sharply, although staff needed new routines to inspect products and update prices. The results show that a simple idea may still depend on careful daily operations."
    },
    {
      "id": "xtr-ing-0027",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Essential services were left outside the project",
        "b": "The clinic maintained refrigeration during a storm",
        "c": "The batteries were installed only after the storm",
        "d": "The community relied entirely on the national network during the storm",
        "e": "The clinic lost refrigeration when the national network failed"
      },
      "resposta": "b",
      "explicacao": "The passage supports: The clinic maintained refrigeration during a storm. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A rural community built a solar microgrid that stores electricity in batteries. During a storm, the national network failed, but the clinic kept its refrigerators running. The project did not eliminate every outage, yet it improved resilience for essential services."
    },
    {
      "id": "xtr-ing-0028",
      "enunciado": "In the passage, the word “resilience” is closest in meaning to:",
      "alternativas": {
        "a": "punishments or charges for breaking a rule",
        "b": "preventing someone from taking part",
        "c": "the ability to recover from or withstand difficulty",
        "d": "the act of making information known",
        "e": "the act of finishing something"
      },
      "resposta": "c",
      "explicacao": "In this passage, “resilience” means “the ability to recover from or withstand difficulty”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A rural community built a solar microgrid that stores electricity in batteries. During a storm, the national network failed, but the clinic kept its refrigerators running. The project did not eliminate every outage, yet it improved resilience for essential services."
    },
    {
      "id": "xtr-ing-0031",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Families returned to the library after the change",
        "b": "Librarians recommended stronger penalties in order to restore access",
        "c": "Returns declined sharply once late fees were removed",
        "d": "Families continued to avoid the building after the change",
        "e": "Penalties proved to be the most effective instrument for restoring access to the library"
      },
      "resposta": "a",
      "explicacao": "The passage supports: Families returned to the library after the change. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "The library stopped charging late fees for children's books. Returns did not decline, and many families who had avoided the building came back. Librarians argued that reminders and replacement plans worked better than penalties for restoring access."
    },
    {
      "id": "xtr-ing-0032",
      "enunciado": "In the passage, the word “penalties” is closest in meaning to:",
      "alternativas": {
        "a": "confirmed as accurate or genuine",
        "b": "punishments or charges for breaking a rule",
        "c": "limited rather than large",
        "d": "kept available for replacement or extra use",
        "e": "restricted in amount or availability"
      },
      "resposta": "b",
      "explicacao": "In this passage, “penalties” means “punishments or charges for breaking a rule”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "The library stopped charging late fees for children's books. Returns did not decline, and many families who had avoided the building came back. Librarians argued that reminders and replacement plans worked better than penalties for restoring access."
    },
    {
      "id": "xtr-ing-0035",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Broad public participation and professional verification proved to be incompatible goals",
        "b": "The records were collected in rural forests rather than urban gardens",
        "c": "The scientists published the volunteers' records without review in order to speed up data collection",
        "d": "Scientists used the uploaded images without any verification",
        "e": "Scientists checked the uploaded records"
      },
      "resposta": "e",
      "explicacao": "The passage supports: Scientists checked the uploaded records. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Volunteers photographed insects in urban gardens and uploaded the images to a research platform. Scientists verified the records before using them, combining broad public participation with professional quality control."
    },
    {
      "id": "xtr-ing-0036",
      "enunciado": "In the passage, the word “verified” is closest in meaning to:",
      "alternativas": {
        "a": "confirmed as accurate or genuine",
        "b": "make up for a loss or disadvantage",
        "c": "easily damaged or broken",
        "d": "became older",
        "e": "small pieces broken or separated from something larger"
      },
      "resposta": "a",
      "explicacao": "In this passage, “verified” means “confirmed as accurate or genuine”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Volunteers photographed insects in urban gardens and uploaded the images to a research platform. Scientists verified the records before using them, combining broad public participation with professional quality control."
    },
    {
      "id": "xtr-ing-0039",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Fishing communities opposed the choice of protected sites",
        "b": "Ecological restoration depended on technical procedures alone",
        "c": "The higher survival rates were recorded precisely where fishing communities had no role in the decision",
        "d": "Coral fragments were grown in nurseries",
        "e": "The damaged reefs recovered without any intervention"
      },
      "resposta": "d",
      "explicacao": "The passage supports: Coral fragments were grown in nurseries. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Marine biologists attached nursery-grown coral fragments to damaged reefs. Survival was higher where local fishing communities helped choose protected sites, indicating that ecological restoration also depends on social cooperation."
    },
    {
      "id": "xtr-ing-0040",
      "enunciado": "In the passage, the word “fragments” is closest in meaning to:",
      "alternativas": {
        "a": "experiencing harm or difficulty",
        "b": "provided what was needed",
        "c": "was determined or influenced by something else",
        "d": "giving a task to someone",
        "e": "small pieces broken or separated from something larger"
      },
      "resposta": "e",
      "explicacao": "In this passage, “fragments” means “small pieces broken or separated from something larger”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Marine biologists attached nursery-grown coral fragments to damaged reefs. Survival was higher where local fishing communities helped choose protected sites, indicating that ecological restoration also depends on social cooperation."
    },
    {
      "id": "xtr-ing-0043",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The weekly conversations reduced the amount of practice",
        "b": "Repetition and interaction were found to develop the same skill",
        "c": "Weekly conversations accelerated speaking improvement",
        "d": "The app supplied the uncertainty of real communication",
        "e": "Students who used only the app improved their speaking fastest"
      },
      "resposta": "c",
      "explicacao": "The passage supports: Weekly conversations accelerated speaking improvement. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Students using a language app practiced more often, but those who also held weekly conversations improved their speaking more rapidly. The app was useful for repetition; interaction supplied the uncertainty and feedback of real communication."
    },
    {
      "id": "xtr-ing-0044",
      "enunciado": "In the passage, the word “supplied” is closest in meaning to:",
      "alternativas": {
        "a": "the act of making information known",
        "b": "fitting something into a smaller space or period",
        "c": "making something reach farther or last longer",
        "d": "provided what was needed",
        "e": "separated from regular contact with others"
      },
      "resposta": "d",
      "explicacao": "In this passage, “supplied” means “provided what was needed”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Students using a language app practiced more often, but those who also held weekly conversations improved their speaking more rapidly. The app was useful for repetition; interaction supplied the uncertainty and feedback of real communication."
    },
    {
      "id": "xtr-ing-0047",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The ranking of benefit applications was a routine decision with no consequences for rights",
        "b": "The system ranked benefit applications",
        "c": "Officials welcomed disclosure as a way to improve security",
        "d": "The officials and the advocates agreed that publishing the criteria carried no risk of manipulation",
        "e": "Advocates argued that automated decisions should not be challenged"
      },
      "resposta": "b",
      "explicacao": "The passage supports: The system ranked benefit applications. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A court required an agency to explain how an automated system ranked benefit applications. Officials feared that disclosure would make the tool easier to manipulate, while advocates argued that decisions affecting rights must be open to challenge."
    },
    {
      "id": "xtr-ing-0048",
      "enunciado": "In the passage, the word “disclosure” is closest in meaning to:",
      "alternativas": {
        "a": "not previously known or recognized",
        "b": "reached beyond an original limit",
        "c": "the act of making information known",
        "d": "an amount permitted or provided",
        "e": "restricted in amount or availability"
      },
      "resposta": "c",
      "explicacao": "In this passage, “disclosure” means “the act of making information known”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A court required an agency to explain how an automated system ranked benefit applications. Officials feared that disclosure would make the tool easier to manipulate, while advocates argued that decisions affecting rights must be open to challenge."
    },
    {
      "id": "xtr-ing-0051",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The paper hired neighborhood reporters",
        "b": "The newspaper ended its print edition entirely once online readership began to grow more quickly",
        "c": "Neighborhood reporting was the cost the paper had to cut in order to fund its digital shift",
        "d": "Residents with limited internet access became the main online audience",
        "e": "Daily print delivery was expanded alongside the website"
      },
      "resposta": "a",
      "explicacao": "The passage supports: The paper hired neighborhood reporters. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A local newspaper replaced daily print delivery with a weekly edition and invested in neighborhood reporters. Online readership grew, but editors kept a small print run for residents with limited internet access."
    },
    {
      "id": "xtr-ing-0052",
      "enunciado": "In the passage, the word “limited” is closest in meaning to:",
      "alternativas": {
        "a": "the act of finishing something",
        "b": "restricted in amount or availability",
        "c": "preventing someone from taking part",
        "d": "became older",
        "e": "messages that encourage a particular action"
      },
      "resposta": "b",
      "explicacao": "In this passage, “limited” means “restricted in amount or availability”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A local newspaper replaced daily print delivery with a weekly edition and invested in neighborhood reporters. Online readership grew, but editors kept a small print run for residents with limited internet access."
    },
    {
      "id": "xtr-ing-0055",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The new crossings gave pedestrians less time than before",
        "b": "Older residents began to avoid the commercial center",
        "c": "The crossings were redesigned before the population aged",
        "d": "The redesign was reversed because traffic became slower",
        "e": "Pedestrians received more time to cross"
      },
      "resposta": "e",
      "explicacao": "The passage supports: Pedestrians received more time to cross. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "As the population aged, the town redesigned crossings to allow more time for pedestrians. Shop owners first worried about slower traffic, but later noticed that safer streets brought more older customers to the commercial center."
    },
    {
      "id": "xtr-ing-0056",
      "enunciado": "In the passage, the word “aged” is closest in meaning to:",
      "alternativas": {
        "a": "became older",
        "b": "kept available for replacement or extra use",
        "c": "likely to happen in an expected way",
        "d": "was determined or influenced by something else",
        "e": "limited rather than large"
      },
      "resposta": "a",
      "explicacao": "In this passage, “aged” means “became older”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "As the population aged, the town redesigned crossings to allow more time for pedestrians. Shop owners first worried about slower traffic, but later noticed that safer streets brought more older customers to the commercial center."
    },
    {
      "id": "xtr-ing-0059",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Customers were asked to discard the containers after one use",
        "b": "Collection routes and return rates turned out to be irrelevant to the environmental outcome",
        "c": "Collection routes proved irrelevant to the environmental outcome",
        "d": "Containers were collected during later deliveries",
        "e": "The environmental benefit was guaranteed by the material alone"
      },
      "resposta": "d",
      "explicacao": "The passage supports: Containers were collected during later deliveries. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A delivery company tested reusable containers that customers returned on the next order. The packaging lasted many cycles, but the environmental benefit depended on efficient collection routes and high return rates."
    },
    {
      "id": "xtr-ing-0060",
      "enunciado": "In the passage, the word “depended” is closest in meaning to:",
      "alternativas": {
        "a": "easily damaged or broken",
        "b": "make up for a loss or disadvantage",
        "c": "in a regular and repeated manner",
        "d": "making something reach farther or last longer",
        "e": "was determined or influenced by something else"
      },
      "resposta": "e",
      "explicacao": "In this passage, “depended” means “was determined or influenced by something else”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A delivery company tested reusable containers that customers returned on the next order. The packaging lasted many cycles, but the environmental benefit depended on efficient collection routes and high return rates."
    },
    {
      "id": "xtr-ing-0063",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Rising anxiety proved to be a problem only specialists inside the office could address",
        "b": "The training given to teachers replaced the counseling service once waiting times had been reduced",
        "c": "Waiting times for counseling decreased",
        "d": "Training teachers removed the need for specialist care",
        "e": "Teachers were kept outside the mental health programme"
      },
      "resposta": "c",
      "explicacao": "The passage supports: Waiting times for counseling decreased. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A school added counselors after teachers reported rising anxiety among students. Waiting times decreased, yet the counselors also trained teachers to recognize warning signs, extending support beyond the counseling office."
    },
    {
      "id": "xtr-ing-0064",
      "enunciado": "In the passage, the word “extending” is closest in meaning to:",
      "alternativas": {
        "a": "experiencing harm or difficulty",
        "b": "studied or inspected carefully",
        "c": "giving a task to someone",
        "d": "making something reach farther or last longer",
        "e": "not previously known or recognized"
      },
      "resposta": "d",
      "explicacao": "In this passage, “extending” means “making something reach farther or last longer”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A school added counselors after teachers reported rising anxiety among students. Waiting times decreased, yet the counselors also trained teachers to recognize warning signs, extending support beyond the counseling office."
    },
    {
      "id": "xtr-ing-0067",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The shops succeeded by keeping their original recipes unchanged and refusing any local adaptation",
        "b": "The businesses served more than one community",
        "c": "The businesses avoided introducing unfamiliar products",
        "d": "Long-term residents opened the shops for the newcomers",
        "e": "Cultural exchange occurred without any adaptation"
      },
      "resposta": "b",
      "explicacao": "The passage supports: The businesses served more than one community. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Newcomers to the city created businesses that served both immigrant and long-term residents. Their shops introduced unfamiliar products while also adapting recipes and services to local tastes."
    },
    {
      "id": "xtr-ing-0068",
      "enunciado": "In the passage, the word “unfamiliar” is closest in meaning to:",
      "alternativas": {
        "a": "separated from regular contact with others",
        "b": "not currently occupied or filled",
        "c": "not previously known or recognized",
        "d": "fitting something into a smaller space or period",
        "e": "preventing someone from taking part"
      },
      "resposta": "c",
      "explicacao": "In this passage, “unfamiliar” means “not previously known or recognized”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Newcomers to the city created businesses that served both immigrant and long-term residents. Their shops introduced unfamiliar products while also adapting recipes and services to local tastes."
    },
    {
      "id": "xtr-ing-0071",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Some vendors brought back cash payments",
        "b": "Every customer found the digital system easy to use",
        "c": "Transactions became slower under digital payment",
        "d": "All vendors kept digital payment as the only option",
        "e": "Elderly customers asked for the end of cash payments"
      },
      "resposta": "a",
      "explicacao": "The passage supports: Some vendors brought back cash payments. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A market accepted only digital payments for one month. Transactions became faster, but some elderly customers needed assistance and a few vendors restored a cash option to avoid excluding them."
    },
    {
      "id": "xtr-ing-0072",
      "enunciado": "In the passage, the word “excluding” is closest in meaning to:",
      "alternativas": {
        "a": "limited rather than large",
        "b": "preventing someone from taking part",
        "c": "an amount permitted or provided",
        "d": "reached beyond an original limit",
        "e": "different from what is common or expected"
      },
      "resposta": "b",
      "explicacao": "In this passage, “excluding” means “preventing someone from taking part”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A market accepted only digital payments for one month. Transactions became faster, but some elderly customers needed assistance and a few vendors restored a cash option to avoid excluding them."
    },
    {
      "id": "xtr-ing-0075",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The leaflets proved more persuasive than the nurses because they reached a much larger audience",
        "b": "Leaflets proved more effective than conversation with nurses",
        "c": "The low attendance showed that public discussion is an ineffective way to address concerns",
        "d": "Attendance at the meetings was unusually high",
        "e": "Nurses participated in the meetings"
      },
      "resposta": "e",
      "explicacao": "The passage supports: Nurses participated in the meetings. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Health officials held public meetings about a new vaccine. Attendance was modest, but participants who spoke directly with nurses were more willing to schedule appointments than those who received leaflets alone."
    },
    {
      "id": "xtr-ing-0076",
      "enunciado": "In the passage, the word “modest” is closest in meaning to:",
      "alternativas": {
        "a": "limited rather than large",
        "b": "the act of finishing something",
        "c": "easily damaged or broken",
        "d": "by a large and sudden amount",
        "e": "messages that encourage a particular action"
      },
      "resposta": "a",
      "explicacao": "In this passage, “modest” means “limited rather than large”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Health officials held public meetings about a new vaccine. Attendance was modest, but participants who spoke directly with nurses were more willing to schedule appointments than those who received leaflets alone."
    },
    {
      "id": "xtr-ing-0079",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The manuscripts were digitized because they were easy to handle",
        "b": "The curators presented the digital copies as a complete substitute for consulting the originals",
        "c": "Visitors were prevented from examining details of the images",
        "d": "Visitors could enlarge details in digital images",
        "e": "Paper, ink and binding carry no information beyond the text they were used to record"
      },
      "resposta": "d",
      "explicacao": "The passage supports: Visitors could enlarge details in digital images. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A museum digitized fragile manuscripts so visitors could zoom in on details. Curators emphasized that the digital copies expanded access but did not replace the material information contained in paper, ink, and binding."
    },
    {
      "id": "xtr-ing-0080",
      "enunciado": "In the passage, the word “fragile” is closest in meaning to:",
      "alternativas": {
        "a": "kept available for replacement or extra use",
        "b": "the ability to recover from or withstand difficulty",
        "c": "experiencing harm or difficulty",
        "d": "likely to happen in an expected way",
        "e": "easily damaged or broken"
      },
      "resposta": "e",
      "explicacao": "In this passage, “fragile” means “easily damaged or broken”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A museum digitized fragile manuscripts so visitors could zoom in on details. Curators emphasized that the digital copies expanded access but did not replace the material information contained in paper, ink, and binding."
    },
    {
      "id": "xtr-ing-0083",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Remote data alone was sufficient to guide the decision",
        "b": "The images identified fields with an excess of water",
        "c": "Farmers inspected soil before adjusting irrigation",
        "d": "Soil inspections were abandoned in favour of remote data",
        "e": "Farmers changed irrigation before inspecting the soil"
      },
      "resposta": "c",
      "explicacao": "The passage supports: Farmers inspected soil before adjusting irrigation. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Farmers used satellite images to identify fields under water stress. The images did not tell them why plants were suffering, so they combined remote data with soil inspections before changing irrigation."
    },
    {
      "id": "xtr-ing-0084",
      "enunciado": "In the passage, the word “suffering” is closest in meaning to:",
      "alternativas": {
        "a": "in a regular and repeated manner",
        "b": "punishments or charges for breaking a rule",
        "c": "separated from regular contact with others",
        "d": "experiencing harm or difficulty",
        "e": "make up for a loss or disadvantage"
      },
      "resposta": "d",
      "explicacao": "In this passage, “suffering” means “experiencing harm or difficulty”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Farmers used satellite images to identify fields under water stress. The images did not tell them why plants were suffering, so they combined remote data with soil inspections before changing irrigation."
    },
    {
      "id": "xtr-ing-0087",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Isolated residents were the least likely group to use the service",
        "b": "Some public buildings stayed open at night",
        "c": "The buildings were opened during daytime hours only",
        "d": "Usage was highest where no community contact took place",
        "e": "Opening the buildings at night was enough to guarantee that the service reached those at risk"
      },
      "resposta": "b",
      "explicacao": "The passage supports: Some public buildings stayed open at night. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "During heatwaves, the city opened air-conditioned public buildings at night. Usage was highest in neighborhoods where community groups contacted isolated residents, showing that a service must be both available and actively connected to its users."
    },
    {
      "id": "xtr-ing-0088",
      "enunciado": "In the passage, the word “isolated” is closest in meaning to:",
      "alternativas": {
        "a": "an amount permitted or provided",
        "b": "giving a task to someone",
        "c": "separated from regular contact with others",
        "d": "confirmed as accurate or genuine",
        "e": "studied or inspected carefully"
      },
      "resposta": "c",
      "explicacao": "In this passage, “isolated” means “separated from regular contact with others”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "During heatwaves, the city opened air-conditioned public buildings at night. Usage was highest in neighborhoods where community groups contacted isolated residents, showing that a service must be both available and actively connected to its users."
    },
    {
      "id": "xtr-ing-0091",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The higher price applied above a basic allowance",
        "b": "The basic household allowance was the part of consumption that became more expensive",
        "c": "The higher tariff applied to every level of consumption, which explains the fall in overall use",
        "d": "Prices were reduced for consumption above the allowance",
        "e": "The higher price applied to every level of consumption"
      },
      "resposta": "a",
      "explicacao": "The passage supports: The higher price applied above a basic allowance. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A region introduced higher water prices only for consumption above a basic household allowance. Overall use fell, while low-income families using modest amounts saw little change in their bills."
    },
    {
      "id": "xtr-ing-0092",
      "enunciado": "In the passage, the word “allowance” is closest in meaning to:",
      "alternativas": {
        "a": "fitting something into a smaller space or period",
        "b": "an amount permitted or provided",
        "c": "the act of finishing something",
        "d": "small pieces broken or separated from something larger",
        "e": "not currently occupied or filled"
      },
      "resposta": "b",
      "explicacao": "In this passage, “allowance” means “an amount permitted or provided”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A region introduced higher water prices only for consumption above a basic household allowance. Overall use fell, while low-income families using modest amounts saw little change in their bills."
    },
    {
      "id": "xtr-ing-0095",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The live discussion groups were open to students not enrolled",
        "b": "Access to the same videos produced identical completion rates",
        "c": "The course withdrew its recorded lectures",
        "d": "The recorded lectures were restricted to the students who had joined the live discussion groups",
        "e": "Every student could watch the recorded lectures"
      },
      "resposta": "e",
      "explicacao": "The passage supports: Every student could watch the recorded lectures. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "An online course offered recorded lectures and live discussion groups. Completion rates were higher among students who joined the discussions, even though all participants had access to the same videos."
    },
    {
      "id": "xtr-ing-0096",
      "enunciado": "In the passage, the word “completion” is closest in meaning to:",
      "alternativas": {
        "a": "the act of finishing something",
        "b": "provided what was needed",
        "c": "different from what is common or expected",
        "d": "reached beyond an original limit",
        "e": "kept available for replacement or extra use"
      },
      "resposta": "a",
      "explicacao": "In this passage, “completion” means “the act of finishing something”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "An online course offered recorded lectures and live discussion groups. Completion rates were higher among students who joined the discussions, even though all participants had access to the same videos."
    },
    {
      "id": "xtr-ing-0099",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Supporters and companies agreed that repairs carry no risk",
        "b": "The law was defended on safety grounds alone",
        "c": "The debate concerned the price of manuals rather than access",
        "d": "Manufacturers had to provide manuals and parts",
        "e": "Manufacturers were prohibited from selling spare parts"
      },
      "resposta": "d",
      "explicacao": "The passage supports: Manufacturers had to provide manuals and parts. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A repair law required manufacturers to provide manuals and spare parts. Supporters said it would reduce waste, while companies warned that poorly trained repairs could create safety risks. The debate focused on access as well as responsibility."
    },
    {
      "id": "xtr-ing-0100",
      "enunciado": "In the passage, the word “spare” is closest in meaning to:",
      "alternativas": {
        "a": "by a large and sudden amount",
        "b": "the act of making information known",
        "c": "make up for a loss or disadvantage",
        "d": "messages that encourage a particular action",
        "e": "kept available for replacement or extra use"
      },
      "resposta": "e",
      "explicacao": "In this passage, “spare” means “kept available for replacement or extra use”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A repair law required manufacturers to provide manuals and spare parts. Supporters said it would reduce waste, while companies warned that poorly trained repairs could create safety risks. The debate focused on access as well as responsibility."
    },
    {
      "id": "xtr-ing-0103",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The corridor compensated for the habitat loss occurring in the areas surrounding the two reserves",
        "b": "The cameras recorded no movement between the reserves",
        "c": "Animals were recorded using the restored strip",
        "d": "The recorded animal movement proved that further habitat protection had become unnecessary",
        "e": "The corridor eliminated the effects of habitat loss"
      },
      "resposta": "c",
      "explicacao": "The passage supports: Animals were recorded using the restored strip. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Two forest reserves were connected by a restored strip of vegetation. Cameras later recorded animals moving between them, although researchers cautioned that a corridor cannot compensate for continued habitat loss elsewhere."
    },
    {
      "id": "xtr-ing-0104",
      "enunciado": "In the passage, the word “compensate” is closest in meaning to:",
      "alternativas": {
        "a": "giving a task to someone",
        "b": "likely to happen in an expected way",
        "c": "the ability to recover from or withstand difficulty",
        "d": "make up for a loss or disadvantage",
        "e": "restricted in amount or availability"
      },
      "resposta": "d",
      "explicacao": "In this passage, “compensate” means “make up for a loss or disadvantage”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Two forest reserves were connected by a restored strip of vegetation. Cameras later recorded animals moving between them, although researchers cautioned that a corridor cannot compensate for continued habitat loss elsewhere."
    },
    {
      "id": "xtr-ing-0107",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Sources were listed only for episodes without guests",
        "b": "The podcast published corrections",
        "c": "The educational value of the programme grew in proportion to the size of its audience",
        "d": "Educational value was measured by the size of the audience",
        "e": "The podcast avoided corrections so that its slow audience growth would not be further damaged"
      },
      "resposta": "b",
      "explicacao": "The passage supports: The podcast published corrections. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A science podcast linked every episode to sources and published corrections when guests made errors. Its audience grew slowly, but teachers began assigning episodes because the production made its evidence visible."
    },
    {
      "id": "xtr-ing-0108",
      "enunciado": "In the passage, the word “assigning” is closest in meaning to:",
      "alternativas": {
        "a": "in a regular and repeated manner",
        "b": "fitting something into a smaller space or period",
        "c": "giving a task to someone",
        "d": "punishments or charges for breaking a rule",
        "e": "became older"
      },
      "resposta": "c",
      "explicacao": "In this passage, “assigning” means “giving a task to someone”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A science podcast linked every episode to sources and published corrections when guests made errors. Its audience grew slowly, but teachers began assigning episodes because the production made its evidence visible."
    },
    {
      "id": "xtr-ing-0111",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Sick leave declined during the test",
        "b": "The model succeeded without any change to deadlines",
        "c": "Teams compressed five days of work into four",
        "d": "Meetings became longer under the new schedule",
        "e": "Sick leave increased during the experiment"
      },
      "resposta": "a",
      "explicacao": "The passage supports: Sick leave declined during the test. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A firm tested a four-day week without reducing salaries. Meetings became shorter and sick leave declined, but the model worked only after teams redesigned deadlines rather than compressing five days of work into four."
    },
    {
      "id": "xtr-ing-0112",
      "enunciado": "In the passage, the word “compressing” is closest in meaning to:",
      "alternativas": {
        "a": "confirmed as accurate or genuine",
        "b": "fitting something into a smaller space or period",
        "c": "was determined or influenced by something else",
        "d": "studied or inspected carefully",
        "e": "reached beyond an original limit"
      },
      "resposta": "b",
      "explicacao": "In this passage, “compressing” means “fitting something into a smaller space or period”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A firm tested a four-day week without reducing salaries. Meetings became shorter and sick leave declined, but the model worked only after teams redesigned deadlines rather than compressing five days of work into four."
    },
    {
      "id": "xtr-ing-0115",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "Battery recycling was considered irrelevant to the assessment",
        "b": "Battery recycling and electricity generation fell outside the scope of the city's evaluation",
        "c": "The city disregarded how the electricity was generated",
        "d": "Electric buses removed every environmental impact",
        "e": "The buses produced no exhaust emissions on their routes"
      },
      "resposta": "e",
      "explicacao": "The passage supports: The buses produced no exhaust emissions on their routes. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Electric buses eliminated exhaust emissions along their routes, yet the city still had to consider how the electricity was generated and how batteries would be recycled. The evaluation therefore extended beyond the vehicles themselves."
    },
    {
      "id": "xtr-ing-0116",
      "enunciado": "In the passage, the word “extended” is closest in meaning to:",
      "alternativas": {
        "a": "reached beyond an original limit",
        "b": "messages that encourage a particular action",
        "c": "making something reach farther or last longer",
        "d": "not currently occupied or filled",
        "e": "small pieces broken or separated from something larger"
      },
      "resposta": "a",
      "explicacao": "In this passage, “extended” means “reached beyond an original limit”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "Electric buses eliminated exhaust emissions along their routes, yet the city still had to consider how the electricity was generated and how batteries would be recycled. The evaluation therefore extended beyond the vehicles themselves."
    },
    {
      "id": "xtr-ing-0119",
      "enunciado": "Which statement is supported by the passage?",
      "alternativas": {
        "a": "The headline had no influence on the speed at which the false story circulated online",
        "b": "Headlines had no influence on the story's circulation",
        "c": "The false story spread because it contradicted what readers believed",
        "d": "The platform encouraged users to open articles first",
        "e": "The corrections spread more widely than the original story because readers had already opened it"
      },
      "resposta": "d",
      "explicacao": "The passage supports: The platform encouraged users to open articles first. The other options refer to the same text but state what it does not support or contradict what it says.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A false story spread rapidly because its headline confirmed what many readers already believed. Corrections reached fewer people, so the platform tested prompts that asked users to open articles before sharing them."
    },
    {
      "id": "xtr-ing-0120",
      "enunciado": "In the passage, the word “prompts” is closest in meaning to:",
      "alternativas": {
        "a": "not previously known or recognized",
        "b": "provided what was needed",
        "c": "different from what is common or expected",
        "d": "likely to happen in an expected way História Questões 0621 a 0820 | 200 itens",
        "e": "messages that encourage a particular action"
      },
      "resposta": "e",
      "explicacao": "In this passage, “prompts” means “messages that encourage a particular action”. The other options are plausible dictionary senses of the word that do not fit this context.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media",
      "texto_apoio": "A false story spread rapidly because its headline confirmed what many readers already believed. Corrections reached fewer people, so the platform tested prompts that asked users to open articles before sharing them."
    }
  ],
  "matematica-rlm": [
    {
      "id": "xtr-mat-0061",
      "enunciado": "Em uma progressão aritmética, o primeiro termo é 3 e a razão é 2. Qual é o 8º termo?",
      "alternativas": {
        "a": "17",
        "b": "15",
        "c": "19",
        "d": "6",
        "e": "16"
      },
      "resposta": "a",
      "explicacao": "PA: aₙ = a₁ + (n−1)r = 3 + 7 × 2 = 17.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0062",
      "enunciado": "Em uma progressão geométrica, o primeiro termo é 3 e a razão é 3. Qual é o 5º termo?",
      "alternativas": {
        "a": "729",
        "b": "243",
        "c": "15",
        "d": "36",
        "e": "81"
      },
      "resposta": "b",
      "explicacao": "PG: aₙ = a₁·r^(n−1) = 3 × 3^4 = 243.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0063",
      "enunciado": "Em uma progressão aritmética, o primeiro termo é 5 e a razão é 4. Qual é o 10º termo?",
      "alternativas": {
        "a": "45",
        "b": "37",
        "c": "41",
        "d": "20",
        "e": "40"
      },
      "resposta": "c",
      "explicacao": "PA: aₙ = a₁ + (n−1)r = 5 + 9 × 4 = 41.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0064",
      "enunciado": "Em uma progressão geométrica, o primeiro termo é 2 e a razão é 3. Qual é o 7º termo?",
      "alternativas": {
        "a": "729",
        "b": "20",
        "c": "4.374",
        "d": "1.458",
        "e": "36"
      },
      "resposta": "d",
      "explicacao": "PG: aₙ = a₁·r^(n−1) = 2 × 3^6 = 1.458.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0065",
      "enunciado": "Em uma progressão aritmética, o primeiro termo é 7 e a razão é 6. Qual é o 12º termo?",
      "alternativas": {
        "a": "67",
        "b": "72",
        "c": "79",
        "d": "42",
        "e": "73"
      },
      "resposta": "e",
      "explicacao": "PA: aₙ = a₁ + (n−1)r = 7 + 11 × 6 = 73.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0066",
      "enunciado": "Em uma progressão geométrica, o primeiro termo é 4 e a razão é 3. Qual é o 5º termo?",
      "alternativas": {
        "a": "324",
        "b": "81",
        "c": "16",
        "d": "972",
        "e": "48"
      },
      "resposta": "a",
      "explicacao": "PG: aₙ = a₁·r^(n−1) = 4 × 3^4 = 324.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0067",
      "enunciado": "Em uma progressão aritmética, o primeiro termo é 9 e a razão é 2. Qual é o 14º termo?",
      "alternativas": {
        "a": "18",
        "b": "35",
        "c": "28",
        "d": "33",
        "e": "37"
      },
      "resposta": "b",
      "explicacao": "PA: aₙ = a₁ + (n−1)r = 9 + 13 × 2 = 35.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0068",
      "enunciado": "Em uma progressão geométrica, o primeiro termo é 3 e a razão é 3. Qual é o 7º termo?",
      "alternativas": {
        "a": "54",
        "b": "729",
        "c": "2.187",
        "d": "6.561",
        "e": "21"
      },
      "resposta": "c",
      "explicacao": "PG: aₙ = a₁·r^(n−1) = 3 × 3^6 = 2.187.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0069",
      "enunciado": "Em uma progressão aritmética, o primeiro termo é 11 e a razão é 4. Qual é o 8º termo?",
      "alternativas": {
        "a": "32",
        "b": "43",
        "c": "35",
        "d": "39",
        "e": "44"
      },
      "resposta": "d",
      "explicacao": "PA: aₙ = a₁ + (n−1)r = 11 + 7 × 4 = 39.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0070",
      "enunciado": "Em uma progressão geométrica, o primeiro termo é 2 e a razão é 3. Qual é o 5º termo?",
      "alternativas": {
        "a": "486",
        "b": "24",
        "c": "14",
        "d": "81",
        "e": "162"
      },
      "resposta": "e",
      "explicacao": "PG: aₙ = a₁·r^(n−1) = 2 × 3^4 = 162.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0071",
      "enunciado": "Em uma progressão aritmética, o primeiro termo é 13 e a razão é 6. Qual é o 10º termo?",
      "alternativas": {
        "a": "67",
        "b": "78",
        "c": "73",
        "d": "61",
        "e": "60"
      },
      "resposta": "a",
      "explicacao": "PA: aₙ = a₁ + (n−1)r = 13 + 9 × 6 = 67.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0072",
      "enunciado": "Em uma progressão geométrica, o primeiro termo é 4 e a razão é 3. Qual é o 7º termo?",
      "alternativas": {
        "a": "22",
        "b": "2.916",
        "c": "729",
        "d": "72",
        "e": "8.748"
      },
      "resposta": "b",
      "explicacao": "PG: aₙ = a₁·r^(n−1) = 4 × 3^6 = 2.916.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0073",
      "enunciado": "Em uma progressão aritmética, o primeiro termo é 15 e a razão é 2. Qual é o 12º termo?",
      "alternativas": {
        "a": "30",
        "b": "24",
        "c": "37",
        "d": "35",
        "e": "39"
      },
      "resposta": "c",
      "explicacao": "PA: aₙ = a₁ + (n−1)r = 15 + 11 × 2 = 37.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0074",
      "enunciado": "Em uma progressão aritmética, o primeiro termo é 17 e a razão é 4. Qual é o 14º termo?",
      "alternativas": {
        "a": "73",
        "b": "65",
        "c": "56",
        "d": "69",
        "e": "68"
      },
      "resposta": "d",
      "explicacao": "PA: aₙ = a₁ + (n−1)r = 17 + 13 × 4 = 69.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0075",
      "enunciado": "Em uma progressão aritmética, o primeiro termo é 19 e a razão é 6. Qual é o 8º termo?",
      "alternativas": {
        "a": "67",
        "b": "55",
        "c": "114",
        "d": "48",
        "e": "61"
      },
      "resposta": "e",
      "explicacao": "PA: aₙ = a₁ + (n−1)r = 19 + 7 × 6 = 61.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0076",
      "enunciado": "Em uma progressão aritmética, o primeiro termo é 21 e a razão é 2. Qual é o 10º termo?",
      "alternativas": {
        "a": "39",
        "b": "37",
        "c": "42",
        "d": "41",
        "e": "20"
      },
      "resposta": "a",
      "explicacao": "PA: aₙ = a₁ + (n−1)r = 21 + 9 × 2 = 39.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0117",
      "enunciado": "Considere os valores 4, 6, 7, 9, 14. Qual é a média aritmética?",
      "alternativas": {
        "a": "10",
        "b": "8",
        "c": "7",
        "d": "11",
        "e": "9"
      },
      "resposta": "b",
      "explicacao": "Média: (4 + 6 + 7 + 9 + 14) / 5 = 40 / 5 = 8.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0118",
      "enunciado": "Considere os valores 5, 7, 8, 10, 15. Qual é a mediana?",
      "alternativas": {
        "a": "7",
        "b": "10",
        "c": "8",
        "d": "9",
        "e": "11"
      },
      "resposta": "c",
      "explicacao": "Mediana: em ordem, 5, 7, 8, 10, 15; com 5 valores o termo central é 8. A média seria 9 — as duas não coincidem.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0119",
      "enunciado": "Considere os valores 6, 8, 9, 11, 16. Qual é a média aritmética?",
      "alternativas": {
        "a": "12,00",
        "b": "9,00",
        "c": "11,00",
        "d": "10,00",
        "e": "12,50"
      },
      "resposta": "d",
      "explicacao": "Média: (6 + 8 + 9 + 11 + 16) / 5 = 50 / 5 = 10.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0120",
      "enunciado": "Considere os valores 7, 9, 10, 12, 17. Qual é a mediana?",
      "alternativas": {
        "a": "12",
        "b": "13",
        "c": "9",
        "d": "11",
        "e": "10"
      },
      "resposta": "e",
      "explicacao": "Mediana: em ordem, 7, 9, 10, 12, 17; com 5 valores o termo central é 10. A média seria 11 — as duas não coincidem.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0121",
      "enunciado": "Considere os valores 8, 10, 11, 13, 18. Qual é a média aritmética?",
      "alternativas": {
        "a": "12",
        "b": "13",
        "c": "10",
        "d": "11",
        "e": "15"
      },
      "resposta": "a",
      "explicacao": "Média: (8 + 10 + 11 + 13 + 18) / 5 = 60 / 5 = 12.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0122",
      "enunciado": "Considere os valores 9, 11, 12, 14, 19. Qual é a mediana?",
      "alternativas": {
        "a": "10",
        "b": "12",
        "c": "13",
        "d": "14",
        "e": "11"
      },
      "resposta": "b",
      "explicacao": "Mediana: em ordem, 9, 11, 12, 14, 19; com 5 valores o termo central é 12. A média seria 13 — as duas não coincidem.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0123",
      "enunciado": "Considere os valores 10, 12, 13, 15, 20. Qual é a média aritmética?",
      "alternativas": {
        "a": "15,00",
        "b": "13,00",
        "c": "14,00",
        "d": "17,50",
        "e": "10,00"
      },
      "resposta": "c",
      "explicacao": "Média: (10 + 12 + 13 + 15 + 20) / 5 = 70 / 5 = 14.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0124",
      "enunciado": "Considere os valores 11, 13, 14, 16, 21. Qual é a mediana?",
      "alternativas": {
        "a": "10",
        "b": "13",
        "c": "15",
        "d": "14",
        "e": "16"
      },
      "resposta": "d",
      "explicacao": "Mediana: em ordem, 11, 13, 14, 16, 21; com 5 valores o termo central é 14. A média seria 15 — as duas não coincidem.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0125",
      "enunciado": "Considere os valores 12, 14, 15, 17, 22. Qual é a média aritmética?",
      "alternativas": {
        "a": "20",
        "b": "15",
        "c": "10",
        "d": "17",
        "e": "16"
      },
      "resposta": "e",
      "explicacao": "Média: (12 + 14 + 15 + 17 + 22) / 5 = 80 / 5 = 16.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0126",
      "enunciado": "Considere os valores 13, 15, 16, 18, 23. Qual é a mediana?",
      "alternativas": {
        "a": "16",
        "b": "10",
        "c": "18",
        "d": "15",
        "e": "17"
      },
      "resposta": "a",
      "explicacao": "Mediana: em ordem, 13, 15, 16, 18, 23; com 5 valores o termo central é 16. A média seria 17 — as duas não coincidem.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0127",
      "enunciado": "Considere os valores 14, 16, 17, 19, 24. Qual é a média aritmética?",
      "alternativas": {
        "a": "19,00",
        "b": "18,00",
        "c": "22,50",
        "d": "17,00",
        "e": "10,00"
      },
      "resposta": "b",
      "explicacao": "Média: (14 + 16 + 17 + 19 + 24) / 5 = 90 / 5 = 18.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0128",
      "enunciado": "Considere os valores 15, 17, 18, 20, 25. Qual é a mediana?",
      "alternativas": {
        "a": "20",
        "b": "17",
        "c": "18",
        "d": "10",
        "e": "19"
      },
      "resposta": "c",
      "explicacao": "Mediana: em ordem, 15, 17, 18, 20, 25; com 5 valores o termo central é 18. A média seria 19 — as duas não coincidem.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0129",
      "enunciado": "Considere os valores 16, 18, 19, 21, 26. Qual é a média aritmética?",
      "alternativas": {
        "a": "25",
        "b": "21",
        "c": "19",
        "d": "20",
        "e": "10"
      },
      "resposta": "d",
      "explicacao": "Média: (16 + 18 + 19 + 21 + 26) / 5 = 100 / 5 = 20.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0130",
      "enunciado": "Considere os valores 17, 19, 20, 22, 27. Qual é a mediana?",
      "alternativas": {
        "a": "10",
        "b": "21",
        "c": "22",
        "d": "19",
        "e": "20"
      },
      "resposta": "e",
      "explicacao": "Mediana: em ordem, 17, 19, 20, 22, 27; com 5 valores o termo central é 20. A média seria 21 — as duas não coincidem.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0131",
      "enunciado": "Considere os valores 18, 20, 21, 23, 28. Qual é a média aritmética?",
      "alternativas": {
        "a": "22,00",
        "b": "23,00",
        "c": "21,00",
        "d": "10,00",
        "e": "27,50"
      },
      "resposta": "a",
      "explicacao": "Média: (18 + 20 + 21 + 23 + 28) / 5 = 110 / 5 = 22.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0132",
      "enunciado": "Considere os valores 19, 21, 22, 24, 29. Qual é a mediana?",
      "alternativas": {
        "a": "10",
        "b": "22",
        "c": "24",
        "d": "23",
        "e": "21"
      },
      "resposta": "b",
      "explicacao": "Mediana: em ordem, 19, 21, 22, 24, 29; com 5 valores o termo central é 22. A média seria 23 — as duas não coincidem.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0133",
      "enunciado": "Considere os valores 20, 22, 23, 25, 30. Qual é a média aritmética?",
      "alternativas": {
        "a": "25",
        "b": "23",
        "c": "24",
        "d": "30",
        "e": "10"
      },
      "resposta": "c",
      "explicacao": "Média: (20 + 22 + 23 + 25 + 30) / 5 = 120 / 5 = 24.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0134",
      "enunciado": "Considere os valores 21, 23, 24, 26, 31. Qual é a mediana?",
      "alternativas": {
        "a": "26",
        "b": "23",
        "c": "25",
        "d": "24",
        "e": "10"
      },
      "resposta": "d",
      "explicacao": "Mediana: em ordem, 21, 23, 24, 26, 31; com 5 valores o termo central é 24. A média seria 25 — as duas não coincidem.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0135",
      "enunciado": "Considere os valores 22, 24, 25, 27, 32. Qual é a média aritmética?",
      "alternativas": {
        "a": "32,50",
        "b": "27,00",
        "c": "25,00",
        "d": "10,00",
        "e": "26,00"
      },
      "resposta": "e",
      "explicacao": "Média: (22 + 24 + 25 + 27 + 32) / 5 = 130 / 5 = 26.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0136",
      "enunciado": "Considere os valores 23, 25, 26, 28, 33. Qual é a mediana?",
      "alternativas": {
        "a": "26",
        "b": "25",
        "c": "27",
        "d": "28",
        "e": "10"
      },
      "resposta": "a",
      "explicacao": "Mediana: em ordem, 23, 25, 26, 28, 33; com 5 valores o termo central é 26. A média seria 27 — as duas não coincidem.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0137",
      "enunciado": "Um terreno triangular tem base de 8 m e altura de 5 m. Qual é sua área?",
      "alternativas": {
        "a": "40 unidade(s)^2",
        "b": "20 unidade(s)^2",
        "c": "26 unidade(s)^2",
        "d": "13 unidade(s)^2",
        "e": "13,33 unidade(s)^2"
      },
      "resposta": "b",
      "explicacao": "Área do triângulo: A = b·h/2 = 8 × 5 / 2 = 20 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0138",
      "enunciado": "Uma praça quadrada tem lado de 7 m. Qual é sua área?",
      "alternativas": {
        "a": "14 unidade(s)^2",
        "b": "343 unidade(s)^2",
        "c": "49 unidade(s)^2",
        "d": "56 unidade(s)^2",
        "e": "28 unidade(s)^2"
      },
      "resposta": "c",
      "explicacao": "Área do quadrado: A = l² = 7² = 49 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0139",
      "enunciado": "Um trapézio possui bases de 12 cm e 8 cm e altura de 6 cm. Qual é sua área?",
      "alternativas": {
        "a": "96 unidade(s)^2",
        "b": "32 unidade(s)^2",
        "c": "120 unidade(s)^2",
        "d": "60 unidade(s)^2",
        "e": "12 unidade(s)^2"
      },
      "resposta": "d",
      "explicacao": "Área do trapézio: A = (B+b)·h/2 = (12+8) × 6 / 2 = 60 cm².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0140",
      "enunciado": "Uma região circular tem raio de 6 m. Usando π = 3,14, qual é aproximadamente sua área?",
      "alternativas": {
        "a": "226,19 unidade(s)^2",
        "b": "37,70 unidade(s)^2",
        "c": "36 unidade(s)^2",
        "d": "18,85 unidade(s)^2",
        "e": "113,10 unidade(s)^2"
      },
      "resposta": "e",
      "explicacao": "Área do círculo: A = πr² = 3,14 × 6² = 113,04 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0141",
      "enunciado": "Um terreno triangular tem base de 12 m e altura de 9 m. Qual é sua área?",
      "alternativas": {
        "a": "54 unidade(s)^2",
        "b": "108 unidade(s)^2",
        "c": "42 unidade(s)^2",
        "d": "21 unidade(s)^2",
        "e": "36 unidade(s)^2"
      },
      "resposta": "a",
      "explicacao": "Área do triângulo: A = b·h/2 = 12 × 9 / 2 = 54 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0142",
      "enunciado": "Uma praça quadrada tem lado de 11 m. Qual é sua área?",
      "alternativas": {
        "a": "1.331 unidade(s)^2",
        "b": "121 unidade(s)^2",
        "c": "22 unidade(s)^2",
        "d": "132 unidade(s)^2",
        "e": "44 unidade(s)^2"
      },
      "resposta": "b",
      "explicacao": "Área do quadrado: A = l² = 11² = 121 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0143",
      "enunciado": "Um trapézio possui bases de 16 cm e 12 cm e altura de 5 cm. Qual é sua área?",
      "alternativas": {
        "a": "192 unidade(s)^2",
        "b": "140 unidade(s)^2",
        "c": "70 unidade(s)^2",
        "d": "10 unidade(s)^2",
        "e": "38 unidade(s)^2"
      },
      "resposta": "c",
      "explicacao": "Área do trapézio: A = (B+b)·h/2 = (16+12) × 5 / 2 = 70 cm².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0144",
      "enunciado": "Uma região circular tem raio de 5 m. Usando π = 3,14, qual é aproximadamente sua área?",
      "alternativas": {
        "a": "31,42 unidade(s)^2",
        "b": "157,08 unidade(s)^2",
        "c": "15,71 unidade(s)^2",
        "d": "78,54 unidade(s)^2",
        "e": "25 unidade(s)^2"
      },
      "resposta": "d",
      "explicacao": "Área do círculo: A = πr² = 3,14 × 5² = 78,50 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0145",
      "enunciado": "Um terreno triangular tem base de 16 m e altura de 7 m. Qual é sua área?",
      "alternativas": {
        "a": "112 unidade(s)^2",
        "b": "37,33 unidade(s)^2",
        "c": "46 unidade(s)^2",
        "d": "23 unidade(s)^2",
        "e": "56 unidade(s)^2"
      },
      "resposta": "e",
      "explicacao": "Área do triângulo: A = b·h/2 = 16 × 7 / 2 = 56 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0146",
      "enunciado": "Uma praça quadrada tem lado de 15 m. Qual é sua área?",
      "alternativas": {
        "a": "225 unidade(s)^2",
        "b": "60 unidade(s)^2",
        "c": "240 unidade(s)^2",
        "d": "30 unidade(s)^2",
        "e": "3.375 unidade(s)^2"
      },
      "resposta": "a",
      "explicacao": "Área do quadrado: A = l² = 15² = 225 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0147",
      "enunciado": "Um trapézio possui bases de 20 cm e 16 cm e altura de 4 cm. Qual é sua área?",
      "alternativas": {
        "a": "44 unidade(s)^2",
        "b": "72 unidade(s)^2",
        "c": "144 unidade(s)^2",
        "d": "8 unidade(s)^2",
        "e": "320 unidade(s)^2"
      },
      "resposta": "b",
      "explicacao": "Área do trapézio: A = (B+b)·h/2 = (20+16) × 4 / 2 = 72 cm².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0148",
      "enunciado": "Uma região circular tem raio de 4 m. Usando π = 3,14, qual é aproximadamente sua área?",
      "alternativas": {
        "a": "16 unidade(s)^2",
        "b": "12,57 unidade(s)^2",
        "c": "50,27 unidade(s)^2",
        "d": "25,13 unidade(s)^2",
        "e": "100,53 unidade(s)^2"
      },
      "resposta": "c",
      "explicacao": "Área do círculo: A = πr² = 3,14 × 4² = 50,24 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0149",
      "enunciado": "Um terreno triangular tem base de 20 m e altura de 5 m. Qual é sua área?",
      "alternativas": {
        "a": "33,33 unidade(s)^2",
        "b": "100 unidade(s)^2",
        "c": "55 unidade(s)^2",
        "d": "50 unidade(s)^2",
        "e": "25 unidade(s)^2"
      },
      "resposta": "d",
      "explicacao": "Área do triângulo: A = b·h/2 = 20 × 5 / 2 = 50 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0150",
      "enunciado": "Uma praça quadrada tem lado de 19 m. Qual é sua área?",
      "alternativas": {
        "a": "76 unidade(s)^2",
        "b": "38 unidade(s)^2",
        "c": "6.859 unidade(s)^2",
        "d": "380 unidade(s)^2",
        "e": "361 unidade(s)^2"
      },
      "resposta": "e",
      "explicacao": "Área do quadrado: A = l² = 19² = 361 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0151",
      "enunciado": "Um trapézio possui bases de 24 cm e 20 cm e altura de 8 cm. Qual é sua área?",
      "alternativas": {
        "a": "176 unidade(s)^2",
        "b": "352 unidade(s)^2",
        "c": "60 unidade(s)^2",
        "d": "16 unidade(s)^2",
        "e": "480 unidade(s)^2"
      },
      "resposta": "a",
      "explicacao": "Área do trapézio: A = (B+b)·h/2 = (24+20) × 8 / 2 = 176 cm².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0152",
      "enunciado": "Uma região circular tem raio de 3 m. Usando π = 3,14, qual é aproximadamente sua área?",
      "alternativas": {
        "a": "9 unidade(s)^2",
        "b": "28,27 unidade(s)^2",
        "c": "18,85 unidade(s)^2",
        "d": "56,55 unidade(s)^2",
        "e": "9,42 unidade(s)^2"
      },
      "resposta": "b",
      "explicacao": "Área do círculo: A = πr² = 3,14 × 3² = 28,26 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0153",
      "enunciado": "Um terreno triangular tem base de 24 m e altura de 9 m. Qual é sua área?",
      "alternativas": {
        "a": "72 unidade(s)^2",
        "b": "216 unidade(s)^2",
        "c": "108 unidade(s)^2",
        "d": "66 unidade(s)^2",
        "e": "33 unidade(s)^2"
      },
      "resposta": "c",
      "explicacao": "Área do triângulo: A = b·h/2 = 24 × 9 / 2 = 108 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0154",
      "enunciado": "Uma praça quadrada tem lado de 23 m. Qual é sua área?",
      "alternativas": {
        "a": "46 unidade(s)^2",
        "b": "552 unidade(s)^2",
        "c": "12.167 unidade(s)^2",
        "d": "529 unidade(s)^2",
        "e": "92 unidade(s)^2"
      },
      "resposta": "d",
      "explicacao": "Área do quadrado: A = l² = 23² = 529 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0155",
      "enunciado": "Um trapézio possui bases de 28 cm e 24 cm e altura de 7 cm. Qual é sua área?",
      "alternativas": {
        "a": "364 unidade(s)^2",
        "b": "672 unidade(s)^2",
        "c": "14 unidade(s)^2",
        "d": "66 unidade(s)^2",
        "e": "182 unidade(s)^2"
      },
      "resposta": "e",
      "explicacao": "Área do trapézio: A = (B+b)·h/2 = (28+24) × 7 / 2 = 182 cm².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0156",
      "enunciado": "Uma região circular tem raio de 7 m. Usando π = 3,14, qual é aproximadamente sua área?",
      "alternativas": {
        "a": "153,94 unidade(s)^2",
        "b": "43,98 unidade(s)^2",
        "c": "307,88 unidade(s)^2",
        "d": "21,99 unidade(s)^2",
        "e": "49 unidade(s)^2"
      },
      "resposta": "a",
      "explicacao": "Área do círculo: A = πr² = 3,14 × 7² = 153,86 m².",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0157",
      "enunciado": "Uma caixa retangular mede 3 cm por 4 cm por 5 cm. Qual é o volume da caixa?",
      "alternativas": {
        "a": "12 cm^3",
        "b": "60 cm^3",
        "c": "66 cm^3",
        "d": "94 cm^3",
        "e": "20 cm^3"
      },
      "resposta": "b",
      "explicacao": "Volume do paralelepípedo: V = a·b·c = 3 × 4 × 5 = 60 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0158",
      "enunciado": "Um cilindro tem raio 3 cm e altura 6 cm. Adotando π = 3, qual é seu volume?",
      "alternativas": {
        "a": "54 cm^3",
        "b": "324 cm^3",
        "c": "162 cm^3",
        "d": "108 cm^3",
        "e": "27 cm^3"
      },
      "resposta": "c",
      "explicacao": "Volume do cilindro: V = πr²h = 3 × 3² × 6 = 162 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0159",
      "enunciado": "Uma caixa retangular mede 5 cm por 6 cm por 7 cm. Qual é o volume da caixa?",
      "alternativas": {
        "a": "70 cm^3",
        "b": "18 cm^3",
        "c": "30 cm^3",
        "d": "210 cm^3",
        "e": "214 cm^3"
      },
      "resposta": "d",
      "explicacao": "Volume do paralelepípedo: V = a·b·c = 5 × 6 × 7 = 210 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0160",
      "enunciado": "Um cilindro tem raio 5 cm e altura 8 cm. Adotando π = 3, qual é seu volume?",
      "alternativas": {
        "a": "75 cm^3",
        "b": "240 cm^3",
        "c": "120 cm^3",
        "d": "1.200 cm^3",
        "e": "600 cm^3"
      },
      "resposta": "e",
      "explicacao": "Volume do cilindro: V = πr²h = 3 × 5² × 8 = 600 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0161",
      "enunciado": "Uma caixa retangular mede 7 cm por 8 cm por 9 cm. Qual é o volume da caixa?",
      "alternativas": {
        "a": "504 cm^3",
        "b": "382 cm^3",
        "c": "56 cm^3",
        "d": "168 cm^3",
        "e": "24 cm^3"
      },
      "resposta": "a",
      "explicacao": "Volume do paralelepípedo: V = a·b·c = 7 × 8 × 9 = 504 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0162",
      "enunciado": "Um cilindro tem raio 3 cm e altura 10 cm. Adotando π = 3, qual é seu volume?",
      "alternativas": {
        "a": "27 cm^3",
        "b": "270 cm^3",
        "c": "90 cm^3",
        "d": "180 cm^3",
        "e": "540 cm^3"
      },
      "resposta": "b",
      "explicacao": "Volume do cilindro: V = πr²h = 3 × 3² × 10 = 270 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0163",
      "enunciado": "Uma caixa retangular mede 4 cm por 4 cm por 11 cm. Qual é o volume da caixa?",
      "alternativas": {
        "a": "19 cm^3",
        "b": "16 cm^3",
        "c": "176 cm^3",
        "d": "58,67 cm^3",
        "e": "208 cm^3"
      },
      "resposta": "c",
      "explicacao": "Volume do paralelepípedo: V = a·b·c = 4 × 4 × 11 = 176 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0164",
      "enunciado": "Um cilindro tem raio 5 cm e altura 6 cm. Adotando π = 3, qual é seu volume?",
      "alternativas": {
        "a": "75 cm^3",
        "b": "90 cm^3",
        "c": "180 cm^3",
        "d": "450 cm^3",
        "e": "900 cm^3"
      },
      "resposta": "d",
      "explicacao": "Volume do cilindro: V = πr²h = 3 × 5² × 6 = 450 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0165",
      "enunciado": "Uma caixa retangular mede 6 cm por 6 cm por 6 cm. Qual é o volume da caixa?",
      "alternativas": {
        "a": "18 cm^3",
        "b": "237,60 cm^3",
        "c": "72 cm^3",
        "d": "36 cm^3",
        "e": "216 cm^3"
      },
      "resposta": "e",
      "explicacao": "Volume do paralelepípedo: V = a·b·c = 6 × 6 × 6 = 216 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0166",
      "enunciado": "Um cilindro tem raio 3 cm e altura 8 cm. Adotando π = 3, qual é seu volume?",
      "alternativas": {
        "a": "216 cm^3",
        "b": "144 cm^3",
        "c": "432 cm^3",
        "d": "27 cm^3",
        "e": "72 cm^3"
      },
      "resposta": "a",
      "explicacao": "Volume do cilindro: V = πr²h = 3 × 3² × 8 = 216 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0167",
      "enunciado": "Uma caixa retangular mede 3 cm por 8 cm por 8 cm. Qual é o volume da caixa?",
      "alternativas": {
        "a": "19 cm^3",
        "b": "192 cm^3",
        "c": "224 cm^3",
        "d": "64 cm^3",
        "e": "24 cm^3"
      },
      "resposta": "b",
      "explicacao": "Volume do paralelepípedo: V = a·b·c = 3 × 8 × 8 = 192 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0168",
      "enunciado": "Um cilindro tem raio 5 cm e altura 10 cm. Adotando π = 3, qual é seu volume?",
      "alternativas": {
        "a": "150 cm^3",
        "b": "75 cm^3",
        "c": "750 cm^3",
        "d": "1.500 cm^3",
        "e": "300 cm^3"
      },
      "resposta": "c",
      "explicacao": "Volume do cilindro: V = πr²h = 3 × 5² × 10 = 750 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0169",
      "enunciado": "Uma caixa retangular mede 5 cm por 4 cm por 10 cm. Qual é o volume da caixa?",
      "alternativas": {
        "a": "66,67 cm^3",
        "b": "220 cm^3",
        "c": "19 cm^3",
        "d": "200 cm^3",
        "e": "20 cm^3"
      },
      "resposta": "d",
      "explicacao": "Volume do paralelepípedo: V = a·b·c = 5 × 4 × 10 = 200 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0170",
      "enunciado": "Uma caixa retangular mede 7 cm por 6 cm por 5 cm. Qual é o volume da caixa?",
      "alternativas": {
        "a": "214 cm^3",
        "b": "70 cm^3",
        "c": "42 cm^3",
        "d": "18 cm^3",
        "e": "210 cm^3"
      },
      "resposta": "e",
      "explicacao": "Volume do paralelepípedo: V = a·b·c = 7 × 6 × 5 = 210 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0171",
      "enunciado": "Uma caixa retangular mede 4 cm por 8 cm por 7 cm. Qual é o volume da caixa?",
      "alternativas": {
        "a": "224 cm^3",
        "b": "232 cm^3",
        "c": "32 cm^3",
        "d": "19 cm^3",
        "e": "74,67 cm^3"
      },
      "resposta": "a",
      "explicacao": "Volume do paralelepípedo: V = a·b·c = 4 × 8 × 7 = 224 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0172",
      "enunciado": "Uma caixa retangular mede 6 cm por 4 cm por 9 cm. Qual é o volume da caixa?",
      "alternativas": {
        "a": "24 cm^3",
        "b": "216 cm^3",
        "c": "228 cm^3",
        "d": "19 cm^3",
        "e": "72 cm^3"
      },
      "resposta": "b",
      "explicacao": "Volume do paralelepípedo: V = a·b·c = 6 × 4 × 9 = 216 cm³.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0174",
      "enunciado": "Dada a função f(x) = x^2 - 2x, qual é o valor de f(3)?",
      "alternativas": {
        "a": "4",
        "b": "15",
        "c": "1",
        "d": "3",
        "e": "5"
      },
      "resposta": "d",
      "explicacao": "Substituindo x por 3: f(3) = 3² − 2×3 = 9 − 6 = 3. O erro comum é somar em vez de subtrair o segundo termo, o que daria 15.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0176",
      "enunciado": "Dada a função f(x) = x^2 - 4x, qual é o valor de f(5)?",
      "alternativas": {
        "a": "5",
        "b": "1",
        "c": "7",
        "d": "45",
        "e": "6"
      },
      "resposta": "a",
      "explicacao": "Substituindo x por 5: f(5) = 5² − 4×5 = 25 − 20 = 5. O erro comum é somar em vez de subtrair o segundo termo, o que daria 45.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0178",
      "enunciado": "Dada a função f(x) = x^2 - 2x, qual é o valor de f(2)?",
      "alternativas": {
        "a": "3",
        "b": "1",
        "c": "0",
        "d": "8",
        "e": "2"
      },
      "resposta": "c",
      "explicacao": "Substituindo x por 2: f(2) = 2² − 2×2 = 4 − 4 = 0. O erro comum é somar em vez de subtrair o segundo termo, o que daria 8.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0180",
      "enunciado": "Dada a função f(x) = x^2 - 4x, qual é o valor de f(4)?",
      "alternativas": {
        "a": "2",
        "b": "1",
        "c": "32",
        "d": "4",
        "e": "0"
      },
      "resposta": "e",
      "explicacao": "Substituindo x por 4: f(4) = 4² − 4×4 = 16 − 16 = 0. O erro comum é somar em vez de subtrair o segundo termo, o que daria 32.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0182",
      "enunciado": "Dada a função f(x) = x^2 - 2x, qual é o valor de f(6)?",
      "alternativas": {
        "a": "10",
        "b": "24",
        "c": "48",
        "d": "4",
        "e": "16"
      },
      "resposta": "b",
      "explicacao": "Substituindo x por 6: f(6) = 6² − 2×6 = 36 − 12 = 24. O erro comum é somar em vez de subtrair o segundo termo, o que daria 48.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0184",
      "enunciado": "Dada a função f(x) = x^2 - 4x, qual é o valor de f(3)?",
      "alternativas": {
        "a": "21",
        "b": "1",
        "c": "-1",
        "d": "-3",
        "e": "2"
      },
      "resposta": "d",
      "explicacao": "Substituindo x por 3: f(3) = 3² − 4×3 = 9 − 12 = -3. O erro comum é somar em vez de subtrair o segundo termo, o que daria 21.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0186",
      "enunciado": "Dada a função f(x) = x^2 - 2x, qual é o valor de f(5)?",
      "alternativas": {
        "a": "15",
        "b": "8",
        "c": "35",
        "d": "3",
        "e": "9"
      },
      "resposta": "a",
      "explicacao": "Substituindo x por 5: f(5) = 5² − 2×5 = 25 − 10 = 15. O erro comum é somar em vez de subtrair o segundo termo, o que daria 35.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0188",
      "enunciado": "Dada a função f(x) = x^2 - 4x, qual é o valor de f(2)?",
      "alternativas": {
        "a": "4",
        "b": "12",
        "c": "-4",
        "d": "0",
        "e": "-2"
      },
      "resposta": "c",
      "explicacao": "Substituindo x por 2: f(2) = 2² − 4×2 = 4 − 8 = -4. O erro comum é somar em vez de subtrair o segundo termo, o que daria 12.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0190",
      "enunciado": "Dada a função f(x) = x^2 - 2x, qual é o valor de f(4)?",
      "alternativas": {
        "a": "4",
        "b": "2",
        "c": "6",
        "d": "24",
        "e": "8"
      },
      "resposta": "e",
      "explicacao": "Substituindo x por 4: f(4) = 4² − 2×4 = 16 − 8 = 8. O erro comum é somar em vez de subtrair o segundo termo, o que daria 24.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0192",
      "enunciado": "Dada a função f(x) = x^2 - 4x, qual é o valor de f(6)?",
      "alternativas": {
        "a": "2",
        "b": "12",
        "c": "60",
        "d": "8",
        "e": "4"
      },
      "resposta": "b",
      "explicacao": "Substituindo x por 6: f(6) = 6² − 4×6 = 36 − 24 = 12. O erro comum é somar em vez de subtrair o segundo termo, o que daria 60.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0194",
      "enunciado": "Qual é o valor de log na base 3 de 27?",
      "alternativas": {
        "a": "2",
        "b": "4",
        "c": "5",
        "d": "3",
        "e": "9"
      },
      "resposta": "d",
      "explicacao": "log_3(27) pergunta o expoente: 3^3 = 27, logo o valor é 3.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0196",
      "enunciado": "Qual é o valor de log na base 2 de 32?",
      "alternativas": {
        "a": "5",
        "b": "4",
        "c": "16",
        "d": "6",
        "e": "2"
      },
      "resposta": "a",
      "explicacao": "log_2(32) pergunta o expoente: 2^5 = 32, logo o valor é 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0198",
      "enunciado": "Qual é o valor de log na base 5 de 125?",
      "alternativas": {
        "a": "4",
        "b": "2",
        "c": "3",
        "d": "5",
        "e": "25"
      },
      "resposta": "c",
      "explicacao": "log_5(125) pergunta o expoente: 5^3 = 125, logo o valor é 3.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0200",
      "enunciado": "Qual é o valor de log na base 3 de 243?",
      "alternativas": {
        "a": "3",
        "b": "6",
        "c": "4",
        "d": "81",
        "e": "5"
      },
      "resposta": "e",
      "explicacao": "log_3(243) pergunta o expoente: 3^5 = 243, logo o valor é 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0202",
      "enunciado": "Qual é o valor de log na base 2 de 8?",
      "alternativas": {
        "a": "2",
        "b": "3",
        "c": "4",
        "d": "6",
        "e": "5"
      },
      "resposta": "b",
      "explicacao": "log_2(8) pergunta o expoente: 2^3 = 8, logo o valor é 3.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0204",
      "enunciado": "Qual é o valor de log na base 5 de 3125?",
      "alternativas": {
        "a": "7",
        "b": "625",
        "c": "6",
        "d": "5",
        "e": "4"
      },
      "resposta": "d",
      "explicacao": "log_5(3.125) pergunta o expoente: 5^5 = 3.125, logo o valor é 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0209",
      "enunciado": "Em um sistema, x + y = 5 e x - y = 1. Qual é o valor de x?",
      "alternativas": {
        "a": "2",
        "b": "1",
        "c": "4",
        "d": "3",
        "e": "5"
      },
      "resposta": "d",
      "explicacao": "Somando as duas equações, 2x = 5 + 1 = 6, logo x = 3 (e y = 2).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0210",
      "enunciado": "Em um sistema, x + y = 7 e x - y = 1. Qual é o valor de x?",
      "alternativas": {
        "a": "1",
        "b": "3",
        "c": "6",
        "d": "7",
        "e": "4"
      },
      "resposta": "e",
      "explicacao": "Somando as duas equações, 2x = 7 + 1 = 8, logo x = 4 (e y = 3).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0211",
      "enunciado": "Em um sistema, x + y = 9 e x - y = 1. Qual é o valor de x?",
      "alternativas": {
        "a": "5",
        "b": "4",
        "c": "1",
        "d": "8",
        "e": "9"
      },
      "resposta": "a",
      "explicacao": "Somando as duas equações, 2x = 9 + 1 = 10, logo x = 5 (e y = 4).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0212",
      "enunciado": "Em um sistema, x + y = 11 e x - y = 1. Qual é o valor de x?",
      "alternativas": {
        "a": "1",
        "b": "6",
        "c": "11",
        "d": "5",
        "e": "10"
      },
      "resposta": "b",
      "explicacao": "Somando as duas equações, 2x = 11 + 1 = 12, logo x = 6 (e y = 5).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0213",
      "enunciado": "Em um sistema, x + y = 13 e x - y = 1. Qual é o valor de x?",
      "alternativas": {
        "a": "12",
        "b": "13",
        "c": "7",
        "d": "6",
        "e": "1"
      },
      "resposta": "c",
      "explicacao": "Somando as duas equações, 2x = 13 + 1 = 14, logo x = 7 (e y = 6).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0214",
      "enunciado": "Em um sistema, x + y = 15 e x - y = 1. Qual é o valor de x?",
      "alternativas": {
        "a": "1",
        "b": "15",
        "c": "14",
        "d": "8",
        "e": "7"
      },
      "resposta": "d",
      "explicacao": "Somando as duas equações, 2x = 15 + 1 = 16, logo x = 8 (e y = 7).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0215",
      "enunciado": "Em um sistema, x + y = 17 e x - y = 1. Qual é o valor de x?",
      "alternativas": {
        "a": "8",
        "b": "1",
        "c": "16",
        "d": "17",
        "e": "9"
      },
      "resposta": "e",
      "explicacao": "Somando as duas equações, 2x = 17 + 1 = 18, logo x = 9 (e y = 8).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0216",
      "enunciado": "Em um sistema, x + y = 12 e x - y = 8. Qual é o valor de x?",
      "alternativas": {
        "a": "10",
        "b": "8",
        "c": "2",
        "d": "4",
        "e": "12"
      },
      "resposta": "a",
      "explicacao": "Somando as duas equações, 2x = 12 + 8 = 20, logo x = 10 (e y = 2).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0217",
      "enunciado": "Em um sistema, x + y = 14 e x - y = 8. Qual é o valor de x?",
      "alternativas": {
        "a": "14",
        "b": "11",
        "c": "6",
        "d": "3",
        "e": "8"
      },
      "resposta": "b",
      "explicacao": "Somando as duas equações, 2x = 14 + 8 = 22, logo x = 11 (e y = 3).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0218",
      "enunciado": "Em um sistema, x + y = 16 e x - y = 8. Qual é o valor de x?",
      "alternativas": {
        "a": "13,20",
        "b": "8,00",
        "c": "12,00",
        "d": "4,00",
        "e": "16,00"
      },
      "resposta": "c",
      "explicacao": "Somando as duas equações, 2x = 16 + 8 = 24, logo x = 12 (e y = 4).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0219",
      "enunciado": "Em um sistema, x + y = 18 e x - y = 8. Qual é o valor de x?",
      "alternativas": {
        "a": "8",
        "b": "5",
        "c": "10",
        "d": "13",
        "e": "18"
      },
      "resposta": "d",
      "explicacao": "Somando as duas equações, 2x = 18 + 8 = 26, logo x = 13 (e y = 5).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0220",
      "enunciado": "Em um sistema, x + y = 20 e x - y = 8. Qual é o valor de x?",
      "alternativas": {
        "a": "20",
        "b": "8",
        "c": "6",
        "d": "12",
        "e": "14"
      },
      "resposta": "e",
      "explicacao": "Somando as duas equações, 2x = 20 + 8 = 28, logo x = 14 (e y = 6).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0221",
      "enunciado": "Em um sistema, x + y = 22 e x - y = 8. Qual é o valor de x?",
      "alternativas": {
        "a": "15",
        "b": "14",
        "c": "8",
        "d": "7",
        "e": "22"
      },
      "resposta": "a",
      "explicacao": "Somando as duas equações, 2x = 22 + 8 = 30, logo x = 15 (e y = 7).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0222",
      "enunciado": "Em um sistema, x + y = 24 e x - y = 8. Qual é o valor de x?",
      "alternativas": {
        "a": "8,00",
        "b": "16,00",
        "c": "17,60",
        "d": "19,20",
        "e": "24,00"
      },
      "resposta": "b",
      "explicacao": "Somando as duas equações, 2x = 24 + 8 = 32, logo x = 16 (e y = 8).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0223",
      "enunciado": "Em um sistema, x + y = 19 e x - y = 15. Qual é o valor de x?",
      "alternativas": {
        "a": "19",
        "b": "4",
        "c": "17",
        "d": "2",
        "e": "15"
      },
      "resposta": "c",
      "explicacao": "Somando as duas equações, 2x = 19 + 15 = 34, logo x = 17 (e y = 2).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0224",
      "enunciado": "Em um sistema, x + y = 21 e x - y = 15. Qual é o valor de x?",
      "alternativas": {
        "a": "3",
        "b": "6",
        "c": "21",
        "d": "18",
        "e": "15"
      },
      "resposta": "d",
      "explicacao": "Somando as duas equações, 2x = 21 + 15 = 36, logo x = 18 (e y = 3).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0225",
      "enunciado": "Em um sistema, x + y = 23 e x - y = 15. Qual é o valor de x?",
      "alternativas": {
        "a": "8",
        "b": "15",
        "c": "23",
        "d": "4",
        "e": "19"
      },
      "resposta": "e",
      "explicacao": "Somando as duas equações, 2x = 23 + 15 = 38, logo x = 19 (e y = 4).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0226",
      "enunciado": "Em um sistema, x + y = 25 e x - y = 15. Qual é o valor de x?",
      "alternativas": {
        "a": "20",
        "b": "10",
        "c": "25",
        "d": "5",
        "e": "15"
      },
      "resposta": "a",
      "explicacao": "Somando as duas equações, 2x = 25 + 15 = 40, logo x = 20 (e y = 5).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0227",
      "enunciado": "Em um sistema, x + y = 27 e x - y = 15. Qual é o valor de x?",
      "alternativas": {
        "a": "27",
        "b": "21",
        "c": "12",
        "d": "6",
        "e": "15"
      },
      "resposta": "b",
      "explicacao": "Somando as duas equações, 2x = 27 + 15 = 42, logo x = 21 (e y = 6).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0228",
      "enunciado": "Em um sistema, x + y = 29 e x - y = 15. Qual é o valor de x?",
      "alternativas": {
        "a": "15",
        "b": "14",
        "c": "22",
        "d": "29",
        "e": "7"
      },
      "resposta": "c",
      "explicacao": "Somando as duas equações, 2x = 29 + 15 = 44, logo x = 22 (e y = 7).",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0229",
      "enunciado": "No plano cartesiano, qual é a distância entre os pontos (0, 1) e (3, 5)?",
      "alternativas": {
        "a": "4",
        "b": "7",
        "c": "25",
        "d": "5",
        "e": "3"
      },
      "resposta": "d",
      "explicacao": "d = √((x₂−x₁)² + (y₂−y₁)²) = √(3² + 4²) = √25 = 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0230",
      "enunciado": "Em um triângulo retângulo, a hipotenusa mede 12 cm e o seno de um ângulo agudo é 0,5. Quanto mede o cateto oposto a esse ângulo?",
      "alternativas": {
        "a": "12",
        "b": "7",
        "c": "24",
        "d": "3",
        "e": "6"
      },
      "resposta": "e",
      "explicacao": "O seno é cateto oposto sobre hipotenusa: sen θ = co/h, então co = 12 × 0,5 = 6 cm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0231",
      "enunciado": "No plano cartesiano, qual é a distância entre os pontos (2, 3) e (5, 7)?",
      "alternativas": {
        "a": "5",
        "b": "7",
        "c": "4",
        "d": "25",
        "e": "3"
      },
      "resposta": "a",
      "explicacao": "d = √((x₂−x₁)² + (y₂−y₁)²) = √(3² + 4²) = √25 = 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0232",
      "enunciado": "Em um triângulo retângulo, a hipotenusa mede 16 cm e o seno de um ângulo agudo é 0,5. Quanto mede o cateto oposto a esse ângulo?",
      "alternativas": {
        "a": "9",
        "b": "8",
        "c": "4",
        "d": "16",
        "e": "32"
      },
      "resposta": "b",
      "explicacao": "O seno é cateto oposto sobre hipotenusa: sen θ = co/h, então co = 16 × 0,5 = 8 cm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-mat-0233",
      "enunciado": "No plano cartesiano, qual é a distância entre os pontos (4, 1) e (7, 5)?",
      "alternativas": {
        "a": "7",
        "b": "3",
        "c": "5",
        "d": "25",
        "e": "4"
      },
      "resposta": "c",
      "explicacao": "d = √((x₂−x₁)² + (y₂−y₁)²) = √(3² + 4²) = √25 = 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0234",
      "enunciado": "No plano cartesiano, qual é a distância entre os pontos (1, 3) e (4, 7)?",
      "alternativas": {
        "a": "7",
        "b": "4",
        "c": "25",
        "d": "5",
        "e": "3"
      },
      "resposta": "d",
      "explicacao": "d = √((x₂−x₁)² + (y₂−y₁)²) = √(3² + 4²) = √25 = 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0235",
      "enunciado": "No plano cartesiano, qual é a distância entre os pontos (3, 1) e (6, 5)?",
      "alternativas": {
        "a": "3",
        "b": "25",
        "c": "4",
        "d": "7",
        "e": "5"
      },
      "resposta": "e",
      "explicacao": "d = √((x₂−x₁)² + (y₂−y₁)²) = √(3² + 4²) = √25 = 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0236",
      "enunciado": "No plano cartesiano, qual é a distância entre os pontos (0, 3) e (3, 7)?",
      "alternativas": {
        "a": "5",
        "b": "3",
        "c": "7",
        "d": "4",
        "e": "25"
      },
      "resposta": "a",
      "explicacao": "d = √((x₂−x₁)² + (y₂−y₁)²) = √(3² + 4²) = √25 = 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0237",
      "enunciado": "No plano cartesiano, qual é a distância entre os pontos (2, 1) e (5, 5)?",
      "alternativas": {
        "a": "4",
        "b": "5",
        "c": "7",
        "d": "3",
        "e": "25"
      },
      "resposta": "b",
      "explicacao": "d = √((x₂−x₁)² + (y₂−y₁)²) = √(3² + 4²) = √25 = 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0238",
      "enunciado": "No plano cartesiano, qual é a distância entre os pontos (4, 3) e (7, 7)?",
      "alternativas": {
        "a": "25",
        "b": "7",
        "c": "5",
        "d": "3",
        "e": "4"
      },
      "resposta": "c",
      "explicacao": "d = √((x₂−x₁)² + (y₂−y₁)²) = √(3² + 4²) = √25 = 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0239",
      "enunciado": "No plano cartesiano, qual é a distância entre os pontos (1, 1) e (4, 5)?",
      "alternativas": {
        "a": "3",
        "b": "25",
        "c": "4",
        "d": "5",
        "e": "7"
      },
      "resposta": "d",
      "explicacao": "d = √((x₂−x₁)² + (y₂−y₁)²) = √(3² + 4²) = √25 = 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-mat-0240",
      "enunciado": "No plano cartesiano, qual é a distância entre os pontos (3, 3) e (6, 7)?",
      "alternativas": {
        "a": "3",
        "b": "7",
        "c": "4",
        "d": "25",
        "e": "5"
      },
      "resposta": "e",
      "explicacao": "d = √((x₂−x₁)² + (y₂−y₁)²) = √(3² + 4²) = √25 = 5.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    }
  ],
  "ciencias-natureza": [
    {
      "id": "xtr-bio-0001",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: conjunto formado por comunidades de seres vivos e fatores abióticos em interação?",
      "alternativas": {
        "a": "Ecossistema",
        "b": "Cadeia alimentar",
        "c": "Ciclos biogeoquímicos",
        "d": "Dinâmica populacional",
        "e": "Sucessão ecológica"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Ecossistema: conjunto formado por comunidades de seres vivos e fatores abióticos em interação. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0002",
      "enunciado": "Qual condição ajuda a caracterizar Ecossistema?",
      "alternativas": {
        "a": "processos biológicos, geológicos e químicos reciclam matéria",
        "b": "trocas de matéria e fluxo de energia conectam componentes",
        "c": "colonização, competição e modificação do ambiente pelas próprias espécies",
        "d": "produtores incorporam energia e consumidores obtêm matéria ao se alimentar",
        "e": "natalidade, mortalidade, imigração, emigração e capacidade de suporte"
      },
      "resposta": "b",
      "explicacao": "Ecossistema: trocas de matéria e fluxo de energia conectam componentes. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0003",
      "enunciado": "Qual consequência ou função se associa corretamente a Ecossistema?",
      "alternativas": {
        "a": "permite analisar fluxo energético e efeitos de alterações populacionais",
        "b": "pode aumentar complexidade e alterar produtividade e biodiversidade",
        "c": "unidade de análise de relações ecológicas e mudanças ambientais",
        "d": "mantêm disponibilidade de nutrientes e podem ser alterados por atividades humanas",
        "e": "ajuda a compreender crescimento, declínio e manejo de espécies"
      },
      "resposta": "c",
      "explicacao": "Ecossistema: unidade de análise de relações ecológicas e mudanças ambientais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0004",
      "enunciado": "Qual definição corresponde corretamente a Ecossistema?",
      "alternativas": {
        "a": "circulação de elementos químicos entre organismos, atmosfera, água e solo",
        "b": "sequência de transferência de matéria e energia entre níveis tróficos",
        "c": "mudança gradual da composição das comunidades após formação ou perturbação de um ambiente",
        "d": "conjunto formado por comunidades de seres vivos e fatores abióticos em interação",
        "e": "variação do tamanho e da estrutura de uma população ao longo do tempo"
      },
      "resposta": "d",
      "explicacao": "Ecossistema é conjunto formado por comunidades de seres vivos e fatores abióticos em interação. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0005",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: sequência de transferência de matéria e energia entre níveis tróficos?",
      "alternativas": {
        "a": "Sucessão ecológica",
        "b": "Dinâmica populacional",
        "c": "Ciclos biogeoquímicos",
        "d": "Célula procariótica",
        "e": "Cadeia alimentar"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Cadeia alimentar: sequência de transferência de matéria e energia entre níveis tróficos. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0006",
      "enunciado": "Qual condição ajuda a caracterizar Cadeia alimentar?",
      "alternativas": {
        "a": "produtores incorporam energia e consumidores obtêm matéria ao se alimentar",
        "b": "processos biológicos, geológicos e químicos reciclam matéria",
        "c": "colonização, competição e modificação do ambiente pelas próprias espécies",
        "d": "natalidade, mortalidade, imigração, emigração e capacidade de suporte",
        "e": "material genético ocupa região do citoplasma chamada nucleoide"
      },
      "resposta": "a",
      "explicacao": "Cadeia alimentar: produtores incorporam energia e consumidores obtêm matéria ao se alimentar. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0007",
      "enunciado": "Qual consequência ou função se associa corretamente a Cadeia alimentar?",
      "alternativas": {
        "a": "estrutura básica de organismos muito diversos metabolicamente",
        "b": "permite analisar fluxo energético e efeitos de alterações populacionais",
        "c": "ajuda a compreender crescimento, declínio e manejo de espécies",
        "d": "pode aumentar complexidade e alterar produtividade e biodiversidade",
        "e": "mantêm disponibilidade de nutrientes e podem ser alterados por atividades humanas"
      },
      "resposta": "b",
      "explicacao": "Cadeia alimentar: permite analisar fluxo energético e efeitos de alterações populacionais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0008",
      "enunciado": "Qual definição corresponde corretamente a Cadeia alimentar?",
      "alternativas": {
        "a": "variação do tamanho e da estrutura de uma população ao longo do tempo",
        "b": "célula sem núcleo delimitado por membrana e sem organelas membranosas complexas",
        "c": "sequência de transferência de matéria e energia entre níveis tróficos",
        "d": "circulação de elementos químicos entre organismos, atmosfera, água e solo",
        "e": "mudança gradual da composição das comunidades após formação ou perturbação de um ambiente"
      },
      "resposta": "c",
      "explicacao": "Cadeia alimentar é sequência de transferência de matéria e energia entre níveis tróficos. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0009",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: circulação de elementos químicos entre organismos, atmosfera, água e solo?",
      "alternativas": {
        "a": "Célula procariótica",
        "b": "Sucessão ecológica",
        "c": "Dinâmica populacional",
        "d": "Ciclos biogeoquímicos",
        "e": "Célula eucariótica"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Ciclos biogeoquímicos: circulação de elementos químicos entre organismos, atmosfera, água e solo. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0010",
      "enunciado": "Qual condição ajuda a caracterizar Ciclos biogeoquímicos?",
      "alternativas": {
        "a": "natalidade, mortalidade, imigração, emigração e capacidade de suporte",
        "b": "colonização, competição e modificação do ambiente pelas próprias espécies",
        "c": "endomembranas organizam processos celulares",
        "d": "material genético ocupa região do citoplasma chamada nucleoide",
        "e": "processos biológicos, geológicos e químicos reciclam matéria"
      },
      "resposta": "e",
      "explicacao": "Ciclos biogeoquímicos: processos biológicos, geológicos e químicos reciclam matéria. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0011",
      "enunciado": "Qual consequência ou função se associa corretamente a Ciclos biogeoquímicos?",
      "alternativas": {
        "a": "mantêm disponibilidade de nutrientes e podem ser alterados por atividades humanas",
        "b": "pode aumentar complexidade e alterar produtividade e biodiversidade",
        "c": "permite especialização intracelular e grande diversidade de formas",
        "d": "estrutura básica de organismos muito diversos metabolicamente",
        "e": "ajuda a compreender crescimento, declínio e manejo de espécies"
      },
      "resposta": "a",
      "explicacao": "Ciclos biogeoquímicos: mantêm disponibilidade de nutrientes e podem ser alterados por atividades humanas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0012",
      "enunciado": "Qual definição corresponde corretamente a Ciclos biogeoquímicos?",
      "alternativas": {
        "a": "célula com núcleo delimitado e compartimentos membranosos especializados",
        "b": "circulação de elementos químicos entre organismos, atmosfera, água e solo",
        "c": "célula sem núcleo delimitado por membrana e sem organelas membranosas complexas",
        "d": "mudança gradual da composição das comunidades após formação ou perturbação de um ambiente",
        "e": "variação do tamanho e da estrutura de uma população ao longo do tempo"
      },
      "resposta": "b",
      "explicacao": "Ciclos biogeoquímicos é circulação de elementos químicos entre organismos, atmosfera, água e solo. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0013",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: variação do tamanho e da estrutura de uma população ao longo do tempo?",
      "alternativas": {
        "a": "Célula eucariótica",
        "b": "Membrana plasmática",
        "c": "Dinâmica populacional",
        "d": "Sucessão ecológica",
        "e": "Célula procariótica"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Dinâmica populacional: variação do tamanho e da estrutura de uma população ao longo do tempo. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0014",
      "enunciado": "Qual condição ajuda a caracterizar Dinâmica populacional?",
      "alternativas": {
        "a": "endomembranas organizam processos celulares",
        "b": "permeabilidade seletiva depende de propriedades moleculares e transportadores",
        "c": "colonização, competição e modificação do ambiente pelas próprias espécies",
        "d": "natalidade, mortalidade, imigração, emigração e capacidade de suporte",
        "e": "material genético ocupa região do citoplasma chamada nucleoide"
      },
      "resposta": "d",
      "explicacao": "Dinâmica populacional: natalidade, mortalidade, imigração, emigração e capacidade de suporte. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0015",
      "enunciado": "Qual consequência ou função se associa corretamente a Dinâmica populacional?",
      "alternativas": {
        "a": "estrutura básica de organismos muito diversos metabolicamente",
        "b": "mantém homeostase e permite reconhecimento e sinalização",
        "c": "permite especialização intracelular e grande diversidade de formas",
        "d": "pode aumentar complexidade e alterar produtividade e biodiversidade",
        "e": "ajuda a compreender crescimento, declínio e manejo de espécies"
      },
      "resposta": "e",
      "explicacao": "Dinâmica populacional: ajuda a compreender crescimento, declínio e manejo de espécies. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0016",
      "enunciado": "Qual definição corresponde corretamente a Dinâmica populacional?",
      "alternativas": {
        "a": "variação do tamanho e da estrutura de uma população ao longo do tempo",
        "b": "mudança gradual da composição das comunidades após formação ou perturbação de um ambiente",
        "c": "célula sem núcleo delimitado por membrana e sem organelas membranosas complexas",
        "d": "célula com núcleo delimitado e compartimentos membranosos especializados",
        "e": "bicamada lipídica com proteínas que controla trocas e comunicação celular"
      },
      "resposta": "a",
      "explicacao": "Dinâmica populacional é variação do tamanho e da estrutura de uma população ao longo do tempo. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0017",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: mudança gradual da composição das comunidades após formação ou perturbação de um ambiente?",
      "alternativas": {
        "a": "Membrana plasmática",
        "b": "Sucessão ecológica",
        "c": "Célula procariótica",
        "d": "Célula eucariótica",
        "e": "Mitocôndria"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Sucessão ecológica: mudança gradual da composição das comunidades após formação ou perturbação de um ambiente. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0018",
      "enunciado": "Qual condição ajuda a caracterizar Sucessão ecológica?",
      "alternativas": {
        "a": "gradiente de prótons na membrana interna dirige fosforilação oxidativa",
        "b": "endomembranas organizam processos celulares",
        "c": "colonização, competição e modificação do ambiente pelas próprias espécies",
        "d": "material genético ocupa região do citoplasma chamada nucleoide",
        "e": "permeabilidade seletiva depende de propriedades moleculares e transportadores"
      },
      "resposta": "c",
      "explicacao": "Sucessão ecológica: colonização, competição e modificação do ambiente pelas próprias espécies. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0019",
      "enunciado": "Qual consequência ou função se associa corretamente a Sucessão ecológica?",
      "alternativas": {
        "a": "estrutura básica de organismos muito diversos metabolicamente",
        "b": "mantém homeostase e permite reconhecimento e sinalização",
        "c": "permite especialização intracelular e grande diversidade de formas",
        "d": "pode aumentar complexidade e alterar produtividade e biodiversidade",
        "e": "fornece energia química para grande parte das atividades celulares"
      },
      "resposta": "d",
      "explicacao": "Sucessão ecológica: pode aumentar complexidade e alterar produtividade e biodiversidade. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0020",
      "enunciado": "Qual definição corresponde corretamente a Sucessão ecológica?",
      "alternativas": {
        "a": "organela associada à respiração celular aeróbia e síntese de ATP",
        "b": "célula com núcleo delimitado e compartimentos membranosos especializados",
        "c": "célula sem núcleo delimitado por membrana e sem organelas membranosas complexas",
        "d": "bicamada lipídica com proteínas que controla trocas e comunicação celular",
        "e": "mudança gradual da composição das comunidades após formação ou perturbação de um ambiente"
      },
      "resposta": "e",
      "explicacao": "Sucessão ecológica é mudança gradual da composição das comunidades após formação ou perturbação de um ambiente. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0021",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: célula sem núcleo delimitado por membrana e sem organelas membranosas complexas?",
      "alternativas": {
        "a": "Célula procariótica",
        "b": "Mitocôndria",
        "c": "Célula eucariótica",
        "d": "Fotossíntese",
        "e": "Membrana plasmática"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Célula procariótica: célula sem núcleo delimitado por membrana e sem organelas membranosas complexas. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0022",
      "enunciado": "Qual condição ajuda a caracterizar Célula procariótica?",
      "alternativas": {
        "a": "permeabilidade seletiva depende de propriedades moleculares e transportadores",
        "b": "material genético ocupa região do citoplasma chamada nucleoide",
        "c": "gradiente de prótons na membrana interna dirige fosforilação oxidativa",
        "d": "endomembranas organizam processos celulares",
        "e": "pigmentos captam luz e reações enzimáticas produzem carboidratos"
      },
      "resposta": "b",
      "explicacao": "Célula procariótica: material genético ocupa região do citoplasma chamada nucleoide. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0023",
      "enunciado": "Qual consequência ou função se associa corretamente a Célula procariótica?",
      "alternativas": {
        "a": "sustenta cadeias alimentares e influencia ciclos de carbono e oxigênio",
        "b": "permite especialização intracelular e grande diversidade de formas",
        "c": "estrutura básica de organismos muito diversos metabolicamente",
        "d": "fornece energia química para grande parte das atividades celulares",
        "e": "mantém homeostase e permite reconhecimento e sinalização"
      },
      "resposta": "c",
      "explicacao": "Célula procariótica: estrutura básica de organismos muito diversos metabolicamente. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0024",
      "enunciado": "Qual definição corresponde corretamente a Célula procariótica?",
      "alternativas": {
        "a": "bicamada lipídica com proteínas que controla trocas e comunicação celular",
        "b": "célula com núcleo delimitado e compartimentos membranosos especializados",
        "c": "processo que converte energia luminosa em energia química e fixa carbono",
        "d": "célula sem núcleo delimitado por membrana e sem organelas membranosas complexas",
        "e": "organela associada à respiração celular aeróbia e síntese de ATP"
      },
      "resposta": "d",
      "explicacao": "Célula procariótica é célula sem núcleo delimitado por membrana e sem organelas membranosas complexas. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0025",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: célula com núcleo delimitado e compartimentos membranosos especializados?",
      "alternativas": {
        "a": "Mitose",
        "b": "Mitocôndria",
        "c": "Fotossíntese",
        "d": "Membrana plasmática",
        "e": "Célula eucariótica"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Célula eucariótica: célula com núcleo delimitado e compartimentos membranosos especializados. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0026",
      "enunciado": "Qual condição ajuda a caracterizar Célula eucariótica?",
      "alternativas": {
        "a": "endomembranas organizam processos celulares",
        "b": "permeabilidade seletiva depende de propriedades moleculares e transportadores",
        "c": "duplicação prévia do DNA seguida de separação de cromátides",
        "d": "gradiente de prótons na membrana interna dirige fosforilação oxidativa",
        "e": "pigmentos captam luz e reações enzimáticas produzem carboidratos"
      },
      "resposta": "a",
      "explicacao": "Célula eucariótica: endomembranas organizam processos celulares. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0027",
      "enunciado": "Qual consequência ou função se associa corretamente a Célula eucariótica?",
      "alternativas": {
        "a": "fornece energia química para grande parte das atividades celulares",
        "b": "permite especialização intracelular e grande diversidade de formas",
        "c": "mantém homeostase e permite reconhecimento e sinalização",
        "d": "sustenta cadeias alimentares e influencia ciclos de carbono e oxigênio",
        "e": "mantém número cromossômico nas células-filhas"
      },
      "resposta": "b",
      "explicacao": "Célula eucariótica: permite especialização intracelular e grande diversidade de formas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0028",
      "enunciado": "Qual definição corresponde corretamente a Célula eucariótica?",
      "alternativas": {
        "a": "divisão celular que produz, em regra, duas células geneticamente semelhantes",
        "b": "processo que converte energia luminosa em energia química e fixa carbono",
        "c": "célula com núcleo delimitado e compartimentos membranosos especializados",
        "d": "bicamada lipídica com proteínas que controla trocas e comunicação celular",
        "e": "organela associada à respiração celular aeróbia e síntese de ATP"
      },
      "resposta": "c",
      "explicacao": "Célula eucariótica é célula com núcleo delimitado e compartimentos membranosos especializados. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0029",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: bicamada lipídica com proteínas que controla trocas e comunicação celular?",
      "alternativas": {
        "a": "Fotossíntese",
        "b": "Mitose",
        "c": "Meiose",
        "d": "Membrana plasmática",
        "e": "Mitocôndria"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Membrana plasmática: bicamada lipídica com proteínas que controla trocas e comunicação celular. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0030",
      "enunciado": "Qual condição ajuda a caracterizar Membrana plasmática?",
      "alternativas": {
        "a": "pigmentos captam luz e reações enzimáticas produzem carboidratos",
        "b": "duplicação prévia do DNA seguida de separação de cromátides",
        "c": "duas divisões seguem uma duplicação do DNA e incluem recombinação",
        "d": "gradiente de prótons na membrana interna dirige fosforilação oxidativa",
        "e": "permeabilidade seletiva depende de propriedades moleculares e transportadores"
      },
      "resposta": "e",
      "explicacao": "Membrana plasmática: permeabilidade seletiva depende de propriedades moleculares e transportadores. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0031",
      "enunciado": "Qual consequência ou função se associa corretamente a Membrana plasmática?",
      "alternativas": {
        "a": "mantém homeostase e permite reconhecimento e sinalização",
        "b": "fornece energia química para grande parte das atividades celulares",
        "c": "mantém número cromossômico nas células-filhas",
        "d": "sustenta cadeias alimentares e influencia ciclos de carbono e oxigênio",
        "e": "contribui para reprodução sexuada e diversidade genética"
      },
      "resposta": "a",
      "explicacao": "Membrana plasmática: mantém homeostase e permite reconhecimento e sinalização. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0032",
      "enunciado": "Qual definição corresponde corretamente a Membrana plasmática?",
      "alternativas": {
        "a": "divisão celular que reduz pela metade o número de cromossomos e gera variabilidade",
        "b": "bicamada lipídica com proteínas que controla trocas e comunicação celular",
        "c": "organela associada à respiração celular aeróbia e síntese de ATP",
        "d": "processo que converte energia luminosa em energia química e fixa carbono",
        "e": "divisão celular que produz, em regra, duas células geneticamente semelhantes"
      },
      "resposta": "b",
      "explicacao": "Membrana plasmática é bicamada lipídica com proteínas que controla trocas e comunicação celular. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0033",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: organela associada à respiração celular aeróbia e síntese de ATP?",
      "alternativas": {
        "a": "Fotossíntese",
        "b": "Meiose",
        "c": "Mitocôndria",
        "d": "DNA",
        "e": "Mitose"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Mitocôndria: organela associada à respiração celular aeróbia e síntese de ATP. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0034",
      "enunciado": "Qual condição ajuda a caracterizar Mitocôndria?",
      "alternativas": {
        "a": "duas divisões seguem uma duplicação do DNA e incluem recombinação",
        "b": "pigmentos captam luz e reações enzimáticas produzem carboidratos",
        "c": "sequência de bases pode ser copiada e transcrita",
        "d": "gradiente de prótons na membrana interna dirige fosforilação oxidativa",
        "e": "duplicação prévia do DNA seguida de separação de cromátides"
      },
      "resposta": "d",
      "explicacao": "Mitocôndria: gradiente de prótons na membrana interna dirige fosforilação oxidativa. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0035",
      "enunciado": "Qual consequência ou função se associa corretamente a Mitocôndria?",
      "alternativas": {
        "a": "mantém número cromossômico nas células-filhas",
        "b": "contribui para reprodução sexuada e diversidade genética",
        "c": "orienta síntese de RNAs e participa da hereditariedade",
        "d": "sustenta cadeias alimentares e influencia ciclos de carbono e oxigênio",
        "e": "fornece energia química para grande parte das atividades celulares"
      },
      "resposta": "e",
      "explicacao": "Mitocôndria: fornece energia química para grande parte das atividades celulares. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0036",
      "enunciado": "Qual definição corresponde corretamente a Mitocôndria?",
      "alternativas": {
        "a": "organela associada à respiração celular aeróbia e síntese de ATP",
        "b": "divisão celular que produz, em regra, duas células geneticamente semelhantes",
        "c": "polímero de nucleotídeos que armazena informação genética",
        "d": "processo que converte energia luminosa em energia química e fixa carbono",
        "e": "divisão celular que reduz pela metade o número de cromossomos e gera variabilidade"
      },
      "resposta": "a",
      "explicacao": "Mitocôndria é organela associada à respiração celular aeróbia e síntese de ATP. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0037",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: processo que converte energia luminosa em energia química e fixa carbono?",
      "alternativas": {
        "a": "Mitose",
        "b": "Fotossíntese",
        "c": "Meiose",
        "d": "Expressão gênica",
        "e": "DNA"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Fotossíntese: processo que converte energia luminosa em energia química e fixa carbono. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0038",
      "enunciado": "Qual condição ajuda a caracterizar Fotossíntese?",
      "alternativas": {
        "a": "duas divisões seguem uma duplicação do DNA e incluem recombinação",
        "b": "duplicação prévia do DNA seguida de separação de cromátides",
        "c": "pigmentos captam luz e reações enzimáticas produzem carboidratos",
        "d": "transcrição e, para proteínas, tradução convertem informação molecular",
        "e": "sequência de bases pode ser copiada e transcrita"
      },
      "resposta": "c",
      "explicacao": "Fotossíntese: pigmentos captam luz e reações enzimáticas produzem carboidratos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0039",
      "enunciado": "Qual consequência ou função se associa corretamente a Fotossíntese?",
      "alternativas": {
        "a": "mantém número cromossômico nas células-filhas",
        "b": "contribui para reprodução sexuada e diversidade genética",
        "c": "orienta síntese de RNAs e participa da hereditariedade",
        "d": "sustenta cadeias alimentares e influencia ciclos de carbono e oxigênio",
        "e": "permite diferenciação celular e resposta ao ambiente"
      },
      "resposta": "d",
      "explicacao": "Fotossíntese: sustenta cadeias alimentares e influencia ciclos de carbono e oxigênio. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0040",
      "enunciado": "Qual definição corresponde corretamente a Fotossíntese?",
      "alternativas": {
        "a": "uso da informação de um gene para produzir RNA ou proteína funcional",
        "b": "divisão celular que reduz pela metade o número de cromossomos e gera variabilidade",
        "c": "polímero de nucleotídeos que armazena informação genética",
        "d": "divisão celular que produz, em regra, duas células geneticamente semelhantes",
        "e": "processo que converte energia luminosa em energia química e fixa carbono"
      },
      "resposta": "e",
      "explicacao": "Fotossíntese é processo que converte energia luminosa em energia química e fixa carbono. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0041",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: divisão celular que produz, em regra, duas células geneticamente semelhantes?",
      "alternativas": {
        "a": "Mitose",
        "b": "Meiose",
        "c": "Expressão gênica",
        "d": "Primeira lei de Mendel",
        "e": "DNA"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Mitose: divisão celular que produz, em regra, duas células geneticamente semelhantes. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0042",
      "enunciado": "Qual condição ajuda a caracterizar Mitose?",
      "alternativas": {
        "a": "duas divisões seguem uma duplicação do DNA e incluem recombinação",
        "b": "duplicação prévia do DNA seguida de separação de cromátides",
        "c": "sequência de bases pode ser copiada e transcrita",
        "d": "transcrição e, para proteínas, tradução convertem informação molecular",
        "e": "separação dos cromossomos homólogos na meiose"
      },
      "resposta": "b",
      "explicacao": "Mitose: duplicação prévia do DNA seguida de separação de cromátides. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0043",
      "enunciado": "Qual consequência ou função se associa corretamente a Mitose?",
      "alternativas": {
        "a": "orienta síntese de RNAs e participa da hereditariedade",
        "b": "contribui para reprodução sexuada e diversidade genética",
        "c": "mantém número cromossômico nas células-filhas",
        "d": "permite diferenciação celular e resposta ao ambiente",
        "e": "explica proporções previsíveis quando as condições do modelo são atendidas"
      },
      "resposta": "c",
      "explicacao": "Mitose: mantém número cromossômico nas células-filhas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0044",
      "enunciado": "Qual definição corresponde corretamente a Mitose?",
      "alternativas": {
        "a": "divisão celular que reduz pela metade o número de cromossomos e gera variabilidade",
        "b": "polímero de nucleotídeos que armazena informação genética",
        "c": "segregação dos dois alelos de um gene durante a formação dos gametas",
        "d": "divisão celular que produz, em regra, duas células geneticamente semelhantes",
        "e": "uso da informação de um gene para produzir RNA ou proteína funcional"
      },
      "resposta": "d",
      "explicacao": "Mitose é divisão celular que produz, em regra, duas células geneticamente semelhantes. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0045",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: divisão celular que reduz pela metade o número de cromossomos e gera variabilidade?",
      "alternativas": {
        "a": "Sistema ABO",
        "b": "Expressão gênica",
        "c": "DNA",
        "d": "Primeira lei de Mendel",
        "e": "Meiose"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Meiose: divisão celular que reduz pela metade o número de cromossomos e gera variabilidade. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0046",
      "enunciado": "Qual condição ajuda a caracterizar Meiose?",
      "alternativas": {
        "a": "duas divisões seguem uma duplicação do DNA e incluem recombinação",
        "b": "sequência de bases pode ser copiada e transcrita",
        "c": "alelos múltiplos e codominância determinam fenótipos",
        "d": "transcrição e, para proteínas, tradução convertem informação molecular",
        "e": "separação dos cromossomos homólogos na meiose"
      },
      "resposta": "a",
      "explicacao": "Meiose: duas divisões seguem uma duplicação do DNA e incluem recombinação. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0047",
      "enunciado": "Qual consequência ou função se associa corretamente a Meiose?",
      "alternativas": {
        "a": "explica proporções previsíveis quando as condições do modelo são atendidas",
        "b": "contribui para reprodução sexuada e diversidade genética",
        "c": "orienta síntese de RNAs e participa da hereditariedade",
        "d": "compatibilidade reduz risco de reação imunológica em transfusões",
        "e": "permite diferenciação celular e resposta ao ambiente"
      },
      "resposta": "b",
      "explicacao": "Meiose: contribui para reprodução sexuada e diversidade genética. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0048",
      "enunciado": "Qual definição corresponde corretamente a Meiose?",
      "alternativas": {
        "a": "polímero de nucleotídeos que armazena informação genética",
        "b": "segregação dos dois alelos de um gene durante a formação dos gametas",
        "c": "divisão celular que reduz pela metade o número de cromossomos e gera variabilidade",
        "d": "uso da informação de um gene para produzir RNA ou proteína funcional",
        "e": "classificação sanguínea baseada em antígenos A e B e anticorpos plasmáticos"
      },
      "resposta": "c",
      "explicacao": "Meiose é divisão celular que reduz pela metade o número de cromossomos e gera variabilidade. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0049",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: polímero de nucleotídeos que armazena informação genética?",
      "alternativas": {
        "a": "Sistema ABO",
        "b": "Expressão gênica",
        "c": "Primeira lei de Mendel",
        "d": "DNA",
        "e": "Seleção natural"
      },
      "resposta": "d",
      "explicacao": "A definição descreve DNA: polímero de nucleotídeos que armazena informação genética. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0050",
      "enunciado": "Qual condição ajuda a caracterizar DNA?",
      "alternativas": {
        "a": "variação hereditária interage com condições ambientais",
        "b": "transcrição e, para proteínas, tradução convertem informação molecular",
        "c": "alelos múltiplos e codominância determinam fenótipos",
        "d": "separação dos cromossomos homólogos na meiose",
        "e": "sequência de bases pode ser copiada e transcrita"
      },
      "resposta": "e",
      "explicacao": "DNA: sequência de bases pode ser copiada e transcrita. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0051",
      "enunciado": "Qual consequência ou função se associa corretamente a DNA?",
      "alternativas": {
        "a": "orienta síntese de RNAs e participa da hereditariedade",
        "b": "explica proporções previsíveis quando as condições do modelo são atendidas",
        "c": "permite diferenciação celular e resposta ao ambiente",
        "d": "compatibilidade reduz risco de reação imunológica em transfusões",
        "e": "promove adaptação populacional sem finalidade prévia"
      },
      "resposta": "a",
      "explicacao": "DNA: orienta síntese de RNAs e participa da hereditariedade. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0052",
      "enunciado": "Qual definição corresponde corretamente a DNA?",
      "alternativas": {
        "a": "classificação sanguínea baseada em antígenos A e B e anticorpos plasmáticos",
        "b": "polímero de nucleotídeos que armazena informação genética",
        "c": "uso da informação de um gene para produzir RNA ou proteína funcional",
        "d": "diferenças hereditárias de sobrevivência e reprodução alteram frequências na população",
        "e": "segregação dos dois alelos de um gene durante a formação dos gametas"
      },
      "resposta": "b",
      "explicacao": "DNA é polímero de nucleotídeos que armazena informação genética. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0053",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: uso da informação de um gene para produzir RNA ou proteína funcional?",
      "alternativas": {
        "a": "Sistema ABO",
        "b": "Seleção natural",
        "c": "Expressão gênica",
        "d": "Primeira lei de Mendel",
        "e": "Especiação"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Expressão gênica: uso da informação de um gene para produzir RNA ou proteína funcional. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0054",
      "enunciado": "Qual condição ajuda a caracterizar Expressão gênica?",
      "alternativas": {
        "a": "alelos múltiplos e codominância determinam fenótipos",
        "b": "separação dos cromossomos homólogos na meiose",
        "c": "barreiras geográficas, ecológicas ou comportamentais reduzem fluxo gênico",
        "d": "transcrição e, para proteínas, tradução convertem informação molecular",
        "e": "variação hereditária interage com condições ambientais"
      },
      "resposta": "d",
      "explicacao": "Expressão gênica: transcrição e, para proteínas, tradução convertem informação molecular. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0055",
      "enunciado": "Qual consequência ou função se associa corretamente a Expressão gênica?",
      "alternativas": {
        "a": "explica proporções previsíveis quando as condições do modelo são atendidas",
        "b": "aumenta diversidade de linhagens ao longo do tempo",
        "c": "compatibilidade reduz risco de reação imunológica em transfusões",
        "d": "promove adaptação populacional sem finalidade prévia",
        "e": "permite diferenciação celular e resposta ao ambiente"
      },
      "resposta": "e",
      "explicacao": "Expressão gênica: permite diferenciação celular e resposta ao ambiente. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0056",
      "enunciado": "Qual definição corresponde corretamente a Expressão gênica?",
      "alternativas": {
        "a": "uso da informação de um gene para produzir RNA ou proteína funcional",
        "b": "processo de formação de novas espécies por divergência e isolamento reprodutivo",
        "c": "segregação dos dois alelos de um gene durante a formação dos gametas",
        "d": "diferenças hereditárias de sobrevivência e reprodução alteram frequências na população",
        "e": "classificação sanguínea baseada em antígenos A e B e anticorpos plasmáticos"
      },
      "resposta": "a",
      "explicacao": "Expressão gênica é uso da informação de um gene para produzir RNA ou proteína funcional. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0057",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: segregação dos dois alelos de um gene durante a formação dos gametas?",
      "alternativas": {
        "a": "Classificação biológica",
        "b": "Primeira lei de Mendel",
        "c": "Sistema ABO",
        "d": "Especiação",
        "e": "Seleção natural"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Primeira lei de Mendel: segregação dos dois alelos de um gene durante a formação dos gametas. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0058",
      "enunciado": "Qual condição ajuda a caracterizar Primeira lei de Mendel?",
      "alternativas": {
        "a": "alelos múltiplos e codominância determinam fenótipos",
        "b": "barreiras geográficas, ecológicas ou comportamentais reduzem fluxo gênico",
        "c": "separação dos cromossomos homólogos na meiose",
        "d": "variação hereditária interage com condições ambientais",
        "e": "comparações morfológicas e moleculares sustentam hipóteses filogenéticas"
      },
      "resposta": "c",
      "explicacao": "Primeira lei de Mendel: separação dos cromossomos homólogos na meiose. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0059",
      "enunciado": "Qual consequência ou função se associa corretamente a Primeira lei de Mendel?",
      "alternativas": {
        "a": "aumenta diversidade de linhagens ao longo do tempo",
        "b": "promove adaptação populacional sem finalidade prévia",
        "c": "facilita comunicação científica e estudo da biodiversidade",
        "d": "explica proporções previsíveis quando as condições do modelo são atendidas",
        "e": "compatibilidade reduz risco de reação imunológica em transfusões"
      },
      "resposta": "d",
      "explicacao": "Primeira lei de Mendel: explica proporções previsíveis quando as condições do modelo são atendidas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0060",
      "enunciado": "Qual definição corresponde corretamente a Primeira lei de Mendel?",
      "alternativas": {
        "a": "organização dos seres vivos segundo características e relações evolutivas",
        "b": "diferenças hereditárias de sobrevivência e reprodução alteram frequências na população",
        "c": "classificação sanguínea baseada em antígenos A e B e anticorpos plasmáticos",
        "d": "processo de formação de novas espécies por divergência e isolamento reprodutivo",
        "e": "segregação dos dois alelos de um gene durante a formação dos gametas"
      },
      "resposta": "e",
      "explicacao": "Primeira lei de Mendel é segregação dos dois alelos de um gene durante a formação dos gametas. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0061",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: classificação sanguínea baseada em antígenos A e B e anticorpos plasmáticos?",
      "alternativas": {
        "a": "Sistema ABO",
        "b": "Seleção natural",
        "c": "Especiação",
        "d": "Classificação biológica",
        "e": "Transpiração vegetal"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Sistema ABO: classificação sanguínea baseada em antígenos A e B e anticorpos plasmáticos. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0062",
      "enunciado": "Qual condição ajuda a caracterizar Sistema ABO?",
      "alternativas": {
        "a": "comparações morfológicas e moleculares sustentam hipóteses filogenéticas",
        "b": "alelos múltiplos e codominância determinam fenótipos",
        "c": "barreiras geográficas, ecológicas ou comportamentais reduzem fluxo gênico",
        "d": "gradiente de vapor e abertura estomática favorecem saída de água",
        "e": "variação hereditária interage com condições ambientais"
      },
      "resposta": "b",
      "explicacao": "Sistema ABO: alelos múltiplos e codominância determinam fenótipos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0063",
      "enunciado": "Qual consequência ou função se associa corretamente a Sistema ABO?",
      "alternativas": {
        "a": "facilita comunicação científica e estudo da biodiversidade",
        "b": "promove adaptação populacional sem finalidade prévia",
        "c": "compatibilidade reduz risco de reação imunológica em transfusões",
        "d": "aumenta diversidade de linhagens ao longo do tempo",
        "e": "contribui para transporte no xilema e regulação térmica"
      },
      "resposta": "c",
      "explicacao": "Sistema ABO: compatibilidade reduz risco de reação imunológica em transfusões. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0064",
      "enunciado": "Qual definição corresponde corretamente a Sistema ABO?",
      "alternativas": {
        "a": "organização dos seres vivos segundo características e relações evolutivas",
        "b": "processo de formação de novas espécies por divergência e isolamento reprodutivo",
        "c": "perda de água principalmente pelos estômatos das folhas",
        "d": "classificação sanguínea baseada em antígenos A e B e anticorpos plasmáticos",
        "e": "diferenças hereditárias de sobrevivência e reprodução alteram frequências na população"
      },
      "resposta": "d",
      "explicacao": "Sistema ABO é classificação sanguínea baseada em antígenos A e B e anticorpos plasmáticos. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0065",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: diferenças hereditárias de sobrevivência e reprodução alteram frequências na população?",
      "alternativas": {
        "a": "Classificação biológica",
        "b": "Especiação",
        "c": "Digestão humana",
        "d": "Transpiração vegetal",
        "e": "Seleção natural"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Seleção natural: diferenças hereditárias de sobrevivência e reprodução alteram frequências na população. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0066",
      "enunciado": "Qual condição ajuda a caracterizar Seleção natural?",
      "alternativas": {
        "a": "variação hereditária interage com condições ambientais",
        "b": "gradiente de vapor e abertura estomática favorecem saída de água",
        "c": "enzimas e secreções atuam em regiões especializadas",
        "d": "comparações morfológicas e moleculares sustentam hipóteses filogenéticas",
        "e": "barreiras geográficas, ecológicas ou comportamentais reduzem fluxo gênico"
      },
      "resposta": "a",
      "explicacao": "Seleção natural: variação hereditária interage com condições ambientais. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0067",
      "enunciado": "Qual consequência ou função se associa corretamente a Seleção natural?",
      "alternativas": {
        "a": "fornece nutrientes usados em metabolismo, crescimento e reparo",
        "b": "promove adaptação populacional sem finalidade prévia",
        "c": "aumenta diversidade de linhagens ao longo do tempo",
        "d": "contribui para transporte no xilema e regulação térmica",
        "e": "facilita comunicação científica e estudo da biodiversidade"
      },
      "resposta": "b",
      "explicacao": "Seleção natural: promove adaptação populacional sem finalidade prévia. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0068",
      "enunciado": "Qual definição corresponde corretamente a Seleção natural?",
      "alternativas": {
        "a": "organização dos seres vivos segundo características e relações evolutivas",
        "b": "transformação mecânica e química dos alimentos em moléculas absorvíveis",
        "c": "diferenças hereditárias de sobrevivência e reprodução alteram frequências na população",
        "d": "perda de água principalmente pelos estômatos das folhas",
        "e": "processo de formação de novas espécies por divergência e isolamento reprodutivo"
      },
      "resposta": "c",
      "explicacao": "Seleção natural é diferenças hereditárias de sobrevivência e reprodução alteram frequências na população. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0069",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: processo de formação de novas espécies por divergência e isolamento reprodutivo?",
      "alternativas": {
        "a": "Transpiração vegetal",
        "b": "Digestão humana",
        "c": "Classificação biológica",
        "d": "Especiação",
        "e": "Respiração humana"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Especiação: processo de formação de novas espécies por divergência e isolamento reprodutivo. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0070",
      "enunciado": "Qual condição ajuda a caracterizar Especiação?",
      "alternativas": {
        "a": "gradiente de vapor e abertura estomática favorecem saída de água",
        "b": "enzimas e secreções atuam em regiões especializadas",
        "c": "difusão ocorre por gradientes de pressão parcial nos alvéolos",
        "d": "comparações morfológicas e moleculares sustentam hipóteses filogenéticas",
        "e": "barreiras geográficas, ecológicas ou comportamentais reduzem fluxo gênico"
      },
      "resposta": "e",
      "explicacao": "Especiação: barreiras geográficas, ecológicas ou comportamentais reduzem fluxo gênico. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0071",
      "enunciado": "Qual consequência ou função se associa corretamente a Especiação?",
      "alternativas": {
        "a": "aumenta diversidade de linhagens ao longo do tempo",
        "b": "facilita comunicação científica e estudo da biodiversidade",
        "c": "contribui para transporte no xilema e regulação térmica",
        "d": "fornece nutrientes usados em metabolismo, crescimento e reparo",
        "e": "sustenta respiração celular e equilíbrio ácido-base"
      },
      "resposta": "a",
      "explicacao": "Especiação: aumenta diversidade de linhagens ao longo do tempo. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0072",
      "enunciado": "Qual definição corresponde corretamente a Especiação?",
      "alternativas": {
        "a": "perda de água principalmente pelos estômatos das folhas",
        "b": "processo de formação de novas espécies por divergência e isolamento reprodutivo",
        "c": "trocas gasosas e transporte de oxigênio e dióxido de carbono",
        "d": "organização dos seres vivos segundo características e relações evolutivas",
        "e": "transformação mecânica e química dos alimentos em moléculas absorvíveis"
      },
      "resposta": "b",
      "explicacao": "Especiação é processo de formação de novas espécies por divergência e isolamento reprodutivo. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0073",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: organização dos seres vivos segundo características e relações evolutivas?",
      "alternativas": {
        "a": "Circulação sanguínea",
        "b": "Transpiração vegetal",
        "c": "Classificação biológica",
        "d": "Respiração humana",
        "e": "Digestão humana"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Classificação biológica: organização dos seres vivos segundo características e relações evolutivas. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0074",
      "enunciado": "Qual condição ajuda a caracterizar Classificação biológica?",
      "alternativas": {
        "a": "difusão ocorre por gradientes de pressão parcial nos alvéolos",
        "b": "gradiente de vapor e abertura estomática favorecem saída de água",
        "c": "enzimas e secreções atuam em regiões especializadas",
        "d": "comparações morfológicas e moleculares sustentam hipóteses filogenéticas",
        "e": "contrações cardíacas e vasos mantêm fluxo e pressão"
      },
      "resposta": "d",
      "explicacao": "Classificação biológica: comparações morfológicas e moleculares sustentam hipóteses filogenéticas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0075",
      "enunciado": "Qual consequência ou função se associa corretamente a Classificação biológica?",
      "alternativas": {
        "a": "transporta gases, nutrientes, hormônios e resíduos",
        "b": "fornece nutrientes usados em metabolismo, crescimento e reparo",
        "c": "sustenta respiração celular e equilíbrio ácido-base",
        "d": "contribui para transporte no xilema e regulação térmica",
        "e": "facilita comunicação científica e estudo da biodiversidade"
      },
      "resposta": "e",
      "explicacao": "Classificação biológica: facilita comunicação científica e estudo da biodiversidade. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0076",
      "enunciado": "Qual definição corresponde corretamente a Classificação biológica?",
      "alternativas": {
        "a": "organização dos seres vivos segundo características e relações evolutivas",
        "b": "trocas gasosas e transporte de oxigênio e dióxido de carbono",
        "c": "perda de água principalmente pelos estômatos das folhas",
        "d": "transformação mecânica e química dos alimentos em moléculas absorvíveis",
        "e": "movimento do sangue impulsionado pelo coração em circuitos pulmonar e sistêmico"
      },
      "resposta": "a",
      "explicacao": "Classificação biológica é organização dos seres vivos segundo características e relações evolutivas. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0077",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: perda de água principalmente pelos estômatos das folhas?",
      "alternativas": {
        "a": "Circulação sanguínea",
        "b": "Transpiração vegetal",
        "c": "Digestão humana",
        "d": "Respiração humana",
        "e": "Imunidade adaptativa"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Transpiração vegetal: perda de água principalmente pelos estômatos das folhas. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0078",
      "enunciado": "Qual condição ajuda a caracterizar Transpiração vegetal?",
      "alternativas": {
        "a": "reconhecimento de antígenos ativa expansão clonal",
        "b": "contrações cardíacas e vasos mantêm fluxo e pressão",
        "c": "gradiente de vapor e abertura estomática favorecem saída de água",
        "d": "difusão ocorre por gradientes de pressão parcial nos alvéolos",
        "e": "enzimas e secreções atuam em regiões especializadas"
      },
      "resposta": "c",
      "explicacao": "Transpiração vegetal: gradiente de vapor e abertura estomática favorecem saída de água. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0079",
      "enunciado": "Qual consequência ou função se associa corretamente a Transpiração vegetal?",
      "alternativas": {
        "a": "produz resposta mais rápida e intensa em exposições posteriores",
        "b": "transporta gases, nutrientes, hormônios e resíduos",
        "c": "fornece nutrientes usados em metabolismo, crescimento e reparo",
        "d": "contribui para transporte no xilema e regulação térmica",
        "e": "sustenta respiração celular e equilíbrio ácido-base"
      },
      "resposta": "d",
      "explicacao": "Transpiração vegetal: contribui para transporte no xilema e regulação térmica. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0080",
      "enunciado": "Qual definição corresponde corretamente a Transpiração vegetal?",
      "alternativas": {
        "a": "transformação mecânica e química dos alimentos em moléculas absorvíveis",
        "b": "trocas gasosas e transporte de oxigênio e dióxido de carbono",
        "c": "resposta específica com linfócitos e memória imunológica",
        "d": "movimento do sangue impulsionado pelo coração em circuitos pulmonar e sistêmico",
        "e": "perda de água principalmente pelos estômatos das folhas"
      },
      "resposta": "e",
      "explicacao": "Transpiração vegetal é perda de água principalmente pelos estômatos das folhas. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0081",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: transformação mecânica e química dos alimentos em moléculas absorvíveis?",
      "alternativas": {
        "a": "Digestão humana",
        "b": "Circulação sanguínea",
        "c": "Imunidade adaptativa",
        "d": "Biotecnologia",
        "e": "Respiração humana"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Digestão humana: transformação mecânica e química dos alimentos em moléculas absorvíveis. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0082",
      "enunciado": "Qual condição ajuda a caracterizar Digestão humana?",
      "alternativas": {
        "a": "difusão ocorre por gradientes de pressão parcial nos alvéolos",
        "b": "enzimas e secreções atuam em regiões especializadas",
        "c": "contrações cardíacas e vasos mantêm fluxo e pressão",
        "d": "técnicas variam de fermentação a engenharia genética",
        "e": "reconhecimento de antígenos ativa expansão clonal"
      },
      "resposta": "b",
      "explicacao": "Digestão humana: enzimas e secreções atuam em regiões especializadas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0083",
      "enunciado": "Qual consequência ou função se associa corretamente a Digestão humana?",
      "alternativas": {
        "a": "permite medicamentos, diagnósticos, melhoramento e biorremediação",
        "b": "transporta gases, nutrientes, hormônios e resíduos",
        "c": "fornece nutrientes usados em metabolismo, crescimento e reparo",
        "d": "produz resposta mais rápida e intensa em exposições posteriores",
        "e": "sustenta respiração celular e equilíbrio ácido-base"
      },
      "resposta": "c",
      "explicacao": "Digestão humana: fornece nutrientes usados em metabolismo, crescimento e reparo. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0084",
      "enunciado": "Qual definição corresponde corretamente a Digestão humana?",
      "alternativas": {
        "a": "trocas gasosas e transporte de oxigênio e dióxido de carbono",
        "b": "uso de organismos, células ou moléculas biológicas para obter produtos e processos",
        "c": "movimento do sangue impulsionado pelo coração em circuitos pulmonar e sistêmico",
        "d": "transformação mecânica e química dos alimentos em moléculas absorvíveis",
        "e": "resposta específica com linfócitos e memória imunológica"
      },
      "resposta": "d",
      "explicacao": "Digestão humana é transformação mecânica e química dos alimentos em moléculas absorvíveis. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0085",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: trocas gasosas e transporte de oxigênio e dióxido de carbono?",
      "alternativas": {
        "a": "Circulação sanguínea",
        "b": "Epidemiologia",
        "c": "Biotecnologia",
        "d": "Imunidade adaptativa",
        "e": "Respiração humana"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Respiração humana: trocas gasosas e transporte de oxigênio e dióxido de carbono. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0086",
      "enunciado": "Qual condição ajuda a caracterizar Respiração humana?",
      "alternativas": {
        "a": "difusão ocorre por gradientes de pressão parcial nos alvéolos",
        "b": "técnicas variam de fermentação a engenharia genética",
        "c": "reconhecimento de antígenos ativa expansão clonal",
        "d": "contrações cardíacas e vasos mantêm fluxo e pressão",
        "e": "dados de incidência, prevalência e fatores de risco permitem testar hipóteses"
      },
      "resposta": "a",
      "explicacao": "Respiração humana: difusão ocorre por gradientes de pressão parcial nos alvéolos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0087",
      "enunciado": "Qual consequência ou função se associa corretamente a Respiração humana?",
      "alternativas": {
        "a": "orienta prevenção, vigilância e avaliação de políticas",
        "b": "sustenta respiração celular e equilíbrio ácido-base",
        "c": "produz resposta mais rápida e intensa em exposições posteriores",
        "d": "transporta gases, nutrientes, hormônios e resíduos",
        "e": "permite medicamentos, diagnósticos, melhoramento e biorremediação"
      },
      "resposta": "b",
      "explicacao": "Respiração humana: sustenta respiração celular e equilíbrio ácido-base. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0088",
      "enunciado": "Qual definição corresponde corretamente a Respiração humana?",
      "alternativas": {
        "a": "movimento do sangue impulsionado pelo coração em circuitos pulmonar e sistêmico",
        "b": "resposta específica com linfócitos e memória imunológica",
        "c": "trocas gasosas e transporte de oxigênio e dióxido de carbono",
        "d": "uso de organismos, células ou moléculas biológicas para obter produtos e processos",
        "e": "estudo da distribuição e dos determinantes de eventos de saúde em populações"
      },
      "resposta": "c",
      "explicacao": "Respiração humana é trocas gasosas e transporte de oxigênio e dióxido de carbono. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0089",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: movimento do sangue impulsionado pelo coração em circuitos pulmonar e sistêmico?",
      "alternativas": {
        "a": "Biotecnologia",
        "b": "Imunidade adaptativa",
        "c": "Ecossistema",
        "d": "Circulação sanguínea",
        "e": "Epidemiologia"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Circulação sanguínea: movimento do sangue impulsionado pelo coração em circuitos pulmonar e sistêmico. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0090",
      "enunciado": "Qual condição ajuda a caracterizar Circulação sanguínea?",
      "alternativas": {
        "a": "técnicas variam de fermentação a engenharia genética",
        "b": "trocas de matéria e fluxo de energia conectam componentes",
        "c": "reconhecimento de antígenos ativa expansão clonal",
        "d": "dados de incidência, prevalência e fatores de risco permitem testar hipóteses",
        "e": "contrações cardíacas e vasos mantêm fluxo e pressão"
      },
      "resposta": "e",
      "explicacao": "Circulação sanguínea: contrações cardíacas e vasos mantêm fluxo e pressão. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0091",
      "enunciado": "Qual consequência ou função se associa corretamente a Circulação sanguínea?",
      "alternativas": {
        "a": "transporta gases, nutrientes, hormônios e resíduos",
        "b": "unidade de análise de relações ecológicas e mudanças ambientais",
        "c": "produz resposta mais rápida e intensa em exposições posteriores",
        "d": "orienta prevenção, vigilância e avaliação de políticas",
        "e": "permite medicamentos, diagnósticos, melhoramento e biorremediação"
      },
      "resposta": "a",
      "explicacao": "Circulação sanguínea: transporta gases, nutrientes, hormônios e resíduos. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0092",
      "enunciado": "Qual definição corresponde corretamente a Circulação sanguínea?",
      "alternativas": {
        "a": "conjunto formado por comunidades de seres vivos e fatores abióticos em interação",
        "b": "movimento do sangue impulsionado pelo coração em circuitos pulmonar e sistêmico",
        "c": "uso de organismos, células ou moléculas biológicas para obter produtos e processos",
        "d": "resposta específica com linfócitos e memória imunológica",
        "e": "estudo da distribuição e dos determinantes de eventos de saúde em populações"
      },
      "resposta": "b",
      "explicacao": "Circulação sanguínea é movimento do sangue impulsionado pelo coração em circuitos pulmonar e sistêmico. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0093",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: resposta específica com linfócitos e memória imunológica?",
      "alternativas": {
        "a": "Ecossistema",
        "b": "Cadeia alimentar",
        "c": "Imunidade adaptativa",
        "d": "Epidemiologia",
        "e": "Biotecnologia"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Imunidade adaptativa: resposta específica com linfócitos e memória imunológica. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0094",
      "enunciado": "Qual condição ajuda a caracterizar Imunidade adaptativa?",
      "alternativas": {
        "a": "produtores incorporam energia e consumidores obtêm matéria ao se alimentar",
        "b": "dados de incidência, prevalência e fatores de risco permitem testar hipóteses",
        "c": "trocas de matéria e fluxo de energia conectam componentes",
        "d": "reconhecimento de antígenos ativa expansão clonal",
        "e": "técnicas variam de fermentação a engenharia genética"
      },
      "resposta": "d",
      "explicacao": "Imunidade adaptativa: reconhecimento de antígenos ativa expansão clonal. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0095",
      "enunciado": "Qual consequência ou função se associa corretamente a Imunidade adaptativa?",
      "alternativas": {
        "a": "unidade de análise de relações ecológicas e mudanças ambientais",
        "b": "orienta prevenção, vigilância e avaliação de políticas",
        "c": "permite medicamentos, diagnósticos, melhoramento e biorremediação",
        "d": "permite analisar fluxo energético e efeitos de alterações populacionais",
        "e": "produz resposta mais rápida e intensa em exposições posteriores"
      },
      "resposta": "e",
      "explicacao": "Imunidade adaptativa: produz resposta mais rápida e intensa em exposições posteriores. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0096",
      "enunciado": "Qual definição corresponde corretamente a Imunidade adaptativa?",
      "alternativas": {
        "a": "resposta específica com linfócitos e memória imunológica",
        "b": "uso de organismos, células ou moléculas biológicas para obter produtos e processos",
        "c": "estudo da distribuição e dos determinantes de eventos de saúde em populações",
        "d": "conjunto formado por comunidades de seres vivos e fatores abióticos em interação",
        "e": "sequência de transferência de matéria e energia entre níveis tróficos"
      },
      "resposta": "a",
      "explicacao": "Imunidade adaptativa é resposta específica com linfócitos e memória imunológica. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0097",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: uso de organismos, células ou moléculas biológicas para obter produtos e processos?",
      "alternativas": {
        "a": "Cadeia alimentar",
        "b": "Biotecnologia",
        "c": "Epidemiologia",
        "d": "Ciclos biogeoquímicos",
        "e": "Ecossistema"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Biotecnologia: uso de organismos, células ou moléculas biológicas para obter produtos e processos. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0098",
      "enunciado": "Qual condição ajuda a caracterizar Biotecnologia?",
      "alternativas": {
        "a": "produtores incorporam energia e consumidores obtêm matéria ao se alimentar",
        "b": "trocas de matéria e fluxo de energia conectam componentes",
        "c": "técnicas variam de fermentação a engenharia genética",
        "d": "processos biológicos, geológicos e químicos reciclam matéria",
        "e": "dados de incidência, prevalência e fatores de risco permitem testar hipóteses"
      },
      "resposta": "c",
      "explicacao": "Biotecnologia: técnicas variam de fermentação a engenharia genética. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0099",
      "enunciado": "Qual consequência ou função se associa corretamente a Biotecnologia?",
      "alternativas": {
        "a": "orienta prevenção, vigilância e avaliação de políticas",
        "b": "unidade de análise de relações ecológicas e mudanças ambientais",
        "c": "mantêm disponibilidade de nutrientes e podem ser alterados por atividades humanas",
        "d": "permite medicamentos, diagnósticos, melhoramento e biorremediação",
        "e": "permite analisar fluxo energético e efeitos de alterações populacionais"
      },
      "resposta": "d",
      "explicacao": "Biotecnologia: permite medicamentos, diagnósticos, melhoramento e biorremediação. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0100",
      "enunciado": "Qual definição corresponde corretamente a Biotecnologia?",
      "alternativas": {
        "a": "estudo da distribuição e dos determinantes de eventos de saúde em populações",
        "b": "sequência de transferência de matéria e energia entre níveis tróficos",
        "c": "circulação de elementos químicos entre organismos, atmosfera, água e solo",
        "d": "conjunto formado por comunidades de seres vivos e fatores abióticos em interação",
        "e": "uso de organismos, células ou moléculas biológicas para obter produtos e processos"
      },
      "resposta": "e",
      "explicacao": "Biotecnologia é uso de organismos, células ou moléculas biológicas para obter produtos e processos. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0101",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: estudo da distribuição e dos determinantes de eventos de saúde em populações?",
      "alternativas": {
        "a": "Epidemiologia",
        "b": "Ecossistema",
        "c": "Cadeia alimentar",
        "d": "Dinâmica populacional",
        "e": "Ciclos biogeoquímicos"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Epidemiologia: estudo da distribuição e dos determinantes de eventos de saúde em populações. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-bio-0102",
      "enunciado": "Qual condição ajuda a caracterizar Epidemiologia?",
      "alternativas": {
        "a": "natalidade, mortalidade, imigração, emigração e capacidade de suporte",
        "b": "dados de incidência, prevalência e fatores de risco permitem testar hipóteses",
        "c": "trocas de matéria e fluxo de energia conectam componentes",
        "d": "produtores incorporam energia e consumidores obtêm matéria ao se alimentar",
        "e": "processos biológicos, geológicos e químicos reciclam matéria"
      },
      "resposta": "b",
      "explicacao": "Epidemiologia: dados de incidência, prevalência e fatores de risco permitem testar hipóteses. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0103",
      "enunciado": "Qual consequência ou função se associa corretamente a Epidemiologia?",
      "alternativas": {
        "a": "mantêm disponibilidade de nutrientes e podem ser alterados por atividades humanas",
        "b": "permite analisar fluxo energético e efeitos de alterações populacionais",
        "c": "orienta prevenção, vigilância e avaliação de políticas",
        "d": "ajuda a compreender crescimento, declínio e manejo de espécies",
        "e": "unidade de análise de relações ecológicas e mudanças ambientais"
      },
      "resposta": "c",
      "explicacao": "Epidemiologia: orienta prevenção, vigilância e avaliação de políticas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-bio-0104",
      "enunciado": "Qual definição corresponde corretamente a Epidemiologia?",
      "alternativas": {
        "a": "variação do tamanho e da estrutura de uma população ao longo do tempo",
        "b": "conjunto formado por comunidades de seres vivos e fatores abióticos em interação",
        "c": "sequência de transferência de matéria e energia entre níveis tróficos",
        "d": "estudo da distribuição e dos determinantes de eventos de saúde em populações",
        "e": "circulação de elementos químicos entre organismos, atmosfera, água e solo"
      },
      "resposta": "d",
      "explicacao": "Epidemiologia é estudo da distribuição e dos determinantes de eventos de saúde em populações. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0001",
      "enunciado": "Um móvel mantém velocidade constante de 10 m/s durante 5 s. Qual distância percorre?",
      "alternativas": {
        "a": "25 m",
        "b": "15 m",
        "c": "2 m",
        "d": "100 m",
        "e": "50 m"
      },
      "resposta": "e",
      "explicacao": "Movimento uniforme: Δs = v·Δt = 10 × 5 = 50 m.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0002",
      "enunciado": "Um móvel mantém velocidade constante de 12 m/s durante 6 s. Qual distância percorre?",
      "alternativas": {
        "a": "72 m",
        "b": "18 m",
        "c": "36 m",
        "d": "144 m",
        "e": "2 m"
      },
      "resposta": "a",
      "explicacao": "Movimento uniforme: Δs = v·Δt = 12 × 6 = 72 m.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0003",
      "enunciado": "Um móvel mantém velocidade constante de 14 m/s durante 7 s. Qual distância percorre?",
      "alternativas": {
        "a": "2 m",
        "b": "98 m",
        "c": "196 m",
        "d": "49 m",
        "e": "21 m"
      },
      "resposta": "b",
      "explicacao": "Movimento uniforme: Δs = v·Δt = 14 × 7 = 98 m.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0004",
      "enunciado": "Um móvel mantém velocidade constante de 16 m/s durante 8 s. Qual distância percorre?",
      "alternativas": {
        "a": "2 m",
        "b": "24 m",
        "c": "128 m",
        "d": "256 m",
        "e": "64 m"
      },
      "resposta": "c",
      "explicacao": "Movimento uniforme: Δs = v·Δt = 16 × 8 = 128 m.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0005",
      "enunciado": "Um móvel mantém velocidade constante de 18 m/s durante 9 s. Qual distância percorre?",
      "alternativas": {
        "a": "324 m",
        "b": "2 m",
        "c": "81 m",
        "d": "162 m",
        "e": "27 m"
      },
      "resposta": "d",
      "explicacao": "Movimento uniforme: Δs = v·Δt = 18 × 9 = 162 m.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0006",
      "enunciado": "Um móvel mantém velocidade constante de 20 m/s durante 10 s. Qual distância percorre?",
      "alternativas": {
        "a": "400 m",
        "b": "2 m",
        "c": "100 m",
        "d": "30 m",
        "e": "200 m"
      },
      "resposta": "e",
      "explicacao": "Movimento uniforme: Δs = v·Δt = 20 × 10 = 200 m.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0007",
      "enunciado": "Um móvel mantém velocidade constante de 22 m/s durante 11 s. Qual distância percorre?",
      "alternativas": {
        "a": "242 m",
        "b": "484 m",
        "c": "121 m",
        "d": "33 m",
        "e": "2 m"
      },
      "resposta": "a",
      "explicacao": "Movimento uniforme: Δs = v·Δt = 22 × 11 = 242 m.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0008",
      "enunciado": "Um móvel mantém velocidade constante de 24 m/s durante 12 s. Qual distância percorre?",
      "alternativas": {
        "a": "2 m",
        "b": "288 m",
        "c": "144 m",
        "d": "36 m",
        "e": "576 m"
      },
      "resposta": "b",
      "explicacao": "Movimento uniforme: Δs = v·Δt = 24 × 12 = 288 m.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0009",
      "enunciado": "Um móvel mantém velocidade constante de 26 m/s durante 13 s. Qual distância percorre?",
      "alternativas": {
        "a": "2 m",
        "b": "169 m",
        "c": "338 m",
        "d": "676 m",
        "e": "39 m"
      },
      "resposta": "c",
      "explicacao": "Movimento uniforme: Δs = v·Δt = 26 × 13 = 338 m.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0010",
      "enunciado": "Um móvel mantém velocidade constante de 28 m/s durante 14 s. Qual distância percorre?",
      "alternativas": {
        "a": "784 m",
        "b": "196 m",
        "c": "2 m",
        "d": "392 m",
        "e": "42 m"
      },
      "resposta": "d",
      "explicacao": "Movimento uniforme: Δs = v·Δt = 28 × 14 = 392 m.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0011",
      "enunciado": "Um corpo parte com velocidade de 2 m/s e aceleração constante de 1 m/s^2 durante 4 s. Qual é a velocidade final?",
      "alternativas": {
        "a": "4 m/s",
        "b": "18 m/s",
        "c": "7 m/s",
        "d": "8 m/s",
        "e": "6 m/s"
      },
      "resposta": "e",
      "explicacao": "MUV: v = v₀ + a·t = 2 + 1 × 4 = 6 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0012",
      "enunciado": "Um corpo parte com velocidade de 3 m/s e aceleração constante de 2 m/s^2 durante 5 s. Qual é a velocidade final?",
      "alternativas": {
        "a": "13,00 m/s",
        "b": "14,30 m/s",
        "c": "30,00 m/s",
        "d": "10,00 m/s",
        "e": "53,00 m/s"
      },
      "resposta": "a",
      "explicacao": "MUV: v = v₀ + a·t = 3 + 2 × 5 = 13 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0013",
      "enunciado": "Um corpo parte com velocidade de 4 m/s e aceleração constante de 3 m/s^2 durante 6 s. Qual é a velocidade final?",
      "alternativas": {
        "a": "18 m/s",
        "b": "22 m/s",
        "c": "13 m/s",
        "d": "72 m/s",
        "e": "112 m/s"
      },
      "resposta": "b",
      "explicacao": "MUV: v = v₀ + a·t = 4 + 3 × 6 = 22 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0014",
      "enunciado": "Um corpo parte com velocidade de 5 m/s e aceleração constante de 4 m/s^2 durante 7 s. Qual é a velocidade final?",
      "alternativas": {
        "a": "140 m/s",
        "b": "16 m/s",
        "c": "33 m/s",
        "d": "28 m/s",
        "e": "201 m/s"
      },
      "resposta": "c",
      "explicacao": "MUV: v = v₀ + a·t = 5 + 4 × 7 = 33 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0015",
      "enunciado": "Um corpo parte com velocidade de 6 m/s e aceleração constante de 1 m/s^2 durante 8 s. Qual é a velocidade final?",
      "alternativas": {
        "a": "70 m/s",
        "b": "48 m/s",
        "c": "15 m/s",
        "d": "14 m/s",
        "e": "8 m/s"
      },
      "resposta": "d",
      "explicacao": "MUV: v = v₀ + a·t = 6 + 1 × 8 = 14 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0016",
      "enunciado": "Um corpo parte com velocidade de 7 m/s e aceleração constante de 2 m/s^2 durante 4 s. Qual é a velocidade final?",
      "alternativas": {
        "a": "56 m/s",
        "b": "39 m/s",
        "c": "13 m/s",
        "d": "8 m/s",
        "e": "15 m/s"
      },
      "resposta": "e",
      "explicacao": "MUV: v = v₀ + a·t = 7 + 2 × 4 = 15 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0017",
      "enunciado": "Um corpo parte com velocidade de 8 m/s e aceleração constante de 3 m/s^2 durante 5 s. Qual é a velocidade final?",
      "alternativas": {
        "a": "23 m/s",
        "b": "83 m/s",
        "c": "120 m/s",
        "d": "15 m/s",
        "e": "16 m/s"
      },
      "resposta": "a",
      "explicacao": "MUV: v = v₀ + a·t = 8 + 3 × 5 = 23 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0018",
      "enunciado": "Um corpo parte com velocidade de 9 m/s e aceleração constante de 4 m/s^2 durante 6 s. Qual é a velocidade final?",
      "alternativas": {
        "a": "19 m/s",
        "b": "33 m/s",
        "c": "153 m/s",
        "d": "24 m/s",
        "e": "216 m/s"
      },
      "resposta": "b",
      "explicacao": "MUV: v = v₀ + a·t = 9 + 4 × 6 = 33 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0019",
      "enunciado": "Um corpo parte com velocidade de 10 m/s e aceleração constante de 1 m/s^2 durante 7 s. Qual é a velocidade final?",
      "alternativas": {
        "a": "18 m/s",
        "b": "7 m/s",
        "c": "17 m/s",
        "d": "59 m/s",
        "e": "70 m/s"
      },
      "resposta": "c",
      "explicacao": "MUV: v = v₀ + a·t = 10 + 1 × 7 = 17 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0020",
      "enunciado": "Um corpo parte com velocidade de 11 m/s e aceleração constante de 2 m/s^2 durante 8 s. Qual é a velocidade final?",
      "alternativas": {
        "a": "16 m/s",
        "b": "139 m/s",
        "c": "176 m/s",
        "d": "27 m/s",
        "e": "21 m/s"
      },
      "resposta": "d",
      "explicacao": "MUV: v = v₀ + a·t = 11 + 2 × 8 = 27 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0021",
      "enunciado": "Uma força resultante produz aceleração de 2 m/s^2 em um corpo de massa 2 kg. Qual é o módulo da força?",
      "alternativas": {
        "a": "5 N",
        "b": "1 N",
        "c": "8 N",
        "d": "6 N",
        "e": "4 N"
      },
      "resposta": "e",
      "explicacao": "2ª lei de Newton: F = m·a = 2 × 2 = 4 N.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0022",
      "enunciado": "Uma força resultante produz aceleração de 3 m/s^2 em um corpo de massa 3 kg. Qual é o módulo da força?",
      "alternativas": {
        "a": "9 N",
        "b": "10 N",
        "c": "1 N",
        "d": "6 N",
        "e": "18 N"
      },
      "resposta": "a",
      "explicacao": "2ª lei de Newton: F = m·a = 3 × 3 = 9 N.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0023",
      "enunciado": "Uma força resultante produz aceleração de 4 m/s^2 em um corpo de massa 4 kg. Qual é o módulo da força?",
      "alternativas": {
        "a": "8,00 N",
        "b": "16,00 N",
        "c": "17,60 N",
        "d": "1,00 N",
        "e": "32,00 N"
      },
      "resposta": "b",
      "explicacao": "2ª lei de Newton: F = m·a = 4 × 4 = 16 N.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0024",
      "enunciado": "Uma força resultante produz aceleração de 5 m/s^2 em um corpo de massa 5 kg. Qual é o módulo da força?",
      "alternativas": {
        "a": "27,50 N",
        "b": "10,00 N",
        "c": "25,00 N",
        "d": "1,00 N",
        "e": "50,00 N"
      },
      "resposta": "c",
      "explicacao": "2ª lei de Newton: F = m·a = 5 × 5 = 25 N.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0025",
      "enunciado": "Uma força resultante produz aceleração de 6 m/s^2 em um corpo de massa 6 kg. Qual é o módulo da força?",
      "alternativas": {
        "a": "12,00 N",
        "b": "72,00 N",
        "c": "1,00 N",
        "d": "36,00 N",
        "e": "39,60 N"
      },
      "resposta": "d",
      "explicacao": "2ª lei de Newton: F = m·a = 6 × 6 = 36 N.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0026",
      "enunciado": "Uma força resultante produz aceleração de 2 m/s^2 em um corpo de massa 7 kg. Qual é o módulo da força?",
      "alternativas": {
        "a": "28,00 N",
        "b": "9,00 N",
        "c": "3,50 N",
        "d": "0,29 N",
        "e": "14,00 N"
      },
      "resposta": "e",
      "explicacao": "2ª lei de Newton: F = m·a = 7 × 2 = 14 N.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0027",
      "enunciado": "Uma força resultante produz aceleração de 3 m/s^2 em um corpo de massa 8 kg. Qual é o módulo da força?",
      "alternativas": {
        "a": "24,00 N",
        "b": "11,00 N",
        "c": "48,00 N",
        "d": "2,67 N",
        "e": "0,38 N"
      },
      "resposta": "a",
      "explicacao": "2ª lei de Newton: F = m·a = 8 × 3 = 24 N.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0028",
      "enunciado": "Uma força resultante produz aceleração de 4 m/s^2 em um corpo de massa 9 kg. Qual é o módulo da força?",
      "alternativas": {
        "a": "0,44 N",
        "b": "36,00 N",
        "c": "72,00 N",
        "d": "13,00 N",
        "e": "2,25 N"
      },
      "resposta": "b",
      "explicacao": "2ª lei de Newton: F = m·a = 9 × 4 = 36 N.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0029",
      "enunciado": "Uma força resultante produz aceleração de 5 m/s^2 em um corpo de massa 10 kg. Qual é o módulo da força?",
      "alternativas": {
        "a": "100,00 N",
        "b": "2,00 N",
        "c": "50,00 N",
        "d": "15,00 N",
        "e": "0,50 N"
      },
      "resposta": "c",
      "explicacao": "2ª lei de Newton: F = m·a = 10 × 5 = 50 N.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0030",
      "enunciado": "Uma força resultante produz aceleração de 6 m/s^2 em um corpo de massa 11 kg. Qual é o módulo da força?",
      "alternativas": {
        "a": "17,00 N",
        "b": "1,83 N",
        "c": "0,55 N",
        "d": "66,00 N",
        "e": "132,00 N"
      },
      "resposta": "d",
      "explicacao": "2ª lei de Newton: F = m·a = 11 × 6 = 66 N.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0031",
      "enunciado": "Um objeto de 2 kg está a 3 m de altura. Adotando g = 10 m/s^2, qual é sua energia potencial gravitacional?",
      "alternativas": {
        "a": "30 J",
        "b": "66 J",
        "c": "20 J",
        "d": "6 J",
        "e": "60 J"
      },
      "resposta": "e",
      "explicacao": "Energia potencial gravitacional: E = m·g·h = 2 × 10 × 3 = 60 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0032",
      "enunciado": "Um objeto de 3 kg está a 4 m de altura. Adotando g = 10 m/s^2, qual é sua energia potencial gravitacional?",
      "alternativas": {
        "a": "120 J",
        "b": "40 J",
        "c": "12 J",
        "d": "60 J",
        "e": "30 J"
      },
      "resposta": "a",
      "explicacao": "Energia potencial gravitacional: E = m·g·h = 3 × 10 × 4 = 120 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0033",
      "enunciado": "Um objeto de 4 kg está a 5 m de altura. Adotando g = 10 m/s^2, qual é sua energia potencial gravitacional?",
      "alternativas": {
        "a": "40 J",
        "b": "200 J",
        "c": "20 J",
        "d": "50 J",
        "e": "100 J"
      },
      "resposta": "b",
      "explicacao": "Energia potencial gravitacional: E = m·g·h = 4 × 10 × 5 = 200 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0034",
      "enunciado": "Um objeto de 5 kg está a 6 m de altura. Adotando g = 10 m/s^2, qual é sua energia potencial gravitacional?",
      "alternativas": {
        "a": "50 J",
        "b": "60 J",
        "c": "300 J",
        "d": "150 J",
        "e": "30 J"
      },
      "resposta": "c",
      "explicacao": "Energia potencial gravitacional: E = m·g·h = 5 × 10 × 6 = 300 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0035",
      "enunciado": "Um objeto de 6 kg está a 7 m de altura. Adotando g = 10 m/s^2, qual é sua energia potencial gravitacional?",
      "alternativas": {
        "a": "42 J",
        "b": "60 J",
        "c": "70 J",
        "d": "420 J",
        "e": "210 J"
      },
      "resposta": "d",
      "explicacao": "Energia potencial gravitacional: E = m·g·h = 6 × 10 × 7 = 420 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0036",
      "enunciado": "Um objeto de 7 kg está a 8 m de altura. Adotando g = 10 m/s^2, qual é sua energia potencial gravitacional?",
      "alternativas": {
        "a": "56 J",
        "b": "70 J",
        "c": "80 J",
        "d": "280 J",
        "e": "560 J"
      },
      "resposta": "e",
      "explicacao": "Energia potencial gravitacional: E = m·g·h = 7 × 10 × 8 = 560 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0037",
      "enunciado": "Um objeto de 8 kg está a 9 m de altura. Adotando g = 10 m/s^2, qual é sua energia potencial gravitacional?",
      "alternativas": {
        "a": "720 J",
        "b": "90 J",
        "c": "72 J",
        "d": "360 J",
        "e": "80 J"
      },
      "resposta": "a",
      "explicacao": "Energia potencial gravitacional: E = m·g·h = 8 × 10 × 9 = 720 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0038",
      "enunciado": "Um objeto de 9 kg está a 10 m de altura. Adotando g = 10 m/s^2, qual é sua energia potencial gravitacional?",
      "alternativas": {
        "a": "990 J",
        "b": "900 J",
        "c": "90 J",
        "d": "100 J",
        "e": "450 J"
      },
      "resposta": "b",
      "explicacao": "Energia potencial gravitacional: E = m·g·h = 9 × 10 × 10 = 900 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0039",
      "enunciado": "Um objeto de 10 kg está a 11 m de altura. Adotando g = 10 m/s^2, qual é sua energia potencial gravitacional?",
      "alternativas": {
        "a": "100 J",
        "b": "110 J",
        "c": "1.100 J",
        "d": "1.210 J",
        "e": "550 J"
      },
      "resposta": "c",
      "explicacao": "Energia potencial gravitacional: E = m·g·h = 10 × 10 × 11 = 1.100 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0040",
      "enunciado": "Um objeto de 11 kg está a 12 m de altura. Adotando g = 10 m/s^2, qual é sua energia potencial gravitacional?",
      "alternativas": {
        "a": "660 J",
        "b": "120 J",
        "c": "132 J",
        "d": "1.320 J",
        "e": "110 J"
      },
      "resposta": "d",
      "explicacao": "Energia potencial gravitacional: E = m·g·h = 11 × 10 × 12 = 1.320 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0041",
      "enunciado": "Um corpo de massa 2 kg desloca-se a 3 m/s. Qual é sua quantidade de movimento?",
      "alternativas": {
        "a": "12,00 kg·m/s",
        "b": "1,50 kg·m/s",
        "c": "9,00 kg·m/s",
        "d": "5,00 kg·m/s",
        "e": "6,00 kg·m/s"
      },
      "resposta": "e",
      "explicacao": "Quantidade de movimento: Q = m·v = 2 × 3 = 6 kg·m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0042",
      "enunciado": "Um corpo de massa 3 kg desloca-se a 4 m/s. Qual é sua quantidade de movimento?",
      "alternativas": {
        "a": "12,00 kg·m/s",
        "b": "7,00 kg·m/s",
        "c": "24,00 kg·m/s",
        "d": "1,33 kg·m/s",
        "e": "13,20 kg·m/s"
      },
      "resposta": "a",
      "explicacao": "Quantidade de movimento: Q = m·v = 3 × 4 = 12 kg·m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0043",
      "enunciado": "Um corpo de massa 4 kg desloca-se a 5 m/s. Qual é sua quantidade de movimento?",
      "alternativas": {
        "a": "9,00 kg·m/s",
        "b": "20,00 kg·m/s",
        "c": "50,00 kg·m/s",
        "d": "1,25 kg·m/s",
        "e": "40,00 kg·m/s"
      },
      "resposta": "b",
      "explicacao": "Quantidade de movimento: Q = m·v = 4 × 5 = 20 kg·m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0044",
      "enunciado": "Um corpo de massa 5 kg desloca-se a 6 m/s. Qual é sua quantidade de movimento?",
      "alternativas": {
        "a": "90,00 kg·m/s",
        "b": "60,00 kg·m/s",
        "c": "30,00 kg·m/s",
        "d": "11,00 kg·m/s",
        "e": "1,20 kg·m/s"
      },
      "resposta": "c",
      "explicacao": "Quantidade de movimento: Q = m·v = 5 × 6 = 30 kg·m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0045",
      "enunciado": "Um corpo de massa 6 kg desloca-se a 7 m/s. Qual é sua quantidade de movimento?",
      "alternativas": {
        "a": "147,00 kg·m/s",
        "b": "84,00 kg·m/s",
        "c": "1,17 kg·m/s",
        "d": "42,00 kg·m/s",
        "e": "13,00 kg·m/s"
      },
      "resposta": "d",
      "explicacao": "Quantidade de movimento: Q = m·v = 6 × 7 = 42 kg·m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0046",
      "enunciado": "Um corpo de massa 7 kg desloca-se a 8 m/s. Qual é sua quantidade de movimento?",
      "alternativas": {
        "a": "15,00 kg·m/s",
        "b": "112,00 kg·m/s",
        "c": "1,14 kg·m/s",
        "d": "224,00 kg·m/s",
        "e": "56,00 kg·m/s"
      },
      "resposta": "e",
      "explicacao": "Quantidade de movimento: Q = m·v = 7 × 8 = 56 kg·m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0047",
      "enunciado": "Um corpo de massa 8 kg desloca-se a 9 m/s. Qual é sua quantidade de movimento?",
      "alternativas": {
        "a": "72,00 kg·m/s",
        "b": "324,00 kg·m/s",
        "c": "144,00 kg·m/s",
        "d": "17,00 kg·m/s",
        "e": "1,12 kg·m/s"
      },
      "resposta": "a",
      "explicacao": "Quantidade de movimento: Q = m·v = 8 × 9 = 72 kg·m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0048",
      "enunciado": "Um corpo de massa 9 kg desloca-se a 10 m/s. Qual é sua quantidade de movimento?",
      "alternativas": {
        "a": "180,00 kg·m/s",
        "b": "90,00 kg·m/s",
        "c": "19,00 kg·m/s",
        "d": "1,11 kg·m/s",
        "e": "450,00 kg·m/s"
      },
      "resposta": "b",
      "explicacao": "Quantidade de movimento: Q = m·v = 9 × 10 = 90 kg·m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0049",
      "enunciado": "Um corpo de massa 10 kg desloca-se a 11 m/s. Qual é sua quantidade de movimento?",
      "alternativas": {
        "a": "21,00 kg·m/s",
        "b": "1,10 kg·m/s",
        "c": "110,00 kg·m/s",
        "d": "220,00 kg·m/s",
        "e": "605,00 kg·m/s"
      },
      "resposta": "c",
      "explicacao": "Quantidade de movimento: Q = m·v = 10 × 11 = 110 kg·m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0050",
      "enunciado": "Um corpo de massa 11 kg desloca-se a 12 m/s. Qual é sua quantidade de movimento?",
      "alternativas": {
        "a": "264,00 kg·m/s",
        "b": "23,00 kg·m/s",
        "c": "792,00 kg·m/s",
        "d": "132,00 kg·m/s",
        "e": "1,09 kg·m/s"
      },
      "resposta": "d",
      "explicacao": "Quantidade de movimento: Q = m·v = 11 × 12 = 132 kg·m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0051",
      "enunciado": "Qual é o peso aproximado de um corpo de massa 3 kg próximo à superfície terrestre, adotando g = 10 m/s^2?",
      "alternativas": {
        "a": "3,00 N",
        "b": "3,33 N",
        "c": "300,00 N",
        "d": "0,30 N",
        "e": "30,00 N"
      },
      "resposta": "e",
      "explicacao": "Peso é força: P = m·g = 3 × 10 = 30 N. Massa (3 kg) e peso (30 N) têm grandezas e unidades diferentes.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0052",
      "enunciado": "Qual é o peso aproximado de um corpo de massa 4 kg próximo à superfície terrestre, adotando g = 10 m/s^2?",
      "alternativas": {
        "a": "40,00 N",
        "b": "2,50 N",
        "c": "4,00 N",
        "d": "0,40 N",
        "e": "400,00 N"
      },
      "resposta": "a",
      "explicacao": "Peso é força: P = m·g = 4 × 10 = 40 N. Massa (4 kg) e peso (40 N) têm grandezas e unidades diferentes.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0053",
      "enunciado": "Qual é o peso aproximado de um corpo de massa 5 kg próximo à superfície terrestre, adotando g = 10 m/s^2?",
      "alternativas": {
        "a": "5,00 N",
        "b": "50,00 N",
        "c": "500,00 N",
        "d": "0,50 N",
        "e": "2,00 N"
      },
      "resposta": "b",
      "explicacao": "Peso é força: P = m·g = 5 × 10 = 50 N. Massa (5 kg) e peso (50 N) têm grandezas e unidades diferentes.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0054",
      "enunciado": "Qual é o peso aproximado de um corpo de massa 6 kg próximo à superfície terrestre, adotando g = 10 m/s^2?",
      "alternativas": {
        "a": "6,00 N",
        "b": "1,67 N",
        "c": "60,00 N",
        "d": "600,00 N",
        "e": "0,60 N"
      },
      "resposta": "c",
      "explicacao": "Peso é força: P = m·g = 6 × 10 = 60 N. Massa (6 kg) e peso (60 N) têm grandezas e unidades diferentes.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0055",
      "enunciado": "Qual é o peso aproximado de um corpo de massa 7 kg próximo à superfície terrestre, adotando g = 10 m/s^2?",
      "alternativas": {
        "a": "7,00 N",
        "b": "1,43 N",
        "c": "0,70 N",
        "d": "70,00 N",
        "e": "700,00 N"
      },
      "resposta": "d",
      "explicacao": "Peso é força: P = m·g = 7 × 10 = 70 N. Massa (7 kg) e peso (70 N) têm grandezas e unidades diferentes.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0056",
      "enunciado": "Qual é o peso aproximado de um corpo de massa 8 kg próximo à superfície terrestre, adotando g = 10 m/s^2?",
      "alternativas": {
        "a": "800,00 N",
        "b": "0,80 N",
        "c": "8,00 N",
        "d": "1,25 N",
        "e": "80,00 N"
      },
      "resposta": "e",
      "explicacao": "Peso é força: P = m·g = 8 × 10 = 80 N. Massa (8 kg) e peso (80 N) têm grandezas e unidades diferentes.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0057",
      "enunciado": "Qual é o peso aproximado de um corpo de massa 9 kg próximo à superfície terrestre, adotando g = 10 m/s^2?",
      "alternativas": {
        "a": "90,00 N",
        "b": "9,00 N",
        "c": "1,11 N",
        "d": "0,90 N",
        "e": "900,00 N"
      },
      "resposta": "a",
      "explicacao": "Peso é força: P = m·g = 9 × 10 = 90 N. Massa (9 kg) e peso (90 N) têm grandezas e unidades diferentes.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0058",
      "enunciado": "Qual é o peso aproximado de um corpo de massa 10 kg próximo à superfície terrestre, adotando g = 10 m/s^2?",
      "alternativas": {
        "a": "1.000 N",
        "b": "100 N",
        "c": "110 N",
        "d": "10 N",
        "e": "1 N"
      },
      "resposta": "b",
      "explicacao": "Peso é força: P = m·g = 10 × 10 = 100 N. Massa (10 kg) e peso (100 N) têm grandezas e unidades diferentes.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0059",
      "enunciado": "Qual é o peso aproximado de um corpo de massa 11 kg próximo à superfície terrestre, adotando g = 10 m/s^2?",
      "alternativas": {
        "a": "11,00 N",
        "b": "1.100,00 N",
        "c": "110,00 N",
        "d": "0,91 N",
        "e": "1,10 N"
      },
      "resposta": "c",
      "explicacao": "Peso é força: P = m·g = 11 × 10 = 110 N. Massa (11 kg) e peso (110 N) têm grandezas e unidades diferentes.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0060",
      "enunciado": "Qual é o peso aproximado de um corpo de massa 12 kg próximo à superfície terrestre, adotando g = 10 m/s^2?",
      "alternativas": {
        "a": "1.200,00 N",
        "b": "1,20 N",
        "c": "0,83 N",
        "d": "120,00 N",
        "e": "12,00 N"
      },
      "resposta": "d",
      "explicacao": "Peso é força: P = m·g = 12 × 10 = 120 N. Massa (12 kg) e peso (120 N) têm grandezas e unidades diferentes.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0061",
      "enunciado": "Uma força de 100 N atua perpendicularmente sobre uma área de 2 m^2. Qual é a pressão exercida?",
      "alternativas": {
        "a": "102,00 Pa",
        "b": "0,02 Pa",
        "c": "100,00 Pa",
        "d": "200,00 Pa",
        "e": "50,00 Pa"
      },
      "resposta": "e",
      "explicacao": "Pressão: p = F/A = 100 / 2 = 50 Pa.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0062",
      "enunciado": "Uma força de 120 N atua perpendicularmente sobre uma área de 3 m^2. Qual é a pressão exercida?",
      "alternativas": {
        "a": "40,00 Pa",
        "b": "80,00 Pa",
        "c": "123,00 Pa",
        "d": "360,00 Pa",
        "e": "0,03 Pa"
      },
      "resposta": "a",
      "explicacao": "Pressão: p = F/A = 120 / 3 = 40 Pa.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0063",
      "enunciado": "Uma força de 140 N atua perpendicularmente sobre uma área de 4 m^2. Qual é a pressão exercida?",
      "alternativas": {
        "a": "70,00 Pa",
        "b": "35,00 Pa",
        "c": "560,00 Pa",
        "d": "0,03 Pa",
        "e": "144,00 Pa"
      },
      "resposta": "b",
      "explicacao": "Pressão: p = F/A = 140 / 4 = 35 Pa.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0064",
      "enunciado": "Uma força de 160 N atua perpendicularmente sobre uma área de 5 m^2. Qual é a pressão exercida?",
      "alternativas": {
        "a": "64,00 Pa",
        "b": "0,03 Pa",
        "c": "32,00 Pa",
        "d": "800,00 Pa",
        "e": "165,00 Pa"
      },
      "resposta": "c",
      "explicacao": "Pressão: p = F/A = 160 / 5 = 32 Pa.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0065",
      "enunciado": "Uma força de 180 N atua perpendicularmente sobre uma área de 6 m^2. Qual é a pressão exercida?",
      "alternativas": {
        "a": "1.080,00 Pa",
        "b": "60,00 Pa",
        "c": "0,03 Pa",
        "d": "30,00 Pa",
        "e": "186,00 Pa"
      },
      "resposta": "d",
      "explicacao": "Pressão: p = F/A = 180 / 6 = 30 Pa.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0066",
      "enunciado": "Uma força de 200 N atua perpendicularmente sobre uma área de 7 m^2. Qual é a pressão exercida?",
      "alternativas": {
        "a": "207,00 Pa",
        "b": "0,04 Pa",
        "c": "1.400,00 Pa",
        "d": "57,14 Pa",
        "e": "28,57 Pa"
      },
      "resposta": "e",
      "explicacao": "Pressão: p = F/A = 200 / 7 = 28,57 Pa.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0067",
      "enunciado": "Uma força de 220 N atua perpendicularmente sobre uma área de 8 m^2. Qual é a pressão exercida?",
      "alternativas": {
        "a": "27,50 Pa",
        "b": "228,00 Pa",
        "c": "1.760,00 Pa",
        "d": "55,00 Pa",
        "e": "0,04 Pa"
      },
      "resposta": "a",
      "explicacao": "Pressão: p = F/A = 220 / 8 = 27,50 Pa.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0068",
      "enunciado": "Uma força de 240 N atua perpendicularmente sobre uma área de 9 m^2. Qual é a pressão exercida?",
      "alternativas": {
        "a": "2.160,00 Pa",
        "b": "26,67 Pa",
        "c": "0,04 Pa",
        "d": "53,33 Pa",
        "e": "249,00 Pa"
      },
      "resposta": "b",
      "explicacao": "Pressão: p = F/A = 240 / 9 = 26,67 Pa.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0069",
      "enunciado": "Uma força de 260 N atua perpendicularmente sobre uma área de 10 m^2. Qual é a pressão exercida?",
      "alternativas": {
        "a": "270,00 Pa",
        "b": "52,00 Pa",
        "c": "26,00 Pa",
        "d": "0,04 Pa",
        "e": "2.600,00 Pa"
      },
      "resposta": "c",
      "explicacao": "Pressão: p = F/A = 260 / 10 = 26 Pa.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0070",
      "enunciado": "Uma força de 280 N atua perpendicularmente sobre uma área de 11 m^2. Qual é a pressão exercida?",
      "alternativas": {
        "a": "291,00 Pa",
        "b": "3.080,00 Pa",
        "c": "50,91 Pa",
        "d": "25,45 Pa",
        "e": "0,04 Pa"
      },
      "resposta": "d",
      "explicacao": "Pressão: p = F/A = 280 / 11 = 25,45 Pa.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0071",
      "enunciado": "Quantas unidades de energia são necessárias para elevar em 5 °C a temperatura de 1 kg de água? Use c = 4.200 J/(kg·°C).",
      "alternativas": {
        "a": "23.100 J",
        "b": "10.500 J",
        "c": "4.200 J",
        "d": "5 J",
        "e": "21.000 J"
      },
      "resposta": "e",
      "explicacao": "Calor sensível: Q = m·c·ΔT = 1 × 4.200 × 5 = 21.000 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0072",
      "enunciado": "Quantas unidades de energia são necessárias para elevar em 6 °C a temperatura de 2 kg de água? Use c = 4.200 J/(kg·°C).",
      "alternativas": {
        "a": "50.400 J",
        "b": "55.440 J",
        "c": "25.200 J",
        "d": "12 J",
        "e": "8.400 J"
      },
      "resposta": "a",
      "explicacao": "Calor sensível: Q = m·c·ΔT = 2 × 4.200 × 6 = 50.400 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0073",
      "enunciado": "Quantas unidades de energia são necessárias para elevar em 7 °C a temperatura de 3 kg de água? Use c = 4.200 J/(kg·°C).",
      "alternativas": {
        "a": "21 J",
        "b": "88.200 J",
        "c": "12.600 J",
        "d": "44.100 J",
        "e": "29.400 J"
      },
      "resposta": "b",
      "explicacao": "Calor sensível: Q = m·c·ΔT = 3 × 4.200 × 7 = 88.200 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0074",
      "enunciado": "Quantas unidades de energia são necessárias para elevar em 8 °C a temperatura de 4 kg de água? Use c = 4.200 J/(kg·°C).",
      "alternativas": {
        "a": "33.600 J",
        "b": "32 J",
        "c": "134.400 J",
        "d": "67.200 J",
        "e": "16.800 J"
      },
      "resposta": "c",
      "explicacao": "Calor sensível: Q = m·c·ΔT = 4 × 4.200 × 8 = 134.400 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0075",
      "enunciado": "Quantas unidades de energia são necessárias para elevar em 9 °C a temperatura de 5 kg de água? Use c = 4.200 J/(kg·°C).",
      "alternativas": {
        "a": "21.000 J",
        "b": "94.500 J",
        "c": "37.800 J",
        "d": "189.000 J",
        "e": "45 J"
      },
      "resposta": "d",
      "explicacao": "Calor sensível: Q = m·c·ΔT = 5 × 4.200 × 9 = 189.000 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0076",
      "enunciado": "Quantas unidades de energia são necessárias para elevar em 10 °C a temperatura de 6 kg de água? Use c = 4.200 J/(kg·°C).",
      "alternativas": {
        "a": "25.200 J",
        "b": "60 J",
        "c": "42.000 J",
        "d": "126.000 J",
        "e": "252.000 J"
      },
      "resposta": "e",
      "explicacao": "Calor sensível: Q = m·c·ΔT = 6 × 4.200 × 10 = 252.000 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0077",
      "enunciado": "Quantas unidades de energia são necessárias para elevar em 11 °C a temperatura de 7 kg de água? Use c = 4.200 J/(kg·°C).",
      "alternativas": {
        "a": "323.400 J",
        "b": "46.200 J",
        "c": "161.700 J",
        "d": "29.400 J",
        "e": "77 J"
      },
      "resposta": "a",
      "explicacao": "Calor sensível: Q = m·c·ΔT = 7 × 4.200 × 11 = 323.400 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0078",
      "enunciado": "Quantas unidades de energia são necessárias para elevar em 12 °C a temperatura de 8 kg de água? Use c = 4.200 J/(kg·°C).",
      "alternativas": {
        "a": "201.600 J",
        "b": "403.200 J",
        "c": "33.600 J",
        "d": "50.400 J",
        "e": "96 J"
      },
      "resposta": "b",
      "explicacao": "Calor sensível: Q = m·c·ΔT = 8 × 4.200 × 12 = 403.200 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0079",
      "enunciado": "Quantas unidades de energia são necessárias para elevar em 13 °C a temperatura de 9 kg de água? Use c = 4.200 J/(kg·°C).",
      "alternativas": {
        "a": "54.600 J",
        "b": "245.700 J",
        "c": "491.400 J",
        "d": "37.800 J",
        "e": "117 J"
      },
      "resposta": "c",
      "explicacao": "Calor sensível: Q = m·c·ΔT = 9 × 4.200 × 13 = 491.400 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0080",
      "enunciado": "Quantas unidades de energia são necessárias para elevar em 14 °C a temperatura de 10 kg de água? Use c = 4.200 J/(kg·°C).",
      "alternativas": {
        "a": "294.000 J",
        "b": "58.800 J",
        "c": "42.000 J",
        "d": "588.000 J",
        "e": "140 J"
      },
      "resposta": "d",
      "explicacao": "Calor sensível: Q = m·c·ΔT = 10 × 4.200 × 14 = 588.000 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0081",
      "enunciado": "Um gás sofre transformação isotérmica: inicialmente P = 2 atm e V = 3 L; ao final, P = 1 atm. Qual é o volume final?",
      "alternativas": {
        "a": "7,00 L",
        "b": "4,00 L",
        "c": "1,50 L",
        "d": "3,00 L",
        "e": "6,00 L"
      },
      "resposta": "e",
      "explicacao": "Lei de Boyle (T constante): P₁V₁ = P₂V₂, então V₂ = 2×3/1 = 6 L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0082",
      "enunciado": "Um gás sofre transformação isotérmica: inicialmente P = 3 atm e V = 4 L; ao final, P = 2 atm. Qual é o volume final?",
      "alternativas": {
        "a": "6,00 L",
        "b": "5,00 L",
        "c": "24,00 L",
        "d": "4,00 L",
        "e": "2,67 L"
      },
      "resposta": "a",
      "explicacao": "Lei de Boyle (T constante): P₁V₁ = P₂V₂, então V₂ = 3×4/2 = 6 L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0083",
      "enunciado": "Um gás sofre transformação isotérmica: inicialmente P = 4 atm e V = 5 L; ao final, P = 3 atm. Qual é o volume final?",
      "alternativas": {
        "a": "3,75 L",
        "b": "6,67 L",
        "c": "60,00 L",
        "d": "5,00 L",
        "e": "6,00 L"
      },
      "resposta": "b",
      "explicacao": "Lei de Boyle (T constante): P₁V₁ = P₂V₂, então V₂ = 4×5/3 = 6,67 L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0084",
      "enunciado": "Um gás sofre transformação isotérmica: inicialmente P = 5 atm e V = 6 L; ao final, P = 4 atm. Qual é o volume final?",
      "alternativas": {
        "a": "7,00 L",
        "b": "120,00 L",
        "c": "7,50 L",
        "d": "4,80 L",
        "e": "6,00 L"
      },
      "resposta": "c",
      "explicacao": "Lei de Boyle (T constante): P₁V₁ = P₂V₂, então V₂ = 5×6/4 = 7,50 L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0085",
      "enunciado": "Um gás sofre transformação isotérmica: inicialmente P = 6 atm e V = 7 L; ao final, P = 1 atm. Qual é o volume final?",
      "alternativas": {
        "a": "12,00 L",
        "b": "46,20 L",
        "c": "7,00 L",
        "d": "42,00 L",
        "e": "1,17 L"
      },
      "resposta": "d",
      "explicacao": "Lei de Boyle (T constante): P₁V₁ = P₂V₂, então V₂ = 6×7/1 = 42 L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0086",
      "enunciado": "Um gás sofre transformação isotérmica: inicialmente P = 7 atm e V = 8 L; ao final, P = 2 atm. Qual é o volume final?",
      "alternativas": {
        "a": "8,00 L",
        "b": "13,00 L",
        "c": "112,00 L",
        "d": "2,29 L",
        "e": "28,00 L"
      },
      "resposta": "e",
      "explicacao": "Lei de Boyle (T constante): P₁V₁ = P₂V₂, então V₂ = 7×8/2 = 28 L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0087",
      "enunciado": "Um gás sofre transformação isotérmica: inicialmente P = 8 atm e V = 9 L; ao final, P = 3 atm. Qual é o volume final?",
      "alternativas": {
        "a": "24,00 L",
        "b": "14,00 L",
        "c": "9,00 L",
        "d": "3,38 L",
        "e": "216,00 L"
      },
      "resposta": "a",
      "explicacao": "Lei de Boyle (T constante): P₁V₁ = P₂V₂, então V₂ = 8×9/3 = 24 L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0088",
      "enunciado": "Um gás sofre transformação isotérmica: inicialmente P = 9 atm e V = 10 L; ao final, P = 4 atm. Qual é o volume final?",
      "alternativas": {
        "a": "15,00 L",
        "b": "22,50 L",
        "c": "360,00 L",
        "d": "10,00 L",
        "e": "4,44 L"
      },
      "resposta": "b",
      "explicacao": "Lei de Boyle (T constante): P₁V₁ = P₂V₂, então V₂ = 9×10/4 = 22,50 L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0089",
      "enunciado": "Um gás sofre transformação isotérmica: inicialmente P = 10 atm e V = 11 L; ao final, P = 1 atm. Qual é o volume final?",
      "alternativas": {
        "a": "1,10 L",
        "b": "20,00 L",
        "c": "110,00 L",
        "d": "11,00 L",
        "e": "121,00 L"
      },
      "resposta": "c",
      "explicacao": "Lei de Boyle (T constante): P₁V₁ = P₂V₂, então V₂ = 10×11/1 = 110 L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0090",
      "enunciado": "Um gás sofre transformação isotérmica: inicialmente P = 11 atm e V = 12 L; ao final, P = 2 atm. Qual é o volume final?",
      "alternativas": {
        "a": "21,00 L",
        "b": "12,00 L",
        "c": "264,00 L",
        "d": "66,00 L",
        "e": "2,18 L"
      },
      "resposta": "d",
      "explicacao": "Lei de Boyle (T constante): P₁V₁ = P₂V₂, então V₂ = 11×12/2 = 66 L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0091",
      "enunciado": "Uma onda tem frequência de 2 Hz e comprimento de onda de 3 m. Qual é sua velocidade de propagação?",
      "alternativas": {
        "a": "0,67 m/s",
        "b": "12,00 m/s",
        "c": "1,50 m/s",
        "d": "5,00 m/s",
        "e": "6,00 m/s"
      },
      "resposta": "e",
      "explicacao": "Equação fundamental da ondulatória: v = λ·f = 3 × 2 = 6 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0092",
      "enunciado": "Uma onda tem frequência de 3 Hz e comprimento de onda de 4 m. Qual é sua velocidade de propagação?",
      "alternativas": {
        "a": "12,00 m/s",
        "b": "7,00 m/s",
        "c": "0,75 m/s",
        "d": "1,33 m/s",
        "e": "24,00 m/s"
      },
      "resposta": "a",
      "explicacao": "Equação fundamental da ondulatória: v = λ·f = 4 × 3 = 12 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0093",
      "enunciado": "Uma onda tem frequência de 4 Hz e comprimento de onda de 5 m. Qual é sua velocidade de propagação?",
      "alternativas": {
        "a": "0,80 m/s",
        "b": "20,00 m/s",
        "c": "1,25 m/s",
        "d": "40,00 m/s",
        "e": "9,00 m/s"
      },
      "resposta": "b",
      "explicacao": "Equação fundamental da ondulatória: v = λ·f = 5 × 4 = 20 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0094",
      "enunciado": "Uma onda tem frequência de 5 Hz e comprimento de onda de 6 m. Qual é sua velocidade de propagação?",
      "alternativas": {
        "a": "60,00 m/s",
        "b": "11,00 m/s",
        "c": "30,00 m/s",
        "d": "0,83 m/s",
        "e": "1,20 m/s"
      },
      "resposta": "c",
      "explicacao": "Equação fundamental da ondulatória: v = λ·f = 6 × 5 = 30 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0095",
      "enunciado": "Uma onda tem frequência de 6 Hz e comprimento de onda de 7 m. Qual é sua velocidade de propagação?",
      "alternativas": {
        "a": "13,00 m/s",
        "b": "1,17 m/s",
        "c": "84,00 m/s",
        "d": "42,00 m/s",
        "e": "0,86 m/s"
      },
      "resposta": "d",
      "explicacao": "Equação fundamental da ondulatória: v = λ·f = 7 × 6 = 42 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0096",
      "enunciado": "Uma onda tem frequência de 7 Hz e comprimento de onda de 3 m. Qual é sua velocidade de propagação?",
      "alternativas": {
        "a": "2,33 m/s",
        "b": "10,00 m/s",
        "c": "0,43 m/s",
        "d": "42,00 m/s",
        "e": "21,00 m/s"
      },
      "resposta": "e",
      "explicacao": "Equação fundamental da ondulatória: v = λ·f = 3 × 7 = 21 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0097",
      "enunciado": "Uma onda tem frequência de 8 Hz e comprimento de onda de 4 m. Qual é sua velocidade de propagação?",
      "alternativas": {
        "a": "32,00 m/s",
        "b": "12,00 m/s",
        "c": "64,00 m/s",
        "d": "2,00 m/s",
        "e": "0,50 m/s"
      },
      "resposta": "a",
      "explicacao": "Equação fundamental da ondulatória: v = λ·f = 4 × 8 = 32 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0098",
      "enunciado": "Uma onda tem frequência de 9 Hz e comprimento de onda de 5 m. Qual é sua velocidade de propagação?",
      "alternativas": {
        "a": "14,00 m/s",
        "b": "45,00 m/s",
        "c": "1,80 m/s",
        "d": "0,56 m/s",
        "e": "90,00 m/s"
      },
      "resposta": "b",
      "explicacao": "Equação fundamental da ondulatória: v = λ·f = 5 × 9 = 45 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0099",
      "enunciado": "Uma onda tem frequência de 10 Hz e comprimento de onda de 6 m. Qual é sua velocidade de propagação?",
      "alternativas": {
        "a": "16,00 m/s",
        "b": "120,00 m/s",
        "c": "60,00 m/s",
        "d": "1,67 m/s",
        "e": "0,60 m/s"
      },
      "resposta": "c",
      "explicacao": "Equação fundamental da ondulatória: v = λ·f = 6 × 10 = 60 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0100",
      "enunciado": "Uma onda tem frequência de 11 Hz e comprimento de onda de 7 m. Qual é sua velocidade de propagação?",
      "alternativas": {
        "a": "154,00 m/s",
        "b": "18,00 m/s",
        "c": "1,57 m/s",
        "d": "77,00 m/s",
        "e": "0,64 m/s"
      },
      "resposta": "d",
      "explicacao": "Equação fundamental da ondulatória: v = λ·f = 7 × 11 = 77 m/s.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0101",
      "enunciado": "Um resistor de 3 Ω é ligado a uma tensão de 12 V. Qual é a corrente elétrica?",
      "alternativas": {
        "a": "0,25 A",
        "b": "15,00 A",
        "c": "36,00 A",
        "d": "2,00 A",
        "e": "4,00 A"
      },
      "resposta": "e",
      "explicacao": "1ª lei de Ohm: i = U/R = 12 / 3 = 4 A.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0102",
      "enunciado": "Um resistor de 4 Ω é ligado a uma tensão de 15 V. Qual é a corrente elétrica?",
      "alternativas": {
        "a": "3,75 A",
        "b": "1,88 A",
        "c": "19,00 A",
        "d": "0,27 A",
        "e": "60,00 A"
      },
      "resposta": "a",
      "explicacao": "1ª lei de Ohm: i = U/R = 15 / 4 = 3,75 A.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0103",
      "enunciado": "Um resistor de 5 Ω é ligado a uma tensão de 18 V. Qual é a corrente elétrica?",
      "alternativas": {
        "a": "23,00 A",
        "b": "3,60 A",
        "c": "0,28 A",
        "d": "1,80 A",
        "e": "90,00 A"
      },
      "resposta": "b",
      "explicacao": "1ª lei de Ohm: i = U/R = 18 / 5 = 3,60 A.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0104",
      "enunciado": "Um resistor de 6 Ω é ligado a uma tensão de 21 V. Qual é a corrente elétrica?",
      "alternativas": {
        "a": "1,75 A",
        "b": "126,00 A",
        "c": "3,50 A",
        "d": "27,00 A",
        "e": "0,29 A"
      },
      "resposta": "c",
      "explicacao": "1ª lei de Ohm: i = U/R = 21 / 6 = 3,50 A.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0105",
      "enunciado": "Um resistor de 7 Ω é ligado a uma tensão de 24 V. Qual é a corrente elétrica?",
      "alternativas": {
        "a": "1,71 A",
        "b": "0,29 A",
        "c": "168,00 A",
        "d": "3,43 A",
        "e": "31,00 A"
      },
      "resposta": "d",
      "explicacao": "1ª lei de Ohm: i = U/R = 24 / 7 = 3,43 A.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0106",
      "enunciado": "Um resistor de 8 Ω é ligado a uma tensão de 27 V. Qual é a corrente elétrica?",
      "alternativas": {
        "a": "35,00 A",
        "b": "1,69 A",
        "c": "0,30 A",
        "d": "216,00 A",
        "e": "3,38 A"
      },
      "resposta": "e",
      "explicacao": "1ª lei de Ohm: i = U/R = 27 / 8 = 3,38 A.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0107",
      "enunciado": "Um resistor de 3 Ω é ligado a uma tensão de 30 V. Qual é a corrente elétrica?",
      "alternativas": {
        "a": "10,00 A",
        "b": "0,10 A",
        "c": "5,00 A",
        "d": "33,00 A",
        "e": "90,00 A"
      },
      "resposta": "a",
      "explicacao": "1ª lei de Ohm: i = U/R = 30 / 3 = 10 A.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0108",
      "enunciado": "Um resistor de 4 Ω é ligado a uma tensão de 33 V. Qual é a corrente elétrica?",
      "alternativas": {
        "a": "4,12 A",
        "b": "8,25 A",
        "c": "132,00 A",
        "d": "37,00 A",
        "e": "0,12 A"
      },
      "resposta": "b",
      "explicacao": "1ª lei de Ohm: i = U/R = 33 / 4 = 8,25 A.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0109",
      "enunciado": "Um resistor de 5 Ω é ligado a uma tensão de 36 V. Qual é a corrente elétrica?",
      "alternativas": {
        "a": "41,00 A",
        "b": "3,60 A",
        "c": "7,20 A",
        "d": "180,00 A",
        "e": "0,14 A"
      },
      "resposta": "c",
      "explicacao": "1ª lei de Ohm: i = U/R = 36 / 5 = 7,20 A.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0110",
      "enunciado": "Um resistor de 6 Ω é ligado a uma tensão de 39 V. Qual é a corrente elétrica?",
      "alternativas": {
        "a": "0,15 A",
        "b": "234,00 A",
        "c": "45,00 A",
        "d": "6,50 A",
        "e": "3,25 A"
      },
      "resposta": "d",
      "explicacao": "1ª lei de Ohm: i = U/R = 39 / 6 = 6,50 A.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0111",
      "enunciado": "Considere um experimento 1 com ímã e espira condutora. Qual afirmação está de acordo com a indução eletromagnética?",
      "alternativas": {
        "a": "A indução eletromagnética independe da variação temporal do fluxo magnético.",
        "b": "Linhas de campo magnético começam em cargas positivas e terminam em cargas negativas.",
        "c": "Cargas elétricas em repouso sofrem força magnética máxima em qualquer situação.",
        "d": "Um campo magnético constante sempre produz corrente em qualquer circuito aberto.",
        "e": "A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica."
      },
      "resposta": "e",
      "explicacao": "A afirmação correta é: A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0112",
      "enunciado": "Considere um experimento 2 com ímã e espira condutora. Qual afirmação está de acordo com a indução eletromagnética?",
      "alternativas": {
        "a": "A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.",
        "b": "Linhas de campo magnético começam em cargas positivas e terminam em cargas negativas.",
        "c": "A indução eletromagnética independe da variação temporal do fluxo magnético.",
        "d": "Um campo magnético constante sempre produz corrente em qualquer circuito aberto.",
        "e": "Cargas elétricas em repouso sofrem força magnética máxima em qualquer situação."
      },
      "resposta": "a",
      "explicacao": "A afirmação correta é: A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0113",
      "enunciado": "Considere um experimento 3 com ímã e espira condutora. Qual afirmação está de acordo com a indução eletromagnética?",
      "alternativas": {
        "a": "Um campo magnético constante sempre produz corrente em qualquer circuito aberto.",
        "b": "A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.",
        "c": "Cargas elétricas em repouso sofrem força magnética máxima em qualquer situação.",
        "d": "Linhas de campo magnético começam em cargas positivas e terminam em cargas negativas.",
        "e": "A indução eletromagnética independe da variação temporal do fluxo magnético."
      },
      "resposta": "b",
      "explicacao": "A afirmação correta é: A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0114",
      "enunciado": "Considere um experimento 4 com ímã e espira condutora. Qual afirmação está de acordo com a indução eletromagnética?",
      "alternativas": {
        "a": "Um campo magnético constante sempre produz corrente em qualquer circuito aberto.",
        "b": "Cargas elétricas em repouso sofrem força magnética máxima em qualquer situação.",
        "c": "A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.",
        "d": "A indução eletromagnética independe da variação temporal do fluxo magnético.",
        "e": "Linhas de campo magnético começam em cargas positivas e terminam em cargas negativas."
      },
      "resposta": "c",
      "explicacao": "A afirmação correta é: A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0115",
      "enunciado": "Considere um experimento 5 com ímã e espira condutora. Qual afirmação está de acordo com a indução eletromagnética?",
      "alternativas": {
        "a": "A indução eletromagnética independe da variação temporal do fluxo magnético.",
        "b": "Um campo magnético constante sempre produz corrente em qualquer circuito aberto.",
        "c": "Linhas de campo magnético começam em cargas positivas e terminam em cargas negativas.",
        "d": "A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.",
        "e": "Cargas elétricas em repouso sofrem força magnética máxima em qualquer situação."
      },
      "resposta": "d",
      "explicacao": "A afirmação correta é: A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0116",
      "enunciado": "Considere um experimento 6 com ímã e espira condutora. Qual afirmação está de acordo com a indução eletromagnética?",
      "alternativas": {
        "a": "A indução eletromagnética independe da variação temporal do fluxo magnético.",
        "b": "Linhas de campo magnético começam em cargas positivas e terminam em cargas negativas.",
        "c": "Cargas elétricas em repouso sofrem força magnética máxima em qualquer situação.",
        "d": "Um campo magnético constante sempre produz corrente em qualquer circuito aberto.",
        "e": "A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica."
      },
      "resposta": "e",
      "explicacao": "A afirmação correta é: A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0117",
      "enunciado": "Considere um experimento 7 com ímã e espira condutora. Qual afirmação está de acordo com a indução eletromagnética?",
      "alternativas": {
        "a": "A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.",
        "b": "Linhas de campo magnético começam em cargas positivas e terminam em cargas negativas.",
        "c": "Um campo magnético constante sempre produz corrente em qualquer circuito aberto.",
        "d": "Cargas elétricas em repouso sofrem força magnética máxima em qualquer situação.",
        "e": "A indução eletromagnética independe da variação temporal do fluxo magnético."
      },
      "resposta": "a",
      "explicacao": "A afirmação correta é: A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0118",
      "enunciado": "Considere um experimento 8 com ímã e espira condutora. Qual afirmação está de acordo com a indução eletromagnética?",
      "alternativas": {
        "a": "Um campo magnético constante sempre produz corrente em qualquer circuito aberto.",
        "b": "A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.",
        "c": "A indução eletromagnética independe da variação temporal do fluxo magnético.",
        "d": "Cargas elétricas em repouso sofrem força magnética máxima em qualquer situação.",
        "e": "Linhas de campo magnético começam em cargas positivas e terminam em cargas negativas."
      },
      "resposta": "b",
      "explicacao": "A afirmação correta é: A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0119",
      "enunciado": "Considere um experimento 9 com ímã e espira condutora. Qual afirmação está de acordo com a indução eletromagnética?",
      "alternativas": {
        "a": "Linhas de campo magnético começam em cargas positivas e terminam em cargas negativas.",
        "b": "Um campo magnético constante sempre produz corrente em qualquer circuito aberto.",
        "c": "A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.",
        "d": "Cargas elétricas em repouso sofrem força magnética máxima em qualquer situação.",
        "e": "A indução eletromagnética independe da variação temporal do fluxo magnético."
      },
      "resposta": "c",
      "explicacao": "A afirmação correta é: A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0120",
      "enunciado": "Considere um experimento 10 com ímã e espira condutora. Qual afirmação está de acordo com a indução eletromagnética?",
      "alternativas": {
        "a": "Um campo magnético constante sempre produz corrente em qualquer circuito aberto.",
        "b": "Linhas de campo magnético começam em cargas positivas e terminam em cargas negativas.",
        "c": "Cargas elétricas em repouso sofrem força magnética máxima em qualquer situação.",
        "d": "A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.",
        "e": "A indução eletromagnética independe da variação temporal do fluxo magnético."
      },
      "resposta": "d",
      "explicacao": "A afirmação correta é: A variação do fluxo magnético através de um circuito pode induzir uma corrente elétrica.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-fis-0121",
      "enunciado": "Uma amostra radioativa de massa inicial 320 mg tem meia-vida de 2 anos. Qual massa resta após 4 anos?",
      "alternativas": {
        "a": "88 mg",
        "b": "96 mg",
        "c": "160 mg",
        "d": "316 mg",
        "e": "80 mg"
      },
      "resposta": "e",
      "explicacao": "Em 4 anos cabem 2 meias-vidas: m = m₀/2ⁿ = 320/2^2 = 80 mg.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0122",
      "enunciado": "Uma amostra radioativa de massa inicial 640 mg tem meia-vida de 3 anos. Qual massa resta após 9 anos?",
      "alternativas": {
        "a": "80,00 mg",
        "b": "160,00 mg",
        "c": "213,33 mg",
        "d": "631,00 mg",
        "e": "320,00 mg"
      },
      "resposta": "a",
      "explicacao": "Em 9 anos cabem 3 meias-vidas: m = m₀/2ⁿ = 640/2^3 = 80 mg.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0123",
      "enunciado": "Uma amostra radioativa de massa inicial 1280 mg tem meia-vida de 4 anos. Qual massa resta após 16 anos?",
      "alternativas": {
        "a": "160 mg",
        "b": "80 mg",
        "c": "640 mg",
        "d": "1.264 mg",
        "e": "320 mg"
      },
      "resposta": "b",
      "explicacao": "Em 16 anos cabem 4 meias-vidas: m = m₀/2ⁿ = 1.280/2^4 = 80 mg.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0124",
      "enunciado": "Uma amostra radioativa de massa inicial 2560 mg tem meia-vida de 5 anos. Qual massa resta após 25 anos?",
      "alternativas": {
        "a": "1.280 mg",
        "b": "160 mg",
        "c": "80 mg",
        "d": "2.535 mg",
        "e": "512 mg"
      },
      "resposta": "c",
      "explicacao": "Em 25 anos cabem 5 meias-vidas: m = m₀/2ⁿ = 2.560/2^5 = 80 mg.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0125",
      "enunciado": "Uma amostra radioativa de massa inicial 320 mg tem meia-vida de 6 anos. Qual massa resta após 12 anos?",
      "alternativas": {
        "a": "96 mg",
        "b": "308 mg",
        "c": "88 mg",
        "d": "80 mg",
        "e": "160 mg"
      },
      "resposta": "d",
      "explicacao": "Em 12 anos cabem 2 meias-vidas: m = m₀/2ⁿ = 320/2^2 = 80 mg.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0126",
      "enunciado": "Uma amostra radioativa de massa inicial 640 mg tem meia-vida de 2 anos. Qual massa resta após 6 anos?",
      "alternativas": {
        "a": "634,00 mg",
        "b": "213,33 mg",
        "c": "160,00 mg",
        "d": "320,00 mg",
        "e": "80,00 mg"
      },
      "resposta": "e",
      "explicacao": "Em 6 anos cabem 3 meias-vidas: m = m₀/2ⁿ = 640/2^3 = 80 mg.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0127",
      "enunciado": "Uma amostra radioativa de massa inicial 1280 mg tem meia-vida de 3 anos. Qual massa resta após 12 anos?",
      "alternativas": {
        "a": "80 mg",
        "b": "1.268 mg",
        "c": "320 mg",
        "d": "640 mg",
        "e": "160 mg"
      },
      "resposta": "a",
      "explicacao": "Em 12 anos cabem 4 meias-vidas: m = m₀/2ⁿ = 1.280/2^4 = 80 mg.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0128",
      "enunciado": "Uma amostra radioativa de massa inicial 2560 mg tem meia-vida de 4 anos. Qual massa resta após 20 anos?",
      "alternativas": {
        "a": "1.280 mg",
        "b": "80 mg",
        "c": "512 mg",
        "d": "2.540 mg",
        "e": "160 mg"
      },
      "resposta": "b",
      "explicacao": "Em 20 anos cabem 5 meias-vidas: m = m₀/2ⁿ = 2.560/2^5 = 80 mg.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0129",
      "enunciado": "Uma amostra radioativa de massa inicial 320 mg tem meia-vida de 5 anos. Qual massa resta após 10 anos?",
      "alternativas": {
        "a": "96 mg",
        "b": "160 mg",
        "c": "80 mg",
        "d": "310 mg",
        "e": "88 mg"
      },
      "resposta": "c",
      "explicacao": "Em 10 anos cabem 2 meias-vidas: m = m₀/2ⁿ = 320/2^2 = 80 mg.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-fis-0130",
      "enunciado": "Uma amostra radioativa de massa inicial 640 mg tem meia-vida de 6 anos. Qual massa resta após 18 anos?",
      "alternativas": {
        "a": "160 mg",
        "b": "213,33 mg Química Questões 1241 a 1370 | 130 itens",
        "c": "622 mg",
        "d": "80 mg",
        "e": "320 mg"
      },
      "resposta": "d",
      "explicacao": "Em 18 anos cabem 3 meias-vidas: m = m₀/2ⁿ = 640/2^3 = 80 mg.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0001",
      "enunciado": "Quantos gramas correspondem a 1 mol de água, cuja massa molar é 18 g/mol?",
      "alternativas": {
        "a": "6,02 g",
        "b": "19,80 g",
        "c": "19,00 g",
        "d": "36,00 g",
        "e": "18,00 g"
      },
      "resposta": "e",
      "explicacao": "m = n·M = 1 mol × 18 g/mol = 18 g.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0002",
      "enunciado": "Quantos gramas correspondem a 2 mol de água, cuja massa molar é 18 g/mol?",
      "alternativas": {
        "a": "36,00 g",
        "b": "72,00 g",
        "c": "9,00 g",
        "d": "20,00 g",
        "e": "12,04 g"
      },
      "resposta": "a",
      "explicacao": "m = n·M = 2 mol × 18 g/mol = 36 g.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0003",
      "enunciado": "Quantos gramas correspondem a 3 mol de água, cuja massa molar é 18 g/mol?",
      "alternativas": {
        "a": "18,06 g",
        "b": "54,00 g",
        "c": "108,00 g",
        "d": "21,00 g",
        "e": "6,00 g"
      },
      "resposta": "b",
      "explicacao": "m = n·M = 3 mol × 18 g/mol = 54 g.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0004",
      "enunciado": "Quantos gramas correspondem a 4 mol de água, cuja massa molar é 18 g/mol?",
      "alternativas": {
        "a": "4,50 g",
        "b": "144,00 g",
        "c": "72,00 g",
        "d": "22,00 g",
        "e": "24,08 g"
      },
      "resposta": "c",
      "explicacao": "m = n·M = 4 mol × 18 g/mol = 72 g.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0005",
      "enunciado": "Quantos gramas correspondem a 5 mol de água, cuja massa molar é 18 g/mol?",
      "alternativas": {
        "a": "180,00 g",
        "b": "23,00 g",
        "c": "3,60 g",
        "d": "90,00 g",
        "e": "30,10 g"
      },
      "resposta": "d",
      "explicacao": "m = n·M = 5 mol × 18 g/mol = 90 g.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0006",
      "enunciado": "Quantos gramas correspondem a 6 mol de água, cuja massa molar é 18 g/mol?",
      "alternativas": {
        "a": "3,00 g",
        "b": "24,00 g",
        "c": "36,12 g",
        "d": "216,00 g",
        "e": "108,00 g"
      },
      "resposta": "e",
      "explicacao": "m = n·M = 6 mol × 18 g/mol = 108 g.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0007",
      "enunciado": "Quantos gramas correspondem a 7 mol de água, cuja massa molar é 18 g/mol?",
      "alternativas": {
        "a": "126,00 g",
        "b": "25,00 g",
        "c": "2,57 g",
        "d": "252,00 g",
        "e": "42,14 g"
      },
      "resposta": "a",
      "explicacao": "m = n·M = 7 mol × 18 g/mol = 126 g.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0008",
      "enunciado": "Quantos gramas correspondem a 8 mol de água, cuja massa molar é 18 g/mol?",
      "alternativas": {
        "a": "2,25 g",
        "b": "144,00 g",
        "c": "288,00 g",
        "d": "48,16 g",
        "e": "26,00 g"
      },
      "resposta": "b",
      "explicacao": "m = n·M = 8 mol × 18 g/mol = 144 g.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0009",
      "enunciado": "Quantos gramas correspondem a 9 mol de água, cuja massa molar é 18 g/mol?",
      "alternativas": {
        "a": "2,00 g",
        "b": "54,18 g",
        "c": "162,00 g",
        "d": "27,00 g",
        "e": "324,00 g"
      },
      "resposta": "c",
      "explicacao": "m = n·M = 9 mol × 18 g/mol = 162 g.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0010",
      "enunciado": "Quantos gramas correspondem a 10 mol de água, cuja massa molar é 18 g/mol?",
      "alternativas": {
        "a": "60,20 g",
        "b": "360,00 g",
        "c": "28,00 g",
        "d": "180,00 g",
        "e": "1,80 g"
      },
      "resposta": "d",
      "explicacao": "m = n·M = 10 mol × 18 g/mol = 180 g.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0011",
      "enunciado": "Um átomo neutro possui número atômico 6 e número de massa 12. Quantos prótons, elétrons e nêutrons ele possui, respectivamente?",
      "alternativas": {
        "a": "7, 6 e 6",
        "b": "12, 6 e 6",
        "c": "6, 6 e 7",
        "d": "6, 12 e 6",
        "e": "6, 6 e 6"
      },
      "resposta": "e",
      "explicacao": "O número atômico dá os prótons (Z = 6); o átomo é neutro, logo tem 6 elétrons; os nêutrons saem de A − Z = 12 − 6 = 6.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0012",
      "enunciado": "Um átomo neutro possui número atômico 7 e número de massa 14. Quantos prótons, elétrons e nêutrons ele possui, respectivamente?",
      "alternativas": {
        "a": "7, 7 e 7",
        "b": "7, 14 e 7",
        "c": "8, 7 e 7",
        "d": "14, 7 e 7",
        "e": "7, 7 e 8"
      },
      "resposta": "a",
      "explicacao": "O número atômico dá os prótons (Z = 7); o átomo é neutro, logo tem 7 elétrons; os nêutrons saem de A − Z = 14 − 7 = 7.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0013",
      "enunciado": "Um átomo neutro possui número atômico 8 e número de massa 16. Quantos prótons, elétrons e nêutrons ele possui, respectivamente?",
      "alternativas": {
        "a": "9, 8 e 8",
        "b": "8, 8 e 8",
        "c": "8, 16 e 8",
        "d": "16, 8 e 8",
        "e": "8, 8 e 9"
      },
      "resposta": "b",
      "explicacao": "O número atômico dá os prótons (Z = 8); o átomo é neutro, logo tem 8 elétrons; os nêutrons saem de A − Z = 16 − 8 = 8.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0014",
      "enunciado": "Um átomo neutro possui número atômico 9 e número de massa 18. Quantos prótons, elétrons e nêutrons ele possui, respectivamente?",
      "alternativas": {
        "a": "10, 9 e 9",
        "b": "9, 18 e 9",
        "c": "9, 9 e 9",
        "d": "9, 9 e 10",
        "e": "18, 9 e 9"
      },
      "resposta": "c",
      "explicacao": "O número atômico dá os prótons (Z = 9); o átomo é neutro, logo tem 9 elétrons; os nêutrons saem de A − Z = 18 − 9 = 9.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0015",
      "enunciado": "Um átomo neutro possui número atômico 10 e número de massa 20. Quantos prótons, elétrons e nêutrons ele possui, respectivamente?",
      "alternativas": {
        "a": "11, 10 e 10",
        "b": "10, 10 e 11",
        "c": "20, 10 e 10",
        "d": "10, 10 e 10",
        "e": "10, 20 e 10"
      },
      "resposta": "d",
      "explicacao": "O número atômico dá os prótons (Z = 10); o átomo é neutro, logo tem 10 elétrons; os nêutrons saem de A − Z = 20 − 10 = 10.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0016",
      "enunciado": "Um átomo neutro possui número atômico 11 e número de massa 17. Quantos prótons, elétrons e nêutrons ele possui, respectivamente?",
      "alternativas": {
        "a": "12, 11 e 6",
        "b": "17, 11 e 6",
        "c": "11, 11 e 7",
        "d": "11, 17 e 6",
        "e": "11, 11 e 6"
      },
      "resposta": "e",
      "explicacao": "O número atômico dá os prótons (Z = 11); o átomo é neutro, logo tem 11 elétrons; os nêutrons saem de A − Z = 17 − 11 = 6.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0017",
      "enunciado": "Um átomo neutro possui número atômico 12 e número de massa 19. Quantos prótons, elétrons e nêutrons ele possui, respectivamente?",
      "alternativas": {
        "a": "12, 12 e 7",
        "b": "13, 12 e 7",
        "c": "19, 12 e 7",
        "d": "12, 19 e 7",
        "e": "12, 12 e 8"
      },
      "resposta": "a",
      "explicacao": "O número atômico dá os prótons (Z = 12); o átomo é neutro, logo tem 12 elétrons; os nêutrons saem de A − Z = 19 − 12 = 7.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0018",
      "enunciado": "Um átomo neutro possui número atômico 13 e número de massa 21. Quantos prótons, elétrons e nêutrons ele possui, respectivamente?",
      "alternativas": {
        "a": "21, 13 e 8",
        "b": "13, 13 e 8",
        "c": "13, 13 e 9",
        "d": "14, 13 e 8",
        "e": "13, 21 e 8"
      },
      "resposta": "b",
      "explicacao": "O número atômico dá os prótons (Z = 13); o átomo é neutro, logo tem 13 elétrons; os nêutrons saem de A − Z = 21 − 13 = 8.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0019",
      "enunciado": "Um átomo neutro possui número atômico 14 e número de massa 23. Quantos prótons, elétrons e nêutrons ele possui, respectivamente?",
      "alternativas": {
        "a": "23, 14 e 9",
        "b": "14, 23 e 9",
        "c": "14, 14 e 9",
        "d": "15, 14 e 9",
        "e": "14, 14 e 10"
      },
      "resposta": "c",
      "explicacao": "O número atômico dá os prótons (Z = 14); o átomo é neutro, logo tem 14 elétrons; os nêutrons saem de A − Z = 23 − 14 = 9.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0020",
      "enunciado": "Um átomo neutro possui número atômico 15 e número de massa 25. Quantos prótons, elétrons e nêutrons ele possui, respectivamente?",
      "alternativas": {
        "a": "15, 25 e 10",
        "b": "16, 15 e 10",
        "c": "25, 15 e 10",
        "d": "15, 15 e 10",
        "e": "15, 15 e 11"
      },
      "resposta": "d",
      "explicacao": "O número atômico dá os prótons (Z = 15); o átomo é neutro, logo tem 15 elétrons; os nêutrons saem de A − Z = 25 − 15 = 10.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0021",
      "enunciado": "Sobre raio atômico, assinale a afirmação correta no contexto da tabela periódica.",
      "alternativas": {
        "a": "é invariável entre todos os elementos",
        "b": "não apresenta relação com a estrutura eletrônica",
        "c": "é igual para todos os elementos de um período",
        "d": "depende apenas do número de nêutrons",
        "e": "tende a aumentar de cima para baixo em um grupo"
      },
      "resposta": "e",
      "explicacao": "A afirmação correta é: tende a aumentar de cima para baixo em um grupo. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0022",
      "enunciado": "Sobre eletronegatividade, assinale a afirmação correta no contexto da tabela periódica.",
      "alternativas": {
        "a": "tende a aumentar em direção ao canto superior direito da tabela",
        "b": "não apresenta relação com a estrutura eletrônica",
        "c": "depende apenas do número de nêutrons",
        "d": "é invariável entre todos os elementos",
        "e": "é igual para todos os elementos de um período"
      },
      "resposta": "a",
      "explicacao": "A afirmação correta é: tende a aumentar em direção ao canto superior direito da tabela. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0023",
      "enunciado": "Sobre energia de ionização, assinale a afirmação correta no contexto da tabela periódica.",
      "alternativas": {
        "a": "é invariável entre todos os elementos",
        "b": "é a energia necessária para remover um elétron de um átomo isolado no estado gasoso",
        "c": "é igual para todos os elementos de um período",
        "d": "depende apenas do número de nêutrons",
        "e": "não apresenta relação com a estrutura eletrônica"
      },
      "resposta": "b",
      "explicacao": "A afirmação correta é: é a energia necessária para remover um elétron de um átomo isolado no estado gasoso. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0024",
      "enunciado": "Sobre elementos de um mesmo grupo, assinale a afirmação correta no contexto da tabela periódica.",
      "alternativas": {
        "a": "é invariável entre todos os elementos",
        "b": "não apresenta relação com a estrutura eletrônica",
        "c": "costumam apresentar propriedades químicas semelhantes",
        "d": "depende apenas do número de nêutrons",
        "e": "é igual para todos os elementos de um período"
      },
      "resposta": "c",
      "explicacao": "A afirmação correta é: costumam apresentar propriedades químicas semelhantes. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0025",
      "enunciado": "Sobre metais alcalinos, assinale a afirmação correta no contexto da tabela periódica.",
      "alternativas": {
        "a": "não apresenta relação com a estrutura eletrônica",
        "b": "depende apenas do número de nêutrons",
        "c": "é invariável entre todos os elementos",
        "d": "possuem um elétron na camada de valência",
        "e": "é igual para todos os elementos de um período"
      },
      "resposta": "d",
      "explicacao": "A afirmação correta é: possuem um elétron na camada de valência. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0026",
      "enunciado": "Qual descrição caracteriza adequadamente NaCl?",
      "alternativas": {
        "a": "estrutura sem elétrons de valência",
        "b": "apenas forças nucleares entre átomos",
        "c": "ligação formada exclusivamente por nêutrons",
        "d": "ausência total de interação eletrostática",
        "e": "ligação predominantemente iônica"
      },
      "resposta": "e",
      "explicacao": "A afirmação correta é: ligação predominantemente iônica. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0027",
      "enunciado": "Qual descrição caracteriza adequadamente O2?",
      "alternativas": {
        "a": "ligação covalente entre átomos iguais",
        "b": "apenas forças nucleares entre átomos",
        "c": "estrutura sem elétrons de valência",
        "d": "ausência total de interação eletrostática",
        "e": "ligação formada exclusivamente por nêutrons"
      },
      "resposta": "a",
      "explicacao": "A afirmação correta é: ligação covalente entre átomos iguais. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0028",
      "enunciado": "Qual descrição caracteriza adequadamente H2O?",
      "alternativas": {
        "a": "estrutura sem elétrons de valência",
        "b": "molécula polar com ligações covalentes",
        "c": "ausência total de interação eletrostática",
        "d": "ligação formada exclusivamente por nêutrons",
        "e": "apenas forças nucleares entre átomos"
      },
      "resposta": "b",
      "explicacao": "A afirmação correta é: molécula polar com ligações covalentes. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0029",
      "enunciado": "Qual descrição caracteriza adequadamente cobre metálico?",
      "alternativas": {
        "a": "ausência total de interação eletrostática",
        "b": "estrutura sem elétrons de valência",
        "c": "ligação metálica com elétrons deslocalizados",
        "d": "ligação formada exclusivamente por nêutrons",
        "e": "apenas forças nucleares entre átomos"
      },
      "resposta": "c",
      "explicacao": "A afirmação correta é: ligação metálica com elétrons deslocalizados. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0030",
      "enunciado": "Qual descrição caracteriza adequadamente CO2?",
      "alternativas": {
        "a": "estrutura sem elétrons de valência",
        "b": "ausência total de interação eletrostática",
        "c": "ligação formada exclusivamente por nêutrons",
        "d": "ligações covalentes em uma molécula globalmente apolar",
        "e": "apenas forças nucleares entre átomos"
      },
      "resposta": "d",
      "explicacao": "A afirmação correta é: ligações covalentes em uma molécula globalmente apolar. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0031",
      "enunciado": "Uma solução contém 20 g de soluto em 2 L de solução. Qual é a concentração comum em g/L?",
      "alternativas": {
        "a": "40,00 g/L",
        "b": "22,00 g/L",
        "c": "5,00 g/L",
        "d": "0,10 g/L",
        "e": "10,00 g/L"
      },
      "resposta": "e",
      "explicacao": "Concentração comum: C = m/V = 20 g / 2 L = 10 g/L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0032",
      "enunciado": "Uma solução contém 25 g de soluto em 3 L de solução. Qual é a concentração comum em g/L?",
      "alternativas": {
        "a": "8,33 g/L",
        "b": "28,00 g/L",
        "c": "75,00 g/L",
        "d": "0,12 g/L",
        "e": "4,17 g/L"
      },
      "resposta": "a",
      "explicacao": "Concentração comum: C = m/V = 25 g / 3 L = 8,33 g/L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0033",
      "enunciado": "Uma solução contém 30 g de soluto em 4 L de solução. Qual é a concentração comum em g/L?",
      "alternativas": {
        "a": "34,00 g/L",
        "b": "7,50 g/L",
        "c": "3,75 g/L",
        "d": "120,00 g/L",
        "e": "0,13 g/L"
      },
      "resposta": "b",
      "explicacao": "Concentração comum: C = m/V = 30 g / 4 L = 7,50 g/L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0034",
      "enunciado": "Uma solução contém 35 g de soluto em 5 L de solução. Qual é a concentração comum em g/L?",
      "alternativas": {
        "a": "175,00 g/L",
        "b": "3,50 g/L",
        "c": "7,00 g/L",
        "d": "40,00 g/L",
        "e": "0,14 g/L"
      },
      "resposta": "c",
      "explicacao": "Concentração comum: C = m/V = 35 g / 5 L = 7 g/L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0035",
      "enunciado": "Uma solução contém 40 g de soluto em 2 L de solução. Qual é a concentração comum em g/L?",
      "alternativas": {
        "a": "42,00 g/L",
        "b": "10,00 g/L",
        "c": "0,05 g/L",
        "d": "20,00 g/L",
        "e": "80,00 g/L"
      },
      "resposta": "d",
      "explicacao": "Concentração comum: C = m/V = 40 g / 2 L = 20 g/L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0036",
      "enunciado": "Uma solução contém 45 g de soluto em 3 L de solução. Qual é a concentração comum em g/L?",
      "alternativas": {
        "a": "7,50 g/L",
        "b": "135,00 g/L",
        "c": "48,00 g/L",
        "d": "0,07 g/L",
        "e": "15,00 g/L"
      },
      "resposta": "e",
      "explicacao": "Concentração comum: C = m/V = 45 g / 3 L = 15 g/L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0037",
      "enunciado": "Uma solução contém 50 g de soluto em 4 L de solução. Qual é a concentração comum em g/L?",
      "alternativas": {
        "a": "12,50 g/L",
        "b": "6,25 g/L",
        "c": "54,00 g/L",
        "d": "200,00 g/L",
        "e": "0,08 g/L"
      },
      "resposta": "a",
      "explicacao": "Concentração comum: C = m/V = 50 g / 4 L = 12,50 g/L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0038",
      "enunciado": "Uma solução contém 55 g de soluto em 5 L de solução. Qual é a concentração comum em g/L?",
      "alternativas": {
        "a": "275,00 g/L",
        "b": "11,00 g/L",
        "c": "60,00 g/L",
        "d": "0,09 g/L",
        "e": "5,50 g/L"
      },
      "resposta": "b",
      "explicacao": "Concentração comum: C = m/V = 55 g / 5 L = 11 g/L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0039",
      "enunciado": "Uma solução contém 60 g de soluto em 2 L de solução. Qual é a concentração comum em g/L?",
      "alternativas": {
        "a": "15,00 g/L",
        "b": "0,03 g/L",
        "c": "30,00 g/L",
        "d": "120,00 g/L",
        "e": "62,00 g/L"
      },
      "resposta": "c",
      "explicacao": "Concentração comum: C = m/V = 60 g / 2 L = 30 g/L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0040",
      "enunciado": "Uma solução contém 65 g de soluto em 3 L de solução. Qual é a concentração comum em g/L?",
      "alternativas": {
        "a": "195,00 g/L",
        "b": "0,05 g/L",
        "c": "68,00 g/L",
        "d": "21,67 g/L",
        "e": "10,83 g/L"
      },
      "resposta": "d",
      "explicacao": "Concentração comum: C = m/V = 65 g / 3 L = 21,67 g/L.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0041",
      "enunciado": "Uma solução aquosa apresenta [H+] = 1 × 10^-2 mol/L. Qual é o pH, admitindo comportamento ideal?",
      "alternativas": {
        "a": "3",
        "b": "12",
        "c": "100",
        "d": "1",
        "e": "2"
      },
      "resposta": "e",
      "explicacao": "pH = −log[H⁺] = −log(10^−2) = 2. Como está abaixo de 7, a solução é ácida.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0042",
      "enunciado": "Uma solução aquosa apresenta [H+] = 1 × 10^-3 mol/L. Qual é o pH, admitindo comportamento ideal?",
      "alternativas": {
        "a": "3",
        "b": "4",
        "c": "11",
        "d": "2",
        "e": "1000"
      },
      "resposta": "a",
      "explicacao": "pH = −log[H⁺] = −log(10^−3) = 3. Como está abaixo de 7, a solução é ácida.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0043",
      "enunciado": "Uma solução aquosa apresenta [H+] = 1 × 10^-4 mol/L. Qual é o pH, admitindo comportamento ideal?",
      "alternativas": {
        "a": "3",
        "b": "4",
        "c": "5",
        "d": "10000",
        "e": "10"
      },
      "resposta": "b",
      "explicacao": "pH = −log[H⁺] = −log(10^−4) = 4. Como está abaixo de 7, a solução é ácida.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0044",
      "enunciado": "Uma solução aquosa apresenta [H+] = 1 × 10^-5 mol/L. Qual é o pH, admitindo comportamento ideal?",
      "alternativas": {
        "a": "9",
        "b": "6",
        "c": "5",
        "d": "100000",
        "e": "4"
      },
      "resposta": "c",
      "explicacao": "pH = −log[H⁺] = −log(10^−5) = 5. Como está abaixo de 7, a solução é ácida.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0045",
      "enunciado": "Uma solução aquosa apresenta [H+] = 1 × 10^-6 mol/L. Qual é o pH, admitindo comportamento ideal?",
      "alternativas": {
        "a": "8",
        "b": "7",
        "c": "5",
        "d": "6",
        "e": "1000000"
      },
      "resposta": "d",
      "explicacao": "pH = −log[H⁺] = −log(10^−6) = 6. Como está abaixo de 7, a solução é ácida.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0046",
      "enunciado": "Uma solução aquosa apresenta [H+] = 1 × 10^-7 mol/L. Qual é o pH, admitindo comportamento ideal?",
      "alternativas": {
        "a": "8",
        "b": "9",
        "c": "10000000",
        "d": "6",
        "e": "7"
      },
      "resposta": "e",
      "explicacao": "pH = −log[H⁺] = −log(10^−7) = 7. Como está abaixo de 7, a solução é ácida.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0047",
      "enunciado": "Um gás ideal com 1 mol ocupa 10 L a 300 K. Usando R = 0,082 atm·L·mol-^1·K-^1, qual é a pressão?",
      "alternativas": {
        "a": "2,46 atm",
        "b": "30,00 atm",
        "c": "1,23 atm",
        "d": "246,00 atm",
        "e": "24,60 atm"
      },
      "resposta": "a",
      "explicacao": "Equação de Clapeyron: PV = nRT, então P = nRT/V = 1×0,082×300/10 = 2,46 atm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0048",
      "enunciado": "Um gás ideal com 2 mol ocupa 11 L a 310 K. Usando R = 0,082 atm·L·mol-^1·K-^1, qual é a pressão?",
      "alternativas": {
        "a": "12,71 atm",
        "b": "4,62 atm",
        "c": "56,36 atm",
        "d": "559,24 atm",
        "e": "2,31 atm"
      },
      "resposta": "b",
      "explicacao": "Equação de Clapeyron: PV = nRT, então P = nRT/V = 2×0,082×310/11 = 4,62 atm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0049",
      "enunciado": "Um gás ideal com 3 mol ocupa 12 L a 320 K. Usando R = 0,082 atm·L·mol-^1·K-^1, qual é a pressão?",
      "alternativas": {
        "a": "80,00 atm",
        "b": "3,28 atm",
        "c": "6,56 atm",
        "d": "944,64 atm",
        "e": "8,75 atm"
      },
      "resposta": "c",
      "explicacao": "Equação de Clapeyron: PV = nRT, então P = nRT/V = 3×0,082×320/12 = 6,56 atm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0050",
      "enunciado": "Um gás ideal com 4 mol ocupa 13 L a 330 K. Usando R = 0,082 atm·L·mol-^1·K-^1, qual é a pressão?",
      "alternativas": {
        "a": "4,16 atm",
        "b": "1.407,12 atm",
        "c": "6,77 atm",
        "d": "8,33 atm",
        "e": "101,54 atm"
      },
      "resposta": "d",
      "explicacao": "Equação de Clapeyron: PV = nRT, então P = nRT/V = 4×0,082×330/13 = 8,33 atm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0051",
      "enunciado": "Um gás ideal com 1 mol ocupa 14 L a 340 K. Usando R = 0,082 atm·L·mol-^1·K-^1, qual é a pressão?",
      "alternativas": {
        "a": "24,29 atm",
        "b": "390,32 atm",
        "c": "27,88 atm",
        "d": "1,00 atm",
        "e": "1,99 atm"
      },
      "resposta": "e",
      "explicacao": "Equação de Clapeyron: PV = nRT, então P = nRT/V = 1×0,082×340/14 = 1,99 atm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0052",
      "enunciado": "Um gás ideal com 2 mol ocupa 15 L a 350 K. Usando R = 0,082 atm·L·mol-^1·K-^1, qual é a pressão?",
      "alternativas": {
        "a": "3,83 atm",
        "b": "1,91 atm",
        "c": "861,00 atm",
        "d": "14,35 atm",
        "e": "46,67 atm"
      },
      "resposta": "a",
      "explicacao": "Equação de Clapeyron: PV = nRT, então P = nRT/V = 2×0,082×350/15 = 3,83 atm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0053",
      "enunciado": "Um gás ideal com 3 mol ocupa 16 L a 360 K. Usando R = 0,082 atm·L·mol-^1·K-^1, qual é a pressão?",
      "alternativas": {
        "a": "9,84 atm",
        "b": "5,54 atm",
        "c": "2,77 atm",
        "d": "67,50 atm",
        "e": "1.416,96 atm"
      },
      "resposta": "b",
      "explicacao": "Equação de Clapeyron: PV = nRT, então P = nRT/V = 3×0,082×360/16 = 5,54 atm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0054",
      "enunciado": "Um gás ideal com 4 mol ocupa 17 L a 370 K. Usando R = 0,082 atm·L·mol-^1·K-^1, qual é a pressão?",
      "alternativas": {
        "a": "3,57 atm",
        "b": "7,58 atm",
        "c": "7,14 atm",
        "d": "87,06 atm",
        "e": "2.063,12 atm"
      },
      "resposta": "c",
      "explicacao": "Equação de Clapeyron: PV = nRT, então P = nRT/V = 4×0,082×370/17 = 7,14 atm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0055",
      "enunciado": "Um gás ideal com 1 mol ocupa 18 L a 380 K. Usando R = 0,082 atm·L·mol-^1·K-^1, qual é a pressão?",
      "alternativas": {
        "a": "0,87 atm",
        "b": "560,88 atm",
        "c": "31,16 atm",
        "d": "1,73 atm",
        "e": "21,11 atm"
      },
      "resposta": "d",
      "explicacao": "Equação de Clapeyron: PV = nRT, então P = nRT/V = 1×0,082×380/18 = 1,73 atm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0056",
      "enunciado": "Um gás ideal com 2 mol ocupa 19 L a 390 K. Usando R = 0,082 atm·L·mol-^1·K-^1, qual é a pressão?",
      "alternativas": {
        "a": "41,05 atm",
        "b": "15,99 atm",
        "c": "1.215,24 atm",
        "d": "1,68 atm",
        "e": "3,37 atm"
      },
      "resposta": "e",
      "explicacao": "Equação de Clapeyron: PV = nRT, então P = nRT/V = 2×0,082×390/19 = 3,37 atm.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "dificil"
    },
    {
      "id": "xtr-qui-0057",
      "enunciado": "Uma amostra de 50 g de água recebe calor suficiente para variar sua temperatura em 10 °C. Use c = 4,2 J/(g·°C). Qual é o calor absorvido?",
      "alternativas": {
        "a": "2.100 J",
        "b": "1.050 J",
        "c": "500 J",
        "d": "42 J",
        "e": "210 J"
      },
      "resposta": "a",
      "explicacao": "Q = m·c·ΔT = 50 × 4,2 × 10 = 2.100 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0058",
      "enunciado": "Uma amostra de 60 g de água recebe calor suficiente para variar sua temperatura em 11 °C. Use c = 4,2 J/(g·°C). Qual é o calor absorvido?",
      "alternativas": {
        "a": "1.386,00 J",
        "b": "2.772,00 J",
        "c": "46,20 J",
        "d": "252,00 J",
        "e": "660,00 J"
      },
      "resposta": "b",
      "explicacao": "Q = m·c·ΔT = 60 × 4,2 × 11 = 2.772 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0059",
      "enunciado": "Uma amostra de 70 g de água recebe calor suficiente para variar sua temperatura em 12 °C. Use c = 4,2 J/(g·°C). Qual é o calor absorvido?",
      "alternativas": {
        "a": "294,00 J",
        "b": "1.764,00 J",
        "c": "3.528,00 J",
        "d": "50,40 J",
        "e": "840,00 J"
      },
      "resposta": "c",
      "explicacao": "Q = m·c·ΔT = 70 × 4,2 × 12 = 3.528 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0060",
      "enunciado": "Uma amostra de 80 g de água recebe calor suficiente para variar sua temperatura em 13 °C. Use c = 4,2 J/(g·°C). Qual é o calor absorvido?",
      "alternativas": {
        "a": "54,60 J",
        "b": "1.040,00 J",
        "c": "336,00 J",
        "d": "4.368,00 J",
        "e": "2.184,00 J"
      },
      "resposta": "d",
      "explicacao": "Q = m·c·ΔT = 80 × 4,2 × 13 = 4.368 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0061",
      "enunciado": "Uma amostra de 90 g de água recebe calor suficiente para variar sua temperatura em 14 °C. Use c = 4,2 J/(g·°C). Qual é o calor absorvido?",
      "alternativas": {
        "a": "378,00 J",
        "b": "2.646,00 J",
        "c": "58,80 J",
        "d": "1.260,00 J",
        "e": "5.292,00 J"
      },
      "resposta": "e",
      "explicacao": "Q = m·c·ΔT = 90 × 4,2 × 14 = 5.292 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0062",
      "enunciado": "Uma amostra de 100 g de água recebe calor suficiente para variar sua temperatura em 15 °C. Use c = 4,2 J/(g·°C). Qual é o calor absorvido?",
      "alternativas": {
        "a": "6.300 J",
        "b": "1.500 J",
        "c": "420 J",
        "d": "3.150 J",
        "e": "63 J"
      },
      "resposta": "a",
      "explicacao": "Q = m·c·ΔT = 100 × 4,2 × 15 = 6.300 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0063",
      "enunciado": "Uma amostra de 110 g de água recebe calor suficiente para variar sua temperatura em 16 °C. Use c = 4,2 J/(g·°C). Qual é o calor absorvido?",
      "alternativas": {
        "a": "462,00 J",
        "b": "7.392,00 J",
        "c": "3.696,00 J",
        "d": "67,20 J",
        "e": "1.760,00 J"
      },
      "resposta": "b",
      "explicacao": "Q = m·c·ΔT = 110 × 4,2 × 16 = 7.392 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0064",
      "enunciado": "Uma amostra de 120 g de água recebe calor suficiente para variar sua temperatura em 17 °C. Use c = 4,2 J/(g·°C). Qual é o calor absorvido?",
      "alternativas": {
        "a": "4.284,00 J",
        "b": "2.040,00 J",
        "c": "8.568,00 J",
        "d": "504,00 J",
        "e": "71,40 J"
      },
      "resposta": "c",
      "explicacao": "Q = m·c·ΔT = 120 × 4,2 × 17 = 8.568 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0065",
      "enunciado": "Uma amostra de 130 g de água recebe calor suficiente para variar sua temperatura em 18 °C. Use c = 4,2 J/(g·°C). Qual é o calor absorvido?",
      "alternativas": {
        "a": "4.914,00 J",
        "b": "2.340,00 J",
        "c": "75,60 J",
        "d": "9.828,00 J",
        "e": "546,00 J"
      },
      "resposta": "d",
      "explicacao": "Q = m·c·ΔT = 130 × 4,2 × 18 = 9.828 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0066",
      "enunciado": "Uma amostra de 140 g de água recebe calor suficiente para variar sua temperatura em 19 °C. Use c = 4,2 J/(g·°C). Qual é o calor absorvido?",
      "alternativas": {
        "a": "588,00 J",
        "b": "79,80 J",
        "c": "2.660,00 J",
        "d": "5.586,00 J",
        "e": "11.172,00 J"
      },
      "resposta": "e",
      "explicacao": "Q = m·c·ΔT = 140 × 4,2 × 19 = 11.172 J.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0067",
      "enunciado": "No experimento cinético 1, qual afirmação é cientificamente correta?",
      "alternativas": {
        "a": "O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.",
        "b": "A diminuição da concentração dos reagentes sempre acelera a reação.",
        "c": "Um catalisador aumenta a energia de ativação da reação.",
        "d": "A velocidade de reação independe do mecanismo reacional.",
        "e": "A superfície de contato não influencia reações heterogêneas."
      },
      "resposta": "a",
      "explicacao": "A afirmação correta é: O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0068",
      "enunciado": "No experimento cinético 2, qual afirmação é cientificamente correta?",
      "alternativas": {
        "a": "A diminuição da concentração dos reagentes sempre acelera a reação.",
        "b": "O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.",
        "c": "Um catalisador aumenta a energia de ativação da reação.",
        "d": "A velocidade de reação independe do mecanismo reacional.",
        "e": "A superfície de contato não influencia reações heterogêneas."
      },
      "resposta": "b",
      "explicacao": "A afirmação correta é: O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0069",
      "enunciado": "No experimento cinético 3, qual afirmação é cientificamente correta?",
      "alternativas": {
        "a": "Um catalisador aumenta a energia de ativação da reação.",
        "b": "A velocidade de reação independe do mecanismo reacional.",
        "c": "O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.",
        "d": "A diminuição da concentração dos reagentes sempre acelera a reação.",
        "e": "A superfície de contato não influencia reações heterogêneas."
      },
      "resposta": "c",
      "explicacao": "A afirmação correta é: O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0070",
      "enunciado": "No experimento cinético 4, qual afirmação é cientificamente correta?",
      "alternativas": {
        "a": "A superfície de contato não influencia reações heterogêneas.",
        "b": "A diminuição da concentração dos reagentes sempre acelera a reação.",
        "c": "A velocidade de reação independe do mecanismo reacional.",
        "d": "O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.",
        "e": "Um catalisador aumenta a energia de ativação da reação."
      },
      "resposta": "d",
      "explicacao": "A afirmação correta é: O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0071",
      "enunciado": "No experimento cinético 5, qual afirmação é cientificamente correta?",
      "alternativas": {
        "a": "A velocidade de reação independe do mecanismo reacional.",
        "b": "A superfície de contato não influencia reações heterogêneas.",
        "c": "Um catalisador aumenta a energia de ativação da reação.",
        "d": "A diminuição da concentração dos reagentes sempre acelera a reação.",
        "e": "O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes."
      },
      "resposta": "e",
      "explicacao": "A afirmação correta é: O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0072",
      "enunciado": "No experimento cinético 6, qual afirmação é cientificamente correta?",
      "alternativas": {
        "a": "O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.",
        "b": "A superfície de contato não influencia reações heterogêneas.",
        "c": "A diminuição da concentração dos reagentes sempre acelera a reação.",
        "d": "A velocidade de reação independe do mecanismo reacional.",
        "e": "Um catalisador aumenta a energia de ativação da reação."
      },
      "resposta": "a",
      "explicacao": "A afirmação correta é: O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0073",
      "enunciado": "No experimento cinético 7, qual afirmação é cientificamente correta?",
      "alternativas": {
        "a": "A diminuição da concentração dos reagentes sempre acelera a reação.",
        "b": "O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.",
        "c": "Um catalisador aumenta a energia de ativação da reação.",
        "d": "A velocidade de reação independe do mecanismo reacional.",
        "e": "A superfície de contato não influencia reações heterogêneas."
      },
      "resposta": "b",
      "explicacao": "A afirmação correta é: O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0074",
      "enunciado": "No experimento cinético 8, qual afirmação é cientificamente correta?",
      "alternativas": {
        "a": "A diminuição da concentração dos reagentes sempre acelera a reação.",
        "b": "A velocidade de reação independe do mecanismo reacional.",
        "c": "O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.",
        "d": "A superfície de contato não influencia reações heterogêneas.",
        "e": "Um catalisador aumenta a energia de ativação da reação."
      },
      "resposta": "c",
      "explicacao": "A afirmação correta é: O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0075",
      "enunciado": "No experimento cinético 9, qual afirmação é cientificamente correta?",
      "alternativas": {
        "a": "A diminuição da concentração dos reagentes sempre acelera a reação.",
        "b": "A velocidade de reação independe do mecanismo reacional.",
        "c": "Um catalisador aumenta a energia de ativação da reação.",
        "d": "O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.",
        "e": "A superfície de contato não influencia reações heterogêneas."
      },
      "resposta": "d",
      "explicacao": "A afirmação correta é: O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0076",
      "enunciado": "No experimento cinético 10, qual afirmação é cientificamente correta?",
      "alternativas": {
        "a": "A diminuição da concentração dos reagentes sempre acelera a reação.",
        "b": "A velocidade de reação independe do mecanismo reacional.",
        "c": "Um catalisador aumenta a energia de ativação da reação.",
        "d": "A superfície de contato não influencia reações heterogêneas.",
        "e": "O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes."
      },
      "resposta": "e",
      "explicacao": "A afirmação correta é: O aumento da temperatura tende a elevar a frequência e a energia das colisões eficazes.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0077",
      "enunciado": "Considere o equilíbrio químico reversível do caso 1. Qual afirmação está correta?",
      "alternativas": {
        "a": "A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.",
        "b": "O aumento da concentração de um reagente nunca afeta a composição de equilíbrio.",
        "c": "O princípio de Le Chatelier só se aplica a reações irreversíveis.",
        "d": "A constante de equilíbrio muda quando se adiciona um catalisador à mesma temperatura.",
        "e": "Um sistema em equilíbrio deixa de apresentar reações nos dois sentidos."
      },
      "resposta": "a",
      "explicacao": "A afirmação correta é: A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0078",
      "enunciado": "Considere o equilíbrio químico reversível do caso 2. Qual afirmação está correta?",
      "alternativas": {
        "a": "O princípio de Le Chatelier só se aplica a reações irreversíveis.",
        "b": "A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.",
        "c": "O aumento da concentração de um reagente nunca afeta a composição de equilíbrio.",
        "d": "A constante de equilíbrio muda quando se adiciona um catalisador à mesma temperatura.",
        "e": "Um sistema em equilíbrio deixa de apresentar reações nos dois sentidos."
      },
      "resposta": "b",
      "explicacao": "A afirmação correta é: A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0079",
      "enunciado": "Considere o equilíbrio químico reversível do caso 3. Qual afirmação está correta?",
      "alternativas": {
        "a": "Um sistema em equilíbrio deixa de apresentar reações nos dois sentidos.",
        "b": "O aumento da concentração de um reagente nunca afeta a composição de equilíbrio.",
        "c": "A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.",
        "d": "O princípio de Le Chatelier só se aplica a reações irreversíveis.",
        "e": "A constante de equilíbrio muda quando se adiciona um catalisador à mesma temperatura."
      },
      "resposta": "c",
      "explicacao": "A afirmação correta é: A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0080",
      "enunciado": "Considere o equilíbrio químico reversível do caso 4. Qual afirmação está correta?",
      "alternativas": {
        "a": "O aumento da concentração de um reagente nunca afeta a composição de equilíbrio.",
        "b": "O princípio de Le Chatelier só se aplica a reações irreversíveis.",
        "c": "Um sistema em equilíbrio deixa de apresentar reações nos dois sentidos.",
        "d": "A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.",
        "e": "A constante de equilíbrio muda quando se adiciona um catalisador à mesma temperatura."
      },
      "resposta": "d",
      "explicacao": "A afirmação correta é: A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0081",
      "enunciado": "Considere o equilíbrio químico reversível do caso 5. Qual afirmação está correta?",
      "alternativas": {
        "a": "Um sistema em equilíbrio deixa de apresentar reações nos dois sentidos.",
        "b": "O princípio de Le Chatelier só se aplica a reações irreversíveis.",
        "c": "O aumento da concentração de um reagente nunca afeta a composição de equilíbrio.",
        "d": "A constante de equilíbrio muda quando se adiciona um catalisador à mesma temperatura.",
        "e": "A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos."
      },
      "resposta": "e",
      "explicacao": "A afirmação correta é: A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0082",
      "enunciado": "Considere o equilíbrio químico reversível do caso 6. Qual afirmação está correta?",
      "alternativas": {
        "a": "A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.",
        "b": "O princípio de Le Chatelier só se aplica a reações irreversíveis.",
        "c": "Um sistema em equilíbrio deixa de apresentar reações nos dois sentidos.",
        "d": "A constante de equilíbrio muda quando se adiciona um catalisador à mesma temperatura.",
        "e": "O aumento da concentração de um reagente nunca afeta a composição de equilíbrio."
      },
      "resposta": "a",
      "explicacao": "A afirmação correta é: A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0083",
      "enunciado": "Considere o equilíbrio químico reversível do caso 7. Qual afirmação está correta?",
      "alternativas": {
        "a": "A constante de equilíbrio muda quando se adiciona um catalisador à mesma temperatura.",
        "b": "A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.",
        "c": "O princípio de Le Chatelier só se aplica a reações irreversíveis.",
        "d": "O aumento da concentração de um reagente nunca afeta a composição de equilíbrio.",
        "e": "Um sistema em equilíbrio deixa de apresentar reações nos dois sentidos."
      },
      "resposta": "b",
      "explicacao": "A afirmação correta é: A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0084",
      "enunciado": "Considere o equilíbrio químico reversível do caso 8. Qual afirmação está correta?",
      "alternativas": {
        "a": "O princípio de Le Chatelier só se aplica a reações irreversíveis.",
        "b": "O aumento da concentração de um reagente nunca afeta a composição de equilíbrio.",
        "c": "A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.",
        "d": "Um sistema em equilíbrio deixa de apresentar reações nos dois sentidos.",
        "e": "A constante de equilíbrio muda quando se adiciona um catalisador à mesma temperatura."
      },
      "resposta": "c",
      "explicacao": "A afirmação correta é: A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0085",
      "enunciado": "Considere o equilíbrio químico reversível do caso 9. Qual afirmação está correta?",
      "alternativas": {
        "a": "O aumento da concentração de um reagente nunca afeta a composição de equilíbrio.",
        "b": "O princípio de Le Chatelier só se aplica a reações irreversíveis.",
        "c": "A constante de equilíbrio muda quando se adiciona um catalisador à mesma temperatura.",
        "d": "A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.",
        "e": "Um sistema em equilíbrio deixa de apresentar reações nos dois sentidos."
      },
      "resposta": "d",
      "explicacao": "A afirmação correta é: A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0086",
      "enunciado": "Considere o equilíbrio químico reversível do caso 10. Qual afirmação está correta?",
      "alternativas": {
        "a": "Um sistema em equilíbrio deixa de apresentar reações nos dois sentidos.",
        "b": "O aumento da concentração de um reagente nunca afeta a composição de equilíbrio.",
        "c": "O princípio de Le Chatelier só se aplica a reações irreversíveis.",
        "d": "A constante de equilíbrio muda quando se adiciona um catalisador à mesma temperatura.",
        "e": "A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos."
      },
      "resposta": "e",
      "explicacao": "A afirmação correta é: A remoção de um produto pode deslocar o equilíbrio no sentido de formar mais produtos.. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0087",
      "enunciado": "Uma corrente constante de 2 A atravessa uma célula eletrolítica durante 5 s. Qual é a carga elétrica total transportada?",
      "alternativas": {
        "a": "10,00 C",
        "b": "20,00 C",
        "c": "7,00 C",
        "d": "0,40 C",
        "e": "2,50 C"
      },
      "resposta": "a",
      "explicacao": "Carga: Q = i·t = 2 A × 5 s = 10 C.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0088",
      "enunciado": "Uma corrente constante de 3 A atravessa uma célula eletrolítica durante 6 s. Qual é a carga elétrica total transportada?",
      "alternativas": {
        "a": "2,00 C",
        "b": "18,00 C",
        "c": "36,00 C",
        "d": "0,50 C",
        "e": "9,00 C"
      },
      "resposta": "b",
      "explicacao": "Carga: Q = i·t = 3 A × 6 s = 18 C.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0089",
      "enunciado": "Uma corrente constante de 4 A atravessa uma célula eletrolítica durante 7 s. Qual é a carga elétrica total transportada?",
      "alternativas": {
        "a": "0,57 C",
        "b": "1,75 C",
        "c": "28,00 C",
        "d": "11,00 C",
        "e": "56,00 C"
      },
      "resposta": "c",
      "explicacao": "Carga: Q = i·t = 4 A × 7 s = 28 C.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0090",
      "enunciado": "Uma corrente constante de 5 A atravessa uma célula eletrolítica durante 8 s. Qual é a carga elétrica total transportada?",
      "alternativas": {
        "a": "13,00 C",
        "b": "1,60 C",
        "c": "0,62 C",
        "d": "40,00 C",
        "e": "80,00 C"
      },
      "resposta": "d",
      "explicacao": "Carga: Q = i·t = 5 A × 8 s = 40 C.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0091",
      "enunciado": "Uma corrente constante de 6 A atravessa uma célula eletrolítica durante 9 s. Qual é a carga elétrica total transportada?",
      "alternativas": {
        "a": "0,67 C",
        "b": "108,00 C",
        "c": "15,00 C",
        "d": "1,50 C",
        "e": "54,00 C"
      },
      "resposta": "e",
      "explicacao": "Carga: Q = i·t = 6 A × 9 s = 54 C.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0092",
      "enunciado": "Uma corrente constante de 7 A atravessa uma célula eletrolítica durante 10 s. Qual é a carga elétrica total transportada?",
      "alternativas": {
        "a": "70,00 C",
        "b": "1,43 C",
        "c": "17,00 C",
        "d": "140,00 C",
        "e": "0,70 C"
      },
      "resposta": "a",
      "explicacao": "Carga: Q = i·t = 7 A × 10 s = 70 C.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0093",
      "enunciado": "Uma corrente constante de 8 A atravessa uma célula eletrolítica durante 11 s. Qual é a carga elétrica total transportada?",
      "alternativas": {
        "a": "1,38 C",
        "b": "88,00 C",
        "c": "19,00 C",
        "d": "0,73 C",
        "e": "176,00 C"
      },
      "resposta": "b",
      "explicacao": "Carga: Q = i·t = 8 A × 11 s = 88 C.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0094",
      "enunciado": "Uma corrente constante de 9 A atravessa uma célula eletrolítica durante 12 s. Qual é a carga elétrica total transportada?",
      "alternativas": {
        "a": "216,00 C",
        "b": "21,00 C",
        "c": "108,00 C",
        "d": "0,75 C",
        "e": "1,33 C"
      },
      "resposta": "c",
      "explicacao": "Carga: Q = i·t = 9 A × 12 s = 108 C.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0095",
      "enunciado": "Uma corrente constante de 10 A atravessa uma célula eletrolítica durante 13 s. Qual é a carga elétrica total transportada?",
      "alternativas": {
        "a": "23,00 C",
        "b": "1,30 C",
        "c": "0,77 C",
        "d": "130,00 C",
        "e": "260,00 C"
      },
      "resposta": "d",
      "explicacao": "Carga: Q = i·t = 10 A × 13 s = 130 C.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0096",
      "enunciado": "Uma corrente constante de 11 A atravessa uma célula eletrolítica durante 14 s. Qual é a carga elétrica total transportada?",
      "alternativas": {
        "a": "308,00 C",
        "b": "0,79 C",
        "c": "1,27 C",
        "d": "25,00 C",
        "e": "154,00 C"
      },
      "resposta": "e",
      "explicacao": "Carga: Q = i·t = 11 A × 14 s = 154 C.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0097",
      "enunciado": "A qual função orgânica pertence o composto etanol?",
      "alternativas": {
        "a": "álcool",
        "b": "ácido carboxílico",
        "c": "cetona",
        "d": "éster",
        "e": "aldeído"
      },
      "resposta": "a",
      "explicacao": "Etanol pertence à função álcool, identificada pelo grupo funcional característico. As demais alternativas nomeiam outras funções da química orgânica, cada uma com grupo funcional próprio.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0098",
      "enunciado": "A qual função orgânica pertence o composto ácido etanoico?",
      "alternativas": {
        "a": "álcool",
        "b": "ácido carboxílico",
        "c": "cetona",
        "d": "aldeído",
        "e": "éster"
      },
      "resposta": "b",
      "explicacao": "Ácido etanoico pertence à função ácido carboxílico, identificada pelo grupo funcional característico. As demais alternativas nomeiam outras funções da química orgânica, cada uma com grupo funcional próprio.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0099",
      "enunciado": "A qual função orgânica pertence o composto propanona?",
      "alternativas": {
        "a": "aldeído",
        "b": "álcool",
        "c": "cetona",
        "d": "ácido carboxílico",
        "e": "éster"
      },
      "resposta": "c",
      "explicacao": "Propanona pertence à função cetona, identificada pelo grupo funcional característico. As demais alternativas nomeiam outras funções da química orgânica, cada uma com grupo funcional próprio.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0100",
      "enunciado": "A qual função orgânica pertence o composto etanal?",
      "alternativas": {
        "a": "éster",
        "b": "ácido carboxílico",
        "c": "cetona",
        "d": "aldeído",
        "e": "álcool"
      },
      "resposta": "d",
      "explicacao": "Etanal pertence à função aldeído, identificada pelo grupo funcional característico. As demais alternativas nomeiam outras funções da química orgânica, cada uma com grupo funcional próprio.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0101",
      "enunciado": "A qual função orgânica pertence o composto etanoato de etila?",
      "alternativas": {
        "a": "álcool",
        "b": "ácido carboxílico",
        "c": "cetona",
        "d": "aldeído",
        "e": "éster"
      },
      "resposta": "e",
      "explicacao": "Etanoato de etila pertence à função éster, identificada pelo grupo funcional característico. As demais alternativas nomeiam outras funções da química orgânica, cada uma com grupo funcional próprio.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0102",
      "enunciado": "Qual alternativa relaciona corretamente o fenômeno chuva ácida a uma característica central?",
      "alternativas": {
        "a": "emissões de óxidos de enxofre e nitrogênio",
        "b": "ausência completa de transformações químicas",
        "c": "fenômeno que ocorre apenas no vácuo",
        "d": "evento sem impacto ambiental mensurável",
        "e": "processo independente de matéria e energia"
      },
      "resposta": "a",
      "explicacao": "A afirmação correta é: emissões de óxidos de enxofre e nitrogênio. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0103",
      "enunciado": "Qual alternativa relaciona corretamente o fenômeno eutrofização a uma característica central?",
      "alternativas": {
        "a": "evento sem impacto ambiental mensurável",
        "b": "excesso de nutrientes em ambientes aquáticos",
        "c": "ausência completa de transformações químicas",
        "d": "processo independente de matéria e energia",
        "e": "fenômeno que ocorre apenas no vácuo"
      },
      "resposta": "b",
      "explicacao": "A afirmação correta é: excesso de nutrientes em ambientes aquáticos. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0104",
      "enunciado": "Qual alternativa relaciona corretamente o fenômeno efeito estufa intensificado a uma característica central?",
      "alternativas": {
        "a": "evento sem impacto ambiental mensurável",
        "b": "ausência completa de transformações químicas",
        "c": "aumento da concentração de gases que absorvem radiação infravermelha",
        "d": "fenômeno que ocorre apenas no vácuo",
        "e": "processo independente de matéria e energia"
      },
      "resposta": "c",
      "explicacao": "A afirmação correta é: aumento da concentração de gases que absorvem radiação infravermelha. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0105",
      "enunciado": "Qual alternativa relaciona corretamente o fenômeno corrosão a uma característica central?",
      "alternativas": {
        "a": "fenômeno que ocorre apenas no vácuo",
        "b": "processo independente de matéria e energia",
        "c": "ausência completa de transformações químicas",
        "d": "processos de oxidação de materiais metálicos",
        "e": "evento sem impacto ambiental mensurável"
      },
      "resposta": "d",
      "explicacao": "A afirmação correta é: processos de oxidação de materiais metálicos. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-qui-0106",
      "enunciado": "Qual alternativa relaciona corretamente o fenômeno tratamento de água a uma característica central?",
      "alternativas": {
        "a": "fenômeno que ocorre apenas no vácuo",
        "b": "evento sem impacto ambiental mensurável",
        "c": "ausência completa de transformações químicas",
        "d": "processo independente de matéria e energia",
        "e": "operações físicas e químicas para remover contaminantes"
      },
      "resposta": "e",
      "explicacao": "A afirmação correta é: operações físicas e químicas para remover contaminantes. As demais invertem o sentido do fenômeno ou atribuem a ele uma causa que não se sustenta.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "historia-geral": [
    {
      "id": "xtr-hist-0001",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: transição gradual de grupos caçadores-coletores para comunidades com agricultura, criação de animais e maior sedentarização?",
      "alternativas": {
        "a": "Revolução Neolítica",
        "b": "Roma Antiga",
        "c": "Grécia Antiga",
        "d": "Egito Antigo",
        "e": "Mesopotâmia"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Revolução Neolítica: transição gradual de grupos caçadores-coletores para comunidades com agricultura, criação de animais e maior sedentarização. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0002",
      "enunciado": "Em que contexto histórico deve ser situado o tema Revolução Neolítica?",
      "alternativas": {
        "a": "Antiguidade africana, do período pré-dinástico à conquista romana",
        "b": "aproximadamente a partir de 10.000 a.C., em diferentes regiões",
        "c": "Antiguidade Oriental, sobretudo a partir do quarto milênio a.C",
        "d": "da fundação tradicional de Roma ao fim do Império Romano do Ocidente",
        "e": "Mediterrâneo oriental, sobretudo entre os séculos VIII e IV a.C"
      },
      "resposta": "b",
      "explicacao": "Revolução Neolítica se situa em: aproximadamente a partir de 10.000 a.C., em diferentes regiões. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0003",
      "enunciado": "Qual condição ajuda a caracterizar Revolução Neolítica?",
      "alternativas": {
        "a": "expansão militar, integração provincial e disputas sociais internas",
        "b": "agricultura irrigada e administração coletiva de recursos hídricos",
        "c": "domesticação de plantas e animais combinada a mudanças ambientais e técnicas",
        "d": "fragmentação geográfica, comércio marítimo e autonomia das cidades",
        "e": "ciclos de cheia do Nilo e organização estatal do trabalho"
      },
      "resposta": "c",
      "explicacao": "Revolução Neolítica: domesticação de plantas e animais combinada a mudanças ambientais e técnicas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0004",
      "enunciado": "Qual consequência ou função se associa corretamente a Revolução Neolítica?",
      "alternativas": {
        "a": "romanização, difusão do latim e formação de importante tradição jurídica",
        "b": "formação de ampla burocracia, cultura religiosa complexa e arquitetura monumental",
        "c": "debates sobre cidadania, democracia, filosofia e formas de governo",
        "d": "formação de aldeias, produção de excedentes e maior diferenciação social",
        "e": "desenvolvimento de Estados, registros escritos e códigos jurídicos"
      },
      "resposta": "d",
      "explicacao": "Revolução Neolítica: formação de aldeias, produção de excedentes e maior diferenciação social. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0005",
      "enunciado": "Qual definição corresponde corretamente a Revolução Neolítica?",
      "alternativas": {
        "a": "civilizações urbanas organizadas entre os rios Tigre e Eufrates, com cidades-Estado e escrita cuneiforme",
        "b": "sociedade centralizada em torno do faraó e articulada à agricultura no vale do Nilo",
        "c": "civilização que passou por monarquia, república e império, expandindo-se pelo Mediterrâneo",
        "d": "conjunto de pólis que desenvolveram experiências políticas, filosóficas e artísticas diversas",
        "e": "transição gradual de grupos caçadores-coletores para comunidades com agricultura, criação de animais e maior sedentarização"
      },
      "resposta": "e",
      "explicacao": "Revolução Neolítica é transição gradual de grupos caçadores-coletores para comunidades com agricultura, criação de animais e maior sedentarização. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0006",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: civilizações urbanas organizadas entre os rios Tigre e Eufrates, com cidades-Estado e escrita cuneiforme?",
      "alternativas": {
        "a": "Mesopotâmia",
        "b": "Egito Antigo",
        "c": "Grécia Antiga",
        "d": "Feudalismo",
        "e": "Roma Antiga"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Mesopotâmia: civilizações urbanas organizadas entre os rios Tigre e Eufrates, com cidades-Estado e escrita cuneiforme. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0007",
      "enunciado": "Em que contexto histórico deve ser situado o tema Mesopotâmia?",
      "alternativas": {
        "a": "da fundação tradicional de Roma ao fim do Império Romano do Ocidente",
        "b": "Antiguidade Oriental, sobretudo a partir do quarto milênio a.C",
        "c": "Antiguidade africana, do período pré-dinástico à conquista romana",
        "d": "Europa ocidental medieval, especialmente entre os séculos IX e XIII",
        "e": "Mediterrâneo oriental, sobretudo entre os séculos VIII e IV a.C"
      },
      "resposta": "b",
      "explicacao": "Mesopotâmia se situa em: Antiguidade Oriental, sobretudo a partir do quarto milênio a.C.. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0008",
      "enunciado": "Qual condição ajuda a caracterizar Mesopotâmia?",
      "alternativas": {
        "a": "fragmentação geográfica, comércio marítimo e autonomia das cidades",
        "b": "ciclos de cheia do Nilo e organização estatal do trabalho",
        "c": "agricultura irrigada e administração coletiva de recursos hídricos",
        "d": "expansão militar, integração provincial e disputas sociais internas",
        "e": "fragmentação política após o mundo romano e busca de proteção local"
      },
      "resposta": "c",
      "explicacao": "Mesopotâmia: agricultura irrigada e administração coletiva de recursos hídricos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0009",
      "enunciado": "Qual consequência ou função se associa corretamente a Mesopotâmia?",
      "alternativas": {
        "a": "debates sobre cidadania, democracia, filosofia e formas de governo",
        "b": "fortalecimento de senhorios, economia agrária e hierarquias estamentais",
        "c": "romanização, difusão do latim e formação de importante tradição jurídica",
        "d": "desenvolvimento de Estados, registros escritos e códigos jurídicos",
        "e": "formação de ampla burocracia, cultura religiosa complexa e arquitetura monumental"
      },
      "resposta": "d",
      "explicacao": "Mesopotâmia: desenvolvimento de Estados, registros escritos e códigos jurídicos. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0010",
      "enunciado": "Qual definição corresponde corretamente a Mesopotâmia?",
      "alternativas": {
        "a": "civilização que passou por monarquia, república e império, expandindo-se pelo Mediterrâneo",
        "b": "sociedade centralizada em torno do faraó e articulada à agricultura no vale do Nilo",
        "c": "organização rural marcada por poderes locais, vínculos de dependência e trabalho servil",
        "d": "conjunto de pólis que desenvolveram experiências políticas, filosóficas e artísticas diversas",
        "e": "civilizações urbanas organizadas entre os rios Tigre e Eufrates, com cidades-Estado e escrita cuneiforme"
      },
      "resposta": "e",
      "explicacao": "Mesopotâmia é civilizações urbanas organizadas entre os rios Tigre e Eufrates, com cidades-Estado e escrita cuneiforme. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0011",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: sociedade centralizada em torno do faraó e articulada à agricultura no vale do Nilo?",
      "alternativas": {
        "a": "Egito Antigo",
        "b": "Expansão islâmica",
        "c": "Roma Antiga",
        "d": "Grécia Antiga",
        "e": "Feudalismo"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Egito Antigo: sociedade centralizada em torno do faraó e articulada à agricultura no vale do Nilo. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0012",
      "enunciado": "Em que contexto histórico deve ser situado o tema Egito Antigo?",
      "alternativas": {
        "a": "da fundação tradicional de Roma ao fim do Império Romano do Ocidente",
        "b": "Antiguidade africana, do período pré-dinástico à conquista romana",
        "c": "Europa ocidental medieval, especialmente entre os séculos IX e XIII",
        "d": "Mediterrâneo oriental, sobretudo entre os séculos VIII e IV a.C",
        "e": "Ásia, África e Europa entre os séculos VII e XV"
      },
      "resposta": "b",
      "explicacao": "Egito Antigo se situa em: Antiguidade africana, do período pré-dinástico à conquista romana. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0013",
      "enunciado": "Qual condição ajuda a caracterizar Egito Antigo?",
      "alternativas": {
        "a": "fragmentação política após o mundo romano e busca de proteção local",
        "b": "unificação de grupos árabes e formação de califados",
        "c": "ciclos de cheia do Nilo e organização estatal do trabalho",
        "d": "expansão militar, integração provincial e disputas sociais internas",
        "e": "fragmentação geográfica, comércio marítimo e autonomia das cidades"
      },
      "resposta": "c",
      "explicacao": "Egito Antigo: ciclos de cheia do Nilo e organização estatal do trabalho. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0014",
      "enunciado": "Qual consequência ou função se associa corretamente a Egito Antigo?",
      "alternativas": {
        "a": "debates sobre cidadania, democracia, filosofia e formas de governo",
        "b": "romanização, difusão do latim e formação de importante tradição jurídica",
        "c": "integração de rotas, circulação de saberes e formação de sociedades plurais",
        "d": "formação de ampla burocracia, cultura religiosa complexa e arquitetura monumental",
        "e": "fortalecimento de senhorios, economia agrária e hierarquias estamentais"
      },
      "resposta": "d",
      "explicacao": "Egito Antigo: formação de ampla burocracia, cultura religiosa complexa e arquitetura monumental. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0015",
      "enunciado": "Qual definição corresponde corretamente a Egito Antigo?",
      "alternativas": {
        "a": "difusão religiosa, política e comercial iniciada na Península Arábica no século VII",
        "b": "conjunto de pólis que desenvolveram experiências políticas, filosóficas e artísticas diversas",
        "c": "organização rural marcada por poderes locais, vínculos de dependência e trabalho servil",
        "d": "civilização que passou por monarquia, república e império, expandindo-se pelo Mediterrâneo",
        "e": "sociedade centralizada em torno do faraó e articulada à agricultura no vale do Nilo"
      },
      "resposta": "e",
      "explicacao": "Egito Antigo é sociedade centralizada em torno do faraó e articulada à agricultura no vale do Nilo. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0016",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: conjunto de pólis que desenvolveram experiências políticas, filosóficas e artísticas diversas?",
      "alternativas": {
        "a": "Grécia Antiga",
        "b": "Roma Antiga",
        "c": "Expansão islâmica",
        "d": "Feudalismo",
        "e": "Cruzadas"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Grécia Antiga: conjunto de pólis que desenvolveram experiências políticas, filosóficas e artísticas diversas. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0017",
      "enunciado": "Em que contexto histórico deve ser situado o tema Grécia Antiga?",
      "alternativas": {
        "a": "séculos XI a XIII",
        "b": "Mediterrâneo oriental, sobretudo entre os séculos VIII e IV a.C",
        "c": "da fundação tradicional de Roma ao fim do Império Romano do Ocidente",
        "d": "Europa ocidental medieval, especialmente entre os séculos IX e XIII",
        "e": "Ásia, África e Europa entre os séculos VII e XV"
      },
      "resposta": "b",
      "explicacao": "Grécia Antiga se situa em: Mediterrâneo oriental, sobretudo entre os séculos VIII e IV a.C.. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0018",
      "enunciado": "Qual condição ajuda a caracterizar Grécia Antiga?",
      "alternativas": {
        "a": "expansão militar, integração provincial e disputas sociais internas",
        "b": "unificação de grupos árabes e formação de califados",
        "c": "fragmentação geográfica, comércio marítimo e autonomia das cidades",
        "d": "mobilização religiosa, interesses políticos da nobreza e objetivos comerciais",
        "e": "fragmentação política após o mundo romano e busca de proteção local"
      },
      "resposta": "c",
      "explicacao": "Grécia Antiga: fragmentação geográfica, comércio marítimo e autonomia das cidades. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0019",
      "enunciado": "Qual consequência ou função se associa corretamente a Grécia Antiga?",
      "alternativas": {
        "a": "fortalecimento de senhorios, economia agrária e hierarquias estamentais",
        "b": "romanização, difusão do latim e formação de importante tradição jurídica",
        "c": "integração de rotas, circulação de saberes e formação de sociedades plurais",
        "d": "debates sobre cidadania, democracia, filosofia e formas de governo",
        "e": "intensificação de contatos e conflitos entre cristãos, muçulmanos e judeus"
      },
      "resposta": "d",
      "explicacao": "Grécia Antiga: debates sobre cidadania, democracia, filosofia e formas de governo. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0020",
      "enunciado": "Qual definição corresponde corretamente a Grécia Antiga?",
      "alternativas": {
        "a": "organização rural marcada por poderes locais, vínculos de dependência e trabalho servil",
        "b": "civilização que passou por monarquia, república e império, expandindo-se pelo Mediterrâneo",
        "c": "difusão religiosa, política e comercial iniciada na Península Arábica no século VII",
        "d": "expedições militares cristãs dirigidas principalmente ao Mediterrâneo oriental",
        "e": "conjunto de pólis que desenvolveram experiências políticas, filosóficas e artísticas diversas"
      },
      "resposta": "e",
      "explicacao": "Grécia Antiga é conjunto de pólis que desenvolveram experiências políticas, filosóficas e artísticas diversas. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0021",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: civilização que passou por monarquia, república e império, expandindo-se pelo Mediterrâneo?",
      "alternativas": {
        "a": "Roma Antiga",
        "b": "Renascimento",
        "c": "Feudalismo",
        "d": "Expansão islâmica",
        "e": "Cruzadas"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Roma Antiga: civilização que passou por monarquia, república e império, expandindo-se pelo Mediterrâneo. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0022",
      "enunciado": "Qual condição ajuda a caracterizar Roma Antiga?",
      "alternativas": {
        "a": "unificação de grupos árabes e formação de califados",
        "b": "expansão militar, integração provincial e disputas sociais internas",
        "c": "fragmentação política após o mundo romano e busca de proteção local",
        "d": "riqueza urbana, mecenato, circulação de manuscritos e imprensa",
        "e": "mobilização religiosa, interesses políticos da nobreza e objetivos comerciais"
      },
      "resposta": "b",
      "explicacao": "Roma Antiga: expansão militar, integração provincial e disputas sociais internas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0023",
      "enunciado": "Qual consequência ou função se associa corretamente a Roma Antiga?",
      "alternativas": {
        "a": "fortalecimento de senhorios, economia agrária e hierarquias estamentais",
        "b": "intensificação de contatos e conflitos entre cristãos, muçulmanos e judeus",
        "c": "romanização, difusão do latim e formação de importante tradição jurídica",
        "d": "renovação artística e ampliação das discussões sobre ser humano e natureza",
        "e": "integração de rotas, circulação de saberes e formação de sociedades plurais"
      },
      "resposta": "c",
      "explicacao": "Roma Antiga: romanização, difusão do latim e formação de importante tradição jurídica. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0024",
      "enunciado": "Qual definição corresponde corretamente a Roma Antiga?",
      "alternativas": {
        "a": "movimento cultural que retomou referências clássicas e valorizou investigação, perspectiva e humanismo",
        "b": "organização rural marcada por poderes locais, vínculos de dependência e trabalho servil",
        "c": "difusão religiosa, política e comercial iniciada na Península Arábica no século VII",
        "d": "civilização que passou por monarquia, república e império, expandindo-se pelo Mediterrâneo",
        "e": "expedições militares cristãs dirigidas principalmente ao Mediterrâneo oriental"
      },
      "resposta": "d",
      "explicacao": "Roma Antiga é civilização que passou por monarquia, república e império, expandindo-se pelo Mediterrâneo. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0025",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: organização rural marcada por poderes locais, vínculos de dependência e trabalho servil?",
      "alternativas": {
        "a": "Absolutismo",
        "b": "Expansão islâmica",
        "c": "Renascimento",
        "d": "Cruzadas",
        "e": "Feudalismo"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Feudalismo: organização rural marcada por poderes locais, vínculos de dependência e trabalho servil. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0026",
      "enunciado": "Em que contexto histórico deve ser situado o tema Feudalismo?",
      "alternativas": {
        "a": "Europa ocidental medieval, especialmente entre os séculos IX e XIII",
        "b": "Europa entre os séculos XVI e XVIII",
        "c": "cidades europeias entre os séculos XIV e XVI",
        "d": "séculos XI a XIII",
        "e": "Ásia, África e Europa entre os séculos VII e XV"
      },
      "resposta": "a",
      "explicacao": "Feudalismo se situa em: Europa ocidental medieval, especialmente entre os séculos IX e XIII. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0027",
      "enunciado": "Qual condição ajuda a caracterizar Feudalismo?",
      "alternativas": {
        "a": "unificação de grupos árabes e formação de califados",
        "b": "fragmentação política após o mundo romano e busca de proteção local",
        "c": "formação dos Estados, guerras, tributação e alianças com setores sociais",
        "d": "riqueza urbana, mecenato, circulação de manuscritos e imprensa",
        "e": "mobilização religiosa, interesses políticos da nobreza e objetivos comerciais"
      },
      "resposta": "b",
      "explicacao": "Feudalismo: fragmentação política após o mundo romano e busca de proteção local. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0028",
      "enunciado": "Qual consequência ou função se associa corretamente a Feudalismo?",
      "alternativas": {
        "a": "integração de rotas, circulação de saberes e formação de sociedades plurais",
        "b": "intensificação de contatos e conflitos entre cristãos, muçulmanos e judeus",
        "c": "fortalecimento de senhorios, economia agrária e hierarquias estamentais",
        "d": "centralização administrativa e formulação de teorias de soberania",
        "e": "renovação artística e ampliação das discussões sobre ser humano e natureza"
      },
      "resposta": "c",
      "explicacao": "Feudalismo: fortalecimento de senhorios, economia agrária e hierarquias estamentais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0029",
      "enunciado": "Qual definição corresponde corretamente a Feudalismo?",
      "alternativas": {
        "a": "concentração de poderes políticos nas monarquias europeias da Idade Moderna",
        "b": "movimento cultural que retomou referências clássicas e valorizou investigação, perspectiva e humanismo",
        "c": "expedições militares cristãs dirigidas principalmente ao Mediterrâneo oriental",
        "d": "organização rural marcada por poderes locais, vínculos de dependência e trabalho servil",
        "e": "difusão religiosa, política e comercial iniciada na Península Arábica no século VII"
      },
      "resposta": "d",
      "explicacao": "Feudalismo é organização rural marcada por poderes locais, vínculos de dependência e trabalho servil. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0030",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: difusão religiosa, política e comercial iniciada na Península Arábica no século VII?",
      "alternativas": {
        "a": "Renascimento",
        "b": "Expansão marítima europeia",
        "c": "Cruzadas",
        "d": "Absolutismo",
        "e": "Expansão islâmica"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Expansão islâmica: difusão religiosa, política e comercial iniciada na Península Arábica no século VII. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0031",
      "enunciado": "Em que contexto histórico deve ser situado o tema Expansão islâmica?",
      "alternativas": {
        "a": "Ásia, África e Europa entre os séculos VII e XV",
        "b": "cidades europeias entre os séculos XIV e XVI",
        "c": "Europa entre os séculos XVI e XVIII",
        "d": "séculos XI a XIII",
        "e": "séculos XV e XVI"
      },
      "resposta": "a",
      "explicacao": "Expansão islâmica se situa em: Ásia, África e Europa entre os séculos VII e XV. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0032",
      "enunciado": "Qual condição ajuda a caracterizar Expansão islâmica?",
      "alternativas": {
        "a": "mobilização religiosa, interesses políticos da nobreza e objetivos comerciais",
        "b": "unificação de grupos árabes e formação de califados",
        "c": "riqueza urbana, mecenato, circulação de manuscritos e imprensa",
        "d": "formação dos Estados, guerras, tributação e alianças com setores sociais",
        "e": "busca por rotas comerciais, técnicas náuticas e apoio das monarquias"
      },
      "resposta": "b",
      "explicacao": "Expansão islâmica: unificação de grupos árabes e formação de califados. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0033",
      "enunciado": "Qual consequência ou função se associa corretamente a Expansão islâmica?",
      "alternativas": {
        "a": "renovação artística e ampliação das discussões sobre ser humano e natureza",
        "b": "centralização administrativa e formulação de teorias de soberania",
        "c": "integração de rotas, circulação de saberes e formação de sociedades plurais",
        "d": "intensificação de contatos e conflitos entre cristãos, muçulmanos e judeus",
        "e": "colonização, trocas globais, violência e integração do comércio atlântico"
      },
      "resposta": "c",
      "explicacao": "Expansão islâmica: integração de rotas, circulação de saberes e formação de sociedades plurais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0034",
      "enunciado": "Qual definição corresponde corretamente a Expansão islâmica?",
      "alternativas": {
        "a": "concentração de poderes políticos nas monarquias europeias da Idade Moderna",
        "b": "expedições militares cristãs dirigidas principalmente ao Mediterrâneo oriental",
        "c": "movimento cultural que retomou referências clássicas e valorizou investigação, perspectiva e humanismo",
        "d": "difusão religiosa, política e comercial iniciada na Península Arábica no século VII",
        "e": "navegações oceânicas que conectaram continentes sob domínio comercial e militar europeu"
      },
      "resposta": "d",
      "explicacao": "Expansão islâmica é difusão religiosa, política e comercial iniciada na Península Arábica no século VII. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0035",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: expedições militares cristãs dirigidas principalmente ao Mediterrâneo oriental?",
      "alternativas": {
        "a": "Renascimento",
        "b": "Reformas religiosas",
        "c": "Absolutismo",
        "d": "Expansão marítima europeia",
        "e": "Cruzadas"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Cruzadas: expedições militares cristãs dirigidas principalmente ao Mediterrâneo oriental. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0036",
      "enunciado": "Em que contexto histórico deve ser situado o tema Cruzadas?",
      "alternativas": {
        "a": "séculos XI a XIII",
        "b": "Europa do século XVI",
        "c": "cidades europeias entre os séculos XIV e XVI",
        "d": "séculos XV e XVI",
        "e": "Europa entre os séculos XVI e XVIII"
      },
      "resposta": "a",
      "explicacao": "Cruzadas se situa em: séculos XI a XIII. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0037",
      "enunciado": "Qual condição ajuda a caracterizar Cruzadas?",
      "alternativas": {
        "a": "críticas à Igreja, imprensa, interesses políticos e debates teológicos",
        "b": "mobilização religiosa, interesses políticos da nobreza e objetivos comerciais",
        "c": "busca por rotas comerciais, técnicas náuticas e apoio das monarquias",
        "d": "riqueza urbana, mecenato, circulação de manuscritos e imprensa",
        "e": "formação dos Estados, guerras, tributação e alianças com setores sociais"
      },
      "resposta": "b",
      "explicacao": "Cruzadas: mobilização religiosa, interesses políticos da nobreza e objetivos comerciais. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0038",
      "enunciado": "Qual consequência ou função se associa corretamente a Cruzadas?",
      "alternativas": {
        "a": "centralização administrativa e formulação de teorias de soberania",
        "b": "colonização, trocas globais, violência e integração do comércio atlântico",
        "c": "intensificação de contatos e conflitos entre cristãos, muçulmanos e judeus",
        "d": "fragmentação religiosa, guerras confessionais e reação católica",
        "e": "renovação artística e ampliação das discussões sobre ser humano e natureza"
      },
      "resposta": "c",
      "explicacao": "Cruzadas: intensificação de contatos e conflitos entre cristãos, muçulmanos e judeus. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0039",
      "enunciado": "Qual definição corresponde corretamente a Cruzadas?",
      "alternativas": {
        "a": "concentração de poderes políticos nas monarquias europeias da Idade Moderna",
        "b": "rupturas no cristianismo ocidental que deram origem a diferentes igrejas protestantes",
        "c": "movimento cultural que retomou referências clássicas e valorizou investigação, perspectiva e humanismo",
        "d": "expedições militares cristãs dirigidas principalmente ao Mediterrâneo oriental",
        "e": "navegações oceânicas que conectaram continentes sob domínio comercial e militar europeu"
      },
      "resposta": "d",
      "explicacao": "Cruzadas é expedições militares cristãs dirigidas principalmente ao Mediterrâneo oriental. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0040",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: movimento cultural que retomou referências clássicas e valorizou investigação, perspectiva e humanismo?",
      "alternativas": {
        "a": "Reformas religiosas",
        "b": "Mercantilismo",
        "c": "Expansão marítima europeia",
        "d": "Absolutismo",
        "e": "Renascimento"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Renascimento: movimento cultural que retomou referências clássicas e valorizou investigação, perspectiva e humanismo. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0041",
      "enunciado": "Em que contexto histórico deve ser situado o tema Renascimento?",
      "alternativas": {
        "a": "cidades europeias entre os séculos XIV e XVI",
        "b": "Europa moderna, aproximadamente entre os séculos XVI e XVIII",
        "c": "Europa do século XVI",
        "d": "Europa entre os séculos XVI e XVIII",
        "e": "séculos XV e XVI"
      },
      "resposta": "a",
      "explicacao": "Renascimento se situa em: cidades europeias entre os séculos XIV e XVI. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0042",
      "enunciado": "Qual condição ajuda a caracterizar Renascimento?",
      "alternativas": {
        "a": "críticas à Igreja, imprensa, interesses políticos e debates teológicos",
        "b": "riqueza urbana, mecenato, circulação de manuscritos e imprensa",
        "c": "competição entre Estados e expansão do comércio colonial",
        "d": "busca por rotas comerciais, técnicas náuticas e apoio das monarquias",
        "e": "formação dos Estados, guerras, tributação e alianças com setores sociais"
      },
      "resposta": "b",
      "explicacao": "Renascimento: riqueza urbana, mecenato, circulação de manuscritos e imprensa. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0043",
      "enunciado": "Qual consequência ou função se associa corretamente a Renascimento?",
      "alternativas": {
        "a": "fragmentação religiosa, guerras confessionais e reação católica",
        "b": "colonização, trocas globais, violência e integração do comércio atlântico",
        "c": "renovação artística e ampliação das discussões sobre ser humano e natureza",
        "d": "fortalecimento de monopólios, companhias comerciais e sistemas coloniais",
        "e": "centralização administrativa e formulação de teorias de soberania"
      },
      "resposta": "c",
      "explicacao": "Renascimento: renovação artística e ampliação das discussões sobre ser humano e natureza. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0044",
      "enunciado": "Qual definição corresponde corretamente a Renascimento?",
      "alternativas": {
        "a": "conjunto de práticas econômicas de intervenção estatal, proteção comercial e busca de metais",
        "b": "rupturas no cristianismo ocidental que deram origem a diferentes igrejas protestantes",
        "c": "navegações oceânicas que conectaram continentes sob domínio comercial e militar europeu",
        "d": "movimento cultural que retomou referências clássicas e valorizou investigação, perspectiva e humanismo",
        "e": "concentração de poderes políticos nas monarquias europeias da Idade Moderna"
      },
      "resposta": "d",
      "explicacao": "Renascimento é movimento cultural que retomou referências clássicas e valorizou investigação, perspectiva e humanismo. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0045",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: concentração de poderes políticos nas monarquias europeias da Idade Moderna?",
      "alternativas": {
        "a": "Reformas religiosas",
        "b": "Mercantilismo",
        "c": "Expansão marítima europeia",
        "d": "Colonização portuguesa na América",
        "e": "Absolutismo"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Absolutismo: concentração de poderes políticos nas monarquias europeias da Idade Moderna. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0046",
      "enunciado": "Em que contexto histórico deve ser situado o tema Absolutismo?",
      "alternativas": {
        "a": "Europa entre os séculos XVI e XVIII",
        "b": "séculos XV e XVI",
        "c": "Brasil entre os séculos XVI e início do XIX",
        "d": "Europa do século XVI",
        "e": "Europa moderna, aproximadamente entre os séculos XVI e XVIII"
      },
      "resposta": "a",
      "explicacao": "Absolutismo se situa em: Europa entre os séculos XVI e XVIII. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0047",
      "enunciado": "Qual condição ajuda a caracterizar Absolutismo?",
      "alternativas": {
        "a": "busca por rotas comerciais, técnicas náuticas e apoio das monarquias",
        "b": "formação dos Estados, guerras, tributação e alianças com setores sociais",
        "c": "competição entre Estados e expansão do comércio colonial",
        "d": "críticas à Igreja, imprensa, interesses políticos e debates teológicos",
        "e": "interesses mercantis, produção açucareira e controle do território"
      },
      "resposta": "b",
      "explicacao": "Absolutismo: formação dos Estados, guerras, tributação e alianças com setores sociais. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0048",
      "enunciado": "Qual consequência ou função se associa corretamente a Absolutismo?",
      "alternativas": {
        "a": "fragmentação religiosa, guerras confessionais e reação católica",
        "b": "formação de sociedade desigual, escravista e conectada ao Atlântico",
        "c": "centralização administrativa e formulação de teorias de soberania",
        "d": "colonização, trocas globais, violência e integração do comércio atlântico",
        "e": "fortalecimento de monopólios, companhias comerciais e sistemas coloniais"
      },
      "resposta": "c",
      "explicacao": "Absolutismo: centralização administrativa e formulação de teorias de soberania. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0049",
      "enunciado": "Qual definição corresponde corretamente a Absolutismo?",
      "alternativas": {
        "a": "conjunto de práticas econômicas de intervenção estatal, proteção comercial e busca de metais",
        "b": "rupturas no cristianismo ocidental que deram origem a diferentes igrejas protestantes",
        "c": "ocupação baseada em exploração territorial, plantation, escravidão e administração colonial",
        "d": "concentração de poderes políticos nas monarquias europeias da Idade Moderna",
        "e": "navegações oceânicas que conectaram continentes sob domínio comercial e militar europeu"
      },
      "resposta": "d",
      "explicacao": "Absolutismo é concentração de poderes políticos nas monarquias europeias da Idade Moderna. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0050",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: navegações oceânicas que conectaram continentes sob domínio comercial e militar europeu?",
      "alternativas": {
        "a": "Escravidão atlântica",
        "b": "Colonização portuguesa na América",
        "c": "Reformas religiosas",
        "d": "Mercantilismo",
        "e": "Expansão marítima europeia"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Expansão marítima europeia: navegações oceânicas que conectaram continentes sob domínio comercial e militar europeu. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0051",
      "enunciado": "Em que contexto histórico deve ser situado o tema Expansão marítima europeia?",
      "alternativas": {
        "a": "séculos XV e XVI",
        "b": "Europa moderna, aproximadamente entre os séculos XVI e XVIII",
        "c": "Brasil entre os séculos XVI e início do XIX",
        "d": "Europa do século XVI",
        "e": "séculos XVI a XIX"
      },
      "resposta": "a",
      "explicacao": "Expansão marítima europeia se situa em: séculos XV e XVI. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0052",
      "enunciado": "Qual condição ajuda a caracterizar Expansão marítima europeia?",
      "alternativas": {
        "a": "críticas à Igreja, imprensa, interesses políticos e debates teológicos",
        "b": "busca por rotas comerciais, técnicas náuticas e apoio das monarquias",
        "c": "interesses mercantis, produção açucareira e controle do território",
        "d": "demanda colonial por trabalho e construção de hierarquias racializadas",
        "e": "competição entre Estados e expansão do comércio colonial"
      },
      "resposta": "b",
      "explicacao": "Expansão marítima europeia: busca por rotas comerciais, técnicas náuticas e apoio das monarquias. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0053",
      "enunciado": "Qual consequência ou função se associa corretamente a Expansão marítima europeia?",
      "alternativas": {
        "a": "formação de sociedade desigual, escravista e conectada ao Atlântico",
        "b": "fragmentação religiosa, guerras confessionais e reação católica",
        "c": "colonização, trocas globais, violência e integração do comércio atlântico",
        "d": "diáspora africana, resistências e desigualdades de longa duração",
        "e": "fortalecimento de monopólios, companhias comerciais e sistemas coloniais"
      },
      "resposta": "c",
      "explicacao": "Expansão marítima europeia: colonização, trocas globais, violência e integração do comércio atlântico. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0054",
      "enunciado": "Qual definição corresponde corretamente a Expansão marítima europeia?",
      "alternativas": {
        "a": "sistema de tráfico e trabalho forçado que deslocou milhões de africanos para as Américas",
        "b": "ocupação baseada em exploração territorial, plantation, escravidão e administração colonial",
        "c": "rupturas no cristianismo ocidental que deram origem a diferentes igrejas protestantes",
        "d": "navegações oceânicas que conectaram continentes sob domínio comercial e militar europeu",
        "e": "conjunto de práticas econômicas de intervenção estatal, proteção comercial e busca de metais"
      },
      "resposta": "d",
      "explicacao": "Expansão marítima europeia é navegações oceânicas que conectaram continentes sob domínio comercial e militar europeu. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0055",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: rupturas no cristianismo ocidental que deram origem a diferentes igrejas protestantes?",
      "alternativas": {
        "a": "Colonização portuguesa na América",
        "b": "Mercantilismo",
        "c": "Resistência indígena",
        "d": "Escravidão atlântica",
        "e": "Reformas religiosas"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Reformas religiosas: rupturas no cristianismo ocidental que deram origem a diferentes igrejas protestantes. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0056",
      "enunciado": "Em que contexto histórico deve ser situado o tema Reformas religiosas?",
      "alternativas": {
        "a": "Europa do século XVI",
        "b": "período colonial e seus desdobramentos posteriores",
        "c": "Europa moderna, aproximadamente entre os séculos XVI e XVIII",
        "d": "Brasil entre os séculos XVI e início do XIX",
        "e": "séculos XVI a XIX"
      },
      "resposta": "a",
      "explicacao": "Reformas religiosas se situa em: Europa do século XVI. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0057",
      "enunciado": "Qual condição ajuda a caracterizar Reformas religiosas?",
      "alternativas": {
        "a": "invasão territorial, escravização, missões e epidemias",
        "b": "críticas à Igreja, imprensa, interesses políticos e debates teológicos",
        "c": "interesses mercantis, produção açucareira e controle do território",
        "d": "demanda colonial por trabalho e construção de hierarquias racializadas",
        "e": "competição entre Estados e expansão do comércio colonial"
      },
      "resposta": "b",
      "explicacao": "Reformas religiosas: críticas à Igreja, imprensa, interesses políticos e debates teológicos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0058",
      "enunciado": "Qual consequência ou função se associa corretamente a Reformas religiosas?",
      "alternativas": {
        "a": "preservação de identidades, reorganização comunitária e disputas por direitos",
        "b": "formação de sociedade desigual, escravista e conectada ao Atlântico",
        "c": "fragmentação religiosa, guerras confessionais e reação católica",
        "d": "diáspora africana, resistências e desigualdades de longa duração",
        "e": "fortalecimento de monopólios, companhias comerciais e sistemas coloniais"
      },
      "resposta": "c",
      "explicacao": "Reformas religiosas: fragmentação religiosa, guerras confessionais e reação católica. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0059",
      "enunciado": "Qual definição corresponde corretamente a Reformas religiosas?",
      "alternativas": {
        "a": "ações militares, políticas, culturais e territoriais de povos originários diante da conquista",
        "b": "sistema de tráfico e trabalho forçado que deslocou milhões de africanos para as Américas",
        "c": "conjunto de práticas econômicas de intervenção estatal, proteção comercial e busca de metais",
        "d": "rupturas no cristianismo ocidental que deram origem a diferentes igrejas protestantes",
        "e": "ocupação baseada em exploração territorial, plantation, escravidão e administração colonial"
      },
      "resposta": "d",
      "explicacao": "Reformas religiosas é rupturas no cristianismo ocidental que deram origem a diferentes igrejas protestantes. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0060",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: conjunto de práticas econômicas de intervenção estatal, proteção comercial e busca de metais?",
      "alternativas": {
        "a": "Escravidão atlântica",
        "b": "Colonização portuguesa na América",
        "c": "Resistência indígena",
        "d": "Iluminismo",
        "e": "Mercantilismo"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Mercantilismo: conjunto de práticas econômicas de intervenção estatal, proteção comercial e busca de metais. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0061",
      "enunciado": "Em que contexto histórico deve ser situado o tema Mercantilismo?",
      "alternativas": {
        "a": "Europa moderna, aproximadamente entre os séculos XVI e XVIII",
        "b": "séculos XVI a XIX",
        "c": "Brasil entre os séculos XVI e início do XIX",
        "d": "Europa do século XVIII",
        "e": "período colonial e seus desdobramentos posteriores"
      },
      "resposta": "a",
      "explicacao": "Mercantilismo se situa em: Europa moderna, aproximadamente entre os séculos XVI e XVIII. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0062",
      "enunciado": "Qual condição ajuda a caracterizar Mercantilismo?",
      "alternativas": {
        "a": "interesses mercantis, produção açucareira e controle do território",
        "b": "competição entre Estados e expansão do comércio colonial",
        "c": "demanda colonial por trabalho e construção de hierarquias racializadas",
        "d": "invasão territorial, escravização, missões e epidemias",
        "e": "expansão da esfera pública, ciência moderna e crítica ao absolutismo"
      },
      "resposta": "b",
      "explicacao": "Mercantilismo: competição entre Estados e expansão do comércio colonial. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0063",
      "enunciado": "Qual consequência ou função se associa corretamente a Mercantilismo?",
      "alternativas": {
        "a": "influência sobre liberalismo, reformas e revoluções atlânticas",
        "b": "preservação de identidades, reorganização comunitária e disputas por direitos",
        "c": "fortalecimento de monopólios, companhias comerciais e sistemas coloniais",
        "d": "diáspora africana, resistências e desigualdades de longa duração",
        "e": "formação de sociedade desigual, escravista e conectada ao Atlântico"
      },
      "resposta": "c",
      "explicacao": "Mercantilismo: fortalecimento de monopólios, companhias comerciais e sistemas coloniais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0064",
      "enunciado": "Qual definição corresponde corretamente a Mercantilismo?",
      "alternativas": {
        "a": "ações militares, políticas, culturais e territoriais de povos originários diante da conquista",
        "b": "sistema de tráfico e trabalho forçado que deslocou milhões de africanos para as Américas",
        "c": "corrente intelectual que valorizou razão, crítica e direitos contra privilégios tradicionais",
        "d": "conjunto de práticas econômicas de intervenção estatal, proteção comercial e busca de metais",
        "e": "ocupação baseada em exploração territorial, plantation, escravidão e administração colonial"
      },
      "resposta": "d",
      "explicacao": "Mercantilismo é conjunto de práticas econômicas de intervenção estatal, proteção comercial e busca de metais. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0079",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: corrente intelectual que valorizou razão, crítica e direitos contra privilégios tradicionais?",
      "alternativas": {
        "a": "Revolução Francesa",
        "b": "Independência dos Estados Unidos",
        "c": "Revolução Industrial",
        "d": "Revolução Haitiana",
        "e": "Iluminismo"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Iluminismo: corrente intelectual que valorizou razão, crítica e direitos contra privilégios tradicionais. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0080",
      "enunciado": "Em que contexto histórico deve ser situado o tema Iluminismo?",
      "alternativas": {
        "a": "Europa do século XVIII",
        "b": "França a partir de 1789",
        "c": "Caribe entre 1791 e 1804",
        "d": "iniciada na Inglaterra no século XVIII e difundida no século XIX",
        "e": "América do Norte, especialmente entre 1775 e 1787"
      },
      "resposta": "a",
      "explicacao": "Iluminismo se situa em: Europa do século XVIII. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0081",
      "enunciado": "Qual condição ajuda a caracterizar Iluminismo?",
      "alternativas": {
        "a": "tributação sem representação e conflitos sobre autonomia colonial",
        "b": "expansão da esfera pública, ciência moderna e crítica ao absolutismo",
        "c": "acumulação de capital, carvão, inovações e disponibilidade de trabalho",
        "d": "crise fiscal, desigualdade estamental e circulação de ideias iluministas",
        "e": "violência escravista e circulação de ideias de liberdade e igualdade"
      },
      "resposta": "b",
      "explicacao": "Iluminismo: expansão da esfera pública, ciência moderna e crítica ao absolutismo. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0082",
      "enunciado": "Qual consequência ou função se associa corretamente a Iluminismo?",
      "alternativas": {
        "a": "independência do Haiti e formação da primeira república negra moderna",
        "b": "fim de privilégios, declaração de direitos e radicalização política",
        "c": "influência sobre liberalismo, reformas e revoluções atlânticas",
        "d": "urbanização, classe operária, aumento produtivo e conflitos sociais",
        "e": "constitucionalismo republicano com manutenção de exclusões sociais"
      },
      "resposta": "c",
      "explicacao": "Iluminismo: influência sobre liberalismo, reformas e revoluções atlânticas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0083",
      "enunciado": "Qual definição corresponde corretamente a Iluminismo?",
      "alternativas": {
        "a": "insurreição de pessoas escravizadas que destruiu a ordem colonial de Saint-Domingue",
        "b": "processo que derrubou privilégios de ordens e reformulou soberania e cidadania",
        "c": "ruptura das Treze Colônias com a monarquia britânica e formação de uma república federal",
        "d": "corrente intelectual que valorizou razão, crítica e direitos contra privilégios tradicionais",
        "e": "transformação produtiva baseada em máquinas, fábricas e novas fontes de energia"
      },
      "resposta": "d",
      "explicacao": "Iluminismo é corrente intelectual que valorizou razão, crítica e direitos contra privilégios tradicionais. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0084",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: transformação produtiva baseada em máquinas, fábricas e novas fontes de energia?",
      "alternativas": {
        "a": "Independência dos Estados Unidos",
        "b": "Revolução Francesa",
        "c": "Revolução Haitiana",
        "d": "Independências hispano-americanas",
        "e": "Revolução Industrial"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Revolução Industrial: transformação produtiva baseada em máquinas, fábricas e novas fontes de energia. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0085",
      "enunciado": "Em que contexto histórico deve ser situado o tema Revolução Industrial?",
      "alternativas": {
        "a": "iniciada na Inglaterra no século XVIII e difundida no século XIX",
        "b": "Caribe entre 1791 e 1804",
        "c": "América do Norte, especialmente entre 1775 e 1787",
        "d": "primeiras décadas do século XIX",
        "e": "França a partir de 1789"
      },
      "resposta": "a",
      "explicacao": "Revolução Industrial se situa em: iniciada na Inglaterra no século XVIII e difundida no século XIX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0086",
      "enunciado": "Qual condição ajuda a caracterizar Revolução Industrial?",
      "alternativas": {
        "a": "tributação sem representação e conflitos sobre autonomia colonial",
        "b": "acumulação de capital, carvão, inovações e disponibilidade de trabalho",
        "c": "crise da monarquia espanhola, interesses criollos e mobilização social",
        "d": "crise fiscal, desigualdade estamental e circulação de ideias iluministas",
        "e": "violência escravista e circulação de ideias de liberdade e igualdade"
      },
      "resposta": "b",
      "explicacao": "Revolução Industrial: acumulação de capital, carvão, inovações e disponibilidade de trabalho. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0087",
      "enunciado": "Qual consequência ou função se associa corretamente a Revolução Industrial?",
      "alternativas": {
        "a": "constitucionalismo republicano com manutenção de exclusões sociais",
        "b": "fim de privilégios, declaração de direitos e radicalização política",
        "c": "urbanização, classe operária, aumento produtivo e conflitos sociais",
        "d": "formação de novos Estados, conflitos regionais e caudilhismo",
        "e": "independência do Haiti e formação da primeira república negra moderna"
      },
      "resposta": "c",
      "explicacao": "Revolução Industrial: urbanização, classe operária, aumento produtivo e conflitos sociais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0088",
      "enunciado": "Qual definição corresponde corretamente a Revolução Industrial?",
      "alternativas": {
        "a": "rupturas políticas que desagregaram grande parte do império espanhol na América",
        "b": "processo que derrubou privilégios de ordens e reformulou soberania e cidadania",
        "c": "ruptura das Treze Colônias com a monarquia britânica e formação de uma república federal",
        "d": "transformação produtiva baseada em máquinas, fábricas e novas fontes de energia",
        "e": "insurreição de pessoas escravizadas que destruiu a ordem colonial de Saint-Domingue"
      },
      "resposta": "d",
      "explicacao": "Revolução Industrial é transformação produtiva baseada em máquinas, fábricas e novas fontes de energia. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0089",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: ruptura das Treze Colônias com a monarquia britânica e formação de uma república federal?",
      "alternativas": {
        "a": "Independência do Brasil",
        "b": "Independências hispano-americanas",
        "c": "Revolução Haitiana",
        "d": "Revolução Francesa",
        "e": "Independência dos Estados Unidos"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Independência dos Estados Unidos: ruptura das Treze Colônias com a monarquia britânica e formação de uma república federal. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0090",
      "enunciado": "Em que contexto histórico deve ser situado o tema Independência dos Estados Unidos?",
      "alternativas": {
        "a": "América do Norte, especialmente entre 1775 e 1787",
        "b": "primeiras décadas do século XIX",
        "c": "1822 e primeiros anos do Império",
        "d": "Caribe entre 1791 e 1804",
        "e": "França a partir de 1789"
      },
      "resposta": "a",
      "explicacao": "Independência dos Estados Unidos se situa em: América do Norte, especialmente entre 1775 e 1787. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0091",
      "enunciado": "Qual condição ajuda a caracterizar Independência dos Estados Unidos?",
      "alternativas": {
        "a": "crise fiscal, desigualdade estamental e circulação de ideias iluministas",
        "b": "tributação sem representação e conflitos sobre autonomia colonial",
        "c": "crise da monarquia espanhola, interesses criollos e mobilização social",
        "d": "violência escravista e circulação de ideias de liberdade e igualdade",
        "e": "crise do sistema colonial, presença da corte e tensões com as Cortes portuguesas"
      },
      "resposta": "b",
      "explicacao": "Independência dos Estados Unidos: tributação sem representação e conflitos sobre autonomia colonial. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0092",
      "enunciado": "Qual consequência ou função se associa corretamente a Independência dos Estados Unidos?",
      "alternativas": {
        "a": "fim de privilégios, declaração de direitos e radicalização política",
        "b": "formação de monarquia constitucional com preservação da escravidão",
        "c": "constitucionalismo republicano com manutenção de exclusões sociais",
        "d": "formação de novos Estados, conflitos regionais e caudilhismo",
        "e": "independência do Haiti e formação da primeira república negra moderna"
      },
      "resposta": "c",
      "explicacao": "Independência dos Estados Unidos: constitucionalismo republicano com manutenção de exclusões sociais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0093",
      "enunciado": "Qual definição corresponde corretamente a Independência dos Estados Unidos?",
      "alternativas": {
        "a": "separação política de Portugal sob liderança de Pedro de Alcântara",
        "b": "rupturas políticas que desagregaram grande parte do império espanhol na América",
        "c": "processo que derrubou privilégios de ordens e reformulou soberania e cidadania",
        "d": "ruptura das Treze Colônias com a monarquia britânica e formação de uma república federal",
        "e": "insurreição de pessoas escravizadas que destruiu a ordem colonial de Saint-Domingue"
      },
      "resposta": "d",
      "explicacao": "Independência dos Estados Unidos é ruptura das Treze Colônias com a monarquia britânica e formação de uma república federal. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0094",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: processo que derrubou privilégios de ordens e reformulou soberania e cidadania?",
      "alternativas": {
        "a": "Independência do Brasil",
        "b": "Primeiro Reinado e Regências",
        "c": "Independências hispano-americanas",
        "d": "Revolução Haitiana",
        "e": "Revolução Francesa"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Revolução Francesa: processo que derrubou privilégios de ordens e reformulou soberania e cidadania. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0095",
      "enunciado": "Em que contexto histórico deve ser situado o tema Revolução Francesa?",
      "alternativas": {
        "a": "França a partir de 1789",
        "b": "1822 e primeiros anos do Império",
        "c": "primeiras décadas do século XIX",
        "d": "Brasil entre 1822 e 1840",
        "e": "Caribe entre 1791 e 1804"
      },
      "resposta": "a",
      "explicacao": "Revolução Francesa se situa em: França a partir de 1789. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0096",
      "enunciado": "Qual condição ajuda a caracterizar Revolução Francesa?",
      "alternativas": {
        "a": "disputas entre projetos políticos e dificuldades de integração territorial",
        "b": "crise fiscal, desigualdade estamental e circulação de ideias iluministas",
        "c": "crise da monarquia espanhola, interesses criollos e mobilização social",
        "d": "violência escravista e circulação de ideias de liberdade e igualdade",
        "e": "crise do sistema colonial, presença da corte e tensões com as Cortes portuguesas"
      },
      "resposta": "b",
      "explicacao": "Revolução Francesa: crise fiscal, desigualdade estamental e circulação de ideias iluministas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0097",
      "enunciado": "Qual consequência ou função se associa corretamente a Revolução Francesa?",
      "alternativas": {
        "a": "formação de monarquia constitucional com preservação da escravidão",
        "b": "conflitos regionais e consolidação gradual das instituições imperiais",
        "c": "fim de privilégios, declaração de direitos e radicalização política",
        "d": "formação de novos Estados, conflitos regionais e caudilhismo",
        "e": "independência do Haiti e formação da primeira república negra moderna"
      },
      "resposta": "c",
      "explicacao": "Revolução Francesa: fim de privilégios, declaração de direitos e radicalização política. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0098",
      "enunciado": "Qual definição corresponde corretamente a Revolução Francesa?",
      "alternativas": {
        "a": "fase de organização do Estado brasileiro marcada por centralização e revoltas provinciais",
        "b": "rupturas políticas que desagregaram grande parte do império espanhol na América",
        "c": "separação política de Portugal sob liderança de Pedro de Alcântara",
        "d": "processo que derrubou privilégios de ordens e reformulou soberania e cidadania",
        "e": "insurreição de pessoas escravizadas que destruiu a ordem colonial de Saint-Domingue"
      },
      "resposta": "d",
      "explicacao": "Revolução Francesa é processo que derrubou privilégios de ordens e reformulou soberania e cidadania. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0099",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: insurreição de pessoas escravizadas que destruiu a ordem colonial de Saint-Domingue?",
      "alternativas": {
        "a": "Segundo Reinado",
        "b": "Primeiro Reinado e Regências",
        "c": "Independência do Brasil",
        "d": "Independências hispano-americanas",
        "e": "Revolução Haitiana"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Revolução Haitiana: insurreição de pessoas escravizadas que destruiu a ordem colonial de Saint-Domingue. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0100",
      "enunciado": "Em que contexto histórico deve ser situado o tema Revolução Haitiana?",
      "alternativas": {
        "a": "Caribe entre 1791 e 1804",
        "b": "Brasil entre 1822 e 1840",
        "c": "1822 e primeiros anos do Império",
        "d": "Brasil entre 1840 e 1889",
        "e": "primeiras décadas do século XIX"
      },
      "resposta": "a",
      "explicacao": "Revolução Haitiana se situa em: Caribe entre 1791 e 1804. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0101",
      "enunciado": "Qual condição ajuda a caracterizar Revolução Haitiana?",
      "alternativas": {
        "a": "crise do sistema colonial, presença da corte e tensões com as Cortes portuguesas",
        "b": "violência escravista e circulação de ideias de liberdade e igualdade",
        "c": "disputas entre projetos políticos e dificuldades de integração territorial",
        "d": "centralização política, café, escravidão e integração ao comércio mundial",
        "e": "crise da monarquia espanhola, interesses criollos e mobilização social"
      },
      "resposta": "b",
      "explicacao": "Revolução Haitiana: violência escravista e circulação de ideias de liberdade e igualdade. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0102",
      "enunciado": "Qual consequência ou função se associa corretamente a Revolução Haitiana?",
      "alternativas": {
        "a": "conflitos regionais e consolidação gradual das instituições imperiais",
        "b": "formação de monarquia constitucional com preservação da escravidão",
        "c": "independência do Haiti e formação da primeira república negra moderna",
        "d": "formação de novos Estados, conflitos regionais e caudilhismo",
        "e": "infraestrutura, imigração, abolicionismo e crise final do Império"
      },
      "resposta": "c",
      "explicacao": "Revolução Haitiana: independência do Haiti e formação da primeira república negra moderna. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0103",
      "enunciado": "Qual definição corresponde corretamente a Revolução Haitiana?",
      "alternativas": {
        "a": "rupturas políticas que desagregaram grande parte do império espanhol na América",
        "b": "separação política de Portugal sob liderança de Pedro de Alcântara",
        "c": "fase de organização do Estado brasileiro marcada por centralização e revoltas provinciais",
        "d": "insurreição de pessoas escravizadas que destruiu a ordem colonial de Saint-Domingue",
        "e": "período de estabilidade relativa da monarquia, expansão cafeeira e transformações sociais"
      },
      "resposta": "d",
      "explicacao": "Revolução Haitiana é insurreição de pessoas escravizadas que destruiu a ordem colonial de Saint-Domingue. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0104",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: rupturas políticas que desagregaram grande parte do império espanhol na América?",
      "alternativas": {
        "a": "Segundo Reinado",
        "b": "Abolição da escravidão no Brasil",
        "c": "Primeiro Reinado e Regências",
        "d": "Independência do Brasil",
        "e": "Independências hispano-americanas"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Independências hispano-americanas: rupturas políticas que desagregaram grande parte do império espanhol na América. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0105",
      "enunciado": "Em que contexto histórico deve ser situado o tema Independências hispano-americanas?",
      "alternativas": {
        "a": "primeiras décadas do século XIX",
        "b": "Brasil entre 1822 e 1840",
        "c": "1822 e primeiros anos do Império",
        "d": "Brasil entre 1840 e 1889",
        "e": "século XIX, especialmente de 1850 a 1888"
      },
      "resposta": "a",
      "explicacao": "Independências hispano-americanas se situa em: primeiras décadas do século XIX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0106",
      "enunciado": "Qual condição ajuda a caracterizar Independências hispano-americanas?",
      "alternativas": {
        "a": "crise do sistema colonial, presença da corte e tensões com as Cortes portuguesas",
        "b": "crise da monarquia espanhola, interesses criollos e mobilização social",
        "c": "disputas entre projetos políticos e dificuldades de integração territorial",
        "d": "centralização política, café, escravidão e integração ao comércio mundial",
        "e": "resistência negra, abolicionismo e mudanças econômicas e internacionais"
      },
      "resposta": "b",
      "explicacao": "Independências hispano-americanas: crise da monarquia espanhola, interesses criollos e mobilização social. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0107",
      "enunciado": "Qual consequência ou função se associa corretamente a Independências hispano-americanas?",
      "alternativas": {
        "a": "conflitos regionais e consolidação gradual das instituições imperiais",
        "b": "liberdade jurídica sem ampla reparação, terra ou inclusão social",
        "c": "formação de novos Estados, conflitos regionais e caudilhismo",
        "d": "infraestrutura, imigração, abolicionismo e crise final do Império",
        "e": "formação de monarquia constitucional com preservação da escravidão"
      },
      "resposta": "c",
      "explicacao": "Independências hispano-americanas: formação de novos Estados, conflitos regionais e caudilhismo. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0108",
      "enunciado": "Qual definição corresponde corretamente a Independências hispano-americanas?",
      "alternativas": {
        "a": "processo de desmonte legal da escravidão culminando na Lei Áurea",
        "b": "separação política de Portugal sob liderança de Pedro de Alcântara",
        "c": "período de estabilidade relativa da monarquia, expansão cafeeira e transformações sociais",
        "d": "rupturas políticas que desagregaram grande parte do império espanhol na América",
        "e": "fase de organização do Estado brasileiro marcada por centralização e revoltas provinciais"
      },
      "resposta": "d",
      "explicacao": "Independências hispano-americanas é rupturas políticas que desagregaram grande parte do império espanhol na América. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0144",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: guerra industrial de grande escala entre alianças de potências?",
      "alternativas": {
        "a": "Fascismo e nazismo",
        "b": "Crise de 1929",
        "c": "Segunda Guerra e Holocausto",
        "d": "Revolução Russa",
        "e": "Primeira Guerra Mundial"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Primeira Guerra Mundial: guerra industrial de grande escala entre alianças de potências. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0145",
      "enunciado": "Em que contexto histórico deve ser situado o tema Primeira Guerra Mundial?",
      "alternativas": {
        "a": "Europa e outras regiões entre 1914 e 1918",
        "b": "Europa nas décadas de 1920 e 1930",
        "c": "Rússia em 1917 e guerra civil subsequente",
        "d": "iniciada nos Estados Unidos em 1929",
        "e": "1939 a 1945"
      },
      "resposta": "a",
      "explicacao": "Primeira Guerra Mundial se situa em: Europa e outras regiões entre 1914 e 1918. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0146",
      "enunciado": "Qual condição ajuda a caracterizar Primeira Guerra Mundial?",
      "alternativas": {
        "a": "agressões territoriais, crise da ordem de Versalhes e políticas racistas",
        "b": "rivalidades imperialistas, nacionalismos, alianças e crise balcânica",
        "c": "guerra, autoritarismo, desigualdade agrária e mobilização operária",
        "d": "crises econômicas, medo do comunismo, ressentimentos nacionais e violência política",
        "e": "especulação, crédito, fragilidade bancária e descompasso entre produção e consumo"
      },
      "resposta": "b",
      "explicacao": "Primeira Guerra Mundial: rivalidades imperialistas, nacionalismos, alianças e crise balcânica. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0147",
      "enunciado": "Qual consequência ou função se associa corretamente a Primeira Guerra Mundial?",
      "alternativas": {
        "a": "desemprego, intervenção estatal e políticas do New Deal",
        "b": "formação do primeiro Estado socialista e reorganização geopolítica",
        "c": "devastação, novos Estados e tratado de paz que manteve tensões",
        "d": "ditaduras, perseguições, expansionismo e preparação para a guerra",
        "e": "destruição, criação da ONU, julgamentos e início da ordem bipolar"
      },
      "resposta": "c",
      "explicacao": "Primeira Guerra Mundial: devastação, novos Estados e tratado de paz que manteve tensões. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0148",
      "enunciado": "Qual definição corresponde corretamente a Primeira Guerra Mundial?",
      "alternativas": {
        "a": "colapso financeiro que se transformou em depressão econômica internacional",
        "b": "queda do czarismo e tomada do poder pelos bolcheviques",
        "c": "conflito mundial ligado ao expansionismo do Eixo e ao genocídio promovido pelo nazismo",
        "d": "guerra industrial de grande escala entre alianças de potências",
        "e": "movimentos autoritários, ultranacionalistas e antidemocráticos do entreguerras"
      },
      "resposta": "d",
      "explicacao": "Primeira Guerra Mundial é guerra industrial de grande escala entre alianças de potências. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0149",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: queda do czarismo e tomada do poder pelos bolcheviques?",
      "alternativas": {
        "a": "Segunda Guerra e Holocausto",
        "b": "Guerra Fria",
        "c": "Fascismo e nazismo",
        "d": "Crise de 1929",
        "e": "Revolução Russa"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Revolução Russa: queda do czarismo e tomada do poder pelos bolcheviques. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0150",
      "enunciado": "Em que contexto histórico deve ser situado o tema Revolução Russa?",
      "alternativas": {
        "a": "Rússia em 1917 e guerra civil subsequente",
        "b": "iniciada nos Estados Unidos em 1929",
        "c": "aproximadamente de 1947 a 1991",
        "d": "1939 a 1945",
        "e": "Europa nas décadas de 1920 e 1930"
      },
      "resposta": "a",
      "explicacao": "Revolução Russa se situa em: Rússia em 1917 e guerra civil subsequente. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0151",
      "enunciado": "Qual condição ajuda a caracterizar Revolução Russa?",
      "alternativas": {
        "a": "bipolaridade ideológica, militar e econômica após 1945",
        "b": "guerra, autoritarismo, desigualdade agrária e mobilização operária",
        "c": "agressões territoriais, crise da ordem de Versalhes e políticas racistas",
        "d": "especulação, crédito, fragilidade bancária e descompasso entre produção e consumo",
        "e": "crises econômicas, medo do comunismo, ressentimentos nacionais e violência política"
      },
      "resposta": "b",
      "explicacao": "Revolução Russa: guerra, autoritarismo, desigualdade agrária e mobilização operária. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0152",
      "enunciado": "Qual consequência ou função se associa corretamente a Revolução Russa?",
      "alternativas": {
        "a": "ditaduras, perseguições, expansionismo e preparação para a guerra",
        "b": "destruição, criação da ONU, julgamentos e início da ordem bipolar",
        "c": "formação do primeiro Estado socialista e reorganização geopolítica",
        "d": "desemprego, intervenção estatal e políticas do New Deal",
        "e": "alianças, corrida armamentista, corrida espacial e guerras por procuração"
      },
      "resposta": "c",
      "explicacao": "Revolução Russa: formação do primeiro Estado socialista e reorganização geopolítica. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0153",
      "enunciado": "Qual definição corresponde corretamente a Revolução Russa?",
      "alternativas": {
        "a": "movimentos autoritários, ultranacionalistas e antidemocráticos do entreguerras",
        "b": "conflito mundial ligado ao expansionismo do Eixo e ao genocídio promovido pelo nazismo",
        "c": "disputa global entre Estados Unidos e União Soviética sem guerra direta total entre as superpotências",
        "d": "queda do czarismo e tomada do poder pelos bolcheviques",
        "e": "colapso financeiro que se transformou em depressão econômica internacional"
      },
      "resposta": "d",
      "explicacao": "Revolução Russa é queda do czarismo e tomada do poder pelos bolcheviques. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0154",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: colapso financeiro que se transformou em depressão econômica internacional?",
      "alternativas": {
        "a": "Fascismo e nazismo",
        "b": "Segunda Guerra e Holocausto",
        "c": "Guerra Fria",
        "d": "Descolonização afro-asiática",
        "e": "Crise de 1929"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Crise de 1929: colapso financeiro que se transformou em depressão econômica internacional. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0155",
      "enunciado": "Em que contexto histórico deve ser situado o tema Crise de 1929?",
      "alternativas": {
        "a": "iniciada nos Estados Unidos em 1929",
        "b": "aproximadamente de 1947 a 1991",
        "c": "sobretudo entre as décadas de 1940 e 1970",
        "d": "1939 a 1945",
        "e": "Europa nas décadas de 1920 e 1930"
      },
      "resposta": "a",
      "explicacao": "Crise de 1929 se situa em: iniciada nos Estados Unidos em 1929. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0156",
      "enunciado": "Qual condição ajuda a caracterizar Crise de 1929?",
      "alternativas": {
        "a": "bipolaridade ideológica, militar e econômica após 1945",
        "b": "especulação, crédito, fragilidade bancária e descompasso entre produção e consumo",
        "c": "enfraquecimento europeu, nacionalismos e mobilização anticolonial",
        "d": "agressões territoriais, crise da ordem de Versalhes e políticas racistas",
        "e": "crises econômicas, medo do comunismo, ressentimentos nacionais e violência política"
      },
      "resposta": "b",
      "explicacao": "Crise de 1929: especulação, crédito, fragilidade bancária e descompasso entre produção e consumo. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0157",
      "enunciado": "Qual consequência ou função se associa corretamente a Crise de 1929?",
      "alternativas": {
        "a": "alianças, corrida armamentista, corrida espacial e guerras por procuração",
        "b": "destruição, criação da ONU, julgamentos e início da ordem bipolar",
        "c": "desemprego, intervenção estatal e políticas do New Deal",
        "d": "ditaduras, perseguições, expansionismo e preparação para a guerra",
        "e": "novos Estados, disputas de fronteira e desafios de desenvolvimento"
      },
      "resposta": "c",
      "explicacao": "Crise de 1929: desemprego, intervenção estatal e políticas do New Deal. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0158",
      "enunciado": "Qual definição corresponde corretamente a Crise de 1929?",
      "alternativas": {
        "a": "disputa global entre Estados Unidos e União Soviética sem guerra direta total entre as superpotências",
        "b": "processos de independência de colônias europeias após a Segunda Guerra",
        "c": "movimentos autoritários, ultranacionalistas e antidemocráticos do entreguerras",
        "d": "colapso financeiro que se transformou em depressão econômica internacional",
        "e": "conflito mundial ligado ao expansionismo do Eixo e ao genocídio promovido pelo nazismo"
      },
      "resposta": "d",
      "explicacao": "Crise de 1929 é colapso financeiro que se transformou em depressão econômica internacional. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0159",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: movimentos autoritários, ultranacionalistas e antidemocráticos do entreguerras?",
      "alternativas": {
        "a": "Descolonização afro-asiática",
        "b": "Guerra Fria",
        "c": "Revolução Cubana",
        "d": "Segunda Guerra e Holocausto",
        "e": "Fascismo e nazismo"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Fascismo e nazismo: movimentos autoritários, ultranacionalistas e antidemocráticos do entreguerras. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0160",
      "enunciado": "Em que contexto histórico deve ser situado o tema Fascismo e nazismo?",
      "alternativas": {
        "a": "Europa nas décadas de 1920 e 1930",
        "b": "Cuba em 1959 e anos seguintes",
        "c": "aproximadamente de 1947 a 1991",
        "d": "sobretudo entre as décadas de 1940 e 1970",
        "e": "1939 a 1945"
      },
      "resposta": "a",
      "explicacao": "Fascismo e nazismo se situa em: Europa nas décadas de 1920 e 1930. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0161",
      "enunciado": "Qual condição ajuda a caracterizar Fascismo e nazismo?",
      "alternativas": {
        "a": "desigualdade, autoritarismo e oposição armada",
        "b": "crises econômicas, medo do comunismo, ressentimentos nacionais e violência política",
        "c": "agressões territoriais, crise da ordem de Versalhes e políticas racistas",
        "d": "enfraquecimento europeu, nacionalismos e mobilização anticolonial",
        "e": "bipolaridade ideológica, militar e econômica após 1945"
      },
      "resposta": "b",
      "explicacao": "Fascismo e nazismo: crises econômicas, medo do comunismo, ressentimentos nacionais e violência política. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0162",
      "enunciado": "Qual consequência ou função se associa corretamente a Fascismo e nazismo?",
      "alternativas": {
        "a": "reformas internas e forte impacto na Guerra Fria latino-americana",
        "b": "novos Estados, disputas de fronteira e desafios de desenvolvimento",
        "c": "ditaduras, perseguições, expansionismo e preparação para a guerra",
        "d": "alianças, corrida armamentista, corrida espacial e guerras por procuração",
        "e": "destruição, criação da ONU, julgamentos e início da ordem bipolar"
      },
      "resposta": "c",
      "explicacao": "Fascismo e nazismo: ditaduras, perseguições, expansionismo e preparação para a guerra. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0163",
      "enunciado": "Qual definição corresponde corretamente a Fascismo e nazismo?",
      "alternativas": {
        "a": "conflito mundial ligado ao expansionismo do Eixo e ao genocídio promovido pelo nazismo",
        "b": "processos de independência de colônias europeias após a Segunda Guerra",
        "c": "movimento que derrubou a ditadura de Fulgencio Batista e aproximou Cuba do socialismo",
        "d": "movimentos autoritários, ultranacionalistas e antidemocráticos do entreguerras",
        "e": "disputa global entre Estados Unidos e União Soviética sem guerra direta total entre as superpotências"
      },
      "resposta": "d",
      "explicacao": "Fascismo e nazismo é movimentos autoritários, ultranacionalistas e antidemocráticos do entreguerras. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0164",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: conflito mundial ligado ao expansionismo do Eixo e ao genocídio promovido pelo nazismo?",
      "alternativas": {
        "a": "Ditadura civil-militar brasileira",
        "b": "Revolução Cubana",
        "c": "Descolonização afro-asiática",
        "d": "Guerra Fria",
        "e": "Segunda Guerra e Holocausto"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Segunda Guerra e Holocausto: conflito mundial ligado ao expansionismo do Eixo e ao genocídio promovido pelo nazismo. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0165",
      "enunciado": "Em que contexto histórico deve ser situado o tema Segunda Guerra e Holocausto?",
      "alternativas": {
        "a": "1939 a 1945",
        "b": "Cuba em 1959 e anos seguintes",
        "c": "aproximadamente de 1947 a 1991",
        "d": "Brasil entre 1964 e 1985",
        "e": "sobretudo entre as décadas de 1940 e 1970"
      },
      "resposta": "a",
      "explicacao": "Segunda Guerra e Holocausto se situa em: 1939 a 1945. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0166",
      "enunciado": "Qual condição ajuda a caracterizar Segunda Guerra e Holocausto?",
      "alternativas": {
        "a": "bipolaridade ideológica, militar e econômica após 1945",
        "b": "agressões territoriais, crise da ordem de Versalhes e políticas racistas",
        "c": "desigualdade, autoritarismo e oposição armada",
        "d": "golpe, anticomunismo, apoio civil e contexto da Guerra Fria",
        "e": "enfraquecimento europeu, nacionalismos e mobilização anticolonial"
      },
      "resposta": "b",
      "explicacao": "Segunda Guerra e Holocausto: agressões territoriais, crise da ordem de Versalhes e políticas racistas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0167",
      "enunciado": "Qual consequência ou função se associa corretamente a Segunda Guerra e Holocausto?",
      "alternativas": {
        "a": "reformas internas e forte impacto na Guerra Fria latino-americana",
        "b": "censura, repressão, modernização econômica desigual e endividamento",
        "c": "destruição, criação da ONU, julgamentos e início da ordem bipolar",
        "d": "alianças, corrida armamentista, corrida espacial e guerras por procuração",
        "e": "novos Estados, disputas de fronteira e desafios de desenvolvimento"
      },
      "resposta": "c",
      "explicacao": "Segunda Guerra e Holocausto: destruição, criação da ONU, julgamentos e início da ordem bipolar. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0168",
      "enunciado": "Qual definição corresponde corretamente a Segunda Guerra e Holocausto?",
      "alternativas": {
        "a": "processos de independência de colônias europeias após a Segunda Guerra",
        "b": "regime autoritário que suprimiu direitos políticos e perseguiu opositores",
        "c": "movimento que derrubou a ditadura de Fulgencio Batista e aproximou Cuba do socialismo",
        "d": "conflito mundial ligado ao expansionismo do Eixo e ao genocídio promovido pelo nazismo",
        "e": "disputa global entre Estados Unidos e União Soviética sem guerra direta total entre as superpotências"
      },
      "resposta": "d",
      "explicacao": "Segunda Guerra e Holocausto é conflito mundial ligado ao expansionismo do Eixo e ao genocídio promovido pelo nazismo. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0169",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: disputa global entre Estados Unidos e União Soviética sem guerra direta total entre as superpotências?",
      "alternativas": {
        "a": "Revolução Cubana",
        "b": "Redemocratização e Constituição de 1988",
        "c": "Ditadura civil-militar brasileira",
        "d": "Descolonização afro-asiática",
        "e": "Guerra Fria"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Guerra Fria: disputa global entre Estados Unidos e União Soviética sem guerra direta total entre as superpotências. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0170",
      "enunciado": "Em que contexto histórico deve ser situado o tema Guerra Fria?",
      "alternativas": {
        "a": "aproximadamente de 1947 a 1991",
        "b": "sobretudo entre as décadas de 1940 e 1970",
        "c": "Cuba em 1959 e anos seguintes",
        "d": "Brasil entre 1964 e 1985",
        "e": "Brasil nas décadas de 1980 e 1990"
      },
      "resposta": "a",
      "explicacao": "Guerra Fria se situa em: aproximadamente de 1947 a 1991. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0171",
      "enunciado": "Qual condição ajuda a caracterizar Guerra Fria?",
      "alternativas": {
        "a": "mobilização civil, crise do regime e reorganização partidária",
        "b": "bipolaridade ideológica, militar e econômica após 1945",
        "c": "enfraquecimento europeu, nacionalismos e mobilização anticolonial",
        "d": "golpe, anticomunismo, apoio civil e contexto da Guerra Fria",
        "e": "desigualdade, autoritarismo e oposição armada"
      },
      "resposta": "b",
      "explicacao": "Guerra Fria: bipolaridade ideológica, militar e econômica após 1945. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0172",
      "enunciado": "Qual consequência ou função se associa corretamente a Guerra Fria?",
      "alternativas": {
        "a": "novos Estados, disputas de fronteira e desafios de desenvolvimento",
        "b": "reformas internas e forte impacto na Guerra Fria latino-americana",
        "c": "alianças, corrida armamentista, corrida espacial e guerras por procuração",
        "d": "ampliação de direitos, eleições e novas instituições de controle",
        "e": "censura, repressão, modernização econômica desigual e endividamento"
      },
      "resposta": "c",
      "explicacao": "Guerra Fria: alianças, corrida armamentista, corrida espacial e guerras por procuração. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0173",
      "enunciado": "Qual definição corresponde corretamente a Guerra Fria?",
      "alternativas": {
        "a": "processos de independência de colônias europeias após a Segunda Guerra",
        "b": "transição do regime autoritário para uma democracia constitucional",
        "c": "movimento que derrubou a ditadura de Fulgencio Batista e aproximou Cuba do socialismo",
        "d": "disputa global entre Estados Unidos e União Soviética sem guerra direta total entre as superpotências",
        "e": "regime autoritário que suprimiu direitos políticos e perseguiu opositores"
      },
      "resposta": "d",
      "explicacao": "Guerra Fria é disputa global entre Estados Unidos e União Soviética sem guerra direta total entre as superpotências. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0174",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: processos de independência de colônias europeias após a Segunda Guerra?",
      "alternativas": {
        "a": "Ditadura civil-militar brasileira",
        "b": "Revolução Cubana",
        "c": "Globalização e neoliberalismo",
        "d": "Redemocratização e Constituição de 1988",
        "e": "Descolonização afro-asiática"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Descolonização afro-asiática: processos de independência de colônias europeias após a Segunda Guerra. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0175",
      "enunciado": "Em que contexto histórico deve ser situado o tema Descolonização afro-asiática?",
      "alternativas": {
        "a": "sobretudo entre as décadas de 1940 e 1970",
        "b": "Brasil entre 1964 e 1985",
        "c": "Cuba em 1959 e anos seguintes",
        "d": "Brasil nas décadas de 1980 e 1990",
        "e": "fim do século XX e início do XXI"
      },
      "resposta": "a",
      "explicacao": "Descolonização afro-asiática se situa em: sobretudo entre as décadas de 1940 e 1970. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0176",
      "enunciado": "Qual condição ajuda a caracterizar Descolonização afro-asiática?",
      "alternativas": {
        "a": "golpe, anticomunismo, apoio civil e contexto da Guerra Fria",
        "b": "enfraquecimento europeu, nacionalismos e mobilização anticolonial",
        "c": "tecnologias de comunicação, finanças globais e crise do modelo fordista",
        "d": "mobilização civil, crise do regime e reorganização partidária",
        "e": "desigualdade, autoritarismo e oposição armada"
      },
      "resposta": "b",
      "explicacao": "Descolonização afro-asiática: enfraquecimento europeu, nacionalismos e mobilização anticolonial. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0177",
      "enunciado": "Qual consequência ou função se associa corretamente a Descolonização afro-asiática?",
      "alternativas": {
        "a": "ampliação de direitos, eleições e novas instituições de controle",
        "b": "censura, repressão, modernização econômica desigual e endividamento",
        "c": "novos Estados, disputas de fronteira e desafios de desenvolvimento",
        "d": "interdependência, cadeias globais e novas formas de desigualdade e trabalho",
        "e": "reformas internas e forte impacto na Guerra Fria latino-americana"
      },
      "resposta": "c",
      "explicacao": "Descolonização afro-asiática: novos Estados, disputas de fronteira e desafios de desenvolvimento. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0178",
      "enunciado": "Qual definição corresponde corretamente a Descolonização afro-asiática?",
      "alternativas": {
        "a": "transição do regime autoritário para uma democracia constitucional",
        "b": "regime autoritário que suprimiu direitos políticos e perseguiu opositores",
        "c": "movimento que derrubou a ditadura de Fulgencio Batista e aproximou Cuba do socialismo",
        "d": "processos de independência de colônias europeias após a Segunda Guerra",
        "e": "integração de fluxos econômicos, informacionais e produtivos acompanhada de políticas de abertura e desregulação"
      },
      "resposta": "d",
      "explicacao": "Descolonização afro-asiática é processos de independência de colônias europeias após a Segunda Guerra. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0179",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: movimento que derrubou a ditadura de Fulgencio Batista e aproximou Cuba do socialismo?",
      "alternativas": {
        "a": "Revolução Neolítica",
        "b": "Redemocratização e Constituição de 1988",
        "c": "Ditadura civil-militar brasileira",
        "d": "Globalização e neoliberalismo",
        "e": "Revolução Cubana"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Revolução Cubana: movimento que derrubou a ditadura de Fulgencio Batista e aproximou Cuba do socialismo. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0180",
      "enunciado": "Em que contexto histórico deve ser situado o tema Revolução Cubana?",
      "alternativas": {
        "a": "Cuba em 1959 e anos seguintes",
        "b": "Brasil nas décadas de 1980 e 1990",
        "c": "Brasil entre 1964 e 1985",
        "d": "aproximadamente a partir de 10.000 a.C., em diferentes regiões",
        "e": "fim do século XX e início do XXI"
      },
      "resposta": "a",
      "explicacao": "Revolução Cubana se situa em: Cuba em 1959 e anos seguintes. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0181",
      "enunciado": "Qual condição ajuda a caracterizar Revolução Cubana?",
      "alternativas": {
        "a": "domesticação de plantas e animais combinada a mudanças ambientais e técnicas",
        "b": "desigualdade, autoritarismo e oposição armada",
        "c": "mobilização civil, crise do regime e reorganização partidária",
        "d": "golpe, anticomunismo, apoio civil e contexto da Guerra Fria",
        "e": "tecnologias de comunicação, finanças globais e crise do modelo fordista"
      },
      "resposta": "b",
      "explicacao": "Revolução Cubana: desigualdade, autoritarismo e oposição armada. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0182",
      "enunciado": "Qual consequência ou função se associa corretamente a Revolução Cubana?",
      "alternativas": {
        "a": "censura, repressão, modernização econômica desigual e endividamento",
        "b": "formação de aldeias, produção de excedentes e maior diferenciação social",
        "c": "reformas internas e forte impacto na Guerra Fria latino-americana",
        "d": "ampliação de direitos, eleições e novas instituições de controle",
        "e": "interdependência, cadeias globais e novas formas de desigualdade e trabalho"
      },
      "resposta": "c",
      "explicacao": "Revolução Cubana: reformas internas e forte impacto na Guerra Fria latino-americana. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0183",
      "enunciado": "Qual definição corresponde corretamente a Revolução Cubana?",
      "alternativas": {
        "a": "regime autoritário que suprimiu direitos políticos e perseguiu opositores",
        "b": "integração de fluxos econômicos, informacionais e produtivos acompanhada de políticas de abertura e desregulação",
        "c": "transição gradual de grupos caçadores-coletores para comunidades com agricultura, criação de animais e maior sedentarização",
        "d": "movimento que derrubou a ditadura de Fulgencio Batista e aproximou Cuba do socialismo",
        "e": "transição do regime autoritário para uma democracia constitucional"
      },
      "resposta": "d",
      "explicacao": "Revolução Cubana é movimento que derrubou a ditadura de Fulgencio Batista e aproximou Cuba do socialismo. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0194",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: integração de fluxos econômicos, informacionais e produtivos acompanhada de políticas de abertura e desregulação?",
      "alternativas": {
        "a": "Mesopotâmia",
        "b": "Egito Antigo",
        "c": "Grécia Antiga",
        "d": "Revolução Neolítica",
        "e": "Globalização e neoliberalismo"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Globalização e neoliberalismo: integração de fluxos econômicos, informacionais e produtivos acompanhada de políticas de abertura e desregulação. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0195",
      "enunciado": "Em que contexto histórico deve ser situado o tema Globalização e neoliberalismo?",
      "alternativas": {
        "a": "fim do século XX e início do XXI",
        "b": "Mediterrâneo oriental, sobretudo entre os séculos VIII e IV a.C",
        "c": "Antiguidade africana, do período pré-dinástico à conquista romana",
        "d": "aproximadamente a partir de 10.000 a.C., em diferentes regiões",
        "e": "Antiguidade Oriental, sobretudo a partir do quarto milênio a.C"
      },
      "resposta": "a",
      "explicacao": "Globalização e neoliberalismo se situa em: fim do século XX e início do XXI. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0196",
      "enunciado": "Qual condição ajuda a caracterizar Globalização e neoliberalismo?",
      "alternativas": {
        "a": "fragmentação geográfica, comércio marítimo e autonomia das cidades",
        "b": "tecnologias de comunicação, finanças globais e crise do modelo fordista",
        "c": "agricultura irrigada e administração coletiva de recursos hídricos",
        "d": "ciclos de cheia do Nilo e organização estatal do trabalho",
        "e": "domesticação de plantas e animais combinada a mudanças ambientais e técnicas"
      },
      "resposta": "b",
      "explicacao": "Globalização e neoliberalismo: tecnologias de comunicação, finanças globais e crise do modelo fordista. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0197",
      "enunciado": "Qual consequência ou função se associa corretamente a Globalização e neoliberalismo?",
      "alternativas": {
        "a": "desenvolvimento de Estados, registros escritos e códigos jurídicos",
        "b": "debates sobre cidadania, democracia, filosofia e formas de governo",
        "c": "interdependência, cadeias globais e novas formas de desigualdade e trabalho",
        "d": "formação de aldeias, produção de excedentes e maior diferenciação social",
        "e": "formação de ampla burocracia, cultura religiosa complexa e arquitetura monumental"
      },
      "resposta": "c",
      "explicacao": "Globalização e neoliberalismo: interdependência, cadeias globais e novas formas de desigualdade e trabalho. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0198",
      "enunciado": "Qual definição corresponde corretamente a Globalização e neoliberalismo?",
      "alternativas": {
        "a": "civilizações urbanas organizadas entre os rios Tigre e Eufrates, com cidades-Estado e escrita cuneiforme",
        "b": "sociedade centralizada em torno do faraó e articulada à agricultura no vale do Nilo",
        "c": "conjunto de pólis que desenvolveram experiências políticas, filosóficas e artísticas diversas",
        "d": "integração de fluxos econômicos, informacionais e produtivos acompanhada de políticas de abertura e desregulação",
        "e": "transição gradual de grupos caçadores-coletores para comunidades com agricultura, criação de animais e maior sedentarização"
      },
      "resposta": "d",
      "explicacao": "Globalização e neoliberalismo é integração de fluxos econômicos, informacionais e produtivos acompanhada de políticas de abertura e desregulação. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "historia-brasil": [
    {
      "id": "xtr-hist-0065",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: ocupação baseada em exploração territorial, plantation, escravidão e administração colonial?",
      "alternativas": {
        "a": "Colonização portuguesa na América",
        "b": "Iluminismo",
        "c": "Revolução Industrial",
        "d": "Resistência indígena",
        "e": "Escravidão atlântica"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Colonização portuguesa na América: ocupação baseada em exploração territorial, plantation, escravidão e administração colonial. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0066",
      "enunciado": "Em que contexto histórico deve ser situado o tema Colonização portuguesa na América?",
      "alternativas": {
        "a": "período colonial e seus desdobramentos posteriores",
        "b": "Brasil entre os séculos XVI e início do XIX",
        "c": "séculos XVI a XIX",
        "d": "iniciada na Inglaterra no século XVIII e difundida no século XIX",
        "e": "Europa do século XVIII"
      },
      "resposta": "b",
      "explicacao": "Colonização portuguesa na América se situa em: Brasil entre os séculos XVI e início do XIX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0067",
      "enunciado": "Qual condição ajuda a caracterizar Colonização portuguesa na América?",
      "alternativas": {
        "a": "acumulação de capital, carvão, inovações e disponibilidade de trabalho",
        "b": "expansão da esfera pública, ciência moderna e crítica ao absolutismo",
        "c": "interesses mercantis, produção açucareira e controle do território",
        "d": "invasão territorial, escravização, missões e epidemias",
        "e": "demanda colonial por trabalho e construção de hierarquias racializadas"
      },
      "resposta": "c",
      "explicacao": "Colonização portuguesa na América: interesses mercantis, produção açucareira e controle do território. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0068",
      "enunciado": "Qual consequência ou função se associa corretamente a Colonização portuguesa na América?",
      "alternativas": {
        "a": "urbanização, classe operária, aumento produtivo e conflitos sociais",
        "b": "influência sobre liberalismo, reformas e revoluções atlânticas",
        "c": "preservação de identidades, reorganização comunitária e disputas por direitos",
        "d": "formação de sociedade desigual, escravista e conectada ao Atlântico",
        "e": "diáspora africana, resistências e desigualdades de longa duração"
      },
      "resposta": "d",
      "explicacao": "Colonização portuguesa na América: formação de sociedade desigual, escravista e conectada ao Atlântico. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0069",
      "enunciado": "Qual definição corresponde corretamente a Colonização portuguesa na América?",
      "alternativas": {
        "a": "transformação produtiva baseada em máquinas, fábricas e novas fontes de energia",
        "b": "sistema de tráfico e trabalho forçado que deslocou milhões de africanos para as Américas",
        "c": "ações militares, políticas, culturais e territoriais de povos originários diante da conquista",
        "d": "corrente intelectual que valorizou razão, crítica e direitos contra privilégios tradicionais",
        "e": "ocupação baseada em exploração territorial, plantation, escravidão e administração colonial"
      },
      "resposta": "e",
      "explicacao": "Colonização portuguesa na América é ocupação baseada em exploração territorial, plantation, escravidão e administração colonial. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0070",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: sistema de tráfico e trabalho forçado que deslocou milhões de africanos para as Américas?",
      "alternativas": {
        "a": "Escravidão atlântica",
        "b": "Resistência indígena",
        "c": "Iluminismo",
        "d": "Revolução Industrial",
        "e": "Independência dos Estados Unidos"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Escravidão atlântica: sistema de tráfico e trabalho forçado que deslocou milhões de africanos para as Américas. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0071",
      "enunciado": "Em que contexto histórico deve ser situado o tema Escravidão atlântica?",
      "alternativas": {
        "a": "período colonial e seus desdobramentos posteriores",
        "b": "séculos XVI a XIX",
        "c": "América do Norte, especialmente entre 1775 e 1787",
        "d": "iniciada na Inglaterra no século XVIII e difundida no século XIX",
        "e": "Europa do século XVIII"
      },
      "resposta": "b",
      "explicacao": "Escravidão atlântica se situa em: séculos XVI a XIX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0072",
      "enunciado": "Qual condição ajuda a caracterizar Escravidão atlântica?",
      "alternativas": {
        "a": "invasão territorial, escravização, missões e epidemias",
        "b": "acumulação de capital, carvão, inovações e disponibilidade de trabalho",
        "c": "demanda colonial por trabalho e construção de hierarquias racializadas",
        "d": "expansão da esfera pública, ciência moderna e crítica ao absolutismo",
        "e": "tributação sem representação e conflitos sobre autonomia colonial"
      },
      "resposta": "c",
      "explicacao": "Escravidão atlântica: demanda colonial por trabalho e construção de hierarquias racializadas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0073",
      "enunciado": "Qual consequência ou função se associa corretamente a Escravidão atlântica?",
      "alternativas": {
        "a": "preservação de identidades, reorganização comunitária e disputas por direitos",
        "b": "urbanização, classe operária, aumento produtivo e conflitos sociais",
        "c": "influência sobre liberalismo, reformas e revoluções atlânticas",
        "d": "diáspora africana, resistências e desigualdades de longa duração",
        "e": "constitucionalismo republicano com manutenção de exclusões sociais"
      },
      "resposta": "d",
      "explicacao": "Escravidão atlântica: diáspora africana, resistências e desigualdades de longa duração. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0074",
      "enunciado": "Qual definição corresponde corretamente a Escravidão atlântica?",
      "alternativas": {
        "a": "corrente intelectual que valorizou razão, crítica e direitos contra privilégios tradicionais",
        "b": "ações militares, políticas, culturais e territoriais de povos originários diante da conquista",
        "c": "transformação produtiva baseada em máquinas, fábricas e novas fontes de energia",
        "d": "ruptura das Treze Colônias com a monarquia britânica e formação de uma república federal",
        "e": "sistema de tráfico e trabalho forçado que deslocou milhões de africanos para as Américas"
      },
      "resposta": "e",
      "explicacao": "Escravidão atlântica é sistema de tráfico e trabalho forçado que deslocou milhões de africanos para as Américas. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0075",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: ações militares, políticas, culturais e territoriais de povos originários diante da conquista?",
      "alternativas": {
        "a": "Resistência indígena",
        "b": "Iluminismo",
        "c": "Independência dos Estados Unidos",
        "d": "Revolução Industrial",
        "e": "Revolução Francesa"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Resistência indígena: ações militares, políticas, culturais e territoriais de povos originários diante da conquista. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0076",
      "enunciado": "Qual condição ajuda a caracterizar Resistência indígena?",
      "alternativas": {
        "a": "acumulação de capital, carvão, inovações e disponibilidade de trabalho",
        "b": "invasão territorial, escravização, missões e epidemias",
        "c": "tributação sem representação e conflitos sobre autonomia colonial",
        "d": "expansão da esfera pública, ciência moderna e crítica ao absolutismo",
        "e": "crise fiscal, desigualdade estamental e circulação de ideias iluministas"
      },
      "resposta": "b",
      "explicacao": "Resistência indígena: invasão territorial, escravização, missões e epidemias. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0077",
      "enunciado": "Qual consequência ou função se associa corretamente a Resistência indígena?",
      "alternativas": {
        "a": "urbanização, classe operária, aumento produtivo e conflitos sociais",
        "b": "influência sobre liberalismo, reformas e revoluções atlânticas",
        "c": "preservação de identidades, reorganização comunitária e disputas por direitos",
        "d": "fim de privilégios, declaração de direitos e radicalização política",
        "e": "constitucionalismo republicano com manutenção de exclusões sociais"
      },
      "resposta": "c",
      "explicacao": "Resistência indígena: preservação de identidades, reorganização comunitária e disputas por direitos. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0078",
      "enunciado": "Qual definição corresponde corretamente a Resistência indígena?",
      "alternativas": {
        "a": "corrente intelectual que valorizou razão, crítica e direitos contra privilégios tradicionais",
        "b": "transformação produtiva baseada em máquinas, fábricas e novas fontes de energia",
        "c": "ruptura das Treze Colônias com a monarquia britânica e formação de uma república federal",
        "d": "ações militares, políticas, culturais e territoriais de povos originários diante da conquista",
        "e": "processo que derrubou privilégios de ordens e reformulou soberania e cidadania"
      },
      "resposta": "d",
      "explicacao": "Resistência indígena é ações militares, políticas, culturais e territoriais de povos originários diante da conquista. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0109",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: separação política de Portugal sob liderança de Pedro de Alcântara?",
      "alternativas": {
        "a": "Proclamação da República",
        "b": "Segundo Reinado",
        "c": "Abolição da escravidão no Brasil",
        "d": "Primeiro Reinado e Regências",
        "e": "Independência do Brasil"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Independência do Brasil: separação política de Portugal sob liderança de Pedro de Alcântara. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0110",
      "enunciado": "Em que contexto histórico deve ser situado o tema Independência do Brasil?",
      "alternativas": {
        "a": "1822 e primeiros anos do Império",
        "b": "Brasil em 1889",
        "c": "Brasil entre 1840 e 1889",
        "d": "Brasil entre 1822 e 1840",
        "e": "século XIX, especialmente de 1850 a 1888"
      },
      "resposta": "a",
      "explicacao": "Independência do Brasil se situa em: 1822 e primeiros anos do Império. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0111",
      "enunciado": "Qual condição ajuda a caracterizar Independência do Brasil?",
      "alternativas": {
        "a": "disputas entre projetos políticos e dificuldades de integração territorial",
        "b": "crise do sistema colonial, presença da corte e tensões com as Cortes portuguesas",
        "c": "resistência negra, abolicionismo e mudanças econômicas e internacionais",
        "d": "desgaste do Império, republicanismo e insatisfação de setores militares e elites",
        "e": "centralização política, café, escravidão e integração ao comércio mundial"
      },
      "resposta": "b",
      "explicacao": "Independência do Brasil: crise do sistema colonial, presença da corte e tensões com as Cortes portuguesas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0112",
      "enunciado": "Qual consequência ou função se associa corretamente a Independência do Brasil?",
      "alternativas": {
        "a": "liberdade jurídica sem ampla reparação, terra ou inclusão social",
        "b": "infraestrutura, imigração, abolicionismo e crise final do Império",
        "c": "formação de monarquia constitucional com preservação da escravidão",
        "d": "implantação de república federativa com participação popular limitada",
        "e": "conflitos regionais e consolidação gradual das instituições imperiais"
      },
      "resposta": "c",
      "explicacao": "Independência do Brasil: formação de monarquia constitucional com preservação da escravidão. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0113",
      "enunciado": "Qual definição corresponde corretamente a Independência do Brasil?",
      "alternativas": {
        "a": "fase de organização do Estado brasileiro marcada por centralização e revoltas provinciais",
        "b": "processo de desmonte legal da escravidão culminando na Lei Áurea",
        "c": "golpe político-militar que encerrou a monarquia brasileira",
        "d": "separação política de Portugal sob liderança de Pedro de Alcântara",
        "e": "período de estabilidade relativa da monarquia, expansão cafeeira e transformações sociais"
      },
      "resposta": "d",
      "explicacao": "Independência do Brasil é separação política de Portugal sob liderança de Pedro de Alcântara. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0114",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: fase de organização do Estado brasileiro marcada por centralização e revoltas provinciais?",
      "alternativas": {
        "a": "Proclamação da República",
        "b": "Segundo Reinado",
        "c": "Primeira República",
        "d": "Abolição da escravidão no Brasil",
        "e": "Primeiro Reinado e Regências"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Primeiro Reinado e Regências: fase de organização do Estado brasileiro marcada por centralização e revoltas provinciais. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0115",
      "enunciado": "Em que contexto histórico deve ser situado o tema Primeiro Reinado e Regências?",
      "alternativas": {
        "a": "Brasil entre 1822 e 1840",
        "b": "Brasil em 1889",
        "c": "século XIX, especialmente de 1850 a 1888",
        "d": "Brasil entre 1840 e 1889",
        "e": "Brasil entre 1889 e 1930"
      },
      "resposta": "a",
      "explicacao": "Primeiro Reinado e Regências se situa em: Brasil entre 1822 e 1840. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0116",
      "enunciado": "Qual condição ajuda a caracterizar Primeiro Reinado e Regências?",
      "alternativas": {
        "a": "desgaste do Império, republicanismo e insatisfação de setores militares e elites",
        "b": "disputas entre projetos políticos e dificuldades de integração territorial",
        "c": "centralização política, café, escravidão e integração ao comércio mundial",
        "d": "federalismo, economia agrário-exportadora e domínio de elites locais",
        "e": "resistência negra, abolicionismo e mudanças econômicas e internacionais"
      },
      "resposta": "b",
      "explicacao": "Primeiro Reinado e Regências: disputas entre projetos políticos e dificuldades de integração territorial. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0117",
      "enunciado": "Qual consequência ou função se associa corretamente a Primeiro Reinado e Regências?",
      "alternativas": {
        "a": "liberdade jurídica sem ampla reparação, terra ou inclusão social",
        "b": "coronelismo, conflitos sociais e movimentos de contestação",
        "c": "conflitos regionais e consolidação gradual das instituições imperiais",
        "d": "infraestrutura, imigração, abolicionismo e crise final do Império",
        "e": "implantação de república federativa com participação popular limitada"
      },
      "resposta": "c",
      "explicacao": "Primeiro Reinado e Regências: conflitos regionais e consolidação gradual das instituições imperiais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0118",
      "enunciado": "Qual definição corresponde corretamente a Primeiro Reinado e Regências?",
      "alternativas": {
        "a": "golpe político-militar que encerrou a monarquia brasileira",
        "b": "ordem política federativa marcada por poder oligárquico e desigualdade regional",
        "c": "processo de desmonte legal da escravidão culminando na Lei Áurea",
        "d": "fase de organização do Estado brasileiro marcada por centralização e revoltas provinciais",
        "e": "período de estabilidade relativa da monarquia, expansão cafeeira e transformações sociais"
      },
      "resposta": "d",
      "explicacao": "Primeiro Reinado e Regências é fase de organização do Estado brasileiro marcada por centralização e revoltas provinciais. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0119",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: período de estabilidade relativa da monarquia, expansão cafeeira e transformações sociais?",
      "alternativas": {
        "a": "Primeira República",
        "b": "Abolição da escravidão no Brasil",
        "c": "Era Vargas",
        "d": "Proclamação da República",
        "e": "Segundo Reinado"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Segundo Reinado: período de estabilidade relativa da monarquia, expansão cafeeira e transformações sociais. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0120",
      "enunciado": "Em que contexto histórico deve ser situado o tema Segundo Reinado?",
      "alternativas": {
        "a": "Brasil entre 1840 e 1889",
        "b": "século XIX, especialmente de 1850 a 1888",
        "c": "Brasil entre 1889 e 1930",
        "d": "Brasil entre 1930 e 1945",
        "e": "Brasil em 1889"
      },
      "resposta": "a",
      "explicacao": "Segundo Reinado se situa em: Brasil entre 1840 e 1889. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0121",
      "enunciado": "Qual condição ajuda a caracterizar Segundo Reinado?",
      "alternativas": {
        "a": "resistência negra, abolicionismo e mudanças econômicas e internacionais",
        "b": "centralização política, café, escravidão e integração ao comércio mundial",
        "c": "desgaste do Império, republicanismo e insatisfação de setores militares e elites",
        "d": "federalismo, economia agrário-exportadora e domínio de elites locais",
        "e": "crise oligárquica, impacto de 1929 e movimento de 1930"
      },
      "resposta": "b",
      "explicacao": "Segundo Reinado: centralização política, café, escravidão e integração ao comércio mundial. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0122",
      "enunciado": "Qual consequência ou função se associa corretamente a Segundo Reinado?",
      "alternativas": {
        "a": "fortalecimento do Executivo, trabalhismo e experiência ditatorial do Estado Novo",
        "b": "coronelismo, conflitos sociais e movimentos de contestação",
        "c": "infraestrutura, imigração, abolicionismo e crise final do Império",
        "d": "liberdade jurídica sem ampla reparação, terra ou inclusão social",
        "e": "implantação de república federativa com participação popular limitada"
      },
      "resposta": "c",
      "explicacao": "Segundo Reinado: infraestrutura, imigração, abolicionismo e crise final do Império. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0123",
      "enunciado": "Qual definição corresponde corretamente a Segundo Reinado?",
      "alternativas": {
        "a": "período de centralização estatal, industrialização e criação de legislação trabalhista",
        "b": "processo de desmonte legal da escravidão culminando na Lei Áurea",
        "c": "golpe político-militar que encerrou a monarquia brasileira",
        "d": "período de estabilidade relativa da monarquia, expansão cafeeira e transformações sociais",
        "e": "ordem política federativa marcada por poder oligárquico e desigualdade regional"
      },
      "resposta": "d",
      "explicacao": "Segundo Reinado é período de estabilidade relativa da monarquia, expansão cafeeira e transformações sociais. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0124",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: processo de desmonte legal da escravidão culminando na Lei Áurea?",
      "alternativas": {
        "a": "Proclamação da República",
        "b": "Primeira Guerra Mundial",
        "c": "Era Vargas",
        "d": "Primeira República",
        "e": "Abolição da escravidão no Brasil"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Abolição da escravidão no Brasil: processo de desmonte legal da escravidão culminando na Lei Áurea. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0125",
      "enunciado": "Em que contexto histórico deve ser situado o tema Abolição da escravidão no Brasil?",
      "alternativas": {
        "a": "século XIX, especialmente de 1850 a 1888",
        "b": "Europa e outras regiões entre 1914 e 1918",
        "c": "Brasil entre 1889 e 1930",
        "d": "Brasil entre 1930 e 1945",
        "e": "Brasil em 1889"
      },
      "resposta": "a",
      "explicacao": "Abolição da escravidão no Brasil se situa em: século XIX, especialmente de 1850 a 1888. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0126",
      "enunciado": "Qual condição ajuda a caracterizar Abolição da escravidão no Brasil?",
      "alternativas": {
        "a": "rivalidades imperialistas, nacionalismos, alianças e crise balcânica",
        "b": "resistência negra, abolicionismo e mudanças econômicas e internacionais",
        "c": "federalismo, economia agrário-exportadora e domínio de elites locais",
        "d": "desgaste do Império, republicanismo e insatisfação de setores militares e elites",
        "e": "crise oligárquica, impacto de 1929 e movimento de 1930"
      },
      "resposta": "b",
      "explicacao": "Abolição da escravidão no Brasil: resistência negra, abolicionismo e mudanças econômicas e internacionais. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0127",
      "enunciado": "Qual consequência ou função se associa corretamente a Abolição da escravidão no Brasil?",
      "alternativas": {
        "a": "coronelismo, conflitos sociais e movimentos de contestação",
        "b": "implantação de república federativa com participação popular limitada",
        "c": "liberdade jurídica sem ampla reparação, terra ou inclusão social",
        "d": "fortalecimento do Executivo, trabalhismo e experiência ditatorial do Estado Novo",
        "e": "devastação, novos Estados e tratado de paz que manteve tensões"
      },
      "resposta": "c",
      "explicacao": "Abolição da escravidão no Brasil: liberdade jurídica sem ampla reparação, terra ou inclusão social. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0128",
      "enunciado": "Qual definição corresponde corretamente a Abolição da escravidão no Brasil?",
      "alternativas": {
        "a": "golpe político-militar que encerrou a monarquia brasileira",
        "b": "ordem política federativa marcada por poder oligárquico e desigualdade regional",
        "c": "período de centralização estatal, industrialização e criação de legislação trabalhista",
        "d": "processo de desmonte legal da escravidão culminando na Lei Áurea",
        "e": "guerra industrial de grande escala entre alianças de potências"
      },
      "resposta": "d",
      "explicacao": "Abolição da escravidão no Brasil é processo de desmonte legal da escravidão culminando na Lei Áurea. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0129",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: golpe político-militar que encerrou a monarquia brasileira?",
      "alternativas": {
        "a": "Era Vargas",
        "b": "Revolução Russa",
        "c": "Primeira Guerra Mundial",
        "d": "Primeira República",
        "e": "Proclamação da República"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Proclamação da República: golpe político-militar que encerrou a monarquia brasileira. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0130",
      "enunciado": "Em que contexto histórico deve ser situado o tema Proclamação da República?",
      "alternativas": {
        "a": "Brasil em 1889",
        "b": "Brasil entre 1889 e 1930",
        "c": "Europa e outras regiões entre 1914 e 1918",
        "d": "Brasil entre 1930 e 1945",
        "e": "Rússia em 1917 e guerra civil subsequente"
      },
      "resposta": "a",
      "explicacao": "Proclamação da República se situa em: Brasil em 1889. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0131",
      "enunciado": "Qual condição ajuda a caracterizar Proclamação da República?",
      "alternativas": {
        "a": "rivalidades imperialistas, nacionalismos, alianças e crise balcânica",
        "b": "desgaste do Império, republicanismo e insatisfação de setores militares e elites",
        "c": "crise oligárquica, impacto de 1929 e movimento de 1930",
        "d": "federalismo, economia agrário-exportadora e domínio de elites locais",
        "e": "guerra, autoritarismo, desigualdade agrária e mobilização operária"
      },
      "resposta": "b",
      "explicacao": "Proclamação da República: desgaste do Império, republicanismo e insatisfação de setores militares e elites. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0132",
      "enunciado": "Qual consequência ou função se associa corretamente a Proclamação da República?",
      "alternativas": {
        "a": "formação do primeiro Estado socialista e reorganização geopolítica",
        "b": "fortalecimento do Executivo, trabalhismo e experiência ditatorial do Estado Novo",
        "c": "implantação de república federativa com participação popular limitada",
        "d": "coronelismo, conflitos sociais e movimentos de contestação",
        "e": "devastação, novos Estados e tratado de paz que manteve tensões"
      },
      "resposta": "c",
      "explicacao": "Proclamação da República: implantação de república federativa com participação popular limitada. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0133",
      "enunciado": "Qual definição corresponde corretamente a Proclamação da República?",
      "alternativas": {
        "a": "período de centralização estatal, industrialização e criação de legislação trabalhista",
        "b": "ordem política federativa marcada por poder oligárquico e desigualdade regional",
        "c": "queda do czarismo e tomada do poder pelos bolcheviques",
        "d": "golpe político-militar que encerrou a monarquia brasileira",
        "e": "guerra industrial de grande escala entre alianças de potências"
      },
      "resposta": "d",
      "explicacao": "Proclamação da República é golpe político-militar que encerrou a monarquia brasileira. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0134",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: ordem política federativa marcada por poder oligárquico e desigualdade regional?",
      "alternativas": {
        "a": "Revolução Russa",
        "b": "Primeira Guerra Mundial",
        "c": "Crise de 1929",
        "d": "Era Vargas",
        "e": "Primeira República"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Primeira República: ordem política federativa marcada por poder oligárquico e desigualdade regional. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0135",
      "enunciado": "Em que contexto histórico deve ser situado o tema Primeira República?",
      "alternativas": {
        "a": "Brasil entre 1889 e 1930",
        "b": "Europa e outras regiões entre 1914 e 1918",
        "c": "Rússia em 1917 e guerra civil subsequente",
        "d": "iniciada nos Estados Unidos em 1929",
        "e": "Brasil entre 1930 e 1945"
      },
      "resposta": "a",
      "explicacao": "Primeira República se situa em: Brasil entre 1889 e 1930. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0136",
      "enunciado": "Qual condição ajuda a caracterizar Primeira República?",
      "alternativas": {
        "a": "rivalidades imperialistas, nacionalismos, alianças e crise balcânica",
        "b": "federalismo, economia agrário-exportadora e domínio de elites locais",
        "c": "especulação, crédito, fragilidade bancária e descompasso entre produção e consumo",
        "d": "guerra, autoritarismo, desigualdade agrária e mobilização operária",
        "e": "crise oligárquica, impacto de 1929 e movimento de 1930"
      },
      "resposta": "b",
      "explicacao": "Primeira República: federalismo, economia agrário-exportadora e domínio de elites locais. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0137",
      "enunciado": "Qual consequência ou função se associa corretamente a Primeira República?",
      "alternativas": {
        "a": "formação do primeiro Estado socialista e reorganização geopolítica",
        "b": "devastação, novos Estados e tratado de paz que manteve tensões",
        "c": "coronelismo, conflitos sociais e movimentos de contestação",
        "d": "fortalecimento do Executivo, trabalhismo e experiência ditatorial do Estado Novo",
        "e": "desemprego, intervenção estatal e políticas do New Deal"
      },
      "resposta": "c",
      "explicacao": "Primeira República: coronelismo, conflitos sociais e movimentos de contestação. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0138",
      "enunciado": "Qual definição corresponde corretamente a Primeira República?",
      "alternativas": {
        "a": "período de centralização estatal, industrialização e criação de legislação trabalhista",
        "b": "guerra industrial de grande escala entre alianças de potências",
        "c": "colapso financeiro que se transformou em depressão econômica internacional",
        "d": "ordem política federativa marcada por poder oligárquico e desigualdade regional",
        "e": "queda do czarismo e tomada do poder pelos bolcheviques"
      },
      "resposta": "d",
      "explicacao": "Primeira República é ordem política federativa marcada por poder oligárquico e desigualdade regional. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0139",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: período de centralização estatal, industrialização e criação de legislação trabalhista?",
      "alternativas": {
        "a": "Fascismo e nazismo",
        "b": "Primeira Guerra Mundial",
        "c": "Revolução Russa",
        "d": "Crise de 1929",
        "e": "Era Vargas"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Era Vargas: período de centralização estatal, industrialização e criação de legislação trabalhista. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0140",
      "enunciado": "Em que contexto histórico deve ser situado o tema Era Vargas?",
      "alternativas": {
        "a": "Brasil entre 1930 e 1945",
        "b": "Europa e outras regiões entre 1914 e 1918",
        "c": "iniciada nos Estados Unidos em 1929",
        "d": "Europa nas décadas de 1920 e 1930",
        "e": "Rússia em 1917 e guerra civil subsequente"
      },
      "resposta": "a",
      "explicacao": "Era Vargas se situa em: Brasil entre 1930 e 1945. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0141",
      "enunciado": "Qual condição ajuda a caracterizar Era Vargas?",
      "alternativas": {
        "a": "crises econômicas, medo do comunismo, ressentimentos nacionais e violência política",
        "b": "crise oligárquica, impacto de 1929 e movimento de 1930",
        "c": "guerra, autoritarismo, desigualdade agrária e mobilização operária",
        "d": "rivalidades imperialistas, nacionalismos, alianças e crise balcânica",
        "e": "especulação, crédito, fragilidade bancária e descompasso entre produção e consumo"
      },
      "resposta": "b",
      "explicacao": "Era Vargas: crise oligárquica, impacto de 1929 e movimento de 1930. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0142",
      "enunciado": "Qual consequência ou função se associa corretamente a Era Vargas?",
      "alternativas": {
        "a": "formação do primeiro Estado socialista e reorganização geopolítica",
        "b": "ditaduras, perseguições, expansionismo e preparação para a guerra",
        "c": "fortalecimento do Executivo, trabalhismo e experiência ditatorial do Estado Novo",
        "d": "devastação, novos Estados e tratado de paz que manteve tensões",
        "e": "desemprego, intervenção estatal e políticas do New Deal"
      },
      "resposta": "c",
      "explicacao": "Era Vargas: fortalecimento do Executivo, trabalhismo e experiência ditatorial do Estado Novo. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0143",
      "enunciado": "Qual definição corresponde corretamente a Era Vargas?",
      "alternativas": {
        "a": "queda do czarismo e tomada do poder pelos bolcheviques",
        "b": "colapso financeiro que se transformou em depressão econômica internacional",
        "c": "guerra industrial de grande escala entre alianças de potências",
        "d": "período de centralização estatal, industrialização e criação de legislação trabalhista",
        "e": "movimentos autoritários, ultranacionalistas e antidemocráticos do entreguerras"
      },
      "resposta": "d",
      "explicacao": "Era Vargas é período de centralização estatal, industrialização e criação de legislação trabalhista. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0184",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: regime autoritário que suprimiu direitos políticos e perseguiu opositores?",
      "alternativas": {
        "a": "Mesopotâmia",
        "b": "Globalização e neoliberalismo",
        "c": "Revolução Neolítica",
        "d": "Redemocratização e Constituição de 1988",
        "e": "Ditadura civil-militar brasileira"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Ditadura civil-militar brasileira: regime autoritário que suprimiu direitos políticos e perseguiu opositores. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0185",
      "enunciado": "Em que contexto histórico deve ser situado o tema Ditadura civil-militar brasileira?",
      "alternativas": {
        "a": "Brasil entre 1964 e 1985",
        "b": "fim do século XX e início do XXI",
        "c": "Antiguidade Oriental, sobretudo a partir do quarto milênio a.C",
        "d": "Brasil nas décadas de 1980 e 1990",
        "e": "aproximadamente a partir de 10.000 a.C., em diferentes regiões"
      },
      "resposta": "a",
      "explicacao": "Ditadura civil-militar brasileira se situa em: Brasil entre 1964 e 1985. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0186",
      "enunciado": "Qual condição ajuda a caracterizar Ditadura civil-militar brasileira?",
      "alternativas": {
        "a": "agricultura irrigada e administração coletiva de recursos hídricos",
        "b": "golpe, anticomunismo, apoio civil e contexto da Guerra Fria",
        "c": "domesticação de plantas e animais combinada a mudanças ambientais e técnicas",
        "d": "mobilização civil, crise do regime e reorganização partidária",
        "e": "tecnologias de comunicação, finanças globais e crise do modelo fordista"
      },
      "resposta": "b",
      "explicacao": "Ditadura civil-militar brasileira: golpe, anticomunismo, apoio civil e contexto da Guerra Fria. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0187",
      "enunciado": "Qual consequência ou função se associa corretamente a Ditadura civil-militar brasileira?",
      "alternativas": {
        "a": "formação de aldeias, produção de excedentes e maior diferenciação social",
        "b": "interdependência, cadeias globais e novas formas de desigualdade e trabalho",
        "c": "censura, repressão, modernização econômica desigual e endividamento",
        "d": "ampliação de direitos, eleições e novas instituições de controle",
        "e": "desenvolvimento de Estados, registros escritos e códigos jurídicos"
      },
      "resposta": "c",
      "explicacao": "Ditadura civil-militar brasileira: censura, repressão, modernização econômica desigual e endividamento. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0188",
      "enunciado": "Qual definição corresponde corretamente a Ditadura civil-militar brasileira?",
      "alternativas": {
        "a": "transição gradual de grupos caçadores-coletores para comunidades com agricultura, criação de animais e maior sedentarização",
        "b": "civilizações urbanas organizadas entre os rios Tigre e Eufrates, com cidades-Estado e escrita cuneiforme",
        "c": "transição do regime autoritário para uma democracia constitucional",
        "d": "regime autoritário que suprimiu direitos políticos e perseguiu opositores",
        "e": "integração de fluxos econômicos, informacionais e produtivos acompanhada de políticas de abertura e desregulação"
      },
      "resposta": "d",
      "explicacao": "Ditadura civil-militar brasileira é regime autoritário que suprimiu direitos políticos e perseguiu opositores. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0189",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: transição do regime autoritário para uma democracia constitucional?",
      "alternativas": {
        "a": "Mesopotâmia",
        "b": "Egito Antigo",
        "c": "Globalização e neoliberalismo",
        "d": "Revolução Neolítica",
        "e": "Redemocratização e Constituição de 1988"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Redemocratização e Constituição de 1988: transição do regime autoritário para uma democracia constitucional. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-hist-0190",
      "enunciado": "Em que contexto histórico deve ser situado o tema Redemocratização e Constituição de 1988?",
      "alternativas": {
        "a": "Brasil nas décadas de 1980 e 1990",
        "b": "fim do século XX e início do XXI",
        "c": "Antiguidade Oriental, sobretudo a partir do quarto milênio a.C",
        "d": "aproximadamente a partir de 10.000 a.C., em diferentes regiões",
        "e": "Antiguidade africana, do período pré-dinástico à conquista romana"
      },
      "resposta": "a",
      "explicacao": "Redemocratização e Constituição de 1988 se situa em: Brasil nas décadas de 1980 e 1990. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0191",
      "enunciado": "Qual condição ajuda a caracterizar Redemocratização e Constituição de 1988?",
      "alternativas": {
        "a": "tecnologias de comunicação, finanças globais e crise do modelo fordista",
        "b": "mobilização civil, crise do regime e reorganização partidária",
        "c": "domesticação de plantas e animais combinada a mudanças ambientais e técnicas",
        "d": "agricultura irrigada e administração coletiva de recursos hídricos",
        "e": "ciclos de cheia do Nilo e organização estatal do trabalho"
      },
      "resposta": "b",
      "explicacao": "Redemocratização e Constituição de 1988: mobilização civil, crise do regime e reorganização partidária. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0192",
      "enunciado": "Qual consequência ou função se associa corretamente a Redemocratização e Constituição de 1988?",
      "alternativas": {
        "a": "interdependência, cadeias globais e novas formas de desigualdade e trabalho",
        "b": "formação de ampla burocracia, cultura religiosa complexa e arquitetura monumental",
        "c": "ampliação de direitos, eleições e novas instituições de controle",
        "d": "formação de aldeias, produção de excedentes e maior diferenciação social",
        "e": "desenvolvimento de Estados, registros escritos e códigos jurídicos"
      },
      "resposta": "c",
      "explicacao": "Redemocratização e Constituição de 1988: ampliação de direitos, eleições e novas instituições de controle. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-hist-0193",
      "enunciado": "Qual definição corresponde corretamente a Redemocratização e Constituição de 1988?",
      "alternativas": {
        "a": "transição gradual de grupos caçadores-coletores para comunidades com agricultura, criação de animais e maior sedentarização",
        "b": "integração de fluxos econômicos, informacionais e produtivos acompanhada de políticas de abertura e desregulação",
        "c": "sociedade centralizada em torno do faraó e articulada à agricultura no vale do Nilo",
        "d": "transição do regime autoritário para uma democracia constitucional",
        "e": "civilizações urbanas organizadas entre os rios Tigre e Eufrates, com cidades-Estado e escrita cuneiforme"
      },
      "resposta": "d",
      "explicacao": "Redemocratização e Constituição de 1988 é transição do regime autoritário para uma democracia constitucional. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "geografia": [
    {
      "id": "xtr-geo-0026",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: aumento da população urbana e expansão das formas de vida e produção urbanas?",
      "alternativas": {
        "a": "Urbanização",
        "b": "Migrações internacionais",
        "c": "Metropolização",
        "d": "Segregação socioespacial",
        "e": "Mobilidade urbana"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Urbanização: aumento da população urbana e expansão das formas de vida e produção urbanas. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0027",
      "enunciado": "Qual condição ajuda a caracterizar Urbanização?",
      "alternativas": {
        "a": "centralização de serviços avançados e integração de municípios",
        "b": "migração, concentração de serviços e mudanças econômicas",
        "c": "localização de moradia, trabalho e serviços",
        "d": "mercado imobiliário, políticas públicas seletivas e desigualdade",
        "e": "diferenças de oportunidades, conflitos, redes familiares e crises"
      },
      "resposta": "b",
      "explicacao": "Urbanização: migração, concentração de serviços e mudanças econômicas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0028",
      "enunciado": "Qual consequência ou função se associa corretamente a Urbanização?",
      "alternativas": {
        "a": "deslocamentos pendulares, conurbação e gestão intermunicipal",
        "b": "remessas, diversidade cultural e desafios de integração",
        "c": "expansão de cidades, redes urbanas e demandas por infraestrutura",
        "d": "impactos sobre tempo, poluição, acesso e qualidade de vida",
        "e": "distâncias de oportunidades e distribuição desigual de equipamentos"
      },
      "resposta": "c",
      "explicacao": "Urbanização: expansão de cidades, redes urbanas e demandas por infraestrutura. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0029",
      "enunciado": "Qual definição corresponde corretamente a Urbanização?",
      "alternativas": {
        "a": "separação territorial de grupos sociais segundo renda, acesso e poder",
        "b": "deslocamentos populacionais entre países por razões econômicas, políticas ou ambientais",
        "c": "concentração populacional e funcional em grandes aglomerações articuladas",
        "d": "aumento da população urbana e expansão das formas de vida e produção urbanas",
        "e": "deslocamento cotidiano de pessoas e mercadorias dentro das cidades"
      },
      "resposta": "d",
      "explicacao": "Urbanização é aumento da população urbana e expansão das formas de vida e produção urbanas. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0030",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: concentração populacional e funcional em grandes aglomerações articuladas?",
      "alternativas": {
        "a": "Transição demográfica",
        "b": "Segregação socioespacial",
        "c": "Migrações internacionais",
        "d": "Mobilidade urbana",
        "e": "Metropolização"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Metropolização: concentração populacional e funcional em grandes aglomerações articuladas. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0031",
      "enunciado": "Qual condição ajuda a caracterizar Metropolização?",
      "alternativas": {
        "a": "centralização de serviços avançados e integração de municípios",
        "b": "mercado imobiliário, políticas públicas seletivas e desigualdade",
        "c": "melhorias sanitárias seguidas de transformações familiares e urbanas",
        "d": "diferenças de oportunidades, conflitos, redes familiares e crises",
        "e": "localização de moradia, trabalho e serviços"
      },
      "resposta": "a",
      "explicacao": "Metropolização: centralização de serviços avançados e integração de municípios. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0032",
      "enunciado": "Qual consequência ou função se associa corretamente a Metropolização?",
      "alternativas": {
        "a": "distâncias de oportunidades e distribuição desigual de equipamentos",
        "b": "deslocamentos pendulares, conurbação e gestão intermunicipal",
        "c": "envelhecimento populacional e alteração da estrutura etária",
        "d": "impactos sobre tempo, poluição, acesso e qualidade de vida",
        "e": "remessas, diversidade cultural e desafios de integração"
      },
      "resposta": "b",
      "explicacao": "Metropolização: deslocamentos pendulares, conurbação e gestão intermunicipal. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0033",
      "enunciado": "Qual definição corresponde corretamente a Metropolização?",
      "alternativas": {
        "a": "separação territorial de grupos sociais segundo renda, acesso e poder",
        "b": "deslocamentos populacionais entre países por razões econômicas, políticas ou ambientais",
        "c": "concentração populacional e funcional em grandes aglomerações articuladas",
        "d": "deslocamento cotidiano de pessoas e mercadorias dentro das cidades",
        "e": "passagem de altas para baixas taxas de mortalidade e natalidade"
      },
      "resposta": "c",
      "explicacao": "Metropolização é concentração populacional e funcional em grandes aglomerações articuladas. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0034",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: separação territorial de grupos sociais segundo renda, acesso e poder?",
      "alternativas": {
        "a": "Agronegócio",
        "b": "Migrações internacionais",
        "c": "Transição demográfica",
        "d": "Segregação socioespacial",
        "e": "Mobilidade urbana"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Segregação socioespacial: separação territorial de grupos sociais segundo renda, acesso e poder. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0035",
      "enunciado": "Qual condição ajuda a caracterizar Segregação socioespacial?",
      "alternativas": {
        "a": "diferenças de oportunidades, conflitos, redes familiares e crises",
        "b": "modernização técnica, crédito, demanda externa e infraestrutura",
        "c": "melhorias sanitárias seguidas de transformações familiares e urbanas",
        "d": "localização de moradia, trabalho e serviços",
        "e": "mercado imobiliário, políticas públicas seletivas e desigualdade"
      },
      "resposta": "e",
      "explicacao": "Segregação socioespacial: mercado imobiliário, políticas públicas seletivas e desigualdade. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0036",
      "enunciado": "Qual consequência ou função se associa corretamente a Segregação socioespacial?",
      "alternativas": {
        "a": "distâncias de oportunidades e distribuição desigual de equipamentos",
        "b": "remessas, diversidade cultural e desafios de integração",
        "c": "envelhecimento populacional e alteração da estrutura etária",
        "d": "alta produtividade combinada a concentração e impactos territoriais",
        "e": "impactos sobre tempo, poluição, acesso e qualidade de vida"
      },
      "resposta": "a",
      "explicacao": "Segregação socioespacial: distâncias de oportunidades e distribuição desigual de equipamentos. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0037",
      "enunciado": "Qual definição corresponde corretamente a Segregação socioespacial?",
      "alternativas": {
        "a": "deslocamentos populacionais entre países por razões econômicas, políticas ou ambientais",
        "b": "separação territorial de grupos sociais segundo renda, acesso e poder",
        "c": "cadeia integrada de insumos, produção agropecuária, processamento, logística e finanças",
        "d": "deslocamento cotidiano de pessoas e mercadorias dentro das cidades",
        "e": "passagem de altas para baixas taxas de mortalidade e natalidade"
      },
      "resposta": "b",
      "explicacao": "Segregação socioespacial é separação territorial de grupos sociais segundo renda, acesso e poder. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0038",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: deslocamento cotidiano de pessoas e mercadorias dentro das cidades?",
      "alternativas": {
        "a": "Migrações internacionais",
        "b": "Transição demográfica",
        "c": "Mobilidade urbana",
        "d": "Agronegócio",
        "e": "Estrutura fundiária"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Mobilidade urbana: deslocamento cotidiano de pessoas e mercadorias dentro das cidades. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0039",
      "enunciado": "Qual condição ajuda a caracterizar Mobilidade urbana?",
      "alternativas": {
        "a": "diferenças de oportunidades, conflitos, redes familiares e crises",
        "b": "melhorias sanitárias seguidas de transformações familiares e urbanas",
        "c": "processos históricos de ocupação, legislação e poder econômico",
        "d": "localização de moradia, trabalho e serviços",
        "e": "modernização técnica, crédito, demanda externa e infraestrutura"
      },
      "resposta": "d",
      "explicacao": "Mobilidade urbana: localização de moradia, trabalho e serviços. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0040",
      "enunciado": "Qual consequência ou função se associa corretamente a Mobilidade urbana?",
      "alternativas": {
        "a": "envelhecimento populacional e alteração da estrutura etária",
        "b": "remessas, diversidade cultural e desafios de integração",
        "c": "alta produtividade combinada a concentração e impactos territoriais",
        "d": "concentração de terras, conflitos e diferentes formas de produção",
        "e": "impactos sobre tempo, poluição, acesso e qualidade de vida"
      },
      "resposta": "e",
      "explicacao": "Mobilidade urbana: impactos sobre tempo, poluição, acesso e qualidade de vida. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0041",
      "enunciado": "Qual definição corresponde corretamente a Mobilidade urbana?",
      "alternativas": {
        "a": "deslocamento cotidiano de pessoas e mercadorias dentro das cidades",
        "b": "cadeia integrada de insumos, produção agropecuária, processamento, logística e finanças",
        "c": "passagem de altas para baixas taxas de mortalidade e natalidade",
        "d": "deslocamentos populacionais entre países por razões econômicas, políticas ou ambientais",
        "e": "forma de distribuição e domínio da propriedade da terra"
      },
      "resposta": "a",
      "explicacao": "Mobilidade urbana é deslocamento cotidiano de pessoas e mercadorias dentro das cidades. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0046",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: passagem de altas para baixas taxas de mortalidade e natalidade?",
      "alternativas": {
        "a": "Reforma agrária",
        "b": "Transição demográfica",
        "c": "Agronegócio",
        "d": "Industrialização brasileira",
        "e": "Estrutura fundiária"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Transição demográfica: passagem de altas para baixas taxas de mortalidade e natalidade. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0047",
      "enunciado": "Qual condição ajuda a caracterizar Transição demográfica?",
      "alternativas": {
        "a": "concentração fundiária e demandas de movimentos sociais",
        "b": "processos históricos de ocupação, legislação e poder econômico",
        "c": "melhorias sanitárias seguidas de transformações familiares e urbanas",
        "d": "capital do café, políticas estatais, urbanização e mercado interno",
        "e": "modernização técnica, crédito, demanda externa e infraestrutura"
      },
      "resposta": "c",
      "explicacao": "Transição demográfica: melhorias sanitárias seguidas de transformações familiares e urbanas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0048",
      "enunciado": "Qual consequência ou função se associa corretamente a Transição demográfica?",
      "alternativas": {
        "a": "concentração de terras, conflitos e diferentes formas de produção",
        "b": "assentamentos, conflitos políticos e mudanças no uso da terra",
        "c": "concentração inicial no Sudeste e posterior desconcentração relativa",
        "d": "envelhecimento populacional e alteração da estrutura etária",
        "e": "alta produtividade combinada a concentração e impactos territoriais"
      },
      "resposta": "d",
      "explicacao": "Transição demográfica: envelhecimento populacional e alteração da estrutura etária. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0049",
      "enunciado": "Qual definição corresponde corretamente a Transição demográfica?",
      "alternativas": {
        "a": "política de redistribuição e regularização de terras para cumprir funções sociais",
        "b": "forma de distribuição e domínio da propriedade da terra",
        "c": "expansão e diversificação da produção industrial no território nacional",
        "d": "cadeia integrada de insumos, produção agropecuária, processamento, logística e finanças",
        "e": "passagem de altas para baixas taxas de mortalidade e natalidade"
      },
      "resposta": "e",
      "explicacao": "Transição demográfica é passagem de altas para baixas taxas de mortalidade e natalidade. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0050",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: cadeia integrada de insumos, produção agropecuária, processamento, logística e finanças?",
      "alternativas": {
        "a": "Agronegócio",
        "b": "Reforma agrária",
        "c": "Logística e transportes",
        "d": "Industrialização brasileira",
        "e": "Estrutura fundiária"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Agronegócio: cadeia integrada de insumos, produção agropecuária, processamento, logística e finanças. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0051",
      "enunciado": "Qual condição ajuda a caracterizar Agronegócio?",
      "alternativas": {
        "a": "concentração fundiária e demandas de movimentos sociais",
        "b": "modernização técnica, crédito, demanda externa e infraestrutura",
        "c": "infraestrutura, localização produtiva e decisões públicas",
        "d": "capital do café, políticas estatais, urbanização e mercado interno",
        "e": "processos históricos de ocupação, legislação e poder econômico"
      },
      "resposta": "b",
      "explicacao": "Agronegócio: modernização técnica, crédito, demanda externa e infraestrutura. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0052",
      "enunciado": "Qual consequência ou função se associa corretamente a Agronegócio?",
      "alternativas": {
        "a": "assentamentos, conflitos políticos e mudanças no uso da terra",
        "b": "redução ou aumento de custos e desigualdades regionais",
        "c": "alta produtividade combinada a concentração e impactos territoriais",
        "d": "concentração de terras, conflitos e diferentes formas de produção",
        "e": "concentração inicial no Sudeste e posterior desconcentração relativa"
      },
      "resposta": "c",
      "explicacao": "Agronegócio: alta produtividade combinada a concentração e impactos territoriais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0053",
      "enunciado": "Qual definição corresponde corretamente a Agronegócio?",
      "alternativas": {
        "a": "redes e operações que permitem circulação de mercadorias, pessoas e informações",
        "b": "política de redistribuição e regularização de terras para cumprir funções sociais",
        "c": "forma de distribuição e domínio da propriedade da terra",
        "d": "cadeia integrada de insumos, produção agropecuária, processamento, logística e finanças",
        "e": "expansão e diversificação da produção industrial no território nacional"
      },
      "resposta": "d",
      "explicacao": "Agronegócio é cadeia integrada de insumos, produção agropecuária, processamento, logística e finanças. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0054",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: forma de distribuição e domínio da propriedade da terra?",
      "alternativas": {
        "a": "Logística e transportes",
        "b": "Matriz energética",
        "c": "Reforma agrária",
        "d": "Industrialização brasileira",
        "e": "Estrutura fundiária"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Estrutura fundiária: forma de distribuição e domínio da propriedade da terra. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0055",
      "enunciado": "Qual condição ajuda a caracterizar Estrutura fundiária?",
      "alternativas": {
        "a": "processos históricos de ocupação, legislação e poder econômico",
        "b": "disponibilidade de recursos, tecnologia, custos e decisões políticas",
        "c": "infraestrutura, localização produtiva e decisões públicas",
        "d": "capital do café, políticas estatais, urbanização e mercado interno",
        "e": "concentração fundiária e demandas de movimentos sociais"
      },
      "resposta": "a",
      "explicacao": "Estrutura fundiária: processos históricos de ocupação, legislação e poder econômico. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0056",
      "enunciado": "Qual consequência ou função se associa corretamente a Estrutura fundiária?",
      "alternativas": {
        "a": "assentamentos, conflitos políticos e mudanças no uso da terra",
        "b": "concentração de terras, conflitos e diferentes formas de produção",
        "c": "concentração inicial no Sudeste e posterior desconcentração relativa",
        "d": "emissões, segurança energética e dependência externa",
        "e": "redução ou aumento de custos e desigualdades regionais"
      },
      "resposta": "b",
      "explicacao": "Estrutura fundiária: concentração de terras, conflitos e diferentes formas de produção. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0057",
      "enunciado": "Qual definição corresponde corretamente a Estrutura fundiária?",
      "alternativas": {
        "a": "política de redistribuição e regularização de terras para cumprir funções sociais",
        "b": "redes e operações que permitem circulação de mercadorias, pessoas e informações",
        "c": "forma de distribuição e domínio da propriedade da terra",
        "d": "expansão e diversificação da produção industrial no território nacional",
        "e": "composição das fontes de energia utilizadas por uma sociedade"
      },
      "resposta": "c",
      "explicacao": "Estrutura fundiária é forma de distribuição e domínio da propriedade da terra. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0058",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: política de redistribuição e regularização de terras para cumprir funções sociais?",
      "alternativas": {
        "a": "Industrialização brasileira",
        "b": "Mudanças climáticas",
        "c": "Matriz energética",
        "d": "Reforma agrária",
        "e": "Logística e transportes"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Reforma agrária: política de redistribuição e regularização de terras para cumprir funções sociais. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0059",
      "enunciado": "Qual condição ajuda a caracterizar Reforma agrária?",
      "alternativas": {
        "a": "disponibilidade de recursos, tecnologia, custos e decisões políticas",
        "b": "infraestrutura, localização produtiva e decisões públicas",
        "c": "queima de combustíveis fósseis, desmatamento e padrões de consumo",
        "d": "capital do café, políticas estatais, urbanização e mercado interno",
        "e": "concentração fundiária e demandas de movimentos sociais"
      },
      "resposta": "e",
      "explicacao": "Reforma agrária: concentração fundiária e demandas de movimentos sociais. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0060",
      "enunciado": "Qual consequência ou função se associa corretamente a Reforma agrária?",
      "alternativas": {
        "a": "assentamentos, conflitos políticos e mudanças no uso da terra",
        "b": "emissões, segurança energética e dependência externa",
        "c": "concentração inicial no Sudeste e posterior desconcentração relativa",
        "d": "redução ou aumento de custos e desigualdades regionais",
        "e": "eventos extremos, riscos sociais e necessidade de mitigação e adaptação"
      },
      "resposta": "a",
      "explicacao": "Reforma agrária: assentamentos, conflitos políticos e mudanças no uso da terra. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0061",
      "enunciado": "Qual definição corresponde corretamente a Reforma agrária?",
      "alternativas": {
        "a": "composição das fontes de energia utilizadas por uma sociedade",
        "b": "política de redistribuição e regularização de terras para cumprir funções sociais",
        "c": "alterações persistentes do clima intensificadas por emissões antrópicas de gases de efeito estufa",
        "d": "expansão e diversificação da produção industrial no território nacional",
        "e": "redes e operações que permitem circulação de mercadorias, pessoas e informações"
      },
      "resposta": "b",
      "explicacao": "Reforma agrária é política de redistribuição e regularização de terras para cumprir funções sociais. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0062",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: expansão e diversificação da produção industrial no território nacional?",
      "alternativas": {
        "a": "Mudanças climáticas",
        "b": "Biomas brasileiros",
        "c": "Industrialização brasileira",
        "d": "Matriz energética",
        "e": "Logística e transportes"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Industrialização brasileira: expansão e diversificação da produção industrial no território nacional. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0063",
      "enunciado": "Em que contexto histórico deve ser situado o tema Industrialização brasileira?",
      "alternativas": {
        "a": "integração territorial e competitividade econômica",
        "b": "sistema climático global contemporâneo",
        "c": "território brasileiro",
        "d": "sobretudo a partir do século XX",
        "e": "planejamento econômico e ambiental"
      },
      "resposta": "d",
      "explicacao": "Industrialização brasileira se situa em: sobretudo a partir do século XX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0064",
      "enunciado": "Qual condição ajuda a caracterizar Industrialização brasileira?",
      "alternativas": {
        "a": "infraestrutura, localização produtiva e decisões públicas",
        "b": "variação climática, relevo, solos e história natural",
        "c": "queima de combustíveis fósseis, desmatamento e padrões de consumo",
        "d": "disponibilidade de recursos, tecnologia, custos e decisões políticas",
        "e": "capital do café, políticas estatais, urbanização e mercado interno"
      },
      "resposta": "e",
      "explicacao": "Industrialização brasileira: capital do café, políticas estatais, urbanização e mercado interno. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0065",
      "enunciado": "Qual consequência ou função se associa corretamente a Industrialização brasileira?",
      "alternativas": {
        "a": "concentração inicial no Sudeste e posterior desconcentração relativa",
        "b": "emissões, segurança energética e dependência externa",
        "c": "redução ou aumento de custos e desigualdades regionais",
        "d": "eventos extremos, riscos sociais e necessidade de mitigação e adaptação",
        "e": "biodiversidade, serviços ecossistêmicos e conflitos de conservação"
      },
      "resposta": "a",
      "explicacao": "Industrialização brasileira: concentração inicial no Sudeste e posterior desconcentração relativa. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0066",
      "enunciado": "Qual definição corresponde corretamente a Industrialização brasileira?",
      "alternativas": {
        "a": "redes e operações que permitem circulação de mercadorias, pessoas e informações",
        "b": "expansão e diversificação da produção industrial no território nacional",
        "c": "composição das fontes de energia utilizadas por uma sociedade",
        "d": "alterações persistentes do clima intensificadas por emissões antrópicas de gases de efeito estufa",
        "e": "grandes conjuntos ecológicos definidos por clima, vegetação, fauna e dinâmica ambiental"
      },
      "resposta": "b",
      "explicacao": "Industrialização brasileira é expansão e diversificação da produção industrial no território nacional. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0067",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: redes e operações que permitem circulação de mercadorias, pessoas e informações?",
      "alternativas": {
        "a": "Bacias hidrográficas",
        "b": "Matriz energética",
        "c": "Logística e transportes",
        "d": "Mudanças climáticas",
        "e": "Biomas brasileiros"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Logística e transportes: redes e operações que permitem circulação de mercadorias, pessoas e informações. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0068",
      "enunciado": "Qual condição ajuda a caracterizar Logística e transportes?",
      "alternativas": {
        "a": "queima de combustíveis fósseis, desmatamento e padrões de consumo",
        "b": "disponibilidade de recursos, tecnologia, custos e decisões políticas",
        "c": "variação climática, relevo, solos e história natural",
        "d": "infraestrutura, localização produtiva e decisões públicas",
        "e": "relevo e divisores de água organizam o escoamento"
      },
      "resposta": "d",
      "explicacao": "Logística e transportes: infraestrutura, localização produtiva e decisões públicas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0069",
      "enunciado": "Qual consequência ou função se associa corretamente a Logística e transportes?",
      "alternativas": {
        "a": "biodiversidade, serviços ecossistêmicos e conflitos de conservação",
        "b": "emissões, segurança energética e dependência externa",
        "c": "eventos extremos, riscos sociais e necessidade de mitigação e adaptação",
        "d": "abastecimento, energia, transporte e necessidade de gestão integrada",
        "e": "redução ou aumento de custos e desigualdades regionais"
      },
      "resposta": "e",
      "explicacao": "Logística e transportes: redução ou aumento de custos e desigualdades regionais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0070",
      "enunciado": "Qual definição corresponde corretamente a Logística e transportes?",
      "alternativas": {
        "a": "redes e operações que permitem circulação de mercadorias, pessoas e informações",
        "b": "grandes conjuntos ecológicos definidos por clima, vegetação, fauna e dinâmica ambiental",
        "c": "composição das fontes de energia utilizadas por uma sociedade",
        "d": "alterações persistentes do clima intensificadas por emissões antrópicas de gases de efeito estufa",
        "e": "áreas drenadas por um rio principal e seus afluentes"
      },
      "resposta": "a",
      "explicacao": "Logística e transportes é redes e operações que permitem circulação de mercadorias, pessoas e informações. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0071",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: composição das fontes de energia utilizadas por uma sociedade?",
      "alternativas": {
        "a": "Mudanças climáticas",
        "b": "Matriz energética",
        "c": "Bacias hidrográficas",
        "d": "Biomas brasileiros",
        "e": "Degradação dos solos"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Matriz energética: composição das fontes de energia utilizadas por uma sociedade. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0072",
      "enunciado": "Qual condição ajuda a caracterizar Matriz energética?",
      "alternativas": {
        "a": "relevo e divisores de água organizam o escoamento",
        "b": "erosão, desmatamento, manejo inadequado, salinização e contaminação",
        "c": "disponibilidade de recursos, tecnologia, custos e decisões políticas",
        "d": "queima de combustíveis fósseis, desmatamento e padrões de consumo",
        "e": "variação climática, relevo, solos e história natural"
      },
      "resposta": "c",
      "explicacao": "Matriz energética: disponibilidade de recursos, tecnologia, custos e decisões políticas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0073",
      "enunciado": "Qual consequência ou função se associa corretamente a Matriz energética?",
      "alternativas": {
        "a": "biodiversidade, serviços ecossistêmicos e conflitos de conservação",
        "b": "abastecimento, energia, transporte e necessidade de gestão integrada",
        "c": "eventos extremos, riscos sociais e necessidade de mitigação e adaptação",
        "d": "emissões, segurança energética e dependência externa",
        "e": "queda de produtividade, assoreamento e desertificação"
      },
      "resposta": "d",
      "explicacao": "Matriz energética: emissões, segurança energética e dependência externa. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0074",
      "enunciado": "Qual definição corresponde corretamente a Matriz energética?",
      "alternativas": {
        "a": "grandes conjuntos ecológicos definidos por clima, vegetação, fauna e dinâmica ambiental",
        "b": "perda de fertilidade, estrutura ou cobertura do solo por processos naturais e humanos",
        "c": "áreas drenadas por um rio principal e seus afluentes",
        "d": "alterações persistentes do clima intensificadas por emissões antrópicas de gases de efeito estufa",
        "e": "composição das fontes de energia utilizadas por uma sociedade"
      },
      "resposta": "e",
      "explicacao": "Matriz energética é composição das fontes de energia utilizadas por uma sociedade. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0095",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: modelo que explica o movimento de grandes blocos da litosfera?",
      "alternativas": {
        "a": "Tectônica de placas",
        "b": "Geomorfologia",
        "c": "Sensoriamento remoto",
        "d": "Escala cartográfica",
        "e": "Projeções cartográficas"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Tectônica de placas: modelo que explica o movimento de grandes blocos da litosfera. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0096",
      "enunciado": "Qual condição ajuda a caracterizar Tectônica de placas?",
      "alternativas": {
        "a": "tectonismo, intemperismo, erosão e sedimentação",
        "b": "correntes do manto e interação entre limites de placas",
        "c": "registro da energia refletida ou emitida pelos alvos",
        "d": "impossibilidade de preservar simultaneamente todas as propriedades geométricas",
        "e": "necessidade de reduzir a realidade mantendo proporções"
      },
      "resposta": "b",
      "explicacao": "Tectônica de placas: correntes do manto e interação entre limites de placas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0097",
      "enunciado": "Qual consequência ou função se associa corretamente a Tectônica de placas?",
      "alternativas": {
        "a": "compreensão de riscos, paisagens e uso do território",
        "b": "acompanhamento de vegetação, cidades, água e mudanças territoriais",
        "c": "terremotos, vulcanismo e formação de cadeias montanhosas",
        "d": "produção inevitável de distorções de área, forma, distância ou direção",
        "e": "define o grau de detalhamento e permite calcular distâncias"
      },
      "resposta": "c",
      "explicacao": "Tectônica de placas: terremotos, vulcanismo e formação de cadeias montanhosas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0098",
      "enunciado": "Qual definição corresponde corretamente a Tectônica de placas?",
      "alternativas": {
        "a": "métodos de representar a superfície curva da Terra em um plano",
        "b": "estudo das formas de relevo e dos processos que as produzem e transformam",
        "c": "obtenção de informações da superfície terrestre por sensores sem contato direto",
        "d": "modelo que explica o movimento de grandes blocos da litosfera",
        "e": "relação matemática entre uma distância no mapa e a distância real"
      },
      "resposta": "d",
      "explicacao": "Tectônica de placas é modelo que explica o movimento de grandes blocos da litosfera. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0099",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: estudo das formas de relevo e dos processos que as produzem e transformam?",
      "alternativas": {
        "a": "Sistema de Informação Geográfica",
        "b": "Projeções cartográficas",
        "c": "Escala cartográfica",
        "d": "Sensoriamento remoto",
        "e": "Geomorfologia"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Geomorfologia: estudo das formas de relevo e dos processos que as produzem e transformam. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0100",
      "enunciado": "Qual condição ajuda a caracterizar Geomorfologia?",
      "alternativas": {
        "a": "tectonismo, intemperismo, erosão e sedimentação",
        "b": "necessidade de reduzir a realidade mantendo proporções",
        "c": "impossibilidade de preservar simultaneamente todas as propriedades geométricas",
        "d": "integração de camadas espaciais e bancos de dados",
        "e": "registro da energia refletida ou emitida pelos alvos"
      },
      "resposta": "a",
      "explicacao": "Geomorfologia: tectonismo, intemperismo, erosão e sedimentação. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0101",
      "enunciado": "Qual consequência ou função se associa corretamente a Geomorfologia?",
      "alternativas": {
        "a": "análise de padrões, redes, riscos e localização",
        "b": "compreensão de riscos, paisagens e uso do território",
        "c": "define o grau de detalhamento e permite calcular distâncias",
        "d": "acompanhamento de vegetação, cidades, água e mudanças territoriais",
        "e": "produção inevitável de distorções de área, forma, distância ou direção"
      },
      "resposta": "b",
      "explicacao": "Geomorfologia: compreensão de riscos, paisagens e uso do território. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0102",
      "enunciado": "Qual definição corresponde corretamente a Geomorfologia?",
      "alternativas": {
        "a": "obtenção de informações da superfície terrestre por sensores sem contato direto",
        "b": "métodos de representar a superfície curva da Terra em um plano",
        "c": "estudo das formas de relevo e dos processos que as produzem e transformam",
        "d": "relação matemática entre uma distância no mapa e a distância real",
        "e": "conjunto de ferramentas para armazenar, cruzar e analisar dados georreferenciados"
      },
      "resposta": "c",
      "explicacao": "Geomorfologia é estudo das formas de relevo e dos processos que as produzem e transformam. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0103",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: relação matemática entre uma distância no mapa e a distância real?",
      "alternativas": {
        "a": "Indicadores sociais",
        "b": "Sistema de Informação Geográfica",
        "c": "Projeções cartográficas",
        "d": "Escala cartográfica",
        "e": "Sensoriamento remoto"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Escala cartográfica: relação matemática entre uma distância no mapa e a distância real. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0104",
      "enunciado": "Qual condição ajuda a caracterizar Escala cartográfica?",
      "alternativas": {
        "a": "integração de camadas espaciais e bancos de dados",
        "b": "impossibilidade de preservar simultaneamente todas as propriedades geométricas",
        "c": "coleta de dados sobre renda, educação, saúde e outros fatores",
        "d": "registro da energia refletida ou emitida pelos alvos",
        "e": "necessidade de reduzir a realidade mantendo proporções"
      },
      "resposta": "e",
      "explicacao": "Escala cartográfica: necessidade de reduzir a realidade mantendo proporções. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0105",
      "enunciado": "Qual consequência ou função se associa corretamente a Escala cartográfica?",
      "alternativas": {
        "a": "define o grau de detalhamento e permite calcular distâncias",
        "b": "acompanhamento de vegetação, cidades, água e mudanças territoriais",
        "c": "produção inevitável de distorções de área, forma, distância ou direção",
        "d": "análise de padrões, redes, riscos e localização",
        "e": "comparação de desigualdades e acompanhamento de resultados"
      },
      "resposta": "a",
      "explicacao": "Escala cartográfica: define o grau de detalhamento e permite calcular distâncias. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0106",
      "enunciado": "Qual definição corresponde corretamente a Escala cartográfica?",
      "alternativas": {
        "a": "conjunto de ferramentas para armazenar, cruzar e analisar dados georreferenciados",
        "b": "relação matemática entre uma distância no mapa e a distância real",
        "c": "obtenção de informações da superfície terrestre por sensores sem contato direto",
        "d": "medidas sintéticas ou específicas usadas para avaliar condições de vida",
        "e": "métodos de representar a superfície curva da Terra em um plano"
      },
      "resposta": "b",
      "explicacao": "Escala cartográfica é relação matemática entre uma distância no mapa e a distância real. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0107",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: métodos de representar a superfície curva da Terra em um plano?",
      "alternativas": {
        "a": "Sensoriamento remoto",
        "b": "Indicadores sociais",
        "c": "Projeções cartográficas",
        "d": "Sistema de Informação Geográfica",
        "e": "Desenvolvimento sustentável"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Projeções cartográficas: métodos de representar a superfície curva da Terra em um plano. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0108",
      "enunciado": "Qual condição ajuda a caracterizar Projeções cartográficas?",
      "alternativas": {
        "a": "registro da energia refletida ou emitida pelos alvos",
        "b": "coleta de dados sobre renda, educação, saúde e outros fatores",
        "c": "percepção de riscos ecológicos e desigualdades",
        "d": "impossibilidade de preservar simultaneamente todas as propriedades geométricas",
        "e": "integração de camadas espaciais e bancos de dados"
      },
      "resposta": "d",
      "explicacao": "Projeções cartográficas: impossibilidade de preservar simultaneamente todas as propriedades geométricas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0109",
      "enunciado": "Qual consequência ou função se associa corretamente a Projeções cartográficas?",
      "alternativas": {
        "a": "comparação de desigualdades e acompanhamento de resultados",
        "b": "análise de padrões, redes, riscos e localização",
        "c": "planejamento de longo prazo e responsabilidade entre gerações",
        "d": "acompanhamento de vegetação, cidades, água e mudanças territoriais",
        "e": "produção inevitável de distorções de área, forma, distância ou direção"
      },
      "resposta": "e",
      "explicacao": "Projeções cartográficas: produção inevitável de distorções de área, forma, distância ou direção. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0110",
      "enunciado": "Qual definição corresponde corretamente a Projeções cartográficas?",
      "alternativas": {
        "a": "métodos de representar a superfície curva da Terra em um plano",
        "b": "proposta de conciliar necessidades sociais, atividade econômica e limites ambientais",
        "c": "obtenção de informações da superfície terrestre por sensores sem contato direto",
        "d": "medidas sintéticas ou específicas usadas para avaliar condições de vida",
        "e": "conjunto de ferramentas para armazenar, cruzar e analisar dados georreferenciados"
      },
      "resposta": "a",
      "explicacao": "Projeções cartográficas é métodos de representar a superfície curva da Terra em um plano. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0111",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: obtenção de informações da superfície terrestre por sensores sem contato direto?",
      "alternativas": {
        "a": "Acordos ambientais internacionais",
        "b": "Sensoriamento remoto",
        "c": "Desenvolvimento sustentável",
        "d": "Indicadores sociais",
        "e": "Sistema de Informação Geográfica"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Sensoriamento remoto: obtenção de informações da superfície terrestre por sensores sem contato direto. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0112",
      "enunciado": "Qual condição ajuda a caracterizar Sensoriamento remoto?",
      "alternativas": {
        "a": "percepção de riscos ecológicos e desigualdades",
        "b": "integração de camadas espaciais e bancos de dados",
        "c": "registro da energia refletida ou emitida pelos alvos",
        "d": "coleta de dados sobre renda, educação, saúde e outros fatores",
        "e": "problemas transfronteiriços exigem coordenação coletiva"
      },
      "resposta": "c",
      "explicacao": "Sensoriamento remoto: registro da energia refletida ou emitida pelos alvos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0113",
      "enunciado": "Qual consequência ou função se associa corretamente a Sensoriamento remoto?",
      "alternativas": {
        "a": "metas, financiamento, monitoramento e disputas sobre responsabilidades",
        "b": "análise de padrões, redes, riscos e localização",
        "c": "planejamento de longo prazo e responsabilidade entre gerações",
        "d": "acompanhamento de vegetação, cidades, água e mudanças territoriais",
        "e": "comparação de desigualdades e acompanhamento de resultados"
      },
      "resposta": "d",
      "explicacao": "Sensoriamento remoto: acompanhamento de vegetação, cidades, água e mudanças territoriais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0114",
      "enunciado": "Qual definição corresponde corretamente a Sensoriamento remoto?",
      "alternativas": {
        "a": "compromissos negociados entre Estados para enfrentar problemas ambientais comuns",
        "b": "conjunto de ferramentas para armazenar, cruzar e analisar dados georreferenciados",
        "c": "medidas sintéticas ou específicas usadas para avaliar condições de vida",
        "d": "proposta de conciliar necessidades sociais, atividade econômica e limites ambientais",
        "e": "obtenção de informações da superfície terrestre por sensores sem contato direto"
      },
      "resposta": "e",
      "explicacao": "Sensoriamento remoto é obtenção de informações da superfície terrestre por sensores sem contato direto. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0115",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: conjunto de ferramentas para armazenar, cruzar e analisar dados georreferenciados?",
      "alternativas": {
        "a": "Sistema de Informação Geográfica",
        "b": "Acordos ambientais internacionais",
        "c": "Desenvolvimento sustentável",
        "d": "Globalização econômica",
        "e": "Indicadores sociais"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Sistema de Informação Geográfica: conjunto de ferramentas para armazenar, cruzar e analisar dados georreferenciados. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0116",
      "enunciado": "Qual condição ajuda a caracterizar Sistema de Informação Geográfica?",
      "alternativas": {
        "a": "percepção de riscos ecológicos e desigualdades",
        "b": "integração de camadas espaciais e bancos de dados",
        "c": "coleta de dados sobre renda, educação, saúde e outros fatores",
        "d": "problemas transfronteiriços exigem coordenação coletiva",
        "e": "avanços logísticos, telecomunicações e liberalização de mercados"
      },
      "resposta": "b",
      "explicacao": "Sistema de Informação Geográfica: integração de camadas espaciais e bancos de dados. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0117",
      "enunciado": "Qual consequência ou função se associa corretamente a Sistema de Informação Geográfica?",
      "alternativas": {
        "a": "metas, financiamento, monitoramento e disputas sobre responsabilidades",
        "b": "planejamento de longo prazo e responsabilidade entre gerações",
        "c": "análise de padrões, redes, riscos e localização",
        "d": "comparação de desigualdades e acompanhamento de resultados",
        "e": "formação de cadeias globais com integração seletiva dos territórios"
      },
      "resposta": "c",
      "explicacao": "Sistema de Informação Geográfica: análise de padrões, redes, riscos e localização. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0118",
      "enunciado": "Qual definição corresponde corretamente a Sistema de Informação Geográfica?",
      "alternativas": {
        "a": "intensificação de fluxos de capitais, mercadorias, informações e produção em escala mundial",
        "b": "medidas sintéticas ou específicas usadas para avaliar condições de vida",
        "c": "proposta de conciliar necessidades sociais, atividade econômica e limites ambientais",
        "d": "conjunto de ferramentas para armazenar, cruzar e analisar dados georreferenciados",
        "e": "compromissos negociados entre Estados para enfrentar problemas ambientais comuns"
      },
      "resposta": "d",
      "explicacao": "Sistema de Informação Geográfica é conjunto de ferramentas para armazenar, cruzar e analisar dados georreferenciados. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "filosofia-sociologia": [
    {
      "id": "xtr-filo-0001",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: investigação racional sobre a natureza e o princípio das coisas?",
      "alternativas": {
        "a": "Filosofia pré-socrática",
        "b": "Platão",
        "c": "Sócrates",
        "d": "Aristóteles",
        "e": "Racionalismo moderno"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Filosofia pré-socrática: investigação racional sobre a natureza e o princípio das coisas. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0002",
      "enunciado": "Qual condição ajuda a caracterizar Filosofia pré-socrática?",
      "alternativas": {
        "a": "uso de perguntas para revelar contradições e estimular reflexão",
        "b": "substituição parcial de narrativas míticas por explicações argumentadas",
        "c": "busca de certeza inspirada pelo método matemático",
        "d": "análise de causas, formas de argumento e observação do mundo",
        "e": "crítica à opinião e busca de fundamentos estáveis do saber"
      },
      "resposta": "b",
      "explicacao": "Filosofia pré-socrática: substituição parcial de narrativas míticas por explicações argumentadas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0003",
      "enunciado": "Qual consequência ou função se associa corretamente a Filosofia pré-socrática?",
      "alternativas": {
        "a": "influenciou epistemologia, ética, política e metafísica",
        "b": "associação entre vida ética, autoconhecimento e argumentação",
        "c": "inaugurou problemas ontológicos e cosmológicos duradouros",
        "d": "debateu ideias inatas, dedução e limites dos sentidos",
        "e": "formulou ética das virtudes e instrumentos lógicos duradouros"
      },
      "resposta": "c",
      "explicacao": "Filosofia pré-socrática: inaugurou problemas ontológicos e cosmológicos duradouros. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0004",
      "enunciado": "Qual definição corresponde corretamente a Filosofia pré-socrática?",
      "alternativas": {
        "a": "corrente que enfatiza razão e princípios como fontes centrais do conhecimento",
        "b": "prática filosófica baseada em diálogo, exame de crenças e busca de definições",
        "c": "investigação sistemática de lógica, natureza, ética e política",
        "d": "investigação racional sobre a natureza e o princípio das coisas",
        "e": "filosofia que distingue aparência sensível e conhecimento inteligível"
      },
      "resposta": "d",
      "explicacao": "Filosofia pré-socrática é investigação racional sobre a natureza e o princípio das coisas. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0005",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: prática filosófica baseada em diálogo, exame de crenças e busca de definições?",
      "alternativas": {
        "a": "Aristóteles",
        "b": "Platão",
        "c": "Racionalismo moderno",
        "d": "Empirismo",
        "e": "Sócrates"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Sócrates: prática filosófica baseada em diálogo, exame de crenças e busca de definições. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0006",
      "enunciado": "Em que contexto histórico deve ser situado o tema Sócrates?",
      "alternativas": {
        "a": "Atenas do século V a.C",
        "b": "Europa dos séculos XVII e XVIII",
        "c": "Grécia clássica e Academia",
        "d": "Grécia do século IV a.C",
        "e": "filosofia britânica moderna"
      },
      "resposta": "a",
      "explicacao": "Sócrates se situa em: Atenas do século V a.C.. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0007",
      "enunciado": "Qual condição ajuda a caracterizar Sócrates?",
      "alternativas": {
        "a": "crítica à opinião e busca de fundamentos estáveis do saber",
        "b": "uso de perguntas para revelar contradições e estimular reflexão",
        "c": "busca de certeza inspirada pelo método matemático",
        "d": "crítica a ideias inatas e atenção à origem das ideias",
        "e": "análise de causas, formas de argumento e observação do mundo"
      },
      "resposta": "b",
      "explicacao": "Sócrates: uso de perguntas para revelar contradições e estimular reflexão. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0008",
      "enunciado": "Qual consequência ou função se associa corretamente a Sócrates?",
      "alternativas": {
        "a": "influenciou epistemologia, ética, política e metafísica",
        "b": "formulou ética das virtudes e instrumentos lógicos duradouros",
        "c": "associação entre vida ética, autoconhecimento e argumentação",
        "d": "debateu ideias inatas, dedução e limites dos sentidos",
        "e": "influenciou ciência experimental e debates sobre indução"
      },
      "resposta": "c",
      "explicacao": "Sócrates: associação entre vida ética, autoconhecimento e argumentação. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0009",
      "enunciado": "Qual definição corresponde corretamente a Sócrates?",
      "alternativas": {
        "a": "corrente que enfatiza razão e princípios como fontes centrais do conhecimento",
        "b": "filosofia que distingue aparência sensível e conhecimento inteligível",
        "c": "corrente que enfatiza experiência e percepção na formação do conhecimento",
        "d": "prática filosófica baseada em diálogo, exame de crenças e busca de definições",
        "e": "investigação sistemática de lógica, natureza, ética e política"
      },
      "resposta": "d",
      "explicacao": "Sócrates é prática filosófica baseada em diálogo, exame de crenças e busca de definições. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0010",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: filosofia que distingue aparência sensível e conhecimento inteligível?",
      "alternativas": {
        "a": "Kant e criticismo",
        "b": "Empirismo",
        "c": "Aristóteles",
        "d": "Racionalismo moderno",
        "e": "Platão"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Platão: filosofia que distingue aparência sensível e conhecimento inteligível. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0011",
      "enunciado": "Qual condição ajuda a caracterizar Platão?",
      "alternativas": {
        "a": "crítica à opinião e busca de fundamentos estáveis do saber",
        "b": "síntese crítica entre racionalismo e empirismo",
        "c": "análise de causas, formas de argumento e observação do mundo",
        "d": "crítica a ideias inatas e atenção à origem das ideias",
        "e": "busca de certeza inspirada pelo método matemático"
      },
      "resposta": "a",
      "explicacao": "Platão: crítica à opinião e busca de fundamentos estáveis do saber. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0012",
      "enunciado": "Qual consequência ou função se associa corretamente a Platão?",
      "alternativas": {
        "a": "formulou ética das virtudes e instrumentos lógicos duradouros",
        "b": "influenciou epistemologia, ética, política e metafísica",
        "c": "influenciou ciência experimental e debates sobre indução",
        "d": "distinguiu fenômeno e coisa em si e formulou ética da autonomia",
        "e": "debateu ideias inatas, dedução e limites dos sentidos"
      },
      "resposta": "b",
      "explicacao": "Platão: influenciou epistemologia, ética, política e metafísica. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0013",
      "enunciado": "Qual definição corresponde corretamente a Platão?",
      "alternativas": {
        "a": "corrente que enfatiza razão e princípios como fontes centrais do conhecimento",
        "b": "investigação sistemática de lógica, natureza, ética e política",
        "c": "filosofia que distingue aparência sensível e conhecimento inteligível",
        "d": "projeto de investigar condições e limites do conhecimento e da moral",
        "e": "corrente que enfatiza experiência e percepção na formação do conhecimento"
      },
      "resposta": "c",
      "explicacao": "Platão é filosofia que distingue aparência sensível e conhecimento inteligível. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0014",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: investigação sistemática de lógica, natureza, ética e política?",
      "alternativas": {
        "a": "Contratualismo",
        "b": "Empirismo",
        "c": "Racionalismo moderno",
        "d": "Aristóteles",
        "e": "Kant e criticismo"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Aristóteles: investigação sistemática de lógica, natureza, ética e política. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0015",
      "enunciado": "Em que contexto histórico deve ser situado o tema Aristóteles?",
      "alternativas": {
        "a": "Iluminismo alemão do século XVIII",
        "b": "filosofia política moderna",
        "c": "Europa dos séculos XVII e XVIII",
        "d": "filosofia britânica moderna",
        "e": "Grécia do século IV a.C"
      },
      "resposta": "e",
      "explicacao": "Aristóteles se situa em: Grécia do século IV a.C.. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0016",
      "enunciado": "Qual condição ajuda a caracterizar Aristóteles?",
      "alternativas": {
        "a": "análise de causas, formas de argumento e observação do mundo",
        "b": "crítica a ideias inatas e atenção à origem das ideias",
        "c": "busca de certeza inspirada pelo método matemático",
        "d": "problema de justificar autoridade e obrigação civil",
        "e": "síntese crítica entre racionalismo e empirismo"
      },
      "resposta": "a",
      "explicacao": "Aristóteles: análise de causas, formas de argumento e observação do mundo. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0017",
      "enunciado": "Qual consequência ou função se associa corretamente a Aristóteles?",
      "alternativas": {
        "a": "produziu modelos distintos em Hobbes, Locke e Rousseau",
        "b": "formulou ética das virtudes e instrumentos lógicos duradouros",
        "c": "debateu ideias inatas, dedução e limites dos sentidos",
        "d": "distinguiu fenômeno e coisa em si e formulou ética da autonomia",
        "e": "influenciou ciência experimental e debates sobre indução"
      },
      "resposta": "b",
      "explicacao": "Aristóteles: formulou ética das virtudes e instrumentos lógicos duradouros. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0018",
      "enunciado": "Qual definição corresponde corretamente a Aristóteles?",
      "alternativas": {
        "a": "teorias que explicam legitimidade política por um acordo real ou hipotético",
        "b": "corrente que enfatiza experiência e percepção na formação do conhecimento",
        "c": "investigação sistemática de lógica, natureza, ética e política",
        "d": "projeto de investigar condições e limites do conhecimento e da moral",
        "e": "corrente que enfatiza razão e princípios como fontes centrais do conhecimento"
      },
      "resposta": "c",
      "explicacao": "Aristóteles é investigação sistemática de lógica, natureza, ética e política. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0019",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: corrente que enfatiza razão e princípios como fontes centrais do conhecimento?",
      "alternativas": {
        "a": "Kant e criticismo",
        "b": "Contratualismo",
        "c": "Empirismo",
        "d": "Racionalismo moderno",
        "e": "Karl Marx"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Racionalismo moderno: corrente que enfatiza razão e princípios como fontes centrais do conhecimento. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0020",
      "enunciado": "Em que contexto histórico deve ser situado o tema Racionalismo moderno?",
      "alternativas": {
        "a": "filosofia britânica moderna",
        "b": "Iluminismo alemão do século XVIII",
        "c": "Europa industrial do século XIX",
        "d": "filosofia política moderna",
        "e": "Europa dos séculos XVII e XVIII"
      },
      "resposta": "e",
      "explicacao": "Racionalismo moderno se situa em: Europa dos séculos XVII e XVIII. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0021",
      "enunciado": "Qual condição ajuda a caracterizar Racionalismo moderno?",
      "alternativas": {
        "a": "busca de certeza inspirada pelo método matemático",
        "b": "relações de produção organizam interesses e desigualdades",
        "c": "problema de justificar autoridade e obrigação civil",
        "d": "síntese crítica entre racionalismo e empirismo",
        "e": "crítica a ideias inatas e atenção à origem das ideias"
      },
      "resposta": "a",
      "explicacao": "Racionalismo moderno: busca de certeza inspirada pelo método matemático. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0022",
      "enunciado": "Qual consequência ou função se associa corretamente a Racionalismo moderno?",
      "alternativas": {
        "a": "influenciou movimentos sociais e crítica da alienação e da propriedade",
        "b": "debateu ideias inatas, dedução e limites dos sentidos",
        "c": "produziu modelos distintos em Hobbes, Locke e Rousseau",
        "d": "influenciou ciência experimental e debates sobre indução",
        "e": "distinguiu fenômeno e coisa em si e formulou ética da autonomia"
      },
      "resposta": "b",
      "explicacao": "Racionalismo moderno: debateu ideias inatas, dedução e limites dos sentidos. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0023",
      "enunciado": "Qual definição corresponde corretamente a Racionalismo moderno?",
      "alternativas": {
        "a": "projeto de investigar condições e limites do conhecimento e da moral",
        "b": "corrente que enfatiza experiência e percepção na formação do conhecimento",
        "c": "corrente que enfatiza razão e princípios como fontes centrais do conhecimento",
        "d": "análise da sociedade capitalista a partir de trabalho, classes, exploração e conflito",
        "e": "teorias que explicam legitimidade política por um acordo real ou hipotético"
      },
      "resposta": "c",
      "explicacao": "Racionalismo moderno é corrente que enfatiza razão e princípios como fontes centrais do conhecimento. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0024",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: corrente que enfatiza experiência e percepção na formação do conhecimento?",
      "alternativas": {
        "a": "Karl Marx",
        "b": "Contratualismo",
        "c": "Émile Durkheim",
        "d": "Empirismo",
        "e": "Kant e criticismo"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Empirismo: corrente que enfatiza experiência e percepção na formação do conhecimento. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0025",
      "enunciado": "Em que contexto histórico deve ser situado o tema Empirismo?",
      "alternativas": {
        "a": "Europa industrial do século XIX",
        "b": "formação da sociologia acadêmica no século XIX",
        "c": "filosofia política moderna",
        "d": "Iluminismo alemão do século XVIII",
        "e": "filosofia britânica moderna"
      },
      "resposta": "e",
      "explicacao": "Empirismo se situa em: filosofia britânica moderna. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0026",
      "enunciado": "Qual condição ajuda a caracterizar Empirismo?",
      "alternativas": {
        "a": "crítica a ideias inatas e atenção à origem das ideias",
        "b": "normas e instituições exercem coerção e tornam a vida coletiva possível",
        "c": "síntese crítica entre racionalismo e empirismo",
        "d": "relações de produção organizam interesses e desigualdades",
        "e": "problema de justificar autoridade e obrigação civil"
      },
      "resposta": "a",
      "explicacao": "Empirismo: crítica a ideias inatas e atenção à origem das ideias. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0027",
      "enunciado": "Qual consequência ou função se associa corretamente a Empirismo?",
      "alternativas": {
        "a": "produziu modelos distintos em Hobbes, Locke e Rousseau",
        "b": "influenciou ciência experimental e debates sobre indução",
        "c": "distinguiu fenômeno e coisa em si e formulou ética da autonomia",
        "d": "influenciou movimentos sociais e crítica da alienação e da propriedade",
        "e": "estabeleceu método para estudar fenômenos sociais como realidades próprias"
      },
      "resposta": "b",
      "explicacao": "Empirismo: influenciou ciência experimental e debates sobre indução. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0028",
      "enunciado": "Qual definição corresponde corretamente a Empirismo?",
      "alternativas": {
        "a": "teorias que explicam legitimidade política por um acordo real ou hipotético",
        "b": "análise da sociedade capitalista a partir de trabalho, classes, exploração e conflito",
        "c": "corrente que enfatiza experiência e percepção na formação do conhecimento",
        "d": "sociologia dos fatos sociais, integração e formas de solidariedade",
        "e": "projeto de investigar condições e limites do conhecimento e da moral"
      },
      "resposta": "c",
      "explicacao": "Empirismo é corrente que enfatiza experiência e percepção na formação do conhecimento. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0029",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: projeto de investigar condições e limites do conhecimento e da moral?",
      "alternativas": {
        "a": "Contratualismo",
        "b": "Max Weber",
        "c": "Émile Durkheim",
        "d": "Kant e criticismo",
        "e": "Karl Marx"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Kant e criticismo: projeto de investigar condições e limites do conhecimento e da moral. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0030",
      "enunciado": "Em que contexto histórico deve ser situado o tema Kant e criticismo?",
      "alternativas": {
        "a": "formação da sociologia acadêmica no século XIX",
        "b": "Europa entre os séculos XIX e XX",
        "c": "filosofia política moderna",
        "d": "Europa industrial do século XIX",
        "e": "Iluminismo alemão do século XVIII"
      },
      "resposta": "e",
      "explicacao": "Kant e criticismo se situa em: Iluminismo alemão do século XVIII. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0031",
      "enunciado": "Qual condição ajuda a caracterizar Kant e criticismo?",
      "alternativas": {
        "a": "síntese crítica entre racionalismo e empirismo",
        "b": "normas e instituições exercem coerção e tornam a vida coletiva possível",
        "c": "problema de justificar autoridade e obrigação civil",
        "d": "relações de produção organizam interesses e desigualdades",
        "e": "indivíduos orientam condutas por valores, fins, afetos e tradições"
      },
      "resposta": "a",
      "explicacao": "Kant e criticismo: síntese crítica entre racionalismo e empirismo. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0032",
      "enunciado": "Qual consequência ou função se associa corretamente a Kant e criticismo?",
      "alternativas": {
        "a": "analisou racionalização, burocracia, dominação e ética econômica",
        "b": "distinguiu fenômeno e coisa em si e formulou ética da autonomia",
        "c": "produziu modelos distintos em Hobbes, Locke e Rousseau",
        "d": "influenciou movimentos sociais e crítica da alienação e da propriedade",
        "e": "estabeleceu método para estudar fenômenos sociais como realidades próprias"
      },
      "resposta": "b",
      "explicacao": "Kant e criticismo: distinguiu fenômeno e coisa em si e formulou ética da autonomia. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0033",
      "enunciado": "Qual definição corresponde corretamente a Kant e criticismo?",
      "alternativas": {
        "a": "sociologia compreensiva orientada pelo sentido da ação social",
        "b": "sociologia dos fatos sociais, integração e formas de solidariedade",
        "c": "projeto de investigar condições e limites do conhecimento e da moral",
        "d": "teorias que explicam legitimidade política por um acordo real ou hipotético",
        "e": "análise da sociedade capitalista a partir de trabalho, classes, exploração e conflito"
      },
      "resposta": "c",
      "explicacao": "Kant e criticismo é projeto de investigar condições e limites do conhecimento e da moral. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0034",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: teorias que explicam legitimidade política por um acordo real ou hipotético?",
      "alternativas": {
        "a": "Max Weber",
        "b": "Karl Marx",
        "c": "Émile Durkheim",
        "d": "Contratualismo",
        "e": "Cultura"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Contratualismo: teorias que explicam legitimidade política por um acordo real ou hipotético. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0035",
      "enunciado": "Em que contexto histórico deve ser situado o tema Contratualismo?",
      "alternativas": {
        "a": "Europa entre os séculos XIX e XX",
        "b": "todas as sociedades humanas",
        "c": "Europa industrial do século XIX",
        "d": "formação da sociologia acadêmica no século XIX",
        "e": "filosofia política moderna"
      },
      "resposta": "e",
      "explicacao": "Contratualismo se situa em: filosofia política moderna. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0036",
      "enunciado": "Qual condição ajuda a caracterizar Contratualismo?",
      "alternativas": {
        "a": "problema de justificar autoridade e obrigação civil",
        "b": "socialização e interação transmitem e transformam repertórios",
        "c": "relações de produção organizam interesses e desigualdades",
        "d": "indivíduos orientam condutas por valores, fins, afetos e tradições",
        "e": "normas e instituições exercem coerção e tornam a vida coletiva possível"
      },
      "resposta": "a",
      "explicacao": "Contratualismo: problema de justificar autoridade e obrigação civil. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0037",
      "enunciado": "Qual consequência ou função se associa corretamente a Contratualismo?",
      "alternativas": {
        "a": "analisou racionalização, burocracia, dominação e ética econômica",
        "b": "produziu modelos distintos em Hobbes, Locke e Rousseau",
        "c": "estabeleceu método para estudar fenômenos sociais como realidades próprias",
        "d": "permite compreender diversidade sem reduzir diferenças a biologia",
        "e": "influenciou movimentos sociais e crítica da alienação e da propriedade"
      },
      "resposta": "b",
      "explicacao": "Contratualismo: produziu modelos distintos em Hobbes, Locke e Rousseau. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0038",
      "enunciado": "Qual definição corresponde corretamente a Contratualismo?",
      "alternativas": {
        "a": "sociologia compreensiva orientada pelo sentido da ação social",
        "b": "sociologia dos fatos sociais, integração e formas de solidariedade",
        "c": "teorias que explicam legitimidade política por um acordo real ou hipotético",
        "d": "conjunto dinâmico de significados, práticas, valores e símbolos aprendidos socialmente",
        "e": "análise da sociedade capitalista a partir de trabalho, classes, exploração e conflito"
      },
      "resposta": "c",
      "explicacao": "Contratualismo é teorias que explicam legitimidade política por um acordo real ou hipotético. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0039",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: análise da sociedade capitalista a partir de trabalho, classes, exploração e conflito?",
      "alternativas": {
        "a": "Cultura",
        "b": "Max Weber",
        "c": "Etnocentrismo",
        "d": "Karl Marx",
        "e": "Émile Durkheim"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Karl Marx: análise da sociedade capitalista a partir de trabalho, classes, exploração e conflito. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0040",
      "enunciado": "Em que contexto histórico deve ser situado o tema Karl Marx?",
      "alternativas": {
        "a": "relações interculturais e colonialismo",
        "b": "formação da sociologia acadêmica no século XIX",
        "c": "Europa entre os séculos XIX e XX",
        "d": "todas as sociedades humanas",
        "e": "Europa industrial do século XIX"
      },
      "resposta": "e",
      "explicacao": "Karl Marx se situa em: Europa industrial do século XIX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0041",
      "enunciado": "Qual condição ajuda a caracterizar Karl Marx?",
      "alternativas": {
        "a": "relações de produção organizam interesses e desigualdades",
        "b": "normas e instituições exercem coerção e tornam a vida coletiva possível",
        "c": "socialização e interação transmitem e transformam repertórios",
        "d": "indivíduos orientam condutas por valores, fins, afetos e tradições",
        "e": "naturalização de valores particulares e assimetrias de poder"
      },
      "resposta": "a",
      "explicacao": "Karl Marx: relações de produção organizam interesses e desigualdades. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0042",
      "enunciado": "Qual consequência ou função se associa corretamente a Karl Marx?",
      "alternativas": {
        "a": "analisou racionalização, burocracia, dominação e ética econômica",
        "b": "influenciou movimentos sociais e crítica da alienação e da propriedade",
        "c": "estabeleceu método para estudar fenômenos sociais como realidades próprias",
        "d": "permite compreender diversidade sem reduzir diferenças a biologia",
        "e": "pode legitimar preconceito; seu questionamento favorece relativização crítica"
      },
      "resposta": "b",
      "explicacao": "Karl Marx: influenciou movimentos sociais e crítica da alienação e da propriedade. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0043",
      "enunciado": "Qual definição corresponde corretamente a Karl Marx?",
      "alternativas": {
        "a": "conjunto dinâmico de significados, práticas, valores e símbolos aprendidos socialmente",
        "b": "sociologia compreensiva orientada pelo sentido da ação social",
        "c": "análise da sociedade capitalista a partir de trabalho, classes, exploração e conflito",
        "d": "julgamento de outras culturas pelos padrões da própria, tomados como superiores",
        "e": "sociologia dos fatos sociais, integração e formas de solidariedade"
      },
      "resposta": "c",
      "explicacao": "Karl Marx é análise da sociedade capitalista a partir de trabalho, classes, exploração e conflito. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0044",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: sociologia dos fatos sociais, integração e formas de solidariedade?",
      "alternativas": {
        "a": "Cultura",
        "b": "Etnocentrismo",
        "c": "Socialização",
        "d": "Émile Durkheim",
        "e": "Max Weber"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Émile Durkheim: sociologia dos fatos sociais, integração e formas de solidariedade. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0045",
      "enunciado": "Em que contexto histórico deve ser situado o tema Émile Durkheim?",
      "alternativas": {
        "a": "todas as sociedades humanas",
        "b": "Europa entre os séculos XIX e XX",
        "c": "família, escola, trabalho, mídia e grupos diversos",
        "d": "relações interculturais e colonialismo",
        "e": "formação da sociologia acadêmica no século XIX"
      },
      "resposta": "e",
      "explicacao": "Émile Durkheim se situa em: formação da sociologia acadêmica no século XIX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0046",
      "enunciado": "Qual condição ajuda a caracterizar Émile Durkheim?",
      "alternativas": {
        "a": "normas e instituições exercem coerção e tornam a vida coletiva possível",
        "b": "indivíduos orientam condutas por valores, fins, afetos e tradições",
        "c": "interação com instituições e outros indivíduos",
        "d": "socialização e interação transmitem e transformam repertórios",
        "e": "naturalização de valores particulares e assimetrias de poder"
      },
      "resposta": "a",
      "explicacao": "Émile Durkheim: normas e instituições exercem coerção e tornam a vida coletiva possível. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0047",
      "enunciado": "Qual consequência ou função se associa corretamente a Émile Durkheim?",
      "alternativas": {
        "a": "permite compreender diversidade sem reduzir diferenças a biologia",
        "b": "estabeleceu método para estudar fenômenos sociais como realidades próprias",
        "c": "pode legitimar preconceito; seu questionamento favorece relativização crítica",
        "d": "analisou racionalização, burocracia, dominação e ética econômica",
        "e": "forma sujeitos sociais sem eliminar agência e transformação"
      },
      "resposta": "b",
      "explicacao": "Émile Durkheim: estabeleceu método para estudar fenômenos sociais como realidades próprias. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0048",
      "enunciado": "Qual definição corresponde corretamente a Émile Durkheim?",
      "alternativas": {
        "a": "processo pelo qual pessoas aprendem normas, identidades e competências sociais",
        "b": "julgamento de outras culturas pelos padrões da própria, tomados como superiores",
        "c": "sociologia dos fatos sociais, integração e formas de solidariedade",
        "d": "sociologia compreensiva orientada pelo sentido da ação social",
        "e": "conjunto dinâmico de significados, práticas, valores e símbolos aprendidos socialmente"
      },
      "resposta": "c",
      "explicacao": "Émile Durkheim é sociologia dos fatos sociais, integração e formas de solidariedade. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0049",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: sociologia compreensiva orientada pelo sentido da ação social?",
      "alternativas": {
        "a": "Etnocentrismo",
        "b": "Socialização",
        "c": "Movimentos sociais",
        "d": "Max Weber",
        "e": "Cultura"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Max Weber: sociologia compreensiva orientada pelo sentido da ação social. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0050",
      "enunciado": "Em que contexto histórico deve ser situado o tema Max Weber?",
      "alternativas": {
        "a": "família, escola, trabalho, mídia e grupos diversos",
        "b": "todas as sociedades humanas",
        "c": "relações interculturais e colonialismo",
        "d": "sociedades modernas e contemporâneas",
        "e": "Europa entre os séculos XIX e XX"
      },
      "resposta": "e",
      "explicacao": "Max Weber se situa em: Europa entre os séculos XIX e XX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0051",
      "enunciado": "Qual condição ajuda a caracterizar Max Weber?",
      "alternativas": {
        "a": "indivíduos orientam condutas por valores, fins, afetos e tradições",
        "b": "socialização e interação transmitem e transformam repertórios",
        "c": "interação com instituições e outros indivíduos",
        "d": "conflitos, exclusões e oportunidades políticas estimulam mobilização",
        "e": "naturalização de valores particulares e assimetrias de poder"
      },
      "resposta": "a",
      "explicacao": "Max Weber: indivíduos orientam condutas por valores, fins, afetos e tradições. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0052",
      "enunciado": "Qual consequência ou função se associa corretamente a Max Weber?",
      "alternativas": {
        "a": "forma sujeitos sociais sem eliminar agência e transformação",
        "b": "analisou racionalização, burocracia, dominação e ética econômica",
        "c": "permite compreender diversidade sem reduzir diferenças a biologia",
        "d": "alteram agendas públicas, instituições e formas de participação",
        "e": "pode legitimar preconceito; seu questionamento favorece relativização crítica"
      },
      "resposta": "b",
      "explicacao": "Max Weber: analisou racionalização, burocracia, dominação e ética econômica. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0053",
      "enunciado": "Qual definição corresponde corretamente a Max Weber?",
      "alternativas": {
        "a": "ações coletivas organizadas em torno de direitos, identidades ou mudanças",
        "b": "julgamento de outras culturas pelos padrões da própria, tomados como superiores",
        "c": "sociologia compreensiva orientada pelo sentido da ação social",
        "d": "processo pelo qual pessoas aprendem normas, identidades e competências sociais",
        "e": "conjunto dinâmico de significados, práticas, valores e símbolos aprendidos socialmente"
      },
      "resposta": "c",
      "explicacao": "Max Weber é sociologia compreensiva orientada pelo sentido da ação social. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0054",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: conjunto dinâmico de significados, práticas, valores e símbolos aprendidos socialmente?",
      "alternativas": {
        "a": "Desigualdades sociais",
        "b": "Socialização",
        "c": "Etnocentrismo",
        "d": "Cultura",
        "e": "Movimentos sociais"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Cultura: conjunto dinâmico de significados, práticas, valores e símbolos aprendidos socialmente. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0055",
      "enunciado": "Qual condição ajuda a caracterizar Cultura?",
      "alternativas": {
        "a": "interação com instituições e outros indivíduos",
        "b": "conflitos, exclusões e oportunidades políticas estimulam mobilização",
        "c": "naturalização de valores particulares e assimetrias de poder",
        "d": "processos históricos e instituições reproduzem vantagens e desvantagens",
        "e": "socialização e interação transmitem e transformam repertórios"
      },
      "resposta": "e",
      "explicacao": "Cultura: socialização e interação transmitem e transformam repertórios. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0056",
      "enunciado": "Qual consequência ou função se associa corretamente a Cultura?",
      "alternativas": {
        "a": "permite compreender diversidade sem reduzir diferenças a biologia",
        "b": "pode legitimar preconceito; seu questionamento favorece relativização crítica",
        "c": "alteram agendas públicas, instituições e formas de participação",
        "d": "afetam renda, educação, saúde, poder e experiência cotidiana",
        "e": "forma sujeitos sociais sem eliminar agência e transformação"
      },
      "resposta": "a",
      "explicacao": "Cultura: permite compreender diversidade sem reduzir diferenças a biologia. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0057",
      "enunciado": "Qual definição corresponde corretamente a Cultura?",
      "alternativas": {
        "a": "processo pelo qual pessoas aprendem normas, identidades e competências sociais",
        "b": "conjunto dinâmico de significados, práticas, valores e símbolos aprendidos socialmente",
        "c": "ações coletivas organizadas em torno de direitos, identidades ou mudanças",
        "d": "distribuição estruturada e assimétrica de recursos, oportunidades e reconhecimento",
        "e": "julgamento de outras culturas pelos padrões da própria, tomados como superiores"
      },
      "resposta": "b",
      "explicacao": "Cultura é conjunto dinâmico de significados, práticas, valores e símbolos aprendidos socialmente. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0058",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: julgamento de outras culturas pelos padrões da própria, tomados como superiores?",
      "alternativas": {
        "a": "Movimentos sociais",
        "b": "Filosofia pré-socrática",
        "c": "Etnocentrismo",
        "d": "Desigualdades sociais",
        "e": "Socialização"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Etnocentrismo: julgamento de outras culturas pelos padrões da própria, tomados como superiores. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0059",
      "enunciado": "Qual condição ajuda a caracterizar Etnocentrismo?",
      "alternativas": {
        "a": "substituição parcial de narrativas míticas por explicações argumentadas",
        "b": "conflitos, exclusões e oportunidades políticas estimulam mobilização",
        "c": "processos históricos e instituições reproduzem vantagens e desvantagens",
        "d": "naturalização de valores particulares e assimetrias de poder",
        "e": "interação com instituições e outros indivíduos"
      },
      "resposta": "d",
      "explicacao": "Etnocentrismo: naturalização de valores particulares e assimetrias de poder. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0060",
      "enunciado": "Qual consequência ou função se associa corretamente a Etnocentrismo?",
      "alternativas": {
        "a": "afetam renda, educação, saúde, poder e experiência cotidiana",
        "b": "forma sujeitos sociais sem eliminar agência e transformação",
        "c": "inaugurou problemas ontológicos e cosmológicos duradouros",
        "d": "alteram agendas públicas, instituições e formas de participação",
        "e": "pode legitimar preconceito; seu questionamento favorece relativização crítica"
      },
      "resposta": "e",
      "explicacao": "Etnocentrismo: pode legitimar preconceito; seu questionamento favorece relativização crítica. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0061",
      "enunciado": "Qual definição corresponde corretamente a Etnocentrismo?",
      "alternativas": {
        "a": "julgamento de outras culturas pelos padrões da própria, tomados como superiores",
        "b": "processo pelo qual pessoas aprendem normas, identidades e competências sociais",
        "c": "ações coletivas organizadas em torno de direitos, identidades ou mudanças",
        "d": "investigação racional sobre a natureza e o princípio das coisas",
        "e": "distribuição estruturada e assimétrica de recursos, oportunidades e reconhecimento"
      },
      "resposta": "a",
      "explicacao": "Etnocentrismo é julgamento de outras culturas pelos padrões da própria, tomados como superiores. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0062",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: processo pelo qual pessoas aprendem normas, identidades e competências sociais?",
      "alternativas": {
        "a": "Sócrates",
        "b": "Socialização",
        "c": "Desigualdades sociais",
        "d": "Filosofia pré-socrática",
        "e": "Movimentos sociais"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Socialização: processo pelo qual pessoas aprendem normas, identidades e competências sociais. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0063",
      "enunciado": "Qual condição ajuda a caracterizar Socialização?",
      "alternativas": {
        "a": "processos históricos e instituições reproduzem vantagens e desvantagens",
        "b": "uso de perguntas para revelar contradições e estimular reflexão",
        "c": "interação com instituições e outros indivíduos",
        "d": "substituição parcial de narrativas míticas por explicações argumentadas",
        "e": "conflitos, exclusões e oportunidades políticas estimulam mobilização"
      },
      "resposta": "c",
      "explicacao": "Socialização: interação com instituições e outros indivíduos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0064",
      "enunciado": "Qual consequência ou função se associa corretamente a Socialização?",
      "alternativas": {
        "a": "associação entre vida ética, autoconhecimento e argumentação",
        "b": "alteram agendas públicas, instituições e formas de participação",
        "c": "afetam renda, educação, saúde, poder e experiência cotidiana",
        "d": "forma sujeitos sociais sem eliminar agência e transformação",
        "e": "inaugurou problemas ontológicos e cosmológicos duradouros"
      },
      "resposta": "d",
      "explicacao": "Socialização: forma sujeitos sociais sem eliminar agência e transformação. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0065",
      "enunciado": "Qual definição corresponde corretamente a Socialização?",
      "alternativas": {
        "a": "distribuição estruturada e assimétrica de recursos, oportunidades e reconhecimento",
        "b": "ações coletivas organizadas em torno de direitos, identidades ou mudanças",
        "c": "investigação racional sobre a natureza e o princípio das coisas",
        "d": "prática filosófica baseada em diálogo, exame de crenças e busca de definições",
        "e": "processo pelo qual pessoas aprendem normas, identidades e competências sociais"
      },
      "resposta": "e",
      "explicacao": "Socialização é processo pelo qual pessoas aprendem normas, identidades e competências sociais. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0066",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: ações coletivas organizadas em torno de direitos, identidades ou mudanças?",
      "alternativas": {
        "a": "Movimentos sociais",
        "b": "Platão",
        "c": "Sócrates",
        "d": "Desigualdades sociais",
        "e": "Filosofia pré-socrática"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Movimentos sociais: ações coletivas organizadas em torno de direitos, identidades ou mudanças. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0067",
      "enunciado": "Em que contexto histórico deve ser situado o tema Movimentos sociais?",
      "alternativas": {
        "a": "Grécia clássica e Academia",
        "b": "sociedades modernas e contemporâneas",
        "c": "relações de classe, raça, gênero e território",
        "d": "Grécia antiga antes de Sócrates",
        "e": "Atenas do século V a.C"
      },
      "resposta": "b",
      "explicacao": "Movimentos sociais se situa em: sociedades modernas e contemporâneas. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0068",
      "enunciado": "Qual condição ajuda a caracterizar Movimentos sociais?",
      "alternativas": {
        "a": "crítica à opinião e busca de fundamentos estáveis do saber",
        "b": "processos históricos e instituições reproduzem vantagens e desvantagens",
        "c": "conflitos, exclusões e oportunidades políticas estimulam mobilização",
        "d": "uso de perguntas para revelar contradições e estimular reflexão",
        "e": "substituição parcial de narrativas míticas por explicações argumentadas"
      },
      "resposta": "c",
      "explicacao": "Movimentos sociais: conflitos, exclusões e oportunidades políticas estimulam mobilização. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0069",
      "enunciado": "Qual consequência ou função se associa corretamente a Movimentos sociais?",
      "alternativas": {
        "a": "inaugurou problemas ontológicos e cosmológicos duradouros",
        "b": "associação entre vida ética, autoconhecimento e argumentação",
        "c": "influenciou epistemologia, ética, política e metafísica",
        "d": "alteram agendas públicas, instituições e formas de participação",
        "e": "afetam renda, educação, saúde, poder e experiência cotidiana"
      },
      "resposta": "d",
      "explicacao": "Movimentos sociais: alteram agendas públicas, instituições e formas de participação. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0070",
      "enunciado": "Qual definição corresponde corretamente a Movimentos sociais?",
      "alternativas": {
        "a": "filosofia que distingue aparência sensível e conhecimento inteligível",
        "b": "prática filosófica baseada em diálogo, exame de crenças e busca de definições",
        "c": "investigação racional sobre a natureza e o princípio das coisas",
        "d": "distribuição estruturada e assimétrica de recursos, oportunidades e reconhecimento",
        "e": "ações coletivas organizadas em torno de direitos, identidades ou mudanças"
      },
      "resposta": "e",
      "explicacao": "Movimentos sociais é ações coletivas organizadas em torno de direitos, identidades ou mudanças. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0071",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: distribuição estruturada e assimétrica de recursos, oportunidades e reconhecimento?",
      "alternativas": {
        "a": "Desigualdades sociais",
        "b": "Sócrates",
        "c": "Platão",
        "d": "Aristóteles",
        "e": "Filosofia pré-socrática"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Desigualdades sociais: distribuição estruturada e assimétrica de recursos, oportunidades e reconhecimento. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-filo-0072",
      "enunciado": "Qual condição ajuda a caracterizar Desigualdades sociais?",
      "alternativas": {
        "a": "análise de causas, formas de argumento e observação do mundo",
        "b": "processos históricos e instituições reproduzem vantagens e desvantagens",
        "c": "uso de perguntas para revelar contradições e estimular reflexão",
        "d": "substituição parcial de narrativas míticas por explicações argumentadas",
        "e": "crítica à opinião e busca de fundamentos estáveis do saber"
      },
      "resposta": "b",
      "explicacao": "Desigualdades sociais: processos históricos e instituições reproduzem vantagens e desvantagens. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0073",
      "enunciado": "Qual consequência ou função se associa corretamente a Desigualdades sociais?",
      "alternativas": {
        "a": "inaugurou problemas ontológicos e cosmológicos duradouros",
        "b": "associação entre vida ética, autoconhecimento e argumentação",
        "c": "afetam renda, educação, saúde, poder e experiência cotidiana",
        "d": "formulou ética das virtudes e instrumentos lógicos duradouros",
        "e": "influenciou epistemologia, ética, política e metafísica"
      },
      "resposta": "c",
      "explicacao": "Desigualdades sociais: afetam renda, educação, saúde, poder e experiência cotidiana. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-filo-0074",
      "enunciado": "Qual definição corresponde corretamente a Desigualdades sociais?",
      "alternativas": {
        "a": "investigação sistemática de lógica, natureza, ética e política",
        "b": "prática filosófica baseada em diálogo, exame de crenças e busca de definições",
        "c": "filosofia que distingue aparência sensível e conhecimento inteligível",
        "d": "distribuição estruturada e assimétrica de recursos, oportunidades e reconhecimento",
        "e": "investigação racional sobre a natureza e o princípio das coisas"
      },
      "resposta": "d",
      "explicacao": "Desigualdades sociais é distribuição estruturada e assimétrica de recursos, oportunidades e reconhecimento. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0001",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: forma de dominação que busca controlar política, sociedade e esfera privada por ideologia e terror?",
      "alternativas": {
        "a": "Realismo e representação social",
        "b": "Racismo, sexismo e interseccionalidade",
        "c": "Artes visuais e contexto",
        "d": "Antropofagia modernista",
        "e": "Totalitarismo"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Totalitarismo: forma de dominação que busca controlar política, sociedade e esfera privada por ideologia e terror. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-art-0002",
      "enunciado": "Em que contexto histórico deve ser situado o tema Totalitarismo?",
      "alternativas": {
        "a": "debates do século XX associados a Hannah Arendt",
        "b": "literatura e artes dos séculos XIX a XXI",
        "c": "sociedade brasileira e pensamento social contemporâneo",
        "d": "Modernismo brasileiro e Manifesto Antropófago",
        "e": "história da arte nacional e internacional"
      },
      "resposta": "a",
      "explicacao": "Totalitarismo se situa em: debates do século XX associados a Hannah Arendt. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0003",
      "enunciado": "Qual condição ajuda a caracterizar Totalitarismo?",
      "alternativas": {
        "a": "tensão entre cosmopolitismo, colonialidade e busca de autonomia cultural",
        "b": "destruição do pluralismo, propaganda e organização burocrática da violência",
        "c": "atenção a relações sociais e crítica de idealizações",
        "d": "obras dialogam com convenções estéticas, instituições e conflitos sociais",
        "e": "hierarquias históricas de raça, gênero e classe atravessam instituições"
      },
      "resposta": "b",
      "explicacao": "Totalitarismo: destruição do pluralismo, propaganda e organização burocrática da violência. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0004",
      "enunciado": "Qual consequência ou função se associa corretamente a Totalitarismo?",
      "alternativas": {
        "a": "reformula identidade nacional sem defender simples isolamento",
        "b": "evita reduzir imagem a ilustração e amplia interpretação crítica",
        "c": "ajuda a analisar regimes que pretendem eliminar autonomia e oposição",
        "d": "permite examinar experiências específicas e políticas de igualdade",
        "e": "permite interpretar personagens e formas como construções históricas"
      },
      "resposta": "c",
      "explicacao": "Totalitarismo: ajuda a analisar regimes que pretendem eliminar autonomia e oposição. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0005",
      "enunciado": "Qual definição corresponde corretamente a Totalitarismo?",
      "alternativas": {
        "a": "análise de desigualdades que se combinam e não atuam de modo isolado",
        "b": "proposta de apropriar criticamente influências externas para criar expressão cultural própria",
        "c": "uso da narrativa e das artes para observar conflitos, instituições e desigualdades",
        "d": "forma de dominação que busca controlar política, sociedade e esfera privada por ideologia e terror",
        "e": "leitura de forma, composição, material e circulação em relação ao tempo histórico"
      },
      "resposta": "d",
      "explicacao": "Totalitarismo é forma de dominação que busca controlar política, sociedade e esfera privada por ideologia e terror. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0036",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: debate sobre razão, progresso, fragmentação, consumo e instabilidade das identidades?",
      "alternativas": {
        "a": "Totalitarismo",
        "b": "Antropofagia modernista",
        "c": "Globalização cultural",
        "d": "Racismo, sexismo e interseccionalidade",
        "e": "Modernidade e pós-modernidade"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Modernidade e pós-modernidade: debate sobre razão, progresso, fragmentação, consumo e instabilidade das identidades. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-art-0037",
      "enunciado": "Em que contexto histórico deve ser situado o tema Modernidade e pós-modernidade?",
      "alternativas": {
        "a": "pensamento social e cultural dos séculos XX e XXI",
        "b": "sociedade brasileira e pensamento social contemporâneo",
        "c": "Modernismo brasileiro e Manifesto Antropófago",
        "d": "redes midiáticas e mercados globais",
        "e": "debates do século XX associados a Hannah Arendt"
      },
      "resposta": "a",
      "explicacao": "Modernidade e pós-modernidade se situa em: pensamento social e cultural dos séculos XX e XXI. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0038",
      "enunciado": "Qual condição ajuda a caracterizar Modernidade e pós-modernidade?",
      "alternativas": {
        "a": "plataformas, migrações e indústrias culturais aceleram contatos",
        "b": "transformações tecnológicas, urbanas e econômicas questionam narrativas universais",
        "c": "hierarquias históricas de raça, gênero e classe atravessam instituições",
        "d": "tensão entre cosmopolitismo, colonialidade e busca de autonomia cultural",
        "e": "destruição do pluralismo, propaganda e organização burocrática da violência"
      },
      "resposta": "b",
      "explicacao": "Modernidade e pós-modernidade: transformações tecnológicas, urbanas e econômicas questionam narrativas universais. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0039",
      "enunciado": "Qual consequência ou função se associa corretamente a Modernidade e pós-modernidade?",
      "alternativas": {
        "a": "ajuda a analisar regimes que pretendem eliminar autonomia e oposição",
        "b": "reformula identidade nacional sem defender simples isolamento",
        "c": "orienta leitura de obras que misturam linguagens, citações e perspectivas",
        "d": "pode produzir homogeneização, hibridismo e resistência local",
        "e": "permite examinar experiências específicas e políticas de igualdade"
      },
      "resposta": "c",
      "explicacao": "Modernidade e pós-modernidade: orienta leitura de obras que misturam linguagens, citações e perspectivas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0040",
      "enunciado": "Qual definição corresponde corretamente a Modernidade e pós-modernidade?",
      "alternativas": {
        "a": "circulação transnacional de imagens, músicas, narrativas e estilos",
        "b": "proposta de apropriar criticamente influências externas para criar expressão cultural própria",
        "c": "forma de dominação que busca controlar política, sociedade e esfera privada por ideologia e terror",
        "d": "debate sobre razão, progresso, fragmentação, consumo e instabilidade das identidades",
        "e": "análise de desigualdades que se combinam e não atuam de modo isolado"
      },
      "resposta": "d",
      "explicacao": "Modernidade e pós-modernidade é debate sobre razão, progresso, fragmentação, consumo e instabilidade das identidades. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "artes-cultura": [
    {
      "id": "xtr-art-0010",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: proposta de apropriar criticamente influências externas para criar expressão cultural própria?",
      "alternativas": {
        "a": "Antropofagia modernista",
        "b": "Realismo e representação social",
        "c": "Artes visuais e contexto",
        "d": "Linguagem cinematográfica",
        "e": "Música popular e crítica social"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Antropofagia modernista: proposta de apropriar criticamente influências externas para criar expressão cultural própria. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-art-0011",
      "enunciado": "Qual condição ajuda a caracterizar Antropofagia modernista?",
      "alternativas": {
        "a": "contextos políticos e culturais influenciam produção e recepção",
        "b": "tensão entre cosmopolitismo, colonialidade e busca de autonomia cultural",
        "c": "decisões formais organizam tempo, espaço e ponto de vista",
        "d": "obras dialogam com convenções estéticas, instituições e conflitos sociais",
        "e": "atenção a relações sociais e crítica de idealizações"
      },
      "resposta": "b",
      "explicacao": "Antropofagia modernista: tensão entre cosmopolitismo, colonialidade e busca de autonomia cultural. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0012",
      "enunciado": "Qual consequência ou função se associa corretamente a Antropofagia modernista?",
      "alternativas": {
        "a": "evita reduzir imagem a ilustração e amplia interpretação crítica",
        "b": "permite analisar como filmes constroem realidade e emoção",
        "c": "reformula identidade nacional sem defender simples isolamento",
        "d": "permite interpretar personagens e formas como construções históricas",
        "e": "canções podem criar memória, identidade e contestação"
      },
      "resposta": "c",
      "explicacao": "Antropofagia modernista: reformula identidade nacional sem defender simples isolamento. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0013",
      "enunciado": "Qual definição corresponde corretamente a Antropofagia modernista?",
      "alternativas": {
        "a": "articulação de letra, ritmo, performance e circulação para expressar experiências coletivas",
        "b": "produção de sentido por enquadramento, montagem, som, atuação e narrativa",
        "c": "uso da narrativa e das artes para observar conflitos, instituições e desigualdades",
        "d": "proposta de apropriar criticamente influências externas para criar expressão cultural própria",
        "e": "leitura de forma, composição, material e circulação em relação ao tempo histórico"
      },
      "resposta": "d",
      "explicacao": "Antropofagia modernista é proposta de apropriar criticamente influências externas para criar expressão cultural própria. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0014",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: uso da narrativa e das artes para observar conflitos, instituições e desigualdades?",
      "alternativas": {
        "a": "Linguagem cinematográfica",
        "b": "Música popular e crítica social",
        "c": "Cultura de massa",
        "d": "Artes visuais e contexto",
        "e": "Realismo e representação social"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Realismo e representação social: uso da narrativa e das artes para observar conflitos, instituições e desigualdades. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-art-0015",
      "enunciado": "Em que contexto histórico deve ser situado o tema Realismo e representação social?",
      "alternativas": {
        "a": "literatura e artes dos séculos XIX a XXI",
        "b": "história da arte nacional e internacional",
        "c": "música brasileira e internacional moderna",
        "d": "sociedades urbanas e midiáticas",
        "e": "cinema como arte e meio de comunicação"
      },
      "resposta": "a",
      "explicacao": "Realismo e representação social se situa em: literatura e artes dos séculos XIX a XXI. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0016",
      "enunciado": "Qual condição ajuda a caracterizar Realismo e representação social?",
      "alternativas": {
        "a": "decisões formais organizam tempo, espaço e ponto de vista",
        "b": "atenção a relações sociais e crítica de idealizações",
        "c": "tecnologias de reprodução e mercados ampliam audiências",
        "d": "obras dialogam com convenções estéticas, instituições e conflitos sociais",
        "e": "contextos políticos e culturais influenciam produção e recepção"
      },
      "resposta": "b",
      "explicacao": "Realismo e representação social: atenção a relações sociais e crítica de idealizações. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0017",
      "enunciado": "Qual consequência ou função se associa corretamente a Realismo e representação social?",
      "alternativas": {
        "a": "gera padronização e consumo, mas também apropriações e disputas",
        "b": "evita reduzir imagem a ilustração e amplia interpretação crítica",
        "c": "permite interpretar personagens e formas como construções históricas",
        "d": "permite analisar como filmes constroem realidade e emoção",
        "e": "canções podem criar memória, identidade e contestação"
      },
      "resposta": "c",
      "explicacao": "Realismo e representação social: permite interpretar personagens e formas como construções históricas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0018",
      "enunciado": "Qual definição corresponde corretamente a Realismo e representação social?",
      "alternativas": {
        "a": "produção de sentido por enquadramento, montagem, som, atuação e narrativa",
        "b": "leitura de forma, composição, material e circulação em relação ao tempo histórico",
        "c": "articulação de letra, ritmo, performance e circulação para expressar experiências coletivas",
        "d": "uso da narrativa e das artes para observar conflitos, instituições e desigualdades",
        "e": "produção e circulação ampla de bens simbólicos por indústrias e meios de comunicação"
      },
      "resposta": "d",
      "explicacao": "Realismo e representação social é uso da narrativa e das artes para observar conflitos, instituições e desigualdades. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0019",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: leitura de forma, composição, material e circulação em relação ao tempo histórico?",
      "alternativas": {
        "a": "Cultura de massa",
        "b": "Linguagem cinematográfica",
        "c": "Modernidade e pós-modernidade",
        "d": "Música popular e crítica social",
        "e": "Artes visuais e contexto"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Artes visuais e contexto: leitura de forma, composição, material e circulação em relação ao tempo histórico. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-art-0020",
      "enunciado": "Qual condição ajuda a caracterizar Artes visuais e contexto?",
      "alternativas": {
        "a": "obras dialogam com convenções estéticas, instituições e conflitos sociais",
        "b": "tecnologias de reprodução e mercados ampliam audiências",
        "c": "contextos políticos e culturais influenciam produção e recepção",
        "d": "transformações tecnológicas, urbanas e econômicas questionam narrativas universais",
        "e": "decisões formais organizam tempo, espaço e ponto de vista"
      },
      "resposta": "a",
      "explicacao": "Artes visuais e contexto: obras dialogam com convenções estéticas, instituições e conflitos sociais. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0021",
      "enunciado": "Qual consequência ou função se associa corretamente a Artes visuais e contexto?",
      "alternativas": {
        "a": "canções podem criar memória, identidade e contestação",
        "b": "evita reduzir imagem a ilustração e amplia interpretação crítica",
        "c": "gera padronização e consumo, mas também apropriações e disputas",
        "d": "orienta leitura de obras que misturam linguagens, citações e perspectivas",
        "e": "permite analisar como filmes constroem realidade e emoção"
      },
      "resposta": "b",
      "explicacao": "Artes visuais e contexto: evita reduzir imagem a ilustração e amplia interpretação crítica. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0022",
      "enunciado": "Qual definição corresponde corretamente a Artes visuais e contexto?",
      "alternativas": {
        "a": "articulação de letra, ritmo, performance e circulação para expressar experiências coletivas",
        "b": "produção de sentido por enquadramento, montagem, som, atuação e narrativa",
        "c": "leitura de forma, composição, material e circulação em relação ao tempo histórico",
        "d": "debate sobre razão, progresso, fragmentação, consumo e instabilidade das identidades",
        "e": "produção e circulação ampla de bens simbólicos por indústrias e meios de comunicação"
      },
      "resposta": "c",
      "explicacao": "Artes visuais e contexto é leitura de forma, composição, material e circulação em relação ao tempo histórico. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0023",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: produção de sentido por enquadramento, montagem, som, atuação e narrativa?",
      "alternativas": {
        "a": "Modernidade e pós-modernidade",
        "b": "Música popular e crítica social",
        "c": "Globalização cultural",
        "d": "Linguagem cinematográfica",
        "e": "Cultura de massa"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Linguagem cinematográfica: produção de sentido por enquadramento, montagem, som, atuação e narrativa. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-art-0024",
      "enunciado": "Qual condição ajuda a caracterizar Linguagem cinematográfica?",
      "alternativas": {
        "a": "transformações tecnológicas, urbanas e econômicas questionam narrativas universais",
        "b": "contextos políticos e culturais influenciam produção e recepção",
        "c": "tecnologias de reprodução e mercados ampliam audiências",
        "d": "plataformas, migrações e indústrias culturais aceleram contatos",
        "e": "decisões formais organizam tempo, espaço e ponto de vista"
      },
      "resposta": "e",
      "explicacao": "Linguagem cinematográfica: decisões formais organizam tempo, espaço e ponto de vista. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0025",
      "enunciado": "Qual consequência ou função se associa corretamente a Linguagem cinematográfica?",
      "alternativas": {
        "a": "permite analisar como filmes constroem realidade e emoção",
        "b": "canções podem criar memória, identidade e contestação",
        "c": "gera padronização e consumo, mas também apropriações e disputas",
        "d": "pode produzir homogeneização, hibridismo e resistência local",
        "e": "orienta leitura de obras que misturam linguagens, citações e perspectivas"
      },
      "resposta": "a",
      "explicacao": "Linguagem cinematográfica: permite analisar como filmes constroem realidade e emoção. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0026",
      "enunciado": "Qual definição corresponde corretamente a Linguagem cinematográfica?",
      "alternativas": {
        "a": "articulação de letra, ritmo, performance e circulação para expressar experiências coletivas",
        "b": "produção de sentido por enquadramento, montagem, som, atuação e narrativa",
        "c": "produção e circulação ampla de bens simbólicos por indústrias e meios de comunicação",
        "d": "circulação transnacional de imagens, músicas, narrativas e estilos",
        "e": "debate sobre razão, progresso, fragmentação, consumo e instabilidade das identidades"
      },
      "resposta": "b",
      "explicacao": "Linguagem cinematográfica é produção de sentido por enquadramento, montagem, som, atuação e narrativa. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0027",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: articulação de letra, ritmo, performance e circulação para expressar experiências coletivas?",
      "alternativas": {
        "a": "Modernidade e pós-modernidade",
        "b": "Cultura de massa",
        "c": "Música popular e crítica social",
        "d": "Globalização cultural",
        "e": "Totalitarismo"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Música popular e crítica social: articulação de letra, ritmo, performance e circulação para expressar experiências coletivas. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-art-0028",
      "enunciado": "Em que contexto histórico deve ser situado o tema Música popular e crítica social?",
      "alternativas": {
        "a": "debates do século XX associados a Hannah Arendt",
        "b": "pensamento social e cultural dos séculos XX e XXI",
        "c": "sociedades urbanas e midiáticas",
        "d": "música brasileira e internacional moderna",
        "e": "redes midiáticas e mercados globais"
      },
      "resposta": "d",
      "explicacao": "Música popular e crítica social se situa em: música brasileira e internacional moderna. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0029",
      "enunciado": "Qual condição ajuda a caracterizar Música popular e crítica social?",
      "alternativas": {
        "a": "tecnologias de reprodução e mercados ampliam audiências",
        "b": "plataformas, migrações e indústrias culturais aceleram contatos",
        "c": "transformações tecnológicas, urbanas e econômicas questionam narrativas universais",
        "d": "destruição do pluralismo, propaganda e organização burocrática da violência",
        "e": "contextos políticos e culturais influenciam produção e recepção"
      },
      "resposta": "e",
      "explicacao": "Música popular e crítica social: contextos políticos e culturais influenciam produção e recepção. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0030",
      "enunciado": "Qual consequência ou função se associa corretamente a Música popular e crítica social?",
      "alternativas": {
        "a": "canções podem criar memória, identidade e contestação",
        "b": "orienta leitura de obras que misturam linguagens, citações e perspectivas",
        "c": "gera padronização e consumo, mas também apropriações e disputas",
        "d": "pode produzir homogeneização, hibridismo e resistência local",
        "e": "ajuda a analisar regimes que pretendem eliminar autonomia e oposição"
      },
      "resposta": "a",
      "explicacao": "Música popular e crítica social: canções podem criar memória, identidade e contestação. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0031",
      "enunciado": "Qual definição corresponde corretamente a Música popular e crítica social?",
      "alternativas": {
        "a": "forma de dominação que busca controlar política, sociedade e esfera privada por ideologia e terror",
        "b": "articulação de letra, ritmo, performance e circulação para expressar experiências coletivas",
        "c": "circulação transnacional de imagens, músicas, narrativas e estilos",
        "d": "produção e circulação ampla de bens simbólicos por indústrias e meios de comunicação",
        "e": "debate sobre razão, progresso, fragmentação, consumo e instabilidade das identidades"
      },
      "resposta": "b",
      "explicacao": "Música popular e crítica social é articulação de letra, ritmo, performance e circulação para expressar experiências coletivas. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0032",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: produção e circulação ampla de bens simbólicos por indústrias e meios de comunicação?",
      "alternativas": {
        "a": "Totalitarismo",
        "b": "Racismo, sexismo e interseccionalidade",
        "c": "Cultura de massa",
        "d": "Globalização cultural",
        "e": "Modernidade e pós-modernidade"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Cultura de massa: produção e circulação ampla de bens simbólicos por indústrias e meios de comunicação. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-art-0033",
      "enunciado": "Qual condição ajuda a caracterizar Cultura de massa?",
      "alternativas": {
        "a": "transformações tecnológicas, urbanas e econômicas questionam narrativas universais",
        "b": "plataformas, migrações e indústrias culturais aceleram contatos",
        "c": "hierarquias históricas de raça, gênero e classe atravessam instituições",
        "d": "tecnologias de reprodução e mercados ampliam audiências",
        "e": "destruição do pluralismo, propaganda e organização burocrática da violência"
      },
      "resposta": "d",
      "explicacao": "Cultura de massa: tecnologias de reprodução e mercados ampliam audiências. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0034",
      "enunciado": "Qual consequência ou função se associa corretamente a Cultura de massa?",
      "alternativas": {
        "a": "permite examinar experiências específicas e políticas de igualdade",
        "b": "orienta leitura de obras que misturam linguagens, citações e perspectivas",
        "c": "ajuda a analisar regimes que pretendem eliminar autonomia e oposição",
        "d": "pode produzir homogeneização, hibridismo e resistência local",
        "e": "gera padronização e consumo, mas também apropriações e disputas"
      },
      "resposta": "e",
      "explicacao": "Cultura de massa: gera padronização e consumo, mas também apropriações e disputas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0035",
      "enunciado": "Qual definição corresponde corretamente a Cultura de massa?",
      "alternativas": {
        "a": "produção e circulação ampla de bens simbólicos por indústrias e meios de comunicação",
        "b": "debate sobre razão, progresso, fragmentação, consumo e instabilidade das identidades",
        "c": "circulação transnacional de imagens, músicas, narrativas e estilos",
        "d": "forma de dominação que busca controlar política, sociedade e esfera privada por ideologia e terror",
        "e": "análise de desigualdades que se combinam e não atuam de modo isolado"
      },
      "resposta": "a",
      "explicacao": "Cultura de massa é produção e circulação ampla de bens simbólicos por indústrias e meios de comunicação. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0041",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: circulação transnacional de imagens, músicas, narrativas e estilos?",
      "alternativas": {
        "a": "Realismo e representação social",
        "b": "Globalização cultural",
        "c": "Antropofagia modernista",
        "d": "Racismo, sexismo e interseccionalidade",
        "e": "Totalitarismo"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Globalização cultural: circulação transnacional de imagens, músicas, narrativas e estilos. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-art-0042",
      "enunciado": "Qual condição ajuda a caracterizar Globalização cultural?",
      "alternativas": {
        "a": "tensão entre cosmopolitismo, colonialidade e busca de autonomia cultural",
        "b": "destruição do pluralismo, propaganda e organização burocrática da violência",
        "c": "plataformas, migrações e indústrias culturais aceleram contatos",
        "d": "atenção a relações sociais e crítica de idealizações",
        "e": "hierarquias históricas de raça, gênero e classe atravessam instituições"
      },
      "resposta": "c",
      "explicacao": "Globalização cultural: plataformas, migrações e indústrias culturais aceleram contatos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0043",
      "enunciado": "Qual consequência ou função se associa corretamente a Globalização cultural?",
      "alternativas": {
        "a": "ajuda a analisar regimes que pretendem eliminar autonomia e oposição",
        "b": "reformula identidade nacional sem defender simples isolamento",
        "c": "permite interpretar personagens e formas como construções históricas",
        "d": "pode produzir homogeneização, hibridismo e resistência local",
        "e": "permite examinar experiências específicas e políticas de igualdade"
      },
      "resposta": "d",
      "explicacao": "Globalização cultural: pode produzir homogeneização, hibridismo e resistência local. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0044",
      "enunciado": "Qual definição corresponde corretamente a Globalização cultural?",
      "alternativas": {
        "a": "forma de dominação que busca controlar política, sociedade e esfera privada por ideologia e terror",
        "b": "uso da narrativa e das artes para observar conflitos, instituições e desigualdades",
        "c": "análise de desigualdades que se combinam e não atuam de modo isolado",
        "d": "proposta de apropriar criticamente influências externas para criar expressão cultural própria",
        "e": "circulação transnacional de imagens, músicas, narrativas e estilos"
      },
      "resposta": "e",
      "explicacao": "Globalização cultural é circulação transnacional de imagens, músicas, narrativas e estilos. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "direitos-humanos": [
    {
      "id": "xtr-art-0006",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: análise de desigualdades que se combinam e não atuam de modo isolado?",
      "alternativas": {
        "a": "Racismo, sexismo e interseccionalidade",
        "b": "Artes visuais e contexto",
        "c": "Linguagem cinematográfica",
        "d": "Realismo e representação social",
        "e": "Antropofagia modernista"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Racismo, sexismo e interseccionalidade: análise de desigualdades que se combinam e não atuam de modo isolado. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-art-0007",
      "enunciado": "Qual condição ajuda a caracterizar Racismo, sexismo e interseccionalidade?",
      "alternativas": {
        "a": "decisões formais organizam tempo, espaço e ponto de vista",
        "b": "hierarquias históricas de raça, gênero e classe atravessam instituições",
        "c": "tensão entre cosmopolitismo, colonialidade e busca de autonomia cultural",
        "d": "atenção a relações sociais e crítica de idealizações",
        "e": "obras dialogam com convenções estéticas, instituições e conflitos sociais"
      },
      "resposta": "b",
      "explicacao": "Racismo, sexismo e interseccionalidade: hierarquias históricas de raça, gênero e classe atravessam instituições. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0008",
      "enunciado": "Qual consequência ou função se associa corretamente a Racismo, sexismo e interseccionalidade?",
      "alternativas": {
        "a": "reformula identidade nacional sem defender simples isolamento",
        "b": "permite analisar como filmes constroem realidade e emoção",
        "c": "permite examinar experiências específicas e políticas de igualdade",
        "d": "evita reduzir imagem a ilustração e amplia interpretação crítica",
        "e": "permite interpretar personagens e formas como construções históricas"
      },
      "resposta": "c",
      "explicacao": "Racismo, sexismo e interseccionalidade: permite examinar experiências específicas e políticas de igualdade. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-art-0009",
      "enunciado": "Qual definição corresponde corretamente a Racismo, sexismo e interseccionalidade?",
      "alternativas": {
        "a": "produção de sentido por enquadramento, montagem, som, atuação e narrativa",
        "b": "proposta de apropriar criticamente influências externas para criar expressão cultural própria",
        "c": "uso da narrativa e das artes para observar conflitos, instituições e desigualdades",
        "d": "análise de desigualdades que se combinam e não atuam de modo isolado",
        "e": "leitura de forma, composição, material e circulação em relação ao tempo histórico"
      },
      "resposta": "d",
      "explicacao": "Racismo, sexismo e interseccionalidade é análise de desigualdades que se combinam e não atuam de modo isolado. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "atualidades-geopolitica": [
    {
      "id": "xtr-geo-0001",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: intensificação de fluxos de capitais, mercadorias, informações e produção em escala mundial?",
      "alternativas": {
        "a": "Globalização econômica",
        "b": "Empresas transnacionais",
        "c": "Blocos econômicos",
        "d": "Divisão internacional do trabalho",
        "e": "Multipolaridade"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Globalização econômica: intensificação de fluxos de capitais, mercadorias, informações e produção em escala mundial. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0002",
      "enunciado": "Qual condição ajuda a caracterizar Globalização econômica?",
      "alternativas": {
        "a": "diferenças tecnológicas, salariais, políticas e históricas",
        "b": "avanços logísticos, telecomunicações e liberalização de mercados",
        "c": "busca de mercados, recursos, incentivos e redução de custos",
        "d": "interesse em ampliar mercados e capacidade de negociação",
        "e": "ascensão de novas potências e redução da centralidade de um único polo"
      },
      "resposta": "b",
      "explicacao": "Globalização econômica: avanços logísticos, telecomunicações e liberalização de mercados. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0003",
      "enunciado": "Qual consequência ou função se associa corretamente a Globalização econômica?",
      "alternativas": {
        "a": "especializações territoriais e dependências econômicas",
        "b": "negociações complexas, alianças variáveis e disputas por influência",
        "c": "formação de cadeias globais com integração seletiva dos territórios",
        "d": "crescimento do comércio intrabloco e diferentes níveis de integração",
        "e": "reorganização de redes produtivas e influência sobre decisões territoriais"
      },
      "resposta": "c",
      "explicacao": "Globalização econômica: formação de cadeias globais com integração seletiva dos territórios. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0004",
      "enunciado": "Qual definição corresponde corretamente a Globalização econômica?",
      "alternativas": {
        "a": "distribuição do poder mundial entre diversos polos econômicos e geopolíticos",
        "b": "acordos regionais que reduzem barreiras e coordenam políticas entre países",
        "c": "distribuição desigual de funções produtivas entre países e regiões",
        "d": "intensificação de fluxos de capitais, mercadorias, informações e produção em escala mundial",
        "e": "corporações que coordenam atividades produtivas e comerciais em diversos países"
      },
      "resposta": "d",
      "explicacao": "Globalização econômica é intensificação de fluxos de capitais, mercadorias, informações e produção em escala mundial. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0005",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: distribuição desigual de funções produtivas entre países e regiões?",
      "alternativas": {
        "a": "Empresas transnacionais",
        "b": "Blocos econômicos",
        "c": "Multipolaridade",
        "d": "BRICS",
        "e": "Divisão internacional do trabalho"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Divisão internacional do trabalho: distribuição desigual de funções produtivas entre países e regiões. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0006",
      "enunciado": "Qual condição ajuda a caracterizar Divisão internacional do trabalho?",
      "alternativas": {
        "a": "diferenças tecnológicas, salariais, políticas e históricas",
        "b": "ascensão de novas potências e redução da centralidade de um único polo",
        "c": "interesse em ampliar mercados e capacidade de negociação",
        "d": "busca de mercados, recursos, incentivos e redução de custos",
        "e": "interesse em ampliar coordenação e representação de países não centrais"
      },
      "resposta": "a",
      "explicacao": "Divisão internacional do trabalho: diferenças tecnológicas, salariais, políticas e históricas. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0007",
      "enunciado": "Qual consequência ou função se associa corretamente a Divisão internacional do trabalho?",
      "alternativas": {
        "a": "reorganização de redes produtivas e influência sobre decisões territoriais",
        "b": "especializações territoriais e dependências econômicas",
        "c": "criação de mecanismos de cooperação financeira e diplomática",
        "d": "negociações complexas, alianças variáveis e disputas por influência",
        "e": "crescimento do comércio intrabloco e diferentes níveis de integração"
      },
      "resposta": "b",
      "explicacao": "Divisão internacional do trabalho: especializações territoriais e dependências econômicas. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0008",
      "enunciado": "Qual definição corresponde corretamente a Divisão internacional do trabalho?",
      "alternativas": {
        "a": "acordos regionais que reduzem barreiras e coordenam políticas entre países",
        "b": "fórum de cooperação entre grandes economias emergentes",
        "c": "distribuição desigual de funções produtivas entre países e regiões",
        "d": "distribuição do poder mundial entre diversos polos econômicos e geopolíticos",
        "e": "corporações que coordenam atividades produtivas e comerciais em diversos países"
      },
      "resposta": "c",
      "explicacao": "Divisão internacional do trabalho é distribuição desigual de funções produtivas entre países e regiões. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0009",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: corporações que coordenam atividades produtivas e comerciais em diversos países?",
      "alternativas": {
        "a": "BRICS",
        "b": "Multipolaridade",
        "c": "Blocos econômicos",
        "d": "Empresas transnacionais",
        "e": "Urbanização"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Empresas transnacionais: corporações que coordenam atividades produtivas e comerciais em diversos países. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0010",
      "enunciado": "Qual condição ajuda a caracterizar Empresas transnacionais?",
      "alternativas": {
        "a": "ascensão de novas potências e redução da centralidade de um único polo",
        "b": "interesse em ampliar coordenação e representação de países não centrais",
        "c": "interesse em ampliar mercados e capacidade de negociação",
        "d": "migração, concentração de serviços e mudanças econômicas",
        "e": "busca de mercados, recursos, incentivos e redução de custos"
      },
      "resposta": "e",
      "explicacao": "Empresas transnacionais: busca de mercados, recursos, incentivos e redução de custos. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0011",
      "enunciado": "Qual consequência ou função se associa corretamente a Empresas transnacionais?",
      "alternativas": {
        "a": "reorganização de redes produtivas e influência sobre decisões territoriais",
        "b": "negociações complexas, alianças variáveis e disputas por influência",
        "c": "expansão de cidades, redes urbanas e demandas por infraestrutura",
        "d": "crescimento do comércio intrabloco e diferentes níveis de integração",
        "e": "criação de mecanismos de cooperação financeira e diplomática"
      },
      "resposta": "a",
      "explicacao": "Empresas transnacionais: reorganização de redes produtivas e influência sobre decisões territoriais. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0012",
      "enunciado": "Qual definição corresponde corretamente a Empresas transnacionais?",
      "alternativas": {
        "a": "distribuição do poder mundial entre diversos polos econômicos e geopolíticos",
        "b": "corporações que coordenam atividades produtivas e comerciais em diversos países",
        "c": "acordos regionais que reduzem barreiras e coordenam políticas entre países",
        "d": "fórum de cooperação entre grandes economias emergentes",
        "e": "aumento da população urbana e expansão das formas de vida e produção urbanas"
      },
      "resposta": "b",
      "explicacao": "Empresas transnacionais é corporações que coordenam atividades produtivas e comerciais em diversos países. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0013",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: acordos regionais que reduzem barreiras e coordenam políticas entre países?",
      "alternativas": {
        "a": "Multipolaridade",
        "b": "Metropolização",
        "c": "Blocos econômicos",
        "d": "BRICS",
        "e": "Urbanização"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Blocos econômicos: acordos regionais que reduzem barreiras e coordenam políticas entre países. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0014",
      "enunciado": "Qual condição ajuda a caracterizar Blocos econômicos?",
      "alternativas": {
        "a": "ascensão de novas potências e redução da centralidade de um único polo",
        "b": "centralização de serviços avançados e integração de municípios",
        "c": "interesse em ampliar coordenação e representação de países não centrais",
        "d": "interesse em ampliar mercados e capacidade de negociação",
        "e": "migração, concentração de serviços e mudanças econômicas"
      },
      "resposta": "d",
      "explicacao": "Blocos econômicos: interesse em ampliar mercados e capacidade de negociação. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0015",
      "enunciado": "Qual consequência ou função se associa corretamente a Blocos econômicos?",
      "alternativas": {
        "a": "expansão de cidades, redes urbanas e demandas por infraestrutura",
        "b": "negociações complexas, alianças variáveis e disputas por influência",
        "c": "deslocamentos pendulares, conurbação e gestão intermunicipal",
        "d": "criação de mecanismos de cooperação financeira e diplomática",
        "e": "crescimento do comércio intrabloco e diferentes níveis de integração"
      },
      "resposta": "e",
      "explicacao": "Blocos econômicos: crescimento do comércio intrabloco e diferentes níveis de integração. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0016",
      "enunciado": "Qual definição corresponde corretamente a Blocos econômicos?",
      "alternativas": {
        "a": "acordos regionais que reduzem barreiras e coordenam políticas entre países",
        "b": "fórum de cooperação entre grandes economias emergentes",
        "c": "aumento da população urbana e expansão das formas de vida e produção urbanas",
        "d": "distribuição do poder mundial entre diversos polos econômicos e geopolíticos",
        "e": "concentração populacional e funcional em grandes aglomerações articuladas"
      },
      "resposta": "a",
      "explicacao": "Blocos econômicos é acordos regionais que reduzem barreiras e coordenam políticas entre países. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0017",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: distribuição do poder mundial entre diversos polos econômicos e geopolíticos?",
      "alternativas": {
        "a": "BRICS",
        "b": "Multipolaridade",
        "c": "Metropolização",
        "d": "Urbanização",
        "e": "Segregação socioespacial"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Multipolaridade: distribuição do poder mundial entre diversos polos econômicos e geopolíticos. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0018",
      "enunciado": "Qual condição ajuda a caracterizar Multipolaridade?",
      "alternativas": {
        "a": "migração, concentração de serviços e mudanças econômicas",
        "b": "interesse em ampliar coordenação e representação de países não centrais",
        "c": "ascensão de novas potências e redução da centralidade de um único polo",
        "d": "mercado imobiliário, políticas públicas seletivas e desigualdade",
        "e": "centralização de serviços avançados e integração de municípios"
      },
      "resposta": "c",
      "explicacao": "Multipolaridade: ascensão de novas potências e redução da centralidade de um único polo. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0019",
      "enunciado": "Qual consequência ou função se associa corretamente a Multipolaridade?",
      "alternativas": {
        "a": "criação de mecanismos de cooperação financeira e diplomática",
        "b": "expansão de cidades, redes urbanas e demandas por infraestrutura",
        "c": "distâncias de oportunidades e distribuição desigual de equipamentos",
        "d": "negociações complexas, alianças variáveis e disputas por influência",
        "e": "deslocamentos pendulares, conurbação e gestão intermunicipal"
      },
      "resposta": "d",
      "explicacao": "Multipolaridade: negociações complexas, alianças variáveis e disputas por influência. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0020",
      "enunciado": "Qual definição corresponde corretamente a Multipolaridade?",
      "alternativas": {
        "a": "separação territorial de grupos sociais segundo renda, acesso e poder",
        "b": "concentração populacional e funcional em grandes aglomerações articuladas",
        "c": "aumento da população urbana e expansão das formas de vida e produção urbanas",
        "d": "fórum de cooperação entre grandes economias emergentes",
        "e": "distribuição do poder mundial entre diversos polos econômicos e geopolíticos"
      },
      "resposta": "e",
      "explicacao": "Multipolaridade é distribuição do poder mundial entre diversos polos econômicos e geopolíticos. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0021",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: fórum de cooperação entre grandes economias emergentes?",
      "alternativas": {
        "a": "BRICS",
        "b": "Metropolização",
        "c": "Mobilidade urbana",
        "d": "Urbanização",
        "e": "Segregação socioespacial"
      },
      "resposta": "a",
      "explicacao": "A definição descreve BRICS: fórum de cooperação entre grandes economias emergentes. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0022",
      "enunciado": "Em que contexto histórico deve ser situado o tema BRICS?",
      "alternativas": {
        "a": "industrialização e transformação territorial",
        "b": "geopolítica do século XXI",
        "c": "espaços urbanos desiguais",
        "d": "rede urbana contemporânea",
        "e": "planejamento e funcionamento urbano"
      },
      "resposta": "b",
      "explicacao": "BRICS se situa em: geopolítica do século XXI. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0023",
      "enunciado": "Qual condição ajuda a caracterizar BRICS?",
      "alternativas": {
        "a": "centralização de serviços avançados e integração de municípios",
        "b": "localização de moradia, trabalho e serviços",
        "c": "interesse em ampliar coordenação e representação de países não centrais",
        "d": "migração, concentração de serviços e mudanças econômicas",
        "e": "mercado imobiliário, políticas públicas seletivas e desigualdade"
      },
      "resposta": "c",
      "explicacao": "BRICS: interesse em ampliar coordenação e representação de países não centrais. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0024",
      "enunciado": "Qual consequência ou função se associa corretamente a BRICS?",
      "alternativas": {
        "a": "deslocamentos pendulares, conurbação e gestão intermunicipal",
        "b": "impactos sobre tempo, poluição, acesso e qualidade de vida",
        "c": "distâncias de oportunidades e distribuição desigual de equipamentos",
        "d": "criação de mecanismos de cooperação financeira e diplomática",
        "e": "expansão de cidades, redes urbanas e demandas por infraestrutura"
      },
      "resposta": "d",
      "explicacao": "BRICS: criação de mecanismos de cooperação financeira e diplomática. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0025",
      "enunciado": "Qual definição corresponde corretamente a BRICS?",
      "alternativas": {
        "a": "concentração populacional e funcional em grandes aglomerações articuladas",
        "b": "deslocamento cotidiano de pessoas e mercadorias dentro das cidades",
        "c": "separação territorial de grupos sociais segundo renda, acesso e poder",
        "d": "aumento da população urbana e expansão das formas de vida e produção urbanas",
        "e": "fórum de cooperação entre grandes economias emergentes"
      },
      "resposta": "e",
      "explicacao": "BRICS é fórum de cooperação entre grandes economias emergentes. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0042",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: deslocamentos populacionais entre países por razões econômicas, políticas ou ambientais?",
      "alternativas": {
        "a": "Migrações internacionais",
        "b": "Reforma agrária",
        "c": "Estrutura fundiária",
        "d": "Agronegócio",
        "e": "Transição demográfica"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Migrações internacionais: deslocamentos populacionais entre países por razões econômicas, políticas ou ambientais. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0043",
      "enunciado": "Qual condição ajuda a caracterizar Migrações internacionais?",
      "alternativas": {
        "a": "modernização técnica, crédito, demanda externa e infraestrutura",
        "b": "diferenças de oportunidades, conflitos, redes familiares e crises",
        "c": "processos históricos de ocupação, legislação e poder econômico",
        "d": "concentração fundiária e demandas de movimentos sociais",
        "e": "melhorias sanitárias seguidas de transformações familiares e urbanas"
      },
      "resposta": "b",
      "explicacao": "Migrações internacionais: diferenças de oportunidades, conflitos, redes familiares e crises. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0044",
      "enunciado": "Qual consequência ou função se associa corretamente a Migrações internacionais?",
      "alternativas": {
        "a": "alta produtividade combinada a concentração e impactos territoriais",
        "b": "concentração de terras, conflitos e diferentes formas de produção",
        "c": "remessas, diversidade cultural e desafios de integração",
        "d": "envelhecimento populacional e alteração da estrutura etária",
        "e": "assentamentos, conflitos políticos e mudanças no uso da terra"
      },
      "resposta": "c",
      "explicacao": "Migrações internacionais: remessas, diversidade cultural e desafios de integração. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0045",
      "enunciado": "Qual definição corresponde corretamente a Migrações internacionais?",
      "alternativas": {
        "a": "forma de distribuição e domínio da propriedade da terra",
        "b": "passagem de altas para baixas taxas de mortalidade e natalidade",
        "c": "política de redistribuição e regularização de terras para cumprir funções sociais",
        "d": "deslocamentos populacionais entre países por razões econômicas, políticas ou ambientais",
        "e": "cadeia integrada de insumos, produção agropecuária, processamento, logística e finanças"
      },
      "resposta": "d",
      "explicacao": "Migrações internacionais é deslocamentos populacionais entre países por razões econômicas, políticas ou ambientais. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "atualidades-meioambiente": [
    {
      "id": "xtr-geo-0075",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: alterações persistentes do clima intensificadas por emissões antrópicas de gases de efeito estufa?",
      "alternativas": {
        "a": "Mudanças climáticas",
        "b": "Bacias hidrográficas",
        "c": "Biomas brasileiros",
        "d": "Degradação dos solos",
        "e": "Desmatamento"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Mudanças climáticas: alterações persistentes do clima intensificadas por emissões antrópicas de gases de efeito estufa. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0076",
      "enunciado": "Qual condição ajuda a caracterizar Mudanças climáticas?",
      "alternativas": {
        "a": "erosão, desmatamento, manejo inadequado, salinização e contaminação",
        "b": "queima de combustíveis fósseis, desmatamento e padrões de consumo",
        "c": "variação climática, relevo, solos e história natural",
        "d": "expansão agropecuária, extração de madeira e ocupação irregular",
        "e": "relevo e divisores de água organizam o escoamento"
      },
      "resposta": "b",
      "explicacao": "Mudanças climáticas: queima de combustíveis fósseis, desmatamento e padrões de consumo. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0077",
      "enunciado": "Qual consequência ou função se associa corretamente a Mudanças climáticas?",
      "alternativas": {
        "a": "abastecimento, energia, transporte e necessidade de gestão integrada",
        "b": "biodiversidade, serviços ecossistêmicos e conflitos de conservação",
        "c": "eventos extremos, riscos sociais e necessidade de mitigação e adaptação",
        "d": "queda de produtividade, assoreamento e desertificação",
        "e": "perda de biodiversidade, emissões e alteração do ciclo da água"
      },
      "resposta": "c",
      "explicacao": "Mudanças climáticas: eventos extremos, riscos sociais e necessidade de mitigação e adaptação. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0078",
      "enunciado": "Qual definição corresponde corretamente a Mudanças climáticas?",
      "alternativas": {
        "a": "áreas drenadas por um rio principal e seus afluentes",
        "b": "remoção de cobertura vegetal nativa para outros usos do território",
        "c": "grandes conjuntos ecológicos definidos por clima, vegetação, fauna e dinâmica ambiental",
        "d": "alterações persistentes do clima intensificadas por emissões antrópicas de gases de efeito estufa",
        "e": "perda de fertilidade, estrutura ou cobertura do solo por processos naturais e humanos"
      },
      "resposta": "d",
      "explicacao": "Mudanças climáticas é alterações persistentes do clima intensificadas por emissões antrópicas de gases de efeito estufa. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0079",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: grandes conjuntos ecológicos definidos por clima, vegetação, fauna e dinâmica ambiental?",
      "alternativas": {
        "a": "Tectônica de placas",
        "b": "Bacias hidrográficas",
        "c": "Degradação dos solos",
        "d": "Desmatamento",
        "e": "Biomas brasileiros"
      },
      "resposta": "e",
      "explicacao": "A definição descreve Biomas brasileiros: grandes conjuntos ecológicos definidos por clima, vegetação, fauna e dinâmica ambiental. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0080",
      "enunciado": "Qual condição ajuda a caracterizar Biomas brasileiros?",
      "alternativas": {
        "a": "variação climática, relevo, solos e história natural",
        "b": "erosão, desmatamento, manejo inadequado, salinização e contaminação",
        "c": "correntes do manto e interação entre limites de placas",
        "d": "relevo e divisores de água organizam o escoamento",
        "e": "expansão agropecuária, extração de madeira e ocupação irregular"
      },
      "resposta": "a",
      "explicacao": "Biomas brasileiros: variação climática, relevo, solos e história natural. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0081",
      "enunciado": "Qual consequência ou função se associa corretamente a Biomas brasileiros?",
      "alternativas": {
        "a": "perda de biodiversidade, emissões e alteração do ciclo da água",
        "b": "biodiversidade, serviços ecossistêmicos e conflitos de conservação",
        "c": "terremotos, vulcanismo e formação de cadeias montanhosas",
        "d": "queda de produtividade, assoreamento e desertificação",
        "e": "abastecimento, energia, transporte e necessidade de gestão integrada"
      },
      "resposta": "b",
      "explicacao": "Biomas brasileiros: biodiversidade, serviços ecossistêmicos e conflitos de conservação. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0082",
      "enunciado": "Qual definição corresponde corretamente a Biomas brasileiros?",
      "alternativas": {
        "a": "remoção de cobertura vegetal nativa para outros usos do território",
        "b": "modelo que explica o movimento de grandes blocos da litosfera",
        "c": "grandes conjuntos ecológicos definidos por clima, vegetação, fauna e dinâmica ambiental",
        "d": "áreas drenadas por um rio principal e seus afluentes",
        "e": "perda de fertilidade, estrutura ou cobertura do solo por processos naturais e humanos"
      },
      "resposta": "c",
      "explicacao": "Biomas brasileiros é grandes conjuntos ecológicos definidos por clima, vegetação, fauna e dinâmica ambiental. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0083",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: áreas drenadas por um rio principal e seus afluentes?",
      "alternativas": {
        "a": "Desmatamento",
        "b": "Tectônica de placas",
        "c": "Geomorfologia",
        "d": "Bacias hidrográficas",
        "e": "Degradação dos solos"
      },
      "resposta": "d",
      "explicacao": "A definição descreve Bacias hidrográficas: áreas drenadas por um rio principal e seus afluentes. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0084",
      "enunciado": "Qual condição ajuda a caracterizar Bacias hidrográficas?",
      "alternativas": {
        "a": "expansão agropecuária, extração de madeira e ocupação irregular",
        "b": "erosão, desmatamento, manejo inadequado, salinização e contaminação",
        "c": "correntes do manto e interação entre limites de placas",
        "d": "tectonismo, intemperismo, erosão e sedimentação",
        "e": "relevo e divisores de água organizam o escoamento"
      },
      "resposta": "e",
      "explicacao": "Bacias hidrográficas: relevo e divisores de água organizam o escoamento. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0085",
      "enunciado": "Qual consequência ou função se associa corretamente a Bacias hidrográficas?",
      "alternativas": {
        "a": "abastecimento, energia, transporte e necessidade de gestão integrada",
        "b": "terremotos, vulcanismo e formação de cadeias montanhosas",
        "c": "perda de biodiversidade, emissões e alteração do ciclo da água",
        "d": "compreensão de riscos, paisagens e uso do território",
        "e": "queda de produtividade, assoreamento e desertificação"
      },
      "resposta": "a",
      "explicacao": "Bacias hidrográficas: abastecimento, energia, transporte e necessidade de gestão integrada. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0086",
      "enunciado": "Qual definição corresponde corretamente a Bacias hidrográficas?",
      "alternativas": {
        "a": "perda de fertilidade, estrutura ou cobertura do solo por processos naturais e humanos",
        "b": "áreas drenadas por um rio principal e seus afluentes",
        "c": "modelo que explica o movimento de grandes blocos da litosfera",
        "d": "remoção de cobertura vegetal nativa para outros usos do território",
        "e": "estudo das formas de relevo e dos processos que as produzem e transformam"
      },
      "resposta": "b",
      "explicacao": "Bacias hidrográficas é áreas drenadas por um rio principal e seus afluentes. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0087",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: perda de fertilidade, estrutura ou cobertura do solo por processos naturais e humanos?",
      "alternativas": {
        "a": "Tectônica de placas",
        "b": "Desmatamento",
        "c": "Degradação dos solos",
        "d": "Geomorfologia",
        "e": "Escala cartográfica"
      },
      "resposta": "c",
      "explicacao": "A definição descreve Degradação dos solos: perda de fertilidade, estrutura ou cobertura do solo por processos naturais e humanos. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0088",
      "enunciado": "Qual condição ajuda a caracterizar Degradação dos solos?",
      "alternativas": {
        "a": "correntes do manto e interação entre limites de placas",
        "b": "expansão agropecuária, extração de madeira e ocupação irregular",
        "c": "necessidade de reduzir a realidade mantendo proporções",
        "d": "erosão, desmatamento, manejo inadequado, salinização e contaminação",
        "e": "tectonismo, intemperismo, erosão e sedimentação"
      },
      "resposta": "d",
      "explicacao": "Degradação dos solos: erosão, desmatamento, manejo inadequado, salinização e contaminação. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0089",
      "enunciado": "Qual consequência ou função se associa corretamente a Degradação dos solos?",
      "alternativas": {
        "a": "perda de biodiversidade, emissões e alteração do ciclo da água",
        "b": "compreensão de riscos, paisagens e uso do território",
        "c": "terremotos, vulcanismo e formação de cadeias montanhosas",
        "d": "define o grau de detalhamento e permite calcular distâncias",
        "e": "queda de produtividade, assoreamento e desertificação"
      },
      "resposta": "e",
      "explicacao": "Degradação dos solos: queda de produtividade, assoreamento e desertificação. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0090",
      "enunciado": "Qual definição corresponde corretamente a Degradação dos solos?",
      "alternativas": {
        "a": "perda de fertilidade, estrutura ou cobertura do solo por processos naturais e humanos",
        "b": "relação matemática entre uma distância no mapa e a distância real",
        "c": "modelo que explica o movimento de grandes blocos da litosfera",
        "d": "estudo das formas de relevo e dos processos que as produzem e transformam",
        "e": "remoção de cobertura vegetal nativa para outros usos do território"
      },
      "resposta": "a",
      "explicacao": "Degradação dos solos é perda de fertilidade, estrutura ou cobertura do solo por processos naturais e humanos. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0091",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: remoção de cobertura vegetal nativa para outros usos do território?",
      "alternativas": {
        "a": "Escala cartográfica",
        "b": "Desmatamento",
        "c": "Tectônica de placas",
        "d": "Projeções cartográficas",
        "e": "Geomorfologia"
      },
      "resposta": "b",
      "explicacao": "A definição descreve Desmatamento: remoção de cobertura vegetal nativa para outros usos do território. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0092",
      "enunciado": "Qual condição ajuda a caracterizar Desmatamento?",
      "alternativas": {
        "a": "impossibilidade de preservar simultaneamente todas as propriedades geométricas",
        "b": "tectonismo, intemperismo, erosão e sedimentação",
        "c": "expansão agropecuária, extração de madeira e ocupação irregular",
        "d": "correntes do manto e interação entre limites de placas",
        "e": "necessidade de reduzir a realidade mantendo proporções"
      },
      "resposta": "c",
      "explicacao": "Desmatamento: expansão agropecuária, extração de madeira e ocupação irregular. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0093",
      "enunciado": "Qual consequência ou função se associa corretamente a Desmatamento?",
      "alternativas": {
        "a": "produção inevitável de distorções de área, forma, distância ou direção",
        "b": "compreensão de riscos, paisagens e uso do território",
        "c": "define o grau de detalhamento e permite calcular distâncias",
        "d": "perda de biodiversidade, emissões e alteração do ciclo da água",
        "e": "terremotos, vulcanismo e formação de cadeias montanhosas"
      },
      "resposta": "d",
      "explicacao": "Desmatamento: perda de biodiversidade, emissões e alteração do ciclo da água. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0094",
      "enunciado": "Qual definição corresponde corretamente a Desmatamento?",
      "alternativas": {
        "a": "modelo que explica o movimento de grandes blocos da litosfera",
        "b": "relação matemática entre uma distância no mapa e a distância real",
        "c": "estudo das formas de relevo e dos processos que as produzem e transformam",
        "d": "métodos de representar a superfície curva da Terra em um plano",
        "e": "remoção de cobertura vegetal nativa para outros usos do território"
      },
      "resposta": "e",
      "explicacao": "Desmatamento é remoção de cobertura vegetal nativa para outros usos do território. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0123",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: proposta de conciliar necessidades sociais, atividade econômica e limites ambientais?",
      "alternativas": {
        "a": "Desenvolvimento sustentável",
        "b": "Divisão internacional do trabalho",
        "c": "Empresas transnacionais",
        "d": "Globalização econômica",
        "e": "Acordos ambientais internacionais"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Desenvolvimento sustentável: proposta de conciliar necessidades sociais, atividade econômica e limites ambientais. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0124",
      "enunciado": "Em que contexto histórico deve ser situado o tema Desenvolvimento sustentável?",
      "alternativas": {
        "a": "governança ambiental global",
        "b": "debates globais desde o final do século XX",
        "c": "capitalismo globalizado",
        "d": "relações centro-periferia e cadeias globais",
        "e": "economia mundial contemporânea"
      },
      "resposta": "b",
      "explicacao": "Desenvolvimento sustentável se situa em: debates globais desde o final do século XX. Os distratores são recortes de tempo e espaço de temas vizinhos da mesma frente; a datação é o que separa um do outro.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0125",
      "enunciado": "Qual condição ajuda a caracterizar Desenvolvimento sustentável?",
      "alternativas": {
        "a": "problemas transfronteiriços exigem coordenação coletiva",
        "b": "diferenças tecnológicas, salariais, políticas e históricas",
        "c": "percepção de riscos ecológicos e desigualdades",
        "d": "busca de mercados, recursos, incentivos e redução de custos",
        "e": "avanços logísticos, telecomunicações e liberalização de mercados"
      },
      "resposta": "c",
      "explicacao": "Desenvolvimento sustentável: percepção de riscos ecológicos e desigualdades. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0126",
      "enunciado": "Qual consequência ou função se associa corretamente a Desenvolvimento sustentável?",
      "alternativas": {
        "a": "metas, financiamento, monitoramento e disputas sobre responsabilidades",
        "b": "formação de cadeias globais com integração seletiva dos territórios",
        "c": "reorganização de redes produtivas e influência sobre decisões territoriais",
        "d": "planejamento de longo prazo e responsabilidade entre gerações",
        "e": "especializações territoriais e dependências econômicas"
      },
      "resposta": "d",
      "explicacao": "Desenvolvimento sustentável: planejamento de longo prazo e responsabilidade entre gerações. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0127",
      "enunciado": "Qual definição corresponde corretamente a Desenvolvimento sustentável?",
      "alternativas": {
        "a": "intensificação de fluxos de capitais, mercadorias, informações e produção em escala mundial",
        "b": "compromissos negociados entre Estados para enfrentar problemas ambientais comuns",
        "c": "corporações que coordenam atividades produtivas e comerciais em diversos países",
        "d": "distribuição desigual de funções produtivas entre países e regiões",
        "e": "proposta de conciliar necessidades sociais, atividade econômica e limites ambientais"
      },
      "resposta": "e",
      "explicacao": "Desenvolvimento sustentável é proposta de conciliar necessidades sociais, atividade econômica e limites ambientais. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0128",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: compromissos negociados entre Estados para enfrentar problemas ambientais comuns?",
      "alternativas": {
        "a": "Acordos ambientais internacionais",
        "b": "Blocos econômicos",
        "c": "Divisão internacional do trabalho",
        "d": "Globalização econômica",
        "e": "Empresas transnacionais"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Acordos ambientais internacionais: compromissos negociados entre Estados para enfrentar problemas ambientais comuns. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0129",
      "enunciado": "Qual condição ajuda a caracterizar Acordos ambientais internacionais?",
      "alternativas": {
        "a": "busca de mercados, recursos, incentivos e redução de custos",
        "b": "problemas transfronteiriços exigem coordenação coletiva",
        "c": "avanços logísticos, telecomunicações e liberalização de mercados",
        "d": "diferenças tecnológicas, salariais, políticas e históricas",
        "e": "interesse em ampliar mercados e capacidade de negociação"
      },
      "resposta": "b",
      "explicacao": "Acordos ambientais internacionais: problemas transfronteiriços exigem coordenação coletiva. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0130",
      "enunciado": "Qual consequência ou função se associa corretamente a Acordos ambientais internacionais?",
      "alternativas": {
        "a": "reorganização de redes produtivas e influência sobre decisões territoriais",
        "b": "crescimento do comércio intrabloco e diferentes níveis de integração",
        "c": "metas, financiamento, monitoramento e disputas sobre responsabilidades",
        "d": "formação de cadeias globais com integração seletiva dos territórios",
        "e": "especializações territoriais e dependências econômicas"
      },
      "resposta": "c",
      "explicacao": "Acordos ambientais internacionais: metas, financiamento, monitoramento e disputas sobre responsabilidades. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0131",
      "enunciado": "Qual definição corresponde corretamente a Acordos ambientais internacionais?",
      "alternativas": {
        "a": "corporações que coordenam atividades produtivas e comerciais em diversos países",
        "b": "intensificação de fluxos de capitais, mercadorias, informações e produção em escala mundial",
        "c": "distribuição desigual de funções produtivas entre países e regiões",
        "d": "compromissos negociados entre Estados para enfrentar problemas ambientais comuns",
        "e": "acordos regionais que reduzem barreiras e coordenam políticas entre países"
      },
      "resposta": "d",
      "explicacao": "Acordos ambientais internacionais é compromissos negociados entre Estados para enfrentar problemas ambientais comuns. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ],
  "atualidades-politica": [
    {
      "id": "xtr-geo-0119",
      "enunciado": "Qual conceito ou processo corresponde a esta definição: medidas sintéticas ou específicas usadas para avaliar condições de vida?",
      "alternativas": {
        "a": "Indicadores sociais",
        "b": "Desenvolvimento sustentável",
        "c": "Acordos ambientais internacionais",
        "d": "Globalização econômica",
        "e": "Divisão internacional do trabalho"
      },
      "resposta": "a",
      "explicacao": "A definição descreve Indicadores sociais: medidas sintéticas ou específicas usadas para avaliar condições de vida. As demais alternativas nomeiam conceitos vizinhos da mesma frente, com definição distinta.",
      "formato": "direta",
      "origem": "banco-extra"
    },
    {
      "id": "xtr-geo-0120",
      "enunciado": "Qual condição ajuda a caracterizar Indicadores sociais?",
      "alternativas": {
        "a": "diferenças tecnológicas, salariais, políticas e históricas",
        "b": "coleta de dados sobre renda, educação, saúde e outros fatores",
        "c": "avanços logísticos, telecomunicações e liberalização de mercados",
        "d": "problemas transfronteiriços exigem coordenação coletiva",
        "e": "percepção de riscos ecológicos e desigualdades"
      },
      "resposta": "b",
      "explicacao": "Indicadores sociais: coleta de dados sobre renda, educação, saúde e outros fatores. As outras alternativas descrevem condições de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0121",
      "enunciado": "Qual consequência ou função se associa corretamente a Indicadores sociais?",
      "alternativas": {
        "a": "formação de cadeias globais com integração seletiva dos territórios",
        "b": "planejamento de longo prazo e responsabilidade entre gerações",
        "c": "comparação de desigualdades e acompanhamento de resultados",
        "d": "especializações territoriais e dependências econômicas",
        "e": "metas, financiamento, monitoramento e disputas sobre responsabilidades"
      },
      "resposta": "c",
      "explicacao": "Indicadores sociais: comparação de desigualdades e acompanhamento de resultados. As outras alternativas descrevem funções e consequências de conceitos vizinhos da mesma frente.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    },
    {
      "id": "xtr-geo-0122",
      "enunciado": "Qual definição corresponde corretamente a Indicadores sociais?",
      "alternativas": {
        "a": "intensificação de fluxos de capitais, mercadorias, informações e produção em escala mundial",
        "b": "proposta de conciliar necessidades sociais, atividade econômica e limites ambientais",
        "c": "distribuição desigual de funções produtivas entre países e regiões",
        "d": "medidas sintéticas ou específicas usadas para avaliar condições de vida",
        "e": "compromissos negociados entre Estados para enfrentar problemas ambientais comuns"
      },
      "resposta": "d",
      "explicacao": "Indicadores sociais é medidas sintéticas ou específicas usadas para avaliar condições de vida. Os distratores são as definições de conceitos vizinhos da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.",
      "formato": "direta",
      "origem": "banco-extra",
      "dificuldade": "media"
    }
  ]
};
