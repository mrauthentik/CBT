import logOutUser from "./UserAuth/LogOut";
import logoImage from './logo/NEXA_LOGO-removebg-preview.png';
import { NavLink } from 'react-router-dom';
import { BiBook, BiExit } from 'react-icons/bi';
// import styled from '@emotion/styled';
import { FaCog, FaHome, FaPen, FaUser } from "react-icons/fa";


// const Sidebar = styled.aside`
//   width: 250px;
//   height: 100vh;
//   background-color: rgba(255, 255, 255, 0.7);
//   backdrop-filter: blur(5px);
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   position: fixed;
// `;

// const LogoContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
//   justify-content: center;
// `;

// const Sidebar = styled.aside`
//   width: 300px; // Adjust sidebar width as needed
//   height:100vh;
//   background-color: rgba(255, 255, 255, 0.7); // Semi-transparent white sidebar
//   backdrop-filter: blur(5px);
//   padding: 20px;
//   display: flex;
//   flex-direction: column; // Vertical layout for links
//   position:fixed;
// `;

// const LogoContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px; // Space below the logo
//   justify-content: center;
// `;

// const Logo = styled.img`
//   width: 80px;
//   height: auto;
// `;

// const NavLinks = styled.nav`
//   display: flex;
//   flex-direction: column;
// `;


// const StyledNavLink = styled(NavLink)`
//   text-decoration: none;
//   color: #333;
//   padding: 10px;
//   margin-bottom: 10px;
//   border-radius: 5px;
//   transition: background-color 0.3s ease;
//   display: block; // Key: Make NavLink a block element

//   &:hover {
//     background-color: rgba(0, 128, 128, 0.2);
//   }

//   &.active {
//     background-color: #008080;
//     color: white;
//   }
// `;

const SideBar = () => {
  return (
    <div className="Sidebar">
       {/* <Sidebar> */}

        {/* <LogoContainer> */}
        <div className="logo-container">

          <img src={logoImage} alt="Logo" className="logo" />
        </div>
        {/* </LogoContainer> */}
       <div className="nav-links">
          <NavLink className="style-nav" to="/dashboard">Dashboard <FaHome /> </NavLink>
          <NavLink className="style-nav" to="/courses">Course <BiBook /></NavLink>
          <NavLink className="style-nav" to="/exampage">Exams <FaPen /> </NavLink>
          <NavLink className="style-nav" to="/userinfo">User Info <FaUser /> </NavLink>
          <NavLink className="style-nav" to="/settings">Settings <FaCog /> </NavLink>
         <button onClick={logOutUser} className="logoOut-btn">Log Out <BiExit /></button>
        </div>
      {/* </Sidebar> */}
    </div>
  )

}

export default SideBar