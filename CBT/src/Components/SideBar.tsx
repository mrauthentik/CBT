import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logOutUser from "./UserAuth/LogOut";
import logoImage from "./logo/NEXA_LOGO-removebg-preview.png";
import { BiBook, BiExit } from "react-icons/bi";
import { FaCog, FaHome, FaPen, FaUser, FaBars, FaTimes } from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open state

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
        <NavLink className="style-nav" to="/dashboard">
          <FaHome /> {isOpen && "Dashboard"}
        </NavLink>
        <NavLink className="style-nav" to="/courses">
          <BiBook /> {isOpen && "Courses"}
        </NavLink>
        <NavLink className="style-nav" to="/exampage">
          <FaPen /> {isOpen && "Exams"}
        </NavLink>
        <NavLink className="style-nav" to="/userinfo">
          <FaUser /> {isOpen && "User Info"}
        </NavLink>
        <NavLink className="style-nav" to="/settings">
          <FaCog /> {isOpen && "Settings"}
        </NavLink>
        <button onClick={logOutUser} className="logoOut-btn">
          <BiExit /> {isOpen && "Log Out"}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
