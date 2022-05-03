'use strict'

import Youtube from '../src/youtube-web-api'
import checkSongDB from './checkSongDB'
import { data } from './constant'
import createSongs, { getAdditionnalData, getSongsData } from './createSongsDB'

const API_KEY = `${process.env.GOOGLE_API_KEY_DEV}`

const youtube = new Youtube()

export default async function handler(req, res) {
  const song = req.query.id.toUpperCase()
  console.debug(song)
  //youtube.setApiKey(API_KEY);
  try {
    const response = await checkSongDB(song)
    if (response) {
      // On a des musiques qui correpondent dans notre db on les renvoies.
      return res.status(200).json(response)
    }
    // 2 . Si rien ne correspond on lancer une requête fetch vers google avec le song.
    const { body: infos, ...RequestInfo } = await youtube.searchVideos(song, {
      part: 'snippet',
      key: API_KEY,
    })
    const songsToCreate = infos.items

    /**
     * @song_data Données que l'on va créer dans la base de données.
     * @ids Tableau identifiant musique/videos.
     * @playlist_data ...
     * @playlistsId Tableau d'identifiants de playlist : ['PLvXMARe51eeaTlLpp5Ic5s2bWaoihItZs', ... ]
     */
    let songData = [],
      ids = [],
      playlist_data = [],
      playlistsId = []

    await getSongsData(songsToCreate, songData, playlist_data, ids, playlistsId)

    await getAdditionnalData(songData, ids, youtube, API_KEY)
    // Créer les données dans la base de données.
    createSongs(songData)

    return res.status(200).json(songData)
  } catch (error) {
    return res.status(404).json(error)
  }
}
