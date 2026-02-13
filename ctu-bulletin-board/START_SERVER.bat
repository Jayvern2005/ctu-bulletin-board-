@echo off
echo ========================================
echo CTU Digital Bulletin Board
echo Starting Local Server...
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Starting server with Python...
    echo.
    echo Display: http://localhost:8000/display/
    echo Admin:   http://localhost:8000/admin/
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else (
    REM Check if PHP is installed
    php --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Starting server with PHP...
        echo.
        echo Display: http://localhost:8000/display/
        echo Admin:   http://localhost:8000/admin/
        echo.
        echo Press Ctrl+C to stop the server
        echo.
        php -S localhost:8000
    ) else (
        echo ERROR: Neither Python nor PHP is installed!
        echo.
        echo Please install one of the following:
        echo  - Python: https://www.python.org/downloads/
        echo  - PHP: https://www.php.net/downloads.php
        echo.
        echo Or use VS Code with Live Server extension
        pause
    )
)
