
function MusicInfos(props){
    const songs = props.playlist;
    return(
        <div className="scrollbar-hide overflow-y-auto overflow-x-hidden h-96">
            {songs.map((elmt, index) => (
            <div className="music-infos grid grid-cols-5 items-center rounded-lg font-sans text-lg select-none px-5 bg-transparent h-14 hover:text-white hover:bg-gradient-to-br hover:from-fuchsia-900 hover:to-fuchsia-900" key={`${elmt}-${index}`}>
                <p>{elmt.id}</p>
                <p>{elmt.title}</p>
                <p>{elmt.artist}</p>
                <p>{elmt.duration}</p>
                <p>{elmt.album}</p>
            </div>
            ))}
        </div>
    )
};

export default MusicInfos;

