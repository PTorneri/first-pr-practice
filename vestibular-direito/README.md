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

Boa parte das funcionalidades abaixo (teoria por frente, flashcards, SOS, score projetado,
índice de prontidão, diagnóstico de erro, cronograma por fases, essenciais/extras, simulados
avulsos, obras obrigatórias, sincronização) nasceu de uma análise de um app concorrente
(`analise-app-concorrente.pdf`, incluso no projeto) — cada seção abaixo explica a versão
implementada aqui, que reaproveita a estrutura de dados já existente sempre que possível.

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
segue os pesos de `data/priority-weights.js`, derivados originalmente de
**estudo-provas-fgv-insper.pdf** (incluso no projeto), um estudo de 6 anos de provas reais da FGV
Direito SP (2021-2026) mais o edital oficial da Insper. Em 2026-07 os pesos foram revisados à luz
de um segundo estudo, mais rigoroso e abrangente, **estudo-formulacao-provas-objetivas-fgv-vunesp-enem-fuvest-2016-2025.pdf**
(também incluso no projeto), que analisa 60 combinações de matéria×banca (FGV Direito, Vunesp,
ENEM, Fuvest) com foco em método de formulação de questões, lógica de distratores e frequência de
temas 2016-2025. O novo estudo confirmou de forma independente a estrutura de pesos já adotada —
nenhuma frente precisou mudar de faixa de prioridade — mas afinou o racional de cada uma (comentado
em `priority-weights.js`) e tornou mais preciso o caso de Ciências da Natureza (confirmado que a
FGV Direito não testa Física, Química nem Biologia em nenhuma fase, não apenas "baixa frequência").
Frentes de prioridade máxima (ex.: Matemática/RLM, Interpretação de
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
- Os exercícios vêm de um banco de **1.800 questões originais** (`data/questions/*.json`,
  compiladas em `data/bundle.js`), com tamanho proporcional à prioridade de cada frente: **150
  questões** nas 6 frentes de prioridade máxima (Interpretação de Texto, Gramática, Matemática/
  RLM, Geografia, Inglês, Atualidades: Geopolítica) e **100 questões** nas 9 restantes. Boa parte
  desse banco (114 ou 64 questões por frente, calibradas em nível **médio ou difícil** — sem
  questões fáceis) foi gerada depois do banco original de 36/frente, para reduzir ainda mais a
  repetição; questões com esse nível marcado mostram um selo "Média"/"Difícil" na tela do
  exercício (questões do banco original, sem esse campo, não mostram selo). Com bancos maiores, a
  repetição caiu bastante: medi diretamente no app antes e depois de cada expansão — o "pior caso"
  (questão mais vista ao longo dos 90 dias) foi de 10-12 repetições (banco de 18/frente) para 5-8
  (36/frente) e agora só **4** (100-150/frente), com uma questão típica se repetindo em média
  **1,4x** em todo o plano. A seleção usa uma janela circular sobre o banco a cada nova visita,
  para variar o subconjunto e a ordem.

## Teoria por frente (gatilhos e pegadinhas)

Antes dos exercícios de cada frente, um bloco colapsável "Teoria: gatilhos e pegadinhas deste
tema" (`data/theory.js`) resume o que mais cai, lista **gatilhos** (padrão do enunciado → método
de resolução, ex.: "aumentou X% e depois diminuiu X%" → nunca volta ao valor original) e
**pegadinhas** comuns daquela frente. Conteúdo original, escrito com base nos dois estudos de
provas reais usados pra `priority-weights.js` — a revisão de 2026-07 priorizou sempre o que o
novo estudo documenta especificamente para a FGV Direito; onde a evidência pública da FGV é fraca
ou ausente (vários casos, sinalizados no comentário de topo do arquivo), o conteúdo se apoia por
analogia no padrão de Vunesp/ENEM/Fuvest, nunca como dado confirmado da FGV. Abrir a teoria de
todos os temas do dia conta como uma das tarefas do checklist (abaixo).

## Essenciais vs. extras

Os exercícios de cada frente são divididos em **essenciais** (as primeiras ~12, meta realista do
dia, com estimativa de tempo tipo "~22 min no ritmo da prova") e **extras** (o resto, opcional,
sem culpa se não fizer). Depois de ver os extras, um botão "Terminei — puxar mais 10" busca mais
questões novas do mesmo banco, pra quem quer treinar além do mínimo do dia — usa a mesma janela
circular do banco, só que continuando de onde a seleção do dia parou.

## Checklist "X/Y do dia"

