import React, { useState ,useContext, useRef} from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import dp from '../assets/blankprofile.webp';
import { dataContext } from '../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const navigator= useNavigate();
  let {serverURL,userData,setUserData,getUserData }= useContext(dataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  let file=useRef(null);

 const handleSignUp = async(e) => {
    e.preventDefault();
    try {
      let formData=new FormData();
      formData.append("firstName",firstName);
      formData.append("lastName",lastName);
      formData.append("email",email);
      formData.append("password",password);
      formData.append("userName",userName);
      if(backendImage){
         formData.append("profileImage",backendImage);
      }    
      
      const data=await axios.post(`${serverURL}/api/signup`,formData,{withCredentials:true,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      await getUserData();
      setUserData(data.data.user);
      if(userData){

        navigator("/");
      }
      
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      
    }

 }
 let [frontendImage,setFrontImage]=useState(dp);
 let [backendImage,setBackedImage]=useState(null);
 function handleImage(e){
 const file=e.target.files[0];
 setBackedImage(file);
 let image=URL.createObjectURL(file)
  setFrontImage(image);


 }



  return (
    <div className='w-screen h-[100vh] flex justify-center items-center bg-[#1B3C53]'>
      <div className='w-[90%] max-w-[500px] h-[600px] rounded-2xl flex flex-col justify-center items-center gap-[18px] bg-[#456882]'>
        <h1 className='text-[#D2C1B6] font-bold text-[30px]'>Sign Up</h1>

        <form className='w-full flex flex-col justify-center items-center' onSubmit={handleSignUp} >
          <input type="file" hidden ref={file} onChange={handleImage}/>
          <div className='w-[120px] h-[120px] rounded-full bg-white overflow-hidden mb-[12px] border-4 border-white relative'>
            <img src={frontendImage} alt='profile' className='w-full h-full object-cover' />
            <div className='absolute w-full h-full bg-black top-0 opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center font-semibold text-white text-[20px]' onClick={()=>{file.current.click()}}>
              +
            </div>
          </div>

          <div className='w-[80%] h-[60px] flex justify-center items-center gap-[14px]'>
            <input
              type='text'
              placeholder='First name'
              className='w-[50%] bg-amber-50 px-3 py-2 outline-none text-gray-600 rounded-2xl'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Last name'
              className='w-[50%] bg-amber-50 px-3 py-2 outline-none text-gray-600 rounded-2xl'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

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

          <input
            type='text'
            placeholder='Enter your username'
            className='w-[80%] bg-amber-50 px-3 py-2 outline-none text-gray-600 rounded-2xl mb-[12px]'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <button  type="submit" className='w-[80%] bg-[#D2C1B6] text-[#1B3C53] px-3 py-2 rounded-2xl font-semibold hover:bg-[#C4B09E] transition-all duration-300' >
            Sign Up
          </button>
          <p className='text-white mt-2'> Already have an Account? <span className='cursor-pointer text-[#101023]' onClick={()=>{navigator("/login")}}>Login</span></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
