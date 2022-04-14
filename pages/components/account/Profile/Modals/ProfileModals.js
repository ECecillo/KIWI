import React, { useState } from 'react'
import { GiphySearch } from './GiphySearch';
import { ChangeImageModal } from './Menu';
import { Modal } from './Modal';
import { SetWithUrl } from './SetWithUrl';

function ProfileModals({ isModalOpen, onClose }) {
    const [openUrlModal, setUrlModal] = useState(false);
    const [openGiphyModal, setGiphyModal] = useState(false);

    const handleUrlModal = () => {
        onClose(); // On doit fermer le Modal actuel puis relancer le nouveau avec l'url.
        setUrlModal(!openUrlModal);
    };
    const handleGiphyModal = () => {
        onClose(); // On doit fermer le Modal actuel puis relancer le nouveau avec la recherche de Imgur.
        setGiphyModal(!openGiphyModal);
    };

    return (
        <>
            <Modal modalState={isModalOpen} onClose={onClose} title={"Sélectionner une image"}>
                <ChangeImageModal handleUrlModal={handleUrlModal} handleGiphyModal={handleGiphyModal} />
            </Modal>
            {/* Composant du Modal qui affichera un input pour mettre un lien vers l'image que l'on voudra mettre en tant que profil */}
            <Modal modalState={openUrlModal} onClose={handleUrlModal} title={"Entrer l'URL de votre Image"}>
                <SetWithUrl onClose={handleUrlModal} />
            </Modal>
            {/* Composant du modal que l'on affichera pour rechercher des Gif sur Giphy */}
            <Modal modalState={openGiphyModal} onClose={handleGiphyModal} title={"Choisi ton super GIF 🤩"}>
                <GiphySearch onClose={handleGiphyModal} />
            </Modal>

        </>
    );
}

export default ProfileModals