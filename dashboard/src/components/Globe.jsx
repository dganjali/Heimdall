import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

const Globe = () => {
  const globeRef = useRef()

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002 // Slow rotation
    }
  })

  return (
    <group ref={globeRef}>
      {/* Earth sphere */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#0B1AAE"
          roughness={0.8}
          metalness={0.2}
          emissive="#0B1AAE"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Atmospheric glow */}
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshStandardMaterial
          color="#0B1AAE"
          transparent
          opacity={0.2}
          emissive="#0B1AAE"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Grid lines */}
      <mesh>
        <sphereGeometry args={[2.01, 32, 16]} />
        <meshBasicMaterial
          color="#00FF00"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

export default Globe

