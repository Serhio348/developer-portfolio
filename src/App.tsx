import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import './App.css'

type Language = 'en' | 'ru'
type SlideDirection = 'forward' | 'backward'

const SLIDE_COUNT = 5
const SLIDE_TRANSITION_MS = 920

type ProjectItem = {
  id: string
  featured?: boolean
  eyebrow: Record<Language, string>
  title: Record<Language, string>
  description: Record<Language, string>
  highlights: Record<Language, string[]>
  tags: string[]
  repoUrl: string
  demoUrl?: string
  demoNote?: Record<Language, string>
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'qr-platform',
    featured: true,
    eyebrow: { ru: 'Главный проект', en: 'Featured project' },
    title: {
      ru: 'Платформа QR-идентификации и обслуживания оборудования',
      en: 'QR Equipment Identification and Maintenance Platform',
    },
    description: {
      ru: 'Full-stack платформа для идентификации оборудования, журналов ТО, мониторинга воды, документооборота и AI-диагностики.',
      en: 'Full-stack platform for equipment identification, maintenance tracking, water monitoring, document management, and AI-assisted diagnostics.',
    },
    highlights: {
      ru: [
        'MCP-сервер и веб AI-консультант с tool calling.',
        'QR-карточки, дашборды, архивы и мобильный UI.',
        'Supabase/PostgreSQL, Google Drive и Sheets.',
        'Аналитика воды с корректировкой замены счётчиков.',
      ],
      en: [
        'MCP server and web AI consultant with tool calling.',
        'QR cards, dashboards, archives, and mobile-friendly UI.',
        'Supabase/PostgreSQL, Google Drive and Sheets.',
        'Water analytics with meter replacement correction.',
      ],
    },
    tags: ['React', 'TypeScript', 'Node.js', 'Supabase', 'MCP', 'Railway'],
    repoUrl: 'https://github.com/Serhio348/QR-code-for-equipment-identification',
    demoUrl: 'https://qr-code-for-equipment-identification-production.up.railway.app',
  },
  {
    id: 'employees',
    eyebrow: { ru: 'HR / СИЗ', en: 'HR / PPE' },
    title: { ru: 'Employees', en: 'Employees' },
    description: {
      ru: 'Система учёта сотрудников и СИЗ с веб-приложением и Telegram-ботом: инвентарь, нормы, сроки замены и экспорт личных карточек.',
      en: 'Employee and PPE tracking with a web app and Telegram bot: inventory, norms, replacement deadlines, and personal card export.',
    },
    highlights: {
      ru: [
        'Telegram-бот: сотрудники, выданные СИЗ и сроки замены в чате.',
        'Реестр сотрудников с профессиями и размерами экипировки.',
        'Учёт выдачи СИЗ: выдан / возвращён / списан.',
        'Экспорт личных карточек в PDF и Excel.',
      ],
      en: [
        'Telegram bot: employees, issued PPE, and replacement deadlines in chat.',
        'Employee registry with professions and equipment sizes.',
        'PPE issuance tracking: issued / returned / written off.',
        'Personal card export to PDF and Excel.',
      ],
    },
    tags: ['React', 'TypeScript', 'Telegram', 'Ant Design', 'Prisma', 'PostgreSQL', 'JWT'],
    repoUrl: 'https://github.com/Serhio348/Employees',
    demoUrl: 'https://employees-production-c5df.up.railway.app',
    demoNote: {
      ru: 'Демо по запросу — защита персональных данных',
      en: 'Demo on request — personal data protected',
    },
  },
  {
    id: 'osmos-modbus',
    eyebrow: { ru: 'Промышленный IoT', en: 'Industrial IoT' },
    title: { ru: 'osmos-modbus-service', en: 'osmos-modbus-service' },
    description: {
      ru: 'Микросервис мониторинга установки обратного осмоса: опрос Weintek HMI по Modbus TCP, REST API и веб-дашборд с HMI, схемой и архивом.',
      en: 'Reverse osmosis plant monitoring microservice: Weintek HMI polling over Modbus TCP, REST API, and a web dashboard with HMI, flow diagram, and history.',
    },
    highlights: {
      ru: [
        'Modbus TCP poller с блочным чтением регистров и coils.',
        'REST API: live-снимок, health ok/degraded/down, архив метрик.',
        'Дашборд: SVG HMI, React Flow, таблица, графики Recharts.',
        'TimescaleDB, Docker Compose и Nginx на VPS.',
      ],
      en: [
        'Modbus TCP poller with block reads of registers and coils.',
        'REST API: live snapshot, health ok/degraded/down, metrics archive.',
        'Dashboard: SVG HMI, React Flow, table, and Recharts charts.',
        'TimescaleDB, Docker Compose, and Nginx on VPS.',
      ],
    },
    tags: ['Modbus TCP', 'Node.js', 'TypeScript', 'React', 'TimescaleDB', 'Docker', 'IoT'],
    repoUrl: 'https://github.com/Serhio348/osmos-modbus-service',
    demoNote: {
      ru: 'Демо по запросу — внутренняя промышленная сеть',
      en: 'Demo on request — internal industrial network',
    },
  },
]

