# Reequilibra a distribuição de letras corretas (a/b/c/d) em todos os bancos
# de questões, sem alterar nenhum conteúdo (enunciado, textos das
# alternativas, explicação) — só remapeia QUAL letra guarda a resposta certa
# e reembaralha as 3 erradas entre as letras restantes, pra cada arquivo
# ficar com ~25% de respostas corretas em cada letra.
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"
$letters = @("a", "b", "c", "d")
$rng = [System.Random]::new(20260721)

function Shuffle($arr, $rng) {
  $a = @($arr).Clone()
  for ($i = $a.Count - 1; $i -gt 0; $i--) {
    $j = $rng.Next(0, $i + 1)
    $tmp = $a[$i]; $a[$i] = $a[$j]; $a[$j] = $tmp
  }
  return $a
}

$files = Get-ChildItem -Path $questionsDir -Filter "*.json" | Sort-Object Name
$globalCounts = @{ a = 0; b = 0; c = 0; d = 0 }

foreach ($file in $files) {
  $json = Get-Content -Raw -Encoding UTF8 $file.FullName | ConvertFrom-Json
  $questoes = @($json.questoes)
  $n = $questoes.Count

  # sequência-alvo balanceada (a,b,c,d repetido, cortado em N, embaralhado)
  $target = @()
  while ($target.Count -lt $n) { $target += $letters }
  $target = $target[0..($n - 1)]
  $target = Shuffle $target $rng

  for ($i = 0; $i -lt $n; $i++) {
    $q = $questoes[$i]
    $oldResposta = $q.resposta
    $oldAlt = $q.alternativas
    $correctText = $oldAlt.$oldResposta

    $wrongLetters = $letters | Where-Object { $_ -ne $oldResposta }
    $wrongTexts = $wrongLetters | ForEach-Object { $oldAlt.$_ }
    $wrongTexts = Shuffle $wrongTexts $rng

    $targetLetter = $target[$i]
    $remainingLetters = Shuffle ($letters | Where-Object { $_ -ne $targetLetter }) $rng

    $newAlt = [ordered]@{}
    $newAlt[$targetLetter] = $correctText
    for ($k = 0; $k -lt 3; $k++) {
      $newAlt[$remainingLetters[$k]] = $wrongTexts[$k]
    }
    # reordena as chaves como a,b,c,d pra manter leitura natural no arquivo
    $ordered = [ordered]@{}
    foreach ($l in $letters) { $ordered[$l] = $newAlt[$l] }

    $q.alternativas = $ordered
    $q.resposta = $targetLetter
    $globalCounts[$targetLetter]++
  }

  $json.questoes = $questoes
  $outJson = $json | ConvertTo-Json -Depth 10
  [System.IO.File]::WriteAllText($file.FullName, $outJson, [System.Text.UTF8Encoding]::new($false))

  $fileCounts = $questoes | Group-Object resposta | Sort-Object Name
  $summary = ($fileCounts | ForEach-Object { "$($_.Name)=$($_.Count)" }) -join ", "
  Write-Output "$($file.Name): $n questoes -> $summary"
}

Write-Output ""
Write-Output "=== TOTAL GLOBAL ==="
$globalCounts.GetEnumerator() | Sort-Object Name | ForEach-Object { Write-Output "$($_.Key): $($_.Value)" }
