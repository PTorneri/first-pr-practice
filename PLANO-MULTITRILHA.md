# Plano: duas trilhas no mesmo app (Direito e Medicina)

Objetivo: na criação da conta, a pessoa escolhe **Direito** ou **Medicina**, e o app monta o plano
de 90 dias com o conteúdo, os pesos e os simulados daquele curso.

Base de conteúdo: `vestibular-medicina/estudo-anatomia-provas-medicina-sp-2025-2026.md` (25 cadernos
oficiais de FUVEST, Unicamp, Unesp, Unifesp, Einstein, Santa Casa e PUC-SP), do mesmo modo como
`estudo-anatomia-provas-fgv-insper-2025-2026.md` sustenta a trilha de Direito hoje.

Base de código: `vestibular-direito-v2/` (app.js, schedule.js, auth.js, sync.js, index.html) e
`vestibular-direito/data/` (10 arquivos de dados).

---

## 1. Diagnóstico do código atual

### 1.1 O que já está pronto e serve às duas trilhas

| Componente | Arquivo | Reaproveitamento |
|---|---|---|
| Login Google + persistência | `auth.js` | **100%** — não depende de conteúdo |
| Motor de sync com mesclagem por chave | `sync.js` | **~90%** — só a lista de chaves muda |
| Trava "não escreve sem ter lido" | `sync.js` | **100%** — vale igual nas duas |
| Regras do Firestore | `firestore.rules` | **100%** — `users/{uid}` já é por pessoa |
| Motor de agendamento de 90 dias | `schedule.js` | **~70%** — constantes precisam virar config |
| Caderno de Erros, flashcards SRS, score projetado, ofensiva | `app.js` | **~85%** — são genéricos sobre `SUBTOPICS` |
| Painel admin | `admin.js` | **~80%** — precisa segmentar por trilha |

### 1.2 Os cinco pontos que travam a segunda trilha

| # | Achado | Onde | Consequência |
|---|---|---|---|
| T1 | Todas as chaves de progresso usam um namespace único (`v2_vd_*`) | `app.js:8–41` | Duas trilhas na mesma conta se sobrescrevem |
| T2 | Os 10 arquivos de dados são carregados por `<script>` fixo apontando para `../vestibular-direito/data/` | `index.html:237–246` | Não há como carregar outro conteúdo sem editar o HTML |
| T3 | Os dados são globais planos (`window.SUBTOPICS`, `window.QUESTION_BANKS`…) | `data/*.js` | Duas trilhas carregadas juntas colidem no mesmo nome |
| T4 | Constantes do plano são fixas e calibradas para Direito | `schedule.js:23–29`, `:475` | Simulado de 45 e cadernos oficiais FGV/Insper não servem a Medicina |
| T5 | Três abas e o onboarding são específicos de Direito | `index.html:87–121, 129–136` | "Obras obrigatórias da FGV" não existe em Medicina |

**T1 e T3 são os únicos bloqueadores reais.** Os outros três são trabalho mecânico.

### 1.3 O precedente que já existe no código

O app **já tem** o conceito de prova-alvo com pesos próprios:
`window.PRIORITY_WEIGHTS_POR_BANCA` (`data/priority-weights.js:29`) separa FGV e Insper, e
`window.BANCA_ALVO` escolhe entre elas ou combina pelo maior peso.

A trilha é **a mesma ideia um nível acima**: em vez de escolher a banca dentro de Direito, escolher
o curso e, dentro dele, a banca. Isso não é uma reforma da arquitetura — é a generalização de um
padrão que já provou funcionar aqui.

E o prefixo `v2_` (`app.js:8`) já é a prova de que separar espaços de progresso por namespace
funciona neste app: foi exatamente assim que o v2 passou a conviver com o v1 sem destruí-lo.

---

## 2. Decisão de produto que gera o desenho

Três caminhos possíveis:

| | A — Trilha fixa na conta | **B — Trilha ativa, trocável** | C — Duas trilhas simultâneas |
|---|---|---|---|
| Escolhe no cadastro | sim, irreversível | sim, mas pode trocar depois | escolhe as duas |
| Progresso guardado | 1 conjunto | **2 conjuntos, isolados** | 2 conjuntos + visão unificada |
| Ofensiva / score | simples | **simples (por trilha ativa)** | ambíguo: qual streak? |
| Peso de dados no navegador | 1 trilha | **1 trilha por vez** | 2 trilhas (~10 MB) |
| Custo de implementação | baixo | **baixo-médio** | alto |
| Risco | pessoa erra a escolha e trava | **baixo** | UI e métricas ficam confusas |

