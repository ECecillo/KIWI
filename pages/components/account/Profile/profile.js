import { useSession } from 'next-auth/react'
import defaultImage from '../../../../public/test-img/doge.jpg'
import React, { useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import { useRecoilValue } from 'recoil'
import { imageState } from '../../../../atoms/userAtom'
import ProfileModals from './Modals/ProfileModals'

export default function Profile() {
  const { data: session, status } = useSession()
  const userHasValidSession = Boolean(session)

  const [isModalOpen, setModalOpen] = useState(false)

  const handleModal = () => {
    isModalOpen === false ? setModalOpen(true) : setModalOpen(false)
  }
  const onClose = () => {
    setModalOpen(false)
  }
  let userName = session?.user?.name
  // A passer en state pour éviter de devoir y revérifier à chaque page.
  let image_profile = session?.user?.image ? session?.user?.image : defaultImage
  const newImage = useRecoilValue(imageState)

  return (
    <div className="flex w-fit flex-row items-center">
      {/* Si on met un bouton Nuit/Jour changer le bg et la couleur du svg */}
      {/* Ajouter un modal ou créer un input pour mettre un lien vers l'image. */}
      <button
        type="button"
        data-modal-toggle="defaultModal"
        onClick={handleModal}
      >
        <BsFillPencilFill
          className="absolute rounded-xl border-2 bg-black p-1"
          size={'1.4rem'}
          color={'white'}
        />
        {/* TODO : Ajouter un message quand on Hover l'image ou le logo. */}
        <img
          className="max-h-15 mr-4 h-20 w-20 max-w-sm rounded-full object-cover shadow-md shadow-[#42678b]"
          src={newImage !== '' ? newImage : image_profile} // Affiche la nouvelle image si on en a mis une, sinon on affiche l'ancienne.
          alt="Image profile"
        />
      </button>
      <h1 className="text-2xl font-bold dark:text-dark-white">{userName}</h1>

      <ProfileModals isModalOpen={isModalOpen} onClose={onClose} />
    </div>
  )
}
