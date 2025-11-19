import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function PatientDetails({ patientId }){
  const [patient, setPatient] = useState(null)
  const [emrs, setEmrs] = useState([])

  useEffect(() => {
    if(!patientId) return
    fetch(`${API}/patients/${patientId}`).then(r=>r.json()).then(setPatient)
    fetch(`${API}/emrs/${patientId}`).then(r=>r.json()).then(setEmrs)
  }, [patientId])

  if(!patient) return <div className="text-blue-200">Loading...</div>

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 text-blue-100">
        <div className="text-white text-lg font-semibold">{patient.full_name}</div>
        <div className="text-sm opacity-80">{patient.gender || ''} {patient.dob ? `· DOB ${patient.dob}`: ''}</div>
        <div className="text-sm opacity-80">{patient.phone || ''} {patient.email ? `· ${patient.email}` : ''}</div>
        <div className="text-sm opacity-80">{patient.address || ''}</div>
      </div>
      <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
        <div className="text-white font-semibold mb-2">Past EMRs</div>
        <div className="space-y-3">
          {emrs.map(e => (
            <div key={e.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-700">
              <div className="text-blue-100 text-sm">{e.summary || e.assessment || 'EMR record'}</div>
            </div>
          ))}
          {emrs.length===0 && <div className="text-sm text-blue-300/70">No EMRs yet</div>}
        </div>
      </div>
    </div>
  )
}
