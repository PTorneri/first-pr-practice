// A rubrica de redação: bandas, descritores, travas, descontos e a conta.
//
// A CHAVE DESTE ARQUIVO, EM UMA LINHA: banda é julgamento, nota é conta.
//
// O modelo escolhe a banda de cada eixo e cita o trecho que a sustenta. Ele
// nunca emite um número. A tabela banda->ponto, as travas de dependência e os
// descontos vivem aqui, em JavaScript puro, porque escala de seis bandas em
// modelo de linguagem oscila entre execuções — e nota que oscila ensina o aluno
// a pedir correção de novo até gostar do número. Aí a ferramenta virou
// caça-níquel, não corretor.
//
// Sem import, sem DOM, sem localStorage: é o que permite `verificar-rubrica.js`
// carregar este arquivo num contexto `vm` e conferir a aritmética inteira sem
// abrir navegador nem gastar token.
//
// Script CLÁSSICO, e não módulo, porque app.js é carregado como script comum e
// não pode importar. ia.js, que é módulo, lê o mesmo global — e monta os enums
// do schema a partir dele, de modo que a lista de bandas não pode divergir
// entre a conta e o prompt.
//
// A rubrica é adaptada de uma grade de redação escolar. Duas caixas do papel
// ficaram de fora de propósito: "plágio" (não verificável sem corpus) e "uso de
// inteligência artificial" (detector de IA é chute, e um falso positivo zeraria
// a redação de quem escreveu de verdade).
(function () {
  "use strict";

  function m(chave, texto) {
    return { chave: chave, texto: texto };
  }

  var EIXOS = [
    {
      chave: "adequacao",
      rotulo: "Adequação à proposta",
      maximo: 1,
      bandas: [
        {
          chave: "anulado",
          rotulo: "Anulado",
          pontos: 0,
          descritor:
            "o texto não é uma tentativa honesta de responder à proposta: foi montado " +
            "com modelo pronto de internet, ou trata a atividade com displicência deliberada. " +
            "Escolher esta banda ZERA a redação inteira, então ela exige evidência forte.",
          marcadores: [
            m("modelo_pronto", "texto montado com modelo pronto de internet"),
            m("displicencia_deliberada", "displicência deliberada em relação à proposta"),
          ],
        },
        {
          chave: "inadequado",
          rotulo: "Inadequado",
          pontos: 0,
          descritor:
            "fuga total ao tema, ou fuga ao tipo de texto dissertativo-argumentativo.",
          marcadores: [
            m("fuga_ao_tema", "fuga total ao tema"),
            m("fuga_ao_tipo_textual", "fuga ao tipo dissertativo-argumentativo"),
          ],
        },
        {
          chave: "parcial",
          rotulo: "Parcialmente adequado",
          pontos: 0.5,
          descritor:
            "o texto é do tipo pedido e fala do tema, mas a abordagem é restrita ou " +
            "abrangente demais, ou um comando específico da proposta ficou sem cumprir.",
          marcadores: [
            m("abordagem_restrita", "abordagem muito restrita do tema"),
            m("abordagem_abrangente", "abordagem muito abrangente do tema"),
            m("comando_nao_cumprido", "descumpriu um comando específico da proposta"),
          ],
        },
        {
          chave: "adequado",
          rotulo: "Adequado",
          pontos: 1,
          descritor:
            "cumpre os comandos específicos e consiste numa dissertação argumentativa em " +
            "que se apresenta posicionamento sobre o tema, defendido por meio de argumentos.",
          marcadores: [],
        },
      ],
    },
    {
      chave: "argumentacao",
      rotulo: "Argumentação",
      maximo: 4,
      bandas: [
        {
          chave: "insatisfatorio",
          rotulo: "Insatisfatório",
          pontos: 1,
          descritor:
            "informação que nunca virou argumento, incoerência que compromete o texto " +
            "inteiro, ou argumentos completamente impertinentes ao tema.",
          marcadores: [
            m("informacao_nao_virou_argumento", "informação que não foi transformada em argumento"),
            m("incoerencia_global", "incoerência que compromete o texto inteiro"),
            m("argumentos_impertinentes", "argumentos completamente impertinentes ao tema"),
          ],
        },
        {
          chave: "fragil",
          rotulo: "Frágil",
          pontos: 1.5,
          descritor:
            "argumentos pouco claros ou pouco pertinentes, argumentação limitada a copiar " +
            "ou parafrasear a coletânea, incoerência que compromete uma parte do texto, " +
            "argumentos soltos em relação à tese, ou texto majoritariamente informativo.",
          marcadores: [
            m("argumentos_pouco_claros", "argumentos pouco claros ou pouco pertinentes"),
            m("parafrase_da_coletanea", "argumentação limitada à cópia ou paráfrase da coletânea"),
            m("incoerencia_parcial", "incoerência que compromete uma parte do texto"),
            m("argumentos_desconectados_da_tese", "argumentos pouco relacionados entre si e à tese"),
            m("texto_informativo", "texto majoritariamente informativo"),
          ],
        },
        {
          chave: "pouco_convincente",
          rotulo: "Pouco convincente",
          pontos: 2,
          descritor:
            "existe projeto de texto, mas os argumentos são rasos, imprecisos, " +
            "generalizantes, presos ao senso comum, ou desenvolvidos de forma pouco " +
            "produtiva à tese defendida.",
          marcadores: [
            m("pouco_aprofundado", "argumentos pertinentes, mas pouco aprofundados"),
            m("incoerencia_pontual", "incoerência pontual"),
            m("argumentos_generalizantes", "argumentos imprecisos ou generalizantes"),
            m("senso_comum", "argumentos embasados apenas em senso comum"),
            m("argumento_improdutivo", "argumento desenvolvido de forma pouco produtiva à tese"),
          ],
        },
        {
          chave: "bem_encaminhado",
          rotulo: "Bem encaminhado",
          pontos: 2.5,
          descritor:
            "a dissertação se sustenta e há ao menos um argumento bem desenvolvido, mas " +
            "a coletânea rende pouco ou o repertório não está articulado ao argumento.",
          marcadores: [
            m("selecao_pouco_pertinente", "seleção pouco pertinente de argumento"),
            m("uso_pouco_proveitoso_da_coletanea", "uso pouco proveitoso da coletânea"),
            m("repertorio_nao_articulado", "repertório não articulado ao argumento"),
          ],
        },
        {
          chave: "consistente",
          rotulo: "Consistente",
          pontos: 3,
          descritor:
            "argumentação consistente, com projeto de texto e uso proveitoso da coletânea; " +
            "o que falta é profundidade em algum ponto ou mais criticidade na análise.",
          marcadores: [
            m("lacuna_na_analise", "lacuna na análise de pelo menos um argumento"),
            m("repertorio_subaproveitado", "repertório pertinente, mas pouco aproveitado"),
            m("pouca_criticidade", "pouca criticidade nas análises"),
          ],
        },
        {
          chave: "excelente",
          rotulo: "Excelente",
          pontos: 4,
          descritor:
            "projeto de texto estratégico, análise profunda, crítica e reflexiva, com uso " +
            "proveitoso tanto da coletânea quanto do repertório do próprio candidato.",
          marcadores: [],
        },
      ],
    },
    {
      chave: "estrutura",
      rotulo: "Estrutura e coesão",
      maximo: 2.5,
      bandas: [
        {
          chave: "inadequada",
          rotulo: "Inadequada",
          pontos: 0.5,
          descritor:
            "ausência constante de coesão, recursos coesivos constantemente mal empregados, " +
            "ideias desorganizadas a ponto de comprometer o sentido, ou falta de uma parte " +
            "constitutiva do texto.",
          marcadores: [
            m("ausencia_constante_de_coesao", "ausência constante de coesão entre períodos e parágrafos"),
            m("recursos_coesivos_inadequados", "emprego constantemente inadequado de recursos coesivos"),
            m("ideias_desorganizadas", "ideias mal organizadas, comprometendo o sentido"),
            m("falta_parte_constitutiva", "falta uma parte constitutiva do texto (a conclusão, por exemplo)"),
          ],
        },
        {
          chave: "fragil",
          rotulo: "Frágil",
          pontos: 1,
          descritor:
            "falhas graves de coesão entre as partes, ideias mal organizadas em parte do " +
            "texto, paragrafação com quebras indevidas, ou argumento apresentado onde não " +
            "deveria (introdução, conclusão).",
          marcadores: [
            m("falhas_graves_de_coesao", "falhas graves de coesão entre as partes do texto"),
            m("ideias_mal_organizadas", "ideias mal organizadas em parte do texto"),
            m("quebras_indevidas_de_paragrafo", "quebras indevidas de parágrafo"),
            m("argumento_na_introducao_ou_conclusao", "argumento apresentado na introdução ou na conclusão"),
            m("excesso_de_repeticoes", "excesso de repetições desnecessárias"),
          ],
        },
        {
          chave: "em_desenvolvimento",
          rotulo: "Em desenvolvimento",
          pontos: 1.5,
          descritor:
            "as partes estão organizadas, mas o uso de alguns recursos coesivos compromete " +
            "o sentido de pontos específicos, há ausência frequente de coesão entre períodos, " +
            "ou parágrafo sem unidade interna.",
          marcadores: [
            m("coesivo_compromete_sentido_pontual", "recurso coesivo que compromete o sentido de um ponto específico"),
            m("ausencia_frequente_entre_periodos", "ausência frequente de coesão entre períodos"),
            m("ausencia_entre_paragrafos", "alguma ausência de coesão entre parágrafos"),
            m("paragrafo_sem_unidade_interna", "parágrafo sem unidade interna"),
            m("repeticoes_constantes", "repetições desnecessárias constantes"),
          ],
        },
        {
          chave: "bem_encaminhada",
          rotulo: "Bem encaminhada",
          pontos: 2,
          descritor:
            "estrutura organizada e articulada; o que resta são falhas que não comprometem " +
            "o sentido — coesivo repetitivo ou impreciso, repetição pontual, alguma quebra " +
            "de unidade por planejamento.",
          marcadores: [
            m("ausencia_eventual_entre_periodos", "ausência eventual de coesão entre períodos"),
            m("coesivos_repetitivos", "uso repetitivo de recursos coesivos"),
            m("coesivos_imprecisos", "uso impreciso de recursos coesivos"),
            m("repeticoes_pontuais", "repetições pontuais desnecessárias"),
            m("falha_de_unidade_por_planejamento", "falha de unidade interna, por planejamento"),
          ],
        },
        {
          chave: "excelente",
          rotulo: "Excelente",
          pontos: 2.5,
          descritor:
            "partes bem organizadas e articuladas, progressão textual produtiva e unidade " +
            "clara — resultado de planejamento prévio.",
          marcadores: [],
        },
      ],
    },
    {
      chave: "linguagem",
      rotulo: "Linguagem",
      maximo: 2.5,
      bandas: [
        {
          chave: "inadequada",
          rotulo: "Inadequada",
          pontos: 0.5,
          descritor:
            "desvios sintáticos graves e constantes, períodos muito longos ou mal divididos, " +
            "termos constantemente inadequados, 1ª pessoa do singular ou referência direta ao " +
            "leitor, ou cópia constante da coletânea sem técnica de citação.",
          marcadores: [
            m("desvios_sintaticos_graves", "desvios graves e constantes na construção sintática"),
            m("periodos_muito_longos", "períodos muito longos ou mal divididos"),
            m("termos_inadequados_constantes", "emprego constante de termos inadequados, imprecisos ou coloquiais"),
            m("primeira_pessoa_singular_ou_leitor", "1ª pessoa do singular ou referência direta ao leitor"),
            m("copia_da_coletanea_sem_citacao", "cópia constante da coletânea, sem técnica de citação"),
          ],
        },
        {
          chave: "fragil",
          rotulo: "Frágil",
          pontos: 1,
          descritor:
            "desvios sintáticos frequentes, quebras inadequadas de período, termos " +
            "inadequados com frequência, ou alguma cópia da coletânea sem citação.",
          marcadores: [
            m("desvios_sintaticos_frequentes", "desvios frequentes na construção sintática"),
            m("quebras_de_periodo_inadequadas", "quebras inadequadas de período"),
            m("periodos_longos", "períodos longos com frequência"),
            m("termos_inadequados_frequentes", "termos inadequados, imprecisos ou coloquiais com frequência"),
            m("alguma_copia_sem_citacao", "alguma cópia da coletânea sem técnica de citação"),
            m("texto_curto_demais_para_analise", "texto curto demais para análise da linguagem"),
          ],
        },
        {
          chave: "em_desenvolvimento",
          rotulo: "Em desenvolvimento",
          pontos: 1.5,
          descritor:
            "a clareza está comprometida em parte do texto: alguns desvios sintáticos, " +
            "quebra pontual de período, períodos longos e confusos, marcas de oralidade.",
          marcadores: [
            m("alguns_desvios_sintaticos", "alguns desvios na construção sintática"),
            m("quebra_pontual_de_periodo", "quebra indevida pontual de período"),
            m("periodos_longos_e_confusos", "alguns períodos longos e confusos"),
            m("marcas_de_oralidade", "termos coloquiais ou marcas de oralidade"),
          ],
        },
        {
          chave: "bem_encaminhada",
          rotulo: "Bem encaminhada",
          pontos: 2,
          descritor:
            "construções sintáticas elaboradas e vocabulário criterioso, com resíduos: termo " +
            "impreciso pontual, período longo que carece de clareza, excesso de 1ª pessoa do " +
            "plural.",
          marcadores: [
            m("termos_imprecisos_pontuais", "termos inadequados ou imprecisos pontuais"),
            m("organizacao_sintatica_eventual", "problema eventual de organização dos elementos sintáticos"),
            m("periodos_longos_pouco_claros", "períodos longos que carecem de clareza"),
            m("excesso_de_primeira_pessoa_plural", "uso excessivo da 1ª pessoa do plural"),
          ],
        },
        {
          chave: "excelente",
          rotulo: "Excelente",
          pontos: 2.5,
          descritor:
            "seleção vocabular precisa e construções sintáticas claras e bem elaboradas, " +
            "capazes de garantir eloquência ao texto.",
          marcadores: [],
        },
      ],
    },
  ];

  // ---------- Os formatos de prova ----------
  //
  // Extensão e título NÃO são regra da rubrica: são regra do EDITAL, e mudam de
  // banca para banca. Fixá-los aqui num número só foi o erro que este bloco
  // desfaz. O que os estudos de anatomia das provas deste repositório dizem:
  //
  //   FGV (vestibular-direito/estudo-anatomia-provas-fgv-insper-2025-2026.md)
  //     — 20 a 30 linhas; título "RECOMENDÁVEL", não exigido.
  //   Insper (mesmo estudo, e o cabeçalho de data/redacoes.js)
  //     — 10 a 30 linhas; a questão-tema TEM de ser copiada como título, então
  //       título livre ou ausente é erro de formato.
  //   Medicina (vestibular-medicina/estudo-anatomia-provas-medicina-sp-2025-2026.md)
  //     — "o comando não pede título" em Unesp, Unifesp, Einstein e Santa Casa;
  //       só PUC-SP e FUVEST o exigem. Cinco de oito bancas não pedem.
  //
  // Ou seja: descontar por falta de título FORA do formato Insper pune o aluno
  // por não fazer o que a prova dele não pede — e a tela ainda afirmava que "a
  // banca cobra título", que é falso na maioria delas. Por isso o padrão é
  // `fgv`, onde o título não desconta.
  //
  // A conversão linha->palavra é ~9 palavras por linha manuscrita, e é a mesma
  // que o contador da tela mostra (palavrasIdealMin/Max). A folga de ~10% até o
  // ponto de desconto (palavrasMin/Max) existe porque essa conversão é
  // aproximada: descontar de quem escreveu 179 seria punir o erro de conversão,
  // não o do aluno.
  var FORMATOS = {
    fgv: {
      chave: "fgv",
      rotulo: "FGV",
      linhasMin: 20,
      linhasMax: 30,
      palavrasIdealMin: 180,
      palavrasIdealMax: 270,
      palavrasMin: 160,
      palavrasMax: 290,
      tituloObrigatorio: false,
    },
    insper: {
      chave: "insper",
      rotulo: "Insper",
      linhasMin: 10,
      linhasMax: 30,
      palavrasIdealMin: 90,
      palavrasIdealMax: 270,
      palavrasMin: 80,
      palavrasMax: 290,
      tituloObrigatorio: true,
    },
  };

  // Formato desconhecido cai no da FGV, que é o comando padrão de toda proposta
  // do app. Recusar seria pior: uma correção antiga, gravada antes deste campo
  // existir, ficaria sem nota por um dado ausente que não é culpa de ninguém.
  function formato(chave) {
    return FORMATOS[chave] || FORMATOS.fgv;
  }

  var DESCONTOS = { VALOR: 0.5 };

  // Gramática NÃO entra aqui. Ela é o eixo Linguagem, e descontar de novo
  // puniria duas vezes — a rubrica de papel duplica porque a correção é manual,
  // e ali não há eixo que se aplique sozinho.

  function eixo(chave) {
    for (var i = 0; i < EIXOS.length; i++) if (EIXOS[i].chave === chave) return EIXOS[i];
    return null;
  }

  function banda(eixoChave, bandaChave) {
    var e = eixo(eixoChave);
    if (!e) return null;
    for (var i = 0; i < e.bandas.length; i++) if (e.bandas[i].chave === bandaChave) return e.bandas[i];
    return null;
  }

  function arredondar(n) {
    return Math.round(n * 10) / 10;
  }

  // Recusar é melhor do que inventar: um eixo que veio faltando ou com banda
  // fora do enum NÃO vira banda baixa. A correção sai sem nota, mostra os
  // comentários que vieram e pede pra tentar de novo. Fabricar uma banda baixa
  // pra fechar a conta seria exatamente a nota inventada que este arquivo
  // existe pra impedir — e contaminaria o "anterior", fazendo o delta da
  // próxima tentativa mentir.
  function recusar(motivo) {
    return {
      ok: false,
      motivo: motivo,
      nota: null,
      anulada: false,
      porEixo: [],
      descontos: [],
      faixa: null,
      eixoMaisCaro: null,
    };
  }

  function calcular(entrada) {
    var dados = (entrada && entrada.rubrica) || {};
    var escolhidas = [];

    for (var i = 0; i < EIXOS.length; i++) {
      var e = EIXOS[i];
      var recebido = dados[e.chave];
      var chaveBanda = recebido && recebido.banda;
      if (!chaveBanda) return recusar("o corretor não avaliou o eixo " + e.chave);
      var b = banda(e.chave, chaveBanda);
      if (!b) return recusar("banda desconhecida em " + e.chave + ": " + chaveBanda);
      escolhidas.push({ eixo: e, banda: b });
    }

    var adequacao = escolhidas[0];

    // Anulação: os demais eixos não são avaliados, e a nota é zero. É a única
    // banda com esse poder, e por isso o descritor dela pede evidência forte.
    if (adequacao.banda.chave === "anulado") {
      return {
        ok: true,
        motivo: "",
        nota: 0,
        anulada: true,
        porEixo: [
          {
            chave: adequacao.eixo.chave,
            rotulo: adequacao.eixo.rotulo,
            maximo: adequacao.eixo.maximo,
            banda: adequacao.banda.chave,
            rotuloBanda: adequacao.banda.rotulo,
            pontos: 0,
            limitado: false,
          },
        ],
        descontos: [],
        faixa: "refazer",
        eixoMaisCaro: null,
      };
    }

    var porEixo = escolhidas.map(function (x) {
      return {
        chave: x.eixo.chave,
        rotulo: x.eixo.rotulo,
        maximo: x.eixo.maximo,
        banda: x.banda.chave,
        rotuloBanda: x.banda.rotulo,
        pontos: x.banda.pontos,
        limitado: false,
      };
    });

    // As travas de dependência. São elas que fazem "adequação à proposta" valer
    // muito mais do que o 1,0 que a tabela mostra: errar o comando custa até
    // 3,5, porque leva a argumentação junto.
    var pAdequacao = porEixo[0].pontos;
    if (pAdequacao === 0) {
      if (porEixo[1].pontos > 0) porEixo[1].limitado = true;
      porEixo[1].pontos = 0;
    } else if (pAdequacao === 0.5 && porEixo[1].pontos > 1.5) {
      porEixo[1].pontos = 1.5;
      porEixo[1].limitado = true;
    }

    var f = formato(entrada && entrada.formato);
    var descontos = [];
    var palavras = Number(entrada && entrada.palavras) || 0;
    if (palavras < f.palavrasMin || palavras > f.palavrasMax) {
      descontos.push({
        chave: "extensao",
        rotulo:
          (palavras < f.palavrasMin ? "abaixo das " + f.linhasMin : "acima das " + f.linhasMax) +
          " linhas do formato " + f.rotulo,
        valor: DESCONTOS.VALOR,
      });
    }
    // Só desconta título onde o edital o exige. Ver o bloco FORMATOS.
    if (f.tituloObrigatorio && !(entrada && entrada.temTitulo)) {
      descontos.push({
        chave: "titulo",
        rotulo: "sem título (obrigatório no formato " + f.rotulo + ")",
        valor: DESCONTOS.VALOR,
      });
    }

    var bruta = porEixo.reduce(function (s, x) {
      return s + x.pontos;
    }, 0);
    var abatido = descontos.reduce(function (s, d) {
      return s + d.valor;
    }, 0);
    var nota = arredondar(Math.max(0, bruta - abatido));

    // Fuga ao tema é refazer, não ajustar — mesmo quando estrutura e linguagem
    // seguram a soma em 5,0. Sem esta linha o rótulo contradiria a regra que a
    // instrução do corretor já enuncia.
    var faixa;
    if (pAdequacao === 0) faixa = "refazer";
    else if (nota >= 7) faixa = "competitiva";
    else if (nota >= 4) faixa = "precisa_ajuste";
    else faixa = "refazer";

    // Onde mais ponto foi perdido, em pontos absolutos — não em impressão.
    // Perder 1,5 em argumentação e 0,5 em linguagem manda estudar argumentação,
    // mesmo que a linguagem pareça pior de ler. Empate vai para o eixo de maior
    // peso, que é onde a próxima tentativa rende mais.
    var maisCaro = null;
    porEixo.forEach(function (x) {
      var perda = arredondar(x.maximo - x.pontos);
      if (perda <= 0) return;
      if (
        !maisCaro ||
        perda > maisCaro.perda ||
        (perda === maisCaro.perda && x.maximo > maisCaro.maximo)
      ) {
        maisCaro = { chave: x.chave, perda: perda, maximo: x.maximo };
      }
    });

    return {
      ok: true,
      motivo: "",
      nota: nota,
      anulada: false,
      porEixo: porEixo,
      descontos: descontos,
      faixa: faixa,
      eixoMaisCaro: maisCaro ? maisCaro.chave : null,
    };
  }

  // O bloco que ia.js interpola na instrução do sistema. Sai daqui, e não de uma
  // string escrita à mão lá, para que a lista de bandas do prompt seja
  // literalmente a mesma que a conta usa. Sem números de propósito: o modelo não
  // pode saber quanto cada banda vale, ou passa a escolher pela nota que quer
  // dar em vez de pelo texto que leu.
  function blocoDoPrompt() {
    var linhas = [];
    EIXOS.forEach(function (e) {
      linhas.push("EIXO " + e.chave + " — " + e.rotulo);
      e.bandas.forEach(function (b) {
        linhas.push('  banda "' + b.chave + '" (' + b.rotulo + "): " + b.descritor);
        if (b.marcadores.length) {
          linhas.push(
            "    marcadores possíveis: " +
              b.marcadores
                .map(function (mk) {
                  return mk.chave + " (" + mk.texto + ")";
                })
                .join("; ")
          );
        }
      });
      linhas.push("");
    });
    return linhas.join("\n").trim();
  }

  window.VD_RUBRICA = {
    EIXOS: EIXOS,
    DESCONTOS: DESCONTOS,
    FORMATOS: FORMATOS,
    formato: formato,
    eixo: eixo,
    banda: banda,
    calcular: calcular,
    blocoDoPrompt: blocoDoPrompt,
  };
})();
