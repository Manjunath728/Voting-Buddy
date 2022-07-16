import React from 'react'
import Header from '../header/Header'
import { Link, Outlet } from 'react-router-dom';
import Footer from "../footer/Footer";

function LandingPage() {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default LandingPage