**Recomendação: B.** Custa pouco mais que A, elimina o risco de escolha errada, e evita a
ambiguidade de C — que apareceria logo na ofensiva e no score projetado, duas features já prontas
que assumem uma linha do tempo única.

Em B, "trocar de trilha" **nunca apaga nada**: cada trilha tem seu próprio espaço, e voltar
para a anterior devolve o plano onde estava.

> **Confirmar antes da Fase 1:** se a intenção for A (mais simples, sem tela de troca), a Fase 2
> encolhe pela metade e a Fase 6 desaparece. O resto do plano é idêntico.

---

## 3. Fase 1 — Namespace por trilha (resolve T1)

### 3.1 Mudança em `app.js`

O prefixo deixa de ser constante e passa a depender da trilha ativa, lida antes de tudo:

```js
// hoje:  const NS = "v2_";
// vira:
const TRILHA = window.VD_TRILHA.atual();   // "direito" | "medicina"
const NS = "v2_" + (TRILHA === "medicina" ? "med_" : "dir_") + "";
```

Todas as 18 chaves derivam de `NS`, então **nenhuma outra linha de `app.js` muda**. As chaves passam
a ser `v2_dir_vd_answers`, `v2_med_vd_answers`, e assim por diante.

### 3.2 Chave nova, fora do namespace

Uma única chave precisa viver fora das trilhas, porque é ela que diz qual trilha carregar:

```js
const LS_TRILHA = "v2_trilha";   // "direito" | "medicina"
```

Ela sobe para a nuvem junto com o resto (entra em `SYNCABLE_KEYS`), com estratégia de mesclagem
padrão — vence a escolha mais recente, que é a que a pessoa acabou de fazer em algum aparelho.

### 3.3 Firestore: o documento **não muda de formato**

Este é o ponto que economiza a maior parte do trabalho. O `sync.js` grava um mapa plano em
`users/{uid}.data`, indexado pela própria chave do localStorage (`sync.js:194–202`). Como a chave já
carrega a trilha no nome, **os dois conjuntos convivem no mesmo mapa sem colidir**.

E o `setDoc(..., { merge: true })` (`sync.js:214–218`) garante que escrever a trilha ativa não apaga
a outra — é exatamente o comportamento que o comentário daquela linha já descreve.

Resultado: `firestore.rules` não muda, `admin.js` continua lendo o mesmo documento, e não há
migração de schema no servidor.

### 3.4 Migração dos usuários que já existem

Todo mundo hoje tem chaves `v2_vd_*` e está estudando Direito. A migração é uma renomeação local,
com o mesmo padrão de `migrateFromV1()` (`sync.js:168–190`):

```js
function migrarParaTrilhaDireito() {
  const jaMigrou = localStorage.getItem("v2_trilha") !== null;
  if (jaMigrou) return false;
  const meta = loadMeta();
  let copiou = 0;
  CHAVES_BASE.forEach((base) => {                  // ex.: "vd_answers"
    const antiga = "v2_" + base;
    const nova   = "v2_dir_" + base;
    const valor = localStorage.getItem(antiga);
    if (valor !== null && localStorage.getItem(nova) === null) {
      localStorage.setItem(nova, valor);
      meta[nova] = meta[antiga] || 1;              // PRESERVA o carimbo original
      copiou++;
    }
  });
  localStorage.setItem("v2_trilha", "direito");
  if (copiou) saveMeta(meta);
  return copiou > 0;
}
```

**Diferença crítica em relação ao `migrateFromV1`:** ali o carimbo vira `1` de propósito, porque o
dado do v1 é antigo. Aqui **o carimbo original tem de ser preservado** — é o mesmo dado, com a mesma
idade. Carimbar com `1` faria o progresso real perder para qualquer aparelho desatualizado; carimbar
com `Date.now()` faria o contrário. Os dois erros são silenciosos e destroem progresso.

As chaves `v2_vd_*` antigas **ficam onde estão**, como cópia de segurança — mesma decisão que foi
tomada com o v1.

Ordem obrigatória dentro de `start()`: migrar local → `pullAndMerge()` → liberar `podeEscrever`.
A migração nunca pode rodar depois da leitura da nuvem.

### 3.5 Critérios de aceite

- [ ] Conta existente abre no plano de Direito com o progresso intacto, sem ver tela de escolha
- [ ] `v2_vd_answers` continua no localStorage após a migração
- [ ] Trocar de trilha e voltar devolve o mesmo dia e o mesmo Caderno de Erros
- [ ] Estudar Medicina no celular e Direito no computador não mistura nada no Firestore
- [ ] `apagarTudoNaNuvem()` continua apagando **as duas** trilhas (é o documento inteiro)

---

## 4. Fase 2 — Carregamento de dados por trilha (resolve T2 e T3)

### 4.1 O problema

`index.html:237–246` carrega 10 arquivos com caminho fixo, e cada um faz `window.X = ...`. Somados,
são ~5,7 MB só de Direito. Carregar as duas trilhas sempre seria desperdício e colisão de nomes.

### 4.2 Solução: registro por trilha + carregamento sob demanda

Um arquivo novo, `trilhas.js`, carregado antes de tudo e sem dependências:

```js
window.VD_TRILHAS = {
  direito: {
    id: "direito",
    nome: "Direito",
    subtitulo: "FGV Direito SP e Insper",
    bancas: ["fgv", "insper"],
    dataDir: "../vestibular-direito/data/",
    arquivos: ["subtopics","theory","obras","obras-questoes","flashcards",
               "priority-weights","video-topics","bundle","dissertativas","redacoes"],
    abas: ["hoje","calendario","simulados","cards","redacao","obras","erros","progresso"],
  },
  medicina: {
    id: "medicina",
    nome: "Medicina",
    subtitulo: "FUVEST, Unicamp, Unesp, Unifesp, Einstein, Santa Casa e PUC-SP",
    bancas: ["fuvest","unicamp","unesp","unifesp","einstein","santacasa","pucsp"],
    dataDir: "../vestibular-medicina/data/",
    arquivos: ["subtopics","theory","flashcards","priority-weights","video-topics",
               "bundle","dissertativas","redacoes"],
    abas: ["hoje","calendario","simulados","cards","redacao","erros","progresso"],
  },
};

window.VD_TRILHA = {
  atual() { return localStorage.getItem("v2_trilha") || null; },
  definir(id) { localStorage.setItem("v2_trilha", id);
                if (window.VD_SYNC) window.VD_SYNC.markDirty("v2_trilha"); },
  config() { return window.VD_TRILHAS[this.atual()]; },
  carregar(id) { /* injeta os <script> da trilha e resolve quando todos carregarem */ },
};
```

`carregar()` injeta os `<script>` na ordem declarada e devolve uma Promise. Como só uma trilha é
carregada por vez, **os nomes globais continuam sendo os mesmos** (`window.SUBTOPICS` etc.) e
`app.js` e `schedule.js` não precisam saber que existem trilhas.

Essa é a escolha de menor risco: o custo de trocar de trilha passa a ser um `location.reload()`, o
que é aceitável para uma ação rara, e evita reescrever os dois maiores arquivos do projeto.

### 4.3 Mudança em `index.html` e `auth.js`

Os 10 `<script>` de dados saem do HTML. Ficam só `trilhas.js`, `schedule.js`, `app.js`, `auth.js`.

O fluxo do `auth.js` (`showLoggedIn`, linhas 121–157) ganha um passo entre o sync e o boot:

```
onAuthStateChanged(user)
  → VD_SYNC.start(user)                 [inalterado: baixa e mescla]
  → se !ok  → tela de falha de sync     [inalterado]
  → trilha = VD_TRILHA.atual()
      → se null   → view-escolha-trilha  ← NOVO
      → se existe → VD_TRILHA.carregar(trilha) → view-onboarding → VD_BOOT()
```

A escolha da trilha vem **depois** do sync, de propósito: quem já escolheu em outro aparelho não pode
ser perguntado de novo. Isso reaproveita a trava que já existe — o app não sobe sem ter lido a nuvem
(`auth.js:140–150`), e essa decisão já está documentada ali como a correção de um bug real.

### 4.4 Critérios de aceite

- [ ] Conta nova vê a tela de escolha; conta existente não vê
- [ ] Escolher Medicina não baixa nenhum byte de `vestibular-direito/data/`
- [ ] Escolher em um aparelho e abrir em outro já entra na trilha certa, sem perguntar
- [ ] Falha ao carregar um arquivo de dados mostra erro, e não um app pela metade

---

