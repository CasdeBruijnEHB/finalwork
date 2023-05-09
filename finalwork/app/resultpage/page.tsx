"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default async function SpotifyResultPage() {
  console.log("resultpage");
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/data");
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>Spotify Result page!</div>
    </>
  );
}
