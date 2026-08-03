# Reequilibra a distribuição de letras corretas em um banco de questões, sem
# alterar nenhum conteúdo (enunciado, textos das alternativas, explicação) —
# só remapeia QUAL letra guarda a resposta certa e reembaralha as erradas
# entre as letras restantes, pra o arquivo ficar com ~20% de respostas
# corretas em cada uma das cinco letras.
#
# Uso:
#   .\rebalance-answers.ps1 -Frente geografia
#   .\rebalance-answers.ps1 -Frente geografia -Simular   # só relata, não grava
#
# RODE UMA VEZ POR FRENTE, e só depois que aquela frente estiver 100% em
# cinco alternativas. O script não é idempotente: cada execução parte do
# estado atual e produz um arranjo diferente. Rodar duas vezes não corrompe,
# mas embaralha o gabarito de novo sem necessidade.
#
# --- três defeitos corrigidos nesta versão -------------------------------
#
# 1. A versão anterior tinha $letters = @("a","b","c","d") fixo e um laço
#    que escrevia só 3 distratores. Numa questão a–e isso APAGAVA
#    silenciosamente uma alternativa e devolvia a questão pra 4 — nada
#    quebrava, porque o app renderiza quantas alternativas houver. Rodá-la
#    hoje desfaria as conversões já feitas. Agora as letras saem das chaves
#    reais de cada questão e o laço percorre todos os distratores.
#
# 2. Ela varria os 15 bancos de uma vez, sem parâmetro de frente, o que não
#    cabe no fluxo de lotes. Agora exige -Frente.
#
# 3. Ela reembaralhava também as questões de escada de asserções. Nessas, o
#    jogo de alternativas da FGV é fixo e a ORDEM carrega informação: como a
#    asserção I aparece em quatro das cinco opções, quem conclui que I é
#    falsa chega direto em (c). Embaralhar destrói isso. Agora questões com
#    formato "escada" são puladas.

