# Acrescenta uma 5a alternativa (A-E) às questões de afirmativas numeradas
# I/II/III, nos bancos em que o estudo das bancas pede 5 alternativas.
#
# Por que só nessas: com 3 afirmativas existem exatamente 7 combinações
# possíveis, e cada questão usa 4 — sempre sobram 3 que são comprovadamente
# erradas, porque a combinação correta é uma só e já está entre as 4. Não há
# nada a inventar, e por isso a transformação é segura de automatizar. Nas
# demais questões, a 5a alternativa é conteúdo novo e precisa ser escrita.
#
# Duas armadilhas tratadas aqui:
#
# 1. Estilo. O banco usa quatro convenções diferentes para dizer a mesma coisa
#    ("I e II, apenas", "Apenas as afirmativas I e II estão corretas",
#    "I e II estão corretas", "Exclusivamente a I"). Uma alternativa nova em
#    estilo diferente das outras quatro seria eliminável só pela aparência.
#    Por isso a nova é gerada por ANALOGIA: pega-se uma alternativa existente
#    com o mesmo número de afirmativas e trocam-se apenas os numerais.
#
# 2. Posição da resposta. Se a nova entrasse sempre em "E", a letra E nunca
#    seria a correta — um viés novo, tão explorável quanto o de comprimento.
#    Por isso as cinco alternativas são redistribuídas, com a correta rodando
#    entre A e E.

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"
$bancos = @("geografia", "historia-brasil", "historia-geral", "atualidades-geopolitica")

# ---------- Combinações ----------

function Get-Conjunto {
  param([string]$Texto)
  $ms = [regex]::Matches($Texto, "\bI{1,3}\b")
  $s = @()
  foreach ($m in $ms) { $s += $m.Value.Length }
  return ($s | Sort-Object -Unique)
}

function ConjuntoParaChave { param($C) return ($C -join ",") }

$TODAS = @(@(1), @(2), @(3), @(1, 2), @(1, 3), @(2, 3), @(1, 2, 3))

# Gera o texto da combinação alvo por analogia a um modelo de mesmo tamanho.
function Novo-Texto {
  param([string]$Modelo, $Alvo)
  $ms = [regex]::Matches($Modelo, "\bI{1,3}\b")
  if ($ms.Count -ne $Alvo.Count) { return $null }
  $romanos = @{ 1 = "I"; 2 = "II"; 3 = "III" }
  $txt = $Modelo
  # substitui de trás para frente, senão as posições se deslocam
  for ($i = $ms.Count - 1; $i -ge 0; $i--) {
    $m = $ms[$i]
    $txt = $txt.Substring(0, $m.Index) + $romanos[$Alvo[$i]] + $txt.Substring($m.Index + $m.Length)
  }
  return $txt
}

# ---------- Autoteste: não mexe em nada se a lógica falhar ----------
$casos = @(
  @{ modelo = "Apenas as afirmativas I e II estão corretas"; alvo = @(1, 3); esperado = "Apenas as afirmativas I e III estão corretas" }
  @{ modelo = "II e III, apenas"; alvo = @(1, 2); esperado = "I e II, apenas" }
  @{ modelo = "Apenas a afirmativa III está correta"; alvo = @(2); esperado = "Apenas a afirmativa II está correta" }
  @{ modelo = "I, II e III"; alvo = @(1, 2, 3); esperado = "I, II e III" }
)
foreach ($c in $casos) {
  $obtido = Novo-Texto -Modelo $c.modelo -Alvo $c.alvo
  if ($obtido -ne $c.esperado) { throw "Autoteste falhou: '$($c.modelo)' -> '$obtido', esperado '$($c.esperado)'" }
}
if ((ConjuntoParaChave (Get-Conjunto "I e III, apenas")) -ne "1,3") { throw "Autoteste de leitura de conjunto falhou." }
if ((ConjuntoParaChave (Get-Conjunto "I, II e III")) -ne "1,2,3") { throw "Autoteste de leitura de conjunto falhou (trio)." }
Write-Output "Autoteste OK."
Write-Output ""

# ---------- Aplicação ----------

$letras = @("a", "b", "c", "d", "e")
$contadorCorreta = 0
$auditoria = @()
$totalTocadas = 0

