# Plano de alinhamento do banco de questões

Base: `estudo-anatomia-provas-fgv-insper-2025-2026.md` (leitura integral de 7 cadernos oficiais
FGV 2025.1/2026.1 e Insper 2026.1/2026.2 + Edital Unificado FGV 1º/2027).

Auditoria executada sobre `data/questions/*.json` (1.800 questões), `data/dissertativas.js` (45),
`data/redacoes.js` (15), `data/obras.js` (45), `data/priority-weights.js` e `schedule.js`.

---

## 1. Diagnóstico

### 1.1 Números da auditoria

| # | Achado | Medida | Alvo |
|---|---|---|---|
| G1 | Questões com 4 alternativas | **1.435 de 1.800 (80%)** | 0 |
| G2 | Gabarito na letra "e" | **72 (4%)** | ~360 (20%) |
| G3 | Questões de literatura brasileira | **≈0** (0 "soneto", 0 "eu lírico", 0 Drummond) | ver §3.1 |
| G4 | Textos de apoio compartilhados por 2+ questões | **0 de 1.800** | ver §3.2 |
| G5 | Comprimento médio do texto de apoio | **218 caracteres** | 1.200–3.000 nos blocos de leitura |
| G6 | Inglês com glosa de vocabulário `[tradução]` | **0 de 150** | ~100% |
| G6b | Inglês com enunciado em português | **36 de 150** | 0 |
| G6c | Inglês com comando de inferência (`most likely`) | **0 de 150** | ~85% |
| G7 | Matemática sem texto de apoio | **123 de 150 (82%)** | ≤10% |
| G8 | Escada I/II/III com o jogo fixo da FGV | **68 de 107**, em **85 ordenações diferentes** | 100%, ordenação única |
| G9 | Questões em sequência V/F | **0** | ~15 |
| G10 | Questões de duas lacunas ("respectivamente") | **13** | ~40 |
| G11 | Questões com fonte visual (imagem) | **0** — o schema não tem campo | ver §3.6 |
| G12 | Dissertativas com comando bipartido a)/b) | **0 de 45** | 15 de 15 em Humanas |
| G12b | Dissertativas com contagem explícita no comando | **9 de 45** | ~50% dos subitens |
| G13 | Redações no formato de comando da FGV | **0 de 15** | 15 |
| G13b | Redações com 3+ textos de apoio | **0 de 15** | ≥8 |

### 1.2 Estado por arquivo (alternativas)

| Arquivo | Total | 4 alt | 5 alt |
|---|---:|---:|---:|
| geografia | 150 | 0 | **150** |
| historia-brasil | 100 | 0 | **100** |
| historia-geral | 100 | 0 | **100** |
| atualidades-geopolitica | 150 | 135 | 15 |
| gramatica | 150 | 150 | 0 |
| ingles | 150 | 150 | 0 |
| interpretacao-texto | 150 | 150 | 0 |
| matematica-rlm | 150 | 150 | 0 |
| artes-cultura | 100 | 100 | 0 |
| atualidades-meioambiente | 100 | 100 | 0 |
| atualidades-politica | 100 | 100 | 0 |
| atualidades-tecnologia | 100 | 100 | 0 |
| ciencias-natureza | 100 | 100 | 0 |
| direitos-humanos | 100 | 100 | 0 |
| filosofia-sociologia | 100 | 100 | 0 |

A conversão para cinco alternativas parou em 20% do banco. Os scripts `expand-to-five.ps1`,
`add-fifth.ps1` e `rebalance-answers.ps1` existem e os arquivos já convertidos têm boa qualidade
(a quinta alternativa é plausível, não é enchimento) — é trabalho interrompido, não trabalho a
projetar do zero.

### 1.3 Leitura do diagnóstico

Três problemas são de **conformidade mecânica** e têm solução conhecida: número de alternativas,
distribuição de gabarito e ordenação da escada de asserções. Custam volume, não invenção.

Quatro problemas são **estruturais** e exigem mudar o schema antes de produzir conteúdo:
agrupamento de questões por texto (G4), textos longos (G5), fontes visuais (G11) e comando
bipartido nas discursivas (G12).

Dois problemas são **de conteúdo faltante**: literatura brasileira (G3) e o padrão real de
Inglês (G6). São os que mais separam o banco atual da prova real.

