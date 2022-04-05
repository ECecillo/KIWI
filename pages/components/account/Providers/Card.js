import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import prisma from '../../../../lib/prisma';
import { scopes } from '../../../../lib/spotify';

export async function getStaticProps(context) {
    const {data: session, status} = getSession();
    const spotify_scope = scopes.split(','); // On retourne un tableau où chaque élément est une des perms que l'on a demandé.

    // On récupère le nom / id de l'utilisateur utilisé pour son compte.
    const { [0]: spotify_tokens, [1]: google_tokens } = await prisma.account.findMany({
        where: {
            userId: session.user.userId,
        },
        select: {
            providerAccountId: true,
        }
    });
    console.log(spotify_tokens);
    console.log(goog);
    return {
        props: {
            spotify: {

            },

        }, // will be passed to the page component as props
    }
}


function Card({ name, image, droits }) {
    // Selon le provider passé en paramètre on va lui mettre une couleur différente.
    const brand = (name === "Google"
        ? "bg-red-900 drop-shadow-[0_15px_15px_rgba(255,0,0,0.20)]"
        : "bg-green-900 drop-shadow-[0_15px_15px_rgba(0,255,0,0.20)]");
    const brandBorder = name === "Spotify"
        ? 'border-green-900'
        : 'border-red-900';


    return (
        <div className={`grid grid-rows-[0.5fr_0.1fr_0.5fr_0.5fr] mx-2 gap-4 rounded-2xl border-2 ${brandBorder}`}>
            {/* Image Google */}
            <div className={`flex rounded-t-2xl ${brand} w-full h-1/2`} >
                <span className={"mx-auto"}>
                    <Image src={image} width={"100%"} height={"100%"} />
                </span>
            </div>
            {/* Access token section */}
            <section aria-labelledby='access-token' className='mx-3 flex flex-col flex-none'>
                <h2 id="access-token">ID Compte</h2>
                <p></p>
            </section>
            {/* Droits */}
            <p>{droits}</p>
            {/* Déconnecter / Supprimer le Provider */}
            <button className='bg-dark-soft-black rounded-full mx-auto my-auto p-1 border-2 border-violet-800'>
                <AiOutlineClose size={"1.5rem"} />
            </button>
        </div>
    )
}

export default Card