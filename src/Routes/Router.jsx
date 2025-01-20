import React from 'react';
import {
    createBrowserRouter
  } from "react-router-dom";
import Home from '../Pages/Home';
import Layouts from '../Layouts/Layouts';
import Login from '../Pages/Login';
import AuthLayouts from '../Layouts/AuthLayouts';
import Register from '../Pages/Register';

const Router =createBrowserRouter([
    {
        path: "/",
        element: <Layouts></Layouts>,
        children: [
            {
              path: "/",
              element: <Home></Home>
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
  ]);

export default Router;