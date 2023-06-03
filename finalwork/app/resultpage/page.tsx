"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Room } from "@/components/Room";

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
  console.log(trackData);
  Room(trackData, artistData);
  return (
    <>
      <div>Spotify Result page!</div>
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
