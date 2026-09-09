// Local-only E2E helper: serves frontend/dist and proxies /api/* to a
// locally-running uvicorn API (start it with:
//   CODERPUZZLE_PROBLEMS_DIR=../coderpuzzle-problems/problems \
//   CODERPUZZLE_DATA_DIR=/tmp/coderpuzzle-e2e-data \
//   uvicorn app.main:app --port 8010    (from api/)
// ). No external deps.
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../frontend/dist", import.meta.url));
const API_HOST = "127.0.0.1";
const API_PORT = 8010;

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2" };

http.createServer(async (req, res) => {
  if (req.url.startsWith("/api/")) {
    const upstream = http.request({ host: API_HOST, port: API_PORT, path: req.url.replace(/^\/api/, ""), method: req.method, headers: { ...req.headers, host: `${API_HOST}:${API_PORT}` } }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });
    upstream.on("error", () => {
      if (!res.headersSent) {
        res.writeHead(502);
        res.end("api unreachable");
      }
    });
    req.pipe(upstream);
    return;
  }
  const path = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  // Contain reads inside dist/: resolve the URL path and refuse anything
  // that escapes (an URL like /../../etc/passwd must not serve files).
  const resolved = normalize(join(DIST, path));
  if (resolved !== DIST && !resolved.startsWith(DIST + sep)) {
    res.writeHead(403);
    return res.end("forbidden");
  }
  try {
    const body = await readFile(resolved);
    res.writeHead(200, { "content-type": types[extname(path)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    try {
      const body = await readFile(join(DIST, "index.html"));
      res.writeHead(200, { "content-type": "text/html" });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  }
}).listen(4174, () => console.log("e2e server on http://127.0.0.1:4174"));
