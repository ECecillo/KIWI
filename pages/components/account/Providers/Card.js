import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

/**
 *
 * @param {String} name - Le Nom du Provider dont on s'occupe.
 * @param {String} image - Image du Provider que l'on affiche.
 * @param {String Array} droits - Droits que l'utilisateur a accepté pour générer un Access Token.
 * @param {String} account_id - ID du Compte de l'utilisateur que l'on stock dans la BDD.
 * @returns Carte qui donne une partie des informations que l'on a sur l'utilisateur (Droits et Account ID)
 */
function Card({ name, image, droits, account_id }) {
  // Selon le provider passé en paramètre on va lui mettre une couleur différente.
  const brand =
    name === 'Google'
      ? 'bg-red-900 drop-shadow-[0_15px_15px_rgba(255,0,0,0.20)]'
      : 'bg-green-900 drop-shadow-[0_15px_15px_rgba(0,255,0,0.20)]'
  const brandBorder = name === 'Spotify' ? 'border-green-900' : 'border-red-900'

  // Composant qui va parcourir le tableau de droits
  const Permissions = droits.map((droit, index) => (
    <div key={droit}>
      <p className="ml-3">{droit}</p>
    </div>
  ))

  return (
    <div
      className={`mx-2 grid grid-rows-[0.4fr_0.1fr_0.1fr] gap-4 rounded-3xl border-2 ${brandBorder} dark:bg-transparent`}
    >
      {/* Image Google */}
      <div className={`flex rounded-t-2xl ${brand} h-1/2 w-full`}>
        <span className={'mx-auto mt-2'}>
          <Image src={image} width={'100%'} height={'100%'} />
        </span>
      </div>
      {/* Access token section */}
      <section
        aria-labelledby="access-token"
        className="flex flex-none flex-col text-dark-black dark:text-dark-white"
      >
        <h2 id="access-token" className="mb-3 text-center">
          ID Compte
        </h2>
        <p className="text-center">{account_id}</p>
      </section>
      {/* Droits */}
      {/* <section aria-labelledby='droits' className='mx-3'>
                <h2 id="droits">Permissions</h2>
                {Permissions}
            </section> */}
      {/* Déconnecter / Supprimer le Provider */}

      <button className="duration-400 mx-auto my-2 rounded-full border-2 p-1 transition ease-in-out dark:border-white dark:bg-dark-soft-black hover:dark:bg-red-600">
        <AiOutlineClose size={'1.5rem'} />
      </button>
    </div>
  )
}

export default Card
