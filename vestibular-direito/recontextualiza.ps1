# Reescreve o ENUNCIADO de questões objetivas sem tocar em mais nada.
#
# Uso:
#   .\recontextualiza.ps1 -Patch data/reescritas/matematica-contexto-01.json -Simular
#   .\recontextualiza.ps1 -Patch data/reescritas/matematica-contexto-01.json
#
# --- por que um script só para isto ---------------------------------------
#
# O apply-refeitas.ps1 substitui a questão inteira, e por isso exige repetir as
# cinco alternativas em cada patch. Aqui o que muda é só o embrulho: a conta é a
# mesma, o gabarito é o mesmo, as alternativas são as mesmas. Repetir tudo isso
# num patch de 123 questões seria 123 oportunidades de errar uma alternativa por
# digitação — e o erro passaria sem sinal, porque a estrutura continuaria válida.
#
# A trava principal está em Assert-MesmosNumeros. Recontextualizar é trocar
# "Um produto custava R$ 250,00 e sofreu aumento de 12%" por uma situação
# narrada com os MESMOS 250 e 12. Se um número sumir ou aparecer diferente no
# enunciado novo, a conta deixou de bater com o gabarito, e nenhuma checagem de
# schema perceberia isso. O script recusa o patch nesse caso.
#
# Formato do patch:
#   { "subtopic": "matematica-rlm",
#     "questoes": {
#       "matematica-rlm-01": {
#         "banca": "fgv",
#         "texto_apoio": "...",              (opcional)
#         "enunciado": "...",
#         "numerosNovos": [2] } } }          (opcional: números que o contexto
#                                             introduz e que não existiam antes)

