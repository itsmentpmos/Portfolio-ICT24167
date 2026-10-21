# server.ps1 - Native Windows PowerShell HTTP Static File Server
param (
    [int]$Port = 3000
)

$rootDir = $PSScriptRoot
if (-not $rootDir) {
    $rootDir = Get-Location
}

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"

try {
    $listener.Prefixes.Add($prefix)
    $listener.Start()
} catch {
    # If 3000 is taken, fallback to 8080
    $Port = 8080
    $prefix = "http://localhost:$Port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " SPU ICT Web Portfolio - Localhost Server Started! " -ForegroundColor Green
Write-Host " URL: $prefix" -ForegroundColor Yellow
Write-Host " Root Directory: $rootDir" -ForegroundColor Gray
Write-Host " Press Ctrl+C in this terminal to stop the server." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

# Open default browser
try {
    Start-Process $prefix
} catch {}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".webp" = "image/webp"
    ".pdf"  = "application/pdf"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "index.html"
        }

        # Normalize path
        $safePath = $urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $filePath = [System.IO.Path]::Combine($rootDir, $safePath)

        if (Test-Path -Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = $mimeTypes[$ext]
            if (-not $mime) {
                $mime = "application/octet-stream"
            }

            $response.ContentType = $mime
            $response.StatusCode = 200
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $response.ContentType = "text/html; charset=utf-8"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found: $urlPath</h1>")
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }

        $response.Close()
    } catch {
        # Continue listening on socket error
    }
}
