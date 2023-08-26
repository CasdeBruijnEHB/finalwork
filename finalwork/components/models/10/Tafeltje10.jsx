/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/10s/Tafeltje10.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export function Tafeltje10({props,imagedata,genredata}) {
  //const { nodes, materials } = useGLTF('/Tafeltje10-transformed.glb')
  //First load in the mesh.
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/10s/Tafeltje10-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials, animations } = gltf
  
  const texture = useLoader(TextureLoader, imagedata[3].image)
  const brownmaterial = new MeshStandardMaterial({ color: 0x7f675b })
  return (
    <group {...props} dispose={null}>
      <group position={[-0.02, 0.31, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.53}>
        <mesh geometry={nodes.Mesh.geometry} material={materials.wood} />
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.wood} />
      </group>
    </group>
  )
}

useGLTF.preload('/glbs/10s/Tafeltje10-transformed.glb')