No topo de cada dia, um card mostra quantas das tarefas do dia já foram concluídas (teoria,
questões essenciais, dissertativa opcional, flashcards do dia) — atualiza sozinho conforme você
avança, sem precisar contar manualmente.

## Cronograma por fases

O Calendário e o topo de cada dia mostram um rótulo de fase: **Arranque** (dias 1-14),
**Semana N** (meio do plano) ou **Reta final** (últimos 10 dias). Sextas-feiras que já incluem
uma revisão (não a 1ª vez no tema) ganham um aviso explicando que aquele dia mistura o assunto
novo com um assunto anterior de propósito (interleaving) — misturar temas em vez de blocos
maciços de um assunto só ajuda a fixar melhor.

## Sessão "SOS" por tema

Na aba **Meu progresso**, cada frente tem um botão "🆘 SOS deste tema" (também aparece direto no
resumo pós-simulado, ao lado de cada frente com erro) que abre uma sessão de resgate: a teoria
daquele tema já expandida + todas as suas questões erradas naquele tema, juntas numa tela só.

## Score projetado e índice de prontidão

Na aba **Meu progresso**:
- **Score projetado**: nota estimada "se a prova fosse hoje", ponderada pelo peso real de cada
  frente (`PRIORITY_WEIGHTS`) — frentes nunca praticadas contam contra a nota, de propósito, pra
  não mascarar o que falta. Um snapshot diário fica salvo (`vd_scoreHistory`) e vira uma mini
  linha do tempo (gráfico de barras) assim que houver mais de um dia registrado.
- **Índice de prontidão por frente**: combina acerto (peso 0,5) + recência do último contato com
  a frente (peso 0,25, decai em 30 dias sem praticar) + volume de prática (peso 0,25) — não só a
  % de acerto crua, já que um tema com 100% de acerto mas praticado uma vez há dois meses não está
  "pronto" do mesmo jeito que um praticado ontem.

## Diagnóstico qualitativo de erro

Também em **Meu progresso**, o card "Como você erra" classifica seus erros por **tipo de
armadilha** (linguagem absoluta, cálculo/leitura de dado, generalização indevida, confusão
conceitual) e por **estilo de questão** (interpretação, aplicação/cálculo, conceito). Essa
classificação é **automática, por padrão de texto no enunciado** — não é uma curadoria manual
questão a questão (com ~540 questões no banco, marcar cada uma à mão não escalaria) — o texto na
UI deixa isso explícito.

## Aba "Cards" (flashcards com repetição espaçada)

Os flashcards são um banco **dedicado e original** (`data/flashcards/*.json`, compilados em
`data/flashcards.js`, 1.209 cards no total, pelo menos 75 por frente) — não são derivados do
banco de questões de múltipla escolha (essa era uma versão anterior, mas virava só repetição da
questão). O formato segue os princípios de repetição espaçada de Piotr Woźniak/SuperMemo e do
Anki: **princípio da informação mínima** (cada card testa um único fato/conceito, nunca uma
pergunta composta), **sem listas/enumerações como resposta** (quebradas em cards individuais),
**recall ativo** (frente é sempre uma pergunta/pista que exige lembrar, verso é uma resposta
direta de 1-2 frases) e **cards formulados para combater interferência** entre conceitos
parecidos (ex.: Kant x Arendt, juros simples x compostos, totalitarismo x banalidade do mal).
Cada obra obrigatória (ver abaixo) também vira um card (frente = título/autor, verso = resumo +
análise pelos eixos). Algoritmo de repetição espaçada simplificado (`vd_flashcardState`):
- **Não sei**: o card reaparece ainda nesta sessão (reinserido um pouco à frente na fila) e de
  novo amanhã.
- **Sei**: o intervalo até reaparecer cresce numa progressão fixa (1 → 3 → 7 → 15 → 30 dias).

A "Revisão do dia" junta os cards vencidos com até 20 cards novos (embaralhados, pra não deixar
os cards de obras "presos" no fim da fila); também dá pra estudar o baralho de uma frente
específica direto na aba.

## Aba "Obras" (obras obrigatórias, só FGV)

