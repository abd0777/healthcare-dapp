import React, { useState, useEffect } from "react";

function InsurerForm({ setFormData }) {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [password, setPassword] = useState("");

  // Only set insurer-specific fields
  useEffect(() => {
    setFormData({
      role: "insurer",
      companyName,
      email,
      phone,
      licenseNumber,
      address,
      contactPerson,
      password
    });
  }, [companyName, email, phone, licenseNumber, address, contactPerson, password, setFormData]);

  return (
    <div className="text-black">
      <div className="text-center text-2xl mb-4">Insurer Registration Form</div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Company Name</label>
        <input
          type="text"
          className="input-field"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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
        <label className="text-sm font-semibold text-gray-600">
          License/Registration Number
        </label>
        <input
          type="text"
          className="input-field"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
        />
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
        <label className="text-sm font-semibold text-gray-600">Contact Person</label>
        <input
          type="text"
          className="input-field"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
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

export default InsurerForm;