const PROFILE = {
  name: 'Siarhei Sidarovich',
  locationRu: 'Брест, Беларусь',
  locationEn: 'Brest, Belarus',
  email: 'serhiosidorovich@gmail.com',
  telegram: 'https://t.me/siarhei_brest348',
  telegramHandle: '@siarhei_brest348',
  githubUrl: 'https://github.com/Serhio348',
  liveDemoUrl: 'https://qr-code-for-equipment-identification-production.up.railway.app',
  employeesDemoUrl: 'https://employees-production-c5df.up.railway.app',
  educationRu: 'Высшее образование, автоматизация промышленных установок, 2009',
  educationEn: 'Higher education in industrial automation, 2009',
  languagesRu: 'Русский — родной, английский — B1, итальянский — B2',
  languagesEn: 'Russian — native, English — B1, Italian — B2',
  workFormatRu: 'Офис / удалёнка / гибрид',
  workFormatEn: 'Onsite / remote / hybrid',
}

type Content = {
  nav: string[]
  languageLabel: string
  badge: string
  title: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  githubCta: string
  aboutTitle: string
  about: string
  mcpEyebrow: string
  mcpTitle: string
  mcpDescription: string
  mcpPoints: string[]
  telegramEyebrow: string
  telegramTitle: string
  telegramDescription: string
  telegramPoints: string[]
  projectsEyebrow: string
  projectsTitle: string
  projectsSubtitle: string
  stackTitle: string
  stack: string[]
  demoTitle: string
  demoDescription: string
  demoItems: string[][]
  cvTitle: string
  cvDescription: string
  cvRu: string
  cvEn: string
  projectRepoCta: string
  liveDemoCta: string
  contactTitle: string
  contactDescription: string
  prevSlide: string
  nextSlide: string
}

const content: Record<Language, Content> = {
  en: {
    nav: ['Home', 'About', 'Projects', 'Stack', 'Contact'],
    languageLabel: 'RU',
    badge: 'Full-stack Developer',
    title: 'Production-grade web apps with AI, automation, and real business value.',
    subtitle:
      'I build MCP servers that connect AI agents to Google Drive, Sheets, and production data — plus full-stack apps on React, TypeScript, Node.js, and Supabase.',
    primaryCta: 'View projects',
    secondaryCta: 'Download CV',
    githubCta: 'GitHub',
    aboutTitle: 'About',
    about:
      'Full-stack developer focused on business automation, AI integrations, and production-ready web systems on React, TypeScript, Node.js, and Supabase/PostgreSQL.',
    mcpEyebrow: 'MCP servers',
    mcpTitle: 'Model Context Protocol — AI agents connected to real data',
    mcpDescription:
      'MCP (Model Context Protocol) is the open standard for connecting AI assistants to external tools and data. I build typed MCP servers so agents in Cursor and Claude can work with equipment, documents, and maintenance logs safely.',
    mcpPoints: [
      'MCP server for Google Drive & Sheets: equipment CRUD, maintenance logs, file search.',
      'Tools with Zod validation and Russian descriptions — clear contracts for LLM agents.',
      'stdio transport via @modelcontextprotocol/sdk — works in Cursor IDE and Claude Desktop.',
      'Wrapper over Google Apps Script backend — no duplicated business logic.',
    ],
    telegramEyebrow: 'Employees · Telegram bot',
    telegramTitle: 'Telegram bot for employee and PPE tracking',
    telegramDescription:
      'Part of the Employees project on Railway: a mobile chat interface to the same Express/Prisma backend as the web app.',
    telegramPoints: [
      'Search employees and view issued PPE / inventory directly in Telegram.',
      'Check SIZ norms and upcoming replacement deadlines without opening the browser.',
      'Uses the Employees REST API — one data source for web and bot.',
      'Access control for personal data; public demo without credentials is not available.',
    ],
    projectsEyebrow: 'Portfolio',
    projectsTitle: 'Projects',
    projectsSubtitle:
      'Production-ready full-stack applications for manufacturing, HR, industrial IoT, and AI integrations.',
    stackTitle: 'Tech stack',
    stack: [
      'MCP',
      'Model Context Protocol',
      'MCP SDK',
      'Zod',
      'React',
      'TypeScript',
      'Ant Design',
      'Redux Toolkit',
      'Prisma',
      'Node.js',
      'Express',
      'Supabase',
      'PostgreSQL',
      'JWT',
      'Google Drive API',
      'Google Sheets',
      'Claude API',
      'Gemini API',
      'DeepSeek',
      'Telegram Bot API',
      'grammy',
      'Modbus TCP',
      'TimescaleDB',
      'React Flow',
      'Docker',
      'SSE',
      'Railway',
      'Cursor IDE',
    ],
    demoTitle: 'Demo access',
    demoDescription: 'Live demos and production deployments.',
    demoItems: [
      ['QR platform', PROFILE.liveDemoUrl],
      ['Employees', PROFILE.employeesDemoUrl],
      ['Employees demo', 'On request — personal data protected'],
      ['Osmos Modbus', 'On request — internal industrial network'],
      ['Location', PROFILE.locationEn],
      ['Education', PROFILE.educationEn],
      ['Languages', PROFILE.languagesEn],
      ['Work format', PROFILE.workFormatEn],
    ],
    cvTitle: 'CV downloads',
    cvDescription: 'Download CV in Russian or English.',
    cvRu: 'Download CV RU',
    cvEn: 'Download CV EN',
    projectRepoCta: 'GitHub repository',
    liveDemoCta: 'Live demo',
    contactTitle: 'Contact',
    contactDescription:
      'Open to full-stack, frontend, internal tools, and AI integration roles.',
    prevSlide: 'Previous',
    nextSlide: 'Next',
  },
  ru: {
    nav: ['Главная', 'Обо мне', 'Проекты', 'Стек', 'Контакты'],
    languageLabel: 'EN',
    badge: 'Full-stack разработчик',
    title: 'Production-ready веб-приложения с AI, автоматизацией и бизнес-ценностью.',
    subtitle:
      'Разрабатываю MCP-серверы для подключения AI-агентов к Google Drive, Sheets и производственным данным — и full-stack приложения на React, TypeScript, Node.js, Supabase.',
    primaryCta: 'Смотреть проекты',
    secondaryCta: 'Скачать CV',
    githubCta: 'GitHub',
    aboutTitle: 'Обо мне',
    about:
      'Full-stack разработчик в автоматизации бизнес-процессов, AI-интеграциях и production-ready системах на React, TypeScript, Node.js и Supabase/PostgreSQL.',
    mcpEyebrow: 'MCP-серверы',
    mcpTitle: 'Model Context Protocol — AI-агенты на реальных данных',
    mcpDescription:
      'MCP (Model Context Protocol) — открытый стандарт подключения AI-ассистентов к внешним инструментам и данным. Я разрабатываю типизированные MCP-серверы, чтобы агенты в Cursor и Claude безопасно работали с оборудованием, документами и журналами ТО.',
    mcpPoints: [
      'MCP-сервер для Google Drive и Sheets: CRUD оборудования, журналы ТО, поиск файлов.',
      'Инструменты с Zod-валидацией и описаниями на русском — понятный контракт для LLM.',
      'stdio-транспорт через @modelcontextprotocol/sdk — работает в Cursor IDE и Claude Desktop.',
      'Обёртка над Google Apps Script — без дублирования бизнес-логики.',
    ],
    telegramEyebrow: 'Employees · Telegram-бот',
    telegramTitle: 'Telegram-бот для учёта сотрудников и СИЗ',
    telegramDescription:
      'Часть проекта Employees на Railway: мобильный чат-интерфейс к тому же Express/Prisma backend, что и веб-приложение.',
    telegramPoints: [
      'Поиск сотрудников и просмотр выданных СИЗ / инвентаря прямо в Telegram.',
      'Проверка норм СИЗ и приближающихся сроков замены без браузера.',
      'Работает через REST API Employees — единая база для веба и бота.',
      'Контроль доступа к персональным данным; публичное демо без учётных данных недоступно.',
    ],
    projectsEyebrow: 'Портфолио',
    projectsTitle: 'Проекты',
    projectsSubtitle:
      'Production-ready full-stack приложения для производства, HR, промышленного IoT и AI-интеграций.',
    stackTitle: 'Технологии',
    stack: [
      'MCP',
      'Model Context Protocol',
      'MCP SDK',
      'Zod',
      'React',
      'TypeScript',
      'Ant Design',
      'Redux Toolkit',
      'Prisma',
      'Node.js',
      'Express',
      'Supabase',
      'PostgreSQL',
      'JWT',
      'Google Drive API',
      'Google Sheets',
      'Claude API',
      'Gemini API',
      'DeepSeek',
      'Telegram Bot API',
      'grammy',
      'Modbus TCP',
      'TimescaleDB',
      'React Flow',
      'Docker',
      'SSE',
      'Railway',
      'Cursor IDE',
    ],
    demoTitle: 'Демо-доступ',
    demoDescription: 'Демо и production-деплои.',
    demoItems: [
      ['QR-платформа', PROFILE.liveDemoUrl],
      ['Employees', PROFILE.employeesDemoUrl],
      ['Employees demo', 'По запросу — защита персональных данных'],
      ['Osmos Modbus', 'По запросу — внутренняя промышленная сеть'],
      ['Локация', PROFILE.locationRu],
      ['Образование', PROFILE.educationRu],
      ['Языки', PROFILE.languagesRu],
      ['Формат работы', PROFILE.workFormatRu],
    ],
    cvTitle: 'CV для скачивания',
    cvDescription: 'Скачайте CV на русском или английском языке.',
    cvRu: 'Скачать CV RU',
    cvEn: 'Скачать CV EN',
    projectRepoCta: 'Репозиторий GitHub',
    liveDemoCta: 'Live demo',
    contactTitle: 'Контакты',
    contactDescription:
      'Открыт к ролям full-stack, frontend, internal tools и AI integrations.',
    prevSlide: 'Назад',
    nextSlide: 'Далее',
  },
}

