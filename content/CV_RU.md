# Siarhei Sidarovich

**Full-stack разработчик**  
Брест, Беларусь · serhiosidorovich@gmail.com · Telegram: @siarhei_brest348 · github.com/Serhio348

---

## Кратко о себе

Full-stack разработчик с практическим опытом создания production-ready веб-приложений для автоматизации бизнес-процессов. Разрабатываю **MCP-серверы (Model Context Protocol)** — подключаю AI-агентов к Google Drive, Google Sheets и производственным данным через типизированные инструменты. Также специализируюсь на React, TypeScript, Node.js, Supabase/PostgreSQL и AI-ассистентах с tool calling. Создал платформу учёта оборудования с QR-идентификацией, мониторингом воды и AI-консультантом для реальных производственных процессов.

---

## Ключевые навыки

**MCP / AI-агенты:** Model Context Protocol, MCP SDK, stdio transport, Zod-схемы, tool calling, prompt engineering  
**Frontend:** React, TypeScript, Vite, Ant Design, Redux Toolkit, CSS, Recharts, адаптивная вёрстка  
**Backend:** Node.js, Express, REST API, SSE, middleware  
**База данных:** Supabase, PostgreSQL, Prisma, SQL-миграции, RLS  
**AI:** Claude API, Gemini API, DeepSeek, multi-provider AI  
**Интеграции:** Google Drive API, Google Sheets, Google Apps Script, Telegram Bot API, Modbus TCP, QR-воркфлоу  
**Инструменты:** Git, GitHub, Docker, Railway, VPS/Nginx, Cursor IDE, environment configuration

---

## Опыт / Проекты

### MCP-сервер для Google Drive и Google Sheets

**Роль:** Full-stack / AI integrations разработчик  
**Стек:** TypeScript, Node.js, MCP SDK, Zod, Google Apps Script, Google Drive API

MCP-сервер — стандартизированный мост между AI-агентами (Claude, Cursor) и бизнес-данными производства. Обёртка над существующим GAS-бэкендом, без дублирования логики.

- Разработал MCP-сервер на `@modelcontextprotocol/sdk` с stdio-транспортом для интеграции с Cursor и Claude Desktop.
- Реализовал инструменты для оборудования: получение списка, создание, обновление, удаление записей в Google Sheets с автосозданием папок в Drive.
- Добавил инструменты для журналов ТО: чтение, создание и обновление записей обслуживания.
- Реализовал Drive-инструменты: поиск файлов в папках оборудования, чтение документов, загрузка файлов через Google APIs.
- Описал каждый tool на русском с Zod-валидацией — агент получает понятный контракт и безопасные вызовы.
- Подключил MCP к AI-консультанту и рабочему процессу разработки в Cursor IDE.

**Результат:** AI-агент работает с реальными данными оборудования, документами и журналами ТО через единый MCP-интерфейс вместо ручного поиска в Drive и Sheets.

---

### Платформа QR-идентификации и обслуживания оборудования

**Роль:** Full-stack разработчик  
**Стек:** React, TypeScript, Node.js, Express, Supabase, PostgreSQL, Google Apps Script, Claude/Gemini/DeepSeek

Full-stack веб-приложение для производства: идентификация оборудования, журналы ТО, документооборот, мониторинг воды и AI-диагностика.

- Разработал систему QR-идентификации оборудования с карточками, историей обслуживания, ссылками на документацию и фотофиксацией работ.
- Создал frontend на React/TypeScript: дашборды, архивные представления, формы, графики, пагинация и мобильный UI.
- Реализовал backend AI-консультанта на Node.js/Express со streaming-ответами, tool calling и поддержкой нескольких AI-провайдеров.
- Интегрировал Google Drive и Google Sheets через Google Apps Script: папки оборудования, поиск файлов, чтение документов, загрузка фото.
- Спроектировал схему Supabase/PostgreSQL, RLS-политики, SQL-миграции и серверную нормализацию данных.
- Реализовал мониторинг воды: дашборды расхода, архив по часам/дням/неделям/месяцам/годам, корректировку аномалий при замене счётчиков.
- Добавил AI-инструменты для поиска оборудования, журналов ТО, документов, показаний воды, счетов и долговременной памяти агента.

