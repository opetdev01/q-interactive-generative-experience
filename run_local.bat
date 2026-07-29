@echo off
title OPET Studios - Interactive Media City Experience
echo =========================================================
echo   OPET Studios - Launching Local Interactive Experience
echo =========================================================
echo.

if not exist node_modules (
    echo Installing required project dependencies...
    call npm install
)

if not exist dist (
    echo Building local production bundle...
    call npm run build
)

echo.
echo Starting high-performance local server...
echo Experience will open automatically in your browser...
echo.

start http://localhost:4173
call npm run preview -- --host --port 4173
pause
