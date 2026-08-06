# Gera data/obras.js e data/obras-questoes.js da trilha de Medicina a partir
# dos arquivos da trilha de Direito.
#
# Por que gerar em vez de escrever à mão:
#
# As duas trilhas compartilham o mesmo acervo de obras. O que muda entre elas é
# qual recorte é OBRIGATÓRIO e qual é repertório complementar:
#
#   Direito  -> obrigatórias: as 46 do edital da FGV (prova de Artes)
#               complementares: as 17 restantes, incluindo as 7 da FUVEST
#   Medicina -> obrigatórias: as 9 da lista de leitura da FUVEST
#               complementares: as 54 restantes, vindas do acervo da FGV
#
# O texto de análise, o resumo e as cinco questões de fixação são os mesmos nos
# dois lados — e é justamente por serem os mesmos que copiá-los à mão seria um
# erro: no primeiro conserto de uma vírgula em Direito, as duas trilhas
# passariam a divergir em silêncio.
#
# Este script torna a duplicação explícita e refazível. Rode-o de novo sempre
# que mexer em qualquer obra do lado de Direito.
#
# Duas transformações são aplicadas ao copiar:
#
#   1. `foraDoEdital2027` sai de todas. É um conceito da FGV ("caiu de um ciclo
#      anterior do edital dela") e não diz nada sobre a FUVEST.
#   2. `complementar: true` entra nas que não são da lista da FUVEST. É o campo
#      neutro de trilha que o app usa para separar as duas listas na aba.
#
# Uso:
#   .\gerar-obras.ps1            # grava
#   .\gerar-obras.ps1 -Simular   # só relata

param([switch]$Simular)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$origemDir = Join-Path (Split-Path -Parent $root) "vestibular-direito\data"

# A lista da FUVEST 2026, do anexo "LEITURAS OBRIGATÓRIAS" da resolução.
# A ordem é a do anexo: cronológica por ano de publicação.
$OBRIGATORIAS = @(
  "obra-opusculo-humanitario",            # 1853 - Nísia Floresta
  "obra-nebulosas",                       # 1872 - Narcisa Amália
  "obra-memorias-de-martha",              # 1899 - Júlia Lopes de Almeida
  "obra-caminho-de-pedras",               # 1937 - Rachel de Queiroz
  "obra-o-cristo-cigano",                 # 1961 - Sophia de Mello Breyner Andresen
  "obra-as-meninas",                      # 1973 - Lygia Fagundes Telles
  "obra-balada-de-amor-ao-vento",         # 1990 - Paulina Chiziane
  "obra-cancao-para-ninar-menino-grande",  # 2018 - Conceição Evaristo
  "obra-a-visao-das-plantas"              # 2019 - Djaimilia Pereira de Almeida
)

# ---------- obras.js ----------
#
# obras.js é objeto JS com chaves sem aspas, então ConvertFrom-Json não serve.
# A extração é por bloco de texto: cada entrada começa numa linha com exatamente
# dois espaços e uma chave, e termina na primeira linha "  }," seguinte. Copiar
# o bloco verbatim é o que garante que o texto das duas trilhas seja idêntico.
$obrasSrc = [System.IO.File]::ReadAllText((Join-Path $origemDir "obras.js"), [System.Text.UTF8Encoding]::new($false))

$blocos = [ordered]@{}
foreach ($m in [regex]::Matches($obrasSrc, '(?ms)^  \{\r?\n(.*?)^  \},')) {
  $corpo = $m.Groups[1].Value
  $id = [regex]::Match($corpo, 'id: "([^"]+)"').Groups[1].Value
  if ($id) { $blocos[$id] = $corpo }
}

$faltando = @($OBRIGATORIAS | Where-Object { -not $blocos.Contains($_) })
if ($faltando.Count -gt 0) {
  throw "não achei em obras.js de Direito: $($faltando -join ', ')"
}

# Ordem de saída: as obrigatórias primeiro, na ordem do anexo da FUVEST, e
# depois as complementares na ordem em que aparecem no arquivo de Direito.
$ordem = @($OBRIGATORIAS) + @($blocos.Keys | Where-Object { $OBRIGATORIAS -notcontains $_ })

