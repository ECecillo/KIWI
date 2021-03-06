import baseImage from '../../../public/test-img/doge.jpg'
import { MdHomeFilled, MdFavorite } from 'react-icons/md'
import { AiOutlineLineChart } from 'react-icons/ai'
import { IoGrid } from 'react-icons/io5'
import { useRecoilValue } from 'recoil'
import { sessionState } from '../../../atoms/userAtom'

function NavBarMobile({ session }) {
  //const {user, ...session} = useRecoilValue(sessionState);
  const profilePicture =
    session?.user?.image === '' ? baseImage : session?.user?.image

  return (
    <div className="grid basis-1/12 grid-cols-5 py-2 text-xs dark:bg-dark-soft-black dark:text-white md:hidden">
      <div>
        <a href="/" className="flex flex-col items-center justify-center">
          <MdHomeFilled className="h-8 w-8" />
          <p className="mt-1">Home</p>
        </a>
      </div>
      <div>
        <a href="/trends" className="flex flex-col items-center justify-center">
          <AiOutlineLineChart className="h-8 w-8" />
          <p className="mt-1">Tendances</p>
        </a>
      </div>
      <div className="flex justify-center">
        <img
          className="aspect-square h-14 w-14 rounded-full"
          src={profilePicture}
          alt="profile picture"
        ></img>
      </div>
      <div>
        <a
          href="/favorites"
          className="flex flex-col items-center justify-center"
        >
          <MdFavorite className="h-8 w-8" />
          <p className="mt-1">Favoris</p>
        </a>
      </div>
      <div>
        <a
          href="/playlists"
          className="flex flex-col items-center justify-center"
        >
          <IoGrid className="h-8 w-8" />
          <p className="mt-1">Playlists</p>
        </a>
      </div>
    </div>
  )
}

export default NavBarMobile
