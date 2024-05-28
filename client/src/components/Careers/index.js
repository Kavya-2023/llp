import React from 'react';
import NavBar from '../Navbar';
import './index.css';
import Footer from '../Footer';

const Careers = () => {
  return (
    <>
    <NavBar/>
    <div className='career-cards-container grid grid-cols-1'>
      <h3>Join Skill Revolution Platform</h3>
      <div className='careers-card'>
        <h4 className='apply-card-heading'>HR Associate</h4>
        <a href="https://airtable.com/app8mmy650SSrbZWy/shr2vNIadJYG9KKdO">
          <button className='apply-button'>Apply</button>
        </a>
      </div>
      <div className='careers-card'>
        <h4 className='apply-card-heading'>Graphic Designer</h4>
        <a href="https://airtable.com/app8mmy650SSrbZWy/shr2vNIadJYG9KKdO">
          <button className='apply-button'>Apply</button>
        </a>
      </div>
      <div className='careers-card'>
        <h4 className='apply-card-heading'>Full Stack Developer</h4>
        <a href="https://airtable.com/app8mmy650SSrbZWy/shr2vNIadJYG9KKdO">
          <button className='apply-button'>Apply</button> 
        </a>
      </div>
      <div className='careers-card'>
        <h4 className='apply-card-heading'>Content</h4>
        <a href="https://airtable.com/app8mmy650SSrbZWy/shr2vNIadJYG9KKdO">
          <button className='apply-button'>Apply</button>
        </a>
      </div>
      <div className='careers-card'>
        <h4 className='apply-card-heading'>Digital Martketing</h4>
        <a href="https://airtable.com/app8mmy650SSrbZWy/shr2vNIadJYG9KKdO">
          <button className='apply-button'>Apply</button>
        </a>
      </div>
      <div className='careers-card'>
        <h4 className='apply-card-heading'>Sales</h4>
        <a href="https://airtable.com/app8mmy650SSrbZWy/shr2vNIadJYG9KKdO">
          <button className='apply-button'>Apply</button>
        </a>
      </div>
  </div>
  <Footer/>
    </>
    
  );
};

export default Careers;