## 5. Fase 3 — Conteúdo de Medicina (o grosso do trabalho)

**Esta é a fase cara.** As Fases 1, 2, 4 e 6 são dias de código; esta é semanas de conteúdo. Direito
tem hoje **1.992 questões em 16 frentes**. Medicina precisa do equivalente.

### 5.1 As 13 frentes, derivadas do estudo

| id | Área | Justificativa no estudo |
|---|---|---|
| `biologia` | Natureza | 8 de 20 discursivas na Santa Casa; 7 de 18 na 2ª fase da Unicamp |
| `quimica` | Natureza | 5 objetivas fixas no Einstein; 5 na 2ª fase da Unicamp |
| `fisica` | Natureza | ausente na 2ª fase da Unicamp, presente em todas as outras |
| `matematica` | Matemática | 10 no Einstein e 12 na Unicamp; 8 de 90 na Unesp |
| `interpretacao-texto` | Linguagens | 20 das 30 de Linguagens na Unesp; base da Prova I da Unifesp |
| `gramatica` | Linguagens | bloco mais técnico do conjunto está na Unifesp |
| `literatura` | Linguagens | 10 questões de Machado num único bloco na Santa Casa |
| `ingles` | Linguagens | 10 na Santa Casa e na Unifesp; **discursiva** no Einstein |
| `historia` | Humanas | 10 na Santa Casa; parte das 12 discursivas da Unesp |
| `geografia` | Humanas | **está na 2ª fase da USP para Medicina** (`B-F-G-Q`) |
| `filosofia-sociologia` | Humanas | 4 discursivas na 2ª fase da Unesp 2026.1 |
| `artes` | Humanas | ~7 questões na 1ª fase da FUVEST |
| `atualidades` | Humanas | janela de 17 dias entre fonte e prova na Unicamp |

Frentes de Direito que **não** se transportam: `direitos-humanos`, `atualidades-politica` como frente
isolada. Frentes novas em relação a Direito: `biologia`, `quimica`, `fisica`.

### 5.2 `priority-weights.js` da trilha — pronto para copiar

Derivado direto das tabelas do estudo. Escala idêntica à de Direito (3 = máxima, 0 = não cai).

```js
window.PRIORITY_WEIGHTS_POR_BANCA = {
  // 2ª fase de Medicina é B-F-G-Q: Geografia vale o mesmo que Biologia,
  // e Matemática NÃO cai na 2ª fase (Anexo III, Resolução CoG 8832).
  fuvest:    { biologia:3, quimica:3, fisica:3, geografia:3, interpretacao-texto:3,
               literatura:3, gramatica:2.5, historia:2, artes:2, atualidades:2,
               filosofia-sociologia:1.5, ingles:1.5, matematica:1 },

  // 2ª fase de Medicina não tem Física; Matemática e Português são os
  // dois maiores blocos da 1ª fase (12 questões cada).
  unicamp:   { biologia:3, quimica:3, matematica:3, interpretacao-texto:3, literatura:3,
               gramatica:2.5, atualidades:2.5, geografia:2, historia:2,
               filosofia-sociologia:2, ingles:2, artes:1.5, fisica:1.5 },

  // Linguagens 30 e Humanas 30 contra 22 de Natureza e 8 de Matemática na 1ª fase;
  // 12 das 24 discursivas são de Humanas, com 4 só de Filosofia.
  unesp:     { interpretacao-texto:3, literatura:3, historia:3, geografia:3,
               filosofia-sociologia:3, gramatica:2.5, ingles:2.5, artes:2, atualidades:2,
               biologia:2, quimica:2, fisica:2, matematica:1.5 },

  // Prova I é só Português, Inglês e Redação; toda a ciência está na Prova II discursiva.
  unifesp:   { interpretacao-texto:3, gramatica:3, ingles:3, biologia:3, quimica:2.5,
               fisica:2.5, literatura:2, matematica:2, historia:2, geografia:2,
               atualidades:1.5, filosofia-sociologia:1.5, artes:1 },

  // Matemática 10 empata com Português como maior bloco; 5 discursivas, uma delas de Inglês.
  einstein:  { matematica:3, interpretacao-texto:3, ingles:3, biologia:2.5, quimica:2.5,
               fisica:2.5, gramatica:2, historia:2, geografia:2, literatura:2,
               atualidades:2, filosofia-sociologia:0.5, artes:0.5 },

  // 10 de cada disciplina nas objetivas; Biologia 8 de 20 nas discursivas e
  // é o primeiro critério de desempate disciplinar.
  santacasa: { biologia:3, quimica:2.5, fisica:2.5, interpretacao-texto:2.5, literatura:2.5,
               gramatica:2, matematica:2, ingles:2, historia:2, geografia:2,
               atualidades:1.5, filosofia-sociologia:0.5, artes:0.5 },

  // Pesos do Grupo 3: Linguagens ×1, Natureza ×1, Humanas ×0,5, Matemática ×0,5, Redação ×2.
  pucsp:     { interpretacao-texto:3, literatura:3, gramatica:2.5, ingles:2.5,
               biologia:2.5, quimica:2.5, fisica:2.5, atualidades:2, historia:1.5,
               geografia:1.5, filosofia-sociologia:1.5, artes:1, matematica:0.5 },
};
```

