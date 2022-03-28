import SearchBar from '../searchbar/SearchBar';
import MediaPlayer from "../mediaPlayer/MediaPlayer";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from './../../../hooks/useSpotify';
import DisplayGrid from './../displayGrid/DisplayGrid';

function Content(){
    const { data: session, status } = useSession();
    const spotifyApi = useSpotify();
    const [releases, setReleases] = useState([]);
    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getNewReleases({limit:6}).then((data) => {
                setReleases(data.body.albums.items);
            })
        }
    }, [session, spotifyApi]);

    const [releasesFR, setReleasesFR] = useState([]);
    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getNewReleases({limit:6, country:'FR'}).then((data) => {
                setReleasesFR(data.body.albums.items);
            })
        }
    }, [session, spotifyApi]);

    console.log(releasesFR);

    return(
        <div className="content relative mx-6 pt-6 md:h-screen lg:h-full basis-full lg:basis-10/12">
            <SearchBar/>
            <p className='font-sans text-3xl font-semibold mt-8 mb-4 pt-5 pl-10'>Nouveautés mondiales 🌍</p>
            <div className='flex flex-row'>
                {releases.map((elmt, index) => 
                <div className="flex flex-col h-fit items-center rounded-2xl bg-white m-2 p-2 w-32" key={`${elmt}-${index}`}>
                    <img src={elmt.images[0].url} className="rounded-2xl aspect-square"></img>
                    <p className="w-full overflow-hidden truncate text-center">{elmt.name}</p>
                </div>
                )}
            </div>

            <p className='font-sans text-3xl font-semibold mt-8 mb-4 pt-5 pl-10'>Nouveautés France 🇫🇷</p>
            <div className='flex flex-row'>
                {releasesFR.map((elmt, index) => 
                <div className="flex flex-col h-fit items-center rounded-2xl bg-white m-2 p-2 w-32" key={`${elmt}-${index}`}>
                    <img src={elmt.images[0].url} className="rounded-2xl aspect-square"></img>
                    <p className="w-full overflow-hidden truncate text-center">{elmt.name}</p>
                </div>
                )}
            </div>

            <MediaPlayer />
        </div>
    )
}

export default Content;
