# Plano: piso de 25 questões por assunto

**Objetivo.** Nenhum dos 163 assuntos de `vestibular-direito-v2/assuntos.js` devolve menos de
25 questões quando o aluno o escolhe na aba Buscar.

**Medição.** Snapshot de 08/08/2026 12:55 — 4.332 questões indexadas (2.340 Medicina + 1.992
Direito), 163 assuntos. O banco de Medicina cresceu de 2.170 para 2.340 durante a própria
auditoria, então **remeça antes de executar**: as três primeiras linhas da tabela §1.1 mudaram
duas vezes em vinte minutos.

Plano irmão: [PLANO-BUSCA-ACHABILIDADE.md](PLANO-BUSCA-ACHABILIDADE.md). Os dois são separados
de propósito, mas há uma dependência de ordem que a §1.3 explica e que não é opcional.

## Estado da execução (08/08/2026)

A **Fase 0 está feita**: `vestibular-direito-v2/auditar-busca.js` já roda e reprova com código 1.
Rode-o antes de usar qualquer número deste documento — a tabela §1.1 é um retrato de 12:55 e o
banco anda:

```bash
node vestibular-direito-v2/auditar-busca.js --piso 25
```

O auditor acabou entregando mais do que medir: foi ele que achou o defeito do texto de apoio da
trilha secundária (D7 do plano irmão, já corrigido), que sozinho tirou 3 assuntos de baixo do
piso. A Fase 1 (remedição pós-dicionário) ainda não pode fechar porque a F1 do plano irmão está
em andamento.

---

## 1. Diagnóstico

### 1.1 Os 40 assuntos abaixo do piso

Déficit somado: **334 questões** para o piso de 25. Nenhum assunto está zerado. Três estão
empatados exatamente em 25 e entram na conta ao primeiro deslize: Inferência e implícito,
Eletromagnetismo, Propósito e tom (inglês).

| Assunto | Área | Hoje (med/dir) | Falta | Frentes |
|---|---|---:|---:|---|
| Raciocínio lógico | Matemática | 1 (0/1) | 24 | d:matematica-rlm |
| Regulação e moderação de conteúdo | Atualidades | 2 (0/2) | 23 | d:atualidades-tecnologia |
| Ideia central (inglês) | Linguagens | 3 (0/3) | 22 | ingles |
| Função quadrática | Matemática | 7 (3/4) | 18 | matematica-rlm, matematica |
| Imperialismo e partilha | Humanas | 7 (4/3) | 18 | historia-geral, historia |
| Inclusão e exclusão digital | Atualidades | 8 (0/8) | 17 | atualidades-tecnologia, geografia |
| América Latina | Humanas | 8 (4/4) | 17 | historia-geral, historia |
| Movimentos sociais do século XX | Humanas | 11 (6/5) | 14 | historia-geral, historia, filosofia-sociologia |
| Sociologia do trabalho | Humanas | 12 (6/6) | 13 | filosofia-sociologia, atualidades-tecnologia |
| Funções da linguagem | Linguagens | 13 (6/7) | 12 | interpretacao-texto, literatura |
| Equilíbrio químico | C. Natureza | 13 (13/0) | 12 | quimica, ciencias-natureza |
| Hidrostática | C. Natureza | 13 (10/3) | 12 | fisica, ciencias-natureza |
| Colocação pronominal | Linguagens | 14 (8/6) | 11 | gramatica |
| Sociologia urbana e violência | Humanas | 14 (8/6) | 11 | filosofia-sociologia, geografia |
| Teoria do conhecimento | Humanas | 16 (11/5) | 9 | filosofia-sociologia |
| Matemática financeira aplicada | Matemática | 16 (8/8) | 9 | matematica-rlm, matematica |
| Zoologia | C. Natureza | 16 (14/2) | 9 | biologia, ciencias-natureza |
| Filosofia antiga | Humanas | 17 (12/5) | 8 | filosofia-sociologia |
| Contratualismo e Estado | Humanas | 17 (4/13) | 8 | filosofia-sociologia, direitos-humanos |
| Quinhentismo, Barroco e Arcadismo | Linguagens | 18 (9/9) | 7 | literatura |
| Mundo pós-1991 | Humanas | 19 (4/15) | 6 | historia-geral, historia, atualidades-geopolitica |
| Cartografia | Humanas | 19 (15/4) | 6 | geografia |
| Botânica | C. Natureza | 20 (20/0) | 5 | biologia, ciencias-natureza |
| Óptica | C. Natureza | 21 (18/3) | 4 | fisica, ciencias-natureza |
| Gravitação | C. Natureza | 21 (19/2) | 4 | fisica, ciencias-natureza |
| Sistemas lineares | Matemática | 21 (17/4) | 4 | matematica-rlm, matematica |
| Exponencial e logaritmo | Matemática | 22 (18/4) | 3 | matematica-rlm, matematica |
| Progressões (PA e PG) | Matemática | 22 (18/4) | 3 | matematica-rlm, matematica |
| Trigonometria | Matemática | 22 (15/7) | 3 | matematica-rlm, matematica |
| Ligações químicas | C. Natureza | 22 (20/2) | 3 | quimica, ciencias-natureza |
| Antiguidade e Idade Média | Humanas | 22 (12/10) | 3 | historia-geral, historia |
| Biotecnologia | C. Natureza | 22 (15/7) | 3 | biologia, ciencias-natureza |
| Análise combinatória | Matemática | 23 (17/6) | 2 | matematica-rlm, matematica |
| Cinética química | C. Natureza | 23 (19/4) | 2 | quimica, ciencias-natureza |
| Eletroquímica | C. Natureza | 23 (21/2) | 2 | quimica, ciencias-natureza |
| Saúde, sociedade e bioética | Humanas | 23 (20/3) | 2 | filosofia-sociologia, atualidades, biologia |
| Estudo dos gases | C. Natureza | 23 (23/0) | 2 | fisica, ciencias-natureza, quimica |
| Estatística | Matemática | 24 (14/10) | 1 | matematica-rlm, matematica |
| Evolução | C. Natureza | 24 (17/7) | 1 | biologia, ciencias-natureza |
| Geometria analítica | Matemática | 24 (16/8) | 1 | matematica-rlm, matematica |

Sete ids de frente existem nas **duas** trilhas (`artes-cultura`, `filosofia-sociologia`,
`geografia`, `gramatica`, `ingles`, `interpretacao-texto`, `literatura`). Onde a coluna
"Frentes" não traz prefixo, o escopo do assunto pega os dois bancos e a questão nova pode
entrar em qualquer um dos dois arquivos.

### 1.2 A descoberta que muda o plano

**O número medido é cobertura de vocabulário, não cobertura de conteúdo.**

Um assunto não conta uma questão porque ela é "sobre o tema". Conta porque o texto da questão
casa, por palavra inteira, algum dos `termos` daquele assunto — e porque a questão está numa
das `frentes` dele ([app.js:2033](vestibular-direito-v2/app.js:2033)). Uma questão impecável
de hidrostática que só fale em "o bloco submerso desloca" e nunca escreva "empuxo" nem
"Arquimedes" não conta para Hidrostática.

Sondei o tamanho do buraco de duas formas. A automática compara o alcance do dicionário com um
casamento frouxo pelas palavras do próprio nome do assunto; ela só funciona quando o nome tem
várias palavras, e nesses casos acusou 18 dos 40:

| Assunto | Dicionário alcança | Sonda frouxa | Escopo |
|---|---:|---:|---:|
| Movimentos sociais do século XX | 11 | 237 | 550 |
| Saúde, sociedade e bioética | 23 | 162 | 603 |
| Estudo dos gases | 23 | 103 | 530 |
| Sociologia urbana e violência | 14 | 89 | 579 |
| Funções da linguagem | 13 | 84 | 600 |
| Sociologia do trabalho | 12 | 77 | 350 |
| Contratualismo e Estado | 17 | 70 | 350 |
| Equilíbrio químico | 13 | 60 | 320 |
| Ideia central (inglês) | 3 | 47 | 360 |

