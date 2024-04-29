import React ,{ useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import youtube from '../../assets/youtube.png';
import twitter from '../../assets/twitter.png';
import linkedin from '../../assets/linkedin.png';
import './index.css';

function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://e-learning-1-jycy.onrender.com/user/contactus', { name, email, phoneNumber });
      const email_res = await axios.post('https://e-learning-1-jycy.onrender.com/contactus/sendemail', { name, email, phoneNumber });

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
      alert("Error occurred.");
    }
  }

  return (
    <div className="footer-container">
      <div className="footer-content"> 
        <div className="quick-links">
          <h1>Quick Links</h1>
          <ul>
            <Link to='/'>
              <li className="link" >Home</li>
            </Link>
            <Link to='/courses'>
              <li className="link">Courses</li>
            </Link>
            <Link to='/blog'>
              <li className="link">Blog</li>
            </Link>
            <Link to='/aboutus'>
              <li className="link">About us</li>
            </Link>
            
            <Link to='/teams'>
              <li className="link">Teams</li>
            </Link>
            <Link to='/careers'>
              <li className="link">Careers</li>
            </Link>
            <Link to='/careers'>
              <li className="link">Become an Instructor</li>
            </Link>
            
          </ul>
        </div> 
        <div className="quick-links">
          <h2>Company</h2>
          <ul>
            <Link to='/contactus'>
              <li className="link">Contact us</li>
            </Link>
            <Link to='/privacypolicy'>
              <li className="link">Privacy Policy</li>
            </Link>
            <Link to='/termsandconditions'>
              <li className="link">Terms and Conditions</li>
            </Link>
            <Link to='/refundandcancellation'>
              <li className="link">Refund and Cancellation</li>
            </Link>
          </ul>
        </div> 
        
        <div className="quick-links">
          <h2>Contact Us</h2>
          <div className="contact-us-footer">
            <form onSubmit={handleSubmit} className='contact-form-container'>
              <input
                type="text"
                className="register__textBox"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              
              />
              <input
                type="text"
                className="register__textBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
              />
              <input
                type="number"
                className="register__textBox"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
                style={{width:"100%"}}
              />
              <button className="register__btn">
                Submit
              </button>
          </form>
          </div>
          <h2 style={{marginBottom:"2rem"}}>Follow us</h2>
          <ul className="quick-links-2 ">
            <li>
              <a href='https://www.facebook.com/nanoquestet' className="social-link" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" className="social-img" title="facebook"/>
              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/nanoquest' className="social-link" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" className="social-img" title="instagram"/>
              </a>
            </li>
            <li>
              <a href='https://www.twitter.com/nanoquestedtech' className="social-link" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" className="social-img" title="twitter"/>
              </a>
            </li> 
            <li>
              <a href='https://www.linkedin.com/company/100962715' className="social-link" target="_blank" rel="noopener noreferrer">
                <img src={linkedin} alt="LinkedIn" className="social-img" title="linkedin"/>
              </a>
            </li>
            <li>
              <a href='youtube.com/shorts/2zRkc4utsLM' className="social-link" target="_blank" rel="noopener noreferrer">
                <img src={youtube} alt="YouTube" className="social-img" title="youtube"/>
              </a>
            </li>
          </ul>
        </div>
     </div>
      <div className="copyright">
        © 2023&nbsp;Nanoquest All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
