# Combina data/questions/*.json em data/bundle.js (window.QUESTION_BANKS),
# equivalente a build-bundle.js mas sem depender de Node (indisponível neste
# ambiente de desenvolvimento).
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"
$outFile = Join-Path $root "data\bundle.js"

$files = Get-ChildItem -Path $questionsDir -Filter "*.json" | Sort-Object Name
$banks = [ordered]@{}
$totalQuestions = 0

foreach ($file in $files) {
  $json = Get-Content -Raw -Encoding UTF8 $file.FullName | ConvertFrom-Json
  $banks[$json.subtopic] = $json.questoes
  $count = @($json.questoes).Count
  $totalQuestions += $count
  Write-Output "$($file.Name): $count questões (subtopic=`"$($json.subtopic)`")"
}

$jsonOut = $banks | ConvertTo-Json -Depth 10
$out = "// Gerado automaticamente por build-bundle.ps1 a partir de data/questions/*.json`nwindow.QUESTION_BANKS = $jsonOut;`n"
[System.IO.File]::WriteAllText($outFile, $out, [System.Text.UTF8Encoding]::new($false))

Write-Output ""
Write-Output "OK: $($files.Count) arquivos, $totalQuestions questões no total -> $outFile"
