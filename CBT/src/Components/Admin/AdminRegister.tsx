import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../firebase'
import {doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRegister = ()=>{

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()

   const handleRegister = async ()=>{
    try{
        const register = await createUserWithEmailAndPassword (auth, email, password)
        const user = register.user

        //this code will add user to the firestore database
        await setDoc(doc(db,'admins', user.email || ""),{role:"admin"})

        toast('Admin Registered Successfully')
        //Navigate User when sign up is done
        navigate("/admin-login")
    }catch(err:unknown){
        console.log(err)
    }

   }



}