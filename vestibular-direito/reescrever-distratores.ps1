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
# A negativa no fim existe porque em português "a" e "e" também são artigo e
# conjunção: "dessa alternativa a mais enganosa" e "a alternativa e o enunciado"
# não citam letra nenhuma, e a primeira versão do padrão reprovava as duas. O
# lookahead exclui só os casos em que a suposta letra é seguida de palavra que a
# revela como artigo ou conjunção -- referência de verdade a uma alternativa vem
# entre parênteses ou termina a oração, e essas continuam sendo pegas.
$LETRA_RX = '\(\s*[a-e]\s*\)|\b(alternativa|alternativas|letra|letras|opção|opções)\s+[a-e]\b(?!\s+(mais|menos|única|únicas|primeira|segunda|terceira|melhor|pior|correta|errada|seguinte|outra|o|a|os|as|que|não))'

# As caudas que este script existe para eliminar. Se o texto NOVO ainda tiver
# uma, o lote não cumpriu seu propósito e é melhor falhar do que gravar.
$CAUDA_RX = 'inexistente (à|na|nos|no) época|tecnologia então|mídia tecnologicamente inexistente|então completamente inexistente|é um traço definidor d|atribuído tradicionalmente a|já bastaria|basta para relacion|independentemente de haver|equivocad|indevid|hipótese que (ignora|desconsidera)|inversão que|generalização que (ignora|contraria)|que contraria (justamente|frontalmente|a tese|a própria|o sentido)|categoria inexistente|classificação oposta|tendência oposta'

# As duas réguas do verify-banco.ps1, copiadas daqui de propósito.
#
# O índice de chutabilidade simula um candidato que DESCARTA alternativa com
# palavra categórica e alternativa que se autorrefuta, e só então chuta a mais
# longa entre as que sobraram. Então um distrator que encosta em qualquer um dos
# dois padrões está fora da disputa: não cumpre função na questão, e some do
# denominador da métrica.
#
# Isso me pegou no lote 02: escrevi ", quando autoridades passam a cobrar" como
# oração temporal e ", quando" é um dos tells do AUTORREF_RX. A alternativa era
# legítima, mas a métrica a descartava -- e a melhora que eu tinha anunciado
# estava em parte apoiada nesse descarte. Falhar aqui é mais barato que
# descobrir depois, e muito mais barato que alargar a régua para caber o que eu
# escrevi, que seria consertar a medida em vez do banco.
$ABSOLUTO_RX = '\b(sempre|nunca|jamais|todo|todos|toda|todas|qualquer|exclusivamente|unicamente|impossível|garante|em nenhum)\b'
$AUTORREF_RX = '(,\s*(ignorando|quando|posição|tese|ideia|generalização|equiparação|hipótese|proposta|indiferença|deslocamento|traço|equívoco|confusão|leitura|inversão|atribuição)\b)|diametralmente opost|contradição direta|\bque \w+ (rejeita|recusa|atribui|nega|contraria)\b|\bo que contraria\b'

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
      # -cmatch como no verify-banco: o padrão é sensível a caixa lá, e usar
      # -match aqui reprovaria por ocorrência que a métrica não conta.
      if ($novo -cmatch $AUTORREF_RX) {
        throw "${id}: o texto novo de '$letra' encosta no AUTORREF_RX do verify ('$($Matches[0].Trim())'). A métrica descartaria essa alternativa, então ela não disputaria nada na questão. Reformule."
      }
      if ($novo -match $ABSOLUTO_RX) {
        throw "${id}: o texto novo de '$letra' tem palavra categórica ('$($Matches[0])'). A métrica descarta alternativa assim, e o candidato também. Reformule sem ela."
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
  # Compara por COMPRIMENTO, não por quem o Sort-Object devolve primeiro.
  #
  # A primeira versão pegava [0] de um Sort-Object decrescente, e isso escondeu um
  # empate em 27: a certa e um distrator tinham 246 caracteres cada. O Sort-Object
  # do PS devolveu o distrator na frente e o script se calou; o sort do JavaScript,
  # na conferência pelo navegador, devolveu a certa e acusou. A questão estava a um
  # critério de desempate de render acerto a quem chuta a mais longa -- empate não
  # é margem, e quem decide o desempate não é nenhum dos dois sorts, é o navegador
  # de quem estuda.
  $lenCerta = $q.alternativas.($q.resposta).Length
  $maxDistrator = 0
  foreach ($alt in $q.alternativas.PSObject.Properties) {
    if ($alt.Name -eq $q.resposta) { continue }
    if ($alt.Value.Length -gt $maxDistrator) { $maxDistrator = $alt.Value.Length }
  }
  if ($lenCerta -ge $maxDistrator) {
    $rel = if ($lenCerta -eq $maxDistrator) { "EMPATA com o maior distrator" } else { "segue a mais longa" }
    $aindaMaisLonga += "  $id : a certa ('$($q.resposta)', $lenCerta) $rel ($maxDistrator)"
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
