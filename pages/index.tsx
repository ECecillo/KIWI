import React from 'react'
import Layout from './components/layout/Layout'
import FullContent from './components/fullContent/fullContent'
import Content from './components/content/Content'
import RightSection from './components/rightSection/RightSection'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
/**
 * Récupère côté serveur la session et côté client on la stockera avec notre state manager.
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context) // Récupère les informations de la session, à voir si on le fait pas plutôt côté serveur.
  return {
    props: {
      session,
    },
  }
}

// Détermine le type de nos arguments.
type Props = {
  session: Session
}

const Home: React.FC<Props> = (props) => {
  // On set la session a la racine de la page pour pouvoir y accéder dans tous les composants.
  //const [userSession, setUserSession] = useRecoilState(sessionState);
  //setUserSession(props.session);

  return (
    <Layout session={props.session}>
      <FullContent session={props.session}>
        <React.Fragment>
          <Content session={props.session} />
          <RightSection />
        </React.Fragment>
      </FullContent>
    </Layout>
  )
}
export default Home
