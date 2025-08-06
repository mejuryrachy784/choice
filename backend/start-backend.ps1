# PowerShell script to start the backend
Write-Host "🚀 Starting Choice Backend Server..." -ForegroundColor Green
Write-Host ""

# Change to backend directory
Set-Location $PSScriptRoot
Write-Host "📁 Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
    npm install
    Write-Host ""
}

# Start the server
Write-Host "🔥 Starting server..." -ForegroundColor Green
Write-Host "🌐 Server will be available at: http://localhost:5001" -ForegroundColor Cyan
Write-Host "⏹️  Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm start