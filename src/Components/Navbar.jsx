import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const navLinks = <>
        <NavLink
            className={({ isActive }) =>
                `font-bold text-base leading-none ${isActive
                    ? "text-amber-300 border-b-2 border-amber-300"
                    : "text-white"
                }`
            }
            to="/"
        >
            Home
        </NavLink>
        <NavLink
            className={({ isActive }) =>
                `font-bold text-base leading-none ${isActive
                    ? "text-amber-300 border-b-2 border-amber-300"
                    : "text-white"
                }`
            }
            to="/shop"
        >
           Shop
        </NavLink>
    </>;

    const { user, logOut } = useContext(AuthContext);
    
    return (
        <div className="navbar min-h-0 fixed z-10 backdrop-blur-lg bg-opacity-30 lg:px-5 bg-black place-items-center">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <a className="text-xl text-green-500 font-bold">Pharma<span className='text-red-500'>Care</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-3"> {/* Added space-x-3 here */}
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end space-x-3">
                {user && user?.email ? (
                    <div className="relative group flex flex-row place-items-center">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="w-8 rounded-full">
                                    <img
                                        src={user?.photoURL || profilePic}
                                        alt="User"
                                        className="w-8 h-8 rounded-full cursor-pointer"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <button className="btn btn-sm bg-[#87d6e1] text-white text-sm ml-2">
                                        Update Profile
                                    </button>
                                </li>
                                <li><button className="btn btn-sm bg-[#87d6e1] text-white text-sm ml-2">
                                    Dashboard
                                </button></li>
                                <li>
                                    <button
                                        onClick={logOut}
                                        className="btn btn-sm bg-[#87d6e1] text-white text-sm ml-2"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to="/auth/login" className="btn btn-sm bg-[#87d6e1] text-white text-sm">
                            Login
                        </Link>
                        <Link to="/auth/register" className="btn btn-sm bg-[#87d6e1] text-white text-sm">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
