# Troca UMA asserção de uma questão de escada, invertendo seu valor de verdade,
# e reposiciona as três para a combinação canônica resultante.
#
# Uso:
#   .\flip-assercao.ps1 -Patch data/reescritas/escada-flip-01.json -Simular
#   .\flip-assercao.ps1 -Patch data/reescritas/escada-flip-01.json
#
# --- por que ------------------------------------------------------------
#
# O normalize-escada.ps1 permuta as asserções e com isso distribui as respostas
# entre (b), (c) e (d). Mas ele não consegue produzir (a) nem (e): a permutação
# preserva QUANTAS asserções são verdadeiras, e "I, apenas" exige exatamente
# uma verdadeira, enquanto "I, II e III" exige as três. Como o banco foi
# escrito quase inteiro com duas verdadeiras e uma falsa, essas duas opções
# ficavam em 2 questões de 108 -- e um candidato aprenderia a descartá-las.
#
# Este script cobre essa lacuna: recebe o texto novo de uma asserção, o valor
# de verdade que ela passa a ter, e recoloca as três na posição correta.
#
#   vira "verdadeira": a questão passa a ter três verdadeiras -> resposta (e)
#   vira "falsa":      a questão passa a ter uma verdadeira   -> resposta (a),
#                      com a verdadeira remanescente movida para a posição I
#
# A explicação nova é obrigatória no patch: mudou o valor de verdade de uma
# afirmação, então o comentário sobre ela ficou errado. Deixar a antiga seria
# publicar uma explicação que contradiz o gabarito.
#
# Formato do patch:
#   { "subtopic": "geografia",
#     "questoes": {
#       "geografia-03": { "posicao": "III", "vira": "verdadeira",
#                         "nova": "...", "explicacao": "..." } } }

