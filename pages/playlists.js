import React from 'react';
import Layout from './components/layout/Layout';
import NavBar from './components/navbar/NavBar';
import FullContent from './components/fullContent/fullContent';
import RightSection from './components/rightSection/RightSection';
import UserPlaylists from './components/userPlaylists/UserPlaylists';

function playlists({session}) {
  return (
      <div className='flex'>
          <NavBar session={session}/>
          <FullContent session={session}>
          <React.Fragment>
                <UserPlaylists session={session} />
                <RightSection />
            </React.Fragment>
          </FullContent>
      </div>
  )
}

export default playlists