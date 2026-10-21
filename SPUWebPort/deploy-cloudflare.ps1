# deploy-cloudflare.ps1
# Automated deployment script for Cloudflare Pages, D1 Database, and R2 Storage
# Project: SPU ICT Portfolio (natthapon-min)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Cloudflare Pages & D1 Database Deployment Setup" -ForegroundColor Green
Write-Host " Project Name: natthapon-min" -ForegroundColor Yellow
Write-Host " Live Domain: https://natthapon-min.pages.dev" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Verify Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[!] Node.js is not found in PATH. Please ensure Node.js is installed." -ForegroundColor Red
    exit 1
}

# 2. Check Wrangler CLI
Write-Host "`n[1/5] Checking Wrangler CLI..." -ForegroundColor Cyan
$wranglerCmd = "npx.cmd wrangler"

# 3. Authenticate with Cloudflare
Write-Host "`n[2/5] Checking Cloudflare Authentication..." -ForegroundColor Cyan
$whoami = cmd /c npx wrangler whoami 2>&1
if ($whoami -match "Error" -or $whoami -match "not logged in" -or $whoami -match "No Cloudflare account") {
    Write-Host "Please login to your Cloudflare account in the browser that opens..." -ForegroundColor Yellow
    cmd /c npx wrangler login
} else {
    Write-Host "Logged in to Cloudflare successfully!" -ForegroundColor Green
}

# 4. Create & Initialize D1 Database
Write-Host "`n[3/5] Setting up Cloudflare D1 Database (spu-portfolio-db)..." -ForegroundColor Cyan
$d1Output = cmd /c npx wrangler d1 create spu-portfolio-db 2>&1
Write-Host $d1Output

# Extract database_id if created
if ($d1Output -match 'database_id = "([^"]+)"') {
    $dbId = $matches[1]
    Write-Host "Found D1 Database ID: $dbId" -ForegroundColor Green
    
    # Update wrangler.toml with real ID
    (Get-Content .\wrangler.toml) -replace 'database_id = "your-d1-database-id-here"', "database_id = `"$dbId`"" | Set-Content .\wrangler.toml
    Write-Host "Updated wrangler.toml with Database ID!" -ForegroundColor Green
}

# Execute Schema Migration
Write-Host "Executing SQL schema and initial data into D1..." -ForegroundColor Yellow
cmd /c npx wrangler d1 execute spu-portfolio-db --file=./schema.sql --yes

# 5. Create R2 Bucket
Write-Host "`n[4/5] Setting up Cloudflare R2 Storage Bucket..." -ForegroundColor Cyan
cmd /c npx wrangler r2 bucket create spu-portfolio-assets 2>&1

# 6. Deploy to Cloudflare Pages
Write-Host "`n[5/5] Deploying Web Portfolio to Cloudflare Pages..." -ForegroundColor Cyan
cmd /c npx wrangler pages deploy . --project-name natthapon-min

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host " Deployment Complete!" -ForegroundColor Green
Write-Host " Live URL: https://natthapon-min.pages.dev" -ForegroundColor Cyan
Write-Host " Custom Domain Guide:" -ForegroundColor Yellow
Write-Host " 1. Go to Cloudflare Dashboard -> Workers & Pages -> natthapon-min -> Custom Domains"
Write-Host " 2. Click 'Set up a custom domain' to connect any personal domain if desired"
Write-Host " 3. Cloudflare automatically provisions SSL and DNS routing!"
Write-Host "==========================================================" -ForegroundColor Green
