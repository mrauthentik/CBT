
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Import your LandingPage component
import './App.css'
import Home from './Components/Home'
import SignUpPage from './Components/UserAuth/SignUpPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {


const App: React.FC = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Route for LandingPage */}
      </Routes>
    </BrowserRouter>
  );
};
   <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUpPage />} />
    </Routes>
   </Router>
  )
}

export default App;