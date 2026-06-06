import React, { useState, useRef, useEffect } from 'react'
import BottomNav from '../components/BottomNav.jsx'

const getBotReply = (message) => {
  const lower = message.toLowerCase()
  if (lower.includes('unwell') || lower.includes('sick') || lower.includes('fever') || lower.includes('pain') || lower.includes('feeling')) {
    return "I'm sorry to hear that. Please book an appointment with a doctor through the Home tab. For emergencies, call 102."
  }
  if (lower.includes('book') || lower.includes('appointment')) {
    return "To book an appointment: tap Home → Book an Appointment → select a doctor → choose a time slot → confirm."
  }
  if (lower.includes('doctor') || lower.includes('specialist')) {
    return "Browse all available doctors in the Doctors tab. You can see their speciality, hospital, and ratings."
  }
  if (lower.includes('cancel') || lower.includes('reschedule')) {
    return "To cancel or reschedule, please contact the hospital directly or call their reception."
  }
  if (lower.includes('hospital')) {
    return "Tap&Book connects you with government hospitals in Nepal including Bir Hospital and TUTH."
  }
  if (lower.includes('token') || lower.includes('queue')) {
    return "Your token number is assigned when you book. Arrive at the hospital and show your token number at reception."
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hello! I'm your Tap&Book assistant. I can help with bookings, doctors, hospitals, and appointments."
  }
  if (lower.includes('thank')) {
    return "You're welcome! Stay healthy and take care."
  }
  return "I can help you with booking appointments, finding doctors, or hospital information. What would you like to know?"
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