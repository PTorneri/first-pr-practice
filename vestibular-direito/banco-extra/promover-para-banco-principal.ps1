# Costura banco-extra/promovidas.json dentro de data/questions/.
#
# As 240 questoes promovidas passam a valer como qualquer outra do banco
# principal: entram no cronograma, no simulado, no caderno de erros e no
# progresso. O criterio de selecao esta em gerar-banco-extra.py (bloco
# MAT_PROMOVER) e no README — resumo: sao as tres familias que passam no
# checklist das bancas item a item.
#
# IDEMPOTENTE. Toda questao promovida carrega origem="banco-extra" e todo texto
# criado aqui tem id com prefixo "xtr-". O script apaga os dois antes de
# inserir, entao rodar duas vezes deixa o arquivo igual a rodar uma. Sem isso, a
# segunda rodada duplicaria as 240 e o verify-banco reprovaria por id repetido —
# depois de o build ja ter subido.
#
# Uso:
#   .\promover-para-banco-principal.ps1              # aplica
#   .\promover-para-banco-principal.ps1 -Desfazer    # so remove as promovidas
#
# Depois: .\build-bundle.ps1 e .\verify-banco.ps1 (nesta ordem).

param([switch]$Desfazer)

$ErrorActionPreference = "Stop"
$aqui = $PSScriptRoot
$raiz = Split-Path -Parent $aqui
$questionsDir = Join-Path $raiz "data\questions"

# A fonte declarada dos textos criados aqui. Nao e citacao de veiculo nenhum: as
# passagens sao autorais, e dizer o contrario seria inventar procedencia.
$FONTES = @{
  "interpretacao-texto" = "Texto autoral curto, no formato de frase densa que a FGV usa como base de interpretacao"
  "ingles"              = "Texto autoral curto em ingles, no registro jornalistico/institucional da banca"
}

function Write-Banco {
  param($json, [string]$path)
  # Mesmo par ConvertTo-Json/WriteAllText do apply-rewrites.ps1: e o formato em
  # que os arquivos ja estao, entao o diff mostra so o que mudou.
  $saida = $json | ConvertTo-Json -Depth 10
  [System.IO.File]::WriteAllText($path, $saida, [System.Text.UTF8Encoding]::new($false))
}

# Maior sufixo numerico ja usado no arquivo. matematica-rlm tem buracos e chega
# a -161 com 150 questoes: contar as questoes daria id repetido.
function Get-ProximoId {
  param($questoes, [string]$frente)
  $max = 0
  foreach ($q in $questoes) {
    if ($q.id -match "^$([regex]::Escape($frente))-(\d+)$") {
      $n = [int]$Matches[1]
      if ($n -gt $max) { $max = $n }
    }
  }
  return $max + 1
}

$promovidasPath = Join-Path $aqui "promovidas.json"
if (-not (Test-Path $promovidasPath)) {
  throw "nao achei promovidas.json — rode antes: python gerar-banco-extra.py"
}
$promovidas = Get-Content -Raw -Encoding UTF8 $promovidasPath | ConvertFrom-Json

$frentes = @($promovidas.PSObject.Properties.Name)
if ($Desfazer) { $frentes = @("interpretacao-texto", "ingles", "matematica-rlm") }

$resumo = @()
foreach ($frente in $frentes) {
  $path = Join-Path $questionsDir "$frente.json"
  if (-not (Test-Path $path)) { throw "nao achei data/questions/$frente.json" }
  $json = Get-Content -Raw -Encoding UTF8 $path | ConvertFrom-Json

  $antes = @($json.questoes).Count

  # --- limpeza (e o que torna o script idempotente)
  $json.questoes = @(@($json.questoes) | Where-Object { $_.origem -ne "banco-extra" })
  if ($json.PSObject.Properties.Name -contains "textos" -and $json.textos) {
    $restantes = @(@($json.textos) | Where-Object { $_.id -notlike "xtr-*" })
    if ($restantes.Count -gt 0) { $json.textos = $restantes }
    else { $json.PSObject.Properties.Remove("textos") }
  }
  $limpo = @($json.questoes).Count

  if ($Desfazer) {
    Write-Banco $json $path
    $resumo += [pscustomobject]@{ Frente = $frente; Antes = $antes; Depois = $limpo }
    continue
  }

  $novas = @($promovidas.$frente)
  $proximo = Get-ProximoId $json.questoes $frente

  # --- textos compartilhados
  #
  # As questoes de uma mesma passagem viram um CLUSTER (textos[] + textoId), e
  # nao tres copias do mesmo texto_apoio. E como o ingles.json ja guarda os 50
  # textos dele, e e o formato que as duas bancas usam de fato: a FGV pendura
  # varias questoes num texto so. O schedule.js agrupa por cluster ao montar o
  # dia (snapOffsetToGroup), entao as tres caem juntas na mesma sessao.
  $textosNovos = @()
  $mapaTexto = @{}
  $iTexto = 0
  foreach ($n in $novas) {
    $ta = $n.texto_apoio
    if (-not $ta) { continue }
    if (-not $mapaTexto.ContainsKey($ta)) {
      $iTexto++
      $tid = "xtr-{0}-t{1:d2}" -f $frente.Substring(0, [Math]::Min(3, $frente.Length)), $iTexto
      $mapaTexto[$ta] = $tid
      $textosNovos += [ordered]@{ id = $tid; fonte = $FONTES[$frente]; conteudo = $ta }
    }
  }

  # --- questoes, na ordem em que vieram (membros do cluster ficam contiguos,
  #     que e o que o verify-banco.ps1 exige e o que a selecao do dia assume)
  $questoesNovas = @()
  foreach ($n in $novas) {
    $item = [ordered]@{ id = "$frente-$proximo" }
    $proximo++
    if ($n.texto_apoio) { $item["textoId"] = $mapaTexto[$n.texto_apoio] }
    $item["formato"] = $n.formato
    if ($n.tipoItem) { $item["tipoItem"] = $n.tipoItem }
    if ($n.dificuldade) { $item["dificuldade"] = $n.dificuldade }
    $item["enunciado"] = $n.enunciado
    $alts = [ordered]@{}
    foreach ($l in @("a", "b", "c", "d", "e")) { $alts[$l] = $n.alternativas.$l }
    $item["alternativas"] = $alts
    $item["resposta"] = $n.resposta
    $item["explicacao"] = $n.explicacao
    $item["origem"] = "banco-extra"
    $questoesNovas += [pscustomobject]$item
  }

  if ($textosNovos.Count -gt 0) {
    $jaTem = ($json.PSObject.Properties.Name -contains "textos") -and $json.textos
    $todos = @()
    if ($jaTem) { $todos += @($json.textos) }
    $todos += @($textosNovos | ForEach-Object { [pscustomobject]$_ })
    if ($jaTem) { $json.textos = $todos }
    else { $json | Add-Member -NotePropertyName textos -NotePropertyValue $todos }
  }
  $json.questoes = @(@($json.questoes) + $questoesNovas)

  Write-Banco $json $path
  $resumo += [pscustomobject]@{
    Frente = $frente; Antes = $antes; Novas = $questoesNovas.Count
    Textos = $textosNovos.Count; Depois = @($json.questoes).Count
  }
}

Write-Output ""
$resumo | Format-Table -AutoSize
Write-Output "Agora rode:  .\build-bundle.ps1   e depois  .\verify-banco.ps1"
