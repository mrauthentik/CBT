import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import logOutUser from "../UserAuth/LogOut";
import CourseSelection from "./CourseSelection";

const Dashboard = () => {
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Current User UID:", user.uid); // Log the UID for debugging
        setFullName(user.displayName || "User");
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            // const userData = userDoc.data();
            
          } else {
            console.error("User document does not exist in Firestore!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("No authenticated user found!");
      }
      setLoading(false); // Set loading to false once data is fetched or error occurs
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading state while fetching data
  }

  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard</h2>
      <button onClick={logOutUser}>Log Out</button>
      <h2>Welcome, {fullName || "User"}!</h2>
      <CourseSelection />
    </div>
  );
};

export default Dashboard;
