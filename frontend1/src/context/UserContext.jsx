import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export const dataContext = createContext();

function UserContext({ children }) {
const [userData, setUserData] = useState({ });


  const serverURL = "http://localhost:8000";
  const getUserData=async()=>{
    try {
     let data=await axios.get(serverURL+"/api/getuserdata",{
      withCredentials:true,
     });
     setUserData(data.data.user); 
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(()=>{
    getUserData();
  },[]);
  const value = { serverURL,userData,setUserData,getUserData };


  return (
    <dataContext.Provider value={value}>
      {children}
      
    </dataContext.Provider>
  );
}

export default UserContext;
