/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/90s/stoeltje.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export function Stoeltje({props,imagedata,genredata}) {
  //const { nodes, materials } = useGLTF('/stoeltje-transformed.glb')
const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/90s/stoeltje-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials, animations } = gltf
  
  const texture = useLoader(TextureLoader, imagedata[3].image)
  const brownmaterial = new MeshStandardMaterial({ color: 0x7f675b })

  return (
    <group {...props} dispose={null}>
      <group position={[-3.51, 2.22, -0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.stoeltje_1.geometry} material={materials.aiStandardSurface18SG} />
        <mesh geometry={nodes.stoeltje_2.geometry} material={materials.aiStandardSurface18SG} />
      </group>
    </group>
  )
}

useGLTF.preload('/glbs/90s/stoeltje-transformed.glb')
