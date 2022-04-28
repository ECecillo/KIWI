//test pochette album
import albumCover from '/public/test-img/cover.jpg'
import Tags from '../tags/Tags';
import Video from "./VignetteYoutube/Video";

const tagslist = [{ id: 10010, tag: "❄️ Chill Hits" },
{id: 108, tag: "⭐ Hop" },
{id: 1210, tag: "🎸 Accoustic" },
{id: 110, tag: "🎵 Indie Pop" },
{id: 1012, tag: "🎹 Piano Blues" },
{id: 1010, tag: "🎺 Jazz" },
{id: 270, tag: "⚡ Electro" }];

function RightSection() {
    return (
        <div className="rightSection basis-2/12 h-screen relative mr-6 py-6 hidden lg:block">
            <p className='font-sans text-2xl font-semibold mb-5'>Shortcuts</p>
            <Tags tagslist={tagslist} />

            <div className="infos-music-playing absolute inset-x-0 bottom-0 p-6 mb-6 flex flex-col items-center gap-2 rounded-3xl bg-[#ffffff] drop-shadow-2xl">
                {/* <img id='music-cover' className='aspect-square w-full rounded-3xl' src={albumCover.src} alt="cover music playing"></img>
                
                <div className='infos-music w-full'>
                    <span>
                        <p id='music-title' className='font-sans text-lg font-semibold'>Till It's Gone</p>
                        <p id='music-artist' className='font-sans text-neutral-500'>Yelawolf</p>
                    </span>
                </div> */}
                <Video />
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
