import styled from '@emotion/styled';
import { Link } from 'react-router-dom'; // If you're using React Router

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between; // Space logo and buttons
  align-items: center;
  padding: 1rem; // Adjust padding as needed
  background-color: #333; // Example background color
  color: #fff;
`;

const Logo = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  margin-left: 1rem; // Add some left margin
`;

const CTAButton = styled(Link)` // Use Link for routing (if applicable)
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none; // Remove underlines from links
  color: #fff;
  transition: background-color 0.3s ease; // Smooth transition

  &:hover {
    background-color: #555; // Darker on hover
  }
`;

const SignInButton = styled(CTAButton)`
  background-color: transparent;
  border: 1px solid #fff;

`;

const RegisterButton = styled(CTAButton)`
  background-color: #007bff; // Example color
  border: none;

  &:hover {
    background-color: #0056b3; // Darker on hover
  }
`;

export const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>E-EXAM</Logo>
      <div>
        <SignInButton to="/signin">Sign In</SignInButton> {/* Use 'to' for React Router */}
        <RegisterButton to="/signup">Register</RegisterButton>
      </div>
    </NavbarContainer>
  );
};