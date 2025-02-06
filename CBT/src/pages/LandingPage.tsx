// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col"> {/* Full-screen, column layout */}
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20 px-8 md:px-16 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-4 text-center">E-Exam: Revolutionizing Online Testing</h1>
        <p className="text-2xl mb-8 text-center max-w-3xl">
          Secure, reliable, and easy-to-use platform for conducting computer-based tests.
        </p>
        <div className="flex space-x-4"> {/* Buttons container */}
        <Link to="/signup"> {/* Link to the /signup route */}
         <button className="bg-white text-blue-500 py-3 px-6 rounded-lg font-semibold hover:bg-blue-100 transition">
            Get Started  {/* Button text */}
         </button>
        </Link>
        <button className="bg-transparent border border-white text-white py-3 px-6 rounded-lg font-semibold hover:bg-white/20 transition">
          Learn More
        </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 md:px-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Responsive grid */}
            <div className="text-center">
              <i className="fas fa-lock fa-3x mb-4 text-blue-500"></i> {/* Example icon (Font Awesome) */}
              <h3 className="text-xl font-semibold mb-2">Secure Testing</h3>
              <p className="text-gray-700">Advanced security measures to prevent cheating and ensure exam integrity.</p>
            </div>
            <div className="text-center">
              <i className="fas fa-chart-line fa-3x mb-4 text-blue-500"></i> {/* Example icon */}
              <h3 className="text-xl font-semibold mb-2">Real-time Results</h3>
              <p className="text-gray-700">Get instant results and detailed analytics after each exam.</p>
            </div>
            <div className="text-center">
              <i className="fas fa-user-graduate fa-3x mb-4 text-blue-500"></i> {/* Example icon */}
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-700">Intuitive interface for creating, managing, and taking exams.</p>
            </div>
            {/* Add more feature blocks here */}
          </div>
        </div>
      </section>


      {/* Testimonials (Optional) */}
        {/* ... */}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-8 md:px-16 text-center">
        <p>&copy; {new Date().getFullYear()} E-Exam. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;