param(
  [Parameter(Mandatory = $true)][string]$Frente,
  [switch]$Simular
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"
$arquivo = Join-Path $questionsDir "$Frente.json"
if (-not (Test-Path $arquivo)) { throw "Frente '$Frente' não encontrada em data/questions/." }

$rng = [System.Random]::new(20260721)

function Shuffle($arr, $rng) {
  $a = @($arr).Clone()
  for ($i = $a.Count - 1; $i -gt 0; $i--) {
    $j = $rng.Next(0, $i + 1)
    $tmp = $a[$i]; $a[$i] = $a[$j]; $a[$j] = $tmp
  }
  return $a
}

# --- self-test: o defeito 1 tem que ficar impossível de voltar -----------
function Invoke-SelfTest {
  $q = '{"id":"t-01","alternativas":{"a":"A","b":"B","c":"C","d":"D","e":"E"},"resposta":"b"}' | ConvertFrom-Json
  $r = Move-Resposta $q "d" $rng
  $chaves = @($r.PSObject.Properties.Name)
  if ($chaves.Count -ne 5) { throw "self-test: resultado com $($chaves.Count) alternativas, esperava 5" }
  if (($chaves -join ",") -ne "a,b,c,d,e") { throw "self-test: chaves fora de ordem: $($chaves -join ",")" }
  if ($r.d -ne "B") { throw "self-test: a correta não foi parar na letra pedida" }
  $textos = @($r.PSObject.Properties.Value | Sort-Object)
  if (($textos -join "") -ne "ABCDE") { throw "self-test: texto perdido ou duplicado: $($textos -join ",")" }

  $q4 = '{"id":"t-02","alternativas":{"a":"A","b":"B","c":"C","d":"D"},"resposta":"a"}' | ConvertFrom-Json
  $r4 = Move-Resposta $q4 "c" $rng
  if (@($r4.PSObject.Properties.Name).Count -ne 4) { throw "self-test: banco de 4 perdeu alternativa" }
  if ($r4.c -ne "A") { throw "self-test (4 alt): a correta não foi parar na letra pedida" }
}

# Move a resposta correta para $destino e redistribui os distratores pelas
# letras restantes. Preserva o número de alternativas da questão, seja 4 ou 5.
function Move-Resposta($q, $destino, $rng) {
  $letras = @($q.alternativas.PSObject.Properties.Name)
  $textoCorreto = $q.alternativas.$($q.resposta)

  $errados = @()
  foreach ($p in $q.alternativas.PSObject.Properties) {
    if ($p.Name -ne $q.resposta) { $errados += $p.Value }
  }
  $errados = @(Shuffle $errados $rng)

  $restantes = @($letras | Where-Object { $_ -ne $destino })
  if ($errados.Count -ne $restantes.Count) {
    throw "$($q.id): $($errados.Count) distratores para $($restantes.Count) posições."
  }

  $novo = @{}
  $novo[$destino] = $textoCorreto
  for ($k = 0; $k -lt $restantes.Count; $k++) { $novo[$restantes[$k]] = $errados[$k] }

  # reordena as chaves na ordem natural do arquivo
  $ordenado = [ordered]@{}
  foreach ($l in $letras) { $ordenado[$l] = $novo[$l] }
  return [PSCustomObject]$ordenado
}

Invoke-SelfTest

# --- varredura -----------------------------------------------------------

$json = Get-Content -Raw -Encoding UTF8 $arquivo | ConvertFrom-Json
$questoes = @($json.questoes)

# escadas ficam de fora: nelas a letra é determinada pelo conteúdo
$elegiveis = @($questoes | Where-Object { $_.formato -ne "escada" })
$puladas = $questoes.Count - $elegiveis.Count

$quatro = @($elegiveis | Where-Object { @($_.alternativas.PSObject.Properties.Name).Count -ne 5 }).Count
if ($quatro -gt 0) {
  Write-Output "AVISO: $quatro questões elegíveis ainda têm 4 alternativas."
  Write-Output "       O rebalanceamento deve rodar DEPOIS da conversão completa da frente,"
  Write-Output "       senão a distribuição-alvo de 5 letras não se sustenta."
  throw "Frente '$Frente' não está pronta para rebalanceamento."
}

$n = $elegiveis.Count
$letras = @("a", "b", "c", "d", "e")

# sequência-alvo balanceada (a..e repetido, cortado em N, embaralhado)
$target = @()
while ($target.Count -lt $n) { $target += $letras }
$target = @($target[0..($n - 1)])
$target = @(Shuffle $target $rng)

$movidas = 0
$remap = [ordered]@{}
for ($i = 0; $i -lt $n; $i++) {
  $q = $elegiveis[$i]
  $de = $q.resposta
  $para = $target[$i]
  $q.alternativas = Move-Resposta $q $para $rng
  $q.resposta = $para
  if ($de -ne $para) {
    $movidas++
    $remap[$q.id] = [ordered]@{ de = $de; para = $para }
  }
}

$dist = @{}
foreach ($l in $letras) { $dist[$l] = 0 }
foreach ($q in $questoes) { if ($dist.ContainsKey($q.resposta)) { $dist[$q.resposta]++ } }
$distTxt = ($letras | ForEach-Object { "$_=$($dist[$_])" }) -join "  "

if ($Simular) {
  Write-Output "$Frente : $n questões seriam rebalanceadas, $puladas escadas puladas, $movidas mudariam de letra"
  Write-Output "Gabarito final: $distTxt"
  Write-Output "(-Simular: nada foi gravado)"
  return
}

# A gravação vem ANTES de qualquer Write-Output do resumo, de propósito.
# Encanar a saída deste script por `Select-Object -First N` faz o PowerShell
# sinalizar parada ao processo assim que junta N objetos — e o processo morre
# no meio. Com o resumo impresso primeiro, um `-First 2` matava o script
# exatamente entre o cálculo e a escrita: ele anunciava um gabarito
# equilibrado e deixava o arquivo intacto, sem erro visível. Escrevendo
# primeiro, truncar a saída no máximo esconde o relatório.
[System.IO.File]::WriteAllText($arquivo, ($json | ConvertTo-Json -Depth 20), [System.Text.UTF8Encoding]::new($false))

# O acerto não é guardado: o app salva a LETRA marcada (vd_answers) e
# recalcula o acerto na leitura, comparando com q.resposta. Então mover a
# letra reescreve o histórico do usuário em silêncio — uma questão antes
# certa vira erro no Caderno de Erros. Este sidecar é o que permite migrar
# as respostas salvas, se houver progresso a preservar.
if ($movidas -gt 0) {
  $remapDir = Join-Path $root "data\reescritas"
  $remapPath = Join-Path $remapDir "remap-$Frente.json"
  $payload = [ordered]@{
    _comentario = @(
      "Mapa letra-antiga -> letra-nova produzido pelo rebalanceamento de '$Frente'.",
      "Serve para migrar vd_answers/vd_dayAnswers caso haja progresso salvo:",
      "o app guarda a letra marcada e recalcula o acerto na leitura, entao sem",
      "esta migracao as respostas antigas passam a ser comparadas com o gabarito novo."
    )
    frente = $Frente
    questoes = $remap
  }
  [System.IO.File]::WriteAllText($remapPath, ($payload | ConvertTo-Json -Depth 20), [System.Text.UTF8Encoding]::new($false))
  Write-Output "Remap gravado em data/reescritas/remap-$Frente.json"
}

Write-Output "Rode verify-banco.ps1 -Frente $Frente e depois build-bundle.ps1."
