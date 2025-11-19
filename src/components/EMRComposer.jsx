import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function EMRComposer({ patientId, doctorId, appointmentId }){
  const [transcript, setTranscript] = useState('')
  const [emr, setEmr] = useState(null)
  const [saving, setSaving] = useState(false)

  const generate = async () => {
    const r = await fetch(`${API}/emr/generate`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ transcript }) })
    const data = await r.json()
    setEmr(data)
  }

  const save = async () => {
    if(!emr) return
    setSaving(true)
    const payload = { ...emr, patient_id: patientId, doctor_id: doctorId, appointment_id: appointmentId }
    await fetch(`${API}/emrs`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    setSaving(false)
    alert('Saved EMR')
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
        <div className="text-white font-semibold mb-2">Conversational EMR</div>
        <textarea value={transcript} onChange={e=>setTranscript(e.target.value)} rows={6} placeholder="Paste conversation transcript or notes..." className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-blue-100 text-sm" />
        <div className="mt-3 flex gap-2">
          <button onClick={generate} className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">Generate</button>
          <button onClick={save} disabled={!emr || saving} className="px-3 py-1 bg-emerald-500 text-white rounded-md text-sm disabled:opacity-50">Save</button>
        </div>
      </div>
      {emr && (
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
          <div className="text-white font-semibold mb-2">Draft</div>
          <pre className="text-blue-100 text-sm whitespace-pre-wrap">{JSON.stringify(emr, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
