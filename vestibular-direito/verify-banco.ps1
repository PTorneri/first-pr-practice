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
  [switch]$AtualizarContagem
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"
$contagemPath = Join-Path $root "data\reescritas\_contagem.json"

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
}

# ------------------------------------------------- varredura das obras

# Fica fora do -Frente porque as obras não são uma frente de data/questions/.
$obrasLinha = ""
if (-not $Frente) {
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

# ---------------------------------------------------------------- saída

Write-Output ""
$resumo | Format-Table -AutoSize
Write-Output "TOTAL: $totalGeral questões, $cincoGeral com 5 alternativas, $($totalGeral - $cincoGeral) ainda com 4"
if ($obrasLinha) { Write-Output $obrasLinha }
if ($escadasFora -gt 0 -and -not $EscadaEstrita) {
  Write-Output "PENDENTE: $escadasFora desvios do jogo fixo da FGV em questões de escada (Fase 6). Use -EscadaEstrita para reprovar por eles."
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

Write-Output ""
Write-Output "OK."
