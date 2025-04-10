import { useState, useEffect } from 'react';
import logoImage from './logo/logo.jpeg';
import Modal from '../pages/Modal';
import SignUpPage from './UserAuth/SignUpPage';
import SignInPage from './UserAuth/SignInPage';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'signin' | 'signup' | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
        <div className="container mx-auto flex justify-between items-center px-5 py-4 relative">
          {/* Logo */}
          <div className="logo">
            <img src={logoImage} alt="Logo" className="h-12" />
          </div>

          {/* Hamburger Menu for Small Screens */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-3xl focus:outline-none"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Navigation Links */}
          <ul
            className={`lg:flex gap-6 items-center absolute lg:static top-16 left-0 w-full lg:w-auto bg-teal-700 lg:bg-transparent transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
            } lg:opacity-100 lg:pointer-events-auto flex flex-col lg:flex-row py-4 lg:py-0`}
          >
            {['Home', 'About', 'Team'].map((item, index) => (
              <li key={index} className="text-white text-lg py-2 px-6 hover:bg-teal-800 transition rounded-lg">
                <a href="#">{item}</a>
              </li>
            ))}
            <li className="py-2 px-6">
              <button
                className="text-white text-lg hover:bg-teal-800 px-4 py-2 rounded-md transition"
                onClick={() => openModal('signin')}
              >
                Sign in
              </button>
            </li>
            <li className="py-2 px-6">
              <button
                className="text-white text-lg hover:bg-teal-800 px-4 py-2 rounded-md transition"
                onClick={() => openModal('signup')}
              >
                Sign up
              </button>
            </li>
            <li className="py-2 px-6">
              <button
                className="text-white text-lg hover:bg-teal-800 px-4 py-2 rounded-md transition"
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