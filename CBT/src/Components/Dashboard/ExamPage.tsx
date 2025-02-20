import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where,doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

import { Timer } from "./Timer";
import SideBar from "../SideBar";
import User from "./UserName";

const ExamPage: React.FC = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const navigate = useNavigate();

  // State management
  const [questions, setQuestions] = useState<
    { id: string; question: string; options: string[]; correctAnswer: string }[]
  >([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [examTime, setExamTime] = useState(600)
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimerSettings = async () =>{
        try{
            const settingsDoc = await getDoc(doc(db, "settings", 'global'));
            if(settingsDoc.exists()){
              setExamTime(settingsDoc.data().duration)
            }
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
        }[];

        setQuestions(questionList);
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

  // Handle selecting an answer
  const handleOptionSelect = (questionId: string, selectedOption: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  // Handle exam submission
  const handleSubmit = () => {
    let correctCount = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    toast.success(`Exam submitted! You scored ${correctCount} out of ${questions.length}.`);

    // Navigate to dashboard after 5 seconds
    setTimeout(() => {
      navigate("/dashboard");
    }, 10000);
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
    <div className="exam-container">
      <h2>Exam for {courseId}</h2>
      <Timer initialTime={examTime} onTimeUp={handleSubmit} />
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
            <div className="progress" style={{width: `{progressPercentage}%`}}></div>
          </div>
        </div>

       {/* Questions  */}
        {questions?.length === 0 && <p>No questions available.</p>}
        {questions?.map((question,index) => (
          <div key={question.id} className="question-item">
            <h3>{index + 1}.{question.question}</h3>
            <div className="options">
                
              {question?.options?.map((option, index) => (
                <label key={index} className="option">
                  
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={() => handleOptionSelect(question.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
      {score === null ? (
        <button onClick={handleSubmit} className="submit-btn">
          Submit Exam
        </button>
      ) : (
        <h3>Your Score: {score} / {questions.length}</h3>
      )}
    </div>

    </div>
  );
};

export default ExamPage;

