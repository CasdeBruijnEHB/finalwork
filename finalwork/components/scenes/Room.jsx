import React, { useState, useEffect } from 'react'
import { ModelDesk } from '@/components/models/RoomDeskNew'
import { Html} from '@react-three/drei'


export function Room({ trackData, artistData, dominantColor }) {

  //Here we generate the room - we gather the data, and send it to the 3D model afterwards.
  const [genres, setGenres] = useState([])
  const [eraData,setEraData]=useState([]);
  const [domcolors, setDomColors] = useState([dominantColor])
  const [loader, isLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      // First we are getting the imagedata out.
      // We are letting imagedata as it is cause it works rn

      // Then we are going to do genres.
      const genresData = await manageGenres(artistData.items)
      setGenres(genresData)
      const trackEras= await manageEras(trackData.items)
      setEraData(trackEras);
    }

    fetchData()
    isLoading(false);
  }, [artistData, trackData])

  async function manageGenres(genres) {
    console.log('managing genres!')
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
    sortedOccurrences.forEach((item) => {
      //console.log(`${item.genre}: ${item.count}`);
    })
    return sortedOccurrences
  }

  async function manageEras(trackdata){
    console.log("managing eras...")
    console.log(trackdata)
     //Add all listened to eras to array
    let erasInstances = []
    for (let items of trackdata) {
      //I only need the years, so will save these and put them in the array
      let date= new Date(items.album.release_date);
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
    sortedOccurrences.forEach((item) => {
      //console.log(`${item.era}: ${item.count}`);
    })
    return sortedOccurrences
  }

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
  //console.log('managing images!')
  //Add all listened to genres to array
  /*
  let imagesInstances = []
  for (let items of images) {
    imagesInstances.push(items.album.images[0].url)
  }
  //Count how much each date occurs in the array and sort it
  const occurrences = []
  imagesInstances.forEach((image) => {
    const foundImage = occurrences.find((item) => item.image === image)
    if (foundImage) {
      foundImage.count++
    } else {
      occurrences.push({ image, count: 1 })
    }
  })

  const sortedOccurrences = occurrences.sort((a, b) => b.count - a.count)
    sortedOccurrences.forEach((item) => {
    console.log(`${item.image}: ${item.count}`);
    });
    */
  let imagesInstances = [];
 // console.log("TOT IMAGES:",images);
  for (let item of images) {
    imagesInstances.push({
      url: item.album.images[0].url,
      id: item.id,
      trackname: item.name,
      artistname: item.artists[0].name
    });
  }
  console.log("new IMAGES", imagesInstances)
  return imagesInstances
}


