import React from 'react'

function Dashboard_patient(){
    return (
        <div>
            <nav className="sticky top-0 left-0 w-full p-2 bg-white/5 backdrop-blur-md border-b-[1px] border-grey/20">
                <div className="flex items-center justify-between w-full">
                        
                    <div className="flex items-center gap-2">
                        <img src="/patient-icon.png" alt="patient-icon" style={{ height: '30px', width: '30px' }} />
                        <div className="text-2xl">Patient Dashboard</div>
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


            <div className='flex flex-row h-[100vh]'>
                <div className='bg-blue-100 w-1/4 p-4'>
                </div>
                <div className='bg-green-100 w-3/4 p-4'>

                </div>
            </div>
            
        </div>
    )
} 

export default Dashboard_patient