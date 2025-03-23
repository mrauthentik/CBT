import React from 'react';
// import { Header } from '../Components/Header';
import { Navbar } from '../Components/NavBar';
import "../App.css"
import Hero from './Hero';


const LandingPage: React.FC = () => {
  return (
   <> 
   <Navbar />
  <Hero />
   </>
  );
};

export default LandingPage;