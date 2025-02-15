import SideBar from '../SideBar'
import { model } from '../firebase'


const UserInfo = () => {
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
}
  return (
    <div className='user-info'>
        <SideBar />
      <div className='user-info-container'>
        <h3>Name:</h3>
        <h3>Email:</h3>
        <button onClick={run}> Run AI</button>
      </div>
    </div>
  )
}

export default UserInfo