foreach ($banco in $bancos) {
  $arquivo = Join-Path $questionsDir "$banco.json"
  $json = Get-Content -Raw -Encoding UTF8 $arquivo | ConvertFrom-Json
  $mudou = $false

  foreach ($q in @($json.questoes)) {
    $contexto = "$($q.enunciado) $($q.texto_apoio)"
    if ($contexto -notmatch "\bII\." -or $contexto -notmatch "\bIII\.") { continue }
    if (@($q.alternativas.PSObject.Properties.Name).Count -ne 4) { continue }

    # conjuntos já presentes e o conjunto correto
    $presentes = @{}
    foreach ($prop in $q.alternativas.PSObject.Properties) {
      $presentes[(ConjuntoParaChave (Get-Conjunto $prop.Value))] = $prop.Value
    }
    $chaveCorreta = ConjuntoParaChave (Get-Conjunto $q.alternativas.$($q.resposta))
    $textoCorreto = $q.alternativas.$($q.resposta)

    # candidatas: combinações válidas ainda não usadas (todas são erradas,
    # porque a correta já está entre as quatro presentes)
    $candidatas = @()
    foreach ($c in $TODAS) {
      $k = ConjuntoParaChave $c
      if (-not $presentes.ContainsKey($k)) { $candidatas += , $c }
    }
    if ($candidatas.Count -eq 0) { continue }

    # prefere a candidata que difere da correta por um único elemento
    $corretaSet = Get-Conjunto $textoCorreto
    $melhor = $null; $melhorDist = 99
    foreach ($c in $candidatas) {
      $dif = (@($c | Where-Object { $corretaSet -notcontains $_ }).Count) + (@($corretaSet | Where-Object { $c -notcontains $_ }).Count)
      if ($dif -lt $melhorDist) { $melhorDist = $dif; $melhor = $c }
    }

    # texto no MESMO estilo: modelo com o mesmo número de afirmativas
    $modelo = $null
    foreach ($prop in $q.alternativas.PSObject.Properties) {
      if ((Get-Conjunto $prop.Value).Count -eq $melhor.Count) { $modelo = $prop.Value; break }
    }
    # Sem modelo do mesmo tamanho dentro da questão. Só há um caso em que dá
    # pra prosseguir sem inventar estilo: quando TODAS as alternativas seguem
    # o padrão conciso ("I e II, apenas" / "I, II e III"), cuja forma singular
    # ("III, apenas") já é usada em outras questões do banco. Fora disso,
    # pula — melhor uma questão com 4 alternativas do que uma com a quinta
    # visivelmente diferente das outras.
    if (-not $modelo -and $melhor.Count -eq 1) {
      $conciso = $true
      foreach ($prop in $q.alternativas.PSObject.Properties) {
        if ($prop.Value -notmatch "^(I{1,3}( e I{1,3})?, apenas|I, II e III)$") { $conciso = $false; break }
      }
      if ($conciso) {
        $romanos = @{ 1 = "I"; 2 = "II"; 3 = "III" }
        $modelo = "$($romanos[$melhor[0]]), apenas"
      }
    }
    if (-not $modelo) { continue }  # sem modelo compatível, não arrisca o estilo
    $novoTexto = Novo-Texto -Modelo $modelo -Alvo $melhor
    if (-not $novoTexto -or $presentes.ContainsValue($novoTexto)) { continue }

    # redistribui as cinco, com a correta rodando entre A e E
    $outros = @()
    foreach ($prop in $q.alternativas.PSObject.Properties) {
      if ($prop.Value -ne $textoCorreto) { $outros += $prop.Value }
    }
    $outros += $novoTexto
    $posCorreta = $contadorCorreta % 5
    $contadorCorreta++

    $nova = [ordered]@{}
    $iOutro = 0
    for ($i = 0; $i -lt 5; $i++) {
      if ($i -eq $posCorreta) { $nova[$letras[$i]] = $textoCorreto }
      else { $nova[$letras[$i]] = $outros[$iOutro]; $iOutro++ }
    }

    $q.alternativas = [PSCustomObject]$nova
    $q.resposta = $letras[$posCorreta]
    $mudou = $true
    $totalTocadas++
    $auditoria += [PSCustomObject]@{
      id = $q.id; nova = $novoTexto; resposta = $q.resposta; correta = $textoCorreto
    }
  }

  if ($mudou) {
    [System.IO.File]::WriteAllText($arquivo, ($json | ConvertTo-Json -Depth 10), [System.Text.UTF8Encoding]::new($false))
    Write-Output "$banco.json atualizado"
  }
}

$destino = Join-Path $root "data\reescritas\auditoria-cinco-alternativas.json"
[System.IO.File]::WriteAllText($destino, ($auditoria | ConvertTo-Json -Depth 5), [System.Text.UTF8Encoding]::new($false))

Write-Output ""
Write-Output "OK: $totalTocadas questões passaram a ter 5 alternativas."
Write-Output "Auditoria completa em data/reescritas/auditoria-cinco-alternativas.json"
Write-Output "Rode build-bundle.ps1 em seguida."
