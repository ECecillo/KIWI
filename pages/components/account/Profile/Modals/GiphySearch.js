/* This example requires Tailwind CSS v2.0+ */
import { useContext } from 'react'
import { useRecoilState } from 'recoil'
import { imageState, infoHasChanged } from '../../../../../atoms/userAtom'
import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
  SuggestionBar, // an optional UI component that displays trending searches and channel / username results
} from '@giphy/react-components'

//https://github.com/Giphy/giphy-js/blob/master/packages/react-components/README.md#search-experience$

// Comme on doit faire intervenir un Manager pour ce composant j'ai préféré isoler le composant.
export function GiphySearch({ onClose }) {
  return (
    <SearchContextManager
      apiKey={'6oRKrT62iGZnk51TXI7MiaQkaJ0nzyrn'}
      theme={{ mode: 'dark' }}
    >
      <Components onClose={onClose} />
    </SearchContextManager>
  )
}

export function Components({ onClose }) {
  // Utilise le module @giphy/js-fetch-api pour récupérer les gifs.
  const [userImage, setUserImage] = useRecoilState(imageState) // State globale que l'on va changer lorsque l'on appuiera sur le submit.
  const [hasChanged, sethasChanged] = useRecoilState(infoHasChanged)

  const { fetchGifs, searchKey } = useContext(SearchContext)

  const toggleModal = () => {
    onClose() // On dit au parent profil.js que l'on a fermé tous les modales.
  }
  const handleNewImage = (userUrl) => {
    setUserImage(userUrl) // setState(url) --> userImage.
    sethasChanged(true)
    toggleModal()
  }

  return (
    <>
      <SearchBar className="mb-5 mt-4 rounded-md" />
      <SuggestionBar />
      <div className="max-h-80 overflow-y-auto overflow-x-hidden">
        <Grid
          key={searchKey}
          gutter={10}
          columns={2}
          width={550}
          fetchGifs={fetchGifs}
          noLink={true}
          borderRadius={6}
          onGifClick={(gif, event) => {
            handleNewImage(gif.images.downsized.url)
          }}
        />
      </div>
    </>
  )
}
