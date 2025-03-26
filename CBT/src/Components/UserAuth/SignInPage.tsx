import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from './logInUser';
import signInWithGoogle from './GoogleSignUpConfig';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner'; // Import a loader component
// import User from '../Dashboard/UserName';

const SignInPage: React.FC<{ toggleAuth: () => void }> = ({ toggleAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await loginUser(email, password);
      toast.success('Welcome back', {autoClose: 5000, position: "top-center"})
      navigate('/dashboard')   
    } catch (error) {
      toast.error('Sign in failed');
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true); // Start loading
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
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <h2>Sign In</h2>
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
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
            <div onClick={() => setShowPassword(!showPassword)} className="toggle-password">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button type="submit" className="signin-btn bg-teal-600" disabled={loading}>
            {loading ? (
              <ThreeDots color="#fff" height={20} width={20} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="google-signin" onClick={handleSignInWithGoogle}>
          {loading ? (
            <ThreeDots color="#3B82F6" height={20} width={20} />
          ) : (
            <>
              <FcGoogle /> Sign in with Google
            </>
          )}
        </div>
        <div className="link-container">
          <Link to="/forgetpsw">Forgot Password?</Link>
          <Link to="" type="button" onClick={toggleAuth}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;