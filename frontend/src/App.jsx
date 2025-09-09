import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Dashboard_patient from './pages/Dashboard_patient.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element = {<LandingPage />} />
      <Route path="/register" element = {<RegisterPage />} />
      <Route path="/login" element = {<LoginPage />} />
      <Route path="/Dashboard_patient" element = {<Dashboard_patient/>} />
    </Routes>
  )
}

export default App