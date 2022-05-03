import React, { useState } from 'react'
import { getSession } from 'next-auth/react'
import NavBar from './components/navbar/NavBar'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import Profile from './components/account/Profile/profile'
import { useRecoilState } from 'recoil'
import {
  imageState,
  infoHasChanged,
  sessionState,
  userNameState,
} from '../atoms/userAtom'
import { BiArrowBack } from 'react-icons/bi'
import Cards from './components/account/Providers/Cards'
import { scopes } from '../lib/spotify'
import EditUsername from './components/account/Username/EditUsername'

// @id : Number = Id dans la base de donnée de l'utilisateur.
async function deleteAccount(id) {
  // Envoie une requête au handler pour qu'il supprime l'utilisateur dans la base de donnée.
  await fetch(`/api/account/${id}`, {
    method: 'DELETE',
  })
  Router.push('/login')
}
// @id = Id dans la base de donnée de l'utilisateur.
async function saveChanges(id, data) {
  console.log(data)
  await fetch(`/api/account/${id}`, {
    method: 'PUT',
    body:
      // Contenu de la requête.
      JSON.stringify({
        data,
      }),
  }).then((response) => {
    return response.status === 200 ? Router.reload() : console.log(response) // On récupère le statut de la réponse, si ce dernier est 200, la requête a réussi on recharge la page, sinon on affiche la réponse de la requête dans la console.
  })
}

export default function Account({ session, spotify_scope, google_scope }) {
  const userHasValidSession = Boolean(session)

  const [sessionUser, setSessionUser] = useRecoilState(sessionState)
  setSessionUser(session)

  // Des globales state que les fils du composant account partage, sert entre autre à connaitre le nouveau pseudo et image.
  const [newUserImage, setNewUserImage] = useRecoilState(imageState)
  const [newUserName, setNewUserName] = useRecoilState(userNameState)

  // Lorsque l'on modifira le pseudo ou l'image, cette variable passera à true pour savoir si on affiche ou non le bouton enregistrer.
  const [hasChanged, sethasChanged] = useRecoilState(infoHasChanged)

  // Callback que l'on appelle lorsque l'on clique sur le bouton reinitialiser qui s'affiche ssi on a modifier quelque chose.
  const reinitialise = () => {
    setNewUserImage('')
    setNewUserName('')
  }

  const router = useRouter()
  const isActive = (pathname) => {
    // Attend un string
    return router.pathname === pathname
  }

  return (
    <div className="w-full dark:bg-dark-black dark:text-dark-white xl:flex">
      <div className="basis-1/6">
        <NavBar session={session} />
      </div>
      <div className="flex basis-full bg-gradient-to-br from-[#FFDEE9] to-[#16a084d5] dark:from-dark-gradient-right dark:via-dark-gradient-middle dark:to-dark-gradient-left">
        <div className="my-0 mx-auto flex max-w-[95%] flex-col">
          <section aria-labelledby="Compte" className="flex-rows mt-6 flex">
            {/* Logo pour revenir en arrière */}
            <span
              className="transparent my-auto mr-6 
                        self-center justify-self-center rounded-xl p-1 opacity-80
                        transition duration-200 ease-out hover:scale-110 hover:cursor-pointer hover:opacity-100 dark:hover:bg-dark-transparent-black dark:hover:text-white"
            >
              <Link href="/" passHref>
                <a data-active={isActive('/')}>
                  <BiArrowBack size={'1.5rem'} />
                </a>
              </Link>
            </span>
            <h1
              id="Compte"
              className="dark:text-dark-text text-center text-3xl font-bold"
            >
              Mon Compte
            </h1>
            {/* Infos */}
          </section>
          <div className="mt-20 flex flex-col items-center gap-10 sm:items-start">
            {/* Formulaire ou section dans laquel l'user va modifier son nom, la fonction doit aussi changer le nom dans la database. */}
            <Profile />
            <EditUsername />

            {/* Carte qui afficheront les infos de la session et les droits des tokens. */}
            <Cards spotify={spotify_scope} google={google_scope} />
            {/* Déconnexion et Supprimer mon Compte. */}
            <div className="dark:text-dark-text flex h-fit max-h-fit flex-col space-y-4 sm:w-full sm:flex-row sm:items-center sm:justify-around sm:space-y-0">
              {/* Bouton de deconnexion */}
              <span className="self-center rounded-md bg-red-700 px-3 py-1 text-center transition duration-200 ease-in hover:opacity-90">
                <Link href="/api/auth/signout">
                  <a data-active={isActive('/signup')}>Déconnexion</a>
                </Link>
              </span>
              {/* Supprimer le compte */}
              <div className="w-full rounded-md border-2 border-red-900 px-3 py-1 transition duration-200 ease-in hover:bg-red-700 dark:bg-dark-transparent-black sm:w-max">
                {userHasValidSession && (
                  <button onClick={() => deleteAccount(session.user.userId)}>
                    Supprimer mon Compte
                  </button>
                )}
              </div>
            </div>
            {/* Bouton pour enregistrer les modifications de l'utilisateur qui s'affiche lorsque userImage ou userName ont changées. */}
            {hasChanged && (
              <div className="fixed top-auto right-auto bottom-0 left-[15%] justify-center sm:left-[20%] md:left-1/4 xl:right-1/4 xl:left-auto">
                <div
                  className="flex w-10/12 flex-col items-center justify-center rounded-md bg-white/50 p-2 
						text-center dark:bg-dark-transparent-black sm:w-[80%] sm:flex-row sm:justify-around sm:self-center sm:justify-self-center sm:p-2 lg:w-full"
                >
                  <div>
                    <button
                      className="sm:mr-5 lg:mr-16"
                      onClick={() => reinitialise}
                    >
                      Réinitialiser
                    </button>
                    <button
                      onClick={() =>
                        saveChanges(session.user.userId, {
                          newUserImage,
                          newUserName,
                        })
                      }
                      className="rounded-md bg-[#309e53] p-1 text-white dark:bg-[#2F7B47]"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Récupère des données côté serveur (Session) que l'on utilisera dans la page dans les composants ou dans Account.
export async function getServerSideProps(context) {
  // Récupère la session et ces infos (token, user...).
  const session = await getSession(context)
  const spotify_scope = scopes.split(',') // On retourne un tableau où chaque élément est une des perms que l'on a demandé.
  //['user-read-email', '...', ....];
  const google_scope = ['user-read-email']
  return {
    props: {
      session,
      spotify_scope,
      google_scope,
    }, // will be passed to the page component as props
  }
}
