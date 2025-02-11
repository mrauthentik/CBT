import React, { useState, useEffect } from "react";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import logOutUser from "../UserAuth/LogOut";
import CourseSelection from "./CourseSelection"; // Make sure this component is defined
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import logoImage from '../logo/NEXA_LOGO-removebg-preview.png';
import { FaSignOutAlt, FaUser, FaBook, FaChartBar, FaHome } from 'react-icons/fa';
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

const Sidebar = styled.aside`
  width: 250px;
  background-color: rgba(93, 244, 70, 0.47);
  backdrop-filter: blur(5px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 50px;
  height: auto;
  margin-right: 10px;
`;

const LogoText = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  text-decoration: none;
  color: #333;
  transition: background-color 0.3s;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 128, 128, 0.2);
  }
`;

const NavIcon = styled.span`
  margin-right: 0.8rem;
  font-size: 1.2rem;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
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

const LogoutButton = styled.button`
  background-color: #008080;
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;

  &:hover {
    background-color: #006666;
  }
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
      <Sidebar>
        <LogoContainer>
          <Logo src={logoImage} alt="NEXA Logo" />
          <LogoText>NEXA</LogoText>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/dashboard">
            <NavIcon><FaHome /></NavIcon> Dashboard
          </NavLink>
          <NavLink to="/exam">
            <NavIcon><FaBook /></NavIcon> Exam
          </NavLink>
          <NavLink to="/subject">
            <NavIcon><FaChartBar /></NavIcon> Subject
          </NavLink>
          <NavLink to="/userinfo">
            <NavIcon><FaUser /></NavIcon> User Info
          </NavLink>
        </NavLinks>
        <LogoutButton onClick={logOutUser}>
          <NavIcon><FaSignOutAlt /></NavIcon> Logout
        </LogoutButton>
      </Sidebar>
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
        <CourseSelection /> {/* Render CourseSelection */}
      </Content>
    </Container>
  );
};

export default Dashboard;