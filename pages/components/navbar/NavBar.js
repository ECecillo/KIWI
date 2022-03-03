import logo from '../../../public/kiwi_full_logo.png'

//test profile picture
import profilePicture from '../../../public/test-img/doge.jpg'

// react-icons components
import {MdHomeFilled, MdFavorite} from 'react-icons/md'
import {AiOutlineLineChart} from 'react-icons/ai'
import {IoGrid} from 'react-icons/io5'
import {FaUserFriends} from 'react-icons/fa'
import {GrFormNext} from 'react-icons/gr'

function NavBar(props) {
    const elmtList = [["Accueil",<MdHomeFilled/>], ["Tendances",<AiOutlineLineChart/>], ["Favoris",<MdFavorite/>], ["Playlists",<IoGrid/>], ["Amis", <FaUserFriends/>]]
    return(
        <div className='navbar basis-1/5 h-screen divide-y-2 divide-slate-200 relative'>
            <div className='menu'>
                <div className='logo mb-20'>
                    <img src={logo.src} className="App-logo" alt="logo" />
                </div>

                {elmtList.map((elmt, index) => (
                    <div className='element flex flex-row items-center h-12 my-1 ml-10 rounded-xl text-lg text-neutral-500 hover:bg-black fill-neutral-500 hover:text-white hover:fill-white pl-5' key={`${elmt}-${index}`}>
                        <span className='text-2xl mr-4'>
                            {elmt[1]}
                        </span>
                        <p className='font-sans'>
                            {elmt[0]}
                        </p>
                    </div>
                ))}
            </div>
            
            <div className='profile-section absolute inset-x-0 bottom-0 pl-10'>
                <button className='flex flex-row items-center pl-4 mb-8 mt-6 text-neutral-500 fill-neutral-500 hover:fill-white hover:text-white hover:bg-black rounded-lg w-full'>
                    <img className='rounded-full aspect-square h-14 mr-4' src={profilePicture.src} alt='profile'/>
                    <p className='font-sans text-lg mr-8'>Mike Hawk</p>
                    <span className='text-2xl'>
                        <GrFormNext/>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default NavBar;
