@echo off
title OPET Studios - Local Dev Launcher
echo Starting local development server...
if not exist node_modules (
    call npm install
)
call npm run dev -- --open
pause
