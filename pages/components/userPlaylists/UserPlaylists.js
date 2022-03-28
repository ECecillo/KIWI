import React, { useEffect, useState } from 'react';
import useSpotify from '../../../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import SearchBar from './../searchbar/SearchBar';
import MediaPlayer from './../mediaPlayer/MediaPlayer';
import DisplayGrid from '../displayGrid/DisplayGrid';

function UserPlaylists() {

    const spotifyApi = useSpotify();
    const {data: session, statu} = useSession();
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [session, spotifyApi]);

    return (
        <div className="content relative basis-10/12 m-6">
            <SearchBar/>
                <p className='font-sans text-4xl font-semibold my-8 pt-5 pb-2 p-10'>Mes playlists</p>

                <DisplayGrid elements={playlists}/>
                
                {console.log(playlists)}

            <MediaPlayer />
        </div>
    )
}

export default UserPlaylists;