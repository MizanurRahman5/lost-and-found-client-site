import React from 'react';
import NavBar from '../../component/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../../component/Footer';

const Auth = () => {
    return (
        <div>
            
            <Outlet/>
           
        </div>
    );
};

export default Auth;