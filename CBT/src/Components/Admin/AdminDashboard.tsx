import { useState } from "react"
import { db } from "../firebase"
import { addDoc, collection } from 'firebase/firestore';

const AdminDashboard = () => {
    const [question, setQuestion] = useState("")
  return (
    <div>
      <h2>Admin Dashboard</h2>
    </div>
  )
}

export default AdminDashboard
