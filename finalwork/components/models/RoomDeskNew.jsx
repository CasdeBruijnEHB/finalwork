import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { MeshStandardMaterial } from 'three'
import dynamic from 'next/dynamic';
/*
import { Magzines70 } from '@/components/models/70/Magazines'
import { Vinyls } from '@/components/models/70/Vinyls'
import { Vinylspeler } from '@/components/models/70/Vinylspeler'
import { Tafeltje70 } from '@/components/models/70/Tafeltje70'

import { Drumpad } from '@/components/models/90/Drumpad'
import { Lavalamp } from '@/components/models/90/Lavalamp'
import { Stoeltje } from '@/components/models/90/Stoeltje'
import { Zetelke } from '@/components/models/90/Zetelke'
import { Boekjes } from '@/components/models/10/Boekjes'
import { Dvd } from '@/components/models/10/Dvd'
import { Tafeltje } from '@/components/models/90/Tafeltje'
import { Tvs } from '@/components/models/10/Tvs'
import { Tafeltje10 } from '@/components/models/10/Tafeltje10'
*/



export function ModelDesk({ props, imageData, genreData, dominantColor, eraData }) {
  //const { nodes, materials } = useGLTF('/glbs/RoomDeskNew-transformed.glb')
 
  const [dynamicComponent, setDynamicComponent] = useState([]);;
  const [modelType,setModelType]=useState(1)

  //First load in the main mesh.
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltf = useLoader(
    GLTFLoader,
    '/glbs/RoomDeskNew-transformed.glb',
    (loader) => {
      loader.setDRACOLoader(dracoLoader)
    },
  )
  const { nodes, materials } = gltf


  useEffect(() => {
    //Here we first check the era of the music to choose the right meshes.
    console.log("here is our era data:" , eraData[0].era)
    eraData[0].era=2000;
    let loadedComponents = [];
    if (eraData[0].era >=2010) {
      console.log("newest era! ",eraData[0].era )
      loadedComponents = [
        dynamic(() => import('@/components/models/70/Magazines').then((mod) => mod.Magzines70)),
        dynamic(() => import('@/components/models/70/Vinyls').then((mod) => mod.Vinyls)),
        dynamic(() => import('@/components/models/70/Vinylspeler').then((mod) => mod.Vinylspeler)),
        dynamic(() => import('@/components/models/70/Tafeltje70').then((mod) => mod.Tafeltje70))
      ];
    } else if (eraData[0].era >=1990) {
      console.log("middle era! ", eraData[0].era)
      loadedComponents = [
        dynamic(() => import('@/components/models/90/Drumpad').then((mod) => mod.Drumpad)),
        dynamic(() => import('@/components/models/90/Lavalamp').then((mod) => mod.Lavalamp)),
        dynamic(() => import('@/components/models/90/Tafeltje').then((mod) => mod.Tafeltje)),
        dynamic(() => import('@/components/models/90/Zetelke').then((mod) => mod.Zetelke))
      ];
    } else {
      console.log("earliest era! ",eraData[0].era)
      setDynamicComponent(null);
    }

    setDynamicComponent(loadedComponents);
  }, [modelType, imageData]);


  //Next load in the genredata and use it to add certain meshes
  //console.log('genredata:', genreData)

  //Get dominant color
  //console.log("dominant color: ",dominantColor[1][0])

  //meshmaterial interacts with light - basis does not
  const brownmaterial = new MeshStandardMaterial({ color: 0x7f675b })
  const beigematerial = new MeshStandardMaterial({ color: 0xf1e3d3 })
  const lightgreenish = new MeshStandardMaterial({ color: 0xcacaaa })
  const darkgreenish = new MeshStandardMaterial({ color: 0x485c42 })

  return (
    <group
      position={[0, -0.5, 0.1]}
      scale={[0.05, 0.05, 0.05]}
      rotation={[0, 3.5, 0]}
      {...props}
      dispose={null}
    >
      
      <group>
      {dynamicComponent.map((DynamicComponent, index) => (
        <DynamicComponent  key={index}  imagedata={imageData}/>
      ))}
      </group>

      <group rotation={[0, 0, 0]} position={[3, 30, 3.8]}>
        <mesh
          geometry={nodes.Poster5.geometry}
          material={materials.standardSurface2}
          position={[0.02, 0.15, 2.2]}
          rotation={[1.57, 0, 1.6]}
          scale={[-0.001, 0.05, -0.07]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imageData[0].image)}
          />
        </mesh>
        <mesh
          geometry={nodes.Poster4.geometry}
          material={materials.standardSurface2}
          position={[4.05, 7.16, -1.16]}
          rotation={[1.58, 0.15, 1.56]}
          scale={[-0.001, 0.04, -0.05]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imageData[1].image)}
          />
        </mesh>
        <mesh
          geometry={nodes.Poster3.geometry}
          material={materials.standardSurface2}
          position={[4.07, 4.13, 0.16]}
          rotation={[1.58, 0.06, 1.56]}
          scale={[-0.001, 0.04, -0.05]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imageData[2].image)}
          />
        </mesh>
        <mesh
          geometry={nodes.Poster2.geometry}
          material={materials.standardSurface2}
          position={[0.03, 1.17, -0.16]}
          rotation={[1.58, 0.06, 1.56]}
          scale={[-0.001, 0.04, -0.04]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imageData[3].image)}
          />
        </mesh>
        <mesh
          geometry={nodes.Poster11.geometry}
          material={materials.standardSurface2}
          position={[5.03, 4.14, 0.15]}
          rotation={[1.58, 0.07, 1.56]}
          scale={[-0.001, 0.04, -0.05]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imageData[4].image)}
          />
        </mesh>
      </group>
      <mesh
        geometry={nodes.HOUSEHouse002.geometry}
        material={beigematerial}
        position={[0.01, 0.05, 0.11]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.01, 0.005, 0.01]}
        castShadow
        receiveShadow
      ></mesh>
      <mesh
        geometry={nodes.Tafel.geometry}
        material={brownmaterial}
        position={[0.01, 0.05, 0.06]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
        scale={0.01}
      />
      <group
        position={[0.01, 0.05, 0.04]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      >
        <mesh
          geometry={nodes.Mesh007.geometry}
          material={materials.standardSurface2}
        />
        <mesh
          geometry={nodes.Mesh007_1.geometry}
          material={materials.standardSurface2}
        >
          <meshStandardMaterial
            flipY={true}
            map={useLoader(TextureLoader, imageData[4].image)}
          />
        </mesh>
        <mesh
          geometry={nodes.Mesh007_2.geometry}
          material={materials.lambert1}
        />
      </group>
      <group
        position={[0.05, 0.1, 0.14]}
        rotation={[Math.PI / 2, 0, 2.96]}
        scale={0.003}
      >
        <mesh geometry={nodes.Mesh008.geometry} material={lightgreenish} />
        <mesh geometry={nodes.Mesh008_1.geometry} material={darkgreenish} />
      </group>
      <group
        position={[0.02, 0.1, 0.14]}
        rotation={[Math.PI / 2, 0, 3.03]}
        scale={0.003}
      >
        <mesh geometry={nodes.Mesh009.geometry} material={darkgreenish} />
        <mesh geometry={nodes.Mesh009_1.geometry} material={lightgreenish} />
      </group>
    </group>
  )
}

useGLTF.preload('/glbs/RoomDeskNew-transformed.glb')
