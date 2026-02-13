#!/bin/bash

echo "========================================"
echo "CTU Digital Bulletin Board"
echo "Starting Local Server..."
echo "========================================"
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "Starting server with Python 3..."
    echo ""
    echo "Display: http://localhost:8000/display/"
    echo "Admin:   http://localhost:8000/admin/"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Starting server with Python..."
    echo ""
    echo "Display: http://localhost:8000/display/"
    echo "Admin:   http://localhost:8000/admin/"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8000
elif command -v php &> /dev/null; then
    echo "Starting server with PHP..."
    echo ""
    echo "Display: http://localhost:8000/display/"
    echo "Admin:   http://localhost:8000/admin/"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    php -S localhost:8000
else
    echo "ERROR: Neither Python nor PHP is installed!"
    echo ""
    echo "Please install one of the following:"
    echo " - Python: https://www.python.org/downloads/"
    echo " - PHP: https://www.php.net/downloads.php"
    echo ""
    echo "Or use a text editor with live server capability"
    exit 1
fi
