import React, { useState, useEffect } from 'react'
import { ModelDesk } from '@/components/models/RoomDeskNew'
import { Html } from '@react-three/drei'

export function Popup({ type, data }) {
  const [textState, setTextState] = useState()

  useEffect(() => {
    switch (type) {
      case 'era':
        setTextState(
          <>
            <p>Your favorite years or music defintely are the {data[0].era}</p>
          </>,
        )
        break
      case 'track':
        setTextState(
          <>
            <p>
              You&apos;re a real music lover, but some tracks defintely have
              been your favorite. Particularly {data[0].trackname} by{' '}
              {data[0].artistname} and {data[1].trackname} by{' '}
              {data[1].artistname}. Next to that you also enjoy{' '}
              {data[3].trackname} by {data[3].artistname} a lot,
              {data[4].trackname} by {data[4].artistname} is one of your
              favorites too. But {data[5].trackname} by {data[5].artistname}
              can&apos;t miss from the playlist either!
            </p>
          </>,
        )
        break
      case 'genre':
        setTextState(
          <>
            <p>
              You&apos;re someone that enjoys multiple genres, but some get
              played more often than others.
              {data[0].genre} has been you most listened to genre of the year.
              Next to that, you listen to some {data[1].genre}
              and {data[2].genre}. But you also enjoy {data[3].genre} and{' '}
              {data[4].genre} from time to time!
            </p>
          </>,
        )
        break
      default:
        break
    }
  }, [type, data])

  return (
    <>
      <Html fullscreen>
        <div className="drop-shadow-lg text-md bg-[#7FB069] text-[#0F1A20]  mt-[3%] ml-[3%] flex rounded-xl top-5 pl-10 pt-2.5 pb-2.5 pr-10 justify-between w-[30%]">
          {textState}
        </div>
      </Html>
    </>
  )
}
