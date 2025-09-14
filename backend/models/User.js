import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String }, // Not required for pharmacy, insurer
    email: { type: String, required: true, unique: true, index:true },
    phone: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: function () {
        return this.role === "patient" || this.role === "doctor";
      },
      set: (value) => value?.toLowerCase().trim(),
    },

    dob: { type: Date },

    role: {
      type: String,
      required: true,
      enum: ["patient", "doctor", "pharmacy", "insurer"],
    },

    specialization: { type: String }, // Doctor
    licenseNumber: { type: String }, // Doctor/Pharmacy/Insurer
    clinicAddress: { type: String }, // Doctor
    pharmacyName: { type: String }, // Pharmacy
    companyName: { type: String }, // Insurer
    contactPerson: { type: String }, // Insurer
    address: { type: String },

    govtId: { type: String },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
