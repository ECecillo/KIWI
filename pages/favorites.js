import React from 'react';
import NavBar from './components/navbar/NavBar';
import RightSection from './components/rightSection/RightSection';
import FullContent from './components/fullContent/fullContent';
import UserFavorites from './components/userFavorites/UserFavorites';

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