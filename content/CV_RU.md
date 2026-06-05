<div class="cv-header">
  <p class="cv-eyebrow">Full-stack разработчик</p>
  <h1 class="cv-name">Сидорович Сергей Юрьевич</h1>
  <p class="cv-lead">Production-ready веб-приложения для автоматизации производства: MCP-серверы, AI-интеграции, React/TypeScript/Node.js, Supabase/PostgreSQL.</p>
</div>

<div class="cv-contacts">
  <div class="cv-contact"><span class="cv-contact-label">Локация</span> Брест, Беларусь</div>
  <div class="cv-contact"><span class="cv-contact-label">Email</span> serhiosidorovich@gmail.com</div>
  <div class="cv-contact"><span class="cv-contact-label">Telegram</span> @siarhei_brest348</div>
  <div class="cv-contact"><span class="cv-contact-label">GitHub</span> github.com/Serhio348</div>
  <div class="cv-contact"><span class="cv-contact-label">Формат</span> офис / удалёнка / гибрид</div>
  <div class="cv-contact"><span class="cv-contact-label">Языки</span> RU · EN B1 · IT B2</div>
</div>

## Кратко о себе

Full-stack разработчик с опытом создания production-ready систем для реальных производственных процессов. Разрабатываю **MCP-серверы (Model Context Protocol)** — подключаю AI-агентов к Google Drive, Sheets и данным предприятия через типизированные инструменты. Создал платформу QR-учёта оборудования с мониторингом воды, AI-консультантом, Modbus IoT-сервисом и HR-системой с Telegram-ботом.

## Ключевые навыки

**MCP / AI:** Model Context Protocol, MCP SDK, stdio, Zod, tool calling, Claude / Gemini / DeepSeek  
**Frontend:** React, TypeScript, Vite, Ant Design, Redux Toolkit, Recharts, адаптивная вёрстка  
**Backend:** Node.js, Express, REST API, SSE, JWT, middleware  
**База данных:** Supabase, PostgreSQL, Prisma, SQL-миграции, RLS, TimescaleDB  
**Интеграции:** Google Drive/Sheets, GAS, Telegram Bot API, Modbus TCP, Docker, Railway, VPS/Nginx

## Проекты

### MCP-сервер · Google Drive и Sheets
<span class="cv-stack">TypeScript · Node.js · MCP SDK · Zod · GAS · Cursor / Claude Desktop</span>

MCP-сервер — мост между AI-агентами и производственными данными. Обёртка над GAS-бэкендом без дублирования логики.

- MCP-сервер на `@modelcontextprotocol/sdk` (stdio) для Cursor и Claude Desktop.
- Инструменты оборудования: CRUD в Google Sheets, автосоздание папок в Drive.
- Журналы ТО: чтение, создание и обновление записей обслуживания.
- Drive: поиск файлов, чтение документов, загрузка через Google APIs.

### QR-платформа учёта оборудования
<span class="cv-stack">React · TypeScript · Node.js · Express · Supabase · MCP · Railway</span>

Full-stack платформа: идентификация оборудования, журналы ТО, документооборот, мониторинг воды, AI-диагностика.

- QR-карточки с историей обслуживания, документацией и фотофиксацией работ.
- React/TypeScript UI: дашборды, архивы, формы, графики, мобильный интерфейс.
- AI-консультант на Node.js/Express: streaming, tool calling, несколько AI-провайдеров.
- Мониторинг воды с архивом и корректировкой аномалий при замене счётчиков.
- **Демо:** qr-code-for-equipment-identification-production.up.railway.app

### osmos-modbus-service · мониторинг обратного осмоса
<span class="cv-stack">Node.js · TypeScript · Modbus TCP · React · TimescaleDB · Docker · VPS</span>

Микросервис опроса установки обратного осмоса (Weintek HMI). Часть экосистемы учёта воды и оборудования.

- Modbus TCP poller с блочным чтением регистров и coils, REST API, health ok/degraded/down.
- React-дашборд: SVG HMI, React Flow, таблица параметров, графики Recharts.
- TimescaleDB: hypertables, compression, continuous aggregates; Docker Compose + Nginx.
- **GitHub:** github.com/Serhio348/osmos-modbus-service · демо по запросу

### Employees · учёт сотрудников и СИЗ
<span class="cv-stack">React · TypeScript · Ant Design · Prisma · PostgreSQL · Telegram · Railway</span>

Внутренняя HR-система: веб-приложение, Telegram-бот, выдача СИЗ, контроль сроков замены.

- Telegram-бот: сотрудники, выданные СИЗ и сроки замены через Express/Prisma API.
- Реестр сотрудников, учёт СИЗ (выдан / возвращён / списан), нормы выдачи.
- Экспорт личных карточек в PDF и Excel; JWT, Prisma, деплой на Railway.
- **GitHub:** github.com/Serhio348/Employees · демо по запросу

## Образование

Высшее образование, автоматизация промышленных установок, 2009
