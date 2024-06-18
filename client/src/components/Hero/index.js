import React from 'react'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import desktopImg from '../../assets/desktop-landing-image.jpg';
import serviceImg1 from '../../assets/service-img-1.avif';
import serviceImg2 from '../../assets/service-img-2.avif';
import serviceImg3 from '../../assets/service-img-3.avif';
import wcu1 from '../../assets/wcu-1.avif';
import wcu2 from '../../assets/wcu-2.avif';
import Carousel from '../Carousel';

const Hero = ({toggleLoginPopup}) => {
    const [typedText, setTypedText] = useState("");
    const [startTyping, setStartTyping] = useState(false);
    
    useEffect(() => {
        setStartTyping(true);
    }, []);

    useEffect(() => {
        const text = 'Nanoquest';
        let index = 0;
        let intervalId;

        if (startTyping) {
            const typeText = () => {
                intervalId = setInterval(() => {
                    if (index <= text.length) {
                        setTypedText(text.slice(0, index));
                        index++;
                    } else {
                        setTimeout(() => {
                            index = 0;
                            setTypedText('');
                        }, 1000);
                    }
                }, 300);
            };
            typeText();
        }
        return () => clearInterval(intervalId);
    }, [startTyping]);

    return (
        <div className="px-4 md:px-8 lg:px-16">
            <div className="home-container mt-3 flex flex-col lg:flex-row items-center justify-between">
                <div className="home-content">
                    <motion.h1
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            delay: 0.2,
                            x: { type: "string", stiffness: 60 },
                            opacity: { duration: 1 },
                            ease: "easeIn",
                            duration: 1
                        }}
                        className="home-heading text-3xl md:text-4xl lg:text-5xl font-bold"
                    >
                        Welcome To {typedText}
                        <span className="typing-cursor"></span>
                    </motion.h1>
                    <motion.p
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            delay: 0.3,
                            x: { type: "string", stiffness: 60 },
                            opacity: { duration: 1 },
                            ease: "easeIn",
                            duration: 1
                        }}
                        className="home-description text-lg md:text-xl lg:text-2xl mt-4"
                    >
                        Explore our wide range of skill courses to enhance your knowledge and expertise. Learn at your own pace with our elearning platform.
                    </motion.p>
                    <motion.button
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            delay: 0.4,
                            x: { type: "string", stiffness: 60 },
                            opacity: { duration: 0.6 },
                            ease: "easeIn",
                            duration: 1
                        }}
                        className="glow-on-hover mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg text-sm"
                        type="button"
                        onClick={() => toggleLoginPopup(true)}
                    >
                        Upgrade Your Skills
                    </motion.button>
                </div>
                <div className='desktop-img-container mt-6 lg:mt-0'>
                    <motion.img
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            delay: 0.2,
                            x: { type: "string", stiffness: 60 },
                            opacity: { duration: 1 },
                            ease: "easeIn",
                            duration: 1
                        }}
                        src={desktopImg}
                        alt="dresses to be noticed"
                        className="home-desktop-img w-full lg:w-1/2 h-auto rounded-lg shadow-md"
                        loading="lazy"
                    />
                </div>
            </div>

            <h2 className='mt-20 text-center text-gray-500 text-2xl md:text-3xl lg:text-4xl'>Trending Skills</h2>
            <Carousel />

            <div className='services-container mt-12'>
                <div className='service-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    <div className='service-card bg-white p-6 rounded-lg shadow-md'>
                        <div className='service-card-content mb-4'>
                            <motion.h4
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.2,
                                    x: { type: "string", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1
                                }}
                                className="text-xl font-semibold"
                            >
                                Skill Courses
                            </motion.h4>
                            <motion.p
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.4,
                                    x: { type: "string", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1
                                }}
                                className="text-base"
                            >
                                Choose from a wide range of skill courses designed to help you develop and master new skills.
                            </motion.p>
                        </div>
                        <div className='service-card-image'>
                            <motion.img
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: 0.4,
                                    scale: { type: "spring", stiffness: 260, damping: 20 },
                                    opacity: { duration: 1 },
                                    ease: "easeInOut",
                                    duration: 1
                                }}
                                src={serviceImg1} alt="service-img" className='service-img w-full h-auto rounded-lg'
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className='service-card bg-white p-6 rounded-lg shadow-md'>
                        <div className='service-card-content mb-4'>
                            <motion.h4
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.2,
                                    x: { type: "string", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1
                                }}
                                className="text-xl font-semibold"
                            >
                                Real-time Feedback
                            </motion.h4>
                            <motion.p
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.4,
                                    x: { type: "string", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1
                                }}
                                className="text-base"
                            >
                                Get instant feedback and personalized recommendations to improve your learning.
                            </motion.p>
                        </div>
                        <div className='service-card-image'>
                            <motion.img
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: 0.4,
                                    scale: { type: "spring", stiffness: 260, damping: 20 },
                                    opacity: { duration: 1 },
                                    ease: "easeInOut",
                                    duration: 1
                                }}
                                src={serviceImg2} alt="service-img" className='service-img w-full h-auto rounded-lg'
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className='service-card bg-white p-6 rounded-lg shadow-md'>
                        <div className='service-card-image mb-4'>
                            <motion.img
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: 0.4,
                                    scale: { type: "spring", stiffness: 260, damping: 20 },
                                    opacity: { duration: 1 },
                                    ease: "easeInOut",
                                    duration: 1
                                }}
                                src={serviceImg3} alt="service-img" className='service-img w-full h-auto rounded-lg'
                            />
                        </div>
                        <div className='service-card-content'>
                            <motion.h4
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.2,
                                    x: { type: "string", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1
                                }}
                                className="text-xl font-semibold"
                            >
                                Interactive Quizzes
                            </motion.h4>
                            <motion.p
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.4,
                                    x: { type: "string", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1
                                }}
                                className="text-base"
                            >
                                Test your knowledge and track your progress with our interactive quizzes.
                            </motion.p>
                        </div>
                    </div>

                    <div className='service-card bg-white p-6 rounded-lg shadow-md'>
                        <div className='service-card-image mb-4'>
                            <motion.img
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: 0.4,
                                    scale: { type: "spring", stiffness: 260, damping: 20 },
                                    opacity: { duration: 1 },
                                    ease: "easeInOut",
                                    duration: 1
                                }}
                                src={serviceImg1} alt="service-img" className='service-img w-full h-auto rounded-lg'
                                loading="lazy"
                            />
                        </div>
                        <div className='service-card-content'>
                            <motion.h4
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.2,
                                    x: { type: "string", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1
                                }}
                                className="text-xl font-semibold"
                            >
                                Community Support
                            </motion.h4>
                            <motion.p
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.3,
                                    x: { type: "string", stiffness: 60 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1
                                }}
                                className="text-base"
                            >
                                Connect with a community of learners and experts to share ideas and get support.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='testimonials-container mt-16'>
                <motion.h4
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 100,
                        damping: 10
                    }}
                    className='testimonials-heading text-2xl md:text-3xl lg:text-4xl font-bold text-center'
                >
                    Testimonials
                </motion.h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
                    <motion.figure
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: 0.6,
                            duration: 0.5,
                            type: 'spring',
                            stiffness: 100,
                            damping: 10
                        }}
                        className="snip1533 bg-white p-6 rounded-lg shadow-md"
                    >
                        <figcaption>
                            <blockquote>
                                <p>If you do the job badly enough, sometimes you don't get asked to do it again.</p>
                            </blockquote>
                        </figcaption>
                    </motion.figure>

                    <motion.figure
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: 0.8,
                            duration: 0.5,
                            type: 'spring',
                            stiffness: 100,
                            damping: 10
                        }}
                        className="snip1533 bg-white p-6 rounded-lg shadow-md"
                    >
                        <figcaption>
                            <blockquote>
                                <p>I'm killing time while I wait for life to shower me with meaning and happiness.</p>
                            </blockquote>
                        </figcaption>
                    </motion.figure>

                    <motion.figure
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: 0.9,
                            duration: 0.5,
                            type: 'spring',
                            stiffness: 100,
                            damping: 10
                        }}
                        className="snip1533 bg-white p-6 rounded-lg shadow-md"
                    >
                        <figcaption>
                            <blockquote>
                                <p>The only skills I have the patience to learn are those that have no real application in life. </p>
                            </blockquote>
                        </figcaption>
                    </motion.figure>
                </div>
            </div>

           <div className='why-choose-container mt-16'>
            <div className='why-choose-card bg-cover bg-center bg-no-repeat bg-white p-6 bg-opacity-50 rounded-lg shadow-md flex flex-col lg:flex-row items-center w-[300px] h-[300px] mb-3'
                style={{ backgroundImage: `url(${wcu1})` }}>
                <div className='why-choose-card-content lg:ml-6 bg-transparent'>
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-xl md:text-2xl lg:text-3xl  text-white font-bold bg-transparent"
                    >
                        Why Choose NanoQuest for Skillbased elearning
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-4 text-base md:text-lg lg:text-xl text-white"
                    >
                        Discover the power of skillbased interactive elearning with NanoQuest. Enhance your knowledge and expertise in a fun and engaging way. Join our platform today!
                    </motion.p>
                </div>
            </div>

            <div className='why-choose-card bg-cover bg-center bg-no-repeat bg-black p-6 rounded-lg shadow-md flex flex-col lg:flex-row items-center  w-[300px] h-[300px] bg-opacity-90 '
                style={{ backgroundImage: `url(${wcu2})` }}>
                <div className='why-choose-card-content lg:ml-6 bg-transparent'>
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-xl md:text-2xl lg:text-3xl  text-white font-bold bg-transparent"
                    >
                        How NanoQuest Revolutionizes elearning
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-4 text-md md:text-lg lg:text-xl text-white bg-transparent"
                    >
                        Experience a new era of elearning with NanoQuest. Our skillbased interactive platform offers a unique and effective way to learn. Discover the features that make NanoQuest the leading choice for online education.
                    </motion.p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Hero;
