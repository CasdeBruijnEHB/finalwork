'use client'
import { useEffect, useState } from 'react'
import { Room } from '@/components/scenes/Room'
import { Stats, OrbitControls, Html, useHelper } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Suspense } from 'react'
import * as THREE from 'three'
import SpotiPlayerComp from '@/components/SpotiPlayer'
import { DirectionalLightHelper, PointLightHelper } from 'three'
import { Computernew } from '@/components/scenes/Computernew'
import Image from 'next/image'

let fetchURL = 'https://finalwork-26j6.onrender.com'
//let fetchURL = 'http://localhost:3001'
//https://finalwork-26j6.onrender.com

export default function SpotifyResultPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [trackData, setTrackData] = useState({})
  const [artistData, setArtistData] = useState({})
  const [loader, isLoading] = useState(true)
  //This has to be a string since it has to be sent to the spotify API
  const [favoriteTrackIDs, setFavoriteTrackIDs] = useState([])
  const [domcolors, setDomColors] = useState([])
  const [averageAmplitude, setAverageAmplitude] = useState(0)
  const [screenshot, SetScreenshot] = useState(false)
  const [screenshotURL, SetScreenshotUrl] = useState()
  const [scrapedIMGS, setScrapedIMGS] = useState([])

  const canvasRef = useRef(null)

  useEffect(() => {
    //First off we need to fetch some data...
    async function fetchData() {
      try {
        //To start we are fetching the accesstoken

        const response = await fetch(`${fetchURL}/getaccess`)
        const data = await response.text()
        setAccessToken(data)
        //Next we are fetching the trackdata (used to get dates, images, trackid's)
        const res = await fetch(`${fetchURL}/trackData`)
        const dat = await res.json()

        //First we add the favorite tracks to an array for the Music Player
        let favoritesArr = []
        setTrackData(dat);
        for (let item of dat.items) {
          favoritesArr.push(`spotify:track:${item.id}`)
        }
        setFavoriteTrackIDs(favoritesArr)

        //Then we get the dominant colors to use in the scene (lighting, textures, etc.)
        const dominantColorsData = await getDominantColors(
          manageImages(dat.items),
        )
        setDomColors(dominantColorsData)

        //Then we get the favorite artist data (used to get favorite genres)
        await fetch(`${fetchURL}/artistData`)
          .then((result) => result.json())
          .then((data) => {
            setArtistData(data)
           // activateScraper(data);
          })

          /*
          async function activateScraper(dataScraper){
              console.log("scraper activated...")
              console.log(dataScraper.items[0].genres[0])
              let scrapedata= dataScraper.items[0].genres[0];
              const resScrape = await fetch(`${fetchURL}/scrape-images/${scrapedata}`)
              const dataScrape = await resScrape.json()
              setScrapedIMGS(dataScrape.items)
              console.log('scrapedimgs: ', dataScrape)
          }
          */
        /*
        const resScrape = await fetch(`${fetchURL}/scrape-images/hiphop`)
        const dataScrape = await resScrape.json()
        setScrapedIMGS(dataScrape)
        console.log('scrapedimgs: ', dataScrape)
        */
            
        //If it's all fetched we tell the app the loading is done.
        isLoading(false)
      } catch (error) {
        console.error('Error:', error)
        isLoading(false)
      }
    }
    fetchData()
    //Handle screenshot
    if (screenshot) {
      const canvas = canvasRef.current

      if (canvas) {
        const dataURL = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataURL
        SetScreenshotUrl(dataURL)
        SetScreenshot(false)
      }
    }
  }, [screenshot])

  const onPlaybackStatusChange = (status) => {
    setIsPlaying(status.isPlaying)
  }

  function SkyLight() {
    const { scene } = useThree()
    const skyColor = new THREE.Color(
      `rgb(${domcolors[0][0]}, ${domcolors[0][1]}, ${domcolors[0][2]})`,
    )
    scene.background = skyColor
    return null
  }

  function Lights() {
    /*There are a lot of helpers in here that are turned off now.
    Can be turned on again if want to move lights. */

    //DirectionalLight + Helper --> Fel
    const directionalLightPosition = [0, 2, 5]
    const directionalLight = useRef()
    //useHelper(directionalLight, DirectionalLightHelper, 'teal')

    // Pointlight -- Sfeervol
    const pointlightpos = [-4, 4, 2]
    const pointLight = useRef()
    //useHelper(pointLight, PointLightHelper, 0.5, 'hotpink')

    return (
      <>
        <pointLight
          ref={pointLight}
          color={`rgb(${domcolors[0][0]}, ${domcolors[0][1]}, ${domcolors[0][2]})`}
          position={pointlightpos}
          intensity={2}
          castShadow
        />
        <ambientLight
          color={`rgb(${domcolors[0][0]}, ${domcolors[0][1]}, ${domcolors[0][2]})`}
          intensity={0.2}
        />
        <ambientLight color={`white`} intensity={0.3} />
      </>
    )
  }

  async function getDominantColors(images) {
    const dominantColors = await Promise.all(
      images.map(async (item) => {
        const imageUrl = item.image
        const colors = await expressDominantColor(imageUrl)
        return colors.color
      }),
    )
    return dominantColors
  }

  const saveScreenshot = () => {
    SetScreenshot(true)
  }

  return (
    <>
      <div className="flex flex-col absolute z-40 drop-shadow-lg text-md bg-white text-[#7FB069] mt-[2%] ml-[2%] rounded-xl pl-10 pt-2.5 pb-2.5 pr-10 space-y-2.5 w-1/5">
        {screenshotURL ? (
          <>
            <p
              className=" w-fit text-md px-4 py-2 text-[#0F1A20] bg-[#7FB069] rounded-md "
              onClick={saveScreenshot}
            >
              Take a new photo.
            </p>
            <Image
              src={screenshotURL}
              width={400}
              height={400}
              alt="Picture of the author"
            />
            <a
              className="w-fit text-md px-4 py-2 text-[#0F1A20] bg-[#7FB069] rounded-md"
              href={screenshotURL}
              download="screenshot.png"
            >
              Download image
            </a>
            <p
              className="w-fit text-md px-4 py-2 text-[#0F1A20] bg-[#7FB069] rounded-md"
              onClick={() => SetScreenshotUrl()}
            >
              Close
            </p>
          </>
        ) : (
          <p onClick={saveScreenshot}>Take a photo!</p>
        )}
      </div>

      <Canvas
        ref={canvasRef}
        gl={{ preserveDrawingBuffer: true }}
        shadows="soft"
        className="canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'hsl(37, 79%, 84%)',
        }}
      >
        <Suspense fallback={null}>
          {loader ? (
            <Html>
              <p>Loading...</p>
            </Html>
          ) : (
            <>
              <Lights />
              <SkyLight />
              <Computernew
                rotation={[-0.03, 0.2, 0]}
                scale={4.7}
                position={[-0.65, -0.75, -0.07]}
                planeYesNo={false}
              />
              <Room
                trackData={trackData}
                artistData={artistData}
                dominantColor={domcolors}
                isplaying={isPlaying}
                
              />
            </>
          )}
          <OrbitControls />
          {/* 
          <gridHelper args={[10, 10, `white`, `gray`]} />
          <Stats />
           */}
        </Suspense>
      </Canvas>

      <div className="z-31">
        <SpotiPlayerComp
          loader={loader}
          accessToken={accessToken}
          favoriteTrackIDs={favoriteTrackIDs}
          onPlaybackStatusChange={onPlaybackStatusChange}
        />
      </div>
    </>
  )
}

function manageImages(images) {
  //Add all listened to genres to array
  let imagesInstances = []
  for (let items of images) {
    imagesInstances.push(items.album.images[0].url)
  }
  //Count how much each date occurs in the array and sort it
  const occurrences = []
  imagesInstances.forEach((image) => {
    const foundImage = occurrences.find((item) => item.image === image)
    if (foundImage) {
      foundImage.count++
    } else {
      occurrences.push({ image, count: 1 })
    }
  })

  const sortedOccurrences = occurrences.sort((a, b) => b.count - a.count)

  return sortedOccurrences
}

async function expressDominantColor(imageLink) {
  //Encode imagelink so it can be send through as parm
  const encodedUrl = encodeURIComponent(imageLink)
  const res = await fetch(`${fetchURL}/dominantcolor/${encodedUrl}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
