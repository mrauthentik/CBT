import SideBar from '../SideBar'
import { model } from '../firebase'
// import {genkit} from 'genkit'
import generateText from '../../AI';
import { useEffect, useState } from 'react';


const UserInfo = () => {
const [aiResponse, setAiResponse] = useState<string>('')

useEffect (()=>{
  const fetchAiResponse = async () => {
    const response = await generateText('Hello, Gemeini!')
    setAiResponse(response)
  }
  fetchAiResponse ()
},[])


async function run() {
  try{

    const prompt = 'Write a story about Nigeria'
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()
    console.log(text)
  }catch(error)
  {
      console.log("Could not generate text :", error)
  }
  // console.log("this is the Genkit: ",genkit)
}
  return (
    <div className='user-info'>
        <SideBar />
      <div className='user-info-container'>
        <h3>Name:</h3>
        <h3>Email:</h3>
        <button onClick={run}> Run AI</button>
        <h2>Genkit AI response</h2>
        <p>{aiResponse}</p>
      </div>
    </div>
  )
}

export default UserInfo
