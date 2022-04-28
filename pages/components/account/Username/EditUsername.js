import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { infoHasChanged, userNameState } from '../../../../atoms/userAtom';

function EditUsername() {
    const [newUserName, setNewUserName] = useRecoilState(userNameState);

    // Lorsque l'on modifira le pseudo ou l'image, cette variable passera à true pour savoir si on affiche ou non le bouton enregistrer.
    const [hasChanged, sethasChanged] = useRecoilState(infoHasChanged);

    // state qui va nous permettre d'activer l'input dans lequel l'utilisateur va pouvoir changer son pseudo. 
    const [editUser, setEditUser] = useState("disabled");
    const [editButton, setEditButton] = useState("Edit");
    function changeUser() {
        // On check si le bouton est activé ou non via le state.
        if (editUser) {
            // On donne la possibilité de modifier le champ.
            setEditUser("");
            // On modifie le texte dans le bouton pour qu'il passe à Confirmer.
            setEditButton("Confirmer");
        }
        else if (!editUser) {
            // On réactive la propriété disable de l'input.
            setEditUser("disabled");
            // On remet le texte du bouton à la valeur Edit.
            setEditButton("Edit");
            // On check si le nom a changé pour passer le hasChanged à true.
            if (newUserName) {
                sethasChanged(true);
            }
        }
        else {
            console.log("Erreur");
        }
    }

    return (
        <div className='flex flex-row rounded-xl w-full bg-white/50 border-transparent dark:bg-dark-transparent-black dark:border-gray-600 border-[1px]'>
            {/* session.name que l'on peut modifier avec un bouton edit. */}
            <section aria-labelledby='Nom' className='m-2 w-full'>
                <h2 id="Nom" className='font-medium mb-2 dark:text-dark-text'>Nom d'Utilisateur</h2>
                <div className='flex flex-row h-8 justify-between'>
                    {/* Voir comment faire en sorte pour que l'utilisateur puisse modifier le champ. */}
                    <input type='text' disabled={editUser} className='bg-neutral-500 dark:bg-dark-light-gray bg-opacity-[0.325] rounded-md w-2/3'
                        onChange={(event) => setNewUserName(event.target.value)} />
                    <button className='w-1/3 ml-4 bg-neutral-500 dark:bg-dark-soft-black rounded-md' onClick={() => changeUser()}>{editButton}</button>
                </div>
            </section>
        </div>

    )
}

export default EditUsername