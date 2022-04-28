import React from 'react';
import NavBar from "../navbar/NavBar";

/**
 * Composant qui va nous servir à récupérer les infos de session de l'User et les passer à la Navbar.  
*/
export default function Header({session}) {
    return (
        <>
            <NavBar session={session}/>
        </>
    )
}
