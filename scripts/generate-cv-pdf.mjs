import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mdToPdf } from 'md-to-pdf'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outputDir = join(root, 'public', 'cv')
const stylesheet = join(root, 'scripts', 'cv-pdf.css')

const CV_META = {
  ru: {
    name: 'Сидорович Сергей Юрьевич',
    role: 'Full-stack разработчик',
    contacts: 'serhiosidorovich@gmail.com · @siarhei_brest348 · github.com/Serhio348',
    pageLabel: 'Стр.',
  },
  en: {
    name: 'Siarhei Sidarovich',
    role: 'Full-stack Developer',
    contacts: 'serhiosidorovich@gmail.com · @siarhei_brest348 · github.com/Serhio348',
    pageLabel: 'Page',
  },
}

const sources = [
  {
    input: join(root, 'content', 'CV_RU.md'),
    output: join(outputDir, 'CV_RU.pdf'),
    locale: 'ru',
  },
  {
    input: join(root, 'content', 'CV_EN.md'),
    output: join(outputDir, 'CV_EN.pdf'),
    locale: 'en',
  },
]

function buildHeaderTemplate(meta) {
  return `<style>
    section {
      width: 100%;
      margin: 0;
      padding: 0 12mm;
      font-family: Inter, Arial, Helvetica, sans-serif;
      font-size: 8px;
      color: #6b7280;
      line-height: 1.2;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cv-running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-bottom: 3px;
      border-bottom: 1px solid rgba(91, 124, 250, 0.2);
    }
    .cv-running-name {
      color: #111827;
      font-weight: 700;
      font-size: 8.6px;
      letter-spacing: -0.02em;
    }
    .cv-running-role {
      color: #5b7cfa;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-size: 7.2px;
    }
  </style>
  <section>
    <div class="cv-running-header">
      <span class="cv-running-name">${meta.name}</span>
      <span class="cv-running-role">${meta.role}</span>
    </div>
  </section>`
}

function buildFooterTemplate(meta) {
  return `<style>
    section {
      width: 100%;
      margin: 0;
      padding: 0 12mm;
      font-family: Inter, Arial, Helvetica, sans-serif;
      font-size: 7px;
      color: #6b7280;
      line-height: 1.2;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cv-running-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-top: 3px;
      border-top: 1px solid rgba(91, 124, 250, 0.2);
    }
    .cv-running-page {
      color: #111827;
      font-weight: 600;
      white-space: nowrap;
    }
  </style>
  <section>
    <div class="cv-running-footer">
      <span>${meta.contacts}</span>
      <span class="cv-running-page">${meta.pageLabel} <span class="pageNumber"></span> / <span class="totalPages"></span></span>
    </div>
  </section>`
}

await mkdir(outputDir, { recursive: true })

for (const source of sources) {
  const meta = CV_META[source.locale]
  const pdf = await mdToPdf(
    { path: source.input },
    {
      basedir: root,
      stylesheet,
      pdf_options: {
        format: 'A4',
        margin: {
          top: '22mm',
          right: '0',
          bottom: '22mm',
          left: '0',
        },
        printBackground: true,
        headerTemplate: buildHeaderTemplate(meta),
        footerTemplate: buildFooterTemplate(meta),
      },
    },
  )

  if (!pdf.content) {
    throw new Error(`Failed to generate PDF for ${source.input}`)
  }

  await writeFile(source.output, pdf.content)
  console.log(`Generated ${source.output}`)
}
