# Reescreve distratores E a explicação de uma questão, no lugar, sem tocar em
# enunciado, texto_apoio, id, formato nem no gabarito.
#
# Uso:
#   .\reescrever-distratores.ps1 -Patch data/reescritas/artes-caudas-01.json -Simular
#   .\reescrever-distratores.ps1 -Patch data/reescritas/artes-caudas-01.json
#
# --- por que este script existe -----------------------------------------
#
# artes-cultura e filosofia-sociologia foram escritas sobre um molde em que o
# distrator ANUNCIA que é o distrator. Três formas recorrentes:
#
#   anacronismo    "a antecipação, por Dalí, das ferramentas de IA, tecnologia
#                   inexistente no contexto do Surrealismo"
#   atribuição     "é um traço definidor do Cubismo, e não do Surrealismo"
#   superficial    "a presença de um relógio, o que já bastaria para relacioná-la
#                   ao método de Dalí, independentemente de..."
#
# E em filosofia-sociologia a mesma coisa com outro vocabulário: "inversão que
# contraria a tese lockeana", "generalização que ignora a distinção kantiana".
#
# Medido em 2026-08: 212 de 400 distratores em artes-cultura (53%, 91 das 100
# questões) e 127 de 400 em filosofia-sociologia (32%, 53 questões). Quem
# aprende o molde responde por eliminação sem saber nada de arte nem de
# filosofia -- é uma via de acerto que não passa pelo conteúdo.
#
# Parte disso o verify-banco.ps1 já vê pelo AUTORREF_RX e desconta do índice de
# chutabilidade (coluna RefDistr). Mas as formas de artes-cultura --
# "inexistente à época", "já bastaria", "e não do X" -- não casam com aquele
# padrão, e são 169 distratores que a métrica não enxerga.
#
# --- por que não dava para usar o que já existia ------------------------
#
# alongar-distrator.ps1 exige que o texto novo seja MAIS LONGO que a alternativa
# certa, porque foi feito para a campanha de chutabilidade. Aqui, tirar a cauda
# delatora frequentemente ENCURTA o distrator, então aquela guarda recusaria o
# lote inteiro.
#
# apply-refeitas.ps1 substitui a questão toda, e as 200 questões destas duas
# frentes têm texto_apoio: reproduzir 144 textos de apoio só para trocar um
# distrator é 144 chances de corromper o que já estava certo.
#
# Daí este: mexe só nas alternativas indicadas e na explicação, no lugar.
#
# --- a explicação anda junto, e por isso não é opcional -----------------
#
# Nessas duas frentes a explicação é um CHECKLIST dos tipos de distrator:
# "-- distinto de uma associação por objeto específico (relógio), de uma
# antecipação anacrônica da IA, ou da confusão com o Realismo de Courbet."
# Trocar o distrator e deixar a explicação faz a explicação refutar uma
# alternativa que não está mais na tela. Então: se o patch mexe em alternativa,
# ele tem de declarar 'explicacao' também. O script recusa se não vier.
#
# Formato do patch:
#   { "subtopic": "artes-cultura",
#     "questoes": {
#       "artes-cultura-22": {
#         "alternativas": { "d": "...", "b": "..." },
#         "explicacao": "..." } } }

