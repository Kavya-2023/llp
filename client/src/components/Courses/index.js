import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader'; 
import './index.css';
import Footer from '../Footer';

const Courses = () => {
  const [totalData, setTotalData] = useState(null); 

  useEffect(() => {
    fetchTotalData();
  }, []);

  const fetchTotalData = async () => {
    try {
      const response = await axios.get('https://llp-qxsy.onrender.com/course/getallcourses');
      if (response.status === 200) {
        setTotalData(response.data);
      } else {
        console.error("Failed to fetch total data");
      }
    } catch (error) {
      console.error("Error fetching total data:", error);
    }
  };

  return (
    <>
      
      <div className="courses-container">
        <h1 className='text-center text-blue-700 font-bold text-2xl mb-10 sm:mt-0'>Nanoquest Skills Categories</h1>
        {
          totalData === null ? (
            <Loader /> 
          ) : (
            <div className="card__container">
              {
                totalData.map((item) => (
                  <article key={item._id} className="card__article">
                    <img src={item.imgUrl} alt="image" className="card__img" />
                    <div className="card__data">
                      <h2 className="card__title">{item.category}</h2>
                      <Link to={`/subcourse/${item._id}`} className="card__button">View More</Link>
                    </div>
                  </article>
                ))
              }
            </div>
          )
        }
      </div>
     
    </>
  );
};

export default Courses;
