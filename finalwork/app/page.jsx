"use client";
import { createRoot } from "react-dom/client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree, extend  } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, OrthographicCamera, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { Stats, OrbitControls, Lightformer, useCursor,Html, Reflector, MeshReflectorMaterial   } from "@react-three/drei";
import { Navbar } from "@/components/navbar";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import fullLogo from '@/assets/logo/logoFull_wit.png'



export default function Home() {
  const deg2rad = (degrees) => degrees * (Math.PI / 180);
  const skyColor = new THREE.Color().setHSL(94.251, 0.578, 0.559);
  console.log("Homepage!")


  useEffect(() => {
    async function testJe(){
      console.log("asynccccccc")
    }
    testJe()
  }, []);
  return (
    <>
      <main>
      <div className="scene">
        <Canvas
          shadows
          className="canvas"
        >
          <SkyLight/>
          <Suspense fallback={null}>
           < fog attach="fog" args={[skyColor, -10, 90]} />
            <ambientLight color={"#7FB069"} intensity={0.5} />
            <rectAreaLight
              position={[0, 10, 0]}
              width={10}
              height={10}
              intensity={6}
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
        </main>
      </>
    
  );
}


function StartComputer(){
 //const { nodes, materials } = useLoader(GLTFLoader, '/suzanne.gltf')
    const gltf = useGLTF('/glbs/computerV2_anim.glb')
    const { nodes, materials, animations } = useGLTF("/glbs/computerV2_anim.glb");
    const { actions, names } = useAnimations(animations)
 
  return (
    <>
    <group>
      <group rotation={[0.3,0,0]} position={[
        6, -2, -12]} >

        <mesh  position={[
        0,-1.9, -2]} rotation={[(-85 * Math.PI) / 180,0,0]}>
          <planeGeometry  args={[250, 250, 2]} />
          <MeshReflectorMaterial
            blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
            mixBlur={0} // How much blur mixes with surface roughness (default = 1)
            mixStrength={1} // Strength of the reflections
            mixContrast={1} // Contrast of the reflections
            resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
            mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
            depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
            minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
            maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
            depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
            distortion={1} // Amount of distortion based on the distortionMap texture
            
            debug={0} /* Depending on the assigned value, one of the following channels is shown:
              0 = no debug
              1 = depth channel
              2 = base channel
              3 = distortion channel
              4 = lod channel (based on the roughness)
            */
            reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
          />
        </mesh>
         
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

