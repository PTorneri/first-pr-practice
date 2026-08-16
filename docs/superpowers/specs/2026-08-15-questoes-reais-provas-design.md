# Recuperação das questões reais das provas

**Data:** 2026-08-15
**Estado:** aprovado, em execução (fase 1)

## O problema

As pastas `vestibular-*/provas/` guardam os cadernos reais de nove bancas. Uma
passada anterior extraiu essas provas aplicando um filtro de **risco autoral**:
aprovava só a questão que não dependia de texto ou imagem de terceiro
identificável, e **descartava o resto sem transcrever**. O banco ficou com 865
questões reais e ~950 no chão.

O dono do produto assumiu formalmente o risco de usar texto e imagem de
terceiros. Isso libera o material descartado.

## O que existe

Banco atual: 6.518 questões, das quais 865 têm campo `banca` — FGV 332,
Einstein 148, Unesp 108, Insper 81, Unicamp 52, Unifesp 52, Fuvest 42,
Santa Casa 40, outras 10.

| Fonte | Fora do banco | Estado do material |
|---|---|---|
| Medicina — 7 bancas | ~594 | só contadas nos `questoes-reais-*-STAGING.md`, **não transcritas** |
| FGV Unificado 2024.1–2026.1 | 113 | transcritas em `*-EXCLUIDAS-STAGING.md` com comando, alternativas e gabarito; **falta o texto de apoio** |
| FGV Unificado 2021.1, 2022.1, 2023.1 | ~250–300 | **nunca mineradas** — não aparecem em nenhum staging. 2023.1 **feito** (30 questões) |
| Insper 2026.1 (+ v.2) e 2026.2 | 91+ | destravado em 15/08/2026: os cadernos e gabaritos chegaram em `fgv e insper/`. O caderno "v.2" não aparece em staging nenhum e pode render questão inédita |
| **ITA 2023, 2024, 2026 + Mauá 2024, 2025** | ~250–350 | banca nova, em `engenharia/`. O banco não tem **uma única** questão de ITA ou Mauá |

## O que o ENEM ensinou (2026-08-16)

**São três edições, não duas.** Os arquivos `ENEM D1 questões azul.pdf` e
`ENEM D2 Questões amarelo.pdf` são de **2024**, não de 2025 — o ano só aparece
na marca-d'água da capa. Com 2023, 2024 e 2025 são 540 questões, não 360.

**O ENEM 2025 não tem gabarito na pasta.** Os quatro PDFs de gabarito cobrem
2023 (dia 1 e 2) e 2024 (dia 1 e 2). Sem chave oficial, transcrever 2025 seria
resolver 180 questões e apostar na própria resposta — e a regra desta migração
é a oposta: questão cuja resposta não se consegue justificar não entra. A fase
8e fica bloqueada até o gabarito do INEP entrar em `enem e fuvest/`.

**O PDF do INEP tem camada de texto limpa**, ao contrário dos scans da FGV.
`scratchpad/enem.py` quebra um caderno inteiro em questões com enunciado e
alternativas separados, e erra em 7 de 555 — todas de Matemática ou Química,
onde as alternativas são fórmulas compostas como imagem.

**O tabulador é que separa alternativa de texto corrido, não o espaço.** Um
casamento por espaço engole o enunciado inteiro dentro da alternativa (a)
sempre que ele começa por artigo — e o ENEM começa por artigo o tempo todo
("A definição de Sertão…", "A Cordilheira do Himalaia…").

**A ordem do bloco de língua estrangeira varia por edição — confira sempre.**
No gabarito do INEP a coluna da esquerda é inglês e a da direita é espanhol,
isso é fixo. O que muda é o caderno: em 2023 o bloco de espanhol vinha primeiro
e as duas ordens não coincidiam; em 2024 inglês vem primeiro e coincidem. Não
existe regra a decorar — abra a primeira página do bloco e veja em que língua
ela está antes de casar as cinco respostas.

**Espanhol não tem onde entrar.** O banco central tem frente de `ingles` e não
de espanhol, então as cinco questões do bloco espanhol de cada edição ficam de
fora — não por dificuldade, por ausência de destino.

**A referência bibliográfica precisa de campo próprio.** Dentro do
`texto_apoio` ela era lida pelo classificador, e "Campinas: Unicamp, 2013"
mandou uma questão sobre revista feminina de 1853 para a Primeira República.
Agora é `fonte_texto`, renderizado sob o texto e fora do alcance das regras.

