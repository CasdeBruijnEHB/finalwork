/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/glbs/computerV2_anim.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations, useVideoTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { useLoader } from '@react-three/fiber'
import { VideoTexture } from 'three';
import * as THREE from 'three'

export function ComputerJSX(props) {
  const group = useRef()
   //First load in the mesh.
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/computerV2_anim-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials,animations } = gltf

  const { actions } = useAnimations(animations, group)

   
    const texture = useVideoTexture('/videotextures/V1screen.mp4')
    // Flip video texture
    texture.flipY = false 
    //texture.needsUpdate = true

  return (
    <group scale={[0.02, 0.02, 0.02]} position={[0.1, 0.05, 0.15]} ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Top" position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.03, 0.04, 0.03]}>
          <mesh castShadow receiveShadow  name="monitor" geometry={nodes.monitor.geometry} material={materials.GeneralComputerSurface} />
          <mesh name="Screen" geometry={nodes.Screen.geometry} position={[0, -0.65, 0]}>
            <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>
        </group>
        <group name="toetsen" position={[0, 0.01, 0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.02, 0.02, 0.005]}>
          <mesh name="Toets_linksmidden" geometry={nodes.Toets_linksmidden.geometry} material={materials.knoppenSurface}  />
          <mesh name="Toets_Linksonder" geometry={nodes.Toets_Linksonder.geometry} material={materials.knoppenSurface} />
          <mesh name="Toets_linkstop" geometry={nodes.Toets_linkstop.geometry} material={materials.knoppenSurface} />
          <mesh name="Toets_middenmidden" geometry={nodes.Toets_middenmidden.geometry} material={materials.knoppenSurface} />
          <mesh name="Toets_middenonder" geometry={nodes.Toets_middenonder.geometry} material={materials.knoppenSurface} />
          <mesh name="Toets_middentop" geometry={nodes.Toets_middentop.geometry} material={materials.knoppenSurface} />
          <mesh name="Toets_rechtsmidden" geometry={nodes.Toets_rechtsmidden.geometry} material={materials.knoppenSurface} />
          <mesh name="Toets_rechtsonder" geometry={nodes.Toets_rechtsonder.geometry} material={materials.knoppenSurface} />
          <mesh name="Toets_rechtstop" geometry={nodes.Toets_rechtstop.geometry} material={materials.knoppenSurface} />
          <mesh name="Kastje" geometry={nodes.Kastje.geometry} material={materials.toetsenbordSurface} />
        </group>
        <group name="Bottom" position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.03, 0.04, 0.02]}>
          <mesh name="Mesh002" geometry={nodes.Mesh002.geometry} material={materials.GeneralComputerSurface} />
          <mesh name="Mesh002_1" geometry={nodes.Mesh002_1.geometry} material={materials.knoppenSurface} />
        </group>
        <mesh name="Draadje" geometry={nodes.Draadje.geometry} material={materials.cablesurface} position={[3, 1.3, 0]} rotation={[1.57, 1.47, 0]} scale={0.0015} />
      </group>
    </group>
  )
}

useGLTF.preload('/computerV2_anim-transformed.glb')
