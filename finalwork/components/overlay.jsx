import React from 'react'
import Image from 'next/image'
import img from '@/assets/logo/pom_groen.png'

export function Overlay() {
  return (
    <>
      <div className="bg-transparant absolute z-30 m-4">
        <nav className=" flex w-screen items-center">
          <Image src={img} width={80} height={80} alt="Picture of the author" />
          <div className="w-full flex justify-center text-center align-text-bottom text-white	">
            <p className="ml-2 mr-2 ">Home</p>
            <p className="ml-2 mr-2 ">About</p>
            <p className="ml-2 mr-2 ">Contact</p>
          </div>
        </nav>
      </div>
    </>
  )
}
