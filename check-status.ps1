# Status Check Script for Choice Project
Write-Host "🔍 Checking Choice Project Status..." -ForegroundColor Green
Write-Host ""

# Check Backend (Port 5001)
Write-Host "🔧 Checking Backend Server (Port 5001)..." -ForegroundColor Yellow
try {
    $backendResponse = Invoke-WebRequest -Uri "http://localhost:5001" -UseBasicParsing -TimeoutSec 5
    if ($backendResponse.StatusCode -eq 200) {
        Write-Host "✅ Backend is running successfully!" -ForegroundColor Green
        Write-Host "   📍 URL: http://localhost:5001" -ForegroundColor Cyan
        
        # Parse the JSON response to show available endpoints
        $backendData = $backendResponse.Content | ConvertFrom-Json
        Write-Host "   📋 Available Endpoints:" -ForegroundColor Blue
        Write-Host "      • Auth: $($backendData.endpoints.auth)" -ForegroundColor White
        Write-Host "      • Quiz: $($backendData.endpoints.quiz)" -ForegroundColor White
        Write-Host "      • Results: $($backendData.endpoints.results)" -ForegroundColor White
        Write-Host "      • Dashboard: $($backendData.endpoints.dashboard)" -ForegroundColor White
        Write-Host "      • History: $($backendData.endpoints.history)" -ForegroundColor White
        Write-Host "      • Instructions: $($backendData.endpoints.instructions)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Backend is not running!" -ForegroundColor Red
    Write-Host "   💡 Try running: cd backend && npm start" -ForegroundColor Yellow
}

Write-Host ""

# Check Frontend (Port 5173)
Write-Host "🎨 Checking Frontend Server (Port 5173)..." -ForegroundColor Yellow
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing -TimeoutSec 5
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "✅ Frontend is running successfully!" -ForegroundColor Green
        Write-Host "   📍 URL: http://localhost:5173" -ForegroundColor Cyan
        Write-Host "   🌐 Open this URL in your browser to access the app" -ForegroundColor Blue
    }
} catch {
    Write-Host "❌ Frontend is not running!" -ForegroundColor Red
    Write-Host "   💡 Try running: npm run dev" -ForegroundColor Yellow
}

Write-Host ""

# Check Node.js processes
Write-Host "🔍 Active Node.js Processes:" -ForegroundColor Yellow
$nodeProcesses = Get-Process | Where-Object {$_.ProcessName -eq "node"}
if ($nodeProcesses) {
    foreach ($process in $nodeProcesses) {
        Write-Host "   • PID: $($process.Id) | Memory: $([math]::Round($process.WorkingSet64/1MB, 2)) MB" -ForegroundColor White
    }
} else {
    Write-Host "   ⚠️  No Node.js processes found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Status check complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Quick Access Links:" -ForegroundColor Cyan
Write-Host "   🎯 Frontend App: http://localhost:5173" -ForegroundColor Blue
Write-Host "   🔧 Backend API: http://localhost:5001" -ForegroundColor Blue
Write-Host "   📊 API Health: http://localhost:5001/" -ForegroundColor Blue
Write-Host ""
Write-Host "🛑 To stop servers: Press Ctrl+C in the terminal windows" -ForegroundColor Red