/* Fichier dans lequel on déclare un Objet qui va stocker toutes les méthodes que l'on appelle quand on appuie sur un des boutons du lecteur. */
import { useRecoilState } from 'recoil'
import { isPlayingState } from '../../../atoms/songAtom'

// Class qui nous permet de déclarer des fonctions
export default class Control {
  /**
   * Controle la musique que l'on veut jouer.
   * @param {string?} url Lien vers la musique que l'on va jouer.
   */
  constructor(_url) {
    this.url = _url
  }
  static handlePlayPause(playing) {
    return !playing
  }
  /**
   * Change le state globale "playing" à true pour lancer la musique.
   */
  static handlePlay(playing) {
    const setPlaying = useRecoilState(isPlayingState)
    console.log('onPlay')
    setPlaying(true)
  }
  /**
   * Change le state globale "playing" à false pour arrêter la musique.
   */
  static handlePause() {
    const setPlaying = useRecoilState(isPlayingState)
    setPlaying(false)
  }
  /**
   * Change l'état "playing" et enlève met à null l'url que l'on a préfixé.
   */
  static handleStop() {}
  /**
   * Handler qui s'occupe de changer l'état "loop" pour mettre en boucle la musique.
   */
  static handleToggleLoop() {}
  /**
   * Change le state globale "volume" en mettant parseFloat(e.target.value)
   * @param {Event} e Clique sur le slider du volume.
   */
  static handleVolumeChange(e) {}
  /**
   * Change le state globale "muted" à true || false.
   */
  static handleToggleMuted() {}

  /* Handler qui pourrait servir à détacher le lecteur de là où il est pour que l'utilisateur le place où il veut. */
  static handleTogglePIP() {}

  static handleEnablePIP() {}

  static handleDisablePIP() {}

  /**
   * Handler qui nous sert à savoir si on a changé le temps de la musique (voir pour debounce).
   * Set le state globale 'seeking' à true.
   * @param {Event} e : Clique sur le slider du temps de la musique.
   */
  static handleSeekMouseDown(e) {}
  /**
   * Handler qui va récupérer la valeur du slider qui s'occupe du temps de la musique.
   * Change un state globale "played" qui est le temps de lecture de la musique en cours.
   * @param {Event} e : Contient les informations du slider (e.target.value)
   */
  static handleSeekChange(e) {}
  /**
   * Change l'état gloable "seeking" à false et va appeler une méthode static sur la référence du player pour définir le nouveau temps.
   * @param {Event} e
   * @param {Ref} player Référence de l'objet player qui permet d'appeler des méthodes définies dans le package React-Player.
   */
  static handleSeekMouseUp(e) {}
  /**
   * Méthode qui est appelé toutes les secondes et récupères :
   * - loaded [0,1] : Information sur le chargement de la musique, si 1 = chargé complétement.
   * - played [0,1] : Information sur le temps joué depuis le début, si 1 = musique finie.
   * - playedSeconds et loadedSeconds : temps en seconde des données au dessus.
   */
  static handleProgress(state) {}
  /**
   * Gère la fin de la musique.
   */
  static handleEnded() {}

  static handleDuration(duration) {}
  /**
   * Gère le mode plein écran si on est avec le player de youtube.
   *
   */
  static handleClickFullscreen() {}
}
