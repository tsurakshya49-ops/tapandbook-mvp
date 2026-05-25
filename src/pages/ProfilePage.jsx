import React from 'react'
import BottomNav from '../components/BottomNav.jsx'

const ProfilePage = () => {
  return (
    <div className="page-container" style={{ paddingBottom: 80 }}>
      <div style={{ padding: 12 }}>
        <h2>My Profile</h2>
      </div>
      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: 12 }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', padding: 16, gap: 12 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#0D9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>A</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Aryan Thapa</div>
            <div style={{ color: '#6b7280' }}>+977 9812345678</div>
            <div>Member since: January 2026</div>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: 12 }}>
        <div className="card" style={{ padding: 12 }}>
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="label">Personal Details</span>
          </div>
          <div className="row"><span className="label">Date of Birth</span><span> 15 March 1998</span></div>
          <div className="row"><span className="label">Gender</span><span> Male</span></div>
          <div className="row"><span className="label">Address</span><span> Kathmandu, Bagmati Province</span></div>
          <div className="row"><span className="label">Emergency Contact</span><span> +977 9800000000</span></div>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: 12 }}>
        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 700 }}>App Statistics</div>
          <div className="row"><span className="label">Total Appointments</span><span> 3</span></div>
          <div className="row"><span className="label">Hospitals Visited</span><span> 2</span></div>
          <div className="row"><span className="label">Doctors Consulted</span><span> 3</span></div>
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
