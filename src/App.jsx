import { useMemo, useState } from 'react'
import Dashboard from './components/Dashboard'
import Appointments from './components/Appointments'
import PatientDetails from './components/PatientDetails'
import EMRComposer from './components/EMRComposer'

function App() {
  const [view, setView] = useState('dashboard')
  const [doctorId] = useState('')
  const [tenantId] = useState('')
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null)
  const [selectedPatientId, setSelectedPatientId] = useState('')

  const navigate = (v, id) => {
    if(v === 'appointment') {
      setSelectedAppointmentId(id)
      setView('emr')
    } else if(v === 'appointments') {
      setView('appointments')
    } else if(v === 'patient') {
      setSelectedPatientId(id)
      setView('patient')
    } else {
      setView('dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="text-white text-2xl font-semibold">Doctor Console</div>
          <nav className="flex items-center gap-2">
            <button onClick={()=>setView('dashboard')} className={`px-3 py-1 rounded-md text-sm ${view==='dashboard'?'bg-blue-500 text-white':'bg-slate-800 text-blue-200'}`}>Dashboard</button>
            <button onClick={()=>setView('appointments')} className={`px-3 py-1 rounded-md text-sm ${view==='appointments'?'bg-blue-500 text-white':'bg-slate-800 text-blue-200'}`}>Appointments</button>
            <button onClick={()=>setView('patient')} className={`px-3 py-1 rounded-md text-sm ${view==='patient'?'bg-blue-500 text-white':'bg-slate-800 text-blue-200'}`}>Patients</button>
            <button onClick={()=>setView('emr')} className={`px-3 py-1 rounded-md text-sm ${view==='emr'?'bg-blue-500 text-white':'bg-slate-800 text-blue-200'}`}>EMR</button>
          </nav>
        </header>

        {view==='dashboard' && (
          <Dashboard doctorId={doctorId} tenantId={tenantId} onNavigate={navigate} />
        )}
        {view==='appointments' && (
          <Appointments doctorId={doctorId} tenantId={tenantId} onSelect={(id)=>navigate('appointment', id)} />
        )}
        {view==='patient' && (
          <div className="space-y-4">
            <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
              <label className="text-blue-100 text-sm">Patient ID</label>
              <input value={selectedPatientId} onChange={e=>setSelectedPatientId(e.target.value)} className="mt-1 w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-blue-100 text-sm" placeholder="Enter patient id" />
            </div>
            {selectedPatientId && <PatientDetails patientId={selectedPatientId} />}
          </div>
        )}
        {view==='emr' && (
          <div className="space-y-4">
            <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-blue-100 text-sm">Patient ID</label>
                  <input value={selectedPatientId} onChange={e=>setSelectedPatientId(e.target.value)} className="mt-1 w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-blue-100 text-sm" placeholder="Enter patient id" />
                </div>
                <div>
                  <label className="text-blue-100 text-sm">Appointment ID</label>
                  <input value={selectedAppointmentId||''} onChange={e=>setSelectedAppointmentId(e.target.value)} className="mt-1 w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-blue-100 text-sm" placeholder="Enter appointment id (optional)" />
                </div>
                <div>
                  <label className="text-blue-100 text-sm">Doctor ID</label>
                  <input value={doctorId} readOnly className="mt-1 w-full bg-slate-900/60 border border-slate-700 rounded-lg p-2 text-blue-100 text-sm" placeholder="Auto" />
                </div>
              </div>
            </div>
            <EMRComposer patientId={selectedPatientId} doctorId={doctorId} appointmentId={selectedAppointmentId} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
