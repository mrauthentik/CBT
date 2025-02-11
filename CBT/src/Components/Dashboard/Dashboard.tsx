
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import CourseSelection from "./CourseSelection";

import styled from '@emotion/styled';


import {FaUser} from 'react-icons/fa'
import SideBar from "../SideBar";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh; // Ensure full viewport height
  background: linear-gradient(to bottom, #fff, #008080); // Gradient background
  background-size: 200% 200%; // For animation
  animation: gradientAnimation 10s ease infinite; // Animate the gradient

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;



const Content = styled.main`
  flex: 1; // Takes up remaining space
  padding: 20px;
  overflow-y: auto; // Add scroll if content overflows
`;


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
    return <i>Loading...</i>; // Show a loading state while fetching data
  }

  return (
    <div className="dashboard">
       <DashboardContainer>
      <SideBar />
      <Content>
        <div className="user">
        <FaUser className="user-icon" />
          <p>{fullName || "User"}</p>
        </div>
        {/* Your dashboard content goes here */}
        <h2>Welcome to your dashboard! {fullName || 'User'}</h2>
        <h1>Dashboard Content</h1>
      <CourseSelection />
      </Content>
    </DashboardContainer>
     
      
    </div>
  );
};

export default Dashboard;

