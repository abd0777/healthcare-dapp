import React from 'react';

function InsurerForm() {
  return (
    <div className="text-black">
      <div className="text-center text-2xl">Insurer Registration Form</div>
      <form>
        <div>
          <label className="text-sm font-semibold text-gray-600">Company Name</label>
          <input type="text" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <input type="email" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Phone Number</label>
          <input type="tel" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">
            License/Registration Number
          </label>
          <input type="text" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Address</label>
          <input type="text" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Contact Person</label>
          <input type="text" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Password</label>
          <input type="password" className="input-field" />
        </div>
      </form>
    </div>
  );
}

export default InsurerForm;
