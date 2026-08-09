# Plano: fazer o aluno achar o assunto que ele quer

**Objetivo.** O aluno digita a palavra que ele conhece — a do caderno da escola, a do sumário do
livro, a que o professor usou — e chega ao assunto certo, com um número na tela que diz se vale
a pena clicar.

**Medição.** Snapshot de 08/08/2026 12:55 — 4.332 questões indexadas nas duas trilhas, 163
assuntos em `vestibular-direito-v2/assuntos.js`. Todos os números abaixo saíram de rodar o motor
real da aba Buscar (`buscaSugerirAssuntos`, `buscarQuestoes`) fora do navegador.

Plano irmão: [PLANO-BANCO-PISO-25.md](PLANO-BANCO-PISO-25.md). A Fase 1 daqui é pré-requisito
da Fase 2 de lá — ver §4.

## Estado da execução (08/08/2026)

| Item | Estado |
|---|---|
| Auditor `auditar-busca.js` + fixture de currículo | **feito** — Fase 0 dos dois planos |
| D7, texto de apoio da trilha secundária | **corrigido** (`buscaTextoApoio`) — ver §1, D7 |
| F2 — radical no autocomplete | **feito** |
| F3 — consultar o `id` | **feito** |
| F1 — sinônimos e assuntos novos | em andamento por outra sessão |
| F4, F5, F6 | pendentes |

---

## 1. Diagnóstico

O motor de busca é bom: casa por palavra inteira, resolve plural, expande sinônimo, restringe
por frente, e monta o índice de 4.332 questões em ~250 ms. **O problema inteiro está na porta
de entrada** — o autocomplete que decide qual assunto oferecer.

### D1 — 12 termos de currículo não sugerem nada, e o banco tem centenas

Testados exatamente como um aluno digitaria. "Livre" é o que aparece ao digitar; "alcance" é o
que existe no banco pelo assunto que deveria ter sido sugerido:

| O aluno digita | Livre | Assunto que atenderia | Alcance real |
|---|---:|---|---:|
| Questões ambientais | 1 | Mudanças climáticas + Resíduos + Conservação | **199** |
| Interpretação de textos (inglês) | 0 | os 6 assuntos de leitura em inglês | **188** |
| Interpretação de textos (português) | 0 | Inferência + Tese + Coesão + Gêneros | **173** |
| Estruturas gramaticais | 1 | Gramática (inglês) | **118** |
| Economia mundial | 3 | Globalização + Comércio internacional | **104** |
| Climatologia | 1 | Clima e domínios naturais | **95** |
| Ácidos e bases | 1 | Ácidos, bases e pH | **89** |
| Geografia do Brasil | 0 | Regiões do Brasil + Política e economia | **84** |
| Calorimetria | 0 | Termologia e termodinâmica | **74** |
| Tempos verbais | 2 | Verbos: tempo, modo e vozes | **71** |
| Eletrodinâmica | 0 | Eletricidade e circuitos | **63** |
| História Contemporânea | 0 | Mundo pós-1991 + Movimentos sociais | **30** |

O aluno que digita "Calorimetria" vê zero resultados e nenhum chip. A conclusão dele é que o
banco não tem o assunto. O banco tem 74.

### D2 — o autocomplete não resolve plural; o motor de busca resolve

`buscaRadical` corta `-s`/`-es` na busca ([app.js:1858](vestibular-direito-v2/app.js:1858)), mas
`buscaSugerirAssuntos` compara as strings cruas ([app.js:1994](vestibular-direito-v2/app.js:1994)).
Duas rotas com regras diferentes para a mesma palavra:

| Digitado | Sugestões |
|---|---|
| Função | Função afim, Função quadrática, Exponencial e logaritmo |
| **Funções** | Funções da linguagem, Funções inorgânicas — **nenhuma de Matemática** |
| Guerras Mundiais | Guerras Mundiais |
| **Guerra Mundial** | *(nada)* |
| Matrizes | Matrizes |
| **Matriz** | Matrizes, Determinantes, Energia e recursos naturais |

