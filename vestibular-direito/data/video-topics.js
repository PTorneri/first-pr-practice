// Subtemas ESPECÍFICOS dentro de cada uma das 15 frentes, usados para gerar
// recomendações de vídeo-aula mais concretas do que "aula de matemática
// vestibular" — por exemplo, "aula de porcentagem e juros compostos". Cada
// frente tem vários subtemas para que, ao longo das semanas em que o mesmo
// assunto volta a ser estudado, a recomendação de vídeo mude e cubra mais
// terreno específico em vez de repetir sempre a mesma busca genérica.
window.VIDEO_TOPICS = {
  "interpretacao-texto": [
    { tema: "Interpretação de notícias e artigos de opinião", busca: "aula interpretação de notícias e artigos de opinião vestibular" },
    { tema: "Argumentação e tipos de argumento em textos", busca: "aula tipos de argumento e argumentação em textos vestibular" },
    { tema: "Interpretação de textos publicitários e persuasivos", busca: "aula interpretação de texto publicitário persuasão vestibular" },
    { tema: "Leitura de textos científicos de divulgação", busca: "aula interpretação de texto científico divulgação científica vestibular" }
  ],
  "gramatica": [
    { tema: "Concordância verbal e nominal", busca: "aula concordância verbal e nominal vestibular" },
    { tema: "Regência verbal e nominal", busca: "aula regência verbal e nominal vestibular" },
    { tema: "Uso da crase", busca: "aula uso da crase vestibular" },
    { tema: "Coesão textual e conectivos", busca: "aula coesão textual e conectivos vestibular" },
    { tema: "Colocação pronominal e paralelismo sintático", busca: "aula colocação pronominal e paralelismo sintático vestibular" }
  ],
  "atualidades-politica": [
    { tema: "Presidencialismo de coalizão e sistema político brasileiro", busca: "aula presidencialismo de coalizão sistema político brasileiro" },
    { tema: "Reforma tributária brasileira", busca: "aula reforma tributária brasileira explicada" },
    { tema: "Reforma da previdência e transição demográfica", busca: "aula reforma da previdência transição demográfica" },
    { tema: "Federalismo fiscal e financiamento de campanhas", busca: "aula federalismo fiscal financiamento de campanhas eleitorais" }
  ],
  "atualidades-geopolitica": [
    { tema: "Mercosul e União Europeia: blocos econômicos", busca: "aula Mercosul União Europeia blocos econômicos vestibular" },
    { tema: "ONU, OMC e FMI: organismos multilaterais", busca: "aula ONU OMC FMI organismos multilaterais explicado" },
    { tema: "Multipolaridade e guerras por procuração", busca: "aula multipolaridade guerra por procuração relações internacionais" },
    { tema: "Cadeias globais de valor e geopolítica dos semicondutores", busca: "aula cadeias globais de valor semicondutores geopolítica" },
    { tema: "Refugiados e direito internacional humanitário", busca: "aula refugiados direito internacional humanitário vestibular" }
  ],
  "atualidades-meioambiente": [
    { tema: "Efeito estufa e acordos climáticos internacionais", busca: "aula efeito estufa acordos climáticos internacionais vestibular" },
    { tema: "Transição energética e energias renováveis", busca: "aula transição energética energias renováveis vestibular" },
    { tema: "Economia circular e critérios ESG", busca: "aula economia circular critérios ESG explicado" },
    { tema: "Perda de biodiversidade e escassez hídrica", busca: "aula perda de biodiversidade escassez hídrica vestibular" }
  ],
  "atualidades-tecnologia": [
    { tema: "Machine learning e inteligência artificial generativa", busca: "aula machine learning inteligência artificial generativa explicado" },
    { tema: "LGPD e proteção de dados pessoais", busca: "aula LGPD lei geral de proteção de dados explicada" },
    { tema: "Bolhas de filtro e desinformação nas redes sociais", busca: "aula bolha de filtro desinformação redes sociais vestibular" },
    { tema: "Blockchain e criptomoedas", busca: "aula blockchain criptomoedas explicado vestibular" }
  ],
  "direitos-humanos": [
    { tema: "Gerações de direitos humanos e a DUDH", busca: "aula gerações de direitos humanos declaração universal vestibular" },
    { tema: "Direitos da criança, do adolescente e das pessoas com deficiência", busca: "aula ECA direitos da criança e do adolescente vestibular" },
    { tema: "Ações afirmativas e cotas raciais no Brasil", busca: "aula ações afirmativas cotas raciais STF vestibular" },
    { tema: "Direito à moradia e refugiados", busca: "aula direito à moradia refugiados direitos humanos vestibular" }
  ],
  "historia-brasil": [
    { tema: "Brasil Colônia: economia açucareira e mineração", busca: "aula brasil colônia economia açucareira mineração vestibular" },
    { tema: "Independência e Império do Brasil", busca: "aula independência do brasil período imperial vestibular" },
    { tema: "Era Vargas e Estado Novo", busca: "aula era vargas estado novo vestibular" },
    { tema: "Ditadura militar e redemocratização", busca: "aula ditadura militar redemocratização constituição de 1988" }
  ],
  "historia-geral": [
    { tema: "Revolução Francesa e Iluminismo", busca: "aula revolução francesa iluminismo vestibular" },
    { tema: "Revolução Industrial", busca: "aula revolução industrial causas e consequências vestibular" },
    { tema: "Primeira e Segunda Guerras Mundiais", busca: "aula primeira e segunda guerra mundial resumo vestibular" },
    { tema: "Guerra Fria e descolonização afro-asiática", busca: "aula guerra fria descolonização áfrica ásia vestibular" }
  ],
  "geografia": [
    { tema: "Urbanização e migrações no Brasil", busca: "aula urbanização êxodo rural migrações no brasil vestibular" },
    { tema: "Geopolítica dos recursos naturais", busca: "aula geopolítica dos recursos naturais água energia vestibular" },
    { tema: "Biomas brasileiros e desmatamento", busca: "aula biomas brasileiros desmatamento amazônia vestibular" },
    { tema: "Cartografia: fusos horários e escalas", busca: "aula cartografia fusos horários escalas vestibular" }
  ],
  "filosofia-sociologia": [
    { tema: "Contratualismo: Hobbes, Locke e Rousseau", busca: "aula contratualismo hobbes locke rousseau vestibular" },
    { tema: "Correntes sociológicas: Durkheim, Weber e Marx", busca: "aula durkheim weber marx sociologia clássica vestibular" },
    { tema: "Ética kantiana e utilitarismo", busca: "aula ética kantiana utilitarismo filosofia vestibular" },
    { tema: "Foucault, biopolítica e pensamento contemporâneo", busca: "aula foucault biopolítica filosofia contemporânea vestibular" }
  ],
  "artes-cultura": [
    { tema: "Renascimento e Barroco", busca: "aula renascimento barroco história da arte vestibular" },
    { tema: "Semana de Arte Moderna de 1922", busca: "aula semana de arte moderna de 1922 vestibular" },
    { tema: "Indústria cultural e cultura de massa", busca: "aula indústria cultural adorno cultura de massa vestibular" },
    { tema: "Arte urbana e arte digital", busca: "aula arte urbana grafite arte digital contemporânea vestibular" }
  ],
  "matematica-rlm": [
    { tema: "Porcentagem, juros simples e compostos", busca: "aula porcentagem juros simples e compostos vestibular" },
    { tema: "Progressões aritméticas e geométricas", busca: "aula progressão aritmética e geométrica vestibular" },
    { tema: "Probabilidade e análise combinatória básica", busca: "aula probabilidade análise combinatória básica vestibular" },
    { tema: "Lógica proposicional e tabela-verdade", busca: "aula lógica proposicional tabela verdade vestibular" },
    { tema: "Geometria básica: área e perímetro", busca: "aula geometria básica área e perímetro vestibular" }
  ],
  "ingles": [
    { tema: "Reading comprehension: textos sobre tecnologia e sociedade", busca: "aula reading comprehension inglês vestibular technology society" },
    { tema: "Falsos cognatos (false friends) em inglês", busca: "aula false friends falsos cognatos inglês vestibular" },
    { tema: "Vocabulário e interpretação de textos em inglês", busca: "aula vocabulário interpretação de texto em inglês vestibular" }
  ],
  "ciencias-natureza": [
    { tema: "Ecologia: cadeias alimentares e biodiversidade", busca: "aula ecologia cadeia alimentar biodiversidade vestibular" },
    { tema: "Saúde pública: vacinas e resistência bacteriana", busca: "aula vacinas imunidade resistência bacteriana vestibular" },
    { tema: "Física básica: energia, eletricidade e ondas", busca: "aula física básica energia eletricidade ondas vestibular" },
    { tema: "Química ambiental: poluição e reciclagem", busca: "aula química ambiental poluição reciclagem vestibular" }
  ]
};
