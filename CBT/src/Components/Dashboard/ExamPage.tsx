
import React, { useEffect , useState} from 'react'
import {useParams } from 'react-router-dom'
import { collection,  getDocs, query, where } from 'firebase/firestore'
import {db} from '../firebase'


type Question = {
    id:string;
    text: string;
    type: "single-choice" | "fill-in-the-blank";
    options?:string[]
    correctAnswer:string
}

const ExamPage: React.FC = () => {
    const {courseId} = useParams();
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(true)
    
    useEffect(()=> {
       
        const fetchQuestions = async () =>{
            console.log("Fetching courses data.......")
            if(!courseId) return
            try{
                const questioncollection = query(collection(db, "questions"), where("courseId", "==", courseId))
                const querySnapshot = await getDocs(questioncollection)
                const questionsList = querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    ...(doc.data() as Question)
                   
                }))
                if(querySnapshot.empty){
                    console.log( "No courses found in the firestore")
                }
                setQuestions(questionsList)
                 console.log('Questions have been fetched', questionsList.length)
            }catch(err){
                console.log("Error fectching Questions",err)
            }finally{
                setLoading(false)
            }
        }
        fetchQuestions()
    }, [courseId])
  return (
    <div>
       <h2>Exam</h2>
       {loading ? (
        <p> Loading questions....</p>
       ): questions.length === 0? (
        <p>No questions found for this course.</p>
       ): (
        <ul>
            {questions.map((question, index)=>(
                <li key={question.id}>
                    <p> {index + 1}. {question.text} </p>
                    {question.type === "single-choice" && question.options && (
                        <ul>
                            {question.options.map((option,i) =>(
                                <li key={i}>{option}</li>
                            ))}
                        </ul>
                    )}
                    {question.type=== "fill-in-the-blank" && (
                        <input type='text' placeholder='Type your answer here..'/>
                    )}
                </li>
            ))}
        </ul>
       )

       }
    </div>
  )
}

export default ExamPage
