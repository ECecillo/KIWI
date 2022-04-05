import React from 'react';
import NavBar from './components/navbar/NavBar';
import RightSection from './components/rightSection/RightSection';
import FullContent from './components/fullContent/fullContent';
import UserFavorites from './components/userFavorites/UserFavorites';

function favorites() {
    
    return (
        <div className='flex flex-row'>
            <NavBar/>
            <FullContent compo={<React.Fragment><UserFavorites/><RightSection/></React.Fragment>}/>
        </div>
    )
}

export default favorites;