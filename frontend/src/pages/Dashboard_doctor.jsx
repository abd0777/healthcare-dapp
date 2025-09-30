import React, { useState } from "react";

function Dashboard_doctor() {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", age: 30, condition: "Diabetes" },
    { id: 2, name: "Jane Smith", age: 25, condition: "Asthma" },
  ]);

  // Replaced alert() with console.log() as a temporary placeholder for UI action
  const handlePrescribe = (id) => {
    console.log(`Action: Add prescription for patient ID: ${id}`);
    // TODO: Implement custom modal/form here to add prescription & push to blockchain
  };

  const handleVerify = (id) => {
    console.log(`Action: Verifying blockchain records for patient ID: ${id}`);
    // TODO: Implement blockchain verification logic here
  };

  return (
    // Main wrapper now serves as the full-page container (no fixed header/footer)
    <div className="w-full min-h-screen bg-white text-gray-800 p-8">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 flex items-center justify-center">
        Doctor Dashboard
      </h1>

      {/* Assigned Patients Table */}
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Assigned Patients
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-800 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-center">Age</th>
                <th className="py-3 px-6 text-left">Condition</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {patients.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-200 hover:bg-blue-50"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                    {p.id}
                  </td>
                  <td className="py-3 px-6 text-left">{p.name}</td>
                  <td className="py-3 px-6 text-center">{p.age}</td>
                  <td className="py-3 px-6 text-left">{p.condition}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white font-semibold text-xs rounded-full shadow-md hover:bg-blue-700 transition duration-150"
                        onClick={() => handlePrescribe(p.id)}
                      >
                        Prescribe
                      </button>
                      <button
                        className="px-3 py-1 bg-green-600 text-white font-semibold text-xs rounded-full shadow-md hover:bg-green-700 transition duration-150"
                        onClick={() => handleVerify(p.id)}
                      >
                        Verify Records
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard_doctor;
