import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local dev
      "https://your-frontend-url.vercel.app", // replace with your actual Vercel frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("💀 MongoDB Error:", err.message));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", userRoutes);

// ✅ Gemini API setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ✅ Specialist Recommendation Endpoint
app.post("/api/get-specialist-recommendation", async (req, res) => {
  const { prompt } = req.body;

  const fullPrompt = `Patient says: "${prompt}". Based on this, which specialist should they consult: General Physician, Cardiologist, Ophthalmologist, Neurologist, Dermatologist, etc.? Respond with one specialist and a short reason.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    // Clean and return text
    const cleanText =
      response.text?.replace(/\*\*/g, "").trim() || "No response.";
    res.json({ response: cleanText });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ response: "Error generating recommendation." });
  }
});

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("Healthcare DApp Backend Running ✅");
});

// ❌ Remove app.listen()
// ✅ Export the app for Vercel
export default app;
