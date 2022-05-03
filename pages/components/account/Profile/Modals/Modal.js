/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'

export function Modal(props) {
  /**
   * @modalState Boolean qui indique si on affiche le modal ou non.
   * @onClose Méthode qui s'occupe de changer le modalState dans les couches au dessus.
   * @title Titre de la Modale.
   */
  const { modalState: modalState, onClose: onClose, title: title } = props

  const cancelButtonRef = useRef(null)

  const toggleModal = () => {
    onClose()
  }

  return (
    <>
      <Transition.Root show={modalState} as={Fragment}>
        {/* Modal Component */}
        {/* https://tailwindui.com/components/application-ui/overlays/modals */}
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={toggleModal}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
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
              <div className="relative inline-block transform  overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all sm:my-8 sm:w-[90%] sm:max-w-lg sm:align-middle">
                <div className="dark:bg-dark-gray bg-white px-2 pt-2 pb-4 dark:bg-dark-soft-black sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-2 w-full text-center sm:mt-0 sm:text-left">
                      <section
                        aria-labelledby="Edit_Image"
                        className="flex items-start justify-between rounded-t"
                      >
                        {/* Composant qui est une section avec un titre en h3 spécifié via as cf doc. */}
                        <Dialog.Title
                          id="Edit_Image"
                          as="h3"
                          className="text-lg font-bold leading-6 dark:text-dark-white"
                        >
                          {title}
                        </Dialog.Title>
                        <div className="ml-auto flex items-center justify-center">
                          <button
                            type="button"
                            className="rounded-lg bg-transparent text-sm text-gray-700 duration-200 ease-in hover:scale-110 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            ref={cancelButtonRef}
                            data-modal-toggle="defaultModal"
                            onClick={toggleModal}
                          >
                            <AiOutlineClose size={'1.5rem'} />
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
  )
}
