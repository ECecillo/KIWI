/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiFillExclamationCircle, AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { imageState, infoHasChanged } from '../../../../../atoms/userAtom';

export function UrlModal({ modalState, onClose }) {
    const cancelButtonRef = useRef(null);   // Reférence sur le bouton pour quitter la modal pour l'accessibilité en utilisant le clavier.
    const [formError, setFormError] = useState(""); // Va stocker les messages de validation ou erreur.
    const [formValid, setFormValid] = useState(false); // Nous dira si le formulaire est valide en fonction des fonctions de check que l'on aura effectué.
    const [userUrl, setUserUrl] = useState(""); // Va contenir l'url rentré par l'utilisateur pour que l'on check si ce dernier est valide.
    const [urlValid, setUrlIsValid] = useState(false); // State qui va dire si l'url est valide.

    const [userImage, setUserImage] = useRecoilState(imageState); // State globale que l'on va changer lorsque l'on appuiera sur le submit.
    const [hasChanged, sethasChanged] = useRecoilState(infoHasChanged);

    const handleUserInput = (data) => { // Handler qui va s'occuper de mettre à jour la valeur de l'url entré par l'utilisateur.
        const url = data;
        setUserUrl(url); // On sauvegarde dans la variable d'état l'url que l'utilisateur vient de rentrer.
        checkValidUrl(url); // On check si l'url est valide
    };

    const checkValidUrl = (url) => {
        // Retourne un bool qui dit si l'url est valide ou non.
        setUrlIsValid(url.match("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"));
        // Si l'url est valide alors on met pas de message dans le setForm sinon on affiche un message d'erreur. 
        urlValid ? setFormError("") : setFormError("Url Invalide !");
        validationChangement();
    };

    // Si la fonction retourne true alors on peut envoyer la requête à la base de donnée.
    const validationChangement = () => {
        setFormValid(urlValid); // Si l'url est valide alors le FormValid = true tout roule on peut traiter le changement sinon on fera rien.
    };

    const toggleModal = () => {
        onClose(); // On dit au parent profil.js que l'on a fermé tous les modales.
    };
    // Fonction qui va gérer la modification du state globale userImage pour que l'on puisse passer 
    const submitImage = () => {
        setUserImage(userUrl); // setState(url) --> userImage.
        sethasChanged(true);
        toggleModal(); // On ferme le modal au passage et on affichera un bouton enregistrer sur la page account.
    };

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
                            <div className="dark:bg-[#36393F] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <section aria-labelledby='Edit_Image' className="flex justify-between items-start rounded-t dark:border-gray-600 mb-5">
                                            {/* Composant qui est une section avec un titre en h3 spécifié via as cf doc. */}
                                            <Dialog.Title id="Edit_Image" as="h3" className="text-xl leading-6 font-bold dark:text-dark-white">
                                                Entrer l'URL de votre Image
                                            </Dialog.Title>
                                            <div className='ml-auto flex items-center justify-center'>
                                                <button type="button" ref={cancelButtonRef} className="ease-in duration-200 dark:text-gray-400 text-gray-700 bg-transparent hover:text-gray-900 rounded-lg text-sm dark:hover:text-white hover:scale-110" data-modal-toggle="defaultModal" onClick={toggleModal}>
                                                    <AiOutlineClose size={"1.5rem"} />
                                                </button>
                                            </div>
                                        </section>
                                        {/* Visualisation de l'image que l'utilisateur rentre avec son lien. */}
                                        {formValid ?
                                            <img src={userUrl} className="w-1/3 h-1/3 mx-auto my-3 rounded-full" />
                                            : ""}
                                        {/* Section du FORM */}
                                        <label htmlFor="userUrl" />
                                        <div className='bg-dark-soft-black p-5 rounded-md'>
                                            <div className='flex flex-row justify-between'>
                                                {/* Input de L'url */}
                                                <input type={"url"}
                                                    id="userUrl"
                                                    name="userUrl"
                                                    alt='Zone de texte pour mettre un url'
                                                    className='dark:bg-dark-light-gray dark:text-dark-white rounded-md'
                                                    required
                                                    onChange={(event) => handleUserInput(event.target.value)}
                                                    onPaste={(event) => handleUserInput(event.clipboardData.getData("text"))}
                                                />
                                                {/* Submit à la database. */}
                                                <button type='submit'
                                                    className='self-end justify-self-end mr-3 dark:text-dark-white dark:bg-[#5C68EE] p-2 rounded-md ease-in duration-200 hover:scale-105 hover:bg-opacity-80 cursor-pointer'
                                                    disabled={!formValid}
                                                    onClick={submitImage}>Appliquer l'URL</button>
                                            </div>
                                            {/* Message d'erreur */}
                                            {formError !== "" ?
                                                <div className='flex flex-row justify-start text-red-500 font-bold mt-3'><AiFillExclamationCircle className='my-auto mx-2' /><p>{formError}</p></div>
                                                : ""}
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
