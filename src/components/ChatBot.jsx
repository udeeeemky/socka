import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const VITE_SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Ahoj! 👋 Som Adamov AI asistent. Ako ti môžem pomôcť?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${VITE_SUPABASE_URL}/functions/v1/chat-agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Prepáč, niečo sa pokazilo.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Nepodarilo sa spojiť. Skús to znova.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* FAB */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-teal hover:bg-teal-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
          aria-label="Otvoriť chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl border border-border-light shadow-2xl flex flex-col overflow-hidden animate-[slideUp_0.2s_ease-out]">
          <style>{`@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-light bg-teal-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
              <div>
                <p className="text-sm font-bold text-text-main">Adamov asistent</p>
                <p className="text-xs text-text-muted">Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/50 rounded-full transition-colors">
              <X size={18} className="text-text-secondary" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-teal text-white rounded-br-sm'
                    : 'bg-gray-100 text-text-main rounded-bl-sm'
                }`}>
                  {m.role === 'assistant' ? (
                    <div className="prose-chat">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-teal/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-teal/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-teal/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border-light p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Napíš správu..."
                className="flex-1 bg-gray-50 border border-border-light rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="w-10 h-10 bg-teal hover:bg-teal-dark disabled:opacity-40 text-white rounded-full flex items-center justify-center transition-colors shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
