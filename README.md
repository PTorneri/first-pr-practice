# sagax

Plano de estudos de 90 dias para vestibular, montado a partir do formato real das provas.
Quatro trilhas — **Direito**, **Medicina**, **Economia** e **Engenharia** — e a pessoa escolhe
a sua ao criar a conta.

O site é **[sagaxedu.com.br](https://sagaxedu.com.br)** (arquivo `CNAME`), publicado pelo GitHub
Pages a partir da raiz da branch `main`.

| Versão | Endereço | O que é |
|---|---|---|
| **v2** | [/direito/](https://sagaxedu.com.br/direito/) · [/medicina/](https://sagaxedu.com.br/medicina/) · [/economia/](https://sagaxedu.com.br/economia/) · [/engenharia/](https://sagaxedu.com.br/engenharia/) | O app, um endereço por trilha. Conta Google, progresso na nuvem, ofensiva diária, correção de dissertativas e redações por IA, relato de problema nas questões, assinatura. |
| **v1** | [/vestibular-direito/](https://sagaxedu.com.br/vestibular-direito/) | O app original, estático. Sem cadastro e sem servidor: o progresso fica no navegador, com sincronização opcional por código. |

O código do v2 mora em `vestibular-direito-v2/`, e o nome da pasta é histórico — ela serve as
quatro trilhas, não só Direito. As pastas de endereço acima têm um arquivo cada, o `index.html`
gerado por `build-paginas.js`; o endereço antigo `/vestibular-direito-v2/` continua respondendo e
encaminha para a trilha de quem chega. O v1 é mantido no ar de propósito, como versão de
referência para voltar, e continua recebendo as correções de conteúdo (o build grava o bundle
dele junto com os outros). A tag `v1-estatico` marca o estado dele antes de o v2 existir.

A raiz do domínio é a landing: quem ainda não escolheu curso entra por
[index.html](index.html), e quem já tem plano é levado direto para a pasta da sua trilha.

Há também um **painel de administração** em
[/vestibular-direito-v2/admin.html](https://sagaxedu.com.br/vestibular-direito-v2/admin.html):
relatos enviados pelos alunos, números de uso, acerto médio por frente e as questões mais
erradas. Quem autoriza o acesso é a regra do Firestore — o painel não guarda lista de UIDs.
Entrando com uma conta sem permissão, ele mostra o UID e gera as regras prontas para colar.

Os detalhes do plano de estudos (as frentes, o cronograma, os simulados, os flashcards,
as obras obrigatórias) estão em [vestibular-direito/README.md](vestibular-direito/README.md).

## Organização das pastas

```
banco-central/            a FONTE do conteúdo, e os scripts que geram o resto
vestibular-direito-v2/    o código do app (serve as quatro trilhas)
index.html                a landing, gerada
direito|medicina|         um index.html gerado por trilha — é o endereço do app
  economia|engenharia/
vestibular-direito/       o v1 + os dados gerados da trilha de Direito
vestibular-medicina/      dados da trilha de Medicina (sem app próprio)
vestibular-economia/      dados de Economia + as dissertativas de exatas
vestibular-engenharia/    dados de Engenharia (ITA)
functions/                o webhook de pagamento — o único servidor do projeto
serve-root.ps1            servidor local que enxerga todas as pastas
```

## Onde mora o conteúdo

**A fonte é [banco-central/](banco-central/).** As questões objetivas, os flashcards, a teoria e
os vídeos vivem lá, e `build-trilhas.js` gera a partir deles os arquivos de cada trilha
(`bundle.js`, `subtopics.js`, `flashcards.js`, `theory.js`, `video-topics.js`,
`priority-weights.js`). Esses arquivos gerados são **artefato, não fonte**: editar um deles é
trabalho perdido no próximo build.

```
node banco-central/build-trilhas.js
```

O banco é central porque o programa do ensino médio é o mesmo nas quatro trilhas — uma questão
de parábola não deixa de servir ao aluno de Medicina por ter sido escrita para Direito. Cada
trilha lista as frentes que estuda e leva **todas** as questões daquelas frentes. Corrigir uma
questão vale para as quatro. O funcionamento completo, com as regras de classificação por
subtema e os modos de falha já pagos, está em [banco-central/README.md](banco-central/README.md).

O v2 carrega os dados por caminho relativo (`../vestibular-<trilha>/data/...`), e só os da trilha
ativa. Editar `app.js`, `styles.css` ou `index.html` do v1 mexe só no v1 — esses arquivos foram
copiados para o v2 e seguem caminhos separados.

## A marca

O nome do app é **sagax** e vale para as quatro trilhas — o curso é o que vem depois do
travessão ("sagax — Direito"). O nome está definido num lugar só,
[vestibular-direito-v2/trilhas.js](vestibular-direito-v2/trilhas.js), em duas formas: `html`
(com o X em dourado, como no logotipo) e `texto` (para `document.title`, `alt` e nome de
arquivo exportado, onde markup não entra).

O nome é **todo minúsculo**, como na arte — inclusive o x do fim, que parece maior por ser um
glifo largo e dourado mas medido no pixel tem a mesma altura do "a" (topo 432 contra 429). Um
X maiúsculo subiria 36% e sairia diferente da imagem.

O x bicolor da arte (uma diagonal dourada, a outra branca) não existe em texto vivo — duas
cores dentro de um mesmo glifo pediriam um SVG desenhado no lugar da letra. Onde ele aparece
inteiro, como na barra lateral, é imagem: `assets/sagax-wordmark-cut.png` e
`assets/sagax-symbol-cut.png`.

As letras vêm do **Sagax Design System**, em [tokens.css](vestibular-direito-v2/tokens.css), e são
**servidas do próprio site** (`assets/fonts/*.woff2`), não do Google Fonts — as duas da primeira
dobra entram com `<link rel="preload">` no `index.html`:

| token | letra | onde |
|---|---|---|
| `--font-display` (= `--font-brand`) | Poppins | wordmark e títulos |
| `--font-sans` (= `--font-text`) | Manrope (variável) | texto corrido |
| `--font-mono` | IBM Plex Mono | números e código |

A separação importa: enunciado longo de questão pede leitura e não personalidade — trocar uma
variável pela outra leva a marca ao corpo inteiro.

O ouro da marca vem em dois tons da mesma família, um por família de fundo: `--brand-gold-on-navy`
(`--gold-400`, `#F0B430`) sobre azul-marinho e `--brand-gold` (`--gold-700`, `#8F6410`) sobre
branco. O primeiro foi feito para fundo escuro; sobre branco o X desapareceria no fim da palavra.
No modo escuro `--brand-gold` passa a apontar para o tom claro.

O slogan **"Estude. Evolua. Conquiste."** fica embaixo do wordmark na tela de login e na barra
lateral. Vai escrito em caixa normal no HTML e é o CSS que põe em caixa alta, para que o texto
copiado e o lido por leitor de tela saiam legíveis. Ele **tem que caber numa linha** — quebrado
no meio, para de ler como assinatura — e por isso o tamanho e o tracking caem num degrau abaixo
de 400 px de largura.

Os demais arquivos de marca ficam em `assets/`: `logo.png` (usado no onboarding e nos documentos)
e `favicon.png`. A arte original está em `vestibular-direito-v2/assets/logo-original.jpg`, para
dar pra regerar os PNGs.

## Rodando localmente

Para o v1 sozinho, basta abrir `vestibular-direito/index.html` no navegador.

O v2 precisa de servidor, porque busca o conteúdo nas pastas vizinhas:

```
powershell -ExecutionPolicy Bypass -File serve-root.ps1
```

- v1 → http://localhost:8844/vestibular-direito/
- v2 → http://localhost:8844/vestibular-direito-v2/

## O backend do v2

Tudo no projeto Firebase `app-fgv-insper`. **O ID do projeto ainda diz `app-fgv-insper` e vai
continuar dizendo** — ID de projeto do Firebase é imutável, e trocar exigiria projeto novo com
migração de usuários preservando UID. Ele não aparece para o usuário: quem aparecia era o
`authDomain`, e esse foi resolvido (abaixo).

- **Auth** — login com Google (o único provedor ativado). O `authDomain` é
  **`conta.sagaxedu.com.br`**, não o `app-fgv-insper.firebaseapp.com` que o console entrega —
  é esse valor que o popup do Google mostra a quem entra. Esse subdomínio é um site do Firebase
  Hosting que existe só para servir `/__/auth/handler`; o app em si está no GitHub Pages. A
  explicação completa está no comentário de [firebase.json](firebase.json), de
  [firebase-init.js](vestibular-direito-v2/firebase-init.js) e de
  [auth.js](vestibular-direito-v2/auth.js).
- **Firestore `users/{uid}`** — progresso do usuário; o `localStorage` continua sendo o que o
  app lê e escreve, então ele funciona offline, e o [sync.js](vestibular-direito-v2/sync.js)
  espelha na nuvem e mescla ao entrar
- **Firestore `feedback`** — relatos de problema em questões, lidos pelo painel
- **Assinatura** — [assinatura.js](vestibular-direito-v2/assinatura.js) é o portão de acesso.
  São dois planos: mensal recorrente (R$ 19,99) e 90 dias avulsos (R$ 49,99), cobrados pela
  Cakto. Quem libera e quem revoga é o webhook.
- **IA** — [ia.js](vestibular-direito-v2/ia.js), a correção das dissertativas e das redações

As regras do Firestore versionadas estão em
[vestibular-direito-v2/firestore.rules](vestibular-direito-v2/firestore.rules) — o arquivo é a
referência, mas quem vale é o que está publicado no console. Ele guarda `COLE_SEU_UID_AQUI` no
lugar do UID do dono, porque este repositório é público; o `firebase.json` aponta para o
`firestore.rules.local`, que é gerado na máquina e fica fora do git.

### O webhook de pagamento

[functions/index.js](functions/index.js) é o único servidor do projeto, e existe pelo
**reembolso**: com liberação manual, quem pede reembolso continua entrando até alguém lembrar de
cancelar. Nenhum humano lembra disso toda vez.

## Ao publicar mudanças no v2

O GitHub Pages serve com `Cache-Control: max-age=600`, então quem já visitou fica até 10 minutos
com a versão antiga. Há **dois contadores**, porque as duas coisas mudam por motivos diferentes:

- **`?v=` para código.** Mexeu em `styles.css`, `tokens.css`, `app.js`, `auth.js` ou em qualquer
  módulo? Incremente em **todos** os lugares de uma vez — o `index.html`, o `admin.html` e os
  `import` dentro dos próprios módulos. Para o navegador cada URL é um módulo diferente: dois
  `?v=` distintos para `firebase-init.js` inicializam o Firebase duas vezes e quebram o app.
- **`?d=` para conteúdo.** É o `DATA_VERSION` no topo de
  [trilhas.js](vestibular-direito-v2/trilhas.js). Corrigiu uma questão e rodou o build?
  Incremente ali.

## Publicação

São **dois alvos de deploy, e eles não sobem juntos**:

| o que mudou | como publica |
|---|---|
| o app ou os dados | `git push` na `main` → GitHub Pages ([.github/workflows/pages.yml](.github/workflows/pages.yml), ~25 s) |
| `functions/index.js` | `firebase deploy --only functions` |
| as regras do Firestore | `firebase deploy --only firestore:rules` |

Mexeu só no app? `git push` basta. Mexeu na função? o push **não** a publica.

## Nota

`greet.py` e `tests/` são resquícios do exercício de pull request que originou este
repositório (daí o nome `first-pr-practice`). Não têm relação com o app e podem ser removidos.
