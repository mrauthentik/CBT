import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

const SignUpPage: React.FC  = () => {
  
    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')  
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

  // Function to handle sign up
    const handleSignUp = async(e: React.FormEvent)=>{
        e.preventDefault()
        
        try{
        await createUserWithEmailAndPassword(auth, email, password)
        toast.success('User signed up successfully', { autoClose: 3000, position: "top-center" });
        }
        catch (error:unknown){
            setError((error as Error).message)
            toast.error('Could not sign up user', { autoClose: 3000, position: "top-center" });
        }
    }
  
    return (
    <div>
       <h1>Sign Up</h1>
       <ToastContainer />
       {error && toast.error(error) }
       <form onSubmit={handleSignUp}>
              <input type="text" placeholder="Full Name" required value={fullName} onChange={(e) => setFullName (e.target.value)}/>
              <input type="text" placeholder="Username" required value={userName} onChange={(e)=> setUserName(e.target.value)} />
              <input type="email" placeholder="Email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
              <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type='submit'>Sign Up</button>
             <Link to={'/signin'}><a>Already have an account? </a></Link> 
       </form>
    </div>
  )
}

export default SignUpPage
