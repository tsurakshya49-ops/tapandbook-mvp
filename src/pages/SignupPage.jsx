import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupUser } from '../services/api.js'

const SignupPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({ name: '', phone: '', password: '', confirmPassword: '' })
  const [signupError, setSignupError] = useState('')

  const onSignup = async () => {
    let hasError = false
    const newErrors = { name: '', phone: '', password: '', confirmPassword: '' }
    setSignupError('')
    if (!name.trim()) {
      newErrors.name = 'Please enter your name'
      hasError = true
    }
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your mobile number'
      hasError = true
    }
    if (!password) {
      newErrors.password = 'Please enter a password'
      hasError = true
    }
    if (password && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      hasError = true
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
      hasError = true
    }
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      hasError = true
    }
    setErrors(newErrors)
    if (!hasError) {
      try {
        await signupUser(phone, password, name)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userPhone', phone)
        navigate('/dashboard', { state: { name, phone } })
      } catch (error) {
        setSignupError(error.message || 'Signup failed. Please try again.')
      }
    }
  }

  return (
    <div className="page-container">
      <div className="card">
        <div className="logo"><span className="calendar" aria-label="calendar" role="img">📅</span> Tap&Book</div>
        <p className="tagline">Create your account to get started</p>

        <label className="field-label">Full Name</label>
        <input
          className="text-input"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name ? <div className="error">{errors.name}</div> : null}

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
        {errors.password ? <div className="error">{errors.password}</div> : null}

        <label className="field-label">Confirm Password</label>
        <div className="password-container">
          <input
            className="text-input password-input"
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-toggle"
            aria-label="toggle password visibility"
            onClick={() => setShowConfirm((s) => !s)}
          >
            {showConfirm ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.confirmPassword ? <div className="error">{errors.confirmPassword}</div> : null}

        {signupError ? <div className="error" style={{ textAlign: 'center', marginBottom: 8 }}>{signupError}</div> : null}
        <button className="btn-primary" onClick={onSignup}>Create Account</button>

        <div className="links" style={{textAlign: 'center', marginTop: 12}}>
          <a href="#" className="link" onClick={(e) => { e.preventDefault(); navigate('/') }}>Already have an account? Login</a>
        </div>
      </div>
    </div>
  )
}

export default SignupPage