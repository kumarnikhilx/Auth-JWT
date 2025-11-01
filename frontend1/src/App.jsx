import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import { Navigate } from 'react-router-dom';
import { dataContext } from './context/UserContext';

function App() {
      let{userData,setUserData}=useContext(dataContext);
  
  return (
    <>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/" element={userData?<Home/>:<Navigate to={"login"}/>}/>
    </Routes>


    
    </>
  )
}

export default App
