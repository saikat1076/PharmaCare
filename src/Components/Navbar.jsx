import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../Hooks/useCart';
import icon from '../../src/assets/healthcare.png';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [language, setLanguage] = useState('en'); // State to manage language selection
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // State to control dropdown visibility

    // Toggle language dropdown visibility
    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    // Language selection handler
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setIsLanguageDropdownOpen(false); // Close dropdown after selecting language
    };

    const navLinks = <>
        {/* Common Navbar Links */}
        <NavLink className={({ isActive }) => `font-bold text-base leading-none ${isActive ? "text-amber-300 border-b-2 border-amber-300" : "text-white"}`} to="/">Home</NavLink>
        <NavLink className={({ isActive }) => `font-bold text-base leading-none ${isActive ? "text-amber-300 border-b-2 border-amber-300" : "text-white"}`} to="/shop">Shop</NavLink>
        
        <NavLink className={({ isActive }) => `font-bold text-base leading-none ${isActive ? "text-amber-300 border-b-2 border-amber-300" : "text-white"}`} to="/cart">
            <button className='flex'>
                <FaShoppingCart />
                <div className="badge badge-secondary">+{cart.length}</div>
            </button>
        </NavLink>
        <NavLink className={({ isActive }) => `font-bold text-base leading-none ${isActive ? "text-amber-300 border-b-2 border-amber-300" : "text-white"}`} to="/online-doctors">Online Doctors</NavLink>
        {user && user?.email ? 
            <NavLink to='/dashboard' className={({ isActive }) => `font-bold text-base leading-none ${isActive ? "text-amber-300 border-b-2 border-amber-300" : "text-white"}`}>Dashboard</NavLink>
        : <NavLink className={({ isActive }) => `font-bold text-base leading-none ${isActive ? "text-amber-300 border-b-2 border-amber-300" : "text-white"}`} to="/join-us">Join Us</NavLink>}
    </>;

    return (
        <div className="navbar sticky top-0 z-50 backdrop-blur-lg lg:px-5 glass shadow-lg bg-black place-items-center">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <div className='flex gap-2'>
                    <img className='h-[30px] w-[30px]' src={icon} alt="PharmaCare Logo" />
                    <h2 className='text-white font-bold text-xl'>PharmaCare</h2>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-3">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end space-x-3">
                {/* Language Dropdown with toggle */}
                <div className="relative display sm:display-none">
                    <button className="btn btn-ghost text-white" onClick={toggleLanguageDropdown}>
                        Language: {language === 'en' ? 'English' : 'Spanish'}
                    </button>
                    {isLanguageDropdownOpen && (
                        <ul className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-40 p-2 shadow absolute right-0">
                            <li>
                                <button onClick={() => handleLanguageChange('en')} className="text-white">English</button>
                            </li>
                            <li>
                                <button onClick={() => handleLanguageChange('es')} className="text-white">Spanish</button>
                            </li>
                            {/* Add more languages here if needed */}
                        </ul>
                    )}
                </div>

                {/* User Menu */}
                {user && user?.email ? (
                    <div className="relative group flex flex-row place-items-center">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="w-8 rounded-full">
                                    <img src={user?.photoURL} alt="User" className="w-8 h-8 rounded-full cursor-pointer" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <button onClick={logOut} className="btn btn-sm bg-[#87d6e1] text-white text-sm ml-2">Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to="/auth/login" className="btn btn-sm bg-[#87d6e1] text-white text-sm">Login</Link>
                        <Link to="/auth/register" className="btn btn-sm bg-[#87d6e1] text-white text-sm">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
