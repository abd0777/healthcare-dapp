import express from "express";
import {
  saveAppointment,
  checkAppointmentSlots,
  appointmentHistory,
  doctorAppointments,
  appointmentInvoice,
} from "../controllers/appointmentController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/save", saveAppointment);
router.get("/check", checkAppointmentSlots);
router.get("/appointment-history", verifyToken, appointmentHistory);
router.get("/invoice/:appointmentId", verifyToken, appointmentInvoice);
router.get("/doctor", verifyToken, doctorAppointments); // Doctor's appointment route-Abdul
export default router;
