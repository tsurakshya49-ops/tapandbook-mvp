import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const hospitals = [
  'Bir Hospital',
  'Tribhuvan University Teaching Hospital (TUTH)',
  'Kanti Children\'s Hospital',
  'Civil Hospital Kathmandu',
]

const departments = [
  'General Medicine',
  'Orthopaedics',
  'Cardiology',
  'Paediatrics',
  'ENT (Ear, Nose & Throat)',
  'Gynaecology',
]

const BookAppointmentPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [hospital, setHospital] = useState('')
  const [department, setDepartment] = useState('')
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [reason, setReason] = useState('')

  // date min today
  const today = new Date().toISOString().split('T')[0]

  // merge any patient data from previous step
  const prev = location.state ?? {}
  const patientName = prev.name ?? ''

  const canConfirm = hospital && department && date && slot

  const onConfirm = () => {
    if (!canConfirm) return
    const token = '#0' + Math.floor(Math.random() * 90 + 10).toString().padStart(2, '0')
    const bookingId = 'TB-2026-' + Math.floor(Math.random() * 9000 + 1000).toString()
    const qrContent = `${patientName}|${hospital}|${department}|${date}|${bookingId}`
    navigate('/confirmation/success', {
      state: {
        patientName,
        hospital,
        department,
        date,
        slot,
        bookingId,
        token,
        qrContent,
      },
    })
  }

  const goBack = () => navigate('/patient-details', { state: prev })

  return (
    <div className="page-container">
      <div className="card">
        <div className="stepbar">
          <span className="step filled">2</span>
          <span className="step-line" />
          <span className="step active">2</span>
        </div>
        <h1>Book Your Appointment</h1>
        <p className="sub">Select your hospital, department and preferred time</p>

        <label className="field-label">Select Hospital</label>
        <select className="text-input" value={hospital} onChange={(e) => setHospital(e.target.value)}>
          <option value="">Choose hospital</option>
          {hospitals.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>

        <label className="field-label">Select Department</label>
        <select className="text-input" value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Choose department</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <label className="field-label">Preferred Date</label>
        <input className="text-input" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />

        <div className="slot-row">
          {['Morning', 'Afternoon'].map((t, idx) => {
            const isMorning = t === 'Morning'
            const isSelected = slot === t
            return (
              <div
                key={t}
                className={`slot-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSlot(t)}
                role="button"
                aria-label={t}
              >
                <span className="slot-icon">{isMorning ? '🌅' : '🌇'}</span>
                <span className="slot-text">{t} 9AM – {isMorning ? '12PM' : '4PM'}</span>
              </div>
            )
          })}
        </div>

        <label className="field-label">Reason for Visit</label>
        <textarea className="text-input" rows={3} placeholder="e.g. follow-up consultation, fever, knee pain" value={reason} onChange={(e) => setReason(e.target.value)} />

        <button className="btn-primary" onClick={onConfirm} disabled={!canConfirm} aria-disabled={!canConfirm}>
          Confirm Booking
        </button>
        <button className="btn-outline" onClick={goBack}>← Back</button>
      </div>
    </div>
  )
}

export default BookAppointmentPage
