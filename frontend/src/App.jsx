import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";

// Import components from the new landing page design
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

// Import all your existing pages
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard_patient from "./pages/Dashboard_patient.jsx";
import Dashboard_doctor from "./pages/Dashboard_doctor.jsx";
import Dashboard_insurer from "./pages/Dashboard_insurer.jsx";
import Dashboard_pharmacy from "./pages/Dashboard_pharmacy.jsx";

// Component to handle conditional rendering of Nav/Footer
const ConditionalLayout = () => {
  const location = useLocation();

  // Define paths where the Navigation and Footer should be EXCLUDED
  const EXCLUDE_PATHS = [
    "/login",
    "/register",
    "/Dashboard_patient",
    "/Dashboard_doctor",
    "/Dashboard_insurer",
    "/Dashboard_pharmacy",
  ];

  // Check if the current path is in the exclusion list
  const shouldRenderNavAndFooter = !EXCLUDE_PATHS.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Conditionally render Navigation */}
      {shouldRenderNavAndFooter && <Navigation />}

      <main className="flex-grow">
        <Routes>
          {/* Landing page is the home route */}
          <Route path="/" element={<LandingPage />} />

          {/* All your other application routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Dashboard_patient" element={<Dashboard_patient />} />
          <Route path="/Dashboard_doctor" element={<Dashboard_doctor />} />
          <Route path="/Dashboard_insurer" element={<Dashboard_insurer />} />
          <Route path="/Dashboard_pharmacy" element={<Dashboard_pharmacy />} />

          {/* This is a catch-all route for any page that doesn't exist */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Conditionally render Footer */}
      {shouldRenderNavAndFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ConditionalLayout />
    </BrowserRouter>
  );
}

export default App;
