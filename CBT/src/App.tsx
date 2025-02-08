import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
// import addQuestions from './Components/Dashboard/addQuestions';

import './App.css'
import router from './Routes/Router';

const App: React.FC = () => {
  useEffect(()=>{
    // addQuestions()
  },[])
  return (
    <div>
      {/* <p> Question data added</p> */}
      <RouterProvider  router={router}/>

    </div>
  );
}

export default App;