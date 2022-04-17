import {BsFillSkipBackwardFill} from 'react-icons/bs';
import {BsFillSkipForwardFill} from 'react-icons/bs';
import {MdPauseCircle} from 'react-icons/md';
import {IoRepeatOutline} from 'react-icons/io5';
import {IoShuffleOutline} from 'react-icons/io5';
import {MdPlaylistAdd} from 'react-icons/md';
import {FiVolume1} from 'react-icons/fi';
import {FiVolume2} from 'react-icons/fi';
import {MdFavoriteBorder} from 'react-icons/md';
import {MdZoomOutMap} from 'react-icons/md';
import useSpotify from '../../../hooks/useSpotify';

function MediaPlayer() {
    const spotifyApi = useSpotify();
    return (
        <div className='bg-white rounded-3xl absolute bottom-6 w-full px-6 py-4'>
            <div className='flex flex-row w-full items-center mb-3'>
                <span className='w-1/12'></span>
                <span className='hidden md:flex w-3/12 justify-center'>
                    <button className='bg-gray-200 rounded-md mr-2'>
                        <MdPlaylistAdd className='h-8 w-8'/>
                    </button>
                    <button className='bg-gray-200 rounded-md ml-2'>
                        <MdFavoriteBorder className='h-8 w-8'/>
                    </button>
                </span>
                <span className='flex flex-row w-10/12 md:w-4/12 justify-around'>
                    <button>
                        <IoShuffleOutline className='h-6 w-6'/>
                    </button>
                    <button>
                        <BsFillSkipBackwardFill className='h-6 w-6' onClick={spotifyApi.skipToPrevious()}/>
                    </button>
                    <button>
                        <MdPauseCircle className='h-12 w-12'/>
                    </button>
                    <button>
                        <BsFillSkipForwardFill className='h-6 w-6'/>
                    </button>
                    <button>
                        <IoRepeatOutline className='h-6 w-6'/>
                    </button>       
                </span>
                
                <span className='hidden md:flex flex-row w-0 md:w-3/12 justify-center items-center px-10'>
                    <FiVolume1 className='h-5 w-5'/>
                    <input className='mx-2' type="range" min="0" max="1" step="0.1"></input>
                    <FiVolume2 className='h-6 w-6'/>
                </span>
                <span className='w-1/12 flex items-center justify-end'>
                    <button className='md:hidden rounded-md mr-2'>
                        <MdZoomOutMap className='h-5 w-5'/>
                    </button>
                </span>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <p>0:43</p>
                <input className='w-10/12 mx-3' type="range" min="0" max="179"  range="1"></input>
                <p>2:59</p>
            </div>
        </div>
    )
}

export default MediaPlayer