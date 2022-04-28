import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { durationCurrentSong, isPlayingState, loadedCurrentSong, loadedSecondsCurrentSong, loopCurrentSong, muteCurrentSong, pipYoutubePlayer, playedCurrentSong, playedSecondsCurrentSong, seekingSong, urlState, volumeState } from '../atoms/songAtom';

/**
 * 
 * @param {ref} player Référence sur l'élément DOM que l'on utilise pour le player. 
 * @returns Une liste de handler que l'on passera aux composants pour gérer les interactions entre le lecteur et la bar de controle.
 */
function useControls(player) {
    // Si le player n'est pas passé en paramètre alors on le définies à null.
    const _player = player || null;


    const [playing, setPlaying] = useRecoilState(isPlayingState);
    const [url, setUrl] = useRecoilState(urlState);
    const [pip, setPipe] = useRecoilState(pipYoutubePlayer);
    const [volume, setVolume] = useRecoilState(volumeState);
    const [muted, setMuted] = useRecoilState(muteCurrentSong);
    const [seeking, setSeeking] = useRecoilState(seekingSong);
    const [played, setPlayed] = useRecoilState(playedCurrentSong);
    const [loaded, setLoaded] = useRecoilState(loadedCurrentSong);
    const [playedSeconds, setPlayedSeconds] = useRecoilState(playedSecondsCurrentSong);
    const [loadedSeconds, setLoadedSeconds] = useRecoilState(loadedSecondsCurrentSong);
    const [duration, setDuration] = useRecoilState(durationCurrentSong);
    const [loop, setLoop] = useRecoilState(loopCurrentSong);

    function handlePlayPause() {
        console.log("onPlayPause", playing);
        setPlaying(!playing);
    }
    /**
     * Change le state globale "playing" à true pour lancer la musique.
     */
    function handlePlay() {
        console.log("onPlay");
        setPlaying(true);
    }
    /**
     * Change le state globale "playing" à false pour arrêter la musique.
     */
    function handlePause() {
        setPlaying(false);
    }
    /**
     * Change l'état "playing" et enlève met à null l'url que l'on a préfixé.
     */
    function handleStop() {
        console.log("onStop");
        setPlaying(false);
    }
    /**
     * Handler qui s'occupe de changer l'état "loop" pour mettre en boucle la musique.
     */
    function handleToggleLoop() {
        console.log("ToggleLoop");
        setLoop(!loop);
    }
    /**
     * Change le state globale "volume" en mettant parseFloat(e.target.value)
     * @param {Event} e Clique sur le slider du volume.
     */
    function handleVolumeChange(value) {
        console.log("VolumeChange : ", value);
        setVolume(value);
    }


    /**
     * Change le state globale "muted" à true || false.
     */
    function handleToggleMuted() {
        console.log('onMuted');
        setMuted(!muted);
    }
    /* Handler qui pourrait servir à détacher le lecteur de là où il est pour que l'utilisateur le place où il veut. */
    function handleTogglePIP() {
    }

    function handleEnablePIP() {
    }

    function handleDisablePIP() {
    }

    /**
     * Handler qui nous sert à savoir si on a changé le temps de la musique (voir pour debounce).
     * Set le state globale 'seeking' à true. 
     * @param {Event} e : Clique sur le slider du temps de la musique.
     */
    function handleSeekMouseDown(e) {
        setSeeking(true);
    }
    /**
     * Handler qui va récupérer la valeur du slider qui s'occupe du temps de la musique.
     * Change un state globale "played" qui est le temps de lecture de la musique en cours.
     * @param {Event} e : Contient les informations du slider (e.target.value)
     */
    function handleSeekChange(e) {
        setPlayed(parseFloat(e.target.value)); // Utile pour avoir la position du slide.
    }
    /**
     * Change l'état gloable "seeking" à false et va appeler une méthode function sur la référence du player pour définir le nouveau temps.
     * @param {Event} e 
     * @param {Ref} player Référence de l'objet player qui permet d'appeler des méthodes définies dans le package React-Player.
     */
    function handleSeekMouseUp(e) {
        setSeeking(false);
        if (_player)
            _player.seekTo(parseFloat(e.target.value)); // Change où on en est dans la musique.
    }
    /**
     * Méthode qui est appelé toutes les secondes et récupères : 
     * - loaded [0,1] : Information sur le chargement de la musique, si 1 = chargé complétement.
     * - played [0,1] : Information sur le temps joué depuis le début, si 1 = musique finie.
     * - playedSeconds et loadedSeconds : temps en seconde des données au dessus.
     */
    function handleProgress(state) {
        //console.log("onProgress", state);
        const { played, loaded, playedSeconds, loadedSeconds } = state; // Destruction de l'objet state pour récupérer les nouveaux états.
        setPlayed(played);
        setLoaded(loaded);
        setPlayedSeconds(playedSeconds);
        setLoadedSeconds(loadedSeconds);
    }
    /**
     * Gère la fin de la musique.
     */
    function handleEnded() {
        console.log("onEnded");
        setPlaying(loop); // Si loop est à true on a pas fini sinon on s'arrête.
    }

    function handleDuration(duration) {
        console.log("onDuration", duration);
        setDuration(duration); // Durée en seconde de la musique.
    }
    /**
     * Gère le mode plein écran si on est avec le player de youtube.
     * 
     */
    function handleClickFullscreen() {
    }

    const states = {
        url,
        playing,
        played,
        pip,
        volume,
        muted,
        seeking,
        loaded,
        playedSeconds,
        loadedSeconds,
        duration,
        loop,
    };
    const handlers = {
        handlePlayPause,
        handlePlay,
        handlePause,
        handleStop,
        handleToggleLoop,
        handleVolumeChange,
        handleToggleMuted,
        handleSeekMouseDown,
        handleSeekChange,
        handleSeekMouseUp,
        handleProgress,
        handleEnded,
        handleDuration,
    };
    // On renvoie toute les méthodes qui nous permettent de changer les états du hooks.
    return { states, handlers };
}

export default useControls;