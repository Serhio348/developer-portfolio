/**
 * chatHandler.js
 *
 * SSE-эндпоинт чата портфолио через DeepSeek API.
 *
 * Структура:
 * 1. handleChatStream — валидация, rate limit, стриминг ответа
 * 2. streamDeepSeekReply — запрос к DeepSeek с stream: true
 */

import OpenAI from 'openai'
import { assertChatConfig, config } from './config.js'
import { buildSystemPrompt, getPortfolioKnowledge } from './knowledge.js'
import { checkRateLimit, getClientIp } from './rateLimit.js'

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' })
  response.end(JSON.stringify(payload))
}

function sendSseEvent(response, payload) {
  response.write(`data: ${JSON.stringify(payload)}\n\n`)
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let total = 0

    request.on('data', (chunk) => {
      total += chunk.length
      if (total > 64 * 1024) {
        reject(new Error('Request body too large'))
        request.destroy()
        return
      }
      chunks.push(chunk)
    })

    request.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })

    request.on('error', reject)
  })
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('messages must be a non-empty array')
  }

  if (messages.length > config.maxHistoryMessages) {
    throw new Error(`Too many messages (max ${config.maxHistoryMessages})`)
  }

  return messages.map((message) => {
    if (!message || (message.role !== 'user' && message.role !== 'assistant')) {
      throw new Error('Invalid message role')
    }

    if (typeof message.content !== 'string' || message.content.trim().length === 0) {
      throw new Error('Message content must be a non-empty string')
    }

    if (message.content.length > config.maxMessageLength) {
      throw new Error(`Message too long (max ${config.maxMessageLength} chars)`)
    }

    return {
      role: message.role,
      content: message.content.trim(),
    }
  })
}

async function streamDeepSeekReply(systemPrompt, messages, onDelta) {
  const client = new OpenAI({
    apiKey: config.deepseekApiKey,
    baseURL: 'https://api.deepseek.com',
  })

  const stream = await client.chat.completions.create({
    model: config.deepseekModel,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    max_tokens: 1200,
    temperature: 0.4,
    stream: true,
  })

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content
    if (delta) {
      onDelta(delta)
    }
  }
}

export async function handleHealth(request, response) {
  if (request.method !== 'GET') {
    sendJson(response, 405, { error: 'Method not allowed' })
    return
  }

  sendJson(response, 200, {
    ok: true,
    chatConfigured: Boolean(config.deepseekApiKey),
  })
}

export async function handleChatStream(request, response) {
  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method not allowed' })
    return
  }

  try {
    assertChatConfig()
  } catch (error) {
    sendJson(response, 503, { error: error instanceof Error ? error.message : 'Chat unavailable' })
    return
  }

  const clientIp = getClientIp(request)
  if (!checkRateLimit(clientIp, config.rateLimitPerHour)) {
    sendJson(response, 429, { error: 'Rate limit exceeded. Try again later.' })
    return
  }

  let body
  try {
    body = await readJsonBody(request)
  } catch (error) {
    sendJson(response, 400, { error: error instanceof Error ? error.message : 'Bad request' })
    return
  }

  let messages
  try {
    messages = validateMessages(body.messages)
  } catch (error) {
    sendJson(response, 400, { error: error instanceof Error ? error.message : 'Invalid messages' })
    return
  }

  response.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
  })

  try {
    const knowledge = await getPortfolioKnowledge()
    const systemPrompt = buildSystemPrompt({
      cvRu: knowledge.cvRu,
      cvEn: knowledge.cvEn,
      portfolioUrl: config.portfolioUrl,
    })

    await streamDeepSeekReply(systemPrompt, messages, (delta) => {
      sendSseEvent(response, { type: 'text_delta', delta })
    })

    sendSseEvent(response, { type: 'done' })
  } catch (error) {
    sendSseEvent(response, {
      type: 'error',
      message: error instanceof Error ? error.message : 'Chat failed',
    })
  }

  response.end()
}
