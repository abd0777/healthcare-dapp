import React, { useState } from 'react';
import UserType from './RegistrationForms/UserType';
import PatientForm from './RegistrationForms/PatientForm';
import DoctorForm from './RegistrationForms/DoctorForm';
import PharmacyForm from './RegistrationForms/PharmacyForm';
import InsurerForm from './RegistrationForms/InsurerForm';

const RegisterPage = () => {
  const [userType, setUserType] = useState('patient');

  return (
    <div className="min-h-screen bg-white">
      <div className="text-black text-center">
        <div className="text-3xl text-purple-700 font-bold underline py-5">
          Register
        </div>
        <UserType userType={userType} setUserType={setUserType} />
      </div>

      <div className="px-4 py-6 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto">
        {userType === 'patient' && <PatientForm />}
        {userType === 'doctor' && <DoctorForm />}
        {userType === 'pharmacy' && <PharmacyForm />}
        {userType === 'insurer' && <InsurerForm />}

        <div className="flex items-center justify-center">
          <button className="bg-black text-white px-2 py-2 mt-5 cursor-pointer hover:bg-gray-700 rounded-lg w-[200px]">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
