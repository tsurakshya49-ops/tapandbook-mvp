import React, { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav.jsx'
import { getBookings } from '../services/api.js'

const ProfilePage = () => {
  const name = localStorage.getItem('userName') ?? 'User'
  const phone = localStorage.getItem('userPhone') ?? 'Not set'
  const initial = name.charAt(0).toUpperCase()
  const [totalAppointments, setTotalAppointments] = useState(0)
  const [hospitalsVisited, setHospitalsVisited] = useState(0)
  const [doctorsConsulted, setDoctorsConsulted] = useState(0)

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
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="label">Personal Details</span>
          </div>
          <div className="row"><span className="label">Date of Birth</span><span> Not provided</span></div>
          <div className="row"><span className="label">Gender</span><span> Not provided</span></div>
          <div className="row"><span className="label">Address</span><span> Not provided</span></div>
          <div className="row"><span className="label">Emergency Contact</span><span> Not provided</span></div>
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
            <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid #f0f0f0' }}>
              <span>{s}</span>
              <span>›</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: 12 }}>
        <button className="btn-outline" style={{ width: '100%', borderColor: '#dc2626', color: '#dc2626' }} onClick={() => window.location.href = '/'}>Logout</button>
      </div>

      <BottomNav />
    </div>
  )
}

export default ProfilePage