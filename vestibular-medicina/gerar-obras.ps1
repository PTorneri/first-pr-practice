# Gera data/obras.js e data/obras-questoes.js da trilha de Medicina a partir
# dos arquivos da trilha de Direito.
#
# Por que gerar em vez de escrever à mão:
#
# As nove obras da lista da FUVEST 2026 existem nos dois bancos. Em Direito
# elas são repertório complementar (`foraDoEdital2027: true`, porque não estão
# no edital da FGV); em Medicina são a lista obrigatória. O texto de análise,
# resumo e as cinco questões de fixação são os mesmos — e é justamente por
# serem os mesmos que copiá-los à mão seria um erro: no primeiro conserto de
# uma vírgula em Direito, as duas trilhas passariam a divergir em silêncio.
#
# Este script torna a duplicação explícita e refazível. Rode-o de novo sempre
# que mexer numa dessas nove obras do lado de Direito.
#
# A única transformação aplicada é remover a linha `foraDoEdital2027`, que não
# faz sentido aqui: em Medicina não existe "fora do edital", as nove são a
# lista inteira.
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
$IDS = @(
  "obra-opusculo-humanitario",           # 1853 - Nísia Floresta
  "obra-nebulosas",                      # 1872 - Narcisa Amália
  "obra-memorias-de-martha",             # 1899 - Júlia Lopes de Almeida
  "obra-caminho-de-pedras",              # 1937 - Rachel de Queiroz
  "obra-o-cristo-cigano",                # 1961 - Sophia de Mello Breyner Andresen
  "obra-as-meninas",                     # 1973 - Lygia Fagundes Telles
  "obra-balada-de-amor-ao-vento",        # 1990 - Paulina Chiziane
  "obra-cancao-para-ninar-menino-grande", # 2018 - Conceição Evaristo
  "obra-a-visao-das-plantas"             # 2019 - Djaimilia Pereira de Almeida
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

$faltando = @($IDS | Where-Object { -not $blocos.Contains($_) })
if ($faltando.Count -gt 0) {
  throw "não achei em obras.js de Direito: $($faltando -join ', ')"
}

$cabecalho = @"
// GERADO por gerar-obras.ps1 — não edite à mão.
//
// Lista de leitura obrigatória da FUVEST, do anexo "LEITURAS OBRIGATÓRIAS –
// FUVEST 2026" da resolução do vestibular. São nove obras, e as nove são
// cobradas: oito aparecem já na 1ª fase objetiva de 2026, em questões que as
// comparam entre si, e cinco reaparecem nas dez discursivas de Português do
// dia 1 da 2ª fase — dia que vale um terço da nota final, é o primeiro
// critério de desempate e, se zerado, elimina o candidato.
//
// As outras seis bancas de Medicina do estado não publicam lista literária
// para o exame geral. A Unicamp cobra de uma lista própria, visível nos
// cadernos, mas a resolução dela não foi consultada — quando for, as obras
// entram aqui.
//
// O conteúdo de cada obra é o mesmo da trilha de Direito, onde as mesmas nove
// existem como repertório complementar. Para consertar qualquer uma delas,
// edite vestibular-direito/data/obras.js e rode gerar-obras.ps1 de novo.
window.OBRAS = [
"@

$saidaObras = New-Object System.Text.StringBuilder
[void]$saidaObras.AppendLine($cabecalho)
foreach ($id in $IDS) {
  # `foraDoEdital2027` é conceito da FGV: aqui as nove são a lista inteira.
  $corpo = [regex]::Replace($blocos[$id], '(?m)^\s*foraDoEdital2027: true,\r?\n', '')
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
foreach ($id in $IDS) {
  $qs = @($qBanco.$id)
  if ($qs.Count -ne 5) { throw "$id tem $($qs.Count) questões em Direito, esperava 5" }
  $novo[$id] = $qs
}

$saidaQ = "// GERADO por gerar-obras.ps1 — não edite à mão." + [Environment]::NewLine +
          "// 5 questoes de fixacao por obra da lista da FUVEST." + [Environment]::NewLine +
          "window.OBRAS_QUESTOES = " + (($novo | ConvertTo-Json -Depth 10).Trim()) + ";" + [Environment]::NewLine

Write-Output "obras:    $($IDS.Count)"
Write-Output "questoes: $((($IDS | ForEach-Object { @($qBanco.$_).Count }) | Measure-Object -Sum).Sum)"

if ($Simular) {
  Write-Output "(-Simular: nada foi gravado)"
  exit 0
}

$destino = Join-Path $root "data"
[System.IO.File]::WriteAllText((Join-Path $destino "obras.js"), $saidaObras.ToString(), [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $destino "obras-questoes.js"), $saidaQ, [System.Text.UTF8Encoding]::new($false))
Write-Output "gravados data/obras.js e data/obras-questoes.js"
