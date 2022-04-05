import React from 'react';
import Card from './Card';
import Add from "./Add";

function Cards({ session, status }) {
    let google_token = "";
    let spotify_token = "";
    // Si on a fini de charger la session.
    if (session) {
        // On check si le token est défini ou non sinon on transmet null à Token.
        if (session.google) {
            google_token = session.google.access_token;
        }
        else if (session.spotify) {
            spotify_token = session.spotify.access_token;
        }
    }
    {/* Google */ }
    {/* Si (session === true) on check si session.google est null ou non pour afficher la carte.*/ }
    {/* <Card name={"Google"} image={"https://cdn.worldvectorlogo.com/logos/google-g-2015.svg"} token={google_token} droits={'user-read-email'}/> */ }
    return (
        < div className='grid grid-rows-1 grid-cols-[minmax(300px,350px)_minmax(300px,350px)] justify-center' >
            {/* Les providers en forme de carte où on affiche l'access_token ou connecter si session.spotify ou google == null. */}
            <Add name="Google" image={"https://cdn.worldvectorlogo.com/logos/google-g-2015.svg"} />
            {/* Spotify */}
            {/* Si (session === true) on check si session.spotify est null ou non pour afficher la carte.*/}
            <Card name={"Spotify"} image={"https://cdn.worldvectorlogo.com/logos/spotify-2.svg"} token={spotify_token} droits={'user-read-email'} />
        </div >
    )
}

export default Cards