E um é **de calibragem**: os pesos de `priority-weights.js` foram derivados dos estudos
anteriores, que não tinham o edital de 2027 em mãos.

---

## 2. Prioridade das mudanças

A ordem abaixo é por **retorno na nota real**, cruzando o tamanho do desvio com o peso oficial da
prova. Não é por facilidade.

| Fase | O que | Por quê |
|---|---|---|
| **P0** | Schema: clusters de texto, campo de imagem, comando bipartido | Bloqueia P1 e P2 — mudar depois obriga a reescrever conteúdo já produzido |
| **P1** | Literatura brasileira (nova frente) · Inglês refeito · Matemática contextualizada | Maior desvio × maior peso |
| **P2** | Conversão para 5 alternativas · rebalanceamento de gabarito · escada fixa · formatos V/F e duas lacunas | Volume mecânico, alto impacto em fidelidade |
| **P3** | Discursivas a)/b) · redação no formato FGV · Artes teoria+obra · Macbeth em obras.js | Peso alto na FGV, mas base atual é aproveitável |
| **P4** | Pesos, simulado em blocos de 15, rotina de atualidades | Calibragem do plano de estudo, não do conteúdo |

---

## 3. P0 — mudanças de schema

Fazer isto **antes** de produzir qualquer questão nova. São quatro campos.

### 3.1 Cluster de texto (resolve G4 e G5)

Hoje cada questão carrega seu próprio `texto_apoio`, e nenhum texto é compartilhado. A prova real
faz o oposto: na FGV 2026.1, um romance sustentou 6 questões, um artigo de opinião sustentou 5,
e os cinco textos de Inglês sustentaram 2 a 4 cada. Isso não é detalhe de apresentação — é o que
cria o risco concentrado ("ler mal um texto custa 6 questões") que o candidato precisa treinar.

Proposta: introduzir uma coleção `textos` no mesmo arquivo, e referenciá-la por id.

```json
{
  "subtopic": "literatura",
  "textos": [
    {
      "id": "txt-cortico-01",
      "fonte": "Aluísio Azevedo, O Cortiço",
      "conteudo": "…trecho longo, 1.500 a 3.000 caracteres…",
      "glossario": []
    }
  ],
  "questoes": [
    { "id": "literatura-01", "textoId": "txt-cortico-01", "enunciado": "…" }
  ]
}
```

`texto_apoio` continua válido para questões avulsas — o carregador tenta `textoId` primeiro e cai
para `texto_apoio`. Nenhuma questão existente quebra.

No app: quando várias questões consecutivas apontam para o mesmo `textoId`, renderizar o texto
uma vez no topo do bloco e mantê-lo fixo enquanto o usuário percorre as questões daquele grupo.

### 3.2 Campo de fonte visual (resolve G11)

Nenhuma das 1.800 questões tem imagem, e ambas as bancas usam muito: só na FGV 2026.1 há tirinha,
obra de Maxwell Alexandre, gravura de Carlos Julião, charge de 1970, desenho do IHGB, gráfico do
IBGE, fotografias e um monumento. Na Insper, tirinhas de Instagram, mapas do IBGE, heredograma e
esquemas.

Adicionar aos objetos de texto e de questão:

```json
"visual": { "tipo": "charge|tirinha|mapa|grafico|obra|esquema|foto",
            "arquivo": "assets/visuais/…svg|png",
            "descricao": "descrição textual usada como fallback e como acessibilidade" }
```

O `descricao` não é opcional. Enquanto não houver a imagem, a questão funciona com a descrição —
o que já permite treinar o raciocínio, mesmo perdendo a leitura visual.

### 3.3 Comando bipartido nas dissertativas (resolve G12)

A discursiva de Humanas da FGV é **100% a)/b)** nos dois anos, e cerca de metade dos subitens pede
um número explícito de elementos. Isso é uma rubrica exposta: a correção conta itens.

```json
{
  "id": "dissert-humanas-01",
  "area": "Humanas",
  "disciplina": "Historia",
  "itens": [
    { "letra": "a", "comando": "…", "quantidadeExigida": 2,
      "pontosEsperados": ["…", "…"] },
    { "letra": "b", "comando": "…", "quantidadeExigida": null,
      "pontosEsperados": ["…"] }
  ]
}
```

