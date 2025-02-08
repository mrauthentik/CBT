import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import resetPassword from './resetPassword';
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

const SignInForm = styled.div`
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

const LinkContainer = styled.div`  // New: Container for the links
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ForgotPasswordLink = styled.a`
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

const SignUpLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        toast.error('Failed to sign in');
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const handleForgetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    resetPassword(email);
    toast.info("Password reset email sent (if email exists).");
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      toast.success('Sign in with Google Successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error("Could not sign in with Google Account");
      console.error(error);
    }
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
        </form>
        <LinkContainer> {/* Links are now in the LinkContainer */}
          <ForgotPasswordLink href="#" onClick={handleForgetPassword}>
            Forgot Password?
          </ForgotPasswordLink>
          <SignUpLink to="/signup">Don't have an account?</SignUpLink>
        </LinkContainer>
        <GoogleSignInButton onClick={handleSignInWithGoogle}>
          <GoogleIcon /> Sign in with Google
        </GoogleSignInButton>
      </SignInForm>
    </Container>
  );
};

export default SignInPage;