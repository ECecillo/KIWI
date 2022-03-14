import '../styles/globals.css';
import React from 'react'
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';


const App = ({ Component, pageProps }: AppProps) => {
    return (
        // Permet de persister l'état d'authentification de l'utilisateur.
        <SessionProvider session={pageProps.session}>
            <RecoilRoot> {/* state manager */}
                <Component {...pageProps} />
            </RecoilRoot>
        </SessionProvider>
    );
};

export default App;