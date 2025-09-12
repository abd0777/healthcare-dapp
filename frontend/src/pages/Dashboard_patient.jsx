import React, { useState } from 'react'

function Dashboard_patient(){
    const [activeSection, setActiveSection] = useState('My Profile');

    const renderContent = () => {
        switch (activeSection) {
            case 'My Profile':
                return <div>👤 Profile Info goes here</div>;
            case 'My Records':
                return <div>📁 Medical Records displayed here</div>;
            case 'Book Appointment':
                return <div>📅 Appointment Booking UI</div>;
            case 'Consultation History':
                return <div>🩺 Past Consultations listed here</div>;
            case 'Logout':
                return <div>🚪 You have been logged out</div>;
            default:
                return <div>Select an option from the sidebar</div>;
        }
    };

    return (
        <div>
            <nav className="sticky top-0 left-0 w-full p-2 bg-white/5 backdrop-blur-md border-b-[1px] border-grey/20">
                <div className="flex items-center justify-between w-full">
                        
                    <div className="flex items-center gap-2">
                        <img src="/patient-icon.png" alt="patient-icon" style={{ height: '30px', width: '30px' }} />
                        <div className="text-2xl font-bold">Patient Dashboard</div>
                    </div>

                    <div className='flex flex-row items-center gap-4'>
                        <button className="px-3 py-3 rounded-lg cursor-pointer border border-black hover:bg-black hover:text-white transition duration-300 ease-in-out"
                        style={{ boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.5)' }}
                        >
                            <img src="/notification-icon.png" alt="Notifications" style={{ height: '30px', width: '30px' }} />
                        </button>

                        <button className="px-2 py-2 rounded-lg cursor-pointer border border-black hover:bg-black hover:text-white transition duration-300 ease-in-out"
                        style={{ boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.5)' }} 
                        >
                            <div className='flex flex-row items-center gap-2'>
                                <img src="/metamask-icon.png" alt="MetaMask" className="h-10 w-10" />
                                <div>Connect Wallet</div> 
                            </div>
                        </button>
                    </div>
                    

                </div>
            </nav>


            <div className='flex flex-row h-[90vh]'>
                <div className='bg-gray-100 w-1/4 p-4 flex flex-col gap-4 shadow-md' style={{ boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)' }}>
                    {['My Profile', 'My Records', 'Book Appointment', 'Consultation History', 'Logout'].map(item => (
                        <span
                            key={item}
                            className={`menu-item cursor-pointer ${activeSection === item ? 'font-bold text-blue-600' : ''}`}
                            onClick={() => setActiveSection(item)}
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <div className=' w-3/4 p-4'>
                    {renderContent()}
                </div>
            </div>
            
        </div>
    )
} 

export default Dashboard_patient