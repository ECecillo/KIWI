import prisma from "../../../../lib/prisma";

/**
 * Envoie une requête à la base de donnée et selon la réponse renvoie un Objet ou Faux si il n'y a rien.
 * @param {string} songName La musique que l'on cherche dans la base de donnée. 
 * @returns {Promise} Promesse qui contient un Objet avec toutes les musiques qui correspond à la musique que l'on a passé en paramètre.
 */
export default async function getSongDataBase(songName) {
    const songs = await prisma.song.findMany({
        where: {
            song_name: {
                contains: songName,
            }
        },
        select: {
            song_name: true,
            youtube_url: true,
            song_duration: true,
            song_view: true,
            song_thumbnails : true,
        }
    });

    // On check la réponse de la database. 
    if(!songs.length) {
        // Si la réponse est null on a pas de musique qui correspond dans notre db.
        console.debug("Nous n'avons pas cette musique dans la Database");
        return false;
    }
    console.debug("Requête Réussi : ", songs);

    return songs;
}

globalThis.onmessage = (e) => {
        if(e.data) {
            // Récupère le JSON que prisma nous renvoie.
            const result = getSongDataBase(e.data);
            postMessage(result);
        }
    };
