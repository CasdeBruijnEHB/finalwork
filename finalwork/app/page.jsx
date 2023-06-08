"use client";
import { createRoot } from "react-dom/client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree, extend  } from "@react-three/fiber";
import * as THREE from "three";
import Floor from "@/components/floor";
import { Computer } from "@/components/computer";
import { Environment, OrthographicCamera, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { Stats, OrbitControls, Lightformer, useCursor,Html } from "@react-three/drei";
import { Overlay } from "@/components/overlay";
import { Hamburgermenu } from "@/components/hamburgermenu";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import img from '@/assets/logo/pom_groen.png'

//extend({ StartComputer });
export default function Home() {
  const deg2rad = (degrees) => degrees * (Math.PI / 180);
  return (
    <>
   
      <div className="scene">
        <Canvas
          shadows
          className="canvas"
        >
         
          
          <color attach="background" args={["#151520"]} />
          <hemisphereLight intensity={0.5} />
          <directionalLight position={[0, 2, 5]} castShadow intensity={1} />

      
          <Suspense fallback={null}>
            <ambientLight color={"white"} intensity={0.5} />
             
            <gridHelper args={[10, 10, `white`, `gray`]} />
            <StartComputer/>
            <StartKnop/>
            <Stats />
          </Suspense>
        </Canvas>
        </div>
      </>
    
  );
}


function StartComputer(){
 //const { nodes, materials } = useLoader(GLTFLoader, '/suzanne.gltf')
    const gltf = useGLTF('/computerV2_anim.glb')
    const { nodes, materials, animations } = useGLTF("/computerV2_anim.glb");
    const { actions, names } = useAnimations(animations)
 
  return (
    <>
    <group>
      <group rotation={[0.3,0,0]} position={[
        6, -2, -12]} >
        
         
      {nodes && <primitive object={nodes.Scene} />}
      {materials && Array.isArray(materials) && materials.map((material, index) => (
        <primitive key={index} object={material}  />
      ))}
    </group>
   </group>
    </>
  );
}

function StartKnop(){
  const ref = useRef();
  const { camera } = useThree();
  const [buttonClick, setButtonClick] = useState(true);
  const { push } = useRouter();

  console.log("render?")

  useEffect(() => {
    setButtonClick(true);
    
  }, []);

  useFrame((state) => {
    console.log("useframe")
    //camera.lookAt(0, 0, 0); // Keep the camera looking at the center of the scene
    if(buttonClick){
      state.camera.quaternion.slerp(arcadeCameraQ, 0.02);
      state.camera.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
    }else{
      state.camera.quaternion.slerp(defaultCameraQ, 0.02);
      state.camera.position.lerp(new THREE.Vector3(5, 5, 5), 0.08);
      setTimeout(
        function() {
          push('/spotify');
        }, 80);
     
    }
    state.camera.updateProjectionMatrix();
    return null;
  });

   // DEFAULT CAMERA QUATERNION
  let defaultCameraQ = new THREE.Quaternion(
    0,
    0,
    0,
    0
  );
   
    // ARCADE QUATERNION
  let arcadeCameraQ = new THREE.Quaternion(
    -0,
    0,
    0,
    0
  );
    

  return (<>
  <group>
     <perspectiveCamera ref={ref} position={[-10, 7, 12]} />
      <Html fullscreen className="left-0 top-0  ">
            <div className="bg-transparant z-30 ">
              <nav className="mt-4 flex w-screen justify-between items-center">
                <Image
                src={img}
                width={80}
                height={80}
                alt="Picture of the author"
                className="ml-4"
                />
                <div className="text-white mr-4">
                    <Hamburgermenu/>
                </div>
              </nav>

              <div className="text-white">
                    <p onClick={function(){setButtonClick(!buttonClick)}}>Start experience</p>
                </div>
          </div>
          </Html>
  </group>
  </>)
}