Para os de nome de uma palavra só, a sonda automática é cega — "Zoologia" com zero acertos
frouxos quer dizer que a palavra "zoologia" não aparece no banco, e não que não haja questão de
zoologia. Nesses escrevi o vocabulário à mão:

| Assunto | Dicionário alcança | Sonda manual | Amostra do que a sonda pegou |
|---|---:|---:|---|
| Cartografia | 19 | 72 | latitude, escala, mapa, longitude, projeção, GPS |
| Botânica | 20 | 69 | vegetal, raiz, planta, árvore, clorofila, flor |
| Hidrostática | 13 | 63 | densidade, pressão, fluido, submerso, flutua |
| Geometria analítica | 24 | 78 | plano cartesiano, coordenada, abscissa, circunferência |
| Progressões (PA e PG) | 22 | 60 | razão, progressão, aritmética, a1 |
| Zoologia | 16 | 50 | inseto, peixe, vertebrado, ave, ectotérmico, verme |
| Estatística | 24 | 41 | média, moda, amostra, pesquisa |
| Trigonometria | 22 | 38 | ângulo, hipotenusa, cosseno, seno, tangente |
| Óptica | 21 | 33 | reflexão, espelho, luz, lente, refração |
| Eletroquímica | 23 | 26 | eletrodo, pilha, ânodo, eletrólise, corrosão |
| Filosofia antiga | 17 | 20 | Platão, grego, Sócrates, Aristóteles, pólis |
| Raciocínio lógico | 1 | 20 | algum, todo, nenhum, conclusão |

A sonda é **limite superior**, não medida: "pressão" aparece em questão de clima, "média" em
qualquer contexto, "razão" em problema de proporção que não é PA nem PG. Ainda assim a direção
é inequívoca — na maioria dos 40, o conteúdo existe e é o dicionário que não chega nele.

O caso que resume tudo: **"Raciocínio lógico" alcança 1 questão numa frente de 150 chamada
"Matemática Básica e Raciocínio Lógico".**

### 1.3 Consequência: a ordem não é opcional

Escrever as 334 questões agora produziria conteúdo redundante em cima de um banco que já tem o
tema, e ainda deixaria o assunto invisível na busca — porque a questão nova só conta se usar o
vocabulário que o dicionário lista, e é justamente esse vocabulário que está incompleto.

Então:

1. Roda a **Fase 1 do plano de busca** (sinônimos em `assuntos.js` — dado, não código).
2. Remede.
3. Escreve questão só para o que sobrar.

Estimativa honesta do que sobra: não dá para prever sem fazer. As sondas sugerem que o déficit
real fica bem abaixo dos 334, mas o número só aparece depois do passo 1.

---

## 2. O que faz uma questão contar (briefing de escrita)

Regra mecânica, tirada de `buscarQuestoes` e `buscaCandidatos`:

- **Escopo.** A questão precisa estar numa das `frentes` do assunto. Escrever hidrostática em
  `geografia.json` não conta para Hidrostática, cujas frentes são `fisica` e `ciencias-natureza`.
- **Termo.** O texto indexado — enunciado + texto de apoio + alternativas + explicação — precisa
  conter, **por palavra inteira**, pelo menos um dos `termos` do assunto. Plural é resolvido pelo
  motor (`-s`/`-es`), acento é ignorado, pedaço de palavra **não** casa: "mol" não pega
  "molécula".
- **Termo de várias palavras** exige a frase contígua, não as palavras espalhadas. "função
  quadrática" não casa um texto que diga "função" num parágrafo e "quadrática" em outro.
- **A explicação conta.** É o campo mais barato para garantir vocabulário sem forçar o enunciado:
  uma questão de empuxo cujo enunciado fale só em "o bloco flutua" passa a contar para
  Hidrostática se a explicação disser "princípio de Arquimedes".

Daí a regra de escrita: **toda questão nova nomeia o fenômeno em algum lugar do texto.** Não é
concessão ao buscador — é o que a banca faz. Nenhum dos dois é servido por uma questão que
esconde o próprio assunto.

