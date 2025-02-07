import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { toast} from 'react-toastify';
import { auth } from '../firebase';


    const signInWithGoogle = async () => {
        try{
          const provider = new GoogleAuthProvider()
          const result = await signInWithPopup (auth, provider)
          console.log('Google Sign-In Success:', result.user)
          toast.success('Google Sign-In Success')
        }catch (error:unknown){
            console.log('Google Sign-In Error:', error)
        }
        
    }
    

export default signInWithGoogle
