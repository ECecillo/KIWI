import React from 'react';
import Card from './Card';
import Add from "./Add";
import checkVariable from '../../../../lib/checkVariable';

function Cards({ session, spotify, google }) {
    /* On aura 2 types de composant possible selon les valeurs de spotify et google : Add ou Card */
    /* Add : On est pas connecté avec le Provider on affiche son logo avec un bouton qui le redirige */
    /* Card : On est connecté, on affiche : son ID et les droits de son access token. */

    const image_spotify = "https://cdn.worldvectorlogo.com/logos/spotify-2.svg";
    const image_google = "https://cdn.worldvectorlogo.com/logos/google-g-2015.svg";

    const Google = checkVariable(session.google)
        ? (<Card name={"Google"} image={image_google} droits={google} account_id={session.google.provider_id} />)
        : (<Add name={"Google"} image={image_google} />);

    const Spotify = checkVariable(session.spotify)
        ? (<Card name={"Spotify"} image={image_spotify} droits={spotify} account_id={session.spotify.provider_id} />)
        : (<Add name={"Spotify"} image={image_spotify} />);


    return (
        < div className='grid grid-rows-2 grid-cols-[minmax(300px, 350px)] sm:grid-rows-1 sm:grid-cols-[minmax(300px,350px)_minmax(300px,350px)] justify-center' >
            {Google}
            {Spotify}
        </div >
    )
}

export default Cards
