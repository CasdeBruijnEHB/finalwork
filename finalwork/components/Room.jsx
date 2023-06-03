

export function Room(...props){
    console.log("generating room!")
    //console.log(props)
    const trackdata= props[0]; //Get dates and images here - items[].album.release_date & items[].album.images[]
    const artistdata=props[1]; //Get Genres out here - items[].genres[]
    //console.log(trackdata)
    //console.log(artistdata)
    manageGenres(props[1].items)
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
    console.log(`${item.genre}: ${item.count}`);
    });
    

}

function manageImages(images){

}

function manageEra(dates){

}