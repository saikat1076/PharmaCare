import React, { useState, useEffect, useContext } from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FaHome, FaSearch, FaUser } from 'react-icons/fa';
import { AiTwotoneMedicineBox } from 'react-icons/ai';
import { BiCategory } from "react-icons/bi";
import { FcAdvertising } from 'react-icons/fc';
import { TbReportMoney } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Helmet } from 'react-helmet';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            if (user && user.email) {
                try {
                    const response = await fetch(`https://pharma-care-server-delta.vercel.app/users/role?email=${user.email}`);
                    const data = await response.json();
                    setRole(data.role);
                } catch (error) {
                    console.error('Error fetching role:', error);
                }
            }
        };

        fetchRole();
    }, [user]);

    if (!role) {
        return null;
    }

    let defaultSection = "update-profile";

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>PharmaCare | Dashboard</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="flex">
                {/* Sidebar */}
                <div className="min-h-screen bg-orange-400 p-2 md:w-20 lg:w-40 transition-all duration-300">
                    <ul className="menu p-1 space-y-2">
                        {/* Admin Links */}
                        {role === 'admin' && (
                            <>
                                <li>
                                    <NavLink to="update-profile" className="flex items-center gap-2">
                                        <CgProfile className="text-lg" />
                                        <span className="hidden lg:block">MY Profile</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="admin-home" className="flex items-center gap-2">
                                        <FaHome className="text-lg" />
                                        <span className="hidden lg:block">Admin Home</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="manage-category" className="flex items-center gap-2">
                                        <BiCategory className="text-lg" />
                                        <span className="hidden lg:block">Manage Category</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="manage-users" className="flex items-center gap-2">
                                        <FaUser className="text-lg" />
                                        <span className="hidden lg:block">Manage Users</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="sales-report" className="flex items-center gap-2">
                                        <TbReportMoney className="text-lg" />
                                        <span className="hidden lg:block">Sales Reports</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="manage-advertisements" className="flex items-center gap-2">
                                        <FcAdvertising className="text-lg" />
                                        <span className="hidden lg:block">Manage Ads</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Seller Links */}
                        {role === 'seller' && (
                            <>
                                <li>
                                    <NavLink to="update-profile" className="flex items-center gap-2">
                                        <CgProfile className="text-lg" />
                                        <span className="hidden lg:block">MY Profile</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="seller-home" className="flex items-center gap-2">
                                        <FaHome className="text-lg" />
                                        <span className="hidden lg:block">Seller Home</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="manage-medicines" className="flex items-center gap-2">
                                        <AiTwotoneMedicineBox className="text-lg" />
                                        <span className="hidden lg:block">Manage Medicines</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="seller-report" className="flex items-center gap-2">
                                        <TbReportMoney className="text-lg" />
                                        <span className="hidden lg:block">Seller Reports</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="seller-advertisement" className="flex items-center gap-2">
                                        <FcAdvertising className="text-lg" />
                                        <span className="hidden lg:block">Seller Ads</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* User Links */}
                        {role === 'user' && (
                            <>
                                <li>
                                    <NavLink to="update-profile" className="flex items-center gap-2">
                                        <CgProfile className="text-lg" />
                                        <span className="hidden lg:block">MY Profile</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="payment-history" className="flex items-center gap-2">
                                        <TbReportMoney className="text-lg" />
                                        <span className="hidden lg:block">Payment History</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Common Links */}
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/" className="flex items-center gap-2">
                                <FaHome className="text-lg" />
                                <span className="hidden lg:block">Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/shop" className="flex items-center gap-2">
                                <FaSearch className="text-lg" />
                                <span className="hidden lg:block">Shop</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className="flex items-center gap-2">
                                <FiShoppingCart className="text-lg" />
                                <span className="hidden lg:block">Cart</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Dashboard Content */}
                <div className="flex-1 p-8">
                    <Navigate to={defaultSection} />
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
