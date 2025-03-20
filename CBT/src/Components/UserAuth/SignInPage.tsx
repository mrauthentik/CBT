import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import {loginUser} from './logInUser';
// import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

// import styled from '@emotion/styled';
import signInWithGoogle from './GoogleSignUpConfig';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
// import logoImage from '../logo/NEXA_LOGO-removebg-preview.png'; 




const SignInPage: React.FC<{toggleAuth: () => void}> = ({ toggleAuth}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, password);
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
    <div className='login'>
      
      <div className='signin-container'>
        <h2>Sign In</h2>
        <ToastContainer />
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
          <input
            type={showPassword ? "text":"password"}
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <div onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className='link-container'>
          <a href="#">
          <Link to='/forgetpsw'>Forgot Password?</Link>  
          </a>
          <Link to="" type='button' onClick={toggleAuth}>Don't have an account?</Link>
        </div>
        <div onClick={handleSignInWithGoogle}>
          <FcGoogle /> Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default SignInPage;