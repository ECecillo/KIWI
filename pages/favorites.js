import React from 'react';
import NavBar from './components/navbar/NavBar';
import RightSection from './components/rightSection/RightSection';
import FullContent from './components/fullContent/fullContent';
import UserFavorites from './components/userFavorites/UserFavorites';
import { getSession } from 'next-auth/react';

export const getServerSideProps = async (context) => {
    const session = await getSession(context); // Récupère les informations de la session, à voir si on le fait pas plutôt côté serveur.
    return {
        props: {
            session,
        },
    }
}

function favorites({session}) {
    
    return (
        <div className='flex'>
            <NavBar session={session}/>
            <FullContent session={session}>
                <React.Fragment>
                    <UserFavorites session={session} />
                    <RightSection />
                </React.Fragment>
            </FullContent>
        </div>
    )
}

export default favorites;