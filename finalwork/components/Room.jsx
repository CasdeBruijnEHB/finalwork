

export function Room(...props){
    console.log("generating room!")
    //console.log(props)
    const trackdata= props[0]; //Get dates and images here - items[].album.release_date & items[].album.images[]
    const artistdata=props[1]; //Get Genres out here - items[].genres[]
    //console.log(trackdata)
    //console.log(artistdata)
    manageEra(props[0].items)
    manageGenres(props[1].items)
    manageImages(props[0].items)
    return(<>
    
    
    
    </>)
}


function manageGenres(genres){
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
    sortedOccurrences.forEach((item) => {
    //console.log(`${item.image}: ${item.count}`);
    });

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