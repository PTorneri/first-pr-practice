# Substitui questões existentes POR INTEIRO, no lugar em que já estão, e
# registra os textos compartilhados que elas passam a usar.
#
# Uso:
#   .\apply-refeitas.ps1 -Patch data/reescritas/ingles-refeito-01.json -Simular
#   .\apply-refeitas.ps1 -Patch data/reescritas/ingles-refeito-01.json
#
# --- por que não dá para usar o replace-questions.ps1 --------------------
#
# Aquele script remove por id e acrescenta no FIM do arquivo. Serve para trocar
# o conteúdo de um banco, mas não para reescrever questões mantendo o id: as
# reescritas voltariam todas para o fim, embaralhando a ordem, e a ordem aqui
# não é cosmética -- os membros de um cluster precisam ficar contíguos no
# arquivo, que é a invariante em que a seleção de questões se apoia desde a
# fase 8. Este script substitui no índice original e por isso preserva tanto a
# ordem quanto a contiguidade.
#
# Formato do patch:
#   { "subtopic": "ingles",
#     "textos":   [ { "id": "...", "fonte": "...", "conteudo": "..." } ],
#     "questoes": [ { "id": "ingles-01", "textoId": "...", "enunciado": "...",
#                     "alternativas": {...}, "resposta": "c", "explicacao": "...",
#                     "formato": "direta", "tipoItem": "inferencia" } ] }
#
# O id tem de existir no banco: este script nunca cria nem remove questão, só
# troca o conteúdo. Assim o tamanho do banco fica congelado, que é a condição
# para o plano de 90 dias não se mexer (fase 7).

param(
  [Parameter(Mandatory = $true)][string]$Patch,
  [switch]$Simular
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"

$patchPath = if ([System.IO.Path]::IsPathRooted($Patch)) { $Patch } else { Join-Path $root $Patch }
if (-not (Test-Path $patchPath)) { throw "Patch não encontrado: $patchPath" }

$p = Get-Content -Raw -Encoding UTF8 $patchPath | ConvertFrom-Json
$banco = $p.subtopic
if (-not $banco) { throw "O patch precisa declarar 'subtopic'." }

$arquivo = Join-Path $questionsDir "$banco.json"
if (-not (Test-Path $arquivo)) { throw "Banco não encontrado: $arquivo" }

$json = Get-Content -Raw -Encoding UTF8 $arquivo | ConvertFrom-Json
$questoes = @($json.questoes)

# índice id -> posição
$pos = @{}
for ($i = 0; $i -lt $questoes.Count; $i++) { $pos[$questoes[$i].id] = $i }

# --- textos que o patch traz -------------------------------------------
$textosBanco = [System.Collections.ArrayList]@()
if ($json.PSObject.Properties.Name -contains "textos" -and $json.textos) {
  foreach ($t in @($json.textos)) { $null = $textosBanco.Add($t) }
}
$idsTexto = @{}
foreach ($t in $textosBanco) { $idsTexto[$t.id] = $true }

$novosTextos = @()
if ($p.PSObject.Properties.Name -contains "textos" -and $p.textos) { $novosTextos = @($p.textos) }
foreach ($t in $novosTextos) {
  if (-not $t.id) { throw "Texto sem 'id' no patch." }
  if (-not $t.conteudo) { throw "Texto '$($t.id)' sem 'conteudo'." }
  if ($idsTexto.ContainsKey($t.id)) { throw "textoId duplicado: '$($t.id)' já existe em $banco.json." }
  $idsTexto[$t.id] = $true
}

# --- validação das questões, antes de tocar em qualquer coisa ----------
$novas = @($p.questoes)
if ($novas.Count -eq 0) { throw "O patch não traz nenhuma questão." }

$vistos = @{}
foreach ($q in $novas) {
  if (-not $q.id) { throw "Questão sem 'id' no patch." }
  if (-not $pos.ContainsKey($q.id)) { throw "$($q.id): id não existe em $banco.json. Este script só reescreve, não cria." }
  if ($vistos.ContainsKey($q.id)) { throw "$($q.id): repetido dentro do próprio patch." }
  $vistos[$q.id] = $true

  foreach ($campo in @("enunciado", "alternativas", "resposta", "explicacao")) {
    if (-not ($q.PSObject.Properties.Name -contains $campo)) { throw "$($q.id): sem campo '$campo'." }
  }
  $letras = @($q.alternativas.PSObject.Properties.Name)
  if (($letras -join ",") -ne "a,b,c,d,e") { throw "$($q.id): chaves '$($letras -join ",")', esperava 'a,b,c,d,e'." }
  if ($letras -notcontains $q.resposta) { throw "$($q.id): resposta '$($q.resposta)' fora das alternativas." }
  $textos = @()
  foreach ($l in $letras) {
    $v = $q.alternativas.$l
    if ([string]::IsNullOrWhiteSpace($v)) { throw "$($q.id): alternativa '$l' vazia." }
    if ($textos -contains $v) { throw "$($q.id): alternativa '$l' duplica outra." }
    $textos += $v
  }
  if ($q.PSObject.Properties.Name -contains "textoId" -and $q.textoId) {
    if (-not $idsTexto.ContainsKey($q.textoId)) { throw "$($q.id): aponta para textoId '$($q.textoId)' que não existe nem no banco nem no patch." }
  }
}

# --- aplica -------------------------------------------------------------
if (-not $Simular) {
  foreach ($q in $novas) { $questoes[$pos[$q.id]] = $q }
  foreach ($t in $novosTextos) { $null = $textosBanco.Add($t) }

  $saida = [ordered]@{ subtopic = $json.subtopic }
  if ($textosBanco.Count -gt 0) { $saida["textos"] = $textosBanco.ToArray() }
  $saida["questoes"] = $questoes

  [System.IO.File]::WriteAllText($arquivo, ($saida | ConvertTo-Json -Depth 20), [System.Text.UTF8Encoding]::new($false))
}

# Resumo depois da gravação, sempre. Encanar a saída por Select-Object -First N
# faz o PowerShell matar o processo assim que junta N objetos -- e já custou uma
# rodada inteira que reportou sucesso sem ter escrito nada.
$dist = @{}
foreach ($q in $novas) { if (-not $dist.ContainsKey($q.resposta)) { $dist[$q.resposta] = 0 }; $dist[$q.resposta]++ }

Write-Output "OK: $($novas.Count) questões reescritas em $banco.json ($($novosTextos.Count) textos novos, $($textosBanco.Count) no total)."
Write-Output ("Gabaritos do lote: " + (($dist.GetEnumerator() | Sort-Object Name | ForEach-Object { "$($_.Key)=$($_.Value)" }) -join "  "))
if ($Simular) { Write-Output "(-Simular: nada foi gravado)" }
else { Write-Output "Rode verify-banco.ps1 -Frente $banco e depois build-bundle.ps1." }