param(
  [Parameter(Mandatory = $true)][string]$Patch,
  [switch]$Simular
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"

$ESCADA_FGV = [ordered]@{
  a = "I, apenas"; b = "I e II, apenas"; c = "II e III, apenas"
  d = "I e III, apenas"; e = "I, II e III"
}
$LETRA_SUBSET = @{ a = @("I"); b = @("I", "II"); c = @("II", "III"); d = @("I", "III"); e = @("I", "II", "III") }

function Split-Assercoes {
  param([string]$enunciado)
  $linhas = $enunciado -split "`n"
  $texto = @{}; $idx = @{}
  for ($i = 0; $i -lt $linhas.Count; $i++) {
    $m = [regex]::Match($linhas[$i], "^\s*(III|II|I)\.\s*(.+)$")
    if ($m.Success) { $texto[$m.Groups[1].Value] = $m.Groups[2].Value; $idx[$m.Groups[1].Value] = $i }
  }
  if ($texto.Count -eq 3) {
    return @{ modo = "linhas"; texto = $texto; idx = $idx; linhas = $linhas }
  }
  $rx = "(?s)^(?<pre>.*?)\bI\.\s+(?<a1>.*?)\s+\bII\.\s+(?<a2>.*?)\s+\bIII\.\s+(?<a3>.*?)(?<pos>\s*(Está correto|É correto|Assinale)[^\r\n]*)$"
  $mi = [regex]::Match($enunciado, $rx)
  if (-not $mi.Success) { return $null }
  return @{
    modo = "inline"; pre = $mi.Groups["pre"].Value; pos = $mi.Groups["pos"].Value
    texto = @{ "I" = $mi.Groups["a1"].Value; "II" = $mi.Groups["a2"].Value; "III" = $mi.Groups["a3"].Value }
  }
}

function Build-Enunciado {
  param($parsed, [hashtable]$novoTexto)
  $rot = @("I", "II", "III")
  if ($parsed.modo -eq "linhas") {
    $linhas = $parsed.linhas
    $ordem = @($parsed.idx["I"], $parsed.idx["II"], $parsed.idx["III"]) | Sort-Object
    for ($i = 0; $i -lt 3; $i++) { $linhas[$ordem[$i]] = "$($rot[$i]). $($novoTexto[$rot[$i]])" }
    return ($linhas -join "`n")
  }
  $corpo = ($rot | ForEach-Object { "$_. $($novoTexto[$_])" }) -join " "
  return ($parsed.pre + $corpo + $parsed.pos)
}

# ---------------------------------------------------------------- self-test
function Invoke-SelfTest {
  $enun = "Considere:`n`nI. alfa`nII. beta`nIII. gama`n`nEstá correto o que se afirma em:"
  $p = Split-Assercoes $enun
  if ($p.modo -ne "linhas" -or $p.texto["II"] -ne "beta") { throw "self-test: parser por linhas" }
  $r = Build-Enunciado $p @{ "I" = "gama"; "II" = "alfa"; "III" = "beta" }
  if ($r -notmatch "I\. gama" -or $r -notmatch "III\. beta") { throw "self-test: reconstrução por linhas" }

  $inl = "Avalie as afirmativas: I. alfa II. beta III. gama Está correto o que se afirma em:"
  $p2 = Split-Assercoes $inl
  if ($p2.modo -ne "inline" -or $p2.texto["III"] -ne "gama") { throw "self-test: parser inline" }
  $r2 = Build-Enunciado $p2 @{ "I" = "beta"; "II" = "gama"; "III" = "alfa" }
  if ($r2 -notmatch "I\. beta II\. gama III\. alfa") { throw "self-test: reconstrução inline -> $r2" }
}
Invoke-SelfTest

# ---------------------------------------------------------------- aplicação

$patchPath = if ([System.IO.Path]::IsPathRooted($Patch)) { $Patch } else { Join-Path $root $Patch }
$p = Get-Content -Raw -Encoding UTF8 $patchPath | ConvertFrom-Json
$banco = $p.subtopic
if (-not $banco) { throw "O patch precisa declarar 'subtopic'." }
$arquivo = Join-Path $questionsDir "$banco.json"
$json = Get-Content -Raw -Encoding UTF8 $arquivo | ConvertFrom-Json

$alvos = $p.questoes
$ids = @($alvos.PSObject.Properties.Name)
$feitas = @{}
$dist = @{}

foreach ($q in @($json.questoes)) {
  $entrada = $alvos.PSObject.Properties | Where-Object { $_.Name -eq $q.id }
  if (-not $entrada) { continue }
  $cfg = $entrada.Value

  if ($q.formato -ne "escada") { throw "$($q.id): não é questão de escada." }
  foreach ($campo in @("posicao", "vira", "nova", "explicacao")) {
    if (-not $cfg.$campo) { throw "$($q.id): patch sem '$campo'." }
  }
  if (@("I", "II", "III") -notcontains $cfg.posicao) { throw "$($q.id): posicao inválida." }
  if (@("verdadeira", "falsa") -notcontains $cfg.vira) { throw "$($q.id): 'vira' deve ser verdadeira ou falsa." }

  $verdadeiras = $LETRA_SUBSET[$q.resposta]
  if (-not $verdadeiras) { throw "$($q.id): resposta '$($q.resposta)' fora do jogo canônico. Rode normalize-escada.ps1 antes." }

  $eraVerdadeira = $verdadeiras -contains $cfg.posicao
  if ($cfg.vira -eq "verdadeira" -and $eraVerdadeira) { throw "$($q.id): a asserção $($cfg.posicao) já era verdadeira." }
  if ($cfg.vira -eq "falsa" -and -not $eraVerdadeira) { throw "$($q.id): a asserção $($cfg.posicao) já era falsa." }

  $parsed = Split-Assercoes $q.enunciado
  if (-not $parsed) { throw "$($q.id): não consegui separar as três asserções." }

  $texto = @{}
  foreach ($k in @("I", "II", "III")) { $texto[$k] = $parsed.texto[$k] }
  $texto[$cfg.posicao] = $cfg.nova

  # novo conjunto de verdadeiras
  if ($cfg.vira -eq "verdadeira") { $novas = @(@("I", "II", "III")) }
  else { $novas = @($verdadeiras | Where-Object { $_ -ne $cfg.posicao }) }

  if ($novas.Count -eq 3) {
    $novoTexto = $texto
    $letra = "e"
  } elseif ($novas.Count -eq 1) {
    # a única verdadeira vai para a posição I; as falsas seguem em ordem
    $falsas = @(@("I", "II", "III") | Where-Object { $novas -notcontains $_ })
    $novoTexto = @{ "I" = $texto[$novas[0]]; "II" = $texto[$falsas[0]]; "III" = $texto[$falsas[1]] }
    $letra = "a"
  } else {
    throw "$($q.id): resultado com $($novas.Count) verdadeiras, esperava 1 ou 3."
  }

  if (-not $Simular) {
    $q.enunciado = Build-Enunciado $parsed $novoTexto
    $alt = [ordered]@{}
    foreach ($l in @("a", "b", "c", "d", "e")) { $alt[$l] = $ESCADA_FGV[$l] }
    $q.alternativas = [PSCustomObject]$alt
    $q.resposta = $letra
    $q.explicacao = $cfg.explicacao
  }
  if (-not $dist.ContainsKey($letra)) { $dist[$letra] = 0 }
  $dist[$letra]++
  $feitas[$q.id] = $true
}

$faltando = @($ids | Where-Object { -not $feitas.ContainsKey($_) })
if ($faltando.Count -gt 0) { throw "IDs do patch não encontrados em '$banco': $($faltando -join ', ')" }

if (-not $Simular) {
  [System.IO.File]::WriteAllText($arquivo, ($json | ConvertTo-Json -Depth 20), [System.Text.UTF8Encoding]::new($false))
}

Write-Output "OK: $($feitas.Count) asserções trocadas em $banco."
Write-Output ("Novas respostas: " + (($dist.GetEnumerator() | Sort-Object Name | ForEach-Object { "$($_.Key)=$($_.Value)" }) -join "  "))
if ($Simular) { Write-Output "(-Simular: nada foi gravado)" }
else { Write-Output "Rode verify-banco.ps1 -EscadaEstrita e depois build-bundle.ps1." }