### D3 — o `id` do assunto nunca é consultado

O matcher compara contra `nome` e `termos`, nunca contra `id`. Em **59 dos 163** o texto do id
não leva ao próprio assunto. Na maioria isso é inofensivo, mas em alguns o id É a palavra que o
aluno digita:

- `climatologia` → "Clima e domínios naturais" — o id está certo, o aluno digita certo, e não
  acha ([assuntos.js:506](vestibular-direito-v2/assuntos.js:506))
- `acidos-bases-ph` → "Ácidos, bases e pH"
- `microbiologia-imunologia`, `ondas-som`, `energia-trabalho`, `residuos-poluicao`

### D4 — o primeiro chip manda para a matéria errada

Os chips são ordenados por qualidade do casamento textual, sem nenhum sinal de área. Resultado:

| Digitado | 1º chip | Deveria ser |
|---|---|---|
| Funções | Funções da linguagem *[Linguagens]* | Matemática |
| Interpretação | Leitura de gráficos e tabelas *[Matemática]* | Linguagens |
| Energia | Energia e recursos naturais *[Humanas]* | C. Natureza |
| Gramática | Gramática (inglês) | gramática de português |
| Inferência | Inferência (inglês) | depende — os dois são plausíveis |

"Gramática" é o pior dos cinco porque **passa despercebido**: o chip entrega 118 questões, o
aluno estuda, e são todas de inglês.

### D5 — o chip não diz quanto entrega

`renderBuscaSugestoes` ([app.js:2214](vestibular-direito-v2/app.js:2214)) põe só o nome. Um chip
que leva a 3 questões é visualmente idêntico a um que leva a 188. São 7 assuntos abaixo de 10
questões hoje, e clicar num deles é a experiência que ensina o aluno a não confiar na busca:

Raciocínio lógico (1), Regulação e moderação de conteúdo (2), Ideia central em inglês (3),
Função quadrática (7), Imperialismo e partilha (7), Inclusão e exclusão digital (8),
América Latina (8).

O contraste é gritante ao lado das facetas de frente e formato, que **já** mostram contagem
([app.js:2271](vestibular-direito-v2/app.js:2271)) — a informação já existe no código, só não
chegou ao chip.

### D6 — a tela vazia não oferece nada para navegar

Sem consulta, a aba diz: *"Comece digitando acima. São 4.332 questões indexadas"*
([app.js:2329](vestibular-direito-v2/app.js:2329)). Os 163 assuntos existem, estão classificados
por área e por frente, e são invisíveis até que alguém acerte a palavra:

| Área | Assuntos |
|---|---:|
| Linguagens | 45 |
| Ciências da Natureza | 38 |
| Humanas | 35 |
| Matemática | 22 |
| Atualidades | 16 |
| Artes | 7 |

Isto é o mais caro dos seis defeitos, porque é o único que **exige adivinhação por parte do
aluno**. Os outros cinco falham depois que ele já teve a ideia certa.

### D7 — a busca indexava 10% do banco secundário sem o texto de apoio *(corrigido)*

Achado pelo auditor da Fase 0, e não pela leitura do código: `resolveSupportText` lê o global
`window.QUESTION_TEXTS`, que é sempre o da trilha **ativa** — `carregarSecundaria` devolve os
globais ao estado original depois de colher o banco da outra trilha, que é justamente o que
mantém "uma trilha por sessão" válido para o resto do app. Só que a busca é o único lugar que
mistura as duas.

Resultado: toda questão da trilha secundária com `textoId` entrava no índice **sem o texto
compartilhado** — 255 questões em Medicina, 180 em Direito. O estrago se concentrava em Inglês,
onde o texto de apoio *é* a questão:

| Assunto | Antes | Depois |
|---|---:|---:|
| Vocabulário em contexto (inglês) | 38 | 79 |
| Textos sobre trabalho e sociedade (inglês) | 69 | 110 |
| Detalhe explícito (inglês) | 22 | 48 |
| Gramática (inglês) | 97 | 118 |
| Propósito e tom (inglês) | 10 | 25 |