---

## 3. Fases

### Fase 0 — instalar o auditor (pré-requisito de tudo)

Hoje a medição existe só como script de sessão. Sem ela no repositório, nenhuma fase deste
plano tem critério de aceite verificável.

Entregar `vestibular-direito-v2/auditar-busca.js`, que:

- carrega `vestibular-medicina/data/{subtopics,bundle}.js` e
  `vestibular-direito/data/{subtopics,bundle}.js` em um contexto `vm` com `window`;
- **reusa as funções de `app.js`**, em vez de copiá-las — cópia diverge, e uma auditoria que
  mede um motor diferente do que roda no navegador é pior do que auditoria nenhuma. O caminho
  mínimo é extrair o bloco de busca de `app.js` para um arquivo carregado pelos dois lados;
- imprime, por assunto: total, quebra por trilha, déficit para o piso;
- sai com código 1 se algum assunto ficar abaixo do piso, para encadear com `verify-banco.ps1`.

Enquanto a extração não acontece, vale a réplica — mas com um teste que compara réplica e
original função por função, que foi como esta auditoria se validou.

### Fase 1 — remedição pós-dicionário

Depois da Fase 1 do plano de busca, rodar o auditor e **reescrever a tabela §1.1**. É esta lista
nova, e não a de hoje, que dimensiona a Fase 2.

### Fase 2 — escrever, por arquivo de destino

Ordem por volume, com os destinos de hoje (pior caso, sem o ganho da Fase 1):

| Arquivo | Falta | Assuntos |
|---|---:|---|
| `medicina/historia.json` | 58 | Imperialismo (+18), América Latina (+17), Movimentos sociais (+14), Mundo pós-1991 (+6), Antiguidade e Idade Média (+3) |
| `filosofia-sociologia.json` (dir+med) | 51 | Sociologia do trabalho (+13), Sociologia urbana (+11), Teoria do conhecimento (+9), Filosofia antiga (+8), Contratualismo (+8), Bioética (+2) |
| `medicina/matematica.json` | 44 | Função quadrática (+18), Matemática financeira (+9), Sistemas lineares (+4), e mais seis de 1 a 3 |
| `direito/matematica-rlm.json` | 24 | Raciocínio lógico (+24) |
| `direito/atualidades-tecnologia.json` | 23 | Regulação e moderação (+23) |
| `geografia.json` (dir+med) | 23 | Inclusão digital (+17), Cartografia (+6) |
| `ingles.json` (dir+med) | 22 | Ideia central (+22) |
| `medicina/fisica.json` | 22 | Hidrostática (+12), Óptica (+4), Gravitação (+4), Gases (+2) |
| `medicina/quimica.json` | 19 | Equilíbrio (+12), Ligações (+3), Cinética (+2), Eletroquímica (+2) |
| `medicina/biologia.json` | 18 | Zoologia (+9), Botânica (+5), Biotecnologia (+3), Evolução (+1) |
| `interpretacao-texto.json` (dir+med) | 12 | Funções da linguagem (+12) |
| `gramatica.json` (dir+med) | 11 | Colocação pronominal (+11) |
| `literatura.json` (dir+med) | 7 | Quinhentismo/Barroco/Arcadismo (+7) |

Lotes por arquivo, não por assunto: o custo fixo é abrir o JSON, rodar o build e rodar o
verificador, e ele se paga uma vez por arquivo.

### Fase 3 — trava

Ligar o auditor no encadeamento de build (`build-bundle.ps1` → `verify-banco.ps1` →
`auditar-busca.js`) com o piso em 25, para que um assunto novo em `assuntos.js` sem lastro no
banco reprove na hora em que é acrescentado, e não meses depois.

---

## 4. Restrições que toda questão nova precisa respeitar

Já existem e reprovam o lote se violadas — `vestibular-medicina/verify-banco.ps1` e
`vestibular-direito/verify-banco.ps1`:

