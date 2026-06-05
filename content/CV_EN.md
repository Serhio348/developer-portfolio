# Siarhei Sidarovich

**Full-stack Developer**  
Brest, Belarus · serhiosidorovich@gmail.com · Telegram: @siarhei_brest348 · github.com/Serhio348

---

## Summary

Full-stack developer with hands-on experience building production-ready web applications for business process automation. I build **MCP servers (Model Context Protocol)** that connect AI agents to Google Drive, Google Sheets, and real production data through typed tools. Also specialized in React, TypeScript, Node.js, Supabase/PostgreSQL, and AI assistants with tool calling. Built an equipment management platform with QR identification, water monitoring, and an AI consultant for real operational workflows.

---

## Core Skills

**MCP / AI agents:** Model Context Protocol, MCP SDK, stdio transport, Zod schemas, tool calling, prompt engineering  
**Frontend:** React, TypeScript, Vite, Ant Design, Redux Toolkit, CSS, Recharts, responsive UI  
**Backend:** Node.js, Express, REST API, SSE, middleware  
**Database:** Supabase, PostgreSQL, Prisma, SQL migrations, RLS  
**AI:** Claude API, Gemini API, DeepSeek, multi-provider AI  
**Integrations:** Google Drive API, Google Sheets, Google Apps Script, Telegram Bot API, QR workflows  
**Tools:** Git, GitHub, Railway, Cursor IDE, environment configuration

---

## Experience / Projects

### MCP Server for Google Drive and Google Sheets

**Role:** Full-stack / AI integrations developer  
**Stack:** TypeScript, Node.js, MCP SDK, Zod, Google Apps Script, Google Drive API

An MCP server — a standardized bridge between AI agents (Claude, Cursor) and production business data. A wrapper over the existing GAS backend without duplicating business logic.

- Built an MCP server with `@modelcontextprotocol/sdk` and stdio transport for Cursor and Claude Desktop integration.
- Implemented equipment tools: list, create, update, and delete Google Sheets records with automatic Drive folder creation.
- Added maintenance log tools: read, create, and update service records.
- Implemented Drive tools: search files in equipment folders, read documents, upload files via Google APIs.
- Defined each tool in Russian with Zod validation so agents get a clear contract and safe invocations.
- Connected MCP to the AI consultant and the Cursor IDE development workflow.

**Outcome:** AI agents work with real equipment data, documents, and maintenance logs through a single MCP interface instead of manual Drive and Sheets lookup.

---

### QR Equipment Identification and Maintenance Platform

**Role:** Full-stack Developer  
**Stack:** React, TypeScript, Node.js, Express, Supabase, PostgreSQL, Google Apps Script, Claude/Gemini/DeepSeek

Full-stack web application for production operations: equipment identification, maintenance tracking, document management, water monitoring, and AI-assisted diagnostics.

- Built a QR-based equipment identification system with equipment cards, maintenance history, documentation links, and photo attachments.
- Developed a React/TypeScript frontend with dashboards, archive views, forms, charts, pagination, and mobile-friendly UI.
- Implemented a Node.js/Express AI consultant backend with streaming responses, tool calling, and multi-provider AI support.
- Integrated Google Drive and Google Sheets via Google Apps Script for equipment folders, file search, document reading, and photo uploads.
- Designed Supabase/PostgreSQL schema, RLS policies, SQL migrations, and server-side data normalization.
- Built water monitoring dashboards with archive grouping by hour, day, week, month, and year, including correction logic for meter replacements.
- Added AI tools for equipment search, maintenance logs, document reading, water readings, invoice parsing, and persistent agent memory.

**Outcome:** a single digital system replacing scattered spreadsheets, folders, and manual equipment lookup.

**Live demo:** https://qr-code-for-equipment-identification-production.up.railway.app

---

### Employees — employee and PPE tracking

**Role:** Full-stack Developer  
**Stack:** React, TypeScript, Ant Design, Redux Toolkit, Express, Prisma, PostgreSQL, JWT, Railway

Internal HR system for employee and PPE management: web app, Telegram bot, issuance tracking, replacement deadlines, and personal card export.

- Built a Telegram bot as part of Employees: employee lookup, issued PPE, and replacement deadlines in chat via the Express/Prisma API.
- Built an employee registry with names, professions, addresses, clothing/shoe sizes, and employee numbers.
- Implemented PPE and inventory tracking with issued / returned / written-off statuses and replacement deadlines.
- Added a PPE norms directory with classification, quantity, and issuance period.
- Implemented personal PPE card export to PDF and Excel (xlsx).
- Configured JWT authentication, Prisma/PostgreSQL, and Railway production deployment.

**Outcome:** digital PPE issuance tracking instead of paper cards and scattered spreadsheets.

**GitHub:** https://github.com/Serhio348/Employees  
**Production:** https://employees-production-c5df.up.railway.app (demo on request — personal data)

---

## Key Achievements

- Built an MCP server connecting AI agents to Google Drive, Sheets, and production data.
- Automated equipment identification and tracking through QR codes.
- Centralized documentation, maintenance logs, and photos in one interface.
- Introduced an AI consultant for file search, data analysis, and repair workflow support.
- Implemented water consumption analytics with proper handling of meter replacement anomalies.
- Prepared deployment architecture for Railway with separated frontend and backend services.
- Built the Employees system with a Telegram bot for employee and PPE tracking and PDF/Excel card export.

---

## Education

Higher education in industrial automation, 2009

---

## Additional Information

**Languages:** Russian — native, English — B1, Italian — B2  
**Work format:** onsite / remote / hybrid  
**GitHub:** https://github.com/Serhio348  
**QR platform demo:** https://qr-code-for-equipment-identification-production.up.railway.app  
**Employees:** https://employees-production-c5df.up.railway.app (demo on request)
