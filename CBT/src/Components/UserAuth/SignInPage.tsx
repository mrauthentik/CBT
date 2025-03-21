import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from './logInUser';
import signInWithGoogle from './GoogleSignUpConfig';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const SignInPage: React.FC<{ toggleAuth: () => void }> = ({ toggleAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast.success('Sign in successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Sign in failed');
      console.error(error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      if (user !== null && user !== undefined) {
        toast.success('Sign in with Google successful');
        navigate('/dashboard');
      } else {
        toast.error('Google sign-in returned no user data');
      }
    } catch (error) {
      toast.error('Could not sign in with Google');
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className="sigin">
      <div className="signin-container">
        <h2>Sign In</h2>
    <div className='login'>
      
      <div className='signin-container'>
        <h2>Login In</h2>
         <p>Welcome back!</p>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>

          <div onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          <button type="submit" className='sigin-btn'>Sign In</button>

        </form>
        <div className="google-signin" onClick={handleSignInWithGoogle}>
          <FcGoogle /> Sign in with Google
        </div>
        <div className="link-container">
          <Link to="/forgetpsw">Forgot Password?</Link>
          <Link to="" type="button" onClick={toggleAuth}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

    )
  }

export default SignInPage;
