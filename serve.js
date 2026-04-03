const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;
const dir = path.dirname(__filename);
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg' };
http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url;
  const fp = path.join(dir, file);
  const ext = path.extname(fp);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/html' });
    res.end(data);
  });
}).listen(port, () => console.log(`Serving on ${port}`));
