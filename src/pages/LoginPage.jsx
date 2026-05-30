import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api.js'

const LoginPage = () => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({ phone: '', password: '' })
  const [loginError, setLoginError] = useState('')

  const onLogin = async () => {
    let hasError = false
    const newErrors = { phone: '', password: '' }
    setLoginError('')
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your mobile number'
      hasError = true
    }
    if (!password) {
      newErrors.password = 'Please enter your password'
      hasError = true
    }
    setErrors(newErrors)
    if (!hasError) {
      try {
        const result = await loginUser(phone, password)
        const userName = localStorage.getItem('userName') || 'User'
        localStorage.setItem('isLoggedIn', 'true')
        navigate('/dashboard', { state: { name: userName, phone } })
      } catch (error) {
        setLoginError('Invalid phone or password')
      }
    }
  }

  return (
    <div className="page-container">
      <div className="card">
        <div className="logo"><span className="calendar" aria-label="calendar" role="img">📅</span> Tap&Book</div>
        <p className="tagline">No more waiting in lines. Just tap and go.</p>

        <label className="field-label">Mobile Number</label>
        <input
          className="text-input"
          placeholder="+977 98XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone ? <div className="error">{errors.phone}</div> : null}

        <label className="field-label">Password</label>
        <div className="password-container">
          <input
            className="text-input password-input"
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-toggle"
            aria-label="toggle password visibility"
            onClick={() => setShow((s) => !s)}
          >
            {show ? '🙈' : '👁️'}
          </button>
        </div>
        <a href="#" className="forgot-link" aria-label="forgot-password">Forgot Password?</a>
        {errors.password ? <div className="error">{errors.password}</div> : null}

        {loginError ? <div className="error" style={{ textAlign: 'center', marginBottom: 8 }}>{loginError}</div> : null}
        <button className="btn-primary" onClick={onLogin}>Login</button>

        <div className="divider"><span>OR</span></div>

        

       <button className="btn-google" type="button" onClick={() => { localStorage.setItem('isLoggedIn', 'true'); navigate('/dashboard'); }}>
          <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginRight: 6 }}>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.35 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-3.85-13.46-9.41l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </svg>
          Continue with Google
        </button>

        <div className="links" style={{textAlign: 'center'}}>
          <a href="#" className="link create-account" onClick={(e) => { e.preventDefault(); navigate('/signup') }}>New patient? Create an Account</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
