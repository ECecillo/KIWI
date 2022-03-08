//svg from react-icons
import {AiOutlineSearch} from 'react-icons/ai'

function SearchBar(){
    return(
        <div class='w-full flex justify-center p-6'>
            <div class="relative flex items-center w-4/6  rounded-full focus-within:shadow-lg bg-white overflow-hidden">
                <div class="grid place-items-center h-full text-gray-300">
                    <AiOutlineSearch className='h-10 w-10 ml-5 mr-3'/>
                </div>
                <input class="peer h-14 w-full outline-none text-neutral-500 pr-2 font-sans" type="search" id="search" placeholder="Rechercher un titre, un album, un artiste..." /> 
            </div>
        </div>
    )
};

export default SearchBar;