//test pochette album
import albumCover from '/public/test-img/cover.jpg'

//react-icons components
import {GrAddCircle} from 'react-icons/gr'

function RightSection(){
    return(
        <div className="rightSection basis-1/5 h-screen relative bg-violet-100">
            
            <div className="infos-music-playing absolute inset-x-0 bottom-0 p-6 m-8 flex flex-col items-center gap-2 rounded-3xl bg-white">
                <img id='music-cover' className='aspect-square w-full rounded-3xl' src={albumCover.src} alt="cover music playing"></img>
                
                <div className='infos-music w-full flex flex-row justify-between items-start'>
                    <span>
                        <p id='music-title' className='font-sans text-lg font-semibold'>Till It's Gone</p>
                        <p id='music-artist' className='font-sans text-neutral-500'>Yelawolf</p>
                    </span>
                    <button id="add-song" className='text-xl mt-1'>
                        <GrAddCircle/>
                    </button>
                </div>
                

            </div>


        </div>
    )
}

export default RightSection