import React, { useState, useRef, useEffect } from 'react'
import BottomNav from '../components/BottomNav.jsx'

const getBotReply = (message) => {
  const lower = message.toLowerCase()
  if (lower.includes('book') || lower.includes('appointment')) {
    return "To book an appointment, go to the Home tab and tap 'Book an Appointment'."
  }
  if (lower.includes('doctor')) {
    return "Browse available doctors in the Doctors tab."
  }
  if (lower.includes('cancel')) {
    return "To cancel a booking, please call the hospital directly."
  }
  if (lower.includes('hello') || lower.includes('hi')) {
    return "Hello! How can I help you today? I can assist with bookings, doctors, and hospital information."
  }
  return "I'm here to help with your appointments. You can ask about booking, doctors, or hospitals."
}

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "Hi! I'm your Tap&Book assistant. How can I help you today?" }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMsg = { id: Date.now(), from: 'user', text: trimmed }
    const botMsg = { id: Date.now() + 1, from: 'bot', text: getBotReply(trimmed) }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="page-container" style={{ paddingBottom: 80, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: 12 }}>
        <button onClick={() => window.history.back()}>← Back</button>
      </div>
      <div className="card" style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>Tap&Book Chat</div>
        <div style={{ color: '#6b7280', marginTop: 6 }}>Chat with our assistant</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 8,
            }}
          >
            <div
              style={{
                maxWidth: '75%',
                padding: '10px 14px',
                borderRadius: 16,
                background: msg.from === 'user' ? '#0D9488' : '#fff',
                color: msg.from === 'user' ? '#fff' : '#1f2937',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                fontSize: 14,
                lineHeight: 1.4,
                borderTopRightRadius: msg.from === 'user' ? 4 : 16,
                borderTopLeftRadius: msg.from === 'bot' ? 4 : 16,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: 12, display: 'flex', gap: 8 }}>
        <input
          className="text-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1 }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '0 16px',
            height: 48,
            borderRadius: 10,
            border: 'none',
            background: '#0D9488',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
      <BottomNav />
    </div>
  )
}

export default ChatPage