**O pré-voo conta empate como acerto.** Quando uma questão tira ZERO ponto em
todos os subtemas, ela não aparece como `FALHA` — o alvo também está em zero, e
o desempate cai a favor dele. Só a classificação do banco inteiro revela o
`padrao: true`, que é o subtema de resíduo da frente. Depois de inserir um
lote, **confira o `subtemas/<frente>.json` procurando `padrao` nos ids novos**;
duas questões de progressão passaram limpas pelo pré-voo e foram parar em
álgebra. O `--residuo` do classificador mostra o mesmo conjunto.

**O texto do PDF guarda o que o parser perde.** Quadro, tabela e alternativa
com fração somem do `enem.py` porque dependem de tabulação e de layout, mas
continuam no `get_text()` da página. Antes de descartar uma questão por
"quadro ilegível", leia a página crua — quatro das trinta de Matemática só
entraram por isso. Quando nem isso resolve, o gabarito ainda serve de teste:
a expressão da questão 170 saiu como `V x x x 2 4 10 105`, e só
`x²/4 − 10x + 105` tem mínimo 5 em x = 20, o único valor compatível com a
resposta oficial.

**Estatística não tem subtema em Matemática.** As 21 questões de média,
mediana e moda já no banco estão todas em `matematica-financeira`. Média
salarial e média de precipitação seguiram a convenção em vez de ganhar pino —
criar `matematica-estatistica` é mexer na tabela e reclassificar as 21, não
tratar caso a caso.

**A tabela de subtemas não foi feita para prova de leitura.** Em Humanas e
Linguagens, metade do lote fecha em ZERO ponto em todos os subtemas: o ENEM
põe um texto e pergunta o que ele faz, sem nomear o assunto. Em Interpretação é
estrutural — os seis subtemas descrevem HABILIDADES, e habilidade não deixa
marca lexical. Em Natureza o problema não existe, porque "mol" e "cloroplasto"
são palavras. Consequência prática: **um lote de Humanas do ENEM é ~70% pino em
REVISADAS**, e isso não é sintoma de lote mal escrito.

**A taxa de pino por área, medida no ENEM 2024 inteiro.** Serve para orçar o
trabalho de um caderno novo antes de começar:

| área | questões | pinos | taxa |
|---|---|---|---|
| Natureza (Física, Química, Biologia) | 32 | 4 | 12% |
| Matemática | 31 | 7 | 23% |
| Humanas (Geografia, História, Filo/Socio, Artes) | 43 | 22 | 51% |
| Linguagens (Inglês, Literatura, Interpretação) | 39 | 29 | 74% |

Matemática fica no meio porque o ENEM nomeia o cenário e nunca o conteúdo:
"densidade demográfica" cita quilômetro quadrado e vai para geometria, o
galinheiro de área máxima também, o encontro de dois ônibus também — e nos três
o que se cobra é álgebra.

**Resíduo que cai no subtema certo por acaso também precisa de pino.** Três
questões de Humanas fecharam em zero ponto e o subtema padrão da frente
coincidiu com o alvo. Sem pino elas parecem resolvidas, mas nada as prende ali:
a primeira mexida na tabela de regras as move sem aviso. Ao conferir o
`subtemas/<frente>.json`, trate `padrao: true` como pendência mesmo quando o
subtema estiver certo.

**O verify-banco reprova `interpretacao-texto` desde 2026-08-16, por motivo
legítimo.** Sete questões do ENEM 2024 têm a alternativa correta como a mais
comprida, e a heurística "1-mais-longa" as conta como chutáveis. O índice da
frente CAIU (9,2% → 4%, muito abaixo do alvo de 25%); quem dispara é a regra
por banco, que compara o espelho contra um baseline de 0%. Não há conserto
possível sem reescrever questão de prova real, o que a regra da casa proíbe — e
regravar o baseline apagaria o vermelho junto com o sinal que ele existe para
dar. Ao ver esse REPROVADO, confirme que a causa continua sendo essa antes de
tratá-lo como novidade.

## Decisões tomadas

1. **Figura vira PNG recortado do PDF.** O app já renderiza imagem —
   `VISUAL_PATH_OK` em [app.js:5748](../../../vestibular-direito-v2/app.js) aceita
   `assets/**.{svg,png,jpg,jpeg,webp}` no campo `visual.arquivo`. Sem isso,
   charge, tirinha e obra de arte são impossíveis: nelas a imagem **é** a
   pergunta.
