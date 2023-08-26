/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/10s/tvs.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export function Tvs({props,imagedata,genredata}) {
  //const { nodes, materials } = useGLTF('/tvs-transformed.glb')
  //First load in the mesh.
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/10s/tvs-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials, animations } = gltf
  
  const texture = useLoader(TextureLoader, imagedata[3].image)
  const brownmaterial = new MeshStandardMaterial({ color: 0x7f675b })
  return (
    <group scale={2.5} position={[-19, -15, -50]} rotation={[0, -1.5, 0]} {...props} dispose={null}>
      <mesh geometry={nodes.TV.geometry} material={materials['TV:Material']} position={[0, 0, -6.57]} rotation={[Math.PI / 2, 0, 0]} scale={0.8} />
    </group>
  )
}

useGLTF.preload('/glbs/10s/tvs-transformed.glb')
