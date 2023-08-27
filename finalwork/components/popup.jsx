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
            <p>
              Your musical journey has led you through a variety of eras, each
              with its own distinctive sound and cultural significance. From the
              nostalgic charm of the{' '}
              <span className="font-semibold">{data[0].era}</span> to the
              rebellious energy of the{' '}
              <span className="font-semibold">{data[1].era}</span>, you&apos;ve
              embraced the diverse flavors of music history.
              <br />
              <br />
              Each era you hold dear has left its imprint shaping your musical
              identity and enriching your experiences. Whether you&apos;re grooving
              to the tunes of the{' '}
              <span className="font-semibold">{data[1].era}</span> or getting
              lost in the sounds of the{' '}
              <span className="font-semibold">{data[2].era}</span>, your love
              for these eras is a testament to your appreciation for the
              timeless magic of music. <br />
              <br />
              But you continue to explore new eras and generations of music. You
              don&apos;t stick to what you know but keep discovering. Some might be
              your favorite, but this didn&apos;t hold you back listening to sounds
              from <span className="font-semibold">{data[2].era}</span> or{' '}
              <span className="font-semibold">{data[0].era}</span>.
            </p>
          </>,
        )
        break
      case 'track':
        setTextState(
          <>
            <p>
              You&apos;re certainly a big music lover, and your taste in music
              is truly unique. Among your favorites, there are some tracks that
              you hold closer to your heart than any others. Let&apos;s dive
              into your top picks!
              <br />
              <br /> First off,{' '}
              <span className="font-semibold"> {data[0].trackname} </span> by
              <span className="font-semibold"> {data[0].artistname} </span> is
              undeniably your favorite. The melodies and rhythms of this track
              resonate with you on a deep level, making it a go-to choice
              whenever you need a musical pick-me-up. As we move through your
              list, we find that{' '}
              <span className="font-semibold"> {data[1].trackname} </span> by
              <span className="font-semibold"> {data[1].artistname} </span> and
              <span className="font-semibold"> {data[2].trackname} </span> by
              <span className="font-semibold"> {data[2].artistname} </span>
              also have a special place in your heart since you play them so
              often.
              <br />
              <br />
              Next to{' '}
              <span className="font-semibold"> {data[1].artistname} </span>,
              <span className="font-semibold"> {data[3].artistname} </span> also
              seems to be one of your favorite artists. You can&apos;t to seem
              to get enough of their song{' '}
              <span className="font-semibold"> {data[3].trackname} </span>. Same
              goes for
              <span className="font-semibold">
                {' '}
                {data[4].trackname}{' '}
              </span>by{' '}
              <span className="font-semibold"> {data[4].artistname} </span>
              another track that you keep on loop.
              <br />
              <br />
              Lastly,{' '}
              <span className="font-semibold">
                {' '}
                {data[5].trackname}{' '}
              </span> by{' '}
              <span className="font-semibold"> {data[5].artistname} </span> is
              another one of your favorite tracks at the moment. Why don&apos;t
              you click on the player below and enjoy these tracks one more
              time?
            </p>
          </>,
        )
        break
      case 'genre':
        setTextState(
          <>
            <p>
              I can already tell I wouldn&apos;t regret the decision of handing you
              the aux at a party. You have a broad musical taste and can enjoy
              <span className="font-semibold"> {data[1].genre} </span> to{' '}
              <span className="font-semibold"> {data[2].genre} </span> to
              <span className="font-semibold"> {data[3].genre} </span>. <br />
              <br /> But one genre undeniably tops them all and takes the spot
              as your favorite... Ofcourse it is{' '}
              <span className="font-semibold"> {data[0].genre} </span>. You can
              listen to it day and night. But you also feel the need to switch
              it up from time to time! But that&apos;s no issue for you as you
              switch from{' '}
              <span className="font-semibold"> {data[1].genre} </span>
              to <span className="font-semibold"> {data[4].genre} </span> and
              back to <span className="font-semibold"> {data[5].genre} </span>{' '}
              without any issue.
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
        <div className=" absolute drop-shadow-lg text-md bg-[#7FB069] text-[#0F1A20]  mt-[2%] right-[5%] flex rounded-xl top-5 pl-10 pt-2.5 pb-2.5 pr-10 justify-between w-[35%]">
          {textState}
        </div>
      </Html>
    </>
  )
}
