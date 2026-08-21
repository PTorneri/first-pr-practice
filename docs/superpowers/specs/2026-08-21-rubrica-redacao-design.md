# Rubrica de redação com nota — desenho

Data: 2026-08-21
Estado: aprovado, aguardando plano de implementação

## Objetivo

A correção de redação por IA hoje devolve um veredito por critério de conteúdo
(`cumprido` / `parcial` / `nao_cumprido`) e uma faixa de três degraus. Falta o
que o aluno pede primeiro e o que mais o faz voltar: **uma nota, e a razão dela**.

Este desenho acrescenta um segundo eixo de correção — uma rubrica analítica de
quatro dimensões que fecha em 10,0 — sem tirar o eixo de conteúdo que já existe.
A rubrica é adaptada de uma grade de redação do Colégio Bandeirantes, escolhida
por ter descritor escrito para cada banda, que é o formato contra o qual um
modelo de linguagem julga bem.

O critério de todas as decisões abaixo foi **o que ajuda o aluno a reescrever**,
não o que é mais fiel ao papel nem o que é mais barato.

## O terreno, como ele está hoje

Cinco fatos apurados antes de desenhar:

1. **A correção é uma chamada só, com schema estruturado.**
   `vestibular-direito-v2/ia.js` monta o prompt, chama o `gemini-3.6-flash` com
   `responseSchema` e `temperature: 0.2`, e **normaliza a resposta em vez de
   confiar nela** (`executar()`): índice fora da lista é descartado, critério
   ignorado pelo modelo vira um `parcial` com recado, `nao_cumprido` com citação
   junto tem a citação apagada por contradição. A rubrica entra nessa mesma
   disciplina.

2. **A citação literal já é a trava anti-invenção.** O campo `evidencia` existe
   porque "se o corretor não consegue citar onde está, ele não viu — viu o que
   esperava ver". A rubrica herda a regra: banda sem trecho citado é nota
   inventada.

3. **Os `pontosEsperados` são de conteúdo, não de forma.** Em
   `vestibular-*/data/redacoes.js` cada proposta traz cinco, específicos do tema
   ("distingue emissão acumulada de emissão anual"). A rubrica é genérica e de
   forma. São eixos diferentes, e os dois ficam.

4. **A correção salva é sobrescrita.** `salvarCorrecaoIA` faz
   `estado[id] = correcao` (app.js:2497), com teto de 40 correções guardadas. A
   tentativa anterior é jogada fora hoje.

5. **Há guarda de compatibilidade.** `correcaoIAValida` (app.js:2513) descarta
   correção cuja grade mudou de tamanho, porque "um veredito preciso sobre o
   critério errado é pior do que nenhum". É por onde as correções antigas, sem
   rubrica, vão cair sozinhas — sem migração.

Vale para as três trilhas que têm redação (Direito, Economia, Medicina).
Engenharia não tem `data/redacoes.js`. A correção de **dissertativa não muda**.

## A espinha do desenho

> **Banda é julgamento; nota é conta.**

O modelo escolhe a banda de cada eixo e cita o trecho que a sustenta. Ele
**nunca emite um número**. A tabela banda para ponto, as travas de dependência e
os descontos vivem em JavaScript puro.

Isso não é preciosismo de engenharia, é pedagogia: escala de seis bandas em LLM
oscila entre execuções, e nota que oscila ensina o aluno a pedir correção de novo
até gostar do número. Aí a ferramenta virou caça-níquel, não corretor.

## Abordagem escolhida

**Uma chamada, schema estendido.** Considerada e descartada a alternativa de
duas chamadas (uma de conteúdo, uma de rubrica): elas não se enxergam, e o
checklist poderia dizer "você não enfrentou a objeção do Texto IV" enquanto a
rubrica devolve "Argumentação consistente — 3,0". O aluno teria que arbitrar
entre duas correções contraditórias, que é exatamente o que ele ainda não sabe
fazer. Também dobraria o consumo do `LIMITE_DIARIO` de 10 e a latência de quem
acabou de gastar 60 minutos escrevendo.

Descartada também a alternativa de o modelo devolver a nota pronta: as travas da
rubrica são aritmética, e dar aritmética a um LLM com o laço a três linhas de
distância é pagar caro por menos.

## Os quatro eixos

### 1. Adequação à proposta (1,0)

| banda | pontos | quando |
|---|---|---|
| `anulado` | 0 | uso de modelo pronto de internet; displicência deliberada. **Zera a redação inteira**; os demais eixos não são avaliados |
| `inadequado` | 0 | fuga total ao tema; fuga ao tipo dissertativo-argumentativo |
| `parcial` | 0,5 | abordagem muito restrita; abordagem muito abrangente; descumprimento de comando específico da proposta |
| `adequado` | 1,0 | cumpre os comandos e apresenta posicionamento defendido por argumentos |

**Duas caixas do papel saem de propósito: "plágio" e "uso de inteligência
artificial".** Plágio não é verificável sem corpus. Detector de IA é chute — e um
falso positivo zeraria a redação de quem escreveu de verdade, que é dano grande
demais para uma heurística.

### 2. Argumentação (4,0)

| banda | pontos |
|---|---|
| `insatisfatorio` | 1,0 |
| `fragil` | 1,5 |
| `pouco_convincente` | 2,0 |
| `bem_encaminhado` | 2,5 |
| `consistente` | 3,0 |
| `excelente` | 4,0 |

Não existe banda abaixo de 1,0 aqui — o zero só chega pela trava do eixo 1. O
prompt precisa dizer isso, ou o modelo inventa um 0,5.

### 3. Estrutura e coesão (2,5) · 4. Linguagem (2,5)

Mesma escala nos dois: `inadequada` 0,5 · `fragil` 1,0 · `em_desenvolvimento`
1,5 · `bem_encaminhada` 2,0 · `excelente` 2,5.

### Marcadores por banda

A lista fechada, transcrita da rubrica. É o enum de `marcadores`, e está aqui
porque a grade original é uma imagem que não vai para o repositório — quem
implementar precisa dela por escrito. A banda `excelente`/`adequado` de cada eixo
não tem marcador: não há defeito a apontar.

**Adequação**
- `anulado`: `modelo_pronto`, `displicencia_deliberada`
- `inadequado`: `fuga_ao_tema`, `fuga_ao_tipo_textual`
- `parcial`: `abordagem_restrita`, `abordagem_abrangente`, `comando_nao_cumprido`

**Argumentação**
- `insatisfatorio`: `informacao_nao_virou_argumento`, `incoerencia_global`,
  `argumentos_impertinentes`
- `fragil`: `argumentos_pouco_claros`, `parafrase_da_coletanea`,
  `incoerencia_parcial`, `argumentos_desconectados_da_tese`, `texto_informativo`
- `pouco_convincente`: `pouco_aprofundado`, `incoerencia_pontual`,
  `argumentos_generalizantes`, `senso_comum`, `argumento_improdutivo`
- `bem_encaminhado`: `selecao_pouco_pertinente`,
  `uso_pouco_proveitoso_da_coletanea`, `repertorio_nao_articulado`
- `consistente`: `lacuna_na_analise`, `repertorio_subaproveitado`,
  `pouca_criticidade`

**Estrutura e coesão**
- `inadequada`: `ausencia_constante_de_coesao`, `recursos_coesivos_inadequados`,
  `ideias_desorganizadas`, `falta_parte_constitutiva`
- `fragil`: `falhas_graves_de_coesao`, `ideias_mal_organizadas`,
  `quebras_indevidas_de_paragrafo`, `argumento_na_introducao_ou_conclusao`,
  `excesso_de_repeticoes`
- `em_desenvolvimento`: `coesivo_compromete_sentido_pontual`,
  `ausencia_frequente_entre_periodos`, `ausencia_entre_paragrafos`,
  `paragrafo_sem_unidade_interna`, `repeticoes_constantes`
- `bem_encaminhada`: `ausencia_eventual_entre_periodos`, `coesivos_repetitivos`,
  `coesivos_imprecisos`, `repeticoes_pontuais`,
  `falha_de_unidade_por_planejamento`

**Linguagem**
- `inadequada`: `desvios_sintaticos_graves`, `periodos_muito_longos`,
  `termos_inadequados_constantes`, `primeira_pessoa_singular_ou_leitor`,
  `copia_da_coletanea_sem_citacao`
- `fragil`: `desvios_sintaticos_frequentes`, `quebras_de_periodo_inadequadas`,
  `periodos_longos`, `termos_inadequados_frequentes`,
  `alguma_copia_sem_citacao`, `texto_curto_demais_para_analise`
- `em_desenvolvimento`: `alguns_desvios_sintaticos`, `quebra_pontual_de_periodo`,
  `periodos_longos_e_confusos`, `marcas_de_oralidade`
- `bem_encaminhada`: `termos_imprecisos_pontuais`,
  `organizacao_sintatica_eventual`, `periodos_longos_pouco_claros`,
  `excesso_de_primeira_pessoa_plural`

## A conta

