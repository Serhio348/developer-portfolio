import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const isRailway = Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_ENVIRONMENT_ID)

function run(command) {
  execSync(command, { stdio: 'inherit', cwd: root })
}

if (!isRailway) {
  run('node scripts/generate-cv-pdf.mjs')
} else {
  const pdfPaths = ['public/cv/CV_RU.pdf', 'public/cv/CV_EN.pdf']

  for (const pdfPath of pdfPaths) {
    if (!existsSync(join(root, pdfPath))) {
      throw new Error(`Missing ${pdfPath}. Commit CV PDFs or run npm run generate:cv locally.`)
    }
  }

  console.log('Skipping CV PDF generation on Railway — using committed files')
}

run('tsc -b')
run('vite build')
