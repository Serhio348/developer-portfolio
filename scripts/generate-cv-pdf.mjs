import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mdToPdf } from 'md-to-pdf'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outputDir = join(root, 'public', 'cv')
const stylesheet = join(root, 'scripts', 'cv-pdf.css')

const sources = [
  { input: join(root, 'content', 'CV_RU.md'), output: join(outputDir, 'CV_RU.pdf') },
  { input: join(root, 'content', 'CV_EN.md'), output: join(outputDir, 'CV_EN.pdf') },
]

await mkdir(outputDir, { recursive: true })

for (const source of sources) {
  const pdf = await mdToPdf(
    { path: source.input },
    {
      basedir: root,
      stylesheet,
      pdf_options: {
        format: 'A4',
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },
        printBackground: true,
      },
    },
  )

  if (!pdf.content) {
    throw new Error(`Failed to generate PDF for ${source.input}`)
  }

  await writeFile(source.output, pdf.content)
  console.log(`Generated ${source.output}`)
}
