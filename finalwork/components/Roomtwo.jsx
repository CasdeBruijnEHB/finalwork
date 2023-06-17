
import React, { useRef, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'
import sampleimage from '@/assets/logo/stonessample.jpg';
import { useTexture } from '@react-three/drei';
import * as THREE from "three";
import { TextureLoader } from 'three';
import { Model } from "@/components/V1";

export function Roomtwo({ imageData, genreData }){
    
    console.log("Room two activated with data")
    console.log(genreData)
    //console.log(genreData[1].genre)
    //console.log(imageData)
    /*
    const container = new THREE.Object3D();

     for(let image of imageData){
            console.log(image.image)
    }
   */ 
 // const postertexture = useLoader(THREE.TextureLoader, sampleimage.src);
  //console.log(imageData[0].image)
  
  console.log("create image now")
  //let mostpopulargenre= genreData[1].genre;

  /*


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

            */

    return(
        <>
        <group >
             <Model imageData={imageData} scale={[20,20,20]}/>
          </group>
        </>
    )
}
