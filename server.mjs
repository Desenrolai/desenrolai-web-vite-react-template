import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const PORT = Number(process.env.PORT ?? 8080);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost`);
  const filePath = path.join(DIST, url.pathname);

  const tryFile = (fp) => {
    try {
      const stat = fs.statSync(fp);
      if (stat.isFile()) return fp;
    } catch {
      // not found
    }
    return null;
  };

  const resolved =
    tryFile(filePath) ??
    tryFile(path.join(filePath, "index.html")) ??
    path.join(DIST, "index.html");

  const ext = path.extname(resolved);
  const contentType = MIME[ext] ?? "application/octet-stream";

  fs.readFile(resolved, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  process.stdout.write(`Server listening on port ${PORT}\n`);
});
