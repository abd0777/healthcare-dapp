import React from 'react';

const UserType = ({ userType, setUserType }) => {
  const types = [
    { key: 'patient', label: 'Patient 🛌' },
    { key: 'doctor', label: 'Doctor 🧑‍⚕️' },
    { key: 'pharmacy', label: 'Pharmacy 💊' },
    { key: 'insurer', label: 'Insurer 📄' },
  ];

  return (
    <div className="flex justify-center gap-4 mb-5">
      {types.map((type) => (
        <button
          key={type.key}
          onClick={() => setUserType(type.key)}
          className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
            userType === type.key
              ? 'bg-purple-600 text-white'
              : 'bg-white text-black border-gray-400 hover:bg-gray-200'
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default UserType;
