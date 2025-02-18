import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css"
import "boxicons/css/boxicons.min.css"
// import addQuestions from './Components/Dashboard/addQuestions';

import './App.css'
import router from './Routes/Router';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  useEffect(()=>{
    // addQuestions()
  },[])
  return (
    <div>
      <ToastContainer />
      {/* <p> Question data added</p> */}
      <RouterProvider  router={router}/>

    </div>
  );
}

export default App;