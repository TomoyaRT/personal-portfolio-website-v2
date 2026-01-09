import { useEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { TextureLoader } from 'three'
import * as THREE from 'three'

export default function Laptop({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onClick,
  laptopId,
  isFocused = false
}) {
  const groupRef = useRef()
  const [model, setModel] = useState(null)

  // 載入 OBJ 模型
  const obj = useLoader(OBJLoader, '/models/laptop.obj')

  // 載入紋理
  const texture1 = useLoader(TextureLoader, '/models/textures/Lowpoly_Laptop_1.jpg')
  const texture2 = useLoader(TextureLoader, '/models/textures/Lowpoly_Laptop_2.jpg')

  useEffect(() => {
    if (obj) {
      const clonedObj = obj.clone()

      // 設置材質
      clonedObj.traverse((child) => {
        if (child.isMesh) {
          // 檢查材質名稱，判斷是否為螢幕
          const materialName = child.material?.name || ''
          const isScreen = materialName.toLowerCase().includes('screen')

          if (isScreen) {
            // 為螢幕設置深色材質（我們會用 HTML 覆蓋）
            child.material = new THREE.MeshStandardMaterial({
              color: '#000000',
              metalness: 0.1,
              roughness: 0.9,
              emissive: '#111111',
              emissiveIntensity: 0.2
            })
          } else {
            // 為筆記型電腦本體設置材質
            child.material = new THREE.MeshStandardMaterial({
              map: texture1,
              metalness: 0.3,
              roughness: 0.7
            })
          }

          child.castShadow = true
          child.receiveShadow = true
        }
      })

      // 調整模型大小和方向
      clonedObj.scale.set(0.3, 0.3, 0.3)
      clonedObj.rotation.x = Math.PI * 0.02

      setModel(clonedObj)
    }
  }, [obj, texture1, texture2])

  const handleClick = (e) => {
    e.stopPropagation()
    if (onClick) {
      onClick(laptopId)
    }
  }

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
    >
      {model && (
        <>
          <primitive object={model} />

          {/* 螢幕上的網站嵌入 - 始終顯示 */}
          <Html
            transform
            wrapperClass="htmlScreen"
            distanceFactor={0.46}
            position={[1, 0, 0.235]}
            rotation-x={0.025}
            rotation-y={-1.75}
          >
            <iframe
              src="https://tomoya-fawn.vercel.app/"
              className="laptop-screen"
              title={`Laptop ${laptopId} screen`}
            />
          </Html>
        </>
      )}
    </group>
  )
}
