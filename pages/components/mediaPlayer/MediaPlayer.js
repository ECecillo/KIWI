import {BsFillSkipBackwardFill} from 'react-icons/bs';
import {BsFillSkipForwardFill} from 'react-icons/bs';
import {MdPauseCircle} from 'react-icons/md';
import {IoRepeatOutline} from 'react-icons/io5';
import {IoShuffleOutline} from 'react-icons/io5';
import {MdPlaylistAdd} from 'react-icons/md';
import {FiVolume1} from 'react-icons/fi';
import {FiVolume2} from 'react-icons/fi';
import {MdFavoriteBorder} from 'react-icons/md';

function MediaPlayer() {
    return (
        <div className='bg-white rounded-3xl absolute bottom-0 w-full px-6 py-4'>
            <div className='flex flex-row w-full items-center mb-3'>
                <span className='w-1/12'></span>
                <span className='w-3/12 flex justify-center'>
                    <button className='bg-gray-200 rounded-md mr-2'>
                        <MdPlaylistAdd className='h-8 w-8'/>
                    </button>
                    <button className='bg-gray-200 rounded-md ml-2'>
                        <MdFavoriteBorder className='h-8 w-8'/>
                    </button>
                </span>
                <span className='flex flex-row w-4/12 justify-around'>
                    <button>
                        <IoShuffleOutline className='h-6 w-6'/>
                    </button>
                    <button>
                        <BsFillSkipBackwardFill className='h-6 w-6'/>
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
                
                <span className='flex flex-row w-3/12 justify-center items-center px-10'>
                    <FiVolume1 className='h-5 w-5'/>
                    <input className='mx-2' type="range" min="0" max="1" step="0.1"></input>
                    <FiVolume2 className='h-6 w-6'/>
                </span>
                <span className='w-1/12'></span>
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


/*

function MediaPlayer() {
    return (
        <div class="absolute w-4/6 Mediaplayer bottom-2 drop-shadow-2xl rounded p-8 ">
            <div class=" rounded-t-xl flex  items-center bg-[#9ca3af]">
                <div class="  flex-auto flex items-center justify-evenly basis-1/4">

                    <button type="button" aria-label="Add to playlist">
                        <MdPlaylistAdd size={30} color="black" />
                    </button>

                </div>


                <div class=" flex items-center justify-evenly flex-none w-40 h-18 space-x-4 basis-1/2">
                    <button type="button" class="hidden sm:block lg:hidden xl:block" aria-label="repeat">
                        <AiOutlineRetweet size={20} color="black" />
                    </button>

                    <button type="button" class="hidden sm:block lg:hidden xl:block" aria-label="Previous">
                        <BsSkipBackwardFill size={20} color="black" />
                    </button>

                    <button type="button" class="bg-white text-slate-900  flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center" aria-label="Pause">
                        <svg width="30" height="32" fill="currentColor">
                            <rect x="6" y="4" width="4" height="24" rx="2" />
                            <rect x="20" y="4" width="4" height="24" rx="2" />
                        </svg>
                    </button>

                    <button type="button" aria-label="next">
                        <BsSkipForwardFill size={20} color="black" />
                    </button>

                    <button type="button" class="hidden sm:block lg:hidden xl:block" aria-label="random">
                        <BsShuffle size={20} color="black" />
                    </button>
                </div>


                <div class="  flex-auto flex items-center justify-evenly  basis-1/4">

                    <BsVolumeDownFill size={20} color="black" />

                        <div>
                            <input  type="range" id="volume" name="volume" 
                                min="0" max="1" step="0.1" ></input>
                        </div>

                    <BsVolumeUpFill size={20} color="black" />

                </div>
            </div>


            <div class="bg-white border-slate-100  border-b rounded-b-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">

                <div class="space-y-2">
                    <div class="relative ">
                        <div class=" justify-self-auto bg-slate-100  rounded-full overflow-hidden ">
                            {}
                            <input class=" w-full " type="range" id="progressbar" name="progressbar"  min="0" max="4550" step="1"  />
                        </div>
                        
                    </div>
                    <div class="flex justify-between text-sm leading-6 font-medium tabular-nums">
                        <div class="text-slate-500 ">00.00</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

*/