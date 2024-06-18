import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const Contactus = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://llp-qxsy.onrender.com/user/contactus', {
        name,
        email,
        phoneNumber,
      });
      const email_res = await axios.post('https://llp-qxsy.onrender.com/contactus/sendemail', {
        name,
        email,
        phoneNumber,
      });

      if (email_res.data.success === true) {
        alert(email_res.data.message);
      } else {
        alert(email_res.data.message);
      }

      console.log('form submitted');

      if (res.data.success === true) {
        navigate('/');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert('Error occurred.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen mb-40">
      <Navbar />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Contact Us</h1>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column for map */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d306910.86779182736!2d78.45226138670851!3d17.411605220662402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13ab1884f719%3A0xd72102ad7e3b3947!2sWeWork!5e0!3m2!1sen!2sin!4v1712725310044!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>
          </div>

          {/* Right column for contact form and information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Contact Form */}
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                  placeholder="E-mail Address"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </form>

            {/* Contact Information */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <ul className="text-gray-700">
                <li className="mb-2">
                  <span className="font-semibold">Phone:</span> 040-49170923
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Email:</span>{' '}
                  <a href="mailto:support@nanoquesttech.in" className="text-blue-500">
                    support@nanoquesttech.in
                  </a>
                </li>
                <li>
                  <span className="font-semibold">Address:</span> We work, Roshini Tech Hub, PFS Club House, EPIP Zone,
                  Chinnapanna Halli, Bengaluru, Karnataka 560037
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
