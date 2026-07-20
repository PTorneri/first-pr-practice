# Rumo à FGV & Insper — Direito

Plano de estudos de 90 dias para os vestibulares de Direito da FGV (SP/Rio) e do Insper,
baseado no formato real das provas (pesquisado em julho/2026): Língua Portuguesa, Inglês,
Matemática/Raciocínio Lógico e Ciências Humanas (Atualidades, História, Geografia) — essas
provas **não** cobram conhecimento jurídico específico, é conteúdo de ensino médio aplicado
com viés crítico-argumentativo. (A frente de Redação foi removida do app por decisão do autor
do plano — o app foca em exercícios objetivos.)

## Como abrir

Basta dar duplo clique em `index.html`. Não precisa de servidor, internet (exceto para os
links de vídeo) nem instalação — todos os dados ficam embutidos em arquivos `.js` locais.

Se preferir rodar via servidor local (útil para testar em outro dispositivo na mesma rede),
há um `serve.ps1` incluso:

```
powershell -ExecutionPolicy Bypass -File serve.ps1
```

e depois abra `http://localhost:8843/`.

## Como o plano é montado

- **15 frentes de estudo** (`data/subtopics.js`) cobrindo tudo que cai nas provas: Interpretação
  de Texto, Gramática, 4 frentes de Atualidades (política/economia, geopolítica, meio ambiente,
  tecnologia), Direitos Humanos, História do Brasil, História Geral, Geografia,
  Filosofia/Sociologia, Artes/Cultura, Matemática/Raciocínio Lógico, Inglês e Ciências da
  Natureza.
- **Todo dia da semana (segunda a sábado)** o app sorteia **2 dessas frentes**, mostrando 1
  vídeo-aula sugerida por frente (2 no dia) e entre 24 e 30 exercícios no total (12 a 15 por
  frente).
- **Todo domingo do calendário real** (a partir da data em que você começar o plano) vira um
  **simulado misto**: em vez de vídeo-aula, são ~45 questões (3 de cada uma das 15 frentes,
  "temas diversos") para revisar tudo simultaneamente, como uma prova real. No mapa de 90 dias,
  esses dias aparecem com borda tracejada.
- Ao longo de 90 dias há ~78 dias normais e ~12 domingos de simulado; cada frente aparece em
  dias normais em média **~10-11 vezes**, mais 3 vezes por simulado — bem mais do que "mais de
  uma vez" pedido, com repetição espaçada de verdade.

### Agendamento adaptativo (a partir do 2º simulado)

O sorteio das duas frentes de cada dia normal não é só aleatório: os dias entre um domingo e o
próximo formam um "ciclo", e a partir do 2º ciclo o sorteio é **ponderado pelos erros do
simulado anterior** — cada erro numa frente (0 a 3 por simulado) aumenta o peso dela de 1 para
2, 3 ou 4, fazendo-a aparecer proporcionalmente mais vezes naquela semana. Nenhuma frente nunca
fica com peso zero, então nada é excluído — só fica mais ou menos frequente. Os pesos são
calculados a partir do desempenho real (`data/questions/*.json` + suas respostas) e então
**travados permanentemente** em `localStorage` assim que aquele simulado é 100% respondido, para
que editar respostas de um simulado antigo não bagunce uma semana que você já começou a estudar.
Ao concluir um simulado, o próprio card mostra um resumo tipo "com base nos seus erros, a semana
que vem foca mais em: [frentes]". O 1º ciclo (antes do 1º simulado) não tem dados ainda, então
começa uniforme.
- Os exercícios vêm de um banco de **36 questões originais por frente** (540 no total, em
  `data/questions/*.json`, compiladas em `data/bundle.js`) — todos os 15 bancos foram ampliados
  para esse tamanho (o de Ciências da Natureza foi o primeiro a dobrar, a pedido; os outros 14
  seguiram o mesmo tratamento depois). Com bancos maiores, cada questão se repete bem menos ao
  longo dos 90 dias: medi diretamente no app antes e depois — o "pior caso" (questão mais vista)
  caiu de 10-12 repetições para 5-8. Não dá pra chegar a zero repetição com bancos deste tamanho
  em 90 dias (precisaria de ~150 questões por frente, um volume não realista de escrever à mão
  com qualidade), mas a frequência caiu por volta da metade. A seleção usa uma janela circular
  sobre o banco a cada nova visita, para variar o subconjunto e a ordem.