Com `quantidadeExigida` preenchido, o app pode cobrar do usuário exatamente aquele número de
pontos na autocorreção — que é como a banca pontua.

### 3.4 Campo de formato do item

Para permitir treino dirigido por formato (e medir cobertura):

```json
"formato": "direta | escada | vf | excecao | lacunas"
```

Preencher retroativamente por regex nos 1.800 itens é trivial e já foi feito na auditoria.

---

## 4. P1 — os três desvios de conteúdo mais caros

### 4.1 Literatura brasileira — frente nova (G3)

**O problema.** Na FGV 2026.1, **nove das quinze** questões objetivas de Português vieram de dois
romances do século XIX. Três delas cobravam História e teoria literária disfarçadas de
interpretação: o grupo social das personagens numa sociedade escravista, a leitura do meio social
como trânsito entre ordem e desordem, o determinismo geográfico no Naturalismo. Na Insper, os dois
cadernos trazem soneto, conto e poema modernista, mais um item explícito de identificação de
escola literária em cada.

O banco tem **zero** questões com "soneto" ou "eu lírico", zero de Drummond, zero de *Memórias de
um sargento de milícias*, e cinco menções soltas a Machado de Assis. Não existe frente
`literatura`. Este é o maior buraco do projeto.

**A mudança.**

1. Criar `data/questions/literatura.json` e registrar a frente em `subtopics.js` (área
   Linguagens) e em `priority-weights.js` com peso **3**.
2. Meta de 150 questões, organizadas em **clusters** (§3.1), porque é assim que caem:

| Cluster | Questões | Justificativa |
|---|---:|---|
| *O Cortiço* — Naturalismo, animalização, determinismo | 12 (2 clusters de 6) | caiu em 2026.1 |
| *Memórias de um sargento de milícias* — ordem e desordem, ironia do narrador, sociedade escravista | 12 (2 clusters de 6) | caiu em 2026.1 |
| Machado de Assis — narrador, ironia, *Memórias Póstumas* | 15 | está em `obras.js` e é canônico nas duas bancas |
| Poesia: soneto parnasiano, poema modernista, análise de eu lírico | 25 | Insper usa em todos os cadernos |
| Conto brasileiro (Drummond, Clarice) | 15 | Insper 2026.1 |
| Identificação de escola pelo traço (não pelo nome) | 20 | formato observado nas duas bancas |
| Modernismo: *Vidas Secas*, *Manifesto Antropófago* | 15 | estão na lista de obras e caíram em Artes |
| Literatura + História (grupo social, contexto de produção) | 20 | os três itens "vazados" de 2026.1 |
| Literatura portuguesa e africana em língua portuguesa | 16 | consta do conteúdo programático Insper 2027.1 |

3. Regra de ouro dos enunciados: **nunca pedir ficha técnica.** Pedir reconhecimento de traço,
   função do narrador, efeito de sentido e vínculo com o contexto — que é o que as duas bancas
   cobram.

### 4.2 Inglês — reescrever os 150 itens (G6)

**O problema.** O bloco atual não se parece com a prova. Medidas: textos de 324 caracteres em
média (a FGV usa artigos de 4 a 6 parágrafos), **zero** glosas de vocabulário, 36 enunciados
escritos em português, **zero** ocorrências de `most likely` — contra 13 em 15 na prova real — e
comandos de recuperação literal ("De acordo com o texto, qual é a principal crítica…") onde a FGV
pede inferência.

**A mudança.** Refazer o bloco inteiro sob quatro regras:

1. **Cinco textos por conjunto, 2 a 4 questões cada** (§3.1). Fontes no perfil observado:
   *The Economist*, *Foreign Affairs*, *The Washington Post*, divulgação científica. Temas:
   política econômica internacional, autoritarismo, comércio, ciência.
2. **Glosar o vocabulário difícil entre colchetes, em português, dentro do texto.** A banca faz
   isso deliberadamente para remover vocabulário como variável. Sem a glosa, o item testa a coisa
   errada. Campo `glossario` no objeto de texto.
3. **Enunciados sempre em inglês**, e ~85% deles com `most likely`.
4. **Distribuição de tipos de item** copiada da prova:

