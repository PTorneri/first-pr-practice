# Substitui o TEXTO de uma alternativa específica, sem tocar em mais nada.
#
# Uso:
#   .\alongar-distrator.ps1 -Patch data/reescritas/literatura-autores-01-chute.json -Simular
#   .\alongar-distrator.ps1 -Patch data/reescritas/literatura-autores-01-chute.json
#
# --- por que existe -------------------------------------------------------
#
# A catraca de chutabilidade do verify-banco.ps1 reprova o lote quando a
# alternativa CERTA é a mais longa: o aluno que não lê o enunciado acerta só
# por isso. Nas questões de interpretação o problema é estrutural, porque a
# certa carrega a formulação completa e os distratores são curtos.
#
# A correção certa é alongar um DISTRATOR, não encurtar a certa -- encurtar a
# certa tiraria dela o raciocínio que se quer ensinar. Só que reescrever a
# questão inteira pelo apply-refeitas.ps1 para mudar uma linha significa
# reproduzir enunciado, alternativas e explicação, e cada reprodução é uma
# chance de errar algo que já estava certo.
#
# Este script muda exatamente uma alternativa por entrada, e recusa qualquer
# tentativa de mexer na alternativa que é o gabarito.
#
# Formato do patch:
#   { "subtopic": "literatura",
#     "substituicoes": [ { "id": "...", "letra": "c", "texto": "..." } ] }

param(
  [Parameter(Mandatory = $true)][string]$Patch,
  [switch]$Simular
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

$patchPath = if ([System.IO.Path]::IsPathRooted($Patch)) { $Patch } else { Join-Path $root $Patch }
$p = Get-Content -Raw -Encoding UTF8 $patchPath | ConvertFrom-Json
$banco = $p.subtopic
if (-not $banco) { throw "O patch precisa declarar 'subtopic'." }
$arquivo = Join-Path $root "data\questions\$banco.json"
$json = Get-Content -Raw -Encoding UTF8 $arquivo | ConvertFrom-Json

$porId = @{}
foreach ($q in @($json.questoes)) { $porId[$q.id] = $q }

$feitas = 0
foreach ($s in @($p.substituicoes)) {
  if (-not $porId.ContainsKey($s.id)) { throw "$($s.id): id não existe em $banco.json." }
  $q = $porId[$s.id]
  if (@("a","b","c","d","e") -notcontains $s.letra) { throw "$($s.id): letra '$($s.letra)' inválida." }
  # A trava principal. Alongar a alternativa certa pioraria exatamente o defeito
  # que este script existe para corrigir.
  if ($s.letra -eq $q.resposta) { throw "$($s.id): '$($s.letra)' é o GABARITO. Este script só alonga distrator." }
  if ([string]::IsNullOrWhiteSpace($s.texto)) { throw "$($s.id): texto vazio." }

  $antigo = "$($q.alternativas.$($s.letra))"
  if ($s.texto.Length -le $antigo.Length) {
    throw "$($s.id): o texto novo ($($s.texto.Length) chars) não é mais longo que o atual ($($antigo.Length)). O patch não teria efeito sobre o tell."
  }
  # O distrator novo tem de superar a alternativa certa, senão o tell continua.
  $lenCerta = "$($q.alternativas.$($q.resposta))".Length
  if ($s.texto.Length -le $lenCerta) {
    throw "$($s.id): o distrator novo ($($s.texto.Length)) não supera a alternativa certa ($lenCerta). Alongue mais."
  }
  # Não pode virar duplicata de outra alternativa.
  foreach ($l in @("a","b","c","d","e")) {
    if ($l -ne $s.letra -and "$($q.alternativas.$l)" -eq $s.texto) { throw "$($s.id): o texto novo duplica a alternativa '$l'." }
  }

  if (-not $Simular) { $q.alternativas.$($s.letra) = $s.texto }
  $feitas++
}

if (-not $Simular) {
  [System.IO.File]::WriteAllText($arquivo, ($json | ConvertTo-Json -Depth 20), [System.Text.UTF8Encoding]::new($false))
}

Write-Output "OK: $feitas alternativas alongadas em $banco.json (nenhum gabarito tocado)."
if ($Simular) { Write-Output "(-Simular: nada foi gravado)" }
else { Write-Output "Rode verify-banco.ps1 -Frente $banco e depois build-bundle.ps1." }
