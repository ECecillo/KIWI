import SearchBar from '../searchbar/SearchBar';
import MusicInfos from "../musicinfo/MusicInfos";
import MediaPlayer from "../mediaPlayer/MediaPlayer";
import useSpotify from "../../../hooks/useSpotify"
import CoverMoscow from '/public/test-img/Defence-of-moscow_Salbaton.jpg'
import CoverLion from '/public/test-img/The Lion from the North.jpg'
import CoverThunStruck from '/public/test-img/ThunderStruck_ACDC.jpg'
import Cover from '/public/test-img/cover.jpg'
import coverBackInBlack from '/public/test-img/coverACDC.jpg'
import coverStormTroopers from '/public/test-img/coverStormTroopers.jpg'
import coverJvousDetesteTous from '/public/test-img/cover_Jvous_déteste-tous.jpg'
import doge from "/public/test-img/doge.jpg"

import Tendance from '../tendance Scrollbar/TendanceScroll'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
0
//test affichage en attente back-end
//id, title, artist, duration, album
const playlist = [{ id: "01", title: "Heat Waves", artist: "Glass Animals", duration: "3:59", album: "Dreamlands" },
{ id: "02", title: "MAMIII", artist: "Becky G", duration: "3:46", album: "MAMIII" },
{ id: "03", title: "Cold Heart - PNAU Remix", artist: "Elton John, Dua Lipa", duration: "3:23", album: "The Lockdown Sessions" },
{ id: "04", title: "INDUSTRY BABY", artist: "Lil Nas X, Jack Harlow", duration: "3:32", album: "MONTERO" },
{ id: "05", title: "Esay On Me", artist: "Adele", duration: "3:45", album: "30" },
{ id: "06", title: "Woman", artist: "Doja Cat", duration: "2:53", album: "Planet Her" },
{ id: "07", title: "Jefe", artist: "Ninho", duration: "2:58", album: "Jefe" },
{ id: "08", title: "Cold Heart - PNAU Remix", artist: "Elton John, Dua Lipa", duration: "3:23", album: "The Lockdown Sessions" },
{ id: "09", title: "INDUSTRY BABY", artist: "Lil Nas X, Jack Harlow", duration: "3:32", album: "MONTERO" },
{ id: "10", title: "Esay On Me", artist: "Adele", duration: "3:45", album: "30" },
{ id: "11", title: "Woman", artist: "Doja Cat", duration: "2:53", album: "Planet Her" },
{ id: "12", title: "Jefe", artist: "Ninho", duration: "2:58", album: "Jefe" }];

//Test affichage 

const tendance = [{ cover: coverJvousDetesteTous.src, title: "J'vous déteste tous", artist: "Lorenzo" },
{ cover: CoverMoscow.src, title: "Defence of Moscow", artist: "Salbaton" },
{ cover: CoverLion.src, title: "The lion from the north", artist: "Salbaton" },
{ cover: coverStormTroopers.src, title: "StrormTroopers", artist: "Salbaton" },
{ cover: Cover.src, title: "Till It's Gone", artist: "Yelawolf" },
{ cover: CoverThunStruck.src, title: "ThunStruck", artist: "ACDC" },
{ cover: coverBackInBlack.src, title: "Back In Black", artist: "ACDC" },
{ cover: doge.src, title: "....", artist: "........." },
];

function Content() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
        console.log("Hello there");
    }, [session, spotifyApi]);


    return (
        <div className="content relative basis-full lg:basis-10/12 m-6">
            <SearchBar />
            <p className='font-sans text-4xl font-semibold my-8 pt-5 pb-2 p-10'>Ma super playlist</p>

            <div className='music-infos grid grid-cols-5 font-sans select-none uppercase text-black-500 text-md px-5 pb-5 ' >
                <p className=''>#</p>
                <p>Titre</p>
                <p>Artiste</p>
                <p>Durée</p>
                <p className='hidden md:block'>Album</p>
            </div>
            {playlists.map((playlist) => (
                <p key={playlist.id} className="cursor-pointer hover:text-white">{playlist.name}</p>
            ))}
            
            <MusicInfos playlist={playlist} />
            <p className='font-sans text-4xl font-semibold my-8 pt-5 pb-2 p-10'>Tendance</p>
            <Tendance tendance={tendance} />
           
            <MediaPlayer />
        </div>
    )
}

export default Content;
