# Briefing de redesenho — sagax

Redesenhe **todas as telas** de um app web de preparação para vestibular. Quero mockups de
alta fidelidade, não código.

---

## 1. O produto

**sagax** (sagaxedu.com.br) é um plano de estudos de **90 dias** para vestibular brasileiro.
O app tem três trilhas — **Direito**, **Medicina** e **Economia** — e cada uma monta o plano a
partir do formato real das provas daquele curso (FGV Direito SP, Insper, FUVEST, Unicamp,
Unesp, Unifesp, Einstein, Santa Casa, PUC-SP).

A promessa central, e a única frase que precisa sobreviver ao redesenho:
**"todo dia o app diz exatamente o que você estuda hoje."**

O ciclo real de quem usa:

1. Abre o app de manhã ou à noite. A tela **Hoje** já sabe qual é o dia do plano (ex.: dia 12 de 90).
2. Lê a teoria da frente (gatilhos e pegadinhas), assiste a uma vídeo-aula sugerida no YouTube.
3. Responde de 12 a 30 questões comentadas, uma a uma, com gabarito e explicação na hora.
4. Opcionalmente treina uma dissertativa (meta de 4x/semana) e revisa flashcards vencidos.
5. **Todo domingo vira simulado** de ~45 questões — e os erros reprogramam a semana seguinte.

É um produto **pago**: 7 dias grátis, depois R$ 19,99/mês ou R$ 49,99 por 90 dias.
Precisa parecer que vale isso.

**Público:** vestibulandos de 17 e 18 anos, brasileiros, majoritariamente no celular, estudando
sob pressão real e por 90 dias seguidos. Tudo é em **português do Brasil**.

---

## 2. O que estou pedindo

Mockups de **alta fidelidade** de todas as telas listadas na seção 8, em:

- **Modo escuro e modo claro.** Desenhe **primeiro o escuro** e derive o claro. Os dois são
  entregáveis obrigatórios — o app tem seletor de tema hoje e ele fica.
- **Desktop e celular.** As duas larguras para cada tela. O celular não pode ser sobra do
  desktop: 60%+ do uso é lá.

Antes das telas, entregue o **sistema** (seção 7). É ele que garante que 20 telas pareçam um
produto só, e não 20 exercícios de design.

---

## 3. Direção estética

**A referência é Linear, Vercel e Raycast.** Precisão. Espaçamento milimétrico, contraste alto,
tipografia com personalidade, superfícies que se distinguem por 2% de luminosidade e não por
bordas grossas, microinteração discreta e rápida. O tipo de interface que parece cara porque é
**exata**, não porque é enfeitada.

**Mas o tom é de companheiro que motiva, não de instrumento neutro.** São 90 dias duros. O app
comemora sequência, celebra progresso, dá recompensa visual. Ofensiva de 12 dias é uma
conquista e a tela precisa dizer isso.

### A tensão é o briefing

Essas duas coisas normalmente brigam. Motivação em produto de estudo virou sinônimo de
Duolingo: mascote, confete, badge dourado, som de moeda. Precisão virou sinônimo de frio.

**Quero recompensa com a disciplina de Linear.** A celebração é **tipográfica, cromática e de
movimento** — nunca ilustrativa:

- Um número que cresce com uma transição bem feita vale mais que um troféu.
- Uma sequência de 12 dias como faixa contínua que se acende vale mais que uma chama animada.
- O ouro da marca aparecendo *exatamente* onde há conquista, e em nenhum outro lugar, vale mais
  que cinco cores de status.
- Um estado de "dia fechado" que muda o clima da tela inteira (não um selo de "concluído").

Se você precisar de uma frase-guia: **é a interface que um vestibulando mostraria pro amigo
porque ela é bonita, não porque ela é fofa.**

---

## 4. Restrições invioláveis

### 4.1 A marca — **fidelidade total, isto é o ponto mais rígido do briefing**

