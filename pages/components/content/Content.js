import SearchBar from '../searchbar/SearchBar';
import MediaPlayer from "../mediaPlayer/MediaPlayer";
import React, { useEffect, useState } from 'react';
import useSpotify from './../../../hooks/useSpotify';
import { sessionState } from '../../../atoms/userAtom';
import { useRecoilValue } from 'recoil';

function Content() {
    const session = useRecoilValue(sessionState);
    
    const [searchResult, setSearchResult] = useState([]);

    const spotifyApi = useSpotify(session);

    const [releases, setReleases] = useState([]);
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getNewReleases({ limit: 6 }).then((data) => {
                setReleases(data.body.albums.items);
            })
        }
    }, [session, spotifyApi]); // Chaque fois que la session et le hook change.

    const [releasesFR, setReleasesFR] = useState([]);
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getNewReleases({ limit: 6, country: 'FR' }).then((data) => {
                setReleasesFR(data.body.albums.items);
            });
        }
    }, [session, spotifyApi]);
/* 
    useEffect(()=> {
        
    }, [searchResult]);
 */
    console.log('Resultat db ', searchResult);

    const handlePlayMusic = (event) => {
        console.log("Hello there", event);
    };

    return (
        <div className="content relative mx-6 pt-6 md:h-screen lg:h-full basis-full lg:basis-10/12 dark:text-dark-white">
            <SearchBar setResult={setSearchResult}/>
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
            <div className='flex flex-row'>
                {searchResult.map((elmt, index) =>
                    <div className="flex flex-col h-fit items-center rounded-2xl bg-black m-2 p-2 w-32" key={`${elmt}-${index}`} onClick={handlePlayMusic}>
                        <img src={elmt.song_thumbnails} className="rounded-2xl aspect-square"></img>
                        <p className="w-full overflow-hidden truncate text-center">{elmt.song_name}</p>
                        <p className="w-full overflow-hidden truncate text-center">{elmt.song_view}</p>
                        <p className="w-full overflow-hidden truncate text-center">{elmt.song_duration}</p>
                    </div>
                )}
            </div>
            <MediaPlayer />
        </div>
    )
}

export default Content;
