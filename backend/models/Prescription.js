import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true, index: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  medicines: [{ name: String, dosage: String, frequency: String }],
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;