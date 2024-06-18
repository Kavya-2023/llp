import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import blog1 from '../../assets/logo.png';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { auth, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPopup = ({ toggleLoginPopup, loginPopup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setError] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      toggleLoginPopup(false);
      
      navigate('/');
    }
  }, [navigate,email]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    try {
      await logInWithEmailAndPassword(email, password); // Firebase login
      const response = await axios.post(
        'https://llp-qxsy.onrender.com/user/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { result, token } = response.data;
      const { email: userEmail, _id: id } = result;

      localStorage.setItem('email', userEmail);
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      toggleLoginPopup(false);

      Cookies.set('jwt_token', token, { expires: 30, path: '/' });

      navigate('/');
      toast.success('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
      toast.error('Login failed. Please try again.');
    }

    setEmail('');
    setPassword('');
  };

  const handleFirebaseLogin = async () => {
    try {
      await signInWithGoogle();
      toggleLoginPopup(false);
      toast.success('Login with Google successful');
    } catch (error) {
      console.error('Firebase login failed:', error);
      toast.error('Firebase login failed. Please try again.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error('Please enter all fields');
      return;
    }

    try {
      await registerWithEmailAndPassword(name, email, password); // Firebase registration
      const response = await axios.post('https://llp-qxsy.onrender.com/user/signup', { name, email, password });
      console.log('Sign up successful:', response.data);
      setShowSignIn(!showSignIn);
      toast.success('Sign up successful. Please log in.');
    } catch (err) {
      console.error('Sign up error:', err);
      setError('Sign up failed. Please try again.');
      toast.error('Sign up failed. Please try again.');
    }
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <ToastContainer />
      {!loginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 overflow-y-auto pt-[140px]">
          <div className="relative h-auto w-[80%] sm:w-[80%] md:w-[50%] lg:w-[50%] xl:w-[30%] bg-white rounded-xl shadow-lg m-3">
            <button onClick={toggleLoginPopup} className="absolute top-2 right-2 text-black text-md hover:text-gray-900">
              &times;
            </button>
            <div className="p-5 sm:p-8 rounded-l">
              <div className="flex items-center mb-4">
                <img src={blog1} alt="Logo" className="h-10 w-10 mr-2" />
                <h1 className="text-2xl font-bold">{showSignIn ? 'Sign Up' : 'Login'}</h1>
              </div>
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
                {err && <p className="text-red-500 text-sm mb-4">{err}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-1 rounded-full hover:bg-blue-600">
                  {showSignIn ? 'Sign Up' : 'Login'}
                </button>
                <p className="text-center text-gray-500 m-1 text-sm">{showSignIn ? 'or sign up with' : 'or login with'}</p>
                <button
                  type="button"
                  className="w-full flex items-center justify-center bg-red-500 text-white py-1 rounded-full hover:bg-red-600"
                  onClick={handleFirebaseLogin}
                >
                  <FaGoogle className="mr-2 bg-transparent" /> Google
                </button>
                <p
                  className="text-gray-400 text-sm cursor-pointer hover:text-blue-500 mt-4"
                  onClick={() => setShowSignIn(!showSignIn)}
                >
                  {showSignIn ? 'Already have an account? Login here' : 'No Account? Create an account here'}
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPopup;
