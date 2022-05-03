import React, { useEffect, useState } from 'react'
import SearchBar from '../searchbar/SearchBar'
import MediaPlayer from '../mediaPlayer/MediaPlayer'
import useSpotify from '../../../hooks/useSpotify'
import MusicInfos from './../musicinfo/MusicInfos'

function CurrentTrends({ session }) {
  const spotifyApi = useSpotify(session)
  let [trends, setTrends] = useState([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getPlaylist('37i9dQZEVXbNG2KDcFcKOF').then((data) => {
        setTrends(data.body.tracks.items)
      })
    }
  }, [session, spotifyApi])

  console.log('trends')
  console.log(trends)

  return (
    <div className="content relative mx-6 basis-full pt-6 md:h-screen lg:h-full lg:basis-10/12">
      <SearchBar />
      <p className="mt-8 mb-4 pt-5 pl-5 font-sans text-3xl font-semibold dark:text-white">
        Tendences actuelles 🔥
      </p>
      <div className="music-infos text-black-500 text-md grid select-none grid-cols-5 px-5 pb-5 font-sans uppercase dark:text-white">
        <p>#</p>
        <p>Titre</p>
        <p>Artiste</p>
        <p>Durée</p>
        <p className="hidden md:block">Album</p>
      </div>

      <MusicInfos playlist={trends} />

      <MediaPlayer />
    </div>
  )
}

export default CurrentTrends
