import React, { useEffect, useState } from 'react';
import useSpotify from '../../../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import SearchBar from './../searchbar/SearchBar';
import MediaPlayer from './../mediaPlayer/MediaPlayer';
import DisplayGrid from '../displayGrid/DisplayGrid';

function UserPlaylists() {

    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [session, spotifyApi]);

    return (
        <div className="content relative mx-6 pt-6 md:h-screen lg:h-full basis-full lg:basis-10/12">
            <SearchBar/>
                <p className='font-sans text-4xl font-semibold my-8 pt-5 pb-2 p-10'>Mes playlists</p>

                <DisplayGrid elements={playlists}/>
                
                {console.log(playlists)}

            <MediaPlayer />
        </div>
    )
}

export default UserPlaylists;