import { useState } from "react"
import { db } from "../firebase"
import { addDoc, collection } from 'firebase/firestore';
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const [question, setQuestion] = useState("")
    const [optionA, setOptionA] = useState("")
    const [optionB, setOptionB] = useState("")
    const [optionC, setOptionC] = useState("")
    const [optionD, setOptionD] = useState("")

    const handleSubmit = async ()=>{
        if(!question || !optionA || !optionB || !optionC || optionD){
            toast.info('Please fill in all fields')
        }
        try{
           await addDoc(collection(db, "questions"))

        }catch(error:unknown){
            console.log(error)
        }

    }
  return (
    <div>
      <h2>Admin Dashboard</h2>
    </div>
  )
}

export default AdminDashboard
