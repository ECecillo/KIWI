'use strict';

// source : https://github.com/thelinmichael/spotify-web-api-node/blob/master/src/base-request.js

/**
 * 
 * @param {Object} builder Objet Builder dans lequel on a défini les différents paramètres et option de notre requête. 
 */
var Request = function(builder) {
  if (!builder) {
    throw new Error('No builder supplied to constructor');
  }

  // Récupère les différentes informations du builder pour les encapsuler dans Request.
  this.host = builder.host;
  this.port = builder.port;
  this.scheme = builder.scheme;
  this.queryParameters = builder.queryParameters;
  this.bodyParameters = builder.bodyParameters;
  this.headers = builder.headers;
  this.path = builder.path;
};
/**
 * 
 * @param {string} key clé qui permet de retrouver la valeur passé en paramètre avec ce nom.
 * @returns valeur du paramètre.
 */
Request.prototype._getter = function(key) {
  return function() {
    return this[key];
  };
};

// On récupère les différentes valeur passé en paramètre.
Request.prototype.getHost = Request.prototype._getter('host');

Request.prototype.getPort = Request.prototype._getter('port');

Request.prototype.getScheme = Request.prototype._getter('scheme');

Request.prototype.getPath = Request.prototype._getter('path');

Request.prototype.getQueryParameters = Request.prototype._getter(
  'queryParameters'
);

Request.prototype.getBodyParameters = Request.prototype._getter(
  'bodyParameters'
);

Request.prototype.getHeaders = Request.prototype._getter('headers');

/**
 * 
 * @returns Gènère l'URI de l'API Youtube.
 */
Request.prototype.getURI = function() {
  if (!this.scheme || !this.host || !this.port) {
    throw new Error('Missing components necessary to construct URI');
  }
  var uri = this.scheme + '://' + this.host;
  if (
    (this.scheme === 'http' && this.port !== 80) ||
    (this.scheme === 'https' && this.port !== 443)
  ) {
    uri += ':' + this.port;
  }
  // Si on a mis un path, on le concat à la fin.
  // Exemple : /v3/videos ou /v3/search
  if (this.path) {
    uri += this.path;
  }
  return uri;
};

/**
 * 
 * @returns Génère l'URL vers lequel on va faire la requête en lui concaténant des paramètres si on en a mis.
 */
Request.prototype.getURL = function() {
  var uri = this.getURI();
  // Si on a passé des paramètres.
  if (this.getQueryParameters()) {
    return uri + this.getQueryParameterString(this.getQueryParameters());
  } else {
    return uri;
  }
};
/**
 * @example ?part=snippet&id=...
 * @returns Formate l'objet que l'on avait depuis le Builder en string que l'on concaténera à l'url finale. 
 */
Request.prototype.getQueryParameterString = function() {
  var queryParameters = this.getQueryParameters();
  if (queryParameters) {
    return (
      '?' +
      Object.keys(queryParameters)
        .filter(function(key) {
          return queryParameters[key] !== undefined;
        })
        .map(function(key) {
          return key + '=' + queryParameters[key];
        })
        .join('&')
    );
  }
};
/**
 * 
 * @param {Voimport("typescript").idExpression} method La méthode HttpManager que l'on utilise pour cette requête (on passera par exemple HttpManager.get, HttpManager.post).
 * @param {import("typescript").FunctionExpression} callback (optionnel) Sert à traiter la promesse au lieu de faire des then. 
 * @returns Une Promesse qui est le résultat de la requête.
 */
Request.prototype.execute = function(method, callback) {
  if (callback) {
    method(this, callback);
    return;
  }
  var _self = this;

  // Retourne une Promesse (on pourrait remplacer par un await pour être plus lisible).
  return new Promise(function(resolve, reject) {
    method(_self, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Objet Prototype qui va nous permettre de construire l'Objet Requête.
 */
var Builder = function() {};

/**
 * 
 * @param {string} key Index auxquels on va attribuer une valeur.
 * @example this['host'] = www.googleapis.com/youtube/
 * @returns le Builder auxquels on a ajouté une nouvelle propriétés que l'on référence avec la chaine key.
 */
Builder.prototype._setter = function(key) {

  return function(value) {
    this[key] = value;
    return this;
  };
};

Builder.prototype.withHost = Builder.prototype._setter('host');

Builder.prototype.withPort = Builder.prototype._setter('port');

Builder.prototype.withScheme = Builder.prototype._setter('scheme');

Builder.prototype.withPath = Builder.prototype._setter('path');

/**
 * Fonction qui s'occupe d'assigner chaque élément de la structure arguments dans la case key.
 * @param {string} key Index qui permet de référencer les éléments que l'on va ajouter dans cette case.
 * @returns Builder auxquels on aura ajouter les différentes valeurs dans la case référencés par la valeur key.
 */
Builder.prototype._assigner = function(key) {
  return function() {
    for (var i = 0; i < arguments.length; i++) {
      this[key] = this._assign(this[key], arguments[i]);
    }
    
    return this;
  };
};


Builder.prototype.withQueryParameters = Builder.prototype._assigner(
  'queryParameters'
);

Builder.prototype.withBodyParameters = Builder.prototype._assigner(
  'bodyParameters'
);

Builder.prototype.withHeaders = Builder.prototype._assigner('headers');

/**
 * Fonction qui va ajouter l'Access Token dans le Header du Builder.
 * @param {string} accessToken Access Token de l'utilisateur que l'on retrouve dans la session ou la db. 
 * @returns this = l'Objet avec toutes les propriétés assignés (Host, Port ...)
 */
Builder.prototype.withAuth = function(accessToken) {
  if (accessToken) {
    this.withHeaders({ Authorization: 'Bearer ' + accessToken });
  }
  return this;
};

/**
 * 
 * @param {string} apiKey Clé d'API assigné à l'application qui permettra de faire des recherches. 
 * @returns l'Objet Builder avec l'API Key concaténer à l'objet queryParameters si cette dernière a bien été passé en paramètre.
 */
Builder.prototype.withKey = function(apiKey) {
  if(apiKey) {
    // Recopie la clé d'API à la fin de l'objet queryParameters.
    // (Pour google on doit passer la clé dans l'URL de la requête).
    this.withQueryParameters.assign(apiKey); 
  }

  return this;
}

/**
 * 
 * @param {Object} src Objet Destination vers lequel on va concaténer notre obj.
 * @param {Object} obj Objet qui contient les propriétés que l'on veut concaténer à notre src. 
 * @returns Selon le type de obj on renvoie ce denier ou on recopie les informations de ce dernier dans l'objet src.
 */
Builder.prototype._assign = function(src, obj) {
  if (obj && Array.isArray(obj)) {
    return obj;
  }
  if (obj && typeof obj === 'string') {
    return obj;
  }
  if (obj && Object.keys(obj).length > 0) {
    return Object.assign(src || {}, obj);
  }
  return src;
};

/**
 * 
 * @returns Retourne un Objet Requête que l'on construit en fonction des éléments que l'on avait passé à notre objet Builder.
 */
Builder.prototype.build = function() {
  return new Request(this);
};

/**
 * 
 * @returns Fonction qui va construire notre objet Builder.
 */
module.exports.builder = function() {
  return new Builder();
};
