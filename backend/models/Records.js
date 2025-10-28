import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  cidEncrypted: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  accessList: {
    type: [String], // Array of appointment IDs
    default: [],
  },
});

const ipfsRecordSchema = new mongoose.Schema({
  patientGovtId: {
    type: String,
    required: true,
    index: true, // Enables fast lookup by doctor
  },
  records: {
    type: [recordSchema],
    default: [],
  },
}, { timestamps: true });

const IpfsRecord = mongoose.model('IpfsRecord', ipfsRecordSchema);
export default IpfsRecord;
