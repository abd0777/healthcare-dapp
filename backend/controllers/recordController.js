import Records from "../models/Records.js";
import dotenv from "dotenv";
import axios from "axios";
import crypto from "crypto";
import FormData from "form-data";
import Appointment from "../models/Appointment.js";
dotenv.config();

const MASTER_KEY = Buffer.from(process.env.MASTER_KEY, 'base64');

// AES-GCM encryption
function encryptBuffer(buffer) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', MASTER_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]); // IV + TAG + CIPHERTEXT
}

// Upload encrypted buffer to Pinata using REST API
async function uploadToPinata(encryptedBuffer, filename) {
  const form = new FormData();
  // Append Buffer directly; provide filename and contentType
  form.append('file', encryptedBuffer, { filename, contentType: 'application/pdf' });

  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  const res = await axios.post(url, form, {
    headers: {
      ...form.getHeaders(), // multipart/form-data; boundary=...
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });

  // Pinata REST returns { IpfsHash, ... }
  return res.data.IpfsHash;
}

// Main controller
export async function uploadRecord(req, res) {
  try {
    const { filename } = req.body;
    const patientGovtId = req.user?.patientGovtId;
    const fileBuffer = req.file.buffer;

    const encryptedBuffer = encryptBuffer(fileBuffer);
    const cid = await uploadToPinata(encryptedBuffer, filename);

    const newRecord = {
      filename,
      cidEncrypted: cid,
      uploadedAt: new Date(),
      accessList: [],
    };

    let patientDoc = await Records.findOne({ patientGovtId });
    if (!patientDoc) {
      patientDoc = new Records({ patientGovtId, records: [newRecord] });
    } else {
      patientDoc.records.push(newRecord);
    }

    await patientDoc.save();
    const savedRecord = patientDoc.records.at(-1); // last pushed record
    res.json({
    success: true,
    record: {
        _id: savedRecord._id,
        fileName: savedRecord.filename, // match frontend naming
        uploadedAt: savedRecord.uploadedAt,
        cidEncrypted: savedRecord.cidEncrypted,
        appointments: [], // stub for frontend toggle
    },
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
}


export async function getMyRecords(req, res) {
  try {
    const patientGovtId = req.user?.patientGovtId;
    if (!patientGovtId) return res.status(401).json({ success: false });

    const patientDoc = await Records.findOne({ patientGovtId });
    const appointments = await Appointment.find({ patientGovtId });

    const gateway = process.env.PINATA_GATEWAY;

    const records = (patientDoc?.records || []).map((r) => {
    const enrichedAppointments = appointments.map((a) => ({
        id: a.appointmentId,
        doctorName: a.doctorName,
        specialization: a.specialization,
        date: a.date,
        time: a.time,
        accessGranted: r.accessList.includes(a.appointmentId),
    }));

    // Sort by ascending date
    enrichedAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
        _id: r._id,
        fileName: r.filename,
        uploadedAt: r.uploadedAt,
        cidEncrypted: r.cidEncrypted,
        blobUrl: `${gateway}/ipfs/${r.cidEncrypted}`,
        appointments: enrichedAppointments,
    };
    });


    res.json({ success: true, records });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ success: false });
  }
}

export async function toggleAccess(req, res) {
  try {
    const { recordId, appointmentId, grant } = req.body;
    const patientGovtId = req.user?.patientGovtId;

    const patientDoc = await Records.findOne({ patientGovtId });
    if (!patientDoc) return res.status(404).json({ success: false });

    const record = patientDoc.records.id(recordId);
    if (!record) return res.status(404).json({ success: false });

    if (grant) {
      if (!record.accessList.includes(appointmentId)) {
        record.accessList.push(appointmentId);
      }
    } else {
      record.accessList = record.accessList.filter(id => id !== appointmentId);
    }

    await patientDoc.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Toggle error:', err);
    res.status(500).json({ success: false });
  }
}

export async function streamDecryptedRecord(req, res) {
  try {
    const { cid } = req.params;
    const gateway = process.env.PINATA_GATEWAY;
    const masterKey = Buffer.from(process.env.MASTER_KEY, 'base64'); // 32 bytes

    const fileRes = await axios.get(`${gateway}/ipfs/${cid}`, {
      responseType: 'arraybuffer',
    });

    const encryptedBuffer = Buffer.from(fileRes.data);

    // Decrypt using AES-256-GCM
    const iv = encryptedBuffer.slice(0, 12); // GCM uses 12-byte IV
    const authTag = encryptedBuffer.slice(12, 28); // Last 16 bytes
    const encryptedData = encryptedBuffer.slice(28); // Middle chunk

    const decipher = crypto.createDecipheriv('aes-256-gcm', masterKey, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
    decipher.update(encryptedData),
    decipher.final(),
    ]);

    res.setHeader('Content-Type', 'application/pdf');
    res.send(decrypted);

  } catch (err) {
    console.error('Decryption error:', err);
    res.status(500).send('Failed to decrypt file');
  }
}

export const getRecordsForDoctor = async (req, res) => {
  try {
    const { appointmentId, patientGovtId } = req.query;

    if (!appointmentId || !patientGovtId) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const recordDoc = await Records.findOne({ patientGovtId });
    if (!recordDoc) return res.status(404).json({ success: false, message: "No records found" });

    const gateway = process.env.PINATA_GATEWAY;

    const accessibleRecords = recordDoc.records
      .filter((r) => r.accessList.includes(appointmentId))
      .map((r) => ({
        _id: r._id,
        fileName: r.filename,
        uploadedAt: r.uploadedAt,
        cidEncrypted: r.cidEncrypted,
        blobUrl: `${gateway}/ipfs/${r.cidEncrypted}`,
      }));

    res.json({ success: true, records: accessibleRecords });
  } catch (err) {
    console.error("Doctor record fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};