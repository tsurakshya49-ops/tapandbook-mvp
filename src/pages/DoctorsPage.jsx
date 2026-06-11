import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DOCTORS } from './mockData.js'
import BottomNav from '../components/BottomNav.jsx'

const DoctorCard = ({ d, onView }) => {
  const initials = d.name.split(' ').map(n => n.charAt(0)).slice(0,2).join('')
  return (
    <div onClick={() => onView(d.id)} style={{ display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,.08)', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#0D9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginRight: 12 }}>{initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>{d.name}</div>
          <div style={{ color: '#6b7280', fontSize: 12 }}>{d.specialty} • {d.hospital}</div>
          <div>⭐ {d.rating} ({d.reviews} reviews)</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #0D9488', color: '#0D9488', fontSize: 12, display: 'inline-block' }}>{d.availability || 'Available'}</div>
        <button style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #0D9488', background: '#fff', color: '#0D9488' }} onClick={(e) => { e.stopPropagation(); onView(d.id) }}>View Profile</button>
      </div>
    </div>
  )
}

const DoctorsPage = () => {
  const navigate = useNavigate()
  const [activeCat, setActiveCat] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const categories = ['All', 'General', 'Cardiology', 'Orthopaedics', 'Paediatrics', 'ENT', 'Gynaecology']
  const categoryKeywords = {
    'General': ['general'],
    'Cardiology': ['cardio', 'cardiologist'],
    'Orthopaedics': ['orthopaed'],
    'Paediatrics': ['paediatric'],
    'ENT': ['ent'],
    'Gynaecology': ['gynaec'],
  }
  const categoryFiltered = DOCTORS.filter((d) => {
    if (activeCat === 'All') return true
    const c = d.specialty.toLowerCase()
    const keywords = categoryKeywords[activeCat] || [activeCat.toLowerCase()]
    return keywords.some(kw => c.includes(kw))
  })

  const query = searchQuery.toLowerCase().trim()
  const filtered = query
    ? categoryFiltered.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.specialty.toLowerCase().includes(query) ||
        d.hospital.toLowerCase().includes(query)
      )
    : categoryFiltered

  return (
    <div className="page-container" style={{ paddingBottom: 80 }}>
      <div style={{ width: '100%', padding: 12, display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate('/dashboard')} style={{ marginRight: 8 }}>←</button>
        <h2 style={{ margin: 0 }}>Find a Doctor</h2>
      </div>

      <div className="search" style={{ padding: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: 12, padding: '10px 12px' }}>
          <span style={{ marginRight: 8 }}>🔎</span>
          <input placeholder="Search by name or specialty..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%' }} />
          {query && (
            <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#6b7280', padding: '0 4px' }}>✕</button>
          )}
        </div>
      </div>

      <div style={{ padding: 12, display: 'flex', overflowX: 'auto', gap: 8 }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            style={{ padding: '6px 12px', borderRadius: 999, border: '1px solid #e5e7eb', background: activeCat === c ? '#0D9488' : '#fff', color: activeCat === c ? '#fff' : '#374151', fontWeight: 600, whiteSpace: 'nowrap' }}
          >{c}</button>
        ))}
      </div>

      <div style={{ padding: 12 }}>
        {filtered.map((d) => (
          <DoctorCard key={d.id} d={d} onView={(id) => navigate(`/doctor/${id}`)} />
        ))}
      </div>

      <BottomNav />
    </div>
  )
}

export default DoctorsPage
