import { BsSkipBackwardFill } from 'react-icons/bs'
import { BsSkipForwardFill } from 'react-icons/bs'
import { BsShuffle } from 'react-icons/bs'
import { BsVolumeDownFill } from 'react-icons/bs'
import { BsVolumeUpFill } from 'react-icons/bs'
import { AiOutlineRetweet } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'





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
                            {/*<div class="bg-slate-600 w-1/2 h-2" role="progressbar" aria-label="music progress" aria-valuenow="1250" aria-valuemin="0" aria-valuemax="4550"></div>*/}
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


export default MediaPlayer
