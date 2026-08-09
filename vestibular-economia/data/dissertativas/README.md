# Dissertativas de Matemática — formato e regras

Fonte do banco. Cada `.json` aqui é um tema; `build-dissertativas.js` junta tudo em
`../dissertativas-matematica.js`, e `verificar-dissertativas.js` reprova o que estiver torto.

```bash
node vestibular-economia/verificar-dissertativas.js && node vestibular-economia/build-dissertativas.js
```

## Por que este banco não parece com o de objetivas

A prova de Matemática discursiva vale **30% da nota final** da FGV EESP e é corrigida por
**faixas de 0/25/50/75/100**, com a grade publicada junto da prova. A grade pune resposta sem
conta: em 2026.1, número certo sem raciocínio vale 25% na questão 1 e **0%** na 2b.

Consequência para quem escreve questão aqui: **a resolução é o produto**, não o gabarito. Ela é
o único lugar do app em que o aluno vai contra o próprio raciocínio e aceita que errou — uma
conta furada não confunde, ensina errado. Daí o campo `conferencia`, que a máquina avalia.

Anatomia completa das provas: [`../../estudo-anatomia-provas-economia-fgv-insper-2021-2026.md`](../../estudo-anatomia-provas-economia-fgv-insper-2021-2026.md).

## Campos

| Campo | Obrigatório | O que é |
|---|---|---|
| `id` | sim | único no banco inteiro |
| `area`, `frente`, `tema` | sim | `"Matemática"`, `"matematica"`, e o tema do arquivo |
| `origem` | só em questão real | `"FGV EESP 2026.1 · questão 5"`. Item autoral não tem |
| `enunciado` | sim | o contexto, sem os comandos |
| `figura`, `figuraAlt` | não | SVG em linha + descrição para leitor de tela |
| `tempoSugerido` | não | minutos |
| `itens[]` | sim | um por subitem; questão sem subitens tem um item de `id: "unico"` |

Dentro de cada item:

| Campo | Obrigatório | O que é |
|---|---|---|
| `comando` | sim | a pergunta |
| `pontos` | não | peso dentro da questão. Ausente = peso igual |
| `resolucao` | sim | passo a passo, uma linha por passo (a tela preserva as quebras) |
| `respostaFinal` | quando há número | `{ rotulo, aceitas[], intervalo? }` |
| `conferencia` | quando a resposta é número | expressão aritmética que a máquina avalia e compara |
| `faixas[]` | sim | `{ pct, desc }`, em ordem crescente, começando em 0 |

## Cinco regras que o validador cobra

1. **A faixa máxima cita a resposta certa.** É ela que a tela tranca quando o aluno erra o
   número; se a faixa do topo não exigir o número, a trava vira punição arbitrária.
2. **Faixa de 75% é de quem raciocinou certo e errou a conta.** Foi assim que a FGV escreveu a
   questão 1 de 2026.1, e é o que impede o banco de virar tudo-ou-nada. Subitem com 3 degraus
   (0/25/50) segue o mesmo espírito no degrau do meio.
3. **A descrição da faixa nomeia o erro típico**, no registro da banca — "errou o cálculo do
   número de anos, com boa aproximação (41 ou 43)" — e não "resposta parcialmente correta".
4. **`conferencia` em toda resposta numérica.** Sem ela o validador avisa; com ela, ele
   recalcula e reprova se a conta não fechar.
5. **Figura desenha com `currentColor`**, senão some no modo escuro, e nunca com `<script>`.

## Distribuição

Sai da frequência observada em 2023–2026 (§3.4 do estudo). 150 autorais:

| Arquivo | Tema | Questões |
|---|---|---:|
| `10-sequencias-recorrencias.json` | Sequências e recorrências | 30 |
| `20-probabilidade-contagem.json` | Probabilidade e contagem | 30 |
| `30-funcoes-algebra.json` | Funções e álgebra | 25 |
| `40-geometria.json` | Geometria plana e analítica | 25 |
| `50-estatistica.json` | Estatística e médias | 15 |
| `60-financeira.json` | Matemática financeira e porcentagem | 15 |
| `70-modelagem-economica.json` | Modelagem econômica | 10 |

Mais `00-referencia.json`, com três questões reais da FGV EESP 2026.1 — elas ficam no banco de
propósito, como régua do formato.
