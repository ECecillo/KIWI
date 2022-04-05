import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

function addProvider({ name, image }) {
    return (
        <div className='flex flex-col justify-center items-center'>
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