import React, { useState, useRef, useEffect } from 'react'
import BottomNav from '../components/BottomNav.jsx'

const getBotReply = (message) => {
  const lower = message.toLowerCase()
  if (lower.includes('fever') || lower.includes('temperature')) {
    return "For fever, you can take Paracetamol (500mg) every 6 hours. Stay hydrated and rest. If fever exceeds 39°C or lasts more than 3 days, please book a doctor appointment immediately."
  }
  if (lower.includes('headache') || lower.includes('head pain')) {
    return "For headache, try Paracetamol (500mg) or Ibuprofen (400mg) with food. Rest in a quiet dark room and drink plenty of water. If headache is severe or recurring, consult a doctor."
  }
  if (lower.includes('cold') || lower.includes('cough') || lower.includes('runny nose')) {
    return "For cold and cough, Cetirizine (10mg) can help with runny nose. For cough, try Benadryl syrup or honey with warm water. Rest and stay warm. See a doctor if symptoms persist beyond 7 days."
  }
  if (lower.includes('stomach') || lower.includes('vomit') || lower.includes('nausea') || lower.includes('diarrhea')) {
    return "For stomach issues, take ORS (oral rehydration solution) to stay hydrated. Metronidazole or Norfloxacin may help for diarrhea - consult a pharmacist. Eat light foods like rice and banana. See a doctor if severe."
  }
  if (lower.includes('pain') || lower.includes('body ache') || lower.includes('muscle')) {
    return "For body pain or aches, Ibuprofen (400mg) or Paracetamol (500mg) every 6-8 hours with food can help. Rest and apply warm compress. If pain is severe or persistent, book a doctor appointment."
  }
  if (lower.includes('medicine') || lower.includes('suggest') || lower.includes('recommend') || lower.includes('drug')) {
    return "I can suggest basic medicines for common symptoms. Tell me your symptoms like fever, headache, cold, stomach pain, or body ache and I'll help!"
  }
  if (lower.includes('unwell') || lower.includes('sick') || lower.includes('feeling')) {
    return "I'm sorry to hear you're not feeling well. Please describe your symptoms (fever, headache, cold, stomach pain) and I can suggest some medicines. For serious conditions, always consult a doctor."
  }
  if (lower.includes('book') || lower.includes('appointment')) {
    return "To book an appointment: tap Home → Book an Appointment → select a doctor → choose a time slot → confirm."
  }
  if (lower.includes('doctor') || lower.includes('specialist')) {
    return "Browse all available doctors in the Doctors tab. You can see their speciality, hospital, and ratings."
  }
  if (lower.includes('hospital')) {
    return "Tap&Book connects you with government hospitals in Nepal including Bir Hospital and TUTH."
  }
  if (lower.includes('token') || lower.includes('queue')) {
    return "Your token number is assigned when you book. Show your token number at the hospital reception."
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hello! I'm your Tap&Book health assistant. I can suggest medicines for common symptoms or help you book a doctor appointment. How can I help?"
  }
  if (lower.includes('thank')) {
    return "You're welcome! Stay healthy and take care. 😊"
  }
  if (lower.includes('cancel') || lower.includes('reschedule')) {
    return "To cancel or reschedule, please contact the hospital directly."
  }
  return "I can help with medicine suggestions for fever, headache, cold, stomach issues, or body pain. I can also help you book doctor appointments. What do you need?"
}

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "Hello! I'm your Tap&Book health assistant. How can I help you today?" }
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