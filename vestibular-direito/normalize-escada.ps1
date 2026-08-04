# Normaliza as questões de escada de asserções (formato "escada") para o jogo
# de alternativas da FGV, na ordem fixa da banca, e distribui as combinações
# corretas entre as opções disponíveis.
#
# Uso:
#   .\normalize-escada.ps1 -Simular
#   .\normalize-escada.ps1
#   .\normalize-escada.ps1 -Frente geografia
#
# --- por que este script existe ------------------------------------------
#
# Dois defeitos somados tornavam o formato inútil para treino.
#
# O primeiro é o jogo de alternativas: as 108 questões usavam 85 ordenações
# diferentes e ofereciam opções como "III, apenas", que a FGV nunca apresenta.
# Na banca real o conjunto é sempre este, nesta ordem:
#
#   (a) I, apenas   (b) I e II, apenas   (c) II e III, apenas
#   (d) I e III, apenas                  (e) I, II e III
#
# A ordem carrega informação: a asserção I aparece em quatro das cinco opções,
# então quem conclui que I é falsa chega direto em (c) sem julgar II nem III.
# Embaralhado, esse atalho não existe.
#
# O segundo defeito é pior e só aparece ao medir o banco inteiro: em 102 das
# 108 questões a resposta correta era "I e II". Quem escreveu os itens sempre
# pôs a asserção falsa em terceiro lugar. Um candidato que percebesse isso
# acertaria 94% das escadas sem ler nenhuma delas.
#
# --- como corrige ---------------------------------------------------------
#
# Permutando as asserções dentro do enunciado. O conteúdo dos três itens é
# preservado integralmente; só muda a posição — e, com ela, qual combinação
# passa a ser a correta. Nenhuma afirmação é reescrita aqui.
#
# O que a permutação NÃO resolve: o número de asserções verdadeiras de cada
# questão é fixo. Com duas verdadeiras só se alcança (b), (c) ou (d); (a) exige
# uma só verdadeira e (e) exige as três. Equilibrar essas duas pontas depende
# de reescrever asserções, que é trabalho de autoria e corre em lote à parte.

