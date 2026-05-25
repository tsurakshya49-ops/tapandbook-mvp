import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import ChatPage from './pages/ChatPage.jsx'

function RouterSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctor/:id" element={<DoctorProfilePage />} />
        <Route path="/bookings" element={<BookingHistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chatbot" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<RouterSetup />)
