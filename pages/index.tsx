import React from 'react'
import Layout from './components/layout/Layout';
import Content from './components/content/Content';
import RightSection from './components/rightSection/RightSection';

const Home = () => {
    return (
        <Layout>
            <Content />
            <RightSection />
        </Layout>
    )
}
export default Home;