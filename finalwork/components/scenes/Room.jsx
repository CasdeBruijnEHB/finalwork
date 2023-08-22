import React,{ useState, useEffect } from 'react'
import { Model60s } from "@/components/models/V6_newRoom";


export function Room({ trackData, artistData }){
    //const trackdata= trackData; //Get dates and images here - items[].album.release_date & items[].album.images[]
    //const artistdata=artistData; //Get Genres out here - items[].genres[]
   // let managedImages= manageImages(trackData.items)

    //Here we generate the room - we gather the data, and send it to the 3D model afterwards.
    const [genres,setGenres]=useState([]);
    const [domcolors,setDomColors]=useState([]);

    

   useEffect(() => {
    async function fetchData() {
        // First we are getting the imagedata out.
        // We are letting imagedata as it is cause it works rn

        // Then we are going to do genres.
        const genresData = await manageGenres(artistData.items);
        setGenres(genresData);

        // Getting dominant color now...
        const dominantColorsData = await getDominantColors(manageImages(trackData.items));
        setDomColors(dominantColorsData);

        console.log("useEffect values: domcolors ", dominantColorsData, " and genres: ", genresData);
    }

    fetchData();
}, []);
   
    async function manageGenres(genres){
        console.log("managing genres!")
        //Add all listened to genres to array
        let genresInstances=[];
        for(let items of genres){
            for (let genreItem of items.genres){
                genresInstances.push(genreItem);
            }
        }
        //Count how much each genre occurs in the array and sort it 
        const occurrences = [];
        genresInstances.forEach((genre) => {
        const foundGenre = occurrences.find((item) => item.genre === genre);
        if (foundGenre) {
            foundGenre.count++;
        } else {
            occurrences.push({ genre, count: 1 });
        }
        });
        const sortedOccurrences = occurrences.sort((a, b) => b.count - a.count);
        sortedOccurrences.forEach((item) => {
        //console.log(`${item.genre}: ${item.count}`);
        });
        return sortedOccurrences;
    }

    async function getDominantColors(images){
   
   const dominantColors = await Promise.all(
    images.map(async (item) => {
      const imageUrl = item.image;
      const colors = await expressDominantColor(imageUrl);
      return colors.color;
    })
  );

  //console.log('dominant color...');
  //console.log(dominantColors);

  return dominantColors;
}

    return(<>
         <group>
             
         <Model60s imageData={manageImages(trackData.items)} genreData={genres} 
             dominantColor={domcolors} 
            scale={[20,20,20]}/>
            </group>
    </>)
}




function manageImages(images){
    console.log("managing images!")
    //Add all listened to genres to array
    let imagesInstances=[];
    for(let items of images){
        
            imagesInstances.push(items.album.images[0].url);
        
    }
     //Count how much each date occurs in the array and sort it 
    const occurrences = [];
    imagesInstances.forEach((image) => {
    const foundImage = occurrences.find((item) => item.image === image);
    if (foundImage) {
        foundImage.count++;
    } else {
        occurrences.push({ image, count: 1 });
    }
    });
    
    const sortedOccurrences = occurrences.sort((a, b) => b.count - a.count);
    /*
    sortedOccurrences.forEach((item) => {
    console.log(`${item.image}: ${item.count}`);
    });
    */
    return sortedOccurrences;
}

function manageEra(dates){
    console.log("managing dates!")
    //Add all listened to genres to array
    let datesInstances=[];
    for(let items of dates){
            datesInstances.push(items.album.release_date.slice(0,4));
    }

    //Count how much each date occurs in the array and sort it 
    const occurrences = [];
    datesInstances.forEach((date) => {
    const foundDate = occurrences.find((item) => item.date === date);
    if (foundDate) {
        foundDate.count++;
    } else {
        occurrences.push({ date, count: 1 });
    }
    });
    const sortedOccurrences = occurrences.sort((a, b) => b.count - a.count);
    sortedOccurrences.forEach((item) => {
    //console.log(`${item.date}: ${item.count}`);
    });
    
}




async function expressDominantColor(imageLink) {
    //Encode imagelink so it can be send through as parm
    const encodedUrl= encodeURIComponent(imageLink)
    const res = await fetch(`http://127.0.0.1:3001/dominantcolor/${encodedUrl}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

