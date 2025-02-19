import React from 'react';
import {
  createBrowserRouter
} from "react-router-dom";
import Home from '../Pages/Home';
import Layouts from '../Layouts/Layouts';
import Login from '../Pages/Login';
import AuthLayouts from '../Layouts/AuthLayouts';
import Register from '../Pages/Register';
import Shop from '../Pages/Shop';
import CategoryDetails from '../Pages/CategoryDetails';
import Cart from '../Pages/Cart';
import UpdateProfile from '../Pages/Dropdown/UpdateProfile';
import Dashboard from '../Layouts/Dashboard';
import ManageCategory from '../Pages/Dashboard/ManageCategory';
import ManageMedicines from '../Pages/Dashboard/ManageMedicines';
import ManageUsers from '../Pages/Dashboard/ManageUsers';
import Payments from '../Pages/Dashboard/Payment/Payments';
import PaymentHistory from '../Pages/Dashboard/PaymentHistory';
import InvoicePage from '../Pages/Invoice';
import SalesReport from '../Pages/Dashboard/SalesReport';
import SellerReport from '../Pages/Dashboard/SellerReport';
import SellerAdvertisement from '../Pages/Dashboard/SellerAdvertisement';
import ManageAdvertisements from '../Pages/Dashboard/ManageAdvertisements';
import AdminHome from '../Pages/Dashboard/adminHome';
import SellerHome from '../Pages/Dashboard/SellerHome';
import JoinUs from '../Components/JoinUs';
import PrivateRoutes from './PrivateRoutes';



const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts></Layouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/shop",
        element: <Shop></Shop>
      },
      {
        path: "/join-us",
        element: <JoinUs></JoinUs>
      },
      {
        path: "/invoice",
        element: <InvoicePage></InvoicePage>
      },
      {
        path: "/categoryDetails/:category",
        element: <CategoryDetails></CategoryDetails>
      },

      {
        path: "/categoryDetails",
        element: <CategoryDetails></CategoryDetails>
      },
      {
        path: "/cart",
        element: <PrivateRoutes><Cart></Cart></PrivateRoutes>
      },
      {
        path: "payment",
        element: <Payments></Payments>
      },

    ]
  },

  {
    path: "auth",
    element: <AuthLayouts></AuthLayouts>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "update-profile",
        element: <UpdateProfile></UpdateProfile>
      },

      {
        path: "admin-home",
        element: <AdminHome></AdminHome>
      },
      {
        path: "seller-home",
        element: <SellerHome></SellerHome>
      },
      {
        path: "manage-category",
        element: <ManageCategory></ManageCategory>
      },
      {
        path: "manage-medicines",
        element: <ManageMedicines></ManageMedicines>
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>
      },
      {
        path: "manage-advertisements",
        element: <ManageAdvertisements></ManageAdvertisements>
      },
      {
        path: "sales-report",
        element: <SalesReport></SalesReport>
      },
      {
        path: "seller-report",
        element: <SellerReport></SellerReport>
      },
      {
        path: "seller-advertisement",
        element: <SellerAdvertisement></SellerAdvertisement>
      },
      
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>
      }
    ]
  }



]);

export default Router;