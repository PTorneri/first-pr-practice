// Subtemas específicos dentro de cada uma das 13 frentes de Medicina, usados
// para gerar recomendações de vídeo-aula concretas em vez de buscas genéricas.
// Ao longo das semanas em que a mesma frente volta, a sugestão muda e cobre
// mais terreno.
//
// Os subtemas foram escolhidos a partir do que os 25 cadernos lidos realmente
// cobram (ver estudo-anatomia-provas-medicina-sp-2025-2026.md), não a partir de
// um índice de livro didático.
window.VIDEO_TOPICS = {
  "biologia": [
    { tema: "Citologia: organelas e membrana plasmática", busca: "aula organelas membrana plasmática vestibular medicina" },
    { tema: "Genética mendeliana e heredogramas", busca: "aula heredograma genética mendeliana vestibular" },
    { tema: "Fisiologia humana: circulação e respiração", busca: "aula sistema cardiovascular respiratório vestibular" },
    { tema: "Ecologia: ciclos, teias e sucessão", busca: "aula teia alimentar sucessão ecológica vestibular" },
    { tema: "Evolução e filogenia", busca: "aula evolução cladograma vestibular" },
    { tema: "Fisiologia vegetal: hormônios e transpiração", busca: "aula auxina fototropismo transpiração vegetal vestibular" },
    { tema: "Imunologia e vacinas", busca: "aula imunologia resposta imune vacinas vestibular" },
  ],
  "quimica": [
    { tema: "Estequiometria e cálculos com mol", busca: "aula estequiometria mol vestibular medicina" },
    { tema: "Química orgânica: funções e isomeria", busca: "aula funções orgânicas isomeria vestibular" },
    { tema: "Soluções e concentração", busca: "aula concentração molaridade soluções vestibular" },
    { tema: "Equilíbrio químico e pH", busca: "aula equilíbrio químico pH vestibular" },
    { tema: "Eletroquímica: pilhas e eletrólise", busca: "aula pilhas eletrólise vestibular" },
    { tema: "Termoquímica e entalpia", busca: "aula termoquímica entalpia vestibular" },
  ],
  "fisica": [
    { tema: "Cinemática e leis de Newton", busca: "aula cinemática leis de newton vestibular" },
    { tema: "Energia, trabalho e quantidade de movimento", busca: "aula energia trabalho quantidade de movimento vestibular" },
    { tema: "Termologia e gases ideais", busca: "aula termologia gases ideais vestibular" },
    { tema: "Óptica geométrica: espelhos e lentes", busca: "aula espelhos lentes óptica geométrica vestibular" },
    { tema: "Ondas e acústica", busca: "aula ondas acústica vestibular" },
    { tema: "Eletrodinâmica: circuitos e resistores", busca: "aula circuitos elétricos resistores vestibular" },
  ],
  "matematica": [
    { tema: "Funções: afim, quadrática e exponencial", busca: "aula funções afim quadrática exponencial vestibular" },
    { tema: "Geometria plana: áreas e semelhança", busca: "aula geometria plana áreas semelhança vestibular" },
    { tema: "Geometria espacial: prismas, cilindros e esferas", busca: "aula geometria espacial volume vestibular" },
    { tema: "Probabilidade e análise combinatória", busca: "aula probabilidade análise combinatória vestibular" },
    { tema: "Estatística: média, mediana e gráficos", busca: "aula estatística média mediana vestibular" },
    { tema: "Trigonometria no triângulo e no ciclo", busca: "aula trigonometria vestibular" },
    { tema: "Porcentagem, juros e proporção", busca: "aula porcentagem juros proporção vestibular" },
  ],
  "interpretacao-texto": [
    { tema: "Tese, argumento e inferência", busca: "aula interpretação de texto tese argumento vestibular" },
    { tema: "Textos de divulgação científica", busca: "aula interpretação divulgação científica vestibular" },
    { tema: "Charge, tirinha e infográfico", busca: "aula interpretação de charge e tirinha vestibular" },
    { tema: "Coesão: referentes e conectivos", busca: "aula coesão referência conectivos vestibular" },
  ],
  "gramatica": [
    { tema: "Concordância verbal e nominal", busca: "aula concordância verbal nominal vestibular" },
    { tema: "Regência e crase", busca: "aula regência crase vestibular" },
    { tema: "Colocação e emprego de pronomes", busca: "aula colocação pronominal pronomes oblíquos vestibular" },
    { tema: "Processos de formação de palavras", busca: "aula formação de palavras derivação vestibular" },
    { tema: "Pontuação e período composto", busca: "aula pontuação orações vestibular" },
  ],
  "literatura": [
    { tema: "Realismo e Naturalismo: Machado e Aluísio", busca: "aula realismo naturalismo machado de assis vestibular" },
    { tema: "Romantismo: prosa e poesia", busca: "aula romantismo brasileiro vestibular" },
    { tema: "Modernismo: as três fases", busca: "aula modernismo brasileiro fases vestibular" },
    { tema: "Análise de poema: eu lírico e figuras", busca: "aula análise de poema eu lírico figuras de linguagem vestibular" },
    { tema: "Literatura contemporânea e indígena", busca: "aula literatura brasileira contemporânea vestibular" },
  ],
  "ingles": [
    { tema: "Main idea e purpose do texto", busca: "aula inglês main idea purpose vestibular" },
    { tema: "Vocabulário em contexto e referência", busca: "aula inglês vocabulary in context reference vestibular" },
    { tema: "Inferência e detalhe específico", busca: "aula inglês inference detail vestibular" },
    { tema: "Gráficos, infográficos e tirinhas em inglês", busca: "aula inglês chart infographic comic vestibular" },
  ],
  "historia": [
    { tema: "Brasil Colônia: escravidão e economia", busca: "aula brasil colônia escravidão vestibular" },
    { tema: "Império e Primeira República", busca: "aula império primeira república vestibular" },
    { tema: "Era Vargas e ditadura militar", busca: "aula era vargas ditadura militar vestibular" },
    { tema: "Idade Moderna: mercantilismo e revoluções", busca: "aula mercantilismo revolução industrial francesa vestibular" },
    { tema: "Século XX: guerras mundiais e Guerra Fria", busca: "aula guerras mundiais guerra fria vestibular" },
  ],
  "geografia": [
    { tema: "Geomorfologia, solos e relevo", busca: "aula relevo solos geomorfologia vestibular" },
    { tema: "Climatologia e fenômenos El Niño/La Niña", busca: "aula climatologia el niño vestibular" },
    { tema: "Urbanização e rede urbana brasileira", busca: "aula urbanização brasileira vestibular" },
    { tema: "Agricultura e questão agrária", busca: "aula agricultura questão agrária brasil vestibular" },
    { tema: "Geopolítica e recursos energéticos", busca: "aula geopolítica energia vestibular" },
    { tema: "Cartografia e leitura de mapas", busca: "aula cartografia escala projeções vestibular" },
  ],
  "filosofia-sociologia": [
    { tema: "Sócrates, Platão e Aristóteles", busca: "aula sócrates platão aristóteles vestibular" },
    { tema: "Ética e filosofia moral: Kant e utilitarismo", busca: "aula kant ética utilitarismo vestibular" },
    { tema: "Teoria do conhecimento: racionalismo e empirismo", busca: "aula racionalismo empirismo locke descartes vestibular" },
    { tema: "Clássicos da sociologia: Marx, Durkheim e Weber", busca: "aula marx durkheim weber vestibular" },
    { tema: "Poder, trabalho e sociedade contemporânea", busca: "aula foucault poder trabalho contemporâneo vestibular" },
  ],
  "artes": [
    { tema: "Renascimento e Barroco", busca: "aula renascimento barroco história da arte vestibular" },
    { tema: "Vanguardas europeias e Modernismo brasileiro", busca: "aula vanguardas modernismo artes vestibular" },
    { tema: "Leitura de obra: composição e ponto de vista", busca: "aula análise de obra de arte vestibular" },
    { tema: "Arte contemporânea e curadoria", busca: "aula arte contemporânea vestibular" },
  ],
  "atualidades": [
    { tema: "Crise climática, COP e transição energética", busca: "atualidades crise climática COP transição energética" },
    { tema: "Inteligência artificial: usos e efeitos sociais", busca: "atualidades inteligência artificial impactos vestibular" },
    { tema: "Trabalho por plataforma e pejotização", busca: "atualidades uberização pejotização vestibular" },
    { tema: "Saúde pública: SUS, vacinas e epidemias", busca: "atualidades saúde pública SUS vacinas vestibular" },
    { tema: "Conflitos e geopolítica recente", busca: "atualidades conflitos geopolítica vestibular" },
  ],
};
