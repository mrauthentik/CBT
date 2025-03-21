import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where,doc, getDoc } from "firebase/firestore";
import { db , auth} from "../firebase";


//Import to add students progress
import { addProgressData } from "./addProgressData";
import { updateProgressData } from "./updatProgressData";

import {  toast } from "react-toastify";

import { GoogleGenerativeAI } from "@google/generative-ai"

import { Timer } from "./Timer";
import SideBar from "../SideBar";
import User from "./UserName";
import { BiCheck } from "react-icons/bi";

const ExamPage: React.FC = () => {
  const { courseId } = useParams(); // Get courseId from URL
  // const navigate = useNavigate();

  // State management
  const [showInstructions, setShowInstructions] = useState(true)
  const [questions, setQuestions] = useState<
    { id: string; question: string; options: string[]; correctAnswer: string; type:string;}[]
  >([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [examTime, setExamTime] = useState(600)
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false)
  // const [stopTimer, setStopTimer] = useState(false)
  const [questionLoaded, setQuestionsLoaded] = useState(false)
 const [explanations, setExplanations] = useState<{[key:string]:string}>({})

  useEffect(() => {
    const fetchTimerSettings = async () =>{
        try{
          setLoading(true)
            const settingsDoc = await getDoc(doc(db, "settings", 'global'));
            if(settingsDoc.exists()){
              setExamTime(settingsDoc.data().duration)
            }
            console.log("Timer settings fetched successfully 🚀🚀")
        }catch(error){
          console.log("Error fetching timer settings",error)
        }
    }

    const fetchQuestions = async () => {
      try {
        const questionsCollection = collection(db, "questions");
        const q = query(questionsCollection, where("courseId", "==", courseId))
        const questionSnapshot = await getDocs(q);
        const questionList = questionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as {
          id: string;
          question: string;
          options: string[];
          correctAnswer: string;
          type: string;
         
        }[];

        //This Logic is to shuffle questions using Fisher-Yates algorithm

        for(let i = questionList.length - 1; i > 0; i--){
          const j = Math.floor(Math.random() * (i + 1));
          [questionList[i], questionList[j]] = [questionList[j], questionList[i]]
        }
          
        setQuestions(questionList);
        setQuestionsLoaded(true)

      } catch (err) {
        console.error("Error fetching questions", err);
        toast.error("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTimerSettings()
    fetchQuestions();

    // Timer logic
    
  }, []);

  //AI Intetegration
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
if (!apiKey) {
  throw new Error("API key is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

const getExplanation = async (questions: string, correctAnswer:string) => {

  try{
     const prompt = ` Provide a **short and clear explanation** for why "${correctAnswer}" is the correct answer to "${questions}". Format response in **HTML tags** like <b>bold</b>, <h3>headings</h3>, and <ul><li>lists</li></ul> if necessary.`
    const result = await model.generateContent(prompt)
    return result.response.text()
    }
  catch (error:unknown){
    console.log("Could not fetch response",error)
    return "Could not fetch response"
  }
   
}

const handleExplanation = async (questionId: string, question:string, correctAnswer: string) => {

  const explanation = await getExplanation(question,correctAnswer)
  setExplanations((prev)=>({...prev, [questionId]:explanation}))
}

  // Handle selecting an answer
  const handleOptionSelect = (questionId: string, selectedOption: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
   
  };



  
  // Handle exam submission
  const handleSubmit = async () => {
    let correctCount = 0;
  
    // Calculate the score
    questions.forEach((question) => {
      if (answers[question.id]?.trim().toLowerCase() === question.correctAnswer.toLowerCase()) {
        correctCount++;
      }
    });
    
    const finalScore = correctCount;
    setScore(finalScore);
    const userCourseId: string = courseId || "defaultCourseId";
  
    // Save or update progress data in Firestore
    const today = new Date().toISOString().split("T")[0]; // Format: "2023-10-01"
    try {
      console.log("Submitting score:", finalScore, "for date:", today); // Debug log
  
      // Check if progress data for today already exists
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No authenticated user found!");
      }
  
      const progressRef = collection(db, `users/${user.uid}/progress`);
      const q = query(progressRef, where("date", "==", today), where("courseId", "==", courseId));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        // No entry exists, so add a new one
        await addProgressData(today, finalScore, userCourseId);
        console.log("Progress data added successfully:", { date: today, score: finalScore });
      } else {
        // Entry exists, so update it
        await updateProgressData(today, finalScore, userCourseId);
        console.log("Progress data updated successfully:", { date: today, score: finalScore });
      }

      const percentage = (finalScore / totalQuestions) * 100; // Calculate percentage
      const remark = getRemark(percentage);
      
      toast.success(`Exam submitted! You scored ${finalScore} out of ${questions.length}.`);
      setShowAnswers(true);
    } catch (error) {
      console.error("Error saving progress data:", error);
      toast.error("Failed to save progress data.");
    }
    // setExamTime{[]}
    setExamTime(0)
  };
  

  const handleRetakeExam = () =>{
    setAnswers({})
    setScore(null)
    setShowAnswers(false)
    setExplanations({})
    // setExamTime()
  }

  const handleStartExam = ()=> {
    setShowInstructions(false)
  }

  //This logic gives students remark
  const getRemark = (percentage: number): string => {
    if (percentage >= 100) {
      return "Outstanding! You aced it! 🎉";
    } else if (percentage >= 70) {
      return "Great job! Keep up the good work! 💪";
    } else if (percentage >= 50) {
      return "Good effort! You can do even better next time! 😊";
    } else if (percentage >= 20) {
      return "Don't give up! Keep practicing and you'll improve! 🌟";
    } else {
      return "Keep trying! Practice makes perfect! 💡";
    }
  };


  //this code is to caclulate Exam Progress
  const totalQuestions = questions.length
  const answeredQuestions = Object.keys(answers).length
  const unansweredQuestions = totalQuestions - answeredQuestions
  const progressPercentage = (answeredQuestions / totalQuestions) * 70

  return (
    <div>
    <SideBar />
    <User />
    
    {/* Show instruction condition */}
    {showInstructions ? (
      <div className="instruction-container">
        <h2>Exam Instructions</h2>
        <ul>
            <li > <span className='bx bxs-check-circle'></span>  Read all questions carefully before answering.</li>
            <li> <span className='bx bxs-check-circle'></span>  Choose the best answer for each question.</li>
            <li> <span className='bx bxs-check-circle'></span>The exam will be timed. Ensure you manage your time wisely.</li>
            <li> <span className='bx bxs-check-circle'></span>Once you submit, you cannot change your answers.</li>
            <li> <span className='bx bxs-check-circle'></span>Your progress will be tracked in real-time.</li>
          </ul>
          <button className="start-exam-btn" onClick={handleStartExam}>
            Start Exam
          </button>
      </div>
    ):(
       <div className="exam-container">
       <h2>Exam for {courseId}</h2>
       <Timer stopTimer initialTime={questionLoaded ? examTime : 600} onTimeUp={handleSubmit} />
     {loading ?(
         <p> loading questions .... </p>
     ) : questions.length === 0 ? (
         <p> No questions available for this course</p>
     ): (
 
 
       <div className="question-list">
         <div className="progress-container">
           <p>
             <strong>{answeredQuestions}</strong> answered | <strong>{unansweredQuestions}</strong> 
           </p>
           <div className="progress-bar">
             <div className="progress" style={{width: `${progressPercentage}%`}}></div>
           </div>
         </div>
 
        {/* Questions  */}
         {questions?.length === 0 && <p>No questions available.</p>}
         {questions?.map((question,index) => (
           <div key={question.id} className="question-item">
             <h3>{index + 1}.{question.question}</h3>
            
            {question.type === "multiple-choice"  ? (

             <div className="options">
                 
               {question?.options?.map((option, index) => (
                 <label key={index} className="option">
                   
                   <input
                     type="radio"
                     name={question.id}
                     value={option}
                     checked={answers[question.id] === option}
                     onChange={() => handleOptionSelect(question.id, option)}
                     disabled={showAnswers}
                   />
                   {option}
                 </label>
               ))}
             </div>
            ):(
              <input
              type="text"
              name={question.id}
              placeholder="Type your answer"
              value={answers[question.id] || ""}
              onChange={(e) => handleOptionSelect(question.id, e.target.value)}
              disabled={showAnswers}
          />
            )}

            {/* Show Correct/incorrect icons after submission */}
            {showAnswers && (
              <div className="answer-feedback">
                    {answers[question.id]?.trim().toLowerCase() === question.correctAnswer.toLowerCase() ? (
                      <span className="correct-icon">
                        <BiCheck size={24} color="green" /> Correct
                      </span>
                    
                    ) : (
                      <span className="incorrect-icon">
                     ❌ Incorrect
                    </span>
                )} 
              </div>
            )}

              {/* This logic shows correct answers after submission */}
              {showAnswers && (
                <div className="ai-container">

                <p className ="correct-answer">
                  Correct Answer: <strong>{question.correctAnswer} </strong>
                   </p>
                   <button className="ai-explain-btn" onClick={()=> handleExplanation(question.id,question.question, question.correctAnswer)}>Nexa Explain 🧠</button>
                  
                  {/* AI Explaination Box */}

                  {explanations[question.id] ?(
                      <div className="ai-explanation-box">
                        <h4>Nexa Explanation</h4>
                        <p className="explanation" dangerouslySetInnerHTML={{__html:explanations[question.id]}}/> 
                      </div>
                  ):(
                      <p className="loading-text">⏳ Waiting for AI response...</p>
                    )}
                  
                </div>
                  )
              }
           </div>
         ))}
       </div>
     )}


     {/* This code show score and retake button */}

       {score === null ? (
         <button onClick={handleSubmit} className="submit-btn">
           Submit Exam
         </button>
       ) : (
         <>
         <h3>Your Score: {score} / {questions.length}</h3>
         <button onClick={handleRetakeExam} className='retake-btn'>Retake Exam </button>
        </>
       )}
     </div>
    )     
   
    }

    </div>
  );
};

export default ExamPage;

