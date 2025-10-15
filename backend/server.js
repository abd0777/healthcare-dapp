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
app.use(cors());

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("MongoDB Connected 🎉"))
  .catch((err) => console.error("MongoDB Error 💀", err.message));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", userRoutes);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Route to handle specialist recommendation
app.post("/api/get-specialist-recommendation", async (req, res) => {
  const { prompt } = req.body;

  const fullPrompt = `Patient says: "${prompt}". Based on this, which specialist should they consult: General Physician, Cardiologist, Ophthalmologist, Neurologist, Dermatologist, etc.? Respond with one specialist and a short reason.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    let cleanText = response.text.replace(/\*\*/g, "").trim();
    res.json({ response: cleanText });

  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ response: "Error generating recommendation." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
