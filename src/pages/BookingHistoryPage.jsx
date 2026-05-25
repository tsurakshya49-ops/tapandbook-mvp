import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'

const BookingCard = ({ booking, color }) => (
  <div className="card" style={{ padding: 12, borderLeft: `6px solid ${color || '#0D9488'}`, marginBottom: 12 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>✅ {booking.status}</span>
      <span style={{ color: '#6b7280' }}>{booking.date} | {booking.time}</span>
    </div>
    <div style={{ fontWeight: 700 }}>{booking.doctor} — {booking.hospital}</div>
    <div style={{ color: '#6b7280' }}>Token: {booking.token} | Booking ID: {booking.bookingId}</div>
    <div className="button-row" style={{ display: 'flex', gap: 8, marginTop: 6 }}>
      <button className="btn-outline" style={{ flex: 1 }} onClick={() => {}} >Show QR Code</button>
      <button className="btn-outline" style={{ flex: 1, borderColor: '#dc2626', color: '#dc2626' }} onClick={() => {}} >Cancel Appointment</button>
    </div>
  </div>
)

const BookingHistoryPage = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Upcoming')
  const upcoming = [
    {
      id: 1,
      status: 'Confirmed',
      doctor: 'Dr. Anita Rai',
      hospital: 'Kanti Children\'s Hospital',
      date: 'Tomorrow',
      time: '10:00 AM',
      token: '#042',
      bookingId: 'TB-2026-3159',
      showQR: false
    }
  ]
  const past = [
    { id: 2, status: 'Completed', doctor: 'Dr. Ramesh Sharma', hospital: 'Bir Hospital', date: '15 Apr 2026', time: '02:30 PM', token: '#018', bookingId: 'TB-2026-1842' },
    { id: 3, status: 'Completed', doctor: 'Dr. Sita Koirala', hospital: 'TUTH', date: '2 Mar 2026', time: '10:00 AM', token: '#031', bookingId: 'TB-2026-0923' }
  ]

  return (
    <div className="page-container" style={{ paddingBottom: 80 }}>
      <div style={{ width: '100%', padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>My Bookings</h2>
      </div>
      <div style={{ padding: 12, display: 'flex', gap: 8 }}>
        {['Upcoming', 'Past'].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '6px 12px', borderRadius: 999, border: 'none', background: tab === t ? '#0D9488' : '#fff', color: tab === t ? '#fff' : '#374151', fontWeight: 700 }}>{t}</button>
        ))}
      </div>

      {tab === 'Upcoming' && (
        <div style={{ padding: 12 }}>
          {upcoming.map((b) => (
            <BookingCard key={b.id} booking={b} color="#0D9488" />
          ))}
          {upcoming.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 60 }}>📋</div>
              <div>No bookings yet</div>
              <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => navigate('/book-appointment')}>Book Now</button>
            </div>
          )}
        </div>
      )}

      {tab === 'Past' && (
        <div style={{ padding: 12 }}>
          {past.map((b) => (
            <BookingCard key={b.id} booking={b} />
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  )
}

export default BookingHistoryPage
