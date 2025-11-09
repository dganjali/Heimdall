import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
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
    ref.current.rotation.y += delta * 0.07
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.2, 64, 64]} />
      <meshStandardMaterial map={tex} metalness={0.1} roughness={0.9} />
    </mesh>
  )
}

function Satellites({ onSelect }){
  const group = useRef()
  const count = 5
  const baseRadius = 3.6
  const dummy = useMemo(()=> new THREE.Object3D(),[])
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    for(let i=0;i<count;i++){
      const ang = t*0.4 + (i*(Math.PI*2/count))
      const x = Math.cos(ang)*baseRadius
      const z = Math.sin(ang)*baseRadius*0.9
      const mesh = group.current.children[i]
      mesh.position.set(x, (i%2?0.15:-0.15), z)
      mesh.rotation.y = -ang
    }
  })

  return (
    <group ref={group}>
      {new Array(count).fill(0).map((_,i)=>{
        const id = i===1? 'A' : (i===3? 'B' : null)
        return (
          <mesh key={i} onClick={() => id && onSelect(id)} castShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={id? (id==='A' ? '#A8FF00':'#FF00D0') : '#888'} emissive={id? (id==='A' ? '#A8FF00':'#FF00D0') : '#222'} />
            {id && <Html center className="pointer-events-none" distanceFactor={8}>
              <div style={{color:'white', fontSize:10, opacity:0.85}}>{id}</div>
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
    <div className="w-full h-[640px] rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10,10,10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <Globe textureUrl={textureUrl} />
        <Satellites onSelect={(id)=> onSelectSatellite(id)} />
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
      </Canvas>
      <div className="absolute left-6 top-6 text-sm text-white/70 glass p-2 rounded-md">Click a satellite to view analytics</div>
    </div>
  )
}
