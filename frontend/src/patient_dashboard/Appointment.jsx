import React, { useState } from 'react';
import { Sparkles, Stethoscope, Send, Loader2 } from 'lucide-react';
import DoctorCard from './DoctorCard';


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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-2xl p-8 md:p-10">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 rounded-full"></div>
              <img
                src="/chat-bot.png"
                alt="Chat Bot"
                className="relative w-40 h-40 rounded-2xl shadow-lg object-cover"
              />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Not sure which doctor to see?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Let <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">MediBuddy</span> guide you to the right specialist with AI-powered recommendations.
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <label htmlFor="symptoms" className="flex items-center text-sm font-semibold text-gray-700 gap-2">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              Describe your symptoms or condition
            </label>
            <div className="relative">
              <textarea
                id="symptoms"
                rows="4"
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none text-gray-800 placeholder-gray-400"
                placeholder="e.g., I've been experiencing chest pain and shortness of breath for the past few days..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {input.length} characters
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-6 flex justify-center">
            <button 
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              onClick={handlePrompt}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Get Recommendation
                </>
              )}
            </button>
          </div>

          {/* Response Section */}
          {response && (
            <div className="mt-8 p-6 border-2 border-blue-100 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Recommended Specialist</h3>
              </div>
              <p className="text-gray-700 leading-relaxed pl-10">{response}</p>
            </div>
          )}
        </div>

        {/* Doctor Cards */}
        <div className="mt-8">
          <DoctorCard />
        </div>
      </div>
    </div>
  );
}

export default Appointment;