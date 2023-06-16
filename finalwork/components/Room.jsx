import ColorThief from 'colorthief';
import Image from 'next/image';
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree, extend, useLoader  } from "@react-three/fiber";
import { Suspense } from "react";
import { Stats, OrbitControls, Lightformer, useCursor } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//import { RoomNew } from "@/components/Room60s70s_v6";
import { Roomtwo } from "@/components/Roomtwo";


export function Room({ trackData, artistData }){
    console.log("generating room!")
    //console.log(props)
    const trackdata= trackData; //Get dates and images here - items[].album.release_date & items[].album.images[]
    const artistdata=artistData; //Get Genres out here - items[].genres[]
    //console.log(trackdata)
    //console.log(artistdata)
    manageEra(trackData.items)
    //manageGenres(artistData.items)
    //let managedImages= manageImages(trackData.items)
    

    //Import scene
     


    return(<>
         <group>
             <Roomtwo imageData={manageImages(trackData.items)} genreData={manageGenres(artistData.items)}/>
            </group>
           
    
    </>)
}


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
   let dominantColors= getDominantColors(sortedOccurrences);
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

async function getDominantColors(images){
    let dominantColors=[];
    images.forEach(async(item) => {
        const imageUrl = item.image;
        await expressDominantColor(imageUrl);
    });

    return ""
}


async function expressDominantColor(imageLink) {
    //Encode imagelink so it can be send through as parm
    const encodedUrl= encodeURIComponent(imageLink)
    const res = await fetch(`http://localhost:3001/dominantcolor/${encodedUrl}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