19 assuntos ganharam alcance e 3 cruzaram o piso de 25 só com isso. Não havia troca de texto,
só ausência: os ids das duas trilhas não colidem (`med-bio-t1` contra `ing-c01-t1`), então o
`[textoId]` dava `undefined`. `carregarSecundaria` já colhia `QUESTION_TEXTS` — só não estava
sendo repassado a `buscaConstruirIndice`.

---

## 2. As correções, em ordem de retorno

### F1 — sinônimos em `assuntos.js` (dado, sem código)

Fecha D1 e D3 e é o único item que também aumenta as contagens do plano do banco.

1. Os 12 da tabela D1, um a um.
2. **Varredura sistemática**, não caso a caso: para cada um dos 163 assuntos, acrescentar (a) o
   texto do próprio `id`, quando for palavra que se digita; (b) o nome alternativo de currículo
   escolar — "Calorimetria" para Termologia, "Eletrodinâmica" para Eletricidade e circuitos,
   "Climatologia" para Clima e domínios naturais; (c) o nome da subárea que o aluno usa e a
   banca não — "Zoologia", "Botânica" já existem, "Citologia" já existe.
3. Criar entrada nova onde não há assunto correspondente: **"Interpretação de textos"** não
   existe como assunto em nenhuma das duas trilhas, apesar de haver duas frentes inteiras
   chamadas `interpretacao-texto` (300 questões). Idem "Geografia do Brasil" e "Questões
   ambientais", que hoje são conceitos guarda-chuva sem porta de entrada.

Custo: dado puro, sem rebuild de bundle, sem migração. O comentário no topo de `assuntos.js` já
diz que é isso que o arquivo é para.

### F2 — usar o mesmo radical no autocomplete (D2)

Em `buscaSugerirAssuntos`, comparar `buscaRadical` do que foi digitado contra `buscaRadical` do
nome e dos termos, em vez das strings cruas. É a mesma função que o motor já usa; a divergência
entre as duas rotas é acidente, não decisão.

### F3 — consultar o `id` (D3)

Um degrau novo, de peso baixo, sobre `a.id.replace(/-/g, " ")`. Três linhas. Sozinho já resolve
`climatologia`, mas F1 é mais confiável porque não depende de o id ter sido bem escolhido.

### F4 — mostrar a área no chip e desempatar por tamanho (D4)

Duas mudanças pequenas em `renderBuscaSugestoes`:

- O chip passa a exibir a área — "Funções da linguagem · Linguagens" ao lado de "Função
  quadrática · Matemática". O aluno desambigua sozinho, que é mais honesto do que o app
  adivinhar a matéria dele.
- No desempate de peso igual, o assunto com mais questões vem primeiro. Hoje o desempate é
  alfabético (`localeCompare`), que é por que "Funções da linguagem" (13 questões) ganha de
  "Funções inorgânicas" (35).

Não resolve "Gramática", que precisa de F1: falta um assunto de gramática de português com esse
nome, ao lado do de inglês que já existe.

### F5 — contagem no chip (D5)

`buscaSugerirAssuntos` passa a devolver o total junto com o assunto, e o chip vira
"Citologia (98)". Duas consequências boas além da óbvia: o aluno para de clicar em beco sem
saída, e o buraco do banco fica visível na tela — que é o mesmo dado do
[plano do banco](PLANO-BANCO-PISO-25.md), agora em produção.

Custo real a medir: hoje a contagem por assunto exige rodar `buscaCandidatos` para todos os
`termos` dele. Para 6 chips por tecla, com debounce de 150 ms, provavelmente cabe; se não
couber, cachear por id na construção do índice.

### F6 — modo navegar na tela vazia (D6)

Substituir a frase de boas-vindas por um índice dos 163 assuntos, agrupado por área, cada um com
a contagem. Reusa `renderBuscaLinhaFiltro`, que já é a linguagem visual de filtro do app, e
reusa o clique que o chip já faz (`buscaAssuntoId = a.id`).

