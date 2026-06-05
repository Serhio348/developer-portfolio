import { useCallback, useEffect, useRef, useState } from 'react'
import { streamPortfolioChat } from '../services/portfolioChatApi'
import type { ChatMessage, ChatMessageWithMeta } from '../types/chat'

const MAX_HISTORY_FOR_API = 20

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

function createMessage(role: ChatMessage['role'], content: string): ChatMessageWithMeta {
  return {
    id: generateId(),
    role,
    content,
    timestamp: Date.now(),
  }
}

export interface UsePortfolioChatReturn {
  messages: ChatMessageWithMeta[]
  isLoading: boolean
  error: string | null
  sendMessage: (text: string) => Promise<void>
  clearMessages: () => void
  clearError: () => void
}

export function usePortfolioChat(): UsePortfolioChatReturn {
  const [messages, setMessages] = useState<ChatMessageWithMeta[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const trimForApi = useCallback((items: ChatMessageWithMeta[]): ChatMessage[] => {
    return items.slice(-MAX_HISTORY_FOR_API).map(({ role, content }) => ({ role, content }))
  }, [])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    setError(null)
    setIsLoading(true)

    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    const userMessage = createMessage('user', trimmed)
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)

    const streamingMessage = createMessage('assistant', '')
    const streamingId = streamingMessage.id
    setMessages([...nextMessages, streamingMessage])

    let accumulated = ''

    try {
      for await (const event of streamPortfolioChat(trimForApi(nextMessages), controller.signal)) {
        if (event.type === 'text_delta') {
          accumulated += event.delta
          setMessages((current) =>
            current.map((message) =>
              message.id === streamingId ? { ...message, content: accumulated } : message,
            ),
          )
        } else if (event.type === 'error') {
          throw new Error(event.message)
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return
      }

      const message = err instanceof Error ? err.message : 'Failed to send message'
      setError(message)
      setMessages(messages)
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [isLoading, messages, trimForApi])

  const clearMessages = useCallback(() => {
    abortControllerRef.current?.abort()
    setMessages([])
    setError(null)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    clearError,
  }
}
