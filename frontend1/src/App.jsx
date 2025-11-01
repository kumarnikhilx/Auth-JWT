import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn';
import Home from './pages/Home';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>

    </BrowserRouter>

    
    </>
  )
}

export default App
