import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  createPrescription,
  getPrescriptionByAppointment,
  getConsultationHistory,
  downloadPrescription
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/create", verifyToken, createPrescription);
router.get("/consultations", verifyToken, getConsultationHistory);
router.get("/:appointmentId", verifyToken, getPrescriptionByAppointment);
router.get('/download/:id', verifyToken, downloadPrescription);
export default router;