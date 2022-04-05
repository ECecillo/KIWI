import { useSession } from 'next-auth/react';
import defaultImage from '../../../../public/test-img/doge.jpg';
import React, { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { ChangeImageModal } from './Modals/ChangeUserImage';
import { useRecoilValue } from 'recoil';
import { imageState } from '../../../../atoms/userAtom';

export default function Profile() {
	const { data: session, status } = useSession();
	const userHasValidSession = Boolean(session);
	const [isModalOpen, setModalOpen] = useState(false);
	const handleModal = () => {
		isModalOpen === false ? setModalOpen(true) : setModalOpen(false);
	}
	const onClose = () => {
		setModalOpen(false);
	};
	let userName = session?.user?.name;
	// A passer en state pour éviter de devoir y revérifier à chaque page.
	let image_profile = session?.user?.image ? session?.user?.image : defaultImage;
	const newImage = useRecoilValue(imageState);

	return (
		< div className='flex flex-row items-center' >
			<div>
				{/* Si on met un bouton Nuit/Jour changer le bg et la couleur du svg */}
				{/* Ajouter un modal ou créer un input pour mettre un lien vers l'image. */}
				<button
					type="button"
					data-modal-toggle="defaultModal"
					onClick={handleModal}
				>
					<BsFillPencilFill className='absolute bg-black p-1 rounded-xl border-2' size={"1.4rem"} color={"white"} />
					{/* TODO : Ajouter un message quand on Hover l'image ou le logo. */}
					<img className='rounded-full object-cover h-20 w-20 max-h-15 max-w-sm mr-8 shadow-md shadow-[#42678b]'
						src={newImage !== "" ? newImage : image_profile} // Affiche la nouvelle image si on en a mis une, sinon on affiche l'ancienne.
						alt='Image profile' />
				</button>
			</div>
			<h1 className='font-bold text-2xl dark:text-dark-text'>{userName}</h1>
			<ChangeImageModal modalState={isModalOpen} onClose={onClose} />
			{/* Input avec  */}
		</div >
	)
}
