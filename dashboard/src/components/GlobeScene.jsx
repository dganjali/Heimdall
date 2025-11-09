import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import Globe from './Globe'
import Satellite from './Satellite'

const GlobeScene = ({ onSatelliteClick, satelliteData }) => {
  const cameraRef = useRef()

  // Define 5 satellite positions in orbit
  const satellitePositions = useMemo(() => {
    const radius = 3.5
    const positions = []
    
    // Create 5 satellites at different orbital positions
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2
      const height = Math.sin(i * 0.8) * 0.5 // Vary height slightly
      positions.push({
        id: i === 0 ? 'satellite-a' : i === 1 ? 'satellite-b' : `satellite-${i + 1}`,
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ],
        angle: angle,
        hasData: i < 2, // First two have data
      })
    }
    
    return positions
  }, [])

  return (
    <div className="w-full h-screen relative">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        className="bg-dark-bg"
      >
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 2, 8]}
          fov={50}
        />
        
        {/* Ambient and directional lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FF00FF" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#00FF00" />
        
        {/* Starfield background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        
        {/* Globe */}
        <Globe />
        
        {/* Satellites */}
        {satellitePositions.map((sat, index) => (
          <Satellite
            key={sat.id}
            position={sat.position}
            angle={sat.angle}
            hasData={sat.hasData}
            satelliteId={sat.id}
            data={satelliteData[sat.id]}
            onClick={() => sat.hasData && onSatelliteClick(sat.id)}
          />
        ))}
        
        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={6}
          maxDistance={15}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Overlay instructions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-dark-surface/60 backdrop-blur-md px-6 py-3 rounded-lg border border-accent-magenta/30"
        >
          <p className="text-sm text-gray-300 text-center">
            Click on highlighted satellites to view analytics
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default GlobeScene

