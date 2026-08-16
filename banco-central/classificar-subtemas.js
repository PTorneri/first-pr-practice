// Classifica cada questão do banco central num SUBTEMA dentro da sua frente.
//
//   node banco-central/classificar-subtemas.js                classifica e grava
//   node banco-central/classificar-subtemas.js --residuo       o que não pontuou
//   node banco-central/classificar-subtemas.js --residuo geografia
//   node banco-central/classificar-subtemas.js --amostra biologia-genetica
//   node banco-central/classificar-subtemas.js --apertadas     margem <= 1
//   node banco-central/classificar-subtemas.js --falsos        regra que casa texto neutro
//   node banco-central/classificar-subtemas.js --dentro        regra que casa DENTRO de palavra
//
// POR QUE SUBTEMA
//
// O plano de 90 dias sorteia por FRENTE. "Biologia" aparecer no calendário não
// garante que genética tenha sido estudada -- a seleção é circular dentro do
// banco inteiro da frente, então um aluno pode fechar os 90 dias tendo visto
// citologia três vezes e evolução nenhuma. Com subtema, o mesmo alocador
// proporcional passa a garantir cobertura do programa, não só da matéria.
//
// Este é o mesmo mecanismo que vestibular-economia/classificar-matematica.js já
// provou em produção para Matemática (5 sub-frentes, 663 questões), generalizado
// para as 15 frentes do banco central. As regras de Matemática são as de lá,
// copiadas com os 25 roteamentos manuais que vieram junto.
//
// O CUSTO DO ERRO AQUI É BAIXO, E ISSO MUDA O PROJETO DA REGRA
//
// Uma questão de genética que caia na rotação de citologia continua sendo uma
// questão boa, respondida no dia errado. Não é gabarito trocado. Por isso a
// regra é generosa: pontua por evidência acumulada e só manda para o resíduo
// quem não pontuou em nada.
//
// TRÊS SINAIS, NESTA ORDEM DE AUTORIDADE
//
// 1. `revisado` no mapa anterior, ou REVISADAS aqui -- decisão humana, manda sempre.
// 2. `frenteOrigem` da questão -- verdade declarada pela trilha que a escreveu.
//    As quatro Atualidades de Direito JÁ SÃO subtemas, e "historia-brasil" já
//    diz que a questão não é de História Geral. Aproveitar isso é melhor que
//    readivinhar por regex o que alguém já classificou à mão.
// 3. A regex com pesos.

const fs = require("fs");
const path = require("path");

const QUESTOES = path.join(__dirname, "data", "questions");
const SAIDA = path.join(__dirname, "data", "subtemas");

// ------------------------------------------------------------------- os subtemas
//
// `peso` alto = termo que sozinho decide; peso 1 = indício. A ordem da lista
// desempata quando dois subtemas empatam em pontos.

