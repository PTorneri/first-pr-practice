function Convert-Mojibake {
  param([string]$Texto)
  # Uma sequencia corrompida e um texto que estava em UTF-8, foi lido como
  # Latin-1 e regravado como UTF-8: cada byte virou um caractere proprio.
  # Ex.: "ção" (bytes C3 A7 C3 A3 6F) virou "Ã§Ã£o".
  #
  # O conserto e o caminho inverso, mas SO nas sequencias corrompidas: aplicar
  # a conversao no arquivo inteiro destruiria os acentos que estao corretos
  # (um "ç" limpo viraria byte invalido). Por isso o regex casa apenas os pares
  # "Ã"/"Â" seguidos de um byte de continuacao, que e a assinatura do problema.
  $padrao = "(?:[\u00C3\u00C2][\u0080-\u00BF])+"
  $avaliador = {
    param($m)
    $bytes = [System.Text.Encoding]::GetEncoding(28591).GetBytes($m.Value)
    [System.Text.Encoding]::UTF8.GetString($bytes)
  }
  return [regex]::Replace($Texto, $padrao, $avaliador)
}

# --- Autoteste: nao mexe em arquivo nenhum se a logica nao passar ---
$casos = @(
  @{ entrada = "radia" + [char]0xC3 + [char]0xA7 + [char]0xC3 + [char]0xA3 + "o"; esperado = "radia" + [char]0xE7 + [char]0xE3 + "o" }
  @{ entrada = [char]0xC3 + [char]0xA1 + "gua";                                    esperado = [char]0xE1 + "gua" }
  @{ entrada = "texto limpo com " + [char]0xE7 + [char]0xE3 + "o";                 esperado = "texto limpo com " + [char]0xE7 + [char]0xE3 + "o" }
)
foreach ($c in $casos) {
  $obtido = Convert-Mojibake $c.entrada
  if ($obtido -ne $c.esperado) {
    throw "Autoteste falhou. Entrada: '$($c.entrada)' -> obtido '$obtido', esperado '$($c.esperado)'"
  }
}
Write-Output "Autoteste OK (inclusive o caso que NAO pode ser alterado)."
Write-Output ""

$ErrorActionPreference = "Stop"
$dir = Join-Path $PSScriptRoot "data\questions"
$totalCorrigidas = 0

foreach ($f in (Get-ChildItem -Path $dir -Filter *.json | Sort-Object Name)) {
  $texto = [System.IO.File]::ReadAllText($f.FullName, [System.Text.UTF8Encoding]::new($false))
  $antes = [regex]::Matches($texto, "[\u00C3\u00C2][\u0080-\u00BF]").Count
  if ($antes -eq 0) { continue }

  $novo = Convert-Mojibake $texto
  $depois = [regex]::Matches($novo, "[\u00C3\u00C2][\u0080-\u00BF]").Count

  # O JSON tem que continuar valido depois do conserto.
  $null = $novo | ConvertFrom-Json

  [System.IO.File]::WriteAllText($f.FullName, $novo, [System.Text.UTF8Encoding]::new($false))
  $totalCorrigidas += ($antes - $depois)
  Write-Output ("{0,-32} {1} -> {2} sequencias corrompidas" -f $f.Name, $antes, $depois)
}

Write-Output ""
Write-Output "OK: $totalCorrigidas sequencias corrigidas. Rode build-bundle.ps1 em seguida."
