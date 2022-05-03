import React, { useEffect, useState } from 'react'
import SearchBar from '../searchbar/SearchBar'
import MediaPlayer from '../mediaPlayer/MediaPlayer'
import { useSession } from 'next-auth/react'
import useSpotify from '../../../hooks/useSpotify'
import MusicInfos from './../musicinfo/MusicInfos'

function UserFavorites({ session }) {
  const spotifyApi = useSpotify(session)
  let [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMySavedTracks().then((data) => {
        setFavorites(data.body.items)
      })
    }
  }, [session, spotifyApi])

  console.log(favorites)

  return (
    <div className="content relative mx-6 basis-full pt-6 md:h-screen lg:h-full lg:basis-10/12">
      <SearchBar />
      <p className="mt-8 mb-4 pt-5 pl-5 font-sans text-3xl font-semibold dark:text-white">
        Mes morceaux favoris
      </p>
      <div className="music-infos text-black-500 text-md grid select-none grid-cols-5 px-5 pb-5 font-sans uppercase dark:text-white">
        <p>#</p>
        <p>Titre</p>
        <p>Artiste</p>
        <p>Durée</p>
        <p className="hidden md:block">Album</p>
      </div>

      <MusicInfos playlist={favorites} />

      <MediaPlayer />
    </div>
  )
}

export default UserFavorites