2. **FGV 2021–2023 primeiro.** São as sessões nunca mineradas: rendem questão
   aprovada e excluída na mesma passada, e servem duas trilhas (Direito e
   Economia fazem a mesma prova objetiva).
3. **As discursivas entram**, nos dois módulos que já existem — sem módulo novo.

## Arquitetura

### Onde as questões moram

`banco-central/data/questions/<frente>.json`, como qualquer questão. Nenhuma
estrutura nova. Campos do schema atual que o material real usa:

| campo | uso |
|---|---|
| `banca` | `"fgv"`, `"fuvest"`, `"unesp"`… |
| `sessao` | **novo** — `"fgv-unificado-2023.1"`. A proveniência hoje só existe no staging; com o campo ela sobrevive no banco |
| `visual` | `{tipo, arquivo, descricao}` — a figura |
| `texto_apoio` / `textoId` | o texto de terceiro; `textoId` quando várias questões compartilham o mesmo texto-base |

`build-trilhas.js:196` faz `Object.assign({subtema}, q)` — copia todos os
campos. `sessao` atravessa o build sem alteração de código.

### Ferramental novo

`banco-central/provas.py`, sobre PyMuPDF:

- `paginas <pdf> <destino>` — renderiza cada página em PNG para leitura visual.
  **Necessário, não luxo:** `pdftotext -layout` na FGV 2023.1 devolve as duas
  colunas intercaladas, sem número de questão, sem letra de alternativa e sem
  fórmula. Sozinho é inutilizável.
- `recortar <pdf> <pág> <x0,y0,x1,y1> <saída>` — recorta a figura para
  `vestibular-direito-v2/assets/provas/<banca>-<sessao>-q<NN>.{png,jpg}`.
- `figuras <pdf> [--pagina N]` — lista as imagens embutidas e suas bboxes, que
  é como se descobre o recorte.

**A extensão decide o peso, e a diferença é de 7×.** Medido na FGV 2023.1, a
200 dpi: foto, mapa ou capa pesa ~313 KB em `.png` e ~45 KB em `.jpg`, com a
mesma resolução; line art (diagrama, figura geométrica) já nasce em ~25 KB no
`.png` e não ganha nada no `.jpg`, que ainda borraria o traço. Nessa mistura,
as ~300 figuras restantes ocupam **~12 MB**; tudo em `.png` seriam ~65 MB, que
não cabe num repositório servido pelo GitHub Pages. Este era o único risco não
medido do projeto, e a fase 1 o mediu: seis figuras da 2023.1 somam 248 KB.

### O ciclo, por prova

1. `provas.py paginas` → PNGs no scratchpad
2. transcrever questão a questão para um lote JSON **no scratchpad**
3. `provas.py recortar` para cada figura → `assets/provas/`
4. `preflight.js <lote> <frente> <subtema>` até `APROVADO`
5. inserir em `banco-central/data/questions/<frente>.json`
6. espelhar em `vestibular-<trilha>/data/questions/<frente>.json` (sem o
   prefixo de trilha no id)
7. `classificar-subtemas.js` — **é este passo que faz a separação por subtema**
8. `build-trilhas.js`
9. `verify-banco.ps1 -Frente <frente>`
10. subir `DATA_VERSION` em `vestibular-direito-v2/trilhas.js`
11. commit na `main` com caminhos explícitos — nunca `git add -A`

### As fases