param(
  [Parameter(Mandatory = $true)][string]$Patch,
  [switch]$Simular
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$questionsDir = Join-Path $root "data\questions"

# Extrai os números de um texto, normalizando o formato brasileiro: 4.500 e
# 2.000,00 são o mesmo 4500 e 2000 que o enunciado novo precisa conservar.
function Get-Numeros {
  param([string]$texto)
  if (-not $texto) { return @() }
  $t = $texto -replace '(?<=\d)\.(?=\d{3}\b)', ''   # separador de milhar
  $t = $t -replace '(?<=\d),(?=\d)', '.'            # vírgula decimal
  $nums = @()
  foreach ($m in [regex]::Matches($t, '\d+(?:\.\d+)?')) {
    $v = [double]$m.Value
    # 250,00 e 250 são o mesmo número para efeito da conta
    $nums += [math]::Round($v, 4)
  }
  return $nums
}

function Assert-MesmosNumeros {
  param([string]$id, [string]$antigo, [string]$novo, $extras)
  $faltando = @()
  $novos = @(Get-Numeros $novo)
  $permitidos = @()
  if ($extras) { foreach ($e in @($extras)) { $permitidos += [math]::Round([double]$e, 4) } }
  foreach ($n in (Get-Numeros $antigo)) {
    $i = [array]::IndexOf($novos, $n)
    if ($i -lt 0) { $faltando += $n } else { $novos[$i] = [double]::NaN }
  }
  if ($faltando.Count -gt 0) {
    throw "$($id): o enunciado novo perdeu os números $($faltando -join ', '). A conta deixaria de bater com o gabarito."
  }
  $sobrando = @($novos | Where-Object { -not [double]::IsNaN($_) } | Where-Object { $permitidos -notcontains $_ })
  if ($sobrando.Count -gt 0) {
    throw "$($id): o enunciado novo introduziu os números $($sobrando -join ', ') sem declará-los em 'numerosNovos'. Se forem parte do contexto e não da conta, declare-os; se forem da conta, o gabarito mudou."
  }
}

$patchPath = if ([System.IO.Path]::IsPathRooted($Patch)) { $Patch } else { Join-Path $root $Patch }
if (-not (Test-Path $patchPath)) { throw "Patch não encontrado: $patchPath" }

$p = Get-Content -Raw -Encoding UTF8 $patchPath | ConvertFrom-Json
$banco = $p.subtopic
if (-not $banco) { throw "O patch precisa declarar 'subtopic'." }
$arquivo = Join-Path $questionsDir "$banco.json"
$json = Get-Content -Raw -Encoding UTF8 $arquivo | ConvertFrom-Json
$questoes = @($json.questoes)

$alvos = $p.questoes
$ids = @($alvos.PSObject.Properties.Name)
$feitas = @{}
$porBanca = @{}

foreach ($q in $questoes) {
  $entrada = $alvos.PSObject.Properties | Where-Object { $_.Name -eq $q.id }
  if (-not $entrada) { continue }
  $cfg = $entrada.Value

  if (-not $cfg.banca) { throw "$($q.id): patch sem 'banca'." }
  if (@("fgv", "insper") -notcontains $cfg.banca) { throw "$($q.id): banca '$($cfg.banca)' inválida." }
  # 27 das 150 já nasceram com texto de apoio e narrativa. Para essas o patch
  # traz só a banca: reescrever o enunciado seria churn sem ganho, e o campo
  # `banca` sozinho já habilita o filtro por estilo de prova.
  if ($cfg.enunciado -and $cfg.enunciado -eq $q.enunciado) { throw "$($q.id): o enunciado do patch é idêntico ao atual." }

  if ($cfg.enunciado) {
    $antigo = $q.enunciado
    if ($q.PSObject.Properties.Name -contains "texto_apoio" -and $q.texto_apoio) { $antigo = $q.texto_apoio + " " + $antigo }
    $novo = $cfg.enunciado
    if ($cfg.texto_apoio) { $novo = $cfg.texto_apoio + " " + $novo }
    Assert-MesmosNumeros $q.id $antigo $novo $cfg.numerosNovos
  } elseif ($cfg.texto_apoio) {
    throw "$($q.id): patch traz 'texto_apoio' sem 'enunciado'. Mexer só no apoio deixaria a conta espalhada entre um texto novo e um enunciado velho."
  }

  if (-not $Simular) {
    if ($cfg.enunciado) { $q.enunciado = $cfg.enunciado }
    if ($cfg.texto_apoio) {
      if ($q.PSObject.Properties.Name -contains "texto_apoio") { $q.texto_apoio = $cfg.texto_apoio }
      else { $q | Add-Member -NotePropertyName "texto_apoio" -NotePropertyValue $cfg.texto_apoio }
    }
    if ($q.PSObject.Properties.Name -contains "banca") { $q.banca = $cfg.banca }
    else { $q | Add-Member -NotePropertyName "banca" -NotePropertyValue $cfg.banca }
  }

  if (-not $porBanca.ContainsKey($cfg.banca)) { $porBanca[$cfg.banca] = 0 }
  $porBanca[$cfg.banca]++
  $feitas[$q.id] = $true
}

$faltando = @($ids | Where-Object { -not $feitas.ContainsKey($_) })
if ($faltando.Count -gt 0) { throw "IDs do patch não encontrados em '$banco': $($faltando -join ', ')" }

# Gravação antes de qualquer Write-Output: encanar a saída por Select-Object
# -First N mata o processo assim que N objetos saem, e já custou uma rodada
# inteira que reportou sucesso sem ter escrito nada.
if (-not $Simular) {
  [System.IO.File]::WriteAllText($arquivo, ($json | ConvertTo-Json -Depth 20), [System.Text.UTF8Encoding]::new($false))
}

Write-Output "OK: $($feitas.Count) enunciados recontextualizados em $banco.json."
Write-Output ("Por banca: " + (($porBanca.GetEnumerator() | Sort-Object Name | ForEach-Object { "$($_.Key)=$($_.Value)" }) -join "  "))
if ($Simular) { Write-Output "(-Simular: nada foi gravado)" }
else { Write-Output "Rode verify-banco.ps1 -Frente $banco e depois build-bundle.ps1." }
