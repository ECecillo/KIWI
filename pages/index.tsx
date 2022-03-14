import React from 'react'
import Layout from './components/layout/Layout';
import FullContent from './components/fullContent/fullContent';
import { getSession, GetSessionParams } from 'next-auth/react';

const Home = () => {
    return (
        <Layout>    
            <FullContent/>  
        </Layout>
    )
}
export default Home;

export async function getServerSideProps(context: GetSessionParams) {
    // On va faire du pré-rendue sur le serveur pour récup l'access token et ensuite effectuer les requêtes à spotify.
    const session = await getSession(context); 
    return {
      props: {
        session,
      }
    }
  
  }
  