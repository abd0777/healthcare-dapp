import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

function PatientForm() {
  
  const [dob, setDob] = useState(null);
  return (
    <div className='text-black'>
        <div className='text-center text-2xl'> Patient Form  </div>
        <form>
            <div>
                <label className='text-sm font-semibold text-gray-600'>
                    Full Name
                </label>
                <input 
                    type="name"
                    className='input-field'
                >
                </input>
            </div>
            <div>
                <label className='text-sm font-semibold text-gray-600'>
                    Email
                </label>
                <input 
                    type="email"
                    className='input-field'
                >
                </input>
            </div>
            <div>
                <label className='text-sm font-semibold text-gray-600'>
                    Phone Number
                </label>
                <input 
                    type="name"
                    className='input-field'
                >
                </input>
            </div>
            <div>
                <label className='text-sm font-semibold text-gray-600'>
                    Date of Birth
                </label>
                <div>
                    <DatePicker
                        selected={dob}
                        onChange={(date) => setDob(date)}
                        dateFormat="dd-MM-yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        placeholderText="Select your DOB"
                        className="input-field"
                    />
                </div>
            </div> 
            <div>
                <label className='text-sm font-semibold text-gray-600'>
                    Gender
                </label>
                <input 
                    type="name"
                    className='input-field'
                >
                </input>
            </div>
            <div>
                <label className='text-sm font-semibold text-gray-600'>
                    Address
                </label>
                <input 
                    type="name"
                    className='input-field'
                >
                </input>
            </div>
            <div>
                <label className='text-sm font-semibold text-gray-600'>
                    Govt. ID (for insurance verification)
                </label>
                <input 
                    type="name"
                    className='input-field'
                >
                </input>
            </div>
            <div>
                <label className='text-sm font-semibold text-gray-600'>
                    Password
                </label>
                <input 
                    type="name"
                    className='input-field'
                >
                </input>
            </div>
        </form>
    </div>
  )
}

export default PatientForm


