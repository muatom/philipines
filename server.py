import http.server
import socketserver
import os
import sys

port = int(os.environ.get('PORT', 8080))
docroot = os.path.dirname(os.path.abspath(__file__))
os.chdir(docroot)

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=docroot, **kwargs)

with socketserver.TCPServer(("", port), Handler) as httpd:
    print(f"Serving {docroot} on port {port}", flush=True)
    httpd.serve_forever()
