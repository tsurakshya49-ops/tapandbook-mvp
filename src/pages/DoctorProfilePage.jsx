import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DOCTORS } from './mockData.js'
import BottomNav from '../components/BottomNav.jsx'

const DoctorProfilePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const doc = DOCTORS.find((d) => String(d.id) === id) || DOCTORS[0]
  const [selected, setSelected] = useState(null)

  const slots = [
    { time: '9:00AM', state: 'Available' }, { time: '9:30AM', state: 'Booked' }, { time: '10:00AM', state: 'Available' }, { time: '10:30AM', state: 'Available' },
    { time: '11:00AM', state: 'Available' }, { time: '11:30AM', state: 'Booked' }, { time: '1:00PM', state: 'Available' }, { time: '1:30PM', state: 'Available' },
    { time: '2:00PM', state: 'Available' }, { time: '2:30PM', state: 'Booked' }, { time: '3:00PM', state: 'Available' }, { time: '3:30PM', state: 'Available' },
  ]

  const onSlotClick = (idx) => {
    if (slots[idx].state === 'Booked') return
    setSelected(slots[idx].time)
  }

  const onBook = () => {
    navigate('/patient-details', { state: { name: 'Guest' } })
  }

  return (
    <div className="page-container" style={{ paddingBottom: 80 }}>
      <div style={{ padding: 12 }}>
        <button onClick={() => navigate('/dashboard')}>← Back</button>
      </div>
      <div style={{ background: '#0D9488', color: '#fff', padding: 24, borderRadius: 12, width: '100%', maxWidth: 520, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#fff', color: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{doc.name.charAt(0)}{doc.name.split(' ').slice(1,2)[0]?.charAt(0) ?? ''}</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{doc.name}</div>
            <div style={{ color: '#d7fffe' }}>{doc.specialty} • {doc.hospital}</div>
            <div>⭐ {doc.rating} ({doc.reviews} reviews)</div>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 520, margin: '16px auto', padding: 12 }}>
        <div className="card" style={{ padding: 12 }}>
          <h3>About</h3>
          <p>Dr. {doc.name} is a senior {doc.specialty.toLowerCase()} at {doc.hospital}. This is a dummy bio for demonstration purposes.</p>
          <div className="row"><span className="label">Experience</span><span> {doc.experience ?? 10} yrs</span></div>
          <div className="row"><span className="label">Languages</span><span> Nepali, English</span></div>
          <div className="row"><span className="label">Education</span><span> MBBS - TU, MD</span></div>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Available Time Slots</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {slots.map((s, idx) => (
            <button
              key={s.time}
              className={`slot-card ${selected === s.time ? 'selected' : ''}`}
              style={{ width: '100%', opacity: s.state === 'Booked' ? 0.5 : 1 }}
              onClick={() => onSlotClick(idx)}
              disabled={s.state === 'Booked'}
            >
              <span className="slot-text" style={{ display: 'block' }}>{s.time}</span>
              <span className="caption" style={{ display: 'block' }}>{s.state}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: 12 }}>
        <button className="btn-primary" style={{ width: '100%' }} onClick={onBook}>Book Appointment</button>
      </div>

      <BottomNav />
    </div>
  )
}

export default DoctorProfilePage
