# Troca duas alternativas de lugar dentro de uma questão, sem tocar no conteúdo
# de nenhuma delas, e ajusta 'resposta' para acompanhar o gabarito.
#
# Uso:
#   .\permutar-alternativas.ps1 -Patch data/reescritas/historia-letras-01.json -Simular
#   .\permutar-alternativas.ps1 -Patch data/reescritas/historia-letras-01.json
#
# --- por que ------------------------------------------------------------
#
# Ao reescrever um lote, a letra do gabarito de cada questão tende a sair de
# onde estava -- a gente escreve pensando no conteúdo, e a alternativa certa
# cai onde caiu. Isso estraga a distribuição por letra do arquivo, que é uma
# das invariantes do verify-banco.ps1: se as respostas se acumulam em (c), um
# candidato que só chuta (c) passa a ter vantagem, e o banco deixa de treinar.
#
# Consertar isso REESCREVENDO alternativa seria absurdo -- o conteúdo está bom,
# só está na posição errada. Este script permuta duas posições e recoloca o
# gabarito na letra pretendida.
#
# Isso só é seguro por causa de uma regra de autoria que o banco segue desde o
# começo: a explicação nomeia os distratores pelo CONTEÚDO ("a mão de obra
# artesanal perdeu importância"), nunca pela letra ("a alternativa (a) erra
# porque..."). Com isso, mover uma alternativa não invalida uma única palavra da
# explicação. O script verifica essa premissa e recusa o patch se encontrar
# referência a letra na explicação -- é a diferença entre uma permutação segura
# e uma explicação que passa a apontar para a alternativa errada.
#
# R4 do plano: mudar 'resposta' reescreve o histórico do usuário
# retroativamente, porque vd_answers guarda a LETRA escolhida e o acerto é
# recalculado na leitura. Vale para questão já respondida. Este script se
# aplica a lote recém-escrito, que ninguém respondeu ainda.
#
# Formato do patch:
#   { "subtopic": "historia-geral",
#     "questoes": {
#       "historia-geral-36": { "troca": ["c","d"], "resposta": "c" } } }
#
# 'troca' são as duas letras que mudam de lugar. 'resposta' é a letra que o
# gabarito deve ter DEPOIS da troca -- declarada, e não inferida, para que o
# script possa conferir que o resultado é o pretendido em vez de só acreditar.

param(
  [Parameter(Mandatory = $true)][string]$Patch,
  [switch]$Simular
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

# A explicação não deve citar letra. Pega "(a)", "alternativa a", "letra b",
# "opção c" -- e deixa passar "a", "e", "o" como palavras comuns, que é por que
# o padrão exige o parêntese ou o substantivo antes.
$LETRA_RX = '\(\s*[a-e]\s*\)|\b(alternativa|alternativas|letra|letras|opção|opções|item|itens)\s+[a-e]\b'

function Read-Json($caminho) {
  $texto = [System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8)
  return $texto | ConvertFrom-Json
}

function Write-Json($caminho, $objeto) {
  # Depth 20: o schema aninha alternativas dentro de questões dentro do arquivo,
  # e o default 2 do PS 5.1 trunca em silêncio.
  $texto = $objeto | ConvertTo-Json -Depth 20
  [System.IO.File]::WriteAllText($caminho, $texto, [System.Text.UTF8Encoding]::new($false))
}

$patchPath = if ([System.IO.Path]::IsPathRooted($Patch)) { $Patch } else { Join-Path $root $Patch }
if (-not (Test-Path $patchPath)) { throw "Patch não encontrado: $patchPath" }

$p = Read-Json $patchPath
if (-not $p.subtopic) { throw "Patch sem 'subtopic'." }

$frentePath = Join-Path $root "data\questions\$($p.subtopic).json"
if (-not (Test-Path $frentePath)) { throw "Frente não encontrada: $frentePath" }

$frente = Read-Json $frentePath
$questoes = $frente.questoes

$aplicadas = 0
$relatorio = @()

foreach ($prop in $p.questoes.PSObject.Properties) {
  $id = $prop.Name
  $spec = $prop.Value

  $q = $questoes | Where-Object { $_.id -eq $id }
  if (-not $q) { throw "$id não existe em $($p.subtopic).json." }
  if ($q -is [array]) { throw "$id aparece mais de uma vez em $($p.subtopic).json." }

  if (-not $spec.troca -or @($spec.troca).Count -ne 2) {
    throw "${id}: 'troca' precisa ser um par de letras, ex. [`"c`",`"d`"]."
  }
  $de, $para = @($spec.troca)
  if ($de -eq $para) { throw "${id}: 'troca' com a mesma letra duas vezes ($de)." }

  $alts = $q.alternativas
  foreach ($letra in @($de, $para)) {
    if (-not $alts.PSObject.Properties[$letra]) {
      throw "${id}: alternativa '$letra' não existe."
    }
  }

  if (-not $spec.resposta) { throw "${id}: 'resposta' é obrigatória no patch." }
  if (-not $alts.PSObject.Properties[$spec.resposta]) {
    throw "${id}: 'resposta' declarada '$($spec.resposta)' não é uma alternativa da questão."
  }

  # A troca só faz sentido se mexer no gabarito: ou ele sai de onde está, ou
  # chega onde deveria. Permutar dois distratores não muda nada verificável e
  # é sinal de patch escrito errado.
  if ($q.resposta -ne $de -and $q.resposta -ne $para) {
    throw "${id}: o gabarito é '$($q.resposta)' e a troca é '$de'<->'$para' -- nenhuma das duas é o gabarito, a permutação não teria efeito."
  }

  # Premissa que torna a permutação segura: nenhuma letra citada na explicação.
  if ($q.explicacao -and $q.explicacao -match $LETRA_RX) {
    throw "${id}: a explicação cita letra de alternativa ('$($Matches[0])'). Permutar mudaria o sentido dela. Reescreva a explicação por conteúdo antes."
  }

  $textoDe = $alts.$de
  $textoPara = $alts.$para
  $alts.$de = $textoPara
  $alts.$para = $textoDe

  $novoGabarito = if ($q.resposta -eq $de) { $para } else { $de }
  if ($novoGabarito -ne $spec.resposta) {
    throw "${id}: a troca '$de'<->'$para' levaria o gabarito de '$($q.resposta)' para '$novoGabarito', e o patch declara '$($spec.resposta)'. Corrija o patch."
  }

  $relatorio += "  $id : $($q.resposta) -> $novoGabarito  (trocou $de <-> $para)"
  $q.resposta = $novoGabarito
  $aplicadas++
}

if ($Simular) {
  # Antes de qualquer Write-Output: nada foi gravado, então aqui é seguro.
  Write-Output "SIMULACAO -- nada gravado. $aplicadas questões seriam permutadas:"
  $relatorio | ForEach-Object { Write-Output $_ }
  return
}

Write-Json $frentePath $frente

# Distribuição final por letra, para conferir de imediato se a permutação
# melhorou o que se propôs a melhorar.
$dist = @{}
foreach ($q in $questoes) {
  $r = $q.resposta
  if (-not $dist.ContainsKey($r)) { $dist[$r] = 0 }
  $dist[$r]++
}
$linhaDist = ($dist.Keys | Sort-Object | ForEach-Object { "$_=$($dist[$_])" }) -join "  "

Write-Output "OK: $aplicadas questões permutadas em $($p.subtopic).json."
$relatorio | ForEach-Object { Write-Output $_ }
Write-Output "Distribuição do arquivo: $linhaDist"
