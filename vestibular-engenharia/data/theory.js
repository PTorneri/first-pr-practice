// GERADO por banco-central/build-trilhas.js -- nao edite a mao.
// Teoria da trilha de Engenharia, por frente.
// A fonte e banco-central/data/questions/*.json (as questoes) e
// banco-central/data/subtemas/*.json (o subtema de cada uma).
//
// Corrigiu uma questao? Corrija no banco central e rode o build de novo.
// `--verificar` reprova quando o banco central mudou e este arquivo nao.
// A fonte é banco-central/data/teoria.json (mapa em banco-central/teoria.js).

window.THEORY = {
 "matematica": {
  "resumo": "20% da prova do ITA (12 das 60 questões), e cobre o programa todo do ensino médio até o extra que outras bancas não pedem: números complexos, polinômios, teoria dos conjuntos/lógica. No ITA 2024, das 12 questões, 2 usaram raízes de polinômio, 1 potência de complexo por De Moivre, 1 poliedro (relação de Euler) e 1 teoria dos conjuntos com afirmações I/II/III — nenhuma banca de Medicina ou Direito testa esse bloco no mesmo nível.",
  "gatilhos": [
   "Afirmações I, II, III (às vezes IV) pra julgar V/F → é o formato mais comum do ITA; vale eliminar pelo item mais fácil de refutar antes de checar os outros.",
   "Enunciado cita ℕ, ℝ, ℂ, M_n(ℝ) ou notação de conjuntos formal → é convenção do cabeçalho oficial da prova, não enfeite; a resposta depende de saber a notação, não só a conta.",
   "Número complexo escrito como z = a+bi ou em forma polar → primeiro decida se o caminho mais curto é módulo/argumento (produto, potência, raiz) ou forma algébrica (soma, produto direto) — trocar o caminho custa tempo, não errar a questão."
  ],
  "pegadinhas": [
   "Tratar números complexos e polinômios como assunto raro e deixar pra depois: no ITA são 20 a 25% das questões de Matemática, praticamente garantidos todo ano.",
   "Nas relações de Girard, trocar o sinal da soma das raízes (−b/a) com o da soma dos produtos dois a dois (c/a, sem troca de sinal) — são fórmulas com regras de sinal diferentes.",
   "Na radiciação de complexos, esquecer que zⁿ=w tem exatamente n raízes distintas, não uma só — o universo é o dos complexos, não o dos reais."
  ],
  "subtemas": []
 },
 "fisica": {
  "resumo": "20% da prova do ITA (12 das 60), com um traço que diferencia da Física de Medicina: usa as constantes do cabeçalho oficial (g, c, G, massa e raio da Terra) com liberdade, e cobra física moderna — no ITA 2024, uma questão inteira foi sobre dilatação temporal relativística num foguete, medindo intervalo entre sinais de rádio nos dois extremos.",
  "gatilhos": [
   "Enunciado dá aproximações do cabeçalho ((1+x)ⁿ≈1+nx, √60≈7,7 etc.) → é sinal de que a conta final exige aproximar, não resolver exato; usar a aproximação errada ou não usar nenhuma são os dois erros mais comuns.",
   "Velocidade próxima de c ou menção a 'referencial'/'simultaneidade' → é física moderna, não mecânica clássica; fórmulas de Newton não se aplicam.",
   "Duas grandezas dadas em unidades muito diferentes de ordem de grandeza → checar conversão de unidade antes de plugar na fórmula é o passo que mais gente pula."
  ],
  "pegadinhas": [
   "Aplicar mecânica newtoniana (velocidades se somam direto) num problema que já sinalizou velocidade relativística — a composição de velocidades muda perto de c.",
   "Esquecer que a contração de Lorentz só afeta a dimensão PARALELA ao movimento, não todas as dimensões do objeto.",
   "Em efeito fotoelétrico, achar que aumentar a intensidade da luz resolve quando a frequência está abaixo do corte — é a frequência, não a intensidade, que decide se o elétron sai."
  ],
  "subtemas": []
 },
 "quimica": {
  "resumo": "20% da prova do ITA (12 das 60), com questões quase sempre em formato de afirmações I a V pra julgar — no ITA 2024, técnicas de separação de misturas, comparação de pKa entre ácidos orgânicos, modelos atômicos históricos (Bohr, Dalton, Rutherford, Thomson) aplicados a equações específicas, e potenciais de eletrodo apareceram todos nesse formato.",
  "gatilhos": [
   "Pergunta relaciona um MODELO atômico histórico (Dalton, Thomson, Rutherford, Bohr) a um tipo de equação química → o que se testa é qual modelo tem o 'arcabouço mínimo' pra explicar aquele fenômeno, não decorar datas.",
   "Comparação de pKa/força ácida entre compostos orgânicos parecidos → o efeito indutivo de grupos vizinhos (halogênio perto ou longe da carboxila) decide, mais do que a fórmula geral da função.",
   "Afirmação sobre célula eletroquímica citando potencial padrão → cuidado com a diferença entre potencial ABSOLUTO de semicélula (não existe, só se mede diferença) e potencial relativo a um eletrodo de referência."
  ],
  "pegadinhas": [
   "Achar que aumentar a temperatura sempre desloca equilíbrio pra produtos — depende de a reação direta ser endo ou exotérmica.",
   "Confundir separação de misturas azeotrópicas (não se separam por destilação simples) com misturas comuns."
  ],
  "subtemas": []
 },
 "gramatica": {
  "resumo": "O bloco de Português do ITA tem 20% da prova (12 questões), mas é construído quase inteiramente sobre trechos de romances e peças contemporâneos protegidos por direito autoral — na edição 2024, nenhuma das 12 questões pôde ser reaproveitada por esse motivo, o que já diz algo sobre o formato: gramática raramente aparece solta, quase sempre ancorada num trecho literário longo.",
  "gatilhos": [
   "Questão de concordância/regência dentro de um trecho literário longo → a regra testada costuma estar amarrada à interpretação do trecho, não isolada."
  ],
  "pegadinhas": [
   "Estudar gramática do ITA como lista de regras soltas — o formato da banca privilegia a regra aplicada dentro de um texto real, não a pergunta puramente metalinguística."
  ],
  "subtemas": []
 },
 "interpretacao-texto": {
  "resumo": "Parte do mesmo bloco de Português (20% da prova), quase sempre a partir de romance ou peça contemporâneos — a mesma razão que impediu o reaproveitamento das questões de 2024 (textos ainda protegidos) é a evidência de que o ITA prioriza ficção recente sobre textos de domínio público.",
  "gatilhos": [
   "Trecho de romance/peça contemporânea longo → a pergunta tende a testar leitura de subtexto (o que a cena revela sobre a personagem) mais do que localização direta de informação."
  ],
  "pegadinhas": [
   "Preparar-se só com textos de domínio público (autores clássicos) quando o padrão observado é ficção contemporânea sob direitos autorais."
  ],
  "subtemas": []
 },
 "literatura": {
  "resumo": "Segue o mesmo padrão do bloco de Português do ITA: apoiado em obras contemporâneas específicas, não num painel de escolas literárias como em Medicina/Direito. É prova que recompensa quem leu os livros do ano, não quem decorou características de movimento.",
  "gatilhos": [
   "Pergunta cita autor e obra específicos e recentes → tratar como prova de leitura da obra, não de história literária."
  ],
  "pegadinhas": [
   "Estudar só características de escola literária (Romantismo, Realismo etc.) sem ler os livros do ano — o ITA parece pedir a obra específica, ao contrário de bancas mais generalistas."
  ],
  "subtemas": []
 },
 "ingles": {
  "resumo": "20% da prova do ITA (12 questões), toda baseada em reportagens integrais de veículos como The New York Times e The Economist — nenhuma das 12 de 2024 pôde ser reaproveitada por reproduzir o texto quase por completo. É prova de compreensão de texto jornalístico longo em inglês, não de gramática isolada.",
  "gatilhos": [
   "Texto-base longo de jornal/revista em inglês → o vocabulário costuma ser de nível avançado (jornalismo internacional, não didático), e vale ler o parágrafo inteiro antes de responder, não só a frase citada."
  ],
  "pegadinhas": [
   "Treinar só com textos didáticos simplificados quando o padrão real é reportagem autêntica e longa, no nível de leitura de um adulto nativo."
  ],
  "subtemas": []
 }
};
