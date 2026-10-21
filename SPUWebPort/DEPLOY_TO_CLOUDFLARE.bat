@echo off
chcp 65001 > nul
title Deploy SPU ICT Portfolio to Cloudflare
cls
echo ========================================================
echo   SPU ICT Web Portfolio - One-Click Cloudflare Deployer
echo   Project Name: natthapon-min
echo   Target URL: https://natthapon-min.pages.dev
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/4] Checking Node.js and Wrangler...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Node.js not detected in current PATH. Adding standard path...
    set "PATH=%PATH%;C:\Program Files\nodejs"
)

echo [2/4] Authenticating with Cloudflare...
echo.
echo Browser will open. Please click "Allow" or "Authorize" to connect your Cloudflare account.
echo.
call npx wrangler login
if %errorlevel% neq 0 (
    echo.
    echo [!] Login failed or was cancelled. Please try again.
    pause
    exit /b %errorlevel%
)

echo.
echo [3/4] Creating D1 Database and setting up tables...
call npx wrangler d1 create spu-portfolio-db
call npx wrangler d1 execute spu-portfolio-db --file=./schema.sql --yes
call npx wrangler r2 bucket create spu-portfolio-assets >nul 2>&1

echo.
echo [4/4] Deploying SPUWebPort folder to Cloudflare Pages...
call npx wrangler pages deploy . --project-name natthapon-min

echo.
echo ========================================================
echo   DEPLOYMENT SUCCESSFUL!
echo   Your website is now LIVE at:
echo   https://natthapon-min.pages.dev
echo ========================================================
echo.
pause
