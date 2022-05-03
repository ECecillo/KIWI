import Logo from '../../../public/logo_kiwi.png';

//test profile picture
import User from "./userElement/User";
// react-icons components
import { MdHomeFilled, MdFavorite } from 'react-icons/md'
import { AiOutlineLineChart } from 'react-icons/ai'
import { IoGrid } from 'react-icons/io5'
import { FaUserFriends } from 'react-icons/fa'
import Link from 'next/link';


function NavBar({ session }) {

    const elmtList = [
        { name: "Accueil", icon: <MdHomeFilled />, link: "/" },
        { name: "Tendances", icon: <AiOutlineLineChart />, link: "/trends" },
        { name: "Favoris", icon: <MdFavorite />, link: "/favorites" },
        { name: "Playlists", icon: <IoGrid />, link: "playlists" },
        { name: "Amis", icon: <FaUserFriends />, link: "/friends" },
    ];

    console.log(session);

    return (
        <div className='navbar hidden md:flex flex-col basis-1/6 h-screen divide-y-2 divide-slate-200 dark:bg-[#042119] relative'>
            <div className='menu'>
                {/* Logo */}
                <a href='/'>
                <div className='logo mb-20 mt-5 ml-5 w-3/4 h-30 flex flex-row'>
                    <span className='basis-1/2'>
                        <img src={Logo.src} className="pb-2" alt="logo" />
                    </span>
                    <span className='basis-1/2 flex flex-col justify-end pl-3'>
                        <span className='h-1/2'>
                            <p className='uppercase h-full text-[2vw] logo-text font-semibold tracking-[1vh] dark:text-white'>Kiwi</p>
                        </span>
                        
                    </span>
                    
                </div>
                </a>
                {/* Links */}
                {elmtList.map((elmt, index) => (
                    <a href={elmt.link}>
                        <div className='element flex flex-row items-center h-12 my-1 ml-4 rounded-xl text-lg text-neutral-500 dark:text-neutral-300 hover:bg-black fill-neutral-500 hover:text-white hover:fill-white lg:pl-5' key={`${elmt}-${index}`}>
                            <span className='text-2xl mr-4'>
                                {elmt.icon}
                            </span>
                            <p className='font-sans'>
                                {elmt.name}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
            {/* User */}
            <User session={session} />
        </div>
    )
}

export default NavBar;
