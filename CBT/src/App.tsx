
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Import your LandingPage component
import './App.css'
import Home from './Components/Home'
import SignUpPage from './Components/UserAuth/SignUpPage'
import SignInPage from './Components/UserAuth/SignInPage';
import Dashboard from './Components/Dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Route for LandingPage */}
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;