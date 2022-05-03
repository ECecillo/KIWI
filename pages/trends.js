import React from 'react'
import NavBar from './components/navbar/NavBar'
import RightSection from './components/rightSection/RightSection'
import FullContent from './components/fullContent/fullContent'
import CurrentTrends from './components/trends/currentTrends'
import { getSession } from 'next-auth/react'

export const getServerSideProps = async (context) => {
  const session = await getSession(context) // Récupère les informations de la session, à voir si on le fait pas plutôt côté serveur.
  return {
    props: {
      session,
    },
  }
}

function trends({ session }) {
  return (
    <div className="flex">
      <NavBar session={session} />
      <FullContent session={session}>
        <React.Fragment>
          <CurrentTrends session={session} />
          <RightSection />
        </React.Fragment>
      </FullContent>
    </div>
  )
}

export default trends
