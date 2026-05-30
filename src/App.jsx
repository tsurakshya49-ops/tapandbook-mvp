import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import PatientDetailsPage from './pages/PatientDetailsPage.jsx'
import BookAppointmentPage from './pages/BookAppointmentPage.jsx'
import SuccessPage from './pages/SuccessPage.jsx'
import FailurePage from './pages/FailurePage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import DoctorsPage from './pages/DoctorsPage.jsx'
import DoctorProfilePage from './pages/DoctorProfilePage.jsx'
import BookingHistoryPage from './pages/BookingHistoryPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ChatPage from './pages/ChatPage.jsx'

// App now owns the router configuration as required by the project structure
const App = () => {
  return (
    <div className="app-container" style={{ width: '100%', minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/patient-details" element={<PatientDetailsPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />
          <Route path="/bookings" element={<BookingHistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chatbot" element={<ChatPage />} />
          <Route path="/confirmation/success" element={<SuccessPage />} />
          <Route path="/confirmation/failure" element={<FailurePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
