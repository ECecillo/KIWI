
function Tendency(props){
    const music = props.tendance;
    console.log(typeof(music));
    return(

        <div className=" relative p-4 bg white flex">
            <div className="flex flex-wrap ">
                    {music.map((elmt, index) => (

                    <div className="p-2 " key={`${elmt}-${index}`}>
                        <div className="mb-2 h-full w-48  border rounded cursor-pointer border-neutral-100  hover:text-white hover:bg-violet-900 hover:shadow-2xl" > 
                            <div className="relative  p-2 pb-0 rounded ">
                                <div className=" top-0 right-0 left-0 pb-0 rounded-t ">
                                    <img id='music-cover' className='aspect-square w-full ' src={elmt.cover} alt="cover tendency"></img>
                                    <div className='infos-music w-full flex flex-row justify-between items-start'>
                                        <span>
                                            <p id='music-title' className='font-sans text-lg font-semibold ml-3'>{elmt.title}</p>
                                            <p id='music-artist' className='font-sans text-neutral-500 ml-3'>{elmt.artist}</p>
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}       
            </div>
        </div>
    )
}

export default Tendency;