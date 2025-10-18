import React, { useState ,useContext} from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { dataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function LogIn() {
  const navigator= useNavigate();
  let {serverURL}= useContext(dataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


 const handleLogIn = async(e) => {
    e.preventDefault();
    try {
      const data=await axios.post(`${serverURL}/api/login`,{
        email,
        password
      },{withCredentials:true});
      console.log(data.data);
      
    } catch (error) {
      console.error("Error during sign-up:", error.response.data.message);
      alert(error.response.data.message);
    }

 }



  return (
    <div className='w-screen h-[100vh] flex justify-center items-center bg-[#1B3C53]'>
      <div className='w-[90%] max-w-[500px] h-[600px] rounded-2xl flex flex-col justify-center items-center gap-[18px] bg-[#456882]'>
        <h1 className='text-[#D2C1B6] font-bold text-[30px]'>Log In</h1>

        <form className='w-full flex flex-col justify-center items-center' onSubmit={handleLogIn} >
          
          <input
            type='email'
            placeholder='Enter your email'
            className='w-[80%] bg-amber-50 px-3 py-2 outline-none text-gray-600 rounded-2xl mb-[12px]'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className='relative w-[80%]'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              className='w-full bg-amber-50 px-3 py-2 outline-none text-gray-600 rounded-2xl mb-[12px]'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className='absolute top-[40%] right-3 transform -translate-y-1/2 cursor-pointer text-gray-500'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>

     

          <button type="submit" className='w-[80%] bg-[#D2C1B6] text-[#1B3C53] px-3 py-2 rounded-2xl font-semibold hover:bg-[#C4B09E] transition-all duration-300' >
            Log In
          </button>
             <p className='text-white mt-2'>want to create New Account? <span className='cursor-pointer text-[#101023]' onClick={()=>{navigator("/signUp")}}>Sign Up</span></p>
        </form>
      </div>
    </div>
  );
}

export default LogIn;