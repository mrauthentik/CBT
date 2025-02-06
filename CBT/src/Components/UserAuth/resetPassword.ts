import { sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"
import {getAuth} from 'firebase/auth'

const auth = getAuth()

//The forget password functionality
const resetPassword = async(email:string): Promise<void> => {
    try{
        await sendPasswordResetEmail(auth, email);
        toast.success('Password reset link sent to email', { autoClose: 3000, position: "top-center" });
    }
    catch(error:unknown ){
        toast.error('Could not send password reset link,  make sure you input your valid mail in the email input', { autoClose: 6000, position: "top-center" });
        console.log(error)
    }
}

export default resetPassword
