'use client'
import { useEffect, useState } from 'react'
import { Room } from '@/components/scenes/Room'
import {
  Stats,
  OrbitControls,
  Lightformer,
  useCursor,
  Html, useHelper 
} from '@react-three/drei'
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader,
} from '@react-three/fiber'
import React, { useRef } from 'react'
import { Suspense } from 'react'
import * as THREE from 'three'
import SpotifyPlayer from 'react-spotify-web-playback'
import SpotiPlayerComp from '@/components/SpotiPlayer'
import dynamic from 'next/dynamic'
import { ComputerHome } from '@/components/scenes/ComputerHome'
import { DirectionalLightHelper, PointLightHelper } from "three";


let fetchURL = 'http://localhost:3001'
//https://finalwork-26j6.onrender.com

export default function SpotifyResultPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [trackData, setTrackData] = useState({})
  const [artistData, setArtistData] = useState({})
  const [loader, isLoading] = useState(true)
  //This has to be a string since it has to be sent to the spotify API
  const [favoriteTrackIDs, setFavoriteTrackIDs] = useState([])

  const GradientBackground = dynamic(
    () => import('@/components/gradientbackground'),
    { ssr: false },
  )

  useEffect(() => {
    //First off we need to fetch some data...
    async function fetchData() {
      try {
        //To start we are fetching the accesstoken
        const response = await fetch('http://localhost:3001/getaccess')
        const data = await response.text()
        setAccessToken(data)
        console.log('access code: ', data)

        //Next we are fetching the trackdata (used to get dates, images, trackid's)
        await fetch(`${fetchURL}/trackData`)
          .then((result) => result.json())
          .then((data) => {
            let favoritesArr = []
            console.log('trackdata...:', data)
            setTrackData(data)
            console.log(data.items)

            for (let item of data.items) {
              console.log(item)
              favoritesArr.push(`spotify:track:${item.id}`)
            }
            setFavoriteTrackIDs(favoritesArr)
          })
        //Then we get the favorite artist data (used to get favorite genres)
        await fetch(`${fetchURL}/artistData`)
          .then((result) => result.json())
          .then((data) => {
            setArtistData(data)
          })
        //If it's all fetched we tell the app the loading is done.
        isLoading(false)
      } catch (error) {
        console.error('Error:', error)
        isLoading(false)
      }
    }
    fetchData()
  }, [])
  console.log('favorite ids: ', favoriteTrackIDs)

  const onPlaybackStatusChange = (status) => {
    setIsPlaying(status.isPlaying)
  }

  function SkyLight() {
    const { scene } = useThree()
    // Create the skydome light
    //const skyColor = new THREE.Color().setHSL(94.251, 0.578, 0.559) // this is the POM green
    const skyColor = new THREE.Color().setHSL(37 / 360, 79 / 100, 84 / 100);
    skyColor.a = 0.5 //
    scene.background = skyColor
    return null
  }

  return (
    <>
        <Canvas shadows="soft" className="canvas"  style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'hsl(37, 79%, 84%)',
      }}>
      <Lights/>
       <SkyLight/>
          <Suspense fallback={null}>
            {loader ? (
              <Html>
                <p>Loading...</p>
              </Html>
            ) : (
              <>
                <ComputerHome 
                  scale={0.1}
                  position={[-0.1, -0.5, 0.6]}
                  rotation={[0,0.5, 0]}
                  planeYesNo={false}
                />
                <Room trackData={trackData} artistData={artistData} />
              </>
            )}
            <gridHelper args={[10, 10, `white`, `gray`]} />
            <OrbitControls />
            <Stats />
          </Suspense>
        </Canvas>
      
      <SpotiPlayerComp
        loader={loader}
        accessToken={accessToken}
        favoriteTrackIDs={favoriteTrackIDs}
        onPlaybackStatusChange={onPlaybackStatusChange}
      />
    </>
  )
}

async function createGenreImage(genre) {
  try {
    console.log('create genre image...')
    //console.log(genre)
    const res = await fetch(`${fetchURL}/generateImage/${genre}`)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

async function scrapeImages() {
  //Encode imagelink so it can be send through as parm
  console.log('scraping images')
  //console.log(genre)
  const res = await fetch(`${fetchURL}/scrape-images`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

function Lights(){

  //DirectionalLight + Helper --> Fel
const directionalLightPosition = [0, 2, 5];
const directionalLight = useRef()
useHelper(directionalLight, DirectionalLightHelper, "teal")

// Pointlight -- Sfeervol
const pointlightpos = [-4, 4, 2];
const pointLight = useRef()
useHelper(pointLight, PointLightHelper, 0.5, "hotpink")

//<directionalLight  ref={directionalLight} position={directionalLightPosition} castShadowintensity={1} />
  return(<>
        <pointLight ref={pointLight} color="red" position={pointlightpos} intensity={1} castShadow />
        <ambientLight color={'white'} intensity={0.5} />
  </>)

}