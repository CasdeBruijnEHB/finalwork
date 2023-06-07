"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Room } from "@/components/Room";

import {
  Stats,
  OrbitControls,
  Lightformer,
  useCursor,
} from "@react-three/drei";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader,
} from "@react-three/fiber";
import React, { useRef } from "react";
import { Suspense } from "react";

export default async function SpotifyResultPage() {
  console.log("resultpage");
  /*
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("useffect!");
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/data");
        const json = await response.json();
        console.log("try fetch!");
        console.log(json);
        setData(json);
      } catch (error) {
        console.log("cant fetch");
        console.error(error);
      }
    };
    fetchData();
  }, []);
  */

  const trackData = await getTrackData();
  const artistData = await getArtistData();
  const getimages = await scrapeImages();
  console.log(getimages);
  //console.log(trackData);

  return (
    <>
      <div className="scene">
        <Canvas shadows className="canvas">
          <color attach="background" args={["#151520"]} />
          <hemisphereLight intensity={0.5} />
          <directionalLight position={[0, 2, 5]} castShadow intensity={1} />

          <Suspense fallback={null}>
            <ambientLight color={"white"} intensity={0.5} />

            <gridHelper args={[10, 10, `white`, `gray`]} />
            <Room trackData={trackData} artistData={artistData} />
            <OrbitControls />
            <Stats />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

async function getTrackData() {
  const res = await fetch("http://localhost:3001/trackData");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getArtistData() {
  const res = await fetch("http://localhost:3001/artistData");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function createGenreImage(genre: any) {
  //Encode imagelink so it can be send through as parm
  console.log("create genre image...");
  //console.log(genre)
  const res = await fetch(`http://localhost:3001/generateImage/${genre}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function scrapeImages() {
  //Encode imagelink so it can be send through as parm
  console.log("scraping images");
  //console.log(genre)
  const res = await fetch(`http://localhost:3001/scrape-images`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
