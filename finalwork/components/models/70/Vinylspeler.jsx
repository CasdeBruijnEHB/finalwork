/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/70/vinylspeler.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { useLoader } from '@react-three/fiber'

export function Vinylspeler({
  props,
  onClick,
  imagedata,
  genredata,
  colorData,
}) {
  //First load in the mesh.
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/70/vinylspeler-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials, animations } = gltf

  return (
    <group
      onClick={() => onClick('era_vinyspeler')}
      {...props}
      dispose={null}
      position={[-28, -2, -28]}
      rotation={[0, 0, 0]}
      scale={0.85}
    >
      <mesh
        geometry={nodes.polySurface103001.geometry}
        material={colorData[6]}
        position={[13.73, -26.08, -56.74]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={3.67}
      />
    </group>
  )
}

useGLTF.preload('/glbs/70/vinylspeler-transformed.glb')
