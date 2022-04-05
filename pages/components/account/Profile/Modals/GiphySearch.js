/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { imageState, infoHasChanged } from '../../../../../atoms/userAtom';
import {
    Grid, // our UI Component to display the results
    SearchBar, // the search bar the user will type into
    SearchContext, // the context that wraps and connects our components
    SearchContextManager, // the context manager, includes the Context.Provider
    SuggestionBar, // an optional UI component that displays trending searches and channel / username results
} from '@giphy/react-components';

//https://github.com/Giphy/giphy-js/blob/master/packages/react-components/README.md#search-experience$

// Comme on doit faire intervenir un Manager pour ce composant j'ai préféré isoler le composant.
export function GiphySearch({ modalState, onClose }) {
    return (
        <SearchContextManager apiKey={"6oRKrT62iGZnk51TXI7MiaQkaJ0nzyrn"} theme={{ mode: "dark" }}>
            <Components modalState={modalState} onClose={onClose} />
        </SearchContextManager>
    );
}

export function Components({ modalState, onClose }) {
    const cancelButtonRef = useRef(null);   // Reférence sur le bouton pour quitter la modal pour l'accessibilité en utilisant le clavier.
    // Utilise le module @giphy/js-fetch-api pour récupérer les gifs.
    //const gf = new GiphyFetch("6oRKrT62iGZnk51TXI7MiaQkaJ0nzyrn");
    const [userImage, setUserImage] = useRecoilState(imageState); // State globale que l'on va changer lorsque l'on appuiera sur le submit.
    const [hasChanged, sethasChanged] = useRecoilState(infoHasChanged);


    const { fetchGifs, searchKey } = useContext(SearchContext);

    // fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
    // if this function changes, change the Grid key to recreate the grid and start over
    // see the codesandbox for a runnable example
    //let fetchGifs = (offset) => gf.search(search, { offset, limit: 10 });

    // https://dmitripavlutin.com/react-throttle-debounce/

    const toggleModal = () => {
        onClose(); // On dit au parent profil.js que l'on a fermé tous les modales.
    };
    const handleNewImage = (userUrl) => {
        setUserImage(userUrl); // setState(url) --> userImage.
        sethasChanged(true);
        toggleModal();
    }

    return (
        <Transition.Root show={modalState} as={Fragment}>
            {/* Modal Component */}
            {/* https://tailwindui.com/components/application-ui/overlays/modals */}
            {/* NB : J'ai essayé de le mettre dans un composant à part pour alléger le code mais en faisant ça on a plus l'animation du composant. */}
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={toggleModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom dark:bg-dark-light-gray rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="dark:bg-dark-light-gray px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                                        <section aria-labelledby='Edit_Image' className="flex justify-between items-start rounded-t dark:border-gray-600 mb-5">
                                            {/* Composant qui est une section avec un titre en h3 spécifié via as cf doc. */}
                                            <Dialog.Title id="Edit_Image" as="h3" className="text-xl leading-6 font-bold dark:text-dark-white">
                                                Choisi ton super GIF 🤩
                                            </Dialog.Title>
                                            <div className='ml-auto flex items-center justify-center'>
                                                <button type="button" ref={cancelButtonRef} className="ease-in duration-200 dark:text-gray-400 text-gray-700 bg-transparent hover:text-gray-900 rounded-lg text-sm dark:hover:text-white hover:scale-110" data-modal-toggle="defaultModal" onClick={toggleModal}>
                                                    <AiOutlineClose size={"1.5rem"} />
                                                </button>
                                            </div>
                                        </section>
                                        <SearchBar className='mb-5 rounded-md' />
                                        <SuggestionBar />
                                        <div className='max-h-80 overflow-y-auto overflow-x-hidden'>
                                            <Grid key={searchKey} gutter={10} columns={3} width={550} fetchGifs={fetchGifs} noLink={true} borderRadius={6} onGifClick={(gif, event) => {
                                                console.log(gif.images)
                                                handleNewImage(gif.images.downsized.url);
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
