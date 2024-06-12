import React, { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Body from "./Body";



const Layout = () => {
  return (
    <Fragment>
      <Header/>
      <ToastContainer theme='dark'/>
      <Body/>
      <Footer/>
    </Fragment>
  );
};

export default Layout;
