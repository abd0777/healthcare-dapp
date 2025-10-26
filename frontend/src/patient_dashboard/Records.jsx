import { useState } from 'react';
import { Upload, FileText, Eye, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export default function PatientRecords() {
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([
    {
      _id: 'rec1',
      fileName: 'MRI_Report.pdf',
      uploadedAt: '2025-10-01T10:30:00Z',
      blobUrl: '/sample/mri.pdf',
      appointments: [
        { id: 'APT001', accessGranted: true },
        { id: 'APT002', accessGranted: false },
      ],
    },
    {
      _id: 'rec2',
      fileName: 'BloodTest.pdf',
      uploadedAt: '2025-09-15T14:45:00Z',
      blobUrl: '/sample/bloodtest.pdf',
      appointments: [
        { id: 'APT003', accessGranted: false },
      ],
    },
  ]);
  const [previewBlob, setPreviewBlob] = useState(null);
  const [expandedRecords, setExpandedRecords] = useState({});

  const handleUpload = () => {
    const newRecord = {
      _id: `rec${records.length + 1}`,
      fileName: file?.name || 'NewRecord.pdf',
      uploadedAt: new Date().toISOString(),
      blobUrl: URL.createObjectURL(file),
      appointments: [
        { id: 'APT001', accessGranted: false },
        { id: 'APT002', accessGranted: false },
      ],
    };
    setRecords([...records, newRecord]);
    alert('Mock upload complete');
  };

  const toggleAccess = (recordId, appointmentId) => {
    const updated = records.map((r) => {
      if (r._id !== recordId) return r;
      const updatedAppointments = r.appointments.map((a) =>
        a.id === appointmentId ? { ...a, accessGranted: !a.accessGranted } : a
      );
      return { ...r, appointments: updatedAppointments };
    });
    setRecords(updated);
  };

  const handlePreview = (blobUrl) => {
    setPreviewBlob(blobUrl);
  };

  const toggleExpand = (recordId) => {
    setExpandedRecords(prev => ({
      ...prev,
      [recordId]: !prev[recordId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Medical Records
          </h1>
          <p className="text-gray-600">Manage and share your health documents securely</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Upload New Record</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded p-4 hover:border-gray-400 hover:bg-gray-50 transition-all">
                <input 
                  type="file" 
                  accept="application/pdf" 
                  onChange={(e) => setFile(e.target.files[0])} 
                  className="hidden" 
                />
                <div className="text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {file ? <span className="text-gray-900 font-medium">{file.name}</span> : 'Click to select PDF file'}
                  </p>
                </div>
              </div>
            </label>
            
            <button 
              onClick={handleUpload} 
              disabled={!file}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Uploaded Records</h2>
          
          {records.map((r) => (
            <div key={r._id} className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
              {/* Record Header */}
              <div className="p-4">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">{r.fileName}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Uploaded: {new Date(r.uploadedAt).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handlePreview(r.blobUrl)} 
                    className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700 transition-colors font-medium"
                  >
                    Preview
                  </button>
                </div>

                {/* Dropdown Button */}
                <button
                  onClick={() => toggleExpand(r._id)}
                  className="w-full mt-2 p-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Appointments ({r.appointments.length})
                    </span>
                  </div>
                  {expandedRecords[r._id] ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Appointments - Collapsible */}
              {expandedRecords[r._id] && (
                <div className="px-4 pb-4">
                  <div className="space-y-2">
                    {r.appointments.map((a) => (
                      <div 
                        key={a.id} 
                        className="flex justify-between items-center bg-gray-50 p-2 rounded"
                      >
                        <span className="text-sm text-gray-700">ID: {a.id}</span>
                        
                        <label className="flex items-center gap-2 cursor-pointer">
                          <span className="text-sm text-gray-700">
                            {a.accessGranted ? 'Access Granted' : 'Access Revoked'}
                          </span>
                          <div className="relative inline-block">
                            <input
                              type="checkbox"
                              checked={a.accessGranted}
                              onChange={() => toggleAccess(r._id, a.id)}
                              className="sr-only"
                            />
                            <div className={`w-11 h-6 rounded-full transition-colors ${a.accessGranted ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${a.accessGranted ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* PDF Preview */}
        {previewBlob && (
          <div className="mt-6 bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Document Preview</h3>
            </div>
            <iframe 
              src={previewBlob} 
              title="PDF Preview" 
              className="w-full h-96"
            />
          </div>
        )}
      </div>
    </div>
  );
}