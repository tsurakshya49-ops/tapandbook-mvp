import React, { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav.jsx'
import { getBookings } from '../services/api.js'

const settingsContent = {
  'Notifications': 'Notification preferences will be available in a future update. Stay tuned!',
  'Privacy Settings': 'Your data is stored securely. Privacy settings will be available soon.',
  'Help & Support': 'Bir Hospital: 01-4221119\nTUTH: 01-4412303\nKanti Children\'s Hospital: 01-4225555\n\nFor app support, email: support@tapandbook.com',
  'Rate the App': 'Thank you for using Tap&Book! We\'d love your feedback. Please rate us on the app store.',
  'Contact Us': 'Tap&Book Support\nEmail: support@tapandbook.com\nPhone: +977-1-4XXXXXX\nAddress: Kathmandu, Nepal',
}

const InfoModal = ({ title, message, onClose }) => (
  <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
    <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, padding: 24, maxWidth: 360, width: '90%', textAlign: 'center' }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{title}</div>
      <div style={{ color: '#6b7280', fontSize: 14, whiteSpace: 'pre-line', lineHeight: 1.6 }}>{message}</div>
      <button onClick={onClose} style={{ marginTop: 16, padding: '8px 24px', background: '#0D9488', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>OK</button>
    </div>
  </div>
)

const EditDetailsModal = ({ details, onSave, onClose }) => {
  const [dob, setDob] = useState(details.dob || '')
  const [gender, setGender] = useState(details.gender || '')
  const [address, setAddress] = useState(details.address || '')
  const [emergency, setEmergency] = useState(details.emergency || '')

  const handleSave = () => {
    onSave({ dob, gender, address, emergency })
    onClose()
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, padding: 24, maxWidth: 380, width: '90%' }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, textAlign: 'center' }}>Edit Personal Details</div>

        <label style={{ fontSize: 12, color: '#374151', marginBottom: 4, display: 'block' }}>Date of Birth</label>
        <input className="text-input" type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={{ marginBottom: 12 }} />

        <label style={{ fontSize: 12, color: '#374151', marginBottom: 4, display: 'block' }}>Gender</label>
        <select className="text-input" value={gender} onChange={(e) => setGender(e.target.value)} style={{ marginBottom: 12 }}>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>

        <label style={{ fontSize: 12, color: '#374151', marginBottom: 4, display: 'block' }}>Address</label>
        <input className="text-input" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" style={{ marginBottom: 12 }} />

        <label style={{ fontSize: 12, color: '#374151', marginBottom: 4, display: 'block' }}>Emergency Contact</label>
        <input className="text-input" value={emergency} onChange={(e) => setEmergency(e.target.value)} placeholder="+977 98XXXXXXXX" style={{ marginBottom: 16 }} />

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px 16px', borderRadius: 10, border: '2px solid #0D9488', background: '#fff', color: '#0D9488', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleSave} style={{ flex: 1, padding: '10px 16px', borderRadius: 10, border: 'none', background: '#0D9488', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Save</button>
        </div>
      </div>
    </div>
  )
}

const ProfilePage = () => {
  const name = localStorage.getItem('userName') ?? 'User'
  const phone = localStorage.getItem('userPhone') ?? 'Not set'
  const initial = name.charAt(0).toUpperCase()
  const [totalAppointments, setTotalAppointments] = useState(0)
  const [hospitalsVisited, setHospitalsVisited] = useState(0)
  const [doctorsConsulted, setDoctorsConsulted] = useState(0)
  const [infoModal, setInfoModal] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [details, setDetails] = useState({
    dob: localStorage.getItem('userDob') || '',
    gender: localStorage.getItem('userGender') || '',
    address: localStorage.getItem('userAddress') || '',
    emergency: localStorage.getItem('userEmergency') || '',
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getBookings()
        const allBookings = Array.isArray(data) ? data : []
        const userPhone = localStorage.getItem('userPhone')
        const userBookings = userPhone ? allBookings.filter(b => b.patient_phone === userPhone) : allBookings
        setTotalAppointments(userBookings.length)
        setHospitalsVisited(new Set(userBookings.map(b => b.hospital).filter(Boolean)).size)
        setDoctorsConsulted(new Set(userBookings.map(b => b.doctor_name).filter(Boolean)).size)
      } catch (err) {
        console.error('Failed to fetch profile stats:', err)
      }
    }
    fetchStats()
  }, [])

  const handleSaveDetails = (updated) => {
    localStorage.setItem('userDob', updated.dob)
    localStorage.setItem('userGender', updated.gender)
    localStorage.setItem('userAddress', updated.address)
    localStorage.setItem('userEmergency', updated.emergency)
    setDetails(updated)
  }

  return (
    <div className="page-container" style={{ paddingBottom: 80 }}>
      <div style={{ padding: 12 }}>
        <h2>My Profile</h2>
      </div>
      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: 12 }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', padding: 16, gap: 12 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#0D9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 32 }}>{initial}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{name}</div>
            <div style={{ color: '#6b7280' }}>{phone}</div>
            <div>Member since: 2026</div>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: 12 }}>
        <div className="card" style={{ padding: 12 }}>
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="label">Personal Details</span>
            <button onClick={() => setShowEditModal(true)} style={{ background: 'none', border: '1px solid #0D9488', color: '#0D9488', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Edit</button>
          </div>
          <div className="row"><span className="label">Date of Birth</span><span>{details.dob || ' Not provided'}</span></div>
          <div className="row"><span className="label">Gender</span><span>{details.gender || ' Not provided'}</span></div>
          <div className="row"><span className="label">Address</span><span>{details.address || ' Not provided'}</span></div>
          <div className="row"><span className="label">Emergency Contact</span><span>{details.emergency || ' Not provided'}</span></div>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: 12 }}>
        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 700 }}>App Statistics</div>
          <div className="row"><span className="label">Total Appointments</span><span> {totalAppointments}</span></div>
          <div className="row"><span className="label">Hospitals Visited</span><span> {hospitalsVisited}</span></div>
          <div className="row"><span className="label">Doctors Consulted</span><span> {doctorsConsulted}</span></div>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: 12 }}>
        <div className="card" style={{ padding: 12 }}>
          {['Notifications', 'Privacy Settings', 'Help & Support', 'Rate the App', 'Contact Us'].map((s) => (
            <div key={s} onClick={() => setInfoModal({ title: s, message: settingsContent[s] })} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid #f0f0f0', cursor: 'pointer' }}>
              <span>{s}</span>
              <span>›</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: 12 }}>
        <button className="btn-outline" style={{ width: '100%', borderColor: '#dc2626', color: '#dc2626' }} onClick={() => window.location.href = '/'}>Logout</button>
      </div>

      {infoModal && <InfoModal title={infoModal.title} message={infoModal.message} onClose={() => setInfoModal(null)} />}
      {showEditModal && <EditDetailsModal details={details} onSave={handleSaveDetails} onClose={() => setShowEditModal(false)} />}

      <BottomNav />
    </div>
  )
}

export default ProfilePage