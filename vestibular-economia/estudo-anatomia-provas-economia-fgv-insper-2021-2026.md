# Anatomia das provas: Economia na FGV EESP e no Insper (2021–2026)

**Como as provas são montadas, o que a trilha de Economia herda da de Direito e o que ela tem
que construir do zero** — estudo derivado da leitura dos cadernos oficiais de seis ciclos da FGV
EESP e do edital vigente do Insper.

Data: agosto de 2026 · Uso pessoal de estudo

Convenção herdada dos estudos anteriores: **nenhum enunciado, alternativa ou texto de apoio é
transcrito**. Tudo é referência por número de questão e descrição de padrão. As únicas citações
literais são de **grade de correção** — que é critério, não conteúdo de prova, e é justamente o
que este estudo precisa reproduzir com precisão.

---

## Base de evidências

| Pacote | Ciclo | O que contém | Lido |
|---|---|---|---|
| `eesp_0` | FGV 2026.1 | 60 objetivas (T2OBJ, 4 tipos), 45 objetivas de Natureza + 8 discursivas de LP (T3OBJD, 4 tipos), 1 redação + 8 discursivas de Matemática (RM), **grades de correção** de Matemática, LP e Redação, **resolução oficial** de Matemática, gabaritos | integral |
| `Economia_SP_Grade_Correcao` | FGV 2025.1 | cadernos A101/B102/C103/D104 e A601/B602/C603/D604 com gabaritos, P801, R201, **grade e resolução revisada** da Matemática discursiva | integral (grade de Matemática: parcial, ver Limitações) |
| `Unificado 2024.1 – Período 3` | FGV 2024.1 | 45 objetivas de Ciências (4 tipos, com gabarito) + LP discursiva e sua grade | integral |
| `2023.1 EESP` | FGV 2023.1 | Redação, Matemática discursiva **e sua resolução**, LP discursiva, Matemática+Humanas objetivas, Bio-Fís-Quím objetivas, Inglês-LP objetivas, gabaritos | integral |
| `2022.1 EESP` | FGV 2022.1 | 1ª fase (provas 001–004 com gabarito), 2ª fase (prova 005) e **cadernos de resolução** de Matemática e de LP | integral |
| `2021.1 EESP` | FGV 2021.1 | 1ª fase (provas 001–002 com gabarito), 2ª fase de Matemática, 2ª fase de LP e Redação, resolução de LP | integral |
| Edital Unificado FGV 1º/2027 | FGV | seção 11 (EESP): composição, pesos, cortes, vagas, desempate, calendário | seção 11 integral |
| `CONTEUDO_01_2027.pdf` | FGV | conteúdo programático oficial, incluindo **"Ciências da Natureza – Específica para FGV EESP"** | integral |
| Edital Insper 2027.1 | Insper | vagas, composição da prova, pesos por grupo de curso, notas de corte | integral (fonte espelhada, ver Limitações) |
| `INSP2601_306` | Insper 2027.1 | Anexo I – Conteúdos Programáticos da graduação | integral |

Origem dos pacotes da FGV: `vestibular.fgv.br/provas-gabaritos`, filtro *Economia – São Paulo*.
Os arquivos ficam em `provas/` e **não** entram no git (mesma regra da pasta de Medicina).

---

## 1. Sumário executivo

1. **A prova objetiva da FGV EESP e a da FGV Direito SP são o mesmo caderno.** O caderno do
   período 2 se identifica como "VESTIBULAR UNIFICADO FGV 2026.1", e as questões 1 e 2 de
   Matemática são exatamente as que o estudo de Direito descreveu (a fila em que a pessoa é a
   537ª de um lado e a 388ª do outro; a tabela 3×3 de progressões aritméticas). A redação
   também é a mesma — mesmo tema, mesmos textos de apoio. **A trilha de Economia herda o banco
   de Direito quase inteiro.**
2. **O que a Economia tem e a Direito não tem são duas provas: 8 discursivas de Matemática e 45
   objetivas de Ciências da Natureza.** São 45, não 15 — o edital lista Biologia, Química e
   Física como três provas de peso 1 cada, e cada uma tem 15 questões.
