import logo from '../../../public/kiwi_full_logo.png'

//test profile picture
import User from "./userElement/User";
// react-icons components
import { MdHomeFilled, MdFavorite } from 'react-icons/md'
import { AiOutlineLineChart } from 'react-icons/ai'
import { IoGrid } from 'react-icons/io5'
import { FaUserFriends } from 'react-icons/fa'


function NavBar() {
    const elmtList = [
        ["Accueil", <MdHomeFilled />],
        ["Tendances", <AiOutlineLineChart />],
        ["Favoris", <MdFavorite />],
        ["Playlists", <IoGrid />],
        ["Amis", <FaUserFriends />]
    ];

    return (
        <div className='navbar flex flex-col basis-1/6 h-screen divide-y-2 divide-slate-200 relative '>
            <div className='menu'>
                {/* Logo */}
                <div className='logo mb-20 mt-5 ml-5 w-3/4'>
                    <img src={logo.src} className="App-logo" alt="logo" />
                </div>
                {/* Links */}
                {elmtList.map((elmt, index) => (
                    <div className='element flex flex-row items-center h-12 my-1 ml-4 rounded-xl text-lg text-neutral-500 hover:bg-black fill-neutral-500 hover:text-white hover:fill-white lg:pl-5' key={`${elmt}-${index}`}>
                        <span className='text-2xl mr-4'>
                            {elmt[1]}
                        </span>
                        <p className='font-sans'>
                            {elmt[0]}
                        </p>
                    </div>
                ))}
            </div>
            {/* User */}
            <User />
        </div>
    )
}

export default NavBar;
