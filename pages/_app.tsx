import '../styles/globals.css';
import React from 'react';
import NavBar from './components/NavBar';
import Content from './components/Content';
import RightSection from './components/RightSection';
import MediaPlayer from './components/MediaPlayer'

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
