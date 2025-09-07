import React, { useState } from 'react';
import UserType from './RegistrationForms/UserType';
import PatientForm from './RegistrationForms/PatientForm';
import DoctorForm from './RegistrationForms/DoctorForm';
import PharmacyForm from './RegistrationForms/PharmacyForm';
import InsurerForm from './RegistrationForms/InsurerForm';
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

const RegisterPage = () => {
  const [userType, setUserType] = useState('patient');
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build payload with role
    let userData = {
      ...formData,
      role: userType,
    };

    // Remove fields that are empty strings, null, or undefined
    Object.keys(userData).forEach((key) => {
      if (userData[key] === '' || userData[key] === null || userData[key] === undefined) {
        delete userData[key];
      }
    });

    try {
      const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registered successfully");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-black text-center">
        <div className="text-3xl text-purple-700 font-bold underline py-5">
          Register
        </div>
        <UserType userType={userType} setUserType={setUserType} />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-6 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto"
      >
        {userType === 'patient' && <PatientForm setFormData={setFormData} />}
        {userType === 'doctor' && <DoctorForm setFormData={setFormData} />}
        {userType === 'pharmacy' && <PharmacyForm setFormData={setFormData} />}
        {userType === 'insurer' && <InsurerForm setFormData={setFormData} />}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-black text-white px-2 py-2 mt-5 cursor-pointer hover:bg-gray-700 rounded-lg w-[200px]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