A regra de combinação de Direito (`priority-weights.js:76–86`) se aplica igual: com mais de uma banca
selecionada, vence **o maior peso**, nunca a média. O estudo torna isso ainda mais necessário aqui —
Física é 1.5 na Unicamp e 3 na FUVEST; Matemática é 0.5 na PUC-SP e 3 no Einstein. Uma média
esconderia exatamente as assimetrias que fazem alguém ser reprovado.

### 5.3 Simulados oficiais por banca

`schedule.js:475` (`SIMULADO_OFICIAL`) hoje descreve os cadernos de 60 da FGV e da Insper. Para
Medicina, o estudo dá os sete formatos reais:

| Banca | Objetivas | Alternativas | Blocos, na ordem da prova |
|---|---|---|---|
| FUVEST | 90 | 5 | sem blocos — organizada por tema |
| Unicamp | 72 | **4** | Ling 7 · Fís 7 · Geo 7 · Filo/Socio 6 · Hist 7 · Bio 7 · Mat 12 · Port 12 · Quím 7 |
| Unesp | 90 | 5 | Port/Lit/Arte 20 · Inglês 10 · Humanas 30 · Bio+Quím 15 · Fís 7 · Mat 8 |
| Einstein | 50 | 5 | Port 10 · Ing 5 · Hist 5 · Geo 5 · Bio 5 · Quím 5 · Fís 5 · Mat 10 |
| Santa Casa | 80 | 5 | 10 de cada, na ordem Port · Ing · Hist · Geo · Bio · Quím · Fís · Mat |
| PUC-SP | 50 | 5 | Mat 5 · Natureza 15 · Humanas 15 · Linguagens 15 |
| Unifesp | 25 | 5 | Português 15 · Inglês 10 |

**A Unicamp com 4 alternativas é uma mudança de código, não de dados.** O app assume 5 em toda a
renderização e no rebalanceamento de gabarito. Precisa de um campo por banca
(`alternativas: 4 | 5`) e de um caminho de renderização que respeite isso.

### 5.4 Ordem de construção do banco

Construir por retorno decrescente, medido pelos pesos acima:

1. **Biologia, Química, Física** — 150 cada. São as frentes que não existem em Direito, e são o
   núcleo de cinco das sete bancas.
2. **Interpretação, Gramática, Literatura** — 150 cada. Podem partir do banco de Direito como
   referência de formato, mas **não podem ser copiadas**: o recorte literário é outro.
3. **Matemática** — 150. Contexto obrigatório, como já se fez em Direito.
4. **Inglês** — 150, com glosa de vocabulário, no padrão já estabelecido.
5. **História, Geografia, Filosofia/Sociologia, Artes, Atualidades** — 100 a 150 cada.

Total-alvo: **~1.900 questões**, mesma ordem de grandeza de Direito.

### 5.5 Formatos de item que o banco de Medicina precisa ter

O estudo identificou dois formatos que não existem no banco de Direito:

- **Item de lacunas** — assinatura da VUNESP, presente em Unesp, Santa Casa e Einstein, e ausente em
  FUVEST, Unicamp e PUC-SP. Na Unesp chega a cruzar disciplinas no mesmo item. Meta: ~40 itens,
  concentrados nas frentes de Natureza.
- **Discursiva com subitens `a)` e `b)`, corrigida por checklist** — formato comum a FUVEST,
  Unicamp, Unesp, Einstein e Santa Casa. O gancho já existe no app (`vd_dissertChecklist`).

---

## 6. Fase 4 — Ajustes de plano e de UI (resolve T4 e T5)

