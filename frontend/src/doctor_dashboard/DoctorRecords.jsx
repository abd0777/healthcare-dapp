import { useEffect, useState } from "react";
import { FileText, Clock, Eye } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function DoctorRecords({ appointmentId, patientGovtId }) {
  const [records, setRecords] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/records/doctor-access?appointmentId=${appointmentId}&patientGovtId=${patientGovtId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { success, records } = await res.json();
        if (success) setRecords(records);
      } catch (err) {
        console.error("Doctor record fetch failed:", err);
      }
    };

    fetchRecords();
  }, [appointmentId, patientGovtId]);

  const handlePreview = async (cidEncrypted) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/records/decrypted/${cidEncrypted}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (err) {
      console.error("Preview failed:", err);
      alert("Unable to load preview");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Patient Records</h2>
      {records.length === 0 ? (
        <p className="text-gray-500">No records shared for this appointment.</p>
      ) : (
        <div className="space-y-4">
          {records.map((r) => (
            <div key={r._id} className="border border-gray-300 rounded p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="font-semibold text-gray-800">
                      {r.fileName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(r.uploadedAt).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => handlePreview(r.cidEncrypted)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {previewUrl && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Document Preview</h3>
          <iframe
            src={previewUrl}
            className="w-full h-[48rem]"
            title="Record Preview"
          />
        </div>
      )}
    </div>
  );
}
