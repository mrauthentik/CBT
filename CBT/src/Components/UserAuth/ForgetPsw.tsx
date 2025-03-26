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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-10 md:p-12 rounded-lg shadow-md w-full max-w-md">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forget Password</h2>
        <p className="text-center text-gray-600 mb-8">
          Input your valid email to get a password reset link.
        </p>
        <form className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            onClick={handleForgetPassword}
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Get Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPsw;