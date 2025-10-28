import React, { useEffect, useState } from 'react';
import { Download, MessageCircle, FileText, Calendar, User, Stethoscope, Clock } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

function ConsultationHistory() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/prescriptions/consultations`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const { success, consultations } = await res.json();
        if (success) setConsultations(consultations);
      } catch (err) {
        console.error('Failed to fetch consultations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const handleDownload = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/prescriptions/download/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error('Download failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'prescription.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download prescription');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading consultations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Consultation History</h1>
          </div>
          <p className="text-gray-600 ml-15">View and manage your past medical consultations</p>
        </div>

        {consultations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No consultations yet</h3>
            <p className="text-gray-600">Your consultation history will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {consultations.map((c) => (
              <div
                key={c._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-5 h-5 text-white" />
                        <h3 className="text-lg font-semibold text-white">
                          Dr. {c.doctor?.fullname}
                        </h3>
                      </div>
                      <p className="text-blue-100 text-sm">{c.doctor?.specialization}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-white text-sm mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{c.appointment?.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-100 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{c.appointment?.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-6 py-5">
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 font-mono bg-gray-50 inline-block px-3 py-1 rounded-full">
                      ID: {c.appointmentId}
                    </p>
                  </div>

                  {/* Medicines */}
                  <div className="mb-5">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 text-sm">💊</span>
                      </div>
                      Prescribed Medicines
                    </h4>
                    <div className="bg-gray-50 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Medicine Name</th>
                            <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Dosage</th>
                            <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Frequency</th>
                          </tr>
                        </thead>
                        <tbody>
                          {c.medicines.map((m, i) => (
                            <tr key={i} className="border-t border-gray-200">
                              <td className="py-2.5 px-4 text-sm font-medium text-gray-900">{m.name}</td>
                              <td className="py-2.5 px-4 text-sm text-gray-700">{m.dosage}</td>
                              <td className="py-2.5 px-4 text-sm text-gray-700">{m.frequency}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Notes */}
                  {c.notes && (
                    <div className="mb-5">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-yellow-600" />
                        </div>
                        Additional Notes
                      </h4>
                      <p className="text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 rounded-r-lg">
                        {c.notes}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                    <button
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow text-sm"
                      onClick={() => handleDownload(c._id)}
                    >
                      <Download className="w-4 h-4" />
                      Download Prescription
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm hover:shadow text-sm">
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2.5 rounded-xl font-medium hover:from-yellow-600 hover:to-orange-600 transition-colors shadow-sm hover:shadow text-sm">
                      <FileText className="w-4 h-4" />
                      Claim Insurance
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultationHistory;