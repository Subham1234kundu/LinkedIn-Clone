import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css';

import {RouterProvider,createBrowserRouter} from "react-router-dom";
import Login from './components/Pages/Login';
import Home from "./components/Pages/Home";
import Header from "./components/Header";
import SignIn from "./components/Pages/SignIn";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Pages/Register";
import Profile from './components/Pages/Profile';
import Connection from './components/Pages/Connection';




const myRouter = createBrowserRouter([
  {path:"/",Component:Login},

  {path:"/home",element:(<><Home/><Header/></>)},
  {path:"/signin" , element:<SignIn/>},
  {path:"/register" , element:<Register/>},
  {path:"/profile" ,element:<><Profile/><Header/></>},
  {path:"/connections" , element:<><Connection/><Header/></>},
  

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <RouterProvider router={myRouter}/>
    <ToastContainer/>
  </React.StrictMode>,
)
