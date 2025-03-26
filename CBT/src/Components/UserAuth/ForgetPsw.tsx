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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6 py-12">
      <div className="bg-white p-10 md:p-12 rounded-xl shadow-xl w-full max-w-lg">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Reset Your Password</h2>
        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          Enter your registered email, and we'll send you a password reset link.
        </p>
        <form className="space-y-6 space-x-8 p-8">
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            value={email}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 shadow-sm"
          />
          <button
            type="submit"
            onClick={handleForgetPassword}
            className="w-full bg-teal-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500 transition duration-200 shadow-md"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPsw;
