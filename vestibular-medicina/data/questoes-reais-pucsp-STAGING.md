# Questões reais PUC-SP — Staging para revisão (pré-seleção)

**Fontes:** `pucsp2026-caderno-questoes.pdf` (50 questões objetivas + redação, Vestibular PUC-SP Verão 2026, prova aplicada em 19/10/2025, prova única sem variantes) e gabarito `pucsp2026-gabarito.pdf`. Só há o ano de 2026 disponível.

**Nota sobre extração:** o texto-fonte veio de PDF→texto (`pdftotext -layout -enc UTF-8`). Duas questões (03 e 15) continham tabelas embutidas como **imagem rasterizada** (não texto selecionável) — nesses dois casos a imagem foi renderizada em alta resolução (`pdfplumber`) e lida diretamente da página para transcrever os valores como texto abaixo. Todas as 10 questões aprovadas tiveram enunciado, alternativas e resultado recalculado/conferido contra o gabarito oficial (bateram 10/10).

## Resumo

| | 2026 |
|---|---|
| Total de questões | 50 |
| **Aprovadas** (baixo risco autoral) | **10** |
| Excluídas (citam/reproduzem terceiro) | 32 |
| Descartadas — exigem suporte a imagem no app | 8 |
| Revisar manualmente | 0 |

**Aprovadas por tema:**

| Tema | Qtde |
|---|---|
| Matemática | 3 |
| Física | 3 |
| Biologia | 2 |
| Química | 2 |
| **Total** | **10** |

Nenhuma questão aprovada nos temas: interpretação-texto, gramática, literatura, história, geografia, filosofia-sociologia, atualidades, artes-cultura, inglês. As 15 questões de Ciências Humanas (21-35) e as 15 de Linguagens (36-50) citavam texto de autor identificável (livro, artigo, dissertação, reportagem, poema, conto) ou reproduziam imagem/charge/cartum/quadro/pôster de terceiro em 100% dos casos — bloco inteiro excluído.

Em Ciências da Natureza (06-20) e no bloco inicial de Matemática (01-05), o padrão se repetiu: toda vez que o enunciado citava um artigo científico nomeado (ex.: *Química Nova*), uma dissertação de mestrado, uma reportagem (G1, Jornal da USP, Autos Segredos etc.) ou uma franquia comercial real (Pokémon, Questão 01), a questão foi excluída. As 10 aprovadas são questões autocontidas (só a pergunta da própria banca, sem fonte externa) ou baseadas em dado técnico/estatístico oficial sem autoria criativa identificável (Ministério da Saúde; tabela anônima de resultados esportivos da CBF, sem nomes de times).

---

## MATEMÁTICA (3 questões)

### (pucsp-2026) Questão 03

No futebol, o saldo de gols é a diferença entre a quantidade de gols marcados por um time (gols pró) e a quantidade de gols sofridos por esse mesmo time (gols contra). Essa medida costuma ser utilizada como critério de desempate na classificação de campeonatos e, por isso, os departamentos técnicos dos times costumam ficar atentos ao valor dela durante uma competição. A tabela a seguir exibe a classificação final da primeira divisão do campeonato brasileiro de futebol em 2024, com a quantidade de pontos, a quantidade de gols pró e a quantidade de gols contra de cada time (sem identificação dos times).

| Pontos | Gols Pró | Gols Contra |
|---|---|---|
| 79 | 59 | 29 |
| 73 | 60 | 33 |
| 70 | 61 | 42 |
| 68 | 53 | 39 |
| 65 | 53 | 36 |
| 59 | 53 | 43 |
| 56 | 54 | 45 |
| 53 | 49 | 49 |
| 52 | 43 | 41 |
| 50 | 43 | 56 |
| 47 | 45 | 52 |
| 47 | 47 | 54 |
| 46 | 33 | 39 |
| 45 | 44 | 50 |
| 45 | 48 | 59 |
| 44 | 44 | 48 |
| 42 | 40 | 46 |
| 38 | 42 | 61 |
| 30 | 29 | 58 |
| 30 | 29 | 49 |

A mediana dos saldos de gols das equipes da primeira divisão do campeonato brasileiro de futebol de 2024 foi

a) –13.
b) –10.
c) –6.
d) –5.
e) 0.

**Resposta correta:** d

*Nota: a tabela veio como imagem no PDF (renderizada e transcrita diretamente da página); é dado estatístico público (CBF), sem nomes de times e sem elemento criativo/autoral — tratada como baixo risco, no mesmo padrão da tabela ABNT/IBGE aprovada na FUVEST. Cálculo conferido: saldos ordenados = -29,-20,-19,-13,-11,-7,-7,-6,-6,-6,-4,0,2,9,10,14,17,19,27,30; mediana (20 valores) = média do 10º e 11º = (-6-4)/2 = -5. Bate com o gabarito oficial (D).*

---

### (pucsp-2026) Questão 04

Um prédio conta com cinco caixas-d'água de formato cilíndrico, todas com 1,80 m de diâmetro e 2,00 m de altura. As caixas-d'água estão posicionadas uma ao lado da outra e interligadas por quatro canos PVC de 40 mm de diâmetro e 1,5 m de comprimento.

Considere 3 como aproximação para π e que as caixas-d'água e os canos devem estar completamente cheios.

A capacidade de armazenamento de água desse prédio é, em litros, de

a) 4.860,0.
b) 4.861,8.
c) 24.300,0.
d) 24.307,2.
e) 24.309,0.

**Resposta correta:** d

*Nota: questão 100% autocontida (puro cálculo de volume de cilindros), sem nenhuma fonte externa. Cálculo: 5 caixas × (3 × 0,9² × 2) = 24,3 m³ = 24.300 L; 4 canos × (3 × 0,02² × 1,5) = 0,0072 m³ = 7,2 L; total = 24.307,2 L. Bate com o gabarito oficial (D).*

---

### (pucsp-2026) Questão 05

Uma loja de cosméticos oferece um clube de assinatura em que cada assinante recebe mensalmente um boxe com produtos variados. Cada boxe conta com duas máscaras de tratamento capilar, três hidratantes corporais e dois perfumes. Para a montagem dos boxes, a loja conta com 5 opções de máscara de tratamento capilar, 10 opções de hidratante corporal e 15 opções de perfume, todas diferentes entre si.

Nessas condições, o número de boxes distintos que podem ser formados nesse clube é expresso por

a) A(30,7).
b) C(30,7).
c) A(5,2) · A(10,3) · A(15,2).
d) C(5,2) · C(10,3) · C(15,2).
e) A(7,2) · A(13,3) · A(17,2).

**Resposta correta:** d

*Nota: questão 100% autocontida (puro cálculo de combinatória), sem nenhuma fonte externa. Como a ordem dos itens dentro de cada categoria do boxe não importa, a resposta é combinação simples por categoria. Bate com o gabarito oficial (D).*

---

## FÍSICA (3 questões)

### (pucsp-2026) Questão 11

Uma empresa de internet está instalando cabos de fibra óptica submarinos que utilizam laser para transmitir dados. Os receptores ópticos da fibra devem receber o sinal do laser lançado com uma frequência de 1,29 · 10¹⁴ Hz, priorizando maior eficiência com o mínimo de perdas.

Considere que o sinal se propaga dentro da fibra a uma velocidade de 2 · 10⁸ m/s.

O comprimento de onda ideal para o sinal a ser transmitido é

a) 0,8 · 10⁻³ mm.
b) 1,2 · 10⁻³ mm.
c) 1,55 · 10⁻³ mm.
d) 2,0 · 10⁻³ mm.
e) 15,5 · 10⁻³ mm.

**Resposta correta:** c

*Nota: questão 100% autocontida (cálculo direto λ = v/f), sem nenhuma fonte externa. λ = 2×10⁸ / 1,29×10¹⁴ ≈ 1,55×10⁻⁶ m = 1,55×10⁻³ mm. Bate com o gabarito oficial (C).*

---

### (pucsp-2026) Questão 13

Durante uma expedição científica na Patagônia, um grupo de pesquisadores coletou amostras de água de um lago parcialmente congelado. Para realizar as análises, eles precisaram derreter um bloco de gelo de 500 g que estava a −10 ºC e aquecê-lo até 20 ºC. Eles utilizaram um pequeno aquecedor portátil de potência 500 W, alimentado por energia solar.

Considere que o calor específico do gelo é de 0,5 cal/g°C, o calor específico da água é de 1 cal/g°C, o calor latente de fusão é de 80 cal/g e 1 cal equivale a aproximadamente 4,2 J.

O tempo necessário para que todo o processo descrito no texto ocorra é de

a) 1 min e 24 s.
b) 1 min e 55 s.
c) 5 min e 36 s.
d) 5 min e 57 s.
e) 7 min e 21 s.

**Resposta correta:** e

*Nota: questão 100% autocontida (cálculo de calor sensível + calor latente), sem nenhuma fonte externa. Q = 500×0,5×10 (aquecer gelo) + 500×80 (fundir) + 500×1×20 (aquecer água) = 2.500+40.000+10.000 = 52.500 cal = 220.500 J; t = 220.500/500 = 441 s = 7 min 21 s. Bate com o gabarito oficial (E).*

