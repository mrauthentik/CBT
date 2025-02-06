import React, {useState} from 'react'
import {auth} from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  return (
    <div>
        <h1>Sign In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

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
      </form>
    </div>
  )
}

export default SignInPage
