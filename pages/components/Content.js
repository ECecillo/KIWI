import SearchBar from './SearchBar'
import MusicInfos from './musicInfos'

//test affichage en attente back-end
//id, title, artist, duration, album
const playlist = [{id:"01", title:"Heat Waves", artist:"Glass Animals", duration:"3:59", album:"Dreamlands"},
                  {id:"02", title:"MAMIII", artist:"Becky G", duration:"3:46", album:"MAMIII"},
                  {id:"03", title:"Cold Heart - PNAU Remix", artist:"Elton John, Dua Lipa", duration:"3:23", album:"The Lockdown Sessions"},
                  {id:"04", title:"INDUSTRY BABY", artist:"Lil Nas X, Jack Harlow", duration:"3:32", album:"MONTERO"},
                  {id:"05", title:"Esay On Me", artist:"Adele", duration:"3:45", album:"30"},
                  {id:"06", title:"Woman", artist:"Doja Cat", duration:"2:53", album:"Planet Her"},
                  {id:"07", title:"Jefe", artist:"Ninho", duration:"2:58", album:"Jefe"}];

function Content(){
    return(
        <div className="content bg-violet-100 basis-3/5 p-8">
            <SearchBar/>
            <p className='font-sans text-4xl font-semibold my-8 pt-5 pb-2 '>Ma super playlist</p>

            <div className='music-infos grid grid-cols-5 font-sans select-none uppercase text-neutral-500 text-md px-5 pb-5'>
                <p className=''>#</p>
                <p>Titre</p>
                <p>Artiste</p>
                <p>Durée</p>
                <p>Album</p>
            </div>

            <MusicInfos playlist={playlist}/>
        </div>
    )
}

export default Content;