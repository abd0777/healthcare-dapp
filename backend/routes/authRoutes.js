import express from "express";
import { registerUser, loginUser, loginPatient, logoutUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login-patient", loginPatient);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
export default router;
