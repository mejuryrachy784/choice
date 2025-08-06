@echo off
echo Starting Choice Backend Server...
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Installing/checking dependencies...
call npm install
echo.
echo Starting server...
call npm start
pause