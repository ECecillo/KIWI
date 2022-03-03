import React from 'react';
/* 
  signIn : Fonction qui permet de se connecter et nous redirigera vers une page de connexion. 
  signOut : Fonction pour se deco.
  useSession : Hook qui permet de retourner un tableau avec
  :
  - premier élément (session) : l'utilisateur connecté (infos). 

  - deuxième (loading) : bool qui nous dit l'état de connexion de la session (si session === NULL, l'user != connecté).
*/
import { signIn, signOut, useSession } from "next-auth/react";
import NavBar from "../navbar/NavBar";
// Informations de Routage API de NextJS
import { useRouter } from 'next/router';

// Composant qui va nous servir à récupérer les infos de session de l'User et les passer à la Navbar.
export default function Header() {

  const router = useRouter();
  // On va vérifier que la page auxquels on va accéder à chaque fois que l'on clique sur un lien existe dans notre app (réduit les soucis erreurs).

  // TODO : Test unitaire pour voir si la fonction fait bien ce que l'on veut possible !
  const isActive = (pathname) => { // Attend un string
    router.pathname === pathname;
  };
  
  // Récupère les infos de useSession() et les destruct dans un objet contenant session et status.
  const {data : session , status} = useSession();
  /* 
    session : 
      user?: {
        name?: string | null
        email?: string | null
        image?: string | null
      }
  */
  return (
    <>
        <NavBar user={session} status={status}/>
    </>
  )
}
