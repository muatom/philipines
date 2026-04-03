#!/bin/bash
cd "$(dirname "$0")"
PORT=${PORT:-8080}
python3 -c "
import http.server, socketserver, os
os.chdir('/Users/tommuallembarner/Desktop/Projects/claude code/philipines')
handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(('', $PORT), handler) as httpd:
    print('Server running on port $PORT')
    httpd.serve_forever()
"
