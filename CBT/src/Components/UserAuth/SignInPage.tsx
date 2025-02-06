import React, {useState} from 'react'
import {auth} from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import resetPassword from './resetPassword';

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleSignIn = async(e: React.FormEvent)=>{
        e.preventDefault()
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard')
        }
        catch(error:unknown){
           
            toast.error((error as Error).message);
         console.log(error)
        }
    }
    const handleForgetPassword  = async(e: React.MouseEvent) =>{
        e.preventDefault()
        resetPassword(email)
    }
  return (
    <div>
        <h1>Sign In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ToastContainer />
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        <a href="# " onClick={handleForgetPassword}>Forgot Password?</a>
      </form>
    </div>
  )
}

export default SignInPage
