/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/HH_ELEC/shoes.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export function Shoes({props,imagedata,genredata}) {
  //const { nodes, materials } = useGLTF('/shoes-transformed.glb')

 //First load in the mesh.
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/HH_ELEC/shoes-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials, animations } = gltf
  
  const texture = useLoader(TextureLoader, imagedata[3].image)
  const brownmaterial = new MeshStandardMaterial({ color: 0x7f675b })
  return (
    <group {...props} dispose={null} position={[42, -17.5, 4]} rotation={[0, 2, 0]} scale={2.6}>
      <group position={[-0.6, 1.28, -0.15]} rotation={[Math.PI / 2, 0, 3.01]} scale={0.15}>
        <mesh geometry={nodes.Laces_L.geometry} material={materials.MAT_Laces_L} />
        <mesh geometry={nodes.Shoe_L.geometry} material={brownmaterial} />
        <mesh geometry={nodes.Sole_L.geometry} material={materials.MAT_Laces_L} />
      </group>
      <group position={[0.19, -0.39, 0.11]} rotation={[Math.PI / 2, 0, -0.1]} scale={0.15}>
        <mesh geometry={nodes.Laces_R.geometry} material={materials.MAT_Laces_L} position={[4.98, 0, -11.19]} rotation={[0, 0, -0.15]} />
        <mesh geometry={nodes.Shoe_R.geometry} material={materials.MAT_Laces_L} position={[4.98, 0, -11.19]} rotation={[0, 0, -0.15]} />
        <mesh geometry={nodes.Sole_R.geometry} material={materials.MAT_Laces_L} position={[4.98, 0, -11.19]} rotation={[0, 0, -0.15]} />
      </group>
      <mesh geometry={nodes.BoxBottom.geometry} material={brownmaterial} position={[0.18, -0.39, 0.02]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.14} />
      <mesh geometry={nodes.BoxTop.geometry} material={materials.MAT_Laces_L} position={[0.18, -0.39, 0.02]} rotation={[Math.PI / 2, 0, 1.57]} scale={0.14} />
    </group>
  )
}

useGLTF.preload('/glbs/HH_ELEC/shoes-transformed.glb')
