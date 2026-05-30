import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'

const DashboardPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const name = location.state?.name ?? localStorage.getItem('userName') ?? 'User'

  return (
    <div className="page-container" style={{ paddingBottom: 80 }}>
      <div className="header" style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Good morning, {name} 👋</div>
          <div style={{ color: '#64748b' }}>Find and book your hospital appointment</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>A</div>
      </div>

      <div className="search" style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: 12, padding: '10px 12px' }}>
          <span style={{ marginRight: 8 }}>🔎</span>
          <input placeholder="Search doctors, hospitals..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%' }} />
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 14, color: '#64748b' }}>Total Bookings</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#0f766e' }}>3</div>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 14, color: '#64748b' }}>Upcoming</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#0f766e' }}>1</div>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 14, color: '#64748b' }}>Completed</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#0f766e' }}>2</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: '#1f2937', marginBottom: 8 }}>Government Hospitals Near You</div>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 12, borderLeft: '6px solid #0D9488', padding: 12, marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ width: 8, height: 40, background: '#0D9488', borderRadius: 4, marginRight: 12 }} />
            <div>
              <div style={{ fontWeight: 600 }}>Bir Hospital</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>General & Specialist • Wait ~45 min • ⭐ 4.2</div>
              <div style={{ color: '#16a34a', fontSize: 12 }}>Open</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: '#1f2937', marginBottom: 8 }}>Available Doctors Today</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { name: 'Dr. Ramesh Sharma', spec: 'Cardiologist', hosp: 'Bir Hospital', rating: 4.8 },
            { name: 'Dr. Sita Koirala', spec: 'General Physician', hosp: 'TUTH', rating: 4.6 },
            { name: 'Dr. Bikash Thapa', spec: 'Orthopaedic Surgeon', hosp: 'Bir Hospital', rating: 4.7 },
          ].map((d, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0D9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{d.name.charAt(4)}</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{d.name}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{d.spec} • {d.hosp}</div>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>⭐ {d.rating}</div>
              <button style={{ marginTop: 8, width: '100%', padding: 8, background: '#0D9488', color: '#fff', border: 'none', borderRadius: 8 }} onClick={() => navigate('/doctor/1')}>View Profile</button>
            </div>
          ))}
        </div>
      </div>

      <button
        className="btn-primary"
        style={{ position: 'fixed', bottom: 78, left: '50%', transform: 'translateX(-50%)', borderRadius: 12, padding: '14px 20px', background: '#0D9488', color: '#fff', border: 'none', width: 260 }}
        onClick={() => navigate('/patient-details', { state: { phone: location.state?.phone } })}
      >
        Book an Appointment
      </button>
      <BottomNav />
    </div>
  )
}

export default DashboardPage
