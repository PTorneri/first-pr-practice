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
  **simulado misto**: em vez de vídeo-aula, são ~45 questões distribuídas entre as 15 frentes por
  prioridade (ver abaixo) para revisar tudo simultaneamente, como uma prova real. No mapa de 90
  dias, esses dias aparecem com borda tracejada.
- Ao longo de 90 dias há ~78 dias normais e ~12 domingos de simulado; frentes de prioridade
  máxima aparecem bem mais que frentes de prioridade baixa — todas continuam aparecendo mais de
  uma vez, só que numa proporção que reflete o quanto cada uma realmente cai nas provas.

### Priorização por estudo de provas reais

O sorteio de frentes — nos dias normais e nas ~45 questões de cada simulado — não é uniforme:
segue os pesos de `data/priority-weights.js`, derivados de **estudo-provas-fgv-insper.pdf**
(incluso no projeto), um estudo de 6 anos de provas reais da FGV Direito SP (2021-2026) mais o
edital oficial da Insper. Frentes de prioridade máxima (ex.: Matemática/RLM, Interpretação de
Texto, Geografia) têm peso 3; prioridade média (ex.: História, Atualidades), peso 2; prioridade
estrutural assimétrica — decisiva numa banca, secundária na outra (ex.: Artes só na FGV,
Filosofia/Sociologia só na Insper) — peso 1,5; prioridade baixa (Ciências da Natureza, que nunca
cai na FGV e pesa só 10% na Insper), peso 0,5. A alocação usa o método dos maiores restos (o
mesmo tipo de regra usada pra converter votos em cadeiras), garantindo cobertura mínima pra toda
frente mesmo com pesos bem diferentes entre si.

### Agendamento adaptativo (a partir do 2º simulado)

Além do peso-base acima, os dias entre um domingo e o próximo formam um "ciclo", e a partir do
2º ciclo o peso de cada frente passa a ser **o peso-base multiplicado por um fator de erro (1 a
4)**, calculado pela taxa de erro daquela frente no simulado anterior (erros ÷ total de questões
daquela frente naquele simulado — não o número bruto, já que cada frente tem uma quantidade
diferente de questões no simulado). Ou seja: errar numa frente que já é prioridade alta pesa
ainda mais que errar numa de prioridade baixa. Nenhuma frente nunca fica com peso zero. Os pesos
são calculados a partir do desempenho real e então **travados permanentemente** em
`localStorage` assim que aquele simulado é 100% respondido, para que editar respostas de um
simulado antigo não bagunce uma semana que você já começou a estudar. Ao concluir um simulado, o
próprio card mostra um resumo tipo "com base nos seus erros, a semana que vem foca mais em:
[frentes]". O 1º ciclo (antes do 1º simulado) já usa o peso-base do estudo, não fica uniforme.
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
  frentes** (com barra de progresso — o total por frente varia conforme a prioridade dela, não é
  mais fixo em 3), além de um atalho para reabrir aquele dia em "Hoje".

## Aba "Caderno de Erros"

Toda questão que você já respondeu errado — em qualquer dia normal ou simulado — aparece nessa
aba, agrupada por frente, pra você treinar de novo. A comparação é feita direto contra a última
resposta salva (`localStorage`) e o gabarito do banco, então cobre erros de qualquer lugar do
app automaticamente, sem precisar de nenhum dado novo salvo. Responder certo **não remove a
questão na hora** — ela continua na tela com a explicação completa, e só deixa de aparecer como
pendente na próxima vez que você abrir a aba (assim dá tempo de ler o "por quê" da resposta certa
sem a tela mudar debaixo do seu cursor).

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
