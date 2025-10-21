import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },

    doctorLicenseNumber: {
      type: String,
      required: true,
      index: true,
    },

    patientGovtId: {
      type: String,
      required: false,
      index: true,
    },

    doctorName: { type: String, required: true },
    specialization: { type: String, required: true },

    date: { type: String, required: true }, // Format: YYYY-MM-DD
    time: { type: String, required: true }, // Format: HH:mm

    status: {
      type: String,
      enum: ["confirmed", "cancelled", "pending"],
      default: "confirmed",
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },

    walletAddress: { type: String },
    transactionHash: { type: String },

    notes: { type: String },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
