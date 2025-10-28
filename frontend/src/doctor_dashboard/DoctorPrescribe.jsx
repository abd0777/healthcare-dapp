import { useState, useEffect } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function DoctorPrescribe({ appointmentId, patientId, onClose }) {
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [existingRx, setExistingRx] = useState(null);

  useEffect(() => {
    const fetchRx = async () => {
      const res = await fetch(`${BACKEND_URL}/prescriptions/${appointmentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (data.success) setExistingRx(data.prescription);
    };
    fetchRx();
  }, [appointmentId]);

  const handleChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", frequency: "" }]);
  };

  const handleSubmit = async () => {
    const res = await fetch(`${BACKEND_URL}/prescriptions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ appointmentId, patientId, medicines, notes }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Prescription saved");
      setExistingRx(data.prescription);
    } else {
      alert("Failed to save prescription");
    }
  };

  return (
    <div className="p-4 bg-white border rounded shadow mt-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Prescribe</h2>

      {existingRx ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Existing Prescription
          </h3>
          <ul className="list-disc pl-5 mb-2">
            {existingRx.medicines.map((m, i) => (
              <li key={i}>
                {m.name} — {m.dosage}, {m.frequency}
              </li>
            ))}
          </ul>
          <p className="text-gray-600">Notes: {existingRx.notes}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {medicines.map((m, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                placeholder="Medicine"
                value={m.name}
                onChange={(e) => handleChange(i, "name", e.target.value)}
                className="border p-2 rounded w-1/3"
              />
              <input
                type="text"
                placeholder="Dosage"
                value={m.dosage}
                onChange={(e) => handleChange(i, "dosage", e.target.value)}
                className="border p-2 rounded w-1/3"
              />
              <input
                type="text"
                placeholder="Frequency"
                value={m.frequency}
                onChange={(e) => handleChange(i, "frequency", e.target.value)}
                className="border p-2 rounded w-1/3"
              />
            </div>
          ))}
          <button
            onClick={addMedicine}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add another
          </button>
          <textarea
            placeholder="Additional notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border p-2 rounded mt-2"
          />
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Prescription
          </button>
        </div>
      )}

      <button
        onClick={onClose}
        className="mt-4 text-sm text-red-600 hover:underline"
      >
        Close
      </button>
    </div>
  );
}