function DemoValue({ value }: { value: string }) {
  if (value.startsWith('http')) {
    return (
      <a href={value} target="_blank" rel="noreferrer">
        {value.replace('https://', '')}
      </a>
    )
  }

  return <>{value}</>
}

function getSlideState(
  index: number,
  activeSlide: number,
  leavingSlide: number | null,
  isAnimating: boolean,
): string {
  if (isAnimating && index === leavingSlide) {
    return 'is-exiting'
  }

  if (index === activeSlide) {
    return isAnimating ? 'is-entering' : 'is-active'
  }

  return 'is-idle'
}

function App() {
  const [language, setLanguage] = useState<Language>('ru')
  const [activeSlide, setActiveSlide] = useState(0)
  const [leavingSlide, setLeavingSlide] = useState<number | null>(null)
  const [direction, setDirection] = useState<SlideDirection>('forward')
  const [isAnimating, setIsAnimating] = useState(false)
  const t = content[language]
  const cvHref = language === 'ru' ? '/cv/CV_RU.pdf' : '/cv/CV_EN.pdf'

  const stats = useMemo(
    () =>
      language === 'ru'
        ? [
            ['MCP-серверы', 'AI-интеграции'],
            ['React + Node.js', 'Full-stack'],
            ['Claude + Gemini + DeepSeek', 'AI-агенты'],
          ]
        : [
            ['MCP Servers', 'AI integrations'],
            ['React + Node.js', 'Full-stack'],
            ['Claude + Gemini + DeepSeek', 'AI agents'],
          ],
    [language],
  )

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= SLIDE_COUNT || isAnimating || index === activeSlide) {
      return
    }

    setDirection(index > activeSlide ? 'forward' : 'backward')
    setLeavingSlide(activeSlide)
    setIsAnimating(true)
    setActiveSlide(index)
    window.setTimeout(() => {
      setLeavingSlide(null)
      setIsAnimating(false)
    }, SLIDE_TRANSITION_MS)
  }, [activeSlide, isAnimating])

  const goNext = useCallback(() => {
    goToSlide(Math.min(activeSlide + 1, SLIDE_COUNT - 1))
  }, [activeSlide, goToSlide])

  const goPrev = useCallback(() => {
    goToSlide(Math.max(activeSlide - 1, 0))
  }, [activeSlide, goToSlide])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault()
        goNext()
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev])

  return (
    <div
      className={`portfolio-shell dir-${direction}${isAnimating ? ' is-transitioning' : ''}`}
      data-slide={activeSlide}
      style={{ '--slide-progress': `${((activeSlide + 1) / SLIDE_COUNT) * 100}%` } as CSSProperties}
    >
      <div className="ambient-scene" aria-hidden="true">
        <span className="ambient-grid" />
        <span className="ambient-orb orb-a" />
        <span className="ambient-orb orb-b" />
        <span className="ambient-orb orb-c" />
      </div>

      <header className="site-header">
        <button
          className="brand"
          type="button"
          onClick={() => goToSlide(0)}
          aria-label="Portfolio home"
        >
          <span className="brand-mark">S</span>
          <span>{PROFILE.name} / Full-stack</span>
        </button>
        <nav aria-label="Primary navigation">
          {t.nav.map((item, index) => (
            <button
              key={item}
              type="button"
              className={index === activeSlide ? 'is-active' : undefined}
              onClick={() => goToSlide(index)}
            >
              {item}
            </button>
          ))}
        </nav>
        <button
          className="language-button"
          type="button"
          onClick={() => setLanguage((current) => (current === 'en' ? 'ru' : 'en'))}
        >
          {t.languageLabel}
        </button>
      </header>

      <div className={`slides-viewport${isAnimating ? ' is-transitioning' : ''}`}>
        <section
          className={`slide slide-home ${getSlideState(0, activeSlide, leavingSlide, isAnimating)}`}
          aria-hidden={activeSlide !== 0}
        >
          <div className="slide-content hero-layout">
            <div className="hero-copy">
              <p className="eyebrow reveal-item">{t.badge}</p>
              <h1 className="reveal-item">{t.title}</h1>
              <p className="hero-subtitle reveal-item">{t.subtitle}</p>
              <div className="hero-actions reveal-item">
                <button className="button primary" type="button" onClick={() => goToSlide(2)}>
                  {t.primaryCta}
                </button>
                <a className="button secondary" href={cvHref}>
                  {t.secondaryCta}
                </a>
                <a className="button ghost" href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
                  {t.githubCta}
                </a>
              </div>
            </div>
            <div className="hero-card reveal-item" aria-label="Project highlights">
              {stats.map(([title, label], index) => (
                <div className="stat-card reveal-item" key={title} style={{ '--reveal-index': index } as CSSProperties}>
                  <strong>{title}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`slide slide-about ${getSlideState(1, activeSlide, leavingSlide, isAnimating)}`}
          aria-hidden={activeSlide !== 1}
        >
          <div className="slide-content about-layout">
            <p className="section-kicker reveal-item">{t.aboutTitle}</p>
            <h2 className="reveal-item about-summary">{t.about}</h2>
            <div className="about-meta reveal-item">
              <span>{language === 'ru' ? PROFILE.locationRu : PROFILE.locationEn}</span>
              <span>{language === 'ru' ? PROFILE.workFormatRu : PROFILE.workFormatEn}</span>
            </div>
            <article className="mcp-panel reveal-item">
              <p className="section-kicker">{t.mcpEyebrow}</p>
              <h2>{t.mcpTitle}</h2>
              <p className="mcp-description">{t.mcpDescription}</p>
              <ul className="mcp-points">
                {t.mcpPoints.map((point, index) => (
                  <li
                    key={point}
                    className="reveal-item"
                    style={{ '--reveal-index': index } as CSSProperties}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
            <article className="mcp-panel telegram-panel reveal-item">
              <p className="section-kicker">{t.telegramEyebrow}</p>
              <h2>{t.telegramTitle}</h2>
              <p className="mcp-description">{t.telegramDescription}</p>
              <ul className="mcp-points">
                {t.telegramPoints.map((point, index) => (
                  <li
                    key={point}
                    className="reveal-item"
                    style={{ '--reveal-index': index } as CSSProperties}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section
          className={`slide slide-project ${getSlideState(2, activeSlide, leavingSlide, isAnimating)}`}
          aria-hidden={activeSlide !== 2}
        >
          <div className="slide-content project-layout">
            <div className="section-heading reveal-item">
              <p className="section-kicker">{t.projectsEyebrow}</p>
              <h2>{t.projectsTitle}</h2>
              <p>{t.projectsSubtitle}</p>
            </div>
            <div className="projects-grid">
              {PROJECTS.map((project, index) => (
                <article
                  key={project.id}
                  className={`project-card reveal-item${project.featured ? ' is-featured' : ''}`}
                  style={{ '--reveal-index': index } as CSSProperties}
                >
                  <p className="section-kicker">{project.eyebrow[language]}</p>
                  <h3>{project.title[language]}</h3>
                  <p className="project-card-description">{project.description[language]}</p>
                  <ul className="project-card-highlights">
                    {project.highlights[language].map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="project-card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-card-links">
                    <a className="button secondary" href={project.repoUrl} target="_blank" rel="noreferrer">
                      {t.projectRepoCta}
                    </a>
                    {project.demoUrl ? (
                      <a className="button ghost" href={project.demoUrl} target="_blank" rel="noreferrer">
                        {t.liveDemoCta}
                      </a>
                    ) : null}
                  </div>
                  {project.demoNote ? (
                    <p className="project-card-note">{project.demoNote[language]}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`slide slide-stack ${getSlideState(3, activeSlide, leavingSlide, isAnimating)}`}
          aria-hidden={activeSlide !== 3}
        >
          <div className="slide-content stack-layout">
            <p className="section-kicker reveal-item">{t.stackTitle}</p>
            <h2 className="reveal-item">MCP · Modbus · React · TypeScript · Node.js · AI</h2>
            <div className="stack-list">
              {t.stack.map((technology, index) => (
                <span
                  key={technology}
                  className="reveal-item"
                  style={{ '--reveal-index': index } as CSSProperties}
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`slide slide-contact ${getSlideState(4, activeSlide, leavingSlide, isAnimating)}`}
          aria-hidden={activeSlide !== 4}
        >
          <div className="slide-content contact-layout">
            <article className="panel reveal-item">
              <p className="section-kicker">{t.demoTitle}</p>
              <h2>{t.demoDescription}</h2>
              <dl className="demo-list">
                {t.demoItems.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>
                      <DemoValue value={value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
            <article className="panel panel-contact reveal-item">
              <p className="section-kicker">{t.contactTitle}</p>
              <h2>{t.contactDescription}</h2>
              <div className="cv-actions">
                <a className="button primary" href="/cv/CV_RU.pdf">
                  {t.cvRu}
                </a>
                <a className="button secondary" href="/cv/CV_EN.pdf">
                  {t.cvEn}
                </a>
              </div>
              <div className="footer-links">
                <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                <a href={PROFILE.telegram} target="_blank" rel="noreferrer">
                  {PROFILE.telegramHandle}
                </a>
                <a href={PROFILE.liveDemoUrl} target="_blank" rel="noreferrer">
                  {t.liveDemoCta}
                </a>
              </div>
            </article>
          </div>
        </section>

        <div className="transition-sheen" aria-hidden="true" />
      </div>

      <div className="slide-progress" aria-hidden="true">
        <span className="slide-progress-bar" />
      </div>

      <div className="slide-controls">
        <span className="slide-counter" aria-hidden="true">
          {String(activeSlide + 1).padStart(2, '0')} / {String(SLIDE_COUNT).padStart(2, '0')}
        </span>
        <button
          className="slide-arrow"
          type="button"
          onClick={goPrev}
          disabled={activeSlide === 0}
          aria-label={t.prevSlide}
        >
          ←
        </button>
        <div className="slide-dots" role="tablist" aria-label="Slides">
          {t.nav.map((item, index) => (
            <button
              key={item}
              type="button"
              role="tab"
              className={index === activeSlide ? 'is-active' : undefined}
              aria-selected={index === activeSlide}
              aria-label={item}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <button
          className="slide-arrow"
          type="button"
          onClick={goNext}
          disabled={activeSlide === SLIDE_COUNT - 1}
          aria-label={t.nextSlide}
        >
          →
        </button>
      </div>
    </div>
  )
}

export default App