- **Cinco alternativas.** Seis das sete bancas de Medicina usam cinco; só a Unicamp usa quatro.
- **Gabarito distribuído.** ~20% em cada letra.
- **Catraca de chutabilidade** (`data/reescritas/_chutabilidade.json`): o placar sai em toda
  rodada e o lote novo não pode piorar a taxa da frente além da tolerância de 1 ponto. Distrator
  curto demais, distrator absoluto ("sempre", "nunca") e alternativa correta mais longa que as
  outras são as três causas conhecidas. O `-ChuteEstrito`, que cobra o alvo em vez de só barrar
  a piora, segue desligado.
- **Tripwire de contagem** (`data/reescritas/_contagem.json`): a contagem só cresce. **Existe em
  Direito e ainda não em Medicina** — o script trata a ausência do arquivo como "sem baseline" e
  segue, então em Medicina essa trava está dormente. Gerá-la com `-AtualizarContagem` antes de
  começar a Fase 2 é barato e evita perder questão por engano no meio de um lote grande.
- **Escada I/II/III no jogo fixo**, quando o formato for `escada` (`-EscadaEstrita`, ligado).
- **Acento não corrompido.** `build-bundle.ps1` reprova a sequência `Ã`/`Â` seguida de byte de
  continuação — é a assinatura de arquivo salvo em codificação errada, e já passou batido uma vez.

E a regra de conteúdo da §2: **nomear o fenômeno no texto.**

---

## 5. De onde tirar o conteúdo

`vestibular-medicina/estudo-anatomia-provas-medicina-sp-2025-2026.md`, que já mediu as sete
bancas caderno a caderno. Três leituras dele mudam a prioridade dentro da Fase 2:

- **Geografia para Medicina não é matéria secundária.** Na 2ª fase da FUVEST vale o mesmo que
  Biologia — 25% do dia 2. Cartografia com 19 questões é um buraco maior do que parece na tabela.
- **Ciências da Natureza não domina nenhuma das sete provas objetivas.** O máximo é 38%
  (Santa Casa). Linguagens e Humanas somam mais em todas — o que é coerente com os déficits
  estarem concentrados em História, Filosofia e Sociologia.
- **Item de duas lacunas é formato de Unesp, Santa Casa e Einstein**, e não aparece nenhuma vez
  na FUVEST, Unicamp e PUC-SP. As questões novas de Medicina são a chance de subir a contagem
  do formato `lacunas`, hoje rara nos dois bancos.

Para a trilha de Direito, o equivalente é
`vestibular-direito/estudo-anatomia-provas-fgv-insper-2025-2026.md` e o plano que já existe em
`vestibular-direito/PLANO-ALINHAMENTO-BANCO.md`.

---

## 6. Critérios de aceite

1. `auditar-busca.js` sai com código 0 no piso de 25 — nenhum dos 163 assuntos abaixo.
2. `verify-banco.ps1` passa nas duas trilhas, sem regressão de chutabilidade nem de contagem.
3. Os 80 termos de currículo do plano de busca (§ Fase 5 de lá) devolvem 25 ou mais.
4. Nenhuma questão nova entrou num arquivo fora do escopo do assunto que ela deveria atender —
   verificável pelo próprio auditor, que conta por frente.

---

## 7. O que este plano não resolve

- **Não mede qualidade, mede alcance.** Um assunto pode chegar a 25 com questões fracas; quem
  cobra qualidade é o `verify-banco.ps1` e a revisão contra o estudo de anatomia.
- **O piso de 25 é uniforme e a prova não é.** Biologia para a Santa Casa e Geografia para a
  FUVEST mereceriam piso maior que Filosofia antiga; um piso proporcional ao peso do edital é
  um segundo passo, depois que ninguém estiver mais abaixo de 25.
- **Não cria assunto novo.** Se um tema de edital não tem entrada em `assuntos.js`, ele não
  aparece nesta auditoria — está invisível, não deficitário. Isso é escopo do plano de busca.
- **Se o piso for estritamente "mais de 25"**, some 1 por assunto: 43 assuntos e 377 questões
  no pior caso, em vez de 40 e 334.