| Tipo | Alvo em 15 |
|---|---:|
| Inferência do que o texto sustenta | 6–7 |
| Referência de trecho ("this perception", "that exemption") | 3 |
| Função/propósito de um parágrafo | 2 |
| Item de exceção (`supports all of the following except`) | 2 |
| Detalhe explícito | 1 |

Zero itens de gramática, tradução ou vocabulário fora de contexto — a prova não tem nenhum.

### 4.3 Matemática — contextualizar (G7)

**O problema.** 123 das 150 questões não têm texto de apoio e o enunciado é cálculo puro
("Um produto custava R$ 250,00 e sofreu um aumento de 12%. Qual é o novo preço?"). Na FGV, **toda**
questão embrulha o conteúdo numa narrativa. Na Insper, numa regra ou processo explícito.

**A mudança.** Não é trocar o conteúdo, é trocar o embrulho. Reescrever os enunciados dos 123
itens em dois estilos, marcados por um campo `banca: "fgv" | "insper"`:

- **Estilo FGV** (~75 itens): situação social ou econômica curta — divisão de custos, carteira de
  investimento, torneio, avaliação em plataformas, preço sazonal. O trabalho cognitivo é traduzir
  a história em modelo.
- **Estilo Insper** (~75 itens): processo com regra explícita — uma função que transforma dígitos
  por iteração, restrição de adjacência, duas máquinas com produção em progressão até se cruzarem.
  A regra é dada; o trabalho é executá-la corretamente.

Redistribuir também o conteúdo para o perfil observado: geometria plana e espacial é o maior bloco
nas duas bancas (3 de 15 na FGV, 5 a 6 de 15 na Insper), seguida de contagem e probabilidade.

---

## 5. P2 — conformidade de formato

### 5.1 Cinco alternativas (G1)

1.435 questões a converter. Os arquivos já convertidos mostram o padrão de qualidade a manter: a
quinta alternativa precisa ser um distrator plausível, não enchimento.

Ordem sugerida, por peso: `interpretacao-texto` (150) → `gramatica` (150) → `ingles` (150, junto
com §4.2) → `matematica-rlm` (150, junto com §4.3) → `atualidades-geopolitica` (135) →
`filosofia-sociologia` (100) → `artes-cultura` (100) → `direitos-humanos` (100) →
`atualidades-*` (300) → `ciencias-natureza` (100).

Reaproveitar `expand-to-five.ps1` e registrar cada lote em `data/reescritas/`, como já vem sendo
feito.

### 5.2 Rebalanceamento de gabarito (G2)

Hoje: a=436, b=435, c=429, d=428, **e=72**. Depois da conversão, rodar `rebalance-answers.ps1`
para chegar a ~20% por letra em cada arquivo, não só no total — um arquivo com gabarito enviesado
ensina o hábito errado.

### 5.3 Escada de asserções no jogo fixo da FGV (G8)

Achado que a auditoria isolou: das 107 questões com o comando "Está correto o que se afirma em",
só 68 usam o conjunto de alternativas da FGV, e elas aparecem em **85 ordenações diferentes**. As
39 restantes oferecem opções que a FGV nunca oferece (por exemplo "III, apenas").

A FGV usa sempre este conjunto, **nesta ordem**:

```
(A) I, apenas.        (B) I e II, apenas.     (C) II e III, apenas.
(D) I e III, apenas.  (E) I, II e III.
```

Isso importa porque o jogo é assimétrico: a asserção I aparece em quatro das cinco opções. Se I é
falsa, a resposta é obrigatoriamente (C) — sem julgar II nem III. Julgar I primeiro é sempre a
jogada de maior retorno, e um terço do bloco de Humanas se resolve com duas decisões em vez de
três. **Com as alternativas embaralhadas, essa heurística não é treinável.**

Mudança: normalizar as 107 questões para o conjunto e a ordem acima, ajustando o gabarito de cada
uma. Script novo, `normalize-escada.ps1`. Como efeito colateral o gabarito dessas questões passa a
ser enviesado para (C) e (E) — logo, rodar §5.2 **depois** desta etapa, e excluir as questões de
escada do rebalanceamento (o viés é da banca, não um defeito).

Meta de volume: 107 → ~150 questões de escada, concentradas em Geografia, História e Atualidades,
que é onde a FGV as usa (5 de 15 no bloco de Humanas).

### 5.4 Formatos ausentes (G9, G10)

