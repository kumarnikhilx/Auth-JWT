import React, { useContext } from 'react';
import { dataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
    let{userData,setUserData,serverURL}=useContext(dataContext);
    let navigate=useNavigate();
    if(!userData){
      navigate("/login");
    }
  

    const handleLogOut=async()=>{
      try {
       let data =await axios.post(`${serverURL}/api/logout`,{},{withCredentials:true});
       setUserData(null);
      } catch (error) {
        console.error("Error during logout:", error);
      }   
    }

  return (
    <div className='h-[100vh] w-full bg-gray-500 flex justify-center items-center flex-col gap-5'>
      <h1 className=' text-3xl text-white font-semibold mb-2'>home</h1>
      <div className="w-[100px] h-[100px] rounded-full bg-white overflow-hidden border-2 border-yellow-200">
        <img src={userData.profileImage} alt="" />
      </div>
      <p className='textr-2xl text-white font font-semibold'> Hey! <span className='text-2xl text-yellow-200 font-semibold'>{userData.firstName} </span>, Welcome To Home Page</p>  
      <button className='border-2 border-white bg-yellow-200 w-[80px] h-[50px] px-4 rounded-md' onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Home
