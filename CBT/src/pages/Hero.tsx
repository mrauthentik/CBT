
import logo from '../../src/Components/logo/logo.jpeg'
import "../App.css"
import uche_img from '../assets/uche.jpg'
import maggie from "../../src/Components/Team-images/maggie.jpeg";
import "../App.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const Hero = () => {

  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % teamMembers.length);
  const prev = () => setIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  const teamMembers = [
    {
      name: "Uche",
      role: "Lead Developer",
      img: logo,
      bio: "Provides technical leadership, reviews code, and ensures project success."
    },
    {
      name: "Prince Paul",
      role: "Front-End Developer",
      img: uche_img,
      bio: "Builds sleek, interactive UI components that enhance user experience.",
      socials: ["facebook", "twitter", "github", "linkedin"]
    },
    {
      name: "Muna",
      role: "Content Specialist",
      img: logo,
      bio: "Develops accurate and helpful content tailored to exam preparation."
    },
    {
      name: "Maggie",
      role: "Front-End Developer",
      img: maggie,
      bio: "Translates design into performant front-end code with seamless UI."
    },
    {
      name: "Ifeanyi",
      role: "Project Manager",
      img: logo,
      bio: "Coordinates team efforts and ensures timely feature delivery."
    },
    {
      name: "Paul Nuel",
      role: "Designer",
      img: logo,
      bio: "Designs user-friendly interfaces and maintains the visual brand identity."
    },
    {
      name: "Joel",
      role: "Nexa Support",
      img: logo,
      bio: "Offers responsive support to users and ensures smooth operation."
    }
  ];
  
  return (
    <div className="cbt">
      <div className="main">
        <div className="hero" id="home">
          <h1 className="heading">
            Take An Exam
            <br />
            Before The Exam
          </h1>
          <p className="para">
            Prepare for your exams with our
            <br />
            computer-based training platform
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="wave"
        >
          <path
            fill="teal"
            fillOpacity="1"
            d="M0,32L80,74.7C160,117,320,203,480,213.3C640,224,800,160,960,112C1120,64,1280,32,1360,16L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>

     
{/* About Code */}

<div className="about" id='about'>
      {/* Image Overlay Section */}
      <div className="img-overlay">
        <div className="img-box"></div>
        <div className="img-container">
          <img src={logo} alt="About Image" className="about-img" />
        </div>
      </div>

      {/* Text Section */}
      <div className="about-text" >
        <h2>ABOUT US <span className="underline"></span></h2>
        <p>
          <strong>NEXA:</strong> NOUN Exam Experience Assistant
        </p>
        <p>
          A computer-based training platform.
                  As freshers find it difficult to understand the school
                  exam standard, NEXA is here to help to abrest yourself to the school exam standard.
                 Take a test in practice Mode, Track your progress and see how well you can perform,
                  and get ready for the main Exam. Success is your Nickname 🚀
        </p>
      </div>
    </div>



        <div className="feat" id='features'>
            <div className="box">
                <i className='bx bx-book-open' ></i>
                <p>Course Materials</p>
                <small>Access comprehensive study materials</small>
            </div>
            <div className="box">
                <i className='bx bx-laptop'></i>
                <p>CBT</p>
                <small>Take real-time practice exams</small>
            </div>
            </div>
            <div className='features'>
            <div className="box">
                <i className='bx bxs-hourglass-top' ></i>
                <p>Timers</p>
                <small>Simulated exam environment with timers</small>
            </div>
            <div className="box">
                <i className='bx bx-timer'></i>
                <p>Tracks</p>
                <small>Track your progress and improve</small>

            </div>

        </div>


     {/* Team Section */}
     <div className="team" id="team">
        <h2 className="team-heading">
          OUR TEAM <span className="underline"></span>
        </h2>

        <div className="carousel-controls">
          <button onClick={prev} className="carousel-btn">⟨</button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="team-member"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="team-img-container">
                <img src={teamMembers[index].img} alt={teamMembers[index].name} className="team-img" />
              </div>
              <h3 className="team-name">{teamMembers[index].name}</h3>
              <p className="team-role">{teamMembers[index].role}</p>
              <p className="team-bio">{teamMembers[index].bio}</p>

              {teamMembers[index].socials && (
                <div className="socials">
                  {teamMembers[index].socials.map((icon) => (
                    <i key={icon} className={`bx bxl-${icon}`}></i>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <button onClick={next} className="carousel-btn">⟩</button>
        </div>
      </div>
        <div>
          {/* Footer Section */}
          <footer className="footer">
            <div className="footer-container">
              <div className="footer-logo">
                <img src={logo} alt="NEXA Logo" className="footer-logo-img" />
                <p className="footer-tagline">NOUN Exam Experience Assistant</p>
              </div>

              <div className="footer-links">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <a href="#home">Home</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#features">Features</a>
                  </li>
                  <li>
                    <a href="#team">Team</a>
                  </li>
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                </ul>
              </div>

              <div className="footer-social">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bx bxl-twitter"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bx bxl-instagram"></i>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bx bxl-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>
                &copy; {new Date().getFullYear()} NEXA. All Rights Reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Hero;