| Formato | Hoje | Alvo | Onde |
|---|---:|---:|---|
| Sequência V/F | 0 | ~15 | Humanas — FGV usa (2026.1 q48) |
| Duas lacunas ("respectivamente") | 13 | ~40 | Ciências da Natureza, Geografia, Biologia — assinatura da Insper |
| Item de exceção | 86 | manter | já bem representado |

No item de duas lacunas, o distrator típico **acerta o primeiro elemento e erra o segundo** —
marcar pelo primeiro é a armadilha desenhada. Os 40 itens novos devem seguir essa regra
explicitamente.

---

## 6. P3 — discursivas, redação e artes

### 6.1 Dissertativas de Humanas (G12)

Reescrever as 15 no formato observado, que é rígido:

```
[imagem ou documento: gravura, fotografia, monumento, jornal de época, gráfico do IBGE]
[parágrafo de contextualização, 3 a 6 linhas, com fonte e data]
a) comando enumerativo, normalmente com número explícito
b) comando explicativo — "explique", "caracterize", "relacione"
```

Manter a divisão observada nos dois anos: **4 de História, 4 de Geografia** por conjunto. Priorizar
o par temático mais repetido — processo histórico + ponte para o presente (foto de 1938 e
propaganda esportiva; Tio Sam de 1942 ao lado da campanha de 2024; colonialismo português
articulado à Guerra Fria). E manter Geografia **temática, não regional**: globalização,
sustentabilidade, transição demográfica, recursos hídricos, blocos econômicos.

### 6.2 Dissertativas de Linguagens

As 15 atuais são de argumentação genérica sobre linguagem. A prova real tem um banco de itens
pequeno e **repetido nos dois anos** — cinco tipos voltaram:

| Tipo de item | Alvo em 8 |
|---|---:|
| Interpretação de cartum (sempre os dois primeiros itens) | 2 |
| Transposição de voz verbal (ativa ↔ passiva) | 1 |
| "Figura de linguagem empregada de forma reiterada — qual é? Justifique" | 1 |
| Função sintática ou referente de pronome | 1 |
| Reescrita mantendo o sentido (troca de conector, registro) | 1 |
| Efeito de sentido de modo/tempo verbal, gênero textual ou radicais | 2 |

Todo item pede justificativa — identificar sem justificar não pontua. É o bloco mais treinável da
FGV e vale **peso 2**. Depende do campo de imagem (§3.2) para os dois itens de cartum.

### 6.3 Redação (G13)

Quatro correções, todas verificadas contra os cadernos:

1. **Comando.** Trocar "redija um texto dissertativo-argumentativo… defendendo um ponto de vista
   sobre…" (fraseado de ENEM/Vunesp) por "redija uma dissertação em prosa sobre o tema: **[tema]**",
   que é o comando literal da FGV nos dois anos.
2. **Tema como pergunta binária.** Em 2026.1 o tema foi "A liberdade de expressão é absoluta ou
   deve ter limites?"; em 2025.1, "prós e contras". Os dois obrigam a tomar posição e refutar a
   contrária. Reescrever os 15 temas nesse molde.
3. **Textos de apoio antagônicos, 3 a 4.** Hoje são 2 textos sintéticos e concordantes. Na prova,
   o Texto 3 e o Texto 4 de 2026.1 defendem teses opostas sobre o mesmo caso, publicados no mesmo
   jornal na mesma data. A banca não entrega uma tese, entrega o litígio. Incluir uma charge em
   pelo menos metade das propostas (§3.2).
4. **Ancorar em caso concreto.** 2026.1 partiu de uma condenação judicial real. Ao menos metade
   dos temas deve partir de um caso, não de um conceito abstrato.

Manter o que já está certo: 20 a 30 linhas, sem proposta de intervenção, e a grade de três
quesitos. O comentário no topo de `redacoes.js` sobre não usar a grade do ENEM está correto e deve
permanecer.

### 6.4 Artes e Questões Contemporâneas (G14)

**A mudança mais importante desta seção**: entre 2025.1 e 2026.1 a prova deixou de ser história da
arte e virou **teoria política e jurídica aplicada a obras**. Em 2026.1 as cinco questões têm a
mesma forma — um excerto teórico denso (Sueli Carneiro, Antonio Candido, Vattimo/McIntyre,
Scheppele, ou um texto legal) mais uma obra da lista, e o comando é sempre de posicionamento. Os
cinco temas eram jurídico-políticos: raça e classe, consciência do subdesenvolvimento, internação
involuntária e autonomia, verdade e democracia, legalidade formal contra legitimidade.

