/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/ACOUSTIC/guitar.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export function Guitar({props,imagedata,genredata}) {
  //const { nodes, materials } = useGLTF('/guitar-transformed.glb')

  //First load in the mesh.
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/ACOUSTIC/guitar-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials, animations } = gltf
  
  const texture = useLoader(TextureLoader, imagedata[3].url)
  const brownmaterial = new MeshStandardMaterial({ color: 0x7f675b })

  return (
    <group {...props} dispose={null} position={[40, -20, 4]} rotation={[0.2, -3, 0]} scale={2.6}>
      <mesh geometry={nodes.Yamaha_F310_Lowpoly.geometry} material={brownmaterial} position={[-0.16, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]} scale={0.09} />
    </group>
  )
}

useGLTF.preload('/glbs/ACOUSTIC/guitar-transformed.glb')