| Fase | O quê | Volume | Estado |
|---|---|---|---|
| 1 — piloto | FGV 2023.1, bloco Matemática + Humanas | 30 | **feito** (`be66418`) |
| 1b | FGV 2023.1, bloco Biologia, Física e Química | 45 | **feito** |
| 1c | FGV 2023.1, bloco de Inglês (4 textos-base) | 15 | **feito** |
| 1d | FGV 2023.1, bloco de Língua Portuguesa e Literatura | 15 | **feito** |
| **1 — total** | **FGV Unificado 2023.1, sessão completa, 4 cadernos** | **105** | **feito** |
| 5a | **ITA 2024** — banca nova, trilha de Engenharia | 34 | **feito** (`c25242a`) |
| 5b | **Mauá** — 92 das 95 aprovadas, as três provas | 92 | **feito** (`9c4587b` … `a546661`) |
| 2 | FGV 2022.1 + 2021.1 — **162 páginas**, ver o mapa abaixo | ~350 | |
| 3 | As 113 FGV já transcritas — recuperar o texto de apoio | 113 | |
| 4 | Insper 2026.1, 2026.1 v.2 e 2026.2 (destravado) | 91+ | |
| 5d | ITA 2023 e 2026 — os dois cadernos nunca minerados | ~120 | |
| 6 | Medicina, banca a banca | ~594 | |
| 7 | Discursivas: FGV com as grades oficiais (`*_GC.pdf`), depois Medicina | ~80 | |
| 8a | **ENEM 2023, 1º dia** — Humanas 44 + Linguagens 44 | 88 de 90 | **feito** (`5ea30a4`) |
| 8b | ENEM 2023, 2º dia — as 20 de Natureza que se respondem pelo texto | 20 | **feito** (`cb4ef90`) |
| 8c | ENEM 2023, 2º dia — o resto de Natureza e as 45 de Matemática | 51 de 70 | **feito** (`9535de2`, `87a972a`) |
| **8 — total** | **ENEM 2023 completo: 138 das 180 questões** | **138** | **feito** |
| 8d1 | ENEM 2024, 2º dia — Natureza 32 e Matemática 31 | 63 de 90 | **feito** (`0b9b3a3`) |
| 8d2 | ENEM 2024, 1º dia — Humanas | 43 de 45 | **feito** (`68d8f00`) |
| 8d3 | ENEM 2024, 1º dia — Linguagens (Inglês, Artes, Literatura, Interpretação) | 39 de 45 | **feito** (`34220f4`) |
| **8d — total** | **ENEM 2024 completo: 145 das 180 questões** | **145** | **feito** |
| 8e | ENEM 2025, os dois dias — **falta o gabarito**, ver abaixo | ~180 | bloqueada |
| **8 — geral** | **ENEM 2023 + 2024: 283 questões** | **283** | |
| 9 | FUVEST — **seis** cadernos de 1ª fase, todos com gabarito ao lado | 520 | **próxima** |

Os cadernos de ENEM e FUVEST chegaram em `enem e fuvest/`, na raiz, e a pasta
entrou no `.gitignore` pela mesma razão das outras: a raiz É o site.

### O que há mesmo de FUVEST na pasta (conferido em 16/08/2026)

São **seis** provas, não três — e as seis vêm com gabarito oficial ao lado, o
que torna a fase 9 a maior reserva destravada do projeto:

| caderno | questões | gabarito |
|---|---|---|
| FUVEST 2024, 1ª fase | 90 | `Gabarito_FUVEST_2024.pdf` |
| FUVEST 2025, 1ª fase (V1) | 90 | `fuvest2025_gabarito_primeira_fase.pdf` |
| FUVEST 2026, 1ª fase (V.1) | 90 | `FUVEST 2026 1ª fase Gabarito.pdf` |
| Simulado oficial de abril | 80 | `Simulado oficial (abril) Gabarito.pdf` |
| Simulado oficial de julho | 80 | `Simulado oficial (julho) Gabarito.pdf` |
| Simulado oficial 2026 (S1) | 90 | `fuvest2026-simulado-fase1-gabarito.pdf` |

A estimativa anterior de ~270 contava três cadernos. A FUVEST cobra 90 questões
de 1ª fase e os simulados oficiais, 80.

### O que o material já transcrito ensinou (fases 5a e 5b)

- **O staging não é fonte de gabarito.** Nos três cadernos da Mauá a resposta
  certa vem impressa em VERMELHO, e ler a cor do span com PyMuPDF conferiu as 95
  de uma vez. **Seis divergiam** do staging: presencial Q4, inverno Q13 e as
  on-line Q27, Q29, Q30 e Q44 — estas quatro registradas como "c" quando a certa
  é "a". Todas as conferidas na mão confirmaram o PDF, nenhuma o staging. Antes
  de usar qualquer staging, cheque o gabarito contra o caderno.
- **O caderno on-line da Mauá traz a certa sempre em primeiro lugar.** É a versão
  "prova e gabarito", não a prova aplicada — o vestibular on-line embaralha as
  opções por candidato. Entrar como está deixaria as 31 questões daquela sessão
  com gabarito "a". As opções são rotacionadas por um deslocamento tirado do id;
  o conjunto não muda, só a ordem. **Rotacionar quebra referência por letra
  dentro da explicação** ("a alternativa (e) é a de quem…"): escreva a explicação
  citando o VALOR da opção, e ela sobrevive a qualquer reordenação.
