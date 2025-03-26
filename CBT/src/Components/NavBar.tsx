import React, { useState, useEffect } from 'react';
import logoImage from './logo/logo.jpeg';
import Modal from '../pages/Modal'; // Import the modal component
import SignUpPage from './UserAuth/SignUpPage'; // Import sign-up form
import SignInPage from './UserAuth/SignInPage'; // Import sign-in form
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'signin' | 'signup' | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const navigate = useNavigate();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change navbar color when scrolled past 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (type: 'signin' | 'signup') => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  return (
    <>
      <div
        className={`navbar fixed top-0 left-0 w-full z-50 ${
          scrolled ? 'bg-teal-600 shadow-md' : 'bg-transparent'
        } transition-all duration-300`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <div className="logo">
            <img src={logoImage} alt="Logo" className="h-10" />
          </div>

          {/* Hamburger Menu for Small Screens */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-2xl  focus:outline-none"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars  />}
            </button>
          </div>

          {/* Navigation Links */}
          <ul
            className={`links lg:flex gap-4 items-center absolute lg:static top-16 left-0 w-full lg:w-auto bg-teal-600 lg:bg-transparent lg:opacity-100 ${
              isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } lg:opacity-100 lg:pointer-events-auto transition-all duration-300`}
          >
            <li className="text-white text-center py-2 lg:py-0">
              <a href="#">Home</a>
            </li>
            <li className="text-white text-center py-2 lg:py-0">
              <a href="#">About</a>
            </li>
            <li className="text-white text-center py-2 lg:py-0">
              <a href="#">Team</a>
            </li>
            <li className="text-center py-2 lg:py-0">
              <button
                className="nav-button text-white"
                onClick={() => openModal('signin')}
              >
                Sign in
              </button>
            </li>
            <li className="text-center py-2 lg:py-0">
              <button
                className="nav-button text-white"
                onClick={() => openModal('signup')}
              >
                Sign up
              </button>
            </li>
            <li className="text-center py-2 lg:py-0">
              <button
                className="nav-button text-white"
                onClick={() => navigate('/admin')}
              >
                Admin
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={closeModal}>
          {modalType === 'signin' ? (
            <SignInPage toggleAuth={closeModal} />
          ) : (
            <SignUpPage toggleAuth={closeModal} />
          )}
        </Modal>
      )}
    </>
  );
};