As 15 dissertativas de Artes atuais são majoritariamente história da arte e debates culturais
genéricos. Algumas já acertam o formato (Arendt, interseccionalidade, *Cabra Marcado para Morrer*).

Mudanças:

1. Reescrever ao menos 10 das 15 no formato `[excerto teórico] + [obra da lista] → posicionamento`.
2. Adicionar **Macbeth** a `data/obras.js` — foi usada na FGV 2026.1 e não está na lista das 45.
3. Conferir a lista inteira contra o conteúdo programático do ciclo 2027, como o próprio comentário
   no topo de `obras.js` já recomenda.

---

## 7. P4 — calibragem do plano de estudo

### 7.1 Pesos (`priority-weights.js`)

Os pesos atuais vieram dos estudos anteriores, sem o edital de 2027. Ele muda duas coisas.

**Matemática vale peso 1 e só nota zero elimina.** Nas outras seis provas, nota bruta abaixo de
3,0 elimina. Matemática é ainda o penúltimo critério de desempate. O peso 3 atual está alto para
quem mira FGV — mas Matemática vale 20% na Insper e é mais mecânica lá. Isso não se resolve com um
número só: **o peso precisa depender da banca-alvo do usuário**.

| Frente | Peso hoje | FGV | Insper | Observação |
|---|---:|---:|---:|---|
| interpretacao-texto | 3 | 3 | 3 | mantém |
| gramatica | 3 | 3 | 3 | mantém |
| **literatura** (nova) | — | **3** | **3** | 9/15 do Português da FGV; presente em todo caderno Insper |
| ingles | 3 | **3** | **0** | não existe na Insper |
| matematica-rlm | 3 | **1.5** | **3** | peso 1 e só zero elimina na FGV; 20% na Insper |
| geografia | 3 | 3 | 3 | mantém |
| atualidades-geopolitica | 3 | 3 | 2 | mantém |
| historia-brasil / historia-geral | 2 | 2 | 2.5 | Insper: 5 fixas por caderno |
| filosofia-sociologia | 1.5 | 0.5 | **2.5** | 4 fixas na Insper, sempre as últimas do bloco |
| artes-cultura | 1.5 | **2.5** | 0.5 | discursiva fixa todo ano na FGV, peso 1 + é a prova que mais mudou |
| ciencias-natureza | 0.5 | **0** | 1.5 | inexistente na FGV; 15 questões na Insper |
| atualidades-* (demais) | 2 | 2 | 2 | mantém |

Proposta de implementação: transformar `PRIORITY_WEIGHTS` em `{ fgv: {...}, insper: {...} }` e
combinar conforme a meta do usuário, com uma opção "as duas" que tira o máximo de cada frente.

**Falta uma frente para Português discursivo.** Vale peso 2 na FGV — o dobro de qualquer objetiva
— e é o segundo critério de desempate, logo depois da média da primeira fase. Hoje ela só existe
dentro de `dissertativas.js`, sem peso próprio no agendamento. É o melhor retorno por hora de toda
a prova e não aparece no cálculo do plano.

### 7.2 Formato do simulado (`schedule.js`)

Hoje: `SIMULADO_TOTAL_QUESTIONS = 45`, distribuídas proporcionalmente ao peso entre as 15 frentes.
A prova real: **60 questões em quatro blocos fixos de 15**, em ordem.

| | FGV | Insper |
|---|---|---|
| Bloco 1 | Matemática | Linguagens (Português e Literaturas) |
| Bloco 2 | Língua Portuguesa | Matemática |
| Bloco 3 | Inglês | Ciências Humanas |
| Bloco 4 | Ciências Humanas | Ciências da Natureza |
| Tempo | 3h30 (~3,5 min/questão) | 5h com redação (~4 min/questão) |

Proposta: manter o simulado de 45 como treino adaptativo semanal, e **acrescentar um modo
"simulado oficial"** com 60 questões nos blocos e na ordem reais, cronômetro por bloco, para os
domingos de marco (a cada quatro semanas). Sem isso não se treina gestão de tempo por bloco, que é
metade da prova.

