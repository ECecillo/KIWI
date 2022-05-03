import SearchBar from '../searchbar/SearchBar'
import MediaPlayer from '../mediaPlayer/MediaPlayer'
import React, { useEffect, useState } from 'react'
import useSpotify from './../../../hooks/useSpotify'

function getDurationFromYT(string) {
  const splitedString = string.split(':')
  let result = ''
  if (splitedString.length == 2) {
    result = splitedString[0] + 'm' + splitedString[1] + 's'
  }
  if (splitedString.length == 1) {
    result = '0m' + splitedString[0] + 's'
  }

  return result
}

function Content({ session }) {
  const [searchResult, setSearchResult] = useState([])

  const spotifyApi = useSpotify(session)
  const [releases, setReleases] = useState([])
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getNewReleases({ limit: 6 }).then((data) => {
        setReleases(data.body.albums.items)
      })
    }
  }, [session, spotifyApi])

  const [frenchReleases, setFrenchReleases] = useState([])
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getNewReleases({ limit: 6, country: 'FR' }).then((data) => {
        setFrenchReleases(data.body.albums.items)
      })
    }
  }, [session, spotifyApi])

  const handlePlayMusic = (event) => {
    console.log('Hello there', event)
  }

  return (
    <div className="content relative mx-6 basis-full pt-6 dark:text-dark-white md:h-screen lg:h-full lg:basis-10/12">
      <SearchBar setResult={setSearchResult} />

      <div className="absolute flex h-4/6 flex-wrap justify-center overflow-auto scrollbar-hide">
        {' '}
        {/*  modif: h-3/5  ====> h-2/5 || edit: reverse car template tendance utilisé pour afficher les playlists */}
        {searchResult.map((elmt, index) => (
          <div
            className="m-2 flex h-fit w-40 flex-col items-center rounded-2xl bg-white p-2 hover:bg-gray-200 dark:bg-neutral-700 dark:text-white dark:hover:bg-dark-soft-black"
            key={`${elmt}-${index}`}
            onClick={handlePlayMusic()}
          >
            <img
              src={elmt.song_thumbnails}
              className="aspect-square rounded-2xl"
            ></img>
            <p className="w-full overflow-hidden truncate text-center">
              {elmt.song_name}
            </p>
            <p className="w-full overflow-hidden truncate text-center text-neutral-500">
              {getDurationFromYT(elmt.song_duration)}
            </p>
          </div>
        ))}
        <span className="flex flex-col">
          <p className="mt-8 mb-4 pt-5 pl-5 font-sans text-3xl font-semibold">
            Nouveautés mondiales 🌍
          </p>
          <div className="flex flex-row flex-wrap">
            {releases.map((elmt, index) => (
              <div
                className="m-2 flex h-fit w-40 flex-col items-center rounded-2xl bg-white p-2 hover:bg-gray-200 dark:bg-neutral-700 dark:text-white dark:hover:bg-dark-soft-black"
                key={`${elmt}-${index}`}
              >
                <img
                  src={elmt.images[0].url}
                  className="aspect-square rounded-2xl"
                ></img>
                <p className="w-full overflow-hidden truncate text-center">
                  {elmt.name}
                </p>
                <p className="w-full overflow-hidden truncate text-center text-neutral-500 dark:text-neutral-400">
                  {elmt.artists[0].name}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 mb-4 pt-5 pl-5 font-sans text-3xl font-semibold">
            Nouveautés France 🇫🇷
          </p>
          <div className="flex flex-row flex-wrap">
            {frenchReleases.map((elmt, index) => (
              <div
                className="m-2 flex h-fit w-40 flex-col items-center rounded-2xl bg-white p-2 hover:bg-gray-200 dark:bg-neutral-700 dark:text-white dark:hover:bg-dark-soft-black"
                key={`${elmt}-${index}`}
              >
                <img
                  src={elmt.images[0].url}
                  className="aspect-square rounded-2xl"
                ></img>
                <p className="w-full overflow-hidden truncate text-center">
                  {elmt.name}
                </p>
                <p className="w-full overflow-hidden truncate text-center text-neutral-500 dark:text-neutral-400">
                  {elmt.artists[0].name}
                </p>
              </div>
            ))}
          </div>
        </span>
      </div>
      <MediaPlayer />
    </div>
  )
}

export default Content
