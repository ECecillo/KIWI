import React from 'react'
import Layout from './components/layout/Layout';
import Content from './components/content/Content';
import RightSection from './components/rightSection/RightSection';
import { getSession, GetSessionParams } from 'next-auth/react';

const Home = () => {
    return (
        <Layout>
            <Content />
            <RightSection />
        </Layout>
    )
}
export default Home;

