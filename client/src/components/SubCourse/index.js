import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Navbar';
import Footer from '../Footer';
import './index.css';

const SubCourse = () => {
  const { id } = useParams();
  const [subCourses, setSubCourses] = useState([]);
  const [category, setCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubCourses();
  }, [id]);

  const addToCart = async (course_id, course_name, course_price) => {
    const email = localStorage.getItem("email");
    try {
      const response = await axios.post('https://llp-qxsy.onrender.com/enroll/enroll', { email, course_id: course_id.toString(), course_name, course_price });
      if (response.data.success === true) {
        console.log("Added successfully");
        navigate('/cart');
      } else {
        console.log("Error: Not added");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSubCourses = async () => {
    try {
      const response = await axios.get(`https://llp-qxsy.onrender.com/course/getsubcourses/${id}`);
      const categoryDetails = await axios.get(`https://llp-qxsy.onrender.com/course/getcoursebyid/${id}`);
      setCategory(categoryDetails.data);
      if (response.status === 200) {
        setSubCourses(response.data);
      } else {
        console.error("Failed to fetch subcourses");
      }
    } catch (error) {
      console.error("Error fetching subcourses:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="subcourses-container bg-amber-100 min-h-screen relative" style={{ backgroundImage: `url(${category.imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="overlay"></div>
        <div className="content bg-transparent min-h-full">
          <h1 className='text-left font-bold text-sm text-gray-200 pt-2 mb-10 bg-transparent'>
            <Link to='/courses' className='text-lg text-white bread-crum bg-transparent'>Courses</Link>/{category.category}
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 bg-transparent">
            {subCourses.map((subCourse) => (
              <article key={subCourse._id} className="shadow-lg m-2 p-3 rounded-lg w-[250px] bg-white">
                <h2 className="text-xl">{subCourse.course}</h2>
                <div className='flex justify-between py-2'>
                  <p className="text-sm pl-3 pt-3 text-gray-600">{subCourse.price_in_rupees !== 0 ? "Rs." + subCourse.price_in_rupees : "Free"}</p>
                  <button onClick={() => addToCart(subCourse._id, subCourse.course, subCourse.price_in_rupees)} className="px-1 text-sm border-1 hover:border-black rounded-md">Enroll Now</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default SubCourse;