### 6.1 `schedule.js`

As constantes de `schedule.js:23–29` passam a vir da config da trilha:

```js
const CFG = window.VD_TRILHA.config().plano;
const TOTAL_DAYS = CFG.totalDias;                 // 90 nas duas
const TOPICS_PER_DAY = CFG.frentesPorDia;         // 2 em Direito, 2 em Medicina
const SIMULADO_TOTAL_QUESTIONS = CFG.simuladoQtd; // 45 em Direito, 50 em Medicina
```

`SCHEDULE_SEED` deve ser **diferente por trilha**, para que as duas não produzam a mesma ordem de
frentes.

### 6.2 Abas

A lista `abas` da config controla os botões. Em Medicina:

- **sai** `obras` — obras obrigatórias são um instrumento da FGV, sem equivalente em Medicina
- **fica** `redacao` — todas as sete bancas de Medicina cobram redação
- entra, mais tarde, uma aba **`mme`** — as Múltiplas Minientrevistas do Einstein valem 25% da nota
  final e não têm nada parecido nas outras seis. Fase 7, não agora.

### 6.3 Onboarding e escolha

Tela nova `view-escolha-trilha`, com dois cartões. O texto de cada um sai do estudo:

> **Direito** — FGV Direito SP e Insper. Uma prova de língua com filtro de matemática: metade da
> nota é Redação, Português e Inglês.
>
> **Medicina** — FUVEST, Unicamp, Unesp, Unifesp, Einstein, Santa Casa e PUC-SP. Sete bancas que
> medem coisas diferentes: a USP cobra Geografia na 2ª fase e não cobra Matemática; a Unicamp não
> cobra Física.

O `view-onboarding` atual (`index.html:87–121`) tem o texto de Direito cravado no HTML. Vira
template preenchido pela config.

---

## 7. Fase 5 — Painel admin

`admin.js` lê todos os documentos de `users/`. Com duas trilhas no mesmo mapa `data`, os números
atuais passam a somar coisas incomparáveis.

Mudanças mínimas: filtro de trilha no topo, e as abas de uso, frentes e questões passam a agrupar
pela trilha da chave. As regras do Firestore não mudam.

---

## 8. Fase 6 — Troca de trilha

Item em "Minha conta": **"Trocar de trilha"**, com confirmação que diz o que acontece:

> Você vai para o plano de Medicina. Seu progresso em Direito fica guardado — é só voltar para
> encontrá-lo no mesmo dia em que parou.

Implementação: `VD_TRILHA.definir(id)` → `VD_SYNC.pushNow()` → `location.reload()`. O reload é o
que garante que os globais da trilha antiga saem da memória.

**Não** deve haver um botão que apague uma trilha isoladamente. `apagarTudoNaNuvem()` continua sendo
tudo ou nada, porque é o documento inteiro — e prometer menos que isso seria repetir o bug que a
própria função foi criada para consertar.

---

## 9. Ordem de execução

| Fase | Entrega | Depende de | Esforço | Status |
|---|---|---|---|---|
| 1 | Namespace por trilha + migração | — | 1 dia | **feito** |
| 2 | `trilhas.js` + carregamento sob demanda + tela de escolha | 1 | 2 dias | **feito** |
| 4 | `schedule.js` por config + abas + onboarding | 2 | 2 dias | **feito** |
| 6 | Troca de trilha | 2 | meio dia | **feito** |
| 3 | Estrutura de dados de Medicina (13 frentes, 7 bancas) | 2 | — | **feito** |
| 3a | Biologia, Química, Física (450 questões) | 3 | **semanas** | semente: 9 |
| 3b | Linguagens e Matemática (600 questões) | 3a | **semanas** | semente: 7 |
| 3c | Humanas (500 questões) + discursivas + redações | 3b | **semanas** | semente: 6 + 6 + 3 |
| 5 | Painel admin por trilha | 1 | 1 dia | pendente |
| 7 | Aba MME (Einstein) | 3c | a definir | pendente |

### 9.1 O que ficou pronto (2026-08-05)

Arquivos novos: `vestibular-direito-v2/trilhas.js`, `vestibular-medicina/data/` (subtopics,
priority-weights, theory, video-topics, flashcards, bundle, dissertativas, redacoes).

