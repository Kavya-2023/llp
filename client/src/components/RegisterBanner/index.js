import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const RegisterBanner = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [skill, setSkill] = useState('');

  const courses = ["Fintech", "Virtual Reality", "Mathematics", "Block Chain", "IOT", "Animation", "Game Tech", "Mobile app development", "Language and Literacy", "Science", "Art and Creativity", "Computer Science and Technology", "Social and Emotional Learning (SEL)", "Social Studies", "Physical Education", "Environmental Education", "Critical Thinking and Problem Solving", "Life Skills", "Digital Marketing", "Programming and Web Development", "Graphic Design and Multimedia", "Soft Skills and Personal Development", "Cybersecurity", "Data Analysis and Analytics", "Sales and Customer Service", "Health and Wellness", "Finance", "Business and Entrepreneurship", "Language Learning", "Artificial Intelligence", "Augmented Reality"];

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://llp-qxsy.onrender.com/user/register', { name, mobile, skill });
      console.log(response.data); 
      alert('Successfully registered!');
      setName('');
      setMobile('');
      setSkill('');
    } catch (error) {
      console.error('Error registering:', error); 
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Online Registration</h2>
      <p className='text-sm text-gray-400 text-center'>Register now to unlock your potential with our online courses</p>
      <form onSubmit={onRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mobile</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Skill</label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          >
            <option value="">Select a skill</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Register
        </button>
      </form>
      <ToastContainer /> 
    </div>
  );
};

export default RegisterBanner;