param(
  [string]$Frente = "",
  [switch]$Simular
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"

$ESCADA_FGV = [ordered]@{
  a = "I, apenas"
  b = "I e II, apenas"
  c = "II e III, apenas"
  d = "I e III, apenas"
  e = "I, II e III"
}
# conjunto correto -> letra, na convenção da banca
$SUBSET_LETRA = @{
  "I"       = "a"
  "I,II"    = "b"
  "II,III"  = "c"
  "I,III"   = "d"
  "I,II,III" = "e"
}

$ENCHIMENTO = @(
  "APENAS", "UNICAMENTE", "EXCLUSIVAMENTE", "SOMENTE", "AS", "A", "OS", "O",
  "AFIRMATIVAS", "AFIRMATIVA", "ITENS", "ITEM", "ESTAO", "ESTÃO", "ESTA", "ESTÁ",
  "CORRETAS", "CORRETA", "CORRETOS", "CORRETO", "SEM", "EXCECAO", "EXCEÇÃO", "E",
  "SAO", "SÃO", "TODAS", "NENHUMA"
)

# Extrai o conjunto de asserções citado por uma alternativa, seja qual for a
# redação. "Apenas as afirmativas I e III estão corretas" e "I e III, apenas"
# devolvem o mesmo conjunto.
function Get-Subconjunto {
  param([string]$texto)
  if (-not $texto) { return $null }
  $t = $texto.ToUpper() -replace "[.,;:()]", " "
  $palavras = @($t -split "\s+" | Where-Object { $_ -ne "" -and $ENCHIMENTO -notcontains $_ })
  if ($palavras.Count -eq 0) { return $null }
  foreach ($p in $palavras) { if ($p -notmatch "^I{1,3}$") { return $null } }
  $ordem = @("I", "II", "III")
  $sel = @($ordem | Where-Object { $palavras -contains $_ })
  return ($sel -join ",")
}

# Renumera os algarismos romanos de um texto conforme o mapa de permutação.
# Passa por marcadores intermediários porque substituir direto trocaria o "I"
# de dentro de "III" — o erro clássico deste tipo de troca.
function Update-Romanos {
  param([string]$texto, [hashtable]$mapa)
  if (-not $texto) { return $texto }
  $t = $texto
  $t = [regex]::Replace($t, "\bIII\b", "{{3}}")
  $t = [regex]::Replace($t, "\bII\b", "{{2}}")
  $t = [regex]::Replace($t, "\bI\b", "{{1}}")
  $num = @{ "I" = 1; "II" = 2; "III" = 3 }
  foreach ($de in @("I", "II", "III")) {
    $t = $t.Replace("{{$($num[$de])}}", $mapa[$de])
  }
  return $t
}

# ---------------------------------------------------------------- self-test

function Invoke-SelfTest {
  if ((Get-Subconjunto "I e II, apenas") -ne "I,II") { throw "self-test: subconjunto simples" }
  if ((Get-Subconjunto "Apenas as afirmativas I e III estão corretas") -ne "I,III") { throw "self-test: subconjunto verboso" }
  if ((Get-Subconjunto "I, II e III, sem exceção") -ne "I,II,III") { throw "self-test: subconjunto total" }
  if ($null -ne (Get-Subconjunto "O êxodo rural impulsionado pela mecanização")) { throw "self-test: texto comum virou subconjunto" }

  # a troca tem de sobreviver ao caso em que I vira III e III vira I
  $mapa = @{ "I" = "III"; "II" = "II"; "III" = "I" }
  $r = Update-Romanos "As afirmativas I e II estão corretas; a III é falsa." $mapa
  if ($r -ne "As afirmativas III e II estão corretas; a I é falsa.") { throw "self-test: renumeração falhou -> $r" }
  $r2 = Update-Romanos "Somente I." @{ "I" = "II"; "II" = "III"; "III" = "I" }
  if ($r2 -ne "Somente II.") { throw "self-test: renumeração simples falhou -> $r2" }
}

Invoke-SelfTest

# ---------------------------------------------------------------- varredura

$files = Get-ChildItem -Path $questionsDir -Filter "*.json" | Sort-Object Name
if ($Frente) {
  $files = $files | Where-Object { $_.BaseName -eq $Frente }
  if (-not $files) { throw "Frente '$Frente' não encontrada." }
}

# Alvos para questões com DUAS asserções verdadeiras, alternados para não
# repetir a mesma combinação em série. Um contador global mantém o
# rodízio entre frentes, senão cada arquivo recomeçaria no mesmo ponto.
$alvos2 = @("I,II", "II,III", "I,III")
$contador = 0
$dist = @{}
$avisos = @()
$total = 0

foreach ($file in $files) {
  $json = Get-Content -Raw -Encoding UTF8 $file.FullName | ConvertFrom-Json
  $mudou = 0

  foreach ($q in @($json.questoes)) {
    if ($q.formato -ne "escada") { continue }
    $total++

    $corretoAtual = Get-Subconjunto $q.alternativas.$($q.resposta)
    if (-not $corretoAtual) {
      $avisos += "$($q.id): não consegui ler o conjunto correto da alternativa '$($q.resposta)'"
      continue
    }
    $verdadeiras = @($corretoAtual -split ",")
    $falsas = @(@("I", "II", "III") | Where-Object { $verdadeiras -notcontains $_ })

    # alvo conforme quantas asserções são verdadeiras
    if ($verdadeiras.Count -eq 1) { $alvo = "I" }
    elseif ($verdadeiras.Count -eq 3) { $alvo = "I,II,III" }
    else { $alvo = $alvos2[$contador % 3]; $contador++ }

    $posVerdadeiras = @($alvo -split ",")
    $posFalsas = @(@("I", "II", "III") | Where-Object { $posVerdadeiras -notcontains $_ })

    # mapa: posição atual -> posição nova, preservando a ordem relativa
    $mapa = @{}
    for ($i = 0; $i -lt $verdadeiras.Count; $i++) { $mapa[$verdadeiras[$i]] = $posVerdadeiras[$i] }
    for ($i = 0; $i -lt $falsas.Count; $i++) { $mapa[$falsas[$i]] = $posFalsas[$i] }

    # O banco tem DOIS formatos de enunciado para o mesmo tipo de questão:
    # um com cada asserção em sua própria linha e outro com as três correndo
    # dentro de um único parágrafo. O parser tenta o primeiro e, não achando
    # as três, cai para o segundo — em vez de desistir da questão.
    $linhas = $q.enunciado -split "`n"
    $textoDe = @{}
    $idxDe = @{}
    for ($i = 0; $i -lt $linhas.Count; $i++) {
      $m = [regex]::Match($linhas[$i], "^\s*(III|II|I)\.\s*(.+)$")
      if ($m.Success) { $textoDe[$m.Groups[1].Value] = $m.Groups[2].Value; $idxDe[$m.Groups[1].Value] = $i }
    }

    $modo = "linhas"
    $pre = ""; $pos = ""
    if ($textoDe.Count -ne 3) {
      $rx = "(?s)^(?<pre>.*?)\bI\.\s+(?<a1>.*?)\s+\bII\.\s+(?<a2>.*?)\s+\bIII\.\s+(?<a3>.*?)(?<pos>\s*(Está correto|É correto|Assinale)[^\r\n]*)$"
      $mi = [regex]::Match($q.enunciado, $rx)
      if (-not $mi.Success) {
        $avisos += "$($q.id): não consegui separar as três asserções do enunciado"
        continue
      }
      $modo = "inline"
      $pre = $mi.Groups["pre"].Value
      $pos = $mi.Groups["pos"].Value
      $textoDe = @{ "I" = $mi.Groups["a1"].Value; "II" = $mi.Groups["a2"].Value; "III" = $mi.Groups["a3"].Value }
    }

    $novoTextoDe = @{}
    foreach ($de in @("I", "II", "III")) { $novoTextoDe[$mapa[$de]] = $textoDe[$de] }
    $rotulos = @("I", "II", "III")

    if ($modo -eq "linhas") {
      $ordemIdx = @($idxDe["I"], $idxDe["II"], $idxDe["III"]) | Sort-Object
      for ($i = 0; $i -lt 3; $i++) {
        $linhas[$ordemIdx[$i]] = "$($rotulos[$i]). $($novoTextoDe[$rotulos[$i]])"
      }
    } else {
      $corpo = ($rotulos | ForEach-Object { "$_. $($novoTextoDe[$_])" }) -join " "
      $linhas = @($pre + $corpo + $pos)
    }

    $novaResposta = $SUBSET_LETRA[$alvo]
    if (-not $novaResposta) { $avisos += "$($q.id): alvo '$alvo' sem letra correspondente"; continue }

    if (-not $Simular) {
      $q.enunciado = ($linhas -join "`n")
      $alt = [ordered]@{}
      foreach ($l in @("a", "b", "c", "d", "e")) { $alt[$l] = $ESCADA_FGV[$l] }
      $q.alternativas = [PSCustomObject]$alt
      $q.resposta = $novaResposta
      $q.explicacao = Update-Romanos $q.explicacao $mapa
    }

    if (-not $dist.ContainsKey($novaResposta)) { $dist[$novaResposta] = 0 }
    $dist[$novaResposta]++
    $mudou++
  }

  if (-not $Simular -and $mudou -gt 0) {
    [System.IO.File]::WriteAllText($file.FullName, ($json | ConvertTo-Json -Depth 20), [System.Text.UTF8Encoding]::new($false))
  }
  if ($mudou -gt 0) { Write-Output "$($json.subtopic): $mudou escadas normalizadas" }
}

Write-Output ""
Write-Output "TOTAL: $total escadas"
Write-Output ("Gabarito resultante: " + ((@("a", "b", "c", "d", "e") | ForEach-Object { "$_=$(if($dist.ContainsKey($_)){$dist[$_]}else{0})" }) -join "  "))

if ($avisos.Count -gt 0) {
  Write-Output ""
  Write-Output "--- AVISOS ($($avisos.Count)) ---"
  $avisos | ForEach-Object { Write-Output "  ~ $_" }
}

if ($Simular) {
  Write-Output ""
  Write-Output "(-Simular: nada foi gravado)"
} else {
  Write-Output ""
  Write-Output "Rode verify-banco.ps1 -EscadaEstrita e depois build-bundle.ps1."
}
