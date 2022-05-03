import { getProviders, signIn, useSession } from 'next-auth/react'
import logo from '../public/kiwi_full_logo.png'
import { ImYoutube2 } from 'react-icons/im'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '../atoms/userAtom'
import { useEffect } from 'react'

// Avant que la page se charge (que le DOM commence à mettre le HTML), on doit préparer certains éléments côté serveur.

function Login({ providers }) {
  // On destructure ce que l'on a retourné en dessous.
  const [userStatus, setUserStatus] = useRecoilState(userState)
  const { data: session } = useSession()
  const setSessionUserStatus = () => {
    console.log(session)
    session.user.status = 'invited'
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-tl from-[#FFDEE9] to-[#16a084d5]">
      {/* Logo Kiwi */}
      <img src={logo.src} className="App-logo pb-10" alt="logo" />
      {/* Cadre Boutons de connexion */}
      <div className="flex flex-col items-center space-y-3 rounded-xl bg-white bg-opacity-[0.325] p-5">
        <img
          className="h-30 mb-7 w-52"
          src="https://cdn.worldvectorlogo.com/logos/spotify-1.svg"
          alt="Spotify logo"
        />
        {/* Affiche les boutons pour chaque Provider dispos. */}
        {Object.values(providers).map(
          (
            provider // Récupère les éléments de l'object que l'on a déclaré pour next auth.
          ) => (
            <div key={provider.name}>
              <button
                className="rounded-full bg-[#18D860] p-3 text-black"
                onClick={() =>
                  signIn(provider.id, { callbackUrl: '/' }) &&
                  setUserStatus('logged')
                }
              >
                {/* provider.id : 0 = spotify par exemple si on a plusieurs provider et en fonction de l'ordre ce sera différent. */}
                Login with {provider.name}
              </button>
            </div>
          )
        )}
        {/* Continuer en Tant qu'invité. */}
        <div className="flex flex-row items-center space-x-2 rounded-full p-2 text-black">
          <button
            onClick={() =>
              userStatus === null
                ? setUserStatus('invited') && setSessionUserStatus()
                : console.debug('Erreur setUserStatus Login')
            }
          >
            or use the app with
          </button>
          <ImYoutube2 className="h-10 w-[4rem]" />
        </div>
      </div>
    </div>
  )
}
export default Login

// SSR
export async function getServerSideProps() {
  // On lance cette partie avant que l'on commence à charger le contenu du composant Login, on veut récupérer les providers dans next auth.
  const providers = await getProviders()
  // On en a besoin pour demander à spotify les tokens, l'accès ....
  return {
    props: {
      providers, // On récupère le tableau de providers dans next-auth
    },
  }
}
