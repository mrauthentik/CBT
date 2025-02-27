import React, { useState, useEffect } from 'react';
import logoImage from './logo/logo.jpeg';
import Modal from '../pages/Modal'; // Import the modal component
import SignUpPage from './UserAuth/SignUpPage'; // Import sign-up form
import SignInPage from './UserAuth/SignInPage'; // Import sign-in form
import { useNavigate } from 'react-router-dom';

// const NavbarContainer = styled.nav<{ scrolled: boolean }>`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem;
//   background-color: ${({ scrolled }) => (scrolled ? '#222' : 'transparent')};
//   color: #fff;
//   transition: background-color 0.3s ease-in-out;
//   z-index: 1000;
// `;

// const Logo = styled.span`
//   font-weight: bold;
//   font-size: 1.2rem;
//   margin-left: 1rem;
// `;

// const CTAButton = styled.button`
//   padding: 0.5rem 1rem;
//   border-radius: 5px;
//   color: #fff;
//   background: black;
//   border: 1px solid #fff;
//   cursor: pointer;
//   margin-left: 10px;

//   &:hover {
//     background-color: #555;
//   }
// `;

// const RegisterButton = styled(CTAButton)`
//   background-color: #007bff;
//   border: none;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'signin' | 'signup' | null>(null);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

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
 <div className="navbar">
            <div className="logo">
            <img src={logoImage} alt="Logo" className="logo" /> 
            </div>
                      
            <ul className="links">
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Team</a>
                </li>
                <li>
                    <button className="nav-button" onClick={() => openModal('signin')}>Sign in</button>
                </li>
                <li>
                    <button className="nav-button"onClick={()=> openModal('signup')}>Sign up</button>
                </li>
                <li>
                <button className="nav-button" onClick={() => navigate('/admin')}>
                  Admin
                </button>
              </li>
            </ul>
        </div>
   
      

      {showModal && (
        <Modal onClose={closeModal}>
          {modalType === 'signin' ? <SignInPage toggleAuth={closeModal} /> : <SignUpPage toggleAuth={closeModal} />}
        </Modal>
      )}
    </>
  );
};
