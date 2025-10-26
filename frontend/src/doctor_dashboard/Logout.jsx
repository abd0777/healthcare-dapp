import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

const Logout = () => {
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      await axios.post(`${BACKEND_URL}/auth/logout`);
      ["token", "email", "role"].forEach((key) => localStorage.removeItem(key));
      alert("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <div className="bg-white p-10 rounded-lg shadow-xl border-1 text-center w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white cursor-pointer rounded hover:bg-red-700 transition"
          >
            Yes, Logout
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 cursor-pointer rounded hover:bg-gray-400 transition"
          >
            No, Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
