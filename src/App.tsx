import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import './App.css'

type Language = 'en' | 'ru'
type SlideDirection = 'forward' | 'backward'

const SLIDE_COUNT = 5
const SLIDE_TRANSITION_MS = 920

const PROFILE = {
  name: 'Siarhei Sidarovich',
  locationRu: 'Брест, Беларусь',
  locationEn: 'Brest, Belarus',
  email: 'serhiosidorovich@gmail.com',
  telegram: 'https://t.me/siarhei_brest348',
  telegramHandle: '@siarhei_brest348',
  githubUrl: 'https://github.com/Serhio348',
  projectRepoUrl: 'https://github.com/Serhio348/QR-code-for-equipment-identification',
  liveDemoUrl: 'https://qr-code-for-equipment-identification-production.up.railway.app',
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
  projectEyebrow: string
  projectTitle: string
  projectDescription: string
  features: string[]
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
    nav: ['Home', 'About', 'Project', 'Stack', 'Contact'],
    languageLabel: 'RU',
    badge: 'Full-stack Developer',
    title: 'Production-grade web apps with AI, automation, and real business value.',
    subtitle:
      'I build full-stack systems with React, TypeScript, Node.js, Supabase, Google APIs, and AI tool-calling workflows.',
    primaryCta: 'View project',
    secondaryCta: 'Download CV',
    githubCta: 'GitHub',
    aboutTitle: 'About',
    about:
      'Full-stack developer with hands-on experience building production-ready web applications for business process automation. Specialized in React, TypeScript, Node.js, Supabase/PostgreSQL, Google API integrations, and AI assistants with tool calling. Built a complete equipment management platform with QR identification, maintenance logs, water monitoring, and an AI consultant for real operational data.',
    projectEyebrow: 'Featured project',
    projectTitle: 'QR Equipment Identification and Maintenance Platform',
    projectDescription:
      'A full-stack platform for equipment identification, maintenance tracking, water monitoring, document management, and AI-assisted diagnostics.',
    features: [
      'QR-based equipment cards with maintenance history and documentation links.',
      'React/TypeScript dashboards, archive views, forms, charts, and mobile-friendly UI.',
      'Node.js/Express AI consultant with streaming responses and tool calling.',
      'Google Drive and Sheets integrations via Google Apps Script.',
      'Supabase/PostgreSQL schema, RLS policies, SQL migrations, and data workflows.',
      'Water consumption analytics with meter replacement correction logic.',
    ],
    stackTitle: 'Tech stack',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Node.js',
      'Express',
      'Supabase',
      'PostgreSQL',
      'Google Drive API',
      'Google Sheets',
      'Claude API',
      'Gemini API',
      'DeepSeek',
      'SSE',
      'Railway',
    ],
    demoTitle: 'Demo access',
    demoDescription: 'Live production deployment on Railway with the main equipment management platform.',
    demoItems: [
      ['Live demo', PROFILE.liveDemoUrl],
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
    nav: ['Главная', 'Обо мне', 'Проект', 'Стек', 'Контакты'],
    languageLabel: 'EN',
    badge: 'Full-stack разработчик',
    title: 'Production-ready веб-приложения с AI, автоматизацией и бизнес-ценностью.',
    subtitle:
      'Создаю full-stack системы на React, TypeScript, Node.js, Supabase, Google APIs и AI tool-calling workflows.',
    primaryCta: 'Смотреть проект',
    secondaryCta: 'Скачать CV',
    githubCta: 'GitHub',
    aboutTitle: 'Обо мне',
    about:
      'Full-stack разработчик с практическим опытом создания production-ready веб-приложений для автоматизации бизнес-процессов. Специализируюсь на React, TypeScript, Node.js, Supabase/PostgreSQL, интеграциях с Google APIs и AI-ассистентах с tool calling. Разработал полноценную платформу учёта оборудования с QR-идентификацией, журналами обслуживания, мониторингом воды и AI-консультантом для работы с реальными производственными данными.',
    projectEyebrow: 'Главный проект',
    projectTitle: 'Платформа QR-идентификации и обслуживания оборудования',
    projectDescription:
      'Full-stack платформа для идентификации оборудования, журналов обслуживания, мониторинга воды, управления документацией и AI-диагностики.',
    features: [
      'QR-карточки оборудования с историей обслуживания и ссылками на документацию.',
      'Дашборды, архивы, формы, графики и мобильный UI на React/TypeScript.',
      'AI-консультант на Node.js/Express со streaming-ответами и tool calling.',
      'Интеграции Google Drive и Google Sheets через Google Apps Script.',
      'Supabase/PostgreSQL, RLS-политики, SQL-миграции и обработка данных.',
      'Аналитика расхода воды с корректировкой заменённых счётчиков.',
    ],
    stackTitle: 'Технологии',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Node.js',
      'Express',
      'Supabase',
      'PostgreSQL',
      'Google Drive API',
      'Google Sheets',
      'Claude API',
      'Gemini API',
      'DeepSeek',
      'SSE',
      'Railway',
    ],
    demoTitle: 'Демо-доступ',
    demoDescription: 'Рабочий production-деплой на Railway с основной платформой учёта оборудования.',
    demoItems: [
      ['Live demo', PROFILE.liveDemoUrl],
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
    () => [
      ['React + Node.js', 'Full-stack'],
      ['Supabase + Google APIs', 'Integrations'],
      ['Claude + Gemini + DeepSeek', 'AI tools'],
    ],
    [],
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
            <h2 className="reveal-item">{t.about}</h2>
            <div className="about-meta reveal-item">
              <span>{language === 'ru' ? PROFILE.locationRu : PROFILE.locationEn}</span>
              <span>{language === 'ru' ? PROFILE.workFormatRu : PROFILE.workFormatEn}</span>
            </div>
          </div>
        </section>

        <section
          className={`slide slide-project ${getSlideState(2, activeSlide, leavingSlide, isAnimating)}`}
          aria-hidden={activeSlide !== 2}
        >
          <div className="slide-content project-layout">
            <div className="section-heading reveal-item">
              <p className="section-kicker">{t.projectEyebrow}</p>
              <h2>{t.projectTitle}</h2>
              <p>{t.projectDescription}</p>
            </div>
            <div className="project-grid">
              {t.features.map((feature, index) => (
                <article
                  className="feature-card reveal-item"
                  key={feature}
                  style={{ '--reveal-index': index } as CSSProperties}
                >
                  <span className="feature-dot" />
                  <p>{feature}</p>
                </article>
              ))}
            </div>
            <div className="project-links reveal-item">
              <a className="button secondary" href={PROFILE.projectRepoUrl} target="_blank" rel="noreferrer">
                {t.projectRepoCta}
              </a>
              <a className="button ghost" href={PROFILE.liveDemoUrl} target="_blank" rel="noreferrer">
                {t.liveDemoCta}
              </a>
            </div>
          </div>
        </section>

        <section
          className={`slide slide-stack ${getSlideState(3, activeSlide, leavingSlide, isAnimating)}`}
          aria-hidden={activeSlide !== 3}
        >
          <div className="slide-content stack-layout">
            <p className="section-kicker reveal-item">{t.stackTitle}</p>
            <h2 className="reveal-item">React · TypeScript · Node.js · Supabase · AI</h2>
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