Na Insper, respeitar a composição fixa observada nos dois cadernos: Ciências da Natureza é sempre
Biologia 46–50, Química 51–55, Física 56–60. E em Humanas, História 5, Geografia 6, Sociologia 3,
Filosofia 1 — as quatro últimas sempre de Filosofia e Sociologia.

### 7.3 Rotina de atualidades

O estudo mediu a janela entre a fonte mais recente e o fechamento do caderno: a Insper 2026.2 usou
quatro fontes de janeiro e fevereiro de 2026, e a FGV 2026.1 usou texto de 11 de agosto de 2025.
São semanas, não meses.

O banco não tem mecanismo de renovação: as quatro frentes de atualidades somam 450 questões
estáticas. Proposta: marcar cada questão de atualidades com `validoAte` e criar um lote trimestral
de 30 a 40 questões novas a partir das fontes que as bancas de fato usam — para a Insper,
*Le Monde Diplomatique Brasil*, *Nexo*, g1, *Veja*, *Estadão* e perfis de cartunistas; para a FGV,
*Folha*, *Estadão*, *The Economist*, *Foreign Affairs* e livros acadêmicos do ano corrente.

---

## 8. Ordem de execução e critérios de aceite

| Passo | Entrega | Aceite verificável |
|---|---|---|
| 1 | Schema (§3) | carregador aceita `textoId`, `visual`, `itens[]`, `formato`; 1.800 questões antigas continuam carregando |
| 2 | `formato` preenchido retroativamente | 0 questões sem `formato` |
| 3 | `normalize-escada.ps1` (§5.3) | 107/107 com o conjunto e a ordem da FGV |
| 4 | `literatura.json` (§4.1) | 150 questões, ≥8 clusters de 5+ questões |
| 5 | Inglês refeito (§4.2) | 0 enunciados em português; ≥85% com `most likely`; ≥90% dos textos com glossário; textos ≥1.200 chars |
| 6 | Matemática recontextualizada (§4.3) | ≤15 questões sem contexto; campo `banca` em 100% |
| 7 | Conversão para 5 alternativas (§5.1) | 0 questões com 4 alternativas |
| 8 | Rebalanceamento (§5.2) | cada arquivo entre 17% e 23% por letra, excluídas as de escada |
| 9 | V/F e duas lacunas (§5.4) | ≥15 V/F, ≥40 duas lacunas |
| 10 | Dissertativas e redação (§6) | 15/15 Humanas com a)/b); ≥8 subitens com `quantidadeExigida`; 15/15 redações no comando FGV |
| 11 | Artes + Macbeth (§6.4) | ≥10 no formato teoria+obra; 46 obras |
| 12 | Pesos e simulado (§7) | pesos por banca; modo simulado oficial de 60 em 4 blocos |
| 13 | `build-bundle` e verificação no navegador | bundle regenerado, app carrega sem erro de console |

Os passos 4, 5 e 6 são independentes entre si e podem correr em paralelo depois do passo 1.
Os passos 7 e 8 precisam vir **depois** do 3, ou o rebalanceamento desfaz a normalização da escada.

---

## 9. O que este plano não resolve

- **O caderno objetivo da FGV 2025.1 não foi lido** (PDF escaneado, sem OCR neste ambiente). Todas
  as metas de distribuição por conteúdo da objetiva da FGV vêm de um único ano, 2026.1. As
  proporções (por exemplo "9 de 15 em literatura") devem ser tratadas como direção, não como
  gabarito fixo de montagem. Se aparecer OCR ou um caderno de 2027, revalidar §4.1 e §5.3.
- **A redação da Insper não estava nos cadernos analisados** — as mudanças de §6.3 foram derivadas
  só da FGV.
- **Os pesos por bloco da Insper** (Linguagens 40%, Humanas 30%, Matemática 20%, Natureza 10%)
  vêm do estudo anterior, não de leitura direta do edital vigente. A tabela de §7.1 depende deles;
  conferir antes de aplicar.
- **Volume.** Somando P1 e P2, são cerca de 1.435 conversões, 150 questões novas de literatura,
  150 de inglês refeitas e 123 de matemática reescritas. É trabalho de vários lotes, e o plano está
  ordenado para que cada lote entregue valor sozinho.
