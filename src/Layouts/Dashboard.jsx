import React, { useState, useEffect, useContext } from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FaHome, FaSearch, FaUser } from 'react-icons/fa';
import { AiTwotoneMedicineBox } from 'react-icons/ai';
import { BiCategory } from "react-icons/bi";
import { FcAdvertising } from 'react-icons/fc';
import { TbReportMoney } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { Helmet } from 'react-helmet';

const Dashboard = () => {
    const { user } = useContext(AuthContext);  // Get the user from AuthContext
    const [role, setRole] = useState(null);    // State to store the user's role

    // Fetch the user's role from the backend
    useEffect(() => {
        const fetchRole = async () => {
            if (user && user.email) {
                try {
                    const response = await fetch(`https://pharma-care-server-delta.vercel.app/users/role?email=${user.email}`);
                    const data = await response.json();
                    setRole(data.role); // Store the role once fetched
                } catch (error) {
                    console.error('Error fetching role:', error);
                }
            }
        };

        fetchRole();
    }, [user]);  // Dependency on user, so it fetches the role when the user is available

    if (!role) {
        return null; // You can return a loading spinner or fallback UI while role is being fetched
    }

    let defaultSection;
    if (role === 'admin') {
        defaultSection = 'admin-home';
    } else if (role === 'seller') {
        defaultSection = 'seller-home';
    } else {
        defaultSection = 'payment-history';
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>PharmaCare | Dashboard</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="flex container">
                {/* Dashboard Sidebar */}
                <div className="w-40 min-h-screen bg-orange-400">
                    <ul className="menu p-1">
                        <div>
                            {/* Admin-specific links */}
                            {role === 'admin' && (
                                <>
                                    <li>
                                        <NavLink to="admin-home">
                                            <FaHome /> AdminHome
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="manage-category">
                                            <BiCategory /> Manage Category
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="manage-users">
                                            <FaUser /> Manage Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="sales-report">
                                            <TbReportMoney /> Sales Reports
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="manage-advertisements">
                                            <FcAdvertising /> Manage Advertisements
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Seller-specific links */}
                            {role === 'seller' && (
                                <>
                                    <li>
                                        <NavLink to="seller-home">
                                            <FaHome /> SellerHome
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="manage-medicines">
                                            <AiTwotoneMedicineBox /> Manage Medicines
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="seller-report">
                                            <TbReportMoney /> Seller Reports
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="seller-advertisement">
                                            <FcAdvertising /> Seller Advertisements
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* User-specific links */}
                            {role === 'user' && (
                                <>

                                    <li>
                                        <NavLink to="payment-history">
                                            <TbReportMoney /> Payment History
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Shared links */}
                            <div className="divider"></div>
                            <li>
                                <NavLink to="/">
                                    <FaHome /> Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/shop">
                                    <FaSearch /> Shop
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/cart">
                                    <FiShoppingCart /> Cart
                                </NavLink>
                            </li>
                        </div>
                    </ul>
                </div>

                {/* Dashboard Content */}
                <div className="flex-1 p-8">
                    {/* Redirect to default section based on user role */}
                    <Navigate to={defaultSection} />
                    <Outlet />
                </div>
            </div></>
    );
};

export default Dashboard;
