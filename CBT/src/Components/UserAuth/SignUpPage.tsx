import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import signInWithGoogle from './GoogleSignUpConfig';
import { FcGoogle } from 'react-icons/fc';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff, #008080);
  background-size: cover;
`;

const SignUpForm = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const GoogleSignInButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.8rem;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #eee;
  }
`;

const GoogleIcon = styled(FcGoogle)`
  margin-right: 0.5rem;
  font-size: 1.2rem;
`;

const SignUpPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('User signed up successfully', { autoClose: 3000, position: "top-center" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, { autoClose: 3000, position: "top-center" });
      } else {
        toast.error("An unknown error occurred.", { autoClose: 3000, position: "top-center" });
      }
    }
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
    <Container>
      <SignUpForm>
        <Title>Sign Up</Title>
        <ToastContainer />
        <form onSubmit={handleSignUp}>
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
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign Up</Button>
          <StyledLink to="/signin">Already have an account?</StyledLink>
        </form>
        <GoogleSignInButton onClick={handleSignInWithGoogle}>
          <GoogleIcon /> Sign Up with Google
        </GoogleSignInButton>
      </SignUpForm>
    </Container>
  );
};

export default SignUpPage;