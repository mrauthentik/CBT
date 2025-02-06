import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import LandingPage from './pages/LandingPage';
import Home from './Components/Home';
import SignUpPage from './Components/UserAuth/SignUpPage';

const App: React.FC = () => { 
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;