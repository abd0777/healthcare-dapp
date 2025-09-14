import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const userEmail = localStorage.getItem("email");

    useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');

    if (!token || !userEmail) return;

    axios.get(`${BACKEND_URL}/users/${userEmail}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => setUser(res.data))
    .catch(err => console.error('Error fetching profile:', err));
    }, [userEmail]);

    if (!user) return <div className="text-center mt-10">Loading profile...</div>;
  
    return (
    <div className="max-w-4xl mx-auto bg-white border-1 shadow-lg rounded-xl p-8 mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3">👤 Profile Details</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg border-1 hover:shadow-md transition-shadow">
                <label className="text-sm text-gray-500 block mb-1">Full Name</label>
                <p className="text-lg text-gray-700 font-medium">{user.fullname}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border-1 hover:shadow-md transition-shadow">
                <label className="text-sm text-gray-500 block mb-1">Email</label>
                <p className="text-lg text-gray-700 font-medium">{user.email}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border-1 hover:shadow-md transition-shadow">
                <label className="text-sm text-gray-500 block mb-1">Phone Number</label>
                <p className="text-lg text-gray-700 font-medium">{user.phone}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border-1 hover:shadow-md transition-shadow">
                <label className="text-sm text-gray-500 block mb-1">Date of Birth</label>
                <p className="text-lg text-gray-700 font-medium">{new Date(user.dob).toLocaleDateString('en-US',{year:"numeric", month:"long", day:"numeric" })}</p>
            </div>
            
            <div className="sm:col-span-2 bg-gray-50 p-4 rounded-lg border-1 hover:shadow-md transition-shadow">
                <label className="text-sm text-gray-500 block mb-1">Address</label>
                <p className="text-lg text-gray-700 font-medium">{user.address}</p>
            </div>
            
            <div className="sm:col-span-2 bg-gray-50 p-4 rounded-lg border-1 hover:shadow-md transition-shadow">
                <label className="text-sm text-gray-500 block mb-1">Govt. ID</label>
                <p className="text-lg text-gray-700 font-medium">{user.govtId}</p>
            </div>
        </div>
    </div>
);

};

export default Profile;
