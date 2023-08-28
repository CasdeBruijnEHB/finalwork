'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { Suspense } from 'react'
import { OrbitControls, Html } from '@react-three/drei'
import { Navbar } from '@/components/navbar'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import fullLogo from '@/assets/logo/logoFull_wit.png'
import { Computernew } from '@/components/scenes/Computernew'
import { DirectionalLightHelper, PointLightHelper } from 'three'

export default function Home() {
  const skyColor = new THREE.Color().setHSL(94.251, 0.578, 0.559)

  function Lights() {
    //DirectionalLight + Helper --> Fel
    const directionalLightPosition = [0, 2, 5]
    const directionalLight = useRef()
    //useHelper(directionalLight, DirectionalLightHelper, 'teal')

    // Pointlight -- Sfeervol
    const pointlightpos = [-4, 4, 2]
    const pointLight = useRef()
    //useHelper(pointLight, PointLightHelper, 0.5, 'hotpink')

    return (
      <>
        <pointLight
          ref={pointLight}
          color="rgb(150, 187, 179)"
          position={pointlightpos}
          intensity={2}
          castShadow
        />
        <ambientLight color="rgb(150, 187, 179)" intensity={1} />
      </>
    )
  }

  return (
    <>
      <main>
        <div className="scene">
          <Canvas className="canvas">
            <SkyLight />
            <Suspense fallback={null}>
              <fog attach="fog" args={[skyColor, -5, 25]} />

              <Lights />
              <rectAreaLight
                position={[0, 10, 0]}
                width={10}
                height={10}
                intensity={6}
                color={'white'}
                exposure={2}
                castShadow
              />

              <Computernew planeYesNo={true} />
              <StartKnop />
              {/*<Stats />
              <gridHelper args={[10, 10, `white`, `gray`]} />*/}

              <OrbitControls />
            </Suspense>
          </Canvas>
        </div>
      </main>
    </>
  )
}

function StartKnop() {
  const ref = useRef()
  const [buttonClick, setButtonClick] = useState(true)
  const { push } = useRouter()
  useEffect(() => {
    setButtonClick(true)
  }, [])

  useFrame((state) => {
    if (buttonClick) {
      state.camera.quaternion.slerp(arcadeCameraQ, 0.02)
      state.camera.position.lerp(new THREE.Vector3(0.1, 0.15, 0.4), 0.05)
    } else {
      state.camera.quaternion.slerp(defaultCameraQ, 0.02)
      state.camera.position.lerp(new THREE.Vector3(0.15, 0.22, 0.25), 0.025)
      setTimeout(function () {
        push('/spotify')
      }, 80)
    }
    state.camera.updateProjectionMatrix()
    return null
  })

  // DEFAULT CAMERA QUATERNION
  let defaultCameraQ = new THREE.Quaternion(0, 0, 0, 0)

  // ARCADE QUATERNION
  let arcadeCameraQ = new THREE.Quaternion(-0, 0, 0, 0)

  return (
    <>
      <group>
        <perspectiveCamera ref={ref} position={[-10, 7, 12]} />
        <Html fullscreen className="left-0 top-0 absolute ">
          <div className="bg-transparant z-30 ">
            <Navbar />
            <main>
              <div className="mt-8 ml-[20%] w-3/12">
                <Image
                  src={fullLogo}
                  alt="Full Logo"
                  className="-ml-4 w-full h-full mb-2"
                />

                <p className="text-white ml-[5%] mb-4">
                  Experience your favorite music on a different level. Connect
                  with your Spotify account to Pieces Of Me, and generate your
                  own 3D environment based on your musical preferences.{' '}
                </p>

                <button
                  className="w-fit text-lg ml-[5%] px-4 py-2 font-semibold font-sans bg-white rounded-md "
                  onClick={function () {
                    setButtonClick(!buttonClick)
                  }}
                >
                  Start experience
                </button>
              </div>
            </main>
          </div>
        </Html>
      </group>
    </>
  )
}

function SkyLight() {
  const { scene } = useThree()

  // Create the skydome light
  const skyColor = new THREE.Color().setHSL(94.251, 0.578, 0.559)
  scene.background = skyColor

  return null
}
