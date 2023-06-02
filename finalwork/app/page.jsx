"use client";
import { createRoot } from "react-dom/client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree, extend  } from "@react-three/fiber";
import * as THREE from "three";
import Floor from "@/components/floor";
import { Computer } from "@/components/computer";
import { Environment, OrthographicCamera, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { Stats, OrbitControls, Lightformer, useCursor } from "@react-three/drei";
import { ComputerTwee } from "@/components/Scene";
import { Overlay } from "@/components/overlay";
import { useRouter } from 'next/navigation';

//extend({ StartComputer });
export default function Home() {
  const deg2rad = (degrees) => degrees * (Math.PI / 180);

  return (
    <>
      <Suspense fallback={null}>
        <Overlay />
      </Suspense>
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
      <group  >
        
         
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
      state.camera.position.lerp(new THREE.Vector3(-8, 5, 15), 0.08);
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

  /*
  const handleClick = () => {
    console.log("click!")
    ref.current.position.lerp(0, 0, -10); // Set the new position of the camera
  };
  */

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
   <mesh onClick={() => setButtonClick(!buttonClick)}  position={[-10, 5, 5]}>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
  </group>
  </>)
}