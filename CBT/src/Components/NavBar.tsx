import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Modal from '../pages/Modal'; // Import the modal component
import SignUpPage from './UserAuth/SignUpPage'; // Import sign-up form
import SignInPage from './UserAuth/SignInPage'; // Import sign-in form

const NavbarContainer = styled.nav<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ scrolled }) => (scrolled ? '#222' : 'transparent')};
  color: #fff;
  transition: background-color 0.3s ease-in-out;
  z-index: 1000;
`;

const Logo = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  margin-left: 1rem;
`;

const CTAButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: #fff;
  background: black;
  border: 1px solid #fff;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #555;
  }
`;

const RegisterButton = styled(CTAButton)`
  background-color: #007bff;
  border: none;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'signin' | 'signup' | null>(null);
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
      <NavbarContainer scrolled={scrolled}>
        <Logo>E-EXAM</Logo>
        <div>
          <CTAButton onClick={() => openModal('signin')}>Sign In</CTAButton>
          <RegisterButton onClick={() => openModal('signup')}>Register</RegisterButton>
        </div>
      </NavbarContainer>

      {showModal && (
        <Modal onClose={closeModal}>
          {modalType === 'signin' ? <SignInPage toggleAuth={closeModal} /> : <SignUpPage toggleAuth={closeModal} />}
        </Modal>
      )}
    </>
  );
};
