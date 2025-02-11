import {  GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { toast} from 'react-toastify';
import { auth } from '../firebase';

    const signInWithGoogle = async () => {
       
        try{
          const provider = new GoogleAuthProvider()
          const result = await signInWithPopup (auth, provider)
          
          console.log('Google Sign-In Success:', result.user)
          toast.success('Google Sign-In Success')
         
          const user = result.user
          if(user){
            console.log("Google User:", user)
            return user
          }else{
            console.log("No user data returned from Google sign-in")
            return null
          }
          
        }catch (error:unknown){
            console.log('Google Sign-In Error:', error)
        }
        
        
    }
    

export default signInWithGoogle
