# Combina data/questions/*.json em data/bundle.js (window.QUESTION_BANKS),
# equivalente a build-bundle.js mas sem depender de Node (indisponível neste
# ambiente de desenvolvimento).
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"
$outFile = Join-Path $root "data\bundle.js"

$files = Get-ChildItem -Path $questionsDir -Filter "*.json" | Sort-Object Name
$banks = [ordered]@{}
$textos = [ordered]@{}
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

  # Textos compartilhados por várias questões (clusters). A FGV monta a prova
  # assim: um romance sustenta 6 questões, um artigo sustenta 5. Guardar o
  # texto uma vez e referenciá-lo por textoId evita repetir 3.000 caracteres
  # em cada questão do grupo.
  $nTextos = 0
  if ($json.PSObject.Properties.Name -contains "textos" -and $json.textos) {
    foreach ($t in @($json.textos)) {
      if (-not $t.id) { throw "$($file.Name): texto sem 'id'." }
      if ($textos.Contains($t.id)) { throw "$($file.Name): textoId duplicado '$($t.id)'." }
      $textos[$t.id] = $t
      $nTextos++
    }
  }

  # Os membros de um cluster têm que ser CONTÍGUOS no arquivo. É essa
  # contiguidade que permite a seleção agrupar por corridas em vez de varrer
  # o banco inteiro atrás dos irmãos de cada questão — e é ela que garante
  # que a janela circular nunca corte um cluster ao meio.
  $vistos = @{}
  $anterior = $null
  foreach ($q in @($json.questoes)) {
    $tid = $null
    if ($q.PSObject.Properties.Name -contains "textoId") { $tid = $q.textoId }
    if ($tid) {
      if (-not $textos.Contains($tid)) { throw "$($file.Name): $($q.id) aponta para textoId '$tid' inexistente." }
      if ($tid -ne $anterior -and $vistos.ContainsKey($tid)) {
        throw "$($file.Name): cluster '$tid' não é contíguo (reaparece em $($q.id))."
      }
      $vistos[$tid] = $true
    }
    $anterior = $tid
  }

  $sufixo = if ($nTextos -gt 0) { ", $nTextos textos" } else { "" }
  Write-Output "$($file.Name): $count questões$sufixo (subtopic=`"$($json.subtopic)`")"
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

# Depth 20, não 10: o schema ganhou aninhamento (visual, textos, itens com
# pontosEsperados). Estourar a profundidade no PS 5.1 não dá erro — ele
# serializa o resto como a representação em string do objeto, e o dado vira
# lixo silenciosamente no bundle publicado.
$jsonOut = $banks | ConvertTo-Json -Depth 20
$textosOut = $textos | ConvertTo-Json -Depth 20
$out = "// Gerado automaticamente por build-bundle.ps1 a partir de data/questions/*.json`n" +
       "window.QUESTION_BANKS = $jsonOut;`n" +
       "window.QUESTION_TEXTS = $textosOut;`n"
[System.IO.File]::WriteAllText($outFile, $out, [System.Text.UTF8Encoding]::new($false))

Write-Output ""
Write-Output "OK: $($files.Count) arquivos, $totalQuestions questões, $($textos.Count) textos compartilhados -> $outFile"
