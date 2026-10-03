import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
};

function resolveFilePath(requestPath) {
  if (requestPath === '/') return join(root, 'index.html');
  if (requestPath === '/favicon.svg') return join(root, 'public', 'favicon.svg');
  if (requestPath === '/manus-routes.json') return join(root, 'public', 'manus-routes.json');
  if (requestPath === '/resume.pdf') return join(root, 'public', 'resume.pdf');
  return join(root, requestPath.replace(/^\/+/, ''));
}

const server = createServer(async (request, response) => {
  const requestPath = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`).pathname;
  const filePath = resolveFilePath(requestPath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  try {
    const file = await readFile(filePath);
    const contentType = mimeTypes[extname(filePath)] || 'application/octet-stream';
    response.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
    });
    response.end(file);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Pavan Kalyan portfolio listening on http://0.0.0.0:${port}`);
});
