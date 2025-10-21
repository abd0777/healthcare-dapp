import express from "express";
import { saveAppointment, checkAppointmentSlots, appointmentHistory, appointmentInvoice } from "../controllers/appointmentController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/save", saveAppointment);
router.get("/check", checkAppointmentSlots);
router.get("/appointment-history", verifyToken, appointmentHistory)
router.get("/invoice/:appointmentId", verifyToken, appointmentInvoice)
export default router;
