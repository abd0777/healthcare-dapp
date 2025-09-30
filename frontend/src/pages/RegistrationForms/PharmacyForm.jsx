import React, { useState, useEffect } from "react";

function PharmacyForm({ setFormData }) {
  const [pharmacyName, setPharmacyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [password, setPassword] = useState("");

  // Sync local state with parent RegisterPage form data
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      pharmacyName,
      email,
      phone,
      licenseNumber,
      address,
      ownerName,
      password,
    }));
  }, [
    pharmacyName,
    email,
    phone,
    licenseNumber,
    address,
    ownerName,
    password,
    setFormData,
  ]);

  return (
    <div className="text-black">
      <div className="text-center text-2xl mb-4">Pharmacy Registration Form</div>

      <div>
        <label className="text-sm font-semibold text-gray-600">Pharmacy Name</label>
        <input
          type="text"
          className="input-field"
          value={pharmacyName}
          onChange={(e) => setPharmacyName(e.target.value)}
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
        <label className="text-sm font-semibold text-gray-600">License Number</label>
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
        <label className="text-sm font-semibold text-gray-600">Owner Name</label>
        <input
          type="text"
          className="input-field"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
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

export default PharmacyForm;