## Aba "Simulados"

Uma aba própria na navegação principal, separada de "Hoje" e do "Calendário", com duas telas:

- **Lista**: todos os simulados do seu plano (data e status — não realizado / em andamento / concluído
  com nota final).
- **Detalhe** (ao clicar em um simulado): nota final e, abaixo, **acertos por cada uma das 15
  frentes** (X/3, com barra de progresso), além de um atalho para reabrir aquele dia em "Hoje".

## Questões dissertativas (estilo prova discursiva FGV)

A FGV também tem uma fase discursiva com questões de Humanas, Língua Portuguesa e Arte/Questões
Contemporâneas (diferente da redação de 20-30 linhas). Para treinar isso:

- Ao terminar **todos os exercícios objetivos do dia**, aparece um card perguntando se você quer
  praticar dissertativas hoje — a escolha é sempre sua, dia a dia (`data/dissertativas.js`, 24
  prompts originais: 8 de Humanas, 8 de Linguagens, 8 de Artes).
- Se sim, aparecem **1 ou 2 questões** com texto de apoio, comando e um campo de texto livre.
  Não há correção automática (é dissertativa!) — em vez disso, um botão revela os **"pontos
  esperados na correção"**, um espelho de correção simplificado, no mesmo espírito do usado pela
  FGV.
- A meta é **4 vezes por semana** (semana = blocos de 7 dias do plano, dias 1-7, 8-14, ...). O
  card sempre mostra quantas já foram feitas e quantas faltam. Pular um dia não afeta os outros —
  dá para mudar de ideia depois.
- Suas respostas ficam salvas por dia/questão em `localStorage`, então se você voltar a um dia já
  respondido, o texto continua lá.

## Sobre questões "reais" das provas

Cheguei a baixar provas oficiais anteriores da FGV Direito SP (2021, 2023 e 2026) para avaliar a
possibilidade de usar questões 100% reais no simulado de domingo. Decidi não copiá-las para
dentro do app: várias questões discursivas da FGV incluem trechos extensos de textos e até
letras de música protegidos por direitos autorais, e reproduzir dezenas de questões completas
(com gabarito oficial) seria redistribuir em bloco um material protegido — diferente de citar um
trecho pontual. Em vez disso, a aba **Meu progresso** tem uma seção com links diretos para as
páginas oficiais de provas e gabaritos da FGV e do Insper, caso você queira treinar com o
material 100% autêntico por conta própria.

## Sobre os vídeos

Não incluí links diretos para vídeos específicos do YouTube — não há como garantir que um ID de
vídeo "chutado" exista ou continue no ar. Em vez disso, os botões abrem uma **busca já filtrada
no YouTube** (`youtube.com/results?search_query=...`). Isso garante que o link sempre funcione e
sempre mostre conteúdo atual, em vez de um vídeo que pode ter saído do ar.

A recomendação é **diária, uma por frente do dia** (2 no total, já que cada dia normal estuda 2
frentes): dentro do card de cada frente aparece "▶ Aula de hoje: [subtema específico]". Em vez
de "aula de matemática vestibular" (vago), a busca é por um subtema concreto — "aula porcentagem
e juros compostos vestibular", por exemplo — usando um catálogo de subtemas específicos por
frente (`data/video-topics.js`, 3-5 subtemas por frente). O subtema sorteado gira com o número
da visita àquela frente (1ª vez, 2ª revisão, ...), então toda vez que a frente volta, a aula
sugerida é sobre um subtema diferente, cobrindo mais terreno ao longo dos 90 dias em vez de
repetir sempre a mesma busca.

## Progresso

Fica salvo em `localStorage` do navegador (sem cadastro, sem backend). A aba **Meu progresso**
mostra acertos por frente; o **Calendário** colore cada um dos 90 dias conforme o quanto você já
respondeu. "Reiniciar todo o progresso" apaga tudo e recomeça do zero.

## Expandindo o banco de questões

Para adicionar mais questões a um tema, edite o JSON correspondente em `data/questions/` (mesmo
schema: `id`, `texto_apoio`, `enunciado`, `alternativas` a-d, `resposta`, `explicacao`) e depois
regenere `data/bundle.js`. Sem Node/Python instalados, o comando PowerShell usado para gerar o
bundle está documentado no histórico do projeto — ou simplesmente edite `data/bundle.js`
diretamente, já que ele é só o mesmo JSON atribuído a `window.QUESTION_BANKS`.
