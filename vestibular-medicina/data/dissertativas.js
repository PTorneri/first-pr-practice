// Questões dissertativas da trilha de Medicina.
//
// ESTADO: semente inicial.
//
// O formato replica o que os 25 cadernos lidos mostraram ser comum a FUVEST,
// Unicamp, Unesp, Einstein e Santa Casa: enunciado com figura, esquema ou
// excerto, seguido de subitens a) e b), cada um com dois ou três comandos
// curtos. A correção é por CHECKLIST — cada ponto esperado vale
// independentemente, como nas grades de respostas esperadas publicadas pelas
// bancas.
//
// Duas regras que os editais tornam obrigatórias e que os pontos esperados
// abaixo refletem:
//   - resposta sem resolução não é considerada (todas as bancas);
//   - resposta correta acrescida de informação errada PERDE o ponto (Unifesp,
//     e a Santa Casa aplica critério equivalente).
window.DISSERTATIVAS = [
  // ---------- CIÊNCIAS DA NATUREZA ----------
  {
    "id": "med-dissert-bio-01",
    "area": "Ciências da Natureza",
    "frente": "biologia",
    "tempoSugerido": 20,
    "texto_apoio": "O esquema representa a reação do sistema imunológico em uma pessoa alérgica ao pólen inalado. Na primeira exposição, o antígeno é apresentado aos linfócitos, que se diferenciam em plasmócitos. Os plasmócitos secretam moléculas que se fixam à superfície dos mastócitos. Em uma exposição posterior ao mesmo antígeno, a ligação desencadeia a degranulação do mastócito e a liberação de uma substância vasoativa.",
    "comando": "a) Como são denominadas as moléculas liberadas pelos plasmócitos? Qual é a substância liberada pelo mastócito na etapa final do processo?\nb) Uma reação alérgica grave pode desencadear vasodilatação generalizada e choque anafilático. Cite uma consequência imediata que a vasodilatação provoca na circulação sanguínea e explique por que o choque anafilático pode levar à asfixia.",
    "pontosEsperados": [
      "Identifica as moléculas dos plasmócitos como anticorpos (imunoglobulinas, especificamente IgE)",
      "Identifica a substância liberada pelo mastócito como histamina",
      "Aponta como consequência imediata da vasodilatação a queda da pressão arterial (ou redução do retorno venoso e da perfusão dos tecidos)",
      "Explica a asfixia pela constrição da musculatura lisa dos brônquios e/ou pelo edema de laringe que obstrui as vias aéreas",
      "Não acrescenta informação errada às respostas corretas — nas bancas que corrigem por checklist, isso anula o ponto"
    ]
  },
  {
    "id": "med-dissert-qui-01",
    "area": "Ciências da Natureza",
    "frente": "quimica",
    "tempoSugerido": 20,
    "texto_apoio": "Em 1907 o químico alemão Fritz Haber conseguiu extrair nitrogênio diretamente do ar e produzir o principal nutriente nitrogenado de que as plantas precisam. O engenheiro Carl Bosch transformou o procedimento em processo industrial. Hoje cerca de metade dos átomos de nitrogênio do corpo humano tem origem nesse processo, e mais da metade da população mundial depende de alimentos fertilizados por ele.",
    "comando": "a) Qual é o composto nitrogenado produzido no processo Haber-Bosch? Escreva sua equação de síntese balanceada.\nb) Cite dois grupos de biomoléculas do corpo humano que contêm nitrogênio e explique por que o nitrogênio atmosférico (N₂), apesar de abundante, não é diretamente assimilável pela maioria dos seres vivos.",
    "pontosEsperados": [
      "Identifica o composto como amônia (NH₃)",
      "Apresenta a equação balanceada N₂ + 3 H₂ → 2 NH₃",
      "Cita duas classes corretas de biomoléculas nitrogenadas (proteínas/aminoácidos, ácidos nucleicos/nucleotídeos, ou bases nitrogenadas)",
      "Explica a inércia do N₂ pela tripla ligação N≡N, de energia de ligação muito alta, que exige fixação biológica ou industrial para ser rompida",
      "Apresenta a resolução, e não apenas o resultado final"
    ]
  },
  {
    "id": "med-dissert-fis-01",
    "area": "Ciências da Natureza",
    "frente": "fisica",
    "tempoSugerido": 20,
    "texto_apoio": "Um recipiente cilíndrico de altura 0,8 m e área da base 3,0 × 10⁻² m² está inicialmente cheio de um líquido de densidade 1,0 × 10³ kg/m³. Adote g = 10 m/s² e a pressão atmosférica local como 1,0 × 10⁵ Pa.",
    "comando": "a) Calcule a pressão exercida pelo líquido no fundo do recipiente e a pressão total nesse ponto.\nb) O recipiente é então colocado dentro de um elevador que sobe com aceleração constante de 2,0 m/s². Explique, justificando fisicamente, o que acontece com a pressão exercida pelo líquido no fundo.",
    "pontosEsperados": [
      "Calcula a pressão hidrostática p = ρgh = 1,0×10³ × 10 × 0,8 = 8,0 × 10³ Pa",
      "Calcula a pressão total somando a atmosférica: 1,0×10⁵ + 8,0×10³ = 1,08 × 10⁵ Pa",
      "Conclui que a pressão hidrostática AUMENTA no elevador acelerando para cima",
      "Justifica pela aceleração efetiva (g + a = 12 m/s²), obtendo p = 9,6 × 10³ Pa",
      "Apresenta os cálculos com as unidades corretas — resultado sem unidade não é aceito"
    ]
  },

  // ---------- CIÊNCIAS HUMANAS ----------
  {
    "id": "med-dissert-fil-01",
    "area": "Ciências Humanas",
    "frente": "filosofia-sociologia",
    "tempoSugerido": 25,
    "texto_apoio": "TEXTO 1 — \"Suponhamos, pois, que a mente seja um papel em branco, desprovida de todos os caracteres, sem quaisquer ideias. Como será ela suprida? De onde lhe provém esse vasto estoque? A isso respondo numa palavra: da experiência.\"\n\nTEXTO 2 — Há proposições cuja verdade a razão reconhece sem recorrer a qualquer verificação sensível, e é sobre elas que se assenta a certeza do conhecimento. Nenhuma experiência particular poderia estabelecê-las, porque toda experiência já as pressupõe.",
    "comando": "a) Identifique a corrente filosófica de cada texto e explicite o ponto exato em que elas divergem.\nb) Explique por que a divergência entre os dois textos não é sobre a POSSIBILIDADE do conhecimento, e cite qual debate filosófico trataria dessa outra questão.",
    "pontosEsperados": [
      "Identifica o Texto 1 como empirismo (Locke) e o Texto 2 como racionalismo",
      "Explicita que a divergência é sobre a ORIGEM do conhecimento: experiência sensível contra razão",
      "Explica que ambos afirmam que o conhecimento é possível — divergem sobre de onde ele vem, não sobre se existe",
      "Identifica o debate entre ceticismo e dogmatismo como o que trata da possibilidade do conhecimento",
      "Responde a partir da posição dos autores, e não com opinião própria"
    ]
  },
  {
    "id": "med-dissert-geo-01",
    "area": "Ciências Humanas",
    "frente": "geografia",
    "tempoSugerido": 25,
    "texto_apoio": "Em 2024 o Atlas da Mata Atlântica identificou perda de florestas maduras dentro do limite de aplicação da lei que protege o bioma. No mesmo período, projetos de exploração de petróleo na Margem Equatorial avançaram na agenda federal, com discussão sobre licenciamento ambiental e impacto sobre a foz de um grande rio.",
    "comando": "a) Explique por que a existência de uma lei específica de proteção não impediu a perda de floresta madura no período, citando dois fatores.\nb) A discussão sobre a Margem Equatorial opõe dois objetivos legítimos de política pública. Identifique-os e explique por que a decisão não se resolve apenas com dados técnicos.",
    "pontosEsperados": [
      "Cita ao menos dois fatores plausíveis para a perda apesar da lei (fiscalização insuficiente, pressão do desmatamento para uso agropecuário ou imobiliário, brechas ou flexibilizações no licenciamento, corte seletivo não detectado)",
      "Identifica os dois objetivos em tensão: geração de receita e segurança energética de um lado, conservação ambiental e proteção de populações costeiras de outro",
      "Explica que a decisão envolve escolha de valores e distribuição de custos entre grupos e gerações, não só medição de impacto",
      "Sustenta a resposta em relação de causa e efeito, e não em juízo genérico sobre meio ambiente"
    ]
  },

  // ---------- LINGUAGENS ----------
  {
    "id": "med-dissert-lp-01",
    "area": "Linguagens",
    "frente": "interpretacao-texto",
    "tempoSugerido": 20,
    "texto_apoio": "Numa crônica, o narrador relata que matou uma borboleta que entrara em seu quarto e, em seguida, se pergunta por que ela não era azul — pois, sendo azul, talvez a tivesse poupado. Conclui que a reflexão o consolou do malefício e o reconciliou consigo mesmo.",
    "comando": "a) Identifique o procedimento pelo qual o narrador se absolve do ato praticado e transcreva o trecho que o sustenta.\nb) Explique por que classificar esse narrador como \"humilde\" seria uma leitura equivocada, considerando a construção do texto.",
    "pontosEsperados": [
      "Identifica a transferência da responsabilidade para a vítima (a borboleta não era azul) como o procedimento de autoabsolvição",
      "Transcreve o trecho da reflexão que consola o narrador, e não uma paráfrase",
      "Explica que a forma é filosófica mas a função é autoabsolvição — humildade suporia reconhecimento da falta",
      "Distingue o narrador do autor, sem atribuir a Machado a posição do narrador",
      "Sustenta a leitura em marcas textuais, não em impressão"
    ]
  }
];
