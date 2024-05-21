import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavBar from '../Navbar';
import './index.css';

const Cart = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const onRemove = (course_id) => {
    const email = localStorage.getItem("email");
    axios.delete(`https://llp-qxsy.onrender.com/enroll/removecourse?email=${email}&course_id=${course_id}`)
      .then(res => {
        if (res && res.data && res.data.success === true) {
          fetchEnrolledCourses();
          console.log("Course removed successfully");
        } else {
          console.error("Failed to remove course:", res.data.message);
        }
      })
      .catch(err => {
        console.error("Error removing course:", err);
      });
  };

  const clearCart = () => {
    const email = localStorage.getItem("email");
    axios.delete(`https://llp-qxsy.onrender.com/enroll/clearcart?email=${email}`)
      .then(res => {
        if (res && res.data && res.data.success === true) {
          console.log("Cart cleared successfully");
          setEnrolledCourses([]);
        } else {
          console.error("Failed to clear cart:", res.data.message);
        }
      })
      .catch(err => {
        console.error("Error clearing cart:", err);
      });
  };

  const handleCheckout = async () => {
    const email = localStorage.getItem("email");
    const course_ids = enrolledCourses.map(course => course.course_id);
    try {
      const response = await axios.post("https://llp-qxsy.onrender.com/enroll/createpaidcourses", {
        email,
        course_ids
      });
      if (response.data.success) {
        console.log("Checkout successful:", response.data.message);
        setPopupMessage("Successfully enrolled in courses!");
        setShowPopup(true);
        setEnrolledCourses([]);
        clearCart()
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        console.error("Checkout failed:", response.data.message);
        setPopupMessage("Checkout failed. Please try again.");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      setPopupMessage("An error occurred. Please try again.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = () => {
    const email = localStorage.getItem("email");
    axios.get(`https://llp-qxsy.onrender.com/enroll/enrolledcourses?email=${email}`)
      .then(res => {
        if (res && res.data && res.data.success === true) {
          const courses = res.data.enrolledCourses;
          console.log(courses);
          setEnrolledCourses(courses);
        } else {
          console.error("Failed to fetch enrolled courses:", res.data.message);
        }
      })
      .catch(err => {
        console.error("Error fetching enrolled courses:", err);
      });
  };

  return (
    <div className="">
      <NavBar />
      <div className="pt-20 mx-auto max-w-6xl px-4">
        <h2 className="text-gray-800 text-2xl text-center mb-6">Bag Your Skills</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-zinc-700">Course Name</h3>
            <div className="grid grid-cols-1 gap-4">
              {
                enrolledCourses.length<= 0
                ?
                <h4 className='text-xl text-center text-gray-500'>Your Cart is Empty</h4>
                :
                <>
                {enrolledCourses.map((item, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center">
                  <h4 className="text-sm text-gray-400 font-semibold">{item.course_name}</h4>
                  <FaTrash
                    onClick={() => onRemove(item.course_id)}
                    className="text-red-500 cursor-pointer hover:text-red-600"
                    size={24}
                  />
                </div>
              ))}</>
              }
              <Link to='/courses'>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-1">Add More</button>
              </Link>
            </div>
          </div>
          <div className="bg-amber-200 p-4 rounded shadow-md border border-gray-300 max-h-[300px]">
            <h3 className="text-xl font-semibold bg-transparent text-gray-800">Summary</h3>
            <p>Total Enrolled Skills: <span className='bg-transparent'>{enrolledCourses.length}</span></p>
            <div className='flex bg-transparent'>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-1 flex items-center justify-center"
                onClick={handleCheckout}
                disabled={enrolledCourses.length <= 0}
              >
                <FaShoppingCart className="mr-2 bg-transparent" />
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                disabled={enrolledCourses.length <= 0}
              >
                ClearCart
              </button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">{popupMessage}</h3>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
