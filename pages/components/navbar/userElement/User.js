import React from 'react'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import profilePicture from '../../../../public/test-img/doge.jpg'
import { GrFormNext } from 'react-icons/gr'
import { useRouter } from 'next/router'

/**
 *
 * @param {Session} session Session que l'on créer côté serveur en fonction de l'utilisateur connecté.
 * @returns
 */
export default function User({ session }) {
  console.log('user')
  console.log(session)
  // On va vérifier que la page auxquels on va accéder à chaque fois que l'on clique sur un lien existe dans notre app (réduit les soucis erreurs).
  const router = useRouter()

  const isActive = (pathname) => {
    // Attend un string
    router.pathname === pathname
  }

  let composant_User = null

  if (!session) {
    // si user est null alors on lui propose de se connecter en utilisant Link de NextJS qui va pré-fetch la page pour afficher plus rapidement.
    composant_User = (
      <Link href="/api/auth/signin">
        <a data-active={isActive('/signup')}>Log In</a>
      </Link>
    )
  }
  if (session) {
    // Si l'utilisateur n'a pas d'image de profile on lui en met une par défaut.
    let image_profile = session.user.image ? session.user.image : profilePicture
    // Si on est connecté on affiche le nom de l'utilisateur.
    // Si l'utilisateur a une photo attaché à son compte on l'affiche sinon doge.
    composant_User = (
      <div className="profile-section absolute bottom-0 w-full">
        <Link href="/account" passHref>
          <a className="mb-8 mt-6 flex w-full flex-row items-center rounded-lg fill-neutral-500 pl-4 text-neutral-500 hover:bg-black hover:fill-white hover:text-white dark:text-dark-white">
            {/* Ici pour src on verra pour récupérer l'image de l'utilisateur via la bdd. */}
            <img
              className="mr-8 aspect-square h-14 w-14 rounded-full object-cover"
              src={image_profile}
              height="100%"
              width="100%"
              alt="Image profil"
            />
            <p className="mr-8 font-sans text-lg">{session.user.name}</p>
            <IconContext.Provider
              value={{ color: 'blue', className: 'global-class-name' }}
            >
              <div>
                <GrFormNext color="red" className="h-8 w-8" />
              </div>
            </IconContext.Provider>
          </a>
        </Link>
      </div>
    )
  }
  return <>{composant_User}</>
}
