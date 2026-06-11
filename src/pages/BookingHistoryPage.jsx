import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import BottomNav from '../components/BottomNav.jsx'
import { getBookings, cancelBooking } from '../services/api.js'

const BookingCard = ({ booking, color, onShowQR, onCancel }) => (
  <div className="card" style={{ padding: 12, borderLeft: `6px solid ${color || '#0D9488'}`, marginBottom: 12, opacity: booking.status === 'Cancelled' ? 0.6 : 1 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{booking.status === 'Cancelled' ? '❌' : '✅'} {booking.status || 'Confirmed'}</span>
      <span style={{ color: '#6b7280' }}>{booking.appointment_date || 'N/A'} | {booking.time_slot || 'N/A'}</span>
    </div>
    <div style={{ fontWeight: 700 }}>{booking.doctor_name || 'Unknown Doctor'} — {booking.hospital || 'Hospital'}</div>
    <div style={{ color: '#6b7280' }}>Token: #{booking.token_number || 'N/A'} {booking.id ? `| Booking ID: ${booking.id}` : ''}</div>
    <div style={{ color: '#6b7280' }}>Patient: {booking.patient_name || 'N/A'}</div>
    {booking.status !== 'Cancelled' && (
      <div className="button-row" style={{ display: 'flex', gap: 8, marginTop: 6 }}>
        <button className="btn-outline" style={{ flex: 1 }} onClick={() => onShowQR(booking)}>Show QR Code</button>
        <button className="btn-outline" style={{ flex: 1, borderColor: '#dc2626', color: '#dc2626' }} onClick={() => onCancel(booking.id)}>Cancel Appointment</button>
      </div>
    )}
  </div>
)

const QRModal = ({ booking, onClose }) => {
  if (!booking) return null
  const qrContent = `${booking.patient_name}|${booking.hospital}|${booking.speciality}|${booking.appointment_date}|${booking.id}`

  return (
    <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, padding: 24, maxWidth: 340, width: '90%', textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Booking QR Code</div>
        <div style={{ marginBottom: 12 }}>
          <QRCodeSVG value={qrContent} size={180} />
        </div>
        <div style={{ fontWeight: 600 }}>{booking.patient_name}</div>
        <div style={{ color: '#6b7280', fontSize: 13 }}>{booking.doctor_name} — {booking.hospital}</div>
        <div style={{ color: '#6b7280', fontSize: 13 }}>{booking.appointment_date} | {booking.time_slot}</div>
        <div style={{ color: '#6b7280', fontSize: 13 }}>Token: #{booking.token_number}</div>
        <div style={{ color: '#6b7280', fontSize: 12, marginTop: 8 }}>Show this QR code at the hospital reception</div>
        <button onClick={onClose} style={{ marginTop: 12, padding: '8px 24px', background: '#0D9488', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  )
}

const BookingHistoryPage = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Upcoming')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [qrBooking, setQrBooking] = useState(null)
  const [cancellingId, setCancellingId] = useState(null)
  const [cancelBookingId, setCancelBookingId] = useState(null)

  // Fetch bookings from API on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const data = await getBookings()
        console.log('Fetched bookings data:', data)
        const bookingsList = Array.isArray(data) ? data : []
        const userPhone = localStorage.getItem('userPhone')
        console.log('UserPhone from localStorage:', userPhone)
        console.log('First booking patient_phone:', bookingsList[0]?.patient_phone)
        console.log('Bookings list length:', bookingsList.length)
        const userBookings = userPhone ? bookingsList.filter(b => b.patient_phone === userPhone) : bookingsList
        setBookings(userBookings)
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

  const handleShowQR = (booking) => {
    setQrBooking(booking)
  }

  const handleCancel = (bookingId) => {
    setCancelBookingId(bookingId)
  }

  const confirmCancel = async () => {
    const bookingId = cancelBookingId
    if (!bookingId) return
    setCancelBookingId(null)
    try {
      setCancellingId(bookingId)
      await cancelBooking(bookingId)
      // Update the booking status in local state
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    } catch (err) {
      console.error('Failed to cancel booking:', err)
      alert('Failed to cancel appointment. Please try again.')
    } finally {
      setCancellingId(null)
    }
  }

  // Separate bookings into upcoming and past based on date, excluding cancelled from upcoming
  const today = new Date().toISOString().split('T')[0]
  const upcoming = bookings.filter(b => b.appointment_date >= today && b.status !== 'Cancelled')
  const past = bookings.filter(b => b.appointment_date < today || b.status === 'Cancelled')

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
            <BookingCard key={b.id || idx} booking={b} color="#0D9488" onShowQR={handleShowQR} onCancel={handleCancel} />
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
            <BookingCard key={b.id || idx} booking={b} onShowQR={handleShowQR} onCancel={handleCancel} />
          ))}
          {past.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 60 }}>📋</div>
              <div>No past bookings</div>
            </div>
          )}
        </div>
      )}

      {cancellingId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#fff', padding: 20, borderRadius: 12 }}>Cancelling...</div>
        </div>
      )}

      {qrBooking && <QRModal booking={qrBooking} onClose={() => setQrBooking(null)} />}

      {cancelBookingId && (
        <div onClick={() => setCancelBookingId(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, padding: 24, maxWidth: 340, width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>⚠️</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Cancel Appointment?</div>
            <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>Are you sure you want to cancel your appointment? Once cancel cannot be undone.</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setCancelBookingId(null)} style={{ flex: 1, padding: '10px 16px', borderRadius: 10, border: '2px solid #0D9488', background: '#fff', color: '#0D9488', fontWeight: 700, cursor: 'pointer' }}>Keep Appointment</button>
              <button onClick={confirmCancel} style={{ flex: 1, padding: '10px 16px', borderRadius: 10, border: 'none', background: '#dc2626', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}

export default BookingHistoryPage