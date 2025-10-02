import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, CreditCard } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');

    if (!token || !userEmail) return;

    fetch(`${BACKEND_URL}/users/${userEmail}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => console.error('Error fetching profile:', err));
  }, [userEmail]);

  if (!user) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white border border-black/20 shadow-2xl rounded-2xl p-8">
        <div className="pb-4 mb-6">
          <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            Profile Details
          </h2>
        </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-2">Full Name</label>
              <p className="text-lg text-gray-900 font-medium">{user.fullname}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-2">Email</label>
              <p className="text-lg text-gray-900 font-medium break-words">{user.email}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-2">Phone Number</label>
              <p className="text-lg text-gray-900 font-medium">{user.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-2">Date of Birth</label>
              <p className="text-lg text-gray-900 font-medium">{new Date(user.dob).toLocaleDateString('en-US',{year:"numeric", month:"long", day:"numeric" })}</p>
            </div>
          </div>
        </div>
        
        <div className="sm:col-span-2 bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-2">Address</label>
              <p className="text-lg text-gray-900 font-medium">{user.address}</p>
            </div>
          </div>
        </div>
        
        <div className="sm:col-span-2 bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-2">Govt. ID</label>
              <p className="text-lg text-gray-900 font-medium">{user.govtId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;