import SideBar from '../SideBar'
// import { model } from '../firebase'
// import {genkit} from 'genkit'
// import generateText from '../../AI';
import { GoogleGenerativeAI } from "@google/generative-ai"
import { useEffect, useState } from 'react';


const UserInfo = () => {
const [aiResponse, setAiResponse] = useState<string>('')
const [userInput, setUserInput] = useState('');


//Gnerative AI initialization model
const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
if (!apiKey) {
  throw new Error("API key is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

useEffect(()=>{


const show = async ()=>{
  try{

    const result = await model.generateContent('About Nigeria')
    console.log(result.response.text())
    setAiResponse(result.response.text())
  }catch (error:unknown){
     console.log(error)
  }
}
show()
}, [])

  return (
    <div className='user-info'>
        <SideBar />
      <div className='user-info-container'>
        <h3>Name:</h3>
        <h3>Email:</h3>
        {/* <button onClick={run}> Run AI</button> */}
        <h2>Genkit AI response</h2>
        <textarea name="" value={aiResponse} rows={10} cols={70} id=""></textarea>
      </div>
    </div>
  )
}

export default UserInfo
