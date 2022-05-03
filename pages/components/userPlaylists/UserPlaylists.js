import React, { useEffect, useState } from 'react';
import useSpotify from '../../../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import SearchBar from './../searchbar/SearchBar';
import MediaPlayer from './../mediaPlayer/MediaPlayer';
import DisplayGrid from '../displayGrid/DisplayGrid';

function UserPlaylists({session}) {

    const spotifyApi = useSpotify(session);    
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [session, spotifyApi]);

    console.log(playlists);

    return (
        <div className="content relative mx-6 pt-6 md:h-screen lg:h-full basis-full lg:basis-10/12">
            <SearchBar/>
            <p className='font-sans text-3xl font-semibold mt-8 mb-4 pt-5 pl-5 dark:text-white'>Mes playlists</p>
                <div className='flex flex-row flex-wrap'>
                    {playlists.map((elmt, index) =>
                        <div className="flex flex-col h-fit items-center rounded-2xl m-2 p-2 w-40 bg-white dark:bg-neutral-700 dark:hover:bg-dark-soft-black hover:bg-gray-200 dark:text-white" key={`${elmt}-${index}`}>
                            <img src={elmt.images[0].url} className="rounded-2xl aspect-square"></img>
                            <p className="w-full overflow-hidden truncate text-center">{elmt.name}</p>
                        </div>
                    )}
                </div>

            <MediaPlayer />
        </div>
    )
}

export default UserPlaylists;