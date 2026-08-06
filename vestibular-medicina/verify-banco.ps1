# Verificador de invariantes dos bancos de questões.
#
# Reúne num lugar só as checagens que hoje estão espalhadas pelos scripts de
# mutação (add-fifth.ps1, replace-questions.ps1, apply-rewrites.ps1) e que,
# por estarem lá dentro, só rodam sobre as questões que aquele patch tocou.
# Aqui a varredura é do arquivo inteiro, então uma questão corrompida por um
# lote antigo aparece mesmo que nenhum patch novo a mencione.
#
# Uso:
#   .\verify-banco.ps1                        # todos os bancos
#   .\verify-banco.ps1 -Frente geografia      # um banco só
#   .\verify-banco.ps1 -Estrito               # exige 5 alternativas em tudo
#   .\verify-banco.ps1 -EscadaEstrita         # exige o jogo fixo da FGV nas escadas
#   .\verify-banco.ps1 -AtualizarContagem     # grava a nova baseline do tripwire
#   .\verify-banco.ps1 -ChuteEstrito          # reprova frente acima do alvo de chutabilidade
#   .\verify-banco.ps1 -AtualizarChutabilidade  # grava a baseline de chutabilidade
#
# O placar de chutabilidade sai em toda rodada, com ou sem flag: ele mede
# quanto do banco dá pra acertar sem ler o enunciado, aplicando só heurísticas
# de forma. Medido em 2026-08, o banco inteiro dava 43%, contra os 20% do
# acaso. A catraca (data/reescritas/_chutabilidade.json) impede que um lote
# novo piore uma frente; o -ChuteEstrito cobra o alvo e fica desligado
# enquanto a campanha de reescrita não termina.
#
# -Estrito e -EscadaEstrita ficam desligados enquanto a migração corre: as 108
# escadas fora do padrão e as questões ainda em 4 alternativas são pendência
# conhecida, e reprovar por elas em todo lote afogaria a regressão de verdade
# no meio do ruído. Ligue cada um quando a fase correspondente terminar.
#
# Sai com código 1 se qualquer invariante falhar, pra poder encadear com o
# build sem depender de leitura humana da saída.