3. **Matemática vale 40% da nota final da FGV EESP**, somando a objetiva (10%) e a discursiva
   (30%). Em Direito, Matemática vale 10% e só o zero elimina. É a inversão completa da
   prioridade entre as duas trilhas, e é o que impede tratá-las como a mesma escola.
4. **A 2ª fase decide.** Ela pesa 6 contra 4 da 1ª fase, e o primeiro critério de desempate é a
   média da 2ª fase. Passam 600 candidatos para 185 vagas — a 1ª fase é filtro, a 2ª é a prova.
5. **A grade de correção da FGV pontua em faixas de 0/25/50/75/100** e é publicada com descrição
   literal do que cada faixa exige. As duas discursivas (Matemática e LP) usam o mesmo sistema.
6. **A grade pune resposta sem conta.** Em 2026.1, resposta correta sem cálculo vale 25% na
   questão 1 e **0%** na 2b. Quem treina "chutar o número e conferir" treina o que a banca
   zera.
7. **A Química da FGV é a mais jornalística das três Naturezas.** Oito das quinze questões de
   2026.1 abrem com manchete, e quatro trazem fonte datada — três delas de julho de 2025, a três
   meses da aplicação. Biologia e Física não fazem isso. É o que separa o banco de Natureza da
   FGV do banco de Medicina, calibrado em VUNESP e FUVEST.
8. **No Insper, a prova é a mesma para todos os cursos; o que muda é o peso.** Para Economia:
   Matemática 40%, Linguagens 25%, Humanas 25%, Natureza 10% — contra 20/40/30/10 de Direito. E
   a redação, que no Insper vale 25% da média final, é o item de maior peso unitário do processo.
9. **Inglês é a frente mais superestimada da trilha de Economia**: vale 5% na FGV EESP e não
   existe no Insper. Na trilha de Direito ela vale 10% na FGV e é 1 de 4 blocos.

---

## 2. Arquitetura das provas

### 2.1 FGV EESP — duas fases, dez provas

Estrutura confirmada no caderno de 2026.1 e no edital 1º/2027 (aplicação em 18 e 19/10/2026):

| Turno | Horário | Provas |
|---|---|---|
| 1 — dia 1 manhã | 3h30 (08:00–11:30) | **Redação** + **8 discursivas de Matemática** |
| 2 — dia 1 tarde | 3h30 (14:30–18:00) | **60 objetivas**: Matemática, Língua Portuguesa, Inglês, Ciências Humanas |
| 3 — dia 2 manhã | 3h30 (08:00–11:30) | **45 objetivas**: Biologia, Física, Química + **8 discursivas de Língua Portuguesa** |

A "2ª fase" da EESP não é um dia de prova separado: é a **correção** das três discursivas
(Matemática, Redação e LP), feita só para quem passa do corte da 1ª fase. Todo mundo escreve
tudo nos dois dias; só 600 têm o que escreveram lido.

**Pesos oficiais (edital 1º/2027):**

| 1ª fase — objetivas | Peso | | 2ª fase — discursivas | Peso |
|---|---|---|---|---|
| Matemática | **2** | | Matemática | **3** |
| Língua Portuguesa | 1 | | Redação | **2** |
| Inglês | 1 | | Língua Portuguesa | 1 |
| Ciências Humanas | 1 | | | |
| Biologia | 1 | | **Peso da fase** | **6** |
| Química | 1 | | | |
| Física | 1 | | | |
| **Peso da fase** | **4** | | | |

Desdobrando até a nota final (1ª fase 4/10, 2ª fase 6/10):

| Prova | Fatia da nota final |
|---|---:|
| **Matemática (as duas somadas)** | **40%** |
| Redação | 20% |
| Língua Portuguesa (as duas somadas) | 15% |
| Ciências da Natureza (Bio + Quím + Fís) | 15% |
| Ciências Humanas | 5% |
| Inglês | 5% |

**Cortes eliminatórios:** ausência ou **nota zero em qualquer prova** elimina; **menos de 20% de
acertos em qualquer uma das sete objetivas** elimina; **nota bruta abaixo de 2,0 em qualquer
discursiva da 2ª fase** elimina. Não há prova em que baste não zerar — a regra dos 20% vale para
Física do mesmo jeito que para Matemática.

