import React from 'react'
import { useNavigate } from 'react-router-dom'

const FailurePage = () => {
  const navigate = useNavigate()
  return (
    <div className="page-container">
      <div className="card center">
        <div className="icon-circle failure">✖</div>
        <h1 className="red">Booking Failed</h1>
        <p className="sub">We could not confirm your appointment. This may be due to a network issue or the slot becoming unavailable. Please try again or contact the hospital directly.</p>
        <div className="contacts">
          Bir Hospital: 01-4221119<br />
          TUTH: 01-4412303
        </div>
        <div className="button-row">
          <button className="btn-primary" onClick={() => navigate('/book-appointment')}>Try Again</button>
          <button className="btn-outline" onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </div>
    </div>
  )
}

export default FailurePage
