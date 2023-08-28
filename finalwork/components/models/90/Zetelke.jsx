/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/90s/zetelke.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { useLoader } from '@react-three/fiber'

export function Zetelke({ props, onClick, imagedata, genredata, colorData }) {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/90s/zetelke-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials, animations } = gltf

  return (
    <group
      onClick={() => onClick('era_zetel')}
      {...props}
      dispose={null}
      position={[28.8, -25, -8]}
      rotation={[0, 1.2, 0]}
      scale={2.6}
    >
      <mesh
        geometry={nodes.zetelke.geometry}
        material={colorData[3]}
        position={[-7.33, 0, -11]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/glbs/90s/zetelke-transformed.glb')
