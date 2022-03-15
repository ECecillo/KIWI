import React from 'react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import profilePicture from '../../../../public/test-img/doge.jpg'
import { GrFormNext } from 'react-icons/gr'
import { useRouter } from 'next/router';
/* 
  signIn : Fonction qui permet de se connecter et nous redirigera vers une page de connexion. 
  signOut : Fonction pour se deco.
  useSession : Hook qui permet de retourner un tableau avec
  :
  - premier élément (session) : l'utilisateur connecté (infos). 

  - deuxième (loading) : bool qui nous dit l'état de connexion de la session (si session === NULL, l'user != connecté).
*/
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';


export default function User() {

    const router = useRouter();
    // On va vérifier que la page auxquels on va accéder à chaque fois que l'on clique sur un lien existe dans notre app (réduit les soucis erreurs).

    // TODO : Test unitaire pour voir si la fonction fait bien ce que l'on veut possible !
    const isActive = (pathname) => { // Attend un string
        router.pathname === pathname;
    };
    // Récupère les infos de useSession() et les destruct dans un objet contenant session et status.
    const { data: session, status } = useSession();
    
    /* 
      session : 
        user?: {
          name?: string | null
          email?: string | null
          image?: string | null
        }
    */


    let composant_User = null;

    if (status === 'loading') {
        // On affiche rien, l'utilisateur est peut être en cours de connexion et son statut va peut être changer.
        composant_User = (<></>);
    }
    if (!session) {
        // si user est null alors on lui propose de se connecter en utilisant Link de NextJS.
        composant_User = (
            <Link href="/api/auth/signin">
                <a data-active={isActive('/signup')}>Log In</a>
            </Link>
        );
    }
    if (session) {
        // Si on est connecté on affiche le nom de l'utilisateur (probablement créer une page pour gérer son compte pour la deconnexion, image ect ....)
        let image_profile = session.user.image;
        composant_User = (
            <div className='profile-section absolute bottom-0 w-full' >
                <button className='flex flex-row items-center pl-4 mb-8 mt-6 text-neutral-500 fill-neutral-500 hover:fill-white hover:text-white hover:bg-black rounded-lg w-full'>
                    {/* Ici pour src on verra pour récupérer l'image de l'utilisateur via la bdd. */}
                    <img className='rounded-full aspect-square h-14 w-14 mr-8' src={image_profile} height="100%" width="100%" alt='Image profil' />
                    <p className='font-sans text-lg mr-8'>{session.user.name}</p>
                    <IconContext.Provider value={{ color: "blue", className: "global-class-name" }}>
                        <div>
                            <GrFormNext color='red' className='h-8 w-8'/>
                        </div>
                    </IconContext.Provider>
                    
                </button>
                <Link href="/api/auth/signout">
                    <a data-active={isActive('/signup')}>Log Out</a>
                </Link>
            </div >
        );
    }
    return (
        <>
            {composant_User}
        </>
    )
}
