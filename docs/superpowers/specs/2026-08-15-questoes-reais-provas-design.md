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
| 2 | FGV 2022.1 + 2021.1 — **162 páginas**, ver o mapa abaixo | ~350 | |
| 3 | As 113 FGV já transcritas — recuperar o texto de apoio | 113 | |
| 4 | Insper 2026.1, 2026.1 v.2 e 2026.2 (destravado) | 91+ | |
| 5 | **ITA + Mauá** — banca nova, trilha de Engenharia | ~250–350 | |
| 6 | Medicina, banca a banca | ~594 | |
| 7 | Discursivas: FGV com as grades oficiais (`*_GC.pdf`), depois Medicina | ~80 | |

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