**Результат:** единая цифровая система вместо разрозненных таблиц, папок и ручного поиска информации по оборудованию.

**Демо:** https://qr-code-for-equipment-identification-production.up.railway.app

---

### osmos-modbus-service — мониторинг обратного осмоса

**Роль:** Full-stack / IoT разработчик  
**Стек:** Node.js, TypeScript, Express, modbus-serial, React, Recharts, React Flow, TimescaleDB, Docker, Nginx

Микросервис опроса установки обратного осмоса по Modbus TCP (Weintek HMI) с REST API и веб-дашбордом. Часть экосистемы учёта воды и оборудования, развёрнут на VPS.

- Реализовал Modbus TCP poller с блочным чтением holding-регистров и coils, декодированием и масштабированием параметров.
- Собрал REST API: live-снимок (`/api/osmos`), health со статусами ok/degraded/down, архив метрик в TimescaleDB.
- Разработал React-дашборд: SVG HMI, анимированная схема на React Flow, таблица параметров и графики Recharts.
- Настроил TimescaleDB: hypertables, compression, continuous aggregates; деплой через Docker Compose и Nginx.

**Результат:** операторы видят давления, уровни, расходы и состояние клапанов/насоса в браузере без доступа к HMI-экрану.

**GitHub:** https://github.com/Serhio348/osmos-modbus-service  
**Демо:** по запросу — внутренняя промышленная сеть

---

### Employees — учёт сотрудников и СИЗ

**Роль:** Full-stack разработчик  
**Стек:** React, TypeScript, Ant Design, Redux Toolkit, Express, Prisma, PostgreSQL, JWT, Railway

Внутренняя HR-система для учёта сотрудников и средств индивидуальной защиты: веб-приложение, Telegram-бот, выдача СИЗ, контроль сроков замены и экспорт личных карточек.

- Разработал Telegram-бота в составе проекта Employees: доступ к сотрудникам, выданным СИЗ и срокам замены через чат, поверх Express/Prisma API.
- Реализовал реестр сотрудников: ФИО, профессия, адрес, размеры одежды и обуви, табельный номер.
- Создал учёт инвентаря и СИЗ со статусами выдан / возвращён / списан и контролем сроков замены.
- Добавил справочник норм СИЗ с классификацией, количеством и периодом выдачи.
- Реализовал экспорт личных карточек учёта СИЗ в PDF и Excel (xlsx).
- Настроил JWT-авторизацию, Prisma/PostgreSQL и production-деплой на Railway.

**Результат:** цифровый учёт выдачи СИЗ вместо бумажных карточек и разрозненных таблиц.

**GitHub:** https://github.com/Serhio348/Employees  
**Production:** https://employees-production-c5df.up.railway.app (демо по запросу — персональные данные)

---

## Достижения

- Разработал MCP-сервер для подключения AI-агентов к Google Drive, Sheets и производственным данным.
- Автоматизировал идентификацию и учёт оборудования через QR-коды.
- Централизовал документацию, журналы обслуживания и фото в одном интерфейсе.
- Внедрил AI-консультанта для поиска файлов, анализа данных и поддержки ремонтных сценариев.
- Реализовал аналитику потребления воды с корректной обработкой замены счётчиков.
- Подготовил архитектуру для деплоя на Railway и разделения frontend/backend.
- Разработал систему Employees с Telegram-ботом для учёта сотрудников и СИЗ, экспортом карточек в PDF/Excel.
- Создал микросервис osmos-modbus-service для мониторинга обратного осмоса по Modbus TCP с дашбордом и архивом в TimescaleDB.

---

## Образование

Высшее образование, автоматизация промышленных установок, 2009

---

## Дополнительно

**Языки:** русский — родной, английский — B1, итальянский — B2  
**Формат работы:** офис / удалёнка / гибрид  
**GitHub:** https://github.com/Serhio348  
**Демо QR-платформы:** https://qr-code-for-equipment-identification-production.up.railway.app  
**Employees:** https://employees-production-c5df.up.railway.app (демо по запросу)  
**Osmos Modbus:** https://github.com/Serhio348/osmos-modbus-service (демо по запросу)
