import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';


const Layouts = () => {
    return (
        <div className='text-black'>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-550px)] bg-slate-200">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>

    );
};

export default Layouts;