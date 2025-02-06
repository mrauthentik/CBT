// Definition: Dashboard component of the application
import logOutUser from "../UserAuth/LogOut"

const Dashboard = () => {
  return (
    <div>
      Welcome to the Dashboard page
      <button onClick={logOutUser}> Logo Out</button>
    </div>
  )
}

export default Dashboard
