import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logOutUser from "./UserAuth/LogOut";
import logoImage from "./logo/NEXA_LOGO-removebg-preview.png";
import {  BiDoorOpen, BiHome, BiLaptop, BiUser,  } from "react-icons/bi";
import { FaCog,  FaBars, FaTimes } from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open state

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
 // Inside your SideBar component

// Add this handler
const handleLinkClick = () => {
  setIsOpen(false);
};

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement).closest(".Sidebar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`Sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Hamburger Menu */}
      <button className="hamburger" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Logo */}
      <div className="logo-container">
        <img src={logoImage} alt="Logo" className="logo" />
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <NavLink className="style-nav" to="/dashboard" onClick={handleLinkClick}>
          <BiHome /> {isOpen && "Dashboard"}
        </NavLink>
        <NavLink className="style-nav" to="/courses" onClick={handleLinkClick}>
          <BiLaptop /> {isOpen && "CBT Mode"}
        </NavLink>
        {/* <NavLink className="style-nav" to="/exampage">
          <FaPen /> {isOpen && "Exams"}
        </NavLink> */}
        <NavLink className="style-nav" to="/userinfo" onClick={handleLinkClick}>
          <BiUser /> {isOpen && "User Info"}
        </NavLink>
        <NavLink className="style-nav" to="/settings" onClick={handleLinkClick}>
          <FaCog className="bot"  /> {isOpen && "Settings"}
        </NavLink>
        <button onClick={logOutUser} className="logoOut-btn">
          <BiDoorOpen /> {isOpen && "Log Out"}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
