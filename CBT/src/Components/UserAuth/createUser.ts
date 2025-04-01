
import {auth,db} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, doc, serverTimestamp, setDoc, getDocs, where, query} from "firebase/firestore"
import router from '../../Routes/Router';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

export const createUser = async (email: string, password: string, fullName:string) => {  
      
    try {
        //This logic is check if email has already been used to sign up before
        const q = query(collection(db, "users"), where("email", "==", email))
        const querySnapshot =await getDocs(q)
        
        if(!querySnapshot.empty){
          toast.error('This email is already in use. Try logging in instead')
          throw new Error('This email is already in use.')
        }

        //Check authentication system for exisiting email
        

        //Create New user Account
        const userCredential =  await createUserWithEmailAndPassword (auth, email , password )
        const user = userCredential.user
        await updateProfile(user, {displayName: fullName})

       await setDoc (doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        createdAt: serverTimestamp(),
       });
       toast.success('User signed up successfully', { autoClose: 3000, position: "top-center" });
       router.navigate('/dashboard')
        console.log('Sign up success', userCredential.user)
       
    }
    catch (error){
        if (error instanceof Error) {
            toast.error(error.message, { autoClose: 3000, position: "top-center" });
          } else {
            toast.error("An unknown error occurred.", { autoClose: 3000, position: "top-center" });
          }
    }
}

//function for the Google Sign-in

