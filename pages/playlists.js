import React from 'react';
import NavBar from './components/navbar/NavBar';
import FullContent from './components/fullContent/fullContent';
import RightSection from './components/rightSection/RightSection';
import UserPlaylists from './components/userPlaylists/UserPlaylists';

function playlists() {
  return (
    <div className='flex flex-row'>
        <NavBar/>
        <FullContent compo={<React.Fragment><UserPlaylists/><RightSection/></React.Fragment>}/>
    </div>
  )
}

export default playlists