import React from 'react';
import NavBar from "../navbar/NavBar";
import NavBarMobile from "./../navbarMobile/NavBarMobile";
// Informations de Routage API de NextJS

// Composant qui va nous servir à récupérer les infos de session de l'User et les passer à la Navbar.
export default function Header() {
    return (
        <React.Fragment>
            <NavBar/>
        </React.Fragment>
    )
}
