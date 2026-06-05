import type { Language } from '../types/language'

export const CHAT_SUGGESTIONS: Record<Language, string[]> = {
  ru: [
    'Какие проекты у тебя в production?',
    'Расскажи про MCP-сервер',
    'Какой стек ты используешь?',
    'Есть ли живая демка?',
  ],
  en: [
    'Which projects are in production?',
    'Tell me about the MCP server',
    'What is your tech stack?',
    'Is there a live demo?',
  ],
}
