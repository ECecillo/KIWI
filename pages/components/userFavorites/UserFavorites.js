import React, { useEffect, useState } from 'react';
import SearchBar from '../searchbar/SearchBar';
import MediaPlayer from '../mediaPlayer/MediaPlayer';
import { useSession } from 'next-auth/react';
import useSpotify from '../../../hooks/useSpotify';
import MusicInfos from './../musicinfo/MusicInfos';

function UserFavorites() {

    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    let [favorites, setFavorites] = useState([]);
    let copie = {};


    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            for(let i=0 ; i<5 ; i++){
                spotifyApi.getMySavedTracks({
                                        offset: 0+i*50,
                                        limit: 50}).then((data) => {
                    setFavorites(data.body.items);                    
                })
                copie = Object.assign({}, copie, favorites);
            }
        }
    }, [session, spotifyApi]);

    console.log(copie);
    

    return (
        <div className="content relative mx-6 pt-6 md:h-screen lg:h-full basis-full lg:basis-10/12">
            <SearchBar/>
            <p className='font-sans text-4xl font-semibold my-8 pt-5 pb-2 p-10'>Mes morceaux favoris</p>
            <div className='music-infos grid grid-cols-5 font-sans select-none uppercase text-black-500 text-md px-5 pb-5 ' >
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