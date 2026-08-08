# auditar-anacronismo.ps1
#
# Procura alternativas que invocam um evento datado muito distante do periodo da
# questao. Nasceu de tres casos encontrados a mao em historia-brasil:
#
#   47(a) o quinto do ouro numa questao sobre a Revolta de Beckman (Maranhao, 1684)
#   54(d) a Guerra do Paraguai numa questao sobre a Confederacao do Equador (1824)
#   07(c) a Guerra do Paraguai numa questao sobre a abdicacao de Dom Pedro I (1831)
#
# O 07 e o que justifica este script: a cauda dele -- "conflito que teria esgotado o
# prestigio militar do imperador" -- nao se autorrefuta, e portanto o CAUDA_RX nunca
# o veria. Ler as questoes marcadas pelo regex nao alcanca as que ele nao marca.
#
# Como funciona: cada marcador abaixo e um evento com data conhecida. Para cada
# questao, o script deduz o periodo pelos anos citados no enunciado e no texto de
# apoio; se uma alternativa invoca um marcador afastado desse periodo por mais de
# -Tolerancia anos, reporta. Nao corrige nada -- so aponta onde olhar.
#
# Uso:
#   .\auditar-anacronismo.ps1 -Frente historia-brasil
#   .\auditar-anacronismo.ps1                    # todas as frentes
#   .\auditar-anacronismo.ps1 -Tolerancia 25     # mais severo

param(
  [string]$Frente = "",
  [int]$Tolerancia = 40
)

$ErrorActionPreference = "Stop"
$base = Split-Path -Parent $MyInvocation.MyCommand.Path

# marcador -> ano de referencia. So eventos cuja data e inequivoca.
$MARCADORES = [ordered]@{
  'capitanias hereditárias'            = 1534
  'União Ibérica'                      = 1600
  'invasões holandesas'                = 1635
  'Revolta de Beckman'                 = 1684
  'Guerra dos Emboabas'                 = 1708
  'Casas de Fundição'                  = 1720
  'Tratado de Madri'                   = 1750
  'Inconfidência Mineira'              = 1789
  'Conjuração Baiana'                  = 1798
  # 'abertura dos portos' sozinho e generico demais: casa com qualquer liberacao
  # de comercio em qualquer seculo.
  'abertura dos portos às nações amigas' = 1808
  'Reino Unido a Portugal'             = 1815
  'Revolução Pernambucana'             = 1817
  'Confederação do Equador'            = 1824
  'Constituição de 1824'               = 1824
  'abdicação de Dom Pedro I'           = 1831
  'Ato Adicional'                      = 1834
  'Cabanagem'                          = 1835
  'Sabinada'                           = 1837
  'Balaiada'                           = 1838
  'Lei Eusébio de Queirós'             = 1850
  'Lei de Terras'                      = 1850
  'Revolução Praieira'                 = 1848
  'Guerra do Paraguai'                 = 1867
  'Lei do Ventre Livre'                = 1871
  'Lei Áurea'                          = 1888
  'roclamação da República em 1889'    = 1889
  'roclamação da República brasileira' = 1889
  'Encilhamento'                       = 1891
  'Guerra de Canudos'                  = 1897
  'Revolta da Vacina'                  = 1904
  'Revolta da Chibata'                 = 1910
  # 'Contestado' sozinho casava com "dogmas contestados" no Concilio de Trento;
  # 'Proclamacao da Republica' casava com a da Republica Popular da China de 1949.
  # Marcador curto demais gera colisao de substring, e o relatorio perde credito.
  'Guerra do Contestado'               = 1914
  'Semana de Arte Moderna'             = 1922
  'Coluna Prestes'                     = 1925
  'Revolução de 1930'                  = 1930
  'Revolução Constitucionalista'       = 1932
  'Intentona Comunista'                = 1935
  'Estado Novo'                        = 1940
  'Ação Integralista'                  = 1936
  'Aliança Nacional Libertadora'       = 1935
  'Força Expedicionária Brasileira'    = 1944
  'FEB'                                = 1944
  'Constituição de 1946'               = 1946
  'queremismo'                         = 1945
  'Petrobras'                          = 1953
  'suicídio de Vargas'                 = 1954
  'Plano de Metas'                     = 1958
  'Campanha da Legalidade'             = 1961
  'Estatuto do Trabalhador Rural'      = 1963
  'golpe de 1964'                      = 1964
  'AI-5'                               = 1968
  'Milagre econômico'                  = 1971
  'Lei da Anistia'                     = 1979
  'Diretas Já'                         = 1984
  'Movimento Negro Unificado'          = 1978
  'MNU'                                = 1978
  'Constituinte'                       = 1987
  'Constituição de 1988'               = 1988
  'Plano Cruzado'                      = 1986
  'Plano Real'                         = 1994
  'Programa Nacional de Desestatização' = 1991
  'Lei Maria da Penha'                 = 2006
  'Bolsa Família'                      = 2004
  'teto de gastos'                     = 2016
  'marco temporal'                     = 2021
}

$arquivos = if ($Frente) {
  @(Get-Item (Join-Path $base "data\questions\$Frente.json"))
} else {
  Get-ChildItem (Join-Path $base "data\questions\*.json")
}

$achados = 0

foreach ($f in $arquivos) {
  $j = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
  foreach ($q in $j.questoes) {

    # periodo da questao: anos citados no enunciado e no apoio
    $contexto = "$($q.enunciado) $($q.texto_apoio)"
    $anos = @([regex]::Matches($contexto, '\b(1[4-9]\d{2}|20[0-2]\d)\b') | ForEach-Object { [int]$_.Value })

    # marcadores citados no enunciado tambem datam a questao
    foreach ($m in $MARCADORES.Keys) {
      if ($contexto -match [regex]::Escape($m)) { $anos += $MARCADORES[$m] }
    }
    if ($anos.Count -eq 0) { continue }

    $min = ($anos | Measure-Object -Minimum).Minimum
    $max = ($anos | Measure-Object -Maximum).Maximum

    foreach ($a in $q.alternativas.PSObject.Properties) {
      foreach ($m in $MARCADORES.Keys) {
        if ($a.Value -notmatch [regex]::Escape($m)) { continue }
        $ano = $MARCADORES[$m]
        $dist = if ($ano -lt $min) { $min - $ano } elseif ($ano -gt $max) { $ano - $max } else { 0 }
        if ($dist -le $Tolerancia) { continue }

        $achados++
        $marca = if ($a.Name -eq $q.resposta) { " *** NA CERTA ***" } else { "" }
        Write-Host ""
        Write-Host "$($f.BaseName) / $($q.id) / letra $($a.Name)$marca" -ForegroundColor Yellow
        Write-Host "  questao situada em ${min}-${max}; a alternativa invoca '$m' ($ano), $dist anos fora"
        Write-Host "  ENUN: $($q.enunciado)"
        Write-Host "  ALT : $($a.Value)"
      }
    }
  }
}

Write-Host ""
if ($achados -eq 0) {
  Write-Host "Nenhum anacronismo acima de $Tolerancia anos." -ForegroundColor Green
} else {
  Write-Host "$achados alternativa(s) com marcador fora do periodo (tolerancia $Tolerancia anos)." -ForegroundColor Yellow
  Write-Host "Nada foi alterado. Cada caso precisa de leitura: a distancia pode ser proposital"
  Write-Host "quando a questao compara periodos, e nesse caso o enunciado costuma dizer."
}
