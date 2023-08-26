import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader , Html } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { MeshStandardMaterial } from 'three'
import dynamic from 'next/dynamic';

import { Popup } from '@/components/popup'


export function ModelDesk({ props, imageData, genreData, dominantColor, eraData, trackData }) {
  //const { nodes, materials } = useGLTF('/glbs/RoomDeskNew-transformed.glb')
 
  const [dynamicComponent, setDynamicComponent] = useState([]);;
  const [modelType,setModelType]=useState(1)
  const [trackInfo, setTrackInfo]=useState();

  //Dit zijn enkele states voor de popup te regelen
  const [meshClicker, setMeshClicker]=useState(true);
  const [clickType, setClickType]=useState(); //Geef mee of het om 'era', 'track' of 'genre' gaat
  const [clickData, setClickData]=useState(); //Geef de data die behandeld wordt

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
    //console.log("here is our era data:" , eraData[0].era)
    //eraData[0].era=1700;
    console.log("this is the new imagedata:" ,imageData)
    
    let loadedComponents = [];
    if (eraData[0].era >=2010) {
      //console.log("newest era! ",eraData[0].era )
     loadedComponents = [
        dynamic(() => import('@/components/models/10/Boekjes').then((mod) => mod.Boekjes)),
        dynamic(() => import('@/components/models/10/Dvd').then((mod) => mod.Dvd)),
        dynamic(() => import('@/components/models/10/Tafeltje10').then((mod) => mod.Tafeltje10)),
        dynamic(() => import('@/components/models/10/Tvs').then((mod) => mod.Tvs)),
        dynamic(() => import('@/components/models/10/Chair10').then((mod) => mod.Chair10))
      ];
    } else if (eraData[0].era >=1990) {
     // console.log("middle era! ", eraData[0].era)
      loadedComponents = [
        dynamic(() => import('@/components/models/90/Drumpad').then((mod) => mod.Drumpad)),
        dynamic(() => import('@/components/models/90/Lavalamp').then((mod) => mod.Lavalamp)),
        dynamic(() => import('@/components/models/90/Tafeltje90').then((mod) => mod.Tafeltje90)),
        dynamic(() => import('@/components/models/90/Zetelke').then((mod) => mod.Zetelke))
      ];
    } else {
      //console.log("earliest era! ",eraData[0].era)
       loadedComponents = [
        dynamic(() => import('@/components/models/70/Magazines').then((mod) => mod.Magzines70)),
        dynamic(() => import('@/components/models/70/Vinyls').then((mod) => mod.Vinyls)),
        dynamic(() => import('@/components/models/70/Vinylspeler').then((mod) => mod.Vinylspeler)),
        dynamic(() => import('@/components/models/70/Tafeltje70').then((mod) => mod.Tafeltje70)),
        dynamic(() => import('@/components/models/70/Chair70s').then((mod) => mod.Chair70s))
      ];
      
    }
    
    //Here we check the favorite genres and add a mesh based on that
    const genres_HH_ELECTRONIC = ['rap', 'hip hop', 'electronic', 'EDM', "pop", 'dance', 'r&b'];
    const genres_CLASSICAL = ['classical', 'jazz'];
    const genres_ACOUSTIC = ['rock', 'indie ', 'country'];
    //genreData[0].genre = "classical"
    if(genres_HH_ELECTRONIC.some(genre => genreData[0].genre.includes(genre))){
      loadedComponents.push(dynamic(() => import('@/components/models/HH/Shoes').then((mod) => mod.Shoes)));
    }else if(genres_CLASSICAL.some(genre => genreData[0].genre.includes(genre))){
      loadedComponents.push(dynamic(() => import('@/components/models/CLASSICAL/Violin').then((mod) => mod.Violin)));
    }else{
      loadedComponents.push(dynamic(() => import('@/components/models/ACOUSTIC/Guitar').then((mod) => mod.Guitar)));
    }

    setDynamicComponent(loadedComponents);
  }, [modelType, imageData]);

  //Get dominant color
  //console.log("dominant color: ",dominantColor[1][0])

  //meshmaterial interacts with light - basis does not
  const brownmaterial = new MeshStandardMaterial({ color: 0x7f675b })
  const beigematerial = new MeshStandardMaterial({ color: 0xf1e3d3 })
  const lightgreenish = new MeshStandardMaterial({ color: 0xcacaaa })
  const darkgreenish = new MeshStandardMaterial({ color: 0x485c42 })

  //Texture van het fotokader
   const textureKader = useLoader(TextureLoader, imageData[4].url);
   textureKader.flipY = false
  textureKader.needsUpdate = true

  function meshClick(type){
    //First check what type of data needs to be sent through
    if(type.includes("genre")){
        setClickType("genre");
        setClickData(genreData)
    }else if(type.includes("track")){
      setClickType("track");  
      setClickData(imageData)
    }else{
      //else it's era
        setClickType("era");
         setClickData(eraData)
    }

    //Activate the box! It opens the popup
    setMeshClicker(!meshClicker);
    if(meshClicker){
      console.log("Open box!");
    }else{
      console.log("close box..")
    }
  }
  
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
    {meshClicker ? (
            <></>
          ) : (
             <Popup type={clickType} data={clickData} />
          )}
      

      <group onClick={(e)=> {meshClick(e.object.name)}} rotation={[0, 0, 0]} position={[3, 30, 3.8]}>
        <mesh
        name='track_poster5'
          geometry={nodes.Poster5.geometry}
          material={materials.standardSurface2}
          position={[0.02, 0.15, 2.2]}
          rotation={[1.57, 0, 1.6]}
          scale={[-0.001, 0.05, -0.07]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imageData[0].url)}
          />
        </mesh>
        <mesh
        name='track_poster4'
          geometry={nodes.Poster4.geometry}
          material={materials.standardSurface2}
          position={[4.05, 7.16, -1.16]}
          rotation={[1.58, 0.15, 1.56]}
          scale={[-0.001, 0.04, -0.05]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imageData[1].url)}
          />
        </mesh>
        <mesh
        name='track_poster3'
          geometry={nodes.Poster3.geometry}
          material={materials.standardSurface2}
          position={[4.07, 4.13, 0.16]}
          rotation={[1.58, 0.06, 1.56]}
          scale={[-0.001, 0.04, -0.05]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imageData[2].url)}
          />
        </mesh>
        <mesh 
        name='track_poster2'
          geometry={nodes.Poster2.geometry}
          material={materials.standardSurface2}
          position={[0.03, 1.17, -0.16]}
          rotation={[1.58, 0.06, 1.56]}
          scale={[-0.001, 0.04, -0.04]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imageData[3].url)}
          />
        </mesh>
        <mesh
        name='track_poster1'
          geometry={nodes.Poster11.geometry}
          material={materials.standardSurface2}
          position={[5.03, 4.14, 0.15]}
          rotation={[1.58, 0.07, 1.56]}
          scale={[-0.001, 0.04, -0.05]}
        >
          <meshStandardMaterial
            map={useLoader(TextureLoader, imageData[4].url)}
          />
        </mesh>
      </group>
      <mesh
        geometry={nodes.HOUSEHouse002.geometry}
        material={beigematerial}
        position={[2, 0.05, 0.11]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.011, 0.006, 0.01]}
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
         name='genre_Kaderfoto'
          geometry={nodes.Mesh007_1.geometry}
          material={materials.standardSurface2}
         onClick={(e)=> {meshClick(e.object.name)}}
        >
          <meshStandardMaterial
            map={textureKader}
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
