import React, { useEffect, useState } from 'react'
import { Download, Calendar, Clock, User, CreditCard, FileText, Activity } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [patientGovtId, setPatientGovtId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    if (!token || !email) {
      setError('Missing credentials')
      setLoading(false)
      return
    }

    // Step 1: Fetch patient profile to get patientGovtId
    async function fetchPatientGovtId() {
      try {
        const res = await fetch(`${BACKEND_URL}/users/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!res.ok) throw new Error('Failed to fetch user profile')
        const userData = await res.json()
        setPatientGovtId(userData.govtId)
      } catch (err) {
        console.error('Error fetching user profile:', err)
        setError('Unable to verify user')
        setLoading(false)
      }
    }

    fetchPatientGovtId()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token || !patientGovtId) return

    // Step 2: Fetch appointments securely
    async function fetchAppointments() {
      try {
        setLoading(true)
        const res = await fetch(`${BACKEND_URL}/appointments/appointment-history`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!res.ok) throw new Error('Failed to fetch appointments')
        const data = await res.json()
        setAppointments(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching appointments:', error)
        setError('Failed to load appointments. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [patientGovtId])

  const handleDownloadInvoice = async (appointmentId) => {
    const token = localStorage.getItem('token')
    const url = `${BACKEND_URL}/appointments/invoice/${appointmentId}`

    try {
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
        })

        if (!response.ok) {
        throw new Error('Failed to download invoice')
        }

        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = `invoice_${appointmentId}.pdf`
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
        console.error('Invoice download failed:', err)
        alert('Could not download invoice. Please try again.')
    }
  }



  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'confirmed': return 'bg-green-500'
      case 'completed': return 'bg-blue-500'
      case 'cancelled': return 'bg-red-500'
      case 'pending': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Find your Appointment Details here !!
        </h2>
        <div className="text-center py-12 text-gray-600">Loading appointments...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Find your Appointment Details here !!
        </h2>
        <div className="text-center py-12 text-red-500">{error}</div>
      </div>
    )
  }

  if (appointments.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Find your Appointment Details here !!
        </h2>
        <div className="text-center py-12 text-gray-600">No appointments found.</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Find your Appointment Details here !!
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {appointments.map((appointment) => (
          <div 
            key={appointment.appointmentId} 
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-5 text-white">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                <User size={20} />
                {appointment.doctorName}
              </h3>
              <span className="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {appointment.specialization}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-3">
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <FileText size={16} className="text-gray-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-600">Appointment ID:</span>
                </div>
                <span className="text-gray-800 text-xs font-mono break-all bg-gray-50 p-2 rounded block">
                  {appointment.appointmentId}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-gray-500 flex-shrink-0" />
                <span className="font-semibold text-gray-600">Date:</span>
                <span className="text-gray-800">{formatDate(appointment.date)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-500 flex-shrink-0" />
                <span className="font-semibold text-gray-600">Time:</span>
                <span className="text-gray-800">{formatTime(appointment.time)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Activity size={16} className="text-gray-500 flex-shrink-0" />
                <span className="font-semibold text-gray-600">Status:</span>
                <span className={`${getStatusColor(appointment.status)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                  {appointment.status.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <CreditCard size={16} className="text-gray-500 flex-shrink-0" />
                <span className="font-semibold text-gray-600">Payment:</span>
                <span className={`font-semibold ${appointment.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                  {appointment.paymentStatus === 'paid' ? '✓ Successful' : '✗ Unsuccessful'}
                </span>
              </div>

              {appointment.paymentStatus === 'paid' && (
                <div className="text-sm">
                  <span className="font-semibold text-gray-600">Payment Date:</span>
                  <span className="text-gray-800 ml-2 block sm:inline">
                    {formatDate(appointment.createdAt)} at {new Date(appointment.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}

              <div className="text-sm">
                <span className="font-semibold text-gray-600 block mb-1">Transaction Hash:</span>
                <span className="text-gray-800 font-mono text-xs break-all bg-gray-50 p-2 rounded block">
                  {appointment.transactionHash}
                </span>
              </div>
            </div>

            {/* Download Button */}
            <button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-200"
              onClick={() => handleDownloadInvoice(appointment.appointmentId)}
            >
              <Download size={18} />
              Download Invoice
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AppointmentHistory
