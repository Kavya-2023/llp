import React from 'react';
import aboutUs from '../../assets/aboutus.jpg';

const Aboutus = () => {
  return (
    <div className="bg-gray-100 mt-10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Our E-Learning Platform</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Nanoquest, where online learners embark on a journey of skill enhancement like never before.
              Our interactive learning platform is designed to engage, inspire, and empower individuals to reach their
              full potential. At Nanoquest, we understand the importance of continuous learning in today's fast-paced
              world. That's why we offer a wide range of courses and resources tailored to meet the diverse needs of
              our target audience. Whether you're looking to upskill for your career, explore a new hobby, or simply
              expand your knowledge, Nanoquest has something for everyone. Our company culture is built on a foundation
              of innovation, collaboration, and a passion for learning. We believe in creating a supportive and
              inclusive environment where learners can thrive and grow. Join us on this quest for knowledge and skills,
              and unlock your true potential with Nanoquest.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={aboutUs} alt="aboutus-img" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
