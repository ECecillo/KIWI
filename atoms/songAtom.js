import { atom } from "recoil";

// Nous dira quelle musique on a choisi
export const currentTrackIdState = atom({
    key: "currentTrackIdState", // Id unique qui respecte la doc de recoil.
    default: null, // Valeur par défault.
});

/**
 * Etat de lecture.
 */
export const isPlayingState = atom({
    key: "isPlayingState",
    default: false,
});
/**
 * String de l'url de la musique Youtube que l'on veut jouer.
 */
export const urlState = atom({
    key: "urlStateYoutube",
    default: "",
});
/**
 * Réel qui indique le volume de la musique.
 */
export const volumeState = atom({
    key: "volumeStateSong",
    default: 0.6,
});
/**
 * Bool qui permet de savoir si on met en boucle la musique qui joue.
 */
export const loopCurrentSong = atom({
    key: "loopCurrentYTSong",
    default: false,
});
/**
 * Bool qui permet de savoir si on détache le player de là où on l'affiche (picture-in-picture mode).
 */
export const pipYoutubePlayer = atom({
    key: "pipeYoutubePlayer",
    default: false,
});
/**
 * Bool qui mute la musique.
 */
export const muteCurrentSong = atom({
    key: "muteCurrentYTSong",
    default: false,
});
/**
 * Booléen qui gère si on est en train de changer la lecture. 
 */
export const seekingSong = atom({
    key: "seekingYTSong",
    default: false,
});
/**
 * Fraction [0,1] qui indique combien de temps on a joué depuis le début;
 */
export const playedCurrentSong = atom({
    key: "playedCurrentYTSong",
    default: 0.0,
});
/**
 * Fraction [0,1] qui indique combien de temps on a chargé la musique depuis le début.
 */
export const loadedCurrentSong = atom({
    key: "loadedCurrentYTSong",
    default: 0.0,
});
/**
 * Réel qui indique le nombre de seconde joué depuis le début de la lecture.
 */
export const playedSecondsCurrentSong = atom({
    key: "playedSecondsCurrentYTSong",
    default: 0.0,
});
/**
 * Réel qui indique le nombre de seconde chargé depuis le début de la lecture.
 */
export const loadedSecondsCurrentSong = atom({
    key: "loadedSecondsCurrentYTSong",
    default: 0.0,
});
/**
 * Réel qui indique la durée de la musique en secondes.
 */
export const durationCurrentSong = atom({
    key: "durationCurrentYTSong",
    default: 0.0,
});
