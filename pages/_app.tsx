import '../styles/globals.css';
import React from 'react';
import NavBar from './components/NavBar';
import Content from './components/Content';
import RightSection from './components/RightSection';

function MyApp() {
    return(
        <div className='flex flex-row'>
            <NavBar/>
            <Content/>
            <RightSection/>
        </div>
    )
}

export default MyApp;
