# Banco central de questões

Fonte única das questões objetivas das três trilhas. Antes cada trilha tinha o
seu banco em `vestibular-<trilha>/data/questions/`, e uma questão de parábola
escrita para Direito era invisível para o aluno de Medicina só porque morava
noutra pasta — apesar de as três prepararem para o mesmo programa de ensino
médio.

## O fluxo

```
banco-central/data/questions/<frente>.json     as questões (fonte)
        │
        ├── classificar-subtemas.js  →  data/subtemas/<frente>.json
        │                               (que subtema é cada questão)
        │
        └── build-trilhas.js         →  vestibular-<trilha>/data/
                                          bundle.js
                                          subtopics.js
                                          priority-weights.js   ← pesos.js
                                          video-topics.js       ← data/videos.json
                                          theory.js             ← data/teoria.json
                                          flashcards.js         ← data/flashcards/<frente>.json
```

`videos.json` e `teoria.json` foram consolidados uma vez, na migração, a partir
dos arquivos que existiam em cada trilha (`node banco-central/videos.js
--consolidar` e `node banco-central/teoria.js --consolidar`). Os mapas que
guiaram a consolidação ficam em `videos.js` e `teoria.js`, e é neles que se mexe
para acrescentar uma aula ou corrigir uma teoria.

`data/flashcards/<frente>.json` não teve consolidação: é conteúdo novo,
autoral, escrito subtema a subtema (~60+ cards cada). Diferente da teoria, um
flashcard é um FATO que não muda com o edital, então não varia por trilha nem
por banca — é por isso que mora aqui e não em `teoria.js`/`videos.js`, que são
POR TRILHA. Migração em andamento: nem todo subtema tem deck ainda, e
`build-trilhas.js` avisa no console quais faltam sem travar o build (rodar sem
todos os 79 prontos é esperado por um tempo). Formato de cada arquivo:
`{ frente, gerado, porSubtema: { "<subtema-id>": [{id, frente, verso}, ...] } }`.

Os três arquivos gerados em cada trilha são **artefato, não fonte**. Corrigir
uma questão é mexer em `banco-central/data/questions/` e rodar o build.

```bash
node banco-central/build-trilhas.js
```

`--verificar` reprova quando o banco central mudou e os bundles não.

## Os comandos

| comando | o que faz |
|---|---|
| `node banco-central/migrar.js` | refaz o banco central a partir dos `vestibular-{direito,medicina}/data/questions/` originais. Rodado uma vez, na migração; idempotente. |
| `node banco-central/classificar-subtemas.js` | classifica cada questão num subtema |
| `node banco-central/classificar-subtemas.js --residuo [frente]` | o que não pontuou em nenhuma regra |
| `node banco-central/classificar-subtemas.js --apertadas` | decisões de margem ≤ 1, a fila do que revisar primeiro |
| `node banco-central/classificar-subtemas.js --amostra <subtema>` | 12 questões daquele subtema, para conferir a olho |
| `node banco-central/classificar-subtemas.js --falsos` | regra que casa texto de enunciado neutro (ver abaixo) |
| `node banco-central/build-trilhas.js [trilha]` | gera os bundles |

## Frente e subtema

Uma **frente** é a matéria (Biologia, Matemática). Um **subtema** é o assunto
dentro dela (`biologia-genetica`, `matematica-algebra`). São 14 frentes e 79
subtemas.

A distinção decide o produto: o plano de 90 dias sorteia por **subtema**, porque
"Biologia apareceu no calendário" nunca garantiu que genética foi estudada. Os
dois simulados alocam por **frente**, porque um caderno real tem 15 questões de
Biologia, não 3 de genética mais 2 de citologia.

O mesmo corte vale para o que acompanha o exercício:

| | granularidade | por quê |
|---|---|---|
| questões | subtema | é o que o aluno pratica no dia |
| vídeo-aula | subtema | "Genética mendeliana e heredogramas", não "Biologia" |
| teoria | **frente**, e por trilha | fala da banca: a de Biologia em Medicina cita as discursivas da Santa Casa, a de Matemática em Direito diz que ela vale 10% da prova |

Por isso as questões e as aulas são compartilhadas entre as trilhas e a teoria
não é — fundir os textos de teoria apagaria justamente o que os torna úteis.

Por isso o bundle publica os dois índices — `QUESTION_BANKS` por subtema e
`QUESTION_BANKS_FRENTE` por frente. O segundo é montado em runtime, com
referências para os mesmos objetos: serializar as duas visões levava o arquivo
de 4,7 MB para 14,2 MB.

## `--falsos`, e por que ele existe

O teste roda cada regra de classificação contra frases de enunciado que não são
de assunto nenhum ("Com base nesses dados, analise as afirmativas"). Nenhuma
deveria casar. Cinco regras de peso máximo casavam, todas por falta de `\b`:

- `amina` dentro de **cont**amina**ção** → toda questão de poluição virava Química Orgânica
- `ir[ãa]` dentro de bras**ileira** → toda menção ao Brasil virava Geopolítica
- `onda` dentro de resp**onda** → qualquer comando virava Ondulatória
- `base` em "com **base** nesses dados" → virava Equilíbrio Ácido-Base
- `[íi]m[ãa]` dentro de cl**ima**, últ**ima** → virava Eletromagnetismo

Nenhuma aparecia na contagem por subtema: a questão era classificada, só que na
matéria errada. Rode `--falsos` sempre que mexer nas regras.

## Quando a classificação erra

O custo do erro aqui é baixo — uma questão de genética na rotação de citologia
continua sendo uma questão boa, respondida no dia errado. Por isso a regra é
generosa e ninguém fica sem subtema: quem não pontua em nada cai no subtema mais
genérico da frente, marcado com `padrao: true` (são 355 de 5.197). O que fica
sem subtema fica fora da rotação diária, e isso seria pior.

Para corrigir uma questão específica, use `REVISADAS` em
`classificar-subtemas.js` — não edite o JSON gerado. A decisão fica versionada
junto com as regras e sobrevive à próxima reclassificação.
