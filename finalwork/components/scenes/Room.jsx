import React, { useState, useEffect } from 'react'
import { ModelDesk } from '@/components/models/RoomDeskNew'
import { Html } from '@react-three/drei'

export function Room({ trackData, artistData, dominantColor, googleImgs }) {
  //Here we generate the room - we gather the data, and send it to the 3D model afterwards.
  const [genres, setGenres] = useState([])
  const [eraData, setEraData] = useState([])
  const [domcolors, setDomColors] = useState([dominantColor])
  const [loader, isLoading] = useState(true);
  //http://localhost:3001
  //https://finalwork-26j6.onrender.com/
  let fetchURL = 'https://finalwork-26j6.onrender.com'

  useEffect(() => {
    async function fetchData() {
      // Then we are going to do genres.
      console.log('ROOMDATA!!!', artistData.items)
      const genresData = await manageGenres(artistData.items)
      setGenres(genresData)
      const trackEras = await manageEras(trackData.items)
      setEraData(trackEras)
    }

    fetchData()
    isLoading(false)
  }, [artistData, trackData])

  async function manageGenres(genres) {
    //Add all listened to genres to array
    let genresInstances = []
    for (let items of genres) {
      for (let genreItem of items.genres) {
        genresInstances.push(genreItem)
      }
    }
    //Count how much each genre occurs in the array and sort it
    const occurrences = []
    genresInstances.forEach((genre) => {
      const foundGenre = occurrences.find((item) => item.genre === genre)
      if (foundGenre) {
        foundGenre.count++
      } else {
        occurrences.push({ genre, count: 1 })
      }
    })
    const sortedOccurrences = occurrences.sort((a, b) => b.count - a.count)
    sortedOccurrences.forEach((item) => {})
    return sortedOccurrences
  }

  async function manageEras(trackdata) {
    //Add all listened to eras to array
    let erasInstances = []
    for (let items of trackdata) {
      //I only need the years, so will save these and put them in the array
      let date = new Date(items.album.release_date)
      erasInstances.push(date.getFullYear())
    }

    //Count how much each date occurs in the array and sort it
    const occurrences = []
    erasInstances.forEach((era) => {
      const foundEra = occurrences.find((item) => item.era === era)
      if (foundEra) {
        foundEra.count++
      } else {
        occurrences.push({ era, count: 1 })
      }
    })
    const sortedOccurrences = occurrences.sort((a, b) => b.count - a.count)
    sortedOccurrences.forEach((item) => {})
    return sortedOccurrences
  }

  async function createGenreImage(genre) {
    try {
      const res = await fetch(`${fetchURL}/generateImage/${genre[0].genre}`)
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      return res.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  /*
async function scrapeImages() {
  //Encode imagelink so it can be send through as parm
  console.log('scraping images')
  //console.log(genre)
  const res = await fetch(`${fetchURL}/scrape-images`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
*/
  return (
    <>
      <group>
        {loader ? (
          <Html>
            <p>Loading...</p>
          </Html>
        ) : (
          <ModelDesk
            imageData={manageImages(trackData.items)}
            genreData={genres}
            dominantColor={domcolors}
            eraData={eraData}
            trackData={trackData.items}
          />
        )}
      </group>
    </>
  )
}

function manageImages(images) {
  let imagesInstances = []
  for (let item of images) {
    imagesInstances.push({
      url: item.album.images[0].url,
      id: item.id,
      trackname: item.name,
      artistname: item.artists[0].name,
    })
  }
  return imagesInstances
}
