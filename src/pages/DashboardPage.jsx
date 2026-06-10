import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import { getBookings } from '../services/api.js'

const hospitalsData = [
  { name: 'Bir Hospital', type: 'General & Specialist', wait: '~45 min', rating: 4.2, open: true },
  { name: 'Tribhuvan University Teaching Hospital', type: 'Teaching & Specialist', wait: '~60 min', rating: 4.4, open: true },
  { name: 'Kanti Children\'s Hospital', type: 'Paediatrics', wait: '~30 min', rating: 4.0, open: true },
]

const doctorsData = [
  { id: 1, name: 'Dr. Ramesh Sharma', spec: 'Cardiologist', hosp: 'Bir Hospital', rating: 4.8 },
  { id: 2, name: 'Dr. Sita Koirala', spec: 'General Physician', hosp: 'TUTH', rating: 4.6 },
  { id: 3, name: 'Dr. Bikash Thapa', spec: 'Orthopaedic Surgeon', hosp: 'Bir Hospital', rating: 4.7 },
]

const DashboardPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const name = localStorage.getItem('userName') || location.state?.name || 'User'
  const [totalBookings, setTotalBookings] = useState(0)
  const [upcomingCount, setUpcomingCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getBookings()
        const allBookings = Array.isArray(data) ? data : []
        const userPhone = localStorage.getItem('userPhone')
        console.log('Dashboard - UserPhone from localStorage:', userPhone)
        console.log('Dashboard - First booking patient_phone:', allBookings[0]?.patient_phone)
        const userBookings = userPhone ? allBookings.filter(b => b.patient_phone === userPhone) : allBookings
        setTotalBookings(userBookings.length)
        setUpcomingCount(userBookings.filter(b => b.status === 'Confirmed' || b.status === 'confirmed').length)
        setCompletedCount(userBookings.filter(b => b.status === 'Completed' || b.status === 'completed').length)
      } catch (err) {
        console.error('Failed to fetch booking stats:', err)
      }
    }
    fetchStats()
  }, [])

  const query = searchQuery.toLowerCase().trim()
  const isSearching = query.length > 0

  const filteredHospitals = hospitalsData.filter(h =>
    h.name.toLowerCase().includes(query) || h.type.toLowerCase().includes(query)
  )

  const filteredDoctors = doctorsData.filter(d =>
    d.name.toLowerCase().includes(query) ||
    d.spec.toLowerCase().includes(query) ||
    d.hosp.toLowerCase().includes(query)
  )

  return (
    <div className="page-container" style={{ paddingBottom: 80 }}>
      <div className="header" style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Good morning, {name} 👋</div>
          <div style={{ color: '#64748b' }}>Find and book your hospital appointment</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{name.charAt(0).toUpperCase()}</div>
      </div>

      <div className="search" style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: 12, padding: '10px 12px' }}>
          <span style={{ marginRight: 8 }}>🔎</span>
          <input
            placeholder="Search doctors, hospitals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%' }}
          />
          {isSearching && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#6b7280', padding: '0 4px' }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Stats - hidden during search */}
      {!isSearching && (
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 14, color: '#64748b' }}>Total Bookings</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#0f766e' }}>{totalBookings}</div>
            </div>
            <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 14, color: '#64748b' }}>Upcoming</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#0f766e' }}>{upcomingCount}</div>
            </div>
            <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 14, color: '#64748b' }}>Completed</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#0f766e' }}>{completedCount}</div>
            </div>
          </div>
        </div>
      )}

      {!isSearching && totalBookings === 0 && (
        <div style={{ padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: 40 }}>🎉</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginTop: 8 }}>Welcome to Tap&Book!</div>
            <div style={{ color: '#64748b', marginTop: 4 }}>Book your first appointment to get started.</div>
          </div>
        </div>
      )}

      {/* Search results */}
      {isSearching && (
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#1f2937', marginBottom: 8 }}>
            Search Results {filteredHospitals.length + filteredDoctors.length > 0 ? `(${filteredHospitals.length + filteredDoctors.length})` : ''}
          </div>

          {filteredHospitals.length === 0 && filteredDoctors.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 40 }}>🔍</div>
              <div style={{ color: '#647280', marginTop: 8 }}>No results found for "{searchQuery}"</div>
            </div>
          )}

          {filteredHospitals.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#64748b', marginBottom: 8 }}>Hospitals</div>
              {filteredHospitals.map((h, i) => (
                <div key={i} onClick={() => navigate('/book-appointment', { state: { hospital: h.name } })} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 12, borderLeft: '6px solid #0D9488', padding: 12, marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                  <div style={{ width: 8, height: 40, background: '#0D9488', borderRadius: 4, marginRight: 12 }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{h.name}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{h.type} • Wait {h.wait} • ⭐ {h.rating}</div>
                    <div style={{ color: h.open ? '#16a34a' : '#dc2626', fontSize: 12 }}>{h.open ? 'Open' : 'Closed'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredDoctors.length > 0 && (
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#64748b', marginBottom: 8 }}>Doctors</div>
              {filteredDoctors.map((d, idx) => (
                <div key={idx} onClick={() => navigate(`/doctor/${d.id}`)} style={{ background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 12, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0D9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{d.name.charAt(4)}</div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{d.name}</div>
                      <div style={{ color: '#64748b', fontSize: 12 }}>{d.spec} • {d.hosp}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>⭐ {d.rating}</div>
                  <button style={{ marginTop: 8, width: '100%', padding: 8, background: '#0D9488', color: '#fff', border: 'none', borderRadius: 8 }} onClick={(e) => { e.stopPropagation(); navigate(`/doctor/${d.id}`) }}>View Profile</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Default sections - hidden during search */}
      {!isSearching && (
        <>
          <div style={{ padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#1f2937', marginBottom: 8 }}>Government Hospitals Near You</div>
            {hospitalsData.map((h, i) => (
              <div key={i} onClick={() => navigate('/book-appointment', { state: { hospital: h.name } })} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 12, borderLeft: '6px solid #0D9488', padding: 12, marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                <div style={{ width: 8, height: 40, background: '#0D9488', borderRadius: 4, marginRight: 12 }} />
                <div>
                  <div style={{ fontWeight: 600 }}>{h.name}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{h.type} • Wait {h.wait} • ⭐ {h.rating}</div>
                  <div style={{ color: h.open ? '#16a34a' : '#dc2626', fontSize: 12 }}>{h.open ? 'Open' : 'Closed'}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#1f2937', marginBottom: 8 }}>Available Doctors Today</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {doctorsData.map((d, idx) => (
                <div key={idx} onClick={() => navigate(`/doctor/${d.id}`)} style={{ background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0D9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{d.name.charAt(4)}</div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{d.name}</div>
                      <div style={{ color: '#64748b', fontSize: 12 }}>{d.spec} • {d.hosp}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>⭐ {d.rating}</div>
                  <button style={{ marginTop: 8, width: '100%', padding: 8, background: '#0D9488', color: '#fff', border: 'none', borderRadius: 8 }} onClick={(e) => { e.stopPropagation(); navigate(`/doctor/${d.id}`) }}>View Profile</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

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