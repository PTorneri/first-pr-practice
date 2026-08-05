# Serve a RAIZ do repositório, não a pasta de um app.
#
# O v2 (vestibular-direito-v2) carrega o conteúdo compartilhado do v1 por
# caminhos como ../vestibular-direito/data/bundle.js — isso só resolve se o
# servidor enxergar as duas pastas. Em produção (GitHub Pages) já é assim,
# porque as duas moram no mesmo site; aqui reproduzimos o mesmo arranjo.
#
#   v1 -> http://localhost:8844/vestibular-direito/
#   v2 -> http://localhost:8844/vestibular-direito-v2/
#
# (vestibular-direito/serve.ps1 continua existindo pra rodar só o v1 na 8843.)

$root = $PSScriptRoot
# 8844 é o padrão; $env:PORT permite subir uma segunda instância sem conflito
# quando a 8844 já está ocupada.
$port = if ($env:PORT) { [int]$env:PORT } else { 8844 }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port/"
Write-Host "  v1 -> http://localhost:$port/vestibular-direito/"
Write-Host "  v2 -> http://localhost:$port/vestibular-direito-v2/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".pdf"  = "application/pdf"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $req = $context.Request
  $res = $context.Response
  try {
    $localPath = [System.Uri]::UnescapeDataString($req.Url.LocalPath)
    if ($localPath -eq "/") { $localPath = "/index.html" }
    if ($localPath.EndsWith("/")) { $localPath = $localPath + "index.html" }
    $filePath = Join-Path $root ($localPath.TrimStart("/"))
    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath)
      $contentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $res.ContentType = $contentType
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("Not found: $localPath")
      $res.OutputStream.Write($msg, 0, $msg.Length)
    }
  } catch {
    $res.StatusCode = 500
  } finally {
    $res.OutputStream.Close()
  }
}
