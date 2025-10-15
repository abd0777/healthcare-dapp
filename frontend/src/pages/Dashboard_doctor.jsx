import React, { useState } from 'react';

function Dashboard_doctor() {
    const [patients, setPatients] = useState([
        { id: 1, name: "John Doe", age: 30, condition: "Diabetes" },
        { id: 2, name: "Jane Smith", age: 25, condition: "Asthma" },
    ]);

    const [menuOpen, setMenuOpen] = useState(false);

    const handlePrescribe = (id) => {
        alert(`Add prescription for patient ID: ${id}`);
        // Open modal/form to add prescription & push to blockchain
    };

    const handleVerify = (id) => {
        alert(`Verifying blockchain records for patient ID: ${id}`);
        // Blockchain verification logic
    };

    return (
        <div className="relative">
            {/* Navbar */}
            <nav className="sticky top-0 left-0 w-full p-3 bg-white shadow-md flex justify-between items-center z-20">
                {/* Hamburger button */}
                <button 
                    className="flex flex-col gap-1 p-2 rounded-md hover:bg-gray-200"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div className="w-6 h-1 bg-black"></div>
                    <div className="w-6 h-1 bg-black"></div>
                    <div className="w-6 h-1 bg-black"></div>
                </button>

                {/* Title */}
                <div className="flex items-center gap-2">
                    <img src="/doctor-icon.png" alt="doctor-icon" style={{ height: '30px', width: '30px' }} />
                    <div className="text-2xl font-bold">Doctor Dashboard</div>
                </div>

                {/* Right icons */}
                <div className='flex flex-row items-center gap-4'>
                    {/* Notifications */}
                    <button className="px-3 py-3 rounded-lg cursor-pointer border border-black hover:bg-black hover:text-white transition duration-300 ease-in-out"
                    style={{ boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.5)' }}
                    >
                        <img src="/notification-icon.png" alt="Notifications" style={{ height: '30px', width: '30px' }} />
                    </button>

                    {/* Wallet Connect */}
                    <button className="px-2 py-2 rounded-lg cursor-pointer border border-black hover:bg-black hover:text-white transition duration-300 ease-in-out"
                    style={{ boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.5)' }} 
                    >
                        <div className='flex flex-row items-center gap-2'>
                            <img src="/metamask-icon.png" alt="MetaMask" className="h-10 w-10" />
                            <div>Connect Wallet</div> 
                        </div>
                    </button>
                </div>
            </nav>

            {/* Sidebar (slide-in) */}
            <div 
                className={`fixed top-0 left-0 h-full w-64 bg-blue-100 shadow-lg transform transition-transform duration-300 z-30
                ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-4">Menu</h2>
                    <ul className="space-y-4">
                        <li className="cursor-pointer hover:underline">View Patients</li>
                        <li className="cursor-pointer hover:underline">Add Prescription</li>
                        <li className="cursor-pointer hover:underline">Verify Records</li>
                        <li className="cursor-pointer hover:underline">Settings</li>
                    </ul>
                </div>
            </div>

            {/* Overlay when menu is open */}
            {menuOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-20"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className='p-4 mt-4'>
                <h2 className="text-xl font-bold mb-4">Assigned Patients</h2>
                <table className="w-full border border-gray-400 text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Age</th>
                            <th className="border px-4 py-2">Condition</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((p) => (
                            <tr key={p.id}>
                                <td className="border px-4 py-2">{p.id}</td>
                                <td className="border px-4 py-2">{p.name}</td>
                                <td className="border px-4 py-2">{p.age}</td>
                                <td className="border px-4 py-2">{p.condition}</td>
                                <td className="border px-4 py-2 flex justify-center gap-2">
                                    <button 
                                        className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        onClick={() => handlePrescribe(p.id)}
                                    >
                                        Prescribe
                                    </button>
                                    <button 
                                        className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                        onClick={() => handleVerify(p.id)}
                                    >
                                        Verify
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard_doctor;
