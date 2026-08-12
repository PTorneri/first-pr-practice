# Questões reais do Insper — APROVADAS (staging)

## Conclusão: Direito, Economia ou unificada?

**Unificada.** As duas provas processadas (`INSP2502` = 1º semestre de 2026, `INSP2504` = 2º semestre
de 2026) são a **prova objetiva única de "Acesso via Vestibular"** do Insper — o cabeçalho não menciona
curso, carreira ou habilitação em nenhum lugar dos dois cadernos (busquei por "Direito", "Economia",
"Administração", "Engenharia", "carreira" e só aparecem usos incidentais dentro de enunciados, nunca no
cabeçalho da prova). O conteúdo confirma isso: cada caderno de 60 questões cobre **Português/Literatura
(01–15), Matemática (16–30), Humanas incl. Filosofia/Sociologia (31–46), Biologia (47–50), Química
(51–55) e Física (56–60)** — ou seja, um espectro completo que não é o perfil típico de uma prova
focada em Direito (que pesaria mais em Humanas/Linguagens) nem de uma prova focada em Economia (que
pesaria mais em Matemática). É a mesma banca, mesmo caderno, para todos os cursos do Insper que usam
o vestibular de acesso.

Por isso:
- Os dois arquivos de saída ficam em `vestibular-economia/data/` (padrão pedido para o caso "serve pras
  duas"), mas a taxonomia de temas usada é a de **`vestibular-direito/data/subtopics.js`**, também por
  instrução explícita para esse caso. Ela cobre bem o conteúdo aprovado aqui (as questões aprovadas são,
  em sua maioria, Matemática básica/raciocínio lógico e Ciências da Natureza em bloco genérico — a
  taxonomia de Direito tem frentes largas o suficiente para as duas: `matematica-rlm` e
  `ciencias-natureza`).
- Extração de texto: `pdftotext -layout` inicialmente embaralhava as duas colunas de cada página
  (sobretudo nas questões 52–54 do INSP2502, que ficaram intercaladas). Reextraí com `pdfplumber`
  cortando cada página ao meio (coluna esquerda / direita) e lendo cada metade de cima a baixo — isso
  resolveu o embaralhamento e recuperou acentuação correta.

## Critério de aprovação aplicado

Uma questão só entra aqui se **nenhuma parte dela** (texto-base, imagem, gráfico) tiver autoria de
terceiro identificável — nem texto de livro/reportagem/artigo/letra de música, nem foto/charge/cartum/
diagrama creditado a um site, jornal, cartunista, ONG ou pessoa física. Ficaram de fora, além disso,
questões cujo enunciado ou alternativas dependem de uma imagem/gráfico/tabela que o extrator não
conseguiu capturar como texto (essas foram para o arquivo de excluídas, nas seções "Descartadas" e
"Revisar manualmente" — ver esse outro arquivo para a contagem completa).

## Resumo de contagem

| Sessão | Aprovadas | Excluídas (citação de terceiro) | Descartadas (exigem imagem) | Total |
|---|---|---|---|---|
| insper-2026.1 (INSP2502) | 14 | 32 | 14 | 60 |
| insper-2026.2 (INSP2504) | 15 | 33 | 12 | 60 |
| **Total** | **29** | **65** | **26** | **120** |

Por tema (só aprovadas):

| Tema | insper-2026.1 | insper-2026.2 | Total |
|---|---|---|---|
| Matemática Básica e Raciocínio Lógico (`matematica-rlm`) | 8 | 9 | 17 |
| Ciências da Natureza — Noções Gerais (`ciencias-natureza`) | 6 | 5 | 11 |
| História Geral (`historia-geral`) | 0 | 1 | 1 |
| **Total** | **14** | **15** | **29** |

---

## Matemática Básica e Raciocínio Lógico

### (insper-2026.1) Questão 16

Todos os 350 funcionários de um centro de compras participaram de uma campanha de doação de sangue, que
ocorreu durante 4 dias. No primeiro dia, todas as mulheres com mais de 40 anos doaram sangue, o que
corresponde a 18% do total de funcionários. No segundo dia, todos os homens com mais de 40 anos doaram
sangue, o que corresponde a 45% do total de homens. No terceiro dia, as 67 mulheres que ainda não haviam
doado sangue fizeram a doação. Finalmente, no quarto dia, todos os homens que ainda não haviam doado
sangue fizeram a doação. O número de funcionários homens com 40 anos ou menos nesse centro de compras é

(A) 81.
(B) 90.
(C) 105.
(D) 121.
(E) 144.

**Resposta correta:** D

### (insper-2026.1) Questão 17

Uma empresa presta serviços de manutenção em elevadores e, a cada dia, escala uma equipe ou de 5 pessoas
ou de 9 pessoas. Uma equipe de 5 pessoas faz, em um dia, a manutenção em 6 elevadores, e uma equipe de 9
pessoas faz, em um dia, a manutenção em 10 elevadores. Em 99 dias de prestação de serviços, a empresa
realizou a manutenção em 862 elevadores.

Nesse período de 99 dias, o número de dias em que a empresa escalou uma equipe de 5 pessoas foi

(A) 32.
(B) 35.
(C) 38.
(D) 41.
(E) 44.

**Resposta correta:** A

### (insper-2026.1) Questão 18

Em um ginásio, às 8h, havia 97 torcedores do time visitante e 30 torcedores do time da casa; durante o
minuto seguinte, chegaram 5 torcedores do time visitante e 18 torcedores do time da casa, de maneira que,
às 8h01, havia 102 torcedores do time visitante e 48 torcedores do time da casa. Desse momento em diante,
a cada minuto, chegavam ao ginásio 5 torcedores do time visitante e 18 torcedores do time da casa.

A razão entre o número de torcedores do time visitante e o número de torcedores do time da casa era igual
a 2 às

(A) 8h27.
(B) 8h31.
(C) 8h36.
(D) 8h40.
(E) 8h47.

**Resposta correta:** B

### (insper-2026.1) Questão 19

Seja (a₁, a₂, a₃, ...aᵢ, ..., aₙ, ...) uma progressão geométrica (PG) infinita de razão q. Seja
a₁ = 2 · 10⁻³ o primeiro termo de uma PG infinita em que q = 1,2. Seja aᵢ o menor termo dessa PG, tal que
a soma finita dos i primeiros termos (Sᵢ = a₁ + a₂ + ... + aᵢ) é maior do que 5.

*Nota: o símbolo da soma finita aparecia como uma imagem inline no PDF original; reconstruído aqui pela
notação padrão de soma dos i primeiros termos de uma PG, que é o único sentido compatível com o resto do
enunciado.*

Nessas condições, aᵢ é tal que:

(A) 0,545 < aᵢ < 0,545q
(B) 0,665 < aᵢ < 0,665q
(C) 0,835 < aᵢ < 0,835q
(D) 1,025 < aᵢ < 1,025q
(E) 1,255 < aᵢ < 1,255q

**Resposta correta:** C

### (insper-2026.1) Questão 21

Considere que a notação n‼ (duplo fatorial de n) representa o produto de todos os números positivos e de
mesma paridade, menores ou igual a n. Por exemplo, 5‼ = 5 · 3 · 1 e 6‼ = 6 · 4 · 2.

Em um jogo de tabuleiro, um jogador inicia com 16 peças. Cada peça tem uma função diferente no jogo,
sendo que 8 peças são de ataque e 8 são de defesa. Essas peças devem ser posicionadas em 16 postos
contidos em 8 regiões distintas do tabuleiro, cada região contendo um posto avançado e um posto recuado.
Inicialmente, o jogador deve posicionar 1 peça de ataque em cada região, podendo ser no posto avançado ou
no posto recuado, não necessariamente todas as peças de ataque no mesmo tipo de posto. Após colocar as
peças de ataque, o jogador posiciona as peças de defesa nos postos restantes.

O número de maneiras distintas de esse jogador fazer a distribuição inicial das suas 16 peças nas 8
regiões é

(A) 8! · 16‼
(B) 2 · 8! · 16‼
(C) 4 · 8! · 16‼
(D) 2 · 8‼ · 16!
(E) 4 · 8‼ · 16!

**Resposta correta:** A

### (insper-2026.1) Questão 24

Considere a inequação x² + 3x – 10 < 0. O intervalo correspondente à solução dessa inequação é:

(A) ]–∞, –10[
(B) ]–∞, 3[
(C) ]–∞, 5[
(D) ]–5, 2[
(E) ]–3, 10[

**Resposta correta:** D

### (insper-2026.1) Questão 26

Nos 7 primeiros dias de setembro, uma sorveteria vendeu, em média, 143 picolés por dia e, nos 16 últimos
dias desse mês, a média aritmética do número de picolés vendidos por dia foi igual a 150. Nesse mês, do
dia 8 até o dia 13, foram vendidos 177 picolés por dia.

Considerando os 30 dias do mês de setembro, a média dos números de picolés vendidos por dia foi igual a
155. Logo, o número de picolés vendidos no dia 14 de setembro foi

(A) 145.
(B) 154.
(C) 165.
(D) 176.
(E) 187.

**Resposta correta:** E

### (insper-2026.1) Questão 30

Em um programa escrito em linguagem natural, o operador &= é usado para concatenar o valor de uma
variável ao fim de outra. O comando `parte3 &= palavra` concatena o valor armazenado na variável
`palavra` ao fim do valor armazenado na variável `parte3`. Por exemplo, se `parte3 = "PA–"` e
`palavra = "TO"`, após a execução de `parte3 &= palavra` a variável `parte3` passará a conter `"PA–TO"`.

O comando `letra = mid(palavra, pos)` atribui à variável `letra` o caractere que está na posição `pos` do
valor armazenado em `palavra`. Por exemplo, se `palavra = "PA–TO"` e `pos = 4`, após a execução do
comando `letra = mid(palavra, pos)` a variável `letra` passará a conter `"T"`, pois "T" é o caractere que
está na posição 4 de "PA–TO". Observe, nesse exemplo, que "PA–TO" contém 5 caracteres. O comando
`aux = mid(parte1, pos)` funciona de maneira idêntica, atribuindo à variável `aux` o caractere que está
na posição `pos` do valor armazenado em `parte1`.

Avalie o seguinte código escrito em linguagem natural.

```
palavra = "TAPETE"
parte1 = "–"
parte2 = "–"

Faça a variável pos variar consecutivamente de 1 até 6 e, a cada mudança,
execute as instruções entre chaves

{
    letra = mid(palavra, pos)

    Se letra for uma vogal, execute os 3 comandos entre colchetes
    [
        parte1 &= letra
        aux = mid(parte1, pos)
        parte2 &= aux
    ]

    Se letra for uma consoante, execute os 2 comandos entre parênteses
    (
        parte2 &= letra
        parte1 &= letra
    )
}
```

Após a execução desse código, as variáveis `parte1` e `parte2` conterão, respectivamente,

(A) –AAEEEE e –PPTTTT.
(B) –ATEPET e –TTTTPP.
(C) –ETEPAT e –TAPETE.
(D) –TAPETE e –TTPPTT.
(E) –TTPEEA e –AEEPTT.

**Resposta correta:** D

### (insper-2026.2) Questão 16

Um concurso foi realizado, no campus de determinada universidade, com aplicações de provas nos períodos
matutino e vespertino. No período matutino, todos os candidatos realizaram a prova, sendo que eles
estavam distribuídos em 55 salas, cada sala com o mesmo número de candidatos. No período vespertino, a
prova foi aplicada apenas para os 899 candidatos de determinadas carreiras, sendo que eles ficaram na
mesma sala em que realizaram a prova no período matutino. Dessa maneira, 24 salas em que houve a
realização de provas no período matutino ficaram vazias e, em cada uma das demais salas, havia 14
candidatos a menos em relação à quantidade de candidatos que realizaram a prova pela manhã.

O número de candidatos que fizeram prova no período matutino foi

(A) 2255.
(B) 2310.
(C) 2365.
(D) 2420.
(E) 2475.

**Resposta correta:** C

### (insper-2026.2) Questão 17

Um livro contém 1824 exercícios, divididos em exercícios de revisão e exercícios de aplicação. Se para
cada 8 exercícios de aplicação existem 11 exercícios de revisão, a diferença entre os números de
exercícios de revisão e de aplicação é igual a

(A) 288.
(B) 306.
(C) 375.
(D) 450.
(E) 495.

**Resposta correta:** A

### (insper-2026.2) Questão 18

Os gêmeos Gustavo e Henrique ganharam uma caixa com 11 carrinhos, que estão numerados de 1 a 11. Eles
decidiram dividir esses carrinhos entre eles e sua irmã mais nova, de modo que ela ficará com 3 carrinhos
e cada um dos gêmeos com 4 carrinhos. Gustavo não quer pegar carrinhos com números pares e Henrique não
quer pegar carrinhos com números ímpares.

Nessas condições, o número de maneiras de esses carrinhos serem distribuídos é igual a

(A) 75.
(B) 120.
(C) 144.
(D) 240.
(E) 252.

**Resposta correta:** A

### (insper-2026.2) Questão 20

Um condomínio é formado pelos prédios A, B e C, que, juntos, têm um total de 165 apartamentos. Um desses
prédios tem o dobro de apartamentos de outro prédio. O número de apartamentos do prédio A excede em 19 a
soma dos números de apartamentos dos prédios B e C.

Nessas condições, o número de apartamentos do prédio que tem menos apartamentos é igual a

(A) 25.
(B) 27.
(C) 30.
(D) 33.
(E) 38.

**Resposta correta:** B

### (insper-2026.2) Questão 24

Os cilindros retos A e B têm alturas respectivamente iguais a 5 cm e 6 cm. O raio do cilindro B excede o
raio do cilindro A em 2 cm, sendo os raios desses cilindros menores do que 10 cm. O volume do cilindro B
excede o volume do cilindro A em 136π cm³. O raio do cilindro A mede

(A) 4 cm.
(B) 5 cm.
(C) 6 cm.
(D) 7 cm.
(E) 8 cm.

**Resposta correta:** A

### (insper-2026.2) Questão 25

A média aritmética das notas de 150 alunos em uma prova foi igual a 8,8 e a maior nota nessa prova foi
9,9. Se nenhum aluno tirou menos do que 8, o número de alunos que tiraram a maior nota foi, no máximo,
igual a

(A) 54.
(B) 63.
(C) 66.
(D) 72.
(E) 75.

**Resposta correta:** B

### (insper-2026.2) Questão 26

No plano cartesiano, a função polinomial do primeiro grau f e a função quadrática g são tais que
f(2) = g(0) = g(2) = 0. O gráfico da função f intersecta o eixo y no ponto A(0, 2) e o vértice da parábola
que representa o gráfico de g tem ordenada 2.

O valor de f(–9) + g(3) é igual a

(A) 0.
(B) 3.
(C) 5.
(D) 6.
(E) 9.

**Resposta correta:** C

### (insper-2026.2) Questão 27

No início de certo mês, em um restaurante, o número de pratos correspondia a 80% do número de copos. Ao
longo desse mês, foram comprados 60 copos e 20 pratos, e houve o descarte de 45 copos e 8 pratos. No fim
do mês, o número de copos excedia em 30 o número de pratos.

Nessas condições, o número de copos nesse restaurante no início do mês era igual a

(A) 120.
(B) 125.
(C) 130.
(D) 135.
(E) 140.

**Resposta correta:** D

### (insper-2026.2) Questão 29

Em 2025, do início do ano até o dia 31 de março, diariamente, as máquinas A e B produziram,
respectivamente, 663 e 1500 peças de certo produto. Do dia 1º de abril em diante, a cada dia, a produção
da máquina A aumentou em 29 unidades em relação ao dia anterior e, a cada dia, a produção da máquina B
aumentou em 20 unidades em relação ao dia anterior.

Nessas condições, qual foi o primeiro dia de 2025 em que a produção diária da máquina A foi maior do que
a produção diária da máquina B?

(A) 25 de maio.
(B) 31 de maio.
(C) 12 de junho.
(D) 24 de junho.
(E) 3 de julho.

**Resposta correta:** E

---

## Ciências da Natureza (Noções Gerais)

### (insper-2026.1) Questão 47

Um homem apresentou insuficiência renal após ser contaminado por uma espécie de bactéria. A única
alternativa de reversão desse quadro clínico é o transplante de rim. O doador considerado mais elegível,
em termos de compatibilidade genética, para esse transplante seria o

(A) pai.
(B) primo.
(C) tio.
(D) irmão não gêmeo.
(E) irmão gêmeo monozigótico.

**Resposta correta:** E

### (insper-2026.1) Questão 49

Nos seres humanos, a manutenção da temperatura corporal está associada a fenômenos adaptativos
fisiológicos e comportamentais. Por exemplo: em dias quentes, as glândulas sudoríparas são ativadas para
que a vaporização do suor auxilie no arrefecimento corporal. Outra adaptação do corpo humano, responsável
pela manutenção da temperatura corpórea em dias quentes, corresponde

(A) aos tremores musculares.
(B) ao comportamento de se encolher.
(C) ao eriçamento de pelos.
(D) à vasoconstrição periférica.
(E) à vasodilatação periférica.

**Resposta correta:** E

### (insper-2026.1) Questão 51

A reação entre um elemento muito eletronegativo e um elemento muito eletropositivo resulta em ligação
iônica, com a formação de cátion e ânion. Muitas vezes, nesse processo, são formadas espécies químicas
classificadas como isoeletrônicas, por possuírem o mesmo número de elétrons.

Uma substância formada por um cátion e um ânion isoeletrônicos é a de fórmula:

(A) LiF
(B) NaF
(C) MgCℓ₂
(D) MgBr₂
(E) K₂O

**Resposta correta:** B

### (insper-2026.1) Questão 52

Lâmpadas fluorescentes foram importantes substitutos de lâmpadas incandescentes, que tinham gastos
energéticos mais altos. Entretanto, as lâmpadas fluorescentes usam vapor de mercúrio em sua composição, o
que torna seu descarte possivelmente prejudicial ao meio ambiente e, atualmente, alavanca sua
substituição por lâmpadas de LED.

Uma lâmpada fluorescente de 40W tem volume interno de cerca de 200 mL e pressão interna do mercúrio de
2,1 × 10⁻³ atm. Considerando a constante universal dos gases igual a 0,08 atm·L·mol⁻¹·K⁻¹, a massa de Hg
(M = 200 g/mol) no interior dessa lâmpada, em miligramas, a uma temperatura de 300 K, é

(A) 1,75.
(B) 2,70.
(C) 3,50.
(D) 4,50.
(E) 5,25.

**Resposta correta:** C

### (insper-2026.1) Questão 54

Pela legislação brasileira, as indústrias têm que controlar o pH da água e eventualmente ajustá-lo antes
de descartar essa água na rede de esgoto. Para simular em sala de aula uma medida de concentração de íons
H⁺ em água de rejeito de uma indústria, uma professora utilizou indicadores ácido-base, cujas propriedades
são descritas na tabela.

| Indicador | Intervalo de pH de viragem | Cor abaixo da viragem | Cor acima da viragem |
|---|---|---|---|
| Tornassol | 5,0 a 7,0 | vermelha | azul |
| Fenolftaleína | 8,2 a 10,0 | incolor | rosa |
| Azul de bromotimol | 6,0 a 7,6 | amarela | azul |

Ao se adicionar algumas gotas de cada um desses indicadores na água utilizada na simulação, encontrou-se
o seguinte resultado:

| Indicador | Cor da solução |
|---|---|
| Tornassol | azul |
| Fenolftaleína | incolor |
| Azul de bromotimol | azul |

Com base nos resultados obtidos, a concentração de íons H⁺ presentes na referida solução, em mol/L, é de,
aproximadamente,

(A) 10⁻¹.
(B) 10⁻³.
(C) 10⁻⁵.
(D) 10⁻⁸.
(E) 10⁻¹⁰.

**Resposta correta:** D

### (insper-2026.1) Questão 56

Um estudante está chegando ao local em que será aplicada uma prova de vestibular. Deslocando-se em
direção à entrada do local, o estudante repara que o portão principal, de 5,5 m de comprimento, que
estava totalmente aberto, começa a ser fechado automaticamente, com velocidade constante de 0,2 m/s. O
estudante, então, inicia uma corrida para conseguir passar pelo portão.

Considere que, no momento em que o portão começa a ser fechado, o estudante encontrava-se a 100 metros de
distância desse portão e que, para conseguir passar por ele, é necessária uma abertura mínima de 0,5 m.
Supondo que o estudante correrá com velocidade constante, a velocidade mínima que o estudante deve
desenvolver para conseguir passar pelo portão é de

(A) 0,8 m/s.
(B) 1,5 m/s.
(C) 2,4 m/s.
(D) 3,2 m/s.
(E) 4,0 m/s.

**Resposta correta:** E

### (insper-2026.2) Questão 50

Considere os seguintes volumes de tipos de sangue disponíveis no banco de sangue de determinado hospital.

- 5 litros de sangue O+
- 4 litros de sangue O–
- 3 litros de sangue B+
- 2 litros de sangue B–
- 2 litros de sangue AB–

Um paciente com tipo sanguíneo B–, ao ser atendido nesse hospital para receber transfusão sanguínea,
informou ao médico que há alguns meses havia recebido sangue incompatível ao sistema Rh. Dessa forma, o
volume total de sangue disponível para a transfusão sanguínea nesse paciente equivale a

(A) 2 litros.
(B) 4 litros.
(C) 5 litros.
(D) 6 litros.
(E) 9 litros.

**Resposta correta:** D

### (insper-2026.2) Questão 51

Uma cooperativa de reciclagem triturou os polímeros polietilenotereftalato (PET) e poliamida (PA)
misturados. No entanto, como esses materiais passam por processos de reciclagem diferentes, os
fragmentos triturados precisaram ser separados.

Para proceder à separação dos materiais, foi preparada uma solução de cloreto de cálcio (CaCℓ₂) de
concentração apropriada e, em seguida, introduziu-se a mistura de PET e PA. Esse procedimento se baseia
em produzir um sistema de [densidade] adequada, permitindo separar os materiais por [flotação].

*(As lacunas do enunciado original são preenchidas pela alternativa correta.)*

As lacunas são preenchidas, respectivamente, por:

(A) acidez – dissolução.
(B) densidade – dissolução.
(C) densidade – flotação.
(D) temperatura de fusão – flotação.
(E) temperatura de fusão – destilação.

**Resposta correta:** C

### (insper-2026.2) Questão 53

Os metais estanho (Sn), zinco (Zn) e magnésio (Mg) são utilizados na proteção de peças de ferro contra a
oxidação. O Sn e o Zn são empregados de modo a cobrir toda a superfície da peça a ser protegida, enquanto
o Mg é posicionado em locais estratégicos da estrutura de ferro.

Quanto ao método de proteção, é possível dividir a proteção do ferro contra a oxidação em proteção por
barreira física, que recobre todo o material e o protege do contato com o ar, e proteção catódica, em que
o metal protetor atua como ânodo, repondo a perda de elétrons.

Considere os seguintes potenciais de redução:

- Mg²⁺ + 2e⁻ → Mg⁰, E⁰ = –2,37 V
- Zn²⁺ + 2e⁻ → Zn⁰, E⁰ = –0,76 V
- Fe²⁺ + 2e⁻ → Fe⁰, E⁰ = –0,44 V
- Sn²⁺ + 2e⁻ → Sn⁰, E⁰ = –0,14 V

Considerando os potenciais de redução apresentados e as técnicas descritas, o metal que fornece apenas
proteção por barreira física e o metal que fornece tanto proteção por barreira física como proteção
catódica são, respectivamente,

(A) estanho e zinco.
(B) estanho e magnésio.
(C) magnésio e zinco.
(D) zinco e magnésio.
(E) zinco e estanho.

**Resposta correta:** A

### (insper-2026.2) Questão 56

Um trem da Linha 4-Amarela do Metrô de São Paulo fez o percurso entre as estações Luz e Vila Sônia, que é
de 13 km, em 26 minutos. A velocidade escalar média desenvolvida por esse trem nesse percurso foi de

(A) 25 km/h.
(B) 30 km/h.
(C) 35 km/h.
(D) 40 km/h.
(E) 50 km/h.

**Resposta correta:** B

### (insper-2026.2) Questão 60

A figura mostra uma informação estampada na embalagem de uma lâmpada LED. Essa informação significa que
uma lâmpada LED de 15 W produz a mesma iluminação que uma antiga lâmpada incandescente de 90 W. Nessas
condições, o uso de uma lâmpada LED de 15 W no lugar de uma lâmpada incandescente de 90 W, durante 4
horas, resulta em uma economia de energia elétrica de

(A) 0,06 kWh.
(B) 0,18 kWh.
(C) 0,30 kWh.
(D) 0,36 kWh.
(E) 0,42 kWh.

**Resposta correta:** C

---

## História Geral

### (insper-2026.2) Questão 31

A passagem do nomadismo para o sedentarismo, ocorrida na Pré-História, está associada

(A) ao desenvolvimento de redes comerciais que desestimularam a formação de centros urbanos permanentes.
(B) à centralização do poder político com a organização da posse coletiva de terras e formas estáveis de
governo.
(C) à difusão de crenças religiosas monoteístas que reduziram deslocamentos constantes entre diferentes
regiões.
(D) à adoção de práticas produtivas que garantiram oferta de produtos e produção regular de alimentos
agrícolas.
(E) ao aperfeiçoamento das técnicas de navegação que permitiram fixar populações em áreas estratégicas.

**Resposta correta:** D
