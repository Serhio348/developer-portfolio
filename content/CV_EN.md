<div class="cv-header">
  <p class="cv-eyebrow">Full-stack Developer</p>
  <h1 class="cv-name">Siarhei Sidarovich</h1>
  <p class="cv-lead">Production-ready web applications for manufacturing automation: MCP servers, AI integrations, React/TypeScript/Node.js, Supabase/PostgreSQL.</p>
</div>

<div class="cv-contacts">
  <div class="cv-contact"><span class="cv-contact-label">Location</span> Brest, Belarus</div>
  <div class="cv-contact"><span class="cv-contact-label">Email</span> serhiosidorovich@gmail.com</div>
  <div class="cv-contact"><span class="cv-contact-label">Telegram</span> @siarhei_brest348</div>
  <div class="cv-contact"><span class="cv-contact-label">GitHub</span> github.com/Serhio348</div>
  <div class="cv-contact"><span class="cv-contact-label">Work format</span> onsite / remote / hybrid</div>
  <div class="cv-contact"><span class="cv-contact-label">Languages</span> RU · EN B1 · IT B2</div>
</div>

## Summary

Full-stack developer building production-ready systems for real manufacturing workflows. I develop **MCP servers (Model Context Protocol)** that connect AI agents to Google Drive, Sheets, and enterprise data through typed tools. Built a QR equipment platform with water monitoring and AI consultant, a Modbus IoT microservice, and an HR system with a Telegram bot.

## Core Skills

**MCP / AI:** Model Context Protocol, MCP SDK, stdio, Zod, tool calling, Claude / Gemini / DeepSeek  
**Frontend:** React, TypeScript, Vite, Ant Design, Redux Toolkit, Recharts, responsive UI  
**Backend:** Node.js, Express, REST API, SSE, JWT, middleware  
**Database:** Supabase, PostgreSQL, Prisma, SQL migrations, RLS, TimescaleDB  
**Integrations:** Google Drive/Sheets, GAS, Telegram Bot API, Modbus TCP, Docker, Railway, VPS/Nginx

## Projects

### MCP Server · Google Drive and Sheets
<span class="cv-stack">TypeScript · Node.js · MCP SDK · Zod · GAS · Cursor / Claude Desktop</span>

MCP server bridging AI agents and production data. Wrapper over the GAS backend without duplicating business logic.

- MCP server on `@modelcontextprotocol/sdk` (stdio) for Cursor and Claude Desktop.
- Equipment tools: CRUD in Google Sheets, automatic Drive folder creation.
- Maintenance logs: read, create, and update service records.
- Drive: file search, document reading, uploads via Google APIs.

### QR Equipment Identification Platform
<span class="cv-stack">React · TypeScript · Node.js · Express · Supabase · MCP · Railway</span>

Full-stack platform: equipment identification, maintenance logs, documents, water monitoring, AI diagnostics.

- QR cards with maintenance history, documentation links, and photo attachments.
- React/TypeScript UI: dashboards, archives, forms, charts, mobile-friendly layout.
- AI consultant on Node.js/Express: streaming, tool calling, multi-provider AI support.
- Water monitoring with archives and meter replacement anomaly correction.
- **Demo:** qr-code-for-equipment-identification-production.up.railway.app · login credentials on request: serhiosidorovich@gmail.com

### osmos-modbus-service · reverse osmosis monitoring
<span class="cv-stack">Node.js · TypeScript · Modbus TCP · React · TimescaleDB · Docker · VPS</span>

Modbus TCP polling microservice for a reverse osmosis plant (Weintek HMI). Part of the water and equipment ecosystem.

- Modbus TCP poller with block register/coil reads, REST API, health ok/degraded/down.
- React dashboard: SVG HMI, React Flow, parameter table, Recharts charts.
- TimescaleDB hypertables, compression, continuous aggregates; Docker Compose + Nginx.
- **GitHub:** github.com/Serhio348/osmos-modbus-service · demo on request

### Employees · employee and PPE tracking
<span class="cv-stack">React · TypeScript · Ant Design · Prisma · PostgreSQL · Telegram · Railway</span>

Internal HR system: web app, Telegram bot, PPE issuance, replacement deadline tracking.

- Telegram bot: employees, issued PPE, and deadlines via Express/Prisma API.
- Employee registry, PPE tracking (issued / returned / written off), issuance norms.
- Personal card export to PDF and Excel; JWT, Prisma, Railway deployment.
- **GitHub:** github.com/Serhio348/Employees · demo on request

## Education

Higher education in industrial automation, 2009
