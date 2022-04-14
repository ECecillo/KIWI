import SpotifyWebAPi from 'spotify-web-api-node';

// On définit les permissions que l'on demandera à l'user et que spotify nous donnera à travers le token access.
export const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  //"user-library-modify",
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
].join(',');
// On va créer une chaine de caractère qui va stocker toutes les propriétés que l'on a au dessus.

const params = {
  // Pour l'API spotify on passe la string scopes à param (exemple .../authorize?params={scopes})
  scope: scopes,
};
// Créer un objet de type url search qui va définir des méthodes utilitaires pour travailler avec la chaîne de requête (les paramètres GET) d’une URL..
const queryParamString = new URLSearchParams(params);

// Créer notre string qui sera l'url vers l'api spotify.
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebAPi({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };

// https://next-auth.js.org/tutorials/refresh-token-rotation
export async function refreshAccessTokenSpotify(token) {
  try {
    console.log("refreshAccessToken Spotify Start");
    spotifyApi.setAccessToken(token.access_token);
    spotifyApi.setRefreshToken(token.refresh_token);
    spotifyApi.setClientId(process.env.SPOTIFY_CLIENT_ID);

    // Destructure l'objet de la réponse:
    // http://michaelthelin.se/spotify-web-api-node/#refreshAccessToken

    // Demande un nouveau token (access_token, refreshed_token ...).
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token, // Le nouveau token.
      accessToken: refreshedToken.access_token,  // Récupère le nouvelle access token.
      // Calcule l'heure et la date à laquelle le prochain token expirera que l'on multiplie par 1000 pour avois un résultat sous la forme d'heure et pas de ms.
      accessTokenExpires: Date.now() + (refreshedToken.expires_in * 1000),
      // Remplace notre ancien refresh token si on en reçoit un sinon reprend l'ancien.
      refreshToken: refreshedToken.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    // Si on a un problème dans la demande d'un nouveau refresh token on donne l'erreur.
    console.error(error);
    return {
      ...token, // On retourne le token qui a produit l'erreur.
      error: 'RefreshAccessTokenError',
    };
  }
}