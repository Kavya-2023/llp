import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const sections=[
  {
    title:"Quick Links",
    items:['Home','Courses','Blog','AboutUs','Teams','Careers']
  },
  {
    title:"Company",
    items:["ContactUs","Privacy Policy","Terms and Conditions","Refund and Cancellation"]
  }
]

const socialicons=[
  {
    icon:FaFacebook,
    link:"https://www.facebook.com/nanoquestet",
  },
  {
    icon:FaInstagram,
    link:"https://www.instagram.com/nanoquest",
  },
  {
    icon:FaYoutube,
    link:"https://youtube.com/shorts/2zRkc4utsLM"
  },
  {
    icon:FaTwitter,
    link:"https://www.twitter.com/nanoquestedtech"
  },
  {
    icon:FaLinkedin,
    link:"https://www.linkedin.com/company/100962715"
  }
]

function Footer() {
  

  return (
    <>
      <div className='w-full  bg-slate-900 text-gray-300 py-2 px-2 sm:pl-3 md:pl-3' >
        <div className='bg-transparent max-w-[1240px] mx-auto grid sm:grid-cols-1  md:grid-cols-2   lg:grid-cols-3 border-b-2 border-gray-600 py-8'>
          {
            sections.map((item,index)=>(
              <div className='bg-slate-900' key={index}>
                <h6 className='font-bold uppercase pt-2 bg-transparent'>{item.title}</h6>
                <ul className='bg-slate-900 flex-start flex flex-col'>
                  {item.items.map((it,i)=>(
                    <Link to={`/${it.toLowerCase()}`} className='no-underline hover:no-underline'>
                    <li key={i} className=' bg-slate-900 py-1 text-gray-500 hover:text-white cursor-pointer'>
                      {it}
                    </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))
          }
          <div className="bg-transparent">
            <h6 className='font-bold uppercase pt-2 bg-transparent'>Contact Us</h6>
            <div className='bg-transparent'>
              <FontAwesomeIcon icon={faMapMarkerAlt} className='bg-transparent'/>&nbsp;
              <span className='bg-transparent py-1 text-gray-500 hover:text-white cursor-pointer'>We work, Roshini Tech Hub, PFS Club House, EPIP Zone, Chinnapanna Halli, Bengaluru, Karnataka 560037.</span>
            </div>
            <div className='bg-transparent'>
              <FontAwesomeIcon icon={faPhone} className='bg-transparent'/>&nbsp;
              <span className='bg-transparent py-1 text-gray-500 hover:text-white cursor-pointer'> 040-49170923</span>
            </div>
            <div className='bg-transparent'>
              <FontAwesomeIcon icon={faEnvelope} className='bg-transparent'/>&nbsp;<span className='bg-transparent py-1 text-gray-500 hover:text-white cursor-pointer'> support@nanoquesttech.in</span>
            </div>
          </div>
        </div>
        <div className='bg-slate-900 grid grid-cols-1 place-items-center'>
          <div className="bg-transparent">
              © 2023 Nanoquest All rights reserved.
            </div>
            <div className="bg-slate-900">
              <ul className='bg-slate-900 flex justify-between text-2xl w-[200px]'>
                {
                  socialicons.map((item,ind)=>{
                    return <a href={`${item.link}`}>
                      <item.icon key={ind} className=' text-white bg-slate-900 hover:text-gray-400 cursor-pointer'/>
                    </a>
                  })
                }
              </ul>
            </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
