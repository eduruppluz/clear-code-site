@echo off
title Clear Code ERL - servidor local
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js nao encontrado. Instale a versao LTS em https://nodejs.org e rode este arquivo de novo.
  echo.
  pause
  exit /b
)
if not exist node_modules (
  echo Instalando dependencias - so na primeira vez...
  call npm install
)
echo.
echo  Abrindo o site em http://localhost:5173  -  feche esta janela para parar.
echo.
call npm run dev
pause
