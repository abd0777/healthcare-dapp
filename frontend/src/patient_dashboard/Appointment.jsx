import React, { useState } from 'react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

function Appointment() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePrompt = async() => {
        if (!input.trim()) {
            setResponse("Please describe your symptoms before submitting.");
            return;
        }

        setLoading(true);
        setResponse("");

        try {
            const res = await fetch(`${BACKEND_URL}/get-specialist-recommendation`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ prompt: input })
            });

            const data = await res.json();
            setResponse(data.response);
        }
        catch (error) {
            console.error("Error fetching specialist recommendation:", error);
            setResponse("Sorry, something went wrong. Please try again later.");
        }

        finally {
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-4xl w-full bg-gray-100 border border-gray/30 shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center text-center">
          <img
            src="/chat-bot.png"
            alt="Chat Bot"
            className="w-52 h-48 mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Not sure which doctor to see? Let{' '}
            <span className="text-blue-700 font-bold">MediBuddy</span> guide you to the right specialist.
          </h2>
        </div>

        <div className="mt-6">
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
            Describe your symptoms or condition:
          </label>
          <textarea
            id="symptoms"
            rows="3"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Chest pain and shortness of breath..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-6 flex justify-center">
          <button 
            className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-500 transition"
            onClick = { handlePrompt }
            disabled = { loading }>
            {loading ? "Analyzing..." : "Get Recommendation"}
          </button>
        </div>

        {/* Output box from AI model */}
        {response && (
          <div className="mt-6 p-4 border border-gray-300 rounded-md bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Recommended Specialist</h3>
            <p className="text-gray-700">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Appointment;
