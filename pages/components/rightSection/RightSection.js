//test pochette album
import albumCover from '/public/test-img/cover.jpg'
import Tags from '../tags/Tags'

//react-icons components
import {GrAddCircle} from 'react-icons/gr'

const tagslist = [{tags:"Chill Hits"},
                  {tags:"Accoustic"},
                  {tags:"Blues"},
                  {tags:"Jazz"},
                  {tags:"Rock"},
                  {tags:"06"},
                  {tags:"07"},
                  {tags:"08"},
                  {tags:"09"},
                  {tags:"10"},
                  {tags:"11"},
                  {tags:"12"}];

function RightSection(){
    return(
        <div className="rightSection basis-2/12 h-screen relative border-2">
            <p className=' md:font-serif text-xl font-semibold text-center pt-12 pb-8'>#Tags</p>
            <div className='flex'>
                <Tags tagslist={tagslist}/>
            </div>
            
            <div className="infos-music-playing absolute inset-x-0 bottom-0 p-6 m-6 flex flex-col items-center gap-2 rounded-3xl bg-white drop-shadow-2xl">
                <img id='music-cover' className='aspect-square w-full rounded-3xl' src={albumCover.src} alt="cover music playing"></img>
                
                <div className='infos-music w-full'>
                    <span>
                        <p id='music-title' className='font-sans text-lg font-semibold'>Till It's Gone</p>
                        <p id='music-artist' className='font-sans text-neutral-500'>Yelawolf</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RightSection
