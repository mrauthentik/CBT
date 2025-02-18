import React from 'react';
import { BiBookOpen, BiEdit, BiTimeFive, BiBarChart } from 'react-icons/bi';
import logo from '../Components/logo/NEXA_LOGO-removebg-preview.png';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <section className="hero-content">
          <img src={logo} alt="Nexa Logo" className="hero-img" />
          <h1>Unlock Your Potential with Nexa with Muna</h1>
          <p>
            Prepare for your exams with our interactive <strong>Computer-Based Testing (CBT)</strong> platform.  
            Access a wide range of courses, take timed tests, and track your progress.
          </p>
          <ul className="hero-features">
            <li><BiBookOpen className="hero-icon" /> Access comprehensive study materials</li>
            <li><BiEdit className="hero-icon" /> Take real-time practice exams</li>
            <li><BiTimeFive className="hero-icon" /> Simulated exam environment with timers</li>
            <li><BiBarChart className="hero-icon" /> Track your progress and improve</li>
          </ul>
          <div className="hero-btn">
            <button className="know-more">Know More</button>
            <button className="get-started">Get Started</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
