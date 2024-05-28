import React from 'react';

import { useState} from 'react';
import NavBar from '../Navbar';
import Footer from '../Footer';
import Hero from '../Hero';

import './index.css';
import LoginPopup from '../LoginPopup';

const Home = () => {
  
  const [loginPopup,setLoginPopup]=useState(true);

  const toggleLoginPopup=()=>{
    setLoginPopup(!loginPopup);
  }
  return (
    <>
      <NavBar toggleLoginPopup={toggleLoginPopup}/>
      <Hero toggleLoginPopup={toggleLoginPopup}/>
      <Footer />
      <LoginPopup toggleLoginPopup={toggleLoginPopup} loginPopup={loginPopup}/>
    </>
  );
};

export default Home;


