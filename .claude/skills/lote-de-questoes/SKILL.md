---
name: lote-de-questoes
description: Use quando for escrever, reescrever, corrigir ou inserir questões objetivas do banco — lote novo, subtema abaixo do piso, correção de gabarito ou distrator, ou qualquer edição em banco-central/data/questions/.
---

# Lote de questões

O banco central é a fonte; tudo em `vestibular-*/data/*.js` é artefato. A ordem
abaixo não é sugestão: o pré-voo vem **antes** de encostar no arquivo-fonte,
porque corrigir um lote no scratchpad é grátis e corrigir depois de gravado
custa build + commit.

## A ordem

1. **Escreva o lote num arquivo separado**, no scratchpad — fora do repo.
2. **Pré-voo** até `APROVADO`. Só então prossiga.
3. **Insira na fonte** (`banco-central/data/questions/<frente>.json`).
4. **Espelhe** em `vestibular-<trilha>/data/questions/<frente>.json`.
5. **Classifique** (`classificar-subtemas.js`).
6. **Build** (`build-trilhas.js`).
7. **Verifique** (`verify-banco.ps1`).
8. **Suba o `DATA_VERSION`** em `vestibular-direito-v2/trilhas.js`.
9. **Commit direto na `main`**, com `git add` de caminhos explícitos.

**Nunca `git add -A`.** Outras sessões mexem neste repo ao mesmo tempo, e já
aconteceu duas vezes de um commit varrer arquivo alheio. Confira o `--stat`
antes de publicar.

## Comandos

```bash
node banco-central/preflight.js <lote.json> <frente> <subtema-alvo>
node banco-central/classificar-subtemas.js
node banco-central/classificar-subtemas.js --falsos     # só se mexeu nas regras
node banco-central/build-trilhas.js
```
```powershell
powershell -File vestibular-medicina/verify-banco.ps1 -Frente <frente>
```

## O formato do lote

Array de questões, ou `{ questoes: [...] }`. Campos:

| campo | obrigatório | nota |
|---|---|---|
| `id` | sim | `<prefixo-de-origem>-<n>`, continuando a numeração do arquivo |
| `enunciado` | sim | |
| `alternativas` | sim | objeto `{a…e}` — cinco, não quatro |
| `resposta` | sim | a letra, minúscula. **É `resposta`, não `gabarito`** |
| `explicacao` | sim | entra no texto que a classificação lê |
| `texto_apoio` | não | texto curto embutido na própria questão |
| `formato`, `origem` | não | seguem o padrão das vizinhas do arquivo |

O prefixo do `id` diz de onde a questão veio, não quem a estuda:
`med-biologia-384`, `dir-geografia-173`, `eng-polinomios-26`. Continue o
prefixo que a frente já usa — `grep '"id"' no arquivo` e olhe o último.

## O que o pré-voo reprova

| reprovação | o que fazer |
|---|---|
| `FALHA … caiu em <outro-subtema>` | ele imprime a regra rival, o peso e **o trecho exato que casou**, com 14 caracteres de contexto entre colchetes. Reescreva aquele trecho, não a alternativa inteira. |
| chutabilidade > 25% | a certa é a mais comprida, ou as erradas se autorrefutam / são categóricas. Alongue distratores, tire "sempre/nunca/todo". |
| gabaritos desbalanceados | redistribua as letras. |
| `ABORTADO: … sem campo resposta a-e` | erro de ferramenta, não lote limpo. Corrija o nome do campo. |

`margem apertada` não reprova, mas avisa: aquela questão vira `FALHA` ao menor
reparo de texto. Trate antes de gravar.

## O espelho por trilha

`verify-banco.ps1` varre `vestibular-<trilha>/data/questions/`, **não** o banco
central. Um lote que só entra em `banco-central/` fica fora da verificação.
O espelho leva a mesma questão **sem o prefixo de trilha no id**:

| banco central | espelho de Medicina |
|---|---|
| `med-filosofia-sociologia-225` | `filosofia-sociologia-225` |

## Lendo o verify-banco

A baseline de chutabilidade é global e está defasada — o veredito final reprova
praticamente todo lote. **Não é sinal de que o seu lote piorou.** Compare a
frente que você tocou contra `vestibular-<trilha>/data/reescritas/_chutabilidade.json`:
só houve regressão se aquela frente subiu. As invariantes de forma (5
alternativas, escada, id duplicado, textoId órfão) valem sempre.

## Erros comuns

- **Editar `vestibular-*/data/bundle.js` para corrigir uma questão.** É artefato;
  o próximo build apaga. A correção vai na fonte.
- **Corrigir a classificação no JSON gerado** (`banco-central/data/subtemas/`).
  Use `REVISADAS` em `classificar-subtemas.js` — assim a decisão sobrevive à
  próxima reclassificação.
- **Esquecer o `DATA_VERSION`.** O GitHub Pages serve com `max-age=600`: sem
  incrementar, a correção leva até 10 minutos para chegar em quem já visitou.
- **Rodar o pré-voo depois de inserir.** Aí ele mede a fonte inteira, não o lote,
  e o sinal se perde no ruído.
- **Regra nova sem `\b`.** `amina` casa dentro de "contaminação". Rode `--falsos`.
