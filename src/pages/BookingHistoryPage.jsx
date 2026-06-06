import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import { getBookings } from '../services/api.js'

const BookingCard = ({ booking, color }) => (
  <div className="card" style={{ padding: 12, borderLeft: `6px solid ${color || '#0D9488'}`, marginBottom: 12 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>✅ {booking.status || 'Confirmed'}</span>
      <span style={{ color: '#6b7280' }}>{booking.appointment_date || 'N/A'} | {booking.time_slot || 'N/A'}</span>
    </div>
    <div style={{ fontWeight: 700 }}>{booking.doctor_name || 'Unknown Doctor'} — {booking.hospital || 'Hospital'}</div>
    <div style={{ color: '#6b7280' }}>Token: #{booking.token_number || 'N/A'} {booking.id ? `| Booking ID: ${booking.id}` : ''}</div>
    <div style={{ color: '#6b7280' }}>Patient: {booking.patient_name || 'N/A'}</div>
    <div className="button-row" style={{ display: 'flex', gap: 8, marginTop: 6 }}>
      <button className="btn-outline" style={{ flex: 1 }} onClick={() => {}} >Show QR Code</button>
      <button className="btn-outline" style={{ flex: 1, borderColor: '#dc2626', color: '#dc2626' }} onClick={() => {}} >Cancel Appointment</button>
    </div>
  </div>
)

const BookingHistoryPage = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Upcoming')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch bookings from API on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const data = await getBookings()
        console.log('Fetched bookings data:', data)
        const bookingsList = Array.isArray(data) ? data : []
        console.log('Bookings list length:', bookingsList.length)
        setBookings(bookingsList)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch bookings:', err)
        setError('Failed to load bookings')
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  // Separate bookings into upcoming and past based on date
  const today = new Date().toISOString().split('T')[0]
  const upcoming = bookings.filter(b => b.appointment_date >= today)
  const past = bookings.filter(b => b.appointment_date < today)

  return (
    <div className="page-container" style={{ paddingBottom: 80 }}>
      <div style={{ width: '100%', padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>My Bookings</h2>
      </div>
      <div style={{ padding: 12, display: 'flex', justifyContent: 'center', gap: 8 }}>
        {['Upcoming', 'Past'].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '6px 12px', borderRadius: 999, border: 'none', background: tab === t ? '#0D9488' : '#fff', color: tab === t ? '#fff' : '#374151', fontWeight: 700 }}>{t}</button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 24 }}>⏳</div>
          <div style={{ color: '#6b7280', marginTop: 8 }}>Loading bookings...</div>
        </div>
      )}

      {error && !loading && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 24 }}>⚠️</div>
          <div style={{ color: '#dc2626', marginTop: 8 }}>{error}</div>
          <button className="btn-primary" style={{ marginTop: 12, width: 'auto', padding: '8px 24px' }} onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {!loading && !error && tab === 'Upcoming' && (
        <div style={{ padding: 12 }}>
          {upcoming.map((b, idx) => (
            <BookingCard key={b.id || idx} booking={b} color="#0D9488" />
          ))}
          {upcoming.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 60 }}>📋</div>
              <div>No upcoming bookings</div>
              <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => navigate('/book-appointment')}>Book Now</button>
            </div>
          )}
        </div>
      )}

      {!loading && !error && tab === 'Past' && (
        <div style={{ padding: 12 }}>
          {past.map((b, idx) => (
            <BookingCard key={b.id || idx} booking={b} />
          ))}
          {past.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 60 }}>📋</div>
              <div>No past bookings</div>
            </div>
          )}
        </div>
      )}

      <BottomNav />
    </div>
  )
}

export default BookingHistoryPage