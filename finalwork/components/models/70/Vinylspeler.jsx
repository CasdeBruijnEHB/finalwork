/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/70/vinylspeler.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export function Vinylspeler({props,imagedata,genredata}) {
  //const { nodes, materials } = useGLTF('/vinylspeler-transformed.glb')

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
  
  const texture = useLoader(TextureLoader, imagedata[3].image)
  const brownmaterial = new MeshStandardMaterial({ color: 0x7f675b })

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.polySurface103001.geometry} material={materials.lambert28} position={[13.73, -26.08, -56.74]} rotation={[Math.PI / 2, 0, 0]} scale={3.67} />
    </group>
  )
}

useGLTF.preload('/glbs/70/vinylspeler-transformed.glb')
