/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/scene.gltf --transform
Author: Urpo (https://sketchfab.com/Urpo)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/retro-computer-f844c0357d284fd8baa1435e9ff31bb2
Title: Retro computer
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function ComputerTwee(props) {
  const { nodes, materials } = useGLTF('/scene-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Part2} />
          <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.Part1} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene-transformed.glb')
