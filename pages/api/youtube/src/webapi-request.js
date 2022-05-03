'use strict'

// Objet qui nous sert à construire nos requêtes.
var Request = require('./base-request')

var DEFAULT_HOST = 'www.googleapis.com/youtube',
  DEFAULT_PORT = 443,
  DEFAULT_SCHEME = 'https'

/**
 * Fonction qui créer un Objet Request basé sur l'objet Builder.
 * @param {string} accessToken Access Token que l'on donne au client lorsqu'il se connecte.
 * @param {string} API_KEY Clé API de notre application Google.
 * @returns Créer un Objet Request en fonction des données de l'Objet Builder que l'on intialise avec les différents méthodes (withHost ... ).
 */
module.exports.builder = function (apiKey) {
  return Request.builder()
    .withHost(DEFAULT_HOST)
    .withPort(DEFAULT_PORT)
    .withKey(apiKey)
    .withScheme(DEFAULT_SCHEME)
}
