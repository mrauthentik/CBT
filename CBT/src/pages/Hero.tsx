import React from 'react';
import logo from '../Components/logo/NEXA_LOGO-removebg-preview.png';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <section className="hero-content">
          <img src={logo} alt="Nexa Logo" className="hero-img" />
          <h1>Unlock Your Potential with Nexa</h1>
          <p>
            Prepare for your exams with our interactive <strong>Computer-Based Testing (CBT)</strong> platform.  
            Access a wide range of courses, take timed tests, and track your progress.
          </p>
          <ul className="hero-features">
            <li>📚 Access comprehensive study materials</li>
            <li>📝 Take real-time practice exams</li>
            <li>⏳ Simulated exam environment with timers</li>
            <li>📊 Track your progress and improve</li>
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