A prova de Artes e Questões Contemporâneas da FGV cobra leitura crítica de uma lista fechada de
obras (literatura, artes visuais, cinema, música, ensaios), sempre ligadas aos dois eixos da
banca (globalização / transição da modernidade para a pós-modernidade) — não é decoreba de
enredo. `data/obras.js` traz 56 obras: as 47 obrigatórias do edital 2027.1 mais 9 leituras
complementares, que caíram da lista oficial e ficam marcadas com `foraDoEdital2027: true` (edital
em vestibular.fgv.br, conferido em julho/2026 — vale checar contra a versão mais nova quando o
próximo edital sair). Cada uma tem resumo, contexto histórico/biográfico, pontos-chave
(personagens/técnica/estrutura conforme a categoria), uma cena ou trecho-chave e análise pelos
eixos da banca (tudo comentário crítico original, não reprodução de trechos das obras nem de
letras de música). Filtro por categoria, contador de estudadas sobre as obrigatórias e marcação
individual de "já estudei". Cada obra também tem um bloco "Praticar (5 questões)" com questões de
múltipla escolha de fixação, no mesmo formato do banco de questões principal
(`data/obras-questoes.js`) — as 55 questões das obras acrescentadas pelo edital 2027.1 já nascem
com 5 alternativas, enquanto as 225 anteriores seguem em 4 até a migração. O `verify-banco.ps1`
cobre esse banco junto com os de `data/questions/` e reprova se alguma obra obrigatória ficar sem
as cinco. Sem equivalente na prova do Insper.

## Sincronização entre aparelhos / backup

Na aba **Meu progresso**:
- **Exportar/importar progresso (.json)**: sempre disponível, não depende de nenhuma
  configuração — baixa um arquivo com todo o seu progresso, pra guardar como backup ou levar pra
  outro aparelho manualmente.
- **Sincronização em tempo real por código**: opcional, via Firebase Firestore (só client-side,
  sem servidor próprio). Enquanto `data/sync-config.js` não for configurado com as chaves de um
  projeto Firebase (instruções completas nos comentários do próprio arquivo), essa parte fica
  desativada e o app segue 100% local, exatamente como sempre funcionou — só o
  exportar/importar manual fica disponível.

## Aba "Simulados"

Uma aba própria na navegação principal, separada de "Hoje" e do "Calendário", com duas telas:

- **Lista**: todos os simulados do seu plano (data e status — não realizado / em andamento / concluído
  com nota final).
- **Detalhe** (ao clicar em um simulado): nota final e, abaixo, **acertos por cada uma das 15
  frentes** (com barra de progresso — o total por frente varia conforme a prioridade dela, não é
  mais fixo em 3), além de um atalho para reabrir aquele dia em "Hoje", um botão **"Refazer só as
  N erradas"** (limpa só as respostas erradas daquele simulado específico, sem afetar outras
  respostas suas na mesma frente) e **"Refazer o simulado inteiro"**.

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

Em 2026-07 o banco de questões e a teoria por frente também passaram por uma revisão apoiada em
`estudo-formulacao-provas-objetivas-fgv-vunesp-enem-fuvest-2016-2025.pdf`, que documenta o método
real de formulação (estrutura de comando, uso de texto-base, lógica de distratores) da FGV Direito
e, por comparação, de Vunesp/ENEM/Fuvest. O princípio de originalidade continua o mesmo: nenhuma
questão do banco é copiada ou adaptada de prova real — o estudo serve só para calibrar o *estilo*
(como uma questão nova deveria ser formulada), nunca como fonte de conteúdo a reproduzir. Onde a
evidência pública sobre a FGV é fraca (o próprio estudo sinaliza isso caso a caso), o app se
inspira no estilo de outras bancas por analogia, deixando essa ressalva registrada nos comentários
de `data/theory.js`.

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

Como o banco de questões é reutilizado ao longo dos 90 dias (spaced repetition), a mesma questão
pode cair em mais de um dia do plano. Cada ocorrência é rastreada separadamente
(`vd_dayAnswers`): responder a questão num dia não a marca como respondida em outro dia em que
ela reaparece — ela nasce zerada de novo, exatamente como se fosse a primeira vez. As
estatísticas por frente (`vd_topicState`, Caderno de Erros, score projetado) continuam olhando
pra questão como um todo, usando sempre a resposta mais recente dada a ela, não importa em qual
dia.

## Expandindo o banco de questões

Para adicionar mais questões a um tema, edite o JSON correspondente em `data/questions/` (mesmo
schema: `id`, `texto_apoio`, `enunciado`, `alternativas` a-d, `resposta`, `explicacao`) e depois
regenere `data/bundle.js`. Sem Node/Python instalados, o comando PowerShell usado para gerar o
bundle está documentado no histórico do projeto — ou simplesmente edite `data/bundle.js`
diretamente, já que ele é só o mesmo JSON atribuído a `window.QUESTION_BANKS`.
