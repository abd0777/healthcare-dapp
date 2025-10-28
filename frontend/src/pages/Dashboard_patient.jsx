import React, { useState } from "react";
import Profile from "../patient_dashboard/Profile";
import Logout from "../patient_dashboard/Logout";
import Appointment from "@/patient_dashboard/Appointment";
import AppointmentHistory from "@/patient_dashboard/AppointmentHistory";
import Records from "@/patient_dashboard/Records";
import ConsultationHistory from "@/patient_dashboard/ConsultationHistory";

function Dashboard_patient() {
  const [activeSection, setActiveSection] = useState("My Profile");
  const [walletConnected, setWalletConnected] = useState("");
  
  const renderContent = () => {
    switch (activeSection) {
      case "My Profile":
        return <Profile />;
      case "My Records":
        return <Records />;
      case "Book Appointment":
        return <Appointment />;
      case "Appointment History":
        return <AppointmentHistory />;
      case "Consultation History":
        return <ConsultationHistory />;
      case "Logout":
        return <Logout />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  const handleConnectWallet = async() => {
    if(typeof window.ethereum === "undefined"){
      console.log("MetaMask is not installed!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({method : "eth_requestAccounts"});
      setWalletConnected(accounts[0]);
      console.log("Connected account:", accounts[0]);
    }
    catch(error){
      console.error("Error connecting to MetaMask:", error);
    }
  }; 


  return (
    <div>
      <nav className="sticky top-0 left-0 w-full p-2 bg-white/5 backdrop-blur-md border-b-[1px] border-black/30 z-20">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img
              src="/patient-icon.png"
              alt="patient-icon"
              style={{ height: "30px", width: "30px" }}
            />
            <div className="text-2xl font-bold">Patient Dashboard</div>
          </div>

          <div className="flex flex-row items-center gap-4">
            <button
              className="px-3 py-3 rounded-lg cursor-pointer border border-black hover:bg-black hover:text-white transition duration-300 ease-in-out"
              style={{ boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.5)" }}
            >
              <img
                src="/notification-icon.png"
                alt="Notifications"
                style={{ height: "30px", width: "30px" }}
              />
            </button>

            <button
              className= {`px-2 py-2 rounded-lg cursor-pointer border border-black hover:bg-black hover:text-white transition duration-300 ease-in-out ${walletConnected ? "bg-lime-400" : "bg-white" }`}
              style={{ boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.5)" }}
            >
              <div className="flex flex-row items-center gap-2 " onClick={ handleConnectWallet }>
                <img
                  src="/metamask-icon.png"
                  alt="MetaMask"
                  className="h-10 w-10"
                />
                <div>{ walletConnected ? "Wallet Connected" : "Connect Wallet" }</div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex h-screen">
        <div
          className="bg-gray-100 w-1/4 p-4 flex flex-col gap-4 shadow-md fixed top-[64px] left-0 h-[calc(100vh-64px)] overflow-y-auto z-10"
          style={{ boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          {[
            "My Profile",
            "My Records",
            "Book Appointment",
            "Appointment History",
            "Consultation History",
            "Logout",
          ].map((item) => (
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

        <div className="ml-[25%] w-3/4 p-4 overflow-y-auto h-[calc(100vh-64px)]">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Dashboard_patient;
