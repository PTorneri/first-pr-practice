# Remove e adiciona questões num banco, a partir de um patch em
# data/reescritas/*.json com os blocos "remover" (lista de ids) e "adicionar"
# (questões completas).
#
# As questões removidas NÃO são descartadas: vão para
# data/reescritas/arquivo-<nome-do-patch>.json. Tirar conteúdo do banco é
# decisão de gosto, e gosto muda — sem o arquivo, reverter significaria
# garimpar o histórico do git.
#
# Uso:
#   powershell -ExecutionPolicy Bypass -File replace-questions.ps1 data/reescritas/troca-rlm.json
#   powershell -ExecutionPolicy Bypass -File build-bundle.ps1

param(
  [Parameter(Mandatory = $true)][string]$Patch
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"

$patchPath = if ([System.IO.Path]::IsPathRooted($Patch)) { $Patch } else { Join-Path $root $Patch }
if (-not (Test-Path $patchPath)) { throw "Patch não encontrado: $patchPath" }

$p = Get-Content -Raw -Encoding UTF8 $patchPath | ConvertFrom-Json
$aRemover = @($p.remover)
$aAdicionar = @($p.adicionar)
$banco = $p.subtopic
if (-not $banco) { throw "O patch precisa declarar 'subtopic'." }

$arquivo = Join-Path $questionsDir "$banco.json"
if (-not (Test-Path $arquivo)) { throw "Banco não encontrado: $arquivo" }

$json = Get-Content -Raw -Encoding UTF8 $arquivo | ConvertFrom-Json
$questoes = [System.Collections.ArrayList]@($json.questoes)
$idsExistentes = @($questoes | ForEach-Object { $_.id })

# --- Validações antes de tocar em qualquer coisa ---
foreach ($id in $aRemover) {
  if ($idsExistentes -notcontains $id) { throw "Questão a remover não existe: $id" }
}
foreach ($q in $aAdicionar) {
  foreach ($campo in @("id", "enunciado", "alternativas", "resposta", "explicacao")) {
    if (-not $q.PSObject.Properties.Name -contains $campo) { throw "Questão nova sem campo '$campo'." }
  }
  if ($idsExistentes -contains $q.id) { throw "Id já existe no banco: $($q.id)" }
  $letras = @($q.alternativas.PSObject.Properties.Name)
  if ($letras.Count -ne 4) { throw "$($q.id): esperadas 4 alternativas, achei $($letras.Count)." }
  if ($letras -notcontains $q.resposta) { throw "$($q.id): resposta '$($q.resposta)' não está entre as alternativas." }
  foreach ($l in $letras) {
    if ([string]::IsNullOrWhiteSpace($q.alternativas.$l)) { throw "$($q.id): alternativa '$l' vazia." }
  }
}

# --- Arquiva o que sai, antes de sair ---
$removidas = @($questoes | Where-Object { $aRemover -contains $_.id })
if ($removidas.Count -gt 0) {
  $nomePatch = [System.IO.Path]::GetFileNameWithoutExtension($patchPath)
  $destino = Join-Path (Split-Path $patchPath) "arquivo-$nomePatch.json"
  $conteudo = [ordered]@{
    _comentario = "Questões removidas de $banco.json pelo patch $nomePatch. Guardadas para permitir reverter."
    subtopic    = $banco
    questoes    = $removidas
  }
  [System.IO.File]::WriteAllText($destino, ($conteudo | ConvertTo-Json -Depth 10), [System.Text.UTF8Encoding]::new($false))
  Write-Output "Arquivadas $($removidas.Count) questões em $([System.IO.Path]::GetFileName($destino))"
}

# --- Aplica ---
$restantes = [System.Collections.ArrayList]@($questoes | Where-Object { $aRemover -notcontains $_.id })
foreach ($q in $aAdicionar) { $null = $restantes.Add($q) }

$json.questoes = $restantes.ToArray()
[System.IO.File]::WriteAllText($arquivo, ($json | ConvertTo-Json -Depth 10), [System.Text.UTF8Encoding]::new($false))

Write-Output ""
Write-Output "  removidas: $($aRemover -join ', ')"
Write-Output "  adicionadas: $(@($aAdicionar | ForEach-Object { $_.id }) -join ', ')"
Write-Output ""
Write-Output "OK: $banco.json passou de $($questoes.Count) para $($restantes.Count) questões. Rode build-bundle.ps1."
