# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

O repositório e todo o material dele estão em **português do Brasil** — comentários, commits, nomes de arquivo e o produto. Escreva no mesmo idioma.

## O que é

**sagax** (sagaxedu.com.br): plano de estudos de 90 dias para vestibular, em quatro trilhas — Direito, Medicina, Economia e Engenharia. App estático, sem framework: `app.js` + `styles.css` servidos pelo GitHub Pages a partir da raiz da branch `main`. O único servidor do projeto é o webhook de pagamento em [functions/](functions/).

O código do app é o **v2**, em [vestibular-direito-v2/](vestibular-direito-v2/) — o nome da pasta é histórico, ele serve as quatro trilhas. [vestibular-direito/](vestibular-direito/) é o **v1**, mantido no ar de propósito como versão de referência (tag `v1-estatico`), e é também onde moram os dados da trilha de Direito. As demais pastas `vestibular-*/` são só conteúdo, sem app próprio.

**Cada trilha tem endereço próprio**, e as páginas que os servem são geradas — ver [O endereço de cada trilha](#o-endereço-de-cada-trilha).

## Comandos

Não há `package.json` na raiz, nem test runner, nem lint. `greet.py` e `tests/` são resquícios do exercício de PR que originou o repositório — não têm relação com o app.

```bash
# Gera os bundles das trilhas a partir do banco central (o comando central)
node banco-central/build-trilhas.js               # as quatro trilhas
node banco-central/build-trilhas.js medicina      # uma só
node banco-central/build-trilhas.js --verificar   # reprova se o banco mudou e os bundles não

# Classificação de questões em subtemas
node banco-central/classificar-subtemas.js
node banco-central/classificar-subtemas.js --falsos      # rode SEMPRE que mexer nas regras
node banco-central/classificar-subtemas.js --apertadas   # decisões de margem ≤ 1
node banco-central/classificar-subtemas.js --amostra <subtema>

# Lote de questões novas: valide ANTES de tocar no arquivo-fonte
node banco-central/preflight.js <lote.json> <frente> <subtema-alvo>

# Flashcards (nunca escreva o JSON à mão)
node banco-central/compor-flashcards.js <frente> <rascunho.js>
node banco-central/compor-flashcards.js --conferir

# Portas de entrada do site (/, /direito/, /medicina/…) a partir de template.html
node vestibular-direito-v2/build-paginas.js
node vestibular-direito-v2/build-paginas.js --verificar   # reprova se o template mudou e as páginas não

# Verificadores
powershell -File vestibular-direito/verify-banco.ps1 [-Frente geografia]
powershell -File vestibular-medicina/verify-banco.ps1
node vestibular-direito-v2/auditar-busca.js          # piso de cobertura da aba Buscar
node vestibular-economia/verificar-dissertativas.js  # avalia a aritmética das resoluções

# Rodar local (o app precisa de servidor: lê dados da pasta vizinha)
powershell -ExecutionPolicy Bypass -File serve-root.ps1
#   landing → http://localhost:8844/
#   app     → http://localhost:8844/medicina/  (ou /direito/, /economia/, /engenharia/)
#   v1      → http://localhost:8844/vestibular-direito/
```

## Dois alvos de deploy, que não sobem juntos

| o que mudou | como publica |
|---|---|
| qualquer coisa do app ou dos dados | `git push` na `main` → GitHub Pages (~25 s, ver [.github/workflows/pages.yml](.github/workflows/pages.yml)) |
| [functions/index.js](functions/index.js) | `firebase deploy --only functions` |
| [firestore.rules](vestibular-direito-v2/firestore.rules) | `firebase deploy --only firestore:rules` |

Mexeu só no app? `git push` basta. Mexeu na função? o push **não** a publica.

Commits vão direto na `main` — ela é a branch publicada, não há fluxo de branch + merge aqui.

## Arquitetura

### banco-central é a fonte; os `vestibular-*/data/*.js` são artefato

```
banco-central/data/questions/<frente>.json   ← FONTE das objetivas (5.500+)
banco-central/data/flashcards/<frente>.json  ← FONTE dos flashcards, por subtema
banco-central/data/{teoria,videos}.json      ← consolidados (edite via teoria.js / videos.js)
        │
        ├─ classificar-subtemas.js → banco-central/data/subtemas/<frente>.json
        │
        └─ build-trilhas.js → vestibular-<trilha>/data/
                                bundle.js  subtopics.js  priority-weights.js
                                video-topics.js  theory.js  flashcards.js
```

**Nunca edite os arquivos gerados.** Corrigir uma questão é mexer em `banco-central/data/questions/` e rodar o build. Ler [banco-central/README.md](banco-central/README.md) antes de qualquer trabalho de conteúdo — ele explica as regras de classificação, os pesos e os modos de falha já pagos.

Cada trilha lista as frentes que estuda e leva **todas** as questões daquela frente, venham de onde vierem — é o ponto do banco central. Por isso não existe rollout por trilha: um lote novo aparece nas quatro de uma vez.

Batches novos de questão também são gravados em `vestibular-medicina/data/questions/<frente>.json`, porque é ali que `verify-banco.ps1` varre. `vestibular-direito/data/questions/` e `build-bundle.js` são pré-migração e não alimentam mais os bundles.

### Frente × subtema

Uma **frente** é a matéria (Biologia); um **subtema** é o assunto dentro dela (`biologia-genetica`). A distinção decide o produto: o plano diário sorteia por subtema, os simulados alocam por frente. O bundle publica os dois índices — `window.QUESTION_BANKS` (subtema) e `window.QUESTION_BANKS_FRENTE` (frente, montado em runtime por referência; serializar as duas visões levava o arquivo de 4,7 MB a 14,2 MB).

Teoria é **por trilha** (fala da banca); questões, vídeos e flashcards são compartilhados.

### O registro de trilhas

[vestibular-direito-v2/trilhas.js](vestibular-direito-v2/trilhas.js) é o primeiro arquivo a carregar e não depende de nada. Ele define a marca, as quatro trilhas (`dataDir`, frentes, abas, textos de UI, `emConstrucao`) e carrega **só** os dados da trilha ativa por `<script>` injetado. Trocar de trilha carrega outra página — o desenho é "uma trilha por sessão", o que mantém os globais (`window.SUBTOPICS`, `window.QUESTION_BANKS`…) intactos e poupa `app.js`/`schedule.js` de saber que trilhas existem. O progresso de cada trilha vive num prefixo próprio de `localStorage` (`dir_`, `med_`…); só `v2_trilha` fica fora do namespace.

### O endereço de cada trilha

O GitHub Pages não reescreve URL: o caminho **é** a pasta no disco. Para que `/medicina/` exista, tem que existir uma pasta `medicina/` com `index.html`. Por isso as portas de entrada são geradas:

```
vestibular-direito-v2/template.html   ← FONTE (é o arquivo que se edita)
        │
        └─ build-paginas.js → index.html                       (raiz: a landing, sem trilha)
                              direito|medicina|economia|engenharia/index.html
                              vestibular-direito-v2/index.html (só redireciona; links antigos)
```

São cópias do mesmo HTML com os caminhos reescritos para a pasta de cada uma. O app (js, css, `assets/`) continua morando só em `vestibular-direito-v2/` — o que se multiplicou foi a porta, não a casa.

Quem decide a trilha é a **URL**, acima do `localStorage`: cada página gerada injeta `window.VD_TRILHA_URL`, e `trilhas.js` grava a partir dele já no carregamento. Isso é obrigatório, não cosmético — `app.js` calcula o prefixo do `localStorage` (`v2_med_`) na linha 16 e nunca mais, então uma trilha descoberta depois gravaria o progresso no espaço da outra. Pelo mesmo motivo, `auth.js` **reafirma** a trilha da URL depois do sync (a gravação do `trilhas.js` acontece antes de o `VD_SYNC` existir e por isso vai sem carimbo de horário, que é o que decide a mesclagem).

Caminho montado em tempo de execução precisa de `window.VD_APP_BASE` — `"assets/…"` cru resolve contra o documento e de `/medicina/` viraria `/medicina/assets/`.

### Backend (v2)

Projeto Firebase `app-fgv-insper` — o ID é imutável e vai continuar dizendo isso; ele não aparece para o usuário.

- **Auth** — só Google. `authDomain` é `conta.sagaxedu.com.br`, um site do Firebase Hosting que existe apenas para servir `/__/auth/handler` (ver o comentário longo em [firebase.json](firebase.json) e em [firebase-init.js](vestibular-direito-v2/firebase-init.js)).
- **Firestore `users/{uid}`** — espelho do progresso. O `localStorage` continua sendo o que o app lê e escreve, então funciona offline; [sync.js](vestibular-direito-v2/sync.js) espelha e mescla ao entrar.
- **Firestore `feedback`** — relatos de problema em questões, lidos pelo [admin.html](vestibular-direito-v2/admin.html). Quem autoriza o painel é a regra do Firestore, não uma lista de UIDs no código.
- **Assinatura** — [assinatura.js](vestibular-direito-v2/assinatura.js) é o portão de acesso; [functions/index.js](functions/index.js) é o webhook da Cakto que grava `expiraEm`.
- **IA** — [ia.js](vestibular-direito-v2/ia.js), correção de dissertativas e redações.

## Coisas que quebram em silêncio

- **Cache do GitHub Pages (`max-age=600`).** Dois contadores independentes:
  - `?v=N` para **código** — ao mudar `styles.css`, `app.js`, `auth.js` ou qualquer módulo, incremente em **todos** os lugares de uma vez (`template.html`, `admin.html` e os `import` dentro de `auth.js`, `sync.js`, `feedback.js`, `ia.js`, `assinatura.js`, `admin.js`) **e rode `build-paginas.js`** — quem serve o `?v=` novo são as páginas geradas, não o template. Dois `?v=` diferentes para `firebase-init.js` inicializam o Firebase duas vezes e quebram o app.
  - `?d=N` para **conteúdo** — é o `DATA_VERSION` no topo de [trilhas.js](vestibular-direito-v2/trilhas.js). Mudou dado? Incremente, ou a correção leva 10 minutos para chegar em quem já visitou.
- **`firestore.rules` versionado guarda `COLE_SEU_UID_AQUI`** porque o repositório é público. O `firebase.json` aponta para `firestore.rules.local` (gitignorado). Deployar o versionado tira o dono do próprio painel.
- **IDs de flashcard são globais.** `buildFlashcardPool` indexa a repetição espaçada por `id`; um id repetido funde dois cards no histórico de quem estuda. Por isso os JSON saem de `compor-flashcards.js`, não da mão.
- **Regras de classificação sem `\b`** já mandaram frentes inteiras para o subtema errado (`amina` dentro de "contaminação", `onda` dentro de "responda"). `--falsos` existe para isso; rode-o sempre.
- **Correção de questão específica** vai em `REVISADAS` dentro de `classificar-subtemas.js`, nunca no JSON gerado — assim a decisão sobrevive à próxima reclassificação.
- **Editar um `index.html` não adianta.** Os seis são gerados por `build-paginas.js` e voltam ao que o template diz na geração seguinte. Edite [template.html](vestibular-direito-v2/template.html); mudar só ele também não adianta, porque o site serve as cópias — rode o gerador antes de publicar (`--verificar` acusa a defasagem).
- **Não sirva o app pelo Firebase Hosting.** Um `public: vestibular-direito-v2` com rewrite catch-all já produziu uma cópia quebrada: os dados moram na pasta vizinha e o catch-all transformava cada arquivo ausente num 200 com HTML, anulando a guarda do `onerror` em `trilhas.js`.

## Antes de fechar um lote de conteúdo

`verify-banco.ps1` e `preflight.js` medem forma, não conteúdo. Os estudos de anatomia das provas reais — [Direito](vestibular-direito/estudo-anatomia-provas-fgv-insper-2025-2026.md), [Medicina](vestibular-medicina/estudo-anatomia-provas-medicina-sp-2025-2026.md), [Economia](vestibular-economia/estudo-anatomia-provas-economia-fgv-insper-2021-2026.md) — são a referência de o que a banca realmente cobra e como. Confira o produzido contra eles, não só contra o validador.
