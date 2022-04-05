import React, { useState } from 'react'
import { getSession, useSession } from 'next-auth/react';
import NavBar from "./components/navbar/NavBar";
import Infos from './components/account/userInfo/Infos';
import defaultImage from '../public/test-img/doge.jpg';
import { BsFillPencilFill } from "react-icons/bs";
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Profile from "./components/account/Profile/profile";
import { useRecoilValue } from 'recoil';
import { imageState, infoHasChanged, userNameState } from '../atoms/userAtom';
import { BiArrowBack } from 'react-icons/bi';
import Cards from './components/account/Providers/Cards';
import { scopes } from '../lib/spotify';
import prisma from '../lib/prisma';


// @id : Number = Id dans la base de donnée de l'utilisateur.
async function deleteAccount(id) {
    // Envoie une requête au handler pour qu'il supprime l'utilisateur dans la base de donnée.
    await fetch(`/api/account/${id}`, {
        method: 'DELETE',
    });
    Router.push('/login');
}
// @id = Id dans la base de donnée de l'utilisateur.
async function saveChanges(id, data) {
    console.log(data);
    await fetch(`/api/account/${id}`, {
        method: 'PUT',
        body:
            // Contenu de la requête.
            JSON.stringify({
                data
            })
    }).then((response) => {
        return response.status === 200 ? Router.reload() : console.log(response); // On récupère le statut de la réponse, si ce dernier est 200, la requête a réussi on recharge la page, sinon on affiche la réponse de la requête dans la console. 
    });
}

export default function Account({session, spotify, google}) {
    //const { data: session, status } = useSession();
    const userHasValidSession = Boolean(session);
    console.log(session);

    // Des globales state que les fils du composant account partage, sert entre autre à connaitre le nouveau pseudo et image.
    const newUserImage = useRecoilValue(imageState);
    const newUserName = useRecoilValue(userNameState);

    // Lorsque l'on modifira le pseudo ou l'image, cette variable passera à true pour savoir si on affiche ou non le bouton enregistrer.
    const hasChanged = useRecoilValue(infoHasChanged);

    // state qui va nous permettre d'activer l'input dans lequel l'utilisateur va pouvoir changer son pseudo. 
    const [editUser, setEditUser] = useState("disabled");
    const [editButton, setEditButton] = useState("Edit");
    function changeUser() {
        // On check si le bouton est activé ou non via le state.
        if (editUser) {
            // On donne la possibilité de modifier le champ.
            setEditUser("");
            // On modifie le texte dans le bouton pour qu'il passe à Confirmer.
            setEditButton("Confirmer");
        }
        else if (!editUser) {
            // On réactive la propriété disable de l'input.
            setEditUser("disabled");
            // On remet le texte du bouton à la valeur Edit.
            setEditButton("Edit");

        }
        else {
            console.log("Erreur");
        }
    }
    // TODO3 : Afficher son nom avec les différents provider et mettre un bouton de deconnexion.
    // TODO4 : Si il ne s'est pas co avec un des providers lui proposer.
    // TODO5: Lui proposer de se déco.
    const router = useRouter();
    const isActive = (pathname) => { // Attend un string
        return router.pathname === pathname;
    };
    return (
        <div className="flex dark:bg-dark-black dark:text-dark-white ">
            <div className='sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex'>
                <NavBar />
            </div>
            <div className="content relative basis-full lg:basis-10/12 sm:m-0 md:m-6 mt-20 bg-gradient-to-br 
            from-dark-gradient-right via-dark-gradient-middle to-[#58121d]">
                <div className='flex flex-col w-1/2 my-0 mx-auto'>
                    <section aria-labelledby='Compte' className='flex flex-rows'>
                        {/* Logo pour revenir en arrière */}
                        <span className='transition ease-out duration-200 my-auto mr-4 p-1 transparent opacity-70 rounded-xl dark:hover:text-white hover:opacity-100 hover:cursor-pointer hover:scale-110'>
                            <Link href="/" passHref>
                                <a data-active={isActive('/')}>
                                    <BiArrowBack size={"1.5rem"} />
                                </a>
                            </Link>
                        </span>
                        <h1 id='Compte' className='text-3xl dark:text-dark-text font-bold text-center'>Mon Compte</h1>
                        {/* Infos */}
                    </section>
                    <div className='grid mt-20 gap-10 grid-rows-[0.2fr_0.2fr_1fr_0.1fr]'>
                        {/* Formulaire ou section dans laquel l'user va modifier son nom, la fonction doit aussi changer le nom dans la database. */}
                        <Profile />
                        <div className='flex flex-row pl-4 rounded-xl bg-dark-transparent-black'>
                            {/* session.name que l'on peut modifier avec un bouton edit. */}
                            <section aria-labelledby='Nom' className='m-4 w-[100%]'>
                                <h2 id="Nom" className='font-medium mb-2 dark:text-dark-text'>Nom d'Utilisateur</h2>
                                <div className='flex flex-row h-8'>
                                    {/* Voir comment faire en sorte pour que l'utilisateur puisse modifier le champ. */}
                                    <input type='text' disabled={editUser} className='basis-2/3 bg-dark-light-gray bg-opacity-[0.325]' />
                                    <button className='basis-1/3 bg-dark-soft-black' onClick={() => changeUser()}>{editButton}</button>
                                </div>
                            </section>
                        </div>
                        <Cards session={session} />
                        <div className='flex flex-row space-x-20 dark:text-dark-text justify-center max-h-fit h-fit'>
                            {/* Bouton de deconnexion */}
                            <span className='px-3 py-1 bg-red-700 rounded-md transition ease-in duration-200 hover:opacity-90'>
                                <Link href="/api/auth/signout">
                                    <a data-active={isActive('/signup')}>Déconnexion</a>
                                </Link>
                            </span>
                            {/* Supprimer le compte */}
                            <div className='dark:bg-dark-transparent-black px-3 py-1 border-2 border-red-900 rounded-md sm:w-max w-full transition ease-in duration-200 hover:bg-red-700' >
                                {
                                    userHasValidSession &&
                                    <button onClick={() => deleteAccount(session.user.userId)}>Supprimer mon Compte</button>
                                }
                            </div>
                        </div>
                        {/* Bouton pour enregistrer les modifications de l'utilisateur qui s'affiche lorsque userImage ou userName ont changées. */}
                        {hasChanged &&
                            <button onClick={() => saveChanges(session.user.userId, { newUserImage, newUserName })}>Enregistrer les Modifications</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    const session = await getSession(context);
    console.log(session);
    const spotify_scope = scopes.split(','); // On retourne un tableau où chaque élément est une des perms que l'on a demandé.

    // On récupère le nom / id de l'utilisateur utilisé pour son compte.
    const { [0]: spotify, [1]: google } = await prisma.account.findMany({
        where: {
            userId: session.user.userId,
        },
        select: {
            providerAccountId: true,
        }
    });
    const checkValidity = (variable) => {
        if(!variable)
            return null;
        else 
            return variable;
    }
    const spotify_infos = checkValidity(spotify);
    const google_infos = checkValidity(google); 
    return {
        props: {
            session,
            spotify: {
                spotify_infos,
            },
            google : {
                google_infos,
            }
        }, // will be passed to the page component as props
    }
}

