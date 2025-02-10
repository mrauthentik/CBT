import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
// import resetPassword from './resetPassword';
import styled from '@emotion/styled';
import signInWithGoogle from './GoogleSignUpConfig';
import { FcGoogle } from 'react-icons/fc';
import logoImage from '../logo/NEXA_LOGO-removebg-preview.png'; 

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 50px;
  height: auto;
  margin-right: 10px;
`;

const LogoText = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 69vh;
  background: linear-gradient(to bottom, #fff, #008080);
  background-size: 200% 200%;
  animation: gradientAnimation 10s ease infinite;
  position: relative;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const SignInForm = styled.div`
  background-color: rgba(93, 244, 70, 0.47);
  backdrop-filter: blur(5px);
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: left;
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

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-family: 'Open Sans', sans-serif;

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

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const ForgotPasswordLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 1rem;
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

const SignUpLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;

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

  // const handleForgetPassword = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   resetPassword(email);
  //   toast.info("Password reset email sent (if email exists).");
  // };

  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      if (user !== null && user !== undefined) { // Explicitly check for null or undefined
        toast.success('Sign in with Google Successful');
        navigate('/dashboard');
      } else {
        toast.error("Google sign-in returned no user data.");
      }
    } catch (error) {
      toast.error("Could not sign in with Google Account");
      console.error("Google sign-in error:", error); // Include error details
    }
  };

  return (
    <Container className='sigin'>
      <LogoContainer> {/* Logo added here */}
        <Logo src={logoImage} alt="NEXA Logo" />
        <LogoText>NEXA</LogoText>
      </LogoContainer>
      <SignInForm className='signin-container'>
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
        <LinkContainer>
          <ForgotPasswordLink href="#">
          <Link to='/forgetpsw'>Forgot Password?</Link>  
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