É a correção que muda a natureza da aba: de "adivinhe a palavra" para "escolha na lista". Também
é a que dá a maior chance de o aluno descobrir um assunto que ele não sabia que existia — que é
metade do que um aluno de vestibular precisa.

### F7 — fixture de regressão

Congelar a lista de ~80 termos de currículo usada nesta auditoria (as matérias e tópicos como um
professor os escreve, não como o banco os nomeia) em
`vestibular-direito-v2/fixtures/termos-curriculo.json`, e fazer o auditor exigir que cada um
resolva para um assunto com pelo menos 25 questões.

Sem isso, F1 é trabalho que se desfaz: um assunto novo entra sem sinônimo, e ninguém percebe até
alguém digitar a palavra.

---

## 3. Ordem de execução

| Fase | O que | Toca | Fecha |
|---|---|---|---|
| 1 | F1 — sinônimos e assuntos novos | `assuntos.js` | D1, D3 |
| 2 | F7 — fixture + auditor | arquivo novo | trava a Fase 1 |
| 3 | F2, F3, F5 — radical, id, contagem no chip | `app.js` | D2, D3, D5 |
| 4 | F4 — área no chip e desempate | `app.js` | D4 |
| 5 | F6 — modo navegar | `app.js` + `styles.css` | D6 |

A Fase 1 vem primeiro porque é dado, não código: não tem risco de regressão, não precisa de
rebuild e é ela que a Fase 2 do plano do banco espera.

Ao publicar qualquer mudança em `app.js` ou `styles.css`, **incrementar o `?v=` no
`index.html`** ([index.html:283](vestibular-direito-v2/index.html:283)) — está escrito lá em
caixa alta e continua valendo.

---

## 4. Relação com o plano do banco

F1 muda o número que o [PLANO-BANCO-PISO-25.md](PLANO-BANCO-PISO-25.md) mede. Um assunto que
sobe de 13 para 40 questões só por ganhar sinônimo não precisa de questão nova nenhuma.

Medido: dos 40 assuntos abaixo de 25, pelo menos 18 têm assinatura clara de problema de
vocabulário, e uma sonda manual nos outros mostrou o banco com 1,5× a 5× mais questões
candidatas do que o dicionário alcança — Hidrostática 13 contra ~63, Cartografia 19 contra ~72,
Zoologia 16 contra ~50.

**Por isso a Fase 1 daqui roda antes da Fase 2 de lá.** Escrever as 334 questões primeiro
produziria conteúdo redundante sobre temas que o banco já cobre.

---

## 5. Critérios de aceite

1. Cada um dos ~80 termos de currículo da fixture devolve um chip que leva a 25 ou mais questões.
2. Digitar o singular e o plural de um mesmo termo produz a mesma lista de chips.
3. Todo chip mostra a contagem, e nenhum chip com menos de 10 questões aparece sem que o número
   esteja visível.
4. Com o campo vazio, os 163 assuntos são alcançáveis em dois cliques, sem digitar nada.
5. Nenhum dos cinco casos de D4 continua abrindo com um chip de outra área em primeiro lugar,
   ou o chip diz de que área ele é.

---

## 6. O que este plano não resolve

- **Erro de digitação.** "estequiometia", "fotosintese" continuam devolvendo zero. Distância de
  edição é uma quinta camada de matching e não vale o custo enquanto os seis defeitos acima
  existirem.
- **Busca por questão específica** ("aquela da FUVEST sobre osmose") — o índice não guarda banca
  nem ano.
- **Assunto que não existe no dicionário** continua invisível, agora com o agravante de que o
  modo navegar dá a impressão de lista completa. A varredura da F1 §3 é o que segura isso, e
  precisa ser feita contra os editais, não contra o banco.
- **Não mexe no ranking dos resultados**, só no dos chips. A ordenação por peso de
  `buscaPontuar` continua como está.
