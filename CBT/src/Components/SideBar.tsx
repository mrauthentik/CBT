import React from 'react';
import logOutUser from "./UserAuth/LogOut";
import logoImage from './logo/NEXA_LOGO-removebg-preview.png';
import { NavLink } from 'react-router-dom';
import { BiBook, BiExit } from 'react-icons/bi';
import styled from '@emotion/styled';
import { FaCog, FaHome, FaPen, FaUser } from "react-icons/fa";

const Sidebar = styled.aside`
  width: 250px;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
  color: #333;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 128, 128, 0.2);
  }

  &.active {
    background-color: #008080;
    color: white;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #333;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 128, 128, 0.2);
    color: white;
  }
`;

const SideBar = () => {
  return (
    <Sidebar>
      <LogoContainer>
        <Logo src={logoImage} alt="Logo" />
      </LogoContainer>
      <NavLinks>
        <StyledNavLink to="/dashboard">Dashboard <FaHome /></StyledNavLink>
        <StyledNavLink to="/courses">Course <BiBook /></StyledNavLink>
        <StyledNavLink to="/exams">Exams <FaPen /></StyledNavLink>
        <StyledNavLink to="/userinfo">User Info <FaUser /></StyledNavLink>
        <StyledNavLink to="/settings">Settings <FaCog /></StyledNavLink>
      </NavLinks>
      <LogoutButton onClick={logOutUser}>Log Out <BiExit /></LogoutButton>
    </Sidebar>
  );
}

export default SideBar;
