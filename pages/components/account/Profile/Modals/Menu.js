/* This example requires Tailwind CSS v2.0+ */
import { AiOutlineGif } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';

export function ChangeImageModal({ handleUrlModal, handleGiphyModal }) {

    return (
        <>
            <div className="mt-5 flex flex-row">
                {/* Ajouter un lien vers une image */}
                <div className='flex flex-col justify-items-center text-center bg-neutral-400 mr-2 w-1/2 rounded-md ease-in duration-200 hover:drop-shadow-[0_35px_35px_rgba(0,125,255,0.25)]'>
                    <button className='my-0 mx-auto' onClick={handleUrlModal}>
                        {/* Image */}
                        <div className='ease-in duration-200 hover:scale-105 dark:bg-dark-white p-9 rounded-full my-4 w-fit' >
                            <BiImageAdd color='black' className='w-10 h-10' />
                        </div>
                    </button>
                    {/* Texte en dessous */}
                    <p className='dark:text-dark-white font-semibold'>
                        Ajouter mon lien
                    </p>
                </div>
                {/* Rechercher sur Imgur Giphy */}
                <div className="flex flex-col justify-items-center text-center bg-neutral-400 ml-2 w-1/2 rounded-md hover:drop-shadow-[0_35px_35px_rgba(0,125,255,0.25)]">
                    <button className='ease-in duration-200 hover:scale-105 my-0 mx-auto'
                        type="button"
                        data-modal-toggle="defaultModal"
                        onClick={handleGiphyModal}>
                        {/* Image */}
                        <div className='dark:bg-dark-white p-9 rounded-full my-4 w-fit'>
                            <AiOutlineGif color='black' className=' w-10 h-10' />
                        </div>
                    </button>
                    {/* Texte pour Imgur */}
                    <p className='dark:text-dark-white font-semibold mb-4'>
                        Rechercher sur Giphy
                    </p>
                </div>
            </div></>
    );
};

//bg-dark-soft-black