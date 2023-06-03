/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef,useEffect, useState  } from "react";
import { useLoader,useThree, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from "three";

import { useGLTF, useAnimations } from "@react-three/drei";


export function Computer(props) {
   //const { nodes, materials } = useLoader(GLTFLoader, '/suzanne.gltf')
    const gltf = useGLTF('/computerV2_anim.glb')
    const { nodes, materials, animations } = useGLTF("/computerV2_anim.glb");
    const { actions, names } = useAnimations(animations)
   


  const ref = useRef();
  const { camera } = useThree();
  const [buttonClick, setButtonClick] = useState(true);

  console.log("render?")

  useEffect(() => {
    setButtonClick(true);
  }, []);

  
  useFrame((state) => {
    //camera.lookAt(0, 0, 0); // Keep the camera looking at the center of the scene
    if(buttonClick){
      state.camera.quaternion.slerp(arcadeCameraQ, 0.02);
      state.camera.position.lerp(new THREE.Vector3(-8, 5, 15), 0.08);
    }else{
      state.camera.quaternion.slerp(defaultCameraQ, 0.02);
      state.camera.position.lerp(new THREE.Vector3(5, 5, 5), 0.08);
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
    
  return (
    <>
    <group>
      <button>Ello!</button>
      <group  onClick={() => setButtonClick(!buttonClick)} >
         <perspectiveCamera ref={ref} position={[-10, 7, 12]} />
         
      {nodes && <primitive object={nodes.Scene} />}
      {materials && Array.isArray(materials) && materials.map((material, index) => (
        <primitive key={index} object={material}  />
      ))}
    </group>
   </group>
    </>
  );
}

export function MoveCamera(){

}

//useGLTF.preload("/suzanne.gltf");