import React, { useState } from 'react'
import resetPassword from './resetPassword'
import { toast,  ToastContainer } from 'react-toastify';


const ForgetPsw = () => {
     const [email, setEmail] = useState('');
   
     const handleForgetPassword = async (e: React.MouseEvent) => {
        e.preventDefault();
        resetPassword(email);
        if(setEmail === null){
            toast.error('Email Field can not be empty')
            console.log('Input is empty')
        }
        // toast.info("Password reset email sent (if email exists).");
      };
    
  return (
    <div className='forgetpsw'>
        <ToastContainer />
       <h2> Forget Password</h2>
       <p>Input your Valid mail to get password reset link</p>
       <form>
        <input type="email" 
        name="" 
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        value={email} />
        <button type='submit' onClick={handleForgetPassword}>Get Reset Link</button>
       </form>
    </div>
  )
}

export default ForgetPsw
