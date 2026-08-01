# Aplica reescritas de alternativas em data/questions/*.json a partir de um
# arquivo de patch em data/reescritas/*.json.
#
# Por que um patch em vez de editar o JSON direto: os bancos têm 1800 questões
# e são gerados/reordenados por outros scripts. Um patch por ID é auditável
# (dá pra ler o que mudou e por quê), é idempotente e não depende da posição
# da questão no arquivo.
#
# O patch NÃO pode mexer em qual alternativa é a correta — só no texto das
# alternativas e, opcionalmente, na explicação. Se um patch tentar alterar
# `resposta`, o script recusa: reescrever distratores nunca deve mudar o
# gabarito, e um engano desses corrigiria "silenciosamente" a questão errada.
#
# Uso:
#   powershell -ExecutionPolicy Bypass -File apply-rewrites.ps1 data/reescritas/amostra-01.json
#   powershell -ExecutionPolicy Bypass -File build-bundle.ps1

param(
  [Parameter(Mandatory = $true)][string]$Patch
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"

$patchPath = if ([System.IO.Path]::IsPathRooted($Patch)) { $Patch } else { Join-Path $root $Patch }
if (-not (Test-Path $patchPath)) { throw "Patch não encontrado: $patchPath" }

$patchJson = Get-Content -Raw -Encoding UTF8 $patchPath | ConvertFrom-Json
$alvos = $patchJson.questoes

$idsNoPatch = @($alvos.PSObject.Properties.Name)
Write-Output "Patch: $([System.IO.Path]::GetFileName($patchPath)) — $($idsNoPatch.Count) questões"
Write-Output ""

$aplicadas = @{}
$files = Get-ChildItem -Path $questionsDir -Filter "*.json" | Sort-Object Name

foreach ($file in $files) {
  $json = Get-Content -Raw -Encoding UTF8 $file.FullName | ConvertFrom-Json
  $mudouArquivo = $false

  foreach ($q in @($json.questoes)) {
    $patchDaQuestao = $alvos.PSObject.Properties | Where-Object { $_.Name -eq $q.id }
    if (-not $patchDaQuestao) { continue }
    $p = $patchDaQuestao.Value

    if ($p.PSObject.Properties.Name -contains "resposta") {
      throw "O patch tenta alterar a resposta de $($q.id). Reescrever distratores não pode mudar o gabarito."
    }

    $letrasTocadas = @()
    if ($p.alternativas) {
      foreach ($prop in $p.alternativas.PSObject.Properties) {
        $letra = $prop.Name
        if (-not ($q.alternativas.PSObject.Properties.Name -contains $letra)) {
          throw "Questão $($q.id) não tem alternativa '$letra'."
        }
        $q.alternativas.$letra = $prop.Value
        $letrasTocadas += $letra
        $mudouArquivo = $true
      }
    }
    if ($p.explicacao) { $q.explicacao = $p.explicacao; $mudouArquivo = $true }

    $aplicadas[$q.id] = $true
    Write-Output ("  {0,-32} alternativas: {1}" -f $q.id, ($letrasTocadas -join ", "))
  }

  if ($mudouArquivo) {
    $saida = $json | ConvertTo-Json -Depth 10
    [System.IO.File]::WriteAllText($file.FullName, $saida, [System.Text.UTF8Encoding]::new($false))
    Write-Output "  -> gravado em $($file.Name)"
  }
}

$faltando = $idsNoPatch | Where-Object { -not $aplicadas.ContainsKey($_) }
if ($faltando.Count -gt 0) {
  throw "IDs do patch que não existem em nenhum banco: $($faltando -join ', ')"
}

Write-Output ""
Write-Output "OK: $($aplicadas.Count) questões atualizadas. Rode build-bundle.ps1 para regenerar data/bundle.js."
