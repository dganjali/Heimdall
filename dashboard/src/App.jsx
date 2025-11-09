import { useState } from 'react'
import Navbar from './components/Navbar'
import GlobeScene from './components/GlobeScene'
import AnalyticsPanel from './components/AnalyticsPanel'
import Footer from './components/Footer'

// Hardcoded satellite data
const SATELLITE_DATA = {
  'satellite-a': {
    id: 'satellite-a',
    name: 'Satellite A',
    rul: 95,
    soh: 0.94,
    capacityRetention: 0.91,
    status: 'healthy',
    statusText: 'Healthy – stable degradation rate',
    category: 'Monitoring only (no immediate maintenance required)',
    color: '#00FF00', // Lime green
  },
  'satellite-b': {
    id: 'satellite-b',
    name: 'Satellite B',
    rul: 18,
    soh: 0.76,
    capacityRetention: 0.68,
    status: 'critical',
    statusText: 'Critical – RUL below threshold',
    category: 'Triage Priority – dispatch Heimdall repair sequence',
    color: '#FF00FF', // Neon magenta
  },
}

function App() {
  const [selectedSatellite, setSelectedSatellite] = useState(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const handleSatelliteClick = (satelliteId) => {
    if (SATELLITE_DATA[satelliteId]) {
      setSelectedSatellite(SATELLITE_DATA[satelliteId])
      setIsPanelOpen(true)
    }
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    setSelectedSatellite(null)
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        <GlobeScene 
          onSatelliteClick={handleSatelliteClick}
          satelliteData={SATELLITE_DATA}
        />
        <AnalyticsPanel
          isOpen={isPanelOpen}
          satellite={selectedSatellite}
          onClose={handleClosePanel}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App

