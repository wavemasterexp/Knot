import React, { Suspense, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import { useControl, Controls } from 'react-three-gui'
import Environment from './Environment'

export default function App() {
  return (
    <Controls.Provider>
      <Controls.Canvas concurrent>
        <Scene />
      </Controls.Canvas>
      <Controls title="Environment" />
    </Controls.Provider>
  )
}

function Scene() {
  const preset = useControl('Preset', {
    type: 'select',
    items: ['pisa', 'bridge2', 'milkyway', 'angus'],
  })
  const background = useControl('Background', {
    type: 'boolean',
    value: true,
  })
  return (
    <Suspense fallback={null}>
      <OrbitControls />
      <TorusKnot />
      <Lighting />
      <Environment preset={preset} background={background} />
    </Suspense>
  )
}

function TorusKnot() {
  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01
  })
  return (
    <mesh ref={ref}>
      <torusKnotBufferGeometry args={[1, 0.5, 128, 32]} />
      <meshStandardMaterial metalness={1} roughness={0} specular={1} />
    </mesh>
  )
}

function Lighting() {
  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 2, 2]} />
    </group>
  )
}
