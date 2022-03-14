
function MusicInfos(props){
    const songs = props.playlist;
    //console.log(typeof(songs));
    return(
        <div className="scrollbar-hide overflow-y-auto overflow-x-hidden h-96">
            {songs.map((elmt, index) => (
            <div className="music-infos cursor-pointer grid grid-cols-5 items-center font-sans text-lg select-none px-5 bg-transparent h-14 text-emerald-900 hover:text-black hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 rounded-lg hover:shadow-md hover:shadow-black-600" key={`${elmt}-${index}`}>
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

