//svg from react-icons
import { useRef } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

// Encapsuler dans un Fichier.
async function youtubeSearchMusic(music) {
  try {
    const response = await fetch('/api/youtube/search/' + music, {
      method: 'GET',
    })
    console.log('Hello there youtubeSearchMusic', response)
    return response.status === 200 ? response.json() : console.log(response)
  } catch (error) {
    console.log('Bruh', error)
    return false
  }
}

function SearchBar({ setResult }) {
  const input = useRef(null)

  const handleSearch = () => {
    youtubeSearchMusic(input.current.value).then((response) => {
      const data = response
      setResult(data)
    })
  }
  return (
    <div className="flex w-full justify-center">
      <div className="relative flex w-4/6 items-center  overflow-hidden rounded-full bg-white focus-within:shadow-lg">
        <button onClick={handleSearch}>
          <div className="grid h-full place-items-center text-gray-300">
            <AiOutlineSearch className="ml-5 mr-3 h-10 w-10" />
          </div>
        </button>
        <input
          className="peer h-14 w-full pr-2 font-sans text-neutral-500 outline-none"
          type="search"
          id="search"
          placeholder="Rechercher un titre, un album, un artiste..."
          ref={input}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
    </div>
  )
}

export default SearchBar
