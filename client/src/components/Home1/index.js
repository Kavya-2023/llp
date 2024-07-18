import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Hero from '../Hero';
import RegisterBanner from '../RegisterBanner'; 
import './index.css';
import LoginPopup from '../LoginPopup';

const Home = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const toggleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };

  const closeRegisterModal = () => {
    setRegisterModal(false);
    // Set a flag in localStorage to indicate that the user has seen the register banner
    localStorage.setItem('hasSeenRegisterBanner', 'true');
  };

  useEffect(() => {
    // Check if the user has already seen the register banner
    const hasSeenRegisterBanner = localStorage.getItem('hasSeenRegisterBanner');
    if (!hasSeenRegisterBanner) {
      setRegisterModal(true);
    }
  }, []);

  return (
    <>
      <Navbar toggleLoginPopup={toggleLoginPopup} />
      <Hero toggleLoginPopup={toggleLoginPopup} />
      
      {loginPopup && <LoginPopup toggleLoginPopup={toggleLoginPopup} />}
      {registerModal && (
        <div className="fixed inset-x-0 top-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-96 mt-20">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeRegisterModal}
            >
              &times;
            </button>
            <RegisterBanner />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
