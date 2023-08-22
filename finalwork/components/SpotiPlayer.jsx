import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function SpotiPlayerComp({ loader, accessToken, favoriteTrackIDs, onPlaybackStatusChange }) {
  //This is the Spotify player that allows to play music. Has to be in seperate comp to avoid issues with canvas.
  return (
    <>
        <div className="absolute bottom-0 w-full bg-black p-4">
        {loader ? (
            <p>Loading...</p> 
        ) : (
            <SpotifyPlayer
            token={accessToken}
            uris={favoriteTrackIDs}
            callback={onPlaybackStatusChange}
            />
        )}
        </div>
    </>
  );
}