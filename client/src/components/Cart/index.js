import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NavBar from '../Navbar';
import './index.css';
import Footer from '../Footer';

const Cart = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const receiptId = localStorage.getItem('id');
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const currency = "INR";
  const amount = totalAmount * 100;

  useEffect(() => {
    const amount = enrolledCourses.reduce((acc, course) => acc + parseInt(course.course_price), 0);
    setTotalAmount(amount);
  }, [enrolledCourses]);

  const onRemove = (course_id) => {
    axios.delete(`https://llp-qxsy.onrender.com/enroll/removecourse?email=${email}&course_id=${course_id}`)
      .then(res => {
        if (res && res.data && res.data.success) {
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
    axios.delete(`https://llp-qxsy.onrender.com/enroll/clearcart`, { data: { email } })
      .then(res => {
        if (res && res.data && res.data.success) {
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

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://llp-qxsy.onrender.com/order", {
        amount,
        currency,
        receipt: receiptId,
      });

      const order = response.data;

      const options = {
        key: "rzp_test_NgGFz8D718klWM",
        amount,
        currency,
        name: "NANOQUEST LLP",
        description: "Test Transaction",
        image: "https://res.cloudinary.com/ajaymedidhi7/image/upload/v1706082314/MicrosoftTeams-image_1_tiacii.jpg",
        order_id: order.id,
        handler: async function (response) {
          const body = { ...response };

          const validateRes = await axios.post("https://llp-qxsy.onrender.com/order/validate", body);
          console.log(validateRes.data);
          const jsonRes = validateRes.data;
          if (jsonRes.msg=="success") {
            await enrolledUserCourses(jsonRes.orderId, jsonRes.paymentId);
            clearCart();
            setPopupMessage("Successfully enrolled in courses!");
          } else {
            setPopupMessage("Payment validation failed. Please try again.");
          }
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 3000);
        },
        prefill: {
          name,
          email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        setPopupMessage("Payment failed. Please try again.");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      });
      rzp1.open();

    } catch (error) {
      console.error("Error during order creation:", error);
      setPopupMessage("An error occurred during order creation. Please try again.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const enrolledUserCourses = async (orderId, paymentId) => {
    try {
      const email = localStorage.getItem('email');
      const course_ids = enrolledCourses.map((course) => course.course_id);
      const order_id =orderId;
      const payment_id =paymentId;

      await axios.post('https://llp-qxsy.onrender.com/enroll/createpaidcourses', {
        email,
        course_ids,
        order_id,
        payment_id,
      });

    } catch (err) {
      console.error('Error adding enrolled courses to the database:', err);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = () => {
    axios.get(`https://llp-qxsy.onrender.com/enroll/enrolledcourses?email=${email}`)
      .then(res => {
        if (res && res.data && res.data.success) {
          setEnrolledCourses(res.data.enrolledCourses);
        } else {
          console.error("Failed to fetch enrolled courses:", res.data.message);
        }
      })
      .catch(err => {
        console.error("Error fetching enrolled courses:", err);
      });
  };

  return (
    <div className="min-h-screen">
      
      <div className="pt-20 mx-auto max-w-6xl px-4">
        <h2 className="text-gray-800 text-2xl text-center mb-6">Bag Your Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              {enrolledCourses.length <= 0
                ? <h4 className='text-xl text-center text-gray-500'>Your Cart is Empty</h4>
                : <>
                  <h3 className="text-xl font-semibold mb-4 text-zinc-700">Course Name</h3>
                  {enrolledCourses.map((item, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center">
                      <h4 className="text-sm text-gray-400 font-semibold">{item.course_name}</h4>
                      <div className='flex justrify-between flex-row gap-5'>
                        <p className='text-gray-600 text-xl'>Rs.{item.course_price}</p>
                      <FaTrash
                        onClick={() => onRemove(item.course_id)}
                        className="text-red-500 cursor-pointer hover:text-red-600"
                        size={24}
                      />
                      </div>
                    </div>
                  ))}
                </>
              }
              <p>Total: <FontAwesomeIcon icon={faRupeeSign} /> {totalAmount}</p>
              <Link to='/courses'>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-1">Add More</button>
              </Link>
            </div>
          </div>
          <div className="bg-amber-200 p-4 rounded shadow-md border border-gray-300 lg:max-h-[300px]">
            <h3 className="text-xl font-semibold bg-transparent text-gray-800">Summary</h3>
            <p>Total Enrolled Skills: <span className='bg-transparent'>{enrolledCourses.length}</span></p>
            <div className='flex bg-transparent flex-col lg:flex-row items-center'>
              <button
                className="mt-2 lg:mt-0 mb-2 lg:mb-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-1 flex items-center justify-center"
                onClick={handleCheckout}
                disabled={enrolledCourses.length <= 0}
              >
                <FaShoppingCart className="mr-2 bg-transparent" />
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="mt-2 mb-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                disabled={enrolledCourses.length <= 0}
              >
                Clear Cart
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
