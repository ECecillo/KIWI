/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose, AiOutlineGif } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { UrlModal } from './UrlModal';
import {GiphySearch} from "./GiphySearch";

export function ChangeImageModal({ modalState, onClose }) {
    const cancelButtonRef = useRef(null);
    const [openUrlModal, setUrlModal] = useState(false);
    const [openImgurModal, setImgurModal] = useState(false);


    const toggleModal = () => {
        onClose();
    };
    const handleUrlModal = () => {
        onClose(); // On doit fermer le Modal actuel puis relancer le nouveau avec l'url.
        setUrlModal(!openUrlModal);
    };
    const handleImgurModal = () => {
        onClose(); // On doit fermer le Modal actuel puis relancer le nouveau avec la recherche de Imgur.
        setImgurModal(!openImgurModal);
    };
    return (
        <>
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
                            <Dialog.Overlay className="fixed inset-0 bg-dark-black bg-opacity-75 transition-opacity" />
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
                                <div className="dark:bg-dark-gray px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <section aria-labelledby='Edit_Image' className="flex justify-between items-start rounded-t">
                                                {/* Composant qui est une section avec un titre en h3 spécifié via as cf doc. */}
                                                <Dialog.Title id="Edit_Image" as="h3" className="text-xl leading-6 font-bold dark:text-dark-white">
                                                    Sélectionner une image
                                                </Dialog.Title>
                                                <div className='ml-auto flex items-center justify-center'>
                                                    <button type="button" className="ease-in duration-200 dark:text-gray-400 text-gray-700 bg-transparent hover:text-gray-900 rounded-lg text-sm dark:hover:text-white hover:scale-110" ref={cancelButtonRef} data-modal-toggle="defaultModal" onClick={toggleModal}>
                                                        <AiOutlineClose size={"1.5rem"} />
                                                    </button>
                                                </div>
                                            </section>
                                            <div className="mt-5 flex flex-row">
                                                {/* Ajouter un lien vers une image */}
                                                <div className='flex flex-col justify-items-center text-center bg-dark-soft-black mr-2 w-1/2 rounded-md ease-in duration-200 hover:drop-shadow-[0_35px_35px_rgba(0,125,255,0.25)]'>
                                                    <button className='my-0 mx-auto' onClick={handleUrlModal}>
                                                        {/* Image */}
                                                        <div className='ease-in duration-200 hover:scale-105 dark:bg-dark-white p-10 rounded-full my-4 w-fit' >
                                                            <BiImageAdd color='black' className='w-10 h-10' />
                                                        </div>
                                                    </button>
                                                    {/* Texte en dessous */}
                                                    <p className='dark:text-dark-white font-semibold'>
                                                        Ajouter mon lien
                                                    </p>
                                                </div>
                                                {/* Rechercher sur Imgur Giphy */}
                                                <div className="flex flex-col justify-items-center text-center bg-dark-soft-black ml-2 w-1/2 rounded-md hover:drop-shadow-[0_35px_35px_rgba(0,125,255,0.25)]">
                                                    <button className='ease-in duration-200 hover:scale-105 my-0 mx-auto'
                                                        type="button"
                                                        data-modal-toggle="defaultModal"
                                                        onClick={handleImgurModal}>
                                                        {/* Image */}
                                                        <div className='dark:bg-dark-white p-10 rounded-full my-4 w-fit'>
                                                            <AiOutlineGif color='black' className=' w-10 h-10' />
                                                        </div>
                                                    </button>
                                                    {/* Texte pour Imgur */}
                                                    <p className='dark:text-dark-white font-semibold mb-4'>
                                                        Rechercher sur Imgur
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            {/* Composant du Modal qui affichera un input pour mettre un lien vers l'image que l'on voudra mettre en tant que profil */}
            <UrlModal modalState={openUrlModal} onClose={handleUrlModal} />
            {/* Composant du modal que l'on affichera pour rechercher des Gif ou des photos sur IMGUR */}
            <GiphySearch modalState={openImgurModal} onClose={handleImgurModal} />
        </>
    );
};
