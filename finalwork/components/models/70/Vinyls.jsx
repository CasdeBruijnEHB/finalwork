/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/70/Vinyls.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'

export function Vinyls({ props, onClick, imagedata, genredata }) {
  //First load in the mesh.
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/70/Vinyls-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials, animations } = gltf

  return (
    <group {...props} dispose={null}>
      <group
        onClick={() => onClick('era_vinyls')}
        position={[-30, 9, -50]}
        rotation={[1.5, 0, 0]}
        scale={2}
      >
        <mesh geometry={nodes.polySurface21.geometry} position={[2, 13, 6]}>
          <meshStandardMaterial
            map={useLoader(TextureLoader, imagedata[5].url)}
          />
        </mesh>
        <mesh
          geometry={nodes.polySurface23.geometry}
          material={materials.Vinyl4Surface}
          position={[0.72, 15.29, 6.94]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imagedata[6].url)}
          />
        </mesh>
        <mesh
          geometry={nodes.polySurface28.geometry}
          material={materials.Vinyl4Surface}
          position={[0.12, 15.98, 6.97]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imagedata[7].url)}
          />
        </mesh>
        <mesh
          geometry={nodes.polySurface30.geometry}
          material={materials.Vinyl4Surface}
          position={[1.14, 15.15, 6.86]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imagedata[8].url)}
          />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/glbs/70/Vinyls-transformed.glb')
