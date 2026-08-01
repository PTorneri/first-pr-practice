# Acrescenta a quinta alternativa a questões em prosa, a partir de um patch
# enxuto: para cada questão, só o TEXTO NOVO e a LETRA em que a resposta deve
# ficar.
#
# Existe porque o apply-rewrites.ps1 exige escrever todas as alternativas
# afetadas quando a resposta muda de letra — o que, em questões com enunciados
# longos, significa transcrever textos inteiros no patch. Transcrever é
# justamente onde se erra: basta um caractere trocado para o texto original ser
# silenciosamente substituído por uma versão levemente diferente. Aqui os
# textos nunca são copiados; o script apenas os reposiciona.
#
# Formato do patch:
#   { "subtopic": "historia-geral",
#     "questoes": { "historia-geral-02": { "nova": "...", "letra": "e" }, ... } }
#
# "letra" é onde a RESPOSTA CORRETA deve ficar. As demais (as três erradas
# originais mais a nova) preenchem as posições restantes na ordem em que
# estavam, com a nova por último.

param(
  [Parameter(Mandatory = $true)][string]$Patch
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"

$patchPath = if ([System.IO.Path]::IsPathRooted($Patch)) { $Patch } else { Join-Path $root $Patch }
$p = Get-Content -Raw -Encoding UTF8 $patchPath | ConvertFrom-Json
$banco = $p.subtopic
if (-not $banco) { throw "O patch precisa declarar 'subtopic'." }

$arquivo = Join-Path $questionsDir "$banco.json"
$json = Get-Content -Raw -Encoding UTF8 $arquivo | ConvertFrom-Json
$letras = @("a", "b", "c", "d", "e")
$alvos = $p.questoes
$idsPatch = @($alvos.PSObject.Properties.Name)
$feitas = @{}

foreach ($q in @($json.questoes)) {
  $entrada = $alvos.PSObject.Properties | Where-Object { $_.Name -eq $q.id }
  if (-not $entrada) { continue }
  $cfg = $entrada.Value

  if (-not $cfg.nova) { throw "$($q.id): patch sem o texto da nova alternativa." }
  if ($letras -notcontains $cfg.letra) { throw "$($q.id): letra alvo invalida '$($cfg.letra)'." }
  if (@($q.alternativas.PSObject.Properties.Name).Count -ne 4) {
    throw "$($q.id): esperava 4 alternativas, achei $(@($q.alternativas.PSObject.Properties.Name).Count)."
  }

  $textoCorreto = $q.alternativas.$($q.resposta)
  if (-not $textoCorreto) { throw "$($q.id): nao achei o texto da alternativa correta." }

  # as erradas, na ordem original, e a nova no fim
  $erradas = @()
  foreach ($prop in $q.alternativas.PSObject.Properties) {
    if ($prop.Name -ne $q.resposta) { $erradas += $prop.Value }
  }
  if ($erradas -contains $cfg.nova) { throw "$($q.id): a nova alternativa repete uma existente." }
  if ($cfg.nova -eq $textoCorreto) { throw "$($q.id): a nova alternativa e igual a correta." }
  $erradas += $cfg.nova

  $nova = [ordered]@{}
  $i = 0
  foreach ($l in $letras) {
    if ($l -eq $cfg.letra) { $nova[$l] = $textoCorreto }
    else { $nova[$l] = $erradas[$i]; $i++ }
  }

  # conferencia final antes de gravar: nada pode ter sumido nem duplicado
  $valores = @($nova.Values)
  if ($valores.Count -ne 5) { throw "$($q.id): resultado com $($valores.Count) alternativas." }
  if (@($valores | Sort-Object -Unique).Count -ne 5) { throw "$($q.id): alternativa duplicada no resultado." }
  foreach ($orig in @($q.alternativas.PSObject.Properties.Value)) {
    if ($valores -notcontains $orig) { throw "$($q.id): o texto original '$($orig.Substring(0, [Math]::Min(40, $orig.Length)))...' sumiu." }
  }
  if ($nova[$cfg.letra] -ne $textoCorreto) { throw "$($q.id): a correta nao ficou na letra pedida." }

  $q.alternativas = [PSCustomObject]$nova
  $q.resposta = $cfg.letra
  $feitas[$q.id] = $true
}

$faltando = $idsPatch | Where-Object { -not $feitas.ContainsKey($_) }
if ($faltando.Count -gt 0) { throw "IDs do patch nao encontrados no banco: $($faltando -join ', ')" }

[System.IO.File]::WriteAllText($arquivo, ($json | ConvertTo-Json -Depth 10), [System.Text.UTF8Encoding]::new($false))

$dist = @{}
foreach ($id in $idsPatch) { $l = $alvos.$id.letra; $dist[$l] = 1 + $(if ($dist.ContainsKey($l)) { $dist[$l] } else { 0 }) }
Write-Output "OK: $($feitas.Count) questoes de $banco passaram a ter 5 alternativas."
Write-Output ("Resposta por letra: " + (($letras | ForEach-Object { "$_=$(if ($dist.ContainsKey($_)) { $dist[$_] } else { 0 })" }) -join "  "))
Write-Output "Rode build-bundle.ps1 em seguida."