---

### (pucsp-2026) Questão 15

Os testes de segurança de frenagem avaliam a capacidade do veículo de parar em diferentes condições. Os resultados desses testes são apresentados em uma escala de estrelas, que varia de 0 a 5, indicando o nível de segurança do veículo. Uma montadora é posta em um teste de frenagem que envolve posicionar um boneco, que simula um pedestre, a 85 m de distância do carro, que deve estar a uma velocidade de 108 km/h. Caso o automóvel consiga evitar a colisão, passa no teste atingindo 5 estrelas. Os níveis de estrela vão diminuindo à medida que a velocidade do carro no momento da colisão aumenta, como mostra o quadro:

| Nível de qualidade da frenagem | Velocidade do carro no momento do impacto |
|---|---|
| 4 estrelas | 0 a 10 km/h |
| 3 estrelas | 10 a 20 km/h |
| 2 estrelas | 20 a 40 km/h |
| 1 estrela | Mais de 40 km/h |

Em um desses testes, o sistema de frenagem automática leva 0,50 s para reagir e, após esse tempo, inicia uma desaceleração constante de 6,0 m/s² até parar.

O nível de qualidade de frenagem do veículo testado é

a) 5 estrelas.
b) 4 estrelas.
c) 3 estrelas.
d) 2 estrelas.
e) 1 estrela.

**Resposta correta:** d

*Nota: o "quadro" veio como imagem no PDF (renderizada e transcrita diretamente da página); é tabela técnica genérica criada pela própria banca para o problema, sem elemento criativo/autoral de terceiro — baixo risco. Cálculo: v0 = 108 km/h = 30 m/s; distância em reação (0,5s) = 15 m; distância restante = 70 m; v² = 30² − 2×6×70 = 900−840 = 60 → v ≈ 7,75 m/s ≈ 27,9 km/h → faixa 20-40 km/h → 2 estrelas. Bate com o gabarito oficial (D).*

---

## BIOLOGIA (2 questões)

### (pucsp-2026) Questão 07

O raro fenótipo Bombay (Oh) é decorrente de mutações nos genes FUT1 e FUT2, que resultam na completa ausência dos antígenos H e ABO nos eritrócitos e nas secreções corpóreas. Indivíduos com fenótipo Bombay apresentam anticorpos anti-H, anti-A e anti-B. Na prática transfusional, indivíduos Bombay apresentam incompatibilidade com todas as hemácias ABO convencionais, devendo ser transfundidos, quando necessário, exclusivamente com hemácias raras de fenótipo Bombay.

A alteração genética que leva ao fenótipo descrito impede a formação da enzima

a) L-fucose.
b) D-galactose.
c) fucosiltransferase.
d) galactosiltransferase.
e) N-acetilgalactosaminiltransferase.

**Resposta correta:** c

*Nota: fonte citada é o Ministério da Saúde (Guia do cadastro nacional de sangue raro, 2022) — publicação técnica governamental, sem autoria criativa identificável de terceiro (mesmo padrão de baixo risco da tabela ABNT aprovada na FUVEST), tratada como dado oficial. O enunciado original faz referência a uma figura de biossíntese dos antígenos ABO ("representada a seguir"), que não foi reproduzida aqui — não é necessária para responder: mutações em FUT1/FUT2 impedem a fucosiltransferase, enzima que forma o antígeno H (precursor sobre o qual atuam as enzimas que geram os antígenos A e B), conhecimento padrão do fenótipo Bombay. Resposta conferida contra o gabarito oficial (C).*

---

### (pucsp-2026) Questão 09

Pesquisas revelam que a mioglobina, proteína muscular presente em mamíferos, ocorre em concentrações muito superiores em espécies mergulhadoras, como focas e baleias, quando comparadas a mamíferos terrestres. Essa abundância é tamanha que a musculatura desses animais apresenta coloração muito escura. Estudos indicam que, ao longo de aproximadamente 200 milhões de anos, houve um aumento significativo na concentração dessa proteína em mamíferos marinhos. Além disso, uma descoberta relevante aponta que a carga elétrica da molécula de mioglobina é maior nessas espécies, o que evita a agregação excessiva das proteínas e possibilita níveis elevados em seus músculos sem prejuízos estruturais ou fisiológicos.

A grande presença dessa proteína nos músculos de mamíferos mergulhadores é crucial para a sobrevivência, pois

a) impede a produção de ácido láctico.
b) garante a concentração ideal de cálcio.
c) aumenta a força da contração muscular.
d) estimula a multiplicação de mitocôndrias.
e) permite o armazenamento de gás oxigênio.