**Desempate:** média da 2ª fase → média da 1ª fase → Matemática discursiva → Redação →
Matemática objetiva → LP discursiva → LP objetiva → Física → Química → Biologia → Humanas →
Inglês. Inglês é o último critério dos doze.

**Vagas:** 200 no total, sendo **185 pelo vestibular**, 4 pelo ENEM, 3 por Olimpíadas do
Conhecimento e 8 por exames internacionais. Passam **600** para a 2ª fase.

### 2.2 O caderno unificado — o que a Economia divide com a Direito

Esta é a descoberta que define o tamanho do trabalho. Comparando o caderno da EESP com o que o
estudo de Direito registrou do mesmo ciclo:

| Prova | FGV Direito SP | FGV EESP | Mesmo caderno? |
|---|---|---|---|
| Redação (dia 1 manhã) | 1 proposta, 20–30 linhas | idem, mesmo tema e mesmos textos | **sim** |
| Discursivas do dia 1 manhã | 8 de Ciências Humanas | **8 de Matemática** | não |
| 60 objetivas (dia 1 tarde) | Mat 1–15, LP 16–30, Inglês 31–45, CH 46–60 | idêntico | **sim** |
| Discursivas de LP (dia 2) | 8 questões | 8 questões, mesmos textos-base | **sim** |
| Resto do dia 2 | 5 de Artes e Questões Contemporâneas (3h) | **45 objetivas de Bio/Fís/Quím** (3h30) | não |
| 2ª fase própria | exame oral, peso 2 | não existe | — |

Evidências do "sim":

- O cabeçalho de todos os cadernos da EESP diz **VESTIBULAR UNIFICADO FGV 2026.1**.
- As questões 1 e 2 de Matemática batem com a descrição do estudo de Direito (a fila; a tabela
  3×3 de PA), e a ordem dos blocos é a mesma: Matemática, Língua Portuguesa, Inglês, Humanas.
- A redação de 2026.1 é a mesma pergunta binária sobre limites da liberdade de expressão, com a
  mesma charge da Folha de 29.jul.2025 e os mesmos textos de opinião de agosto de 2025 que o
  estudo de Direito catalogou.
- **A discursiva de LP confere questão a questão**: o estudo de Direito registrou, para 2026.1,
  cartum em q1 e q2, modo subjuntivo em q3, figura de linguagem reiterada em q4, transposição de
  voz em q5, sentido literal × figurado em q7 e referentes de pronome em q8 — que é exatamente o
  que está no caderno da EESP, na mesma ordem.

Consequência direta: **as 2.249 questões do banco de Direito valem para a 1ª fase de Economia
sem retrabalho**, e tudo o que os estudos anteriores dizem sobre os formatos de item da FGV — a
escada de asserções, o "most likely" do Inglês, os textos longos com 5 e 6 questões penduradas —
continua valendo palavra por palavra.

### 2.3 Insper — a mesma prova, outro peso

Um caderno de **60 objetivas** (15 por área, 5 alternativas) mais a redação, **5 horas**, saída
liberada após 3h. A prova é única para os oito cursos de graduação; o que muda por curso é o peso
de cada área e a nota de corte.

| Grupo de cursos | Linguagens | Matemática | Humanas | Natureza |
|---|---:|---:|---:|---:|
| **1. Administração e Ciências Econômicas** | **25%** | **40%** | **25%** | **10%** |
| 2. Engenharias | 20% | 40% | 10% | 30% |
| 3. Direito | 40% | 20% | 30% | 10% |
| 4. Ciência da Computação | 20% | 50% | 10% | 20% |

Média final: **MF = 0,75 × MPME + 0,25 × Redação**, com cada área pontuada de 0 a 100.

**Cortes (grupo 1):** menos de 30 em Linguagens, Matemática ou Humanas elimina; menos de **20**
em Natureza elimina; menos de **30 na Redação** elimina.

**Vagas em Ciências Econômicas:** 165 no total, sendo **116 pelo vestibular**, 25 pelo ENEM, 8 IB,
8 SAT e 8 pela Seleção Olímpica; mais 20 no programa Insper One.

