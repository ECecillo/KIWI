//Renvoie une chaine de caracteres contenant la durée du titre convertie au format mm:ss.
function msToMin(ms){
    let m = Math.trunc(ms/60000);
    let s = Math.round(60*((ms/60000)-m));
    if(s<10){
        s = "0" + s;
    }
    return m + ":" + s;
}

function MusicInfos(props){
    const songs = props.playlist;
    //console.log(typeof(songs));
    return(
        <div className="scrollbar-hide overflow-y-auto overflow-x-hidden h-3/5 "> {/*  modif: h-3/5  ====> h-2/5 || edit: reverse car template tendance utilisé pour afficher les playlists */}
            {songs.map((elmt, index) => (
            <div id={elmt.track.id} className="music-infos grid grid-cols-5 items-center rounded-lg font-sans text-lg select-none px-5 bg-transparent h-14 hover:text-white hover:bg-violet-900" key={`${elmt}-${index}`}>
                {/*Chaque titre est contenu dans une div ayant pour id l'id du titre.*/}
                <p>00</p>
                <p className="w-full overflow-hidden truncate pr-5">{elmt.track.name}</p>
                <p className="w-full overflow-hidden truncate pr-5">{elmt.track.artists[0].name}</p>
                <p>{msToMin(elmt.track.duration_ms)}</p>
                <p className="hidden md:block w-full overflow-hidden truncate pr-5">{elmt.track.album.name}</p>
            </div>
            ))}
        </div>
    )
};


export default MusicInfos;