O logo e o nome **não podem ser redesenhados, reinterpretados, "modernizados", simplificados,
achatados, recolorizados nem substituídos**. Eles entram nos mockups exatamente como são. Se
qualquer entregável mostrar um símbolo diferente do descrito abaixo, ou o nome escrito de outro
jeito, o trabalho inteiro é rejeitado.

**O nome é `sagax`** — cinco letras, **sempre em minúsculas**, sempre junto, sem espaço, sem
hífen, sem acento. Nunca "Sagax", nunca "SAGAX", nunca "SagaX", nunca "sagax edu". O domínio é
sagaxedu.com.br, mas o produto se chama **sagax**.

**O símbolo** é um "A" estilizado, construído como duas superfícies em perspectiva com volume
tridimensional:
- uma **lâmina dourada** com gradiente metálico (do ouro claro ao bronze) que se curva no pé,
  como uma página virando ou uma vela ao vento — ela forma a perna esquerda e a barra do "A";
- uma **faixa azul-royal** vertical com gradiente e canto superior arredondado, à direita, que
  forma a perna direita;
- as duas se cruzam com sombreado, criando profundidade real. **Não é um logo plano.**
- Vive sobre o navy `#0A1F38`. Na versão de ícone de app é um **squircle navy** com o símbolo
  centralizado.

**O wordmark** é "sagax" em uma geométrica sem serifa pesada, letras brancas — e a assinatura da
marca está no **X final bicolor**: a diagonal ascendente em **ouro**, a descendente em **branco**.
Esse X de duas cores é o elemento de identidade mais reconhecível do produto. Preserve-o.
Quando o nome aparece como texto corrido e não como imagem, a convenção é a mesma:
`saga` em branco + `x` em ouro.

**Arquivos existentes** (use-os como estão, não recrie):
`assets/sagax-symbol.png` · `assets/sagax-wordmark-only.png` · `assets/logo.png` (ícone
squircle) · `assets/favicon.png`

**Detalhe técnico que você precisa saber:** os PNGs do símbolo e do wordmark têm **o fundo navy
embutido no arquivo**, e hoje o app os aplica com `mix-blend-mode: lighten` para que sumam
contra a barra lateral navy. Consequência prática: **o logo atual não pode ser colocado sobre
qualquer fundo.** Isso é uma restrição real de layout — em modo claro, ou sobre qualquer
superfície que não seja navy, o logo precisa de uma solução (uma placa navy própria, um
contêiner dedicado, ou uma versão do arquivo com fundo transparente). **Resolver isso de forma
elegante faz parte do trabalho** e afeta a barra lateral, a landing, o login e o onboarding.

Você **pode** decidir o tamanho, o enquadramento, o espaço de respiro e onde símbolo e wordmark
aparecem juntos ou separados. Você **não pode** tocar no desenho deles.

### 4.2 Cor da marca (fixa)

| | |
|---|---|
| Navy | `#0A1F38` — a placa do logotipo, não negocia |
| Ouro | `#F4C142` — o acento da marca, o mesmo do X do wordmark |
| Slogan | "Estude. **Evolua.** Conquiste." — com "Evolua" em ouro |

### 4.3 Tipografia (aberta)

**A tipografia da interface está totalmente aberta.** Hoje é Montserrat e é justamente parte do
problema — troque por algo com caráter real. Fonte customizada ou pouco vista é bem-vinda.

Ressalva: o wordmark é imagem e **não** muda junto. Então a fonte que você escolher precisa
**conviver** com a geométrica do logotipo sem brigar — ou combinar com ela, ou contrastar de
propósito. Diga qual das duas você escolheu e por quê.

### Uma regra atual que quero preservar

A paleta hoje segue uma regra que funciona e que quero que sobreviva ao redesenho:

> **O navy é estrutura. O ouro é UMA ação por tela.**

O navy preenche barra de progresso, marca aba ativa e assina o botão primário. O ouro fica
reservado para o único lugar que a pessoa deve olhar primeiro em cada tela. Verde e vermelho
**não decoram nada** — aparecem só em gabarito de questão e em zona de perigo.