Dois pontos que mudam o treino em relação à trilha de Direito: Matemática dobra de peso (20% →
40%) e Linguagens cai quase pela metade (40% → 25%). O corte de Natureza é o mais baixo da
tabela (20), mas existe — e o corte de 30 na redação é eliminatório antes de qualquer conta.

### 2.4 Comparação direta

| | FGV EESP | Insper (Economia) |
|---|---|---|
| Objetivas | **105** (60 + 45) | 60 |
| Discursivas de conteúdo | 16 (8 Matemática + 8 LP) | não há |
| Redação | 1, vale 20% da nota final | 1, vale 25% da média final |
| Inglês | 15 questões (5% da nota) | não existe |
| Ciências da Natureza | 45 questões (15%) | 15 questões (10%) |
| Peso de Matemática | **40%** | **40%** |
| Dias de prova | 2 | 1 |
| Vagas pelo vestibular | 185 | 116 |
| Corte por prova | < 20% de acertos elimina | < 30 (ou < 20 em Natureza) elimina |

O acordo entre as duas bancas no peso de Matemática — 40% em ambas — é o fato mais útil de todo
este estudo para montar o cronograma. Não há conflito de prioridade entre as duas escolas.

---

## 3. A prova que só existe aqui: Matemática discursiva

30% da nota final e o terceiro critério de desempate. É o item mais caro de produzir de todo o
projeto e o que justifica a trilha existir separada.

### 3.1 O formato mudou três vezes em cinco anos

| Ciclo | Formato da Matemática da 2ª fase |
|---|---|
| 2021.1 | **20 questões objetivas** — nenhuma discursiva |
| 2022.1 | **4 discursivas de resposta curta** (q9–q12), itens (a) e (b), 2 pontos por item, corrigidas por **lista de respostas aceitas** |
| 2023.1 | **8 discursivas**, com marcação explícita por subitem: *"Justifique a sua resposta"* (9 ocorrências) ou *"Basta fornecer a resposta"* (4) |
| 2025.1 e 2026.1 | **8 discursivas**, sem marcação no enunciado, corrigidas por **faixas de 0/25/50/75/100** |

O formato de 2025–2026 é o que vale para montar o banco. A marcação de 2023 sumiu do enunciado,
mas não do critério: a grade continua distinguindo quem mostrou o caminho de quem entregou só o
número (§3.3).

Detalhe de 2022 que interessa ao desenho do app: a correção listava as formas aceitas de cada
resposta — *"150, R$ 150,00, R$ 150, 150 reais, 150,00, 150.00, etc."*. A própria banca já
resolveu, e publicou, o problema de normalizar resposta digitada.

### 3.2 O que cai

Oito questões por ano, das quais seis com subitens (a)/(b) ou (a)/(b)/(c) em 2026.1.

**2026.1** — 1. progressão aritmética em série temporal de CO₂ · 2. média aritmética com remoção
de subconjunto · 3. sequência dos ímpares, soma N² e resto da divisão · 4. partição de posições
igualmente espaçadas (divisores) · 5. **curva de Lorenz e Índice de Gini**: reconhecer um arco de
circunferência numa equação, achar centro e raio, calcular área de setor · 6. interpolação: achar
o polinômio de 2º grau que coincide com o cosseno em três pontos · 7. recorrência com invariante
(combinação linear que não muda de etapa em etapa) · 8. probabilidade binomial em passeio
aleatório de saldo.

**2025.1** — alometria com regressão log-log (peso × frequência), operador diferença de polinômios
aplicado três vezes, recorrência de probabilidade, semelhança de triângulos com razão de áreas,
combinatória simples, lei dos cossenos com tangente do ângulo, densidade superficial como função.

**2023.1** — velocidade média comparada em dois trajetos, porcentagem com restrição de
divisibilidade, contagem por paridade, sequência recursiva (paridade de termos distantes),
**alíquota de imposto e reajuste de preço como função**, função definida como mínimo de duas
funções, probabilidade em chaveamento de torneio, razão entre áreas de segmentos de parábola.

Três leituras desse conjunto:

- **Sequências, recorrências e contagem são o miolo.** Aparecem em todos os anos, e quase sempre
  como o item mais difícil da prova.
- **A banca ancora uma questão por ano na identidade da escola**: Gini em 2026, alíquota de
  imposto em 2023, juros compostos em 2022. Não é decoração — é a questão que exige traduzir
  economia em modelo.
