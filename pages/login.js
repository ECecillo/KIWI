import { getProviders, signIn, useSession } from "next-auth/react"
import logo from '../public/kiwi_full_logo.png'
import { ImYoutube2 } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { useEffect } from "react";

// Avant que la page se charge (que le DOM commence à mettre le HTML), on doit préparer certains éléments côté serveur.

function Login({ providers }) { // On destructure ce que l'on a retourné en dessous.
    const [userStatus, setUserStatus] = useRecoilState(userState);
    const {data: session} = useSession();
    const setSessionUserStatus = () => {
        console.log(session);
        session.user.status = "invited";
    };

    return (
        <div className="flex flex-col items-center bg-gradient-to-tl from-[#FFDEE9] to-[#16a084d5] min-h-screen w-full justify-center">
            {/* Logo Kiwi */}
            <img src={logo.src} className="App-logo pb-10" alt="logo" />
            {/* Cadre Boutons de connexion */}
            <div className="flex flex-col items-center bg-white bg-opacity-[0.325] p-5 rounded-xl space-y-3">
                <img className="w-52 h-30 mb-7" src="https://cdn.worldvectorlogo.com/logos/spotify-1.svg" alt="Spotify logo" />
                {/* Affiche les boutons pour chaque Provider dispos. */}
                {Object.values(providers).map((provider) => ( // Récupère les éléments de l'object que l'on a déclaré pour next auth.
                    <div key={provider.name}>
                        <button className="bg-[#18D860] text-black p-3 rounded-full"
                            onClick={() => signIn(provider.id, { callbackUrl: "/" }) && setUserStatus("logged")}>
                            {/* provider.id : 0 = spotify par exemple si on a plusieurs provider et en fonction de l'ordre ce sera différent. */}
                            Login with {provider.name}
                        </button>
                    </div>
                ))}
                {/* Continuer en Tant qu'invité. */}
                <div className="flex flex-row items-center space-x-2 text-black p-2 rounded-full">
                    <button onClick={() => userStatus === null
                        ? setUserStatus("invited") && setSessionUserStatus()
                        : console.debug("Erreur setUserStatus Login")
                    }>
                        or use the app with
                    </button>
                    <ImYoutube2 className="w-[4rem] h-10" />
                </div>
            </div>
        </div>
    );
}
export default Login;


// SSR
export async function getServerSideProps() {
    // On lance cette partie avant que l'on commence à charger le contenu du composant Login, on veut récupérer les providers dans next auth.
    const providers = await getProviders();
    // On en a besoin pour demander à spotify les tokens, l'accès ....
    return {
        props: {
            providers // On récupère le tableau de providers dans next-auth
        }
    }
} 