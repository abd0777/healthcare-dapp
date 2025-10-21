import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import crypto from "crypto";
import PDFDocument from 'pdfkit'
import path from 'path'
import { fileURLToPath } from 'url'

export const saveAppointment = async (req, res) => {
  try {
    const {
      doctorLicenseNumber,
      doctorName,
      specialization,
      date,
      time,
      transactionHash,
      notes,
      email
    } = req.body;

    if (!email) return res.status(400).json({ message: "User email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const appointmentId = crypto.randomUUID();

    const newAppointment = new Appointment({
      appointmentId: appointmentId,
      doctorLicenseNumber,
      patientGovtId: user.govtId,
      doctorName,
      specialization,
      date,
      time,
      status: "confirmed",
      paymentStatus: "paid",
      walletAddress: user.walletAddress || "",
      transactionHash,
      notes,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment saved successfully", appointment: newAppointment });

  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({ message: "Error saving appointment", error });
  }
};

export const checkAppointmentSlots = async (req, res) => {
  try {
    const { licenseNumber, date } = req.query;
    if(!licenseNumber || !date){
      return res.status(400).json({message: "licenseNumber and date are required"});
    }
    const appointments = await Appointment.find({ 
      doctorLicenseNumber: licenseNumber,
      date: date
    }, { _id: 0, date: 1, time: 1 } // only include date and time for security reasons
  ); 
    res.json(appointments);
  }
  catch(error){
    res.status(500).json({message: "Error checking appointment slots", error});
  }
};

export const appointmentHistory = async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Access restricted to patients only' })
    }
    // console.log('Looking for appointments with patientGovtId:', req.user.patientGovtId)
    const appointments = await Appointment.find({ patientGovtId: req.user.patientGovtId })
    res.json(appointments)
  } catch (err) {
    console.error('Error fetching appointments:', err)
    res.status(500).json({ message: 'Server error' })
  }

};

export const appointmentInvoice = async (req, res) => {
  try {
    const { appointmentId } = req.params

    const appointment = await Appointment.findOne({ appointmentId })
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    if (appointment.patientGovtId !== req.user.patientGovtId) {
      return res.status(403).json({ message: 'Unauthorized access' })
    }

    const user = await User.findOne({ govtId: appointment.patientGovtId })
    const patientName = user?.fullname || 'Unknown Patient'

    const doc = new PDFDocument({ margin: 50 })
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=invoice_${appointmentId}.pdf`)
    doc.pipe(res)

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    // Colors
    const primaryColor = '#6366f1'
    const secondaryColor = '#8b5cf6'
    const textDark = '#1f2937'
    const textLight = '#6b7280'
    const bgLight = '#f9fafb'

    // Header Section with Logo
    doc.image(path.join(__dirname, '../public/icon.png'), 50, 45, { width: 60 })
    
    doc.fillColor(primaryColor)
       .fontSize(24)
       .font('Helvetica-Bold')
       .text('B.M.S Healthcare Centre', 120, 50)
    
    doc.fillColor(textLight)
       .fontSize(10)
       .font('Helvetica')
       .text('123 Health Street, Bengaluru, KA - 560012', 120, 75)
       .text('Phone: +91-80-1234-5678 | Email: info@bmshealthcare.com', 120, 88)

    // Horizontal line
    doc.moveTo(50, 120)
       .lineTo(550, 120)
       .strokeColor(primaryColor)
       .lineWidth(2)
       .stroke()

    // Invoice Title
    doc.moveDown(2)
    doc.fillColor(textDark)
       .fontSize(22)
       .font('Helvetica-Bold')
       .text('Invoice Summary', 50, 140, { align: 'center' })

    // Invoice Number and Date Box
    const boxY = 180
    doc.rect(350, boxY, 200, 85)
       .fillAndStroke(bgLight, primaryColor)
    
    doc.fillColor(textDark)
       .fontSize(10)
       .font('Helvetica-Bold')
       .text('Appointment ID:', 360, boxY + 8)
       .font('Helvetica')
       .fontSize(9)
       .text(appointmentId, 360, boxY + 22, { width: 180 })
    
    doc.font('Helvetica-Bold')
       .fontSize(10)
       .text('Invoice Date:', 360, boxY + 52)
       .font('Helvetica')
       .fontSize(9)
       .text(new Date().toLocaleDateString('en-IN', { 
         year: 'numeric', 
         month: 'long', 
         day: 'numeric' 
       }), 360, boxY + 66)

    // Patient Details Section
    doc.fillColor(primaryColor)
       .fontSize(14)
       .font('Helvetica-Bold')
       .text('Patient Details', 50, boxY)
    
    doc.fillColor(textDark)
       .fontSize(11)
       .font('Helvetica-Bold')
       .text('Name:', 50, boxY + 25)
       .font('Helvetica')
       .fontSize(10)
       .text(patientName, 120, boxY + 25)
    
    doc.font('Helvetica-Bold')
       .fontSize(11)
       .text('Patient ID:', 50, boxY + 45)
       .font('Helvetica')
       .fontSize(10)
       .text(appointment.patientGovtId, 120, boxY + 45)

    // Appointment Details Table
    const tableTop = 295
    
    // Table Header Background
    doc.rect(50, tableTop, 500, 25)
       .fill(primaryColor)
    
    doc.fillColor('#ffffff')
       .fontSize(11)
       .font('Helvetica-Bold')
       .text('Appointment Details', 60, tableTop + 8)

    // Table Content
    let currentY = tableTop + 35
    const lineHeight = 22

    const addTableRow = (label, value, isEven) => {
      if (isEven) {
        doc.rect(50, currentY - 5, 500, lineHeight)
           .fill(bgLight)
      }
      
      doc.fillColor(textDark)
         .font('Helvetica-Bold')
         .fontSize(10)
         .text(label, 60, currentY)
         .font('Helvetica')
         .text(value, 200, currentY, { width: 340 })
      
      currentY += lineHeight
    }

    addTableRow('Doctor Name', `Dr. ${appointment.doctorName}`, true)
    addTableRow('Specialization', appointment.specialization, false)
    addTableRow('Appointment Date', new Date(appointment.date).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }), true)
    addTableRow('Appointment Time', appointment.time, false)
    addTableRow('Status', appointment.status.toUpperCase(), true)

    // Payment Details Section
    currentY += 15
    doc.fillColor(primaryColor)
       .fontSize(14)
       .font('Helvetica-Bold')
       .text('Payment Details', 50, currentY)
    
    currentY += 25
    
    // Payment Box
    doc.rect(50, currentY, 500, 70)
       .strokeColor(primaryColor)
       .lineWidth(1)
       .stroke()

    const paymentY = currentY + 12
    doc.fillColor(textDark)
       .font('Helvetica-Bold')
       .fontSize(10)
       .text('Payment Status:', 60, paymentY)
    
    // Payment status badge
    const statusColor = appointment.paymentStatus === 'paid' ? '#10b981' : '#ef4444'
    doc.rect(200, paymentY - 3, 80, 18)
       .fill(statusColor)
    
    doc.fillColor('#ffffff')
       .font('Helvetica-Bold')
       .fontSize(10)
       .text(appointment.paymentStatus.toUpperCase(), 210, paymentY, { width: 60 })

    doc.fillColor(textDark)
       .font('Helvetica-Bold')
       .text('Transaction Hash:', 60, paymentY + 30)
       .font('Helvetica')
       .fontSize(8)
       .text(appointment.transactionHash, 60, paymentY + 45, { width: 480 })

    // Notes Section (if available)
    if (appointment.notes) {
      currentY += 85
      doc.fillColor(primaryColor)
         .fontSize(14)
         .font('Helvetica-Bold')
         .text('Notes', 50, currentY)
      
      currentY += 20
      doc.rect(50, currentY, 500, 50)
         .fill(bgLight)
      
      doc.fillColor(textDark)
         .font('Helvetica')
         .fontSize(8)
         .text(appointment.notes, 60, currentY + 8, { width: 480, align: 'left' })
      
      currentY += 60
    } else {
      currentY += 85
    }

    // Stamp/Seal (circular stamp design)
    const stampX = 450
    const stampY = currentY + 15
    
    // Outer circle
    doc.circle(stampX, stampY, 45)
       .strokeColor(secondaryColor)
       .lineWidth(3)
       .stroke()
    
    // Inner circle
    doc.circle(stampX, stampY, 38)
       .strokeColor(secondaryColor)
       .lineWidth(1)
       .stroke()
    
    // Stamp text
    doc.fillColor(secondaryColor)
       .fontSize(8)
       .font('Helvetica-Bold')
       .text('VERIFIED', stampX - 25, stampY - 15, { width: 50, align: 'center' })
       .text('&', stampX - 10, stampY - 3, { width: 20, align: 'center' })
       .text('APPROVED', stampX - 25, stampY + 8, { width: 50, align: 'center' })
    
    // Date in stamp
    doc.fontSize(6)
       .font('Helvetica')
       .text(new Date().toLocaleDateString('en-IN'), stampX - 20, stampY + 22, { 
         width: 40, 
         align: 'center' 
       })

    // Footer
    const footerY = currentY + 55
    
    doc.moveTo(50, footerY)
       .lineTo(550, footerY)
       .strokeColor(primaryColor)
       .lineWidth(1)
       .stroke()
    
    doc.fillColor(textLight)
       .fontSize(7)
       .font('Helvetica')
       .text('Thank you for choosing B.M.S Healthcare Centre', 50, footerY + 6, { 
         align: 'center',
         width: 500 
       })
       .text('This is a computer-generated invoice and does not require a signature', 50, footerY + 15, { 
         align: 'center',
         width: 500 
       })

    doc.end()
  } catch (err) {
    console.error('Error generating invoice:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
