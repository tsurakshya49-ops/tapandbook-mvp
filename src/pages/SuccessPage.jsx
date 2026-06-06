import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'

const SuccessPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const s = location.state || {}

  const token = s.token
  const bookingId = s.bookingId
  const qrContent = s.qrContent
  const patientName = s.patientName
  const hospital = s.hospital
  const department = s.department
  const date = s.date
  const slot = s.slot

  return (
    <div className="page-container">
      <div className="card center">
        <div className="icon-circle success">✓</div>
        <h1 className="teal">Appointment Confirmed!</h1>
        <p className="sub">Your appointment has been successfully booked. Please arrive 15 minutes early and show your QR code at the hospital reception.</p>

        <div className="summary card">
          <div className="row"><span className="label">Token Number:</span> <span className="value token">{token}</span></div>
          <div className="row"><span className="label">{patientName}</span> | <span className="muted">{hospital}</span> | <span className="muted">{department}</span></div>
          <div className="row"><span className="muted">{date}</span> | <span className="muted">{slot}</span> | <span className="muted">{bookingId}</span></div>
        </div>

        <div className="qr-area">
          {qrContent ? (
            <QRCodeSVG value={qrContent} size={180} />
          ) : null}
          <div className="caption">Show this QR code at the reception desk</div>
        </div>

        <div className="button-row">
          <button className="btn-primary" onClick={() => navigate('/patient-details')}>Book Another Appointment</button>
          <button className="btn-outline" onClick={() => navigate('/dashboard')}>Return to Home</button>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
