import logOutUser from "./UserAuth/LogOut";
import logoImage from './logo/NEXA_LOGO-removebg-preview.png'; // Import your logo
import { NavLink } from 'react-router-dom'; // Import NavLink
import { BiBook,  BiExit } from 'react-icons/bi';
import styled from '@emotion/styled';
import { FaCog, FaHome, FaPen, FaUser } from "react-icons/fa";

const Sidebar = styled.aside`
  width: 250px; // Adjust sidebar width as needed
  height:100vh;
  background-color: rgba(255, 255, 255, 0.7); // Semi-transparent white sidebar
  backdrop-filter: blur(5px);
  padding: 20px;
  display: flex;
  flex-direction: column; // Vertical layout for links
  position:fixed;
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
const SideBar = () => {
  return (
    <div>
       <Sidebar>
        <LogoContainer>
          <Logo src={logoImage} alt="Logo" />
        </LogoContainer>
       <NavLinks>
          <StyledNavLink to="/dashboard">Dashboard <FaHome /> </StyledNavLink>
          <StyledNavLink to="/courses">Course <BiBook /></StyledNavLink>
          <StyledNavLink to="/exams">Exams <FaPen /> </StyledNavLink>
          <StyledNavLink to="/userinfo">User Info <FaUser /> </StyledNavLink>
          <StyledNavLink to="/settings">Settings <FaCog /> </StyledNavLink>
         <button onClick={logOutUser} className="logoOut-btn">Log Out <BiExit /></button>
        </NavLinks>
      </Sidebar>
    </div>
  )
}

export default SideBar
