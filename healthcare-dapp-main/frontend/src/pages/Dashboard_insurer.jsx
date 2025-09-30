import React, { useState } from 'react';

function Dashboard_insurer() {
    const [claims, setClaims] = useState([
        { id: 1, patient: "John Doe", amount: "₹50,000", status: "Pending" },
        { id: 2, patient: "Jane Smith", amount: "₹30,000", status: "Pending" },
    ]);

    const [menuOpen, setMenuOpen] = useState(false);

    const handleApprove = (id) => {
        alert(`Approving claim ID: ${id}`);
        // Blockchain approve transaction
    };

    const handleReject = (id) => {
        alert(`Rejecting claim ID: ${id}`);
        // Blockchain reject transaction
    };

    const handleVerify = (id) => {
        alert(`Verifying blockchain record for claim ID: ${id}`);
        // Verify claim on blockchain
    };

    return (
        <div className="relative">
            {/* Navbar */}
            <nav className="sticky top-0 left-0 w-full p-3 bg-white shadow-md flex justify-between items-center z-20">
                {/* Hamburger */}
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
                    <img src="/insurer-icon.png" alt="insurer-icon" style={{ height: '30px', width: '30px' }} />
                    <div className="text-2xl font-bold">Insurer Dashboard</div>
                </div>

                {/* Wallet */}
                <button className="px-2 py-2 rounded-lg cursor-pointer border border-black hover:bg-black hover:text-white transition duration-300 ease-in-out"
                style={{ boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.5)' }} 
                >
                    <div className='flex flex-row items-center gap-2'>
                        <img src="/metamask-icon.png" alt="MetaMask" className="h-10 w-10" />
                        <div>Connect Wallet</div> 
                    </div>
                </button>
            </nav>

            {/* Sidebar */}
            <div 
                className={`fixed top-0 left-0 h-full w-64 bg-blue-100 shadow-lg transform transition-transform duration-300 z-30
                ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-4">Menu</h2>
                    <ul className="space-y-4">
                        <li className="cursor-pointer hover:underline">View Claims</li>
                        <li className="cursor-pointer hover:underline">Approve / Reject</li>
                        <li className="cursor-pointer hover:underline">Verify Records</li>
                        <li className="cursor-pointer hover:underline">Settings</li>
                    </ul>
                </div>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-20"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className='p-4 mt-4'>
                <h2 className="text-xl font-bold mb-4">Insurance Claims</h2>
                <table className="w-full border border-gray-400 text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Patient</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claims.map((c) => (
                            <tr key={c.id}>
                                <td className="border px-4 py-2">{c.id}</td>
                                <td className="border px-4 py-2">{c.patient}</td>
                                <td className="border px-4 py-2">{c.amount}</td>
                                <td className="border px-4 py-2">{c.status}</td>
                                <td className="border px-4 py-2 flex justify-center gap-2">
                                    <button 
                                        className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                        onClick={() => handleApprove(c.id)}
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        onClick={() => handleReject(c.id)}
                                    >
                                        Reject
                                    </button>
                                    <button 
                                        className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        onClick={() => handleVerify(c.id)}
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

export default Dashboard_insurer;
