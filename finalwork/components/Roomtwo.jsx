
import React, { useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'
import sampleimage from '@/assets/logo/stonessample.jpg';
import { useTexture } from '@react-three/drei';
import * as THREE from "three";
import { TextureLoader } from 'three';

export function Roomtwo({ imageData }){
    
    console.log("Room two activated with data")
    //console.log(imageData)
    /*
    const container = new THREE.Object3D();

     for(let image of imageData){
            console.log(image.image)
    }
   */ 
  const postertexture = useLoader(THREE.TextureLoader, sampleimage.src);
  console.log(imageData[0].image)

    return(
        <>
        <group >
             <mesh  position={[0, 0, 0]}>
                <meshStandardMaterial attach="material" map={useLoader(THREE.TextureLoader,imageData[0].image)} />
                <boxGeometry args={[2, 2, 2]} />
            </mesh>
             <mesh  position={[3, 0, 0]}>
                <meshStandardMaterial attach="material" map={useLoader(THREE.TextureLoader,imageData[1].image)} />
                <boxGeometry args={[2, 2, 2]} />
            </mesh>
            <mesh  position={[5, 0, 0]}>
                <meshStandardMaterial attach="material" map={useLoader(THREE.TextureLoader,imageData[2].image)} />
                <boxGeometry args={[2, 2, 2]} />
            </mesh>
            <mesh  position={[7, 0, 0]}>
                <meshStandardMaterial attach="material" map={useLoader(THREE.TextureLoader,imageData[3].image)} />
                <boxGeometry args={[2, 2, 2]} />
            </mesh>
             <mesh  position={[9, 0, 0]}>
                <meshStandardMaterial attach="material" map={useLoader(THREE.TextureLoader,imageData[4].image)} />
                <boxGeometry args={[2, 2, 2]} />
            </mesh>
          </group>
        </>
    )
}