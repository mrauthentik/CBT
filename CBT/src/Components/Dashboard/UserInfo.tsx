import { useEffect } from 'react';
import SideBar from '../SideBar'
// import { model } from '../firebase'
// import {genkit} from 'genkit'
// import generateText from '../../AI';
import { GoogleGenerativeAI } from "@google/generative-ai"
// import { useEffect, useState } from 'react';


const UserInfo = () => {
// const [aiResponse, setAiResponse] = useState<string>('')

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
  }catch (error:unknown){
     console.log(error)
  }
}
show()
}, [])
// useEffect (()=>{
//   const fetchAiResponse = async () => {
//     const response = await fetch (
//        "https://us-central1-cbt-auth-7fb1e.cloudfunctions.net/generateAIText"
//     );
//     const data = await response.json()
//     setAiResponse(data.response)
//   }
//   fetchAiResponse()
// },[])



// async function run() {
//   try{

//     const prompt = 'Write a story about Nigeria'
//     const result = await model.generateContent(prompt)
//     const response = result.response
//     const text = response.text()
//     console.log(text)
//   }catch(error)
//   {
//       console.log("Could not generate text :", error)
//   }
//   // console.log("this is the Genkit: ",genkit)
// }
  return (
    <div className='user-info'>
        <SideBar />
      <div className='user-info-container'>
        <h3>Name:</h3>
        <h3>Email:</h3>
        {/* <button onClick={run}> Run AI</button> */}
        <h2>Genkit AI response</h2>
        <p></p>
      </div>
    </div>
  )
}

export default UserInfo