- **`dificuldade` só aceita `media` e `dificil`.** O `"muito dificil"` previsto
  acima para o ITA não existe no vocabulário do app: `app.js:4300` renderizaria o
  selo "Média" e uma classe CSS com espaço no nome. O ITA entrou como `dificil`.
- **O staging também erra sobre figura.** Ele anotava figura na questão 45 do ITA;
  a página 17 do caderno mostra enunciado inteiramente textual. Confira no PDF
  antes de recortar.
- **Frente que a trilha de origem não estuda espelha em Medicina, com o id
  inteiro.** As de Biologia da Mauá não cabem no espelho de Engenharia (a trilha
  não tem a frente). Vão para `vestibular-medicina/data/questions/`, e ali o
  prefixo `eng-` FICA: tirá-lo produziria `biologia-01`, que já existe vindo de
  `med-biologia-01`.
- **A baseline de chutabilidade está pior do que se pensava.** A de Biologia foi
  gravada com `n: 150`, e a frente tem 471 questões. Os 13,9% que o verify-banco
  acusa são a defasagem dela, não o lote.
- **A figura do caderno "prova e gabarito" pode ENTREGAR a resposta.** Nos três
  cadernos da Mauá a opção correta é impressa em cor diferente — laranja na
  curva, vermelho no rótulo. Para questão de alternativa em TEXTO isso não
  importa, porque o texto é redigitado; para questão cujas ALTERNATIVAS são
  desenhos, recortar a figura é inviável. A saída é redesenhar, e ela só serve
  quando as opções são formas inequívocas: a questão 23 do inverno virou um SVG
  gerado por fórmula (assintótica, convexa, reta, sigmoide, fortemente convexa),
  e a 31 ficou de fora porque suas opções diferem por curvatura fina, que
  redesenhar significaria adivinhar.
- **`provas.py montar`** junta vários recortes numa figura só, para quando as
  opções estão espalhadas em duas colunas da página. Resolve a diagramação — não
  resolve a cor do gabarito.
- **A rotação das on-line quebra referência POSICIONAL, não só por letra.** "A
  segunda opção descreve…" fica errado do mesmo jeito que "a alternativa (e)".
  Escreva a explicação citando o CONTEÚDO da opção.
- **Questão cuja resposta não se consegue justificar não entra.** A 30 do inverno
  tem gabarito oficial `c` (R$ 80,00) que não fecha com a aritmética do
  enunciado; staging e PDF concordam na letra, então não é erro de transcrição.
  Ficou de fora: a explicação é metade do produto.

O piloto validou o ciclo inteiro e mediu o peso das figuras (ver acima). As
questões de ITA entram com `dificuldade: "muito dificil"`, porque o banco é
compartilhado e uma questão de ITA cai no plano diário de quem estuda Direito.

**Custo medido da fase 1:** 105 questões e 21 figuras consumiram uma sessão
inteira, porque cada página precisa ser lida como imagem. Uma sessão comporta
da ordem de **35 a 40 páginas de prova**. Planeje por bloco, não por sessão.

### O mapa dos cadernos de 2022.1 e 2021.1

Os arquivos `Prova_00N_1a-Fase.pdf` **não são variantes embaralhadas da mesma
prova** — são BLOCOS de matérias diferentes, com conteúdo distinto. Tratá-los
como variantes e ler só um faria pular três quartos do material. Conferido por
hash do texto extraído:

| sessão | arquivo | páginas | matérias |
|---|---|---|---|
| 2022.1 | `Prova_001_1a-Fase` | 18 | Matemática |
| 2022.1 | `Prova_002_1a-Fase` | 22 | Ciências Humanas |
| 2022.1 | `Prova_003_1a-Fase` | 16 | Inglês e Língua Portuguesa |
| 2022.1 | `Prova_004_1a-Fase` | 26 | Biologia, Física e Química |
| 2022.1 | `Prova_005_2a-Fase` | 8 | discursivas — fase 7, não aqui |
| 2021.1 | `Prova_001_1a-Fase` | 46 | caderno completo: todas as matérias |
| 2021.1 | `Prova_002_1a-Fase` | 34 | segunda aplicação |

