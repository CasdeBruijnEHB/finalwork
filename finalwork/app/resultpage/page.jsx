"use client";
import { useEffect, useState } from "react";
import { Room } from "@/components/Room";
import {
  Stats,
  OrbitControls,
  Lightformer,
  useCursor,
  Html,
} from "@react-three/drei";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader,
} from "@react-three/fiber";
import React, { useRef } from "react";
import { Suspense } from "react";
import * as THREE from "three";
import SpotifyPlayer from "react-spotify-web-playback";
import SpotiPlayerComp  from "@/components/SpotiPlayer";
 

let fetchURL = "http://localhost:3001";
//https://finalwork-26j6.onrender.com

export default function SpotifyResultPage() {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [trackData, setTrackData] = useState({});
  const [artistData, setArtistData] = useState({});
  const [loader, isLoading]=useState(true);
  //This has to be a string since it has to be sent to the spotify API
  const [favoriteTrackIDs,setFavoriteTrackIDs]=useState([])



   useEffect(() => {
            async function fetchData() {
            try {
            console.log("fetching data...");
            const response = await fetch("http://localhost:3001/getaccess");
            const data = await response.text();
            setAccessToken(data);
            console.log("access code: ", data);

             await fetch(`${fetchURL}/trackData`)
              .then(result=>result.json())
              .then(data=>{
                let favoritesArr=[];
                console.log("trackdata...:", data)
                  setTrackData(data)
                  console.log(data.items)
                  
                  for(let item of data.items){
                    console.log(item)
                    favoritesArr.push(`spotify:track:${item.id}`)
                  }
                  setFavoriteTrackIDs(favoritesArr)
              })    

            //const trackDataResponse = await getTrackData();
            //setTrackData(trackDataResponse);
            //console.log("track dataaa: ", trackData.items);
           // for(let item of trackData.items){
            //  console.log(item)
           // }
            /*
            for (let item of trackData.items){
              console.log("item:", item)
              console.log("id: ",item.id)
                favoriteTrackIDs.push(item.id)
            }
            console.log("array: ", favoriteTrackIDs)
            */

            const artistDataResponse = await getArtistData();
            setArtistData(artistDataResponse);
            console.log("artist data: ", artistDataResponse);
            isLoading(false);
            } catch (error) {
            console.error("Error:", error);
            isLoading(false);
            }
        }
        fetchData();
  }, []);
  console.log("favorite ids: ",favoriteTrackIDs)

const onPlaybackStatusChange = (status) => {
  setIsPlaying(status.isPlaying);
};

  async function getTrackData() {
    const res = await fetch(`${fetchURL}/trackData`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  async function getArtistData() {
    const res = await fetch(`${fetchURL}/artistData`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  function SkyLight() {
    const { scene } = useThree();

    // Create the skydome light
    const skyColor = new THREE.Color().setHSL(94.251, 0.578, 0.559);
    scene.background = skyColor;

    return null;
  }


  return (
    <>
      <div className="scene">
        <Canvas shadows className="canvas">
          <color attach="background" args={["#151520"]} />
          <hemisphereLight intensity={0.5} />
          <directionalLight position={[0, 2, 5]} castShadow intensity={1} />
          <SkyLight />
          <Suspense fallback={null}>
            <ambientLight color={"white"} intensity={0.5} />
           
           {loader ? (
            <Html>
              <p>Loading...</p>
              </Html>
            ) : (
              <Room trackData={trackData} artistData={artistData} />
            )}
           
            <gridHelper args={[10, 10, `white`, `gray`]} />

            <OrbitControls />
            <Stats />
          </Suspense>
      </Canvas>
      </div>
         <SpotiPlayerComp
        loader={loader}
        accessToken={accessToken}
        favoriteTrackIDs={favoriteTrackIDs}
        onPlaybackStatusChange={onPlaybackStatusChange}
      />
     
    </>
  );
}

async function createGenreImage(genre) {
  try {
    console.log("create genre image...");
    //console.log(genre)
    const res = await fetch(`${fetchURL}/generateImage/${genre}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}


async function scrapeImages() {
  //Encode imagelink so it can be send through as parm
  console.log("scraping images");
  //console.log(genre)
  const res = await fetch(`${fetchURL}/scrape-images`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
