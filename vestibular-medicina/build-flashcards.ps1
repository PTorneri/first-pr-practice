# Combina data/flashcards/*.json em data/flashcards.js (window.FLASHCARDS),
# mesmo padrão de build-bundle.ps1 (sem depender de Node, indisponível
# neste ambiente). Espelha vestibular-direito/build-flashcards.ps1.
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$flashcardsDir = Join-Path $root "data\flashcards"
$outFile = Join-Path $root "data\flashcards.js"

$files = Get-ChildItem -Path $flashcardsDir -Filter "*.json" | Sort-Object Name
$banks = [ordered]@{}
$total = 0

foreach ($file in $files) {
  $json = Get-Content -Raw -Encoding UTF8 $file.FullName | ConvertFrom-Json
  $banks[$json.subtopic] = $json.flashcards
  $count = @($json.flashcards).Count
  $total += $count
  Write-Output "$($file.Name): $count flashcards (subtopic=`"$($json.subtopic)`")"
}

$jsonOut = $banks | ConvertTo-Json -Depth 10
$out = "// Gerado automaticamente por build-flashcards.ps1 a partir de data/flashcards/*.json`nwindow.FLASHCARDS = $jsonOut;`n"
[System.IO.File]::WriteAllText($outFile, $out, [System.Text.UTF8Encoding]::new($false))

Write-Output ""
Write-Output "OK: $($files.Count) arquivos, $total flashcards no total -> $outFile"
