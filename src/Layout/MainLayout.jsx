import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../component/NavBar';
import Footer from '../component/Footer';

const MainLayout = () => {
    return (
        <div>
            <NavBar/>
           <div className='min-h-[650px]'>
           <Outlet/>
           </div>
           <Footer/>
        </div>
    );
};

export default MainLayout;