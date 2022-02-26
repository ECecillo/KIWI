//svg from react-icons
import {AiOutlineSearch} from 'react-icons/ai'

function SearchBar(){
    return(
        <div class='w-full flex justify-center mt-3'>
            <div class="relative flex items-center w-4/6  rounded-full focus-within:shadow-lg bg-white overflow-hidden">
                <div class="grid place-items-center h-full text-gray-300">
                    <AiOutlineSearch className='h-10 w-10 ml-5 mr-3'/>
                </div>
                <input class="peer h-14 w-full outline-none text-neutral-500 pr-2" type="search" id="search" placeholder="Rechercher un titre, un album, un artiste..." /> 
            </div>
        </div>
    )
};

/*
<div className="flex justify-center bg-violet-100">
            <label className='w-full flex justify-center relative'>
                <input className='w-4/6 h-16 px-10 text-2xl placeholder:text-zinc-400 rounded-full' type={type} placeholder="Rechercher une musique, un album, ..." ></input>                        
            </label>
        </div>
*/


//<AiOutlineSearch className='w-8 h-8'/>

export default SearchBar;