```
arg_efetiva = 0                        se adequacao = 0
              min(argumentacao ; 1,5)  se adequacao = 0,5
              argumentacao             caso contrário

nota = adequacao + arg_efetiva + estrutura + linguagem − descontos   (piso 0)

banda "anulado" em adequação → nota 0, demais eixos não avaliados
```

**Decisão registrada:** fiel à rubrica, `inadequado` (fuga ao tema) zera apenas a
argumentação — estrutura e linguagem ainda pontuam, então uma fuga pode fechar em
5,0. Mantemos a aritmética, e a tela imprime a frase que falta no papel: *"fuga
ao tema — na sua banca isso zera a prova inteira, não custa metade."* Zerar tudo
é uma linha, se a decisão mudar.

### Descontos, calculados no código

- **Extensão:** −0,5 fora de **160–290 palavras**. A faixa pedida equivale a
  180–270; a folga de ~10% existe porque a conversão palavra para linha é
  aproximada (o comentário em `ia.js` já explica isso). Descontar de quem
  escreveu 179 seria punir o erro de conversão, não o do aluno.
- **Título:** campo próprio no formulário. Vazio → −0,5.
- **Gramática:** **não** vira desconto. Ela é o eixo Linguagem, e descontar de
  novo puniria duas vezes — a rubrica do papel duplica porque a correção é
  manual, e ali não há eixo que se aplique sozinho.

## Contrato de saída

Schema próprio para redação (`SCHEMA_CORRECAO_REDACAO`); a dissertativa segue com
o atual. Além de `criterios`, vem `rubrica` com quatro eixos, cada um:

```
banda        enum — os rótulos acima, nunca um número
marcadores   até 3, enum FECHADO com as caixinhas daquele eixo
             ("parafrase_da_coletanea", "senso_comum", "repertorio_nao_articulado"…)
evidencia    citação literal do texto do aluno, no máximo 200 caracteres
comentario   uma ou duas frases
```

`marcadores` como enum fechado, e não texto livre, é o que impede o modelo de
inventar defeito: ele escolhe entre os que a rubrica lista, ou não escolhe
nenhum. É a versão em dado das caixas de marcar do papel, e é de onde sai o
*porquê* da nota — sem elas sobra o número, que não ensina nada.

**A `faixa` da redação deixa de vir do modelo** e passa a ser calculada do total
(≥7,0 `competitiva`; 4,0 a 6,9 `precisa_ajuste`; <4,0 `refazer`). Some uma fonte
de contradição, e o CSS `data-faixa` que já existe continua valendo sem tocar em
nada.

**Com uma exceção que manda no total:** adequação em `inadequado` ou `anulado`
força `refazer`, qualquer que seja a soma. Sem isso a fuga ao tema que fecha em
5,0 sairia rotulada "precisa de ajuste", contradizendo a regra que
`INSTRUCAO_REDACAO` já enuncia hoje — fuga ao tema ou à estrutura dissertativa é
refazer, não ajustar.

`executar()` normaliza a rubrica com o mesmo rigor que já aplica aos critérios:

- **Marcador que não pertence à banda escolhida** é descartado, sem derrubar o
  eixo.
- **`evidencia` vazia rebaixa o eixo em uma banda**, porque banda sem citação é
  opinião. Quem já está na banda mais baixa fica onde está.
- **Eixo ausente ou com banda fora do enum não vira banda baixa.** A correção sai
  **sem nota**: os eixos que vieram são exibidos, o bloco numérico não aparece e
  a tela pede a correção de novo. Inventar uma banda baixa para fechar a conta
  seria exatamente a nota inventada que este desenho existe para impedir — e
  contaminaria o `anterior`, fazendo o delta da próxima tentativa mentir.
  O `responseSchema` já torna isso raro; a guarda é para quando ele falhar.

## Prompt

Bloco novo em `INSTRUCAO_REDACAO`, com os descritores comprimidos por banda e a
lista de marcadores de cada eixo. Três travas ditas em voz alta:

1. Você nunca escreve número. Só escolhe banda.
2. A banda mais baixa de Argumentação é `insatisfatorio`. Não existe nada abaixo.
3. Não julgue extensão nem título — o app já mediu os dois.

E uma exigência de coerência: a banda de Argumentação tem que conversar com o que
foi julgado nos `pontosEsperados`. É o ganho de fazer as duas coisas na mesma
chamada — a nota e o checklist contam a mesma história, com a mesma citação.

O bloco convive com o que já está lá e **não o substitui**: a regra de que
nenhuma destas bancas pede proposta de intervenção continua valendo, e a rubrica
não a contradiz (ela também não pede).

## Tela