Se você quiser quebrar essa regra, quebre de propósito e explique por quê.

### Navegação (fica como está)

Não estou pedindo para repensar a arquitetura de informação. A navegação atual permanece:

- **Desktop:** barra lateral navy com a marca no topo, **três grupos** de itens e o chip do
  usuário no rodapé.
  - **PLANO** — Hoje · Calendário · Simulados
  - **ESTUDO** — Buscar questões · Flashcards · Redação · Obras obrigatórias · Caderno de Erros
  - **VOCÊ** — Meu progresso · Perfil e conta
  - Cada item pode carregar um **contador** (ex.: 14 flashcards vencidos, 23 erros pendentes).
- **Celular:** barra inferior com 5 destinos — Hoje · Calendário · Simulados · Cards · **Mais**.
  As outras 5 abas moram dentro de "Mais" e voltam por um botão de voltar no cabeçalho.

O **desenho** desses dois componentes está totalmente aberto. A estrutura, não.

### Funcionalidade

**Nenhuma função pode sumir.** A seção 8 lista, tela por tela, o que precisa continuar
existindo. Você pode reorganizar, promover, agrupar, esconder atrás de um clique — mas não
cortar. Se achar que algo deveria morrer, diga separadamente em vez de simplesmente omitir.

O layout e a estrutura HTML **podem** mudar livremente.

---

## 5. Proibido — o que faz a tela atual parecer gerada por IA

O app hoje é competente e completamente genérico. Este é o diagnóstico do que está errado, e
nenhum desses padrões pode voltar:

1. **Tudo é a mesma caixa.** Todo elemento é um retângulo branco, borda 1px, mesmo raio de
   canto, mesmo padding de 18–24px. A hierarquia vem só do `font-size`. Se três coisas
   diferentes na tela têm a mesma moldura, o desenho não decidiu nada.
2. **A fileira de 4 stat tiles** — `grid-template-columns: repeat(4, 1fr)` com micro-rótulo em
   CAIXA ALTA espaçada + número grande + nota pequena. É a assinatura número um de dashboard
   gerado. Não use.
3. **CAIXA ALTA com `letter-spacing` como recurso de rótulo.** O app usa isso em cinco lugares
   diferentes. Encontre outra forma de marcar rótulo secundário.
4. **Grid sem ritmo.** Gap de 16px em tudo, padding parecido em tudo. Nada é apertado, nada é
   largo — então nada respira e nada grita.
5. **Ícone genérico de biblioteca** como decoração de card.
6. **Gradiente roxo-azul, glassmorphism, sombra colorida difusa.** O kit de "app de IA 2024".
7. **Emoji como sistema de ícones.**
8. **Tela que poderia ser um CRM.** Trocando os textos, o dash de hoje serviria de painel de
   vendas. Nada nele diz "isto é estudo para vestibular". O redesenho tem que ser reconhecível
   como o que é.

**Também não quero o extremo oposto.** Já testei e rejeitei três direções temáticas — papel de
caderno, jornal impresso e terminal técnico. Fantasia visual não é a saída. **Quero algo que
seja simplesmente muito bem feito**, sem conceito decorativo por cima.

---

## 6. Perguntas que você deve responder no caminho

Não precisa perguntar de volta — **decida e justifique** em uma linha cada:

1. Qual tipografia (display + texto + tabular para números) e por quê essa.
2. Como o escuro e o claro se relacionam: mesma estrutura com tokens trocados, ou o claro tem
   ajustes de peso/contraste próprios?
3. O que preenche a hierarquia agora que os cartões saíram — superfície elevada? régua?
   densidade? escala?
4. Onde exatamente o **ouro** aparece em cada tela (deve ser um lugar só).
5. Como a **celebração** se manifesta sem virar Duolingo — descreva as 3 ou 4 microinterações
   que carregam isso.
