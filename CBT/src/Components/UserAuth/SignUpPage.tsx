import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUpPage: React.FC<{ toggleAuth: () => void }> = ({ toggleAuth }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Sign up failed. Try again.');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <h2>Sign Up</h2>
        <p className='text-center'>Create your account</p>
        <ToastContainer />
        <form onSubmit={handleSignUp}>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            
            <option value="" className='password-container'>Select Department</option>
            <option value="info_tech" className='password-container' >Information Technology</option>
            <option value="comp_sci" className='password-container'>Computer Science</option>
          </select>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div onClick={() => setShowPassword(!showPassword)} className="password-toggle absolute bottom-97 right-18 flex items-center text-gray-400 cursor-pointer">
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle absolute bottom-79 right-18 flex items-center text-gray-400 cursor-pointer ">
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <button type="submit" className="signin-btn bg-teal-600" disabled={loading}>
            {loading ? <ThreeDots color="#fff" height={20} width={20} /> : "Sign Up"}
          </button>
        </form>
        <div className="google-signin">
          <FcGoogle /> Sign in with Google
        </div>
        <div className="link-container">
          <Link to="" type="button" onClick={toggleAuth}>Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
