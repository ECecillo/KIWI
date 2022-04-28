//svg from react-icons
import { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

// Encapsuler dans un Fichier.
async function youtubeSearchMusic(music) {
    try {
        const response = await fetch('/api/youtube/search/' + music, {
            method: 'GET'
        });
        console.log("Hello there youtubeSearchMusic" , response);
        return response.status === 200 ? response.json() : console.log(response);
    } catch (error) {
        console.log("Bruh", error);
        return false;
    }
}

function SearchBar({setResult}) {
    const input = useRef(null);

    const handleSearch = () => {
        youtubeSearchMusic(input.current.value).then(response => {
            const data = response;
            setResult(data);  
        });
    };
    return (
        <div className='w-full flex justify-center'>
            <div className="relative flex items-center w-4/6  rounded-full focus-within:shadow-lg bg-white overflow-hidden">
                <button onClick={handleSearch}>
                    <div className="grid place-items-center h-full text-gray-300">
                        <AiOutlineSearch className='h-10 w-10 ml-5 mr-3' />
                    </div>
                </button>
                <input className="peer h-14 w-full outline-none text-neutral-500 pr-2 font-sans" type="search" id="search" placeholder="Rechercher un titre, un album, un artiste..." ref={input} onKeyPress={(e) => e.key === "Enter" && handleSearch()}/>
            </div>
        </div>
    )
};

export default SearchBar;