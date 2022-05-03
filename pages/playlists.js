import React from 'react'
import Layout from './components/layout/Layout'
import NavBar from './components/navbar/NavBar'
import FullContent from './components/fullContent/fullContent'
import RightSection from './components/rightSection/RightSection'
import UserPlaylists from './components/userPlaylists/UserPlaylists'
import { getSession } from 'next-auth/react'

export const getServerSideProps = async (context) => {
  const session = await getSession(context) // Récupère les informations de la session, à voir si on le fait pas plutôt côté serveur.
  return {
    props: {
      session,
    },
  }
}

function playlists({ session }) {
  return (
    <div className="flex">
      <NavBar session={session} />
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
