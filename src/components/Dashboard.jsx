import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard({ doctorId, tenantId, onNavigate }){
  const [metrics, setMetrics] = useState({ cards: [] })
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetch(`${API}/metrics?doctor_id=${doctorId || ''}&tenant_id=${tenantId || ''}`)
      .then(r => r.json())
      .then(setMetrics)
      .catch(()=>{})
    const url = new URL(`${API}/appointments`)
    if(doctorId) url.searchParams.set('doctor_id', doctorId)
    if(tenantId) url.searchParams.set('tenant_id', tenantId)
    fetch(url).then(r=>r.json()).then(setAppointments).catch(()=>{})
  }, [doctorId, tenantId])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.cards.map((c,i)=> (
          <div key={i} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
            <div className="text-blue-300 text-sm">{c.label}</div>
            <div className="text-2xl font-semibold text-white">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">Upcoming Appointments</h3>
          <button onClick={() => onNavigate('appointments')} className="text-blue-400 text-sm">View all</button>
        </div>
        <div className="divide-y divide-slate-700/50">
          {appointments.slice(0,5).map(a => (
            <div key={a.id} className="py-3 text-blue-100 flex items-center justify-between">
              <div>
                <div className="font-medium">{a.reason || 'Consultation'}</div>
                <div className="text-xs opacity-70">{a.start_time}</div>
              </div>
              <button onClick={() => onNavigate('appointment', a.id)} className="px-3 py-1 text-xs bg-blue-500/20 text-blue-200 rounded-md">Open</button>
            </div>
          ))}
          {appointments.length===0 && (
            <div className="py-6 text-sm text-blue-300/70">No appointments yet</div>
          )}
        </div>
      </div>
    </div>
  )
}
