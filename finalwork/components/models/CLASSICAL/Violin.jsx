/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/CLASSICAL/violin.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export function Violin({props,imagedata,genredata}) {
  //const { nodes, materials } = useGLTF('/violin-transformed.glb')

  //First load in the mesh.
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/CLASSICAL/violin-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials, animations } = gltf
  
  const texture = useLoader(TextureLoader, imagedata[3].url)
  const brownmaterial = new MeshStandardMaterial({ color: 0x7f675b })

  return (
    <group {...props} dispose={null}>
      <group position={[40, -4.5, 6]} rotation={[-Math.PI / 2, 0, -3]} scale={14}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial011.geometry} material={materials.main_body} />
          <mesh geometry={nodes.defaultMaterial015.geometry} material={materials.top_thingy} />
          <mesh geometry={nodes.defaultMaterial002.geometry} material={materials.material} />
          <mesh geometry={nodes.defaultMaterial006.geometry} material={materials.material} />
          <mesh geometry={nodes.defaultMaterial007.geometry} material={materials.material} />
          <mesh geometry={nodes.defaultMaterial008.geometry} material={materials.material} />
          <mesh geometry={nodes.defaultMaterial003.geometry} material={materials.strings} />
          <mesh geometry={nodes.defaultMaterial004.geometry} material={materials.strings} />
          <mesh geometry={nodes.defaultMaterial005.geometry} material={materials.strings} />
          <mesh geometry={nodes.defaultMaterial009.geometry} material={materials.strings} />
          <mesh geometry={nodes.defaultMaterial012.geometry} material={materials.lambert2} />
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.lambert2} />
          <mesh geometry={nodes.defaultMaterial001.geometry} material={materials.front1} />
          <mesh geometry={nodes.defaultMaterial010.geometry} material={materials.inside} />
          <mesh geometry={nodes.defaultMaterial013.geometry} material={materials.top2} />
          <mesh geometry={nodes.defaultMaterial014.geometry} material={materials.top3} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/glbs/CLASSICAL/violin-transformed.glb')