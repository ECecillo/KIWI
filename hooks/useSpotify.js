import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react';
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

function useSpotify(session) {
    useEffect(()=> {
        if(session) {
            // Si on a eu un problème dans la récupération du nouveau token et on redirige l'user vers la page de connexion.
            if(session.error === "RefreshAccessTokenError") {
                signIn();
            }
            if(session.spotify) {
                spotifyApi.setAccessToken(session.spotify.access_token);
            }
        }
    },[session]); // Se lance au lancement de l'app et lorsque session est bien défini.

    
    return spotifyApi;
}

export default useSpotify;