/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/10s/chair10.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

export function Chair10({props,onClick,imagedata,genredata}) {
  //const { nodes, materials } = useGLTF('/chair10-transformed.glb')

   //First load in the mesh.
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/10s/chair10-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials, animations } = gltf
  
  const texture = useLoader(TextureLoader, imagedata[3].url)
  const brownmaterial = new MeshStandardMaterial({ color: 0x7f675b })

  return (
    <group  onClick={() => onClick('era_chair10')} {...props} dispose={null}>
      <group position={[20,-18,-30]} rotation={[-1.6, 0, -0.5]} scale={20}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_4.geometry} material={materials['Black.Plastic']} />
          <mesh geometry={nodes.Object_5.geometry} material={materials['Shiny.Metal']} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/glbs/10s/chair10-transformed.glb')
