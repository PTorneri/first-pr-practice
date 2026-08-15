---
name: flashcards-por-frente
description: Use quando for escrever, ampliar ou corrigir flashcards de uma frente ou de um subtema, ou quando um subtema aparecer sem deck em banco-central/data/flashcards/.
---

# Flashcards por frente

Um flashcard é um FATO: não muda com o edital, então não varia por trilha nem
por banca. Por isso mora no banco central e é compartilhado pelas quatro
trilhas, diferente de `teoria.js` e `videos.js`, que são por trilha.

**A unidade de trabalho é a FRENTE INTEIRA, não um subtema.** O compositor
exige todos os subtemas da frente no rascunho e **sobrescreve o arquivo
inteiro**. Um rascunho com dois subtemas não acrescenta dois decks — ele é
recusado, e se passasse apagaria os demais.

## Como se faz

1. Veja o que falta: `node banco-central/compor-flashcards.js --conferir`
2. Escreva um **rascunho `.js` no scratchpad** (fora do repo) com todos os
   subtemas da frente.
3. `node banco-central/compor-flashcards.js <frente> <rascunho.js>`
4. `node banco-central/build-trilhas.js`
5. Suba o `DATA_VERSION` em `vestibular-direito-v2/trilhas.js`.
6. Commit direto na `main`. O rascunho é descartável e não entra no repo.

## O rascunho

Módulo Node que exporta um mapa de subtema para pares `[pergunta, resposta]`:

```js
module.exports = {
  "biologia-genetica": [
    ["O que é heterozigose?", "Presença de dois alelos diferentes para o mesmo gene."],
    ["Primeira Lei de Mendel", "Cada caractere é determinado por um par de fatores que se separam na gametogênese."],
    // … no mínimo 30
  ],
  "biologia-citologia": [ /* … */ ],
  // … todos os subtemas da frente, sem exceção
};
```

Os ids (`flash-<subtema>-07`) são **gerados** — nunca digitados. É o ponto do
compositor existir: `buildFlashcardPool` (app.js) indexa a repetição espaçada
por `id` num espaço **global**, e um id repetido não dá erro em lugar nenhum —
ele funde dois cards no histórico de quem estuda, e acertar um marca o outro
como revisado sem ter sido visto.

## O que ele reprova

| mensagem | causa |
|---|---|
| `subtema não pertence à frente X` | id de subtema errado ou digitado errado |
| `subtema ausente do rascunho` | falta um subtema da frente — escreva-o ou o deck dele some |
| `pergunta repetida` | duas perguntas iguais no mesmo subtema |
| `pergunta vazia` / `resposta vazia` | par incompleto |
| `só N cards, abaixo do piso de 30` | escreva mais |

Nada é gravado enquanto houver qualquer problema. Os ids de subtema válidos
saem de `SUBTEMAS` em `banco-central/classificar-subtemas.js`, e o script lista
as frentes válidas quando você erra o nome de uma.

## Notas

- **Piso de 30 por subtema.** Matemática tem 63–79 porque cinco dos oito decks
  já existiam prontos e foram transportados; as frentes escritas do zero miram
  o piso, e ficarem menores que Matemática é esperado, não defeito.
- **As 14 frentes já estão completas** (83/83 subtemas em 2026-08-14). Um
  subtema sem deck agora é regressão, não pendência — `--conferir` mostra.
  `build-trilhas.js` só avisa e não trava, então a falta passa em silêncio pelo
  build.
- **Nunca edite `banco-central/data/flashcards/<frente>.json` à mão**, nem
  `vestibular-*/data/flashcards.js` (esse é artefato do build).
