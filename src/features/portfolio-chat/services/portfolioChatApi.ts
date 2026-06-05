import type { ChatMessage, StreamEvent } from '../types/chat'

const API_BASE = import.meta.env.VITE_PORTFOLIO_API_URL || ''

export async function* streamPortfolioChat(
  messages: ChatMessage[],
  signal?: AbortSignal,
): AsyncGenerator<StreamEvent> {
  const response = await fetch(`${API_BASE}/api/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  })

  if (!response.ok || !response.body) {
    const errorData = (await response.json().catch(() => ({}))) as { error?: string }
    throw new Error(errorData.error || `HTTP ${response.status}`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const parts = buffer.split('\n\n')
    buffer = parts.pop() ?? ''

    for (const part of parts) {
      const line = part.trim()
      if (line.startsWith('data: ')) {
        try {
          yield JSON.parse(line.slice(6)) as StreamEvent
        } catch {
          // skip invalid JSON chunk
        }
      }
    }
  }
}
