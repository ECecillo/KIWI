import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

/**
 * Fonction qui s'occupe de créer le jeux de données que l'on a récup avec la requête vers l'API Google.
 * @param {Array} songs Tableau dans lequel se trouve toutes les données retournés par la requête search de l'API Google.
 * @param {Prototype} youtube Objet que l'on utilise pour faire des requêtes vers l'api.
 * @param {String} API_KEY Clé api stocké dans le .env
 * @returns Bool qui a true siginfie que la requête a réussi sinon false.
 */
async function createSongs(songs) {
  console.debug('Hello there', songs)
  /**
   * @song_data Données que l'on va créer dans la base de données.
   * @ids Tableau identifiant musique/videos.
   * @playlist_data ...
   * @playlistsId Tableau d'identifiants de playlist : ['PLvXMARe51eeaTlLpp5Ic5s2bWaoihItZs', ... ]
   */
  /* let song_data, ids, playlist_data, playlistsId = []; // 
    try {
        await getSongsData(songs, song_data, playlist_data, ids, playlistsId);
        await getAdditionnalData(song_data, ids, youtube, API_KEY);
    }
    catch (err) {
        console.debug("Erreur dans le Formatage des données ou de récupération des données additionnel ",err);
    } */
  // Pour les playlists on doit faire une requête pour chaque playlist pour retrouver les musiques et les mettres dans un seule et même tableau.

  // On fait un create many de chaque playlist.

  // On fait un crate many des musiques que l'on a récup dans les playlists.

  //console.debug('Tableau avec toutes les données : ', song_data);
  try {
    const result = await createManySongs(songs)
    if (result > 0) console.debug('Transaction Réussi ', result)

    console.debug("J'ai terminé ma tâche youpi.")
    return result
  } catch (err) {
    console.debug(err)
    return 0
  }
  // Expect number;
}

/**
 * Procédure qui va remplir les tableaux song_data, playlist_data, ids et playlistsIds avec les informations qu'il nous faut pour la database.
 * @param {Array} data Tableau d'objets qui contiennent chacun les infos d'une musique.
 * @param {Array} song_data Tableau d'objets de musique dans lequel on va mettre les informations qui nous intéressait dans data.
 * @param {Array} playlist_data Tableau d'objets de playlist dont on a récupéré les informations depuis data.
 * @param {Array} songIds Tableau d'identifiant dans lequel on stock les id des musiques que l'on a consulté dans data.
 * @param {Array} playlistsId Tableau d'identifiant dans lequel on stock les id des playlists que l'on a consulté dans data.
 */
export async function getSongsData(
  data,
  song_data,
  playlist_data,
  songIds,
  playlistsId
) {
  data.map((song) => {
    // Identifiants attachés à la musique.
    const { videoId, playlistId } = song.id
    const { publishedAt, title, thumbnails } = song.snippet // metadata de la musique.

    if (videoId && !playlistId) {
      // C'est une musique.
      song_data.push(createSongData(videoId, title, thumbnails, publishedAt))
      songIds.push(videoId)
    } else if (!videoId && playlistId) {
      // C'est une playlist.
      playlist_data.push(createPlaylistData(playlistId, title, thumbnails))
      playlistsId.push(playlistId)
    }
  })
}

export async function getAdditionnalData(data, song_ids, youtube, API_KEY) {
  // On doit faire une deuxième requête qui va récupérer les informations comme la durée de la musique que l'on a pas dans celle de Search.
  // On formate.
  const videos = song_ids.join(',') // videos = 'fsdfds7855gdsf, fsdf7667DS, ...'

  const getVideosResponse = await youtube.getVideos(videos, {
    part: 'snippet,contentDetails,statistics',
    maxResults: song_ids.length,
    key: API_KEY,
  })

  const videoItems = getVideosResponse.body.items

  videoItems.map((video, index) => {
    data[index].song_duration = formateDuration(video.contentDetails.duration)

    const views = video.statistics.viewCount
    data[index].song_view = parseInt(views)
  })
}

/**
 * Fonction qui s'occupe de créer un objet avec les informations passées en paramètres qui seront ajouter à la base de données.
 * @param {string} id Id de la musique.
 * @param {string} name Nom de la musique.
 * @param {Object} thumnails Miniatures de la musique en différente taille.
 * @param {string} year Date de publication de la musique.
 * @returns {Object} Objet qui contient toutes les informations que l'on veut ajouter à la base de données.
 */
function createSongData(id, name, thumnails, year) {
  const url = 'https://www.youtube.com/watch?v=' + id
  const song_year = new Date(year).getFullYear()

  return {
    youtube_id: id,
    youtube_url: url,
    song_thumbnails: thumnails.medium.url,
    song_name: name.toUpperCase(),
    song_year: song_year,
    song_duration: 0,
    song_view: 0,
  }
}

/**
 * Fonction qui s'occupe de créer un objet avec les informations passées en paramètres qui seront ajouter à la base de données.
 * @param {string} id Id de la musique.
 * @param {string} name Nom de la musique.
 * @param {Object} thumnails Miniatures de la musique en différente taille.
 * @returns {Object} Objet qui contient toutes les informations d'une Playlist pour pouvoir être ajouté dans la base de données.
 */
function createPlaylistData(id, name, thumbnails) {
  const url = 'https://www.youtube.com/playlist?list=' + id
  return {
    playlist_id: id,
    playlist_name: name.toUpperCase(),
    playlist_image: thumbnails.medium.url,
    playlist_url: url,
    playlist_visibility: true,
    playlist_songs: null, // Ce champ sera à remplir avec la requête qui récupère tous les éléments de la playlist.
  }
}

/**
 * Fonction utilitaire qui permet de convertir un temps formaté via la norme ISO8601 en un temps affichable.
 * @param {string} duration Temps format ISO8601
 * @example formateDuration('PT3M5S') => 3:05
 * @returns {string} Un temps au format HH:MM:SS.
 */
function formateDuration(duration) {
  // Format initiale : PT3M50S => 3M50

  // Supprime PT et S
  const ISOTimeToMinute = duration.replace(/PT|S/g, '')

  // Remplace H et M par :
  let formated_duration = ISOTimeToMinute.replace(/H|M/g, ':')

  // Vérifie si le temps est à moins de 10s, si c'est le cas on doit ajouter un 0 après le : car il n'est pas mis par défaut.
  // Exemple : 4:5, ici on veut ajouter un 0 avant le 5 donc length - 2.
  if (formated_duration[formated_duration.length - 2] === ':') {
    let tmp = formated_duration.split('') // Créer un tableau [4,:,5].
    tmp[tmp.length - 2] = ':0' // On ajoute le 0.
    formated_duration = tmp.join('')
  }
  // Cette fois on vérifie que le temps en minute ne manque pas de 0.
  if (formated_duration[formated_duration.length - 5] === ':') {
    let tmp = formated_duration.split('') // Créer un tableau [4,:,5].
    tmp[tmp.length - 5] = ':0' // On ajoute le 0.
    formated_duration = tmp.join('')
  }
  return formated_duration
}

async function createManySongs(data) {
  try {
    console.debug('Success')
    const result = await prisma.song.createMany({
      data,
      skipDuplicates: true,
    })
    return result
  } catch (e) {
    console.debug('FAILED')
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    console.debug('Error ', e)
    throw e
  }
}

export default createSongs
