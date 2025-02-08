// Definition: Dashboard component of the application
import logOutUser from "../UserAuth/LogOut"
import CourseSelection from "./CourseSelection"

const Dashboard = () => {
  return (
    <div className=" dashboard">
      Welcome to the Dashboard page
      <button onClick={logOutUser}> Logo Out</button>
      <CourseSelection />
    </div>
  )
}

export default Dashboard
