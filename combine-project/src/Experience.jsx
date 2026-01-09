import { useState } from 'react'
import { useThree } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import Laptop from './Laptop'

export default function Experience() {
  const { camera } = useThree()
  const [focusedLaptop, setFocusedLaptop] = useState(null)

  // 筆記型電腦配置
  // 計算旋轉角度使每台筆記型電腦都面向相機初始位置 [0, 3, 12]
  const laptops = [
    {
      id: 'laptop1',
      position: [-2.5, 0, -2.5],
      rotation: [0, Math.atan2(10, -2.5), 0], // 面向相機
      focusCamera: [-2.5, 1.5, 0.5],
      lookAt: [-2.5, 0.5, -2.5]
    },
    {
      id: 'laptop2',
      position: [2.5, 0, -2.5],
      rotation: [0, Math.atan2(2.5, 0), 0], // 面向相機
      focusCamera: [2.5, 1.5, 0.5],
      lookAt: [2.5, 0.5, -2.5]
    },
    {
      id: 'laptop3',
      position: [-2.5, 0, 2.5],
      rotation: [0, Math.atan2(2, -0.5), 0], // 面向相機
      focusCamera: [-2.5, 1.5, 5.5],
      lookAt: [-2.5, 0.5, 2.5]
    },
    {
      id: 'laptop4',
      position: [2.5, 0, 2.5],
      rotation: [0, Math.atan2(10, 0), 0], // 面向相機
      focusCamera: [2.5, 1.5, 5.5],
      lookAt: [2.5, 0.5, 2.5]
    }
  ]

  // 相機動畫
  const focusedLaptopData = focusedLaptop
    ? laptops.find((l) => l.id === focusedLaptop)
    : null

  const cameraPosition = focusedLaptopData?.focusCamera || [0, 3, 12]
  const cameraLookAt = focusedLaptopData?.lookAt || [0, 0, 0]

  // 更新相機位置和朝向
  useSpring({
    from: {
      px: camera.position.x,
      py: camera.position.y,
      pz: camera.position.z
    },
    to: {
      px: cameraPosition[0],
      py: cameraPosition[1],
      pz: cameraPosition[2]
    },
    config: {
      mass: 1,
      tension: 170,
      friction: 26
    },
    onChange: ({ value }) => {
      camera.position.set(value.px, value.py, value.pz)
      // 讓相機看向筆記型電腦中心
      camera.lookAt(cameraLookAt[0], cameraLookAt[1], cameraLookAt[2])
    }
  })

  // 點擊筆記型電腦
  const handleLaptopClick = (laptopId) => {
    setFocusedLaptop(laptopId)
  }

  // 點擊背景返回全景
  const handleBackgroundClick = () => {
    setFocusedLaptop(null)
  }

  return (
    <>
      {/* 光照系統 */}
      <color attach="background" args={['#1a1a1a']} />

      <ambientLight intensity={0.4} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#4a9eff" />
      <pointLight position={[5, 5, -5]} intensity={0.5} color="#ff6b9d" />

      {/* 環境貼圖 */}
      <Environment preset="city" />

      {/* 軌道控制 - 僅在未聚焦時啟用 */}
      {!focusedLaptop && (
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />
      )}

      {/* 筆記型電腦 */}
      {laptops.map((laptop) => (
        <Laptop
          key={laptop.id}
          laptopId={laptop.id}
          position={laptop.position}
          rotation={laptop.rotation}
          onClick={handleLaptopClick}
          isFocused={focusedLaptop === laptop.id}
        />
      ))}

      {/* 地面陰影 */}
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.4}
        scale={15}
        blur={2.5}
        far={4}
      />

      {/* 地板 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
        onClick={handleBackgroundClick}
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0f0f0f" />
      </mesh>
    </>
  )
}
