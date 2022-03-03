import { BsSkipBackwardFill } from 'react-icons/bs'
import { BsSkipForwardFill } from 'react-icons/bs'
import { BsShuffle } from 'react-icons/bs'
import { BsVolumeDownFill } from 'react-icons/bs'
import { BsVolumeUpFill } from 'react-icons/bs'
import { AiOutlineArrowsAlt } from 'react-icons/ai'
import { AiOutlineRetweet } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'
import { GiPlayButton } from 'react-icons/gi'




function MediaPlayer() {
    return (
        <div class=" relative shadow rounded ">

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


                    <button type="button" class="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center" aria-label="Pause">
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






                    <BsVolumeUpFill size={20} color="black" />

                </div>
            </div>


            <div class="bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-b-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">

                <div class="space-y-2">
                    <div class="relative">
                        <div class="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div class="bg-cyan-500 dark:bg-cyan-400 w-1/2 h-2" role="progressbar" aria-label="music progress" aria-valuenow="1456" aria-valuemin="0" aria-valuemax="4550"></div>
                        </div>
                        <div class="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
                            <div class="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
                        </div>
                    </div>
                    <div class="flex justify-between text-sm leading-6 font-medium tabular-nums">
                        <div class="text-slate-500 dark:text-slate-400">75:50</div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default MediaPlayer