Abre com **banda, marcadores e citação** por eixo — sem número à vista. Um botão
**"Ver a nota"** revela `2,5 de 4,0` por eixo, os descontos com o motivo escrito,
e o total.

O motivo é um achado clássico sobre retorno de trabalho escrito (Butler, 1988):
aluno que recebe nota junto com comentário lê a nota e não lê o comentário, e o
desempenho seguinte fica igual ao de quem só recebeu nota. Só comentário melhora.
Mas nota nenhuma também não serve — o candidato precisa saber se está
competitivo. O meio-termo honesto é banda primeiro (calibração imediata, sem
falsa precisão) e número a um clique.

**Comparação com a tentativa anterior.** Quando existe, cada eixo mostra o
movimento (`Frágil → Bem encaminhado`) e o total (`5,5 → 7,0`). Este é o item de
maior retorno do desenho inteiro: um número isolado diz onde o aluno está; o
delta diz **se o que ele mudou funcionou**, que é o que ensina a reescrever. Só
passa a ser possível agora porque a rubrica tem degraus finos — `faixa`, com três
degraus, quase nunca se move entre tentativas.

**O "Na próxima" passa a nomear o eixo onde mais ponto absoluto foi perdido.**
Perder 1,5 em Argumentação e 0,5 em Linguagem manda estudar argumentação, mesmo
que a linguagem pareça pior de ler. Essa triagem o aluno sozinho não faz, e o
código faz exata.

Rodapé: a rubrica é adaptada de uma grade escolar, e a banca de cada trilha
pontua diferente. Um 7,0 aqui não é um 7,0 na FGV, e é preciso dizer isso.

### Campo de título

Um `input` acima do `textarea`, salvo junto da resposta em `vd_redacaoAnswers`
(que passa de string para `{ titulo, texto }`, com leitura tolerante ao formato
antigo). Medir de verdade em vez de adivinhar a primeira linha, e de quebra
ensina o hábito que a banca cobra.

## Persistência

`vd_redacaoIA[id]` ganha `rubrica`, `nota` e **um** `anterior`
(`{ rubrica, nota, quando }`). Um nível só, não histórico: o teto de 40 correções
já existe, guardar N tentativas cresce sem limite no `localStorage`, e o delta que
ensina é o da última.

`correcaoIAValida` passa a exigir `rubrica` nas correções de redação. As já
salvas caem sozinhas, sem migração e sem tela quebrada.

Correção que saiu **sem nota** (eixo ausente, ver acima) não vira `anterior`: ela
substitui a corrente para o aluno ver os comentários, mas o `anterior` que já
estava lá é preservado, para que a próxima tentativa completa ainda tenha contra
o que se comparar.

Conferir se `sync.js` espelha essas chaves por lista fechada — se espelhar, o
formato novo precisa passar por lá também.

## Verificação

Não há test runner no repositório, e a maior parte disto só se verifica com olho.
Mas a conta é função pura, e é justamente a parte que não pode errar. Então:

- `vestibular-direito-v2/rubrica.js` — tabela banda para ponto, travas,
  descontos, faixa derivada e o eixo mais caro. **Sem nenhuma dependência**,
  importado pelo `ia.js` e pelo `app.js`.
- `vestibular-direito-v2/verificar-rubrica.js` — rodável por `node`, cobrindo:
  as três travas de adequação (`anulado`, `inadequado`, `parcial`), os dois
  descontos, o piso em 0, o mapa banda para ponto de cada eixo, os cortes da
  faixa e o cálculo do eixo mais caro.
- Exige `vestibular-direito-v2/package.json` com `{"type":"module"}` para o node
  importar o módulo. Não afeta o Pages nem o app; nada mais naquela pasta lê
  `package.json`.

Além disso, conferir contra os estudos de anatomia das provas antes de fechar —
uma correção calibrada errado é pior do que nenhuma, e é a única parte que o
verificador não alcança.

## Cache

`?v=` incrementado **em todos os lugares de uma vez** (`app.js`, `ia.js`,
`styles.css`, `rubrica.js`, e os `import` internos), seguido de
`node vestibular-direito-v2/build-paginas.js`. Quem serve o `?v=` novo são as
páginas geradas, não o template.

Não há mudança em `banco-central/`, então `DATA_VERSION` fica como está.

## Fora de escopo

- A correção de **dissertativa** não muda.
- Nenhuma alteração nos pesos por banca. A rubrica é a mesma nas três trilhas.
  Remapear os pesos para FGV/Insper/FUVEST é trabalho próprio, com decisão de
  conteúdo, e fica para depois.
- Histórico de mais de uma tentativa anterior.
