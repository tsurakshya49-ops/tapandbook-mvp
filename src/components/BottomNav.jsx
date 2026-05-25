import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// Bottom navigation bar shown on new screens
const BottomNav = () => {
  const location = useLocation()
  const tabs = [
    { path: '/dashboard', label: 'Home', emoji: '🏠' },
    { path: '/doctors', label: 'Doctors', emoji: '👨‍⚕️' },
    { path: '/bookings', label: 'Bookings', emoji: '📋' },
    { path: '/profile', label: 'Profile', emoji: '👤' },
    { path: '/chatbot', label: 'Chat', emoji: '💬' },
  ]
  const isActive = (p) => location.pathname === p || location.pathname.startsWith(p)

  const barStyle = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    background: '#fff',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 400,
    margin: '0 auto',
    width: '100%',
    zIndex: 50,
  }

  const tabStyle = (active) => ({
    textDecoration: 'none',
    color: active ? '#0D9488' : '#6b7280',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 12,
  })
  const iconStyle = (active) => ({
    fontSize: 20,
    lineHeight: 1,
    marginBottom: 4,
    filter: active ? 'saturate(1.2)' : 'grayscale(0.5)'
  })

  const underline = (active) => (
    active ? (
      <div style={{ position: 'absolute', top: -6, width: 24, height: 3, background: '#0D9488', left: '50%', transform: 'translateX(-12px)', borderRadius: 2 }} />
    ) : null
  )

  return (
    <nav style={barStyle} aria-label="Bottom navigation">
      {tabs.map((t) => (
        <Link key={t.path} to={t.path} style={tabStyle(isActive(t.path))}>
          {underline(isActive(t.path))}
          <span style={iconStyle(isActive(t.path))}>{t.emoji}</span>
          <span style={{ fontWeight: isActive(t.path) ? 600 : 500 }}>{t.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default BottomNav
