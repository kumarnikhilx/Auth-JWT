import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const dataContext = createContext();

function UserContext({ children }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const serverURL = "http://localhost:8000";

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${serverURL}/api/getuserdata`, {
        withCredentials: true,
      });
      setUserData(data.user);
    } catch (error) {
      if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
        navigate("/login");
      }
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const value = { serverURL, userData, setUserData, getUserData };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export default UserContext;