6. Como o **navy do logo** convive com um modo escuro (o navy é claro demais para ser fundo
   escuro e escuro demais para ser acento — isso é um problema real a resolver).
7. **Como o logo aparece em modo claro**, dado que os arquivos têm fundo navy embutido
   (ver 4.1). Precisa de uma solução explícita, mostrada nos mockups.
8. Como a fonte que você escolher convive com a geométrica do wordmark, que não muda.
9. Como a densidade muda entre desktop e celular na tela mais pesada (Hoje com 12 questões).

---

## 7. Entregue primeiro: o sistema

Antes das telas, defina e mostre:

- **Paleta completa** nos dois temas: fundo, superfícies (pelo menos 3 níveis), traço/borda,
  texto (3 pesos), navy, ouro, acerto, erro, alerta. Com contraste WCAG AA verificado — tem
  gente lendo isso à 1h da manhã.
- **Escala tipográfica** completa, com a fonte escolhida e os pesos reais em uso.
- **Escala de espaçamento** e a régua de raio de canto (inclusive "sem raio", se for o caso).
- **Componentes-base**, que se repetem em quase toda tela:
  - botão primário / secundário / fantasma / perigo
  - campo de texto e campo de busca
  - pill de filtro (estado normal e ativo)
  - linha de lista clicável com contador à direita
  - barra de progresso e indicador circular
  - selo/badge de contagem
  - bloco expansível (a teoria é assim)
  - faixa de aviso (trial vencendo, sexta de revisão)
  - estado vazio
  - estado de carregamento
- **Movimento:** duração, curva e o que anima. Especialmente o que acontece ao acertar uma
  questão e ao fechar o dia.

---

## 8. Inventário de telas

Vinte telas. Para cada uma: **o que ela é**, e **o que não pode sumir**.

### A. Antes do login

#### A1 · Landing (deslogado)
A página de venda. Precisa converter.
- Nav com marca + links (Como funciona, Trilhas, Vestibulares) + botão Entrar.
- **Hero:** sobrancelha "90 dias · Direito e Medicina · 9 bancas", título grande, parágrafo de
  explicação, dois CTAs ("Começar meu plano hoje" / "Ver como funciona"), **o preço colado no
  botão** (7 dias grátis, depois R$ 49,99 à vista ou R$ 19,99/mês), e três números:
  5.755 questões comentadas · 16 frentes · 90 dias.
- Uma **prévia da tela Hoje** dentro de uma moldura de janela de navegador. É a única promessa
  visual da página — e agora ela mostra o app redesenhado.
- Seção "Como funciona" com 3 passos numerados.
- Seção "Bancas que o plano cobre" com as 9 bancas.
- Seção "Um dia de estudo": copy + um cartão que mostra a sequência Antes → Aula → Prática →
  Depois, e a aula do dia.
- CTA final repetido com o preço de novo.
- Nota de autoria: "os exercícios são originais, criados no estilo das provas".
- Rodapé: Termos de Uso · Política de Privacidade.

#### A2 · Login
Painel dividido: metade navy carrega o argumento, metade clara carrega o pedido.
- Marca, frase "seu progresso fica salvo na sua conta, não só neste navegador", 3 bullets,
  o slogan "Estude. **Evolua.** Conquiste." (o "Evolua" em ouro).
- Do outro lado: "Entrar", parágrafo, **botão Entrar com Google** (com o ícone colorido oficial
  do Google — obrigatório pelas regras da plataforma), linha de erro, duas notas legais com os
  links de Termos e Privacidade, botão "← Voltar".

#### A3 · Falha ao carregar o progresso
Tela de bloqueio. Título, dois parágrafos que garantem que **nada foi perdido**, "Tentar de
novo" e "Sair da conta". Precisa tranquilizar, não assustar.

