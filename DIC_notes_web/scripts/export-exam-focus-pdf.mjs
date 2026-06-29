import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { extname, join, resolve } from 'node:path'
import { spawn, spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const examFocusDir = join(root, 'exam-focus')
const generatedPage = join(examFocusDir, 'pdf.md')
const distDir = join(root, '.vitepress', 'dist')
const publicPdf = join(root, 'public', 'pdf', 'dic-exam-focus.pdf')
const distPdf = join(distDir, 'pdf', 'dic-exam-focus.pdf')

const sourcePages = [
  'part1_introduction_history_fundamentals.md',
  'part2_simulations_layout.md',
  'part3_analog_digital_blocks.md',
  'part4_exam_preparation.md'
]

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n/, '')
}

function buildPdfPage() {
  const parts = sourcePages.map((file, index) => {
    const body = stripFrontmatter(readFileSync(join(examFocusDir, file), 'utf8')).trim()
    const pageBreak = index === 0 ? '' : '\n\n<div class="pdf-page-break"></div>\n\n'
    return `${pageBreak}${body}\n`
  })

  const content = `---
title: DIC Exam Focus PDF
aside: false
sidebar: false
prev: false
next: false
lastUpdated: false
---

# DIC Exam Focus PDF

> 这份 PDF 由 Exam Focus 四个 part 自动合并生成，适合离线阅读和打印。

${parts.join('\n')}
`

  writeFileSync(generatedPage, content)
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: false
  })

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed`)
  }
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    'google-chrome',
    'chromium',
    'chromium-browser'
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (candidate.startsWith('/')) {
      if (existsSync(candidate)) return candidate
      continue
    }

    const found = spawnSync('which', [candidate], { encoding: 'utf8' })
    if (found.status === 0 && found.stdout.trim()) {
      return found.stdout.trim()
    }
  }

  throw new Error('Chrome/Chromium was not found. Set CHROME_PATH to your Chrome executable.')
}

function contentType(filePath) {
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.woff2': 'font/woff2',
    '.pdf': 'application/pdf'
  }
  return types[extname(filePath)] || 'application/octet-stream'
}

function serveDist() {
  const server = createServer((request, response) => {
    const url = new URL(request.url || '/', 'http://127.0.0.1')
    const requestedPath = decodeURIComponent(url.pathname)
    let filePath = join(distDir, requestedPath)

    if (requestedPath.endsWith('/')) {
      filePath = join(distDir, requestedPath, 'index.html')
    }

    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      response.writeHead(404)
      response.end('Not found')
      return
    }

    response.writeHead(200, { 'Content-Type': contentType(filePath) })
    response.end(readFileSync(filePath))
  })

  return new Promise((resolveServer) => {
    server.listen(0, '127.0.0.1', () => resolveServer(server))
  })
}

async function printPdf(server) {
  const chrome = findChrome()
  const { port } = server.address()
  const chromeProfile = mkdtempSync(join(tmpdir(), 'dic-exam-focus-pdf-'))
  const url = `http://127.0.0.1:${port}/exam-focus/pdf.html`

  mkdirSync(join(root, 'public', 'pdf'), { recursive: true })
  mkdirSync(join(distDir, 'pdf'), { recursive: true })
  rmSync(publicPdf, { force: true })
  rmSync(distPdf, { force: true })

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--disable-background-networking',
    '--disable-component-update',
    '--no-first-run',
    '--no-default-browser-check',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=8000',
    '--no-pdf-header-footer',
    '--print-to-pdf-no-header',
    `--user-data-dir=${chromeProfile}`,
    `--print-to-pdf=${publicPdf}`,
    url
  ]

  await new Promise((resolvePrint, rejectPrint) => {
    let pdfIsReady = false
    let previousSize = 0
    let stableTicks = 0
    const child = spawn(chrome, args, { stdio: 'inherit' })

    const interval = setInterval(() => {
      if (!existsSync(publicPdf)) return

      const size = statSync(publicPdf).size
      if (size > 0 && size === previousSize) stableTicks += 1
      else stableTicks = 0

      previousSize = size

      if (stableTicks >= 2) {
        pdfIsReady = true
        clearInterval(interval)
        child.kill('SIGTERM')
        setTimeout(() => child.kill('SIGKILL'), 2000).unref()
      }
    }, 1000)

    child.on('exit', (code) => {
      clearInterval(interval)
      if (code === 0 || pdfIsReady) resolvePrint()
      else rejectPrint(new Error(`Chrome exited with code ${code}`))
    })
  })

  copyFileSync(publicPdf, distPdf)
  rmSync(chromeProfile, { recursive: true, force: true })
}

async function main() {
  buildPdfPage()
  run('npm', ['run', 'build'])

  const server = await serveDist()
  try {
    await printPdf(server)
  } finally {
    server.close()
  }

  console.log(`PDF written to ${publicPdf}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
