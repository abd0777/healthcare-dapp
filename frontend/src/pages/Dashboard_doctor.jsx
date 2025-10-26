import React, { useState, useEffect } from "react";
import Logout from "../doctor_dashboard/Logout";
import { ClipboardEdit, FileText, MessageCircle, LogOut } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

function Dashboard_doctor() {
  const [activeSection, setActiveSection] = useState("Appointments");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments assigned to the logged-in doctor
  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchAppointments() {
      try {
        const res = await fetch(`${BACKEND_URL}/appointments/doctor`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("dotor apoints ments ",data);
        
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const renderContent = () => {
    if (activeSection === "Logout") return <Logout />;
    if (activeSection === "Appointments") {
      if (loading) return <div>Loading appointments...</div>;
      if (appointments.length === 0) return <div>No appointments found.</div>;

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt.appointmentId}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-800">
                {appt.patientName || "Patient"}
              </h3>
              <p className="text-gray-600">Date: {appt.date}</p>
              <p className="text-gray-600">Time: {appt.time}</p>
              <p className="text-gray-600">Notes: {appt.notes || "N/A"}</p>

              <div className="flex gap-3 mt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  <ClipboardEdit size={18} />
                  Prescribe
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  <FileText size={18} />
                  View Records
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                  <MessageCircle size={18} />
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <div>Select an option from the sidebar</div>;
  };

  return (
    <div>
      {/* Top Navigation */}
      <nav className="sticky top-0 left-0 w-full p-2 bg-white/5 backdrop-blur-md border-b-[1px] border-black/30 z-20">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img
              src="/doctor-icon.png"
              alt="doctor-icon"
              style={{ height: "30px", width: "30px" }}
            />
            <div className="text-2xl font-bold">Doctor Dashboard</div>
          </div>
          <button
            className="px-3 py-2 rounded-lg cursor-pointer border border-black hover:bg-black hover:text-white transition duration-300 ease-in-out"
            onClick={() => setActiveSection("Logout")}
          >
            <LogOut size={20} className="inline-block mr-2" />
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex h-screen">
        <div
          className="bg-gray-100 w-1/4 p-4 flex flex-col gap-4 shadow-md fixed top-[64px] left-0 h-[calc(100vh-64px)] overflow-y-auto z-10"
          style={{ boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          {["Appointments", "Logout"].map((item) => (
            <span
              key={item}
              className={`menu-item cursor-pointer ${
                activeSection === item ? "font-bold text-blue-600" : ""
              }`}
              onClick={() => setActiveSection(item)}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="ml-[25%] w-3/4 p-4 overflow-y-auto h-[calc(100vh-64px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard_doctor;