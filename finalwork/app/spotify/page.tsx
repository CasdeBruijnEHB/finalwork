"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";

export default async function Spotify() {
  //const user = await fetch("http://localhost:3001/login");
  console.log("Spotify page!");
  const [fetchUrl, setFetchUrl] = useState("http://localhost:3001");

  const handleButtonclick = () => {
    console.log("Button click!");
    window.location.href = `${fetchUrl}/login`;
  };

  return (
    <>
      <main>
        <div className=" bg-[#7FB069] absolute w-screen h-screen m-0 top-0 left-0">
          <div className=" mt-2 bg-[#0F1A20] mx-auto w-11/12 h-[95%] rounded-2xl   text-white">
            <Navbar color="dark" />
            <div className="p-10 text-[#7FB069]">
              <p className="p-1 pb-3">&gt; Connect to spotify page!</p>
              <p className="p-1 pb-3">
                &gt; Do you want to connect your own Spotify or want to generate
                a room based on an existing playlist?
              </p>
              <button
                className=" w-fit text-lg ml-[1%] px-4 py-2 font-bold  text-[#0F1A20] bg-[#7FB069] rounded-md "
                onClick={handleButtonclick}
              >
                Connect to Spotify
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
