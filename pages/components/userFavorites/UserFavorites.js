import React, { useEffect, useState } from 'react';
import SearchBar from '../searchbar/SearchBar';
import MediaPlayer from '../mediaPlayer/MediaPlayer';
import { useSession } from 'next-auth/react';
import useSpotify from '../../../hooks/useSpotify';
import MusicInfos from './../musicinfo/MusicInfos';

function UserFavorites({session}) {

    const spotifyApi = useSpotify(session);
    let [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getMySavedTracks().then((data) => {
                setFavorites(data.body.items);
            })
        }
    }, [session, spotifyApi]);

    console.log(favorites);

    return (
        <div className="content relative mx-6 pt-6 md:h-screen lg:h-full basis-full lg:basis-10/12">
            <SearchBar/>
            <p className='font-sans text-3xl font-semibold mt-8 mb-4 pt-5 pl-5 dark:text-white'>Mes morceaux favoris</p>
            <div className='music-infos grid grid-cols-5 font-sans select-none uppercase text-black-500 text-md px-5 pb-5 dark:text-white' >
                <p>#</p>
                <p>Titre</p>
                <p>Artiste</p>
                <p>Durée</p>
                <p className='hidden md:block'>Album</p>
            </div>
            
            <MusicInfos playlist={favorites}/>

            <MediaPlayer />
        </div>
    )
}

export default UserFavorites;