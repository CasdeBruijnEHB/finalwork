"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default async function SpotifyResultPage() {
  fetch("http://localhost:3001/testPoint")
    .then((res) => res.json())
    .then((json) => console.log(json));

  return (
    <>
      <div>Spotify Result page!</div>
    </>
  );
}
