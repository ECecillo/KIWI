import SearchBar from './SearchBar'
import MediaPlayer from './MediaPlayer';

function Content(){
    return(
        <div className="content bg-orange-300 basis-3/5">
            div 
            <SearchBar/>
            <p>Ma super playlist</p>
            
                <MediaPlayer bottom= {0.625} />
           
          
            

        </div>
    )
}

export default Content;