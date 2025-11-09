import React, { useState } from 'react'
import GlobeScene from './components/GlobeScene'
import SatellitePanel from './components/SatellitePanel'
import { motion } from 'framer-motion'

export default function App(){
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex items-center justify-between border-b border-white/6 glass">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/6 text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M12 2v20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="3" stroke="white" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div>
            <h1 className="text-white text-lg font-semibold">Heimdall</h1>
            <p className="text-sm text-white/60">Predictive Intelligence for Satellite Longevity</p>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <section className="lg:col-span-2 bg-transparent rounded-lg glass flex items-center justify-center p-4">
          <GlobeScene onSelectSatellite={(id) => setSelected(id)} selectedId={selected} />
        </section>

        <aside className="lg:col-span-1">
          <SatellitePanel selectedId={selected} onClose={() => setSelected(null)} />
        </aside>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-white/60">
        © Heimdall 2025 | Built by the UTS AI Research Group
      </footer>
    </div>
  )
}
