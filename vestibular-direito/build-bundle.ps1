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

$corrompidas = 0

foreach ($file in $files) {
  $raw = Get-Content -Raw -Encoding UTF8 $file.FullName
  # A checagem tem que ser no texto CRU do arquivo: ConvertTo-Json escapa os
  # acentos como Ã, e ai a assinatura da corrupcao desaparece — foi
  # exatamente assim que uma primeira versao desta trava passou batido.
  # O padrao usa escapes \u em vez dos caracteres literais de propósito: o
  # intervalo comeca em U+0080, um caractere de controle invisivel que se
  # perde facilmente ao editar o arquivo — e foi assim que a primeira versao
  # desta trava virou "[-¿]" e deixou passar tudo, sem qualquer sinal.
  $n = [regex]::Matches($raw, "[\u00C3\u00C2][\u0080-\u00BF]").Count
  if ($n -gt 0) {
    $corrompidas += $n
    Write-Output "  !! $($file.Name): $n sequencias de acento corrompido"
  }
  $json = $raw | ConvertFrom-Json
  $banks[$json.subtopic] = $json.questoes
  $count = @($json.questoes).Count
  $totalQuestions += $count
  Write-Output "$($file.Name): $count questões (subtopic=`"$($json.subtopic)`")"
}

# Trava contra publicar texto corrompido.
#
# Ja aconteceu: dois bancos ficaram com acentos corrompidos ("radiaÃ§Ã£o" no
# lugar de "radiação") e ninguem percebeu, porque o bundle so e regerado de vez
# em quando — o app seguia servindo uma versao antiga e boa. Quando o bundle
# finalmente foi regerado, a corrupcao teria ido pro ar de uma vez. A checagem
# custa nada e pega o problema antes de virar arquivo publicado.
if ($corrompidas -gt 0) {
  throw "Encontradas $corrompidas sequencias de acento corrompido nos bancos. " +
        "Rode fix-encoding.ps1 antes de gerar o bundle."
}

$jsonOut = $banks | ConvertTo-Json -Depth 10
$out = "// Gerado automaticamente por build-bundle.ps1 a partir de data/questions/*.json`nwindow.QUESTION_BANKS = $jsonOut;`n"
[System.IO.File]::WriteAllText($outFile, $out, [System.Text.UTF8Encoding]::new($false))

Write-Output ""
Write-Output "OK: $($files.Count) arquivos, $totalQuestions questões no total -> $outFile"
