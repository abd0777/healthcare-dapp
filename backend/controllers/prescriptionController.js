import Prescription from "../models/Prescription.js";
import Appointment from '../models/Appointment.js';
import User from '../models/User.js'; 
import PDFDocument from 'pdfkit';

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

export async function getConsultationHistory(req, res) {
  try {
    const patientId = req.user?.id;
    const prescriptions = await Prescription.find({ patientId }).sort({ createdAt: -1 });

    const appointmentMap = {};
    const doctorMap = {};

    for (const p of prescriptions) {
      if (!appointmentMap[p.appointmentId]) {
        const appt = await Appointment.findOne({ appointmentId: p.appointmentId });
        appointmentMap[p.appointmentId] = appt;
      }

      if (!doctorMap[p.doctorId]) {
        const doc = await User.findOne({ _id: p.doctorId, role: 'doctor' }); // ✅ safe filtering
        doctorMap[p.doctorId] = doc;
      }
    }

    const enriched = prescriptions.map(p => ({
      _id: p._id,
      appointmentId: p.appointmentId,
      createdAt: p.createdAt,
      medicines: p.medicines,
      notes: p.notes,
      doctor: doctorMap[p.doctorId],
      appointment: appointmentMap[p.appointmentId],
    }));

    res.json({ success: true, consultations: enriched });
  } catch (err) {
    console.error('Consultation fetch error:', err);
    res.status(500).json({ success: false });
  }
}

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function downloadPrescription(req, res) {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findById(id);
    if (!prescription) return res.status(404).send('Prescription not found');

    const doctor = await User.findById(prescription.doctorId);
    const patient = await User.findById(prescription.patientId);
    const appointment = await Appointment.findOne({ appointmentId: prescription.appointmentId });

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=prescription.pdf');
    doc.pipe(res);

    // Colors
    const primaryColor = '#2563eb';
    const secondaryColor = '#64748b';
    const lightGray = '#f1f5f9';

    // Helper function for rounded rectangles
    const roundedRect = (x, y, width, height, radius) => {
      doc.moveTo(x + radius, y)
         .lineTo(x + width - radius, y)
         .quadraticCurveTo(x + width, y, x + width, y + radius)
         .lineTo(x + width, y + height - radius)
         .quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
         .lineTo(x + radius, y + height)
         .quadraticCurveTo(x, y + height, x, y + height - radius)
         .lineTo(x, y + radius)
         .quadraticCurveTo(x, y, x + radius, y)
         .closePath();
    };

    // Logo path - adjust according to your logo file name
    const logoPath = path.join(__dirname, '../public/icon.png');

    // Header with logo and hospital name
    try {
      doc.image(logoPath, 50, 45, { width: 60 });
    } catch (err) {
      console.log('Logo not found, skipping...');
    }

    doc.fontSize(24)
       .fillColor(primaryColor)
       .font('Helvetica-Bold')
       .text('B.M.S Healthcare Centre', 120, 50);
    
    doc.fontSize(10)
       .fillColor(secondaryColor)
       .font('Helvetica')
       .text('Excellence in Medical Care', 120, 78);
    
    doc.fontSize(9)
       .text('123 Health Street, Bengaluru, Karnataka 560012', 120, 92)
       .text('Phone: +91 80 1234 5678 | Email: info@healthcareplus.com', 120, 104);

    // Horizontal line after header
    doc.moveTo(50, 130)
       .lineTo(545, 130)
       .strokeColor(primaryColor)
       .lineWidth(2)
       .stroke();

    // Title
    doc.fontSize(18)
       .fillColor(primaryColor)
       .font('Helvetica-Bold')
       .text('MEDICAL PRESCRIPTION', 50, 150, { align: 'center' });

    doc.moveTo(50, 175)
       .lineTo(545, 175)
       .strokeColor(lightGray)
       .lineWidth(1)
       .stroke();

    // Doctor Information Box (rounded)
    roundedRect(50, 190, 495, 80, 10);
    doc.fillAndStroke(lightGray, secondaryColor);

    doc.fontSize(11)
       .fillColor('#000000')
       .font('Helvetica-Bold')
       .text('Doctor Information', 60, 200);

    doc.fontSize(10)
       .font('Helvetica')
       .fillColor(secondaryColor)
       .text(`Name: ${doctor?.fullname}`, 60, 220)
       .text(`Specialization: ${doctor?.specialization}`, 60, 235)
       .text(`Email: ${doctor?.email || 'Email Not Known'}`, 60, 250);

    // Patient & Appointment Details
    doc.fontSize(11)
       .fillColor('#000000')
       .font('Helvetica-Bold')
       .text('Patient Details', 320, 200);

    doc.fontSize(10)
       .font('Helvetica')
       .fillColor(secondaryColor)
       .text(`Name: ${patient?.fullname || 'Patient'}`, 320, 220)
       .text(`Date: ${appointment?.date}`, 320, 235)
       .text(`Time: ${appointment?.time}`, 320, 250);

    // Prescription Details Section
    doc.fontSize(12)
       .fillColor(primaryColor)
       .font('Helvetica-Bold')
       .text('Medicine Info:', 50, 290);

    // Table with rounded corners
    const tableTop = 320;
    
    // Table header (rounded top corners)
    doc.moveTo(50 + 8, tableTop)
       .lineTo(545 - 8, tableTop)
       .quadraticCurveTo(545, tableTop, 545, tableTop + 8)
       .lineTo(545, tableTop + 25)
       .lineTo(50, tableTop + 25)
       .lineTo(50, tableTop + 8)
       .quadraticCurveTo(50, tableTop, 50 + 8, tableTop)
       .closePath()
       .fillAndStroke('#e2e8f0', secondaryColor);

    doc.fontSize(10)
       .fillColor('#000000')
       .font('Helvetica-Bold')
       .text('S.No', 60, tableTop + 8, { width: 40 })
       .text('Medicine Name', 110, tableTop + 8, { width: 180 })
       .text('Dosage', 300, tableTop + 8, { width: 100 })
       .text('Frequency', 410, tableTop + 8, { width: 125 });

    // Medicine Rows
    let currentY = tableTop + 25;
    prescription.medicines.forEach((m, i) => {
      const rowHeight = 30;
      
      // Alternate row colors
      if (i % 2 === 0) {
        doc.rect(50, currentY, 495, rowHeight)
           .fill('#f8fafc');
      }

      doc.fontSize(9)
         .fillColor('#000000')
         .font('Helvetica')
         .text(`${i + 1}`, 60, currentY + 10, { width: 40 })
         .font('Helvetica-Bold')
         .text(m.name, 110, currentY + 10, { width: 180 })
         .font('Helvetica')
         .text(m.dosage, 300, currentY + 10, { width: 100 })
         .text(m.frequency, 410, currentY + 10, { width: 125 });

      currentY += rowHeight;
    });

    // Bottom border of table with rounded bottom corners
    const borderY = currentY + 1; // shift down by 1px

    // Draw full table border with rounded corners
    doc.roundedRect(50, tableTop, 495, currentY - tableTop, 6)
      .lineWidth(0.5)
      .strokeColor(secondaryColor)
      .stroke();

    currentY += 20;
    // Notes Section (rounded)
    if (prescription.notes) {
      doc.fontSize(11)
         .fillColor(primaryColor)
         .font('Helvetica-Bold')
         .text('Additional Notes:', 50, currentY);
      
      currentY += 20;
      
      roundedRect(50, currentY, 495, 60, 10);
      doc.fillAndStroke('#fef3c7', '#f59e0b');

      doc.fontSize(9)
         .fillColor('#000000')
         .font('Helvetica')
         .text(prescription.notes, 60, currentY + 10, { 
           width: 475, 
           align: 'left' 
         });

      currentY += 80;
    }

    // Digital Signature Section
    currentY = Math.max(currentY, 650);
    
    doc.fontSize(9)
       .fillColor(secondaryColor)
       .font('Helvetica-Oblique')
       .text('This is a digitally generated prescription', 50, currentY, { 
         align: 'center',
         width: 495
       });

    doc.fontSize(10)
       .font('Helvetica-Bold')
       .fillColor('#000000')
       .text('_______________________', 380, currentY + 30);
    
    doc.fontSize(9)
       .font('Helvetica')
       .text(`Dr. ${doctor?.fullname}`, 380, currentY + 50)
       .text(doctor?.specialization, 380, currentY + 65);

    // Footer
    doc.fontSize(8)
       .fillColor(secondaryColor)
       .font('Helvetica')
       .text(
         'This prescription is valid for 30 days from the date of issue. Please consult your doctor before taking any medication.',
         50,
         750,
         { align: 'center', width: 495 }
       );

    doc.moveTo(50, 770)
       .lineTo(545, 770)
       .strokeColor(lightGray)
       .stroke();

    doc.fontSize(7)
       .text(`Prescription ID: ${prescription.appointmentId} | Downloaded on: ${new Date().toLocaleDateString()}`, 
         50, 775, { align: 'center', width: 495 });

    doc.end();
  } catch (err) {
    console.error('PDF generation error:', err);
    res.status(500).send('Failed to generate prescription');
  }
}