- **Aparece matemática que não está no programa da FGV Direito**: o operador diferença de 2025 e
  a interpolação polinomial de 2026 são itens de raciocínio abstrato, não de conteúdo de ensino
  médio aplicado. Não há cálculo diferencial, mas há a ideia de aproximação e de taxa de variação
  discreta.

### 3.3 Como é corrigida — a grade em faixas

A FGV publica, junto com a prova, a **resolução oficial** e a **grade de correção**. A grade é
percentual e descreve literalmente o que cada faixa exige. Duas linhas de 2026.1, que são o
critério mais importante deste estudo inteiro:

> **25% de acerto** — "…ou apresentou somente a resposta correta, sem cálculo algum ou indicação
> de raciocínio." *(questão 1)*
>
> **0% de acerto** — "Em branco ou totalmente incorreta, ou apresentou apenas a resposta, sem
> fazer cálculos, tampouco indicar o raciocínio utilizado." *(questão 2, parte B)*

Como as faixas se distribuem em 2026.1: questões **sem subitens** usam a escala cheia
(0/25/50/75/100); questões **com subitens** dividem os pontos entre as partes, e cada parte usa
0/25/50. A questão 5 (Gini) traz pontuação explícita por parte — 1 ponto, 1 ponto e 2 pontos.

O que a grade recompensa, em ordem: (1) equacionar o problema corretamente, mesmo sem terminar;
(2) terminar com erro de conta; (3) chegar ao número certo. Um erro de aritmética depois de um
raciocínio correto custa **um degrau** (75% em vez de 100%). Um número certo tirado do nada custa
**três degraus**.

A grade da **LP discursiva** usa as mesmas faixas, com um eixo a mais: *"sem desvio de redação"*
contra *"com algum desvio de redação"*. Conteúdo certo escrito com erro de português cai de 100%
para 75% — a gramática é cobrada dentro da questão de interpretação.

### 3.4 O que isso exige do banco de 150 questões

- **Distribuição sugerida**, espelhando a frequência observada em 2023–2026: sequências e
  recorrências 30 · probabilidade e contagem 30 · funções e álgebra 25 · geometria plana e
  analítica 25 · estatística e médias 15 · matemática financeira e porcentagem 15 · **modelagem
  econômica explícita 10** (Gini, alíquota, elasticidade, juros — a questão-assinatura da escola).
- **Dois terços com subitens (a)/(b)**, porque é a proporção real e porque a pontuação por parte
  é o que torna a autocorreção viável.
- **Cada questão precisa de três campos, não de um gabarito**: a resolução oficial (o caminho),
  a resposta final em formas aceitas (a lista que a própria FGV publicava em 2022) e as
  descrições de faixa, escritas no registro da banca — concretas, citando o erro típico
  ("errou o cálculo do número de anos, com boa aproximação"), não genéricas.
- **O item mais difícil de cada prova é abstrato.** Um banco só de situação-problema aplicada
  deixaria o aluno sem treino para o operador diferença e a interpolação. Reservar ~15 das 150
  para itens de raciocínio puro.

---

## 4. Ciências da Natureza — 45 questões que a trilha de Direito não tem

### 4.1 Estrutura

Blocos de 15, na ordem **Biologia (1–15) → Física (16–30) → Química (31–45)** em 2026.1. O
caderno de 2024.1 declara no cabeçalho: três provas de múltipla escolha, 15 questões em cada. A
estrutura está estável nos ciclos lidos.

O conteúdo programático oficial é publicado à parte, na seção **"Ciências da Natureza – Específica
para FGV EESP"** do `CONTEUDO_01_2027.pdf` — as outras provas (Matemática, LP, Inglês, História,
Geografia) têm programa comum com as demais escolas da FGV, e Artes é exclusiva do Direito.

### 4.2 Distribuição observada em 2026.1

**Biologia** — ecologia e ciclos biogeoquímicos (q1), fisiologia digestiva com leitura de
experimento (q2), relações ecológicas (q3), fisiologia vegetal (q4), fisiologia reprodutiva e
contracepção (q5), saneamento e saúde pública (q6), fisiologia do sangue (q7), microbiologia
(q8), genética (q9 e q12), especiação e hibridação (q10), parasitologia (q11), metabolismo
energético (q13), origem da vida (q14), anatomia comparada e evolução (q15).

