import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, User, Mail, Award, Stethoscope, CheckCircle, XCircle } from "lucide-react";
import { ethers, keccak256, AbiCoder, parseEther } from "ethers";
import AppointmentPayment from "../../../build/contracts/AppointmentPayment.json";
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
const FEE_ETH = "0.00018"; 

function DoctorCard() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/doctors`).then((res) => {
      setDoctors(res.data);
    });
  }, []);
  
  const handleBookClick = async (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate("");
    setSelectedTime("");
    setBookedSlots([]);
  };

  // when date changes, fetch booked slots for that doctor/date
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDoctor || !selectedDate) return;
      try {
        const res = await axios.get(`${BACKEND_URL}/appointments/check`, {
          params: {
            licenseNumber: selectedDoctor.licenseNumber,
            date: selectedDate,
          },
        });
        // backend should return array of times like ["10:00", "11:00"]
        setBookedSlots(res.data.map((a) => a.time));
      } catch (err) {
        console.error("Error fetching booked slots:", err);
      }
    };
    fetchBookedSlots();
  }, [selectedDate, selectedDoctor]);


  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedDoctor) return;

    try {
      if (!window.ethereum) {
        alert("MetaMask not detected");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, AppointmentPayment.abi, signer);

      const nowTs = Math.floor(Date.now() / 1000);
      const coder = new AbiCoder();
      const encoded = coder.encode(["address", "string", "uint256"], [walletAddress, selectedDoctor.licenseNumber, nowTs]);
      const appointmentId = keccak256(encoded);

      const tx = await contract.payAndBook(
        selectedDoctor.licenseNumber,
        selectedDate,
        selectedTime,
        "Booked via frontend",
        appointmentId,
        { value: parseEther(FEE_ETH) }
      );

      await tx.wait();

      await fetch(`${BACKEND_URL}/appointments/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorLicenseNumber: selectedDoctor.licenseNumber,
          doctorName: selectedDoctor.fullname,
          specialization: selectedDoctor.specialization,
          date: selectedDate,
          time: selectedTime,
          status: "confirmed",
          paymentStatus: "paid",
          walletAddress: walletAddress,
          transactionHash: tx.hash,
          notes: "Booked via frontend",
          email: localStorage.getItem("email"),
        })
      });

      alert(" Payment successful! Appointment will appear in your dashboard shortly.");

      setSelectedDoctor(null);
      setSelectedDate("");
      setSelectedTime("");
    } catch (err) {
      console.error("Booking error:", err.message || err);
      alert(" Payment failed. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 mt-10 rounded-lg">
      <div className="max-w-full mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Your Appointment</h1>
          <p className="text-gray-600">Choose from our experienced healthcare professionals</p>
        </div>

        {/* Doctors Grid */}
        {!selectedDoctor && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <div 
                key={doc.licenseNumber} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <div className="p-6">
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
                    Dr. {doc.fullname}
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Award className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0" />
                      <span className="font-medium">{doc.specialization}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Mail className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{doc.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Award className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                      <span className="font-mono text-xs">License: {doc.licenseNumber}</span>
                    </div>
                  </div>
                  
                  <button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                    onClick={() => handleBookClick(doc)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking Form */}
        {selectedDoctor && (
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              ← Back to Doctors
            </button>
            
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="h-3 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              
              <div className="p-8">
                <div className="flex items-center mb-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mr-4">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Dr. {selectedDoctor.fullname}
                    </h2>
                    <p className="text-gray-600 flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {selectedDoctor.specialization}
                    </p>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="flex items-center text-gray-700 font-semibold mb-3">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl transition-all outline-none"
                  />
                </div>

                {/* Time Slot Selection */}
                <div className="mb-8">
                  <label className="flex items-center text-gray-700 font-semibold mb-3">
                    <Clock className="w-5 h-5 mr-2 text-purple-600" />
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"].map((slot) => {
                      const isBooked = bookedSlots.includes(slot);
                      const isSelected = selectedTime === slot;
                      
                      return (
                        <button
                          key={slot}
                          disabled={isBooked}
                          className={`relative px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            isBooked
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200"
                              : isSelected
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105 border-2 border-transparent"
                              : "bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100 hover:scale-105 hover:shadow-md"
                          }`}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {isBooked && (
                            <XCircle className="w-4 h-4 absolute top-1 right-1 text-red-400" />
                          )}
                          {isSelected && !isBooked && (
                            <CheckCircle className="w-4 h-4 absolute top-1 right-1 text-white" />
                          )}
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-50 border-2 border-green-200 rounded mr-2"></div>
                      Available
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-100 border-2 border-gray-200 rounded mr-2"></div>
                      Booked
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded mr-2"></div>
                      Selected
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  className={`w-full font-bold px-6 py-4 rounded-xl transition-all duration-300 shadow-lg text-lg ${
                    !selectedDate || !selectedTime
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-2xl transform hover:-translate-y-1"
                  }`}
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedTime}
                >
                  {!selectedDate || !selectedTime
                    ? "Select Date & Time to Continue"
                    : "Confirm Appointment & Pay"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorCard;