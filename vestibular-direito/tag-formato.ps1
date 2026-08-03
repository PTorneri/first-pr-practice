# Preenche o campo "formato" nas questões dos bancos, classificando cada uma
# pelo FORMATO DE ITEM que ela usa — não pelo assunto.
#
#   direta   uma pergunta, cinco alternativas independentes
#   escada   asserções I/II/III + "Está correto o que se afirma em"
#   vf       sequência de verdadeiro/falso
#   excecao  "à exceção de uma", "assinale a incorreta"
#   lacunas  duas lacunas preenchidas por um par ordenado
#
# Serve a dois propósitos concretos, além do relatório: é o SELETOR das
# questões que o rebalanceamento tem que pular (na escada a ordem das
# alternativas carrega informação) e é o filtro para treinar um formato
# específico, que é o que separa as duas bancas — a FGV usa escada em um
# terço do bloco de Humanas e a Insper não usou nenhuma nos 120 itens lidos,
# preferindo o item de duas lacunas.
#
# Uso:
#   .\tag-formato.ps1 -Simular     # só relata a classificação
#   .\tag-formato.ps1              # grava o campo

param(
  [string]$Frente = "",
  [switch]$Simular
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"

# Palavras que só embrulham a referência às asserções. Tirando elas, uma
# alternativa de escada não sobra nada além de algarismos romanos — e é isso
# que distingue "I e II, apenas" de uma alternativa de conteúdo qualquer.
$ENCHIMENTO = @(
  "APENAS", "UNICAMENTE", "EXCLUSIVAMENTE", "SOMENTE", "AS", "A", "OS", "O",
  "AFIRMATIVAS", "AFIRMATIVA", "ITENS", "ITEM", "ASSERCOES", "ASSERÇÕES",
  "ESTAO", "ESTÃO", "ESTA", "ESTÁ", "CORRETAS", "CORRETA", "CORRETOS", "CORRETO",
  "SEM", "EXCECAO", "EXCEÇÃO", "E", "SAO", "SÃO", "TODAS", "NENHUMA"
)

function Test-AlternativaEscada($texto) {
  if (-not $texto) { return $false }
  $t = $texto.ToUpper()
  $t = $t -replace "[.,;:()]", " "
  $palavras = @($t -split "\s+" | Where-Object { $_ -ne "" })
  if ($palavras.Count -eq 0) { return $false }
  $restantes = @($palavras | Where-Object { $ENCHIMENTO -notcontains $_ })
  if ($restantes.Count -eq 0) { return $false }
  foreach ($p in $restantes) {
    if ($p -notmatch "^I{1,3}$") { return $false }
  }
  return $true
}

function Test-AlternativaVF($texto) {
  if (-not $texto) { return $false }
  return ($texto -match "^\s*[VF](\s*[-–—,/]\s*[VF]){1,4}\s*\.?\s*$")
}

function Get-Formato($q) {
  $alts = @($q.alternativas.PSObject.Properties.Value)
  $enun = "$($q.enunciado)"

  # A escada é decidida pelas ALTERNATIVAS, não pelo comando: o comando varia
  # ("Está correto o que se afirma em", "Assinale a opção correta"), mas o
  # jogo de alternativas é sempre reconhecível.
  $nEscada = @($alts | Where-Object { Test-AlternativaEscada $_ }).Count
  if ($nEscada -ge 4) { return "escada" }

  $nVF = @($alts | Where-Object { Test-AlternativaVF $_ }).Count
  if ($nVF -ge 4) { return "vf" }

  # Duas lacunas: exige o sinal no comando ("respectivamente"/"lacunas") E
  # alternativas partidas em duas metades. Só o separador daria falso
  # positivo em qualquer alternativa com travessão.
  if ($enun -match "respectivamente|lacunas") {
    $nPar = @($alts | Where-Object { $_ -match "\S\s+[-–—]\s+\S" }).Count
    if ($nPar -ge 4) { return "lacunas" }
  }

  # Só marcadores de COMANDO. A tentação é incluir "não é"/"não são", mas isso
  # classifica errado: numa amostra dos 99 enunciados com alguma negação, os
  # 10 que essa cláusula pegava eram todos uso de conteúdo ("não regulado",
  # "não confiável", "não é eficaz"), nenhum era item de exceção. Marcar
  # questão direta como exceção estragaria o treino por formato.
  if ($enun -match "à exce[çc][ãa]o|\bexceto\b|\bincorreta\b|\bincorreto\b|alternativa falsa|op[çc][ãa]o falsa") {
    return "excecao"
  }
  # A negação em CAIXA ALTA também é convenção de banca para o item de exceção,
  # mas aqui ela só produz falso positivo: as duas únicas questões que pegava
  # eram de probabilidade, onde o "NÃO" em caixa alta faz parte do próprio
  # enunciado ("a probabilidade de o candidato NÃO ser aprovado"). Deixada de
  # fora de propósito.
  #
  # O resultado é que o banco tem ZERO itens de exceção — um formato que as
  # duas bancas usam (FGV 2026.1: uma em Humanas e duas em Inglês). Junto com
  # V/F e duas lacunas, é lacuna de formato a preencher, não erro de
  # classificação. Ao escrever esses itens, use o comando canônico da FGV
  # ("...à exceção de uma. Assinale-a.") pra que caiam nesta regra.

  return "direta"
}

# ------------------------------------------------------------- self-test

function Invoke-SelfTest {
  $casos = @(
    @{ t = "I, apenas"; ok = $true },
    @{ t = "I e II, apenas"; ok = $true },
    @{ t = "I, II e III"; ok = $true },
    @{ t = "Apenas as afirmativas I e III estão corretas"; ok = $true },
    @{ t = "Unicamente a III"; ok = $true },
    @{ t = "I, II e III, sem exceção"; ok = $true },
    @{ t = "O êxodo rural, impulsionado pela mecanização"; ok = $false },
    @{ t = "A Serra do Mar, escarpa montanhosa"; ok = $false }
  )
  foreach ($c in $casos) {
    if ((Test-AlternativaEscada $c.t) -ne $c.ok) { throw "self-test escada falhou em '$($c.t)'" }
  }
  if (-not (Test-AlternativaVF "V - V - F")) { throw "self-test VF falhou" }
  if (-not (Test-AlternativaVF "F-V-V-F")) { throw "self-test VF falhou (sem espaços)" }
  if (Test-AlternativaVF "V de verdade") { throw "self-test VF: falso positivo" }
}

Invoke-SelfTest

# ------------------------------------------------------------- varredura

$files = Get-ChildItem -Path $questionsDir -Filter "*.json" | Sort-Object Name
if ($Frente) {
  $files = $files | Where-Object { $_.BaseName -eq $Frente }
  if (-not $files) { throw "Frente '$Frente' não encontrada." }
}

$global = @{}
$linhas = @()

foreach ($file in $files) {
  $json = Get-Content -Raw -Encoding UTF8 $file.FullName | ConvertFrom-Json
  $questoes = @($json.questoes)
  $cont = @{}

  foreach ($q in $questoes) {
    $f = Get-Formato $q
    $cont[$f] = 1 + $(if ($cont.ContainsKey($f)) { $cont[$f] } else { 0 })
    $global[$f] = 1 + $(if ($global.ContainsKey($f)) { $global[$f] } else { 0 })
    if (-not $Simular) {
      $q | Add-Member -NotePropertyName formato -NotePropertyValue $f -Force
    }
  }

  $linhas += [pscustomobject]@{
    Banco   = $json.subtopic
    Total   = $questoes.Count
    Direta  = $(if ($cont.ContainsKey("direta")) { $cont["direta"] } else { 0 })
    Escada  = $(if ($cont.ContainsKey("escada")) { $cont["escada"] } else { 0 })
    VF      = $(if ($cont.ContainsKey("vf")) { $cont["vf"] } else { 0 })
    Excecao = $(if ($cont.ContainsKey("excecao")) { $cont["excecao"] } else { 0 })
    Lacunas = $(if ($cont.ContainsKey("lacunas")) { $cont["lacunas"] } else { 0 })
  }

  if (-not $Simular) {
    [System.IO.File]::WriteAllText($file.FullName, ($json | ConvertTo-Json -Depth 20), [System.Text.UTF8Encoding]::new($false))
  }
}

$linhas | Format-Table -AutoSize
Write-Output "TOTAL GERAL:"
$global.GetEnumerator() | Sort-Object Value -Descending | ForEach-Object { Write-Output "  $($_.Key): $($_.Value)" }

if ($Simular) {
  Write-Output ""
  Write-Output "(-Simular: nada foi gravado)"
} else {
  Write-Output ""
  Write-Output "Campo 'formato' gravado. Rode verify-banco.ps1 e depois build-bundle.ps1."
}
