/**
 * config.js
 *
 * Конфигурация portfolio AI API из переменных окружения.
 */

import 'dotenv/config'

const port = Number(process.env.PORT || 3000)

export const config = {
  port,
  deepseekApiKey: process.env.DEEPSEEK_API_KEY || '',
  deepseekModel: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
  portfolioUrl:
    process.env.PORTFOLIO_URL || 'https://developer-portfolio-production-2a30.up.railway.app',
  maxHistoryMessages: Number(process.env.CHAT_MAX_HISTORY || 20),
  maxMessageLength: Number(process.env.CHAT_MAX_MESSAGE_LENGTH || 2000),
  rateLimitPerHour: Number(process.env.CHAT_RATE_LIMIT_PER_HOUR || 30),
}

export function assertChatConfig() {
  if (!config.deepseekApiKey) {
    throw new Error('DEEPSEEK_API_KEY is not configured')
  }
}
