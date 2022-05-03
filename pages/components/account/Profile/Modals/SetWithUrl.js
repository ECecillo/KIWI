/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { AiFillExclamationCircle } from 'react-icons/ai'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { imageState, infoHasChanged } from '../../../../../atoms/userAtom'

export function SetWithUrl({ onClose }) {
  const [formError, setFormError] = useState('') // Va stocker les messages de validation ou erreur.
  const [formValid, setFormValid] = useState(false) // Nous dira si le formulaire est valide en fonction des fonctions de check que l'on aura effectué.
  const [userUrl, setUserUrl] = useState('') // Va contenir l'url rentré par l'utilisateur pour que l'on check si ce dernier est valide.
  const [urlValid, setUrlIsValid] = useState(false) // State qui va dire si l'url est valide.

  const [userImage, setUserImage] = useRecoilState(imageState) // State globale que l'on va changer lorsque l'on appuiera sur le submit.
  const [hasChanged, sethasChanged] = useRecoilState(infoHasChanged)

  const handleUserInput = (data) => {
    // Handler qui va s'occuper de mettre à jour la valeur de l'url entré par l'utilisateur.
    const url = data
    setUserUrl(url) // On sauvegarde dans la variable d'état l'url que l'utilisateur vient de rentrer.
    checkValidUrl(url) // On check si l'url est valide
  }

  const checkValidUrl = (url) => {
    // Retourne un bool qui dit si l'url est valide ou non.
    setUrlIsValid(
      url.match(
        '((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)'
      )
    )
    // Si l'url est valide alors on met pas de message dans le setForm sinon on affiche un message d'erreur.
    urlValid ? setFormError('') : setFormError('Url Invalide !')
    validationChangement()
  }

  // Si la fonction retourne true alors on peut envoyer la requête à la base de donnée.
  const validationChangement = () => {
    setFormValid(urlValid) // Si l'url est valide alors le FormValid = true tout roule on peut traiter le changement sinon on fera rien.
  }

  const toggleModal = () => {
    onClose() // On dit au parent profil.js que l'on a fermé tous les modales.
  }
  // Fonction qui va gérer la modification du state globale userImage pour que l'on puisse passer
  const submitImage = () => {
    setUserImage(userUrl) // setState(url) --> userImage.
    sethasChanged(true)
    toggleModal() // On ferme le modal au passage et on affichera un bouton enregistrer sur la page account.
  }

  return (
    <>
      {/* Visualisation de l'image que l'utilisateur rentre avec son lien. */}
      {formValid ? (
        <img src={userUrl} className="mx-auto my-3 h-1/2 w-1/2 rounded-full" />
      ) : (
        ''
      )}
      {/* Section du FORM */}
      <label htmlFor="userUrl" />
      <div className="mt-3 rounded-md bg-dark-soft-black p-5">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Input de L'url */}
          <input
            type={'url'}
            id="userUrl"
            name="userUrl"
            alt="Zone de texte pour mettre un url"
            className="w-[95%] rounded-md py-2 dark:bg-dark-light-gray dark:text-dark-white"
            required
            onChange={(event) => handleUserInput(event.target.value)}
            onPaste={(event) =>
              handleUserInput(event.clipboardData.getData('text'))
            }
          />
          {/* Submit à la database. */}
          <button
            type="submit"
            className="cursor-pointer justify-self-center rounded-md p-2 duration-200 ease-in hover:scale-105 hover:bg-opacity-80 dark:bg-[#5C68EE] dark:text-dark-white"
            disabled={!formValid}
            onClick={submitImage}
          >
            Appliquer l'URL
          </button>
        </div>
        {/* Message d'erreur */}
        {formError !== '' ? (
          <div className="mt-3 flex flex-row justify-center font-bold text-red-500">
            <AiFillExclamationCircle className="my-auto mx-2" />
            <p>{formError}</p>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
