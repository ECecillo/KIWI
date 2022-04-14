import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

function addProvider({ name, image }) {
    // Selon le provider passé en paramètre on va lui mettre une couleur différente.
    const brand = (name === "Google"
        ? "hover:drop-shadow-[0_15px_15px_rgba(255,0,0,0.20)]"
        : "hover:drop-shadow-[0_15px_15px_rgba(0,255,0,0.20)]");
    const brandBorder = name === "Spotify"
        ? 'border-green-900'
        : 'border-red-900';

    return (
        <div className={`transition ease-in-out duration-600 flex flex-col justify-center items-center ${brand}`}>
            <Image src={image} width={"100%"} height={"100%"} />
            <Link href={"/login"} passHref>
                <a className='absolute bg-dark-soft-black rounded-full mt-20'>
                    <IoIosAddCircleOutline color={"white"} size={"1.5rem"}/>
                </a>
            </Link>
        </div>
    )
}

export default addProvider