#### A4 · Portão de assinatura
Aparece para quem entrou mas não tem acesso liberado. Título e texto **mudam com o motivo**
(nunca assinou / trial venceu / assinatura venceu / cancelou / sem rede) — mostre pelo menos
dois desses estados.
- Linha crítica: "você entrou como **email@exemplo.com** — o acesso é liberado para o e-mail
  usado no pagamento". É o engano mais comum desta tela.
- CTAs de checkout (mensal e 90 dias), "Já paguei — verificar de novo", "Entrar com outra conta".

#### A5 · Escolha de trilha
Primeiro acesso. "Para qual curso você vai estudar?" + cartões de trilha (Direito, Medicina,
Economia), cada um com o nome do curso, as bancas cobertas e o que caracteriza aquele plano.
Esta é a primeira decisão de quem entra — merece peso.

#### A6 · Onboarding
Apresenta o app antes do dia 1. Logo, marca, subtítulo, uma **lista de 9 promessas** (hoje é um
paredão de texto — é o maior problema desta tela), e "Começar meu plano hoje" / "Continuar meu
plano".

### B. O esqueleto do app

#### B1 · Shell — barra lateral, cabeçalho, barra inferior
- **Lateral (desktop):** marca, os 3 grupos com 11 itens e seus contadores, chip do usuário
  (avatar, nome, trilha) no rodapé.
- **Cabeçalho de página:** botão voltar (só celular), título da aba, subtítulo dinâmico
  ("Dia 12 de 90 · sexta, 20 de março"), rótulo de fase ("Fase 1 · Fundamentos"),
  **chip de ofensiva** ("🔥 6 dias"), **status de sincronização**, e a navegação de dia
  (← Dia anterior / Próximo dia →) que só existe na aba Hoje e só no desktop.
- **Faixa de acesso:** barra entre o cabeçalho e o conteúdo, escondida por padrão, que aparece
  para dizer "faltam 3 dias de teste" ou "sua assinatura vence em 2 dias" + CTA. Vale em todas
  as abas.
- **Barra inferior (celular):** 5 destinos com ícone e rótulo.

### C. As abas

