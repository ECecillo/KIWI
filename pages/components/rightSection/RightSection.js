//test pochette album
import albumCover from '/public/test-img/cover.jpg'
import Tags from '../tags/Tags'

const tagslist = [{tag:"❄️ Chill Hits"},
                  {tag:"⭐ Hop"},
                  {tag:"🎸 Accoustic"},
                  {tag:"🎵 Indie Pop"},
                  {tag:"🎹 Piano Blues"},
                  {tag:"🎺 Jazz"},
                  {tag:"⚡ Electro"}];

function RightSection(){
    return(
        <div className="rightSection basis-2/12 h-screen relative mr-6 py-6 border-2">
            <p className='font-sans text-2xl font-semibold mb-5'>Shortcuts</p>
            <Tags tagslist={tagslist}/>

            <div className="infos-music-playing absolute inset-x-0 bottom-0 p-6 mb-6 flex flex-col items-center gap-2 rounded-3xl bg-white drop-shadow-2xl">
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
