/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';

export function Modal(props) {
    /**
     * @modalState Boolean qui indique si on affiche le modal ou non.
     * @onClose Méthode qui s'occupe de changer le modalState dans les couches au dessus.
     * @title Titre de la Modale. 
     */
    const {
        modalState : modalState, 
        onClose: onClose, 
        title: title
    } = props;

    const cancelButtonRef = useRef(null);

    const toggleModal = () => {
        onClose();
    };
    
    return (
        <>
            <Transition.Root show={modalState} as={Fragment}>
                {/* Modal Component */}
                {/* https://tailwindui.com/components/application-ui/overlays/modals */}
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
                            <div className="relative inline-block align-middle dark:bg-dark-light-gray rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-[90%]">
                                <div className="dark:bg-dark-gray px-2 pt-2 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="w-full mt-2 text-center sm:mt-0 sm:text-left">
                                            <section aria-labelledby='Edit_Image' className="flex justify-between items-start rounded-t">
                                                {/* Composant qui est une section avec un titre en h3 spécifié via as cf doc. */}
                                                <Dialog.Title id="Edit_Image" as="h3" className="text-lg leading-6 font-bold dark:text-dark-white">
                                                    {title}
                                                </Dialog.Title>
                                                <div className='ml-auto flex items-center justify-center'>
                                                    <button type="button" className="ease-in duration-200 dark:text-gray-400 text-gray-700 bg-transparent hover:text-gray-900 rounded-lg text-sm dark:hover:text-white hover:scale-110" ref={cancelButtonRef} data-modal-toggle="defaultModal" onClick={toggleModal}>
                                                        <AiOutlineClose size={"1.5rem"} />
                                                    </button>
                                                </div>
                                            </section>
                                            {/* Là où on va passer les composants à notre Modal. */}
                                            {props.children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};
