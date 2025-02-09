import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom'; // Import NavLink
import logoImage from '../logo/NEXA_LOGO-removebg-preview.png'; // Import your logo

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

const Dashboard: React.FC = () => {
  return (
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
        </NavLinks>
      </Sidebar>
      <Content>
        {/* Your dashboard content goes here */}
        <h1>Dashboard Content</h1>
        <p>Welcome to your dashboard!</p>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;