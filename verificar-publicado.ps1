# O que está no ar é o que está no repositório?
#
# Uso:
#   .\verificar-publicado.ps1                  # confere os arquivos-sentinela
#   .\verificar-publicado.ps1 -Completo        # confere todos os arquivos servidos
#   .\verificar-publicado.ps1 -Ref HEAD        # compara contra outra referência
#
# --- por que este script existe -----------------------------------------
#
# Em 2026-08-06 o site ficou vinte horas servindo uma versão antiga e ninguém
# percebeu. Entre o que faltava estava a frente de inglês de Medicina inteira,
# com 150 questões, que nunca havia estado no ar. A descoberta veio de uma
# pergunta solta ("está atualizado?"), não de um alarme.
#
# A regra de desenho é uma só, e vem do erro daquele dia: COMPARAR O SITE COM O
# REPOSITÓRIO, nunca perguntar ao painel de deploy se deu certo. Naquela tarde o
# painel do Actions mostrava "cancelled" enquanto a API do Pages dizia
# "errored", e mais tarde a API do Pages ficou congelada num commit velho
# enquanto o site já servia outro, publicado por workflow — que ela não enxerga.
# Três diagnósticos errados saíram de olhar para o lugar que informa sobre o
# processo em vez de olhar para o resultado. O resultado é o arquivo servido.
#
# Por isso aqui não há nenhuma chamada à API do GitHub. Busca o arquivo por
# HTTP, pega o mesmo arquivo do git, e compara. Se o site estiver fora do ar, o
# script diz isso; se estiver servindo conteúdo velho, diz qual.

param(
  [string]$Ref = "origin/main",
  [string]$BaseUrl = "https://ptorneri.github.io/first-pr-practice",
  [switch]$Completo,
  [switch]$Silencioso
)

$ErrorActionPreference = "Stop"

# Sem isto, o PowerShell 5.1 decodifica a saída do git com a página de código do
# console e os acentos viram lixo — todo arquivo com "ç" acusaria diferença.
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$raiz = $PSScriptRoot
Set-Location $raiz

# Arquivos-sentinela: os que mudam com mais frequência e os pontos de entrada.
# Não é a lista completa de propósito — a graça é ser rápido o bastante para
# rodar sem pensar. Para a varredura exaustiva existe -Completo.
$SENTINELAS = @(
  "vestibular-direito/index.html",
  "vestibular-direito/app.js",
  "vestibular-direito/data/obras.js",
  "vestibular-direito/data/obras-questoes.js",
  "vestibular-direito/data/bundle.js",
  "vestibular-direito-v2/index.html",
  "vestibular-direito-v2/trilhas.js",
  "vestibular-direito-v2/app.js",
  "vestibular-medicina/data/obras.js",
  "vestibular-medicina/data/obras-questoes.js",
  "vestibular-medicina/data/bundle.js"
)

# As três pastas que o site serve. O resto do repositório (scripts, provas em
# PDF, estudos) vai junto para o Pages, mas não é conteúdo de aluno e não
# interessa conferir.
$PASTAS_SERVIDAS = @("vestibular-direito", "vestibular-direito-v2", "vestibular-medicina")

function Normalizar([string]$t) {
  if ($null -eq $t) { return "" }
  # Compara conteúdo, não fim de linha: o working tree é CRLF e o blob do git é
  # LF, e sem isto todo arquivo acusaria diferença.
  return ($t -replace "`r`n", "`n").TrimEnd()
}

function Hash([string]$t) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes((Normalizar $t))
  $sha = [System.Security.Cryptography.SHA256]::Create()
  return [BitConverter]::ToString($sha.ComputeHash($bytes)).Replace("-", "")
}

# Confere que a referência existe antes de comparar 200 arquivos contra o nada.
& git rev-parse --verify --quiet "$Ref" *> $null
if ($LASTEXITCODE -ne 0) { throw "referência git desconhecida: $Ref (esqueceu de rodar 'git fetch origin'?)" }

if ($Completo) {
  $alvos = @()
  foreach ($p in $PASTAS_SERVIDAS) {
    $alvos += @(& git ls-tree -r --name-only "$Ref" -- $p) | Where-Object { $_ }
  }
} else {
  $alvos = $SENTINELAS
}

$iguais = 0
$divergentes = @()
$ausentes = @()
$erros = @()
$cb = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()

foreach ($caminho in $alvos) {
  # No git: pega o blob da referência, não o arquivo do disco. O disco pode ter
  # trabalho não commitado, que por definição ainda não deveria estar no ar.
  $noGit = (& git show "${Ref}:$caminho" 2>$null) -join "`n"
  if ($LASTEXITCODE -ne 0) { $erros += "$caminho (não existe em $Ref)"; continue }

  # No ar: ?cb= derrota o cache do CDN, que serve com max-age=600 e devolveria
  # a cópia velha exatamente nos dez minutos em que a pergunta mais importa.
  try {
    $r = Invoke-WebRequest -Uri "$BaseUrl/$caminho`?cb=$cb" -UseBasicParsing -TimeoutSec 60
    $noAr = $r.Content
  } catch {
    $codigo = try { [int]$_.Exception.Response.StatusCode } catch { 0 }
    if ($codigo -eq 404) { $ausentes += $caminho } else { $erros += "$caminho (HTTP $codigo)" }
    continue
  }

  if ((Hash $noGit) -eq (Hash $noAr)) { $iguais++ } else { $divergentes += $caminho }
}

if (-not $Silencioso) {
  Write-Output ""
  Write-Output "referência : $Ref  ($(& git log -1 --format='%h %s' $Ref))"
  Write-Output "site       : $BaseUrl"
  Write-Output "conferidos : $($alvos.Count) arquivo(s)$(if ($Completo) { '' } else { ' (sentinelas — use -Completo para todos)' })"
  Write-Output ""
  if ($ausentes.Count)    { Write-Output "AUSENTES NO SITE ($($ausentes.Count)) — existem no git e dão 404:"; $ausentes    | ForEach-Object { Write-Output "  ! $_" }; Write-Output "" }
  if ($divergentes.Count) { Write-Output "DESATUALIZADOS ($($divergentes.Count)) — o site serve outra coisa:";  $divergentes | ForEach-Object { Write-Output "  ! $_" }; Write-Output "" }
  if ($erros.Count)       { Write-Output "NÃO CONFERIDOS ($($erros.Count)):";                                   $erros       | ForEach-Object { Write-Output "  ~ $_" }; Write-Output "" }
}

$problemas = $ausentes.Count + $divergentes.Count
if ($problemas -eq 0 -and $erros.Count -eq 0) {
  Write-Output "ATUALIZADO — os $iguais arquivos conferidos são idênticos aos de $Ref."
  exit 0
}
if ($problemas -eq 0) {
  Write-Output "PROVAVELMENTE ATUALIZADO — $iguais idênticos, mas $($erros.Count) não puderam ser conferidos."
  exit 0
}
Write-Output "DESATUALIZADO — $problemas de $($alvos.Count) arquivo(s) fora de dia. Publique e rode de novo."
exit 1
