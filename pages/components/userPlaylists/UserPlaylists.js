import React from 'react';
import SearchBar from './../searchbar/SearchBar';
import MediaPlayer from './../mediaPlayer/MediaPlayer';

function UserPlaylists() {

  return (
    <div className="content relative basis-full lg:basis-10/12 m-6">
        <SearchBar/>
            <p className='font-sans text-4xl font-semibold my-8 pt-5 pb-2 p-10'>Mes playlists</p>
        <MediaPlayer />
    </div>
  )
}

export default UserPlaylists;