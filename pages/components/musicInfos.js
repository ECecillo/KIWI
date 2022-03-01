function MusicInfos(props){
    const songs = props.playlist;
    console.log(typeof(songs));
    return(
        <div>
            {songs.map((elmt, index) => (
            <div className="music-infos grid grid-cols-5 items-center font-sans text-lg px-5 bg-transparent h-14 text-neutral-500 hover:text-black hover:bg-white rounded-lg hover:shadow-md hover:shadow-violet-200" key={`${elmt}-${index}`}>
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