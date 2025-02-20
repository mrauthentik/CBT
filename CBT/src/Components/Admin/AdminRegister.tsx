import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../firebase'
import {doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AdminRegister = ()=>{

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()

   const handleRegister = async ()=>{
    try{
        const register = await createUserWithEmailAndPassword (auth, email, password)
        const user = register.user

        //this code will add user to the firestore database
        await setDoc(doc(db,'admin', user.email || ""),{role:"admin"})

        toast('Admin Registered Successfully')
        //Navigate User when sign up is done
        navigate("/admin-login")
    }catch(err:unknown){
        toast.error('Could not register Admin')
        console.log(err)
    }

   }

   return (
       <div className="admin-container">
         <ToastContainer />
        <h2>Admin Register</h2>
         <input 
            type="email" 
            value={email}
            placeholder="input email"
            onChange={(e)=>setEmail(e.target.value)}
            /> <br />
            <input 
                type="password"
                placeholder="Create a Password"
                value={password}
                onChange={(e)=>setpassword(e.target.value)} 
                
                />

              <button onClick={handleRegister}> Register</button>  
     </div>
   )



}
export default AdminRegister