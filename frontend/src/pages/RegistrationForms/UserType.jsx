import React from 'react';

function UserType({ userType, setUserType }) {
  
  const types = ['patient🛌', 'doctor👨‍⚕️', 'pharmacy💊', 'insurer🧾'];
  return(
    <div>
        <h2 className="text-2xl text-black font-semibold mb-2 mt-2">Select User Type</h2>
        {types.map((type) => (
            <button
                key={type}
                className={`${userType === type ? 'bg-purple-700 text-white' : 'border-1 border-black text-black'} px-4 py-2 m-2 rounded cursor-pointer`}
                onClick={() => setUserType(type)}
            >
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
        ))}
    </div>
)


}
export default UserType;