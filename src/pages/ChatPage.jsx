import React from 'react'
import BottomNav from '../components/BottomNav.jsx'

const ChatPage = () => {
  return (
    <div className="page-container" style={{ paddingBottom: 80 }}>
      <div style={{ padding: 12 }}>
        <button onClick={() => window.history.back()}>← Back</button>
      </div>
      <div className="card" style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>Tap&Book Chat</div>
        <div style={{ color: '#6b7280', marginTop: 6 }}>Chat with support (mock)</div>
      </div>
      <div style={{ padding: 12 }}>
        <input className="text-input" placeholder="Type your message..." style={{ width: '100%' }} />
      </div>
      <BottomNav />
    </div>
  )
}

export default ChatPage
