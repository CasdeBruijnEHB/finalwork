'use client'
import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'

export default function ResultpageTwo() {
  console.log('Res nieuw')
  console.log('resultpage')
  const [isPlaying, setIsPlaying] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [trackData, setTrackData] = useState({})
  const [artistData, setArtistData] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('fetching data...')
        const response = await fetch('http://localhost:3001/getaccess')
        const data = await response.text()
        setAccessToken(data)
        console.log('access code: ', data)

        const trackDataResponse = await getTrackData()
        setTrackData(trackDataResponse)
        console.log('track data: ', trackDataResponse)

        const artistDataResponse = await getArtistData()
        setArtistData(artistDataResponse)
        console.log('artist data: ', artistDataResponse)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <main>
        <p>nieuwe respage!</p>
      </main>
    </>
  )
}
