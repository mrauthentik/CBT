import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../firebase'
import {doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const AdminRegister = ()=>{

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()

   const handleRegister = async ()=>{
    try{
        const register = await createUserWithEmailAndPassword (auth, email, password)
        const user = register.user

        
    }catch(err:unknown){
        console.log(err)
    }

   }



}