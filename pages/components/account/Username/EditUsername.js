import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { infoHasChanged, userNameState } from '../../../../atoms/userAtom'

function EditUsername() {
  const [newUserName, setNewUserName] = useRecoilState(userNameState)

  // Lorsque l'on modifira le pseudo ou l'image, cette variable passera à true pour savoir si on affiche ou non le bouton enregistrer.
  const [hasChanged, sethasChanged] = useRecoilState(infoHasChanged)

  // state qui va nous permettre d'activer l'input dans lequel l'utilisateur va pouvoir changer son pseudo.
  const [editUser, setEditUser] = useState('disabled')
  const [editButton, setEditButton] = useState('Edit')
  function changeUser() {
    // On check si le bouton est activé ou non via le state.
    if (editUser) {
      // On donne la possibilité de modifier le champ.
      setEditUser('')
      // On modifie le texte dans le bouton pour qu'il passe à Confirmer.
      setEditButton('Confirmer')
    } else if (!editUser) {
      // On réactive la propriété disable de l'input.
      setEditUser('disabled')
      // On remet le texte du bouton à la valeur Edit.
      setEditButton('Edit')
      // On check si le nom a changé pour passer le hasChanged à true.
      if (newUserName) {
        sethasChanged(true)
      }
    } else {
      console.log('Erreur')
    }
  }

  return (
    <div className="flex w-full flex-row rounded-xl border-[1px] border-transparent bg-white/50 dark:border-gray-600 dark:bg-dark-transparent-black">
      {/* session.name que l'on peut modifier avec un bouton edit. */}
      <section aria-labelledby="Nom" className="m-2 w-full">
        <h2 id="Nom" className="dark:text-dark-text mb-2 font-medium">
          Nom d'Utilisateur
        </h2>
        <div className="flex h-8 flex-row justify-between">
          {/* Voir comment faire en sorte pour que l'utilisateur puisse modifier le champ. */}
          <input
            type="text"
            disabled={editUser}
            className="w-2/3 rounded-md bg-neutral-500 bg-opacity-[0.325] dark:bg-dark-light-gray"
            onChange={(event) => setNewUserName(event.target.value)}
          />
          <button
            className="ml-4 w-1/3 rounded-md bg-neutral-500 dark:bg-dark-soft-black"
            onClick={() => changeUser()}
          >
            {editButton}
          </button>
        </div>
      </section>
    </div>
  )
}

export default EditUsername
