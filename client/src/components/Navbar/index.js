import React from 'react';
import { Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser ,faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import './index.css';

const NavBar = () => {
   const location = useLocation();
   const [userData, setUserData] = useState(null);
   const [isProfileDropdown, setIsProfileDropdown] = useState(false);
   const [enrolledCourses, setEnrolledCourses] = useState([]);
   const [user] = useAuthState(auth);
   

   const token = localStorage.getItem("token");
   const userEmail = localStorage.getItem("email");
   const fetchUserData = async () => {
    try {
      const [userResponse, coursesResponse] = await Promise.all([
        axios.get('https://llp-qxsy.onrender.com/user/profile', {
          params: { email: userEmail }
        }),
        axios.get('https://llp-qxsy.onrender.com/course/getpaidcourses', {
          params: { email: userEmail }
        })
      ]);

      if (userResponse.status === 200 && coursesResponse.status === 200) {
        setUserData(userResponse.data);
        setEnrolledCourses(coursesResponse.data.courseNames);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const handleForgotPassword = async () => {
    try {
      const email=userEmail;
      const response = await axios.post('https://llp-qxsy.onrender.com/user/forgotpassword', { email });
      if (response.status==200){
         alert("Check Your E-Mail..!")
      }
    } catch (error) {
      console.error(error);
      alert("Failed to reset password")
    }
  };


  useEffect(() => {
    if (token && userEmail) {
      fetchUserData();
    }
  }, [token, userEmail]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='navbar-container fixed-top' style={{  paddingLeft: '80px', paddingRight: '80px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Navbar.Brand href="/">
        <img className='main-logo' src="https://res.cloudinary.com/ajaymedidhi7/image/upload/v1706082314/MicrosoftTeams-image_1_tiacii.jpg" alt="Logo" title="logo"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" style={{backgroundColor:"transparent"}}>
        <Nav className="mr-auto" style={{backgroundColor:"transparent"}}>
          <Nav.Link href="/" className="nav-link" active={location.pathname === "/"}>Home</Nav.Link>
          <Nav.Link href="courses" className="nav-link" active={location.pathname === "/courses"}>Skills</Nav.Link>
          <Nav.Link href="/" className="nav-link" active={location.pathname === "/products"}>Products</Nav.Link>
          <NavDropdown title="Company" id="collasible-nav-dropdown" style={{backgroundColor:"transparent"}}>
            <NavDropdown.Item href="aboutus">About Us</NavDropdown.Item>
            <NavDropdown.Item href="contactus">Contact Us</NavDropdown.Item>
            <NavDropdown.Item href="careers">Careers</NavDropdown.Item>
            <NavDropdown.Item href="teams">Teams</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav style={{backgroundColor:"transparent"}}> 
           <Nav.Link href="#">
            {userEmail ? (
          <li className='nav-item' onMouseEnter={toggleProfileDropdown} onMouseLeave={toggleProfileDropdown}>
            <Link to="#" className="userLink">
              <div style={{ fontSize: "17px"}} className='user-icon' ><FontAwesomeIcon icon={faUser} /></div>
            </Link>
            <ul className={`profiledropdown ${isProfileDropdown ? 'active' : ''}`}>
              {userData ? (
                <div className="profile-card-content">
                  <div className="profile-header">
                    <div className="profile-header-left" s>{userData.name[0].toUpperCase()}</div>
                    <div className="profile-header-right">
                      <h5 style={{textAlign:"center",fontSize:"1rem"}}>{userData.name}</h5>
                      <p style={{textAlign:"center",fontSize:"0.8rem"}}>{userData.email}</p>
                    </div>
                  </div>
                  <div className="profile-courses-card">
                    <h6 style={{color:"black",textDecoration:"underline"}}>Enrolled Skills:</h6>
                    <ul>
                    {enrolledCourses.map((course, index) => (
                      <li key={index} style={{color:"darkgrey"}}>{course}</li>
                    ))}
                  </ul>
                  </div>
                </div>
              ) : (
                <p style={{color:"lightgrey"}}>Loading...</p>
              )}
              <div className="profile-buttons-box">
              <p className="profile-btn">
                  Settings
              </p>
              <p className="profile-btn">
                <Link to='/cart'>Cart</Link>
              </p>
              <p onClick={handleLogout} className="profile-btn">
                  Logout
              </p>
              </div>
              <p className="fortgot-password"  onClick={handleForgotPassword}>Change Password</p>
            </ul>
          </li>
        ) : (
          <li>
            <Link to="/signup" className='btn-login'>
              Register for New Skills
            </Link>
          </li>
        )}
           </Nav.Link>
          <Nav.Link id="tooltip">
            <FontAwesomeIcon icon={faPhoneAlt} />
            <span id="tooltiptext">
              support@nanoquesttech.in<br/> 040-49170923
            </span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
