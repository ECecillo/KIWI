import logo from '../../../public/kiwi_full_logo.png'

//test profile picture
import User from "./../navbar/userElement/User";
// react-icons components
import { MdHomeFilled, MdFavorite } from 'react-icons/md'
import { AiOutlineLineChart } from 'react-icons/ai'
import { IoGrid } from 'react-icons/io5'
import { FaUserFriends } from 'react-icons/fa'
import { useSession } from 'next-auth/react';


function NavBarMobile() {

    const elmtList = [{name:"Accueil", icon:<MdHomeFilled/>, link:"/"},
                      {name:"Tendances", icon:<AiOutlineLineChart/>, link:"/trends"},
                      {name:"Favoris", icon:<MdFavorite/>, link:"/favorites"},
                      {name:"Playlists", icon:<IoGrid/>, link:"playlists"},
                      {name:"Amis", icon:<FaUserFriends/>, link:"/friends"},
    ];

    let user = useSession();
    let profilePicture = user?.data?.user?.image;

    return (
        <div className='md:hidden grid grid-cols-5 py-2 basis-1/12 text-xs'>
            <div>
                <a href="/" className="flex flex-col items-center justify-center">
                    <MdHomeFilled className='h-8 w-8'/>
                    <p className='mt-1'>Home</p>
                </a>
            </div>
            <div>
                <a href='/trends' className='flex flex-col items-center justify-center'>
                    <AiOutlineLineChart className='h-8 w-8'/>
                    <p className='mt-1'>Tendances</p>
                </a>
            </div>
            <div className='flex justify-center'>
                <img className='aspect-square rounded-full h-14 w-14' src={profilePicture} alt="profile picture"></img>
            </div>
            <div>
                <a href='/favorites' className='flex flex-col items-center justify-center'>
                    <MdFavorite className='h-8 w-8'/>
                    <p className='mt-1'>Favoris</p>
                </a>
            </div>
            <div>
                <a href='/playlists' className='flex flex-col items-center justify-center'>
                    <IoGrid className='h-8 w-8'/>
                    <p className='mt-1'>Playlists</p>
                </a>
            </div>

        </div>
        
    )
}

export default NavBarMobile;


/*
<div className='navbar-mobile flex flex-col basis-1/6 h-screen divide-y-2 divide-slate-200 relative '>
            <div className='menu'>
                /* Logo 
                <div className='logo mb-20 mt-5 ml-5 w-3/4'>
                    <img src={logo.src} className="App-logo" alt="logo" />
                </div>
                {/* Links }
                {elmtList.map((elmt, index) => (
                    <a href={elmt.link}>
                        <div className='element flex flex-row items-center h-12 my-1 ml-4 rounded-xl text-lg text-neutral-500 hover:bg-black fill-neutral-500 hover:text-white hover:fill-white lg:pl-5' key={`${elmt}-${index}`}>
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
            {/* User }
            <User />
        </div>
*/