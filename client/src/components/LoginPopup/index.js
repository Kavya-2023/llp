import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blog1 from '../../assets/loginimage.jpg';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

import {signInWithGoogle} from "../../firebase";

const LoginPopup = ({ toggleLoginPopup, loginPopup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      toggleLoginPopup(false)
      navigate("/");
    }
    
  }, [navigate]);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    try {
      const response = await axios.post("https://llp-qxsy.onrender.com/user/login", {
        email,
        password,
      });
      const { result, token } = response.data;
      const { email: userEmail,_id:id} = result; 
      localStorage.setItem("email", userEmail);
      localStorage.setItem("id",id);
      localStorage.setItem("token", token);
      toggleLoginPopup(false)
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
    
    setEmail("")
    setPassword("")
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://llp-qxsy.onrender.com/user/signup', { name,email, password });
      console.log('Sign up successful:', response.data);
      setShowSignIn(!showSignIn)
    } catch (err) {
      console.error('Sign up error:', err);
      setError('Sign up failed. Please try again.');
    }
    setName("")
    setEmail("")
    setPassword("")
  };

  const bgImage = {
    backgroundImage: `url(${blog1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
  };

  return (
    <>
      {loginPopup && (
        <div className="bg-transparent fixed inset-0 w-full h-full z-50 overflow-y-auto flex items-center justify-center mt-20">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative h-auto w-[90%] sm:w-[80%] md:w-[60%] lg:w-[60%] xl:w-[50%] bg-white rounded-xl shadow-lg m-3">
            <button onClick={toggleLoginPopup} className="absolute top-2 right-2 text-white text-md hover:text-gray-900">
              &times;
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="p-5 sm:p-8 rounded-l">
                <h1 className="text-2xl font-bold mb-4">{showSignIn ? 'Sign Up' : 'Login'}</h1>
                <form onSubmit={showSignIn ? handleSignUp : handleLogin}>
                  <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-1 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm"
                      />
                    </div>
                  {showSignIn && (
                    <div className="mb-4">
                    <label htmlFor="username" className="block font-medium text-gray-700 text-sm">Username</label>
                    <input
                      type="text"
                      id="username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 p-1 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm"
                    />
                  </div>
                    
                  )}
                  
                  <div className="mb-4 relative">
                    <label htmlFor="password" className="block font-medium text-gray-700 text-sm">Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 p-1 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 pt-4"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  
                  <button type="submit" className="w-full bg-blue-500 text-white py-1 rounded-full hover:bg-blue-600">
                    {showSignIn ? 'Sign Up' : 'Login'}
                  </button>
                  <p className="text-center text-gray-500 m-1 text-sm">{showSignIn ? 'or sign up with' : 'or login with'}</p>
                  <button className="w-full flex items-center justify-center bg-red-500 text-white py-1 rounded-full hover:bg-red-600" onClick={signInWithGoogle}>
                    <FaGoogle className="mr-2 bg-transparent" /> Google
                  </button>
                  <p className="text-gray-400 text-sm cursor-pointer hover:text-blue-500 mt-4" onClick={() => setShowSignIn(!showSignIn)}>
                    {showSignIn ? "Already have an account? Login here" : "No Account? Create an account here"}
                  </p>
                </form>
              </div>
              <div className="hidden sm:block rounded-r" style={bgImage}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopup;