param(
  [string]$Frente = "",
  [switch]$Estrito,
  # Ligado por padrão desde que a Fase 6 normalizou as 108 escadas. Se um lote
  # novo reintroduzir desvio, o script reprova em vez de apenas avisar — que é
  # o comportamento desejado agora que não há mais pendência conhecida.
  [bool]$EscadaEstrita = $true,
  [switch]$AtualizarContagem,
  # Desligado enquanto a campanha de chutabilidade corre: hoje o banco inteiro
  # está acima do alvo, então reprovar por isso reprovaria todo lote e afogaria
  # a regressão de verdade. Ligue quando as Etapas 1 e 2 terminarem.
  [switch]$ChuteEstrito,
  [switch]$AtualizarChutabilidade,
  # A catraca do _contagem.json é sobre uma CONTAGEM, que só cresce, e por isso
  # qualquer queda reprova. Chutabilidade é uma TAXA: reescrever uma questão de
  # 100 move a frente um ponto inteiro, nos dois sentidos. Sem folga, um lote
  # honesto reprovaria por ruído. Um ponto é menos que a menor mudança real
  # possível numa frente de 100 e ainda pega qualquer regressão de lote.
  [double]$ToleranciaChute = 1.0
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"
$contagemPath = Join-Path $root "data\reescritas\_contagem.json"
$chutePath = Join-Path $root "data\reescritas\_chutabilidade.json"

$LETRAS = @("a", "b", "c", "d", "e")
$FORMATOS = @("direta", "escada", "vf", "excecao", "lacunas")

# O jogo de alternativas da escada de asserções da FGV, na ORDEM em que a
# banca sempre o apresenta. A ordem importa tanto quanto o conjunto: como a
# asserção I aparece em quatro das cinco opções, quem conclui que I é falsa
# chega direto em (c) sem julgar II nem III. Embaralhar as opções — que foi o
# que o expand-to-five.ps1 fez — destrói essa heurística e o candidato passa a
# treinar um formato que não existe na prova.
$ESCADA_FGV = [ordered]@{
  a = "I, apenas"
  b = "I e II, apenas"
  c = "II e III, apenas"
  d = "I e III, apenas"
  e = "I, II e III"
}

# "III, apenas" e "II, apenas" são a impressão digital do expand-to-five.ps1:
# a FGV nunca oferece uma opção com uma asserção isolada que não seja a I.
$ESCADA_PROIBIDAS = @("III, apenas", "II, apenas")

# ------------------------------------------------- chutabilidade
#
# Mesma família da trava da escada: um padrão de FORMA que deixa a questão
# resolvível sem o conteúdo. Lá era o jogo de alternativas; aqui são dois tells
# que valem pro banco inteiro e que, medidos em 2026-08, davam 42,5% de acerto
# a quem não lesse o enunciado.
#
# Os quantificadores abaixo aparecem em 1.735 alternativas e são a certa em
# apenas 2,9% delas, contra os ~20% da taxa-base. Ou seja: descartar toda
# alternativa categórica acerta 97% das vezes. O problema não é a questão ficar
# fácil — é o aluno treinar 90 dias um reflexo ("categórico = errado") que a
# prova real sabe punir com afirmação categórica verdadeira.
$ABSOLUTO_RX = '\b(sempre|nunca|jamais|todo|todos|toda|todas|qualquer|exclusivamente|unicamente|impossível|garante|em nenhum)\b'

# O tell mais forte dos três, e o último a ser descoberto: o distrator que
# explica por que ele mesmo está errado. "a ausência total de regras estatais,
# ignorando que o liberalismo admite intervenção pontual" — quem lê só as
# alternativas elimina as que trazem a própria correção e marca a que sobra,
# sem tocar no enunciado. Medido em 2026-08: 6% dos distratores do banco contra
# 1% das respostas certas, e 53% dos distratores em filosofia-sociologia.
#
# O padrão captura a construção, não o assunto: uma oração corretiva encaixada
# depois de vírgula ('..., ignorando que', '..., hipótese que', '..., quando o
# autor'), ou um comentário explícito de oposição. Conferido alternativa a
# alternativa em três frentes antes de entrar aqui — não houve falso positivo,
# porque prosa legítima de alternativa não comenta a si mesma.
$AUTORREF_RX = '(,\s*(ignorando|quando|posição|tese|ideia|generalização|equiparação|hipótese|proposta|indiferença|deslocamento|traço|equívoco|confusão|leitura|inversão|atribuição)\b)|diametralmente opost|contradição direta|\bque \w+ (rejeita|recusa|atribui|nega|contraria)\b|\bo que contraria\b'

# Formatos com jogo de alternativas fixo ficam FORA da medição inteira. Numa
# escada, "II e III, apenas" é sempre a mais comprida e "apenas" casa com o
# $ABSOLUTO_RX — os dois tells disparam por artefato do formato, não por
# escolha de quem escreveu, e ninguém pode consertar isso sem destruir o jogo
# que a FGV de fato usa. Medi-los seria ruído permanente na catraca.
$FORMATO_SEM_CHUTE = @("escada", "vf")

# 20% é o acaso puro em cinco alternativas. Os alvos não são teóricos:
# matematica-rlm já mede 20% e historia-geral 21%, então este banco comprova
# que dá pra escrever assim. 25%/30% dão a folga de quem não vai reescrever
# 1.992 questões até a última vírgula.
$CHUTE_ALVO_GLOBAL = 25.0
$CHUTE_ALVO_FRENTE = 30.0

# Assinatura de UTF-8 lido como CP-1252: um C3/C2 seguido de um byte de
# continuacao. Montado a partir dos codigos de proposito — o intervalo comeca em
# U+0080, invisivel, e escrito literalmente se perde na primeira edicao do
# arquivo. Foi assim que a primeira versao dessa trava no build-bundle.ps1 virou
# um padrao vazio e deixou passar tudo (build-bundle.ps1:20-23).
$MOJIBAKE_RX = "[$([char]0xC3)$([char]0xC2)][$([char]0x80)-$([char]0xBF)]"

# ---------------------------------------------------------------- validação

function Test-Questao {
  param($q, [bool]$exigirCinco)

  $erros = @()
  $id = $q.id
  if (-not $id) { return @{ erros = @("questão sem 'id'"); escada = @() } }

  foreach ($campo in @("enunciado", "alternativas", "resposta", "explicacao")) {
    if (-not $q.PSObject.Properties.Name.Contains($campo)) { $erros += "$id : falta o campo '$campo'" }
  }
  if (-not $q.alternativas) { return @{ erros = $erros; escada = @() } }

  $chaves = @($q.alternativas.PSObject.Properties.Name)
  $n = $chaves.Count

  if ($exigirCinco -and $n -ne 5) { $erros += "$id : tem $n alternativas, esperava 5" }
  if ($n -lt 4 -or $n -gt 5) { $erros += "$id : tem $n alternativas (fora de 4-5)" }

  # as chaves têm que ser exatamente as N primeiras letras, em ordem
  $esperadas = @($LETRAS[0..($n - 1)])
  if (($chaves -join ",") -ne ($esperadas -join ",")) {
    $erros += "$id : chaves '$($chaves -join ",")', esperava '$($esperadas -join ",")'"
  }

  if ($chaves -notcontains $q.resposta) {
    $erros += "$id : resposta '$($q.resposta)' não está entre as alternativas"
  }

  $textos = @($q.alternativas.PSObject.Properties.Value)
  foreach ($t in $textos) {
    if ($null -eq $t -or "$t".Trim() -eq "") { $erros += "$id : alternativa vazia" }
  }
  if (@($textos | Sort-Object -Unique).Count -ne $textos.Count) {
    $erros += "$id : alternativas duplicadas entre si"
  }

  if ($q.PSObject.Properties.Name.Contains("formato") -and $q.formato) {
    if ($FORMATOS -notcontains $q.formato) { $erros += "$id : formato '$($q.formato)' desconhecido" }
  }

  if ($q.PSObject.Properties.Name.Contains("visual") -and $q.visual) {
    if (-not $q.visual.tipo) { $erros += "$id : visual sem 'tipo'" }
    if (-not $q.visual.descricao) { $erros += "$id : visual sem 'descricao' (é obrigatória — serve de fallback e de acessibilidade)" }
    if ($q.visual.arquivo -and $q.visual.arquivo -notlike "assets/*") {
      $erros += "$id : visual.arquivo '$($q.visual.arquivo)' fora de assets/"
    }
  }

  # Invariante da escada: só cobra de quem está marcado como tal. Sai como
  # aviso até a Fase 6 normalizar as 108 (ver -EscadaEstrita).
  $escadaFora = @()
  if ($q.formato -eq "escada") {
    if ($n -ne 5) {
      $escadaFora += "$id : escada com $n alternativas"
    } else {
      foreach ($l in $LETRAS) {
        if ($q.alternativas.$l -ne $ESCADA_FGV[$l]) {
          $escadaFora += "$id : escada fora do padrão FGV em ($l): '$($q.alternativas.$l)', esperava '$($ESCADA_FGV[$l])'"
        }
      }
    }
  }

  return @{ erros = $erros; escada = $escadaFora }
}

# ------------------------------------------------- medida de chutabilidade

# Simula o "aluno burro": sem ler o enunciado, ele descarta as alternativas que
# se autorrefutam, descarta as categóricas, e marca a mais comprida do que
# sobrar. O índice é quanto essa regra acerta. Acaso puro = 20%.
#
# A cascata segue a ordem de confiabilidade dos tells, do mais forte ao mais
# fraco, com recuo a cada passo: se um filtro zerar o conjunto, ele é ignorado
# em vez de encerrar a conta, porque o aluno não desiste — ele passa para a
# regra seguinte.
#
# Empate no comprimento conta como ERRO de propósito. Sem uma alternativa
# unicamente mais longa o tell não dá sinal nenhum, e um detector que se
# beneficia da dúvida superestima o problema — o número tem que ser um piso
# confiável, não o pior caso imaginável.
function Measure-Chutabilidade {
  param($questoes)

  $n = 0; $chute = 0; $longa = 0
  $absDistr = 0; $absCerta = 0; $fora = 0
  $refDistr = 0; $refCerta = 0

  foreach ($q in $questoes) {
    if (-not $q.alternativas -or -not $q.resposta) { continue }
    if ($FORMATO_SEM_CHUTE -contains $q.formato) { $fora++; continue }

    $alts = [ordered]@{}
    foreach ($l in $LETRAS) {
      $t = $q.alternativas.$l
      if ($null -ne $t -and "$t".Trim() -ne "") { $alts[$l] = "$t" }
    }
    if ($alts.Count -lt 4 -or -not $alts.Contains($q.resposta)) { continue }
    $n++

    # tell 1 — a certa é a mais longa (só conta se for a mais longa sozinha)
    $lenMax = -1; $quantosNoMax = 0; $letraMax = ""
    foreach ($l in $alts.Keys) {
      $len = $alts[$l].Length
      if ($len -gt $lenMax) { $lenMax = $len; $quantosNoMax = 1; $letraMax = $l }
      elseif ($len -eq $lenMax) { $quantosNoMax++ }
    }
    if ($quantosNoMax -eq 1 -and $letraMax -eq $q.resposta) { $longa++ }

    # tell 2 — alternativa que se autorrefuta (o eliminador mais confiável)
    $vivas = [ordered]@{}
    foreach ($l in $alts.Keys) {
      if ($alts[$l] -match $AUTORREF_RX) {
        if ($l -eq $q.resposta) { $refCerta++ } else { $refDistr++ }
      }
      else { $vivas[$l] = $alts[$l] }
    }
    if ($vivas.Count -eq 0) { $vivas = $alts }

    # tell 3 — linguagem categórica, contada separada na certa e nos distratores.
    # A contagem percorre TODAS as alternativas, não só as que sobreviveram ao
    # filtro anterior: ela mede o banco, não o caminho do aluno, e zerar uma
    # frente descartando duas vezes a mesma alternativa daria um número falso.
    foreach ($l in $alts.Keys) {
      if ($alts[$l] -match $ABSOLUTO_RX) {
        if ($l -eq $q.resposta) { $absCerta++ } else { $absDistr++ }
      }
    }
    $sobrou = [ordered]@{}
    foreach ($l in $vivas.Keys) {
      if ($vivas[$l] -notmatch $ABSOLUTO_RX) { $sobrou[$l] = $vivas[$l] }
    }

    # Se TODAS as sobreviventes forem categóricas não há o que descartar, e o
    # aluno cai de volta na regra do comprimento sobre o conjunto anterior —
    # que é o que ele faria de fato, não uma desistência.
    if ($sobrou.Count -eq 0) { $sobrou = $vivas }
    $lenEsc = -1; $quantosEsc = 0; $letraEsc = ""
    foreach ($l in $sobrou.Keys) {
      $len = $sobrou[$l].Length
      if ($len -gt $lenEsc) { $lenEsc = $len; $quantosEsc = 1; $letraEsc = $l }
      elseif ($len -eq $lenEsc) { $quantosEsc++ }
    }
    if ($quantosEsc -eq 1 -and $letraEsc -eq $q.resposta) { $chute++ }
  }

  $absTotal = $absDistr + $absCerta
  $refTotal = $refDistr + $refCerta
  return @{
    n           = $n
    fora        = $fora
    indice      = if ($n -gt 0) { [math]::Round(100.0 * $chute / $n, 1) } else { 0.0 }
    longaPct    = if ($n -gt 0) { [math]::Round(100.0 * $longa / $n, 1) } else { 0.0 }
    absDistr    = $absDistr
    absCerta    = $absCerta
    refDistr    = $refDistr
    refCerta    = $refCerta
    # Mesma leitura do absCertaPct: perto de 20% o tell morreu, perto de 0% a
    # alternativa que se explica é sempre a errada e descartá-la sai de graça.
    refCertaPct = if ($refTotal -gt 0) { [math]::Round(100.0 * $refCerta / $refTotal, 1) } else { 0.0 }
    # Quanto das alternativas categóricas é a CERTA. Perto de 20% significa que
    # o tell morreu: descartá-las passou a custar caro. Perto de 0% é o estado
    # de hoje, em que descartá-las é grátis.
    absCertaPct = if ($absTotal -gt 0) { [math]::Round(100.0 * $absCerta / $absTotal, 1) } else { 0.0 }
  }
}

# ------------------------------------------------------- banco das obras

# O data/obras-questoes.js não passa por build nenhum: é editado à mão e vai
# direto pro <script> do index.html. Até aqui nada o validava — id duplicado,
# resposta fora das alternativas e acento corrompido passavam iguais. As três
# funções abaixo dão a esse banco a mesma rede que os data/questions/*.json já
# têm, reaproveitando o Test-Questao acima.

function ConvertFrom-ObrasQuestoesJs {
  param([string]$raw)

  # O que sobra depois de tirar o comentário do topo, o 'window.OBRAS_QUESTOES ='
  # e o ';' final é JSON válido, porque as chaves do objeto vêm entre aspas.
  # Entrada nova que largue as aspas da chave quebra aqui — de propósito.
  $corpo = [regex]::Replace($raw, '(?s)^.*?window\.OBRAS_QUESTOES\s*=\s*', '')
  $corpo = [regex]::Replace($corpo, '(?s);\s*$', '')
  return ($corpo | ConvertFrom-Json)
}

function Get-ObrasIds {
  param([string]$path)

  # obras.js é objeto JS com chaves sem aspas, então ConvertFrom-Json não serve.
  # A varredura linha a linha basta porque cada obra é um bloco contíguo: o 'id:'
  # abre o registro e o 'foraDoEdital2027:' que vier depois pertence a ele.
  $ordem = New-Object System.Collections.Generic.List[string]
  $fora = @{}
  $atual = $null
  foreach ($linha in (Get-Content -Encoding UTF8 $path)) {
    $m = [regex]::Match($linha, '^\s*id:\s*"([^"]+)"')
    if ($m.Success) { $atual = $m.Groups[1].Value; $ordem.Add($atual); continue }
    if ($atual -and $linha -match '^\s*foraDoEdital2027:\s*true') { $fora[$atual] = $true }
  }
  return @{ ordem = $ordem; fora = $fora }
}

# O erro mais provável ao escrever cinco questões seguidas à mão é arrastar o id
# da obra anterior. Como nada no app lê o id, o estrago seria invisível.
function Test-ObraQuestaoId {
  param([string]$id, [string]$obraId, [int]$pos)
  return ($id -eq "$obraId-q$pos")
}

# ---------------------------------------------------------------- self-test

function Invoke-SelfTest {
  $boa = '{"id":"x-01","enunciado":"e","alternativas":{"a":"1","b":"2","c":"3","d":"4","e":"5"},"resposta":"c","explicacao":"x"}' | ConvertFrom-Json
  if ((Test-Questao $boa $true).erros.Count -ne 0) { throw "self-test: questão válida foi reprovada" }

  $dup = '{"id":"x-02","enunciado":"e","alternativas":{"a":"1","b":"1","c":"3","d":"4","e":"5"},"resposta":"a","explicacao":"x"}' | ConvertFrom-Json
  if ((Test-Questao $dup $true).erros.Count -eq 0) { throw "self-test: duplicata passou" }

  $respFora = '{"id":"x-03","enunciado":"e","alternativas":{"a":"1","b":"2","c":"3","d":"4","e":"5"},"resposta":"f","explicacao":"x"}' | ConvertFrom-Json
  if ((Test-Questao $respFora $true).erros.Count -eq 0) { throw "self-test: resposta inexistente passou" }

  $quatro = '{"id":"x-04","enunciado":"e","alternativas":{"a":"1","b":"2","c":"3","d":"4"},"resposta":"a","explicacao":"x"}' | ConvertFrom-Json
  if ((Test-Questao $quatro $false).erros.Count -ne 0) { throw "self-test: 4 alternativas reprovadas fora do modo estrito" }
  if ((Test-Questao $quatro $true).erros.Count -eq 0) { throw "self-test: 4 alternativas passaram no modo estrito" }

  # escada embaralhada tem que reprovar; escada canônica tem que passar
  $escadaRuim = '{"id":"x-05","formato":"escada","enunciado":"e","alternativas":{"a":"I e II, apenas","b":"I, apenas","c":"I, II e III","d":"II e III, apenas","e":"III, apenas"},"resposta":"a","explicacao":"x"}' | ConvertFrom-Json
  if ((Test-Questao $escadaRuim $true).escada.Count -eq 0) { throw "self-test: escada embaralhada passou" }

  $escadaBoa = '{"id":"x-06","formato":"escada","enunciado":"e","alternativas":{"a":"I, apenas","b":"I e II, apenas","c":"II e III, apenas","d":"I e III, apenas","e":"I, II e III"},"resposta":"c","explicacao":"x"}' | ConvertFrom-Json
  if ((Test-Questao $escadaBoa $true).escada.Count -ne 0) { throw "self-test: escada canônica foi reprovada" }

  $visualSemDesc = '{"id":"x-07","enunciado":"e","visual":{"tipo":"charge","arquivo":"assets/v/a.svg"},"alternativas":{"a":"1","b":"2","c":"3","d":"4","e":"5"},"resposta":"a","explicacao":"x"}' | ConvertFrom-Json
  if ((Test-Questao $visualSemDesc $true).erros.Count -eq 0) { throw "self-test: visual sem descricao passou" }

  # obras: id tem que casar com a chave da obra E com a posição na lista
  if (-not (Test-ObraQuestaoId "obra-macbeth-q3" "obra-macbeth" 3)) { throw "self-test: id de obra válido foi reprovado" }
  if (Test-ObraQuestaoId "obra-tar-q1" "obra-macbeth" 1) { throw "self-test: id com a obra trocada passou" }
  if (Test-ObraQuestaoId "obra-macbeth-q2" "obra-macbeth" 3) { throw "self-test: id fora de posição passou" }

  # obras: a extração do objeto JS tem que sobreviver ao comentário do topo
  $amostraJs = "// gerado`nwindow.OBRAS_QUESTOES = {`n  `"obra-x`": []`n};`n"
  $amostra = ConvertFrom-ObrasQuestoesJs $amostraJs
  if (@($amostra.PSObject.Properties.Name) -ne "obra-x") { throw "self-test: extração do OBRAS_QUESTOES falhou" }

  # ---- chutabilidade ----
  # Um medidor que erra pra menos é pior que medidor nenhum: ele daria por
  # encerrada uma campanha de mil questões que não terminou.

  # a certa é a mais longa e ninguém é categórico: os dois tells apontam nela.
  # A asserção de absDistr/absCerta não é decoração: a primeira versão deste
  # fixture dizia "a mais comprida de todas", o "todas" casou com o
  # $ABSOLUTO_RX, a alternativa certa foi descartada pela própria heurística e
  # o teste reprovou um medidor que estava certo.
  $chutavel = '{"id":"c-01","enunciado":"e","alternativas":{"a":"curta","b":"curta2","c":"esta aqui e visivelmente a alternativa mais comprida do conjunto","d":"curta3","e":"curta4"},"resposta":"c","explicacao":"x"}' | ConvertFrom-Json
  $m = Measure-Chutabilidade @($chutavel)
  if ($m.absDistr -ne 0 -or $m.absCerta -ne 0) { throw "self-test: fixture 'chutavel' tem linguagem categórica acidental — troque a palavra" }
  if ($m.indice -ne 100 -or $m.longaPct -ne 100) { throw "self-test: questão chutável não foi detectada (indice=$($m.indice))" }

  # a mais longa é um distrator: nenhum tell dispara
  $limpa = '{"id":"c-02","enunciado":"e","alternativas":{"a":"curta","b":"este distrator aqui e de longe o mais comprido do conjunto","c":"media coisa","d":"curta3","e":"curta4"},"resposta":"c","explicacao":"x"}' | ConvertFrom-Json
  $m = Measure-Chutabilidade @($limpa)
  if ($m.absDistr -ne 0 -or $m.absCerta -ne 0) { throw "self-test: fixture 'limpa' tem linguagem categórica acidental — troque a palavra" }
  if ($m.indice -ne 0 -or $m.longaPct -ne 0) { throw "self-test: questão limpa foi marcada como chutável" }

  # o caso que justifica a heurística combinada: a mais longa é categórica e
  # errada, então o aluno a descarta e cai na certa. Comprimento sozinho diria
  # que a questão está limpa; o índice tem que dizer que não está.
  $absoluta = '{"id":"c-03","enunciado":"e","alternativas":{"a":"curta","b":"isso sempre acontece em todos os casos possiveis sem excecao alguma","c":"resposta certa um pouco mais longa","d":"curta3","e":"curta4"},"resposta":"c","explicacao":"x"}' | ConvertFrom-Json
  $m = Measure-Chutabilidade @($absoluta)
  if ($m.longaPct -ne 0) { throw "self-test: tell de comprimento disparou onde a mais longa era distrator" }
  if ($m.indice -ne 100) { throw "self-test: heurística combinada não descartou a categórica (indice=$($m.indice))" }
  if ($m.absDistr -ne 1 -or $m.absCerta -ne 0) { throw "self-test: contagem de categóricas errada ($($m.absDistr)/$($m.absCerta))" }

  # categórica E certa: é assim que o tell morre, e a contagem precisa mostrar
  $catCerta = '{"id":"c-04","enunciado":"e","alternativas":{"a":"curta","b":"curta2","c":"nenhum estado pode jamais suprimir esse direito em qualquer hipotese","d":"curta3","e":"curta4"},"resposta":"c","explicacao":"x"}' | ConvertFrom-Json
  $m = Measure-Chutabilidade @($catCerta)
  if ($m.absCerta -ne 1 -or $m.absDistr -ne 0) { throw "self-test: categórica correta contada como distrator" }
  if ($m.absCertaPct -ne 100) { throw "self-test: absCertaPct errado ($($m.absCertaPct))" }

  # empate no comprimento não conta: sem alternativa unicamente mais longa o
  # tell não dá sinal, e o índice tem que ser piso confiável
  $empate = '{"id":"c-05","enunciado":"e","alternativas":{"a":"aaaa","b":"bbbb","c":"cccc","d":"dddd","e":"eeee"},"resposta":"c","explicacao":"x"}' | ConvertFrom-Json
  $m = Measure-Chutabilidade @($empate)
  if ($m.indice -ne 0) { throw "self-test: empate de comprimento contou como acerto do chute" }

  # escada fica fora da conta inteira: 'II e III, apenas' é sempre a mais longa
  # e casa com o regex de categórica — artefato do formato, não defeito
  $escadaChute = '{"id":"c-06","formato":"escada","enunciado":"e","alternativas":{"a":"I, apenas","b":"I e II, apenas","c":"II e III, apenas","d":"I e III, apenas","e":"I, II e III"},"resposta":"c","explicacao":"x"}' | ConvertFrom-Json
  $m = Measure-Chutabilidade @($escadaChute)
  if ($m.n -ne 0 -or $m.fora -ne 1) { throw "self-test: escada entrou na medida de chutabilidade" }
  if ($m.absDistr -ne 0 -or $m.absCerta -ne 0) { throw "self-test: 'apenas' da escada contou como linguagem categórica" }

  # o distrator que se autorrefuta: a mais longa é a que traz a própria
  # correção, então o comprimento sozinho não acusa nada e o índice tem que
  # acusar assim mesmo. É o caso que motivou o terceiro tell.
  $autoRef = '{"id":"c-07","enunciado":"e","alternativas":{"a":"curta","b":"a tese de que o autor recusava a vida em comunidade, ideia contraria ao que ele sustenta na obra","c":"resposta certa de tamanho intermediario","d":"curta3","e":"curta4"},"resposta":"c","explicacao":"x"}' | ConvertFrom-Json
  $m = Measure-Chutabilidade @($autoRef)
  if ($m.refDistr -ne 1 -or $m.refCerta -ne 0) { throw "self-test: autorrefutação não foi contada ($($m.refDistr)/$($m.refCerta))" }
  if ($m.absDistr -ne 0 -or $m.absCerta -ne 0) { throw "self-test: fixture 'autoRef' tem linguagem categórica acidental — troque a palavra" }
  if ($m.longaPct -ne 0) { throw "self-test: tell de comprimento disparou onde a mais longa era distrator" }
  if ($m.indice -ne 100) { throw "self-test: cascata não descartou a autorrefutação (indice=$($m.indice))" }

  # a mesma marca numa alternativa CERTA: é assim que o tell morre
  $refCerta = '{"id":"c-08","enunciado":"e","alternativas":{"a":"curta","b":"curta2","c":"a leitura correta do trecho, hipótese que o proprio paragrafo final confirma","d":"curta3","e":"curta4"},"resposta":"c","explicacao":"x"}' | ConvertFrom-Json
  $m = Measure-Chutabilidade @($refCerta)
  if ($m.refCerta -ne 1 -or $m.refDistr -ne 0) { throw "self-test: autorrefutação na certa contada como distrator" }
  if ($m.refCertaPct -ne 100) { throw "self-test: refCertaPct errado ($($m.refCertaPct))" }

  # cascata: se TODAS se autorrefutam, o filtro é ignorado em vez de zerar a
  # conta — senão uma questão inteiramente defeituosa sairia como limpa
  $todasRef = '{"id":"c-09","enunciado":"e","alternativas":{"a":"aa, ignorando que x","b":"bb, ignorando que y","c":"cccc a mais comprida deste conjunto aqui, ignorando que z","d":"dd, ignorando que w","e":"ee, ignorando que v"},"resposta":"c","explicacao":"x"}' | ConvertFrom-Json
  $m = Measure-Chutabilidade @($todasRef)
  if ($m.absDistr -ne 0 -or $m.absCerta -ne 0) { throw "self-test: fixture 'todasRef' tem linguagem categórica acidental — troque a palavra" }
  if ($m.refDistr -ne 4 -or $m.refCerta -ne 1) { throw "self-test: contagem de autorrefutação errada quando todas se autorrefutam" }
  if ($m.indice -ne 100) { throw "self-test: cascata zerou o conjunto em vez de recuar (indice=$($m.indice))" }
}

Invoke-SelfTest

# ---------------------------------------------------------------- varredura

$files = Get-ChildItem -Path $questionsDir -Filter "*.json" | Sort-Object Name
if ($Frente) {
  $files = $files | Where-Object { $_.BaseName -eq $Frente }
  if (-not $files) { throw "Frente '$Frente' não encontrada em data/questions/." }
}

$falhas = @()
$avisos = @()
$resumo = @()
$contagemNova = @{}
$chuteNovo = @{}
$chuteResumo = @()
$chuteN = 0
$chuteAcertos = 0
$totalGeral = 0
$cincoGeral = 0
$escadasFora = 0

foreach ($file in $files) {
  $nome = $file.BaseName
  $raw = Get-Content -Raw -Encoding UTF8 $file.FullName

  # Mesma trava do build-bundle.ps1: a assinatura da corrupcao some depois do
  # ConvertFrom-Json, entao tem que ser medida no texto cru. O padrao usa
  # escapes \u de proposito — o intervalo comeca em U+0080, invisivel, que se
  # perde ao editar o arquivo. Foi assim que a primeira versao da trava la
  # virou um padrao vazio e deixou passar tudo (build-bundle.ps1:20-23).
  $mojibake = [regex]::Matches($raw, "[\u00C3\u00C2][\u0080-\u00BF]").Count
  if ($mojibake -gt 0) { $falhas += "$nome : $mojibake sequências de acento corrompido (rode fix-encoding.ps1)" }

  try { $json = $raw | ConvertFrom-Json }
  catch { $falhas += "$nome : JSON inválido — $($_.Exception.Message)"; continue }

  if ($json.subtopic -ne $nome) { $falhas += "$nome : subtopic='$($json.subtopic)' não bate com o nome do arquivo" }

  # PowerShell 5.1 colapsa array de um elemento em escalar no round-trip de
  # JSON, e aí q.questoes.forEach quebra no navegador sem aviso nenhum.
  if (-not ($json.questoes -is [array])) { $falhas += "$nome : 'questoes' não é array (colapso do PS 5.1?)" }
  if ($json.PSObject.Properties.Name.Contains("textos") -and $null -ne $json.textos) {
    if (-not ($json.textos -is [array])) { $falhas += "$nome : 'textos' não é array (colapso do PS 5.1?)" }
  }

  $questoes = @($json.questoes)
  $total = $questoes.Count
  $cinco = 0
  $ids = @{}
  $formatoCount = @{}

  foreach ($q in $questoes) {
    $r = Test-Questao $q ([bool]$Estrito)
    foreach ($e in $r.erros) { $falhas += "$nome : $e" }
    foreach ($e in $r.escada) {
      if ($EscadaEstrita) { $falhas += "$nome : $e" } else { $escadasFora++ }
    }

    if (@($q.alternativas.PSObject.Properties.Name).Count -eq 5) { $cinco++ }

    if ($q.id) {
      if ($ids.ContainsKey($q.id)) { $falhas += "$nome : id duplicado '$($q.id)'" }
      $ids[$q.id] = $true
    }

    $f = if ($q.PSObject.Properties.Name.Contains("formato") -and $q.formato) { $q.formato } else { "(sem)" }
    $formatoCount[$f] = 1 + $(if ($formatoCount.ContainsKey($f)) { $formatoCount[$f] } else { 0 })
  }

  # clusters: todo textoId tem que existir em 'textos' e seus membros têm que
  # ser CONTÍGUOS no arquivo. É essa contiguidade que deixa a seleção
  # cluster-aware ser um agrupamento de corridas em vez de uma varredura.
  $textosIds = @{}
  if ($json.PSObject.Properties.Name.Contains("textos") -and $json.textos) {
    foreach ($t in @($json.textos)) {
      if (-not $t.id) { $falhas += "$nome : texto sem 'id'" ; continue }
      if ($textosIds.ContainsKey($t.id)) { $falhas += "$nome : texto com id duplicado '$($t.id)'" }
      if (-not $t.conteudo) { $falhas += "$nome : texto '$($t.id)' sem 'conteudo'" }
      $textosIds[$t.id] = $true
    }
  }
  $vistos = @{}
  $anterior = $null
  foreach ($q in $questoes) {
    $tid = $null
    if ($q.PSObject.Properties.Name.Contains("textoId")) { $tid = $q.textoId }
    if ($tid) {
      if (-not $textosIds.ContainsKey($tid)) { $falhas += "$nome : $($q.id) aponta para textoId '$tid' inexistente" }
      if ($tid -ne $anterior -and $vistos.ContainsKey($tid)) {
        $falhas += "$nome : cluster '$tid' não é contíguo (reaparece em $($q.id))"
      }
      $vistos[$tid] = $true
    }
    $anterior = $tid
  }

  $dist = @{}
  foreach ($l in $LETRAS) { $dist[$l] = 0 }
  foreach ($q in $questoes) { if ($q.resposta -and $dist.ContainsKey($q.resposta)) { $dist[$q.resposta]++ } }
  $distTxt = ($LETRAS | ForEach-Object { "$_=$($dist[$_])" }) -join " "

  # desvio de gabarito só é cobrado quando o banco já está todo em 5
  if ($cinco -eq $total -and $total -gt 0) {
    foreach ($l in $LETRAS) {
      $pct = 100.0 * $dist[$l] / $total
      if ($pct -lt 12 -or $pct -gt 28) {
        $avisos += "$nome : gabarito '$l' em $([math]::Round($pct,1))% (alvo ~20%)"
      }
    }
  }

  $proibidas = 0
  foreach ($p in $ESCADA_PROIBIDAS) {
    $proibidas += ([regex]::Matches($raw, '"\s*' + [regex]::Escape($p) + '\s*"')).Count
  }
  if ($proibidas -gt 0) { $avisos += "$nome : $proibidas alternativas '$($ESCADA_PROIBIDAS -join "' / '")' (padrão que a FGV não usa)" }

  $fmtTxt = ($formatoCount.GetEnumerator() | Sort-Object Name | ForEach-Object { "$($_.Key)=$($_.Value)" }) -join " "
  $resumo += [pscustomobject]@{
    Banco = $nome; Total = $total; Cinco = $cinco; Quatro = ($total - $cinco)
    Gabarito = $distTxt; Formato = $fmtTxt
  }

  $contagemNova[$nome] = @{ total = $total; cinco = $cinco }
  $totalGeral += $total
  $cincoGeral += $cinco

  $ch = Measure-Chutabilidade $questoes
  $chuteNovo[$nome] = @{ indice = $ch.indice; longaPct = $ch.longaPct; absCertaPct = $ch.absCertaPct; n = $ch.n }
  $chuteResumo += [pscustomobject]@{
    Banco = $nome; Medidas = $ch.n; "Chute%" = $ch.indice; "MaisLonga%" = $ch.longaPct
    AbsDistr = $ch.absDistr; "AbsCerta%" = $ch.absCertaPct
    RefDistr = $ch.refDistr; "RefCerta%" = $ch.refCertaPct
  }
  # o global é recomposto a partir das questões, não pela média das frentes:
  # elas têm de 100 a 167 questões e uma média simples pesaria igual
  $chuteN += $ch.n
  $chuteAcertos += [math]::Round($ch.indice * $ch.n / 100.0)
}

# ------------------------------------------------- varredura das obras

# Fica fora do -Frente porque as obras não são uma frente de data/questions/.
#
# A trilha de MEDICINA TEM obras desde 2026-08: são as nove da lista de leitura
# obrigatória da FUVEST, geradas por gerar-obras.ps1 a partir do banco de
# Direito. O comentário anterior aqui dizia que a lista era instrumento
# exclusivo da FGV, apoiado no estudo dos cadernos — e o mesmo estudo mostra o
# contrário: a FUVEST cobra a lista nas duas fases, e o dia das discursivas de
# Português vale um terço da nota final.
#
# A varredura segue condicionada à existência dos arquivos, e não ao nome da
# trilha, porque é assim que ela serve às duas sem ramificação: se um dia as
# outras seis bancas publicarem lista, basta gerar os arquivos.
$obrasLinha = ""
$temObras = (Test-Path (Join-Path $root "data\obras.js")) -or (Test-Path (Join-Path $root "data\obras-questoes.js"))
if (-not $Frente -and $temObras) {
  $obrasPath = Join-Path $root "data\obras.js"
  $obrasQPath = Join-Path $root "data\obras-questoes.js"

  if (-not (Test-Path $obrasPath)) { $falhas += "obras : data/obras.js não encontrado" }
  elseif (-not (Test-Path $obrasQPath)) { $falhas += "obras : data/obras-questoes.js não encontrado" }
  else {
    $obras = Get-ObrasIds $obrasPath
    $rawO = Get-Content -Raw -Encoding UTF8 $obrasQPath

    # Mesma trava do build-bundle.ps1, medida no texto cru. O padrao e montado a
    # partir dos codigos porque o intervalo comeca em U+0080, invisivel: escrito
    # literalmente, ele se perde na primeira vez que alguem editar este arquivo.
    $mojO = [regex]::Matches($rawO, $MOJIBAKE_RX).Count
    if ($mojO -gt 0) { $falhas += "obras : $mojO sequências de acento corrompido (rode fix-encoding.ps1)" }

    $banco = $null
    try { $banco = ConvertFrom-ObrasQuestoesJs $rawO }
    catch { $falhas += "obras : obras-questoes.js não é JSON válido depois do 'window.OBRAS_QUESTOES =' — $($_.Exception.Message)" }

    if ($banco) {
      $chavesO = @($banco.PSObject.Properties.Name)
      $obraSet = @{}
      foreach ($o in $obras.ordem) { $obraSet[$o] = $true }

      foreach ($k in $chavesO) {
        if (-not $obraSet.ContainsKey($k)) {
          $falhas += "obras : chave '$k' não corresponde a nenhuma obra de obras.js"
        }
      }

      $idsO = @{}
      $totalO = 0
      $cincoO = 0
      $distO = @{}
      foreach ($l in $LETRAS) { $distO[$l] = 0 }

      foreach ($k in $chavesO) {
        $pos = 0
        foreach ($q in @($banco.$k)) {
          $pos++
          $totalO++

          # $false e não [bool]$Estrito: as 225 questões antigas ainda estão em 4
          # alternativas, e reprovar por elas afogaria a regressão de verdade.
          $r = Test-Questao $q $false
          foreach ($e in $r.erros) { $falhas += "obras/$k : $e" }
          foreach ($e in $r.escada) { $avisos += "obras/$k : $e" }

          if ($q.alternativas -and @($q.alternativas.PSObject.Properties.Name).Count -eq 5) { $cincoO++ }

          if ($q.id) {
            if ($idsO.ContainsKey($q.id)) { $falhas += "obras : id duplicado '$($q.id)'" }
            $idsO[$q.id] = $true
            if (-not (Test-ObraQuestaoId $q.id $k $pos)) {
              $falhas += "obras/$k : id '$($q.id)' fora do padrão, esperava '$k-q$pos'"
            }
          }

          if ($q.resposta -and $distO.ContainsKey($q.resposta)) { $distO[$q.resposta]++ }
        }
      }

      # A checagem que teria pego, no dia em que apareceu, a lacuna das 11 obras
      # acrescentadas pelo edital 2027.1: o card promete "Praticar (5 questões)"
      # com texto fixo (app.js), sem consultar o banco. Obra sem
      # 'foraDoEdital2027' é obrigatória e precisa ter as cinco.
      foreach ($o in $obras.ordem) {
        if ($obras.fora.ContainsKey($o)) { continue }
        $n = 0
        if ($chavesO -contains $o) { $n = @($banco.$o).Count }
        if ($n -ne 5) { $falhas += "obras : '$o' tem $n questões de fixação, esperava 5" }
      }

      $resumo += [pscustomobject]@{
        Banco = "obras"; Total = $totalO; Cinco = $cincoO; Quatro = ($totalO - $cincoO)
        Gabarito = (($LETRAS | ForEach-Object { "$_=$($distO[$_])" }) -join " "); Formato = "(n/a)"
      }
      $contagemNova["obras"] = @{ total = $totalO; cinco = $cincoO }

      # As questões de fixação das obras têm o mesmo defeito potencial e nunca
      # foram medidas — entram na catraca junto com as frentes.
      $todasO = @()
      foreach ($k in $chavesO) { $todasO += @($banco.$k) }
      $chO = Measure-Chutabilidade $todasO
      $chuteNovo["obras"] = @{ indice = $chO.indice; longaPct = $chO.longaPct; absCertaPct = $chO.absCertaPct; n = $chO.n }
      $chuteResumo += [pscustomobject]@{
        Banco = "obras"; Medidas = $chO.n; "Chute%" = $chO.indice; "MaisLonga%" = $chO.longaPct
        AbsDistr = $chO.absDistr; AbsCerta = $chO.absCerta; "AbsCerta%" = $chO.absCertaPct
      }
      $chuteN += $chO.n
      $chuteAcertos += [math]::Round($chO.indice * $chO.n / 100.0)
      $obrasLinha = "OBRAS: $totalO questões em $($chavesO.Count) obras, $cincoO com 5 alternativas, $($totalO - $cincoO) ainda com 4"
    }
  }
}

# ------------------------------------------------- tripwire de regressão

# O rebalance-answers.ps1 tinha um bug que apagava silenciosamente uma
# alternativa de questões com 5, devolvendo-as pra 4. Nada quebrava: o app
# renderiza quantas alternativas houver. Este contador é o que teria pegado
# aquela regressão de 365 questões no mesmo dia em que aconteceu.
$baseline = $null
if (Test-Path $contagemPath) {
  $baseline = Get-Content -Raw -Encoding UTF8 $contagemPath | ConvertFrom-Json
}
if ($baseline) {
  foreach ($nome in $contagemNova.Keys) {
    if ($baseline.PSObject.Properties.Name -contains $nome) {
      $antes = $baseline.$nome.cinco
      $agora = $contagemNova[$nome].cinco
      if ($agora -lt $antes) {
        $falhas += "$nome : REGRESSÃO — questões com 5 alternativas caíram de $antes para $agora"
      }
    }
  }
}

# ------------------------------------------- catraca da chutabilidade
#
# Só desce. A campanha vai reescrever cerca de mil questões em lotes de 15, e
# o risco real não é errar um lote — é um lote consertar literatura e, sem
# ninguém olhar, reintroduzir o padrão em geografia. A catraca é por frente
# justamente por isso: um global que melhora pode estar escondendo uma frente
# que piorou.
$chuteBase = $null
if (Test-Path $chutePath) {
  $chuteBase = Get-Content -Raw -Encoding UTF8 $chutePath | ConvertFrom-Json
}
# Pedir a gravação da baseline é dizer "os números de agora são os corretos", e
# nesse caso a catraca não pode reprovar: a reprovação acontece antes do bloco
# que grava, e sem esta exceção uma subida deliberada — como a de acrescentar
# um tell novo à medida — deixaria o arquivo travado num número obsoleto para
# sempre. A comparação continua sendo impressa, para a subida não passar calada.
if ($chuteBase -and -not $AtualizarChutabilidade) {
  foreach ($nome in $chuteNovo.Keys) {
    if ($chuteBase.PSObject.Properties.Name -contains $nome) {
      $antes = [double]$chuteBase.$nome.indice
      $agora = [double]$chuteNovo[$nome].indice
      if ($agora -gt ($antes + $ToleranciaChute)) {
        $falhas += "$nome : REGRESSÃO de chutabilidade — $antes% para $agora% (tolerância $ToleranciaChute pt)"
      }
    }
  }
}
else {
  $avisos += "chutabilidade : sem baseline. Rode com -AtualizarChutabilidade para gravar a primeira e ligar a catraca."
}

# ---------------------------------------------------------------- saída

Write-Output ""
$resumo | Format-Table -AutoSize
Write-Output "TOTAL: $totalGeral questões, $cincoGeral com 5 alternativas, $($totalGeral - $cincoGeral) ainda com 4"
if ($obrasLinha) { Write-Output $obrasLinha }
if ($escadasFora -gt 0 -and -not $EscadaEstrita) {
  Write-Output "PENDENTE: $escadasFora desvios do jogo fixo da FGV em questões de escada (Fase 6). Use -EscadaEstrita para reprovar por eles."
}

# --------------------------------------------- placar de chutabilidade

Write-Output ""
Write-Output "--- CHUTABILIDADE (acerto sem ler o enunciado; acaso = 20%) ---"
$chuteResumo | Sort-Object "Chute%" -Descending | Format-Table -AutoSize

$chuteGlobal = if ($chuteN -gt 0) { [math]::Round(100.0 * $chuteAcertos / $chuteN, 1) } else { 0.0 }
# Com -Frente o número não é global coisa nenhuma, e chamá-lo assim faria
# alguém comemorar a frente errada no meio da campanha.
$rotuloChute = if ($Frente) { "ÍNDICE DE $($Frente.ToUpper())" } else { "ÍNDICE GLOBAL" }
Write-Output "${rotuloChute}: $chuteGlobal% em $chuteN questões medidas (alvo <= $CHUTE_ALVO_GLOBAL%)"

if ($chuteBase -and $chuteBase.PSObject.Properties.Name -contains "_global") {
  $delta = [math]::Round($chuteGlobal - [double]$chuteBase._global.indice, 1)
  $seta = if ($delta -lt 0) { "caiu" } elseif ($delta -gt 0) { "subiu" } else { "estável em" }
  Write-Output "  contra a baseline: $seta $([math]::Abs($delta)) pt (era $($chuteBase._global.indice)%)"
}

# Acima do alvo é aviso enquanto a campanha corre e falha depois, na mesma
# lógica do -Estrito e do -EscadaEstrita: reprovar hoje reprovaria tudo.
$acimaDoAlvo = @()
if ($chuteGlobal -gt $CHUTE_ALVO_GLOBAL) {
  $acimaDoAlvo += "chutabilidade global em $chuteGlobal% (alvo <= $CHUTE_ALVO_GLOBAL%)"
}
foreach ($linha in $chuteResumo) {
  if ($linha."Chute%" -gt $CHUTE_ALVO_FRENTE) {
    $acimaDoAlvo += "$($linha.Banco) : chutabilidade em $($linha."Chute%")% (alvo <= $CHUTE_ALVO_FRENTE%)"
  }
}
foreach ($a in $acimaDoAlvo) {
  if ($ChuteEstrito) { $falhas += $a } else { $avisos += $a }
}
if ($acimaDoAlvo.Count -gt 0 -and -not $ChuteEstrito) {
  Write-Output "PENDENTE: $($acimaDoAlvo.Count) alvo(s) de chutabilidade ainda não atingidos. Use -ChuteEstrito para reprovar por eles."
}

if ($avisos.Count -gt 0) {
  Write-Output ""
  Write-Output "--- AVISOS ($($avisos.Count)) ---"
  $avisos | ForEach-Object { Write-Output "  ~ $_" }
}

if ($falhas.Count -gt 0) {
  Write-Output ""
  Write-Output "--- FALHAS ($($falhas.Count)) ---"
  $falhas | ForEach-Object { Write-Output "  ! $_" }
  Write-Output ""
  Write-Output "REPROVADO."
  exit 1
}

if ($AtualizarContagem) {
  $dir = Split-Path -Parent $contagemPath
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
  $txt = $contagemNova | ConvertTo-Json -Depth 5
  [System.IO.File]::WriteAllText($contagemPath, $txt, [System.Text.UTF8Encoding]::new($false))
  Write-Output ""
  Write-Output "Baseline do tripwire atualizada em data/reescritas/_contagem.json"
}

if ($AtualizarChutabilidade) {
  # Gravar a baseline rodando com -Frente apagaria as outras 15 frentes do
  # arquivo e desligaria a catraca inteira sem avisar ninguém.
  if ($Frente) {
    throw "-AtualizarChutabilidade não funciona junto com -Frente: a baseline é do banco inteiro e seria sobrescrita com uma frente só."
  }
  $dir = Split-Path -Parent $chutePath
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
  $paraGravar = @{}
  foreach ($k in $chuteNovo.Keys) { $paraGravar[$k] = $chuteNovo[$k] }
  $paraGravar["_global"] = @{ indice = $chuteGlobal; n = $chuteN }
  $txt = $paraGravar | ConvertTo-Json -Depth 5
  [System.IO.File]::WriteAllText($chutePath, $txt, [System.Text.UTF8Encoding]::new($false))
  Write-Output ""
  Write-Output "Baseline de chutabilidade atualizada em data/reescritas/_chutabilidade.json (global: $chuteGlobal%)"
}

Write-Output ""
Write-Output "OK."