param(
  [Parameter(Mandatory = $true)][string]$Patch,
  [switch]$Simular
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

# Mesmo padrão do permutar-alternativas.ps1 e do rebalance-answers.ps1: a
# explicação nomeia distrator por CONTEÚDO, nunca por letra. Manter isso é o que
# deixa a permutação e o rebalanceamento seguros mais tarde.
$LETRA_RX = '\(\s*[a-e]\s*\)|\b(alternativa|alternativas|letra|letras|opção|opções)\s+[a-e]\b'

# As caudas que este script existe para eliminar. Se o texto NOVO ainda tiver
# uma, o lote não cumpriu seu propósito e é melhor falhar do que gravar.
$CAUDA_RX = 'inexistente (à|na|nos|no) época|tecnologia então|mídia tecnologicamente inexistente|então completamente inexistente|é um traço definidor d|atribuído tradicionalmente a|já bastaria|basta para relacion|independentemente de haver|equivocad|indevid|hipótese que (ignora|desconsidera)|inversão que|generalização que (ignora|contraria)|que contraria (justamente|frontalmente|a tese|a própria|o sentido)|categoria inexistente|classificação oposta|tendência oposta'

function Read-Json($caminho) {
  return [System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
}

$patchPath = if ([System.IO.Path]::IsPathRooted($Patch)) { $Patch } else { Join-Path $root $Patch }
if (-not (Test-Path $patchPath)) { throw "Patch não encontrado: $patchPath" }

$pat = Read-Json $patchPath
if (-not $pat.subtopic) { throw "Patch sem 'subtopic'." }

$frentePath = Join-Path $root "data\questions\$($pat.subtopic).json"
if (-not (Test-Path $frentePath)) { throw "Frente não encontrada: $frentePath" }

$frente = Read-Json $frentePath

$nQ = 0; $nAlt = 0; $nExpl = 0
$relatorio = @()
$aindaMaisLonga = @()

foreach ($prop in $pat.questoes.PSObject.Properties) {
  $id = $prop.Name
  $spec = $prop.Value

  $q = $frente.questoes | Where-Object { $_.id -eq $id }
  if (-not $q) { throw "${id}: não existe em $($pat.subtopic).json." }
  if ($q -is [array]) { throw "${id}: aparece mais de uma vez no arquivo." }

  $temAlts = ($null -ne $spec.alternativas)
  $temExpl = [bool]$spec.explicacao
  if (-not $temAlts -and -not $temExpl) {
    throw "${id}: o patch não declara nem 'alternativas' nem 'explicacao'."
  }
  # A explicação é checklist dos distratores: mexer em alternativa sem mexer
  # nela deixa a explicação refutando o que saiu da tela.
  if ($temAlts -and -not $temExpl) {
    throw "${id}: mexe em alternativa e não declara 'explicacao'. Nessas frentes a explicação nomeia cada distrator; sem reescrevê-la ela passa a refutar alternativa que não existe mais."
  }

  if ($temAlts) {
    foreach ($a in $spec.alternativas.PSObject.Properties) {
      $letra = $a.Name
      $novo = $a.Value

      if ($letra -eq $q.resposta) {
        throw "${id}: '$letra' é o GABARITO. Este script só reescreve distrator."
      }
      if (-not $q.alternativas.PSObject.Properties[$letra]) {
        throw "${id}: alternativa '$letra' não existe na questão."
      }
      if ([string]::IsNullOrWhiteSpace($novo)) { throw "${id}: alternativa '$letra' vazia." }
      if ($novo -match $CAUDA_RX) {
        throw "${id}: o texto novo de '$letra' ainda tem cauda delatora ('$($Matches[0])'). É exatamente o que este lote deveria remover."
      }

      $q.alternativas.$letra = $novo
      $nAlt++
    }

    # nenhuma alternativa duplicada dentro da questão
    $textos = @($q.alternativas.PSObject.Properties.Value)
    $dups = @($textos | Group-Object | Where-Object { $_.Count -gt 1 })
    if ($dups.Count -gt 0) { throw "${id}: alternativa duplicada depois da troca." }

    if (@($q.alternativas.PSObject.Properties.Name).Count -ne 5) {
      throw "${id}: ficou com $(@($q.alternativas.PSObject.Properties.Name).Count) alternativas."
    }
  }

  if ($temExpl) {
    if ($spec.explicacao -match $LETRA_RX) {
      throw "${id}: a explicação nova cita letra ('$($Matches[0])'). Nomeie o distrator pelo conteúdo -- é o que mantém a permutação e o rebalanceamento seguros."
    }
    $q.explicacao = $spec.explicacao
    $nExpl++
  }

  # Sinal de chutabilidade: se a certa continua a mais longa, quem chuta a
  # maior alternativa ainda acerta. Não é motivo para recusar, é para avisar.
  $lenCerta = $q.alternativas.($q.resposta).Length
  $maior = ($q.alternativas.PSObject.Properties | Sort-Object { $_.Value.Length } -Descending)[0]
  if ($maior.Name -eq $q.resposta) {
    $aindaMaisLonga += "  $id : a certa ('$($q.resposta)', $lenCerta) segue a mais longa"
  }

  $relatorio += "  $id : $(if ($temAlts) { "$(@($spec.alternativas.PSObject.Properties).Count) distrator(es)" } else { 'só explicação' })"
  $nQ++
}

if ($Simular) {
  Write-Output "SIMULACAO -- nada gravado."
  Write-Output "$nQ questões, $nAlt distratores, $nExpl explicações:"
  $relatorio | ForEach-Object { Write-Output $_ }
  if ($aindaMaisLonga.Count -gt 0) {
    Write-Output "AVISO -- alternativa certa ainda é a mais longa em $($aindaMaisLonga.Count):"
    $aindaMaisLonga | ForEach-Object { Write-Output $_ }
  }
  return
}

# Gravar ANTES de qualquer Write-Output: encanar a saída por Select-Object
# -First N faz o PS 5.1 matar o processo assim que junta N objetos, e no meio
# do relatório isso deixaria o arquivo sem escrever, sem erro visível.
[System.IO.File]::WriteAllText($frentePath, ($frente | ConvertTo-Json -Depth 20), [System.Text.UTF8Encoding]::new($false))

Write-Output "OK: $nQ questões em $($pat.subtopic).json -- $nAlt distratores e $nExpl explicações reescritos (nenhum gabarito tocado)."
$relatorio | ForEach-Object { Write-Output $_ }
if ($aindaMaisLonga.Count -gt 0) {
  Write-Output "AVISO -- alternativa certa ainda é a mais longa em $($aindaMaisLonga.Count):"
  $aindaMaisLonga | ForEach-Object { Write-Output $_ }
}
Write-Output "Rode verify-banco.ps1 -Frente $($pat.subtopic) e depois build-bundle.ps1."
