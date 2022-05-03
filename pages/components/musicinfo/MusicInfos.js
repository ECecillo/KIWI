//Renvoie une chaine de caracteres contenant la durée du titre convertie au format mm:ss.
function msToMin(ms) {
  let m = Math.trunc(ms / 60000)
  let s = Math.round(60 * (ms / 60000 - m))
  if (s < 10) {
    s = '0' + s
  }
  return m + ':' + s
}

function MusicInfos(props) {
  const songs = props.playlist
  //console.log(typeof(songs));
  return (
    <div className="h-3/5 overflow-y-auto overflow-x-hidden scrollbar-hide">
      {' '}
      {/*  modif: h-3/5  ====> h-2/5 || edit: reverse car template tendance utilisé pour afficher les playlists */}
      {songs.map((elmt, index) => (
        <div
          id={elmt.track.id}
          className="music-infos grid h-14 select-none grid-cols-5 items-center rounded-lg bg-transparent px-5 font-sans text-lg  hover:bg-gray-200 dark:text-neutral-400 dark:hover:bg-neutral-700"
          key={`${elmt}-${index}`}
        >
          {/*Chaque titre est contenu dans une div ayant pour id l'id du titre.*/}
          <p></p>
          <p className="w-full overflow-hidden truncate pr-5">
            {elmt.track.name}
          </p>
          <p className="w-full overflow-hidden truncate pr-5">
            {elmt.track.artists[0].name}
          </p>
          <p>{msToMin(elmt.track.duration_ms)}</p>
          <p className="hidden w-full overflow-hidden truncate pr-5 md:block">
            {elmt.track.album.name}
          </p>
        </div>
      ))}
    </div>
  )
}

export default MusicInfos
