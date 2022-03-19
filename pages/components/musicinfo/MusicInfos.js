
function MusicInfos(props){
    const songs = props.playlist;
    //console.log(typeof(songs));
    return(
        <div className="scrollbar-hide overflow-y-auto overflow-x-hidden h-2/5 "> {/*  modif: h-3/5  ====> h-2/5  */}
            {songs.map((elmt, index) => (
            <div className="music-infos grid grid-cols-5 items-center rounded-lg font-sans text-lg select-none px-5 bg-transparent h-14 hover:text-white hover:bg-violet-900" key={`${elmt}-${index}`}>
                <p>{elmt.id}</p>
                <p>{elmt.title}</p>
                <p>{elmt.artist}</p>
                <p>{elmt.duration}</p>
                <p className="hidden md:block">{elmt.album}</p>
            </div>
            ))}
        </div>
    )
};

export default MusicInfos;

//fuchsia-900