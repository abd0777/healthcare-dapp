import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard_patient from "./pages/Dashboard_patient.jsx";
import Dashboard_doctor from "./pages/Dashboard_doctor.jsx";
import Dashboard_insurer from "./pages/Dashboard_insurer.jsx";
import Dashboard_pharmacy from "./pages/Dashboard_pharmacy.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Dashboard_patient" element={<Dashboard_patient />} />
      <Route path="/Dashboard_doctor" element={<Dashboard_doctor />} />
      <Route path="/Dashboard_insurer" element={<Dashboard_insurer />} />
      <Route path="/Dashboard_pharmacy" element={<Dashboard_pharmacy />} />
    </Routes>
  );
}

export default App;
