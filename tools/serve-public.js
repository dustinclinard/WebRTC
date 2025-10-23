#!/usr/bin/env node
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const dir = process.argv[2] || path.resolve(__dirname, '..', 'public');
const port = Number(process.argv[3] || process.env.STATIC_PORT || 8080);

const server = http.createServer((req, res) => {
  const u = new URL(req.url, `http://localhost`);
  const filePath = path.join(dir, decodeURIComponent(u.pathname.replace(/\.+/g, '.')).replace(/\.\./g, ''));
  let fp = filePath;
  if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) {
    fp = path.join(fp, 'index.html');
  }
  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404, {'content-type':'text/plain; charset=utf-8'});
      res.end('not found');
      return;
    }
    const ext = path.extname(fp).slice(1);
    const m = { html:'text/html', js:'text/javascript', css:'text/css', json:'application/json' }[ext] || 'text/plain';
    res.writeHead(200, {'content-type': m + '; charset=utf-8'});
    res.end(data);
  });
});
server.listen(port, () => {
  console.log(`[static] serving ${dir} at http://localhost:${port}/`);
});