**Física** — cinemática circular (q16), eletromagnetismo (q17), eletrostática (q18), ondulatória
(q19), óptica (q20, q28, q30), hidrostática (q21), dinâmica e atrito (q22), estática (q23),
foguete e quantidade de movimento (q24), física moderna (q25), termodinâmica (q26), física
nuclear (q27), energia e calorimetria (q29).

**Química** — aminas (q31), energia limpa (q32), tabela periódica com terras raras (q33),
ácido-base (q34), combustão (q35), polímeros (q36), propriedades dos materiais (q37), bioquímica
de alimentos (q38), reações e gases tóxicos (q39), eletroquímica (q40), química orgânica em
adoçantes (q41), cosméticos (q42), produtos naturais (q43), metalurgia e redox (q44).

### 4.3 Química é notícia; Biologia e Física, não

**Oito das quinze questões de Química de 2026.1 abrem com uma frase de manchete** — odor
corporal (q31), energia limpa (q32), terras raras (q33), bicarbonato (q34), hambúrguer vegetal
(q38), mistura de produtos de limpeza (q39), adoçante e risco de AVC (q41), creme viral (q42).
Dessas, **quatro trazem fonte jornalística datada**: O Globo de 16.11.2024 (q31), CNN Brasil
(q39), O Globo de 19.07.2025 (q41) e um post de Instagram (q42), os três últimos com acesso
registrado em 26/07/2025 — a três meses da aplicação. É a mesma janela de recência que os estudos
anteriores documentaram para Humanas e Linguagens na FGV.

Duas questões (q40 e q45) partem de um livro de divulgação em quadrinhos, e as cinco restantes
são de enunciado técnico convencional.

Biologia e Física seguem o padrão convencional — enunciado técnico, gráfico ou tabela, sem âncora
jornalística —, com uma exceção temática em Biologia: saúde pública e saneamento aparecem como
recorte de atualidade (q6, q11).

### 4.4 Quanto do banco existente serve

| Origem | Itens disponíveis | Utilidade |
|---|---:|---|
| Medicina — `biologia`, `quimica`, `fisica` | 650 | **alta em conteúdo, média em forma**: calibrados em VUNESP e FUVEST, sem a âncora de notícia da Química da FGV |
| Direito — `ciencias-natureza` (noções gerais) | 132 | **média**: escrita para os 10% do Insper, é rasa demais para um bloco de 15 questões com corte de 20% |

O trabalho real de Natureza não é escrever do zero: é **recalibrar**. Reescrever a Química com
âncora de notícia recente e subir o nível dos 132 itens de "noções gerais" para prova de 15
questões com corte eliminatório.

---

## 5. Insper Economia — o que muda em relação à trilha de Direito

O conteúdo programático do Insper (Anexo I) é **um só para a graduação inteira**: não há programa
por curso. A prova é a mesma. Logo, do lado do Insper, a trilha de Economia não precisa de
nenhuma questão nova — precisa de **outros pesos**.

| | Direito | Economia | Efeito no plano |
|---|---:|---:|---|
| Linguagens | 40% | 25% | perde prioridade |
| Matemática | 20% | **40%** | **dobra** |
| Humanas | 30% | 25% | quase igual |
| Natureza | 10% | 10% | igual |
| Redação | 25% da MF | 25% da MF | igual |

Tudo o que o estudo de Direito registrou sobre a Insper continua valendo: item de duas lacunas,
ausência de língua estrangeira, blocos de 15 em ordem fixa, fontes de até um mês antes da prova,
redação com duas propostas e a questão-tema copiada como título.

---

## 6. O que este estudo muda no plano de estudos

1. **Matemática vira a frente número um, com folga.** 40% na FGV e 40% no Insper. Na trilha de
   Direito ela era a penúltima prioridade; aqui é a primeira, e as duas bancas concordam.
2. **Metade do tempo de Matemática vai para escrever resolução, não para marcar alternativa.** A
   discursiva vale três vezes a objetiva na FGV. Treinar só objetiva é treinar 10% da nota com o
   método dos 40%.
