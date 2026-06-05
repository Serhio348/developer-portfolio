import { createReadStream, existsSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))
const distDir = join(root, 'dist')
const port = Number(process.env.PORT || 3000)

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

createServer((request, response) => {
  const pathname = new URL(request.url || '/', `http://${request.headers.host}`).pathname
  const safePath = pathname === '/' ? '/index.html' : pathname
  const filePath = join(distDir, safePath)
  const fallbackPath = join(distDir, 'index.html')
  const targetPath = existsSync(filePath) ? filePath : fallbackPath
  const contentType = contentTypes[extname(targetPath)] || 'application/octet-stream'

  response.writeHead(200, { 'Content-Type': contentType })
  createReadStream(targetPath).pipe(response)
}).listen(port, () => {
  console.log(`Portfolio server listening on port ${port}`)
})
