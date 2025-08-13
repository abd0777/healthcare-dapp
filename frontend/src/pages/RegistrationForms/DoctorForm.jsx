import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DoctorForm() {
  const [dob, setDob] = useState(null);

  return (
    <div className="text-black">
      <div className="text-center text-2xl">Doctor Registration Form</div>
      <form>
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Full Name
          </label>
          <input type="text" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <input type="email" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Phone Number
          </label>
          <input type="tel" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Date of Birth
          </label>
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
        <div>
          <label className="text-sm font-semibold text-gray-600">Gender</label>
          <input type="text" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Specialization
          </label>
          <input type="text" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">
            License Number
          </label>
          <input type="text" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Clinic/Hospital Address
          </label>
          <input type="text" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Password
          </label>
          <input type="password" className="input-field" />
        </div>
      </form>
    </div>
  );
}

export default DoctorForm;
