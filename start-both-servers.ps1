# PowerShell script to start both frontend and backend servers

Write-Host "🚀 Starting Driving License Quiz Application..." -ForegroundColor Green
Write-Host ""

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# Check if ports are already in use
$backendPort = 5001
$frontendPort = 5174

if (Test-Port $backendPort) {
    Write-Host "⚠️ Backend port $backendPort is already in use" -ForegroundColor Yellow
} else {
    Write-Host "✅ Backend port $backendPort is available" -ForegroundColor Green
}

if (Test-Port $frontendPort) {
    Write-Host "⚠️ Frontend port $frontendPort might be in use" -ForegroundColor Yellow
} else {
    Write-Host "✅ Frontend port $frontendPort is available" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Cyan

# Start backend in a new PowerShell window
$backendPath = Join-Path $PSScriptRoot "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$backendPath'; Write-Host '🔧 Backend Server Starting...' -ForegroundColor Cyan; node server.js"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Magenta

# Start frontend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot'; Write-Host '🎨 Frontend Server Starting...' -ForegroundColor Magenta; npm run dev"

# Wait a moment
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "🎉 Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:5174" -ForegroundColor Blue
Write-Host "🔧 Backend:  http://localhost:5001" -ForegroundColor Blue
Write-Host ""
Write-Host "🔍 Debug Tools:" -ForegroundColor Yellow
Write-Host "   • Login Debug: http://localhost:5174/login-debug" -ForegroundColor Gray
Write-Host "   • Test Connection: http://localhost:5174/test-connection" -ForegroundColor Gray
Write-Host ""
Write-Host "👤 Test Credentials:" -ForegroundColor Yellow
Write-Host "   • Demo User: demo@example.com / demo123" -ForegroundColor Gray
Write-Host "   • Admin User: admin@example.com / admin123" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")