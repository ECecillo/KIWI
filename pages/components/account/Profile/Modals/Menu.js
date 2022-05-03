/* This example requires Tailwind CSS v2.0+ */
import { AiOutlineGif } from 'react-icons/ai'
import { BiImageAdd } from 'react-icons/bi'

export function ChangeImageModal({ handleUrlModal, handleGiphyModal }) {
  return (
    <>
      <div className="mt-5 flex flex-row">
        {/* Ajouter un lien vers une image */}
        <div className="mr-2 flex w-1/2 flex-col justify-items-center rounded-md bg-neutral-400 text-center duration-200 ease-in hover:drop-shadow-[0_35px_35px_rgba(0,125,255,0.25)] dark:bg-neutral-700">
          <button className="my-0 mx-auto" onClick={handleUrlModal}>
            {/* Image */}
            <div className="my-4 w-fit rounded-full bg-white p-9 duration-200 ease-in hover:scale-105 dark:bg-dark-white">
              <BiImageAdd color="black" className="h-10 w-10" />
            </div>
          </button>
          {/* Texte en dessous */}
          <p className="font-semibold dark:text-dark-white">Ajouter mon lien</p>
        </div>
        {/* Rechercher sur Imgur Giphy */}
        <div className="ml-2 flex w-1/2 flex-col justify-items-center rounded-md bg-neutral-400 text-center hover:drop-shadow-[0_35px_35px_rgba(0,125,255,0.25)] dark:bg-neutral-700">
          <button
            className="my-0 mx-auto duration-200 ease-in hover:scale-105"
            type="button"
            data-modal-toggle="defaultModal"
            onClick={handleGiphyModal}
          >
            {/* Image */}
            <div className="my-4 w-fit rounded-full bg-white p-9 dark:bg-dark-white">
              <AiOutlineGif color="black" className=" h-10 w-10" />
            </div>
          </button>
          {/* Texte pour Imgur */}
          <p className="mb-4 font-semibold dark:text-dark-white">
            Rechercher sur Giphy
          </p>
        </div>
      </div>
    </>
  )
}

//bg-dark-soft-black
