import React, { useEffect } from 'react';
import SearchBar from '../searchbar/SearchBar';
import MediaPlayer from '../mediaPlayer/MediaPlayer';
import { useSession } from 'next-auth/react';


function UserFavorites() {

    return (
        <div className="content relative mx-6 pt-6 md:h-screen lg:h-full basis-full lg:basis-10/12">
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