Em 2022.1 o gabarito vem no arquivo `_COM_GABARITO`, cujo texto extraído é
idêntico ao da prova limpa — sinal de que a resposta está marcada
VISUALMENTE, como na 2023.1, e por isso basta renderizar essa versão. Em
2021.1 os arquivos `_GABARITO` têm hash diferente, então ali o gabarito é
conteúdo à parte e precisa ser lido separadamente.

### As discursivas

Não precisam de módulo novo. Os dois formatos que existem cobrem os dois tipos
de discursiva real:

| formato | onde | correção | serve |
|---|---|---|---|
| `DISSERTATIVAS_EXATAS` | `vestibular-economia/data/dissertativas/*.json` | faixas 0/25/50/75/100 | FGV — a banca publica a grade de correção em faixas, é exatamente o campo `faixas[]` |
| `DISSERTATIVAS` | `vestibular-medicina/data/dissertativas.js` | checklist `pontosEsperados` | Fuvest 2ª fase, Unicamp, específicas da Santa Casa, Prova II do Einstein |

## Regras

- **Questão real entra como a banca escreveu.** Não reescrever distrator para
  baixar chutabilidade: numa questão real isso é fato da prova, não defeito do
  lote. O `preflight` vai reclamar; o veredito dele não manda aqui, e a razão
  fica registrada no commit.
- **Nada de editar bundle gerado.** Correção vai na fonte.
- **Decisão de classificação vai em `REVISADAS`**, dentro de
  `classificar-subtemas.js`, nunca no JSON gerado. Desde 15/08/2026 `REVISADAS`
  tem precedência sobre o mapa anterior — antes, o mapa vinha primeiro e
  corrigir uma entrada não surtia efeito sobre questão já marcada `revisado`.
- **Questão amarrada a texto compartilhado: pin PARTE cluster.** A coesão de
  cluster (todas as questões de um mesmo `textoId` no mesmo subtema) não
  sobrepõe `revisado`, então revisar questão a questão fura a proteção e o aluno
  passa a reler o mesmo texto em dias diferentes. Pine só o bastante para levar
  a MAIORIA do cluster ao destino certo e deixe a coesão arrastar o resto.
  Confira com uma varredura de `textoId` → conjunto de subtemas: o banco fecha
  com **zero** clusters partidos, e é assim que tem de continuar.
- **Bloco de Ciências da Natureza classifica mal com mais frequência.** Ele mora
  em `ciencias-natureza.json` e o `REDIRECIONA` o dissolve em Biologia, Química
  e Física, o que faz cada questão disputar com a tabela das TRÊS frentes ao
  mesmo tempo. O erro aqui é de FRENTE, não de subtema, e manda a questão para o
  bundle errado. Confira a contagem por frente contra a prova antes de fechar:
  a 2023.1 tem 15 de cada, e foi assim que os erros apareceram.
- **`banca` + `sessao` aparecem na tela.** É a mitigação barata do risco
  autoral: a origem fica explícita em toda questão de terceiro.
- **Invariante que a prova real contradiz é invariante errado.** A trava de
  escada do `verify-banco.ps1` afirmava que "a FGV nunca oferece uma opção com
  uma asserção isolada que não seja a I"; a questão 18 da 2023.1 oferece "II,
  apenas". A premissa foi inferida das provas que havia no repositório, e
  questão real é a evidência de que o padrão é feito. A trava passou a isentar
  quem tem campo `banca`, e segue valendo para questão autoral. **Bater a
  questão real no molde teria falsificado a prova.**
- **Ordem de alternativa é conteúdo; ponto final é tipografia.** A 2023.1
  imprime `I e III, apenas` antes de `II e III, apenas` — ordem preservada. O
  ponto final das alternativas foi retirado, para não destoar das outras 6.646.
- **Baseline de chutabilidade se regrava por frente, à mão.**
  `-AtualizarChutabilidade` reescreve o arquivo inteiro e recusa rodar junto de
  `-Frente`, de propósito. Com outra sessão ativa no repositório, rodá-lo
  absorveria trabalho alheio em silêncio.

## Fora de escopo

- Insper 2026.1/2026.2 — os cadernos-fonte não estão no repositório. Destrava
  quando os PDFs `INSP2502` e `INSP2504` forem adicionados.
- Reescrever ou "melhorar" questão real.
- Provas de outras trilhas que não estejam nas pastas `provas/`.
