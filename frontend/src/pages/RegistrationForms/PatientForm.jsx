import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PatientForm({ setFormData }) {
  const [fullname, setFullname] = useState(""); // changed to match backend
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [govtId, setGovtId] = useState("");
  const [password, setPassword] = useState("");

  // Sync local form state with parent
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fullname,
      email,
      phone,
      dob: dob ? dob.toISOString().split("T")[0] : "", // format date as yyyy-MM-dd
      gender,
      address,
      govtId,
      password
    }));
  }, [fullname, email, phone, dob, gender, address, govtId, password, setFormData]);

  return (
    <div className="text-black">
      <div className="text-center text-2xl mb-4">Patient Registration Form</div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Full Name</label>
        <input
          type="text"
          className="input-field"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Email</label>
        <input
          type="email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Phone Number</label>
        <input
          type="tel"
          className="input-field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
        <DatePicker
          selected={dob}
          onChange={(date) => setDob(date)}
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()}
          showYearDropdown
          scrollableYearDropdown
          placeholderText="Select your DOB"
          className="input-field"
          required
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
        <label className="text-sm font-semibold text-gray-600">Address</label>
        <input
          type="text"
          className="input-field"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">
          Govt. ID (for insurance verification)
        </label>
        <input
          type="text"
          className="input-field"
          value={govtId}
          onChange={(e) => setGovtId(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Password</label>
        <input
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    </div>
  );
}

export default PatientForm;
