import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'

const SATELLITE_DATA = {
  A: { name: 'Satellite A', desc: 'Stable Health', metrics: { RUL: 95, SOH: 0.94, Capacity: 0.91 }, status: 'green' },
  B: { name: 'Satellite B', desc: 'Critical Degradation', metrics: { RUL: 18, SOH: 0.76, Capacity: 0.68 }, status: 'red' }
}

function Globe({ textureUrl }){
  const ref = useRef()
  const tex = useLoader(TextureLoader, textureUrl)
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.2, 64, 64]} />
      <meshStandardMaterial map={tex} metalness={0.05} roughness={0.95} />
    </mesh>
  )
}

function latLonToVector3(lat, lon, radius){
  // Convert latitude / longitude (degrees) to a 3D position on sphere
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = - (radius * Math.sin(phi) * Math.cos(theta))
  const z = (radius * Math.sin(phi) * Math.sin(theta))
  const y = (radius * Math.cos(phi))
  return new THREE.Vector3(x,y,z)
}

function LandStructures({ radius = 2.2 }){
  // sample positions roughly across major continents
  const positions = [
    [37.7749, -122.4194], // San Francisco
    [51.5074, -0.1278], // London
    [35.6895, 139.6917], // Tokyo
    [-33.8688, 151.2093], // Sydney
    [-23.5505, -46.6333], // Sao Paulo area
    [28.6139, 77.2090], // Delhi
    [1.3521, 103.8198], // Singapore
    [48.8566, 2.3522] // Paris
  ]

  return (
    <group>
      {positions.map((p, idx)=>{
        const pos = latLonToVector3(p[0], p[1], radius)
        const height = 0.12 + (idx % 3) * 0.03
        const q = new THREE.Quaternion()
        // orient the structure to face away from centre
        q.setFromUnitVectors(new THREE.Vector3(0,1,0), pos.clone().normalize())
        return (
          <mesh
            key={idx}
            position={pos.clone().multiplyScalar(1 + height/ (radius*2))}
            quaternion={q}
          >
            <cylinderGeometry args={[0.06, 0.06, height, 6]} />
            <meshStandardMaterial color={0x10B981} emissive={0x083f2a} metalness={0.2} roughness={0.6} />
          </mesh>
        )
      })}
    </group>
  )
}

function Satellites({ onSelect }){
  const group = useRef()
  const count = 5
  const baseRadius = 3.6
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    for(let i=0;i<count;i++){
      const ang = t*0.35 + (i*(Math.PI*2/count))
      const x = Math.cos(ang)*baseRadius
      const z = Math.sin(ang)*baseRadius*0.9
      const mesh = group.current.children[i]
      if (!mesh) continue
      mesh.position.set(x, (i%2?0.15:-0.15), z)
      mesh.rotation.y = -ang
    }
  })

  return (
    <group ref={group}>
      {new Array(count).fill(0).map((_,i)=>{
        const id = i===1? 'A' : (i===3? 'B' : null)
        const color = id ? (id === 'A' ? '#60A5FA' : '#FF4D4D') : '#999999'
        const emissive = id ? (id === 'A' ? '#1E3A8A' : '#4C1D1D') : '#111111'
        return (
          <mesh key={i} onClick={() => id && onSelect(id)} castShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={color} emissive={emissive} metalness={0.15} roughness={0.4} />
            {id && <Html center className="pointer-events-none" distanceFactor={8}>
              <div style={{color:'white', fontSize:10, opacity:0.9}}>{id}</div>
            </Html>}
          </mesh>
        )
      })}
    </group>
  )
}

export default function GlobeScene({ onSelectSatellite, selectedId }){
  const textureUrl = 'https://threejs.org/examples/textures/earth_atmos_2048.jpg'

  return (
    <div className="w-full h-[640px] rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Stars radius={120} depth={50} count={4000} factor={4} saturation={0} fade />
        <Globe textureUrl={textureUrl} />
        <LandStructures />
        <Satellites onSelect={(id)=> onSelectSatellite(id)} />
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
      </Canvas>
      <div className="absolute left-6 top-6 text-sm text-white/70 glass p-2 rounded-md">Click a satellite to view analytics</div>
    </div>
  )
}
