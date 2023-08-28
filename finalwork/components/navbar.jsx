import Image from 'next/image'
import logoGroen from '@/assets/logo/pom_groen.png'
import logoWit from '@/assets/logo/POM_wit.png'
import classNames from 'classnames'
import Link from 'next/link'
import { useState } from 'react'

export function Navbar({ color = 'light' }) {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

  const handleAboutClick = () => {
    setIsAboutOpen(!isAboutOpen)
  }
  const handlePrivacyClick = () => {
    setIsPrivacyOpen(!isPrivacyOpen)
  }

  let colorstyling = classNames({
    'drop-shadow-lg text-sm text-center bg-white text-[#7FB069] flex rounded-xl pl-10 pt-1.5 pb-1.5 pr-10 justify-between w-2/5':
      color == 'light',
    'drop-shadow-lg text-sm text-center bg-[#7FB069] text-[#0F1A20] flex rounded-xl pl-10 pt-1.5 pb-1.5 pr-10 justify-between w-2/5':
      color == 'dark',
  })

  return (
    <>
      <nav className="font-bold">
        <div className="flex  text-center justify-center p-3 ">
          <div className={colorstyling}>
            <Link className={'flex items-center'} href={'/'}>
              Home
            </Link>
            <p className={'flex items-center'} onClick={handleAboutClick}>
              About
            </p>
            <Image
              src={color === 'light' ? logoGroen : logoWit}
              width={30}
              height={30}
              alt="Pom Logo"
              className="flex items-center"
            />
            <p className={'flex items-center'} onClick={handlePrivacyClick}>
              Privacy
            </p>
            <Link
              className={'flex items-center'}
              href={'mailto:cas.de.bruijn@student.ehb.be'}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
      {isAboutOpen && (
        <div className="flex justify-center h-screen">
          <div className="rounded-xl absolute z-20 bg-[#445e38be] text-white w-6/12 p-4">
            {/* Content for the About popup */}
            <div className="flex justify-between">
              <h1 className="font-bold pb-4 text-lg">About Pieces Of Me</h1>
              <button
                className="text-[#445e38be] w-fit text-sm ml-[5%] px-4 py-2 font-semibold font-sans bg-white rounded-md"
                onClick={handleAboutClick}
              >
                Go back
              </button>
            </div>
            <div className="font-sans text-align p-2">
              <p className="pb-1">Welcome to Pieces Of Me!</p>
              <p className="pb-1">
                At Pieces Of Me, we believe that music has the power to
                transform our environment and elevate our listening experience.
                We understand that listening to music at home can sometimes feel
                static and disconnected from the emotions that music can evoke.
                That&apos;s why we&apos;ve created a unique platform that brings
                your favorite music to life in a whole new way.
              </p>
              <p className="pb-1">
                Imagine stepping into a personalized 3D room that reflects the
                essence of your favorite tracks and albums. With our innovative
                technology, we integrate seamlessly with your Spotify account,
                analyzing your music library to curate a truly immersive
                experience. Every beat, every note, and every lyric becomes
                tangible, surrounding you in a visually stunning and interactive
                environment.
              </p>
              <p className="pb-1">
                Our goal is to bridge the gap between music and space, enabling
                you to not just listen to your favorite songs but to live and
                breathe them. Each room we create is meticulously crafted to
                represent the emotions, energy, and aesthetics of your music.
                Whether you&apos;re a fan of energetic rock anthems, soulful
                ballads, or vibrant electronic beats, we have the perfect room
                waiting for you.
              </p>
              <p className="pb-1">
                Through our platform, you&apos;ll be able to explore your music
                in a whole new dimension. Wander through the intricately
                designed spaces, interact with elements that respond to the
                rhythm of the songs, and unlock hidden surprises along the way.
                Immerse yourself in a captivating blend of audio and visual
                sensations that will transport you to the heart of your music.
              </p>
              <p className="pb-1">
                Start exploring, start feeling, start living your music with
                Pieces Of Me.
              </p>
            </div>
          </div>
        </div>
      )}

      {isPrivacyOpen && (
        <div className="flex justify-center h-screen">
          <div className="rounded-xl absolute z-20 bg-[#445e38be] text-white w-6/12 p-4">
            {/* Content for the About popup */}
            <div className="flex justify-between">
              <h1 className="font-bold pb-4 text-lg">Privacy</h1>
              <button
                className="text-[#445e38be] w-fit text-sm ml-[5%] px-4 py-2 font-semibold font-sans bg-white rounded-md"
                onClick={handlePrivacyClick}
              >
                Go back
              </button>
            </div>
            <div className="font-sans text-align p-2">
              <h1 className="font-semibold pb-b1">Privacy statement</h1>
              <div className="pb-1">
                <h3 className="font-semibold pb-b1">
                  Pieces Of Me: Generating 3D Meshes Using Spotify Data
                </h3>
                <p>
                  At Pieces Of Me, we are committed to protecting your privacy
                  and ensuring the security of your personal data. This Privacy
                  Statement outlines how we collect, use, and handle the data
                  gathered when you connect your Spotify account to our website
                  to generate 3D meshes.
                </p>
              </div>
              <div className="pb-1">
                <h3 className="font-semibold pb-b1">
                  Data Collection and Usage
                </h3>
                <p>
                  When you log in and connect your Spotify account to Pieces Of
                  Me, we collect and use the following data:
                </p>
                <ul>
                  <li>
                    Top Streaming Data: We retrieve information about your top
                    streamed tracks and artists from your Spotify account. This
                    data is used solely for generating personalized 3D meshes
                    based on your musical preferences.
                  </li>
                  <li>
                    Email Address: We access your email address from your
                    Spotify account for user authentication and identification
                    purposes. We do not share or use your email address for any
                    other purpose.
                  </li>
                  <li>
                    Right to Modify Spotify App: We request the right to modify
                    your Spotify app for the sole purpose of allowing you to
                    play and listen to music directly within the browser
                    environment. This ensures that you can enjoy the generated
                    3D environment while experiencing your music in real time.
                  </li>
                </ul>
              </div>
              <div className="pb-1">
                <h3 className="font-semibold pb-b1">
                  Data Security and Retention
                </h3>
                <p>
                  We prioritize the security of your data. All the data we
                  collect, including your top streaming data and email address,
                  is used exclusively for the duration of your session on the
                  website. Once you log out or your session ends, this data is
                  immediately discarded and not stored or retained in any way.
                </p>
              </div>
              <div className="pb-1">
                <h3 className="font-semibold pb-b1">
                  Your Control and Consent
                </h3>
                <p>
                  Your privacy matters to us. We seek your consent to access and
                  use the specific data required to create the personalized 3D
                  meshes. By connecting your Spotify account and using our
                  website, you agree to the collection and usage of this data as
                  outlined in this Privacy Statement.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
