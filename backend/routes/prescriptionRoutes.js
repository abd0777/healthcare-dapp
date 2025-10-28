import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  createPrescription,
  getPrescriptionByAppointment,
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/create", verifyToken, createPrescription);
router.get("/:appointmentId", verifyToken, getPrescriptionByAppointment);

export default router;