import Logo from '../../../public/logo_kiwi.png'

//test profile picture
import User from './userElement/User'
// react-icons components
import { MdHomeFilled, MdFavorite } from 'react-icons/md'
import { AiOutlineLineChart } from 'react-icons/ai'
import { IoGrid } from 'react-icons/io5'
import { FaUserFriends } from 'react-icons/fa'
import Link from 'next/link'

function NavBar({ session }) {
  const elmtList = [
    { name: 'Accueil', icon: <MdHomeFilled />, link: '/' },
    { name: 'Tendances', icon: <AiOutlineLineChart />, link: '/trends' },
    { name: 'Favoris', icon: <MdFavorite />, link: '/favorites' },
    { name: 'Playlists', icon: <IoGrid />, link: 'playlists' },
    //{ name: 'Amis', icon: <FaUserFriends />, link: '/friends' },
  ]

  console.log(session)

  return (
    <div className="navbar relative hidden h-screen basis-1/6 flex-col divide-y-2 divide-slate-200 dark:bg-[#042119] md:flex">
      <div className="menu">
        {/* Logo */}
        <a href="/">
          <div className="logo h-30 mb-20 mt-5 ml-5 flex w-3/4 flex-row">
            <span className="basis-1/2">
              <img src={Logo.src} className="pb-2" alt="logo" />
            </span>
            <span className="flex basis-1/2 flex-col justify-end pl-3">
              <span className="h-1/2">
                <p className="logo-text h-full text-[2vw] font-semibold uppercase tracking-[1vh] dark:text-white">
                  Kiwi
                </p>
              </span>
            </span>
          </div>
        </a>
        {/* Links */}
        {elmtList.map((elmt, index) => (
          <a href={elmt.link}>
            <div
              className="element my-1 ml-4 flex h-12 flex-row items-center rounded-xl fill-neutral-500 text-lg text-neutral-500 hover:bg-black hover:fill-white hover:text-white dark:text-neutral-300 lg:pl-5"
              key={`${elmt}-${index}`}
            >
              <span className="mr-4 text-2xl">{elmt.icon}</span>
              <p className="font-sans">{elmt.name}</p>
            </div>
          </a>
        ))}
      </div>
      {/* User */}
      <User session={session} />
    </div>
  )
}

export default NavBar
