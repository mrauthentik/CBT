import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase'
import {doc, getDoc} from '../firebase/firestore'
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const handleLogin = async () =>{
        try{
            const useCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = useCredential.user

            //Code to verify if user is an admin
            const adminRef = doc(db, "admin", user.email || "")
            const adminSnap = await getDoc(adminRef)

            if(adminRef.exists()){
                navigate('/admin')
            }else{
                console.log("Access Denied: You are not an Admin")
            }

        }catch(error:unknown){
         console.log(error)
        }
    }

    return (
        <div className="admin-login-container">
            <input 
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            
        </div>
    )
}

export default AdminLogin