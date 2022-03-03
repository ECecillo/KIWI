import '../styles/globals.css';
/* 
import React from 'react';
import NavBar from './components/NavBar';
import Content from './components/Content';
import RightSection from './components/RightSection'; 
*/
/* 
    <div className='flex flex-row'>
        <NavBar/>
        <Content/>
        <RightSection/>
    </div> 
*/
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";


const App = ({ Component, pageProps }: AppProps) => {
    return (
        // Permet de persister l'état d'authentification de l'utilisateur.
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
};

export default App;