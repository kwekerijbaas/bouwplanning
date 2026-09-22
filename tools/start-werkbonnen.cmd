@echo off
REM Start de werkbonnen-app lokaal, zonder Supabase en zonder internet.
REM Dubbelklik dit bestand; het browservenster gaat na een paar tellen vanzelf open.
REM Stoppen: dit venster sluiten of Ctrl+C.
cd /d "%~dp0.."
where node >nul 2>&1 || (echo Node.js is niet gevonden - installeer het van https://nodejs.org & pause & exit /b 1)
set "URL=http://localhost:8787/werkbonnen.html?api=http%%3A%%2F%%2Flocalhost%%3A8787%%2Fapi"
start "" cmd /c "timeout /t 3 /nobreak >nul & start %URL%"
echo.
echo   Werkbonnen draait zo op http://localhost:8787/werkbonnen.html
echo   Codes: bon2026 = werkvloer, admin2026 = kantoor
echo   Voorbeelddata: week 35 Drietorensweg (KZ-factuur 2026265).
echo.
node tools\werkbonnen-mock.js --seed
pause