const SUBTEMAS = {
  // ---------------------------------------------------------------- Matemática
  // As cinco de vestibular-economia/classificar-matematica.js, sem alteração:
  // foram calibradas contra este mesmo corpus (as 676 daqui são as 663 de lá
  // mais as reais que entraram depois) e já passaram por revisão de amostra.
  matematica: [
    { id: "matematica-sequencias", nome: "Sequências e Recorrências", regras: [
      [/progress[ãa]o (aritm[ée]tica|geom[ée]trica)|\bP\.?A\.?\b|\bP\.?G\.?\b/i, 5],
      [/termo geral|en[ée]simo termo|termo de ordem|raz[ãa]o da (progress|sequ)/i, 4],
      [/primeiro termo/i, 1],
      [/\bsequ[êe]ncia|recorr[êe]ncia|recursiv/i, 3],
      [/soma dos (\d+ )?primeiros termos|termos consecutivos/i, 3],
      [/padr[ãa]o|figura seguinte|pr[óo]xima figura|etapa seguinte/i, 1],
    ] },
    { id: "matematica-probabilidade", nome: "Probabilidade e Contagem", regras: [
      [/probabilidade|chance de/i, 5],
      [/combina[çc][ãa]o|arranjo|permuta[çc][ãa]o|anagrama|fatorial/i, 4],
      [/de quantas (maneiras|formas)|de quantos modos|quantos (an|c[óo]digos|n[úu]meros distintos)/i, 4],
      [/sorte(io|ada|ado)|ao acaso|aleat[óo]ri/i, 3],
      // Só o singular: "dados" no plural é quase sempre "com base nesses dados",
      // não o cubo de seis faces. Quem fala de dois dados costuma dizer também
      // "lançamento" ou "ao acaso", cobertos pelas regras acima.
      [/\bdado\b|lan[çc]amento de .{0,12}dados|moeda|baralho|urna|bolas?\b|fichas?\b/i, 2],
      [/casos favor[áa]veis|espa[çc]o amostral|independentes/i, 3],
      [/senha|placa|c[óo]digo de acesso|formad[oa]s? por \d+ (letras|algarismos)/i, 4],
      [/preval[êe]ncia|sensibilidade|especificidade|valor preditivo|falso positivo/i, 5],
      [/conjunto[s]? .*(ambos|nenhum|apenas)|diagrama de venn|inclus[ãa]o e exclus[ãa]o|assistem a ambos|leram (o|os) livro/i, 3],
    ] },
    { id: "matematica-algebra", nome: "Álgebra, Funções e Matrizes", regras: [
      [/matriz|determinante|\bdet\b/i, 5],
      [/fun[çc][ãa]o (afim|quadr[áa]tica|exponencial|logar[íi]tmica|do (primeiro|segundo) grau)|f\(x\)|gr[áa]fico da fun[çc][ãa]o/i, 5],
      [/logaritmo|\blog\b|exponencial/i, 4],
      [/equa[çc][ãa]o|inequa[çc][ãa]o|sistema (linear|de equa)|polin[ôo]mio|ra[íi]zes da/i, 3],
      [/inc[óo]gnita|vari[áa]vel|isolar|substitui[çc][ãa]o/i, 2],
      [/fun[çc][ãa]o/i, 2],
      [/meia-vida|decaimento|dobra a cada|P\(t\)|\bcresce \d+% (ao|por)/i, 4],
      [/d[íi]zima peri[óo]dica|conjuntos num[ée]ricos|n[úu]meros (racionais|irracionais|inteiros)|radical|√/i, 3],
      [/concentra[çc][ãa]o de|mistur(a|ar) .*solu[çc][ãa]o|arrecadando R\$/i, 2],
    ] },
    { id: "matematica-geometria", nome: "Geometria e Trigonometria", regras: [
      [/tri[âa]ngulo|circunfer[êe]ncia|c[íi]rculo|quadril[áa]tero|trap[ée]zio|losango|hex[áa]gono|pol[íi]gono/i, 5],
      [/cubo|cilindro|cone|esfera|prisma|pir[âa]mide|paralelep[íi]pedo/i, 5],
      [/seno|cosseno|tangente|trigonom|pit[áa]goras|semelhan[çc]a de tri/i, 5],
      [/[áa]rea|per[íi]metro|volume|diagonal|ap[óo]tema|hipotenusa|cateto/i, 3],
      [/[âa]ngulo|grau[s]? de inclina|\breta[s]?\b|plano cartesiano|coordenada|dist[âa]ncia entre/i, 3],
      [/raio|di[âa]metro|altura|base do|lado do/i, 2],
      [/poliedro|rela[çc][ãa]o de euler|v[ée]rtices|arestas|faces do/i, 4],
    ] },
    { id: "matematica-financeira", nome: "Estatística, Porcentagem e Proporção", regras: [
      [/juros?( simples| compostos)?|montante|capital|aplica[çc][ãa]o financeira|financiamento|presta[çc][ãa]o/i, 5],
      [/m[ée]dia (aritm[ée]tica|ponderada|simples)|mediana|\bmoda\b|desvio padr[ãa]o|vari[âa]ncia/i, 5],
      [/porcentagem|por cento|\d\s?%|desconto|acr[ée]scimo|aumento de \d|reajuste|infla[çc][ãa]o|lucro|preju[íi]zo/i, 4],
      [/gr[áa]fico de (setores|barras|colunas)|tabela de frequ[êe]ncia|frequ[êe]ncia relativa|amostra/i, 4],
      [/regra de tr[êe]s|proporcion|propor[çc][ãa]o|raz[ãa]o|escala|densidade demogr/i, 3],
      [/dividid[oa]s? .*(na|em) raz[ãa]o|na raz[ãa]o \d+\s*:\s*\d+|divis[ãa]o proporcional/i, 5],
      [/velocidade m[ée]dia|consumo m[ée]dio|vaz[ãa]o|rendimento .*por|trabalhando (sozinh|junt)/i, 4],
      [/m[ée]dia\b/i, 2],
      [/pre[çc]o|custo|receita|sal[áa]rio|or[çc]amento/i, 2],
    ] },
    { id: "matematica-complexos", nome: "Números Complexos", regras: [
      [/n[uú]mero[s]? complexo|forma trigonom[ée]trica de um complexo|plano de argand|argand-gauss/i, 5],
      [/\bi\s*=\s*√[-−]1|i[²2]\s*=\s*[-−]1|unidade imagin[áa]ria/i, 5],
      [/de moivre|ra[íi]zes? n-[ée]sima[s]?|ra[íi]zes? complexas/i, 5],
      [/conjugado (de|do)|m[óo]dulo (do|de um) (n[uú]mero )?complexo|\|z\|/i, 4],
      [/parte real|parte imagin[áa]ria|z\s*=\s*a\s*\+\s*bi/i, 4],
      [/argumento (do|de um) (n[uú]mero )?complexo|forma polar de/i, 4],
      // notação z₁, z₂, "a+bi" apontando pra numero complexo mesmo sem citar a palavra
      [/\bz[₀₁₂₃\d]*\s*=\s*[-−]?\d*\s*[+\-−]\s*\d*i\b/i, 4],
      [/cos\s*\d+°.*i\s*sen|cos\s*θ\s*\+\s*i\s*sen/i, 4],
      [/\bi\b.{0,15}(\+|\-|−).{0,15}\bi\b/, 1],
    ] },
    { id: "matematica-polinomios", nome: "Polinômios", regras: [
      [/rela[çc][õo]es? de girard/i, 5],
      [/teorema do resto|teorema fundamental da [áa]lgebra|d'alembert/i, 5],
      [/multiplicidade da raiz|raiz (dupla|tripla|de multiplicidade)/i, 4],
      [/polin[ôo]mio de grau|coeficientes do polin[ôo]mio|soma das ra[íi]zes|produto das ra[íi]zes/i, 4],
      [/dividido por \(x\s*[-−]|divis[ãa]o de polin[ôo]mios|quociente (obtido|da divis[ãa]o)/i, 4],
      [/\bp\(x\)\s*=/i, 3],
      [/resto da divis[ãa]o|[ée] ra[íi]z d[eo] polin[ôo]mio|raiz racional/i, 3],
      [/grau do polin[ôo]mio|grau do quociente|coeficiente l[íi]der/i, 3],
    ] },
    { id: "matematica-logica-conjuntos", nome: "Lógica e Conjuntos", regras: [
      [/diagrama de venn|opera[çc][õo]es? (entre|com) conjuntos/i, 5],
      [/uni[ãa]o (de|dos|entre) conjuntos|interse[çc][ãa]o (de|dos|entre) conjuntos|conjunto complementar|diferen[çc]a entre conjuntos|diferen[çc]a sim[ée]trica/i, 5],
      [/tabela[- ]verdade|proposi[çc][ãa]o (l[óo]gica|composta|simples)|conectivo l[óo]gico|valor l[óo]gico/i, 5],
      [/nega[çc][ãa]o (l[óo]gica |d[ao] )?(proposi[çc][ãa]o|condicional)|contrapositiva|bicondicional|rec[íi]proca/i, 4],
      [/para todo\b|existe (pelo menos )?um\b|quantificador/i, 4],
      [/se e somente se|condi[çc][ãa]o necess[áa]ria e suficiente/i, 3],
      [/inclus[ãa]o e exclus[ãa]o|n[úu]mero de elementos d[ao] uni[ãa]o/i, 4],
      // fraseado de problema de conjuntos sem usar a palavra "conjunto"
      [/n[ãa]o (fazem|sabem|gostam|assinam|estudam) nenhum|apenas (um|uma) d[oa]s duas|ambos os (servi[çc]os|cursinhos|gêneros|g[ée]neros)/i, 4],
      [/\bA\s*∪\s*B|\bA\s*∩\s*B|\bA\s*[-−]\s*B|\bA\s*△\s*B|Aᶜ|Bᶜ/, 5],
      [/\bp\s*→\s*q|~p|¬p|proposi[çc][õo]es? p[,:]? q/i, 4],
      [/silogismo|argumento v[áa]lido|premissa[s]?/i, 3],
    ] },
  ],

  // ---------------------------------------------------------------- Biologia
  biologia: [
    { id: "biologia-genetica", nome: "Genética e Hereditariedade", regras: [
      [/alelo|hom*ozigot|heterozigot|gen[óo]tipo|fen[óo]tipo|mendel/i, 5],
      [/heran[çc]a (gen[ée]tica|ligada|autoss)|cruzamento|descendentes|prole|gera[çc][ãa]o F\d/i, 4],
      [/dominante|recessiv|cromossomo|cari[óo]tipo|mutac[ãa]o|mutante/i, 4],
      [/\bDNA\b|\bRNA\b|\bgenes?\b|transcri[çc][ãa]o|tradu[çc][ãa]o|c[óo]digo gen[ée]tico/i, 3],
      [/grupo sangu[íi]neo|fator Rh|daltonismo|hemofilia|fibrose c[íi]stica|anemia falciforme/i, 5],
      [/transg[êe]nic|clonagem|engenharia gen[ée]tica|CRISPR|biotecnologia/i, 4],
      [/probabilidade de .*(filho|crian[çc]a|descend)/i, 3],
    ] },
    { id: "biologia-citologia", nome: "Citologia e Metabolismo Celular", regras: [
      [/c[ée]lula|celular|membrana plasm|organela|citoplasma|n[úu]cleo celular/i, 5],
      [/mitoc[ôo]ndria|ribossomo|lisossomo|complexo de golgi|ret[íi]culo endoplasm|cloroplasto/i, 5],
      [/mitose|meiose|ciclo celular|divis[ãa]o celular|c[ée]lulas?-filhas?/i, 5],
      [/fotoss[íi]ntese|respira[çc][ãa]o celular|fermenta[çc][ãa]o|\bATP\b|glic[óo]lise|ciclo de krebs/i, 5],
      [/osmose|difus[ãa]o|transporte ativo|permeabilidade|bomba de s[óo]dio/i, 4],
      [/prote[íi]na|enzima|amino[áa]cido|lip[íi]dio|carboidrato|substrato/i, 2],
    ] },
    { id: "biologia-fisiologia", nome: "Fisiologia Humana e Saúde", regras: [
      [/sistema (nervoso|circulat|digest|respirat|excret|end[óo]crino|imunol)/i, 5],
      [/cora[çc][ãa]o|pulm[ãa]o|pulmon|\brim\b|rins|f[íi]gado|est[ôo]mago|intestino|alv[ée]olo/i, 5],
      [/horm[ôo]nio|insulina|adrenalina|tire[óo]ide|glicemia|diabetes/i, 5],
      [/sangue|sangu[íi]ne|press[ãa]o arterial|hem[áa]cia|leuc[óo]cito|plaqueta/i, 4],
      [/neur[ôo]nio|sinapse|impulso nervoso|c[ée]rebro|medula/i, 4],
      [/vacina|anticorpo|ant[íi]geno|imunidade|infec[çc][ãa]o|v[íi]rus|bact[ée]ria|patog/i, 4],
      [/digest[ãa]o|absor[çc][ãa]o de nutrientes|metabolismo bas|homeostase|desidrata[çc][ãa]o/i, 3],
      [/gravidez|gesta[çc][ãa]o|f[ée]rtil|reprodu[çc][ãa]o humana|espermatoz|[óo]vulo|menstrual/i, 4],
    ] },
    { id: "biologia-ecologia", nome: "Ecologia e Meio Ambiente", regras: [
      [/ecossistema|cadeia alimentar|teia alimentar|n[íi]vel tr[óo]fico|produtor|decompositor/i, 5],
      [/bioma|cerrado|caatinga|amaz[ôo]ni|mata atl[âa]ntica|pantanal|savana|tundra/i, 5],
      [/popula[çc][ão]es? (de|natural)|comunidade ecol|habitat|nicho ecol[óo]gico/i, 4],
      [/ciclo (do carbono|do nitrog[êe]nio|da [áa]gua|biogeoqu)|fluxo de energia/i, 5],
      [/biodiversidade|extin[çc][ãa]o|esp[ée]cie (invasora|amea[çc]ada)|conserva[çc][ãa]o|desmatamento/i, 4],
      [/polui[çc][ãa]o|eutrofiza[çc][ãa]o|efeito estufa|aquecimento global|chuva [áa]cida|bioacumula/i, 4],
      [/met(al|ais) pesado|contamina[çc][ãa]o (do solo|da [áa]gua|ambiental)|lix[ãa]o|chorume|descarte (inadequado|de res[íi]duo|de pilha)|lixo eletr[ôo]nico|res[íi]duo s[óo]lido/i, 5],
      [/simbiose|predat|parasitismo|mutualismo|competi[çc][ãa]o (inter|intra)/i, 5],
    ] },
    { id: "biologia-evolucao", nome: "Evolução e Origem da Vida", regras: [
      [/\bevolu[çc][ãa]o|\bevolutiv|darwin|lamarck|sele[çc][ãa]o natural/i, 5],
      [/adapta[çc][ãa]o|ancestral comum|especia[çc][ãa]o|deriva gen[ée]tica|fluxo g[êe]nico/i, 4],
      [/f[óo]ssil|registro fossil|[óo]rg[ãa]os (hom[óo]logos|an[áa]logos)|filogen|[áa]rvore evolutiva/i, 5],
      [/origem da vida|abiog[êe]nese|biog[êe]nese|panspermia|coacervado/i, 5],
      [/resist[êe]ncia (a antibi[óo]ticos|bacteriana|a inseticida)/i, 4],
    ] },
    { id: "biologia-diversidade", nome: "Diversidade dos Seres Vivos", regras: [
      [/reino (animal|vegetal|fungi|monera|protista)|classifica[çc][ãa]o dos seres/i, 5],
      [/angiosperma|gimnosperma|briofita|pteridofita|fotoss[íi]ntese vegetal|xilema|floema|raiz|caule|folha/i, 4],
      [/artr[óo]pode|molusco|anel[íi]deo|cnid[áa]rio|porifer|equinoderm|nemat/i, 5],
      [/vertebrado|invertebrado|anf[íi]bio|r[ée]ptil|\bave[s]?\b|mam[íi]fero|peixe/i, 4],
      [/fungo|alga|protozo[áa]rio|arque|procariont|eucariont/i, 4],
      [/taxonomia|nomenclatura|g[êe]nero e esp[ée]cie|bin[ôo]mial/i, 4],
    ] },
  ],

  // ---------------------------------------------------------------- Química
  quimica: [
    { id: "quimica-estequiometria", nome: "Estequiometria e Cálculos", regras: [
      [/estequiom|\bmol\b|mols|quantidade de mat[ée]ria|massa molar|n[úu]mero de avogadro/i, 5],
      [/reagente limitante|excesso de reagente|rendimento (da rea|te[óo]rico)|pureza/i, 5],
      [/\bg\/mol\b|massa at[ôo]mica|massa molecular|propor[çc][ãa]o estequiom/i, 4],
      [/quantos? (gramas|mols|litros) (de|s[ãa]o)|calcule a massa|massa de \w+ (produzida|obtida|necess)/i, 4],
      [/equa[çc][ãa]o (qu[íi]mica )?balanceada|balanceamento|coeficientes? estequiom/i, 4],
    ] },
    { id: "quimica-solucoes", nome: "Soluções e Propriedades Coligativas", regras: [
      [/solu[çc][ãa]o (aquosa|de|com)|soluto|solvente|dissolv/i, 5],
      [/concentra[çc][ãa]o (em|molar|comum)|molaridade|\bmol\/L\b|\bg\/L\b|\bppm\b/i, 5],
      [/dilui[çc][ãa]o|diluir|titula[çc][ãa]o|solubilidade|satura[çc][ãa]o|precipita/i, 4],
      [/press[ãa]o de vapor|ebuliom|criom|osmose|coligativ|tonoscop/i, 5],
      [/mistura .*solu[çc]|misturar .*volumes/i, 3],
    ] },
    { id: "quimica-equilibrio-acido-base", nome: "Equilíbrio, Ácidos e Bases", regras: [
      [/equil[íi]brio (qu[íi]mico|i[ôo]nico)|constante de equil|\bKc\b|\bKp\b|le chatelier|deslocamento do equil/i, 5],
      // "base" precisa de contexto: sozinho casava "com base nesses dados", que
      // abre metade dos enunciados do banco.
      [/[áa]cido|\bbases? (forte|fraca|conjugada|de bronsted|de arrhenius)|\b(uma|a) base\b|car[áa]ter b[áa]sico|\bpH\b|\bpOH\b|neutraliza[çc][ãa]o|hidr[óo]lise|tamp[ãa]o/i, 5],
      [/ioniza[çc][ãa]o|dissocia[çc][ãa]o|\bKa\b|\bKb\b|\bKw\b|grau de ioniza/i, 5],
      [/indicador (de pH|[áa]cido)|fenolftale[íi]na|escala de pH|meio (b[áa]sico|[áa]cido|neutro)/i, 4],
      [/produto de solubilidade|\bKps\b|precipita[çc][ãa]o seletiva/i, 5],
    ] },
    { id: "quimica-eletroquimica", nome: "Eletroquímica e Oxirredução", regras: [
      [/eletroqu[íi]mic|pilha|bateria|c[ée]lula (eletrol[íi]tica|galv)|eletr[óo]lise/i, 5],
      [/oxida[çc][ãa]o|redu[çc][ãa]o|oxirredu|agente (oxidante|redutor)|\bnox\b|n[úu]mero de oxida/i, 5],
      [/potencial (padr[ãa]o|de redu[çc])|\bE0\b|for[çc]a eletromotriz|c[áa]todo|[âa]nodo/i, 5],
      [/corros[ãa]o|ferrugem|galvaniza[çc][ãa]o|metal de sacrif[íi]cio/i, 4],
      [/el[ée]trons? (transferid|recebid|perdid)/i, 3],
    ] },
    { id: "quimica-organica", nome: "Química Orgânica", regras: [
      // "orgânic" sozinho não serve: casava "agricultura orgânica", "alimento
      // orgânico" e "matéria orgânica em lixões" -- três famílias de questão que
      // não são de Química Orgânica. Achado na amostragem.
      [/qu[íi]mica org[âa]nica|composto[s]? org[âa]nico|mol[ée]cula[s]? org[âa]nica|fun[çc][ãa]o (org[âa]nica|oxigenada|nitrogenada)|s[íi]ntese org[âa]nica/i, 5],
      [/hidrocarboneto|cadeia carb[ôo]nica|carbono (prim[áa]rio|secund|terci|assim[ée]trico|quiral)/i, 5],
      // As fronteiras de palavra aqui não são decoração: sem `\b`, "amina" casa
      // dentro de "cont-amina-ção" e mandava toda questão de poluição para
      // Química Orgânica com peso 5. Achado na amostragem.
      [/\balcano|\balceno|\balcino|aromatic|benzeno|\balco[oó]l\b|\bald[ée]?[íi]?do|\bcetona|\b[ée]ster|\b[ée]ter\b|\bamina[s]?\b|\bamida[s]?\b|[áa]cido carbox/i, 5],
      [/fun[çc][ãa]o org[âa]nica|grupo funcional|nomenclatura org|isomeria|is[ôo]mer/i, 5],
      [/pol[íi]mero|polimeriza[çc][ãa]o|pl[áa]stico|\bPET\b|nylon|borracha/i, 5],
      [/f[áa]rmaco|medicamento|prote[íi]na|amino[áa]cido|glicose|sacarose|lip[íi]dio|[óo]leo|gordura|biodiesel|etanol/i, 3],
      [/rea[çc][ãa]o de (adi[çc][ãa]o|substitui[çc][ãa]o|elimina[çc][ãa]o|esterifica)/i, 4],
    ] },
    { id: "quimica-atomistica-ligacoes", nome: "Atomística, Tabela Periódica e Ligações", regras: [
      [/[áa]tomo|at[ôo]mic|pr[óo]ton|n[êe]utron|el[ée]tron[s]? (de valen|na camada)|camada de val/i, 5],
      [/tabela peri[óo]dica|per[íi]odo\b|fam[íi]lia\b|grupo \d+|metal alcalino|halog[êe]nio|g[áa]s nobre/i, 5],
      [/liga[çc][ãa]o (i[ôo]nica|covalente|met[áa]lica|de hidrog[êe]nio)|for[çc]as intermolec|dipolo|van der waals/i, 5],
      [/eletronegatividade|raio at[ôo]mico|energia de ioniza[çc][ãa]o|afinidade eletr/i, 5],
      [/geometria molecular|polaridade|molecula (polar|apolar)|\bV	R\b|hibrid/i, 5],
      [/is[óo]topo|is[óo]baro|is[óo]tono|n[úu]mero at[ôo]mico|n[úu]mero de massa|radioativ|meia-vida/i, 4],
    ] },
    { id: "quimica-termoquimica-cinetica", nome: "Termoquímica e Cinética", regras: [
      [/termoqu[íi]mic|entalpia|\bΔH\b|exot[ée]rmic|endot[ée]rmic|calor de (rea[çc]|combust|forma)/i, 5],
      [/cin[ée]tica qu[íi]mica|velocidade da rea[çc][ãa]o|catalisador|energia de ativa[çc][ãa]o|complexo ativado/i, 5],
      [/lei de hess|entropia|energia livre|gibbs|espontane/i, 5],
      [/combust[ãa]o|combust[íi]vel|poder calor[íi]fico|queima de/i, 3],
      [/gr[áa]fico .*(energia|caminho da rea[çc])|diagrama de energia/i, 4],
    ] },
  ],

  // ---------------------------------------------------------------- Física
  fisica: [
    { id: "fisica-mecanica", nome: "Cinemática e Dinâmica", regras: [
      [/velocidade (m[ée]dia|inicial|final|escalar)|acelera[çc][ãa]o|\bm\/s\b|km\/h/i, 5],
      [/for[çc]a (resultante|de atrito|normal|peso|el[áa]stica)|leis? de newton|din[âa]mica/i, 5],
      [/movimento (uniforme|retil[íi]neo|circular|vertical)|\bMRU\b|\bMRUV\b|queda livre|lan[çc]amento/i, 5],
      [/atrito|plano inclinado|\btra[çc][ãa]o|corda|polia|bloco de massa/i, 4],
      [/deslocamento|trajet[óo]ria|repouso|freia|frenagem|colide/i, 3],
      [/gravita[çc][ãa]o|[óo]rbita|sat[ée]lite|kepler|campo gravitacional/i, 5],
    ] },
    { id: "fisica-energia-trabalho", nome: "Trabalho, Energia e Momento", regras: [
      [/energia (cin[ée]tica|potencial|mec[âa]nica)|conserva[çc][ãa]o da energia/i, 5],
      [/trabalho (realizado|da for[çc]a|de uma for[çc]a)|\bjoule|\bJ\b(?!.)/i, 4],
      [/pot[êe]ncia (mec[âa]nica|desenvolvida|m[ée]dia)|rendimento|\bwatt|\bW\b(?!.)/i, 4],
      [/quantidade de movimento|momento linear|impulso|colis[ãa]o (el[áa]stica|inel[áa]stica)/i, 5],
      [/mola|constante el[áa]stica|hooke|deforma[çc][ãa]o el[áa]stica/i, 5],
      [/altura de \d|energia dissipada|atrito dissipa/i, 2],
    ] },
    { id: "fisica-termologia", nome: "Termologia e Termodinâmica", regras: [
      [/temperatura|termometr|celsius|kelvin|fahrenheit|grau[s]? cent/i, 5],
      [/calor (espec[íi]fico|latente|sens[íi]vel|trocado)|caloria|capacidade t[ée]rmica|equil[íi]brio t[ée]rmico/i, 5],
      [/dilata[çc][ãa]o (t[ée]rmica|linear|volum)|coeficiente de dilata/i, 5],
      [/termodin[âa]mica|m[áa]quina t[ée]rmica|carnot|entropia|g[áa]s (ideal|perfeito)|transforma[çc][ãa]o (isot|isob|adiab)/i, 5],
      [/condu[çc][ãa]o|convec[çc][ãa]o|irradia[çc][ãa]o|propaga[çc][ãa]o do calor|isolante t[ée]rmico/i, 5],
      [/mudan[çc]a de (estado|fase)|\bfus[ãa]o|vaporiza[çc][ãa]o|solidifica|condensa/i, 4],
    ] },
    { id: "fisica-ondas-optica", nome: "Ondas, Som e Óptica", regras: [
      // `\bonda` e não `onda`: sem a fronteira inicial casava "resp-onda".
      [/\bonda[s]?\b|ondulat[óo]ri|comprimento de onda|frequ[êe]ncia|\bhertz|\bHz\b|per[íi]odo da onda/i, 5],
      [/\bsom\b|sonor|ac[úu]stic|\beco\b|ultrassom|doppler|timbre|altura do som/i, 5],
      [/luz|[óo]ptic|espelho (plano|c[ôo]ncavo|convexo)|\blente|refra[çc][ãa]o|reflex[ãa]o|[íi]ndice de refra/i, 5],
      [/imagem (virtual|real|formada)|foco|dist[âa]ncia focal|dioptria|miopia|hipermetropia/i, 5],
      [/difra[çc][ãa]o|interfer[êe]ncia|polariza[çc][ãa]o|espectro eletromagn|ressonancia|ressonância/i, 5],
      [/amplitude|crista|vale da onda|velocidade de propaga/i, 3],
    ] },
    { id: "fisica-eletromagnetismo", nome: "Eletricidade e Magnetismo", regras: [
      [/corrente el[ée]trica|amp[èeé]re|\bA\b(?!.)|resist[êe]ncia el[ée]trica|\bohm|circuito/i, 5],
      [/\btens[ãa]o|\bvolts?\b|\bddp\b|diferen[çc]a de potencial|\bfem\b|\bf\.e\.m\.|gerador|pilha|bateria/i, 5],
      [/carga el[ée]trica|coulomb|campo el[ée]trico|potencial el[ée]trico|capacitor|eletrost[áa]tica/i, 5],
      // `[íi]m[ãa]` sem fronteira casava "clima", "última", "aproximadamente".
      [/campo magn[ée]tico|\b[íi]m[ãa]s?\b|magnet|indu[çc][ãa]o (eletromagn|magn)|faraday|lenz|fluxo magn/i, 5],
      [/pot[êe]ncia el[ée]trica|consumo (de energia|em kWh)|\bkWh\b|efeito joule|chuveiro|l[âa]mpada/i, 5],
      [/em s[ée]rie|em paralelo|resistor|amper[íi]metro|volt[íi]metro|transformador/i, 4],
    ] },
    { id: "fisica-hidrostatica", nome: "Hidrostática e Fluidos", regras: [
      [/press[ãa]o (hidrost|atmosf[ée]rica|no fundo|exercida)|\bpascal\b|\bPa\b|\batm\b|\bmmHg\b/i, 5],
      [/empuxo|arquimedes|flutua|afunda|densidade|massa espec[íi]fica/i, 5],
      [/fluido|l[íi]quido em (repouso|equil)|vasos comunicantes|prensa hidr[áa]ulica|manometro|manômetro/i, 5],
      [/vaz[ãa]o|escoamento|bernoulli|tubo de/i, 4],
    ] },
    { id: "fisica-moderna", nome: "Física Moderna e Relatividade", regras: [
      [/relatividade (restrita|especial)|dilata[çc][ãa]o do tempo|contra[çc][ãa]o do comprimento|transforma[çc][õo]es? de lorentz/i, 12],
      [/referenciais? inerci(al|ais)|simultaneidade de eventos|velocidade relativ[íi]stica|f[áa]tor de lorentz|\bγ\s*=/i, 10],
      [/efeito fotoel[ée]trico|f[óo]ton\b|quantum de energia|dualidade onda-part[íi]cula|de broglie/i, 12],
      [/E\s*=\s*mc[²2]|energia de repouso|massa relativ[íi]stica|energia cin[ée]tica relativ[íi]stica/i, 10],
      [/fun[çc][ãa]o trabalho (do metal|de um metal)|el[ée]trons? ejetados|frequ[êe]ncia de corte|energia cin[ée]tica m[áa]xima/i, 8],
      [/velocidade da luz|\bc\s*=\s*3[.,]0\s*×\s*10|pr[óo]ximas? de c\b|refer[êe]ncia (a|de) einstein/i, 5],
      [/n[úu]cleo espacial|nave espacial|astronauta|m[úu]on/i, 3],
    ] },
  ],

  // ---------------------------------------------------------------- História
  historia: [
    { id: "historia-brasil-colonia-imperio", nome: "Brasil: Colônia e Império", regras: [
      [/col[ôo]ni(a|al)|capitania|sesmaria|engenho|bandeirante|entrada[s]? e bandeira|pau-brasil/i, 5],
      [/escravid[ãa]o|escraviza|tr[áa]fico negreiro|quilombo|palmares|abolic|lei [áa]urea|ventre livre/i, 5],
      [/independ[êe]ncia do brasil|\b1822\b|d\.? pedro|imp[ée]rio (brasileiro|do brasil)|reg[êe]ncia|primeiro reinado|segundo reinado/i, 5],
      [/minera[çc][ãa]o (colonial|em minas)|inconfid[êe]ncia|derrama|ciclo do ouro|ciclo do a[çc][úu]car/i, 5],
      [/jesu[íi]ta|catequese|ind[íi]gena[s]? (no brasil|colonial)|aldeamento/i, 4],
      [/caf[ée]|bar[ãa]o|imigra[çc][ãa]o (europeia|italiana)|guerra do paraguai/i, 4],
      [/tordesilhas|madri(d)?\b.*trat|uti possidetis|expans[ãa]o territorial colonial/i, 5],
      [/confedera[çc][ãa]o do equador|cabanagem|farroupilha|sabinada|balaiada|malês|mal[êe]s|revolta[s]? regencial/i, 5],
      [/poder moderador|assembleia constituinte de 1823|carta de 1824|conselho de estado|parlamentarismo [àa]s avessas/i, 5],
      [/lei (eus[ée]bio de queir[óo]s|do ventre livre|dos sexagen[áa]rios)|abolicionis|tr[áa]fico atl[âa]ntico/i, 5],
    ] },
    { id: "historia-brasil-republica", nome: "Brasil: República", regras: [
      [/rep[úu]blica (velha|oligarq|brasileira)|\b1889\b|proclama[çc][ãa]o da rep|caf[ée] com leite|coronelismo|voto de cabresto/i, 5],
      [/vargas|estado novo|\b1930\b|\b1937\b|getulismo|trabalhismo|\bCLT\b/i, 5],
      [/ditadura militar|\b1964\b|\bAI-5\b|regime militar|anistia|redemocratiza[çc][ãa]o|diretas j[áa]/i, 5],
      [/constitui[çc][ãa]o de 1988|nova rep[úu]blica|collor|plano real|impeachment/i, 5],
      [/canudos|contestado|revolta da vacina|chibata|tenentismo|coluna prestes|semana de 22/i, 5],
      [/juscelino|bras[íi]lia|\bJK\b|jango|jo[ãa]o goulart|substitui[çc][ãa]o de importa/i, 4],
      // Brasil recente: o banco vai até o presente, e sem estas regras toda
      // questão de 1990 em diante caía no resíduo.
      [/jornadas de junho|\b2013\b|manifesta[çc][õo]es de (junho|2013)|junho de 2013/i, 5],
      [/teto de gastos|\bPEC\b \d|lei de responsabilidade fiscal|plano (real|cruzado|collor)|estabiliza[çc][ãa]o monet/i, 5],
      [/lei maria da penha|estatuto (da crian[çc]a|do idoso|da igualdade)|lei de cotas|\bECA\b|c[óo]digo de defesa do consumidor/i, 5],
      [/bolsa fam[íi]lia|programa (social|de transfer[êe]ncia)|\bSUS\b|\bENEM\b|\bPROUNI\b|universaliza[çc][ãa]o (do ensino|da sa[úu]de)/i, 5],
      [/diplomacia brasileira|pol[íi]tica externa (brasileira|independente)|itamaraty|brasil no (mercosul|cen[áa]rio internacional)/i, 5],
      [/redemocratiza|constituinte de 1987|governo (fhc|lula|dilma|temer|bolsonaro)|impeachment|milagre econ[ôo]mico/i, 5],
    ] },
    { id: "historia-geral-antiga-medieval", nome: "Antiguidade e Idade Média", regras: [
      [/gr[ée]cia antiga|grego[s]? (antigo|da p[óo]lis)|atenas|esparta|p[óo]lis|hel[êe]nic|democracia ateniense/i, 5],
      [/roma antiga|imp[ée]rio romano|rep[úu]blica romana|c[ée]sar|patr[íi]cio|plebeu|romaniza/i, 5],
      [/mesopot[âa]mia|egito antigo|fara[óo]|hebreu|fen[íi]cio|pers[a]/i, 5],
      [/feudal|feudo|servo da gleba|suserano|vassalo|idade m[ée]dia|medieval/i, 5],
      [/igreja cat[óo]lica na idade|cruzada|inquisi[çc][ãa]o medieval|escol[áa]stica|mosteiro|bizantin|isl[âa]mic|cal[íi]fado/i, 5],
      [/peste negra|renascimento comercial|\bburgo\b|corpora[çc][ãa]o de of[íi]cio/i, 4],
    ] },
    { id: "historia-geral-moderna", nome: "Idade Moderna", regras: [
      [/absolutismo|monarquia absoluta|lu[íi]s xiv|antigo regime|mercantilismo|metalismo|pacto colonial/i, 5],
      [/renascimento (cultural|art[íi]stico)|humanismo|reforma (protestante|religiosa)|lutero|calvino|contrarreforma/i, 5],
      [/grandes navega[çc][õo]es|expans[ãa]o mar[íi]tima|descobrimento|caravela|tordesilhas/i, 5],
      [/revolu[çc][ãa]o (francesa|inglesa|gloriosa)|\b1789\b|iluminismo|ilustra[çc][ãa]o|montesquieu|voltaire|rousseau|napole[ãa]o/i, 5],
      [/independ[êe]ncia (dos estados unidos|americana)|\b1776\b|treze col[ôo]nias/i, 5],
      [/revolu[çc][ãa]o industrial|maquinofatura|ludita|manufatura/i, 4],
    ] },
    { id: "historia-geral-contemporanea", nome: "Século XIX e XX", regras: [
      [/primeira guerra mundial|segunda guerra mundial|\b1914\b|\b1939\b|\b1945\b|guerra mundial/i, 5],
      [/guerra fria|\bURSS\b|uni[ãa]o sovi[ée]tica|muro de berlim|otan|corrida (armament|espacial)|bipolar/i, 5],
      [/nazismo|fascismo|hitler|mussolini|holocausto|totalitar/i, 5],
      [/revolu[çc][ãa]o russa|\b1917\b|bolchevique|l[êe]nin|stalin|socialismo real/i, 5],
      [/imperialismo|neocolonialismo|partilha da [áa]frica|descoloniza[çc][ãa]o|confer[êe]ncia de berlim/i, 5],
      [/crise de 1929|new deal|grande depress[ãa]o|keynes/i, 5],
      [/revolu[çc][ãa]o cubana|guerra do vietn[ãa]|apartheid|descoloniza|guerra civil espanhola/i, 4],
      [/unifica[çc][ãa]o (alem[ãa]|italiana)|bismarck|risorgimento|garibaldi|cavour|pr[úu]ssia/i, 5],
      [/gandhi|independ[êe]ncia (da [íi]ndia|indiana)|n[ãa]o violência|n[ãa]o viol[êe]ncia|desobedi[êe]ncia civil|mandela|luther king/i, 5],
      [/revolu[çc][ãa]o chinesa|\b1949\b|mao ts[ée]|mao zedong|china (comunista|popular)/i, 5],
      [/globaliza[çc][ãa]o (contempor[âa]nea|a partir)|neoliberalismo|consenso de washington|queda do muro|fim da guerra fria/i, 5],
      [/belle [ée]poque|segunda revolu[çc][ãa]o industrial|taylorismo|fordismo hist|movimento oper[áa]rio|socialismo ut[óo]pico|anarquis/i, 4],
      [/primavera [áa]rabe|s[íi]ria|l[íi]bia|tunis|eg[íi]to (em 2011|contempor)|oriente m[ée]dio contempor|terrorismo|\b11 de setembro\b/i, 5],
      [/destino manifesto|guerra de secess[ãa]o|guerra civil (americana|dos estados unidos)|escravid[ãa]o nos estados unidos|marcha para o oeste|\b1865\b/i, 5],
      [/porfiriato|revolu[çc][ãa]o mexicana|zapata|pancho villa|am[ée]rica latina (no s[ée]culo|contempor)|per[óo]n|pinochet|alle?nde|ditaduras? (militar(es)?) na am[ée]rica/i, 5],
    ] },
  ],

  // ---------------------------------------------------------------- Geografia
  geografia: [
    { id: "geografia-fisica-clima", nome: "Geografia Física e Clima", regras: [
      [/clima (tropical|equatorial|semi[áa]rido|temperado|subtropical)|clim[áa]tic|massa de ar|frente fria|zona de converg/i, 5],
      [/relevo|planalto|plan[íi]cie|depress[ãa]o (relativa|absoluta)|\bserra\b|escudo cristalino|intemperismo|eros[ãa]o/i, 5],
      [/solo[s]?\b|lat[ée]rit|pedolog|fertilidade do solo|salini/i, 4],
      [/vegeta[çc][ãa]o|bioma|cerrado|caatinga|mata atl[âa]ntica|floresta amaz[ôo]nica|pampa|manguezal/i, 5],
      // `\brio\b(?! de janeiro)`: a cidade aparece em texto de qualquer assunto,
      // e sem a exceção toda questão ambientada no Rio virava hidrografia.
      [/hidrograf|bacia (hidrogr|do rio)|aqu[íi]fero|len[çc]ol fre[áa]tico|\brio\b(?! de janeiro)|nascente/i, 5],
      [/placa[s]? tect[ôo]nica|terremoto|vulc[ãa]o|s[íi]smic|tsunami/i, 5],
    ] },
    { id: "geografia-populacao-urbana", nome: "População e Espaço Urbano", regras: [
      [/urbaniza[çc][ãa]o|\bcidade[s]?\b|metr[óo]pole|regi[ãa]o metropolitana|conurba[çc][ãa]o|periferia|favela/i, 5],
      [/popula[çc][ãa]o (brasileira|mundial|absoluta|economicamente)|demograf|pir[âa]mide et[áa]ria|taxa de (natalidade|fecundidade|mortalidade)/i, 5],
      [/migra[çc][ãa]o|migrante|[êe]xodo rural|refugiado|imigra[çc][ãa]o|emigra/i, 5],
      [/envelhecimento (populacional|da popula)|transi[çc][ãa]o demogr[áa]fica|b[ôo]nus demogr/i, 5],
      [/mobilidade urbana|transporte (p[úu]blico|urbano)|habita[çc][ãa]o|especula[çc][ãa]o imobili|segrega[çc][ãa]o (urbana|socioespacial)/i, 5],
      [/\bIDH\b|densidade demogr[áa]fica|[íi]ndice de gini|desigualdade social/i, 4],
    ] },
    { id: "geografia-agraria-economica", nome: "Agricultura, Indústria e Energia", regras: [
      [/agricultura|agr[íi]cola|agroneg[óo]cio|agropecu[áa]ria|lavoura|safra|commodit/i, 5],
      [/estrutura fundi[áa]ria|latif[úu]ndio|minif[úu]ndio|reforma agr[áa]ria|\bMST\b|agricultura familiar/i, 5],
      [/ind[úu]stria|industrializa[çc][ãa]o|parque industrial|desconcentra[çc][ãa]o industrial|\bZFM\b|zona franca/i, 5],
      [/energia (el[ée]trica|renov[áa]vel|hidr[ée]l|e[óo]lica|solar|nuclear)|matriz energ[ée]tica|petr[óo]leo|pr[ée]-sal|etanol/i, 5],
      [/minera[çc][ãa]o|min[ée]rio|extrativ|barragem|carajás|vale do rio doce/i, 5],
      [/com[ée]rcio (exterior|internacional)|exporta[çc][ãa]o|importa[çc][ãa]o|balan[çc]a comercial|\bPIB\b/i, 3],
    ] },
    { id: "geografia-geopolitica", nome: "Geopolítica e Globalização", regras: [
      [/geopol[íi]tic|ordem mundial|multipolar|unipolar|hegemonia|pot[êe]ncia (mundial|regional)/i, 5],
      [/globaliza[çc][ãa]o|fluxos? (globais|de capital)|empresa[s]? (multinacional|transnacional)|\bDIT\b|divis[ãa]o internacional do trabalho/i, 5],
      [/bloco econ[ôo]mico|mercosul|uni[ãa]o europeia|\bBRICS\b|\bNAFTA\b|\bUSMCA\b|\bOMC\b|\bONU\b|\bFMI\b/i, 5],
      [/fronteira|territ[óo]rio (nacional|contestado)|soberania|geopol[íi]tica dos recursos|conflito (territorial|armado)/i, 4],
      [/pa[íi]s(es)? (desenvolvid|subdesenvolvid|emergente|central|perif[ée]ric)|centro-periferia|norte-sul/i, 4],
    ] },
    { id: "geografia-ambiente-sustentabilidade", nome: "Questão Ambiental", regras: [
      [/desmatamento|queimada|degrada[çc][ãa]o ambiental|desertifica[çc][ãa]o|assoreamento/i, 5],
      [/mudan[çc]a[s]? clim[áa]tica|aquecimento global|efeito estufa|\bCOP\d|acordo de paris|carbono/i, 5],
      [/sustentabilidade|desenvolvimento sustent[áa]vel|\bODS\b|economia circular|transi[çc][ãa]o energ[ée]tica/i, 5],
      [/polui[çc][ãa]o|res[íi]duo s[óo]lido|saneamento|tratamento de (esgoto|[áa]gua)|lixo|reciclagem/i, 5],
      [/unidade de conserva[çc][ãa]o|[áa]rea protegida|licenciamento ambiental|c[óo]digo florestal|crise h[íi]drica/i, 5],
    ] },
    { id: "geografia-cartografia", nome: "Cartografia e Representação", regras: [
      [/cartograf|\bmapa\b|proje[çc][ãa]o (cartogr|de mercator|de peters)|escala (num[ée]rica|gr[áa]fica|do mapa)/i, 5],
      [/coordenada[s]? geogr|latitude|longitude|meridiano|paralelo|fuso hor[áa]rio|\bGMT\b/i, 5],
      [/curva de n[íi]vel|altimetr|sensoriamento remoto|\bGPS\b|geoprocessamento|imagem de sat[ée]lite|anamorfose/i, 5],
      [/leitura de (mapa|gr[áa]fico|tabela)|represent[a][çc][ãa]o do espa[çc]o/i, 3],
    ] },
  ],

  // ---------------------------------------------------------------- Gramática
  gramatica: [
    { id: "gramatica-concordancia", nome: "Concordância", regras: [
      [/concord[âa]ncia (verbal|nominal)|concorda (com|em (g[êe]nero|n[úu]mero))/i, 5],
      [/sujeito (composto|simples|posposto|indeterminado|oracional)|verbo concorda/i, 4],
      [/plural|singular|flex[ãa]o de n[úu]mero|part[íi]cula apassivadora|voz passiva/i, 3],
      [/haver .*sentido de existir|verbo (haver|fazer|ser) impessoal|impessoal/i, 5],
      [/anexo|inclu[íi]do|obrigado|mesmo|bastante .*concord/i, 3],
    ] },
    { id: "gramatica-regencia-crase", nome: "Regência e Crase", regras: [
      [/reg[êe]ncia (verbal|nominal)|verbo transitivo|transitivo (direto|indireto)|objeto (direto|indireto)/i, 5],
      [/crase|acento grave|\b[à] (que|qual|s\b)|uso do sinal indicativo/i, 5],
      [/preposi[çc][ãa]o (exigida|adequada|regida)|reg[êe]ncia do verbo|complemento (nominal|verbal)/i, 5],
      [/assistir|visar|aspirar|obedecer|implicar|preferir .*a\b|namorar/i, 4],
      [/pronome (relativo|obl[íi]quo) .*preposi|\ba que\b|\bde que\b|\bem que\b|cujo/i, 3],
    ] },
    { id: "gramatica-pontuacao", nome: "Pontuação", regras: [
      [/pontua[çc][ãa]o|v[íi]rgula|ponto e v[íi]rgula|dois-pontos|dois pontos|travess[ãa]o|reticências|par[êe]nteses/i, 5],
      [/aposto|vocativo|ora[çc][ãa]o intercalada|adjunto adverbial deslocado|termo deslocado/i, 5],
      [/isola(r|ndo|da)|separar (o|os|a) .*por v[íi]rgula|antes da conjun[çc][ãa]o/i, 4],
      [/ora[çc][ãa]o (subordinada adjetiva) (explicativa|restritiva)/i, 5],
    ] },
    { id: "gramatica-morfologia", nome: "Classes de Palavras e Morfologia", regras: [
      [/substantivo|adjetivo|adv[ée]rbio|numeral|interjei[çc][ãa]o|artigo (definido|indefinido)/i, 5],
      [/pronome (pessoal|possessivo|demonstrativo|indefinido|de tratamento|obl[íi]quo)|coloca[çc][ãa]o pronominal|pr[óo]clise|[êe]nclise|mes[óo]clise/i, 5],
      [/verbo (no|em) (presente|pret[ée]rito|futuro|subjuntivo|imperativo|infinitivo|ger[úu]ndio|partic[íi]pio)|tempo verbal|modo verbal|conjuga/i, 5],
      [/deriva[çc][ãa]o|prefixo|sufixo|radical|composi[çc][ãa]o|forma[çc][ãa]o de palavras|neologismo/i, 5],
      [/acentua[çc][ãa]o|acento (agudo|circunflexo|diferencial)|oxítona|paroxítona|proparox|s[íi]laba t[ôo]nica|hífen|ortografia/i, 5],
      [/classe (gramatical|de palavra)|classifica[çc][ãa]o morfol|morfol[óo]gic/i, 4],
    ] },
    { id: "gramatica-sintaxe-periodo", nome: "Sintaxe e Estrutura do Período", regras: [
      [/ora[çc][ãa]o (subordinada|coordenada|principal|reduzida)|per[íi]odo (simples|composto)|subordina[çc][ãa]o|coordena[çc][ãa]o/i, 5],
      [/sujeito e predicado|predicado (verbal|nominal|verbo-nominal)|predicativo|agente da passiva/i, 5],
      [/conjun[çc][ãa]o (subordinativa|coordenativa|integrante)|ora[çc][ãa]o (substantiva|adjetiva|adverbial)/i, 5],
      [/an[áa]lise sint[áa]tica|fun[çc][ãa]o sint[áa]tica|termo[s]? (essencial|integrante|acess[óo]rio)|adjunto (adnominal|adverbial)/i, 5],
      [/voz (ativa|passiva|reflexiva)|transposi[çc][ãa]o de voz/i, 4],
    ] },
    { id: "gramatica-coesao-semantica", nome: "Coesão, Coerência e Semântica", regras: [
      [/coes[ãa]o|coer[êe]ncia|conectivo|elemento coesivo|retomada|refer[êe]ncia (anaf[óo]rica|cataf[óo]rica)|an[áa]fora/i, 5],
      [/sin[ôo]nimo|ant[ôo]nimo|hom[ôo]nimo|par[ôo]nimo|pol[íi]ssemia|sem[âa]ntic|sentido (denotativo|conotativo|figurado)/i, 5],
      [/ambiguidade|amb[íi]guo|duplo sentido|impreci[sç][ãa]o|obscuridade/i, 5],
      [/norma culta|norma-padr[ãa]o|variedade lingu[íi]stica|registro (formal|informal)|variação linguística|varia[çc][ãa]o lingu/i, 4],
      [/reescrit|reescrev|substitui[çc][ãa]o .*sem (altera|preju[íi]zo)|mant[ée]m o sentido/i, 3],
    ] },
  ],

  // ------------------------------------------------------- Interpretação de Texto
  interpretacao: [
    { id: "interpretacao-ideia-central", nome: "Ideia Central e Síntese", regras: [
      [/ideia (central|principal|global)|tese (central|do texto|defendida)|assunto (central|principal)|tema (central|do texto)/i, 5],
      [/melhor (resume|s[íi]ntese|t[íi]tulo)|s[íi]ntese (do texto|adequada)|t[íi]tulo (adequado|mais apropriado)/i, 5],
      [/o texto (trata|aborda|discute) (principalmente|sobretudo)|prop[óo]sito (do texto|comunicativo)|finalidade do texto/i, 4],
    ] },
    { id: "interpretacao-inferencia", nome: "Inferência e Pressuposto", regras: [
      [/infer(ir|e-se|[êe]ncia)|depreende-se|deduz-se|conclui-se|subentend|impl[íi]cit|press?upost/i, 5],
      [/permite concluir|autoriza a (conclus|afirma)|sugere que|d[áa] a entender/i, 4],
      [/n[ãa]o (est[áa] dito|[ée] dito) explicitamente|entrelinhas/i, 5],
    ] },
    { id: "interpretacao-argumentacao", nome: "Argumentação e Ponto de Vista", regras: [
      [/argumento|argumenta[çc][ãa]o|argumentativ|refuta|contra-?argumento|contesta[çc][ãa]o|r[ée]plica/i, 5],
      [/ponto de vista|opini[ãa]o do autor|posi[çc][ãa]o (do autor|defendida)|posicionamento|cr[íi]tica (do autor|feita)/i, 5],
      [/premissa|conclus[ãa]o do racioc|fal[áa]cia|generaliza[çc][ãa]o indevida|apelo ([àa] autoridade|emocional)/i, 5],
      [/estrat[ée]gia (argumentativa|de persuas)|persuas|convencer o leitor|exemplifica[çc][ãa]o|dado estat[íi]stico como/i, 4],
      [/concord[âa]ncia|discord|contrap[õo]e|contrasta com|em oposi[çc][ãa]o a/i, 2],
      [/(enunciado|afirma[çc][ãa]o|trecho) de (fato|opini[ãa]o)|fato[,]? e n[ãa]o (de )?opini[ãa]o|ju[íi]zo de valor|constata[çc][ãa]o objetiva/i, 5],
    ] },
    { id: "interpretacao-recursos-linguagem", nome: "Recursos Expressivos e Linguagem", regras: [
      [/met[áa]fora|met[ôo]nimia|ironia|hip[ée]rbole|eufemismo|personifica[çc][ãa]o|prosopopeia|antítese|ant[íi]tese|parad(oxo|oxal)/i, 5],
      [/figura de linguagem|recurso (expressivo|estil[íi]stico|ret[óo]rico)|linguagem figurada|conota[çc][ãa]o/i, 5],
      [/tom (ir[ôo]nico|cr[íi]tico|humor[íi]stico|solene)|humor|s[áa]tira|sarcasmo|c[ôo]mic/i, 5],
      [/repeti[çc][ãa]o (de|do termo)|alitera[çc][ãa]o|paralelismo|gradac[ãa]o|enumera[çc][ãa]o/i, 4],
      [/registro (formal|coloquial|informal)|linguagem (coloquial|t[ée]cnica|formal)|g[íi]ria|jarg[ãa]o/i, 4],
      [/a (palavra|expressão|expressao|met[áa]fora|compara[çc][ãa]o|imagem) ["'“(]?[^"'”)]{2,40}["'”)]? (refere|significa|tem a fun|sugere|produz)/i, 5],
      [/no contexto do texto, a palavra|o sentido (da palavra|do termo|da expressão)|conota[çc][ãa]o (do termo)?/i, 5],
    ] },
    { id: "interpretacao-estrutura-coesao", nome: "Estrutura Textual e Progressão", regras: [
      [/par[áa]grafo (inicial|final|anterior|seguinte|\d)|estrutura do texto|organiza[çc][ãa]o (do texto|textual)/i, 5],
      [/conectivo|conjun[çc][ãa]o .*(sentido|rela[çc][ãa]o)|rela[çc][ãa]o (de causa|de oposi[çc]|de conclus|l[óo]gica) entre/i, 5],
      [/progress[ãa]o (textual|tem[áa]tica)|encadeamento|articula[çc][ãa]o entre (os|as) (par[áa]grafo|ideia)/i, 5],
      [/retoma (a|o)|refere-se (a|ao) (termo|trecho|par[áa]grafo)|elemento (coesivo|de coes[ãa]o)|pronome retoma/i, 5],
      [/introdu[çc][ãa]o|desenvolvimento|conclus[ãa]o do texto|fecha o texto|abre o texto/i, 3],
      [/rela[çc][ãa]o de causa e efeito|causa e consequ[êe]ncia|nexo causal|contraste entre|oposi[çc][ãa]o entre|compara[çc][ãa]o entre/i, 5],
      [/distinguir (claramente )?entre|diferencia|o que (diferencia|distingue)|em que difere/i, 4],
    ] },
    { id: "interpretacao-genero-discurso", nome: "Gênero Textual e Discurso", regras: [
      [/g[êe]nero (textual|discursivo)|cr[ôo]nica|not[íi]cia|reportagem|artigo de opini[ãa]o|editorial|charge|tirinha|carta|resenha|verbete|manchete/i, 5],
      [/narrador (em primeira|em terceira|onisciente|observador)|foco narrativo|discurso (direto|indireto|indireto livre)/i, 5],
      [/interlocutor|locutor|p[úu]blico-alvo|destinat[áa]rio|esfera de circula[çc][ãa]o|suporte (do texto|de circula)/i, 5],
      [/de acordo com o narrador|segundo o narrador|o narrador (descreve|apresenta|caracteriza|revela)|o eu l[íi]rico/i, 5],
      [/intertextualidade|par[óo]dia|par[áa]frase|di[áa]logo entre (os )?textos|cita[çc][ãa]o de outro texto/i, 5],
      [/tipo textual|narrativ[oa]|descritiv|dissertativ|injuntiv|expositiv/i, 4],
    ] },
  ],

  // ---------------------------------------------------------------- Literatura
  literatura: [
    { id: "literatura-colonial-romantismo", nome: "Do Barroco ao Romantismo", regras: [
      [/barroco|arcadismo|[áa]rcade|quinhentis|gregorio de matos|greg[óo]rio de matos|clau?dio manuel|tomas antonio gonzaga|tom[áa]s ant[ôo]nio gonzaga|marilia de dirceu|mar[íi]lia de dirceu/i, 5],
      [/romantismo|rom[âa]ntic|jose de alencar|jos[ée] de alencar|iracema|\bsenhora\b|o guarani|indianis|gon[çc]alves dias|castro alves|alvares de azevedo|[áa]lvares de azevedo/i, 5],
      [/ultrarromantismo|condoreir|mal do s[ée]culo|byron|idealiza[çc][ãa]o (da mulher|amorosa)|nacionalismo rom[âa]ntic/i, 5],
      [/memorias de um sargento|mem[óo]rias de um sargento|manuel antonio de almeida|joaquim manuel de macedo|a moreninha/i, 5],
    ] },
    { id: "literatura-realismo-naturalismo", nome: "Realismo, Naturalismo, Parnasianismo e Simbolismo", regras: [
      [/realismo|realista|machado de assis|dom casmurro|bras cubas|br[áa]s cubas|quincas borba|capitu|bentinho|mem[óo]rias p[óo]stumas/i, 5],
      [/naturalismo|naturalista|aluisio azevedo|alu[íi]sio azevedo|o cortico|o corti[çc]o|determinismo|zoomorfiza/i, 5],
      [/parnasian|olavo bilac|raimundo correia|alberto de oliveira|arte pela arte|soneto parnas/i, 5],
      [/simbolis|cruz e sousa|alphonsus de guimaraens|sinestesia|musicalidade do verso/i, 5],
      [/pr[ée]-modernismo|euclides da cunha|os sertoes|os sert[õo]es|lima barreto|policarpo quaresma|monteiro lobato|augusto dos anjos/i, 5],
    ] },
    { id: "literatura-modernismo", nome: "Modernismo", regras: [
      [/modernismo|modernista|semana de (arte moderna|22)|\b1922\b|vanguarda|antropofag|manifesto (pau-brasil|antrop)/i, 5],
      [/mario de andrade|m[áa]rio de andrade|macuna[íi]ma|oswald de andrade|paulic[ée]ia|serafim ponte grande/i, 5],
      [/gera[çc][ãa]o de 30|romance de 30|graciliano ramos|vidas secas|s[ãa]o bernardo|jose lins do rego|jos[ée] lins do rego|jorge amado|rachel de queiroz|raquel de queiroz/i, 5],
      [/drummond|carlos drummond|manuel bandeira|cec[íi]lia meireles|vinicius de moraes|vin[íi]cius de moraes|murilo mendes|jorge de lima/i, 5],
      [/gera[çc][ãa]o de 45|joao cabral|jo[ãa]o cabral|morte e vida severina|concretis|poesia concreta|haroldo de campos/i, 5],
      [/verso livre|liberdade formal|ruptura (formal|com o passado)|linguagem coloquial na poesia/i, 3],
    ] },
    { id: "literatura-contemporanea", nome: "Literatura Contemporânea", regras: [
      [/contempor[âa]ne|clarice lispector|guimaraes rosa|guimar[ãa]es rosa|grande sertao|grande sert[ãa]o|riobaldo|a hora da estrela|macab[ée]a/i, 5],
      [/literatura (marginal|perif[ée]rica|negra|ind[íi]gena)|carolina maria de jesus|quarto de despejo|conceicao evaristo|concei[çc][ãa]o evaristo|escrevivencia|escrevivência|paulo lins|ferrez|ferréz/i, 5],
      [/hilda hilst|caio fernando abreu|rubem fonseca|milton hatoum|chico buarque .*romance|ita?mar vieira|torto arado/i, 5],
      [/p[óo]s-moderno|metalinguagem contempor|autofic[çc][ãa]o|fragmenta[çc][ãa]o narrativa/i, 4],
      [/tropic[áa]lia|m[úu]sica popular brasileira como|letra de can[çc][ãa]o|caetano|chico buarque/i, 4],
    ] },
    { id: "literatura-teoria-analise", nome: "Teoria Literária e Análise", regras: [
      [/verso|estrofe|rima|m[ée]trica|soneto|redondilha|decass[íi]labo|escans[ãa]o|enjambement/i, 5],
      [/eu l[íi]rico|sujeito l[íi]rico|voz po[ée]tica|poema (analisa|apresenta)/i, 5],
      [/narrador|foco narrativo|personagem (redonda|plana|principal)|enredo|cl[íi]max|desfecho|tempo (psicol[óo]gico|cronol[óo]gico)|espa[çc]o narrativo/i, 5],
      [/g[êe]nero liter[áa]rio|[ée]pico|l[íi]rico|dram[áa]tico|prosa e (poesia|verso)|conto|novela|romance como g[êe]nero/i, 4],
      [/estilo (de [ée]poca|individual)|escola liter[áa]ria|periodiza[çc][ãa]o liter/i, 4],
    ] },
  ],

  // ---------------------------------------------------------------- Inglês
  //
  // As cinco daqui são por HABILIDADE, não por tema: o banco é 100% reading
  // comprehension, e é a habilidade que muda de questão para questão. O que a
  // banca pede está no COMANDO, que é padronizado -- por isso as regras casam o
  // comando, não o assunto do texto.
  //
  // O comando vem em duas línguas: as 210 de Direito perguntam em inglês ("The
  // text supports all of the following EXCEPT") e as 210 de Medicina perguntam
  // em português sobre um texto em inglês ("o pronome 'it' retoma:"). Toda
  // regra aqui precisa das duas formas -- só as inglesas deixavam metade do
  // banco no resíduo.
  ingles: [
    { id: "ingles-main-idea", nome: "Main Idea and Purpose", regras: [
      [/main (idea|point|topic|purpose)|central idea|best title|primary purpose/i, 5],
      [/text is mainly about|passage.{0,20}mainly (about|concerned)|overall (message|argument)/i, 5],
      [/author'?s? (main )?(purpose|intention|aim|goal)/i, 5],
      [/best summari[sz]es|summary of the (text|passage)/i, 4],
      [/ideia (central|principal) do texto|t[íi]tulo (mais adequado|adequado)|objetivo (principal )?do (texto|autor)|prop[óo]sito do texto|tema central/i, 5],
      [/o texto (trata|aborda|defende) principalmente|melhor resume/i, 4],
    ] },
    { id: "ingles-inference", nome: "Inference", regras: [
      [/most likely|can be inferred|it is implied|implies that|suggests that/i, 5],
      [/the author (would|might) (agree|probably)|infer(red|ence)? from/i, 5],
      [/we can conclude|leads to the conclusion/i, 4],
      [/depreende-se|infere-se|subentende|est[áa] impl[íi]cit|permite concluir|sugere que o autor/i, 5],
      [/ao (afirmar|dizer|observar) que .{0,60}o autor|o autor (adota|assume) (postura|posi[çc][ãa]o|tom)|postura (cr[íi]tica|ir[ôo]nica|c[ée]tica|otimista)/i, 5],
      [/serve para|tem a fun[çc][ãa]o de|[ée] apresentad[oa] como/i, 2],
    ] },
    { id: "ingles-detail", nome: "Specific Detail", regras: [
      [/according to the (text|passage|author|article)|the (text|passage) states/i, 5],
      [/which of the following .{0,30}(mentioned|stated|listed|true)/i, 5],
      [/supports? (the (idea|statement|claim)|all of the following)|contradicts? the/i, 5],
      [/in (paragraph|line) \d|the (first|second|third|last) paragraph (says|describes)/i, 4],
      [/de acordo com o texto|segundo o (texto|autor)|conforme o texto|o texto (afirma|informa|menciona|cita)/i, 5],
      [/\bEXCEPT\b|\bexceto\b/i, 4],
      [/(a|o) (entrevistad[ao]|pesquisador[a]?|autor[a]?) (aponta|observa|afirma|relata|menciona)|sobre .{0,40}, (a|o) \w+ (observa|afirma)/i, 5],
      [/a (primeira|segunda|principal) (medida|causa|raz[ãa]o|consequ[êe]ncia) (que|apontada|citada)/i, 4],
    ] },
    { id: "ingles-vocabulary", nome: "Vocabulary in Context", regras: [
      [/the word ["'“]?\w+["'”]? (means|refers|can be replaced)|closest in meaning|means the same as/i, 5],
      [/synonym|antonym|in context.{0,15}means|the expression ["'“]?\w+/i, 5],
      [/refers? to (which|what)|the pronoun ["'“]?\w+["'”]? refers/i, 5],
      [/best replaces|could be substituted/i, 4],
      [/a (palavra|expressão|expressao) ["'“][^"'”]+["'”]|o termo ["'“][^"'”]+["'”]/i, 5],
      [/(pode ser (substitu[íi]d|traduzid))|significa|equivale a|sentido (da expressão|do termo)|no trecho ["'“]/i, 4],
      [/o pronome ["'“]?\w+["'”]? (retoma|refere)|retoma:|refere-se a/i, 5],
    ] },
    { id: "ingles-grammar-structure", nome: "Grammar and Text Structure", regras: [
      [/verb (tense|form)|passive voice|conditional|modal verb|reported speech|phrasal verb/i, 5],
      [/connector|linking word|however|therefore|nevertheless.{0,20}(indicates|expresses)/i, 5],
      [/grammatical(ly)? (correct|structure)|correct form of|complete the (sentence|gap)/i, 5],
      [/relative (pronoun|clause)|preposition|article (a|an|the)\b/i, 4],
      [/estabelece (uma )?rela[çc][ãa]o de|introduz (uma )?(ideia|rela[çc][ãa]o)|conectivo|articula (as|os)/i, 5],
      [/tempo verbal|voz passiva|condicional|verbo modal/i, 5],
      [/o texto se organiza|organiza[çc][ãa]o do texto|estrutura do texto|na ordem, do seguinte modo|a abertura do texto|o (fecho|final) do texto/i, 5],
      [/ponto e v[íi]rgula|dois-pontos|travess[ãa]o|par[êe]nteses|a pontua[çc][ãa]o/i, 5],
    ] },
  ],

  // ------------------------------------------------------- Filosofia e Sociologia
  filosofia: [
    { id: "filosofia-etica-moral", nome: "Ética e Moral", regras: [
      [/\b[ée]tica|moral(idade)?|virtude|dever (moral|categ)|imperativo categ[óo]rico|kant/i, 5],
      [/utilitaris|bentham|stuart mill|maior felicidade|conseq[uü]encialis/i, 5],
      [/arist[óo]teles .*(virtude|felicidade)|eudaimonia|justi[çc]a (como virtude|distributiva)|rawls/i, 5],
      [/bem e mal|certo e errado|autonomia (moral|da vontade)|responsabilidade moral|dilema (moral|[ée]tico)/i, 4],
      [/bio[ée]tica|\b[ée]tica (aplicada|profissional|animal)/i, 4],
    ] },
    { id: "filosofia-politica", nome: "Filosofia Política e Estado", regras: [
      [/contrato social|contratualis|hobbes|locke|rousseau|estado de natureza|leviat[ãa]/i, 5],
      [/democracia|soberania (popular)?|legitimidade do poder|separa[çc][ãa]o dos poderes|montesquieu|republicanis/i, 5],
      [/maquiavel|o pr[íi]ncipe|raz[ãa]o de estado|poder pol[íi]tico|autoritaris|totalitaris|arendt|banalidade do mal/i, 5],
      [/liberalismo (pol[íi]tico|cl[áa]ssico)|liberdade (negativa|positiva|individual)|igualdade pol[íi]tica|cidadania (pol[íi]tica)?/i, 4],
      [/foucault|biopol[íi]tica|poder disciplinar|panóptico|panoptico/i, 5],
    ] },
    { id: "filosofia-conhecimento-logica", nome: "Conhecimento, Lógica e Ciência", regras: [
      [/epistemolog|teoria do conhecimento|conhecimento (verdadeiro|cient[íi]fico)|verdade|ceticismo|d[úu]vida met[óo]dica|descartes|cogito/i, 5],
      [/racionalis|empiris|hume|kant .*(raz[ãa]o|conhecimento)|a priori|a posteriori|criticismo/i, 5],
      [/plat[ãa]o|mito da caverna|mundo das ideias|s[óo]crates|maiêutica|maieutica|sofista/i, 5],
      [/\bl[óo]gica|silogismo|premissa|falacia|fal[áa]cia|argumento (v[áa]lido|dedutivo|indutivo)|dedu[çc][ãa]o|indu[çc][ãa]o/i, 5],
      [/filosofia da ci[êe]ncia|popper|kuhn|paradigma cient[íi]fico|falseabilidade|m[ée]todo cient[íi]fico/i, 5],
      [/metaf[íi]sica|ontolog|exist[êe]ncia|ser\b.*(enquanto|em si)|nietzsche|existencialis|sartre/i, 4],
    ] },
    { id: "sociologia-trabalho-classes", nome: "Trabalho, Classes e Capitalismo", regras: [
      [/marx|marxis|mais-valia|luta de classes|classe (social|trabalhadora|dominante)|burguesia|proletariado|aliena[çc][ãa]o/i, 5],
      [/capitalismo|modo de produ[çc][ãa]o|acumula[çc][ãa]o|explora[çc][ãa]o do trabalho|for[çc]a de trabalho|mercadoria/i, 5],
      [/durkheim|divis[ãa]o (social )?do trabalho|solidariedade (mec[âa]nica|org[âa]nica)|anomia|fato social|coer[çc][ãa]o social/i, 5],
      [/weber|\ba[çc][ãa]o social|tipo ideal|racionaliza[çc][ãa]o|burocracia|\b[ée]tica protestante|desencantamento/i, 5],
      [/desigualdade (social|de renda)|mobilidade social|estratifica[çc][ãa]o|pobreza|precariza[çc][ãa]o|uberiza[çc][ãa]o|trabalho (informal|por plataforma)/i, 5],
      [/taylorismo|fordismo|toyotismo|reestrutura[çc][ãa]o produtiva|desemprego estrutural/i, 5],
    ] },
    { id: "sociologia-cultura-identidade", nome: "Cultura, Identidade e Mídia", regras: [
      [/\bcultura|cultural|multicultural|etnocentris|relativismo cultural|diversidade cultural|acultura/i, 5],
      [/identidade (cultural|social|de g[êe]nero)|socializa[çc][ãa]o|habitus|bourdieu|capital (cultural|simb[óo]lico)/i, 5],
      [/ind[úu]stria cultural|adorno|escola de frankfurt|cultura de massa|consumo cultural|mercantiliza[çc][ãa]o da cultura/i, 5],
      [/m[íi]dia|redes sociais|internet|algoritmo|desinforma[çc][ãa]o|c[âa]mara de eco|bolha (informacional|digital)|espet[áa]culo/i, 5],
      [/g[êe]nero (social|e sexualidade)|feminis|patriarc|racismo (estrutural)?|rela[çc][õo]es raciais|ind[íi]gena|quilombola/i, 5],
      // Sociologia contemporânea nomeada por conceito, sem citar o autor: é
      // como boa parte deste banco escreve ("essa metáfora da liquidez").
      [/liquidez|l[íi]quid[ao] (modernidade|moderna)|bauman|sociedade do (cansa[çc]o|desempenho)|hipermodern/i, 5],
      [/reflexividade|constru[çc][ãa]o (da identidade|de si)|performance de si|autoapresenta[çc][ãa]o|vitrine (digital|social)/i, 5],
      [/consumo (conspícuo|de status)|distin[çc][ãa]o social|gosto (de classe|leg[íi]timo)|estilo de vida/i, 4],
    ] },
    { id: "sociologia-instituicoes-movimentos", nome: "Instituições e Movimentos Sociais", regras: [
      [/movimento[s]? social|movimento (negro|feminista|estudantil|sindical|ambientalista)|militância|milit[âa]ncia|ativis|protesto|manifesta[çc][ãa]o/i, 5],
      [/institui[çc][ãa]o (social|pol[íi]tica)|fam[íi]lia (como institui|nuclear)|escola (como institui)|religi[ãa]o|secular|laic/i, 5],
      [/cidadania|direitos (civis|pol[íi]ticos|sociais)|marshall|participa[çc][ãa]o (pol[íi]tica|social)|controle social/i, 5],
      [/pol[íi]tica p[úu]blica|estado de bem-estar|welfare|assist[êe]ncia social|seguridade/i, 5],
      [/sindicato|partido pol[íi]tico|\bong\b|terceiro setor|sociedade civil/i, 4],
      [/a[çc][ãa]o coletiva|mobiliza[çc][ãa]o (coletiva|social)|free.?rider|problema do carona|dilema (do prisioneiro|da a[çc][ãa]o coletiva)|bem (p[úu]blico|comum)/i, 5],
      [/capital social|confian[çc]a (social|interpessoal)|coopera[çc][ãa]o|reciprocidade/i, 4],
    ] },
  ],

  // ---------------------------------------------------------------- Artes
  artes: [
    { id: "artes-classica-moderna", nome: "Arte Clássica e Moderna", regras: [
      [/renascimento|renascentista|leonardo da vinci|michelangelo|rafael|perspectiva (linear|renascentista)|barroco|aleijadinho|rococ[óo]/i, 5],
      [/neocl[áa]ssic|romantismo (na pintura|art[íi]stico)|realismo (na pintura|pict[óo]rico)|impressionis|monet|van gogh|c[ée]zanne|p[óo]s-impressionis/i, 5],
      [/vanguarda[s]? (europeia|hist[óo]rica)|cubis|picasso|expressionis|surrealis|dad[áa]|futuris|abstracionis|kandinsky|mondrian/i, 5],
      [/modernismo (brasileiro|na pintura)|tarsila|anita malfatti|di cavalcanti|portinari|abaporu|antropofagia/i, 5],
      [/escultura|pintura (a [óo]leo|renascentista)|afresco|gravura|t[ée]cnica (pict[óo]rica|art[íi]stica)|natureza-morta|retrato/i, 3],
      // Arquitetura não tinha regra nenhuma e é assunto recorrente nas duas
      // trilhas -- das ordens gregas a Niemeyer e Brasília.
      [/arquitetur|edif[íi]cio|constru[çc][ãa]o (arquitet|monument)|coluna[s]? (d[óo]rica|j[ôo]nica|cor[íi]ntia)|ordem (d[óo]rica|j[ôo]nica|cor[íi]ntia)|p[óo]rtico|abóbada|ab[óo]bada|arco (romano|pleno)|c[úu]pula/i, 5],
      [/niemeyer|le corbusier|bauhaus|arquitetura (moderna|modernista|brasileira)|bras[íi]lia|lucio costa|l[úu]cio costa|planta livre|pilotis/i, 5],
      [/g[óo]tico|romanic|rom[âa]nic|catedral|vitral|contraforte|arcobotante/i, 5],
      [/urbanismo|planejamento urbano|cidade planejada|traçado urbano|tra[çc]ado urbano/i, 4],
      [/cor (quente|fria|complementar)|espectro (de cores|crom[áa]tico)|paleta|luz e sombra|claro-?escuro|composi[çc][ãa]o visual|ponto de fuga|propor[çc][ãa]o [áa]urea/i, 4],
    ] },
    { id: "artes-contemporanea", nome: "Arte Contemporânea", regras: [
      [/arte contempor[âa]nea|contemporaneidade art|instala[çc][ãa]o|performance|arte conceitual|happening|land art|body art/i, 5],
      [/bienal|curadoria|curador|museu de arte (moderna|contempor)|\bMASP\b|\bMAM\b|inhotim|exposi[çc][ãa]o (coletiva|individual)/i, 5],
      [/lygia clark|helio oiticica|h[ée]lio oiticica|neoconcret|concretis|parangol[ée]|tropic[áa]lia|cildo meireles|adriana varej[ãa]o|ernesto neto/i, 5],
      [/site-specific|interativ|participa[çc][ãa]o do p[úu]blico|arte (urbana|de rua)|grafite|street art|intervenc[ãa]o urbana|interven[çc][ãa]o urbana/i, 5],
      [/mercado de arte|circuito art[íi]stico|institui[çc][ãa]o art[íi]stica|legitima[çc][ãa]o|valor da obra/i, 4],
    ] },
    { id: "artes-musica-cena", nome: "Música, Teatro e Dança", regras: [
      [/m[úu]sica|musical|can[çc][ãa]o|melodia|harmonia|ritmo|compositor|\b[óo]pera[s]?\b|sinf[ôo]nic|erudita|instrumento musical/i, 5],
      [/samba|bossa nova|choro|\bMPB\b|tropic[áa]lia|funk|\brap\b|hip-?hop|sertanejo|forr[óo]|maracatu|frevo/i, 5],
      [/teatro|teatral|dramaturgia|encena[çc][ãa]o|palco|\bator|\batriz|espet[áa]culo|brecht|nelson rodrigues|arena|oficina/i, 5],
      [/\bdan[çc]a|coreografia|bal[ée]|dan[çc]a contempor|corpo (em cena|do bailarino)/i, 5],
      [/circo|performance c[êe]nica|com[ée]dia|trag[ée]dia|com[ée]dia dell/i, 4],
    ] },
    { id: "artes-audiovisual-midia", nome: "Cinema, Fotografia e Audiovisual", regras: [
      [/cinema|filme|cinematograf|montagem|plano (sequ[êe]ncia|geral|americano)|enquadramento|c[âa]mera|diretor de fotografia|roteiro/i, 5],
      [/fotografia|fotogr[áa]fic|imagem fotogr|c[âa]mara escura|instant[âa]neo|fot[óo]grafo|sebasti[ãa]o salgado/i, 5],
      [/cinema novo|glauber rocha|documentário|document[áa]rio|fic[çc][ãa]o (audiovisual|cinemat)|s[ée]rie (televisiva)?|televis[ãa]o|streaming/i, 5],
      [/videoarte|v[íi]deo|audiovisual|anima[çc][ãa]o|videoclipe|publicidade (visual|audiovisual)/i, 5],
      [/reprodutibilidade t[ée]cnica|benjamin .*(aura|reprodu)|aura da obra/i, 5],
    ] },
    { id: "artes-patrimonio-cultura-popular", nome: "Patrimônio e Cultura Popular", regras: [
      [/patrim[ôo]nio (cultural|hist[óo]rico|imaterial|material)|tombamento|\bIPHAN\b|\bUNESCO\b|preserva[çc][ãa]o (do patrim|cultural)|restaura[çc][ãa]o/i, 5],
      [/cultura popular|folclore|festa (popular|junina)|congada|bumba|cordel|artesanato|mestre de|saber tradicional/i, 5],
      [/arte (ind[íi]gena|afro-?brasileira|africana|popular)|grafismo ind[íi]gena|m[áa]scara ritual|capoeira|candombl[ée]|umbanda/i, 5],
      [/identidade (cultural|nacional)|mem[óo]ria (coletiva|social)|apropria[çc][ãa]o cultural|descoloniza[çc][ãa]o (do olhar|cultural)/i, 4],
      [/museu|acervo|arquivo|colec[çc][ãa]o|cole[çc][ãa]o (de arte|museol)/i, 3],
    ] },
  ],

  // ---------------------------------------------------------------- Atualidades
  //
  // As quatro primeiras são as quatro frentes de Atualidades de Direito, que já
  // nasceram divididas assim -- `frenteOrigem` roteia essas 455 direto, sem
  // regex. As regras abaixo existem para as 150 de Medicina, que vinham de uma
  // frente única, e para o que entrar novo daqui pra frente.
  atualidades: [
    { id: "atualidades-politica-economia", nome: "Política e Economia do Brasil", regras: [
      [/congresso|senado|c[âa]mara dos deputados|\bSTF\b|supremo|elei[çc][ãa]o|elei[çc][õo]es|reforma (tribut[áa]ria|administrativa|da previd)/i, 5],
      [/infla[çc][ãa]o|\bSelic\b|juros|\bBanco Central\b|c[âa]mbio|\bPIB\b|desemprego|or[çc]amento (da uni[ãa]o|p[úu]blico)|arcabou[çc]o fiscal|d[íi]vida p[úu]blica/i, 5],
      [/pol[íi]tica p[úu]blica (brasileira|no brasil)|programa (social|do governo)|bolsa fam[íi]lia|sal[áa]rio m[íi]nimo|\bSUS\b .*(financ|gest)/i, 4],
      [/governo (federal|brasileiro)|presid[êe]ncia|minist[ée]rio|federa[çc][ãa]o|munic[íi]pio.*(recurso|verba)/i, 3],
    ] },
    { id: "atualidades-geopolitica", nome: "Geopolítica e Relações Internacionais", regras: [
      // `ir[ãa]` sem fronteira casava "brasil-eira", "prim-eira", "front-eira".
      [/guerra (na ucr[âa]nia|em gaza|civil)|conflito (armado|no oriente|internacional)|ucr[âa]nia|r[úu]ssia|israel|palestina|gaza|\bir[ãa]\b|\bs[íi]ria\b/i, 5],
      [/\bONU\b|\bOTAN\b|\bNATO\b|conselho de seguran[çc]a|\bBRICS\b|\bG7\b|\bG20\b|\bOMC\b|\bFMI\b|\bOMS\b|multilateral/i, 5],
      [/china|estados unidos|uni[ãa]o europeia|[íi]ndia|guerra comercial|tarifa[çc][ãa]o|sanc[çc][ãa]o|san[çc][õo]es|hegemonia|multipolar/i, 5],
      [/migra[çc][ãa]o (internacional|forçada)|refugiado|crise migrat[óo]ria|fronteira internacional/i, 5],
      [/diplomacia|pol[íi]tica externa|acordo internacional|tratado/i, 3],
    ] },
    { id: "atualidades-meioambiente", nome: "Meio Ambiente e Clima", regras: [
      [/clim[áa]tic|aquecimento global|\bCOP\d+|acordo de paris|emiss[õo]es|g[áa]s de efeito estufa|carbono|descarboniza/i, 5],
      [/desmatamento|amaz[ôo]nia|queimada|bioma|biodiversidade|extin[çc][ãa]o|preserva[çc][ãa]o ambiental|unidade de conserva/i, 5],
      [/transi[çc][ãa]o energ[ée]tica|energia (renov[áa]vel|limpa|solar|e[óo]lica)|combust[íi]vel f[óo]ssil|petr[óo]leo .*(ambient|clim)|hidrog[êe]nio verde/i, 5],
      [/crise h[íi]drica|seca|enchente|desastre (natural|ambiental)|evento extremo|tragédia|trag[ée]dia (ambiental|clim)/i, 5],
      [/sustentabilidade|\bODS\b|agenda 2030|\bESG\b|economia circular|res[íi]duo|reciclagem|saneamento/i, 5],
    ] },
    { id: "atualidades-tecnologia", nome: "Tecnologia e Sociedade", regras: [
      [/intelig[êe]ncia artificial|\bIA\b|algoritmo|machine learning|chatgpt|automa[çc][ãa]o|rob[óo]tica/i, 5],
      [/rede[s]? social|plataforma (digital|de trabalho)|big tech|marco civil|regula[çc][ãa]o (das plataformas|digital)|modera[çc][ãa]o de conte[úu]do/i, 5],
      [/dados pessoais|\bLGPD\b|privacidade|vigil[âa]ncia|reconhecimento facial|ciberseguran[çc]a|\bhacker\b|golpe (digital|online)/i, 5],
      [/desinforma[çc][ãa]o|fake news|deepfake|bolha (digital|informacional)|c[âa]mara de eco|checagem/i, 5],
      [/trabalho (por aplicativo|em plataforma)|uberiza[çc][ãa]o|entregador|motorista de aplicativo|gig economy/i, 5],
      [/internet|digital|conectividade|exclus[ãa]o digital|5g\b|blockchain|criptomoeda/i, 3],
    ] },
    { id: "atualidades-saude", nome: "Saúde Pública", regras: [
      [/\bSUS\b|sa[úu]de p[úu]blica|vacina[çc][ãa]o|cobertura vacinal|epidemi|pandemi|surto|endemia|arbovirose|dengue|covid/i, 5],
      [/sa[úu]de mental|dep?ress[ãa]o|ansiedade|suic[íi]dio|transtorno|burnout/i, 5],
      [/obesidade|ultraprocessado|alimenta[çc][ãa]o (saud[áa]vel|adequada)|inseguran[çc]a alimentar|fome|desnutri[çc][ãa]o|r[óo]tulo/i, 5],
      [/envelhecimento populacional|expectativa de vida|atenc[ãa]o (b[áa]sica|prim[áa]ria)|aten[çc][ãa]o (b[áa]sica|prim[áa]ria)|acesso a (medicamento|tratamento)|judicializa[çc][ãa]o da sa[úu]de/i, 5],
      [/antibi[óo]tico|resist[êe]ncia antimicrob|zoonose|sa[úu]de [úu]nica|one health|determinantes sociais/i, 5],
    ] },
    { id: "atualidades-sociedade-educacao", nome: "Sociedade, Trabalho e Educação", regras: [
      [/educa[çc][ãa]o (b[áa]sica|p[úu]blica|superior)|escola|\bENEM\b|analfabetis|evas[ãa]o escolar|aprendizagem|professor/i, 5],
      [/desigualdade (social|racial|de g[êe]nero|de renda)|racismo|femin[ií]c[íi]dio|viol[êe]ncia (contra a mulher|dom[ée]stica)|\bLGBT/i, 5],
      [/mercado de trabalho|informalidade|reforma trabalhista|sindicato|jornada de trabalho|renda b[áa]sica/i, 5],
      [/moradia|d[ée]ficit habitacional|mobilidade urbana|seguran[çc]a p[úu]blica|encarceramento|sistema prisional/i, 5],
      [/juventude|inf[âa]ncia|idoso|popula[çc][ãa]o em situa[çc][ãa]o de rua|povos ind[íi]genas|quilombola/i, 4],
    ] },
  ],

  // ------------------------------------------------------------ Direitos Humanos
  "direitos-humanos": [
    { id: "dh-fundamentos", nome: "Fundamentos dos Direitos Humanos", regras: [
      [/dignidade da pessoa humana|direitos humanos|declara[çc][ãa]o universal|\bDUDH\b|universalidade|indivisibilidade|inalien[áa]vel|imprescrit/i, 5],
      [/gera[çc][õo]es de direitos|direitos (de primeira|de segunda|de terceira) gera[çc][ãa]o|hist[óo]ria dos direitos humanos|jusnaturalis/i, 5],
      [/sistema (interamericano|internacional) de (prote[çc][ãa]o|direitos)|corte interamericana|pacto de san jos[ée]|\bOEA\b|tratado de direitos humanos/i, 5],
      [/relativismo cultural .*direitos|universalismo .*direitos/i, 4],
    ] },
    { id: "dh-constitucional", nome: "Constituição e Estado Democrático", regras: [
      [/constitui[çc][ãa]o (federal|de 1988|brasileira)|\bCF\/?88\b|cl[áa]usula p[ée]trea|direitos fundamentais|art(igo)?\.? \d+ da constitui/i, 5],
      [/estado democr[áa]tico de direito|separa[çc][ãa]o dos poderes|legalidade|devido processo (legal)?|contradit[óo]rio|ampla defesa/i, 5],
      [/habeas corpus|mandado de seguran[çc]a|a[çc][ãa]o (civil p[úu]blica|direta)|remédio constitucional|rem[ée]dio constitucional|controle de constitucionalidade/i, 5],
      [/poder (judici[áa]rio|legislativo|executivo)|\bSTF\b|federa[çc][ãa]o|compet[êe]ncia (da uni[ãa]o|constitucional)/i, 4],
    ] },
    { id: "dh-igualdade-discriminacao", nome: "Igualdade e Não Discriminação", regras: [
      [/discrimina[çc][ãa]o|racismo|injúria racial|inj[úu]ria racial|preconceito|xenofobia|homofobia|intoler[âa]ncia/i, 5],
      [/a[çc][õo]es afirmativas|cota[s]? (racial|social|universit)|pol[íi]tica de cotas|equidade|isonomia|igualdade (material|formal)/i, 5],
      [/g[êe]nero|mulher(es)?|feminic[íi]dio|lei maria da penha|\bLGBT|identidade de g[êe]nero|orienta[çc][ãa]o sexual/i, 5],
      [/povos ind[íi]genas|quilombola|popula[çc][ãa]o negra|pessoa com defici[êe]ncia|minorias?|vulner[áa]vel|vulnerabilidade/i, 5],
    ] },
    { id: "dh-direitos-sociais", nome: "Direitos Sociais e Políticas Públicas", regras: [
      [/direitos sociais|sa[úu]de|educa[çc][ãa]o|moradia|previd[êe]ncia|assist[êe]ncia social|seguridade social|trabalho digno/i, 5],
      [/pol[íi]tica p[úu]blica|programa social|transfer[êe]ncia de renda|bolsa fam[íi]lia|renda b[áa]sica|m[íi]nimo existencial|reserva do poss[íi]vel/i, 5],
      [/trabalho (an[áa]logo|escravo|infantil)|explora[çc][ãa]o do trabalho|\bCLT\b|direitos trabalhistas|sindical/i, 5],
      [/desigualdade (de renda|social)|pobreza|fome|inseguran[çc]a alimentar|exclus[ãa]o social/i, 4],
    ] },
    { id: "dh-justica-seguranca", nome: "Justiça, Segurança e Cidadania", regras: [
      [/sistema (penal|prisional|de justi[çc]a)|encarceramento|pres[íi]dio|\bpena|puni[çc][ãa]o|justi[çc]a restaurativa|\bECA\b|ato infracional/i, 5],
      [/seguran[çc]a p[úu]blica|pol[íi]cia|viol[êe]ncia (policial|urbana|institucional)|letalidade|tortura|abuso de autoridade/i, 5],
      [/acesso [àa] justi[çc]a|defensoria p[úu]blica|minist[ée]rio p[úu]blico|judicializa[çc][ãa]o|morosidade/i, 5],
      [/cidadania|participa[çc][ãa]o (popular|social)|controle social|conselho (tutelar|de direitos)|ouvidoria/i, 4],
      [/liberdade de (express[ãa]o|imprensa|reuni[ãa]o)|censura|direito [àa] informa[çc][ãa]o/i, 5],
    ] },
  ],
};

// ------------------------------------------------- fronteira de palavra em pt-BR
//
// `\b` do JavaScript é ASCII: `\w` vale [A-Za-z0-9_] e mais nada. Todo acento,
// portanto, CONTA COMO FRONTEIRA -- e o português está cheio deles. O efeito é
// que `\brio\b` casava "territó|rio", "cená|rio", "salá|rio", "contrá|rio",
// "vocabulá|rio": 1.600 casamentos falsos só nessa regra, todos mandando a
// questão para hidrografia. Foi assim que uma questão sobre Xinjiang virou
// bacia hidrográfica.
//
// A troca abaixo reescreve cada `\b` como a asserção que ele deveria ser: "de
// um lado letra, do outro não", com a classe de letras estendida aos acentos.
// Vale para toda a tabela de uma vez, e por isso não há como uma regra nova
// nascer com o defeito.
const LETRA = "A-Za-zÀ-ÖØ-öø-ÿ0-9_";
const FRONTEIRA = `(?:(?<=[${LETRA}])(?![${LETRA}])|(?<![${LETRA}])(?=[${LETRA}]))`;

function comFronteiraPtBr(rx) {
  if (!rx.source.includes("\\b")) return rx;
  return new RegExp(rx.source.split("\\b").join(FRONTEIRA), rx.flags);
}

Object.values(SUBTEMAS).forEach((lista) => {
  lista.forEach((s) => { s.regras = s.regras.map(([rx, peso]) => [comFronteiraPtBr(rx), peso]); });
});

// Frentes que compartilham a mesma tabela de subtemas (o id da tabela difere do
// id da frente quando uma tabela serve a mais de uma frente ou tem nome curto).
const TABELA_DA_FRENTE = {
  "interpretacao-texto": "interpretacao",
  "filosofia-sociologia": "filosofia",
  "artes-cultura": "artes",
};

// `ciencias-natureza` são 132 questões de "noções gerais" que Direito escreveu
// como frente única. Elas não têm subtema próprio: são Biologia, Química ou
// Física escritas de forma introdutória, e é nessas três frentes que precisam
// entrar para o aluno encontrá-las estudando o assunto certo. A classificação
// aqui decide subtema E frente de destino ao mesmo tempo.
const REDIRECIONA = { "ciencias-natureza": ["biologia", "quimica", "fisica"] };

// `frenteOrigem` como sinal: quando a trilha que escreveu a questão já a tinha
// classificado, essa decisão vale mais que a regex.
//
// ROTEAMENTO DIRETO -- a frente de origem JÁ É o subtema.
const POR_ORIGEM = {
  "atualidades-politica": "atualidades-politica-economia",
  "atualidades-geopolitica": "atualidades-geopolitica",
  "atualidades-meioambiente": "atualidades-meioambiente",
  "atualidades-tecnologia": "atualidades-tecnologia",
};

// RESTRIÇÃO DE CANDIDATOS -- a frente de origem não dá o subtema, mas elimina
// parte deles. "historia-brasil" não diz se é Colônia ou República, mas garante
// que não é História Geral.
const RESTRINGE_ORIGEM = {
  "historia-brasil": ["historia-brasil-colonia-imperio", "historia-brasil-republica"],
  "historia-geral": ["historia-geral-antiga-medieval", "historia-geral-moderna", "historia-geral-contemporanea"],
};

// O DESTINO DO RESÍDUO
//
// Uma questão sem subtema é uma questão que o plano diário nunca sorteia: a
// rotação passa a ser por subtema, e o que não tem subtema não está em rotação
// nenhuma. Perder ~5% do banco por isso seria pior do que errar o subtema de
// ~5% -- errar o subtema entrega uma questão boa no dia errado, e não entregar
// nada não ensina ninguém.
//
// Por isso todo resíduo cai no subtema mais GENÉRICO da sua frente, marcado com
// `padrao: true` para continuar auditável (e listável por `--residuo`, que
// segue mostrando quem não pontuou). São, em geral, questões cujo enunciado só
// faz sentido colado ao texto de apoio ("Esse procedimento serve para").
const SUBTEMA_PADRAO = {
  matematica: "matematica-algebra",
  biologia: "biologia-fisiologia",
  quimica: "quimica-atomistica-ligacoes",
  fisica: "fisica-mecanica",
  historia: "historia-geral-contemporanea",
  geografia: "geografia-populacao-urbana",
  gramatica: "gramatica-coesao-semantica",
  "interpretacao-texto": "interpretacao-ideia-central",
  literatura: "literatura-teoria-analise",
  ingles: "ingles-detail",
  "filosofia-sociologia": "sociologia-cultura-identidade",
  "artes-cultura": "artes-classica-moderna",
  atualidades: "atualidades-sociedade-educacao",
  "direitos-humanos": "dh-fundamentos",
  // `ciencias-natureza` é redirecionada para Bio/Quí/Fís; quem não pontua em
  // nenhuma das três é, quase sempre, questão ambiental de fundo biológico.
  "ciencias-natureza": "biologia-ecologia",
};

// As que a regra não alcança, roteadas à mão.
//
// Ficam AQUI, e não editadas direto nos JSON gerados, para a decisão ser
// versionada junto com as regras e sobreviver a qualquer reclassificação.
const REVISADAS = {
  // --- Matemática: as 25 de vestibular-economia/classificar-matematica.js,
  // lidas uma a uma na ocasião e reaproveitadas com o id novo do banco central.
  // Contagem sem nenhuma palavra-chave: princípio multiplicativo, comissões,
  // caminhos numa malha, permutação com restrição.
  "med-matematica-76": "matematica-probabilidade",
  "med-matematica-111": "matematica-probabilidade",
  "med-matematica-147": "matematica-probabilidade",
  "med-matematica-207": "matematica-probabilidade",
  "med-matematica-208": "matematica-probabilidade",
  "med-matematica-210": "matematica-probabilidade",
  "med-matematica-212": "matematica-probabilidade",
  "med-matematica-214": "matematica-probabilidade",

  // Sistemas lineares escritos como narrativa (dois tipos de comprimido, dois
  // alimentos, pontuação de campeonato), aritmética de potências, MMC, divisão
  // euclidiana e produto de matrizes.
  "dir-matematica-rlm-55": "matematica-algebra",
  "dir-matematica-rlm-56": "matematica-algebra",
  "med-matematica-86": "matematica-algebra",
  "med-matematica-89": "matematica-algebra",
  "med-matematica-113": "matematica-algebra",
  "med-matematica-114": "matematica-algebra",
  "med-matematica-176": "matematica-algebra",
  "med-matematica-181": "matematica-algebra",
  "med-matematica-185": "matematica-algebra",
  "med-matematica-196": "matematica-algebra",

  // Média sem a palavra "média" no enunciado (a lista de valores é que pede a
  // conta), trabalho conjunto de duas bombas, dose por quilo e conversão de
  // unidade de volume.
  "dir-matematica-rlm-52": "matematica-financeira",
  "dir-matematica-rlm-77": "matematica-financeira",
  "dir-matematica-rlm-115": "matematica-financeira",
  "med-matematica-59": "matematica-financeira",
  "med-matematica-140": "matematica-financeira",

  // PA sem dizer o nome: "guarda R$ 50 e aumenta a cada mês", e a soma dos
  // múltiplos de 6 entre 50 e 200.
  "dir-matematica-rlm-103": "matematica-sequencias",
  "med-matematica-241": "matematica-sequencias",

  // --- FGV Unificado 2023.1, lote de questões reais.
  // Duas famílias de problema aqui, e vale distinguir porque o conserto é
  // diferente. A primeira é regra disparando pelo acessório: a questão dos
  // contêineres cúbicos é área de superfície, mas caiu em financeira porque
  // fala em "custo" e as alternativas são percentuais; a dos semáforos é mmc,
  // e ganhou 1 ponto solitário de "padrão" em sequências. A segunda é empate
  // em cima: distância do taxista, função inversa e minimização de distância
  // decidiram por desempate de ordem, não por mérito. Fixadas para a decisão
  // não depender de qual regra foi cadastrada primeiro.
  "dir-matematica-rlm-331": "matematica-sequencias",
  "dir-matematica-rlm-332": "matematica-geometria",
  "dir-matematica-rlm-338": "matematica-algebra",
  "dir-matematica-rlm-339": "matematica-geometria",
  "dir-matematica-rlm-342": "matematica-algebra",
  "dir-matematica-rlm-343": "matematica-geometria",

  // As três de história geral caíam em brasil-colonia-imperio, e a de Maria I
  // com ZERO ponto -- era o destino de fallback, não uma decisão. Companhia de
  // Jesus na América espanhola pontua alto em colônia por vocabulário
  // compartilhado (jesuítas, indígenas, colonos), mas o enunciado pergunta
  // pela Ordem "na Época Moderna", que é história geral.
  "dir-historia-geral-108": "historia-geral-moderna",
  "dir-historia-geral-109": "historia-geral-contemporanea",
  "dir-historia-geral-111": "historia-geral-moderna",

  // Sistemas de transporte e contêiner: logística, não clima. Empatava em
  // física-clima contra população-urbana, e nenhuma das duas é o assunto.
  "dir-geografia-175": "geografia-agraria-economica",

  // Morte de Bruno Pereira e Dom Phillips: o tema é violência contra defensor
  // ambiental. Empatava com geopolítica por citar ONU, COP26 e Acordo de Paris.
  "dir-atualidades-meioambiente-103": "atualidades-meioambiente",

  // --- FGV Unificado 2023.1, bloco de Biologia, Física e Química.
  // O bloco mora em ciencias-natureza.json e é dissolvido nas três frentes por
  // REDIRECIONA, o que amplia o alcance das regras: uma questão de Biologia
  // disputa com a tabela inteira de Física e de Química ao mesmo tempo. Daí
  // vieram os erros de frente, não só de subtema — e são os piores, porque a
  // questão vai parar no bundle da frente errada. Fotossíntese e curva de
  // crescimento caíram em óptica por "luminosidade" e "intensidade luminosa";
  // microplásticos caiu em fisiologia por "placenta, pulmão e sangue"; e
  // capacidade instalada por fonte caiu em ecologia por "biomassa" e "solar",
  // quando o que a questão cobra é reconhecer a fissão nuclear.
  "dir-ciencias-natureza-133": "biologia-fisiologia",
  "dir-ciencias-natureza-145": "biologia-ecologia",
  "dir-ciencias-natureza-146": "biologia-citologia",
  "dir-ciencias-natureza-166": "quimica-solucoes",
  // A fissão do urânio vai para química nuclear, e não para física moderna, para
  // ficar junto da questão de Joliot-Curie: as duas são do mesmo bloco de
  // Química da prova e cobram a mesma conservação de massa e carga no núcleo.
  // Separá-las mandaria uma para o bundle de Física e a outra para o de Química.
  "dir-ciencias-natureza-170": "quimica-atomistica-ligacoes",
  "dir-ciencias-natureza-152": "fisica-energia-trabalho",
  "dir-ciencias-natureza-174": "quimica-atomistica-ligacoes",

  // Erros de subtema dentro da frente certa. A usina hidrelétrica não é
  // hidrostática: a água não está parada, o que se calcula é conversão de
  // energia. O trabalho da força elétrica sobre carga trazida do infinito é
  // potencial, não energia mecânica. Os quadrinhos de Priestley são duas
  // reações de oxirredução, e não têm ácido-base no meio.
  "dir-ciencias-natureza-150": "fisica-energia-trabalho",
  "dir-ciencias-natureza-157": "fisica-eletromagnetismo",
  "dir-ciencias-natureza-164": "quimica-eletroquimica",
  "dir-ciencias-natureza-173": "quimica-solucoes",
  "dir-ciencias-natureza-175": "quimica-equilibrio-acido-base",

  // Empates decididos por ordem de cadastro, fixados no destino correto.
  "dir-ciencias-natureza-134": "biologia-fisiologia",
  "dir-ciencias-natureza-158": "fisica-ondas-optica",
  "dir-ciencias-natureza-159": "fisica-termologia",
  "dir-ciencias-natureza-169": "quimica-equilibrio-acido-base",

  // --- FGV Unificado 2023.1, bloco de Inglês.
  // Aqui o subtema é o TIPO de pergunta, não o assunto, e as regras têm pouco
  // de que se agarrar: cinco questões caíram em main-idea com ZERO ponto, que é
  // o destino de fallback, não uma decisão.
  //
  // CUIDADO ao revisar questão de Inglês: `revisado` não é sobreposto pela
  // coesão de cluster, então pin em questão amarrada a texto compartilhado
  // PARTE o cluster. Na primeira tentativa eu classifiquei cada uma pelo seu
  // comando — uma de detalhe, uma de main idea, o resto inferência — e o texto
  // de 900 palavras sobre cozinha e evolução acabou repartido em três subtemas,
  // isto é, três dias distintos de releitura para o aluno. Que é exatamente o
  // que a regra de coesão existe para evitar.
  //
  // O jeito certo é pinar só o necessário para levar a MAIORIA do cluster ao
  // subtema correto e deixar a coesão arrastar o resto. Os quatro textos deste
  // bloco convergem para inferência, que é o que a FGV de fato cobra aqui.
  "dir-ingles-211": "ingles-inference",
  "dir-ingles-213": "ingles-inference",
  "dir-ingles-214": "ingles-inference",
  "dir-ingles-215": "ingles-inference",
  "dir-ingles-218": "ingles-inference",
  "dir-ingles-219": "ingles-inference",
  "dir-ingles-220": "ingles-inference",

  // --- ITA 2024. A prova do ITA descreve o fenômeno pelo cenário, não pelo
  // nome do conteúdo, e é isso que confunde a tabela: "sombra projetada" puxa
  // óptica numa questão de queda livre, "casca metálica" não diz
  // eletromagnetismo com nenhuma palavra da regra, e relatividade restrita
  // aparece como um foguete que se afasta. As oito abaixo foram lidas uma a
  // uma; as demais 26 do lote a regra acertou sozinha.
  //
  // Sombra de fonte em queda livre: o que se cobra é queda livre e semelhança
  // de triângulos. "luz", "reflexão" e "sombra" é cenário.
  "eng-fisica-02": "fisica-mecanica",
  // Carga dentro de casca aterrada: blindagem, indução e Gauss.
  "eng-fisica-08": "fisica-eletromagnetismo",
  // Simultaneidade entre foguete e estação — relatividade restrita.
  "eng-fisica-10": "fisica-moderna",
  // aᵐ = bᵐ com a e b complexos: módulo e argumento, não geometria plana.
  "eng-matematica-10": "matematica-complexos",
  // Calcinação do calcário: a pergunta é o sinal de ΔH.
  "eng-quimica-03": "quimica-termoquimica-cinetica",
  // Deslocamento entre halogênios: ordem de reatividade, que é periodicidade.
  "eng-quimica-07": "quimica-atomistica-ligacoes",
  // Esterificação, oxidação de alcino e redução de fenol.
  "eng-quimica-09": "quimica-organica",
  // Entalpia de formação a partir de energias de ligação.
  "eng-quimica-12": "quimica-termoquimica-cinetica",

  // --- Mauá (Verão 2025 presencial e on-line, Inverno 2024). A banca ancora
  // quase toda questão num cenário do cotidiano — pneu, fertilizante, site de
  // venda de soda cáustica —, e a tabela pontua pelo cenário. Sete precisaram
  // de leitura; as 29 restantes do lote a regra acertou.
  //
  // Polímero de condensação, cadeia aromática, grupo funcional: é orgânica.
  "eng-quimica-13": "quimica-organica",
  // Dissolução de NaOH em água: a pergunta é sobre a interação íon-dipolo.
  "eng-quimica-19": "quimica-atomistica-ligacoes",
  // Solubilidade em g/L e corpo de fundo.
  "eng-quimica-21": "quimica-solucoes",
  // Percentual em massa de nutriente num fertilizante.
  "eng-quimica-23": "quimica-estequiometria",
  // Lei de velocidade e ordem de reação.
  "eng-quimica-26": "quimica-termoquimica-cinetica",
  // Sistema vascular aquífero e ossículos calcários: filo, não célula.
  "eng-biologia-07": "biologia-diversidade",
  // Densidade populacional, potencial biótico e resistência ambiental.
  "eng-biologia-09": "biologia-ecologia",
  // Xilema, floema e transpiração — fisiologia vegetal.
  "eng-biologia-08": "biologia-fisiologia",
  // Sujeito posposto numa oração relativa de Alencar: identificar o sujeito é
  // sintaxe, e a palavra "concordância" do enunciado puxou regência.
  "eng-gramatica-02": "gramatica-sintaxe-periodo",
  // Fases do capitalismo: geografia econômica. "Revolução Industrial" e
  // "propriedade privada" não pontuam em lugar nenhum, e a questão foi parar
  // em geografia física por falta de rival.
  "eng-geografia-03": "geografia-agraria-economica",
  // Cerâmica marajoara, arte plumária, cestaria e grafismo corporal: cultura
  // material dos povos originários, não música e cena.
  "eng-artes-cultura-01": "artes-patrimonio-cultura-popular",
  // Fatoração de polinômio para simplificar valor numérico. "Ensino
  // fundamental" e "aula de matemática" não pontuam, e a questão foi para
  // geometria por falta de rival.
  "eng-matematica-34": "matematica-algebra",
  // Leitura do gráfico de uma função: qual curva descreve o aquecimento.
  // "Gráfico" sozinho puxa geometria.
  "eng-matematica-37": "matematica-algebra",
  // Diagrama de Venn com três conjuntos e inclusão-exclusão.
  "eng-matematica-43": "matematica-logica-conjuntos",
  // Sistema linear disfarçado de placar de competição.
  "eng-matematica-45": "matematica-algebra",

  // --- ENEM 2023, 1º dia (Ciências Humanas)
  // O ENEM escreve o enunciado em torno de um TEXTO, e o texto quase nunca diz
  // o nome do assunto: "Felizes tempos eram esses!" é Brasil oitocentista sem
  // uma palavra-chave que a tabela reconheça. O placar dessas questões fecha em
  // ZERO em todos os subtemas, e aí quem decide é a ordem da lista — o primeiro
  // da frente leva tudo. Por isso o pino aqui não conserta só as que caíram no
  // lugar errado; ele fixa também as que acertaram por acaso do desempate.
  //
  // Revista feminina de 1853: alfabetização das moças e circulação de bilhetes.
  "enem-historia-01": "historia-brasil-colonia-imperio",
  // Porcelana chinesa e as "chinesices" do barroco mineiro, séculos XVII-XVIII.
  "enem-historia-04": "historia-brasil-colonia-imperio",
  // Enterro de Vladimir Herzog, 1975 — repressão institucionalizada.
  "enem-historia-05": "historia-brasil-republica",
  // Tahuantinsuyu: império inca antes da conquista. "Crenças coloniais", que é
  // texto do distrator e não do enunciado, puxava a questão para o Brasil colônia.
  "enem-historia-07": "historia-geral-antiga-medieval",
  // Vacina e omissão da Coroa portuguesa, texto de 1828.
  "enem-historia-08": "historia-brasil-colonia-imperio",
  // Cartas de imigrantes entre Portugal e Brasil, 1890-1930.
  "enem-historia-10": "historia-brasil-republica",
  // Antissemitismo no Brasil dos anos 1930. "Anarquista e comunista" puxava
  // para história geral contemporânea, mas o episódio é da Era Vargas.
  "enem-historia-12": "historia-brasil-republica",

  // Geografia do mesmo caderno. Aqui o problema não é falta de sinal, é
  // EXCESSO: o texto do ENEM é transversal por vocação, e a mesma questão cita
  // agricultura, indústria e mineração na mesma frase. A regra mais forte ganha,
  // e nem sempre é a do assunto que a questão de fato cobra.
  //
  // Soja e desmatamento na Amazônia — o tema é grilagem de terra pública, não
  // conservação; "desmatamento" levava a questão para sustentabilidade.
  "enem-geografia-06": "geografia-agraria-economica",
  // Xinjiang: a migração han é o INSTRUMENTO, e a integridade territorial é o
  // objetivo. "Migrantes" puxava para população.
  "enem-geografia-02": "geografia-geopolitica",
  // Acordo Mercosul–UE: quem é citado é o setor industrial europeu, mas o
  // assunto é barreira comercial entre blocos.
  "enem-geografia-10": "geografia-geopolitica",
  // Milton Santos sobre competitividade e dumping — globalização, e "produção
  // industrial" é texto de distrator.
  "enem-geografia-11": "geografia-geopolitica",
  // Cenários do IPCC. "Deslocamento de população" aparece só como consequência.
  "enem-geografia-12": "geografia-fisica-clima",
  // Mocambos sobre o mangue do Recife: o mangue é o cenário, a ocupação urbana
  // é o assunto.
  "enem-geografia-05": "geografia-populacao-urbana",
  // Agricultura urbana no Rio de Janeiro — cidade, não hidrografia.
  "enem-geografia-08": "geografia-populacao-urbana",
  // Degradação do solo: a lista de causas (agricultura, mineração, despejo
  // industrial) é o enunciado inteiro, e nenhuma delas é o assunto cobrado.
  "enem-geografia-09": "geografia-ambiente-sustentabilidade",

  // Filosofia e Sociologia do mesmo caderno. A tabela dessas seis áreas é a
  // mais porosa do banco: "moral", "cultura", "social" e "lógica" aparecem em
  // qualquer questão de Humanas, e metade do lote fecha em zero ponto.
  //
  // Plataforma Ancestralidades: crítica ao eurocentrismo na formação cultural.
  "enem-filosofia-sociologia-12": "sociologia-cultura-identidade",
  // Balzac e a educação de Anaïs — papel de gênero rompido.
  "enem-filosofia-sociologia-15": "sociologia-cultura-identidade",
  // Adorno e Horkheimer: o lazer como prolongamento do trabalho. "Indústria
  // cultural" tem as duas palavras, e "cultura" ganhava de "trabalho".
  "enem-filosofia-sociologia-04": "sociologia-trabalho-classes",
  // Os linguistas que treinam o Google Assistant: trabalho invisível.
  "enem-filosofia-sociologia-09": "sociologia-trabalho-classes",
  // Carolina Maria de Jesus e Petrolândia: a fome que atravessa 70 anos.
  "enem-filosofia-sociologia-11": "sociologia-trabalho-classes",
  // Gerineldo e Sartre: determinismo contra transcendência.
  "enem-filosofia-sociologia-13": "filosofia-etica-moral",
  // Ricoeur sobre o perdão que não se pode exigir. Fecha em zero em todos os
  // subtemas e ia parar onde a ordem da lista mandasse.
  "enem-filosofia-sociologia-06": "filosofia-etica-moral",
  // Lei Maria da Penha e violência patrimonial — instituição, não ética.
  "enem-filosofia-sociologia-08": "sociologia-instituicoes-movimentos",
  // Lina Bo Bardi: o reconhecimento veio da mobilização por equidade de gênero.
  "enem-filosofia-sociologia-10": "sociologia-instituicoes-movimentos",

  // Atualidades e Artes do mesmo caderno.
  // Juízas afegãs escondidas sob o Talibã — geopolítica, não política interna.
  "enem-atualidades-02": "atualidades-geopolitica",
  // A corrida espacial dos bilionários e a charge que desconfia dela.
  "enem-atualidades-03": "atualidades-tecnologia",
  // Cavalgada de Sant'Ana, registrada pelo IPHAN. A palavra "catedral" puxava
  // para arte clássica; o assunto é festa popular e patrimônio imaterial.
  "enem-artes-cultura-01": "artes-patrimonio-cultura-popular",

  // Interpretacao de texto do mesmo caderno. Esta e a tabela mais porosa do
  // banco: os seis subtemas descrevem HABILIDADES (achar a ideia central,
  // inferir, reconhecer o genero), e habilidade nao deixa marca lexica no
  // texto. 15 das 21 fecham em zero ponto em todos eles. Aqui o pino nao e
  // remendo -- e o unico jeito de a decisao existir.
  // Lema olímpico ganha a palavra "juntos".
  "enem-interpretacao-texto-01": "interpretacao-ideia-central",
  // Agualusa: o desdém lusitano pelo português brasileiro.
  "enem-interpretacao-texto-02": "interpretacao-recursos-linguagem",
  // Como a notícia circulava na Idade Média.
  "enem-interpretacao-texto-03": "interpretacao-ideia-central",
  // As pistas que denunciam um perfil falso.
  "enem-interpretacao-texto-04": "interpretacao-ideia-central",
  // Maio Amarelo: o apelo por trás da enumeração.
  "enem-interpretacao-texto-05": "interpretacao-argumentacao",
  // Incêndio do Museu Nacional e as línguas sem falantes.
  "enem-interpretacao-texto-06": "interpretacao-inferencia",
  // Libras varia como qualquer língua.
  "enem-interpretacao-texto-07": "interpretacao-recursos-linguagem",
  // Os colchetes invertidos da revista ]cultura[.
  "enem-interpretacao-texto-08": "interpretacao-recursos-linguagem",
  // Poesia e Atlas da violência sustentando a mesma tese.
  "enem-interpretacao-texto-09": "interpretacao-argumentacao",
  // Eliane Brum sobre a linguagem que exclui.
  "enem-interpretacao-texto-10": "interpretacao-argumentacao",
  // Dicionário de sintomas populares do Ceará.
  "enem-interpretacao-texto-11": "interpretacao-recursos-linguagem",
  // A cantiga de voltar em Ponciá Vicêncio.
  "enem-interpretacao-texto-12": "interpretacao-recursos-linguagem",
  // Os Jetsons e o imaginário de gênero cristalizado.
  "enem-interpretacao-texto-13": "interpretacao-inferencia",
  // Anúncio da Defensoria: o imperativo é o que define.
  "enem-interpretacao-texto-14": "interpretacao-genero-discurso",
  // O nó na garganta de Roberta Estrela D Alva.
  "enem-interpretacao-texto-15": "interpretacao-recursos-linguagem",
  // O crescimento do esporte eletrônico no Brasil.
  "enem-interpretacao-texto-16": "interpretacao-ideia-central",
  // A petição que mudou o verbete casamento.
  "enem-interpretacao-texto-17": "interpretacao-ideia-central",
  // Laurel Hubbard e o teto de testosterona.
  "enem-interpretacao-texto-18": "interpretacao-inferencia",
  // Simone Biles e a saúde mental do atleta.
  "enem-interpretacao-texto-19": "interpretacao-ideia-central",
  // Prática corporal no lazer é privilégio de classe.
  "enem-interpretacao-texto-20": "interpretacao-ideia-central",
  // Carta aberta da SBGG sobre a saúde do idoso.
  "enem-interpretacao-texto-21": "interpretacao-genero-discurso",

  // Literatura, Artes, Gramatica e Ingles do mesmo caderno. A tabela de
  // Literatura reconhece ESCOLA LITERARIA por nome de autor e de movimento, e
  // o ENEM raramente diz de que escola o texto e -- ele poe o texto e pergunta
  // o que ele faz. Autor vivo publicado nos anos 2010 nao dispara nenhuma
  // regra, e a questao ia para teoria-e-analise por falta de rival.
  // Jarid Arraes, Redemoinho em dia quente (2019).
  "enem-literatura-01": "literatura-contemporanea",
  // Lúcio Cardoso, Crônica da casa assassinada (1959).
  "enem-literatura-02": "literatura-contemporanea",
  // Mário de Andrade, Girassol da madrugada.
  "enem-literatura-03": "literatura-modernismo",
  // Guimarães Rosa, Dão Lalalão.
  "enem-literatura-04": "literatura-modernismo",
  // Caetano Veloso, de Alegria, alegria a Anjos tronchos.
  "enem-literatura-05": "literatura-contemporanea",
  // Itamar Vieira Junior, Torto arado (2019).
  "enem-literatura-06": "literatura-contemporanea",
  // João Alphonsus, o gato e os ratos da Inconfidência.
  "enem-literatura-08": "literatura-contemporanea",
  // José J. Veiga, Sombras de reis barbudos (1972).
  "enem-literatura-09": "literatura-contemporanea",
  // Ana Martins Marques, Migalhas (2021).
  "enem-literatura-10": "literatura-contemporanea",
  // Rui Barbosa: o discurso da ABL sobre Machado de Assis.
  "enem-literatura-11": "literatura-teoria-analise",
  // Marabaixo do Amapá, patrimônio cultural desde 2018.
  "enem-artes-cultura-05": "artes-patrimonio-cultura-popular",
  // Wolney Fernandes e a rede social como vitrine.
  "enem-artes-cultura-06": "artes-contemporanea",
  // Adriana Lisboa: a repetição de "todos" como progressão.
  "enem-gramatica-01": "gramatica-coesao-semantica",
  // Cartaz sobre desperdício de alimentos nos EUA.
  "enem-ingles-01": "ingles-inference",
  // John Donne, No man is an island.
  "enem-ingles-02": "ingles-inference",
  // Cartum do escritório sem diversidade nenhuma.
  "enem-ingles-05": "ingles-inference",
  // Wang Ping, Things We Carry on the Sea, e o Spanglish de Tato Laviera:
  // os dois pedem o sentido do poema inteiro, nao um detalhe dele.
  "enem-ingles-03": "ingles-main-idea",
  "enem-ingles-04": "ingles-main-idea",

  // --- ENEM 2023, 2o dia (Ciencias da Natureza). Aqui a tabela funciona bem
  // melhor que em Humanas -- "mol", "cetona" e "cloroplasto" sao palavras que
  // ela reconhece. Sobram os casos em que o CENARIO e de outra area que o
  // assunto: bomba de sementes para abelhas nao e fisiologia, e gluconato de
  // calcio nao faz da questao de equilibrio uma questao de organica.
  //
  // Bombas de sementes e o alimento das abelhas.
  "enem-biologia-01": "biologia-ecologia",
  // Musculo vermelho da ave migratoria: metabolismo aerobio sustentado.
  "enem-biologia-03": "biologia-fisiologia",
  // Etileno e o amadurecimento do abacate em recipiente fechado.
  "enem-biologia-04": "biologia-fisiologia",
  // Leishmaniose: o vetor se contamina pelo sangue do cao.
  "enem-biologia-06": "biologia-diversidade",
  // Anelamento do barbatimao: o floema cortado mata a raiz.
  "enem-biologia-09": "biologia-fisiologia",
  // Oxidacao de alcool secundario a cetona. "Meio acido" puxava para acido-base.
  "enem-quimica-04": "quimica-organica",
  // Aluminio do vidro e gluconato de calcio: deslocamento de equilibrio. O
  // nome do sal organico ganhava da palavra "equilibrio".
  "enem-quimica-05": "quimica-equilibrio-acido-base",

  // --- ENEM 2023, 2o dia, segunda leva (questoes 111 a 135). Quatro pinos em
  // 21 questoes, contra ~70% em Humanas: e a confirmacao de que a tabela foi
  // feita para prova que nomeia o assunto, e Natureza nomeia.
  //
  // Aguape que absorve metal toxico. "Corpo do vegetal", "tecidos" e "enzimas"
  // somaram para citologia; o assunto e biorremediacao, que e ecologia.
  "enem-biologia-12": "biologia-ecologia",
  // Casal com sindrome de Down: quais zigotos sao possiveis. "Cromossomo 21",
  // "gameta" e "zigoto" puxam para citologia, mas a pergunta e de cruzamento.
  "enem-biologia-13": "biologia-genetica",
  // Sievert e a dose de raios cosmicos numa tripulacao. "Radiacao ionizante" e
  // o assunto; "altitude", "voo" e "aeronave" e que levavam para mecanica.
  "enem-fisica-08": "fisica-moderna",
  // Copo de casca de cafe: a vantagem que decide e nao esquentar por fora.
  // Nenhuma palavra de termologia aparece -- so "conduz" e "quente".
  "enem-fisica-13": "fisica-termologia",

  // --- ENEM 2023, 2o dia, Matematica (questoes 136 a 180). Sete pinos em 30.
  //
  // A prova de Matematica do ENEM quase nunca nomeia o conteudo: ela conta uma
  // historia de pizzaria, creche ou pedagio e deixa a ferramenta implicita. As
  // regras entao se apoiam no CENARIO, e cenario com dinheiro cai em
  // financeira, cenario com "proximo termo" cai em sequencias. Onde o cenario e
  // neutro (pao de forma, fila de caixa, caloria por hora) nenhum subtema
  // pontua e a questao vira residuo -- por isso metade destes pinos aponta para
  // algebra a partir de ZERO ponto, e nao de uma disputa.
  //
  // Estatistica NAO tem subtema proprio: as 21 questoes de media, mediana e
  // moda ja no banco estao todas em financeira. Media salarial, porcentagem de
  // alcool no sangue e media de precipitacao seguiram essa convencao em vez de
  // ganhar pino -- mudar isso e mexer na tabela, nao no lote.
  //
  // As tres de progressao. O ENEM nunca escreve "progressao aritmetica": diz
  // que as vendas sobem 10 por mes ou que a populacao multiplica por 10 a cada
  // tres dias, e a tabela nao tem regra para isso. Sao residuo (zero ponto em
  // todos os subtemas), nao disputa -- e residuo cai no subtema padrao, que em
  // Matematica e algebra. O pre-voo nao acusou porque, com o alvo tambem em
  // zero, ele conta empate como acerto; so a classificacao do banco inteiro
  // mostra o `padrao: true`.
  "enem-matematica-04": "matematica-sequencias",
  "enem-matematica-17": "matematica-sequencias",
  // Triangulo magico: a palavra "triangulo" leva 14 pontos para geometria, mas
  // nao ha uma medida na questao -- e uma PA nos vertices e uma soma por lado.
  "enem-matematica-08": "matematica-sequencias",
  // Pacotes de pao de forma: proporcao e arredondamento para cima.
  "enem-matematica-09": "matematica-algebra",
  // Fila de caixa: minimizar o produto tempo x pessoas. Cenario neutro.
  "enem-matematica-13": "matematica-algebra",
  // Gasto calorico por dia da semana: soma ponderada de um quadro.
  "enem-matematica-21": "matematica-algebra",
  // Calendario maia: conversao de unidade. "260 dias" puxava probabilidade.
  "enem-matematica-25": "matematica-algebra",
  // Unidade de medida do EC do maratonista: algebra de unidades.
  "enem-matematica-27": "matematica-algebra",
  // Cartelas de tiquete: sistema linear de duas equacoes. O preco em real
  // levava para financeira, mas nao ha juros, desconto nem porcentagem.
  "enem-matematica-28": "matematica-algebra",

  // ENEM 2024, segundo dia -- Natureza. Quatro pinos em 32 questoes, a mesma
  // taxa boa do 2023: Natureza nomeia o proprio conteudo, e a tabela acerta.
  //
  // Fisiologia perde para citologia sempre que a explicacao cita a organela
  // que explica o fenomeno. Fibra muscular branca x vermelha se decide por
  // "mitocondria" e "ATP" (10 pontos para citologia), e a nitrosamina se
  // decide por "celulas parietais" -- mas o que se estuda nas duas e sistema
  // muscular e sistema digestorio. Mesmo caso da enzima do milho, ao contrario:
  // desnaturacao enzimatica e bioquimica celular, e caiu em fisiologia.
  "enem-biologia-22": "biologia-citologia",
  "enem-biologia-25": "biologia-fisiologia",
  "enem-biologia-27": "biologia-fisiologia",
  // Microplastico no tecido adiposo: o contexto e poluicao e o texto fala de
  // cadeia alimentar, o que levou 10 pontos para ecologia. Mas a pergunta e
  // "em qual TECIDO acumula" -- histologia, nao ciclo de materia.
  "enem-biologia-24": "biologia-fisiologia",
  // Sistema agroflorestal: "sucessao ecologica" e a resposta, e mesmo assim a
  // questao caiu em evolucao, porque a explicacao precisa dizer por que
  // coevolucao e adaptacao por selecao NAO servem. Descartar o distrator custa
  // pontos para o subtema do distrator -- efeito que so aparece em questao cuja
  // resposta certa depende de separar dois campos vizinhos.
  "enem-biologia-26": "biologia-ecologia",
  // Grafeno na chuva: "cations dissolvidos na agua" levou para solucoes. O que
  // se cobra e geracao de ddp por separacao de cargas.
  "enem-quimica-15": "quimica-eletroquimica",
  // Soro caseiro: as massas molares no enunciado valem 9 pontos para
  // estequiometria, mas a questao e de concentracao -- mg/mL em 2 L.
  "enem-quimica-19": "quimica-solucoes",
  // Ciclo de Otto: residuo puro, zero ponto em todos os sete subtemas. O
  // enunciado descreve as etapas por nome proprio (admissao isobarica,
  // compressao adiabatica) e nenhuma delas esta na tabela. Sem pino cairia em
  // mecanica, que e o padrao de Fisica.
  "enem-fisica-17": "fisica-termologia",
  // Fosforescencia do ZnS: "brilho", "luz" e "cor" puxam para optica, e a
  // resposta e transicao eletronica entre niveis de energia.
  "enem-fisica-16": "fisica-moderna",
  //
  // Matematica de novo pede muito pino -- sete em 31, contra quatro em 32 de
  // Natureza. A causa e a mesma ja registrada: o ENEM nomeia o CENARIO, nunca o
  // conteudo. Densidade demografica cita quilometro quadrado e vai para
  // geometria; galinheiro de area maxima cita area e vai para geometria; o
  // encontro dos dois onibus cita percurso e vai para geometria. Em todos, o
  // que se cobra e manipulacao algebrica.
  "enem-matematica-35": "matematica-algebra",
  "enem-matematica-40": "matematica-algebra",
  "enem-matematica-61": "matematica-algebra",
  // Microscopio: "combinacao" e "produto" levaram para probabilidade.
  "enem-matematica-49": "matematica-algebra",
  // Duas de residuo (zero ponto em tudo), o cego do pre-voo: tela de celular em
  // fracao mista e o preco da porcao da doceira. Ambas cairiam no padrao.
  "enem-matematica-36": "matematica-algebra",
  "enem-matematica-48": "matematica-algebra",
  // Parcelas com acrescimo percentual fixo: financeira ganhou por 9 pontos, e o
  // cenario e mesmo um financiamento -- mas o que resolve a questao e saber que
  // uma PG cresce, e por isso interessa jogar o mes isento para o fim.
  "enem-matematica-37": "matematica-sequencias",
  // Bauxita e latas de aluminio: residuo, e o cego do pre-voo pela terceira
  // vez. O pre-voo disse "cai em estequiometria, margem 0" e passou -- mas
  // margem 0 sobre um alvo que tambem tirou zero e empate, nao vitoria. Na
  // classificacao do banco a questao apareceu com `padrao: true`, no subtema
  // padrao de Quimica. A conta e proporcao de massas, sem formula nem mol.
  "enem-quimica-16": "quimica-estequiometria",
  // Corais verdadeiras e falsas: "predacao" leva a questao para ecologia, e o
  // conteudo e mimetismo mulleriano -- resultado de selecao natural sobre o
  // padrao de cor, que e evolucao.
  "enem-biologia-28": "biologia-evolucao",
};

// ------------------------------------------------------------------- classificação

// O texto de apoio entra na classificação, e resolver `textoId` é obrigatório:
// em Inglês 310 das 420 questões e em Interpretação 190 das 360 guardam o texto
// no array `textos` da frente, não em `texto_apoio`. Sem resolver a referência,
// classificar essas questões é ler só o comando ("o pronome 'it' retoma:") e
// adivinhar -- foi o que jogou metade do banco de Inglês no resíduo.
function textoDe(q, textos) {
  const apoio = q.textoId && textos ? (textos[q.textoId] || "") : (q.texto_apoio || "");
  return [q.enunciado, q.explicacao, Object.values(q.alternativas || {}).join(" "), apoio].join(" ");
}

function tabelaDe(frente) {
  return SUBTEMAS[TABELA_DA_FRENTE[frente] || frente];
}

function candidatos(frente, q) {
  const destinos = REDIRECIONA[frente] || [frente];
  let lista = [];
  destinos.forEach((d) => { lista = lista.concat(tabelaDe(d).map((s) => Object.assign({ frente: d }, s))); });

  const restricao = q.frenteOrigem && RESTRINGE_ORIGEM[q.frenteOrigem];
  if (restricao) {
    const filtrada = lista.filter((s) => restricao.indexOf(s.id) !== -1);
    if (filtrada.length) return filtrada;
  }
  return lista;
}

function classificar(frente, q, textos) {
  const lista = candidatos(frente, q);
  const txt = textoDe(q, textos);
  const placar = lista.map((s, i) => ({
    id: s.id, frente: s.frente, ordem: i,
    pontos: s.regras.reduce((soma, [rx, peso]) => soma + (rx.test(txt) ? peso : 0), 0),
  }));
  placar.sort((a, b) => b.pontos - a.pontos || a.ordem - b.ordem);
  const melhor = placar[0];
  const segundo = placar[1] || { pontos: 0 };
  return {
    subtema: melhor.pontos > 0 ? melhor.id : null,
    frenteDestino: melhor.frente,
    pontos: melhor.pontos,
    margem: melhor.pontos - segundo.pontos,
  };
}

// -------------------------------------------------------------------------- saída

// Frases de enunciado que não são de assunto nenhum. Nenhuma regra deveria
// casar aqui -- quando alguma casa, é quase sempre falta de `\b`: "amina" dentro
// de "contaminação", "irã" dentro de "brasileira", "onda" dentro de "responda".
// Cinco falsos positivos de peso 5 foram achados assim, todos invisíveis na
// contagem por subtema (a questão era classificada, só que na frente errada).
const TEXTO_NEUTRO = [
  "Com base nesses dados, analise as afirmativas a seguir e assinale a alternativa correta.",
  "O texto trata diretamente do cuidado com a segunda etapa do processo descrito acima.",
  "A contaminação foi detectada e a concreta preocupação dos pesquisadores aumentou.",
  "Considere as informações apresentadas na tabela e responda o que se pede a seguir.",
  "A partir da leitura do trecho, é correto afirmar que o autor pretende demonstrar algo.",
  "O parlamento aprovou a medida, amplamente debatida pela sociedade brasileira em 2019.",
  "Em relação ao tema, os especialistas divergem sobre qual seria a melhor abordagem.",
  "Na última estimativa, o clima de incerteza permaneceu durante toda a primeira etapa.",
].join(" ");

function falsosPositivos() {
  const achados = [];
  Object.values(SUBTEMAS).forEach((lista) => lista.forEach((s) => s.regras.forEach(([rx, peso]) => {
    const m = TEXTO_NEUTRO.match(rx);
    if (m) achados.push({ subtema: s.id, peso: peso, casou: m[0], rx: String(rx) });
  })));
  achados.sort((a, b) => b.peso - a.peso);
  if (!achados.length) {
    console.log("nenhuma regra casa o texto neutro.");
    return;
  }
  console.log("REGRAS QUE CASAM TEXTO NEUTRO (" + achados.length + "):");
  achados.forEach((a) => console.log("  peso " + a.peso + "  " + a.subtema.padEnd(34) +
    'casou "' + a.casou + '"  <- ' + a.rx.slice(0, 70)));
  process.exit(1);
}

// `--falsos` só pega o que alguém já suspeitou: ele testa as regras contra um
// texto neutro escrito à mão. `--dentro` parte do caminho oposto — varre o
// BANCO REAL e denuncia toda regra que casou no miolo de uma palavra maior.
// Foi assim que apareceram "rio" dentro de "território" (574 vezes), "pena"
// dentro de "apenas" (2.323) e "cidade" dentro de "velocidade" (557).
//
// Nem todo achado é defeito: casar "cultura" em "culturais" ou "área" em
// "áreas" é o que se quer de um radical. O que se procura é o par em que a
// palavra maior significa OUTRA COISA — e esse a lista mostra de cara, porque
// vem ordenada por frequência.
function casaDentroDePalavra(frenteAlvo) {
  const LETRA_RX = new RegExp("[" + LETRA + "]");
  const textos = [];
  fs.readdirSync(QUESTOES).filter((f) => f.endsWith(".json")).forEach((f) => {
    if (frenteAlvo && f !== frenteAlvo + ".json") return;
    const d = JSON.parse(fs.readFileSync(path.join(QUESTOES, f), "utf8"));
    (Array.isArray(d) ? d : d.questoes || []).forEach((q) => textos.push(textoDe(q)));
  });

  const achados = {};
  Object.entries(SUBTEMAS).forEach(([tabela, lista]) => lista.forEach((s) => s.regras.forEach(([rx]) => {
    const g = new RegExp(rx.source, "gi");
    textos.forEach((txt) => {
      let m;
      g.lastIndex = 0;
      while ((m = g.exec(txt)) !== null) {
        if (!m[0]) { g.lastIndex++; continue; }
        const i = m.index, fim = i + m[0].length;
        if (!LETRA_RX.test(txt[i - 1] || " ") && !LETRA_RX.test(txt[fim] || " ")) continue;
        let a = i, b = fim;
        while (a > 0 && LETRA_RX.test(txt[a - 1])) a--;
        while (b < txt.length && LETRA_RX.test(txt[b])) b++;
        const palavra = txt.slice(a, b);
        if (palavra.toLowerCase() === m[0].toLowerCase()) continue;
        const k = tabela + "/" + s.id + "\t" + m[0].toLowerCase() + "\t" + palavra.toLowerCase();
        achados[k] = (achados[k] || 0) + 1;
      }
    });
  })));

  const ord = Object.entries(achados).sort((x, y) => y[1] - x[1]);
  console.log(textos.length + " questões varridas, " + ord.length + " pares regra×palavra\n");
  ord.slice(0, 40).forEach(([k, n]) => {
    const [ondeVai, casou, palavra] = k.split("\t");
    console.log(String(n).padStart(6) + "  " + ondeVai.padEnd(44) + '"' + casou + '" dentro de "' + palavra + '"');
  });
  if (ord.length > 40) console.log("\n  … e mais " + (ord.length - 40) + " pares.");
}

function main() {
  const arg = process.argv[2];
  const alvo = process.argv[3];

  if (arg === "--falsos") return falsosPositivos();
  if (arg === "--dentro") return casaDentroDePalavra(alvo);

  fs.mkdirSync(SAIDA, { recursive: true });
  const arquivos = fs.readdirSync(QUESTOES).filter((f) => f.endsWith(".json"));

  const resumo = [];
  const residuoGeral = [];
  const apertadasGeral = [];
  let coesosGeral = 0;
  let totalClassificadas = 0;
  let totalQuestoes = 0;

  arquivos.forEach((arq) => {
    const json = JSON.parse(fs.readFileSync(path.join(QUESTOES, arq), "utf8"));
    const frente = json.frente;
    const destino = path.join(SAIDA, frente + ".json");
    const anterior = fs.existsSync(destino) ? JSON.parse(fs.readFileSync(destino, "utf8")) : { mapa: {} };

    const textos = {};
    (json.textos || []).forEach((t) => { textos[t.id] = t.conteudo || t.texto || ""; });

    const mapa = {};
    const porSubtema = {};
    const residuo = [];

    (json.questoes || []).forEach((q) => {
      totalQuestoes++;
      const conta = (r) => { porSubtema[r.subtema] = (porSubtema[r.subtema] || 0) + 1; };

      // 1. decisão humana manda sempre.
      //
      // REVISADAS vem ANTES do mapa anterior de propósito. As duas são decisão
      // humana, mas só REVISADAS é FONTE: mora aqui, é versionada e passa por
      // revisão. O mapa é artefato, regravado a cada rodada. Enquanto o mapa
      // vinha primeiro, corrigir uma entrada de REVISADAS não tinha efeito
      // nenhum sobre uma questão já marcada `revisado` — a correção era
      // silenciosamente ignorada, e a única saída era editar à mão o JSON
      // gerado, exatamente o que o CLAUDE.md proíbe. Descoberto ao tentar mover
      // a questão da fissão nuclear da FGV 2023.1 de física para química.
      if (REVISADAS[q.id]) {
        const r = { subtema: REVISADAS[q.id], frenteDestino: frenteDoSubtema(REVISADAS[q.id]), revisado: true };
        mapa[q.id] = r; conta(r); totalClassificadas++; return;
      }
      // O mapa anterior NÃO é mais consultado para `revisado`. Ele era, e isso
      // tornava a remoção impossível: tirar um id de REVISADAS não o desafixava,
      // porque o artefato da rodada anterior ainda o trazia marcado. A fonte
      // mandava para adicionar e não mandava para remover. Medido antes de
      // cortar: das 62 entradas marcadas no mapa, 59 estavam em REVISADAS e as
      // 3 órfãs eram justamente as que eu acabara de remover — ou seja, não
      // existe decisão histórica que só viva no artefato, e o ramo só servia
      // para prender.
      // 2. frenteOrigem que já é subtema
      if (q.frenteOrigem && POR_ORIGEM[q.frenteOrigem]) {
        const r = { subtema: POR_ORIGEM[q.frenteOrigem], frenteDestino: frente, origem: "frenteOrigem" };
        mapa[q.id] = r; conta(r); totalClassificadas++; return;
      }
      // 3. regex
      const c = classificar(frente, q, textos);
      if (!c.subtema) {
        residuo.push({ id: q.id, enunciado: (q.enunciado || "").slice(0, 100).replace(/\s+/g, " ") });
        residuoGeral.push({ frente: frente, id: q.id, enunciado: (q.enunciado || "").slice(0, 100).replace(/\s+/g, " ") });
        const padrao = SUBTEMA_PADRAO[frente];
        const r = { subtema: padrao, frenteDestino: frenteDoSubtema(padrao), padrao: true };
        mapa[q.id] = r; conta(r); totalClassificadas++;
        return;
      }
      if (c.margem <= 1) apertadasGeral.push({ frente: frente, id: q.id, subtema: c.subtema, pontos: c.pontos });
      mapa[q.id] = c; conta(c); totalClassificadas++;
    });

    // COESÃO DE CLUSTER
    //
    // Um texto de apoio longo sustenta até 6 questões, e nada impede que elas
    // caiam em subtemas diferentes -- em Inglês é o caso normal: o mesmo artigo
    // rende uma de main idea, uma de vocabulário e uma de inferência. Como a
    // rotação diária passa a ser por subtema, isso faria o aluno reler o mesmo
    // texto de 900 palavras em três dias distintos.
    //
    // Por isso o cluster inteiro segue o subtema da MAIORIA. Perde-se precisão
    // em algumas questões e ganha-se a leitura única do texto, que é o que o
    // aluno sente. Decisões humanas (`revisado`) não são sobrepostas.
    const clusters = {};
    (json.questoes || []).forEach((q) => {
      if (!q.textoId || !mapa[q.id]) return;
      (clusters[q.textoId] = clusters[q.textoId] || []).push(q.id);
    });
    let coesos = 0;
    Object.values(clusters).forEach((ids) => {
      if (ids.length < 2) return;
      const votos = {};
      ids.forEach((id) => { votos[mapa[id].subtema] = (votos[mapa[id].subtema] || 0) + 1; });
      const vencedor = Object.entries(votos).sort((a, b) => b[1] - a[1])[0][0];
      ids.forEach((id) => {
        if (mapa[id].subtema === vencedor || mapa[id].revisado) return;
        porSubtema[mapa[id].subtema]--;
        mapa[id] = { subtema: vencedor, frenteDestino: frenteDoSubtema(vencedor), cluster: true };
        porSubtema[vencedor] = (porSubtema[vencedor] || 0) + 1;
        coesos++;
      });
    });
    if (coesos) coesosGeral += coesos;

    if (!arg) {
      fs.writeFileSync(destino, JSON.stringify({
        gerado: new Date().toISOString().slice(0, 10),
        frente: frente,
        total: Object.keys(mapa).length,
        residuo: residuo.map((r) => r.id),
        mapa: mapa,
      }, null, 1) + "\n", "utf8");
    }

    resumo.push({ frente: frente, total: (json.questoes || []).length, porSubtema: porSubtema, residuo: residuo.length });
  });

  if (arg === "--residuo") {
    const lista = residuoGeral.filter((r) => !alvo || r.frente === alvo);
    console.log("SEM PONTUAÇÃO (" + lista.length + (alvo ? " em " + alvo : "") + "):");
    lista.forEach((r) => console.log("  " + r.frente.padEnd(22) + r.id.padEnd(26) + r.enunciado));
    return;
  }
  if (arg === "--apertadas") {
    const lista = apertadasGeral.filter((a) => !alvo || a.frente === alvo);
    console.log("MARGEM <= 1 (" + lista.length + "):");
    lista.slice(0, 120).forEach((a) => console.log("  " + a.frente.padEnd(22) + a.id.padEnd(26) + a.subtema + " (" + a.pontos + ")"));
    return;
  }
  if (arg === "--amostra") {
    const todas = {};
    arquivos.forEach((f) => {
      const j = JSON.parse(fs.readFileSync(path.join(QUESTOES, f), "utf8"));
      (j.questoes || []).forEach((q) => { todas[q.id] = q; });
    });
    const mapaTudo = {};
    fs.readdirSync(SAIDA).forEach((f) => {
      const j = JSON.parse(fs.readFileSync(path.join(SAIDA, f), "utf8"));
      Object.entries(j.mapa).forEach(([id, v]) => { mapaTudo[id] = v; });
    });
    const ids = Object.keys(mapaTudo).filter((id) => mapaTudo[id].subtema === alvo);
    console.log(alvo + ": " + ids.length + " questões. Amostra de 12:");
    ids.filter((_, i) => i % Math.max(1, Math.floor(ids.length / 12)) === 0).slice(0, 12)
      .forEach((id) => console.log("  [" + String(mapaTudo[id].pontos || "-").padStart(2) + "] " +
        (todas[id] ? (todas[id].enunciado || "").slice(0, 115).replace(/\s+/g, " ") : "?")));
    return;
  }

  console.log("Classificação em subtemas");
  console.log("═════════════════════════");
  resumo.forEach((r) => {
    console.log("\n" + r.frente + "  (" + r.total + " questões)");
    Object.entries(r.porSubtema).sort((a, b) => b[1] - a[1]).forEach(([s, n]) => {
      console.log("  " + String(n).padStart(4) + "  " + s);
    });
    if (r.residuo) console.log("  " + String(r.residuo).padStart(4) + "  SEM PONTUAÇÃO");
  });
  console.log("\n─────────────────────────");
  console.log("  " + totalClassificadas + " classificadas de " + totalQuestoes);
  console.log("  " + residuoGeral.length + " sem pontuação  (--residuo)");
  console.log("  " + apertadasGeral.length + " margem <= 1    (--apertadas)");
  console.log("  " + coesosGeral + " realocadas para manter o cluster de texto junto");
}

function frenteDoSubtema(subtemaId) {
  let achou = null;
  Object.entries(SUBTEMAS).forEach(([tabela, lista]) => {
    if (lista.some((s) => s.id === subtemaId)) {
      achou = Object.keys(TABELA_DA_FRENTE).find((f) => TABELA_DA_FRENTE[f] === tabela) || tabela;
    }
  });
  return achou;
}

module.exports = { SUBTEMAS, TABELA_DA_FRENTE, REDIRECIONA, frenteDoSubtema };
if (require.main === module) main();
