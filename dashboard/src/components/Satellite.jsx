import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const Satellite = ({ position, angle, hasData, satelliteId, data, onClick }) => {
  const satelliteRef = useRef()
  const [hovered, setHovered] = useState(false)
  const orbitRadius = 3.5
  const orbitSpeed = 0.3

  useFrame((state) => {
    if (satelliteRef.current) {
      // Orbital motion
      const time = state.clock.getElapsedTime() * orbitSpeed
      const newAngle = angle + time
      const height = Math.sin(satelliteId === 'satellite-a' ? time * 0.5 : time * 0.7) * 0.5
      
      satelliteRef.current.position.x = Math.cos(newAngle) * orbitRadius
      satelliteRef.current.position.y = height
      satelliteRef.current.position.z = Math.sin(newAngle) * orbitRadius
      
      // Always face the center (Earth)
      satelliteRef.current.lookAt(0, 0, 0)
    }
  })

  const color = hasData ? (data?.color || '#00FF00') : '#666666'
  const scale = hovered ? 1.3 : 1.0

  return (
    <group
      ref={satelliteRef}
      position={position}
      onPointerOver={() => hasData && setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={hasData ? onClick : null}
      style={{ cursor: hasData ? 'pointer' : 'default' }}
    >
      {/* Satellite body */}
      <mesh scale={scale}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Solar panels */}
      <mesh position={[-0.2, 0, 0]} scale={scale}>
        <boxGeometry args={[0.1, 0.15, 0.05]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0.2, 0, 0]} scale={scale}>
        <boxGeometry args={[0.1, 0.15, 0.05]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Glow effect for satellites with data */}
      {hasData && (
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={hovered ? 0.3 : 0.1}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
      
      {/* Status indicator */}
      {hasData && (
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={data?.status === 'critical' ? '#FF00FF' : '#00FF00'}
            emissive={data?.status === 'critical' ? '#FF00FF' : '#00FF00'}
            emissiveIntensity={1}
          />
        </mesh>
      )}
    </group>
  )
}

export default Satellite

