import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Appointments({ doctorId, tenantId, onSelect }){
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('scheduled')

  useEffect(() => {
    const url = new URL(`${API}/appointments`)
    if(doctorId) url.searchParams.set('doctor_id', doctorId)
    if(tenantId) url.searchParams.set('tenant_id', tenantId)
    if(status) url.searchParams.set('status', status)
    fetch(url).then(r=>r.json()).then(setItems)
  }, [doctorId, tenantId, status])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-white font-semibold text-lg">Appointments</h2>
        <select value={status} onChange={e=>setStatus(e.target.value)} className="bg-slate-800 text-blue-100 text-sm rounded-md px-2 py-1 border border-slate-700">
          <option value="">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl">
        {items.map(a => (
          <div key={a.id} className="p-4 border-b border-slate-700/40 flex items-center justify-between">
            <div className="text-blue-100">
              <div className="font-medium">{a.reason || 'Consultation'}</div>
              <div className="text-xs opacity-70">{a.start_time}</div>
            </div>
            <button onClick={() => onSelect(a.id)} className="px-3 py-1 text-xs bg-blue-500/20 text-blue-200 rounded-md">Open</button>
          </div>
        ))}
        {items.length===0 && <div className="p-6 text-sm text-blue-300/70">No records</div>}
      </div>
    </div>
  )
}
