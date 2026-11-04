#!/bin/bash
cd /Users/bernardowatts/Desktop/Tese-Prototipo
export PATH="/opt/homebrew/bin:$PATH"
exec npm run dev -- --port "${PORT:-5173}" --strictPort
