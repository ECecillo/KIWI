import React from 'react'
import Layout from './components/layout/Layout';
import FullContent from './components/fullContent/fullContent';

import Content from './components/content/Content';
import RightSection from './components/rightSection/RightSection';

import { getSession, GetSessionParams } from 'next-auth/react';

const Home = () => {
    return (
        <Layout>    
            <FullContent compo={<React.Fragment><Content/><RightSection/></React.Fragment>}/> 
        </Layout>
    )
}
export default Home;