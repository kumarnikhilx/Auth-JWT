import React, { useContext } from 'react';
import { dataContext } from '../context/UserContext'

function Home() {
    let{userData,setUserData}=useContext(dataContext);
  return (
    <div>
      <h1>home</h1>
      <p>{userData.firstName}</p>  
      
    </div>
  )
}

export default Home
