
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import logOutUser from "../UserAuth/LogOut";
import CourseSelection from "./CourseSelection";

import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom'; // Import NavLink
import logoImage from '../logo/NEXA_LOGO-removebg-preview.png'; // Import your logo

import { BiExit } from 'react-icons/bi';
import {FaUser} from 'react-icons/fa'

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

const Sidebar = styled.aside`
  width: 250px; // Adjust sidebar width as needed
  background-color: rgba(255, 255, 255, 0.7); // Semi-transparent white sidebar
  backdrop-filter: blur(5px);
  padding: 20px;
  display: flex;
  flex-direction: column; // Vertical layout for links
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px; // Space below the logo
  justify-content: center;
`;

const Logo = styled.img`
  width: 80px;
  height: auto;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
`;


const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #333; // Dark text color
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease; // Smooth transition on hover

  &:hover {
    background-color: rgba(0, 128, 128, 0.2); // Light teal on hover
  }

  &.active { // Style for the active/current link
    background-color: #008080;
    color: white;
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
      <Sidebar>
        <LogoContainer>
          <Logo src={logoImage} alt="Logo" />
        </LogoContainer>
        <NavLinks>
          <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
          <StyledNavLink to="/subjects">Subjects</StyledNavLink>
          <StyledNavLink to="/exams">Exams</StyledNavLink>
          <StyledNavLink to="/userinfo">User Info</StyledNavLink>
      <button onClick={logOutUser} className="logoOut-btn">Log Out <BiExit /></button>
        </NavLinks>
      </Sidebar>
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