#### C1 · Hoje — **a tela mais importante do app**
É a tela que a pessoa abre todo dia. Hoje ela tem, de cima para baixo:
- **Chips das frentes do dia** (ex.: "LINGUAGENS · Interpretação de texto" e "HUMANAS · Direito
  Constitucional"), com marca de concluída, clicáveis — rolam até o bloco da frente.
- **Cartão de foco** (hoje é o único bloco navy da tela, com o único botão de ouro):
  sobrancelha "Comece por aqui", nome da frente, linha de meta
  ("12 questões essenciais · ~24 min no ritmo da prova · 2ª revisão deste tema"),
  botão primário cujo rótulo é dinâmico ("Começar — 12 questões" / "Continuar — questão 3 de 12"
  / "Rever as questões"), botão "Ver teoria antes", e um bloco de **aula de hoje** com o tema e
  o link "▶ Assistir a vídeo-aula" (abre o YouTube).
  - Estado alternativo: **dia concluído** — o cartão para de mandar continuar e confirma que o
    dia fechou. Este estado é uma oportunidade de recompensa e hoje é desperdiçado.
  - Estado alternativo: **domingo** — o cartão vira "Simulado misto".
- **Tarefas de hoje** com contador (2/5) e lista com marca de feito.
- **Quatro métricas**: Fim do plano (78 dias · dia 12 de 90) · Acerto na semana (74% · +6 pts vs.
  semana passada) · Plano concluído (9/90 · 10% do caminho) · Frente mais fraca (52% · Direito
  Constitucional). **Esta fileira de 4 tiles é o pior elemento do app — repense-a por completo.**
- **Aviso de sexta de revisão intercalada** (aparece só em certas sextas).
- Para **cada frente do dia**: um cabeçalho navy igual ao de foco (sem o ouro) + o bloco da
  frente com a teoria colapsável e as questões.
- **Seção de dissertativa**, no fim, opcional.

#### C2 · Questão — **o componente mais usado do app inteiro**
Aparece em Hoje, Simulados, Buscar, Caderno de Erros e SOS. Merece o maior cuidado do redesenho.
- Etiqueta de origem ("Linguagens · Interpretação de texto").
- **Texto de apoio** (às vezes longo — uma coletânea que serve a várias questões seguidas).
- **Elemento visual** opcional: imagem, gráfico, tabela.
- Enunciado numerado + **selo de dificuldade** ("Média" / "Difícil") quando existe.
- **5 alternativas** (a–e) em rádio. Marcar **não grava**: só arma o botão.
- Botão "Verificar resposta" + dica ao lado ("Marcada: C. Dá pra trocar até verificar.").
- **Feedback pós-resposta:** certo ou errado, a alternativa correta, e o comentário explicativo.
  A questão **trava** — não dá pra trocar depois de verificar.
- Link discreto "achei um problema nesta questão" que abre um relato.
- Estados a desenhar: intocada · marcada · acertou · errou · travada com gabarito.
- **Considere o celular com atenção especial:** enunciado + coletânea + 5 alternativas + botão
  numa tela de 375px é o problema de layout mais difícil do app.

#### C3 · Calendário
- Grade dos **90 dias**, um quadrado por dia, com 5 estados: concluído · em andamento · hoje ·
  não iniciado · domingo de simulado. Clicar num dia abre aquele dia.
- Legenda dos 5 estados.
- Coluna de apoio ao lado com o resumo do período.
- Esta tela é a melhor candidata do app a virar algo memorável — 90 quadrados são um objeto
  visual forte e hoje estão desperdiçados.

#### C4 · Simulados
Duas telas:
- **Lista:** todos os domingos do plano, feitos e por fazer, com o resultado de cada um.
- **Detalhe:** o resultado de um simulado, frente por frente, mostrando onde a nota caiu.
- E, dentro da aba Hoje quando é domingo, o **card do simulado**: abas de modo
  (Adaptativo · 45 questões / Oficial FGV · 60 / Oficial Insper · 60 / …), descrição do modo,
  contador de acerto, cabeçalhos de bloco ("Bloco 2 · Matemática · questões 16 a 30") e o foco
  adaptativo que sai no fim.

#### C5 · Buscar questões
- Campo de busca ("crase", "função quadrática", "genética").
- **Sugestões de assunto** enquanto digita.
- **Filtros por faceta** (frente, trilha, dificuldade).
- Linha de status ("47 questões encontradas").
- Resultados **agrupados**, com aviso quando vêm da outra trilha, e paginação por "ver mais".
- Estado vazio e estado sem resultado.

#### C6 · Flashcards
Duas telas:
- **Home:** "Revisão do dia" (N pra revisar · M novos) com "Estudar agora"; lista "Estudar por
  frente" com a contagem de cada uma; rodapé com totais (em dia · novos · total).
- **Sessão:** o card com frente e verso, o virar, os botões de avaliação (repetição espaçada),
  o progresso da fila, e a tela de fim de sessão.
- A sessão é o lugar mais óbvio do app para a recompensa aparecer.

#### C7 · Redação
- Introdução: sobrancelha "Prova de Redação", título, descrição do formato exigido pela banca,
  e o contador "propostas já treinadas: 3/15".
- **Filtro por modelo de tema** (pills).
- Lista das 15 propostas.
- Ao abrir uma: o enunciado, a coletânea de textos de apoio, o editor de texto do aluno, a
  **grade de correção oficial** (FGV/Insper) para autoavaliação critério por critério, e a
  **correção por IA** que preenche a mesma grade em paralelo — a divergência entre as duas é o
  que ensina ("você marcou 5 de 5; o corretor viu 2"). Mostre esse confronto.

#### C8 · Obras obrigatórias
- Duas listas separadas: **obrigatórias** (o que a banca cobra) e **complementares**
  (repertório). A separação é importante e hoje é fraca.
- Cartão de obra: título, autor, resumo e a análise pelos eixos da banca, com marcação de
  "já estudei" e contador geral.

#### C9 · Caderno de Erros
- Título, explicação ("toda questão que você errou volta aqui até você acertar"), contador
  ("23 questões pra revisar").
- Questões agrupadas por frente, com selo de quantas faltam em cada uma.
- Estado vazio ("nenhum erro pendente agora") — que é uma pequena vitória e deveria parecer uma.

#### C10 · Meu progresso
- **Score projetado na prova:** hoje é um bloco navy com um número grande (64%), a explicação de
  que é acerto ponderado pelo peso de cada frente na banca, o delta ("subiu 7 pontos nos últimos
  14 dias") e uma **sparkline de 14 dias**. É o número mais importante do app inteiro para a
  motivação — trate-o como tal.
- **"Onde você perde ponto":** lista de frentes ordenada da mais fraca para a mais forte, com
  percentual de acerto de cada uma.
- **Diagnóstico de erros:** padrões detectados no que a pessoa erra.
- **Sessão SOS por tema:** abre uma tela dedicada com a teoria daquele tema já expandida + todas
  as questões erradas nele, juntas. É o resgate.
- Card de **provas oficiais anteriores** com os links das instituições e a ressalva de autoria.

#### C11 · Mais (só celular)
- Bloco de identidade (avatar, nome, trilha, "salvo na nuvem") que leva ao Perfil.
- Grupo "Estudo" com as 5 abas que não cabem na barra inferior, cada uma com ícone e contador.
- Grupo de conta.

#### C12 · Perfil e conta
- Identidade: avatar, nome, e-mail, "Sair da conta".
- **Corrigir data de início** do plano (com seletor de data).
- **Sincronização**: status + exportar e importar progresso.
- **Trocar de trilha** (o progresso de cada trilha fica guardado em separado).
- **Assinatura**: plano atual, status, próxima cobrança, e o botão de cancelar quando existe.
- **Zona de perigo**: reiniciar todo o progresso. Precisa parecer perigoso sem parecer feio.

### D. Páginas legais

#### D1 · Termos de Uso e D2 · Política de Privacidade
Páginas de texto longo. Merecem uma régua de leitura decente e navegação por seção — hoje são
um paredão.

### E. Estados transversais

Mostre pelo menos um exemplo de cada, aplicando o sistema:
- **Vazio** (aba sem conteúdo ainda)
- **Carregando** (o app baixa ~13 MB de banco de questões no primeiro acesso)
- **Erro** e **offline**
- **Trial vencendo** (a faixa de acesso)
- **Modal de confirmação** (o de reiniciar progresso é o mais crítico)

---

## 9. Ordem de entrega

Se precisar priorizar, esta é a ordem de valor:

1. **O sistema** (seção 7) — sem ele nada mais vale.
2. **Hoje** (C1) e **Questão** (C2), desktop e celular, escuro e claro. São 80% do tempo de uso.
3. **Calendário** (C3), **Meu progresso** (C10) e **Flashcards** (C6) — onde a motivação vive.
4. **Landing** (A1) — onde a venda acontece.
5. O resto.

---

## 10. Como vou julgar o resultado

Antes das três perguntas, um corte seco: **se o logo foi redesenhado ou o nome foi escrito de
outro jeito, nada mais é avaliado.** Ver 4.1.

Depois disso, três perguntas, nesta ordem:

1. **Alguém consegue dizer de que produto é esta tela sem ler o texto?** Se a resposta for
   "algum dashboard", falhou.
2. **A tela Hoje me diz o que fazer agora em menos de dois segundos?** É a única função que
   ela tem.
3. **Depois de acertar dez questões seguidas, a interface me dá alguma coisa?** Se não der,
   o tom errou.

E uma quarta, silenciosa: se eu abrir isso lado a lado com o Linear, a diferença é de gosto ou
é de acabamento? Só a primeira é aceitável.
