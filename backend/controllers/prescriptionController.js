import Prescription from "../models/Prescription.js";

export const createPrescription = async (req, res) => {
  try {
    const { appointmentId, patientId, medicines, notes } = req.body;
    const doctorId = req.user?.id; // MongoDB _id from JWT

    if (!doctorId || !patientId || !appointmentId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newRx = new Prescription({
      appointmentId,
      doctorId,
      patientId,
      medicines,
      notes,
    });

    await newRx.save();
    res.status(201).json({ success: true, prescription: newRx });
  } catch (err) {
    console.error("Prescription error:", err);
    res.status(500).json({ success: false, message: "Failed to save prescription" });
  }
};

export const getPrescriptionByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const rx = await Prescription.findOne({ appointmentId })
      .populate("doctorId", "fullname email")
      .populate("patientId", "fullname email");

    if (!rx) return res.status(404).json({ success: false, message: "Prescription not found" });

    res.json({ success: true, prescription: rx });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch prescription" });
  }
};