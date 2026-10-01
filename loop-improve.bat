@echo off
REM Self-improvement outer loop for OpenCode (Windows cmd.exe).
REM Usage: loop-improve.bat "your goal" [max_iters] [verify_dir]
REM Example: loop-improve.bat "Reduce bundle size, keep build green" 5 sanskritisetu-prototype
setlocal EnableDelayedExpansion

if "%~1"=="" (
  echo Usage: loop-improve.bat "goal" [max_iters] [verify_dir]
  exit /b 1
)
set "GOAL=%~1"
set "MAX=%~2"
if "%MAX%"=="" set "MAX=5"
set "VDIR=%~3"
if "%VDIR%"=="" set "VDIR=sanskritisetu-prototype"

echo [loop] goal: %GOAL%
echo [loop] max: %MAX% verify_dir: %VDIR%

for /L %%i in (1,1,%MAX%) do (
  echo.
  echo ===== Iter %%i of %MAX% =====
  opencode run --command loop-improve "!GOAL! (outer iteration %%i of %MAX%)" > ".opencode\loop-last.txt" 2>&1
  type ".opencode\loop-last.txt"
  findstr /C:"LOOP_DONE" ".opencode\loop-last.txt" >nul
  if !errorlevel! EQU 0 (
    echo [loop] LOOP_DONE at iter %%i
    goto :verify
  )
  findstr /C:"LOOP_BLOCKED" ".opencode\loop-last.txt" >nul
  if !errorlevel! EQU 0 (
    echo [loop] blocked, stopping.
    exit /b 2
  )
)

:verify
echo.
echo [loop] final verify: npm run build in %VDIR%
call npm run build --prefix "%VDIR%"
if %errorlevel% EQU 0 (
  echo [loop] VERIFY PASS
  exit /b 0
) else (
  echo [loop] VERIFY FAIL
  exit /b 1
)
