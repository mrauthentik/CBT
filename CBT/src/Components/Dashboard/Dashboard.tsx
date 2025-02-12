import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import SideBar from "../SideBar";  // Import the SideBar component
import CourseSelection from "./CourseSelection"; // Import your CourseSelection component
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff, #008080);
  background-size: 200% 200%;
  animation: gradientAnimation 10s ease infinite;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.7);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Initials = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #008080;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-size: 1rem;
  color: #333;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  margin-left: 250px; // Add margin to account for fixed sidebar
  transition: margin-left 0.3s ease-in-out; // Smooth transition
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
`;

const Welcome = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`;


const Dashboard = () => {
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFullName(user.displayName || "User");
        const nameParts = user.displayName?.split(" ") || ["User"];
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.length > 1 ? nameParts[nameParts.length - 1] : "");

        try {
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
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getInitials = () => {
    return (firstName ? firstName.charAt(0).toUpperCase() : "") +
           (lastName ? lastName.charAt(0).toUpperCase() : "");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <SideBar /> {/* Use the SideBar component here */}
      <Content>
        <Header>
          <UserInfo>
            <Initials>{getInitials()}</Initials>
            <UserName>{fullName}</UserName>
          </UserInfo>
        </Header>
        <ToastContainer />
        <Title>Dashboard</Title>
        <Welcome>Hello 👋, {fullName || "User"}!</Welcome>
        <CourseSelection /> {/* Render your CourseSelection component */}
      </Content>
    </Container>
  );
};

export default Dashboard;