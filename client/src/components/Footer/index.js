import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faYoutube, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './index.css';

function Footer() {
  

  return (
    <footer className="footer-container pt-5 m-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/courses'>Courses</Link></li>
              <li><Link to='/blog'>Blog</Link></li>
              <li><Link to='/aboutus'>About us</Link></li>
              <li><Link to='/teams'>Teams</Link></li>
              <li><Link to='/careers'>Careers</Link></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><Link to='/contactus'>Contact us</Link></li>
              <li><Link to='/privacypolicy'>Privacy Policy</Link></li>
              <li><Link to='/termsandconditions'>Terms and Conditions</Link></li>
              <li><Link to='/refundandcancellation'>Refund and Cancellation</Link></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-12 mb-4">
            <h5>Contact Us</h5>
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt}/>&nbsp;
              <span className='address-text'>We work, Roshini Tech Hub, PFS Club House, EPIP Zone, Chinnapanna Halli, Bengaluru, Karnataka 560037.</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone}/>&nbsp;
              <span className='address-text'>: 040-49170923</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faEnvelope}/>&nbsp;<span className='address-text'>:support@nanoquesttech.in</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark text-white py-3">
        <div className="container bg-dark">
          <div className="row align-items-center bg-dark">
            <div className="col-md-12 bg-dark text-center">
              © 2023 Nanoquest All rights reserved.
            </div>
            <div className="col-md-12 bg-dark">
              <ul className="list-inline social-media bg-dark text-center">
                <li className="list-inline-item bg-dark">
                  <a href="https://www.facebook.com/nanoquestet" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} className='footer-icon' />
                  </a>
                </li>
                <li className="list-inline-item bg-dark">
                  <a href="https://www.instagram.com/nanoquest" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className='footer-icon' />
                  </a>
                </li>
                <li className="list-inline-item bg-dark">
                  <a href="https://www.twitter.com/nanoquestedtech" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} className='footer-icon' />
                  </a>
                </li>
                <li className="list-inline-item bg-dark">
                  <a href="https://www.linkedin.com/company/100962715" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} className='footer-icon' />
                  </a>
                </li>
                <li className="list-inline-item bg-dark" >
                  <a href="https://youtube.com/shorts/2zRkc4utsLM" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faYoutube} className='footer-icon' />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
