# sagax

Plano de estudos de 90 dias para vestibular, montado a partir do formato real das provas.
Duas trilhas: **Direito** e **Medicina** (a pessoa escolhe ao criar a conta).
Este repositório hospeda **duas versões do app**, publicadas ao mesmo tempo pelo GitHub Pages.

| Versão | Endereço | O que é |
|---|---|---|
| **v1** | [/vestibular-direito/](https://ptorneri.github.io/first-pr-practice/vestibular-direito/) | O app original, estável. Sem cadastro e sem servidor: o progresso fica no navegador, com sincronização opcional por código. |
| **v2** | [/vestibular-direito-v2/](https://ptorneri.github.io/first-pr-practice/vestibular-direito-v2/) | O mesmo plano, com conta Google: progresso salvo na nuvem, disponível em qualquer aparelho, ofensiva diária e relato de problema nas questões. |

O v1 é mantido no ar de propósito, como versão de referência para voltar. A tag
`v1-estatico` marca o estado dele antes de o v2 existir.

Há também um **painel de administração** em
[/vestibular-direito-v2/admin.html](https://ptorneri.github.io/first-pr-practice/vestibular-direito-v2/admin.html):
relatos enviados pelos alunos, números de uso, acerto médio por frente e as questões mais
erradas. Quem autoriza o acesso é a regra do Firestore — o painel não guarda lista de UIDs.
Entrando com uma conta sem permissão, ele mostra o UID e gera as regras prontas para colar.

Os detalhes do plano de estudos (as 15 frentes, o cronograma, os simulados, os flashcards,
as obras obrigatórias) estão em [vestibular-direito/README.md](vestibular-direito/README.md).

## Organização das pastas

```
vestibular-direito/       v1 — app completo, com todo o conteúdo em data/
vestibular-direito-v2/    v2 — app com backend; usa o conteúdo do v1
vestibular-medicina/      conteúdo da trilha de Medicina (sem app próprio)
serve-root.ps1            servidor local que enxerga as duas pastas
```

**O conteúdo não é duplicado.** As 1800 questões, a teoria, as obras, os flashcards e as
dissertativas moram só em `vestibular-direito/data/`, e o v2 os carrega por caminho relativo
(`../vestibular-direito/data/...`). Corrigir uma questão vale para os dois apps.

Por isso: **editar `vestibular-direito/data/` muda o v1 e o v2**. Já editar `app.js`,
`styles.css` ou `index.html` do v1 mexe só no v1 — esses arquivos foram copiados para o v2 e
seguem caminhos separados.

## A marca

O nome do app é **sagax** e vale para as duas trilhas — o curso é o que vem depois do
travessão ("sagax — Direito"). O nome está definido num lugar só,
[vestibular-direito-v2/trilhas.js](vestibular-direito-v2/trilhas.js), em duas formas: `html`
(com o X em dourado, como no logotipo) e `texto` (para `document.title`, `alt` e nome de
arquivo exportado, onde markup não entra).

O nome é **todo minúsculo**, como na arte — inclusive o x do fim, que parece maior por ser um
glifo largo e dourado mas medido no pixel tem a mesma altura do "a" (topo 432 contra 429). Um
X maiúsculo subiria 36% na Montserrat e sairia diferente da imagem.

O que **não** foi reproduzido é o x bicolor da arte (uma diagonal dourada, a outra branca):
duas cores dentro de um mesmo glifo não existem em texto vivo, precisaria de um SVG desenhado
no lugar da letra.

A letra da marca é a **Montserrat**, carregada do Google Fonts e declarada em `--font-brand`
(styles.css). Ela vale no wordmark e nos títulos; o texto corrido segue na pilha do sistema
(`--font-text`), porque enunciado longo de questão pede leitura e não personalidade — trocar
uma variável pela outra leva a marca ao corpo inteiro. A geométrica do logotipo de referência
é a Nexa, da Fontfabric, que é comercial; a Montserrat é o equivalente livre mais próximo
(mesmo esqueleto geométrico, mesmo "a" de dois andares).

O ouro da marca vem em dois tons da mesma família, um por família de fundo: `--brand-gold-on-navy`
(`#F4C142`, o do logotipo) sobre azul-marinho e `--brand-gold` (`#96660F`) sobre branco. O
primeiro foi feito para fundo escuro e dá 1,7:1 de contraste sobre branco — o X desapareceria
no fim da palavra.

O slogan **"Estude. Evolua. Conquiste."** fica embaixo do wordmark, na tela de login do v2
(`.brand-tagline`). Vai escrito em caixa normal no HTML e é o CSS que põe em caixa alta, para
que o texto copiado e o lido por leitor de tela saiam legíveis. Ele **tem que caber numa
linha** — quebrado no meio, para de ler como assinatura — e por isso o tamanho e o tracking
caem num degrau abaixo de 400 px de largura.

Os arquivos do logo ficam em `assets/` de cada app — `logo.png` (320 px, usado no onboarding e
no cabeçalho) e `favicon.png` (64 px). São a marca sobre uma placa arredondada no mesmo
azul-marinho do cabeçalho (`--header-bg`): no cabeçalho a placa desaparece e sobra a marca;
sobre o cartão branco do login ela vira um ícone. A arte original está em
`vestibular-direito-v2/assets/logo-original.jpg`, para dar pra regerar os PNGs.

## Rodando localmente

Para o v1 sozinho, basta abrir `vestibular-direito/index.html` no navegador.

O v2 precisa de servidor, porque busca o conteúdo na pasta vizinha:

```
powershell -ExecutionPolicy Bypass -File serve-root.ps1
```

- v1 → http://localhost:8844/vestibular-direito/
- v2 → http://localhost:8844/vestibular-direito-v2/

## O backend do v2

Tudo no projeto Firebase `app-fgv-insper`, sem servidor próprio. **O ID do projeto ainda diz
`app-fgv-insper` e vai continuar dizendo** — ID de projeto do Firebase é imutável, e trocar
exigiria projeto novo com migração de usuários preservando UID. Ele não aparece para o usuário:
quem aparecia era o `authDomain`, e esse foi resolvido (abaixo).

- **Auth** — login com Google (o único provedor ativado). O `authDomain` é
  **`conta.sagaxedu.com.br`**, não o `app-fgv-insper.firebaseapp.com` que o console entrega —
  é esse valor que o popup do Google mostra a quem entra. Esse subdomínio é um site do Firebase
  Hosting que existe só para servir `/__/auth/handler`; o app em si está no GitHub Pages. A
  explicação completa, com o que precisa estar configurado no console, está no comentário de
  [firebase-init.js](vestibular-direito-v2/firebase-init.js) e em
  [auth.js](vestibular-direito-v2/auth.js).
- **Firestore `users/{uid}`** — progresso do usuário; o `localStorage` continua sendo o que o
  app lê e escreve, então ele funciona offline, e o `sync.js` espelha na nuvem e mescla ao entrar
- **Firestore `feedback`** — relatos de problema em questões, lidos pelo console do Firebase

As regras do Firestore versionadas estão em
[vestibular-direito-v2/firestore.rules](vestibular-direito-v2/firestore.rules) — o arquivo é a
referência, mas quem vale é o que está publicado no console.

### Ao publicar mudanças no v2

O GitHub Pages serve com `Cache-Control: max-age=600`, então quem já visitou fica até 10
minutos com a versão antiga. Por isso `styles.css`, `app.js` e `auth.js` são pedidos com
`?v=N` no `index.html`: **ao alterar um deles, incremente o número nos três lugares**. O
porquê de `sync.js`, `feedback.js` e `firebase-init.js` ficarem de fora está comentado no
próprio `index.html`.

## Publicação

O GitHub Pages publica a branch `main` a partir da raiz. Todo push para `main` vai ao ar.

## Nota

`greet.py` e `tests/` são resquícios do exercício de pull request que originou este
repositório (daí o nome `first-pr-practice`). Não têm relação com o app e podem ser removidos.
