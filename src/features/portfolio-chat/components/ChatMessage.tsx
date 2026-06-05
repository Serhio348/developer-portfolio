import type { ChatMessageWithMeta } from '../types/chat'
import './ChatWidget.css'

interface ChatMessageProps {
  message: ChatMessageWithMeta
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`portfolio-chat-message is-${message.role}`}>
      <p>{message.content}</p>
    </div>
  )
}
