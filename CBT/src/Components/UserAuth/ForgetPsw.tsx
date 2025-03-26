import React, { useState } from 'react';
import resetPassword from './resetPassword';
import { toast, ToastContainer } from 'react-toastify';

const ForgetPsw = () => {
  const [email, setEmail] = useState('');

  const handleForgetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email field cannot be empty');
      console.log('Input is empty');
      return;
    }
    try {
      await resetPassword(email);
      toast.success('Password reset email sent (if email exists).');
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-6">
      <div className="bg-white p-8 md:p-10 rounded-lg shadow-lg w-full max-w-md">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Reset Your Password</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address, and we'll send you a reset link.
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
          />
          <button
            type="submit"
            onClick={handleForgetPassword}
            className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPsw;
