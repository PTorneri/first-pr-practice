# Substitui questões de fixação das obras, no lugar em que já estão.
#
# Uso:
#   .\apply-obras.ps1 -Patch data/reescritas/obras-chute-01.json -Simular
#   .\apply-obras.ps1 -Patch data/reescritas/obras-chute-01.json
#
# --- por que este script existe -----------------------------------------
#
# O apply-refeitas.ps1 opera sobre data/questions/*.json. O banco das obras
# mora em data/obras-questoes.js, que é um objeto JS carregado por <script>
# no index.html e não passa por build nenhum — até aqui era editado à mão.
# Com a campanha de chutabilidade mexendo em 280 questões, edição manual
# deixou de ser viável.
#
# Formato do patch (mesmo espírito do apply-refeitas):
#   { "questoes": [ { "id": "obra-macbeth-q3", "texto_apoio": "...",
#                     "enunciado": "...", "alternativas": {...},
#                     "resposta": "e", "explicacao": "..." } ] }
#
# A obra é deduzida do id: tudo antes do "-qN" final. O id tem de existir e
# estar na posição que o número indica — as duas coisas são conferidas, e é
# a mesma invariante que o verify-banco.ps1 já cobra deste banco.
#
# --- sobre reescrever o arquivo inteiro ----------------------------------
#
# O script parseia, altera e re-serializa tudo. Conferi antes de escrever:
# o formato de saída do ConvertTo-Json do PS 5.1 reproduz exatamente a
# indentação do arquivo atual, então o diff mostra só o que mudou. A única
# exceção conhecida é o apóstrofo: o arquivo hoje tem uns escapados como
# ' e outros literais, e a serialização normaliza todos para '.
# São cerca de cinco linhas de ruído, uma vez só, e o resultado fica
# consistente daí em diante.

param(
  [Parameter(Mandatory = $true)][string]$Patch,
  [switch]$Simular
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$bancoPath = Join-Path $root "data\obras-questoes.js"

$patchPath = if ([System.IO.Path]::IsPathRooted($Patch)) { $Patch } else { Join-Path $root $Patch }
if (-not (Test-Path $patchPath)) { throw "Patch não encontrado: $patchPath" }
if (-not (Test-Path $bancoPath)) { throw "Banco não encontrado: $bancoPath" }

$p = Get-Content -Raw -Encoding UTF8 $patchPath | ConvertFrom-Json
if (-not $p.questoes) { throw "O patch precisa ter um array 'questoes'." }

$raw = [System.IO.File]::ReadAllText($bancoPath, [System.Text.UTF8Encoding]::new($false))
$cabecalho = [regex]::Match($raw, '(?s)^.*?window\.OBRAS_QUESTOES\s*=\s*').Value
if (-not $cabecalho) { throw "Não achei 'window.OBRAS_QUESTOES =' no banco." }

$corpo = [regex]::Replace($raw, '(?s)^.*?window\.OBRAS_QUESTOES\s*=\s*', '')
$corpo = [regex]::Replace($corpo, '(?s);\s*$', '')
$banco = $corpo | ConvertFrom-Json

$erros = @()
$trocadas = 0
$gabaritos = @{}
$migradas = 0

foreach ($nova in @($p.questoes)) {
  if (-not $nova.id) { $erros += "questão sem 'id' no patch"; continue }

  $m = [regex]::Match($nova.id, '^(?<obra>.+)-q(?<pos>\d+)$')
  if (-not $m.Success) { $erros += "$($nova.id) : id fora do padrão 'obra-xxx-qN'"; continue }
  $obra = $m.Groups['obra'].Value
  $pos = [int]$m.Groups['pos'].Value

  if ($banco.PSObject.Properties.Name -notcontains $obra) {
    $erros += "$($nova.id) : obra '$obra' não existe no banco"; continue
  }

  $lista = @($banco.$obra)
  if ($pos -lt 1 -or $pos -gt $lista.Count) {
    $erros += "$($nova.id) : posição $pos fora do intervalo 1..$($lista.Count)"; continue
  }
  $antiga = $lista[$pos - 1]
  if ($antiga.id -ne $nova.id) {
    $erros += "$($nova.id) : na posição $pos está '$($antiga.id)' — o patch nunca reordena"; continue
  }

  # a migração 4 -> 5 é o motivo desta campanha tocar o banco inteiro;
  # contar as que sobem serve de conferência contra o tripwire do verify
  $antes = @($antiga.alternativas.PSObject.Properties.Name).Count
  $depois = @($nova.alternativas.PSObject.Properties.Name).Count
  if ($antes -eq 4 -and $depois -eq 5) { $migradas++ }
  if ($depois -lt $antes) { $erros += "$($nova.id) : perderia alternativa ($antes -> $depois)"; continue }

  $lista[$pos - 1] = $nova
  $banco.$obra = $lista
  $trocadas++
  $gabaritos[$nova.resposta] = 1 + $(if ($gabaritos.ContainsKey($nova.resposta)) { $gabaritos[$nova.resposta] } else { 0 })
}

if ($erros.Count -gt 0) {
  Write-Output "--- FALHAS ($($erros.Count)) ---"
  $erros | ForEach-Object { Write-Output "  ! $_" }
  Write-Output ""
  Write-Output "Nada foi gravado."
  exit 1
}

$corpoNovo = ($banco | ConvertTo-Json -Depth 10).Trim()
$saida = $cabecalho + $corpoNovo + ";" + [Environment]::NewLine

$gabTxt = ($gabaritos.GetEnumerator() | Sort-Object Name | ForEach-Object { "$($_.Key)=$($_.Value)" }) -join "  "
Write-Output "OK: $trocadas questões reescritas em obras-questoes.js ($migradas migradas de 4 para 5 alternativas)."
Write-Output "Gabaritos do lote: $gabTxt"

if ($Simular) {
  Write-Output "(-Simular: nada foi gravado)"
  exit 0
}

[System.IO.File]::WriteAllText($bancoPath, $saida, [System.Text.UTF8Encoding]::new($false))
Write-Output "Rode verify-banco.ps1 e confira o gabarito geral do banco das obras."
