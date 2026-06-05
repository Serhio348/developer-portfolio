import { createReadStream, existsSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleChatStream, handleHealth } from './api/chatHandler.js'
import { config } from './api/config.js'

const root = fileURLToPath(new URL('.', import.meta.url))
const distDir = join(root, 'dist')

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

function serveStatic(pathname, response) {
  const safePath = pathname === '/' ? '/index.html' : pathname
  const filePath = join(distDir, safePath)
  const fallbackPath = join(distDir, 'index.html')
  const targetPath = existsSync(filePath) ? filePath : fallbackPath

  if (!existsSync(targetPath)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
    return
  }

  const contentType = contentTypes[extname(targetPath)] || 'application/octet-stream'
  response.writeHead(200, { 'Content-Type': contentType })
  createReadStream(targetPath).pipe(response)
}

createServer(async (request, response) => {
  const pathname = new URL(request.url || '/', `http://${request.headers.host}`).pathname

  if (pathname === '/api/health') {
    await handleHealth(request, response)
    return
  }

  if (pathname === '/api/chat/stream') {
    await handleChatStream(request, response)
    return
  }

  serveStatic(pathname, response)
}).listen(config.port, () => {
  console.log(`Portfolio server listening on port ${config.port}`)
})
