# Rumo à FGV & Insper — Direito

Plano de estudos de 90 dias para os vestibulares de Direito da FGV (SP/Rio) e do Insper.
Este repositório hospeda **duas versões do app**, publicadas ao mesmo tempo pelo GitHub Pages.

| Versão | Endereço | O que é |
|---|---|---|
| **v1** | [/vestibular-direito/](https://ptorneri.github.io/first-pr-practice/vestibular-direito/) | O app original, estável. Sem cadastro e sem servidor: o progresso fica no navegador, com sincronização opcional por código. |
| **v2** | [/vestibular-direito-v2/](https://ptorneri.github.io/first-pr-practice/vestibular-direito-v2/) | O mesmo plano, com conta Google: progresso salvo na nuvem, disponível em qualquer aparelho, ofensiva diária e relato de problema nas questões. |

O v1 é mantido no ar de propósito, como versão de referência para voltar. A tag
`v1-estatico` marca o estado dele antes de o v2 existir.

Os detalhes do plano de estudos (as 15 frentes, o cronograma, os simulados, os flashcards,
as obras obrigatórias) estão em [vestibular-direito/README.md](vestibular-direito/README.md).

## Organização das pastas

```
vestibular-direito/       v1 — app completo, com todo o conteúdo em data/
vestibular-direito-v2/    v2 — app com backend; usa o conteúdo do v1
serve-root.ps1            servidor local que enxerga as duas pastas
```

**O conteúdo não é duplicado.** As 1800 questões, a teoria, as obras, os flashcards e as
dissertativas moram só em `vestibular-direito/data/`, e o v2 os carrega por caminho relativo
(`../vestibular-direito/data/...`). Corrigir uma questão vale para os dois apps.

Por isso: **editar `vestibular-direito/data/` muda o v1 e o v2**. Já editar `app.js`,
`styles.css` ou `index.html` do v1 mexe só no v1 — esses arquivos foram copiados para o v2 e
seguem caminhos separados.

## Rodando localmente

Para o v1 sozinho, basta abrir `vestibular-direito/index.html` no navegador.

O v2 precisa de servidor, porque busca o conteúdo na pasta vizinha:

```
powershell -ExecutionPolicy Bypass -File serve-root.ps1
```

- v1 → http://localhost:8844/vestibular-direito/
- v2 → http://localhost:8844/vestibular-direito-v2/

## O backend do v2

Tudo no projeto Firebase `app-fgv-insper`, sem servidor próprio:

- **Auth** — login com Google (o único provedor ativado)
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
