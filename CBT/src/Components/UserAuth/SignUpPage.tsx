import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {createUser} from './createUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import signInWithGoogle from './GoogleSignUpConfig';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logoImage from '../logo/NEXA_LOGO-removebg-preview.png'; 

// const Container = styled.div`~
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background-image: url('https://images.unsplash.com/photo-1531315630201-bb15abeb1653?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); // Replace with your image URL
//   background-size: cover;
//   background-position: center;
// `;

const SignUpForm = styled.div`
  background-color: rgba(93, 244, 70, 0.47);
  backdrop-filter: blur(5px);
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: left;
`;

const LogoContainer = styled.div`
  position: absolute;  // Position it absolutely
  top: 20px;           // Adjust top distance
  left: 20px;          // Adjust left distance
  display: flex;       // Use flexbox for alignment
  align-items: center; // Vertically center items
`;

const Logo = styled.img`
  width: 50px;       // Adjust size as needed
  height: auto;      // Maintain aspect ratio
  margin-right: 10px; // Add some spacing between logo and text
`;

const LogoText = styled.span`
  font-size: 1.2rem;   // Adjust size as needed
  font-weight: bold; // Make it bold
  color: #333;       // Set color
  font-family: 'Poppins', sans-serif; // Use your font
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 69vh;
  background: linear-gradient(to bottom, #fff, #008080); // Initial gradient
  background-size: 200% 200%; // Make gradient larger than container
  animation: gradientAnimation 10s ease infinite; // Animate the gradient

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%; // Start position
    }
    50% {
      background-position: 100% 50%; // Move to the other side
    }
    100% {
      background-position: 0% 50%; // Back to the start
    }
  }
`;


const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.02em;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
  }
`;

const NameInputs = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const Input = styled.input`
  width: 100%; // All inputs are now full width
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-family: 'Open Sans', sans-serif;
  background-color: #f8f8f8; // Light gray background for all inputs

  &:focus {
    border-color: #008080;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 128, 128, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #008080;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, background-color 0.3s ease;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;

  &:hover {
    transform: scale(1.02);
    background-color: #006666;
  }
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-family: 'Lato', sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

const GoogleSignInButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background: #fff;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  margin-top: 1.5rem;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;

  &:hover {
    transform: scale(1.02);
  }
`;

const GoogleIcon = styled(FcGoogle)`
  margin-right: 0.8rem;
  font-size: 1.2rem;
`;
const TogglePasswordButton = styled.span`
  position: absolute;
  top: 50%;
  right: 4rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  font-size: 1.2rem;
  &:hover {
    color: #333;
  }
`;
const ToggleConfirmPasswordButton = styled.span`
  position: absolute;
  top: 62%;
  right: 4rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  font-size: 1.2rem;
  &:hover {
    color: #333;
  }
`;

const SignUpPage: React.FC<{toggleAuth: ()=> void}> = ({toggleAuth}) => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      toast.error('Passwords do no match')
    }
    createUser(email, password, fullName);
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      toast.success('Sign up Successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Sign in not successful');
      console.log(error);
    }
  };

  return (
    <Container className='signup'>
       <LogoContainer>
        <Logo src={logoImage} alt="NEXA Logo" />
        <LogoText>NEXA</LogoText>
      </LogoContainer>
      <SignUpForm className='signup-container'>
        <Title>Sign Up</Title>
        <ToastContainer />
        <form onSubmit={handleSignUp}>
          <NameInputs>
            <Input
              type="text"
              placeholder="Full Name"
              required
              value={fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Username"
              required
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
            />
          </NameInputs>
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
           <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <TogglePasswordButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </TogglePasswordButton>

          {/* Confirm Password */}
          <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <ToggleConfirmPasswordButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </ToggleConfirmPasswordButton>


          <Button type="submit">Sign Up</Button>
          <StyledLink to='' type='button' onClick={toggleAuth}>Already have an account?</StyledLink>
        </form>
        <GoogleSignInButton onClick={handleSignInWithGoogle}>
          <GoogleIcon /> Sign Up with Google
        </GoogleSignInButton>
      </SignUpForm>
    </Container>
  );
};

export default SignUpPage;