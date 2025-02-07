import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import resetPassword from './resetPassword';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff, #008080);
  background-size: cover;
`;

const SignInForm = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 1 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #008080;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #008080;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #006666;
  }
`;

// const ErrorMessage = styled.p`
//   color: red;
//   margin-top: 0.5rem;
//   text-align: center;
// `;

const ForgotPasswordLink = styled.a`
  color: #007bff; /* Example link color */
  text-decoration: none;
  display: block; /* Make it a block element so it takes full width */
  margin-top: 1rem;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;


const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        // setError(error.message);
        toast.error(error.message);
      } else {
        // setError("An unknown error occurred.");
        toast.error("An unknown error occurred.");
      }
    }
  };

  const handleForgetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    resetPassword(email);
    toast.info("Password reset email sent (if email exists)."); // Inform user
  };

  return (
    <Container>
      <SignInForm>
        <Title>Sign In</Title>
        <ToastContainer />
        <form onSubmit={handleSignIn}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Sign In</Button>
          <ForgotPasswordLink href="#" onClick={handleForgetPassword}>
            Forgot Password?
          </ForgotPasswordLink>
        </form>
      </SignInForm>
    </Container>
  );
};

export default SignInPage;