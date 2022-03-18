import React, { useEffect } from 'react';
import SearchBar from '../searchbar/SearchBar';
import MediaPlayer from '../mediaPlayer/MediaPlayer';
import { useSession } from 'next-auth/react';
import spotifyApi from '../../../lib/spotify';

function UserFavorites() {

    return (
        <div className="content relative basis-full lg:basis-10/12 m-6">
            <SearchBar/>
                <p className='font-sans text-4xl font-semibold my-8 pt-5 pb-2 p-10'>Mes morceaux favoris</p>
                <div className=''>
                    <p>Coucou</p>
                </div>
            <MediaPlayer />
        </div>
    )
}

export default UserFavorites;