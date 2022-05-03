// CECILLON Enzo
// Inspiré de https://github.com/thelinmichael/spotify-web-api-node
// Youtube Web API
'use strict'

var WebApiRequest = require('./webapi-request'),
  HttpManager = require('./http-manager')

function Youtube(credentials) {
  // Constructeur qui prend en paramètre un objet credentials, si il est null on a un objet null.
  this._credentials = credentials || {}
}
Youtube.prototype = {
  /**
   * Fonction qui s'occupe d'initialiser notre objet Youtube avec les éléments de l'objet credentials.
   * @param {Object} credentials Object qui contient l'API Key, l'Access token.
   */
  setCredentials: function (credentials) {
    for (var key in credentials) {
      if (credentials.hasOwnProperty(key)) {
        this._credentials[key] = credentials[key]
      }
    }
  },
  getAccessToken: function () {
    return this._getCredential('accessToken')
  },
  getApiKey: function () {
    return this._getCredential('apiKey')
  },
  /**
   * @example {
   *  apiKey : 'FDGD6896GFGFD...',
   *  accessToken : '.......',
   * }
   * @returns {Object} Objet qui contient (apiKey, accessToken)
   */
  getCredentials: function () {
    return this._credentials
  },

  resetCredentials: function () {
    this._credentials = null
  },
  setApiKey: function (apiKey) {
    this._setCredential('apiKey', apiKey)
  },
  setAccessToken: function (accessToken) {
    this._setCredential('accessToken', accessToken)
  },
  /**
   * Met un nouvelle élément personnalisé en fonction d'une clé et d'une valeur.
   * @param {string || any} credentialKey Index dans dans l'objet auxquels on va assigner cette valeur.
   * @param {any} value Valeur que l'on mettra pour cette Objet.
   */
  _setCredential: function (credentialKey, value) {
    this._credentials = this._credentials || {}
    this._credentials[credentialKey] = value
  },
  /**
   *
   * @param {string} credentialKey Clé que l'on veut retrouver dans l'objet _credentials.
   * @returns Valeur de l'objet à cette clé.
   */
  _getCredential: function (credentialKey) {
    if (!this._credentials) {
      return
    } else {
      return this._credentials[credentialKey]
    }
  },
  _resetCredential: function (credentialKey) {
    if (!this._credentials) {
      return
    } else {
      this._credentials[credentialKey] = null
    }
  },
  /**
   * Récupère les informations d'une vidéo (titre, image, ...) en fonction de son ID.
   * @param {int} videoId l'ID de la vidéo que l'on veut récup
   * @param {Object} options https://developers.google.com/youtube/v3/docs/videos/list
   * @param {requestCallback} callback Fonction que l'on appel si on ne veut pas traiter une promesse.
   * @example getVideo('rrFXEr1pHqA', {part: 'snippet'}).then(...)
   * @return {Promise|undefined} Une promesse qui si réussi, retourne un Objet qui contient les informations de la vidéo. Retourne rien si on avait passé un Callback.
   */
  getVideo: function (videoId, options, callback) {
    return WebApiRequest.builder(this.getApiKey())
      .withPath('/v3/videos')
      .withQueryParameters({
        id: videoId,
        ...options,
      })
      .build()
      .execute(HttpManager.get, callback)
  },
  /**
   * On récupère plusieurs informations de vidéos en 1 seule requête comme la durée qui n'est pas retourné dans la requête Search.
   * @param {string} videosId Une chaine de caractère qui contient plusieurs videoId.
   * @param {Object} options https://developers.google.com/youtube/v3/docs/videos/list
   * @param {requestCallback} callback Fonction que l'on appel si on ne veut pas traiter une promesse.
   * @example getVideos('Ks-_Mh1QhMc,c0KYU2j0TM4,eIho2S0ZahI', {maxResults : 25, videoCategoryId : SjBVLIHXQ14}).then(...)
   * @return {Promise|undefined} Une promesse qui si réussi, retourne un Objet qui contient toutes les informations des vidéos auxquels on a passé l'id dans videosId. Retourne rien si on avait passé un Callback.
   */
  getVideos: function (videosId, options, callback) {
    return WebApiRequest.builder(this.getApiKey())
      .withPath('/v3/videos')
      .withQueryParameters({
        id: videosId,
        ...options,
      })
      .build()
      .execute(HttpManager.get, callback)
  },
  /**
   * Récupère les informations qui correspondent à un certains pattern.
   * @param {string} query Spécifie ce que l'on veut chercher.
   * @param {Object} options https://developers.google.com/youtube/v3/docs/search/list
   * @param {requestCallback} callback Fonction que l'on appel si on ne veut pas traiter une promesse.
   * @example getVideos('Hiroyuki Sawano Nexus', {part: 'snippet'}).then(...)
   * @return {Promise|undefined} Une promesse qui si réussi, retourne un Objet contenant une collection de vidéos correspondant à notre recherche.
   *  Retourne rien si on avait passé un Callback.
   */
  searchVideos: function (query, options, callback) {
    // Si max Results est null on met une valeur par défaut qui sera 25.
    if (!options?.maxResults) options.maxResults = 50
    return WebApiRequest.builder(this.getApiKey())
      .withPath('/v3/search')
      .withQueryParameters({
        q: query,
        ...options,
      })
      .build()
      .execute(HttpManager.get, callback)
  },
  getUserPlaylists: function (options, callback) {
    if (!this.getAccessToken())
      return "AccessToken is undefined we can't retrieve your playlist"

    return WebApiRequest.builder(this.getAccessToken())
      .withPath('/v3/playlists')
      .withQueryParameters({
        part: 'snippet, contentDetails',
        mine: true,
        ...options,
      })
      .build()
      .execute(HttpManager.get, callback)
  },
  /**
   *
   * @param {string} playlistId Id de la playlist dont on veut récupérer les éléments.
   * @param {Object} options https://developers.google.com/youtube/v3/docs/playlistItems
   * @param {requestCallback} callback Fonction que l'on appel si on ne veut pas traiter une promesse.
   * @example getPlaylistItems('PL1JnbMU7901JYRCe9X6-NTuLsxqd5tH7z', {part: 'snippet,contentDetails,id,status', key:..., maxResults: 25});
   * @returns {Promise|undefined} Si réussi, retourne un Objet contenant une collection de vidéos correspondant aux éléments présents dans la playlist.
   */
  getPlaylistItems: function (playlistId, options, callback) {
    if (!options?.maxResults) options.maxResults = 50
    return WebApiRequest.builder(this.getApiKey())
      .withPath('v3/playlistItems')
      .withQueryParameters({
        palylistId: playlistId,
        ...options,
      })
      .build()
      .execute(HttpManager.get, callback)
  },
}

Youtube._addMethods = function (methods) {
  for (var i in methods) {
    if (methods.hasOwnProperty(i)) {
      this.prototype[i] = methods[i]
    }
  }
}

module.exports = Youtube
