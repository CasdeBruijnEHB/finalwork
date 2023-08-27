'use client'
import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { TypingEffect } from '@/components/typewriter'
import React from 'react'

export default async function Spotify() {
  const [fetchUrl, setFetchUrl] = useState('http://localhost:3001')

  const handleButtonclick = () => {
    window.location.href = `${fetchUrl}/login`
  }

  const intro = '&gt; Welcome to Pieces Of Me.<br /> <br />'
  const textpart1 =
    '&gt; Pieces of Me uses Spotify to generate the 3D environment based on your musical preferences.<br /> <br />'
  const textpart2 =
    '&gt; The data we collect will not be stored anywhere, and will solely be used to generate the room.<br /><br />'
  const outro = '&gt; Are you ready to start? <br /><br />'
  return (
    <>
      <main>
        <div className=" bg-[#7FB069] absolute w-screen h-screen m-0 top-0 left-0">
          <div className=" mt-2 bg-[#0F1A20] mx-auto w-11/12 h-[95%] rounded-2xl   text-white">
            <Navbar color="dark" />
            <div className="p-10 pt-20 text-lg pb-20 text-[#7FB069]">
              <TypingEffect
                intro={intro}
                textpart1={textpart1}
                textpart2={textpart2}
                outro={outro}
              />

              <div className="w-full h-full">
                <button
                  className="bottom-[40%] absolute flex justify-center items-center w-fit text-lg ml-[1%] px-4 py-2 font-bold  text-[#0F1A20] bg-[#7FB069] rounded-md "
                  onClick={handleButtonclick}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
