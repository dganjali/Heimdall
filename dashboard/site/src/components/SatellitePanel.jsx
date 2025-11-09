import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HARD_DATA = {
  A: {
    title: 'Satellite A',
    subtitle: 'Stable Health',
    RUL: 95,
    SOH: 0.94,
    Capacity: 0.91,
    status: 'green',
    note: 'Monitoring only (no immediate maintenance required)'
  },
  B: {
    title: 'Satellite B',
    subtitle: 'Critical Degradation',
    RUL: 18,
    SOH: 0.76,
    Capacity: 0.68,
    status: 'red',
    note: 'Triage Priority – dispatch Heimdall repair sequence'
  }
}

function StatusBadge({ status }){
  const map = { green: 'bg-green-500 text-black', yellow: 'bg-yellow-400 text-black', red: 'bg-red-500 text-white' }
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]||'bg-gray-500'}`}>{status?.toUpperCase()}</span>
}

export default function SatellitePanel({ selectedId, onClose }){
  return (
    <AnimatePresence>
      {selectedId ? (
        <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 200, opacity: 0 }} transition={{ type: 'spring', stiffness: 100 }} className="glass p-6 rounded-lg shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold">{HARD_DATA[selectedId].title}</h3>
              <p className="text-sm text-white/70">{HARD_DATA[selectedId].subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={HARD_DATA[selectedId].status} />
              <button onClick={onClose} className="text-sm text-white/60 hover:text-white">Close</button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="p-4 rounded-md bg-white/3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/60">Remaining Useful Life</div>
                  <div className="text-2xl font-bold">{HARD_DATA[selectedId].RUL} cycles</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/60">SOH</div>
                  <div className="text-xl font-semibold">{HARD_DATA[selectedId].SOH}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-md bg-white/3 flex items-center justify-between">
              <div>
                <div className="text-sm text-white/60">Capacity Retention</div>
                <div className="text-xl font-semibold">{HARD_DATA[selectedId].Capacity}</div>
              </div>
              <div className="text-sm text-white/60">Category</div>
            </div>

            <div className="p-4 rounded-md bg-white/3">
              <div className="text-sm text-white/60">Notes</div>
              <div className="mt-2 text-sm">{HARD_DATA[selectedId].note}</div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass p-6 rounded-lg text-center text-white/70">
          <div className="text-sm">No satellite selected</div>
          <div className="mt-2 text-xs text-white/50">Click a satellite on the left to view analytics</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