3. **Redação sobe para o segundo lugar.** 20% da nota final da FGV EESP (o dobro do que vale em
   Direito) e 25% da média final do Insper, com corte eliminatório nas duas.
4. **Ciências da Natureza deixa de ser rodapé.** 45 questões na FGV, 15% da nota, com corte de
   20% de acertos em cada uma das três provas. Não existe "ignorar Física" nesta trilha.
5. **Inglês cai para o último lugar.** 5% na FGV e zero no Insper — e é o último dos doze
   critérios de desempate.
6. **Artes e a lista de obras saem.** A prova de Artes é exclusiva do Direito, e o edital não
   traz lista de leitura obrigatória para a EESP. A aba Obras não deve existir nesta trilha.
7. **Não há exame oral.** O que existe é a correção das discursivas para 600 candidatos.
8. **O aluno de Economia estuda a mesma 1ª fase que o de Direito.** Toda correção de questão do
   banco de Direito melhora as duas trilhas ao mesmo tempo — como já acontece entre Direito e
   Medicina na aba Buscar.

## 7. O que este estudo muda no app

- **A dissertativa de Matemática não pode ser um campo de resposta.** Pela grade da banca,
  resposta sem conta vale 0% a 25%. O campo principal é a **resolução**; a resposta final é um
  campo curto e conferível à parte.
- **A autoavaliação deixa de ser checklist e vira faixa** — 0/25/50/75/100, com as descrições da
  própria FGV. As dissertativas de Humanas e LP da trilha de Direito podem migrar para o mesmo
  sistema: a grade de LP da FGV usa exatamente essas faixas.
- **Resposta final errada deve travar a faixa máxima do item — só ela.** Travar "tudo acima de
  50%" seria errado, e a própria grade mostra por quê: a faixa de 75% da questão 1 de 2026.1
  descreve quem raciocinou certo e errou a conta, que é exatamente onde quem erra o número deve
  cair. A faixa máxima é a única que exige o número certo ("…e deu a resposta correta: 407"), e é
  a âncora objetiva que impede a autoavaliação otimista.
- **Subitens são a regra, não a exceção**: seis das oito questões de 2026.1 têm partes, com
  pontuação própria.
- **O simulado precisa de outro formato.** A 1ª fase da EESP são sete provas separadas, cada uma
  com corte de 20% — um simulado de caderno único não reproduz o modo como o candidato é
  eliminado.
- **A busca entre trilhas passa a ignorar uma trilha.** `app.js` carrega `outras[0]`, uma só; com
  três trilhas, uma delas some da busca sem erro visível.

---

## 8. Limitações

- **A grade de correção da Matemática discursiva de 2025.1 não pôde ser lida por extração de
  texto**: o PDF traz a resolução em caixas de fórmula que saem embaralhadas, e não há renderizador
  de página neste ambiente (`pdftoppm` ausente). O conteúdo das oito questões foi identificado;
  as faixas de 2025.1 não foram conferidas uma a uma e assume-se que sejam as mesmas de 2026.1,
  que estão íntegras.
- **O ciclo 2024.1 está incompleto**: o pacote público da EESP traz só o período 3 (Ciências e LP
  discursiva). A Matemática discursiva de 2024.1 não foi lida.
- **O edital do Insper foi lido em cópia espelhada.** O site do Insper responde 403 a cliente que
  não seja navegador. Os números de pesos, cortes e vagas devem ser reconferidos no PDF oficial
  antes de virarem configuração da trilha.
- **A classificação por tópico das 45 questões de Ciências é minha**, por conteúdo dominante, e
  pode divergir da classificação oficial da banca em itens de fronteira.
- **A afirmação de que o caderno objetivo é o mesmo entre Direito e EESP está apoiada em 2026.1**
  e em quatro evidências independentes (§2.2), das quais uma — a discursiva de LP — confere
  questão a questão. As 60 objetivas foram conferidas só nas duas primeiras: os cadernos de
  Direito não estão neste repositório, então a comparação item a item das 60 depende de baixá-los.
  Enquanto isso não for feito, o certo é dizer que **as duas provas coincidem em tudo o que foi
  possível cruzar**, e não que são bit a bit idênticas.