$cabecalho = @"
// GERADO por gerar-obras.ps1 — não edite à mão.
//
// Duas listas, e a diferença entre elas importa.
//
// OBRIGATÓRIAS são as nove do anexo "LEITURAS OBRIGATÓRIAS – FUVEST 2026" da
// resolução do vestibular. As nove são cobradas: oito aparecem já na 1ª fase
// objetiva de 2026, em questões que as comparam entre si, e cinco reaparecem
// nas dez discursivas de Português do dia 1 da 2ª fase — dia que vale um terço
// da nota final, é o primeiro critério de desempate e, se zerado, elimina o
// candidato. As outras seis bancas de Medicina do estado não publicam lista
// literária para o exame geral.
//
// COMPLEMENTARES (`complementar: true`) são o acervo da trilha de Direito, que
// vem do edital de Artes da FGV. Nenhuma delas é cobrada por banca de Medicina
// e o app as exibe em lista separada, sob aviso. Estão aqui porque as bancas
// de Medicina usam arte, cinema e música como FONTE de questão mesmo sem
// publicar lista: a FUVEST 2026 abre um bloco com Cézanne e obras de acervo do
// MASP e da Fundação Itaú, a Unesp parte de um ensaio de Jorge Coli sobre
// Courbet e de capa de álbum, e a Unicamp usa cinema brasileiro contemporâneo.
// Como repertório de redação e de leitura de imagem, servem.
//
// Para consertar qualquer obra, edite vestibular-direito/data/obras.js e rode
// gerar-obras.ps1 de novo.
window.OBRAS = [
"@

$saidaObras = New-Object System.Text.StringBuilder
[void]$saidaObras.AppendLine($cabecalho)
$nObrig = 0; $nCompl = 0
foreach ($id in $ordem) {
  # `foraDoEdital2027` é conceito da FGV e não se traduz para cá.
  $corpo = [regex]::Replace($blocos[$id], '(?m)^\s*foraDoEdital2027: true,\r?\n', '')
  if ($OBRIGATORIAS -notcontains $id) {
    # Entra logo depois da linha do id, para ficar visível na leitura do bloco.
    $corpo = [regex]::Replace($corpo, '(?m)^(\s*)(id: "[^"]+",\r?\n)', "`$1`$2`$1complementar: true,`r`n", 1)
    $nCompl++
  } else {
    $nObrig++
  }
  [void]$saidaObras.AppendLine("  {")
  [void]$saidaObras.Append($corpo)
  [void]$saidaObras.AppendLine("  },")
}
[void]$saidaObras.AppendLine("];")

# ---------- obras-questoes.js ----------
$qPath = Join-Path $origemDir "obras-questoes.js"
$qRaw = [System.IO.File]::ReadAllText($qPath, [System.Text.UTF8Encoding]::new($false))
$qCorpo = [regex]::Replace([regex]::Replace($qRaw, '(?s)^.*?window\.OBRAS_QUESTOES\s*=\s*', ''), '(?s);\s*$', '')
$qBanco = $qCorpo | ConvertFrom-Json

$novo = [ordered]@{}
$totalQ = 0
foreach ($id in $ordem) {
  $qs = @($qBanco.$id)
  if ($qs.Count -ne 5) { throw "$id tem $($qs.Count) questões em Direito, esperava 5" }
  $novo[$id] = $qs
  $totalQ += $qs.Count
}

$saidaQ = "// GERADO por gerar-obras.ps1 — não edite à mão." + [Environment]::NewLine +
          "// 5 questoes de fixacao por obra." + [Environment]::NewLine +
          "window.OBRAS_QUESTOES = " + (($novo | ConvertTo-Json -Depth 10).Trim()) + ";" + [Environment]::NewLine

Write-Output "obrigatorias (FUVEST): $nObrig"
Write-Output "complementares (FGV):  $nCompl"
Write-Output "questoes:              $totalQ"

if ($Simular) {
  Write-Output "(-Simular: nada foi gravado)"
  exit 0
}

$destino = Join-Path $root "data"
[System.IO.File]::WriteAllText((Join-Path $destino "obras.js"), $saidaObras.ToString(), [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $destino "obras-questoes.js"), $saidaQ, [System.Text.UTF8Encoding]::new($false))
Write-Output "gravados data/obras.js e data/obras-questoes.js"
