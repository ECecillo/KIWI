import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import NavBar from "./components/navbar/NavBar";
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Profile from "./components/account/Profile/profile";
import { useRecoilState } from 'recoil';
import { imageState, infoHasChanged, sessionState, userNameState } from '../atoms/userAtom';
import { BiArrowBack } from 'react-icons/bi';
import Cards from './components/account/Providers/Cards';
import { scopes } from '../lib/spotify';
import EditUsername from './components/account/Username/EditUsername';

// @id : Number = Id dans la base de donnée de l'utilisateur.
async function deleteAccount(id) {
	// Envoie une requête au handler pour qu'il supprime l'utilisateur dans la base de donnée.
	await fetch(`/api/account/${id}`, {
		method: 'DELETE',
	});
	Router.push('/login');
}
// @id = Id dans la base de donnée de l'utilisateur.
async function saveChanges(id, data) {
	console.log(data);
	await fetch(`/api/account/${id}`, {
		method: 'PUT',
		body:
			// Contenu de la requête.
			JSON.stringify({
				data
			})
	}).then((response) => {
		return response.status === 200 ? Router.reload() : console.log(response); // On récupère le statut de la réponse, si ce dernier est 200, la requête a réussi on recharge la page, sinon on affiche la réponse de la requête dans la console. 
	});
}

export default function Account({ session, spotify_scope, google_scope }) {
	const userHasValidSession = Boolean(session);

	const [sessionUser, setSessionUser] = useRecoilState(sessionState);
	setSessionUser(session);

	// Des globales state que les fils du composant account partage, sert entre autre à connaitre le nouveau pseudo et image.
	const [newUserImage, setNewUserImage] = useRecoilState(imageState);
	const [newUserName, setNewUserName] = useRecoilState(userNameState);

	// Lorsque l'on modifira le pseudo ou l'image, cette variable passera à true pour savoir si on affiche ou non le bouton enregistrer.
	const [hasChanged, sethasChanged] = useRecoilState(infoHasChanged);

	// Callback que l'on appelle lorsque l'on clique sur le bouton reinitialiser qui s'affiche ssi on a modifier quelque chose.
	const reinitialise = () => {
		setNewUserImage("");
		setNewUserName("");
	};

	const router = useRouter();
	const isActive = (pathname) => { // Attend un string
		return router.pathname === pathname;
	};


	return (
		<div className="flex dark:bg-dark-black bg-white dark:text-dark-white">
			<div className='hidden md:hidden lg:hidden xl:flex xl:w-1/6'>
				<NavBar session={session} />
			</div>
			<div className="flex basis-full
            dark:bg-gradient-to-br dark:from-dark-gradient-right dark:via-dark-gradient-middle dark:to-dark-gradient-left">
				<div className='flex flex-col max-w-[95%] my-0 mx-auto'>
					<section aria-labelledby='Compte' className='flex flex-rows mt-6'>
						{/* Logo pour revenir en arrière */}
						<span className='transition ease-out duration-200 
                        dark:hover:text-white hover:opacity-100 hover:cursor-pointer hover:scale-110 dark:hover:bg-dark-transparent-black
                        my-auto mr-6 p-1 transparent opacity-80 rounded-xl self-center justify-self-center'>
							<Link href="/" passHref>
								<a data-active={isActive('/')}>
									<BiArrowBack size={"1.5rem"} />
								</a>
							</Link>
						</span>
						<h1 id='Compte' className='text-3xl dark:text-dark-text font-bold text-center'>
							Mon Compte
						</h1>
						{/* Infos */}
					</section>
					<div className='flex flex-col mt-20 gap-10 items-center sm:items-start'>
						{/* Formulaire ou section dans laquel l'user va modifier son nom, la fonction doit aussi changer le nom dans la database. */}
						<Profile />
						<EditUsername />
						{/* Carte qui afficheront les infos de la session et les droits des tokens. */}
						<Cards spotify={spotify_scope} google={google_scope} />
						{/* Déconnexion et Supprimer mon Compte. */}
						<div className='flex flex-col sm:flex-row space-y-4 sm:justify-around sm:items-center sm:space-y-0 dark:text-dark-text max-h-fit h-fit sm:w-full'>
							{/* Bouton de deconnexion */}
							<span className='px-3 py-1 bg-red-700 rounded-md transition ease-in duration-200 hover:opacity-90 text-center self-center'>
								<Link href="/api/auth/signout">
									<a data-active={isActive('/signup')}>Déconnexion</a>
								</Link>
							</span>
							{/* Supprimer le compte */}
							<div className='dark:bg-dark-transparent-black px-3 py-1 border-2 border-red-900 rounded-md sm:w-max w-full transition ease-in duration-200 hover:bg-red-700' >
								{
									userHasValidSession &&
									<button onClick={() => deleteAccount(session.user.userId)}>Supprimer mon Compte</button>
								}
							</div>
						</div>
						{/* Bouton pour enregistrer les modifications de l'utilisateur qui s'affiche lorsque userImage ou userName ont changées. */}
						{hasChanged &&
							<div className='fixed top-auto right-auto xl:right-1/4 bottom-0 left-[15%] sm:left-[20%] md:left-1/4 xl:left-auto justify-center'>
								<div className='flex flex-col justify-center items-center text-center dark:bg-dark-transparent-black p-2 
						sm:justify-self-center sm:self-center sm:flex-row sm:justify-around sm:p-2 rounded-md w-10/12 sm:w-[80%] lg:w-full'>
									<div>
										<button className='sm:mr-5 lg:mr-16' onClick={() => reinitialise}>
											Réinitialiser
										</button>
										<button
											onClick={() => saveChanges(session.user.userId, { newUserImage, newUserName })} className='p-1 dark:bg-[#2F7B47] rounded-md'>Enregistrer les modifications</button>
									</div>
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

// Récupère des données côté serveur (Session) que l'on utilisera dans la page dans les composants ou dans Account.
export async function getServerSideProps(context) {
	// Récupère la session et ces infos (token, user...).
	const session = await getSession(context);
	const spotify_scope = scopes.split(','); // On retourne un tableau où chaque élément est une des perms que l'on a demandé.
	//['user-read-email', '...', ....];
	const google_scope = ["user-read-email"];
	return {
		props: {
			session,
			spotify_scope,
			google_scope,
		}, // will be passed to the page component as props
	}
};

