"use client";
import { createRoot } from "react-dom/client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree, extend  } from "@react-three/fiber";
import * as THREE from "three";
import Floor from "@/components/floor";
import { Computer } from "@/components/computer";
import { Environment, OrthographicCamera, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { Stats, OrbitControls, Lightformer, useCursor,Html, Reflector } from "@react-three/drei";
import { Overlay } from "@/components/overlay";
import { Hamburgermenu } from "@/components/hamburgermenu";
import { Navbar } from "@/components/navbar";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import img from '@/assets/logo/POM_wit.png'
import fullLogo from '@/assets/logo/logoFull_wit.png'



//extend({ StartComputer });
/*
<hemisphereLight intensity={0.5} />
          <directionalLight position={[0, 2, 5]} castShadow intensity={1} />
*/
export default function Home() {
  const deg2rad = (degrees) => degrees * (Math.PI / 180);
  return (
    <>
   
      <div className="scene">
        <Canvas
          shadows
          className="canvas"
        >
         
          <SkyLight/>
          
          
          

      
          <Suspense fallback={null}>
           < fog attach="fog" args={['lightpink', -10, 50]} />

            <ambientLight color={"white"} intensity={0.5} />
            {/* Create the area light */}
            <rectAreaLight
              position={[0, 4, 0]}
              width={10}
              height={10}
              intensity={10}
              color={"white"}
              exposure={2}
              castShadow
            />
             
            <gridHelper args={[10, 10, `white`, `gray`]} />
            <StartComputer receiveShadow castShadow/>
            <StartKnop/>
            <Stats />
               
             
            <OrbitControls/>
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

         <Reflector
              resolution={512}
              args={[10, 10]} // Width, Height of the reflector plane
              mirror={0.5} // Reflectiveness of the surface
              mixBlur={8}
              mixStrength={1}
              rotation={[-Math.PI / 2, 0, 0]} // Rotate the reflector to lie horizontally
              position={[0, -2, 0]} // Position the reflector slightly below the objects
              blur={[300, 100]}
              minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
            >{(Material, props) => (
            <Material
              color="#7FB069" // Color of the reflective surface
              metalness={0.9} // Reflectiveness properties
              roughness={0.1}
              {...props}
            />
          )}</Reflector>
         
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
      <Html fullscreen className="left-0 top-0 absolute ">
            <div className="bg-transparant z-30 ">
              <Navbar/>
              
              <main>
                <div className="mt-8 ml-[20%] w-3/12">
                  <Image
                    src={fullLogo}
                    
                    alt="Full Logo"
                    className="-ml-4 w-full h-full mb-2"
                    />
                    
                      <p className="text-white ml-[5%] mb-4">Experience your favorite music on a different level. Connect with your Spotify account to Pieces Of Me, and generate your own 3D environment based on your musical preferences. </p>

                      <button className="w-fit text-lg ml-[5%] px-4 py-2 font-semibold font-sans bg-white rounded-md " onClick={function(){setButtonClick(!buttonClick)}}>Start experience</button>
  
                  </div>
                </main>
                    
               
          </div>
          </Html>
  </group>
  </>)
}


function SkyLight() {
  const { scene } = useThree();

  // Create the skydome light
  const skyColor = new THREE.Color().setHSL(94.251, 0.578, 0.559);
  scene.background = skyColor;

  return null;
}

