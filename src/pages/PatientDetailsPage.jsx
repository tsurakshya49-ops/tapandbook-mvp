import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const GenderOptions = ['Male', 'Female', 'Other', 'Prefer not to say']

const PatientDetailsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [name, setName] = useState(location.state?.name ?? '')
  const [dob, setDob] = useState(location.state?.dob ?? '')
  const [gender, setGender] = useState(location.state?.gender ?? '')
  const [address, setAddress] = useState(location.state?.address ?? '')
  const [emergency, setEmergency] = useState(location.state?.emergency ?? '')
  const [errors, setErrors] = useState({ name: '', dob: '', gender: '', address: '', emergency: '' })

  const validate = () => {
    const e = { name: '', dob: '', gender: '', address: '', emergency: '' }
    let ok = true
    if (!name.trim()) { e.name = 'Please enter your full name'; ok = false }
    if (!dob) { e.dob = 'Please select your date of birth'; ok = false }
    if (!gender) { e.gender = 'Please select a gender'; ok = false }
    if (!address.trim()) { e.address = 'Please enter your address'; ok = false }
    if (!emergency.trim()) { e.emergency = 'Please enter an emergency contact'; ok = false }
    setErrors(e)
    return ok
  }

  const onNext = () => {
    if (validate()) {
      navigate('/book-appointment', {
        state: {
          name, dob, gender, address, emergency,
        },
      })
    }
  }

  const goBack = () => navigate('/dashboard')

  return (
    <div className="page-container">
      <div className="card">
        <div className="stepbar">
          <span className="step filled">1</span>
          <span className="step-line" />
          <span className="step">2</span>
        </div>
        <h1>Your Details</h1>
        <p className="sub">Help us personalise your care</p>

        <label className="field-label">Full Name</label>
        <input className="text-input" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <div className="error">{errors.name}</div>}

        <label className="field-label">Date of Birth</label>
        <input className="text-input" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        {errors.dob && <div className="error">{errors.dob}</div>}

        <label className="field-label">Gender</label>
        <select className="text-input" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select gender</option>
          {GenderOptions.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        {errors.gender && <div className="error">{errors.gender}</div>}

        <label className="field-label">Address / Area in Kathmandu</label>
        <input className="text-input" value={address} onChange={(e) => setAddress(e.target.value)} />
        {errors.address && <div className="error">{errors.address}</div>}

        <label className="field-label">Emergency Contact Number</label>
        <input className="text-input" placeholder="+977 98XXXXXXXX" value={emergency} onChange={(e) => setEmergency(e.target.value)} />
        {errors.emergency && <div className="error">{errors.emergency}</div>}

        <div className="button-row">
          <button className="btn-outline" onClick={goBack}>← Back</button>
          <button className="btn-primary" onClick={onNext}>Next →</button>
        </div>
      </div>
    </div>
  )
}

export default PatientDetailsPage
