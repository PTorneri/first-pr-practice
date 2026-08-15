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
| FGV Unificado 2021.1, 2022.1, 2023.1 | ~250–300 | **nunca mineradas** — não aparecem em nenhum staging |
| Insper 2026.1/2026.2 | 91 | **bloqueado**: os cadernos INSP2502/INSP2504 não estão no repo, só os editais |

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
  `vestibular-direito-v2/assets/provas/<banca>-<sessao>-q<NN>.png`.

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

| Fase | O quê | Volume |
|---|---|---|
| 1 — piloto | FGV 2023.1 (3 blocos, 36 páginas) | ~105 |
| 2 | FGV 2022.1 + 2021.1 (64 páginas) | ~200 |
| 3 | As 113 FGV já transcritas — recuperar o texto de apoio | 113 |
| 4 | Discursivas FGV, com as grades oficiais (`*_GC.pdf`) | ~20 |
| 5 | Medicina, banca a banca | ~594 |
| 6 | Discursivas de Medicina | ~60 |

A fase 1 é piloto de propósito: valida o ciclo inteiro e mede o peso real por
PNG — o único risco ainda não medido. ~300 figuras podem pesar de 10 a 30 MB no
repositório. O GitHub Pages aguenta, mas o número precisa ser conhecido antes de
multiplicar por seis.

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
  `classificar-subtemas.js`, nunca no JSON gerado.
- **`banca` + `sessao` aparecem na tela.** É a mitigação barata do risco
  autoral: a origem fica explícita em toda questão de terceiro.

## Fora de escopo

- Insper 2026.1/2026.2 — os cadernos-fonte não estão no repositório. Destrava
  quando os PDFs `INSP2502` e `INSP2504` forem adicionados.
- Reescrever ou "melhorar" questão real.
- Provas de outras trilhas que não estejam nas pastas `provas/`.