Arquivos alterados: `app.js` (NS por trilha, `aplicarTrilhaNaUI`, `initTrocarTrilha`), `sync.js`
(`migrarParaTrilha`, `baseName` com prefixo de trilha, trava de trilha no resgate do v1),
`auth.js` (tela de escolha e carregamento da trilha), `index.html` (scripts de dados removidos,
`view-escolha-trilha`), `schedule.js` (constantes vindas da config), `styles.css`.

Verificado no navegador, com o servidor local:

- [x] Trilha de Medicina: `NS = v2_med_`, 13 frentes, 7 bancas, plano de 90 dias com 13 simulados
- [x] Trilha de Direito: `NS = v2_dir_`, 16 frentes, 1.992 questões, 56 obras, aba Obras de volta
- [x] Aba "Obras" some em Medicina e volta em Direito
- [x] Título, marca e onboarding trocam com a trilha
- [x] Progresso de Medicina sobrevive à troca para Direito e vice-versa
- [x] Migração preserva o carimbo original (não vira `1` nem `Date.now()`) e é idempotente
- [x] Chaves `v2_vd_*` antigas preservadas como cópia de segurança
- [x] Trava de trilha: com Medicina ativa, o resgate do v1 não cria nenhuma chave
- [x] Com Direito ativa, o resgate do v1 continua funcionando, com `ts = 1`

Não verificado (exige login Google real): o caminho completo `onAuthStateChanged → sync.start →
tela de escolha → reload`. As partes foram testadas isoladas; a costura entre elas não.

### 9.2 Correção feita durante a implementação

A regra de combinar bancas pelo MAIOR peso, herdada da trilha de Direito, **satura com sete
bancas**: onze das treze frentes chegavam a 3 e a ponderação deixava de ponderar. A regra não está
errada — quem presta FUVEST e Unicamp precisa mesmo de Física em 3 (FUVEST) *e* Matemática em 3
(Unicamp), e a média entregaria 2,25 nas duas. O que estava errado era o padrão "todas": ninguém
presta as sete.

`BANCA_ALVO` agora aceita um array e vem com `["fuvest", "unicamp"]` por padrão. Com duas bancas, o
espectro volta (3 → 2,5 → 2) e o plano de 90 dias distribui de 8 a 14 visitas por frente conforme o
peso.

**As Fases 1, 2 e 4 podem ir ao ar antes de existir uma questão de Medicina.** Basta a trilha de
Medicina começar com poucas frentes preenchidas — o app já lida com bancos de tamanhos diferentes por
frente. Isso permite validar o fluxo de escolha e a migração com usuários reais enquanto o conteúdo
é construído, que é a parte mais demorada e a mais fácil de errar sozinho.

---

## 10. Riscos

| Risco | Onde | Mitigação |
|---|---|---|
| **Migração carimbar a data errada e destruir progresso** | Fase 1 | Preservar o `ts` original; nunca `1`, nunca `Date.now()`. Testar com dois aparelhos antes de publicar |
| Pessoa existente cair na tela de escolha | Fase 2 | `v2_trilha` gravado na migração; escolha só aparece se a chave for `null` **depois** do sync |
| Duas trilhas carregadas juntas por engano | Fase 2 | Uma trilha por sessão; troca sempre com reload |
| Banco de Medicina nascer com os vícios que Direito levou meses para corrigir | Fase 3 | Aplicar desde a primeira questão os critérios de `PLANO-ALINHAMENTO-BANCO.md`: 5 alternativas (4 na Unicamp), gabarito equilibrado, texto de apoio longo e compartilhado, contexto em Matemática |
| Unicamp com 4 alternativas quebrar a renderização | Fase 3 | Campo `alternativas` por banca, tratado antes de gerar o primeiro simulado da Unicamp |
| Escopo de sete bancas travar a entrega | Fase 3 | Começar por FUVEST e Unicamp (públicas, maior demanda); Einstein e Santa Casa depois |

---

## 11. Decisões a confirmar

1. **Trilha trocável (B) ou fixa na conta (A)?** Recomendo B — §2. Se for A, a Fase 6 sai e a Fase 1
   encolhe.
2. **Quais bancas de Medicina entram primeiro?** Recomendo FUVEST e Unicamp. São as duas com maior
   demanda, são gratuitas e são as mais assimétricas entre si — cobrir as duas já força o banco a
   ficar completo.
3. **A trilha de Medicina começa pública com o banco parcial, ou espera ficar completa?** Recomendo
   publicar parcial e sinalizar as frentes ainda vazias — o custo de esperar é não validar a
   migração, que é o item de maior risco do plano.
