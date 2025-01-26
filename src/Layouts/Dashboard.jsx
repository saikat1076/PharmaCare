import React from 'react';
import { FaEnvelope, FaHome, FaSearch, FaUser } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    <div>
                    <li>
                        <NavLink to="admin-home">
                            <FaHome></FaHome>
                            AdminHome</NavLink>
                    </li>
                    <li>
                        <NavLink to="manage-category">
                            <FaHome></FaHome>
                            manage Category</NavLink>
                    </li>
                    <li>
                        <NavLink to="manage-medicines">
                            <FaHome></FaHome>
                            manage medicines</NavLink>
                    </li>
                    <li>
                        <NavLink to="manage-users">
                            <FaUser></FaUser>
                            manage users</NavLink>
                    </li>
                    <li>
                        <NavLink to="manage-advertisements">
                            <FaUser></FaUser>
                            manage advertisement</NavLink>
                    </li>
                    <li>
                        <NavLink to="payment">
                            <FaHome></FaHome>
                            payment</NavLink>
                    </li>
                    <li>
                        <NavLink to="seller-home">
                            <FaHome></FaHome>
                            SellerHome</NavLink>
                    </li>
                    <li>
                        <NavLink to="sales-report">
                            <FaHome></FaHome>
                            sales reports</NavLink>
                    </li>
                    <li>
                        <NavLink to="seller-report">
                            <FaHome></FaHome>
                            seller reports</NavLink>
                    </li>
                    <li>
                        <NavLink to="seller-advertisement">
                            <FaHome></FaHome>
                            seller ADVERTISEMENT</NavLink>
                    </li>
                    <li>
                        <NavLink to="payment-history">
                            <FaHome></FaHome>
                            payment History</NavLink>
                    </li>
                    </div>
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
               
            </div>
        
    );
};

export default Dashboard;