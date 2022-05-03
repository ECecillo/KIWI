import React, { useEffect, useState } from 'react';
import SearchBar from '../searchbar/SearchBar';
import MediaPlayer from '../mediaPlayer/MediaPlayer';
import { useSession } from 'next-auth/react';
import useSpotify from '../../../hooks/useSpotify';
import MusicInfos from './../musicinfo/MusicInfos';

function CurrentTrends({session}) {

    const spotifyApi = useSpotify(session);
    let [trends, setTrends] = useState([]);

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getPlaylist('37i9dQZEVXbNG2KDcFcKOF').then((data) => {
                setTrends(data.body.tracks.items);
            })
        }
    }, [session, spotifyApi]);


    console.log("trends");
    console.log(trends);

    return (
        <div className="content relative mx-6 pt-6 md:h-screen lg:h-full basis-full lg:basis-10/12">
            <SearchBar/>
            <p className='font-sans text-3xl font-semibold mt-8 mb-4 pt-5 pl-5 dark:text-white'>Tendences actuelles 🔥</p>
            <div className='music-infos grid grid-cols-5 font-sans select-none uppercase text-black-500 text-md px-5 pb-5 dark:text-white' >
                <p>#</p>
                <p>Titre</p>
                <p>Artiste</p>
                <p>Durée</p>
                <p className='hidden md:block'>Album</p>
            </div>

            <MusicInfos playlist={trends}/>

            <MediaPlayer />
        </div>
    )
}

export default CurrentTrends;