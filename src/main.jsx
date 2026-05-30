import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import DoctorsPage from './pages/DoctorsPage.jsx'
import DoctorProfilePage from './pages/DoctorProfilePage.jsx'
import BookingHistoryPage from './pages/BookingHistoryPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import PatientDetailsPage from './pages/PatientDetailsPage.jsx'
import BookAppointmentPage from './pages/BookAppointmentPage.jsx'
import SuccessPage from './pages/SuccessPage.jsx'
import FailurePage from './pages/FailurePage.jsx'

// ProtectedRoute component - checks localStorage for login session
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }
  return children
}

function RouterSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/doctors" element={<ProtectedRoute><DoctorsPage /></ProtectedRoute>} />
        <Route path="/patient-details" element={<ProtectedRoute><PatientDetailsPage /></ProtectedRoute>} />
        <Route path="/book-appointment" element={<ProtectedRoute><BookAppointmentPage /></ProtectedRoute>} />
        <Route path="/confirmation/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
        <Route path="/confirmation/failure" element={<ProtectedRoute><FailurePage /></ProtectedRoute>} />
        <Route path="/doctor/:id" element={<ProtectedRoute><DoctorProfilePage /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><BookingHistoryPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/chatbot" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<RouterSetup />)
