import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';
import "./index.css";
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar11 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
    <nav>
      <Link to="/" className="title">
        <img className='main-logo' src="https://res.cloudinary.com/ajaymedidhi7/image/upload/v1706082314/MicrosoftTeams-image_1_tiacii.jpg" alt="Logo" title="logo"/>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/courses">COURSES</NavLink>
        </li>
        <li className='nav-item' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <Link to="#">
            COMPANY <FontAwesomeIcon icon={faCaretDown} style={{color:"blue"}}/>
          </Link>
          <ul className={`dropdown ${isDropdownOpen ? 'active' : ''}`}>
            <li><Link to="/aboutus">About us</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </li>
        <li>
          <NavLink to="/blog">BLOG</NavLink>
        </li>
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
                    <h6 style={{color:"black",textDecoration:"underline"}}>Enrolled Courses:</h6>
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
                <Link to='/'>
                  Settings
                </Link>
              </p>
              <p className="profile-btn">
                <Link to='/cart'>Cart</Link>
              </p>
              <p onClick={handleLogout} className="profile-btn">
                <Link to='#'>
                  Logout
                </Link>
              </p>
              </div>
              <p className="fortgot-password"  onClick={handleForgotPassword}>Change Password</p>
            </ul>
          </li>
        ) : (
          <li>
            <Link to="/signup" className='btn-login'>
              SignUp
            </Link>
          </li>
        )}
        <li>
          <p style={{marginTop:".6rem"}}>040-49170923</p>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar11;