**Resposta correta:** e

*Nota: enunciado sem nenhuma fonte/citação creditada (única questão de Ciências da Natureza sem referência bibliográfica no rodapé) — texto genérico de divulgação científica sem autoria identificável de terceiro. Resposta conferida contra o gabarito oficial (E).*

---

## QUÍMICA (2 questões)

### (pucsp-2026) Questão 18

Na etapa de coagulação do tratamento de água, utiliza-se sulfato de alumínio [Al2(SO4)3] para formar flocos de hidróxido de alumínio [Al(OH)3], que agregam impurezas. A reação química desse processo é:

Al2(SO4)3 + 3 Ca(HCO3)2 → 2 Al(OH)3 + 3 CaSO4 + 6 CO2

Uma estação de tratamento de água (ETA) consome 147 kg de sulfato de alumínio [Al2(SO4)3] por dia para coagular impurezas.

Considere as seguintes massas molares: Al2(SO4)3 = 342 g/mol; Al(OH)3 = 78 g/mol; Ca(HCO3)2 = 162 g/mol; CaSO4 = 136 g/mol e CO2 = 44 g/mol.

A massa aproximada, em quilograma, de hidróxido de alumínio produzido diariamente é igual a

a) 33,5.
b) 67,0.
c) 70,4.
d) 134,1.
e) 209,0.

**Resposta correta:** b

*Nota: questão 100% autocontida (estequiometria pura), sem nenhuma fonte externa. 147.000 g / 342 g/mol ≈ 429,8 mol de Al2(SO4)3 → 859,6 mol de Al(OH)3 (razão 1:2) × 78 g/mol ≈ 67.049 g ≈ 67,0 kg. Bate com o gabarito oficial (B).*

---

### (pucsp-2026) Questão 19

Biomassa é a matéria orgânica de origem vegetal ou animal utilizada como fonte de energia renovável. Sua importância está na redução da dependência de combustíveis fósseis e na diminuição das emissões de gases poluentes. Para um melhor aproveitamento dessa fonte, alguns processos incluem a trituração da biomassa com o objetivo de aumentar a velocidade de decomposição da matéria orgânica pelos microrganismos, contribuindo para uma produção mais estável e eficiente do biogás.

A velocidade de decomposição da biomassa aumenta devido ao(à)

a) diminuição da concentração dos reagentes, o que reduz a resistência do meio, acelerando a cinética.
b) aumento da energia de ativação, o que torna as moléculas mais reativas, facilitando a ação microbiana.
c) diminuição da temperatura do meio, o que estabiliza os microrganismos, favorecendo a decomposição.
d) aumento da pressão parcial de oxigênio, o que intensifica a oxidação da biomassa pelos microrganismos, facilitando a decomposição.
e) aumento da superfície de contato, o que favorece a interação entre os microrganismos e o substrato, acelerando reações heterogêneas.

**Resposta correta:** e

*Nota: questão 100% autocontida (cinética química — efeito da superfície de contato), sem nenhuma fonte externa. Resposta conferida contra o gabarito oficial (E).*

---

## Descartadas — exigem suporte a imagem no app

Questões cujas alternativas ou o próprio enunciado dependem de uma imagem/gráfico/charge/pôster de terceiro para serem respondidas, e por isso não foram transcritas em texto:

- **Questão 35** (Ciências Humanas) — pergunta sobre um infográfico não reproduzível em texto (fonte: Câmara Municipal de São Francisco do Conde).
- **Questão 36** (Linguagens) — cartaz/pôster de protesto (fonte: David Polack Vintage Posters).
- **Questão 37** (Linguagens) — cartum de Tom Gauld (fonte: Instagram/tomgauld.com).
- **Questão 38** (Linguagens) — cartum de Grant Snider (fonte: Los Angeles Review of Books).
- **Questão 42** (Linguagens) — pintura "Esperança" de George Frederic Watts (Tate Britain) + texto descritivo de terceiro.
- **Questão 44** (Linguagens) — pergunta sobre uma peça de campanha (pôster) do Ministério Público do Estado da Bahia, não reproduzível em texto.
- **Questão 46** (Linguagens) — tirinha de André Dahmer (fonte: Le Monde Diplomatique Brasil).
- **Questão 47** (Linguagens) — cartaz de campanha da Prefeitura de Araçatuba.

## Revisar manualmente

Nenhuma pendência. As duas tabelas que vieram como imagem no PDF (questões 03 e 15) foram renderizadas e lidas diretamente da página, com os valores conferidos contra o gabarito oficial.
