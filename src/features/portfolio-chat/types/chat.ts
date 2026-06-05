export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  role: ChatRole
  content: string
}

export interface ChatMessageWithMeta extends ChatMessage {
  id: string
  timestamp: number
}

export type StreamEvent =
  | { type: 'text_delta'; delta: string }
  | { type: 'done' }
  | { type: 'error'; message: string }
