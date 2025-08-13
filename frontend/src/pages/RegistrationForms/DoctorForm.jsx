import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DoctorForm({ setFormData }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [password, setPassword] = useState("");

  // Update parent formData on any change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fullname,
      email,
      phone,
      dob: dob ? dob.toISOString().split("T")[0] : "",
      gender,
      specialization,
      licenseNumber,
      clinicAddress,
      password
    }));
  }, [fullname, email, phone, dob, gender, specialization, licenseNumber, clinicAddress, password, setFormData]);

  return (
    <div className="text-black">
      <div className="text-center text-2xl mb-4">Doctor Registration Form</div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Full Name</label>
        <input
          type="text"
          className="input-field"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Email</label>
        <input
          type="email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Phone Number</label>
        <input
          type="tel"
          className="input-field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
        <DatePicker
          selected={dob}
          onChange={(date) => setDob(date)}
          dateFormat="dd-MM-yyyy"
          maxDate={new Date()}
          showYearDropdown
          scrollableYearDropdown
          placeholderText="Select your DOB"
          className="input-field"
        />
      </div>

      <div>
         <label className="text-sm font-semibold text-gray-600">Gender</label>
        <select
          className="input-field"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Specialization</label>
        <input
          type="text"
          className="input-field"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">License Number</label>
        <input
          type="text"
          className="input-field"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Clinic/Hospital Address</label>
        <input
          type="text"
          className="input-field"
          value={clinicAddress}
          onChange={(e) => setClinicAddress(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Password</label>
        <input
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
}

export default DoctorForm;
