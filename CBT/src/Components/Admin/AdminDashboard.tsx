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
    const [correctAnswer, setCorrectAnswer] = useState("")

    const handleSubmit = async ()=>{
        if(!question || !optionA || !optionB || !optionC || optionD){
            toast.info('Please fill in all fields')
        }
        try{
            //this will push the questions to the firestore db
           await addDoc(collection(db, "questions"), {
            question,
            options: {
                A: optionA,
                B: optionB,
                C: optionC,
                D: optionD,
            }, 
            correctAnswer,
           }) 
           console.log('Question Added succesfully')
           toast.done('Question added successfully')
           setQuestion("")
           setOptionA("")
           setOptionB("")
           setOptionC("")
           setOptionD("")
           setCorrectAnswer("")


        }catch(error:unknown){
            console.log(error)
            toast.error(`Question was not added: ${error}`)
        }

    }
  return (
    <div className="admin-dashboard">
    <h2>Admin Dashboard - Add Questions</h2>
    <input
      type="text"
      placeholder="Enter question"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />
    <input
      type="text"
      placeholder="Option A"
      value={optionA}
      onChange={(e) => setOptionA(e.target.value)}
    />
    <input
      type="text"
      placeholder="Option B"
      value={optionB}
      onChange={(e) => setOptionB(e.target.value)}
    />
    <input
      type="text"
      placeholder="Option C"
      value={optionC}
      onChange={(e) => setOptionC(e.target.value)}
    />
    <input
      type="text"
      placeholder="Option D"
      value={optionD}
      onChange={(e) => setOptionD(e.target.value)}
    />
    <input
      type="text"
      placeholder="Correct Answer (A, B, C, D)"
      value={correctAnswer}
      onChange={(e) => setCorrectAnswer(e.target.value)}
    />
    <button onClick={handleSubmit}>Add Question</button>
  </div>
  )
}

export default AdminDashboard
