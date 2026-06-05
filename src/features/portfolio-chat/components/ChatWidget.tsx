import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CHAT_SUGGESTIONS } from '../constants/suggestions'
import { usePortfolioChat } from '../hooks/usePortfolioChat'
import type { Language } from '../types/language'
import { ChatMessage } from './ChatMessage'
import './ChatWidget.css'

interface ChatWidgetCopy {
  title: string
  subtitle: string
  placeholder: string
  send: string
  open: string
  close: string
  clear: string
  empty: string
  loading: string
}

const COPY: Record<Language, ChatWidgetCopy> = {
  ru: {
    title: 'AI-ассистент',
    subtitle: 'Спросите о проектах, стеке и опыте',
    placeholder: 'Ваш вопрос...',
    send: 'Отправить',
    open: 'Открыть чат',
    close: 'Закрыть чат',
    clear: 'Очистить',
    empty: 'Задайте вопрос о моих проектах или опыте.',
    loading: 'Думаю...',
  },
  en: {
    title: 'AI assistant',
    subtitle: 'Ask about projects, stack, and experience',
    placeholder: 'Your question...',
    send: 'Send',
    open: 'Open chat',
    close: 'Close chat',
    clear: 'Clear',
    empty: 'Ask a question about my projects or experience.',
    loading: 'Thinking...',
  },
}

interface ChatWidgetProps {
  language: Language
}

export function ChatWidget({ language }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, isLoading, error, sendMessage, clearMessages } = usePortfolioChat()
  const copy = COPY[language]
  const suggestions = CHAT_SUGGESTIONS[language]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return

    setDraft('')
    await sendMessage(text)
  }

  const handleSuggestion = async (text: string) => {
    if (isLoading) return
    await sendMessage(text)
  }

  return (
    <div className={`portfolio-chat-root${isOpen ? ' is-open' : ''}`}>
      {isOpen ? (
        <section className="portfolio-chat-panel" aria-label={copy.title}>
          <header className="portfolio-chat-header">
            <div>
              <strong>{copy.title}</strong>
              <span>{copy.subtitle}</span>
            </div>
            <div className="portfolio-chat-header-actions">
              <button type="button" className="portfolio-chat-icon-btn" onClick={clearMessages}>
                {copy.clear}
              </button>
              <button
                type="button"
                className="portfolio-chat-icon-btn"
                onClick={() => setIsOpen(false)}
                aria-label={copy.close}
              >
                ×
              </button>
            </div>
          </header>

          <div className="portfolio-chat-messages">
            {messages.length === 0 ? (
              <div className="portfolio-chat-empty">
                <p>{copy.empty}</p>
                <div className="portfolio-chat-suggestions">
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="portfolio-chat-suggestion"
                      onClick={() => void handleSuggestion(item)}
                      disabled={isLoading}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => <ChatMessage key={message.id} message={message} />)
            )}

            {isLoading ? <p className="portfolio-chat-loading">{copy.loading}</p> : null}
            {error ? <p className="portfolio-chat-error">{error}</p> : null}
            <div ref={messagesEndRef} />
          </div>

          <form className="portfolio-chat-form" onSubmit={(event) => void handleSubmit(event)}>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={copy.placeholder}
              rows={2}
              disabled={isLoading}
            />
            <button type="submit" className="portfolio-chat-send" disabled={isLoading || !draft.trim()}>
              {copy.send}
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className="portfolio-chat-toggle"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? copy.close : copy.open}
      >
        {isOpen ? '×' : 'AI'}
      </button>
    </div>
  )
}
