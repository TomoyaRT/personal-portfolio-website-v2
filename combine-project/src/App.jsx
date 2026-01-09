import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Experience from './Experience'

function App() {
  return (
    <>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 3, 12]
        }}
        shadows
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>

      <div className="hint">
        點擊筆記型電腦以聚焦 • 點擊背景返回全景
      </div>
    </>
  )
}

export default App
